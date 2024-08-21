---
title: "Nodejs 애플리케이션을 위한 효율적인 멀티스테이지 빌드 마스터하는 방법 Docker 완전 정복"
description: ""
coverImage: "/assets/img/2024-07-13-MasteringDockerCreatingEfficientMulti-StageBuildsforNodejsApplications_0.png"
date: 2024-07-13 01:47
ogImage:
  url: /assets/img/2024-07-13-MasteringDockerCreatingEfficientMulti-StageBuildsforNodejsApplications_0.png
tag: Tech
originalTitle: "Mastering Docker: Creating Efficient Multi-Stage Builds for Node.js Applications"
link: "https://medium.com/codex/mastering-docker-creating-efficient-multi-stage-builds-for-node-js-applications-34cb9731990e"
isUpdated: true
---

![Docker Multi-Stage Builds](/assets/img/2024-07-13-MasteringDockerCreatingEfficientMulti-StageBuildsforNodejsApplications_0.png)

안녕하세요! 최근 Docker는 개발자들이 애플리케이션을 빌드, 배포, 실행하는 방식을 혁신적으로 변화시켰습니다. 서로 다른 환경에서의 일관성을 제공하고 배포 프로세스를 간소화함으로써 기여하고 있습니다. 저희 블로그에서는 Node.js 애플리케이션을 위한 Dockerfile을 작성하고, 멀티 스테이지 빌드를 활용하여 최종 이미지를 최적화하는 방법을 살펴보겠습니다. 이 접근 방식은 이미지 크기를 줄이는 것뿐만 아니라 보안과 효율성을 향상시킵니다.

## 멀티 스테이지 빌드란 무엇인가요?

Docker의 멀티 스테이지 빌드를 활용하면 Dockerfile에서 여러 FROM 문을 사용할 수 있어서 빌드 프로세스에 여러 단계를 만들 수 있습니다. 이는 빌드 환경을 실행 환경과 분리할 수 있어 최종 이미지에 필요한 파일과 의존성만 포함되도록 보장합니다.

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

## Dockerfile 작성

Node.js와 Express로 만든 어플리케이션을 위한 Dockerfile을 만들어보겠습니다. 이 Dockerfile은 multi-stage 빌드의 강력함을 보여줄 것입니다.

```js
# Stage 1: 어플리케이션 빌드
FROM node:18-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# package.json 및 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 나머지 어플리케이션 코드 복사
COPY . .

# 어플리케이션 빌드
RUN npm run build

# Stage 2: 프로덕션 이미지 생성
FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 빌더 스테이지로부터 필요한 파일들만 복사
COPY --from=builder /app/build ./build
COPY --from=builder /app/package*.json ./

# 프로덕션 의존성만 설치
RUN npm install --only=production

# 어플리케이션 실행에 필요한 포트 노출
EXPOSE 3000

# 어플리케이션 실행 명령
CMD ["node", "build/server.js"]
```

# Dockerfile 분석

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

- Multi-Stage Build: Dockerfile에서 두 단계를 정의합니다. 첫 번째 단계, 빌더(builder),는 빌드 프로세스를 처리합니다. 두 번째 단계는 최적화된 프로덕션 이미지를 생성합니다.
- Base Image: 우리는 두 단계 모두에 대해 가벼운 Node.js의 Alpine Linux 버전인 node:18-alpine을 사용합니다.
- 작업 디렉토리: WORKDIR 지시문은 컨테이너 안의 작업 디렉토리를 설정합니다.
- 종속성 복사: 빌더 단계에서 package\*.json 파일을 복사하고 npm install을 실행하여 종속성을 설치합니다. 그런 다음 애플리케이션 코드의 나머지를 복사하고 빌드 프로세스(npm run build)를 실행합니다.
- 프로덕션 종속성: 최종 단계에서는 빌더 단계에서 구축된 파일과 package\*.json을 복사하고 npm install --only=production을 사용하여 프로덕션 종속성만 설치합니다.
- 포트 노출: EXPOSE 지시문을 사용하여 앱이 실행될 포트(포트 3000)를 문서화합니다.
- 시작 명령: CMD 지시문은 애플리케이션을 실행할 명령을 지정합니다(node build/server.js).

# 다단계 빌드의 장점

- 이미지 크기 감소:

- 빌드 및 런타임 환경을 분리함으로써 최종 이미지에 필요한 파일과 종속성만 포함되도록 보장합니다. 이는 이미지 크기를 크게 줄이고 시작 시간을 개선하며 저장 요구 사항을 줄입니다.

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

2. 향상된 보안:

- 구성 요소가 적은 작은 이미지는 공격 대상이 줄어들게 합니다. 다단계 빌드를 통해 빌드 도구와 필요 없는 파일이 제품 이미지에 포함되지 않도록 도와줍니다.

3. 빠른 빌드:

- 캐시에서 중간 레이어를 재사용하는 것은 종속성이 변경되지 않은 경우 빌드 프로세스를 가속화할 수 있습니다. Docker는 변경된 레이어만 다시 빌드하므로 개발 중에 시간을 절약할 수 있습니다.

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

4. 관심사의 명확한 분리:

- Dockerfile은 빌드 로직과 런타임 로직을 명확히 분리하여 이해와 유지보수가 쉽습니다. 이러한 분리는 또한 서로 다른 팀이 각자 다른 단계에서 작업할 수 있도록 합니다.

# 예시 어플리케이션 구조

위의 Dockerfile과 함께 작동하는 Node.js 어플리케이션의 예시 구조입니다:

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
/my-app
  |-- build
       |-- server.js
  |-- src
       |-- index.js
       |-- ...
  |-- package.json
  |-- package-lock.json
  |-- Dockerfile
```

이 구조에서 소스 파일은 src 디렉토리 안에 있고, 빌드된 결과물은 빌드 스크립트(e.g., npm run build)에 의해 build 디렉토리에 배치됩니다.

# 도커 이미지 실행

도커 이미지를 빌드하고 실행하려면:

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

- 도커 이미지 만들기:

```bash
docker build -t my-node-app .
```

2. 도커 컨테이너 실행하기:

```bash
docker run -p 3000:3000 my-node-app
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

# 추가 개선 사항

1. 의존성 캐싱:

- COPY package\*.json . 및 RUN npm install을 나머지 응용 프로그램 코드를 복사하기 전에 사용하면 Docker의 캐싱 메커니즘을 활용할 수 있습니다. 의존성이 변경되지 않았다면 Docker는 캐시된 레이어를 재사용하여 이후 빌드를 가속화합니다.

2. 환경 변수:

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

- ARG와 ENV 명령을 사용하면 빌드 시간 및 실행 시간 환경 변수를 전달할 수 있습니다. 이는 Dockerfile을 더 유연하고 구성 가능하게 만듭니다.

```js
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Dockerfile 내에서
RUN if [ "$NODE_ENV" = "production" ]; then npm install --only=production; else npm install; fi
```

# 결론

Docker와 다중 단계 빌드를 활용하여 효율적이고 안전하며 확장 가능한 컨테이너화된 애플리케이션을 만들 수 있습니다. 이 접근 방식은 최종 이미지 크기를 줄이는데 그치지 않고 보안 및 빌드 효율성을 향상시킵니다. Docker의 기능을 활용하여 개발 및 배포 프로세스를 최적화하고, 모든 환경에서 일관되고 신뢰할 수 있는 애플리케이션 성능을 보장하세요.

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

아래 댓글란에 여러분의 도커(Docker)에 대한 생각과 경험을 자유롭게 공유해 주세요! 🌟
