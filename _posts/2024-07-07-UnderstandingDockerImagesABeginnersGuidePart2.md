---
title: "도커 이미지 이해하기 초보자를 위한 가이드 파트 2"
description: ""
coverImage: "/assets/img/2024-07-07-UnderstandingDockerImagesABeginnersGuidePart2_0.png"
date: 2024-07-07 23:38
ogImage:
  url: /assets/img/2024-07-07-UnderstandingDockerImagesABeginnersGuidePart2_0.png
tag: Tech
originalTitle: "Understanding Docker Images: A Beginner’s Guide #Part 2"
link: "https://medium.com/@bhavyshekhaliya/understanding-docker-images-a-beginners-guide-part-2-520e9fedf4ab"
isUpdated: true
---

도커는 우리가 애플리케이션을 개발하고 배포하며 실행하는 방식을 혁신적으로 변화시켰어요. 도커의 핵심 기능은 도커 이미지 개념에 있어요. 이 글에서는 도커 이미지가 무엇이고, 어떻게 작동하는지, 그리고 왜 현대 애플리케이션 개발에 필수적인지 알아볼게요.

![Docker 이미지](/assets/img/2024-07-07-UnderstandingDockerImagesABeginnersGuidePart2_0.png)

## 도커 이미지란 무엇인가요?

도커 이미지는 코드, 런타임, 시스템 도구, 라이브러리 및 설정이 필요한 모든 것이 들어 있는 가벼운 독립형 실행 가능한 패키지에요. 도커 이미지는 완전한 애플리케이션 환경의 스냅샷이나 템플릿으로 생각할 수 있어요.

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

- 변경 불가능성: Docker 이미지는 한 번 생성되면 변경되지 않습니다.
- 계층화: 이미지는 여러 개의 계층을 사용하여 구축됩니다.
- 공유 가능성: 이미지는 쉽게 공유하고 배포할 수 있습니다.
- 효율성: 여러 컨테이너가 동일한 이미지 계층을 사용할 수 있습니다.

## Docker 이미지 작동 원리

1. 이미지 빌드:

- 이미지는 Dockerfile에서 생성됩니다.
- Dockerfile의 각 명령은 새로운 계층을 생성합니다.
- 계층은 캐시되어 다시 빌드가 빠릅니다.

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

2 ) 이미지 저장하기:

- Docker Hub과 같은 레지스트리에 이미지를 저장합니다.
- 독점적인 이미지를 위해 개인 레지스트리를 사용할 수 있습니다.

3 ) 이미지 사용하기:

- 이미지는 컨테이너를 생성하는 데 사용됩니다.
- 동일한 이미지에서 여러 개의 컨테이너를 실행할 수 있습니다.

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

## 도커 이미지와 컨테이너 :

- 이미지: 실행 가능한 코드가 포함된 정적 파일.
- 컨테이너: 이미지의 실행 중인 인스턴스.

## 도커 이미지의 장점 :

- 일관성: 어디서든 동일한 환경을 제공.
- 휴대성: 도커를 사용하는 모든 시스템에서 실행 가능.
- 버전 관리: 다양한 버전을 쉽게 관리할 수 있음.
- 효율성: 공유 레이어로 공간과 대역폭을 절약.
- 격리: 응용프로그램이 격리된 환경에서 실행됨.

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

## 도커 이미지 다운로드하기

도커 이미지를 다운로드하려면 아래 명령어를 사용하세요.

```js
docker pull image_name
```

이 명령어는 Docker Hub에서 이미지의 최신 버전을 다운로드합니다.

```js
docker pull image_name:1.19
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

```js
docker pull --all-tags image_name
```

```js
docker images
```

## 도커 이미지 명령어 :

- docker pull: 레지스트리에서 이미지를 다운로드합니다.
- docker push: 이미지를 레지스트리에 업로드합니다.
- docker build: Dockerfile에서 새 이미지를 생성합니다.
- docker inspect: 이미지에 대한 상세 정보를 확인합니다.

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

## 결론

도커 이미지는 컨테이너화의 기초이며, 응용 프로그램을 패키지화하고 배포하는 일관된 효율적인 방법을 제공합니다. 도커 이미지를 이해함으로써 컨테이너 기술을 숙달하고 개발 작업 흐름을 개선하는 중요한 한걸음을 내딛게 됩니다.

#도커 #도커이미지 #컨테이너화 #초보자를위한도커
