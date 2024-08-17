---
title: "초보개발자가 알아둬야할 7가지 파이썬 함수 기능"
description: ""
coverImage: "/assets/img/2024-08-13-7PythonFunctionThingsIRegretNotKnowingEarlier_0.png"
date: 2024-08-13 12:03
ogImage: 
  url: /assets/img/2024-08-13-7PythonFunctionThingsIRegretNotKnowingEarlier_0.png
tag: Tech
originalTitle: "7 Python Function Things I Regret Not Knowing Earlier"
link: "https://medium.com/gitconnected/7-python-function-things-i-regret-not-knowing-earlier-989b6a89d802"
isUpdated: true
updatedAt: 1723863974035
---



![image](/assets/img/2024-08-13-7PythonFunctionThingsIRegretNotKnowingEarlier_0.png)

## 1) 함수에서의 타입 힌트

나는 처음에 타입 힌트를 전혀 사용하지 않고 Python을 배웠다. 그래서 Python을 몇 년 동안 쓰면서 전혀 타입 힌트를 쓰지 않았다.

간단한 예로, 두 정수의 평균을 찾는 함수를 작성하고 싶다면, 나는 어떻게 함수를 작성했는지 보여주겠습니다:


<div class="content-ad"></div>


<img src="/assets/img/2024-08-13-7PythonFunctionThingsIRegretNotKnowingEarlier_1.png" />

현재 회사에서 함수를 작성하는 방법 (유형 힌트 및 설명 추가):

<img src="/assets/img/2024-08-13-7PythonFunctionThingsIRegretNotKnowingEarlier_2.png" />

- a: int는 ideally 정수 여야합니다.
- b: int는 ideally 정수 여야합니다.
- -: float는 함수가 ideal적으로 float 값 반환해야합니다.


<div class="content-ad"></div>

그러나, 타입 힌트는 힌트를 주지만 강제하지는 않는다는 것을 주의해 주세요. 일반 문자열이나 다른 데이터 유형을 a와 b에 전달하면 Python이 실제로 괜찮습니다 (문자열을 2로 나누려고 할 때 오류가 발생할 때까지).

타입 힌트의 목적은 주로 1) 코드를 사람이 읽기 쉽게 만드는 것과 2) IDE(예: PyCharm 또는 VSCode)가 체크를 수행할 수 있도록 하는 것입니다.

가능한 한 함수에 타입 힌트를 추가하여 다른 프로그래머(또는 미래의 본인조차)이 함수를 이해하는 데 수월하게 할 수 있도록 노력해 보세요.

# 2) 기본 인수

<div class="content-ad"></div>

![이미지](/assets/img/2024-08-13-7PythonFunctionThingsIRegretNotKnowingEarlier_3.png)

위의 함수에서 greeting='hi'는 기본 인자입니다.

- greeting에 아무것도 전달하지 않기로 결정하면 자동으로 'hi'로 할당됩니다.
- greeting에 무언가를 전달하기로 결정하면 해당 값을 취합니다.

![이미지](/assets/img/2024-08-13-7PythonFunctionThingsIRegretNotKnowingEarlier_4.png)

<div class="content-ad"></div>

`greet('tom')` 함수에는 인사말을 전달하지 않습니다. 이는 기본값인 'hi'가 사용됨을 의미합니다.

`greet('tom', greeting='hello')` 함수에는 'hello'라는 값이 인사말로 전달됩니다. 이는 기본 매개변수를 덮어쓰고 `greeting='hello'`로 대체하는 것을 의미합니다.

함수 내에 매개변수가 많을 때 모든 매개변수를 매번 호출할 필요 없이 이러한 방법을 사용할 수 있습니다.
    
# 3) Arguments VS Parameters

<div class="content-ad"></div>

파이썬을 처음 배우는 몇 년 동안, 저도 그 둘이 같은 의미를 가리킨다고 생각했어요.

하지만 정말로 그렇진 않아요. 아주 미세한 차이가 있죠.

간단한 두 수의 평균을 반환하는 함수가 있다고 가정해봅시다.

![image](/assets/img/2024-08-13-7PythonFunctionThingsIRegretNotKnowingEarlier_5.png)

<div class="content-ad"></div>

파라미터란 함수를 정의할 때 대괄호 안에 작성된 변수입니다. 여기서 a와 b는 파라미터입니다.

![Parameter](/assets/img/2024-08-13-7PythonFunctionThingsIRegretNotKnowingEarlier_6.png)

인수는 함수를 호출할 때 실제로 전달하는 값을 의미합니다. 여기서 avg(a, b) 함수를 호출할 때 3과 5가 인수입니다.

# 4) 위치 인수 vs 키워드 인수

<div class="content-ad"></div>

간단한 예제를 보여주기 위한 함수입니다.

![그림 1](/assets/img/2024-08-13-7PythonFunctionThingsIRegretNotKnowingEarlier_7.png)

이 함수를 호출할 때 몇 가지 위치 인수를 전달해 보겠습니다.

![그림 2](/assets/img/2024-08-13-7PythonFunctionThingsIRegretNotKnowingEarlier_8.png)

<div class="content-ad"></div>

위에서 4와 7은 위치 인수입니다. 위치 인수는 순서대로 있어야 합니다. 4는 a로 전달되고, 7은 b로 전달됩니다.

다음으로, 몇 가지 키워드 인수를 전달하여 함수를 호출해 봅시다.

![image](/assets/img/2024-08-13-7PythonFunctionThingsIRegretNotKnowingEarlier_9.png)

위에서 b=5와 a=8은 키워드 인수입니다. 키워드 인수는 순서대로 있을 필요가 없지만 key=value 형식을 사용하여 전달해야 합니다.

<div class="content-ad"></div>

# 5) 임의 위치 인수 (*args)

함수의 임의 위치 인수인 *args는 함수가 임의 개수의 위치 인수를 받을 수 있게 합니다.

![image](/assets/img/2024-08-13-7PythonFunctionThingsIRegretNotKnowingEarlier_10.png)

^ 여기서 test 함수는 *args를 사용하여 임의 개수의 위치 인수를 받을 수 있으며, 이 인수들은 args라는 튜플에 담기게 됩니다.

<div class="content-ad"></div>

일반 매개변수와도 결합할 수 있어요 (*args는 뒷부분에 있어야 해요)

![image](/assets/img/2024-08-13-7PythonFunctionThingsIRegretNotKnowingEarlier_11.png)

추가 정보 — *args의 이름은 정해져 있지 않아요. *를 앞에 붙이기만 하면 원하는 대로 지을 수 있어요.

# 6) 임의의 키워드 인수 (**kwargs)

<div class="content-ad"></div>

임의의 키워드 인수 또는 **kwargs로 알려진 것은 함수가 여러 개의 키워드 인수를 받을 수 있게 합니다.

![이미지](/assets/img/2024-08-13-7PythonFunctionThingsIRegretNotKnowingEarlier_12.png)

여기에서 test 함수는 **kwargs를 받아들이는데, 이를 통해 test가 여러 개의 키워드 인수를 받아들인 다음 kwargs라는 딕셔너리에 담을 수 있습니다.

우리는 또한 이것을 일반적인 매개변수와 결합할 수도 있습니다 (**kwargs는 뒤에 와야 합니다)

<div class="content-ad"></div>


![image](/assets/img/2024-08-13-7PythonFunctionThingsIRegretNotKnowingEarlier_13.png)

Additional note — we don’t have to name it kwargs if we don’t want to. We can name it whatever we want as long as it has ** in front of it.

# Quick Pause

I recently wrote a book — 101 Things I Never Knew About Python


<div class="content-ad"></div>

작가로서 제를 지원하고 싶다면 여기를 확인해보세요!

링크: [여기](https://payhip.com/b/vywcf)

# 7) * 와 **를 사용하여 리스트/사전을 함수에 전달하기

다음은 간단한 함수로, 인자를 그대로 출력하는 기능을 가지고 있습니다.

<div class="content-ad"></div>


<img src="/assets/img/2024-08-13-7PythonFunctionThingsIRegretNotKnowingEarlier_14.png" />

이 함수를 호출할 때 일반적인 방법인 hi(1, 2) 대신에:

1) *를 사용하여 위치 인수를 포함하는 리스트를 전달할 수 있습니다

<img src="/assets/img/2024-08-13-7PythonFunctionThingsIRegretNotKnowingEarlier_15.png" />


<div class="content-ad"></div>

위에서 nums 앞의 *는 해당 내용을 함수 호출로 위치 매개변수로 언팩합니다. 이는 hi(100, 200)과 동일합니다.

2) 키워드 인수를 포함하는 딕셔너리를 전달하려면 **를 사용하세요.

![image](/assets/img/2024-08-13-7PythonFunctionThingsIRegretNotKnowingEarlier_16.png)

위에서 d 앞의 **는 해당 키-값 쌍을 함수 호출로 키워드 인수로 언팩합니다. 이는 hi(a=100, b=100)과 동일합니다.

<div class="content-ad"></div>

# 자세한 내용은 내 서브스택에

16개의 파이썬 함수. 내가 더 빨리 알았으면 하는 것들:

# 만약 제가 창작자로서 지원을 원한다면

- 제 서브스택 뉴스레터에 가입하세요: https://zlliu.substack.com/ — 나는 매주 파이썬과 관련된 이메일을 보냅니다.
- 제 책을 구입하세요: https://payhip.com/b/vywcf — 파이썬에 대해 알지 못했던 101가지
- 이 이야기에 50번 박수를 보내세요
- 여러분의 생각을 말해 주는 댓글을 남겨주세요
- 이 이야기의 가장 좋아하는 부분을 강조해주세요

<div class="content-ad"></div>

감사합니다! 이런 작은 조치들이 큰 도움이 되고 정말 감사합니다!

YouTube: [https://www.youtube.com/@zlliu246](https://www.youtube.com/@zlliu246)

LinkedIn: [https://www.linkedin.com/in/zlliu/](https://www.linkedin.com/in/zlliu/)