---
title: "Nextjs에서 Web Worker 활용하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-HarnessingthePowerofWebWorkerswithNextjs_0.png"
date: 2024-06-22 14:28
ogImage: 
  url: /assets/img/2024-06-22-HarnessingthePowerofWebWorkerswithNextjs_0.png
tag: Tech
originalTitle: "Harnessing the Power of Web Workers with Next.js"
link: "https://medium.com/@ngrato/harnessing-the-power-of-web-workers-with-next-js-350901a99a10"
---


![2024-06-22-HarnessingthePowerofWebWorkerswithNextjs_0.png](/assets/img/2024-06-22-HarnessingthePowerofWebWorkerswithNextjs_0.png)

웹 애플리케이션의 응답성을 유지하는 데 실시간 데이터를 효율적으로 제공하는 것이 중요합니다. 이 게시물은 금융에 관한 것은 아니지만, 암호화폐 가격과 같은 데이터는 급속하게 변동할 수 있기 때문에 Web Worker에 적합한 사용 사례입니다. 이 데이터를 처리하는 기존 방법은 메인 스레드를 지연시킬 수 있어 웹 앱의 반응이 둔해질 수 있습니다. 그러나 Web Worker의 능력을 활용하면 이 데이터 처리를 별도 스레드로 옮겨 UI를 빠르고 반응적으로 유지할 수 있습니다. 이 게시물에서는 Next.js 애플리케이션에서 Web Worker를 사용하여 실시간 암호화폐 데이터를 관리한 방법을 안내합니다. 아래는 UI의 스크린샷입니다.

![2024-06-22-HarnessingthePowerofWebWorkerswithNextjs_1.png](/assets/img/2024-06-22-HarnessingthePowerofWebWorkerswithNextjs_1.png)

# 웹 워커란 무엇인가

<div class="content-ad"></div>

간단히 말해서, 웹 워커는 백그라운드 스레드에서 스크립트를 실행할 수 있는 방법을 제공합니다. 워커 스레드는 사용자 인터페이스를 방해하지 않고 작업을 수행할 수 있습니다. 게다가, 주요 JavaScript 스레드로 메시지를 보낼 수 있어서 애플리케이션이 반응성을 유지할 수 있습니다.

# 준비 과정: Next.js와 웹 워커

Next.js는 개발자가 서버 측 렌더링 및 정적 웹 애플리케이션을 만들 수 있도록 하는 React 프레임워크입니다. 저는 Next.js를 업무에서 사용하고 있고 매우 인기가 있기 때문에 Web Workers를 Next.js와 함께 사용하는 방법을 알고 싶었습니다. 특히 극복하고자 했던 어려움은 다음과 같습니다.

- TypeScript 사용
- 웹 워커 파일 경로를 모든 컴포넌트에서 사용 가능하게 하기
- 현재 tsconfig.json 파일을 오염시키지 않거나 모든 파일을 public 디렉토리에 넣지 않기

<div class="content-ad"></div>

# 빌드 단계

실제 웹 워커 작업에 들어가기 전에 지루한 작업을 먼저 해보겠습니다. 웹 워커를 런타임에서 사용할 수 있도록 하려면 /public 디렉토리에 저장해야 합니다. public 디렉토리에 대해 간단히 설명하자면 이미지, 폰트, 스크립트, HTML 파일 같은 정적 파일을 브라우저를 통해 직접 액세스해야 하는 경우에 사용됩니다. 이 디렉토리에 위치한 모든 것은 Next.js에서 정적 리소스로 제공됩니다. 이 설정은 몇 가지 보안 고려 사항을 동반합니다. 민감한 사용자 데이터를 피하고 적절한 보안 헤더를 사용하며 이 파일에 API 키를 저장하지 마십시오.

# 새로운 tsconfig.json 파일 만들기

tsconfig.worker.json이라는 새 파일을 생성하여 특정 웹 워커 파일을 /public 디렉토리로 컴파일하기 위해 기존 tsconfig.json을 확장합니다. 동일한 JSON을 기본 구성에 넣으면 컴파일러 옵션 -` outDir가 모든 것을 /public 디렉토리에 넣을 것으로 생각됩니다.

<div class="content-ad"></div>

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": ". /public/workers",
    "module": "ES6",
    "noEmit": false
  },
  "include": ["workers/**/*.ts"]
}
```

이제는 /workers 폴더 안의 모든 파일을 JavaScript로 컴파일하여 /public/workers 디렉토리에 넣어줍니다. 이렇게하면 컴포넌트에서 어디에서든 액세스할 수 있습니다.

# Package.json 업데이트

package.json 파일에서 스크립트를 업데이트해야합니다. 이렇게하면 worker 파일이 저장될 때마다 빌드됩니다. 제가 일단 빌드를 실행할 수있는 스크립트 명령어를 추가했습니다.

<div class="content-ad"></div>

```js
"build:workers": "tsc -p tsconfig.worker.json", 
```

이후에는 변경 사항이 발생할 때마다 worker 폴더를 감시하고 저장한 후 빌드하는 명령을 추가했습니다. 이 명령을 개발 명령과 병렬로 실행했습니다. 그러나 모든 작업을 한 번에 수행하도록 개발 명령을 업데이트할 수도 있습니다.

```js
"watch:workers": "tsc -p tsconfig.worker.json --watch",
"dev": "next dev -H 127.0.0.1 -p 3111",
```

# 웹 워커


<div class="content-ad"></div>

웹 워커는 굉장히 복잡하지 않아요. 사실, 마지막에는 메소드 4개와 속성 2개만 가지고 있어요. 이 메소드들은 워커 내부로 메시지를 보내거나 받기 위해 사용하고, 속성들은 이벤트를 듣기 위해 사용돼요.

## 메소드

- postMessage(): 워커의 내부 스코프로 메시지를 보냅니다. 어떤 값 또는 자바스크립트 객체든 보낼 수 있지만 함수나 오류 객체는 보낼 수 없어요.

```js
worker.postMessage(data);
```

<div class="content-ad"></div>

- terminate():
    워커를 즉시 종료합니다. 이렇게하면 워커 범위 내의 모든 작업이 중지되며, 모든 네트워크 연결이 해제되며, 모든 리소스가 해제됩니다. `terminate()`을 호출한 후에는 워커를 다시 시작할 수 없습니다.

```js
worker.terminate();
```

- addEventListener():
    `message` 및 `error`와 같은 이벤트를 처리하기 위해 워커에 직접 속성을 설정하는 대신 사용할 수 있는 대체 방법입니다.

```js
worker.addEventListener('message', handlerFunction);
```

<div class="content-ad"></div>

- removeEventListener():
addEventListener()로 이전에 등록된 이벤트 리스너를 제거합니다.

```js
worker.removeEventListener('message', handlerFunction);
```

## 속성

- onmessage: worker가 `postMessage()`를 사용하여 메인 스레드로부터 메시지를 수신할 때 호출되는 이벤트 핸들러입니다.

<div class="content-ad"></div>

```js
worker.onmessage = function(event) { 
  console.log(event.data); 
};
```

- **onerror**: 설명: 워커에서 오류가 발생했을 때 호출되는 이벤트 핸들러입니다. 이 이벤트 핸들러는 오류에 관한 정보를 포함하는 `ErrorEvent` 객체를 받을 수 있습니다.

```js
worker.onerror = function(event) { console.error(event.message); };
```

`postMessage` 메서드를 사용할 때 직접 'init' 또는 'data'와 같은 메시지 유형을 만들면 구성 및 유연성이 증가할 수 있습니다. 예를 들어 이 프로젝트에서는 페이로드를 웹 워커의 특정 알고리즘으로 연결하기 위한 메시지 유형을 나타내는 TypeScript 유형을 사용했습니다. 'type'이라는 단어를 많이 사용했는데, 예시를 보여드릴까요?

<div class="content-ad"></div>

types.ts

```js
export type WorkerMessageT<T> = {
  type: 'init' | 'data' | 'error' | 'stop'
  payload?: {
    id?: string
    data: T
  }
}

export type CryptoWorkConfigT = {
  assets: string // 비트코인, 이더리움, 모네로, 라이트코인
}
```

다른 방법으로는 addEventListener()를 활용할 수도 있습니다.

crypto.ts

<div class="content-ad"></div>

```js
import { WorkerMessageT, CryptoWorkConfigT } from '../types'

// 워커의 최상위 범위에서 pricesWs를 정의합니다
let pricesWs: WebSocket | null = null

self.onmessage = (e) => {
  const BASE_URL = 'wss://ws.coincap.io/prices'
  switch (e.data.type) {
    case 'init':
      const message: WorkerMessageT<CryptoWorkConfigT> = e.data

      // 웹 소켓 연결을 초기화합니다
      pricesWs = new WebSocket(
        `${BASE_URL}?assets=${message.payload?.data.assets}`,
      )

      const initSubscription = () => {
        pricesWs?.addEventListener('message', function (event) {
          self.postMessage(JSON.parse(event.data))
        })
      }

      initSubscription()

      break

    case 'stop':
      // 열려 있는 웹 소켓을 안전하게 닫습니다
      if (pricesWs) {
        console.log('WebSocket 연결을 종료합니다...', pricesWs)
        pricesWs.close()
        pricesWs = null // 닫은 후에 참조를 지웁니다
      }
      break

    case 'error':
      // 오류 발생 시, 웹 소켓을 닫습니다
      if (pricesWs) {
        pricesWs.close()
        pricesWs = null // 오류 발생 시 정리합니다
      }
      // 여기에 추가적인 오류 처리 로직을 구현할 수 있습니다
      break

    default:
      // 명시적으로 언급되지 않은 모든 케이스 처리
      console.error('처리되지 않은 메시지 유형:', e.data.type)
  }
}
```

먼저 몇 가지 타입을 가져오고, Coincap API와 통신하기 위해 사용할 웹 소켓 변수를 초기화합니다. 그런 다음 첫 번째 웹 워커 메서드 self.onmessage가 나타납니다. 메시지 유형이 즉시 유용하며 적절한 알고리즘으로 이벤트를 분기합니다. 'init' 케이스에서는 수신된 메시지 데이터를 수집하고 Coincap 웹 소켓에 구독합니다. 웹 소켓 이벤트 핸들러에서 postMessage() 메서드를 사용하여 데이터를 전파합니다. 여기까지입니다! 이제 웹 워커와 통신하는 UI로 이동해봅시다.

page.ts

```js
'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@mozilla/lilypad-ui'
import styles from './page.module.scss'
import { CryptoWorkConfigT, WorkerMessageT } from 'workers/types'
import Card from '@Shared/Card/Card'

type CryptoDataT = {
  bitcoin: string
  ethereum: string
  monero: string
  litecoin: string
}

const page = () => {
  const workerRef = useRef<Worker>()
  const initPrice = '데이터를 기다리는 중...'
  const [status, setStatus] = useState<string>('중지됨')
  const [prices, setPrices] = useState<CryptoDataT>({
    bitcoin: '',
    ethereum: '',
    monero: '',
    litecoin: '',
  })

  useEffect(() => {
    workerRef.current = new Worker('/workers/crypto/crypto.js', {
      type: 'module',
    })
    workerRef.current.onmessage = (event) => {
      setPrices((prev) => {
        const newState = { ...prev, ...event.data }
        return newState
      })
    }
    workerRef.current.onerror = (error) => {
      console.error('워커 오류:', error)
    }
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate()
      }
    }
  }, [])

  const startWorker = () => {
    setStatus('실행 중')

    const workerMessage: WorkerMessageT<CryptoWorkConfigT> = {
      type: 'init',
      payload: {
        data: {
          assets: 'bitcoin,ethereum,monero,litecoin',
        },
      },
    }
    if (workerRef.current) {
      workerRef.current.postMessage(workerMessage)
    }
  }

  const stopWorker = () => {
    setStatus('중지됨')
    const workerMessage: WorkerMessageT<CryptoWorkConfigT> = {
      type: 'stop',
    }
    if (workerRef.current) {
      workerRef.current.postMessage(workerMessage)
    }
  }

  const terminateWorker = () => {
    setStatus('종료됨')
    const workerMessage: WorkerMessageT<CryptoWorkConfigT> = {
      type: 'stop',
    }
    if (workerRef.current) {
      workerRef.current.postMessage(workerMessage)
      workerRef.current.terminate()
    }
  }

  return (
    <section className={styles.page}>
      <Card size="large" classProp={styles.card}>
        <div className="mb-40 gap-12">
          <Button onClick={startWorker} text="스트림 시작" />
          <Button
            onClick={stopWorker}
            text="스트림 중지"
            category="primary_outline"
          />
          <Button
            icon="trash"
            onClick={terminateWorker}
            text="워커 종료"
            category="primary_clear"
          />
        </div>
        <div>
          <h2 className="heading-md mb-12">데이터 스트림: {status}</h2>
          <p className="mb-40 body-sm">
            이 페이지는 CoinCap.io에서 암호화폐 가격을 스트리밍하는 웹 워커를 사용합니다. "스트림 시작" 버튼을 클릭하면 워커가 시작되고 "스트림 중지" 버튼을 클릭하면 워커가 중지됩니다.
          </p>
          <div className="gap-12 flex-column">
            {Object.keys(prices).map((key) => {
              const price = prices[key as keyof CryptoDataT]
              return (
                <div key={key}>
                  <span className="mr-12 capitalize">{key}:</span>
                  <span className={`${!price && 'opacity-20'}`}>
                    {price ? '$' + price : initPrice}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </Card>
    </section>
  )
}

export default page
```

<div class="content-ad"></div>

우선, useEffect에서 웹 워커를 생성하고 해당 이벤트를 구독했습니다(JSON 파일 경로는 /public 디렉토리에 컴파일될 파일로 지정해야 합니다). onmessage 이벤트에서 컴포넌트 상태를 업데이트하여 가장 최신의 암호화폐 가격을 반영하도록 했습니다. JSX에서는 웹 워커를 켜는 버튼을 만들었지만, useEffect에서 페이지 로드 시 프로세스를 시작하는 방법도 있습니다.

클릭 핸들러 "startWorker", "stopWorker", "terminateWorker"에 추가 기능이 있습니다. 이 핸들러는 필수 사항은 아니지만 기능을 조직하는 좋은 방법이라고 생각했습니다. 이들의 이름은 수행하는 작업이 명확하지만, 메시지의 "유형"을 잘 고려하면 웹 워커 통신을 더 예측 가능하게 만들 수 있다는 것을 다시 한 번 살펴보시면 더 나은 이해가 될 것입니다.

# 결론

이 예제 이외에도 더 흥미로운 용도로 웹 워커를 사용할 수 있지만, 이 소개가 개념을 파악하는 데 도움이 되었으면 좋겠습니다. 혹시 저와 같이 Next.js에서 웹 워커를 사용하는 데 어려움을 겪었다면, 이것이 적어도 올바른 방향으로 가도록 도움이 될 것입니다.