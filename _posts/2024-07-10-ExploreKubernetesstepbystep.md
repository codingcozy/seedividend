---
title: "단계별로 알아보는 Kubernetes 사용법"
description: ""
coverImage: "/trivasor.github.io/assets/no-image.jpg"
date: 2024-07-10 02:31
ogImage: 
  url: /trivasor.github.io/assets/no-image.jpg
tag: Tech
originalTitle: "Explore Kubernetes step by step."
link: "https://medium.com/@shaikhzayan/explore-kubernetes-step-by-step-9fbf66d963bf"
isUpdated: true
---




# 쿠버네티스란 무엇인가요?

- 정의: 쿠버네티스는 오픈 소스 컨테이너 오케스트레이션 플랫폼입니다. 컨테이너화된 애플리케이션의 배포, 확장 및 관리를 자동화합니다.
- 왜 사용해야 하나요?: 애플리케이션 관리를 간소화하고, 고가용성을 보장하며, 리소스 활용을 최적화합니다.

## 노드와 팟:

- 노드: 쿠버네티스 클러스터의 워커 머신들입니다.
- 노드는 팟(가장 작은 배포 가능한 단위)를 호스트합니다.
- 노드를 여러분의 애플리케이션이 실행되는 서버로 생각해보세요.

<div class="content-ad"></div>

## Pods:

- 하나 이상의 컨테이너를 포함할 수 있는 Pod.
- Pod 내의 컨테이너들은 동일한 네트워크와 저장소를 공유함.
- 예: 같은 Pod 내에 웹 서버와 데이터베이스 컨테이너가 함께 있는 경우.

## 제어 플레인 구성 요소:

- API 서버: Kubernetes API 노출.
- etcd: 설정 데이터를 위한 일관된 키-값 저장소.
- 컨트롤러 매니저: 원하는 상태 유지 (예: 레플리카 수 유지).
- 스케줄러: Pod를 노드에 할당.
- kubelet: 각 노드의 Pod를 관리.
- kube-proxy: 네트워킹 규칙 처리.

<div class="content-ad"></div>

## 배포 및 서비스:

- 배포: 롤링 업데이트 및 롤백 관리합니다.
- 서비스: Pod를 네트워크 서비스로 노출합니다.
- LoadBalancer, NodePort 및 ClusterIP가 일반적인 서비스 유형입니다.

## Stateful 애플리케이션:

- StatefulSets: 지속적인 스토리지(예: 데이터베이스)를 가진 stateful 앱을 처리합니다.
- 예: MySQL 데이터베이스를 사용하는 WordPress.

<div class="content-ad"></div>

## 확장 및 자가 치유:

- 수평 스케일링: 레플리카 수를 조정하여 애플리케이션을 쉽게 확장할 수 있습니다.
- 자가 치유: 쿠버네티스가 실패한 파드를 자동으로 재시작합니다.

## 네트워킹 및 인그레스:

- 인그레스: 규칙과 경로를 통해 서비스를 외부에 노출합니다.
- 네트워크 정책: 파드 간의 통신을 제어합니다.

<div class="content-ad"></div>

## 보안 및 RBAC:

- Role-Based Access Control (RBAC): 액세스 권한을 관리합니다.
- Secrets 및 ConfigMaps: 민감한 데이터 및 구성을 저장합니다.

## 튜토리얼 살펴보기:

- Kubernetes 웹사이트에서 대화식 튜토리얼을 찾을 수 있습니다.
- 다른 리소스로는 GeeksforGeeks, Red Hat Developer, 그리고 Educative도 있습니다.

<div class="content-ad"></div>

# Kubernetes 클러스터?

당연히요! Kubernetes 클러스터에서 마스터 노드는 전체 클러스터를 관리하는 데 중요한 역할을 합니다. 마스터 노드에 대한 중요한 사항은 다음과 같습니다:

- 정의:
    - 마스터 노드는 클러스터의 제어 평면을 담당합니다.
    - 그것은 전역적인 결정(예: 스케줄링)을 감독하고 클러스터 이벤트(예: 새로운 팟 시작)에 응답합니다.

<div class="content-ad"></div>

- 마스터 노드의 구성요소:

  - API 서버: 클러스터와 상호 작용하기 위한 진입점이다.
  - etcd: 클러스터의 상태를 저장하는 분산형 키-값 저장소이다.
  - 컨트롤러 매니저: 다양한 컨트롤러(노드 컨트롤러, 복제 컨트롤러 등)를 관리한다.
  - 스케줄러: 워크로드가 실행될 위치를 결정한다.

- 책임:

  - 관리 작업을 처리한다.
  - 클러스터 내에서 작업을 모니터링하고 계획한다.

<div class="content-ad"></div>

쿠버네티스 클러스터에는 일반적으로 적어도 하나의 마스터 노드가 있지만, 여분성은 여러 마스터 노드를 포함할 수 있습니다!