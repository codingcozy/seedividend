---
title: "협업 편집 기능 추가 우리 뉴스룸 CMS 구축 과정 공개"
description: ""
coverImage: "/assets/img/2024-06-23-WeBuiltCollaborativeEditingforOurNewsroomsCMSHeresHow_0.png"
date: 2024-06-23 13:12
ogImage:
  url: /assets/img/2024-06-23-WeBuiltCollaborativeEditingforOurNewsroomsCMSHeresHow_0.png
tag: Tech
originalTitle: "We Built Collaborative Editing for Our Newsroom’s CMS. Here’s How."
link: "https://medium.com/timesopen/we-built-collaborative-editing-for-our-newsrooms-cms-here-s-how-415618a3ec49"
isUpdated: true
---

Sophia Ciocca와 Jeff Sisson

뉴욕 타임스 기사를 게시하려면 많은 사람이 필요하고 때로는 상황이 복잡해질 수 있습니다. 여러 기자와 편집자가 한 편의 이야기를 쓰고 개정하고 발표하는 데 참여할 수 있으며, 이 협업은 종종 비선형적이며, 서로의 발을 짓게할 수 있습니다.

특히 많은 유형의 협력자(사진 편집자, 복사 편집자, 기자, 프로듀서)가 동시에 문서를 편집해야 하는 긴급 상황에서 이는 특히 사실입니다. 뉴욕 타임스의 차세대 기사 편집 인터페이스인 Oak을 처음 개발할 때 한 번에 한 사람만 문서를 작업할 수 있었습니다. Oak은 "필드 잠금"을 사용하여 서로 다른 사람들이 별도의 메타데이터 필드를 편집하도록 허용하는 것과 같은 일부 동시 협업 기능을 용이하게 했지만, 한 번에 한 사람만 기사 내용을 편집할 수 있었습니다.

협업 편집 기능이 필요했던 Oak에서 협력자가 동시에 자연스럽게 문서에서 작업할 수있는 더 완벽한 기사 편집기가 필요했습니다.

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

하지만 협업 편집은 해결하기 어려운 문제입니다. 실시간 업데이트를 통합하는 방법, 충돌하는 편집에 대처하는 방법, 불안정한 와이파이로 인한 오류를 처리하는 방법 등 많은 새로운 수수께끼를 제시합니다. Google Docs와 같은 제품은 대규모로 이러한 문제를 해결하기 위해 막대한 팀과 자원을 투입하고 있습니다. 저희 팀은 The Times의 편집 작업 흐름에 적합한 방식으로 이러한 수수께끼를 해결할 시간이 몇 달밖에 없었습니다. 다행히도 이러한 종류의 기술적 도전에 대한 지원이 Oak의 기술 기반으로 ProseMirror를 선택한 초기 이유 중 하나였습니다.

# 모든 사람이 단계들이 필요합니다

Oak 글이 협업적이 되기 위해서는 글에 접근 권한이 있는 모든 사람이 실시간으로 가장 최신 버전을 가지고 있어야 합니다. 이는 편집이 이루어질 때마다, 해당 편집이 협업자의 컴퓨터에서 보이도록 해야 한다는 것을 의미합니다. 개별 편집을 인터넷으로 전송할 수 있는 형태로 변환하는 것은 ProseMirror가 낮은 수준에서 수행하는 작업입니다. 각각의 편집을 "단계"라고 부릅니다. 사용자가 글자를 입력할 때, 그것이 단계입니다. 새 줄로 이동하기 위해 엔터 키를 누르는 것도 단계입니다. 문서를 조작하는 모든 것 - 이미지 추가, 제목 편집, 단락 삭제 - 모두 단계로 간주됩니다.

정확히 어떻게 단계의 데이터가 표현되는 걸까요? 우리는 단계를 문서를 어떻게 변경하는지에 대한 지시사항으로 작동하는 JSON 객체로 나타냅니다. 문서의 두 번째 위치에 글자 "H"를 넣는 것이 어떻게 보이는지 여기에 있습니다:

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

```js
{
  “단계ID”: 1,
  “단계”: {
    “단계유형”:”대체”,
    ”출발지”: 2,
    ”도착지”: 2,
    ”슬라이스”: {
      “내용”:[{
        “종류”:”텍스트”,
        ”텍스트”:”h”
      }]
    }
  },
  “클라이언트ID”: “1111–42783748297342”,
  “타임스탬프”: “Sun Feb 10 2019 12:31:32 GMT-0500 (Eastern Standard Time)”
}
```

사용자가 단어를 입력하거나 이미지를 변경하거나 코멘트를 추가할 때, 해당 동작의 단계는 사용자의 로컬 문서에 추가됩니다. 그러나 이러한 단계는 아직 다른 사람에게 전송되지 않았습니다. 다른 사람의 컴퓨터에서 이러한 단계가 표시되려면 이를 원격 서버, 즉 “권한 서버”로 보내야 하며 원격 서버에서 확인을 받아야 합니다.

권한 서버는 클럽의 용병처럼 작동합니다. 사용자로부터 단계를 받으면 그 단계를 데이터베이스에 저장할지 여부를 결정해야 합니다. 사용자의 브라우저가 마지막으로 권한 서버와 통신한 후에 저장된 단계가 없다면, 권한 서버는 해당 단계를 저장합니다. 그렇지 않으면 사용자의 브라우저에 아직 보지 못한 단계를 가져오라고 알려줍니다.

로컬 문서와 원격 권한 서버 간의 전형적인 대화는 다음과 같을 수 있습니다:

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

```js
1. 로컬: "안녕하세요, 한, 둘, 셋 단계를 가지고 있어요."
2. 원격: "좋아요, 한, 둘, 셋 단계를 저장했습니다."
3. 로컬: "다시 안녕하세요... 넷, 다섯, 여섯 단계를 가지고 있어요."
4. 원격: "아! 다른 사람이 넷과 다섯 단계를 삽입했어요. 가져와주세요."
5. *로컬이 넷과 다섯 단계를 가져오고, 이전의 넷, 다섯, 여섯 단계를 새로운 것으로 바꿔 여섯, 일곱, 여덟 단계로 반영합니다.*
6. 로컬: "안녕하세요... 이제 여섯, 일곱, 여덟 단계를 가지고 있어요."
7. 원격: "멋져요, 여섯, 일곱, 여덟 단계를 저장했습니다."
```

선 네 번째 줄에서 로컬 문서가 네, 다섯, 여섯 단계를 전송하려 시도하지만, 원격 서버는 이미 해당 단계가 존재한다고 브라우저에 알립니다. 브라우저는 해당 단계를 가져와 다시 전송하려고 합니다. 여기에서 무슨 일이 벌어지나요?

리베이스는 동일한 시기에 두 사용자가 단계를 삽입했을 때 발생하는 프로세스입니다. 코드가 어떻게 조정되는지를 결정해야 하는 중요한 부분 중 하나인 ProseMirror의 협업 편집 지원의 핵심인 Operational Transformation이라는 알고리즘이 관여합니다.

# 단계가 있는 곳이 집이다.

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

ProseMirror은 협업 편집 서버를 구현하기 위한 매우 훌륭한 구성 요소(그리고 완벽히 작동하는 데모)를 제공하지만, 데이터베이스에 단계를 저장하는 방법을 명시하지 않습니다. 우리는 우리의 특정 요구 사항에 맞는 솔루션을 설계하고 구현해야 했습니다. 저희는 프로토타이핑 단계에서 고려한 몇 가지 질문은 다음과 같습니다. 권한 있는 서버를 어떻게 확장하여 많은 수정을 허용할 수 있을까요? (기사 당 최대 25,000회) 협업 문서의 편집 기록을 어떻게 보존할 수 있을까요? 마지막으로, 최신 문서를 인쇄 생산 시스템에 전달하는 등, 우리 뉴스룸의 고유한 필요에 맞는 다양한 기능을 지원하는 방법은 무엇일까요?

다양한 프로토타입을 스케치한 후, 우리는 실시간 데이터베이스 Firestore를 사용하여 단계를 저장하고 들어오는 단계를 거르는 데 이를 사용하기로 결정했습니다. Firestore는 데이터베이스 트랜잭션을 지원하므로 여러 사람으로부터 제출된 단계가 Firestore 라이브러리에 의해 여러 번 시도되어 한 사람의 삽입이 "이기고" 데이터베이스에 기록될 때까지 다시 시도됩니다. 이러한 방식으로 여러 사람의 단계를 정렬함으로써 Firestore를 권한 있는 서버로서 좋은 선택으로 만듭니다.

데이터베이스로의 쓰기 작업이 성공하면 Firestore는 원격 사용자에게 새로운 단계가 데이터베이스에 추가되었음을 알리며, 이로 인해 앱이 새로 확인된 단계를 가져와서 문서의 복사본을 최신 상태로 가져오게 됩니다.

# 여러 사람이 입력 중입니다

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

협업 문서를 최신 상태로 유지하는 것은 중요하지만, 문서를 지켜보고 있는 다른 사람이 누구인지 알아내는 것도 중요합니다. 문서에 있는 모든 사람이 협업자의 커서 위치를 볼 수 있거나, 협업자가 마우스로 특정 부분을 강조한 것을 볼 수 있기를 원했습니다. ProseMirror와 Firebase API (Firestore의 동생)를 활용하여 Oak에 추가한 기능은 문서에 누가 있고 그들이 커서를 둔 위치를 보여주는 것입니다.

![image](/assets/img/2024-06-23-WeBuiltCollaborativeEditingforOurNewsroomsCMSHeresHow_0.png)

사용자가 Oak 편집기 내에서 타이핑, 클릭 또는 끌기를 통해 선택을 변경할 때마다, ProseMirror는 브라우저 선택의 현재 상태의 변경을 관찰하고 해당 정보로 Selection 데이터 구조를 만듭니다. 이 데이터는 사용자의 커서가 텍스트에서 어디에 있는지에 대한 정보를 반영하며, 시작 위치(머리) 및 끝 위치(앵커)를 포함합니다.

사용자가 문서에서 선택을 만들면, 해당 선택이 문서를 열어둔 모든 컴퓨터에 렌더링되고 그 옆에 사용자의 이름이 표시됩니다. 사용자가 브라우저에서 선택을 변경할 때, 해당 변경 사항이 문서에 반영되어야 하므로 업데이트된 선택 데이터(머리 + 앵커 위치)를 Firebase로 푸시합니다.

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

이러한 선택 사항을 처리하기 위해 가끔은 미래를 예측해야 합니다. 선택 데이터와 문서 변경 사항이 별도의 서버로 전송되기 때문에 Oak 앱은 브라우저가 아직 수신하지 않은 문서 버전의 선택 변경을 수신할 수 있습니다. Oak 앱이 문서 편집에 대응하는 선택 변경을 받기 전에 문서 편집을 수신하면 해당 선택이 어떻게 변경될 지 시뮬레이션해야 합니다. 마찬가지로, 아직 도착하지 않은 편집에 관련된 선택 변경을 수신하면 앱은 해당 편집이 도착할 때까지 선택 변경을 렌더링하기 전까지 기다려야 합니다. 이를 위해 미래에서 선택 업데이트를 기다렸다가 적용하기 위해 Redux Saga를 사용합니다.

우리는 선택 사항을 저장하기 위해 Firestore(단계 저장에 사용 중) 대신 Firebase를 선택했음을 언급할 가치가 있습니다. 왜냐하면 Firebase는 onDisconnect 후크를 사용할 수 있게 해줍니다. 이로써 사용자가 탭을 닫더라도 실행이 보장된 데이터베이스 수정을 수행할 수 있습니다. 이는 Oak 편집기를 떠나는 사용자의 커서가 그들을 따라 깔끔하게 정리되도록 도와줍니다.

# 게시하거나 소멸하라

모든 기사 편집물 또는 단계가 Firestore에 삽입되면 해당 기사를 열어둔 모든 브라우저 창이 최신 단계로 업데이트됩니다. 기사를 게시할 준비가 되면, 게시를 처리하는 백엔드 서비스는 최신 기사 데이터도 가져와 사이트와 앱이 기사를 렌더링하기 위해 사용자 끝단에 제공하는 게시 파이프라인으로 전송합니다.

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

우리가 협업 편집을 구현하기 전에는 이 흐름이 더 간단했습니다: 백엔드 서비스는 기사 내용과 메타데이터가 저장된 MySQL 데이터베이스로 직접 이동할 수 있었습니다. 그러나 협업 편집 기사의 경우에는 Firestore에서 기사 내용을 퍼블리싱 서비스로 이동시키는 앱 엔진 서비스(우리가 “협업 서비스”라고 명명했습니다)를 만들었습니다. 사용자가 게시 버튼을 클릭하면 브라우저가 이 협업 서비스에 요청을 보내고, 해당 서비스는 Firestore로부터 데이터를 퍼블리싱 파이프라인으로 복사합니다.

<img src="/assets/img/2024-06-23-WeBuiltCollaborativeEditingforOurNewsroomsCMSHeresHow_1.png" />

협업 편집된 기사가 디지털로 게시된 후 인쇄를 위해 세부 조정이 필요할 수 있습니다. 기사가 인쇄 공장으로 보내기 전에 뉴스룸의 편집자들이 하이퍼링크와 삽입 콘텐츠를 제거하거나 기사를 줄여야 할 수 있습니다.

이러한 인쇄 편집을 수행하는 인터페이스는 기존 MySQL 데이터베이스에 의존합니다. 협업 기사는 Firestore에 저장되어 이 인쇄 데이터베이스와 연결이 끊겨 있기 때문에, 기사의 협업 상태가 정기적 간격으로 주요 MySQL 데이터베이스로 복사되는 시스템을 개발했습니다. 이 시스템에는 Google Cloud Functions와 Google Cloud Tasks가 포함되어 있으며, 최소 한끗 차이로 콜라보레이티브 변경 사항을 신문에 인쇄될 것과 동일하게 미리 볼 수 있게 해줍니다. 이는 우리의 인쇄 편집자들에게 유용한 기능입니다.

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

공동으로 편집된 Oak 기사가 게시되고 인쇄되었을 때, 드디어 결승선에 오르게 되었습니다! 게시 후에 수정 사항이 있는 경우 일부 기사는 변경 사항을 추적하기 위해 Firestore에 저장되며, 그 단계는 디지털 게시를 마침으로 우리 기사와 해당 단계의 이야기는 끝납니다. 우리는 이제 뉴스룸 전체의 협력자들에게 대대적으로 향상된 사용자 경험을 제공하는 기존 뉴스 워크플로우와 매끈하게 작동하는 공동 편집자를 보유하고 있습니다.

이것은 거대한 다수의 팀이 노력한 결과입니다. Oak 및 CMS 팀의 많은 멤버들이 지난 및 현재에 우리를 기고유로 편집이 가능한 상태로 이끌었습니다. 특히 Oak 팀 - Minerva Archer, Sophia Ciocca, Tom Holcolmb, Dmitriy Matveev, Shane Moore, Dylan Nelson, Thomas Rhiel, Alexandra Shaheen, Jeff Sisson 및 Matthew Stake -은 2016년 이후 이 문제에 대한 놀라운 작업을 해왔습니다.

또한 PubPub의 Travis Rich에게 ProseMirror와 Firebase를 사용하는 데 대한 첫 인사이트를 제공해 준 것에 감사를 표합니다. 그리고 이 프로젝트에 유용한 조언을 제공해준 ProseMirror의 저자인 Marijn Haverbeke에게도 감사를 표합니다.

Sophia Ciocca는 뉴욕 타임즈 출판팀 소프트웨어 엔지니어로 Oak에서 일하고 있습니다. 그녀의 Medium을 팔로우하세요.

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

제프 시슨은 뉴욕타임스의 퍼블리싱 팀에서 리드 소프트웨어 엔지니어로 일하며 Oak에 참여하고 있습니다. 트위터에서 그를 팔로우하거나 그의 개인 홈페이지를 방문해보세요.
