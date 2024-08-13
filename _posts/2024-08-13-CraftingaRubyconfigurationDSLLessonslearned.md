---
title: "Ruby 설정 DSL 만들기 얻은 교훈들"
description: ""
coverImage: "/assets/no-image.jpg"
date: 2024-08-13 11:42
ogImage: 
  url: /assets/no-image.jpg
tag: Tech
originalTitle: "Crafting a Ruby configuration DSL Lessons learned"
link: "https://medium.com/@vaisakhvm/crafting-a-ruby-configuration-dsl-lessons-learned-8bbb0958c670"
---


만약 YAML 또는 JSON 구성이 복잡해져서 고민한 적이 있다면 혼자가 아닙니다. 이러한 형식이 얼마나 복잡해질 수 있는지에 좌절하여, 저는 자체 도메인 특화 언어(Domain-Specific Language, DSL)를 루비로 만들기로 결심했습니다. 간단한 학습 연습으로 시작했지만, 구성 관리를 훨씬 간단하게 만들어주는 강력한 도구로 발전했습니다. 이 DSL을 만들면서 배운 점과 복잡한 구성을 처리하는 방식이 어떻게 변화했는지 알아보겠습니다.

## 전통적인 구성 형식의 도전

YAML과 JSON은 구성에 널리 사용되지만, 그 한계가 있습니다. 구성이 복잡해지면 이러한 형식은 더욱 번잡하고 오류가 발생하기 쉽습니다. 이러한 복잡성을 관리하는 것을 더 쉽고 직관적으로 만들기 위한 해결책이 필요했습니다.

## 루비에서 장난감 DSL 만들기

<div class="content-ad"></div>

루비의 메타프로그래밍 기능 덕분에 DSL을 만드는 데 좋은 선택이 됩니다. 설정을 더 우아하게 처리하기 위해 기본 DSL을 만들었습니다. 아래는 제가 만든 ConfigParser 클래스를 살펴볼 수 있어요:

```js
class ConfigParser
  def initialize(file)
    @file = file
    @config = {}
  end

  def parse
    instance_eval(File.read(@file))
  end

  def server(name, &block)
    @config[:server] = { name: name }
    instance_eval(&block)
  end

  def port(number)
    @config[:server][:port] = number
  end

  def enable_ssl(value)
    @config[:server][:enable_ssl] = value
  end

  def to_h
    @config
  end
end
```

이 DSL을 사용하면 설정을 명확하고 가독성 있게 정의할 수 있어요. 복잡한 YAML이나 JSON을 다루지 않고 관리가 쉬운 직관적인 루비 코드를 사용해요.

## 예시 설정

<div class="content-ad"></div>

다음은 내 DSL(config.dsl)을 사용하여 구성 파일을 작성하는 방법의 예시입니다:

```js
server 'vaisakhvm.in' do
  port 80
  enable_ssl true
end
```

이 DSL 구성이 처리되면 다음과 같이 YAML 형식으로 변환됩니다:

```js
server:
  name: vaisakhvm.in
  port: 80
  enable_ssl: true
```

<div class="content-ad"></div>

## 배운 내용

이 프로젝트에서 얻은 핵심 교훈 중 하나는 DSL이 복잡한 구성에 간단함과 명확함을 제공하는 방법을 이해한 것입니다. Ruby에서 내부 DSL을 설계함으로써 사용자 정의 구문이 복잡한 설정을 단순화하고 구성 프로세스를 훨씬 더 관리하기 쉽게 만드는 방법이 명확해졌습니다.

또한 Ruby의 메타프로그래밍 기능에 대해 배웠습니다. 이러한 기능은 특정 요구에 맞는 유연하고 맞춤형 DSL을 생성하는 데 매우 효과적이며, 코드베이스에 과도한 복잡성을 도입하지 않습니다.

내부 DSL을 생성하는 것 이상으로, 이 프로젝트는 내부 DSL과 외부 DSL 사이의 확장된 DSL 랜드스케이프를 상기시켰습니다. 내부 DSL은 Ruby와 같은 호스트 언어 내에 포함된 DSL이며, 외부 DSL은 고유한 구문과 구문 분석기를 갖춘 독립형 언어입니다. 각 유형에는 각각의 강점이 있습니다. 내부 DSL은 기존 프로젝트에 쉽게 통합할 수 있지만, 외부 DSL은 추가 복잡성을 초래하면서 언어 설계에서 더 많은 자유를 제공합니다.

<div class="content-ad"></div>

다양한 접근법을 이해하면 DSL의 유연성과 잠재력에 대한 이해가 높아집니다. 기존 언어의 제약 내에서 작업하거나 처음부터 새로운 언어를 설계하더라도 DSL은 복잡한 작업을 훨씬 더 관리 가능하고 효율적으로 변환할 수 있습니다.

원문은 vaisakhvm.in에서 공개되었습니다. 원문은 여기에서 확인할 수 있습니다.