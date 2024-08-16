---
title: "Execa 9 저희의 가장 큰 릴리스"
description: ""
coverImage: "/assets/img/2024-05-14-Execa9ourbiggestrelease_0.png"
date: 2024-05-14 14:56
ogImage: 
  url: /assets/img/2024-05-14-Execa9ourbiggestrelease_0.png
tag: Tech
originalTitle: "Execa 9: our biggest release"
link: "https://medium.com/@ehmicky/execa-9-release-d0d5daaa097f"
isUpdated: true
---





![Execa](/assets/img/2024-05-14-Execa9ourbiggestrelease_0.png)

Execa는 스크립트, 애플리케이션 또는 라이브러리에서 명령을 실행합니다. zx와 Bun 쉘과는 달리, Execa는 쉘과 Bash 스크립트의 옛날과 거리를 둡니다. 대신, 현대적이고 완전히 JavaScript 방식을 채택하여 프로그래밍적 사용에 최적화되었습니다. 이러한 접근 방식은 명령 실행을 간단하고 안전하며 크로스 플랫폼이며 디버깅하기 쉽게 만듭니다.

```js
import {$} from 'execa';

const tokensUrl = 'https://example.com/api/tokens';
const token = await $`curl ${tokensUrl}`
  .pipe`grep api_token`
  .pipe`head -n 1`;

const branch = await $`git branch --show-current`;

const logFile = 'logs.txt';
await $({stderr: logFile})`dep deploy
  --parallel
  --token=${token}
  --branch=${branch}`;
```

프로젝트가 8년 된 이후에도 매우 활발하게 유지되고 있습니다. 사실, 오늘의 릴리스는 지금까지의 가장 큰 릴리스로, 6명의 기여자, 개발 9개월, 317개 PR 및 3915개 자동화된 테스트가 포함되었습니다. 여기에 몇 가지 새로운 기능 중 일부를 강조해보겠습니다.




# 출력을 한 줄씩 읽기

만약 명령어가 오랜 시간 동안 실행된다면, 여전히 실행 중일 때 출력을 읽을 수도 있습니다. 대부분의 명령어는 텍스트 기반이므로, 일반적으로 각 출력 라인을 반복하여 처리해야 합니다. 처음에는 간단해 보일 수 있지만, 실제로는 제대로 처리하는 것이 꽤 어려운 일이죠.

Execa를 사용하면 명령어를 한 번에 한 줄씩 반복할 수 있습니다. lines 옵션을 사용하면 전체 출력을 여러 줄로 나눌 수도 있습니다.

```js
import { execa } from 'execa';

// 한 번에 한 줄씩
for await (const line of execa`npm run build`) {
  if (line.includes('ERROR')) {
    await reportError(line);
  }
}

// 한 번에 모든 줄
const { stdout: lines } = await execa({
  lines: true,
})`npm run build`;
const errorLines = lines
  .filter(line => line.includes('ERROR'))
  .join('\n');
console.error(errorLines);
```



# 입력과 출력을 매핑/필터링하다

Node.js Duplexes와 Transforms는 데이터를 매핑하거나 필터링하는 스트림입니다. 파싱 CSV부터 데이터 압축 또는 로깅까지 다양한 사용 가능한 모듈이 있습니다.

Execa를 사용하면 명령어의 stdin, stdout 또는 stderr 옵션으로 바로 전달하여 입력 또는 출력을 변환할 수 있습니다. 웹 기반 TransformStreams도 지원됩니다.

스트리밍은 메모리를 점진적으로 소비하고 CPU를 작은 버스트로 유지합니다. 명령어가 느리거나 출력이 큰 경우 일괄적으로 최종 결과를 수정하는 것보다 효율적입니다.



```js
import {execa} from 'execa';

const {stdout} = await execa({
  stdout: new CompressionStream('gzip'),
  encoding: 'buffer',
})`npm run build`;

// `stdout`이 gzip으로 압축되었습니다
console.log(stdout); 
```

# Generator-based transforms

그렇지만 직접 스트림을 작성하는 일은 어려울 수 있습니다. 그들의 혜택을 누리고자 하지만 구체적인 내용에 대해 자세히 파고들기 싫다면 간단한 제너레이터 함수 대신 사용할 수 있습니다.

```js
import {execa} from 'execa';

let count = 0;
const {stdout} = await execa({
  * stdout(line) {
    yield `[${count++}] ${line}`;
  },
})`npm run build`;

// 줄 번호를 접두사로 붙입니다:
// [0] ...
// [1] ...
// [2] ...
console.log(stdout);
```



# 입력 및 출력 리디렉션

명령어의 입력 또는 출력은 종종 유닉스 쉘 내에서 사용되는 \`와 \` 내장 연산자에 의해 표시된 대로 파일로 리디렉팅됩니다. Execa를 사용하면 stdin, stdout 또는 stderr 옵션에 'file: \`./path\`' 객체를 전달하여 이 작업을 수행할 수 있습니다.

또 다른 일반적인 작업은 명령어의 출력을 점진적으로 표시하는 것입니다. stdout 또는 stderr 옵션에 'inherit'를 전달하면 이를 달성할 수 있지만, 출력을 변수에 저장하는 것을 방지합니다. 대신에 [`inherit`, `pipe`]를 전달하면 이 문제를 해결할 수 있습니다.

```js
import {execa} from 'execa';

const {stderr} = await execa({
  // stdout를 파일에 작성
  stdout: {file: './stdout.txt'},
  // stderr를 반환하되 출력도 함께 표시
  stderr: ['inherit', 'pipe'],
})`npm run build`;
```



# 여러 명령어를 연결하기

파이프 연산자(|)는 대화식 터미널에서 아주 유용합니다. 그러나 스크립트 파일에서는 쉽게 다음을 할 수 없을 때가 있습니다:

- 각 명령의 출력을 가져오기 어려울 수 있어 디버깅을 어렵게 만듭니다.
- 오류 처리가 어렵습니다: 파이프라인 내의 몇 가지 명령이 실패해도 파이프라인이 성공할 수 있습니다(pipefail 옵션이 설정되지 않은 경우).
- 하나의 명령을 여러 개에, 또는 여러 명령을 하나의 명령에 파이프하는 것이 어렵습니다.
- 명령의 파이프 목적지를 변경하기 어렵습니다.
- 파이프라인 문자열을 TypeScript에서 구문 분석하는 것이 불가능하기 때문에 강한 유형을 활용할 수 없습니다.

Execa의 subprocess.pipe() 메소드는 위의 모든 것을 수행할 수 있어 프로그래밍적인 환경에서 더 나은 경험을 제공합니다.



```js
import {execa, execaNode} from 'execa';

// `npm run build | sort | head -n 2`를 실행합니다
// 위의 세 개의 명령 중 하나라도 실패하면 오류가 발생합니다
const finalResult = await execa`npm run build`
  .pipe`sort`
  .pipe`head -n 2`;
// `npm run build | sort`를 실행합니다
const sortResult = finalResult.pipedFrom[0];
// `npm run build`를 실행합니다
const buildResult = sortResult.pipedFrom[0];

// 동일한 로깅 프로세스로 여러 명령을 파이프합니다
const logger = execaNode`log-remotely.js`;
await Promise.all([
  execa`npm run build`.pipe(logger),
  execa`npm run test`.pipe(logger),
]);
```

# 자세한 모드

명령어는 때때로 블랙박스처럼 느껴집니다. 이들은 서로 격리된 프로세스에서 실행되어, 작은 오타가 몇 시간동안의 디버깅 지옥으로 변할 수 있습니다.

이 문제를 완화하기 위해, 자세한 모드가 개선되어 자동으로 명령어의 인수, 출력, 오류, 완료 및 소요 시간을 출력합니다.



```js
// build.js
import {execa} from 'execa';

await execa`npm run build`;
await execa`npm run test`;
```

```js
$ NODE_DEBUG=execa node build.js
[00:57:44.581] [0] $ npm run build
[00:57:44.653] [0]   애플리케이션 빌드 중...
[00:57:44.653] [0]   빌드 완료.
[00:57:44.658] [0] ✔ (수행 시간: 78ms)
[00:57:44.658] [1] $ npm run test
[00:57:44.740] [1]   테스트 실행 중...
[00:57:44.740] [1]   오류: 진입점이 잘못되었습니다.
[00:57:44.747] [1] ✘ 명령이 종료 코드 1로 실패했습니다: npm run test
[00:57:44.747] [1] ✘ (수행 시간: 89ms)
```

# 상세한 오류

오류 메시지에는 이제 출력 내용, 수행 시간 및 실패 원인에 대한 추가 정보와 통찰이 포함되어 있습니다.



```js
import {execa} from 'execa';

try {
  await execa({timeout: 5000})`npm run build`;
} catch (error) {
  console.error(error);
  // ExecaError: Command timed out after 5000 milliseconds: npm run build
  //     at file:///home/me/Desktop/example.js:2:20
  //     at ... {
  //   command: 'npm run build',
  //   escapedCommand: 'npm run build',
  //   cwd: '/path/to/cwd',
  //   durationMs: 19.95693,
  //   failed: true,
  //   timedOut: true,
  //   isCanceled: false,
  //   isTerminated: true,
  //   isMaxBuffer: false,
  //   signal: 'SIGTERM',
  //   signalDescription: 'Termination',
  //   stdout: 'Building the application...',
  //   stderr: 'Warning: deprecated API.',
  //   stdio: [
  //     undefined, 
  //     'Building the application...', 
  //     'Warning: deprecated API.',
  //   ],
  //   pipedFrom: []
  // }
}
```

# 디버그 종료 신호

특정 명령이 갑자기 종료된 이유가 궁금했던 적이 있나요? SIGTERM과 같은 종료 신호에는 정보가 전달되지 않습니다. 메시지나 스택 추적도 없죠.

이런 문제를 해결하기 위해 subprocess.kill()에 오류 인스턴스를 전달하여 복잡한 버그를 디버그하는 데 시간을 절약할 수 있습니다.



```js
import {execa} from 'execa';

const subprocess = execa`npm run build`;
onCancel(reason => {
  const error = new Error(`Canceled by ${reason}`);
  subprocess.kill(error);
});
await subprocess;
```

# 템플릿 문자열

Execa 7부터 명령어를 zx와 같은 템플릿 문자열을 사용하여 지정할 수 있습니다. 그러나 이전에는 $ 메소드에 한정되어 있었습니다.

템플릿 문자열 구문 및 전통적인 배열 구문은 이제 모든 Execa 메소드와 함께 사용할 수 있습니다. 두 가지 방법은 동등하며 주로 선호에 따라 다릅니다.




또한, 템플릿 문자열은 여러 줄에 걸쳐 사용할 수 있어 여러 CLI 플래그를 전달할 때 유용합니다.

스크립트에서 일련의 명령을 실행할 때는 $를 권장합니다. 응용 프로그램이나 라이브러리에서 개별 명령을 호출할 때는 execa와 execaNode를 대신 사용하는 것이 좋습니다. 유일한 차이점은 $가 스크립트 친화적인 기본 옵션을 사용한다는 것입니다. 예를 들어, 터미널로부터 stdin을 자동으로 읽습니다.

```js
import {execa} from 'execa';

await execa`npm run build
  --concurrency 2
  --fail-fast`;
```

# 옵션 공유



모든 Execa 메소드는 옵션을 바인딩할 수 있습니다. 이를 통해 전역 옵션을 설정하거나 여러 명령 사이에서 재사용할 수 있습니다.

```js
import { execa as execa_ } from 'execa';

// 전역 옵션 설정
const execa = execa_({ timeout: 5000 });

await execa`npm run build`;
await execa`npm run test`;
```

# 웹 API에 더 확실해져요

서버 측 자바스크립트는 Node.js 코어 모듈 대신 웹 API를 점차 채택하고 있습니다. Execa도 마찬가지로 Node.js 스트림, 파일 경로 문자열 및 Buffer 대신 웹 스트림, 파일 URL 및 Uint8Array를 사용할 수 있습니다.



```js
import {execaNode} from 'execa';

const response = await fetch('https://example.com/api/orders');
await execaNode({
  stdin: response.body,
})`send_orders.js`;
```

# 스트림으로 변환하기

일부 모듈은 인수로 스트림을 사용하거나 반환합니다. 이러한 모듈에 직접 명령을 사용할 수 있도록 하려면 Execa의 자식 프로세스를 subprocess.readable(), subprocess.writable() 또는 subprocess.duplex()를 사용하여 스트림으로 변환할 수 있습니다.

```js
import {execaNode} from 'execa';
import {pipeline} from 'node:stream/promises';
import {
  createReadStream, 
  createWriteStream,
} from 'node:fs';

await pipeline(
  createReadStream('./input.txt'),
  execaNode`transform.js`.duplex(),
  createWriteStream('./output.txt'),
);
```



모든 중요한 변경 내용, 새로운 기능 및 버그 수정 사항에 대한 전체 목록은 릴리스 노트를 확인해 주세요.

그리고 문서 전체를 완전히 개선했습니다: 참조 섹션 외에도 이제 많은 사용자 가이드와 예제가 포함되어 있습니다. 처음에는 좀 어려울 수 있는 프로세스를 더 잘 이해할 수 있도록 새로운 사용자들을 격려하고 싶습니다. 기존 사용자가 이전에 놓쳤던 특정 기능을 발견할 수 있도록 새 문서가 도움이 되기를 희망합니다.