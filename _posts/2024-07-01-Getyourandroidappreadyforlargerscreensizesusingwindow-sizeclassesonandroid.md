---
title: "Android window-size 클래스를 사용하여 대화면에 최적화하기"
description: ""
coverImage: "/assets/img/2024-07-01-Getyourandroidappreadyforlargerscreensizesusingwindow-sizeclassesonandroid_0.png"
date: 2024-07-01 16:54
ogImage: 
  url: /assets/img/2024-07-01-Getyourandroidappreadyforlargerscreensizesusingwindow-sizeclassesonandroid_0.png
tag: Tech
originalTitle: "Get your android app ready for larger screen sizes using window-size classes on android"
link: "https://medium.com/@mubaraknative/get-your-android-app-ready-for-larger-screen-sizes-using-window-size-classes-on-android-1663d1a77423"
isUpdated: true
---




## 왜 우리는 더 큰 화면 크기를 지원해야 할까요?

안드로이드는 스마트폰 뿐만 아니라 태블릿, 데스크톱 (크롬 OS), 폴더블, 자동차 및 스마트 TV에도 실행됩니다. 현재 30억 대 이상의 활성 장치에서 실행되고 있습니다. 개발자로써 우리는 모든 플랫폼에서 원활한 경험을 제공하기 위해 노력합니다. 폴더블 기기는 현재 핫 토픽으로 각 스마트폰 브랜드가 자체 버전을 출시하고 있습니다. 이러한 기기는 폰부터 태블릿 크기의 디스플레이로 동적으로 화면 크기를 변경합니다.

## 대형 화면 크기를 지원하는 방법은?

모든 화면 크기를 지원하려면 레이아웃을 적응형으로 만들어야 합니다. 이렇게 하면 화면 크기에 따라 크기를 조정할 수 있습니다. 안드로이드에서는 윈도우 사이즈 클래스를 사용하여 이를 달성합니다. 이 클래스는 화면 크기의 고수준 추상화를 제공하여 간단한 유형인 compact, medium, expanded를 제공하므로 화면 크기에 기반한 UI 디자인 결정을 쉽게 할 수 있습니다. 예를 들어, compact 모드에서는 네비게이션 바나 모델 네비게이션 드로어를 표시합니다. 이 클래스에는 2가지 윈도우 사이즈 클래스가 있습니다.

<div class="content-ad"></div>

- 높이
- 너비

![이미지](/assets/img/2024-07-01-Getyourandroidappreadyforlargerscreensizesusingwindow-sizeclassesonandroid_0.png)

현재 윈도우 크기를 얻으려면 libs.versions.toml에 의존성을 추가해보세요.

```js
[versions]
material3AdaptiveNavigationSuite = "1.3.0-beta04"

[libraries]
androidx-material3-adaptive-navigation-suite = { module = "androidx.compose.material3:material3-adaptive-navigation-suite", version.ref = "material3AdaptiveNavigationSuite" }
```

<div class="content-ad"></div>

표 태그를 Markdown 형식으로 변경하고 build.gradle.kts(module:app) 파일에 이를 정의하세요.

```kotlin
dependencies {
    // NavigationSuiteScaffold
    implementation(libs.androidx.material3.adaptive.navigation.suite)
}
```

이 종속성을 추가하면 다음과 같은 두 가지 이점이 있습니다.

- 첫 번째로, currentWindowAdaptiveInfo() 함수를 사용하여 높이와 너비에 대한 창 크기 클래스에 액세스할 수 있습니다.

<div class="content-ad"></div>

```kotlin
val windowSizeClass = currentWindowAdaptiveInfo().windowSizeClass.windowWidthSizeClass
```

그래서 우리가 이런 식으로 UI 디자인 결정을 할 수 있어요.

```kotlin
@OptIn(ExperimentalMaterial3AdaptiveApi::class)
@Composable
fun App(
    widthSizeClass: WindowWidthSizeClass
) {
    // 크기 클래스에 따라 네비게이션 레일을 표시할지 결정하는 로직을 수행합니다.
    val isExpanded = windowSizeClass == WindowWidthSizeClass.EXPANDED

    Row {
        if (isExpanded) {
            NavigationRail {
                NavigationRailItem(
                    /* ... */
                )
            }
        }
        DefaultNavGraph(/* ... */)
    }
}
```

2. 두 번째로, NavigationSuiteScaffold에 액세스할 수 있어서 창 크기에 따라 네비게이션 UI 결정 로직을 단순화할 수 있어요.

<div class="content-ad"></div>

윈도우 크기가 콤팩트하거나 테이블-탑(수평) 위치에 있으면 하단 탐색바가 표시되고, 그 외에는 네비게이션 레일이 표시됩니다.

## 어느 화면 크기에 어떤 네비게이션 레이아웃이 가장 적합한가요?

Material Design 가이드라인에 따르면, 윈도우 크기 클래스는 다음과 같습니다.

- 콤팩트(너비 ` 600 dp): 네비게이션 바, 모달 네비게이션 드로어 사용
- 중간(600 dp≤ 너비 ` 840 dp): 네비게이션 레일, 모달 네비게이션 드로어 사용
- 확장(840 ≤ 너비 ` 1200*): 네비게이션 레일, 모달 또는 표준 네비게이션 드로어 사용 (확장되었을 경우 ListDetailPaneScaffold를 사용하여 목록-세부 화면을 사용할 경우 2 패인 레이아웃 사용)

<div class="content-ad"></div>

## 실제 데모를 확인해 보겠습니다

이미 언급했듯이 NavigationSuiteScaffold를 사용하면 우리의 작업이 정말 간단해집니다. 창 크기 클래스를 기반으로 한 로직을 직접 작성할 필요가 없습니다. NavigationSuiteScaffold가 제공해주는 기능입니다. 데모를 살펴보겠습니다. 그리고 창 크기 클래스를 기반으로 네비게이션 레이아웃을 수동으로 표시하는 방법도 배워보겠습니다.

## 무엇을 만들까요??

![image](/assets/img/2024-07-01-Getyourandroidappreadyforlargerscreensizesusingwindow-sizeclassesonandroid_1.png)

<div class="content-ad"></div>

이 앱에서는 화면의 내용에 집중하지 않고 현재 위치인 텍스트만 표시합니다. 창 크기에 따라 네비게이션 레이아웃을 표시하는 것이 우리의 목표입니다.

이를 구현해 봅시다.

이미 필요한 종속 항목인 마테리얼 3의 네비게이션 스위트를 추가했으므로 코드에 집중해 봅시다.

최상위 목적지로, 열거형 클래스를 추가했습니다. 그 코드는 다음과 같습니다.

<div class="content-ad"></div>

```kotlin
enum class AppDestinations(
    @StringRes val label: Int,
    val icon: ImageVector,
    @StringRes val contentDescription: Int
) {
    HOME(R.string.home, Icons.Default.Home, R.string.home),
    DRAWING(R.string.draw, Icons.Default.Draw, R.string.draw),
    EDIT(R.string.edit, Icons.Default.Edit, R.string.edit),
    SETTINGS(R.string.profile, Icons.Default.Person, R.string.settings),
}
```

그리고 NavigationSuiteScaffold를 호출하고 필요한 인수를 전달합시다.

NavigationSuiteScaffold를 사용할 때 창 크기 클래스를 기반으로 하는 네비게이션 레이아웃을 구현하는 것이 얼마나 쉬운지 코드에서 확인할 수 있습니다. Window-size 클래스에 대한 단일 조건문을 작성할 필요가 없습니다.

원한다면 더 맞춤화할 수도 있습니다. 창 크기에 따라 다른 네비게이션 레이아웃을 표시하려면 NavigationSuiteScaffold에 layoutType이라는 매개변수를 전달하여 할 수 있습니다.


<div class="content-ad"></div>

```kotlin
val adaptiveInfo = currentWindowAdaptiveInfo()

/* 선택 사항 */
val customNavSuiteType = with(adaptiveInfo) {
    if (windowSizeClass.windowWidthSizeClass == WindowWidthSizeClass.EXPANDED) {
        NavigationSuiteType.NavigationRail
    } else {
        NavigationSuiteScaffoldDefaults.calculateFromAdaptiveInfo(adaptiveInfo)
    }
}
```

여기서는 창 클래스를 기반으로 네비게이션 레이아웃을 사용자 정의합니다. 현재 EXPANDED 화면에 있는 경우 네비게이션 바 대신 네비게이션 레일을 표시하며, 아래 조건을 충족하면 레이아웃 화면이 EXPANDED로 고려됩니다:

- 가로 방향으로 사용하는 휴대전화
- 가로 방향으로 사용하는 태블릿
- 가로 방향으로 사용하는 폴더블 (펼쳐진 상태)
- 데스크톱 (Chrome OS)

이제 NavigationSuiteScaffold를 사용하는 방법을 알아보았습니다. 이제 더 맞춤화된 옵션으로 넘어가 봅시다.


<div class="content-ad"></div>

# Window-Size-Classes를 사용하여 네비게이션 레이아웃 결정 처리하기

이제 Window-Size-Class를 기반으로 한 네비게이션 레이아웃 처리 방법을 살펴보겠습니다.

코드에서 보듯이, 화면 크기에 따라 조건부로 Navigation Rail을 표시하는 방법은 다음과 같습니다.

```js
val isExpanded = widthSizeClass == WindowWidthSizeClass.EXPANDED
```

<div class="content-ad"></div>

MainActivity.kt에서 이 함수를 호출해보세요.

```kotlin
YourAppTheme{
    val windowWidthSizeClass = currentWindowAdaptiveInfo().windowSizeClass
    OsbApp(windowWidthSizeClass.windowWidthSizeClass) // 여기서 너비 사이즈 클래스를 사용합니다.
}
```

앱을 실행하면 창 크기에 따라 적절한 내비게이션 레이아웃이 표시됩니다.

<img src="/assets/img/2024-07-01-Getyourandroidappreadyforlargerscreensizesusingwindow-sizeclassesonandroid_2.png" />

<div class="content-ad"></div>

NavigationSuiteScaffold 데모의 소스 코드는 이 저장소에서 확인할 수 있습니다:

이 글에서는 대형 화면 크기에서 최고의 사용자 경험을 제공하는 방법과 사용 사례에 대해 배웠습니다. 이 글이 마음에 드시길 바랍니다. 그렇다면, 이 이야기에 박수를 보내고 친구나 가족과 공유해주세요. 다음 흥미로운 주제로 다가오는 글에서 뵙겠습니다.

무바라크.엠 바샤 드림