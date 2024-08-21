---
title: "불안정한 테스트 FactoryBot ID 문제를 확인하세요"
description: ""
coverImage: "/assets/img/2024-08-03-FlakyTestsCheckyourFactoryBotIDs_0.png"
date: 2024-08-03 18:51
ogImage:
  url: /assets/img/2024-08-03-FlakyTestsCheckyourFactoryBotIDs_0.png
tag: Tech
originalTitle: "Flaky Tests Check your FactoryBot IDs"
link: "https://medium.com/gusto-engineering/flaky-tests-check-your-factorybot-ids-694bf8b9dfea"
isUpdated: true
---

![FactoryBot](/assets/img/2024-08-03-FlakyTestsCheckyourFactoryBotIDs_0.png)

FactoryBot은 테스팅을 간단하게 하는 데 사용되는 인기 있는 Ruby 라이브러리입니다. FactoryBot의 핵심 기능 중 하나는 "팩토리"를 생성하는 기능입니다. 팩토리는 ActiveRecord 모델 객체의 인스턴스를 생성하기 위한 템플릿으로, 테스트 데이터를 설정하고 관리하기 쉽게 만들어줍니다.

팩토리를 생성할 때 해당 모델의 ID 속성을 어떻게 관리해야 하는지 궁금할 수 있습니다.

팩토리의 ID를 정의하는 것은 간단해 보일 수 있지만, 잘못 구현하면 결정론적이지 않은 불안정한 테스트 결과를 초래할 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

여기 두 예시 팩토리가 있습니다. 해당하는 모델 속성은 주석 처리되어 있습니다. 이를 채워봅시다.

```js
FactoryBot.define do
  factory(:user) do
    # id
    # uuid
    # external_customer_id
    # has_one :account
  end

  factory(:account) do
    # id
    # uuid
    # belongs_to :user
  end
end
```

데이터베이스 ID

데이터베이스 ID는 데이터베이스에서 제공되므로 팩토리에서 직접 정의해서는 안 됩니다. 데이터베이스 ID를 팩토리에서 수동으로 정의하려고 하면 고유성 유효성 검증 오류가 발생할 수 있습니다. 대부분의 데이터베이스에서는 주 키가 데이터베이스 ID 이므로 이를 제거해야 합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

FactoryBot.define do
factory(:user) do # uuid # external_customer_id # has_one :account
end

factory(:account) do # uuid # belongs_to :user
end
end

UUIDs

UUIDs should be randomly generated. At Gusto, we use the standard ruby module SecureRandom to generate 128-bit UUIDs with a very low chance of collision.

FactoryBot.define do
factory(:user) do
uuid {::SecureRandom.uuid } # external_customer_id # has_one :account
end

factory(:account) do
uuid {::SecureRandom.uuid } # belongs_to :user
end
end

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

외래 키 ID

외래 키 ID는 팩토리에서 정의되어서는 안 되며 명시적 관계로 작성하는 것이 가장 좋습니다. 외래 키를 수동으로 정의하면 참조된 레코드가 존재하지 않거나 다른 테스트에서 생성되었을 수 있어 혼돈스러운 테스트 동작이 발생할 수 있습니다.

만약 관계가 선택적인 경우에는 특성(trait)을 활용하여 관련성을 포함하는 팩토리의 변형을 정의할 수 있습니다.

```js
FactoryBot.define do
  factory(:user) do
    uuid {::SecureRandom.uuid }
    # external_customer_id

    trait :with_account do
      association :account, factory: :account
    end
  end

  factory(:account) do
    uuid {::SecureRandom.uuid }
    association :user, factory: :user
  end
end
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

사용자 팩토리는 다음과 같이 호출할 수 있습니다:

```js
let (:user_without_account) { create(:user) }
let (:user_with_account) { create(:user, :with_account) }
```

기타 ID

FactoryBot의 시퀀스 메소드는 주요 키(primary key)와 같이 명확한 제약 조건이 없는 ID를 정의하는 간단한 방법입니다. sequence는 기본적으로 증가값을 갖는 속성의 시퀀스를 정의합니다. 다시 말해, 팩토리 속성에 시퀀스를 정의하면 해당 팩토리의 모든 새 인스턴스는 시퀀스를 증가시킵니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
FactoryBot.define do
  factory(:user) do
    uuid {::SecureRandom.uuid }
    sequence(:external_customer_id)

    trait :with_account do
      association :account, factory: :account
    end
  end

  factory(:account) do
    uuid {::SecureRandom.uuid }
    association :user, factory: :user
  end
end
```

우리 예제 팩토리를 사용하는 테스트를 고려해 보세요. 사용자 팩토리의 external_customer_id가 일련번호로 구현되어 있습니다.

```js
RSpec.describe GetUsersWithActiveAccounts do
  describe ‘.call’ do
    it ‘returns users with active accounts’ do
      # Create two users with accounts
     let(:user1) { create(:user, :with_account) }
     let(:user2) { create(:user, :with_account) }

     # Stub out the IsAccountActive service call
     allow(IsAccountActive).to receive(:call).with(external_customer_id: 1).and_return(true)

     # Expect the service to return users with active accounts
     expect(described_class.call).to include(user1)
    end
  end
end
```

안타깝지만, 이 테스트에는 문제가 있습니다 — 어떤 문제인지 발견할 수 있을까요?

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

스텁된 IsAccountActive API는 external_customer_id가 1을 예상하고 있습니다. 사용자 팩토리가 external_customer_id를 정의하는 데 시퀀스를 사용하므로 사용자의 첫 번째 인스턴스는 external_customer_id가 1로 할당됩니다.

이 테스트가 사용자 팩토리를 사용하는 유일한 테스트이거나 이 테스트를 독립적으로 실행한다면 안전합니다(현재까지). 그러나 누군가 다른 테스트가 여러분보다 먼저 사용자를 만들 경우, 문제가 발생할 수 있습니다: 스텁된 API는 external_customer_id가 1인 것으로 예상하지만 우리의 시퀀스 덕분에 external_customer_id가 2를 받게 됩니다.

많은 CI 파이프라인은 테스트의 순서를 섞어 숨겨진 테스트 의존성을 발견하고 테스트 실행을 분담합니다. 이러한 섞기는 팩토리의 ID 시퀀스를 방해하고 이해하기 어려운 테스트 실패를 발생시킬 수 있습니다. 더 나쁜 경우, 프로덕션 빌드가 기능 브랜치 빌드와 다르게 구성되어 있으면 코드를 병합할 때까지 문제가 나타나지 않을 수 있습니다.

시퀀싱 문제를 해결하는 한 가지 기술은 시퀀스의 시작 값을 조정하는 것입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
sequence(:id) { |n| (1000 + n) }
```

이 방법은 암시적으로 시퀀스를 생성하는 것을 방지하여 약간의 개선을 제공합니다 (예: 두 개의 공장이 각각 ID 1과 2를 제공하는 경우, 테스트가 해당 ID가 일치하는 것을 예상하지만, 그렇지 않습니다). 그러나 다른 테스트가 순서를 방해할 가능성을 배제하지는 않습니다.

장난감 예에서 다른 수정 방법은 하드코딩된 ID 대신에 user1.external_customer_id를 참조하는 것입니다.

```js
# IsAccountActive 서비스 호출을 Stub 처리
allow(IsAccountActive).to receive(:call).with(external_customer_id: user1.external_customer_id).and_return(true)
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

하지만 현실에서는 이러한 실패가 그리 명확하지 않을 수 있습니다. 성공을 위해 자신을 준비시키려면 다음 사항을 명심하세요: 만약 공장 속성의 값이 중요하다면, 그것이 중요하도록 만들어주세요 - 팩토리가 제공하는 값에 의지하는 대신에 테스트에서 명시적으로 값을 설정해주세요.
