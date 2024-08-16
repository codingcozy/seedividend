---
title: "React 앱을 AWS에서 무료로 호스팅하는 방법 2부"
description: ""
coverImage: "/assets/img/2024-06-22-HowtohostReactapponAWSforfreePart2_0.png"
date: 2024-06-22 14:27
ogImage: 
  url: /assets/img/2024-06-22-HowtohostReactapponAWSforfreePart2_0.png
tag: Tech
originalTitle: "How to host React app on AWS for free. Part 2"
link: "https://medium.com/@maxim.kolomiiets/how-to-host-react-app-on-aws-for-free-part-2-35d936b3c3d6"
isUpdated: true
---




이 기사는 React 앱을 AWS에 무료로 호스팅하는 방법 시리즈의 연재물입니다. Part 1

Part 1에서 우리가 이룬 것을 간단히 요약해 보면, 우리는 Ant Design 라이브러리를 사용하는 React 앱을 만들었고, 현재 시간으로 설정된 타임 피커를 보여주는 페이지를 만들었습니다. 이를 공개적으로 접근할 수 없는 S3 버킷에 배포했습니다. 그리고 HTTPS 액세스가 가능한 CloudFront를 구성하여 이를 S3 버킷과 연결했습니다.

이 장에서는 백엔드 서비스 Lambda를 추가하고 API Gateway 서비스로 앱을 개선할 것입니다. 

![이미지](/assets/img/2024-06-22-HowtohostReactapponAWSforfreePart2_0.png)

<div class="content-ad"></div>

위의 다이어그램에서 보시다시피 S3 버킷이 람다와 통신하지 않습니다. 실제로 사용자가 브라우저에서 리액트 앱에 접속하면 앱(HTML, CSS, JS, 이미지 등)이 다운로드되어 사용자의 PC에서 브라우저 내에서 실행됩니다. 앱이 서버에서 데이터를 가져와야 할 때(우리의 경우 람다와 통신해야 할 때) — API 엔드포인트로 HTTP 요청을 보냅니다.

그래서 먼저, 람다 함수를 만들어 봅시다 —

![Lambda function](/assets/img/2024-06-22-HowtohostReactapponAWSforfreePart2_1.png)

기본적으로 다음과 같이 보일 것입니다:

<div class="content-ad"></div>


![How to host React app on AWS for free - Part 2](/assets/img/2024-06-22-HowtohostReactapponAWSforfreePart2_2.png)

람다를 공개적으로 호출하기 위해서는 기능적인 URL을 생성해야 합니다.

![How to host React app on AWS for free - Part 2](/assets/img/2024-06-22-HowtohostReactapponAWSforfreePart2_3.png)

기능적 URL은 API 게이트웨이에서 쉽게 사용할 수 있는 인증, 요청 변환, 모니터링, 쓸 수 있는 등 여러 단점이 있습니다. 그러나 직접 람다 함수 URL을 사용하는 경우에는 이러한 기능을 수동으로 처리해야 합니다. 우리 데모 프로젝트와 같이 작은 프로젝트의 경우 빠르고 간단한 해결책입니다.


<div class="content-ad"></div>

URL이 생성되면 브라우저에서 람다를 호출할 수 있어요:

![Lambda Code](/assets/img/2024-06-22-HowtohostReactapponAWSforfreePart2_4.png)

람다 코드를 변경해서 현재 타임스탬프를 반환해봐요:

```js
export const handler = async (event) => {
    // 현재 날짜와 시간 가져오기
    const currentDate = new Date();
    
    // 날짜를 ISO 문자열로 포맷팅
    const currentISODate = currentDate.toISOString();

    // 현재 시간을 JSON 응답으로 반환
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentTime: currentISODate }),
    };
};
```

<div class="content-ad"></div>


<img src="/assets/img/2024-06-22-HowtohostReactapponAWSforfreePart2_5.png" />

그리고 우리의 리액트 앱을 채택하여 함수 URL로 요청을 보내고 응답에서 타임스탬프를 사용합니다:

```js
import React, { useEffect, useState } from 'react';
import { TimePicker } from 'antd';
import moment from 'moment';

const App = () => {
  const [defaultValue, setDefaultValue] = useState();

  useEffect(() => {
    fetch(`https://dbzyybb3ij4lsr2bdd3g6i5i4e0ggpyc.lambda-url.us-east-2.on.aws/`)
    .then(response => response.json())
    .then(data => {
      const currentTime = moment(data.currentTime);
      setDefaultValue(currentTime)
    });
  }, [])

  return (
    <div>
      <TimePicker value={defaultValue} />
    </div>
  );
};

export default App;
```

<img src="/assets/img/2024-06-22-HowtohostReactapponAWSforfreePart2_6.png" />


<div class="content-ad"></div>

멋지네요. 페이지를 열면 HTTP 요청이 전송되어 람다 함수를 트리거하고 응답으로 현재 타임스탬프를 받게 되어 UI에 업데이트될 겁니다.

이제 프로젝트를 개선하고 API Gateway를 추가해봅시다. 이렇게 하면 리액트 앱이 람다 함수 URL을 통해 직접 통신하는 대신 API Gateway를 통해 통신하게 됩니다.

![이미지](/assets/img/2024-06-22-HowtohostReactapponAWSforfreePart2_7.png)

HTTP API를 생성하세요. 기본 설정으로 유지하세요. 대부분의 경우 REST API 대신 HTTP API를 선택해야 합니다. 이유는 더 비용 효율적이고 가벼우며, 서버리스용으로 설계되어 성능이 우수하며 지연 시간이 짧기 때문입니다.

<div class="content-ad"></div>

Routes 아래에 새로운 라우트를 만들어주세요.

```js
GET /timestamp
```

![이미지](/assets/img/2024-06-22-HowtohostReactapponAWSforfreePart2_8.png)

![이미지](/assets/img/2024-06-22-HowtohostReactapponAWSforfreePart2_9.png)

<div class="content-ad"></div>


![이미지](/assets/img/2024-06-22-HowtohostReactapponAWSforfreePart2_10.png)

CORS 설정을 업데이트하세요:

![이미지](/assets/img/2024-06-22-HowtohostReactapponAWSforfreePart2_11.png)

Stages에서 API의 URL을 찾으세요:


<div class="content-ad"></div>

"다음 표를 Markdown 형식으로 변경하십시오.

그리고 예상대로 작동하는지 확인하십시오:

<img src="/assets/img/2024-06-22-HowtohostReactapponAWSforfreePart2_13.png" />

React 앱을 새 API에서 가져오도록 업데이트하고 여기까지입니다. S3 버킷에 배포된 프론트엔드와 람다에 배포된 백엔드가 완전히 서버리스인 웹 앱이 준비되었습니다."

<div class="content-ad"></div>

다음 장에서는 관계형 데이터베이스를 소개하고 인증을 추가할 예정입니다.