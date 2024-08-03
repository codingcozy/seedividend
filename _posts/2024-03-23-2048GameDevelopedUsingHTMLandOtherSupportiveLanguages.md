---
title: "HTML, CSS, JS로 2048 게임 만드는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "2048 Game Developed Using HTML and Other Supportive Languages"
link: "https://compcit.medium.com/2048-game-developed-using-html-and-other-supportive-languages-1e6f52f04f15"
---



게임 보드에 대한 HTML 요소, 스타일링을 위한 CSS 및 게임 로직을 담당하는 JavaScript를 사용하여,이 코드는 2048 게임을 위한 기본 프레임워크를 구축합니다. 스와이프 제어, 점수 매기기 및 이기기/지는 기준과 같은 추가 기능은이 코드를 확장하여 추가할 수 있습니다.

index.html

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2048 게임</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>2048 게임</h1>
        <div class="game-container">
            <div id="game-board"></div>
            <button onclick="resetGame()">게임 재설정</button>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

styles.css

<div class="content-ad"></div>

```js
css
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f8f8f8;
}

.container {
    max-width: 600px;
    margin: 50px auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
}

.game-container {
    text-align: center;
    margin-top: 20px;
}

#game-board {
    display: inline-block;
    border: 2px solid #ccc;
    border-radius: 5px;
}

.tile {
    width: 100px;
    height: 100px;
    background-color: #eee;
    border-radius: 5px;
    margin: 5px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
}

button {
    padding: 10px 20px;
    border: none;
    background-color: #4caf50;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
}

button:hover {
    background-color: #45a049;
}
```

script.js

```js
const gameBoard = document.getElementById("game-board");

let board = [];
let score = 0;

// Initialize the game board
function init() {
  for (let i = 0; i < 4; i++) {
    board[i] = [];
    for (let j = 0; j < 4; j++) {
      board[i][j] = 0;
    }
  }
  addTile();
  addTile();
  render();
}

// Add a new tile (2 or 4) to a random empty cell
function addTile() {
  let options = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) {
        options.push({ x: i, y: j });
      }
    }
  }
  if (options.length > 0) {
    let spot = options[Math.floor(Math.random() * options.length)];
    board[spot.x][spot.y] = Math.random() > 0.5 ? 2 : 4;
  }
}

// Render the game board
function render() {
  gameBoard.innerHTML = "";
  board.forEach((row) => {
    row.forEach((cell) => {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      if (cell !== 0) {
        tile.textContent = cell;
        tile.style.backgroundColor = `rgb(${204 - cell * 16}, ${255 - cell * 16}, ${255 - cell * 16})`;
      }
      gameBoard.appendChild(tile);
    });
  });
}

// Reset the game
function resetGame() {
  board = [];
  score = 0;
  init();
}

// Initialize the game
init();
```

어떻게 코드를 실행할 수 있나요?

<div class="content-ad"></div>

- "project"라는 디렉토리를 만들어주세요.
- "project" 디렉토리로 이동하여 index.html, styles.css 및 script.js 세 개의 스크립트를 생성해주세요.
- index.html 파일에 마우스 오른쪽 버튼을 클릭하여 브라우저에서 실행해주세요.
- 이제 게임을 즐길 준비가 되었습니다.

더 많은 정보는 저희 웹사이트를 방문해주세요.
