---
title: "강력한 인사이트를 얻는 법 Rails에 New Relic Analytics 통합하기"
description: ""
coverImage: "/assets/img/2024-07-01-UnlockPowerfulInsightsIntegratingNewRelicAnalyticsinRails_0.png"
date: 2024-07-01 16:47
ogImage: 
  url: /assets/img/2024-07-01-UnlockPowerfulInsightsIntegratingNewRelicAnalyticsinRails_0.png
tag: Tech
originalTitle: "Unlock Powerful Insights: Integrating New Relic Analytics in Rails"
link: "https://medium.com/@m.jamil.ajaz/unlock-powerful-insights-integrating-new-relic-analytics-in-rails-6db22345c8c7"
---


New Relic은 개발자가 애플리케이션의 상태와 성능을 모니터링할 수 있도록 도와주는 강력한 응용 프로그램 성능 모니터링 (APM) 도구입니다. New Relic 젬은 New Relic의 APM 기능을 Ruby 응용 프로그램에 통합하여 응용 프로그램 성능, 오류 추적 및 자세한 트랜잭션 추적을 제공하는 Ruby 라이브러리입니다.

## New Relic 젬의 기능

- 성능 모니터링: 이 젬은 Ruby 응용 프로그램의 성능을 추적하여 응답 시간, 처리량 및 데이터베이스 쿼리에 대한 실시간 데이터를 제공합니다.
- 오류 추적: 오류를 식별하고 기록하여 디버그하고 문제를 해결하기 쉽게 합니다.
- 트랜잭션 추적: 이 젬은 트랜잭션의 자세한 추적을 제공하여 응용 프로그램 내에서 시간이 소비되는 곳을 파악할 수 있습니다.
- 사용자 정의 메트릭: 응용 프로그램의 특정 측면을 추적하기 위해 사용자 정의 메트릭을 만들 수 있습니다.

## 단계 1: 젬 설치하기

<div class="content-ad"></div>

Gemfile에 New Relic Gem을 추가해주세요:

```js
gem 'newrelic_rpm'
```

그런 다음, `bundle install` 명령어를 실행하여 gem을 설치해주세요.

<div class="content-ad"></div>

# 단계 2: 구성

뉴 렐릭 구성 파일을 생성하세요.

```js
bundle exec newrelic install --license_key=YOUR_NEW_RELIC_LICENSE_KEY
```

실제 뉴 렐릭 라이센스 키로 YOUR_NEW_RELIC_LICENSE_KEY를 대체하세요. 이 명령어는 구성 디렉토리에 newrelic.yml 파일을 생성합니다.

<div class="content-ad"></div>

# 단계 3: 환경 설정 구성

적절한 환경 설정을 지정하려면 newrelic.yml 파일을 편집하십시오. 다른 환경(개발, 테스트, 프로덕션 등)에 대해 다른 구성을 지정할 수 있습니다. 라이선스 키와 애플리케이션 이름이 올바르게 설정되어 있는지 확인하세요.

## 구성 예시:

```js
common: &default_settings
  license_key: 'YOUR_NEW_RELIC_LICENSE_KEY'
  app_name: My Application (Development)

development:
  <<: *default_settings

production:
  <<: *default_settings
  app_name: My Application
  monitor_mode: true
```

<div class="content-ad"></div>

# 단계 4: 애플리케이션을 배포합니다

일반적으로 애플리케이션을 배포하세요. New Relic 젬은 데이터 수집을 시작하고 이를 New Relic 서버로 전송합니다.

# 단계 5: 데이터 확인하기

New Relic 계정으로 로그인하고 APM 섹션으로 이동하세요. 여기에서 애플리케이션의 성능 데이터를 볼 수 있습니다. 응답 시간, 처리량, 오류율 등이 포함됩니다.

<div class="content-ad"></div>

# 결론

New Relic 젬은 루비 개발자들이 애플리케이션의 성능과 안정성에 대한 통찰력을 얻기 위해 가치 있는 도구입니다. 위에서 설명한 단계를 따라하면 New Relic을 쉽게 루비 애플리케이션에 통합하고 실시간으로 해당 건강 상태와 성능을 모니터링할 수 있습니다.