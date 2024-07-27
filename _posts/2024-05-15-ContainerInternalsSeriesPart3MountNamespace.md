---
title: "컨테이너 내부 시리즈 파트 3 마운트 네임스페이스"
description: ""
coverImage: "/assets/img/2024-05-15-ContainerInternalsSeriesPart3MountNamespace_0.png"
date: 2024-05-15 11:11
ogImage: 
  url: /assets/img/2024-05-15-ContainerInternalsSeriesPart3MountNamespace_0.png
tag: Tech
originalTitle: "Container Internals Series Part 3: Mount Namespace"
link: "https://medium.com/gitconnected/container-internals-series-part-3-mount-namespace-4b3206709ab8"
---


## Golang을 사용하여 Linux 마운트 네임스페이스 만들기

안녕하세요! 이번 글은 시리즈 중 세 번째로, Golang을 사용하여 마운트 네임스페이스를 만드는 방법을 보여드리겠습니다. 마운트 네임스페이스에서 사용되는 명령어와 기본 구성 요소에 대해 알아보고, 이것들이 컨테이너와 어떻게 연관되는지 살펴보겠습니다. 이 시리즈는 컨테이너에 중점을 두지만, 실제로는 프로세스를 실험함으로써 간단하게 설명하고 있습니다. 컨테이너는 본질적으로 프로세스 + 어떤 기본적인 요소로 구성되기 때문입니다. 그럼에도 불구하고, 이곳에서 논의하는 원칙들은 동일하게 적용됩니다.

많은 경우에 리눅스 네임스페이스의 이론은 간단할 수 있지만, 실제로는 처음 보는 것보다 다소 복잡할 수 있습니다. 마운트 네임스페이스에 대한 일반적인 개념을 제공하는 많은 자료가 있으므로, 우리는 핵심적인 부분에 초점을 맞출 것입니다. 우리가 살펴볼 중요한 두 가지 요소는 `mount`와 `pivot_root` 명령어입니다. 이를 통해 우리는 모든 것이 어떻게 컨테이너와 마운트 네임스페이스의 개념에 잘 들어맞는지 이해할 수 있을 것입니다.



# mount()

리눅스 문서에 따르면:

내 설명을 조금 더 자세히 하자면:

mount 명령은 시스템에 있는 장치나 가상 파일 시스템의 파일 시스템을 연결할 수 있는 도구입니다. 이를 통해 해당 파일 시스템을 탐색할 수 있습니다. 어떤 일이 벌어지는지 예를 들어 설명하자면, 컴퓨터에 USB를 연결하면 USB에 있는 이미지와 같은 파일을 검색하고 스크롤할 수 있습니다. 하지만 사용자가 직접 작업하지 않았다면, mount 명령이 백그라운드에서 발생하고 있음을 알 수 없습니다. 그렇지 않다면 이미지를 검색할 수 없습니다. USB를 분리하고자 할 때 컴퓨터가 손상을 방지하기 위해 제대로 분리하라는 메시지를 표시하는 경우도 있을텐데, 이는 umount (즉, "unmount"라고도 함) 명령을 사용하여 이루어집니다.



당신이 놀라실지 모르겠지만, 컴퓨터에 꽂는 USB 드라이브뿐만 아니라 프로시 파일 시스템이나 tmpfs와 같은 가상 파일 시스템에도 해당됩니다. Linux에서 부팅 시 자동으로 마운트되는 모든 가상 파일 시스템 및 장치를 확인할 수 있습니다:

```shell
cat /etc/fstab
```

또는 현재 마운트된 장치를 확인하려면:

```shell
cat /etc/mtab
```



부팅 시 마운트된 루트 폴더도 동일하게 적용됩니다. 몇 가지 콘텍스트를 제공하겠습니다 — 컨테이너 관점에서, 컨테이너 이미지에는 파일 시스템이 포함되어 있고 이를 동일한 컨테이너 프로세스가 루트 파일 시스템으로 보기를 원합니다. 내부적으로는 pivot_root를 사용하여 이를 달성합니다. 일반적인 관점에서 이를 살펴보겠습니다.



현재 프로세스의 마운트 포인트를 확인하려면 다음을 사용하세요:

```js
grep -iP '/ /\s' /proc/$$/mountinfo
```

현재 루트가 /dev/sda*와 같은 디스크를 통해 또는 네트워크를 통해 마운트된 것을 볼 수 있을 겁니다. pivot_root 명령어를 사용하면 현재 루트를 예를 들어 하위 디렉토리로 변경할 수 있습니다. 그러나 이를 수행하기 위한 몇 가지 요구 사항이 있습니다:

- new_root와 put_old는 디렉토리여야 합니다.
- new_root와 put_old는 현재 루트와 동일한 마운트 지점에 있어서는 안 됩니다.
- put_old는 new_root의 하위에 있거나 동일해야 합니다; 다시 말해, put_old가 가리키는 경로에 ../접미사의 양의 정수를 추가하면 new_root와 동일한 디렉토리가 나와야 합니다.
- new_root는 마운트 지점의 경로여야 하지만 /일 수 없습니다. 마운트 지점이 아닌 경로는 스스로에 바인드 마운트하여 마운트 지점으로 변환할 수 있습니다.
- new_root의 상위 마운트의 전파 유형과 현재 루트 디렉토리의 상위 마운트의 전파 유형이 MS_SHARED여서는 안 되며, 비슷하게, put_old가 기존의 마운트 지점인 경우 해당 전파 유형도 MS_SHARED일 수 없습니다. 이러한 제한 사항은 pivot_root()가 다른 마운트 네임스페이스로 변경 사항을 전파하지 않도록 합니다.
- 현재 루트 디렉토리는 마운트 지점이어야 합니다.



저희 코드는 이러한 요구 사항을 충족할 것이지만, 저희가 논의한 두 명령어로부터 중요한 점은 마운트 네임스페이스가 필요하다는 것입니다. 이는 pivot_root가 호스트의 루트 마운트가 아닌 "자식/컨테이너" 네임스페이스 내의 루트 마운트에 영향을 미치도록 해야 한다는 것입니다. 이것이 바로 VM과 컨테이너와 같은 단위가 우리가 정의한 경계를 벗어나 호스트에 영향을 미치지 못하도록 하는 격리의 목표입니다.

# 코드 예시

지난 글에서처럼, 코드 코멘트를 사용하여 기술적인 세부 사항을 안내해 드리겠습니다. 이 방법이 저희가 사용하는 기능을 이해하는 데 훨씬 더 간단하게 만들어준다고 믿습니다.

이 코드는 다음을 수행합니다:



- 새로운 루트를 마운트 포인트로 만들기 위해 mount bind를 생성합니다
- 새로운 마운트 네임스페이스를 생성합니다
- 새로운 마운트 네임스페이스 내에서 Pivot Root를 수행합니다
- 증명 목적으로 /proc 및 /dev를 마운트합니다
- 이전 루트를 언마운트합니다
- 새로운 루트 내에서 /bin/sh를 엽니다

```js
package main

import (
 "os"
 "os/exec"
 "log"
 "syscall"
)

func setupNewMountNamespace(newRoot string, putOld string) {
 // 새로운 루트를 자신에 묶음 - 약간의 해킹
 // PIVOT_ROOT 요구 사항 - "new_root는 마운트 포인트의 경로여야 합니다"
 // MS_BIND - 바인드 마운트 생성
 // MS_REC - 소스의 모든 하위 마운트에 재귀적으로 마운트 (동작) 적용
 if err := syscall.Mount(newRoot, newRoot, "", syscall.MS_BIND|syscall.MS_REC, ""); err != nil {
  log.Fatalln("새 루트 파일 시스템을 마운트하지 못했습니다: ", err)
 }

 // 이전 루트를위한 디렉토리 생성
 // PIVOT_ROOT 요구 사항 - put_old는 new_root의 하위 위치에 있어야 함
 if err := syscall.Mkdir(newRoot+putOld, 0700); err != nil {
  log.Fatalln("mkdir를 실패했습니다: ", err)
 }

 // 현재 프로세스를 소속되어 있는 마운트 네임스페이스와 분리하며, 새로운 마운트 네임스페이스를 생성합니다
  if err := syscall.Unshare(syscall.CLONE_NEWNS); err != nil {
    log.Fatalf("Unshare 시스템 호출에 실패했습니다: %v\n", err)
  }

 // 새로운 루트 파일 시스템으로 pivot_root
 // 참고: 작동하지 않으면 위에 나열된 요구 사항을 다시 확인하세요
 if err := syscall.PivotRoot(newRoot, newRoot+putOld); err != nil {
  log.Fatalln("pivot root를 실패했습니다: ", err)
 }

 // 현재 작업 디렉토리를 새 마운트 네임스페이스에서 "/""로 변경합니다
 if err := syscall.Chdir("/"); err != nil {
  log.Fatalln("/로 chdir를 변경하지 못했습니다: ", err)
 }

 // /proc를 마운트합니다
 if err := syscall.Mount("/proc", "/proc", "proc", 0, ""); err != nil {
  log.Fatalln("/proc를 마운트하지 못했습니다: ", err)
 }

 // 아래와 같이 'mount' 및 'readlink'와 같은 명령을 호출할 수 있어야 합니다
 if err := syscall.Mount("/dev", "/dev", "tmpfs", 0, ""); err != nil {
  log.Fatalln("/dev를 마운트하지 못했습니다: ", err)
 }
 file, err := os.Create("/dev/null"); if err != nil {
   log.Fatal(err)
 }
 defer file.Close()

 // 이전 루트 파일 시스템을 언마운트합니다
 if err := syscall.Unmount(putOld, syscall.MNT_DETACH); err != nil {
  log.Fatalln("이전 루트 파일 시스템을 언마운트하지 못했습니다: ", err)
 }
}

func main() {
 processID := os.Getpid()
 log.Printf("프로세스 ID: %d\n", processID)

 // 현재 마운트 네임스페이스를 확인합니다
 out, err := exec.Command("readlink", "/proc/self/ns/mnt").Output(); if err != nil {
  log.Fatalf("네임스페이스 파일을 읽는 중 오류 발생: %v\n", err)
 }
 log.Printf("프로세스는 현재 이전 마운트 네임스페이스에 있습니다: %s", string(out))

 newRoot := "new_root"
 putOld := "/old_root"
 setupNewMountNamespace(newRoot, putOld)

 // 현재 마운트 네임스페이스를 확인합니다
 out1, err := exec.Command("readlink", "/proc/self/ns/mnt").Output(); if err != nil {
  log.Fatalf("네임스페이스 파일을 읽는 중 오류 발생: %v\n", err)
 }
 log.Printf("프로세스는 이제 새 마운트 네임스페이스에 있습니다: %s", string(out1))

 log.Println("새 마운트 네임스페이스에서 셸 (bin/sh)을 열고 'mount', 'lsns' 등 명령을 실행합니다.")
 cmd := exec.Command("/bin/sh")
 cmd.Stdin = os.Stdin
 cmd.Stdout = os.Stdout
 cmd.Stderr = os.Stderr
 if err := cmd.Run(); err != nil {
  log.Println("명령 실행에 실패했습니다: ", err)
  os.Exit(1)
 }
}
```

# 결론

요약하자면, 이 기사에서는 Golang을 사용하여 마운트 네임스페이스를 생성하고, mount 및 pivot_root와 같은 주요 명령을 강조했습니다. 코드 예제를 통해 컨테이너 격리에서 마운트 네임스페이스의 역할을 명료하게 했기를 바랍니다.