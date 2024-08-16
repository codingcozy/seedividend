---
title: "웹 개발자가 알아야하는 필수 HTML 속성들"
description: ""
coverImage: "/assets/img/2024-05-01-HTMLAttributesThatEveryWebDeveloperShouldKnow_0.png"
date: 2024-05-01 22:58
ogImage: 
  url: /assets/img/2024-05-01-HTMLAttributesThatEveryWebDeveloperShouldKnow_0.png
tag: Tech
originalTitle: "HTML Attributes That Every Web Developer Should Know"
link: "https://medium.com/gitconnected/html-attributes-that-every-web-developer-should-know-8ffd4cd88288"
isUpdated: true
---




<img src="/assets/img/2024-05-01-HTMLAttributesThatEveryWebDeveloperShouldKnow_0.png" />

HTML 언어는 웹 페이지에서 그래픽 요소를 그리기 위한 다양한 의미 있는 태그를 제공합니다. 보통 XML에서 속성을 사용하는 것처럼, HTML도 XML 기반의 마크업 언어로서 전역 및 태그별 속성을 지원합니다. 초기에 HTML은 웹 페이지를 디자인하기 위한 HTML 태그에 대한 기본 속성들을 제공했습니다. 모든 개발자가 알고 있는 id, class, style 등과 같은 어떤 HTML 요소와도 작동하는 전역 속성뿐만 아니라, src, href와 유사한 태그별 속성에 대해 알고 있습니다. 현대 웹 기술 및 UI/UX 요소의 성장과 함께, HTML 표준은 사용자 친화적인 웹 프론트엔드를 디자인하는 데 새로운 속성을 도입했습니다.

W3C 및 협력사들은 의심할 여지없이 HTML 기능을 확장하여, 무겁고, 제3자 외부 라이브러리에 의존하지 않고 접근 가능하고, 현대적이며, 기능이 풍부한 웹 프론트엔드를 개발할 수 있도록 노력하고 있습니다. 이러한 새로운 기능 중 일부는 새로운 HTML 태그로 나왔습니다. 한편, 일부는 새로운 속성으로 나왔습니다. 예를 들어, HTML은 액세스 가능하고, 네이티브하며, 자바스크립트 무료 팝오버 요소를 구현하기 위해 popover 속성을 도입했습니다.

이 이야기에서, 현대 웹 개발자로서 알아야 할 HTML 속성을 설명하고, 무거운, 제3자 라이브러리를 사용하지 않고 미래지향적인 프론트엔드를 디자인하세요. 이러한 네이티브 HTML 기능을 활용하여 최소한의 리소스로 높은 성능을 가진 웹 페이지를 제작해보세요!

<div class="content-ad"></div>

# 웹 애플리케이션에서 원래 팝업 요소로 사용되던 네이티브 브라우저 창을 대안으로 사용하여 상위 레이어 콘텐츠를 표시했습니다 (예를 들어, 전자상거래 웹 사이트에서 사용자가 링크를 클릭할 때 T-셔츠 사이즈 차트를 표시합니다). 그러나 여러분들이 사용한 네이티브 창은 사용자 친화적이지 않았고 수정 가능하지 않았습니다. 나중에 개발자들은 UI/UX에 친화적으로 콘텐츠를 표시하기 위해 CSS 스타일이 적용된 인페이지 팝오버를 외부 라이브러리로 구축했습니다.

이제 여러분은 HTML만으로 자바스크립트 코드 한 줄을 작성하지 않고 팝오버를 생성할 수 있습니다. 현대 웹 표준은 Popover API를 통해 내장 팝오버 지원을 포함하고 있습니다.

다음 소스 코드를 살펴보세요:

<div class="content-ad"></div>

```css
div[popover]::backdrop {
  background-color: rgba(0, 0, 0, 0.4);
}

div[popover] {
  padding: 12px;
  border: none;
}
```

`pop` 요소에 `popover` 속성을 사용하여 간단한 팝오버 엘리먼트를 구현한 위의 HTML 코드 조각입니다. JavaScript를 사용하지 않고 `popovertarget` 속성을 사용하여 팝오버 엘리먼트를 표시합니다. 또한, 팝오버 뒷배경을 `::backdrop` 가상 요소를 사용하여 스타일링했습니다.

![팝오버 예시 이미지](https://miro.medium.com/v2/resize:fit:1148/1*KbjdZQW2A-7pzrBMGSDNXA.gif)

MDN 설명에 따라 네이티브 팝오버에 애니메이션을 추가할 수 있습니다. 또한, 팝오버 API의 JavaScript 메소드를 사용하여 CSS 스타일링된 툴팁을 만들 수 있습니다. 팝오버 웹 API는 아직 새로운 브라우저 기능이므로 제품에서 사용하기 전에 시간이 필요할 수 있습니다.

<div class="content-ad"></div>

# 대화 상자 및 페이지에서 autofocus 속성 사용하기

컴퓨터는 일반적으로 주요 입력 요소로 키보드와 마우스를 갖추고 있지만 특정 상황에서는 사용자가 특정 활동 중에 키보드만 사용하는 경우가 있습니다. 예를 들어 대량 생산 기업의 직원은 양손을 모두 사용하여 효율적으로 컴퓨터를 사용할 수 없는 바쁜 작업 중 데이터 입력 활동에 키보드만 사용할 수 있습니다. 결과적으로 브라우저는 탭 탐색, 팝오버 및 대화 상자에 대한 자동 키 할당, 단축키 등을 내장된 접근성 기능으로 키보드 지원을 구현합니다.

HTML 표준은 페이지 로드 및 대화 상자/팝오버 표시 상태에서 자동으로 양식 요소에 초점을 맞추기 위한 autofocus 속성을 제공합니다. 이 속성을 사용하면 사용자의 생산성을 향상시킬 수 있습니다.

다음 샘플 모달을 살펴보세요. 첫 번째 입력이 미리 채워져 있기 때문에 두 번째 텍스트 입력에 자동 초점이 맞춰집니다:

<div class="content-ad"></div>

<img src="https://miro.medium.com/v2/resize:fit:1148/1*PvC6Czz14_44TLa_sTbhGA.gif" />

위 미리보기에서 보듯이 사용자는 Alt + Tab 단축키를 눌러 미리 채워진 텍스트 입력에 초점을 맞출 수 있습니다. 위 결과를 얻기 위한 소스 코드는 다음과 같습니다:

```js
<dialog id="dlg">
  <form method="dialog">
    <input type="text" placeholder="이름" value="존" />
    <div style="height: 8px"></div>
    <input type="text" placeholder="성" autofocus/>
    <div style="height: 8px"></div>
    <button>저장</button>
  </form>
</dialog>
<button onclick="document.getElementById('dlg').showModal()" autofocus>모달 표시</button>
```

위 HTML 조각은 두 군데에서 포커스 속성을 사용합니다.

<div class="content-ad"></div>

- 페이지 로드 이벤트 후에 쇼 모달 버튼 요소에 포커스를 맞추세요.
- 첫 번째 텍스트 입력란이 미리 채워져 있기 때문에 두 번째 텍스트 입력란을 자동으로 포커스하세요.

여기서 우리는 JavaScript 코드를 사용하지 않고 다이얼로그를 닫기 위해 method="dialog" 속성을 설정했습니다.

# pattern 속성을 사용하여 텍스트 입력 유효성 검사하기

요즘 거의 모든 현대적인 웹 앱은 폼에서 클라이언트 측 유효성 검사를 사용합니다. 개발자들은 종종 유저 친화성을 향상시키기 위해 클라이언트 측에서 실시간 유효성 검사를 구현합니다. 이제 HTML의 input 요소에 pattern 속성이 있기 때문에 Regex 기반의 실시간 입력 유효성 검사를 구현하기 위해 JavaScript를 사용할 필요가 없어졌습니다.

<div class="content-ad"></div>

제품 식별자를 확인해야 한다고 가정해요. 이 식별자는 두 개의 영어 글자와 하이픈으로 연결된 여섯 자리 숫자로 구성돼요. 예를 들어 GR-100200 같은 거죠.

다음 HTML 코드 조각은 이 요구사항을 충족하는 유효성 검사가 가능한 텍스트 입력을 구현하고 있어요.

```js
<form>
  <input 
    type="text" 
    placeholder="예: GR-100200" 
    pattern="[A-Z]{2}-[0-9]{6}" 
    required 
   />
  <input type="submit"/>
</form>
```

여기서 pattern 속성은 유효하지 않은 입력에 대한 브라우저별 유효성 메시지를 표시하여 제출을 방지해요. 그렇다면 실시간 유효성 검사를 어떻게 구현할 수 있을까요?

<div class="content-ad"></div>

패턴에 대한 실시간 유효성 검사는 다음 HTML 코드 조각에 표시된 대로 :valid 및 :invalid CSS 가상 클래스를 사용하여 가능합니다:

```js
<style>
  input[type=text] {
    border: #000 1px solid;
    border-radius: 4px;
    outline: none;
    padding: 6px;
  }

  input[type=text]:invalid {
    border: red 1px solid;
     + span::before {
      content: '✖';
      display: inline;
      color: red;
    }
  }
  
  input[type=text]:valid {
    border: green 1px solid;
    + span::before {
      content: '✓';
      display: inline;
      color: green;
    }
  }

</style>

<input 
  type="text" 
  placeholder="예: GR-100200" 
  pattern="[A-Z]{2}-[0-9]{6}" required
/>
<span></span>
```

위의 HTML 코드 조각은 유효성 상태에 따라 스타일을 설정하기 위해 CSS 코드를 사용합니다. 아래 미리보기에서와 같이, 유효하지 않은 입력값은 입력 상자 테두리를 빨간색으로 변하고 빨간색 교차 표시를 표시합니다. 한편, 유효한 입력값은 녹색 테두리와 녹색 확인 표시가 렌더링됩니다:

<img src="https://miro.medium.com/v2/resize:fit:954/1*yCIHUIN8Sn6IMxuFbv0YVg.gif" />


<div class="content-ad"></div>

아래 이야기에서 :valid 및 :invalid와 같은 CSS 가상 요소에 대해 더 알아보세요:

JavaScript에서 패턴을 사용하는 입력의 validity를 확인하기 위해 다음과 같이 JavaScript에서 입력의 validityState 인터페이스에 액세스할 수 있습니다:

```js
if(productInput.validity.valid) {
  // 할 일...
}
```

# inputmode 속성을 사용하여 모바일 가상 키보드 모드 다루기

<div class="content-ad"></div>

현대 모바일 기기는 일반적으로 물리 키보드가 없습니다. 그 대신 터치 스크린에 렌더링되는 가상 키보드가 제공됩니다. 이 가상 키보드에는 여러 모드가 있습니다. 예를 들어 숫자 입력 요소에는 숫자 키만 표시되고 일반 문자열 입력에 대해서는 전체 키보드 인터페이스가 표시될 수 있습니다. 모바일 브라우저는 입력 유형에 따라 가상 키보드 모드를 자동으로 변경하지만 개발자는 input 요소의 inputmode 속성을 사용하여 사용자 정의할 수도 있습니다.

사용자로부터 OTP PIN을 입력받기 위해 특정 패턴을 사용하는 텍스트 입력을 사용한다고 가정해보겠습니다:

```js
<input type="text" placeholder="Enter OTP" pattern="[0-9]{4}" required />
```

이는 범용 문자열 유형 입력이므로 모바일은 전체 키보드 레이아웃을 표시합니다:

<div class="content-ad"></div>


![이미지](/assets/img/2024-05-01-HTMLAttributesThatEveryWebDeveloperShouldKnow_1.png)

입력 요소와 함께 inputmode 속성을 다음과 같이 사용해봅시다:

```js
inputmode="numeric"
```

이제 모바일에서 숫자 키보드 레이아웃을 확인할 수 있습니다. 아래 미리보기를 참고하세요:

<div class="content-ad"></div>


![이미지](/assets/img/2024-05-01-HTMLAttributesThatEveryWebDeveloperShouldKnow_2.png)

# loading 속성을 이용한 브라우저 레벨 이미지 지연 로딩

웹 개발자들은 페이지 로딩 시간을 개선하여 SEO (검색 엔진 최적화) 점수를 높이고 사용자 상호 작용을 향상시키려고 노력합니다. 이미지의 지연 로딩은 특정 이미지를 렌더링할 때 해당 이미지를로드하여 초기 페이지 로딩 시간을 줄이는 잘 알려진 전략입니다. 이미지의 지연 로딩은 Intersection Observer API 또는 전통적인 스크롤 이벤트를 사용하여 자체 구현하거나 서드파티 라이브러리를 사용하여 가능합니다.

img 태그의 loading 속성을 사용하면 JavaScript 코드없이 또는 서드파티 라이브러리를 사용하지 않고 브라우저 레벨의 이미지 지연 로딩을 활성화할 수 있습니다.

<div class="content-ad"></div>

다음 소스 코드를 살펴보세요:

```js
<div style="height: 2000px"></div>

<img src="https://source.unsplash.com/vpOeXr5wmR4" width="400" height="240" loading="lazy" />
```

여기에는 사용자가 해당 이미지로 스크롤할 때에만 위 무료 이미지가 로드되며 초기 페이지 로드 시간에 영향을 주지 않게 되어 있습니다. 아래 미리 보기에서 확인할 수 있습니다:

<img src="https://miro.medium.com/v2/resize:fit:1400/1*uy6OnakZEP-X8_0mbRHVPw.gif" />

<div class="content-ad"></div>

현재 HTML 명세에서는 lazy loading을 사용자화할 수 없지만, 브라우저는 브라우저 수준의 lazy-loading을 사용하는 개발자가 더 많아진다면 커스터마이즈 옵션을 제공할 수 있습니다.

## 사용자 지정 data-* 속성 사용

브라우저는 일반적으로 HTML 속성 이름에 엄격한 유효성 검사 규칙을 적용하지 않으므로 개발자는 원하는 사용자 정의 속성 이름을 사용할 수 있습니다. 그러나 사용자 정의 속성에 대한 다양한 명명 규칙을 사용하는 것은 좋지 않은 실천 방법입니다. 왜냐하면 그것은 HTML 문서 명세를 무효화하기 때문입니다. HTML 표준은 사용자 정의 속성에 대해 data- 접두사 사용을 권장하며 DOM API에서도 명시적인 기능을 제공하여 개발자를 독려합니다.

다음은 일부 사용자 정의 data 속성을 사용하는 샘플 HTML 요소입니다:

<div class="content-ad"></div>

```js
<div 
  id="elm" 
  data-player-name="John"
  data-player-score="20"
  data-player-city="LA">
</div>
```

자바스크립트를 통해 디스트럭처링으로 카멜 표기법 키를 사용하여 이러한 사용자 지정 속성 값을 쉽게 액세스할 수 있습니다. 다음 코드 스니펫에서 보여지듯이:

```js
let { playerName, playerScore, playerCity } = document.getElementById('elm').dataset;

console.log(playerName, playerScore, playerCity); // John 20 LA
```

또한 CSS 문서 내에서 이러한 데이터 속성에 액세스할 수도 있습니다.

<div class="content-ad"></div>

```js
#elm::before {
  content: attr(data-player-name) " - " attr(data-player-score)
}

#elm {
  display: inline-block;
  padding: 12px;
  background-color: #ddd;
}
```

위의 CSS 코드 조각은 data-player-name과 data-score 값을 HTML 요소 위에 다음과 같이 렌더링합니다:

<img src="/assets/img/2024-05-01-HTMLAttributesThatEveryWebDeveloperShouldKnow_3.png" />

제3자 라이브러리를 사용하지 않고도 최신 네이티브 HTML 태그를 사용하여 간결하고 사용자 친화적이며 성능이 우수하며 접근성이 좋은 웹 프론트엔드를 개발할 수 있습니다. 아래 이야기로 더 자세히 알아보세요:

<div class="content-ad"></div>

읽어 주셔서 감사합니다!