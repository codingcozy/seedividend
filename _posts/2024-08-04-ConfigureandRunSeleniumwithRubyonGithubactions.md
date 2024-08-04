---
title: "Selenium을 Ruby로 Github Actions에 설정하고 실행하는 방법"
description: ""
coverImage: "/assets/img/2024-08-04-ConfigureandRunSeleniumwithRubyonGithubactions_0.png"
date: 2024-08-04 19:06
ogImage: 
  url: /assets/img/2024-08-04-ConfigureandRunSeleniumwithRubyonGithubactions_0.png
tag: Tech
originalTitle: "Configure and Run Selenium with Ruby on Github actions"
link: "https://medium.com/@pradappandiyan/setting-up-selenium-with-ruby-a-step-by-step-guide-93f8da4518e2"
---


<img src="/assets/img/2024-08-04-ConfigureandRunSeleniumwithRubyonGithubactions_0.png" />

셀레니움 웹 드라이버는 웹 브라우저를 자동화하는 강력한 도구입니다. 다양한 프로그래밍 언어를 지원하며, 이 안내서에서는 Ruby로 설정하는 방법에 중점을 둘 것입니다. 또한 제공된 코드를 사용하여 HTML 보고서를 만드는 방법도 소개할 것입니다.

필수 조건

시작하기 전에 다음이 설치되어 있는지 확인하세요:

<div class="content-ad"></div>

- 루비
- 루비젬 (일반적으로 루비와 함께 제공됨)
- 크롬 브라우저
- 크롬 드라이버

루비 설치하기

루비가 설치되어 있지 않은 경우 공식 루비 웹사이트에서 다운로드할 수 있습니다.

다음은 당신의 필요에 따라 루비를 다운로드할 수 있는 웹사이트입니다.

<div class="content-ad"></div>

https://www.ruby-lang.org/en/downloads/

크롬 드라이버 설치하기

크롬 브라우저를 제어하기 위해서는 크롬 드라이버가 필요합니다. 크롬 드라이버 다운로드 페이지에서 다운로드할 수 있습니다. 꼭 자신의 크롬 브라우저 버전과 일치하는 버전을 다운로드해야 합니다.

다운로드한 후, 시스템 PATH에 포함된 디렉토리에 크롬 드라이버 실행 파일을 배치해 주세요.

<div class="content-ad"></div>

셀레늄 젬 설치하기

터미널을 열고 다음 명령어를 실행하여 Selenium WebDriver 젬을 설치하세요:

```js
gem install selenium-webdriver
```

테스트 스크립트 작성하기

<div class="content-ad"></div>

안녕하세요! Ruby 파일인 test.rb를 생성하고 아래 코드를 복사해 넣어주세요:

```js
require 'selenium-web driver'
require 'time'
# Chrome 옵션 설정
options = Selenium::WebDriver::Chrome::Options.new
options.add_argument('-headless')
options.add_argument('-no-sandbox')
options.add_argument('-disable-dev-shm-usage')
driver = Selenium::WebDriver.for :chrome, options: options
# HTML 보고서를 저장할 파일
report_file = 'test_report.html'
File.open(report_file, 'w') do |file|
file.puts "<html><head><title>테스트 보고서</title></head><body>"
file.puts "<h1>테스트 보고서</h1>"
file.puts "<p>테스트 시작 시간: #{Time.now}</p>"
begin
# 웹 페이지로 이동
driver.navigate.to 'http://www.google.com'
file.puts "<p>다음으로 이동: <a href='#{driver.current_url}'>#{driver.current_url}</a></p>"
# 검색 상자를 찾고 쿼리 입력
search_box = driver.find_element(name: 'q')
search_box.send_keys 'Selenium WebDriver'
search_box.submit
file.puts "<p>검색 제출 시간: #{Time.now}</p>"
# 결과가 로드되고 표시될 때까지 대기
wait = Selenium::WebDriver::Wait.new(timeout: 10)
wait.until { driver.title.include? 'Selenium WebDriver' }
# 페이지 제목 기록
file.puts "<p>페이지 제목: #{driver.title}</p>"
file.puts "<p>테스트가 성공적으로 완료되었습니다. 시간: #{Time.now}</p>"
rescue StandardError => e
# 발생한 오류 기록
file.puts "<p>오류 발생: #{e.message}</p>"
ensure
# 브라우저 닫기
driver.quit
file.puts "</body></html>"
end
end
```

코드 설명

- Chrome 옵션 설정: Chrome을 헤드리스 모드로 설정하여 서버에서 GUI 없이 테스트를 실행할 수 있도록 구성합니다.
- WebDriver 초기화: 지정된 옵션으로 Chrome WebDriver의 새 인스턴스를 생성합니다.
- HTML 보고서 설정: HTML 보고서를 작성하기 위해 파일을 열고 HTML 구조를 시작합니다.
- Google로 이동: WebDriver를 사용하여 Google로 이동합니다.
- Selenium WebDriver 검색: 검색 상자를 찾아 쿼리를 입력하고 양식을 제출합니다.
- 결과 대기: 페이지 제목에 "Selenium WebDriver"가 포함될 때까지 기다립니다.
- 정보 기록: 페이지 제목과 타임스탬프를 HTML 보고서에 기록합니다.
- 오류 처리: 테스트 중 발생하는 모든 오류를 잡고 기록합니다.
- 브라우저 닫기: 브라우저를 닫고 HTML 구조를 완료합니다.

<div class="content-ad"></div>

스크립트 실행 방법

스크립트를 실행하려면 터미널에서 test.rb 파일이 있는 디렉토리로 이동한 후 아래 명령을 실행하십시오:

```js
ruby test.rb
```

이 명령을 실행하면 테스트가 실행되며 Google로 이동하여 검색을 수행하고 동일한 디렉토리에 test_report.html이라는 HTML 보고서를 생성합니다.

<div class="content-ad"></div>

GitHub Actions에서 Selenium 테스트 실행하기

전제 조건

계속하기 전에 다음 사항을 준비해주세요:

- Selenium 테스트 스크립트(test_script.rb)가 포함된 GitHub 저장소.
- GitHub Actions와 YAML 구문에 대한 기본적인 이해.

<div class="content-ad"></div>

워크플로 파일 만들기

GitHub Actions 워크플로는 귀하의 저장소의 .github/workflows 디렉토리에 위치한 YAML 파일에서 정의됩니다. 새로운 워크플로 파일인 test.yml을 만들어 봅시다.

구성 단계별로 진행

- 워크플로 파일 생성

<div class="content-ad"></div>

귀하의 저장소에서 .github/workflows/ 디렉토리 구조를 만들어보세요. 해당 디렉토리가 없다면 생성해주세요. 그런 다음 이 디렉토리 안에 test.yml 파일을 만들어주세요.

- Workflows 정의하기 

test.yml을 열고 아래 구성을 추가해주세요:

```js
name: Test

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Set up Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.2'  

      - name: Install dependencies
        run: |
          gem install selenium-webdriver headless

      - name: Run tests
        run: |
          ruby test.rb
      - uses: actions/upload-artifact@v3
        with:
          name: Test Report
          path: test_report.html
```

<div class="content-ad"></div>

구성 세부 정보

- 트리거 이벤트: 워크플로가 메인 브랜치로의 푸시 또는 풀 리퀘스트 이벤트에서 트리거됩니다.
- 작업 정의: 테스트 작업은 최신 Ubuntu 환경에서 실행됩니다.
- 저장소 체크아웃: actions/checkout@v3 액션을 사용하여 저장소 코드를 체크아웃합니다.
- Ruby 설정: ruby/setup-ruby@v1 액션을 사용하여 Ruby 환경을 설정합니다. 원하는 Ruby 버전을 지정합니다.
- 종속성 설치: 필요한 젬들을 설치합니다 (selenium-webdriver 및 headless).
- Chrome 및 ChromeDriver 설치: 패키지 목록을 업데이트하고 Google Chrome을 설치한 후 ChromeDriver의 최신 버전을 설치합니다.
- 테스트 실행: Selenium 테스트 스크립트(test_script.rb)를 실행합니다.
- 테스트 보고서 업로드: actions/upload-artifact@v3 액션을 사용하여 생성된 HTML 테스트 보고서를 업로드합니다.

워크플로 실행

test.yml 파일을 커밋하고 저장소에 푸시하면 GitHub Actions이 지정된 이벤트(push 또는 메인 브랜치로의 풀 리퀘스트)에서 자동으로 워크플로를 트리거합니다.

<div class="content-ad"></div>


<img src="/assets/img/2024-08-04-ConfigureandRunSeleniumwithRubyonGithubactions_1.png" />

작업을 수동으로 트리거하려면 리포지토리의 "Actions" 탭으로 이동하여 워크플로우를 선택하고 "작업 트리거"를 클릭하세요.

<img src="/assets/img/2024-08-04-ConfigureandRunSeleniumwithRubyonGithubactions_2.png" />

테스트 보고서 보기


<div class="content-ad"></div>

워크플로우가 완료되면 특정 워크플로우 실행 아래의 "Actions" 탭에서 업로드된 테스트 보고서를 찾을 수 있습니다. "Test Report" 아티팩트를 다운로드할 수 있습니다.

![이미지](/assets/img/2024-08-04-ConfigureandRunSeleniumwithRubyonGithubactions_3.png)

결론

루비를 사용하여 Selenium 테스트를 실행하는 GitHub Actions 워크플로우를 성공적으로 설정했습니다. 이 설정을 통해 푸시 또는 풀 요청 시마다 자동으로 테스트가 실행되어 애플리케이션의 상태에 대한 지속적인 피드백을 제공합니다. 이 워크플로우를 확장하여 더 많은 작업 단계를 추가하거나 다른 서비스와 통합하거나 추가 테스트를 실행할 수도 있습니다.

<div class="content-ad"></div>

이 가이드에 나온 단계를 따라서 하면, 시험적 단위 실행 코드를 GitHub actions의 일부로 손쉽게 실행할 수 있어요.

GitHub에서 프로젝트를 만들었고, 코드를 여기에 추가했어요.

내용이 마음에 드시면 박수를 치셔도 좋아요. 즐거운 자동화 테스팅 하세요 :) 건배. 👏