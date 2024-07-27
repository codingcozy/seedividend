---
title: "Android Jetpack Compose로 Custom TopAppBar 만드는 방법"
description: ""
coverImage: "/assets/img/2024-06-30-CustomTopAppBarusingAndroidJetpackCompose_0.png"
date: 2024-06-30 22:49
ogImage: 
  url: /assets/img/2024-06-30-CustomTopAppBarusingAndroidJetpackCompose_0.png
tag: Tech
originalTitle: "Custom TopAppBar using Android Jetpack Compose"
link: "https://medium.com/@shivathapaa/custom-topappbar-using-android-jetpack-compose-f9b33388a125"
---


현대적인 안드로이드 앱을 개발할 때 TopAppBar composable을 사용하면 디자인이나 사용자 경험을 보완하는 데 문제가 발생할 수 있다는 것을 확신합니다.

문제점 몇 가지 예시:

- TopAppBar에서 SearchBar를 사용할 수 없습니다(호환이 되지 않습니다).
- TopAppBar의 높이를 사용자 정의할 수 없습니다.
- 기본 높이를 초과하는 다른 composable를 정의할 수 없습니다. 즉, Text composable만 사용해야 합니다(물론 "title"이라는 매개변수 때문에 Text composable만 사용하는 것이 권장됩니다).

여기 참고할 만한 "title" 매개변수에 대한 내용이 있습니다:

<div class="content-ad"></div>

```kotlin
@Composable
fun TopAppBar(
    title: @Composable () -> Unit,
    modifier: Modifier = Modifier,
    navigationIcon: @Composable () -> Unit = {},
    actions: @Composable RowScope.() -> Unit = {},
    windowInsets: WindowInsets = TopAppBarDefaults.windowInsets,
    colors: TopAppBarColors = TopAppBarDefaults.topAppBarColors(),
    scrollBehavior: TopAppBarScrollBehavior? = null
) { ... }
```

왜 정확히 TopAppBar를 사용자 정의해야 하나요? 그게 꼭 필요한 건가요? 그냥 Scaffold 내부의 composable을 사용자 정의하고 TopAppBar(topBar)를 사용하지 않으면 안 되나요?

모든 것을 맥락을 가지고 대답하겠습니다. 여기서 시작해봅시다.

아래 gif를 보세요. 거기서 무엇을 보셨나요? 경험을 개선할 방법은 없을까요?
Google이라는 걸 알고 있고, 개발자들의 작업을 칭찬합니다. 그래도 여전히 TopAppBar의 추가 색상 패딩 대신 투명 컨테이너 색상이면 좋겠다고 생각합니다. (여기서 statusBar 색상과 패딩을 무시합시다)


<div class="content-ad"></div>

<img src="https://miro.medium.com/v2/resize:fit:1172/1*AxYM9552OKFCjkjQIh4Y_A.gif" />

이 것이 간단한 수정이겠지 생각하고 있을 것입니다. 하지만 문제는 그렇게 쉽게 해결되지 않는다는 것입니다. TopAppBar가 SearchBar가 확장될 때의 높이 제한에 갇히고 예기치 않은 동작을 볼 것입니다.

```js
  // TopAppBar에 대한 매개변수
colors = TopAppBarDefaults.topAppBarColors().copy(
      containerColor = Color.Transparent,
      scrolledContainerColor = Color.Transparent,
  )
```

기대했던 것 vs 실제 결과, (또한 아래의 SearchBar 뒤의 리스트와 Gmail을 비교해봅시다)

<div class="content-ad"></div>

'TopAppBar'의 "content" 안에 있는 SearchBar를 사용하는 것이 좋은 방법으로 보일 수 있습니다. 그러나 scrollState를 관리하고 scrollBehavior를 제어하는 것은 더 어려운 작업일 수 있고 머리 아플 수도 있습니다. Scaffold는 이미 우리에게 topBar를 제공하므로 동일한 목적으로 body content를 사용하는 까닭이 무엇인가요?

그것은 SearchBar에만 해당되는 경우일 뿐입니다. 사용하고 싶은 사용자 정의 컴포넌트는 어떻게 해야 할까요? 배너나 브랜드 이름 하이라이트와 같은 Composables와 같은 것입니다.

TopAppBar의 가장 좋은 점은 scrollBehavior를 관리하고 적응할 수 있는 여러 동작을 갖고 있다는 것입니다. 예를 들면,

- enterAlwaysScrollBehavior
- pinnedScrollBehavior
- exitUntilCollapsedScrollBehavior 등이 있습니다.

<div class="content-ad"></div>

이러한 이유로 TopAppBar의 nestedScroll을 사용하여 topBar 동작을 제어하는 것이 더 쉽습니다. 이 모든 것은 이를 만들어낸 개발자들 덕분입니다!

이제, 해결책은,

다양한 기술을 시도해 보고 원하는 결과를 얻기 위해 매우 오랜 시간을 검색했지만 예상했던 동작을 얻지 못했습니다. 마침내, 긴 시간 뒤에 디폴트 TopAppBar로 발생한 문제와 이를 수정하여 원하는 동작을 얻는 방법을 기술한 Oya Canlı의 기사를 발견했습니다. 그녀는 TopAppBar의 내장된 scrollBehaviors의 장점을 살리면서 원하는 동작을 얻기 위해 코드를 수정하는 방법을 설명했습니다.

요약하면, Oya Canlı 씨는 더 많은 사용자 정의를 허용하면서 다양한 scrollBehaviors를 지원하는 사용자 정의 FlexibleTopBar를 만들었습니다.

<div class="content-ad"></div>

이 솔루션은 topBar의 무한한 사용 사례를 열어줬어요. 여기서는 사용자 정의 composables를 사용할 수 있으면서도 topBar scrollBehavior를 활용할 수 있는 곳이 많아요.

TopAppBar composable에 익숙하다면 사용자 정의 TopAppBar(i.e. Oya Canlı의 FlexibleTopBar)에서는 거의 차이를 찾아보기 어려울 거에요. 제목, navigationIcon, actions가 지금은 composables를 취하는 content로 대체되었고 더 유연성을 제공합니다.
다음은 코드 조각이에요,

```js
@Composable
fun CustomFlexibleTopAppBar(
    modifier: Modifier = Modifier,
    colors: FlexibleTopBarColors = FlexibleTopBarDefaults.topAppBarColors(),
    scrollBehavior: TopAppBarScrollBehavior? = null,
    content: @Composable () -> Unit,
) { ... }
```

매개변수들에 대해 안내해 드릴게요,

<div class="content-ad"></div>

- color: 이 커스텀 색상 클래스는 FlexibleTopBarColors와 같이 사용되어 이 상단 앱 바의 다른 상태에 사용되는 색상을 해결하는 데 사용됩니다.
- scrollBehavior: 콘텐츠가 스크롤된 양에 따라 topBar의 높이와 색상을 조정합니다. 이를 통해 앱 콘텐츠를 스크롤할 때 top 바가 동적으로 모양을 변경하게 됩니다. (기본 동작)
- content: Scaffold의 topBar에서 사용하려는 조직 가능한 콘텐츠입니다. (topBar에 그리려고 시도한 콘텐츠)

아래는 사용 예시입니다. 이 커스텀 FlexibleTopAppBar 조직 가능성으로 많은 가능성이 있습니다.

전체 코드를 보시려면 파일을 참조하시거나 문서를 따르세요.
전체 앱은 이 리포지토리에서 확인할 수 있습니다.

이 글 작성에 유용한 참고 자료로 Oya Canlı 님의 기사에 대해 특별히 감사를 전합니다.

<div class="content-ad"></div>

방문해 주셔서 감사합니다!

잊지 말고, 항상 더 나은 방법이 있어요!