---
title: "Gulp v5를 발표 내용 정리"
description: ""
coverImage: "/assets/img/2024-05-12-AnnouncingGulpv5_0.png"
date: 2024-05-12 23:43
ogImage: 
  url: /assets/img/2024-05-12-AnnouncingGulpv5_0.png
tag: Tech
originalTitle: "Announcing Gulp v5"
link: "https://medium.com/gulpjs/announcing-gulp-v5-c67d077dbdb7"
isUpdated: true
---



![Announcing Gulp v5.0](/assets/img/2024-05-12-AnnouncingGulpv5_0.png)

gulp 5로 가는 길은 길었지만, 우리가 여기까지 왔어요! 이 릴리스에는 60개 이상의 프로젝트에 대한 4년치 작업이 포함되어 있습니다. 함께하여 팀은 200개 이상의 이슈와 풀 리퀘스트를 마무리했어요. 🤯

# Streamx

처음부터 gulp는 스트림을 중심으로 만들어졌어요. gulp 5에서는 mafintosh의 우수한 streamx 라이브러리로 전환했어요. Streamx에는 Node.js 코어 스트림 대비 여러 이점이 있습니다. `pipe()` 함수에서 객체 및 버퍼 모드를 투명하게 처리하며 에러 처리가 가능해요.

저희는 이 훌륭한 스트림 구현에 대해 더 많은 글을 쓸 시간을 갖고 싶어합니다. 그러나 대부분의 사용자들은 Node.js 코어 스트림과의 호환성을 유지하려는 노력 덕분에 차이를 느끼지 못할 것입니다. gulp 5 개발 과정에서 Mathias님의 도움과 버그 수정에 감사드립니다! 그의 작업을 후원해주시기를 고려해 주세요.

# 종속성

이번 릴리스의 주요 초점은 의존성 트리를 줄이고 대부분 유지하는 것으로 통합하는 데 있습니다. gulp 4가 발표된 이후 사용하던 많은 종속성이 유지되지 않았고, 따라서 이를 제거하거나 유지 책임을 갖기로 결정했습니다.

gulpjs GitHub 조직은 70개 이상의 저장소로 성장했습니다. 이 세분화된 분리는 우리가 빠르게 작은 수정을 할 수 있게 하며, 다른 프로젝트들이 우리 패키지의 일부에 의존할 수 있게 합니다. 그러나 이에 대한 희생은 프로젝트 전체에 대한 대규모 변화를 만들기까지 시간이 걸린다는 것입니다.

# 주요 변경 사항

"breaking changes"가 없는 SemVer 주요 릴리스는 없겠죠. 유저들이 업그레이드할 때 문제가 없거나 거의 없기를 바라지만, 변경된 사항을 꼭 숙지하셔야 합니다.

이번 대규모 릴리스에서 여기서 다루는 변경 사항은 일부분에 불과하기 때문에, 무언가가 다르게 느껴지는 것이 있다면 저희의 종합 변경 로그와 개별 프로젝트 변경 로그를 확인해주세요.

## 스트림 인코딩

저희 스트림은 이제 UTF-8 인코딩이 기본 설정으로 적용됩니다. 이전에는 스트림이 발생한 데이터를 인코딩을 고려하지 않고 그대로 가져왔었는데, 이번 릴리스에서는 10년 된 문제를 해결하여 사용자 정의 인코딩을 지원하고 이를 기본값으로 UTF-8로 설정했습니다. 대부분의 사용 방법은 gulp을 변경할 필요가 없을 것이지만, 일부 플러그인은 UTF-8이 아닌 출력물을 생성할 수 있으며 gulp 스트림에서 `' encoding: false '`로 설정해야 할 수 있습니다.

## 글롭(Globs)

또한 모든 API에서 글로빙 라이브러리를 통일했습니다. 이전에는 `src()`가 node-glob 라이브러리를 사용하고 `watch()`가 anymatch 라이브러리를 chokidar를 통해 사용했었습니다. 몇 년 동안 특정 글로브들이 이러한 함수 간에 동일하게 작동하지 않는 문제가 여러 개 개설되었었습니다. gulp 5부터는 글로브 지원으로 일관되게 anymatch를 사용합니다.

게다가 “순서가 있는 글로브(ordered globs)"를 더 이상 지원하지 않습니다. “순서가 있는 글로브"는 음수 글로브가 배열에서 뒤에 나오는 양수 글로브에 의해 무시될 수 있는 기능이었습니다. 다른 글로빙 라이브러리에서는 이것이 흔하지 않기 때문에 모든 음수 글로브는 생태계에 일관성을 주기 위해 모든 양수 글로브에서 경로를 필터링합니다. 순서가 있는 스트림이 필요하면, ordered-read-streams 라이브러리를 제공합니다.

## CLI

우리는 `swc`, `esbuild`, 그리고 `sucrase`의 로더를 추가했어요. 많은 사용자들이 `.mjs`와 `.cjs` 확장자를 지원해줄 것을 요청했기 때문에, 이제 이 둘을 사용할 수 있어요. 의존성 트리를 간소화하는 과정에서 많은 구식이며 폐기된 로더들을 제거했어요. 만약 우리가 지원했던 더 색다른 로더들을 사용 중이셨다면, 더 현대적인 것으로 변경해야 할지도 모르겠어요.

우리는 `—verify` 플래그를 마침내 제거했어요. 왜냐하면 오랫동안 플러그인 금지 목록을 유지하지 않고 있어서 그랬거든요. 그리고 `—require`를 `—preload`로 이름을 변경해야 했어요. 그렇게 함으로써 Node.js 플래그와 충돌을 피할 수 있어요.

## Logging

`gulplog`을 사용하는 모든 플러그인은 v1에서 v2로 업그레이드해야 하며, 만약 v1을 사용 중이면 사용자에게 사용 중단 경고가 표시됩니다.

# 노드 지원

우리는 오랫동안 gulp가 안정적인 소프트웨어임을 말해 왔으며, 가능한 많은 사용자를 지원하는 것에 관심이 있습니다. Gulp 4는 릴리스 시점에 널리 사용되었던 Node.js v0.10 사용자를 목표로 지원하는 것을 명시적으로 설정하였습니다. 10년이 지난 지금, 플랫폼이 성장하고 JavaScript가 발전함에 따라 Node.js는 이제 6개월마다 새로운 안정 버전을 출시하며, LTS 지원 기간은 30개월입니다. 이러한 새로운 버전에는 gulp를 더 나아지고 더 안정적으로 만들기 위해 활용하길 원하는 기능이 포함되어 있어서, 우리는 Node.js v10.13.0 미만의 모든 버전을 지원 중단했습니다.

지원하는 Node.js 버전을 제한함으로써 의존성 트리에서 많은 플랫폼 및 JavaScript 쉼들을 제거할 수 있었습니다. 이 중 많은 부분은 유지보수되지 않았거나 스캐너에 의해 문제가 발견된 것입니다. 2018년에 발표된 Node.js 버전(그리고 LTS 지원 기간 외부)을 계속 지원함으로써 희망을 갖고 있습니다. 모든 사용자가 gulp 5로 원활하게 업그레이드할 수 있기를 바랍니다.

마침내, 우리는 Windows, Mac 및 Linux을 우선 플랫폼으로 고려해 왔기 때문에 v3, v4 및 v5 사이의 인프라에 상당한 변동이 있었습니다. 이 세 가지 운영 체제를 일관되게 지원하고 사용하기 쉬운 지속적 통합 서비스를 찾는 데 많은 시간이 소요되었습니다. 우리는 우리 주요 대상을 지원하고 release-please와 같은 도구를 활용할 수 있는 GitHub Actions을 중심으로 인프라를 안정화하는 데 상당한 시간을 투자했습니다.

# 앞으로

할 일은 언제나 더 많이 남아 있습니다. 다가오는 몇 주 동안, 나는 우리 v5 이후 프로젝트 보드를 검토하고 중단되지 않는 후속 작업을 위한 토의를 만들 계획입니다. 우리는 gulp 5를 일정 기간 안정화한 후 다음 주요 버전을 계획하기 전에 문제가 발생하면 수정할 수 있도록 할 것입니다.

우리는 더 넓은 커뮤니티로부터 피드백을 받기 위해 설문 조사를 작성 중입니다. 5월 경에 발표될 예정이니 주목해주시기 바랍니다.

지금은 새 릴리스를 즐기시길 바라며, 프로젝트에 기여하거나 저희의 작업을 후원해주시면 감사하겠습니다!
