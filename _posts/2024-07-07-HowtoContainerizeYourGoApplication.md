---
title: "Go 애플리케이션을 컨테이너화하는 방법"
description: ""
coverImage: "/assets/img/2024-07-07-HowtoContainerizeYourGoApplication_0.png"
date: 2024-07-07 03:18
ogImage:
  url: /assets/img/2024-07-07-HowtoContainerizeYourGoApplication_0.png
tag: Tech
originalTitle: "How to Containerize Your Go Application??"
link: "https://medium.com/@achanandhi.m/how-to-containerize-your-go-application-cecdf17faabe"
isUpdated: true
---

![이미지](/assets/img/2024-07-07-HowtoContainerizeYourGoApplication_0.png)

안녕하세요 여러분, 여러분은 어떻게 잊을 수 있을까요? 내 첫 블로그는 도커에 관한 것이었어요. 네, 도커는 제가 가장 좋아하는 도구 중 하나였고 데브옵스 여정에서 처음으로 배운 도구였어요. 제가 배운 대부분의 애플리케이션을 컨테이너화했지만, 오늘까지는 고 언어를 컨테이너화한 적이 없었어요. 그래서 이것을 몇 일 동안 해보고 싶었거든요. 오늘 이것에 도전해봤어요.

저는 간단한 고 언어 애플리케이션을 가지고 있어요. 'Hello World'를 표시하는 애플리케이션이에요. 이것을 컨테이너화하고 싶었어요. 그래서 오늘 시도해봤고, "도커를 사용한 고 언어 애플리케이션 컨테이너화의 모범 사례"를 소개한 Synk 블로그를 참고했어요. 이 블로그를 애플리케이션을 컨테이너화하는 참고자료로 사용했어요.

다음은 단일 스테이지 빌드가 포함된 Dockerfile입니다:

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

**Dockerfile 작성 및 실행 방법**

위의 Dockerfile을 작성하고 실행하는 방법은 다음과 같습니다.

먼저, Dockerfile을 작성한 후 아래 명령어를 사용하여 이미지를 빌드합니다.

```bash
docker build -t docker-go .
```

그리고 나서 아래 명령어를 사용하여 컨테이너를 실행합니다.

```bash
docker run -d -p 8081:8080 docker-go
```

이제 해당 이미지를 실행하여 어플리케이션을 확인할 수 있습니다. Docker를 사용해보세요! 🚀

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

![이미지](/assets/img/2024-07-07-HowtoContainerizeYourGoApplication_1.png)

참고: 동일한 디렉토리에 두 개의 Dockerfile을 가지고 싶다면, 원하는 이름을 지정할 수 있지만 Dockerfile 이름을 앞에 포함해야 합니다.

Dockerfile.Multistage

```js
## 단계 1 - 빌드

# 응용 프로그램에 사용할 베이스 이미지를 지정하세요. 아플리나 또는 우분투

FROM golang:1.23-rc-alpine AS build

# 이미지 내에서 작업 디렉토리를 생성합니다.

WORKDIR /demo

# Go 모듈과 종속성을 이미지로 복사합니다.

COPY go.mod ./

# Go 모듈과 종속성을 다운로드합니다.

RUN go mod download

# 디렉토리 파일을 복사합니다. 즉, .go로 끝나는 모든 파일

COPY *.go ./

# 응용 프로그램을 컴파일합니다.

RUN go build -o /godemo


## 단계 2 - 배포

# 최종 스테이지에서는 빈 기본 이미지인 스크래치 이미지를 사용합니다.

FROM scratch

WORKDIR /

COPY --from=build /godemo /godemo


EXPOSE 8080

ENTRYPOINT ["/godemo"]
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

```bash
docker build -t go-web-app-multi -f Dockerfile.multi-stage .
```

```bash
docker run -d -p 8082:8080 go-web-app-multi
```

와! 봐봐요, 이미지 사이즈가 398MB에서 7.5MB로 엄청나게 줄었네요. 이게 Multistage 빌드의 힘입니다. 프로덕션 환경에서 작업할 때는 도커 이미지의 사이즈가 매우 중요합니다. 도커 이미지는 중요한 역할을 하므로 Alpine과 같이 가벼운 도커 이미지를 사용하려고 노력해보세요. 👍

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

![이미지](/assets/img/2024-07-07-HowtoContainerizeYourGoApplication_2.png)

내 GitHub 저장소에 코드를 업로드했어요. 간단한 "Hello World" 애플리케이션을 확인할 수 있어요.

새로운 것을 배웠다고 생각해요. 내일은 개인적인 이야기로 돌아오겠어요. 즐거운 학습되세요!

추가 자료:
