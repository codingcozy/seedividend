---
title: "정규 표현식에서 여러 조건을 일치시키는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-HowToMatchMultipleConditionsinRegex_0.png"
date: 2024-06-22 12:52
ogImage: 
  url: /assets/img/2024-06-22-HowToMatchMultipleConditionsinRegex_0.png
tag: Tech
originalTitle: "How To Match Multiple Conditions in Regex"
link: "https://medium.com/gitconnected/how-to-match-multiple-conditions-in-regex-a380affa175e"
isUpdated: true
---




<img src="/assets/img/2024-06-22-HowToMatchMultipleConditionsinRegex_0.png" />

이전 포스트에서는 미디엄 게시물에서 YouTube 링크를 썸네일로 표시하는 방법에 대해 설명했습니다. 이를 위해서는 제공된 URL에서 특정 패턴을 일치시키고 바꾸기 위해 일부 정규 표현식을 활용해야 합니다.

포스트에는 두 가지 다른 조건을 고려해야 하는 보너스 섹션이 포함되어 있습니다. 두 가지 경우를 처리하기 위해 각각 별도의 문을 사용할 수 있습니다. 또는 여러 조건을 하나의 정규 표현식 문으로 통합하여 깔끔하고 효율적으로 할 수도 있습니다.

이 포스트에서는 이에 대해 조금 더 깊이 이해해 보겠습니다! 아래는 문자열에서 정규 표현식 조건에 일치하는 부분을 찾을 수 있도록 match와 함께 사용할 수 있는 간단한 정규 표현식입니다.

<div class="content-ad"></div>

```js
const line = '내 이름은 매튜 크로크입니다. 나는 NY 메츠를 좋아합니다.';
const regex = /[A-Za-z]/g;
const found = line.match(regex);

console.log(found)

> (33) ['M', 'y', 'n', 'a', 'm', 'e', 'i', 's', 'M', 'a', 't', 't', 'h', 'e', 'w', 'C', 'r', 'o', 'a', 'k', 'I', 'l', 'o', 'v', 'e', 't', 'h', 'e', 'N', 'Y', 'M', 'e', 't', 's']
```

<div class="content-ad"></div>

좋아요! 만약 우리가 전체 단어와 일치시키고 싶다면 어떨까요? 예를 들어, 'love'란 단어를 찾고 싶으면 이렇게 할 수 있어요!

```js
const line = '내 이름은 매튜 크로크입니다. 나는 뉴욕 메츠를 사랑해요.';
const regex = /love/g;
const found = line.match(regex);

console.log(found)

> ['love']
```

쉽죠? 만약 우리가 대괄호 안에 love를 넣어서 /[love]/g와 같이 하면 아래와 같은 결과가 나올 거에요.

```js
> (9) ['e', 'e', 'o', 'l', 'o', 'v', 'e', 'e', 'e']
```

<div class="content-ad"></div>

이는 대괄호가 "문자 클래스"로 사용되기 때문입니다. 즉, "a, b 또는 c 중의 어떤 문자"를 의미합니다. 문자 클래스는 범위를 사용할 수도 있습니다. 예를 들어 [a-d] = [abcd]입니다. [여기](https://stackoverflow.com/questions/3512471/what-does-it-mean-to-escape-the-regex-square-brackets)에서 원본 스택 오버플로 설명을 볼 수 있습니다.

## 다중 조건

이 게시물의 원래 목적으로 돌아가 보겠습니다: 정규식에서 여러 조건을 사용하는 방법은 무엇인가요?

예를 들어 우리가 love와 Mets 단어를 찾고 싶다고 할 때, 파이프 (|)를 사용하여 아래와 같은 정규식을 작성할 수 있습니다.

<div class="content-ad"></div>

```js
const line = '내 이름은 매튜 크로크입니다. 나는 NY 메츠를 좋아합니다.';
const regex = /좋아합니다|메츠/g;
const found = line.match(regex);

console.log(found)

> ['좋아합니다', '메츠']
```

파이프는 논리 OR 표현을 나타냅니다. 하나의 패턴이나 다른 패턴 중 하나를 찾고 싶을 때 사용할 수 있습니다. 만약 love와 Mets 간에 공백을 넣었다면 또는 아예 아무것도 넣지 않았다면, 정규식에서 아무런 결과도 얻을 수 없을 것입니다.

이는 이제 match 패턴이 loveMets 또는 love Mets라는 둘 중 하나가 되었기 때문입니다. 이들은 문자열에 나타나지 않는 패턴들입니다. OR 로직을 실행하려면 파이프가 필요합니다.

이 OR 연산자는 두 개뿐만 아니라 다양한 조건과 함께 사용할 수 있습니다! 한 번 살펴보세요. 매튜, 좋아합니다, 메츠를 찾아 봅시다.

<div class="content-ad"></div>

```js
const line = '내 이름은 Matthew Croak이다. 나는 NY Mets를 사랑해.';
const regex = /love|Mets|Matthew/g;
const found = line.match(regex);

console.log(found)

> ['Matthew', 'love', 'Mets']
```

패턴을 포함하는 순서가 중요하지 않은 것을 주목하셨나요? 여전히 일치 항목을 찾아 문자열에 나타난 순서대로 기록할 거에요.

조금 더 복잡한 것을 시도해보죠.

## 다중 조건 (특수 문자 사용)

<div class="content-ad"></div>

위의 코드를 Markdown 형식으로 변경하면 아래와 같아요.

```js
const line = "내 이름은 Matthew Croak :). 나는 NY 메츠를 좋아해요 (양키스는 그렇게 좋아하지는 않지만, 괜찮아요.)";

// 이모티콘을 모두 찾고 싶다면 아래 내용을 콘솔에서 실행해보세요.

const line = "내 이름은 Matthew Croak :). 나는 NY 메츠를 좋아해요 (양키스는 그렇게 좋아하지는 않지만, 괜찮아요).";
const regex = /<3|:)/g;
const found = line.match(regex);

console.log(found)
```

<div class="content-ad"></div>

무슨 일이 있었나요? 로그를 찍을 때 이렇게 나왔나요...

Uncaught SyntaxError: Invalid regular expression: /`3|:)/: Unmatched ‘)’

왜 이런 일이 발생했을까요? 그것은 단순히 )가 정규식에서 특수 문자로 사용되기 때문이에요! 그것은 그룹화에 사용돼요. 문자열에서 )를 찾으려면 백슬래시로 이스케이핑 해야 해요.

아래 사항을 확인해 보세요.

<div class="content-ad"></div>

```js
const regex = /<3|:\)/g;
```

코드를 업데이트하면 아래와 같은 응답이 나와야 합니다.

```js
> (2) [':)', '<3']
```

여기 있습니다! 여러 개의 정규 표현식을 논리 OR 연산자를 사용하여 하나로 결합하는 방법과 문자열에서 특수하거나 예약된 문자를 찾을 수 있도록 이스케이프하는 방법까지 배웠습니다!

<div class="content-ad"></div>

다른 방법으로 정규식에서 여러 조건을 사용하는 방법이 있나요? 댓글로 알려주세요! 

나의 정리된 정규식 목록을 확인하려면 더 많은 자료를 보십시오!

무제한 광고 없는 이야기를 수천 명의 작가로부터 받으며 무료 Medium 멤버십을 업그레이드하세요. 이것은 제가 작성한 콘텐츠에 대한 보상을 받게 해주는 제 계정과 연계된 링크입니다.

또한 이메일로 구독하여 새로운 글이 올라올 때마다 알림을 받을 수도 있습니다!

<div class="content-ad"></div>

# 참고문헌