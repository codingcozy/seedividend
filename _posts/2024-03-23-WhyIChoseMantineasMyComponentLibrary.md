---
title: "Mantine를 컴포넌트 라이브러리로 선택한 이유"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Why I Chose Mantine as My Component Library"
link: "https://javascript.plainenglish.io/why-i-chose-mantine-as-my-component-library-ca1da2c56a3a"
isUpdated: true
---

## 다양한 라이브러리를 시도해 보고 하나에만 고수하는 것도 중요하다고 생각해요.

![component library](/assets/img/Why-I-Chose-Mantine-as-My-Component-Library_0.png)

저는 현재 직장에서 리드 프론트엔드 개발자로 일하고 있어요. 회사에 합류했을 때 프론트엔드 개발자가 전혀 없었기 때문에 제가 처음으로 왔고, 그로 인해 중요한 결정들을 내렸어요.

- 프론트엔드에서 어떤 스택을 사용할까요?
- 어떤 개발 도구를 사용할까요?
- 어떤 패키지 매니저를 사용할까요?
- 저희의 워크플로우는 무엇일까요?

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

다행히도, 프론트엔드 세계의 커뮤니티는 훌륭하고 충분한 정보와 훌륭한 도구가 있어서 잘 서비스할 도구들을 선택하는 것이 너무 복잡하지는 않습니다.

그러나 스타일링을 결정할 때는 조금 까다로웠어요. 직접 컴포넌트 라이브러리를 구축하고 모든 것을 처음부터 스타일링 하는 아이디어를 고려해 봤지만, 간단한 버튼에 이 접근 방식을 적용해 보니 컴포넌트 라이브러리를 구축하는 게 쉬운 작업이 아니라는 것을 깨달았어요. 고려해야 할 사항이 많고 다루어야 할 예외 사항도 많기 때문에 기존의 컴포넌트 라이브러리를 선택하는 게 더 나았습니다.

기존의 컴포넌트 라이브러리를 사용하는 것에 대한 많은 경고가 있지만, 제 의견으로는 상황에 따라 다르다고 생각해요. 디자이너와 몇 명의 프론트엔드 개발자가 있고 전체 스타일이 어떻게 될지 명확한 비전이 있다면, 사용자 정의 컴포넌트 라이브러리가 가장 좋은 해결책이 될 수 있어요. 하지만 저는 우리 작은 회사를 위한 자본을 모금하기 위해 잠재 투자자들에게 빠른 프로토타입을 만들어야 하는 한인 프론트엔드 개발자였기 때문에 기존 솔루션을 선택해야 했어요.

## 서로 사용 가능했던 컴포넌트 라이브러리

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

이 결정을 내리기로 했을 때, 후보 목록을 좁히는 시간이었어요. 몇 년 동안 여러 컴포넌트 라이브러리를 사용해 왔기 때문에, 다음은 내가 선정한 목록입니다:

- Material UI
- Mantine
- Chakra-UI
- ant.design
- Bootstrap
- HeadlessUI

더 많은 라이브러리가 있지만, 이 목록이 제가 집중적으로 살펴보던 것들이었어요.

## 나의 결정 과정

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

시작해보겠습니다.

## Bootstrap

어떤 이유 때문에 경험이 풍부한 개발자들 사이에서 Bootstrap이 빨리 제거되거나 때로는 조롱받는 것을 알아차렸어요. "Bootstrap을 사용했어?! 왜 그래?!" 라는 조롱하는 어조로 들었죠. 마치 이 라이브러리가 자신들보다 못하다는 느낌으로 말이에요.

그와는 반대로, 초보 개발자나 빠르고 더러운 UI를 조립하고 싶은 백엔드 개발자들에게는 필수 라이브러리인 것 같아요. 이것도 흥미롭게 생각해요. 다른 라이브러리들보다 사용이 더 쉽거나 더 멋있어 보이는 것은 아닌데, 여전히 많은 상황에서 기본 선택처럼 보이죠.

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

부트스트랩(현재 기준)은 5버전을 사용하고 있어요. 문서를 확인하면 다양한 컴포넌트와 맞춤 설정 옵션들이 많이 있어요.

저의 경우에는 주로 유틸리티 클래스를 기반으로 한다는 점과 기본 스타일이 저의 애플리케이션에 적합하지 않다고 생각했기 때문에 부트스트랩을 선택하지 않았어요. 부트스트랩으로 만든 MVP를 쉽게 알아볼 수 있고, 처음 나왔을 때 만들어졌던 앱들을 떠올릴 정도로 둥그런 느낌이에요. 항상 어색하고 부트스트랩 앱처럼 보입니다. 디자인이 마음에 들지 않아요. 아마 결국 나는 개발자 스노브인가 봐요.

## HeadlessUI

HeadlessUI의 경우 두 가지 이유로 빨리 배제했어요:

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

- 저는 이를 사용해 본 적이 없었고, 개별 구성 요소의 스타일링과 조정에 너무 많은 시간을 쓰게 될 것 같았습니다. 필요한 기능을 빠르게 구현하는 대신에.
- 당신은 TailwindCSS와 함께 사용해야 합니다. 정적 사이트에서 Tailwind를 좋아하지만, 다시 만들고 있는 동적 사이트에 Tailwind를 사용하는 것은 스타일링과 컴포넌트 라이브러리 구축에 너무 많은 시간이 걸릴 것 같았습니다.

이 모든 것은 제 시간을 최대한 효율적으로 활용하는 것으로 결정되었습니다. 디자인 라이브러리를 구축하는 전체 과정을 즐길 수는 있겠지만, 저에게는 그런 여유가 없었습니다.

## ant.design

이것은 정말로 저를 흥미롭게 했습니다.

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

저는 그들의 문서를 정말 좋아해요. 그들이 제공하는 모든 예제들을 정말 좋아해요. 이 예제들 덕분에 개발자가 각 구성 요소를 어떻게 사용해야 하는지 이해하기가 매우 쉬워졌어요. 유용한 많은 구성 요소 목록을 갖고 있죠. 페이징이나 시간 선택기와 같은 컴포넌트들이 프로젝트에서 필요할 것이라는 확신이 들었어요. 현재 버전 5를 사용 중인 성숙한 라이브러리이기도 해요.

그렇다면 왜 최종적으로 이 라이브러리를 선택하지 않았을까요? 제가 생각하기에 이는 매우 이성에 맞지 않는 이유 때문이에요:

- 누군가가 그것을 사용한 사람을 직접 알지 못했어요. 존경하는 누군가 — 아는 사람이든 인터넷에서 존경하는 개발자든 — 로부터 구체적인 추천을 받지 않았거든.
- 직감일지도 모르죠? 무언가가 제게 충분히 매력적으로 다가오지 않았어요. 제 앞으로 해야 할 일이 많았고 이 선택이 조금 불안정한 것 같아보였어요. 만약 실패하면 대답해야 할 어려운 질문들이 생길 것 같더라고요.

전체적으로, 이것은 훌륭한 컴포넌트 라이브러리일 것으로 생각되며, 앞으로 제 개인 프로젝트 중 일부에서 활용할 계획이에요.

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

실제로 개인 프로젝트에서 Chakra-UI를 여러 번 사용해 봤는데, 꽤 마음에 들었어요. 그러나 이번 프로젝트에는 몇 가지 이유로 맞지 않다고 느꼈어요:

- 스타일 — 기본 Chakra 컴포넌트의 전체적인 스타일, 디자인, 느낌이 내가 계획 중인 앱들과 어울리지 않았어요. (스타일과 디자인은 매우 중요해요!)
- 컴포넌트의 API가 조금 제한적이에요. Chakra Input 필드와 Mantine Input 필드를 비교해보면 Mantine의 입력 필드가 많은 프롭스를 가지고 있어요. 그 중 일부는 내가 자주 사용할 것 같아요. 전체적인 rightSection과 leftSection 구조가 Chakra의 InputGroup, InputLeftAddon, InputRightAddon보다 직관적이며 사용하기 더 쉬워요.

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

조금 작은 일이긴 하지만, 오랜 프로젝트에 컴포넌트 라이브러리를 사용하고 많은 작업 시간을 보낼 거라면, 작은 것들이 중요하죠.

그래서 결국 제게 가장 좋은 옵션을 제공해주지는 못했어요.

## Material UI

많은 React 개발자들처럼 과거에 Material UI를 많이 사용해본 적이 있어서 매우 익숙했어요. 이 라이브러리에는 많은 장점이 있습니다. 리소스가 풍부하고 넓은 사용자 베이스를 보유하고 있으며 지속적으로 개발되고 향상되고 있습니다. 신뢰할 수 있고 테스트가 잘 되어 있으며 문서도 아주 잘 되어 있어요.

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

그렇다면 왜 내가 작업 중인 이 큰 프로젝트에 선택하지 않았을까요? 나에게는 몇 가지 이유가 있었습니다:

- 스타일 — 약간 구글스러운 느낌이었어요. 이 라이브러리는 구글의 머티리얼 디자인을 기반으로 하고 있어요. 잘못 알아들지 마세요, 전 괜찮다고 생각하지만, 만약 머티리얼 UI를 사용하여 앱을 만든다면 숙련된 사용자 정의를 하지 않는 한 구글 디자인의 흔적이 있어서 내가 원하는 바가 아니었어요.
- 입력 필드 — MUI의 입력 필드 디자인이 마음에 들지 않았어요. 입력 필드가 모두 약간 크다고 생각했어요. 작업하려고 했던 앱은 많은 입력 필드를 가지고 있어서 이 부분이 중요했어요.
- 너무 자주 사용했어요 — 과거에 MUI를 너무 많이 사용한 것 같아서 새로운 영감과 열정을 얻기 위해 뭔가 새로운 것이 필요하다고 느꼈습니다.

솔직히 말하자면, 이런 이유는 확고하고 타당한 이유가 아니라고 인정해야 합니다. 삶에서 일부 결정을 내릴 때 종종 그런 경우가 있어요. 이는 차가운 논리로도 설명하기 어려운 직감에 따라 결정됩니다.

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

내 친구가 Mantine을 사용하라고 했어. 나는 Jack Herrington의 훌륭한 YouTube 비디오 중 하나를 볼 때 처음으로 발견했어. Mantine 문서를 확인해봤는데, 문서 레이아웃과 제공되는 컴포넌트의 범위에 감명을 받았어. 거의 매주 새로운 릴리스가 나오며 정기적으로 업데이트되고 있어.

기본 스타일도 마음에 들었고, 살펴본 라이브러리 중에서 내가 상상한 것과 가장 비슷한 스타일이라고 느꼈어. Mui나 Bootstrap과 같은 몇 가지 라이브러리보다 더 많은 컴포넌트를 제공하며, 상당히 직관적으로 사용할 수 있었어.

또한 7버전(내가 이 글을 쓰는 시점의 최신 버전)에서 스타일링을 네이티브 CSS로 마이그레이션했어. 이제 Emotion에 스타일 생성에 의존하지 않아. 이것은 성능을 향상시킬 뿐만 아니라 라이브러리 번들 크기를 줄이고 CSS-in-JS를 지원하지 않는 환경에서도 Mantine을 사용할 수 있게 해서 긍정적인 변화라고 생각해. 최근 네이티브 CSS가 크게 발전해 왔기 때문에 이것을 이 라이브러리에서 사용할 수 있는 것은 좋은 일이야.

1년 정도 이 라이브러리를 사용하고 있는데, 아직도 내 결정에 매우 만족하고 있어. Mantine을 사용하여 개발한 앱들이 정말 멋져 보이고, Mantine에서 제공하는 많은 컴포넌트 중 많은 것들을 사용하고 있어. 분명히 실망시키지 않았어!

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

솔직히 말해서, 프론트엔드 세계에서는 앱을 스타일링하는 데 선택지가 많습니다. 많은 재능 있는 개발자들이 멋진 라이브러리를 만들어냈는데(모두 무료로 사용 가능), 이를 가져다가 즉시 사용할 수 있습니다. 제가 처음 소개했던 목록 중 어떤 라이브러리를 선택해도 좋은 개발자 경험을 얻게 되고, 스타일적으로도 아주 멋진 앱을 만들 수 있을 것입니다.

또한 하나의 라이브러리에 고수하는 것이 아니라 다양한 라이브러리를 시도해보는 것도 중요하다고 생각합니다. 다양한 접근법을 배우고, 잘 동작하는 것과 그렇지 않은 것을 보며 개발자로서 경험을 확장할 수 있습니다.

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

저는 일상적으로 주로 React와 Typescript를 사용하여 프론트엔드 개발을 하는 프론트엔드 개발자입니다. 새로운 도구와 라이브러리를 탐험하고 JavaScript 생태계를 사랑합니다.

제가 발견한 흥미로운 새 도구, 사용 방법 설명서, 가끔 의견 기사를 공유하는 블로그 글을 쓰는 것을 좋아합니다.

저는 체코 공화국 프라하에 가족과 함께 살고 있습니다.

제 블로그에서 원문을 확인해보세요.

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

관심 있으시면 제 LinkedIn과 Github를 확인해보세요.

# 평문으로 🚀

In Plain English 커뮤니티에 참여해주셔서 감사합니다! 떠나시기 전에:

- 작가를 박수로 응원하고 팔로우해주세요 ️👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture | Cubed
- PlainEnglish.io에서 더 많은 콘텐츠를 만나보세요
