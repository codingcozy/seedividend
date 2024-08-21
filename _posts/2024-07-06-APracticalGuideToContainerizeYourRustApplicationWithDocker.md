---
title: "Docker로 Rust 애플리케이션을 컨테이너화하는 실전 가이드"
description: ""
coverImage: "/assets/img/2024-07-06-APracticalGuideToContainerizeYourRustApplicationWithDocker_0.png"
date: 2024-07-06 03:29
ogImage:
  url: /assets/img/2024-07-06-APracticalGuideToContainerizeYourRustApplicationWithDocker_0.png
tag: Tech
originalTitle: "A Practical Guide To Containerize Your Rust Application With Docker"
link: "https://medium.com/itnext/a-practical-guide-to-containerize-your-rust-application-with-docker-77e8a391b4a8"
isUpdated: true
---

```js
/assets/img/2024-07-06-APracticalGuideToContainerizeYourRustApplicationWithDocker_0.png

러스트 코드를 도커 컨테이너로 배포하려면 이 안내서를 통해 첫 번째 Dockerfile을 작성하고 Rust 응용 프로그램을 빌드하고 실행하는 데 도움이 될 것입니다.

본 블로그 포스트는 C++ 응용 프로그램을 컨테이너화하는 원래 기사의 사본입니다. 이 사본은 Rust 응용 프로그램과 동일한 방식으로 작성하는 방법에 중점을 두고 있습니다. Rust 응용 프로그램을 사용하고 응용 프로그램을 컨테이너를 통해 배포하려는 경우, 이 기사를 참고하세요.

# 오늘의 예시: 아이오와
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

이 연습에서는 저의 예전 러스트 어플리케이션 예제를 다시 사용했습니다. 저의 러스트로 작성된 간단한 키-값 저장소입니다. 이 어플리케이션에 대해 더 읽고 싶다면, 여기에 기사를 찾을 수 있으며, 해당 코드는 저장소에서 볼 수 있습니다. 이 어플리케이션은 HTTP 포트를 노출하여 값을 설정하고 가져오는 기능을 제공하기 때문에 Docker 컨테이너로 쉽게 구현할 수 있는 프로젝트입니다.

# 가장 빠른 도커 소개

도커를 아직 모르신다면, 가장 중요한 개념에 대해 빨리 소개해 드리겠습니다. 기억해야 할 가장 중요한 것은, 도커는 가상 머신이 아니라는 것입니다. 도커는 애플리케이션을 컨테이너화하고 이러한 애플리케이션을 실행하는 프로세스를 격리하는 메커니즘입니다.

도커 세계에서 두 가지 중요한 요소가 있습니다: 이미지와 컨테이너. 도커 이미지는 이른바 Dockerfile에서 생성됩니다. 이 파일은 이미지를 빌드할 명령을 설명합니다. 이 이미지로부터 Docker 컨테이너를 생성할 수 있습니다: 이는 이미지의 실제 실행 인스턴스입니다. 도커 엔진은 컨테이너를 인스턴스화하고 실행하는 역할을 맡고 있습니다.

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

블로그 글에서는 우리 예제에 중요하지 않은 추가적인 컨셉들이 있습니다. 그러나 더 자세히 알아보고 싶을 때를 대비하여 언급하고 싶습니다.

- Docker 볼륨은 컨테이너 간에 Docker가 관리하는 파일 공유 메커니즘입니다. 이러한 볼륨들을 바인드 마운트를 통해 컨테이너에 매핑할 수 있습니다.
- Docker 네트워킹을 통해 가상 Docker 네트워크를 지정할 수 있습니다. 컨테이너 간의 네트워크 트래픽은 Docker 프록시를 통해 라우팅됩니다. 이를 통해 각각의 컨테이너 간에 다양한 네트워킹 설정을 할 수 있습니다.
- Docker Compose는 단일 docker-compose.yml 파일에서 여러 다른 컨테이너를 빌드하고 실행할 수 있는 기능입니다. Docker 컨테이너를 위해 정확한 이미지, 컨테이너 이름, 네트워크, 볼륨 등을 지정할 수 있습니다. 예를 들어, MySQL 컨테이너와 사용자 정의 REST API 서비스 컨테이너 그리고 캐시를 위한 REDIS 컨테이너를 함께 실행하고 싶다면 Docker Compose를 통해 이를 설정할 수 있습니다.

# 도커 엔진 설치하기

시작하기 전에 Docker를 설치해야 합니다. Docker 웹사이트에서는 Docker 데스크톱의 사용을 권장하지만 저희 예제를 실행하는 데 필수적이지는 않습니다. 저는 Docker 컨테이너를 빌드하고 실행하는 데 관한 모든 작업에서 GUI 애플리케이션보다는 명령줄을 선호합니다.

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

그러나 MacOS에서는 엔진만 설치하는 대신 Docker Desktop을 설치하는 것이 더 쉬운 것 같았어요. 그래도 데스크톱 애플리케이션 없이 엔진만 설치하고 싶다면 MacOS 또는 Windows with WSL을 위한 훌륭한 안내서를 따라해주세요.

아래 명령어는 apt를 패키지 관리자로 사용하는 Linux 배포판에 Docker 엔진을 설치하는 명령어에요:

```js
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

더 많은 정보를 찾고 싶다면 공식 문서에서 Docker 엔진을 설치하는 방법과 올바른 저장소 추가 및 문제 해결 방법 등을 확인해주세요.

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

# 도커파일 작성하기

초기 프로젝트 구조는 하나의 소스 코드 main.rs 파일과 Cargo.toml 파일로 구성된 간단한 Rust 프로젝트입니다. main.rs 파일은 애플리케이션을 시작하고 웹 서버를 시작하며 값을 설정하고 가져오는 끝점을 노출합니다. Cargo.toml 파일에는 모든 필요한 종속성이 포함되어 있습니다: actix-web, clap 및 env_logger.

```rust
src/main.rs
Cargo.toml
```

컨테이너화를 시작하려면 프로젝트 디렉토리에 새로운 Dockerfile을 만드세요.

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
touch Dockerfile
```

이 Dockerfile은 Docker 이미지를 빌드하는 데 필요한 모든 명령을 포함하게 됩니다. Dockefile에서 가장 중요한 명령어는 다음과 같습니다:

- FROM : 기존의 Docker 이미지에서 새로운 stage를 생성합니다.
- RUN : 이미지 내에서 Linux 명령어를 실행합니다.
- COPY : 로컬 파일 시스템에서 파일이나 폴더를 이미지로 복사합니다.
- CMD 또는 ENTRYPOINT : 이미지가 컨테이너로 인스턴스화될 때 실행됩니다.

다시 한 번 강조하지만, 이미지(build time)와 컨테이너(runtime)의 차이를 기억하는 것이 중요합니다. FROM, RUN 및 COPY 명령어는 빌드 시간에 실행되며, CMD 또는 ENTRYPOINT 명령어는 실행 시간에 실행됩니다.

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

저희는 이미지를 위해 멀티 스테이지 빌드를 사용하고 있어요. 애플리케이션을 컨테이너 내에서 빌드할 때 멀티 스테이지 빌드가 가장 좋은 방법이죠. 빌드 도구와 종속성을 설치하고 필요한 소스 파일을 이미지로 복사한 뒤 Rust의 cargo를 사용해 애플리케이션 실행 파일을 빌드할 빌드 스테이지를 가져올 거예요. 최종 이미지를 빌드하는 두 번째 스테이지에서는 런타임 종속성을 설치하고 런타임 사용자를 만들 거예요. 그 다음으로, 빌드된 실행 파일을 최종 이미지로 복사하고 애플리케이션을 시작하는 엔트리포인트를 정의할 거예요.

# 빌드 스테이지

FROM 명령은 빌드할 이미지를 지정해요. 여기서는 공식 Rust slim 이미지를 사용하고 있어요. 이미지의 정확한 버전을 지정하는 것이 가장 좋은 방법이에요 (이 경우 1.77). AS 키워드는 스테이지의 이름을 지정하는데, 우리의 경우에는 build로 지정되어요.

```js
FROM rust:1.77.0-slim as build
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

그러면 빌드 의존성을 추가해야 해요. 최종 이미지를 빌드할 때 실제 이미지를 처음부터 만들어서 공간을 절약하기 위해, musl을 추가해야 해요. 이렇게 하면 기본 glibc가 없는 scratch에서 이진 파일을 정적으로 링크할 수 있어요. 처음부터 빌드하는 과정을 자세히 설명한 블로그 글이 있어서 참고하도록 해요.

```js
RUN rustup target add x86_64-unknown-linux-musl && \
    apt update && \
    apt install -y musl-tools musl-dev && \
    update-ca-certificates
```

다음 명령어는 샘플 iowa 애플리케이션을 빌드하는 데 필요한 소스 파일을 복사해요.

```js
COPY ./src ./src
COPY ./Cargo.lock .
COPY ./Cargo.toml .
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

이후에는 이미 빌드 단계에서 사용할 사용자를 만들어야합니다. 스크래치 단계에는 adduser 프로그램이 없기 때문입니다.

```js
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid 10001 \
    "iowa"
```

여기서는 cargo build 명령어를 실행하기만 하면 됩니다. 애플리케이션의 릴리스 버전을 빌드하려면 --release 플래그와 x86_64-unknown-linux-musl을 사용하도록 --target 플래그를 전달하는 것을 기억해주세요. cargo 빌드 도구는 모든 중간 빌드 아티팩트 및 마지막 컴파일된 실행 가능 이진 파일을 위한 target 디렉토리를 만들 것입니다.

```js
RUN cargo build --target x86_64-unknown-linux-musl --release
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

# 마지막 이미지

최종 이미지는 다시 다른 FROM문으로 이 단계를 선언하고 있습니다. 이번 단계에서는 build 단계에 사용된 Docker 이미지의 빌드 도구가 필요하지 않기 때문에 rust:alpine Docker 이미지를 사용하고 있습니다.

```js
FROM rust:1.77-alpine3.18
```

다음 단계로는 이미 build 단계에서 생성한 응용 프로그램을 실행하는 데 필요한 파일을 사용자에게 복사합니다 (여기서는 adduser를 사용할 수 없다는 것을 기억하세요). 또한, USER 명령을 사용하여 Docker에게 실제로 생성된 사용자를 사용하도록 지시합니다.

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
COPY --from=build /etc/passwd /etc/passwd
COPY --from=build /etc/group /etc/group
```

```js
USER iowa:iowa
```

이후에는 빌드 단계에서 생성된 응용 프로그램 이진 파일을 최종 이미지로 복사합니다. --chown 옵션은 소유권을 지정하고 --from 옵션은 복사할 단계의 이름을 지정합니다 (우리의 경우 이전 빌드 단계입니다).

```js
COPY --from=build --chown=iowa:iowa ./target/x86_64-unknown-linux-musl/release/iowa /app/iowa
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

마지막 명령은 이미지에서 컨테이너가 생성될 때 실행되는 시작 지점을 나타냅니다. 이를 통해 명령행 인수를 전달할 수도 있습니다.

```js
ENTRYPOINT["./app/iowa"];
```

전체 Dockerfile은 제 GitHub 저장소에서 확인할 수 있어요.

# 도커 이미지 빌드하기

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

프로젝트 디렉토리에서 다음 명령을 실행하여 Docker 이미지를 빌드할 수 있습니다. -t 옵션은 이미지의 저장소, 이름 및 선택적으로 태그를 지정하는 데 사용됩니다. 저장소`/`이름`:`태그` 스키마에 따라 판독합니다. 콜론 뒤에 태그를 선언하지 않으면 Docker는 latest 태그를 사용합니다. 다음 명령은 나중에 컨테이너를 인스턴스화하는 데 사용할 이미지 mostsignificant/iowa:latest를 빌드합니다.

```js
docker build . -t mostsignificant/iowa
```

빌드 중에 다양한 단계와 계층이 구축되는 것을 볼 수 있습니다. Dockerfile의 각 명령은 새 계층을 추가합니다. 따라서 빌드된 이진 파일과 실행 시 필요한 종속성만 포함하도록 다중 단계 빌드를 가져야 합니다. 빌드 후 다음 명령을 실행하여 모든 로컬 이미지와 정보를 나열합니다.

```js
docker image ls
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

| REPOSITORY           | TAG    | IMAGE ID     | CREATED  | SIZE   |
| -------------------- | ------ | ------------ | -------- | ------ |
| mostsignificant/iowa | latest | 83a2870a14b1 | 2시간 전 | 10.6MB |

이 이미지의 크기가 10.6 MB로 좋습니다. 만약 이 이미지를 빌드할 때 debian:bookworm-slim을 베이스 이미지로 사용했다면 결과 이미지의 크기가 86.6 MB나 되었을 겁니다. 이미지의 크기를 줄이는 것은 어려운 과제일 수 있지만, 여러 가지 도구들이 이 작업을 지원합니다. 예를 들어 이미지의 다른 레이어를 검사하는 데 도움이 되는 dive가 있습니다. 빌드 과정 중 이전 레이어에 추가된 파일이 후반 레이어에서 삭제될 수 있음에 유의해야 합니다. 하지만 최종 이미지에는 여전히 원본 데이터가 남아 있습니다. 따라서 다음을 고려할 수 있습니다:

- 다중 단계 빌드를 사용하고 이전 단계에서 필요한 파일만 최종 이미지로 복사
- 또는 이미지에 설치 패키지를 복사하는 대신 원격 저장소를 사용하여 설치
- 또는 한 번의 RUN 명령어로 패키지를 다운로드, 해제, 설치 및 제거

# 도커 이미지를 컨테이너로 실행하기

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

아래 명령어는 이미지를 실행하고 컨테이너를 인스턴스화합니다:

```js
docker run \
  -p 1984:1984 \
  -d \
  mostsignificant/iowa:latest
```

다음과 같은 명령줄 인수를 사용하고 있습니다:

- -p는 컨테이너 내부의 포트를 호스트로 매핑합니다: 아이오와 애플리케이션의 기본 포트 1984를 호스트 시스템의 동일한 포트로 매핑하지만 다른 사용 가능한 포트를 사용할 수 있습니다
- -d는 컨테이너를 백그라운드 모드로 시작합니다

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

Docker 컨테이너를 실행중인 상태에서 확인할 수도 있어요:

```js
docker ps
```

```js
CONTAINER ID   IMAGE                                     COMMAND                  CREATED         STATUS         PORTS                    NAMES
49021e2099d7   mostsignificant/iowa:latest   "./app/iowa…"   3 seconds ago   Up 2 seconds   0.0.0.0:1984->1984/tcp   sad_visvesvaraya
```

컨테이너 이름은 따로 지정하지 않으면 랜덤으로 생성돼요 — 저희 사례에서는 sad_visvesvaraya에요 (위키피디아에서 더 알아보세요). 컨테이너 ID(해시)나 이름을 사용해 참조할 수 있어요, 예를 들면:

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

- 컨테이너를 종료하려면 `docker stop 49021e2099d7`을 입력하세요.
- 중지된 컨테이너를 제거하려면 `docker rm 49021e2099d7`을 입력하세요 (이미지는 삭제되지 않습니다!).
- 컨테이너에 대한 더 많은 정보를 얻으려면 `docker inspect 49021e2099d7`을 입력하세요.

## 도커 이미지 공개하기

도커 이미지를 공개하려면 먼저 Docker Hub에서 계정을 생성해야 합니다. 계정 이름은 이전에 사용한 저장소 이름과 동일해야 합니다 (또는 이미지를 다시 이름 지정할 수 있습니다). 제 경우 계정 이름은 `mostsignificant`이기 때문에 이미지 이름을 다음과 같이 지정합니다: `_mostsignificant/:_`.

계정을 생성한 후 다음 명령을 사용하여 Docker Hub에 로그인하고 자격 증명을 제공해야 합니다:

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
도커 로그인
```

로그인한 후에 이미지를 도커 허브에 푸시할 수 있습니다.

```js
도커 푸시 mostsignificant/iowa:latest
```

그게 다에요. 이제 누구나 여러분의 도커 이미지를 다운로드하고 실행할 수 있습니다.

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

# 다음 단계

이제 애플리케이션이 실행되는 첫 번째 Docker 이미지를 얻었다. 언제나 이미지를 개선하고 주변 모든 것을 개선하는 몇 가지 TLC 단계가 있습니다. 여기 몇 가지 제안 사항이 있습니다:

- 빌드 파이프라인: Docker 빌드 및 푸쉬 단계를 빌드 파이프라인에 통합할 수 있습니다. GitHub Actions을 사용하는 경우 GitHub의 자체 저장소인 GitHub Packages 또는 Docker Hub로 통합하는 방법에 대한 훌륭한 문서가 있습니다.
- 테스트: 빌드 단계에 테스트 단계를 포함할 수도 있습니다 (예: CTest를 통해). 이러한 방식으로 도커 이미지 빌드가 실패하지 않도록 테스트를 포함하세요. 그렇게 하면 이미지에서 테스트 결과 파일을 복사하여 빌드 파이프라인에 전달할 수 있습니다. 그럼 빌드 파이프라인은 이전 테스트가 실패했을 경우 이미지를 게시할 수 없게 할 수 있습니다.
- 린팅: Dockerfile에 일반적인 모범 사례 위반 사항을 확인하기 위해 hadolint와 같은 Docker 린터를 사용할 수 있습니다.
- 문서화: Dockerfile의 문서화를 개선하기 위해 레이블을 사용하고 Docker Hub 사이트에 이미지에 관한 README를 추가하세요.
- .dockerignore: 이미지로 복사하지 않을 파일이나 폴더를 방지하기 위해 프로젝트 디렉토리에 .dockerignore 파일을 추가하고 일반적으로 COPY 명령에 주의하세요.

# 마무리

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

작은 튜토리얼이 도커에 익숙하지 않은 러스트 개발자들이 어플리케이션을 컨테이너화하는 데 도움이 되었으면 좋겠습니다. 전체 예제는 내 GitHub 저장소에서 확인할 수 있고, 빌드된 이미지는 내 Docker Hub 저장소에서 확인할 수 있습니다. 도커 세계에는 더 많은 것을 배울 수 있으며, 공식 문서와 참고 자료가 좋은 시작점이 될 것입니다.

코딩을 계속 하고, 계속해서 창작해 나가세요!
