---
title: "제트팩 컴포즈에서 WebView 사용하기"
description: ""
coverImage: "/assets/img/2024-05-02-UsingWebViewinJetpackCompose_0.png"
date: 2024-05-02 00:21
ogImage: 
  url: /assets/img/2024-05-02-UsingWebViewinJetpackCompose_0.png
tag: Tech
originalTitle: "Using WebView in Jetpack Compose"
link: "https://medium.com/@kevinnzou/using-webview-in-jetpack-compose-bbf5991cfd14"
---


<img src="/assets/img/2024-05-02-UsingWebViewinJetpackCompose_0.png" />

웹뷰는 앱 개발에서 자주 사용하는 구성 요소로, 동적 HTML 페이지를 표시하는 데 사용할 수 있습니다. Android View 시스템에서는 XML에 직접 WebView 구성 요소를 추가하여 사용할 수 있지만, Jetpack Compose에는 직접 사용할 수 있는 WebView 구성 요소가 없습니다. 그렇다면 Compose에서 WebView를 어떻게 사용해야 할까요?

이 기사에서는 Jetpack Compose에서 WebView를 사용하는 방법과 기본 기능을 활용하는 방법에 대해 소개하겠습니다.

# 권한

<div class="content-ad"></div>

먼저 Android Manifest에 권한을 추가해야 합니다:

```js
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:usesCleartextTraffic="true">
    </application>

</manifest>
```

# AndroidView

그런 다음 웹 페이지를 표시하는 Composable 컴포넌트를 만들어야 합니다.

<div class="content-ad"></div>

```js
@Composable
fun WebView(){
  
    // URL을 포함한 문자열 선언
    val mUrl = "https://www.google.com"
  
    // AndroidView 내에 WebView를 추가
    // 전체 화면 레이아웃
    AndroidView(factory = {
        WebView(it).apply {
            layoutParams = ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
            )
        }
    }, update = {
        it.loadUrl(mUrl)
    })
}
```

우리는 AndroidView를 사용하여 WebView 구성 요소를 래핑했습니다. factory 메서드에서는 AndroidX WebView를 디스플레이 구성 요소로 생성하고 그의 layoutParams를 설정합니다. 마지막으로 update 메서드에서 loadUrl 메서드를 사용하여 URL을 로드합니다.

# WebViewClient

특정 URL을 가로채야 할 때는 어떻게 할까요? View와 유사하게 WebViewClient를 사용자 정의하고 shouldOverrideUrlLoading 메서드를 재정의하면 됩니다.

<div class="content-ad"></div>

```java
@Composable
fun WebView(){
  
    // URL을 포함하는 문자열 선언
    val mUrl = "https://www.google.com"
  
    // 전체 화면 레이아웃의 AndroidView 내부에 WebView 추가
    AndroidView(factory = {
        WebView(it).apply {
            this.layoutParams = ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
            )
            this.webViewClient = CustomWebViewClient()
        }
    }, update = {
        it.loadUrl(mUrl)
    })
}

class CustomWebViewClient: WebViewClient(){
    override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
        if(url != null && url.startsWith("https://google.com")){
            return true
        }
        return false
    }
}
```

# WebChromeClient

더불어, 특정 웹 이벤트를 수신하기 위해 WebChromeClient를 사용자 정의할 수 있습니다:

```java
@Composable
fun WebView(){
  
    // URL을 포함하는 문자열 선언
    val mUrl = "https://www.google.com"
  
    // 전체 화면 레이아웃의 AndroidView 내부에 WebView 추가
    AndroidView(factory = {
        WebView(it).apply {
            this.layoutParams = ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
            )
            this.webChromeClient = CustomWebChromeClient()
        }
    }, update = {
        it.loadUrl(mUrl)
    })
}

class CustomWebChromeClient : WebChromeClient() {
    override fun onCloseWindow(window: WebView?) {}
    
    override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {}
}
```

<div class="content-ad"></div>

# 라이브러리

그러나 이 방법은 상태가없는 단일 로드에만 적용됩니다. 만약 우리가 웹페이지의 제목, 로딩 상태 및 현재로드된 URL을 얻어야한다면 어떻게 될까요?

비슷하게, 웹페이지에서 새 링크의 앞뒤로 넘기기 및 로딩을 제어해야하는 경우도 있습니다. 더 복잡한 것은 HTML 코드의 로드를 지원해야하는 경우입니다.

다행히도 이미 이러한 기능을 제공하는 라이브러리가 있었습니다. Compose 내에서 직접 사용할 수있는 WebView 구성 요소를 제공하여 개발자가 WebView의 캡슐화 논리를 직접 작성할 필요가 없게합니다. 또한 웹 페이지 속성을 가져 오고 로딩 상태를 수신하는 기능과 같은 기능을 제공하여, 모두 사용 가능합니다.

<div class="content-ad"></div>

기본적인 사용법은 아래와 같이 매우 간단합니다. URL을 로드하고 표시하는 데 사용할 수 있습니다.

```js
val state = rememberWebViewState("https://example.com")

WebView(
    state
)
```

자세한 사용 방법은 다음 기사를 참조해 주세요:

# 이어서 읽을 내용