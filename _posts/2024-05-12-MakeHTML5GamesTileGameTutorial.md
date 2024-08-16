---
title: "HTML 5 게임 만들기  타일 게임 튜토리얼"
description: ""
coverImage: "/assets/img/2024-05-12-MakeHTML5GamesTileGameTutorial_0.png"
date: 2024-05-12 23:33
ogImage: 
  url: /assets/img/2024-05-12-MakeHTML5GamesTileGameTutorial_0.png
tag: Tech
originalTitle: "Make HTML 5 Games — Tile Game Tutorial"
link: "https://medium.com/gitconnected/make-html-5-games-tile-game-tutorial-f6d3dbb94b20"
isUpdated: true
---




## 모든 필요한 것

이 튜토리얼과 매칭 비디오 튜토리얼에서는 HTML 5 Canvas와 JavaScript를 사용하여 타일 게임을 코딩하는 단계를 살펴볼 것입니다.

![이미지](/assets/img/2024-05-12-MakeHTML5GamesTileGameTutorial_0.png)

타일 게임은 기본적으로 그리드로 배열된 게임이거나 타일을 드래그하는 게임입니다. 이 경우, 우리는 객체의 나머지가 변화하는 것과 달리 어떤 객체가 변하지 않는지 알아내는 그리드 기반 게임을 가지고 있습니다. 이 게임은 또한 패턴 게임이라고도 불릴 수 있습니다.



화면 하단에는 찾아야 할 "영원한" 물체의 수와 소요된 시간이 표시됩니다. 다섯 개의 레벨이 있으며, 각 레벨마다 더 많은 물체와 찾아야 할 더 많은 물체가 있습니다. 리더보드를 사용하여 가장 낮은 시간을 추적합니다.

![이미지](/assets/img/2024-05-12-MakeHTML5GamesTileGameTutorial_1.png)

간단한 Tile 게임과 완전한 Tile 게임 두 가지 예제가 있습니다. 먼저 간단한 것을 살펴보셔도 좋지만, 튜토리얼에서는 완전한 게임을 만드는 단계를 안내해드립니다.

## 준비하기



아무도 따라 할 수 있어야 하지만, 이러한 종류의 게임을 직접 만드는 데 사용되는 많은 기술과 기술이 있습니다. 이 마법의 세계를 소개하는 ◎ 캔버스에서 코딩 창의성 가이드를 확인해보세요.

![게임 만들기](/assets/img/2024-05-12-MakeHTML5GamesTileGameTutorial_2.png)

우리는 코딩 창의성을 위한 ZIM JavaScript 캔버스 프레임워크로 게임을 만들 것입니다! ZIM으로 만들 수 있는 다양한 것들을 확인해보기를 원할 수도 있습니다. ZIM으로 만들 수 있는 많은 것들이 있는 사이트도 확인해보세요. Zapp이 많이 있는 온라인 편집기도 있습니다!

## 편집기



일반적으로 Microsoft의 무료이고 빠르게 설치할 수 있는 VS Code와 같은 데스크탑 편집기에서 게임을 만듭니다. 여러분이 VS Code를 사용 중이라고 가정하고 튜토리얼을 진행할 것입니다. 하지만 원한다면 온라인에서 모두 코딩할 수 있는 ZIM 편집기에서도 작업할 수 있어요.

## 템플릿

VS Code에서 시작하려면 tile.html이라는 새 파일을 만들고 https://zimjs.com/code에서 ZIM 템플릿을 가져오세요. "COPY" 버튼을 눌러 페이지에 붙여넣기하세요. ZIM 편집기에서 작업 중이라면 이 과정이 필요하지 않아요.

<img src="/assets/img/2024-05-12-MakeHTML5GamesTileGameTutorial_3.png" />



저장 후 브라우저에서 페이지를 확인해보세요. 파일 시스템에서 페이지를 찾아 브라우저에 끌어다 놓거나 마우스 오른쪽 버튼을 클릭하여 Chrome 등으로 열 수 있습니다. 또한 VS Code에 Open In Browser 또는 Live Server 확장 프로그램을 설치하여 핫키로 또는 마우스 오른쪽 버튼으로 바로 VS Code에서 파일을 열 수 있습니다.

![MakeHTML5GamesTileGameTutorial_4](/assets/img/2024-05-12-MakeHTML5GamesTileGameTutorial_4.png)

브라우저에서 보면 창에 맞는 회색 상자 안에 끌어올릴 수 있는 보라색 원이 있을 것입니다. 이 원, 가운데 정렬 및 드래그 코드를 삭제하세요. 테스트해보면 회색 상자가 표시될 것입니다.

![MakeHTML5GamesTileGameTutorial_5](/assets/img/2024-05-12-MakeHTML5GamesTileGameTutorial_5.png)



## 템플릿 코드 대 ZIM 편집기

# 게임 만들기

이 게임에서는 타이머와 소리 아이콘에 대한 ZIM 게임 및 Pizzazz 모듈을 사용할 것입니다. 프레임 내의 크기와 색상을 조정하려면 아래와 같이 코드를 조정해봅시다:

```js
import zim from "https://zimjs.org/cdn/016/zim_game";
import zim2 from "https://zimjs.org/cdn/016/zim_pizzazz";

// FIT, FILL, FULL 및 TAG에 대한 Frame의 Docs 참조
new Frame(FIT, 720, 1280, black, darker, ready);
```



만약 ZIM 편집기를 사용 중이라면, 상단의 Phone에서 P를 눌러서 portrait 모드로 설정하고, Game과 Pizzazz 상자를 위로 올려놓으세요. 또한 F.color를 black으로 설정하세요.

![image](/assets/img/2024-05-12-MakeHTML5GamesTileGameTutorial_6.png)

## 타일 살펴보기

간단한 ZIM Tile()을 살펴봅시다. 이는 항목의 그리드입니다.



```js
// Tile(obj, cols, rows, spacingH, spacingV, ... lots more)
const pods = new Tile(new Circle(50, [pink, blue, yellow]), 6, 10, 10, 10)
  .center();
```

![이미지](/assets/img/2024-05-12-MakeHTML5GamesTileGameTutorial_7.png)

Circle에 전달된 색상 배열은 ZIM VEE 값이라고 불리며, ZIM VEE의 버전 5에서 동적 매개변수를 위해 고안된 것입니다. 이를 통해 Tile은 배열에서 무작위로 항목을 선택하여 생성할 수 있습니다. Pick 문서를 참조하세요. 다른 ZIM VEE 값은 시리즈입니다. Circle 코드를 아래와 같이 수정하세요:

```js
new Circle(50, series(pink, blue, yellow))
```




![Tutorial Step 8](/assets/img/2024-05-12-MakeHTML5GamesTileGameTutorial_8.png)

각 항목을 누를 때마다 빨간색으로 변경해 봅시다. ZIM이 구축된 CreateJS는 JavaScript의 addEventListener()와 비슷한 on() 메소드를 제공하는데, 짧고 간결하며 mousedown 이벤트를 캡처할 수 있습니다. 'e'는 이벤트 객체로서 우리에게 목표물인 이벤트를 일으킨 객체와 같은 추가 정보를 제공합니다. 변화가 갱신되도록 stage update()를 사용합니다. 자동으로 업데이트하지 않아 배터리 소모를 줄입니다.

```js
pods.on("mousedown", e=>{
 e.target.color = red;
 S.update();
});
```

![Tutorial Step 9](/assets/img/2024-05-12-MakeHTML5GamesTileGameTutorial_9.png)



만약 선택된 색상이 분홍색인 경우에만 색상을 빨간색으로 변경할 수도 있어요:

```js
pods.on("mousedown", e=>{
 if (e.target.color == pink) {
  e.target.color = red;
  S.update();
 } 
});
```
일정 시간마다 발생하는 ZIM interval로 색상을 변경할 수도 있어요:

```js
interval(.2, ()=>{ // 초 단위로 지정하며 호출할 함수
 // pluck은 임의의 항목을 가져오고 true는 해당 항목을 제거합니다
 pluck(pods.items, true).color = purple;
 S.update();
}, pods.items.length); // interval을 실행할 횟수
```



<img src="/assets/img/2024-05-12-MakeHTML5GamesTileGameTutorial_10.png" />

## 포드

우리 타일은 플라즈마 포드들이에요! 백 개의 포드를 담고 있는 그림을 만들었어요.

우리는 Frame()의 자산 및 경로 매개변수를 사용해서 자산을 로드합니다. 혹시 ZIM 에디터를 사용 중이라면, Frame의 loadAssets() 메서드를 사용하여 완료 이벤트를 추가하세요. VS 코드에서 작업 중이라면, Tile 코드를 삭제하거나 주석 처리하고 다음 코드를 추가하세요. 기억하세요, Frame과 ready의 끝 부분을 교체하고 있습니다.



```js
// FIT, FILL, FULL 및 TAG에 대한 프레임을 참조하세요
const assets = ["plasmapods.jpg"];
const path = "https://zimjs.org/assets/";
new Frame(FIT, 720, 1280, black, darker, ready, assets, path);
function ready() {
    
 // 주어진 F (Frame), S (Stage), W (너비), H (높이)
 // 여기에 코드를 넣으세요

 new Pic("plasmapods.jpg").center().drag();

} // 준비 끝
```

만약 ZIM 편집기를 사용 중이라면, 이 코드를 사용하세요:

```js
const assets = ["plasmapods.jpg"];
const path = "https://zimjs.com/assets/";
F.loadAssets(assets, path);
F.on("complete", () => {

 new Pic("plasmapods.jpg").center().drag();
 // 이제부터 여기에 코드를 작성하세요

 S.update();
}) // loadAssets 끝
```

<img src="/assets/img/2024-05-12-MakeHTML5GamesTileGameTutorial_11.png" />




## 스프라이트

우리는 플라즈마 팟 사진을 스프라이트 시트로 사용하여 ZIM Sprite()를 만들 것입니다. 이것에 대한 다른 용어로는 텍스처 아틀라스가 있습니다. 새로운 Pic()을 100개의 팟을 50초 동안 표시하는 새로운 Sprite()로 교체합니다. 우리는 선택 링을 쉽게 찾을 수 있도록 등록 지점을 중앙에 맞추기도 합니다.

```js
const pod = new Sprite("plasmapods.jpg", 10, 10).centerReg().run(50);
```  

## 타일



모든 pod를 가로와 세로 갯수를 정하는 ZIM Tile()로 타일링해보세요. 이 함수는 obj, cols, rows, spacingH, spacingV를 받습니다. 여러분의 코드를 다음과 같이 변경해보세요:

```js
// SPRITE
const pod = new Sprite("plasmapods.jpg", 10, 10).reg(CENTER); 
let cols = 4;
let rows = 5;
const pods = new Tile(pod, cols, rows, 10, 10)
 .scaleTo(S, 95, 95)
 .center();
// 모든 pod를 반복하며 처리합니다
pods.loop(pod=>{  
 pod.frame = rand(99); 
});
```

<img src="/assets/img/2024-05-12-MakeHTML5GamesTileGameTutorial_12.png" />

## 고유한 Pods



일부 팟들이 반복되는 것을 주목해주세요. 그것은 우리가 원치 않습니다. 그래서 0부터 99까지의 100개 인덱스를 ZIM shuffle()을 사용해서 무작위로 섞고 싶습니다.

```js
const options = [];
loop(100, i=>{options.push(i)}); // 모든 100개
shuffle(options);

// 모든 팟들을 순회합니다
pods.loop((pod,i)=>{  
 pod.frame = options[i]; 
});
```

<img src="/assets/img/2024-05-12-MakeHTML5GamesTileGameTutorial_13.png" />

## Eternals



특별한 오브를 "영원한 것"이라고 부를 거에요. 이건 배열 조작이 조금 복잡해질 거에요.

첫 번째 레벨에서는 무작위 목록에서 두 개를 빼야 해요. JavaScript의 splice()를 사용해 첫 번째 두 개를 제거하고 저장할 거에요. 우리는 타일의 랜덤하게 선택된 두 곳의 프레임 넘버를 우리의 영원한 프레임 넘버로 변경할 거에요. 여기에 전체 코드가 있어요. 위에 있는 변경 사항을 주목해 주세요.

```js
// SPRITE
const pod = new Sprite("plasmapods.jpg", 10, 10).reg(CENTER); 

// LEVELS
let level = 0;

// TILE
let cols = 4;
let rows = 5;
let stable = level+2; // 변하지 않는 것의 수

const pods = new Tile(pod, cols, rows, 10, 10)
 .scaleTo(S, 95, 95)
 .center();

// 프레임 설정

const options = [];
loop(100, i=>{options.push(i)}); // 모든 100
shuffle(options); // 섞음

const eternals = options.splice(0,stable); // 100개 중 두 개의 프레임

// 영원한 프레임의 위치 찾기
// 가능한 모든 타일 인덱스 생성
const allSpots = [];
loop(cols*rows, i=>{allSpots.push(i)});
// 영원한 프레임을 위해 두 개의 랜덤 지점 가져오기
const spots = shuffle(allSpots).splice(0,stable);

// 모든 파드 반복
pods.loop((pod,i)=>{  
 pod.frame = options[i]; 
 let index = spots.indexOf(i); // i의 인덱스 찾기, 없으면 -1
 if (index >= 0) pod.frame = eternals[index]; // 영원한 것으로 덮어씀 
});

// 영원한 것 테스트:
STYLE = {dashed:true}
loop(spots, index=>{
 // 팟의 너비는 크기 조정된 타일 안에 있음
 // 하지만 원형 링은 밖에 있으므로 크기에 맞게 조정
 new Circle(pod.width/2*pods.scale, clear, white, 10)
  .loc(pods.items[index]);
});
```

<img src="/assets/img/2024-05-12-MakeHTML5GamesTileGameTutorial_14.png" />



## 간격

다른 팟들을 변경할 수 있게끔 ZIM interval()을 사용해봐요. 먼저 초 단위로 설정하고, 호출할 함수, 실행횟수, 그리고 바로 시작할지 여부를 넣어야 해요. 우리는 기존 팟들 사이를 반복하는 함수 주변에 간격 함수를 설정할 거예요. 그리고 이를 즉시 실행할 거예요. 각 번마다 옵션을 섞어주는 것도 잊지 않도록 하죠. 스테이지 업데이트도 필요해요.

```js
let inter = interval(1, ()=>{
 shuffle(options);
 // 모든 팟들을 반복
 pods.loop((pod,i)=>{  
  pod.frame = options[i]; 
  let index = spots.indexOf(i); // i의 spots 내 인덱스, 없으면 -1
  if (index >= 0) pod.frame = spots[index]; // 영구 프레임으로 덮어쓰기
 });
 S.update()
}, null, true); // 바로 실행하려면 true로 설정
```

우리의 영구들은 변하지 않아요! 우리는 그들 주위에 링을 둘러보았어요... 게임을 플레이할 수 있도록 링들을 주석처리해볼까요 (선택 후 CTRL 또는 ⌘ / 를 눌러주세요)?



```js
// // test eternals:
// STYLE = {dashed:true}
// loop(spots, index=>{
//  // the width of the pod is inside a scaled Tile 
//  // but circle ring is outside, so adjust for scale
//  new Circle(pod.width/2*pods.scale, clear, white, 10)
//   .loc(pods.items[index]);
// });
```

## 상호작용

이제, pods를 눌러서 정답을 맞는지 확인하고 싶습니다. .cur()를 사용하여 타일의 커서를 활성화할 수 있습니다. 그래서 타일에 그것을 추가해 보겠습니다. 또한 타일에 mousedown 이벤트를 추가할 것입니다. 일단은... 우리가 누른 팟을 제거하는 것으로만 테스트해 보겠습니다. 다음과 같이 팟 코드를 조정하세요:

```js
const pods = new Tile(pod, cols, rows, 10, 10)
 .scaleTo(S, 95, 95)
 .center()
 .cur();
pods.on("mousedown", e=>{
 const pod = e.target;
 pod.removeFrom();
 S.update();
});
```



## 틀린 방법과 올바른 방법

타일(좇) 안의 각 아이템은 해당 인덱스와 일치하는 tileNum을 가지고 있습니다. 우리는 해당 tileNum이 eternals의 인덱스를 보유하는 spots 배열 안에 있는지 확인할 수 있습니다.

```js
pods.on("mousedown", e=>{
 // 우리가 영구적인 스팟의 인덱스 중 하나를 눌렀는지 알아냅니다
 // 타일의 각 요소는 tileNum을 가지고 있습니다
 // spots 배열은 영구 요소의 타일 내 인덱스를 보유합니다
 // 따라서 우리가 누른 요소의 tileNum이 spots 안에 있는지 확인합니다
 const ind = spots.indexOf(e.target.tileNum);
 if (ind >= 0) {  // 올바른 방법
  STYLE = {dashed:true, once:true}
  // 스팟을 강조 표시합니다 - 주의, 링은 전역이며, 크기가 조정된 타일 내부가 아닙니다
  new Circle(pod.width/2*pods.scale, clear, white, 18).loc(e.target);
 } else { // 틀린 방법
  e.target.sca(.5); // 일단은 무언가를 수행합니다...
 }
 S.update();
});
```



<img src="/assets/img/2024-05-12-MakeHTML5GamesTileGameTutorial_16.png" />

## 레벨 완료

우리가 추측을 끝냈는지 어떻게 알 수 있을까요? 만약 우리가 같은 것을 두 번 이상 추측하면 어떻게 해야 할까요? 이 문제를 해결하기 위해 우리는 올바른 추측을 추적하기 위해 배열을 사용하고, 이미 배열에 있는 경우 올바른 추측으로 계산하지 않습니다. 배열의 길이가 레벨에 대한 stable 변수와 같아지면 레벨을 완료한 것입니다.

```js
const correct = [];
const pods = new Tile(pod, cols, rows, 10, 10)
 .scaleTo(S, 95, 95)
 .center()
 .cur();
pods.on("mousedown", e=>{
 // 우리가 영구적인 위치의 색인을 눌렀는지 확인합니다.
 // 타일의 각 요소는 타일번호를 가지고 있습니다.
 // spots 배열은 영구적인 위치의 타일 인덱스를 보유합니다.
 // 따라서 누른 것의 타일번호가 spots에 있는지 확인해 봅니다.
 const ind = spots.indexOf(e.target.tileNum);
 if (ind >= 0 && !correct.includes(ind)) { // 정확하고 이미 찾은 것이 아닌 경우
  STYLE = {dashed:true, once:true}
  // 스팟을 강조 표시합니다 - 주의, 링은 전역 변수이며, 스케일 조정된 타일 내에 있지 않습니다.
  new Circle(pod.width/2*pods.scale, clear, white, 18).loc(e.target);
  correct.push(ind);
  if (correct.length == stable) nextLevel();
 } else { // 틀린 경우
  e.target.sca(.5); // 지금은 그냥 무언가를 해 봅니다...
 }
 S.update();
});

function nextLevel() {
 zogg("다음 레벨"); // 콘솔을 위해 F12를 사용하세요 (또는 노트북의 기능 키 F12)
}
```



# 레벨

코드의 레벨 부분을 찾아 아래와 같이 조정하세요. 패턴을 따르지 않는 레벨 열과 행을 보유한 배열을 만들 것입니다. 또한 다가오는 makeLevel() 함수 외부에서 필요한 몇 가지 변수를 준비합니다. 기존 코드에서 inter의 let을 제거해야 합니다.

```js
// 레벨
let level = 0;

// 각 레벨의 열과 행을 나타내는 배열을 만듭니다.
// 이를 사용해서 더 짧은 테스트를 실행하세요
// const levels = [[4,5],[5,7]];
const levels = [[4,5],[5,7],[6,8],[7,10],[8,11]];

let lastPods;
let inter;

// 정확한 추측 링을 보유합니다.
const rings = new Container(W,H).addTo();
```

```js
// 기존 간격 코드에서 let을 제거하세요:
inter = interval(1, ()=>{
```



위의 코드를 makeLevel() 함수로 감싸세요. TILE 섹션 위에서부터 시작하는 코드를 makeLevel() 함수로 감싸세요. 또한 cols와 rows를 levels 배열을 사용하도록 조정하세요. makeLevel() 함수의 맨 위 코드는 다음과 같습니다.

```js
function makeLevel() {
            
 // TILE
 const cols = levels[level][0];
 const rows = levels[level][1];
 const stable = level+2; // 원하는 만큼 고정될 타일 수
```

가장 아래 부분까지 이동해서 VS Code에서 end ready if 내에 남은 makeLevel() 함수의 끝 부분을 추가하세요. 그리고 함수를 호출하세요.
```js
} // makeLevel 함수의 끝

makeLevel();
```



## 단계 진행하기

새 단계를 위한 새로운 타일을 만들기 전에 이전 타일과 링을 제거해야 합니다. 이미 rings Container를 만들었습니다. 이것을 사용하여 링을 보관할 것입니다. 그러므로 링 코드를 조정하세요. 우리는 링을 loc()에 추가했다는 것을 주목하세요. 나중에 rings의 모든 하위 항목을 제거할 수 있게 될 것입니다.

```js
new Circle(pod.width/2*pods.scale, clear, white, 18)
 .loc(e.target, null, rings);
```



이제 nextLevel() 함수 위에 이 코드를 추가하세요. 이것은 NEXT 레벨이며 makeLevel이 아닌 것입니다. 여기서는 pods을 alpha 0에서 animate하여 불투명도를 조절합니다. 이렇게 하면 레벨 간에 서서히 사라집니다. 현재 pods을 lastPods에 저장하여 다음 레벨로 이동할 때 기억합니다. 반지를 퇴장시키고 완료되면 제거합니다.

```js
// LEVEL 처리

pods.alp(0).animate({
 wait:lastPods?1:0,
 props:{alpha:1},
 time:.5
});
lastPods = pods;

// 반지를 숨기고 지우고 표시합니다.
rings.top().animate({
 rewind:true,
 time:.5,
 props:{alpha:0},
 rewindCall:()=>{
  rings.removeAllChildren();
 }
});

function nextLevel() {
 zogg("다음 레벨"); // 콘솔을 열려면 F12 키(혹은 노트북의 Function F12 키)를 사용하세요
}
```

nextLevel() 함수 안에 이 코드를 추가하세요. 마지막 pods를 animate하여 사라지게 하고, 마지막 간격을 지우고, 레벨을 늘리고, 게임의 끝인지 확인한 후 makeLevel()을 호출하세요.

```js
function nextLevel() {

 // 마지막 pods를 animate하여 사라지게 함
 // 캐싱은 모바일에서의 부드러운 애니메이션에 도움이 됨
 lastPods.cache().animate({
  props:{alpha:0},
  time:.5,
  call:target=>{target.dispose();}
 });   

 inter.clear(); // 현재 간격을 지움

 level++;
 if (level < levels.length) { // 더 많은 레벨
  makeLevel();
 } else { // 게임 종료

  zogr("게임 끝");   
  
 } // 게임 종료

} // nextLevel의 끝
```  



<img src="/assets/img/2024-05-12-MakeHTML5GamesTileGameTutorial_17.png" />

## 발신자

선택 사항을 ZIM Emitter()로 향상시킬 수 있습니다. 이는 입자를 방출합니다. 발신자를 링 컨테이너 아래에 만들어보세요:

```js
// 정확한 추측 링을 보관합니다
const rings = new Container(W, H).addTo();

STYLE = {dashed: true};
const emitter = new Emitter({
 obj: new Circle(90, clear, series(pink, purple), 18),
 interval: .3,
 gravity: 0,
 force: 0,
 animation: {props: {scale: 5},
 startPaused: true
});
STYLE = {}
```



emitter에서 pod의 mousedown 이벤트가 발생했을 때 spurt() 함수를 호출하세요. 기존의 nextLevel() 함수 호출 아래에 추가하세요.

```js
correct.push(ind);
if (correct.length === stable) nextLevel();

emitter.loc(e.target).spurt(2);
emitter.particles.top(); // 입자들이 emitter와 별개로 존재하기 때문에 tricky 함
```

![이미지](/assets/img/2024-05-12-MakeHTML5GamesTileGameTutorial_18.png)

흰색 링은 emitter 작업이 대부분 완료될 때까지 표시되지 않아야 하므로 기존 링 Circle에 페이드 인 애니메이션을 추가하세요. 세미콜론(;)을 확인해주세요.



```js
새 Circle(pod.width / 2 * pods.scale, clear, white, 18)
 .loc(e.target, null, rings)
 .alp(0)
 .animate({
  wait: .5,
  alpha: .9
 });
```

## 보상 화면

우리는 한 수준에서 다른 수준으로 애니메이션화되는 것에 만족하지 않습니다. 어떤 보상이 필요합니다. 소리는 도움이 될 것입니다... 하지만 이쁜 구체들이 있습니다. 플레이어에게 수집한 영구 구체들을 보여주는 약간 더 많은 시간을 쓰도록 합시다. 기존의 lastPods animate 코드 하단에 기다림을 조절하고 한 번 보여주세요!

```js
lastPods.cache().animate({
 wait:1, // 기다리기 추가
 props: {alpha: 0},
 time: .5,
 call: target => {target.dispose();}
});

// 영구 보여주기 – 플레이어에게 잠시 휴식 시간을 줌과 더 큰 플라즈마를 보여줍니다
const showcase = new Tile({
 obj: pod.clone().sca(1.5),
 cols: 2,
 rows: 3,
 spacingH: 20,
 spacingV: 20,
 count: stable
})
 .center();
showcase.loop((pod, i) => {
 // eternals는 영구 구체들의 인덱스를 저장합니다
 pod.run({startFrame: eternals[i], endFrame: eternals[i]});
});
showcase
 .alp(0)
 .animate({
  props: {alpha: 1},
  wait: 1.5,
  time: .5,
  rewindWait: 1,
  rewind: true,
  call: target => {target.dispose();}
 });

inter.clear(); // 현재 간격을 지웁니다
```



이제 우리는 팟 애니메이트 대기 시간을 조정해야 합니다:

```js
pods.alp(0).animate({
 wait:lastPods?3.5:0, // 3.5로 변경
 props:{alpha:1},
 time:.5
});
```

# 마무리

이제 기본 게임 구성은 완료되었습니다. 실제 게임을 먼저 코딩하고 이를 수행할 수 있고 마음에 드는지 확인해야 합니다. 그런 다음 소리, 점수, 패널, 인터페이스 등과 같은 최종 터치를 추가하십시오. 종종 이미지는 마지막에 남겨두지만 스프라이트와 함께 작업하는 것도 좋았습니다.



## 더 많은 에셋

로고를 위한 폰트와 몇 가지 사운드를 로드할 예정입니다. Frame() 영역에 이를 추가하세요. 기존 Frame() 함수에는 추가된 progress 매개변수가 있음을 주의하세요.

```js
const audioSpriteData = {
  src: "audiosprite.mp3",
  audioSprite: [
    // [id, 시작시간(초), 끝시간(초)] 
    // 프리미어에서 확인 - 다른 형식들도 존재함
    ['blackball', 1.041, 2.475],
    ['bounce', 3.567, 4.232],
    ['end', 5.396, 9.315],
    ['help', 10.373, 10.499],
    ['powerdown', 11.607, 14.254],
    ['powerup', 15.672, 17.081],
    ['slow', 18.354, 19.163],
    ['start', 20.151, 23.594],
    ['submit', 24.931, 27.673],
    ['wallend', 28.632, 29.351],
    ['wallstart', 30.640, 32.323]
  ]
};

const assets = ["gf_Honk", "plasmapods.jpg", "intro.mp3", audioSpriteData];
const path = "https://zimjs.com/assets/";
const progress = new Waiter();

new Frame(FIT, 720, 1280, black, darker, ready, assets, path, progress);
function ready() {
```

만약 ZIM Editor를 사용 중이라면, 아래와 같이 사용하세요:



```js
F.loadAssets(assets, path, progress);
```

## 로고

로고를 맨 위에 추가하세요. 로고에 사용자 지정 글꼴이 얼마나 더 좋은지 확인해보세요! Google Fonts로 가는 바로 가기를 사용하면 assets에 있는 gf_… 를 사용하는 것이 정말 쉬워집니다. ready 함수 내부의 맨 위에 다음을 추가하세요:

```js
new Label("ETERNAL ORBS", 110, "Honk").pos(0, 50, CENTER);
```



<img src="/assets/img/2024-05-12-MakeHTML5GamesTileGameTutorial_19.png" />

## 컨트롤

우리는 밑부분에 인터페이스를 추가할 것입니다. 이 인터페이스에는 음소거 버튼, 찾아야 할 무한루프 수를 보여주는 라벨, 그리고 타이머가 있을 것입니다. 이를 위해 타일을 사용하여 이쁘게 정렬할 것입니다. 이 코드를 로고 아래에 추가해주세요.

```js
// 밑에 있는 인터페이스
const mute = new Button({
 width: 80,
 backing: makeIcon("sound", orange).sca(2),
 toggleBacking: makeIcon("mute", orange).sca(2)
})

const find = new Label("찾기 2", 85, "Honk");

const timer = new Timer({
 backgroundColor: new GradientColor([yellow, red], 90),
 down: false,
 time: 0
});

const bottom = new Tile([mute, find, timer], 3, 1, 80, 0, true)
 .pos(0, 40, CENTER, BOTTOM);
```




![이미지](/assets/img/2024-05-12-MakeHTML5GamesTileGameTutorial_20.png)

각 레벨을 찾기 위한 'eternals'의 수를 업데이트해야 합니다. HANDLE LEVELS 섹션에 다음 라인을 추가해주세요:

```js
// HANDLE LEVELS

find.text = "FIND " + stable;
```

## Sound



위에, 로고 아래에 우리의 모든 소리를 준비해봅시다. 우리는 새로운 Aud()를 사용해서 소리 객체를 만들어요. 그리고 우리가 그 소리를 듣고 싶을 때에는 play() 메소드를 사용해요. 상호작용을 할 때 까지 소리를 재생할 수 없지만, 그 부분은 맨 처음에 LeaderBoard를 추가하여 처리할 거에요.

```js
// SOUND
// 파일, 볼륨, 루프, 등 여러 가지가 있어요
const introSound = new Aud("intro.mp3", .1, true); 
const startSound = new Aud("wallstart", .3);
const rightSound = new Aud("powerup", .3);
const wrongSound = new Aud("wallend", .3);
const endSound = new Aud("submit", .3);
let intro; // 이 변수는 mute fading을 위해 introSound SoundInstance를 보관할 거에요
```

코드 전체에 소리를 뿌리뿌리 흩뿌려봅시다. LeaderBoard를 소개할 때 intro 소리를 들려줄 거에요. play() 코드가 들어간 줄을 추가하고 있어요.

```js
pods.alp(0).animate({
 wait: lastPods ? 3.5 : 0,
 waitedCall: () => {if (!mute.toggled) startSound.play();},
 props: {alpha: 1},     
 time: .5
});
```



그리고 파드의 마우스 다운시에 play() 코드를 추가하고 있습니다.

```js
if (ind >= 0 && !correct.includes(ind)) { // 정답이고 이미 찾은 것이 아니라면
 if (!mute.toggled) rightSound.play();
```

틀린 추측에서는 play() 코드를 추가하고 있습니다.

```js
} else { // 틀렸을 때
 if (!mute.toggled) wrongSound.play();
 e.target.sca(.5); // 일단은 무언가를 해보세요...      
}
```



## 리더 보드

기존 BOTTOM INTERFACE 코드 아래에 다음 코드를 추가하세요. bottom을 removeFrom()하여 Play 버튼을 누를 때까지 표시되지 않도록 하고 bottom을 addTo() 하세요. 코드 맨 아래에는 이미 가지고 있는 SPRITE 코드가 있으므로 중복해서 작성하지 말아주세요. 그리고 startGame() 함수의 괄호를 닫아주세요. 그 다음 작업을 해보겠습니다.

```js
const bottom = new Tile([mute, find, timer], 3, 1, 80, 0, true)
 .pos(0, 40, CENTER, BOTTOM)
 .removeFrom();

// 리더 보드
const lb = new LeaderBoard({
 data: "Y9HC384",
 corner: 0,
 backgroundColor: dark,
 titleColor: light,
 title: "Lowest Finish Times",
 reverse: true
}).scaleTo(S, 90, 90).center().mov(0, 20);
lb.on("close", startGame);

const play = new Button({
 label: "PLAY",
 backgroundColor: new GradientColor([orange, purple], 90)
})
 .pos(0, 40, CENTER, BOTTOM).tap(() => {
  lb.removeFrom();
  startGame();
 });


// 시작 게임

function startGame() {

 bottom.addTo();
 timer.time = 0;

 // 나중에 음소거하려면 play SoundInstance를 저장하세요
 if (!mute.toggled && !intro) intro = introSound.play(); 
 if (!mute.toggled) startSound.play();

 play.removeFrom();

 // SPRITE
 const pod = new Sprite("plasmapods.jpg", 10, 10).reg(CENTER);
}

startGame 함수를 호출한 후 makeLevel()을 호출하여 startGame() 함수를 종료하세요. 문서를 올바르게 들여쓰기하여 형식을 유지해주세요. VS Code에서 오른쪽 클릭하여 "Format Document"를 실행해주세요.



 } // makeLevel 함수 끝

 makeLevel();

} // startGame 함수 끝

![MakeHTML5GamesTileGameTutorial 이미지](/assets/img/2024-05-12-MakeHTML5GamesTileGameTutorial_21.png)

## 음소거 버튼

음소거 기능을 추가하세요. 기존 버튼에 expand()와 tap()을 추가하세요. expand는 모바일에서 쉽게 누를 수 있게 만듭니다.



// 하단 인터페이스
const mute = new Button({
 width: 80,
 backing: makeIcon("sound", orange).sca(2),
 toggleBacking: makeIcon("mute", orange).sca(2)
}).expand().tap(() => {
 if (mute.toggled && intro) intro.fade(0);
 else if (!mute.toggled && intro) intro.fade(.1);
});

<img src="/assets/img/2024-05-12-MakeHTML5GamesTileGameTutorial_22.png" />

## 게임 종료

여기까지 오지 못할 것 같았나요? 오답을 수정해봅시다. 틀린 답을 맞출 때마다 타이머를 늘릴 겁니다.
```



```js
} else { // 잘못됨
 if (!mute.toggled) wrongSound.play();
 timer.time += 10;   
}
```

게임의 조건이 끝날 때, 시간을 리더보드에 추가하고 모든 것을 멈추기 위해 끝 코드를 추가합니다.

```js
} else { // 게임 종료

 // 게임 끝났습니다

 inter.clear();
 rings.animate({
  time: .2,
  props: {alpha: 0}
 });
 // 점수를 리더보드로 전송
 // 상위 열 개 안에 들지 않으면 무시됩니다
 lb.score(timer.time);
 // 최종 쇼케이스를 보기 위해 시간을 제공합니다
 timeout(3.5, () => {
  bottom.removeFrom();
  pods.dispose();
  rings.dispose();
  lb.addTo();
  play.addTo();
  if (!mute.toggled) endSound.play();
 });

} // 게임 종료의 끝
```

이를 쉽게 테스트하기 위해 레벨을 줄일 수 있습니다. LEVELS 코드에서 찾아서 게임을 두 레벨(또는 한 레벨) 후에 종료되도록 변경하세요. 도전적인 레벨을 다시 시도하려면 다시 변경해야 합니다!



```js
// 이것은 각 레벨마다 열과 행이 얼마나 있는지 나타냅니다
// 간단한 테스트 실행에 사용하세요
const levels = [[4,5],[5,7]];
// const levels = [[4, 5], [5, 7], [6, 8], [7, 10], [8, 11]];
```

# 결론

이 튜토리얼에서는 로고와 커스텀 폰트, 리더보드, 오디오 스프라이트와 음소거 버튼을 포함한 완전한 타일/패턴 게임을 만들기 위해 시간을 들였습니다. 또한, 레벨, 리워드 이밋터 및 스프라이트 텍스처 애트라스를 포함하였습니다.

우리는 ZIM을 사용하여 여러 가지 타일형 게임을 만들었습니다. 게임 및 ZIM 예제에 대해 ZIM 배너 페이지를 살펴보세요.


![이미지](/assets/img/2024-05-12-MakeHTML5GamesTileGameTutorial_23.png)

![이미지](/assets/img/2024-05-12-MakeHTML5GamesTileGameTutorial_24.png)

ZIM의 Learn Apps 섹션에는 많은 종류의 타일 게임을 사용하는 e러닝 게임이 있습니다. 메모리 게임과 스크램블 퍼즐과 같은 게임들이 있습니다.

![이미지](/assets/img/2024-05-12-MakeHTML5GamesTileGameTutorial_25.png)



**HTML 5 Games 튜토리얼 및 자료**

- HTML 5 게임 만들기 - 이소메트릭 보드 게임 튜토리얼
- HTML 5 게임 만들기 - 사이드 스크롤러 게임 튜토리얼

더 많은 ZIM 기능과 ZIM 예제가 있습니다. ZIM 포럼이나 디스코드에 참여하시면 즐거운 도움을 받을 수 있습니다!

Dr Abstract



![MakeHTML5GamesTileGameTutorial](/assets/img/2024-05-12-MakeHTML5GamesTileGameTutorial_26.png)