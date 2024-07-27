---
title: "리눅스에서 DNS 서버 설정하기"
description: ""
coverImage: "/assets/img/2024-05-16-SettingupaDNSserveronLinux_0.png"
date: 2024-05-16 03:55
ogImage: 
  url: /assets/img/2024-05-16-SettingupaDNSserveronLinux_0.png
tag: Tech
originalTitle: "Setting up a DNS server on Linux"
link: "https://medium.com/@guemandeuhassler96/setting-up-a-dns-server-on-linux-985875f3250d"
---


오늘날, 우리가 인터넷을 브라우징하고 웹 페이지를 요청할 때마다, 브라우저에 입력한 웹 페이지 이름을 해당 IP 주소로 변환하기 위해 도메인 이름 시스템(DNS)에 의존하게 됩니다. 이를 통해 우리는 원하는 웹 페이지에 액세스할 수 있게 됩니다. DNS가 없으면 여러 웹 서버와 연결된 다양한 IP 주소를 인간의 두뇌가 기억하기가 어려워 인터넷 사용이 매우 어려울 것입니다. 이 글에서는 CentOS 8을 이용하여 DNS 서버를 설정하고 이름 해결 과정을 탐험하는 방법을 배우겠습니다. 시작해봅시다.

## 시나리오

우리는 현재 회사 EOS 소유의 사설 네트워크에 연결되어 있습니다. 이 네트워크 내에는 웹 서버를 호스팅하는 Metasploitable 이라는 서버가 있습니다. 그러나 현재 이 웹 서버에 접속하기 위해서는 Metasploitable 서버의 IP 주소에 의존하고 있습니다. 따라서 우리의 목표는 이 웹 서버에 도메인 이름을 사용하여 액세스할 수 있는 것입니다. 이 시나리오는 아래 그림으로 더 자세히 설명됩니다:

![DNS 서버 설정하기](/assets/img/2024-05-16-SettingupaDNSserveronLinux_0.png)



# DNS 설정하기

첫 번째 단계는 DNS 리졸버로 사용할 서버에 BIND와 필수 유틸리티를 설치하는 것입니다.

```js
# yum install bind bind-utils -y
```

설치가 완료되면 다음 명령어를 사용하여 설치된 BIND 버전을 확인할 수 있습니다.



```js
# 이름 -v
```

이제 BIND의 주 구성 파일을 편집할 수 있습니다. 그러나 그 전에 예방 차원으로 파일의 백업을 만드는 것이 좋습니다. 구성에서는 우리 네트워크(192.168.3.0/24)에서의 쿼리만 허용하고 재귀 모드를 활성화하여 서버가 캐싱을 수행할 수 있도록 할 것입니다.

```js
# cp /etc/named.conf /etc/named/conf.bak
# vi named.conf

// 아래와 같이 편집 :
//listen-on port 53 { 127.0.0.1; };
//listen-on-v6 port 53 { ::1; };

allow-query { localhost; 192.168.3.0/24; }; 
recursion yes;
```

## 포워드 및 리버스 존 생성하기



전방존은 호스트 이름을 IP 주소로 해석하고, 역방존은 IP 주소를 호스트 이름으로 해석할 수 있게 합니다. 이를 구성하려면 다음 라인을 named.conf 파일 끝에 추가해야 합니다.

```js
// 전방존
zone "eos.net" IN {
     type master;
     file "eos.net.db";
     allow-update { none; };
     allow-query { any; };
};

// 역방존
zone "3.168.192.in-addr.arpa" IN {
     type master;
     file "eos.net.rev";
     allow-update { none; };
     allow-query { any; };
};
```

- type: 존에 대한 서버 역할을 지정합니다.
- file: 두 존에 사용되는 파일을 지정합니다.
- allow-update: 동적 DNS 업데이트를 수행할 수 있는 호스트 시스템을 지정합니다. 이 경우 특정 호스트를 지정하지 않았습니다.

## 존 파일 만들기



우리는 이미 위에서 전방 존(eos.net.db)과 역방 존(eos.net.rev)을 모두 지정했습니다. 이제 /var/named 디렉토리 안에 이러한 파일들을 만들어야 합니다. 전방 존부터 시작해봅시다. 아래와 같이 정보를 입력하여 파일을 만들어 주세요:

```js
# nano /var/named/eos.net.db
$ORIGIN eos.net.
$TTL 86400
@ IN SOA server.eos.net. admin.eos.net. (
    2024051300 ;시리얼
    3600 ;새로고침
    1800 ;재시도
    604800 ;만료
    86400 ;최소
)

; 네임 서버 정보
@ IN NS server.eos.net.

; 네임 서버용 IP 주소
server IN A 192.168.3.210

; 다음 호스트 이름을 위한 A 레코드
metasploitable IN A 192.168.3.195
dns IN A 192.168.3.210

; CNAME 레코드
dns-primary IN CNAME server.eos.net.
```

이제, 역방 존은 다음과 같이 나타나야 합니다:

```js
# nano /var/named/eos.net.rev
$ORIGIN 3.168.192.in-addr.arpa.
$TTL 86400
@ IN SOA server.eos.net. admin.eos.net. (
                                            2024051300 ;시리얼
                                            3600 ;새로고침
                                            1800 ;재시도
                                            604800 ;만료
                                            86400 ;최소 TTL
)
; 네임 서버 정보
@ IN NS server.eos.net.
server     IN      A       192.168.3.210

; 네임 서버에 대한 역방 조회
210 IN PTR server.eos.net.

; IP 주소에 대한 호스트 이름에 대한 PTR 레코드
195      IN      PTR     metasploitable.eos.net.
```



양방향 및 역방향 존이 모두 순서대로 되어 있습니다. 이제 파일에 적절한 권한을 설정해야 합니다:

```js
# chown named:named /var/named/eos.net.db
# chown named:named /var/named/eos.net.rev
```

이제 우리의 설정이 올바른지 확인해야 합니다. 이를 위해 named-checkconf 및 named-checkzone 명령어를 사용할 수 있습니다.

```js
# named-checkconf
# named-checkzone eos.net eos.net.db
# named-checkzone 3.168.192.in-addr.arpa eos.net.rev
```




![DNS server setup](/assets/img/2024-05-16-SettingupaDNSserveronLinux_1.png)

이제 named 데몬을 다시 시작해야 합니다:

```shell
# systemctl start named.service
# chkconfig named on
```

## DNS 서비스 테스트




Windows 호스트에서는 nslookup 명령을 사용하여 호스트인 Metasploitable의 전방 및 후방 존을 테스트할 수 있습니다. 우리는 호스트 Metasploitable의 DNS 정보를 검색할 수 있는 것을 확인할 것입니다.

![이미지](/assets/img/2024-05-16-SettingupaDNSserveronLinux_2.png)

## 결론

이 게시물에서는 BIND 소프트웨어를 사용하여 Linux 환경에 DNS 서비스를 설정하는 과정을 탐구했습니다. DNS는 인터넷의 기본 구성 요소이며, 그 중요성을 과장할 수 없습니다. 시스템 관리자로서 Linux 환경에서 서비스를 배포할 수 있는 능력을 갖추고 DNS를 이해하는 것이 특히 중요합니다. 이 게시물이 도움이 되었다면 박수를 치거나 댓글을 남기고 더 많은 콘텐츠를 위해 팔로우해 주세요. 감사합니다!