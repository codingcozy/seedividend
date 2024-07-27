---
title: "자바스크립트와 파이썬의 비동기 프로그래밍 비교 어떤 언어가 더 나을까"
description: ""
coverImage: "/TIL/assets/img/2024-07-06-AsyncProgramminginJavaScriptvsPython_0.png"
date: 2024-07-06 02:24
ogImage:
  url: /assets/img/2024-07-06-AsyncProgramminginJavaScriptvsPython_0.png
tag: Tech
originalTitle: "Async Programming in JavaScript vs Python"
link: "https://medium.com/treebo-tech-blog/async-programming-in-javascript-vs-python-11fd3e3f1b33"
---

비동기 프로그래밍은 작업을 더 효율적으로 실행할 수 있게 해주는 주요 패러다임입니다, 특히 I/O 바운드 작업에서 더욱 그렇습니다. JavaScript와 Python은 모두 비동기 프로그래밍을 지원하지만, 각각의 설계 철학과 런타임 환경에 따라 다른 방식으로 지원합니다.

이 기사는 JavaScript와 Python에서의 비동기 프로그래밍을 비교하여, 그들의 메커니즘, 성능 및 사용 사례를 살펴봅니다.

## 비동기 프로그래밍 소개

비동기 프로그래밍은 프로그램이 장기 실행 작업이 완료될 때까지 기다리는 동안 다른 작업을 수행할 수 있게 합니다. 이 패러다임은 네트워크 요청, 파일 I/O 및 데이터베이스 상호 작용과 같은 I/O 작업이 지연을 일으킬 수 있는 환경에서 중요합니다. 주 스레드를 차단하지 않음으로써, 비동기 프로그래밍은 응용 프로그램의 반응성과 효율성을 향상시킵니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## JavaScript에서의 비동기 프로그래밍

JavaScript는 본질적으로 비동기적이며 단일 스레드이며, 비동기 작업을 처리하기 위해 이벤트 루프를 의존합니다. 이벤트 루프는 JavaScript가 시스템의 커널에 일부 작업을 오프로드하고 작업이 완료되면 콜백을 실행하여 여러 작업을 동시에 처리할 수 있는 핵심 메커니즘입니다.

주요 구성 요소:

- 호출 스택: 호출 스택은 현재 실행 중인 함수를 보유합니다. 함수가 호출되면 스택에 푸시되고 반환되면 스택에서 팝됩니다.
- Web API: 이는 브라우저 (또는 Node.js)에서 제공하는 API로 DOM 조작, HTTP 요청 및 타이머와 같은 작업을 처리합니다. 비동기 작업이 수행될 때, 이러한 API로 작업이 전달됩니다.
- 콜백 대기열: 비동기 작업이 완료되면 해당 콜백이 콜백 대기열에 배치됩니다.
- 이벤트 루프: 이벤트 루프는 지속적으로 호출 스택과 콜백 대기열을 확인합니다. 호출 스택이 비어 있으면 대기열에서 첫 번째 콜백을 가져와 실행을 위해 스택에 푸시합니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

/assets/img/2024-07-06-AsyncProgramminginJavaScriptvsPython_0.png

[YouTube Link](https://www.youtube.com/watch?v=eiC58R16hb8)

Callbacks

초반에 JavaScript는 비동기 작업을 처리하기 위해 콜백을 사용했습니다. 콜백은 다른 함수로 전달되는 함수로, 이후에 외부 함수 내에서 호출되어 특정 루틴이나 작업을 완료하는 데 사용됩니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

예시:

```js
function fetchData(callback) {
  setTimeout(() => {
    callback("데이터를 가져왔어요");
  }, 1000);
}
fetchData((message) => {
  console.log(message);
});
```

콜백은 기능적이지만 종종 "콜백 지옥"이라고 알려진 깊게 중첩된 구조로 이어질 수 있어 코드를 읽기 어렵게 만들기도 합니다.

프로미스

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

약속은 비동기 작업을 처리하는 더 깔끔하고 관리하기 쉬운 방법을 제공합니다. 이들은 현재 이용 가능하거나 미래에 이용 가능할 수도 있고 아예 없을 수도 있는 값을 나타냅니다. 약속은 연결할 수 있고 콜백보다 중첩될 가능성이 적습니다.

예시:

```js
let fetchData = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Data fetched");
  }, 1000);
});
fetchData.then((message) => {
  console.log(message);
});
```

약속은 콜백 지옥을 피하고 더 나은 오류 처리 메커니즘을 제공하여 비동기 코드의 가독성을 크게 향상시킵니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

비동기/대기

ECMAScript 2017에서 도입된 async 및 await 키워드는 프로미스 위에 구문 설탕을 제공하여 비동기 코드가 동기 코드처럼 보이고 동작하도록 만들어줍니다. 이를 통해 코드를 작성, 읽고 유지하기가 더 쉬워집니다.

예시:

```js
async function fetchData() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("데이터를 가져왔습니다"), 1000);
  });
  let result = await promise;
  console.log(result);
}
fetchData();
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

async/await 구문을 사용하면 개발자가 직관적이고 선형적인 비동기 코드를 작성할 수 있어서 복잡한 비동기 작업을 관리하는 데 따르는 인지 부하를 줄일 수 있습니다.

구현 내부:

- async 함수는 항상 Promise를 반환합니다.
- await 키워드는 async 함수의 실행을 일시 중지시키고, 계속하기 전에 Promise가 해결되거나 거부될 때까지 기다립니다.

## Python에서의 비동기 프로그래밍

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

Asyncio 모듈

파이썬의 비동기 프로그래밍을 위한 주요 메커니즘은 Python 3.4에서 도입된 asyncio 모듈입니다. asyncio는 JavaScript와 유사한 이벤트 루프를 제공하지만 명시적으로 호출해야 합니다. 이 모듈은 협력적인 멀티태스킹을 지원하여 개발자가 단일 스레드 내에서 여러 작업을 관리할 수 있도록 합니다.

Asyncio 작동 방식:

- 이벤트 루프: asyncio의 핵심인 이벤트 루프는 asyncio 작업 및 콜백을 실행하고 네트워크 I/O 작업을 수행하며 서브프로세스를 실행합니다.
- 코루틴: 일시 중지 및 재개할 수 있는 async def로 정의된 함수들입니다.
- 작업: 코루틴을 감싸서 이벤트 루프에서 실행할 수 있도록 하는 래퍼입니다.
- 퓨처: 아직 사용 가능하지 않을 수 있는 비동기 작업의 결과를 나타냅니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

코루틴

파이썬에서 코루틴은 async def를 사용하여 정의되며, 일시 중지되고 재개될 수 있는 함수들로, 비동기 프로그래밍에 적합합니다. 코루틴은 직접 대기하거나 이벤트 루프에서 실행되도록 스케줄링하여 대기해야 합니다.

예시:

```python
import asyncio
async def fetch_data():
    await asyncio.sleep(1)
    return "데이터 가져오기 완료"
async def main():
    result = await fetch_data()
    print(result)
asyncio.run(main())
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

코루틴은 파이썬의 비동기 프로그래밍의 중추를 이루며, 여러 작업을 동시에 실행할 수 있게 합니다.

작업과 미래

asyncio는 작업(Task)과 미래(Future)와 같은 구조체를 제공하여 코루틴의 동시 실행을 처리할 수 있게 합니다. 작업은 백그라운드에서 실행할 수 있도록 코루틴을 감싸는 래퍼이며, 미래는 아직 사용 가능하지 않은 결과를 나타냅니다.

예시:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
import asyncio
async def fetch_data():
    await asyncio.sleep(1)
    return "Data fetched"
async def main():
    task = asyncio.create_task(fetch_data())
    result = await task
    print(result)
asyncio.run(main())
```

Tasks and Futures Internals:

- Tasks: 작업을 생성하면 이벤트 루프에서 실행할 수 있도록 예약됩니다. 작업은 코루틴을 실행하고 그 실행을 관리합니다.
- Futures: 퓨처는 처음에는 알려지지 않지만 어느 시점에는 사용 가능한 결과를 나타내는 객체입니다. 퓨처는 일반적으로 동기 및 비동기 코드 간의 다리를 제공하기 위해 하위 수준 API에 사용됩니다.

## JavaScript와 Python 비동기 프로그래밍 비교

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

**이벤트 루프 및 논블로킹 I/O**

![AsyncProgramminginJavaScriptvsPython_1](/TIL/assets/img/2024-07-06-AsyncProgramminginJavaScriptvsPython_1.png)

**구문 및 가독성**

![AsyncProgramminginJavaScriptvsPython_2](/TIL/assets/img/2024-07-06-AsyncProgramminginJavaScriptvsPython_2.png)

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

성능

/assets/img/2024-07-06-AsyncProgramminginJavaScriptvsPython_3.png

생태계 및 라이브러리

/assets/img/2024-07-06-AsyncProgramminginJavaScriptvsPython_4.png

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

사용 사례

/assets/img/2024-07-06-AsyncProgramminginJavaScriptvsPython_5.png

Python의 asyncio 모듈은 코루틴을 사용하여 단일 스레드 동시 코드를 작성할 수 있도록 강력한 비동기 프로그래밍 프레임워크를 제공합니다. 그러나 성능을 더욱 향상시키고자 하는 경우, uvloop는 기본 이벤트 루프에 대안적인 솔루션을 제공합니다.

## uvloop란 무엇인가요?

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

uvloop은 Python의 asyncio 모듈을 위한 이벤트 루프 구현체로, Node.js의 이벤트 루프를 구동하는 libuv 라이브러리를 기반으로 합니다. 기본 이벤트 루프를 uvloop로 대체하면, I/O 바운드 애플리케이션에서 상당한 성능 향상을 얻을 수 있습니다.

## uvloop의 주요 기능

- 고성능: uvloop은 빠를 것으로 설계되어 있습니다. asyncio 작업의 오버헤드를 크게 줄여, Node.js의 성능 수준과 유사한 성능을 제공할 수 있습니다.
- 호환성: uvloop은 asyncio API와 완벽하게 호환되어, 기존 애플리케이션에 최소한의 변경으로 통합하기 쉽습니다.
- 신뢰성: libuv 기반으로 만들어진 uvloop은 이 실전 경험에 기반을 둔 안정성과 견고함을 상속받았습니다.

## uvloop 설치하기

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
pip install uvloop
```

## asyncio로 uvloop 사용하기

asyncio 애플리케이션에서 이벤트 루프로 uvloop를 사용하려면 기본 이벤트 루프로 설정해야 합니다. 다음은 그 방법입니다:

```js
import asyncio
import uvloop

async def fetch_data():
    await asyncio.sleep(1)
    return "데이터 가져옴"

async def main():
    data = await fetch_data()
    print(data)

if __name__ == "__main__":
    # uvloop를 기본 이벤트 루프로 설정
    asyncio.set_event_loop_policy(uvloop.EventLoopPolicy())
    asyncio.run(main())
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 예시에서는 메인 코루틴을 실행하기 전에 uvloop를 기본 이벤트 루프 정책으로 설정합니다. 이렇게 함으로써 모든 asyncio 작업이 uvloop의 고성능 이벤트 루프를 사용하도록 보장됩니다.

## 웹 서버

다양한 I/O 작업을 처리하는 웹 서버는 uvloop에서 큰 이점을 얻을 수 있습니다. aiohttp와 Sanic과 같은 프레임워크는 uvloop를 활용하여 요청 처리 성능을 향상시킬 수 있습니다.

aiohttp를 활용한 예시:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
from aiohttp import web
import uvloop

async def handle(request):
    return web.Response(text="안녕, 세상")

app = web.Application()
app.add_routes([web.get('/', handle)])

if __name__ == "__main__":
    web.run_app(app, loop=uvloop.new_event_loop())
```

# 결론

자바스크립트와 파이썬 모두 풍부한 비동기 프로그래밍 기능을 갖추고 있지만, 그들의 접근 방식은 내재적인 설계 철학과 런타임 환경의 차이로 인해 다릅니다. 자바스크립트의 비동기 프로그래밍은 단일 스레드 및 이벤트 기반 아키텍처와 긴밀하게 통합되어 웹 개발에 매우 효율적입니다. 파이썬의 asyncio는 언어에 강력한 비동기 기능을 제공하며 다양한 응용 프로그램에 적합하지만 조금 더 많은 보일러플레이트 코드가 필요합니다.

파이썬에서 asyncio 기반 애플리케이션에 uvloop을 통합함으로써 Node.js의 성능 수준을 달성할 수 있으면서도 파이썬의 풍부한 생태계와 사용 편의성을 계속 누릴 수 있습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

참고 자료:

- [https://youtu.be/8aGhZQkoFbQ?si=xYY9tHFrJzKLRaok](https://youtu.be/8aGhZQkoFbQ?si=xYY9tHFrJzKLRaok)
- [https://www.youtube.com/watch?v=eiC58R16hb8](https://www.youtube.com/watch?v=eiC58R16hb8)
