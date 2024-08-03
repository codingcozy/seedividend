---
title: "Storybook addon 기초 사용 방법 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Addon knowledge base"
link: "https://storybook.js.org/docs/addons/addon-knowledge-base"
---




애드온 작성 기초를 이해하면 애드온을 더 좋게 만드는 다양한 공통 개선 방법이 있습니다. 이 페이지에는 애드온 생성에 대한 추가 정보가 나와 있어요. 여러분이 직접 애드온을 만들 때 빠르고 쉽게 참고하실 수 있도록 가이드로 활용해보세요.

### 애드온 패널 비활성화

특정 이야기의 애드온 패널을 비활성화하는 것이 가능합니다.

그를 가능하게 하려면 패널을 등록할 때 paramKey 요소를 전달해야 합니다:



```typescript
addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: '내 애드온',
    render: () => <div>애드온 탭 내용</div>,
    paramKey: 'myAddon', // 이 요소
  });
});
```

그리고 스토리를 추가할 때 disabled 매개변수를 전달할 수 있습니다.

```typescript
// 'your-framework'를 사용 중인 프레임워크 이름으로 바꿉니다
import type { Meta } from '@storybook/your-framework';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  /* 👇 title 프로퍼티는 선택 사항입니다.
   * 자동 제목 생성 방법을 알아보려면 https://storybook.js.org/docs/configure/#configure-story-loading 참조
   */
  title: 'Button',
  component: Button,
  parameters: {
    myAddon: { disable: true }, // 애드온을 비활성화합니다
  },
};

export default meta;
```

### 애드온 스타일링하기```



Storybook은 스타일링을 위해 Emotion을 사용합니다. 그리고 사용자 정의할 수 있는 테마도 제공해요!

애드온의 UI 컴포넌트를 스타일링하기 위해 Emotion을 사용하는 것을 권장합니다. 이렇게 하면 활성화된 Storybook 테마를 활용하여 일관된 개발자 경험을 제공할 수 있어요. 만약 Emotion을 사용하지 않으려면 인라인 스타일이나 다른 css-in-js 라이브러리를 사용할 수도 있어요. Emotion의 withTheme HOC를 사용하여 속성으로 테마를 받아올 수 있어요. 테마에 대해 더 알아보기.

### Storybook 컴포넌트

애드온 작성자들은 React 라이브러리를 사용하여 자신의 UI를 개발할 수 있어요. 하지만 Storybook의 UI 컴포넌트인 @storybook/components를 사용하여 애드온을 더 빨리 구축하는 것이 좋아요. Storybook 컴포넌트를 사용하면 다음과 같은 이점을 얻을 수 있어요:



- 실전에서 검증된 완성품 컴포넌트
- Storybook 기본 룩 앤 필
- Storybook 테마 지원 기능 내장

다음에 제공된 컴포넌트를 다음 애드온에서 사용하세요.

컴포넌트에 보완하는 것으로 UI 기본 요소 집합이 포함되어 있습니다. 애드온 스타일링을 위한 참고 자료로 아래 내용을 사용하세요.

### 빌드 시스템



만약 애드온을 패키지로 개발 중이라면 `npm link`를 사용하여 프로젝트에 추가할 수 없습니다. 애드온을 `package.json` 파일에 로컬 종속성으로 나열해주세요:

```js
{
  "dependencies": {
    "@storybook/addon-controls": "file:///home/username/myrepo"
  }
}
```

### 핫 모듈 교체

애드온을 개발하는 동안 변경 사항을 반영하려면 HMR(핫 모듈 교체)을 구성할 수 있습니다.



### 스탠드얼론 Storybook 애드온

스탠드얼론 애드온을 개발 중이라면, 다음과 같이 package.json에 새 스크립트를 추가해주세요:

```js
{
  "scripts": {
    "start": "npm run build -- --watch"
  }
}
```

#### 로컬 Storybook 애드온



만약 기존 Storybook 설치 위에서 구축된 로컬 Storybook 애드온을 개발하고 있다면, HMR(핫 모듈 교체)은 기본 제공됩니다.

### 프리셋 내에서 애드온 작성

만약 제어할 수 없는 서드파티 애드온을 로드하는 프리셋을 작업 중이고 특정 기능(예: 데코레이터)에 액세스하거나 추가 구성을 제공해야하는 경우 프리셋을 업데이트해야 합니다. 이를 위해 다른 애드온을 로드하고 구성할 수 있도록 아래와 같이 프리셋을 업데이트해야 합니다:

```typescript
function managerEntries(entry = []) {
  return [...entry, require.resolve('my-other-addon/register')];
}

const config = (entry = [], options) => {
  return [...entry, require.resolve('my-other-addon/addDecorator')];
};

export default {
  managerEntries,
  config,
};
```



만약 당신이 커스터마이즈하고 싶은 애드온을 제어할 수 있다면, 그 경우에 당신은 프리셋을 업데이트하고 필요한 설정을 제공하며 추가 프리셋을 로드하기 위한 사용자 정의 함수를 구현할 수 있습니다. 이는 Essentials 애드온에서 구현된 방식과 유사합니다.