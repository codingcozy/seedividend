---
title: "파이썬에서 Boolean 연산자, 정말 우리가 생각하는 것과 다를까"
description: ""
coverImage: "/assets/img/2024-06-22-BooleanOperatorsinPythonArentWhatYouThink_0.png"
date: 2024-06-22 02:00
ogImage: 
  url: /assets/img/2024-06-22-BooleanOperatorsinPythonArentWhatYouThink_0.png
tag: Tech
originalTitle: "Boolean Operators in Python Aren’t What You Think"
link: "https://medium.com/better-programming/boolean-operators-in-python-arent-what-you-think-df45a2be71f1"
isUpdated: true
---





![Boolean Operators in Python](/assets/img/2024-06-22-BooleanOperatorsinPythonArentWhatYouThink_0.png)

파이썬 프로그래머로서 나름 꽤 괜찮은 실력을 가지고 있다고 생각해요. 과거에 이 언어를 광범위하게 사용해 온 경험이 있고, 일반적으로 가장 편안하게 사용할 수 있는 언어라고 느껴지죠.

하지만 편안한 영역 안에서도 가끔씩 익숙하지 않은 "어?"란 순간을 만나곤 해요. 최근에 저도 이런 순간을 겪었는데, 그것은 어딜 봐도 상상할 수 없는 곳에서 일어난 거였어요: Boolean 연산자들입니다.

제가 보기에는 그 순간까지 True와 False, "abc"와 "", None 또는 0과 같은 표현식들이 모두 False로 평가될 것이라고 생각했어요. 왜냐하면 파이썬은 False, None, 빈 문자열, 모든 종류의 숫자 0, 그리고 다른 값들을 거짓 값으로 해석하기 때문이라고 생각했거든요.


<div class="content-ad"></div>

그래서 이게 왜 일어날 수 있는지 생각해봐도 되지 않을까요? 결국, 우리는 계속해서 if 문을 사용해온 만큼 그것들이 결코 실망시켜 준 적이 없습니다.

```js
if 1 and 0:
    print("이 문구는 절대 출력 안 됩니다...")
if 1 or 0:
    print("하지만 이건 볼 수 있을 겁니다!")
```

명백하죠, 1 and 0은 False에 해당하며 1 or 0은 True에 해당합니다, 맞나요?

하지만 여기서 한 가지 주목할 점이 있습니다: Python은 특정한 비-부울 값들(예: 1 또는 "")을 부울 문맥(즉, 부울 연산자와 함께 사용되었을 때)에서 True 또는 False로 해석하더라도 해당 문맥의 반환 값을 결정하는 데 아무 영향도 미치지 않습니다. 다시 말해, val = True and 1은 어떤 결과를 얻게 될까요?

<div class="content-ad"></div>

불리언 연산은 마지막으로 평가된 인수의 값을 반환한다는 것을 알게 되었습니다. and의 경우에는 non-true (또는의 경우에는 true) 값이 발견되자마자 표현식이 중단됩니다. 그렇지 않은 경우, 모든 인수의 참값을 확인해야 합니다.

따라서 위 표현식의 경우, 1이 마지막으로 평가된 인수이며, val은 결과적으로 1의 값을 받게 됩니다.

여기 몇 가지 더 예제가 있습니다:

```js
val = False and True # val = False
val = "abc" and "" # val = ""
val = "" or "abc" # val = "abc"
val = None or 0 # val = 0
```

<div class="content-ad"></div>

# 왜 이겢 유용한가요?

이를 알면 예를 들어 이러한 동작을 활용하여 대입 중에 간결한 null 확인을 수행할 수 있습니다.

대안은 명시적으로 person이 None인지 확인해야 합니다:

```js
age = person.age if person else None
```

<div class="content-ad"></div>

# Python에는 특이하지 않아요

사실, Python이 이와 같은 방식으로 동작하는 유일한 프로그래밍 언어는 아닙니다. 일부 Reddit 사용자들이 언급했듯이, 특히 JavaScript는 비슷하게 동작하며 선택적 체이닝 연산자 (?.)를 제공하여 한 단계 더 나아갑니다.

만약 우리의 Person 클래스를 JavaScript로 옮겼다고 가정하면, 이 연산자를 사용하여 다음과 같이 수행할 수 있습니다:

```js
person = new Person(18)
age = person?.age // age = 18
person = undefined
age = person?.age // age = undefined
name = person?.name ?? "John Doe" // name = "John Doe"
```

<div class="content-ad"></div>

또한, ??를 사용하여 후속 값들을 지정할 수 있습니다.

참고: 루트 개체(우리 예시에서는 person)가 None(Python)이나 undefined/null(JavaScript)이 될 수 있지만 반드시 선언되어 있어야 합니다.

# 결론

이 작은 정보가 유용했으면 좋겠습니다. 생각을 공유해 주시고 궁금한 점이 있으면 언제든지 물어보세요.

<div class="content-ad"></div>

# 자료

- 불리언 연산 | 파이썬 문서
- 단락 평가 | 위키백과
- 파이썬의 불리언 연산자는 불리언을 반환하지 않음 | 레딧
- 선택 연쇄 (?.) | MDN 웹 문서