---
title: "Dev Log  Unity GAS를 사용하여 더 많은 능력 구성하기"
description: ""
coverImage: "/assets/img/2024-05-15-DevLogComposingMoreAbilitiesUsingUnityGAS_0.png"
date: 2024-05-15 15:44
ogImage: 
  url: /assets/img/2024-05-15-DevLogComposingMoreAbilitiesUsingUnityGAS_0.png
tag: Tech
originalTitle: "Dev Log : Composing More Abilities Using Unity GAS"
link: "https://medium.com/@megastructurestudios/dev-log-composing-more-abilities-using-unity-gas-a8c680211194"
isUpdated: true
---




# 개요

이전의 개발일지에서 Unreal Gameplay Ability System의 매우 기본적인 개념적 개요, 사용 중이며 확장 중인 Unity GAS 구현의 구체적인 내용, 그리고 프레임워크 내에서 구성된 몇 가지 기본 능력 예제를 제공했습니다. 이 기사에서는 몇 가지 더 간단한 능력들을 논의하고 GAS 내에서 어떻게 구현했는지에 대해 알아보겠습니다.

# 요약

이전에 논의된 대로, 내가 작업 중인 첫 번째 플레이어 클래스는 스택 메커니즘을 기반으로 하고 있습니다. 플레이어가 적에게 특정 방식으로 영향을 미치면(기본 공격 데미지 또는 특정 능력 효과), 적에게 5초 동안 스택이 추가됩니다. 동일한 적에 4개의 스택이 누적되면 추가 데미지가 입히고 스택이 지워지며 몇 초 동안 Mark 상태 효과로 대체됩니다. 이 논리를 보여주는 GIF는 다음과 같습니다:



이 스태킹 메커니즘은 이 배 클래스의 기초가 되도록 의도되어 있어, 이 클래스의 대부분의 능력 효과는 적들에게 스택이 쌓인 상태에 의존하게 될 거에요. 예를 들어, 저번 데브로그에서 다룬 첫 번째 능동 능력은 스택이 적용된 적들 주변을 데미지를 입히고 기절시킵니다. 데미지와 기절 지속 시간은 주어진 적의 스택 수에 따라 증가합니다. 아래는 이 능력의 모습을 시각적으로 보여드린 그림입니다:

# 플레이어 능력 세트 완성하기

이 배의 처음 몇 가지 능력은 좋은 시작이지만, 분명 플레이어는 더 많은 옵션이 필요할 거에요. 저는 현재 GAS 구현에서의 작업 흐름을 개발하기 위해 몇 가지 추가 능력을 프로토타입으로 만들었어요. 일단, 플레이어는 잠정적으로 세 개의 능력 슬롯에 액세스할 수 있고, 이를 잠긴 능동 능력 집합에서 선택해 채울 수 있게 될 거에요. 앞서 언급한 능력을 포함하여 이러한 능력들이 있어요:

## 스택 기반 힐링



- 플레이어가 받는 데미지를 잠시 동안 줄이고 범위 내의 적의 패시브 스택을 소비하여 해당 스택이 소모된 만큼 플레이어를 치유함
- 지속력을 위해 사용하거나 갑작스러운 대미지 발생을 완화하는 데 사용될 수 있음

## 폭발성 발사체

- 접촉 시 추가로 데미지를 입히는 대형 직진 발사체로, 접촉 시 폭발하며 범위 내에서 추가로 데미지를 입힘
- 주로 대규모 피해를 입히려고 사용되며, 접촉과 폭발 데미지는 별개의 데미지 타입이므로 초기 발사체에 맞은 적은 사실상 추가 데미지와 함께 2개의 패시브 스택을 받음

## 충격 탑



- 매 초 틱을 하는 작은 물체를 소환하여 주변 적들을 간단히 중심으로 끌어안는다
- AoE 콤보나 철회를 위한 집합/CC 능력으로 사용할 수 있다

이전 로그를 읽어 보셨다면, 어떻게 이러한 능력들이 구현될 수 있는지 대략적인 개념을 이미 가지고 있을 것입니다. 현재의 GAS 워크플로우와 가까운 미래에 개선할 수 있는 통증점과 가능한 개선점을 이해하기 위해 조금 더 깊게 파고들어 보겠습니다.

# 스택 기반 치유 구현

가장 복잡한 것부터 시작해 보죠. 이 능력은 이전 기사에 구현된 스택 기반 스턴 능력과 유사하게 작동합니다. 그러나 능력이 활성화될 때 일부 추가 작업이 필요하다는 점에서 추가 복잡성이 조금 더 있습니다. 위의 설명을 다시 요약해보면, 이 능력은 "일부 초 동안 플레이어가 받는 피해를 줄이고 범위 내의 적들로부터 패시브 스택을 소비하여, 소비된 스택에 기반하여 플레이어를 회복하는" 기능을 합니다. 즉, 능력이 활성화될 때 다음을 해야 합니다:



- 플레이어 주변 범위 내의 모든 적 캐릭터를 대상으로 총 스택 인스턴스 수를 결정합니다.
- 잠정적으로 플레이어가 받는 피해를 줄입니다.
- 주변 적 캐릭터의 총 스택 수에 기반하여 플레이어를 회복합니다.
- 범위 내의 각 적 캐릭터에서 기존 스택(마크를 제외한)을 제거합니다. 능력은 영향을 받는 적 캐릭터로부터 스택을 소모하며, 스택을 소모하면 플레이어가 가할 수 있는 피해가 더 이상 줄어들어, 더 많은 스택이 적용될 때까지 플레이어가 언제 어떻게 사용할지 신중히 고려해야 합니다.

다행히도 이러한 기능 대부분을 꽤 기본적인 GameplayEffect로 수행할 수 있습니다. 능력의 각 측면을 따라 최상위에서부터 작업을 시작해봅시다.

다음은 검사 원격에 나타나는 능력 정의입니다:

![이미지](/assets/img/2024-05-15-DevLogComposingMoreAbilitiesUsingUnityGAS_0.png)



## 일정 기간 동안 플레이어의 받는 피해를 줄이기

이전에 피해 증감을 조정하기 위해 애트리뷰트를 추가했기 때문에 아주 간단합니다. 플레이어의 IncomingDamageScalar 애트리뷰트를 반으로 줄이는 GameplayEffect가 필요합니다. 이후 몇 초 동안 지속됩니다:

![이미지](/assets/img/2024-05-15-DevLogComposingMoreAbilitiesUsingUnityGAS_1.png)

## 주변 스택 수에 따라 플레이어 치료하기



이것은 가장 복잡한 측면입니다. 우리는 플레이어에 적용되는 GameplayEffect를 생성하여 각 영향을 받는 적마다 플레이어를 회복시킬 수 있습니다. 이 GameplayEffect는 현재 적의 스택 수에 기반하여 플레이어를 회복시키며, 각 적에 맞게 실행하므로 우리에게 원하는 효과를 제공합니다. 이 일을 처리하는 코드 조각은 다음과 같습니다:

```js
// apply per-enemy player gameplayEffects, e.g. healing (do this before applying enemy GEs, 
// since that will remove all stack instances which we need for healing calculations)
foreach (var ge in typedAbilityDefinition.perEnemyPlayerGameplayEffects) {
    // note: target is still the enemy because we want to get tags from them, not the player
    var geSpec = Owner.MakeOutgoingSpec(ge, source: Owner, target: hitAsc);
    Owner.ApplyGameplayEffectSpecToSelf(geSpec);
}
```

이 GameplayEffect는 지정된 적의 스택 수를 제공하기 위해 사용자 정의 TagCountBackedModifierMagnitude를 사용하며, 다음과 같이 구성됩니다 :

![이미지](/assets/img/2024-05-15-DevLogComposingMoreAbilitiesUsingUnityGAS_2.png)



게임플레이 효과 자체:

![게임플레이 효과 이미지](/assets/img/2024-05-15-DevLogComposingMoreAbilitiesUsingUnityGAS_3.png)

## 영향받는 적에서 기존 스택 제거하기

이것은 적용 시 모든 패시브 스택 태그 인스턴스를 제거하도록 구성된 간단한 게임플레이 효과를 통해 수행할 수 있습니다. 게임플레이 효과 구성은 다음과 같습니다:




![이미지](/assets/img/2024-05-15-DevLogComposingMoreAbilitiesUsingUnityGAS_4.png)

그리고 GE를 적용하는 능력 정의의 작은 부분은 이렇게 생겼어요:

```js
// apply enemy gameplayEffects
foreach (var gameplayEffect in typedAbilityDefinition.enemyGameplayEffects) {
    var geSpec = Owner.MakeOutgoingSpec(gameplayEffect, Owner, hitAsc);
    hitAsc.ApplyGameplayEffectSpecToSelf(geSpec);
}
```

여기서 설명할 내용은 대략 이 정도네요! 다음 능력으로 넘어가겠습니다.
  




# 폭발성 발사체 구현

이 능력은 BaseProjectileAbilityScriptableObject의 인스턴스로, ASC 호스트의 WeaponSystem 구성 요소를 참조하여 WeaponConfiguration을 로드하고 무기를 발사합니다. WeaponConfiguration은 다음과 같습니다:

```js
public class BaseWeaponConfiguration : ScriptableObject {
    
    // 이 무기의 발사체가 어떻게 발사될 것인가? (숫자, 분산, 각도 등)
    public ShootConfiguration shootConfiguration;
    
    // 이 무기가 발사하는 발사체는 무엇인가? (프리팹, 이동 및 충돌 동작 등)
    public ProjectileConfiguration projectileConfiguration;
    
    [SerializeField]
    private List<GameplayEffectScriptableObject> onHitGameplayEffects;
    
    [SerializeField]
    private List<GameplayTagScriptableObject> fireWeaponGameplayCues;
}
```

실제 능력 구현의 관련 부분은 여기에 있습니다:



```js
protected override IEnumerator ActivateAbility() {
    ... // 쿨다운 적용 같은 보일러플레이트 작업
    
    // 능력 구성에서 GameplayEffects를 프로젝타일 구성으로 복사
    weaponConfiguration.OnHitGameplayEffects = projectileGameplayEffects;
    
    // 계산된 조준 각도로 WeaponSystem 호출
    weaponSystem.TryFireWeapon(aimAngle, weaponConfiguration);
    
    EndAbility();
    yield return null;
}
```

그거면 GAS 관련 내용이 거의 다에요! WeaponSystem 구성요소는 프로젝타일을 생성하고 설정하며, 실제 프로젝타일 프리팹은 모든 이동 및 충돌 로직을 처리하여 관심사를 명확히 구분하고 코드를 정리합니다. 만약, 프로젝타일이 어떤 것과 충돌할 때 어떤 로직을 수행해야 하는 더 복잡한 능력을 구현하고 싶다면, 충돌 게임 플레이 이벤트를 기다리고 그 후 작업을 수행하려면 AbilityTask를 시작할 수 있습니다. 아직 도달하지 못했지만, 미래 로그에서 AbilityTasks의 구현을 다루겠습니다.

# 탄도 탑 구현

이 능력은 주위의 RigidBody에 힘을 적용하는 개체를 생성하며, 사실상 위에서 설명한 폭발성 프로젝타일 능력과 동일한 방식으로 구현됩니다: 프리팹을 소환하기 위해 WeaponSystem을 호출합니다. 앞에서 언급한 폭발성 프로젝타일 능력과 마찬가지로, 탄도 탑 능력 정의는 매우 가볍습니다. 능력 기능의 대부분은 생성된 탑 GameObject에 있습니다. 특히, ImpulseSourceComponent가 틱할 때 힘의 강도, 작용 범위 반경을 결정합니다. 다음이 에디터에서 이 구성 요소가 어떻게 보이는지에 대한 예시입니다:




![2024-05-15-DevLogComposingMoreAbilitiesUsingUnityGAS_5](/assets/img/2024-05-15-DevLogComposingMoreAbilitiesUsingUnityGAS_5.png)

The actual logic is also very straightforward:

- when the Ability spawns the pylon prefab, it sets its parameters such as radius, impulse strength, tick rate, and time to live
- the ImpulseSourceComponent `Update()` determines when to tick the pylon
- when it’s time to tick, we simply identify `RigidBody2D` instances within the pylon’s radius and apply an impulse force to them in the direction of the center of the pylon

As can be seen from the screenshot above, I’ve also added fields to allow the component to pull period and force values from the owner’s attribute system. This easily facilitates upgrades that modify the parameters of this ability — for example, one upgrade may reduce the period (thereby increasing the impulse’s trigger frequency) while also reducing the force, altering the overall function of the ability.




# 결론

지금 이 시점에서, 개념적 프레임워크로서의 GAS의 힘은 더욱 분명해지고, 이미 한 번에 처리한 보일러플레이트 작업의 가치를 볼 수 있게 됩니다. 우리는 여러 가지 다양한 능력의 구현을 더욱 탐구했으며, 시스템을 추가로 세부적으로 확장하고 개선할 수 있는 더 많은 방법들이 존재합니다. 다음 로그에서는 이러한 개선사항 중 일부에 대해 깊이 파헤치겠습니다. 예를 들어:

- AbilityTasks는 여러 프레임에 걸쳐 동작하는 능력을 가능하게 하며, 능력이 이벤트에 반응할 수 있는 콜백 스타일 메커니즘을 제공합니다. 예를 들어, 우리가 플레이어를 치유하는 업그레이드를 원할 때, 주변의 가시적 마법진이 사라질 때 플레이어를 치유하는 능력이있다면, 해당 마법진 GameObject가 비활성화되고 풀로 반환될 때 일부 로직을 트리거하는 AbilityTask를 생성할 수 있습니다.
- GameplayCues는 GameplayEffects 및 Abilities가 단순히 구성에 특정 GameplayTags를 포함시킴으로써 애니메이션, 사운드 또는 입자 효과를 재생할 수 있는 기능을 제공합니다.

읽어 주셔서 감사합니다. 다음에 만나요!