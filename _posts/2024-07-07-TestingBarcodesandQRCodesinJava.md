---
title: "Java에서 바코드 및 QR 코드 테스트하는 방법"
description: ""
coverImage: "/allround-coder.github.io/assets/no-image.jpg"
date: 2024-07-07 02:37
ogImage: 
  url: /allround-coder.github.io/assets/no-image.jpg
tag: Tech
originalTitle: "Testing Barcodes and QR Codes in Java"
link: "https://medium.com/@yasin.deger/testing-barcodes-and-qr-codes-in-java-8d06763bf749"
isUpdated: true
---




자동화 테스팅의 세계에서 바코드와 QR 코드를 다루는 것은 흔한 시나리오입니다. 이러한 코드에는 중요한 정보가 포함되어 있으며, 이를 정확하고 가독성 있게 유지하는 것이 중요합니다. 이 기사에서는 바코드와 QR 코드의 테스트 자동화를 위해 TestNG를 사용하는 방법을 알아보겠습니다. 아래 그림에서 사용된 바코드 및 QR 코드 표준을 확인할 수 있습니다. 즐겁게 읽으세요…

![바코드 및 QR코드 표준](https://miro.medium.com/v2/resize:fit:870/1*-LtAUNJE7I9zl9N8BCHczA.gif)

# 사전 준비 사항

코드를 살펴보기 전에 다음 설정이 완료되었는지 확인하세요:

<div class="content-ad"></div>

- Java Development Kit (JDK)
- Maven (의존성 관리를 위해 사용하는 빌드 관리 도구)
- TestNG (테스트 작성 및 실행을 위해 사용)
- ZXing (바코드 및 QR 코드 디코딩을 위해 사용)
- Selenium WebDriver (브라우저 자동화를 위해 사용)

최신 버전의 필수 의존성을 pom.xml에 추가해주세요:

```js
<dependencies>
<!--        웹 스크래핑 도구-->
    <dependency>
        <groupId>org.seleniumhq.selenium</groupId>
        <artifactId>selenium-java</artifactId>
        <version>${selenium}</version>
    </dependency>
<!--    QR 코드 디코딩-->
    <dependency>
        <groupId>com.google.zxing</groupId>
        <artifactId>core</artifactId>
        <version>${barcode.decode}</version>
    </dependency>
    <dependency>...