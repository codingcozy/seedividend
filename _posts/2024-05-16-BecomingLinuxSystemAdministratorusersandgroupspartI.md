---
title: "리눅스 시스템 관리자가 되는 법 사용자와 그룹 제 1부"
description: ""
coverImage: "/assets/img/2024-05-16-BecomingLinuxSystemAdministratorusersandgroupspartI_0.png"
date: 2024-05-16 17:06
ogImage:
  url: /assets/img/2024-05-16-BecomingLinuxSystemAdministratorusersandgroupspartI_0.png
tag: Tech
originalTitle: "Becoming Linux System Administrator: users and groups (part I)"
link: "https://medium.com/@audrey_evans/becoming-linux-system-administrator-users-and-groups-part-i-9da575565b10"
isUpdated: true
---

“리눅스는 여러 사용자 계정을 동시에 사용할 수 있는 다중 사용자 운영 체제로, 서버로 사용하기에 이상적입니다.

어머니의 날 특별 할인 이벤트, 아마존 기기 최대 50% 할인 (쇼핑)

![이미지](/assets/img/2024-05-16-BecomingLinuxSystemAdministratorusersandgroupspartI_0.png)

- 컴퓨터 및 액세서리 베스트셀러 (쇼핑용 뷰)
- 노트북 컴퓨터 베스트셀러 (쇼핑용 뷰)
- 컴퓨터 네트워킹 베스트셀러 (쇼핑용 뷰)
- 리눅스 운영 체제 베스트셀러 (쇼핑용 뷰)"

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

리눅스에서는 각 계정을 사용자 이름과 UID(즉, 고유 번호로 할당된 사용자 ID)로 정의할 수 있습니다. 또한, 각 계정은 기본 그룹에 속하며 실행할 셸과 홈 디렉터리도 가지고 있습니다. 관련 정보는 /etc/passwd 파일에 저장되어 있으며 cat 명령어를 사용하여 확인할 수 있습니다. 터미널에서 단순히 "cat /etc/passwd" 명령어를 실행해봅시다:

```js
david@debian:~$ cat /etc/passwd
root:x:0:0:root:/root:/bin/bash
--중략--
david:x:1000:1000:David Beckham:/home/david:/bin/bash
--중략--

사용자이름:비밀번호:UID:GID:설명:홈_디렉터리:셸
```

/etc/passwd 파일의 첫 번째 항목인 "root:x:0:0:root:/root:/bin/bash"은 루트 계정에 대한 정보를 보여줍니다. 위의 마지막 줄에 표시된 형식에 따라 /etc/passwd 파일의 다른 항목에도 동일한 적용됩니다. 이 형식의 각 필드는 콜론(:)으로 구분됩니다. 따라서 루트 계정과 일반 사용자 david의 형식과 출력을 쉽게 매치할 수 있습니다 (위의 "cat /etc/passwd" 출력 참조).

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

패스워드 필드의 x는 암호화된 비밀번호가 별도의 파일 /etc/shadow(아래 설명)에 저장되어 있음을 나타냅니다. 이 파일은 슈퍼유저만 읽을 수 있습니다. 이것은 누구나 시스템에서 /etc/passwd 파일을 읽을 수 있지만(암호화되어 있긴 하지만) 보안 위험이 초래될 수 있기 때문에 필요합니다.

다음은 UID를 살펴봅시다. 루트 계정의 경우, UID는 항상 0으로 표시됩니다. 터미널에서 "cat /etc/passwd"를 실행하면, 루트나 일반 사용자 외에도 UID가 1000 미만인 계정이 많이 나올 것입니다. 이들은 시스템에서 사용되는 계정들로, 파일 /etc/login.defs를 업데이트하여 구성할 수 있습니다. 이 파일을 직접 확인해보세요:

```js
david@debian:~$ cat /etc/login.defs
#
# /etc/login.defs - Configuration control definitions for the login package.
#
# 세 가지 항목은 반드시 정의되어야 합니다: MAIL_DIR, ENV_SUPATH, ENV_PATH.
# 정의되지 않은 경우, 임의의 (가능성 있는) 값으로 간주됩니다. 다른 모든 항목은 선택 사항입니다.
# 주석 문장(문장이 "#"으로 시작하는 문장)과 공백 문장은 무시됩니다.
#
# 리눅스용으로 수정되었습니다.  --marekm

# useradd/userdel/usermod에 필수
#   메일함이 위치하는 디렉토리, _또는_ 파일의 이름, 홈 디렉토리를 상대로한 파일의 이름. 만일
#   MAIL_DIR 및 MAIL_FILE을 정의할 경우, MAIL_DIR가 우선됩니다.
#
#   기본적으로:
#      - MAIL_DIR는 사용자 메일 스불 파일의 위치를 정의하며, 아래에 정의된 것처럼
#        MAIL_DIR에 사용자 이름을 추가함으로써(mbox 사용시) 정의됩니다.
#      - MAIL_FILE은 사용자 메일 스불 파일의 위치를 정의하며, 사용자 홈 디렉토리를
#        $MAIL_FILE 앞에 붙여 편리하게 얻은 완전한 경로 파일 이름으로 정의됩니다
#
# 알림: 이는 더 이상 사용자 메일 환경 변수 설정에 사용되지 않습니다
#       이는 Debian에서 쉐도우 4.0.12-1부터 완전히 pam_mail PAM 모듈의 업무가 되었으며
#       login, su 등에 대한 기본 PAM 구성 파일을 참고하세요.
#
--snip--
```

다시 /etc/passwd 파일로 돌아와서, GID는 해당 계정의 기본 그룹을 나타냅니다. 사용자가 파일을 새로 만들면, 해당 파일은 자동으로 사용자의 기본 그룹에 속하게 됩니다. 그러나 사용자가 다른 그룹을 사용하려면 newgrp 명령을 사용할 수 있습니다.

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

“username:password:UID:GID:comments:home_dir:shell” 형식으로 우리가 논의 중인 바에 따르면, 5번째 필드 (comments)는 계정에 대한 설명이나 원할 경우 비워둘 수 있습니다. 이 필드를 가끔 GECOS 필드라고도 부르는데, 이는 초기 Unix 시절의 관행을 따른 것입니다. 그리고 짐작할 수 있겠지만, 시스템에 로그인하면 일반적으로 홈 디렉터리(home_dir)에 배치됩니다. 루트의 경우는 /root이며, 예시로는 David의 경우 /home/david입니다. 그러나 사용자의 홈 디렉터리가 존재하지 않는 경우에는 루트 디렉터리가 대신 사용됩니다.

마지막으로, shell 필드는 사용자가 계정으로 로그인할 때 실행될 쉘을 나타냅니다. 시스템에 설치된 쉘을 확인하려면 /etc/shells 파일을 확인할 수 있습니다:

```js
david@debian:~$ cat /etc/shells
# /etc/shells: valid login shells
/bin/sh
/bin/dash
/bin/bash
/bin/rbash
/usr/bin/tmux
```

여기서 주목할 점은 /etc/passwd 파일의 shell 필드에 나열된 내용이 실제 쉘이 아닌 경우에도 로그인 시 실행된다는 것입니다. 이러한 이유로 /usr/sbin/nologin 또는 /bin/false과 같이 shell 필드에 여러 계정에 대해 다양한 항목이 채워진 것을 터미널에서 볼 수 있을 것입니다. 이러한 계정은 누구에게도 상호 작용적으로 사용될 수 없습니다. 더불어 필요에 따라 사용자가 로그인할 때 특정 프로그램을 실행할 수 있도록 shell 필드를 사용할 수 있습니다. 예를 들어, 필요한 경우 사용자를 특정 응용프로그램에 강제 접근시킬 수 있습니다.

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

이제 '/etc/shadow' 파일 내용을 확인해보겠습니다.

```js
david@debian:~$ sudo cat /etc/shadow
root:$6$9g1IC8AYzqPorEZSHjWeZP8o21:16502:0:99999:7:::
--중략--
```

여기서 각 필드(총 9개의 필드)가 콜론(:)으로 구분되어 있고 아래와 같이 나타납니다.

- 사용자 이름
- 암호화된 비밀번호
- 1970년 1월 1일부터 현재까지의 일 수(여기서는 16502)로 비밀번호가 변경된 날짜
- 비밀번호를 변경할 수 있는 일 수(여기서는 0)
- 비밀번호를 변경해야 하는 일 수. 여기서 99999는 사용자가 비밀번호를 변경할 필요가 없음을 나타냅니다.
- 사용자에게 비밀번호가 만료될 것임을 알리는 일 수
- 비밀번호가 만료된 후 계정이 비활성화되는 일 수(미할당)
- 계정이 비활성화된 날로부터 현재까지의 일 수(미할당)
- 미래 사용을 위한 예약된 필드

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

위를 읽으면 특정 날짜 01/01/1970이 사용된 이유에 궁금증을 느낄 수 있습니다. 컴퓨팅 에포크와 유닉스 시간을 읽어보시기를 권해 드립니다.

이 강의는 책을 기반으로 합니다. 즉, Linux Administration: The Linux Operating System and Command Line Guide for Linux Administrators (킨들, 페이지)

![이미지](/assets/img/2024-05-16-BecomingLinuxSystemAdministratorusersandgroupspartI_1.png)

- Linux 운영 체제 베스트셀러 (쇼핑 보기)
- Linux 네트워킹 및 시스템 관리 베스트셀러 (보기)
