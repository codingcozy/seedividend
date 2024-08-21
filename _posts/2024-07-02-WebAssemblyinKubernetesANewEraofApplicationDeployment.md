---
title: "Kubernetes에서 WebAssembly 애플리케이션 배포의 새로운 시대"
description: ""
coverImage: "/assets/img/2024-07-02-WebAssemblyinKubernetesANewEraofApplicationDeployment_0.png"
date: 2024-07-02 23:23
ogImage:
  url: /assets/img/2024-07-02-WebAssemblyinKubernetesANewEraofApplicationDeployment_0.png
tag: Tech
originalTitle: "WebAssembly in Kubernetes: A New Era of Application Deployment"
link: "https://medium.com/@simardeep.oberoi/webassembly-in-kubernetes-a-new-era-of-application-deployment-9d579c59e556"
isUpdated: true
---

![WebAssembly in Kubernetes](/assets/img/2024-07-02-WebAssemblyinKubernetesANewEraofApplicationDeployment_0.png)

어느덧 Kubernetes가 대규모 컨테이너화된 애플리케이션을 배포하고 관리하는 데 필수적인 플랫폼으로 자리매김했습니다. 하지만 더 나은 성능과 보안, 효율성을 약속하는 새로운 기술이 등장하고 있습니다 - WebAssembly(Wasm). 이 글에서는 WebAssembly를 Kubernetes에 통합하여 광범위한 생태계를 활용하는 동시에 성능, 보안 및 효율성 면에서 상당한 장점을 제공하는 방법을 알아보겠습니다.

# 기본 사항 이해하기

전형적인 Kubernetes 설정부터 시작해봅시다: 배포가 컨테이너를 포함하는 파드를 생성하고, 서비스는 내부 통신을 관리하며, 인그레스는 외부 트래픽을 처리하고, 수평 파드 오토스케일러는 파드 복제본의 수를 조정합니다. 그렇다면, 컨테이너 대신 WebAssembly 이진 파일을 실행할 수 있다면 어떨까요? 이러한 변경은 다양한 이점을 가져올 수 있습니다.

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

# 웹어셈블리의 장점

웹어셈블리는 전통적인 컨테이너에 비해 여러 가지 장점을 제공합니다:

- 거의 네이티브 속도: Wasm 애플리케이션은 네이티브 코드와 거의 동일한 속도로 실행됩니다.
- 더 작은 크기: Wasm 이진 파일은 컨테이너보다 더 작습니다.
- 더 빠른 시작: Wasm 애플리케이션은 상당히 빠르게 시작됩니다.
- 향상된 보안: Wasm의 샌드박싱 모델이 더 나은 보안을 제공합니다.

이러한 이점에도 불구하고, Wasm은 아직 널리 채택되지 않았습니다. 그 이유는? 쿠버네티스 덕분에 컨테이너가 가지고 있는 견고한 생태계 부재 때문입니다.

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

# 생태계 중요성

컨테이너는 기술뿐만 아니라 Kubernetes가 제공하는 풍부한 생태계로 인해 인기가 있습니다. 이에는 스케쥴링, 모니터링, 네트워킹 및 정책 강제 시 도구가 포함됩니다. 클라우드 네이티브 컴퓨팅 재단(CNCF)의 프로젝트에 의해 지원되는 Kubernetes 생태계는 방대하며 지속적으로 확장되고 있습니다.

반면, Wasm 생태계는 아직 초보 단계에 있습니다. FaaS 또는 Docker 같은 도구를 사용하여 단일 서버에서 Wasm을 실행하는 것은 가능하지만, Kubernetes가 제공하는 것과는 비교할 수 없습니다. Wasm이 실용적인 대안이 되기 위해서는 Kubernetes 생태계에 통합되어야 합니다.

# KvASM 소개: Wasm과 Kubernetes를 연결하는 솔루션

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

[KvASM](https://github.com/kvaps/kvass)는 쿠버네티스 노드에 WebAssembly 지원을 추가하는 쿠버네티스 오퍼레이터입니다. KvASM은 쿠버네티스 클러스터 내에서 Wasm 애플리케이션을 실행하는 과정을 간소화하여 전통적인 컨테이너를 실행하는 것과 거의 동일한 수준으로 쉽게 만들어줍니다. KvASM이 배포 과정을 변화시키는 방법은 다음과 같습니다:

## 쿠버네티스에서 Wasm 실행 활성화하는 방법

쿠버네티스 클러스터에서 KvASM을 사용하여 Wasm을 실행하려면 다음 세 가지 단계가 필요합니다:

- KvASM 오퍼레이터 설치: 이 오퍼레이터는 노드를 모니터링하고 어떤 노드가 Wasm 애플리케이션을 실행할지에 대한 명령을 기다립니다.
- 노드 주석 추가: KvASM 노드 주석을 사용하여 특정 노드 풀, 개별 노드 또는 클러스터의 모든 노드 중 어떤 노드가 Wasm을 실행할지 지정합니다.
- 새 런타임 클래스 적용: 이 런타임 클래스는 쿠버네티스에 새로 설치한 Wasm 런타임을 사용하도록 지시합니다.

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

이제 이 단계들로 여행이 준비되어, 웹어셈블리 애플리케이션을 실행할 준비가 되었습니다.

## 웹어셈블리 애플리케이션 패키징

웹어셈블리 애플리케이션을 패키징하는 과정은 이를 이진 파일로 컴파일하고, 이진 파일을 컨테이너 이미지로 변환하는 것을 포함합니다. 이 과정은 다단계 Dockerfile을 사용하는 것과 유사합니다. 패키징이 완료되면, 이미지를 레지스트리로 푸시하고, 익숙한 manifest를 사용하여 Kubernetes 클러스터에 배포할 수 있습니다. manifest에서 변경해야 하는 유일한 점은 Wasm 런타임 클래스를 명시하는 것입니다.

## 웹어셈블리 애플리케이션 실행

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

Kubernetes에서 Wasm 애플리케이션을 실행하는 것은 간단합니다. 컨테이너 애플리케이션에 사용되는 매니페스트를 동일하게 사용하되, Wasm 런타임 클래스를 지정하는 작은 수정을 하면 됩니다. 이를 통해 서비스, Ingress 및 오토스케일러와 같은 기존의 Kubernetes 도구와 관행을 추가 복잡성 없이 활용할 수 있습니다.

# KvASM 설정하기

다음은 Kubernetes 클러스터에서 KvASM을 설정하는 방법입니다:

- HELM 저장소 추가하기:

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
helm repo add kwasm http://kwasm.sh/kwasm-operator/
```

- KvASM 오퍼레이터 설치하기:

```js
helm install -n kwasm --create-namespace kwasm-operator kwasm/kwasm-operator
```

- 노드 프로비저닝:

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
kubectl 주석 노드 --all kwasm.sh/kwasm-node=true
```

- RuntimeClass 및 Job 매니페스트를 적용하십시오:

```js
apiVersion: node.k8s.io/v1
kind: RuntimeClass
metadata:
  name: wasmedge
handler: wasmedge
---
apiVersion: batch/v1
kind: Job
metadata:
  creationTimestamp: null
  name: wasm-test
spec:
  template:
    metadata:
      annotations:
        module.wasm.image/variant: compat-smart
      creationTimestamp: null
    spec:
      containers:
      - image: wasmedge/example-wasi:latest
        name: wasm-test
        resources: {}
      restartPolicy: Never
      runtimeClassName: wasmedge
  backoffLimit: 1
```

# 쿠버네티스에서 Wasm의 장단점

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

## 장점:

- 성능: Wasm 애플리케이션은 거의 네이티브 속도로 실행되며 시작이 빠르고 보안성이 더 높습니다.
- 패키징: 컨테이너 이미지를 사용하여 패키징하면 기존 CI/CD 파이프라인과의 원활한 통합이 가능합니다.
- 생태계: Kubernetes 생태계를 활용하면 함께 작동하도록 설계된 다양한 도구 및 서비스에 액세스할 수 있습니다.

## 단점:

- 생태계 한계: Wasm 생태계는 아직 성장 단계에 있어 컨테이너 생태계와 비교할 때 다양성이 부족합니다.
- 복잡성: 초기 설정이 복잡할 수 있으며 특권 연산이 필요할 수 있습니다.
- Sidecar 컨테이너: 동일한 파드에서 Wasm과 컨테이너를 혼합하면 사이드카에 의존하는 솔루션에 영향을 줄 수 있습니다.

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

# 결론

KvASM는 쿠버네티스 클러스터에서 WebAssembly를 실행하는 것을 간단하게 만드는 환상적인 프로젝트입니다. 이는 컨테이너보다 빠르고 보안성이 더 뛰어난 대안으로, Wasm이 쿠버네티스 내에서 표준 런타임이 될 미래를 엿볼 수 있습니다. 일부 제한 사항이 있지만, 쿠버네티스에서 Wasm을 실행하는 장점은 상당히 크며, KvASM은 Wasm 지원이 보다 보편화될 때까지의 간극을 메우고 있습니다.

읽어 주셔서 감사합니다. 쿠버네티스와 클라우드 네이티브 기술의 최신 동향에 대한 더 많은 통찰력을 기대해 주세요.
