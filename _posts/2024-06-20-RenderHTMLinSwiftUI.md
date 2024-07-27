---
title: "SwiftUI에서 HTML 렌더링하기"
description: ""
coverImage: "/assets/img/2024-06-20-RenderHTMLinSwiftUI_0.png"
date: 2024-06-20 03:39
ogImage: 
  url: /assets/img/2024-06-20-RenderHTMLinSwiftUI_0.png
tag: Tech
originalTitle: "Render HTML in SwiftUI"
link: "https://medium.com/@thomsmed/rendering-html-in-swiftui-65e883a63571"
---


## NSAttributedString, UITextView 및 UIViewRepresentable를 사용하여 SwiftUI에서 HTML 렌더링하기.

![이미지](/assets/img/2024-06-20-RenderHTMLinSwiftUI_0.png)

SwiftUI는 멋지지만 여전히 기능이 부족한 것이 많습니다. 몇 년간 UIKit을 사용한 후 익숙해진 기능이죠. 그 중 하나는 NSAttributedString 및 UITextView를 사용하여 간단한 HTML 텍스트를 렌더링할 수 있는 기능입니다.

이 글에서는 SwiftUI를 UIViewRepresentable을 사용하여 UIKit과 연결하고, HTML을 렌더링하는 사용자 정의 SwiftUI View를 만드는 방법을 간단히 살펴보겠습니다.

<div class="content-ad"></div>

업데이트: 원본 기사 개선 사항

이 기사의 원본 버전에서는 NSAttributedString을 사용하여 HTML을 스타일링하고 렌더링하는 데 특화된 간단한 사용자 정의 SwiftUI 뷰를 만드는 방법에 대해 살펴보았습니다. 이 기사에서는 AttributedText 뷰도 언급되었습니다. 그러나 이로 인해 이상한 동작이 발생했는데, 아직 적절한 해결책을 찾지 못했습니다. 따라서 이 기사의 업데이트된 버전에서는 HTML 뷰를 제거하고 NSAttributedString에 대한 편리한 확장 기능이 몇 가지 추가되었습니다. 나는 이상한 동작에 대한 더 나은 이해를 얻기 위해 Apple 개발자 포럼과 스택 오버플로에 게시했습니다.

## 주요 포인트

- UIViewRepresentable 프로토콜을 사용하여 UIKit 뷰를 SwiftUI 뷰 계층구조에 포함할 수 있습니다.
- NSAttributedString (UITextView를 통해)의 강력한 기능을 노출할 수 있으며, 현재 SwiftUI 세계에는 동등한 것이 없습니다 (하지만 AttributedString는 좋은 후보일 수 있음).
- 스타일이 지정된 HTML 형식의 NSAttributedStrings는 UIViewRepresentable에 의해 관리되는 UITextView에 의해 렌더링될 수 있습니다. HTML 형식의 텍스트에서 일부 CSS 스타일 속성을 인라인으로 정의하거나 HTML 형식의 텍스트의 전용 스타일 태그로 정의할 수 있습니다.

<div class="content-ad"></div>

이 기사에서 사용된 완성된 예제 코드는 GitHub에서 찾을 수 있어요: https://github.com/thomsmed/ios-examples/tree/main/SwiftUIHTML.

# 커스텀 UIViewRepresentable

SwiftUI가 처음 발표됐을 때는 기존 UIKit 뷰를 SwiftUI 뷰 계층구조에 임베드할 수 있도록 하는 API도 함께 제공되었습니다. 개발자들에게 UIKit에서 SwiftUI로의 전환이 쉬워졌어요.

이러한 API 중 하나는 UIViewRepresentable 프로토콜인데요, SwiftUI의 컨텍스트에서 UIKit 뷰를 관리하는 데 사용돼요. Apple은 이 프로토콜과 다른 SwiftUI와 UIKit을 연결하는 프로토콜을 통해 이를 통한 가능성을 보여주는 멋진 WWDC 비디오를 제공했어요. 적어도 'Integrating SwiftUI'를 확인해보시기를 권해요.

<div class="content-ad"></div>

## AttributedText

NSAttributedString은 텍스트 문자열을 강력하게 관리하는 도구로, 텍스트 문자열의 문자 범위를 스타일링하는 강력한 방법을 제공합니다. 심지어 간단한 HTML에 따라 텍스트를 스타일링할 수도 있습니다.

NSAttributedString을 스타일링된 상태로 초기화하려면 NSAttributedString.init(data:options:documentAttributes:) 이니셜라이저에 .documentType 옵션을 .html로 설정한 HTML 문자열(데이터 형식으로)을 전달하면 됩니다. 그리고 UITextView와 함께 사용하여 앱에서 HTML을 렌더링할 수 있습니다!

UIViewRepresentable 프로토콜을 사용하여 NSAttributedString 및 UITextView의 기능을 SwiftUI에 사용되는 사용자 지정 AttributedText View로 노출시킬 것입니다!

<div class="content-ad"></div>

```swift
import SwiftUI

struct AttributedText: UIViewRepresentable {
    private let attributedString: NSAttributedString

    init(_ attributedString: NSAttributedString) {
        self.attributedString = attributedString
    }

    func makeUIView(context: Context) -> UITextView {
        // SwiftUI이 이 "View"를 렌더링하는 첫 번째 시간에 호출됩니다.

        let uiTextView = UITextView()

        // 배경 뷰가 반짝일 수 있도록 투명하게 만듭니다.
        uiTextView.backgroundColor = .clear

        // 텍스트 시각화만을 위한 것이므로 편집되지 않도록 합니다.
        uiTextView.isEditable = false

        // UITextView를 가능한 너비에 맞게 유연하게 만들지만, 콘텐츠에 맞는 높이를 요구합니다.
        // 또한 UITextView가 스크롤되지 않게 하여 UITextView가 텍스트 콘텐츠와 일치하도록 `intrinsicContentSize`를 설정합니다.
        uiTextView.isScrollEnabled = false
        uiTextView.setContentHuggingPriority(.defaultLow, for: .vertical)
        uiTextView.setContentHuggingPriority(.defaultLow, for: .horizontal)
        uiTextView.setContentCompressionResistancePriority(.required, for: .vertical)
        uiTextView.setContentCompressionResistancePriority(.defaultLow, for: .horizontal)

        return uiTextView
    }

    func updateUIView(_ uiTextView: UITextView, context: Context) {
        // SwiftUI이 이 UIViewRepresentable을 처음 렌더링하는 시간과 상태 변경에 대해 알림을 받을 때마다 호출됩니다. (예: @State 변수를 통해)
        uiTextView.attributedText = attributedString
    }
}
```

UIViewRepresentable로 위에서 정의한 AttributedText를 사용하여 SwiftUI 앱에서 NSAttributedStrings를 렌더링할 수 있습니다. HTML 형식의 텍스트로 초기화된 NSAttributedStrings를 렌더링하는 것이 주된 목표이므로 NSAttributedString에 대한 편의 생성자를 만듭니다.

```swift
import UIKit

extension NSAttributedString {
    static func html(withBody body: String) -> NSAttributedString {
        // 앱에서 사용되는 현재 로케이션과 일치하는 HTML `lang` 속성을 매치합니다. (즉, Bundle.main)
        let bundle = Bundle.main
        let lang = bundle.preferredLocalizations.first
            ?? bundle.developmentLocalization
            ?? "en"

        return (try? NSAttributedString(
            data: """
            <!doctype html>
            <html lang="\(lang)">
            <head>
                <meta charset="utf-8">
                <style type="text/css">
                    /*
                      HTML 형식의 텍스트에 대한 사용자 정의 CSS 스타일 지정
                      주의: NSAttributedString/UITextView에서 지원하는 CSS 기능은 제한적입니다.
                    */

                    body {
                        font: -apple-system-body;
                        color: \(UIColor.secondaryLabel.hex);
                    }

                    h1, h2, h3, h4, h5, h6 {
                        color: \(UIColor.label.hex);
                    }

                    a {
                        color: \(UIColor.systemGreen.hex);
                    }

                    li:last-child {
                        margin-bottom: 1em;
                    }
                </style>
            </head>
            <body>
                \(body)
            </body>
            </html>
            """.data(using: .utf8)!,
            options: [
                .documentType: NSAttributedString.DocumentType.html,
                .characterEncoding: String.Encoding.utf8.rawValue,
            ],
            documentAttributes: nil
        )) ?? NSAttributedString(string: body)
    }
}

// UIColor를 CSS 친화적인 색상 헥스 문자열로 변환

private extension UIColor {
    var hex: String {
        var red: CGFloat = 0
        var green: CGFloat = 0
        var blue: CGFloat = 0
        var alpha: CGFloat = 0

        getRed(&red, green: &green, blue: &blue, alpha: &alpha)

        return String(
            format: "#%02lX%02lX%02lX%02lX",
            lroundf(Float(red * 255)),
            lroundf(Float(green * 255)),
            lroundf(Float(blue * 255)),
            lroundf(Float(alpha * 255))
        )
    }
}
```

<div class="content-ad"></div>

NSAttributedString은 일부 CSS 기능을 지원합니다 (안타깝게도 어딘가 제대로 문서화되지 않은 기능들이 있습니다), 하지만 인라인 및 별도의 태그 내에서 스타일을 정의하는 것이 가능합니다 (일반적으로 HTML head 태그의 일부로).

## SwiftUI에서 HTML 렌더링하기

그런 다음, 우리는 AttributedText UIViewRepresentable을 사용하여 NSAttributedString 편리한 초기화자를 함께 사용하여 SwiftUI 앱에서 HTML을 렌더링할 수 있습니다 - 심지어 인라인 스타일링도 가능합니다!

```js
import SwiftUI

struct ContentView: View {
    var body: some View {
        NavigationStack {
            ScrollView {
                AttributedText(.html(withBody: """
                <h3>This is a H3 header</h3>
                <p>This is a paragraph</p>
                <ul>
                    <li>List item one</li>
                    <li>List item two</li>
                </ul>
                <p>This is a paragraph with a <a href="https://developer.apple.com/">link</a></p>
                <p style="color: blue; text-align: center;">
                    This is a paragraph with inline styling
                </p>
                """))
                .padding()
            }
            .navigationTitle("Render HTML in SwiftUI")
        }
    }
}
```

<div class="content-ad"></div>

## 보너스: 테마별 HTML 렌더링

만약 앱이 (색상) 테마 개념을 사용하여 앱 전반에 대한 색상 정보 등을 전파한다면, 현재 테마 정보를 기반으로 HTML을 스타일링할 수도 있습니다.

사용자 정의 테마 환경 값과 다른 NSAttributedString 편의 이니셜라이저를 사용하면 다음과 같이 보일 수 있습니다:

사용자 정의 테마 환경 값

<div class="content-ad"></div>

다음은 Markdown 형식으로 테이블 태그를 변경한 코드입니다.


import SwiftUI

// Example of a simple Theme struct.
struct Theme {
    let textPrimary: UIColor
    let textSecondary: UIColor
    let textInteractive: UIColor
}

extension Theme {
    static let `default` = Theme(
        textPrimary: .label,
        textSecondary: .secondaryLabel,
        textInteractive: .systemGreen
    )
}

private struct ThemeEnvironmentKey: EnvironmentKey {
    static var defaultValue: Theme = .default
}

extension EnvironmentValues {
    var theme: Theme {
        get { self[ThemeEnvironmentKey.self] }
        set { self[ThemeEnvironmentKey.self] = newValue }
    }
}


NSAttributedString을 위한 편리한 이니셜라이저


import UIKit

extension NSAttributedString {
    static func themedHtml(withBody body: String, theme: Theme = .default) -> NSAttributedString {
        // Match the HTML `lang` attribute to current localisation used by the app (aka Bundle.main).
        let bundle = Bundle.main
        let lang = bundle.preferredLocalizations.first
            ?? bundle.developmentLocalization
            ?? "en"

        return (try? NSAttributedString(
            data: """
            <!doctype html>
            <html lang="\(lang)">
            <head>
                <meta charset="utf-8">
                <style type="text/css">
                    /*
                      Custom CSS styling of HTML formatted text.
                      Note, only a limited number of CSS features are supported by NSAttributedString/UITextView.
                    */

                    body {
                        font: -apple-system-body;
                        color: \(theme.textSecondary.hex);
                    }

                    h1, h2, h3, h4, h5, h6 {
                        color: \(theme.textPrimary.hex);
                    }

                    a {
                        color: \(theme.textInteractive.hex);
                    }

                    li:last-child {
                        margin-bottom: 1em;
                    }
                </style>
            </head>
            <body>
                \(body)
            </body>
            </html>
            """.data(using: .utf8)!,
            options: [
                .documentType: NSAttributedString.DocumentType.html,
                .characterEncoding: String.Encoding.utf8.rawValue,
            ],
            documentAttributes: nil
        )) ?? NSAttributedString(string: body)
    }
}

// MARK: Converting UIColors into CSS friendly color hex string

private extension UIColor {
    var hex: String {
        var red: CGFloat = 0
        var green: CGFloat = 0
        var blue: CGFloat = 0
        var alpha: CGFloat = 0

        getRed(&red, green: &green, blue: &blue, alpha: &alpha)

        return String(
            format: "#%02lX%02lX%02lX%02lX",
            lroundf(Float(red * 255)),
            lroundf(Float(green * 255)),
            lroundf(Float(blue * 255)),
            lroundf(Float(alpha * 255))
        )
    }
}


SwiftUI에서 테마가 적용된 HTML 렌더링하기


<div class="content-ad"></div>

```swift
import SwiftUI

struct ContentView: View {
    @Environment(\.theme) private var theme: Theme

    var body: some View {
        NavigationStack {
            ScrollView {
                AttributedText(.themedHtml(withBody: """
                <h3>This is a H3 header</h3>
                <p>This is a paragraph</p>
                <ul>
                    <li>List item one</li>
                    <li>List item two</li>
                </ul>
                <p>This is a paragraph with a <a href="https://developer.apple.com/">link</a></p>
                <p style="color: blue; text-align: center;">
                    This is a paragraph with inline styling
                </p>
                """, theme: theme))
                .padding()
            }
            .navigationTitle("Render Themed HTML in SwiftUI")
        }
    }
}
```

## 이게 다야!

쉽죠! SwiftUI가 정말 멋지지만, 때로는 몇 년 동안 사랑해 온 UIKit 뷰와 기능을 임베드할 수 있는 것이 참 좋습니다.

코딩하세요! 🙌
