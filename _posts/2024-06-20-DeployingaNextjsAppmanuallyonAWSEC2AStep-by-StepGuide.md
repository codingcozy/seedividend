---
title: "AWS EC2에 수동으로 Nextjs 앱을 배포하는 방법 단계별 안내"
description: ""
coverImage: "/assets/img/2024-06-20-DeployingaNextjsAppmanuallyonAWSEC2AStep-by-StepGuide_0.png"
date: 2024-06-20 04:31
ogImage: 
  url: /assets/img/2024-06-20-DeployingaNextjsAppmanuallyonAWSEC2AStep-by-StepGuide_0.png
tag: Tech
originalTitle: "Deploying a Next.js App manually on AWS EC2: A Step-by-Step Guide"
link: "https://medium.com/@mudasirhaji/deploying-a-next-js-app-manually-on-aws-ec2-a-step-by-step-guide-58b266ff1c52"
---


소개

웹 개발의 끊임없이 진화하는 풍경에서 Next.js와 같은 현대적인 프레임워크가 사용자 인터페이스를 구축하는 방법을 혁신했습니다. Next.js는 React 프레임워크로, 서버 렌더링 및 정적으로 생성된 React 애플리케이션을 구축하는데 원활한 경험을 제공합니다. 성능, SEO 및 사용자 경험을 향상시킬 수 있는 능력은 개발자들에게 인기 있는 선택지입니다. 이 안내서에서는 Next.js 앱을 AWS EC2 인스턴스에 배포하는 과정을 안내해 드릴 것이며, 클라우드의 강력한 기능을 활용하여 애플리케이션을 전 세계에 제공할 수 있습니다.

AWS 클라우드에서 Next.js 배포의 장점

배포 프로세스에 들어가기 전에, AWS 클라우드에서 Next.js 앱을 호스팅하는 주요 이점을 강조해 보겠습니다:

<div class="content-ad"></div>

- 확장성: AWS는 수요에 따라 EC2 인스턴스를 확장할 수 있는 유연성을 제공합니다. 이는 당신의 Next.js 앱이 성능을 희생하지 않고 트래픽 증가를 처리할 수 있음을 의미합니다.
- 신뢰성: AWS는 SLA(서비스 레벨 계약)로 높은 신뢰성의 인프라를 제공하여 사용자가 필요로 할 때 응용 프로그램이 이용 가능하고 운영 중인지를 보장합니다.
- 글로벌 네트워크: AWS에 배포하면 전 세계의 데이터 센터를 선택할 수 있어 지리적으로 다른 위치의 사용자에게 더 빠른 경험을 제공하고 지연 시간을 줄일 수 있습니다.
- 보안: AWS는 방화벽, 암호화 및 아이디어 관리를 포함한 견고한 보안 조치를 제공하여 Next.js 앱과 사용자 데이터를 잘 보호합니다.
- 비용 효율성: AWS EC2 인스턴스는 선택한 인스턴스 유형을 선택하고 필요에 따라 리소스를 확장함으로써 비용을 제어할 수 있는 요금 체계를 제공합니다.

AWS EC2에 Next.js 앱을 배포하는 단계별 안내서

이제 배포 과정에 대해 살펴봅시다. 원활한 경험을 보장하기 위해 관리 가능한 단계로 나누어 설명하겠습니다:

# 전제 조건

<div class="content-ad"></div>

- Github 계정
- AWS 계정
- Next.js 웹 애플리케이션

단계 1: AWS 계정 설정하기

- AWS Management Console에 로그인하거나 계정이 없는 경우 새로 만드세요.
- 인스턴스를 생성하고 관리하기 위해 EC2 대시보드로 이동하세요.

단계 2: EC2 인스턴스 시작하기

<div class="content-ad"></div>

아마존 관리 콘솔에 로그인한 후 EC2 대시보드를 열고 인스턴스 시작 드롭다운 목록을 클릭한 후 아래 그림과 같이 '인스턴스 시작'을 클릭하세요:

![Launch Instance](/assets/img/2024-06-20-DeployingaNextjsAppmanuallyonAWSEC2AStep-by-StepGuide_0.png)

인스턴스 시작 창이 열리면 EC2 인스턴스의 이름을 입력해주세요:

![Provide EC2 Instance Name](/assets/img/2024-06-20-DeployingaNextjsAppmanuallyonAWSEC2AStep-by-StepGuide_1.png)

<div class="content-ad"></div>

이 데모에서는 무료 티어 자격이 있는 Ubuntu 22.04 LTS를 선택할 것입니다.

![이미지](/assets/img/2024-06-20-DeployingaNextjsAppmanuallyonAWSEC2AStep-by-StepGuide_2.png)

인스턴스 유형을 선택하세요. 여기서는 머신 유형, vCPU 수 및 원하는 메모리를 선택할 수 있습니다. 무료 티어 자격이 있는 t2.micro를 선택하세요.

![이미지](/assets/img/2024-06-20-DeployingaNextjsAppmanuallyonAWSEC2AStep-by-StepGuide_3.png)

<div class="content-ad"></div>

이 데모에서는 이미 존재하는 키페어를 선택할 것입니다. 키 쌍이 없는 경우에는 새로운 키페어를 만들 수 있습니다:

![키페어 선택](/assets/img/2024-06-20-DeployingaNextjsAppmanuallyonAWSEC2AStep-by-StepGuide_4.png)

이제 네트워크 설정에서 기본 VPC를 선택하고 공인 IP 자동 할당을 활성화하세요. 본 데모에서는 기존 보안 그룹을 선택하고, Devops-SG의 인바운드 규칙 아래에 HTTP 및 HTTPS 포트가 열려 있는지 확인할 것입니다. 진행하려면 규칙을 저장하세요.

![보안 그룹 설정](/assets/img/2024-06-20-DeployingaNextjsAppmanuallyonAWSEC2AStep-by-StepGuide_5.png)

<div class="content-ad"></div>

나머지 설정은 기본값으로 유지하고 "인스턴스 시작"을 클릭해주세요.

![이미지](/assets/img/2024-06-20-DeployingaNextjsAppmanuallyonAWSEC2AStep-by-StepGuide_6.png)

다음 화면에서 EC2 인스턴스가 성공적으로 생성되었다는 성공 메시지를 볼 수 있습니다. "인스턴스에 연결" 버튼을 클릭해주세요:

![이미지](/assets/img/2024-06-20-DeployingaNextjsAppmanuallyonAWSEC2AStep-by-StepGuide_7.png)

<div class="content-ad"></div>

이제 인스턴스 연결 마법사가 열립니다. SSH 클라이언트 탭으로 이동하고 제공된 chmod 및 SSH 명령을 복사하세요:

![이미지](/assets/img/2024-06-20-DeployingaNextjsAppmanuallyonAWSEC2AStep-by-StepGuide_8.png)

로컬 머신에서 SSH 클라이언트를 열어서 EC2 인스턴스의 공용 IP를 입력하여 pem 키를 추가하면 EC2 머신에 액세스할 수 있습니다.

단계 3: EC2 인스턴스를 준비하고 다른 종속성 설치하기

<div class="content-ad"></div>

시스템 패키지를 업데이트하세요: 최신 업데이트를 적용하려면 sudo apt update를 실행하십시오.

![이미지](/assets/img/2024-06-20-DeployingaNextjsAppmanuallyonAWSEC2AStep-by-StepGuide_9.png)

Node.js와 npm을 설치하세요. 이 튜토리얼에서 사용하는 Node.js 버전은 16 LTS입니다. 아래 명령어를 실행하세요:

```js
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
```

<div class="content-ad"></div>

<img src="/assets/img/2024-06-20-DeployingaNextjsAppmanuallyonAWSEC2AStep-by-StepGuide_10.png" />

가장 최신 버전의 NPM이 설치되어 있는지 확인하세요:

```js
sudo npm install -g npm@latest
npm -v
```

<img src="/assets/img/2024-06-20-DeployingaNextjsAppmanuallyonAWSEC2AStep-by-StepGuide_11.png" />

<div class="content-ad"></div>

Step 4: GitHub에서 Nextjs 앱을 클론하세요.

이 데모에서는 GitHub에서 공개된 Nextjs 프로젝트를 사용할 것입니다. EC2 인스턴스에서 해당 저장소를 클론하세요.

```js
https://github.com/warengonzaga/sample-nextjs-app.git
```

<img src="/assets/img/2024-06-20-DeployingaNextjsAppmanuallyonAWSEC2AStep-by-StepGuide_12.png" />

<div class="content-ad"></div>

**단계 5: npm 설치**

프로젝트 디렉토리/폴더로 이동하고, Next.js 웹 애플리케이션을 실행하는 데 필요한 종속성을 설치하기 위해 아래 명령어를 실행하세요.

![이미지](/assets/img/2024-06-20-DeployingaNextjsAppmanuallyonAWSEC2AStep-by-StepGuide_13.png)

**단계 6: npm 빌드**

<div class="content-ad"></div>

프로덕션 단계에 애플리케이션을 준비하려면 자바스크립트 파일을 번들로 묶어야합니다. 이 작업은 다음 명령어를 실행하여 Next.js에서 처리됩니다:

npm run build 명령어의 출력은 참고용으로 제공됩니다.

```js
ubuntu@ip-172-31-36-85:~/sample-nextjs-app$ npm run build

> sample-next-app@0.1.0 build
> next build

info  - SWC minify release candidate enabled. https://nextjs.link/swcmin
주의: Next.js는 이제 완전히 익명의 텔레메트리 데이터를 수집합니다. 
이 정보는 Next.js의 로드맵을 구성하고 기능을 우선 순위에 따라 결정하는 데 사용됩니다. 
이 익명의 프로그램에 참여하고 싶지 않다면 해당 URL을 방문하여 옵트아웃하는 방법을 비롯한 자세한 정보를 확인할 수 있습니다.
https://nextjs.org/telemetry

info  - Linting and checking validity of types
Browserslist: caniuse-lite is outdated. Please run:
  npx browserslist@latest --update-db
  Why you should do it regularly: https://github.com/browserslist/browserslist#browsers-data-updating
Browserslist: caniuse-lite is outdated. Please run:
  npx browserslist@latest --update-db
  Why you should do it regularly: https://github.com/browserslist/browserslist#browsers-data-updating
info  - Creating an optimized production build
info  - Compiled successfully
info  - Collecting page data
info  - Generating static pages (3/3)
info  - Finalizing page optimization

Route (pages)                              Size     First Load JS
┌ ○ /                                      689 B          78.6 kB
├   └ css/ae0e3e027412e072.css             707 B
├   /_app                                  0 B            77.9 kB
├ ○ /404                                   186 B          78.1 kB
└ λ /api/hello                             0 B            77.9 kB
+ First Load JS shared by all              78.1 kB
  ├ chunks/framework-db825bd0b4ae01ef.js   45.7 kB
  ├ chunks/main-3123a443c688934f.js        30.9 kB
  ├ chunks/pages/_app-0e6b46beaaa55ac1.js  498 B
  ├ chunks/webpack-7ee66019f7f6d30f.js     755 B
  └ css/ab44ce7add5c3d11.css               247 B

λ  (서버)  서버 측에서 렌더링됩니다 (getInitialProps 또는 getServerSideProps 사용)
○  (정적)  자동으로 정적 HTML로 렌더링됩니다 (초기 프로퍼티를 사용하지 않음)
```

6단계: PM2 설치

<div class="content-ad"></div>

Next.js 프로세스를 처리하고 터미널을 닫아도 계속해서 백그라운드에서 실행되도록 하는 솔루션이 필요합니다. 이 요구사항을 충족시키기 위해 PM2가 프로세스 관리에 이상적인 도구로 사용됩니다.

- 아래 명령어를 사용하여 PM2를 설치합니다:

```js
sudo npm install pm2 -g
```

- PM2 설치를 확인하려면 다음 명령어 pm2를 실행하고, 아래 스크린샷과 유사한 응답을 받게 됩니다.

<div class="content-ad"></div>

<img src="/assets/img/2024-06-20-DeployingaNextjsAppmanuallyonAWSEC2AStep-by-StepGuide_14.png" />

7단계: Next.js를 PM2를 사용하여 백그라운드에서 실행하기

터미널을 닫은 후에도 Next.js 애플리케이션을 실행, 중지 및 재시작해야 합니다. 이를 PM2 도구를 사용하여 달성할 수 있습니다.

다음 코드를 실행하여 PM2로 Next.js를 실행하세요:

<div class="content-ad"></div>

```js
pm2 start npm --name nextjs-app -- run start -- -p 3000
```

![Screenshot](/assets/img/2024-06-20-DeployingaNextjsAppmanuallyonAWSEC2AStep-by-StepGuide_15.png)

아래 명령어를 사용하여 nextjs-app의 상태도 확인할 수 있습니다:

```js
pm2 list nextjs-app
```

<div class="content-ad"></div>


![Next.js app deployment](/assets/img/2024-06-20-DeployingaNextjsAppmanuallyonAWSEC2AStep-by-StepGuide_16.png)

Next.js 애플리케이션의 기능을 확인하려면, 웹 브라우저에 EC2 인스턴스의 공용 IP와 포트 번호 3000을 입력하세요. 예를 들어, 다음 형식을 사용하세요: 0.0.0.0:3000

![Next.js app deployment](/assets/img/2024-06-20-DeployingaNextjsAppmanuallyonAWSEC2AStep-by-StepGuide_17.png)

nextjs-app 프로세스를 중지하려면, 아래 명령어를 사용하세요:


<div class="content-ad"></div>

```js
pm2 stop nextjs-app
```

<img src="/assets/img/2024-06-20-DeployingaNextjsAppmanuallyonAWSEC2AStep-by-StepGuide_18.png" />

다음 명령을 사용하여 nextjs-app 프로세스를 시작합니다:

```js
pm2 start nextjs-app
```

<div class="content-ad"></div>

다음js-app 프로세스를 다시 시작하려면:

```js
pm2 restart nextjs-app
```

다음js-app 프로세스를 삭제하려면:

```js
pm2 delete nextjs-app
```

<div class="content-ad"></div>

# 결론

마무리하면, 이 블로그에서는 수동 단계를 이용해 AWS EC2 인스턴스에 Next.js 앱을 성공적으로 배포하는 과정을 보여주었습니다. 이러한 단계들은 애플리케이션 배포를 위한 견고한 기반을 제공하지만, 컨테이너화와 지속적 통합/지속적 배포(CI/CD) 파이프라인을 통해 더욱 효율적이고 간소화된 접근 방식을 통해 더 많은 것을 이룰 수 있다는 점을 알아두는 것이 중요합니다.

다가오는 포스트들에서는 컨테이너화의 세계에 대해 자세히 다루고, Docker와 Kubernetes 같은 도구 및 CI/CD 파이프라인을 활용하여 배포 프로세스를 자동화하고 확장 가능성을 향상시키며, Next.js 애플리케이션 관리를 더욱 최적화하는 방법을 살펴볼 것입니다. 이러한 고급 배포 전략에 대한 논의를 기대해 주세요.

만약 이 블로그 포스트가 도움이 되었고 유익하게 느껴진다면, 박수로 감사를 표현해 주시길 초대합니다! 여러분의 지원은 저에게 지속적으로 가치 있는 콘텐츠를 공유할 동기를 부여합니다. 팔로우 버튼도 꼭 눌러주시고, 계속해서 연결되어 다가오는 포스트에 대한 업데이트를 받아보세요. 함께 이 여정에 참여하고 데브옵스 세계에서 더욱 흥미로운 통찰을 탐구해봅시다. 여러분의 참여를 진심으로 사랑합니다! 👏🔗