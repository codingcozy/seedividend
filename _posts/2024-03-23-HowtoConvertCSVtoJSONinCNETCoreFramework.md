---
title: "C NET Core 프레임워크에서 CSV를 JSON으로 변환하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "How to Convert CSV to JSON in C NET Core Framework"
link: "https://cloudmersive.medium.com/how-to-convert-csv-to-json-in-c-net-core-framework-123414c5b26c"
isUpdated: true
---





CSV를 JSON으로 변환하는 코드를 작성하는 데 시간을 할애하는 것은 다른 긴급한 작업에서 시간을 빼앗아 버릴 수도 있어요. 다행히 모든 코드를 우리가 직접 작성할 필요는 없습니다.

! [이미지](/assets/img/How-to-Convert-CSV-to-JSON-in-C#-.NET-Core-Framework_0.png)

아래 제공된 준비된 코드 예제를 사용하면 CSV 파일을 JSON 객체로 변환하는 무료 API의 혜택을 받을 수 있어요. API를 사용하면 이 일상적인 변환 작업이 매우 빠르고 쉽게 처리되며, 서버의 일부 처리 부담을 외부 서버로 옮길 수 있어요.

무료 API 키로 API 호출을 승인할 수 있어요. 이를 통해 매월 최대 800회의 변환을 약정없이 사용할 수 있어요.

<div class="content-ad"></div>

API 호출을 구조화하기 위해 SDK를 설치하여 시작해보겠습니다. NuGet을 통해 설치하려면 Package Manager 콘솔에서 다음 명령을 실행하세요:

```js
Install-Package Cloudmersive.APIClient.NETCore.DocumentAndDataConvert -Version 2.2.1
```

다음으로, 아래 코드를 파일에 복사하여 함수를 호출하세요. 지정된 코드 조각에 무료 API 키를 붙여넣고, CSV 파일을 formData 요청에 제공해주세요:

```js
using System;
using System.Diagnostics;
using Cloudmersive.APIClient.NETCore.DocumentAndDataConvert.Api;
using Cloudmersive.APIClient.NETCore.DocumentAndDataConvert.Client;
using Cloudmersive.APIClient.NETCore.DocumentAndDataConvert.Model;

namespace Example
{
    public class ConvertDataCsvToJsonExample
    {
        public void main()
        {
            // API 키 권한 구성: Apikey
            Configuration.Default.AddApiKey("Apikey", "여러분의_API_키");

            var apiInstance = new ConvertDataApi();
            var inputFile = new System.IO.FileStream("C:\\temp\\inputfile", System.IO.FileMode.Open); // 작업을 수행할 입력 파일.
            var columnNamesFromFirstRow = true;  // bool? | 선택 사항; true로 설정하면 첫 번째 행이 열의 레이블로 사용됩니다. false로 설정하면 열이 Column0, Column1 등으로 명명됩니다. 기본값은 true입니다. Column 헤더를 사용하지 않거나 불규칙한 열 구조를 가지고 있다면 false로 설정하세요. (선택사항)

            try
            {
                // CSV를 JSON으로 변환
                Object result = apiInstance.ConvertDataCsvToJson(inputFile, columnNamesFromFirstRow);
                Debug.WriteLine(result);
            }
            catch (Exception e)
            {
                Debug.Print("ConvertDataApi.ConvertDataCsvToJson 호출 시 예외 발생: " + e.Message );
            }
        }
    }
}
```

<div class="content-ad"></div>

이제 최소한의 코드로 CSV를 JSON으로 쉽게 변환할 수 있어요.
