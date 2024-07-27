---
title: "NestJS에서 DTO 쉽게 이해하기"
description: ""
coverImage: "/assets/img/2024-06-22-DTOexplainedinNestJS_0.png"
date: 2024-06-22 14:44
ogImage: 
  url: /assets/img/2024-06-22-DTOexplainedinNestJS_0.png
tag: Tech
originalTitle: "DTO explained in NestJS"
link: "https://medium.com/@yelinliu/dto-explained-in-nestjs-3a296498d77b"
---


DTO(Data Transfer Object) 패턴은 어플리케이션의 서로 다른 레이어 간에 데이터를 전송하는 데 일반적으로 사용되는 설계 패턴입니다. DTO 패턴의 주요 아이디어는 데이터를 캡슐화하고 어플리케이션의 서로 다른 부분 간에 데이터를 전송하는 표준화된 방법을 제공하는 것입니다.

실무에서 DTO는 데이터를 포함하고 일부 유효성 검사 로직을 갖는 간단한 객체입니다. Domain 객체의 일부 또는 전체 데이터를 정의하지만 비즈니스 로직은 포함하지 않습니다. 주로 클라이언트와 서버 간 또는 서버 측 어플리케이션의 서로 다른 레이어 간에 데이터를 전송하는 데 사용됩니다. DTO 객체는 일반적으로 서버 측 코드에서 생성되며 데이터베이스 또는 기타 소스에서 데이터로 채워진 후 클라이언트로 전송됩니다. 클라이언트 측 코드는 그 후 DTO 객체를 사용하여 데이터를 사용자에게 표시하거나 처리를 위해 서버로 보낼 수 있습니다.

<div class="content-ad"></div>

# 기본 사용법

NestJS 애플리케이션에서 DTO를 사용하는 예제를 살펴보겠습니다:

- DTO 클래스를 정의하세요:

```js
export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}
```

<div class="content-ad"></div>

2. 당신의 DTO 클래스를 컨트롤러에서 사용하세요:

```js
import { Controller, Post, Body } from ‘@nestjs/common’;
import { CreateUserDto } from ‘./create-user.dto’;
@Controller('users')
export class UsersController {
 @Post()
 async create(@Body() createUserDto: CreateUserDto) {
 // 여기에 사용자 생성 로직을 작성하세요
 }
}
```

# 적절한 사용법

DTO는 서로 다른 도메인 객체에서 데이터를 구성하거나 도메인 객체의 일부 데이터만 가져오는 데 도움을 주도록 설계되었습니다. 또한 데이터 유효성 검사를 지원하거나 직렬화 논리의 캡슐화를 지원합니다.

<div class="content-ad"></div>

아래는 DTO를 사용하여 데이터 일부만 사용하는 예시입니다:

예를 들어, User 엔티티가 있다고 가정해 봅시다:

<div class="content-ad"></div>

```js
class User {
 id: number;
 name: string;
 email: string;
 password: string;
}
```

저희는 사용자 작업을 처리할 수 있는 서비스를 가지고 있어요:

```js
class UserService {
 // 데이터베이스에서 사용자 객체 가져오기
 getUserById(userId: number): User {
 // 데이터베이스에서 사용자 데이터 가져오기
 // …
 return user;
 }
}
```

이제 이름과 이메일 필드만을 가진 사용자 프로필을 만들고 싶다면 DTO를 정의할 수 있어요:

<div class="content-ad"></div>

```js
// 사용자 데이터의 하위 집합을 나타내는 DTO 클래스를 정의합니다
class UserProfileDto {
  name: string;
  email: string;
}
```

그런 다음 API 요청을 처리하는 컨트롤러를 정의합니다. 이 컨트롤러에서는 서비스를 사용하여 사용자 엔티티를 가져오고 사용자 프로필의 데이터 하위 집합을 나타내는 DTO(UserProfileDto)를 사용합니다:

```js
@Controller('users')
class UsersController {
  constructor(private userService: UserService) {}

  // 사용자 데이터의 하위 집합을 반환하는 API 엔드포인트를 정의합니다
  @Get(':id/profile')
  getUserProfile(@Param('id') userId: number): UserProfileDto {
    const user = this.userService.getUserById(userId);

    // 이름과 이메일 속성만 포함하는 DTO 객체를 생성합니다
    const userProfileDto = new UserProfileDto();
    userProfileDto.name = user.name;
    userProfileDto.email = user.email;

    // API 응답으로 DTO 객체를 반환합니다
    return userProfileDto;
  }
}
```

또 다른 예시로 하나의 DTO를 통해 여러 도메인 객체를 구성하는 데도 DTO를 사용할 수 있습니다:


<div class="content-ad"></div>

만약 고객이 사용자의 최신 블로그 게시물을 요청한다면, 그리고 여러분은 다른 게시물 엔티티를 가지고 있다면:

```js
class Post {
  id: number;
  title: string;
  content: string;
  userId: number;
}
```

서비스가 필요합니다:

```js
// 사용자 및 게시물 작업을 처리하는 서비스 정의
class UserService {
  // 데이터베이스에서 사용자 객체 및 최신 게시물을 가져오는 메서드
  getUserWithLatestPost(userId: number): { user: User, latestPost: Post } {
    // 데이터베이스에서 사용자 데이터 가져오기
    // ...
    
    // 데이터베이스에서 사용자의 최신 게시물 데이터 가져오기
    // ...

    return { user, latestPost };
  }
}
```

<div class="content-ad"></div>

이제 UserWithLatestPostDto를 만들 수 있습니다:

```js
class UserWithLatestPostDto {
  name: string;
  email: string;
  latestPostTitle: string;
  latestPostContent: string;
}
```

컨트롤러에서는 다음과 같을 것입니다:

```js
// API 요청을 처리하는 컨트롤러 정의
@Controller('users')
class UsersController {
  constructor(private userService: UserService) {}

  // 사용자 데이터와 최신 포스트를 반환하는 API 엔드포인트 정의
  @Get(':id/with-latest-post')
  getUserWithLatestPost(@Param('id') userId: number): UserWithLatestPostDto {
    const { user, latestPost } = this.userService.getUserWithLatestPost(userId);

    // 사용자 데이터와 최신 포스트를 포함하는 DTO 객체 생성
    const userWithLatestPostDto = new UserWithLatestPostDto();
    userWithLatestPostDto.name = user.name;
    userWithLatestPostDto.email = user.email;
    userWithLatestPostDto.latestPostTitle = latestPost.title;
    userWithLatestPostDto.latestPostContent = latestPost.content;

    // API 응답으로 DTO 객체 반환
    return userWithLatestPostDto;
  }
}
```

<div class="content-ad"></div>

이 예시에서 DTO는 API 호출 횟수를 줄이고, 클라이언트가 필요로 하는 데이터만 전송할 수 있도록 도와줍니다.