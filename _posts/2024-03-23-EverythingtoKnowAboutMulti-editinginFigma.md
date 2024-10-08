---
title: "피그마에서 다중 편집에 대해 알아야 하는 것들"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Everything to Know About Multi-editing in Figma"
link: "https://medium.com/@joeyabanks/everything-to-know-about-multi-editing-in-figma-edd58369fd20"
isUpdated: true
---

## 그리고 사용 가능한 모든 단축키도!

다시 안녕하세요! 👋 피그마가 다시 한 번 성공을 거뒀어요. 팀이 기능을 해결하고 출시했어요 — 사실 캔버스 내에서 새로운 작업 방식을 소개했어요 — 나조차 문제인줄도 몰랐던 문제를 해결하는 데 도움을 주는 기능이에요. 그것이 바로 다중 편집(Multi-edit)이라고 해요. 짧은 시간동안만 사용해봤지만 이미 이 기능이 툴에 매우 자연스럽고 기본적인 부분으로 느껴지는 기능 중 하나라는 것을 알 수 있었고, 다시 한 번 피그마 팀의 재능을 부각시켜준다고 느꼈어요.

이번 뉴스레터에는 그 기능에 대해 더 자세히 설명하고, 저에게 가장 도움이 된 부분, 그리고 다중 편집의 장점을 최대한 활용할 수 있는 모든 단축키와 팁을 알려드리고 싶어요. 이미 얼마나 많은 마우스 클릭과 이동을 절약했는지 궁금해지는데 말이에요.

# 피그마 초점: 다중 편집

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

![Figma Multi-edit](/assets/img/Everything-to-Know-About-Multi-editing-in-Figma_0.png)

멀티 수정은 Figma 내에서 사용 가능한 기능으로, 이름에서 알 수 있듯이 여러 가지를 동시에 편집할 수 있게 해줍니다. 소프트웨어 디자인의 드물게 볼 수 있는 기능 중 하나인데, 사용하면 잠깐의 순간이더라도 새로운 초능력을 얻은 것처럼 느끼게 해줍니다. 한 번 시도하면, 언제부터 Figma 없이 디자인을 했는지 궁금해하게 될 거에요.

Figma의 멀티 수정은 디자인을 시작하면서 겪었던 순간을 떠올리게 했어요. 저는 개발자가 아니지만, 그 당시엔 HTML과 CSS를 사용하여 웹 사이트를 코딩하고 파일을 편집하다가 여러 곳에 같은 링크 오타를 발견했던 적이 있어요. 좀 번거롭긴 했지만 클릭하고 수정, 클릭하고 수정하기 쉬웠어요. 그런데 공학 친구가 편집기 내에서 여러 커서를 추가할 수 있는 기능을 사용하라고 제안했죠. 그러니까 입력한 키가 각 커서 위치에서 반영된다는 거예요. 마치 파일에서 다섯 또는 여섯 개발자가 동시에 나타나서 도와주는 것 같았고, 몇 초 안에 모든 오타를 고칠 수 있게 됐어요.

소프트웨어를 만들어온 지 몇 십 년이 되었지만, 우리 디자이너와 개발자로서 여전히 이런 순간을 발견할 수 있는 것이 가장 좋아하는 이유에요. 어떻게 사람들이 도구나 서비스를 사용하는지 관찰하다가 예전부터 해결되지 않았던 문제 또는 개선할 수 있는 경험들을 위한 간단하고 우아한 솔루션을 만들어낼 수 있어요.

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

마크다운으로 테이블 태그를 변경하세요.

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

새로운 다중 편집 기능으로 이제 Figma 내에서 일치하는 레이어 또는 오브젝트를 쉽게 선택하여 정렬, 회전, 텍스트 또는 크기 조정과 같은 필요한 조정 작업을 할 수 있습니다. 이는 놀랄만한 강력하고 효율적인 작업 방식이며, 다중 편집 변형도 포함된 기능을 사용할 수 있다는 점이 특히 흥미로운데요! 자주 프로토타입을 만들거나 스마트 애니메이션을 사용하는 경우, 다중 편집은 디자인 내에서 공통적이고 지속적인 속성들에 대한 변경을 더 쉽게 만드는 도구입니다.

새로운 기능을 모두 활용하는 방법에 대해 이야기해 봅시다.

## 다중 편집 사용하기

## 일치하는 오브젝트 식별하기

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

멀티 편집은 "매칭 오브젝트"라는 새로운 용어를 사용하며, 이 글에서 그 단어를 많이 입력하게 될 것 같아요! 매칭 오브젝트는 "프레임 1"이나 "레이블"과 같이 네이밍에서 일치하는 레이어들을 말합니다. 이러한 레이어들은 프레임, 그룹, 모양, 텍스트 등 무엇이든 될 수 있어요.

매칭 오브젝트를 사용하려면 프레임이나 그룹 내에 있어야 하며 캔버스 위에서 혼자 있으면 안 되고 파일 페이지 내 여러 곳에서 나타나야 해요. 매칭 오브젝트는 크기와 외관이 다를 수 있고, 프레임이나 그룹 중 하나라도 부모 수준 레이어의 이름만 일치하면 됩니다.

디자인 내에서 매칭 오브젝트가 어디에 있는지 확인하려면 페이지 내 다른 곳에서 다시 나타나는 오브젝트를 선택한 상태에서 Shift ⇧ 키를 누르세요. 그러면 Figma가 일치하고 선택 가능한 모든 오브젝트 주변에 파란색 하이라이트를 표시할 거예요. 매칭 오브젝트를 식별할 필요는 없지만, 매칭 오브젝트를 정확히 식별하는 데 도움이 될 수 있다고 생각해요.

이 모든 것을 고려할 때 이 기능을 사용하기 시작할 때 기억해야 할 중요한 점은 새로운 메카닉스의 임의 인식을 통해 많은 혜택을 볼 수 있다는 것이죠! 정확하게 일치하지 않는 두 오브젝트를 선택해도, 이전보다 더 편리하게 작업하고 조정할 수 있어요. 이것이 이 릴리스의 가장 좋은 부분이라고 생각해요.

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

# 매칭 오브젝트 선택

특정 오브젝트를 선택하면 Figma 내에서 모든 매칭 오브젝트를 선택하는 세 가지 상호작용이 있습니다. 여러 매칭 오브젝트를 선택하는 이유는 이후 섹션에서 자세히 알려드리겠지만, 동시에 속성을 수정하기 위함이며, 도구 내에서 절대적인 마법 같은 느낌을 줍니다.

참고: 페이지 내의 모든 매칭 오브젝트가 선택되며, 현재 줌 레벨 밖에 있는 오브젝트라도 선택됩니다. 파일 내 다른 페이지에 나타나는 매칭 오브젝트는 선택되지 않습니다. 이는 전형적인 파일 및 페이지 관례를 따르는 것입니다. 여기에 포함된 마커들은 캔버스 가장자리 부근에 표시되어 시각적으로 강조되도록 설계되었으며, 보이지 않는 오브젝트가 선택됨을 알려줍니다.

<img src="/assets/img/Everything-to-Know-About-Multi-editing-in-Figma_1.png" />

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

1. 첫 번째 객체를 선택한 후 상단 툴바로 이동하여 새로운 모든 일치 레이어 선택 버튼을 선택하세요. 이 버튼이 표시되지 않으면, 객체가 캔버스 위에 홀로 놓이지 않고 프레임이나 그룹 안에 있는지 다시 한 번 확인해보세요. 일치하는 객체가 있다면 선택될 것이고, 그렇지 않으면 Figma가 일치하는 레이어를 찾지 못했다고 알려줄 것입니다.

![image](https://miro.medium.com/v2/resize:fit:1400/1*yn0Kt_jJ3e0FTjZeDUF6rw.gif)

2. 일치하는 객체를 선택하는 두 번째 방법은 위 방법에 대한 키보드 바로 가기인 CMD ⌘ + OPT ⌥ + A를 사용하는 것입니다 (일반 CMD ⌘ + A 바로 가기처럼, 추가 수정자 키가 추가된 것만 빼면 같습니다.)

3. 세 번째이자 아마 가장 흥미로운 방법은 Shift ⇧ 키를 누른 채로 프레임 바깥쪽에서 안쪽으로 드래그를 시작하여 원본 객체와 모든 일치하는 객체가 선택되도록 하는 것입니다. 참고: 프레임 내부에서 드래그를 시작하면, Figma는 객체를 선택하는 것이 아니라 선택된 객체에 객체를 추가하려고 시도하는 것으로 간주하여 일치하는 객체가 선택되지 않을 것입니다.

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

![Image](https://miro.medium.com/v2/resize:fit:1400/1*dDfWkIS_5yxxZDdjfJx8PA.gif)

# 매칭된 객체 편집: 기본

크기 조정

매칭된 객체를 선택하는 것이 첫 번째 단계라면, 그들을 편집하는 것은 당연히 그 다음 단계가 될 것입니다. 멀티 편집 이전에는 레이어 선택을 한 후 (매칭 여부와 관계없이) 편집할 수 있었지만, 조정은 프레임에 대한 상대적이 아니라 전체 선택에 대한 것이었습니다. 이로 인해 크기 조정 시 객체의 최종 위치가 잘못되는 경우가 있었으며 일반적으로 한 번에 하나씩 크기를 조정하는 것이 더 효율적이었습니다. 최근 업데이트에서는 선택된 매칭된 객체가 그들의 프레임과 관련하여 크기 조정되어 원래 위치를 유지할 수 있습니다.

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

![Alignment GIF](https://miro.medium.com/v2/resize:fit:1400/1*ObPwrZUhPWibiCZnd_SHaA.gif)

정렬

멀티 편집의 새로운 기능이 도입되기 전에는 여러 선택한 객체를 정렬할 때 실수로 서로 위로 쌓이는 것이 일반적이었습니다. 멀티 편집에서의 개선 사항으로 인해 객체는 이제 서로가 아닌 해당 프레임에 맞게 정렬될 수 있습니다. 대박!

이제 이 옵션이 사용 가능해진 것은 이미 제 워크플로우에서 유용하다는 것이 입증되었습니다. 이제 여러 일치하는 레이어를 선택하고, 그들의 위치 및 정렬을 전체 선택 대상이 아닌 화면에 맞춰 조정할 수 있습니다. 선택한 객체를 해당 프레임에 상대적으로 정렬하려면 정렬 컨트롤 위로 마우스를 가져갈 때 Shift ⇧ 키를 누르세요.

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

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*YQ2mTZowMC7kIW9Ba8RKsA.gif)

변환

일치하는 객체 그룹의 회전, 크기 또는 위치를 편집할 때 시작 값이 서로 다른 것이 일반적입니다. 따라서 Figma는 각 변환 편집이 객체와 절대적으로 동일하거나 상대적인 값을 가질 수 있도록 허용합니다.

예를 들어, 상단 내비게이션 바를 가지고 있고 캔버스의 (0,0)에 앉아 있어야 한다고 가정해 봅시다. X 및 Y 입력의 값을 "0"으로 설정할 수 있습니다. 이제 각 상단 내비게이션 바는 시작 위치에 관계없이 (0,0)에서 시작합니다.

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

![이미지](https://miro.medium.com/v2/resize:fit:1400/0*OZGWpbtyZkr5Sfbi.gif)

또 다른 방법으로, 크기가 다른 두 개의 버튼이 있고 각각의 너비를 24px씩 늘리고 싶다면, 입력란 내부에 계산을 적용할 수 있습니다. 이 계산은 Mixed + 24로 표시될 것입니다. 이제 내 선택한 각 버튼은 24px씩 업데이트되고 다양한 너비를 유지할 것입니다.

중첩 프레임 재부모 설정

가끔은 Figma에서 기존 구조를 실험하고 깨야 할 때가 있습니다. 멀티-편집을 사용하면 선택한 매칭 객체를 프레임 및 그룹에서 들어내거나 내보내는 것이 가능하며, 이는 이전에 많은 반복적인 클릭 및 드래그가 필요했던 작업을 대체할 수 있습니다.

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

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*bszsw6tGjtrXp_uUZklfhQ.gif)

Copy & Paste

Figma의 역사에서 볼 때, 이 도구 내에서의 복사 및 붙여넣기가 개선되어야 한다는 필요에 대해 가만히 있지 않았습니다. 몇 년 전 팀이 상당한 변경 사항을 실행했습니다. 몇 릴리스만에 혼동스럽게 사용되던 것이 거의 완벽하게 사용되는 수준으로 발전했으며, 멀티 편집 업데이트로 인해 복사 및 붙여넣기가 더욱 향상되었습니다. 일련의 프레임에서 복사된 객체들은 이제 원본 위치를 유지한 채 해당하는 일련의 프레임에 직접적으로 각각 붙여넣을 수 있습니다. 또 하나의 복사 및 붙여넣기에 대한 승리!

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*GC00nejPsThzq3oGoHVVWA.gif)

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

# 편집 일치 객체: 고급 기능

다중 편집 텍스트

다중 편집이 출시되기 전에 동시에 여러 곳에서 나타나는 텍스트 내용을 변경하는 것은 어려웠지만 몇 가지 방법이 있었습니다. 구성 요소 및 인스턴스를 사용하거나 텍스트 변수를 만들고 적용하거나 업데이트된 텍스트 문자열을 클립 보드로 복사하고 빠른 작업 메뉴의 "모두 선택" 및 붙여넣기를 사용하는 것이 해결책이었지만, 그렇게 훌륭한 것도(또는 매우 잘 알려진) 것은 아니었습니다. 각 방법은 미리 정의된 구조나 캔버스 전체에서 수동 및 지루한 클릭 및 선택이 필요했습니다. 다행히도 Figma는 이 제한을 인식했으며, 다중 편집의 다양한 기능 중 하나는 디자이너와 콘텐츠 디자이너가 여러 일치하는 텍스트 필드 전체에서 텍스트를 편집할 수 있도록 돕는 능력입니다.

이 새로운 기능을 사용하려면 먼저 텍스트 개체를 선택한 다음 일치하는 모든 개체를 선택하십시오. 실제 텍스트 내용은 다를 수 있지만 텍스트 레이어의 이름이 일치해야 합니다. 이것은 구성 요소와 작업할 때 일반적으로 좋은 실천입니다. 인스턴스 내에서 수행된 재정의를 보존하는 데 도움이 됩니다. 그다음 상단 툴바 내의 새로운 다중 편집 아이콘을 선택하거나 Enter를 누르고 입력을 시작하십시오! 모든 레이어가 즉시 입력된 변경 사항을 반영하여 업데이트됩니다. 또한 해당하는 모든 텍스트 레이어가 선택된 상태에서 기존 또는 새로운 텍스트 스타일을 적용하거나 생성하고 줄 간격과 같은 텍스트 속성을 조정할 수도 있습니다.

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

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*WRl29e4jJvqQOsWStZqMsQ.gif)

다중 편집 및 자동 레이아웃

모든 편집 조정 가운데 이것이 제가 가장 좋아하는 기능 중 하나입니다.

이미지와 같은 여러 디자인 내 개체가 있고 그들을 그리드 내에서 조직화하기 위해 자동 레이아웃 랩을 적용하고 싶다고 상상해보세요. 이전에는 해당 이미지를 선택한 채로 자동 레이아웃을 적용하면 자동 레이아웃이 적용된 큰 단일 프레임을 만들었는데, 이는 거의 원하는 결과가 아니었습니다. 이제, 다중 편집을 통해 이미지 클러스터마다 자동 레이아웃을 쉽게 적용할 수 있습니다. 터치하여 또는 Shift ⇧ + A 키보드 단축키를 사용하여 적용할 수 있습니다.

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

디자인 내의 자동 레이아웃 프레임에서 하나의 객체에 대한 순서 또는 표시 조정이 필요한 경우, 이제 해당 객체를 선택한 후, 모든 일치하는 객체를 선택하여 숨기거나 순서를 조정하는 등의 작업을 수행할 수 있습니다. 여기에 더해서 멋진 점은, 다중 편집 선택이 부모 프레임의 순서 및 방향 설정에 관계없이 디자인 내에서 일치하는 객체를 찾을 수 있다는 것입니다.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*p_SNxXZGFsBfgpSAQSSLYg.gif)

다중 편집 컴포넌트

이런 것을 구현하는 데는 너무 복잡할 것이라고 생각했는데, 다중 편집은 엄청난 놀라움과 함께 나타났습니다: 일치하는 객체를 선택하고 새 컴포넌트의 인스턴스와 교체하는 기능을 제공합니다. 탐색 단계에서 비컴포넌트화된 객체들이 디자인 전체에 퍼져 있을 때부터 모두 지원하는 라이브러리를 구축하기 시작하는 것은 항상 도전입니다. 이 기능 하나만으로도 많은 디자이너들에게 큰 도움이 될 것으로 상상해 봅니다.

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

이 작업은 먼저 파일 전체에서 사용할 구성 요소로 변환 준비가 된 객체를 선택하는 것으로 시작합니다. 이제 일치하는 모든 객체를 선택하세요. 남은 작업은 새로운 구성 요소를 만드는 것뿐입니다. 단추를 컨텍스트 메뉴를 통해 만들거나 CMD ⌘ + OPT ⌥ + K 키보드 바로 가기를 사용하여 새로운 구성 요소의 인스턴스로 각 선택 항목을 자동으로 교체합니다. 이때 Figma는 디자인 바로 위에 위치한 새로 만든 주 구성 요소의 인스턴스로 교체합니다.

참고: 현재로서는, 심지어 레이어 이름이 동일하더라도 콘텐츠의 차이를 유지할 수는 없습니다. 예를 들어, 두 개의 일치하는 단추가 선택되었지만 하나는 "Contact Us"라고 하며 다른 하나는 "About Us"라고 한다면, "label"이라는 같은 이름으로 지정되어 있더라도, Figma는 캔버스에서 가장 왼쪽에 선택된 항목을 참조하고 사용합니다. 콤포넌트를 생성할 때 대신 첫 번째로 선택된 객체를 사용하도록 이 동작을 변경해주기를 바랍니다.

![이미지](https://miro.medium.com/v2/resize:fit:1400/0*q-nv7oZMqLweTTzp.gif)

다중 편집 변형

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

컴포넌트 세트를 자주 만들고 작업하는 디자이너를 위한 한 가지 추가 기능이 더 있어요: 다중 수정이 지원되는 변형을 편집할 수 있는 능력이죠. Figma에서 컴포넌트 속성을 처음 출시했을 때 컴포넌트 그룹 내에서 변형별로 일치하는 요소를 모두 선택하는 옵션이 포함되어 있었어요. 이 기능은 선택한 항목의 속성을 조정하거나 자동 레이아웃 프레임 내에서의 순서를 조정하거나 가시성을 전환하는 등이 매우 쉬웠죠. 이는 유용한 선택 유틸리티이며 Figma가 어떻게 개선할 수 있는지에 대해 의문을 품지 않았어요. 그러나 물론 다중 편집으로 팀이 개선 방법을 찾아냈죠.

이제 변형을 수정할 때 새로운 다중 편집 변형 "모드"로 진입할 수 있는 옵션이 생겼어요. 이 모드는 활성 상태로 유지되며 캔버스 다른 곳을 클릭하거나 단축키 Q를 전환할 때까지 계속 유지됩니다(그러나 실수로 ⌘ + Q를 누르지는 않도록 조심하세요!). 이 새로운 다중 편집 변형 모드가 켜져 있을 때 변형 중 하나에 대한 변경 사항(텍스트 조정, 아이콘 추가 또는 크기 변경 등)이 해당 컴포넌트 그룹 내의 모든 변형에 적용됩니다. 예를 들어, 각 변형에 배치할 아이콘이 있는 경우, 이제는 각 변형에 대해 그 아이콘을 여러 번 복사하여 붙여넣을 필요가 없이 한 변형에 직접 자산 패널에서 이 아이콘을 붙여넣거나 가져올 수 있다는 뜻이에요.

![image](https://miro.medium.com/v2/resize:fit:1400/1*RmgRP3mmelNTXgE2ce0XYQ.gif)

모든 변형에 포함해야 할 객체가 아직 자산 패널에 없거나 클립보드에 없어서 캔버스에만 존재할 수 있는 시점이 있을 수 있어요. 새 다중 편집 변형 모드로 진입하여 해당 객체를 선택하면, Figma는 더 이상 다중 편집을 원하지 않는다고 가정할 거예요. 적어도 현재로서는 이것이 최선의 동작인지 확신이 없는데요, 모드 내에 머물고 싶었기 때문이에요. 하지만 더 많은 시간을 할애해 보고 싶어요. 이를 조금 더 쉽게 만들기 위한 꿀팁을 찾았는데요, 첫 번째 변형에 객체를 가져와 자르고, 다중 편집 모드에 들어가서 붙여넣기를 하면 도움이 됩니다.

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

# 모든 단축키

나는 단축키를 사용하는 걸 좋아해요. 진심으로 희망해요. (시간이 흐른다면) 은퇴할 때 쯤에는 단축키를 사용하여 제 삶에서 하루를 다시 얻을 수 있을 거라고 생각해요. 어떤 일인지 알겠지만, 멀티 편집 기능으로 포함된 여러 가지 유용한 단축키가 Figma에 포함되어 있어요. 이 모든 것들이 아래에 나와 있어요.

- 첫 번째 오브젝트를 선택하고, CMD ⌘ + Opt ⌥ + A를 사용하여 일치하는 오브젝트를 선택하세요.
- 첫 번째 오브젝트를 선택하고, Shift ⇧를 누른 채로 프레임 외부로 드래그하여 일치하는 오브젝트를 선택하세요.
- 일치하는 여러 텍스트 레이어의 내용을 편집하려면 모든 일치하는 오브젝트를 선택하고, enter ↩️를 누르고, 입력을 시작하세요.
- 컴포넌트 세트 내에서 작업할 때, Q를 눌러 변형에 대한 멀티 편집을 켜거나 끌 수 있어요.

# 마무리 생각하기

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

멀티 편집 기능이 도착했다니 너무 기쁘네요. 제 일상 업무에서는 이미 이 기능이 가장 큰 조정 및 편집뿐만 아니라 더 작은 작업, 예를 들어 여러 객체를 빠르게 삭제하는 데 가치가 있다는 것을 증명했습니다.

새로운 기능이 도입되면 다른 사람들이 어떻게 활용할지, 그리고 Figma가 시간이 지남에 따라 어떻게 발전할지 궁금해집니다. 이미 개인적인 바람목록에는 선택하기 전에 몇 개의 매칭 객체가 선택될지 볼 수 있는 기능이 포함되어 있습니다.

휴! 읽어 주셔서 정말 감사합니다. 이 게시물이 여러분의 작업에서 멀티 편집을 사용하여 놀아보고 실험해보는 데 필요한 모든 정보를 제공하는 데 도움이 되기를 바랍니다.

# 놓치신 분을 위해…

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

![이미지](/assets/img/Everything-to-Know-About-Multi-editing-in-Figma_13.png)
