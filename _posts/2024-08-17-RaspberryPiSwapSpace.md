---
title: "라즈베리 파이에서 스왑 공간 설정하는 방법"
description: ""
coverImage: "/assets/img/2024-08-17-RaspberryPiSwapSpace_0.png"
date: 2024-08-17 01:20
ogImage: 
  url: /assets/img/2024-08-17-RaspberryPiSwapSpace_0.png
tag: Tech
originalTitle: "Raspberry Pi Swap Space"
link: "https://medium.com/@myam/raspberry-pi-swap-space-ccbbd6d919df"
isUpdated: false
---


<img src="/assets/img/2024-08-17-RaspberryPiSwapSpace_0.png" />

라즈베리 파이 한 조각이 어디 갔을까요?

가끔 냉장고를 열었을 때 이 질문을 스스로에게 하곤 합니다. 이번에는 top 명령어를 보면서 예약된 스왑 공간의 거의 1/4가 사용되고 있음을 알게 되었습니다. 이 질문은 순전히 학술적인 호기심으로, 답을 알기 위해 bash 스크립트를 작성했습니다.

swapid 스크립트는 먼저 프로세스 목록을 검색하고, 그런 다음 프로세스 이름과 사용된 스왑 양을 식별한 후에 스왑 크기로 출력을 정렬합니다.

<div class="content-ad"></div>

리눅스에서는 프로세스를 파일 시스템처럼 볼 수 있고 쿼리할 수 있습니다. 다음 명령을 실행하면

```bash
$ ls /proc
```

디렉토리 안에 숫자로 시작하는 이름을 가진 하위 디렉토리가 흩어져 있음을 볼 수 있습니다. 이 숫자로 된 하위 디렉토리들은 각각 프로세스 ID에 해당합니다. 더 깊이 파고들면, 각각의 프로세스 하위 디렉토리에는 "status"라는 이름의 파일이 들어 있으며, 다음 명령을 실행하면

```bash
$ cat status
```

<div class="content-ad"></div>

여러 프로세스 정보를 확인할 수 있어요.

여기서 중요한 속성인 "이름"과 "VmSwap"을 선택하기 위해 awk와 grep을 사용하면 됩니다.

결과는 /tmp 디렉토리에 작성되고 정렬된 후 콘솔에 인쇄되어 그 후에 삭제됩니다.

swapid의 소스 코드입니다:

<div class="content-ad"></div>

```bash
#!/bin/bash
tmpfile="/tmp/swapid.tmp"
if [ -f $tmpfile ]; then rm $tmpfile; fi
for f in /proc/*/status
do
 name=$(grep ^Name $f)
 swap=$(grep ^VmSwap $f)
 echo $name" "$swap | awk '{print $2" "$4" "$5}' |
  grep -i kb | grep -v grep >> $tmpfile
done
sort -n -k 2.1 $tmpfile
rm $tmpfile
```

이것을 즐겁게 사용하는 즐겨 사용하는 편집기에 입력한 후에 해당 스크립트를 실행 가능하게 만들어주시면 도움이 됩니다:

```bash
$ chmod +x swapid
```

스크립트를 실행하면, 마지막 몇 줄의 출력에서 가장 큰 스왑 공간이 프로세스 php-cgi에 할당되는 것을 볼 수 있습니다:


<div class="content-ad"></div>

```bash
$ ./swapid
. . .
smbd-notifyd 1560 kB
lpqd 1564 kB
php-cgi 1784 kB
php-cgi 1792 kB
php-cgi 1800 kB
php-cgi 1812 kB
php-cgi 2040 kB
php-cgi 2684 kB
php-cgi 2684 kB
php-cgi 2684 kB
php-cgi 2684 kB
php-cgi 2684 kB
```

이제 내 질문에 대한 답이 있어요! 아파치 2 서버(상위 프로세스)가 가져갔네요! 그리고 부팅 시 10번 슬라이스를 가져갔어요!