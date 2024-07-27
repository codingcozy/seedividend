---
title: "ReactJS에서 커스텀 Datepicker 만드는 방법"
description: ""
coverImage: "/ui-log-2/assets/img/2024-07-09-CustomDatepickerinReactJS_0.png"
date: 2024-07-09 18:35
ogImage:
  url: /assets/img/2024-07-09-CustomDatepickerinReactJS_0.png
tag: Tech
originalTitle: "Custom Datepicker in ReactJS"
link: "https://medium.com/@charanvinaynarni/custom-datepicker-in-reactjs-b8ed7dc47709"
---

날짜 선택기는 데이터 입력과 관련된 웹 개발에서 중요한 UI 구성 요소입니다. 다양한 라이브러리에서 많은 날짜 선택기가 제공되지만, 프로젝트의 요구 사항에 맞는 사용자 정의 날짜 선택기를 만드는 것이 항상 유용합니다.

![Custom Datepicker in ReactJS](/ui-log-2/assets/img/2024-07-09-CustomDatepickerinReactJS_0.png)

## 시작하기

이 튜토리얼에서는 React.js를 사용하여 사용자가 드롭다운 메뉴에서 날짜, 월, 년을 선택하여 날짜를 선택할 수 있는 사용자 정의 날짜 선택기를 만들어보겠습니다.

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

이 튜토리얼을 따라가려면 React.js와 useState()와 같은 훅에 대한 기본 지식이 필요합니다.

# 단계

이 앱을 만들기 위해 따를 단계는 다음과 같습니다:

- Create React App을 사용하여 새 React 프로젝트 설정하기.
- Datepicker 컴포넌트 구축하기
- Datepicker 컴포넌트 스타일링하기
- 결론
- 참고문헌

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

1단계: React 앱 설정하기

첫 번째 단계는 create-react-app을 사용하여 React 앱을 설정하는 것입니다. 이를 위해 터미널을 열고 다음 명령어를 입력하세요:

```js
npx create-react-app custom-datepicker
```

앱이 생성되면 프로젝트 디렉토리로 이동하세요:

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

```js
cd custom-datepicker
```

Step 2: Datepicker 구성요소 생성하기

이제 App.js 파일을 열고 다음 코드를 추가하여 DatePicker 구성요소를 만들어봅시다:

```js
<div className="d-flex" style={ height: "100dvh" }>
  <div className="app">
    <div className="app-heading d-flex w-100">
      <h2 className="app-heading_text">Custom</h2>
      <h2 className="app-heading_text text-primary">DatePicker</h2>
    </div>
    <div className="app-container d-flex">
      <div className="app-select">
        <p>DD</p>
        <select value={selectedDate} onChange={handleDateChange}>
          {renderDateOptions()}
        </select>
      </div>
      <div className="app-select">
        <p>MM</p>
        <select value={selectedMonth} onChange={handleMonthChange}>
          {renderMonthOptions()}
        </select>
      </div>
      <div className="app-select">
        <p>YYYY</p>
        <select value={selectedYear} onChange={handleYearChange}>
          {renderYearOptions()}
        </select>
      </div>
    </div>
    {finalDate && (
      <div className="app-format">
        <p>Selected date : </p>
        <p>{finalDate}</p>
      </div>
    )}
    {formats.map((format) => {
      return (
        <div className="app-format" key={format.id}>
          <p>{format.label} : </p>
          <p>{format.date}</p>
        </div>
      );
    })}
  </div>
</div>;
```

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

- app-container div은 세 개의 선택 요소인 날짜 선택기 입력을 표시합니다. 각 선택 요소에는 일, 월 또는 연도를 표시하는 레이블이 있으며, 옵션은 함수에 따라 동적으로 렌더링됩니다.
- 날짜 선택기 입력 아래에는 app-format 클래스를 가진 div가 있습니다. 이 div는 형식화된 방법으로 최종 날짜를 표시하며 유효한 최종 날짜 값이 있는 경우에만 표시됩니다.
- 마지막으로 구성 요소는 formats 배열을 사용하여 선택된 날짜에 대한 형식화된 추가 형식을 표시합니다. 각 app-format div에는 레이블과 선택된 날짜의 해당 날짜 형식이 표시됩니다.

![Custom Datepicker in ReactJS](/ui-log-2/assets/img/2024-07-09-CustomDatepickerinReactJS_1.png)

다음으로 각 드롭다운 옵션을 생성할 것입니다.

```js
const renderDateOptions = () => {
  const dateOptions = [
    <option key={0} value={""} disabled>
      선택
    </option>,
  ];

  for (let i = 1; i <= 31; i++) {
    dateOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return dateOptions;
};
```

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

이 함수는 "일" 선택 필드의 옵션을 생성합니다.

- 먼저 빈 문자열 값을 가지고 비활성화된 단일 옵션 요소로 구성된 배열을 생성합니다.
- 이는 선택 필드가 처음 렌더링될 때 나타나는 기본 옵션으로 사용됩니다.
- 함수는 그런 다음 1부터 31까지의 각 날에 대한 옵션 요소를 생성하기 위해 for 루프를 사용합니다.
- 각 옵션 요소는 날짜 번호로 설정된 key 속성과 또한 날짜 번호로 설정된 value 속성을 가집니다.
- 옵션 요소의 텍스트는 간단히 날짜 번호입니다.
- 마지막으로, 함수는 옵션 요소 배열을 반환합니다.

```js
const renderMonthOptions = () => {
  const monthOptions = [
    <option key={0} value={""} disabled>
      Select
    </option>,
  ];

  for (let i = 1; i <= 12; i++) {
    monthOptions.push(
      <option key={i} value={i}>
        {new Date(2000, i - 1, 1).toLocaleString("default", {
          month: "long",
        })}
      </option>
    );
  }

  return monthOptions;
};
```

이 함수는 "월" 선택 필드의 옵션을 생성합니다.

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

- 먼저, 빈 문자열 값을 가진 비활성화된 단일 옵션 요소로 구성된 배열을 생성합니다. renderDateOptions() 함수와 마찬가지로입니다.
- 함수는 for 루프를 사용하여 1월부터 12월까지의 각 월에 대한 옵션 요소를 생성합니다.
- 각 옵션 요소는 월 번호로 설정된 key 속성과 월 번호로 설정된 value 속성을 갖습니다.
- 옵션 요소의 텍스트는 year 속성을 2000으로, month 속성을 현재 월 번호로, day 속성을 1로 설정한 새 Date 객체에 대해 toLocaleString() 메서드를 사용하여 생성됩니다.
- toLocaleString() 메서드는 월 속성이 "long"으로 지정된 옵션 객체와 함께 호출되며, 월의 전체 이름을 반환합니다.
- 마지막으로, 함수는 옵션 요소의 배열을 반환합니다.

```js
const currentYear = new Date().getFullYear();
const renderYearOptions = () => {
  const yearOptions = [
    <option key={0} value={""} disabled>
      선택
    </option>,
  ];

  for (let i = currentYear; i >= 1900; i--) {
    yearOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return yearOptions;
};
```

이 함수는 연도 선택 필드의 옵션을 생성합니다.

- 먼저, 빈 문자열 값을 가진 비활성화된 단일 옵션 요소로 구성된 배열을 생성합니다. renderDateOptions() 함수와 마찬가지로입니다.
- 그런 다음, 현재 연도(currentYear 변수로 표시됨)부터 1900까지 연도 범위를 반복합니다.
- 범위 내 각 연도에 대해, key 속성이 연도로 설정된 새 옵션 요소를 생성하고, value 속성도 해당 연도로 설정합니다.
- 옵션 요소의 텍스트 콘텐츠는 단순히 연도 번호입니다.
- 마지막으로, 함수는 옵션 요소의 배열을 반환합니다.

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

![Custom Datepicker in ReactJS](/ui-log-2/assets/img/2024-07-09-CustomDatepickerinReactJS_2.png)

Options are also created. The next step is to handle the changes and store the selected date.

First, create five state variables:

```js
const [selectedDate, setSelectedDate] = useState("");
const [selectedMonth, setSelectedMonth] = useState("");
const [selectedYear, setSelectedYear] = useState("");
const [finalDate, setFinalDate] = useState(null);
const [formats, setFormats] = useState([]);
```

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

다음으로, 각 드롭다운을 변경하는 함수를 만들어 보겠습니다:

```js
const handleDateChange = (e) => {
  let { value } = e.target;
  setSelectedDate(value);
  updateSelectedDate(value, selectedMonth, selectedYear);
};

const handleMonthChange = (e) => {
  let { value } = e.target;
  setSelectedMonth(value);
  updateSelectedDate(selectedDate, value, selectedYear);
};

const handleYearChange = (e) => {
  let { value } = e.target;
  setSelectedYear(value);
  updateSelectedDate(selectedDate, selectedMonth, value);
};
```

이 함수들은 사용자 입력에 따라 선택한 날짜, 월, 연도에 대한 상태 값을 업데이트하는 이벤트 핸들러입니다.

사용자가 날짜를 변경할 때는 handleDateChange 함수가 호출됩니다.

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

- 이제 이벤트 객체에서 입력 값이 추출되고 setSelectedDate 훅을 사용하여 새로운 선택된 날짜 상태로 설정됩니다.
- 그런 다음 updateSelectedDate 함수를 호출하여 업데이트된 날짜 값 및 현재 월 및 연도 값을 전달합니다.

유사하게, 사용자가 월과 연도 입력을 변경할 때 handleMonthChange 및 handleYearChange 함수가 각각 호출됩니다.

해당 상태 값을 업데이트한 후 updateSelectedDate를 호출하여 세 개 필드의 업데이트된 값을 전달합니다.

```js
const updateSelectedDate = (date, month, year) => {
  if (date && month && year) {
    let formats = [];
    const formattedDate = new Date(year, month - 1, date);
    setFinalDate(formattedDate.toISOString());
    const dt = new Date(formattedDate);
    formats.push({
      id: 1,
      label: "YYYY-MM-DD",
      date: dt.toISOString().slice(0, 10),
    });
    formats.push({
      id: 2,
      label: "MM/DD/YYYY",
      date: `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()}`,
    });
    formats.push({
      id: 3,
      label: "DD-MM-YYYY",
      date: `${dt.getDate()}-${dt.getMonth() + 1}-${dt.getFullYear()}`,
    });
    setFormats([...formats]);
  }
};
```

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

updateSelectedDate 함수는 사용자가 각각의 드롭다운 메뉴에서 날짜, 월 또는 연도를 선택할 때 호출됩니다.

이 함수는 선택된 날짜, 월 및 연도를 매개변수로 받아 모든 세 가지가 선택되었는지 확인합니다. 세 가지가 모두 선택되었으면 빈 formats 배열을 생성한 다음 선택된 날짜, 월 및 연도를 사용하여 새 Date 객체를 생성합니다.

그런 다음 toISOString 메서드를 사용하여 ISO 문자열 형식의 선택된 날짜를 나타내는 finalDate 상태 변수를 설정합니다.
이 함수는 그런 다음 세 가지 다른 날짜 형식을 나타내는 id, label 및 date 속성을 포함하는 세 개의 객체를 생성합니다.

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

- 첫 번째 객체는 "YYYY-MM-DD" 형식을 사용합니다.
- 두 번째 객체는 "MM/DD/YYYY" 형식을 사용합니다.
- 그리고 세 번째 객체는 "DD-MM-YYYY" 형식을 사용합니다.

이러한 객체들은 그 다음에 formats 배열로 푸시되고 spread 연산자를 사용하여 이 배열의 사본을 가진 formats 상태 변수가 설정됩니다.

이렇게 함으로써 새로 생성된 날짜 객체로 formats 변수의 상태가 업데이트됩니다.

![Custom Datepicker in ReactJS](/ui-log-2/assets/img/2024-07-09-CustomDatepickerinReactJS_3.png)

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

전체 코드는 여기에 있어요:

```js
import React, { useState } from "react";
import "./App.css";

function App() {
  const currentYear = new Date().getFullYear();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [finalDate, setFinalDate] = useState(null);
  const [formats, setFormats] = useState([]);

  const handleDateChange = (e) => {
    let { value } = e.target;
    setSelectedDate(value);
    updateSelectedDate(value, selectedMonth, selectedYear);
  };

  const handleMonthChange = (e) => {
    let { value } = e.target;
    setSelectedMonth(value);
    updateSelectedDate(selectedDate, value, selectedYear);
  };

  const handleYearChange = (e) => {
    let { value } = e.target;
    setSelectedYear(value);
    updateSelectedDate(selectedDate, selectedMonth, value);
  };

  const updateSelectedDate = (date, month, year) => {
    if (date && month && year) {
      let formats = [];
      const formattedDate = new Date(year, month - 1, date);
      setFinalDate(formattedDate.toISOString());
      const dt = new Date(formattedDate);
      formats.push({
        id: 1,
        label: "YYYY-MM-DD",
        date: dt.toISOString().slice(0, 10),
      });
      formats.push({
        id: 2,
        label: "MM/DD/YYYY",
        date: `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()}`,
      });
      formats.push({
        id: 3,
        label: "DD-MM-YYYY",
        date: `${dt.getDate()}-${dt.getMonth() + 1}-${dt.getFullYear()}`,
      });
      setFormats([...formats]);
    }
  };

  const renderDateOptions = () => {
    const dateOptions = [
      <option key={0} value={""} disabled>
        선택
      </option>,
    ];

    for (let i = 1; i <= 31; i++) {
      dateOptions.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return dateOptions;
  };

  const renderMonthOptions = () => {
    const monthOptions = [
      <option key={0} value={""} disabled>
        선택
      </option>,
    ];

    for (let i = 1; i <= 12; i++) {
      monthOptions.push(
        <option key={i} value={i}>
          {new Date(2000, i - 1, 1).toLocaleString("default", {
            month: "long",
          })}
        </option>
      );
    }

    return monthOptions;
  };

  const renderYearOptions = () => {
    const yearOptions = [
      <option key={0} value={""} disabled>
        선택
      </option>,
    ];

    for (let i = currentYear; i >= 1900; i--) {
      yearOptions.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return yearOptions;
  };

  return (
    <div className="d-flex" style={ height: "100dvh" }>
      <div className="app">
        <div className="app-heading d-flex w-100">
          <h2 className="app-heading_text">Custom</h2>
          <h2 className="app-heading_text text-primary">DatePicker</h2>
        </div>
        <div className="app-container d-flex">
          <div className="app-select">
            <p>DD</p>
            <select value={selectedDate} onChange={handleDateChange}>
              {renderDateOptions()}
            </select>
          </div>
          <div className="app-select">
            <p>MM</p>
            <select value={selectedMonth} onChange={handleMonthChange}>
              {renderMonthOptions()}
            </select>
          </div>
          <div className="app-select">
            <p>YYYY</p>
            <select value={selectedYear} onChange={handleYearChange}>
              {renderYearOptions()}
            </select>
          </div>
        </div>
        {finalDate && (
          <div className="app-format">
            <p>선택한 날짜 : </p>
            <p>{finalDate}</p>
          </div>
        )}
        {formats.map((format) => {
          return (
            <div className="app-format" key={format.id}>
              <p>{format.label} : </p>
              <p>{format.date}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
```

단계 4: DatePicker 컴포넌트에 스타일링 추가하기

좋아 보이게 만들기 위해 스타일링을 추가해봅시다. src 디렉토리에 App.css라는 새 파일을 생성하고 다음 코드를 추가하세요:

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

```js
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap");
: root {
  --primary: #176ede;
  --bg-primary: #fff;
  --bg-secondary: #edf2f8;
  --bg-terinary: #fafafa;
  --body-bg: #f5f8ff;
  --box-bg: #fff;
  --input-bg: #f5f8ff;
  --txt-color: #2f2d2f;
  --txt-second-color: #ccc;
  --border-color: #4267b2;
  --box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

* {
  margin: 0;
  padding: 0;
  font-family: "Poppins", sans-serif! important;
}

body {
  font-weight: 400;
  line-height: 1.5;
  background-color: var(--bg-secondary);
  color: var(--txt-color);
  height: 100%;
}

p {
  font-size: 14px;
}

:: -webkit-scrollbar {
  width: 5px;
}

/* Track */
:: -webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
:: -webkit-scrollbar-thumb {
  border-radius: 50px;
  background: #d4d9e2;
}

.w-100 {
  width: 100%! important;
}

.d-flex {
  display: flex! important;
  justify-content: center! important;
  align-items: center! important;
}

.app {
  width: 400px;
  background-color: var(--box-bg);
  padding: 30px;
  border-radius: 20px;
  box-shadow: var(--box-shadow);
  margin: 0px 10px;
}

.app-heading {
  margin-bottom: 15px;
}

.app-heading_text {
  margin: 0px 5px;
}

.app-heading_text.text-primary {
  color: var(--primary);
}

.app-container {
  margin-bottom: 20px;
}

.app.app-select {
  width: 32%;
}

.app.app-select select {
  width: 100%;
  padding: 10px;
  outline: none;
  border-radius: 5px;
  border-color: #ccc;
}

.app.app-select: not(: last-child) {
  margin-right: 5px;
}

.app-format {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f3f5f7;
  padding: 10px;
  border-radius: 10px;
  margin: 10px 0px
}

.app-format> p: nth-child(2) {
  font-weight: bold;
  color: var(--primary);
}
```

이제 우리에게 사용자 정의된 날짜 선택기를 위한 기본 스타일이 제공됩니다.

# 결론

마지막으로, ReactJS를 사용하여 사용자 지정 날짜 선택기 구성 요소를 만들었습니다. 이 구성 요소를 통해 사용자는 날짜를 선택할 수 있으며 형식에 맞게 표시됩니다. 또한 선택된 날짜에 대한 추가 형식을 렌더링합니다. 이 날짜 선택기 구성 요소는 ReactJS 응용 프로그램에 쉽게 통합되어 사용자 정의 및 사용자 친화적인 날짜 선택기 기능을 제공할 수 있습니다.

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

# 참고 자료

여기서 소스 코드와 CSS 스타일을 찾을 수 있어요.
