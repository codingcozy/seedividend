---
title: "윈도우에서 WSL2 및 도커 성능을 20배 높이세요"
description: ""
coverImage: "/assets/img/2024-05-12-IncreaseWSL2andDockerPerformanceonWindowsBy20x_0.png"
date: 2024-05-12 20:19
ogImage: 
  url: /assets/img/2024-05-12-IncreaseWSL2andDockerPerformanceonWindowsBy20x_0.png
tag: Tech
originalTitle: "Increase WSL2 and Docker Performance on Windows By 20x"
link: "https://medium.com/@suyashsingh.stem/increase-docker-performance-on-windows-by-20x-6d2318256b9a"
---


일단 해결 방법에 관심이 있다면 건너뛰고, 제 글이 마음에 들 경우 계속 읽어주세요.

개발자로서 윈도우 사용 경험은 대체로 좋았고 술술 잘 되었습니다. 그러나 도커를 접하면서 여행이 조금 중단되었습니다. Linux로 전환하기 싫었어요. 그 귀찮고 번거로운 일들 때문에 말이죠. 개발자로서 그런 얘기를 하긴 이상하지만, 오늘날 OEM 노트북들에 있는 다양한 문제들 때문에 Linux로 전환하는 건 지금은 정말 괴로운 일입니다. Secure Boot, Bitlocker Encryption과 같은 여러 문제들 때문이죠.

![image](/assets/img/2024-05-12-IncreaseWSL2andDockerPerformanceonWindowsBy20x_0.png)

이 말이 사실이었을 거예요. WSL2(Windows Subsystem Linux)가 없었다면 말이죠. WSL2는 Microsoft가 제공하는 호환성 레이어로, 사용자가 Windows OS 내에서 Linux의 전체 기능을 활용할 수 있게 해 줍니다! 정말 멋지고 훌륭한 기술이에요.



# 하지만 한 가지 함정이 있어요...

기분 좋은 저는 유행에 동참했어요. 설정하는 것은 꽤 쉬웠고, 문서도 매우 명확했어요. 여기에서 찾을 수 있어요. 기쁘게도 Docker Desktop을 설치하고 기뻐서 오픈 소스 프로젝트에서 docker compose up을 실행했는데, 약속한 대로 되나 확인해봤더니...

![image](/assets/img/2024-05-12-IncreaseWSL2andDockerPerformanceonWindowsBy20x_1.png)

WSL2의 성능이 정말 좋지 않았어요. 정말 진지하게 말하면, 로컬 머신에서 2-3초가 걸릴 작업들을 Django에서 핫 리로드하는 데 엄청 오랜 시간이 걸렸어요. 이러한 성능으로 개발하는 것은 거의 불가능했죠. 그러나 조금의 조사와 문서 검색을 통해 해답을 찾을 수 있었어요.



# 해결책

해결책은 여기 문서에 기재되어 있습니다. 기술적인 용어를 간단히 하기 위해, Windows 파일 시스템에서 복제하거나 프로젝트를 만드는 대신 WSL2 자체에서 직접 작업해야 합니다. 이게 무슨 말인지 보여드릴게요.

## 단계 1. WSL2 내에서 git clone/새 프로젝트 만들기:

- 파일 탐색기를 열고 왼쪽 하단에 Linux가 표시됩니다. 메뉴를 확장합니다.



<img src="/assets/img/2024-05-12-IncreaseWSL2andDockerPerformanceonWindowsBy20x_2.png" />

- 저는 우분투를 설치했어요. 원하시는 배포판의 WSL2에서 프로젝트를 만들거나 복제할 수 있어요.
- /home/'Your-Name'/projects 폴더를 만들어주세요. 이 단계는 선택 사항이며, 리눅스에서 프로젝트가 보통 만들어지는 관례를 준수하는 것뿐이에요.

<img src="/assets/img/2024-05-12-IncreaseWSL2andDockerPerformanceonWindowsBy20x_3.png" />

- 이제 projects 폴더 안에서 터미널을 열고, 마우스 오른쪽 버튼을 클릭하여 이 폴더 내에서 새 프로젝트를 만들거나 복제해주세요.



도커 컴포즈를 실행하고 와! 성능이 밤낮으로 달라졌어요. 아래 이미지에서 핫 리로드 속도의 차이를 명확히 확인할 수 있어요.

IDE에서 코드를 편집하려면 몇 가지 추가 단계가 필요해요. Visual Studio Code 사용자는 WSL 확장을 설치하기만 하면 됩니다. Linux 파일 시스템에서 프로젝트를 열 때 아래와 같은 프롬프트가 표시됩니다. 다른 IDE 사용자는 아래 기사를 참조하세요.

![이미지](/assets/img/2024-05-12-IncreaseWSL2andDockerPerformanceonWindowsBy20x_4.png)

# 결론



저는 WSL2를 발견한 이후로 엄청난 성능 향상을 경험하며 행복하게 사용해왔고, 그로 인해 쉽게 WSL2를 추천할 수 있어요. 하지만 왜 Windows 파일 시스템에서 성능이 저하되는지 궁금해하시나요? 이는 Linux 파일 시스템과 Windows 파일 시스템이 본질적으로 다르기 때문에, Windows에서 도커 컴포즈를 실행하면 Docker가 서로 다른 파일 시스템 간 호환성을 유지하기 위해 힘들게 작업해야 하기 때문이에요.

이 간단하고 깔끔한 팁이 유용하게 느껴지시면, 이 기사에 박수를 치고 동료들 사이에서 공유해보세요. 감사합니다!