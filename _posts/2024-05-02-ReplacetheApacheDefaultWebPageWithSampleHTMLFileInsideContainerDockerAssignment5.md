---
title: "도커 컨테이너 내부에 샘플 HTML 파일로 Apache 기본 웹 페이지 교체하기"
description: ""
coverImage: "/assets/img/2024-05-02-ReplacetheApacheDefaultWebPageWithSampleHTMLFileInsideContainerDockerAssignment5_0.png"
date: 2024-05-02 00:54
ogImage: 
  url: /assets/img/2024-05-02-ReplacetheApacheDefaultWebPageWithSampleHTMLFileInsideContainerDockerAssignment5_0.png
tag: Tech
originalTitle: "Replace the Apache Default Web Page With Sample HTML File Inside Container — Docker Assignment 5"
link: "https://medium.com/devops-guides/replace-the-apache-default-web-page-with-sample-html-file-inside-container-docker-assignment-5-9a835b8fb20c"
---


당신은 다음을 해야 합니다:

- 샘플 HTML 파일을 만듭니다.
- 이전 작업에서 사용한 Dockerfile을 사용합니다.
- 도커 컨테이너 내의 기본 페이지를 이 샘플 HTML 파일로 교체합니다.

<div class="content-ad"></div>

Ubuntu 컨테이너를 생성하고 Apache2를 설치하세요 - 도커 과제 1

새 이미지를 사용하여 컨테이너를 시작하고 여기에서 Apache 2 서비스를 시작하세요 - 도커 과제 2

Docker 허브에서 이미지를 가져와 다른 머신에 Apache2를 설치하세요 - 도커 과제 3

컨테이너를 실행한 후 자동으로 Apache2를 설치하는 Docker 파일을 생성하세요 - 도커 과제 4

<div class="content-ad"></div>

![이미지](/assets/img/2024-05-02-ReplacetheApacheDefaultWebPageWithSampleHTMLFileInsideContainerDockerAssignment5_0.png)

## Git Hub Repository 링크를 확인하여 명령어를 복사하세요:

# A. 샘플 HTML 파일 생성

먼저, 이 과제를 수행하기 위한 EC2 인스턴스를 생성할 것입니다. EC2 인스턴스를 생성한 후 "index.html" 파일을 만들 것입니다.

<div class="content-ad"></div>

단계 1: "서비스" 섹션으로 이동한 후 "EC2" 위에 커서를 올려주세요. "인스턴스"를 클릭하세요.

![이미지](/assets/img/2024-05-02-ReplacetheApacheDefaultWebPageWithSampleHTMLFileInsideContainerDockerAssignment5_1.png)

단계 2: "인스턴스 시작"을 클릭하세요.

![이미지](/assets/img/2024-05-02-ReplacetheApacheDefaultWebPageWithSampleHTMLFileInsideContainerDockerAssignment5_2.png)

<div class="content-ad"></div>

### 단계 3: "이름 및 태그" 섹션에서 "이름"을 "Assignment 5"로 선택합니다.

![Assignment 5 step 3](/assets/img/2024-05-02-ReplacetheApacheDefaultWebPageWithSampleHTMLFileInsideContainerDockerAssignment5_3.png)

### 단계 4: "AMI"를 "Ubuntu"로 선택합니다.

![Assignment 5 step 4](/assets/img/2024-05-02-ReplacetheApacheDefaultWebPageWithSampleHTMLFileInsideContainerDockerAssignment5_4.png)

<div class="content-ad"></div>

Step 5: "인스턴스 유형"을 "t2.micro"로 선택하고 키 페어(로그인)를 "Docker"로 설정하세요.

![이미지](/assets/img/2024-05-02-ReplacetheApacheDefaultWebPageWithSampleHTMLFileInsideContainerDockerAssignment5_5.png)

Step 6: "공통 보안 그룹"을 "launch-wizard-9"로 선택하세요.

![이미지](/assets/img/2024-05-02-ReplacetheApacheDefaultWebPageWithSampleHTMLFileInsideContainerDockerAssignment5_6.png)

<div class="content-ad"></div>

**7단계**: "인스턴스 시작"을 클릭합니다.

![Step 7](/assets/img/2024-05-02-ReplacetheApacheDefaultWebPageWithSampleHTMLFileInsideContainerDockerAssignment5_7.png)

**8단계**: "(하이퍼링크(i-041c3e5b59ce92d00)"를 클릭합니다.

![Step 8](/assets/img/2024-05-02-ReplacetheApacheDefaultWebPageWithSampleHTMLFileInsideContainerDockerAssignment5_8.png)

<div class="content-ad"></div>

**단계 9:** 인스턴스가 "실행 중" 상태가 될 것입니다. 인스턴스를 선택하고 "연결"을 클릭하세요.

![이미지](/assets/img/2024-05-02-ReplacetheApacheDefaultWebPageWithSampleHTMLFileInsideContainerDockerAssignment5_9.png)

**단계 10:** 다시 "연결"을 클릭하세요.

![이미지](/assets/img/2024-05-02-ReplacetheApacheDefaultWebPageWithSampleHTMLFileInsideContainerDockerAssignment5_10.png)

<div class="content-ad"></div>

11단계: 이 명령을 사용하여 머신을 업데이트하세요:

```js
sudo apt-get update
```

![링크](/assets/img/2024-05-02-ReplacetheApacheDefaultWebPageWithSampleHTMLFileInsideContainerDockerAssignment5_11.png)

12단계: 이 명령을 사용하여 도커를 설치하세요:

<div class="content-ad"></div>

```js
sudo apt-get install docker.io -y
```

![이미지](/assets/img/2024-05-02-ReplacetheApacheDefaultWebPageWithSampleHTMLFileInsideContainerDockerAssignment5_12.png)

단계 13: 다음 명령어를 사용하여 "Docker"에 액세스하기 위해 루트 사용자로 로그인하세요:

```js
sudo su -
```

<div class="content-ad"></div>

Step 14: 다음 명령어를 사용하여 "Docker" 상태를 확인해보세요:

```js
systemctl status docker
```

<div class="content-ad"></div>

도커는 "Active" 상태입니다.

단계 15: 이제, 다음 명령을 사용하여 index.html 파일을 만들겠습니다:

```js
sudo nano index.html
```

![이미지](/assets/img/2024-05-02-ReplacetheApacheDefaultWebPageWithSampleHTMLFileInsideContainerDockerAssignment5_15.png)

<div class="content-ad"></div>

단계 2: index.html 파일에 더미 콘텐츠를 붙여넣기하세요.

```js
<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>
<h1>This is a Heading</h1>
<p>This is a paragraph.</p>
</body>
</html>
```

<img src="/assets/img/2024-05-02-ReplacetheApacheDefaultWebPageWithSampleHTMLFileInsideContainerDockerAssignment5_16.png" />

파일을 저장하려면 CTRL+X를 누르고 Y를 누르세요. "Enter"를 누르면 파일이 저장됩니다.

<div class="content-ad"></div>

# B. 이전 작업에서 Dockerfile을 사용합니다

단계 1: 이제, index.html 파일을 /var/www/html 위치에 추가할 것입니다. 다음 명령을 실행하세요:

```js
vim Dockerfile
``` 

![이미지](/assets/img/2024-05-02-ReplacetheApacheDefaultWebPageWithSampleHTMLFileInsideContainerDockerAssignment5_17.png)

<div class="content-ad"></div>

```js
FROM ubuntu
RUN apt-get update
RUN apt-get install apache2 -y
RUN apt-get install apache2-utils -y
RUN apt-get clean
ENTRYPOINT apache2ctl -D FOREGROUND
```

# C. 도커 컨테이너 내부에 있는 이 샘플 HTML 파일을 기본 페이지로 대체하기

단계 1: 다음 명령을 Dockerfile에 추가하세요:

```js
ADD index.html /var/www/html/
```

<div class="content-ad"></div>

```js
도커 파일의 table 태그를 Markdown 형식으로 변경하십시오.
```

<div class="content-ad"></div>

이 명령어를 사용해보세요:

```js
docker build –t assignment5 .
```

![이미지](/assets/img/2024-05-02-ReplacetheApacheDefaultWebPageWithSampleHTMLFileInsideContainerDockerAssignment5_19.png)

3단계: Docker 이미지가 "assignment5"로 성공적으로 생성됩니다.

<div class="content-ad"></div>

<img src="/assets/img/2024-05-02-ReplacetheApacheDefaultWebPageWithSampleHTMLFileInsideContainerDockerAssignment5_20.png" />

4단계: 이제 다음 명령을 사용하여 생성된 이미지를 사용하여 새 컨테이너를 만듭니다:

```js
docker container run –itd --name testcont1 –p 89:80 assignment5
```

<img src="/assets/img/2024-05-02-ReplacetheApacheDefaultWebPageWithSampleHTMLFileInsideContainerDockerAssignment5_21.png" />

<div class="content-ad"></div>

5단계: 컨테이너가 생성되었는지 확인하려면 다음 명령을 실행하세요:

```js
docker container ls -a
```

<img src="/assets/img/2024-05-02-ReplacetheApacheDefaultWebPageWithSampleHTMLFileInsideContainerDockerAssignment5_22.png" />

6단계: 다음 명령을 사용하여 컨테이너 내부로 이동하세요:

<div class="content-ad"></div>

```js
도커 컨테이너 실행 -it testcont1 bash
```

![이미지](/assets/img/2024-05-02-ReplacetheApacheDefaultWebPageWithSampleHTMLFileInsideContainerDockerAssignment5_23.png)

7단계: 다음 명령어를 실행하세요:

cd /var/www/html/ — html 폴더 안으로 이동합니다.

<div class="content-ad"></div>

"HTML 디렉토리"에 있는 파일을 확인하려면 "ls"를 입력하세요.

```js
cd /var/www/html
ls
```

<img src="/assets/img/2024-05-02-ReplacetheApacheDefaultWebPageWithSampleHTMLFileInsideContainerDockerAssignment5_24.png" />

"index.html" 파일이 "html" 디렉토리에 있는 것을 확인할 수 있을 거예요.

<div class="content-ad"></div>

8단계: 다음 명령을 실행하십시오. "cat index.html" 파일을 실행합니다. index 파일의 내용을 쉽게 확인할 수 있습니다.

```js
cat index.html
```

<img src="/assets/img/2024-05-02-ReplacetheApacheDefaultWebPageWithSampleHTMLFileInsideContainerDockerAssignment5_25.png" />

9단계: 이제 "인스턴스"로 이동하고 "Public IPV4 주소" 섹션에서 "열린 주소"를 클릭하십시오.

<div class="content-ad"></div>

![이미지](/assets/img/2024-05-02-ReplacetheApacheDefaultWebPageWithSampleHTMLFileInsideContainerDockerAssignment5_26.png)

10단계: 13.233.195.209 IP 주소 뒤에 :89를 입력하세요. "index.html" 파일 내용이 열릴 것입니다.

![이미지](/assets/img/2024-05-02-ReplacetheApacheDefaultWebPageWithSampleHTMLFileInsideContainerDockerAssignment5_27.png)

또한 이 도커 가이드를 읽어보세요:

<div class="content-ad"></div>

프로덕션 환경에서 Docker를 사용하여 HTML 웹사이트를 컨테이너화했습니다 — Docker 사례 연구