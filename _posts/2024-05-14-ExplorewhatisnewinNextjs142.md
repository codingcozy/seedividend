---
title: " Nextjs 142의 새로운 기능을 살펴보세요 "
description: ""
coverImage: "/assets/img/2024-05-14-ExplorewhatisnewinNextjs142_0.png"
date: 2024-05-14 10:12
ogImage: 
  url: /assets/img/2024-05-14-ExplorewhatisnewinNextjs142_0.png
tag: Tech
originalTitle: "✨Explore what is new in Next.js 14.2! ✨"
link: "https://medium.com/@nikhilgupta946/explore-what-is-new-in-next-js-14-2-810dcb10973c"
isUpdated: true
---




![이미지](/assets/img/2024-05-14-ExplorewhatisnewinNextjs142_0.png)

Next.js 14.2의 로컬 개발용 릴리스 후보인 Turbopack이 여러분의 경험을 업그레이드해줄 준비가 되어 있습니다! 💻

# 주요 포인트:

- 통합 테스트의 99.8%가 통과했습니다 🎉
- Next.js 앱에서 사용되는 상위 300개 npm 패키지가 Turbopack으로 컴파일될 수 있습니다 📦
- 모든 Next.js 예제가 매끈하게 작동합니다 🌐
- Lightning CSS, 빠른 CSS 번들러 및 최소화 도구가 이제 통합되었습니다 🎨



벌셀닷컴에 미치는 현실적인 영향, 대형 Next.js 앱:

- 로컬 서버 시작 속도가 76.7% 빨라짐 ⚡
- Fast Refresh로 코드 업데이트가 96.3% 빨라짐 🔥
- 캐싱 없이 초기 루트 컴파일이 45.8% 빨라짐 🏎️

한 번 시도해보세요:

```js
next dev - turbo 🚀
```



# 먼저, Turbopack에 대해 간단히 알아봅시다.

## 🌟웹팩의 후속제품, Rust로 만들어진 성공작 🚀

Turbopack은 JavaScript와 TypeScript에 최적화된 혁신적인 점진적 번들러입니다. Rust로 설계되어 어떤 규모의 프로젝트에도 빠르고 적응할 수 있는 개발 경험을 제공합니다.

## Turbopack의 주요 기능



점진적 번들링: Turbopack가 작업을 완료하면 동일 작업을 다시 하지 않아 개발 프로세스를 최적화하고 시간을 절약합니다.

풍부한 생태계 지원: TypeScript, JSX, CSS, CSS Modules 및 WebAssembly과의 기본적 호환성 제공.

빠른 HMR: 응용 프로그램 크기와 관계없이 빠른 Hot Module Replacement는 효율적인 실시간 업데이트를 보장합니다.

Native React Server Components 지원: Turbopack는 React Server Components를 기본으로 지원하여 통합을 향상시킵니다.



다중 환경 최적화: 브라우저, 서버, 그리고 엣지와 같은 다양한 환경을 동시에 대상으로 삼아 최적화하며 SSR 및 React 서버 구성 요소를 지원합니다.

# 🏗️ 빌드 및 프로덕션 향상 🚀

## Tree-shaking 개선 사항: 🌳

- 사용되지 않는 익스포트가 제거되어 프로덕션 JavaScript 번들 크기를 줄입니다 📉
- 예: 단일 아이콘 컴포넌트를 가져오더라도 패키지에서 다른 모든 아이콘을 포함하지 않게 됩니다 🎨



## 메모리 부족 충돌 방지: 💪

- 대규모 앱을 위해 번들링 로직을 재구성하고 컴파일러를 최적화했습니다.
- 새로운 `— experimental-debug-memory-usage` 플래그를 `next build`에 추가하여 메모리 성능을 디버그할 수 있습니다. 🔍 즉, 자바스크립트가 힙 사용량 및 가비지 컬렉션 통계와 같은 메모리 사용 정보를 빌드 중에 계속해서 출력합니다.

## CSS 최적화: 🎨

- 스타일 탐색 시 충돌을 피하기 위해 CSS를 청크로 만들었습니다. 🌈
- CSS 청크의 순서와 병합은 import 순서로 정의되었습니다. 📂
- 최상의 방법: CSS 모듈을 사용하고 단일 JS/TS 파일에 import하며 동일한 파일에서 전역 스타일을 import 합니다. 📂



## 🔄 캐싱 개선 💾

- staleTimes (실험적): ⏰ 사용자가 캐싱 휴리스틱에 대한 더 많은 제어를 원하는 현재 경험을 향상시키기 위한 것이나 완전한 솔루션이 되는 것은 아닙니다. (클라이언트 측 라우터 캐시 무효화 기간 설정을 추가 🕰️)
- 기본적으로 prefetch된 라우트는 30초 동안 캐시되지만 prefetch='true'일 때는 5분 동안 캐시됩니다 📅
- 기본 설정을 재정의하려면 next.config.js에서 규칙을 정의하여 사용자 정의할 수 있습니다 🛠️

## 병렬 및 인터셉트 라우트: 🎡

- revalidatePath 또는 revalidateTag를 사용하여 서버 액션을 호출하면 캐시를 재검증하고 보이는 슬롯을 새로고침합니다 🔄
- router.refresh는 올바르게 보이는 슬롯을 새로 고치며 현재 보기를 유지합니다 🌟



# 🛠️ 개발자 경험 (DX) 개선 사항 🌞

## 에러 메시지 및 스택 추적: 📝 🚧

- `next dev`에서 가독성 향상 🔍
- 더 나은 에러 메시지, 오버레이 디자인 개선, 라이트 모드 및 다크 모드 지원 🌞🌙
- 더 명확한 개발 및 빌드 로그 📜

## React 수화 에러: 💧🚧



- React 팀과의 협업을 통해 기본 오류 추적을 개선합니다 🤝
- 오류가 발생한 파일 이름을 표시합니다 📂

Next.js 14.2로 업그레이드하면 Turbopack의 성능, 최적화된 빌드, 개선된 캐싱, 더 나은 개발자 경험을 느낄 수 있습니다. 즐거운 코딩하세요! 👨‍💻👩‍💻🚀

# 🎈 Next.js 14.2에서 무슨 변화가 있을까요? 🔍

- 메모리 사용량 개선 🧠
- 지속적인 캐싱 구현 💾
- `next build`에 Turbopack 적용 🏗️ 여기서 추적해보세요