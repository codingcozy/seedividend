---
title: "Python으로 크롬 확장 프로그램 만들기 1부"
description: ""
coverImage: "/assets/img/2024-07-13-WriteChromeExtensionsinPythonPart1_0.png"
date: 2024-07-13 18:55
ogImage: 
  url: /assets/img/2024-07-13-WriteChromeExtensionsinPythonPart1_0.png
tag: Tech
originalTitle: "Write Chrome Extensions in Python (Part 1)"
link: "https://medium.com/pythoniq/write-chrome-extensions-in-python-6c6b0e2e1573"
isUpdated: true
---





![image](/assets/img/2024-07-13-WriteChromeExtensionsinPythonPart1_0.png)

PyScript은 오랫동안 존재해왔고 Python 코드를 HTML 페이지에 직접 포함하는 방법을 제공합니다. 그러나 지금까지 Python으로 브라우저 확장 프로그램을 만드는 것은 JavaScript 개발자를 위한 프라이빗 멤버 클럽이었습니다. 그러나 더 이상 그렇지 않습니다!

나는 PyScript의 엔지니어링 매니저의 도움을 받아 Python 스크립트를 Chrome Extension으로 실행하고 출력을 표시하며 팝업 상자를 통해 상호 작용을 제공하는 방법을 마침내 깨달았습니다 (위의 스크린샷 참조). 나는 지금 공유할 기초 위에 구축할 수 있는 여러 가지 Python/PyScript 가능성에 대한 문을 넓게 열었습니다...

## 확장 프로그램 파일 만들기


<div class="content-ad"></div>

Extension을 위한 새 폴더를 만들고 다음 저장소를 다운로드하거나 복제하세요:

- `popup.html` 안의 `py-script` 태그와/또는`py-repl` 사이에 자신만의 Python 코드를 추가하세요.
- 필요한 경우 `popup.html`의 `title` 및 `manifest.json`의 이름과/또는 설명을 변경하세요.
- 원하는 경우 /icons에 사용자 정의 아이콘을 추가하고 manifest.json의 기본 아이콘 이름을 업데이트하세요.

## Chrome에 Extension 로드하기

Chrome 주소 표시줄에 chrome://extensions을 입력하세요.

<div class="content-ad"></div>


![이미지](/assets/img/2024-07-13-WriteChromeExtensionsinPythonPart1_1.png)

페이지 오른쪽 상단에 있는 "개발자 모드" 스위치를 켜세요.

![이미지](/assets/img/2024-07-13-WriteChromeExtensionsinPythonPart1_2.png)

"압축 해제된 확장 프로그램을 로드"를 클릭하고 확장 프로그램 폴더를 선택하세요.


<div class="content-ad"></div>

아래와 같이 테이블 태그를 Markdown 형식으로 변경해 주세요.


| Extension Name      | Category | Downloads |
|---------------------|----------|-----------|
| Awesome Extension   | Tools    | 100k      |
| Super Helper        | Productivity | 50k   |
| Quick Access        | Utilities | 30k      |


<div class="content-ad"></div>

![이미지](/assets/img/2024-07-13-WriteChromeExtensionsinPythonPart1_5.png)

![이미지](/assets/img/2024-07-13-WriteChromeExtensionsinPythonPart1_6.png)

브라우저에서 Python을 실행하려면 멋진 새 확장 프로그램 아이콘을 클릭하세요!

![이미지](/assets/img/2024-07-13-WriteChromeExtensionsinPythonPart1_7.png)

<div class="content-ad"></div>

글을 쓰는 시점에서는 이 주제에 대한 도움이 되는 검색 결과가 거의 없기 때문에 이 기사와 pyscript-local-runtime 리포지토리가 여러분이 이 기본적인 빌딩 블록을 적절한 위치에 두기 위해 겪은 시행착오의 시간을 절약해 드릴 수 있기를 바랍니다. 단순히 PyScript를 다루는 재미있는 부분으로 출발해서 브라우저 확장 프로그램의 제약 내에서 "가능한 일의 예"를 탐색해 보세요.

여러분이 어떤 것을 만드는지 기대되네요… 아래 댓글에 공유하고 싶은 예시를 자유롭게 게시해 주세요. 그리고 거기 계신 동안 리포지토리에 "Star"를 눌러 주시는 것 잊지 마세요. 그것은 큰 힘이 될 거예요.

즐거운 코딩 되세요!