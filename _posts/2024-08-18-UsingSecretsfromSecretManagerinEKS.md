---
title: "EKS에서 Secret Manager의 비밀 정보 활용하기"
description: ""
coverImage: "/assets/img/2024-08-18-UsingSecretsfromSecretManagerinEKS_0.png"
date: 2024-08-18 11:30
ogImage:
  url: /assets/img/2024-08-18-UsingSecretsfromSecretManagerinEKS_0.png
tag: Tech
originalTitle: "Using Secrets from Secret Manager in EKS"
link: "https://medium.com/@asrathore08/using-secrets-from-secret-manager-in-eks-8b9fa99d7431"
isUpdated: true
updatedAt: 1724032856385
---

EKS에서 민감한 정보를 안전하게 관리하세요.

Kubernetes Secrets Store CSI Driver용 AWS Secrets and Configuration Provider(ASCP)를 사용하면 Secrets Manager에 저장된 시크릿 및 Parameter Store에 저장된 매개변수를 EKS 팟에 마운트된 파일로 표시할 수 있습니다.

![이미지](/assets/img/2024-08-18-UsingSecretsfromSecretManagerinEKS_0.png)

## ASCP 사용 방법

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

- AWS Secrets Manager를 사용하여 비밀을 만드세요.
- AWS Secrets Manager에서 비밀을 검색하는 IAM 정책을 만드세요.
- 특정 네임스페이스의 파드에서 비밀에 액세스 권한을 제한하기 위해 IRSA를 사용하세요.
- provider: aws를 사용하여 SecretProviderClass 사용자 지정 리소스를 생성하고 배포하세요.
- 앞에서 구성한 SecretProviderClass에 기초하여 볼륨을 마운트할 파드를 배포하세요.
- 마운트된 볼륨 또는 ENV로부터 컨테이너 내에서 비밀에 액세스하세요.

# Kubernetes Secrets Store CSI 드라이버용 ASCP (AWS Secrets and Configuration Provider)

EKS 파드에서 Secrets Manager를 통합하려면 Kubernetes Secrets Store CSI 드라이버용 AWS Secrets and Configuration Provider (ASCP)를 설치해야 합니다. ASCP를 사용하면 파드 안에 마운트된 파일로 비밀을 저장할 수 있으며, 이를 위해 Secrets 및 워크로드가 해당 비밀을 사용하는 방법에 대한 정보를 포함하는 SecretProviderClass YAML 파일을 만들어야 합니다.

## 솔루션의 구성요소

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

- Secrets Store CSI Driver은 모든 Kubelet 인스턴스와 통신하는 데몬세트입니다. CSI 드라이버는 외부 Secrets Store에서 마운트 콘텐츠를 가져오기 위해 제공자와 gRPC를 사용하여 통신합니다.
- ASCP는 pod 식별 정보를 검색하고 IAM 역할로의 ID 교환을 통해 서비스 계정(IRSA)을 위한 IAM 역할을 얻습니다. 이를 통해 우리는 EKS 클러스터의 특정 namespace의 특정 pod에 대한 시크릿이나 매개변수에 대한 액세스를 제한할 수 있습니다. 그런 다음 AWS Secrets Manager 서비스로 시크릿을 로드하기 위해 API 호출을 수행합니다.
- ASCP는 로드할 시크릿을 결정하기 위해 SecretProviderClass 매니페스트 파일을 사용하고 마운트된 볼륨에 시크릿 파일을 생성합니다.
- SecretProviderClass는 AWS Secrets Manager의 정보와 일치하는 드라이버 구성 및 특정 매개변수를 제공하는 데 사용되는 네임스페이스 지정된 맞춤 자원입니다.
- SecretProviderClassPodStatus는 Pod와 SecretProviderClass 간의 바인딩을 추적하기 위해 CSI 드라이버에 의해 생성된 Secrets Store CSI Driver의 네임스페이스 리소스입니다. SecretProviderClassPodStatus에는 Pod 마운트에 로드된 현재 객체 버전에 대한 세부 정보가 포함됩니다.
- 선택적인 secretObjects 필드를 사용하여 동기화된 Kubernetes 시크릿 객체의 원하는 상태를 정의할 수 있습니다. Kubernetes Secrets와 동기화하여 Sync With Kubernetes Secrets를 위해 볼륨 마운트가 필요합니다.

## 솔루션의 작동 방식

- Kubernetes 시크릿과 유사하게 Pod가 시작되거나 다시 시작되면 노드의 kubelet 프로세스는 Pod 사양을 보고 볼륨 마운트 요청이 있는지 확인합니다. kubelet은 CSI 드라이버에 볼륨을 마운트하도록 RPC를 발행합니다. Secrets Store CSI Driver는 SecretProviderClass 맞춤 자원에 지정된 외부 Secrets Store에서 시크릿 콘텐츠를 검색하기 위해 제공자와 gRPC를 통신합니다.
- 그런 다음 볼륨이 tmpfs로 Pod에 마운트되고 시크릿 콘텐츠가 볼륨에 작성됩니다. secretObject가 지정되면 시크릿을 볼륨의 제공된 파일 경로에 작성하고 애플리케이션 Pod에 볼륨을 마운트합니다.
- Pod가 삭제되면 해당 볼륨이 정리되고 삭제됩니다.

## ASCP의 장점

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

ASCP를 통해 AWS Secrets Manager에서 환경 변수로 노출되는 것을 피할 수 있습니다. 단점은 해당 볼륨을 직접 Pod로 마운트하는 것을 요구하기 때문에 그 볼륨을 관리해야 합니다.

## 단점

이 솔루션은 응용 프로그램 코드의 비밀을 안전하게 관리하기 위해 두 개의 데몬 세트가 필요합니다. 이는 리소스 부담을 늘리게 됩니다.

## Secret Store CSI Driver & ASCP 설치하기

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
# Secrets Store CSI Driver 및 ASCP 설치하기
helm repo add secrets-store-csi-driver https://kubernetes-sigs.github.io/secrets-store-csi-driver/charts
helm repo add aws-secrets-manager https://aws.github.io/secrets-store-csi-driver-provider-aws
helm install -n kube-system csi-secrets-store secrets-store-csi-driver/secrets-store-csi-driver
helm install -n kube-system secrets-provider-aws aws-secrets-manager/secrets-store-csi-driver-provider-aws

kubectl -n secrets-store-csi-driver get pods,daemonsets -l app=secrets-store-csi-driver
kubectl -n kube-system get pods,daemonset -l "app=secrets-store-csi-driver-provider-aws"
```

Service Account 및 SecretProviderClass 정의

```js
# Service Account
# ================= #
apiVersion: v1
kind: ServiceAccount
metadata:
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::01234567890:role/my-eks-app-sm-role
  name: my-app-sm-sa
  namespace: my-app-ns
---

# Secret Provider Class 정의
# ================================== #
apiVersion: secrets-store.csi.x-k8s.io/v1
kind: SecretProviderClass
metadata:
  name: my-aws-secrets-provider
  namespace: my-app-ns
spec:
  provider: aws
  parameters:
    region: eu-west-1
    failoverRegion: eu-west-2
    objects: |
      - objectName: "arn:aws:secretsmanager:eu-west-1:111122223333:secret:my-app-secret"
        failoverObject:
          - objectName: "arn:aws:secretsmanager:eu-west-2:111122223333:secret:my-app-secret"
        jmesPath:
            - path: username
              objectAlias: dbusername
            - path: password
              objectAlias: dbpassword
  secretObjects:
    - secretName: my-secret-01
      type: Opaque
      data:
        - objectName: dbusername
          key: db_username_01
        - objectName: dbpassword
          key: db_password_01
```

서비스 프로바이더 클래스의 정의

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
kubectl get SecretProviderClass
```

이것은 예제/데모 앱입니다.

```js
apiVersion: v1
kind: Pod
metadata:
  name: busybox
  namespace: my-app-ns
spec:
  serviceAccountName: my-app-sm-sa
  volumes:
  - name: secrets-store-inline
    csi:
       driver: secrets-store.csi.k8s.io
       readOnly: true
       volumeAttributes:
         secretProviderClass: "my-aws-secrets-provider"
  containers:
  - image: public.ecr.aws/docker/library/busybox:1.36
    command:
      - sleep
      - "3600"
    imagePullPolicy: IfNotPresent
    name: busybox
    volumeMounts:
    - name: secrets-store-inline
      mountPath: "/mnt/secrets-store"
      readOnly: true
    env:
    - name: DB_USERNAME_01
      valueFrom:
        secretKeyRef:
          name: my-secret-01
          key: db_username_01
    - name: DB_PASSWORD_01
      valueFrom:
        secretKeyRef:
          name: my-secret-01
          key: db_password_01
  restartPolicy: Always
```

확인 및 정리

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
kubectl exec -it $(kubectl get pods | awk '/busybox/{print $1}' | head -1) -- cat /mnt/secrets-store/eksSecret;
kubectl describe secrets my-secret-01

# Delete the objects
kubectl delete pod busybox
kubectl delete secretproviderclass eks-demo-aws-secrets
# Uninstall the CRDs
helm uninstall -n kube-system csi-secrets-store
helm uninstall -n kube-system secrets-provider-aws
```

# External Secrets Operator

AWS Secrets Manager를 Kubernetes Secrets와 통합하는 또 다른 방법은 External Secrets를 통해 할 수 있습니다. External Secrets Operator는 AWS Secrets Manager, Google Secrets Manager, Azure Key Vault 등 외부 시크릿 매니저의 Kubernetes Secrets를 관리하는 Kubernetes용 연산자입니다.

External Secrets는 AWS Secrets Manager에서 정보를 읽어와 Kubernetes Secret에 자동으로 값을 주입하는 Kubernetes용 연산자로, 시크릿의 수명 주기를 저장하고 관리하는 추상화를 제공합니다.

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

<img src="/assets/img/2024-08-18-UsingSecretsfromSecretManagerinEKS_1.png" />

- 외부 시크릿 오퍼레이터는 AWS 시크릿 매니저와 같은 외부 시크릿 매니저에 저장된 시크릿을 가져와 암호화된 쿠버네티스 시크릿을 클러스터에 생성합니다.
- 시크릿 스토어에는 외부 시크릿 매니저에 대한 인증 세부 정보가 포함되어 있으며, 이를 통해 외부 시크릿 오퍼레이터가 시크릿에 액세스할 수 있습니다.
- 외부 시크릿 오퍼레이터가 생성한 쿠버네티스 시크릿은 애플리케이션에 필요한 시크릿을 외부 시크릿 매니저에서 가져와 시크릿을 최신 상태로 유지하기 위해 주기적으로 갱신합니다.
- 쿠버네티스 시크릿이 생성되면 애플리케이션에서 시크릿 이름과 시크릿 키를 지정하여 시크릿 값이 매핑된 것을 사용할 수 있습니다.

## 설치

```js
helm repo add external-secrets https://charts.external-secrets.io
helm install external-secrets \
  external-secrets/external-secrets \
    --namespace external-secrets \
    --create-namespace \
    --set installCRDs=true
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

## 주요 구성 요소

- 외부 Secrets Operator (ESO) — 외부 시스템과의 상호 작용을 담당하는 Kubernetes Custom Resource (CRD)입니다. 위에서 언급한 시스템에서 시크릿을 가져와 클러스터 내에서 외부 시크릿 객체로 만듭니다.
- SecretStore — AWS Secrets Manager에서 실제 시크릿을 검색합니다. 클러스터 범위와 네임스페이스 범위의 두 가지 시크릿 스토어 유형이 있습니다.
- External Secret object — Vault, Param store, Secrets store 등을 통해 외부에서 시크릿을 관리할 수 있는 네이티브 Kubernetes 객체입니다.
- ServiceAccount — AWS Secrets Manager에 대한 시크릿 검색을 위한 IRSA를 통해 IAM 역할에 연결된 서비스 어카운트가 필요합니다.

```js
apiVersion: external-secrets.io/v1beta1
kind: ClusterSecretStore
metadata:
  name: "cluster-secret-store"
spec:
  provider:
    aws:
      service: SecretsManager
      region: "eu-west-1"
      auth:
        jwt:
          serviceAccountRef:
            name: "my-app-sm-sa"
            namespace: "my-app-ns"
---
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: my-app-secretstore
  namespace: "my-app-ns"
spec:
  provider:
    aws:
      service: SecretsManager
      region: eu-west-1
      auth:
        jwt:
          serviceAccountRef:
            name: my-app-sm-sa
---

apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: eks-external-secret
  namespace: my-app-ns
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: my-app-secretstore
    kind: SecretStore
  target:
    name: my-cool-k8s-secret-name
    creationPolicy: None
  data:
  - secretKey: username
    remoteRef:
      key: secret-api-key #secretname
      property: username #secretKey
      version: "AWSCURRENT"
  - secretKey: key
    remoteRef:
      key: secret-api-key
      property: key
```

감사합니다! 즐거운 읽기 되세요!
