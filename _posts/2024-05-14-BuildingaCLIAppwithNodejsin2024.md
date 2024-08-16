---
title: "2024년에 Nodejs로 CLI 애플리케이션 만들기"
description: ""
coverImage: "/assets/img/2024-05-14-BuildingaCLIAppwithNodejsin2024_0.png"
date: 2024-05-14 14:25
ogImage: 
  url: /assets/img/2024-05-14-BuildingaCLIAppwithNodejsin2024_0.png
tag: Tech
originalTitle: "Building a CLI App with Node.js in 2024"
link: "https://medium.com/nmc-techblog/building-a-cli-with-node-js-in-2024-c278802a3ef5"
isUpdated: true
---




## Node.js로 CLI 앱을 만드는 과정을 자세히 안내하는 스텝바이스텝 가이드입니다. 명령 처리와 사용자 프롬프트부터 사용자 경험 향상, 프로젝트 구조 정리 및 문서화에 이르기까지 모든 것을 다루고 있습니다.

![CLI App with Node.js](/assets/img/2024-05-14-BuildingaCLIAppwithNodejsin2024_0.png)

## 왜 Node.js를 사용해야 하는가?

이벤트 기반 아키텍처와 이를 위해 특별히 설계된 많은 패키지를 제공하는 npm 생태계로 인해 효율적이고 확장 가능한 CLI 도구를 개발하는 데 가장 적합한 선택지가 됩니다.



## CLI 앱을 만드는 이유는?

- 작업 자동화
- 개발자를 위한 도구 만들기
- 시스템과 흐름 관리와 상호작용

## 실제 예시

Nielsen에서는 많은 가치를 제공하는 여러 CLI를 만들었습니다.



- CI/CD 플로우에서 동적 파이프라인을 관리하는 CLI — 더 이상 수동 구성이나 프로세스 간 대기가 필요하지 않아요.
- 로컬 도커 환경을 설정하고 관리하는 CLI.
- 마이그레이션을 위한 미리 정의된 단계를 실행하는 CLI.

이제 한 개 만드는 것이 얼마나 쉬운지 알게 될 거예요.
바로 코드로 빠져들기를 원하시는 분들을 위해, 파일은 여기서 찾을 수 있어요.

# 목차

- 설정하기
∘ 프로젝트 부트스트랩
∘ Commander.js 가져오기
∘ CLI 만들기
- 유저 경험
∘ 색상 추가하기
∘ 쉬운 프롬프팅
∘ 멋진 로더
∘ ASCII 아트 추가하기
- 프로젝트 구조
- 문서화
∘ 자동 문서 생성
- 최선의 실천법



# 설정하기

먼저 컴퓨터에 Node.js가 설치되어 있는지 확인해주세요.

## 단계 1: 프로젝트 시작하기

프로젝트를 위한 새 폴더를 만들고 그 안으로 들어가세요:



```js
mkdir my-node-cli
cd my-node-cli
```

새 Node.js 프로젝트를 시작해보세요:

```js
npm init
```

## 단계 2: Commander.js 가져오기



Commander.js은 Node.js에서 CLI를 구축하는 데 사용하는 핵심 도구입니다. 입력 구문 분석, 도움말 텍스트 및 오류 관리를 위한 스위스 아미 나이프가 있는 것과 같습니다.

```js
npm install commander
```

## 단계 3: CLI 만들기

프로젝트 폴더에 index.js라는 파일을 만듭니다. 이것이 우리의 CLI가 시작하는 곳이 될 것입니다. 이 CLI를 실행하기 위해 맨 위에 shebang을 추가하십시오.




#!/usr/bin/env node

import { program } from "commander";

program
  .version("1.0.0")
  .description("내 노드 CLI")
  .option("-n, --name <type>", "당신의 이름을 추가하세요")
  .action((options) => {
    console.log(`안녕, ${options.name}!`);
  });

program.parse(process.argv);


패키지.json에 bin을 추가하여 CLI 명령을 인식하도록하고 CommonJS 대신 ES 모듈과 함께 작동하도록 유형을 추가하십시오:

```js
"bin": {
    "my-node-cli": "./index.js"
},
"type": "module"
```

프로젝트를 전역적으로 연결하려면:
```bash
npm link
```



```js
npm link 
```

그러면, 내 my-node-cli가 당신의 터미널에서 실행될 준비가 끝납니다!

```js
my-node-cli --name YourName
```

![이미지](/assets/img/2024-05-14-BuildingaCLIAppwithNodejsin2024_1.png)



참고: Node.js 18.3부터는 내장된 커맨드 라인 인수 구문 분석기가 있습니다. 이것에 대해 읽어보고 commander.js 대신 사용할지 결정할 수 있습니다.

# 사용자 경험

## 색상 추가하기

Chalk는 CLI 출력을 다채롭게 만드는 데 완벽합니다. 다음 명령을 사용하여 가져올 수 있습니다:



```js
npm install chalk
```

이제 우리의 인사말을 개선해 보겠습니다:

```js
#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";

program
  .version("1.0.0")
  .description("내 Node CLI")
  .option("-n, --name <type>", "당신의 이름을 추가하세요")
  .action((options) => {
    console.log(chalk.blue(`안녕, ${options.name}!`));
    console.log(chalk.green(`안녕, ${options.name}!`));
    console.log(chalk.red(`안녕, ${options.name}!`));
  });

program.parse(process.argv);
```

![이미지](/assets/img/2024-05-14-BuildingaCLIAppwithNodejsin2024_2.png)



## 손쉬운 프롬프팅

더욱 상호작용적인 느낌을 원하신다면 Inquirer.js가 좋은 선택입니다.

```js
npm install inquirer
```

데이터를 수집하기 위해 명령줄 옵션을 사용하는 대신, 사용자에게 질문하세요.



```js
#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";

program.version("1.0.0").description("나의 Node CLI");

program.action(() => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "당신의 이름은 무엇인가요?",
      },
    ])
    .then((answers) => {
      console.log(chalk.green(`안녕하세요, ${answers.name}님!`));
    });
});

program.parse(process.argv);
```

![Building a CLI App with Node.js](/assets/img/2024-05-14-BuildingaCLIAppwithNodejsin2024_3.png)

사용 가능한 Confirm 프롬프트 유형이 있습니다. 사용자에게 예/아니오 질문을 합니다.

![Building a CLI App with Node.js](/assets/img/2024-05-14-BuildingaCLIAppwithNodejsin2024_4.png)




프롬프트 유형 — 사용자가 옵션 목록에서 선택할 수 있도록 합니다.

![이미지](/assets/img/2024-05-14-BuildingaCLIAppwithNodejsin2024_5.png)

또한 체크박스, 비밀번호, 목록 및 확장 기능도 있습니다. https://github.com/SBoudrias/Inquirer.js에서 더 많이 알아보세요.

## 멋진 로더들



로딩 시간을 어떻게 보내시나요? ora를 사용하면 재미있게 만들 수 있어요. 스피너 애니메이션을 추가하는 데 좋아요:

```js
npm install ora
```

시간이 걸리는 프로세스에 로더를 뿌려보세요:

```js
#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import ora from "ora";

program.version("1.0.0").description("My Node CLI");

program.action(() => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "옵션을 선택하세요:",
        choices: ["옵션 1", "옵션 2", "옵션 3"],
      },
    ])
    .then((result) => {
      const spinner = ora(`${result.choice} 작업 중...`).start(); // 스피너 시작

      setTimeout(() => {
        spinner.succeed(chalk.green("완료!"));
      }, 3000);
    });
});

program.parse(process.argv);
```



<img src="https://miro.medium.com/v2/resize:fit:1200/1*wFmspYHAW5572fRutff1MQ.gif" />

## ASCII Art 추가

figlet.js로 마지막 손질을 해봅시다:

```js
npm install figlet
```



index.js에 다음을 추가해주세요.

```js
import figlet from "figlet";

console.log(
  chalk.yellow(figlet.textSync("My Node CLI", { horizontalLayout: "full" }))
);
```

<img src="/assets/img/2024-05-14-BuildingaCLIAppwithNodejsin2024_6.png" />

CLI의 aesthetic에 맞게 ASCII 아트를 맞춤화할 수 있는 다양한 글꼴 및 사용자 정의 옵션이 있습니다.



# 프로젝트 구조

프로젝트를 깔끔하게 유지하면 나중에 시간을 아낄 수 있어요, 특히 프로젝트가 커지면 더욱 그렇습니다. 다음은 시작하기에 좋은 간단하면서도 효과적인 구조입니다:

```js
my-node-cli/
├─ bin/
│ └─ index.js
├─ src/
│ ├─ commands/
│ ├─ utils/
│ └─ lib/
├─ package.json
└─ README.md
```

- bin — 여러분의 CLI가 있는 곳입니다. 누군가가 CLI를 실행할 때 호출되는 곳입니다.
- src/commands — 개별 명령어 파일이 있는 위치입니다. 새로운 명령어를 추가하거나 기존 명령어를 편집할 때 더 깔끔하게 작업할 수 있습니다.
- src/utils — 여러 명령어에서 필요한 유틸리티 함수를 담고 있습니다. 데이터 형식 설정과 같은 기능이 포함될 수 있습니다.
- src/lib — 여러분의 CLI가 API와 상호 작용하거나 복잡한 로직을 실행하는 경우 주요 기능이 위치할 수 있습니다.



# 문서화

명확한 문서화가 중요합니다. 사용자를 명령줄 도구를 통해 직접 놀라운 작업을 수행할 수 있도록 설치, 사용법 및 명령 옵션을 README.md에 개요로 기록하십시오.

```js
# 내 노드 CLI
내 노드 CLI는 터미널에서 직접 멋진 작업을 수행할 수 있는 도구입니다.

## 설치

npm install -g my-node-cli

## 사용법
내 노드 CLI를 사용하려면 다음을 실행하십시오:

my-node-cli - help

### 명령어
- `my-node-cli - name YourName`: 당신의 이름으로 인사합니다.
- `my-node-cli option1`: 옵션 1을 실행합니다.

더 자세한 명령어 정보는 `my-node-cli --help`를 실행해 주세요.

## 기여하기
기여는 환영합니다...

## 라이선스
이 프로젝트는 라이선스가 부여되었습니다...
 

## 문서 자동 생성하기



테이블 태그를 마크다운 형식으로 변경하세요.

/**
 * 이 함수는 사용자의 이름으로 인사합니다.
 * @param {string} name 사용자의 이름
 */
const greet = (name) => {
  console.log(`안녕, ${name}!`);
};

# Best Practices

실제 CLI 논리 작업을 시작하기 전에 Liran Tal의 이 리포를 확인하는 것을 강력히 권장합니다. 이 리포는 3천 개 이상의 스타를 받았으며 제가 생각한 모든 최상의 실천 방법과 그 이상을 다룹니다.



예를 들어, 사용자가 호출할 때 동일한 정보를 반복해서 제공하는 것을 요구하지 않고, 상태를 유지하면서 사용자 경험을 제공할 수 있습니다. conf를 사용하여 사용자 이름, 이메일 또는 API 토큰과 같은 데이터를 저장할 수 있습니다.

![이미지](/assets/img/2024-05-14-BuildingaCLIAppwithNodejsin2024_7.png)

이 모든 것이 실제로 작동하는 것을 보고 싶나요? 모든 예시 파일과 함께 완성된 프로젝트를 제 GitHub 페이지에서 확인해보세요. 들어가서 둘러보고, 자유롭게 실험해보세요. 만약 도움이 된다면 리포지토리를 fork하거나 스타를 눌러주세요!