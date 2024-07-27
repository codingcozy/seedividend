---
title: "Dangerjs를 사용한 코드 리뷰 작업 자동화 방법"
description: ""
coverImage: "/assets/img/2024-06-23-AutomatingCodeReviewChoresUsingDangerjs_0.png"
date: 2024-06-23 13:09
ogImage: 
  url: /assets/img/2024-06-23-AutomatingCodeReviewChoresUsingDangerjs_0.png
tag: Tech
originalTitle: "Automating Code Review Chores Using Danger.js"
link: "https://medium.com/better-programming/code-review-chores-that-we-should-automate-using-danger-js-6cf72ff3bf98"
---


![이미지](/assets/img/2024-06-23-AutomatingCodeReviewChoresUsingDangerjs_0.png)

우리 소프트웨어 엔지니어들은 코드 리뷰에 상당한 시간을 투자합니다. 그리고 그것이 중요한 활동인 이유는:

- 코드를 릴리스하기 전에 잠재적인 버그를 감지할 수 있습니다.
- 코드가 의도한 대로 작동하는지 확인할 수 있습니다.
- 코드가 유지 관리 가능한지 확인할 수 있습니다.
- 코드 품질, 단위 테스트 등과 같은 일관된 코딩 규칙을 유지할 수 있습니다.

그러나 일부 코드 리뷰 부분은 자동화되지 않는 한 지루할 수 있습니다. 이러한 부분을 "코드 리뷰 일"로 분류할 수 있습니다. 몇 가지 예는 다음과 같습니다:

<div class="content-ad"></div>

- 만든 자가 풀 리퀘스트의 일부로 파일을 업데이트했는지 확인해주세요. 예: CHANGELOG.md와 package.json 파일들.
- 새로 만든 함수에 테스트를 추가했는지 확인해주세요.
- 풀 리퀘스트(PR)가 너무 큰지 확인해주세요.
- 오타가 있는지 확인해주세요.

우리는 풀 리퀘스트(PR) 크기를 작게 유지하거나 package.json 파일을 최신 상태로 유지하라고 계속 상기시키는 개발자가 되고 싶지 않아요. 동일한 PR 피드백을 반복할 때 코드 리뷰 일이 뚜렷해져요.

우리는 PR이 해결하려는 실제 문제를 리뷰하는 데 더 많은 시간을 할애해야 해요. 그래서 코드 리뷰 일에 소비하는 시간을 최소화할 수 있어요.

일상적인 작업들을 자동화하면 코드의 품질과 팀의 효율성이 향상될 거예요. 일상적인 일을 걱정할 필요가 적어지면, 비즈니스 로직과 잠재적 버그와 같은 중요한 부분을 리뷰하는 데 더 많은 시간을 쓸 수 있어요.

<div class="content-ad"></div>

# 위험 JS

다행히도, 코드 리뷰를 자동화해 주는 무료 도구인 Danger가 있어요. Danger에는 루비용 Danger와 자바스크립트용 Danger(JS)와 같이 여러 버전이 있어요. 두 버전 모두 동일한 일을 처리해요. 당신이 선호하는 프로그래밍 언어를 선택해서 Danger 규칙을 작성할 수 있는 거에요. 이 글에서는 Danger JS를 사용할 거예요.

이전 블로그 게시물에 있는 "Danger란?" 섹션을 읽어보면 Danger에 대한 간단한 소개를 볼 수 있어요.

다음 섹션에서 Danger JS를 사용하여 자동화할 수 있는 몇 가지 일상적인 작업의 예시를 공유할 거에요.

<div class="content-ad"></div>

<img src="/assets/img/2024-06-23-AutomatingCodeReviewChoresUsingDangerjs_1.png" />

# PR에서 특정 파일 업데이트

예를 들어, PR에서 CHANGELOG.md 및 package.json 파일을 업데이트하는지 확인합니다. JavaScript 라이브러리를 공유하는 경우, 해당 라이브러리의 변경 로그와 버전을 추적하는 것이 좋은 관행입니다.

다음은 당신이 Danger 함수에서 수행할 수 있는 작업입니다.

<div class="content-ad"></div>

- 당신의 PR에 변경 사항이 있는지 변경 로그 파일과 package.json 파일을 확인하세요.
- 변경 사항이 없는 경우, 파일을 업데이트해야 함을 나타내는 코멘트를 PR에 남기세요.

다음은 danger.systems/js에서 일부 샘플 코드입니다:

```js
// 앱 변경 사항에 대한 CHANGELOG 항목 추가
const hasChangelog = danger.git.modified_files.includes("changelog.md")
const isTrivial = (danger.github.pr.body + danger.github.pr.title).includes("#trivial")
```

```js
if (!hasChangelog && !isTrivial) {
  warn("변경 사항에 대한 변경 로그 항목을 추가해주세요.")
}
```

<div class="content-ad"></div>

차단 JS 확장 프로그램에는 변경 로그 파일을 추적하는 Danger JS 확장 프로그램 (danger-plugin-keepachangelog)도 있습니다. 이 확장 프로그램을 직접 사용할 수 있으므로 처음부터 기능을 작성할 필요가 없습니다.

## 의도하지 않은 인쇄 문장

로컬에서 변경 사항을 디버그하거나 테스트하기 위해 인쇄 문장을 사용합니다. 불행하게도 이러한 문장을 가끔 우리의 브랜치에 의도치 않게 커밋할 수 있습니다.

메인 브랜치에서 불필요한 인쇄 문장을 제외하는 것이 좋은 실천 방법입니다. 중복되는 인쇄 문장은 앱이나 서비스를 실행할 때 소음을 더해 코드베이스가 디버깅하기 어렵게 만듭니다.

<div class="content-ad"></div>

대부분의 경우, 작성자나 검토자가 문제를 발견합니다. 그러나 불가피하게 몇 가지 문제는 여전히 누락될 수 있습니다. Danger JS를 사용하여 이 확인을 자동화해야 합니다.

참고용 의사코드는 다음과 같습니다:

```js
// DangerJS를 사용하여 수정된 파일을 가져옵니다
modifiedFiles = getModifiedFiles()
for (modifiedFile in modifiedFiles) {
    // 각 파일에 대해 추가된 diff를 가져옵니다
    diffAddedForFile = getDiffAdded(modifiedFile)
    // 각 diff 문자열에 print 문이 포함되어 있는지 확인합니다 (예: Go의 fmt.print 또는 JS의 console.log)
    if (diffAddedForFile.includes('fmt.print')) {
        warn('fmt.print가 감지되었습니다')
    }    
}
```

JavaScript를 사용하는 경우, 다른 대안적인 솔루션을 사용할 수 있어서 Danger 규칙을 처음부터 작성할 필요가 없습니다.

<div class="content-ad"></div>

- Danger JS 확장 기능: danger-plugin-noconsole.
- ESLint의 no-console.

## PR이 너무 큰지 확인하기

우리는 PR을 가능한 한 작게 유지하고 싶습니다. 큰 PR은 인지 부담을 증가시킵니다. 작은 PR은 더 관리하기 쉬우며 리뷰하기도 쉽습니다. 때로는 PR 작성자에게 PR을 작은 조각들로 나누도록 상기해야 할 수도 있습니다.

우리는 Danger JS 규칙을 작성하여 PR에서 변경된 라인 수를 세어볼 수 있습니다. 숫자가 지정된 "크게 PR 임계값"을 초과하면 PR을 작은 PR로 나누도록 의견을 남길 수 있습니다.

<div class="content-ad"></div>

변경 라인 수 = 삭제된 라인 수 + 추가된 라인 수

팀 전체에서 수용할 수 있는 큰 PR 임계값에 대해 합의해야 합니다. 팀이 처음에 충분히 좋다고 느끼는 임의의 임계값으로 시작하십시오. 제 경험상 500에서 600 값을 사용하는 것이 일반적입니다. 그런 다음 시간이 지남에 따라 세부 조정할 수 있습니다.

다음은 https://danger.systems/js/에서 샘플 코드입니다:

```js
var bigPRThreshold = 600;
if (danger.github.pr.additions + danger.github.pr.deletions > bigPRThreshold) {
  warn(':exclamation: 큰 PR (' + ++errorCount + ')');
  markdown('> (' + errorCount + ') : 풀 리퀘스트 크기가 비교적 크게 보입니다. 여러 변경 사항이 포함된 경우 각각을 별도의 PR로 분리하면 더 빠르고 쉬운 검토를 할 수 있습니다.');
}
```

<div class="content-ad"></div>

당신이 원하는 대로, 빅 PR 임계값에 대한 계산에 카운트되기를 원치 않는 파일을 제외할 수도 있어요. 예를들어, mock 파일을 제외하고 싶다면:

```js
const linesCount = await danger.git.linesOfCode("**/*");
// mock 파일을 제외합니다
const excludeLinesCount = await danger.git.linesOfCode("**/*mock*");
const totalLinesCount = linesCount - excludeLinesCount;
```

```js
if (totalLinesCount > bigPRThreshold) {
  warn("대규모 PR입니다. 작은 PR로 분할해 보세요.");
}
```

## 마크다운 오타 확인

<div class="content-ad"></div>

문서의 오타는 코드베이스에서 "깨진 창문"으로 이어질 수 있어요. 그것들을 무시해서는 안 돼요. 다행히도 오타를 확인하는 데 유용한 Danger JS 확장 프로그램이 이미 있어요: danger-plugin-spellcheck.

GitHub 리포지토리에서의 샘플 사용법은 다음과 같아요:

```js
// dangerfile.js
import spellcheck from 'danger-plugin-spellcheck'
```

```js
spellcheck({
  ignore: ['Nachoz', 'Tacoz'],
  ignoreFiles: ['README.md']
})
```

<div class="content-ad"></div>

## 긍정적인 규칙, 예를 들어 PR 작성자 칭찬

Danger JS는 "이것을 잊었어" 타입의 규칙만 있는 것은 아닙니다. 당신은 dangerfile에 긍정적인 규칙을 추가하여 PR에서 동료들을 칭찬할 수 있습니다.

예를 들어: 작성자가 추가한 코드보다 더 많은 코드를 제거했을 때, 칭찬을 해주는 것입니다. 이는 여러분의 팀이 코드 추가를 피해야 한다는 것이 아닙니다. 중복 코드를 제거할 수 있도록 팀을 격려하는 방법입니다. 덜한 코드, 덜한 유지 보수.

간단한 if 블록을 사용하여 Danger JS에서 이를 수행할 수 있습니다.

<div class="content-ad"></div>

```js
if (danger.github.pr.deletions > danger.github.pr.additions) {
  message(`:thumbsup: 더 많은 코드를 삭제했군요!`);
}
```

우리는 Danger JS의 긍정적 규칙에 대한 자세한 설명을 확인할 수 있습니다.

## 누락된 테스트 확인

얼마나 자주 이런 PR 피드백을 작성하고 받을까요?

<div class="content-ad"></div>

아마도 많이 할 것 같아요. 다시 한 번 하지 않아도 돼요.

저희가 PR에서 테스트를 검토할 때 필요한 단계들이에요:

- 새로운 기능 또는 메소드에 테스트가 필요한지 확인해요.
- 테스트가 이미 존재하는지 확인해요 — 패턴 매칭.
- 테스트가 우리가 테스트해야 하는 경로들을 커버하고 있는지 확인해요.

<div class="content-ad"></div>

위험 JS를 사용하여 단계 2를 자동화할 수 있어요. 단계 1과 3을 자동화할 필요조차 없어요. 단계 2를 자동화하는 것이 더 직관적이고 많은 시간을 절약할 수 있어요.

테스트 누락을 확인하는 것은 테스트 커버리지를 계산하는 것과 같지 않아요. 테스트 커버리지를 계산할 때, 빌드가 지정된 커버리지 임계값을 충족하지 못하면 실패해요.

코드 리뷰 중에 테스트를 확인할 때 테스트 커버리지를 직접 계산하지 않아요. 대신 패턴을 찾아요. 예를 들어, Golang의 PR을 리뷰할 때:

- 새로운 함수 GetUsers()가 있는 경우 Test_GetUsers()라는 연관된 테스트가 있는지 확인해봐요.
- Test_GetUsers()가 누락된 경우, "누락된 테스트를 추가하세요"라는 피드백을 남겨주세요.

<div class="content-ad"></div>

위의 패턴 매칭 로직을 Danger JS를 사용하여 프로그래밍적으로 실행할 수 있어요. 그러려면 특정 명명 규칙을 따라야 해요.

우리 Danger JS 코드에서 PR 내의 테스트를 찾는 단계는 아래와 같아요:

- PR diff를 가져와요.
- 새로 추가된 함수가 있는지 확인해요. 여기에는 정규식을 사용할 수 있어요.
- 새로운 함수가 있다면, 해당 함수에 대한 테스트가 있는지 찾아요. 예를 들어, PR에서 새로 추가된 함수 GetUsers()를 발견했다면, 해당 함수에 대한 테스트 Test_GetUsers()를 찾아야 해요.
- Test_GetUsers()가 존재하지 않는다면, PR에 주석을 남겨요.

의사 코드는 다음과 같을 거에요:

<div class="content-ad"></div>

```js
// PR에 추가된 함수에서 누락된 테스트를 확인합니다:
addedFunctionNames = []
diffs = []
modifiedFiles = getModifiedFiles()
modifiedTestFiles = getModifiedTestFiles()
diffs = modifiedFiles.map(m => getDiffAdded(m))
testDiffs = modifiedTestFiles.map(m => getDiffAdded(m))
for (diff in diffs) {
    parsedFunctionName = parseFunctionNames(diff) 
    // 패턴이 일치하는지 확인합니다
    testsFound = testDiffs.filter(diff => diff.includes(`test_${parsedFunctionName}`))
    if (testsFound.length === 0) {
        warn(`테스트 누락: ${parsedFunctionName}`)
   }
}
```

Google CloudBuild에서 Danger JS를 설정하는 것은 간단합니다. 자세한 내용은 이전 블로그 포스트를 확인해보세요.