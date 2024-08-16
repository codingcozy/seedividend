---
title: "Python Async Await  사용해본 후 배운 7가지 교훈"
description: ""
coverImage: "/assets/img/2024-06-22-PythonAsyncAwait7ThingsILearntAfterDealingWithThemForAWhile_0.png"
date: 2024-06-22 02:38
ogImage: 
  url: /assets/img/2024-06-22-PythonAsyncAwait7ThingsILearntAfterDealingWithThemForAWhile_0.png
tag: Tech
originalTitle: "Python Async Await — 7 Things I Learnt After Dealing With Them For A While"
link: "https://medium.com/gitconnected/python-async-await-7-things-i-learnt-after-dealing-with-them-for-a-while-86c1559e3c15"
isUpdated: true
---





![이미지](/assets/img/2024-06-22-PythonAsyncAwait7ThingsILearntAfterDealingWithThemForAWhile_0.png)

# 1) "async def"를 사용하면 비동기 함수를 작성할 수 있습니다

```python
def hello():
    return 'hello'

print(hello)  # <function hello at 0x100ce8e00>
```

^ 여기에 일반 함수가 있습니다


<div class="content-ad"></div>

```python
async def hello():
    return 'hello'

print(hello)  # <function hello at 0x102b58e00>
```

여기에 async def 키워드를 사용하여 생성된 비동기 함수가 있습니다. 출력했을 때에도 여전히 함수 형식으로 출력되는 것을 볼 수 있습니다.

# 2) 비동기 함수 호출은 코루틴을 반환합니다.

```python
def hello():
    return 'hello'

print(hello())  # hello
```

<div class="content-ad"></div>

^ 일반 함수 호출 예입니다 - 'hello' 문자열을 반환하는단 뜻이에요

```js
async def hello():
    return 'hello'

print(hello())  

# <coroutine object hello at 0x10276f320>

# RuntimeWarning: coroutine 'hello' was never awaited
```

^ 일반 함수처럼 async 함수를 호출할 때 반환 값 대신 코루틴 객체가 반환됩니다.

^ 또한 RuntimeWarning: coroutine 'hello' was never awaited 메시지가 표시됩니다 - 코루틴은 일반적으로 await를 사용하여 대기해야 합니다(잠시 후에 설명하겠습니다)

<div class="content-ad"></div>

# 3) 코루틴의 의미

코루틴은 일시적으로 일시 중단 및 재개될 수있는 특별한 기능인 함수입니다. 다른 작업이 실행 중일 때 일시 중단 및 재개될 수 있는 기능이기도 합니다. 또한 다른 코루틴에게 일시적으로 제어를 양도할 수도 있습니다.

이를 통해 우리는 동시에 하나 이상의 작업을 동시에 실행할 수 있게 됩니다.

# 4) “asyncio.run()”을 사용하여 코루틴을 직접 실행할 수 있습니다

<div class="content-ad"></div>

```js
async def hello():
    return 'hello'

print(hello())

# <coroutine object hello at 0x10276f320>

# RuntimeWarning: coroutine 'hello' was never awaited
```

^ 이것이 코루틴을 실행하는 방법이 아닙니다.

```js
import asyncio

async def hello():
    print('running hello coroutine')
    return 'hello'

asyncio.run(hello()) # running hello coroutine
```

^ 이것이 코루틴을 실행하는 방법입니다.

<div class="content-ad"></div>

주의 — asyncio는 파이썬 표준 라이브러리의 일부이므로 Python과 함께 설치되어 있으며이 작동하도록 추가로 제3자 라이브러리를 설치할 필요가 없습니다. asyncio를 가져와서 사용할 수 있습니다.

# 5) 코루틴 실행에 "await" 사용하기

hello 코루틴과 main 코루틴이 있다고 가정해 봅시다.

```python
import asyncio

async def hello():
    print('hello 코루틴 실행 중')
    return 'hello'

async def main():
    x = await hello()
    print(x)

asyncio.run(main())    

# hello 코루틴 실행 중
# hello
```

<div class="content-ad"></div>

^ 다른 코루틴 메인 안에서 hello를 호출하려면 await 키워드를 사용해야 합니다.

await hello()를 "hello()가 끝날 때까지 기다렸다가 반환 값을 x에 할당한다"고 생각할 수 있습니다. 이것이 x를 출력할 때 hello를 얻는 이유입니다.

# 6) "await"는 "async def"를 사용하여 정의된 함수에서만 사용할 수 있습니다

```python
import asyncio

async def hello():
    print('hello 코루틴 실행 중')
    return 'hello'

async def test():
    x = await hello()
    print(x)

asyncio.run(test())
```

<div class="content-ad"></div>

여기서는 일반 함수 테스트 안에 await를 사용하려고 시도했기 때문에 SyntaxError가 발생합니다.

await 키워드를 사용하려면 async def를 사용하여 정의된 async 함수 내에 있어야 합니다.

asyncio.gather를 사용하여 둘 이상의 코루틴을 동시에 실행할 수 있습니다.

```python
import asyncio

async def hello():
    print('시작')
    await asyncio.sleep(1)
    print('끝')

async def main():
    await asyncio.gather(hello(), hello(), hello())

asyncio.run(main())

# 시작
# 시작
# 시작
# 끝
# 끝
# 끝
```

<div class="content-ad"></div>

- 이 스크립트를 실행할 때, 먼저 3개의 start가 출력됩니다.
- 약 1초 지연 후, 3개의 end가 출력됩니다.

무슨 일이 일어나고 있을까요?

- asyncio.sleep(1)은 우리의 코루틴을 1초간 재우게 합니다.
- asyncio.gather는 3개의 hello() 코루틴을 동시에 동시에 실행시킵니다.
- 이것이 모든 start가 함께 출력되고, 모든 end도 함께 출력되는 이유입니다.

# 만약 제작자로서 저를 지원하고 싶다면

<div class="content-ad"></div>

- 이 이야기에 대해 50번 박수를 쳐주세요
- 여러분의 생각을 말씀해 주세요
- 이야기에서 가장 좋았던 부분을 강조해 주세요

감사합니다! 이 작은 행동들이 큰 도움이 되고, 정말 감사드립니다!

YouTube: https://www.youtube.com/@zlliu246

LinkedIn: https://www.linkedin.com/in/zlliu/

<div class="content-ad"></div>

제 Ebooks: [https://zlliu.co/ebooks](https://zlliu.co/ebooks)