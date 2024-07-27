---
title: "JavaScript에서 웹 브라우저가 접근 불가능할 때 카운터 상태를 유지하는 가장 쉬운 방법localStorage에서 재생성"
description: ""
coverImage: "/assets/img/2024-05-14-TheeasiestwaytokeepcounterstateafterwebbroswerisnotaccessiblerehydrateitfromlocalStorageinJavaScript_0.png"
date: 2024-05-14 12:58
ogImage: 
  url: /assets/img/2024-05-14-TheeasiestwaytokeepcounterstateafterwebbroswerisnotaccessiblerehydrateitfromlocalStorageinJavaScript_0.png
tag: Tech
originalTitle: "The easiest way to keep counter state after web broswer is not accessible (rehydrate it from localStorage) in JavaScript"
link: "https://medium.com/@guilherme-de-oliveira/the-easiest-way-to-keep-counter-state-after-web-broswer-is-not-accessible-rehydrate-it-from-62d6e309acbf"
---


최근 QA 팀에서 흥미로운 질문을 받았어요. 그 질문은, 왜 우리 이메일 토큰 카운터가 그들이 컴퓨터를 절전 상태로 변경할 때 멈추는지였어요? 처음에는 웹 브라우저가 실행 중이 아니면 우리의 JavaScript 애플리케이션이 작동하지 않는다는 일반적인 가정을 공유했어요. 하지만 그들의 우려는 사용자가 시간을 조작하여 이메일로 토큰을 다시 보낼 수 있는 보안 문제로 유효한 지점을 제기했어요.

아래는 문제가 된 기능인데요, 시작시간이 5분이고 토큰이 만료될 때까지 0으로 감소하는 간단한 카운터였어요. 중요한 점은 모든 논리가 백엔드에서 처리되었고, 프론트엔드는 단순히 카운터의 시각적인 표현을 담당했다는 것이었어요.

팀원 중 한 명이 작성한 카운터 코드의 간단한 부분이에요:



```js
class TimeCounter {
    minutes = null
    seconds = null
    dateStored = null
    minutesStored = null
    secondsStored = null

    constructor(minutes = 0, seconds = 0) {
        this.minutes = minutes
        this.seconds = seconds
    }

    start() {
        this.saveTimer()
        this.timer = setInterval(() => {
            this.callback()
        }, 1000)
    }

    stop() {
        clearInterval(this.timer)
    }

    callback() {
        if(this.minutes === 0 && this.seconds === 0) {
            this.stop() // Stop counter
            return
        }

        if (this.seconds === 0) {
            this.seconds = 59
            this.minutes--
        } else {
            this.seconds--
        }
    }
}
```

문제점

사용자가 컴퓨터를 절전하여 카운터를 중지할 수 있습니다. 다시 작동시킬 때 타이머는 중단한 지점부터 다시 시작하여 사용자가 토큰 유효기간을 효과적으로 연장할 수 있습니다.

해결책 — 로컬스토리지



이 문제에 대처하기 위해 LocalStorage를 활용한 해결책을 구현했습니다. 콜백 메서드가 호출될 때마다 현재 분, 초, 타임스탬프를 저장했습니다. 이 타임스탬프를 현재 시간과 비교하여 어떤 차이가 있는지 감지하여 토큰 만료 로직이 유지되도록 했습니다.

![이미지](/assets/img/2024-05-14-TheeasiestwaytokeepcounterstateafterwebbroswerisnotaccessiblerehydrateitfromlocalStorageinJavaScript_1.png)

이제 해결책을 적용한 코드입니다:

```js
class TimeCounter {
    minutes = null
    seconds = null
    dateStored = null
    minutesStored = null
    secondsStored = null

    constructor(minutes = 0, seconds = 0) {
        this.minutes = minutes
        this.seconds = seconds
    }

    start() {
        this.saveTimer()
        this.timer = setInterval(() => {
            this.callback()
        }, 1000)
    }

    stop() {
        clearInterval(this.timer)
    }

    saveTimer() {
        const timeElapsed = Date.now();

        if (timeElapsed != 0) {
            localStorage.setItem('dateStored', timeElapsed)
            localStorage.setItem('minutes', this.minutes)
            localStorage.setItem('seconds', this.seconds)
        }
    }

    getTimer() {
        this.dateStored = Number(localStorage.getItem('dateStored'))
        this.minutesStored = Number(localStorage.getItem('minutes')) 
        this.secondsStored = Number(localStorage.getItem('seconds'))   
    }

    checkDifference() {
        this.getTimer()

        const nowElapsed = Date.now();
        const diff = nowElapsed - this.dateStored
        
        // check if time is 5 seconds late compared to stored
        if (diff > 5000) {
            this.setCurrentTimer(diff)
        }
    }

    setCurrentTimer(diff) {
        const elapsedStored = (this.minutesStored * 60000) + (this.secondsStored * 1000)
        const currentTimeLeft = elapsedStored - diff
        const now = new Date(currentTimeLeft)
        const minutes = now.getMinutes()
        const seconds = now.getSeconds()

        if (minutes > tokenTimersEnum.VALIDATION_MINUTES) {
            this.minutes = 0
            this.seconds = 0
        } else {
            this.minutes = minutes
            this.seconds = seconds
        }
    }


    callback() {
        this.checkDifference()

        if(this.minutes === 0 && this.seconds === 0) {
            this.stop()
            return
        }

        if (this.seconds === 0) {
            this.seconds = 59
            this.minutes--
        } else {
            this.seconds--
        }
        
        this.saveTimer()
    }
}
```



요약

LocalStorage는 사용자 브라우저 내에서 데이터를 지속시키는 데 유용한 도구로 입증되었습니다. 이를 활용함으로써 토큰 만료 메커니즘의 무결성을 유지할 수 있었고, 시간을 조작하려는 사용자의 시도가 있더라도 문제없이 작동했습니다.

프론트엔드 처리나 동작이 중요한 유사한 상황에서는 LocalStorage 솔루션을 고려하는 것이 유익할 수 있으며, 원활하고 안전한 사용자 경험을 보장할 수 있습니다.