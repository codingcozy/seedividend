---
title: "쿠버네티스 배포와 ArgoCD NGINX를 사용한 실전 예제"
description: ""
coverImage: "/assets/img/2024-05-15-KubernetesDeploymentswithArgoCDAHands-OnExampleUsingNGINX_0.png"
date: 2024-05-15 15:51
ogImage: 
  url: /assets/img/2024-05-15-KubernetesDeploymentswithArgoCDAHands-OnExampleUsingNGINX_0.png
tag: Tech
originalTitle: "Kubernetes Deployments with ArgoCD: A Hands-On Example Using NGINX"
link: "https://medium.com/@mohosinmiah1610/kubernetes-deployments-with-argocd-a-hands-on-example-using-nginx-158512344bde"
isUpdated: true
---




<img src="/assets/img/2024-05-15-KubernetesDeploymentswithArgoCDAHands-OnExampleUsingNGINX_0.png" />

쿠버네티스 배포는 복잡할 수 있지만, ArgoCD와 같은 도구를 사용하면 프로세스가 훨씬 순조롭게 진행됩니다. 이 안내서에서는 ArgoCD를 사용하여 쿠버네티스에 NGINX 웹 서버를 배포하는 방법을 실용적인 코딩 예제와 함께 안내해 드리겠습니다.

- ArgoCD 설정하기:
제공된 YAML 매니페스트를 사용하여 쿠버네티스 클러스터에 ArgoCD를 설치합니다. 이는 ArgoCD가 애플리케이션을 원활하게 관리할 수 있도록 설정해 줍니다.

```js
# ArgoCD 설치 YAML
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: nginx-app
  namespace: argocd
spec:
  destination:
    namespace: default
    server: 'https://kubernetes.default.svc'
  project: default
  source:
    path: nginx
    repoURL: 'https://github.com/yourusername/your-repo.git'
    targetRevision: HEAD
  syncPolicy:
    automated: {}
```



2. 애플리케이션 구성 정의하기:
NGINX 배포 구성을 정의하는 nginx.yaml 파일을 생성하세요.

```yaml
# NGINX 배포 구성 (nginx.yaml)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
```

3. GitOps 워크플로우 따르기:
nginx.yaml 파일을 Git 저장소에 커밋하여 ArgoCD의 동기화 프로세스를 실행하세요.

```bash
# Git에 변경 사항 커밋하고 푸시하기
git add nginx.yaml
git commit -m "NGINX 배포 구성 추가"
git push origin main
```



4. 모두를 동기화 유지하기:
ArgoCD는 Git 저장소의 변경 사항을 자동으로 감지하고 원하는 상태를 Kubernetes 클러스터와 동기화합니다.

```js
# 응용 프로그램 동기화 상태 확인
 argocd app get nginx-app
```

5. 배포 문제 처리:
문제가 발생하면 ArgoCD를 사용하여 서비스 연속성을 유지하기 위해 원할한 롤백 또는 롤포워드 작업을 수행할 수 있습니다.

```js
# 이전 상태로 롤백
 argocd app rollback nginx-app
```




# 새로운 버전으로 롤포워드
 argocd app rollforward nginx-app


6. 워크플로우 사용자화하기:
ArgoCD를 사용하여 CI/CD 파이프라인, 모니터링 시스템 또는 알림 서비스와 통합하여 필요에 맞게 맞춤 설정하세요.

ArgoCD는 Kubernetes 배포를 간소화하는 데 사용되며, 기본 통합, 간단한 구성, GitOps 워크플로우, 자동 동기화, 롤백/롤포워드 기능 및 확장성을 제공합니다. ArgoCD를 채택함으로써 팀은 배포 프로세스를 최적화하고 생산성을 높이며, Kubernetes 클러스터에서 실행되는 응용 프로그램의 신뢰성과 확장 가능성을 보장할 수 있습니다. ArgoCD로 뛰어나게 Kubernetes 여정을 시작해보세요!

관련 기사: Kubernetes 환경에서 ArgoCD가 필수적인 이유




행복한 코딩하세요 🙂