---
title: "드래그 앤 드롭 Nextjs 프로젝트에 커스텀 아이템 추가하는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-07-AddingCustomDraggableItemsToDrag-And-DropNextJsProject_0.png"
date: 2024-07-07 12:59
ogImage:
  url: /assets/img/2024-07-07-AddingCustomDraggableItemsToDrag-And-DropNextJsProject_0.png
tag: Tech
originalTitle: "Adding Custom Draggable Items To Drag-And-Drop Next.Js Project"
link: "https://medium.com/@programming-advice/adding-custom-draggable-items-to-drag-and-drop-next-js-project-7087d494d19a"
---

## 이전 글의 연속입니다.

만약 여러분이 Medium 회원이 아니라면, 이 기사를 여기서 읽을 수 있습니다. [niftylittleme.com](https://niftylittleme.com)로 이동하세요.

참고: 이 기사는 Next.js 앱 라우터를 사용합니다.

이전 글을 읽거나 살펴본 적이 있다면, 여러분의 프로젝트에 드래그 앤 드롭 기능이 있을 것입니다. 그러나 만약 작은 상자가 아닌 다른 것들을 드래그 앤 드롭하고 싶다면 어떻게 할까요? 실제로 엘리먼트를 드래그 앤 드롭하고 싶다면요? 뭔가 더 멋진 것을 원한다면, 이 튜토리얼은 여러분을 위한 것입니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

하지만 시작하기 전에 여기서 정확히 무엇을 하는지 이해하려면 이전 기사를 읽어야 합니다. 그래서 그것을 확인하고 돌아와주세요. 여러분과 공유할 많은 코드가 있습니다. 그러니 함께 시작해봅시다!

![이미지](/TIL/assets/img/2024-07-07-AddingCustomDraggableItemsToDrag-And-DropNextJsProject_0.png)

# 이전 프로그래밍 팁에서

드래그 앤 드롭 라이브러리와 킷들이 별로 구리다 보니, 우리는 Next.js 프로젝트에서 드래그 앤 드롭 기능을 처음부터 만들어야 했습니다. 드래그 가능한 항목들을 생성하고, 줌 인/아웃 기능이 있는 그리드 드롭 존을 만들었으며, 드래그 가능한 항목과 듭 존을 화면에 표시했습니다.
