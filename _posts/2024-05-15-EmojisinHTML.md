---
title: " HTML에서 이모지 사용하기"
description: ""
coverImage: "/assets/img/2024-05-15-EmojisinHTML_0.png"
date: 2024-05-15 03:03
ogImage: 
  url: /assets/img/2024-05-15-EmojisinHTML_0.png
tag: Tech
originalTitle: "😍 Emojis in HTML"
link: "https://medium.com/read-write-code/emojis-in-html-15ede74f0d48"
isUpdated: true
---




## HTML 파일에 10진수 또는 16진수 코드로 이모지 쉽게 추가하기

<img src="/assets/img/2024-05-15-EmojisinHTML_0.png" />

이모지가 표준화되고 유니코드 협회에서 승인되었다는 사실을 알고 계셨나요? 기술 회사들은 유니코드 할당을 받기 위해 조직에서 표준화된 이모지를 승인받아야 합니다.

이러한 승인된 이모지는 HTML 파일에 이모지의 10진수 또는 16진수 코드를 추가하여 웹 페이지에서 쉽게 사용할 수 있습니다.



HTML Decimal Format: &#…;

HTML Hexadecimal Format: &#x…;

예를 들어, 이 두 줄의 코드는 웹 페이지에서 동일한 이모지를 보여줍니다.

참고: 각 코드 형식의 끝에 세미콜론이 필요합니다.




![이모티콘 예시 1](/assets/img/2024-05-15-EmojisinHTML_1.png)

## 시도해 볼 일부 이모티콘:

![이모티콘 예시 2](/assets/img/2024-05-15-EmojisinHTML_2.png)

## 하지만 이것들은 스크린 리더를 사용하는 웹사이트 방문자에게 접근할 수 있을까요?




네! 현대의 웹 브라우저들은 각 이모지를 읽어내려고 할 것입니다. 그러나 오직 이모지만으로 정보를 전달하는 데 완전히 의존하는 것은 좋은 실천 방법이 아닙니다. 예를 들어, ⚠️만 사용하지 말고 "⚠️ 중요: 이모지를 콘텍스트에 맞게 사용해보세요."와 같은 텍스트를 추가해보세요.

아래는 장치/브라우저가 "`p`&#128525;`/p`" 를 읽어내는 몇 가지 방법입니다.

![이모지 예시](/assets/img/2024-05-15-EmojisinHTML_3.png)

HTML에서 시도해볼 다양한 이모지를 찾고 싶으신가요? Unicode Consortium의 온라인 목록을 사용해보세요. 다만 페이지 로딩 시간이 다소 소요될 수 있으니 주의하세요. Emojipedia는 이모지의 16진 코드를 찾는 데 훌륭한 웹사이트입니다 — 각 이모지에 대한 기술 정보 탭 아래에서 유니코드가 나와요.



👉 참고: 이모지에 대한 유니코드 (U+1F640)가 있으면 "U+" 부분을 제거하고 HTML 16진수 형식으로 사용하십시오 (&#x1F640).

여기에서 CodeHS 코드 편집기에서 이모지 사용에 대해 더 알아보세요! ⭐