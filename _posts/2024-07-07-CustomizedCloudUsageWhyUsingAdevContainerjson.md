---
title: "맞춤형 클라우드 사용  devContainerjson 사용해야 하는 이유"
description: ""
coverImage: "/assets/img/2024-07-07-CustomizedCloudUsageWhyUsingAdevContainerjson_0.png"
date: 2024-07-07 03:16
ogImage:
  url: /assets/img/2024-07-07-CustomizedCloudUsageWhyUsingAdevContainerjson_0.png
tag: Tech
originalTitle: "Customized Cloud Usage — Why Using A devContainer.json ?"
link: "https://medium.com/@zack4dev/customized-cloud-usage-why-using-a-devcontainer-json-f48507f32b6c"
isUpdated: true
---

요즘에는 클라우드 이미지를 자주 사용합니다. 그래서 왜 사용자 정의해야 할까요?

**혜택**
CodeSpace나 유사한 환경에서 devContainer.json 파일을 사용하는 것은 여러 이유로 유익합니다. 컨테이너, 팟, 도커 이미지 등이 흔히 사용되는 기술이지만 여기에서 커스터마이징하는 이점을 알려드리겠습니다:

1. 개발 환경 일관성:

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

팀원 모두가 동일한 환경에서 작업하도록 보장합니다.
"내 컴퓨터에서 작동한다"라는 문제를 피하기 위해 개발 환경을 표준화합니다.

3-미리 구성된 도구 및 의존성:

-컨테이네에 필요한 모든 도구, 라이브러리 및 의존성이 포함됩니다. -새로운 팀원이나 새로운 기기를 위한 환경 설정 시간을 절약할 수 있습니다.

4-개발 환경의 격리:

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

- 호스트 머신과 개발 환경을 분리하여 보호합니다.
- 서로 다른 프로젝트나 도구 버전 간의 충돌을 방지합니다.

4- 재현성:

- 동일한 환경이 어디에서든 재현될 수 있도록 보장합니다.
- 개발 환경과 동일한 환경에서 빌드 및 테스트가 실행됨으로써 CI/CD 프로세스를 용이하게 만듭니다.

5- 휴대성:

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

- 개발자들이 다른 기기나 환경으로 신속하게 전환할 수 있도록 합니다.
- Github Codespaces와 같은 원격 개발 환경 구성을 용이하게 합니다.

6-특정 요구에 맞는 사용자 정의:

- 프로젝트의 특정 요구에 맞게 환경을 변경할 수 있습니다.
- IDE 설정, 확장 프로그램 및 구성을 사용자 정의할 수 있습니다.

`! ---- devContainer.json 구성 요소 키 ----`

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

1. 기본 이미지:

- 베이스 환경으로 사용할 도커 이미지를 정의합니다.

“image”: “mcr.microsoft.com/vscode/devcontainers/base:0-alpine-3.12”

2. 확장 기능:

- 컨테이너에 설치할 VS Code 확장 기능을 지정합니다.

“extensions”: [
“ms-python.python”,
“dbaeumer.vscode-eslint”
]

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

3- 설정:

- 개발 환경을 위한 설정을 구성합니다.

```json
"settings": {
  "terminal.integrated.shell.linux": "/bin/bash"
}
```

4- 생성 후 명령어:

- 컨테이너가 생성된 후 스크립트 또는 명령어를 실행합니다.

```json
"postCreateCommand": "npm install"
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

5- 마운트 및 볼륨:

- 컨테이너의 파일 마운트 및 볼륨을 지정합니다.

```json
"mounts": [
    "source=/호스트/경로,target=/컨테이너/경로,type=bind"
]
```

`! --- devContainer.json 예시 ---`

```json
{
  "name": "Node.js & TypeScript",
  "image": "mcr.microsoft.com/vscode/devcontainers/typescript-node:0-12",
  "settings": {
    "terminal.integrated.shell.linux": "/bin/bash"
  },
  "extensions": ["dbaeumer.vscode-eslint", "esbenp.prettier-vscode"],
  "postCreateCommand": "npm install",
  "mounts": ["source=/호스트/경로,target=/컨테이너/경로,type=bind"]
}
```

devcontainer.json을 사용하여 개발 환경을 사용자 정의하는 것은 일관성, 재현성 및 설정의 용이함을 제공합니다. 이를 통해 모든 개발자가 통일된 잘 구성된 환경을 보유할 수 있도록 도와줍니다.
