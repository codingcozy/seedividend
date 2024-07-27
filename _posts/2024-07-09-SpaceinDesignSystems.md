---
title: "디자인 시스템에서 공간 활용 방법 효과적인 레이아웃 만들기"
description: ""
coverImage: "/ui-log-2/assets/img/2024-07-09-SpaceinDesignSystems_0.png"
date: 2024-07-09 18:47
ogImage:
  url: /assets/img/2024-07-09-SpaceinDesignSystems_0.png
tag: Tech
originalTitle: "Space in Design Systems"
link: "https://medium.com/eightshapes-llc/space-in-design-systems-188bcbae0d62"
---

## 기본 사항부터 확장된 개념까지 의도적으로 공간을 활용해보세요

나는 시스템의 시각적 언어로 색상, 글꼴 및 아이콘을 "큰 3"이라고 자주 언급해 왔습니다. 버튼부터 상위로 모든 UI 구성 요소가 이들과 함께 만들어졌습니다. 그러나 뭔가 빠뜨렸어요. 공간, 우리의 마지막 터득지입니다.

## 공간은 색에 쌍 가합니다

공간은 어디에나 있습니다. CSS는 패딩, 마진 및 절대 위치 지정의 왼쪽, 오른쪽, 위 및 아래와 같은 속성을 사용하여 객체를 분리합니다. Bootstrap, Salesforce Lightning, Foundation, 이전 프로젝트 및 현재 프로젝트에서 이러한 공간 속성이 발생하는 빈도를 비교해 보았습니다. 색상, 크기, 글꼴, 레이아웃 등의 속성 그룹에 상대적인 공간 속성의 발생을 비교했습니다.

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

효과를 제거한 후 (이미 CSS에서 결정을 위한 시스템을 제공하는 것과 같이 "zeroed" 값 :0 및 투명하거나 자동과 같은 예약 용어) 공간 규칙은 색상을 제외하고 모든 것보다 더 많이 나타났습니다. 다른 것은 아무 것도 아니었습니다 - 글꼴, 크기, 레이아웃도 아니었습니다. 우리 라이브러리에 구축된 공간 복잡성이 너무 많았네요, 우리 제품은 말할 것도 없죠!

## 공간이 우리를 나눕니다

공간은 디자인과 개발 간의 "내가 이렇게 디자인하고, 너는 그렇게 구축해"라는 간극을 대변합니다. 우리는 오랫동안 디자인의 빨간색 선이 설계에 흩뿌려졌다는 것을 한탄해 왔습니다. 그것은 결코 가치가 있다고 느껴지지 않았어요. 그럼에도 불구하고 그것들은 지속되었고, 우리 제품의 완성된 자료인 HTML의 상자 모델에 의해 이끌리지 않았습니다.

비용은 막대합니다: 주석 처리, 번역, 토의, QA 중에 시각적으로 정리하기. 그 모든 일... 여전히 충분히 좋지 않은 무언가를 위해. 그래서 공간은 감정적인 대가를 청구하는 것입니다.

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

## 공간 개념은 원시적입니다

디자인, 코드 및 대화를 통해 보다 의도적인 공간 개념을 공들일 수 있습니다. 그러나 그렇지 않습니다. 우리는 티셔츠 사이즈를 사용하고 하루를 마칩니다. 더 나은 방법이 있습니다. 우리는 붉은 실선, 붉은얼굴 분노를 대신하여, 들여쓰기, 압축, 늘이기, 쌓기로 우리의 미래를 향한 공간적 명료성을 향해 나아갈 수 있습니다.

이를 기억하여, 여기에는 기본 개념, 확장된 어휘 및 시스템 작업에 공간을 적용할 때 경험했던 더 많은 경험이 있습니다.

# 공간 기본 개념

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

## 그리드 ≠ 공간. 그리드는 구성 요소입니다. 공간을 사용하는 것입니다.

그리드는 컬럼, 거터, 외부 여백 및 반응형 세세한 부분에 대한 풍부한 공간 결정이 있습니다. 팀은 사용자가 쉽게 페이지를 만들 수 있도록 그리드를 이른 시기에 다룹니다. 불행히도, 그것이 종종 공간 대화가 끝나는 시점일 때가 많습니다.

그리드는 완전한 공간 시스템이 아닙니다. 그리드는 모든 다른 구성 요소와 마찬가지로 공간을 사용하는 구성 요소입니다. 그리드는 다릅니다. 보이지 않고 일찍 등장하며 공간만 만듭니다. 그러나 그리드보다 더 중요한 공간이 있습니다.

요점: 그리드를 사용하여 공간 관습을 소개하지만 그것으로 끝내지 마세요. 그리드의 여백, 거터 및 칼럼 값과 함께 전체 구성 요소 라이브러리에 깔려 있는 더 깊은 공간 개념을 일치시킵니다.

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

## 잊지 못할 기본 숫자 설정 및 기대

팀은 다른 모든 공간 값을 기준으로 잊지 못할 만큼 신비한 기본 숫자를 설정합니다. 어떤 팀은 손가락이 10개이기 때문에 10진법을 선호합니다. 그리고 저는 기본 6을 사용하는 팀도 봤어요 — 2와 3의 유용한 인수 때문에 — 이를 통해 3, 4, 6, 8, 9, 12, 15, 16, 18, 21, 24, 32 등 다양한 숫자들을 유연하게 다룰 수 있게 했어요. 혼란을 멈춰요!

제가 일한 대부분의 시스템들은 16을 사용해요. 이것은 좋은 기본 글꼴 크기입니다. 모든 화면 해상도의 인수이기도 하죠 (320, 768, 1024). 또한 시작점보다 큰 기억에 남는 배수들(32, 64, ...)과 더 작은 인수들(8, 4, 2)을 제공합니다.

요약: 기억에 남는 기본 숫자로 공간 시스템의 범위를 정립하고, 사용 방법에 대한 기대를 제한하세요.

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

## 비선형적으로 스케일 옵션 조절하기

기존의 기초를 갖춘 팀들도 종종 무작위로 걸음을 딛게 되곤 합니다 (12, 14, 18, 22, 24, 28, 30, 32, …). 이를 방지하기 위해 다른 사람들은 각 단계가 일정하게 증가하는 선형 스케일(4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, …)을 사용합니다. 내게는 두 결과 모두 예측하기 어렵고, 너무 비슷한 선택지를 제공하는 것 같아요. 24 또는 28을 언제 사용해야 할지 모르겠어요.

![이미지](/ui-log-2/assets/img/2024-07-09-SpaceinDesignSystems_0.png)

비선형적인 대안이 있습니다. 황금비율, 모듈러 스케일, 또는 각 단계를 두 배씩 증가시키는 유사한 기하급수가 있습니다. 기초점부터 시작하여, 작은 중지지점(16, 8, 4, 2)과 큰 중지지점(16, 32, 64, 그리고... 그게 전부)까지 스케일을 조절해보겠습니다.

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

![SpaceinDesignSystems](/ui-log-2/assets/img/2024-07-09-SpaceinDesignSystems_1.png)

**요점:** 기하 급수나 유사한 비선형적 내용을 고려해보세요. 16과 32 사이에 24를 추가하는 경향을 가끔 느낄 수 있습니다. 그러나 저는 개인적인 경험으로는 그런 순간들이 드물고 간혹 간단한 시스템을 깨는 정당한 이유가 거의 없다고 생각합니다.

## 각 단계에 이름을 붙여 기억에 남고 정확하게 재사용하세요

저는 Gmail의 Compact, Cozy, Comfortable 공간 토글을 좋아합니다. 그래서 우리의 공간 시스템을 만들 때 해당 레이블을 사용해보자고 제안했습니다. 즉시 동료 중 한 명이 나에게 도전을 했습니다: "다른 단계는 어떻게 부르지?" 제가 제안한 spartan, teeny, luxurious 옵션들이 통과되지 못했습니다.

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

![Space in Design Systems](/ui-log-2/assets/img/2024-07-09-SpaceinDesignSystems_2.png)

우리가 항상 하는 대로 티셔츠 사이즈 척도를 사용했습니다. 중간 크기는 기본값에 해당하며, S, XS, L, XL 그리고 필요한 경우 XXS와 XXL이 다른 옵션입니다. 이것이 대부분의 라이브러리들(부트스트랩, 라이트닝 등)이 하는 방법입니다.

핵심 포인트: 단순한 이름 공간 옵션을 사용하여 티셔츠 사이즈와 같은 척도를 만들어 사람들이 기억하고 정확히 적용할 수 있는 언어를 만듭니다. 더 구체적인 라벨을 사용하려고 하면 팀원들이 "작은 것, 중간 것, 큰 것을 부탁드립니다."라고 대답할 준비를 하세요.

많은 라이브러리를 검토하고 많은 디자이너들과 대화를 나눠봤습니다. 기본 숫자와 명명된 척도의 간단한 관례가 대화가 종종 끝나는 지점입니다. 이러한 몇 가지 옵션은 간단하긴 하지만, 여전히 공간을 사용하는 데는 어딘지... 무작위로 느껴졌습니다. 더 필요했죠.

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

# 공간에 대한 어휘 확장

우리의 신생 작업을 검토할 때, 공간을 적용하기 위한 명확한 의도는 많지 않습니다. 예를 들어, 제가 좋아하는 구성 요소인 카드를 살펴봅시다.

![Space in Design Systems](/ui-log-2/assets/img/2024-07-09-SpaceinDesignSystems_3.png)

프런트엔드 개발자로서, 나는 모든 요소의 상자가 서로 어떻게 핏팅되는지 상상합니다.

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

![Space in Design Systems 4](/ui-log-2/assets/img/2024-07-09-SpaceinDesignSystems_4.png)

카드는 많은 공간 개념을 유용하게 보여줍니다. 가장자리에서 내용 삽입, 내포 모양 변형, 항목을 인라인으로 배치 및 컴포넌트 내 및 사이에 항목 쌓기 등 우리가 사용하는 많은 시공 개념을 보여줍니다.

![Space in Design Systems 5](/ui-log-2/assets/img/2024-07-09-SpaceinDesignSystems_5.png)

이 개념들인 내포, 내포 압축, 내포 스트레치, 쌓이기, 인라인, 그리드는 우리 라이브러리의 대부분의 CSS 공간 규칙을 다룹니다. 여백, 여백, 좌, 우, 위, 아래. 이러한 개념들은 또한 각 원자가 자기 포함되어 있어 상호작용성을 개선합니다.

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

## 개념 1: (Square) Inset

인셋은 벽에 걸린 액자 사진의 마셍감처럼 네 면에 들어가는 콘텐츠를 제공합니다. 여러 구성 요소에서 널리 사용되며, 3-Up 모듈과 블록 메시지(중간 사이즈), 초소형 피사체, 혹은 넓은 푸터와 머리글에서 동작합니다.

<img src="/ui-log-2/assets/img/2024-07-09-SpaceinDesignSystems_6.png" />

모바일 퍼스트 디자인에 대한 유용한 시작점이 되며, 768px와 같은 관련 뷰포트 너비에서 크게 확장됩니다.

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

![해당 이미지를 불러올 수 없습니다](/ui-log-2/assets/img/2024-07-09-SpaceinDesignSystems_7.png)

## 컨셉 2: 스퀘어 인셋

스퀘어 인셋은 상하 간격을 50% 줄입니다. 우리의 경우 두꺼운 모양의 대조적인 것보다는 조금 더 드물게 나타나는데, 버튼 같은 요소나 데이터 테이블 또는 목록 아이템과 같은 셀 형태의 컨테이너에서 자주 발생합니다.

![해당 이미지를 불러올 수 없습니다](/ui-log-2/assets/img/2024-07-09-SpaceinDesignSystems_8.png)

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

## 개념 3: 스트레치 인셋

버튼이나 핀의 압축과 대조되는 것으로, 우리는 텍스트 상자, 텍스트 영역 및 기타 양식 요소의 인셋을 수직으로 늘리는 것을 발견했습니다.

![이미지](/ui-log-2/assets/img/2024-07-09-SpaceinDesignSystems_9.png)

## 개념 4: 스택

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

가로로 스크롤되는 UI에도 공손하게 말씀드리자면, 압도적인 다수가 세로로 스크롤합니다. 그것은 한 가지를 의미합니다: 우리는 것들을 쌓습니다. 메시지를 제목 위에 데이터 테이블에 쌓고, 레일즈에서 모듈을 쌓고, 카드 안에 각각 그리드에 복사본, 피말 & 툴바를 쌓습니다. 심지어 무한 스크롤은 무한한 쌓임을 의미합니다! 우리는 쌓고, 쌓고, 쌓습니다.

![이미지](/ui-log-2/assets/img/2024-07-09-SpaceinDesignSystems_10.png)

## 개념 5: 인라인

또한 객체를 인라인으로 배열하여 왼쪽이나 오른쪽에서 흘러오는 텍스트처럼 흐르도록 감쌉니다. 이러한 객체 — 피말, 태그, 브레드크럼브 등 —은 독립적으로 서 있을 수도 있고 다른 객체와 함께 쌓이거나 섞일 수도 있습니다.

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

![Image](/ui-log-2/assets/img/2024-07-09-SpaceinDesignSystems_11.png)

## Concept 6: Grid

Ah, save the grid for last? As spacing stabilizes, we find ourselves revisiting grid margins and gutters, aligning these spaces with our magical starting point and other uses.

So, as applied to a Card component, your styled padding and margin may look something like:

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

# 배운 내용

공간 개념을 사용하면 새로운 것에 적응해야 합니다. 우리 팀에서는 가벼운 회의주의가 새로운 모델을 받아들이는 데 하루가 걸렸습니다.

## 시각적으로 공간 시스템 가르치기

대부분의 협업자는 공간을 볼 수 없기 때문에 임의로 적용됩니다. 그러나 이제 우리는 시스템을 갖고 있습니다: 각각이 제한된 옵션 범위를 제공하는 제한된 개념의 수.

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

![Image](/ui-log-2/assets/img/2024-07-09-SpaceinDesignSystems_12.png)

**Takeaway:** 공간 개념을 가르칠 때 간결한 문서 다이어그램이나 치트 시트를 사용하세요. 이러한 참고 자료는 디자인과 코드를 통해 개념을 빠르게 이해하고 적용하며 유지하는 데 도움이 됩니다.

## 간단한 도우미 제공하고 사용 모니터링하기

어리석은 짓은 말아요. 이 6가지 모델로는 모든 것을 해결할 수 없습니다. 때로는 여전히 margin-bottom을 조정하거나 left를 여기저기 조정해야 할 수도 있습니다. 그러므로 더 의도적인 공간 옵션과 $space-m와 같은 일반적인 대체 옵션을 따르는 이유가 있습니다.

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

## 요약: 일반적인 옵션을 제공하고, 적게 사용하며 제품 팀이 사용할 것으로 기대합니다. 평가나 풀 리퀘스트에서 나타날 때는, 여러분의 동료들에게 'inset'이나 'stack'과 같이 더 구체적인 개념에 대해 설명해주세요.

## 패딩 또는 마진이 포함된 변수 이름 피하기

뭔가 더 복잡한 것을 소개할 때, 다른 사람들이 이해하기 쉬운 것을 옹호하는 것은 얼마든지 옳습니다. 예를 들어 "왜 변수 이름에 패딩과 마진을 사용할 수 없을까요?" 라고요. 이 경우, 패딩을 사용하여 2개 이상의 공간 개념을 적용할 수 있고, 이러한 개념은 왼쪽과 오른쪽 속성도 통해 적용할 수 있습니다. 마진은 일렬로 배치하거나 그리드, 인라인 공간에 사용됩니다. 아, 그리고 HTML을 사용하지 않는 비웹 플랫폼은 어떤가요?

## 요약: 속성 이름과 개념을 분리해주세요. 하나에 많은 것을 제한하고, 재사용을 단일 플랫폼으로 제한합니다.

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

## 충돌을 선형 높이 체계적으로 해결하세요

간단한 삽입 안쪽 여백과 스택 여백 규칙은 오랫동안 알려진 공간 적대 요소인 라인 높이와 충돌했습니다. 이 상호작용은 공간을 예측할 수 없게 증가시켰으며, 16px의 단순한 삽입 기본값 위아래에 픽셀이 추가되었습니다.

![SpaceinDesignSystems_13](/ui-log-2/assets/img/2024-07-09-SpaceinDesignSystems_13.png)

그러나 우리는 한 가지 아이디어의 발상을 따랐습니다. (@kevinmpowell의 "의사 요소를 사용하여 음수 여백 공간을 만들어보자! 그러나 얼마나?") 일부 수학(대학 학위를 활용할 수 있어요!)을 이용해 결과적으로 글꼴 크기와 라인 높이를 결합한 중첩 공식을 만들어 충돌하는 객체 위아래의 공간을 축소했습니다.

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

포기하지 말고 예외 때문에 체계적인 명확성을 잃지 마세요. 문제를 해결해보세요. 그런 세세한 점들을 극복할 수 있다면 심지어 약간의 CSS 마술로도 보다 간단한 개념을 유지할 수 있습니다.

## 공간 개념 활용하여 밀도 조절하기

Inset, stack, grid와 같은 개념을 통해 밀도 조절 다이얼을 손쉽게 조절할 수 있습니다. 저장소를 찾아 관심 있는 바운더리와 스택을 찾은 후, 이러한 규칙을 확장하거나 재정의하여 디스플레이 밀도를 세밀하게 조정해보세요.

![SpaceinDesignSystems_14](/ui-log-2/assets/img/2024-07-09-SpaceinDesignSystems_14.png)

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

요약: 거의 원시적인 옵션이라도 공간 밀도를 조절할 수 있습니다. 없으면 밀도 제어는 꿈에 불과합니다. 그런데 옵션이 있다면 강력한 엔진을 구축하여 의도를 가지고 공간을 찾고 조절하며 더 적은 위험으로 진행할 수 있습니다.

디자인 시스템을 개발하려는 중이거나 제품과 이해관계자에 대해 더 깊이 논의해야 하는 경우가 있으신가요? EightShapes는 시스템 기획 워크숍을 진행하고 디자인 시스템에 관련하여 클라이언트에게 코칭해드립니다. 함께 얘기해보세요!
