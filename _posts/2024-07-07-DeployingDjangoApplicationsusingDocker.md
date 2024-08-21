---
title: "Docker를 활용한 Django 애플리케이션 배포 방법"
description: ""
coverImage: "/assets/img/2024-07-07-DeployingDjangoApplicationsusingDocker_0.png"
date: 2024-07-07 20:13
ogImage:
  url: /assets/img/2024-07-07-DeployingDjangoApplicationsusingDocker_0.png
tag: Tech
originalTitle: "Deploying Django Application’s using Docker"
link: "https://medium.com/@adityabakshiextra/deploying-danjo-application-using-docker-8af035c88008"
isUpdated: true
---

디자고 컨테이너와 도커 탐험: 개발과 배포 혁신하기

빠르게 변화하는 소프트웨어 개발 세계에서 효율성과 신뢰성은 매우 중요합니다. 기존의 애플리케이션 배포 방법은 호환성 문제부터 확장성에 이르기까지 여러 어려움을 안겨줍니다. 이 때 등장하는 것이 컨테이너화입니다 — 우리가 애플리케이션을 구축하고 배포하며 실행하는 방식을 바꾸는 혁신적인 기술입니다.

디자고 컨테이너란 무엇인가?

디자고 컨테이너는 도커의 강력함과 유연함을 활용한 컨테이너화의 최신 접근 방식을 대표합니다. 도커는 주요한 컨테이너화 플랫폼으로, 개발자에게 애플리케이션과 그 의존성을 표준화된 단위로 패키징할 수 있는 도구를 제공합니다. 이러한 컨테이너들은 개발용 노트북부터 프로덕션 서버까지 다양한 컴퓨팅 환경에서 애플리케이션이 원활히 실행되도록 보장합니다.

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

Why Docker?

도커는 몇 가지 매력적인 이유로 엄청난 인기를 얻었습니다:

- 일관성: 컨테이너는 라이브러리와 의존성을 포함한 애플리케이션이 실행되는 데 필요한 모든 것을 캡슐화하여, 서로 다른 환경에서도 일관된 작동을 보장합니다.
- 격리: 각 컨테이너는 독립적으로 작동하여 애플리케이션 간 충돌을 방지하고 더 효율적인 리소스 활용을 가능하게 합니다.
- 이식성: 컨테이너는 개발자의 워크스테이션에서 테스트 환경으로 또는 온프레미스 서버에서 클라우드로 쉽게 이동할 수 있습니다.
- 확장성: 도커의 가벼운 성격과 효율적인 리소스 관리로 인해 애플리케이션을 수평적으로 확장하는 데 이상적입니다.

장고와 컨테이너로 시작하기

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

만약 도커와 장고 컨테이너에 입문하신 분이라면, 시작하기가 생각보다 쉽습니다. 먼저 로컬 머신에 도커를 설치하고 컨테이너를 생성, 실행, 관리하는 방법을 실험해보세요. 도커의 포괄적인 문서와 활기찬 커뮤니티는 여러분을 도와줄 많은 자료를 제공해줍니다.

프로젝트 아키텍처-

![프로젝트 아키텍처](/assets/img/2024-07-07-DeployingDjangoApplicationsusingDocker_0.png)

도커를 사용한 애플리케이션 배포 단계별 가이드

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

Step-1: AWS(또는 선호하는 클라우드 플랫폼)에서 EC2 인스턴스를 시작합니다.

![EC2 Instance](/assets/img/2024-07-07-DeployingDjangoApplicationsusingDocker_1.png)

Step-2: 인스턴스의 보안 그룹을 편집하고 다음 3가지 주요 규칙을 인바운드 규칙으로 추가합니다.

A) SSH 포트-22

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

B) Http 포트-80

C) 사용자 지정 TCP 포트-8000 (App에 접근할 때 이 포트를 사용해야 합니다).

![이미지](/assets/img/2024-07-07-DeployingDjangoApplicationsusingDocker_2.png)

Step-3: SSH를 사용하여 EC2 인스턴스에 연결하세요.

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

## Step 4: Docker 설치하기

다음 이미지는 Ubuntu 운영체제를 사용하는 경우의 단계를 보여줍니다. 다른 Linux Flavour를 사용하시는 경우에는 해당 Flavour에 맞게 변경해주세요.

이 명령어를 복사하여 Docker를 다운로드하세요.

sudo apt update

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
sudo apt install apt-transport-https ca-certificates curl software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository “deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable”

apt-cache policy docker-ce
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

```bash
sudo apt install docker-ce

sudo systemctl status docker

Step-5: 우분투에 도커를 다운로드했다면 이제 VM에 Git을 설치해야 합니다 ─ 다음 명령어를 사용하세요

apt install git -y
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

Step-6: 깃 레포지토리를 클론하는 방법은 다음과 같아요

git clone https://github.com/ZABROL/Danjo_Application_Using_Containers.git

(만약 위 링크가 작동하지 않을 경우, 레포지토리 이름은 Danjo_Application_Using_Containers 입니다 - 작성자: Aditya Bakshi)

Step-7: 레포지토리를 성공적으로 클론한 후에는 DockerFile이 포함된 폴더로 이동하세요 (CD 명령어 사용).

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

![이미지](/assets/img/2024-07-07-DeployingDjangoApplicationsusingDocker_4.png)

**Step-8: 아래 명령어를 실행해주세요**

docker build .

또는

docker build -f Dockerfile_path

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

**9단계: 빌드된 이미지를 사용하여 컨테이너 실행하기 - 다음 명령어를 사용하세요**

docker run --name=아무이름 -p 8000:8000 -it 이미지\_아이디

![이미지](/assets/img/2024-07-07-DeployingDjangoApplicationsusingDocker_5.png)

**10단계: 애플리케이션에 액세스하기**

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

브라우저에서 다음을 검색해보세요.

`IP_ADDRESS:8000/demo` - 이 링크를 클릭하면 애플리케이션의 기본 index.html 페이지로 이동합니다.

`IP_ADDRESS:8000/admin` - 이 링크를 클릭하면 Django의 관리자 패널로 이동할 수 있으며 Django 자격 증명을 사용하여 로그인할 수 있습니다.

이렇게하면 Docker 컨테이너를 사용하여 Django 애플리케이션을 성공적으로 배포했습니다. 완료!

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

추가 정보:

- 배포를 변경해야 할 경우 Setting.py 파일에서 수정할 수 있습니다. (이 파일은 프로젝트 빌드 중에 Django가 생성하는 기본 파일입니다.)
- 레이아웃을 변경하려면 template.py -` index.html에서 수정해야 합니다.
- 액세스를 변경하려면 devops-`url.py에서 수정해야 합니다.
- Dockerfile은 Danjo_App_using_docker/python-web-app에서 확인할 수 있습니다.

(다른 파일의 기능은 공식 Django 문서에서 확인할 수 있습니다)

- **_참고_**

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

만약 당신이 Killercoda나 Dockerplayground를 사용하고 있다면.

도커를 설치할 필요가 없습니다. 단계 5부터 직접 시작하고 Traffic Port Access Specifier를 사용하여 액세스할 수 있습니다.

앞으로의 전망

기술이 계속 발전함에 따라, 컨테이너화는 소프트웨어 개발과 배포의 미래에서 더욱 중요한 역할을 하게 될 것으로 예상됩니다. 마이크로서비스 아키텍처부터 서버리스 컴퓨팅까지, Docker와 Django 컨테이너는 현대 애플리케이션의 요구에 적응하는 확장 가능한 솔루션을 제공합니다.

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

결론적으로, Docker로 구동되는 Django 컨테이너는 소프트웨어 개발과 배포에 접근하는 방식에서 패러다임의 변화를 의미합니다. 컨테이너화를 통해 개발자들은 안정적이고 확장 가능한 애플리케이션을 구축할 수 있으며, 어떤 환경에서도 일관된 성능을 보장받을 수 있습니다. 경험 많은 개발자든 초보든, Django 컨테이너와 Docker를 탐험하는 것은 오늘날의 동적인 기술 환경에서 선두에 서기 위한 가치 있는 여정입니다.
