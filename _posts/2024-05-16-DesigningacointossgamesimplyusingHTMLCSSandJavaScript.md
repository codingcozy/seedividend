---
title: "HTML, CSS 및 JavaScript를 사용하여 간단히 동전 던지기 게임을 디자인해 봅시다"
description: ""
coverImage: "/assets/img/2024-05-16-DesigningacointossgamesimplyusingHTMLCSSandJavaScript_0.png"
date: 2024-05-16 16:40
ogImage:
  url: /assets/img/2024-05-16-DesigningacointossgamesimplyusingHTMLCSSandJavaScript_0.png
tag: Tech
originalTitle: "Designing a coin toss game simply using HTML, CSS and JavaScript."
link: "https://medium.com/@keremerkengel/designing-a-coin-toss-game-simply-using-html-css-and-javascript-27723870bdce"
isUpdated: true
---

안녕하세요! 오늘은 HTML, CSS 및 JavaScript만을 사용하여 간단하게 동전 던지기 게임을 만드는 방법을 보여 드리겠습니다.

![coin photo](/assets/img/2024-05-16-DesigningacointossgamesimplyusingHTMLCSSandJavaScript_0.png)

먼저 편안한 느낌의 동전 사진이 필요합니다. 찾지 못하더라도 걱정하지 마세요, 아래 링크된 사이트에서 쉽게 찾을 수 있습니다.

링크: [https://icons8.com/](https://icons8.com/)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

동전의 앞면과 뒷면이 선택되면 프로젝트를 시작할 수 있습니다.

# 프로젝트 파일 생성

Microsoft Visual Studio에 들어가서 3개의 기본 페이지를 생성하고 서로 연결합니다. (index.html, style.css, script.js) 여기서 이미지 폴더를 추가할 수 있습니다.

![동전 게임 디자인 예시](/assets/img/2024-05-16-DesigningacointossgamesimplyusingHTMLCSSandJavaScript_1.png)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

비록 페이지의 모습은 당신에게 달려 있지만, 저는 더 간단한 디자인을 사용했어요.

# HTML 코드

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Heads or Tails</title>
    <link rel="stylesheet" href="/style.css">
</head>
<body>
    <div class="container">
        <div class="stats">
            <p id="heads-count">Heads = 0</p>
            <p id="tails-count">Tails = 0</p>
        </div>
        <div id="coin" class="coin">
            <div class="heads">
                <img src="/images/1TL_reverse-removebg-preview.png" alt="reverse">
            </div>
            <div class="tails">
                <img src="/images/1TL_obverse-removebg-preview.png" alt="observe">
            </div>


        </div>
        <div class="buttons">
            <button id="flip-button">동전 던지기</button>
            <button id="reset-button">초기화</button>
        </div>
    </div>
    <script src="scrpit.js"></script>

</body>
</html>
```

여기서, “index.html”에서 우리의 스크립트 파일과 CSS 파일을 함께 링크하는 것을 잊지 마세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# CSS 코드

```js
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;

}
body{
    height: 100%;
    background-color: #6a5acd;
}

.container{
    background-color: #ededed;
    width: 400px;
    padding: 50px;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    box-shadow: 15px 30px 35px rgb(0, 0, 0,0.3);
    border-radius: 10px;
    perspective: 300px;
}

.stats{
    text-align: right;
    color: #101020;
    font-weight: 500;
    line-height: 25px;
}

.coin{
    height: 150px;
    width: 150px;
    position: relative;
    margin: 50px auto;
    transform-style: preserve-3d;
}

.tails{
    transform: rotateX(180deg);
}

.buttons{
    display: flex;
    justify-content: space-between;

}


.coin img{
    width: 145px;
}

.heads,.tails{
    height: 100%;
    width: 100%;
    position: absolute;
    backface-visibility: hidden;
}
button{
    padding: 10px 0px;
    width: 120px;
    border: 3px solid#6a5acd;
    border-radius: 5px;
    cursor: pointer;
}
#flip-button{
    background-color: white;
    color: black;

}

#flip-button:disabled{
    background-color: #e1e0ee;
    color: #101020;
    border-radius: #e1e0ee;
    opacity: 0.6;
}
#reset-button{
    background-color: #fff;
    color: #000;
}

@keyframes spin-tails{
    0%{
        transform: rotateX(0);
    }
    100% {
        transform: rotateX(1980deg);
    }
}
@keyframes spin-heads{
    0%{
        transform: rotateX(0);
    }
    100% {
        transform: rotateX(2160deg);
    }
}
```

# 자바스크립트 코드

```js
let heads=0;
let tails=0;

let coin = document.querySelector(".coin");
let fliptBtn = document.querySelector("#flip-button");
let resetBtn =document.querySelector("#reset-button");

fliptBtn.addEventListener("click",()=>{

    let i= Math.floor(Math.random() *2);

    coin.style.animation = "none";

if(i) {

    setTimeout(() => {
        coin.style.animation = "spin-heads 3s forwards";
    },100);
    heads++;
}else{
    setTimeout(() =>{
        coin.style.animation= "spin-tails 3s forwards ";
    },100);
    tails++;
}
    setTimeout(updateStats, 3000);
    disableButton();
});

function updateStats(){
    document.querySelector("#heads-count").textContent= `Heads : ${heads}`;
    document.querySelector("#tails-count").textContent= `Tails : ${tails}` ;
}

function disableButton(){
    fliptBtn.disabled = true;
    setTimeout(() =>{
        fliptBtn.disabled = false;
    },3000);
}

resetBtn.addEventListener("click", ()=>{
    coin.style.animation="none";
    heads=0;
    tails=0;
    updateStats();
}
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

프로젝트에 이 코드를 포함하면 이제 동전 던지기 게임을 할 수 있어요. 지금까지 읽어주셔서 감사합니다. 다음 프로젝트에서 만나요.

작성자: Kerem Erkengel
