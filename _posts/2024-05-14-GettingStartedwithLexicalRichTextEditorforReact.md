---
title: "Lexical와 함께하는 React용 리치 텍스트 에디터 시작하기"
description: ""
coverImage: "/assets/img/2024-05-14-GettingStartedwithLexicalRichTextEditorforReact_0.png"
date: 2024-05-14 11:00
ogImage: 
  url: /assets/img/2024-05-14-GettingStartedwithLexicalRichTextEditorforReact_0.png
tag: Tech
originalTitle: "Getting Started with Lexical. Rich Text Editor for React"
link: "https://medium.com/javascript-in-plain-english/getting-started-with-lexical-2c8b94c9bdd9"
---


## React JS에서 Lexical을 사용하는 방법에 대한 튜토리얼; 예제와 함께 기본 사항.

<img src="/assets/img/2024-05-14-GettingStartedwithLexicalRichTextEditorforReact_0.png" />

... 그러나 유감스럽게도 이 문서는 좋은 설명의 예시가 아닙니다. 이 기사에서는 이 라이브러리를 어떻게 사용하는지를 간단한 용어로 설명하겠습니다.

여기서는 특별한 스타일, 모달 또는 팝오버 없이 렉시컬 리치 텍스트 기능의 기본을 다룰 것입니다:



![이미지](/assets/img/2024-05-14-GettingStartedwithLexicalRichTextEditorforReact_1.png)

만약 이 라이브러리가 무엇을 할 수 있는지 확인하고 싶다면, 멋진 렉시컬 플레이그라운드를 확인해보세요.

![이미지](/assets/img/2024-05-14-GettingStartedwithLexicalRichTextEditorforReact_2.png)

관련 이야기:



# 다룰 내용

- 준비물
- 시작하기
- 히스토리 플러그인
- 노드
- 리치 텍스트
- 테마
- 제목, 도우미 및 노드 구성
- 페이로드로 자신만의 명령어를 만드는 방법
- 사용자 정의 노드 만들기

# 준비물

우리는 다음과 같이 만들어진 간단한 React JS 애플리케이션으로 시작할 것입니다:



```js
yarn create react-app react-lexical-examples --template typescript
```

그리고 우리는 어휘 패키지를 설치해야 합니다:

```js
yarn add lexical @lexical/react

// OR

npm install --save lexical @lexical/react
```

# 시작




Lexical을 이용하여 작업을 시작하려면 이 템플릿을 사용할 수 있어요:

```js
import React, {useMemo} from 'react';
import {InitialConfigType, LexicalComposer} from '@lexical/react/LexicalComposer';
import {PlainTextPlugin} from "@lexical/react/LexicalPlainTextPlugin";
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

export const App: React.FC = () => {

    const CustomContent = useMemo(() => {
        return (
            <ContentEditable style={
                position: 'relative',
                borderColor: 'rgba(255,211,2,0.68)',
                border: '2px solid red',
                borderRadius: '5px',
                maxWidth: '100%',
                padding: '10px'
            }/>
        )
    }, []);

    const CustomPlaceholder = useMemo(() => {
        return (
            <div style={
                position: 'absolute', top: 30, left: 30,
            }>
                텍스트를 입력하세요...
            </div>
        )
    }, []);

    const lexicalConfig: InitialConfigType = {
        namespace: '나의 리치 텍스트 편집기',
        onError: (e) => {
            console.log('에러 발생:', e)
        }
    }

    return (
        <div style={padding: '20px'}>
            <LexicalComposer initialConfig={lexicalConfig}>
                <PlainTextPlugin
                    contentEditable={CustomContent}
                    placeholder={CustomPlaceholder}
                    ErrorBoundary={LexicalErrorBoundary}
                />
            </LexicalComposer>
        </div>
    );
}
```

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*-7S9xp-EweAiYl8Fn0O8_w.gif)

보다시피, 아주 복잡해 보이지 않죠. 걱정하지 마세요, 나중에 이 컴포넌트들에 대해 자세히 다룰 거예요. 일단은 모든 것이 예상대로 작동하는지 확인하는 것이 중요해요.



이제 기능을 하나씩 추가해 봅시다.

# 히스토리 플러그인

이전 예제에서 새 텍스트를 입력할 수 있었지만, CTRL-Z(실행 취소)를 누르면 아무 일도 일어나지 않았죠. 이 문제를 해결하기 위해 @lexical/history 플러그인을 추가하여 CTRL-Z(실행 취소)와 CTRL-SHIFT-Z(다시 실행)를 사용할 수 있게 할 수 있습니다.

선택 사항으로 직접 Undo/Redo를 처리하는 사용자 정의 컴포넌트를 추가할 수도 있습니다:



```js
@@ -3,6 +3,8 @@
 import {PlainTextPlugin} from "@lexical/react/LexicalPlainTextPlugin";
 import {ContentEditable} from '@lexical/react/LexicalContentEditable';
 import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
+import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
+import {CustomHistoryActions} from "./components";
 
 export const App: React.FC = () => {
 
@@ -44,7 +46,12 @@
                     placeholder={CustomPlaceholder}
                     ErrorBoundary={LexicalErrorBoundary}
                 />
+                <HistoryPlugin/>
+                <div style={margin: '20px 0px'}>
+                    <CustomHistoryActions/>
+                </div>
             </LexicalComposer>
+
         </div>
     );
 }
```

```js
import {UNDO_COMMAND, REDO_COMMAND} from 'lexical';
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";

export const CustomHistoryActions = () => {
    const [editor] = useLexicalComposerContext();
    return (
        <>
            <button onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}>되돌리기</button>
            <button onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}>다시 실행</button>
        </>
    );
}
```

설명:

- editor는 `LexicalComposer/` 컴포넌트에서 가져온 컨텍스트 값입니다. 에디터 클래스/메소드에 대한 자세한 내용은 여기서 확인할 수 있습니다:



간단한 사용 예시:

```js
const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // 이펙트가 발생할 때 에디터에 포커스를 맞춥니다!
    editor.focus();
  }, [editor]);
```

- UNDO_COMMAND과 REDO_COMMAND는 에디터 내용(또는 원하는 내용)을 처리해야 할 것을 렉시컬에 알리는 등록된 렉시컬 명령입니다. 다음과 같이 사용자 고유의 명령을 생성할 수도 있습니다:

```js
import { createCommand, COMMAND_PRIORITY_NORMAL } from "lexical";

export const DO_SOMETHING_AWESOME = createCommand("create_banner");

export const CustomComponent: React.FC = () => {
  const [editor] = useLexicalComposerContext();

  editor.registerCommand(
    DO_SOMETHING_AWESOME,
    () => {
      console.log('이것은 내가 만든 명령입니다')
      return true;
    },
    COMMAND_PRIORITY_NORMAL,
  );

  return null;
};
```



걱정하지 마세요, 나중에 이 주제를 조금 더 다룰 거예요.

- editor.dispatchCommand(UNDO_COMMAND, undefined) → 왜 두 번째 인자로 undefined를 전달하는 걸까요? 첫 번째, 그렇게 하지 않으면 TS 오류가 발생합니다. 둘째, 이것은 명령과 함께 전달될 수 있는 페이로드 데이터입니다(우리 경우에는 해당되지 않습니다). dispatchCommand에 대해 더 알아보세요.

# 노드

이 섹션에서는 용어의 작동 방식과 저장하는 데이터에 대해 깊이 파헤쳐야 할 것입니다.



먼저, 에디터의 상태 변화를 모니터링하고 에디터의 상태를 로깅하는 간단한 플러그인을 만들 것입니다:

```js
// src/components/OnChangePlugin/OnChangePlugin.tsx

import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {useEffect} from "react";

export const OnChangePlugin = () => {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        return editor.registerUpdateListener((listener) => {
            console.log('DATA', listener.editorState.toJSON())
        });
    }, [editor]);

    return null;
}
```

다음으로, `LexicalComposer/`의 하위 컴포넌트로 `OnChangePlugin/` 컴포넌트를 추가해주세요:

```js
Index: src/App.tsx
@@ -5,6 +5,7 @@
 import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
 import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
 import {CustomHistoryActions} from "./components";
+import {OnChangePlugin} from "./components";

export const App: React.FC = () => {

@@ -47,6 +48,7 @@
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin/>
+                <OnChangePlugin />
                <div style={margin: '20px 0px'}>
                    <CustomHistoryActions/>
                </div>
```



이제 편집기의 상태가 변경될 때마다 편집기의 상태 트리 데이터를 콘솔에 출력할 것입니다:

![이미지](/assets/img/2024-05-14-GettingStartedwithLexicalRichTextEditorforReact_3.png)

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*Lqyfyb4peVPoHJQvYuBNhQ.gif)

이 텍스트를 입력하면 어떤 데이터를 얻을지 확인해 봅시다:



```json
{
  "root": {
    "children": [
      {
        "children": [
          {
            "detail": 0,
            "format": 0,
            "mode": "normal",
            "style": "",
            "text": "asd",
            "type": "text",
            "version": 1
          },
          {
            "type": "linebreak",
            "version": 1
          },
          {
            "detail": 0,
            "format": 0,
            "mode": "normal",
            "style": "",
            "text": "dsa",
            "type": "text",
            "version": 1
          }
        ],
        "direction": "ltr",
        "format": "",
        "indent": 0,
        "type": "paragraph",
        "version": 1
      }
    ],
    "direction": "ltr",
    "format": "",
    "indent": 0,
    "type": "root",
    "version": 1
  }
}
```

아마도 노드가 간단한 속성을 가진 객체임을 알았을겁니다. 주요 속성은 노드의 종류인 type과 노드의 내용인 text입니다.



```js
import initialState from './initialState.json';

// ...

return (
      <LexicalComposer
        initialConfig={
          // ...
          editorState: JSON.stringify(initialState),
        }
      >
            {/* ... */}
      </LexicalComposer>
    );
```

이 경우 앱을 다시 시작할 때마다 동일한 결과를 얻을 수 있습니다:

<img src="/assets/img/2024-05-14-GettingStartedwithLexicalRichTextEditorforReact_4.png" />

Nodes에 대해 더 많은 정보를 읽어보실 수 있습니다.




# 리치 텍스트

첫 번째 노드 수정 핸들러를 만들어 봅시다.

이전에 PlainTextPlugin 컴포넌트를 사용했기 때문에 "bold" (CTRL+B) 액션과 같은 텍스트 작업을 처리할 수 없습니다:

```js
<LexicalComposer initialConfig={lexicalConfig}>
  <PlainTextPlugin ...  />
...
</LexicalComposer>
```



App.tsx 파일에서 PlainTextPlugin을 RichTextPlugin으로 변경해야 합니다:

```js
Index: src/App.tsx

@@ -1,6 +1,6 @@
 import React, {useMemo} from 'react';
 import {InitialConfigType, LexicalComposer} from '@lexical/react/LexicalComposer';
-import {PlainTextPlugin} from "@lexical/react/LexicalPlainTextPlugin";
+import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin";
 import {ContentEditable} from '@lexical/react/LexicalContentEditable';
 import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
 import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
@@ -46,7 +46,7 @@
             <LexicalComposer
                 initialConfig={lexicalConfig}
             >
-                <PlainTextPlugin
+                <RichTextPlugin
                     contentEditable={CustomContent}
                     placeholder={CustomPlaceholder}
                     ErrorBoundary={LexicalErrorBoundary}
```

이제 에디터에서 기본 텍스트 작업을 사용할 수 있을 것입니다:

<img src="https://miro.medium.com/v2/resize:fit:768/1*GWYMSFDfd3PI2PSh5bVsYw.gif" />



우리의 커스텀 버튼을 만들어 봅시다:

```js
// src/components/CustomTextActions/CustomTextActions.tsx

import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {FORMAT_TEXT_COMMAND, TextFormatType} from 'lexical';

export const CustomTextActions = () => {
    const [editor] = useLexicalComposerContext();

    const handleOnClick = (formatType: TextFormatType) => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, formatType)
    }

    return (
        <div style={{marginTop: '10px'}}>
            <span style={{fontWeight: 'bold'}}>텍스트 액션</span>
            <div>
                {[
                    '굵게',
                    '이탤릭체',
                    '밑줄',
                    '코드',
                    '하이라이트',
                    '취소선',
                    '아래첨자',
                    '위첨자'
                ].map(value => {
                    return (
                        <button
                            onClick={() => handleOnClick(value.toLowerCase() as TextFormatType)}>
                            {value}
                        </button>
                    )
                })}
            </div>
        </div>
    );
}
```

<img src="/assets/img/2024-05-14-GettingStartedwithLexicalRichTextEditorforReact_5.png" />

하지만 텍스트를 수정하려고 하면 기대했던 결과가 나오지 않을 수 있습니다: 일부 항목은 변경되고 일부는 변경되지 않을 수 있습니다. 그 이유가 무엇일까요?



<img src="/assets/img/2024-05-14-GettingStartedwithLexicalRichTextEditorforReact_6.png" />

HTML 출력을 확인해 봅시다:

```js
<p dir="ltr"><strong data-lexical-text="true">굵게</strong></p>
<p dir="ltr"><em data-lexical-text="true">이탤릭체</em></p>
<p dir="ltr"><span data-lexical-text="true">밑줄</span></p>
<p dir="ltr"><code data-lexical-text="true"><span>코드</span></code></p>
<p dir="ltr">
    <mark data-lexical-text="true"><span>강조</span></mark>
</p>
<p dir="ltr"><span data-lexical-text="true">취소선</span></p>
<p dir="ltr"><sub data-lexical-text="true"><span>아래 첨자</span></sub></p>
<p dir="ltr"><sup data-lexical-text="true"><span>위 첨자</span></sup></p>
<p dir="ltr"><code data-lexical-text="true"><strong>모두 표시</strong></code></p>
```

요소에는 적용된 스타일이 없지만 브라우저에서 `mark`/`strong/`/`em/`에 대한 사전 정의된 스타일이 있어 약간의 스타일 변화가 있습니다. 그러나 우리가 기대한 것은 아닙니다.



이제 다음 주제인 → 테마를 다루어볼 시간입니다.

👉 작은 참고사항입니다. Align 작업 구현이 이렇게 보일 것입니다 (텍스트와 동일한 디스패치 명령어 접근 방식):

```js
import {
    useLexicalComposerContext
} from "@lexical/react/LexicalComposerContext";
import {
    FORMAT_ELEMENT_COMMAND,
    ElementFormatType,
    OUTDENT_CONTENT_COMMAND,
    INDENT_CONTENT_COMMAND
} from 'lexical';

export const CustomAlignActions = () => {
    const [editor] = useLexicalComposerContext();

    const handleOnClick = (formatType: ElementFormatType) => {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, formatType)
    }

    return (
        <div style={marginTop: '10px'}>
            <span style={fontWeight: 'bold'}>Align actions</span>
            <div>
                {[
                    'Left',
                    'Center',
                    'Right',
                    'Justify',
                ].map(value => {
                    return (
                        <button
                            onClick={() => handleOnClick(value.toLowerCase() as ElementFormatType)}>
                            {value}
                        </button>
                    )
                })}
                <button
                    onClick={() => editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined)}>
                    Outdent
                </button>
                <button
                    onClick={() => editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)}>
                    Indent
                </button>
            </div>
        </div>
    );
}
```

![이미지](/assets/img/2024-05-14-GettingStartedwithLexicalRichTextEditorforReact_7.png)



위의 경우 "정당화" 노드가 편집기 상태 JSON에서 어떻게 나타낼지에 대한 예시입니다:

```js
{
  "children": [
    {
      "detail": 0,
      "format": 1,
      "mode": "normal",
      "style": "",
      "text": "Justify",
      "type": "text",
      "version": 1
    },
    {
      "detail": 0,
      "format": 0,
      "mode": "normal",
      "style": "",
      "text": " - Lorem ipsum dolor sit amet, <...>",
      "type": "text",
      "version": 1
    }
  ],
  "direction": "ltr",
  "format": "justify",
  "indent": 0,
  "type": "paragraph",
  "version": 1
}
```

# 테마

Nodes를 수정할 때, lexical은 테마 객체 theme.[`노드-타입`]에서 지정된 노드 타입에 대해 스타일(클래스 이름)을 적용합니다.



해달 코드를 추가하고 텍스트 스타일을 적용해 보겠습니다:

```js
Index: src/App.tsx

@@ -10,6 +10,7 @@
     CustomHistoryActions
 } from "./components";
 import initialState from './initialState.json';
+import './App.css'
 
 export const App: React.FC = () => {
 
@@ -38,6 +39,18 @@
 
     const lexicalConfig: InitialConfigType = {
         namespace: 'My Rich Text Editor',
+        theme: {
+            text: {
+                bold: "text-bold",
+                italic: "text-italic",
+                underline: "text-underline",
+                code: 'text-code',
+                highlight: 'text-highlight',
+                strikethrough: 'text-strikethrough',
+                subscript: 'text-subscript',
+                superscript: 'text-superscript',
+            },
+        },
         onError: (e) => {
             console.log('ERROR:', e)
         },
```

CSS:

```js
.text-bold {
    font-weight: bold;
}

.text-italic {
    font-style: italic;
}

.text-underline {
    text-decoration: underline;
}

.text-code {
    background-color: #f0f2f5;
    padding: 1px 0.25rem;
    font-family: Menlo, Consolas, Monaco, monospace;
    font-size: 94%;
}

.text-highlight {
    margin: 0 5px;
}

.text-strikethrough {
    text-decoration: line-through;
}

.text-subscript {
    vertical-align: sub;
}

.text-superscript {
    vertical-align: super;
}

p {
    margin: 0;
}
```




![image](https://miro.medium.com/v2/resize:fit:1260/1*_KW7zAxitBpOe3HrAqHHfw.gif)

![image](/assets/img/2024-05-14-GettingStartedwithLexicalRichTextEditorforReact_8.png)

**Bold**
*Italic*
<ins>Underline</ins>
`Code`
<mark>Highlight</mark>
~~Strike~~
X<sub>Sub</sub>
X<sup>Super</sup>
<mark><strong><em><ins><u><strike><sub>All of them</sub></strike></u></ins></em></strong></mark>




알겠지만, 우리가 디스패치를 트리거할 때마다, 렉시컬이 클래스를 교체하지 않고, 있는 경우 추가하거나 있는 경우 제거했습니다. 이 점을 명심해주세요. "굵게 기울임체 밑줄"에 대해 별도의 CSS 클래스를 만들 필요가 없습니다.

에디터의 상태 JSON:

```js
{
  "root": {
    "children": [
      {
        "children": [
          {
            "detail": 0,
            "format": 11,
            "mode": "normal",
            "style": "",
            "text": "굵게 기울임체 밑줄",
            "type": "text",
            "version": 1
          }
        ],
        "direction": "ltr",
        "format": "",
        "indent": 0,
        "type": "paragraph",
        "version": 1
      }
    ],
    "direction": "ltr",
    "format": "",
    "indent": 0,
    "type": "root",
    "version": 1
  }
}
```

# 헤딩. 헬퍼 및 노드 구성



등록된 어휘 명령이 없을 경우 어떻게 해야 할까요? 단어 요소(어휘의 기본 노드)를 어휘 명령을 사용하지 않고 헤더 노드로 변환해 봅시다:

```js
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { HeadingTagType, $createHeadingNode } from "@lexical/rich-text";

export const CustomHeadingActions = () => {
    const [editor] = useLexicalComposerContext();

    const handleOnClick = (tag: HeadingTagType) => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createHeadingNode(tag));
            }
        });
    };

    return (
        <div style={{ marginTop: '10px' }}>
            <span style={{ fontWeight: 'bold' }}>Align actions</span>
            <div>
                {(["h1", "h2", "h3", "h4", "h5"] as Array<HeadingTagType>).map((tag) => {
                    return (
                        <button
                            key={tag}
                            onClick={() => handleOnClick(tag)}
                        >
                            {tag}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
```

일부 노드를 헤딩 노드로 변환하는 데 미리 정의된 명령이 없기 때문에 여기서는 다음과 같은 작업을 수행합니다:

- 콜백을 인수로 전달하는 editor.update 함수 호출
- 선택된 노드를 가져오기 위해 $getSelection 헬퍼 사용
- $isRangeSelection을 사용하여 RangeSelection 유형인지 확인합니다.



```js
// 소스코드
export function $isRangeSelection(x: unknown): x is RangeSelection {
  return x instanceof RangeSelection;
}
```

4. $setBlocksType을 새로운 $createHeadingNode (h1, h2, h3…)으로 변경하세요;

⚠️ 하지만 앱에서 사용해보면 아무 일도 일어나지 않습니다 → 문단이 헤더로 변경되지 않습니다. 에디터에서 사용하고 싶은 노드에 대해 렉시컬이 알지 못하기 때문입니다 (기본 노드를 제외하고). 노드 구성 배열에 HeaderNode를 추가해야 합니다:

```js
Index: src/App.tsx

@@ -10,6 +10,7 @@
     CustomHistoryActions,
     CustomAlignActions, CustomHeadingActions
 } from "./components";
+import {HeadingNode} from "@lexical/rich-text";
 import initialState from './initialState.json';
 import './App.css'
 
@@ -40,6 +41,7 @@
 
     const lexicalConfig: InitialConfigType = {
         namespace: 'My Rich Text Editor',
+        nodes: [HeadingNode],
         theme: {
             text: {
                 bold: "text-bold",
```



<img src="/assets/img/2024-05-14-GettingStartedwithLexicalRichTextEditorforReact_9.png" />

# 페이로드와 함께 자신만의 명령어를 생성하는 방법

이전 코드를 다시 작성해 보겠습니다. 다른 곳에서 변환 명령을 호출해야 하는 경우에도 이 조각을 복사-붙여넣기할 필요가 없도록 바꿀 거에요:

```js
editor.update(() => {
    const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(tag));
      }
});
```



위 작업을 위해 페이로드 `"h1" | "h2" | "h3", ...`을 사용하여 자체 FORMAT_HEADING_COMMAND를 생성하고 등록합니다.

```js
// src/components/CustomHeadingPlugin/CustomHeadingPlugin.tsx

import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
    createCommand,
    $getSelection,
    $isRangeSelection,
    COMMAND_PRIORITY_NORMAL,
} from "lexical";
import {
    $setBlocksType
} from "@lexical/selection";
import {
    HeadingTagType,
    $createHeadingNode
} from "@lexical/rich-text";

export const FORMAT_HEADING_COMMAND = createCommand("FORMAT_HEADING_COMMAND");

export const CustomHeadingPlugin = () => {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        editor.registerCommand<HeadingTagType>(
            FORMAT_HEADING_COMMAND,
            (payload) => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    $setBlocksType(selection, () => $createHeadingNode(payload));
                }
                return true;
            },
            COMMAND_PRIORITY_NORMAL,
        );
    }, []);

    return null;
}
```

이제 `CustomHeadingActions/` 구현을 업데이트할 수 있습니다:

```js
Index: src/components/CustomHeadingActions/CustomHeadingActions.tsx
@@ -1,22 +1,15 @@
import {
    useLexicalComposerContext
} from "@lexical/react/LexicalComposerContext";
import {HeadingTagType} from "@lexical/rich-text";
import {FORMAT_HEADING_COMMAND} from "../CustomHeadingPlugin";

export const CustomHeadingActions = () => {
    const [editor] = useLexicalComposerContext();

    const handleOnClick = (tag: HeadingTagType) => {
        editor.dispatchCommand(FORMAT_HEADING_COMMAND, tag);
    };

    return (
        <div style={marginTop: '10px'}>
```



이 변형은 내게 훨씬 깔끔하고 재사용 가능해 보여요. 그 이후에는 LexicalComposer의 자식으로 우리가 만든 Header Plugin을 배치해야할거에요:

```js
Index: src/App.tsx

@@ -8,8 +8,11 @@
     OnChangePlugin,
     CustomTextActions,
     CustomHistoryActions,
     CustomAlignActions,
     CustomHeadingActions,
+    CustomHeadingPlugin,
 } from "./components";
 import {HeadingNode} from "@lexical/rich-text";
 import initialState from './initialState.json';
 import './App.css'

@@ -70,7 +74,7 @@
                 />
                 <HistoryPlugin/>
                 <OnChangePlugin/>
+                <CustomHeadingPlugin/>
                 <div style={margin: '20px 0px'}>
                     <CustomHistoryActions/>
                     <CustomHeadingActions/
```

👉 참고: 이전에 다뤘지만 다시 한 번 상기시키자면... 테마 구성을 업데이트하여 각 헤딩 엘리먼트에 적용하려는 CSS 클래스 이름을 지정할 수 있어요:

```js
Index: src/App.tsx

@@ -62,6 +62,14 @@
                 subscript: 'text-subscript',
                 superscript: 'text-superscript',
             },
+            heading: {
+                // Flowbite examples: https://flowbite.com/docs/typography/headings/#heading-one-h1
+                h1: "text-5xl font-extrabold dark:text-white",
+                h2: "text-4xl font-bold dark:text-white",
+                h3: "text-3xl font-bold dark:text-white",
+                h4: "text-2xl font-bold dark:text-white",
+                h5: "text-xl font-bold dark:text-white",  
+            },
             banner: 'banner'
         },
         onError: (e) => {
```



# 커스텀 노드를 만드는 방법

이전 섹션에서는 기본적으로 모든 것을 다루었으니, 이번 섹션에서는 직접 노드를 만들어보겠습니다. 제가 생각하기에 렉시컬이 노드를 처리하는 전체 그림을 파악하게 될 것입니다.

가장 간단한 배너 노드:

```js
import {
    EditorConfig,
    ElementNode,
    LexicalEditor,
    SerializedElementNode,
    Spread,
} from "lexical";

export type SerializedBannerNode = Spread<
    {
        customValue: string;
    },
    SerializedElementNode
>;

export class BannerNode extends ElementNode {
    createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
        const div = document.createElement("div");
        div.className = _config.theme.banner;
        return div;
    }

    static clone(node: BannerNode): BannerNode {
        return new BannerNode(node.__key);
    }

    static getType(): string {
        return "banner";
    }

    /**
     * Returning false tells Lexical that this node does not need its
     * DOM element replacing with a new copy from createDOM.
     */
    updateDOM(
        _prevNode: unknown,
        _dom: HTMLElement,
        _config: EditorConfig,
    ): boolean {
        return false;
    }

    exportJSON(): SerializedBannerNode {
        return {
            type: "banner",
            version: 1,
            children: [],
            customValue: "anything you like",
            format: "",
            indent: 1,
            direction: null,
        };
    }
}
```



설명:
- 새로운 어휘 노드를 만들려면 미리 정의된 어휘 노드(ElementNode | TextNode | DecoratorNode 중 하나를 확장한 클래스를 만들고 메서드를 재정의해야 합니다(모든 메서드를 다루지는 않겠습니다));
- 먼저, 어휘는 노드의 타입에 대한 일치 항목을 찾으려고 할 것이며, 타입 함수를 호출하여 구성 노드 배열('banner'의 경우)에서 지정한 노드들로부터 getType 함수를 호출할 것입니다;
- 그 다음으로, 어휘는 HTML 요소를 만드는 createDOM 메서드를 호출할 것입니다;
- OnChangePlugin에 toJSON 함수가 있는 것을 기억하시나요?

```js
// src/components/OnChangePlugin/OnChangePlugin.tsx

import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {useEffect} from "react";

export const OnChangePlugin = () => {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        return editor.registerUpdateListener((listener) => {
            console.log('DATA', listener.editorState.toJSON())
        });
    }, [editor]);

    return null;
}
```

여기서 우리의 Banner exportJSON 함수가 호출될 것입니다.



이제 BannerNode를 위한 플러그인을 생성해야 합니다. 이미 Headings 섹션에서 이를 수행한 적이 있습니다:

```js
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {$getSelection, $isRangeSelection, COMMAND_PRIORITY_NORMAL, createCommand} from "lexical";
import {
    $setBlocksType
} from "@lexical/selection";
import {BannerNode} from "../../nodes";
import React from "react";

export const $createBannerNode = (): BannerNode => new BannerNode();

export const INSERT_BANNER_COMMAND = createCommand("create_banner");

export const CustomBannerPlugin: React.FC = () => {
    const [editor] = useLexicalComposerContext();

    if (!editor.hasNode(BannerNode)) {
        throw new Error('BannerPlugin: "BannerNode" not registered on editor');
    }
    editor.registerCommand(
        INSERT_BANNER_COMMAND,
        () => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $setBlocksType(selection, $createBannerNode);
            }
            return true;
        },
        COMMAND_PRIORITY_NORMAL,
    );

    return null;
};
```

CustomBannerActions 컴포넌트를 추가하세요: 우리 명령어와 함께 간단한 버튼이 있습니다:

```js
import React from "react";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {INSERT_BANNER_COMMAND} from "../CustomBannerPlugin";

export const CustomBannerActions: React.FC = () => {
    const [editor] = useLexicalComposerContext();

    const handleOnClick = () => {
        editor.dispatchCommand(INSERT_BANNER_COMMAND, undefined);
    };

    return (
        <div style={{marginTop: '10px'}}>
            <span style={{fontWeight: 'bold'}}>Heading actions</span>
            <div>
                <button onClick={handleOnClick}>
                    Banner
                </button>
            </div>
        </div>
    );
};
```



App.tsx를 업데이트하였습니다:

```js
Index: src/App.tsx

@@ -11,10 +11,13 @@
     CustomAlignActions,
     CustomHeadingActions,
     CustomHeadingPlugin,
+    CustomBannerPlugin,
+    CustomBannerActions,
 } from "./components";
 import {HeadingNode} from "@lexical/rich-text";
 import initialState from './initialState.json';
 import './App.css'
+import {BannerNode} from "./nodes";
 
 export const App: React.FC = () => {
 
@@ -43,7 +46,10 @@
 
     const lexicalConfig: InitialConfigType = {
         namespace: 'My Rich Text Editor',
-        nodes: [HeadingNode],
+        nodes: [
+            BannerNode,
+            HeadingNode
+        ],
         theme: {
             text: {
                 bold: "text-bold",
@@ -55,6 +61,7 @@
                 subscript: 'text-subscript',
                 superscript: 'text-superscript',
             },
+            banner: 'banner'
         },
         onError: (e) => {
             console.log('ERROR:', e)
@@ -75,8 +82,10 @@
                 <HistoryPlugin/>
                 <OnChangePlugin/>
                 <CustomHeadingPlugin/>
+                <CustomBannerPlugin/>
                 <div style={margin: '20px 0px'}>
                     <CustomHistoryActions/>
+                    <CustomBannerActions/>
                     <CustomHeadingActions/>
                     <CustomTextActions/>
                     <CustomAlignActions/>
```

CSS:

```js
Index: src/App.css

@@ -33,6 +33,13 @@
     vertical-align: super ;
 }
 
+.banner {
+    border-left: 3px coral solid;
+    background-color: lightskyblue;
+    border-radius: 3px;
+    padding: 10px 0;
+}
+
 p {
     margin: 0;
 }
```



결과:

<img src="https://miro.medium.com/v2/resize:fit:1334/1*zesdcbkZmVlSoY1HaflYUA.gif" />

🔴 문제가 두 가지 있을 것입니다:

- 사용자가 Enter 키 또는 Shift+Enter 키를 눌러 노드에서 "나가기"를 할 수 없을 것입니다.
- 사용자가 Backspace 키를 눌러 노드를 "제거"할 수 없을 것입니다.



우리의 BannerNode를 업데이트해 봅시다:

```js
Index: src/nodes/BannerNode/BannerNode.tsx

@@ -2,6 +2,9 @@
     EditorConfig,
     ElementNode,
     LexicalEditor,
+    $createParagraphNode,
+    LexicalNode,
+    RangeSelection,
     SerializedElementNode,
     Spread,
 } from "lexical";
@@ -40,6 +43,34 @@
         return false;
     }

+    /**
+     * 사용자가 모든 콘텐츠를 삭제할 때 노드를 단락으로 설정해야 합니다
+     */
+    collapseAtStart(_: RangeSelection): boolean {
+        const paragraph = $createParagraphNode();
+        const children = this.getChildren();
+        children.forEach((child) => paragraph.append(child));
+        this.replace(paragraph);
+
+        return true;
+    }
+
+    /**
+     * 사용자가 Enter 키를 누를 때 노드를 단락으로 설정해야 합니다.
+     * Shift+Enter를 누를 경우 노드는 유지됩니다
+     */
+    insertNewAfter(
+        _: RangeSelection,
+        restoreSelection?: boolean,
+    ): LexicalNode | null {
+        const paragraph = $createParagraphNode();
+        const direction = this.getDirection();
+        paragraph.setDirection(direction);
+        this.insertAfter(paragraph, restoreSelection);
+
+        return paragraph;
+    }
+
     exportJSON(): SerializedBannerNode {
         return {
             type: "banner",
```

지금까지 얻은 것을 확인해 보겠습니다:

<img src="https://miro.medium.com/v2/resize:fit:1334/1*44Wg5Stz5crAXpP3Qi-PRA.gif" />



🟢 업데이트 후:

- 사용자는 노드에서 Enter 키를 눌러 "나가기" 할 수 있습니다;
- 사용자는 노드를 Shift + Enter 키를 눌러 "확장"할 수 있습니다;
- 사용자는 콘텐츠 텍스트가 비어 있을 때 Backspace 키를 눌러 노드를 "삭제"할 수 있습니다;

마지막으로, 에디터의 JSON 트리에서 BannerNode을 파싱하는 함수가 필요합니다:

```js
Index: src/nodes/BannerNode/BannerNode.tsx

@@ -71,6 +71,10 @@
         return paragraph;
     }
 
+    static importJSON(_: SerializedBannerNode): BannerNode {
+        return new BannerNode();
+    }
+
     exportJSON(): SerializedBannerNode {
         return {
             type: "banner",
```



# 깃허브 리포지토리:

관련된 기사들:

이 글이 도움이 되었기를 바랍니다. 만약 그렇다면, "claps"를 주시면 감사하겠습니다.

# 간단히 설명



우리 커뮤니티에 참여해 주셔서 감사합니다! 떠나시기 전에:

- 반드시 작가를 칭찬하고 팔로우하세요! 👏
- PlainEnglish.io에서 더 많은 콘텐츠를 찾아보세요! 🚀
- 무료 주간 뉴스레터에 가입하세요. 🗞️
- 트위터, 링크드인, 유튜브, 그리고 디스코드에서 저희를 팔로우해주세요.