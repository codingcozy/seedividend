---
title: "Rails에서 Selenium을 사용한 자동화 테스트 방법"
description: ""
coverImage: "/assets/img/2024-08-03-AutomatedTestinginRailsUsingSelenium_0.png"
date: 2024-08-03 18:49
ogImage: 
  url: /assets/img/2024-08-03-AutomatedTestinginRailsUsingSelenium_0.png
tag: Tech
originalTitle: "Automated Testing in Rails Using Selenium"
link: "https://medium.com/@nitekkumarsingh/automated-testing-in-rails-using-selenium-3e733b7ddb79"
isUpdated: true
---




<img src="/assets/img/2024-08-03-AutomatedTestinginRailsUsingSelenium_0.png" />

자동화된 테스트는 설거지나 빨래를 접을 수는 없지만, 끊임없이 시간을 절약해 주고 코드에 잠복하는 귀찮은 버그들을 잡아주는 데 도움을 줍니다. 또한 "방금 셀레늄 테스트 스위트를 작성했어" 같은 말을 사용해서 친구나 가족들을 감탄시킬 수 있습니다. 비록 그들이 그게 무슨 뜻인지 모르더라도요.

셀레늄 자동화 테스트를 작성하는 능력은 개발자에게 매우 가치 있는 도구입니다. 이를 통해 소프트웨어 품질을 보장하는 능력이 향상되며, 개발 프로세스의 효율성과 신뢰성 증진에 기여할 수 있는 능력이 더해집니다.

이제 우리가 RSpec, Capybara, 그리고 셀레늄을 이용해 Rails 애플리케이션에 자동화된 테스트 스위트를 설치하는 방법에 대해 알아봅시다.

<div class="content-ad"></div>

참고: 계속 진행하기 전에 이미 Rails 애플리케이션에서 RSpec을 설정했다고 가정합니다.

## 필요한 젬 설치

먼저, 다음 젬들을 설치해야 합니다. Gemfile에 아래 내용을 추가해주세요:

```js
group :test do
  gem "capybara"
  gem "selenium-webdriver"
  gem "webdrivers"
end
```

<div class="content-ad"></div>

이후에는 시스템에 chromedriver가 설치되어 있는지 확인하십시오. Linux 시스템에서 다음 명령을 사용하여 확인할 수 있습니다:

```js
chromedriver - version
```

만약 chromedriver가 없다면, Linux 장치에 다음 명령을 사용하여 설치할 수 있습니다:

```js
sudo apt-get install chromedriver
```

<div class="content-ad"></div>

## Capybara 설정하기

젬과 드라이버를 설치한 후 spec/support 디렉토리 내에 새 파일을 만들어주세요. 파일 경로는 spec/support/capybara.rb 여야 합니다.

capybara.rb 파일 안에 다음 코드를 추가해주세요:

```js
require 'capybara/rspec'
require 'selenium/webdriver'

Capybara.configure do |config|
  config.default_max_wait_time = 5 # 초
  config.default_driver = :selenium
  config.javascript_driver = :selenium
  config.app_host = '' # 테스트하고 싶은 애플리케이션의 URL을 설정해주세요
end

Capybara.register_driver :selenium do |app|
  options = Selenium::WebDriver::Chrome::Options.new
  
  Capybara::Selenium::Driver.new(app,
    browser: :chrome,
    options: options
  )
end
```

<div class="content-ad"></div>

Capybara는 실제 사용자가 앱과 상호 작용하는 방식을 시뮬레이션하여 웹 애플리케이션을 테스트하는 데 도움을 줍니다. 이는 테스트를 실행하는 드라이버에 대해 중립적이며 Rack::Test 및 Selenium 지원이 내장되어 있습니다.

기본적으로 Capybara는 :rack_test 드라이버를 사용하는데, 이는 빠르지만 제한적입니다. JavaScript를 지원하지 않으며 원격 API 및 OAuth 서비스와 같이 Rack 애플리케이션 외부의 HTTP 리소스에 액세스할 수 없습니다. 이러한 제한 사항을 해결하려면 기능의 기본 드라이버를 다른 것으로 설정할 수 있습니다. 예를 들어 Selenium에서 모든 것을 실행하고 싶다면:

```js
Capybara.default_driver = :selenium
```

## 서포트 파일 로드하기

<div class="content-ad"></div>

다음으로 spec/rails_helper.rb 파일에 다음 코드를 추가해주세요:

```js
Dir[Rails.root.join('spec/support/**/*.rb')].sort.each { |f| require f }
```

이렇게 하면 테스트를 실행하는 동안 support 디렉토리 안의 코드가 올바르게 로드됩니다.

## 테스트 케이스 작성하기

<div class="content-ad"></div>

위의 단계를 따르셨서 자동화 테스트 설정이 완료되었어요. 이제 Capybara가 제공하는 내장 메서드를 사용하여 테스트 케이스를 작성해봅시다.

spec/features 디렉토리 안에 새 파일을 만들어주세요. 예를 들어, spec/features 디렉토리 안에 example_spec.rb 라는 파일을 생성해보세요.

```js
require 'rails_helper'

RSpec.describe 'Sample Test', type: :feature, js: true do
  it 'opens a page and checks for a specific element' do
    visit 'https://remaing_page_url_you_want_to_test'
    expect(page).to have_selector('h2', text: 'The content of the page')
  end
end
```

테스트를 실행하려면 아래 명령어를 사용해주세요:

<div class="content-ad"></div>

```js
rspec spec/features/example_spec.rb
```

이 명령어를 실행하면 귀하가 작성한 테스트를 실행하는 Chrome 브라우저가 열릴 것입니다.

Capybara는 웹 사이트 페이지를 탐색하기 위한 내장 메소드 세트를 제공합니다. 더 자세한 내용은 이 링크를 확인해주세요.

![Automated Testing in Rails Using Selenium](/assets/img/2024-08-03-AutomatedTestinginRailsUsingSelenium_1.png)

<div class="content-ad"></div>

지금까지 함께 Selenium, Capybara 및 RSpec을 사용하여 Rails 애플리케이션에서 자동화 테스트의 흥미로운 세계로 첫걸음을 내딛었습니다. 이제 여러분의 테스트는 기름이 잘 바른 기계처럼 작동하고 있습니다 (아니면 가끔 가볍게 차주는 것이 필요한 정도로 잘 작동하고 있습니다).

즐거운 테스트를 하시고, 여러분의 테스트가 항상 처음에 통과되기를 바랍니다 (하지만 솔직히 말해서, 그런 일은 결코 일어나지 않을 거예요)!