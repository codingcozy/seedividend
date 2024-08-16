---
title: "깃허브에서 SSH 키 생성하는 빠른 스텝별 가이드"
description: ""
coverImage: "/assets/img/2024-06-20-QuickStep-By-StepGuidetoGeneratinganSSHKeyinGitHub_0.png"
date: 2024-06-20 01:03
ogImage: 
  url: /assets/img/2024-06-20-QuickStep-By-StepGuidetoGeneratinganSSHKeyinGitHub_0.png
tag: Tech
originalTitle: "Quick Step-By-Step Guide to Generating an SSH Key in GitHub"
link: "https://medium.com/@kyledeguzmanx/quick-step-by-step-guide-to-generating-an-ssh-key-in-github-d3c6f7e185bb"
isUpdated: true
---




## 쉽고 간단하며 비기술적인 설명

![이미지](/assets/img/2024-06-20-QuickStep-By-StepGuidetoGeneratinganSSHKeyinGitHub_0.png)

친구들,

이 튜토리얼은 우리 둘 다를 위한 것이에요. SSH 키를 설정해야 했던 적이 두세 번 있었는데, 매번 악몽이었죠. 즐겁게 경험한 적은 없어요. 제가 찾은 대부분의 튜토리얼은 복잡하고 따라가기 어려웠어요.

<div class="content-ad"></div>

이 글에서는 프로세스를 간단히 설명하겠습니다. SSH 키를 생성하는 간단한, 비기술적인, 단계별 가이드를 제공하겠습니다. 영어로 설명되어 있어 초등학생조차 따를 수 있을 것이며, 사진도 있습니다. 누가 사진을 싫어하겠어요?

시작해봅시다.

## Windows 터미널

시작하기 위해 Windows 터미널을 여시면 됩니다. 이 튜토리얼에서는 Ubuntu 터미널을 사용하겠습니다.

<div class="content-ad"></div>

![이미지](/assets/img/2024-06-20-QuickStep-By-StepGuidetoGeneratinganSSHKeyinGitHub_1.png)

현재 데스크톱 폴더에 있는지 확인해주세요. 위 스크린샷에서 보듯이, 저는 현재 데스크톱 폴더에 있어요.

만약 데스크톱 폴더에 있지 않다면, 수정해봅시다.

- 폴더에 들어가려면 cd 폴더명을 사용하세요. 폴더명 자리에 들어가고 싶은 폴더명을 넣어주세요.
- 현재 폴더를 벗어나려면 cd ~를 사용하세요.
- 현재 위치한 폴더 안의 폴더와 파일을 보려면 ls를 사용하세요.

<div class="content-ad"></div>

이 명령어를 사용하여 데스크톱 폴더로 이동하세요.

## SSH 폴더 열기

교수님께서 .ssh 폴더에 SSH 키를 저장하라고 가르쳐 주셨어요. 그렇게 하면 모든 키가 동일한 폴더에 포함됩니다. 이제 그 방법을 보여 드릴게요.

이 폴더를 생성하려면 다음을 실행하세요:

<div class="content-ad"></div>

```js
mkdir .ssh
```

mkdir은 현재 폴더에 새 디렉토리(즉, 폴더)를 만드는 명령어입니다. 현재 데스크톱 폴더에 있기 때문에 이 명령은 데스크톱에 .ssh라는 폴더를 만듭니다.

그리고 나중을 위해, 만약 이 폴더가 이미 있는지 확인하고 싶다면, 다음을 실행할 겁니다:

```js
ls -larths
```

<div class="content-ad"></div>

위에 표시된 이미지는 ls -larths 명령어의 결과입니다. 제일 아래에서 .ssh 폴더를 볼 수 있습니다. 저는 그것을 노란색으로 강조했어요.

이 폴더를 생성한 후에는 이 폴더로 이동하고 싶어요. 다음 명령어로 폴더로 이동하세요:

```js
cd .ssh
```

<div class="content-ad"></div>

## SSH 키 생성하기

SSH 폴더 안에 있어요. 제 경우처럼 SSH 키가 이미 있는 경우가 있습니다. 우리는 개인 및 공개 RSA 키를 가지고 있습니다.

키가 이미 있는지 확인하려면 ls를 사용할 수 있어요.

![이미지](/assets/img/2024-06-20-QuickStep-By-StepGuidetoGeneratinganSSHKeyinGitHub_3.png)

<div class="content-ad"></div>

제 경우에는 그 키들이 존재합니다. 저희의 개인 키인 id_rsa가 있습니다. 아무에게도 공유하지 마세요. 그리고 우리의 공개 키인 id_rsa.pub도 있습니다. 이웃들과 자유롭게 공유하세요.

만약 키가 없다면, 만들어 봅시다. .ssh 폴더 안에서 다음 명령어를 실행하세요:

```js
ssh-keygen -b 4096 -t rsa
```

이 명령은 4096비트의 RSA 키를 생성합니다. 이는 고수준의 암호화를 제공합니다. 원한다면 다르게 설정할 수 있습니다.

<div class="content-ad"></div>

커스터마이징할 수 있는 내용을 보려면 man ssh-keygen 명령어를 실행해보세요. 여기서 사용할 수 있는 모든 플래그가 표시될 거에요. 하지만 초보자라면 위 명령어로 충분히 작동할 거예요. 일이 처리될 거에요.

명령어를 실행해보세요. 공개 및 비공개 RSA 키 쌍을 생성하기 시작할 거에요. 파일, 비밀번호, 그리고 다시 한번 비밀번호를 요청할 거에요. 모두 엔터 키를 눌러 건너뛸 수 있어요.

그러면 끝이에요. RSA 키가 생성되었습니다. 앞서 말한 대로 ls를 사용해 키가 이미 존재하는지 확인할 수 있어요.

![image](/assets/img/2024-06-20-QuickStep-By-StepGuidetoGeneratinganSSHKeyinGitHub_4.png)

<div class="content-ad"></div>

아래와 같이 확인하실 수 있어요.

한 번, 우리가 id_rsa.pub 인 공개 키를 가지게 되면, 이것을 확인하고 싶어요. SSH 키를 확인하고 싶어요.

다음 명령어를 사용하여 id_rsa.pub 파일을 열어봐요.

```js
less id_rsa.pub
```

<div class="content-ad"></div>

<img src="/assets/img/2024-06-20-QuickStep-By-StepGuidetoGeneratinganSSHKeyinGitHub_5.png" />

요렇게 나와야 할 거에요. 전체 청크를 복사하시고요 — 전체 청크를 말이에요. 그 다음에 GitHub에 붙여넣을 거에요.

# GitHub

## GitHub에 로그인하고 설정으로 이동하기

<div class="content-ad"></div>


![Step 6](/assets/img/2024-06-20-QuickStep-By-StepGuidetoGeneratinganSSHKeyinGitHub_6.png)

## Open the Tab “SSH and GFG Keys”

![Step 7](/assets/img/2024-06-20-QuickStep-By-StepGuidetoGeneratinganSSHKeyinGitHub_7.png)

## Create a “NEW SSH KEY”


<div class="content-ad"></div>


![QuickStep-By-StepGuidetoGeneratinganSSHKeyinGitHub_8](/assets/img/2024-06-20-QuickStep-By-StepGuidetoGeneratinganSSHKeyinGitHub_8.png)

The screen shown below will pop up.

![QuickStep-By-StepGuidetoGeneratinganSSHKeyinGitHub_9](/assets/img/2024-06-20-QuickStep-By-StepGuidetoGeneratinganSSHKeyinGitHub_9.png)

Give your SSH key a meaningful title. I called mine ASUS LAPTOP.


<div class="content-ad"></div>

그럼 SSH 키를 붙여넣으세요. "SSH 키 추가" 버튼을 누르세요. GitHub에서 당신이 정말 본인임을 확인하려면 비밀번호를 입력하라는 메시지가 표시될 거에요. 비밀번호를 확인한 후에는 모두 준비된 거죠!

이제 여러분은 SSH 키가 항상 데스크톱에 저장된다는 것을 기억할 수 있어요. 그 키들은 .ssh라는 폴더에 있답니다.

끝났어요. 축하해요.