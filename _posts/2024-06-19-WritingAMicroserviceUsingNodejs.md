---
title: "Nodejs를 사용하여 마이크로서비스 작성하기"
description: ""
coverImage: "/assets/img/2024-06-19-WritingAMicroserviceUsingNodejs_0.png"
date: 2024-06-19 22:49
ogImage: 
  url: /assets/img/2024-06-19-WritingAMicroserviceUsingNodejs_0.png
tag: Tech
originalTitle: "Writing A Microservice Using Node.js"
link: "https://medium.com/@akinnurun.samuel/writing-a-microservice-using-node-js-14ce992c2003"
isUpdated: true
---





![Image](/assets/img/2024-06-19-WritingAMicroserviceUsingNodejs_0.png)

자바스크립트는 프로그래밍 언어 평가에서 주요 위치를 유지하고 있습니다. 자바스크립트에는 브라우저와 Node.js 두 가지 구현이 있습니다. 후자는 웹 서비스 개발에 널리 사용됩니다.

IT 경력을 시작한 지 약 여덟 년 전에 자바스크립트를 배우기 시작했고, 몇 년 전에 David Flanagan의 훌륭한 책 "JavaScript: The Definitive Guide"를 읽었습니다.

이 책은 많은 질문에 답하고 흥미로운 자바스크립트 레시피를 보여줬는데, 이를 내 업무에 적용하고 있습니다. 그러나 더 중요한 것은, Node.js로 웹 서비스 개발에 초점을 맞추게 됐습니다 (이전에는 JS를 프론트엔드 개발에만 사용). 이 책을 새로운 자바스크립트 개발자뿐만 아니라 경험있는 개발자에게도 추천합니다.


<div class="content-ad"></div>

이 게시물에서는 Node.js를 사용하여 마이크로서비스를 구축하는 방법을 소개하려고 합니다. 웹 개발 경험을 기반으로 인기 있는 Node.js 스택을 활용하여 확장 가능하고 견고하며 신뢰성 있고 성능이 우수한 솔루션을 만들어 보겠습니다.

# 소개

이 글에서는 작업 관리 웹 서비스 예시에 마이크로서비스를 구축하는 방법을 보여드리려고 합니다. 다음 API를 제공할 것입니다:

- 이름과 설명으로 작업 생성;
- 식별자로 작업 가져오기;
- 작업 상태/이름/설명 업데이트.

<div class="content-ad"></div>

Node.js로 웹 애플리케이션을 빌드할 때 얼마나 강력한지 보여주는 간단한 API입니다. 개발 프로세스가 빠르고 쉽습니다.

몇 가지 애플리케이션 요구 사항:

- 작업은 상태 'new'로 생성되어야 합니다.
- 사용 가능한 상태 전이: 'new'에서 'active'로, 'new'에서 'canceled'로, 'active'에서 'completed'로, 'active'에서 'canceled'로.
- 경쟁 상태를 피하십시오 (자세한 내용은 나중에).

주요 비기능 요구 사항은:

<div class="content-ad"></div>

- 확장성 — 마이크로서비스는 증가하는 요청 양을 처리할 수 있어야 합니다.
- 탄력성 — 마이크로서비스는 즉각 처리할 수 있어야 합니다.
- 성능 — 마이크로서비스는 빠르게 응답하여 더 나은 사용자 경험을 제공해야 합니다.
- 복원력 — 마이크로서비스는 장애에 대해 허용하고 회복할 수 있어야 하므로 올바르게 기능을 계속 수행할 수 있어야 합니다.
- 모니터링 — 마이크로서비스는 건강을 모니터링하는 방법을 제공해야 합니다.
- 관찰가능성 — 마이크로서비스는 로그 스트림 및 메트릭을 생성하여 유지할 수 있어야 합니다.
- 테스트 용이성 — 마이크로서비스는 쉽게 테스트할 수 있어야 합니다.
- 상태를 유지하지 않음 — 마이크로서비스는 클라이언트 컨텍스트를 저장하지 않아야 하며 대신 상태는 데이터베이스에 저장되어야 합니다.
- 배포 용이성 — 마이크로서비스는 쉽게 배포 및 업데이트할 수 있어야 합니다.

Node.js로 웹 애플리케이션을 개발할 때 모두 가능합니다. 다음 단계에서 이러한 요구사항을 어떻게 달성할지 논의해보겠습니다.

# 스택

웹 서비스를 구축하기 위해 사용할 기술 스택을 처음부터 선택해야 합니다. 물론, 가장 먼저 고려해야 할 질문은 프로그래밍 언어입니다. 이 마이크로서비스에서는 Node.js를 사용할 것이지만, 그럼에도 불구하고, 웹 서비스 개발에 사용하는 데 Node.js의 몇 가지 이점을 소개해 드리겠습니다.

<div class="content-ad"></div>

- 자바스크립트는 이미 프론트엔드 개발의 주요 언어이며, 백엔드 개발에도 사용하는 것이 합리적입니다. 이렇게 하면 동일한 개발자가 풀 스택 애플리케이션을 개발할 수 있습니다.
- 자바스크립트 커뮤니티는 엄청나게 큽니다. 개발 중 발생할 수 있는 모든 질문에 대한 답변을 찾을 수 있습니다. 또한 많은 라이브러리가 커뮤니티에 의해 개발되고 유지보수됩니다. 유사한 문제를 해결하는 다른 서드파티를 찾을 수 있으며, 각각 고유한 기능을 가집니다.
- 노드.제이에스는 구글의 V8 엔진을 사용하여 자바스크립트를 해석하며, 이를 빠르게 기계 코드로 컴파일합니다.

그리고 이런식으로 계속됩니다! 하지만 가장 중요한 질문은 아닙니다.

## 데이터베이스

웹 요청간 데이터를 유지하고 싶습니다. 확장 가능한 상태 유지 웹 서비스를 개발하는 것은 복잡한 작업입니다. 그래서 웹 애플리케이션을 상태가 없는 상태로 유지하고 개별적으로 상태를 외부 데이터베이스에 유지하는 것이 권장됩니다.

<div class="content-ad"></div>

이 서비스를 개발하기 위해 인기 있는 문서 지향 데이터베이스 MongoDB를 사용할 것입니다.

MongoDB는 SQL 데이터베이스보다 몇 가지 이점을 제공하는 NoSQL 데이터베이스입니다:

- 스키마 무료 — MongoDB 컬렉션 (SQL 테이블에 해당하는)은 다른 스키마를 가진 문서를 보유할 수 있습니다. 문서를 컬렉션에 저장하기 전에 구조를 먼저 정의할 필요가 없습니다;
- 확장성 — MongoDB는 여러 서버에 걸쳐 확장 가능하게 설계되었습니다;
- 성능 — MongoDB는 읽기 중심 작업에 최적화되어 있으며 대량의 데이터를 저장할 수 있습니다.

Node.js 웹 서비스를 개발할 때 인기 있는 선택 사항입니다.

<div class="content-ad"></div>

# 웹 프레임워크

웹 프레임워크는 웹 애플리케이션을 구축하는 데 필요합니다. 웹 서비스 개발 시 필요한 많은 일상적인 작업을 처리합니다. 예를 들면 라우팅, 보안, 바인딩 등이 있습니다.

Node.js 웹 프레임워크에는 다양한 옵션이 있습니다. 그중에서 가장 인기 있는 것은 express입니다:

express의 가장 큰 장점은 사용하기 간편하며 웹 서버를 시작하는 데 필요한 코드가 최소량으로만 필요하다는 것입니다. express로 작성된 'Hello, World!' 예제가 있습니다:

<div class="content-ad"></div>

```js
const express = require('express')
const app = express()
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

또한, Express는 많은 커뮤니티가 있는데, 서버 기능을 확장하는 다양한 라이브러리(일반적으로 미들웨어로 개발됨)들을 찾을 수 있습니다.

# 유효성 검사

유효성 검사는 웹 애플리케이션의 중요한 부분입니다. 사용자가 API를 어떻게 사용할지 알 수 없기 때문에, 침입자가 잘못된 입력을 제공하여 응용프로그램을 손상시킬 수 있습니다.


<div class="content-ad"></div>

웹 요청에서 제공된 매개변수(경로, 본문 등)를 확인하고 올바른지 확인하기 위해 joi를 사용할 거에요:

joi는 다양한 모델을 확인하는 데 사용되는 강력한 라이브러리에요. 나중에 개발할 요청 중 하나를 확인하는 예시가 있어요:

```js
const createTask = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().optional(),
  }),
};
```

이는 객체가 두 개의 문자열을 가진 중첩된 body 객체를 갖는지 확인하며, 이 문자열은 필수인 name과 선택적인 description이에요.

<div class="content-ad"></div>

하지만 그것만이 아닙니다. 컬렉션을 삭제할 수 있는 위험한 MongoDB 인젝션을 제공하는 경우가 여전히 있습니다. 웹 요청을 정리하기 위해 express-mongo-sanitize 패키지를 사용할 것입니다:

# 설정

동일한 빌드 아티팩트를 다른 환경에서 실행할 수 있도록 응용 프로그램을 구성할 필요가 있습니다. 이를 위해 환경 변수를 통해 구성을 제공하는 것이 표준 접근 방식입니다.

응용 프로그램을 시작하기 전에 로컬 머신에서 환경 변수를 수동으로 설정하고 싶지 않을 것입니다. 이 문제에 대한 인기 있는 Node.js 솔루션은 dotenv 라이브러리에 구현되어 있습니다:

<div class="content-ad"></div>

이 라이브러리는 .env(파일 이름을 변경할 수 있음)이라는 파일에서 내용을 로드하고 이 파일의 내용을 환경 변수로 설정합니다.

# 정적 분석

JavaScript 애플리케이션의 경우 ESLint 라이브러리를 설치하여 코드 스타일을 쉽게 강제하고 응용 프로그램을 개발할 때 동일한 규칙을 따를 수 있습니다:

ESLint는 코드 품질을 향상하고 몇 가지 버그를 감지할 수 있습니다. 보안 취약점을 식별할 수 있습니다. CI(지속적 통합) 중에 ESLint 검사를 포함하여 팀원들이 ESLint에서 소개한 규칙을 준수하도록 강제할 수 있습니다. 나중에 이를 수행할 예정입니다.

<div class="content-ad"></div>

# 테스트

애플리케이션을 변경할 때 이전과 동일하게 작동하는지 확인하기 위해 자동 테스트를 작성하는 것이 좋은 실천법입니다. 단위, 통합, 부하, 엔드-투-엔드 (E2E) 등 다양한 테스트 유형이 있습니다. 애플리케이션의 품질과 성능을 확신하려면 더 많은 테스트가 필요합니다.

JavaScript 애플리케이션을 테스트하기 위한 가장 인기 있는 라이브러리 중 하나는 Jest입니다:

Jest를 사용하여 단위 및 통합 테스트를 구현할 것입니다. 이러한 테스트는 나중에 코드를 개선하고 리팩토링하는 데 도움이 되었으며 애플리케이션이 손상되지 않았음을 확인했습니다.

<div class="content-ad"></div>

# 로깅

애플리케이션 로그 스트림은 웹 서비스를 원격으로 디버깅하는 데 도움이 됩니다. 코드 실행 경로를 식별하고 요청 로직을 다양한 상황에서 설명할 수 있습니다. 코드에 로그를 삽입하면 이점을 누릴 수 있습니다.

JavaScript 로그를 수집하는 가장 인기 있는 패키지는 winston입니다:

winston은 간단하지만 강력한 로깅 라이브러리로, 다양한 전송 방법(콘솔, 파일 등)을 사용하여 로그를 수집하는 데 도움을 줍니다. 로그 형식(간단한 텍스트, JSON 등)도 변경할 수 있습니다.

<div class="content-ad"></div>

# 메트릭

메트릭을 통해 응용 프로그램의 상태를 모니터링할 수 있어요. 들어오는 요청의 수, 평균 요청 실행 시간, 5XX 응답의 수 등을 확인할 수 있습니다. 메트릭을 통해 어떠한 문제가 발생할 경우 이메일, 알림 등을 통해 알림을 받을 수 있는 다양한 모니터를 설정할 수 있어요.

제 응용 프로그램에서는 express-prom-bundle이라는 표준 웹 응용 프로그램 메트릭을 수집하는 Prometheus 미들웨어를 설치할 예정이에요.

다음 섹션에서 Prometheus에 대해 더 자세히 알아볼 거예요.

<div class="content-ad"></div>

# 모니터링 스택

로그 스트림 및 메트릭은 나중에 모니터링하거나 시각화하는 데 사용할 수 있도록 일부 데이터베이스에 수집되어야 합니다.

로그 및 메트릭을 수집하고 시각화하기 위해 다음 스택을 사용할 것입니다:

- Prometheus — 메트릭을 수집하기 위해 풀 모델을 사용하는 오픈 소스 모니터링 경보 툴킷;
- Promtail — 로그를 포함하고 전송하는 에이전트;
- Loki — 로그 집계 시스템;
- Grafana — 관측 가능성 시스템.

<div class="content-ad"></div>

# 로컬 인프라스트럭처

로컬에서 애플리케이션을 개발하고 테스트하기 위해 필요한 로컬 스택을 만들기 위해 도커를 사용할 거예요.

도커를 사용하면 스테이징 및 프로덕션 환경에서 사용될 것과 유사한 로컬 환경을 시작할 수 있어요. 로컬 컴퓨터에 많은 도구를 설치할 필요가 없어요. 대신 필요한 스택을 시작하기 위해 몇 가지 명령을 실행할 수 있어요.

도커 컴포즈를 사용하면 단일 compose.yml 파일로 모든 인프라스트럭처를 정의하고 단일 명령으로 시작할 수 있어요.

<div class="content-ad"></div>

```js
도커 컴포즈 업 -d
```

# 지속적 통합

커밋이 무엇인가를 망가뜨리지 않았는지 확인하기 위해, 지속적 통합(CI)가 필요합니다.

이를 위해, 저는 GitHub Actions를 사용할 것입니다:

<div class="content-ad"></div>

GitHub 계정에는 무료 티어가 있어서 애플리케이션 코드를 확인하기 위해 간단한 빌드를 실행할 수 있어요.

# 애플리케이션 개발

애플리케이션 구조를 시작했고 적절한 프로젝트 스타일을 따르는 데 도움이 된 훌륭한 저장소를 찾았어요:

이 저장소에서 코드 일부(예: 유효성 검사 미들웨어)를 빌려왔기 때문에 여러분이 확인하도록 추천드려요.

<div class="content-ad"></div>

나중에 저장소 링크를 공유할 건데, 그 전에 재미있는 애플리케이션 부분을 보여주고 싶어요.

나는 mongoose를 사용해서 애플리케이션을 MongoDB와 통합했어요. 먼저, 모델의 스키마를 정의했어요:

```js
const mongoose = require('mongoose');
const { Schema } = mongoose;
const TaskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ['new', 'active', 'completed', 'cancelled'],
      default: 'new',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: Date,
  },
  { optimisticConcurrency: true },
);
module.exports = mongoose.model('task', TaskSchema);
```

이 객체를 사용하여 모델을 유효성 검사하고 코드에서 다양한 MongoDB 작업을 수행할 수 있어요. 이는 작업 업데이트의 예시입니다:

<div class="content-ad"></div>

```js
async function updateTaskById(id, { name, description, status }) {
  if (!name && !description && !status) {
    return { error: '적어도 하나의 업데이트가 필요합니다', code: AT_LEAST_ONE_UPDATE_REQUIRED_CODE };
  }

if (status && !(status in availableUpdates)) {
    return { error: '잘못된 상태입니다', code: INVALID_STATUS_CODE };
  }
  for (let retry = 0; retry < 3; retry += 1) {
    // eslint-disable-next-line no-await-in-loop
    const task = await Task.findById(id);
    if (!task) {
      return { error: '작업을 찾을 수 없습니다', code: INVALID_STATUS_TRANSITION_CODE };
    }
    if (status) {
      const allowedStatuses = availableUpdates[task.status];
      if (!allowedStatuses.includes(status)) {
        return {
          error: `'${task.status}'에서 '${status}'(으)로 업데이트할 수 없습니다`,
          code: TASK_NOT_FOUND_CODE,
        };
      }
    }
    task.status = status ?? task.status;
    task.name = name ?? task.name;
    task.description = description ?? task.description;
    task.updatedAt = Date.now();
    try {
      // eslint-disable-next-line no-await-in-loop
      await task.save();
    } catch (error) {
      logger.warn('저장 중 오류 발생', { error });
      if (error.name === 'VersionError') {
        // eslint-disable-next-line no-continue
        continue;
      }
    }
    return task;
  }
  return { error: '병행성 오류', code: CONCURRENCY_ERROR_CODE };
}
```

가장 흥미로운 부분은 업데이트 후 모델을 저장하는 부분입니다. 격렬한 충돌 문제에 대처하기 위해 낙관적 락을 사용하고 있어요.

두 개의 동시 요청에서 동일한 작업을 완료하고 취소하려고 하는 상황을 상상해보세요. 두 요청이 모두 상태가 '활성'인 작업을 받고 모델을 저장할 때 충돌이 발생할 수 있어요. 첫 번째 작업의 상태가 '완료'로 변경되고 그런 다음 '취소'로 변경될 수 있습니다(또는 그 반대로). 이는 '완료'-'취소' 및 '취소'-'완료' 전이가 허용되지 않기 때문에 잘못된 동작입니다.

Mongoose는 낙관적 락으로 이 문제에 대한 해결책을 구현했어요. 낙관적 락은 데이터베이스에서 동시 요청을 처리하는 데 사용되는 전략입니다. 각 문서에는 추가적인 버전 속성이 있어요. 트랜잭션이 모델을 저장/업데이트하려고 할 때 버전을 확인합니다. 버전이 get 쿼리를 수행할 때 받은 버전과 다른 경우, 이미 누군가 문서를 동시에 업데이트했을 수 있어요. 트랜잭션이 중단됩니다(위의 코드에서는 오류가 발생합니다).


<div class="content-ad"></div>

문서 예시:

```js
{
  "_id": {
    "$oid": "654e03210948a61665b7c889"
  },
  "name": "damnatio",
  "description": "Ciminatio totus spiritus suffoco damnatio blanditiis.",
  "status": "completed",
  "createdAt": {
    "$date": "2023-11-10T10:17:05.039Z"
  },
  "__v": 2,
  "updatedAt": {
    "$date": "2023-11-10T10:17:05.064Z"
  }
}
```

위의 문서는 속성 __v에 버전을 저장합니다.

다음 레벨은 컨트롤러입니다. 컨트롤러 예시는 다음과 같습니다:

<div class="content-ad"></div>

```js
const updateTaskById = catchAsync(async (req, res) => {
  const result = await taskService.updateTaskById(req.params.id, req.body);
  if (result.error) {
    switch (result.code) {
      case taskService.errorCodes.AT_LEAST_ONE_UPDATE_REQUIRED_CODE:
        res.status(400).json({ success: false, message: '적어도 하나의 업데이트가 필요합니다' });
        return;
      case taskService.errorCodes.INVALID_STATUS_CODE:
        res.status(400).json({ success: false, message: '유효하지 않은 상태' });
        return;
      case taskService.errorCodes.INVALID_STATUS_TRANSITION_CODE:
        res.status(404).json({ success: false, message: '작업을 찾을 수 없음' });
        return;
      case taskService.errorCodes.TASK_NOT_FOUND_CODE:
        res.status(400).json({ success: false, message: result.error });
        return;
      case taskService.errorCodes.CONCURRENCY_ERROR_CODE:
        res.status(500).json({ success: false, message: '동시성 오류' });
        return;
      default:
        res.status(500).json({ success: false, message: '내부 서버 오류' });
        return;
    }
  }

res.status(200).json({
    success: true,
    task: toDto(result),
  });
});
```

이 코드는 애플리케이션 비즈니스 로직을 실행하고 HTTP 응답을 반환합니다. 컨트롤러는 routes 모듈에 등록됩니다:

```js
const { Router } = require('express');
const taskController = require('../../../controllers/task');
const taskValidation = require('../../../validation/task');
const validate = require('../../../middlewares/validate');

const router = Router();
router.get('/:id', validate(taskValidation.getTaskById), taskController.getTaskById);
router.put('/', validate(taskValidation.createTask), taskController.createTask);
router.post('/:id', validate(taskValidation.updateTaskById), taskController.updateTaskById);
module.exports = router;

/**
 * @swagger
 * tags:
 *  name: Tasks
 *  description: 작업 관리 및 검색
 * /v1/tasks/{id}:
 *  get:
 *   summary: ID로 작업 가져오기
 *   tags: [Tasks]
 *   description: ID로 작업 가져오기
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *       required: true
 *       description: 작업 ID
 *       example: 5f0a3d9a3e06e52f3c7a6d5c
 *   responses:
 *    200:
 *     description: 작업 검색됨
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/TaskResult'
 *    404:
 *     description: 작업을 찾을 수 없음
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/TaskResult'
 *    500:
 *     description: 내부 서버 오류
 *  post:
 *   summary: ID로 작업 업데이트
 *   tags: [Tasks]
 *   description: ID로 작업 업데이트
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *       required: true
 *       description: 작업 ID
 *       example: 5f0a3d9a3e06e52f3c7a6d5c
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/UpdateTask'
 *   responses:
 *    200:
 *     description: 작업 업데이트됨
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/TaskResult'
 *     404:
 *      description: 작업을 찾을 수 없음
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/TaskResult'
 *     500:
 *      description: 내부 서버 오류
 * /v1/tasks:
 *  put:
 *   summary: 작업 생성
 *   tags: [Tasks]
 *   description: 작업 생성
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/CreateTask'
 *   responses:
 *    201:
 *     description: 작업 생성됨
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/TaskResult'
 *    500:
 *     description: 내부 서버 오류
 */
```

맨 아래에서는 Swagger 미들웨어가 사용하는 OpenAPI 사양이 API 문서 페이지를 생성하는 데 사용됨을 볼 수 있습니다.

<div class="content-ad"></div>

각 경로 등록은 두 개의 핸들러를 사용합니다: 유효성 검사기와 컨트롤러 메서드 자체입니다. 유효성 검사기는 서로 다른 모델에 등록된 스키마를 유효성 검사합니다. 유효성 검사기 핸들러:

```js
const Joi = require('joi');
const pick = require('../utils/pick');

function validate(schema) {
  return (req, res, next) => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: 'key' }, abortEarly: false })
      .validate(object);
    if (error) {
      const errorMessage = error.details.map((details) => details.message).join(', ');
      res.status(400).json({ success: false, message: errorMessage });
      return;
    }
    Object.assign(req, value);
    next();
  };
}
module.exports = validate;
```

또한 업데이트 요청 유효성 검사 스키마가 있습니다:

```js
const updateTaskById = {
  params: Joi.object().keys({
    id: objectId.required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    status: Joi.string().valid('new', 'active', 'completed', 'cancelled').optional(),
  }),
};
```

<div class="content-ad"></div>

업데이트 메서드에 대해 말씀드리겠습니다. 저는 통합 테스트만 구현했습니다. 통합 테스트는 모든 테스트가 실행되기 전과 후에 서버를 시작하고 중지합니다. 

```js
const path = require('path');
const app = require('../../src/app');
const db = require('../../src/db');
const { createConfig } = require('../../src/config/config');
const logger = require('../../src/config/logger');
const setupServer = () => {
  let server;
  const configPath = path.join(__dirname, '../../configs/tests.env');
  const config = createConfig(configPath);
  beforeAll(async () => {
    logger.init(config);
    await db.init(config);
    await new Promise((resolve) => {
      server = app.listen(config.port, () => {
        resolve();
      });
    });
  });
  afterAll(async () => {
    await new Promise((resolve) => {
      server.close(() => {
        resolve();
      });
    });
    await db.destroy();
    logger.destroy();
  });
};
module.exports = {
  setupServer,
};
```

그리고 PUT 요청(태스크 생성)과 POST 요청(태스크 업데이트)을 수행하는 테스트가 있습니다:

```js
describe('태스크 생성 및 업데이트', () => {
      const data = [
        {
          name: '상태만 업데이트',
          taskName: '태스크 1',
          description: '태스크 1 설명',
          newStatus: '활성',
        },
        {
          name: '영어 전체 업데이트',
          taskName: '태스크 1',
          description: '태스크 1 설명',
          newTaskName: '태스크 1 새로운',
          newDescription: '태스크 1 새로운 설명',
          newStatus: '활성',
        },
        // 이하 생략
      ];

data.forEach(({
        name, taskName, description, newTaskName, newDescription, newStatus,
      }) => {
        it(name, async () => {
          let response = await fetch(baseUrl, {
            method: 'put',
            body: JSON.stringify({
              name: taskName,
              description,
            }),
            headers: { 'Content-Type': 'application/json' },
          });
          expect(response.status).toEqual(201);
          const result = await response.json();
          // 여기서부터 이하는 생략
        });
      });
    });
```

<div class="content-ad"></div>

도커 이미지를 생성하려면 간단한 Dockerfile을 정의했습니다:

```js
FROM node:20-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY src /app/src
CMD ["node", "./src/index.js"]
```

어플리케이션과 인프라를 시작하는 데 사용하는 compose.yml 정의입니다:

```js
version: '3.9'
services:
    app:
        build: .
        ports:
            - '8081:80'
        depends_on:
            - mongo
        volumes:
            - ./configs/docker.env:/app/configs/.env
            - logs:/app/logs:rw
    mongo:
        image: mongo:5
        restart: always
        ports:
            - 27017:27017
        volumes:
            - mongodata:/data/db
        healthcheck:
            test: echo 'db.runCommand("ping").ok' | mongo localhost:27017/test --quiet
            interval: 10s
            timeout: 2s
            retries: 5
            start_period: 5s
    loki:
        image: grafana/loki:2.9.0
        expose:
            - 3100
        command: -config.file=/etc/loki/local-config.yaml
    promtail:
        image: grafana/promtail:2.9.0
        volumes:
            - logs:/var/log:rw
            - ./infrastructure/promtail.yml:/etc/promtail/config.yml
        command: -config.file=/etc/promtail/config.yml
    prometheus:
        image: prom/prometheus:latest
        volumes:
            - ./infrastructure/prometheus.yml:/etc/prometheus/prometheus.yml
        command:
            - '--config.file=/etc/prometheus/prometheus.yml'
        expose:
            - 9090
    grafana:
        image: grafana/grafana:latest
        volumes:
            - grafanadata:/var/lib/grafana
        environment:
            - GF_PATHS_PROVISIONING=/etc/grafana/provisioning
            - GF_AUTH_ANONYMOUS_ENABLED=true
            - GF_AUTH_ANONYMOUS_ORG_ROLE=Admin
        ports:
            - 3000:3000
volumes:
    mongodata:
    grafanadata:
    logs:
```

<div class="content-ad"></div>

모두 Git push가 발생할 때마다 GitHub Actions CI가 빌드를 실행합니다. CI 중에는 종속성 설치, 린터 실행 및 모든 테스트 실행을 진행하고 있어요:

```js
name: App CI
on:
  push:
    branches:
      - "*"
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: "yarn"
      - run: yarn install --frozen-lockfile
      - run: yarn run lint
      - run: docker-compose up -d mongo
      - run: yarn test -- --verbose --coverage
      - run: docker-compose build
      - run: docker-compose logs
        if: always()
      - run: docker-compose down --volumes
        if: always()
```

# 결론

Node.js는 강력한 기술입니다. 더 중요한 것은 Node.js 커뮤니티가 매우 크다는 것이에요. 새로운 웹 서비스를 개발할 때마다 다른 스택을 사용할 수 있어요. 하지만 저는 이 방법을 추천하지 않아요; 만일 능숙한 Node.js 웹 개발자가 되고 싶다면 먼저 특정 기술의 기능을 익히고, 그런 다음에 다른 스택을 사용해보는 것이 좋아요.

<div class="content-ad"></div>

이 게시물에서 웹 애플리케이션을 구축하는 데 사용한 스택은 Node.js 웹 서비스를 구축하는 데 가장 인기가 많습니다. 구현중인 다양한 기능에 도움이되는 많은 문서와 라이브러리가 있습니다.

Node.js로 이전에 설정한 모든 비기능 요구 사항을 쉽게 달성할 수 있습니다. Kubernetes를 사용하여 응용 프로그램 도커 이미지를 작성하고 호스팅할 수 있습니다. Kubernetes는 배포 정의를 변경하여 응용 프로그램을 빠르게 확장하거나 축소하는 데 도움을줍니다. 또한 Kubernetes는 들어오는 트래픽에 따라 응용 프로그램을 확장할 수 있습니다. 또한 MongoDB는 필요에 따라 확장할 수 있도록 설계되어 있어서 트래픽 증가가 문제가 되지 않습니다.

Google의 V8 Node.js 엔진을 통해 더 나은 응용 프로그램 성능을 달성할 수 있습니다. 소스 코드가 기계 코드로 번역되는 속도는 인상적입니다!

Node.js를 사용하면 내결함성 있는 응용 프로그램을 구축하는 방법에 대한 다양한 인터넷 기사를 찾을 수 있습니다. 최선의 방법을 따라주세요! 또한 응용 프로그램 코드에서는 예기치 않은 연결 실패(네트워크 문제 또는 MongoDB 장애 등) 후 MongoDB 연결을 복원하는 데 시간을 소비했습니다. 이를 확인하고 응용 프로그램에 적용할 수 있습니다.

<div class="content-ad"></div>

Jest를 사용하면 애플리케이션을 위한 다양한 테스트를 작성하고 100%의 테스트 커버리지를 달성할 수 있어요. 몇 가지 까다로운 시나리오도 Jest를 사용하여 에뮬레이션할 수 있어요.

즐거운 코딩 되세요!