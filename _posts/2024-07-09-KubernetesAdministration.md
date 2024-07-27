---
title: "쿠버네티스 관리 방법 2024 최신 가이드"
description: ""
coverImage: "/assets/img/2024-07-09-KubernetesAdministration_0.png"
date: 2024-07-09 11:09
ogImage: 
  url: /assets/img/2024-07-09-KubernetesAdministration_0.png
tag: Tech
originalTitle: "Kubernetes Administration"
link: "https://medium.com/@RajCloudX/kubernetes-administration-16fb84251475"
---


## 사전 준비 사항

![이미지](/assets/img/2024-07-09-KubernetesAdministration_0.png)

구글 클라우드 계정을 이메일과 비밀번호로 생성해주세요.

구글 클라우드 콘솔에 로그인해주세요.

<div class="content-ad"></div>

쿠버네티스 엔진으로 이동해서 클러스터를 확인해보세요. 클러스터란 화면을 클릭하면 아래 이미지들을 확인할 수 있어요.

![클러스터 이미지 1](/assets/img/2024-07-09-KubernetesAdministration_1.png)

![클러스터 이미지 2](/assets/img/2024-07-09-KubernetesAdministration_2.png)

<div class="content-ad"></div>

switch to standard cluster로 이동하세요.

![이미지1](/assets/img/2024-07-09-KubernetesAdministration_3.png)

![이미지2](/assets/img/2024-07-09-KubernetesAdministration_4.png)

![이미지3](/assets/img/2024-07-09-KubernetesAdministration_5.png)

<div class="content-ad"></div>

![이미지](/assets/img/2024-07-09-KubernetesAdministration_6.png)

![이미지](/assets/img/2024-07-09-KubernetesAdministration_7.png)

![이미지](/assets/img/2024-07-09-KubernetesAdministration_8.png)

이 명령을 실행한 후, Kubernetes 클러스터가 2개의 워커 노드로 설치되었음을 보여줍니다.

<div class="content-ad"></div>

# 작업 1: Namespace 및 Pod 관리

1. 네임스페이스 생성

2. yaml 파일을 사용하여 단일 Pod 생성

3. yaml 파일을 사용하여 여러 개의 Pod 생성

<div class="content-ad"></div>

# Task 2: 쿠버네티스 관리형 클러스터 서비스를 사용하여 서비스 만들기

yaml 파일을 사용하여 Pod에서 중복된 포트를 생성하는 방법을 소개해 드릴게요. 2개의 컨테이너를 포함하는 Pod를 생성하는 방법도 알려드릴게요. 그리고 네임스페이스와 Pod를 삭제하는 방법도 함께 알려드릴게요. 함께 공부해보아요! 🚀

<div class="content-ad"></div>

## 페이스북 및 트위터 네임스페이스에서 로드 밸런싱 서비스를 생성하는 YAML 파일입니다.

## 쿠버네티스 클러스터를 테스트하기 위한 로드 밸런싱 서비스를 생성합니다.

---

### 과제 3: 쿠버네티스 내에서 레플리카셋 생성

- 단일 레플리카셋 생성

<div class="content-ad"></div>

2. 다중 레플리카 세트를 만들어 보세요.

# 작업 4: 쿠버네티스에서 배포

1. 도커 허브에서 nginx의 3가지 활성 버전을 가져오세요.

2. 네임스페이스를 `facebook`으로 생성하세요.

<div class="content-ad"></div>

3. 요청한 대로 nginx:1.27.0-alpine을 배포합니다!

4. 레플리카를 12로 늘려줍니다.

5. 실시간으로 설정을 편집할 수 있어요!

6. nginx 버전을 1.27로 변경할게요.

<div class="content-ad"></div>

7. nginx 버전을 1.26.1로 변경합니다.

8. nginx 버전을 1.27.0-alpine으로 변경합니다.

# 작업 5: 쿠버네티스 데몬셋

1. 데몬셋 네임스페이스를 생성합니다.

<div class="content-ad"></div>

2. Nginx 데몬셋을 생성해 주세요.

# 작업 6: 쿠버네티스에서 초기 컨테이너

1. app1 네임스페이스 생성

2. 노드 서버 생성

<div class="content-ad"></div>

3. Redis 데이터베이스를 만드세요.

4. init 컨테이너 테스트하기

# 과제 7: 쿠버네티스에서 인그레스

1. 첫 번째 애플리케이션을 배포하세요.

<div class="content-ad"></div>

2. 두 번째 애플리케이션을 배포합니다.

3. 인그레스 컨트롤러를 설치합니다.

4. 인그레스 컨트롤러를 테스트합니다.

# 과제 6: 쿠버네티스에서 블루 그린 배포

<div class="content-ad"></div>

1. bgdeploy 네임스페이스 생성

2. 파란 애플리케이션 배포

3. 녹색 애플리케이션 배포

4. 매개변수를 기반으로 파란 애플리케이션 배포

<div class="content-ad"></div>

5. 파라미터에 따라 녹색 애플리케이션을 배포해주세요.

6. 네임스페이스 bgdeploy를 삭제해주세요.