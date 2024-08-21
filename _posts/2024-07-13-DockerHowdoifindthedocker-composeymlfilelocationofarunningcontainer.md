---
title: "Docker 실행 중인 컨테이너의 docker-composeyml 파일 위치 찾는 방법"
description: ""
coverImage: "/assets/img/2024-07-13-DockerHowdoifindthedocker-composeymlfilelocationofarunningcontainer_0.png"
date: 2024-07-13 01:34
ogImage:
  url: /assets/img/2024-07-13-DockerHowdoifindthedocker-composeymlfilelocationofarunningcontainer_0.png
tag: Tech
originalTitle: "Docker: How do i find the docker-compose.yml file location of a running container?"
link: "https://medium.com/@kpatronas/docker-how-do-i-find-the-docker-compose-yml-file-location-of-a-running-container-4a7d660fc054"
isUpdated: true
---

<img src="/assets/img/2024-07-13-DockerHowdoifindthedocker-composeymlfilelocationofarunningcontainer_0.png" />

가정해 봅시다! 회사의 당직 엔지니어로 지명되었고 도커 문제에 대해 지원을 요청 받았습니다. 문제는 환경에 익숙하지 않고 docker ps를 사용하여 실행 중인 컨테이너를 볼 수는 있지만 docker-compose.yml 파일의 위치를 찾을 수 없습니다. 더 나빠진 것은 애매한 이름을 가진 여러 docker-compose.yml 파일이 있는데요. 이미 불안한 기분이 드시나요? 걱정하지 마세요! 파일을 찾는 간단하고 빠른 방법을 알려드릴게요!

## 컨테이너 ID 식별

첫 번째 단계는 컨테이너 ID를 식별하는 것입니다. docker ps 명령을 사용하여 이 작업을 수행하면 다음과 비슷한 출력이 생성됩니다.

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
컨테이너 ID     이미지                                    명령어                생성일         상태                포트                                                      이름
6fac5a8225e4   telegraf:latest                          "/entrypoint.sh tele…"   7일 전       실행 중 7일        도중에                                                                         telegraf
bd0f34c2cbfc   influxdb:1.8                             "/entrypoint.sh infl…"   7일 전       실행 중 7일        중에                                                                         influxdb
```

## 도커 인스펙트 사용하기

다음 단계(마지막)는 도커 인스펙트 명령어를 사용하는 것입니다. 이 명령어는 이미지, 컨테이너, 네트워크 및 기타 도커 내부 정보를 제공해줍니다. 이 경우에는 도컴포즈 파일 위치를 확인하기 위해 컨테이너에 대한 정보를 얻기 위해 사용하겠습니다.

이 명령어를 실행하면 해당 컨테이너에 대한 모든 세부 정보가 표시됩니다. 아마도 출력물이 많고 읽기 어렵게 나올 것입니다!

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
docker inspect 6fac5a8225e4
```

## Config.Labels만 추출하는 방법

다행히도 docker inspect 명령어는 --format 옵션을 사용할 수 있게 해줍니다. 이 옵션을 사용하면 우리가 필터링하고 싶은 출력물의 부분을 선택할 수 있습니다. 우리의 경우 .Config.Labels를 json 형식으로 출력하기 원하므로 다음과 같이 명령어를 실행하면 됩니다.

```bash
docker inspect --format='{json .Config.Labels}' 203df74e3ba6
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

이 명령은 다음 출력을 생성할 것인데, 너무 많지는 않지만 조금 읽기 어려울 수 있어요!

```js
{"com.docker.compose.config-hash":"45139ec8caa3bbc0e178f3c07cd4985b19f6d1edd954c87b0f7c563817d62a9b","com.docker.compose.container-number":"1","com.docker.compose.depends_on":"","com.docker.compose.image":"sha256:2e936f7bddcc399a7da3ae9198f82eefba6c2c76eb31c7abe91d9c875fdb515b","com.docker.compose.oneoff":"False","com.docker.compose.project":"sshtunnel","com.docker.compose.project.config_files":"/data/docker/sshtunnel/docker-compose.yml","com.docker.compose.project.working_dir":"/data/docker/sshtunnel","com.docker.compose.service":"sshtunnel","com.docker.compose.version":"2.24.6"}
```

## 출력을 더 읽기 쉽게 만드는 방법

여기서 두 가지 방법을 사용할 수 있어요. 하나는 jq를 사용하여 출력을 더 읽기 쉬운 형태로 포맷팅하는 것이고요, 다른 하나는 (docker-compose.yml 라인을 찾았나요? ;) )

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
docker inspect --format='{json .Config.Labels}' 203df74e3ba6 | jq .
{
  "com.docker.compose.config-hash": "45139ec8caa3bbc0e178f3c07cd4985b19f6d1edd954c87b0f7c563817d62a9b",
  "com.docker.compose.container-number": "1",
  "com.docker.compose.depends_on": "",
  "com.docker.compose.image": "sha256:2e936f7bddcc399a7da3ae9198f82eefba6c2c76eb31c7abe91d9c875fdb515b",
  "com.docker.compose.oneoff": "False",
  "com.docker.compose.project": "sshtunnel",
  "com.docker.compose.project.config_files": "/data/docker/sshtunnel/docker-compose.yml",
  "com.docker.compose.project.working_dir": "/data/docker/sshtunnel",
  "com.docker.compose.service": "sshtunnel",
  "com.docker.compose.version": "2.24.6"
}
```

만약 jq가 설치되어 있지 않거나 설치할 수 없는 경우 두 번째 옵션으로 tr 명령어를 사용할 수 있습니다. 이 경우에는 tr을 사용하여 , 문자를 새 줄 \n으로 바꿔서 가독성을 높일 수 있습니다!

```js
docker inspect --format='{json .Config.Labels}' 203df74e3ba6 | tr -s "," "\n"
{"com.docker.compose.config-hash":"45139ec8caa3bbc0e178f3c07cd4985b19f6d1edd954c87b0f7c563817d62a9b"
"com.docker.compose.container-number":"1"
"com.docker.compose.depends_on":""
"com.docker.compose.image":"sha256:2e936f7bddcc399a7da3ae9198f82eefba6c2c76eb31c7abe91d9c875fdb515b"
"com.docker.compose.oneoff":"False"
"com.docker.compose.project":"sshtunnel"
"com.docker.compose.project.config_files":"/data/docker/sshtunnel/docker-compose.yml"
"com.docker.compose.project.working_dir":"/data/docker/sshtunnel"
"com.docker.compose.service":"sshtunnel"
"com.docker.compose.version":"2.24.6"}
```

## 결론

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

요즘 보셨겠지만, 실행 중인 컨테이너에서 docker-compose.yml 위치를 추출하는 것은 어렵지 않지만 많은 출력이 표시되어 이미 스트레스 받는 상황에서 시간이 부족하고 빠르게 위치를 파악해야 하는 경우에는 어려울 수 있습니다! 그래서 이 기사에서는 docker inspect 명령어 이외에도 "잡음"을 걸러내고 docker-compose.yml 위치가 포함된 구성 레이블 부분만 얻는 빠른 팁을 보여드릴 예정이에요!
