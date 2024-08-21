---
title: "Mantine을 컴포넌트 라이브러리로 선택한 이유"
description: ""
coverImage: "/assets/img/2024-07-02-WhyIChoseMantineasMyComponentLibrary_0.png"
date: 2024-07-02 21:35
ogImage:
  url: /assets/img/2024-07-02-WhyIChoseMantineasMyComponentLibrary_0.png
tag: Tech
originalTitle: "Why I Chose Mantine as My Component Library"
link: "https://medium.com/javascript-in-plain-english/why-i-chose-mantine-as-my-component-library-ca1da2c56a3a"
isUpdated: true
---

## 서로 다른 라이브러리를 시도해보고 한 가지에만 고수하는 것이 중요하다고 생각해요.

![이미지](/assets/img/2024-07-02-WhyIChoseMantineasMyComponentLibrary_0.png)

저는 현재 회사에서 리드 프런트엔드 개발자로 일하고 있어요. 회사에 합류했을 때 프런트엔드 개발자가 한 명도 없어서 저가 처음이었죠. 그에 따라 중요한 결정들을 해야 했어요.

- 프런트엔드에 어떤 스택을 사용할까요?
- 어떤 개발 도구를 사용할까요?
- 어떤 패키지 매니저를 사용할까요?
- 워크플로우는 어떻게 될까요?

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

다행히도, 프런트엔드 세계의 커뮤니티는 훌륭하며 충분한 정보와 훌륭한 도구가 있어서 여러분에게 잘 맞는 도구를 선택하기가 지나치게 복잡하지 않습니다.

그러나 스타일을 결정할 때는 조금 더 복잡했습니다. 우리만의 컴포넌트 라이브러리를 구축하고 모든 것을 처음부터 스타일링하는 것을 고려해 봤지만, 간단한 버튼에 이 접근 방식을 시도해 보았을 때 컴포넌트 라이브러리를 구축하는 것이 쉽지 않다는 것을 깨달았습니다. 고려해야 할 사항이 많고 다뤄야 할 예외 상황이 많아서 기존의 컴포넌트 라이브러리를 선택하는 것이 더 나은 선택이었습니다.

기존의 컴포넌트 라이브러리를 사용하는 것에 대한 경고도 많지만 제 의견으로는 그것은 상황에 따라 다릅니다. 디자이너와 몇 명의 프런트엔드 개발자, 그리고 전체 스타일이 어떻게 될지에 대한 명확한 비전이 있는 경우 사용자 정의 컴포넌트 라이브러리가 가장 좋은 방법일 수 있습니다. 그러나 소규모 회사의 자금을 조달하기 위해 잠재적인 투자자에게 빠르게 프로토 타입을 제공해야 했던 저와 같은 단독 프런트엔드 개발자의 경우 기존 솔루션을 택해야 했습니다.

## 사용 가능한 컴포넌트 라이브러리는 무엇이 있을까요?

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

저는 이 결정을 내린 시점에 짧은 목록을 줄여야 했습니다. 몇 년 동안 다양한 컴포넌트 라이브러리를 사용해 왔기 때문에 이것이 제가 만든 목록입니다:

- Material UI
- Mantine
- Chakra-UI
- ant.design
- Bootstrap
- HeadlessUI

이 외에도 몇 가지가 있지만, 이 중 주목할 만한 메인 라이브러리입니다.

## 제 결정 프로세스

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

부트스트랩으로 시작해 보겠습니다.

## 부트스트랩

어떤 이유로인지 숙련된 개발자들 사이에서는 부트스트랩이 빨리 배제되고 때로는 조롱을 받기도 한다는 것을 알아챘어요. "부트스트랩을 사용했어?! 왜?" 이런 비웃는 어조로 들었던 적도 있어요. 마치 이 라이브러리가 그들보다 못한 무언가인 것처럼 말이죠.

그 반대편에서는 부트스트랩이 주니어 개발자나 백엔드 개발자들 사이에서 빠르고 더러운 UI를 빠르게 구성하기를 원하는 사람들에게는 가기 솔루션으로 보인다는 걸 알 수 있어요. 이것도 흥미롭달까요. 다른 라이브러리보다 사용하기 쉽지만 그보다 나은 점이라고 볼 수는 없지만 여전히 많은 상황에서 기본 선택으로 보이는군요.

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

현재 기준으로 부트스트랩은 5 버전을 사용 중입니다. 문서를 확인해보면 다양한 컴포넌트와 맞춤 설정 옵션들이 많이 제공되고 있습니다.

제 상황에서는 주로 유틸리티 클래스를 기반으로 하고 기본 스타일링이 내가 만들어야 하는 애플리케이션의 사용 사례에 맞지 않다고 생각해서 부트스트랩을 선택하지 않았어요. 부트스트랩으로 제작된 MVP를 쉽게 알아볼 수 있고, 부트스트랩이 처음 출시되었을 때 만들어졌던 앱들을 떠올립니다. 그 앱들은 항상 어색하고 부트스트랩 앱처럼 보였어요. 제가 디자인을 좋아하지 않아요. 아마 결국 개발자 스노브인 것 같아요.

## HeadlessUI

HeadlessUI는 두 가지 이유로 빠르게 제외했어요:

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

- 이전에 사용해 본 적이 없었는데, 개별 구성 요소를 스타일링하고 조정하는 데 너무 많은 시간을 쓰는 대신 빠르게 필요한 기능을 구축하는 것이 어렵게 보였어요.
- TailwindCSS와 함께 사용해야 해요. 정적 사이트에 Tailwind를 사용하는 것은 좋지만 다시 구축 중인 동적 사이트에 Tailwind를 사용하면 스타일링과 구성 요소 빌드에 많은 시간이 들 것 같았어요.

결국, 시간을 최대한 효율적으로 활용하는 것이 중요한 문제가 되었어요. 디자인 라이브러리를 만드는 전체 프로세스를 즐길 수 있겠지만, 그런 여유는 없었어요.

## ant.design

이건 정말 흥미롭게 보였어요.

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

저는 그들의 문서를 정말 좋아해요. 그들이 제공하는 모든 예시들을 정말 좋아해요. 개발자가 컴포넌트를 사용하는 방법과 각 컴포넌트가 제공하는 옵션을 이해하는 데 정말 도움이 돼요. 그들은 유용한 컴포넌트들의 긴 목록을 가지고 있어요. 페이지네이션과 타임피커와 같은 컴포넌트들이 저에게 매우 매력적으로 다가왔어요. 제가 작업 중인 프로젝트에서 이것들이 필요하다는 것을 알았기 때문이에요. 현재 버전 5로, 이미 신뢰할 만한 라이브러리이기도 해요.

그렇다면 왜 최종적으로 이 라이브러리를 선택하지 않았을까요? 제 생각에 이는 매우 이성적이지 않은 이유들에 달려있다고 생각해요:

- 직접 사용해본 사람을 아무도 몰랐어요. 내가 존경하는 누군가로부터 특별한 추천을 받지 못했어요 — 내가 알거나 내가 존중하는 온라인 개발자로부터.
- 직감일지도요? 뭔가가 제게 충분히 매료되지 못해서 선택하기 어려웠어요. 앞으로의 일정이 정말 많았고, 어떤 이유에서인지 이 선택이 조금 위험하게 느껴졌어요. 만약 잘못될 경우 어려운 질문에 대답해야 할 수도 있을 것 같았거든요.

그럼에도 불구하고, 이는 훌륭한 컴포넌트 라이브러리일 것으로 생각하며, 앞으로 다가올 개인 프로젝트 중 일부에서 꼭 사용할 예정이에요.

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

## Chakra-UI

저는 실제로 개인 프로젝트에서 몇 차례 Chakra-UI를 사용해보았고 꽤 좋아했습니다. 그러나 여러 이유로 이번 프로젝트에는 적합하지 않다고 느꼈습니다.

- 스타일 — 기본 Chakra 구성 요소의 전체적인 스타일, 모양, 느낌이 저의 계획 중인 앱과 어울리지 않았습니다. (스타일과 디자인은 매우 중요합니다!)
- 구성 요소의 API가 다소 제한적입니다. Chakra의 InputGroup 및 InputLeftAddon 및 InputRightAddon과 비교하면 Mantine의 Input 필드에는 더 많은 속성이 있습니다. 그 중 몇 가지는 저가 자주 사용할 것이라고 생각합니다. 전체적으로 rightSection 및 leftSection이 Chakra의 InputGroup 및 InputLeftAddon 및 InputRightAddon보다 직관적이고 사용하기 쉽습니다.

```js
<InputGroup size="sm">
  <InputLeftAddon>https://</InputLeftAddon>
  <Input placeholder="mysite" />
  <InputRightAddon>.com</InputRightAddon>
</InputGroup>
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

아마 작고 사소한 일이겠지만, 오랜 프로젝트에 컴포넌트 라이브러리를 사용하고 많은 시간을 투자할 예정이라면, 작은 것들이 중요하죠.

최종적으로 그 라이브러리가 제게 가장 좋은 옵션을 제공해 주지는 못했네요.

## Material UI

많은 React 개발자들처럼 저도 지난 몇 년간 Material UI를 꽤 사용해 왔어요. 그래서 상당히 익숙한데요. 이 라이브러리에는 많은 장점이 있죠 — 리소스가 풍부하고, 넓은 사용자 베이스를 갖추고 있으며, 계속해서 개발하고 개선 중이며, 신뢰할 수 있고 좋은 테스트를 거쳤으며, 문서화가 정말 잘 되어 있어요.

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

그래서 왜 이 거대한 프로젝트에 사용하지 않았을까요? 제게는 몇 가지 이유가 있었습니다:

- 스타일 — 약간 구글 스럽다고 할까요? 이 라이브러리는 구글의 Material Design을 기반으로 합니다. 잘못 생각하지 마세요. 좋은데요, Material UI를 사용하여 앱을 만들면 조금은 구글 디자인의 흔적이 남아 있습니다. 그건 제가 원하는 것이 아니었어요.
- 입력 필드 — Mui의 입력 필드 디자인이 마음에 들지 않았어요. 입력 필드들이 모두 조금은 키가 큰 느낌이었어요. 제가 작업할 앱에는 많은 입력 필드가 있을 예정이었기 때문에 이 부분이 중요했습니다.
- 너무 많이 사용했어요 — 과거에 MUI를 너무 많이 사용한 것 같아서 새로운 영감과 열정을 얻기 위해 다른 것을 사용하고 싶었어요.

이런 이유들이 명쾌한 이유는 아니라고 솔직히 고백해야 합니다. 삶에서 어떤 결정을 내리는 것은 종종 이렇습니다. 때로는 차가운 이성으로는 설명할 수 없는 직감에 의해 결정되기도 합니다.

## Mantine

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

내 친구가 Mantine을 사용하라고 권유했어. 나는 Jack Herrington의 우수한 YouTube 비디오 중 하나를 보면서 처음 알게 되었었어. Mantine 문서를 살펴보니 문서 레이아웃과 사용 가능한 컴포넌트의 범위에 굉장히 impressed 되었어. 거의 매주 새로운 릴리스가 나와 정기적으로 유지보수되고 있어.

기본 스타일도 나에게 매력적으로 다가왔고, 내가 살펴본 모든 라이브러리 중에서 제일 내가 상상했던 것과 가장 가까운 스타일이었어. Mui나 Bootstrap과 같은 몇몇 라이브러리보다 더 다양한 컴포넌트를 갖추고 있었고, 사용하기가 굉장히 직관적으로 느껴졌어.

또한 7버전에서 (나가서 작성하는 현재 버전), 스타일링을 네이티브 CSS로 마이그레이션했어. 이제 더 이상 스타일 생성을 위해 Emotion에 의존하지 않았어. 이것은 성능을 향상시키고 라이브러리 번들 크기를 줄이며 CSS-in-JS를 지원하지 않는 환경에서 Mantine을 사용할 수 있게 해주어 긍정적인 변화라고 생각해. 최근에 네이티브 CSS가 크게 발전했기 때문에 이 라이브러리에서 사용할 수 있어서 좋아.

이 라이브러리를 사용하기 시작한 지 약 12개월이 지나서도 여전히 결정을 후회하지 않고 있어. 이 라이브러리로 제작한 앱은 정말 멋있게 보여주고, Mantine에서 제공하는 많은 컴포넌트를 사용하고 있어. 확실히 실망시키지 않았어!

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

# 결론

솔직히, 프론트엔드 세계에서 우리는 앱을 스타일링할 때 선택의 여지가 많습니다. 많은 재능 있는 개발자들이 멋진 라이브러리들을 만들어 냈는데(모두 무료로 사용 가능합니다) 우리는 그냥 가져와서 즉시 사용할 수 있습니다. 제가 시작했던 목록에 있는 라이브러리들 중 하나를 선택하면 좋은 개발자 경험을 할 수 있고 스타일적으로 매우 멋진 앱을 만들 수 있을 것 같아요.

한 가지 라이브러리에만 고수하는 것이 아니라 다양한 라이브러리들을 시도해보는 것도 중요하다고 생각해요. 다양한 방법을 배우며 잘 동작하는 것과 그렇지 않은 것을 보게 될 것이고 개발자로서 경험이 넓어지게 될 거에요.

# 나에 대해

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

저는 일상적으로 React와 Typescript를 주로 다루는 프론트엔드 개발자입니다. 새로운 도구나 라이브러리를 탐험하고, 자바스크립트 생태계를 사랑합니다.

새롭게 발견한 흥미로운 도구, 사용 방법에 관한 글, 가끔은 의견 글까지 함께 공유하는 블로그 글을 쓰는 것을 좋아합니다.

체코 공화국 프라하에 가족과 함께 살고 있습니다.

제 블로그에서 원본 글을 확인해보세요.

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

제 LinkedIn과 Github를 확인해보세요.

# 평문으로 쓴 영어 🚀

In Plain English 커뮤니티의 일원이 되어 주셔서 감사합니다! 떠나시기 전에:

- 작가를 박수로 격려하고 팔로우를 눌러주세요 ️👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | 뉴스레터
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture | Cubed
- PlainEnglish.io에서 다양한 콘텐츠 확인하기
