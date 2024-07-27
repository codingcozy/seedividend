---
title: "제이쿼리 4, 다시 부활할 수 있을까? "
description: ""
coverImage: "/assets/img/2024-05-18-jQuery4ANewEra_0.png"
date: 2024-05-18 21:16
ogImage: 
  url: /assets/img/2024-05-18-jQuery4ANewEra_0.png
tag: Tech
originalTitle: "jQuery 4: A New Era"
link: "https://medium.com/@alexefimenko/jquery-4-a-new-era-3695332777ef"
---


jQuery, 수십년 동안 무수히 많은 웹사이트를 구동해 온 "옛날식" 자바스크립트 라이브러리가 다음 주요 릴리스, jQuery 4.0.0 베타를 향하여 나아가고 있습니다.

![2024-05-18-jQuery4ANewEra_0.png](/assets/img/2024-05-18-jQuery4ANewEra_0.png)

이 릴리스는 jQuery 자체 뿐만 아니라 전체 웹 개발에 있어서 중요한 이정표입니다.

# 2024년에도 jQuery가 중요한 이유

<div class="content-ad"></div>

최근 몇 년 동안 새로운 프레임워크와 라이브러리가 등장했지만, jQuery는 현대 웹 개발에서 중요한 도구로 남아 있습니다.

간단한 구문, 다양한 플러그인 생태계 및 많은 사용자 커뮤니티로, jQuery는 모든 레벨의 개발자들에게 귀중한 도구입니다.

최신 통계에 따르면, 상위 100만 개 사이트 중 약 78%가 여전히 jQuery를 사용하고 있으며, 이는 그 지속적인 인기와 중요성을 입증하는 것입니다.

<img src="/assets/img/2024-05-18-jQuery4ANewEra_1.png" />

<div class="content-ad"></div>

# jQuery 4.0.0 Beta의 주요 기능 및 개선 사항

jQuery 4.0.0 베타 릴리스에는 몇 가지 새로운 기능과 개선 사항이 있습니다. 주요 포인트는 다음과 같습니다:

- 최신 JavaScript 기능 지원: jQuery 4.0.0 베타는 ES 모듈, 프로미스, 화살표 함수 등의 최신 JavaScript 구문을 지원합니다.
- 레거시 브라우저 지원 제거: jQuery 4.0.0 베타에서는 인터넷 익스플로러 11과 같은 구형 브라우저 지원을 중단했습니다. 이 결정으로 인해 라이브러리는 성능 최적화에 집중하고 구형 브라우저에서 사용할 수 없는 최신 웹 API를 활용할 수 있게 되었습니다.
- 새로운 Rust 기반 미니파이어: jQuery 4.0.0 베타에서는 Rust로 구축된 빠르고 효율적인 미니파이어를 도입했습니다.
- 성능 및 메모리 사용량 개선: jQuery 팀은 라이브러리의 핵심 코드를 최적화하는 데 많은 노력을 기울여 성능 향상과 메모리 사용량 감소를 이루어냈습니다.
- 사용되지 않는 API 제거: 내부적으로 사용되지 않는 함수들이 제거되었습니다.
- focusin/focusout 이벤트 순서 변경: jQuery 이전의 순서와 다른 최신 브라우저 사양을 따릅니다.
- FormData 지원 추가: jQuery.ajax가 이제 이진 데이터를 자동으로 처리합니다.
- 자동 JSONP 프로모션 제거: 교차 도메인 요청에 대해 CORS 사용을 장려합니다.
- Trusted Types 및 CSP 지원 개선: Trusted Types와 콘텐츠 보안 정책 사용 시 보안을 보장합니다.
- 업데이트된 slim 빌드: Deferreds 및 Callbacks를 제거하여 (대부분의 경우에는 사용되지 않음) 더 작은 크기로 업데이트되었습니다.

![image](/assets/img/2024-05-18-jQuery4ANewEra_2.png)

<div class="content-ad"></div>

# 개발 과정에서 극복한 도전

jQuery 팀은 개발 과정 중 다양한 도전을 겪었습니다:

- 역 호환성과 현대화의 균형 맞추기: 새로운 기능을 도입하면서 기존 코드와의 호환성을 유지하는 것은 미묘한 균형을 유지해야 합니다. jQuery 팀은 기존 프로젝트에 변경 사항의 영향을 주의 깊게 고려하고 개발자들을 위한 원활한 업그레이드 경로를 보장하기 위해 노력했습니다.
- 급변하는 환경에서의 탄력성 유지: 웹 개발 환경은 끊임없이 변화하며 새로운 프레임워크와 라이브러리가 계속 등장합니다. jQuery 팀은 jQuery가 이 동적인 환경에서 여전히 주목할 만하고 경쟁력을 유지할 수 있도록 노력했습니다.
- 다양한 커뮤니티의 합의 형성: jQuery는 다양한 사용자 커뮤니티를 보유하고 있습니다.

# 추가 정보

<div class="content-ad"></div>

- 이것은 베타 릴리스이므로 최종 릴리스 이전에 일부 버그와 변경 사항이 예상됩니다.
- 최종 릴리스 전에 전체적인 업그레이드 안내서가 게시될 예정입니다.
- jQuery 이전 버전에서 마이그레이션을 돕는 jQuery Migrate 플러그인을 사용할 수 있습니다.
- 다운로드 옵션에는 CDN 및 npm 패키지가 포함되어 있습니다.
- jQuery 웹사이트에서 더 자세한 정보를 확인할 수 있습니다: https://jquery.com/

# 결론: jQuery에 밝은 미래가 기대됩니다

현대 JavaScript 기능에 적극적으로 수용하고 성능을 최적화하며 커뮤니티 요구 사항을 충족시킴으로써 jQuery팀은 개발자들에게 향후 몇 년 동안 유효하고 강력한 도구로 남아있을 것을 보장했습니다.

![이미지](/assets/img/2024-05-18-jQuery4ANewEra_3.png)

<div class="content-ad"></div>

흥미로운 내용이었나요? 👏 좋아요 눌러주세요! 다음 이야기도 가져올 수 있도록 제게 동기부여해주세요!

기술 분야에서 새로운 사람들을 만나는 것을 즐기고 있어요. LinkedIn에서 연락해도 괜찮아요!