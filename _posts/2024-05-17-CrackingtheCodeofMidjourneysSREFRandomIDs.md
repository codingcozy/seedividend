---
title: "SREF 랜덤 ID 코드 해석하는 방법"
description: ""
coverImage: "/assets/img/2024-05-17-CrackingtheCodeofMidjourneysSREFRandomIDs_0.png"
date: 2024-05-17 04:27
ogImage:
  url: /assets/img/2024-05-17-CrackingtheCodeofMidjourneysSREFRandomIDs_0.png
tag: Tech
originalTitle: "Cracking the Code of Midjourney’s SREF Random IDs"
link: "https://medium.com/design-bootcamp/cracking-the-code-of-midjourneys-sref-random-ids-04d3634d17d5"
isUpdated: true
---

## MIDJOURNEY & SREF 코드 숙달하기

Midjourney의 새로운 스타일 참조 ID를 통해 프로젝트를 혁신하고, 여러 프롬프트에서 일관된 예술 스타일을 보장하세요.

2월에 Midjourney는 새로운 스타일 참조 이미지 기능을 도입했습니다. 여기서 혁신적인 점은 사용자가 적절한 이미지 URL을 사용하여 --sref [URL] 또는 --sref [URL] [URL] [URL]을 프롬프트에 사용할 수 있으며, 이를 통해 프롬프트에 스타일을 적용할 수 있다는 것입니다. 이것은 여러 이미지 프롬프트 전반에 걸쳐 일관된 모습을 유지할 수 있는 방법을 마침내 제공했기 때문에 게임 체인저였습니다. 그래픽 소설이나 어린이 도서를 제작하는 창작자들은 프로젝트 전체에서 동일한 예술 스타일을 원할 수 있습니다. 텍스트 프롬프트로 특정 스타일을 유지하는 것은 때로는 어려울 수 있었지만, 새로운 SREF를 사용하면 쉽게 가능합니다.

하지만 Midjourney는 여기서 멈추지 않았습니다! --sref random이라는 것을 소개했는데, 이를 사용하면 1부터 4294967295 사이의 숫자를 얻을 수 있습니다. 네, 맞았습니다. 40억 가량의 숫자가 가능합니다. 각 ID 번호에는 다른 스타일이 적용되어 있으며 일부는 유사한 영향을 받을 수도 있습니다. --sref random을 사용하거나 범위 내에서 숫자를 선택하고 프롬프트 끝에 --sref ID#를 사용하여 해당 번호를 사용할 수 있습니다.

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

새로 생성된 --sref random으로 만든 새 SREF ID에 대한 기본 이미지를 보는 것은 불가능합니다. 그러나 다른 프롬프트 없이도 해당 ID의 직접적인 영향을 볼 수 있는 방법이 있습니다. 이를 통해 주어진 ID의 내부 영향을 훨씬 명확하게 파악할 수 있습니다.

이를 실행하는 방법은 빈 프롬프트와 스타일 가중치 1000 --sw 1000으로 나타내는 상자 아래에 표시된 대로 하면 됩니다. 스타일 가중치는 1부터 1000 사이의 값을 가질 수 있습니다.

```js
"" --ar 2:3 --sw 1000 --sref random
```

아무것도 넣지 않고 빈 이중 인용부호만 사용함으로써 Midjourney에 프롬프트를 만들도록 강제하는 것입니다. 스타일 가중치를 1000으로 설정하면 이 비-프롬프트에 스타일의 전체 가중치를 강제로 부여합니다. 반환되는 이미지는 해당 ID가 무엇을 하는지 명확히 보여줍니다. 몇 가지 예를 들어 설명해 드리겠습니다. 동일한 SREF ID로부터 만들어진 네 개의 이미지 쿼드를 실행했습니다. 다양한 변형이 있지만 전부 영향을 받은 것이 매우 유사함을 보여줍니다. 강한 여성적이고 핑크색 및 네온 요소를 가진 이 ID를 선택한 이유는 이를 빠르게 식별하고 영향을 파악할 수 있기 때문입니다.

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
"" --ar 2:3 --sref 1583246159 --sw 1000
```

여자와 소녀의 이미지를 만들었어요. 이 스타일에 너무 잘 어울린다고 생각했어요. 소년은 조금 흔해빠진 이미지일지도 모르겠어요 (죄송해요). 하지만 SREF가 없는 보통 이미지에는 이미지에 분필이 많이 들어 있지 않았을 거에요.

```js
a beautiful young woman posing for a portrait --ar 2:3 --sref 1583246159
A little girl having a tea party with her favourite dolls. --ar 2:3 --sref 1583246159
A little boy playing war games with his action figures. --ar 2:3 --sref 1583246159
```

다음 이미지들로 넓은 지역에 갔어요. 사진에 나오는 오두막은 자연 실외 색상이 핑크 톤을 압도했어요. 일반적으로 더 많은 초록색이 아닐까 생각했지만, #1의 연한 핑크징을 힌트로 남겨뒀어요, #2와 #3의 핑크징으로 이루어진 집, 그리고 #4에서 미세하게 핑크 빛을 받아빛나는 민들레까지도요. 물에 비치는 핑크색의 반사와 모래색이 따뜻하고 황금빛을 내는 걸 특히 좋아했어요.

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

빈 프롬프트 이미지를 확인하는 것이 도움이 되는 이유 중 하나는 동일한 ID를 사용하여 만든 이미지에서 불일치가 발견되면, 프롬프트에 충돌하는 요소가 ID의 기저 영향과 일치하지 않을 가능성이 있다는 것을 나타낼 수 있습니다.

```js
일몰이 진 해변, 따뜻한 황금 모래가 촉촉하게 반짝입니다. 푸른 파도가 천천히 해변으로 밀려옵니다. 갈매기들이 하늘을 가볍게 날아다닙니다. --ar 2:3 --sref 1583246159
자정에 도심 거리를 희주로 달리는 스포츠 카 --ar 2:3 --sref 1583246159
숲 속 작은 오두막, 왼쪽에는 상록수로 둘러싸여 있고 오른쪽의 개방된 초원은 민들레로 가득합니다. --ar 2:3 --sref 1583246159
```

위의 세 개의 쿼드는 기본 스타일 가중치인 100으로 실행됩니다. --sw #이 지정되지 않으면 자동으로 100을 사용합니다. ID가 프롬프트에 미치는 영향을 가볍게 만들기 위해 숫자를 줄일 수 있습니다. 아래에는 스타일 가중치가 200, 500 및 1000인 동일한 프롬프트를 실행한 예시가 있습니다. 이 ID의 분홍색 스타일은 강력하기 때문에 차이를 보기 어렵지만, 200에서 이미 사람들을 포함하지 않는 프롬프트에 여성이 나타나기 시작합니다.

아래 상자에 서로 다른 스타일 가중치를 순열로 설정했습니다. 순열은 하나의 프롬프트로 여러 프롬프트를 실행할 수 있게 하는 꼼수입니다. 중괄호 안에 쉼표로 구분된 목록을 추가함으로써, 미드저니에게 200으로 먼저 프롬프트를 실행하고, 그 다음에는 500으로, 그리고 1000으로 실행하라고 알려주는 것입니다. 이는 무엇이 무엇을 하는지 탐색하는 경우에 유용할 수 있습니다.

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
해변, 일몰, 따뜻한 황금빛 모래가 촉촉하게 빛난다. 파란 파도가 천천히 밀려나 올라온다. 갈매기가 하늘을 가르며 날아다닌다. --ar 2:3 --sref 1583246159 --sw {200,500,1000}
자정에 도시 길을 광장히 달리는 스포츠카 --ar 2:3 --sref 1583246159 --sw {200,500,1000}
나무로 된 작은 오두막, 왼쪽으로 이어진 상록수와 오른편의 물푸레나무로 가득한 넓은 목초지. --ar 2:3 --sref 1583246159 --sw {200,500,1000}
```

## 더 알아보기

## 30개의 SREF ID가 당신의 프롬프트를 기다립니다!

## 결론

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

중간 여행의 혁신적인 스타일 참조 이미지 기능과 무작위 ID 생성 기능은 창작자들이 작품에서 일관성을 유지할 수 있는 방식을 변화시켰습니다. 그래픽 소설, 어린이 책 또는 일관된 스타일을 필요로 하는 어떤 창의적 프로젝트를 작업 중이든, 이러한 도구들은 탁월한 제어와 창의성을 제공합니다. 서로 다른 스타일 가중치와 순열을 실험함으로써 여러 예술적 가능성을 개방하고 이미지에서의 영향을 세밀하게 조절할 수 있습니다. 이러한 기능들을 포용하여 매번 일관된, 시각적으로 놀라운 결과물을 달성하고 예술을 높이세요.

여러분의 참여와 피드백은 저에게 귀중합니다. 제가 작성하는 콘텐츠를 안내해주어 그것이 공감되고 풍요로워지도록 합니다. 만약 이 중간 여행 탐험에서 영감을 받았다면 언제든지 생각을 공유하고 그 박수를 클릭해주기를 망설이지 마세요—총 50개까지 가능합니다! 다음 예술적 모험까지, 계속해서 창작하고 영감을 주세요!

![Cracking the Code of Midjourney's SREF Random IDs](/assets/img/2024-05-17-CrackingtheCodeofMidjourneysSREFRandomIDs_0.png)

```js
"" --ar 4:3 --sref 509968410 --sw 1000
```
