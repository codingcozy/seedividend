---
title: "웹 애플리케이션에서 데이터 검증 소개"
description: ""
coverImage: "/assets/img/2024-06-22-1IntroductiontoDataValidationinWebApplications_0.png"
date: 2024-06-22 02:21
ogImage: 
  url: /assets/img/2024-06-22-1IntroductiontoDataValidationinWebApplications_0.png
tag: Tech
originalTitle: "1. Introduction to Data Validation in Web Applications."
link: "https://medium.com/@aliahmedfathi37/how-to-implement-data-validation-in-nestjs-using-nestjs-joi-and-joi-class-decorators-be374174ff80"
isUpdated: true
---




1. 웹 애플리케이션에서 데이터 유효성 검사 소개.
2. NestJS를 유효성 검사 용으로 설정하기.
- 선행 조건 및 프로젝트 설정.
- 유효성 검사 스키마 생성 및 사용하기.
3. Joi와 함께 pipe를 소개하고 사용하는 방법.
4. Joi를 사용하여 매개변수 및 쿼리 매개변수의 유효성 검사.
5. 실제 구현: nestjs-joi 및 joi-class-decorators를 활용한 완전한 NestJS 애플리케이션 탐색하기: GitHub의 NestJS Sample App with nestjs-joi. 

# 1. 웹 애플리케이션에서 데이터 유효성 검사 소개.

- 데이터 유효성 검사는 사용자가 입력한 데이터나 외부 소스에서 가져온 데이터가 지정된 기준과 형식을 충족하는지 확인하는 프로세스입니다. 데이터 유효성 검사는 클라이언트 측, 서버 측 및 데이터베이스 수준을 포함하여 여러 수준에서 수행할 수 있습니다. 

# 2. NestJS를 유효성 검사 용으로 설정하기.

<div class="content-ad"></div>

- 전제 조건 및 프로젝트 설정:

## 1. Node 및 npm 설치:

Nodejs 웹 사이트에 가서 Node를 설치해야 합니다.

## 2. NestJs 설치 및 새로운 nestApp 생성:

<div class="content-ad"></div>

```js
npm i -g @nestjs/cli
nest new my-nestjs-app
cd ./my-nestjs-app
```

## 3. 새로운 파이프인 validation을 생성하세요:

```js
// --no-spec => spec 파일 생성 비활성화
// --flat => 요소를 위한 폴더를 생성하지 않습니다.
nest g pipe validation --no-spec --flat
```

## 4. 필요한 패키지 설치하기 (nestjs-joi, joi-class-decorators)


<div class="content-ad"></div>

```js
npm i class-transformer joi nestjs-joi joi-class-decorators
```

- 확인 스키마 생성 및 사용:

## 1. `/testBody` 엔드포인트 생성, 메서드 유형: POST, 앱 컨트롤러에서

```js
import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { validationBodyDto } from './validate.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/testBody')
  @HttpCode(HttpStatus.OK)
  testJoiValidation(@Body() reqBody: validationBodyDto, @Res() res: Response) {
    const data = reqBody;
    res.json(data);
  }
}
```

<div class="content-ad"></div>

## 2. validate.dto.ts 파일을 만들어서 이 엔드포인트를 검증하고 joi 스키마 클래스(validationBodyDto)를 만드세요:

```js
import { Expose } from "class-transformer";
import { JoiSchema, JoiSchemaOptions } from "joi-class-decorators";
import * as Joi from 'joi';

interface reviewInterface {
    rating: number;
    comment: string;
}
// @Expose ==> 시리얼라이제이션 및 디시리얼라이제이션을 위해 전환 프로세스에 포함되어야 하는 속성을 표시하는 데 사용됩니다.
// @JoiSchema() ==> 타입(클래스) 속성에 스키마를 정의합니다. 스키마 주석이 달린 속성은 전체 객체 스키마를 구성하는 데 사용됩니다.

//명시적으로 정의되지 않은 속성을 허용하지 않아 엄격한 유효성을 보장합니다. 
@JoiSchemaOptions({
    allowUnknown: false
})

export class validationBodyDto {

   //기본 유효성 검사는 문자열 유형 및 필수입니다.
    @Expose() @JoiSchema(Joi.string().trim().required())
    fullName: string;

   //길이를 확인하고 유효한 이집트 전화 번호인지 확인합니다
    @Expose() @JoiSchema(Joi.string().length(11).pattern(/^(011|012|015|010)\d{8}$/).required())
    phoneNumber: string;


   //유효한 이메일인지 확인합니다.
    @Expose() @JoiSchema(Joi.string().email().optional())
    email?: string;

    //값이 M 또는 F인 경우에만 유효성을 확인합니다.
    @Expose() @JoiSchema(Joi.string().valid('M', 'F').required())
    gender: string;

    //gender가 M이면 militaryStatus는 필수이고 그렇지 않으면 선택사항입니다.
    @Expose() @JoiSchema(
        Joi.when('gender', {
            is: 'M',
            then: Joi.string().required(),
            otherwise: Joi.string().optional(),
        }),
    )
    militaryStatus: string;

    //나이가 숫자이고 최소값은 14이고 최대 나이는 100입니다.
    @Expose() @JoiSchema(Joi.number().min(14).max(100).message('유효하지 않은 나이'))
    age: number;


    //객체 배열이 유효한지 확인합니다.
    @Expose()
    @JoiSchema(
        Joi.array().items(
                Joi.object({
                        rating: Joi.number().min(0.1).required(),
                        comment: Joi.string().min(3).max(300).required(),
                    }).required(),
            ).required(),
    )
    reviews: reviewInterface[];

    //빈 문자열을 허용하는 필드입니다.
    @Expose() @JoiSchema(Joi.string().allow('').optional())
    profilePicture?: string;

    //profilePicture에 값이 있을 경우 profileFileName은 필수이고 그렇지 않으면 선택사항입니다.
    @Expose() @JoiSchema(
        Joi.when('profilePicture', {
            is: Joi.string().exist(),
            then:  Joi.string().required(),
            otherwise: Joi.string().allow('').optional(),
    }))
    profileFileName: string;

    //isVerified가 부울 값이고 필수인지 확인합니다.
    @Expose() @JoiSchema(Joi.boolean().required())
    isVerified: boolean;
}
```

## 3. pipe 소개 및 Joi와 함께 사용하는 방법:

- NestJS에서 "pipe"는 @Injectable() 데코레이터가 붙은 클래스로, PipeTransform 인터페이스를 구현합니다. Pipe는 일반적으로 데이터의 변환 또는 유효성 검사에 사용됩니다. 메소드 수준, 컨트롤러 수준 또는 전역 수준 등 다양한 수준에서 사용할 수 있습니다.
- Pipes 소개
변환: Pipes는 입력 데이터를 원하는 형식으로 변환할 수 있습니다.
유효성 검사: Pipes는 데이터를 요청 핸들러에 전달하기 전에 데이터를 유효성 검사할 수 있습니다. 데이터가 유효하지 않으면 Pipe가 예외를 throw할 수 있고, 이는 NestJS에서 처리됩니다.
- 우리의 경우, 일반 객체를 유형화된 객체로 변환하여 유효성을 적용할 수 있게 합니다.
- 이제 우리가 이전에 만들었던 유효성 파이프를 사용해 보겠습니다:

<div class="content-ad"></div>

```js
import { BadRequestException, Injectable, PipeTransform, Type } from '@nestjs/common’;
import { plainToInstance } from 'class-transformer’;
import { getClassSchema } from 'joi-class-decorators’;

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    const bodyDto = metatype; // Dto Schema
    /*
      우리의 일반 JavaScript 인수 객체를 형식화된 객체로 변환하여 유효성을 적용합니다.
      이 작업을 수행해야 하는 이유는, 네트워크 요청에서 역직렬화된 전송 온 post body 객체에는 어떤 유형 정보도 포함되어 있지 않기 때문입니다. 
    */
    // getClassSchema(bodyDto) ==> 클래스와 연결된 Joi 유효성 스키마를 가져오는 joi-class-decorators의 함수입니다.
    const bodyInput = plainToInstance(bodyDto, value); // 일반 Dto 객체를 인스턴스로 변환하여 수동으로 변환합니다
    const bodySchema = getClassSchema(bodyDto); // Dto에서 Joi 스키마 가져오기
    // 클래스 인스턴스를 Joi 스키마에 대해 유효성 검사합니다. 유효성 검사가 실패하면 error에 유효성 오류가 포함됩니다.
    const error = bodySchema.validate(bodyInput).error;  
    if (error) {
      throw new BadRequestException(`유효성 검사 실패: ${error.details.map((err) => err.message).join(', ')}.`);  
    }
    return value
  }
}
interface ArgumentMetadata {
  type: 'body' | 'query' | 'param' | 'custom';
  metatype?: Type<unknown>;
  data?: string;
}
```

## 4. Param 및 Query Params에 대한 Joi 유효성 검사.

- `/testParams/:category’` 경로를 만들고, GET 방식으로 작성합니다. category라는 하나의 param을 받고, 두 개의 Query Params인 limit와 page를 받습니다.

```js
@Get(’/testParams/:category’) 
@HttpCode(HttpStatus.OK) 
@UsePipes(new ValidationPipe()) 
testJoiValidationParam( 
@Param() category: validationParamDto, 
@Query() limitAndPageSize: validationQueryParamDto, 
@Res() res: Response 
) { 
   res.json({ category, limitAndPageSize }); 
}
```

<div class="content-ad"></div>

- 이러한 매개변수를 위해 두 개의 DTO를 생성하세요:

```js
@JoiSchemaOptions({
    allowUnknown: false
})

export class validationParamDto {
     @Expose() @JoiSchema(Joi.string().valid('Fashions', 'Electronics', 'MobilesPhones', 'Perfumes').required())
     category: string; 
}

@JoiSchemaOptions({
    allowUnknown: false
})

export class validationQueryParamDto {

    @Expose() @JoiSchema(Joi.number().min(0).max(100).message('잘못된 제한입니다'))
    limit: string;

    @Expose() @JoiSchema(Joi.number().min(0).max(100).message('잘못된 페이지 크기입니다'))
    page: string;
}
```

GitHub에서 NestJS 샘플 앱을 탐색하세요.