---
title: "백스테이지 Kubernetes 플러그인 사용자 정의하기"
description: ""
coverImage: "/assets/img/2024-05-17-CustomizingtheBackstageKubernetesPlugin_0.png"
date: 2024-05-17 03:48
ogImage:
  url: /assets/img/2024-05-17-CustomizingtheBackstageKubernetesPlugin_0.png
tag: Tech
originalTitle: "Customizing the Backstage Kubernetes Plugin"
link: "https://medium.com/itnext/customizing-the-backstage-kubernetes-plugin-1c8e2d7ad802"
isUpdated: true
---

백스테이지의 새로운 백엔드 시스템에서 쿠버네티스 플러그인을 사용자 정의하는 방법 소개

![이미지](/assets/img/2024-05-17-CustomizingtheBackstageKubernetesPlugin_0.png)

# 소개

스포티파이에서 개발한 백스테이지는 다양한 도구와 인터페이스를 통합하여 응용 프로그램 관리를 간편화하는 통합 플랫폼입니다. 이 글에서는 백스테이지의 아키텍처와 쿠버네티스 플러그인을 살펴보며 사용자 정의 옵션이 작업 흐름을 최적화하고 쿠버네티스 리소스의 중앙 집중화된 보기를 제공하는 방법을 소개합니다. 실용적인 예제를 통해 독자들은 백스테이지가 어떻게 응용 프로그램 관리를 혁신할 수 있는지 발견할 것입니다.

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

# Backstage란 무엇인가요?

많은 사람들이 자신의 애플리케이션에 대한 포괄적인 정보를 제공하는 도구가 필요합니다. 예를 들어, 각각의 애플리케이션은 CI/CD 파이프라인, Kubernetes 클러스터, 그리고 기타 여러 가지 문서를 가지고 있습니다. CI/CD 파이프라인을 관리하려면 Jenkins, GitLab 또는 기타 도구를 사용할 수 있습니다. Kubernetes 클러스터에 접속하여 애플리케이션 상태를 확인하려면 kubectl이나 Kubernetes 대시보드, 또는 기타 유사한 도구가 필요할 것입니다. 그리고 문서를 확인하기 위해서는 처리된 .md 파일에 접근하거나 Confluence를 방문하여 애플리케이션 문서를 볼 수 있을 것입니다. 그러나 만약 이 모든 정보를 한 곳에서 볼 수 있다면 어떨까요? Backstage는 여러 측면에서 당신의 애플리케이션에 대한 포괄적인 정보를 만들 수 있게 도와주는 도구입니다.

# Backstage 아키텍처

Backstage는 세 가지 구성 요소로 간단한 아키텍처를 가지고 있습니다:

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

- 백스테이지 프론트엔드
- 백스테이지 백엔드
- 데이터베이스

![이미지](/assets/img/2024-05-17-CustomizingtheBackstageKubernetesPlugin_1.png)

# 백스테이지의 Kubernetes 플러그인

백스테이지에는 응용 프로그램의 포괄적인 뷰를 만드는 데 사용할 수 있는 많은 플러그인이 있습니다. 몇 가지 플러그인은 프론트엔드 및 백엔드에 추가해야 합니다. Kubernetes 플러그인과 같은 경우입니다. Kubernetes 플러그인의 설치에 대한 공식 문서는 매우 상세하며 다음 링크에서 확인할 수 있습니다:

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

# Kubernetes 플러그인 사용자 정의

Kubernetes 플러그인에는 여러 모듈이 있고, 각각을 사용자 정의할 수 있습니다. Kubernetes 플러그인의 다음 동작 중 일부를 사용자 정의할 수 있습니다:

- 클러스터 제공자: 이 모듈은 클러스터를 캐싱하고 주기적으로 새로 고칩니다. credentials를 인수로 전달하는 getClusters(credentials) 함수가 있으며 클러스터 목록이 필요할 때 호출됩니다.
- 사용자 정의 리소스: 이 모듈은 Kubernetes 클러스터에서 사용자 정의 리소스 목록을 검색합니다.
- 객체 제공자: 이 인터페이스는 엔티티와 관련된 Kubernetes 객체 및 사용자 정의 리소스를 검색하기 위한 메서드를 정의합니다. pods, services, configmaps와 같은 일반 Kubernetes 객체의 기본 목록이 있습니다.
- Fetcher: Fetcher는 카탈로그-info.yaml 파일 내에서 정의된 주석을 기반으로 Kubernetes 리소스를 검색하는 역할을 맡습니다. 검색된 리소스를 장식하고 반환합니다.
- 서비스 로케이터: 이 컨텍스트는 서비스 로케이터 요청을 처리하며, 가져올 객체 유형, 사용자 정의 리소스, 자격 증명 등을 포함합니다.
- 프록시: 프록시는 중간자 역할을 수행하여 Backstage에서 Kubernetes API 서버로 요청을 전달합니다. 프록시에서 요청 또는 응답의 내용을 수정할 수도 있습니다.
- 인증 전략 맵: 인증 전략 맵은 인증 전략을 식별자 또는 키와 연결합니다. 클러스터 세부 정보 또는 인증 메타데이터와 같은 기준에 따라 인증 전략을 관리하고 검색하는 데 사용될 수 있습니다.

# Fetcher(검색기) 사용자 정의: 다중 Namespace 로켸터

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

이 기사에서는 Kubernetes 클러스터에서 쿼리를 가져 오고 일부 동작을 변경하는 Fetcher 모듈의 사용자 정의에 중점을두려고합니다. 다음 GitHub 링크에서 기본 Fetcher 모듈을 찾을 수 있습니다:

때로는 보안 문제로 Kubernetes 클러스터에 대한 클러스터 역할 서비스 계정을 만들 수없으며 네임 스페이스 범위의 서비스 계정 만 만들 수 있습니다. 이 경우 다양한 네임 스페이스에서 다른 파드를로드해야하며 backstage.io/kubernetes-namespace 필드 내에 모든 네임 스페이스를 하나씩 지정해야합니다. 이를 달성하기 위해 컴포넌트를 주석 처리하고 다양한 네임 스페이스에서 파드를로드해야합니다. 구체적으로 KubernetesFetcher.ts 파일을 사용자 정의해야합니다.

예를 들어, 다음 catalog-info.yaml 파일에서 kubernetes-namespace 필드에 쉼표로 구분 된 두 개의 네임 스페이스를 포함하는 것을 볼 수 있습니다. 이 두 네임 스페이스에서 파드를로드하려고합니다.

apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
name: order-service
description: 주문 서비스
links: - title: 웹 사이트
url: https://docs.spring.io/spring-cloud-config/docs/current/reference/html/
annotations:
backstage.io/techdocs-ref: dir:.
lighthouse.com/website-url: https://docs.spring.io/spring-cloud-config/docs/current/reference/html/
'backstage.io/kubernetes-label-selector': 'app=order-service'
'backstage.io/kubernetes-namespace': 'spring-cloud-config-dev, spring-cloud-config-prod'
'backstage.io/kubernetes-cluster': dev-cluster
spec:
type: 서비스
owner: me@example.com
lifecycle: POC

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

이를 달성하기 위해 fetchObjectsForService 함수에서 약간의 변경을 해야합니다. 그러나 npm 모듈에서 내보내지 않았기 때문에 KubernetesClientBasedFetcher 클래스를 직접 확장할 수 없습니다. 대신 해당 클래스를 복사하고 일부 동작을 수정해야 합니다. 아래는 packages/backend/src/plugins/CustomKubernetesClientBasedFetcher.ts 파일에 있는 사용자 정의 모듈의 예시입니다:

```js
export class CustomKubernetesClientBasedFetcher implements KubernetesFetcher {
  private readonly logger: LoggerService;
  constructor({ logger }: KubernetesClientBasedFetcherOptions) {
    this.logger = logger;
  }

  fetchObjectsForService(
    params: ObjectFetchParams,
  ): Promise<FetchResponseWrapper> {
    const namespaces = params.namespace ? params.namespace.split(",") : ["default"];

    const fetchResults = Array.from(params.objectTypesToFetch)
      .concat(params.customResources)
      .flatMap(({ objectType, group, apiVersion, plural }) =>
        namespaces.map(namespace =>
          this.fetchResource(
            params.clusterDetails,
            params.credential,
            group,
            apiVersion,
            plural,
            namespace.trim(),
            params.labelSelector,
          ).then(
              ....
          )
        )
      );

    return Promise.all(fetchResults).then(fetchResultsToResponseWrapper);
  }
```

위 스니펫의 전체 코드는 여기에서 확인할 수 있습니다:

https://gist.github.com/mlkmhd/dc8a97449777b7dc0c30bff7b032e4d5

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

한 가지 더 해야 할 일이 있어요. 패키지/백엔드(src/index.ts) 파일을 수정하여 새로운 사용자 정의 모듈을 추가해야 해요. 아래와 같이요:

```js
...

import { kubernetesFetcherExtensionPoint } from '@backstage/plugin-kubernetes-node';
import { CustomKubernetesClientBasedFetcher } from './plugins/CustomKubernetesClientBasedFetcher';

...

// 쿠버네티스 플러그인
export const kubernetesModuleCustomFetcher = createBackendModule({
  pluginId: 'kubernetes',
  moduleId: 'custom-fetcher',
  register(env) {
    env.registerInit({
      deps: {
        kubernetes: kubernetesFetcherExtensionPoint,
        logger: coreServices.logger,
      },
      async init({ kubernetes, logger }) {
        kubernetes.addFetcher(
          new CustomKubernetesClientBasedFetcher({
            logger: logger,
          })
        );
      },
    });
  },
});

backend.add(import('@backstage/plugin-kubernetes-backend/alpha'));
backend.add(kubernetesModuleCustomFetcher);

backend.start();
```

또한, 다른 네임스페이스의 역할에 연결된 서비스 계정을 생성하여 다른 팟에 액세스할 수 있도록 해야 해요:

<img src="/assets/img/2024-05-17-CustomizingtheBackstageKubernetesPlugin_2.png" />

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

서비스 계정은 backstage 네임스페이스 내에 있어야 합니다:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: backstage-sa
  namespace: backstage-ns
```

B 네임스페이스 내의 역할은 다음과 같을 수 있습니다:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: backstage-role
  namespace: b-ns
rules:
  - apiGroups: [""]
    resources:
      - pods
      - pods/log
      - configmaps
      - services
      - limitranges
      - resourcequotas
    verbs:
      - get
      - list
      - watch
  - apiGroups: ["apps"]
    resources:
      - deployments
      - replicasets
      - statefulsets
      - daemonsets
    verbs:
      - get
      - list
      - watch
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

C 네임스페이스 내부의 롤 바인딩은 다음과 같을 수 있어요:

```js
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: backstage-role-binding
  namespace: b-ns
subjects:
- kind: ServiceAccount
  name: backstage-sa
  namespace: backstage-ns
roleRef:
  kind: Role
  name: backstage-role
  apiGroup: rbac.authorization.k8s.io
```

C 네임스페이스 또는 각 새로운 네임스페이스에 대해 롤과 롤 바인딩을 생성해야 해요. 이렇게 하면 해당 파드에 액세스하여 백스테이지 서비스 계정에 연결할 수 있어요. 그리고 이후에 app-config.yaml 파일 내에서 Kubernetes 플러그인을 아래와 같이 구성해야 해요:

```js
...
kubernetes:
  serviceLocatorMethod:
    type: 'multiTenant'
  clusterLocatorMethods:
    - type: 'config'
      clusters:
        - url: https://kubernetes-cluster-api-server.example.com
          name: dev-cluster
          authProvider: 'serviceAccount'
          skipTLSVerify: true
          serviceAccountToken: ${K8S_DEV_TOKEN}
...
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

그러면 다음 명령어를 실행하여 애플리케이션을 빌드하고 실행할 수 있어요:

```js
$ cd backstage
$
$
$ yarn install
[1/5] package.json 유효성 검사 중...
[2/5] 패키지 해결 중...
success 이미 최신 상태입니다.
완료: 0.92초
$
$
$ yarn dev --config app-config.yaml
[0] app-config.yaml에서 구성 로드됨, app-config.local.yaml
[0] <i> [webpack-dev-server] 프로젝트가 실행 중:
[0] <i> [webpack-dev-server] Loopback: http://localhost:3000/
[0] <i> [webpack-dev-server] 웹팩이 아닌 내용은 '/home/coder/ecfd-backstage/packages/app/public' 디렉터리에서 제공됨
[0] <i> [webpack-dev-server] 404에는 '/index.html'로 대체함
[0] <i> [webpack-dev-middleware] 번들 완료 대기중: /
[1] MergedConfigSource에서 설정 로드됨
[1] 2024-05-12T22:26:37.074Z backstage 정보 구성 내에 레드액트될 2개의 새로운 시크릿 발견됨
[1] 2024-05-12T22:26:37.082Z rootHttpRouter 정보 :7007에서 수신 대기중
...
```

그런 다음 다음 catalog-info.yaml 파일을 backstage 구성에 추가해주세요:

```js
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: order-service
  description: 주문 서비스
  links:
    - title: 웹사이트
      url: https://docs.spring.io/spring-cloud-config/docs/current/reference/html/
  annotations:
    backstage.io/techdocs-ref: dir:.
    lighthouse.com/website-url: https://docs.spring.io/spring-cloud-config/docs/current/reference/html/
    'backstage.io/kubernetes-label-selector': 'app=order-service'
    'backstage.io/kubernetes-namespace': 'spring-cloud-config-dev,spring-cloud-config-prod'
    'backstage.io/kubernetes-cluster': dev-cluster
spec:
  type: 서비스
  owner: me@example.com
  lifecycle: POC
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

대시보드 안에 이렇게 테이블 태그를 변경해보세요:

<img src="/assets/img/2024-05-17-CustomizingtheBackstageKubernetesPlugin_3.png" />

위 이미지에서 order-service는 spring-cloud-config-dev 네임스페이스에만 배포되어 있습니다. 그러나 이 서비스를 spring-cloud-config-prod 네임스페이스에 배포하면 거기서도 볼 수 있을 겁니다.

이 글에서 사용된 모든 다이어그램은 다음 저장소에서 찾아볼 수 있습니다: [링크입니다.]

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

이 글은 Spotify가 개발한 Backstage의 Kubernetes 플러그인 내에서 사용자 정의가 어떻게 응용 프로그램 관리를 향상시키는지를 탐구합니다. Kubernetes 리소스의 통합된 보기를 제공함으로써 작업 흐름을 최적화하고 특정 요구 사항을 수용하는 방법에 대해 알 수 있습니다. Backstage의 아키텍처와 사용자 정의 옵션을 자세히 살펴보면, Kubernetes 클러스터에서 데이터를 검색하기 위해 Fetcher 모듈을 사용자 정의할 수 있는 내용을 다룹니다. 이를 통해 보안 제약 조건이 있는 상황에서도 여러 네임스페이스의 파드에 액세스할 수 있게 됩니다.

# 블로그 후원하기 🍵

내 무료 기술 블로그를 즐기고 가치 있게 여기신다면, 여기에서 커피 한 잔 사주시는 것을 고려해주세요. 여러분의 지원은 품질 높은 글과 콘텐츠를 더 많이 제작하는 데 큰 도움이 됩니다. 제 코드를 개선하는 데 대한 피드백이나 제안 사항이 있으면, 이 게시물에 댓글을 남기거나 LinkedIn 메시지를 보내주세요.
