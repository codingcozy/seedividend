---
title: "Flutter에서 복잡한 HTML 처리하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-HandlingcomplexHTMLinFlutter_0.png"
date: 2024-06-22 15:30
ogImage: 
  url: /assets/img/2024-06-22-HandlingcomplexHTMLinFlutter_0.png
tag: Tech
originalTitle: "Handling complex HTML in Flutter"
link: "https://medium.com/@tkarmakar27112000/handling-complex-html-in-flutter-77aa3d348f51"
isUpdated: true
---



## 플러터에서 중첩된 테이블 뷰 표시

<img src="/assets/img/2024-06-22-HandlingcomplexHTMLinFlutter_0.png" />

저는 비즈니스가 모든 메일, SMS, 소셜 미디어 플랫폼을 한 앱에서 연결하고 고객 커뮤니케이션을 관리하는 통합 메시징 수신함 애플리케이션인 Helpwise 애플리케이션을 개발 중입니다.

앱의 기능 중 하나는 Gmail 수신함을 연결하여 모든 이메일을 같은 앱에서 받는 것입니다. Helpwise는 지금까지 모든 이메일 스레드를 표시하기 위해 웹 뷰를 사용해 왔기 때문에 지금까지 어떤 문제도 발생하지 않았습니다.

<div class="content-ad"></div>

웹뷰를 네이티브 플러터 코드로 이동하기로 결정했어요, 즉 앱 자체에서 이메일 데이터를 처리하기로 했어요. 내 지식으로는 HTML 데이터를 쉽게 처리하고 flutter_html 패키지를 사용해 HTML을 렌더링할 수 있다고 생각했어요.

간단해 보이죠? 어떤 문제가 발생할 수 있을까요? 😂

하지만 그렇게 간단하지 않아요. 코드를 구현한 후 대부분의 이메일이 잘 보이지만 뉴스레터, 서명 및 테이블이 전혀 나타나지 않았어요.

전 정말 깜짝 놀랐어요. 웹에 대한 지식이 전혀 없어 어떻게 이를 해결할 수 있을까요?

<div class="content-ad"></div>

저는 전체 웹을 검색해보니 해당 패키지가 복잡한 테이블을 제대로 처리하지 못하는 것을 발견했고, HTML을 렌더링하기 위해 패키지가 TABLE_SECTION을 표시하여 해당 영역을 표시한다는 것을 알았어요.

이 버그는 2021년 3월에 열렸으며 아직 해결되지 않았습니다.

<img src="https://miro.medium.com/v2/resize:fit:888/1*rCkV8LeAQf6Wiizx0ljAsQ.gif" />

도와주실 수 있나요? 지금 제가 할 수 있는 일이 무엇인가요?

<div class="content-ad"></div>

## 해결책 1

첫 번째 해결책은 html_editor_enhanced를 사용하는 것이었습니다. 이는 텍스트 편집기로 HTML 코드를 삽입하여 편집기를 뷰 전용 위젯으로 사용하는 방법입니다.

해결책을 시도해보았지만 왜 작동하지 않았을까요?

편집기가 비활성화되어 있더라도 특정한 높이를 지정해주어야 합니다. 필요한 높이를 주면 이메일의 보기 영역이 제한됩니다.

<div class="content-ad"></div>

당신이 없슴을 알겠는데, 함께 수정하면 된다고 생각해요! 😊 계속해서 함께 문제를 해결해 나가보자구요! 🚀

<div class="content-ad"></div>

<img src="https://miro.medium.com/v2/resize:fit:996/1*mEstF6mH4U8BXs7z40YxhA.gif" />

저는 선배와 문제를 논의하면서, 합의할 수 있는 해결책을 찾으려고 노력했어요. 그때 갑자기 그가 제안한 것이라구요

이게 뭐야? HTML을 Webview에서 렌더링할 수 있을 줄 몰랐어? Webview를 표시하려면 URL이 필요한 것 아니었어?

지금 알게 된 건가봐요 😅

<div class="content-ad"></div>

## 실제 해결책

그래서 우리가 어떻게 구현했는지 봅시다,

우리는 flutter_inappwebview 패키지를 사용했어요

HTML을 렌더링하고 완벽하게 작동했어요.

<div class="content-ad"></div>

모두 읽어주셔서 감사합니다......😍😍

아직 읽고 계신다면 쉽지 않군요 😅

![image](https://miro.medium.com/v2/resize:fit:996/1*IEsaQG2ZpzqelL3T1bUVQg.gif)

HTML을 표시하는 것은 가능했지만 특정 높이를 증명해야 했습니다. 즉, 사용자는 전체 내용을 보려면 이메일 내에서 스크롤해야 하는데, 심지어 리스트뷰 빌더 내에서도 그렇습니다.

<div class="content-ad"></div>

## 이제 웹뷰 높이를 동적으로 조절해야 할까요?

수 시간 동안 검색한 끝에 웹뷰의 높이를 얻기 위해 특정 HTML 코드를 추가하는 StackOverflow 쓰레드를 찾았어요.

하지만 문제는 이 해결책을 적용한 후에, 일부의 경우 높이가 0으로 표시되고 오류도 표시되지 않았어요. 초기 높이를 설정하면 이메일을 볼 수 있지만요.

지금은 HTML 코드가 문제인 것 같아요. 우리는 플러터에 친숙하니까요.

<div class="content-ad"></div>

## 단계 2 — 높이 일관되게 가져오기

웹뷰 높이를 인쇄할 수 있는지 확인할 때 콘솔 로그를 추가하여 높이를 출력했는데, 놀랍게도 매번 올바른 높이를 얻었습니다.

그러자 왜 그냥 로그를 가져와서 두 배로 변환하고 사용하지 않을까 생각했죠. 간단하죠?

결국 그랬더니 딱 맞았습니다 😅

<div class="content-ad"></div>

```js
AnimatedContainer(
  duration: Duration(milliseconds: 500),
  height: height + (height == 0 ? 0 : 50),
  child: InAppWebView(
    initialData: InAppWebViewInitialData(data: html),
    initialOptions: InAppWebViewGroupOptions(
      crossPlatform: InAppWebViewOptions(
        supportZoom: false,
        javaScriptEnabled: true,
        disableHorizontalScroll: false,
        disableVerticalScroll: true,
      ),
    ),
    onLoadError: (controller, url, code, message) =>
        print("onLoadError: $url, $code, $message"),
    onLoadHttpError:
        (controller, url, statusCode, description) => print(
            "onLoadHttpError: $url, $statusCode, $description"),
    onConsoleMessage: (controller, consoleMessage) {
      print('height: ${height}');
      height = double.parse(consoleMessage.message);
      setState(() {});
    },
  ),
);
```

```js
html = """
<html lang="en">
  <meta name="viewport" content="width=device-width user-scalable=no zoom=1.1">
  <style>img {max-width: 100%; height: auto}</style>
  <body>
    <div><div class="htmlWrapper container" id="_flutter_target_do_not_delete">$html</div></div>
    <script>
      function outputsize() {
        console.log(document.getElementById("_flutter_target_do_not_delete").offsetHeight);
        window.postMessage('flutterTargetHeight', document.getElementById("_flutter_target_do_not_delete").offsetHeight);
      }
      new ResizeObserver(outputsize).observe(_flutter_target_do_not_delete)
      outputsize()
    </script>
</html>
""";
```

이렇게하여 HTML이 로드될 때마다 올바른 높이를 얻고 부드러운 애니메이션을 함께 사용할 수 있었습니다.

만세!!! 성공했습니다…….

<div class="content-ad"></div>

위 글 읽어주셔서 감사합니다 ❤️

제 Udemy 과정인 "2023년 Appwrite with Flutter 초급 과정"이 오픈되었습니다. 아래 링크를 통해 강좌를 확인하세요!

[Appwrite with Flutter 초급 과정 2023](https://www.udemy.com/course/appwrite-with-flutter-beginner-course-2023/)

감사합니다!

<div class="content-ad"></div>

마크다운 형식으로 표 태그를 변경하세요.
