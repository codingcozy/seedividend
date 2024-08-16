---
title: "제 비행을 위해 단일 HTML 파일에 워들을 코딩해봤어요"
description: ""
coverImage: "/assets/img/2024-05-01-ICodedWordleInASingleHTMLFileForMyFlight_0.png"
date: 2024-05-01 22:56
ogImage: 
  url: /assets/img/2024-05-01-ICodedWordleInASingleHTMLFileForMyFlight_0.png
tag: Tech
originalTitle: "I Coded Wordle In A Single HTML File For My Flight"
link: "https://medium.com/gitconnected/i-coded-wordle-in-a-single-html-file-for-my-flight-f30f0f6e8ed2"
isUpdated: true
---




![ICodedWordleInASingleHTMLFileForMyFlight](/assets/img/2024-05-01-ICodedWordleInASingleHTMLFileForMyFlight_0.png)

짜증나는 광고들은 내게 소화불량, 화상, 두통, 비염, 이명, 인사라 등의 고통을 안겨줘요.

- 비행기에서 인플라이트 엔터테인먼트 없이 싼 2시간 비행
- 앱 스토어의 워들 게임에 아마도 여기저기 광고가 있었을 거예요
- 인터넷 연결이 필요하지 않은 워들 게임이 필요했어요. 1) IOS 앱을 짜야 했거나 2) 하나의 HTML 파일만으로 코딩해야 했어요.

이번에 저는 이 일을 위해 IOS 앱 전체를 코딩하기로 결정하지 않았어요. 대신에 몇 시간을 들여 핸드폰 브라우저로 열 수 있는 단일 HTML 파일 워들 게임을 코딩하기로 결정했어요.

<div class="content-ad"></div>

# 워들 규칙 (익숙하지 않다면)

- 목표: 무작위로 생성된 5글자 단어를 추측합니다 (이후 목표 단어로 알려집니다)
- 6번의 시도 기회가 주어집니다 (즉, 6개의 행)
- 단어를 추측하면 추측한 단어가 테이블에 나타납니다

강조된 내용의 의미:

- 녹색 — 이 글자는 목표 단어 안에 있고, 올바른 위치에 있습니다
- 노랑 — 이 글자는 목표 단어 안에 있지만, 올바르지 않은 위치에 있습니다
- 회색 — 이 글자는 목표 단어 안에 없습니다

<div class="content-ad"></div>

# 코드 (주의 — 167줄의 코드)

```js
<div class="container">

    <div id="table-container"></div>
    <br>
    <div>
        사용되지 않는 글자: <br>
        <span id="unused-letters"></span>
    </div>
    <br>

    <input type="text" id="input-text">
    <button onclick="submit()">제출</button>

    <br>
    <div id="message"></div>
    <br>
    <button onclick="init()">재시작</button>
    <button onclick="reveal()">포기</button>
    <br><br>
    <button onclick="forceSubmit()">강제 제출</button>
    <div id="word"></div>

</div>

<script>

init()

function init() {
    // 단어 초기화
    let words = '위의 긴 문자열을 붙여넣으세요'
    words = words.split(' ')
    document.word = words[Math.floor(Math.random() * words.length)]
    document.words = new Set(words)
    document.getElementById('word').innerHTML = ""
    document.getElementById('message').innerHTML = ""
    document.getElementById('unused-letters').innerHTML = 'abcdefghijklmnopqrstuvwxyz'

    // 테이블 초기화
    document.guesses = []
    drawTable()
}

function drawTable() {
    table = document.createElement('table')
    table.className = 'my-table'
  
    for (let i=0; i<6; i++) {
        let tr = document.createElement('tr');
        let empty = false;
        if (i >= document.guesses.length) empty = true;

        if (empty) {
            for (j=0; j<5; j++) {
                let td = document.createElement('td')
                td.innerHTML = '&nbsp;'
                tr.appendChild(td)
            }
        } else {
            let guess = document.guesses[i]
            let target = document.word.toLowerCase()
            classes = ['grey', 'grey', 'grey', 'grey', 'grey']
            dict = {}
            for (j=0; j<5; j++) {
                let letter = target[j]
                if (Object.keys(dict).includes(letter)) dict[letter] += 1
                else dict[letter] = 1
            }
            // 초록색 확인
            for (j=0; j<5; j++) {
                if (guess[j] == target[j]) {
                    classes[j] = 'green'
                    dict[guess[j]] -= 1
                }
            }
            // 노란색 확인
            for (j=0; j<5; j++) {
                let letter = guess[j]
                if (classes[j] == 'green') continue
                if (target.includes(letter) && dict[letter]>0) {
                    classes[j] = 'yellow'
                    dict[letter] -=1
                }
            }
            // 실제 추가
            for (j=0; j<5; j++) {
                let td = document.createElement('td')
                td.innerHTML = guess[j].toUpperCase()
                td.className = classes[j]
                tr.appendChild(td)
            }
        }

        table.appendChild(tr)
    }

    let container = document.getElementById('table-container')
    container.innerHTML = null
    container.appendChild(table)
}

function computeUnusedLetters() {
    used = document.guesses.join('')
    let letters = 'abcdefghijklmnopqrstuvwxyz'
    let out = ''
    for (let i=0; i<26; i++) {
        let letter = letters[i]
        if (!used.includes(letter)) {
            out += letter + ' '
        }
    }
    document.getElementById('unused-letters').innerHTML = out
}

function submit() {
    let inputText = document.getElementById('input-text')
    let value = inputText.value.trim().toLowerCase()

    if (document.words.has(value)) {
        document.guesses.push(value)
        drawTable()
        computeUnusedLetters()
    }
    inputText.value = ''
    inputText.focus()

    if (value == document.word) {
        document.getElementById('message').innerHTML = '당신이 이겼어요!'
    }
}

function reveal() {
    document.getElementById('word').innerHTML = document.word
}

function forceSubmit() {
    // 만약 올바른 단어가 뜻사전에 없는 경우
    let inputText = document.getElementById('input-text')
    let value = inputText.value.trim().toLowerCase()
    document.words.add(value)
    submit()
}

document.getElementById('input-text').addEventListener(
    'keypress', function(event) {
        if (event.key == 'Enter') {
            event.preventDefault();
            submit()
        }
    }
)

</script>

<style>

.container {padding: 16px}
.container, input, button {font-size:32px;}

td {border: 1px solid black; font-size:32px; padding: 0.25em;
    width: 48px; height:48px; text-align: center; line-height: 48px;}

.yellow {background-color: yellow}
.green {background-color: limegreen}
.grey {background-color: lightgrey}

</style>
```

<div class="content-ad"></div>

테이블태그를 Markdown 형식으로 변경하려고 했어요.

# 이 단어들

하하... 이게 대체 뭐야? 😄

<div class="content-ad"></div>

이 HTML wordle는 인터넷 연결을 사용할 수 없어요. 모든 5글자 단어들은 미리 코드로 작성되어 있어야 해요. 신기하게도, 'greek'과 같은 몇몇 유효한 5글자 단어는 안에 포함돼 있지 않아요 — 그래서 '강제 제출' 기능을 추가했어요.

일부 단어들이 솔직히 제게는 약간 수상해 보여서, 여러분이 직접 실행할 때 자신만의 단어 사전을 관리해보세요!

## 이런 단어들은 어디서 찾았을까요?

온라인(정확한 출처는 잊었어요)

<div class="content-ad"></div>

# 결론

비행기에서 즐거운 시간 보내세요! (인터넷 연결이 없으면 별로 유용하지 않을 수도 있어요)

# 제작자로서 저를 지원해주고 싶으시다면

- 이 이야기에 50번 박수를 쳐 주세요
- 생각을 남겨 주세요
- 이야기 중 가장 마음에 드는 부분을 강조해 주세요

<div class="content-ad"></div>

감사합니다! 작은 일이라도 큰 도움이 되어요. 정말 감사합니다!

YouTube: [https://www.youtube.com/@zlliu246](https://www.youtube.com/@zlliu246)

LinkedIn: [https://www.linkedin.com/in/zlliu/](https://www.linkedin.com/in/zlliu/)

My Ebooks: [https://zlliu.co/ebooks](https://zlliu.co/ebooks)