---
title: "루비 온 레일즈 앱을 커피스트라노Capistrano를 사용하여 로컬로동일 PC에서 다른 사용자에게 배포하기"
description: ""
coverImage: "/assets/img/2024-05-15-DeploymentofRubyonRailsappusingCapistranoLocallyFromoneusertoanotheronthesamePC_0.png"
date: 2024-05-15 10:39
ogImage: 
  url: /assets/img/2024-05-15-DeploymentofRubyonRailsappusingCapistranoLocallyFromoneusertoanotheronthesamePC_0.png
tag: Tech
originalTitle: "Deployment of Ruby on Rails app using Capistrano Locally(From one user to another on the same PC)"
link: "https://medium.com/@sabitanepal/deployment-of-ruby-on-rails-app-using-capistrano-locally-from-one-user-to-another-on-the-same-pc-77fa551294ab"
---


<img src="/assets/img/2024-05-15-DeploymentofRubyonRailsappusingCapistranoLocallyFromoneusertoanotheronthesamePC_0.png" />

# 소개

소프트웨어 개발에서 애플리케이션을 배포하는 것은 사용자가 이용할 수 있도록 하는 중요한 단계입니다. Capistrano는 배포 프로세스를 자동화하여 효율적이고 신뢰성있게 만드는 인기 있는 도구입니다.

이 안내서에서는 Capistrano를 사용하여 로컬에서 Ruby on Rails 애플리케이션을 배포하는 단계를 안내합니다. 레일즈 앱 배포 방법을 배우면서 수행한 내용이며, 이런 단계를 따랐습니다.



# 전제 조건

시작하기 전에 다음 전제 조건을 확인하세요:

- Ubuntu 터미널과 Capistrano 파일 구조에 대한 기본 지식.
- Ruby on Rails가 PC에 올바르게 설정되어 있어야 합니다.
- 두 사용자가 Rails 앱 디렉토리에 액세스하고 명령을 실행할 필요한 권한을 갖고 있어야 합니다.
- SSH 키가 올바르게 설정되어 있어야 합니다.
- Ubuntu에서 사용자 및 SSH 키 설정에 익숙해야 합니다.

# 사용자 생성 및 SSH 설정



- 새 사용자를 만드세요:

```js
sudo adduser newuser
```

- 사용자를 만든 후, 해당 사용자로 전환하세요

```js
sudo su - newuser
```



새 사용자에게 .ssh 디렉토리를 만들어야 합니다. Rails 앱을 배포하기 위해 ssh 키가 필요합니다.

```js
 mkdir -p ~/.ssh
```

- 기존 사용자의 SSH 인증 키를 새 사용자의 .ssh 디렉토리로 복사해야 합니다. 여기서 ssh는 두 사용자 간 통신에 사용됩니다.

```js
sudo cp /home/existing-user/.ssh/authorized_keys /home/newuser/.ssh
```



- 또한, 새 사용자에게 소유권을 부여해 주세요

```js
sudo chown -R newuser:newuser /home/newuser/.ssh
```

- 새로운 사용자에게 sudo 권한을 부여하세요(관리자 권한을 가진 사용자로 로그인해야 함)

```js
sudo usermod -aG sudo newuser
```



- 이제 새 사용자로 전환할 수 있어요

```js
su - newuser
```

- 이제 새 사용자의 SSH 구성 여부를 확인할 수 있어요

```js
ssh localhost
```



- 만약 ssh가 연결되어 있다면 이제 다음과 같이 표시됩니다 :

![Deployment of Ruby on Rails app using Capistrano Locally From one user to another on the same PC](/assets/img/2024-05-15-DeploymentofRubyonRailsappusingCapistranoLocallyFromoneusertoanotheronthesamePC_1.png)

- 이제 배포 프로세스를 시작해봅시다. 레일즈 앱을 배포하려는 사용자를 엽니다 :

# Gemfile 설정



- 먼저 레일즈에서 Capistrano 젬을 설정하는 것이 첫 번째 단계입니다.

다음을 개발 그룹 아래 Gemfile에 추가하십시오.

```js
gem "capistrano", "~> 3.10", require: false
gem "capistrano-rails", "~> 1.6", require: false 
gem 'capistrano-rbenv', require: false   
gem 'capistrano-puma', require: false
```

- 이제 다음 명령을 명령 줄에서 실행하여 추가 번들을 설치하십시오



```js
번들 설치
```

- 생성기를 실행하여 기본 구성 파일 세트를 만듭니다.

```js
번들 실행 cap 설치
```

# Capfile 구성



- 루트 디렉토리에 있는 Capfile에서 다음 플러그인들을 주석처리 해제하세요.

```js
require "capistrano/rbenv" 
require "capistrano/bundler"
require "capistrano/rails/assets"
require "capistrano/rails/migrations" 
require "capistrano/rails" 
require "capistrano/bundler"
require "capistrano/puma"
```

- 참고: 위의 플러그인은 앱의 요구 사항에 따라 다를 수 있습니다. 예를 들어, 여기서 패신저를 사용하는 경우 require "capistrano/passenger"를 추가해야합니다. 저는 사용하지 않기 때문에 추가하지 않아도 됩니다.

# 설정 파일



- `config/deploy.rb` 파일을 적절한 값으로 업데이트해주세요. 여기서는 cap loc 버전 3.18.0을 사용하며 `staging.rb`를 사용하여 배포하고 있습니다.
- 프로젝트 요구 사항에 따라 구성을 사용자 정의해주시기 바랍니다.

```js
lock "~> 3.18.0"
set :stage, :staging 
set :rails_env, 'test' 
set :application, '{앱 이름}' 
set :repo_url, 'git@github.com:당신의/github/url.git' 
set :deploy_to, '/home/{로컬 사용자명}/{배포할 애플리케이션 이름}' 
set :branch, '{배포하려는 브랜치}' 
set :rbenv_ruby, '2.7.7' 
set :default_env, { 'PATH' => "#{fetch(:rbenv_path)}/shims:#{fetch(:rbenv_path)}/bin:$PATH", 'RBENV_VERSION' => fetch(:rbenv_ruby) }
```

# 배포

- `staging.rb` 파일에 로컬 호스트 IP를 추가하세요.



```js
서버 'localhost', 사용자: '{귀하의 로컬 사용자 이름}', 역할: %w{app db web}
```

- 이제 다음 명령을 사용하여 API를 로컬로 배포할 수 있습니다.

```js
cap staging deploy
```

- 이제 루비 온 레일 API가 로컬로 배포되었고 앱 폴더로 이동하여 버전을 확인할 수 있습니다. 현재 디렉토리로 이동한 후에 아래 명령을 실행할 수 있습니다.



```js
bin/rails s
```

- 특정 젬 설치 오류가 발생하면 ruby와 rails 간 버전 간의 충돌이 없는지 확인해보세요.

이제 파일 구조가 다음과 같이 보일 것입니다 :

![image](/assets/img/2024-05-15-DeploymentofRubyonRailsappusingCapistranoLocallyFromoneusertoanotheronthesamePC_2.png)




# 결론

축하합니다! Capistrano를 사용하여 로컬에 Ruby on Rails 애플리케이션을 성공적으로 배포했습니다. 이제 Rails 서버를 실행하고 애플리케이션에 액세스할 수 있습니다.

# 팁

- 배포 명령을 실행하기 전에 배포 구성을 항상 확인해보세요.
- 배포 중 발생하는 오류를 해결하려면 로그와 구성을 확인하세요.
- 프로젝트의 요구에 맞게 Capistrano 구성을 사용자 정의하세요.