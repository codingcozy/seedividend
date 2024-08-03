---
title: "HTML 리스트 종류와 사용 방법 완벽 가이드"
description: ""
coverImage: "/assets/img/2024-07-07-HTMLLists_0.png"
date: 2024-07-07 02:22
ogImage:
  url: /assets/img/2024-07-07-HTMLLists_0.png
tag: Tech
originalTitle: "HTML Lists"
link: "https://medium.com/@anushkas.ch/html-lists-6660bb666520"
---

HTML 목록은 정렬되거나 정렬되지 않은 형식의 일반 목록과 같습니다.

HTML에는 세 가지 유형의 목록이 있습니다:

- 정렬되지 않은 목록 또는 불릿 목록(ul)
- 정렬된 목록 또는 번호 목록(ol)
- 정의 목록 또는 설명 목록(dl)

정렬되지 않은 목록

<div class="content-ad"></div>

순서가 없는 목록은 간단한 글머리 기호 목록과 같아요.

![HTML Lists 0](/assets/img/2024-07-07-HTMLLists_0.png)

![HTML Lists 1](/assets/img/2024-07-07-HTMLLists_1.png)

"타입" 속성을 사용하여 글머리 기호의 모양을 변경할 수 있어요. 세 가지 값이 지원돼요:

<div class="content-ad"></div>

- 디스크- 기본 글머리 기호
- 정사각형
- 원

![이미지1](/assets/img/2024-07-07-HTMLLists_2.png)

![이미지2](/assets/img/2024-07-07-HTMLLists_3.png)

번호가 매겨진 목록

<div class="content-ad"></div>

정렬된 HTML 목록에서는 모든 항목이 기본적으로 숫자로 표시됩니다. 이것은 순서가 지정된 목록으로도 알려져 있습니다.

![Numbered List](/assets/img/2024-07-07-HTMLLists_4.png)

![Numbered List](/assets/img/2024-07-07-HTMLLists_5.png)

여기에서도 "type" 속성을 사용하여 숫자 대신 대문자나 로마 숫자를 사용할 수 있습니다.

<div class="content-ad"></div>

아래는 Markdown 형식으로 표를 제공합니다:

| type value | Description              |
| ---------- | ------------------------ |
| i          | Lowercase Roman numerals |
| I          | Uppercase Roman numerals |
| 1          | Numbers (Default)        |
| a          | Lowercase Alphabets      |
| A          | Uppercase Alphabets      |

아래는 이미지가 삽입된 HTML 코드입니다:

```html
<img src="/assets/img/2024-07-07-HTMLLists_6.png" />
<img src="/assets/img/2024-07-07-HTMLLists_7.png" />
```

<div class="content-ad"></div>

정의 목록

사전이나 백과사전과 같이 항목이 나열된 목록입니다.

정의 목록은 용어집이나 용어 목록을 제시하고 싶을 때 매우 적합합니다.

HTML 정의 목록에는 다음 세 가지 태그가 포함되어 있습니다:

<div class="content-ad"></div>

- `dl` tag은 목록의 시작을 정의합니다.
- `dt` tag는 용어를 정의합니다.
- `dd` tag는 용어 정의(설명)를 정의합니다.

![이미지1](/assets/img/2024-07-07-HTMLLists_8.png)

![이미지2](/assets/img/2024-07-07-HTMLLists_9.png)

오늘은 HTML 목록에 대해 배웠으니 제 학습 내용을 공유했습니다.
