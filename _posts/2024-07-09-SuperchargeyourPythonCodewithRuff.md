---
title: "Ruff로 파이썬 코드를 강화하는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-SuperchargeyourPythonCodewithRuff_0.png"
date: 2024-07-09 20:56
ogImage:
  url: /assets/img/2024-07-09-SuperchargeyourPythonCodewithRuff_0.png
tag: Tech
originalTitle: "Supercharge your Python Code with Ruff"
link: "https://medium.com/bitgrit-data-science-publication/supercharge-your-python-code-with-ruff-4c75b890ed40"
---

## PYTHON

![Python Image](/TIL/assets/img/2024-07-09-SuperchargeyourPythonCodewithRuff_0.png)

아직 프로젝트에서 Black, isort, 그리고 Flake8을 사용하고 계신가요? 업그레이드할 때입니다.

새로운 도구가 나왔습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 러프

러프는 찰리 마시의 열정 프로젝트로 시작되었습니다.

그는 더 빠른 Python 린터를 만들기로 결심했습니다.

가장 큰 Python 프로젝트 중 일부가 그것을 사용하기 시작하자, Python 생태계를 더 생산적으로 만들기 위해 고성능 개발자 도구를 구축하여 소프트웨어를 더 빨리 출시할 수 있도록 하는 기회를 보았습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

Ruff는 러스트로 작성된 매우 빠른 Python 린터 및 코드 포매터입니다.

그 얼마나 빠른지 궁금하신가요? 이 이미지가 모두를 알려줍니다.

![Supercharge your Python Code with Ruff](/TIL/assets/img/2024-07-09-SuperchargeyourPythonCodewithRuff_1.png)

Ruff는 Flake8(그리고 수십 개의 플러그인), Black, isort, pydocstyle, pyupgrade, autoflake 등을 대체할 수 있으며, 10~100배의 속도 향상을 자랑합니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

VS Code 및 다양한 다른 통합을 위한 일등 서비스 편집기 통합을 제공합니다.

Ruff는 Airflow, Hugging Face, Pandas와 같은 주요 오픈 소스 프로젝트에서 활발히 사용됩니다.

## 사용자들이 말하는 것

FastAPI 창시자 Sebastián Ramírez:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

닉 쉬록은 Elementl의 창립자이자 GraphQL의 공동 창시자입니다.

# 빠른 속도의 비결

럼프의 놀라운 속도는 주로 러스트 기반의 아키텍처 덕분에 가능합니다. 러스트는 성능과 안정성으로 유명하여, 럼프가 다른 도구들보다 빠른 린팅 및 포매팅 서비스를 제공할 수 있게 해줬습니다.

이 효율성은 러스트의 성능 능력을 통해 이루어지며, 변경되지 않은 파일의 재분석을 방지하는 내장 캐싱 시스템과 개발 과정 전반에 걸쳐 성능 최적화에 초점을 맞춘 덕분입니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

대규모 코드베이스에서도 하위 초 반응 루프를 제공하도록 설계된 Ruff는 린팅 및 형식 지정 작업을 기다리는 시간을 줄여 개발자들의 삶의 질을 크게 향상시킵니다.

궁금하시다면, 웹사이트에서 Ruff가 코드를 파싱하는 방식을 탐색할 수 있는 플레이그라운드가 준비되어 있습니다.

![Ruff Playground](/TIL/assets/img/2024-07-09-SuperchargeyourPythonCodewithRuff_2.png)

해당 페이지에는 AST, 토큰, 형식 지정 IR(중간 표현), 그리고 형식 지정 주석을 보여줍니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

하지만 더 이상 말이 필요 없어요. 직접 해보는 것이 최선이죠!

# 테스트 드라이브

## 설치

Ruff는 PyPI에서 ruff로 사용할 수 있습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
pip install ruff
```

마니매 진행 및 확인하기 Manim, the animation engine 3blue1brown이 수학 비디오에서 사용하는 엔진입니다.

<img src="/TIL/assets/img/2024-07-09-SuperchargeyourPythonCodewithRuff_3.png" />

## 코드 분석

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

코드에 린터를 실행하려면, 다음과 같이 사용합니다.

```js
ruff check .
```

하나의 파일에 대해 실행하려면, 다음과 같이 하세요.

```js
ruff check <filename.py>
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

총 415개의 오류가 있었어요. 이 중 33개는 수정할 수 있어요!

![이미지](/TIL/assets/img/2024-07-09-SuperchargeyourPythonCodewithRuff_4.png)

해결하기 위해선 다음과 같이 --fix 플래그를 사용해요

```js
ruff check --fix .
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

<img src="/TIL/assets/img/2024-07-09-SuperchargeyourPythonCodewithRuff_5.png" />

알 수 있듯이, 33개가 수정되었고, 383개가 남아 있습니다.

## 포맷팅

포맷팅을 위해 ruff 형식을 사용합니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
format을 변경하십시오.
```

<img src="/TIL/assets/img/2024-07-09-SuperchargeyourPythonCodewithRuff_6.png" />

아마도 당신은 이렇게 Ruff를 사용하지 않을 것이며, 에디터를 사용하고 있기 때문에, 이제 설정하는 방법을 살펴봅시다!

# VS Code에서 사용하기

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

VSCode 확장 프로그램을 설치해보세요.

이제 "모든 자동 수정 가능한 문제 해결"만으로 쉽게 해결할 수 있어요!

![이미지](https://miro.medium.com/v2/resize:fit:1400/0*kF8S-U62dWreNT6M.gif)

게다가 더 좋은 점은 저장할 때도 이 작업을 할 수 있다는 거예요.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 저장 시 형식 지정

만약 Ruff가 lint 위반을 자동으로 수정하고, import를 정리하며 저장할 때 형식을 지정하길 원한다면, 설정 파일인 settings.json으로 이동하세요.

다음을 추가하세요.

```js
"[python]": {
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit",
    "source.organizeImports": "explicit"
  },
  "editor.defaultFormatter": "charliermarsh.ruff"
}
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

테이블 태그를 마크다운 형식으로 변경하실 수 있습니다.

Ruff가 유형 또는 저장 시 실행되기를 원하는지에 따라 다릅니다. 기본적으로 유형에 실행되지만, 저는 저장 시에 실행되기를 선호합니다.

```js
"ruff.lint.run": "onSave",
```

## 주피터 노트북

이 확장 프로그램으로 노트북에서 서식 지정, 린팅, 그리고 가져오기 정리를 위한 명령어를 사용할 수 있습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

오른쪽 코드 조작으로 변경하세요.

![사진](https://miro.medium.com/v2/resize:fit:1400/0*0qBmSIfB0VVP2au_.gif)

저장 시에도 이를 사용하려면 아래 코드를 추가하세요.

```js
"notebook.formatOnSave.enabled": true,
"notebook.codeActionsOnSave": {
  "source.fixAll.ruff": true,
  "source.organizeImports.ruff": true
}
```

# pre-commit 사용하기

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

프리 커밋을 사용하려면 Ruff의 프리 커밋 후크를 추가하는 방법입니다.

```js
- repo: https://github.com/astral-sh/ruff-pre-commit
  # Ruff 버전.
  rev: v0.2.2
  hooks:
    # 린터 실행.
    - id: ruff
      types_or: [ python, pyi, jupyter ]
      args: [ --fix ]
    # 포매터 실행.
    - id: ruff-format
      types_or: [ python, pyi, jupyter ]
```

# CLI로 Jupyter 노트북 사용

만약 노트북을 위해 CLI를 사용 중이라면, pyproject.toml이나 ruff.toml 중 하나에 이 줄을 추가해야 합니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
extend-include = ["*.ipynb"]
```

# 더 많은 통합 기능

많은 다른 통합 기능들을 지원합니다. Vim도 포함돼요!

<img src="/TIL/assets/img/2024-07-09-SuperchargeyourPythonCodewithRuff_7.png" />

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

# Ruff에 대해 더 알아보기

여기까지입니다! Ruff에 관한 더 많은 콘텐츠를 원한다면 아래 링크를 확인해보세요 👇

- Matt Layman이 Python 프로젝트를 Ruff로 전환하는 라이브 스트림 시청하기
- Flake8 및 PyLint를 작별하고 Ruff로 더 빠른 린팅하기
- Ruff: 빠른 Python 린터 [LWN.net]
- Ruff로 업그레이드할 때입니다 — Eric J. Ma의 개인 사이트
- 코드 품질을 향상시키는 가장 빠른 방법: Ruff 린터 사용하기

# 읽어 주셔서 감사합니다

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

bitgrit 데이터 과학 게시물을 구독하고 최신 소식을 받아보세요!

다른 데이터 과학자들과 최신 데이터 과학 및 인공지능 개발에 대해 함께 이야기하고 싶나요? 저희 디스코드 서버에 가입해보세요!

워크숍 및 다가오는 대회 소식을 받아보려면 Bitgrit를 팔로우해주세요!

Discord | 웹사이트 | 트위터 | 링크드인 | 인스타그램 | 페이스북 | 유튜브
