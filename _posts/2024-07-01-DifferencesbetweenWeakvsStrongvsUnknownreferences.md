---
title: "약한 참조 vs 강한 참조 vs 알 수 없는 참조 차이점 비교"
description: ""
coverImage: "/assets/img/2024-07-01-DifferencesbetweenWeakvsStrongvsUnknownreferences_0.png"
date: 2024-07-01 17:04
ogImage:
  url: /assets/img/2024-07-01-DifferencesbetweenWeakvsStrongvsUnknownreferences_0.png
tag: Tech
originalTitle: "Differences between Weak vs Strong vs Unknown references"
link: "https://medium.com/@dyaremyshyn/differences-between-weak-vs-strong-vs-unknown-references-ee5dd822a2ed"
isUpdated: true
---

<img src="/assets/img/2024-07-01-DifferencesbetweenWeakvsStrongvsUnknownreferences_0.png" />

Swift에서 객체에 대한 참조는 3가지 유형의 참조(weak, strong, unowned)를 사용하여 관리할 수 있습니다. 각각은 다른 목적으로 사용되며 메모리를 관리하여 순환 참조와 같은 문제를 예방하는 데 도움이 됩니다. 각 유형의 내용은 다음과 같습니다:

## Weak References

- 소유권 없음: 약한 참조는 참조하는 객체에 강력한 소유권을 유지하지 않습니다.
- 옵셔널: 약한 참조는 항상 옵셔널(weak var)입니다. 즉, nil이 될 수 있습니다.
- 순환 참조 없음: 약한 참조 사용은 객체의 참조 횟수가 증가되지 않도록하여 강한 참조 순환을 방지하는 데 도움이 됩니다.
- 자동 Nil 할당: 약한 참조가 가리키는 객체가 해제되면, 약한 참조는 자동으로 nil로 설정됩니다.
- 사용 방법: 약한 참조를 사용하여 강한 참조 순환을 피하십시오. 일반적으로 부모-자식 관계에서 부모가 살아 있어야 하는 경우에는 자식은 부모를 유지하지 않아야 합니다.

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

## 강력한 참조

- 기본 참조 유형: Swift에서 참조는 기본적으로 강력합니다.
- 소유권: 강력한 참조는 해당 객체의 소유자로 계산됩니다.
- 메모리 관리: 객체에 대한 적어도 하나의 강력한 참조가 있는 한, 해당 객체는 해제되지 않습니다. 새로운 강력한 참조가 생성될 때 객체의 참조 횟수가 증가하고, 강력한 참조가 제거될 때는 감소합니다.
- 사용: 객체의 소유권을 유지하고 싶을 때 강력한 참조를 사용하세요.

## 무소유 참조

- 소유권 없음: 약한 참조와 유사하게, 무소유 참조는 해당 객체에 강한 보유를 유지하지 않습니다.
- 옵셔널이 아님: 약한 참조와 달리, 무소유 참조는 옵셔널이 아니며, 액세스되는 한 항상 값을 가질 것으로 예상됩니다.
- 자동적으로 nil 할당하지 않음: 무소유 참조는 참조하는 객체가 해제될 때 자동으로 nil이 되지 않습니다. 객체가 해제된 후에 액세스하면 런타임 충돌이 발생합니다.
- 사용: 참조하는 객체가 무소유 참조가 사용 중인 한 해제되지 않을 것이 확실한 경우에 사용하며, 일반적으로 참조하는 객체가 더 긴 수명주기를 가지는 경우에 사용합니다.

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

## ARC(자동 참조 계산)는 클래스 인스턴스의 메모리 관리에 어떤 영향을 미치나요?

ARC(자동 참조 계산)는 컴파일 시간 기능으로, 코드 내 객체에 대한 참조 횟수를 추적하고 컴파일 시간에 자동으로 메모리 관리 호출을 삽입합니다.
ARC의 주요 장점 중 하나는 반복 순환(메모리 누수로 알려진)을 방지할 수 있는 능력입니다. 두 개 이상의 객체가 서로 강력한 참조를 유지하고 있어서 삭제되지 못하는 반복 순환 문제가 발생하는데, ARC는 약한 참조를 사용하여 이러한 반복 순환을 해결하는 데 도움을 줍니다.
ARC는 컴파일 시간에 정의된 객체의 범위에 따라 retain, release, autorelease 호출을 삽입합니다. 이를 통해 런타임에서 메모리 관리 오버헤드가 최소화됩니다.

## 자동 참조 계산이 어떻게 작동하나요?

새로운 클래스 인스턴스를 만들 때마다, ARC는 해당 인스턴스에 대한 데이터를 저장할 메모리를 할당합니다. 필요 없어지면 해당 인스턴스에 사용된 메모리를 해제하여 메모리를 다른 목적으로 사용할 수 있게 합니다. 클래스의 각 인스턴스에는 참조 횟수라는 속성이 있으므로, 참조 횟수가 0보다 크다면 인스턴스는 여전히 메모리에 유지되고, 그렇지 않으면 메모리에서 제거됩니다.

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

# 결론

요약하면, 객체 참조를 관리하는 것은 효율적인 메모리 관리를 위해 중요하며, 메모리 누수와 예기치 않은 충돌을 방지하는 데 결정적입니다. 강한, 약한 및 미소유 참조 사이의 미묘한 차이를 이해하면, 개발자는 객체 관계를 적절히 처리하고 효율적이고 안정적인 코드를 유지할 수 있습니다.

강한 참조는 기본 설정이며, 객체를 소유하여 필요한만큼 메모리에 유지합니다. 그러나 과용 또는 잘못된 사용은 특히 부모-자식 계층 구조 내의 객체 간과 같이 복잡한 관계에서 메모리 누수를 일으킬 수 있는 잠재적인 Cycle을 초래할 수 있습니다.

약한 참조는 특히 한 객체가 다른 객체의 할당 해제를 막아서는 안 되는 경우에 메모리 누수를 방지하기 위한 중요한 도구입니다. 참조 대상 객체가 할당 해제되면 자동으로 nil로 설정되므로 약한 참조를 통해 메모리 누출을 피하고 깨끗한 객체 라이프사이클을 유지할 수 있습니다.

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

소유권이 유지되지 않지만 참조가 사용 중 일 때 항상 유효하다고 예상되는 중간 지점을 제공하는 미소유 참조(unowned references)가 있습니다. 이러한 미소유 참조는 참조된 객체가 미소유 참조가 스코프 내에 있는 한 살아 있음을 보장하는 명확하고 장기적인 소유권 관계가 있는 경우 특히 유용합니다. 그러나 개발자는 조심해야 합니다. 미소유 참조가 할당 해제된 객체에 액세스하면 실행 중에 충돌이 발생할 수 있습니다.

이러한 참조 유형을 숙달하면 견고하고 효율적인 Swift 애플리케이션을 설계하는 능력이 향상됩니다. 특정 사용 사례에 따라 강한 참조(strong), 약한 참조(weak) 및 미소유 참조 중에서 신중하게 선택함으로써 적절한 메모리 관리를 보장하고 일반적인 함정을 피하며 안정적이고 고성능 소프트웨어를 구축할 수 있습니다.

여기까지입니다! 기본 사항을 설명했습니다. 입문자들이 이해하기 쉽도록 최대한 간단하게 유지하려고 노력했습니다. 요점을 이해했으면 좋겠습니다. 추가 질문이 있으시면 아래에 댓글을 달아주시면 도와드리겠습니다.
