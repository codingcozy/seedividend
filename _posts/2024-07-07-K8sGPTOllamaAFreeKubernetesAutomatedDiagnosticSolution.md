---
title: "K8sGPT  Ollama 무료 Kubernetes 자동 진단 솔루션"
description: ""
coverImage: "/assets/img/2024-07-07-K8sGPTOllamaAFreeKubernetesAutomatedDiagnosticSolution_0.png"
date: 2024-07-07 23:42
ogImage:
  url: /assets/img/2024-07-07-K8sGPTOllamaAFreeKubernetesAutomatedDiagnosticSolution_0.png
tag: Tech
originalTitle: "K8sGPT + Ollama: A Free Kubernetes Automated Diagnostic Solution"
link: "https://medium.com/@addozhang/k8sgpt-ollama-a-free-kubernetes-automated-diagnostic-solution-d453b63f112f"
isUpdated: true
---

<img src="/assets/img/2024-07-07-K8sGPTOllamaAFreeKubernetesAutomatedDiagnosticSolution_0.png" />

지난 주말에 내 블로그 초고를 확인하다가 이 글을 발견했어. 약 1년 전에 "Kubernetes 자동 진단 도구: k8sgpt-operator"이라는 글(중국어로 게시)을 쓴 것을 기억해. 나의 미루기 습관이 비상 상태에 이르렀다고 느꼈어. 처음에는 K8sGPT + LocalAI를 사용할 계획이었지만, Ollama를 시험해본 후 더 사용하기 편리하다는 것을 알았어. Ollama는 OpenAI API도 지원하므로, Ollama를 사용하게 결정했어.

k8sgpt-operator을 소개하는 글을 게시한 후에 일부 독자들이 OpenAI 사용에 높은 진입 장벽을 언급했어. 이 문제는 정말 어려운 문제지만, 극복할 수는 있어. 하지만, 이 글은 그 문제를 해결하는 것이 아니라 OpenAI 대안인 Ollama를 소개하는 것이야. 작년 말에 k8sgpt가 CNCF Sandbox에 들어갔어.

# 1. Ollama 설치하기

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

![2024-07-07-K8sGPTOllamaAFreeKubernetesAutomatedDiagnosticSolution_1.png](/assets/img/2024-07-07-K8sGPTOllamaAFreeKubernetesAutomatedDiagnosticSolution_1.png)

Ollama는 로컬이나 클라우드에서 쉽게 다양한 대형 모델을 설치하고 실행할 수 있게 해주는 오픈소스 대형 모델 도구입니다. 매우 사용자 친화적이며 간단한 명령어로 실행할 수 있습니다. macOS에서는 homebrew를 이용하여 한 줄의 명령어로 간편하게 설치할 수 있습니다:

```js
brew install ollama
```

최신 버전은 0.1.44입니다.

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
ollama -v
경고: 실행 중인 Ollama 인스턴스에 연결할 수 없습니다.
경고: 클라이언트 버전은 0.1.44입니다.
```

Linux에서는 공식 스크립트를 사용하여도 설치할 수 있습니다.

```js
curl -sSL https://ollama.com/install.sh | sh
```

Ollama를 시작하고 컨테이너나 K8s 클러스터에서 접근할 수 있도록 환경 변수를 통해 청취 주소를 0.0.0.0으로 설정하세요.

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
OLLAMA_HOST=0.0.0.0 ollama start
```

```js
...
time=2024-06-16T07:54:57.329+08:00 level=INFO source=routes.go:1057 msg="127.0.0.1:11434 포트에서 수신 대기 중 (버전 0.1.44)"
time=2024-06-16T07:54:57.329+08:00 level=INFO source=payload.go:30 msg="임베디드 파일 추출 중" dir=/var/folders/9p/2tp6g0896715zst_bfkynff00000gn/T/ollama1722873865/runners
time=2024-06-16T07:54:57.346+08:00 level=INFO source=payload.go:44 msg="Dynamic LLM 라이브러리 [metal]"
time=2024-06-16T07:54:57.385+08:00 level=INFO source=types.go:71 msg="추론 계산 중" id=0 library=metal compute="" driver=0.0 name="" total="21.3 GiB" available="21.3 GiB"
```

# 2. 대형 모델 다운로드 및 실행하기

4월에 Meta에서 오픈 소스로 공개된 인기 있는 대형 모델 중 하나인 Llama3. Llama3에는 8B 및 70B 두 가지 버전이 있습니다.

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

맥북에서 실행 중이에요, 그래서 8B 버전을 선택했어요. 8B 버전은 4.7GB 용량이고 빠른 인터넷 연결로 3-4분 정도 소요돼요.

```js
ollama run llama3
```

내 32GB 메모리를 가진 M1 Pro에서 시작하는 데 약 12초 소요돼요.

```js
time=2024-06-17T09:30:25.070+08:00 level=INFO source=server.go:572 msg="llama runner started in 12.58 seconds"
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

각 쿼리는 약 14초가 걸립니다.

```js
curl http://localhost:11434/api/generate -d '{
  "model": "llama3",
  "prompt": "왜 하늘은 파란가요?",
  "stream": false
}'
```

```js
....
"total_duration":14064009500,"load_duration":1605750,"prompt_eval_duration":166998000,"eval_count":419,"eval_duration":13894579000}
```

# 3. K8sGPT CLI 백엔드 구성하기

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

만약 k8sgpt-operator를 테스트하고 싶다면, 이 단계를 건너 뛰어도 괜찮아요.

k8sgpt에 백엔드로 Ollama REST API를 사용할 거에요. 이것은 추론 제공자로써 작동할 거예요. 여기서 백엔드 유형은 localai로 선택했어요. LocalAI는 OpenAI API와 호환되며, 실제 제공자는 여전히 Llama를 운영하는 Ollama일 거예요.

```js
k8sgpt auth add --backend localai --model llama3 --baseurl http://localhost:11434/v1
```

기본 제공자로 설정하세요.

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

```bash
k8sgpt auth default --provider localai
기본 공급자를 localai로 설정했습니다.
```

테스트 중:

k8s에서 image-not-exist 이미지를 사용하여 파드를 생성합니다.

```bash
kubectl get po k8sgpt-test
이름           준비 상태   상태             다시 시작    시간
k8sgpt-test   0/1        ErrImagePull     0          6초
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

k8sgpt 에러를 분석해보세요.

```js
k8sgpt analyze --explain --filter=Pod --namespace=default --output=json
```

```js
{
  "provider": "localai",
  "errors": null,
  "status": "ProblemDetected",
  "problems": 1,
  "results": [
    {
      "kind": "Pod",
      "name": "default/k8sgpt-test",
      "error": [
        {
          "Text": "Back-off pulling image \"image-not-exist\"",
          "KubernetesDoc": "",
          "Sensitive": []
        }
      ],
      "details": "Error: Back-off pulling image \"image-not-exist\"\n\nSolution: \n1. Check if the image exists on Docker Hub or your local registry.\n2. If not, create the image using a Dockerfile and build it.\n3. If the image exists, check the spelling and try again.\n4. Verify the image repository URL in your Kubernetes configuration file (e.g., deployment.yaml).",
      "parentObject": ""
    }
  ]
}
```

# 4. k8sgpt-operator 배포 및 설정하기

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

k8sgpt-operator은 클러스터 내의 k8sgpt를 자동화할 수 있어요. Helm을 사용해서 설치할 수 있답니다.

```js
helm repo add k8sgpt https://charts.k8sgpt.ai/
helm repo update
helm install release k8sgpt/k8sgpt-operator -n k8sgpt --create-namespace
```

k8sgpt-operator는 두 개의 CRD를 제공해요: K8sGPT는 k8sgpt를 구성하고, Result는 분석 결과를 출력하죠.

```js
kubectl api-resources | grep -i gpt
k8sgpts  core.k8sgpt.ai/v1alpha1  true  K8sGPT
results  core.k8sgpt.ai/v1alpha1  true  Result
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

Ollama의 IP 주소를 baseUrl로 사용하여 K8sGPT를 구성하세요.

```bash
kubectl apply -n k8sgpt -f - << EOF
apiVersion: core.k8sgpt.ai/v1alpha1
kind: K8sGPT
metadata:
  name: k8sgpt-ollama
spec:
  ai:
    enabled: true
    model: llama3
    backend: localai
    baseUrl: http://198.19.249.3:11434/v1
  noCache: false
  filters: ["Pod"]
  repository: ghcr.io/k8sgpt-ai/k8sgpt
  version: v0.3.8
EOF
```

K8sGPT CR을 만든 후, 연산자는 자동으로 관련 Pod를 생성합니다. 결과 CR을 확인하면 동일한 결과를 확인할 수 있습니다.

```bash
kubectl get result -n k8sgpt -o jsonpath='{.items[].spec}' | jq .
{
  "backend": "localai",
  "details": "에러: 쿠버네티스가 이미지 \"image-not-exist\"를 가져 올 수 없습니다.\n\n해결 방법: \n1. 이미지가 실제로 존재하는지 확인하세요.\n2. 그렇지 않은 경우, 이미지를 만들거나 대체 이미지를 사용하세요.\n3. 이미지가 실제로 존재하는 경우, Docker 데몬 및 레지스트리가 올바르게 구성되었는지 확인하세요.",
  "error": [
    {
      "text": "이미지 \"image-not-exist\"를 가져 오는 중단"
    }
  ],
  "kind": "Pod",
  "name": "default/k8sgpt-test",
  "parentObject": ""
}
```
