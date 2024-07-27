---
title: "탐험을 위한 최고의 소프트웨어 10가지"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-Softwareforexploration_0.png"
date: 2024-07-09 20:26
ogImage:
  url: /assets/img/2024-07-09-Softwareforexploration_0.png
tag: Tech
originalTitle: "Software for exploration"
link: "https://medium.com/gitconnected/software-for-exploration-c526d44851ae"
---

## 연구 소프트웨어에서 빠른 길을 선택해야 하는 때

![2024-07-09-Softwareforexploration_0](/TIL/assets/img/2024-07-09-Softwareforexploration_0.png)

내 인생 동안 연구에 종사해왔기 때문에 연구자들이 못생긴 코드를 작성한다는 편견을 알고 있어요 (예: 여기, 여기, 또는 여기를 참고하세요). 하지만, 이를 해결할 수 있다고 생각했어요. 그래서 여러 번 멋진 연구 프레임워크를 디자인하려고 노력했어요. 좋아하는 소프트웨어 엔지니어링 책과 블로그를 참고하여 인터페이스를 도입하고 좋은 추상화를 만들려고 노력했죠.

그러나 그 모든 노력이 물거품으로 돌아갔어요. 내가 작업한 대부분의 연구 소프트웨어가 실제 운영에 적용되지 않았거든요 (일부는 적용되기는 했지만). 단순한 진실을 알려준 사람이 있었다면, 내 정신건강에는 참 좋았을 텐데요: 죽어가는 연구 코드는 실제로 일어나야 하는 일이에요. 연구자들은 처음부터 그것을 엔지니어링하는 데 많은 시간을 들이지 않아도 되요.

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

전문 소프트웨어 엔지니어들은 항상 가장 좋은 소프트웨어 관행을 사용하지 않는 연구자들을 무시하는 경향이 있습니다. 연구 코드의 수준을 높이려는 노력이 여러 개 있습니다 (예: 이 훌륭한 게시물 및 연구 코드 핸드북). 그러나 이 게시물은 다른 방향으로 나아가서 최고의 소프트웨어 관행을 지나치게 적용하지 않는 방법을 주장하며 빠른 탐구에만 주력하는 것이 중요하다고 주장합니다. 이는 빠르게 여러 아이디어를 시도해보는 것이 목표인 연구 지향적 기업을 대상으로 합니다.

# 1. 몇몇 전략적 기술 부채를 맡아보세요

회사의 성공적인 연구 프로젝트에는 두 가지 단계가 있습니다: 탐색과 활용. "탐색" 단계에서는 가능한 다양한 경로를 시도해보려고 합니다. "활용" 단계에서는 가장 좋은 해결책을 견고하게 만들어 유용한 제품으로 전환하려고 합니다.

![Software for exploration](/TIL/assets/img/2024-07-09-Softwareforexploration_1.png)

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

두 가지 사이에서 최적의 소프트웨어 관행은 꽤 다릅니다. 그래서 회사들은 종종 별도의 연구 및 제품 부서를 갖고 있습니다. 소프트웨어 디자인에 관한 일반적으로 읽을 수 있는 모든 책들은 주로 두 번째 "활용" 단계에 대해 설명하고 있습니다. 이 단계에서는 확장 가능한 제품을 위한 기반을 구축합니다. 여기서 모든 디자인 패턴이 나타납니다: 좋은 API, 로깅, 오류 처리 등이 있습니다.

그러나 첫 번째 "탐색" 단계에서는 영원히 존속할 기반이 아닙니다. 실제로 대부분의 노력이 남아 있다면, 그것은 다양성을 탐색하지 않았다는 뜻입니다.

이 글에서 소개한 많은 관행은 일반적으로 "기술적 부채"가 되는 예시입니다. 깨끗하고 재사용 가능하며 잘 추상화된 코드를 작성하지 않아서 생기는 결과입니다. 부채는 항상 나쁜 것일까요? 대출이나 모기지를 받지 않는 것이 좋겠지만, 돈을 빌리는 것은 종종 인생에서 좋은 전략입니다. 빠르게 움직이고 후에 수익을 얻기 위해 부채를 불러들이는 것은 괜찮습니다.

![이미지](/TIL/assets/img/2024-07-09-Softwareforexploration_2.png)

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

비슷하게, 기술적 부채를 감당하지 않으면 연구 속도가 느려질 수 있습니다. 좋은 소식은 대부분의 경우에는 다시 상환할 필요가 없다는 것입니다. 대부분의 연구 코드는 결국 사라질 것이기 때문에 평균적으로 가져간 전체 기술적 부채로 인해 고통받지 않을 것입니다.

## 코드 재사용에 반대하는 사례

많은 소프트웨어 아키텍처 및 리팩토링 기술은 코드의 재사용성을 향상시키기 위해 특별히 설계되었습니다. 코드 재사용에는 일반적인 부작용이 있습니다. 그러나 실제 운영에서는 이미 잘 알려진 혜택들이 그것을 상쇄시킵니다 (예를 들어, 이러한 전형적인 글을 참조하세요). 연구 프로젝트에서 대부분의 코드는 무시될 운명입니다. 코드 재사용을 추구하는 것이 실제로 연구 속도를 늦출 수 있습니다.

코드 재사용을 제한하는 것은 연구에서 받아들이는 종류의 기술적 부채입니다. 추가적인 불필요한 종속성 추가, 코드 복사 붙여넣기, 큰 양의 공유 연구 코드 유지, 조기 설계 투자 등 여러 가지 코드 재사용 패턴에 대해 논의하고 싶습니다.

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

## 새로운 것을 가져오기 전에 한 번 더 생각해보세요

성능을 향상시켜 줄 잘 유지되는 버전 관리된 라이브러리가 있다면 채택해 보세요! 하지만 새로운 의존성을 추가하기 전에 그것이 그만한 가치가 있는지 판단해 보세요. 추가되는 각각의 의존성은 의존성 지옥에 더 가까워지게 합니다. 학습과 문제 해결에 시간 투자하게 만듭니다. 이 간결한 포스트에서 의존성의 함정을 더 자세히 살펴보세요.

아마도 다음과 같은 경우에는 안심할 수 있을 것입니다:

- 이미 사용하고 있고, 배울 것이 많지 않고, 큰 커뮤니티와 좋은 문서 및 테스트가 있는 경우
- 버전이 명시되어 있고, 쉽게 설치할 수 있는 경우
- 마지막으로, 직접 구현할 수 있는 방법이 없는 경우.

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

하지만 만약에 이러한 상황에 의심스러운 의존성이 있다면:

- 어떻게 빠르게 사용해야 하는지 알 수 없거나 매우 새로운 것 (또는 매우 오래된 것) 이거나 아무도 알지 못하는 경우; 문서나 테스트가 없는 경우
- 모노 레포에서 다른 팀들에 의해 계속 바뀌고 있는 경우
- 많은 다른 의존성과 도구들을 가져오거나 설치하기 어려운 경우
- 마지막으로, 여러분이 (또는 몇몇 LLM이) 몇 시간 안에 이 코드를 짤 수 있다고 느낀다면

명시적인 의존성 대신, 좋은 Go 속담을 따를 수도 있습니다: “좀 카피하는 것은 좀 의존하는 것보다 낫다”, 이것이 우리의 다음 주제입니다.

## 복사 붙여넣기는 실험의 자유를 줍니다

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

![Software Exploration](/TIL/assets/img/2024-07-09-Softwareforexploration_3.png)

"복사 붙여 넣기는 불법이어야 한다"는 사람들이 있다고 해요. 하지만 제 놀람은 자주 그것을 옹호하는 데 주장을 하게 된다는 것이었어요. 탐색 단계에서 복사 붙여 넣기가 최적의 선택일 수도 있어요.

코드베이스 다른 부분에서 크게 사용되는 함수에 의존한다면 쉽게 변경할 수 없을 거예요. 누군가를 위해 무언가를 망가뜨릴 가능성이 높고 소중한 시간을 코드 검토와 수정에 소비해야 할 수도 있어요. 그러나 필요한 코드를 폴더에 복사 붙여 넣기하면 자유롭게 원하는 대로 할 수 있어요. 이는 실험이 규칙이 아닌 예외일 때 연구 프로젝트에서 중요한 일이에요. 특히 모든 사람에게 유용할지 확실하지 않을 때요.

저는 딥러닝 코드베이스가 대부분 복사 붙여 넣기에 적합하다고 생각해요. 일반적으로 모델과 그 학습을 설명하는 데 필요한 코드 양이 크지 않을 수도 있어요. 그러나 동시에 매우 미묘하고 일반화하기 어려울 수도 있어요. 공유 가능한 학습 스크립트는 관리하기 힘든 크기로 커지곤 해요: 예를 들어 Hugging Face transformers Trainer는 4천 줄을 넘었어요. 재미있는 사실은 transformers가 모델 수준에서 복사 붙여 넣기를 선택했다는 것이에요. 그들의 "단일 파일 모델" 정책 뒤에 이유에 대한 포스트를 확인해주세요.

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

대안으로 복사 및 붙여넣기 대신 브랜치를 유지하는 것이 있습니다. 하지만 팀원들과 협업에 너무 많은 부담을 주는 것 같아요. 게다가, 복사 붙여넣기의 매력에 관한 몇 가지 게시물을 더 발견했어요. "자료"에서 확인해보세요.

## 공유된 연구 코드 유지 관리는 어려워요

많이 사용되는 공유 코드를 유지보수하는 것은 많은 작업이 필요해요. torch.nn.Module의 파일 라인 수를 Pytorch 버전에 대해 그래프로 나타낸 것을 살펴봐요. 심지어 가장 선물된 연구 팀도 복잡성을 유지하기 어렵다는 것을 알 수 있어요.

![Softwareforexploration_4](/TIL/assets/img/2024-07-09-Softwareforexploration_4.png)

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

큰 공동 연구 코드를 유지하는 데 필요한 시간과 리소스를 과소평가하지 마세요. 연구 라이브러리가 더 많이 사용될수록 더 복잡해집니다. 일반 라이브러리보다 빠르게 발생하는 이유는 각 연구 방향이 약간 다른 사용 사례를 갖고 있기 때문입니다. 기여할 수 있는 내용에 대한 매우 엄격한 규칙을 정립하세요. 그렇지 않으면 공동 코드는 취약해지고 옵션을 가득 채우고 버그가 많은 최적화와 예외 사항으로 넘치게 됩니다. 대부분의 연구 코드가 사라지기 때문에 이 모든 추가 복잡성은 다시 사용되지 않을 것입니다. 일부 공동 코드를 제거하면 실제 연구를 진행할 시간을 확보할 수 있습니다.

## 탐험을 위해 설계하고 코드 재사용을 위해 설계하지 마세요

코드를 너무 많이 미래지향적으로 만들고 싶지 않은 것도 약간 사실입니다. 요구 사항을 충족하는 가장 간단한 솔루션을 구현하려 노력하세요. 그러나 프로덕션 코드에는 항상 유지 관리 가능성을 고려해야 합니다. 예를 들어, 오류 처리, 속도, 로깅, 모듈화는 일반적으로 고려해야 할 사항입니다.

연구 코드에는 그런 것이 중요하지 않습니다. 단지 아이디어가 좋은지 나쁜지를 최대한 빠르게 증명하고 넘어가려 합니다. 따라서 모듈이나 API 없이 해당 목적을 달성하는 더러운 단순성은 전혀 문제가 되지 않습니다!

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

가치 있는 시간을 낭비하지 마세요. 이른 시점에 소프트웨어 투자를 하지 마십시오:

- 프로젝트 초반에 컴포넌트 인터페이스를 생성하는 것. 자체 제작한 인위적인 제약 조건에 맞추느라 너무 많은 시간을 소비하게 됩니다.
- 딥 러닝 솔루션을 확정하기 전에 딥 러닝 훈련 인프라를 최적화하는 것.
- 프로토타이핑 중에는 프로덕션 구성/팩토리/직렬화 시스템이나 베이스 클래스를 사용하지 않는 것. 종종 이 기능이 필요하지 않을 수 있습니다.
- 지나치게 엄격한 린팅 및 타입 체크 시스템. 빠르게 변화하는 일회용 연구 코드를 늦추는 이유가 없습니다.

# 2. 빠른 탐색에 투자하기

연구 프로젝트의 목표는 혁신적인 솔루션을 찾는 것입니다. 아무도 (정의상) 그 모습을 모릅니다. 제한된 정보가 있는 복잡한 연구 환경에서 최적화 프로세스와 유사합니다. 좋은 최솟값을 찾기 위해 많은 경로를 시도하고, 좋은 경로와 나쁜 경로를 인식하고 국소 최솟값에 갇히지 않아야 합니다. 모든 것을 빠르게 수행하려면 기술적 부채를 갚는 대신 소프트웨어 투자를 할 필요가 있을 수 있습니다.

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

## 공통 경로 가속화

![Screenshot](/TIL/assets/img/2024-07-09-Softwareforexploration_5.png)

시도하고 싶은 여러 가지 연구 경로가 있습니다. 대부분의 경로에서 시간을 단축시킬 수 있는 디자인, 라이브러리 또는 최적화가 있습니까? 시도할 아이디어를 항상 알 수 없으므로 너무 많은 것을 과도하게 설계하지는 마십시오. 이는 각 프로젝트마다 맞춤적이지만, 여기에 일부 예시가 있습니다:

- 딥 네트워크를 학습한다면, 학습 인프라에 투자하십시오. 학습 중 빠르고 신뢰성 있게 수렴할 수 있는 하이퍼파라미터를 찾으세요.
- 모든 실험이 각기 다른 모델을 사용해야 한다면, 어떻게 빠르게 교체할 수 있는지 파악하세요 (예: 단순한 팩토리 시스템 또는 단순 복사 붙여넣기).
- 모든 실험이 매개변수가 너무 많아 관리가 어렵다면, 좋은 구성 라이브러리에 투자하십시오.

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

## 빠르게 분기 내리기

![image](/TIL/assets/img/2024-07-09-Softwareforexploration_6.png)

연구자들은 빠르게 새로운 다양한 아이디어를 시작할 수 있어야 합니다. 프로젝트 초반에는 쉬워 보이지만, 사람들이 자신이 선호하는 연구 경로에 빠지면서 점차 더 어려워지는 경향이 있습니다. 이를 해결하기 위해 문화적인 변화와 조직적인 변화가 필요합니다. 비영리적인 연구가 너무 많은 비용과 감정을 들이기 전에 중단시킬 수 있는 프로세스가 있어야 합니다. 정기적인 데모 데이와 기술 동료 검토는 이를 위한 효과적인 전략으로 기능할 수 있습니다. 또한 새롭고 반짝거리는 아이디어에 뛰어드는 사람들과 현재 프로젝트를 적절하게 마무리하는 사람들 사이의 균형을 찾는 것이 중요합니다.

그러나 이것은 소프트웨어 게시물이므로 새로운 프로젝트를 분기 내리기 쉽게 하는 몇 가지 실천 방법을 소개합니다:

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

- 알고리즘에서 평가 코드를 분리하여 유지하세요. 평가는 일반적으로 연구 방향보다 안정적입니다.
- 새로운 프로젝트를 빈 화면에서 시작하는 것을 환영하지만, 재사용되는 구성 요소에 주의하세요. 모듈화하고 정리하는 것이 좋은 투자입니다.
- 새로운 연구 프로젝트에서 가장 혁신적이고 위험한 구성 요소를 먼저 구현하세요. 이렇게 함으로써 대부분의 병목 현상을 확인하고 미래 소프트웨어 디자인을 안내할 수 있습니다.

## 신호 대 잡음 비율 증가

![](/TIL/assets/img/2024-07-09-Softwareforexploration_7.png)

잡음이 많고 버그가 있는 코드는 결과를 너무 모호하고 결론이 나지 않게 만들어 전체 프로젝트가 시간 낭비가 될 수 있습니다. 여러분이 과도하게 엔지니어링을 하지 않아도 되지만, 코드를 지저분하게 만들지 않으려면 다음과 같은 간단한 지침을 쉽게 따를 수 있습니다:

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

- 부작용이 있는 코드를 피하세요.
- 클래스보다는 함수를 기본으로 사용하고, 클래스를 사용할 때에는 상속 대신 캡슐화를 선호하세요.
- 함수/클래스/모듈의 길이를 최소화하고, if 문의 개수를 최소화하세요.
- 파이썬을 잘 알지만 간단한 기술을 사용하세요. 메타클래스, 데코레이터, 함수형 프로그래밍의 복잡한 부분에 빠지지 말아주세요.

서로 다른 실행에서 다른 결과를 내는 소프트웨어는 작업하기 까다로울 수 있습니다. 불운한 시드를 기반으로 한 중요하지만 잘못된 결정을 내렸을 경우, 많은 시간을 소비하게 될 수도 있습니다. 비결정적 소프트웨어를 다룰 때 몇 가지 팁을 안내드립니다:

- 알고리즘에서 나오는 노이즈와 해당 평가에서 나오는 노이즈를 구분하세요. 노이즈 원천들이 쌓이며 완전히 결정론적인 평가를 지향해야 합니다.
- 모든 랜덤 시드를 찾을 때까지 무작위성 원천을 찾지 마세요. 모든 무작위 시드를 찾은 후에도 노이즈는 데이터나 부작용이 있는 일반 함수에서 나올 수 있습니다.
- 시드를 변경하고 결과의 기본 분산을 결정하세요. 통계적으로 유의미하지 않은 결과에 기반한 결정을 내리지 마세요.

# 결론

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

위 텍스트를 친근한 톤으로 한국어로 번역해드릴게요:

연구 코드에 관한 이 게시물에서 이 유머가 나왔어요:

훌륭한 코딩 기초가 중요한 것은 사실이지만, 결국 중요한 것은 탐구와 실제로 유용한 제품입니다. 연구에 너무 많은 제품 소프트웨어를 사용하면 새로운 것을 발견하는 데 필요한 시간을 낭비하게 됩니다. 대신, 탐구 과정을 늦추는 요소를 찾아내세요. 빠른 브랜칭, 결과 도출 시간 및 깔끔한 무소음 코드에 투자하여 연구 경로를 가속화하세요.

코드 재사용을 완전히 부정하는 것은 어리석은 일일 것입니다. 제가 말하고 싶은 건 코드 재사용이 균형있게 이뤄져야 한다는 점입니다. 연구에서는 일회성 코드의 비율이 제품 개발보다 더 큽니다. 그래서 재사용에 대한 균형은 더욱 무게가 실립니다. 코드 재사용의 함정에 대한 더 많은 정보를 아래에서 확인해보세요.

읽어 주셔서 감사합니다! LinkedIn이나 Twitter에서 저를 만날 수 있습니다.

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

## 자료

코드 재사용에 관한 더 많은 게시물:

- 재사용 가능한 코드: 좋은 점, 나쁜 점, 그리고 못생긴 점
- 반복하는 것이 맞는 경우
- 재사용의 장단점이 포함된 균형 StackExchange

복사 및 붙여넣기 실천 방법을 주장하는 더 많은 게시물:

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

- 복사 붙여넣기가 정말 문제일까요?
- 코드를 복사 붙여넣기해야 하는 때는 언제인가요?
- 복사 붙여넣기 프로그래밍의 장단점
- "5년 경력의 시니어로써 저는 내가 어떤 코드를 복사해야 하는지 아는 것이 내 급여의 일부일 것 같아요 lol"

원문은 https://sinavski.com에서 확인할 수 있습니다.
