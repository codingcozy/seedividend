---
title: "Jenkins에서 도커 컨테이너를 빌드 에이전트로 설정하는 방법"
description: ""
coverImage: "/assets/img/2024-07-10-HowtoSetupDockerContainersasBuildAgentsforJenkins_0.png"
date: 2024-07-10 02:01
ogImage: 
  url: /assets/img/2024-07-10-HowtoSetupDockerContainersasBuildAgentsforJenkins_0.png
tag: Tech
originalTitle: "How to Setup Docker Containers as Build Agents for Jenkins"
link: "https://medium.com/@kuldeepkumawat195/how-to-setup-docker-containers-as-build-agents-for-jenkins-0234427f5029"
isUpdated: true
---




![이미지](/assets/img/2024-07-10-HowtoSetupDockerContainersasBuildAgentsforJenkins_0.png)

안녕하세요! 오늘은 CI/CD를 자동화하는 데 사용되는 Jenkins에 대해 이야기해보려고 해요. 기존의 정적 에이전트는 자원 관리와 확장성에 어려움을 겪기도 했어요. 그래서 우리는 도커를 활용하여 다이나믹한 에이전트를 만들어 이 문제를 해결하는 방법에 대해 알아보려고 해요. 정적 에이전트와의 차이를 살펴보면서 자원을 효율적으로 활용할 수 있는 방법을 공유할게요. 함께 배워보세요! 🌍✈️

<div class="content-ad"></div>

# 도커 컨테이너를 빌드 에이전트/슬레이브로 사용하기

이 가이드에서는 도커 컨테이너를 빌드 에이전트로 구성하는 단계를 안내해 드리겠습니다.

# 단계 1: 도커 호스트 시작하기

가장 먼저 해야 할 일은 도커 호스트를 설정하는 것입니다. 젠킨스 서버는 이 호스트에 연결하여 빌드 에이전트 컨테이너를 실행할 것입니다.

<div class="content-ad"></div>

오늘은 Amazon Linux 서버를 Docker 호스트로 사용할 것입니다. Docker를 지원하는 OS를 사용할 수 있습니다.

아래 명령어를 사용하여 Amazon Linux 서버에 Docker를 설치하고 실행해보세요.

```shell
sudo yum install docker -y
sudo systemctl start docker
sudo systemctl enable docker --now
```

![이미지](/assets/img/2024-07-10-HowtoSetupDockerContainersasBuildAgentsforJenkins_1.png)

<div class="content-ad"></div>

도커는 기본적으로 로컬에서 작동하기 때문에 시스템 내에서만 연결할 수 있습니다. 그러나 이제 젠킨스에서 바로 연결하고 싶습니다. 이를 위해 TCP 프로토콜을 통해 노출해야하며, 이는 소켓을 바인딩해야 한다는 것을 의미합니다.

# 단계 2:- 도커 서비스 파일 업데이트

서버에 로그인하고 도커 서비스 파일 /lib/systemd/system/docker.service를 엽니다. ExecStart를 찾아 다음 라인으로 대체합니다.

```js
ExecStart=/usr/bin/dockerd -H tcp://0.0.0.0:4243 -H fd:// --containerd=/run/containerd/containerd.sock $OPTIONS $DOCKER_STORAGE_OPTIONS $DOCKER_ADD_RUNTIMES
```

<div class="content-ad"></div>

이미지를 Markdown 형식으로 변경했습니다.

이미지 경로: ![이미지](/assets/img/2024-07-10-HowtoSetupDockerContainersasBuildAgentsforJenkins_2.png)

그리고 다음과 같이 변경했습니다. 여기서 '0.0.0.0'은 외부에서 도커 호스트에 4243 포트로 연결할 수 있다는 것을 의미합니다.

이제 데몬을 다시로드하고 도커 서비스를 다시 시작하십시오.

```js
systemctl daemon-reload
systemctl restart docker
```

<div class="content-ad"></div>

![이미지](/assets/img/2024-07-10-HowtoSetupDockerContainersasBuildAgentsforJenkins_3.png)

# 단계 3: Docker API 유효성 검사

```js
curl http://localhost:4243/version
curl http://인스턴스의_공용_ip:4243/version
```

![이미지](/assets/img/2024-07-10-HowtoSetupDockerContainersasBuildAgentsforJenkins_4.png)

<div class="content-ad"></div>

# 단계 4: 젠킨스 서버에 '도커' 플러그인 설치하기

이제 젠킨스 서버에서 도커와 연결하기 위해 도커 플러그인을 설치해야 합니다.

대시보드에서 '젠킨스 관리' 옵션에 들어갑니다.

![이미지](/assets/img/2024-07-10-HowtoSetupDockerContainersasBuildAgentsforJenkins_5.png)

<div class="content-ad"></div>

그럼 '플러그인' 섹션으로 이동해주세요.

![Plugins section](/assets/img/2024-07-10-HowtoSetupDockerContainersasBuildAgentsforJenkins_6.png)

사용 가능한 플러그인 섹션에서 'Docker'를 검색하고 설치하세요.

![Installing Docker Plugin](/assets/img/2024-07-10-HowtoSetupDockerContainersasBuildAgentsforJenkins_7.png)

<div class="content-ad"></div>

`![Link to Docker plugin](/assets/img/2024-07-10-HowtoSetupDockerContainersasBuildAgentsforJenkins_8.png)`

젠킨스 서버에 이 플러그인을 설치하고 서버를 다시 시작하세요.

# 단계 5: Docker Cloud 구성

다시 'Jenkins 관리' 섹션으로 이동하여 'Clouds' 옵션을 클릭하세요.

<div class="content-ad"></div>

"‘새로운 클라우드’를 클릭하세요.

이름을 지어주고 아래 옵션에서 Docker를 선택하세요."

<div class="content-ad"></div>

![이미지](/assets/img/2024-07-10-HowtoSetupDockerContainersasBuildAgentsforJenkins_11.png)

이제 설정 섹션에서 도커 주소 [tcp://`서버-IP`:포트번호] 를 입력하고 연결을 테스트해보세요.

![이미지](/assets/img/2024-07-10-HowtoSetupDockerContainersasBuildAgentsforJenkins_12.png)

'활성화' 버튼을 클릭하여 활성화하세요.

<div class="content-ad"></div>

이미지 템플릿을 제공합니다. 여기에 추가하고자 하는 이미지입니다.

- ![이미지 14](/assets/img/2024-07-10-HowtoSetupDockerContainersasBuildAgentsforJenkins_14.png)
- ![이미지 15](/assets/img/2024-07-10-HowtoSetupDockerContainersasBuildAgentsforJenkins_15.png)

<div class="content-ad"></div>

지금 연결 방법을 선택하세요. 우리는 지금 '도커 컨테이너 첨부' 방법을 선택할 것입니다.

![이미지](/assets/img/2024-07-10-HowtoSetupDockerContainersasBuildAgentsforJenkins_16.png)

이것으로 '에이전트의 동적 프로비저닝 설치'를 성공적으로 완료했습니다. 클라우드가 이렇게 표시됩니다.

![이미지](/assets/img/2024-07-10-HowtoSetupDockerContainersasBuildAgentsforJenkins_17.png)

<div class="content-ad"></div>

# **단계 6: 동적 슬레이브 설정 테스트**

이제 잘 작동하는지 테스트하기 위해 간단한 작업을 만들 것입니다.

해당 작업에서는 스크립트 ['sleep 120']를 작성할 것입니다. 이것은 컨테이너를 120초 동안 실행 상태로 유지합니다. 작업이 완료되면 제거되는 것을 알고 계셨죠.

대시보드에서 ‘새 항목’을 클릭하세요.

<div class="content-ad"></div>


![이미지](/assets/img/2024-07-10-HowtoSetupDockerContainersasBuildAgentsforJenkins_18.png)

![이미지](/assets/img/2024-07-10-HowtoSetupDockerContainersasBuildAgentsforJenkins_19.png)

이제 작업을 구성하세요. 먼저 이 작업을 특정 에이전트로 제한하여 실행하도록 설정합니다.

![이미지](/assets/img/2024-07-10-HowtoSetupDockerContainersasBuildAgentsforJenkins_20.png)


<div class="content-ad"></div>

그럼 ‘Build steps’ 안에서 ‘Execute Shell’을 선택하고 다음 명령어를 작성하세요.

![이미지](/assets/img/2024-07-10-HowtoSetupDockerContainersasBuildAgentsforJenkins_21.png)

![이미지](/assets/img/2024-07-10-HowtoSetupDockerContainersasBuildAgentsforJenkins_22.png)

이제 저장하고 해당 작업을 실행하세요. 작업을 실행하자마자 노드 섹션에 새 노드가 자동으로 시작되어 120초 후에 완료가 되면 삭제될 것을 확인할 수 있습니다.

<div class="content-ad"></div>


![/assets/img/2024-07-10-HowtoSetupDockerContainersasBuildAgentsforJenkins_23.png](이미지)
Dashboard → Manage Jenkins → Nodes에서 새 동적 슬레이브를 확인할 수 있습니다.

![/assets/img/2024-07-10-HowtoSetupDockerContainersasBuildAgentsforJenkins_24.png](이미지)
작업을 클릭하여 자세한 내용을 확인할 수 있습니다.


<div class="content-ad"></div>

![2024-07-10-HowtoSetupDockerContainersasBuildAgentsforJenkins_25.png](/assets/img/2024-07-10-HowtoSetupDockerContainersasBuildAgentsforJenkins_25.png)

![2024-07-10-HowtoSetupDockerContainersasBuildAgentsforJenkins_26.png](/assets/img/2024-07-10-HowtoSetupDockerContainersasBuildAgentsforJenkins_26.png)

작업이 완료되면 노드가 노드 섹션에서 자동으로 제거된 것을 확인할 수 있습니다.

![2024-07-10-HowtoSetupDockerContainersasBuildAgentsforJenkins_27.png](/assets/img/2024-07-10-HowtoSetupDockerContainersasBuildAgentsforJenkins_27.png)

<div class="content-ad"></div>

## 이러한 단계를 따라가면 젠킨스 사용자는 동적 도커 슬레이브의 힘을 활용하여 리소스 활용을 최적화하고 확장성을 향상시키며 CI/CD 파이프라인을 간소화할 수 있습니다.

댓글란에 여러분의 생각을 공유해주세요. 그리고 이 글을 공유하는 걸 잊지 마세요! 😊
