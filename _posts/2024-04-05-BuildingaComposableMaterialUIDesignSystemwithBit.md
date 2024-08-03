---
title: "Building a Composable Material UI Design System with Bit"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Building a Composable Material UI Design System with Bit"
link: "https://medium.com/bitsrc/building-a-composable-material-ui-design-system-with-bit-875a0bdeaac8"
---



## 사용하기 쉽고 유지 보수하기 쉽고 확장하기 쉬운 구성 가능한 MUI 기반 디자인 시스템 만드는 방법

Material-UI는 Material Design의 미적 요소를 React의 기능성과 결합한 유명한 오픈 소스 UI 컴포넌트 라이브러리입니다. 그 다재다능성 덕분에 많은 기업들이 자사의 디자인 시스템을 구축하는 데 선호하는 선택지가 되었습니다.

본질적으로 디자인 시스템을 개발하는 궁극적인 목표는 널리 사용되는 것입니다. 사용자들은 위협적인 단일 구조보다는 조합 가능한 소프트웨어를 선호한다는 경험을 바탕으로 합니다.

# 구성 가능한 디자인 시스템이란 무엇인가요?

<div class="content-ad"></div>

컴포저블 디자인 시스템은 마치 건물 블록 모음처럼 구성되어 있습니다. 각 블록 또는 이 경우에는 구성 요소는 독립적으로 선택하고 사용할 수 있습니다. 이는 프로젝트의 요구 사항에 완벽하게 맞는 부분을 사용하여 디지털 제품을 구축할 수 있는 유연성과 자유를 나타냅니다. 필요한 것을 정확히 직접 선택할 수 있는 거대한 요소 라이브러리가 있는 상황을 상상해보세요.

컴포저블 디자인 시스템의 주요 이점 중 하나는 중복 업데이트를 피할 수 있는 능력입니다. 소규모 업데이트가 전체 시스템을 재구성해야 하는 거대 구조와 달리, 컴포저블 디자인 시스템은 구성 요소 수준에서 업데이트를 수행할 수 있습니다. 이는 더 빠르고 효율적인 업데이트와 시스템 관리에 소요되는 시간을 줄이는 것을 의미합니다.

또한, 컴포저블 디자인 시스템은 UI 구성 요소, 디자인 토큰 및 테마를 확장하고 사용자 정의할 수 있는 능력을 제공합니다. 개발자와 디자이너가 자신들만의 요구 사항에 따라 구성 요소를 사용뿐만 아니라 수정하고 향상시키는 것을 가능하게 합니다. 이는 표준화와 사용자 정의 사이의 간극을 줄이며 일관성과 혁신을 모두 고려한 섬세한 균형을 제공합니다.

![이미지](/assets/img/BuildingaComposableMaterialUIDesignSystemwithBit_0.png)

<div class="content-ad"></div>

모든 이러한 특성을 살려내고 정말로 구성 가능한 디자인 시스템을 만들기 위해 Bit를 사용할 것입니다.

Bit는 당신의 디자인 시스템의 모든 부분, 모든 구성 요소가 독립적으로 사용하고 맞춤화하고 확장될 수 있도록 보장하여 소프트웨어 개발에서 유연성과 효율성을 촉진합니다. 다음 섹션에서는 Bit가 어떻게 이러한 업적을 달성하는지 자세히 살펴보겠습니다. 어떤 다른 디자인 시스템과도 비교할 수 없는 구성 가능한 디자인 시스템을 용이하게 만들어주는 것입니다.

# 우리 디자인 시스템의 인벤토리

## 토큰

<div class="content-ad"></div>

디자인 시스템에서 토큰은 기본 요소로 생각할 수 있습니다. 색상, 타이포그래피, 간격, 그림자와 같은 원자 단위로, 디자인 시스템의 기본 시각적 및 기능적 측면을 지배합니다. 이러한 속성들은 다양한 구성 요소 전반에 걸쳐 활용되어 응용 프로그램 전체에서 일관된 외관과 느낌을 제공합니다. 토큰을 사용하면 디자인 결정을 대량으로 관리하고 적용하여 디자인 시스템을 보다 쉽게 유지 및 발전시킬 수 있습니다.

```js
{
  overline: {
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.5px',
    lineHeight: 2.5,
    textTransform: 'uppercase',
  },
  caption: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.66,
  }
}
```

간편함을 위해, 이 데모에는 독립적인 토큰 컴포넌트가 포함되어 있지 않고, 대신 MUI의 기본 스키마를 직접 구현하여 사용합니다.

## 테마

<div class="content-ad"></div>

테마는 디자인 시스템 전반의 미학을 정의하는 디자인 토큰의 일관된 모음입니다. 색상 구성표, 타이포그래피 스타일, 간격, 그림자 등을 포괄합니다. 테마는 디자인 시스템 전반에 걸쳐 일관성을 유지하며, 이는 일관된 사용자 경험을 촉진합니다.

합성 가능한 디자인 시스템에서 테마의 가장 강력한 점은 확장 가능성입니다. 일부 표준 스타일링 및 테마를 설정하는 기본 테마가 있을 수 있습니다. 그러나 특정 요구에 대응하려면 이러한 기본 테마를 확장하거나 덮어쓸 수 있습니다. 이는 조직의 기본 표준을 준수하면서도 요소를 특정 팀이나 프로젝트의 고유 요구에 맞게 맞출 수 있다는 것을 의미합니다.

예를 들어, 다음과 같이 'dark-theme'이 'base-theme'을 확장합니다:

![Building a Composable Material-UI Design System with Bit](/assets/img/BuildingaComposableMaterialUIDesignSystemwithBit_1.png)

<div class="content-ad"></div>

더 자세한 내용은 함께해서 테마 구성에 대한 이 튜토리얼을 시청해보세요:

## UI 컴포넌트

UI 컴포넌트는 응용 프로그램의 사용자 인터페이스를 구성하는 기본 요소입니다. 이들은 버튼, 카드, 드롭다운 또는 네비게이션 바와 같이 재사용 가능하고 독립적인 UI 조각입니다. 이러한 컴포넌트들은 디자인 토큰과 테마를 활용하여 시각적 및 기능적 일관성을 유지합니다.

구성 가능한 디자인 시스템에서 이러한 UI 컴포넌트들은 독립적으로 사용, 사용자 정의 및 확장할 수 있습니다. 이는 다양한 맥락에 적응할 수 있는 특정 기능을 갖춘 다양한 유용한 도구들로 가득한 도구 상자를 갖고 있는 것과 같습니다. 이는 코드 재사용성을 촉진하고 개발 속도를 높이며 시스템 전반의 유지 관리성을 향상시킵니다.

<div class="content-ad"></div>

Bit를 사용하면 디자인 시스템 요소를 효율적으로 관리할 수 있어요. Bit는 컴포넌트를 선택하고 업데이트를 피하며 UI 컴포넌트, 디자인 토큰 및 테마를 확장하고 사용자 프로젝트에 맞게 맞춤화할 수 있는 유연성을 제공해요. 이것이 참으로 조합 가능한 디자인 시스템의 본질이에요.

![Building a Composable Material UI Design System with Bit](/assets/img/BuildingaComposableMaterialUIDesignSystemwithBit_2.png)

# 디자인 시스템 시작하기

여기서 당신의 디자인 시스템에 구성 요소를 사용하는 방법을 확인할 수 있어요. 이 단계별 가이드를 통해 Bit를 설치하고 새 워크스페이스를 만들고 컴포넌트를 포크하고 그것들을 당신의 스코프로 내보내는 과정을 안내해 드릴게요.

<div class="content-ad"></div>

단계 1: Bit 설치하기

터미널에서 다음 명령어를 사용하여 머신에 Bit을 설치해보세요:

```js
npx @teambit/bvm install
```

이 명령어는 Bit Version Manager (BVM)를 통해 Bit을 다운로드하고 설치합니다.

<div class="content-ad"></div>

2단계: 새 작업 공간 생성하기

이제 구성 요소를 위한 새 작업 공간을 만들어야 합니다. 이를 수행하려면 'init' 명령어를 사용할 수 있습니다:

```js
bit init
```

이 명령은 현재 디렉토리에 새로운 Bit 작업 공간을 초기화합니다.

<div class="content-ad"></div>

3단계: 컴포넌트 포크

작업 환경을 준비한 후, 디자인 시스템에서 컴포넌트를 사용할 수 있습니다. '테마-프로바이더' 컴포넌트로 시작해 보겠습니다. 이를 프로젝트에서 사용하려면 작업 환경에 포킹해야 합니다:

```js
bit fork showoff.design/theme/theme-provider
```

'포크' 명령은 '테마-프로바이더' 컴포넌트의 사본을 작업 환경에 생성하여 필요에 맞게 수정할 수 있도록 합니다.

<div class="content-ad"></div>

테마 외에도 UI 구성 요소를 사용하고 싶을 때가 있죠. 예를 들어 'button' 컴포넌트를 포크해 봅시다:

```js
bit fork showoff.design/inputs/button
```

이러한 컴포넌트를 포크하면 필요에 맞게 수정할 수 있는 자유를 얻을 수 있어요. 선택한 UI 컴포넌트인 'button'은 좋은 예시입니다. 이 컴포넌트는 Material-UI의 버튼으로 둘러싸여 있죠. 둘러싸기의 장점은 여러 가지가 있어요.

첫째로, 이 컴포넌트를 광범위하게 사용자 정의할 수 있어요. 색상과 같은 기본 속성들을 설정하고 API를 필요에 맞게 조정할 수 있습니다. 둘째로, 미래에 기초 라이브러리(이 경우 Material-UI)를 바꾸기로 결정한다면, 우리의 버튼에 의존하는 다른 컴포넌트를 방해하지 않고 한 번에 바꿀 수 있습니다.

<div class="content-ad"></div>

**단계 4: 범위로 내보내기**

구성 요소에 필요한 변경사항을 완료했다면, 이제 해당 구성 요소를 당신의 범위로 내보내야 합니다. 이렇게 하면 다른 팀 또는 프로젝트에서 사용할 수 있습니다:

```js
bit export
```

이 명령은 수정한 구성 요소를 당신의 범위로 내보내어 프로젝트 전반에서 사용할 준비를 하게 합니다.

<div class="content-ad"></div>

완료했습니다! Bit를 성공적으로 설치했고, 새 워크스페이스를 만들고, 컴포넌트를 복제하고, 여러분의 범위로 내보냈습니다. 이제 여러분은 본인의 구성 가능한 디자인 시스템을 최대한 활용할 준비가 된 것입니다!

# 디자인 시스템 활용하기

만약 디자인 시스템의 구성 요소들을 사용하는 데 문제가 없고 단순히 프로젝트에서 사용하기만을 원한다면, 그냥 설치하면 됩니다. 이것은 구성 요소를 사용자 정의하거나 수정할 필요가 없을 때 뛰어난 선택지입니다.

예를 들어 '테마'와 'UI 구성 요소'를 설치하고 싶다면 다음 명령어를 사용할 수 있습니다:

<div class="content-ad"></div>

```js
npm install @showoff/design.theme
npm install @showoff/design.ui-component
```

이렇게 하면 지정된 컴포넌트가 프로젝트에 설치되고 즉시 사용할 수 있습니다.

컴포넌트는 편리하게 패키지로 배포되어 어떤 환경에서든 설치할 수 있지만, 그 이상의 역할을 한다는 것을 이해하는 것이 중요합니다.

각 Bit 컴포넌트는 자체 미니 리포지토리로, 코드, 의존성 및 버전 기록 등을 가지고 있습니다.```

<div class="content-ad"></div>

이 독특한 구조는 각 구성 요소를 독립적으로 개발, 버전 관리 및 관리할 수 있으면서 전통적인 패키지 관리자에서 발견되는 쉬운 설치 기능을 유지합니다.

구성 요소 간의 독립성과 통합의 쉬움 사이의 균형은 조합 가능한 디자인 시스템을 강력하고 효율적으로 만드는 주요 요소 중 하나입니다.

## 포트폴리오 쇼케이스

실제 프로젝트에서 이게 어떻게 작동하는지 예시를 살펴보겠습니다. 포트폴리오 웹사이트를 살펴보도록 하겠습니다. 이 웹사이트는 위에서 언급한대로 설치된 디자인 시스템에서 여러 구성 요소를 활용합니다.

<div class="content-ad"></div>

포트폴리오 웹사이트는 다양한 UI 컴포넌트와 테마를 보여주며, 통일되고 일관된 디자인 언어를 반영합니다.

![Building a Composable Material UI Design System with Bit](/assets/img/BuildingaComposableMaterialUIDesignSystemwithBit_3.png)

사용된 컴포넌트와 그 구성을 자세히 살펴보고 싶다면, 모든 컴포넌트가 Bit를 사용하여 추적 및 버전 관리되는 범위를 확인해보세요. 이를 통해 디자인 시스템이 실제 프로젝트에서 어떻게 활용되는지 명확히 이해할 수 있습니다.

기억하세요, 컴포넌트를 직접 설치하면 유지 관리 부담을 줄일 수 있습니다. 업데이트는 디자인 시스템에서 직접 처리되므로 프로젝트 구축에 좀 더 집중할 수 있습니다.

<div class="content-ad"></div>

# 디자인 시스템 확장

여기서 Bit가 등장하여 공백을 채웁니다. Bit를 사용하면 만든 모든 구성 요소를 독립적으로 버전 관리할 수 있습니다. 간단히 말해, 회사의 디자인 시스템에서 버튼 구성 요소를 통합했는데 디자인 팀에서 새 버전을 출시한 경우, 여러분은 손쉽게 구성 요소를 이 최신 버전을 활용하도록 업데이트할 수 있습니다.

이것은 전체 디자인 시스템 패키지를 업데이트하는 번거로움으로부터 해방됨을 의미합니다. Bit가 이러한 필요성을 제거합니다. 각 구성 요소를 독립적인 "프로젝트" 또는 "저장소"로 생각할 수 있습니다. 게다가, 버튼 구성 요소를 수정해야 할 경우, 작업 공간 내에서 손쉽게 변경 사항을 제안하고 lanes를 사용하여 디자인 팀에 편리하게 수정을 제안할 수 있습니다.

이 블로그 포스트에서는 이러한 측면과 더 많은 내용에 대해 자세히 살펴볼 것입니다. 언급된 개념을 설명하기 위해 예시 범위로 showoff.design을 선택했습니다. Showoff 조직은 개발자들이 자신의 능력을 소개하는 데 도움이 주는 것에 전념하고 있습니다. 개발자를 위해 특별히 제작된 구성 가능한 포트폴리오 앱을 제공합니다. 이 앱의 기반은 MUI 구성 요소로 완전히 구축된 디자인 범위이며, 모두 Bit에 의해 관리됩니다. 그러니 바로 시작해봅시다!

<div class="content-ad"></div>

## 디자인 시스템 개요

우리의 디자인 시스템 구축을 위한 우리의 방법론에서는 조립성이 중요합니다. 컴포넌트들은 scopes라고 불리는 논리적 단위로 그룹화되어 있으며, 이는 발견성과 이해를 높이는 데 도움이 됩니다.

![BuildingaComposableMaterialUIDesignSystemwithBit_4.png](/assets/img/BuildingaComposableMaterialUIDesignSystemwithBit_4.png)

우리가 살펴보는 조직은 다양한 MUI 컴포넌트들이 scopes로 그룹화되어 있으며, 각각이 고유한 기능을 제공합니다. 예를 들어, 어떤 scopes에는 시각적 표현이 없는 기본 컴포넌트가 포함되어 있고, 다른 scopes에는 이러한 기본 컴포넌트에 시각적 레이어를 추가합니다. 이러한 방식으로 컴포넌트를 조합함으로써 잠재적인 문제를 분리시킬 수 있어, 처리하기 쉬워집니다.

<div class="content-ad"></div>

showoff.dev의 범위에는 env와 같은 구성 요소가 포함되어 있습니다. 개발 환경('env') 구성 요소는 개발, 빌드 및 제공에 사용하는 도구 및 구성 요소의 모음입니다. 간단히 말하면, 당신의 개발 환경은 표준화되어 있으며 항상 설정한 구성 요소에 "붙어" 있음을 의미합니다. 예를 들어, Card 구성 요소는 React With Mui env를 사용하고 있으며 미리보기를 테마 제공자로 감싸면서(@mui/material을 피어 종속성으로 설정) 다른 다양한 작업을 수행합니다.

![이미지](/assets/img/BuildingaComposableMaterialUIDesignSystemwithBit_5.png)

하지만 디자인 범위로 돌아가 봅시다. 아래 사진에서는 구성 요소가 네임스페이스로 분할되어 있어 필요한 구성 요소를 찾기 쉽게 만들어 줍니다. 또한 구성 요소의 시각적 미리보기를 볼 수 있어 여러분의 요구 사항에 맞는지 이해하는 데 도움이 됩니다.

![이미지](/assets/img/BuildingaComposableMaterialUIDesignSystemwithBit_6.png)

<div class="content-ad"></div>

컴포넌트들은 분명히 MUI 라이브러리의 fragment를 사용하고 우리 조직에 맞는 변화를 줍니다. 예를 들어, Chip 컴포넌트는 이렇게 간단합니다:

```js
import React from 'react';
import { Chip as MuiChip } from '@mui/material';

export type ChipProps = {
  /**
   * The content of the chip.
   */
  content: string
};

export function Chip({ content }: ChipProps) {
  return (
    <MuiChip
      label={content}
      size="medium"
      sx={{
        "& .MuiChip-root": {
          borderRadius: '6px'
        },
        "& .MuiChip-label": {
          px: 0,
          py: '8px'
        }
      }}
    />
  );
```

일부 컴포넌트는 여러 'Bit MUI' 컴포넌트로 구성되어 있습니다. Header 컴포넌트를 살펴보세요:

```js
import React, { ReactNode } from 'react';
import { AppBar, Container, Box, Toolbar } from '@mui/material';
import { Typography } from '@showoff/design.typography.typography';
import { Link } from '@showoff/design.navigation.link';
import { HeaderLink } from './header.type';

export type HeaderProps = {
  logo: ReactNode;
  navLinks: HeaderLink[];
  themeToggle?: ReactNode;
};

export function Header({ logo, navLinks = [], themeToggle }: HeaderProps) {
...나머지 코드
```

<div class="content-ad"></div>

위에서 볼 수 있듯이, 내비게이션/링크 및 타이포그래피 컴포넌트를 사용합니다. 다음 섹션에서는 Bit 컴포넌트를 함께 구성하는 이점에 대해 논의할 것입니다.

## 독립적 버전 관리 및 자동 태깅

이 디자인 시스템을 구축하는 데 Bit가 제공하는 중요한 기능 중 하나는 컴포넌트의 독립적인 버전 관리입니다. 이는 만든 모든 컴포넌트를 전체 시스템에 중단 없이 별도로 업데이트할 수 있다는 것을 의미합니다. bit tag 명령을 사용하여 각 컴포넌트의 버전을 태깅할 수 있으며, 이는 git의 커밋과 유사한 프로세스입니다.

그러나 git 커밋과는 달리 전체 저장소의 상태를 저장하는 것이 아니라, Bit의 태깅 시스템은 각 컴포넌트의 상태를 독립적으로 잠그며 내보낼 수 있게 표시할 수 있도록 합니다. 이를 통해 컴포넌트를 내보낼 수 있도록 표시하고 그들의 모든 변경 사항을 추적할 수 있습니다.

<div class="content-ad"></div>

![Building a Composable Material UI Design System with Bit](/assets/img/BuildingaComposableMaterialUIDesignSystemwithBit_7.png)

만약 이전 섹션의 예제를 계속 진행한다면, 링크 또는 타이포그래피 컴포넌트 중 하나를 변경할 때마다 헤더 컴포넌트에도 업데이트가 트리거되어 새 버전이 릴리스될 것입니다.

이 리플 효과는 크로스-스코프 효과입니다. 개인 포트폴리오 스코프에서 네비게이션/앱바 컴포넌트는 헤더로부터 구성되어 있습니다. 이제 만약 링크 또는 타이포그래피를 변경하면 헤더와 앱바로도 리플이 발생할 것입니다.

![Building a Composable Material UI Design System with Bit](/assets/img/BuildingaComposableMaterialUIDesignSystemwithBit_8.png)

<div class="content-ad"></div>

<img src="/assets/img/BuildingaComposableMaterialUIDesignSystemwithBit_9.png" />

## 테마 설정과 스타일링

서로 다른 팀, 즉 scope로 불리는 팀들이 자신만의 스타일과 테마를 추가하여 디자인 시스템의 구조에 기여합니다. 일관성 제공과 개인화를 허용하는 섬세한 균형은 매우 중요합니다.

여기서 테마 제공자 컴포넌트가 필요한데, 고객이 필요에 맞게 속성을 조정할 수 있도록 합니다. 이곳에서 표준화와 개인화를 균형 있게 유지하는 것이 중요합니다. 테마 제공자는 테마 속성을 허용하여 개별적인 테마로 적용할 수 있도록 합니다. 그러나 테마 제공자의 소비자가 귀하의 조직 표준을 준수하는지 어떻게 보장할까요?

<div class="content-ad"></div>

해결책은 기본 테마 구성 요소를 확장하여 새 테마를 만드는 것입니다. 이 접근 방식을 통해 테마는 조직의 기본 표준과 일관성을 유지하면서도 팀의 요구에 따라 맞춤화할 수 있는 유연성을 제공합니다. 다음은 실제 예시입니다:

```js
import { themeCreator } from '@showoff/design.theme.theme-creator';
import { alpha, Theme, ThemeOptions } from '@mui/material';
import { baseTheme } from '@showoff/design.theme.base-theme';

/**
 * 구성된 다크 테마를 반환하는 함수
 * @param additionalConfigurations - 테마에 적용할 추가 구성
 * @returns 구성된 다크 테마
 */
export function darkTheme(additionalConfigurations?: ThemeOptions): Theme {
  return themeCreator(
    baseTheme(),
    {
      palette: {
        mode: 'dark',
        primary: {
          main: '#000',
        ...테마 나머지 부분
```

이 경우에는 필요에 따라 속성을 덮어쓰면서 기본 테마를 기반으로 사용합니다. 이 방법의 장점은 baseTheme이 업데이트될 때마다 확장된 테마가 이러한 변경 사항을 상속한다는 것입니다. 따라서 조직이 주요 색상을 수정하기로 결정하면 테마가 뒤처지지 않고 변경 사항을 매끄럽게 채택할 것입니다.

![이미지](/assets/img/BuildingaComposableMaterialUIDesignSystemwithBit_10.png)

<div class="content-ad"></div>

## 컴포넌트 배포하기 (내보내기/발행하기)

Bit는 컴포넌트를 배포하거나 발행하는 프로세스를 간소화합니다. 간단한 태깅 작업으로 컴포넌트가 다른 프로젝트 및 개발자와 공유할 준비가 됩니다.

Bit의 접근 방식의 독특한 기능은 개별 컴포넌트를 별도로 배포할 수 있는 컴포넌트 기반 아키텍처에 있습니다.

컴포넌트가 태그되면 Bit는 린팅, 테스팅, 빌드 및 패키징과 같은 일련의 작업을 트리거합니다. 이러한 단계는 각 소프트웨어 조각이 예상대로 작동하도록 보장합니다. 그리고 이 프로세스가 어떻게 보이는지는 환경 컴포넌트로 결정되기 때문에 이를 완전히 제어할 수 있습니다.

<div class="content-ad"></div>

![Building a Composable Material-UI Design System with Bit_11](/assets/img/BuildingaComposableMaterialUIDesignSystemwithBit_11.png)

새 버전을 릴리스할 때마다 Ripple CI가 움직입니다. 이를 통해 업데이트가 모든 종속 구성 요소를 통해 연쇄적으로 전파됩니다. 예를 들어, 제 동료이자 좋은 친구인 Oded Reuveny가 네비게이션 바 구성 요소를 업데이트한다고 가정해 봅시다. 이 단일 업데이트는 모든 종속 구성 요소 및 최종적으로 5가지 다양한 앱까지 이어지는 연쇄 효과를 일으킵니다. 이러한 업데이트는 각각의 호스트 서비스로 원활하게 배포되어 Ripple CI의 힘과 효율을 보여줍니다.

![Building a Composable Material-UI Design System with Bit_12](/assets/img/BuildingaComposableMaterialUIDesignSystemwithBit_12.png)

## 구성 요소 채택과 사용법

<div class="content-ad"></div>

Bit는 구성 요소를 채택하고 사용하는 프로세스를 간단하게 만들고자 합니다. 범위로 구분하여 구성되고 독립적인 버전 관리 기능을 제공하여 Bit는 명확하고 구조화된 환경을 제공합니다. 이를 통해 개발자들은 프로젝트에 구성 요소를 찾고, 이해하고 통합하는 것을 용이하게 할 뿐만 아니라 다양한 조직 프로젝트에 널리 사용되도록 장려합니다.

의존성으로 구성 요소를 포함하는 것은 작업 공간에 설치하는 것을 의미합니다:

```js
bit install @showoff/design.icons.bit
```

설치 후, 해당 구성 요소는 즉시 프로젝트에서 사용할 수 있습니다. 직접 만든 프로젝트 중 하나에서 이 구성 요소를 사용하면 Bit가 자동으로 의존성 그래프에 포함시킵니다. (아래 이미지 참조)

<div class="content-ad"></div>

<img src="/assets/img/BuildingaComposableMaterialUIDesignSystemwithBit_13.png" />

## 업데이트

Bit는 컴포넌트 업데이트를 효율적으로 관리하는 방법을 제공합니다. 개발자는 간편하게 컴포넌트를 수정하여 새로운 변경 사항이나 개선 사항을 포함할 수 있습니다. 각 컴포넌트를 독립적으로 버전 관리할 수 있는 기능은 업데이트를 더욱 관리하기 쉽게 만들어 주며, 전체 디자인 시스템 업데이트가 필요하지 않도록 컴포넌트별로 업데이트를 진행할 수 있습니다. 이는 시스템의 유연성과 관리성을 향상시킵니다.

앞 섹션에서 강조한 대로, Ripple CI를 사용하여 컴포넌트를 자동으로 업데이트할 수 있습니다. 그러나 수동 업데이트를 선호하는 경우, 명령어 `bit update`를 실행할 수 있습니다. 이 명령어는 컴포넌트의 최신 버전을 확인하고 업데이트할지 여부를 물어줍니다. 또한 컴포넌트 내 설치된 패키지의 업데이트를 확인하여 프로젝트를 최신 상태로 유지하고 효율적으로 사용할 수 있습니다.

<div class="content-ad"></div>

![BuildingaComposableMaterialUIDesignSystemwithBit_14.png](/assets/img/BuildingaComposableMaterialUIDesignSystemwithBit_14.png)

## 협업 및 변경 제안("레인")

Bit는 변경 제안을 쉽게 할 수 있도록하여 협업을 크게 향상시킵니다. 개발자가 컴포넌트를 수정해야 할 때, 그들은 자신의 작업 공간에서 변경 사항을 제안할 수 있습니다. 이는 시스템 개선과 최적화가 계속적으로 이루어지는 협력적인 생태계를 육성합니다.

다음 시나리오를 고려해보세요: 디자인 스코프에서 'inputs/button' 컴포넌트를 사용하고 있지만 현재 포함되어 있지 않은 확장된 API 기능을 버튼이 필요합니다. 이 상황을 어떻게 처리하는지 살펴보겠습니다:

<div class="content-ad"></div>

- showoff.design/inputs/button을 워크스페이스에 가져오세요.
- bit lane create extend-button-api로 새로운 레인을 만드세요.
- 컴포넌트의 소스 코드를 수정하여 변경 사항을 반영하세요.
- 변경 사항을 bit snap -m "extend the button api to support xyz"로 저장하세요.

레인을 내보내고 Ripple CI가 빌드한 후, 변경 요청(CR)을 생성하여 Button의 유지자에게 전달할 수 있습니다. 그들은 새 버전의 릴리스를 검토하고 승인할 수 있어, 협업 프로세스를 효율화할 수 있어요.

<img src="/assets/img/BuildingaComposableMaterialUIDesignSystemwithBit_15.png" />

## 결론

<div class="content-ad"></div>

요약하면, Bit는 디자인 시스템 구성요소의 라이프사이클을 관리하기 위한 포괄적인 솔루션을 제공하여 더 효과적이고 효율적이며 협업이 잘 되는 작업 환경을 조성합니다. 개별적으로 구성요소를 배포하는 것처럼 특정 기능을 잠그는 열쇠를 제공하는 것부터 직관적인 그룹화 및 독립적인 버전 관리를 통해 그 채용과 사용을 용이하게 합니다.

또한 Bit는 개별 구성요소 기준으로 변경과 개선 사항을 쉽게 통합할 수 있는 업데이트 프로세스를 간소화하여 전체 디자인 시스템을 업데이트하는 대신 개별 구성 요소를 업데이트합니다. 이 유연성은 시스템을 더 효율적이고 변화에 적응할 수 있도록 만듭니다.

게다가 Bit는 변경 제안이 쉽도록 협업을 유도하여 개발자가 자신의 작업 영역에서 구성요소를 수정하고 디자인 팀에 변경 사항을 제안할 수 있습니다. 이로써 시스템의 개선과 최적화가 계속되는 주기를 성과합니다.

Bit를 사용하면 단순히 구성요소를 관리하는 것이 아니라 소프트웨어 개발에 효율성, 유연성 및 협업을 통해 전진하는 활기찬 진화하는 생태계를 관리하게 됩니다. 조합 가능한 소프트웨어의 미래가 여기에 있습니다. 이제 더 이상 쉽게 접근할 수 있습니다.
