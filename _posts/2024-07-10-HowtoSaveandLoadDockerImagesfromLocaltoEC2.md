---
title: "Docker 이미지 로컬에서 EC2로 저장하고 로드하는 방법"
description: ""
coverImage: "/assets/img/2024-07-10-HowtoSaveandLoadDockerImagesfromLocaltoEC2_0.png"
date: 2024-07-10 01:58
ogImage:
  url: /assets/img/2024-07-10-HowtoSaveandLoadDockerImagesfromLocaltoEC2_0.png
tag: Tech
originalTitle: "How to Save and Load Docker Images from Local to EC2"
link: "https://medium.com/@potterpurpp69/how-to-save-and-load-docker-images-from-local-to-ec2-6323a40e5728"
isUpdated: true
---

## 노력없는 도커 이미지 이전: 로컬에서 EC2로 이동하는 가이드

![image](/assets/img/2024-07-10-HowtoSaveandLoadDockerImagesfromLocaltoEC2_0.png)

# 소개

현대 시스템 관리 및 소프트웨어 개발의 복잡성을 고려할 때, Docker 이미지를 효과적이고 효율적으로 관리하는 방법을 이해하는 것이 중요합니다. 이 기술에 대한 심도 있는 이해를 바탕으로, 우리는 개발 및 시스템 관리를 효율적으로 준비할 수 있습니다.

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

# 도커 파일을 만들기 시작해봅시다

```bash
vi Dockerfile
```

```bash
# 부모 이미지로 공식 Node.js 런타임 사용
FROM arm64v8/node:21

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# package.json 및 package-lock.json 복사
COPY package*.json ./

# 종속성 설치
RUN npm install

# 나머지 애플리케이션 코드 복사
COPY . .

# 앱이 실행되는 포트 노출
EXPOSE 3000

# 앱을 실행하는 명령어 정의
CMD ["node", "index.js"]
```

## 빌드해봅시다

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

```bash
docker build -t node21:latest .
```

이제 path/directory/key.pem으로 이동하여 도커 이미지를 .tar 파일로 저장하는 명령어를 작성해야 합니다.

```bash
docker save -o myapp2.tar node21:latest
```

이후에 .tar 파일을 EC2로 복사하려면 다음 패턴을 따르세요:

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

```shell
scp -i /경로/your-ec2-key.pem myapp2.tar ec2-user@your-ec2-ip:/경로/destination
```

## 저는 홈 디렉토리에 파일을 유지하고 싶어요

```shell
scp -i "YouKeyPem.pem" myapp2.tar ubuntu@ec2-39-239-140-210.ap-southeast-1.compute.amazonaws.com:~
```

## 이제 인스턴스에 SSH로 접속해야 해요

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

```bash
ssh -i "YouKeyPem.pem" ubuntu@ec2-39-239-140-210.ap-southeast-1.compute.amazonaws.com
```

마지막으로 ~ 디렉토리에서 ls 명령어를 실행해 보세요.

![HowtoSaveandLoadDockerImagesfromLocaltoEC2_1](/assets/img/2024-07-10-HowtoSaveandLoadDockerImagesfromLocaltoEC2_1.png)

myapp2.tar 파일을 찾았다면, 도커 이미지를 생성하기 위해 로드해야 합니다.

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

\`\`\`docker
docker load -i ~/myapp2.tar
\`\`\`

# 마지막으로

이러한 기술을 이해하면 개발 및 배포 과정을 최적화할 뿐만 아니라 시스템 신뢰성과 버전 관리를 향상시킬 수 있습니다. Docker 이미지를 효과적으로 관리할 수 있는 능력으로, 개발자와 시스템 관리자는 개발, 테스트 및 프로덕션 환경 간 일관성을 유지하여 작업을 원할하게 진행시키고 빠른 이터레이션을 가능하게 할 수 있습니다.
