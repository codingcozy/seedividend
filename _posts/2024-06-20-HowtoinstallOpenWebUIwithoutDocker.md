---
title: "올바른 Docker 없이 Open WebUI를 설치하는 방법"
description: ""
coverImage: "/assets/img/2024-06-20-HowtoinstallOpenWebUIwithoutDocker_0.png"
date: 2024-06-20 07:33
ogImage:
  url: /assets/img/2024-06-20-HowtoinstallOpenWebUIwithoutDocker_0.png
tag: Tech
originalTitle: "How to install Open WebUI without Docker"
link: "https://medium.com/@bhavikjikadara/how-to-install-open-webui-without-docker-33eedbda9b96"
isUpdated: true
---

![image](/assets/img/2024-06-20-HowtoinstallOpenWebUIwithoutDocker_0.png)

이 안내서는 도커 없이 올라마 웹 UI를 설정하는 방법을 안내합니다. 도커는 편의 및 지원을 위해 공식적으로 권장되지만, 이 매뉴얼 방법은 제약 사항이 있는 개발자나 환경에 유용할 수 있습니다. 기억하세요, 지원되지 않는 설치 문제 해결은 개별 노력이 필요할 수 있습니다.

## 프로젝트 구성 요소:

- 프론트엔드: 상호 작용하는 웹 인터페이스입니다.
- 백엔드: 뒷면에서의 통신 및 기능을 처리합니다. 두 구성 요소는 동시에 실행되어야 개발할 수 있습니다.

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

## 요구 사항:

- Node.js `= 20.10`: 프론트엔드 빌드에 사용됨.

- Python `= 3.11`: 백엔드 실행에 사용됨.

- Ollama: 모델용.

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

# 시작해보자! 설치 단계:

- Ollama 웹 UI 저장소를 복제하세요:

```js
git clone https://github.com/open-webui/open-webui.git
```

- 프로젝트 디렉토리로 이동하세요:

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
cd ollama-webui/
```

- 환경 파일을 복사합니다:

```js
cp -RPp example.env .env
```

참고: 이 파일에는 설정과 구성이 저장됩니다. 필요에 따라 업데이트하세요.

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

## 프론트엔드 빌드:

- 노드를 사용하여 프론트엔드 빌드하기

```js
npm install
```

```js
npm run build
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

## 백엔드 시작:

- 가상 환경 만들기:

```js
cd ./backend

# virtualenv 패키지 설치
pip install -U virtualenv

# backend 폴더에 가상 환경 생성
virtualenv venv

# 가상 환경 활성화
source venv/Scripts/activate
```

- 백엔드와 함께 프론트엔드 제공

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
pip install -r requirements.txt -U
```

```js
bash start.sh
```

## Ollama 웹 UI에 액세스하기:

- 웹 브라우저에서 http://localhost:8080/을 열어주세요. 인터페이스가 실행 중이어야 합니다!

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

## 팁 및 문제 해결:

에러가 발생하면 단서를 찾기 위해 콘솔 출력을 확인해보세요. 추가 구성 옵션 및 고급 기능에 대한 정보는 Ollama Web UI 설명서를 참조하세요. Docker가 아닌 설정은 공식적으로 지원되지 않으므로 문제 해결 작업에 대비해야 합니다.

Ollama Web UI를 즐기세요!

이 튜토리얼은 Docker 없이 Ollama Web UI를 시작하는 데 도움이 될 것입니다. 일반적으로 Docker를 선호하지만 이 설명서 방식은 특정 상황에 대해 유연성을 제공합니다. 약간의 노력으로 이 강력한 대화형 도구를 시작할 수 있습니다.
