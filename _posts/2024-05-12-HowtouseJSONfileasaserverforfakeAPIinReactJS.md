---
title: "리액트 JS에서 가짜 API 서버로 JSON 파일을 사용하는 방법"
description: ""
coverImage: "/assets/img/2024-05-12-HowtouseJSONfileasaserverforfakeAPIinReactJS_0.png"
date: 2024-05-12 21:00
ogImage: 
  url: /assets/img/2024-05-12-HowtouseJSONfileasaserverforfakeAPIinReactJS_0.png
tag: Tech
originalTitle: "How to use JSON file as a server for fake API in React JS"
link: "https://medium.com/how-to-react/how-to-use-json-file-as-a-server-for-fake-api-in-react-js-6b72606023b7"
isUpdated: true
---




![이미지](/assets/img/2024-05-12-HowtouseJSONfileasaserverforfakeAPIinReactJS_0.png)

이 튜토리얼에서는 React JS에서 가짜 API를 위한 서버로 JSON 파일을 어떻게 사용하는지 배워보겠습니다. 실제 API에 의존하지 않고 애플리케이션을 테스트하고자 할 때 유용합니다. JSON 파일을 가짜 API로 사용함으로써 API 응답을 쉽게 모의하고 실제 API 호출을 하지 않고 다양한 시나리오를 테스트할 수 있습니다.

# 요구 사항

- json-server



단계 1: JSON 파일 만들기
리액트 프로젝트에서 새로운 JSON 파일을 만들고 "db.json"으로 이름 짓기. 이 파일에서 우리는 모킹하고 싶은 API 응답을 정의할 거에요. 아래는 예시입니다:

단계 2: json-server 설치하기
JSON 파일로부터 REST API를 시뮬레이트하기 위해 json-server 패키지를 사용할 거에요. 설치하려면 터미널에서 다음 명령어를 실행하세요:

```js
npm install -g json-server
```

단계 3: JSON 서버 시작하기
JSON 서버를 시작하려면 터미널에서 다음 명령어를 실행하고 JSON 파일의 경로를 지정하세요:



```json
json-server --watch db.json --port 3030
```

참고: React는 서버를 실행하는 데 사용되는 3000 포트를 사용하므로 포트를 수정하기 위해 —port 3030을 사용했습니다.

단계 4: API 테스트
이제 브라우저에서 http://localhost:3030/posts를 열면 데이터를 볼 수 있습니다.

![이미지](/assets/img/2024-05-12-HowtouseJSONfileasaserverforfakeAPIinReactJS_1.png)



5단계: React에서 API 요청 만들기
React 컴포넌트에서 fetch API 또는 다른 HTTP 클라이언트 라이브러리를 사용하여 JSON 서버에 API 요청을 만듭니다. 다음은 fetch를 사용한 예시입니다:

우리는 가짜 API 요청을 성공적으로 만들고 해당 요청을 통해 React 컴포넌트로 데이터를 가져왔습니다. GET 요청뿐만 아니라 POST 요청을 사용하여 데이터를 JSON 파일에 삽입하고, PUT 요청을 사용하여 데이터를 업데이트하고, DELETE 요청을 사용하여 JSON 데이터를 삭제할 수 있습니다. 이를 Postman에서 확인해 봅시다.

POST 요청

JSON 파일에 새로운 게시물을 추가하려면 POST 요청을 만들고 본문을 사용하여 JSON 데이터를 추가해야 합니다. 다음은 예시입니다:



![이미지](/assets/img/2024-05-12-HowtouseJSONfileasaserverforfakeAPIinReactJS_2.png)

PUT 요청

만약 데이터를 업데이트해야 한다면 PUT 요청을 사용하여 업데이트할 수 있습니다. 다음은 예시입니다:

![이미지](/assets/img/2024-05-12-HowtouseJSONfileasaserverforfakeAPIinReactJS_3.png)



삭제 요청

JSON 파일에서 데이터를 삭제하려면 DELETE 요청을 사용할 수 있습니다. 예시는 다음과 같습니다:

![예시 이미지](/assets/img/2024-05-12-HowtouseJSONfileasaserverforfakeAPIinReactJS_4.png)

여기까지입니다! React JS에서 가짜 API로 JSON 파일을 사용함으로써 실제 API에 의존하지 않고 응용 프로그램을 쉽게 테스트할 수 있습니다. 이는 테스트 목적으로 빠르고 쉬운 솔루션이며, 실제 API 호출을 하지 않고도 다양한 API 응답을 모방하고 다양한 시나리오를 테스트할 수 있습니다.



문의 사항이 있으시면 LinkedIn을 통해 연락 주세요.

오늘은 여기까지입니다. 아래에서 GitHub 저장소를 찾을 수 있습니다.