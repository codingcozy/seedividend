---
title: "테라폼을 사용하여 다양한 쿠버네티스 리소스 생성하기"
description: ""
coverImage: "/assets/img/2024-05-16-CreatevariousKubernetesresourcesusingTerraform_0.png"
date: 2024-05-16 03:50
ogImage: 
  url: /assets/img/2024-05-16-CreatevariousKubernetesresourcesusingTerraform_0.png
tag: Tech
originalTitle: "Create various Kubernetes resources using Terraform"
link: "https://medium.com/stackademic/create-various-kubernetes-resources-using-terraform-7fedc0bcf427"
---


<img src="/assets/img/2024-05-16-CreatevariousKubernetesresourcesusingTerraform_0.png" />

테라폼을 사용하여 쿠버네티스(Kubernetes) 리소스를 생성하는 것은 인프라를 코드로 정의하는 것을 의미합니다. 이를 통해 배포하는 과정에서 자동화, 버전 관리 및 재현성이 가능해집니다.

여기서는 테라폼을 사용하여 일반적인 쿠버네티스 리소스인 네임스페이스, 디플로이먼트 및 서비스를 생성하는 방법에 대해 안내하겠습니다.

## 테라폼이 쿠버네티스 클러스터 프로비저닝에 좋은 도구인 이유:



- Terraform은 사용자가 Kubernetes 클러스터 정의를 코드로 유지할 수 있게 해줍니다.
- 하부 인프라 구성을 위해 동일한 선언적 구문을 사용합니다.
- Terraform을 사용하면 변수를 통해 Kubernetes 클러스터를 수정할 수 있습니다.
- 변경 사항이 적용되기 전에 Kubernetes 클러스터에 대한 수정 사항을 먼저 미리 확인할 수 있는 dry-run 기능이 있습니다.
- Terraform의 중요한 이점 중 하나는 Kubernetes 프로비저닝 및 그에 따른 응용 프로그램 배포에 동일한 구성 언어를 사용할 수 있는 능력입니다.
- Terraform을 사용하면 API를 확인할 필요 없이 pod 및 리소스를 생성, 업데이트 및 삭제하는 데 하나의 명령어만 필요합니다.
- Terraform은 리소스 간의 관계를 인식하고 코드에서 인프라를 모듈화합니다.
- Terraform은 제품 출시 시간을 단축시키며 재해 복구 시간과 릴리스 문제에 도움을 줍니다.

## 준비 사항:

- 가동 중인 Kubernetes 클러스터
- Terraform 및 kubectl 설치 및 구성

이제 자원을 생성해 봅시다.



## 단계 1: Terraform 구성 설정하기

- Terraform 프로젝트 디렉토리를 만듭니다.

```js
mkdir terraform-k8s && cd terraform-k8s
```

- Kubernetes 공급자를 정의하는 provider.tf 파일을 만듭니다.



```js
terraform {
  required_providers {
    kubernetes = {
      source = "hashicorp/kubernetes"
    }
  }
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}
```

## Step 2: Define Kubernetes Resources

- Create a `namespace.tf` file to define a Kubernetes namespace.

```js
resource "kubernetes_namespace" "demo" {
  metadata {
    name = "demo-namespace"
  }
}
```



- 애플리케이션을 배포하기 위한 deployment.tf 파일을 생성하세요.

```js
resource "kubernetes_deployment" "demo" {
  metadata {
    name = "demo-deployment"
    namespace = kubernetes_namespace.example.metadata[0].name
  }

  spec {
    replicas = 3
    selector {
      match_labels = {
        app = "demo"
      }
    }

    template {
      metadata {
        labels = {
          app = "demo"
        }
      }

      spec {
        container {
          image = "nginx:latest"
          name  = "demo-deployment"
        }
      }
    }
  }
}
```

- 배포를 노출하기 위한 service.tf 파일을 생성하세요.

```js
resource "kubernetes_service" "demo" {
  metadata {
    name = "demo-service"
    namespace = kubernetes_namespace.example.metadata[0].name
  }

  spec {
    selector = {
      app = "example"
    }

    port {
      port        = 80
      target_port = 80
    }

    type = "LoadBalancer"
  }
}
```



- 구성 맵을 정의하는 configmap.tf 파일을 작성하세요.

```js
resource "kubernetes_config_map" "demo" {
  metadata {
    name = "demo-config"
    namespace = kubernetes_namespace.example.metadata[0].name
  }

  data = {
    "config.json" = jsonencode({
      "key" = "value"
    })
  }
}
```

- Kubernetes 시크릿을 정의하는 secret.tf 파일을 작성하세요.

```js
resource "kubernetes_secret" "demo" {
  metadata {
    name = "demo-secret"
    namespace = kubernetes_namespace.example.metadata[0].name
  }

  data = {
    "password" = base64encode("supersecret")
  }
}
```



- PersistentVolumeClaim을 정의하는 pvc.tf 파일을 만들어보세요.

```javascript
resource "kubernetes_persistent_volume_claim" "demo" {
  metadata {
    name = "demo-pvc"
    namespace = kubernetes_namespace.example.metadata[0].name
  }

  spec {
    access_modes = ["ReadWriteOnce"]
    resources {
      requests = {
        storage = "10Gi"
      }
    }
  }
}
```

- 이제, 배포 파일을 수정하여 ConfigMap과 Secret을 마운트하도록 해봅시다.

```javascript
resource "kubernetes_deployment" "demo" {
  metadata {
    name = "demo-deployment"
    namespace = kubernetes_namespace.example.metadata[0].name
  }

  spec {
    replicas = 3
    selector {
      match_labels = {
        app = "demo"
      }
    }

    template {
      metadata {
        labels = {
          app = "demo"
        }
      }

      spec {
        container {
          image = "nginx:latest"
          name  = "demo"

          volume_mount {
            mount_path = "/etc/config"
            name       = "config"
          }

          volume_mount {
            mount_path = "/etc/secret"
            name       = "secret"
            read_only  = true
          }
        }

        volume {
          name = "config"
          config_map {
            name = kubernetes_config_map.example.metadata[0].name
          }
        }

        volume {
          name = "secret"
          secret {
            secret_name = kubernetes_secret.example.metadata[0].name
          }
        }
      }
    }
  }
}
```



## 단계 3: 작업 디렉터리 초기화

- 작업 디렉터리에서 terraform init 명령을 실행하십시오. 이 명령은 필요한 모든 공급자를 다운로드하고 모든 모듈을 초기화하며 백엔드도 초기화합니다.

## 단계 4: Terraform 실행 계획 생성

- 작업 디렉터리에서 terraform plan 명령을 실행하십시오. 이 명령은 실행 계획을 제공합니다.



## 단계 5: Terraform apply 실행

- 작업 디렉토리에서 terraform apply 명령을 실행하면 AWS에 필요한 모든 리소스가 생성됩니다.

## 단계 6: 리소스 확인

- Terraform이 변경 사항을 적용한 후, 리소스가 올바르게 배포되었는지 확인하세요.



```js
kubectl get all --namespace=demo-namespace
```

여기까지만 하면, 이제 Terraform을 사용하여 다양한 K8s 리소스를 생성하는 방법을 배웠습니다. 이제 이를 사용하여 필요에 따라 수정하고 실험할 수 있습니다.

이 안내서가 도움이 되었다면 👏 버튼을 클릭해 주시고 댓글을 자유롭게 남겨주세요.

이와 같은 이야기를 더 보시려면 팔로우 해주세요 😊




# 스택데믹 🎓

끝까지 읽어 주셔서 감사합니다. 떠나시기 전에:

- 작가를 클랩하고 팔로우해 주시면 감사하겠습니다! 👏
- 팔로우하기: X | LinkedIn | YouTube | Discord
- 다른 플랫폼 방문하기: In Plain English | CoFeed | Venture | Cubed
- 알고리즘 콘텐츠를 다루도록 강요하는 블로그 플랫폼에 지쳤나요? Differ를 시도해보세요
- 더 많은 콘텐츠는 Stackademic.com에서 확인하세요