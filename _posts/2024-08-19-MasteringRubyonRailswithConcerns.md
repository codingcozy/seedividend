---
title: "Concerns를 활용한 Ruby on Rails 마스터하기"
description: ""
coverImage: "/assets/img/2024-08-19-MasteringRubyonRailswithConcerns_0.png"
date: 2024-08-19 03:17
ogImage: 
  url: /assets/img/2024-08-19-MasteringRubyonRailswithConcerns_0.png
tag: Tech
originalTitle: "Mastering Ruby on Rails with Concerns"
link: "https://medium.com/@marouaneamqor/mastering-ruby-on-rails-with-concerns-3b13cb322cfb"
isUpdated: true
updatedAt: 1724032947748
---


![이미지](/assets/img/2024-08-19-MasteringRubyonRailswithConcerns_0.png)

루비 온 레일스 세계에서 Concerns 개념은 더 깔끔하고 모듈식 코드를 작성하는 강력한 도구로 등장했습니다. Concerns를 사용하면 응용 프로그램 전체에서 기능을 캡슐화하고 재사용할 수 있어 코드 조직화와 유지 관리를 촉진합니다.

# Concerns란 무엇인가요?

Rails에서의 Concerns는 모델, 컨트롤러 또는 응용 프로그램의 다른 부분에 포함할 수있는 모듈입니다. 관련 기능을 함께 그룹화하여 코드를 보다 조직화되고 관리하기 쉽게 만들어줍니다.

<div class="content-ad"></div>

Concerns를 사용하면 "fat models" 또는 "fat controllers"의 일반적인 문제를 피할 수 있습니다. 공통 기능을 별도의 모듈로 추출함으로써 코드베이스를 DRY (Don’t Repeat Yourself) 상태로 유지하고 응용 프로그램을 테스트하고 디버깅하기 쉽게 만들 수 있습니다.

# 루비 온 레일스에서 Concerns가 작동하는 방법

루비 온 레일스 애플리케이션에서 concerns를 효과적으로 활용하려면 다음 단계를 따를 수 있습니다:

## Concern 생성:

<div class="content-ad"></div>

먼저, 응용 프로그램/models/concerns 또는 app/controllers/concerns 디렉토리 내에서 관심사를 정의해야 합니다. 여기서 모듈과 관련 로직을 정의합니다.

```js
# app/models/concerns/searchable.rb
module Searchable
  extend ActiveSupport::Concern

  included do
    scope :search, ->(query) { where("name LIKE ?", "%#{query}%") }
  end
end
```

## 관심사 포함:

다음으로, 모델이나 컨트롤러에 관심사를 포함해야 합니다. 이 단계를 통해 정의된 기능을 클래스에 섞어 넣을 수 있습니다.

<div class="content-ad"></div>

```javascript
# app/models/product.rb
class Product < ApplicationRecord
  include Searchable
end
```

## 사용 중인 Concern의 기능:

Concern을 포함하면 필요한 곳 어디에서든 응용 프로그램 전체에 걸쳐 해당 메서드와 스코프를 활용할 수 있습니다.

```javascript
# 응용 프로그램의 다른 곳에서
@products = Product.search("shirt")
```

<div class="content-ad"></div>

# 관심사 구현의 최상의 방법

관심사를 다룰 때 다음과 같은 최상의 방법을 고려하여 코드가 효율적이고 가독성이 좋고 유지 보수가 쉽도록 보장하세요:

- 단일 책임 원칙: 각 관심사는 단일 기능 또는 동작에 집중해야 하며 명확성과 유지 관리의 용이성을 돕습니다.
- 네이밍 규약: 관심사에 대해 기능을 잘 나타내고 직관적인 이름을 사용하세요. 예를 들어, Searchable, Sortable 또는 Loggable과 같이 기능을 반영하는 이름을 사용하세요.
- 의존성 관리: 관심사 간의 상호 의존성에 유의하세요. 한 관심사가 다른 관심사에 의존하는 경우, 이러한 기능을 모두 포함하는 상위 관심사에 통합하는 것이 더 효율적일 수 있습니다.
- 테스트 가능성: 관심사에 대한 테스트를 항상 작성하고 모델이나 컨트롤러와 독립적으로 작동하는지 확인하세요.
- 구성 우선 상속: 클래스 상속 대신 관심사를 포함하는 것을 선호하세요. 이 접근 방식은 더 많은 유연성을 제공하고 기능을 쉽게 혼합할 수 있습니다.

# 기존 코드 리팩터링으로 관심사 활용하기

<div class="content-ad"></div>

기존 코드에 중요한 기능을 추가할 수 있는 Concerns의 사용이 유용할 수 있습니다. 공통 기능을 식별하여 Concerns로 추출하고, 이후 모델, 컨트롤러 및 기타 클래스를 해당 Concerns를 사용하도록 업데이트하세요.

Concerns를 사용한 리팩터링은 코드베이스 전체 구조와 유지 보수성을 향상시킬 수 있어, 앞으로의 확장 및 작업이 보다 쉽고 간편해질 수 있습니다.

# 예시: 검색 가능한 Concern 구현

이 예시에서 Searchable concern은 모델에 동적 검색 스코프를 추가합니다. 이를 통해 제품 이름 내의 하위 문자열을 기반으로 제품을 조회할 수 있으며, 모델에 추가적인 검색 로직을 혼란스럽게 만들지 않습니다.

<div class="content-ad"></div>

```js
# app/models/concerns/searchable.rb
module Searchable
  extend ActiveSupport::Concern

  included do
    scope :search, ->(query) { where("name LIKE ?", "%#{query}%") }
  end
end

# app/models/product.rb
class Product < ApplicationRecord
  include Searchable
end
```

# 결론

Concerns은 Ruby on Rails에서 코드를 효과적으로 구성하고 재사용하는 데 도움이 되는 중요한 기능입니다. 관련 기능을 별도의 모듈로 캡슐화하여 응용 프로그램의 모듈성과 유지 보수성을 향상시킬 수 있습니다. Rails 프로젝트에서 Concerns를 사용하여 이점을 극대화하기 위해 최상의 관행을 준수하는 것을 기억해 주세요.
