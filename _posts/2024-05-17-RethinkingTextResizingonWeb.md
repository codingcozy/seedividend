---
title: "웹에서 텍스트 크기 조절을 하는 방법"
description: ""
coverImage: "/assets/img/2024-05-17-RethinkingTextResizingonWeb_0.png"
date: 2024-05-17 21:46
ogImage: 
  url: /assets/img/2024-05-17-RethinkingTextResizingonWeb_0.png
tag: Tech
originalTitle: "Rethinking Text Resizing on Web"
link: "https://medium.com/airbnb-engineering/rethinking-text-resizing-on-web-1047b12d2881"
isUpdated: true
---





![Airbnb의 웹 접근성 개선](/assets/img/2024-05-17-RethinkingTextResizingonWeb_0.png)

Airbnb는 대문자 텍스트 크기가 필요한 호스트 및 게스트를 위해 웹 접근성을 개선하는 데 큰 발전을 이루었습니다.

이 게시물에서는 다음을 자세히 살펴봅니다:

- 브라우저 줌에 의존할 때 모바일 웹에서 발생하는 문제들
- 모든 프론트엔드 엔지니어들의 워크플로에 영향을 미칠 변경 사항 도입의 어려움
- 이러한 접근성 향상을 시작한 이후 본 이점들


<div class="content-ad"></div>

by: Steven Bassett

에어비앤비에서 웹 접근성을 높이는 것은 중요하다고 여겨지며, 접근성 준수 노력을 이끄는 데 Web Content Accessibility Guidelines (WCAG)를 사용합니다. 접근성 문제로 이어지기 쉬운 WCAG 1.4.4 Resize Text (레벨 AA)에 주목합니다. 이 지침은 우리가 '텍스트 크기 조정'이라고 부르며, 안경이나 처방된 콘택트렌즈와 같은 교정 가능한 시력문제가 있는 사람들에게 큰 혜택을 줍니다. 이 표준은 텍스트 크기를 원래 크기의 200% (2배)로 변경할 때 웹 콘텐츠 및 기능이 유지되어야 한다고 명시하고 있습니다. 우리 사이트가 이 가이드라인을 준수하는지 확인하는 것은 우리가 모든 사용자의 접근성을 향상시키기 위해 계속해서 하는 작업의 중요한 부분입니다.

이 블로그 게시물에서는 이 가이드라인의 중요성에 대한 조사, 사이트 문제 분석 방법, rem 단위 사용의 기술적 이점, 접근 방법 결정 방식, 만난 교차 브라우저 지원 문제, 그리고 Resize Text의 문제 보고 건수를 줄이는 데 봤던 이점에 대해 살펴보겠습니다.

# 시력이 어려운 사용자의 요구 충족하기

<div class="content-ad"></div>

미리 앞을 내다: 미래를 위한 우리의 시야 개선” CDC

예를 들어, 시력이 크게 감소한 사람에게 에어비앤비 홈페이지가 어떻게 보일지 상상해보세요. 아래에 표시된 것처럼, 텍스트는 편안하게 읽기가 매우 어려워집니다.

## 브라우저 확대

접근성 도전 과제를 더 잘 이해하기 위해 브라우저 확대 기능이 어떻게 작동하는지 알아봅시다. 이미 이 기능에 익숙할 수도 있습니다. 창 내에서 모든 콘텐츠의 크기를 조절하기 위해 Command / Ctrl + 또는 Command / Ctrl —와 같은 키보드 단축키를 사용해 본 적이 있을 것입니다. 확대 비율이 100%를 초과하면 뷰포트의 높이와 너비가 비례적으로 줄어들고, 컨텐츠는 더 큰 창에 맞게 확대되어 표시됩니다.

<div class="content-ad"></div>

접근성 테스트 전략의 일환으로, 데스크톱 및 모바일 크기에서 페이지의 사용성을 테스트하기 위해 브라우저 확대 기능을 사용했습니다. 데스크톱 테스트 결과, 반응형 웹 방식이 전체 사이트에 걸쳐 200% 확대 수준에서 상대적으로 잘 작동하는 것으로 나타났습니다. 모바일 웹과 비교했을 때 전반적인 사용자 경험에서 문제가 적었습니다.

이는 데스크톱 환경에서 잘 작동하는데, 거기에서는 작은 브레이크포인트(예: 넓은 화면에서 콤팩트한 화면)을 제공하고 뷰포트가 비교적 넓기 때문입니다. 그러나 브라우저 확대의 한계는 모바일 웹에서 더욱 두드러지게 나타납니다. 모바일 뷰포트는 더 작기 때문에 모바일 뷰포트에서 콘텐츠를 확대할 경우, 원본의 절반 너비와 절반 높이의 뷰포트에 맞춰야 합니다. 이는 텍스트와 UI 요소가 읽거나 상호 작용하기 매우 어렵게 만들어 중요한 접근성 문제가 발생할 수 있습니다. 오른쪽 이미지처럼, 한 화면의 가치만큼의 정보를 보고 뒤로 스크롤 없이 볼 수 없는 상황은 사용자에게 답답한 경험을 줄 수 있습니다.

![이미지](/assets/img/2024-05-17-RethinkingTextResizingonWeb_1.png)

# 폰트 스케일링

<div class="content-ad"></div>

폰트 스케일링은 전체 페이지 줌과는 독립적으로 텍스트 크기를 조절하는 기능을 설명하는 용어입니다. 브라우저 줌과 달리 모든 콘텐츠를 비례적으로 확대 또는 축소하는 대신, 폰트 스케일링은 페이지의 텍스트 요소에만 적용됩니다. 이를 통해 사용자는 화면 레이아웃이나 반응성에 큰 영향을 주지 않으면서 원하는 글꼴 크기에 맞게 폰트 크기를 사용자 정의할 수 있습니다.

폰트 스케일링은 사용자의 기본 크기에 따라 폰트 크기를 조절하는 용어로 사용될 것입니다. 줌과는 달리 이 설정은 모든 사이트에 적용됩니다. 아래는 화면의 텍스트에만 폰트 스케일링이 적용되는 예제이며 전체 콘텐츠가 아닌 텍스트만 크기가 증가하는 것을 보여줍니다.

영상 설명: Airbnb 텍스트가 arc 브라우저에서 폰트 크기를 설정하여 16px에서 32px까지 스케일링되는 것을 보여줍니다.

독립적인 폰트 스케일링 개념은 iOS의 동적 타입 기능과 유사합니다. 저희 블로그 글 "Airbnb의 동적 타입 지원"에서 논의한 것처럼, 동적 타입을 이용하면 사용자가 선호하는 시스템 전체 텍스트 크기를 설정할 수 있고 이는 모든 호환되는 앱에 걸쳐 자동으로 폰트 크기를 조정합니다.

<div class="content-ad"></div>

iOS에서의 원래 접근 전략을 고려할 때, 웹 접근성 접근 방식에 글꼴 크기 확장(확대 축소 대신)을 통합하는 것은 플랫폼 간의 접근 방식 동등성을 도울 수 있는 당연한 다음 단계였습니다.

# px, em vs rem 이해

모바일 웹에서 글꼴 크기 조절이 왜 강력한지 이해했으므로, 글꼴 크기 조절을 지원하기 위해 CSS 길이 단위 중 하나를 선택하는 이유에 집중해야 합니다. 이 블로그 포스트에서는 px, em 및 rem에만 초점을 맞출 것이지만 다른 단위도 있습니다. CSS 길이 단위는 글꼴 크기 조정과 관련이 있으며, 이는 웹 페이지에서 텍스트 및 다른 요소의 크기를 결정합니다. 일부 길이 단위는 사용자의 글꼴 크기 설정에 따라 변경되지 않는 고정된 단위이며, 다른 것들은 상대적인 단위로, 글꼴 크기에 비례하여 크기가 조정됩니다.

3가지 CSS 길이 단위에 대해 깊게 살펴보고 글꼴 크기 조정과 관련이 있는 방식을 살펴봅시다.

<div class="content-ad"></div>

- px 단위는 웹에서 가장 흔히 사용되는 단위로, 이론적으로 화면에서 한 화소를 나타내야 합니다. 렌더링된 값이 변하지 않는 고정 단위입니다.
- em 단위는 상대적인 단위로, 부모 요소의 글꼴 크기를 기준으로 합니다. ‘em’이란 이름은 주어진 글꼴에서 대문자 ‘M’의 너비에 따라 지어졌으며, 글꼴 크기에 대한 참조점으로 전통적으로 사용되었습니다. 1 em 단위는 현재 글꼴 크기의 높이에 해당하며, 기본 값으로 약 16px를 나타냅니다. em 단위는 비례적으로 크기가 조정되므로 부모의 글꼴 크기에 영향을 받을 수 있습니다.
- rem 단위는 "루트 em"의 약자로, em 단위와 비슷하지만 글꼴 크기에 대한 계산에 루트 요소(HTML 요소)만 사용합니다. 따라서 rem 단위는 글꼴 크기 변경 기능을 제공하지만 부모 요소의 글꼴 크기에 영향을 받지 않습니다.

em과 rem 단위 사이의 선택은 종종 글꼴 크기 조정에 필요한 제어 수준과 예측 가능성에 달려 있습니다. em 단위는 사용할 수 있지만 복잡한 레이아웃에서 관리하기 어려울 수 있는 연쇄적인 글꼴 크기 변경을 일으킬 수 있습니다. 이와 대조적으로 rem 단위는 루트 요소의 글꼴 크기에 상대적이기 때문에 더 일관된 예측 가능한 방식으로 글꼴 크기를 조정할 수 있습니다.

이는 CodePen 예제에서 설명한 바와 같이, px, em, rem 단위의 서로 다른 글꼴 크기 조정 동작이 나타난 예시입니다. Airbnb 예시에서 언급된 것과 같이 글꼴 크기 조정이 중요한 요구사항일 때, rem 단위 사용은 일관되고 유지보수 가능한 글꼴 크기 조정 솔루션을 보장하기 위한 더 신뢰할 수 있는 선택일 수 있습니다.

px와 같은 고정 단위를 사용할 수 있는 곳이라면 rem과 같은 상대적인 단위를 사용할 수 있습니다. 그러나 모든 속성에 rem 단위를 무분별하게 사용하는 것은 원치 않는 크기 조정 행동과 복잡성이 증가할 수 있습니다.

<div class="content-ad"></div>

에어비앤비의 경우, 팀은 모든 요소를 비례적으로 확장하는 대신 폰트 크기 조절을 위해 특히 rem 단위의 사용을 우선시하기로 결정했습니다. 이 목표 지향적인 방식은 레이아웃의 모든 측면을 확장하는 잠재적인 단점 없이 일관된 텍스트 크기 조절의 주요 이점을 제공했습니다.

이 결정의 이유는 두 가지입니다:

- rem 단위를 사용하여 모두를 확장했다면 브라우저 줌과 유사하게 되어 의도치 않은 레이아웃 문제를 도입할 수 있었을 것이며,
- 주요 초점은 모바일 친화적인 글꼴 크기 조절 솔루션을 제공하는 데 있었습니다. rem 단위를 사용하여 글꼴 크기를 대상으로 함으로써 팀은 가장 중요한 콘텐츠인 텍스트가 적절하게 확장되도록 보장할 수 있었습니다.

# 디자이너와 개발자를 위한 원활한 전환 가능성 활성화

<div class="content-ad"></div>

픽셀 단위에서 rem 단위로의 변경은 CSS 작업 방식을 회사 전반에 걸쳐 중요하게 바꾸는 것이므로, 특히 여러 팀 간에 협업할 때는 상당한 도전이 될 수 있습니다. 디자이너 및 프론트엔드 개발자들에게 새로운 방식을 교육하고 기존의 픽셀 단위 값을 rem 단위로 변환하도록 요구하는 시간과 노력은 도입 장벽이 될 수 있습니다. 이에 대응하기 위해 에어비앤비 팀은 가능한 한 단위 변환 프로세스를 자동화하는 데 초점을 맞추기로 결정하여, 새로운 rem 기반 시스템으로의 원활한 전환을 도와주고자 합니다.

# 디자인 작업에서 마찰 감소

웹만을 위한 새로운 단위를 고려하거나 일일히 변환 작업을 요구하는 대신, 디자이너들이 px 단위로 CSS를 작성하도록 계속하여 진행하기로 결정했습니다. 이를 통해 팀이 rem 단위를 바로 적용할 수 있도록 필요한 교육 양을 줄일 수 있었습니다.

디자인팀과 함께 주로 집중한 부분은 Text Resizer - 접근성 확인 도구를 활용하여 폰트 스케일링을 테스트하여 디자인이 폰트 크기의 2배로 설정되었을 때 어떻게 보일지 시뮬레이션하는 것이었습니다. 이 도구를 활용하면 디자인 프로세스 초기에 문제점을 더 빨리 발견할 수 있었습니다.

<div class="content-ad"></div>

# 두 가지 CSS-in-JS 시스템의 복잡성 다루기

에어비앤비는 React-with-Styles에서 Linaria를 사용한 새로운 접근 방식으로 전환이 진행 중입니다. Linaria의 도입이 빠르게 진행되고 있었지만, 일관된 경험을 위해 두 가지 스타일링 시스템을 모두 지원해야 한다는 필요성을 인지했습니다. 두 가지 다른 CSS-in-JS 시스템 간의 변환을 관리하는 것은 추가적인 도전이었습니다.

## Linaria

Linaria의 CSS 사용자 지정 속성 지원을 활용하여 팀은 기존 픽셀 기반 값들을 자동으로 그들의 rem 단위 상당값으로 변환하는 새로운 타이포그래피 테마 값을 생성할 수 있었습니다. 이 접근 방식을 통해 팀은 새로운 rem 기반 테마 값을 중앙에서 도입함으로써 자식 요소에서 이를 사용할 수 있게 했습니다. 이는 팀에게 전환 과정 중 필요한 유연성을 제공하기 위해 페이지별로 rem 값을 재정의하는 능력을 제공했습니다.

<div class="content-ad"></div>

```js
import { typography } from './site-theme';

// CSS Vars를 루프하여 사용하는 글꼴 크기에 대해 px를 rem 단위로 변환합니다.
const theme: css`
 ${getCssVariables({ typography: replacePxWithREMs(typography) })}
 // 다음과 같이 변환됩니다:
 // - body-font-size: 16px;
 // - body-font-size: 1rem; 
`;

// 이 컴포넌트의 자식들에 대한 테마 변수를 무시하고 linaria가 생성한 클래스명을 사용합니다.
const RemThemeLocalProvider: React.FC = ({ children }) => {
 const cx = useCx();
 return <div className={linariaClassNames.theme)}>{children}</div>;
};
```

대부분의 글꼴 크기 속성을 변환하는 이 접근 방식은 도움이 되었지만, 테마 밖에서 px 값을 사용하는 코드가 많았습니다. Linaria의 post-CSS 플러그인 지원으로 이러한 부분을 비교적 쉽게 해결할 수 있었습니다. postcss-pxtorem을 활용하여 이러한 값을 쉽게 대상으로 지정하는 데 도움을 받았습니다. 먼저 허용 목록을 사용하여 초기 채택 페이지에이 변경 사항을 신중하게 적용할 수 있도록 했습니다.

프론트엔드 엔지니어가 px 단위를 사용해야 하는 경우를 위해 선택할 수 있는 방법을 제공하는 것이 중요했습니다. 다행히 아래에 표시된 것처럼 px 값을 다른 케이싱으로 사용하여 이러한 방법을 제공할 수 있었습니다.

```js
/* `px`가 `rem`으로 변환됩니다 */
.convert {
  font-size: 16px; /* 1rem으로 변환됨 */
}
/* `Px` 또는 `PX`는 `postcss-pxtorem`에서 무시됩니다
   그러나 브라우저에서는 여전히 인식됩니다 */
.ignore {
  font-size: 200Px;
  font-size: clamp(16Px, 2rem, 32Px);
}
```

<div class="content-ad"></div>

## 스타일과 함께 React

우리의 프론트엔드 코드 중 상당 부분은 여전히 react-with-styles를 사용하고 있어서, 이러한 경우를 쉽게 변환하기 위한 다른 방법을 찾아야 했습니다. 이를 위해 우리는 변환이 꽤 간단하게 이루어지도록 하는 간단한 하이어오더 컴포넌트를 만들었습니다. 먼저 아래와 같이 withStyles 함수를 래핑하는 래퍼를 만들고, 변환을 피할 수 있는 능력도 부여했습니다.

```js
export const withRemStyles = (
  styleFn?: Nullable<(theme: Theme) => Styles>,
  options?: WithStylesOptions & { disableConvertToRemUnits?: boolean },
) => {
  const disableConvertToRemUnits = getDisableConvertToRemUnits(options);
   // 변환이 비활성화된 경우, 원래 withStyles 함수를 그대로 반환합니다 
   if (disableConvertToRemUnits) {
     return _withStyles(styleFn, options);
    }
   // 그렇지 않은 경우, 원래 스타일 함수를 새 함수로 감싸서 
   // px를 rem으로 변환하는 방법을 적용합니다
   return _withStyles((theme: Theme) => {
     if (styleFn) {
     const styles = styleFn(theme);
     const remStyles = convertToRem(styles);
     return remStyles;
   }
   return {};
 }, options);
};
```

그런 다음, convertToRem은 키와 값 중에서 폰트 크기 속성 중 어떤 것이든 변환된 값을 매핑합니다. 이를 통해 변환 프로세스를 더 직관적으로 자동화할 수 있었습니다.

<div class="content-ad"></div>

# 컴포넌트 테스팅을 위한 개선 사항

이렇게 두 가지 도전을 극복하고 나면, 우리는 컴포넌트를 테스트하여 롤아웃 전에 해결해야 할 주요 문제가 있는 지 확인할 수 있습니다. 컴포넌트 문서와 도구에서는 내부 플러그인을 구축하여 html 요소의 글꼴 크기를 설정하여 폰트 스케일링을 테스트하기 쉽게 할 수 있습니다.

스크린샷 테스트를 통해 우리 팀은 시각적 회귀를 발견했습니다. 루트 글꼴 크기를 조절하여 추가적인 스크린샷을 설정할 수 있도록 지원을 추가하면 제품 팀이 다른 글꼴 스케일에서 컴포넌트가 어떻게 보이는지를 검토할 수 있습니다. 이를 위해 스크린샷 캡처 시 추가 글꼴 크기를 설정할 수 있어 새로운 컴포넌트 변형을 만들지 않아도 됩니다.

# 모바일 사파리에서의 글꼴 스케일링

<div class="content-ad"></div>

Supporting font scaling for Mobile Safari was more difficult. Unlike other browsers, there is not a font size preference available in Mobile Safari. However, they have released support for their own font: -apple-system-body but there are some important considerations.

Since macOS High Sierra (10.13), desktop Safari also supports the font preference, but there is not an easy “font size” configuration available in MacOS. Because there can be unexpected behavior on desktop Safari, we used a @supports statement to prevent this. The code below will only target Mobile Safari.

```js
// Apple's Dynamic Type requires this font family to be used
// Only target iOS/iPadOS
@supports (font: -apple-system-body) and (-webkit-touch-callout: default) {
  :root {
    font: -apple-system-body;
  }
}
```

Another consideration is that the “100%” default font size selected does not equal the standard font size of 16px, but rather 17px. This is a very subtle difference, but it is critical for the design quality bar we aim to achieve at Airbnb. To resolve this issue, we ended up using an inline head script to normalize the value. By placing it early into the page execution, we avoided seeing a change in font size.

<div class="content-ad"></div>

```js
(() => {
  // 만약 브라우저가 supports 문에 일치하지 않으면 아무 작업도 하지 마세요
  if (!CSS.supports('(font: -apple-system-body) and (-webkit-touch-callout: default)')) return;
  // 루트 요소 스타일이 아직 구문 분석되지 않았으므로 요소를 생성해야 함
  const div = document.createElement('div');
  div.setAttribute('style', 'font: -apple-system-body');
  // body 요소는 아직 사용할 수 없으므로 루트 요소에 추가해야 함
  documentElement.appendChild(div);
  const style = getComputedStyle(div);
  if (style.fontSize === '17px') {
    documentElement.style.setProperty('font-size', '16px');
  }
  documentElement.removeChild(div);
})();
```

페이지가 로드될 때 리사이즈 observer를 사용하여 값을 다시 변경하여 글꼴 크기 속성을 해제 또는 설정합니다. 이렇게 하면 확장 가능한 글꼴을 지원하면서 기본 글꼴 크기(100%)에 큰 영향을 미치지 않습니다.

# 영향

확장 가능한 글꼴을 지원하는 것은 호스트 및 시각 장애가 있는 손님들 및 큰 글꼴 크기와 브라우징 경험을 제어할 수 있는 사람들에게 혁명적인 차이를 만들어줄 투자입니다. 아래는 홈페이지가 블러된 시야를 가진 사람에게 기본 글꼴 크기(16px)가 어떻게 보이는지와 글꼴 크기를 두 배로 늘려(32px) 어떻게 보이는지 보여주는 두 가지 예시입니다. 두 번째 이미지가 훨씬 더 가독성이 높고 사용하기 편합니다.


<div class="content-ad"></div>

폰트 크기 조정을 제품의 접근성 전략으로 선택한 것은 우리 플랫폼의 전반적인 사용자 경험을 현저히 향상시킨 여러 가지 이점을 가져왔습니다. 이 변경을 자동화하여 rem 단위로 변환하는 것으로 전환하는 일은 이러한 전환을 더 쉽게 만들어주었습니다. 이 변경 후 전체 사이트에서 우리의 전체 문제 수를 볼 때, 기존의 텍스트 크기 조정 문제 중 80% 이상이 해결되었습니다. 뿐만 아니라 이후 새로운 문제가 줄어들고 있습니다.

결론적으로, 웹에서 텍스트 크기 조정을 향상시키기 위해 나아간 우리의 여정은 가치 있는 실용적인 교훈으로 가득 차 있었습니다. rem 단위를 전략적으로 적용하는 방법부터 도구 및 자동화의 역할까지, 각 교훈은 Airbnb의 사용자 경험을 향상시키는 데 중요한 한 걸음 위로 나아갈 수 있었습니다. 우리의 여정을 공유함으로써, 다른 사람들이 이 전환을 더욱 원활하게 이해하고 진행할 수 있기를 바랍니다. 우리의 작업은 계속되고 있으며, Airbnb의 접근성을 계속해서 발전시키는 데 헌신하고 있습니다. 만약 이러한 도전에 열정을 가지고 계시다면, Airbnb에서의 경력 기회를 살펴보시기를 권장합니다.

감사의 말씀을 전합니다:

- 조언과 기술 검토를 위해 Alan Pinto Souza, Dennis Wilkins, Jimmy Guo, Andrew Scheuermann에게
- 초기 제품 파트너로서 Sterling DeMille, Riley Glusker, Ryan Booth에게
- 접근 방식을 지원해준 Jordanna Kwok, Sarah Alley, JN Vollmer에게
- 디자인 지원을 해준 Veronica Reyes, Jamie Cristal에게

<div class="content-ad"></div>

모든 제품 이름, 로고 및 브랜드는 해당 소유자들의 소유물입니다. 이 웹사이트에서 사용된 모든 회사, 제품 및 서비스 이름은 식별 목적으로만 사용되었습니다. 이러한 이름, 로고 및 브랜드의 사용은 어떠한 보증을 시사하지 않습니다.