---
title: "프로그래밍 언어를 만드는 데 얼마나 많은 작업이 필요할까"
description: ""
coverImage: "/TIL/assets/img/2024-07-07-HowMuchWorkDoesItTaketoBuildaProgrammingLanguage_0.png"
date: 2024-07-07 21:54
ogImage:
  url: /assets/img/2024-07-07-HowMuchWorkDoesItTaketoBuildaProgrammingLanguage_0.png
tag: Tech
originalTitle: "How Much Work Does It Take to Build a Programming Language?"
link: "https://medium.com/zenstack/how-much-work-does-it-take-to-build-a-programming-language-784a6868f4e9"
---

## 언어 생성을 시도해보세요! 왜냐하면 왜 안되겠어요

"이 책은 고전입니다. 존중하며 다루세요".

15년 전, 어린 시절 컴파일러를 만들게 된 이래팀의 구조 설계자가 나에게 드래곤 북을 건넬 때 이렇게 말했다. 아쉽게도 그 책을 읽다가 밤에 잠이 들어 바닥에 넘어뜨리고 말았다. 반납할 때 표지에 작은 흠이 살짝 들어간 것을 발견하지 않길 바라며.

![이미지](/TIL/assets/img/2024-07-07-HowMuchWorkDoesItTaketoBuildaProgrammingLanguage_0.png)

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

저는 1986년에 쓰인 책을 읽었어요. 당시 컴파일러 만들기는 굉장히 어려웠고, 컴퓨터 과학과 프로그래밍 기술을 많이 담았습니다. 거의 4십 년 후인 지금, 다시 일에 착수하려고 해요. 요즘에는 어떨까요? 언어를 만드는 데 필요한 것들과 현대 도구들이 얼마나 단순해졌는지 살펴보도록 하죠.

# 대상 언어

모든 것을 납득시키기 위해 구체적인 언어가 필요해요. 아주 작은 기능 세트만을 사용해서 보여주기 위해, ZenStack에서 개발 중인 ZModel 언어를 예시로 사용할 거에요. 이 언어는 데이터베이스 테이블과 접근 제어 규칙을 모델링하는 데 사용되는 DSL입니다. 글을 짧게 유지하기 위해 다음 코드 조각만 사용하여 예시를 보여줄 거에요.

```js
model User {
  id Int
  name String
  posts Post[]
}

model Post {
  id Int
  title String
  author User
  published Boolean

  @@allow('read', published == true)
}
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

간단한 메모:

- 모델 구문은 데이터베이스 테이블을 나타냅니다. 그 필드는 테이블 열에 매핑됩니다.
- 모델은 서로를 참조하여 관계를 형성할 수 있습니다. 위의 예시에서 User 및 Post 모델은 일대다 관계를 형성합니다.
- @@allow 구문은 액세스 제어 규칙을 나타냅니다. 두 가지 인수를 전달합니다: 하나는 액세스 유형("create", "read", "update", "delete" 또는 "all"), 다른 하나는 해당 액세스를 허용해야 하는지를 나타내는 부울 식입니다.

여기까지입니다. 자, 소매 소매한 작업할 시간입니다!

# 여섯 단계로 언어 만들기

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 단계 1: 텍스트에서 구문 트리로

컴파일러를 구축하는 일반적인 단계는 몇 년 동안 크게 변하지 않았어요. 먼저 텍스트를 "토큰"으로 쪼개는 렉서(lexer)가 필요하고, 그런 다음 파서(parser)가 토큰의 스트림을 "구문 분석 트리"로 구성해야 해요. 고수준 언어 구축 도구는 이 두 단계를 결합하고 텍스트에서 트리로 한 번에 전환할 수 있도록 해줘요.

우리는 Langium OSS 툴킷을 사용하여 언어를 구축하는 데 도움을 받았어요. 이것은 TypeScript를 기반으로 한 훌륭한 언어 공학 도구로 전체적인 언어 구축 프로세스를 간소화해줘요. Langium은 렉싱 및 파싱 규칙을 정의하기 위한 직관적인 DSL을 제공해요.

우리의 ZModel 언어 구문은 다음과 같이 형식화될 수 있어요:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
/*
Langium 언어로 번역한 내용입니다.

ZModel 문법

시작 스키마:
    (모델+=모델)*;

모델:
    '모델' 이름=아이디 '{'
        (필드+=필드)+
        (규칙+=규칙)*
    '}';

필드:
    이름=아이디 타입=(유형 | 모델참조) (배열?='[' ']')?;

모델참조:
    대상=[모델];

유형 반환 문자열:
    'Int' | 'String' | 'Boolean';

규칙:
    '@@허용' '('
        접근유형=문자열 ',' 조건=조건
    ')';

조건:
    필드=단순식 '==' 값=단순식;

단순식:
    필드참조 | 부울;

필드참조:
    대상=[필드];

부울 반환 불리언:
    'true' | 'false';

숨겨진 종결 WS: /\s+/;
종결 아이디: /[_a-zA-Z][\w_]*/;
종결 문자열: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;
*/
텍스트를 토큰으로 분할하는 렉싱 규칙이 있는 표입니다. 간단한 언어이므로 식별자(ID)와 문자열(STRING) 토큰만 있습니다. 공백은 무시됩니다.

나머지 규칙은 구문 분석 규칙입니다. 토큰 스트림을 트리로 어떻게 구성해야 하는지를 결정합니다. 파서 규칙은 렉싱 프로세스에 참여하는 키워드(Int, @@허용 등)도 포함할 수 있습니다. 복잡한 언어의 경우 재귀적 구문 분석 규칙(예: 중첩된 표현)이 필요할 수 있지만 이 간단한 예제에는 그런 내용이 없습니다.

언어 규칙이 준비되었으므로 Langium API를 사용하여 코드 스니펫을 다음 파스 트리로 변환할 수 있습니다.
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

<img src="/TIL/assets/img/2024-07-07-HowMuchWorkDoesItTaketoBuildaProgrammingLanguage_1.png" />

## 단계 2: 구문 트리에서 링크드 트리로

파스 트리는 소스 파일의 의미론을 이해하는 데 매우 도움이 됩니다. 그러나 종종 더 완전하게 만들기 위해 한 단계를 더 진행해야 합니다.

우리의 ZModel 언어는 "교참조"를 허용합니다. 예를 들어, User 모델의 posts 필드는 Post 모델을 참조합니다. 그리고 Post 모델은 다시 author 필드를 통해 참조를 합니다. 파스 트리를 탐색할 때, ModelReference 노드에 도달하면 "Post"라는 이름을 참조하는 것을 볼 수 있지만 그 의미를 직접 알 수 없습니다. 일치하는 이름의 모델을 찾기 위해 즉석 조회를 할 수 있지만, 보다 체계적인 접근법은 "링킹" 패스를 수행하여 모든 이러한 참조를 해결하고 해당 노드에 링크하는 것입니다. 이러한 링킹이 완료되면, 우리의 파스 트리는 다음과 같이 보입니다 (간략함을 위해 일부 트리만 표시됨):

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

![Image](/TIL/assets/img/2024-07-07-HowMuchWorkDoesItTaketoBuildaProgrammingLanguage_2.png)

기술적으로 말하면 그것은 트리가 아닌 그래프이지만, 관례상 파스 트리라고 계속 부르겠습니다.

Langium의 장점 중 하나는 대부분의 경우 도구가 링킹 패스를 자동으로 수행한다는 것입니다. 파싱된 노드의 중첩 계층 구조를 따라서 이름을 해결하고 적절한 대상 노드에 링크할 때 사용합니다. 복잡한 언어의 경우 특별한 해결 동작이 필요한 경우가 있을 수 있습니다. Langium은 여러 서비스를 사용자 정의로 구현하여 링킹 프로세스에 연결할 수 있도록 해 줌으로써 이를 쉽게 만들어 줍니다.

## 단계 3. 연결된 트리에서 의미론적 정확성으로

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

컴파일러는 입력 소스 파일에 렉서 또는 파서 오류가 포함되어 있으면 오류를 보고하고 중단합니다.

```js
model {
  id
  title String
}
```

```js
'ID' 유형의 토큰을 예상했지만 `{`를 발견했습니다. [Ln1, Col7]
```

그러나 이러한 오류가 없어도 코드가 의미론적으로 올바르다는 뜻은 아닙니다. 예를 들어, 아래 내용은 구문적으로 유효하지만 의미론적으로 잘못되었습니다. title을 true와 비교하는 것은 말이 되지 않습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
모델 Post {
  id Int
  title String
  author User
  published Boolean

  @@allow('read', title == true) // <- 비교가 잘못되었습니다
}
```

의미론적 규칙은 보통 언어별로 다르며, 도구들은 거의 자동적으로 아무것도 할 수 없습니다. Langium이 이를 처리하는 방법은 다양한 노드 유형을 유효성 검증할 수 있는 후크를 제공하는 것입니다.

```js
export function registerValidationChecks(services: ZModelServices) {
  const registry = services.validation.ValidationRegistry;
  const validator = services.validation.ZModelValidator;
  const checks: ValidationChecks<ZModelAstType> = {
    SimpleExpression: validator.checkExpression,
  };
  registry.register(checks, validator);
}

export class ZModelValidator {
  checkExpression(expr: SimpleExpression, accept: ValidationAcceptor) {
    if (isFieldReference(expr) && expr.target.ref?.type !== "Boolean") {
      accept("error", "Only boolean fields are allowed in conditions", {
        node: expr,
      });
    }
  }
}
```

이제 의미론적 문제에 대한 좋은 오류를 얻을 수 있습니다:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

오직 불리언 필드만 조건문에서 허용됩니다 [Ln 7, Col 19]

렉싱, 파싱, 링킹과는 달리, 의미 체크 프로세스는 매우 선언적이거나 체계적이지 않습니다. 복잡한 언어의 경우, 명령적 코드로 많은 규칙을 작성하게 될 것입니다.

![Programming Language](/TIL/assets/img/2024-07-07-HowMuchWorkDoesItTaketoBuildaProgrammingLanguage_3.png)

## 4단계. 개발자 경험 향상

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

요즘에는 개발 도구를 만드는 데 기준이 높습니다. 혁신은 탁월하게 작동할 뿐만 아니라 탁월한 느낌을 주어야 번창할 수 있어요. 언어와 컴파일러 관점에서, DX는 주로 세 가지로 이루어져 있어요:

- IDE 지원
  좋은 IDE 지원 — 구문 강조, 서식 지정, 자동 완성 등 — 은 학습 곡선을 크게 낮추고 개발자의 삶의 질을 향상시킵니다. Langium에 대해 좋아하는 점 중 하나는 Language Server Protocol을 내장 지원한다는 것이에요. 구문 분석 규칙과 유효성 검사가 자동으로 적절한 기본 LSP 구현이 되어서 VSCode와 최신 JetBrains IDE와 직접 작동합니다(일부 제한 사항이 있을 수 있습니다). 그러나 탁월한 IDE 경험을 제공하기 위해서는 Langium에 의한 LSP 관련 서비스의 기본 구현을 많이 수정하여 광택을 내야 할 필요가 있습니다.

![이미지](/TIL/assets/img/2024-07-07-HowMuchWorkDoesItTaketoBuildaProgrammingLanguage_4.png)

- 오류 보고
  귀하의 유효성 검사 로직은 많은 경우 오류 메시지를 생성할 것이며, 이 메시지의 정확성과 유용성은 개발자가 얼마나 빨리 이해하고 이를 수정할 수 있는지를 크게 결정할 것입니다.
- 디버깅
  귀하의 언어가 "작동"하는 경우(더 자세한 내용은 다음 섹션을 참조하세요), 디버깅 경험이 필수적입니다. 디버깅이란 어떤 것을 의미하는지는 언어의 성격에 따라 다릅니다. 그것이 명령문과 제어 흐름을 포함하는 명령형 언어면 단계별 진행 및 상태 검사가 필요할 것입니다. 또는 선언적 언어인 경우, 디버깅은 복잡성(규칙, 표현식 등)을 해결하는 데 도움이 되는 시각화를 의미할 것입니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 단계 5. 유용하게 만들기

결정된 오류가 없는 파스 트리를 도출하는 것은 상당히 멋지지만, 그 자체로는 그리 유용하지 않습니다. 여러 가지 방법을 사용하여 추후 진행하고 실제 값으로 생성할 수 있습니다:

- 여기서 그만 두기
  여기서 멈출 수도 있고, 파스 트리를 결과물로 선언하고 사용자가 이를 어떻게 사용할지 결정하도록 할 수도 있습니다.
- 다른 언어로 변환하기
  언어는 종종 파스 트리를 하위 수준의 언어로 변환하는 "백엔드"를 갖습니다. 예를 들어, Java 컴파일러의 백엔드는 JVM 바이트 코드를 생성합니다. TypeScript의 백엔드는 Javascript 코드를 생성합니다. ZenStack에서는 ZModel을 Prisma 스키마 언어로 변환합니다. 그런 다음 대상 언어의 도구/런타임이 이를 입력으로 사용할 수 있게 됩니다.
- 플러그 가능한 변환 메커니즘 구현하기
  언어 사용자가 자체 백엔드 변환을 제공할 수 있도록 플러그인 메커니즘을 구현할 수도 있습니다. 이것은 #1을 수행하는 보다 구조화된 방법입니다.
- 파스 트리를 실행하는 런타임 구축하기
  언어를 구축하는 가장 "완전한" 루트입니다. 구문 분석된 코드를 "실행"하는 인터프리터를 구현할 수 있습니다. "실행"이 의미하는 바는 완전히 사용자에게 달려있습니다. ZenStack에서는 ZModel을 Prisma 스키마 언어로 변환하는 것 외에도 데이터 액세스 중에 접근 제어 규칙을 강제하는 런타임이 있습니다.

## 단계 6. 사용하기 좋게 만들기

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

축하합니다! 이제 자신을 칭찬해도 좋습니다. 왜냐하면 새로운 언어를 만드는 일의 20%를 완료했기 때문이죠. 혁신은 대부분 사람들에게 판매하는 것이 가장 어려운 부분이라는 것을 잊지 마세요. 심지어 무료일 때도요. 언어를 개발한 건 개인적으로나 팀 내부에서만 사용할 예정이라면 그만두는 것도 좋지만, 대중을 대상으로 한다면 열심히 마케팅해야 합니다. 그것이 나머지 80%의 작업을 차지하죠 😄.

# 마지막으로

컴파일러 구축은 소프트웨어 엔지니어링이 지난 몇 십 년 동안 빠르게 발전했기 때문에 고대 예술처럼 느껴집니다. 그럼에도 불구하고, 진지한 개발자가 독특한 경험을 쌓기 위해 시도해볼 만한 분야라고 생각합니다. 프로그래밍의 이중성을 아주 잘 반영하죠 — 미학과 실용주의. 훌륭한 소프트웨어 시스템은 일반적으로 우아한 개념 모델을 갖추고 있지만, 표면 아래에서 그다지 예쁘지 않은 다양한 개선 사항을 찾을 수도 있습니다.

왜냐면 언어를 만들어보는 것이 어떨까요? 😊

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

![ZenStack](/TIL/assets/img/2024-07-07-HowMuchWorkDoesItTaketoBuildaProgrammingLanguage_5.png)

ZenStack를 개발 중입니다. 이 툴킷은 Prisma ORM을 강력한 엑세스 제어 계층과 함께 사용하여 풀스택 개발을 위한 최대한의 잠재력을 발휘합니다. 만약 이 프로젝트가 흥미로우시다면 읽어 주셨던 분들 중 별을 눌러 주시면 더 많은 분들이 찾아볼 수 있도록 도와주세요!
