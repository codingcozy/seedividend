---
title: "Multi-Stage 빌드를 사용하는 Rust 애플리케이션 도커라이징 방법"
description: ""
coverImage: "/assets/img/2024-07-10-DockerizingaRustapplicationwithMulti-StageBuilds_0.png"
date: 2024-07-10 02:40
ogImage:
  url: /assets/img/2024-07-10-DockerizingaRustapplicationwithMulti-StageBuilds_0.png
tag: Tech
originalTitle: "Dockerizing a Rust application with Multi-Stage Builds"
link: "https://medium.com/@ams_132/dockerizing-a-rust-application-with-multi-stage-builds-31ac8a5ce7c7"
isUpdated: true
---

한국에서 여행 전문가인데요! 러스트 어플리케이션을 위한 최소 이미지 크기로 Docker 이미지 만들기 ⚒️

![Here is the image for you!](/assets/img/2024-07-10-DockerizingaRustapplicationwithMulti-StageBuilds_0.png)

Docker에 처음이신가요? 🧐
간단한 베이스 Dockerfile로 어플리케이션의 Docker 이미지를 만들어 본 적 있나요? 그때 이미지 사이즈가 커서 ( `800Mb ) RAM을 모두 소모하는 일이 있으셨을텐데요. 😭

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

챙기지 마세요! 😙 여기 있어요...

오늘은 러스트 어플리케이션을 위한 가벼운 이미지를 만드는 것에 대해 이야기할 거예요. 다른 어플리케이션용으로도 곧 (가깝지 않을래요 😅) 발표할 예정이에요...

이미지를 가볍게 만들기 위해 사용할 수 있는 방법에 대해 이야기해볼게요:

- 멀티 스테이지 빌드 사용하기
- 알파인, 슬림 등과 같이 가벼운 이미지 사용해서 실행 파일 실행하기

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

이 방법으로 이미지를 만드는 것과 간단한/기본적인 Dockerfile로 이미지를 만드는 것 사이에는 이미지 크기 측면에서 많은 차이가 있어요. ( 예를 들어 1Gb `==` 20Mb )

실제 인프라를 다룰 때 큰 차이를 만들 수 있어요. 😤그 차이를 이해하는 가장 좋은 방법은 직접 해보고 크기를 비교하는 것이에요. 😉

( Psst🐱 저는 간단한 Rust 앱을 사용해 이미지를 만들 거에요 )

# 간단한 Dockerfile로 이미지 만들기

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

필요한 준비물:

- Rust가 설치되어 있어야 합니다.
- Cargo가 설치되어 있어야 합니다. (Rust의 패키지 관리자📦)

단계:

```rust
cargo new simple
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
cd simple
nano Dockerfile
```

아래 내용을 Dockerfile에 붙여넣기하세요.

```js
# 공식 Rust 이미지 사용하기
FROM rust:latest

# 컨테이너 내부의 작업 디렉터리 설정하기
WORKDIR /usr/src/myapp

# 프로젝트 파일을 컨테이너로 복사하기
COPY . .

# 프로젝트 빌드하기
RUN cargo build --release

# 애플리케이션을 실행하는 기본 명령 설정하기
CMD ["./target/release/myapp"]
```

이제 도커 구성 파일이 준비되었으니 빌드해보겠습니다. (도커 데몬이 실행 중이어야 합니다😈)

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
도커 빌드 -t simple-rust-app .
```

이미지가 생성되면 도커 이미지에서 확인해보세요

![도커 이미지](/assets/img/2024-07-10-DockerizingaRustapplicationwithMulti-StageBuilds_1.png)

우리가 만든 "simple-rust-app" 이미지의 크기는 1.42Gb라는 것을 확인할 수 있어요! 🤯.

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

자, 이제 최적화된 방법을 살펴봅시다…

# 다단계 빌드로 이미지 만들기

여기서는 러스트 어플리케이션을 그대로 사용하지만 Dockerfile만 변경할 것입니다.

몇 줄을 더 추가함으로써 가벼우면서 최적화된 빌드를 얻는 방법을 알아보세요.

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

Multi-Stage Build에서 뭐하고 있는 걸까요?🧐

여기서의 주요 관심사는 알파인 같은 최소한의 배포판에서 실행되는 최종 실행 가능 파일만 가지는 것입니다. 이는 rustc와 cargo 같은 컴파일러, 그리고 실제로 필요하지 않은 빌드 아티팩트와 같은 패키지 관리자를 포함합니다. 따라서 모든 불필요한 구성 요소는 제거되어야 합니다.

이를 위해 우리는 애플리케이션을 빌드하고 rust:1.75.0과 같은 이미지에서 필요한 모든 종속성을 가져오고, 빌드 단계에서 필요한 파일을 알파인과 같은 다른 베이스 이미지로 전송하여 그곳에서 실행 가능한 파일을 실행합니다.

또한, 몇 가지 보안 관행 팁도 있습니다 💡

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

- 실행 파일은 루트 사용자가 아닌 기본 이미지에서 권한이 없는 사용자로 실행되어야 합니다.
- 취약성 위험을 줄이기 위해 패키지 수를 필요에 맞게 최소화해야 합니다. 더 적은 패키지는 더 적은 취약성 위험과 용량이 작은 이미지를 의미합니다.😤

이제 다중 단계 빌드를 이해했으니 구현해 봅시다. Dockerfile에 다음 내용을 붙여넣으세요.

```js
ARG RUST_VERSION=1.75.0
ARG APP_NAME=singularity

FROM rust:${RUST_VERSION}-alpine AS build
ARG APP_NAME
WORKDIR /app

RUN apk add --no-cache clang lld musl-dev git

RUN --mount=type=bind,source=src,target=src \
    --mount=type=bind,source=Cargo.toml,target=Cargo.toml \
    --mount=type=bind,source=Cargo.lock,target=Cargo.lock \
    --mount=type=cache,target=/app/target/ \
    --mount=type=cache,target=/usr/local/cargo/git/db \
    --mount=type=cache,target=/usr/local/cargo/registry/ \
cargo build --locked --release && \
cp ./target/release/$APP_NAME /bin/server


FROM alpine:3.18 AS final

ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser
USER appuser

# "build" 단계로부터 실행 파일을 복사합니다.
COPY --from=build /bin/server /bin/

# 컨테이너가 시작될 때 어떤 작업을 수행해야 하는지 정의합니다.
CMD ["/bin/server"]
```

또한 "ARG RUST_VERSION=`rust_version`"에 자신의 Rust 버전을 입력하도록 기억하세요.

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

해당 명령은 다음과 같이 찾을 수 있습니다.

```js
cargo --version
```

이제 다음 명령으로 빌드해보세요.

```js
docker build -t rust-app-with-multi-stage-build .
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

빌드가 완료되면 빌드 크기를 비교해보겠습니다 🤔

![Multi-Stage Builds](/assets/img/2024-07-10-DockerizingaRustapplicationwithMulti-StageBuilds_2.png)

1.42 GB에서 12 MB로, 멀티 스테이지 빌드의 힘입니다 😌

즐겁게 감상하셨길 바랍니다!!!

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

곧 새로운 글이 올라오니 @ams_132를 꼭 확인해주세요!!!

항상 Dockerfile을 최소한으로 유지하면 Docker 이미지가 최대한으로 유지됩니다.😉

다음에 또 만나요...
