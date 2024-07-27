---
title: "Jupyter 노트북에 현대적 JavaScript 가져오기"
description: ""
coverImage: "/assets/img/2024-05-14-BringingModernJavaScripttotheJupyterNotebook_0.png"
date: 2024-05-14 16:02
ogImage: 
  url: /assets/img/2024-05-14-BringingModernJavaScripttotheJupyterNotebook_0.png
tag: Tech
originalTitle: "Bringing Modern JavaScript to the Jupyter Notebook"
link: "https://medium.com/jupyter-blog/bringing-modern-javascript-to-the-jupyter-notebook-fc998095081e"
---


## Deno 커널은 주피터를 위한 가장 최신 런타임이에요

정말 예상치 못한 소식이죠.

Deno는 TypeScript, JavaScript, npm 및 ES 모듈을 갖추고 있어 주피터에 쉽게 설치할 수 있는 커널을 제공해요.

지금 Deno를 시작하는 더 좋은 때는 없어요. Deno를 설치한 후, deno 주피터 커널 설치를 실행하세요:  



```js
deno jupyter --unstable --install
```

![image](https://miro.medium.com/v2/resize:fit:1400/1*_KUkFmq1lO3H-tx4XJPNew.gif)

Deno는 fetch와 같은 웹 표준을 기본적으로 지원하므로 데이터 로딩이 간단하고 쉽습니다.

![image](/assets/img/2024-05-14-BringingModernJavaScripttotheJupyterNotebook_0.png)




이것은 빠르고 안전한 런타임일뿐만 아니라 즐거운 시간을 보낼 수 있습니다. 타이밍도 훌륭합니다 — 데이터프레임은 줄리아, 파이썬, R 및 러스트만의 전유물이 아닙니다. Polars는 JavaScript용 데이터프레임을 제공합니다.

![이미지1](/assets/img/2024-05-14-BringingModernJavaScripttotheJupyterNotebook_1.png)

놀라운 점은 얼마나 쉽게 D3를 데이터프레임과 함께 사용할 수 있는지입니다.

![이미지2](/assets/img/2024-05-14-BringingModernJavaScripttotheJupyterNotebook_2.png)



우리는 캔버스에 직접 플롯을 그릴 수 있어요.

![plot1](/assets/img/2024-05-14-BringingModernJavaScripttotheJupyterNotebook_3.png)

또한 SVG를 출력하는 어떤 라이브러리도 사용할 수 있지요.

![plot2](/assets/img/2024-05-14-BringingModernJavaScripttotheJupyterNotebook_4.png)



이것은 다양한 JavaScript 개발자와 데이터 전문가들이 노트북에서 문서 작성을 할 수 있도록 함을 의미합니다.

JavaScript/TypeScript로 데이터를 탐색하고 시각화하려면 Deno를 확인하고 Jupyter 시작 가이드 문서를 살펴보세요.

Rust를 알고 있다면 Deno에서 해킹해보세요. Rust를 몰라도, 나와 같은 경우라도 Deno에서 해킹해보세요. 배울 수 있습니다. Deno 팀은 TypeScript, Jupyter 및 표준의 힘을 깊이 믿는 친절한 사람들로 구성되어 있습니다.

또한 버그를 보고하고, 노트북을 작성하고, Deno 커널을 다른 사람들과 공유함으로써 기여할 수도 있습니다.




![Bringing Modern JavaScript to the Jupyter Notebook](/assets/img/2024-05-14-BringingModernJavaScripttotheJupyterNotebook_5.png)

해피 노트북!
