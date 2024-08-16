---
title: "Nextjs와 Contentful을 사용하여 콘텐츠 미리보기 모드용 배너 디자인하기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Designing a Banner for Content Preview Mode with Nextjs and Contentful"
link: "https://medium.com/@micheburrito/designing-a-banner-for-content-preview-mode-with-next-js-and-contentful-6158f8f568f7"
isUpdated: true
---





안녕하세요!

저는 cLabs의 웹 엔지니어입니다. 현재 작업 중인 프로젝트 중 하나는 Contentful을 사용해 웹사이트의 콘텐츠를 편집하는 사용자들이 원하는 새로운 콘텐츠로 실제 사이트에서 미리보기를 할 수 있는 콘텐츠 미리보기 모드를 추가하는 것입니다.

여기와 같은 여러 훌륭한 문서들이 있어서 매우 쉽게 따라 할 수 있었습니다: [이 링크](https://nextjs.org/docs/advanced-features/preview-mode).

제가 언급하고 싶은 단계는 사용자에게 미리보기 모드에 있다는 것을 알리는 무언가를 설계하는 것입니다.

<div class="content-ad"></div>

첫 번째 단계로 요구 사항에 대해 생각 중이었어요:

- 배너는 눈에 띄도록, 하지만 내용을 가리지 않아야 합니다.
- 배너는 기능적이어야 합니다. (확인!)
- 배너는 즐거움을 느끼게 해야 합니다. (어떨까요?)

첫 번째 단계로 화면 하단에 고정된 위치를 사용하여 배너를 만들었어요.

배너 색으로 노란색을 선택했는데, 형광펜 색상을 연상시켜 내용을 쉽게 발견할 수 있을 것 같았거든요.

<div class="content-ad"></div>

그러나 이것은 콘텐츠를 가리는데 쓰이는 것이었기 때문에 최고의 디자인된 배너는 아니었어요.

![이미지](/assets/img/DesigningaBannerforContentPreviewModewithNextjsandContentful_0.png)

그래서 다음 번 버전에서는 배너 크기를 변경하여 눈에 더 매력적으로 보이도록 해보고, 버튼 위치도 옮겨보려고 생각 중이에요. 버튼에 대한 사전 설정된 스타일이 있었지만, 모든 것이 정해진 것은 아니에요. 😉

![이미지](/assets/img/DesigningaBannerforContentPreviewModewithNextjsandContentful_1.png)

<div class="content-ad"></div>

어머! 이번에는 배너의 너비를 작게 만들기로 결정했어요. 지금은 배너보다는 메모지 느낌이 들어서, 늘어진 버전보다 훨씬 마음에 드네요. 여백도 더해주니 "포스트잇" 같은 느낌이 더 돋보이죠. 마지막으로, 버튼을 좀 고쳐야겠어요.

"미리보기 종료"로 복사본을 줄여봤는데, 훨씬 더 좋아 보인다고 생각해요.

![배너 디자인 이미지](/assets/img/DesigningaBannerforContentPreviewModewithNextjsandContentful_2.png)

다른 생각들을 좀 더 공유해드릴게요: 버튼을 다른 스타일로 편집하거나 좀 더 여백을 줄 수 있겠죠. 그렇지 않아도 그냥 괜찮아 보이긴 해요.

<div class="content-ad"></div>

지금까지 최종 제품입니다!

![DesigningaBannerforContentPreviewModewithNextjsandContentful_3](/assets/img/DesigningaBannerforContentPreviewModewithNextjsandContentful_3.png)

이제 사용자인 Content 팀과 같은 사람들이 Contentful에서 복사본을 편집할 때 링크를 클릭하면 이 배너가 들어간 웹사이트 버전과 새 콘텐츠가 표시됩니다!

지금까지입니다. 이 콘텐츠에 대해 읽는 것을 좋아하신다면 알려주세요!

<div class="content-ad"></div>


| 제목 1 | 제목 2 | 제목 3 |
| ------ | ------ | ------ |
| 내용 1 | 내용 2 | 내용 3 |
| 내용 4 | 내용 5 | 내용 6 |
