---
title: "Jetpack Compose로 인터랙티브 HTML 콘텐츠 만드는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-CreatingInteractiveHTMLContentinJetpackCompose_0.png"
date: 2024-06-22 03:58
ogImage: 
  url: /assets/img/2024-06-22-CreatingInteractiveHTMLContentinJetpackCompose_0.png
tag: Tech
originalTitle: "Creating Interactive HTML Content in Jetpack Compose"
link: "https://medium.com/@graser1305/creating-interactive-html-content-in-jetpack-compose-7f7e929152f3"
---


HTML 내용을 Android Compose에서 표시하는 것은 특히 클릭 가능한 링크와 함께 일부 쉽게 보이지 않을 수 있습니다. 그러나 Kotlin과 Jetpack Compose를 사용하면 관리할 수 있고 즐거울 수도 있습니다. 이 안내서에서는 클릭 가능한 링크가 포함된 HTML 문자열을 구문 분석하고 표시하는 사용자 정의 구성 가능한 함수인 HtmlText를 만드는 방법을 안내하겠습니다.

# 의존성 추가

시작하기 전에 build.gradle 파일에 필요한 종속성이 있는지 확인하세요:

```js
dependencies {
    implementation "androidx.compose.ui:ui:1.0.0"
    implementation "androidx.compose.material:material:1.0.0"
    implementation "androidx.compose.ui:ui-tooling-preview:1.0.0"
    implementation "androidx.compose.runtime:runtime-livedata:1.0.0"
    implementation 'androidx.core:core-ktx:1.6.0'
    implementation 'androidx.appcompat:appcompat:1.3.1'
    implementation 'androidx.compose.foundation:foundation:1.0.0'
}
```

<div class="content-ad"></div>

# HtmlText 컴포저블 함수 구축하기

HtmlText 컴포저블 함수를 만드는 과정을 단계별로 살펴보겠습니다.

![image](/assets/img/2024-06-22-CreatingInteractiveHTMLContentinJetpackCompose_0.png)

함수 내부에서 현재 컨텍스트를 가져와 HTML 콘텐츠에서 주석이 달린 문자열을 만듭니다. HtmlCompat.fromHtml 메서드는 HTML 문자열을 Spanned 객체로 변환합니다.

<div class="content-ad"></div>

```kotlin
val context = LocalContext.current
val annotatedText = remember(html) {
    val spanned = HtmlCompat.fromHtml(html, HtmlCompat.FROM_HTML_MODE_LEGACY)
    val text = spanned.toString()
    buildAnnotatedString {
        append(text)
        // 여기에 추가 코드가 추가될 예정입니다
    }
}
```

## 링크 구문 분석

Spanned 객체에서 URL 스팬을 추출하고 buildAnnotatedString 블록 내에서 해당 링크에 주석을 달아서 스타일을 적용하고 클릭 가능하게 만듭니다.

```kotlin
val urlSpans = spanned.getSpans(0, spanned.length, android.text.style.URLSpan::class.java)
urlSpans.forEach { urlSpan ->
    val start = spanned.getSpanStart(urlSpan)
    val end = spanned.getSpanEnd(urlSpan)
    val url = urlSpan.url
    addStyle(
        style = SpanStyle(
            color = linkColor,
            fontSize = fontSize,
            fontWeight = FontWeight.SemiBold,
            textDecoration = TextDecoration.Underline
        ), start = start, end = end
    )
    addStringAnnotation(
        tag = "URL",
        annotation = url,
        start = start,
        end = end
    )
}
```

<div class="content-ad"></div>

# 클릭 처리

ClickableText를 사용하여 주석이 달린 문자열을 렌더링하고 링크 클릭을 처리하세요. 링크를 클릭하면 장치의 브라우저에서 열립니다.

```js
ClickableText(
    text = annotatedText,
    onClick = { offset ->
        annotatedText.getStringAnnotations(tag = "URL", start = offset, end = offset)
            .firstOrNull()?.let { annotation ->
                val intent = Intent(Intent.ACTION_VIEW, Uri.parse(annotation.item))
                context.startActivity(intent)
            }
    },
    style = TextStyle(
        color = textColor,
        fontSize = fontSize,
        fontWeight = fontWeight
    )
)
```

# Complete HtmlText 함수

<div class="content-ad"></div>

다음은 HtmlText 함수의 완전한 코드입니다:

```js
import android.content.Intent
import android.net.Uri
import androidx.compose.foundation.text.ClickableText
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.text.style.TextStyle
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.sp
import androidx.core.text.HtmlCompat

@Composable
fun HtmlText(
    html: String,
    linkColor: Color = Color(0xFF6200EE), // 기본 링크 색상
    textColor: Color = Color.DarkGray,
    fontSize: TextUnit = 11.sp,
    fontWeight: FontWeight = FontWeight.Normal
) {
    val context = LocalContext.current
    val annotatedText = remember(html) {
        val spanned = HtmlCompat.fromHtml(html, HtmlCompat.FROM_HTML_MODE_LEGACY)
        val text = spanned.toString()
        buildAnnotatedString {
            append(text)
            val urlSpans = spanned.getSpans(0, spanned.length, android.text.style.URLSpan::class.java)
            urlSpans.forEach { urlSpan ->
                val start = spanned.getSpanStart(urlSpan)
                val end = spanned.getSpanEnd(urlSpan)
                val url = urlSpan.url
                addStyle(
                    style = SpanStyle(
                        color = linkColor,
                        fontSize = fontSize,
                        fontWeight = FontWeight.SemiBold,
                        textDecoration = TextDecoration.Underline
                    ), start = start, end = end
                )
                addStringAnnotation(
                    tag = "URL",
                    annotation = url,
                    start = start,
                    end = end
                )
            }
        }
    }

    ClickableText(
        text = annotatedText,
        onClick = { offset ->
            annotatedText.getStringAnnotations(tag = "URL", start = offset, end = offset)
                .firstOrNull()?.let { annotation ->
                    val intent = Intent(Intent.ACTION_VIEW, Uri.parse(annotation.item))
                    context.startActivity(intent)
                }
        },
        style = TextStyle(
            color = textColor,
            fontSize = fontSize,
            fontWeight = fontWeight
        )
    )
}
```

# HtmlText 컴포저 사용하기

Compose UI에서 HtmlText 컴포저를 사용하려면 HTML 콘텐츠와 함께 호출하면 됩니다.

<div class="content-ad"></div>

```kotlin
@Composable
fun HelloWorldScreen() {
    val htmlContent = """
        <p>This is a <a href="https://medium.com/">link</a> in HTML.</p>
    """.trimIndent()

    HtmlText(
        html = htmlContent,
        linkColor = Color.Blue,
        textColor = Color.Black,
        fontSize = 16.sp,
        fontWeight = FontWeight.Bold
    )
}
```

![Image](/assets/img/2024-06-22-CreatingInteractiveHTMLContentinJetpackCompose_1.png)

# 결론

위 단계를 따라서 Jetpack Compose에서 사용자 정의 HtmlText composable 함수를 만들어 클릭 가능한 링크가 있는 HTML 콘텐츠를 구문 분석하고 표시할 수 있었습니다. 이 함수는 Android의 HtmlCompat을 활용하여 HTML 문자열을 spanned 텍스트로 변환하고 Compose의 ClickableText를 사용하여 링크 상호 작용을 처리하여, Compose 애플리케이션에서 풍부한 텍스트 콘텐츠를 표시하는 강력한 도구가 되었습니다. 또한 사용자 정의 클릭 리스너를 추가하여 이 composable을 확장하고 HTML 콘텐츠와 더 복잡한 상호 작용을 가능하게 할 수 있습니다.
