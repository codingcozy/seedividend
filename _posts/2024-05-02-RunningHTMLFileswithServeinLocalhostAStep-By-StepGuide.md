---
title: "로컬호스트에서 Serve로 HTML 파일 실행하기"
description: ""
coverImage: "null"
date: 2024-05-02 00:50
ogImage:
  url: null
tag: Tech
originalTitle: "Running HTML Files with Serve in Localhost: A Step-By-Step Guide"
link: "https://medium.com/@vasist.96/running-html-files-with-serve-in-localhost-a-step-by-step-guide-e554c2da9eb0"
isUpdated: true
---

웹 개발은 화려한 웹 사이트를 만들 수 있도록 다양한 도구와 프레임워크를 제공하는 역동적인 분야입니다. HTML은 온라인에서 볼 수 있는 콘텐츠에 구조를 제공하여 모든 웹 페이지의 기본입니다. 많은 개발자들에게는 시작점이 되곤 합니다. 초보 웹 개발자들이 가장 많이 마주치는 장애물 중 하나는 HTML 파일을 로컬에서 실행하는 방법을 배우는 것입니다. 이 글은 간단하지만 효과적인 serve 패키지를 사용하여 로컬호스트에서 HTML 파일을 제공하는 프로세스를 안내합니다.

# 로컬호스트란 무엇인가요?

프로세스에 대해 자세히 살펴보기 전에, 먼저 "localhost"가 무엇인지 이해해보겠습니다. 로컬호스트는 '이 컴퓨터'라는 기본 호스트명을 의미합니다. 서버의 문맥에서 localhost는 당신의 컴퓨터가 서버로 작용한다는 것을 의미합니다. 컴퓨터에서 서버를 실행할 때, 주로 localhost 호스트명에 매핑된 IP 주소인 127.0.0.1을 통해 액세스됩니다.

# Serve란 무엇인가요?

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

Serve는 Next.js의 제작자들로부터 나온 작고 견고한 도구이며, 정적 사이트, 싱글 페이지 웹 앱 또는 정적 파일을 제공하는 데 사용할 수 있는 Node.js 패키지입니다. 배포하기 전에 로컬에서 프로덕션 빌드를 실행하는 데 훌륭하며, 클라이언트나 팀원들과 진행 상황을 공유하거나 동일한 네트워크의 다양한 기기에서 테스트하는 데도 편리합니다.

그러므로, 우리는 localhost에서 HTML 파일을 실행하는 방법에 대한 serve 사용 안내서를 단계별로 준비해 보겠습니다.

# 필수 준비물

시작하기 전에 컴퓨터에 Node.js와 npm (node package manager)이 설치되어 있어야 합니다. 아직 설치하지 않으셨다면, 공식 Node.js 웹사이트에서 다운로드할 수 있습니다.

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

# 단계 1: Serve 설치하기

터미널 창을 열고 다음 명령을 입력하여 serve를 전역적으로 설치하세요:

```js
npm install -g serve
```

이 명령은 serve 패키지를 전역적으로(-g) 설치하기 위해 npm을 사용하여 컴퓨터의 모든 디렉토리에서 사용할 수 있도록 합니다.

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

# 단계 2: 프로젝트 디렉토리로 이동하기

HTML 파일이 있는 디렉토리로 이동해주세요. 이 작업은 cd (디렉터리 변경) 명령어를 사용하여 디렉토리 경로를 입력하면 됩니다. 예를 들면:

```js
cd / 당신의 / 디렉토리 / 경로;
```

# 단계 3: Serve 명령어 실행하기

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

이제 프로젝트를 실행해보는 시간입니다. 터미널에 다음 명령어를 입력해주세요:

```js
serve;
```

이 명령어는 현재 디렉토리에서 정적 서버를 시작하며, 이제 해당 서버에 로컬로 접근할 수 있습니다.

# 단계 4: 사이트에 접속하기

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

serve 명령을 실행한 후, 다음과 유사한 출력이 나타날 것입니다:

```js
   ┌────────────────────────────────────────────┐
   │                                            │
   │   서빙 중!                                 │
   │                                            │
   │   - 로컬:            http://localhost:5000│
   │   - 네트워크에서:    http://192.168.0.5:5000│
   │                                            │
   │   로컬 주소가 클립보드에 복사되었습니다!     │
   │                                            │
   └────────────────────────────────────────────┘
```

웹 브라우저를 열고 http://localhost:5000 으로 이동하세요. HTML 파일이 웹사이트로 서빙되는 것을 확인할 수 있을 거예요!

# 단계 5: 서버 정지

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

작업을 마치면 터미널로 돌아가서 CTRL + C를 눌러 서버를 중지할 수 있어요.

# 마치는 중

여기까지입니다! 로컬호스트에서 HTML 파일을 실행하는 방법에 대한 간단하고 단계별 안내서를 살펴보았어요. Serve는 사이트를 배포하기 전에 테스트할 때 특히 개발 프로세스를 보다 효율적으로 만들어 주는 강력한 도구에요.

웹 개발에 입문한지 얼마 안 됐든, 숙련된 전문가든간에, 이 기본 사항을 숙달하여 작업 흐름을 개선하고 생산성을 향상시킬 필요가 있어요. 그러니 다음에 HTML 파일을 작업하고 로컬로 실행해야 할 때, 기억해두세요. 단지 serve가 필요할 뿐이에요.

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

계속 코딩해보고 계속 탐험해봐요!
