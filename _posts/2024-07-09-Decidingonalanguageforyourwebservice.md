---
title: "웹 서비스 개발을 위한 언어 선택 가이드"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-Decidingonalanguageforyourwebservice_0.png"
date: 2024-07-09 15:08
ogImage:
  url: /assets/img/2024-07-09-Decidingonalanguageforyourwebservice_0.png
tag: Tech
originalTitle: "Deciding on a language for your web service"
link: "https://medium.com/singularity-energy/deciding-on-a-language-for-your-web-service-c6f73fb9d448"
---

Singularity에서는 주로 웹 서비스에 Python을 사용합니다. 프론트 엔드에서는 Typescript를 사용합니다. 또한 실시간 푸시 서버에는 Elixir를 사용합니다. 최근에 매우 높은 I/O 처리량이 필요한 프로젝트를 시작했는데, Python이 그 사용 사례에서 최선의 도구가 아닐 수도 있다는 걱정이 들었습니다. 그래서 우리는 다음과 같은 질문을 하였습니다:

## 높은 처리량 웹 서비스에 어떤 언어를 사용해야 할까요?

팀 내부의 경험을 기반으로, 우리는 성능을 벤치마킹하고 싶은 몇 가지 후보 언어를 가지고 있었습니다. 팀으로서 우리는 다음을 시험해보기로 결정했습니다:

- NodeJS
- Java
- Rust
- C++

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

우리는 커뮤니티 지원이 많고 철저한 문서화가 있는 프레임워크와 함께 각 언어를 만들기로 약 2시간을 할애하기로 결정했습니다. 웹 서버들은 PostgreSQL 데이터베이스와 상호 작용하는 도커 컴포즈 네트워크에서 작동할 것입니다. 이 웹 서버들은 ID로 항목을 가져오는 두 가지 Endpoints를 가지게 될 것이며, 페이지/오프셋 매개변수로 항목 목록을 페이징 처리합니다.

## 테스트

실제로 테스트한 언어 및 프레임워크는 다음과 같습니다:

- Python (Flask/SQLAlchemy/psycopg2)
- NodeJS (express/TypeORM)
- Rust (Actix Web/tokio_postgres)
- Async Python (FastAPI/SQLAlchemy/asyncpg)
- Elixir (Phoenix/Ecto)

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

우리는 C++와 Java도 시도하기로 합의했지만, 심플한 케이스에서도 설정에 어려움을 겪었습니다. 관련 조사를 하는 데 너무 많은 시간이 걸리고, 제가 찾을 수 있는 (공개된) 자료와 커뮤니티 지원이 부족했으며, JSON API → PostgreSQL db 서비스를 짧은 시간에 작동시키지 못했습니다. 나중에 다시 시도해보겠지만, 그 접근의 어려움으로 이번 테스트 세트에 대해 그만두기로 결정했습니다.

나열된 모든 프레임워크와 언어에 대해, 제가 제작한 프로덕션 레디 도커 이미지를 생성하는 데 공식 문서에서 권장하는 방법을 따랐습니다. 그런 다음 나는 이들 이미지를 내 랩탑에서 도커 네트워크에서 컨테이너로 실행했는데, 내 랩탑에는 PostgreSQL 16 도커 컨테이너가 실행 중이어서 모두 같은 데이터베이스에 접근했습니다. 저는 Locust를 사용하여 로컬 환경에서 테스트를 실행했습니다.

이 기사는 각 결과 집합의 이유에 대해서 파헤치지 않을 것입니다. 그렇게 하면 연구와 기사가 훨씬 더 길어질 것입니다. 게다가, 이 연속은 서버의 최고의 IO 처리량을 빨리 배울 수 있는 것이 목적입니다.

각 결과 집합마다, 우리는 동시 사용자 수와 각 프레임워크가 그들을 어떻게 다뤄갔는지 살펴볼 것입니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 1,000명 미만의 사용자

각각 1, 10, 100명의 동시 사용자를 대상으로 최대 초당 2개의 요청을 보내는 테스트 세트입니다.

Python

![이미지](/TIL/assets/img/2024-07-09-Decidingonalanguageforyourwebservice_0.png)

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

NodeJS

![NodeJS](/TIL/assets/img/2024-07-09-Decidingonalanguageforyourwebservice_1.png)

Elixir

![Elixir](/TIL/assets/img/2024-07-09-Decidingonalanguageforyourwebservice_2.png)

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

Rust

![Rust](/TIL/assets/img/2024-07-09-Decidingonalanguageforyourwebservice_3.png)

Async Python

![Async Python](/TIL/assets/img/2024-07-09-Decidingonalanguageforyourwebservice_4.png)

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 세트의 테스트에서 예상한 대로 동작하는 것을 볼 수 있었습니다. 거의 모든 설정이 약 200개의 동시 요청을 그대로 처리하고 제공합니다. 유일한 예외는 async/await 구문을 사용하는 Python입니다. 불행히도, 약 50%의 오류율이 있었습니다. 로그에 기록된 오류를 살펴보면 다음과 같습니다:

sorry, too many clients already

이 오류는 asyncpg 드라이버에서 전파되었습니다. 이 오류를 찾아보니 PostgreSQL db에서 직접 발생한 오류로, 응용 프로그램 코드의 오류가 아니었습니다. 이 설정을 잘 작동하게 하기 위해 몇 가지 조정과 구성 변경을 할 수 있겠지만, 그렇게 하면 연습의 목적을 상실하게 될 것 같습니다.

이후의 모든 테스트에서는 Async Python 설정을 제외하겠습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 1,000 사용자

파이썬

![이미지](/TIL/assets/img/2024-07-09-Decidingonalanguageforyourwebservice_5.png)

NodeJS

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

![Elixir](/TIL/assets/img/2024-07-09-Decidingonalanguageforyourwebservice_6.png)

![Rust](/TIL/assets/img/2024-07-09-Decidingonalanguageforyourwebservice_7.png)

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

![이미지](/TIL/assets/img/2024-07-09-Decidingonalanguageforyourwebservice_8.png)

여기서는 초당 약 2,000개의 요청에 대한 설정을 유지하도록 요청하고 있습니다. 모든 프레임워크가 이를 처리하는 데 예쁘게 처리하지만 Python은 그렇지 않습니다. Python은 왜 따라잡지 못할까요? 왜 약 200개의 요청/초까지 제한될까요? 제 정확한 설정은 무엇인가요?

모두 좋은 질문이고, 저도 궁금하지만, 이 문제의 요점은 아닙니다. 그러나 오류가 발생하지 않았기 때문에, 제가 마지막 테스트 세트에 Python을 포함시키겠습니다.

## 2,000 사용자

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

Python

![Python image](/TIL/assets/img/2024-07-09-Decidingonalanguageforyourwebservice_9.png)

NodeJS

![NodeJS image](/TIL/assets/img/2024-07-09-Decidingonalanguageforyourwebservice_10.png)

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

# Elixir

![Elixir](/TIL/assets/img/2024-07-09-Decidingonalanguageforyourwebservice_11.png)

# Rust

![Rust](/TIL/assets/img/2024-07-09-Decidingonalanguageforyourwebservice_12.png)

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

여기서는 초당 약 4,000개의 요청을 처리할 수 있도록 세팅할 것을 요청하고 있습니다. 이 수준에 도달하려는 모든 프레임워크들이 제대로 따라가기 어려운 것으로 보입니다. 그러나 (Python을 제외한) 모든 세팅이 매우 유사한 동작을 보이는 것으로 보아, 테스트를 실행하는 데 사용하는 노트북에 병목 현상이 있을 수도 있고, 실제 세팅 자체에 병목 현상이 있는 것일 수도 있습니다. 이것이 사실인지 아닌지는 확실하지 않습니다.

# 결론

입출력(IO)이 병목 현상인 고처리량 워크로드에 대해서는, 이러한 세팅 중 어느 것을 선택하고 학습해도 문제가 없어 보입니다. 단, Python을 제외한 모든 것들에 대한 선택을 권합니다.

Python을 사용하길 꺼리지는 않겠습니다. 몇 년간 사용해온 것이며, 설정의 용이성과 문법을 즐기고 있으며, 데이터 분석 및 조작 워크로드에 특히 유용하기 때문에 계속해서 사용할 것입니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

그러나 이 테스트를 실시한 이유는 곧 이전 제품과는 다른 작업량을 갖는 새 제품을 출시할 예정이기 때문입니다. 새 제품을 보다 잘 지원하기 위해 스택을 변경해야 할 지 알아보고 싶었어요.

새 제품이 무엇인지 궁금하신가요? 우리의 스택에 관심이 있으신가요? 결과에 동의하지 않으시나요?

소프트웨어 엔지니어를 채용 중입니다! 메일을 보내서 여러분의 생각을 알려주세요. 의견을 기다리고 있습니다 🌱
