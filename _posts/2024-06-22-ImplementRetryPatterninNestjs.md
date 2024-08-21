---
title: "Nestjs에서 Retry 패턴 구현하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-ImplementRetryPatterninNestjs_0.png"
date: 2024-06-22 02:20
ogImage:
  url: /assets/img/2024-06-22-ImplementRetryPatterninNestjs_0.png
tag: Tech
originalTitle: "Implement Retry Pattern in Nest.js"
link: "https://medium.com/@zigbalthazar/implement-retry-pattern-in-nest-js-2ad505324960"
isUpdated: true
---

![2024-06-22-ImplementRetryPatterninNestjs_0.png](/assets/img/2024-06-22-ImplementRetryPatterninNestjs_0.png)

이 기사에서는 다시 시도 및 회로 차단 패턴의 개념을 살펴보고 구현해야 하는 시점과 이유를 파악할 것입니다.

가끔은 추가 서비스를 활용해야 할 때가 있습니다. 우리의 서비스 또는 결제 서비스와 같은 타사 서비스를 호출할 때 상상해 보세요. 그때 결제 서비스가 부하 상태에 있어 우리 요청에 응답하지 못할 수 있습니다. 또는 네트워크 지연이나 인프라 서비스의 문제로 인해 요청이 처리되지 않을 수 있습니다. 그러나 요청을 다시 보내면 대상 서비스가 부하가 해소될 수 있거나 인프라 문제가 해결될 수 있으며 우리 요청이 성공적으로 처리될 수 있습니다.

이 상황에서 우리는 어떻게 해야 할까요?
개발자로서 우리의 책임 중 하나는 시스템 실패의 허용한도를 높이는 것입니다. 개발된 서비스는 다양한 시나리오와 상황에서 호환되며 방탄이어야 하며 원활한 사용자 경험을 제공해야 합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

여러 번 시도하면 성공 응답을 받을 수 있는 경우가 있음을 알고 있습니다. 사용자에게는 제3자 서비스에서 오류가 발생하는 첫 번째 시도에 대해 응답하지 않아야 하며, 한 두 번 더 시도하면 성공 응답을 받을 수도 있습니다. 그러나 UnAuth, 액세스 거부 등과 같이 다시 시도할 수 없는 오류도 있음을 알고 있어야 합니다.

이제 다른 개념, Jitter에 대해 알아보겠습니다!

여러 클라이언트가 특정 서비스를 호출하려고 시도하는 상황을 상상해보세요. 해당 서비스는 부하를 받아 일부 클라이언트에게 응답하지 못할 것이며, 실패 응답을 받은 클라이언트는 동시에 해당 서비스를 호출하려고 하면 다시 부하를 받아 서비스 거부 상태가 될 것입니다. 이때, 다시 시도 사이에 지연을 설정하는 것이 좋습니다. 다음 공식을 통해 지연을 설정하세요:

고정된 밀리초 + 임의의 밀리초

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

무작위 시간에 서비스를 호출하여 서비스가 스스로 회복될 수 있도록 도와줍니다.

아래는 Axios와 호환되는 jitter를 사용한 재시도 유틸리티 서비스 구현 예시입니다:

```js
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

export type AxiosMethod = () => Promise<AxiosResponse>;

@Injectable()
export class Retry {
  constructor() {}

  async retry(
    axiosMethod: AxiosMethod,
    retry: number,
    delayInMs: number,
    jitter: boolean,
  ): Promise<AxiosResponse> {
    try {
      let res: AxiosResponse | null = null;

      for (let i = 0; i <= retry; i++) {
        try {
          res = await axiosMethod();
          break;
        } catch (err) {
          if (i < retry) {
            const j = this.getJitter(jitter);
            await this.executeWithDelay(delayInMs + j);
            continue
          } else {
            throw err;
          }
        }
      }
      return res;
    } catch (error) {
      throw error;
    }
  }

  private executeWithDelay(delay: number) {
    return new Promise((resolve) => setTimeout(resolve, delay));
  }

  private getJitter(jitter: boolean) {
    return jitter ? Math.floor(Math.random() * (200 - 50 + 1)) + 50 : 0;
  }
}
```

이 설명이 프로젝트 개발에 높은 실패 허용성을 가로지어드릴 수 있기를 바랍니다. 궁금한 점이 있으시면 언제든지 질문해주세요.👌

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 관련 자료

https://learn.microsoft.com/en-us/azure/architecture/patterns/retry
