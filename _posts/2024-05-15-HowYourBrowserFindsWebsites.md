---
title: "웹 브라우저가 웹사이트를 찾는 방법"
description: ""
coverImage: "/assets/img/2024-05-15-HowYourBrowserFindsWebsites_0.png"
date: 2024-05-15 10:57
ogImage: 
  url: /assets/img/2024-05-15-HowYourBrowserFindsWebsites_0.png
tag: Tech
originalTitle: "How Your Browser Finds Websites"
link: "https://medium.com/gitconnected/how-your-browser-finds-websites-79535e1761c5"
---


![이미지](/assets/img/2024-05-15-HowYourBrowserFindsWebsites_0.png)

## 웹의 작동 방식: 뒷면을 엿보는 중

웹 사이트 주소를 입력하고 Enter 키를 누르면 무슨 일이 벌어지는지 알아봅시다. 화면에 웹 사이트 구성 요소가 표시되지만, 어떻게 그려지는 걸까요?

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*pQhQk0K7WbJRLeA5ixEA9Q.gif)



## 1. 웹사이트 찾기

웹사이트에 접속하려면 일반적으로 브라우저에 그 이름을 입력합니다. 하지만 컴퓨터는 그 이름을 우리가 이해하는 방식으로 인식하지 않습니다.

대신, 인터넷 상의 모든 장치에 대한 고유한 식별자 역할을 하는 숫자 문자열인 IP 주소를 사용합니다. 따라서 우리가 웹사이트를 검색할 때 컴퓨터는 해당 웹사이트의 IP 주소를 찾아야 합니다.

## 2. 귀하의 ISP: 인터넷 게이트웨이



웹 브라우저에 "google.com"을 입력하면 당신의 기기가 웹사이트에 직접 연결되지는 않습니다. 대신, 인터넷 서비스 제공업체(ISP)에게 웹사이트의 IP 주소를 요청하는 요청을 보냅니다.

![image](/assets/img/2024-05-15-HowYourBrowserFindsWebsites_1.png)

ISP는 당신에게 인터넷 접속을 제공하는 회사로, 국가마다 다양합니다.

## 3. DNS: 인터넷의 전화번호부



ISP도 "google.com"의 위치를 모르고 있어요. 이를 알아보기 위해 인터넷을 위한 거대한 전화번호부 역할을 하는 도메인 이름 시스템(DNS)에 연락합니다.

![How Your Browser Finds Websites](/assets/img/2024-05-15-HowYourBrowserFindsWebsites_2.png)

DNS는 모든 웹사이트의 IP 주소를 해당 도메인 이름과 함께 저장합니다. 따라서 ISP가 google.com에 대한 요청을 받으면 DNS에 연락하여 해당 도메인에 연결된 IP 주소를 찾아냅니다.

그럼 DNS가 IP 주소로 응답하고, ISP는 해당 IP 주소를 당신의 브라우저로 전송해줍니다.



Markdown 형식으로 바꿔보세요.

![Connecting to the Website](/assets/img/2024-05-15-HowYourBrowserFindsWebsites_3.png)

## 4. Connecting to the Website

웹사이트의 IP 주소를 가져오면 브라우저가 HTTP 요청을 준비합니다. 이 요청은 케이블과 라우터로 구성된 네트워크를 통해 목적지에 도달합니다.

![Traveling through the Network](/assets/img/2024-05-15-HowYourBrowserFindsWebsites_4.png)



요청을 받은 서버는 ‘google.com’을 구성하는 모든 파일을 저장하는 창고와 같이 작동합니다. 이 서버는 ‘google.com’을 구성하는 HTML, CSS 및 JavaScript 파일을 찾아서 브라우저로 다시 전송합니다.

![How Your Browser Finds Websites](/assets/img/2024-05-15-HowYourBrowserFindsWebsites_5.png)

## 5. Rendering the Magic

이제 브라우저가 이러한 파일을 보유하고 있으면, 해석을 시작합니다. HTML을 읽고 구조를 이해하며, CSS 스타일을 적용하고 JavaScript를 실행한 다음... 그 결과로 웹페이지가 화면에 표시됩니다.




![How Your Browser Finds Websites](/assets/img/2024-05-15-HowYourBrowserFindsWebsites_6.png)

After this point, there might be many other requests back and forth between your browser and Google servers for other HTML, CSS, and JS files. However, you don’t need to make another request to your ISP for these, as they go directly to Google’s servers. Additionally, your browser has likely cached the IP address of google.com, so it won’t need to make an unnecessary request to your ISP next time.

## Experiment: See It in Action

Want proof? Try this:




- 브라우저의 개발자 도구를 열어주세요 (F12를 누르거나 마우스 오른쪽 버튼을 클릭하여 "Inspect"를 선택합니다).
- "Network" 탭으로 이동합니다.
- "google.com"을 입력하고 Enter를 누릅니다.
- 첫 번째 요청을 찾아 "Remote Address"를 확인합니다 - 그곳에 구글의 IP 주소가 있어요!
- IP 주소를 복사하여 새 탭에 붙여넣고 Enter를 누릅니다.

![화면이미지](/assets/img/2024-05-15-HowYourBrowserFindsWebsites_7.png)

이렇게 하면 ISP와 DNS를 거치지 않고도 구글에 접속할 수 있어요.

## 요약: 전체 그림



그래서, 웹 사이트를 방문할 때:

- 도메인 이름 해석: 귀하의 ISP는 웹 사이트의 IP 주소를 찾기 위해 DNS를 사용합니다.
- HTTP 요청: 귀하의 브라우저가 서버에 웹 사이트를 요청합니다.
- 서버 응답: 서버가 HTML, CSS 및 JavaScript 파일을 보냅니다.
- 렌더링: 귀하의 브라우저가 웹 사이트를 조립하고 표시합니다.

웹 개발 기본에 대해 더 알아보고 싶다면, 무료 웹 개발자 커뮤니티에 가입하고 모든 강좌에 액세스하세요.