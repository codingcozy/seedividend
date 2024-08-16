---
title: "스토리북 컴포넌트 단위 테스트 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Unit tests"
link: "https://storybook.js.org/docs/writing-tests/stories-in-unit-tests"
isUpdated: true
---






다양한 도구를 사용하여 팀은 다양한 UI 특성을 테스트합니다. 각 도구는 동일한 구성 요소 상태를 반복해서 복제해야 합니다. 그것은 유지 관리의 머리 아픈 일이 됩니다. 이상적으로는 테스트를 비슷하게 설정하고 각 도구에서 재사용할 수 있도록 해야 합니다.

Storybook을 사용하면 구성 요소를 격리시키고 *.stories.js|ts 파일에 해당 사용 사례를 캡처할 수 있습니다. Stories는 전체 JavaScript 에코시스템과 호환되는 표준 JavaScript 모듈입니다.

Stories는 UI 테스트의 실용적인 시작점입니다. Jest, Testing Library, Vitest, Playwright 등의 도구로 stories를 가져와서 시간과 유지 관리 작업을 절약할 수 있습니다.

## Testing Library로 테스트 작성하기



Testing Library은 브라우저 기반 상호작용 테스트를 위한 도우미 라이브러리 스위트입니다. Component Story Format으로 Testing Library와 함께 사용하면 여러분의 스토리들을 재사용할 수 있습니다. 각각의 명명된 내보내기(스토리)는 여러분의 테스트 환경 내에서 렌더링될 수 있습니다. 예를 들어, 로그인 컴포넌트에 작업 중이고 잘못된 자격 증명 시나리오를 테스트하고 싶다면, 테스트를 다음과 같이 작성할 수 있습니다:

```typescript
import { fireEvent, render, screen } from '@testing-library/react';

import { composeStory } from '@storybook/react';

import Meta, { InvalidForm as InvalidFormStory } from './LoginForm.stories'; //👈 여기서 우리 스토리들을 가져왔습니다.

const FormError = composeStory(InvalidFormStory, Meta);

test('양식이 유효한지 확인합니다', () => {
  render(<FormError />);

  const buttonElement = screen.getByRole('button', {
    name: '제출',
  });

  fireEvent.click(buttonElement);

  const isFormValid = screen.getByLabelText('invalid-form');
  expect(isFormValid).toBeInTheDocument();
});
```

테스트가 실행되면 스토리가 로드되어 렌더링됩니다. Testing Library는 그러면 사용자 동작을 모방하고 컴포넌트 상태가 업데이트되었는지 확인합니다.

## 설정하기



기본적으로 Storybook은 React 및 다른 프레임워크에 대해 제로 구성 설정을 제공하며 애드온을 통해 스토리를 Testing Library를 사용하여 테스트로 실행할 수 있습니다. 그러나 테스트를 실행하고 스토리북 인스턴스에서 특정 구성(예: 전역 데코레이터, 매개변수)을 설정한 경우 테스트에서 사용하려면 해당 구성을 포함한 테스트 설정을 확장해야 합니다. 이를 위해 다음과 같이 setup.js|ts 파일을 만듭니다:

```typescript
// Storybook의 미리보기 파일 위치
import * as globalStorybookConfig from './.storybook/preview';

import { setProjectAnnotations } from '@storybook/react';

setProjectAnnotations(globalStorybookConfig);
```

구성 파일을 포함하도록 테스트 스크립트를 업데이트합니다:

```typescript
{
  "scripts": {
    "test": "react-scripts test --setupFiles ./setupFile.js"
  }
}
```



### 스토리 속성 재정의하기

기본적으로 setProjectAnnotations 함수는 Storybook 인스턴스에서 정의한 전역 구성 (예: preview.js|ts 파일 내의 매개변수, 데코레이터)를 삽입해 기존 테스트에 주입합니다. 그러나 이는 의도하지 않은 전역 구성을 사용하지 않을 테스트에 예상치 못한 부작용을 일으킬 수 있습니다. 이를 피하기 위해 composeStory 또는 composeStories 함수를 확장하여 테스트별 구성을 제공하여 전역 구성을 재정의할 수 있습니다. 예를 들면 아래와 같습니다:

```typescript
import { composeStory } from '@storybook/react';

import Meta, { ValidForm as ValidFormStory } from './LoginForm.stories';

const FormValidation = composeStory(ValidFormStory, Meta, {
  decorators: [
    // 이곳에 스토리 레벨 데코레이터를 정의합니다
  ],
  globalTypes: {
    // 이곳에 전역 타입을 정의합니다
  },
  parameters: {
    // 이곳에 스토리 레벨 매개변수를 정의합니다
  },
});
``` 

## 단일 스토리에서 테스트 실행



단일 스토리에서 테스트를 실행하려면 적절한 프레임워크 또는 지원되는 애드온에서 제공하는 composeStory 함수를 사용할 수 있습니다. 그러나 이 방법을 사용하는 경우, composeStory 함수에 스토리 메타데이터(즉, 기본 내보내기)를 제공하는 것이 좋습니다. 이를 통해 테스트가 스토리에 대한 올바른 정보를 정확하게 판별할 수 있습니다. 아래 예시를 참고하세요:

```typescript
import { fireEvent, render, screen } from '@testing-library/react';
import { composeStory } from '@storybook/react';

import Meta, { ValidForm as ValidFormStory } from './LoginForm.stories';

const FormOK = composeStory(ValidFormStory, Meta);

test('폼 유효성 검사', () => {
  render(<FormOK />);

  const buttonElement = screen.getByRole('button', {
    name: '제출',
  });

  fireEvent.click(buttonElement);

  const isFormValid = screen.getByLabelText('invalid-form');
  expect(isFormValid).not.toBeInTheDocument();
});
```

## 여러 스토리를 하나의 테스트로 결합하기

하나의 테스트에서 여러 스토리를 테스트하려면 적절한 프레임워크나 지원되는 애드온에서 제공하는 composeStories 함수를 사용하세요. 이 함수는 지정된 모든 컴포넌트 스토리를 처리하며, 정의된 args나 데코레이터를 포함합니다. 아래 예시를 참고하세요:



```typescript
import { fireEvent, render, screen } from '@testing-library/react';

import { composeStories } from '@storybook/react';

import * as FormStories from './LoginForm.stories';

const { InvalidForm, ValidForm } = composeStories(FormStories);

test('Tests invalid form state', () => {
  render(<InvalidForm />);

  const buttonElement = screen.getByRole('button', {
    name: 'Submit',
  });

  fireEvent.click(buttonElement);

  const isFormValid = screen.getByLabelText('invalid-form');
  expect(isFormValid).toBeInTheDocument();
});

test('Tests filled form', () => {
  render(<ValidForm />);

  const buttonElement = screen.getByRole('button', {
    name: 'Submit',
  });

  fireEvent.click(buttonElement);

  const isFormValid = screen.getByLabelText('invalid-form');
  expect(isFormValid).not.toBeInTheDocument();
});
```

## 해결책

### 다른 프레임워크에서 테스트 실행

Storybook은 Vue 2 및 Angular와 같은 다른 프레임워크용 커뮤니티 주도 애드온을 제공합니다. 그러나 이러한 애드온들은 아직 최신 안정 버전의 Storybook을 지원하지 않습니다. 협력하려면 Github 및 Discord 서버와 같은 기본 커뮤니케이션 채널을 통해 유지 관리자에게 연락하는 것을 추천합니다.



### 테스트에 전달된 args가 없음

`composeStories` 또는 `composeStory`로 반환된 컴포넌트는 React 컴포넌트로 렌더링될 수 있을 뿐만 아니라 이야기, 메타 및 전역 구성에서 결합된 속성을 가지고 있습니다. 이는 예를 들어 args 또는 매개변수에 액세스하려는 경우 다음과 같이 할 수 있다는 것을 의미합니다:

```typescript
import { render, screen } from '@testing-library/react';

import { composeStories } from '@storybook/react';

import * as stories from './Button.stories';

const { Primary } = composeStories(stories);

test('reuses args from composed story', () => {
  render(<Primary />);

  const buttonElement = screen.getByRole('button');
  // 스토리에서 오는 값에 대해 테스트합니다! 중복이 필요없습니다.
  expect(buttonElement.textContent).toEqual(Primary.args.label);
});
```

기타 UI 테스트 방법에 대해 알아보세요.



- 테스트 실행을 자동화하는 테스트 러너
- 외형을 위한 시각적 테스트
- 접근성을 위한 접근성 테스트
- 사용자 행동 시뮬레이션을 위한 상호 작용 테스트
- 코드 커버리지 측정을 위한 커버리지 테스트
- 렌더링 오류 및 경고에 대한 스냅샷 테스트
- 실제 사용자 시나리오를 시뮬레이션하는 엔드 투 엔드 테스트
- 기능성을 위한 단위 테스트