---
title: "Nodejs 20 버전으로 업그레이드하기 - 성능과 효율성을 끌어올리는 다음 단계를 열다"
description: ""
coverImage: "/assets/img/2024-05-15-UpgradingtoNodejsv20UnlockingtheNextLevelofPerformanceandEfficiency_0.png"
date: 2024-05-15 15:22
ogImage: 
  url: /assets/img/2024-05-15-UpgradingtoNodejsv20UnlockingtheNextLevelofPerformanceandEfficiency_0.png
tag: Tech
originalTitle: "Upgrading to Node.js v20 — Unlocking the Next Level of Performance and Efficiency"
link: "https://medium.com/naukri-engineering/upgrading-to-node-js-v20-unlocking-the-next-level-of-performance-and-efficiency-d1600df0e43d"
isUpdated: true
---




<img src="/assets/img/2024-05-15-UpgradingtoNodejsv20UnlockingtheNextLevelofPerformanceandEfficiency_0.png" />

웹 개발 분야는 끊임없이 진화하고 있는데, 최신 기술에 대한 업데이트는 경쟁력을 유지하고 응용 프로그램의 최적 성능을 보장하는 데 중요합니다. Node.js라는 중추적인 기술이 바로 그것인데요. Node.js는 확장성, 효율성 및 다양성으로 유명한 런타임 환경으로, 응용 프로그램을 구축하는 데 필수적입니다.

금일은 노드 버전을 업그레이드하는 방법과 직면한 도전을 살펴보겠습니다.

# 노드 버전 업그레이드가 중요한 이유 🤔



보안 취약점: Node.js의 오래된 버전은 알려진 보안 취약점을 가지고 있을 수 있습니다. 더 최신 릴리스에서 수정된 새로운 버전은 이러한 취약점을 해결했습니다. 오래된 버전을 사용하면 응용 프로그램이 잠재적인 악용에 노출될 수 있습니다.

지원 부족: Node.js가 진화함에 따라 오래된 버전은 점차적으로 지원이 줄어들어 응용 프로그램이 업데이트나 커뮤니티 지원 없이 버그에 노출됩니다.

장기적인 유지 관리 과제: 오래된 Node.js 버전에서 응용 프로그램을 관리하는 것은 시간이 지날수록 점점 복잡하고 비용이 많이 소요됩니다. 이는 중요한 조정을 요구하며 기능적인 간격을 가져다 줄 수 있습니다.

의존성 관리: Node.js 응용 프로그램의 의존성은 Node.js 버전과의 호환성에 의존합니다. 오래된 버전을 사용하면 최소 지원 버전이 필요한 의존성의 설치 또는 업데이트에 제한을 받을 수 있습니다.



# 업그레이드 전략📈

- 시스템에 Node.js v20을 다운로드하여 Node.js 버전을 v20으로 전환하세요
   i. node_modules 및 package-lock.json을 삭제합니다
   ii. 애플리케이션에서 npm install 명령을 실행하세요.
- 아래 다이어그램처럼 의존성이 중첩되어 있어서 개인 의존성의 종속성 트리를 루트부터 리프까지 해결하세요.

![다이어그램](/assets/img/2024-05-15-UpgradingtoNodejsv20UnlockingtheNextLevelofPerformanceandEfficiency_1.png)

3. 호환되지 않는 의존성은 설치 중에 오류를 발생시키며, 해당 의존성을 지원되는 버전으로 대체하세요.




![이미지](/assets/img/2024-05-15-UpgradingtoNodejsv20UnlockingtheNextLevelofPerformanceandEfficiency_2.png)

예: 위 스크린샷에서 node-sass가 지원되지 않아 sass로 업그레이드했습니다.

4. 모든 비공개 종속성이 Node.js v20과 호환되고 빌드할 수 있는지 확인합니다.

5. Node.js v20에서 실행되도록 비공개 종속성을 업데이트합니다.




6. 소비자 애플리케이션의 개인 종속성 버전을 업데이트하세요.

7. npm install 명령어를 실행하세요.

쉽죠!!! 그래도 우리에겐 쉽지 않았어요. 왜일까요??? ⤵️

# 업그레이드 중에 마주한 도전들 🤯



문제 1:
Node.js v20으로 전환할 때 Babel, Jest와 같은 호환되지 않는 종속성을 해결하는 문제가 있습니다.

문제 2:
npm install 프로세스 실행 중에 개인 종속성을 Git URL을 통해 소비할 때 여러 스레드의 npm install 명령이 자동으로 생성되어 문제가 발생했습니다. 따라서 개인 종속성을 아트펙토리를 통해 관리하도록 전환했고, 이를 통해 문제가 해결되었습니다.

![이미지](/assets/img/2024-05-15-UpgradingtoNodejsv20UnlockingtheNextLevelofPerformanceandEfficiency_3.png)

관련 문제가 참조 섹션에 링크되어 있습니다.



문제 3:
CI/CD 파이프라인에서 Node.js v16 이상과의 호환성 문제를 관리하면서 운영 체제를 업그레이드했습니다(예: CentOS 7).

# 위의 도전 과제에 대한 구현된 솔루션🛠️

솔루션 1:
소비자 응용 프로그램의 모든 패키지를 Node.js v20과 호환되는 버전으로 업데이트하였습니다.

솔루션 2:
i. 소비자 응용 프로그램에서 .npmrc 파일에 artifactory URL을 구성하여 모든 비공개 종속성을 artifactory를 통해 제공하고, 비공개 종속성의 package.json에 "publishConfig"를 추가하여 artifactory로 게시하였습니다.




![image 1](/assets/img/2024-05-15-UpgradingtoNodejsv20UnlockingtheNextLevelofPerformanceandEfficiency_4.png)

![image 2](/assets/img/2024-05-15-UpgradingtoNodejsv20UnlockingtheNextLevelofPerformanceandEfficiency_5.png)

ii. 올바른 Node.js 버전을 사용하도록 개발자들이 패키지를 게시할 때 .npmrc 파일 맨 위에 "engine-strict=true"를 설정하고 package.json에 필요한 Node.js 버전을 명시하세요.

```js
engine-strict=true
my-packages:registry="http://localhost:8081" 
```
  ‍‍



이미지 태그를 마크다운 형식으로 변경해주세요.

![이미지](/assets/img/2024-05-15-UpgradingtoNodejsv20UnlockingtheNextLevelofPerformanceandEfficiency_6.png)

해결책 3:
CI/CD 파이프라인을 위해 운영 체제를 업그레이드하세요. 우리는 Rocky 8을 사용했습니다.

# 아티펙터리에서 의존성을 사용하기 위한 애플리케이션 구성 변경 사항:

- 개인 의존성에서 코드가 아티펙터리에 발행될 수 있도록 보장하려면 다음을 추가해야 합니다:



```js
// 샘플 package.json
{ 
"version":"1.0.0",
"name" : "my-packages/package1",  // scope/packageName
 "publishConfig":{ 
 "registry": "http://localhost:8081"
 } 
}
```

패키지 이름은 scope와 함께 입력되어야 합니다.

2. npm publish 명령어를 실행하면, package.json의 version 키에 지정된 버전이 artifactory에 발행됩니다.

참고: 발행하기 전에 package.json의 버전을 업데이트하거나 자체 스크립트를 작성하여 이 작업을 자동화하는 것을 잊지 마세요.



3. 소비자 애플리케이션에서 개인 종속성을 위한 아티팩토리(호스트)의 URL은 .npmrc 파일에 정의할 수 있습니다(가능하다면 프로젝트 수준에서 생성하는 것이 좋습니다).
예: .npmrc 파일 예시:

```js
my-packages:registry = "http://localhost:8081" //(패키지 이름을 위한 정규식): registry = 아티팩토리 URL 
```

모든 개인 종속성이 아티팩토리의 my-packages 스코프 아래로 푸시되었다고 가정합니다.
만약 공통 스코프가 없다면, 하나를 생성하거나 각 패키지를 URL과 매핑해야 합니다.

4. npm install 명령을 실행할 때마다, namespace 및 아티팩토리 URL을 정의한 .npmrc 파일을 확인합니다. .npmrc 파일에서 namespace가 일치하면 해당 종속성은 .npmrc에 언급된 URL에서 다운로드되고, 그렇지 않으면 기본 URL인 npm 레지스트리에서 제공됩니다.



5. 소비자 애플리케이션에서 Artifactory에 발행된 버전을 사용하여 개인 패키지를 소비하세요.

다음 예시를 통해 이해해 봅시다:

- `예를 들어, package.json에 다음과 같이 개인 종속성이 정의되어 있다고 가정해 봅시다:

```js
my-internal-dependencies/some-dependency: "git+//git RepositoryUrl#v1.0.0
```



- 먼저 ‘some-dependency' 코드 베이스로 이동하여 package.json에 위와 같이 publishConfig를 정의하고 이 패키지의 모든 버전을 Node.js v20과 호환되게 만들기 위해 업그레이드하세요; 또한 package.json의 버전도 업그레이드한 다음 npm publish 명령을 실행하세요.

- 소비자 애플리케이션에서 .npmrc 파일을 다음과 같이 생성하세요.

```js
my-internal-dependencies:registry = "http://localhost:8081" //(package name을 위한 정규식): registry = 아티팩토리의 URL
```

- 그런 다음, 소비자 애플리케이션에서 새 버전으로 개인 의존성 항목을 업데이트하세요.



```js
my-internal-dependencies/some-dependency: 1.0.0
```

- npm install 명령어를 사용하여 소비자 응용 프로그램에서 실행하세요.

만세 🎉, 모든 비공개 종속성이 npm 레지스트리에서 다른 종속성과 함께 아티펙토리에서 다운로드됩니다.

# 추가 팁 💡




- 버전 관리를 자동화할 수 있습니다. 사용자 정의 스크립트를 작성하고 package.json에 다음 내용을 추가하여 애플리케이션에 추가할 수 있습니다.

```js
{ 
 "scripts":{ 
 "customCommandForPublish":"./bin/myScripts/publishScript.js" 
 } 
}
```

2. 아티팩토리에서 태그를 생성할 때는 세맨틱 버전팅을 따르는지 확인하십시오. 그렇지 않으면 npm 버전 관리 표준이 깨질 수 있고 ~/^으로 시작하는 태그가 깨질 수 있습니다.

참고: 📝



만약 npm을 배포하기 위해 자체 스크립트를 사용 중이라면, 스크립트 키에서 명령어 이름을 "publish"로 정의하지 않도록 주의하세요. 왜냐하면 npm의 기본 명령어가 "publish"이기 때문에, 이렇게 하면 기본적인 배포 명령어와 스크립트에서 정의한 사용자 지정 명령어 두 번 실행됩니다.

# 결론

요약하자면, Node.js 버전을 업그레이드하는 것은 애플리케이션의 보안, 호환성, 그리고 장기적인 지속 가능성을 유지하는 데 중요합니다. 도전에 대처하고 효과적인 해결책을 구현함으로써, 새로운 Node.js 버전으로의 전환을 효과적으로 관리할 수 있어, 애플리케이션의 지속적인 안정성과 지원을 보장할 수 있습니다.

# 참고 자료:



- [https://github.com/npm/cli/issues/4895](https://github.com/npm/cli/issues/4895)
- [https://github.com/npm/cli/issues/4028](https://github.com/npm/cli/issues/4028)
- [https://github.com/npm/cli/issues/4896](https://github.com/npm/cli/issues/4896)