---
title: "EKS에서 자체 호스팅 LLM을 배포하는 방법 및 그 이유"
description: ""
coverImage: "/assets/img/2024-05-16-HowtoDeployaSelf-HostedLLMonEKSandWhyYouShould_0.png"
date: 2024-05-16 03:39
ogImage: 
  url: /assets/img/2024-05-16-HowtoDeployaSelf-HostedLLMonEKSandWhyYouShould_0.png
tag: Tech
originalTitle: "How to Deploy a Self-Hosted LLM on EKS and Why You Should"
link: "https://medium.com/@eliran89c/how-to-deploy-a-self-hosted-llm-on-eks-and-why-you-should-e9184e366e0a"
---


생산 환경에서 가격이 폭등하는 토큰에 대해 계속 걱정하고 있나요? 외부 업체가 민감한 데이터를 어떻게 처리하는지 걱정되나요? 이 게시물은 자체 호스팅 LLM을 EKS(Elastic Kubernetes Service)에 배포하는 방법을 안내해 드립니다. 이를 통해 제어권과 비용 효율성을 높일 수 있습니다. 우리는 자체 호스팅을 원하는 이유부터 설정에 필수적인 도구 및 지표에 이르기까지 모든 것을 탐구할 것입니다. 게다가 모델과 상호 작용할 수 있는 간단한 채팅 애플리케이션을 설정하는 방법을 따라해 보겠습니다.

![이미지](/assets/img/2024-05-16-HowtoDeployaSelf-HostedLLMonEKSandWhyYouShould_0.png)

# 자체 호스팅이란?

OpenAI나 Anthropic과 같은 공급업체의 고급 언어 모델은 매우 인상적이지만 항상 지갑 친화적이라고 할 수 없습니다. 실험 및 개발은 금융 오퍼레이션팀의 주의를 끌지 않을 수 있지만, 프로덕션으로 전환하면 토큰당 요금 체계와 관련된 비용이 빠르게 누적될 수 있습니다.



크고 비싼 모델들이 있긴 하지만, 언제나 당신의 요구 사항을 평가하고 단순히 큰 모델만을 공략하는 것이 아니라는 점을 염두에 두어야 합니다. 하지만 규모에 따라, 작은 모델도 결국에는 비실 것입니다.

하지만, 돈만을 생각할 필요는 없어요. 자체 호스팅은 다음과 같은 중요한 이점들을 제공합니다:

- 데이터 보안 — 모든 민감한 정보, 특히 개인 식별 정보(PII)는 우리 네트워크 내에서 안전하게 보관됩니다. 이 설정은 데이터를 외부로 보내거나 외부 공급 업체가 데이터를 어떻게 사용할지 걱정할 필요가 없게 합니다.
- 개발자 자유 — 자체 호스팅은 개발자들이 치솟는 비용과 외부 데이터 개인 정보 보호 우려 없이 탐구하고 혁신할 수 있는 자유를 제공합니다. 이 자유는 기술적 실험을 장려하는 창의적인 환경을 지원하여 더 혁신적인 솔루션을 도출하게 됩니다.

GPT-4와 맞먹는 오픈 소스 모델은 많이 찾기 어려울지 몰라도, 보통 GPT-3.5에서 다루는 작업에 적합한 수많은 대안이 있습니다. 이러한 모델 중 일부는 심지어 더 나은 성능을 발휘하면서 더 저렴한 비용으로 제공되고 있습니다. 이를 네트워크에 배포하여 데이터를 제어할 수 있습니다. 무엇보다 중요한 것은 사용량 당 비용을 지불하는 대신 고정 컴퓨팅 가격을 지불하므로 비용을 더 예측 가능하고 관리하기 쉽게 만들 수 있습니다.



# 필요한 도구는 무엇인가요? (그리고 몇 가지 다른 고려 사항)

AWS 및 EKS에 익숙하다고 가정하고, LLM 모델을 제공하는 데 필요한 다른 구성 요소에 초점을 맞추겠습니다. 고려해야 할 주요 영역은 Compute, 추론 및 모델입니다.

## Compute

LLM 추론을 설정할 때 고려해야 할 주요 자원은 GPU입니다. 특히 GPU의 종류와 수량을 고려해야 합니다. 이는 전체 모델이 GPU의 메모리 (VRAM)에 로드되며, 모든 LLM 계산이 GPU에서 수행되기 때문입니다.



 VRAM 양을 추정하려면 이 안내서를 확인하거나 다음과 같은 간단한 생각의 척도를 따르세요: 모델의 매개변수 수(10억 개 단위)를 두 배하여 기본 요구 사항을 얻은 다음, 캐싱과 오버헤드를 커버하기 위해 20%를 추가하세요. 예를 들어, 70억 개의 매개변수를 가진 모델을 이용하려면 VRAM 약 17GB(7 x 2 x 1.2 = 약 16.8 GB)가 한 개 또는 여러 개의 GPU에서 필요합니다.

## 추론

서빙 프레임워크로는 vLLM을 사용할 것입니다. 이는 LLM 모델을 OpenAI 호환 API 서버로 제공하는 데 설계된 오픈 소스 프레임워크입니다. vLLM은 연속 배치를 지원하며, 다중 동시 요청 및 높은 부하를 처리하기에 이상적입니다. 게다가, vLLM은 분산 서빙을 지원하며, 모델을 여러 GPU 또는 노드에서 실행해야하는 경우를 대비합니다. 분산 서빙을 위해 백엔드로 Ray를 사용하며, 이는 대규모 ML 애플리케이션을 실행하기 위한 또 다른 오픈 소스 프레임워크입니다.

## 모델



수백 개의 모델이 Hugging Face에 있습니다. Foundation 모델부터 더 구체적이고 특정 문제를 해결하기 위해 디자인된 Feat-Tuned 버전까지 말이죠. Hugging Face를 인공지능(AI) 및 기계학습(ML) 애플리케이션의 "GitHub"이라고 생각해보세요. 필요한 어떤 모델이나 데이터셋이든 찾을 수 있는 중요한 장소입니다.

모델을 선택할 때 라이선스를 꼭 확인해주세요. Mistral과 같은 일부 모델은 Apache 라이선스 하에 완전히 오픈 소스입니다. 그러나 많은 모델은 상용 라이선스가 적용됩니다. 이 조항을 검토하는 것은 귀하의 법적 및 운영 계획에 부합하는지 확인하는 데 중요합니다.

# 모두 함께 하기 (데모 시간)

이 데모에서 Mistral 7b instruct 0.2 모델을 사용할 것이며, 이는 Apache 라이선스에 따라 완전히 오픈 소스입니다. 이 모델을 처리하기 위해 주로 15센트 미만의 비용이 드는 AWS g6.xlarge 인스턴스에서 실행할 것입니다. 이 인스턴스는 우리가 상의한 VRAM 견적 규칙에 따라 처리하기에 완벽하게 적합한 24GB VRAM을 갖춘 Nvidia L4 GPU가 장착되어 있습니다.



데모 중에는 미국 서부-2 지역에 VPC를 배포하고, Fargate에서 Karpenter가 있는 EKS 클러스터, GPU를 위한 Karpenter 프로바이더 하나 및 표준 노드를 위한 또 다른 하나, Kubernetes에서 GPU를 사용할 수 있도록 Nvidia Driver 플러그인, 그리고 모니터링을 위한 Prometheus와 Grafana가 설정될 것입니다. 이 모든 리소스는 Terraform을 사용하여 설정될 것입니다.

비용에 관해서는, 이 데모 실행에 예상되는 비용은 시간당 약 30~40센트입니다. NAT 게이트웨이, EKS 제어 평면 및 GPU가 장착된 노드를 포함한 모든 노드에 대한 요금이 포함됩니다.

## 0. 전제 조건

데모에 들어가기 전에, 다음을 준비해 두세요:



- AWS 계정 — 데모에서 설치해야 할 VPC, EKS 클러스터 등을 구성할 충분한 권한이 있는 AWS 계정이 필요합니다.
- AWS 자격 증명 — 로컬 환경에서 자격 증명이 올바르게 구성되어 있는지 확인하세요.
- Terraform — 여러분의 컴퓨터에 Terraform이 설치되어 있어야 합니다. 데모에 필요한 AWS 리소스를 프로비저닝하고 관리하는 데 사용될 것입니다.
- Kubectl — Kubernetes 리소스를 관리하기 때문에 Kubectl이 설치되어 있는지 확인하세요.
- HuggingFace 액세스 토큰 — 이 가이드를 따라 Hugging Face에서 모델을 가져오기 위한 API 액세스 토큰을 생성하세요.

## 1. 기본 인프라

- 터미널을 열고 다음을 실행하여 저장소를 클론합니다:

```js
git clone https://github.com/eliran89c/self-hosted-llm-on-eks
```



2. 디렉토리를 변경하세요:

```js
cd self-hosted-llm-on-eks
```

3. (선택사항) 필요에 따라 Terraform 코드를 조정하여 설정을 사용자 정의하세요.

4. Terraform을 초기화하고 인프라를 배포하기 위해 Terraform 구성을 적용하세요 (EKS 클러스터를 배포하는 데 최대 30분 소요될 수 있습니다).



```js
terraform init
terraform apply
```

5. 새로 생성된 EKS 클러스터와 상호 작용하기 위해 Kubectl을 설정하세요.

```js
aws eks update-kubeconfig --region us-west-2 \
    --name self-hosted-llm \
    --alias self-hosted-llm
```

6. Karpenter와 CoreDNS가 실행 중인지 확인하세요.



```js
kubectl get pods --all-namespaces
```

기대되는 출력은 다음과 같아야 합니다:

![image](/assets/img/2024-05-16-HowtoDeployaSelf-HostedLLMonEKSandWhyYouShould_1.png)

7. Karpenter 제공자가 올바르게 설치되었는지 확인하세요:



```js
kubectl get ec2nodeclasses.karpenter.k8s.aws
```

원하는 결과는 사용 가능한 노드 클래스를 표시해야 합니다:

![Available Node Classes](/assets/img/2024-05-16-HowtoDeployaSelf-HostedLLMonEKSandWhyYouShould_2.png)

## 2. vLLM 배포 및 모델 제공



- HuggingFace 모델 페이지로 이동하셔서 모델 약관에 동의해주세요

![이미지](/assets/img/2024-05-16-HowtoDeployaSelf-HostedLLMonEKSandWhyYouShould_3.png)

2. HuggingFace API 액세스 토큰을 사용하여 비밀을 생성하세요:

```js
kubectl create secret generic huggingface-token \
    --from-literal=token=<your_hugging_face_token>
```



- 'your_hugging_face_token'을 실제 Hugging Face API 액세스 토큰으로 대체해주세요.

3. (선택 사항) 배포 파일을 검토하고, 특히 배포 인수 섹션을 확인하세요. 필요에 따라 엔진 인수를 수정하여 특정 요구 사항에 더 잘 맞도록 설정할 수 있습니다. 모든 사용 가능한 엔진 인수 목록을 확인하려면 여기를 참조하세요.

4. vLLM 배포하기:

```js
kubectl apply -f vllm.yaml
```



5. 프로메테우스가 vLLM에서 메트릭을 수집하도록 하려면 ServiceMonitor을 배포하십시오.

```js
kubectl apply -f serviceMonitor.yaml
```

6. vLLM을 배포한 후에는 일반적으로 GPU로 모델을 다운로드하고 로드하는 데 2-3분 정도가 소요됩니다. 이 초기화 단계 중에 무엇이 발생하는지 모니터링하려면 로그를 직접 확인할 수 있습니다.
먼저, 파드가 실행 중인지 확인하십시오:

```js
kubectl get pods
```



아래와 같이 로그를 확인하세요:

```js
kubectl logs -f -l app=vllm
```

모델이 로딩되고 준비되면, 로그에 다음 메시지가 표시될 것을 기대할 수 있습니다:

![이미지](/assets/img/2024-05-16-HowtoDeployaSelf-HostedLLMonEKSandWhyYouShould_4.png)



7. 새 터미널을 열고 포트 포워딩을 설정하여 포트 8000에서 OpenAI 호환 API 엔드포인트와 상호 작용할 수 있습니다:

```js
kubectl port-forward svc/vllm 8000:8000
```

8. 모든 준비가 되었으므로, LLM을 테스트하기 위해 표준 OpenAI curl 명령을 사용하여 쿼리를 보내보세요. 아래는 예시입니다:

```js
curl -X POST http://localhost:8000/v1/chat/completions \
-H "Content-Type: application/json" \
-d '{
      "model": "mistralai/Mistral-7B-Instruct-v0.2",
      "messages": [{"role": "user", "content": "프랑스의 수도는 무엇인가요?"}]
    }'
```



정보를 성공적으로 검색했는지 확인하기 위해 예상 결과는 다음과 같습니다:

<img src="/assets/img/2024-05-16-HowtoDeployaSelf-HostedLLMonEKSandWhyYouShould_5.png" />

## 3. 모델과 상호작용하는 간단한 채팅 애플리케이션 설정

- 다음을 실행하여 새 Python 가상 환경을 만듭니다:



```js
python3 -m venv .venv
```

2. 가상 환경을 활성화합니다:

```js
source .venv/bin/activate   # 리눅스 또는 맥OS
.venv\Scripts\activate      # 윈도우
```

3. 필요한 파이썬 패키지를 설치하려면 다음을 실행하세요:




```bash
pip install -r requirements.txt
```

이 패키지에는 API 요청을 위한 OpenAI Python 클라이언트와 웹 인터페이스를 만들기 위한 Gradio가 포함되어 있습니다.

4. 아래 명령어를 실행하여 애플리케이션을 시작하세요:

```bash
python chat.py
```



5. 어플리케이션이 실행되면 웹 브라우저를 열고 http://localhost:7860/ 으로 이동하세요.

![이미지](/assets/img/2024-05-16-HowtoDeployaSelf-HostedLLMonEKSandWhyYouShould_6.png)

# 모델 모니터링

LLM에서는 모델의 대기 시간(Latency) 및 처리량(Throughput)을 모니터링하고 측정하는 여러 중요한 지표가 있습니다. 이러한 지표들은 성능을 최적화하고 모델이 효율적으로 작동하는 것을 보장하기 위해 중요합니다. 아래는 고려해야 할 주요 지표입니다:



첫 번째 토큰 생성 시간(TFFT) - 이 지표는 요청을 제출한 후 모델이 응답의 첫 번째 토큰을 생성하는 데 걸리는 시간을 측정합니다. 이는 모델의 초기 반응성을 나타내는 중요한 지표로, 사용자 상호 작용 애플리케이션에서 응답 시간이 사용자 경험에 영향을 미치는 경우에 특히 중요합니다.

출력 토큰 시간(TFOT) - 위와 유사하게, 이 지표는 처음 토큰 생성 후 각 후속 토큰을 생성하는 데 걸리는 시간을 추적합니다. 이는 모델이 시작된 후 계속해서 내용을 처리하고 생성하는 데 효율성을 이해하는 데 도움이 됩니다. 이로써 실행량 성능에 대한 통찰을 얻을 수 있습니다.

프롬프트/생성 토큰 초당 - 이 지표는 모델이 초당 처리하거나 생성하는 토큰 수를 측정합니다. 이는 모델의 처리량 용량을 평가하는 데 필수적인 지표이며, 높은 비율은 더 효율적인 모델을 나타내며 더 많은 입력을 처리하거나 시간이 적게 소요되면서 더 많은 컨텐츠를 생성할 수 있는 것을 의미합니다.

vLLM은 이러한 지표(및 기타 지표)를 /metrics/endpoint를 통해 내보냅니다. 이미 Prometheus에 스크래퍼를 구성했으며, 이제 Grafana에서 대시보드를 설정하여 이러한 지표를 시각화하고 모델의 성능을 실시간으로 더 잘 이해할 수 있도록 합시다.



## LLM 메트릭을 모니터링하기 위한 Grafana 대시보드 설정

- 브라우저를 통해 Grafana 대시보드에 액세스하려면 먼저 Grafana 팟을 포트 포워딩해야 합니다. 터미널에서 다음 명령을 입력하세요:

```js
kubectl port-forward -n kube-prometheus-stack \
  service/kube-prometheus-stack-grafana 8080:80
```

2. 웹 브라우저를 열고 http://localhost:8080으로 이동하세요. 로그인 페이지가 나타날 것입니다. 사용자 이름은 "admin"이고 기본 비밀번호는 "prom-operator"입니다.



3. 한 번 로그인한 후, 오른쪽 상단 막대의 “+" 아이콘을 클릭하고 “대시보드 가져오기"를 선택합니다.

![image](/assets/img/2024-05-16-HowtoDeployaSelf-HostedLLMonEKSandWhyYouShould_7.png)

4. GitHub 저장소의 루트 폴더에 있는 grafana-dashboard.json이라는 JSON 파일을 업로드하고 “가져오기"를 클릭합니다.

![image](/assets/img/2024-05-16-HowtoDeployaSelf-HostedLLMonEKSandWhyYouShould_8.png)



5. 대시보드 상단 좌측에 있는 드롭다운 필터를 사용하여 원하는 모델을 선택해 모니터링할 수 있습니다:

![이미지](/assets/img/2024-05-16-HowtoDeployaSelf-HostedLLMonEKSandWhyYouShould_9.png)

## 환경 철거

셋업을 제거하고 리소스를 해제하려면 다음 단계를 따르세요:



- vLLM 배포를 제거하세요

```js
kubectl delete -f vllm.yaml
```

2. 이제, Terraform을 사용하여 생성된 모든 인프라 리소스를 삭제하세요. 아래 명령어를 실행하세요:

```js
terraform destroy
```



# 결론

이 게시물에서는 중요한 혜택을 제공하는 자체 호스팅 LLM 설정을 살펴보았습니다. 특히 비용 절감과 데이터 제어 측면에서 큰 이점을 제공합니다. 이 설정은 GPT-4와 같이 가장 고급 모델이 필요하지 않거나, 작고 자원 소모가 적은 모델로도 충분한 경우에 특히 유용합니다.

제품 사용을 위한 데모가 아님을 참고해주시기 바랍니다. 제품 환경에서 이 설정을 구현하기 위해 클러스터 건강 상태의 지속적인 모니터링이 매우 중요합니다. 또한 로드를 관리하고 서비스 가용성을 효과적으로 유지하기 위해 인그레스 및 스케일링 정책을 실행하는 것이 중요합니다.

여러 노드에서 실행해야 하는 대규모 모델이 필요한 사용 사례의 경우, Ray operator인 KubeRay를 사용하는 것을 강력히 추천합니다. KubeRay는 복잡한 분산 시스템의 스케일링과 관리를 크게 용이하게 합니다. 큰 규모의 배포에서 KubeRay를 활용하는 방법에 대해 더 깊게 알고 싶으시면, 미래 게시물에서 KubeRay를 활용하는 것에 대해 자세히 다루도록 하겠습니다. 그게 궁금하신 경우 댓글에서 알려주시면 감사하겠습니다!