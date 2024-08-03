---
title: "java로 파일의 바이러스를 스캔하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "How to scan a file for viruses in Java"
link: "https://cloudmersive.medium.com/how-to-scan-a-file-for-viruses-in-java-bca09045abdc"
---



바이러스는 사용자가 제출한 콘텐츠뿐만 아니라 때로는 고객이 제출한 콘텐츠와 관련된 주요 문제가 될 수 있습니다. 시스템을 안전하게 유지하는 가장 좋은 방법은 모든 수신 파일을 시스템이 상호 작용하기 전에 스크린하는 것입니다. 이를 위해, 이 튜토리얼에서는 Java를 사용하여 자동 바이러스 스캔 시스템을 빠르고 쉽게 설정하는 방법을 안내할 것입니다. 바로 시작해 봅시다.

먼저, 우리는 Jitpack을 사용하여 라이브러리를 동적으로 컴파일해야 합니다. 이를 위해, Maven POM 파일에 우리의 저장소와 매장소에 대한 참조를 추가해야 합니다:

```js
<repositories>
  <repository>
    <id>jitpack.io</id>
    <url>https://jitpack.io</url>
  </repository>
</repositories>
```

그리고:

<div class="content-ad"></div>

```js
<dependencies>
  <dependency>
    <groupId>com.github.Cloudmersive</groupId>
    <artifactId>Cloudmersive.APIClient.Java</artifactId>
    <version>v2.75</version>
  </dependency>
</dependencies>
```

이제 scanFile을 호출하기만 하면 됩니다:

```js
// 클래스 가져 오기:
//import com.cloudmersive.client.invoker.ApiClient;
//import com.cloudmersive.client.invoker.ApiException;
//import com.cloudmersive.client.invoker.Configuration;
//import com.cloudmersive.client.invoker.auth.*;
//import com.cloudmersive.client.ScanApi;
ApiClient defaultClient = Configuration.getDefaultApiClient();
// API 키 인증 구성:
ApiKeyAuth Apikey = (ApiKeyAuth) defaultClient.getAuthentication("Apikey");
Apikey.setApiKey("YOUR API KEY");
// API 키에 대한 접두사를 설정하려면 다음 줄의 주석을 해제하십시오. 예 : "Token" (기본값은 null입니다)
//Apikey.setApiKeyPrefix("Token");
ScanApi apiInstance = new ScanApi();
File inputFile = new File("/path/to/file"); // 수행할 파일의 입력 파일.
try {
VirusScanResult result = apiInstance.scanFile(inputFile);
System.out.println(result);
} catch (ApiException e) {
System.err.println("ScanApi#scanFile 호출 시 예외 발생");
e.printStackTrace();
}
```

그리고 이것이 전달된 응답 형식입니다:

<div class="content-ad"></div>

```json
{
  "CleanResult": true,
  "FoundViruses": [
    {
      "FileName": "string",
      "VirusName": "string"
    }
  ]
}


저희 바이러스 검사는 1700만 가지 이상의 바이러스 정의를 지원하며 지속적으로 클라우드 기반 업데이트를 받습니다. 더 많은 사용자 정의를 원하시면 scanFileAdvanced 함수를 사용하실 수도 있습니다. 이 함수를 사용하면 검사 기준을 세밀하게 조정할 수 있어 실행 파일, 스크립트 및 잘못된 파일을 차단할 수 있습니다.

<img src="/assets/img/How-to-scan-a-file-for-viruses-in-Java_0.png" />
```
