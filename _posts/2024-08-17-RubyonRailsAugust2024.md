---
title: "2024년 8월에 알아야 할 Ruby on Rails 최신 정보"
description: ""
coverImage: "/assets/img/2024-08-17-RubyonRailsAugust2024_0.png"
date: 2024-08-17 01:21
ogImage: 
  url: /assets/img/2024-08-17-RubyonRailsAugust2024_0.png
tag: Tech
originalTitle: "Ruby on Rails  August 2024"
link: "https://medium.com/@sajjadumar/ruby-on-rails-august-2024-ed82b2543db4"
isUpdated: false
---


마크다운 형식으로 테이블 태그를 변경하십시오.

<div class="content-ad"></div>

여기에 모든 세부 사항을 읽어보세요.

# 레일스 가이드를 위한 새로운 디자인

2009년 이후로 지친을 들지 않은 가이드의 디자인입니다.

레일스 가이드의 새로운 디자인이 이제 공개되었습니다!

<div class="content-ad"></div>

여기 모든 세부 내용을 확인해 보세요.

# 2024 Rails Luminary Awards을 위한 후보 지명 오픈

작년 레일즈 재단은 뛰어난 코드, 문서, 열정 또는 지원으로 레일즈 생태계와 커뮤니티에 기여한 사람들을 인정하는 Rails Luminary Awards를 시작했습니다. 이를 통해 다른 사람들이 더 많은 것을 할 수 있고, 배울 수 있거나 영감을 받을 수 있도록 돕습니다.

인정받을 만한 뛰어난 개인들을 지명해 주세요.

<div class="content-ad"></div>

여기서 모든 세부 정보를 읽어보세요.

# 더 많은 가이드 PR 확인을 위한

Rails Routing 및 Active Record Associations에 능통하신 경우, 커뮤니티 리뷰를 위해 더 많은 가이드 관련 PR이 열려 있습니다. 여러분의 피드백을 제출해주세요:

- Rails Routing PR
- Active Record Associations PR

<div class="content-ad"></div>

제 Medium 계정에서 새로운 시리즈를 시작했어요. 제가 part-time으로 만드는 것들을 모두 공유하고 있어요. 첫 번째 에피소드는 여기에서 확인해보세요:

[여기를 클릭하세요](https://medium.com/@sajjadumar/building-a-saas-episode-01-7bfa17bfe2f4)

![이미지](/assets/img/2024-08-17-RubyonRailsAugust2024_1.png)

# 기본 세션 생성기 추가

<div class="content-ad"></div>

이 PR은 기본 세션 생성기를 추가하여 사용자가 자체 인증 시스템을 시작할 때 도움을 받을 수 있도록 합니다. 이것은 모든 인증 관련 문제에 대한 완벽한 해결책이 될 목적이 아닙니다. 기본 경로를 명확히 하고, 자체 인증 시스템을 만드는 것이 특별한 모험이 아님을 보여주기 위한 것입니다.

자세한 내용은 여기를 확인해주세요.

# Added script folder and generator

이 Pull Request은 Rails 앱 생성기를 변경하여 일회용 스크립트, 데이터 이관 스크립트, 정리 스크립트, 벤치마크 스크립트 등을 보관할 수 있는 새로운 스크립트 기본 디렉토리를 생성합니다. 또한 이 PR은 이러한 스크립트를 생성할 수 있는 기본 스크립트 생성기를 추가합니다.

<div class="content-ad"></div>

여기에 모든 세부 정보가 있습니다.

# ActiveRecord: 연결이 정의되지 않았을 때 특정 예외 발생

이 Pull Request는 요청된 샤드/역할에 대한 프로그래밍적인 액세스를 제공하기 쉽게 만들기 위해 생성되었습니다.

- 이 Pull Request에서는 이전에 발생했던 ConnectionNotEstablished의 서브클래스인 더 구체적인 예외 ConnectionNotDefined를 사용하여 요청된 데이터베이스 연결 풀을 찾을 수 없는 경우를 처리합니다.
- connection_handler.rb의 retrieve_connection_pool 메소드가 수정되어, 우리가 샤드와/또는 역할을 누락했는지 여부를 반영하는 더 구체적인 오류 메시지를 제공합니다.
- 이러한 변경 내용을 반영하기 위해 테스트 케이스가 업데이트되었습니다.

<div class="content-ad"></div>

여기에 모든 세부 사항을 읽어보세요.

## 마이그레이션에 not-null 수정자 추가

이 변경 사항은 마이그레이션에 not-null 수정자를 추가합니다. 이제 열 유형 뒤에 !를 사용하여 지정할 수 있습니다.

```js
# 다음과 같이 생성합니다...
bin/rails generate migration CreateUsers email_address:string!:uniq password_digest:string!
```

<div class="content-ad"></div>

```js
# 결과:
class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :email_address, null: false
      t.string :password_digest, null: false
      t.timestamps
    end
    add_index :users, :email_address, unique: true
  end
end
```

여기에서 모든 세부 내용을 읽어보세요.

# 기본 앱/ 구조에서 채널 제거

이제 Hotwire가 기본값이므로 대부분의 앱에서는 사용자 정의 채널이 필요하지 않을 것이며, 필요한 경우 파일을 발생기를 통해 다시 가져올 수 있습니다.


<div class="content-ad"></div>

여기에 모든 세부 사항을 읽어보세요.

## 기본 권한 정책 초기화 프로그램 제거

이 변경사항은 사용 빈도가 낮은 기본 permissions_policy 구성 파일을 삭제합니다. 필요에 따라 permissions_policy 문서를 참조하여 구성을 다시 추가할 수 있습니다.

여기에 모든 세부 사항을 읽어보세요.

<div class="content-ad"></div>

# Dropped Hash#except 코어 익스텐션

Rails 8.0은 루비 3.1 이상만 지원하며, Ruby 3.0에 원래 추가된 except가 기본으로 포함되었기 때문에 더 이상 사용되지 않는 코드입니다.

https://docs.ruby-lang.org/en/3.1/Hash.html#method-i-except

해당 코드가 제거되었습니다.

<div class="content-ad"></div>

여기에 모든 세부 정보가 있습니다.

# ActiveModel: ActiveModel::AttributeAssignment#attribute_writer_missing 소개

이 PR은 ActiveModel::AttributeAssignment#attribute_writer_missing 메서드를 소개하여 인스턴스가 알 수 없는 속성에 대한 할당을 우아하게 처리할 수 있는 기회를 제공했습니다:

```js
class Rectangle
  include ActiveModel::AttributeAssignment
  attr_accessor :length, :width
  def attribute_writer_missing(name, value)
    Rails.logger.warn "#{name}에 할당하는 중 알 수 없는 속성이 있습니다."
  end
end
rectangle = Rectangle.new
rectangle.assign_attributes(height: 10) # => "height에 할당하는 중 알 수 없는 속성이 있습니다."가 로그에 남습니다
```

<div class="content-ad"></div>

기본적으로 #attribute_writer_missing을 재정의하지 않은 클래스는 ActiveModel::UnknownAttributeError을 발생시킵니다.

자세한 내용은 여기를 읽어보세요.

# 새로운 앱에서 필터링을 위해 cvv 및 cvc를 기본 매개변수로 추가했습니다.

일반적으로 신용카드 세부정보를 직접 서버에 게시하는 것은 피해야 합니다. 그 대신 Stripe나 Braintree와 같은 결제 처리기를 사용하는 것이 좋습니다. 그러나 실수로 사용자의 신용카드 번호를 제출 양식에 포함했다면, 서버가 해당 정보를 처리하지 않더라도 그 세부정보가 기본적으로 로깅될 수 있습니다. 이러한 상황은 "카드 데이터 저장"으로 이어질 수 있어 안전한 처리를 보장하기 위한 추가적인 법적 의무를 부담하게 될 수 있습니다.

<div class="content-ad"></div>

이 풀 리퀘스트에는 새로운 애플리케이션의 기본 매개변수에 cvv와 cvc가 추가되었습니다. 이 변경으로 ActiveSupport::ParameterFilter에 필터링되는 매개변수에 이 이름이 기본적으로 기록되지 않게 됩니다. 유의할 점은 이 변경이 새로운 앱에만 적용된다는 것입니다. 기존 앱에는 영향을 미치지 않습니다.

자세한 내용은 여기서 확인해주세요.

# SQLite 트랜잭션은 이제 즉시 모드로 기본 설정됩니다

SQLite가 Rails 애플리케이션의 프로덕션 데이터베이스 엔진으로서의 인기가 증가함에 따라 견고하고 강인한 기본 구성이 필요해졌습니다. Rails 애플리케이션에서 SQLite를 사용할 때 가장 흔한 문제 중 하나는 가끔씩 ActiveRecord::StatementInvalid (SQLite3::BusyException: database is locked) 예외가 발생하는 것입니다. 이러한 예외는 DEFERRED 트랜잭션이 SQLite 데이터베이스 잠금을 획득하려고 할 때 발생합니다. 이때 다른 연결이 데이터베이스 잠금을 보유하고 있는 상황에서 기록 쿼리를 수행하다가 트랜잭션 중간에 SQLite 데이터베이스 잠금을 얻지 못한 경우입니다. 이 상황에서 SQLite는 트랜잭션을 다시 시도하지 않습니다. 대신 바쁜 예외로 즉시 오류를 반환합니다.

<div class="content-ad"></div>

여기 PR은 혼잡 예외를 피하고 동시성 지원을 개선하기 위해 가능한 경우 SQLite 어댑터를 즉시 모드로 업데이트했습니다.

자세한 내용은 여기를 읽어보세요.

# 로컬에서 secret_key_base를 nil로 설정하는 것이 가능하게 변경

이 커밋은 애플리케이션이 생성된 로컬 시크릿으로 대체될 것이므로 secret_key_base를 무조건적으로 설정할 수 있도록 본 행동을 되돌립니다.

<div class="content-ad"></div>

여기 모든 세부 정보를 읽어보세요.

# ActiveRecord: 이제 사용자 정의 열을 사용한 일괄 처리 지원

이 풀 리퀘스트는 Active Record 일괄 처리를 사용자 정의 열과 함께 사용할 수 있도록 지원을 추가합니다.

```js
Product.in_batches(cursor: [:shop_id, :id]) do |relation|
  # relation과 함께 작업 수행
end
```

<div class="content-ad"></div>

여기 모든 세부 내용을 읽어보세요.

# 여러 경로 매핑이 중지된 상태

이 PR은 경로 매핑에서 여러 경로를 사용하는 것을 폐지합니다:

```js
Rails.application.routes.draw do
  get "/users", "/other_path/users", "/another_path/users", to: "users#index"
end
```

<div class="content-ad"></div>

위의 내용은 다음과 같이 쉽고 더 가독성이 높게 작성할 수 있습니다:

```js
Rails.application.routes.draw do
  get "/users", to: "users#index"
  get "/other_path/users",  to: "users#index"
  get "/another_path/users", to: "users#index"
end
```

자세한 내용은 여기에서 확인하세요.

# 인증 생성기에 비밀번호 재설정 기능 추가

<div class="content-ad"></div>

이 pull request에서는 새로운 Rails 생성기에 기본 비밀번호 재설정 흐름을 추가하여 메일러와 서명 된 ID의 사용을 보여줍니다.

또한, 생성기의 이름이 "authentication"으로 변경되었습니다.

모든 세부 정보는 여기에서 확인해주세요.

# 새로운 유지 보수 정책을 적용했습니다.

<div class="content-ad"></div>

주요 변경 사항은 다음과 같습니다.

- 릴리스는 미리 정의된 고정 기간 동안 유지됩니다. 버그 수정에 대한 기간은 1년이며 보안 수정에 대한 기간은 2년입니다.
- 심각한 보안 문제와 일반적인 보안 문제 사이의 구분이 제거되었습니다.
- NPM 버전 관리가 향후 사전 릴리스 (-) 구분을 사용하지 않도록 업데이트되었습니다.

자세한 내용은 여기를 참조하세요.

# has_secure_password에 기본 비밀번호 재설정 토큰 추가

<div class="content-ad"></div>

이 PR은 has_secure_password를 사용할 때 15분 동안 유효한 기본 설정을 추가했습니다:

```js
class User < ApplicationRecord
  has_secure_password
end

user = User.create!(name: "david", password: "123", password_confirmation: "123")
token = user.password_reset_token
User.find_by_password_reset_token(token) # 해당 사용자 반환
# 16분 후...
User.find_by_password_reset_token(token) # nil 반환
# 기간이 만료되었기 때문에 ActiveSupport::MessageVerifier::InvalidSignature가 발생합니다
User.find_by_password_reset_token!(token)
```

여기에서 모든 세부 정보를 읽을 수 있습니다.

# bin/rails boot 명령어를 구현했습니다

<div class="content-ad"></div>

새로운 bin/rails boot 명령은 애플리케이션을 시작한 후 종료합니다. 표준 -e/--environment 옵션을 지원하여 Rails 앱의 부팅 프로세스를 테스트하거나 벤치마킹 목적으로 유용합니다.

자세한 내용은 여기를 확인하세요.

# 도우미 메서드 몇 개의 이름 변경

일부 도우미 메서드 이름이 변경되었으며 기존 이름은 별칭으로 유지되었습니다.

<div class="content-ad"></div>

- check_box를 checkbox로 이름 변경
- text_area를 textarea로 이름 변경
- rich_text_area를 rich_textarea로 이름 변경

자세한 내용은 여기와 여기에서 읽어보세요.

# Docker: Docker biuld를 실행할 때 경고가 발생하면 오류 생성

도커는 Docker biuld 검사를 도입했으며 기본적으로 경고가 있는 Docker biuld를 실행해도 빌드가 실패하지 않습니다 (비-제로 종료 코드 반환). 경고가 있는 biuld에서 오류를 발생시키려면 Dockerfile에 # check=error=true 선언을 추가해야 합니다. 이 PR이 그렇게 했습니다.

<div class="content-ad"></div>

여기서 모든 세부 정보를 읽어보세요.

# ActiveModel의 human_attribute_name 변경하여 오류 발생

config.i18n.raise_on_missing_translations = true로 설정되어 있을 때, 컨트롤러와 뷰는 번역이 누락된 경우 오류를 발생시킵니다. 그러나 모델은 오류를 발생시키지 않습니다. 이 PR은 모델이 raise_on_missing_translations가 true 일때 오류를 발생시토록 변경합니다.

여기서 모든 세부 정보를 읽어보세요.

<div class="content-ad"></div>

# 사용 금지된 해시 키 경로 매핑

이 풀 리퀘스트는 경로를 해시 키 경로로 그리는 것을 사용 금지하여 라우팅을 빠르게 만듭니다.

```js
# 이전
get "/users" => "users#index"
post "/logout" => :sessions
mount MyApp => "/my_app"

# 이후
get "/users", to: "users#index"
post "/logout", to: "sessions#logout"
mount MyApp, at: "/my_app"
```

여기에서 자세한 내용을 읽어보세요.

<div class="content-ad"></div>

# 레일스 8은 기본적으로 Thruster를 사용합니다

Thruster는 자산 압축 및 캐싱 프록시로, X-Sendfile 가속화를 사용하여 레일스 애플리케이션의 간단한 프로덕션 배포 속도를 높입니다. 일반적으로 Puma와 함께 실행되며, 일반적으로 Kamal 2 프록시 뒤에서 실행됩니다. Kamal 2 프록시는 HTTP/2 및 SSL 자동 인증서를 제공하여 앱이 인터넷에서 효율적이고 안전하게 실행되도록 도와줍니다.

레일스 8은 Dockerfile에서 기본적으로 Thruster 사용 설정을 구성할 것입니다.

자세한 내용은 여기를 참조해주세요.

<div class="content-ad"></div>

# 스키마 지정 이름을 사용하여 disable_extension을 호출할 수 있도록 변경되었습니다

이 변경으로 PostgreSQL에서 스키마 지정 이름을 사용하여 disable_extension을 호출할 수 있게 되었습니다.

자세한 내용은 여기에서 확인하세요.

# allow_browser가 이제는 봇을 허용합니다

<div class="content-ad"></div>

"allow_browser" 기능은 특정 브라우저 버전과 일치하지 않는 사용자 에이전트의 요청을 차단합니다. 이로 인해 일부 검색 엔진에서 사이트를 크롤링하지 못할 수도 있습니다.

본 변경으로 특정 크롤러와 봇에 대해 이러한 버전 제한을 우회하여 이 문제를 해결했습니다.

자세한 내용은 여기를 참조하세요.

# 라우트 매핑 범위 조회 속도가 향상되었습니다.

<div class="content-ad"></div>

이 Pull Request는 scope 구현을 변경합니다. 스코프는 해시 배열을 기반으로 하지만, 상속된 값들을 즉시 해시로 합병함으로써 룩업 속도를 빠르게 할 수 있습니다. 이것은 깊게 중첩된 경로에 대한 불필요한 반복을 줄일 수 있습니다.

자세한 내용은 여기를 참조하세요.

# 기본 puma 구성에서 프로세서 개수를 자동으로 감지하는 기능은 이제 선택 사항이며 기본적으로 사용되지 않습니다

puma.rb에서 Concurrent.available_processor_count 도우미를 사용하는 것은 공유 CPU가있는 일부 클라우드 호스트나 CPU 개수를 부정확하게 보고하는 플랫폼에서 부정확한 구성을 가져올 수 있습니다.

<div class="content-ad"></div>

이 Pull Request에는 다음과 같은 변경 사항이 있습니다:

- WEB_CONCURRENCY가 설정되어 있지 않으면 puma.rb에서 기본적으로 1개의 워커만 생성하도록 설정 변경
- default puma.rb를 수정하여 WEB_CONCURRENCY에 "auto"를 옵션으로 제공
- default deploy.yml의 주석을 수정하여 WEB_CONCURRENCY에 "auto"를 옵션으로 제공
- WEB_CONCURRENCY에 대한 설명을 tuning_performance_for_deployment.md에 업데이트

자세한 내용은 여기를 참조하세요.

# 중복된 Puma 구성 설정 제거

<div class="content-ad"></div>

이 Pull Request는 puma.rb에서 다음과 같은 중복 환경 설정을 제거합니다:

```js
# Puma가 실행될 `environment`를 지정합니다.
rails_env = ENV.fetch("RAILS_ENV", "development")
environment rails_env

case rails_env
when "production"
  preload_app!
when "development"
  # 디버거에 의해 중단될 때 Puma에 의해 워커가 종료되지 않도록 매우 긴 `worker_timeout`를 지정합니다.
  worker_timeout 3600
end
```

모든 세부 정보를 여기에서 확인하세요.

# 개선된 기본 액션 메일러 구성

<div class="content-ad"></div>

이 PR은 기본 Action Mailer 구성 설정에 몇 가지 개선 사항이 추가되었습니다:

- production.rb에 기본 SMTP 서버 구성을 주석으로 제안합니다.
- 제품이라도 메일러 링크에 대해 기본 example.com 호스트를 설정합니다.
- 메일러 호스트에 대한 모든 env 설정에서 동일한 주석 스타일을 사용합니다.

자세한 내용은 여기에서 확인하세요.

그럼 이번 달은 여기까지입니다! ✌️