---
title: "맥OS 및 리눅스용 SSH 키 생성기"
description: ""
coverImage: "/assets/img/2024-05-15-SSHKeyGeneratorforMacOSLinux_0.png"
date: 2024-05-15 03:50
ogImage: 
  url: /assets/img/2024-05-15-SSHKeyGeneratorforMacOSLinux_0.png
tag: Tech
originalTitle: "SSH Key Generator for MacOS , Linux"
link: "https://medium.com/@barisdemirkap_80894/ssh-key-generator-for-macos-linux-33a191c23b75"
---


<img src="/assets/img/2024-05-15-SSHKeyGeneratorforMacOSLinux_0.png" />

우선, 제 코딩 인생에서 좋아하는 인용구부터 시작하겠어요:
“어떤 일을 6분 동안 수동으로 할 때 6시간을 써서 자동화를 실패하는 것이 더 나을 때가 있다." — Zhuowei Zhang

대부분의 개발자들이 SSH 키를 생성하고 연결하는 방법에 대해 문서를 참고해 왔을 겁니다. 지난 3년간 이 프로세스를 4~5번 되풀이했는데, 총 40~50분 정도 걸렸어요. 결국, 이러한 과업을 다시 찾아보지 않도록 스크립트를 작성하기로 결심했습니다. 아래에는 해당 스크립트를 공유하고 있어요. "your_remote_server_url"을(를) 실제 원격 서버 URL로 교체해 주시기 바랍니다.

```js
#!/bin/bash

# Command existence 확인하는 함수
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# 현재 운영 체제 감지
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS
  CLIP_CMD="pbcopy"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
  # Linux
  if command_exists "xclip"; then
    CLIP_CMD="xclip -selection clipboard"
  elif command_exists "xsel"; then
    CLIP_CMD="xsel --clipboard"
  else
    echo "클립보드 유틸리티(xclip 또는 xsel)를 찾을 수 없습니다. 계속 진행하려면 설치해 주세요."
    exit 1
  fi
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
  # Windows (Cygwin 또는 MSYS)
  echo "Windows에서는 클립보드 복사 명령을 지원하지 않습니다."
  echo "SSH 키를 수동으로 복사해 주세요."
  CLIP_CMD=":"
else
  echo "지원되지 않는 운영 체제입니다."
  exit 1
fi

# 사용자에게 GitHub 이메일 입력 요청
read -p "GitHub 이메일 주소를 입력하세요: " email

# SSH 키 생성
ssh-keygen -t rsa -b 4096 -C "$email"

# SSH 키를 클립보드에 복사
cat ~/.ssh/id_rsa.pub | $CLIP_CMD

# 사용자에게 SSH 키가 클립보드에 복사되었음을 알림
echo "SSH 키가 클립보드에 복사되었습니다."

# GitHub 설정 페이지를 기본 브라우저에서 열기 (macOS 및 Linux 전용)
if [[ "$OSTYPE" == "darwin"* || "$OSTYPE" == "linux-gnu"* ]]; then
  echo "기본 브라우저에서 GitHub 설정 페이지를 엽니다..."
  open "https://github.com/settings/ssh" # 여기에 원격 서버 URL이 있어요
fi

echo "SSH 키를 GitHub 계정에 추가해 주세요."
```



원하는대로 스크립트를 수정하십시오!