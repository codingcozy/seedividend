---
title: "첫 번째 RCE를 발견한 방법"
description: ""
coverImage: "/assets/img/2024-05-15-HowIFoundMyFirstRCE_0.png"
date: 2024-05-15 11:46
ogImage: 
  url: /assets/img/2024-05-15-HowIFoundMyFirstRCE_0.png
tag: Tech
originalTitle: "How I Found My First RCE"
link: "https://medium.com/@mchklt/how-i-found-my-first-rce-f80073626fff"
---


안녕하세요 여러분! 이 글에서는 제 첫 RCE 경험에 대해 이야기하려고 해요. 제가 Apache ActiveMQ에서 발생한 CVE-2023-46604로 발생한 사건이죠. 전문적인 버그 헌터를 위한 새로운 정보를 제공하는 것보다는 어떻게 발견했는지에 더 초점을 맞출 거에요.

저의 탐색 과정에서, 매주 서브도메인 목록을 업데이트하고 3일마다(하루에 한 번 하는 것이 더 좋겠지만) 열린 포트를 스캔했어요. 서브도메인 열람을 위해 Subfinder와 Amass 같은 도구를 사용했어요.

```js
subfinder -dL domains.txt -o subdomains.txt
#그리고 서브도메인의 서브도메인
subfinder -dL subdomains.txt -o more-subdomains.txt

#Amass 사용
amass enum -passive -norecursive -noalts -df domains.txt -o subs.txt
#그리고 서브도메인의 서브도메인
amass enum -passive -norecursive -noalts -df subs.txt -o more-subs.txt
```



아래와 같이 하세요:

```bash
cat more-subdomains.txt subdomains.txt subs.txt more-subs.txt | sort -u > targets.txt
```

이후에는 몇 가지 경우에는 많은 수의 서브도메인이 생기기도 하는데, 때로는 5천개 이상이 될 때도 있습니다. DNSx를 사용하여 서브도메인을 확인하는 간단한 스크립트를 만들어 15개씩 그룹으로 나누었습니다. 그런 다음, 백그라운드에서 계속 실행하기 위해 nohup을 사용하여 Naabu를 실행했습니다.

사용한 스크립트



```js
#!/bin/bash

if [ $# -eq 0 ]; then
    echo "사용법: $0 <file>"
    exit 1
fi

cat $1 | dnsx -o $1_ok.txt

split -l 15 $1_ok.txt 15_file_

for file in 15_file_*; do
    nohup naabu -list "$file" -p - -o "${file}.out"&
done
```

그리고

```js
cat 15*out | sort -u > ports.out 
```

많은 시간 동안 그 목록을 수동으로 확인했습니다. 저는 허니팟일 가능성이 있는 호스트를 필터링했고, 때로는 Naabu가 신뢰할 수 없는 결과를 제공했습니다.



그리고 그 이후에, 3부터 10 사이의 열린 포트를 가진 호스트를 수동으로 확인했어요. 이상한 열린 포트를 발견했을 때, Nmap을 이용해서 어떤 서비스가 작동 중인지 확인했어요.

한 사례에서 bamboo.target.com이라는 호스트가 있었고, 포트 54663이 열려 있다는 것을 알았어요.

-sSCV 플래그와 함께 Nmap을 사용했을 때, Apache ActiveMQ가 실행 중이라는 것을 확인했고, 최신 버전의 CVE-2023-46604가 있었어요.

그런 다음 해당 취약점을 쉽게 적용했는데, 바로 작동했어요. 상세 보고서를 작성했고, 이는 현명한 선택이었어요. 트리저와 보안팀에 필요한 모든 정보를 제공하는 것은 자신의 노력에 대한 좋은 보상을 가져다주곤 해요.



아래는 제 결과에 대한 이미지입니다

![이미지1](/assets/img/2024-05-15-HowIFoundMyFirstRCE_0.png)

그 결과에 대한 이미지도 있습니다

![이미지2](/assets/img/2024-05-15-HowIFoundMyFirstRCE_1.png)

그게 다야! 시간 내어 주셔서 감사합니다. LinkedIn이나 Twitter도 부담 갖지 마시고 방문해주세요 — 거기서 친구를 찾고 있어요!



# 찬양합니다. 주님, 우리에게 깨닫는 것은 주님의 가르침밖에 없습니다. 우리의 마지막 기도는 모든 찬양을 받으시는 세계의 주님 하나님께로부터 오는 것입니다.