---
title: "DOCKER 이미지 크기 줄이는 방법 및 컨테이너 보안 강화하는 법"
description: ""
coverImage: "/assets/img/2024-07-13-DOCKERImageSizeContainerSecurity_0.png"
date: 2024-07-13 01:36
ogImage:
  url: /assets/img/2024-07-13-DOCKERImageSizeContainerSecurity_0.png
tag: Tech
originalTitle: "DOCKER | Image Size , Container Security"
link: "https://medium.com/dev-genius/docker-image-size-container-security-371e12c9e461"
isUpdated: true
---

![이미지](/assets/img/2024-07-13-DOCKERImageSizeContainerSecurity_0.png)

어서오세요! 최신 도커 블로그 포스트에 오신 것을 환영합니다! 이곳에서는 도커 이미지 크기 및 컨테이너 보안에 대해 탐구해 보겠습니다. 도커는 응용 프로그램을 배포하는 방식을 바꿨습니다. 그러나 최적의 성능과 취약점에 대한 보호를 위해 효율적인 이미지 관리와 견고한 보안 관행을 사용하는 것이 중요합니다.

이 블로그 포스트에서는 도커 이미지 관리를 위한 다양한 전략을 살펴볼 것인데, 이미지 크기를 줄이고 성능을 개선하는 방법을 중점적으로 살펴볼 것입니다. 또한 안전한 베이스 이미지 사용, 컨테이너 권한 제한, 네트워크 보안 제어 구현 등 도커 컨테이너를 위한 최상의 보안 관행을 검토해 볼 것입니다. 이러한 Best Practice를 따르면 도커 컨테이너가 안전하고 효과적이며 성능 최적화가 되도록 할 수 있습니다. 지금 바로 시작해서 도커의 강력한 기능을 최대한 활용해 보는 방법을 배워봅시다!

# 도커 이미지 크기 및 보안

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

## ➡️ 저희 유튜브 영상을 확인해보세요! 실제 예시와 함께 완벽한 안내를 제공하고 있어요! 🤩

## ☑️ 1. 공식 및 확인된 도커 이미지 사용하기

도커 컨테이너를 생성할 때는 공식 이미지를 사용하고 사용하는 베이스 이미지의 정확한 버전을 지정하는 것이 중요합니다. 이렇게 하면 보안 문제를 피하고 시스템 오류의 위험을 줄이며 예기치 않은 변경이나 일관성 없음을 방지할 수 있어요.

공식 이미지를 사용하려면 Dockerfile에 이미지의 이름을 포함시키면 도커가 공식 레지스트리에서 자동으로 이미지를 가져옵니다. 이런 최고의 실천방법은 장기적으로 시간을 절약하고 보다 안전하고 신뢰할 수 있는 이미지를 만들 수 있도록 도와줄 거에요.

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

도커 파일에서 베이스 이미지의 정확한 버전을 지정하려면 아래 예시처럼 Dockerfile에 포함하십시오:

```js
# 공식 파이썬 실행 환경을 베이스 이미지로 사용
FROM python:3.9-slim
```

하지만 우리는 이렇게 업데이트할 것입니다:

```js
# 특정 버전의 베이스 이미지 사용
FROM python:3.9.10-slim
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

이는 동일한 이미지의 다른 버전을 사용할 때 발생할 수있는 변경 및 일관성 문제를 방지할 수 있습니다.

## 🖼️ 2. 이미지 캐싱 레이어 최적화

효율적인 도커 이미지는 이미지 캐싱 레이어를 최적화하고 .dockerignore 파일을 사용하여 불필요한 파일을 제외함으로써 생성될 수 있습니다.

- 이미지 캐싱 레이어를 최적화하려면 이미지를 작은 부분으로 나누어 개별적으로 캐시할 수 있습니다. 이렇게 하면 코드를 수정할 때 변경된 부분만 다시 빌드해야 합니다. 이렇게 하면 시간을 절약할 뿐만 아니라 최종 이미지 크기도 줄일 수 있습니다. 이를 어떻게 성취할 수 있는지 살펴보겠습니다:

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

☝️ 도커를 사용할 때는 각 RUN 명령이 이미지에 새 레이어를 만든다는 점을 염두에 두는 것이 중요합니다. 이는 최종 이미지 크기를 크게 늘릴 수 있습니다.

레이어의 수를 최소화하고 최종 크기를 줄이기 위해 여러 명령을 하나의 RUN 문으로 결합하는 것이 좋습니다. 아래 예시처럼 “&&”을 사용하세요:

FROM alpine:latest

# 패키지 목록 업데이트, 의존성 설치, 정리

RUN apk update && \
 apk add --no-cache \
 package1 \
 package2 \
 && rm -rf /var/cache/apk/\*

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

2. 도커 이미지를 빌드할 때 .dockerignore 파일을 사용하는 것이 유용합니다. 이 파일을 사용하면 로그 파일, 구성 파일 및 임시 파일과 같이 이미지에서 불필요한 파일을 제외할 수 있습니다. 이 파일들은 애플리케이션이 작동하는 데 필요하지 않으므로 제외하면 이미지가 더 작아지고 빌드 프로세스가 빨라집니다. 아래는 .dockerignore 파일의 예시입니다:

```js
# 도커 이미지에 일반적으로 필요하지 않은 파일 및 디렉토리

# 파일
.git
.vscode
*.log

# 디렉토리
node_modules
__pycache__
```

## 📑 3. 다중 단계 배포

## ➡️ 실생활 예제로 완벽한 가이드를 확인하세요! 🤩

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

# 컨테이너 보안

## 🧑‍💼 최소 권한

여러분의 애플리케이션을 안전하게 유지하기 위해 컨테이너를 실행할 때 루트 사용자 계정을 피하는 것이 좋습니다.

대신, 어플리케이션 전용으로 별도의 사용자 계정을 만들고, 프로그램을 실행하는 데 사용하세요. 이 간단한 조치는 시스템에 무단 접근할 가능성을 크게 줄일 뿐만 아니라 잠재적인 악의적 공격을 방지할 수 있습니다.

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

게다가, 응용 프로그램이 손상되는 경우 피해를 최소화하는 데 도움이 됩니다. 언제나 안전하고 보안된 애플리케이션을 보장하기 위해 루트 사용자 계정이 아닌 사용자 계정을 사용하도록 항상주의하십시오.

```js
# 작은 Python 베이스 이미지 사용하기
FROM python:3.9-slim

# 루트가 아닌 사용자 설정
RUN addgroup -g 1000 hitcuser && \
 adduser -u 1000 -G hitcuser -D hitcuser

# 컨테이너 내의 작업 디렉토리 설정
WORKDIR /app

# 요구 사항 파일을 컨테이너로 복사
COPY requirements.txt .

# 종속성 설치
RUN pip install --no-cache-dir -r requirements.txt

# 필요한 경우 추가 빌드 단계 설정하기

# 애플리케이션 디렉토리 소유권 변경
RUN chown -R hitcuser:hitcuser /app

# 루트가 아닌 사용자로 전환
USER hitcuser
```

Dockerfile에서 우리는 'useradd' 명령을 사용하여 'hitcuser'라는 루트가 아닌 사용자를 생성한 다음 'USER hitcuser'를 사용하여 해당 사용자로 전환했습니다. Python 애플리케이션을 빌드하고 실행하기 위한 표준 관행을 따르면 파일 복사, 등이 포함되어 있습니다. 이 접근 방식을 구현함으로써 컨테이너 환경의 공격 표면을 크게 줄이고 잠재적인 보안 위협을 완화할 수 있습니다.

간단히 말하면, 루트 권한으로 컨테이너를 실행하는 것을 피하고, 대신 애플리케이션을 작동시키는 데 필요한 권한만 갖는 루트가 아닌 사용자를 사용하는 것이 권장됩니다. 이렇게 하면 컨테이너에 액세스한 공격자가 애플리케이션이 작동하는 데 필요한 최소한의 리소스에만 액세스할 수 있으므로 발생할 수 있는 피해를 최소화할 수 있습니다.

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

## 🔍 이미지 스캔

도커 이미지를 취약점을 스캔하기 위한 인기 있는 오픈 소스 스캐너인 Trivy를 사용하는 데모를 만들어 보겠습니다.

먼저 시스템에 Trivy가 설치되어 있는지 확인하세요. Trivy GitHub 저장소에서 제공하는 설치 지침을 따를 수 있습니다: [Trivy GitHub 저장소 링크](https://github.com/aquasecurity/trivy#installation)

Trivy를 설치한 후에는 Docker 이미지를 취약점을 스캔하는 데 사용할 수 있습니다. 다음은 단계별 데모입니다:

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

도커 이미지 다운로드하기: 이번 데모에서는 Python 도커 이미지를 사용해 보겠습니다. 공식 Python 이미지를 Docker Hub에서 가져올 수 있어요.

```js
docker pull python:3.9-slim
```

Trivy로 Docker 이미지 스캔하기: 가져온 Docker 이미지를 취약점을 스캔하기 위해 Trivy로 실행해 보세요.

```js
trivy image python:3.9-slim
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

Trivy는 이미지 레이어를 분석하고 발견된 취약점과 그 심각성 수준을 보고할 거에요.

스캔 결과 확인: Trivy가 제공하는 스캔 결과를 확인해보세요. 취약점이 감지된 각 정보에 대한 CVE ID, 심각성 수준, 패키지 이름 및 설명과 같은 정보가 포함될 거에요.

```js
== 서버 ==
서버: Debian GNU/Linux 11 (bullseye)
== Trivy ==
심각성: 치명적
설명: glibc (GNU C 라이브러리)는 잘못된 주소로 함수 호출을 할 때 스택 기반 버퍼 오버플로에 취약합니다. 공격자는 이 취약점을 활용하여 영향 받는 애플리케이션 컨텍스트에서 코드를 실행시킬 수 있어, 거부-서비스 상태 또는 임의의 코드 실행을 초래할 수 있어요.
참조:
- https://security-tracker.debian.org/tracker/CVE-2017-1000366
…

```

조치하기: Trivy나 유사한 도구를 사용하여 정기적인 이미지 스캔을 수행하면 도커 이미지의 보안 취약점을 사전에 식별하고 해결할 수 있어요. 스캔 결과를 기반으로 패키지 업데이트, 패치 적용 또는 보안 취약점이 적은 대체 이미지 사용 등 적절한 조치를 취해야 해요.

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

**자동화 스캔:** Docker 이미지의 취약성을 자동으로 감지하기 위해 Trivy 스캔을 CI/CD 파이프라인에 통합할 수 있습니다. 이를 통해 기존 자동화 워크플로에 스캔을 통합하고 컨테이너화된 애플리케이션을 효과적으로 보호할 수 있습니다.

## ➡️ 컨테이너 보안에 대한 완전한 가이드는 YouTube 비디오로 확인하세요!!! 🤩

# 마치며

![이미지](/assets/img/2024-07-13-DOCKERImageSizeContainerSecurity_1.png)

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

우리는 도커 이미지 크기 최상의 방법과 컨테이너 보안에 관한 광범위한 토론을 마무리 지었습니다. 다음 영상에서는 커뮤니티에서 매우 요청되는 주제인 Docker 네트워킹에 대해 다룰 예정입니다!

또한, 좋아요 버튼을 꾹 눌러주시고 YouTube 채널 구독해주시면 최신 콘텐츠를 업데이트 받을 수 있습니다🔥 우리는 Docker, Kubernetes, DevOps, 클라우드 컴퓨팅, 웹 개발 및 관련 주제에 대한 새로운 비디오를 정기적으로 업로드합니다.

## 채널 구독을 통해 새로운 콘텐츠를 놓치지 않고 독점 콘텐츠에 액세스할 수 있습니다! 🚀

시청해주셔서 감사합니다. 우리가 준비하는 다가오는 영상에서 다시 만나요! 🎬🤗
