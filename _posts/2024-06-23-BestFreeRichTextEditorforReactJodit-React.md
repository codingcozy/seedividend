---
title: "React를 위한 최고의 무료 리치 텍스트 에디터 Jodit-React"
description: ""
coverImage: "/assets/img/2024-06-23-BestFreeRichTextEditorforReactJodit-React_0.png"
date: 2024-06-23 13:41
ogImage:
  url: /assets/img/2024-06-23-BestFreeRichTextEditorforReactJodit-React_0.png
tag: Tech
originalTitle: "Best Free Rich Text Editor for React: Jodit-React"
link: "https://medium.com/@gautamidhokte/best-free-rich-text-editor-for-react-jodit-react-9e1161b8472c"
isUpdated: true
---

![image](/assets/img/2024-06-23-BestFreeRichTextEditorforReactJodit-React_0.png)

안녕하세요 React 개발자 여러분,

제가 최고의 텍스트 편집기를 찾기 시작했을 때, 가능한 모든 라이브러리를 탐색했습니다. 하지만 말씀드릴게요, 쉬운 여정은 아니었습니다. 때로는 실망을 느끼기도 했지만, 오늘은 여러분과 공유할 수 있는 라이브러리를 발견하게 되어 기쁩니다. 다른 것들보다 더 잘 작동했습니다.

가장 인기 있는 무료 리치 텍스트 라이브러리들을 소개해 드리겠습니다:

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

1. React Quill:
   이 라이브러리를 사용하기로 거의 결정했습니다. 매주 40만 회 이상 다운로드되는 인기를 고려하면서요. 그러나 통합 후에 "붙여넣기 후 창이 위로 스크롤됨"과 관련된 문제가 발생했습니다. (https://github.com/zenoamaro/react-quill/issues/394)

2. TinyMCE:
   주간 다운로드 횟수 21만 7,362회로 또 다른 인기 있는 라이브러리이지만, 복사 및 붙여넣기가 잘못된 위치에 들어가고, 단락 나누기가 어렵다는 단점이 있습니다.

다른 라이브러리에서도 비슷한 문제가 발생했어요. 이런 문제들에 대해 과하게 생각하지 말고 Jodit으로 넘어가봅시다.

Jodit Editor:

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

순수 TypeScript로 작성된 오픈 소스 WYSIWYG 편집기입니다. 여기에서 더 많은 정보를 확인할 수 있어요: https://xdsoft.net/jodit/.

코드를 좀 더 살펴봅시다.

먼저, Jodit 편집기의 React 래퍼 인 Jodit-React를 설치해야 합니다:

```js
npm install jodit-react --save
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

더 많은 정보는 다음을 방문해주세요: [https://github.com/jodit/jodit-react](https://github.com/jodit/jodit-react)

기술적으로 여기까지 설명할 수도 있지만, 여기서 끝나는 것은 아닙니다. 제가 배운 것들을 공유하여 Jodit Editor를 애플리케이션에 매끄럽게 통합할 수 있도록 도와드리겠습니다.

에디터 옵션을 사용자 정의하세요:
모든 가능한 옵션 중에서 필요한 것을 결정할 수 있습니다. 두번 고심하지 않고 구성을 얻기 위해 [https://xdsoft.net/jodit/play.html](https://xdsoft.net/jodit/play.html)를 방문하여 플레이그라운드를 활용해보세요. 구성 방법에 대한 코드는 아래에 위치해 있으니 해당 코드를 복사하여 버튼을 정의할 수 있습니다.

예시:

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
const options = [
  "bold",
  "italic",
  "|",
  "ul",
  "ol",
  "|",
  "font",
  "fontsize",
  "|",
  "outdent",
  "indent",
  "align",
  "|",
  "hr",
  "|",
  "fullsize",
  "brush",
  "|",
  "table",
  "link",
  "|",
  "undo",
  "redo",
];
```

설정 정의:
구성을 설정해 봅시다. useMemo 훅을 사용하여 다음과 같이 JoditEditor에 구성을 전달해 보세요:

```js
const config = useMemo(
  () => ({
    readonly: false,
    placeholder: "",
    defaultActionOnPaste: "insert_as_html",
    defaultLineHeight: 1.5,
    enter: "div",
    // 위 단계에서 정의한 옵션들.
    buttons: options,
    buttonsMD: options,
    buttonsSM: options,
    buttonsXS: options,
    statusbar: false,
    sizeLG: 900,
    sizeMD: 700,
    sizeSM: 400,
    toolbarAdaptive: false,
  }),
  []
);
```

구성에 위 속성들을 설정하면 디버깅 시간을 많이 절약할 수 있습니다. 제가 직면한 문제를 해결해 주기 때문에 여러분도 동일한 문제를 마주칠 수 있으니 참고해 주세요.

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

3. 마지막으로, 이 구성을 JoditReact 컴포넌트에 전달하세요:
   여기서 에디터에 초기 값 전달하려면 값을 prop을 사용하세요. 그러나 상태 변수를 전달하지 말아주세요. "변경하면 에디터가 포커스를 잃음"이슈 때문에 상태 변수를 전달하지 않아야 합니다(https://github.com/jodit/jodit-react/issues/43).

HTML 문자열을 얻으려면 onChange를 사용하세요.

```js
<JoditEditor
  ref={editorRef}
  value={initialHtmlString || ""}
  config={config}
  onChange={(htmlString) => setValue(htmlString)}
/>
```

위 단계를 따르면 Jodit 에디터를 React 애플리케이션에 손쉽게 통합할 수 있습니다. 즐거운 코딩하세요!
