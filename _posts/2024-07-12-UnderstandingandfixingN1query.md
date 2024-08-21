---
title: "N1 쿼리 이해와 해결 방법"
description: ""
coverImage: "/assets/img/2024-07-12-UnderstandingandfixingN1query_0.png"
date: 2024-07-12 21:41
ogImage:
  url: /assets/img/2024-07-12-UnderstandingandfixingN1query_0.png
tag: Tech
originalTitle: "Understanding and fixing N+1 query"
link: "https://medium.com/doctolib/understanding-and-fixing-n-1-query-30623109fe89"
isUpdated: true
---

![이미지](/assets/img/2024-07-12-UnderstandingandfixingN1query_0.png)

이 글을 통해 여러분은 누구나 이야기하는 유명한 N+1 쿼리에 대해 알게 되며, 이를 고치고 예방하는 방법을 배우게 될 것입니다.

백엔드 성능에 관해, 적어도 한 번은 들어본 적이 있는 성능 문제가 있습니다: N+1 쿼리. 이를 설명하는 완벽한 비유로 초콜릿 케이크를 굽는 것이 있습니다.

# N+1 쿼리란 무엇인가요?

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

TL;DR: N+1 쿼리 문제는 코드가 기본 쿼리를 실행할 때 검색할 수 있는 동일한 데이터를 검색하기 위해 추가적인 N개의 쿼리 문을 실행할 때 발생합니다.

이전 문장을 이해했다면, “어떻게 해결할까요?”로 바로 건너뛸 수 있어요.

이전 문장을 이해하지 못했다면 걱정하지 마세요. 함께 해결해 나갈 거예요.

## 레시피 비유

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

먼저 모든 쿼리, SQL, 그리고 웹 애플리케이션들을 한쪽에 두고, 케이크를 굽고 싶다고 상상해 봅시다.

예시를 위해, 냉장고와 식품 저장실이 부엌이 아닌 다락에 있다고 상상해 봅시다. 이렇게 되면 냉장고에서 무언가를 꺼내려 할 때마다 계단을 오르락내리락 해야 할 것입니다.

그리고 이제, 침실에 가서 책장에서 쿠키북을 찾아 초콜릿 케이크 레시피를 찾고, 그것을 들고 다시 부엌으로 돌아갑니다.

첫 줄을 확인해 봅니다:

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

다시 한 번, 복도를 올라가서 이 3개의 계란을 가져오고, 주방으로 돌아가서 조리법의 다음 줄을 읽습니다:

그만큼 왕복하면 조금 지쳐서, 다시 다락방으로 돌아갑니다. 더 간단한 방법이 있었으면 좋겠죠...

만약 이렇게 요리를 한다면 경험하게 될 것은 바로 N+1 쿼리 문제입니다. 당신의 ORM은 코드로 인해 처음 쿼리를 한 후에 (레시피를 가져올 때) N개의 추가적인 쿼리를 수행해야만 합니다 (재료를 가져오기 위한 왕복).

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

## 구체적인 예시

요리 레시피 목록을 표시하는 웹 애플리케이션을 고려하여 요리 사업에 머물겠습니다. 다음과 같이 레시피 및 재료 두 가지 매우 간단한 모델이 있습니다:

여기에는 Recipe 및 Ingredient 두 가지 모델이 있습니다.

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

한 레시피는 여러 재료를 가질 수 있으며, 각 재료는 레시피에 속합니다.

컨트롤러의 루비 코드는 Recipe.all을 사용하여 모든 사용 가능한 레시피를 가져올 것입니다:

그리고 뷰의 코드는 다음과 같습니다:

데이터베이스에 레시피가 4개 있을 때 모든 것이 잘 작동합니다. 그러나 성공과 함께 첫 번째 성능 문제가 발생하고 로그에서 이상한 현상을 발견합니다:

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

우리는 4개의 레시피가 있고, 저희 애플리케이션은 총 5개의 SQL 요청을 합니다:

- 표시할 네 개의 레시피를 가져 오는 요청 하나 (이게 "1"이에요)
- 각 레시피별로 재료를 가져 오기 위해 추가 쿼리가 필요합니다 (이게 "N"이에요)

이것은 정확히 당신이 계란을 가져 오기 위해 다락방에 왕복을 해야하는것과 같아요! (만약 이 문장을 이해하지 못한다면, 이전 섹션을 읽어보는게 좋을겁니다)

# 어떻게 해결할까요?

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

현실에서도 웹 개발에서도 해결책은 거의 비슷합니다: 관련이 있는 요소들을 일괄적으로 검색합니다.

요리를 시작하기 전에 주방에서 필요한 모든 것을 한 번에 검색하는 것처럼, 코드도 필요할 때 종속 모델을 미리 로드해야 합니다.

Ruby on Rails와 ActiveRecord로 이전의 구체적인 예제를 수정하는 해결책은 매우 간단합니다:

ActiveRecord(루비 온 레일즈 ORM)에서 "includes(:ingredients)"를 사용하여 모든 재료를 레시피와 함께 로드하도록 ORM에 알립니다.

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

그 결과로, 당신의 애플리케이션은 한꺼번에 모든 재료를 미리 로드하고 N+1 대신 몇 번의 요청만 수행합니다. 여기서 N은 레시피의 수입니다.

Rails에서 웹 애플리케이션에서 데이터를 미리로드하는 여러 가지 방법이 있습니다:

- "includes" 메서드 사용 (여기에 예제가 있습니다).
- "eager_load" 메서드 사용.
- "preload" 메서드 사용.
- 명시적으로 ActiveRecord의 Preloader 클래스 사용 (조금 까다롭지만 이미 로드된 모델에 추가적인 레코드를 추가할 수 있으므로 매우 강력함). (여기에 예제가 있습니다).

# 어떻게 이를 방지할 수 있을까요?

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

그 문제를 해결할 수 있는 것은 좋지만, 코드베이스로 진입하지 못하도록 예방하는 방법을 알면 더 좋겠죠!

Doctolib에서는 대부분의 루비 상점처럼 우리가 사용하는 라이브러리는 bullet gem입니다. 이 라이브러리는 웹 애플리케이션을 개발하는 과정에서 N+1 쿼리를 쉽게 잡을 수 있습니다.

설치와 구성이 아주 간단하며, 브라우저에서 JS 알림, 로그 파일에 경고, Growl 지원, XMPP 지원, Honeybadger, sentry, bugsnag, airbrake과의 통합을 위한 거대한 경고 목록과 같은 다양한 통합 기능을 제공합니다.

아직 충분하지 않다고 생각하면, 전용 슬랙 채널에 연결하여 알림을 보낼 수도 있습니다.

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

루비 온 레일을 포함하지 않는 스택이더라도 다른 멋진 도구들이 많이 있어요:

- spring-hibernate-query-utils는 자바용 라이브러리로, N+1 쿼리가 감지되면 테스트가 실패하게 됩니다.
- Database Machine은 PHP용 ORM으로, 스마트 이저 로딩 메커니즘을 구현합니다.
- laravel-query-detector는 PHP의 라라벨 패키지로, 개발 환경에서 N+1 쿼리를 감지합니다.
- nplusone은 파이썬 ORM에서 n+1 쿼리 문제를 감지하기 위한 라이브러리로, SQLAlchemy, Peewee, Django ORM을 포함합니다.

이제 N+1 쿼리가 무엇인지, 어떻게 수정해야 하는지, 어떻게 감지해야 하는지 알게 되었으니, 이제는 거의 빈 손으로 차가운 냉장고에서 돌아오지 않길 바래요!

더 많은 기술 뉴스를 원하시면, 닥토-테크-라이프 뉴스레터를 통해 우리의 여정을 따라가세요.

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

우리와 함께 인기 있는 웹사이트를 확장하고 의료 시스템을 변화시키는 데 참여하고 싶다면, 프랑스와 독일에서 기술 및 제품 팀을 성장시키기 위해 재능 있는 개발자를 채용 중입니다. 오픈 포지션을 확인해보세요.
