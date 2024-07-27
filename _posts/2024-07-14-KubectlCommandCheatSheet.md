---
title: "2024년 필수 Kubectl 명령어 치트 시트"
description: ""
coverImage: "/assets/img/2024-07-14-KubectlCommandCheatSheet_0.png"
date: 2024-07-14 00:29
ogImage: 
  url: /assets/img/2024-07-14-KubectlCommandCheatSheet_0.png
tag: Tech
originalTitle: "Kubectl Command Cheat Sheet"
link: "https://medium.com/@kv2023/kubernetes-kubectl-command-cheat-sheet-3f09ddf47cea"
---


![Kubectl Command Cheat Sheet 0](/assets/img/2024-07-14-KubectlCommandCheatSheet_0.png)

kubectl은 쿠버네티스 클러스터를 유지하기 위한 강력한 명령줄 도구입니다. 이것은 보통 사용되는 명령어들로 일반적인 클러스터 관리를 넘어서는 방법을 제공합니다.

![Kubectl Command Cheat Sheet 1](/assets/img/2024-07-14-KubectlCommandCheatSheet_1.png)

![Kubectl Command Cheat Sheet 2](/assets/img/2024-07-14-KubectlCommandCheatSheet_2.png)

<div class="content-ad"></div>

# CRUD COMMANDS

```js
# 배포 생성:  
kubectl create deployment <배포명> 

# 배포 편집:    
kubectl edit deployment <배포명> 

# 배포 삭제:  
kubectl delete deployment <배포명>
```

## 다양한 K8S 구성요소의 상태 받아오기

```js
kubectl get (nodes | pod | services | replicaset | deployment )
```

<div class="content-ad"></div>

## 포드 디버깅

```js
# 콘솔에 로깅: 
kubectl logs <pod_name>

# 상호 작용하는 터미널 가져오기: 
kubectl exec -it <pod_name> -- /bin/bash

# 포드 정보 가져오기: 
kubectl describe pod <pod_name>

# -f 옵션으로 로그 팔로우하기
예시: kubectl logs -f <pod_name>
```

## CRUD를 위한 구성 파일 사용

```js
# 구성 파일 적용: 
kubectl apply -f <file_name>

# 구성 파일을 사용하여 삭제: 
kubectl delete -f <file_name>
```

<div class="content-ad"></div>

## 버전 확인

```js
PS C:\> kubectl version
클라이언트 버전: version.Info{Major:"1", Minor:"20", GitVersion:"v1.20.0", GitCommit:"
af46c47ce925f4c4ad5cc8d1fca46c7b77d13b38", GitTreeState:"clean", BuildDate:"2020-12-08T17:59:43Z", GoVersion:"
go1.15.5", Compiler:"gc", Platform:"windows/amd64"}
서버 버전: version.Info{Major:"1", Minor:"19", GitVersion:"v1.19.7", GitCommit:"
1dd5338295409edcfff11505e7bb246f0d325d15", GitTreeState:"clean", BuildDate:"2021-01-13T13:15:20Z", GoVersion:"
go1.15.5", Compiler:"gc", Platform:"linux/amd64"}
```

## 생성

```js
PS C:\> kubectl create --help

파일이나 stdin에서 리소스를 생성합니다.
JSON 및 YAML 형식을 지원합니다.
예시:
  # pod.json 파일의 데이터를 사용하여 Pod를 생성합니다.
  kubectl create -f ./pod.json
  # stdin으로 전달된 JSON을 기반으로 Pod를 생성합니다.
  cat pod.json | kubectl create -f -
  # docker-registry.yaml 파일의 데이터를 JSON 형식으로 편집한 후 해당 데이터로 리소스를 생성합니다.
  kubectl create -f docker-registry.yaml --edit -o json
...
```