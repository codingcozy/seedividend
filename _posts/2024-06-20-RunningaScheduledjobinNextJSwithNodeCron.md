---
title: "NextJS에서 Node Cron을 사용해 예약 작업 실행하기"
description: ""
coverImage: "/assets/img/2024-06-20-RunningaScheduledjobinNextJSwithNodeCron_0.png"
date: 2024-06-20 01:35
ogImage: 
  url: /assets/img/2024-06-20-RunningaScheduledjobinNextJSwithNodeCron_0.png
tag: Tech
originalTitle: "Running a Scheduled job in NextJS with Node Cron"
link: "https://medium.com/@farmaan30327/running-a-scheduled-job-in-nextjs-with-node-cron-77f0433a713b"
---


![2024-06-20-RunningaScheduledjobinNextJSwithNodeCron](/assets/img/2024-06-20-RunningaScheduledjobinNextJSwithNodeCron_0.png)

Next.js에서 Cron 작업을 소개합니다. Vercel Cron과 같은 외부 서비스를 의존하지 않고 Next.js 프레임워크 내에서 예약된 작업을 통합하는 주제입니다. Cron 작업은 데이터 가져오기, 이메일 알림, 또는 웹 애플리케이션에서 시스템 유지보수와 같은 반복적인 작업을 자동화하는 데 중요한 역할을 합니다. Vercel은 내장된 cron과 유사한 기능을 제공하지만 Next.js 내에서 cron 작업을 직접 구현하는 방법을 이해하면 애플리케이션의 예약된 작업에 더 많은 유연성과 제어를 제공할 수 있습니다. 이 블로그 포스트에서는 cron 작업의 기본 원리를 살펴보고 Node.js를 사용하여 Next.js 프로젝트에 이를 원활하게 통합하는 방법을 보여드리겠습니다. 함께 알아보겠습니다!

**단계 1**

필요한 패키지를 설치하세요.

<div class="content-ad"></div>

```js
npm i node-cron
```

단계 2

서버.js 설정

```js
const express = require('express');
const next = require('next');
const axios = require('axios');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

//
const http = require('http');
const socketIO = require('socket.io');
//

app.prepare().then(async () => {
    const server = express();
    const httpServer = http.createServer(server);

    // 스케줄러
    const runScheduler = async () => {
        try {
            const response = await axios.post(`${당신의_기본_URL}/api/services/scheduler`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
        } catch (error) {
            console.log(error)
        }
    }

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    const PORT = process.env.PORT || 3000;
    httpServer.listen(PORT, () => {
        console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);

        runScheduler();
    });
});
```

<div class="content-ad"></div>

스텝 3

'api/services/scheduler' 경로에 라우트를 생성하세요.

```js
import { NextResponse } from "next/server";

var cron = require('node-cron');

export async function POST(req, res) {

    try {

        cron.schedule('*/20 * * * *', async () => {

            console.log('')
            console.log('######################################')
            console.log('#                                    #')
            console.log('# 매 20분마다 스케줄러 실행됨              #')
            console.log('#                                    #')
            console.log('######################################')
            console.log('')

            // 여기에서 작업을 수행하세요
        });

        return NextResponse.json({ data: '성공', status: 200 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error }, { status: 500 })
    }

}
```

- 크론 타이밍은 Crontab.guru를 통해 설정할 수 있습니다. — 크론 스케줄 표현식 생성기

<div class="content-ad"></div>

Next.js에서 cron 작업을 구현하는 것을 살펴봐 주셔서 감사합니다. 이 가이드가 Next.js 애플리케이션에서 예약 작업을 활용하는 데 유용한 통찰을 제공했기를 바랍니다. 궁금한 점이 있거나 도전에 직면하거나 단순히 생각을 공유하고 싶다면 망설이지 말고 연락해 주세요. 귀하의 피드백은 저희에게 매우 소중합니다. 귀하와 같은 개발자들을 위해 콘텐츠를 만들어 가는 데 큰 영감을 받습니다. 즐거운 코딩하세요!

참고 자료

- node-cron — npm (npmjs.com)