---
title: "HTML, CSS, 그리고 JavaScript로 날씨 예보 애플리케이션 만들기 단계별 안내"
description: ""
coverImage: "/assets/img/2024-06-20-BuildingaWeatherForecastApplicationwithHTMLCSSandJavaScriptAStep-by-StepGuide_0.png"
date: 2024-06-20 01:06
ogImage: 
  url: /assets/img/2024-06-20-BuildingaWeatherForecastApplicationwithHTMLCSSandJavaScriptAStep-by-StepGuide_0.png
tag: Tech
originalTitle: "Building a Weather Forecast Application with HTML, CSS, and JavaScript: A Step-by-Step Guide"
link: "https://medium.com/coinmonks/building-a-weather-forecast-application-with-html-css-and-javascript-a-step-by-step-guide-998583ec501b"
isUpdated: true
---




![이미지](/assets/img/2024-06-20-BuildingaWeatherForecastApplicationwithHTMLCSSandJavaScriptAStep-by-StepGuide_0.png)

- 소개
- 프로젝트 개요
- 요구 사양
- 날씨 예보 어플리케이션의 기능
- 코드 구조
  - 단계 1. HTML 구조:
  - 단계 2. CSS 스타일링:
  - 단계 3. JavaScript 로직:
- 테스트와 디버깅
- 배운 점
- 배포
- 어플리케이션 사용 방법 안내
- 향후 개선 사항
- 결론

# 소개

이 안내서는 HTML, CSS 및 JavaScript를 사용하여 상호작용하는 날씨 예보 어플리케이션을 만드는 과정을 안내합니다. 사용자는 전 세계 어느 곳이든 현재 날씨 상황 및 예보에 접근할 수 있습니다.

<div class="content-ad"></div>

# 프로젝트 개요

날씨 예보 앱은 간단하고 사용자 친화적인 인터페이스를 갖추고 있습니다. 사용자는 검색 창에 위치를 입력할 수 있고, 앱은 해당 지역의 현재 날씨 상황을 보여줍니다. 저는 사용자의 위치 입력을 기반으로 날씨 정보를 가져오기 위해 OpenWeather API를 사용했습니다. 앱은 온도, 습도, 풍속, 현재 상황을 보여주는 날씨 아이콘 및 검색된 위치의 배경 이미지와 같은 추가 정보도 제공합니다.

# 준비물

이 날씨 예보 애플리케이션을 만들기 위해서는 HTML, CSS 및 JavaScript에 대한 기본적인 이해가 필요합니다. 애플리케이션을 구성하기 위해 HTML에 익숙해야하며, 스타일링을 위해 CSS를 사용하고 애플리케이션의 로직을 구현하기 위해 JavaScript를 사용할 수 있어야합니다.

<div class="content-ad"></div>

코드를 작성하는 데는 텍스트 편집기 또는 IDE(예: Visual Studio Code)가 필요하며, 테스트를 위해 웹 브라우저가 필요합니다. 선택 사항으로는 애플리케이션을 호스팅하기 위한 GitHub 계정이 필요합니다.

# Weather Forecast Application의 기능

이 프로젝트에서는 다음과 같은 기능이 있는 날씨 예보 앱을 만듭니다:

- 위치 기반 날씨: 사용자는 위치(도시)를 입력하여 해당 지역의 현재 날씨 상황 및 예보를 볼 수 있습니다.
- 현재 날씨 표시: 애플리케이션은 현재 온도, 날씨 상황(예: 맑음, 비, 흐림), 습도, 풍속 및 가시성을 보여줍니다.
- 날씨 아이콘: 날씨 조건을 시각적으로 이해하기 쉽게 나타내기 위해 날씨 아이콘(예: 태양, 구름, 비)을 사용합니다.
- 반응형 디자인: 애플리케이션이 다양한 기기 및 화면 크기에서 잘 작동하고 반응형임을 보장합니다.

<div class="content-ad"></div>

# 코드 구조

프로젝트용 새 폴더를 생성하고, 폴더의 이름을 원하는 대로 지은 다음, 그 안에 index.html, style.css, script.js 세 개의 파일을 만듭니다. 이 파일들은 프로젝트의 기반으로 사용될 것입니다. 이제 텍스트 편집기나 IDE (예: Visual Studio Code)에서 폴더를 열고 아래 단계를 따릅니다:

## 단계 1. HTML 구조:

index.html 파일을 열고, 날씨 예보 애플리케이션을 위한 다음 HTML 코드를 붙여넣으세요:

<div class="content-ad"></div>

위의 HTML 코드는 검색 바와 날씨 정보 표시를 갖춘 날씨 애플리케이션 인터페이스를 설정합니다. 입력, 버튼, 도시 이름, 온도, 날씨 아이콘, 설명, 습도 및 풍속을 위한 요소가 포함되어 있습니다.

디자인은 특정 도시에 대한 검색 기능과 날씨 세부 정보가 있는 카드 레이아웃을 특징으로 합니다. 외부 CSS 파일 및 JavaScript 파일에 대한 링크도 포함되어 있습니다.

## 단계 2. CSS 스타일링:

<div class="content-ad"></div>

style.css 파일을 열어 날씨 예보 애플리케이션을 스타일링하는 다음 CSS 코드를 붙여넣어주세요:

```css
body {
 display: flex;
 justify-content: center;
 align-items: center;
 height: 100vh;
 background: darkgrey;
 margin: 0;
 font-size: 120%;
 background-image: url("https://source.unsplash.com/1600x900/?nature,landscape");
 font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
} 

.card {
 background-color: black;
 padding: 2em;
 color: white;
 border-radius: 30px;
 width: 100%;
 max-width: 420px;
 margin: 1em;
 box-shadow: 1px 3px 5px rgba(141, 138, 138, 0.1);
}

.search {
 display: flex;
 align-items: center;
 justify-content: center;
}

input.search-bar {
 border: none;
 outline: none;
 padding: 0.4em 1em;
 border-radius: 30px;
 background-color: #534b4b;
 color: white;
 font-size: 120%;
 width: calc(100% - 100px);
 font-family: 'Roboto';
 letter-spacing: 2px;
}

button {
 margin: 0.5em;
 border-radius: 50%;
 border: none;
 height: 3em;
 width: 3em;
 outline: none;
 background-color: #534b4b;
 color: white;
 cursor: pointer;
 transition: 0.3s ease-in-out;
}

button:hover {
 background-color: #9b7979;
}

.weather {
 font-weight: bold;
}

.weather.loading {
 visibility: hidden;
 max-height: 20px;
 position: relative;
}

.weather.loading::after {
 position: absolute;
 top: 0;
 color: white;
 visibility: visible;
 content: "Page Loading...";
 font-weight: bold;
 left: 30px;
}

h1.city {
 letter-spacing: 2px;
 text-transform: uppercase;
 font-size: 1.3em;
}

h1.temp {
 margin: 0;
 margin-bottom: 0.5em;
 font-size: 1.3em;
}

.flex {
 display: flex;
 align-items: center;
 margin-left: -10px;
 margin-bottom: 0.5em;
}

.flex .description {
 text-transform: capitalize;
 margin-left: 8px;
}

.humidity {
 font-size: 1.2em;
 margin-bottom: 0.5em;
}

@media screen and (max-width: 420px) {
 .card {
   border-radius: 35px;
   max-width: 320px;
  }

 input.search-bar {
  padding: 0.3em 0.8em;
  border-radius: 30px;
  background-color: #534b4b;
  color: white;
  width: calc(100% - 100px);
  letter-spacing: 1px;
 }
}
```

상기 CSS 코드는 중앙 정렬 레이아웃, 어두운 회색 배경, Unsplash의 배경 이미지를 사용하는 스타일링된 날씨 애플리케이션을 정의합니다. 정렬을 위해 flexbox를 사용하고, 검은색 배경과 흰색 텍스트로 카드 스타일을 설정하며, 입력과 버튼 요소를 스타일링합니다. 로딩 애니메이션은 기본적으로 숨겨져 있으며 활성화될 때 메시지를 표시합니다. 미디어 쿼리는 작은 화면에 맞게 스타일을 조정합니다.

## 단계 3. 자바스크립트 로직:

<div class="content-ad"></div>

thescript.js 파일을 열고 다음 JavaScript 코드를 사용하여 Weather forecast 어플리케이션에 기능을 추가하세요:

```js
let cityEl = document.querySelector(".city");

let iconEl = document.querySelector(".icon");

let descriptionEl = document.querySelector(".description");

let temperatureEl = document.querySelector(".temp");

let humidityEl = document.querySelector(".humidity");

let windEl = document.querySelector(".wind");

let searchBar = document.querySelector(".search-bar");

let searchEl = document.querySelector(".search button");

let weatherEl = document.querySelector(".weather");

let weather = {
 "apikey": "a6f6fef1470f473cb0694459230605",

 fetchWeather: function (city) {
  fetch("http://api.weatherapi.com/v1/current.json?key=a6f6fef1470f473cb0694459230605%20&q=" + city + "&aqi=no").then((response) => response.json()).then((data) => this.displayWeather(data));
 },

 displayWeather: function (data) {
  const { name } = data.location;

  const { icon, text } = data.current.condition;

  const { temp_c, humidity } = data.current;

  const { wind_kph } = data.current;

  cityEl.innerText = `Weather in ${name}`;

  iconEl.src = icon;

  descriptionEl.innerText = text;

  temperatureEl.innerText = `Temperature: ${temp_c}°C`;

  humidityEl.innerText = `Humidity: ${humidity}%`;

  windEl.innerText = `Wind Speed: ${wind_kph} km/hr`;

  weatherEl.classList.remove("loading");

  document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
 },

 search: function () {
  this.fetchWeather(searchBar.value);
 }
};

searchEl.addEventListener("click", () => {
 console.log("Clicked!");
 weather.search();
});

searchBar.addEventListener("keyup", (event) => {
 if (event.key === "Enter") {
  weather.search();
 }
});

weather.fetchWeather("Lagos");
```

위의 JavaScript 코드는 사용자의 입력된 도시에 기반한 날씨 데이터를 가져오고 표시하는 weather라는 객체를 정의합니다. fetch API를 사용하여 날씨 API(api.weatherapi.com)로 요청을 보내고 검색된 데이터로 DOM을 업데이트합니다.

또한 사용자가 특정 도시의 날씨 데이터를 검색할 수 있도록 검색 버튼 및 검색 창에 대한 이벤트 리스너를 포함하고 있습니다. 추가로, 검색된 도시에 따라 배경 이미지를 변경합니다. 페이지가 로드될 때 Lagos의 기본 날씨 정보가 가져와집니다.

<div class="content-ad"></div>

# 테스트 및 디버깅

웹 브라우저에서 애플리케이션을 테스트하려면 다음 단계를 따를 수 있어요:

- HTML 파일 열기: 이전에 언급된 것처럼 모든 HTML, CSS, JavaScript 파일을 동일한 폴더에 저장한 후, 해당 폴더에서 HTML 파일을 더블 클릭하여 웹 브라우저에서 열어주세요. 이렇게 하면 기본 웹 브라우저에서 파일이 열릴 거에요.
- 요소 검사: 앱이 브라우저에 로드된 후 페이지를 마우스 오른쪽 버튼으로 클릭하고 "검사"를 선택하거나 "Ctrl+Shift+I"를 눌러 개발자 도구를 열어주세요. 이렇게 하면 콘솔에서 오류를 볼 수 있고 페이지 요소를 검사할 수 있어요.
- 기능 테스트: 앱과 상호 작용하여 기능을 테스트해주세요. 이를 통해 코드 내의 버그나 문제를 식별할 수 있어요.
- 디버깅: 오류나 문제가 발생하면 개발자 도구의 콘솔을 사용하여 JavaScript 코드를 디버깅하세요. 오류 메시지와 줄 번호를 찾아 문제가 발생하는 위치를 확인하세요.
- 변경 사항 적용: 코드를 변경해야 하는 경우 코드 편집기로 돌아가 필요한 조정을 하고 파일을 저장한 후 브라우저를 새로고침하여 앱에 변경 사항이 반영되는지 확인하세요.

# 배운 교훈

<div class="content-ad"></div>

지금은 코딩 프로세스를 시작하기 전에 응용 프로그램의 계획 및 로직을 설계하는 중요성을 이해했습니다. 또한 상호작용 웹 애플리케이션을 만드는 데 중요한 CSS 스타일, JavaScript 이벤트 및 DOM 조작에 대한 지식을 향상시켰습니다.

# 배포

날씨 예보 애플리케이션 프로젝트는 GitHub Pages에서 이용 가능하며, 아래 링크를 클릭하여 온라인으로 액세스할 수 있습니다:

애플리케이션 테스트: [https://wasiu-akindoyin.github.io/Weather-Forecast-Web-Application/](https://wasiu-akindoyin.github.io/Weather-Forecast-Web-Application/)

<div class="content-ad"></div>

GitHub 저장소에 액세스하여 소스 코드를 확인하거나 기여할 수 있습니다.

# 애플리케이션 사용 방법 안내

다음 단계를 따라 날씨 예보 애플리케이션을 사용해보세요:

- 위의 날씨 예보 애플리케이션을 위한 GitHub Pages URL을 방문하여 웹 브라우저에서 애플리케이션을 엽니다.
- 앱이 로드되면 상단에 검색 창이 표시됩니다. 원하는 도시의 날씨를 확인하려면 도시 이름을 입력하고 Enter 키를 누르거나 검색 버튼을 클릭합니다.
- 앱은 WeatherAPI에서 지정된 도시의 현재 날씨 데이터를 가져와 화면에 표시합니다. 도시 이름, 현재 온도, 날씨 설명, 습도, 풍속 등을 확인할 수 있습니다.
- 아래로 스크롤하면 도시와 관련된 배경 이미지도 확인할 수 있습니다. 검색하는 도시에 따라 배경 이미지가 변경됩니다.
- 다른 도시의 날씨를 확인하려면 간단히 검색 창에 새로운 도시 이름을 입력하고 Enter를 누르거나 다시 검색 버튼을 클릭하세요.
- 여러 도시의 현재 날씨 조건을 확인하는 즐거움을 누려보세요!

<div class="content-ad"></div>

# 미래 개선 사항

앞으로, 더 많은 기능을 추가할 계획입니다:

- 위치 감지: 사용자의 현재 위치를 자동으로 감지하고 날씨를 표시하는 기능을 구현합니다.
- 로컬 저장소: 사용자가 선호하는 위치나 설정을 로컬 저장소에 저장하여 방문 사이에 선택 사항을 기억합니다.
- 오류 처리: API 요청 실패나 잘못된 사용자 입력에 대한 오류 처리를 추가합니다.
- 여러 위치: 여러 위치를 추가하고 전환하여 날씨 정보를 볼 수 있는 기능을 활성화합니다.

# 결론

<div class="content-ad"></div>

HTML, CSS, 그리고 JavaScript를 사용하여 이 날씨 예보 애플리케이션을 개발하는 것은 저에게 큰 만족감을 줬어요. API를 통합하고 비동기 작업을 관리하며 반응형 웹 애플리케이션을 개발하는 방법에 대해 배웠습니다. 이 애플리케이션은 사용자에게 유용한 서비스를 제공하여 어디서나 쉽게 날씨 정보에 접근할 수 있도록 도와줍니다.