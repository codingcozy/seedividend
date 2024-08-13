---
title: "Rails 72 릴리스 꼭 알아야 할 주요 기능 총정리"
description: ""
coverImage: "/assets/no-image.jpg"
date: 2024-08-13 11:52
ogImage: 
  url: /assets/no-image.jpg
tag: Tech
originalTitle: "Rails 72 Release Everything You Need to Know  Major Features"
link: "https://medium.com/@rajputlakhveer/rails-7-2-release-everything-you-need-to-know-with-examples-f71698b7297e"
---


레일스의 최신 버전인 Rails 7.2가 출시되었습니다! 이번 릴리스에는 개발 애플리케이션을 더 효율적이고 즐겁게 만들어주는 다양한 새로운 기능과 개선 사항이 포함되어 있습니다. 주요 업데이트를 살펴보고 시작하는 데 도움이 될 예제를 함께 살펴보세요. 🎉

탑재된 내용:
- Redis 컨테이너: 캐싱, 액션 케이블 및 기타 Redis 종속 기능에 사용됩니다.
- 데이터베이스: SQLite, Postgres, MySQL 또는 MariaDB 중 선택할 수 있습니다.
- Headless Chrome: GUI 없이 시스템 테스트를 실행하는 데 이상적입니다.
- Active Storage: 모든 미리보기 기능이 활성화된 로컬 디스크 스토리지를 사용하도록 구성됩니다.

사용 방법:
- 새 앱 생성: 다음 명령을 실행하여 개발 컨테이너가 포함된 새로운 Rails 애플리케이션을 생성할 수 있습니다:

<div class="content-ad"></div>

```js
rails new myapp --devcontainer
```

-기존 앱에 추가하기: 이미 Rails 앱을 가지고 계신 경우, 다음 명령을 실행하여 개발 컨테이너 구성을 추가할 수 있습니다:

```js
rails devcontainer
```

이렇게 하면 `Dockerfile`, `docker-compose.yml`, `devcontainer.json`과 같은 필요한 구성 파일이 모두 포함된 `.devcontainer` 폴더가 생성됩니다. 이제 Visual Studio Code나 다른 dev containers를 지원하는 도구를 사용하여 완전히 구성된 환경에서 코딩을 시작할 수 있습니다. 💻

<div class="content-ad"></div>

Rails 7.2에서는 응용 프로그램에 액세스 할 수있는 브라우저 버전을 지정하는 기능이 도입되었습니다. 이는 필요한 기능을 지원하는 브라우저에서만 응용 프로그램이 실행되도록하여 호환성 문제를 피하는 데 유용합니다.

예를 들어, 인터넷 익스플로러와 같이 구버전의 브라우저를 차단하고 Safari, Firefox 및 Chrome과 같이 최신 버전의 브라우저만 허용하려면 다음과 같이 할 수 있습니다:

```js
class ApplicationController < ActionController::Base
 allow_browser versions: { safari: 16.4, firefox: 121, ie: false }
end
```

컨트롤러 내 개별 작업에 대한 특정 규칙도 추가할 수 있습니다.

<div class="content-ad"></div>

```js
class MessagesController < ApplicationController
 allow_browser versions: { opera: 104, chrome: 119 }, only: :show
end
```

만약 지원되지 않는 브라우저로 앱에 액세스하려는 사용자가 있으면 `406 Not Acceptable` 오류가 표시되고 앱은 사용자에게 브라우저를 업데이트하라는 친절한 메시지를 제공합니다.

무엇인가요: Rails 7.2는 실행하기 위해 적어도 Ruby 3.1이 필요합니다. 이는 Rails 애플리케이션이 최신 Ruby 기능, 보안 패치 및 성능 향상을 얻도록 보장합니다.

왜 중요한가요: 이전 Ruby 버전을 삭제함으로써 Rails는 가볍고 현대적인 Ruby 기능을 활용할 수 있습니다. 또한 개발자가 환경을 최신 상태로 유지하도록 장려하여 잠재적인 보안 위험을 줄이고 애플리케이션 성능을 향상시킵니다.


<div class="content-ad"></div>

업그레이드 방법: 이전 버전의 Ruby를 사용 중이라면, Rails 7.2로 업데이트하기 전에 Ruby 3.1로 업그레이드해야 합니다. 다음은 어떻게 할 수 있는지에 대한 안내입니다:

- Ruby 3.1 설치: `rbenv`나 `rvm`과 같은 버전 관리자를 사용하여 Ruby 3.1을 설치합니다.

```js
rbenv install 3.1.0
```

2. Gemfile 업데이트: `Gemfile`을 업데이트하여 새로운 Ruby 버전을 지정합니다.

<div class="content-ad"></div>

```js
루비 '3.1.0'
```

3. 번들 설치: `bundle install`을 실행하여 모든 보석이 Ruby 3.1과 호환되는지 확인하세요.

무엇인가요: Rails 7.2는 PWA(Progressive Web Application) 지원을 위해 PWA 매니페스트와 서비스 워커를 생성하여 응용 프로그램을 준비합니다. 이러한 파일을 통해 응용 프로그램이 네이티브 모바일 앱처럼 동작하여 오프라인 액세스, 푸시 알림 및 홈 화면 아이콘과 같은 기능을 제공할 수 있습니다.

예시: 새로운 Rails 앱을 생성할 때 다음 파일이 자동으로 포함됩니다:

<div class="content-ad"></div>

- Manifest: 앱의 이름, 아이콘, 테마 색상 및 기타 메타데이터를 정의합니다.
- Service Worker: 앱의 캐싱 및 오프라인 액세스를 처리합니다.

이 파일들은 `app/views/pwa`에서 제공되며 ERB를 사용하여 동적 콘텐츠를 렌더링하는 데 사용할 수 있습니다.

사용 방법: 생성된 파일을 수정하여 앱의 요구에 맞게 사용자 정의할 수 있습니다. 예를 들어, 매니페스트를 수정하여 앱의 로고와 테마 색상을 포함할 수 있습니다:

```js
{
 "name": "나의 Rails 앱",
 "short_name": "RailsApp",
 "icons": [
 {
 "src": "/assets/icon.png",
 "sizes": "192x192",
 "type": "image/png"
 }
 ],
 "start_url": "/",
 "display": "standalone",
 "theme_color": "#000000",
 "background_color": "#ffffff"
}
```

<div class="content-ad"></div>

무엇인가요: Rails 7.2에는 `rubocop-rails-omakase` 젬에서 가져온 기본 RuboCop 규칙 세트가 포함되어 있습니다. RuboCop은 깨끗하고 일관성 있고 관용적인 루비 코드를 작성하는 데 도움이 되는 정적 코드 분석기입니다.

왜 유용한가요: 이러한 기본 규칙은 코드 스타일링에 대한 견고한 시작점을 제공하여, 특히 자체 스타일 가이드를 수립하지 않은 팀에게 도움이 됩니다. 일관된 코드베이스를 유지하여 읽고 협업하기 쉽게 만들어 줍니다.

어떻게 사용자 정의할 수 있나요: 프로젝트에서 생성된 `.rubocop.yml` 파일을 편집하여 RuboCop 규칙을 팀의 선호도에 맞게 사용자 정의할 수 있습니다. 몇 가지 규칙을 사용자 정의하는 예시는 다음과 같습니다:

```js
Style/StringLiterals:
 EnforcedStyle: double_quotes
Metrics/LineLength:
 Max: 100
```

<div class="content-ad"></div>

당신은 RuboCop을 실행하여 코드를 분석할 수 있어요:

```js
rubocop
```

무엇인가요: Rails 7.2는 새로운 애플리케이션에 GitHub CI 워크플로 파일을 자동으로 추가합니다. 이를 통해 GitHub Actions를 사용하여 자동화된 테스트, 린팅 및 보안 스캔을 설정하여 높은 코드 품질을 유지할 수 있어요.

무엇인가요: 새로운 Rails 7.2 애플리케이션에는 이제 정적 분석 보안 도구인 Brakeman이 기본적으로 설치되어 있어요. 이 도구는 코드를 보안 취약점으로 스캔하고 GitHub CI 워크플로와 매끄럽게 통합될 수 있어요.

<div class="content-ad"></div>

브레이크맨을 실행하는 방법: 다음 명령을 사용하여 브레이크맨을 수동으로 실행할 수 있습니다:

```js
brakeman
```

또는 CI 파이프라인의 일부로 깃허브로 푸시할 때 자동으로 실행하도록 할 수 있습니다. 이렇게 하면 잠재적 보안 문제를 개발 프로세스 초기 단계에서 미리 발견할 수 있습니다.

브레이크맨이란: 레일즈 7.2에서는 Puma(레일즈의 기본 웹 서버)의 기본 쓰레드 수를 5에서 3으로 변경합니다. 이 변경은 실무 경험을 기반으로 하며 동시성과 성능을 최적화하는 데 도움이 됩니다.

<div class="content-ad"></div>

왜 중요한가요: 쓰레드 수를 줄이면 글로벌 VM 락(GVL)이 해제되기를 기다리는 시간이 최소화되어 애플리케이션의 요청 응답 시간을 개선할 수 있습니다.

사용자 정의 방법: 쓰레드 수를 조정하려면 `puma.rb` 구성 파일을 수정할 수 있습니다:

```js
threads_count = ENV.fetch("RAILS_MAX_THREADS") { 3 }
threads threads_count, threads_count
```

여러 가지 값으로 실험하여 특정 애플리케이션에 최적인 균형을 찾아보세요.

<div class="content-ad"></div>

무슨 것이: 레일스에서 흔한 문제 중 하나는 트랜잭션 내에서 작업을 큐에 추가하는 것인데, 이는 작업이 트랜잭션이 완료되기 전에 처리되면 오류를 발생시킬 수 있습니다. 레일스 7.2는 이제 트랜잭션이 완료된 후에 작업을 큐에 추가하므로 이러한 오류를 방지합니다.

예시: 이 기능이 작동하는 방식은 다음과 같습니다:

```js
Topic.transaction do
  topic = Topic.create
  NewTopicNotificationJob.perform_later(topic)
end
```

위 예시에서 `NewTopicNotificationJob`은 트랜잭션이 성공적으로 커밋된 후에 큐에 추가됩니다. 이렇게 하면 관련된 데이터베이스 변경 사항이 안전하게 저장된 경우에만 작업이 실행되도록 보장됩니다.

<div class="content-ad"></div>

만약 이 동작을 명시적으로 제어하고 싶다면, `enqueue_after_transaction_commit` 옵션을 사용할 수 있어요:

```js
NewTopicNotificationJob.set(enqueue_after_transaction_commit: true).perform_later(topic)
```

이게 뭔가요: Rails 7.2에서는 ActiveRecord 모델 외부에서도 트랜잭션에 콜백을 등록할 수 있는 기능을 소개했어요. 이를 통해 트랜잭션이 커밋되거나 롤백될 때만 발생해야 하는 동작을 더 유연하게 관리할 수 있어요.

예시: 트랜잭션이 성공적으로 커밋된 후에만 이메일 알림을 보내고 싶다면 다음과 같이 할 수 있어요:

<div class="content-ad"></div>

```js
Article.transaction do |transaction|
 article.update(published: true)
  transaction.after_commit do
    PublishNotificationMailer.with(article: article).deliver_later
  end
end
```

만약 트랜잭션이 실패하면, 이메일이 전송되지 않습니다. 이는 코드가 더 견고하고 예측 가능하도록 보장합니다.

무엇인가요: 루비에서 도입된 Just-In-Time (JIT) 컴파일러인 YJIT은 Ruby 3.3 이상을 사용하고 있다면 기본으로 활성화됩니다. YJIT은 루비 코드가 실행되는 방식을 최적화하여 레일즈 애플리케이션을 크게 가속화할 수 있습니다.

작동 방식: YJIT은 코드의 자주 실행되는 부분을 실시간으로 기계 코드로 컴파일하여 레일즈 애플리케이션의 대기 시간을 15~25% 향상시킬 수 있습니다.


<div class="content-ad"></div>

왜 멋진가요: 이 기능은 자동으로 활성화되어 성능을 향상시키며 별도의 구성 없이 혜택을 누릴 수 있습니다. Ruby 3.3 이상을 실행 중이라면 해당 기능을 활용할 수 있습니다.

이것이 무엇인가요: Rails 7.2는 Rails 가이드에 새롭고 깔끔한 디자인을 도입하여 사용자 친화적인 환경을 제공합니다. 업데이트된 디자인은 Rails 홈페이지와 일관성 있게 유지되며 내비게이션을 간소화합니다.

왜 중요한가요: Rails 가이드는 Rails 개념을 학습하고 참조하는 데 필수적인 자원입니다. 새로운 디자인은 정보를 빠르게 찾을 수 있게 해주며 더 즐거운 읽기 경험을 제공합니다.

이것이 무엇인가요: Rails 7.2에는 기본 Dockerfile에 jemalloc이 포함되어 메모리 할당을 최적화합니다. Jemalloc은 메모리 단편화를 줄여주는 메모리 할당기로, 퓨마와 같은 멀티스레드 환경에 특히 유용합니다.

<div class="content-ad"></div>

왜 중요한가요: jemalloc을 사용하면 더 효율적인 메모리 사용이 가능하며, Rails 애플리케이션의 메모리 소비를 줄이고 성능을 향상시킬 수 있습니다.

사용 방법: Docker를 사용 중이라면 Rails은 자동으로 jemalloc을 사용할 것입니다. Dockerfile에 수동으로 추가할 수도 있습니다.

```js
RUN apt-get update && apt-get install -y libjemalloc-dev
ENV LD_PRELOAD=/usr/lib/x86_64-linux-gnu/libjemalloc.so.2
```

이것이 무엇인가요: Puma-dev은 Docker를 필요로 하지 않고 로컬에서 여러 개의 Rails 애플리케이션을 쉽게 관리할 수 있는 도구입니다. Rails 7.2에서는 `bin/setup` 스크립트에 puma-dev를 설정하는 제안이 포함되어 있습니다.

<div class="content-ad"></div>

왜 유용한가요: 여러 개의 Rails 애플리케이션을 동시에 작업 중이라면 puma-dev을 사용하면 관리가 간단해집니다. 다른 포트를 관리하는 대신 `myapp.test`와 같은 사용자 정의 도메인을 통해 각 앱에 액세스할 수 있습니다.

Rails 7.2에는 개발 워크플로우를 향상시키고 성능을 향상시키며 응용 프로그램을 더 안전하고 유지보수가 쉽도록하는 기능이 가득히 포함되어 있습니다. 개발용 컨테이너 추가, 더 나은 브라우저 호환성 제어, 또는 새로운 트랜잭션 관리 기능 등, 이번 릴리스에서 모두를 위한 기능이 있습니다. 전체 기능 목록을 확인하려면 여기를 참조하세요.

오늘 Rails 7.2로 업그레이드하고 이 흥미로운 새로운 기능을 활용해보세요! 🚀

Rails 7.2에 대한 이 깊은 탐구를 즐겼나요? 동료 개발자와 공유하고 Rails 통찰과 튜토리얼을 더 기대해주세요.

<div class="content-ad"></div>

행복한 코딩! 🎉