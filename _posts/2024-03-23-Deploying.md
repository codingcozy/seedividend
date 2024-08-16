---
title: "Nextjs 13 프로젝트 프로덕션 배포 하기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "배포하기"
link: "undefined"
isUpdated: true
---





# 배포하기

축하합니다, 이제 프로덕션 환경으로 상품을 출시할 시간입니다.

Next.js를 Vercel에서 관리된 서비스로 배포하거나 Node.js 서버, Docker 이미지 또는 정적 HTML 파일에 직접 호스팅할 수 있습니다. next start를 사용하여 배포할 때는 모든 Next.js 기능이 지원됩니다.

## 프로덕션 빌드

<div class="content-ad"></div>

`next build` 명령을 실행하면 프로덕션용으로 최적화된 애플리케이션 버전이 생성됩니다. 페이지에 기반하여 HTML, CSS 및 JavaScript 파일이 생성됩니다. JavaScript는 컴파일되고 브라우저 번들은 최적화되어 최상의 성능을 제공하며 모든 최신 브라우저를 지원하기 위해 Next.js 컴파일러를 사용합니다.

Next.js는 관리 및 자체 호스팅되는 Next.js에서 사용되는 표준 배포 출력물을 생성합니다. 이렇게 함으로써 배포 방법에 상관 없이 모든 기능이 지원됨이 보장됩니다. 앞으로의 주요 버전에서는 이 출력물을 빌드 출력 API 사양으로 변환할 것입니다.

## Vercel을 이용한 Managed Next.js

Vercel은 Next.js의 창조자 및 유지자로서 Next.js 애플리케이션을 위한 관리 인프라 및 개발자 경험 플랫폼을 제공합니다.

<div class="content-ad"></div>

Vercel로 배포하는 것은 구성이 필요 없으며 전 세계적으로 확장 가능성, 가용성 및 성능을 향상시키는 추가 기능을 제공합니다. 그러나 Next.js의 모든 기능은 자체 호스팅 시에도 지원됩니다.

Vercel에서 Next.js에 대해 더 알아보기
또는 무료로 템플릿을 배포하여
시도해 보세요.

## 자체 호스팅

Next.js를 세 가지 다른 방법으로 자체 호스팅할 수 있습니다:

<div class="content-ad"></div>

- 노드.js 서버
- 도커 컨테이너
- 정적 익스포트

### 노드.js 서버

Next.js는 노드.js를 지원하는 모든 호스팅 공급업체에 배포할 수 있습니다. package.json 파일에 "build" 및 "start" 스크립트가 있는지 확인하세요:

```js
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

<div class="content-ad"></div>

그럼 `npm run build`를 실행하여 애플리케이션을 빌드하세요. 마지막으로 `npm run start`를 실행하여 Node.js 서버를 시작하세요. 이 서버는 모든 Next.js 기능을 지원합니다.

### 도커 이미지

Next.js는 Docker 컨테이너를 지원하는 모든 호스팅 공급업체에 배포할 수 있습니다. 쿠버네티스와 같은 컨테이너 오케스트레이터에 배포하거나 클라우드 공급업체의 컨테이너 내에서 실행할 때 이 접근 방식을 사용할 수 있습니다.

- 자신의 컴퓨터에 Docker를 설치하세요.
- 우리의 예제(또는 다중 환경 예제)를 복제하세요.
- 컨테이너를 빌드하세요: `docker build -t nextjs-docker .`
- 컨테이너를 실행하세요: `docker run -p 3000:3000 nextjs-docker`

<div class="content-ad"></div>

Docker를 통해 Next.js는 모든 Next.js 기능을 지원합니다.

### 정적 HTML 익스포트

Next.js는 정적 사이트 또는 Single-Page Application (SPA)로 시작하여 나중에 서버를 필요로하는 기능을 사용하는 것으로 선택적으로 업그레이드할 수 있게 해줍니다.

Next.js는 이 정적 익스포트를 지원하기 때문에 HTML/CSS/JS 정적 에셋을 제공할 수 있는 모든 웹 서버에 배포하고 호스팅할 수 있습니다. 이에는 AWS S3, Nginx 또는 Apache와 같은 도구가 포함됩니다.

<div class="content-ad"></div>

정적 익스포트로 실행하면 서버가 필요한 Next.js 기능을 지원할 수 없습니다. 자세한 내용은 링크를 확인해보세요.

> 알아 두면 좋은 사실:
> 서버 구성 요소는 정적 익스포트로 지원됩니다.

## 기능

### 이미지 최적화

<div class="content-ad"></div>

next/image를 통해 이미지 최적화는 next start를 사용하여 배포할 때 자체 호스팅되며 구성이 없이 작동합니다. 이미지를 최적화하는 별도 서비스를 원하시는 경우 이미지로더를 구성할 수 있습니다.

이미지 최적화는 next.config.js에서 사용자 정의 이미지로더를 정의하여 정적 익스포트에서 사용할 수 있습니다. 이미지는 빌드하는 동안이 아닌 실행시 최적화됩니다.

> 알아 두면 좋은 사항:
> 자체 호스팅 시, 프로덕션 환경에서 성능 최적화된 이미지를 위해 프로젝트 디렉터리에서 npm install sharp를 실행하여 sharp를 설치하는 것이 좋습니다. Linux 플랫폼에서는 sharp가 과도한 메모리 사용을 방지하기 위해 추가 구성이 필요할 수 있습니다.
> 최적화된 이미지의 캐싱 동작 및 TTL을 구성하는 방법에 대해 더 알아보세요.
> 또한 원하는 경우 next/image를 사용하여 다른 혜택은 유지하면서 이미지 최적화를 비활성화할 수도 있습니다. 예를 들어, 이미지 최적화를 따로 수행할 경우입니다.

### 미들웨어

<div class="content-ad"></div>

미들웨어는 `next start`를 사용하여 배포할 때 영 제로 구성으로 self-hosted로 작동합니다. 들어오는 요청에 액세스 권한이 필요하기 때문에 정적 익스포트를 사용할 때는 지원되지 않습니다.

미들웨어는 응용 프로그램의 모든 경로나 에셋 앞에서 실행될 수 있기 때문에 낮은 대기 시간을 보장하기 위해 모든 사용 가능한 Node.js API의 하위 집합을 사용하는 런타임을 사용합니다. 이 런타임은 "에지"에서 실행할 필요가 없으며 단일 지역 서버에서 작동합니다. 미들웨어를 여러 지역에서 실행하려면 추가 구성 및 인프라가 필요합니다.

만약 모든 Node.js API를 필요로 하는 로직(또는 외부 패키지 사용)을 추가하려고 한다면 이 로직을 서버 컴포넌트로 레이아웃에 이동할 수도 있습니다. 예를 들어, 헤더 확인 및 리디렉션 작업과 같은 것이 있습니다. 또한 `next.config.js`를 통해 헤더, 쿠키 또는 쿼리 매개변수를 사용하여 리디렉션 또는 재작성할 수 있습니다. 그래도 작동하지 않는 경우에는 사용자 지정 서버를 사용할 수도 있습니다.

### 환경변수

<div class="content-ad"></div>

Next.js는 빌드 타임과 런타임 환경 변수를 모두 지원할 수 있어.

기본적으로 환경 변수는 서버에서만 사용할 수 있어. 브라우저에 환경 변수를 노출시키려면 NEXT*PUBLIC*로 접두사를 붙여야 해. 그러나 이러한 공개 환경 변수들은 next 빌드 중에 JavaScript 번들에 인라인으로 포함돼.

런타임 환경 변수를 읽기 위해서는 getServerSideProps 또는 App Router를 증분적으로 채택하는 것을 권장해. App Router를 사용하면 동적 렌더링 중 서버에서 환경 변수를 안전하게 읽을 수 있어. 이를 통해 여러 환경에 대해 다른 값으로 승격할 수 있는 단일 Docker 이미지를 사용할 수 있어.

```js
import { unstable_noStore as noStore } from 'next/cache';

export default function Component() {
  noStore();
  // cookies(), headers() 및 기타 동적 함수들
  // 또한 동적 렌더링을 사용하게 되며,
  // 이 환경 변수는 런타임에 평가됨
  const value = process.env.MY_VALUE
  ...
}
```

<div class="content-ad"></div>

> 알면 좋아요:  
> 서버 시작 시 register 함수를 사용하여 코드를 실행할 수 있습니다.  
> runtimeConfig 옵션을 사용하는 것을 권장하지 않습니다. 이 옵션은 독립 실행 모드와 호환되지 않습니다. 대신 App Router를 점진적으로 도입하는 것을 권장합니다.

### 캐싱 및 ISR

Next.js는 응답, 생성된 정적 페이지, 빌드 출력물 및 이미지, 글꼴 및 스크립트와 같은 기타 정적 자산을 캐시할 수 있습니다.

페이지의 캐싱 및 재유효화 (증분적 정적 재생성(ISR) 또는 App Router의 최신 기능 사용)은 동일한 공유 캐시를 사용합니다. 기본적으로 이 캐시는 Next.js 서버의 파일 시스템(디스크)에 저장됩니다. 이는 Pages와 App Router를 모두 사용하여 자체 호스팅하는 경우에 자동으로 작동합니다.

<div class="content-ad"></div>

Next.js 캐시 위치를 구성할 수 있습니다. 이렇게 하면 캐시된 페이지와 데이터를 내구성 있는 저장소에 유지하거나 Next.js 애플리케이션의 여러 컨테이너 또는 인스턴스에서 캐시를 공유할 수 있습니다.

#### 자동 캐싱

- Next.js는 공개 캐시 제어 헤더를 public, max-age=31536000, immutable로 설정하여 진정으로 불변한 자산을 만듭니다. 이는 재정의할 수 없습니다. 이러한 불변 파일은 파일 이름에 SHA 해시를 포함하므로 영구적으로 안전하게 캐시될 수 있습니다. 예를 들어, 정적 이미지 가져오기입니다. 이미지의 TTL을 구성할 수 있습니다.
- 증분형 정적 재생성(ISR)은 s-maxage: `getStaticProps에서 revalidate`, stale-while-revalidate 캐시 제어 헤더를 설정합니다. 이 재검증 시간은 getStaticProps 함수에서 초 단위로 정의됩니다. revalidate: false를 설정하면 기본적으로 일년 캐시 기간으로 설정됩니다.
- 동적으로 렌더링된 페이지는 사용자별 데이터가 캐시되지 않도록 방지하기 위해 private, no-cache, no-store, max-age=0, must-revalidate 캐시 제어 헤더를 설정합니다. 이는 앱 라우터와 페이지 라우터 둘 다에 적용됩니다. 드래프트 모드도 포함됩니다.

#### 정적 자산

<div class="content-ad"></div>

만약 정적 자산을 다른 도메인이나 CDN에 호스팅하려면 next.config.js 파일에서 assetPrefix 구성을 사용할 수 있어요. Next.js는 JavaScript 또는 CSS 파일을 가져올 때 이 asset 접두사를 사용할 거예요. 자산을 다른 도메인으로 분리하면 DNS 및 TLS 해결에 추가적인 시간이 필요할 수 있어요.

assetPrefix에 대해 더 알아보기

#### 캐싱 구성하기

기본적으로 생성된 캐시 자산은 메모리 (기본값: 50MB) 및 디스크에 저장될 거예요. 만약 Kubernetes와 같은 컨테이너 오케스트레이션 플랫폼을 사용해 Next.js를 호스팅하고 있다면, 각 파드에 캐시의 복사본이 생성될 거예요. 기본적으로 팟 간에 캐시가 공유되지 않기 때문에 오래된 데이터가 표시되는 것을 방지하기 위해 캐시 핸들러를 제공하고 메모리 내 캐싱을 비활성화할 수 있어요.

<div class="content-ad"></div>

셀프 호스팅 시 ISR/데이터 캐시 위치를 구성하려면 next.config.js 파일에서 사용자 정의 핸들러를 구성할 수 있습니다.

```js
module.exports = {
  cacheHandler: require.resolve("./cache-handler.js"),
  cacheMaxMemorySize: 0, // 기본 인메모리 캐싱 비활성화
};
```

그런 다음 프로젝트의 루트에 cache-handler.js를 만들어보세요.

```js
const cache = new Map();

module.exports = class CacheHandler {
  constructor(options) {
    this.options = options;
  }

  async get(key) {
    // 이곳에는 지속성 있는 저장소와 같이 저장될 수 있습니다.
    return cache.get(key);
  }

  async set(key, data, ctx) {
    // 이곳에는 지속성 있는 저장소와 같이 저장될 수 있습니다.
    cache.set(key, {
      value: data,
      lastModified: Date.now(),
      tags: ctx.tags,
    });
  }

  async revalidateTag(tag) {
    // 캐시 내 모든 항목 반복
    for (let [key, value] of cache) {
      // 값의 태그에 지정된 태그가 포함된 경우 해당 항목 삭제
      if (value.tags.includes(tag)) {
        cache.delete(key);
      }
    }
  }
};
```

<div class="content-ad"></div>

커스텀 캐시 핸들러를 사용하면 Next.js 애플리케이션을 호스팅하는 모든 pod 간 일관성을 유지할 수 있습니다. 예를 들어 Redis나 AWS S3와 같은 위치에 캐시된 값들을 저장할 수 있습니다.

> 알아 두면 좋은 사항:
> revalidatePath는 캐시 태그 위에 편리한 레이어입니다. revalidatePath를 호출하면 제공된 페이지에 대해 특별한 기본 태그와 함께 revalidateTag 함수가 호출됩니다.

### 캐시 빌드

Next.js는 next build 중에 ID를 생성하여 현재 제공되는 애플리케이션 버전을 식별합니다. 동일한 빌드를 사용하여 여러 컨테이너를 부팅하도록 해야 합니다.

<div class="content-ad"></div>

환경의 각 단계를 다시 빌드해야 하는 경우, 컨테이너 간에 사용할 일관된 빌드 ID를 생성해야 합니다. 다음과 같이 next.config.js 파일에서 generateBuildId 명령을 사용하십시오:

```js
module.exports = {
  generateBuildId: async () => {
    // 이 부분은 어떤 값이든 상관없습니다. 최신 git 해시 값을 사용하는 예시입니다.
    return process.env.GIT_HASH;
  },
};
```

### 버전 스큐

Next.js는 대부분의 버전 스큐를 자동으로 완화하며 감지되면 새로운 에셋을 가져오기 위해 애플리케이션을 자동으로 다시로드합니다. 예를 들어, 배포 ID에 불일치가 있는 경우 페이지 간 전환은 사전로드된 값 대신 하드 네비게이션을 수행합니다.

<div class="content-ad"></div>

애플리케이션이 다시 로드될 때, 페이지 이동 간에 상태가 지속되지 않도록 설계되어 있지 않으면 애플리케이션 상태가 손실될 수 있습니다. 예를 들어 URL 상태나 로컬 저장소를 사용하면 페이지 새로고침 후에도 상태가 지속될 수 있습니다. 그러나 useState와 같은 컴포넌트 상태는 이러한 페이지 이동에서 손실될 수 있습니다.

Vercel은 이전 버전의 에셋과 기능이 이전 버전의 클라이언트에서도 여전히 사용 가능하도록 Next.js 애플리케이션에 추가적인 왜곡 방지 기능을 제공합니다. 이를 통해 새 버전이 배포된 후에도 오래된 클라이언트에서 여전히 기능을 이용할 수 있습니다.

다음과 같이 next.config.js 파일에서 deploymentId 속성을 수동으로 구성하여 각 요청이 ?dpl 쿼리 문자열이나 x-deployment-id 헤더 중 하나를 사용하도록 할 수 있습니다.

## 수동 Graceful 종료

<div class="content-ad"></div>

셀프 호스팅할 때는, 서버가 SIGTERM 또는 SIGINT 신호로 종료될 때 코드를 실행하고 싶을 수 있습니다.

환경 변수 NEXT_MANUAL_SIG_HANDLE을 true로 설정하고, \_document.js 파일 내에서 해당 신호에 대한 핸들러를 등록할 수 있습니다. 이 환경 변수는 .env 파일이 아닌 package.json 스크립트에서 직접 등록해야 합니다.

> 참고: Manual signal handling은 next dev에서 사용할 수 없습니다.

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "NEXT_MANUAL_SIG_HANDLE=true next start"
  }
}
```

<div class="content-ad"></div>

```js
if (process.env.NEXT_MANUAL_SIG_HANDLE) {
  process.on("SIGTERM", () => {
    console.log("Received SIGTERM: cleaning up");
    process.exit(0);
  });
  process.on("SIGINT", () => {
    console.log("Received SIGINT: cleaning up");
    process.exit(0);
  });
}
```

<div class="content-ad"></div>
