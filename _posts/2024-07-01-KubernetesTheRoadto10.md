---
title: "Kubernetes 10까지의 여정 2024 최신 가이드"
description: ""
coverImage: "/assets/img/2024-07-01-KubernetesTheRoadto10_0.png"
date: 2024-07-01 21:13
ogImage:
  url: /assets/img/2024-07-01-KubernetesTheRoadto10_0.png
tag: Tech
originalTitle: "Kubernetes: The Road to 1.0"
link: "https://medium.com/itnext/kubernetes-the-road-to-1-0-525a9420fdf0"
isUpdated: true
---

Kubernetes 1.0 출시 기념 행사에서 어제 이 강을 건너 앉던 곳에서 Kubernetes 프로젝트가 시작된 곳에 대해 이야기했어요. 다만 10분은 너무 짧아서 깊게 다루진 못했어요. 그래도 Kelsey가 제게 30장의 슬라이드를 꼭 준다고 했던 건 사실이에요. 그 이유는 청중들이 무엇을 알고 싶어할지 확신하지 못해서 그랬고, 또 제 자신을 위한 메모도 필요했거든요.

디자인에 대한 배경 일부에 대해 이미 글을 썼었지만, 이번에는 그것이 어떻게 이루어졌는지와 맨트뷰 팀에서 Borg 팀이 거주했던 과정, 그리고 이를 구축하는 과정에 대해 이야기할 거예요. Craig McLuckie, Joe Beda, Brendan Burns, Ville Aikas는 그 당시 Google Compute Engine 팀이 있던 시애틀에 있었어요. 저는 프로젝트가 시작되기 전 어느 정도의 시간 동안 4가지 학기로 나눠 보았어요.

# Borg와 Omega에서 배운 교훈: 2009–2013

2009년 초에 구글의 Borg 제어평면 팀에 합류했어요. 지난 15년간 수퍼컴퓨터로 근무해 온 경험이 있었지만, Borg는 이전에 여러 컴포넌트가 쌓여 있는 다중 사용자 시스템이었어요. '스타터 프로젝트'로는 이전 1.5년에 구글의 많은 단일 스레드 C++ 응용 프로그램들을 다중 스레드로 옮기도록 지원하는 것이었는데, 그 과정에서 Linux(아직 NPTL이 롤아웃되지 않았던 시기), g++(스레드 안전 어노테이션), 스레딩 원시자료(C++11 이전), 다중 스레드 HTTP 서버, 개선된 프로파일링, 문서화, 그리고 다른 프로젝트들에 참여했습니다.

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

효율을 향상시키기 위해, 제가 이해하는 것 뿐만 아니라 시스템이 어떻게 사용되고 있는지 알아내야 했습니다. Borg 프로젝트를 첫 해 동안 작업하며 Borg의 제어 계층 아키텍처와 API가 실제로 사용되는 방식을 고려하지 않고 설계되어 있다는 것을 발견했습니다.

예를 들어 Borg는 실제로 확장 가능성이 부족했기 때문에 롤아웃, 일괄 예약, cron 예약, 수평 및 수직 자동 스케일링과 같은 추가 기능은 다른 서비스와 클라이언트에 구축해야 했습니다. 이러한 다른 서비스는 Job 리소스에 데이터를 임베드하고, 새로운 Job과 같은 변경 사항을 계속 폴링하는데, 이 작업들이 Borg 제어 평면에서의 API 요청의 99% 이상을 차지했습니다. 변경 사항을 구독할 수 있는 Watch API 기능은 Job Task 엔드포인트에 대해만 지원되었으며, 동적 예약된 호스트 IP 주소와 포트를 Chubby에 쓰는 방식으로 구현되었습니다. 이 Chubby는 Zookeeper를 촉발한 키/값 저장소의 영감을 받았습니다.

(이미지: 2024-07-01-KubernetesTheRoadto10_0.png)

추신으로, 서비스 검색을 위해 Chubby를 사용하면 Borg에서 실행되는 작업 부하에 미치는 영향이 있습니다. 그러므로 서비스 명명, 검색, 부하 분산, 역방향 프록시, 인증 등에 대한 표준 메커니즘을 사용할 수 없었습니다. 기존 애플리케이션이 Kubernetes에서 실행될 수 있도록 Pod IP 주소를 동적으로 할당하여 라우팅할 수 있게 만들었는데, 당시에는 논란이 되었던 결정이었습니다.

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

2010년에 Omega라는 이름의 R&D 프로젝트를 시작했습니다. 이 프로젝트는 Borg를 재설계하여 더 잘 사용되고 Borg 주변의 생태계를 더 잘 지원하기 위한 것이었습니다. Kubernetes는 많은 면에서 "오픈 소스 Omega"보다는 "오픈 소스 Borg"라고 할 수 있지만, Borg와 Omega에서 얻은 교훈을 혜택으로 받았습니다.

Omega에는 중심에 Paxos 기반의 키/값 저장소와 Watch API가 있었습니다. Kubernetes에서는 컨트롤러라고 불리는 구성 요소들이 비동기적으로 작동하여 원하는 상태 객체를 확인하고 관찰된 상태를 다시 작성했습니다. Kubernetes와 달리 이들은 저장소 내에서 별도의 레코드였는데, 낙관적 동시성에 좋았지만 조합하기 약간 까다로웠습니다. 또한 저장소를 통합 API로 래핑하는 일을 결국 진행하지 못했지만, 그에 대한 제안은 있었습니다.

![이미지](/assets/img/2024-07-01-KubernetesTheRoadto10_1.png)

Borg가 설계된 대로 사용되지 않은 또 다른 예는 Borg의 Allocs가 여러 대의 기계에 걸쳐 예약된 리소스 모음이었고, 클러스터의 수평 조각이었습니다. 작업 작업은 이러한 슬롯에 예약되었습니다. 이는 상당히 복잡한 모델이었고, 디버깅이나 가로 스케일링과 같은 여러 가지를 더 복잡하게 만들었는데, 이는 사용자 중 일부만 이점을 취했습니다. Allocs를 사용하는 대부분의 사용자는 특정 작업 작업 세트를 인스턴스에 고정했습니다. 이로 인해 Omega에서 복제와 스케줄링의 핵심 단위로 컨테이너 번들을 만드는 아이디어가 제기되었고, 이를 Kubernetes에서는 Pod로 명명했습니다.

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

![2024-07-01-KubernetesTheRoadto10_2.png]

쿠버네티스에서 Label은 중요한 개념으로 등장하게 되었습니다. 본이 처음엔 Label을 가지고 있지 않았습니다. 이 아이디어는 사용자들이 최대 180자까지 Job 이름에 메타데이터를 넣으려고 시도하면서 영감을 받았습니다. 그리고 일반 표현식을 사용하여 파싱했습니다. 오메가에서 대응되는 개념은 더 복잡했지만 추가적인 하위 구조가 필요하지 않았습니다. 간단한 맵이면 충분했습니다. 비슷하게, Annotation은 Borg 클라이언트들이 모든 정보를 하나의 `notes` 문자열에 쑤셔 넣으려고 시도하면서 영감을 받았습니다. 이것은 유저 에이전트(구글의 RPC 라이브러리에 없었던) 처럼 구성되었지만 Job에 유지되었습니다.

![2024-07-01-KubernetesTheRoadto10_3.png]

쿠버네티스에서의 CPU 및 메모리 요청 및 제한 사양은 본 보다 더 일관성 있었고 오메가보다 단순화되었습니다.

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

우리는 잘 작동하는 접근 방식을 선택하고, 그렇지 않은 것들은 버리고, 조금 복잡한 것들은 간단하게 만들고, 몇 가지에는 한 번 더 시도를 했습니다. 오메가(Omega)에서 온 일부 컨셉들은 쿠버네티스(Kubernetes)에서 거의 그대로 재사용되었습니다. 특정 부분들은 단순화되었지만, 오메가와 동일한 이름인 Taints와 Tolerations와 같은 것들도 있었습니다. "클레임(claim)"이라는 용어도 오메가에서 유래했습니다. 교란 예산(disruption budgets)의 개념 또한 오메가에서 왔으며, Borg의 교란 브로커 서비스에서 영감을 받아 만들어졌습니다.

이렇게 10년 동안의 배운 것들은 도커(Docker)와 함께 처음 시작하는 libswarm과 같은 프로젝트보다 쿠버네티스를 더 앞선 위치로 이끌었습니다. 이로 인해 쿠버네티스는 그와 같은 복잡성을 조금 더 일찍 보여주기도 했지만, 대부분의 기능들은 많이 사용되었습니다.

# 초기 컨테이너 제품 API 디자인: 2013년 하반기

Borg와 Omega에서의 모든 경험 덕분에 우리는 아주 빠르게 발전했습니다. 2013년 하반기에 우리는 어떤 종류의 컨테이너 제품을 만들어야 할지 논의하기 시작했을 때, 저는 API를 스케치하기 시작했습니다. 이미 그 때의 API는 오늘날 쿠버네티스 사용자들에 의해 인식될 것입니다. 이것은 그 당시에 제 첫 프로토타입 데모가 있었던 회의에서 발표한 내용을 요약한 것입니다.

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

- CRUD: 구성 및 API에 같은 스키마
- 일정 단위 (sunits 또는 분자라고도 함): 자원, 작업, 데이터의 번들
- 새로운/업데이트된 인스턴스용 sunit 프로토타입
- 별도의 복제 사양이 원하는 수를 지정함
- 레이블, 레이블 쿼리에 의해 식별되는 잠재적으로 이질적인 sunits 세트; 인덱스가 없음
- 직교하는 기능이 분리됨

![이미지 설명](/assets/img/2024-07-01-KubernetesTheRoadto10_4.png)

![이미지 설명](/assets/img/2024-07-01-KubernetesTheRoadto10_5.png)

# 발사 준비: 2014년 상반기

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

아직 오픈소스로 무언가를 공개하긴 승인받지 못했고 어떤 제품을 만들지 논의 중이었지만, 그동안 프로젝트에 적극적으로 착수했습니다. 상당히 많은 사람들을 모았어요. 내부 메모에 접근할 수 없어서 모두의 이름을 여기서 다 말씀드리지는 못할 것 같아요. 그럼에도 몇몇 분들을 소개해 드릴게요.

Tim Hockin, Dawn Chen, Eric Tune과 같은 일부는 독립적인 실험과 프로젝트에 참여했어요. 예를 들어 Pods를 Docker 위에 구현하는 것이 얼마나 실현 가능한지 알지 못했어요. 여러 컨테이너가 네트워크 네임스페이스가 설정 가능하지 않은 상태에서 IP 주소를 공유하는 방법이 명확하지 않았죠. cgroups를 중첩하는 간단한 방법도 없었어요. 이외에도 Omlet 노드 에이전트와 lmctfy 컨테이너 런타임과 같은 기존 구성 요소를 적용할 수 있는지도 알아보았지만 결정적으로 그것을 선택하지 않았어요.

제가 소개해 드린 몇 분은 Solomon Hykes와 Ben Golub씨를 만나 Docker를 Kubernetes에 내장시키고 발견한 일부 어려움에 대해 이야기를 나누러 갔어요. 그 미팅을 통해 Docker와의 libcontainer 협업이 시작되었고, 스택 내 LXC를 대체하기 위해 개발된 libcontainer와 Kubernetes와 함께 공개된 cadvisor는 Victor Marmol, Rohit Jnagal, Vish Kannan이 개발했어요.

![Kubernetes: The Road to 1.0 and Beyond](/assets/img/2024-07-01-KubernetesTheRoadto10_6.png)

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

팀은 2014년 5월에 출시된 파이썬 컨테이너-에이전트를 개발했는데, 이때 우리는 아직 Kubernetes를 오픈소스로 공개할 수 있는 승인을 받지 못했습니다. 이 프로젝트의 컨테이너 매니페스트는 초기 v1beta1 Kubernetes 작업 API로 직접 들어가게 되었고, Kubernetes에서 "매니페스트" 용어가 생겨난 곳입니다.

![이미지](/assets/img/2024-07-01-KubernetesTheRoadto10_7.png)

빌레 아이카스와 다니엘 스미스 같은 다른 사람들은 Go 코드를 작업했습니다. 초기 API는 작업 (나중에 Pod로 이름이 변경됨), ReplicationController, 그리고 Service만 있었는데, 노드는 없었습니다. 처음에는 RAML을 사용해서 API를 수기로 문서화했습니다.

아래는 빌레의 설계 문서에서 가져온 다이어그램입니다. 여기서 Kubelet은 없고, Kube-proxy가 직접 Etcd에서 읽어왔다는 점에 주목해 주세요. Kubernetes를 출시하기 전에 최소한의 Kubelet이 추가되었습니다. Kubelet은 또한 직접 Etcd에서 읽었고, apiserver는 작업 상태를 동기적으로 가져오기 위해 Kubelet에 직접 호출했습니다.

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

![2024-07-01-KubernetesTheRoadto10_8](/assets/img/2024-07-01-KubernetesTheRoadto10_8.png)

도커콘에서 출시하고자 했던 코어 오브 쿠버네티스를 출시했습니다. 출시한 것이 무엇인지 (날짜를 알려주는 것은 유용합니다) 그리고 그 후 공개적으로 변경사항을 적용했습니다. 중요한 아이디어는 이미 존재했습니다: API, 원하는 상태, 멀티 컨테이너 인스턴스, 라벨, 컨트롤러, 스케줄링/배치, 서비스 디스커버리가 있었습니다. 약간의 정리 작업이 있었고, 코드는 새로운 리포지토리로 복사되었습니다. 복사된 리포지토리가 아직 존재하지만, 커밋 히스토리가 소실된 구 code.google.com 리포지토리가 있었는데, Villegg 처럼 발표에서 언급되었습니다.

# 디자인 구현 완료: 2014년 하반기

출시한 제품은 일관된 제어 플레인이 없었으며, 불완전하고 일관성 없는 API를 가지고 있었으며, 매우 최소화된 cloudcfgCLI를 가지고 있었고, 사용자들이 필요로 할 기본적인 기능 중 일부가 빠져 있었기 때문에 쿠버네티스 공개 후 6~7개월 동안 이러한 영역을 보충하고 레드햇 및 다른 커뮤니티의 아이디어를 통합하는 데 시간을 보냈습니다.

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

지배 평면을 굳게 세우기 위해 우리는 apiserver에 Watch를 구현했습니다. 이를 통해 Kubelet과 Kube-proxy에서 직접적인 Etcd 접근을 제거할 수 있었습니다. 또한 scheduler에서도 직접적인 Etcd 접근을 없앴습니다.

apiserver가 Kubelet (노드, 파드) 또는 다른 구성 요소 (복제 컨트롤러)를 호출하여 상태 정보를 검색할 필요를 없애기 위해 /status API 엔드포인트를 구현했습니다.

또한 controller-manager와 scheduler 구성 요소를 apiserver에서 분리하고 구성 요소간 통신을 보호했습니다 (예: Kubelet-apiserver).

API 자체도 많은 변화를 겪었습니다. Task가 Pod로 이름이 변경되었습니다. Minion API가 추가되었고 나중에 Node로 이름이 변경되었습니다. scheduler는 노드 할당을 Pod 필드에 기록하는 방식으로 변경되었습니다. Service API는 여러 포트를 지원하는 등 많은 변경이 이루어졌습니다. 이 변경 사항을 수동으로 유지하면 지속가능하지 않았기 때문에, API에 대한 Swagger를 생성하기 위해 go-restful을 apiserver에 통합했습니다. API 버전 간 및 내부 표현 간의 변환은 API 버전 관리를 지원하기 위해 추가되었습니다.

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

클레이튼 콜먼은 전체 API 표면을 철저히 개편했습니다. 오늘날의 쿠버네티스 API 모습이 정말로 갖춰졌던 곳이기도 합니다. 메타데이터, 원하는 상태(spec), 관찰된 상태(status)의 분리가 이루어졌고, 어노테이션이 추가되었습니다. 네임스페이스가 리소스 경로에 삽입되었고, 리소스 유형 및 필드 간 일관성이 높아졌으며, API 규칙 초안을 작성했습니다. 우리는 매우 철저했기 때문에 v1 API에는 거의 호환되지 않는 변경 사항이 거의 없었습니다.

![이미지](/assets/img/2024-07-01-KubernetesTheRoadto10_9.png)

Kubernetes를 오픈소스화할 당시의 명령줄 도구는 cloudcfg였습니다. 곧 kubecfg로 이름이 변경되었으나 확장에는 잘 구조화되지 않았습니다. 다행히 샘 고즈가 자발적으로 CLI를 다시 작성해줘서 kubectl이 되었습니다. 그 과정에서 spf13/cobra CLI 프레임워크가 통합되고 동사-명사 패턴이 확립되었습니다.

또한 kubeconfig를 만들고, 클라이언트 라이브러리를 분리하고, 여러 파일 및 리소스 유형 간의 대량 작업을 구현하며, 선언적 작업의 기초를 마련했습니다.

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

새로 추가된 기능들은 여러 목적을 가지고 있어요. 시스템을 더 사용하기 쉽게 만들기 위해 컨테이너 종료 이유 보고와 apiserver를 통한 로그 수집 기능 등이 추가되었어요. 일부는 보안을 위한 것이었고, 사용자 인증, 서비스 계정, ABAC 권한 부여 및 네임스페이스와 같은 것이 추가되었어요. 다른 몇 가지는 모델을 보완하기 위해서, 서비스 IP 및 DNS, PersistentVolume 및 PersistentVolumeClaim이 포함되었어요. 그리고 다른 것들은 당시 매우 혼잡했던 시장에서 지혜롭게 리드할 수 있는것을 시연하는 것이 목적이었어요. 예를 들어 라이브니스 프로브와 레디니스 프로브 같은 것들이 있죠.

# 홈 스트레치: 2015 상반기

2015년 초에 우리는 Kubernetes와 더 넓은 클라우드 네이티브 생태계를 위한 기초를 마련하는 아이디어를 논의하기 시작했어요. 1.0 버전을 7월의 론칭 이벤트 날짜와 맞추기로 결정했어요. 목표는 시스템을 프로덕션 환경에서 실행할 수 있도록 만드는 것이었죠.

이제 마감일이 정해졌기 때문에, 어떤 기능을 포함하고 어떤 것을 뒤로 미룰지 결정해야 했어요. 프로젝트에 처음으로 코드 동결을 도입했어요. 미완성된 코드 몇 개를 심지어 제거하기도 했어요. 우리는 종료 방식을 포함해 실제 사용에 중요한 것으로 여겨지는 기능들을 포함했어요. 그리고 시스템을 지속적인 운영을 위해 변경 사항을 통해 청소, 비정상적인 구성요소 재시작, 이벤트 중복 제거 등을 강화했어요.

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

1.0 이후로 여러 중요한 기능이 미뤄졌어요. kubectl apply, 배포 (Deployment), 데몬셋 (DaemonSet), 스테이트풀셋 (StatefulSet), 작업 (Job), 크론잡 (CronJob), 설정맵 (ConfigMap), 수평팟오토스케일러 (HorizontalPodAutoscaler), 노드 포트 및 인그레스 (Ingress), kube-proxy의 iptables, apiserver를 통해 노출된 리소스 메트릭, 컨테이너 QoS, 대부분의 스케줄링 기능, 쿠버네티스 대시보드, 그리고 타사 리소스가 그중이에요. 이것이 MVP로서 절대 옳은 선택이었습니다.

또한 P0 버그를 수정하고, 인증되지 않은 포트와 같은 보안 문제를 해결하고, 업그레이드 테스트를 구현하고, 보다 철저한 API 유효성 검사를 추가했으며, 컴포넌트에 Prometheus의 클라이언트 라이브러리를 설치하여 관찰성을 높였어요.

마지막 달에는 kubernetes.io 웹사이트를 만들었어요. 기존 문서 중 일부를 이사시켰지만, 새로운 사용자 가이드도 작성했어요. 공식 발표 날에 사이트에 일부 문제가 있었지만, 제때 해결했어요. 홈페이지에는 여전히 저가 당시 작성했던 일부 텍스트가 포함되어 있어요. 예를 들면 "Production-Grade Container Orchestration" 슬로건, "Kubernetes is an open source system for automating deployment, scaling, and management of containerized applications", 그리고 일부 기능 설명들이에요. 다만 그 중 일부는 1.0 당시조차 고지적이었습니다.

이 중요한 이정표를 향해 수십 명의 사람들이 함께 도우며 각종 방식으로 도움을 주었어요. 문서 오류를 찾아 수정하거나, 이벤트를 조직하거나, 프로젝트를 홍보하거나, 그리고 이후로 잊어버렸을 수도 있는 여러 일들을 도와줬어요.

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

이 시점에서는 많은 작업이 이루어졌습니다. 초기 릴리스 이후 약 1년이 지났지만 시작부터 1년 반 이상의 작업과 그 이전 수년간의 연구 및 개발이 있었습니다. 이 작업은 성공에 기여한 요소 중 하나였습니다.
