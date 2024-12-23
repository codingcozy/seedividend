---
title: "프롤팅 레이블을 더이상 사용해서는 안되는 이유"
description: ""
coverImage: "/assets/img/2024-05-01-Maybeitstimetoletthefloatinglabelsdie_0.png"
date: 2024-05-01 22:35
ogImage:
  url: /assets/img/2024-05-01-Maybeitstimetoletthefloatinglabelsdie_0.png
tag: Tech
originalTitle: "Maybe it’s time to let the floating labels die"
link: "https://medium.com/user-experience-design-1/maybe-its-time-to-let-the-floating-labels-die-a97d6a4ea1b2"
isUpdated: true
---

![이미지](/assets/img/2024-05-01-Maybeitstimetoletthefloatinglabelsdie_0.png)

플로팅 라벨은 사용자에게 중요한 가치를 제공하지 않을 뿐만 아니라 불필요한 혼란을 야기하며 궁극적으로는 무의미합니다.

# 소개

플로팅 라벨 패턴은 모바일 기기에서 시각적 공간 부족을 해결하는 똑똑한 방법이었지만 데스크톱 웹 페이지로 전이되어야 할 필요가 없는 곳에서 사용되었습니다.

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

이전 글에서는 왜 개발자들이 전적으로 플레이스홀더 사용을 중단해야 하는지에 대해 설명했습니다. 일부 사람들은 그 글의 댓글들에서(그리고 다른 글들에서도) 플로팅 레이블이 이러한 우려 사항을 해소한다고 주장했습니다 — 즉, 사용자가 컨트롤에서 타이핑할 때 플레이스홀더가 사라지는 문제에 대해서요.

불행하게도, 이는 여러 다른 문제에 대해서는 여전히 해결하지 못하며, 몇 가지 문제를 도입하기도 합니다.

플로팅 레이블 패턴이 무엇인지, 어떻게 발전해 왔는지, 그리고 왜 해가 서늘해져야 하는지 알아봅시다.

# 배경

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

## 플로팅 레이블 패턴이란 무엇인가요?

플로팅 레이블 패턴은 일반적으로 레이블을 플레이스홀더와 유사하게 스타일링한 텍스트 상자입니다. 포커스가 이동하거나 사용자가 입력을 시작할 때 (구현에 따라 다름), 레이블은 다음과 같이 동작합니다:

- 사용자의 입력 위치 위로 이동
- 더 작은 글꼴 크기로 축소
- (자주) 색상, 대문자화, 또는 스타일 변경
- 값이 있거나 포커스가 있는 한 계속해서 해당 상태로 유지됩니다

이곳은 Matt D. Smith의 블로그 게시물 'Float Label Pattern Started'에서 가져온 gif입니다:

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

<img src="https://miro.medium.com/v2/resize:fit:1400/0*AJWNecCc9kGWUY74.gif" />

주로 JavaScript로 처리하지만 Chris Coyier의 CSS로 된 예제와 같이 CSS만을 사용한 버전도 있습니다. 텍스트가 아래로 이동하거나 왼쪽으로 이동하는 등 다양한 변형이 있습니다. Bootstrap과 같은 구현체는 라벨을 입력란 경계 내부에 유지합니다.

<img src="https://miro.medium.com/v2/resize:fit:1400/1*yw6AdTOOnTkIV8H15LM8sg.gif" />

이를 "플로팅 인필드 라벨"이라고 합니다. 하지만 이 글의 주제를 고려하면 그것은 별 차이가 없는 구별이라고 할 수 있습니다.

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

## 간단한 역사

2013년 MDS(Matt D. Smith)가 플로팅 레이블 패턴을 만들었습니다. 당시 그 목적은 모바일 기기의 양식을 위한 공간을 보존하는 필요성을 해결하는 것이었습니다.

1년 후, Google은 플로팅 레이블을 포함한 Material Design 프레임워크를 소개했고, 상상할 수 있듯이, 그 후 모바일 및 데스크톱 양식에서 인기를 끌었습니다.

그러나 이 패턴에는 몇 가지 비평가가 있었습니다. Smith는 그것에 판매하지 않는 여러 Twitter 응답에 대한 링크를 포함했지만 비판에도 불구하고 계속 진행했습니다.

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

- 레이블은 텍스트 상자 내에 있으면 안 됩니다. (출처)
- 이 패턴은 꽤 무의미해 보입니다. 즉, "디자인을 위한 디자인" (출처)
- 레이블은 플레이스홀더로 나타나서는 안 됩니다. (출처)

물론, Adam Silver의 기사가 있었습니다.
(Floating Labels Are Problematic), 그에 대해 Matt D. Smith가 Are Float Labels Really That Problematic After All?로 대답했습니다.

대부분의 논쟁은 진정되었지만, 해당 패턴은 그대로입니다. 그러나 항상 희망이 있습니다.

![이미지](/assets/img/2024-05-01-Maybeitstimetoletthefloatinglabelsdie_1.png)

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

# 플로팅 라벨의 문제점은 무엇인가요?

플로팅 라벨 패턴은 어디서 잘못되는 걸까요? 이 패턴은 플레이스홀더가 가지는 몇 가지 문제를 공유합니다. 공정하게 말하자면, 플로팅 라벨은 라벨로서의 플레이스홀더를 사용하는 것보다 약간 더 나아 보일 수 있습니다.

하지만 충분히 많은 문제점이 있어서, 전체적으로 플로팅 라벨 패턴을 버리는 것을 권장합니다.

## 문제 #1: 포커스시 라벨이 읽기 어려워집니다

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

플로팅 레이블은 입력시 사라지지 않고 다른 위치로 이동합니다 — 따라서 이것은 플레이스홀더보다 나은 방법이지만 레이블의 텍스트는 작아집니다.

![이미지](https://miro.medium.com/v2/resize:fit:778/1*3t3yvrqkLRfQt3X8sjrcTA.gif)

사용자는 특히 그 순간에 가장 관련이 있는 레이블을 보기 위해 눈을 가늘게뜨지 않아야 합니다. 즉, 포커스를 가진 것입니다.

이로서 다음 사항이 나옵니다.

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

## 문제 #2: 포커스 시 레이블이 감소되었습니다

입력 컨트롤이 포커스를 받았을 때, 왜 레이블을 감소시키는 것인가요? 포커스를 받은 컨트롤의 레이블은 정적인 상태를 유지하거나 강조되어야 합니다. 절대로 감소시키지 말아야 합니다.

"빈" 입력 컨트롤의 레이블을 볼 수 있게 하는 것이 아니라 포커스된 컨트롤의 레이블을 보기 쉽게 하는 이유가 무엇인가요?

![이미지](/assets/img/2024-05-01-Maybeitstimetoletthefloatinglabelsdie_2.png)

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

부트스트랩의 구현(위에서 보여진 것)에서 "이메일 주소" 필드가 포커스를 받았지만 "비밀번호" 라벨은 더 크고 높은 색 대조 비율을 가지고 있습니다. 따라서, 포커스를 받은 컨트롤의 라벨보다 읽기 쉽습니다.

당신은 "하지만 포커스된 라벨의 애니메이션이 그것에 주목을 끕니다" 라고 대답할 수 있습니다. 그렇게 할 수도 있겠지만, 그 애니메이션은 한 번 일어나고 나면 끝나 버립니다.

컨트롤이 포커스를 받으면, 라벨, 값, 도움말 텍스트 또는 포커스 지시자와 같이 해당 컨트롤과 연관된 모든 것은 해당 컨트롤에 더 많은 강조를 주도록 도와야 합니다.

라벨을 그대로 두고 원래 사용 목적대로 사용하세요. 정적이고 적절히 할당되며 해당 컨트롤 근처(하지만 내부가 아님)에 배치하십시오.

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

## 문제 #3: 입력 컨트롤의 클릭 가능한 영역이 축소됨

라벨을 축소하고 입력 컨트롤의 테두리 내에 배치하면, 컨트롤의 클릭 가능한 영역도 줄어듭니다.

이는 플로팅 라벨이 플레이스홀더와 공유하는 문제입니다.

라벨이 입력 컨트롤에 적절하게 할당되었을 때(for 속성을 통해 또는 입력 컨트롤 요소를 라벨 요소 안에 중첩시킴으로써), 라벨의 전체 영역이 클릭 가능한 영역에 포함됩니다. 즉, 사용자가 라벨을 클릭하면 입력 컨트롤이 포커스를 받게 됩니다:

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

<img src="https://miro.medium.com/v2/resize:fit:1400/0*9jGWt-elzwlWsj51.gif" />

자, 이제 구글 번역 페이지의 플로팅 레이블 구현을 살펴보겠습니다. 텍스트 상자 주변을 클릭해도 제어가 포커스를 받지 않는 것을 주목해보세요:

<img src="https://miro.medium.com/v2/resize:fit:1400/1*R8ZumepBKzdGJq6WdwjnaA.gif" />

우스갯소리 같지만, 이 텍스트 상자가 사실상 폼에 있는 모든 것입니다:

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

<img src="/assets/img/2024-05-01-Maybeitstimetoletthefloatinglabelsdie_3.png" />

그러니까, 여유롭고 수직 공간을 절약해야 하는 것처럼 보이진 않아요.

손재주가 부족하거나 이동 능력에 제한이 있는 사용자들을 위해 전통적인 레이블을 사용해주세요. 입력 제어와 올바르게 연결하세요.

큰 엄지 손가락과 피곤한 눈을 가진 저 같은 사람들도 도와줄 거예요.

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

## 문제 #4: 레이블의 목적이 분명하지 않아요

텍스트 상자, 선택 컨트롤 또는 텍스트 영역의 목적은 무엇인가요?

사용자가 어떤 형태의 입력을 제공하기 위한 것이 아닌가요? 그렇다면, 사용자가 제공하지 않은 텍스트로 컨트롤의 목적을 혼동시키는 이유가 무엇인가요?

입력 컨트롤은 사용자의 공간입니다.

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

내 기사에서 자주 강조해 온 문제 중 하나에요 - 텍스트 상자 비활성화, 버튼 비활성화 또는 자리 표시자 사용에 관한 것이죠: 컨트롤의 목적이 사용자에게 더 이상 명확하지 않습니다.

애매모호함을 모두 제거하세요. 이것은 입력 컨트롤입니다. 사용자가 입력할 수 없거나 입력할 수 있는지 (또는 입력해야 할지) 혼란스러워한다면 다른 방법을 사용하세요.

## 문제 #5: 컨트롤이 가득 찬 것처럼 표시됩니다

이것은 부유 레이블이 자리 표시자와 공유하는 또 다른 문제입니다.

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

입력 컨트롤에 텍스트를 넣으면, 해당 컨트롤의 값이 아니라면 혼란을 초래할 수 있습니다. 모든 사용자에게는 아니지만, 어떤 사용자에게는 혼란을 야기할 수 있습니다. 그리고 그것이 부동 라벨을 사용하지 말아야 하는 충분한 이유입니다.

사용자는 눈썹을 휘거나 라벨 애니메이션의 영광에 감탄하기보다는 일을 처리하고 싶어합니다.

라벨은 자신만의 공간을 갖고 있습니다. 거기에 머물게 두세요.

## 문제 #6: 라벨의 크기/색상/위치가 일관성이 없습니다.

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

부트스트랩의 구현을 다시 살펴보세요:

![Bootstrap Implementation](/assets/img/2024-05-01-Maybeitstimetoletthefloatinglabelsdie_4.png)

두 개의 레이블이 표시되지만 서로 다릅니다. 초점을 맞춘 레이블("이메일 주소")은 더 작은 글꼴 크기, 더 밝은 색상 및 비초점 레이블("비밀번호")보다 다른 배치를 갖고 있습니다.

크리스찬 홀스트가 그의 3가지 잘못된 간단함 유형에서 말했듯이:

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

라벨은 영구적인 공간이 있어야 합니다. 사실, 모든 요소들이 그렇습니다.
모든 것을 제 자리에 두세요. 즉, 라벨은 텍스트 상자 바깥에 남겨 두어야 합니다...언제나요.

## 문제 #7: 색 대조

플레이스홀더와 마찬가지로 부유하는 라벨 텍스트는 일반적으로 기본 라벨 텍스트보다 어둘 수 있습니다. 그래서, 해당 값처럼 충분히 어두울 수도 있고, 읽기 어려울 정도로 밝을 수도 있습니다.

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

해결책: 입력 컨트롤 바깥에 그대로 두세요.... 영구적으로.

## 문제 #8: 불필요한 부피

위 문제 중 하나도 존재하지 않더라도, 이것은 본질적으로 아이캔디에 대한 불필요한 코드 부피가 될 것입니다.

전통적인 레이블이 더 나은 결과를 제공하고 더 많은 사용자에게 더 작은 영향을 미칩니다.

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

## 문제 #9: 떠다니는 라벨은 의미가 없어요

자신에게 떠다니는 라벨이 제공하는 가치가 무엇인지 생각해보세요.

지지자들로부터 여러 의견을 읽었는데, 그 중 주요한 3가지로 요약할 수 있습니다:

- 수직 공간을 절약할 수 있어요.
- 페이지가 깔끔해 보여요.
- 예쁘게 보여요.

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

문제를 해결하지 못하고 있습니다.

불필요한 것을 애니메이션화하는 것이 얼마나 유익한가요?

이 공간을 절약하려는 똑똑한 시도였지만, 새로운 문제가 충분히 발생하여 비용이 이득을 상회한다는 것에 대해 모두 동의할 수 없을까요?

아니요? 그럼 다음 섹션을 찾아가 보세요.

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

# 이의사항

당신이 실망시키지 않을 거라고 확신하며, 여기에 포함하지 않은 이의사항들이 있을 거라 기대하고 있어요. 댓글에서 그것들을 읽는 것을 고대하고 있어요.

## 이의사항 #1: "하지만, 공간을 절약해요!"

저는 placeholder에 대해 적은 것을 반복하겠습니다: 만약 라벨이 뜬 텍스트로 인해 절약되는 공간이 중요하다면, 당신의 폼은 너무 커진 것입니다.

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

폼을 간소화하세요. 즉, 필요한 정보만 요청하고 페이지 당 입력 컨트롤 수를 줄이세요.

## 반대 의견 #2: "하지만 구글이 그렇게 하잖아요!"

맞습니다. 앞서 말했듯이, 구글은 2014년에 발표한 Material Design의 첫 번째 버전에서 떠다니는 라벨 패턴을 채택했으며, 현재 이 글을 작성하는 시점에서 사용 중인 세 번째 버전에도 여전히 적용되어 있습니다.

만일 구글이 무언가를 한다면, 그것은 확실히 사용자 경험과 접근성의 최고 표준을 보장하기 위해 철저히 연구되었을 것이라고 생각되죠, 그렇죠?

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

그렇게 많지 않아요.

첫 번째 버전의 텍스트 상자 레이아웃 스크린샷이 있습니다:

![텍스트 상자 레이아웃](/assets/img/2024-05-01-Maybeitstimetoletthefloatinglabelsdie_5.png)

"레이아웃" 제목을 보셨죠? 그것은 `h2` 제목입니다. "라벨" 부제목을 보셨죠? 그것은 `h1`이에요. 얍스!

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

거의 10년 동안 올려져 있었어요.

Adam Silver가 Smashing Magazine에 게재한 기사인 "Material Design Text Fields Are Badly Designed"에서는 이 패턴에 대한 반대를 재창이 하면서도 Google은 부유 레이블을 전통적인 레이블과 비교적 테스트하지 않았다는 것을 공개했습니다.

그래서 Google이 (또는 누군가가) 뭔가를 한다고 해서 그것이 괜찮다고 생각하지 마세요. 그들은 심지어 제목을 제대로 쓰지 못하고 있어요!

만약 그들이 그 이후로 일정 부분을 개선했다고 생각한다면, 최신 Material Design 인터레이션(버전 3)에서 이것을 한번 보세요:

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

![image](/assets/img/2024-05-01-Maybeitstimetoletthefloatinglabelsdie_6.png)

"Resources" 제목과 매우 작은 "이 페이지에서" 텍스트는 모두 `h2` 요소입니다. "텍스트 필드" 텍스트는 제목이 아닙니다.

그래서, Google의 작업이 접근 가능하다고 가정한다면, 바위에서 수영 수업을 받는 것과 다를 바 없을지도 몰라요.

## 이의 제기 #3: "그렇다고 스크린 리더가 읽는다구요!"

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

그럼요, 그렇죠. 스크린 리더는 일반적으로 스타일링에 따라 컨텐츠를 다르게 소비하지 않습니다.

포커스를 받지 않은 컨트롤의 떠다니는 라벨(비록 위치가 올바르지 않더라도)은 여전히 `label` 요소이며, 스크린 리더는 이를 해당 요소로 인식합니다.

하지만 스크린 리더는 보조 기술의 유일한 형태가 아닙니다. 시각 장애인을 돕는 화면 확대기도 있습니다.

모든 시각 장애인이 모든 작업에 이를 필요로 하는 것은 아닙니다. 페이지가 잘 구조화되어 있고 적절한 크기이며 하나의 페이지에 모든 것을 담으려 하지 않는다면, 시각 장애인은 확대기를 필요로하지 않을 수도 있습니다.

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

하지만 레이블의 크기를 줄이면 시각 장애가 있는 사용자들이 확대기를 사용하도록 강요할 수 있어요.

왜 이렇게 하나요? 그냥 옛날 방식의 레이블을 제공해주세요.

## 이의 제기 #4: "하지만 초점이 맞춰진 후 레이블의 글꼴 크기를 조절할 수 있어요!"

네, 가능해요 - 하지만 뜬 레이블의 목적이 뭐에요? 레이블의 크기를 키우면 공간을 절약하는 것이 아니게 되어버려요.

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

그냥 라벨을 올려놓으면 되지 않을까요? 입력 컨트롤 위에 라벨을 두시면 되는 곳입니다. 그리고 거기에 계속 두세요.

## 이의 제기 #5: "하지만 그들은 너무 오랫동안 존재해 왔고 전통적이에요!"

나쁜 패턴이 인기를 얻는 경우가 가끔 있어요. 이것은 HTML 명세에 변화를 가져다줘요.

그것이 바로 구석구석에 플레이스홀더를 두게된 이유 중 하나에요. 사람들은 재치 있게 자신만의 프로토플레이스홀더를 만들려고 해왔죠. 하나의 나쁜 습관이 또 다른 것으로 이어진 것이에요.

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

또한, 쉽게 사라지는 실천 방법들이 많습니다. `marquee` 요소, 레이아웃 테이블 또는 인라인 JavaScript를 기억하나요?

나쁜 관행은 얼마나 퍼져 있든 나쁜 것입니다.

WebAIM의 '밀리언 리포트'에 따르면, 나쁜 웹 접근성 관행은 심각한 문제로 여겨지며, 심지어 더 확립된 웹사이트들 사이에서도 흔히 발견됩니다.

먼저 그것을 해결한 후에, 관례에 대한 토론을 진행해봅시다.

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

당분간 기존 레이블을 계속 사용해주세요.

# 결론

플로팅 레이블 대신 플레이스홀더를 레이블로 사용하는 것이 더 나은 것은 알지만, 아직도 문제점이 있습니다. 이 문제들을 해결하기 위해 버리지 않고 어떻게든 해결할 수 없습니다.

사용자는 눈속임이 아닌 일관성이 필요합니다.

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

당신의 웹사이트를 방문하는 사용자들은 도페미늄 히트를 얻으러 온 것이 아니라, 작업을 완료하러 온 것입니다.

그 길을 라스베이거스 스트립이 아닌 고속도로로 만드세요.

플로팅 레이블이 가지는 문제점을 인지하고, 왜 사용하는지 솔직하게 검토하고, 그 많은 문제를 극복하는지 결정해 보세요.

아마도 플로팅 레이블에게 작별인사를 할 때가 되었을지도 모릅니다.

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

# 링크

## 언급된 것

- How the Float Label Pattern Started by MDS
- Float Labels with CSS by Chris Coyier
- Floating Labels Are Problematic by Adam Silver
- Are Float Labels Really That Problematic After All? by MDS
  (거기서 댓글도 확인해보세요)
- Bootstrap의 떠다니는 라벨 구현
- Google 번역: 웹사이트
- 3가지 유형의 잘못된 간소화 by Christian Holst
- WebAIM의 백만 보고서
- Material Design (v. 1)
- Material Design (v. 3)
- Material Design 텍스트 필드는 Adam Silver가 나쁘게 디자인했습니다.

## 추가로 읽을 거리

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

- 브래드 프로스트의 Float Label Pattern
- 비탈리 프리드만의 Gone Floating Labels And Green Lighthouse Scores
- 수잔나 자레이스키의 Material Design의 텍스트 필드 진화
- 덴니스 렘브리에의 Floated Labels Still Suck

## 나의 언급된/관련된 기사들

- 왜 텍스트 상자에 플레이스홀더를 사용하지 말아야 하는 이유
- 절대 버튼을 비활성화하지 말아야 하는 이유
- 2024년 접근성 향상을 위한 5가지 방법
- 우리는 모두 웹을 부끄러워해야 합니다: WebAIM의 2023 웹 접근성 보고서
- 개발자들, 부끄러움 그만하세요
