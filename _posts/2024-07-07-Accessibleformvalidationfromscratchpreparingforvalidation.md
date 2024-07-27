---
title: "처음부터 시작하는 접근성 있는 폼 유효성 검사 준비 방법"
description: ""
coverImage: "/ui-log-2/assets/img/2024-07-07-Accessibleformvalidationfromscratchpreparingforvalidation_0.png"
date: 2024-07-07 21:25
ogImage:
  url: /assets/img/2024-07-07-Accessibleformvalidationfromscratchpreparingforvalidation_0.png
tag: Tech
originalTitle: "Accessible form validation from scratch — preparing for validation"
link: "https://medium.com/user-experience-design-1/accessible-form-validation-from-scratch-preparing-for-validation-6fc9e5b98d68"
---

<img src="/ui-log-2/assets/img/2024-07-07-Accessibleformvalidationfromscratchpreparingforvalidation_0.png" />

안녕하세요! 이 글에서는 필수 필드를 표시하는 방법, 도움말 텍스트를 추가하는 방법, 입력 그룹을 구현하는 방법, 그리고 인라인 및 요약 유효성을 위한 마크업을 추가하는 방법을 알려드릴 거에요.

다음 글에서는 스타일링을 추가할 거예요.

# 소개

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

우리 이전 기사에서 많은 내용을 다루었어요:

- 부위 1: 요구 사항
- 부위 2: 마크업

하지만 스타일링과 자바스크립트에 들어가기 전에 마크업이 조금 더 필요해요. 이 기사에서 다룰 주제들은 다음과 같아요:

- 필수 필드 표시
- 도움말 텍스트 추가
- 인라인 검증 준비
- 입력 그룹 구현
- 요약 검증 준비

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

# 필수 필드 표시

필수 필드를 어떻게 표시해야 할까요? 먼저, 모두가 동의할 수 있는 것은 사용자가 필수 필드임을 인지해야 한다는 점이며, 시각적으로 그리고 보조 기술(AT)을 이용해 이를 확인할 수 있어야 한다는 것입니다.
