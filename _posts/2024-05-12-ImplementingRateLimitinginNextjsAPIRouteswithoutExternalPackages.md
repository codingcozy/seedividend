---
title: "Nextjs API Routes에서 외부 패키지 없이 요청 속도 제한 설정하기"
description: ""
coverImage: "/assets/img/2024-05-12-ImplementingRateLimitinginNextjsAPIRouteswithoutExternalPackages_0.png"
date: 2024-05-12 18:52
ogImage: 
  url: /assets/img/2024-05-12-ImplementingRateLimitinginNextjsAPIRouteswithoutExternalPackages_0.png
tag: Tech
originalTitle: "Implementing Rate Limiting in Next.js API Routes without External Packages"
link: "https://medium.com/@abrar.adam.09/implementing-rate-limiting-in-next-js-api-routes-without-external-packages-7195ca4ef768"
isUpdated: true
---




---
이미지: /assets/img/2024-05-12-ImplementingRateLimitinginNextjsAPIRouteswithoutExternalPackages_0.png

속도 제한은 서버의 트래픽을 관리하고 과부하를 방지하며 악용으로부터 보호하는 중요한 측면입니다. Next.js API 라우트에 속도 제한을 구현하기 위한 패키지들이 있지만 외부 의존성에 의존하지 않고 이를 어떻게 달성할지 살펴보겠습니다. "고정 창 카운터" 접근 방식을 활용할 것인데, 이 방식은 특정 시간 간격 내에 발신자로부터 발생하는 요청 수를 기록합니다. 요청 수가 제한을 초과하면 해당 발신자로부터의 추가 요청은 거부됩니다.

# 속도 제한 미들웨어 구축하기

API 라우트를 위한 게이트키퍼로 작동하는 미들웨어 함수를 만들어봅시다. 이 함수는 단일 IP 주소가 지정된 시간 창 내에서 설정한 요청 제한을 초과하지 않도록 보장하여 서버의 안정성과 성능을 향상시킵니다.




앱 루트 디렉토리에 "middleware"라는 폴더를 만들고, 다음 코드가 포함된 "rateLimiter.js" 파일을 추가해주세요:

이제 레이트 제한을 구현하는 코드를 자세히 살펴보겠습니다:

```js
const rateLimitMap = new Map();

export default function rateLimitMiddleware(handler) {
    return (req, res) => {
        const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        const limit = 5; // IP 당 분당 요청 수를 5개로 제한
        const windowMs = 60 * 1000; // 1분
        
        if (!rateLimitMap.has(ip)) {
            rateLimitMap.set(ip, {
                count: 0,
                lastReset: Date.now(),
            });
        }
        
        const ipData = rateLimitMap.get(ip);
        
        if (Date.now() - ipData.lastReset > windowMs) {
            ipData.count = 0;
            ipData.lastReset = Date.now();
        }
        
        if (ipData.count >= limit) {
            return res.status(429).send("너무 많은 요청");
        }
        
        ipData.count += 1;
        
        return handler(req, res);
    };
}
```

# 구현



자, 이제 이 코드를 API 경로에 통합해 봅시다:

"limited.js"라는 경로를 생성하고 rateLimitMiddleware를 적용하세요. IP 주소가 제한을 초과하면 "너무 많은 요청" 상태 코드 (429)로 응답합니다.

```js
import rateLimitMiddleware from "@/middleware/rateLimiter";

function handler(req, res) {
  res.status(200).json({ name: "Limited, don't over use me!" });
}
export default rateLimitMiddleware(handler);
```

# 결론



이 문서에서는 외부 패키지에 의존하지 않고 Next.js API 라우트에서 요금 제한을 구현하는 방법을 살펴보았습니다. "고정 창 카운터" 방식을 활용하여 들어오는 요청을 효과적으로 관리하여 과부하를 방지하고 서버의 원활한 작동을 보장할 수 있습니다. 이 사용자 정의 솔루션은 특정 요구 사항에 맞게 유연하고 맞춤 설정할 수 있습니다. 그러니 안심하고 요금 제한을 Next.js 프로젝트에 통합하여 서버를 건강하고 반응적으로 유지하세요!

유용한 자원 코딩 도전

내 GitHub 저장소에서 전체 코드에 액세스해보세요.