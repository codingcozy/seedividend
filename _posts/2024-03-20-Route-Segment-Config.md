---
title: "Nextjs 14에서 라우트 세그먼트 구성 하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: ""
---



# Nextjs 14에서 라우트 세그먼트 구성 하는 방법

Route Segment 옵션을 사용하면 페이지, 레이아웃 또는 라우트 핸들러의 동작을 직접 설정할 수 있습니다. 다음 변수를 직접 내보내어 구성할 수 있습니다:

| Option                              | Type                                                                                                                                 | Default                |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| [dynamic](#dynamic)                 | `'auto'   \| 'force-dynamic'        \| 'error'      \| 'force-static'`                                                               | `'auto'`               |
| [dynamicParams](#dynamicparams)     | `boolean`                                                                                                                            | `true`                 |
| [revalidate](#revalidate)           | `false    \| 0                      \| number`                                                                                       | `false`                |
| [fetchCache](#fetchcache)           | `'auto'   \| 'default-cache'        \| 'only-cache' \| 'force-cache'   \| 'force-no-store' \| 'default-no-store' \| 'only-no-store'` | `'auto'`               |
| [runtime](#runtime)                 | `'nodejs' \| 'edge'`                                                                                                                 | `'nodejs'`             |
| [preferredRegion](#preferredregion) | `'auto'   \| 'global'               \| 'home'       \| string          \| string[]`                                                  | `'auto'`               |
| [maxDuration](#maxduration)         | `number`                                                                                                                             | 배포 플랫폼에서 설정함 |

```typescript
export const dynamic = "auto";
export const dynamicParams = true;
export const revalidate = false;
export const fetchCache = "auto";
export const runtime = "nodejs";
export const preferredRegion = "auto";
export const maxDuration = 5;

export default function MyComponent() {}
```

<div class="content-ad"></div>

> 좋은 정보:
> 현재 구성 옵션의 값은 정적으로 분석될 수 있어야 합니다. 예를 들어 revalidate = 600은 유효하지만 revalidate = 60 \* 10은 유효하지 않습니다.

## 옵션

### 동적

레이아웃이나 페이지의 동적 동작을 완전히 정적 또는 완전히 동적으로 변경합니다.

<div class="content-ad"></div>

```typescript
export const dynamic = "auto";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'
```

> 좋아요: 앱 디렉토리의 새 모델은 페이지 디렉토리의 getServerSideProps 및 getStaticProps의 이진 온오프 모델보다 가져오기 요청 수준에서 세밀한 캐싱 제어를 선호합니다. dynamic 옵션은 편의를 위해 이전 모델로 다시 돌아가는 방법이며 간단한 이전 경로를 제공합니다.

- `auto` (기본값): 모든 컴포넌트가 동적 동작으로 옵션화되지 않도록 가능한 한 많이 캐시하는 기본 옵션입니다.
- `force-dynamic`: 강제적인 동적 렌더링, 사용자마다 요청 시 경로를 렌더링하는 결과를 가져옵니다. 이 옵션은 페이지 디렉토리의 getServerSideProps()와 동등합니다.
- `error`: 정적 렌더링을 강제하고 레이아웃이나 페이지의 데이터를 캐시하지만, 동적 함수나 캐시되지 않은 데이터를 사용하는 컴포넌트가 있을 경우 오류를 발생시킵니다. 이 옵션은 다음과 같습니다:
  getStaticProps()를 페이지 디렉토리에서 사용합니다.
  모든 레이아웃 또는 페이지에서 fetch() 요청의 옵션을 { cache: `force-cache` }로 설정합니다.
  섹션 구성을 fetchCache = `only-cache`, dynamicParams = false로 설정합니다.
  dynamic = `error`는 dynamicParams의 기본값을 true에서 false로 변경합니다. generateStaticParams로 생성된 동적 매개변수가 아닌 동적 매개변수를 사용하여 동적 페이지를 다시 렌더링하려면 dynamicParams = true로 수동 설정하면 됩니다.
- getStaticProps()를 페이지 디렉토리에서 사용합니다.
- 모든 레이아웃 또는 페이지에서 fetch() 요청의 옵션을 { cache: `force-cache` }로 설정합니다.
- 섹션 구성을 fetchCache = `only-cache`, dynamicParams = false로 설정합니다.
- dynamic = `error`는 dynamicParams의 기본값을 true에서 false로 변경합니다. generateStaticParams로 생성된 동적 매개변수가 아닌 동적 매개변수를 사용하여 동적 페이지를 다시 렌더링하려면 dynamicParams = true로 수동 설정하면 됩니다.
- `force-static`: 정적 렌더링을 강제하고 레이아웃이나 페이지의 데이터를 캐시하는 옵션으로 cookies(), headers() 및 useSearchParams()가 빈 값을 반환하도록 합니다.

> 좋아요:
> getServerSideProps 및 getStaticProps에서 동적으로 마이그레이션하는 방법에 대한 지침은 업그레이드 가이드에서 찾을 수 있습니다.```

<div class="content-ad"></div>

### dynamicParams

generateStaticParams로 생성되지 않은 동적 세그먼트가 방문되었을 때 어떻게 작동할지 제어합니다.

```typescript
export const dynamicParams = true; // true | false,
```

- true (기본값): generateStaticParams에 포함되지 않은 동적 세그먼트는 필요에 따라 생성됩니다.
- false: generateStaticParams에 포함되지 않은 동적 세그먼트는 404를 반환합니다.

<div class="content-ad"></div>

> 알아두면 좋은 사항:
> 이 옵션은 페이지 디렉토리에서 getStaticPaths의 fallback: true | false | blocking 옵션을 대체합니다.
> dynamicParams = true 인 경우 세그먼트는 스트리밍 서버 렌더링을 사용합니다.
> dynamic = `error` 및 dynamic = `force-static`을 사용하면 dynamicParams의 기본값을 false로 변경합니다.

### revalidate

레이아웃이나 페이지에 대한 기본 재유효화 시간을 설정합니다. 이 옵션은 개별 fetch 요청에서 설정된 revalidate 값에 재정의되지 않습니다.

```typescript
export const revalidate = false;
// false | 0 | number
```

<div class="content-ad"></div>

- false (기본값): `force-cache`로 캐시 옵션을 설정한 모든 페치 요청을 캐시하는 기본 휴리스틱 또는 동적 기능 사용 전에 발견된 요청을 캐시합니다. 실질적으로 revalidate: Infinity과 동의어이며, 이는 자원이 무기한으로 캐시되어야 함을 의미합니다. 여전히 개별 페치 요청이 캐시: `no-store` 또는 revalidate: 0을 사용하여 캐시를 피하거나 경로를 동적으로 렌더링하도록 할 수 있습니다. 또는 revalidate를 경로 기본값보다 작은 양수로 설정하여 경로의 다시 유효화 빈도를 증가할 수 있습니다.
- 0: 동적 기능이나 캐시되지 않은 데이터 페치가 발견되지 않더라도 레이아웃이나 페이지가 항상 동적으로 렌더링되도록 합니다. 이 옵션은 캐시 옵션을 설정하지 않은 페치 요청의 기본값을 `no-store`로 변경하지만 `force-cache`를 선택하거나 양수 revalidate를 사용하는 페치 요청은 그대로 유지됩니다.
- 숫자: (초 단위) 레이아웃이나 페이지의 기본 재검증 빈도를 n 초로 설정합니다.

> 알아두세요: revalidate 옵션은 Node.js 런타임을 사용할 때에만 사용할 수 있습니다. 즉, runtime = `edge`로 revalidate 옵션을 사용하는 것은 작동하지 않습니다.

#### 재검증 빈도

- 단일 경로의 각 레이아웃과 페이지를 통해 가장 낮은 revalidate가 전체 경로의 재검증 빈도를 결정합니다. 이로써 하위 페이지가 상위 레이아웃과 동일한 빈도로 다시 유효화됩니다.
- 개별 페치 요청은 경로의 기본 재검증보다 낮은 revalidate를 설정하여 전체 경로의 재검증 빈도를 높일 수 있습니다. 이를 통해 일부 기준을 기반으로 특정 경로에 대해 더 자주 재검증하도록 동적으로 선택할 수 있습니다.

<div class="content-ad"></div>

### fetchCache

### runtime

```typescript
export const runtime = "노드JS";
// '노드JS' | '에지'
```

- `노드JS` (기본값)
- `에지`

<div class="content-ad"></div>

Edge 및 Node.js 런타임에 대해 더 알아보세요.

### preferredRegion

```typescript
export const preferredRegion = "auto";
// 'auto' | 'global' | 'home' | ['iad1', 'sfo1']
```

preferredRegion 및 지원되는 지역은 배포 플랫폼에 따라 달라집니다.

<div class="content-ad"></div>

> 알아 두면 좋은 사실:
> 만약 preferredRegion이 지정되지 않았다면, 가장 가까운 부모 레이아웃의 옵션을 상속받습니다.
> 루트 레이아웃은 기본적으로 모든 지역을 기본값으로 설정합니다.

### 최대 실행 시간

기본적으로 Next.js는 서버 측 로직의 실행(페이지 렌더링 또는 API 처리)에 제한을 두지 않습니다. 배포 플랫폼은 Next.js 빌드 출력에서 maxDuration을 사용하여 특정 실행 제한을 추가할 수 있습니다. 예를 들어, Vercel에서

참고: 이 설정은 Next.js 13.4.10 이상에서 지원됩니다.

<div class="content-ad"></div>

```typescript
export const maxDuration = 5;
```

> 좋은 정보:
> 서버 액션을 사용하는 경우 페이지 수준에서 maxDuration을 설정하여 페이지에서 사용되는 모든 서버 액션의 기본 타임아웃을 변경할 수 있습니다.

### generateStaticParams

generateStaticParams 함수는 동적 라우트 세그먼트와 함께 사용되어 빌드 시간에 동적으로 요청 시간이 아닌 정적으로 생성될 라우트 세그먼트 매개변수 목록을 정의하는 데 사용할 수 있습니다.

<div class="content-ad"></div>

더 많은 세부 정보는 API 참조를 참조하세요.

<div class="content-ad"></div>
