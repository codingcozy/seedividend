---
title: "HackTheBox-RunnerWriteUp 해커를 위한 HackTheBox-Runner 완벽 공략 가이드"
description: ""
coverImage: "/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_0.png"
date: 2024-07-10 02:29
ogImage: 
  url: /assets/img/2024-07-10-HackTheBox-RunnerWriteUp_0.png
tag: Tech
originalTitle: "HackTheBox-Runner(WriteUp)"
link: "https://medium.com/@aniketdas07770/hackthebox-runner-writeup-1b0e22968745"
---


여러분 안녕하세요! 모두가 잘 지내시길 바래요. 이번에도 글 쓰기 목록에 추가하게 되었어요. 학기 실기시험 때문에 정신이 없었고 6월 첫 주까지 계속 바빠할 것 같아요. 이 글은 상자가 공개된 직후에 작성했지만 HTB 이용 약관(T&Cs) 때문에 지금 발행하고 있어요. 그래서 잠시 보류해뒀었지요. 아직 발행하기에는 너무 이른 시기라는 걸 알아요. 하지만 이미 사람들이 시작했다는 걸 봤거든요. 그래서 저도 자신을 쥐락펴락해야 했어요. 따라서 이미 두-세 주가 지났으니 이제 적기가 되었다고 생각했어요. 그럼 시작해볼까요?

![이미지](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_0.png)

*참고: 정답을 먼저 보여주고 바로 아래에 해설을 붙일 거에요. 그리고 항상 복사하여 붙여넣기를 하지 못하게 할 거에요. 보고 이해하고 직접 타이핑하며 반복해서 진짜로 배워보세요.

1번 문제. 사용자 플래그.

<div class="content-ad"></div>


![이미지](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_1.png)

![이미지](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_2.png)

그래서, `rustscan`으로 시작했습니다.

![이미지](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_3.png)


<div class="content-ad"></div>

![HackTheBox-RunnerWriteUp_4](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_4.png)

안녕하세요! 포트 8000에서 뭔가 발견했어요. 하지만 아무것도 특별하게 느껴지지 않았어요.

![HackTheBox-RunnerWriteUp_5](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_5.png)

그래서 호스트 파일에 'runner.htb'를 추가한 후, 홈페이지를 80번 포트에서 발견했어요. 지금은 feroxbuster를 실행 중이고, 흥미로운 것은 아무것도 찾을 수 없어요. gobuster로 몇 가지 서브도메인을 찾아봤지만, 유용한 정보는 없었어요.

<div class="content-ad"></div>

![이미지](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_6.png)

![이미지](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_7.png)

그래서 UDP 스캔을 수행하는 등 여러 방법을 시도해 봤지만 아무것도 찾지 못했어요. 그래서 Cewl을 사용하여 웹 페이지의 키워드를 사용해 맞춤 워드리스트를 만들었어요. Cewl은 페이지를 스크래핑하여 키워드를 가져올 수 있는 훌륭한 도구에요.

![이미지](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_8.png)

<div class="content-ad"></div>

![이미지](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_9.png)

자, 이제 빙의 단어 중 하나가 들어 있는 서브도메인을 찾았어요. 그래서 호스트 파일에 추가했어요.

![이미지](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_10.png)

여기 로그인 페이지가 있네요. 기본 자격 증명을 찾아보려고 했는데, 성공은 아직 없네요.

<div class="content-ad"></div>

![2024-07-10-HackTheBox-RunnerWriteUp_11.png](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_11.png)

![2024-07-10-HackTheBox-RunnerWriteUp_12.png](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_12.png)

이제 공격을 위한 일반적인 취약점을 찾는데, 원격 명령 실행 (RCE) Proof of Concept (PoC)를 발견했다.

![2024-07-10-HackTheBox-RunnerWriteUp_13.png](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_13.png)

<div class="content-ad"></div>

아마 사용자는 우리가 찾고 있던 사용자는 아닐 것이고 다른 사용자는 없을 것입니다. 아마도 그냥 컨테이너인 것 같아요. 하지만 hosts 파일에서 흥미로운 것을 발견했어요.

![이미지](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_14.png)

무슨 일이 일어났는지 잘 모르겠어요. 처음에는 요청을 만들고 백업 zip 파일을 찾을 수 있었는데, 어느 정도 시간이 지난 후에 feroxbuster를 teamcity 서브도메인에서 실행시켜 보니 어드민 페이지처럼 보이는 것을 발견했어요. 하지만 그 앞에 우리는 먼저 로그인해야 해요.

![이미지](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_15.png)

<div class="content-ad"></div>

그래서, 이 취약점을 이용하여 새로운 관리자 계정을 만들 수 있습니다. 이 계정을 활용해 보겠습니다.

![이미지1](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_16.png)

그래서 한 번 로그인하면, 반드시 거기에 시간을 낭비하지 마세요. 새 프로젝트를 만들어 반전 쉘을 실행하는 데 많은 시간을 낭비했었죠.

![이미지2](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_17.png)

<div class="content-ad"></div>

이 서브도메인에서 feroxbuster를 실행했을 때 관리자 페이지를 발견했어요. 여기서 확인하실 수 있습니다.

![이미지](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_18.png)

따라서 관리자 페이지의 백업 섹션에서 이전에 받았던 쉘에서 발견한 동일한 백업 zip 파일을 찾았어요. 그래서 다운로드 받았고 압축을 풀었습니다.

![이미지](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_19.png)

<div class="content-ad"></div>


![HackTheBox-RunnerWriteUp_20](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_20.png)

데이터베이스 덤프 폴더에서 사용자 파일을 찾았는데 해시값도 있었어요. 두 개 다 해독을 시도했지만 '매튜'만 성공했어요.

![HackTheBox-RunnerWriteUp_21](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_21.png)

SSH를 시도했지만 작동하지 않았어요.


<div class="content-ad"></div>

오케이! config 디렉토리를 열거하다가 SSH 개인 키를 발견했어요.

![image](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_23.png)

이제 인코딩된 SSH 키를 디코드하여 사용자 이름을 찾았어요.

<div class="content-ad"></div>

![HackTheBox-RunnerWriteUp_24](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_24.png)

![HackTheBox-RunnerWriteUp_25](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_25.png)

이제 기본적으로 root가 소유하고 있는 소유권을 변경하고 권한을 설정해주세요.

![HackTheBox-RunnerWriteUp_26](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_26.png)

<div class="content-ad"></div>


![이미지](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_27.png)

로그인 성공! 이제 첫 번째 사용자를 찾았습니다.

Q.2. 루트 플래그.

![이미지](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_28.png)


<div class="content-ad"></div>

오호! 정말 흥미로운 경험이에요. 다른 사용자로 전환해 보려다가 깨진 암호로 실패했어요.

![Runner WriteUp Image 29](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_29.png)

그래서 linpeas 스크립트를 다운로드하고 다른 서브도메인을 발견했어요. 그리고 hosts 파일에 이것을 추가했죠.

![Runner WriteUp Image 30](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_30.png)

<div class="content-ad"></div>

그래서, 그 하위도메인이랑 이야기인데, 구글에서 기본 자격 증명을 찾아보다가 하나를 찾았는데 실패했어. 그래서 얼마 지나지 않아 몇 가지 악용을 찾아보려 했지만 아무것도 찾지 못했어. 결국 '매튜' 사용자의 자격 증명을 시도해 봤더니, 성공했어.

![이미지](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_31.png)

![이미지](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_32.png)

그래서, 이제 구글에서 권한 상승 기술을 찾았어. 링크 확인해봐.

<div class="content-ad"></div>

이제 문제는 이 단계를 따라하려고 했더니, 기사가 이전 포트레이너 버전이라는 것을 발견했습니다. 따라서 이 최신 버전에서의 변경 사항을 찾기 위해 문서를 통과해야 합니다.

![RunnerWriteUp_33](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_33.png)

그래서 실행 환경 액세스를 얻기 위해 클릭했습니다.

![RunnerWriteUp_34](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_34.png)

<div class="content-ad"></div>

와! 이해했습니다. 이제 접근한 셸은 제 생각에 2번째 컨테이너 이미지입니다. 그래서 이제 이 우분투 이미지를 사용하여 우리가 찾은 기사의 지시에 따라 루트를 마운트해야 합니다.

![이미지](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_35.png)

![이미지](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_36.png)

이 두 버전이 완전히 다른 것을 보십시오. 따라서 루트 경로로 '/mnt/root'를 설정하려면 동일한 정확한 설정을 어떻게 얻는지 알아야합니다.

<div class="content-ad"></div>

![2024-07-10-HackTheBox-RunnerWriteUp_37.png](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_37.png)

![2024-07-10-HackTheBox-RunnerWriteUp_38.png](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_38.png)

Volumes 섹션에서 'path'라는 옵션을 만들어보려 했지만, 아쉽게도 해당 옵션은 지원되지 않습니다.

![2024-07-10-HackTheBox-RunnerWriteUp_39.png](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_39.png)

<div class="content-ad"></div>

그래서 문서에서 몇 가지 지원되는 옵션을 찾았어요. 그러나 여전히 그들의 값을 어떻게 설정해야할지 모르겠어요.

하루 종일 이 문제에 갇혀있었는데, 커뮤니티에서 도움을 받았어요. 옵션에 대한 적절한 설명을 받게 되었어요.

```js
device: /
o: bind
type: none
```

device 옵션 값은 우리가 마운트할 경로입니다.

<div class="content-ad"></div>

![이미지](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_40.png)

여기까지 설정을 하면 성공적입니다.

![이미지](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_41.png)

이제 이미지 ID를 복사하세요.

<div class="content-ad"></div>

그럼 이제 새 컨테이너를 추가할 시간입니다.

![image](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_43.png)

![image](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_44.png)

<div class="content-ad"></div>

이제 남은 설정을 기본값으로 설정하고 이전에 찾은 기사와 동일하게 소개된 볼륨과 컨테이너를 설정하십시오.

![이미지](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_45.png)

그래서 볼륨에 대해 설정을 마치고, 우리가 이전에 찾은 기사에서 발견한대로 동일한 볼륨과 컨테이너를 설정하십시오.

![이미지](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_46.png)

<div class="content-ad"></div>

시간이다! 첫 번째를 배포해 보세요.

![HackTheBox-RunnerWriteUp_47](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_47.png)

잘 했어요. 성공했습니다.

![HackTheBox-RunnerWriteUp_48](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_48.png)

<div class="content-ad"></div>

이제 클릭해서 콘솔에 액세스하세요.

[사진1](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_49.png)

[사진2](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_50.png)

따라서 bash 쉘을 얻고 나서 정상적인 마운트를 찾았습니다.

<div class="content-ad"></div>

![이미지](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_51.png)

![이미지](/assets/img/2024-07-10-HackTheBox-RunnerWriteUp_52.png)

그리고 루트 플래그까지 완성! 

즐겁게 즐기셨기를 바랍니다. 다음 시간에 만나요. 잘 가세요!