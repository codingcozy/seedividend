---
title: "HTML을 사용하여 시간표 만들기"
description: ""
coverImage: "/assets/img/2024-06-20-CreatingaTimeTableusingHTML_0.png"
date: 2024-06-20 05:57
ogImage:
  url: /assets/img/2024-06-20-CreatingaTimeTableusingHTML_0.png
tag: Tech
originalTitle: "Creating a Time Table using HTML"
link: "https://medium.com/@srsapireddy/creating-a-time-table-using-html-2d6fd70c0e2a"
isUpdated: true
---

아래에 표시된 HTML 시간표를 만들어 봅시다.

HTML은 문서의 표현, 레이아웃 및 서식을 지정하는 데 태그를 사용합니다. 태그는 여는 꺽쇠 괄호(`<`)로 시작하여 닫는 꺽쇠 괄호(`>`)로 끝납니다.

위에 표시된대로 시간표를 만들기 위해 HTML에서 필요한 태그는 다음과 같습니다:

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

`table` 태그: 테이블 구조를 정의합니다.

`tr` 태그: 테이블에서 열을 정의합니다.

`td` 태그: 테이블의 셀 역할을 합니다.

`td` 태그의 속성은 colspan과 rowspan이 있습니다. 시간표를 만들면서 colspan과 rowspan 태그에 대해 더 자세히 배우게 될 거에요.

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

`th` 태그: 표 제목을 정의하는 데 사용됩니다. `th` 태그 내의 데이터는 항상 굵게 표시됩니다.

```js
<!DOCTYPE html>
<html>
<body>
</body>
</html>
```

HTML 페이지의 기본 본문입니다.

```js
| 시간표 |
|------|
| 시간 | 월 | 화 | 수 | 목 | 금 |
| ---- | --- | --- | --- | --- | --- |
| 학시 | 수학 | 과학 | 수학 | 과학 | 미술 |
|        | 수학 | 과학 | 수학 | 과학 | 미술 |
|      | | | | | | |
|      | 수학 | 과학 | 수학 |   |   | 프로젝트 |
|      | 수학 | 과학 | 수학 |   |   | |
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

`table` 태그에서 사용되는 border 속성은 표 테두리를 정의하며(0은 테두리 없음) cellspacing 속성은 두 개의 표 셀 사이의 거리를 정의합니다.

여기서 rowspan은 두 개 이상의 열을 세로로 병합하는 데 사용되고, colspan은 두 개 이상의 열을 가로로 병합하는 데 사용됩니다.

여기서 `th` 태그 내부에서 colspan을 6으로 설정하여 6개의 열을 가로로 병합합니다. 마찬가지로, Lunch 열을 만들고 5개의 열을 병합하는 데 colspan을 사용합니다.

그런 다음, `th` 태그 내부에서 rowspan을 6으로 설정하여 6개의 열을 세로로 병합하는 hours 열을 생성합니다.

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

프로젝트를 나타내는 싱글 열로 4개의 열을 커버하기 위해 colspan과 rowspan을 2로 설정했습니다.

나머지 열은 `tr`과 `td` 태그를 사용하여 만들었습니다.

이렇게하여 HTML 태그를 사용하여 시간표를 만듭니다. 태그에 정의된 값을 변경하여 테이블 구조가 어떻게 변경되는지 살펴보고 colspan과 rowspan의 개념을 이해해 보세요.
