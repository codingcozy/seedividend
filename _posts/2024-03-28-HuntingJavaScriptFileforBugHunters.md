---
title: "자바스크립트 파일에서 버그 찾는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Hunting JavaScript File for Bug Hunters"
link: "https://medium.com/stackademic/hunting-javascript-file-for-bug-hunters-e8b278a1306a"
isUpdated: true
---





안녕하세요,

모두들 안녕하세요, 오늘은 페네트레이션 테스팅(버그 찾기)에서의 JavaScript에 대해 이야기해보려고 해요. JS 파일에서 취약점을 수동 및 자동으로 찾는 방법을 알아봐요. 먼저, JavaScript에 대해 이해해봅시다.

![](/assets/img/HuntingJavaScriptFileforBugHunters_0.png)

## 웹 개발에서 JavaScript의 중요성에 대한 몇 가지 핵심 측면:

<div class="content-ad"></div>

1. 상호 작용성: JavaScript는 웹 페이지를 사용하기 즐겁게 만드는 마법봉 같은 존재입니다. 개발자들이 멋진 이미지 슬라이드 쇼, 팝업 상자, 그리고 툴팁과 같은 것들을 만들 수 있게 해줍니다. 무언가를 클릭하면 전체 페이지를 새로 고치지 않고 응답을 받을 수 있어요.

2. 동적 콘텐츠: JavaScript를 실시간 업데이트의 비밀 무기로 생각해보세요. 이것은 전체 페이지를 다시로딩을 기다리지 않고 최신 정보를 손쉽게 보여줍니다. 실시간 소셜 미디어 피드나 채팅과 같은 것들에 유용하여 페이지가 신속하고 응답성이 좋게 느껴집니다.

3. 양식 유효성 검사: 웹 양식을 작성하다가 뭔가 빠트렸을 때 "제출" 버튼을 누르면 놀랐던 적이 있나요? JavaScript는 입력 내용을 타이핑하면서 확인해주어 입력 오류를 사전에 알려줍니다. 그렇게 함으로써 잘못된 정보를 제출하거나 중요한 것을 빼 먹지 않게 해줍니다.

우리의 회사에서 JavaScript가 여러 곳에 널리 사용되고 있음이 분명해졌습니다. 보안 전문가들은 항상 시스템이나 특정 기술의 약점을 찾거나 응용 프로그램의 흐름을 분석하고 공개적인 취약점을 발견하는 등 자신들이 예전에 했던 여러 작업들을 합니다. 그러므로 JavaScript가 어떻게 우리의 침투 테스트 프로세스에서 활용될 수 있는지 자세히 살펴볼게요. 잠시 우리의 JavaScript 요구 사항에 대해 논해보죠. 수동 및 자동 방법을 모두 사용하여 수집하고 가능한 취약점을 식별하기 위해 도구를 활용하는 방법에 대해 이야기해보겠습니다.

<div class="content-ad"></div>

## 우리가 JavaScript에서 찾고 있는 것:

- 새로운 엔드포인트와 매개변수
- 민감한 정보 (API 키, 권한 또는 토큰, 노출된 자격 증명, AWS 및 OAuth 비밀 등)
- 가끔 응용 프로그램이 그때 사용하지 않는 숨겨진 기능
- 숨겨진 또는 내부 포털/하위 도메인

## JavaScript 수동으로 확인하기:

웹 브라우저에서 웹 페이지를 마우스 오른쪽 버튼으로 클릭하고 "페이지 소스 보기" 또는 "검사"를 선택하세요. 이렇게 하면 개발자 도구가 열리고 HTML 소스 코드를 탐색할 수 있습니다. HTML 파일 내에서 JavaScript 참조를 찾아보세요. 이는 일반적으로 'script' 태그를 사용하여 포함됩니다. 이러한 참조를 클릭하여 JavaScript 코드를 볼 수 있습니다.

<div class="content-ad"></div>

가끔 개발자들은 실수로 비밀번호나 API 키와 같은 민감한 데이터를 클라이언트 측 JavaScript 코드에 직접 포함시킬 때가 있습니다. JavaScript 코드 내에서 이 정보를 감지하는 것은 JavaScript 프로그래밍에 대한 폭넓은 배경 지식이 필요하다거나 많은 경험을 요구하지는 않습니다.

## Burp Suite를 사용하여 JavaScript 파일 추출하기:

Burp 프록시를 설정하고 백그라운드에서 실행 중인지 확인하세요. 대상을 정교하게 조사하여 모든 기능과 엔드포인트를 철저히 살펴보세요. 작업을 마치면 프록시 탭으로 이동하여 아래에 표시된대로 필터를 설정하여 모든 JavaScript 파일을 캡처하세요. 결과를 모두 복사하여 "link.txt"라는 이름의 파일에 저장하는 것을 잊지 마세요.

<img src="/assets/img/HuntingJavaScriptFileforBugHunters_1.png" />

<div class="content-ad"></div>

<img src="/assets/img/HuntingJavaScriptFileforBugHunters_2.png" />

아래 코드를 당신의 Kali 머신이나 터미널에서 실행하여 시스템에 있는 모든 ".js" 파일을 다운로드하세요.

<img src="/assets/img/HuntingJavaScriptFileforBugHunters_3.png" />

명령어: wget -P jsfiles -i link.txt

<div class="content-ad"></div>

- wget 명령어는 HTTP 및 FTP 프로토콜을 사용하여 웹에서 파일을 검색할 수 있는 명령어입니다.
- -P 옵션은 파일을 저장할 다른 디렉토리를 지정합니다.
- -i 옵션은 다운로드할 URL 목록이 포함된 파일을 지정합니다.

모든 파일을 하나씩 방문하여 “api key, api_key, password, secret, token, access, pwd, url, config, aws, s3” 등의 키워드를 수동으로 확인할 수 있습니다. 추가적인 정규 표현식 예제를 확인하려면 아래 GitHub 저장소를 방문해보세요:

[GitHub 저장소 링크](https://github.com/l4yton/RegHex?source=post_page-----c95a8aa7037a--------------------------------)

만일 민감한 토큰이나 키를 발견한다면, 아래 저장소를 사용하여 공격을 더 진행할 수 있습니다.

<div class="content-ad"></div>

https://github.com/streaak/keyhacks

## 도구를 사용하여 JavaScript 파일 추출하기:

필수 도구 — 이 도구들을 칼리 리눅스나 시스템에 설치하면 아래의 모든 레포 및 설치 링크를 얻을 수 있습니다:

- Gau: https://github.com/lc/gau
- Waybackurls: https://github.com/tomnomnom/waybackurls
- Httpx: https://github.com/projectdiscovery/httpx
- Subjs: https://github.com/lc/subjs
- Nuclei: https://github.com/projectdiscovery/nuclei

<div class="content-ad"></div>

당신의 시스템에 해당 코드를 bash 파일에 저장해주세요. "target.txt" 파일에는 대상 도메인이 포함되어 있습니다.

![HuntingJavaScriptFileforBugHunters_4](/assets/img/HuntingJavaScriptFileforBugHunters_4.png)

각 명령어에 대한 설명은 다음과 같습니다:

```javascript
cat target.txt | gau | grep ".js" | tee js.txt
cat target.txt | waybackurls | grep ".js" | tee -a js.txt
```

<div class="content-ad"></div>

이 명령어는 target.txt 파일의 내용을 읽어와 subjs 및 httpx 도구로 URL을 추출하고, .js를 포함하는 URL만 필터링하기 위해 grep에 파이프를 연결한 후 결과를 js.txt 파일에 작성하기 위해 tee에 파이프를 연결합니다.

```js
cat target.txt | subjs | httpx -mc 200 | tee -a js.txt
```

이 명령어는 target.txt 파일의 내용을 읽어와 subjs 도구를 이용해 JavaScript 파일을 추출한 후, 각 파일의 상태 코드를 확인하기 위해 httpx에 파이프를 연결하고, 상태 코드가 200인 파일만 필터링한 후 결과를 js.txt 파일에 추가하기 위해 tee에 파이프를 연결합니다.

```js
nuclei -l js.txt -t /root/nuclei-templates/http/exposures/ -o js_bugs.txt
```

<div class="content-ad"></div>

이 명령은 /root/nuclei-templates/http/exposures/ 디렉토리에 위치한 템플릿을 사용하여 js.txt 파일에 저장된 JavaScript 파일을 취약점을 스캔하는 nuclei 도구를 사용합니다. 스캔 결과는 js_bugs.txt 파일에 저장됩니다.

위 방법처럼 "js.txt" 파일에 모든 JavaScript 파일이 포함되어 있다면, GitHub에 "Mantra"라는 도구가 있습니다. 이 도구는 JS 파일과 페이지에서 API 키 누설을 추적하는 데 사용됩니다. 아래 링크에서 GitHub 리포지토리와 설치 단계를 찾을 수 있습니다.

Mantra: https://github.com/MrEmpy/mantra

```js
cat js.txt | Mantra
```

<div class="content-ad"></div>

![이미지](/assets/img/HuntingJavaScriptFileforBugHunters_5.png)

Secret Finder를 사용하여 민감한 엔드포인트와 키를 찾을 수 있습니다. Secret Finder는 Link Finder를 기반으로 한 Python 스크립트로, JavaScript 파일에서 apikeys, accesstoken, authorizations, jwt 등과 같은 민감한 데이터를 발견하는 데 사용됩니다. 이는 Python의 jsbeautifier와 상당히 큰 정규 표현식을 결합하여 수행됩니다. 정규 표현식은 네 개의 작은 정규 표현식으로 구성되어 있습니다. 이들은 js 파일에서 모든 것을 찾고 검색하는 데 책임이 있습니다. GitHub 저장소와 설치 단계에 대한 정보는 아래 링크에서 확인할 수 있습니다.

Secret Finder: https://github.com/m4ll0k/SecretFinder

![이미지](/assets/img/HuntingJavaScriptFileforBugHunters_6.png)

<div class="content-ad"></div>

- cat js.txt: 이 명령어는 대상의 모든 js 파일을 포함하는 js.txt 파일의 내용을 읽습니다.
- while read url;do python3 SecretFinder.py -i $url -o cli ; done: 이 명령어는 while 루프를 사용하여 js.txt 파일에서 각 URL을 읽고 Secret Finder 도구에 연결합니다. -i 플래그는 입력 파일을 지정하고, -o cli 플래그는 결과를 명령행에 작성해야 함을 나타냅니다. 각 스캔 결과는 명령행에 표시됩니다.
- endpoints: 이 명령어는 전체 명령어의 출력을 endpoints 파일에 작성합니다.

아래 스크린샷에서 결과를 확인할 수 있습니다.

![이미지](/assets/img/HuntingJavaScriptFileforBugHunters_7.png)

## JSFScan.sh

<div class="content-ad"></div>

JSFScan.sh은 버그 바운티에서 JavaScript recon을 자동화하는 데 사용되는 도구입니다. 이 도구는 JS 파일을 추출하고 일부 민감한 키워드, 엔드포인트, 비밀, 워드리스트, 변수 등을 수집된 JS 파일에서 추출합니다. 이 도구에 대한 자세한 정보는 다음 블로그를 참조하세요: https://kathanp19.medium.com/beginners-guide-on-how-you-can-use-javascript-in-bugbounty-492f6eb1f9ea

![이미지](/assets/img/HuntingJavaScriptFileforBugHunters_8.png)

```js
bash JSFScan.sh -l target -all -r -o result.ru
```

- -l target: 스캔 대상을 지정하는 옵션일 수 있습니다. -l 뒤의 값은 스캔 대상일 수 있습니다.
- -all: 모든 취약점에 대해 스캔을 수행하고 싶다는 것을 나타낼 수 있는 옵션입니다.
- -r: 또 다른 옵션으로, 더 많은 정보 없이는 해당 옵션이 무엇을 하는지 명확하지 않습니다.
- -o result.ru: 스캔 결과를 저장할 출력 파일인 "result.ru"를 지정하는 옵션인 것 같습니다.

<div class="content-ad"></div>

<img src="/assets/img/HuntingJavaScriptFileforBugHunters_9.png" />

위의 스크린샷을 보면 대상 도메인 js 파일에는 엔드포인트, 비밀 및 기타 정보가 포함되어 있습니다.

이 블로그 포스트에서는 대상을 찾을 때 꼭 필요한 몇 가지 기본 사항을 다뤄 보았습니다. 그러나 JavaScript 파일에 대해서는 포스트에서 다루지 않은 내용이 많습니다. 비밀, URL 및 다른 중요 정보가 포함된 JavaScript 파일을 스캔하는 데 사용할 수 있는 다른 도구로 JS Miner가 있습니다. 이 도구는 Burp Suite 확장 프로그램입니다. 또한 GetJS는 도메인 목록에서 .js 파일을 추출하는 데 사용할 수 있는 도구입니다. .js 파일을 추출한 후에는 특정 키워드로 검색하여 잠재적인 취약점을 식별할 수 있습니다.

이 기사는 침투 테스트 중 시간을 절약하고 이 분야에서 JavaScript의 중요성을 이해하는 데 도움을 주기 위해 작성되었습니다. 우리는 이 기사가 침투 테스트 중 시간을 최적화하고 JavaScript의 중요한 역할을 강조하는 데 도움이 되기를 기대합니다.

<div class="content-ad"></div>

위의 내용을 읽어주셔서 감사합니다!

Twitter: https://twitter.com/VivekGhinaiya

LinkedIn: https://www.linkedin.com/in/vivek-ghinaiya-b3b560202/

Website: https://vivekghinaiya.github.io/about/

<div class="content-ad"></div>
