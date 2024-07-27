---
title: "다양한 색상 테마로 GitHub 프로필 README 꾸미는 방법"
description: ""
coverImage: "/ui-log-2/assets/img/2024-07-09-Fine-tuneGitHubProfileREADMEfordifferentcolorschemes_0.png"
date: 2024-07-09 08:58
ogImage:
  url: /assets/img/2024-07-09-Fine-tuneGitHubProfileREADMEfordifferentcolorschemes_0.png
tag: Tech
originalTitle: "Fine-tune GitHub Profile README for different color schemes"
link: "https://medium.com/@levchenkod/fine-tune-github-profile-readme-for-different-color-schemes-45c846d38b3b"
---

GitHub 프로필의 모양을 변경하고 싶은 이유는 다양합니다. 재미로, 들뜬 마음으로, 또는 저처럼 여러분의 링크와 스킬을 사용자 친화적인 방식으로 표현하고 싶어서일 수도 있죠.

그리하여 사용자들이 편리하게 이용할 수 있도록 하기 위해서는 GitHub가 지원하는 모든 색상 조합과 함께 프로필 이미지가 잘 보이고 읽기 쉬워야 합니다.

# 진행 방법

문서에 명시된 대로 Markdown에서 HTML을 사용할 수 있습니다:

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

그러나 스타일링이 제한적이며 전반적인 경험은 2010년대 이메일 디자인과 매우 유사합니다.

그러나 `picture/` 및 `source/` 태그의 미디어 속성을 사용하여 다양한 색상 테마를 지정할 수 있습니다.

```js
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="dark.png">
  <img alt="..." src="light.png">
</picture>
```

여기까지입니다. 추가로 모바일 친화적으로 만들 수 있고, 점진적 향상 기술을 사용할 수 있지만, 아쉽게도 픽셀 추적 기능은 없습니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

# 결과

![image0](/ui-log-2/assets/img/2024-07-09-Fine-tuneGitHubProfileREADMEfordifferentcolorschemes_0.png)

![image1](/ui-log-2/assets/img/2024-07-09-Fine-tuneGitHubProfileREADMEfordifferentcolorschemes_1.png)

GitHub은 각 색상 구성표에 대해 다양한 색조를 지원하나, 우리는 '밝은' 또는 '어두운'지만 감지할 수 있습니다. 따라서 이미지가 모든 색조와 잘 어울리도록 보장하려면 이미지를 "혼합"하고 충분한 대비를 확보하여 가독성 및 접근성을 보장하려면 투명 배경을 사용하십시오.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

# 자료 및 영감
