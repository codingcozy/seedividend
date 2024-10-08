---
title: "FastAPI 완벽 가이드 확장 가능한 애플리케이션 구축하는 방법"
description: ""
coverImage: "/assets/img/2024-07-07-FastAPIUnleashedBuildingScalableApplications_0.png"
date: 2024-07-07 20:10
ogImage:
  url: /assets/img/2024-07-07-FastAPIUnleashedBuildingScalableApplications_0.png
tag: Tech
originalTitle: "FastAPI Unleashed: Building Scalable Applications"
link: "https://medium.com/@nvrank1/fastapi-unleashed-building-scalable-applications-e44d275bf814"
isUpdated: true
---

안녕하세요 여러분! 이번 프로젝트는 리워드 공유 플랫폼을 위해 웹 애플리케이션을 디자인하고 개발하는 프로젝트였어요. 30일 안에 컨셉부터 제작까지 전체 애플리케이션을 완성해야 하는 요구사항이 있었죠. 이제 이 목표를 어떻게 달성했는지, 왜 해당 결정을 내렸는지, 그리고 중간에 겪은 어려움 등을 살펴볼게요. 함께해요!

패스트API(FastAPI)란?
"FastAPI는 표준 Python 타입 힌트를 기반으로 한 파이썬 웹 API를 빌드하기 위한 현대적이고 빠른 웹 프레임워크입니다."
기본적으로, 이것은 빠르고 성능이 우수한 방식으로 API를 구축하는 데 도움이 되는 파이썬 프레임워크입니다. 비동기 처리, Pydantic을 사용한 데이터 유효성 검사 등 다양한 기능을 제공하여 개발자 경험, 성능, 보안을 최적화할 수 있어요.

![이미지](/assets/img/2024-07-07-FastAPIUnleashedBuildingScalableApplications_0.png)

다른 파이썬 프레임워크의 도전 과제:
파이썬을 사용하는 경우 주요 도전 과제는 실행 속도가 느리다는 것, 동적 타입(런타임 오류의 원인), 기본적으로 싱글 스레드이며 내장 비동기 지원이 없다는 점 등이 있어요. 제 경험상 Flask와 같은 파이썬 기반 프레임워크로 애플리케이션 개발을 진행한 경험에서, 사용자 입력에 대한 타입 확인 및 데이터 유효성 검사의 필요성을 실감했고, 이것이 FastAPI의 강점이라는 것을 깨달았습니다!

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

FastAPI를 선택한 이유:
앞서 언급한 도전 과제들을 대부분 해결해주는 FastAPI

1. 데이터 유효성 검사와 타입 힌트를 제공하기 위해 Pydantic을 기본으로 제공합니다.
2. Async/Await를 내장하고 있습니다.
3. 빠릅니다!!
4. "Uvicorn" 웹 서버를 통해 필요한 경우 여러 스레드를 사용할 수 있습니다.
   이를 통해 성능 면에서 Django와 같은 프레임워크와 유사한 성능을 제공하며 때로는 일부 벤치마킹에서 이길 정도의 성능을 제공합니다.

# 요구사항과 작업 흐름

목표: 우리의 주요 목표는 사용자들이 플랫폼 상에서 포인트를 서로 공유할 수 있도록 하는 것이었습니다. 그러나, 서버가 포인트 저장을 직접 관리하지 않고, 대신 3자 서비스가 이러한 포인트를 제어하고 있었습니다. 이 설정으로 인해 우리의 서버는 사용자 활동에 관계없이(보기, 업데이트, 포인트 공유 등) 모든 작업에 대해 3자 API와 상호 작용해야 했습니다. 다수의 은행 간에 UPI와 같은 중개자 역할을 하는 것으로 생각해보세요.

도전 과제: 우리 서버로의 각 사용자 요청이 3자 API로부터 1~4개의 네트워크 요청을 일으켰습니다. 이는 서버 스레드가 응답이 도착할 때까지 블로킹되면 CPU 시간이 낭비될 수 있다는 중요한 도전 과제를 야기했습니다. 단순히 스레드를 추가하여 서버 확장하는 것은 이 상황에 제한되고 최적이 아니었습니다.

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

# 동기 처리의 함의

동기 처리는 현재 요청이 완전히 처리되고 응답할 때까지 서버가 새 요청을 처리할 수 없다는 것을 의미합니다. 예를 들어, 20개의 동시 요청을 동기적으로 처리한다면 각 후속 요청이 20-25초를 기다리게 되어 사용자 경험과 앱 참여에 심각한 영향을 미칠 수 있습니다.

# 동기 대비 비동기

- 동기 처리: 서버는 요청을 순차적으로 처리하며 각 작업이 완료될 때까지 기다린 후 다음 작업으로 넘어가므로 잠재적인 지연과 비효율성이 발생할 수 있습니다.
- 비동기 처리: FastAPI의 async/await 기능을 활용하여 서버가 3rd party API로부터 응답을 기다리는 동안도 여러 요청을 동시에 처리할 수 있었습니다. 이 비동기 접근법은 병렬성을 우리 시스템 아키텍처에 성공적으로 도입하여 확장성을 향상시키는 데 쓰였으며, 복잡한 스레딩이 필요하지 않았습니다.

![이미지](/assets/img/2024-07-07-FastAPIUnleashedBuildingScalableApplications_1.png)

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

# 첫화면과 현실

초기 기대: 초기 테스트에서 우리의 FastAPI 서버는 빠르게 요청을 처리하여 일반적으로 50밀리초 미만으로 응답했습니다. 그러나, 제3자 API와 통합하는 것은 상당한 도전이 되었습니다.
현실: 제3자 API를 포함하는 각 요청이 완료되기까지 1초 이상이 걸렸으며, 전반적인 요청 시간에 상당한 영향을 미쳤습니다.

분석:

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

- 총 소요 시간 분석: 지연은 주로 제3자 서비스의 응답을 기다리는 데 기인했습니다.
- 동기적 영향: 요청을 동기적으로 처리하는 것은 주로 장기간 및 비효율성을 초래할 수 있었습니다, 특히 부하가 많은 경우에는 더 그렇습니다.

# 해결책

- 비동기 접근 방식 채택: FastAPI의 비동기 기능을 구현하여 여러 요청을 동시에 처리하고, 제3자 API로 인한 지연을 효과적으로 관리하고 다른 요청을 차단하지 않았습니다.
- 성능 개선: 이 접근 방식은 전체 응답 시간을 줄이고, 확장성을 향상시키며 사용자 경험을 개선했습니다.

빠른 개발을 위해 Python과 FastAPI를 선택한 것은 우리의 전체 개발 시간을 단축하는 데 중요한 역할을 했습니다. FastAPI의 비동기 지원은 백엔드 작업을 최적화하는 데 그치지 않고, 자원 활용을 최적화하여 서버 스레딩에 의존하지 않고도 높은 요청 양을 효율적으로 처리할 수 있었습니다.

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

# 영향

Async+Await 이후에도 각 개별 요청에는 여전히 동일한 시간이 필요했지만!! 이제 우리는 여러 요청을 동시에 논블로킹 방식으로 처리할 수 있었습니다.
이것은 이제 우리가 동시에 같은 20개의 요청을 받으면, 모두 처리하는 데 2-3초만 소요된다는 것을 의미합니다.
따라서 이제 서버는 별다른 문제없이 확장할 수 있으며 더 이상 서버에 스레드를 추가하거나 도커에서 여러 파드를 만들 필요가 없습니다.

따라서 우리는 요청 처리 시간을 기존의 선형에서 상수 시간 복잡도로 전환했습니다.
n = 사용자 요청의 수
t = 요청 처리에 필요한 총 시간

![FastAPIUnleashedBuildingScalableApplications_2](/assets/img/2024-07-07-FastAPIUnleashedBuildingScalableApplications_2.png)

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

# 시스템 디자인

백엔드:

- FastAPI와 Python: 빠르게 API를 개발할 수 있는 능력과 async 지원을 통해 FastAPI를 선택했습니다. FastAPI는 3rd-party API와 상호 작용하는 데 중요한 동시 요청을 효율적으로 처리했습니다.

데이터베이스:

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

- MongoDB: 유연성과 확장성을 위해 MongoDB를 선택했습니다. MongoDB는 동적 데이터 요구를 수용하며, 민첩한 애플리케이션 요구를 지원합니다.

캐시:

- Redis: Redis는 우리의 빈번한 데이터 접근 속도를 최적화했습니다. 특히 제3자 API와의 실시간 상호작용에 매우 유익했습니다.

패키징과 배포:

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

- Docker: 저희 애플리케이션, MongoDB 및 Redis는 Docker를 이용하여 컨테이너화되어 있어 다양한 환경에서 일관된 배포가 가능하며 의존성 관리가 간소화되었습니다.

배포 전략:

- Docker Compose를 이용한 AWS EC2: 우리는 Docker Compose를 사용하여 전체 스택을 AWS EC2 인스턴스에 배포했는데, 이를 통해 확장 가능한 자원 할당과 관리가 가능하며 다양한 워크로드 요구를 지원했습니다.

모니터링 및 확장성:

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

- 그라파나 + 프로메테우스: 그라파나와 프로메테우스를 통합하여 포괄적인 서버 및 인프라 모니터링을 실시합니다. 성능 최적화 및 용량 계획을 선제적으로 수립할 수 있게 돕습니다.

고려사항:

- 지연 시간 최적화: MongoDB와 Redis를 동시에 사용하여 네트워크 지연 시간을 최소화하여, 제3자 API 상호작용에 대한 응답성을 향상시켰습니다.

미래준비:

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

- 확장성과 유연성: 도커와 AWS로 구축된 우리의 아키텍처는 수평적 확장을 고려하여 현재 요구 사항을 지원하고 미래 성장과 변화하는 비즈니스 요구 사항에 대비하고 있습니다.

# 결과

상당한 부하가 걸려도 응용 프로그램은 아무 문제 없이 예상대로 작동했습니다. 우리는 매우 인상적인 성능, 신뢰할 수 있는 서버 상태 및 서버의 전체 수명 동안 좋고 일관된 결과를 얻었습니다.
Grafana에서 얻은 일부 서버 메트릭스

![Grafana](/assets/img/2024-07-07-FastAPIUnleashedBuildingScalableApplications_3.png)

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

서버 부하가 최대로 발생했을 때 RAM 사용량이 90MB에서 100MB로 증가했고 CPU 사용률이 20%였습니다. 대부분의 요청은 100밀리초 미만으로 처리되었고, 3rd party api를 사용하는 요청은 1.2초가 걸렸습니다. (네트워크 지연으로 인해 영향 받음)

참고:
서버 성능을 확인하기 위해 몇 가지 테스트를 실시했습니다.
API를 초당 20개에서 200개의 요청을 보내는 사용자 지정 Bash 스크립트를 만들었습니다.
20개/sec의 요청이 3rd party API를 호출할 때, 서버는 모든 요청에 대해 4초 이내에 응답했습니다.
200개/sec의 요청이 3rd party API를 호출할 때, 서버는 모든 요청에 대해 9초 이내에 응답했습니다.
비교를 위해, 동기 처리에서 200개 중 마지막 요청은 결과를 받기까지 200초가 걸렸을 것입니다.

글을 읽어주셔서 감사합니다. 의겢나 피드백이나 질문이 있으시면 댓글로 남겨주세요!

즐거운 학습되세요! 😄
