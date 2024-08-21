---
title: "라즈베리 파이 4에서 Zabbix 64를 702로 업그레이드하는 방법"
description: ""
coverImage: "/assets/img/2024-08-17-UpgradeZabbixfrom64to702onRaspberrypi4_0.png"
date: 2024-08-17 01:19
ogImage:
  url: /assets/img/2024-08-17-UpgradeZabbixfrom64to702onRaspberrypi4_0.png
tag: Tech
originalTitle: "Upgrade Zabbix from 64 to 702 on Raspberry pi 4"
link: "https://medium.com/@jswheeler/upgrade-zabbix-from-6-4-to-7-0-2-on-raspberry-pi-4-3293e5ca0435"
isUpdated: true
updatedAt: 1723864301616
---

![image](/assets/img/2024-08-17-UpgradeZabbixfrom64to702onRaspberrypi4_0.png)

집 네트워크에서 Zabbix를 많이 사용해왔어요. 모니터링 및 자동화 작업에 적극 활용하고 있어요. 문서를 살펴보다가 Zabbix의 동적 위젯을 발견했어요! 아마도 Grafana를 완전히 포기할 수 있지 않을까요? 주목해주세요! Zabbix 7.0.1부터라고 **굵게** 표시되어 있더라고요. 괜찮아요, 내 현재 6.4 버전을 업그레이드하고 이 기능을 체험해볼게요.

## 쉬운 일은 절대 없어요

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

Zabbix 설문 조사를 참고하면, 6.4에서 7.0으로 업그레이드하는 특정 페이지가 있습니다. 이건 쉽게 할 수 있을 거에요. 단계를 따라가기 시작했고 제 4단계에 도달했습니다.

이런, 저는 Debian Bullseye(11)를 실행 중입니다. 이 설명은 Bookworm(12)을 실행 중인 Debian 사용자를 위한 것입니다. 분명 Bullseye에서도 작동할 거에요(?). 설치 페이지를 빠르게 살펴보았습니다.

Bullseye에서 Zabbix 7.0으로 가는 길이 없네요. Bookworm을 보니

아마 라즈베리 파이도 11에서 12로 업그레이드할 수 있을 거에요.... 맞죠? 누군가 잘 설명해 놓았네요. 이건 쉽게 할 수 있을 거에요. 저는 쉬운 단계를 선택했고 저자가 유의사항을 몇 가지 언급해도 걱정은 없이 가버렸습니다.

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

<img src="/assets/img/2024-08-17-UpgradeZabbixfrom64to702onRaspberrypi4_1.png" />

간략히 말하자면, 위의 기사에서 제시된 첫 번째 옵션을 따라 적절한 패키지를 찾지 못하고 Zabbix 커뮤니티를 귀찮게 하고 지원 문제를 열었지만, Debian 업그레이드 경로가 작동하지 않았습니다.

## 두 가지 이상의 방법이 있습니다...

라즈베리파이 포럼의 이 글과 이 기사의 조언을 따라 처음부터 다시 시작하기로 결정했습니다.

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

최신 64비트 Bookworm 이미지를 다운로드해서 새 SD 카드에 설치했어요. 지원팀에 문의해서 데이터베이스 업그레이드가 어떻게 이뤄질지 잘 몰라서 꽤 걱정했었어요.

그래서 6.4에서 백업한 것을 복원하고, 새 설치된 것이 업그레이드할 거에요. 그래서 이것을 할 수 있는 절차를 만들어야 할 것 같아요. 이 절차는 어느 정도 Zabbix를 Raspberry Pi의 Debian에서 업그레이드하거나 설치하는 방법의 결합인 셈이에요.

새로 설치하는 거니까, 새 설치 지침부터 시작해야 해요.

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

- 라즈베리 파이(64비트 라이트 노 데스크톱)를 선택했어요.
- a, b 및 c 단계를 따랐습니다. 초기 스키마를 가져오지 않았고 대신 데이터베이스를 복원했어요. 저는 postgresql을 사용하므로 복원은 다음과 같이 보였어요.

sudo -u postgres psql -dzabbix -f /backup/usr/local/backup/20240802–145121.sql
내 Postgress 인스턴스는 동일한 라즈베리파이에 호스트되어 있어요. 복원은 몇 분 정도 소요되었고 오류 없이 완료되었습니다. Bookworm으로 업그레이드하면 Postgresql 버전이 13에서 15로 변경되었습니다. 데이터베이스를 초기화하기 위해 zcat 단계를 수행하지 않았습니다. 복원이 데이터베이스를 다시 만들었어요. 하위 단계 d, e 및 f를 완료했습니다.

- UI를 시작할 때 데이터베이스 암호를 제공해야 했어요. php 파일을 복원할 수도 있었지만 이 방법도 잘 작동했어요.

또한 서버 파일을 보면서 업그레이드 프로세스를 관찰했어요

```js
$ journalctl -u zabbix-server.service
Aug 02 16:44:55 zabbix systemd[1]: zabbix-server.service 시작 중...
Aug 02 16:44:56 zabbix zabbix_server[14872]: Zabbix Server 시작 중. Zabbix 7.0.2 (revision d1b0c3308ce).
Aug 02 16:44:56 zabbix zabbix_server[14872]: ****** 활성화된 기능 ******
Aug 02 16:44:56 zabbix zabbix_server[14872]: SNMP 모니터링: YES
Aug 02 16:44:56 zabbix zabbix_server[14872]: IPMI 모니터링: YES
Aug 02 16:44:56 zabbix zabbix_server[14872]: 웹 모니터링: YES
Aug 02 16:44:56 zabbix zabbix_server[14872]: VMware 모니터링: YES
Aug 02 16:44:56 zabbix zabbix_server[14872]: SMTP 인증: YES
Aug 02 16:44:56 zabbix zabbix_server[14872]: ODBC: YES
Aug 02 16:44:56 zabbix zabbix_server[14872]: SSH 지원: YES
Aug 02 16:44:56 zabbix zabbix_server[14872]: IPv6 지원: YES
Aug 02 16:44:56 zabbix zabbix_server[14872]: TLS 지원: YES
Aug 02 16:44:56 zabbix zabbix_server[14872]: ******************************
Aug 02 16:44:56 zabbix zabbix_server[14872]: 구성 파일 사용 중: /etc/zabbix/zabbix_server.conf
Aug 02 16:44:56 zabbix systemd[1]: zabbix-server.service 시작됨 - Zabbix Server.
Aug 02 16:44:56 zabbix zabbix_server[14872]: 현재 데이터베이스 버전(필수/옵션): 06040000/06040027
Aug 02 16:44:56 zabbix zabbix_server[14872]: 필수 버전 요구사항: 07000000
Aug 02 16:44:56 zabbix zabbix_server[14872]: 필수 패치가 발견되었습니다.
Aug 02 16:44:56 zabbix zabbix_server[14872]: 자동 데이터베이스 업그레이드 시작
Aug 02 16:44:56 zabbix zabbix_server[14872]: 데이터베이스 업그레이드 0% 완료
Aug 02 16:44:56 zabbix zabbix_server[14872]: 데이터베이스 업그레이드 1% 완료
Aug 02 16:44:56 zabbix zabbix_server[14872]: 데이터베이스 업그레이드 2% 완료
Aug 02 16:44:56 zabbix zabbix_server[14872]: 데이터베이스 업그레이드 3% 완료
Aug 02 16:44:56 zabbix zabbix_server[14872]: 데이터베이스 업그레이드 4% 완료
...
Aug 02 16:45:06 zabbix zabbix_server[14872]: 데이터베이스 업그레이드 98% 완료
Aug 02 16:45:06 zabbix zabbix_server[14872]: 데이터베이스 업그레이드 99% 완료
Aug 02 16:45:06 zabbix zabbix_server[14872]: 데이터베이스 업그레이드 100% 완료
Aug 02 16:45:06 zabbix zabbix_server[14872]: 데이터베이스 업그레이드 완료
Aug 02 16:45:07 zabbix zabbix_server[14893]: HA 매니저 시작
Aug 02 16:45:07 zabbix zabbix_server[14893]: HA 매니저가 액티브 모드로 시작됨
Aug 02 16:45:07 zabbix zabbix_server[14872]: 서버 #0 시작 [메인 프로세스]
Aug 02 16:45:07 zabbix zabbix_server[14895]: 서버 #1 시작 [서비스 매니저 #1]
Aug 02 16:45:07 zabbix zabbix_server[14896]: 서버 #2 시작 [구성 동기화 #1]
Aug 02 16:45:08 zabbix zabbix_server[14900]: 서버 #3 시작 [알림 매니저 #1]
Aug 02 16:45:08 zabbix zabbix_server[14901]: 서버 #4 시작 [알리터 #1]
Aug 02 16:45:08 zabbix zabbix_server[14902]: 서버 #5 시작 [알리터 #2]
```

데이터베이스 업그레이드 프로세스는 빨랐고, 1분도 안 걸렸어요. 기본적으로 라즈베리 파이 Bookworm의 신설치. Zabbix의 새로운 설치가 데이터베이스 초기화 지점까지 진행됐었고, Postgress로 데이터베이스를 복원하면 업그레이드된 Zabbix 버전이 되어요.

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

## 결과

이제 이렇게 대시보드를 만들 수 있어서 여러 대의 기계들을 쉽게 살펴볼 수 있어서 기쁩니다.

## 마지막으로

내 업그레이드 실패는 아마도 그냥 조급함과 데비안에 대한 심층적인 지식 부족 때문일 것입니다. 그렇다고 해도, 배포판 (라즈베리 파이) 소유자가 새로운 설치를 권장한다면, 그 조언을 받아들이는 게 가장 좋을 것 같습니다.

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

업그레이드 중에 postgress 권한과 관련된 문제가 발생했어요. 항상 이 단계를 잊어버리는 것 같아요.

문제는 여전히 당신의 pg_hba.conf 파일에 있어요.

이 줄:

```js
local   all             postgres                                peer
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

절대로 파일을 수정한 후 PostgreSQL 서버를 다시 시작하는 것을 잊지 마세요. Linux를 사용 중이라면 sudo systemctl restart postgresql 명령을 사용하시면 됩니다 (이전 시스템의 경우: sudo service postgresql restart).

그 외에도 항상 로케일을 업데이트하는 것을 잊어버려 Zabbix에 처음 로그인할 때 충격적인 오류 메시지를 받습니다. raspi-config을 사용하여 us_en을 추가하면 이 문제가 해결됩니다.
