---
title: "Python 내장 함수 sum의 강력함 이해하기"
description: ""
coverImage: "/assets/img/2024-07-13-UnderstandthePowerofPythonsBuilt-insum_0.png"
date: 2024-07-13 21:04
ogImage: 
  url: /assets/img/2024-07-13-UnderstandthePowerofPythonsBuilt-insum_0.png
tag: Tech
originalTitle: "Understand the Power of Python’s Built-in sum()"
link: "https://medium.com/python-in-plain-english/understand-the-power-of-pythons-built-in-sum-5ddc48dd54b0"
---


파이썬 내부를 깊게 파헤쳐 sum() 함수가 어떻게 구현되었는지 알아보세요.

![이미지](/assets/img/2024-07-13-UnderstandthePowerofPythonsBuilt-insum_0.png)

만약 파이썬 개발자라면, 언젠가는 내장 함수인 sum()을 만나게 될 것입니다. 그 사용법은 매우 명확합니다: 이터러블(리스트, range 등)과 선택적인 시작 숫자를 입력으로 받아 요소들의 합과 시작 숫자를 더한 값을 반환합니다.

```python
elements = [1, 2, 3]
total = sum(elements)
print(total) # 6
```

<div class="content-ad"></div>

하지만, 왜 sum() 함수를 구현해야 할까요? 다른 프로그래밍 언어에는 내장 sum() 함수가 없으므로 Python에 있어야 할 이유가 무엇일까요? 아래와 같이 for 루프를 사용하여 등가 코드를 쉽게 작성할 수 있습니다:

```js
elements = [1, 2, 3]
total = 0
for element in elements:
    total += element

print(total) # 6
```

그래서, 왜 첫째 자리에 sum() 함수를 구현해야 할까요?

이 글에서는 CPython 소스 코드를 직접 살펴보면서 sum() 함수가 왜 중요한지 알아보겠습니다.

<div class="content-ad"></div>

## 편의 이상의 가치

내장 sum() 함수를 구현하는 이유 중 하나는 편의성일 수 있습니다. 카운터와 함께 for 루프 대신 단일 함수 호출을 작성하는 것은 훨씬 빠르고 간결합니다. 그러나 여기에는 더 많은 부분이 있습니다.

Python에서 클래스의 특정 기능을 구현하기 위해 magic dunder 메서드라고 불리는 메서드를 정의할 수 있습니다. 예를 들어 클래스에 __iter__()를 정의하면 sum() 함수가 그 메서드를 사용하여 클래스 인스턴스를 iterable로 처리합니다.

```python
class MyContainer:

    def __init__(self) -> None:
        self._data = [1, 2, 3, 4, 5]

    def __iter__(self):
        return iter(self._data)

my_container = MyContainer()
total = sum(my_container)
print(total)  # 15
```

<div class="content-ad"></div>

이 기능은 매번 클래스별 for 루프를 작성하는 것보다 모듈화되고 간결한 코드 패턴을 구현하는 데 사용할 수 있습니다. 하지만 더욱 두드러진 차이가 있습니다.

이제 sum() 함수의 성능을 for 루프와 비교해 보겠습니다. 아래 코드 스니펫은 두 가지 방법의 공정한 벤치마크를 수행하고 각각이 실행하는 데 얼마나 오래 걸렸는지 보여줍니다:

```js
import timeit
import numpy as np

# 테스트 함수 설정

def sum_builtin(elements):
    return sum(elements)

def sum_pure(elements):
    total = 0
    for element in elements:
        total += element
    return total

# 합산할 iterable

elements = [x for x in range(1000000)]

# 벤치마크 수행

number = 50
repeat = 5

builtin_times = timeit.repeat(
    "sum_builtin(elements)",
    number=number,
    repeat=repeat,
    globals=globals(),
)

pure_times = timeit.repeat(
    "sum_pure(elements)",
    number=number,
    repeat=repeat,
    globals=globals(),
)

print(f"Builtin:\nAverage: {np.average(builtin_times)}\nMax:     {max(builtin_times)}\nMin:     {min(builtin_times)}\n")
print(f"Pure:\nAverage: {np.average(pure_times)}\nMax:     {max(pure_times)}\nMin:     {min(pure_times)}\n")
```

그리고 결과는 두 번째 자릿수까지 숫자로 표시됩니다:

<div class="content-ad"></div>


내장 함수:
평균: 0.327
최대값: 0.337
최소값: 0.323

순수 함수:
평균: 1.408
최대값: 1.418
최소값: 1.398


보다시피, 내장 sum() 함수는 순수한 Python 코드에 비해 훨씬 빠르게 실행됩니다. 지금까지 언급한 모든 것을 고려할 때, 가능한 경우 항상 내장 함수를 순수한 Python 코드보다 선택해야 합니다. 여기서 이야기 끝입니다.

하지만, 잠깐만요. 재미있는 부분이 여기서 시작됩니다. sum() 함수가 왜 그렇게 빠른 것일까요? 그리고 어떻게 모든 iterable 형식에 대해 합을 수행하는 방법을 알 수 있을까요?

## CPython 내부로의 심층 탐색


<div class="content-ad"></div>

파이썬 언어는 때때로 그 추상화 수준과 내장 기능 때문에 다소 신비로울 수 있어요. sum() 함수가 어떻게 작동하는지 보려면, 파이썬 인터프리터의 소스 코드를 살펴봐야 합니다. 공식 파이썬 구현인 CPython의 소스 코드는 GitHub에서 확인할 수 있어요. 다만, 버전 3.13.0 알파 2에 명시된 소스 코드를 가리키고 있으니 후속 버전은 다를 수 있습니다.

이제, 내장 함수는 '빌트인'이라고 불리는 이유가 있어요: 이들은 인터프리터에 직접 내장되어 있기 때문에 파이썬에서 이들의 정의에 접근할 수 없으며 바이트 코드로 컴파일되지 않습니다. CPython에서 내장 함수는 Python/bltinmodule.c 파일에 구현되어 있어요. 거기서 abs(), print() 그리고 우리가 사랑하는 sum()과 같은 메서드의 정의를 찾을 수 있어요.

Python/clinic/bltinmodule.c.h 헤더 파일에서 찾을 수 있는 builtin_sum() C 함수는 파이썬과 실제 함수 구현 간의 인터페이스 역할을 합니다. 저희 목적에 따라, 이 부분을 건너뛰고 바로 구현인 builtin_sum_impl()로 이동할 거에요.

한 단계씩 분석해보겠습니다. 따라서 이해를 돕기 위해 주석도 추가했어요.

<div class="content-ad"></div>


```js
static PyObject *
builtin_sum_impl(PyObject *module, PyObject *iterable, PyObject *start)
{
    // 함수 내에서 사용될 변수를 초기화하고 선언합니다.
    PyObject *result = start;
    PyObject *temp, *item, *iter;
    
    // iterable 객체를 반복하며 이터레이터를 가져옵니다.
    iter = PyObject_GetIter(iterable);
    // 만약 iterable이 이터러블이 아니면 NULL을 반환합니다.
    if (iter == NULL)
        return NULL;
    
    ...
```

함수는 PyObject 포인터를 인수로 사용하며 이는 놀랍게도 Python 객체이기도 한 인수를 전달합니다. 먼저 CPython은 PyObject_GetIter()를 호출하여 iterable 위에 이터레이터를 가져오려고 시도합니다:

```js
PyObject *
PyObject_GetIter(PyObject *o)
{
    // 객체의 타입을 가져옵니다.
    PyTypeObject *t = Py_TYPE(o);
    getiterfunc f;

    // 객체 타입이 이터레이터를 가지고 있는지 확인합니다.
    f = t->tp_iter;
    if (f == NULL) {
        // 객체가 이터레이터를 가지고 있지 않다면, 시퀀스로 변환할 수 있는지 확인합니다.
        if (PySequence_Check(o))
            // 변환 가능하다면 시퀀스 위에 이터레이터를 반환합니다.
            return PySeqIter_New(o);
        return type_error("'%.200s' object is not iterable", o);
    }
    else {
        // 객체가 이터레이터일 경우, 객체의 이터레이터를 반환합니다.
        PyObject *res = (*f)(o);
        if (res != NULL && !PyIter_Check(res)) {
            PyErr_Format(PyExc_TypeError,
                         "iter() returned non-iterator "
                         "of type '%.100s'",
                         Py_TYPE(res)->tp_name);
            Py_SETREF(res, NULL);
        }
        return res;
    }
}
```

이터레이터를 가져온 후, CPython은 start 인수를 유효성 검사합니다:


<div class="content-ad"></div>

```js
// 'start' 인수(`result` 여기에서)를 유효성 검사합니다
if (result == NULL) {
    // 'start' 인수가 제공되지 않은 경우, 0을 사용합니다
    // `result`가 `start`와 같은 객체를 가리킨다는 점에 유의하세요
    result = PyLong_FromLong(0);
    if (result == NULL) {
        Py_DECREF(iter);
        return NULL;
    }
} else {
    // 'start' 인수가 제공된 경우, 문자열 값은 거부합니다

    // 유니코드 문자열 거부
    if (PyUnicode_Check(result)) {
        PyErr_SetString(PyExc_TypeError,
            "sum() can't sum strings [use ''.join(seq) instead]");
        Py_DECREF(iter);
        return NULL;
    }
    // 바이트 문자열 거부
    if (PyBytes_Check(result)) {
        PyErr_SetString(PyExc_TypeError,
            "sum() can't sum bytes [use b''.join(seq) instead]");
        Py_DECREF(iter);
        return NULL;
    }
    // 바이트 배열 거부
    if (PyByteArray_Check(result)) {
        PyErr_SetString(PyExc_TypeError,
            "sum() can't sum bytearray [use b''.join(seq) instead]");
        Py_DECREF(iter);
        return NULL;
    }
    // Py_INCREF() 및 Py_DECREF()는 가비지 컬렉션을 위해 참조 횟수를 관리하는 데 사용됩니다. 그러므로 신경 쓰지 마세요
    Py_INCREF(result);
}
```

이제 반복 가능한 요소를 더해 보는 시간입니다. CPython은 이제 엄격히 숫자형에 대한 최적화를 적용하려고 할 것입니다. 그러나 이에 대해는 나중에 이야기하겠습니다. 먼저 타입에 구애받지 않는 방법을 제시하여 일반적인 상황에 대한 개요를 제공하기로 결정했습니다.

```js
// 반복 가능한 객체를 순환합니다
for (;;) {
    // 반복 가능한 객체의 다음 항목을 가져옵니다
    item = PyIter_Next(iter);
    if (item == NULL) {
        /* 오류 또는 시퀀스의 끝에 도달함 */
        if (PyErr_Occurred()) {
            Py_SETREF(result, NULL);
        }
        // 항목이 없고 오류가 발생하지 않았으면 반복이 완료됩니다
        break;
    }
    
    // 항목과 결과를 Python 객체로 더합니다
    // 덧셈 결과를 임시 변수에 저장합니다
    temp = PyNumber_Add(result, item);
    Py_DECREF(result);
    Py_DECREF(item);
    result = temp;
    // 덧셈이 실패하면 중단하고 NULL을 반환합니다
    if (result == NULL)
        break;
}
Py_DECREF(iter);
// 마지막으로 결과를 반환합니다(혹은 오류 발생 시 NULL을 반환합니다)
return result;
```

여기서 PyNumber_Add() 메서드는 두 Python 객체를 더하는 적절한 방법을 찾으려고 합니다. 그의 소스 코드 구현은 꽤 난해하고 복잡하기 때문에 대신 단어로 설명해 드리겠습니다:

<div class="content-ad"></div>

- 결과 및 항목 객체에 대한 추가 함수를 찾아보세요. Python 용어로는 __add__() 및 __radd__() 메서드입니다.
- 결과에 추가 함수가 있고 항목이 결과의 하위 유형인 경우, 항목의 추가 함수를 사용하여 두 객체를 더해보세요. 구현되지 않았을 경우 결과의 추가 함수를 대신 사용합니다.
- 결과에 추가 함수가 없는 경우, 특정 형식에 대해 구현된 항목의 추가 함수를 사용하여 객체를 더해보세요.
- 두 객체 유형에 대해 추가 연산이 구현되지 않은 경우, TypeError 예외를 발생시켜보세요.

모든 이러한 복잡한 확인 사항은 두 개체 간의 추가가 프로그래머가 의도한 동작을 따르도록합니다. 직접 살펴보고 싶다면 PyNumber_Add() 및 binary_op1()을 확인해보세요.

## 숫자 유형 최적화

만약 반복 가능 항목이 엄격하게 숫자 유형인 경우, CPython은 모든 계산을 C에서 유지하고 효율적인 C long int 유형을 추가하여 Python 객체 대신 사용할 수 있습니다. 이것이 내장 sum() 함수가 순수한 Python 반복문보다 훨씬 빠른 이유입니다. 그러나 반복 가능 항목에 비숫자 유형이 포함된 경우, 성능 차이가 훨씬 덜 중요해집니다 (기준).

<div class="content-ad"></div>

이제 최적화된 합계 코드를 살펴보겠습니다.

```js
// `start` 인수가 Python 정수인지 엄격히 확인합니다 (기본값 0 포함)
if (PyLong_CheckExact(result)) {
    int overflow;
    // Python 정수를 C long 타입으로 변환합니다
    Py_ssize_t i_result = PyLong_AsLongAndOverflow(result, &overflow);
    // 오버플로우가 발생하지 않았다면, `result`를 NULL로 설정하고 일부 쓰레기 수집을 합니다
    if (overflow == 0) {
        Py_SETREF(result, NULL);
    }
    
    // 반복 가능한 항목들의 합을 구합니다
    while(result == NULL) {
      ...
```

보시다시피, 이 최적화는 C long int로 직접 변환할 수 있는 엄격한 Python 숫자에만 적용됩니다 (Py_ssize_t는 long int에 대한 별칭입니다). 변환에 성공하면 반복을 시작합니다.

```js
// 반복 가능한 항목들의 합을 구합니다
while(result == NULL) {           
    // 반복 가능한 대상에서 다음 요소를 가져옵니다
    item = PyIter_Next(iter);
    if (item == NULL) {
        // 다음 항목이 없으면 오류가 발생했는지 확인합니다
        Py_DECREF(iter);
        if (PyErr_Occurred())
            return NULL;

        // 오류가 없고 반복 가능한 항목이 모두 소진되었으면 결과를 Python 객체로 반환합니다
        return PyLong_FromSsize_t(i_result);
    }

    ...
```

<div class="content-ad"></div>

총합은 반복이 완료될 때에만 파이썬 객체로 변환되어, C 유형을 사용하여 시간을 절약합니다.

```js
// 항목이 파이썬 정수인지 또는 부울값인지 확인 (True는 1, False는 0)
if (PyLong_CheckExact(item) || PyBool_Check(item)) {
    Py_ssize_t b;
    overflow = 0;
    // 항목이 간편한 파이썬 정수인지 확인 (더 효율적)
    if (_PyLong_IsCompact((PyLongObject *)item)) {
        b = _PyLong_CompactValue((PyLongObject *)item);
    }
    // 간편한 정수가 아닌 경우, C long 유형으로 변환
    else {
        b = PyLong_AsLongAndOverflow(item, &overflow);
    }
    // 숫자 항목이 C long 형식의 범위 내에 있는지 확인
    // 간편한 정수의 경우 `overflow`는 항상 0
    if (overflow == 0 &&
        (i_result >= 0 ? (b <= LONG_MAX - i_result)
                       : (b >= LONG_MIN - i_result)))
    {
        // 유효한 C long 유형인 경우 결과에 추가하고 합계 계속
        i_result += b;
        Py_DECREF(item);
        continue;
    }
}
```

간편한 정수는 -5에서 256 사이의 Python 정수 객체로, 해석기가 시작될 때 미리 인스턴스화됩니다. 작은 정수는 매우 흔하기 때문에 CPython은 프로그램 실행 중에 한 번만 인스턴스화합니다. 이렇게 함으로써, 같은 값을 가진 모든 작은 정수는 메모리에서 동일한 객체를 참조하여 새로운 객체를 불필요하게 인스턴스화하는 것을 피합니다.

또한, 간편한 정수는 특정 범위 내에 보장되므로 C long으로 변환시 오버플로우를 확인할 필요가 없어서, 비용이 많이 드는 PyLong_AsLongAndOverflow() 변환 함수를 적용하는 대신 _PyLong_CompactValue()를 사용하여 원시값을 가져올 수 있습니다.

<div class="content-ad"></div>

하지만 왜 Python 숫자 객체를 C long으로 변환하는 것이 그렇게 비용이 많이 드는 걸까요? 숫자 객체는 그 안에 원시 숫자 값을 보유하고 있지 않나요? 정확히 그렇지 않습니다. CPython은 숫자의 매우 큰 값과 고정밀도를 위해 숫자의 자릿수를 저장하여 원시 값 대신 배열에 저장함으로써 구현합니다. 이런 트레이드오프는 비효율적인 연산 비용에도 불구하고 사실상 무한한 정밀도와 숫자 크기를 가능케 합니다.

```js
Python 숫자 뒤에 숨은 기본 개념 (정확히는):

Compact integer 5:
- 자릿수 갯수: 1
- 자릿수: [5]

일반 정수 345:
- 자릿수 갯수: 3
- 자릿수: [3, 4, 5]
```

그럼 최적화된 합에 대해 이야기해보죠. 반복 중에 숫자가 아닌 유형을 만났을 때 무슨 일이 일어나는지 살펴봅시다.

```js
// 항목이 엄격히 숫자가 아닌 경우, Python 객체로 추가를 시도합니다
// 현재 합계 총액을 Python 객체로 변환합니다
result = PyLong_FromSsize_t(i_result);
if (result == NULL) {
    Py_DECREF(item);
    Py_DECREF(iter);
    return NULL;
}
// 항목 및 결과를 Python 객체로 추가합니다
temp = PyNumber_Add(result, item);
Py_DECREF(result);
Py_DECREF(item);
result = temp;
if (result == NULL) {
    Py_DECREF(iter);
    return NULL;
}

// 일반 합 루틴으로 되돌아갑니다
```

<div class="content-ad"></div>

결과가 NULL과 같기 때문에 현재 while 루프가 종료되고 제어가 이전에 본 일반 합 루틴으로 전달될 것입니다.

## 결론

그래서 내장 sum()이 순수한 파이썬과 비교했을 때 훨씬 빠르다는 것을 보았습니다. 또한 CPython에서 그것이 어떻게 구현되었는지 심도 있게 살펴보았습니다. iterable 또는 숫자 유형에 대해 언제나 sum()을 사용해야 하는 이유는 더 간결하고 효율적이기 때문입니다.

그러나 가장 중요한 것은 추상화의 '어떻게'와 '왜'를 이해하는 가장 좋은 방법은 해당 구현을 분석하는 것입니다. 어떻게 작동하는지뿐만 아니라 왜 작동하는지에 대해 정말 이해하려면 계층화된 추상화의 미로를 탐험해 보세요.

<div class="content-ad"></div>

이 글을 즐겁게 보셨으면 좋겠어요! 궁금한 점이나 생각이 있으시면 댓글을 남겨주세요. 읽어 주셔서 감사합니다!

더 깊게 파이썬에 대해 알아보고 싶으신가요? 아래 이야기를 확인해보세요:

## 유용한 자료:

- GitHub의 CPython 소스 코드
- GitHub의 Python 버전 3.13.0 알파 2
- CPython의 Argument clinic (Python/clinic 디렉토리)
- 유형 객체: 맵 던더 메서드를 C 함수에 매핑하기 (예: __iter__ =` tp_iter)
- 작은 정수 캐싱이란 무엇인가요?

<div class="content-ad"></div>

# PlainEnglish.io 🚀

In Plain English 커뮤니티의 일원이 되어 주셔서 감사합니다! 떠나시기 전에:

- 작가를 클랩하고 팔로우해주세요️
- In Plain English에 글을 쓸 수 있는 방법을 배워보세요️
- 팔로우하기: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼도 방문해보세요: Stackademic | CoFeed | Venture