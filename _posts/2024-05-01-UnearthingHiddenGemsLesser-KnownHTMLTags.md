---
title: "알아두면 쓸모있는 잘 알려지지 않은 HTML 태그들"
description: ""
coverImage: "/assets/img/2024-05-01-UnearthingHiddenGemsLesser-KnownHTMLTags_0.png"
date: 2024-05-01 23:47
ogImage:
  url: /assets/img/2024-05-01-UnearthingHiddenGemsLesser-KnownHTMLTags_0.png
tag: Tech
originalTitle: "Unearthing Hidden Gems: Lesser-Known HTML Tags"
link: "https://medium.com/dev-genius/unearthing-hidden-gems-lesser-known-html-tags-2e3ce659d02a"
isUpdated: true
---

![UnearthingHiddenGemsLesser-KnownHTMLTags](/assets/img/2024-05-01-UnearthingHiddenGemsLesser-KnownHTMLTags_0.png)

웹 개발의 광활한 풍경 속에서 특정 HTML 태그들이 빛나며 주목을 받고 있습니다. 우리는 모두 `div`, `p`, `a`와 같은 태그를 알고 있지만, 마크업의 미천한 영웅들에 대해 얼마나 알고 계신가요? 함께 HTML의 심연을 탐험하며 주목할 만한 몇 가지 알려지지 않은 보석을 발굴해봅시다.

- `details`와 `summary`: 확장 가능한 콘텐츠

웹페이지에서 보충 정보를 숨겨야 할 때 토글이나 버튼으로 페이지를 혼동시키기만 했던 적이 있나요? `details`와 `summary`가 나타나는 순간입니다. 이러한 태그를 사용하면 쉽게 접어지는 콘텐츠 섹션을 만들 수 있습니다. 콘텐츠를 `details`로 감싸고 `summary` 내에서 간단한 요약을 제공하여 사용자가 한 번의 클릭으로 추가 세부 정보를 공개할 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
<details>
  <summary>더 많은 정보를 확인하려면 클릭하세요</summary>
  <p>여기에 추가 정보가 들어갑니다...</p>
</details>
```

2. `time`: 의미론적 시간 표현

날짜와 시간을 수동으로 형식화하는 것은 잊어버리세요. `time`은 대신 그 일을 해 줄 겁니다. 종종 간과되는 이 태그는 날짜와 시간을 의미론적으로 표현하는 방법을 제공하여 접근성과 검색 엔진 최적화를 향상시킵니다. 최대 호환성을 위해 ISO 8601 형식으로 datetime 속성을 지정하세요.

```js
<p>
  게시일 <time datetime="2024-04-29T08:00:00Z">2024년 4월 29일</time>
</p>
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

3. `cite`: 간편한 인용

오남용 시대에 올바른 인용은 이제보다 중요합니다. 그러나 많은 사람들이 평범한 텍스트나 이탤릭체 대신 `cite` 태그를 무시합니다. 이 의미 있는 태그로 인용을 더욱 강조하여 작품의 제목이나 저자 이름을 나타내세요.

```js
<blockquote>
  <p>
    "지식은 힘입니다." <cite>프란시스 베이컨</cite>
  </p>
</blockquote>
```

4. `mark`: 텍스트 동적 강조

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

텍스트를 동적으로 강조하는 것은 적절한 도구 없이는 번거로울 수 있습니다. `mark`가 등장했습니다. 텍스트 일부를 `mark`로 감싸면 강조 효과가 적용되어 검색 결과나 중요한 용어를 강조하는 데 안성맞춤입니다.

```js
<p>
  검색 결과: Lorem <mark>ipsum</mark> dolor sit amet...
</p>
```

5. `wbr`: 단어 나누기 기회

복잡한 단어 구조가 있는 언어나 긴 URL에서 올바른 줄 바꿈을 보장하기 위해 `wbr`이 등장합니다. 이 태그는 브라우저에 어디에 줄 바꿈을 삽입해야 하는지 힌트를 줌으로써 가독성을 보장하면서 콘텐츠 무결성을 보존합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
<p>중단이 필요한 긴단어<wbr>중단이 필요한 긴단어</p>
```

6. `fieldset`와 `legend`: 양식 요소 그룹화

사용자 경험을 위해서 양식을 적절하게 구성하는 것이 중요합니다. 그런데 `fieldset`와 `legend`는 종종 눈에 띄지 않는다. `fieldset`를 사용하여 관련된 양식 요소를 함께 그룹화하고 `legend`를 사용하여 해당 그룹에 캡션 또는 제목을 제공하세요. 이렇게 하면 양식이 더 구조화되고 접근성이 향상됩니다.

```js
<fieldset>
  <legend>연락 정보</legend>
  <!-- 여기에 양식 요소를 넣으세요 -->
</fieldset>
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

7. `dialog`: 모달 대화 상자

모달 대화 상자를 만드는 것은 예전에 JavaScript와 CSS를 사용하여 지루한 작업이었습니다. 하지만 걱정하지 마세요, `dialog`가 나타나서 이 프로세스를 간단하게 해 줍니다. 이 태그는 HTML 문서 내에 대화 상자나 창을 정의하여 팝업 알림, 경고 또는 상호 작용 프롬프트를 쉽게 만들 수 있게 합니다.

```js
<dialog open>
  <p>이것은 모달 대화 상자입니다!</p>
  <button onclick="this.parentNode.close()">닫기</button>
</dialog>
```

8. `meter`: 스칼라 측정값 시각화

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

특정 범위 내에서 측정 값을 표시해야 한다면 `meter`태그를 사용해보세요. 이 태그는 디스크 사용량, 다운로드 진행률 또는 주관적 등급과 같은 알려진 범위 내의 스칼라 측정 값을 나타냅니다. 필요에 맞게 값을, 최소값(min), 최대값(max) 속성을 사용자 정의할 수 있습니다.

```js
<meter value="0.6" min="0" max="1">
  60%
</meter>
```

9. `progress`: 작업 진행률 추적

작업 진행률을 추적하는 것은 웹 응용프로그램에서 흔한 요구 사항입니다. `progress`태그를 사용하면 쉽게 할 수 있습니다. 이 태그를 사용하여 파일 업로드, 양식 제출 또는 로딩 화면과 같은 작업의 완료 진행률을 나타낼 수 있습니다. 현재 진행 상황을 나타내기 위해 값(value) 속성을 설정하세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
<progress value="50" max="100">
  50%
</progress>
```

10. `samp`: 샘플 출력

프로그램이나 코드 스니펫의 샘플 출력을 표시할 때 `samp` 태그를 사용하면 의미론적으로 더 좋습니다. 이 태그는 컴퓨터 프로그램에서의 샘플 출력을 나타내어 사용자 입력이나 프로그램 코드와 구분짓습니다.

```js
<p>
  출력: <samp>Hello, World!</samp>
</p>
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

11. `abbr`: 약어 및 두문자어

`abbr`를 사용하면 접근성과 명확성을 쉽게 향상시킬 수 있어요. 이 태그를 사용하여 약어와 두문자어를 표시하고, 보조 기술에서 접근 가능한 확장 또는 설명을 제공하세요.

```js
<p>
  <abbr title="Hypertext Markup Language">HTML</abbr>은 멋져요!
</p>
```

12. `slot`: 콘텐츠 분배

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

웹 컴포넌트의 등장으로 `slot`이 점점 더 중요해지고 있어요. 이 태그는 웹 컴포넌트의 템플릿에 동적 콘텐츠를 삽입할 수 있는 자리 표시자를 정의하여 유연한 콘텐츠 배포와 조합을 가능케 해줘요.

```js
<my-custom-element>
  <p slot="header">헤더 내용</p>
  <p slot="footer">푸터 내용</p>
</my-custom-element>
```

프로젝트에 종종 간과되는 HTML 태그들을 통합함으로써 기능을 향상시키고 접근성을 개선하며 개발을 더욱 간편하게 할 수 있어요. 기억하세요, HTML의 진정한 힘은 익숙한 태그뿐만 아니라 발견되고 활용되기를 기다리는 숨은 보석들의 가치에 있어요.
