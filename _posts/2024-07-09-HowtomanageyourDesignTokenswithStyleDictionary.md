---
title: "Style Dictionary로 디자인 토큰을 관리하는 방법"
description: ""
coverImage: "/ui-log-2/assets/img/2024-07-09-HowtomanageyourDesignTokenswithStyleDictionary_0.png"
date: 2024-07-09 18:21
ogImage:
  url: /assets/img/2024-07-09-HowtomanageyourDesignTokenswithStyleDictionary_0.png
tag: Tech
originalTitle: "How to manage your Design Tokens with Style Dictionary"
link: "https://medium.com/@didoo/how-to-manage-your-design-tokens-with-style-dictionary-98c795b938aa"
---

요즘 새로운 도구를 발견했어요. 아마존의 Danny Banks가 개발한 Style Dictionary라는 도구인데, 디자인 시스템을 위한 디자인 토큰(또는 "스타일 속성")을 관리할 수 있게 해줘요. 우리가 Cosmos 디자인 시스템의 디자인 토큰을 처리했던 기존 도구를 대체하기 위해 사용했어요. 이 작업이 정말 흥미롭다고 느꼈고, 그래서 다른 분들도 제가 배운 것을 통해 이득을 볼 수 있도록 문서화하기로 결심했어요.

참고: 가능한 포괄적으로 작성하려고 노력했기 때문에, 이 블로그 글은 정말 길어요. 알아요, 알아요... ¯\_(ツ)\_/¯.

만약 코드를 직접 확인하고 싶다면, 프로젝트에서 사용한 것과 유사한 구성 및 설정을 가진 GitHub 리포지토리를 만들었어요:

➡️ https://github.com/didoo/style-dictionary-demo ⬅️

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

거기로 가서 코드를 확인해보세요. 꽤 간단할 거에요. 원하신다면 프로젝트를 복제하고 시작 지점으로 사용할 수 있어요 (하지만 이것은 꽤 주관적이므로 특정한 맥락과 요구 사항에 적합하지 않을 수 있습니다).

대신에 Style Dictionary를 좀 더 이해하고 구성하는 방법에 대해 알고 싶고, 또 내가 이 도구를 채택하게 된 기술적인 이유를 알고 싶다면, 내가 우리 디자인 시스템에 이것을 도입하는 동안 내가 한 선택과 결정을 읽어보세요.

시작하기 전에 주의사항 한 가지: 나의 Style Dictionary 경험은 우리 디자인 시스템 내에서 디자인 토큰의 설정 및 사용자 정의에 있습니다. 이 것이 무엇을 할 수 있는지, 그 기능과 API, 그 고급 기능에 대한 더 자세한 설명을 원하신다면 공식 문서를 참조하세요. 또한, 이 인상적인 프로젝트에 대한 모든 크레딧은 그 기여자들과 특히 Danny Banks에게 돌아갑니다.

# 디자인 토큰에 대해

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

디자인 시스템에서는 종종 "디자인 토큰"이라고 하는 특별한 개체를 사용하여 "디자인 결정"을 저장합니다. 이러한 개체는 키/값 쌍의 형태로 저장되며 일반적으로 JSON 또는 YAML과 같은 특정 파일 형식에 저장됩니다. 이 파일들은 후에 입력 파일로 사용되어 처리되고 변환되어 다른 형식의 다른 출력 파일을 생성하기 위해 사용되며, 다른 프로젝트와 코드베이스에서 포함 및 사용됩니다. (디자인 토큰에 대해 더 알고 싶다면 여기, 여기, 여기, 여기를 읽어보세요).

예를 들어, 다음은 `Button/` 컴포넌트 스타일 선언에 Sass 변수로 일부 디자인 토큰을 사용하는 방법입니다:

```js
.button {
    position: relative;
    display: block;
    width: 100%;
    min-height: $token-button-height;
    margin: 0;
    padding: $token-spacing-sm $token-spacing-xxlg;
    border-radius: $token-button-border-radius;
    text-align: center;
}

// 변형

.button--stroke {
    border: $token-button-border-width solid currentColor;
    background: transparent;
}

.button--monochrome {
    border: $token-button-border-width solid $token-colour-gray;
    background: #fff;
    color: $token-colour-black;
}

// 그리고 다른 변형들
...
```

이러한 속성들은 또한 스타일 가이드에서 노출되어 문서화의 일부가 될 수 있도록 되어 있습니다:

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

![이미지](/ui-log-2/assets/img/2024-07-09-HowtomanageyourDesignTokenswithStyleDictionary_0.png)

# Theo에서의 이주

일 년 전에 디자인 토큰을 디자인 시스템에 소개했을 때, 디자인 토큰 관리의 최신 기술은 Salesforce의 디자인 시스템 팀이 개발한 도구인 Theo였습니다. 주로 Adam Putinski와 Kaelig Deloumeau-Prigent(현재는 Shopify에서 일함)가 번쩍이는 디자인 토큰을 Lightning Design System에서 관리하기 위해 개발한 도구입니다.

당시 사용 가능한 버전은 Theo5였으며, 몇 주 전까지 이렇게 디자인 토큰 선언이 보였습니다:

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

```json
{
  "global": {
    "type": "token",
    "category": "brick"
  },
  "aliases": {
    "TOKEN_BRICK_SIZE_SM": {
      "value": "70px"
    },
    "TOKEN_BRICK_SIZE_MD": {
      "value": "100px"
    },
    "TOKEN_BRICK_SIZE_LG": {
      "value": "120px"
    }
  },
  "props": {
    "TOKEN_BRICK_SIZE_XXSM": {
      "value": "36px"
    },
    "TOKEN_BRICK_SIZE_SM": {
      "value": "{!TOKEN_BRICK_SIZE_SM}"
    },
    "TOKEN_BRICK_SIZE_MD": {
      "value": "{!TOKEN_BRICK_SIZE_MD}"
    },
    "TOKEN_BRICK_SIZE_LG": {
      "value": "{!TOKEN_BRICK_SIZE_LG}"
    },
    "TOKEN_BRICK_SIZE_XLG": {
      "value": "150px"
    }
  }
}
```

테오는 그때부터 많이 발전했어요 (우리는 이제 Theo8입니다!) 토큰 값을 선언하는 방식이 많이 바뀌었지만 여전히 아픈 부분(적어도 저에겐)은 다른 토큰의 값을 참조하려면 특정 별칭 정의를 사용하기 전에 선언해야 하고, 이 선언이 다른 파일에 있는 경우 사용하는 위치를 가져와야 한다는 사실입니다(또한 가져와야 하는 파일의 선언 순서가 중요하다는 의미입니다).

이런 방식으로 "별칭"을 정의하는 것은 매우 반복적이라는 것(예를 들어 위에서 TOKEN_BRICK_SIZE_SM/MD/LG를 별칭으로 및 프로퍼티로 두 번 선언해야 하는 것 같은)과 같은 문제를 야기합니다. 또한 이 방식으로 설계 토큰의 조직화 및 저장된 파일 구성도 매우 지시적(예를 들어 여기나 여기에서)이며, 디자인 토큰을 리팩토링하거나 재정렬할 때 매우 엄격합니다.

또한 토큰에 사용 설명을 위해 사용자 지정 메타데이터를 연결하는 테스트도 수행했지만, 생성된 파일에서 이 정보를 노출하는 방법을 찾지 못해 스타일 가이드에서 토큰에 대한 설명을 포함시키지 못했습니다. 그래서 저희는 스타일 가이드에서 토큰 설명을 생략하게 되었어요.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

잘못 알아들으시면 안 돼요. Theo는 훌륭한 도구이고, 위에 언급한 문제들은 작은 세부사항일 뿐, 개인적인 기호 문제일 뿐이에요. (그래서 제 인상을 근거로 선택하시지 마세요. 언제나 도구가 당신을 위해 무엇을 할 수 있는지, 문제를 어떻게 해결해주는지, 당신의 요구에 따라 고려해야 해요!)

어쨌든, 우리 디자인 시스템의 토큰을 처음으로 Theo로 구현했을 때는, 우리의 설정이 괜찮다고 느꼈어요... 하지만 정확히 원하는 대로가 아니었어요. 항상 조금은 다르게 했을 것 같은데, 그걸 할 수 없었죠 (아마도 기술적 한계와 도구에 대한 제 이해 한계 때문에).

그 사실은 100% 만족스럽지 않았다는 거예요. 제 마음 깊숙한 곳에, 항상 Theo를 사용자 정의 도구로 교체하는 아이디어가 있었어요. 하지만 시간 부족(그리고 이렇게 복잡한 작업에 리소스를 투자하기 주저하는 것)으로 이 아이디어를 재고하고 기존 설정을 유지하기로 결정했어요.

# Style Dictionary와의 첫 만남

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

처음으로 스타일 사전(Style Dictionary)에 대해 어디에서 읽었는지 정확히 기억하지는 못해요. 아마도 트위터 피드나 미디엄 블로그 글, 또는 디자인 시스템 Slack 채널의 채팅 중 어딘가에서 읽은 것 같아요. (Shaun Bent가 이것이 올해 2월에 발표되었다고 지적해 주었는데, 그 포스트는 기억이 나지 않네요).

GitHub 프로젝트의 이력을 보면 그들이 오랜 시간동안 작업해 왔다는 것 같아요. 하지만 몇 달 전까지는 전혀 들어보지 못했어요.

프로젝트 웹사이트를 빨리 살펴봤던 기억이 나는데, 디자인 토큰과 어떤 관련이 있는 것 같다는 것은 이해했어요. 하지만 "스타일 속성"이라는 용어를 사용하는 것이 보편적인 "디자인 토큰" 대신 사용되어서 정확히 이해하지는 못했어요.

또한 눈에 띄었던 이 그림을 기억해요:

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

![스타일 사전으로 디자인 토큰을 관리하는 방법](/ui-log-2/assets/img/2024-07-09-HowtomanageyourDesignTokenswithStyleDictionary_1.png)

이렇게 다른 JSON 파일을 "깊은 병합"하는 것(또한, 다른 플랫폼을 위한 다른 컴파일)이 바로 제가 생각한 것이었습니다.

당시에는 조사할 시간이 없어서 레포지토리에 별을 달고 자세히 살펴보기로 약속했습니다. 할 일이 별로 없던 어느 날, Style Dictionary가 토큰의 JSON 파일에서 속성들을 "깊은 병합"하는 것을 어떻게 지원하는지 빠르게 테스트해 보았습니다. 결과는 바로 제가 기대했던 것이었습니다: Style Dictionary에서 JSON 키/값 쌍에 추가 속성을 부여하면, 이 메타 정보가 출력된 처리된 파일에서 매끈하게 이어진다는 것이었습니다. 완벽!

내 백로그에 티켓을 만들었습니다 — DO-132 — 디자인 토큰 생성을 위한 Style Dictionary 평가 — 그리고 일상적인 컴포넌트 관련 작업을 진행했습니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

그리고 몇 주 후에 한 트윗이 눈에 띄었어요.

나는 즉시 그 발표 자료의 슬라이드를 살펴보았고, 그 프로젝트에 반해버렸어요. 가능한 한 빨리 시도해보고 싶었어요.

가능한 첫 기회에 그 작업에 착수했고, 두 날이 지나서 우리 디자인 토큰 시스템의 완전히 업데이트된 버전이 Style Dictionary 위에 구축되어 운영 중이었어요.

위에서 말한대로, Style Dictionary를 채택하는 것이 얼마나 간단하고 즐거웠는지 고려할 때, 나는 내가 블로그 글을 쓰는 것이 적합하지 않을까 생각하기 시작했어요. 왜 이것으로 전환하기로 결정한 이유들을 강조하되, 그 과정 중에 배운 것들도 포함하여 경험을 소개해보는 것은 어떨까요. 그래서 이곳에 제 발견 내용을 소개합니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

# Style Dictionary 초기 설정

다른 도구들과 비교해보면, Style Dictionary를 사용하여 바로 시작하기가 매우 쉬웠습니다: 5분 이내에 이미 새로운 디자인 토큰을 만들고 있었습니다.

제 제안은 토큰을 저장할 폴더를 만들고, 패키지를 설치한 다음 다음 명령을 실행하는 것입니다:

```js
style-dictionary init basic
```

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

기본 프로젝트를 작성하는 것이며 일부 예제 JSON 파일과 토큰을 처리하고 출력 파일의 다양한 형식을 생성하는 데 필요한 config.json 파일이 포함됩니다 (자세한 내용은 나중에 설명합니다).

내 경우에는 기존 /tokens 폴더에 직접 만들었습니다. 왜냐하면 Style Dictionary의 기본 구조가 Theo 구현의 폴더 구조와 다르기 때문입니다 (Style Dictionary는 properties와 build를 사용하고, 저는 src와 dist를 사용했기 때문에 충돌이 발생할 우려가 없습니다). 초기 설정 후에 기존 폴더를 tokens/src.old와 tokens/dist.old로 이름을 변경하고, 새 폴더를 tokens/src와 tokens/dist로 만들어서 config.json 파일을 업데이트하여 새 경로를 반영했습니다. 이렇게 함으로써 Theo로 생성된 파일과 Style Dictionary로 생성된 파일을 계속 비교하고 차이가 있는지 확인할 수 있었습니다. 저의 목표는 React의 컴포넌트 라이브러리 및 모바일 웹 애플리케이션을 사용하는 코드를 변경하지 않고 Theo를 사용하여 생성된 토큰을 Style Dictionary를 사용하여 생성된 토큰으로 원활하게 대체하는 것이었습니다.

이제 프로젝트가 설정되었으면, CLI에서 "build" 명령을 실행하면 됩니다:

```js
style-dictionary build
```

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

이것은 "변환"을 수행하여 JSON 파일을 처리하고 구성 파일에서 선언된 옵션에 따라 결과 토큰 파일을 생성합니다.

CLI의 미리 정의된 빌드 명령을 사용하면 토큰을 처리하는 가장 간단한 방법이지만, 원한다면 사용자 정의 빌드 스크립트를 구현할 수도 있습니다 (이에 대해서는 나중에 자세히 설명하겠습니다).

# Style Dictionary를 사용하여 자신의 프로젝트에 적용하기

이제 여러분은 토큰의 JSON 파일(및 구성 파일)을 활용하여 다양한 스타일 속성의 구성 및 다양한 출력 형식 생성을 확인해볼 수 있습니다. 원한다면 Style Dictionary 프로젝트 저장소에 포함된 예제 폴더를 살펴보아 더 복잡한 구성 및 사용 사례를 확인할 수 있지만, Style Dictionary가 제공하는 보다 고급 기능(예: "토큰"으로서 글꼴 또는 아이콘과 같은 자산의 배포 또는 React Native 프로젝트용 토큰 생성)에 혼동되지 않도록 "기본"부터 시작하는 것을 제안합니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

## 문서

Style Dictionary 프로젝트는 매우 잘 문서화되어 있습니다. 공식 웹사이트를 이 주소에서 확인할 수 있어요: [https://amzn.github.io/style-dictionary/](https://amzn.github.io/style-dictionary/) 또는 직접 깃헙 저장소의 마크다운 파일을 읽으세요: [https://github.com/amzn/style-dictionary/tree/master/docs](https://github.com/amzn/style-dictionary/tree/master/docs).

저는 매우 유용한 것을 찾았고 — 그리고 이를 권장합니다 — 특성 JSON 및 구성 파일을 사용하여 놀고 실험하면 전체 시스템이 어떻게 작동하는지 이해하려고 노력하는 것이 좋다고 생각해요. 또한 문서를 읽으면서 뭔가가 100% 명확하지 않거나 명백하지 않을 때 읽는 것이 좋습니다. 이 방법을 따르면 단 몇 시간 만에 디자인 토큰의 전체 세트를 사용자 정의하고 사용자 지정 빌드 스크립트를 만드는 데 자신이 느끼게 될 거예요.

## "카테고리 `유형` 항목" 분류

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

Style Dictionary에는 토큰의 암시적 분류가 있습니다:

![image](/ui-log-2/assets/img/2024-07-09-HowtomanageyourDesignTokenswithStyleDictionary_2.png)

이 분류는 JSON 파일 내의 속성 중첩을 기반으로 합니다. 예를 들어 다음 코드를 살펴보면:

```js
{
  "button": {
    "border": {
      "width": {
        "value": "1px"
      }
    }
  }
}
```

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

빌드 명령을 통해 처리하면 결과 JSON이 다음과 같이 됩니다:

```js
{
  "button": {
    "border": {
      "width": {
        "name": "button-border-width",
        "value": "1px",
        "original": {
          "value": "1px"
        },
        "attributes": {
          "category": "button",
          "type": "border",
          "item": "width"
        },
        "path": [
          "button",
          "border",
          "width"
        ]
      }
    }
  }
}
```

위와 같이 소스 JSON의 중첩 순서가 자동으로 논리적 트리/구조로 해석되며, 속성 이름의 구성에 사용됩니다(e.g. 이 예시에서의 $button-border-width 및 BUTTON_BORDER_WIDTH), 또한 미리 정의된 "CTI" 속성 세트와 연관시킵니다.

Style Dictionary를 사용하면 많은 도우미 및 기능에서 이 암시적인 CTI 분류를 일관되게 찾을 수 있습니다. 다행히도 엄격히 따라야 하는 것은 아니며(이는 프로젝트의 품질과 그 저자의 지혜에 대해 많은 것을 말합니다), 문서에 따르면 "스타일 속성을 원하는 대로 구성하고 명명할 수 있다. 제한이 없습니다.". 그래도 이 도구의 내재적인 특성을 명심하는 것이 중요하므로 올바르게 사용하거나 필요에 맞게 작업할 수 있습니다. (제 프로젝트에서 한 것처럼, 디자인 토큰을 다른 분류 기준으로 설정하는 것을 선호했기 때문에 다르게 처리했습니다).

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

# 내 디자인 토큰 조직

우리의 디자인 시스템인 Cosmos는 다른 “플랫폼”(Mobile Web, iOS 및 Android)과 다른 “브랜드”(우리 애플리케이션에는 화이트 레이블 제품이 있음)을 지원하기 위해 만들어졌습니다.

React로 구축된 Cosmos 컴포넌트 라이브러리는 완전히 Mobile Web 애플리케이션에서 채택되었으며, 네이티브 플랫폼에 대해서는 UI를 컴포넌트로 분해하는 방법을 “참고자료”로 사용합니다. (미래에 React Native 버전의 컴포넌트를 고려할 수도 있으며, 그 경우 네이티브 플랫폼도 Cosmos 컴포넌트를 사용할 수 있게 될 것입니다).

반면에 Cosmos 디자인 토큰은 모든 플랫폼에서 사용됩니다. 이에 따라, 우리는 디자인 토큰을 다른 브랜드와 플랫폼에 필요한 값들과 관련하여 조직화했습니다. 일부는 브랜드에 의존합니다 (예: 주요 및 보조 색상), 일부는 플랫폼에 따라 다릅니다 (예: 글꼴 패밀리 및 버튼 높이), 그리고 일부는 전역적으로 동일한 값을 갖기 때문에 모든 브랜드와 플랫폼에 대해 동일합니다(예: color-facebook 또는 spacing-small).

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

저희의 JSON 소스 파일의 폴더 구조를 간단히 설명드리겠습니다:

```js
├── config.json
├── src/
│   ├── brands/
│   │   ├── brand_#1/
│   │   │   └── color.json
│   │   ├── brand_#2/
│   │   │   └── color.json
│   │   ├── brand_#3/
│   │   │   └── color.json
│   ├── globals/
│   │   ├── base/
│   │   │   └── index.json
│   │   ├── color/
│   │   │   ├── basic.json
│   │   │   ├── grayscale.json
│   │   │   ├── features.json
│   │   │   └── social.json
│   │   ├── icon/
│   │   │   └── index.json
│   │   ├── ...
│   │   ├── spacing/
│   │   └── typography/
│   │       └── index.json
│   ├── platforms/
│   │   ├── android/
│   │   │   ├── button.json
│   │   │   ├── ...
│   │   │   └── typography.json
│   │   ├── ios/
│   │   │   ├── button.json
│   │   │   ├── ...
│   │   │   └── typography.json
│   │   └── mobile_web/
│   │       ├── button.json
│   │       ├── ...
│   │       └── typography.json
```

이 구성을 사용하면 다양한 토큰을 어디에서 찾을 수 있는지, 필요할 때 새 토큰을 추가하는 방법, 라이브러리에서 구성 요소를 제거할 때 어떤 파일을 제거해야 하는지가 명확하고 쉽게 이해됩니다.

대상/출력 폴더의 구성에 대해 제 것 같은 구조를 선호했습니다. 다양한 "사용자"들이 관심 있는 파일을 찾기 쉽고 명확하게 구성되어 있습니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

위는 생성된 파일의 폴더 구조의 스키마입니다:

```js
├── dist/
│   │── android/
│   │   ├── ...
│   │── ios/
│   │   ├── ...
│   │── mobile_web/
│   │   │── brand_#1/
│   │   │   ├── **.scss
│   │   │   ├── **.js
│   │   │   ├── **.json
│   │   │── brand_#2/
│   │   │   ├── **.scss
│   │   │   ├── **.js
│   │   │   ├── **.json
│   │   │── brand_#3/
│   │   │   ├── **.scss
│   │   │   ├── **.js
│   │   │   ├── **.json
│   │── style_guide/
│   │   ├── android_brand_#1.scss
│   │   ├── android_brand_#1.json
│   │   ├── android_brand_#2.scss
│   │   ├── android_brand_#2.json
│   │   ├── ...
│   │   ├── ios_brand_#1.scss
│   │   ├── ios_brand_#1.json
│   │   ├── ios_brand_#2.scss
│   │   ├── ios_brand_#2.json
│   │   ├── ...
│   │   ├── mobile_web_brand_#1.scss
│   │   ├── mobile_web_brand_#1.json
│   │   ├── mobile_web_brand_#2.scss
│   │   ├── mobile_web_brand_#2.json
│   │   ├── ...
```

보시다시피, 안드로이드 개발자인 경우 /Android 폴더에 토큰이 저장되어 있음을 즉시 알 수 있습니다. 원하는 형식(XML 파일 등)만 찾을 수 있습니다. 만약 모바일 웹 개발자인 경우, 필요한 파일(SCSS, JS 및 JSON 파일)이 있는 /Mobile_Web 폴더에서 파일을 찾을 수 있습니다.

반면에 /style_guide 폴더는 약간 다릅니다. 여기서 토큰은 코스모스 스타일 가이드에서 사용되며, 플랫폼/브랜드의 모든 가능한 조합에 대한 토큰 값을 노출해야 합니다. 사용자는 UI에서 선택할 수 있으므로 선택된 조합에 따라 해당 토큰 값을 동적으로로드해야 합니다. 이 경우 모든 파일이 단일 폴더에있는 평면 구조가 더 나은 방법입니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

![image](/ui-log-2/assets/img/2024-07-09-HowtomanageyourDesignTokenswithStyleDictionary_3.png)

요즘 실제 토큰 값들을 파일 안에 선언할 때, 그들을 실제 컴포넌트에 대응되는 방식으로 정렬하기로 결정했습니다. 예를 들어, 제안된 CTI - 카테고리 `타입` 항목 - 구성 (예: 색상 `배경` 버튼)을 따르는 대신에 더 "컴포넌트 중심"으로 분류하기로 선택했습니다.

몇 가지 예를 들어 보겠습니다.

Input 컴포넌트를 고려해보겠습니다. 우리 스타일 가이드에서 이 컴포넌트가 어떻게 보이는지 살펴봅시다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

위의 내용을 보시다시피 `Input/` 컴포넌트는 `Choice/`, `Toggle/`, 그리고 `Search/` 세 가지 특화된 컴포넌트로 구분됩니다. 이러한 컴포넌트들의 파일 구성은 코드베이스에서 다음과 같이 구성되어 있습니다:

```js
├── component-library/
│   │   ...
│   ├── gift/
│   ├── icon/
│   ├── input/
│   │   ├── Input.js
│   │   ├── Input.scss
│   │   ├── Choice.js
│   │   ├── Search.js
│   │   ├── Toggle.js
│   ├── mark/
│   ├── modal/
│   │   ...
```

이 구조에 일관성을 유지하기 위해 이 그룹 컴포넌트의 디자인 토큰은 tokens/src/globals/input/index.json에 저장되며 값은 다음과 같은 중첩 형식으로 선언됩니다:

```js
{
  "input": {
    "choice": {
      "size": {
        "value": "24px"
      }
    },
    "toggle": {
      "width": {
        "value": "40px"
      },
      "height": {
        "value": "24px"
      }
    },
    "search": {
      "height": {
        "value": "32px"
      }
    }
  }
}
```

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

생성된 변수들은 이 ‘no-brainer’ 네이밍 규칙을 유지하며 이러한 컴포넌트의 소스 코드에서 사용됩니다:

```js
$token-input-choice-size: 24px;
$token-input-toggle-width: 40px;
$token-input-toggle-height: 24px;
$token-input-search-height: 32px;
```

(생성된 변수에는 “token” 접두사가 있는 것을 알았을 것입니다. 나중에 이에 대해 더 설명하겠습니다).

또 다른 중요한 조직 형태의 결과는 다른 컴포넌트 안에서 “별칭”을 쉽게 사용하거나 다른 토큰 값을 참조하는 것입니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

예를 들어, 브랜드의 주요 색상과 보조 색상에 대해 토큰으로 선언하지 않고 별칭으로 선언했습니다:

```js
{
  "alias": {
    "colour": {
      "brand": {
        "primary": {
          "value": "#bada22"
        },
        "secondary": {
          "value": "#c0ffee"
        }
      }
    }
  }
}
```

이 방법으로 전역 색상 선언에서 바로 사용할 수 있었습니다:

```js
{
  "colour": {
    "primary": {
      "value": "{alias.colour.brand.primary.value}"
    },
    "secondary": {
      "value": "{alias.colour.brand.secondary.value}"
    },
    ...
  }
}
```

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

다른 구성 요소 내에서 다른 구성 요소의 토큰 값을 참조할 수도 있습니다.

예를 들어, `Icon/` 컴포넌트의 파일은 다음과 같습니다:

```js
{
  "icon": {
    "size": {
      "xsm": { "value": "10px" },
      "sm": { "value": "16px" },
      "md": { "value": "22px" },
      "lg": { "value": "30px" },
      "xlg": { "value": "36px" },
      "xxlg": { "value": "46px"       }
    },
    "jumbo-size": {
      "md": { "value": "{brick.size.md.value}" },
      "lg": { "value": "{brick.size.lg.value}" }
    }
  }
}
```

실제 토큰 값이 포함된 `Brick/` 컴포넌트 파일은 다음과 같습니다:

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

```json
{
  "brick": {
    "size": {
      "xxsm": {...},
      "sm": {...},
      "md": { "value": "100px" },
      "lg": { "value": "120px" },
      "xlg": {...}
    }
  }
}
```

여기 보면, 디자이너들이 결정한 Brick 요소의 크기와 아이콘 요소의 'jumbo' 크기 사이의 상관관계를 매우 간단하고 명확하며 무엇보다 의미론적으로 표현할 수 있었습니다.

이제 Style Dictionary는 "별칭" 값들을 원활히 관리할 뿐만 아니라, 더 좋은 점은 파일을 가져오는 순서가 별칭 해결 관점에서 중요하지 않습니다!

즉, 프로젝트의 토큰을 구성하는 방법에 대해 완전한 자유를 가질 수 있습니다. 디자인 토큰의 구조를 실험해보고 당신의 요구 사항에 가장 잘 맞는 구성을 찾는 것을 제안합니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

마지막으로, 선언된 디자인 토큰의 실제 빌드 과정으로 넘어가기 전에 한 가지 더 있습니다. 이전에 언급했듯이 Style Dictionary를 사용하면 특정 속성에 연결하는 모든 속성이 소스 JSON 파일에서 자동으로 투명하게 전달되어 변환되고 출력 파일에 나타납니다.

예를 들어, 다음과 같은 선언을 작성하면:

```js
{
  "button": {
    "meta": {
      "description": "버튼 컴포넌트를 위한 디자인 토큰"
    },
    "border": {
      "width": {
        "value": "1px",
        "documentation": {
          "comment": "테두리의 너비"
        }
      }
    }
  }
}
```

생성된 JSON 파일은 다음과 같습니다:

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

```json
{
  "button": {
    "meta": {
      "description": "버튼 컴포넌트를 위한 디자인 토큰"
    },
    "border": {
      "width": {
        "value": "1px",
        "documentation": {
          "comment": "테두리의 너비"
        },
        "original": {...},
        "name": "button-border-width",
        "attributes": {...},
        "path": [...]
      }
    }
  }
}
```

본문에서 보시다시피, 원래의 JSON 파일에 추가 속성을 넣으면 빌드 프로세스 동안 보존되고 전달됩니다 (물론, 생성된 파일 형식이 이러한 표현을 지원해야 합니다).

이것은 두 가지 중요한 점을 의미합니다: 첫째, 토큰에 메타 정보를 연결하는 데 사용할 수 있습니다 (예를 들어, 스타일 가이드에 표시될 설명, 코멘트 및 노트를 추가하는 데 사용); 둘째, 빌드 프로세스에서 사용자 정의 액션 또는 변형을 만들 수 있으며, 이러한 추가 속성을 사용하여 값을 어떻게 처리할지를 선택적으로 결정할 수 있습니다.

마지막으로 멋진 점 하나 더: 단순히 값을 넣으면 이를 내보낼 Scss 파일에 주석으로 자동으로 추가됩니다 (실제로 모든 주석을 지원하는 파일 형식):

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

```js
{
  "button": {
    "border": {
      "width": {
        "value": "1px",
        "comment": "this is a comment"
      }
    }
  }
}
```

위와 같이 입력하면 출력물은 다음과 같이 생성됩니다:

```js
$button-border-width: 1px; // this is a comment
```

디자인 토큰과 관련된 최소한의 문서를 내보내고 싶을 때 유용합니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

이것은 이 라이브러리가 정말 신중하게 만들어진 많은 "멋진" 작은 세부 사항 중 하나일 뿐입니다: 문서를 읽어보시고 사용 가능한 모든 옵션을 살펴보면 이와 같은 많은 보석을 찾을 수 있을 것입니다.

# 내 (사용자 지정) 빌드 프로세스

위에서 말했듯이 Style Dictionary로 디자인 토큰을 빌드하는 가장 간단한 방법은 명령줄에서 다음을 실행하는 것입니다:

```js
style-dictionary build
```

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

명령에 수정자를 전달하여 설정 파일의 경로와 빌드할 플랫폼을 지정할 수 있어요.

토큰을 빌드하는 또 다른 방법은 Node 스크립트를 사용하는 것이에요. 여기에서도 간단한 명령으로 모든 플랫폼을 빌드할 수 있어요:

```js
const SD = require("style-dictionary").extend("config.json");
SD.buildAllPlatforms();
```

또는 비슷한 방법을 사용하여 특정 플랫폼만 빌드하기도 할 수 있어요:

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

```js
SD.buildPlatform("web");
```

위의 코드에서 보듯이 토큰을 빌드하는 방법에 대한 모든 사양은 하나의 위치에 포함되어 있습니다: 구성 파일입니다. 여기서는 소스 파일, 대상 폴더, 플랫폼, 형식 및 각 토큰에 적용하려는 변환을 선언합니다.

Style Dictionary에는 사전 정의된 변환 그룹 세트가 포함되어 있습니다 (예: web, scss, less, html, android, ios, assets). 그들은 그저 변환의 그룹일 뿐이며, 변환은 다시 말해 "각 플랫폼이 속성을 다른 방식으로 사용할 수 있도록 속성을 변환하는 함수"에 불과합니다.

일부 이러한 변환 함수는 토큰의 이름에 적용됩니다 (예: name/cti/camel 또는 name/cti/kebab), 일부는 값에 적용됩니다 (예: color/hex 또는 size/rem 또는 time/seconds), 그리고 일부는 속성에 적용됩니다 (예: attribute/cti).

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

이 함수들은 토큰의 이름, 값 및 속성에 직접 작용하기 때문에, 원하는 속성 및 값 선언 방식과 어떤 식으로 결합되는지를 의미합니다. 예를 들어, 어떤 이유로 "시간" 값을 측정 단위와 함께 선언하거나 선언하지 않을 수 있습니다(이는 토큰을 사용할 사람과 데이터의 형식을 기대하는 방식에 따라 다릅니다). 그러나 시간/초 변환은 "밀리초 시간을 10진수로 변환한다"는 것을 가정하며, 이는 특정 입력 형식을 사용하는 경우에만 사용할 수 있다는 것을 의미합니다. 비슷한 방식으로, 거의 모든 사이즈/\*\* 변환은 입력 값으로 숫자를 가정하며, 카테고리가 `size` 조건과 일치하는 토큰에만 적용됩니다(이는 꼭 당신의 사용 사례가 아닌 경우도 있습니다).

위에서 설명한 대로, 저는 다른 플랫폼에 대해 생성된 파일을 매우 구체적으로 구성하고 싶었습니다: 각각의 특정 형식(웹, iOS 및 안드로이드)을 해당 폴더에 저장하기만 하는 것이 아니라, 스타일 가이드에서 사용 가능한 플랫폼과 브랜드의 모든 가능한 조합/순열도 필요했습니다.

또한 토큰의 키/값 속성을 어떻게 구성하고 선언할지에 대해 완전한 자유를 갖고, 원하는 대로 조작할 수 있었으면 했습니다.

그래서 Style Dictionary 라이브러리에서 제공된 API를 활용한 커스텀 빌드 스크립트를 작성하기로 결심했습니다. 저는 공식 문서에 설명된 예제를 토대로 시작했습니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

```js
const StyleDictionary = require("style-dictionary");
const styleDictionary = StyleDictionary.extend("config.json");
// 객체를 사용하여도 확장할 수 있어요.
// const styleDictionary = StyleDictionary.extend({ ... });
// buildAllPlatforms 또는 buildPlatform('...')을 호출할 수 있어요.
styleDictionary.buildAllPlatforms();
```

이 코드를 읽고 나니, 사용할 수 있는 옵션이 명확했어요: 외부 config.json 파일을 참조하거나 확장 메서드에 사용자 정의 객체를 전달할 수 있었고, buildAllPlatforms를 통해 모든 플랫폼을 한꺼번에 빌드하거나 buildPlatform을 사용하여 보다 세분화된 방식으로 각 플랫폼별로 다른 설정 개체를 사용할 수 있었어요.

이 두 가지 옵션만 있으면, 첫 번째 빌드 스크립트를 만드는 데 오랜 시간이 걸리지 않았어요. 몇 차례 시도하고 반복한 후, 제 빌드 스크립트는 이렇게 보였어요:

```js
const StyleDictionaryPackage = require("./build-style-dictionary-package");
const getStyleDictionaryConfig = require("./build-style-dictionary-config");
console.log("빌드 시작...");
// 다양한 브랜드와 플랫폼을 위한 디자인 토큰 처리
["web", "ios", "android"].map(function (platform) {
  ["brand#1", "brand#2", "brand#3"].map(function (brand) {
    console.log("\n======================================");
    console.log(`\n처리 중: [${platform}] [${brand}]`);
    const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(brand, platform));
    if (platform === "web") {
      StyleDictionary.buildPlatform("web/js");
      StyleDictionary.buildPlatform("web/json");
      StyleDictionary.buildPlatform("web/scss");
    } else if (platform === "ios") {
      StyleDictionary.buildPlatform("ios");
    } else if (platform === "android") {
      StyleDictionary.buildPlatform("android");
    }
    StyleDictionary.buildPlatform("styleguide");
    console.log("\n처리 완료");
  });
});
console.log("\n======================================");
console.log("\n빌드 완료!");
```

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

여기서 하는 것은 간단해요: 제가 보유한 모든 플랫폼과 브랜드를 루프를 돌면서, 각 조합마다 특정 빌드를 실행하고, 이 빌드는 동적 설정 객체를 받아들여 플랫폼과 브랜드를 매개변수로합니다.

getStyleDictionaryConfig는 그 플랫폼 + 브랜드 조합에 특정한 구성 객체를 반환하는 함수에 불과해요:

```js
function getStyleDictionaryConfig(brand, platform) {
    return {
        "source": [
            `src/brands/${brand}/*.json`,
            "src/globals/**/*.json",
            `src/platforms/${platform}/*.json`
        ],
        "platforms": {
            "web/js": {
                "transformGroup": "tokens-js",
                "buildPath": `dist/web/${brand}/`,
                "files": [
                    {
                        "destination": "tokens.es6.js",
                        "format": "javascript/es6"
                    }
                ]
            },
            "web/json": {
                "transformGroup": "tokens-json",
                "buildPath": `dist/web/${brand}/`,
                "files": [
                    {
                        "destination": "tokens.json",
                        "format": "json/flat"
                    }
                ]
            },
            "web/scss": {
                "transformGroup": "tokens-scss",
                "buildPath": `dist/web/${brand}/`,
                "files": [
                    {
                        "destination": "tokens.scss",
                        "format": "scss/variables"
                    }
                ]
            },
            "styleguide": {
                "transformGroup": "styleguide",
                "buildPath": `dist/styleguide/`,
                "files": [
                    {
                        "destination": `${platform}_${brand}.json`,
                        "format": "json/flat"
                    },
                    {
                        "destination": `${platform}_${brand}.scss`,
                        "format": "scss/variables"
                    }
                ]
            },
            ... // 여기에 더 많은 선언들이 있습니다
        }
    };
}
module.exports = getStyleDictionaryConfig;
```

이 "컨셉 증명"이 작동하는 것을 보자마자, 설정 객체 주변을 만지작 거릴 시작했고, 디자인 토큰의 사용자 정의를 얼마나 많이 조절할 수 있는지 살펴보았어요. 결과는 모든 가능한 기대치를 능가했어요: Style Dictionary에서 제공하는 API를 한 번 더 사용하여 사용자 정의 형식, 사용자 정의 변환 및 변환 그룹, 나중에는 심지어 사용자 정의 템플릿 파일까지 손쉽게 도입하여 생성된 파일의 모든 세부사항을 조정할 수 있었어요.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

이 프로세스의 마지막 단계에서 나의 동적 구성 파일은 이렇게 보였어요:

```js
function getStyleDictionaryConfig(brand, platform) {
    return {
        "source": [
            `src/brands/${brand}/*.json`,
            "src/globals/**/*.json",
            `src/platforms/${platform}/*.json`
        ],
        "platforms": {
            "web/js": {
                "transformGroup": "tokens-js",
                "buildPath": `dist/web/${brand}/`,
                "prefix": "token",
                "files": [
                    {
                        "destination": "tokens.es6.js",
                        "format": "javascript/es6"
                    }
                ]
            },
            "web/json": {
                "transformGroup": "tokens-json",
                "buildPath": `dist/web/${brand}/`,
                "prefix": "token",
                "files": [
                    {
                        "destination": "tokens.json",
                        "format": "json/flat"
                    }
                ]
            },
            ...
        }
    };
}
```

커스텀 함수들은 모두 "package" 파일에서 선언됩니다. 이 파일은 다음과 같이 생겼어요:

```js
const StyleDictionaryPackage = require('style-dictionary');
// === CUSTOM FORMATS ===
StyleDictionaryPackage.registerFormat({
    name: 'json/flat',
    formatter: function(dictionary) {
        return JSON.stringify(dictionary.allProperties, null, 2);
    }
});
// === CUSTOM TRANSFORMS ===
StyleDictionaryPackage.registerTransform({
    name: 'size/pxToPt',
    type: 'value',
    matcher: function(prop) {
        return prop.value.match(/^[\d\.]+px$/);
    },
    transformer: function(prop) {
        return prop.value.replace(/px$/, 'pt');
    }
});
...
// === CUSTOM TRANSFORM GROUPS ===
StyleDictionaryPackage.registerTransformGroup({
    name: 'styleguide',
    transforms: ["attribute/cti", "name/cti/kebab", "size/px", "color/css"]
});
...
// === CUSTOM TEMPLATES ===
StyleDictionaryPackage.registerTemplate({
    name: 'ios/generic.plist',
    template: __dirname + '/templates/ios-generic.template'
});
...
StyleDictionaryPackage.registerTemplate({
    name: 'android/generic.xml',
    template: __dirname + '/templates/android-generic.template'
});
...
```

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

여기서 하는 것은, Style Dictionary에서 제공하는 기본 형식과 변형을 사용하는 대신, 나는 사용자 정의 함수를 만들고 있습니다 (각각은 몇 줄의 코드로 구성되어 있고 매우 유사합니다). 이러한 함수의 이름은 그냥 빌드 프로세스의 구성에서 형식, 변형, 변형 그룹, 그리고 템플릿을 선언하는 데 사용되는 매개변수입니다. 그게 다예요!

이 방법의 훌륭한 점은 모든 게 순수 자바스크립트이며 API가 잘 문서화되어 있어서, 나 같은 비개발자도 몇 줄의 코드로 사용자 정의 빌드를 만들 수 있다는 것입니다 (저에게는 이것이 게임 체인저였어요).

만약 데모 프로젝트의 전체 build.js 파일과 각 부분이 어떻게 서로 연결되는지 보고 싶다면, 여기 링크를 확인해보세요: https://github.com/didoo/style-dictionary-demo/blob/master/build.js

빌드 스크립트를 위해 비슷한 작업을 하고 싶은 경우, 과정에서 알아낸 몇 가지 흥미로운 팁과 트릭 몇 가지가 있습니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

- 미리 정의된 함수 이름을 재정의할 수 있어요. (예: 이미 존재하는 size/px나 time/seconds 함수를 등록할 수 있어요)
- 접두사 속성을 사용하여 토큰 이름 앞에 문자열을 추가할 수 있어요.
- 변환 그룹의 미리 정의된 변환 값 목록을 가져오려면, 스크립트에서 console.log(StyleDictionary.transformGroup['js'])를 실행하고 명령줄 셸에서 결과를 읽을 수 있어요.
- 토큰에 사용자 지정 메타 정보를 추가하고, 나중에 필터/매처 함수 및 템플릿 논리에서 사용할 수 있어요.
- 파일 블록에 필터 선언을 추가하여, 특정 특성에 따라 생성된 출력 파일에 일부 토큰 값만 포함시킬 수 있어요. (다른 파일로 토큰을 분리하려면 유용해요)

위 예시에서 보듯이, registerTemplate 함수를 사용하여 iOS 및 Android를 위한 PLIST 및 XML 파일을 생성하는 사용자 정의 템플릿을 등록했어요. 이는 네이티브 개발자가 디자인 토큰을 코드베이스에 도입하고 소비하기 위해 기술 요구 사항을 충족하기 위해 생성된 파일 형식에 대한 완전한 제어를 원했기 때문이에요.

만약 동일한 작업을 하고자 한다면, 자신만의 템플릿을 만들기 위해 Style Dictionary가 “컴파일”을 위해 사용하는 일반적이지 않은 lodash 함수 \_.template()을 주의해서 사용하셔야 해요. 이 템플릿 엔진에 대해, lodash의 공식 문서 외에는 거의 아무것도 찾아볼 수 없을 거에요. 엔진 자체는 상당히 기본적이지만, 값과 출력물을 처리/포매팅하기 위해 Node/JavaScript를 활용할 수 있어요. 그래서 내 제안은, 이 함수의 문서에서 예제 섹션을 신중히 읽어보세요. 무엇을 할 수 있는지 확인하고, 다른 템플릿 엔진과 비교했을 때 무엇을 할 수 없는지 추론하세요 (공식 문서에 따르면 Handlebars나 비슷한 다른 템플릿 언어를 사용할 수 있다고 명시되어 있어요).

주의: 다시 강조하겠지만, 제가 한 것은 필요한 것과 달리 명확히 원하는 것을 알고 있을 때 제안하는 것이에요. 대부분의 경우 여러분에게 잘 동작할 것으로 예상되는 많은 미리 정의된 기본 설정을 가지고 있는 Style Dictionary가 제공해요. 사용 가능한 모든 사용자 정의 설정을 파헤치기 시작하기 전에 라이브러리에서 제공하는 기본 설정을 시도하고, 출력 파일을 확인하고 여러분의 요구 사항에 부합하는지 확인해보세요. 아마도 충분히 부합할 거에요. 그렇지 않다면, 생성된 출력 파일이 어떻게 되길 원하는지 생각해보고, 해당 특정 범위에 대해 사용할 API 메소드 중 어느 것을 사용할 수 있는지 살펴보세요.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

# 생성된 디자인 토큰 파일들

Style Dictionary를 사용하여 프로젝트를 설정하고 사용자 지정 빌드를 실행하는 방법을 살펴보았습니다. 하지만 최종 결과는 무엇일까요? 생성된 디자인 토큰 파일들은 어떻게 보이게 될까요? 그러면 여기에서 확인할 수 있습니다.

웹 플랫폼용 Scss 파일로서의 출력은 다음과 같습니다:

```js
// ./dist/web/brand#1/tokens.scss
$token-alias-color-brand-primary: #3B5998;
$token-alias-color-brand-secondary: #4267B2;
$token-avatar-size-xxsm: 36px;
...
```

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

위에서 설명한 대로, 변수 이름에는 "토큰" 접두사가 있습니다. 이것은 디자인 토큰에서 가져온 Scss 변수와 Scss 파일에서 선언된 일반 변수를 구분하는 데 사용됩니다.

다음은 ES6 JavaScript 형식 파일입니다:

```js
// ./dist/web/brand#1/tokens.es6.js
export const TOKEN_ALIAS_COLOR_BRAND_PRIMARY = '#3B5998';
export const TOKEN_ALIAS_COLOR_BRAND_SECONDARY = '#4267B2';
export const TOKEN_AVATAR_SIZE_XXSM = '36px';
...
```

그리고 다음은 평평한 JSON 파일입니다:

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

```js
// ./dist/web/brand#1/tokens.json
[
  {
    "value": "#3B5998",
    "type": "color",
    "comment": "이것은 주석입니다",
    "original": {
      "value": "#3B5998",
      "type": "color",
      "comment": "이것은 주석입니다"
    },
    "name": "token-alias-color-brand-primary",
    "attributes": {
      "category": "alias",
      "type": "color",
      "item": "brand",
      "subitem": "primary"
    },
    "path": [
      "alias",
      "color",
      "brand",
      "primary"
    ]
  },
  {
    "value": "#4267B2",
    "type": "color",
    "comment": "이것도 주석입니다",
    "original": {
      "value": "#4267B2",
      "type": "color",
      "comment": "이것도 주석입니다"
    },
    "name": "token-alias-color-brand-secondary",
    "attributes": {
      "category": "alias",
      "type": "color",
      "item": "brand",
      "subitem": "secondary"
    },
    "path": [
      "alias",
      "color",
      "brand",
      "secondary"
    ]
  },
  {
    "value": "36px",
    "original": {
      "value": "36px"
    },
    "name": "token-avatar-size-xxsm",
    "attributes": {
      "category": "avatar",
      "type": "size",
      "item": "xxsm"
    },
    "path": [
      "avatar",
      "size",
      "xxsm"
    ]
  },
  ...
]
```

위와 같이 평면 JSON 파일은 디자인 토큰 속성에 첨부된 모든 추가 속성 및 메타 정보들을 노출하며, 다른 도구(예: 스타일 가이드와 같이)에 의해 매우 간단하고 직관적으로 소비/처리되기 편한 형태로 디자인 토큰들을 사용할 수 있게 합니다.

유사하게, 네이티브 플랫폼에 대한 출력 형식은 iOS의 경우 다음과 같습니다:

```js
// ./dist/ios/brand#1/tokens-all.plist
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>tokenAliasColorBrandPrimary</key><string>#3B5998</string>
    <key>tokenAliasColorBrandSecondary</key><string>#4267B2</string>
    <key>tokenAvatarSizeXxsm</key><string>36pt</string>
    ...
</dict>
```

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

그리고 안드로이드용으로 출력될 내용은 다음과 같습니다:

```js
// ./dist/android/brand#1/tokens-all.xml
<?xml version="1.0" encoding="UTF-8"?>
<resources>
    <color name="token_alias_color_brand_primary">#3B5998</color>
    <color name="token_alias_color_brand_secondary">#4267B2</color>
    <item name="token_avatar_size_xxsm" type="dimen">36dp</item>    ...
</resources>
```

보시다시피, 기본 플랫폼에 대해서는 px 값을 pt/dp로 변환하고, 색상 값은 16진수 형식으로 남겼습니다. 이는 저희 iOS 및 Android 애플리케이션 프로젝트 모두 이미 PLIST 및 XML "style" 파일에서 16진수 값을 읽을 수 있는 사용자 정의 함수가 구현되어 있기 때문입니다. 물론, 이 형식은 우리에게 매우 특정한 형식이며, 여러분은 완전히 다른 형식이 필요할 수 있습니다. 진행하기 전에 iOS/Android 개발자와 상의하여 가장 적합한 형식을 결정하는 것이 좋습니다. (본 형식을 위해 사용자 지정 형식/변환/템플릿을 만들 필요가 있을 수 있습니다. 앞서 논의한 것과 같이)

# Github의 예제 프로젝트

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

이미 언급했듯이, 제가 만든 레포지토리는 바돗이(Design System at Badoo)의 디자인 토큰을 설정한 방식과 매우 유사한 예시를 담고 있어요. 이 GitHub 주소에서 데모를 확인할 수 있어요:

http://github.com/didoo/style-dictionary-demo

프로젝트 구조를 간략히 살펴보면:

- /src 폴더에는 입력으로 사용되는 JSON 파일이 포함되어 있습니다. 각 파일마다 키/값/속성 토큰 선언이 들어 있어요.
- /dist 폴더에는 다른 대상 플랫폼용으로 생성된 파일이 들어 있습니다.
- /templates 폴더에는 파일을 생성하는 데 사용되는 템플릿 파일이 들어 있어요.
- /build.js에는 사용자 정의 함수의 선언부터 빌드 구성, 실제 빌드 실행까지 모두 포함된 전체 빌드 작업이 들어 있습니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

이것은 비교적 간단한 사용 사례이지만, 다중 브랜드 및 플랫폼 디자인 토큰을 처리할 수 있는 Style Dictionary 프로젝트를 설정하고 구성하는 방법을 명확하게 보여줍니다. 제가 말했듯이, 영감을 얻는 데 사용하거나 자체 구현의 시작점으로 자유롭게 활용해보세요.

# 결론 / 최종 생각

이미 많은 얘기를 했기 때문에 결론에서는 간결하게 하려고 노력하겠습니다.

최근 몇 일, 몇 주 동안 Style Dictionary를 많이 사용했고 매번 "와우. 제대로 작동하네요!" 라고 생각했습니다. 이 프로젝트의 모든 것이 기대한 대로 작동하며, 모든 것이 신중하게 고려되고 명확하다는 것(이 점에 대해 Danny Banks에게 크레딧)을 알 수 있었기 때문에 학습 곡선은 거의 제로입니다. 금방 꿈꿔왔던 일들을 하고 있는 자신을 발견하게 될 것입니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

이 라이브러리에 대한 최상의 설명은 contributing.md 파일에 있습니다:

여기서 유연성이 핵심 단어라고 생각합니다. 디자인 시스템 Slack 채널에서 Style Dictionary에 대한 의견 중 한 가지가 여기에 있듯이 우연한 일이 아닙니다.

그래서 시스템에서 디자인 토큰을 사용하기에 대한 의심이 있다면 더 이상 변명이 없습니다. Style Dictionary가 완벽한 해결책입니다.

업데이트:

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

함께 공유 드리겠습니다. 저희 Cosmos에서는 색상, 타이포그래피 및 간격 이외에도 디자인 토큰을 사용하는 방법과 함께, 이러한 토큰에 메타 정보를 추가하여 필터링, 그룹화 및 후속 처리하는 방법에 대해 다루는 후속 게시물을 작성했습니다. 컴포넌트 속성 및 사양을 설명하는 데 얼마나 강력한지 확인해보세요!
