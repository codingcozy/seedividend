---
title: "중급자를 위한 DevOps 프로젝트 아이디어와 해결책 "
description: ""
coverImage: "/assets/img/2024-07-07-DevOpsProjectIdeaswithSolutionsIntermediateLevel_0.png"
date: 2024-07-07 20:11
ogImage:
  url: /assets/img/2024-07-07-DevOpsProjectIdeaswithSolutionsIntermediateLevel_0.png
tag: Tech
originalTitle: "DevOps Project Ideas 💡 with Solutions: Intermediate Level"
link: "https://medium.com/devops-dev/devops-project-ideas-with-solutions-intermediate-level-705bb7e6989c"
isUpdated: true
---

안녕하세요 여러분 👋, 이번 글에서는 저의 데브옵스 학습 과정 중 실습한 몇 가지 프로젝트 아이디어를 공유하려고 해요. 시도하실 프로젝트 아이디어들은 중급 수준일 거예요. 글에서는 각각의 프로젝트 아이디어와 레포지토리 링크를 함께 공유할 거라, 여러분들도 손쉽게 스스로 시도해볼 수 있을 거예요. 모든 소스 코드는 레포지토리에서 찾으실 수 있어요.

저는 각 프로젝트를 빌드하는 방법을 레포지토리와 블로그에서도 공유했어요. 이러한 단계들이 실제로 그 프로젝트를 어떻게 빌드해야 하는지에 대한 좋은 이해를 제공할 거라 확신해요. 블로그의 단계 섹션을 따라가면 손쉽게 이 프로젝트들을 구현할 수 있을 거에요.

모두가 중급 수준이 될 테니, 각각의 프로젝트를 구현하는 데 최대 3일이 소요될 것 같아요. 그러니 처음부터 스스로 시도해보세요. 이러한 프로젝트를 구현하는 것이 여러분의 학습 여정에 도움이 되고 실습 능력을 향상시킬 것이라고 기대해요.

만약 여러분이 이러한 프로젝트들을 개발하지 못한다면 걱정하지 마세요. 댓글에서 막히는 부분을 알려주시거나 LinkedIn에서도 연락해주세요. 기꺼이 도와드릴게요.

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

# 1. GitOps를 기반으로 한 Flask 애플리케이션용 엔드 투 엔드 CI/CD 파이프라인

![이미지](/assets/img/2024-07-07-DevOpsProjectIdeaswithSolutionsIntermediateLevel_0.png)

# 아키텍처 전체적인 개요:

저희는 main 브랜치로의 push에 의해 트리거되는 CI/CD 파이프라인을 구축할 것입니다. 이 파이프라인은 애플리케이션을 빌드하고 테스트를 실행한 뒤 GitOps를 기반으로 쿠버네티스 클러스터에 애플리케이션을 배포할 것입니다. 이 파이프라인은 GitHub Actions와 ArgoCD를 사용하여 구현될 것입니다.

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

## 프로젝트 아키텍처에 대한 설명은 아래와 같습니다:

- 먼저, 애플리케이션의 소스 코드가 포함된 GitHub 저장소가 있습니다. 해당 저장소는 GitHub Actions에 연결되어 있으며, 애플리케이션을 빌드하고 배포하는 데 사용될 것입니다.
- GitHub Actions 워크플로우는 저장소의 main 브랜치로 푸시되면 트리거됩니다. 이 워크플로우는 애플리케이션을 빌드하고 테스트를 실행하며, Docker 이미지를 Docker Hub에 푸시합니다. 그리고 그 이미지 태그를 Manifest 저장소에 업데이트합니다.
- Manifest 저장소는 애플리케이션을 위한 쿠버네티스 매니페스트가 포함된 별도의 GitHub 저장소입니다. 우리 Argo CD는 이 저장소를 변경 사항을 모니터링할 것입니다. Manifest 저장소에서 이미지 태그가 업데이트되면 Argo CD가 자동으로 애플리케이션의 새 버전을 쿠버네티스 클러스터에 배포합니다.

애플리케이션 소스 코드 저장소 링크: [여기를 클릭해주세요](링크)

Manifest 저장소: [여기를 클릭해주세요](링크)

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

[블로그 링크](Click here)

# 2. Ansible을 이용한 동적 인벤토리 로드 밸런싱

![이미지](/assets/img/2024-07-07-DevOpsProjectIdeaswithSolutionsIntermediateLevel_1.png)

# 아키텍처 개요:

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

EC2 인스턴스를 프로비저닝하기 위해 Ansible을 사용할 것입니다. 인스턴스가 실행되면 웹 서버인 Httpd를 설치할 것입니다. 로드 밸런싱을 위해 HAProxy를 활용할 것입니다. 모든 작업은 자동화되어 있으므로 플레이북을 실행하기만 하면 됩니다.

이 프로젝트는 Ansible을 사용하여 로드 밸런싱을 위한 동적 인벤토리를 생성하는 것에 관한 것입니다. 이 아키텍처에서는 AWS EC2 인스턴스를 인벤토리 서버로 사용하고 로드 밸런서로 HAProxy를 사용했습니다. 이 워크플로는 두 부분으로 나뉩니다.

i) 첫 번째 부분은 동적 인벤토리 호스트를 생성하는 것입니다.

ii) 두 번째 부분은 HAProxy 구성 파일을 동적으로 업데이트하는 것입니다.

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

저장소 링크: [여기를 클릭하세요](링크주소)

블로그 링크: [여기를 클릭하세요](링크주소)

# 3. 쿠스터마이즈와 쿠버네티스를 사용하여 투표 앱 만들기

![이미지](/assets/img/2024-07-07-DevOpsProjectIdeaswithSolutionsIntermediateLevel_2.png)

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

# 아키텍처 개요:

이 프로젝트에서는 샘플 투표 앱을 구축할 것입니다. 이 앱은 사용자가 자신이 좋아하는 애완동물(고양이 또는 개)에 투표할 수 있게 합니다. 이 예시는 Docker 공식 문서에서 제공한 내용입니다. 어떤 목적을 위해서든 Kustomize를 이해하는 데 제격인 예시라고 생각합니다. Docker Swarm을 사용한 Docker의 공식 예시도 확인할 수 있습니다.

## 투표 앱은 다음 구성 요소로 구성됩니다:

- 사용자에게 웹 응용 프로그램을 제공하여 사용자가 애완동물(고양이 또는 개)에 투표할 수 있게 하는 프론트엔드 서비스. Python Flask로 개발되었습니다.
- 투표를 저장하는 Redis 서비스.
- 투표를 처리하고 결과를 Postgres 데이터베이스에 저장하는 워커 서비스.
- 애완동물 이름 및 투표 수와 같은 투표 세부 정보를 저장하는 Postgres 서비스.
- 투표 결과를 표시하는 결과 서비스. Node.js로 작성되었습니다.

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

저장소 링크: [여기를 클릭하세요](링크)

블로그 링크: [여기를 클릭하세요](링크)

# 4. MongoDB 관리자 인터페이스 어플리케이션용 Helm 차트 만들기

![이미지](/assets/img/2024-07-07-DevOpsProjectIdeaswithSolutionsIntermediateLevel_3.png)

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

# 아키텍처 개요:

MongoDB Admin Interface는 웹 기반 응용 프로그램으로, 사용자가 웹 인터페이스를 통해 MongoDB 데이터베이스와 상호 작용할 수 있게 해줍니다. 이 웹 인터페이스는 쿼리, 삽입, 업데이트, 데이터 삭제와 같은 일반 데이터베이스 작업을 수행하기 위한 사용자 친화적 인터페이스를 제공합니다.

## Kubernetes를 사용하여 MongoDB Admin Interface를 배포하는 아키텍처는 다음과 같습니다:

- 어플리케이션과 데이터베이스를 위해 두 가지 배포를 생성할 것입니다.

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

웹 애플리케이션 배포:

- 우리는 어플리케이션을 생성하기 위해 mongo-express:latest 이미지를 사용하고 있습니다.
- 파드가 다운되면 새로운 파드를 생성하는 배포(deployment)를 사용할 것입니다. 배포를 사용하면 파드의 라이프사이클 관리가 가능해집니다. 또한 애플리케이션의 스케일링과 고가용성을 제공해줍니다.
- 외부 세계로 웹을 노출하기 위해 NodePort 타입의 서비스를 사용하고 있습니다.
- NodePort: 클러스터 외부에 배포를 노출하는 서비스 유형입니다.

데이터베이스 배포:

- 데이터베이스를 위한 배포를 생성하기 위해 mongo:5.0 이미지를 사용하고 있습니다.
- 파드가 다운되면 새로운 파드를 생성하는 배포를 다시 사용할 것입니다.
- DB와 프론트엔드/백엔드 간의 통신을 위해 ClusterIP 서비스를 사용하고 있습니다.
- ClusterIP: 클러스터 내에서 배포를 노출하는 서비스 유형입니다.

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

기타 사용된 Kubernetes 자원:

- Secrets: 사용자 이름과 비밀번호와 같은 민감한 정보를 저장하는 데 사용됩니다.
- ConfigMap: 키-값 쌍으로 비민감한 데이터를 저장하는 데 사용됩니다. 우리의 경우 데이터베이스 URL을 저장하는 데 사용되었습니다.
- PersistentVolume 및 PersistentVolumeClaim: 데이터베이스에 데이터를 저장하기 위해 사용됩니다. 따라서 만약 우리의 파드가 다운되더라도 데이터는 안전합니다.

저장소 링크: [여기를 클릭하세요](링크)

블로그 링크: [여기를 클릭하세요](링크)

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

# 5. Node.js 웹 애플리케이션을 위한 AWS CI/CD 서비스를 활용한 End-to-End CI/CD 파이프라인

![이미지](/assets/img/2024-07-07-DevOpsProjectIdeaswithSolutionsIntermediateLevel_4.png)

# 아키텍처 개요

CI/CD 파이프라인의 아키텍처는 다음과 같습니다:

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

- 사용자는 GitHub 저장소에 새 커밋을 푸시하는 것으로 시작합니다. 이는 Source, Build 및 Deploy로 구성된 파이프라인을 트리거합니다.
- Source 단계는 GitHub 저장소에서 소스 코드를 가져옵니다.
- Build 단계는 AWS CodeBuild를 사용하여 Node.js 웹 애플리케이션을 테스트합니다.
- Deploy 단계는 AWS CodeDeploy를 사용하여 Node.js 웹 애플리케이션을 Elaastic Beanstalk 환경에 배포합니다.

참고: 이 프로젝트의 빌드 단계는 Node.js 웹 애플리케이션을 테스트하는 데 사용됩니다. 실제 시나리오에서는 이 단계에 빌드 프로세스도 포함해야 합니다.

저장소 링크: [여기를 클릭하세요](링크)

블로그 링크: [여기를 클릭하세요](링크)

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

👏 만약 이 글이 도움이 되었다면 박수를 보내주고 제 프로필을 팔로우해주세요. 클라우드와 데브옵스에 관한 더 많은 프로젝트와 아이디어를 공유할 예정이에요. 궁금한 점이 있거나 연락이 필요하다면 댓글이나 LinkedIn을 통해 연락해주세요.

LinkedIn에서 함께해요: [LinkedIn 프로필](LinkedIn Profile)

더 많은 실습 프로젝트를 살펴보세요(제 저장소가 도움이 되었다면 GitHub에서 저를 팔로우하는 걸 잊지 마세요): [내 GitHub 계정](My GitHub Account)
