---
title: "프론트엔드 머신 코딩 프로그래스 바 만들기 "
description: ""
coverImage: "/assets/img/2024-07-02-FrontendMachineCodingProgressBar_0.png"
date: 2024-07-02 21:35
ogImage:
  url: /assets/img/2024-07-02-FrontendMachineCodingProgressBar_0.png
tag: Tech
originalTitle: "Frontend Machine Coding: Progress Bar 📈"
link: "https://medium.com/@uttkarshsingh789/frontend-machine-coding-progress-bar-45ca8fa3e624"
isUpdated: true
---

**문제 설명:**

프로그레스 바를 구축하십시오. 이는 바의 중앙에 진행률 및 진행률 백분율을 표시해야 합니다. 사용자 정의 및 확장 가능해야 합니다. 또한 진행 상황 애니메이션을 표시해야 합니다.

프로그레스 바의 외관을 스타일링하는 데 창의성을 발휘할 수 있습니다.

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

미래에 들어올 요구 사항까지 고려하여 확장 가능한 솔루션을 만들어야 합니다.

해결책 ( Codesandbox 링크 )

여기서는 React js를 사용하여 솔루션을 개발할 것이며, Angular나 Vanilla js와 같은 다른 프레임워크/라이브러리를 사용하여도 됩니다.

단계 1: (컴포넌트 인터페이스)

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

저희 진행 상태 바 컴포넌트의 인터페이스를 정의하는 중입니다

```js
interface ProgressBarProps {
  value: number;
  onComplete: Function;
}
```

단계 2: (컴포넌트 DOM)

저희 ProgressBar 컴포넌트의 HTML을 작성하겠습니다

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
<div className="progress">
    <span>{value.toFixed()}%</span>
    <div style={width: value.toFixed()}%`}/>
</div>
```

Step 3: (ProgreeBar.js)

프로그레스바 컴포넌트를 완료해주세요. 백분율의 최대값이 100이기 때문에 최대치로 업데이트된다는 것을 고려하여 백분율의 다른 상태를 사용합니다. 최대값은 100입니다.

```js
import { useEffect, useState } from 'react';
import '../App.css'
interface ProgressBarProps {
    value: number;
    onComplete: Function;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({value = 0, onComplete= () => {}}) => {
    const [percentage, setPercentage] = useState<number>(value);

    useEffect(() => {
        setPercentage(Math.min(100, Math.max(value, 0)));
        if(percentage == 100) {
            onComplete();
        }
      }, [value])
    return (
        <div className="progress">
            <span>{percentage.toFixed()}%</span>
            <div style={width: `${percentage.toFixed()}%`}/>
        </div>
    )
}
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

단계 4: ( App.js )

원하는 곳에서 이 컴포넌트를 사용할 수 있습니다. 또한 진행 상황의 값을 어떤 비동기 작업에서든 가져올 수 있지만, 이를 복제하기 위해 setInterval을 사용하고 100ms 간격으로 값을 업데이트합니다.

```js
import { useEffect, useState } from "react";
import "./App.css";
import { ProgressBar } from "./components/Progressbar";

function App() {
  const [value, setValue] = useState < number > 0;

  useEffect(() => {
    setInterval(() => {
      setValue((value) => value + 1);
    }, 100);
  }, []);

  const handler = () => {
    // 어떤 함수 호출
  };

  return (
    <div className="App">
      프로그레스 바
      <ProgressBar value={value} onComplete={handler} />
    </div>
  );
}

export default App;
```

단계 5: (스타일링)

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

매우 간단한 스타일을 사용했기 때문에 모든 CSS를 하나의 파일에 작성했어요. 하지만 각 컴포넌트에 대해 다른 .css 파일을 사용하는 것이 좋다고 합니다. "함께 변하는 코드는 함께 있다"고 하죠.

```js
.App {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.progress {
  position: relative;
  height: 20px;
  width: 500px;
  background-color: rgb(233, 236, 239);
  border: 1px solid #c5c5c5;
  border-radius: 15px;
  overflow: hidden;
}

.progress div {
  background-color: green;
  height: 100%;
  text-align: center;
}

.progress span {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}
```

글이 마음에 들었으면 좋겠어요. 더 많은 기계 코딩 질문을 위해 팔로우해 주세요.

어떤 제안/개선 사항이라도 환영합니다 🤗.

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

테이블 태그를 마크다운 형식으로 변경해주세요.
