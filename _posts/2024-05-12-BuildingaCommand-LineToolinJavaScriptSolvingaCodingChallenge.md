---
title: "JavaScript로 Command-Line Tool 만드는 방법"
description: ""
coverImage: "/assets/img/2024-05-12-BuildingaCommand-LineToolinJavaScriptSolvingaCodingChallenge_0.png"
date: 2024-05-12 23:52
ogImage:
  url: /assets/img/2024-05-12-BuildingaCommand-LineToolinJavaScriptSolvingaCodingChallenge_0.png
tag: Tech
originalTitle: "Building a Command-Line Tool in JavaScript: Solving a Coding Challenge"
link: "https://medium.com/@abdullahimv25/building-a-command-line-tool-in-javascript-solving-a-coding-challenge-baf103f77120"
---

<img src="/assets/img/2024-05-12-BuildingaCommand-LineToolinJavaScriptSolvingaCodingChallenge_0.png" />

# 소개:

이 가이드에 오신 것을 환영합니다! JavaScript를 사용하여 명령줄 도구를 구축하는 코딩 챌린지에 도전하게 됩니다. 우리의 목표는 텍스트 파일을 분석하고 줄 수, 단어 수, 문자 수 등 다양한 메트릭을 제공할 수 있는 다재다능한 도구를 만드는 것입니다.

여기에서 다룰 도전 과제를 찾을 수 있습니다. 이 작업에는 JavaScript (JS)을 사용하겠습니다. 이제 구현 세부 정보로 바로 들어가 봅시다.

# 환경 설정하기

명령줄 도구를 만들 때 가장 먼저 해야 할 일 중 하나는 코드를 작성할 위치를 결정하는 것입니다. 통합 개발 환경(IDE)에서의 전통적인 개발과는 달리, 스크립팅은 약간 다른 절차를 따릅니다.

먼저, 컴퓨터에 Node.js가 설치되어 있는지 확인하세요. 그런 다음 다음 단계를 따르세요:

- 프로젝트의 루트 디렉토리로 이동합니다.
- mkdir bin 명령을 사용하여 'bin'이라는 새 폴더를 만듭니다.
- 'bin' 폴더 내부에 새 파일을 만듭니다. touch `파일이름`을 사용할 수 있습니다.
- 텍스트 편집기로 파일을 열기 위해 nano `파일이름`을 사용합니다.
- 파일의 맨 위에 다음 해시뱅( shebang) 라인을 추가합니다: #!/usr/local/bin/node. 이 라인은 컴파일러에게 코드를 Node.js를 사용해 해석하도록 지시합니다.
- Ctrl + O를 눌러 변경 사항을 저장한 후 Enter를 누르고 Ctrl + X를 눌러 편집기를 종료합니다.
- chmod +x `파일이름`을 사용하여 스크립트에 실행 권한을 부여합니다.
- bin 폴더 내부에 export PATH="$HOME/bin:$PATH"를 입력합니다.
- 이제이 스크립트를 실행할 때마다 Node.js 스크립트로 해석됩니다.

# 챌린지 해결하기

## 단계 1: 파일의 바이트 수 세기

우리의 첫 번째 작업은 파일의 바이트 수를 계산하고 터미널에서 제공된 인수가 ‘-c’인지 감지하는 함수를 만드는 것입니다. 다음은 이를 어떻게 달성할 수 있는지입니다:

```js
const fs = require("fs");
function readFileContent(fileName) {
  if (!fs.existsSync(fileName)) {
    console.log(`파일을 찾을 수 없습니다: ${fileName}`);
    process.exit(1);
  }

  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) throw err;
    const fileSizeInBytes = Buffer.byteLength(data, "utf8");
    displayResult(fileSizeInBytes);
  });
}
function displayResult(fileSizeInBytes) {
  if (commandLineOption === "-c") {
    console.log(`${fileSizeInBytes} ${fileName}`);
  }
}
let fileName = process.argv[2];
const commandLineOption = process.argv[3];
readFileContent(fileName);
```

이 코드 스니펫에서는 fs.readFile 메서드를 사용하여 파일 내용을 읽고 Buffer.byteLength를 사용하여 파일 크기를 바이트 단위로 계산합니다. 그런 다음 명령줄 옵션이 ‘-c’와 일치하는 경우 결과를 표시합니다.

## 단계 2: 줄, 단어 및 문자수 계산하기

다음으로, 파일의 줄 수, 단어 수 및 문자 수를 계산하는 도구를 확장합니다. readFileContent 함수를 재사용하여 ‘-l’, ‘-w’ 및 ‘-m’과 같은 추가 옵션을 지원하도록 향상시킬 수 있습니다.

```js
function readFileContent(fileName) {
  // 이전과 동일
  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) throw err;
    const { charactersCount, wordsCount, numberOfLines } = parseFile(data);
    displayResult(charactersCount, wordsCount, numberOfLines);
  });
}
function parseFile(data) {
  const charactersCount = data.length;
  const wordsCount = data.split(" ").length;
  const numberOfLines = data.split("\n").length;
  return { charactersCount, wordsCount, numberOfLines };
}
function displayResult(charactersCount, wordsCount, numberOfLines) {
  // 이전과 동일하며 '-l', '-w', '-m'에 대한 추가 조건이 있습니다.
}
let fileName = process.argv[2];
const commandLineOption = process.argv[3];
readFileContent(fileName);
```

이 수정된 코드에서는 파일 내용을 구문 분석하여 줄 수, 단어 수 및 문자 수를 계산합니다. 그런 다음 제공된 명령줄 옵션에 따라 해당 카운트를 표시합니다.

## 단계 3: 표준 입력 처리

파일 이름이 지정되지 않은 경우 표준 입력에서 읽기를 지원하기 위해 코드를 수정하여 다른 명령에서 입력이 파이프될 때 (예: cat test.txt | ccwc -l) 입력이 감지되는지 확인해야 합니다. 다음과 같이 이를 달성할 수 있습니다:

```js
if (!process.stdin.isTTY) {
  let data = "";
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", (chunk) => {
    data += chunk;
  });
  process.stdin.on("end", () => {
    const { charactersCount, wordsCount, numberOfLines } = parseFile(data);
    displayResult(charactersCount, wordsCount, numberOfLines);
  });
} else {
  // 이전과 동일하지만 약간 수정된 부분이 있음
}
```

표준 입력이 제공되는지 확인함으로써 (!process.stdin.isTTY), 우리는 적절하게 파이프로 연결된 입력을 처리할 수 있습니다.

## 결론

이 안내서에서는 코딩 도전 과제를 해결하기 위해 JavaScript로 명령줄 도구를 만드는 과정을 안내했습니다. 환경 설정, 파일에서 바이트, 라인, 단어 및 문자 수를 세는 기능 구현, 그리고 표준 입력 처리까지 다루었습니다.

이 튜토리얼을 따라와 주셔서 CLI 도구 구축, Node.js 파일 처리, 그리고 동적으로 명령줄 인수를 처리하는 방법에 대한 통찰력을 얻었습니다.

GitHub에서 완전한 코드 솔루션과 테스트 파일을 살펴보세요.

이 안내서가 도움이 되었기를 바랍니다. 궁금한 사항이나 제안 사항이 있으면 아래에 댓글을 남겨주세요. 더 많은 튜토리얼을 기대해주세요!

다음 포스트에서 뵙겠습니다!
