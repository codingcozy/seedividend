---
title: "NestJS 데이터 검증 및 변환하는 방법"
description: ""
coverImage: "/assets/img/2024-06-27-NestJSDataValidationandTransformation_0.png"
date: 2024-06-27 17:54
ogImage:
  url: /assets/img/2024-06-27-NestJSDataValidationandTransformation_0.png
tag: Tech
originalTitle: "NestJS: Data Validation and Transformation"
link: "https://medium.com/devops-dev/nestjs-data-validation-and-transformation-ce99115c760d"
isUpdated: true
---

이 보고서는 Node.js 서버 측 애플리케이션 개발을 위한 프레임워크 인 NestJS에서 데이터 유효성 검사 및 변환 기술을 요약합니다.

## 데이터 유효성 검사의 중요성

데이터 유효성을 검사함으로써 컨트롤러 계층에 도달하기 전에 미리 정의된 규칙을 준수하는지 확인할 수 있습니다. 이를 통해 다음과 같은 문제가 방지됩니다:

- 잘못된 또는 해로운 데이터: SQL 인젝션 및 예기치 않은 데이터 유형과 같은 공격에 대비합니다.
- 오류 및 예외: 유효하지 않은 데이터 형식으로 인한 오류를 방지합니다.

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

## 장점

높은 데이터 무결성: 데이터가 정의된 규칙을 준수하는 것을 보장합니다.
오류 감소: 잘못된 데이터로 인한 문제를 방지합니다.
더 깔끔한 코드: 데이터 유효성 검증 논리를 컨트롤러로부터 분리합니다.

![이미지](/assets/img/2024-06-27-NestJSDataValidationandTransformation_0.png)

# 컨트롤러 이전에 DTO 및 입력 데이터의 유효성 검사를 확인하세요.

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

https://github.com/typestack/class-validator

![image](/assets/img/2024-06-27-NestJSDataValidationandTransformation_1.png)

# 패키지 설치

```js
yarn add class-validator class-transformer
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

# 문서 유효성 검사

# 개발자 모드에서 실행

```js
yarn start:dev
```

# 파이프 컨트롤러 추가

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

main.ts

```js
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
```

DTO 폴더

```js
import { IsNotEmpty } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
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

# ID가 존재하는지 확인하기

서비스

```js
  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException(`ID가 "${id}"인 Task를 찾을 수 없습니다`);
    }
    return found;
  }
```

# 요소가 삭제된 경우 ID가 존재하는지 확인하기

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

```js
  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  }
```

## 요소가 업데이트될 때 ID가 존재하는지 확인

```js
  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
```

## 상태 업데이트 확인하기

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

dto 폴더에 update-task-status.dto를 추가해주세요.

```js
import { IsEnum } from "class-validator";
import { TaskStatus } from "../tasks.model";

export class UpdateTaskStatus {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
```

컨트롤러

```js
@Patch('/:id/status')
updateTaskStatus(
  @Param('id') id: string,
  @Body() updateTaskStatusDto: UpdateTaskStatusDto,
): Task {
  const { status } = updateTaskStatusDto;
  return this.tasksService.updateTaskStatus(id, status);
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

# 검색을 위한 유효성 검사

dto

```js
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../tasks.model';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
```
