---
title: "레귤러 함수에서 컴포저블을 호출하는 것이 불가능한 이유"
description: ""
coverImage: "/assets/img/2024-05-15-WhyCallingaComposablefromaRegularFunctionIsntPossible_0.png"
date: 2024-05-15 03:46
ogImage: 
  url: /assets/img/2024-05-15-WhyCallingaComposablefromaRegularFunctionIsntPossible_0.png
tag: Tech
originalTitle: "Why Calling a Composable from a Regular Function Isn’t Possible"
link: "https://medium.com/proandroiddev/why-calling-a-composable-from-a-regular-function-isnt-possible-b9d8f77b6658"
---


이것은 컴파일러입니다!

![image](/assets/img/2024-05-15-WhyCallingaComposablefromaRegularFunctionIsntPossible_0.png)

이 기본 질문에 대한 답변을 제공하려면 구성 가능한 함수의 작동 방식을 깊이 이해해야 합니다.

함수를 @Composable로 표시하면 노드를 추가할 수 있는 슈퍼파워를 가지게 됩니다. 이를 간단히 설명하자면, Compose UI 트리에 노드를 추가할 수 있게 되는 것입니다. 어떻게 노드가 되는지 이해하기 위해 기본적인 컴포저블을 작성해 봅시다.




```js
@Composable
fun IAmAComposable(){
  Text("저는 콤포저블 함수입니다. 왜 함수냐면, 콤포즈는 즐겁거든!! 음, 즐겁지요")
}
```

우리가 정의한 콤포저블은 조합되면 반환할 것이 없지만, 만약 그렇지 않다면 UI는 어떻게 렌더링 될까요? 텍스트 콤포저블이 그 역할을 하고 있나요? 음, 아마요.

조합이 일어날 때 콤포저블 트리 내에 노드가 생성되며, 모든 구현은 콤포저블 내부에 있습니다. 이 트리를 탐색하여 UI를 렌더링합니다. 이는 UI에만 국한되지 않고, 콤포즈 런타임 및 컴파일러를 사용하여 어떠한 종류의 트리 구조에 대해서도 효율적으로 탐색할 수 있습니다. 자세한 내용은 여기를 확인하세요.

하지만 여러분이 여기로 왔는데도 계속 궁금한 점은, 왜 일반 함수에서 콤포저블을 호출할 수 없는 걸까요. 그래서 이에 대한 답변을 해볼게요.





Andoroid 개발에서 fragment, activity 및 application context와 같은 다양한 종류의 context는 애플리케이션 내에서 리소스의 라이프사이클과 범위를 관리하는 데 중요한 역할을 합니다.

각 context는 fragment나 activity와 같은 특정 구성요소의 라이프사이클과 관련이 있습니다. 이러한 context를 사용함으로써 서비스 및 리소스에 적절한 범위 내에서 액세스 및 관리되도록 보장할 수 있어서 애플리케이션의 전반적인 효율성과 신뢰성을 향상시킬 수 있습니다.

비슷하게, 컴파일 후 각 콤포저블 함수는 "콤포저(Composer)"라는 추가 매개변수를 받습니다. 이 매개변수는 compose 컴파일러를 사용하여 주입됩니다.

```js
@Composable
fun IAmAComposable($composer: $Composer<*>){ 
$composer.start(\\unique_key_here)
    IAmComposablesChild($composer)
Text("I am a Composable fun, why fun? because compose is fun!! hmm fun ok", $composer)
$composer.end()
}

@Composable
fun IAmComposablesChild($composer: Composer<*>){
}
```



$composer은 그런 다컬저들에게 전달됩니다. 그때 이 composer은 유일한 키를 받는데요, 이 키는 다시 어떤 컴포저에 속한 노드인지 식별하는 데 사용됩니다. 이는 필수이며 트리 안의 각 노드에서 사용 가능해야 합니다. 위의 설명된 컴포저론, 부모 컴포저부터 트리의 마지막 컴포저까지 같은 composer 인스턴스가 사용될 것입니다.

활동이 여러 프래그먼트를 가질 때와 같이, 모든 프래그먼트들의 활동 컨텍스트가 동일하게 됩니다.

따라서 Composable 함수는 일반 함수에서 호출될 수 없습니다. 각 컴포저는 컴포저 형태의 상위 컨텍스트가 필요하기 때문에, 그 상위 컨텍스트가 없으면 구성이 되지 않습니다. 구성이란 무엇일까요? 그것은 컴포즈 트리를 탐색하고 (필요하다면) 각 노드를 화면에 렌더링하는 것이죠. 부모 노드가 없다면 렌더링할 수 없습니다.

이 composer는 Compose 런타임에 의해 효율적으로 Compose UI 트리를 탐색하는 데 사용됩니다.



이것은 상당히 간단한 예제와 설명입니다.하지만 이 모든 것을 자세히 배울 수 있습니다. 아래의 참고 자료들을 통해! 

즐거운 학습 되세요! ❤️