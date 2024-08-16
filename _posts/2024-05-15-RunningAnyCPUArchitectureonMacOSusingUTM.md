---
title: "제목 UTM을 사용하여 MacOS에서 Any CPU 아키텍처 실행하기"
description: ""
coverImage: "/assets/img/2024-05-15-RunningAnyCPUArchitectureonMacOSusingUTM_0.png"
date: 2024-05-15 16:02
ogImage: 
  url: /assets/img/2024-05-15-RunningAnyCPUArchitectureonMacOSusingUTM_0.png
tag: Tech
originalTitle: "Running Any CPU Architecture on MacOS using UTM"
link: "https://medium.com/@fongyang/running-any-cpu-architecture-on-macos-using-utm-a1de25af85ff"
isUpdated: true
---




<img src="/assets/img/2024-05-15-RunningAnyCPUArchitectureonMacOSusingUTM_0.png" />

저는 맥용 Parallels를 오랫동안 사용해왔는데, 이 제품은 플랫폼을 위한 최고의 가상화 소프트웨어 옵션 중 하나로 널리 인정받고 있어요. 그러나 Parallels는 M1, M2, M3과 같은 Apple Silicon 프로세서가 장착된 시스템에서 Rosetta를 사용하여 x86_64 응용 프로그램을 실행할 수 있는 능력이 있긴 하지만, 호환성 문제로 인해 x86_64 응용 프로그램이 제대로 작동하지 않거나 전혀 작동하지 않는 경우가 종종 있어요.

최근에 x86_64 기반 소프트웨어를 실행해야 할 필요가 있을 때, CPU 에뮬레이션을 제공하는 대체 가상화 소프트웨어를 찾았습니다. UTM은 이러한 공백을 완벽하게 채워주며, Apple Silicon 맥에서 x86_64 응용 프로그램을 실행할 수 있는 신뢰할 수 있는 솔루션을 제공해요.

UTM은 Apple 스토어에서 9.99달러에 구매할 수 있으며, 자동 업데이트가 포함되어 있어요. 또는 https://docs.getutm.app/installation/macos/에서 무료로 UTM을 다운로드하고 설치할 수도 있어요. 그러나 무료 옵션을 선택하는 경우, 자동 업데이트를 받을 수 없음을 참고해 주세요.



## 주요 UTM 기능

UTM은 Parallels와 같은 다른 가상화 소프트웨어와 다르게 x86_64와 같은 아키텍처의 완전 에뮬레이션을 제공하기 위해 QEMU(Quick Emulator)를 이용한다는 점에서 차별화됩니다. 이 접근 방식은 해당 특정 아키텍처를 위해 설계된 소프트웨어를 실행하려고 할 때 가장 호환성이 높은 환경을 제공하지만, 다른 가상화 방법에 비해 다소 효율성이 떨어질 수 있습니다.

UTM은 x86, x86–64, ARM32, ARM64, MIPS, PowerPC 및 RISC-V를 포함한 30개 이상의 프로세서 아키텍처를 지원하는 다재다능한 에뮬레이션 플랫폼입니다. 이 높은 호환성으로 UTM은 특정 아키텍처를 필요로 하는 개발자와 열렬한 지지자들에게 이상적인 선택지가 됩니다.

## UTM을 사용하여 가상 머신 생성하기



가상 머신을 생성할 때 다음과 같은 옵션이 제공됩니다.

![가상머신 생성 옵션](/assets/img/2024-05-15-RunningAnyCPUArchitectureonMacOSusingUTM_1.png)

가상화 모드는 빠르게 실행되지만 네이티브 CPU 아키텍처만 실행할 수 있습니다. 예를 들어 시스템에 M1 프로세서가 있는 경우 가상 머신은 동일한 M1 CPU 아키텍처를 사용합니다.

두 번째 옵션 "에뮬레이트"는 시스템이 다른 아키텍처를 에뮬레이트할 수 있도록 합니다.



다른 옵션은 UTM 갤러리에서 미리 구축된 이미지를 다운로드하는 것입니다. Arch Linux, 다양한 Debian 배포판, Fedora, Kali Linux, macOS, ReactOS, Sun Solaris, Ubuntu, Windows 10, Windows 11, Windows 7, 그리고 Windows XP 등의 여러 운영 체제를 찾을 수 있습니다.

"Emulate" 옵션을 선택하면 Windows, Linux 및 기타 옵션을 포함한 미리 구성된 선택지 목록이 표시됩니다. 설치할 운영 체제에 해당하는 항목을 선택하세요.

![이미지](/assets/img/2024-05-15-RunningAnyCPUArchitectureonMacOSusingUTM_2.png)

설치 후에 좌측 패널에서 새로 만든 가상 머신을 마우스 오른쪽 버튼으로 클릭하고 구성을 조정할 수 있습니다. CPU 코어 수, RAM 크기, 네트워크 어댑터 유형과 같은 설정을 선호에 맞게 수정할 수 있습니다. 또한 필요한 경우 QEMU 설정을 사용자 정의할 수도 있습니다.



UTM에서 제공하는 사전 구성된 VM 이미지 중 하나를 사용하면 공유 디스크 및 공유 클립보드와 같은 기능이 사전 구성되어 있습니다. 필요한 기능을 제공하는 경우 사전 구성된 이미지를 사용하는 것이 좋습니다. 그러나 다른 OS 또는 아키텍처를 사용해야 하는 경우 자체 원하는 구성으로 ISO 파일에서 설치할 수 있습니다.

중요한 점은 ISO에서 설치하는 경우 설치 후 VM 구성에서 ISO를 제거해야만 ISO에서 부팅을 계속하지 않습니다.

![이미지](/assets/img/2024-05-15-RunningAnyCPUArchitectureonMacOSusingUTM_3.png)

VM 구성으로 이동하여 ISO를 지워주세요.



<img src="/assets/img/2024-05-15-RunningAnyCPUArchitectureonMacOSusingUTM_4.png" />

## 공유 디스크

UTM에서 공유 디스크를 사용하려면 VirtFS 또는 Spice WebDAV를 선택할 수 있습니다. UTM은 주로 Linux 게스트와 폴더를 공유하기 위해 9pfs를 사용하지만, RHEL9 또는 Rocky Linux 9와 같은 9p 파일 시스템을 지원하지 않는 시스템에서 9p 대신 Spice WebDAV를 대안으로 사용할 수 있습니다.

원하는 구성을 게스트 VM 구성 화면에서 선택하세요.



## 9p 파일 시스템 사용 방법

9p 파일 시스템은 WebDAV보다 빠릅니다. 이를 선호하는 선택입니다. QEMU의 9p 파일 시스템을 사용하면 사용자가 가상 파일 시스템 장치를 만들고 이를 게스트 가상 머신에 노출할 수 있습니다. 이를 통해 호스트 머신의 디렉토리를 게스트 운영 체제가 직접 액세스할 수 있게하는 9P 네트워크 프로토콜을 사용하여 호스트와 게스트 간의 통신이 가능해집니다.

호스트에서 공유된 9p 파일 시스템을 마운트하는 것은 그다지 간단하지 않습니다. 인터넷에 많은 정보가 있지만 대부분이 틀린 것 같았어요. 제가 도움이 되었던 정보를 공유하겠습니다.

아래 단계는 RPM 기반 시스템에서도 유사하지만 예시로 우분투를 사용할 것입니다.



저의 경우에는 Downloads 디렉토리를 내보냈습니다. "Downloads"를 사용하여 마운트할 수 있을 것으로 예상했지만, UTM이나 QEMU는 볼륨을 "share"로 내보내는 것으로 나타났습니다.

공유 이름을 보려면 VM용 QEMU 설정을 내보내세요. 아래에 표시된 것처럼 공유 이름이 거기에 표시됩니다:

![share](/assets/img/2024-05-15-RunningAnyCPUArchitectureonMacOSusingUTM_5.png)

이 경우의 마운트 태그인 export 이름은 "share"입니다:



"공유는 'share'로 불립니다. 다만, 다운로드 폴더를 공유하도록 구성했음에도 불구하고 'Downloads'로 불리길 기대했습니다.

수동으로 마운트하려면 다음을 실행하세요:

fstab에 추가하여 부팅 시 파일 시스템을 자동으로 마운트할 수 있습니다.

## WebDAV 파일 공유"



WebDAV는 호스트와 게스트 가상 머신 간의 파일 시스템을 공유하는 대안으로 작용합니다. 9p 파일 시스템을 통한 파일 공유는 더 빠를 수 있지만 널리 지원되지는 않습니다. 예를 들어, Rocky Linux 9는 9p 파일 시스템을 지원하지 않습니다.

다음 지침은 Ubuntu를 사용하여 수행되지만, 다른 리눅스 배포판에 대해서도 비슷하게 적용될 것입니다.

먼저, 게스트 구성에서 Spice WebDAV를 선택하십시오:

![Spice WebDAV](/assets/img/2024-05-15-RunningAnyCPUArchitectureonMacOSusingUTM_6.png)



우분투 24에서는 /etc/default/spice-vdagentd 파일을 추가하지 않으면 spice-vdagentd가 시작되지 않습니다. 이 파일을 만들기 전까지 오류 메시지가 나타날 것입니다:

![image](/assets/img/2024-05-15-RunningAnyCPUArchitectureonMacOSusingUTM_7.png)

다음 내용으로 `/etc/default/spice-vdagentd` 파일을 만드세요:

그런 다음 다음 명령어로 spice.vdagentd를 다시 시작할 수 있습니다:



서비스를 다시 시작하고 나면 WebDAV를 사용하여 공유를 마운트할 수 있습니다. 예를 들어:

![example](/assets/img/2024-05-15-RunningAnyCPUArchitectureonMacOSusingUTM_8.png)

호스트에서 공유된 localhost:9843을 사용하여 공유를 마운트할 때 사용자 이름이나 비밀번호를 지정할 필요가 없었어요.

필요한 경우 fstab에도 추가할 수 있습니다.



## 공유 클립보드

공유 클립보드는 UTM 가상화에서 사용자가 호스트 운영 체제와 가상 머신 간에 텍스트를 원활하게 복사하고 붙여 넣을 수 있는 편리한 기능입니다. 그러나 ISO에서 수동 설치할 때는 자동으로 설치되지 않을 수 있습니다.

복사 및 붙여 넣기를 활성화하려면 가상 머신의 구성에서 클립보드 공유가 활성화되어 있는지 확인하십시오. 그런 다음 가상 머신 내에서 'spice-vdagentd' 및 'spice-vdagent' 패키지를 설치하십시오. 설치 후에는 systemctl을 사용하여 spice-vdagentd를 시작하십시오. 그런 다음 spice-vdagent 소프트웨어를 시작하십시오. X11이 시작될 때 spice-vdagentd를 시작하려면 ~/.xinitrc에 추가할 수 있습니다.

## 설치 중 발생할 수 있는 문제들



특정 운영 체제나 아키텍처를 UTM을 사용하여 실행하는 것은 도전적일 수 있습니다. 이것은 Parallels처럼 간단히 연결하고 사용하는 것처럼 간단하지 않습니다. 유연성은 더 복잡한 설정으로 이어질 수 있습니다.

예를 들어, 기본 CPU 설정은 x86_64 에뮬레이션을 사용하는 Rocky Linux 9에서 작동하지 않습니다. AMD EPYC 프로세서를 에뮬레이션하는 경우 Rocky Linux 9에서 x86_64 에뮬레이션 아래에서 잘 작동합니다.

또한, 기본 디스플레이 설정은 작동하지 않으며 '디스플레이 출력이 활성화되지 않았다'는 오류 메시지가 표시됩니다. 이 문제를 해결하려면 VM의 설정으로 이동하여 기본 'virtio-gpu-pci'에서 'virtio-vga'로 변경하십시오. 이것은 콘솔 전용 디스플레이에 표준 VGA를 제공합니다.



또한, 기본 디스플레이 설정이 작동하지 않고 "디스플레이 출력이 활성화되지 않았다"는 오류가 발생하는 경우, VM 설정으로 들어가서 "Emulated Display Card"를 기본값인 "virtio-gpu-pci"에서 "virtio-vga"로 변경해 보세요. 이렇게 하면 콘솔 전용 디스플레이에 표준 VGA가 제공됩니다.

## 결론

도움이 되셨으면 좋겠습니다. 작동하는 해결책을 찾기 위해 많은 시행착오를 겪었습니다. 이 정보가 여러분의 시간을 절약하는 데 도움이 되기를 바랍니다.