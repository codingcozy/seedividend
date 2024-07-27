---
title: "리액트 네이티브 또는 엑스포 앱에서의 I18n"
description: ""
coverImage: "/assets/img/2024-05-14-I18ninYourReactNativeorExpoApps_0.png"
date: 2024-05-14 11:51
ogImage: 
  url: /assets/img/2024-05-14-I18ninYourReactNativeorExpoApps_0.png
tag: Tech
originalTitle: "I18n in Your React Native or Expo Apps"
link: "https://medium.com/@adherentxu/i18n-in-your-react-native-or-expo-apps-eb92a1a8b1b5"
---


<img src="/assets/img/2024-05-14-I18ninYourReactNativeorExpoApps_0.png" />

현대 기술 생태계에서 지리적 경계를 넘어 전 세계 관객을 대상으로 서비스를 제공하는 것이 예외가 아닌 표준이 되었습니다.

i18n-js로 시작하기

# 설치



```js
# npm
npm install i18n-js expo-localization

# yarn
yarn add i18n-js expo-localization

# pnpm
pnpm add i18n-js expo-localization

# bun
bun add i18n-js expo-localization
```

## 그런 다음 루트 또는 src 폴더에 i18n.ts 파일을 생성하십시오.

```js
// (root)/src/lib/i18n.ts
import { I18n } from "i18n-js";
import { getLocales } from "expo-localization";

export const deviceLanguage = getLocales()?.[0]?.languageCode ?? "en";

export const i18n = new I18n({
  en: {
    hello: "hello %{name}!"
  },
  zh: {
    hello: "안녕하세요 %{name}!"
  },
});

i18n.defaultLocale = deviceLanguage;

i18n.locale = deviceLanguage;
```

## 그러면 locales 폴더에 다국어 JSON 파일을 생성할 수 있습니다.



```js
// (root)/src/locales/en.json
{
 hello: "안녕 %{name}!"
}
```

```js
// (root)/src/locales/zh.json
{
 hello: "안녕하세요 %{name}!"
}
```

i18n.ts 변경사항

```js
// (root)/src/lib/i18n.ts
import { I18n } from "i18n-js";
import { getLocales } from "expo-localization";
+import en from '../locales/en.json';
+import zh from '../locales/zh.json';

export const deviceLanguage = getLocales()?.[0]?.languageCode ?? "en";

export const i18n = new I18n({
+  en,
+  zh,
});

i18n.defaultLocale = deviceLanguage;

i18n.locale = deviceLanguage;
```



이제 컴포넌트에서 사용할 수 있어요. 여기 컴포넌트에서 translate 함수를 사용하는 예시가 있어요.

```js
// example.tsx
import { i18n } from '../lib/i18m';

function Example() {
 return <div>{i18n.t("hello", {name: "Toy"})}</div>
}
```

하지만 로컬을 변경하고 싶어요, 어떻게 해야 할까요?

걱정 마세요, i18n.ts 파일에 changeLanguage 함수를 정의할 수 있어요.



```js
// (root)/src/lib/i18n.ts
import { I18n } from "i18n-js";
import { getLocales } from "expo-localization";
import en from '../locales/en.json';
import zh from '../locales/zh.json';

export const deviceLanguage = getLocales()?.[0]?.languageCode ?? "en";

export const i18n = new I18n({
  en,
  zh,
});

i18n.defaultLocale = deviceLanguage;
i18n.locale = deviceLanguage;

+ export function changeLanguage(lang: string) {
+  i18n.locale = lang;
+ }
```

그런 다음 이 함수를 언어 변경 컴포넌트에 사용할 수 있습니다.

```js
// example.tsx
import { i18n, changeLanguage } from '../lib/i18n';
import { View, Button } from 'react-native';

function Example() {
 return (
  <View>
   <View>{i18n.t("hello", {name: "Toy"})}</View>
   <Button onPress={() => changeLanguage('zh')} title="언어 변경"/>
  </View>
 );
}
```

너무 간단해 보이지 않나요? 이 패키지는 매우 강력하고 실용적입니다.




이 라이브러리는 Rails-i18n에서 제공하는 기본 번역을 사용할 수 있습니다.

마지막으로, i18n-js에서 더 많은 정보를 읽으려면 공식 문서로 이동할 수 있습니다.

React Native 및 Expo 앱에서 i18n을 채택하면 미래를 대비한 글로벌 확장의 길이 열립니다. 국제화는 일회성 작업이 아닌 앱이 전 세계에서 관련성을 유지하고 접근성이 있으며 사용자 친화적인 지속적인 의무라는 것을 명심해야 합니다.

경험 많은 개발자이든 처음 국제화를 시작하는 중이든, 전 세계적인 모바일 앱을 개발하는 길은 당신 손안에 있으며, i18n-js는 이 추구에서 믿을 수 있는 동료입니다. React Native 및 Expo 앱의 최대 잠재력을 발휘하여 세계의 언어로 강화시키는 시간입니다.



이 기사를 읽어 주셔서 감사합니다. 최대한 많이 박수/추천 해 주시고 친구들과 공유도 꼭 해주세요. 제게는 매우 중요한 일이죠.