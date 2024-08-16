---
title: "자바스크립트 앱이 정상적으로 작동할 때 리액트 네이티브 문제를 해결하는 방법"
description: ""
coverImage: "/assets/img/2024-05-12-AWorkaroundforYourReactNativeIssuesWhentheStandardBrowserReactAppWorks_0.png"
date: 2024-05-12 19:29
ogImage: 
  url: /assets/img/2024-05-12-AWorkaroundforYourReactNativeIssuesWhentheStandardBrowserReactAppWorks_0.png
tag: Tech
originalTitle: "A Workaround for Your React Native Issues When the Standard (Browser) React App Works"
link: "https://medium.com/@whoz_/a-workaround-for-your-react-native-issues-when-the-standard-browser-react-app-works-7ee815fb27bb"
isUpdated: true
---




지난번에 React Native 앱을 작업한 건 이미 3년 전이에요. 그리고 이에 대해 글을 쓰고 싶은 마음은 오랫동안 가지고 있었는데 항상 잊어버렸었어요. 그 때는 블록체인 NFT 프로젝트도 함께 진행했었는데, 그 이야기는 다른 날에 별도로 다룰 거예요 (이 "팁" 글 말고 흥미로운 이야기가 될 거라고 약속해요). 비슷한 문제에 직면하고 있다면 임시 방편을 이용할 아이디어를 제공하려고 해요.

# 상황

이전 프로젝트는 '비전을 가진' 창업자들이 이끄는 스타트업 회사에 관련된 건데, 안타깝게도 구체적인 계획이 부족했고 성공적인 자금 마련을 할 수 없었기 때문에 제 봉급을 지급하지 못했어요 🤷‍♂️. 저는 랜딩 페이지와 모바일 앱을 동시에 만드는 것을 담당한 유일한 개발자였어요.

앱은 3D 아바타를 특징으로 하는 모바일 커뮤니케이션(채팅) 플랫폼이었고, 사용자들은 채팅 앱 내에서 사용할 NFT를 구매할 수 있었어요. React에 익숙했기 때문에 3D 렌더링 라이브러리를 조사하고 React로 작동하는 PoC를 몇 시간 동안 개발한 후, React Native를 사용하여 앱을 만들기로 결정했어요. "결국 React인데; 얼마나 다를까?" 라고 생각했어요.



# 문제

“채팅 앱"을 마치고 기분 좋았는데, 팔을 걷어내고 내 헤비 메탈 플레이리스트에서 고함 소리를 들으며 흥을 냈습니다. 간단한 3D 모델들은 잘 작동했지만, 이후 이를 렌더링할 수 없는 문제가 발생했어요. 이는 애니메이션이 포함된 3D .FBX 파일인 이진 파일을 렌더링할 수 없었던 것이었습니다. 찾아봐도 (그 때 chatGPT는 그리 도움이 되지 못했습니다) React Native 자체가 배열 버퍼를 지원하지 않는다는 것을 알 수 없었죠. 현재 해결되었는지는 확실하지 않습니다.

시간이 없어서 일반 React 앱에서 로드해보았는데, 잘 작동했어요. 핸드폰으로 웹 앱을 시작해봤을 때도 문제없이 작동했습니다. 데모 날이 다가오고 있어서 그 주에 문제를 해결해야 했어요.

그래서 React Native 기술 스택을 사용하는 시니어 모바일 개발자인 전 동료에게 도움을 요청했지만, 안타깝게도 그도 문제를 해결하지 못했습니다.



내가 가진 제한된 시간과 기술로 React Native 코어에 깊게 파보는 일은 할 수 없었어요. 그 당시에는 절망에 빠져 있었습니다.

# “가끔 어둠이 너에게 빛을 비춰줄 수도 있어" — Disturbed

어둔 시기에 멘토가 제안했어요: “React Native 앱에 웹 앱을 넣어본다면 어떨까?"

![이미지](/assets/img/2024-05-12-AWorkaroundforYourReactNativeIssuesWhentheStandardBrowserReactAppWorks_0.png)



그래서, 나는 React 앱을 Vercel에 호스팅하고 React Native 앱으로 WebView로로드하는 것을 시도했고 완벽하게 작동했어요.

iframe과 상호 작용하기 위해 수백만 개의 블로그가 안내를 제공하고 있어, 또는 그냥 chatGPT에게 물어보면 돼요, 그래서 여기에는 넣을게 없어요.

문제는 해결됐지만, 문제는 전체 블록체인 및 NFT 트렌드가 붕괴되었을 때 피칭이 잘못된 시간에 있었고, 정말 필요한 때에 돈을 사칭 당했어요—내 결혼식을 위해서!!!

고객 중심적 사고 방식을 가지고 있다면(https://medium.com/@whoz_/beyond-code-dont-just-be-a-coder-a9bad8007dca), 다양한 경우에이 해결책이 도움이 될 수 있어요. 시장을 빨리 점령하기 위해 제대로 작동하도록 시간을 낭비하지 않아도 돼요. 시장에 올 때 좋은 앱을 가지고 있다해도, 고객이 정말 필요하지 않을 때나 피드백에 따라 다시 작업하기에 너무 늦었을 때 그 점이 어떤 의미가 있겠어요?



tldr; 만약 React Native 앱에 문제가 있지만 React 앱은 핸드폰 브라우저에서 잘 작동한다면 WebView을 통해 React Native에 임베드해보세요.