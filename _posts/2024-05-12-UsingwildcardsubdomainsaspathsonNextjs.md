---
title: "Nextjs에서 와일드카드 서브도메인을 경로로 사용하기"
description: ""
coverImage: "/assets/img/2024-05-12-UsingwildcardsubdomainsaspathsonNextjs_0.png"
date: 2024-05-12 19:59
ogImage: 
  url: /assets/img/2024-05-12-UsingwildcardsubdomainsaspathsonNextjs_0.png
tag: Tech
originalTitle: "Using wildcard subdomains as paths on Next.js"
link: "https://medium.com/@jfbaraky/using-subdomains-as-paths-on-next-js-e5aab5c28c28"
---


가끔씩 App Masters에서는 각 가능한 서브도메인마다 다른 주제(또는 데이터)를 가진 프로젝트를 작업해야 합니다.

![Using wildcard subdomains as paths on Next.js](/assets/img/2024-05-12-UsingwildcardsubdomainsaspathsonNextjs_0.png)

Next.js를 사용하고 있기 때문에 기본적으로 이렇게 하는 것이 가능해 보이지만, 사실 그렇게 간단하지는 않습니다.

클라이언트 측에서는 window.location을 사용하여 쉽게 서브도메인을 알 수 있지만, 서버 측에서는 런타임에만 알 수 있고 빌드 타임에서는 알 수 없기 때문에 정적 렌더링과 Next.js에서 제공했던 기타 최적화 기능을 포기해야 했습니다. 대신 항상 getServerSideProps를 사용하여 요청 내에서 서브도메인을 가져오는 방식으로 사용하게 되었습니다.



더 이상 그럴 필요 없어요!

이 문제를 해결하기 위한 첫 번째 접근 방식은 각 요청의 헤더를 확인하면서 Next.js 리라이트 기능을 사용하려고 매핑하는 것이었습니다. 작동할 것 같지만 현재는 헤더 값을 경로로 매핑할 수 없고 매개변수만 가능합니다.

다른 해결책은 Next.js 프론트엔드를 제공하는 사용자 지정 노드 서버를 갖는 것인데요, 이 경우 최적화 기능 중 일부를 놓치게 되고 더 많은 코드를 유지 보수해야 합니다.

# 해결책: 미들웨어 사용하기!



Next 12에서 소개되고 Next 13에서 업데이트된 것은 이제 우리는 미들웨어를 쉽게 사용하여 다음 노드 서버로의 모든 요청을 처리할 수 있으며 요청이 라우터에 도달하기 전에 요청을 변경할 수 있습니다.

그래서 먼저, /src/pages 폴더 내에 [서브도메인]이라는 폴더를 만들고 이 폴더에 모든 페이지를 추가했습니다. 이미 알고 계시겠지만, 페이지 폴더 내의 폴더/파일 이름에 []를 추가하면 해당 이름이 동적인 것으로 만들어집니다.

![이미지](/assets/img/2024-05-12-UsingwildcardsubdomainsaspathsonNextjs_1.png)

그 다음으로, pages 폴더와 동일한 레벨에 src/middleware.ts 파일을 생성하고 코드를 작성하기 시작했습니다.



```js
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getValidSubdomain } from '@/utils/subdomain';

// 정규 표현식을 이용하여 공개 파일을 판별합니다
const PUBLIC_FILE = /\.(.*)$/; // 파일

export async function middleware(req: NextRequest) {
  // URL을 복제합니다
  const url = req.nextUrl.clone();

  // 공개 파일은 건너뜁니다
  if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes('_next')) return;

  const host = req.headers.get('host');
  const subdomain = getValidSubdomain(host);
  if (subdomain) {
    // 서브도메인이 있는 경우 경로를 다시 작성합니다
    console.log(`>>> Rewriting: ${url.pathname} to /${subdomain}${url.pathname}`);
    url.pathname = `/${subdomain}${url.pathname}`;
  }

  return NextResponse.rewrite(url);
}
```

middleware 함수는 내 모든 요청을 처리하며 유효한 서브도메인이 있는지 확인합니다. 있다면, 수동으로 pathname을 '/subdomain'으로 재작성합니다. 예를 들어, https://baraky.domain.com/edit 요청은 https://baraky.domain.com/baraky/edit 페이지로 접근합니다.

getValidSubdomain의 코드는 다음과 같습니다:

```js
export const getValidSubdomain = (host?: string | null) => {
  let subdomain: string | null = null;
  if (!host && typeof window !== 'undefined') {
    // 클라이언트 측에서는 window를 통해 host를 가져옵니다
    host = window.location.host;
  }
  if (host && host.includes('.')) {
    const candidate = host.split('.')[0];
    if (candidate && !candidate.includes('localhost')) {
      // 유효한 후보
      subdomain = candidate;
    }
  }
  return subdomain;
};
```



해당 함수에 몇 가지 다른 기능을 추가했어요. 호스트 문자열이 없어도 서브도메인을 가져올 수 있게 했답니다.

이제는 [subdomain] 폴더 내에서 페이지를 변경할 수 있을 거예요. 서브도메인 값은 라우터 내에서 query 매개변수로 사용할 수 있고, 이를 원하는 대로 활용할 수 있어요:

- 각 서브도메인에 대한 관련 데이터를 가져오기
- 각 서브도메인마다 다른 테마 적용하기
- 각 서브도메인별로 특정 캐시 사용 및 getStaticProps를 사용한 정적 생성 페이지 생성하기

하지만 기억해 주세요: 와일드카드 서브도메인에 액세스하려면 해당 기능을 제공하는 호스팅 내에서 Next.js 앱을 호스팅해야 합니다.



# 왜 이게 중요한가요?

서브도메인 대신 서브 라우트로 페이지를 분리하면 각 서브도메인에 대해 getStaticProps를 사용할 수 있습니다. 서로 다른 캐시에서 분리할 수 있으므로 Next.js는 https://something.domain.com과 https://other-thing.domain.com을 구별할 수 있습니다. 그렇지 않으면 두 웹사이트 모두에 대해 같은 정적 렌더링을 반환할 것입니다.