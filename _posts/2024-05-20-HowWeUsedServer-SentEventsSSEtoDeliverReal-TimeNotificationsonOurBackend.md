---
title: "백엔드에서 Server-Sent EventsSSE로 실시간 알림을 전달하는 방법"
description: ""
coverImage: "/assets/img/2024-05-20-HowWeUsedServer-SentEventsSSEtoDeliverReal-TimeNotificationsonOurBackend_0.png"
date: 2024-05-20 22:16
ogImage: 
  url: /assets/img/2024-05-20-HowWeUsedServer-SentEventsSSEtoDeliverReal-TimeNotificationsonOurBackend_0.png
tag: Tech
originalTitle: "How We Used Server-Sent Events (SSE) to Deliver Real-Time Notifications on Our Backend"
link: "https://medium.com/trendyol-tech/how-we-used-server-sent-events-sse-to-deliver-real-time-notifications-on-our-backend-ebae41d3b5cb"
---


판매자 성장팀으로서, 우리의 업무에는 판매자들의 시스템과의 상호작용을 향상시키기 위해 고안된 작업들로 구성된 다양한 도전 과제를 지정, 추적 및 관리하는 것이 포함되어 있습니다.

우리의 최신 목표는 새로운 작업 지정 또는 완료시에 즉각적인 알림을 판매자들에게 제공하는 것입니다. 이를 달성하기 위해 HTTP 폴링, Server-Sent Events (SSE), 그리고 웹 소켓이라는 세 가지 잠재적인 옵션을 탐색했습니다.

이 글에서는 알림 시스템으로 SSE (Server-Sent Events)를 사용하기로 결정한 이유에 대해 논의할 것입니다. 우리가 고려한 다른 옵션들보다 SSE의 장점을 알아보고, NestJS 프레임워크를 사용한 TypeScript 코드의 명확한 예시를 제공할 것입니다.

![이미지](/assets/img/2024-05-20-HowWeUsedServer-SentEventsSSEtoDeliverReal-TimeNotificationsonOurBackend_0.png)

<div class="content-ad"></div>

# 사용한 기술 소개

실시간 알림 시스템을 구현하기 위해 다음을 사용했습니다:

- Server-Sent Events (SSE): 실시간 및 일방향 채널을 서버와 클라이언트 간에 수립하는 데 SSE를 사용합니다. 이를 통해 알림을 발생 즉시 전달할 수 있습니다. SSE는 가벼우면서도 직관적인 솔루션이며, 우리의 요구에 맞는 알림을 클라이언트로 푸시할 때 사용합니다.
- Redis Pub/Sub: Redis pub/sub을 사용하여 다중 발행자가 다중 구독자에게 메시지를 보낼 수 있는 메시징 시스템으로 활용합니다. Redis pub/sub을 사용하여 알림을 다중 파드로 분산 배포함으로써 모든 판매자가 제때 알림을 받을 수 있도록 보장했습니다.
- Notification Write API: 다른 응용 프로그램에서 알림을 수집하기 위해 알림 쓰기 API를 개발했습니다. 이 API는 알림을 Redis로 전송합니다.
- Notification Read API: Redis를 구독하고 모든 알림을 수신하는 알림 읽기 API도 개발했습니다. 알림을 수신한 후, 읽기 API는 SSE를 통해 연결된 클라이언트에게 알림을 전송합니다.

## 왜 SSE를 선택했는가

<div class="content-ad"></div>

신중한 고려 끝에 SSE가 알림 시스템에 최적인 옵션이라고 결정했습니다. 이 결정의 주요 이유 중 하나는 HTTP 폴링이 가능한 옵션이지만 즉각적인 알림 전달을 제공하지 않는다는 것입니다. 폴링은 서버가 새 이벤트를 확인하기 위해 일정 간격마다 터치되어야 하며 많은 사용자가 알림에 구독되어있는 경우에는 자원을 많이 사용하고 비효율적일 수 있습니다.

그에 비해 SSE는 서버와 클라이언트 사이의 실시간 단방향 채널을 제공하여 발생하는 즉시 알림을 즉시 전달할 수 있습니다. 이는 판매자가 즉시 알림을 받을 수 있도록 해야 하는 우리의 사용 사례에 있어서 중요합니다.

웹 소켓이 실시간 통신에 대한 인기 있는 선택지이긴 하지만, SSE에 비해 구현이 더 복잡합니다. 웹 소켓은 서버와 클라이언트 간의 양방향 통신을 제공하여 전체 이중 통신이 가능합니다. 하지만 우리는 클라이언트로 알림을 푸시하는 것만 필요하기 때문에 SSE를 더 간단하고 효율적인 솔루션으로 선택했습니다.

요약하면, 시간당 실시간 알림을 제공하고 웹 소켓에 비해 더 간단하고 가벼운 솔루션인 SSE를 사용하기로 결정했습니다.

<div class="content-ad"></div>

## Redis Pub/Sub

여러 응용 프로그램 팟에서 알림을 보내기 위해 Redis pub/sub을 사용했습니다. Redis pub/sub은 여러 발행자가 여러 구독자에게 메시지를 보낼 수 있는 메시징 시스템입니다. Redis pub/sub을 사용하여 알림을 여러 팟에 분산하여, 판매자가 모든 알림을 제때 받을 수 있도록 했습니다.

```js
import { Redis } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit {

  ...

  async onModuleInit() {
    this.subscriber = new Redis({
      sentinels: this.redisSentinelConfig.addresses,
      name: this.redisSentinelConfig.masterName,
      password: this.redisSentinelConfig.password,
    });
    
    await this.subscriber.subscribe(this.redisSentinelConfig.channelName, async (err, count) => {
      if (err) {
        this.logger.error(`Failed to subscribe: ${err.message}`);
        return;
      }
      this.logger.log(`Subscribed successfully! This client is currently subscribed to ${count} channels`);
    });
    
    this.subscriber.on('message', async (channel, message: string) => {
      const liveNotification: LiveNotification = JSON.parse(message);
      await this.liveNotificationService.emit(liveNotification);
    });
  }
}
```

# 시스템 디자인

<div class="content-ad"></div>

다른 애플리케이션으로부터 알림을 수집하기 위해 알림 작성 API를 개발했습니다. 이 API는 알림을 Redis로 전송합니다. 알림 읽기 API는 Redis를 구독하고 모든 알림을 수신합니다. 알림을 수신한 후 읽기 API는 SSE를 통해 연결된 클라이언트에게 알림을 전송합니다.

다양한 읽기 API가 서로 다른 애플리케이션 팟에서 실행될 수 있기 때문에 각 읽기 API는 Redis에서 모든 알림을 수신합니다. 그러나 읽기 API는 현재 팟에 연결된 클라이언트에 따라 알림을 필터링합니다. 이렇게 함으로써 연결된 각 클라이언트에게는 관련 알림만 전송되어 네트워크로 전송되는 불필요한 데이터 양을 최소화합니다.

판매자를 위해 Redis pub/sub를 통해 발행된 알림이 모든 읽기 API 인스턴스에 수신됩니다. 그러나 모든 알림이 모든 연결된 클라이언트에게 관련이 있는 것은 아닙니다. 연결된 각 클라이언트에게는 관련 알림만 전송되도록 하기 위해 읽기 API는 클라이언트의 구독에 따라 알림을 필터링합니다.

[2024-05-20-HowWeUsedServer-SentEventsSSEtoDeliverReal-TimeNotificationsonOurBackend_1.png] 를 참고하세요.

<div class="content-ad"></div>

table 태그를 Markdown 형식으로 변경하십시오.

```js
import { AuthGuard } from '@nestjs/passport';
import { Controller, Sse, UseGuards } from '@nestjs/common';

@Controller('/live-notification')
export class LiveNotificationController {
  constructor(private readonly liveNotificationService: LiveNotificationService) {}

  @Sse()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  public getEventsBySeller(@Tracers() tracers: ITracers, @SellerId() sellerId: number) {
    return this.liveNotificationService.subscribeForSeller(sellerId);
  }
}
```

```js
import { EventEmitter } from 'events';
import { filter, fromEvent } from 'rxjs';

@Injectable()
export class LiveNotificationService implements OnModuleInit {
  
  private readonly emitter = new EventEmitter();
  
  ...
  
  public async emit(data: LiveNotification) {
    this.emitter.emit('liveNotification', { data });
  }
  
  public subscribeForSeller(sellerId: number) {
    const source = fromEvent(this.emitter, 'liveNotification');
    return source.pipe(
      filter(({ data: liveNotification }) => 
        liveNotification?.content == 'heartbeat' || 
        liveNotification?.sellerId == sellerId)
    );
  }
}
```

# 문제점

## 수직 확장 문제

<div class="content-ad"></div>

우리의 SSE와 Redis 기반 알림 시스템은 연결된 클라이언트에 신속하고 효율적으로 알림을 전달합니다. 그러나 알림이 증가함에 따라 모든 읽기 API가 모든 알림을 구독하기 때문에 시스템에서 잠재적인 수직 확장 문제가 예상됩니다. 이는 시스템에서 잠재적 병목 현상을 일으킬 수 있습니다. 판매자를 위해 Redis pub/sub를 통해 알림이 발행되면 읽기 API의 모든 인스턴스에서 받게 되지만, 모든 알림이 모든 연결된 클라이언트에게 관련이 있는 것은 아닙니다. 각 연결된 클라이언트에게는 관련 있는 알림만 전송되도록 하기 위해 읽기 API에서 고객의 구독에 따라 알림을 필터링합니다. 알림의 수가 많아지면 이 필터링 과정이 느려져 알림 전송이 지연될 수 있습니다.

## 하트비트 메시지

우리 프론트엔드 개발자들은 권한 부여 헤더를 보내기 위해 이벤트 소스 라이브러리를 사용했습니다. 그러나 서버와 브라우저 간 연결이 1분 후에 끊어진다고 보고했습니다. 문제를 조사한 후 라이브러리가 끊김을 감지하기 위해 하트비트 메시지를 보내도록 요구함을 깨닫게 되었습니다. 문제를 해결하기 위해 30초마다 하트비트 메시지를 보내는 기능을 구현하여 문제를 해결했습니다.

```js
onModuleInit(): any {
  setInterval(() => {
    const emitterListenerCount = this.emitter.listenerCount('liveNotification');
    this.logger.log(`활성 에미터 리스너 수를 가진 SSE 클라이언트로 하트비트 메시지를 보냈습니다: ${emitterListenerCount}`);
    this.emitter.emit('liveNotification', { data: { content: 'heartbeat' } });
  }, 30000);
}
```

<div class="content-ad"></div>

# 성능

현재 알림 시스템은 90,000개의 동시 연결을 처리하고 있으며, 우리는 15개의 팟을 운영 중이며 부하를 처리하고 있습니다. 각 Kubernetes 팟은 약 800MB의 메모리와 300Mi의 CPU 리소스를 소비합니다.

# 요약

서버-센트 이벤트(SSE)는 실시간 알림 전달 기능을 제공하면서 웹 소켓과 비교해 더 간단하고 가벼운 솔루션으로 입증되었습니다. Redis pub/sub를 사용하여 알림을 여러 팟에 분산하여 모든 클라이언트가 제때 알림을 수신하도록 보장했습니다. SSE 기반의 알림 시스템을 통해 우리는 클라이언트에게 알림을 효과적으로 전달하는 안정적이고 효율적인 솔루션을 성공적으로 구축했습니다.

<div class="content-ad"></div>

프론트엔드 세부 정보와 구현에 대해 좀 더 알고 싶다면, 제 동료가 쓴 기사를 읽어보시기를 추천합니다.