---
title: "쿼커스 대 Go 프레임워크 Hello World 성능"
description: ""
coverImage: "/assets/img/2024-05-16-QuarkusvsGoframeworksHelloWorldPerformance_0.png"
date: 2024-05-16 16:27
ogImage: 
  url: /assets/img/2024-05-16-QuarkusvsGoframeworksHelloWorldPerformance_0.png
tag: Tech
originalTitle: "Quarkus vs Go frameworks: Hello World Performance"
link: "https://medium.com/deno-the-complete-reference/quarkus-vs-go-frameworks-hello-world-performance-03b8eb84dec7"
---



![Quarkus vs Go frameworks Hello World Performance](/assets/img/2024-05-16-QuarkusvsGoframeworksHelloWorldPerformance_0.png)

This is a requested article. Readers have asked for an up-to-date comparison of Quarkus (one of the fastest choices in the Java world) and popular Go frameworks like Gin, Fiber, and Echo.

In this article, we will focus on the simplest "Hello World" use case. We acknowledge that a "Hello World" example is far from real-world scenarios and not the ideal use case for benchmarking. We will follow up with another article that will perform database reads (I/O-bound operations).

A similar comparison with Spring Boot (powered by virtual threads) can be seen here:


<div class="content-ad"></div>

# 테스트 환경 구성

모든 테스트는 16G 램 및 8+4 CPU 코어를 갖춘 MacBook Pro M2에서 실행되었습니다. 사용된 소프트웨어 버전은 다음과 같습니다:

- Quarkus 3.10.0 (Java 21.0.3)
- Go 1.22.3

테스트는 Bombardier 로드 테스터를 사용하여 수행되었습니다.

<div class="content-ad"></div>

애플리케이션 코드는 다음과 같습니다:

Quarkus

```js
// application.properties

quarkus.http.port=3000

// HelloWorldApplication.java

package org.acme;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import io.smallrye.common.annotation.NonBlocking;

@Path("/")
public class HelloWorldApplication {

    @GET
    @NonBlocking
    @Produces(MediaType.TEXT_PLAIN)
    public String hello() {
        return "Hello World!";
    }
}
```

Gin

<div class="content-ad"></div>

```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.New()

	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "Hello world!")
	})

	r.Run(":3000")
}
```

Fiber

```go
package main

import (
	"github.com/gofiber/fiber"
)

func main() {
	app := fiber.New()
	port := ":3000"

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello World!")
	})

	app.Listen(port)
}
```

Echo
```go
// Your Echo code goes here
```

<div class="content-ad"></div>


# Results

100개의 동시 연결에 대한 테스트를 진행하였으며, 총 10백만 개의 요청이 실행되었습니다.

다음은 차트 형태로 표시된 결과입니다:


<div class="content-ad"></div>


![Quarkus vs Go frameworks - Hello World performance 1](/assets/img/2024-05-16-QuarkusvsGoframeworksHelloWorldPerformance_1.png)

![Quarkus vs Go frameworks - Hello World performance 2](/assets/img/2024-05-16-QuarkusvsGoframeworksHelloWorldPerformance_2.png)

![Quarkus vs Go frameworks - Hello World performance 3](/assets/img/2024-05-16-QuarkusvsGoframeworksHelloWorldPerformance_3.png)

![Quarkus vs Go frameworks - Hello World performance 4](/assets/img/2024-05-16-QuarkusvsGoframeworksHelloWorldPerformance_4.png)


<div class="content-ad"></div>


![Image 5](/assets/img/2024-05-16-QuarkusvsGoframeworksHelloWorldPerformance_5.png)

![Image 6](/assets/img/2024-05-16-QuarkusvsGoframeworksHelloWorldPerformance_6.png)

![Image 7](/assets/img/2024-05-16-QuarkusvsGoframeworksHelloWorldPerformance_7.png)

![Image 8](/assets/img/2024-05-16-QuarkusvsGoframeworksHelloWorldPerformance_8.png)


<div class="content-ad"></div>


![이미지1](/assets/img/2024-05-16-QuarkusvsGoframeworksHelloWorldPerformance_9.png)

![이미지2](/assets/img/2024-05-16-QuarkusvsGoframeworksHelloWorldPerformance_10.png)

# 분석

먼저, 이번에는 경쟁이 훨씬 치열합니다. 이전에 Spring Boot를 사용했을 때 Go 프레임워크(비록 기능이 매우 적었지만)가 모든 측정치에서 Spring Boot를 능가했습니다. 그러나 Quarkus를 사용할 때는 결과가 매우 다릅니다.

<div class="content-ad"></div>

Quarkus는 다른 Go 프레임워크보다 더 많은 초당 요청(RPS)을 처리할 수 있습니다. 게다가 Quarkus의 지연 시간 수치도 비슷합니다. 게다가 Quarkus는 Go보다 적은 CPU를 사용합니다. Quarkus가 부족한 유일한 부분은 메모리 사용량입니다 (250M 대 30M).

승자: 선택하기 어려움.

읽어주셔서 감사합니다!

Spring Boot(가상 스레드로 구동)와 비슷한 비교 결과는 여기에서 확인할 수 있습니다: