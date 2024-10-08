---
title: "플렉스를 사용할까요, 사용하지 않을까요"
description: ""
coverImage: "/assets/img/2024-06-20-Toflexornottoflex_0.png"
date: 2024-06-20 05:47
ogImage:
  url: /assets/img/2024-06-20-Toflexornottoflex_0.png
tag: Tech
originalTitle: "To flex or not to flex"
link: "https://medium.com/@adam.mathis05/to-flex-or-not-to-flex-673d0cdb8727"
isUpdated: true
---

![2024-06-20-Toflexornottoflex_0.png](/assets/img/2024-06-20-Toflexornottoflex_0.png)

경험이 적은 신진 개발자로서 처음부터 애플리케이션을 구축하는 경우, 과하게 생각하거나 복잡하게 만드는 것은 쉽습니다. 여기에 괄호가 필요한가? 거기에 id 태그가 있어야할까? 이것을 `div`로 할 것인가, `section`으로 할 것인가? 클래스를 너무 많이 사용하는 것은 몇 개일까요?

인라인 CSS를 사용하여 구축하는 방법은 처음에는 다소 무섭게 느껴질 수 있습니다. 페이지의 모든 요소를 어떤 의미 있는 방식으로 구성해야 하는지 어떻게 할 것인가요? 그러다가 flexbox에 대해 배우면 "아하"하는 순간이 옵니다; 이렇게 하면 됩니다. 이것은 마치 마스터 키를 사용하는 것 같은 느낌입니다. 스타일시트에 그 한 줄의 코드를 사용하고 브라우저 검사 기능을 통해 확인하면, 비록 CSS 작동 방식을 기초적으로만 이해하더라도 성공할 수 있습니다. 그렇지 않나요? 그렇지만, 좀 그렇죠.

갑자기 그 마스터 키를 어디에나 적용하게 됩니다. 모든 것에 클래스를 붙이고 display: flex를 추가합니다. 잠시 후에 여러 요소들로 인해 코드를 해석할 수 없게 되고, flexbox는 더 이상 친구 같지 않게 느껴집니다. 그렇다면 언제 flexbox를 사용하는 것이 올바른 선택일까요, 언제 기다릴지 결정해야 할까요? 저도 아직 배우는 중이지만, 몇 가지 생각을 가지고 있습니다.

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

최근에 함께 한 프론트엔드 웹 애플리케이션 프로젝트에서, 홈페이지 스타일링을 처음부터 맡게 되었어요. 부트스트랩과 인라인 CSS를 결합해서 (그리고 멋진 팀원들의 도움으로) 잘 정리된 페이지를 만들었답니다. 여백이 잘 조절된 흥미로운 요소들이 있는 페이지를 완성했어요. 아래는 최종 결과물이에요:

![이미지](/assets/img/2024-06-20-Toflexornottoflex_1.png)

정말 멋지죠! 헤더, 디브, 폼, 그리고 버튼을 배치하는데 도움이 되는 플렉스박스 클래스들이 여러 개 있었어요. 플렉스 디스플레이만 제거하고, 나머지는 그대로 유지하면 다음과 같이 변경될 거예요:

![이미지](/assets/img/2024-06-20-Toflexornottoflex_2.png)

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

큰 차이가 있어요. 물론, 플렉스박스 없이도 페이지에 스타일을 적용하고 그 이상의 결과를 얻을 수 있지만, 플렉스박스를 사용하면 훨씬 쉽게 할 수 있어요. 절춘적으로 적용해야 한다는 걸 깨달았어요.

위의 첫 번째 이미지에서는 여덟 가지 다른 플렉스박스가 사용되었어요. 프로젝트가 끝난 지금 코드를 되짚어보니 아무런 기여를 하지 않는 하나와 조금만 고치면 됐을 두 개가 나왔어요. 사용된 추가 플렉스 스타일 요소를 포함하면 아마 제거할 수 있는 코드 줄이 아홉 개가 될 거예요. 계속 본다면 더 찾을 수도 있겠죠. 예를 들어, 여기에 하나 예시가 있어요. 빨간 선으로 표시된 코드는 페이지에 영향을 주지 않아요:

![이미지 설명](/assets/img/2024-06-20-Toflexornottoflex_3.png)

단 두 줄밖에 안 되는데요, 만약 이게 훨씬 큰 프로젝트였다면 20이 될 수도 있고요. 아니면 200이 될지도 몰라요. 이후에 정리할 시간을 들여야 할 불필요한 많은 코딩이죠. 이 프로젝트에서는 플렉스박스가 없는 각 클래스에 이 둘의 코드만 추가했다면 페이지에는 영향을 미치지 않는 12줄이 추가되었을 거예요.

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

내가 발견한 것은 flexbox가 큰 요소에 특히 많은 자식들을 가진 요소에 적합하다는 것입니다. 반응형 요소를 원한다면 일부 자식 요소도 flexbox를 사용해야하지만, 코드를 올바르게 구성했다면 전부 flexbox를 사용할 필요는 없을 수도 있습니다. 코드 블록으로 들어갈수록 flexbox가 디자인에 미치는 영향은 줄어듭니다.

단순히 모든 것에 flexbox를 적용하는 것이 해결책은 아닙니다. 그것은 시간 낭비일 뿐만 아니라 코드를 복잡하게 만들며, 불필요한 혼란의 덩어리에 빠질 수도 있습니다. Flexbox는 여전히 CSS 마스터 키일 수 있지만, 때로는 그 키를 주머니에 넣어두는 것이 가장 좋을 수도 있습니다.

읽어 주셔서 감사합니다!
