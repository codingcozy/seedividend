---
title: "SwiftUI에서 WKWebView와 네이티브 애플리케이션 간 메시지 전달하기"
description: ""
coverImage: "/assets/img/2024-05-20-MessagingBetweenWKWebViewandNativeApplicationinSwiftUI_0.png"
date: 2024-05-20 23:05
ogImage: 
  url: /assets/img/2024-05-20-MessagingBetweenWKWebViewandNativeApplicationinSwiftUI_0.png
tag: Tech
originalTitle: "Messaging Between WKWebView and Native Application in SwiftUI"
link: "https://medium.com/@yeeedward/messaging-between-wkwebview-and-native-application-in-swiftui-e985f0bfacf"
---


이 문서는 WKWebView와 네이티브 측 간의 프로세스간 통신을 탐구합니다. 이는 로컬/임베디드 웹 페이지에 집중할 것입니다.

![이미지](/assets/img/2024-05-20-MessagingBetweenWKWebViewandNativeApplicationinSwiftUI_0.png)

# WKWebView의 탄생

![이미지](/assets/img/2024-05-20-MessagingBetweenWKWebViewandNativeApplicationinSwiftUI_1.png)

<div class="content-ad"></div>

애플은 2003년 맥용 Safari 웹 브라우저의 첫 번째 버전을 출시할 때, 네이티브 애플리케이션에서 웹 콘텐츠를 표시하기 위한 최초 세대의 프로그래밍 인터페이스인 WebView 클래스를 개발했습니다.

2007년, 스티브 잡스가 최초의 iPhone을 발표했습니다. 이후 해에는 iPhone 3G가 출시되었으며 WebKit 프레임워크도 함께 출시되었습니다. 이 프레임워크에는 iOS용 또 다른 프로그래밍 인터페이스인 UIWebView 클래스가 포함되어 있습니다.

애플은 2010년에 WebKit의 두 번째 세대에 대한 작업을 시작했습니다. 4년 후, WebView (macOS) 및 UIWebView (iOS) 클래스를 대체하기 위해 WKWebView가 출시되었습니다. 두 클래스는 2018년에 폐기되었습니다.

이것이 WKWebView의 간단한 역사입니다.

<div class="content-ad"></div>

# WKWebView이 뭔가요?

답은 애플 문서에 있어요.

중요한 점은 네이티브 애플리케이션이 동일한 뷰에서 HTML 및 SwiftUI/UIKit 구성 요소를 표시할 수 있다는 거예요.

왜 HTML과 네이티브 구성 요소를 함께 사용해야 하죠?

<div class="content-ad"></div>

텍스트 콘텐츠나 멋진 UI를 SwiftUI/UIKit로 서식 지정하는 것은 상당히 어려울 수 있습니다. HTML과 CSS는 검증된 기술입니다. 웹 개발자가 모바일 친화적 웹사이트를 제작할 수 있다면, 네이티브 애플리케이션용 UI를 쉽게 만들 수 있습니다!

그로 인해 네이티브 애플리케이션 개발자들이 다른 작업을 처리할 수 있게 되죠...

이 글에서는 좀 더 탐구해보겠습니다.

웹 콘텐츠는 어디서 오는 걸까요?

<div class="content-ad"></div>

당연히, 웹 브라우저는 웹 서버에서 웹 페이지를 로드합니다. WKWebView이 로컬 파일이나 심지어 HTML 스트링에서 웹 콘텐츠를 로드할 수 있다는 것을 알아내는 것은 흥미롭습니다.

로컬 웹 콘텐츠!

이것은 의미하는 바는 기기가 오프라인 상태일 때에도 네이티브 애플리케이션이 여전히 작동할 수 있다는 것입니다! 게다가, 네이티브 애플리케이션은 네트워크 지연을 피할 수도 있습니다.

WKWebView에 대해 자세히 알아봅시다.

<div class="content-ad"></div>

# 웹 뷰 생성하기

```js
struct SwiftUIWebView: UIViewRepresentable {
    typealias UIViewType = WKWebView
    
    var vm: BaseWebViewVM

    // 뷰 모델로 초기화
    init(viewModel: BaseWebViewVM) {
        self.vm = viewModel
    }
    
    func makeUIView(context: Context) -> WKWebView {
        return vm.webView
    }
    
    func updateUIView(_ uiView: WKWebView, context: Context) {
    }
    
    func makeCoordinator() -> Coordinator {
        return Coordinator(viewModel: vm)
    }
}

extension SwiftUIWebView {
    class Coordinator: NSObject {
        var viewModel: BaseWebViewVM 
        
        init(viewModel: BaseWebViewVM) {
            self.viewModel = viewModel
        }
    }
}

class BaseWebViewVM: ObservableObject {
    @Published var webResource: String?
    var webView: WKWebView

    init(webResource: String? = nil) {
        self.webResource = webResource
        
        self.webView = WKWebView(frame: .zero,
                                 configuration: WKWebViewConfiguration())
    }

    func loadWebPage() {
        if let webResource = webResource {
            guard let url = URL(string: webResource) else {
                print("잘못된 URL")
                return
            }

            let request = URLRequest(url: url)
            webView.load(request)
        }
    }
}
```

이 코드만 있으면 WKWebView에서 웹 페이지를 보여줄 수 있어요.

## SwiftUIWebView

<div class="content-ad"></div>

WKWebView은 UIView입니다. SwiftUIWebView는 UIViewRepresentable을 구현하는 구조체로 표현되어야 합니다.

SwiftUIWebView는 BaseWebViewVM의 인스턴스로 초기화되어야 합니다.

makeUIView 메서드는 뷰 모델에서 WKWebView의 인스턴스를 반환합니다.

makeCoordinator 메서드는 Coordinator의 인스턴스를 반환합니다. Coordinator에는 WKWebView를 위한 델리게이트 함수들이 포함되어 있습니다. 현재로서는 특별한 작업을 수행하지는 않습니다.

<div class="content-ad"></div>

## BaseWebViewVM

BaseWebViewVM에는 공개된 속성 webResource가 있습니다. 이 속성은 클래스 생성자(init 메서드)를 통해 초기화될 수 있습니다. 또한 사용자 인터페이스를 통해 채워질 수도 있습니다.

생성자는 대상 webResource를 로드하지 않은 WKWebView의 인스턴스를 만듭니다.

일단 loadWebPage 메서드는 인터넷 웹 리소스를 로드할 것입니다. 나중에 로컬 웹 콘텐츠를 처리하는 방법도 살펴볼 것입니다.

<div class="content-ad"></div>

XCode Playground에서 시도해 보고 싶다면 다음을 추가해보세요:

```js
import SwiftUI
import WebKit
import PlaygroundSupport

// 위의 코드를 포함해주세요

struct ContentView: View {
    let vm = BaseWebViewVM(webResource: "http://www.google.com")
    
    var body: some View {
        SwiftUIWebView(viewModel: vm)
            .onAppear(perform: vm.loadWebPage)
    }
}

PlaygroundPage.current.setLiveView(ContentView())
```

<img src="/assets/img/2024-05-20-MessagingBetweenWKWebViewandNativeApplicationinSwiftUI_2.png" />

인터넷 웹 페이지를 표시하는 데 유용합니다. 로컬 웹 콘텐츠를 표시하는 방법을 살펴보겠습니다.

<div class="content-ad"></div>

# 내장 웹 페이지 표시

먼저 XCode 프로젝트 루트에 Web 폴더를 생성합니다. 모든 웹 페이지와 관련 자료가 포함되어 있습니다.

<img src="/assets/img/2024-05-20-MessagingBetweenWKWebViewandNativeApplicationinSwiftUI_3.png" />

웹 콘텐츠 폴더는 원시 애플리케이션 프로젝트의 물리적인 일부일 수도 있고 그렇지 않을 수도 있습니다. 두 개가 별도의 개체이면 소스 코드 관리에 특히 주의해야 합니다!

<div class="content-ad"></div>

애플리케이션이 특정 HTML 파일에 액세스하는 방법은 무엇인가요?

애플리케이션이 Web 폴더에있는 다음 웹 페이지에 액세스해야 하는 경우: (위 스크린샷 참조)

```js
Web/userGuide/section1/login.html
```

이것은 상대 경로입니다. 애플리케이션은 절대 경로로만 파일을 열 수 있습니다.

<div class="content-ad"></div>

```js
# 시뮬레이터에서

/Users/<your user ID>/Library/Developer/CoreSimulator/Devices/.../Web/userGuide/section1/login.html

# XCode Playground 프로젝트에서

/var/folders/.../Web/userGuide/section1/login.html
```

상대 경로를 절대 경로로 변환하는 코드는 다음과 같습니다:

```js
let nswr = NSString(string: relativePath)

let pathName = nswr.deletingLastPathComponent
let fileExtension = nswr.pathExtension
let fileName = nswr.lastPathComponent.replacing(".\(fileExtension)", with: "")

// pathName: Web/userGuide/section1
// fileName: login
// fileExtension: html

let absolutePath = Bundle.main.path(forResource: fileName,
                                    ofType: fileExtension,
                                    inDirectory: inDirectory)
```

애플리케이션 메인 번들에서 path 메서드는 주어진 파일 정보를 절대 경로로 변환하려고 합니다. 만약 주어진 파일 정보가 잘못되었다면 nil을 반환합니다. 

<div class="content-ad"></div>

애플리케이션이 HTML 파일의 절대 경로를 획득하면, 웹 뷰에 해당 파일을 로드할 수 있습니다.

```js
let url = URL(filePath: absolutePath)
webView.loadFileURL(url, allowingReadAccessTo: url)
```

로드 메서드 대신에 파일 경로를 사용할 때는 loadFileURL 메서드를 사용해야 합니다.

위 샘플 코드를 기준으로 설명하자면, LocalWebViewVM이라는 새 클래스를 추가할 것입니다. 이 클래스는 BaseWebViewVM의 하위 클래스입니다.

<div class="content-ad"></div>

```swift
class LocalWebViewVM: BaseWebViewVM {
    private func processWebResource(webResource: String) -> (inDirectory: String,
                                                             fileName: String,
                                                             fileExtension: String) {
        // 상대 경로명을 구성 요소로 분해하는 코드
    }

    override func loadWebPage() {
        if let webResource = webResource {
            let (inDirectory,
                 fileName,
                 fileExtension) = processWebResource(webResource: webResource)

            guard let filePath = Bundle.main.path(forResource: fileName,
                                                  ofType: fileExtension,
                                                  inDirectory: inDirectory) else {
                print("잘못된 경로")
                return
            }

            print(filePath)
            let url = URL(filePath: filePath)

            webView.loadFileURL(url, allowingReadAccessTo: url)
        }
    }
}
```

해당 하위 클래스는 loadWebPage 메서드를 오버라이드합니다.

ContentView를 다른 뷰 모델로 업데이트합니다.

```swift
struct ContentView: View {
    let vm = LocalWebViewVM(webResource: "Web/userGuide/section1/login.html")
    
    var body: some View {
        SwiftUIWebView(viewModel: vm)
            .onAppear(perform: vm.loadWebPage)
    }
}
```

<div class="content-ad"></div>

아래는 캔버스에서 표시되는 내용입니다. (XCode Playground에서 라이브 뷰로 확인)

![MessagingBetweenWKWebViewandNativeApplicationinSwiftUI_4](/assets/img/2024-05-20-MessagingBetweenWKWebViewandNativeApplicationinSwiftUI_4.png)

# 사용자 상호작용

## 자바스크립트 경고

<div class="content-ad"></div>

웹 페이지나 어플리케이션은 다음과 같은 Javascript 코드를 통해 사용자에게 알림 메시지를 표시할 수 있습니다:

```js
alert("이것은 알림입니다");
```

이것이 발생할 때 WKWebView는 대화 상자를 표시하지 않습니다. 대신, 이 역할은 호스팅 애플리케이션에 위임됩니다.

```js
struct SwiftUIWebView: UIViewRepresentable {
    ...

    func makeUIView(context: Context) -> WKWebView {
        // 알림 처리
        vm.webView.uiDelegate = context.coordinator
        
        return vm.webView
    }

    ...
}

extension SwiftUIWebView {
    class Coordinator: NSObject, WKUIDelegate {
        ...

        // webView 함수는 Javascipt 알림을 처리합니다
        func webView(_ webView: WKWebView,
                     runJavaScriptAlertPanelWithMessage message: String,
                     initiatedByFrame frame: WKFrameInfo,
                     completionHandler: @escaping () -> Void) {
            viewModel.webPanel(message: message,
                               alertCompletionHandler: completionHandler)
        }
    }
}

enum JSPanelType {
    case alert
    
    var description: String {
        switch self {
        case .alert:
            return "알림"
        }
    }
}

class BaseWebViewVM: ObservableObject {
    ...

    // Javascript 알림, 확인, 프롬프트 대화 상자에 대한 프로퍼티
    @Published var showPanel: Bool = false
    var panelTitle: String = ""
    var panelType: JSPanelType? = nil
    
    var panelMessage: String = ""
        
    // 알림 프로퍼티
    var alertCompletionHandler: () -> Void = {}

    // 해당 알림 UI를 위한 프로퍼티 설정
    func webPanel(message: String,
                  alertCompletionHandler completionHandler: @escaping () -> Void) {
        self.panelTitle = JSPanelType.alert.description // "알림"
        self.panelMessage = message
        self.alertCompletionHandler = completionHandler
        self.panelType = .alert
        self.showPanel = true
    }
}
```

<div class="content-ad"></div>

먼저, 응용 프로그램은 context.coordinator를 웹 뷰 uiDelegate 속성에 할당해야 합니다.

Coordinator 클래스는 WKUIDelegate 프로토콜을 구현하고 여러 webView 함수 중 하나를 구현해야 합니다. 더 구체적으로는 Javascript alert용 함수입니다. 이 webView 함수는 UI 표시를 시작하지 않습니다. 대신, 알림 메시지와 콜백 함수를 뷰 모델로 전달합니다.

Javascript alert는 모든 웹 페이지에 대해 일반적인 기능이므로 해당 기능을 하위 클래스가 아닌 BaseWebViewVM에 구현하는 것이 가장 좋습니다.

다음은 몇 가지 새로운 속성입니다:

<div class="content-ad"></div>


showPanel - ContentView에서 UI 표시를 토글하는 발행된 속성입니다.

panelTitle - 일반적인 UI 표시 제목입니다.

panelMessage - 웹 페이지에서 나오는 메시지입니다.

panelType - UI 표시의 유형을 나타냅니다.


<div class="content-ad"></div>

alertCompletionHandler — 특정 Javascript 경고 콜백 함수

webPanel 함수는 panelType을 JSPanelType.alert로 설정합니다. 또한 showPanel을 true로 설정하여 해당 UI 프레젠테이션을 트리거해야 합니다.

JSPanelType은 열거 유형입니다. 현재는 alert 값만 포함하고 있습니다. 또한 선택한 값에 대한 제목 설명을 반환하는 description이라는 계산된 속성이 있습니다.

다음은 업데이트된 ContentView입니다:

<div class="content-ad"></div>

```swift
struct ContentView: View {
    @ObservedObject var vm = LocalWebViewVM(webResource: "index.html")

    var body: some View {
        VStack {
            SwiftUIWebView(viewModel: vm)
                .onAppear(perform: vm.loadWebPage)
                .alert(vm.panelTitle,
                       isPresented: $vm.showPanel,
                       actions: {
                           switch vm.panelType {
                           case .alert:
                               Button("Close") {
                                   vm.alertCompletionHandler()
                               }
                           default:
                               Button("Close") {}
                           }
                       }, message: {
                           Text(vm.panelMessage)
                       })
        }
        .padding()
    }
}
```

SwiftUIWebView에는 alert modifier가 포함되어 있습니다. 해당 alert에는 Close 버튼이 있습니다. 이 버튼은 alertCompletionHandler 함수를 호출할 것입니다.

다음은 웹 페이지입니다:

```html
<!DOCTYPE html>
<html lang="en">

<head>
  ...
</head>

<body>
  <button onclick="alert('This is an alert!')">Alert</button>
</body>

</html>
```

<div class="content-ad"></div>


![Image](https://miro.medium.com/v2/resize:fit:508/1*crNpOlR8VlOFpZSVQXkF-Q.gif)

이것은 표준 프레젠테이션입니다. 그러나 필요에 따라 시트, 팝오버 또는 응용 프로그램에 적합한 UI로 구현할 수 있습니다.

## Javascript Confirm

Javascript confirm 기능은 javascript alert와 유사합니다. 표준 프레젠테이션에서 모달에는 메시지, 확인 버튼 및 취소 버튼이 포함됩니다.


<div class="content-ad"></div>

```js
confirm("Are you sure?")
```

자바스크립트 confirm 함수는 OK 버튼을 클릭할 때 TRUE를 반환합니다. 그렇지 않으면 FALSE를 반환합니다.

Swift에서 자바스크립트 confirm을 처리하려면 애플리케이션은 다른 WKUIDelegate webView 함수를 추가해야 합니다.

```js
extension SwiftUIWebView {
    class Coordinator: NSObject, WKUIDelegate {
        ...

        // webView 함수가 자바스크립트 confirm을 처리합니다.
        func webView(_ webView: WKWebView,
                     runJavaScriptConfirmPanelWithMessage message: String,
                     initiatedByFrame frame: WKFrameInfo,
                     completionHandler: @escaping (Bool) -> Void) {
            viewModel.webPanel(message: message,
                               confirmCompletionHandler: completionHandler)
        }
    }
}

enum JSPanelType {
    case alert
    case confirm
    
    var description: String {
        switch self {
        case .alert:
            return "알림"
        case .confirm:
            return "확인"
        }
    }
}

class BaseWebViewVM: ObservableObject {
    ...

    // 확인 속성
    var confirmCompletionHandler: (Bool) -> Void = { _ in }

    // 해당 확인 UI에 대한 속성 설정
    func webPanel(message: String,
                  confirmCompletionHandler completionHandler: @escaping (Bool) -> Void) {
        self.panelTitle = JSPanelType.confirm.description
        self.panelMessage = message
        self.confirmCompletionHandler = completionHandler
        self.panelType = .confirm
        self.showPanel = true
    }
}
```

<div class="content-ad"></div>

JavaScript의 confirm을 위한 webView 함수는 약간 다른 콜백 함수 서명을 가지고 있어요.

```js
completionHandler: @escaping (Bool) -> Void
```

boolean 값을 인자로 받아요.

JSPanelType에 confirm 값을 추가해주세요.

<div class="content-ad"></div>

BaseWebViewVM에 confirmCompletionHandler 속성을 추가하십시오. Javascript confirm을 위한 다른 webPanel 함수를 추가하십시오. panelType 속성을 JSPanelType.confirm으로 설정하십시오. 다시 한번 showPanel을 true로 설정하여 UI 표시를 트리거합니다.

다음은 업데이트된 ContentView입니다:

```swift
struct ContentView: View {
    @ObservedObject var vm = LocalWebViewVM(webResource: "index.html")

    var body: some View {
        VStack {
            SwiftUIWebView(viewModel: vm)
                .onAppear(perform: vm.loadWebPage)
                .alert(vm.panelTitle,
                       isPresented: $vm.showPanel,
                       actions: {
                    switch vm.panelType {
                    case .alert:
                        Button("Close") {
                            vm.alertCompletionHandler()
                        }
                    case .confirm:
                        Button("Ok") {
                            vm.confirmCompletionHandler(true)
                        }
                        Button("Cancel") {
                            vm.confirmCompletionHandler(false)
                        }
                    default:
                        Button("Close") {}
                    }
                }, message: {
                    Text(vm.panelMessage)
                })
        }
        .padding()
    }
}
```

다음은 업데이트된 웹 페이지입니다:

<div class="content-ad"></div>

```js
<!DOCTYPE html>
<html lang="en">

<head>
  ...
  <script>
    ...
    function callConfirm() {
      if (confirm("This is a confirm dialog")) {
        document.getElementById("confirmValue").innerText = "You hit ok";
      } else {
        document.getElementById("confirmValue").innerText = "You hit cancel";
      }
    }    
  </script>
</head>

<body>
  ...
  <div>
    <button onclick="callConfirm()">Confirm</button>
    <div>Confirmed? <span id="confirmValue"></span></div>
  </div>
</body>

</html>
```

![Image](https://miro.medium.com/v2/resize:fit:504/1*DJyWQIktvhBdSEaqEIYJlw.gif)

## Javascript Prompt

The last standard Javascript modal is prompt. The modal contains a text field for user input.

<div class="content-ad"></div>

```swift
var response = prompt("이것은 프롬프트입니다! 어떻게 지내세요?", "좋음");
```

prompt 함수의 두 번째 선택적 매개변수는 기본값입니다. 기본값은 webView 델리게이트 메서드를 통해 전달됩니다.

다시 한 번, 응용 프로그램은 다른 WKUIDelegate webView 함수를 추가해야 하며, JSPanelType을 업데이트하고 BaseWebViewVM 클래스에 새 속성 및 webPanel 함수를 추가해야 합니다.

```swift
extension SwiftUIWebView {
    class Coordinator: NSObject, WKUIDelegate {
        ...

        // webView 함수는 자바스크립트 프롬프트를 처리합니다
        func webView(_ webView: WKWebView,
                     runJavaScriptTextInputPanelWithPrompt prompt: String,
                     defaultText: String?,
                     initiatedByFrame frame: WKFrameInfo,
                     completionHandler: @escaping (String?) -> Void) {
            viewModel.webPanel(message: prompt,
                               promptCompletionHandler: completionHandler,
                               defaultText: defaultText)
        }
    }
}

enum JSPanelType {
    case alert
    case confirm
    case prompt
    
    var description: String {
        switch self {
        case .alert:
            return "알림"
        case .confirm:
            return "확인"
        case .prompt:
            return "프롬프트"
        }
    }
}

class BaseWebViewVM: ObservableObject {
    ...

    // 프롬프트 속성
    var promptInput: String = ""
    var promptCompletionHandler: (String?) -> Void = { _ in }

    // 해당 프롬프트 UI에 대한 속성 설정
    func webPanel(message: String,
                  promptCompletionHandler completionHandler: @escaping (String?) -> Void,
                  defaultText: String? = nil) {
        self.panelTitle = JSPanelType.prompt.description
        self.panelMessage = message
        self.promptInput = defaultText ?? ""
        self.promptCompletionHandler = completionHandler
        self.panelType = .prompt
        self.showPanel = true
}
```

<div class="content-ad"></div>

테이블 태그를 마크다운 형식으로 변경해주세요.

<div class="content-ad"></div>

콜백 함수는 promptInput 속성 값을 전달합니다. promptInput은 null이 아닌 문자열 속성임을 유의하세요. 따라서 콜백은 빈 문자열이거나 사용자 입력일 수 있습니다.

다음은 업데이트된 웹 페이지입니다:

```js
<!DOCTYPE html>
<html lang="en">

<head>
  ...
  <script>
    ...
    function callPrompt() {
      var response = prompt("프롬프트입니다! 어떻게 지내세요?", "좋아요");
      if (response) {
        document.getElementById("promptResult").innerText =
          "당신의 응답은: " + response;
      } else {
        document.getElementById("promptResult").innerText = "취소됨";
      }
    }  
    </script>
</head>

<body>
  ...
  <div>
    <button onclick="callPrompt()">프롬프트</button>
    <div><span id="promptResult"></span></div>
  </div>
</body>

</html>
```

![이미지](https://miro.medium.com/v2/resize:fit:508/1*rlolSsaDf_BRguFOB8td5Q.gif)

<div class="content-ad"></div>

HTML5에서는 다이얼로그 요소가 있습니다. 이 요소는 HTML에서 모달 및 비모달 대화 상자를 만드는 데 사용됩니다.

다이얼로그 요소를 사용하면 사용자 정의 경고, 확인 대화 상자 및 프롬프트 모달 대화 상자를 만들 수 있습니다. 이 접근 방식을 사용하면 모달을 다른 웹 애플리케이션과 일치하도록 스타일링할 수 있습니다.

다이얼로그 요소를 사용하면 Swift 코드를 작성하는 대신 모든 사용자 상호 작용을 처리하기 위해 Javascript 코드를 작성해야 합니다. 하지만 이것은 원격 대화 상자를 생성하는 방법을 호스트(기본)에게 전달할 수 없다는 것을 의미하지는 않습니다. 다음 섹션에서는 웹 페이지와 호스트(기본) 응용 프로그램 간의 메시지나 이벤트를 전송하는 방법에 대해 알아볼 것입니다.

# 웹 페이지와 기본 응용프로그램 간 통신

<div class="content-ad"></div>

웹킷 프레임워크는 Objective-C 및 Swift를 위해 설계되었습니다. WebKit JS라고도 하는 자바스크립트 부분도 있습니다. 이는 Safari DOM 확장 기능입니다. (그것이 원래 이름일 수도 있습니다!) 기본적으로 이는 Safari 환경에 터치 제스처 이벤트, 스타일링 및 시각적 효과를 추가합니다. 실제로 그 기능 중 일부는 이미 W3C 표준의 일부로 채택되었습니다.

웹 페이지에서 네이티브 애플리케이션으로 메시지/데이터를 보내려면 수신 측에 "리스너" 또는 WebKit 용어로는 메시지 핸들러가 필요하고, 보내는 쪽에는 메시지 전송 함수가 있어야 합니다.

이 섹션에서는 웹 뷰에서 네이티브 애플리케이션으로 메시지를 보내거나 받고 응답하는 방법을 설명합니다.

우선 웹 콘텐츠부터 시작해보죠.

<div class="content-ad"></div>

```javascript
<!-- index2.html -->

<!DOCTYPE html>
<html lang="en">

<head>
  ...
  <title>Index 2</title>
  <script>
    async function sendWebKitMessage(handler, message) {
      if (
        message != "" &&
        handler != "" &&
        window.webkit &&
        window.webkit.messageHandlers &&
        window.webkit.messageHandlers.hasOwnProperty(handler)
      ) {
        console.log("Going to send a message to", handler)
        var reply = await window.webkit.messageHandlers[handler].postMessage(message);
        return reply
      } else {
        throw Error("뭔가 빠지는 게 있어요!");
      }
    }

    async function sendReceiveReply(handler, message, elementId) {
      try {
        var reply = await sendWebKitMessage(handler, message);

        var sanitizedReply = reply.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        document.getElementById(elementId).innerHTML = sanitizedReply;
      } catch (error) {
        document.getElementById(elementId).innerHTML = "에러: " + error.message;
      }
    }
  </script>
</head>

<body>
  <div>
    <button onclick="sendWebKitMessage('fromWebPage', '웹 뷰에서 온 메시지')">메시지 보내기</button>
  </div>
  <div style="margin-top: 15px">
    <button onclick="sendReceiveReply('getData', '보내줘야 할 데이터 있어?', 'reply')">데이터 가져오기</button>
    <div id="reply"></div>
  </div>
</body>

</html>
```

<div class="content-ad"></div>

"Send Message" 버튼으로부터 발생한 처리되지 않은 예외의 스크린샷과 "Get Data" 버튼에서 처리된 예외의 스크린샷입니다.

![예외 스크린샷](/assets/img/2024-05-20-MessagingBetweenWKWebViewandNativeApplicationinSwiftUI_5.png)

핸들러는 window.webkit.messageHandlers 네임스페이스에 있는 객체입니다. 모든 메시지 핸들러에는 postMessage라는 메소드가 있습니다. 이 메소드는 네이티브 애플리케이션으로 메시지/데이터를 보내는 데 사용됩니다.

sendWebKitMessage 함수에는 console.log가 있습니다. 이 함수는 웹 인스펙터 콘솔 영역에 메시지를 표시할 것입니다.

<div class="content-ad"></div>

네이티브 애플리케이션 UI와 웹 뷰를 Safari 웹 브라우저에서 검사할 수 있도록 몇 가지 변경을 가해봅시다.

```js
class BaseWebViewVM: ObservableObject {
    ...

    // 웹 뷰로부터의 메시지
    @Published var messageFromWV: String = ""

    init(webResource: String? = nil) {
        ...
        
#if DEBUG
        // 검사 가능한 웹 뷰
        self.webView.isInspectable = true
#endif
    }

    ...
}

struct ContentView: View {
    // 이 VM은 메시지를 보내는 로컬 웹 페이지를 표시합니다.
    @ObservedObject var vm = LocalWebViewVM(webResource: "index2.html")

    var body: some View {
        VStack {
            SwiftUIWebView(viewModel: vm)
                ...
            Text("웹 뷰에서 온 메시지:\n\(vm.messageFromWV)")
        }
    }
}
```

BaseWebViewVM에서 messageFromWV라는 publish된 속성이 추가되었습니다. 이 속성은 웹 뷰에서 수신된 메시지를 저장할 것입니다. Text 요소가 이 변수에 바인딩됩니다.

```js
@Published var messageFromWV: String = ""

Text("웹 뷰에서 온 메시지:\n\(vm.messageFromWV)")
```

<div class="content-ad"></div>

BaseWebViewVM 이니셜라이저에는 다음과 같은 코드 줄이 포함되어 있습니다.

```js
#if DEBUG
    self.webView.isInspectable = true
#endif
```

이를 통해 Safari가 웹 뷰 안에 있는 웹 페이지를 검사할 수 있습니다. 샘플 웹 페이지의 제목이 "Index 2"인 것에 유의하십시오. iOS 시뮬레이터에서 애플리케이션을 실행할 때 Develop > Simulator 하위 메뉴 아래에서 웹 페이지 제목을 볼 수 있어야 합니다.

<img src="/assets/img/2024-05-20-MessagingBetweenWKWebViewandNativeApplicationinSwiftUI_6.png" />

<div class="content-ad"></div>

HTML 버튼이 네이티브 애플리케이션과 상호 작용하도록 만들어 봅시다.

먼저 "fromWebPage"와 "getData"에 대한 메시지 핸들러를 정의해야 합니다.

```js
struct SwiftUIWebView: UIViewRepresentable {
    ...

    func makeUIView(context: Context) -> WKWebView {
        let userContentController = vm.webView
            .configuration
            .userContentController
        
        // 모든 메시지 핸들러를 제거합니다 (기존에 있으면)
        userContentController.removeAllScriptMessageHandlers()

        // 응답 없이 메시지 핸들러 추가
        userContentController.add(context.coordinator,
                                  name: "fromWebPage")

        // 응답과 함께 메시지 핸들러 추가
        userContentController.addScriptMessageHandler(context.coordinator,
                                                      contentWorld: WKContentWorld.page,
                                                      name: "getData")
        ...
    }
}
```

사용자 콘텐츠 컨트롤러(WKUserContentController)는 "앱의 네이티브 코드와 웹페이지의 스크립트 및 기타 콘텐츠 간의 상호 작용을 조정"합니다. 이것은 웹 뷰 구성(WKWebViewConfiguration) 구성 요소입니다.

<div class="content-ad"></div>

메시지 송수신 핸들러를 위해 애플리케이션은 사용자 콘텐츠 컨트롤러의 add 메서드를 사용해야 합니다.

메시지 송수신-응답 핸들러를 위해 애플리케이션은 사용자 콘텐츠 컨트롤러의 addScriptMessageHandler 메서드를 사용해야 합니다.

두 메서드 모두 사용자 콘텐츠 컨트롤러 메서드를 구현한 객체와 메시지 핸들러의 이름을 전달해야 합니다. 메시지 송수신의 경우, 객체는 WKScriptMessageHandler 프로토콜을 구현해야 합니다. 메시지 송수신-응답의 경우, 객체는 WKScriptMessageHandlerWithReply를 구현해야 합니다.

addScriptMessageHandler는 또한 메시지 핸들러를 설치할 위치를 알아야 합니다. 이 샘플 코드에서, 애플리케이션은 WKContentWorld.page를 contentWorld 인자에 전달합니다.

<div class="content-ad"></div>

자연스럽게, 코디네이터가 메시지 통신을 처리할 것입니다. 여기 구현입니다.

```js
extension SwiftUIWebView {
    class Coordinator: ..., WKScriptMessageHandler, WKScriptMessageHandlerWithReply {
        ...

        // MARK: - WKScriptMessageHandler delegate function

        // 메시지 송수신을 위한
        func userContentController(_ userContentController: WKUserContentController, 
                                   didReceive message: WKScriptMessage) {
            self.viewModel.messageFrom(fromHandler: message.name,
                                       message: message.body)
        }

        // MARK: - WKScriptMessageHandlerWithReply delegate function

        // 메시지 송수신 및 응답을 위한
        func userContentController(_ userContentController: WKUserContentController,
                                   didReceive message: WKScriptMessage,
                                   replyHandler: @escaping (Any?, String?) -> Void) {
            do {
                let returnValue = try self.viewModel.messageFromWithReply(fromHandler: message.name,
                                                                          message: message.body)
                
                replyHandler(returnValue, nil)
            } catch WebViewErrors.GenericError {
                replyHandler(nil, "일반 오류")
            } catch WebViewErrors.ErrorWithValue(let value) {
                replyHandler(nil, "값 오류: \(value)")
            } catch {
                replyHandler(nil, error.localizedDescription)
            }
        }
    }
}
```

userContentController 두 가지 구현은 사용자 컨텐츠 컨트롤러 및 수신 메시지에 대한 참조를 받습니다.

메시지인 WKScriptMessage는 두 가지 중요한 매개변수, 메시지 핸들러의 이름(name)과 메시지 내용(body)을 포함합니다. 이 샘플 코드에서, 두 구현은 모두 이름과 내용을 사용하여 뷰 모델 메서드를 호출합니다.

<div class="content-ad"></div>

보내기-수신-응답 버전을 위해 추가적인 replyHandler 클로저 인자가 있습니다. 클로저는 반환값과 오류 메시지 2개의 인자를 갖습니다. 클로저를 호출할 때 애플리케이션이 "something"을 한 인자로 전달하고 다른 하나는 nil입니다.

마지막으로, 애플리케이션은 수신 메시지의 의도를 실행하기 위한 메서드를 구현해야 합니다.

```swift
class BaseWebViewVM: ObservableObject {
    ...

    // MARK: - 메시징을 위한 함수
    func messageFrom(fromHandler: String, message: Any) {
        self.panelTitle = JSPanelType.alert.description // "Alert"
        self.panelMessage = String(describing: message)
        self.alertCompletionHandler = {}
        self.panelType = .alert
        self.showPanel = true
        self.messageFromWV = String(describing: message)
    }

    func messageFromWithReply(fromHandler: String, message: Any) throws -> String {
        self.messageFromWV = String(describing: message)

        var returnValue: String = "Good"

        /*
         * 이 함수는 다음과 같은 예외를 던질 수 있습니다:
         *
         * - WebViewErrors.GenericError
         * - WebViewErrors.ErrorWithValue(value: 99)
         */
        
        if fromHandler == "getData" {
            returnValue = "{ data: \"It is good!\" }"
        }
        
        return returnValue
    }
}
```

messageFrom 메서드는 send-receive 메시징을 처리합니다. 예외를 던지지는 않는다는 점에 유의하십시오. 던진다 해도 userContentController 메서드는 해당 오류를 웹 뷰로 다시 전달할 수 없을 것입니다. 오류를 웹 뷰로 다시 전달해야 하는 경우 send-receive-reply 메시징 전략을 사용해야 합니다 - messageFromWithReply 메서드를 사용하세요!

<div class="content-ad"></div>

messageFromWithReply 메서드는 예외를 throw하고 문자열 값을 반환합니다. 샘플 코드에서는 JSON 문자열을 웹 뷰로 다시 반환합니다. 자바스크립트 세계에서는 JSON 문자열을 쉽게 자바스크립트 객체로 파싱할 수 있습니다.

현재 샘플 코드는 예외를 throw하지 않습니다. 그러나 이 샘플 프로젝트에서 정의된 오류는 다음과 같습니다.

```js
enum WebViewErrors: Error {
    case ErrorWithValue(value: Int)
    case GenericError
}
```

첫 번째 오류는 정수값을 받습니다. 하나 이상의 인수를 받을 수 있습니다.

<div class="content-ad"></div>

앱의 enum을 앱에 맞게 사용자 정의하세요!

마침내, 이것이 보이는 모습입니다:

![Image](https://miro.medium.com/v2/resize:fit:1400/1*-PYrd32kdzvXGs27tgr8yQ.gif)

네이티브 애플리케이션에서 웹 뷰로 메시지를 보내는 방법은 어떤가요?

<div class="content-ad"></div>

네이티브 애플리케이션에서 메시지를 수신하려면 웹 페이지가 "메시지" 이벤트를 "청취"해야 합니다.

다음은 샘플 웹 페이지입니다:

```js
<!DOCTYPE html>
<html lang="en">

<head>
  ...
</head>

<body>
  <div>
    <label for="">호스트로부터의 메시지:</label>
    <br>
    <div id="message"></div>
  </div>
</body>
<script>
  window.addEventListener("message", (event) => {
    // 수신 메시지 소독(Process of cleaning untrusted input)
    var content = event.data.replace(/</g, "&lt;").replace(/>/g, "&gt;")
    document.getElementById("message").innerHTML = content
  })
</script>

</html>
```

웹 페이지는 "메시지" 이벤트리스너를 추가합니다. event.data에는 메시지 콘텐츠가 포함됩니다.

<div class="content-ad"></div>

웹 페이지가 "메시지"를 수신하면 해당 내용을 웹 페이지에 단순히 표시합니다.

웹 뷰에 메시지를 보낼 수 있는 UI를 만들어봅시다.

```js
struct MessageToWebView: View {
    @ObservedObject var vm = LocalWebViewVM(webResource: "index3.html")
    @State var message: String = ""
    
    var body: some View {
        VStack(alignment: .leading) {
            Text("메시지:")
                .font(.system(size: 26))
            HStack(alignment: .center, spacing: 10) {
                TextField("메시지를 입력하세요", text: $message)
                    .textFieldStyle(.roundedBorder)
                    .border(.blue)
                    .font(.system(size: 26))
                Button("전송") {
                    vm.messageTo(message: message)
                }
                .buttonStyle(.borderedProminent)
            }
            WebView(vm: vm)
        }
        .padding()
    }
}
```

![MessagingBetweenWKWebViewandNativeApplicationinSwiftUI](/assets/img/2024-05-20-MessagingBetweenWKWebViewandNativeApplicationinSwiftUI_7.png)

<div class="content-ad"></div>

"보내기" 버튼은 뷰 모델에서 messageTo 메서드를 호출합니다.

```js
func messageTo(message: String) {
    let escapedMessage = message.replacingOccurrences(of: "\"", with: "\\\"")
    
    let js = "window.postMessage(\"\(escapedMessage)\", \"*\")"
    self.webView.evaluateJavaScript(js) { (result, error) in
        if let error = error {
            print("Error: \(error.localizedDescription)")
        }
    }
}
```

위의 다른 시나리오들과는 달리, 구현해야 할 프로토콜 메서드가 없습니다. 웹 뷰로 메시지를 보내기 위한 네이티브 메서드도 없습니다.

대신 네이티브 애플리케이션은 Javascript postMessage 호출을 생성해야 합니다.

<div class="content-ad"></div>

```js
window.postMessage(...)
```

postMessage 메서드는 텍스트 인수를 받습니다. 결과적으로, 웹 뷰의 evaluateJavaScript 메서드에서 실행하기 전에 콘텐츠를 올바르게 이스케이프하고 인코딩해야 합니다.

```js
func evaluateJavaScript(
    _ javaScriptString: String,
    completionHandler: ((Any?, Error?) -> Void)? = nil
)
```

evaluateJavaScript에는 completionHandler가 있습니다. 이는 반환 값을 또는 에러를 네이티브 응용 프로그램으로 돌려 보내는 방법입니다.

<div class="content-ad"></div>

evaluateJavaScript 메서드는 JavaScript 코드를 실행하거나 평가할 수 있습니다. 예시 코드에서 window.postMessage 호출은 값을 반환하거나 오류를 반환하지 않습니다. 다른 경우에는 실행되는 코드가 값이 반환되고 예외가 발생할 수 있습니다.

마지막으로, 실제 동작을 확인할 수 있습니다:

![image](https://miro.medium.com/v2/resize:fit:1400/1*AZXEKStS4IuR49Ho-HwihA.gif)

위 웹 페이지에는 이벤트 리스너 선언을 포함한 스크립트 요소가 포함되어 있습니다.

<div class="content-ad"></div>

애플리케이션이 모든 웹 페이지에 동일한 Javascript 코드를 주입해야 할 때, 모든 웹 페이지에 수동으로 스크립트 요소를 추가하는 대신, 사용자 콘텐츠 컨트롤러의 addUserScript 메서드를 활용할 수 있습니다.

다음은 간단한 구현입니다:

```js
struct SwiftUIWebView: UIViewRepresentable {
    ...

   func makeUIView(context: Context) -> WKWebView {
      ...

      injectJS(userContentController)

      ...
    }

    func injectJS(_ userContentController: WKUserContentController) {
        // 메시지 이벤트 리스너 정의
        //
        // <script> HTML 요소를 포함할 필요가 없다는 점에 유의하십시오.
        let msgEventListener = """
window.addEventListener("message", (event) => {
    // 수신된 메시지 정제
    var content = event.data.replace(/</g, "&lt;").replace(/>/g, "&gt;")
    document.getElementById("message").innerHTML = content
})
"""

        // 이벤트 리스너 주입
        userContentController.addUserScript(WKUserScript(source: msgEventListener,
                                                         injectionTime: .atDocumentEnd,
                                                         forMainFrameOnly: true))
    }
}
```

injectJS 함수는 동일한 이벤트 리스너 코드를 가진 변수(msgEventListener)를 포함하고 있습니다.

<div class="content-ad"></div>

`addUserScript` 함수에는 `WKUserScript`의 인스턴스가 필요합니다.

`injectionTime`은 `.atDocumentEnd`로 설정되어 있습니다. 이는 원본 스크립트 요소 선언과 동일합니다. 다른 값으로는 `.atDocumentStart`가 있습니다.

만약 자바스크립트 코드가 콘텐츠 요소에 의존한다면, 코드를 `.atDocumentEnd`에 주입하는 것이 가장 좋을 수 있습니다.

만약 자바스크립트 코드가 라이브러리이면, 코드를 `.atDocumentStart`에 주입하는 것이 가장 좋을 수 있습니다.

<div class="content-ad"></div>

forMainFrameOnly 인수는 부울 값입니다. true를 전달하면 자바스크립트 코드가 주 페이지에만 삽입됩니다. 애플리케이션은 모든 iframe 요소에 동일한 자바스크립트 코드를 삽입하지 않습니다. 그렇지 않으면 자바스크립트 코드는 주 페이지와 해당 iframe 요소에 삽입됩니다.

![이미지](/assets/img/2024-05-20-MessagingBetweenWKWebViewandNativeApplicationinSwiftUI_8.png)

![이미지](/assets/img/2024-05-20-MessagingBetweenWKWebViewandNativeApplicationinSwiftUI_9.png)

웹 인스펙터에서 삽입된 자바스크립트 코드는 "추가 스크립트 `user-script:1`" 아래에 표시됩니다.

<div class="content-ad"></div>

사용자가 하이퍼링크를 통해 다른 웹 페이지로 이동하면, 애플리케이션이 해당 웹 페이지에 동일한 자바스크립트 블록을 삽입합니다.

이 웹 페이지에 iframe을 추가하고 forMainFrameOnly를 false로 설정해봅시다.

![image](/assets/img/2024-05-20-MessagingBetweenWKWebViewandNativeApplicationinSwiftUI_10.png)

웹 인스펙터에서 "user-script:1"이 두 번 표시됩니다. 각 웹 페이지는 자바스크립트 코드 블록을 수신합니다.

<div class="content-ad"></div>

# 사용 시나리오

## 앱 내 사용자 가이드

iOS 또는 macOS 애플리케이션에서 사용자 가이드나 맥락에 맞는 도움말 정보를 제공해야 하는 경우, 어떻게 할까요?

UIKit의 UILabel 및 SwiftUI의 Text 요소는 기본적인 마크다운 형식을 지원합니다. 서식이 있는 텍스트와 이미지로 유용한 도움말 페이지를 만드는 것은 다소 귀찮은 작업이 될 수 있습니다.

<div class="content-ad"></div>

도움 페이지는 HTML과 CSS를 사용하여 웹 페이지로 작성할 수도 있습니다. 도움 페이지는 앱 내에 포함되어 WKWebView를 사용하여 표시될 수 있습니다.

## 사용자 인터페이스

SwiftUI 또는 UIKit을 사용하여 전체 네이티브 애플리케이션을 만드는 대신 대부분의 사용자 인터페이스를 HTML과 CSS를 사용하여 구현할 수 있습니다. 대부분의 비즈니스 로직은 Javascript를 사용하여 구현할 수 있습니다.

ReactJS, Angular, VueJS 등의 Javascript 프레임워크를 사용하면 프론트엔드 로직을 구성하는 데 도움이 됩니다.

<div class="content-ad"></div>

자바스크립트 UI 라이브러리인 Bootstrap, Foundation, Semantic UI, Tailwind Elements 등은 많은 매력적인 UI 구성 요소들을 제공해요. 이 라이브러리들은 네이티브 애플리케이션의 느낌과 모양에 맞게 사용자정의할 수 있어요.

물론, 이러한 라이브러리와 프레임워크를 사용하면 애플리케이션의 크기가 커질 수 있어요. 현명하게 사용해야 해요!

# 샘플 XCode 프로젝트

해당 XCode 프로젝트에 대한 GitHub 링크는 여기에서 확인할 수 있어요.

<div class="content-ad"></div>

# 참고 자료

- WKWebView
- UIViewRepresentable
- Coordinator
- WKUIDelegate
- WKUserContentController
- WKWebViewConfiguration
- WKContentWorld
- WKScriptMessageHandler
- WKScriptMessageHandlerWithReply
- WKScriptMessage
- DOM 메시지 이벤트 및 window.postMessage 메서드
- WKUserScript

이 기사는 여기서 끝입니다. 아마도 여러분이 프로젝트에서 WKWebView를 어떻게 활용할 수 있는지에 대한 아이디어를 얻을 수 있기를 바랍니다.

이 기사를 즐겁게 읽어 주셨으면 좋겠습니다. 감사합니다!