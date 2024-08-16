---
title: "루비 심층 분석 Rails 아키텍처 모범 사례와 확장 가능한 애플리케이션 구축 방법"
description: ""
coverImage: "/assets/no-image.jpg"
date: 2024-08-04 19:05
ogImage: 
  url: /assets/no-image.jpg
tag: Tech
originalTitle: "Rails Architecture Best Practices and Building Scalable Applications  Ruby Deep Dive11"
link: "https://medium.com/@diversepixel/rails-architecture-best-practices-and-building-scalable-applications-ruby-deep-dive-11-7cc514766728"
isUpdated: true
---




아키텍처의 최선의 실천 방법 및 Rails에서 확장 가능한 애플리케이션을 구축하는 방법을 자세히 살펴봅시다.

# MVC를 넘어서: 리팩터링이 필요한 때와 방법

리팩터링이 필요한 이유

- Fat Models/Controllers: 모델이나 컨트롤러가 너무 커져 유지보수가 어려운 경우.
- 코드 중복: 애플리케이션 전반에 걸쳐 반복되는 코드.
- 복잡한 비즈니스 로직: 모델이나 컨트롤러에 자연스럽게 들어맞지 않는 비즈니스 로직.

<div class="content-ad"></div>

리팩터링 전략

- 서비스 객체 (Service Objects)
- 쿼리 객체 (Query Objects)
- 폼 객체 (Form Objects)
- 프레젠터/데코레이터 (Presenters/Decorators)
- 값 객체 (Value Objects)
- 관심사 (Concerns)

## 서비스 객체: 복잡한 비즈니스 로직 캡슐화

서비스 객체는 모델 및 컨트롤러 외부에 복잡한 비즈니스 로직을 캡슐화합니다.

<div class="content-ad"></div>

예시

```js
# app/services/create_user_service.rb
class CreateUserService
  def initialize(user_params)
    @user_params = user_params
  end
  def call
    User.create(@user_params)
  end
end
# 컨트롤러에서의 사용법
class UsersController < ApplicationController
  def create
    @user = CreateUserService.new(user_params).call
    if @user.persisted?
      redirect_to @user, notice: '사용자가 성공적으로 생성되었습니다.'
    else
      render :new
    end
  end
  private
  def user_params
    params.require(:user).permit(:name, :email)
  end
end
```

## 쿼리 객체: 데이터베이스 쿼리 유지보수성 높이고 재사용성 높이기

쿼리 객체는 데이터베이스 쿼리를 캡슐화하여 재사용 가능하고 테스트하기 쉽도록 만듭니다.

<div class="content-ad"></div>

예시

```js
# app/queries/recent_users_query.rb
class RecentUsersQuery
  def initialize(relation = User.all)
    @relation = relation
  end
  def call
    @relation.where('created_at >= ?', 1.week.ago)
  end
end
# 사용법
recent_users = RecentUsersQuery.new.call
```

## 폼 객체: 복잡한 양식 및 유효성 검사 처리

폼 객체는 유효성 검사와 처리 로직이 포함된 복잡한 양식을 관리하는 데 도움을 줍니다.

<div class="content-ad"></div>

예시

```js
# app/forms/user_registration_form.rb
class UserRegistrationForm
  include ActiveModel::Model
  attr_accessor :name, :email, :password
  validates :name, :email, :password, presence: true
  def save
    return false unless valid?
    user = User.create(name: name, email: email, password: password)
    user.persisted?
  end
end

# 컨트롤러에서 사용법
class RegistrationsController < ApplicationController
  def create
    @form = UserRegistrationForm.new(user_params)
    if @form.save
      redirect_to root_path, notice: '등록 성공했습니다.'
    else
      render :new
    end
  end

  private

  def user_params
    params.require(:user_registration_form).permit(:name, :email, :password)
  end
end
```

## 프리젠터/데코레이터 패턴: 뷰를 깔끔하게 유지하기

프리젠터 또는 데코레이터는 모델에 표현 로직을 추가하여 뷰를 깔끔하게 유지합니다.


<div class="content-ad"></div>

Draper Gem을 사용한 예시

```js
# Gemfile
gem 'draper'
# app/decorators/user_decorator.rb
class UserDecorator < Draper::Decorator
  delegate_all
  def full_name
    "#{object.first_name} #{object.last_name}"
  end
end
# 뷰에서 사용하기
<%= @user.decorate.full_name %>
```

## 값 객체: 도메인 개념 캡슐화

값 객체는 속성을 넘어 식별자가 없는 도메인 개념을 표현합니다.

<div class="content-ad"></div>

예시

```js
# app/models/money.rb
class Money
  include Comparable
  attr_reader :amount, :currency
  def initialize(amount, currency)
    @amount = amount
    @currency = currency
  end
  def <=>(other)
    amount <=> other.amount
  end
  def to_s
    "#{amount} #{currency}"
  end
end

# 사용법
price = Money.new(100, 'USD')
puts price.to_s  # "100 USD"
```

## 고려사항: 사용 시기 (그리고 피해야 할 때)

Concerns는 공유 기능을 모듈화하는 데 사용되지만, 과용은 스파게티 코드로 이어질 수 있습니다.

<div class="content-ad"></div>

예시

```js
# app/models/concerns/timestampable.rb
module Timestampable
  extend ActiveSupport::Concern
  included do
    before_create :set_created_at
    before_update :set_updated_at
  end
  private
  def set_created_at
    self.created_at ||= Time.current
  end
  def set_updated_at
    self.updated_at = Time.current
  end
end
# app/models/user.rb
class User < ApplicationRecord
  include Timestampable
end
```

## 레일즈 애플리케이션에서 이벤트 기반 아키텍처

이벤트 기반 아키텍처는 구성 요소들을 분리하여 시스템을 확장 가능하게 만듭니다.

<div class="content-ad"></div>

rails_event_store 젬을 사용한 예시

```js
# Gemfile
gem 'rails_event_store'

# app/events/user_created_event.rb
class UserCreatedEvent < RailsEventStore::Event
  def self.create(user)
    new(data: { user_id: user.id, name: user.name })
  end
end

# 이벤트 발생 시키기
Rails.configuration.event_store.publish(UserCreatedEvent.create(user))

# 이벤트 처리하기
class NotifyAdminOnUserCreated
  def call(event)
    AdminMailer.new_user(event.data[:user_id]).deliver_later
  end
end

Rails.configuration.event_store.subscribe(
  NotifyAdminOnUserCreated.new,
  to: [UserCreatedEvent]
)
```

# 확장 가능하고 유지보수가 쉬운 Rails 어플리케이션 설계

Rails 엔진을 사용한 모듈화 디자인

<div class="content-ad"></div>

레일즈 엔진은 기능을 격리된 모듈로 캡슐화하여 모듈화를 강화합니다.

예시

```js
# 새 엔진 생성
rails plugin new blorgh --mountable
```

```js
# 엔진 마운트하기
# config/routes.rb
mount Blorgh::Engine, at: "/blorgh"
# 엔진의 라우트
# blorgh/config/routes.rb
Blorgh::Engine.routes.draw do
  resources :articles
end
```

<div class="content-ad"></div>

## API 버전 관리 전략

버전 관리는 API 변경 사항에 대한 하위 호환성을 보장합니다.

예시

```js
# app/controllers/api/v1/base_controller.rb
module Api
  module V1
    class BaseController < ApplicationController
      # 버전 1 API 로직
    end
  end
end
# app/controllers/api/v2/base_controller.rb
module Api
  module V2
    class BaseController < ApplicationController
      # 버전 2 API 로직
    end
  end
end
# config/routes.rb
namespace :api do
  namespace :v1 do
    resources :users
  end
  namespace :v2 do
    resources :users
  end
end
```

<div class="content-ad"></div>

효율적으로 백그라운드 작업 처리하기 (Sidekiq 최적 방법)

Sidekiq 구성

```js
# Gemfile
gem 'sidekiq'
# config/initializers/sidekiq.rb
Sidekiq.configure_server do |config|
  config.redis = { url: 'redis://localhost:6379/0' }
end
Sidekiq.configure_client do |config|
  config.redis = { url: 'redis://localhost:6379/0' }
end
```

작업자 정의

<div class="content-ad"></div>

```js
# app/workers/my_worker.rb
class MyWorker
  include Sidekiq::Worker
  def perform(user_id)
    user = User.find(user_id)
    user.update(last_login: Time.current)
  end
end
```

작업 일정화

```js
# app/jobs/daily_summary_job.rb
class DailySummaryJob < ApplicationJob
  queue_as :default
  def perform
    User.send_daily_summaries
  end
end
# `whenever`로 일정 등록
every :day, at: '12:00 am' do
  runner "DailySummaryJob.perform_later"
end
```

## 모놀리스를 마이크로서비스로 분리하는 전략

<div class="content-ad"></div>

경계 식별하기

- 도메인 주도 설계: 응용 프로그램 내에서 경계된 컨텍스트 식별하기.

마이크로서비스 생성

- 별도의 코드베이스: 각 마이크로서비스는 고유한 저장소를 가져야 합니다.
- API 통신: 서비스 간 통신에는 HTTP/REST 또는 gRPC를 사용해야 합니다.

<div class="content-ad"></div>

예시

```js
# 사용자 서비스 (마이크로서비스)
class UsersController < ApplicationController
  def show
    user = User.find(params[:id])
    render json: user
  end
end

# 주문 서비스 (마이크로서비스)
class OrdersController < ApplicationController
  def create
    user_response = HTTP.get("http://user_service/users/#{params[:user_id]}")
    user = JSON.parse(user_response.body)
    # 주문 로직 생성
  end
end
```

## 기능 토글 및 카나리아 릴리스

기능 토글

<div class="content-ad"></div>

기능 토글은 새로운 코드를 배포하지 않아도 기능을 활성화하거나 비활성화할 수 있게 해줍니다.

플리퍼 젬을 사용한 예시

```js
# Gemfile
gem 'flipper'
# config/initializers/flipper.rb
Flipper.configure do |config|
  config.default do
    adapter = Flipper::Adapters::ActiveRecord.new
    Flipper.new(adapter)
  end
end
# Usage
if Flipper.enabled?(:new_feature)
  # 새로운 기능 로직
else
  # 이전 기능 로직
end
```

카나리아 릴리스

<div class="content-ad"></div>

Canary 릴리스를 사용하면 전체 롤아웃 이전에 일부 사용자에게 기능을 배포할 수 있습니다.

예시

```js
# config/initializers/canary_releases.rb
class CanaryRelease
  def self.enabled_for?(user)
    user.id % 10 == 0  # 10%의 사용자에 대해 활성화
  end
end
# 사용법
if CanaryRelease.enabled_for?(current_user)
  # 새로운 기능 로직
else
  # 이전 기능 로직
end
```

이러한 모범 사례와 전략을 구현하여 확장 가능하고 유지 관리성이 높으며 고성능의 Rails 애플리케이션을 구축할 수 있습니다. 아키텍처를 리팩토링하고 코드베이스를 모듈화하며 Rails의 고급 기능을 활용하여 웹 개발의 급속히 변화하는 환경에서 앞서 나아갈 수 있습니다.