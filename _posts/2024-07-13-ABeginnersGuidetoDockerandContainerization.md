---
title: "도커와 컨테이너화 입문 가이드"
description: ""
coverImage: "/assets/img/2024-07-13-ABeginnersGuidetoDockerandContainerization_0.png"
date: 2024-07-13 01:45
ogImage:
  url: /assets/img/2024-07-13-ABeginnersGuidetoDockerandContainerization_0.png
tag: Tech
originalTitle: "A Beginner’s Guide to Docker and Containerization"
link: "https://medium.com/@vorrck/a-berginners-guide-to-docker-and-containerization-cbba4874ff2d"
isUpdated: true
---

![Docker](/assets/img/2024-07-13-ABeginnersGuidetoDockerandContainerization_0.png)

안녕하세요! 오늘은 여행 전문가입니다. 도커는 응용 프로그램을 쉽게 관리하고 배포할 수 있는 멋진 도구입니다. 하지만 모든 훌륭한 도구와 마찬가지로 처음에는 이해하기 어려울 수도 있고 겁나는 경우도 있습니다. 도커가 무엇이며 왜 멋지다고 하는지 알 수 있도록 도커와 컨테이너화의 기본을 알아보겠습니다.

도커란 무엇인가요?

도커는 "컨테이너"를 사용하여 응용 프로그램을 쉽게 생성, 배포 및 실행할 수 있도록 설계된 도구입니다. 컨테이너를 가벼운, 독립적이며 실행 가능한 패키지로 생각할 수 있습니다. 이 패키지에는 소프트웨어를 실행하는 데 필요한 모든 것이 포함되어 있습니다: 코드, 런타임, 시스템 도구 등.

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

예를 들어, Python 애플리케이션을 친구와 공유하고 싶다고 해보죠. 보통은 친구가 제대로된 버전의 Python을 설치하고 앱이 올바르게 실행되기 위해 필요한 모든 라이브러리와 종속성을 갖고 있는지 확인해야 합니다. 이 작업은 지루하고 개발 분야에 익숙하지 않은 친구에게는 어려울 수도 있어요.

하지만 Docker를 사용하면 애플리케이션 전체를 컨테이너로 패키징할 수 있습니다. 이 컨테이너에는 Python 코드, Python 런타임 및 프로그램을 실행하는 데 필요한 모든 구성 요소가 포함되어 있어요! 친구는 Dockerfile을 다운로드하고 빌드하기만 하면 쉽죠! 그러면 애플리케이션을 완벽하게 실행할 수 있어요.

컨테이너 vs. 가상 머신

컨테이너 이전에는 개발자들이 소프트웨어를 격리된 환경에서 실행하기 위해 가상 머신(VM)을 사용했어요. VM은 좋긴 하지만 많은 부담을 안겨줬죠. 각 VM마다 자체 운영 체제가 있어서 많은 리소스를 차지해요. 반면에 컨테이너는 가벼운 VM처럼 동작해요. 호스트 시스템의 커널을 공유하지만 모든 다른 요소는 격리된 환경에서 실행돼요.

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

도커를 사용하는 이유

아직 납득되지 않는다면, 제가 이전에 언급한 내용을 요약하면서 몇 가지 지점을 낱낱이 설명해드리겠습니다.

- 일관성: 도커는 응용 프로그램이 배포된 위치에 관계없이 항상 동일하게 실행되도록 보장합니다.
- 효율성: 컨테이너는 가벼우며 적은 리소스를 사용합니다.
- 이식성: 도커 컨테이너는 도커를 지원하는 모든 시스템에서 실행할 수 있습니다.

도커(Docker)로 시작하기

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

Docker에 대한 장점에 대해 설득했으니, 실제로 어떻게 작동하는지 알아볼까요?

먼저 Docker를 설치해야 합니다. Docker 웹사이트에서 설치 가이드를 찾을 수 있어요.

설치가 완료되면 다음 명령어를 실행하여 Docker가 제대로 작동하는지 확인할 수 있어요:

```js
docker --version
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

만약 이 명령어가 도커의 버전을 반환한다면, 도커가 올바르게 설치된 것입니다.

이제 첫 번째 컨테이너를 실행하고 무엇을 하는지 확인해볼 수 있을 것입니다. 이를 위해 다음 명령어를 작성하여 Hello World의 공식 도커 이미지를 실행해보세요:

```js
docker run hello-world
```

이 명령은 도커에게 "hello-world" 이미지를 사용하여 컨테이너를 실행하도록 지시합니다. 이미지가 이미 컴퓨터에 없다면 도커는 Docker Hub라는 Docker 이미지 저장소에서 해당 이미지를 다운로드합니다.

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

이미지(Image)가 뭔가요?

네, 맞아요. Docker 컨테이너에 대해 얘기는 했지만 이미지에 대해서는 언급하지 않았죠. 하지만 두 가지는 서로 긴밀히 연결되어 있어요.

Docker 이미지는 Docker의 컨테이너화 기술의 중심요소입니다. 이미지를 컨테이너를 만들기 위한 설계도로 볼 수 있어요. 이것은 Docker 컨테이너를 생성하는 데 필요한 명령을 포함하는 읽기 전용 템플릿입니다. 이미지는 소프트웨어를 실행하는 데 필요한 모든 것을 포함하고 있어요: 코드, 런타임, 시스템 도구, 라이브러리, 그리고 설정까지 말이죠. Docker 컨테이너를 실행할 때 해당 이미지에서 생성됩니다. 기본적으로 Docker 이미지는 응용 프로그램이 실행 위치에 관계없이 항상 동일하게 작동하도록 보장하여 배포를 일정하고 신뢰할 수 있게 합니다.

예를 들어, 공식 PHP 8.2 이미지를 사용한다면, 컨테이너 내부에서 해당 이미지를 수정하지 않는 한 응용 프로그램은 항상 PHP의 정확히 같은 버전 및 종속성으로 실행될 거에요. 이로 인해 응용 프로그램을 다양한 환경에서 깔끔하고 일관되게 유지하는 것이 더 쉬워집니다.

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

그럼, 다음은 무엇인가요?

더 나아가려면, 도커 허브에서 찾을 수 있는 이미지를 기반으로 자신의 컨테이너를 만들기 위해 직접 도커파일을 작성할 수 있습니다.

도커파일이 무엇인지 간단한 예제를 보여드리겠지만, 자세히 설명하지는 않겠습니다. 더 심층적으로 알아보기 위해 자신의 연구를 진행하시는 것이 가장 효과적인 방법이에요.

이제, 공식 Python 3.8 이미지를 기반으로 하는 컨테이너를 표현한 Dockerfile을 보여드릴게요:

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

# 공식 파이썬 런타임을 부모 이미지로 사용합니다.

FROM python:3.8-slim

# 작업 디렉토리를 /app으로 설정합니다.

WORKDIR /app

# 현재 디렉토리의 내용을 컨테이너의 /app으로 복사합니다.

COPY . /app

# 컨테이너가 실행될 때 app.py를 실행합니다.

CMD ["python", "app.py"]

결론

도커와 컨테이너화는 처음에는 복잡해 보일 수 있지만, 한번 이해하고 그 작동 방식을 파악하면 그 동안 어떻게 그것들 없이 해결했는지 궁금해 할 것입니다. 이들은 응용 프로그램이 여러 환경에서 원활하고 일관되게 실행되도록 하는 강력한 방법을 제공합니다.

그러니 망설이지 말고 해보고, 응용 프로그램을 컨테이너화하는 것을 시작하세요! 🚀
