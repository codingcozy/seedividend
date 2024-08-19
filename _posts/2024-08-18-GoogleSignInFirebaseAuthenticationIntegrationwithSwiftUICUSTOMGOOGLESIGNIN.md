---
title: "구글 로그인 SwiftUI로 쉽게 연동하기 및 UI 커스텀 방법"
description: ""
coverImage: "/assets/img/2024-08-18-GoogleSignInFirebaseAuthenticationIntegrationwithSwiftUICUSTOMGOOGLESIGNIN_0.png"
date: 2024-08-18 11:49
ogImage: 
  url: /assets/img/2024-08-18-GoogleSignInFirebaseAuthenticationIntegrationwithSwiftUICUSTOMGOOGLESIGNIN_0.png
tag: Tech
originalTitle: "Google Sign In  Firebase Authentication Integration with SwiftUI CUSTOM GOOGLE SIGN IN"
link: "https://medium.com/codex/google-sign-in-firebase-authentication-integration-with-swiftui-custom-google-sign-in-acb87f5c4711"
isUpdated: true
updatedAt: 1724032757806
---


Firebase Authentication은 실시간으로 데이터를 저장하고 동기화할 수 있는 강력한 도구입니다. SwiftUI는 아름답고 인터랙티브한 사용자 인터페이스를 쉽게 만들 수 있는 현대적인 UI 프레임워크입니다. 이 글에서는 이 두 기술을 결합하여 Google로 로그인하는 방법을 보여드릴 것입니다. Apple로 로그인하려면 여기를 클릭하세요. Firebase Realtime Database에 대해 자세히 알고 싶다면 여기를 클릭하세요. Firebase로 웹사이트를 만드는 방법을 배우고 싶다면 여기를 클릭하세요.

우선 간단한 SwiftUI 프로젝트를 만들고 Firebase SDK를 추가할 것입니다. 그런 다음 사용자 정의 텍스트를 나타내는 모델을 만들 것입니다. 마지막으로 Google으로 로그인하는 사용자 정의 로그인을 표시하는 보기를 만들 것입니다.

이 글을 마치면 Firebase Authentication과 SwiftUI를 사용하여 Google로 로그인을 표시하는 방법을 알게 될 것입니다. 이 지식은 어떤 앱에 대한 인증 뷰를 만드는 데 유용하며 뷰를 간소화합니다.

우선 Firebase가 무엇인지 알아볼까요?

<div class="content-ad"></div>

Firebase는 모바일 앱 개발을 위한 호스팅된 백엔드 서비스를 제공하는 Backend-as-a-Service (BaaS) 플랫폼입니다. Firebase는 실시간 데이터베이스, 클라우드 스토리지, 인증, 충돌 보고, 머신 러닝, 원격 구성, 정적 파일을 위한 호스팅과 같은 다양한 기능을 제공합니다. Firebase를 사용하면 기반이 되는 인프라에 대해 걱정할 필요 없이 앱을 쉽고 확장 가능하게 구축할 수 있습니다. Firebase에 대해 더 자세히 알아보세요.

# Firebase 계정 설정하기

Firebase 계정 설정은 간단한 과정입니다. Firebase 웹사이트에 가서 로그인 버튼을 클릭하면 됩니다. 이메일 주소로 로그인하거나 가입 버튼을 클릭하여 새 계정을 만들고 적절한 등록 단계를 따르면 됩니다.

그 후 Go To Console을 클릭하여 아래 페이지로 이동할 수 있습니다.

<div class="content-ad"></div>


![이미지](/assets/img/2024-08-18-GoogleSignInFirebaseAuthenticationIntegrationwithSwiftUICUSTOMGOOGLESIGNIN_0.png)

프로젝트 페이지 생성

새 앱을 만들려면 "프로젝트 만들기" 버튼을 클릭하세요.

# 프로젝트 만들기(3단계)


<div class="content-ad"></div>

프로젝트에 이름을 지어주고 Firebase 약관에 동의하는 것부터 시작해요.

![project screenshot](/assets/img/2024-08-18-GoogleSignInFirebaseAuthenticationIntegrationwithSwiftUICUSTOMGOOGLESIGNIN_1.png)

프로젝트에 이름을 지어주세요.

두 번째 단계는 앱에 Google Analytics를 연결할지 여부를 선택하는 것이에요.

<div class="content-ad"></div>


![Step 2: Google Analytics](/assets/img/2024-08-18-GoogleSignInFirebaseAuthenticationIntegrationwithSwiftUICUSTOMGOOGLESIGNIN_2.png)

The third step is to configure your google analytics.

![GoogleSignInFirebaseAuthenticationIntegrationwithSwiftUICUSTOMGOOGLESIGNIN_3](/assets/img/2024-08-18-GoogleSignInFirebaseAuthenticationIntegrationwithSwiftUICUSTOMGOOGLESIGNIN_3.png)


<div class="content-ad"></div>

구글 애널리틱스 설정하기

파이어베이스가 프로젝트를 생성하는 동안 잠시 기다려주세요.

![이미지](/assets/img/2024-08-18-GoogleSignInFirebaseAuthenticationIntegrationwithSwiftUICUSTOMGOOGLESIGNIN_4.png)

계속 버튼을 눌러주세요

<div class="content-ad"></div>

프로젝트 개요 페이지입니다. Firebase를 성공적으로 설정하신 것을 축하드립니다! 본 문서에서는 Firebase의 가장 강력한 기능 중 하나인 실시간 데이터베이스에 초점을 맞추겠습니다.

![이미지](/assets/img/2024-08-18-GoogleSignInFirebaseAuthenticationIntegrationwithSwiftUICUSTOMGOOGLESIGNIN_5.png)

프로젝트 개요

# iOS 앱에 Firebase 추가하기

<div class="content-ad"></div>

iOS 앱에 Firebase를 추가하려면 iOS 버튼을 누르면 해당 페이지로 이동될 것입니다. 모든 과정을 따라 진행하고 콘솔 계속 클릭하십시오.

이미지 파일:
![Firebase iOS](/assets/img/2024-08-18-GoogleSignInFirebaseAuthenticationIntegrationwithSwiftUICUSTOMGOOGLESIGNIN_6.png)

Apple 앱에 Firebase 추가

다섯 단계를 완료한 후에 데이터베이스 작업을 시작할 수 있습니다.

<div class="content-ad"></div>

All products 페이지로 이동한 후, Realtime Database 옵션을 클릭해주세요.

![Realtime Database](/assets/img/2024-08-18-GoogleSignInFirebaseAuthenticationIntegrationwithSwiftUICUSTOMGOOGLESIGNIN_7.png)

인증을 클릭하면 이 페이지로 이동합니다. 그런 다음, 시작하기 버튼을 눌러주세요.

![Get Started](/assets/img/2024-08-18-GoogleSignInFirebaseAuthenticationIntegrationwithSwiftUICUSTOMGOOGLESIGNIN_8.png)

<div class="content-ad"></div>

Get Started 버튼을 클릭하면 여기로 이동합니다.

![이미지](/assets/img/2024-08-18-GoogleSignInFirebaseAuthenticationIntegrationwithSwiftUICUSTOMGOOGLESIGNIN_9.png)

이제 Google 버튼을 클릭하세요.

![이미지](/assets/img/2024-08-18-GoogleSignInFirebaseAuthenticationIntegrationwithSwiftUICUSTOMGOOGLESIGNIN_10.png)

<div class="content-ad"></div>

Enable 스위치를 눌러주세요. 그리고 이메일을 추가해주세요.

![이미지](/assets/img/2024-08-18-GoogleSignInFirebaseAuthenticationIntegrationwithSwiftUICUSTOMGOOGLESIGNIN_11.png)

마지막으로, Google을 옵션으로 활성화하려면 저장 버튼을 클릭해주세요.

![이미지](/assets/img/2024-08-18-GoogleSignInFirebaseAuthenticationIntegrationwithSwiftUICUSTOMGOOGLESIGNIN_12.png)

<div class="content-ad"></div>

먼저 Xcode에서 패키지를 추가할 때, 파일-패키지 추가로 이동하여 해당 링크를 입력하고 정확한 버전을 클릭하여 패키지를 추가할 수 있습니다: https://github.com/firebase/firebase-ios-sdk

Google 서비스 정보 plist를 추가하세요. Firebase 설정에서 다운로드하고 앱을 추가한 후, 클라이언트 ID를 가져와 여기 Info 및 URL 링크 아래에 넣어주세요.

![이미지](/assets/img/2024-08-18-GoogleSignInFirebaseAuthenticationIntegrationwithSwiftUICUSTOMGOOGLESIGNIN_13.png)

# 단계별 설명

<div class="content-ad"></div>

## 1. Firebase 앱 설정하기

첫 번째 단계는 앱에서 Firebase를 설정하는 것입니다. Firebase를 초기화하는 App 구조체에서 이 작업이 수행됩니다:

```js
import Firebase
import FirebaseAuth
import FirebaseCore
import Foundation
import GoogleSignIn
import SwiftUI

@main
struct Firebase_Test_CodeApp: App {
    init() {
        FirebaseApp.configure()
    }

    var body: some Scene {
        WindowGroup {
            ContentView().onOpenURL { url in
                GIDSignIn.sharedInstance.handle(url)
            }
        }
    }
}
```

- FirebaseApp.configure(): 앱이 시작될 때 Firebase를 초기화합니다.
- onOpenURL: 앱에서 열린 URL을 처리하며 Google Sign-In 프로세스를 관리하는 데 사용됩니다.

<div class="content-ad"></div>

## 2. 구글 인증

인증 구조체는 구글 로그인 프로세스를 처리하고 인증 상태를 관리합니다:

```js
struct Authentication {
    func googleOauth() async throws {
        guard let clientID = FirebaseApp.app()?.options.clientID else {
            fatalError("Firebase 클라이언트 ID를 찾을 수 없습니다")
        }
        let config = GIDConfiguration(clientID: clientID)
        GIDSignIn.sharedInstance.configuration = config
        let scene = await UIApplication.shared.connectedScenes.first as? UIWindowScene
        guard let rootViewController = await scene?.windows.first?.rootViewController else {
            fatalError("루트 뷰 컨트롤러가 없습니다!")
        }
        let result = try await GIDSignIn.sharedInstance.signIn(withPresenting: rootViewController)
        let user = result.user
        guard let idToken = user.idToken?.tokenString else {
            throw "예기치 않은 오류가 발생했습니다. 다시 시도해주세요"
        }
        let credential = GoogleAuthProvider.credential(withIDToken: idToken, accessToken: user.accessToken.tokenString)
        try await Auth.auth().signIn(with: credential)
    }
    func logout() async throws {
        GIDSignIn.sharedInstance.signOut()
        try Auth.auth().signOut()
    }
}
```

- googleOauth: 구글 OAuth 프로세스를 처리합니다.
- Firebase의 클라이언트 ID로 구글 로그인을 구성합니다.
- 로그인 화면을 표시할 루트 뷰 컨트롤러를 가져옵니다.
- 구글 사용자를 로그인하고 ID 토큰을 가져옵니다.
- ID 토큰을 사용하여 Firebase로 인증합니다.
- logout: 구글 및 Firebase에서 사용자를 로그아웃합니다.

<div class="content-ad"></div>

## 3. 오류 처리를 위한 문자열 확장

오류 처리를 간단하게하기 위해 String을 Error에 준수하도록 하는 확장입니다:

```js
extension String: Error {}
```

## 4. 메인 콘텐츠 뷰

<div class="content-ad"></div>

앱의 메인 뷰는 인증 상태를 관리하고 사용자가 로그인했는지에 따라 로그인 화면 또는 홈 화면을 표시합니다:

```js
struct ContentView: View {
    @State private var userLoggedIn = (Auth.auth().currentUser != nil)
    var body: some View {
        VStack {
            if userLoggedIn {
                Home()
            } else {
                Login()
            }
        }.onAppear {
            Auth.auth().addStateDidChangeListener { auth, user in
                userLoggedIn = (user != nil)
            }
        }
    }
}
```

- @State private var userLoggedIn: 사용자가 로그인했는지를 추적하는 상태 변수입니다.
- Auth.auth().addStateDidChangeListener: 인증 상태 변경 시 로그인 상태를 업데이트하는 리스너입니다.

## 5. 로그인 화면

<div class="content-ad"></div>

로그인 뷰는 Google 로그인 버튼을 표시하고 로그인 프로세스를 처리합니다:

```js
struct Login: View {
    @State var err: String = ""
    var body: some View {
        Text("Login")
        Button {
            Task {
                do {
                    try await Authentication().googleOauth()
                } catch let e {
                    err = e.localizedDescription
                }
            }
        } label: {
            HStack {
                Image(systemName: "person.badge.key.fill")
                Text("Sign in with Google")
            }.padding(8)
        }.buttonStyle(.borderedProminent)
        Text(err).foregroundColor(.red).font(.caption)
    }
}
```

- @State private var err: 에러 메시지를 저장하고 표시하는 상태 변수입니다.
- Button: Authentication 구조체를 사용하여 Google 로그인 프로세스를 시작합니다.

## 6. 홈 뷰

<div class="content-ad"></div>

로그인된 사용자를 위해 홈 뷰에는 환영 메시지와 로그아웃 버튼이 표시됩니다.

```swift
struct Home: View {
    @State private var err: String = ""
    var body: some View {
        HStack {
            Image(systemName: "hand.wave.fill")
            Text("Hello " + (Auth.auth().currentUser!.displayName ?? "사용자 이름을 찾을 수 없음"))
        }
        Button {
            Task {
                do {
                    try await Authentication().logout()
                } catch let e {
                    err = e.localizedDescription
                }
            }
        } label: {
            Text("로그아웃").padding(8)
        }.buttonStyle(.borderedProminent)
        Text(err).foregroundColor(.red).font(.caption)
    }
}
```

- 사용자의 표시 이름을 사용할 수 있으면 표시하고, 그렇지 않으면 기본 메시지를 표시합니다.
- 버튼: Authentication 구조체를 사용하여 사용자를 로그아웃합니다.

# 미리보기

<div class="content-ad"></div>

로그인 및 홈 뷰는 Xcode 캔버스에서 시각화할 수 있는 미리보기를 포함하고 있습니다:

이로써 SwiftUI 앱에서 Google 로그인 및 Firebase 인증을 통합했습니다. 이 단계를 따라가면 사용자 인증을 원활하게 관리하여 응용 프로그램에서 부드러운 사용자 경험을 제공할 수 있습니다.

전체 코드는 아래에 나와 있습니다.

```js
import Firebase
import FirebaseAuth
import FirebaseCore
import Foundation
import GoogleSignIn
import SwiftUI

@main
struct Firebase_Test_CodeApp: App {
  init() {
    FirebaseApp.configure()
  }

  var body: some Scene {
    WindowGroup {
      ContentView().onOpenURL { url in
        GIDSignIn.sharedInstance.handle(url)
      }
    }
  }
}

struct Authentication {
  func googleOauth() async throws {
    // google sign in
    guard let clientID = FirebaseApp.app()?.options.clientID else {
      fatalError("no firbase clientID found")
    }

    // Create Google Sign In configuration object.
    let config = GIDConfiguration(clientID: clientID)
    GIDSignIn.sharedInstance.configuration = config

    //get rootView
    let scene = await UIApplication.shared.connectedScenes.first as? UIWindowScene
    guard let rootViewController = await scene?.windows.first?.rootViewController
    else {
      fatalError("There is no root view controller!")
    }

    //google sign in authentication response
    let result = try await GIDSignIn.sharedInstance.signIn(
      withPresenting: rootViewController
    )
    let user = result.user
    guard let idToken = user.idToken?.tokenString else {
      throw "Unexpected error occurred, please retry"
    }

    //Firebase auth
    let credential = GoogleAuthProvider.credential(
      withIDToken: idToken, accessToken: user.accessToken.tokenString
    )
    try await Auth.auth().signIn(with: credential)
  }

  func logout() async throws {
    GIDSignIn.sharedInstance.signOut()
    try Auth.auth().signOut()
  }
}

extension String: Error {}

struct ContentView: View {
  @State private var userLoggedIn = (Auth.auth().currentUser != nil)

  var body: some View {
    VStack {
      if userLoggedIn {
        Home()
      } else {
        Login()
      }
    }.onAppear {
      Auth.auth().addStateDidChangeListener { auth, user in
        if user != nil {
          userLoggedIn = true
        } else {
          userLoggedIn = false
        }
      }
    }
  }
}

struct Login: View {
  @State private var err: String = ""

  var body: some View {
    Text("Login")
    Button {
      Task {
        do {
          try await Authentication().googleOauth()
        } catch let e {
          err = e.localizedDescription
        }
      }
    } label: {
      HStack {
        Image(systemName: "person.badge.key.fill")
        Text("Sign in with Google")
      }.padding(8)
    }.buttonStyle(.borderedProminent)

    Text(err).foregroundColor(.red).font(.caption)
  }
}

#프리뷰 {
  Login()
}

struct Home: View {
  @State private var err: String = ""

  var body: some View {
    HStack {
      Image(systemName: "hand.wave.fill")
      Text(
        "Hello " + (Auth.auth().currentUser!.displayName ?? "Username not found")
      )
    }
    Button {
      Task {
        do {
          try await Authentication().logout()
        } catch let e {
          err = e.localizedDescription
        }
      }
    } label: {
      Text("Log Out").padding(8)
    }.buttonStyle(.borderedProminent)

    Text(err).foregroundColor(.red).font(.caption)
  }
}

#프리뷰 {
  Home()
}
```

<div class="content-ad"></div>

여기까지 읽어주셨다면 박수를 치세요! 👏👏👏