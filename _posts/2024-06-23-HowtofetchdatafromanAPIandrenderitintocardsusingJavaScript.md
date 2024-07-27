---
title: "JavaScript로 API에서 데이터를 받아 카드 형태로 렌더링하는 방법"
description: ""
coverImage: "/assets/img/2024-06-23-HowtofetchdatafromanAPIandrenderitintocardsusingJavaScript_0.png"
date: 2024-06-23 14:31
ogImage: 
  url: /assets/img/2024-06-23-HowtofetchdatafromanAPIandrenderitintocardsusingJavaScript_0.png
tag: Tech
originalTitle: "How to fetch data from an API and render it into cards using JavaScript"
link: "https://medium.com/@jenniferjimenez90/how-to-fetch-data-from-an-api-and-render-it-into-cards-using-javascript-b0d1f6e22702"
---


<img src="/assets/img/2024-06-23-HowtofetchdatafromanAPIandrenderitintocardsusingJavaScript_0.png" />

안녕하세요! 제 첫 블로그 포스트에 오신 것을 환영합니다! 처음 프로젝트로 즐겨 보는 것을 만들고 접목하고 싶었습니다. 그것은 (위의 이미지에서 유추하지 못했다면) Rick and Morty입니다. 웹 개발에 진입하기 전에 API에 대해 들어본 적이 없었기 때문에 첫 프로젝트에서 사용하기로 선택했습니다. Rick and Morty를 시청하는 것을 즐기며 재미있게 느껴서 Rick and Morty API를 빠르게 구글 검색한 후 사용하기로 결정했습니다.

이제 시작해 봅시다:

먼저, JavaScript 파일(index.js)을 링크하기 위해 index.html을 가지고 있어야 합니다.<script> 태그를 사용하세요.

<div class="content-ad"></div>

```js
<!DOCTYPE html>
  <html lang="eng">
    <head>
      <title>Rick and Morty Character Generator</title>
     </head>
     <body>
       <div id="cards-container">
        </div> 
      <script src="index.js" defer></script>
     </body>
  </html>
```

스크립트 태그는 body의 끝에 있으며 'defer' 속성이 있습니다. 이는 HTML이 파싱되고 JavaScript가 로드되기 전에 스크립트가 실행되도록 하기 위한 것입니다. 또한, 대신에 'defer' 속성 대신 index.js에서 "DomContentLoaded" 이벤트 리스너를 추가할 수도 있지만 무조건 body 태그 내에서 스크립트 태그를 사용하도록 주의해야 합니다. body 태그 안에는 id가 "cards-container"인 div 태그가 있습니다. 이는 카드를 생성할 때 사용될 것입니다.

팁: API를 다룰 때는 문서를 살펴보는 것이 좋습니다. 보통 문서를 읽으면 어떤 데이터와 어떻게 액세스할 수 있는지 미리 확인할 수 있습니다.

API를 가져오려면 올바른 구문을 사용해야 합니다. 이 프로젝트를 작업하기 전에 fetch를 소개받았지만 프로젝트에서 데이터를 가져오는 작업은 해본 적이 없었습니다. 데이터를 가져오는 다른 방법도 있지만 그것은 나중에 다시 다루도록 하겠습니다.

<div class="content-ad"></div>

index.js에 다음과 같이 작성되어 있어야 해요:

구문:

```js
fetch('API_URL')
.then(response => response.json())
.then(data => console.log(data));
```

<img src="/assets/img/2024-06-23-HowtofetchdatafromanAPIandrenderitintocardsusingJavaScript_1.png" />

<div class="content-ad"></div>

릭 앤 모티 문서를 확인한 후, 우리는 필요한 모든 캐릭터를 가져오기 위해 "/character" 엔드포인트를 추가해야 한다는 것을 배웠어요. 위의 구문에서 한 가지 변경한 점은 '데이터' 대신 '캐릭터'를 사용하기로 결정한 것이에요. 이름을 지을 때 '데이터'를 사용하는 대신 '캐릭터'로 지었어요. 왜냐하면 우리가 가지고 오려고 하는 정확한 데이터가 '캐릭터'이기 때문이에요.

팁: 무엇을 하기 전에 데이터를 console.log 해보는 것이 좋아요. 이것은 좋은 초보 실습이에요. 콘솔을 통해 작업할 API의 데이터를 볼 수 있기 때문에 어떻게 데이터를 가져올 수 있는지 정확히 파악할 수 있어요. 또한, API에 더 많은 속성이 있다면, 점 표기법을 사용해 접근할 수 있어요.


<img src="/assets/img/2024-06-23-HowtofetchdatafromanAPIandrenderitintocardsusingJavaScript_2.png" />


우리가 console.log(characters)를 사용했기 때문에, 크롬 개발자 도구의 콘솔을 열면 API의 데이터를 볼 수 있어요 (Windows에서는 Ctrl Shift J 또는 Mac에서는 Ctrl Option J). "info"라는 객체와 "results"라는 배열이 있어요. 우리가 원하는 것은 "results" 배열에서 모든 캐릭터를 가져오는 것이에요. 이번에는 '캐릭터' 뒤에 '.results'를 추가할 거에요.

<div class="content-ad"></div>

이제 이 캐릭터들의 경로를 알았습니다. "characters.results"입니다.

카드를 생성하기 전에 index.html에서 cards-container div를 index.js로 가져와야 합니다. API를 가져올 때 캐릭터를 렌더링 할 곳이 되기 때문입니다. index.js에서 전역 변수를 만들고(어떤 함수 외부에서) DOM(Document Object Model)의 querySelector() 메서드를 사용하여 Id가 'cards-container'인 div를 가져와야 합니다.

<div class="content-ad"></div>

```js
const cardsContainer = document.querySelector('#cards-container');
```

이제 다음 단계로 넘어가 보겠습니다. 콜백 함수를 만드는 것입니다.

'characters' (데이터)를 인자로 사용하여 'renderCharacters'라는 함수를 생성할 것입니다. 이 함수 블록에서 우리는 characters로 시작하여 forEach() 메소드를 사용할 것입니다. 각 character마다 div 카드가 생성될 것입니다. 이 카드에는 캐릭터의 이미지, 이름, 종류, 캐릭터를 좋아하는 좋아요 버튼이 포함될 것입니다. 우리는 DOM의 createElement() 메소드를 사용하여 새로운 요소를 생성할 수 있고 각 새로 생성된 요소를 개별 변수로 선언할 수 있습니다.

```js
function renderCharacters(characters) {
  characters.forEach(character => {
    const div = document.createElement('div');
    const image = document.createElement('img');
    const name = document.createElement('h3');
    const species = document.createElement('h3');
    const like = document.createElement('button');
```

<div class="content-ad"></div>

다음으로는 CSS를 사용하여 스타일을 적용할 수 있도록 div, 이미지 및 좋아요 버튼에 class를 추가합니다. 이를 위해 요소 이름 뒤에 점 표기법을 사용하여 해당 요소에 사용할 이름을 할당해주면 됩니다.

```js
div.classList = 'card'
image.classList = 'card-img'
like.classList = 'empty'
```

선호하는 API에 따라 데이터를 가져오는 것이 가능합니다. Rick and Morty API의 경우 캐릭터의 이미지, 이름 및 종족이 제공되므로 해당 데이터를 가져오기 위해 점 표기법을 사용할 수 있습니다.

```js
image.src = character.image
name.innerText = `이름: ${character.name}`
species.innerText = `종족: ${character.species}`
like.textContent = '좋아요'
```

<div class="content-ad"></div>

캐릭터 이미지를 얻기 위해서는 이미지 뒤에 'src' (소스의 약자)를 추가한 후 character.image에 할당해야 합니다. 이름과 종 요소에 대해서는 innerText와 역따옴표 (``)를 사용했습니다. 캐릭터의 이름과 종 옆에 텍스트를 표시하려면 이 작업이 필요합니다. 이를 위해 역따옴표와 보간 구문 (`$''`)을 사용합니다. 그렇지 않으면 'Name:'과 'Species:' 텍스트가 표시되지 않습니다. 또한, 좋아요 버튼에는 'like'의 textContent를 지정해줍니다.

마지막으로, 이러한 요소들을 새롭게 생성한 div 요소에 추가한 다음 해당 div를 이전에 생성한 'cardsContainer' 전역 변수에 추가해야 합니다. 이 단계는 매우 중요합니다. 그렇지 않으면 새롭게 생성된 카드가 전혀 표시되지 않습니다. 이를 위해 appendChild() 메서드를 사용합니다. 우리는 이미지, 이름, 종, 그리고 좋아요 버튼을 개별적으로 div에 추가한 다음 그 div를 이제 카드가 존재할 'cardsContainer'에 추가합니다.

팁: 요소를 추가한 순서가 페이지에 나타나는 순서입니다. 이 경우에는, 캐릭터 이미지가 먼저 나타나고 그 다음으로 이름 및 기타 정보가 나타나도록 하려고 합니다.

<div class="content-ad"></div>

함수 전체를 다음과 같이 작성해 보세요:

```js
function renderCharacters(characters) {
  characters.forEach(character => {
    const div = document.createElement('div');
    const image = document.createElement('img');
    const name = document.createElement('h3');
    const species = document.createElement('h3');
    const like = document.createElement('button');
    div.classList = 'card';
    image.classList = 'card-img';
    like.classList = 'empty';
    image.src = character.image;
    name.innerText = `이름: ${character.name}`;
    species.innerText = `종: ${character.species}`;
    like.textContent = '좋아요';
    div.appendChild(image);
    div.appendChild(name);
    div.appendChild(species);
    div.appendChild(like);
    cardsContainer.appendChild(div);
  });
};
```

멋져요! 마지막 단계는 다시 fetch로 돌아가서 두 번째 'then()'에서 renderCharacters를 콜백으로 호출하는 것입니다. characters.results를 이용하여 캐릭터 배열에 접근하는 방법을 알고 있으므로 해당 매개변수로 추가해줍시다.

<img src="/assets/img/2024-06-23-HowtofetchdatafromanAPIandrenderitintocardsusingJavaScript_5.png" />

<div class="content-ad"></div>

브라우저에서 index.html을 열어보면 이와 같은 모습을 볼 수 있을 거에요.

![image](https://miro.medium.com/v2/resize:fit:1400/1*9bylXDqCvO_s_lbb9KQHGA.gif)

이게 다에요! 이제 각 캐릭터에 대한 카드를 공식적으로 만들었어요. 이제 CSS를 사용하여 카드를 스타일링하고 원하는 대로 보이게 만들 수 있어요. 테두리를 추가하거나 가운데 정렬하거나 꾸밈을 줄 수 있어요. 더 멋지게 하려면 플렉스박스를 사용해보세요. 우리는 div card, image, like 버튼에 대한 클래스를 생성했으므로 CSS에서 규칙을 설정할 수 있을 거에요. 잘하고 있어요!