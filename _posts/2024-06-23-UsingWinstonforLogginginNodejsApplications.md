---
title: "Nodejs 애플리케이션에서 Winston으로 로깅하는 방법"
description: ""
coverImage: "/assets/img/2024-06-23-UsingWinstonforLogginginNodejsApplications_0.png"
date: 2024-06-23 13:23
ogImage: 
  url: /assets/img/2024-06-23-UsingWinstonforLogginginNodejsApplications_0.png
tag: Tech
originalTitle: "Using Winston for Logging in Node.js Applications"
link: "https://medium.com/@bjprajapati381/using-winston-for-logging-in-node-js-applications-d15302947c28"
---


로그 기록은 모든 애플리케이션에서 중요한 부분입니다. 디버깅, 모니터링 및 코드 유지 관리에 도움이 됩니다. 유연성과 기능이 풍부한 기능으로 Node.js에서 가장 인기 있는 로깅 라이브러리 중 하나인 Winston에 대해 알아보겠습니다. 이 기사에서는 Node.js 애플리케이션에 Winston을 통합하는 방법과 그 기능을 최대한 활용하는 방법을 살펴보겠습니다.

![이미지](/assets/img/2024-06-23-UsingWinstonforLogginginNodejsApplications_0.png)

# 개요:

이 튜토리얼에서 다룰 내용은:

<div class="content-ad"></div>

- Node.js 프로젝트에서 Winston 설정하기.
- 다른 로깅 레벨 구성하기.
- 사용자 정의 로그 형식 만들기.
- 여러 전송 방법 (콘솔, 파일 등)으로 로깅하기.
- 사용자 정의 로그 레벨 만들기.
- 매일 로그 파일에 로깅하기.
- Express 애플리케이션에서 Winston 사용하기.

# 준비물:

- JavaScript 및 Node.js의 기본 지식.
- npm 및 Express에 익숙해야 합니다 (마지막 단계에서 선택 사항이지만 권장됨).

# 설정:

<div class="content-ad"></div>

Node.js 프로젝트를 초기화해봅시다:

```js
mkdir winston-logger-example
cd winston-logger-example
npm init -y
```

Winston을 설치해보세요:

```js
npm install express winston winston-daily-rotate-file
```

<div class="content-ad"></div>

# 기본 설정:

Winston을 설정하기 위한 logger.js 파일을 만듭니다:

```js
// logger.js

const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'app.log' })
  ]
});

module.exports = logger;
```

설명:

<div class="content-ad"></div>

- createLogger: 새 로거 인스턴스를 초기화합니다.
- format.combine: 여러 형식을 결합하는데, 여기에서는 colorize, timestamp, printf를 사용합니다.
- transports: 로그를 전송할 위치를 지정합니다. 이 예에서는 콘솔과 파일 (app.log)에 로그를 남깁니다.

# 로깅 레벨 구성:

Winston은 error, warn, info, http, verbose, debug, silly와 같은 여러 가지 로깅 레벨을 지원합니다. 캡쳐할 로그의 최소 레벨을 구성할 수 있습니다.

```js
// logger.js

const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
  },
  level: 'info', // 기본 로그 레벨 설정
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'app.log' })
  ]
});

module.exports = logger;
```

<div class="content-ad"></div>

설명:

- levels: 사용자 정의 로깅 레벨을 정의합니다.
- level: 캡처할 로그의 최소 레벨을 설정합니다 (여기서는 info로 설정되어 있음).

# 로그 레벨 이해:

로그 레벨은 기록되는 메시지의 심각성을 결정합니다. Winston은 npm 스타일 로깅 레벨을 사용하며, 가장 심각한 것부터 가장 적게 심각한 것까지 우선 순위가 정해져 있습니다.

<div class="content-ad"></div>

- error: (0) 즉각적인 주의가 필요한 오류를 기록하는 데 사용합니다.
- warn: (1) 잠재적인 문제를 나타내는 경고 메시지를 기록하는 데 사용합니다.
- info: (2) 애플리케이션 진행 상황을 강조하는 정보 메시지를 기록하는 데 사용합니다.
- http: (3) HTTP 요청을 기록하는 데 사용합니다.
- verbose: (4) 디버깅 중 유용한 자세한 정보를 기록하는 데 사용합니다.
- debug: (5) 디버깅 정보를 기록하는 데 사용합니다.
- silly: (6) 필요 이상으로 자세한 정보를 기록하는 데 사용합니다.

덜 심각한 메시지를 필터링하기 위해 최소 로그 레벨을 설정할 수 있습니다. 예를 들어, 로그 레벨을 info로 설정하면 info, warn, error 메시지만 기록됩니다.

# 사용자 정의 로그 포맷 생성:

필요에 맞게 사용자 정의 로그 포맷을 만들 수 있습니다. 예를 들어, 메타데이터를 추가하거나 로그 메시지 구조를 변경할 수 있습니다.

<div class="content-ad"></div>

```js
// logger.js

const { createLogger, format, transports } = require('winston');

const customFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.printf(({ timestamp, level, message, ...meta }) => {
    return `${timestamp} ${level}: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''}`;
  })
);

const logger = createLogger({
  level: 'info',
  format: customFormat,
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'app.log' })
  ]
});

module.exports = logger;
```

해설:

- customFormat: 타임스탬프, 로그 레벨, 메시지 및 선택적인 메타데이터를 구조화된 로그 형식으로 결합합니다.

# 다중 전송으로 로깅하기:

<div class="content-ad"></div>

윈스턴은 서로 다른 파일, 외부 로깅 서비스 또는 콘솔과 같은 여러 대상에 로그를 기록할 수 있어요.

```js
// logger.js

const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'app.log' }),
    new transports.File({ filename: 'error.log', level: 'error' })
  ]
});

module.exports = logger;
```

설명:

- transports.File('filename: ‘error.log’, level: ‘error’'): 에러 메시지를 별도의 파일에 기록합니다.

<div class="content-ad"></div>

# 커스텀 로그 레벨 만들기:

윈스턴(Winston)에서 자체적인 로그 레벨을 정의할 수 있습니다. 기본 레벨로는 충분하지 않은 특정 요구 사항이 있을 때 유용합니다.

```js
// logger.js

const { createLogger, format, transports, config } = require('winston');

const customLevels = {
  levels: {
    critical: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4
  },
  colors: {
    critical: 'red',
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'blue'
  }
};

const logger = createLogger({
  levels: customLevels.levels,
  level: 'info', // 기본 로그 레벨 설정
  format: format.combine(
    format.colorize({ all: true }),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'app.log' })
  ]
});

winston.addColors(customLevels.colors);

module.exports = logger;
```

설명:

<div class="content-ad"></div>

- customLevels: 사용자 정의 로깅 수준 및 해당하는 색상을 정의합니다.
- winston.addColors: 로깅 수준에 사용자 정의 색상을 적용합니다.

# 매일 로그 파일에 로깅하기:

winston-daily-rotate-file 전송을 사용하여 매일 새로운 로그 파일을 생성할 수 있습니다.

winston-daily-rotate-file를 설치하세요:

<div class="content-ad"></div>

```jsx
npm install winston-daily-rotate-file

매일 로테이트 파일 전송을 구성하세요:

// logger.js

const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: 'application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});

module.exports = logger;

설명:
```

<div class="content-ad"></div>

- DailyRotateFile: 지정된 날짜 패턴으로 매일 새 로그 파일을 생성합니다.
- zippedArchive: 이전 로그 파일을 압축합니다.
- maxSize: 로테이션하기 전 로그 파일의 최대 크기입니다.
- maxFiles: 로그 파일을 유지하는 최대 일수입니다.

# Express 애플리케이션에서 Winston 사용하기:

Winston을 Express 애플리케이션에 통합하여 HTTP 요청과 오류에 대한 로깅을 처리하세요.

Express 설치하기:

<div class="content-ad"></div>

```js
npm install express
```

Winston을 이용한 Express 서버 설정:

```js
// server.js

const express = require('express');
const logger = require('./logger');

const app = express();
const PORT = process.env.PORT || 3000;

// HTTP 요청을 로깅하는 미들웨어
app.use((req, res, next) => {
  logger.http(`${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
  logger.info(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
```

설명:


<div class="content-ad"></div>

- HTTP 요청 로깅: 미들웨어는 logger.http를 사용하여 수신된 모든 HTTP 요청을 로깅합니다.
- 오류 처리 미들웨어: logger.error를 사용하여 오류를 로깅합니다.

# 결론:

Winston을 Node.js 애플리케이션에 통합함으로써 더욱 강력하고 유연한 로깅 시스템을 구축할 수 있습니다. 이를 통해 코드를 보다 효율적으로 디버깅, 모니터링 및 유지보수할 수 있습니다. 콘솔, 파일 또는 외부 서비스로 로그를 기록해야 하는 경우, Winston의 다양한 기능이 Node.js 로깅에 우수한 선택이 될 것입니다.