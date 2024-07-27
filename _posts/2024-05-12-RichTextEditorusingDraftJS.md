---
title: "DraftJS를 사용한 풍부한 텍스트 편집기"
description: ""
coverImage: "/assets/img/2024-05-12-RichTextEditorusingDraftJS_0.png"
date: 2024-05-12 23:18
ogImage: 
  url: /assets/img/2024-05-12-RichTextEditorusingDraftJS_0.png
tag: Tech
originalTitle: "Rich Text Editor using Draft.JS"
link: "https://medium.com/@vjnvisakh/rich-text-editor-using-draft-js-32603ec74cef"
---


그래도 봐, 요즘에는 보통의 텍스트 영역으로는 충분하지 않아. 요즘에는 가능한 모든 서식을 필요로 해서 고객들이 데이터를 인상적인 형식으로 제시할 수 있게 해야 해.

그런 상황에서 draft.js가 등장해. React 앱용 멋진 텍스트 편집기야. 우리가 어떻게 고객을 위해 텍스트 영역을 흥미롭게 만들었는지 여기에 나와 있어.

```js
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

type RichTextAreaProps = {
  name: string;
  onChange: (value: any) => void;
  onReset?: () => void;
  placeholder?: string;
  reset?: boolean;
  value: string;
};

const RichTextArea: React.FC<RichTextAreaProps> = ({
  name,
  onChange,
  value,
  placeholder = 'Enter Details',
  reset,
  onReset,
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);

    const rawContentState = editorState.getCurrentContent();
    const html = stateToHTML(rawContentState);

    onChange({
      target: {
        name,
        value: html,
      },
    });
  };

  useEffect(() => {
    const blocksFromHTML = convertFromHTML(value);
    const contentState = ContentState.createFromBlockArray(blocksFromHTML);
    setEditorState(EditorState.createWithContent(contentState));
  }, []);

  useEffect(() => {
    if (reset) {
      setEditorState(EditorState.createEmpty());

      const blocksFromHTML = convertFromHTML(value);
      const contentState = ContentState.createFromBlockArray(blocksFromHTML);

      setEditorState(EditorState.createWithContent(contentState));
      onReset();
    }
  }, [reset]);

  return (
    <div className="w-full bg-white p-2">
      <Editor
        name={name}
        placeholder={placeholder}
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        toolbar={{
          options: ['inline', 'fontSize', 'list', 'textAlign', 'link', 'image'],
          inline: {
            options: ['bold', 'italic', 'underline'],
          },
          list: {
            options: ['unordered', 'ordered'],
          },
          textAlign: {
            options: ['left', 'center', 'right'],
          },
          link: {
            defaultTargetOption: '_blank',
          },
          image: {
            defaultSize: {
              height: 'auto',
              width: '100%',
            },
          },
        }}
      />
    </div>
  );
};

export default RichTextArea;
```

- Editor는 draft.js에서 제공하는 구성요소야. 그냥 그것을 추가함으로써 기본 툴바가 있는 리치 텍스트 편집기를 얻을 수 있어.
- 툴바 prop을 사용하면 툴바에 표시하고 싶은 모든 형식을 사용자 정의할 수 있어.
- editorState는 사용자가 편집기에 입력하는 상태나 내용을 제어하는 것이야.
- Editor는 사실 formik과 연결돼 있어서 이름과 onChange 호출을 처리해.
- 기본적으로 편집기는 EditorState 객체를 반환하는데, 이를 의미 있게 만들기 위해 stateToHTML(rawContentState) 호출을 통해 HTML로 변환해야 해.
- 반대로 백엔드로 전송할 때 HTML로 변환되는 EditorState 객체에서 데이터를 로드할 때 ContentState.createFromBlockArray를 통해 이를 역으로 수행해야 해.



```js
<FormControl
  label="피드백"
  error={formik.touched.response && formik.errors.response}
>
  <RichTextArea
    name="피드백"
    value={formik.values.feedback}
    onChange={formik.handleChange}
  />
</FormControl>
```

이렇게 `RichTextArea` 컴포넌트를 사용합니다. `FormControl`은 실제로 formik 프로바이더를 이 안에 감쌉니다.

<img src="/assets/img/2024-05-12-RichTextEditorusingDraftJS_0.png" />

이렇게 보입니다.




행복한 코딩하세요!