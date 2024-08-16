---
title: "Autowired 대신 필드에 Bean을 주입하는 다른 방법 알아보기"
description: ""
coverImage: "/assets/img/2024-07-13-SwitchtoAnotherWaytoInjectYourBeanInsteadofAutowiredonYourFields_0.png"
date: 2024-07-13 20:43
ogImage: 
  url: /assets/img/2024-07-13-SwitchtoAnotherWaytoInjectYourBeanInsteadofAutowiredonYourFields_0.png
tag: Tech
originalTitle: "Switch to Another Way to Inject Your Bean Instead of @Autowired on Your Fields"
link: "https://medium.com/stackademic/switch-to-another-way-to-inject-your-bean-instead-of-autowired-on-your-fields-a399bd9ca3ed"
isUpdated: true
---





![이미지](/assets/img/2024-07-13-SwitchtoAnotherWaytoInjectYourBeanInsteadofAutowiredonYourFields_0.png)

Spring은 @Autowired 필드/속성으로 빈을 주입하는 것을 공식적으로 권장하지 않으며, 일부 대규모 기업들은 새 프로젝트에서 명시적으로 금지하고 있습니다.

최근에 우리 회사는 스프링 프레임워크 3.0에서 5.0으로 프레임워크를 업그레이드했는데, 코드를 작성하던 중 갑자기 @Autowired 주석에 대한 경고 메시지가 나타났습니다. 다음과 같이 속성 주입에 대한 경고 메시지가 표시되었는데, 결국 많은 해를 이 방식으로 써 왔기 때문에 혼란스러웠습니다.

```js
필드 주입은 권장되지 않습니다
```

<div class="content-ad"></div>

해당 문서를 확인해보니, 이 팁은 스프링 프레임워크 4.0에서 처음 등장했다는 것을 알았어요.

대신에 생성자 주입과 세터 주입을 권장합니다.

의존성을 주입하는데 사용하는 3가지 방법에 대해 이야기해볼게요. 세 번째 방법이 가장 편리한 것 같아요.

## 1. 생성자를 활용한 의존성 주입

<div class="content-ad"></div>

클래스 생성자는 @Autowired로 표시되며 주입할 객체와 관련된 여러 매개변수를 포함합니다.

```js
@Service
public class ConstructorBasedInjection {
    
    private final InjectedBean injectedBean;
    
    @Autowired    
    public ConstructorBasedInjection(InjectedBean injectedBean) {        
        this.injectedBean = injectedBean;    
    }
}
```

하지만 실제로 스프링 문서에서는 @Autowired 주석을 생략할 수도 있습니다.

## 2. Setter를 이용한 의존성 주입

<div class="content-ad"></div>

Setter 메서드는 @Autowired로 표시되며, 빈이 인스턴스화된 후에 Spring 컨테이너에 의해 호출됩니다. 빈에 의존성을 주입하기 위해 인수 없는 생성자나 인수 없는 정적 팩토리 메서드를 사용하여 인스턴스화된 후에 호출됩니다.

```java
@Service
public class SetterBasedInjection {

    private InjectedBean injectedBean;

    @Autowired
    public void setInjectedBean(InjectedBean injectedBean) {
        this.injectedBean = injectedBean;
    }
}
```

생성자를 기반으로 하는 의존성 주입과 마찬가지로, 공식 문서에서는 Setter를 기반으로 하는 의존성 주입에서 @Autowired를 생략할 수 있습니다.

<div class="content-ad"></div>

라이브러리 'Lombok'의 도움으로 구현이 쉬워지는 것 같아요. 

```java
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class LombokBasedInjection {
    
    InjectedBean injectedBean;

}
```

직접 생성자를 작성하는 대신 아래와 같은 주석을 사용합니다:

```java
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
```

<div class="content-ad"></div>

이것은 나를 위한 생성자를 만들고 속성을 private 및 final로 만드는 것을 의미합니다. .class 파일을 보겠습니다:

```js
@Service
public class LombokBasedInjection {
    
    private final InjectedBean injectedBean;

    @Generated  
    public LombokBasedInjection(final InjectedBean injectedBean) {        
        this.injectedBean = injectedBean;    
    }
}
```

이것은 생성자를 기반으로 한 의존성 주입과 매우 유사합니다, 맞죠?

이제 @Autowired 주석을 속성 주입을 위해 대체하는 방법을 알게 되었습니다.

<div class="content-ad"></div>

필드 기반 주입이 권장되지 않는 이유에 대해 이야기해 봅시다.

가장 중요한 이유는 필드 기반 의존성 주입이 final/불변으로 선언된 필드에서 작동하지 않기 때문입니다. 이러한 필드는 클래스가 초기화될 때 인스턴스화되어야 하기 때문에 불변 필드를 선언하는 유일한 방법은 생성자 기반 의존성 주입을 사용하는 것입니다.

또한 유닛 테스트 작성이 쉽지 않다는 점도 있죠.

일상적인 개발에서 필드 기반 주입을 권장하지 않는 이유에 대해 논의하고 싶으시다면 자유롭게 댓글로 이야기해 주세요.

<div class="content-ad"></div>

감사합니다.

# Stackademic 🎓

끝까지 읽어주셔서 감사합니다. 떠나시기 전에:

- 작가를 클랩하고 팔로우해주시면 감사하겠습니다! 👏
- 팔로우하기: X | LinkedIn | YouTube | Discord
- 다른 플랫폼 방문하기: In Plain English | CoFeed | Venture | Cubed
- Stackademic.com에서 더 많은 콘텐츠 확인하기