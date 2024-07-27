---
title: "리액트 JS에서 Font Awesome 아이콘 사용하기"
description: ""
coverImage: "/assets/img/2024-05-14-conesdoFontAwesomenoReactJS_0.png"
date: 2024-05-14 11:33
ogImage: 
  url: /assets/img/2024-05-14-conesdoFontAwesomenoReactJS_0.png
tag: Tech
originalTitle: "Ícones do Font Awesome no React JS"
link: "https://medium.com/@juliaa.brito22/usar-%C3%ADcones-do-font-awesome-no-react-js-77125da20dad"
---


React JS에서 Font Awesome 아이콘을 사용하는 방법:

![Font Awesome](/assets/img/2024-05-14-conesdoFontAwesomenoReactJS_0.png)

- SVG Core 설치하기 (아이콘이 작동하는 유틸리티가 포함 된 패키지):
npm i — save @fortawesome/fontawesome-svg-core
- 사용할 키트 패키지 설치. 참고: Font Awesome의 무료 패키지는 다음과 같습니다:
npm i — save @fortawesome/free-solid-svg-icons
npm i — save @fortawesome/free-regular-svg-icons
npm i — save @fortawesome/free-brands-svg-icons
- Font Awesome 컴포넌트 설치하기:
npm i — save @fortawesome/react-fontawesome@latest

- Font Awesome 컴포넌트와 사용할 아이콘들을 import 하기:
import 'FontAwesomeIcon' from ‘@fortawesome/react-fontawesome’;
import 'icon1, icon2' from ‘@fortawesome/kit that contains the icon’;



예시:
import ' faHtml5, faCss3Alt ' from ‘@fortawesome/free-brands-svg-icons’;

- 프로젝트에 아이콘 삽입:
`FontAwesomeIcon icon=' 아이콘 ' /`

예시:
`FontAwesomeIcon icon='faHtml5' /`
`FontAwesomeIcon icon='faCss3Alt' /`

Font Awesome 문서: