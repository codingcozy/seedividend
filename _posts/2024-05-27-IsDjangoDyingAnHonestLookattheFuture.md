---
title: "현업에서 Django를 더이상 사용하지 않는 이유"
description: ""
coverImage: "/assets/img/2024-05-27-IsDjangoDyingAnHonestLookattheFuture_0.png"
date: 2024-05-27 19:23
ogImage:
  url: /assets/img/2024-05-27-IsDjangoDyingAnHonestLookattheFuture_0.png
tag: Tech
originalTitle: "Is Django Dying? An Honest Look at the Future"
link: "https://medium.com/python-in-plain-english/is-django-dying-an-honest-look-at-the-future-86ed684415b1"
isUpdated: true
---

![Is Django Dying](/assets/img/2024-05-27-IsDjangoDyingAnHonestLookattheFuture_0.png)

Django의 소멸을 선언하는 클릭베이트 제목에 지쳤나요? 저는 그렇습니다. 여전히 Django를 의존하는 대규모 기업들이나 커뮤니티가 구축하는 놀라운 것들을 확인하지 않은 것처럼 보입니다. 솔직히, Django를 "소멸"이라고 부르는 것은 인터넷 익스플로러를 사용하는 것보다 더 접촉을 잃은 것으로 여겨집니다. Django가 톱 플레이어로 남아 있는 이유에 대해 알아봅시다.

## 섹션 1: Django는 비디오 게임 고양이보다 더 많은 생명력을 가지고 있습니다.

정말이에요, "Django가 죽었다"는 기사들은 금방 질리죠. 이 프레임워크는 핵 겨울 속의 바퀴벌레보다 더 저항력이 있습니다. 여기 이유가 있습니다:

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

- 새로운 묘기 (최근 업데이트): 장고의 개발자들은 꼼짝마라하지 않습니다. 최근 업데이트로 비동기 뷰(안녕, 속도 향상!)와 내장 JSON 필드 지원(데이터 처리가 더욱 원활해졌어요)와 같은 좋은 기능들을 선사했습니다. 이제 비동기 뷰의 훌륭함을 맛보세요:

```js
from django.http import HttpResponse
import asyncio

async def my_async_view(request):
    # 비동기적으로 시간이 오래 걸리는 작업 수행
    result = await long_running_task()
    return HttpResponse(f"여기에 결과가 있습니다: {result}")
```

- 충실한 크루 (커뮤니티): 새벽 2시에 코딩 질문을 했더니 누군가가 답변해준 적이 있나요? 이것이 장고 커뮤니티의 마법입니다. 스택 오버플로우, 전용 포럼 및 다양한 경험 많은 개발자들을 만날 수 있어요. 이는 장고를 훨씬 더 쉽고 재미있게 배울 수 있게 만들어줍니다.
- 현실 세계 챔피언 (성공 스토리): 만약 장고가 정말로 사라지는 길에 있다면 인스타그램, 스포티파이, 워싱턴 포스트와 같은 기업들이 그 위에 서비스를 구축할까요? 아니요. 이러한 거물들이 장고의 확장 가능성과 복잡한 웹 애플리케이션 처리 능력을 인정했습니다.
- 미래를 위해 만들어진 (지속적인 관련성): 웹 개발 트렌드는 내가 점심에 뭘 시켜야 할지 바꾸는 것보다 빠르게 변합니다. 하지만 장고의 적응력은 전설적입니다. 강력한 데이터 처리, 매끄러운 API 생성 및 보안에 대한 집중은 소셜 미디어 사이트부터 심각한 데이터 주도 플랫폼까지 모든 분야에서 여전히 뛰어난 선택지임을 의미합니다.

보셨나요? 장고는 단순히 살아남는 것이 아니라 경쟁하고 성공을 거두고 있습니다. 비판하는 사람들은 그들의 Clickbait 제목을 쓸 테니 우리는 계속 이 지속적으로 발전하는 프레임워크로 멋진 것들을 만드는 데 바쁠 거에요.

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

## 섹션 2: 좋아요, 코딩 방 안의 코끼리 얘기를 좀 해볼까요?

알았어요, 고무단으로 가리지 않겠어요: 어떤 사람들은 Django가 멸종의 길로 가야 한다고 생각하고 있어요. 이들이 선호하는 몇 가지 이유들을 해결해보고 상황에 현실성을 추가해보겠습니다:

- 눈부신 새로운 장난감 (다른 프레임워크의 유혹): “자바스크립트가 더 핫해! React가 더 빠르다! FastAPI가 미래야!” 그렇지만, 새로운 기술은 흥미롭지만 자동적으로 오래된 기술을 구식으로 만들지 않아요. 서로 다른 도구들은 서로 다른 강점을 가지고 있어요. 복잡한 데이터베이스와 원활하게 작동하는 견고한 백엔드가 필요하다면, Django가 종종 많은 최첨단 옵션들에 밀리지 않을 수 있어요.
- 확장의 고민 (단일체의 신화): 막대한 Django 앱을 확장하는 것은 까다로울 수 있다는 것이 사실이에요. 그러나 알고 계세요? 특정 규모에 도달했을 때 어떤 프레임워크든 그렇다는 건 사실이에요. 스마트한 설계 선택, 캐싱, 그리고 부하 분산은 여기서 친구입니다—어떤 기술 스택을 사용하든 말이죠. 여기 Django 커뮤니티가 빛을 발하는 곳입니다: 이러한 도전에 직면한 개발자들이 이를 해결하는 해법을 즐겁게 공유하고 있습니다.

```js
# 예시: 데이터베이스 부하를 줄이기 위해 캐싱 사용
from django.core.cache import cache

def get_trending_topics(request):
    trending_topics = cache.get('trending_topics')
    if not trending_topics:
       trending_topics = calculate_trending_topics()  # 시간이 많이 걸리는 작업
       cache.set('trending_topics', trending_topics, 600)  # 10분 동안 캐싱
   return render(request, 'trending.html', {'topics': trending_topics})
```

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

- 균형 잡힌 시각 (장고가 빛을 발하는 곳): Django는 모든 웹 프로젝트의 마법 해결책은 아닙니다. 하지만 신속한 개발, 깔끔한 구조 및 견고한 신뢰성이 필요하다면 고려해볼 수 있는 옵션입니다. 스타트업, 뉴스 사이트, 내부 도구 등이 Django가 빛나는 영역입니다. 또한, 더 높은 성능을 끌어낼 수 있는 다양한 전략이 존재합니다.

이 결론? 혹독한 하이프 사이클에 빠지지 마세요. Django가 우스꽝스럽게 여길 오래된 것이 아니라, 일을 멋지게 처리할 수 있는 성숙하고 전투에서 검증 받은 프레임워크입니다.

## 섹션 3: Django의 크리스탈 볼 - 번창하는 미래를 내다봅니다

"Dying" 예언에 대해 하나 더 말씀드리자면: Django의 자신을 새롭게 바꾸는 능력을 과소평가하고 있습니다. 이 프레임워크는 망가진 유명 세계 스타보다 더 많은 컴백을 계획 중입니다. 앞으로 무엇을 기대할 수 있을 지 엿보겠습니다:

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

- 성능에 집중: 속도가 중요하고 Django 개발자는 이를 알고 있습니다. 지속적인 최적화가 기대되며, 각 릴리스마다 Django를 더 가볍고 효과적으로 만들기 위한 노력이 이어질 것입니다. 적은 노력으로 로드 밸런싱을 수행할 수 있는 내장 도구가 추가된다면 얼마나 좋을까요? 불가능한 일은 아닙니다!
- 새로운 기술 수용: WebAssembly가 인기를 끌고 있나요? AI 기능이 게임을 바꾸고 있나요? Django는 이러한 변화를 효율적으로 통합하고 발전시킬 스마트한 방법을 찾을 것입니다. Django는 웹의 발전과 함께 성장하는 역사가 있습니다.
- Django: 웹 개발의 스위스 아미 나이프: API 개발 및 통합과 같은 영역에 대한 관심이 증가함에 따라 Django는 더 다양한 프로젝트의 신뢰할 수 있는 핵심이 될 것입니다. 특정 niche를 대상으로 한 더 많은 특화된 '플레이버'들이 등장할 수도 있습니다.

```js
# Django REST Framework를 사용한 API 생성 예시
from rest_framework import serializers, viewsets
from .models import BlogPost

class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = '__all__'

class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
```

- 이러한 점이 긍정적인 이유: Django는 능력이 증가하는 동안에도 사물을 간단하게 유지하는 능력이 있습니다. 이는 새로운 개발자를 유치함으로써(멋진 커뮤니티 확장!) 경험이 풍부한 사람들이 지속적인 학습 곡선에 직면하지 않도록 보장합니다. Django는 산업의 트렌드가 떠오르기를 바라며 적응하기 좋은 동물이며, 관건성을 유지하여 항상 적용 가능하게 유지합니다.

파멸론자들이 선동성 기사에 집착하더라도, 우리 중 일부는 Django를 활용하여 놀라운 웹 경험의 다음 세대를 구축할 것입니다.

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

## 결론: 장고는 계속해서 성장 중이며 당신도 그렇게 해야 합니다

우리가 뭘 얘기하고 싶은지 말해 봅시다 — 장고는 그저 살아남는 것뿐만이 아니라 번창하고 있습니다. 이 프레임워크는 지속적인 업데이트가 이뤄지고 열정적인 커뮤니티가 뒷받침하며 실제 세계에서도 뛰어난 실력을 입증하고 있습니다.

그 지겨운 "장고가 죽었는가?"라는 글들을 잊어버리세요. 더 나은 질문은 "장고가 앞으로 어떻게 발전하며 성공할 것인가?"라는 것입니다. 왜냐하면 그게 분명할테니까요.

당신의 다음 행보: 이제 장고에 참여하는 방법을 알아보세요:

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

- 도전해 보세요: 아직 장고를 시도해 보지 않았나요? 키보드를 먼지 털고 초보 프로젝트에 도전해 보세요. 장고의 일 처리 태도에 사로잡힐지도 모르겠어요.
- 클럽에 가입하세요: 장고 포럼에 참여하고, 디스코드에서 다른 개발자들과 연결해 보세요 (저 같이 함께하실래요? - https://discord.com/invite/JGTayeYnXs). 이 커뮤니티를 멋지게 만드는 모든 지식을 활용해 보세요.
- 미래를 만드세요: 장고의 오픈 소스 마법 덕분에 다음 단계를 결정할 수 있어요. 멋진 기능 아이디어가 있나요? 기여해서 자신의 흔적을 남겨 보세요!

장고의 이야기는 아직 끝나지 않았고, 여러분의 이야기는 지금부터 시작될 수 있어요. 우리가 다음에 함께 놀라운 응용 프로그램을 얼마나 만들 수 있을지 기대해 보세요.

그런데… 제가 다룰 도저히 지치지 않는 질문이나 멋진 기사 아이디어가 있나요? 아래 댓글에 남겨 주세요! 그리고 친절하게도, Medium에서 (https://medium.com/@danielbuilescu) 제 팔로우도 눌러 주세요. 더 많은 프로그래밍 소식을 확인할 수 있을 거예요.

# 쉬운 용어로 🚀

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

인 플레인 영어 커뮤니티의 일원이 되어 주셔서 감사합니다! 나가시기 전에:

- 작가에게 박수를 보내고 팔로우하기 ️👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | 뉴스레터
- 다른 플랫폼 방문하기: 스택아카데믹 | 코피드 | 벤처 | 큐브드
- PlainEnglish.io에서 더 많은 콘텐츠를 만나보세요.
