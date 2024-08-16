---
title: "Reactjs 앱에서 Google 번역 API를 이용한 언어 번역 구현하기"
description: ""
coverImage: "/assets/img/2024-05-12-BuildingLanguageTranslationinaReactjsAppwithGoogleTranslateAPI_0.png"
date: 2024-05-12 22:23
ogImage: 
  url: /assets/img/2024-05-12-BuildingLanguageTranslationinaReactjsAppwithGoogleTranslateAPI_0.png
tag: Tech
originalTitle: "Building Language Translation in a React.js App with Google Translate API"
link: "https://medium.com/@vipinnation/building-language-translation-in-a-react-js-app-with-google-translate-api-45e1236e2bad"
isUpdated: true
---




![이미지](/assets/img/2024-05-12-BuildingLanguageTranslationinaReactjsAppwithGoogleTranslateAPI_0.png)

React.js 애플리케이션에 언어 번역 기능을 통합하고 싶으신가요? Google Translate API를 사용하면 쉽게 이 목표를 달성할 수 있습니다. React.js 프로젝트에서 언어 번역 기능을 설정하고 구현하는 간단한 단계를 따라보세요.

1. Google Cloud 프로젝트 설정:

- Google Cloud Console로 이동합니다.
- 새 프로젝트를 생성하거나 기존 프로젝트를 선택합니다.
- 프로젝트에 "Cloud Translation API"를 활성화합니다.



2. API 키 얻기:

- 클라우드 콘솔에서 “API 및 서비스" → “자격 증명"으로 이동합니다.
- 새 API 키를 생성합니다.
- API 요청을 만들 때 이 API 키가 필요하므로 이를 접근 가능한 상태로 유지하세요.

3. 종속성 설치:

- React.js 프로젝트의 터미널을 열고 필요한 패키지를 설치하세요.



```js
npm install axios
```

4. API 요청 생성:

- API 요청을 처리할 새 파일을 만듭니다. 예를 들어 GoogleTranslate.js 파일을 만듭니다.
- Axios를 활용하여 Google 번역 API로 요청을 보냅니다.

```js
// GoogleTranslate.js
import axios from 'axios';

const API_KEY = 'YOUR_GOOGLE_TRANSLATE_API_KEY';
const API_URL = 'https://translation.googleapis.com/language/translate/v2';

const translateText = async (text, targetLanguage) => {
  const response = await axios.post(
    `${API_URL}?key=${API_KEY}`,
    {
      q: text,
      target: targetLanguage,
    }
  );

  return response.data.data.translations[0].translatedText;
};

export default translateText;
```



## 제목: Google 번역 API를 사용한 React.js 앱에서 언어 번역 기능 구축하기

React.js 애플리케이션에 언어 번역 기능을 통합하고 싶나요? Google 번역 API를 사용하면 쉽게 이 목표를 달성할 수 있어요. React.js 프로젝트에서 언어 번역 기능을 설정하고 구현하는 간단한 단계를 따라보세요.

1. Google Cloud 프로젝트 설정:

- Google Cloud Console로 이동합니다.
- 새 프로젝트를 만들거나 기존 프로젝트를 선택합니다.
- 프로젝트에 "Cloud 번역 API"를 활성화합니다.



2. API 키 얻기:

- 클라우드 콘솔에서 "API 및 서비스" > "자격 증명"으로 이동합니다.
- 새 API 키를 생성합니다.
- API 요청을 만들 때 필요하므로 이 API 키를 접근 가능한 상태로 유지하세요.

3. 종속성 설치:

- React.js 프로젝트의 터미널을 열고 필요한 패키지를 설치하세요:



```js
npm install axios
```

4. API 요청 생성하기:

- API 요청을 처리하는 새 파일을 만듭니다. 예를 들어, GoogleTranslate.js와 같이 지정할 수 있습니다.
- Axios를 활용하여 Google 번역 API에 요청을 보냅니다.

```js
import axios from 'axios';
```



```js
const API_KEY = 'YOUR_GOOGLE_TRANSLATE_API_KEY';
const API_URL = 'https://translation.googleapis.com/language/translate/v2';
const translateText = async (text, targetLanguage) => {
  const response = await axios.post(
    `${API_URL}?key=${API_KEY}`,
    {
      q: text,
      target: targetLanguage,
    }
  );
  return response.data.data.translations[0].translatedText;
};
export default translateText;
```

5. React 컴포넌트에 통합하기:

- React 컴포넌트에서 translateText 함수를 사용합니다.
- 사용자가 텍스트를 입력하는 input 필드와 대상 언어를 선택하는 드롭다운을 가정합니다.
- 사용자가 텍스트를 입력하고 언어를 선택하면 번역을 트리거합니다.

```js
// App.js
import React, { useState } from 'react';
import translateText from './GoogleTranslate';

function App() {
  const [inputText, setInputText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es'); // 기본값: 스페인어

  const handleTranslate = async () => {
    if (inputText) {
      const translatedText = await translateText(inputText, targetLanguage);
      // 번역된 텍스트를 처리합니다. 예: 페이지에 표시
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <select
        value={targetLanguage}
        onChange={(e) => setTargetLanguage(e.target.value)}
      >
        <option value="es">스페인어</option>
        <option value="fr">프랑스어</option>
        {/* 다른 언어 옵션 추가 */}
      </select>
      <button onClick={handleTranslate}>번역</button>
    </div>
  );
}

export default App;
```



지금 ‘GoogleTranslate.js’ 파일에 있는 ‘YOUR_GOOGLE_TRANSLATE_API_KEY’를 실제 API 키로 교체하세요. 이제 React.js 애플리케이션을 더욱 향상시킬 수 있는 원활한 언어 번역 기능을 사용할 준비가 끝났습니다!

요약하자면, Google Translate API를 React.js 앱에 통합하면 언어 번역이 간편해지며 전 세계적인 접근성이 향상됩니다. 초기 설정 복잡성에도 불구하고, 이 프로세스는 직관적인 UI 구성 요소로 사용자 친화적인 경험을 제공합니다. 이 방식은 언어 장벽을 허물어 포용력을 키우고 React.js 응용 프로그램에서 다양한 언어 선호도에 대한 유연한 플랫폼을 만듭니다.