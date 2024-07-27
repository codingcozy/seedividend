---
title: "자바를 사용하여 Flying Saucer로 HTML을 PDF로 변환하기"
description: ""
coverImage: "/assets/img/2024-06-20-ConvertingHTMLtoPDFinJavaUsingFlyingSaucer_0.png"
date: 2024-06-20 06:08
ogImage: 
  url: /assets/img/2024-06-20-ConvertingHTMLtoPDFinJavaUsingFlyingSaucer_0.png
tag: Tech
originalTitle: "Converting HTML to PDF in Java Using Flying Saucer"
link: "https://medium.com/@jangacharysri/converting-html-to-pdf-in-java-using-flying-saucer-8d923c309302"
---


<img src="/assets/img/2024-06-20-ConvertingHTMLtoPDFinJavaUsingFlyingSaucer_0.png" />

요즘의 디지털 세계에서 HTML 파일을 PDF 문서로 프로그래밍적으로 변환하는 것은 보고서 생성, 문서 보관 등 엔터프라이즈 애플리케이션에서 흔한 요구 사항입니다. 이 블로그 포스트에서는 Maven 종속성을 활용하여 Java를 이용해 이 작업을 어떻게 수행하는지 알아보겠습니다.

# Flying Saucer 소개

Flying Saucer는 XHTML/XML 문서를 PDF로 쉽게 변환할 수 있는 오픈 소스 Java 라이브러리입니다. PDF 생성을 위해 강력한 iText 라이브러리를 내부적으로 활용합니다.

<div class="content-ad"></div>

# Maven 종속성 설정

```java
<dependency>
    <groupId>org.xhtmlrenderer</groupId>
    <artifactId>flying-saucer-core</artifactId>
    <version>9.1.22</version>
</dependency>
<dependency>
    <groupId>org.xhtmlrenderer</groupId>
    <artifactId>flying-saucer-pdf</artifactId>
    <version>9.1.22</version>
</dependency>
<dependency>
    <groupId>org.xhtmlrenderer</groupId>
    <artifactId>flying-saucer-pdf-openpdf</artifactId>
    <version>9.1.20</version>
</dependency>
<dependency>
    <groupId>org.jsoup</groupId>
    <artifactId>jsoup</artifactId>
    <version>1.13.1</version>
</dependency>
```

이러한 종속성에는 핵심 Flying Saucer 라이브러리, PDF 렌더링 기능, OpenPDF를 사용한 Flying Saucer PDF 구현, 그리고 HTML 파싱을 위한 Jsoup 라이브러리가 포함되어 있습니다.

# HTML을 PDF로 변환하기 - Java 코드

<div class="content-ad"></div>

이제 자바 코드를 살펴봅시다:

```js
import java.io.FileOutputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.apache.commons.io.FileUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.xhtmlrenderer.pdf.ITextRenderer;

public class PdfGenerator {

    private static String htmlToXhtml(String html) {
        // Convert HTML to XHTML
        Document document = Jsoup.parse(html);
        document.outputSettings().syntax(Document.OutputSettings.Syntax.xml);
        return document.html();
    }

    public static void main(String[] args) {
        String inputFile = "appointment_letter.html"; // XHTML/XML 파일 경로
        String outputFile = "output.pdf"; // 출력 PDF 파일 경로

        try {
            // ITextRenderer 인스턴스 생성
            ITextRenderer renderer = new ITextRenderer();

            // 파일에서 HTML 콘텐츠 읽기
            String content = FileUtils.readFileToString(Paths.get(inputFile).toFile(), StandardCharsets.UTF_8);

            // 치환 작업 수행
            Map<String, String> valueMap = new HashMap<>();
            valueMap.put("employeeId", "20240200001");
            valueMap.put("employeeName", "Harish Jay Raj");
            valueMap.put("startDate", "25-03-2024");

            Set<Entry<String, String>> entrySet = valueMap.entrySet();
            for (Entry<String, String> es : entrySet) {
                content = content.replace("@{" + es.getKey() + "}", es.getValue());
            }

            // HTML을 XHTML로 변환
            String htmlToXhtml = PdfGenerator.htmlToXhtml(content);
            renderer.setDocumentFromString(htmlToXhtml);

            // 문서를 PDF로 렌더링
            renderer.layout();
            FileOutputStream fos = new FileOutputStream(outputFile);
            renderer.createPDF(fos);
            fos.close();

            System.out.println("PDF 생성 성공!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

# 코드 이해

- Flying Saucer의 ITextRenderer 클래스를 사용하여 HTML 콘텐츠를 PDF로 렌더링합니다.
- HTML 콘텐츠는 파일(appointment_letter.html)에서 읽혀서 문자열로 저장됩니다.
- Map을 사용하여 동적 콘텐츠 치환을 수행합니다. 예를 들어 '@employeeId'나 '@employeeName'과 같은 플레이스홀더를 실제 값으로 대체합니다.
- HTML 콘텐츠를 Flying Saucer와 호환성을 위해 Jsoup 라이브러리를 사용하여 XHTML로 변환합니다. 마지막으로, XHTML 콘텐츠를 PDF로 렌더링하여 지정된 출력 파일(output.pdf)에 저장합니다.

<div class="content-ad"></div>

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>임명서</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }

        .letter {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .employee-info {
            margin-bottom: 20px;
        }

        .closing {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="letter">
        <div class="header">
            <h2>임명서</h2>
        </div>

        <p>
            친애하는 <span id="employeeName">@{employeeName}</span>님,
        </p>

        <p>
            당신이 XYZ 회사의 직원으로 임명되었음을 기쁘게 알려드립니다. 당신의 헌신과 기술이 아래 세부 사항을 통해 당신에게 이 직책을 얻게 했습니다.
        </p>

        <div class="employee-info">
            <p><strong>직원 ID:</strong> <span id="employeeId">@{employeeId}</span></p>
        </div>

        <p>
            XYZ 회사와의 근무는 <span id="startDate">@{startDate}</span>에 시작될 것입니다. 입사일에 인사부서에 보고하여 추가 방향과 절차에 대해 안내받으시기 바랍니다.
        </p>

        <p>
            여러분의 전문 지식이 팀에 크게 기여할 것이라 믿으며, 소중한 공헌을 기대하고 있습니다.
        </p>

        <div class="closing">
            <p>감사합니다,</p>
            <p>XYZ 회사 팀</p>
        </div>
    </div>
</body>
</html>
```

<div class="content-ad"></div>

# 결론

이 튜토리얼에서는 Flying Saucer 라이브러리를 사용하여 Java로 HTML 파일을 PDF 문서로 변환하는 방법을 알아보았습니다. 이 접근 방식을 통해 HTML 내용을 프로그래밍 방식으로 PDF 문서로 생성할 수 있는 유연성과 사용자 정의 옵션이 제공됩니다. 제공된 단계와 코드 스니펫을 따라하면 Java 애플리케이션에 쉽게 HTML을 PDF로 변환하는 기능을 통합할 수 있습니다.