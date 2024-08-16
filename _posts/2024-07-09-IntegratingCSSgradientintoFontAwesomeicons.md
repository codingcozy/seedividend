---
title: "Font Awesome 아이콘에 CSS 그라디언트 적용하는 방법"
description: ""
coverImage: "/assets/img/2024-07-09-IntegratingCSSgradientintoFontAwesomeicons_0.png"
date: 2024-07-09 18:37
ogImage: 
  url: /assets/img/2024-07-09-IntegratingCSSgradientintoFontAwesomeicons_0.png
tag: Tech
originalTitle: "Integrating CSS gradient into Font Awesome icons"
link: "https://medium.com/payoneer-engineering/integrating-css-gradient-into-font-awesome-icons-a3cc20bdd0fa"
isUpdated: true
---



![Payoneer branding strategy](/assets/img/2024-07-09-IntegratingCSSgradientintoFontAwesomeicons_0.png)

Payoneer의 유니버설 브랜딩 전략은 다채로운 컬러 쉐이드를 포괄하는 화려한 그라데이션 패턴으로 특징 지어집니다. 이 패턴은 회사 로고, 배경, UI 요소 및 사용자 정의된 복잡한 아이콘 이미지에 특징적으로 나타납니다. 전반적인 디자인 프로세스를 간소화하기 위해 오픈 소스 Font Awesome 아이콘과 툴킷을 통합했습니다. 저희 팀은 Payoneer 브랜드 그라데이션 패턴으로 아이콘을 브랜딩하는 작업을 맡았습니다. 이 포스트에서는 관련 기술을 설명하고 간단한 해결책을 제공합니다.

오늘날의 세상에서는 웹 애플리케이션을 구축하는 것이 복잡한 작업입니다. 현대적인 웹 앱은 가볍고, 확장 가능하며, 유지 보수가 용이하고 다재다능하며 시각적으로 매력적인 특성을 필요로 합니다. CSS 스타일 시트 언어는 이러한 모든 요구 사항을 충족시키기 위해 발전해 왔습니다.

# CSS 그라데이션 이미지

<div class="content-ad"></div>

CSS 그라데이션 이미지는 웹 디자인에 깊이와 시각적 매력을 더하는 강력한 도구입니다. 여러 색상을 원활하게 혼합하고 복잡한 그라데이션 효과를 만들 수 있는 능력으로 현대 웹 개발의 중요한 구성 요소가 되었습니다. 이에 따라 다음은 그것에 대한 몇 가지 이점입니다:

**S** - 크기 조정 가능 및 유지가능: CSS 그라데이션은 코드를 통해 매우 쉽게 제어할 수 있습니다. 애니메이션을 추가하고 크기를 조절하고 색상을 변경하며 스크롤 동작에 기반한 패턴을 동적으로 변경할 수 있습니다.

**L** - 경량화: CSS 그라데이션은 래스터 이미지보다 더 빠르게 로드되므로 선호됩니다. CSS 그라디언트 이미지 대 배경 이미지 파일의 빠른 성능 비교를 보여드리겠습니다.

**V** - 다재다능함: 지난 30년 동안 CSS는 큰 변화를 겪으며 예술가들이 웹에서 자신의 비전을 실현할 수 있는 창의적인 도구로 변모했습니다. CSS는 예술가들이 복잡한 레이아웃, 정교한 애니메이션, 정교한 패턴 및 동적 시각적 효과와 같은 다양한 디자인 기법을 탐험할 수 있도록 돕습니다. Ben Evans와 Julian Garnier 같은 예술가들은 CSS를 예술적 표현 매체로 채택했습니다. 그들은 놀라운 시각적 경험을 만들기 위한 잠재력을 활용하여 디지털 아트에서 가능한 한계를 뛰어넘고 있습니다.

<div class="content-ad"></div>

![Font Awesome icons](/assets/img/2024-07-09-IntegratingCSSgradientintoFontAwesomeicons_1.png)

![Font Awesome icons](/assets/img/2024-07-09-IntegratingCSSgradientintoFontAwesomeicons_2.png)

# Font Awesome 아이콘

아이콘 폰트의 인기가 크게 상승한 이유는 몇 가지 설득력 있는 이유가 있습니다. 이들은 래스터 이미지와 비교하여 부드러운 확장성과 향상된 이미지 품질의 장점을 제공합니다. 더불어 텍스트로 처리되므로 CSS를 사용하여 솔리드 색상을 변경하고 크기를 조절하여 손쉽게 사용자 정의할 수 있습니다. 특히, 폰트 아이콘은 우수한 성능과 미학을 자랑하며 뛰어난 외관을 고해상도 디스플레이에서도 유지합니다. Font Awesome 라이브러리에는 30,000개 이상의 아이콘이 포함되어 있으며 그 중 2,000개 이상은 무료로 제공됩니다.

<div class="content-ad"></div>

![Image](/assets/img/2024-07-09-IntegratingCSSgradientintoFontAwesomeicons_3.png)

# 기술적인 도전

Font Awesome 아이콘 색상 속성은 `color` CSS 데이터 유형을 지원합니다. 이는 기본 아이콘 색상이 ‘#000000’ 또는 ‘검정’과 같은 단색 값만 수용한다는 것을 의미합니다.

![Image](/assets/img/2024-07-09-IntegratingCSSgradientintoFontAwesomeicons_4.png)

<div class="content-ad"></div>

# 기술적인 해결책

`gradient` CSS 이미지를 아이콘 색상으로 사용하려면 색 및 배경 이미지 값을 전환하세요.

시작합시다!

- CSS 그라디언트 이미지를 배경 이미지로 정의하세요.
- 단색 속성 값을 정의하세요. 이 값은 곧 배경 색상으로 사용될 것입니다.

<div class="content-ad"></div>

![이미지](/assets/img/2024-07-09-IntegratingCSSgradientintoFontAwesomeicons_5.png)

3. faSquareFull 솔리드 아이콘을 마스크로 사용하여 값을 전환하세요.

![이미지](/assets/img/2024-07-09-IntegratingCSSgradientintoFontAwesomeicons_6.png)

만세!

<div class="content-ad"></div>

다음으로 작동하는 코드를 검토할 수 있습니다. 마우스 오버 시 아이콘의 배경색을 변경하는 추가 스크립트도 확인할 수 있습니다. 또한 그라데이션 텍스트를 위한 보완적인 구현과 재미로 추가된 원형 그라데이션 이미지 배경을 가진 원형 아이콘도 있습니다!

```js
/*App.tsx*/
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFull } from "@fortawesome/free-solid-svg-icons";
import { faImage, faCircleDot } from "@fortawesome/free-regular-svg-icons";
import "./styles.css";

export default function App() {
  return (
    <main className="hover-me">
      <h1>그라데이션 아이콘</h1>
      <FontAwesomeIcon icon={faImage} mask={faSquareFull} />
      <FontAwesomeIcon className="circle" icon={faCircleDot} mask={faSquareFull} />
    </main>
  );
}
```

```js
/*styles.css*/
svg {
  margin: 30px;
  font-size: 140px;
  color: #ffffff;
  background-image: linear-gradient(
    150deg,
    #ff4800 13.4%,
    #da54d8 50%,
    #0092f4 86.6%
  );
}

/* 보너스 */
/* 그라데이션 텍스트 */
h1 {
  font-family: Courier;
  font-size: 72px;
  background-image: linear-gradient(150deg, #ff4800, #da54d8, #0092f4);
  background-clip: text;
  color: transparent;
}

/* 원형 그라데이션 이미지 배경을 가진 원형 아이콘 */
svg.circle {
  background-image: conic-gradient(
    from 270deg,
    #ff4800 10%,
    #dfd902 35%,
    #20dc68,
    #0092f4,
    #da54d8 72% 75%,
    #ff4800 95%
  );
}

.hover-me {
  text-align: center;
}

/* 아래 코드를 주석 처리하고 아이콘 위에 마우스를 올려보세요 */
.hover-me:hover {
  background-color: #a1fff9;
}

.hover-me:hover svg {
  color: #a1fff9;
}
```

<img src="/assets/img/2024-07-09-IntegratingCSSgradientintoFontAwesomeicons_7.png" />

<div class="content-ad"></div>

업데이트:

일부 아이콘은 위의 코드에서 정의된 정사각형 마스크에 맞지 않아 전체가 표시되지 않습니다.

![아이콘](/assets/img/2024-07-09-IntegratingCSSgradientintoFontAwesomeicons_8.png)

이 문제를 해결하는 두 가지 방법이 있습니다:

<div class="content-ad"></div>

첫 번째 방법은 마스크 아이콘으로 faRectangle을 사용하는 프로 플랜 아이콘을 사용하는 것입니다.

```js
<FontAwesomeIcon icon={faNetworkWired} mask={faRectangle} />
```

대안으로 무료 아이콘을 사용하고 싶다면 FontAwesomeIcon React 컴포넌트의 transform 속성을 조정할 수 있습니다.

```js
<FontAwesomeIcon
  icon={faNetworkWired}
  mask={faSquareFull}
  transform="
shrink-3.5
"
/>
```

<div class="content-ad"></div>

이 글이 도움이 되었다면, 👏 Clap 버튼을 눌러서 감사를 표현해주세요. 다른 사람들이 이 소중한 정보를 발견하기 쉬워집니다.
