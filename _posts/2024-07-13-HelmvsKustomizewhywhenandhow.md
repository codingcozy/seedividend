---
title: "Helm vs Kustomize 비교 이유, 시기, 그리고 방법"
description: ""
coverImage: "/assets/img/2024-07-13-HelmvsKustomizewhywhenandhow_0.png"
date: 2024-07-13 01:50
ogImage:
  url: /assets/img/2024-07-13-HelmvsKustomizewhywhenandhow_0.png
tag: Tech
originalTitle: "Helm vs Kustomize: why, when, and how"
link: "https://medium.com/@elfakharany/helm-vs-kustomize-why-when-and-how-5d5ba0f80234"
isUpdated: true
---

![이미지](/assets/img/2024-07-13-HelmvsKustomizewhywhenandhow_0.png)

만약 시각적인 자료를 선호한다면, 이 글은 비디오 형식으로도 제공됩니다:

# 도전

우리가 헬름 또는 커스터마이즈를 사용하고 싶은 이유를 살펴보기 전에 토론을 시작해 봅시다.

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

## 다양한 환경, 다양한 YAML 파일!

Kubernetes를 사용하면 다른 사용 사례에 대한 다양한 환경을 쉽게 만들 수 있습니다. 동일한 클러스터에서 네임스페이스를 사용하거나 여러 클러스터를 보유하여 개발, 테스트, QA, UAT, 스테이징, 프리프로드, 프로드 등을 호스팅할 수 있습니다. 그러나 관리해야 할 환경이 많아지면 문제가 될 수 있습니다.

가장 직접적이고 간단한 접근 방법은 동일한 manifest 디렉토리의 복제본을 만들고 각 환경에 설명적인 이름을 부여하는 것입니다. 즉, 소스 파일을 CTRL-C로 복사하고 각 환경에 CTRL-V를 붙입니다.

![이미지](/assets/img/2024-07-13-HelmvsKustomizewhywhenandhow_1.png)

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

간단한 프로젝트에서 환경마다 매우 적은 변경만 필요한 경우, 위의 방법이 유용할 수 있습니다. 예를 들어, 이미지 태그를 제외한 모든 YAML 매니페스트가 정확히 동일한 경우가 그 예입니다. 각 디렉토리의 deployment.yaml 파일을 열어 변경 사항을 적용하세요. 저장한 후 kubectl apply -f .을 실행하면 끝납니다.

그러나 대부분의 경우 환경 간의 차이는 그렇게 간단하지 않습니다. 다음 예를 살펴보세요:

- Dev 환경은 디버깅을 허용하는 일부 컨테이너 명령 인수를 사용합니다. QA 또는 프로드 환경에서는 사용하면 안 됩니다.
- QA는 일부 테스트를 실행하기 위해 사이드카를 배포합니다. Dev나 프로드에는 그것이 없습니다.
- 명백한 이유로 Prod RBAC는 다른 두 환경보다 더 제한적입니다.

그리고 그것이 이야기의 반도 아직도 되지 못한 것입니다:

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

- 어플리케이션이 커지면서 다른 의존 서비스가 필요해졌어요. 예를 들어, MySQL 백엔드와 Redis 캐시 서버가 그 중 하나인데요. 각각이 자체 매니페스트, 구성 설정, 그리고 환경 차이를 가지고 있어요.
- 우리는 CI/CD 파이프라인을 구현해야 해요. 이 파이프라인은 테스트, 빌드, 그리고 우리 어플리케이션 (그 의존성들과 함께)을 여러 환경에 배포할 거에요.

여러분이 보시듯이, kubectl을 그대로 사용하면 악몽이 될 수 있어요. 여기서 우리는 더 고급 도구를 탐색하기 시작할 거예요. 구체적으로 Helm과 Kustomize를 언급하고 싶어요. 먼저, 각각이 위 문제들을 어떻게 해결할 수 있는지 살펴봐요.

# Helm

Kubernetes 패키지 관리자로 알려진 Helm은 "차트"로 애플리케이션을 패키징, 배포, 그리고 관리할 수 있는 방법을 제공해요. Helm 차트는 템플릿과 값 파일의 컬렉션으로 구성되어 있어요. 여기서 템플릿은 Kubernetes 리소스 (예: 배포, 서비스, 구성 맵)를 정의하고, 값 파일은 템플릿 값을 사용자 정의할 수 있도록 해요.

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

이렇게하면 모든 배포 (또는 환경)에서 변경되는 매개 변수를 포함하는 템플릿 세트를 사용할 수 있어요. 예를 들어, 다음은 값 파일에서 레플리카 수, 이미지 이름 및 태그, 컨테이너 포트, 컨테이너 시작 매개 변수를 가져오는 Helm 배포 템플릿입니다:

```js
apiVersion: apps/v1
kind: Deployment
metadata:
  name: { .Release.Name }-배포
spec:
  replicas: { .Values.replicaCount }
  selector:
    matchLabels:
      app: { .Release.Name }
  template:
    metadata:
      labels:
        app: { .Release.Name }
    spec:
      containers:
        - name: { .Chart.Name }
          image: { .Values.image.repository }:{ .Values.image.tag }
          ports:
            - containerPort: { .Values.containerPort }
          args:
            - { .Values.startupArguments }
```

' and ' 사이의 모든 것은 동적입니다. 즉, 차트가 배포될 때 실제 값으로 대체됩니다. 해당 값 파일은 다음과 같이 보일 수 있어요:

```js
replicaCount: 3

image:
  repository: myapp/image
  tag: v1.0.0

containerPort: 8080

startupArguments: arg1 arg2 arg3
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

안내: .Release.Name 및 .Chart.Name 변수는 Chart.yaml 파일에서 가져오며, 동일한 차트의 여러 버전을 클러스터에 배포할 수 있도록 쿠버네티스 구성 요소에 고유한 이름을 제공하는 데 사용됩니다.

헬름이 클러스터에 적용되면 쿠버네티스 API 서버가 다음을 수신합니다:

```js
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
        - name: myapp
          image: myapp/image:v1.0.0
          ports:
            - containerPort: 8080
          args:
            - arg1
            - arg2
            - arg3
```

이렇게 하면 각 환경/사용 사례에 대해 서로 다른 값 파일을 가질 수 있습니다.

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

환경 전반적인 변경을 위해서는 소스 템플릿을 수정해야 하며, 이는 한 번만 하면 됩니다. 환경별 변경에 대해서는 각 환경의 Values 파일을 사용할 수 있습니다.

![이미지](/assets/img/2024-07-13-HelmvsKustomizewhywhenandhow_2.png)

# Kustomize

Kustomize는 동일한 결과를 얻기 위해 노력하지만 템플릿을 사용하지 않습니다. 대신, YAML 파일의 원본 버전을 디렉토리에 보관할 수 있도록 합니다. 일반적으로 base라고 부르지만 별도로 지정할 수도 있습니다. 각 환경/시나리오/사용 사례에 대해 디렉토리(또는 디렉토리 트리)를 만들 수 있습니다. 각 디렉토리에는 kustomization.yaml라는 YAML 파일이 필요합니다. 이 파일의 목적은 Kustomize에게 어떤 manifest 파일을 고려해야 하는지와 해당 파일에 어떤 변경을 적용해야 하는지에 대한 지침을 제공하는 것입니다. 이것은 예제를 통해 가장 잘 설명됩니다. Helm과 동일한 결과를 얻기 위해 Kustomize를 어떻게 사용할 수 있는지 살펴보겠습니다.

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

우선, 디렉토리 구조를 생성해야 합니다:

```js
myapp/
├── kustomization.yaml
├── base
│   └── deployment.yaml
└── overlay
    └── deployment.yaml
```

myapp/kustomization.yaml 파일의 내용은 다음과 같습니다:

```js
apiVersion: kustomize.config.k8s.io / v1beta1;
kind: Kustomization;

resources: -base / deployment.yaml;

patchesStrategicMerge: -overlay / deployment.yaml;
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

베이스/deployment.yaml 파일은 아래와 같습니다:

```js
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
spec:
  replicas: 3
  template:
    spec:
      containers:
        - name: myapp
          image: myapp/image:v1.0.0
          ports:
            - containerPort: 8080
```

여기서 알 수 있듯이, 필요할 경우 그대로 적용할 수 있는 완전한 유효한 YAML 파일입니다.

환경 요구에 맞게 이 배포(Deployment)를 변경하려면 overlay/deployment.yaml 파일을 사용해야 합니다. 이 파일은 대략 다음과 같습니다.

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

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
spec:
  template:
    spec:
      containers:
        - name: myapp
          args:
            - arg1
            - arg2
            - arg3
```

그리고 쿠버네티스 API 서버로 전송되는 결과 파일은 다음과 같이 됩니다:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
spec:
  replicas: 3
  template:
    spec:
      containers:
        - name: myapp
          image: myapp/image:v1.0.0
          ports:
            - containerPort: 8080
          args:
            - arg1
            - arg2
            - arg3
```

동일한 메커니즘을 세 가지 환경에 적용하기 위해 디렉토리 구조는 다음과 같이 될 수 있습니다:

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
myapp/
├── kustomization.yaml
├── base
│   └── deployment.yaml
├── overlays
│   ├── dev
│       └── kustomization.yaml
│   ├── qa
│       └── kustomization.yaml
│   └── prod
│       └── kustomization.yaml
└── patches
    └── deployment-patch.yaml
```

만약 환경 전체에 영향을 주는 변화가 있다면 base/deployment 파일에서 한 번만 해주면, 모든 곳으로 전파됩니다. 환경별 변경은 해당 환경의 kustomization 파일에서 수행합니다.

![이미지](/assets/img/2024-07-13-HelmvsKustomizewhywhenandhow_3.png)

이제 각 도구가 우리의 도전 과제에 대응하는 방법을 알게 되었으니, 각각의 강점과 약점을 살펴보겠습니다.

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

![이미지](/assets/img/2024-07-13-HelmvsKustomizewhywhenandhow_4.png)

# 라운드 1: 설치 및 설정

Helm은 여러분의 컴퓨터나 서버에 설치되어야 합니다. 설치하는 방법에 대한 포괄적인 안내를 보려면 다음 기사를 참조하십시오.

Kustomize는 별도의 패키지가 있어 https://kubectl.docs.kubernetes.io/installation/kustomize/에서 다운로드할 수 있지만, 버전 1.14부터는 kubectl과 함께 번들로 제공됩니다. 그러므로 시스템에 kubectl이 없거나 필요하지 않은 경우, kubectl -k 명령을 실행하여 Kustomize를 호출할 수 있습니다.

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

승자: Kustomize.

# 라운드 2: 패키지 관리

헬름은 정의상 패키지 관리자이기 때문에, 차트를 찾고 특정 버전으로 다운로드할 수 있는 리포지토리를 제공합니다. 따라서 동일한 클러스터에 동시에 동일한 차트의 여러 버전을 설치할 수도 있습니다. Kustomize는 파일을 배포 가능한 단위로 패키징하지 않습니다. 물론 Kustomize로도 동일한 결과를 수동으로 얻을 수 있습니다 (Git 릴리스가 하나의 옵션입니다). 그러나 헬름은 이 기능을 기본 제공합니다.

승자: 헬름

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

# 라운드 3: 템플릿 기능

헬름은 완전히 Go 템플릿에 의존합니다. 또한 템플릿을 더 다양하게 사용할 수 있도록 Sprig 라이브러리에서 가져온 일부 함수를 추가합니다. 쿠스터마이즈는 전혀 템플릿을 사용하지 않습니다. 대신 오버레이와 패치를 사용하여 클러스터에 적용하기 전에 YAML 매니페스트를 동적으로 수정합니다.

Go는 완벽한 프로그래밍 언어입니다. 따라서 강력한 텍스트 조작 기술을 기대할 수 있습니다. 예를 들어 다음과 같은 기능이 있습니다.

- (range)와 조건문 (if, else, with)과 같은 루프 및 조건문. 이는 중복 리소스를 생성하거나 사용자가 제공한 값에 따라 결정을 내리는 데 유용할 수 있습니다.
- Sprig 라이브러리를 통한 템플릿 함수, 이 함수는 default, pick, omit, trim, upper, lower, quote, 그리고 다른 다양한 함수를 제공합니다.

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

그러나 Kustomize는 이에 대한 액세스 권한이 없습니다. 그럼에도 불구하고, 몇 가지 노하우를 가지고 있습니다. 예를 들어:

- ConfigMaps 및 Secrets를 생성하는 Generator. 이들은 선언적으로 지정되며, Kustomize는 최종 YAML을 빌드할 때 리소스를 생성합니다.
- Variant: Kustomize는 오버레이를 사용하여 동일한 애플리케이션의 다양한 변형을 관리하며, 이는 다른 환경(개발, 스테이징, 프로덕션)을 관리하는 데 도움이 될 수 있습니다.
- 리소스의 필드를 업데이트하는 Transformer. 일반적인 Transformer에는 리소스 이름에 접두사/접미사 추가, 레이블 및 주석 업데이트, 네임스페이스 업데이트가 포함됩니다. Transformer는 서로 다른 리소스에 선택적으로 적용될 수 있으며, 높은 수준의 제어를 제공합니다.

우승자: 무승부 (하지만 정말로 원하는 커스터마이징 수준에 따라 다릅니다)

# 라운드 4: 디버깅

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

YAML 파일에 오류가 없는지 클러스터에 적용하기 전에 테스트해야 하는 것은 분명합니다. YAML은 객체, 목록 및 다른 구성 요소를 정의할 때 공백과 들여쓰기를 사용합니다. 하나의 올바르지 않은 들여쓰기가 전체 배포를 망치는 일이 발생할 수 있습니다. Helm과 Kustomize는 클러스터에 적용하기 전에 생성된 YAML 매니페스트를 확인할 수 있도록 합니다.

Kustomize에는 모든 패치, 오버레이, 변환기 등을 적용한 후 최종 매니페스트를 생성하는 build 명령이 있습니다. 그러나 kubectl apply -k --dry-run을 실행하여 API 서버에 대해 YAML 매니페스트를 확인할 수도 있습니다.

Helm에도 동일한 기능을 수행하는 여러 방법이 있습니다:

API 서버로 전송되기 전에 YAML 매니페스트를 렌더링하려면 helm template을 사용할 수 있습니다. 또한 helm lint를 사용하여 차트가 모범 사례를 준수하는지 확인할 수도 있습니다.

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

`helm install --dry-run` 또는 `helm upgrade`를 사용하여 manifests를 API 서버에 대해 테스트할 수도 있습니다. 즉, YAML이 구문적으로 올바르더라도 API 서버가 다른 이유로 거부할 수 있습니다. 예를 들어, 누락된 CRD나 등록 컨트롤러 등입니다. Helm은 쿠버네티스에 페이로드를 적용하기 전에 이러한 오류를 찾아낼 수 있도록 합니다. 이를 통해 설치 및 다시 설치해야 하는 손상된 차트를 피할 수 있습니다.

승자 : 무승부

# 라운드 5 : 버전 관리 및 롤백

이전에 언급한 바와 같이 Helm은 같은 클러스터에 동시에 동일한 차트의 여러 버전을 배포할 수 있습니다. 헬름은 배포 버전을 revision이라고 하는데요. 클러스터에 배포된 리비전의 이력을 유지하며 필요할 때 이전 리비전으로 롤백할 수 있게 해줍니다. Kustomize로 동일한 작업을 할 수는 있지만, 프로세스가 복잡하고 오류가 발생할 수 있습니다.

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

**Winner: Helm**

# Round 6: Secrets management

여러 경우에는 응용 프로그램 배포의 일부로 일부 민감한 정보를 저장해야 할 때가 있습니다. API 키, 사용자 자격 증명, 토큰 등을 생각해보세요. 모든 경우에 Kubernetes는 비밀 정보를 저장할 수 있는 Secret 객체를 제공합니다. 각 도구가 Secret 생성을 처리하는 방법을 살펴보겠습니다:

## Helm

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

```yaml
# values.yaml
database:
  username: admin
  password: secret
```

그리고

```yaml
# templates/secrets.yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
data:
  username: { { .Values.database.username | b64enc } }
  password: { { .Values.database.password | b64enc } }
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

결과적으로 YAML이 다음과 같이 나올 수 있습니다:

```js
---
# 원본: my-chart/templates/secrets.yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
data:
  username: YWRtaW4=
  password: c2VjcmV0
```

여기서 문제가 명백합니다: 인증 정보가 평문으로 포함된 Values 파일을 버전 관리에 커밋해야 합니다. 한 가지 해결책은 민감한 정보를 저장하는 별도의 Values 파일을 생성하고 .gitignore 파일에 추가하여 git 저장소에 포함하지 않는 것입니다. 그러나 이는 이제 여러 Values 파일을 관리해야 한다는 복잡성을 더해줍니다.

## Kustomize

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

Kustomize secretGenerator를 사용하여 일반 파일로부터 자동으로 Secret YAML을 생성할 수 있습니다. 예를 들어, 자격 증명 파일을 다음과 같이 생성할 수 있습니다:

```js
# 시크릿 파일 생성
echo -n 'admin' > ./username.txt
echo -n 'secret' > ./password.txt
```

Kustomization 파일은 다음과 같이 작성됩니다:

```js
# kustomization.yaml
secretGenerator:
- name: db-secret
  files:
  - username.txt
  - password.txt
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

결과적으로 나타나는 manifest는 다음과 같을 것입니다:

```js
apiVersion: v1
kind: Secret
metadata:
  name: db-secret-8h5h97g6k8
type: Opaque
data:
  username.txt: YWRtaW4=
  password.txt: c2VjcmV0
```

또한 username.txt 및 password.txt도 .gitignore에 추가될 것이므로, 자격 증명을 수정하려는 경우를 제외하고는 매 배포마다 이를 다시 만들 필요가 없습니다 (git clone 또는 git pull을 실행한 후).

물론, 민감한 정보를 Base64에 저장하는 것은 평문을 사용하는 것과 마찬가지입니다. Base64는 암호화 방법이 아닌 인코딩 형식이기 때문에 누구나 명령 줄 도구를 사용하여 Base64 문자열을 해당 원래 형식으로 변환할 수 있습니다. 따라서, 가장 좋은 관행은 비밀 데이터를 암호화하는 것입니다. Helm과 Kustomize는 서드파티 플러그인을 사용하여 이를 수행할 수 있습니다.

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

예를 들어, Kustomize를 사용하고 있다면 `kustomize-secret-generator` 플러그인을 활용할 수 있습니다. 이 플러그인은 Google Cloud Secret Manager, AWS Secrets Manager 또는 HashiCorp 등에서 시크릿을 가져올 수 있게 해줍니다. 여기서의 아이디어는 시크릿이 지원되는 플랫폼 중 하나에 암호화된 형태로 저장되어 있다는 것입니다. 필요할 때 해당 플러그인을 활용하여 시크릿을 가져오고, 복호화하고, 클러스터에 적용할 수 있습니다. 아래에서는 Kustomize가 HashiCorp의 Vault를 활용하는 방법을 보여줍니다:

```yaml
# kustomization.yaml
secretGenerator:
  - name: db-secret
    kvSources:
      - pluginType: vault
        name: my-vault
        namespace: default
        path: secret/data/my-service
        key: db-password
```

Helm은 Helm-Secrets 플러그인을 사용하고 있지만, 다른 플랫폼에서 시크릿을 가져오는 데에 대한 네이티브 지원을 제공하지는 않습니다. 대신, 암호화에 Mozilla SOPS를 사용합니다. 키 자체는 AWS KMS, GCP KMS, Azure Key Vault, PGP와 같은 다양한 키 관리 시스템에 저장될 수 있습니다. 예를 들어:

```bash
helm secrets enc secrets.yaml
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

위 명령어는 Secret 템플릿을 휴식 중에 암호화합니다. 이제 그냥 Git에 커밋하면 됩니다. 다른 기기에서 가져올 때는 Kubernetes에 적용하기 전에 템플릿을 복호화해야 합니다:

```js
helm secrets dec secrets.yaml
```

우승자: Kustomize

# 라운드 7: 매우 큰 애플리케이션 다루기

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

수백 개의 manifest를 포함하는 응용 프로그램에 대해 Helm 템플릿을 사용하다 보면 빠르게 압도당할 수 있습니다. Kustomize를 사용하는 것이 더 나은 선택일 수 있습니다.

예를 들어 Kubeflow를 살펴보면 잘 알려진 Kubernetes 기반 머신 러닝 플랫폼이 Kustomize를 배포 도구로 사용하고 있다는 것을 알 수 있습니다. 그 이유는 이 플랫폼이 엄청나게 거대하고 특정 순서로 배포되어야 하는 많은 종속성이 있기 때문입니다. 더 잘 이해하기 위해 배포해야 하는 리소스의 하위 집합을 살펴보겠습니다 (여기서는 패치나 오버레이를 살펴보지 않았습니다):

![Kustomize](/assets/img/2024-07-13-HelmvsKustomizewhywhenandhow_5.png)

승자: Kustomize

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

# 라운드 8: CI/CD 도구와의 통합

Helm은 널리 사용되어서 많은 CI/CD 도구에서 기본 지원되는 경우가 많습니다. Kustomize 지원이 확대되고 있지만 아직까지는 널리 사용되지 않습니다.

승자: Helm

# 라운드 9 (최종): 하위 구성요소와 종속성

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

Helm은 의존성 처리를 자체적으로 지원합니다. 만약 차트가 몇 가지 선행 조건(데이터베이스, 캐시 서버, OAuth 서비스 등)을 필요로 한다면, Chart.yaml 파일에 간단히 추가할 수 있습니다. Helm은 메인 차트를 실행하기 전에 이러한 의존성이 다운로드되고 사용 가능하도록 합니다. 또한 필요한 버전을 선택할 수도 있습니다. 반면 Kustomize는 이를 완전히 수동으로 사용자 측에서 처리해야 합니다.

승자: Helm

# 우승자는 (북 북북)

![Image](https://miro.medium.com/v2/resize:fit:996/1*n4fLCuSSkQS0BQoF4brdYQ.gif)

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

## 헬름!

여기에서는 승자나 패자가 없어요. 각 도구마다 장단점이 있거든요. 프로젝트에서 이루고자 하는 바, 그 크기, 배포해야 하는 환경의 수, 복잡성에 따라 선택이 달라집니다. 이 "대결"은 그저 두 도구 간의 차이를 보여주기 위한 것이었을 뿐, 이기나 지는 것을 주장하려 한 것은 아니에요.

그렇다면, 많은 프로젝트들이 실제로 두 도구를 같은 코드베이스에서 함께 사용하고 있어요. 하지만 Kustomize의 이 기능을 논의하기에는 이 기사가 너무 길어요. 하지만 다음 링크에서 관련 문서를 확인해볼 수 있어요: [https://github.com/kubernetes-sigs/kustomize/blob/master/examples/chart.md](https://github.com/kubernetes-sigs/kustomize/blob/master/examples/chart.md)

# 결론

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

Helm과 Kustomize는 같은 목적을 가지고 있습니다: 많은 종속적인 YAML 매니페스트가 있는 대규모 응용 프로그램을 DevOps 방식으로 쉽게 배포할 수 있게 하는 것입니다. 그러나 각 도구마다 다른 돋보는 장점이 있는데요. 이 글에서는 두 도구를 비교하여 각각의 장단점을 살펴보았습니다. 다음 프로젝트에서 Helm 또는 Kustomize를 사용할지 선택하는 것은 여러 요인에 크게 달려 있지만, 이 글이 올바른 결정을 내리는 데 도움이 되기를 바랍니다.

![Helm vs Kustomize](/assets/img/2024-07-13-HelmvsKustomizewhywhenandhow_6.png)

Helm과 Kustomize에 관한 이 글이 유용하게 느껴지셨기를 바라요. Helm에 대해 더 심층적으로 알아보고 숙련된 프로가 되고 싶으시다면, Udemy에서 제가 강의하는 포괄적인 강의 'Helm — 쿠버네티스 패키지 매니저 실습 강의'를 강력히 추천드립니다. 모든 수준의 학습자를 위해 구성된 이 강의는 수많은 실습 예제와 통찰력 있는 팁으로 가득 차 있습니다. 지금 바로 Helm 마스터링을 시작하려면 여기를 클릭해보세요!
