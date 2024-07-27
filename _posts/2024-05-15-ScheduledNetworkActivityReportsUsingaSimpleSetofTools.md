---
title: "간단한 도구를 사용한 예약된 네트워크 활동 보고서"
description: ""
coverImage: "/assets/img/2024-05-15-ScheduledNetworkActivityReportsUsingaSimpleSetofTools_0.png"
date: 2024-05-15 11:30
ogImage: 
  url: /assets/img/2024-05-15-ScheduledNetworkActivityReportsUsingaSimpleSetofTools_0.png
tag: Tech
originalTitle: "Scheduled Network Activity Reports Using a Simple Set of Tools"
link: "https://medium.com/@tentotheminus9/scheduled-network-activity-reports-using-a-simple-set-of-tools-646367b22c33"
---


# 소개

평범한 Raspberry Pi 팬 중 수면 패턴이 안 좋은 사람은 아침에 먼저 핸드폰을 꺼내어 사랑하는 기기가 잘 작동하고 있는지 궁금해합니다. 혹은 더 넓은 의미로, 자는 동안 내 네트워크에서 무슨 일이 벌어지고 있는지 궁금해합니다.

![Scheduled Network Activity Reports Using a Simple Set of Tools](/assets/img/2024-05-15-ScheduledNetworkActivityReportsUsingaSimpleSetofTools_0.png)

이 블로그 포스트에서 나는 최근 완료한 작은 프로젝트에 대해 설명할 것입니다. 여기서 나는 몇 가지 도구를 연결하여 Raspberry Pi와 관련된 특정 활동에 대한 아침에 첫 번째 활동 보고서를 보내기 위해 사용했습니다. 아래의 구체적인 사용 사례 자체는 특별히 유용하지는 않지만, 여러분이 유용하다고 생각하는 어떤 방향으로든 확장할 수 있는 장난감 예시입니다.



# 야간 보고서

많은 기업들이 이제 일반 업무 시간 이외에 대부분의 사이버 공격이 발생한다는 사실을 깨달았습니다. 그에 따라 단순히 백신 소프트웨어와 내부 IT 팀만으로는 부족하다는 것을 깨달았습니다. 대신 내부 팀을 24시간 365일 외부 사고 대응팀과 함께 보강하는 Sophos MDR(관리되는 탐지 및 대응) 서비스와 같은 것이 필요합니다. 네트워크를 모니터링하고 시간별 보고서를 제공하는 다양한 상업용 도구도 있습니다. 하지만 저는 이미 갖고 있는 간단한 도구들을 활용하여 어떻게 하는 지를 보기 위해 자체적인 이른바 DIY 솔루션을 만들기로 했습니다.

# 사용된 도구

본 프로젝트에서는 집 네트워크에 라즈베리 파이 5를 사용했고, 몇 가지 내부 장치(Pinging에 사용되는)와 함께 사용했습니다. 소프트웨어로는 tcpdump(명령줄 기반의 데이터 패킷 분석 도구), tcpdump와 유사한 Wireshark의 명령줄 대체인 tshark, 데이터 분석을 위해 Python(Pandas 및 Matplotlib 포함), 이메일 발송을 위한 sendmail, 그리고 Gmail 계정을 사용했습니다. 이러한 도구들은 몇 가지 bash 스크립트로 연결되었고 cron을 통해 실행 스케줄이 잡혔습니다.



기본 아이디어는 다음과 같이 3단계로 구성되었어요.

- 나의 라즈베리 파이에 대한 핑을 로깅하기 시작하고 종료할 시간을 선택하여 (예: 밤새) tcpdump 스케줄링
- 이 데이터를 분석하여 간단한 그래프로 변환하는 파이썬 스크립트를 스케줄링
- 라즈베리 파이에게 이 그래프를 내가 선택한 시간에 이메일로 보내도록 하는 스케줄링

각 단계를 함께 살펴보겠습니다.

# 파트 1 — tcpdump



tcpdump을 사용하는 것은 매우 간단하며, 온라인에는 무수히 많은 훌륭한 가이드가 있습니다. 예를 들어 아래 라인은 wlan0 인터페이스에서 ICMP(Internet Control Message Protocol) 패킷을 수신하도록 tcpdump에 지시합니다.

```js
tcpdump -i wlan0 icmp
```

이 코드는 화면에 패킷을 표시합니다. 파일에 기록하려면('pings.pcap'에 로그를 기록하는 경우), 다음 명령을 사용해야 합니다.

```js
tcpdump -i wlan0 icmp -w pings.pcap
```



다수의 pcap 파일 가이드가 있습니다 [3].

패킷 캡처의 시작과 종료를 예약하는 것은 적절한 명령어를 두 개의 별도 셸 스크립트에 넣고 cron을 사용하여 예약하는 것만으로도 간단합니다. 이러한 스크립트에 대해 도움이 되는 GitHub 저장소 [4]를 찾아내어 이를 편집했습니다.

실행 중에는 Windows 머신과 WebSSH 앱을 실행중인 휴대전화(모바일 폰)를 사용하여 Raspberry Pi에 핑을 전송했습니다 [5].

이 단계의 마지막 단계는 pcap 파일을 Python이 이해할 수 있는 형식으로 변환하는 것입니다. 이를 위해 tshark를 사용했습니다. 'pings.pcap' 파일을 'pings.csv'로 변환하는 명령어는 유용한 블로그 포스트에서 찾은 내용을 이용하여 아래와 같이 실행했습니다 [6].



```js
tshark -N n -r ./pings.pcap -T fields -e frame.number -e _ws.col.Time -e _ws.col.Source -e _ws.col.Destination -e _ws.col.Protocol -e _ws.col.Length -e _ws.col.Info -e tcp.seq -e ip.ttl -E header=y -E separator=, > pings.csv
```

이 명령어는 그 후 'stop' 스크립트의 끝에 포함되었습니다.

# 파트 2— 파이썬

관심 있는 데이터를 수집하고 CSV 파일로 변환한 후에는 Python으로 할 수 있는 일이 무궁무진합니다. 사용한 스크립트는 매우 간단합니다. 각 IP 주소에서 ping의 수를 계산하고, 데이터의 막대 플롯을 생성한 다음 jpg로 저장합니다.



```js
#라이브러리 가져오기
import pandas as pd
import matplotlib.pyplot as plt

#데이터 불러오기
pings = pd.read_csv('pings.csv')

#관심 있는 열로 제한하기
pings = pings.iloc[:,0]

#다시 데이터프레임으로 변환하기
pings = pings.to_frame()

#열 이름 변경하기
pings.columns = ['Source_IP']

#Raspberry Pi 자체에서의 핑 제거하기
pings = pings[pings['Source_IP'] != '192.168.68.127']

#IP 주소로 그룹화하고, 수를 세어 정렬하기
pings_gb = pings.groupby(['Source_IP']).size().sort_values()

#그룹화된 데이터를 사용하여 막대 그래프 만들기
fig = pings_gb.plot(kind = 'bar', rot=0, figsize=(10, 8), fontsize=13)
fig.set_ylabel("Source Count")
fig.figure.savefig('pings.jpg')
```

# 파트 3— Gmail

이 부분은 가장 많은 노력을 필요로 했으며, Gmail 쪽에서의 설정(보안 수준이 낮은 앱 액세스 허용 및 앱 비밀번호 생성)과 Raspberry Pi 쪽에서의 설정(sendmail 설치 및 구성)이 포함되었습니다. 이러한 단계에 대한 두 가지 훌륭한 가이드는 [7, 8]에서 확인할 수 있습니다. 이 가이드를 따르면 var/logs/maillog의 로그 파일에 "My unqualified host name (raspberrypi) unknown; sleeping for retry"라는 오류가 계속 표시된다는 것에 유의하십시오. 이 오류를 해결하는 방법은 [9]에서 확인하십시오. 또한, 접근 보안 수준이 낮기 때문에 별도의 Gmail 계정을 만드는 것이 좋을 수 있습니다.

설정을 완료하면 Python에서 생성된 이미지를 첨부한 이메일을 보낼 수 있습니다.




```bash
echo "Enjoy! from Raspberry Pi" | mail -s "Your Overnight Ping Analysis!" [내 주 이메일 주소] -A pings.jpg
```

# 모두 함께 사용하기

마지막으로, 위의 단계들을 연결하여 크론을 사용할 수 있습니다. (좋은 크론 도우미를 보려면 여기를 참조하세요 [10]). 이를 위해 크론탭을 수정하여 아래와 유사한 내용으로 편집하세요.

```bash
0 22 * * * bash /robh/start_tcpdump.sh # 10시에 수집 시작
0 6 * * * bash /robh/stop_and_convert.sh # 6시에 수집 중지 및 csv로 변환
5 6 * * * python ping_script.py # 6:05에 파이썬 스크립트 실행
30 6 * * * bash /robh/email.sh # 6:30에 이미지를 이메일로 보내기
```



작업 표정 변경이 완료되었습니다.



이메일 안에는 Python 스크립트가 생성한 이미지 파일이 포함되어 있었습니다.

![image](/assets/img/2024-05-15-ScheduledNetworkActivityReportsUsingaSimpleSetofTools_2.png)

# 결론

위의 이미지는 매우 간단하지만, 크론을 사용하여 다음 이벤트 체인을 예약하는 원칙을 보여주기를 희망합니다,



데이터 수집 → CSV로 변환 → Python으로 분석 → 결과 이메일로 전송

수집하는 데이터와 분석 방법은 물론 무한히 맞춤화할 수 있어요. 이 게시물이 여러분의 일간 보고 요구 사항에 유용한 시작점이 되었으면 좋겠어요!