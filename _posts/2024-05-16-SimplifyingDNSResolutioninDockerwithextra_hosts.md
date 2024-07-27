---
title: "도커에서 extra_hosts를 사용하여 DNS 해결 단순화하기"
description: ""
coverImage: "/assets/img/2024-05-16-SimplifyingDNSResolutioninDockerwithextra_hosts_0.png"
date: 2024-05-16 16:56
ogImage: 
  url: /assets/img/2024-05-16-SimplifyingDNSResolutioninDockerwithextra_hosts_0.png
tag: Tech
originalTitle: "Simplifying DNS Resolution in Docker with extra_hosts"
link: "https://medium.com/@gopidesaboyina/simplifying-dns-resolution-in-docker-with-extra-hosts-bda92e0a89e9"
---


소개: Docker 세계에서는 가장 간단한 작업조차 복잡해질 수 있습니다. 최근 Docker 컨테이너에서 Apache Airflow를 실행하는 중에 귀찮은 문제에 직면했습니다. 우리의 설정은 Airflow를 Azure PostgreSQL 데이터베이스에 연결하는 것을 포함했지만, 때때로 DNS 오류로 인해 작업 흐름이 방해받았습니다. 조사를 통해 Docker의 DNS 캐싱 부족이 문제의 주범임을 알게 되었습니다. 이 게시물에서는 Docker Compose의 extra_hosts 기능을 활용하여 문제를 해결한 방법을 공유하겠습니다. 이를 통해 팀이 불필요한 두통으로부터 구해졌습니다.

문제: Docker 컨테이너는 내장된 DNS 캐싱이 없어 모든 연결 시도에 대해 DNS 해상도에 의존해야 합니다. 이는 가끔 실패로 이어질 수 있으며 특히 네트워크 트래픽이 많은 환경에서 문제가 발생할 수 있습니다. 우리의 경우, 매일 수천 개의 작업을 실행하는 Apache Airflow가 DNS 해상도 문제로 PostgreSQL 데이터베이스에 연결하는 데 어려움을 겪고 있었습니다.

해결책: DNS 해상도 문제에 대처하기 위해 Docker Compose의 extra_hosts 기능을 활용했습니다. 이 편리한 기능을 사용하면 추가 호스트 이름과 IP 주소를 지정하여 DNS 해상도가 전혀 필요하지 않게 됩니다. 호스트 이름을 직접 IP 주소로 매핑함으로써 개인 DNS 서버의 부하를 줄이고 컨테이너 간 안정적인 통신을 보장할 수 있습니다.

구현: 해결책을 구현하는 것은 간단했습니다. PostgreSQL 데이터베이스 호스트 이름과 해당 IP 주소에 대한 extra_hosts 항목을 Docker Compose 구성에 업데이트했습니다.

<div class="content-ad"></div>


버전: '3'
서비스:
  airflow:
    이미지: airflow:latest
    환경:
     - AIRFLOW__CORE__EXECUTOR=LocalExecutor
     - AIRFLOW__DATABASE__SQL_ALCHEMY_CONN=postgresql+psycopg2://@myprivatpgsqlserver.postgres.database.azure.com:6432/mydbinstance
     - AIRFLOW__CORE__LOAD_EXAMPLES=False
     - AIRFLOW__CORE__LOGGING_LEVEL=INFO
    extra_hosts:
     - "myprivatpgsqlserver.postgres.database.azure.com:192.168.159.84"
    # 기타 Airflow 구성...

이 구성에서는:

- airflow 서비스 하위에 extra_hosts 섹션을 추가했습니다.

우리는 myprivatpgsqlserver.postgres.database.azure.com 호스트명 및 해당 IP 주소 192.168.1.100을 지정하여 PostgreSQL 데이터베이스에 대한 연결에 대한 DNS 해결을 우회했습니다.
