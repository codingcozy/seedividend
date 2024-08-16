---
title: "React에 Power BI 보고서를 임베드하는 방법"
description: ""
coverImage: "/assets/img/2024-05-12-HowtoEmbedAPowerBIReportinReact_0.png"
date: 2024-05-12 20:38
ogImage: 
  url: /assets/img/2024-05-12-HowtoEmbedAPowerBIReportinReact_0.png
tag: Tech
originalTitle: "How to Embed A Power BI Report in React"
link: "https://medium.com/globant/how-to-embed-a-power-bi-report-in-react-f27e975e0a"
isUpdated: true
---




<img src="/assets/img/2024-05-12-HowtoEmbedAPowerBIReportinReact_0.png" />

이 기사에서는 React 애플리케이션에 Power BI 보고서를 임베드하고 Power BI 보고서에 필터를 적용하는 다양한 방법에 대해 설명합니다.

Power BI 보고서를 React 앱에 통합하는 것은 꽤 간단합니다. 몇 가지 단계를 따르기만 하면 됩니다. 또한 코드를 통해 Power BI 보고서에 필터를 추가하거나 제거하거나 사용자 정의할 수도 있습니다.

# 어떻게 시작하나요?



파워 BI 보고서를 React에 임베드하려면 두 가지 패키지를 설치해야 합니다:

```js
npm i powerbi-client-react powerbi-client
```

그런 다음, 컴포넌트에서 아래와 같이 보고서를 임베드할 수 있습니다:

```js
import { FC, useEffect, useState} from 'react';
import { models } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';

const PowerBiPOC: FC = () => {
  const [reportConfig, setReportConfig] = useState<models.IReportEmbedConfiguration>({
    type: 'report',
    embedUrl: undefined,
    accessToken: undefined,
    id: undefined,
    tokenType: models.TokenType.Embed,
    settings: {
      panes: {
        filters: {
          expanded: false,
          visible: true
        }
      },
      background: models.BackgroundType.Transparent,
    }
  });
  useEffect(() => {
    axios.get('파워 BI 세부 정보를 가져오기 위한 API URL').then((response: any) => {
      setReportConfig({
        ...reportConfig,
        embedUrl: response.value.embedUrl,
        accessToken: response.value.token,
        id: response.value.id
      });
    })
  }, []);
  return (<>
    <div>
      <PowerBIEmbed
        embedConfig={reportConfig}
        cssClassName='power-bi-report-class'
      />
    </div>
  </>)
}
export default PowerBiPOC;
```



위의 코드 스니펫을 보면 코드가 작동하려면 임베드 토큰, 임베드 URL 및 보고서 ID가 필요합니다. 이를 위해 3단계를 따라야 합니다:

## 단계 1:

$'tenant-id'의 테넌트 ID를 사용하여 https://login.microsoftonline.com/oauth2/tokenAPI로 POST 요청을 보냅니다. 응용 프로그램의 client_id, client_secret, resource 및 grant_type을 이 API로 페이로드로 전달해야 합니다. 아래와 같이 보내야 합니다: 

![이미지](/assets/img/2024-05-12-HowtoEmbedAPowerBIReportinReact_1.png)



Step 2:

다음 단계에서 필요한 액세스 토큰을 반환합니다.

## 단계 2:

https://api.powerbi.com/v1.0/myorg/groups/$'작업영역-id'/reportsAPI로 GET 요청을 보냅니다. 이전 단계에서 받은 bearer 액세스 토큰을 사용하고, 이 API에서 당신의 보고서에 대한 아래 세부 정보를 응답으로 받을 수 있습니다.

```js
"value": [
  {
      "Id": 다음 단계 및 React 코드에서 필요한 보고서 ID,
      "reportType": "PowerBIReport",
      "name": 보고서 이름,
      "webUrl": 보고서 URL,
      "embedUrl": React 코드에서 필요한 임베드 URL,
      "isFromPbix": true,
      "isOwnedByMe": true,
      "datasetId": 다음 단계에서 필요한 데이터 세트 ID,
      "datasetWorkspaceId": “",
      "users": [],
      "subscriptions": []
  }
]
```



## 단계 3:

임베드 액세스 토큰을 얻으려면 https://api.powerbi.com/v1.0/myorg/GenerateTokenAPI 로 POST 요청을 보내야 합니다. 단계 1에서 얻은 베어러 엑세스 토큰을 사용해야 하며, 요청 페이로드는 다음과 같이 보일 것입니다:

```js
{
  "datasets": [
    {
    "id" : ""
    }
  ],
  "reports": [
    {
    "id": ""
    }
  ]
}
```

보고서와 데이터셋 ID가 있는 객체를 위해 이전 단계에서 데이터셋과 보고서 ID를 복사하여 여기에 사용하세요. 여러 개의 ID를 전달하고, 그런 다음 동일한 임베드 토큰을 사용하여 UI에서 모든 보고서에 액세스할 수 있습니다.



API로부터 토큰 및 토큰 ID를 받게 됩니다.

이제 필요한 모든 데이터를 가지고 있으니, 다음을 API 응답으로 제공해주세요:

- 임베드 URL: 단계 2에서 받은 URL
- ID: 보고서 ID, 단계 2에서 받은 것
- 임베드 토큰: 단계 3에서 받은 토큰

만세, 보고서가 성공적으로 UI에 임베드되었습니다 🙂.



# Power BI 보고서에 필터를 추가하는 방법

Power BI 보고서에 필터를 추가하고 싶다면 세 가지 방법으로 할 수 있어요:

## 1: 쿼리 매개변수 사용

임베드 URL을 설정할 때 아래와 같이 필터를 전달할 수 있어요:



```js
embedUrl: `${response.value.embedUrl}&filter=${table_name}/${table_coloumn} eq ${filter_value}`,
```

내장 URL 뒤에 &filter=을 추가하세요. 걸러내고 싶은 테이블 이름, 그 다음 테이블 열 이름, 연산자, 마지막으로 필터 값까지 전달하세요.

and연산자를 사용하여 여러 필터를 전달할 수도 있습니다:

```js
&filter=State/State eq 'MH' and Customer/Age in (30,35)
```



여러분의 사용에 따라 아래 표에 표시된 것처럼 여러 개의 필터 연산자를 사용할 수 있습니다:

![표](/assets/img/2024-05-12-HowtoEmbedAPowerBIReportinReact_2.png)

## 2: 설정 객체에 필터 전달

아래에 표시된대로 설정 객체에 필터를 전달할 수 있습니다.



위는 주요 필터 예제이지만, 다른 종류의 필터도 있습니다. 공식 문서 사이트에서 확인할 수 있습니다.

## 3: 내장 함수나 메소드 사용하기

아래 코드에 getEmbeddedComponent와 eventHandlers를 추가하세요:



```js
<PowerBIEmbed
  embedConfig = {reportConfig}
  cssClassName = 'power-bi-report-height'
  eventHandlers={eventHandlersMap}
  getEmbeddedComponent={(embedObject) => {
    window.report = embedObject;
  }
/>
```

getEmbeddedComponent 함수를 통해 보고서 개체에 액세스할 수 있으며, 이를 통해 필터를 추가, 제거 또는 업데이트할 수 있습니다.

eventHandlers를 사용하여 Power BI 보고서의 다양한 이벤트에 액세스할 수 있습니다.

허용된 이벤트는 다음과 같습니다:-




```js
[
  "로드됨",
  "저장됨",
  "렌더링됨",
  "saveAsTriggered",
  "에러",
  "데이터 선택됨",
  "버튼 클릭됨",
  "정보",
  "필터 적용됨",
  "페이지 변경됨",
  "명령 트리거됨",
  "스와이프 시작",
  "스와이프 끝",
  "북마크 적용됨",
  "데이터 하이퍼링크 클릭됨",
  "비주얼 렌더링됨",
  "비주얼 클릭됨",
  "선택 변경됨",
  "렌더링 시작됨",
  "흐림"
]
```

아래 코드 스니펫에 표시된대로 이벤트 핸들러를 사용할 수 있습니다:

```js
const eventHandlersMap = new Map([
    [
      '로드됨',
      function () {
          console.log('보고서가 로드되었습니다', window.report);
      }
    ],
    [
      '렌더링됨',
      function () {
        console.log('보고서가 렌더링되었습니다', window.report);
      }
    ],
    [
      '에러',
      function (event: any) {
        if (event) {
          console.error(event.detail);
        }
      }
    ]
  ]);
```

고객님의 시나리오와 사용 방법에 따라 다양한 이벤트 핸들러를 사용할 수 있습니다. 이 예시에서는 로드된 이벤트만 사용할 것입니다.



지금, 보고서에 현재 적용된 모든 필터를 얻고 싶다면 getFilters() 메소드를 사용하세요:

```js
[
  '로드된',
    async function () {
     const filters = await window.report.getFilters();
        console.log('보고서가 로드되었습니다', window.report, filters );
    }
],
```

콘솔에서 보고서에 적용된 모든 필터의 객체 배열을 얻을 수 있습니다:

```js
[
    {
        "$schema": "http://powerbi.com/product/schema#basic",
        "target": {
            "table": 테이블_이름,
            "column": 테이블_열
        },
        "filterType": 1,
        "displaySettings": {
            "isLockedInViewMode": true
        },
        "operator": "In",
        "values": [
            필터_값
        ],
        "requireSingleSelection": false
    }
]
```



보고서에 적용된 모든 필터를 제거하거나 새 필터를 추가하는 데 updateFilters() 메서드를 사용할 수 있어요:

```js
[
  'loaded',
      async function () {
        await  window.report.updateFilters(models.FiltersOperations.RemoveAll);
        console.log('Report has loaded', window.report);
      }
],
```

```js
[
      'loaded',
      async function () {
        const filtersArray = [
          {
            $schema: 'http://powerbi.com/product/schema#basic',
            target: {
              Table: table_name,
              Column: table_column
            },
            operator: 'In',
            values: [ filter_value ],
            filterType: models.FilterType.Basic,
            requireSingleSelection: true
          }
        ];
        await window.report.updateFilters(
          models.FiltersOperations.Add,
          filtersArray
        );
        console.log('Report has loaded', window.report);
      }
],
```

그러니 이제 Power BI 임베드 보고서를 위해 애플리케이션에 필터를 추가, 업데이트, 제거하는 세 가지 서로 다른 방법을 알게 되었어요.



# 결론

이 글에서 React 애플리케이션에 Power BI 보고서를 임베드하는 절차를 설명했습니다.

웹 및 API 측면에 변경을 마친 후 애플리케이션을 실행하고 보고서를 확인해보세요.

질문이 있거나 인사이트를 공유하고 싶다면 언제든지 댓글 섹션에 남겨주세요. 감사합니다!