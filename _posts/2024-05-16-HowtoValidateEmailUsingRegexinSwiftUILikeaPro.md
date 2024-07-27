---
title: "SwiftUI에서 이메일을 전문가처럼 Regex로 유효성 검사하는 방법"
description: ""
coverImage: "/assets/img/2024-05-16-HowtoValidateEmailUsingRegexinSwiftUILikeaPro_0.png"
date: 2024-05-16 16:45
ogImage: 
  url: /assets/img/2024-05-16-HowtoValidateEmailUsingRegexinSwiftUILikeaPro_0.png
tag: Tech
originalTitle: "How to Validate Email Using Regex in SwiftUI Like a Pro"
link: "https://medium.com/@naufaladli0406/how-to-validate-email-using-regex-in-swiftui-like-a-pro-3d29bbd00bde"
---


<div class="content-ad"></div>

이메일을 유효성 검사하려면 표준 형식과 일치하는 이메일을 확인하는 정규식(Regex) 패턴을 사용합니다. 유효한 이메일은 일반적으로 영숫자 조합으로 된 사용자 이름, "@gmail.com" 기호, 도메인 이름 및 도메인 확장자가 포함되어 있습니다.

유효한 이메일 주소 예시:

- example@domain.com
- user.name@sub.domain.co.uk
- user_name@domain.org

유효하지 않은 이메일 주소 예시:

<div class="content-ad"></div>

- example@domain (TLD이 누락됨)
- @domain.com (로컬 부분이 누락됨)
- user@.com (도메인 이름이 누락됨)

![이미지](/assets/img/2024-05-16-HowtoValidateEmailUsingRegexinSwiftUILikeaPro_1.png)

## 먼저 Regex 유효성 검사 추가하기

정규표현식(Regex는 Regular Expression의 약자)은 검색 패턴을 정의하는 문자 시퀀스입니다. 문자열을 일치시키는 간결하고 유연한 수단을 제공하므로 입력 유효성 검사와 같은 작업에 이상적입니다. SwiftUI의 맥락에서 Regex는 사용자 입력의 특정 패턴(예: 여권 번호 형식)을 강제하는 데 사용할 수 있습니다.

<div class="content-ad"></div>

```swift
import SwiftUI

struct ExampleValidate: View {
    // 이메일 입력, 표시 모드 및 유효성 검사 플래그를 관리하는 상태 변수
    @State private var email: String = ""
    @Environment(\.presentationMode) var presentationMode: Binding<PresentationMode>
    @State var isWrongEmail = false
    @State var isRightEmail = false
    @State var show = false
    @State var isValidate = false
    @State var animateCircle = false
    
    // 아이콘, 텍스트 및 색상을 사용자 정의할 수 있는 속성
    var icon: UIImage = UIImage(systemName: "checkmark.circle")!
    var iconError: UIImage = UIImage(systemName: "xmark.circle")!
    var text = "Berhasil"
    var gridentColor: Color = .green
    var circleAColor: Color = .green
    var gridentColorEr: Color = .red
    var circleAColorEr: Color = .red
    var details: String = "메시지를 입력하세요"
    var corner: CGFloat = 30
    
    var body: some View {
        // 여기에 뷰 내용을 입력하세요
    }
    
    // 정규식을 사용하여 이메일 유효성을 검사하는 함수
    func isEmail(valid: String) -> Bool {
        let pattern = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}"
        return NSPredicate(format: "SELF MATCHES %@", pattern).evaluate(with: valid)
    }
}
```

# SwiftUI에서 ValidationView 구현

다음 SwiftUI 뷰, ExampleValidate,은 실시간 피드백을 제공하는 이메일 유효성 검사 양식을 생성하는 방법을 보여줍니다.

```swift
import SwiftUI

struct ExampleValidate: View {
    // 이메일 입력, 표시 모드 및 유효성 검사 플래그를 관리하는 상태 변수
    @State private var email: String = ""
    @State var isWrongEmail = false
    @State var isRightEmail = false
    @State var show = false
    @State var isValidate = false
    @State var animateCircle = false
    
    // 아이콘, 텍스트 및 색상을 사용자 정의할 수 있는 속성
    var icon: UIImage = UIImage(systemName: "checkmark.circle")!
    var iconError: UIImage = UIImage(systemName: "xmark.circle")!
    var text = "Berhasil"
    var gridentColor: Color = .green
    var circleAColor: Color = .green
    var gridentColorEr: Color = .red
    var circleAColorEr: Color = .red
    var details: String = "메시지를 입력하세요"
    var corner: CGFloat = 30
    
    var body: some View {
        ZStack {
            ScrollView {
                VStack {
                    // 뒤로 가기 버튼과 제목이 있는 헤더
                    HStack {
                        Button(action: { }, label: {
                            Image(systemName: "chevron.backward")
                                .resizable()
                                .frame(width: 10, height: 15)
                        })
                        Spacer()
                        Text("Regex Email").font(.title2)
                        Spacer()
                    }
                    .foregroundStyle(.primary)
                    .padding(.horizontal, 20)
                    .padding(.top, 10)
                    
                    // 이메일 입력 필드
                    VStack(spacing: 30) {
                        CustomTextField(placeHolder: "이메일", imageName: "envelope", bColor: "text1", tOpacity: 0.6, value: $email)
                    }
                    .padding(.horizontal, 10)
                    .padding(.vertical, 15)
                    
                    // 제출 버튼
                    Button(action: {
                        if isEmail(valid: email) == false {
                            isWrongEmail = true
                        } else {
                            isRightEmail = true
                        }
                    }, label: {
                        Text("제출")
                            .fontWeight(.medium)
                            .foregroundColor(.white)
                            .frame(height: 50)
                            .frame(minWidth: 0, maxWidth: .infinity)
                            .background(Color("color1"))
                            .cornerRadius(20)
                            .padding(.horizontal, 10)
                    })
                    .padding(.top, 20)
                }
            }
            
            // 성공 모달 뷰
            if isRightEmail {
                VStack {
                    Spacer()
                    ZStack {
                        Color.black
                            .opacity(0.3)
                            .shadow(color: Color.black.opacity(0.08), radius: 40, x: 0, y: 5)
                            .ignoresSafeArea()
                            .onTapGesture {
                                isRightEmail = false
                            }
                        
                        ZStack {
                            RoundedRectangle(cornerRadius: corner)
                                .foregroundColor(.white)
                                .frame(height: 250)
                                .shadow(color: .black.opacity(0.01), radius: 20, x: 0.0, y: 0.0)
                                .shadow(color: .black.opacity(0.1), radius: 30, x: 0.0, y: 0.0)
                                .padding(.horizontal, 20)
                            
                            VStack(spacing: 10) {
                                ZStack {
                                    Circle()
                                        .stroke(lineWidth: 2)
                                        .foregroundStyle(circleAColor)
                                        .frame(width: 80, height: 80)
                                        .scaleEffect(animateCircle ? 1.3 : 0.90)
                                        .opacity(animateCircle ? 0 : 1)
                                        .animation(.easeInOut(duration: 2).delay(1).repeatForever(autoreverses: false), value: animateCircle)
                                    
                                    Circle()
                                        .stroke(lineWidth: 2)
                                        .foregroundStyle(circleAColor)
                                        .frame(width: 80, height: 80)
                                        .scaleEffect(animateCircle ? 1.3 : 0.90)
                                        .opacity(animateCircle ? 0 : 1)
                                        .animation(.easeInOut(duration: 2).delay(1.5).repeatForever(autoreverses: false), value: animateCircle)
                                        .onAppear {
                                            animateCircle.toggle()
                                        }
                                    
                                    Image(uiImage: icon)
                                        .resizable()
                                        .frame(width: 90, height: 90)
                                }
                                
                                Text("이메일이 올바릅니다").bold().font(.system(size: 25))
                                Text("이메일 유효성 검사 성공").opacity(0.5)
                                Button(action: {
                                    isRightEmail = false
                                }, label: {
                                    Text("확인")
                                        .fontWeight(.medium)
                                        .font(.system(size: 15))
                                        .foregroundColor(.white)
                                        .frame(width: 80, height: 40)
                                        .background(Color("color1"))
                                        .cornerRadius(20)
                                        .padding(.horizontal, 50)
                                }).padding(.top, 7)
                            }
                        }.padding()
                    }
                    Spacer()
                }.ignoresSafeArea()
            }
            
            // 오류 모달 뷰
            if isWrongEmail {
                VStack {
                    Spacer()
                    ZStack {
                        Color.black
                            .opacity(0.3)
                            .shadow(color: Color.black.opacity(0.08), radius: 40, x: 0, y: 5)
                            .ignoresSafeArea()
                            .onTapGesture {
                                isWrongEmail = false
                            }
                        
                        ZStack {
                            RoundedRectangle(cornerRadius: corner)
                                .foregroundColor(.white)
                                .frame(height: 250)
                                .shadow(color: .black.opacity(0.01), radius: 20, x: 0.0, y: 0.0)
                                .shadow(color: .black.opacity(0.1), radius: 30, x: 0.0, y: 0.0)
                                .padding(.horizontal, 20)
                            
                            VStack(spacing: 10) {
                                ZStack {
                                    Circle()
                                        .stroke(lineWidth: 2)
                                        .foregroundStyle(circleAColorEr)
                                        .frame(width: 80, height: 80)
                                        .scaleEffect(animateCircle ? 1.3 : 0.90)
                                        .opacity(animateCircle ? 0 : 1)
                                        .animation(.easeInOut(duration: 2).delay(1).repeatForever(autoreverses: false), value: animateCircle)
                                    
                                    Circle()
                                        .stroke(lineWidth: 2)
                                        .foregroundStyle(circleAColor)
                                        .frame(width: 80, height: 80)
                                        .scaleEffect(animateCircle ? 1.3 : 0.90)
                                        .opacity(animateCircle ? 0 : 1)
                                        .animation(.easeInOut(duration: 2).delay(1.5).repeatForever(autoreverses: false), value: animateCircle)
                                        .onAppear {
                                            animateCircle.toggle()
                                        }
                                    
                                    Image(uiImage: iconError)
                                        .resizable()
                                        .frame(width: 90, height: 90)
                                }
                                
                                Text("잘못된 이메일").

<div class="content-ad"></div>

## 이 글을 마무리하며:

사용자가 올바른 형식의 이메일 주소를 제공하도록 하는 것이 중요합니다. 이는 사용자 경험을 향상시키는데 도움이 되는데 더불어 애플리케이션의 데이터 정확성과 통신 신뢰성을 향상시킵니다. 읽어 주셔서 감사합니다! Naufal Adli의 더 많은 SwiftUI 기사가 곧 나올 예정이니 많은 기대 부탁드립니다. 이 기사는 수작업으로 만들어졌으며 마음을 담아 제작되었습니다. ❤️ 이제부터 좋아요와 팔로우도 잊지 마세요.