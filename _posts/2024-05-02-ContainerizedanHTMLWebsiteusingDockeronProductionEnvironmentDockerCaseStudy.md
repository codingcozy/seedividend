---
title: "프로덕션 환경에서 Docker를 사용하여 HTML 웹사이트를 컨테이너화하는 방법"
description: ""
coverImage: "/assets/img/2024-05-02-ContainerizedanHTMLWebsiteusingDockeronProductionEnvironmentDockerCaseStudy_0.png"
date: 2024-05-02 00:16
ogImage:
  url: /assets/img/2024-05-02-ContainerizedanHTMLWebsiteusingDockeronProductionEnvironmentDockerCaseStudy_0.png
tag: Tech
originalTitle: "Containerized an HTML Website using Docker on Production Environment — Docker Case Study"
link: "https://medium.com/devops-guides/containerized-an-html-website-using-docker-on-production-environment-docker-case-study-e6a25e0c67a1"
isUpdated: true
---

안녕하세요!
프로덕션 서버에 있는 애플리케이션을 Dockerize해야 하는 주요 소프트웨어 회사의 데브옵스 엔지니어로 일하고 계시군요. 회사는 커스텀 소프트웨어를 사용하기 때문에 미리 빌드된 컨테이너를 사용할 수 없습니다.

다음 링크를 사용해주세요: https://github.com/microsoft/project-html-website.git

다음 내용을 가정해주세요:

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

1. 소프트웨어가 설치된 상태로 Apache를 가정합니다.

2. Ubuntu 컨테이너를 사용하십시오.

회사는 다음을 원합니다:

1. 개발자들은 도커를 사용하지 않을 것이기 때문에, 그들로부터 코드를 받게 될 것입니다. 빌드한 사용자 정의 이미지에 코드를 넣을 수 있는 Docker 파일을 작성해주세요.

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

2. 위의 구성으로 Docker Hub에 이미지를 푸시하세요.

![이미지](/assets/img/2024-05-02-ContainerizedanHTMLWebsiteusingDockeronProductionEnvironmentDockerCaseStudy_0.png)

이 케이스 스터디를 위한 명령어를 복사할 수 있는 GitHub 저장소 링크

# 1. 우분투 머신을 사용하여 새로운 인스턴스 생성

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

단계 1: 먼저 인스턴스를 시작하겠습니다. "인스턴스 시작"을 클릭하세요.

![Step 1](/assets/img/2024-05-02-ContainerizedanHTMLWebsiteusingDockeronProductionEnvironmentDockerCaseStudy_1.png)

단계 2: "이름"을 "사례 연구"로 선택하세요.

![Step 2](/assets/img/2024-05-02-ContainerizedanHTMLWebsiteusingDockeronProductionEnvironmentDockerCaseStudy_2.png)

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

Step 3: "AMI"를 "Ubuntu"로 선택하세요.

![이미지](/assets/img/2024-05-02-ContainerizedanHTMLWebsiteusingDockeronProductionEnvironmentDockerCaseStudy_3.png)

Step 4: "인스턴스 유형"을 "t2.micro"로 유지하고 "키페어(로그인)"를 "키페어 없이 진행"으로 선택하세요.

![이미지](/assets/img/2024-05-02-ContainerizedanHTMLWebsiteusingDockeronProductionEnvironmentDockerCaseStudy_4.png)

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

스텝 5: "네트워크 설정"에서 "편집"을 클릭하세요.

<img src="/assets/img/2024-05-02-ContainerizedanHTMLWebsiteusingDockeronProductionEnvironmentDockerCaseStudy_5.png" />

스텝 6: 여기에서 다음 옵션을 선택하세요:

a. 먼저, 여기에서 "보안 그룹 생성"을 선택하세요.

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

b. 보안 그룹 이름 - 필수: 사례 연구

c. 설명: 사례 연구용 보안 그룹

보안 그룹 규칙 2에서 "소스 유형"을 "아무 곳에서나(Anywhere)"로 선택하고 "모든 트래픽(All Traffic)"을 선택하세요.

![이미지](/assets/img/2024-05-02-ContainerizedanHTMLWebsiteusingDockeronProductionEnvironmentDockerCaseStudy_6.png)

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

![이미지](/assets/img/2024-05-02-ContainerizedanHTMLWebsiteusingDockeronProductionEnvironmentDockerCaseStudy_7.png)

단계 7: "인스턴스 시작"을 클릭합니다.

![이미지](/assets/img/2024-05-02-ContainerizedanHTMLWebsiteusingDockeronProductionEnvironmentDockerCaseStudy_8.png)

단계 8: "하이퍼링크"를 클릭하여 "인스턴스"를 확인하세요.

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

![이미지](/assets/img/2024-05-02-ContainerizedanHTMLWebsiteusingDockeronProductionEnvironmentDockerCaseStudy_9.png)

단계 9: "인스턴스"를 클릭하세요. 인스턴스를 선택하고 "연결"을 클릭하세요.

![이미지](/assets/img/2024-05-02-ContainerizedanHTMLWebsiteusingDockeronProductionEnvironmentDockerCaseStudy_10.png)

단계 10: "EC2 Instance Connect"에서 "연결"을 클릭하세요.

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

<img src="/assets/img/2024-05-02-ContainerizedanHTMLWebsiteusingDockeronProductionEnvironmentDockerCaseStudy_11.png" />

11단계: "Ubuntu Machine"이 작동 준비가 되었어요.

<img src="/assets/img/2024-05-02-ContainerizedanHTMLWebsiteusingDockeronProductionEnvironmentDockerCaseStudy_12.png" />

## 2. Ubuntu Machine 업데이트 및 Docker 설치

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

스텝 1: 머신을 업데이트하려면 이 명령을 실행하세요:

```js
sudo apt update
```

![이미지](/assets/img/2024-05-02-ContainerizedanHTMLWebsiteusingDockeronProductionEnvironmentDockerCaseStudy_13.png)

스텝 2: 다음 명령을 사용하여 Docker를 설치하세요:

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
sudo apt-get install docker.io –y
```

![이미지](/assets/img/2024-05-02-ContainerizedanHTMLWebsiteusingDockeronProductionEnvironmentDockerCaseStudy_14.png)

단계 3: 다음 명령어를 사용하여 도커를 시작하고 활성화합니다:

```js
sudo systemctl enable docker
sudo systemctl start docker
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

![이미지](/assets/img/2024-05-02-ContainerizedanHTMLWebsiteusingDockeronProductionEnvironmentDockerCaseStudy_15.png)

단계 4: Docker의 상태를 확인하려면 다음 명령어를 입력하세요:

```js
sudo systemctl status docker
```

![이미지](/assets/img/2024-05-02-ContainerizedanHTMLWebsiteusingDockeronProductionEnvironmentDockerCaseStudy_16.png)

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

5단계: "sudo su -" 명령을 사용하여 "루트 사용자"로 로그인하세요. 그리고, 사용 중인 도커의 현재 버전을 확인하기 위해 "docker --version"을 입력하세요.

```js
sudo su -
docker --version
```

<img src="/assets/img/2024-05-02-ContainerizedanHTMLWebsiteusingDockeronProductionEnvironmentDockerCaseStudy_17.png" />

# 3. 새 폴더를 만들고 Github 저장소를 복제하세요.

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

1단계: "mkdir w1" 명령어를 사용하여 "w1" 디렉토리를 생성하고 디렉토리를 확인하기 위해 "ls" 명령어를 입력합니다.

```js
mkdir w1
```

<img src="/assets/img/2024-05-02-ContainerizedanHTMLWebsiteusingDockeronProductionEnvironmentDockerCaseStudy_18.png" />

2단계: 아래 명령어를 사용하여 "w1" 디렉토리로 들어갑니다.

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
cd w1
```

![이미지](/assets/img/2024-05-02-ContainerizedanHTMLWebsiteusingDockeronProductionEnvironmentDockerCaseStudy_19.png)

3단계: "project-HTML-website" 디렉토리를 "Git Hub"에서 연 다음, "Code"를 클릭하고 여기서 제공된 URL을 복사해주세요.

```js
https://github.com/microsoft/project-html-website.git
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

<img src="/assets/img/2024-05-02-ContainerizedanHTMLWebsiteusingDockeronProductionEnvironmentDockerCaseStudy_20.png" />

Step 4: "w1" 디렉토리에서 이 "html website" 저장소를 다운로드하려면 다음 명령을 입력하세요:

```js
git clone https://github.com/microsoft/project-html-website.git
```

<img src="/assets/img/2024-05-02-ContainerizedanHTMLWebsiteusingDockeronProductionEnvironmentDockerCaseStudy_21.png" />

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

스텝 5: "ls" 및 "project-html-website"가 성공적으로 다운로드되었는지 확인하세요.

```js
ls;
```

<img src="/assets/img/2024-05-02-ContainerizedanHTMLWebsiteusingDockeronProductionEnvironmentDockerCaseStudy_22.png" />

스텝 6: "cd project-html-website"를 입력하여 해당 리포지토리 내부로 이동하세요. "project-html-website" 폴더 내부로 이동하게 됩니다.

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
cd project-html-website
```

<img src="/assets/img/2024-05-02-ContainerizedanHTMLWebsiteusingDockeronProductionEnvironmentDockerCaseStudy_23.png" />

# Problem 1 Solution: 개발자들은 Docker를 사용하지 않을 것이기 때문에, 그들이 제공하는 코드를 받을 거에요. 당신이 만든 사용자 정의 이미지에 코드를 넣을 수 있는 Docker 파일을 작성해주세요.

단계 1: 먼저, 다음 명령을 사용하여 Docker 파일을 생성하세요:

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
vim Dockerfile
```

<img src="/assets/img/2024-05-02-ContainerizedanHTMLWebsiteusingDockeronProductionEnvironmentDockerCaseStudy_24.png" />

단계 2: Docker 파일 내에 이 코드를 넣으세요:

```js
FROM ubuntu
RUN apt-get update
RUN apt-get install apache2 -y
RUN apt-get install apache2-utils -y
RUN apt-get clean
ENTRYPOINT apache2ctl -D FOREGROUND
ADD index.html /var/www/html/
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

<img src="/assets/img/2024-05-02-ContainerizedanHTMLWebsiteusingDockeronProductionEnvironmentDockerCaseStudy_25.png" />

키보드에서 "ESC"를 누르고 " :wq!"을 입력하여 파일을 종료 및 저장하세요.

3단계: 이 명령을 사용하여 이미지를 생성하세요.

```js
sudo docker build –t myimg .
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

<img src="/assets/img/2024-05-02-ContainerizedanHTMLWebsiteusingDockeronProductionEnvironmentDockerCaseStudy_26.png" />

단계 4: 이제 다음 명령을 사용하여 컨테이너를 만들어보세요:

```js
docker container run –itd -p 88:80 –name test076 myimg
```

컨테이너가 활성화되었는지 확인하려면 "docker ps -a"를 실행하세요.

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
도커 ps -a
```

우리는 포트 88에서 컨테이너를 생성했습니다.

![이미지](/assets/img/2024-05-02-ContainerizedanHTMLWebsiteusingDockeronProductionEnvironmentDockerCaseStudy_27.png)

단계 5: IP 주소를 복사하여 새 브라우저 주소 창에 붙여넣으십시오. http://35.154.146.28:88/

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

<img src="/assets/img/2024-05-02-ContainerizedanHTMLWebsiteusingDockeronProductionEnvironmentDockerCaseStudy_28.png" />

당신의 웹사이트가 성공적으로 88번 포트를 통해 배포되었습니다.

# 문제 2 해결책: 위 구성을 사용하여 Docker-Hub에 이미지를 푸시하세요.

단계 1: Docker Hub로 푸시할 이미지에 태그를 지정하세요. 다음 명령어를 사용하세요:

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
sudo docker tag myimg visaltyagi12/myimg
```

![Image](/assets/img/2024-05-02-ContainerizedanHTMLWebsiteusingDockeronProductionEnvironmentDockerCaseStudy_29.png)

이미지의 이름을 visaltyagi12/myimg으로 성공적으로 만들었습니다.

단계 2: 첫 번째로 사용자 이름과 암호를 사용하여 다음 명령을 사용하여 도커에 로그인하십시오: sudo docker login. 로그인이 성공적으로 완료됩니다.

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
sudo docker login
```

![Image](/assets/img/2024-05-02-ContainerizedanHTMLWebsiteusingDockeronProductionEnvironmentDockerCaseStudy_30.png)

단계 3: 이미지를 푸시하려면 이 명령을 사용하세요:

```js
sudo docker push visaltyagi12/myimg
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

<img src="/assets/img/2024-05-02-ContainerizedanHTMLWebsiteusingDockeronProductionEnvironmentDockerCaseStudy_31.png" />

제4단계: 도커 허브 계정에 로그인하고 "저장소" 섹션으로 이동합니다. 모든 이미지가 여기에 표시됩니다.

<img src="/assets/img/2024-05-02-ContainerizedanHTMLWebsiteusingDockeronProductionEnvironmentDockerCaseStudy_32.png" />

## 더 많은 도커 과제

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

우분투에 컨테이너를 생성하고 Apache2를 설치하세요 — 도커 과제 1

새 이미지를 사용하여 컨테이너를 시작하고 여기에 Apache 2 서비스를 시작하세요 — 도커 과제 2

도커 허브에서 이미지를 가져오고 별도의 머신에 Apache2를 설치하세요 — 도커 과제 3

컨테이너 실행 후 자동으로 Apache2를 설치하는 Docker 파일을 만드세요 — 도커 과제 4

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

아파치 기본 웹 페이지를 샘플 HTML 파일 안에 포함된 컨테이너로 교체하기 — 도커 과제 5

## 테라폼 사례 연구는 여기를 확인하세요

AWS에서 테라폼을 사용하여 아키텍처 생성하기 — 테라폼 사례 연구
