---
title: "Harbor 시작하기 단계별 안내"
description: ""
coverImage: "/assets/img/2024-05-15-GettingStartedwithHarborAStep-by-StepGuide_0.png"
date: 2024-05-15 11:06
ogImage: 
  url: /assets/img/2024-05-15-GettingStartedwithHarborAStep-by-StepGuide_0.png
tag: Tech
originalTitle: "Getting Started with Harbor: A Step-by-Step Guide"
link: "https://medium.com/@josephsims1/getting-started-with-harbor-a-step-by-step-guide-e782558de78a"
---


Harbor는 DockerHub, ECR 또는 ACR에 의존하지 않고 컨테이너 이미지를 안전하게 저장하고 관리하는 데 도움이 되는 오픈 소스 레지스트리입니다. Docker의 오픈 소스 레지스트리 위에 보안, 식별 및 관리 기능을 추가합니다. Harbor를 사용하면 이미지에 대한 정책을 설정하고 취약점을 검사하여 역할 기반 제어를 통해 액세스를 관리할 수 있습니다. 이는 컨테이너 이미지를 안전하고 잘 관리된 상태로 유지하려는 개발자들에게 필수적인 도구입니다.

![Harbor 시작하기: 진행하기 전에](/assets/img/2024-05-15-GettingStartedwithHarborAStep-by-StepGuide_0.png)

## 전제 조건

- Chocolatey 설치하기:



- 관리자 권한으로 PowerShell 터미널을 열고 다음을 실행해주세요:

```js
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

2. Chocolatey를 통해 Rancher Desktop을 설치하려면 다음 명령을 실행하세요:



```js
choco install rancher-desktop
```

# 설정

- 프로젝트 디렉토리를 생성하고 이동하세요:

```js
mkdir LearningHarbor cd LearningHarbor
```



2. Harbor Helm 저장소를 추가하고 Harbor 차트를 가져옵니다:

```js
helm repo add harbor https://helm.goharbor.io
helm fetch harbor/harbor --untar cd harbor
```

3. values.yaml 파일을 편집합니다:

- externalUrl 설정



```js
externalURL: https://core.harbor.localhost
```

![Getting Started with Harbor: A Step-by-Step Guide](/assets/img/2024-05-15-GettingStartedwithHarborAStep-by-StepGuide_1.png)

3. 윈도우 호스트 파일 수정:

- 관리자 권한으로 텍스트 편집기에서 c:\Windows\System32\Drivers\etc\hosts 파일을 엽니다.
- 다음 줄을 추가하세요:



```js
127.0.0.1 core.harbor.localhost
```

![Harbor](/assets/img/2024-05-15-GettingStartedwithHarborAStep-by-StepGuide_2.png)

# Harbor 배포

- Harbor Helm 차트 설치:



```js
helm upgrade harbor-release . --namespace harbor-helm --create-namespace --wait --install
```

2. 배포가 완료될 때까지 기다린 후 다음으로 이동하세요:

- https://core.harbor.localhost

![Getting Started with Harbor](/assets/img/2024-05-15-GettingStartedwithHarborAStep-by-StepGuide_3.png)



3. 기본 자격 증명을 사용하여 로그인하세요:

- 사용자명: admin
- 비밀번호: Harbor12345

![이미지](/assets/img/2024-05-15-GettingStartedwithHarborAStep-by-StepGuide_4.png)

# 추가 구성



- Docker를 사용하여 Harbor 레지스트리에 로그인하세요:

```js
docker login https://core.harbor.localhost
```

동일한 자격 증명을 사용하세요:

- 사용자 이름: admin
- 비밀번호: Harbor12345



# Harbor로 이미지 푸시하기

참고: 사용할 로케이션 이미지인 aspiresample/api 및 aspiresample/web이 있습니다. 제 이미지 이름을 교체해도 괜찮습니다.

- 이미지에 태그 붙이기

```js
docker tag aspiresample/apiservice core.harbor.localhost/library/apiservice:latest
```



2. 이미지를 푸시하세요

```js
docker push core.harbor.localhost/library/apiservice:latest
```

이제 Harbor UI에서 다음을 볼 수 있습니다

![이미지](/assets/img/2024-05-15-GettingStartedwithHarborAStep-by-StepGuide_5.png)




![이미지](/assets/img/2024-05-15-GettingStartedwithHarborAStep-by-StepGuide_6.png)

# 고급 기능

Harbor에는 기능을 향상시키는 몇 가지 고급 기능이 있습니다. 저는 이에 대해 자세히 다루지 않을 것입니다:

- 외부 저장소 연결:




- Harbor에 외부 저장소를 링크하고 정기적으로 해당 저장소에서 이미지를 복제하여 Harbor 레지스트리를 항상 최신 상태로 유지할 수 있습니다.

![Step 7](/assets/img/2024-05-15-GettingStartedwithHarborAStep-by-StepGuide_7.png)

![Step 8](/assets/img/2024-05-15-GettingStartedwithHarborAStep-by-StepGuide_8.png)

2. 외부 인증:



- Harbor은 Keycloak와 같은 외부 OIDC 서버와의 통합을 지원하여 사용자 관리와 싱글 사인온 기능을 제공합니다.

![사진](/assets/img/2024-05-15-GettingStartedwithHarborAStep-by-StepGuide_9.png)

3. 할당량 설정:

- 관리자는 프로젝트 및 저장소에 할당량을 설정하여 저장 공간 소비를 관리하고 조직 전체에서 적절하게 자원을 할당할 수 있습니다.



# 마무리

해법은 컨테이너 이미지를 관리하고 보호하는 강력한 솔루션을 제공합니다. 본 안내서에 나와 있는 단계에 따라 진행하면 신속하게 Harbor를 배포하여 이미지를 안전한 관리 환경에 저장할 수 있습니다. Harbor의 고급 기능인 외부 저장소 연결, 인증을 위해 Keycloak과 같은 OIDC 서버와 통합, 스토리지 할당량 설정 등은 그 유틸리티를 더욱 향상시킵니다. 이러한 기능들은 Harbor를 보안이며 효율적인 컨테이너 이미지 레지스트리를 유지하려는 개발자와 조직에 꼭 필요한 도구로 만듭니다.