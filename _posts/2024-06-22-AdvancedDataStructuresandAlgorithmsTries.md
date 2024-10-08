---
title: "고급 자료 구조와 알고리즘 트라이tries 사용법 완벽 가이드"
description: ""
coverImage: "/assets/img/2024-06-22-AdvancedDataStructuresandAlgorithmsTries_0.png"
date: 2024-06-22 13:46
ogImage:
  url: /assets/img/2024-06-22-AdvancedDataStructuresandAlgorithmsTries_0.png
tag: Tech
originalTitle: "Advanced Data Structures and Algorithms: “Tries”"
link: "https://medium.com/bitsrc/advanced-data-structures-and-algorithms-tries-47db931e20e"
isUpdated: true
---

## 트라이(Tries)로 직접 Google을 만들어보기: 잠재적 검색 엔진 구현의 내부를 살펴보겠습니다

![image](/assets/img/2024-06-22-AdvancedDataStructuresandAlgorithmsTries_0.png)

우리는 모두 웹 애플리케이션에 어떤 종류의 검색을 구축하는 데 익숙합니다. 특히 "구축"을 단순히 프로젝트에 Algolia 플러그인을 추가하고 SDK를 사용하여 그들의 API를 호출하는 것으로 생각한다면요.

사실, 웹 애플리케이션에 기본 검색을 구현하는 것은 이제 그렇게 어렵지 않습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

하지만 API라는 "커튼" 뒤에 사용되는 알고리즘이 어떤 종류인지 생각해 본 적이 있나요?

오늘은 "고급" 데이터 구조라고 부르는 것을 살펴볼 것입니다. 이 구조는 텍스트 코퍼스 안에서 텍스트 검색을 수행하는 데 사용할 수 있는데, 그것이 바로 "Tries"입니다.

저는 최근까지 이들에 대해 들어본 적이 없어서 여러분도 비슷하다면 놀라지 마세요. 하지만 걱정하지 마세요. 실제로는 생각보다 덜 위험하게 들립니다.

자, 시작해 보죠!

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 트라이(Tries)는 무엇인가요?

우선 이해해야 할 것은 트라이가 트리(Tree)의 특별한 종류임을 알아야 합니다. 우리 모두가 트리를 알고 있죠. 각 노드가 다양한 수의 자식 노드 요소를 가질 수 있는 방법으로 노드 객체를 구성하는 방법입니다. 노드가 자식이 없으면 “잎 노드”라고 부릅니다(“트리” 비유를 유지하면서).

이제 트라이는 특별한데, 각 노드는 알파벳순으로 최대 26개의 자식을 가질 수 있다는 점입니다 (다른 알파벳을 사용하려면 해당 숫자가 달라지겠지만, 모든 노드가 동일한 최대 자식 수를 가집니다).

그 위에, 단어는 트리 전체에 "수직으로" (또는 레벨별로) 삽입됩니다. 이것이 트라이가 어떻게 보이는지 보여드리죠:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

![이미지](/assets/img/2024-06-22-AdvancedDataStructuresandAlgorithmsTries_1.png)

Trie의 루트는 항상 "null"일 것입니다. 이 것이 이 데이터 구조의 한 가지 특징입니다. 제가 4개의 단어를 추가했음을 볼 수 있습니다:

- All
- Alt
- Cat
- Cow

이것들을 수직으로 읽을 수 있습니다. 이것이 제가 이전에 "레벨"이라고 했던 의미입니다. 각 레벨은 우리 단어에서의 위치가 될 것입니다. 각 단어의 마지막 노드는 또한 플래그 "isFinal"과 함께 표시될 것입니다. 이 플래그가 얼마나 중요한 지 곧 알게 될 것입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

여러 자식을 가진 노드가 있을 때는 알파벳 순으로 정렬됩니다. 이는 데이터를 삽입하고 나중에 검색하는 알고리즘을 간단하게 만들기 위해 정렬된 것입니다. 기억하세요, 우리는 소문자 "a"부터 "z"까지 26개의 문자만 다룬다는 가정 아래 작업을 하고 있습니다. 보다 유연성을 가지려면 이 숫자를 높일 수 있으며 노드를 적절하게 색인화하는 방법을 찾을 수 있습니다.

그래서 Trie로 가장 기본적인 두 가지 작업을 어떻게 구현할 수 있는지 살펴봅시다: 데이터를 삽입하고, 나중에 그 데이터를 검색하는 것입니다.

읽은 내용이 마음에 드셨나요? IT 산업에서 2십 년 간의 지혜를 무료로 공유하는 제 뉴스레터에 구독해 보시는 건 어떨까요? "The Rambling of an old developer"에 가입해보세요!

# Trie에 데이터 삽입하기

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 데이터 구조 안에 데이터를 삽입하는 데 필요한 기본 알고리즘은 간단합니다:

- 삽입하려는 단어를 소문자로 변환합니다.
- 루트의 자식 노드들 중에서 단어의 첫 글자를 찾습니다.
- 글자가 예상한 위치에 있나요? 그렇다면 단어의 다음 글자로 넘어가고 방금 찾은 현재 글자의 자식 노드들 중에서 해당 글자를 찾습니다.
- 글자를 찾을 수 없다면 새로운 노드를 추가하고 단어의 다음 글자로 넘어갑니다.

글자가 떨어질 때까지 이러한 과정을 계속 반복하다가 마지막 글자를 “isFinal”로 표시하면 완료됩니다.

예를 들어, "ALL"이라는 단어를 빈 Trie에 추가한다고 가정하면:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 소문자를 "모두"로 변경합니다.
- 루트에 첫 번째 자식 노드에 "a"가 있나요? 아니요, 비어 있기 때문에 첫 번째 자식 슬롯에 새 노드를 추가합니다.
- 이제 첫 번째 "l"로 이동합니다. 이 "l"은 "a"의 12번째 자식에 없습니다. 왜냐하면 후자가 방금 추가되었기 때문입니다. 따라서 12번째 자식 슬롯에 "l"을 위한 새 노드를 추가합니다.
- 마지막 "l"로 이동하면 똑같은 작업을 반복합니다. 이전 글자(첫 번째 "l") 내에서 12번째 자식 슬롯을 찾아서 비어 있기 때문에 마지막 "l"을 위한 새 노드를 만듭니다. 유일한 차이점은 "isFinal"로도 표시한다는 것입니다.

이제 "alt" 단어를 추가하려면 첫 두 글자가 이미 있음을 알 수 있습니다. 따라서 해당 노드를 추가하는 부분을 건너 뜁니다.

JavaScript로 어떻게 변환되는지 이해하기 위해 코드를 살펴봅시다:

노드는 구조가 매우 간단합니다. 솔직히 말해서 레이블 속성조차 선택 사항입니다. 노드의 실제 위치가 나타내는 글자를 결정하기 때문입니다. 그렇다고 해서 이해하기 쉽다고 생각하기 때문에 이 방법을 사용하는 것이 더 좋다고 생각합니다. 마음대로 수정하셔도 좋습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

실제 Trie는 이렇게 생겼어요:

보시다시피, 생성 시에 "루트" 노드는 null로 초기화되고 새로운 단어를 삽입할 때마다 루트의 자식부터 시작해서 이동합니다.

단어의 마지막 노드는 isFinalLetter로 표시되어 해당 단어의 끝을 알 수 있습니다. 이를 통해 검색이 어떻게 수행되는지 알아보기 전에 중요한 부분이 됩니다.

# Trie 내에서 데이터 검색하기

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

검색은 실제로 삽입과 매우 유사합니다. 우리는 동일한 알고리즘을 따라 Trie를 통과해야 하기 때문에 찾으려는 글자가 없는 경우, 추가하는 대신 false를 반환해야 합니다.

이제 검색에 대한 다른 작은 세부 사항은 단어의 끝에서 모든 글자를 찾았을 때, 마지막 노드가 isFinalLetter로 표시되어 있는지 확인해야 한다는 것입니다. 그럴 경우, Trie에 단어가 존재하는 것을 의미하고, 그렇지 않으면 삽입된 단어의 부분 문자열을 찾고 있으므로 "부분" 일치를 얻었다는 것을 의미합니다.

기본적으로 Trie에 "Words"라는 단어가 있는 것을 상상해보세요.

- "want"를 찾는 경우에는 "w"의 자식들에서 "a"를 찾을 수 없기 때문에 "there"가 아닙니다.
- "word"를 찾는 경우에는 "d"에 도달하지만 "d"가 isFinalLetter로 표시되지 않으므로 "word"가 Trie에 없음을 알 수 있지만 그 단어를 포함하는 다른 단어를 찾은 것을 알 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

자, 이제 코드로 어떻게 보이는지 확인해 봅시다:

이전과 동일한 클래스이지만 검색 방법이 바뀌어서 더 읽기 쉽습니다.

이 메서드는 다음 세 가지 값을 반환합니다:

- 일치하는 값이 없으면 false를 반환합니다.
- 최종 글자까지 도달하여 마지막 글자가 실제로 isFinalLetter로 표시된 경우 full-match를 반환합니다
- 끝까지 도달하였지만 마지막 글자가 표시되지 않은 경우 partial-match를 반환합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 방법에서는 forEach를 일반 for로 바꿨어요. 후자를 사용하면 간단한 return 문으로 빨리 반환할 수 있지만, 전자는 전체 단어를 모두 확인할 때까지 빠져나올 수 없어요.

다음 예제는 지금까지 본 모든 것을 사용합니다:

결과는 당신이 기대하는 대로 이렇습니다:

```js
'fer'를 찾고 있습니다: 완전일치
'angel'을 찾고 있습니다: 없음
'fernando2'을 찾고 있습니다: 없음
'federico'를 찾고 있습니다: 완전일치
'fern'을 찾고 있습니다: 부분일치
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

하지만 한 걸음 더 나아가보죠. 실험은 재미있지만, 실제 애플리케이션에서 어떻게 사용할까요? 그렇다면 Next 앱에 이를 추가하는 방법을 보겠습니다!

# Next 내 Trie-검색 사용하기

사용하고 싶은 프레임워크를 선택할 수 있습니다. 저는 Next를 선택했는데, 그 이유는 좋은 API 프레임워크를 제공하기 때문입니다.

간단하게 npx create-next-app@latest 명령을 사용해서 새로운 앱을 만들겠습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

새 앱의 폴더 구조 안에 다음과 같은 새 폴더를 만들 것입니다:

- /components: 여기에 새로운 검색 컴포넌트를 추가할 것입니다.
- /utils: 여기에는 방금 보여드린 클래스가 있는 tries 폴더를 저장하고 새로운 search.js 파일을 추가할 것입니다. 이 파일은 우리의 Trie에 대한 게이트웨이 역할을 할 것입니다.

검색 서비스는 백엔드에 유지할 것이므로, 우리는 페이지/api/search 폴더 안에 추가할 API 엔드포인트를 통해 상호 작용할 것입니다.

마지막으로, 당신의 폴더 구조는 다음과 같이 보일 것입니다:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

<img src="/assets/img/2024-06-22-AdvancedDataStructuresandAlgorithmsTries_2.png" />

## 검색 엔드포인트 추가

이 예제에서는 검색 엔드포인트를 만들어 보겠습니다. 매우 간단하게 처리할 것이며 모든 요청을 처리하고 검색 문자열이 저장될 q 쿼리 매개변수를 찾을 것입니다.

따라서 전체 코드는 다음과 같습니다:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

조금 후에 getSearch 함수에 대해 걱정할 거예요. 이제 알아둬야 할 것은 당신에게 Trie 인스턴스에 액세스할 수 있다는 것뿐이에요.

## 검색 UI 구성요소 추가

사용자가 무언가를 검색하고 어떤 피드백을 보여줄 수 있도록 UI 구성 요소가 필요할 거예요.

우리 경우에는 피드백이 "찾을 수 없음", "부분 일치" 또는 "전체 일치"일 거예요. 하지만 당신이 원하는 만큼 창의적이 해도 돼요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

우리 컴포넌트의 코드는 다음과 같이 보입니다:

다시 말하지만, 이것은 그리 미친 짓은 아닙니다. 입력 필드가 변경될 때마다 새 API로 Fetch 요청을 수행하는 컴포넌트뿐입니다. 이것을 개선하고 요청의 수를 제어하는 방법을 찾을 수 있을 겁니다.

다음은 렌더링된 결과입니다 (여기에는 스타일이 없으므로 예쁘지 않을 수 있습니다!):

![이미지](/assets/img/2024-06-22-AdvancedDataStructuresandAlgorithmsTries_3.png)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

방금 말했잖아요!

이제 getSearch 함수를 살펴봅시다. 이 함수는 흥미로운 일을 하고 있어요.

## 검색 게이트웨이

무언가를 검색할 수 있도록 하려면, 우리 Trie에 그 "무언가"를 먼저 삽입해야 합니다. 그래서 그 "무언가"를 언제 삽입하는 거죠?

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

저희 검색 엔진의 "코퍼스"를 첫 번째 검색 요청으로 로드하기로 결정했습니다. 그리고 메모리에 Trie를 유지하고 기본 싱글톤 패턴을 구현하여 덮어쓰지 않도록하겠습니다. 다음과 같이요:

여러분은 아마도 제가 실제 Trie를 처음으로 생성할 때 몇 가지 단어를 Trie에 추가하는 loadIndex 함수를 호출하는 것을 확인할 수 있습니다. 그런 다음에는 처음 생성한 인스턴스를 반환하는 것 뿐입니다.

이 방법은 전체 앱 실행 중에 단일 인스턴스를 유지하는 깔끔한 방법입니다.

이 예제를 더 자세히 살펴보고 싶다면, 여기에서 코드를 확인해보세요. 즐겁게 이용하세요!

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이전에 Trie에 대해 들어보셨나요? 혹은 더 좋은 경우, 어디에 사용해 본 적이 있나요? 댓글에서 여러분의 경험을 공유해 주세요. 무엇을 해봤는지 알고 싶어요!

# 레고처럼 재사용 가능한 구성 요소로 앱 만들기

![이미지](/assets/img/2024-06-22-AdvancedDataStructuresandAlgorithmsTries_4.png)

Bit은 25만 명 이상의 개발자가 컴포넌트로 앱을 구축하는 데 도움을 주는 오픈 소스 도구입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

어떠한 UI, 기능 또는 페이지를 재사용 가능한 구성 요소로 변환하여 여러 애플리케이션 간에 공유하세요. 협업이 쉬워지고 더 빠르게 개발할 수 있습니다.

→ 더 알아보기

애플리케이션을 구성 요소로 나누어 앱 개발을 쉽게 만들고 원하는 워크플로에 대한 최상의 경험을 누려보세요:

## → Micro-Frontends

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## → 디자인 시스템

## → 코드 공유 및 재사용

## → 단일 저장소

# 자세히 알아보기
