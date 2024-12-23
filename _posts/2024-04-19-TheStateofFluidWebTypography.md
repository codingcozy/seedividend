---
title: "유연한 웹 타이포그라피의 현황"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "The State of Fluid Web Typography"
link: "https://medium.com/better-web-type/the-state-of-fluid-web-typography-135cd26e0612"
isUpdated: true
---

![이미지](/assets/img/TheStateofFluidWebTypography_0.png)

뷰포트 단위에 대한 브라우저 지원은 꽤 오랫동안 좋았습니다. 현재로서는, 대부분의 브라우저가 2013년부터 2014년까지 완전히 지원했습니다. 마이크로소프트의 엣지가 예외였습니다 (놀랍지 않게), 엣지 16 버전부터 지원하기 시작했는데, 이는 2017년 10월에 출시되었습니다. 그런데 이미 두 년이 지났습니다. 다른 주요 브라우저들이 5~6년 동안 뷰포트 단위를 지원하는데, 어째서 웹 사이트에서 유동 텍스쳐를 더 자주 만나지 못할까요? 제가 그렇게 많이 하는 브라우저 창 크기를 조정하여 웹사이트가 뷰포트 변경에 어떻게 대응하는지 확인하는 행동을 해봤지만, 마지막에 유동 웹 텍스쳐를 사용하는 웹 사이트를 만난 지 기억이 나질 않습니다. CSS 트릭이 사용 중이라는 건 알지만, 다른 예시를 떠올릴 수가 없네요. 그래서 이것은 저에게 궁금증을 자아낸다는 거죠 — 왜 이 훌륭한 웹 텍스쳐 기능의 보급이 더 널리 이루어지지 않는 걸까요?

이 질문에 대해 답하기가 어렵습니다. 하나의 단순한 원인이 있을 것이라고 생각하지 않기 때문이죠. 제 생각에는 다음과 같은 이유들이 반영됩니다:

- 반응형 웹 디자인/개발은 여전히 어렵고 복잡하다.
- 많은 디자이너/개발자들이 웹 텍스쳐를 아직 중요시하지 않는다.
- 잠재적인 접근성 문제가 있다.
- 유동 웹 텍스쳐가 매우 까다로울 수 있다.

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

요기서 한 번 더 자세히 살펴보죠.

## 좋은 반응형 웹 디자인은 여전히 어렵고 복잡합니다

위에 나열된 문제 중 첫 번째에 많은 에너지와 노력이 들어갑니다. 우리가 가지고 있는 반응형 웹사이트를 만드는 도구들은 그런 웹사이트를 만드는 데 최고의 도구입니다. 요즘에는 좋은 반응형 웹사이트를 만드는 것이 훨씬 쉬워졌지만 그래도 상당한 노력이 필요합니다. 도구를 고르고, 그것들을 테스트하고, 우리가 필요로 하는 것을 제공하는 것 같다면 채택하는 것은 웹 디자인 과정에서 상당히 많은 시간을 차지합니다. 아직 우리가 웹사이트를 디자인하고 그리고 도구들이 자동으로 웹사이트를 대부분의 기기에서 잘 작동할 수 있도록 하는 지점에 도달하지 않았습니다. 예를 들어, 여전히 우리는 (웹사이트의 정적 이미지를 그려내는) 디지털 디자인 도구로 웹사이트를 디자인합니다. 이 도구들은 기본적인 반응형 웹 디자인 기술을 거의 지원하지 않으며, 유동적인 타이포그래피에 대해서는 언급조차 할 수 없습니다.

## 웹 타이포그래피는 중요하게 인식되지 않습니다

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

두 번째로 Better Web Type을 통해 도전하고 싶은 것이 있어요. 이미 타입에 관심 있는 사람들이 많지만, 웹에서 사용되는 타이포그래피의 품질에 신경을 쓰는 건 이 사람들 뿐이라서 좀 슬프다고 생각해요. 안타깝게도, 많은 웹 디자이너와 개발자들은 여전히 웹 타이포그래피를 단순히 폰트를 선택하고 텍스트 크기를 설정하는 것로만 생각하는 것 같아요.

## 유동적인 웹 타이포그래피는 접근성 문제를 낳을 수 있어요

웹사이트를 디자인하고 구축할 때, 접근성에 대해 생각하는 사람들이 너무 적어요. 이 탐구를 하면서 특히 이 부분을 살펴보고 싶어요. 이전에도 유동적인 웹 타이포그래피에 몇 가지 접근성 문제를 발견했지만, 아무도 이에 대해 이야기하지 않아요. 여기저기서 약간씩 언급되는 정도예요.

## 유동적인 웹 타이포그래피는 tricky해요

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

뷰포트 단위를 사용하여 글꼴 크기를 설정하는 것은 조금 어려운 일일 수 있어요. 많은 사람들로부터 메일을 받아왔는데, 그들이 유동적인 타이포그래피를 실험했지만 실제 웹사이트에서 사용하지는 않았다고 말하는 내용이 많아요. 그러나 유동적인 웹 타이포그라피는 어렵게 할 필요가 없어요. 우리는 그저 쉽고 효과적인 방법을 필요로 합니다. 이미 이를 작동시킬 방법을 가진 똑똑한 사람들이 많아요. 몇 가지 접근 방식을 살펴보고, 어떤 것이 가장 잘 작동하는지, 어떤 방법이 유동적인 웹 타이포그래피를 조작하기 쉽고 효과적으로 만드는지 살펴봅시다. 그 과정에서 이 접근 방식을 사용할 때 접근성에 관한 고려 사항도 살펴봅시다.

# 반응형 타이포그래피

자, 그럼 오늘 가장 일반적인 방식부터 시작해봅시다. 유동적인 웹 타이포그라피를 탐험하는 이 여정에서의 시작점은 실제로 반응형 웹 타이포그라피입니다. (반응형 웹 디자인과 함께 채택된) 오늘날 가장 일반적인 방식으로, 모바일 레이아웃과 글꼴 크기로 시작하고, 기본 글꼴 크기를 설정하고, 그를 기반으로 다른 크기를 정의하는 것이 인기가 있어요. 아래와 같이 간단할 수 있어요:

```js
html {
  font-size: 100%; // 보통 16px
}
h1 {
  font-size: 3rem; // 기본 글꼴 크기의 3배 (3 × 16px)
}
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

여기에서는 브라우저의 기본 글꼴 크기에 맞추기 위해 기본 글꼴 크기를 설정했어요 (보통 16픽셀). 웹사이트를 만들 때 접근성을 고려한다면 이 단계는 중요합니다. 그러나 다른 기기와 화면 크기를 생각하고 웹사이트의 레이아웃을 재배치하고 글꼴 크기를 다시 정의해야 해요. 그래서 이러한 레이아웃 전환과 글꼴 크기 변경이 일어나는 지점을 정의하기 위해 미디어 쿼리를 사용해요.

```js
html {
  font-size: 100%;

  @media and (min-width: 768px) {
    font-size: 112.5%;
  }
}
h1 {
  font-size: 3rem;
  @media and (min-width: 768px) {
    font-size: 3.5rem;
  }
}
```

위 예시에서 기본 글꼴 크기를 재정의했고, 일반적인 태블릿 화면에서 볼 것이라고 생각되어 크기를 늘렸어요. 더 큰 화면이라면 작업할 공간도 많아져서 글꼴 크기 변경이 더 명확할 거에요. 그래서 표제 1의 크기도 기본 3rem 대신 3.5rem으로 늘렸어요.

CodePen에서 기본 반응형 타이포그래피 예시를 확인해보세요. 이것은 잘 작동하며 모든 브라우저에서 지원되며 접근성 문제가 없어요. 그렇다면 왜 개선해야 할까요? 많은 사람들이 우리가 정의한 지점에서만 글꼴 크기를 조정한다는 사실에 걱정을 표하죠. 위 예시에서는 웹사이트를 읽는 독자가 16픽셀로 설정된 텍스트 단락을 768픽셀의 화면 폭까지 볼 것이에요. 만약 태블릿에서 웹사이트를 읽고 있다면 18픽셀 (112.5%)의 기본 글꼴 크기를 받게 되겠죠. 이러한 사고방식의 주요 문제는 자신의 시각에 너무 많은 집중을 한다는 것이라고 생각해요. 브라우저 창 크기를 조정하면 다음과 같이 보일 거에요:

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

![image](https://miro.medium.com/v2/resize:fit:1400/0*dapqeXGW4Svj9a-X.gif)

네, 우리가 정의한 브레이크포인트에서만 글꼴 크기가 변경되지만, 사용자들이 기기 설정을 통해 텍스트 크기를 완전히 제어할 수 있다는 것을 잊고 있는 것 같아요. 데스크톱 컴퓨터에서 웹사이트에 접속하는 사용자라면 18픽셀의 기본 글꼴 크기가 충분히 크지 않다면, 쉽게 크기를 조정할 수 있어요 (우리가 CSS에서 픽셀과 같은 상대적이지 않은 단위로 기본 글꼴 크기를 무시하여 사용자로부터 이 제어권을 빼앗지 않았다면요).

## 장점

- 사용자가 글꼴 크기를 제어하므로, 접근성 문제가 발생하지 않습니다.
- 좋은 접근 방식으로 몇 가지 미디어 쿼리만으로 다양한 화면 너비를 대다수 커버할 수 있습니다.

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

## 단점

- 폰트 크기는 주로 정적이며 변경 사항은 사전 정의된 브레이크포인트(화면 너비)에 기반합니다.
- 큰 화면에서 공간이 많고, 폰트 크기가 적응적이 아니므로, 가운데 정렬된 단일 열 레이아웃을 사용하는 웹사이트가 생성됩니다.

# 완전히 유동적인 타이포그래피

그래서 우리는 반응형 타이포그래피 접근 방식이 이상적이지 않다는 결론을 내릴 수 있습니다. 어떤 부분은 작동하지만 더 나은 것을 원합니다. 더 많은 통제를 갖고 싶습니다. 우리는 폰트 크기가 모든 화면 크기에서 이상적이 되기를 원합니다. 모바일 화면, 태블릿 화면, 데스크톱 화면뿐만 아니라 모든 화면 크기에서 유동적인 타이포그래피가 구출해줍니다! 그래, 봅시다 어떨지요.

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

조회수 단위는 어느 정도 전에 소개되었습니다. 이 아이디어는 간단합니다. 뷰포트 높이와 뷰포트 너비 단위를 사용하여 CSS에서의 모든 것의 크기를 정의할 수 있습니다. 글꼴 크기를 포함합니다. 내 의견으로는, 조회수 단위는 주로 웹사이트 레이아웃의 특정하고 대부분 고정된 유형을 확장하는 방법으로 소개되었으며, Sebastian Eberlein이 Hacker Noon 기사에서 설명한 것과 유사합니다.

그럼에도 불구하고, 조회수 단위는 글꼴 크기를 유동적으로 조절하는 방법으로 오랫동안 사용되어 왔습니다. Chris Coyier은 2012년에 이에 대해 글을 썼으며, 텍스트 줄의 이상적인 너비가 약 80자라는 것을 알고 있기 때문에 "이러한 단위를 사용하면 완벽하게 느껴지게 만들고 그 경험을 모든 크기의 화면으로 확장할 수 있습니다"라고 흥분했습니다.

이 모든 것은 멋지지만 실제로는 그렇게 간단하지 않습니다. 다음과 같이 무언가를 한다고 가정해 봅시다:

```js
html {
  font-size: 1.3vw;
}
h1 {
  font-size: 3vw;
}
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

기본 글꼴 크기를 뷰포트 너비 단위로 정의합니다. 이는 반응형 타이포그래피에서 사전 정의된 브레이크포인트만이 아니라 화면 너비 변경마다 글꼴 크기가 조절됨을 의미합니다. 그러나 화면 너비의 변화가 매우 급격하기 때문에(휴대폰 화면 크기와 노트북 또는 데스크톱 컴퓨터 크기를 비교할 때), 글꼴 크기가 매우 빠르게 변경됩니다. CodePen의 유연한 타이포그래피 예제를 살펴보고 브라우저 창 크기를 조절해보세요. 다음과 같은 것을 볼 수 있을 겁니다:

![](https://miro.medium.com/v2/resize:fit:1400/0*oAmKMV_2fRBVPyNe.gif)

작은(이론상 모바일) 화면 크기에서 글꼴 크기가 얼마나 작아지는지 보이시나요? 너무 작죠, 어떻게 수정할 수 있을까요?

## 장점

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

- 실제로 이 방법을 사용할 때 반응형 타이포그래피를 결합하지 않는 한 장점을 보지 못합니다.

## 단점

- 뷰포트 단위를 사용하여 폰트 크기를 정의하는 것의 단점 중 하나는 접근성이 떨어진다는 것입니다 (특정 브라우저에서 사용자가 폰트 크기를 제어할 수 없음).
- 폰트 크기를 정의하는 데 뷰포트 단위를 사용하는 것은 사용자의 기본 폰트 크기 (브라우저에서 설정)를 덮어쓰는데, 이는 또 다른 접근성 문제입니다.
- 제어할 수 없는 폰트크기는 극단적으로 빠르게 크기가 조절됩니다.

# 많은 미디어 쿼리 추가하여 작동시키기

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

풀리 플루이드 웹 타이포그래피 방식이 명확하게 작동하지 않습니다. 재밌게도, 이 방식을 어느 정도 작동시키기 위한 유일한 방법은 반응형 타이포그래피 기술을 사용하여 급격하게 변하는 글꼴 크기를 제어하는 것입니다. 그러나, 저희의 반응형 웹 타이포그래피 방식과는 달리 이 경우에는 많은 미디어 쿼리가 필요합니다. 글꼴 크기의 조정을 제한하기 위해 많은 미디어 쿼리를 사용해야 합니다.

아래와 같이 작업할 수 있습니다:

```js
$breakpoint-1: 25em;
$breakpoint-2: 35em;
...
html {
  font-size: 1.3vw;
}
h1 {
  font-size: 3vw;
}
@media and (min-width: $breakpoint-1) {
  html {
    font-size: 2vw;
  }
  h1 {
    font-size: 6vw;
  }
}
@media and (min-width: $breakpoint-2) {
  ...
}
```

CodePen에서 이런 식으로 플루이드 및 반응형 웹 타이포그래피 예제를 확인해보세요. 브라우저 창 크기를 조정해보면 앞서 소개한 완전히 유동적인 방식보다 나은 것을 확인할 수 있습니다. 이를 어느 정도 작동한다고 말할 수 있겠죠 (이를 가능케 하기 위해 일곱 개의 브레이크포인트를 사용했습니다).

<img src="https://miro.medium.com/v2/resize:fit:1400/0*3iFxVOk07_6ZYfgU.gif" />

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

나는 너처럼 모르겠지만, 나에게는 이게 무엇을 얻어야 할지에 비해 너무 많은 일과 고민처럼 보입니다. 네, 우리의 글꼴 크기는 반응형 웹 타이포그래피 접근 방식보다 더 나은 방식으로 조절됩니다. 하지만 다른 문제들도 가져오기도 합니다. 내게는 거절할 수 없는 접근성 문제를 포함한 것입니다.

## 장점

- 글꼴 크기가 멋지게 조절되어 각 화면 너비에 적응합니다.

## 단점

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

- 뷰포트 단위를 사용하여 글꼴 크기를 정의하는 것의 단점 중 하나는 일부 브라우저에서 사용자가 글꼴 크기를 제어할 수 없다는 것입니다.
- 미디어 쿼리를 사용하여 글꼴 크기의 스케일링을 제어하기 때문에 브라우저 창 크기를 조절할 때 크기가 급격하게 변하는 현상이 여전히 발생합니다.
- 글꼴 크기에 뷰포트 단위를 사용하면 사용자의 기본 글꼴 크기(브라우저에서 설정한 값)를 덮어쓰는 또 다른 접근성 문제가 발생합니다.

# CSS 락을 활용한 유동적인 타이포그라피

유동적인 웹 타이포그라피 접근 방식에서 글꼴 크기를 제어할 수 없다는 문제에 대해 일부 사용자들이 인식했습니다. 많은 미디어 쿼리를 추가하는 것은 바람직하거나 이상적이지 않다는 것을 인지한 이들은 대안을 찾기 시작했습니다. Mike Riethmuller, Tim Brown, Geoff Graham 등은 결국 CSS 락과 함께한 유동적인 타이포그라피가 아마도 최선의 방법일 것으로 결론을 내렸습니다.

이는 흥미로운 기술입니다. 최소 글꼴 크기를 설정하고 어느 화면 너비에서 사용해야 하는지, 최대 글꼴 크기를 설정하고 어느 화면 너비에서 사용해야 하는지, 두 값 사이의 모든 유동적인 글꼴 크기를 설정합니다. 이는 글꼴 크기가 너무 빠르게 스케일되는 문제를 우아하게 해결하며 이를 위해 기본 수학을 활용합니다. 이 접근 방식은 아래 이미지로 가장 잘 설명됩니다. 글꼴 크기는 왼쪽과 오른쪽 구획에서 변경되지 않고 가운데 부분에서만 스케일됩니다. 하단 게이트는 최소 화면 크기이며, 여기에는 고정 글꼴 크기를 적용하고, 상단 게이트는 최대 화면 크기이며 동일한 글꼴 크기를 적용합니다.

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

<img src="/assets/img/TheStateofFluidWebTypography_4.png" />

여기서 작업하는 방법은 상당히 간단합니다. 4개의 변수가 필요합니다: 최솟값, 최댓값, 최소 뷰포트 너비 및 최대 뷰포트 너비.

```js
body {
  font-size: calc([최솟값] + ([최댓값] - [최솟값]) * ((100vw - [최소 뷰포트 너비]) / ([최대 뷰포트 너비] - [최소 뷰포트 너비])));
}
```

또한 CodePen에서 CSS 락을 사용한 유동 텍스트의 라이브 예제를 확인하고 브라우저 창 크기를 조절하면 다음과 같은 결과를 볼 수 있습니다.

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

![이미지](https://miro.medium.com/v2/resize:fit:1400/0*o5nXAQJhpphQ0uPH.gif)

이 부분은 정말 만족스럽게 잘 작동합니다. 화면 너비가 최소값과 최대값 사이에 있는 경우에는 글꼴 크기가 멋지게 조정됩니다. 그러나 화면 너비가 최소값보다 작거나 최대값보다 큰 경우에는 고정된 글꼴 크기로 전환됩니다. 이론적으로 이 방법은 아주 잘 작동합니다. 그러나 Chrome에서 브라우저의 기본 글꼴 크기를 변경해보니 위의 CodePen 예제에는 영향을 미치지 않았습니다. 이것은 사용자의 기본 글꼴 크기를 무시하고 접근성 문제를 일으키기 때문에 문제입니다. 일부 브라우저는 사용자가 웹사이트의 글꼴 크기를 조절하려고 시도할 때 글꼴 크기를 조정하지 않는 경우도 있습니다(맥에서 ⌘+).

## 장점

- 브라우저 창 크기를 조정할 때 글꼴 크기가 급격히 변경되지 않습니다.
- 글꼴 크기가 최소값 및 최대값 화면 너비 아래로 조절되지 않습니다.

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

## 단점

- Viewport 단위를 사용하여 글꼴 크기를 정의하는 것의 단점 중 하나는 접근성이 떨어진다는 것입니다(특정 브라우저에서 사용자가 글꼴 크기를 제어할 수 없음).
- 글꼴 크기에 viewport 단위를 사용하면 사용자의 기본 글꼴 크기(브라우저에서 설정한)를 무시하는 또 다른 접근성 문제가 있습니다.

# 결론 - 유동적인 글꼴 크기를 사용해야 할까요?

처음 보았을 때 CSS 락 방식이 가장 좋아 보입니다. 글꼴 크기가 자유롭게 조절되는 문제를 분명히 해결합니다. 미디어 쿼리를 소수만 사용하며 글꼴 크기의 큰 변화가 없습니다. 모든 유동 웹 글꼴 기술에 대해 제 기본 글꼴 크기 설정을 모두 무시한다는 문제가 있습니다(내 테스트에서는 Chrome에서만 해당되었습니다). 어떤 경우에는 어떤 브라우저에서는 viewport 단위를 사용하므로 사용자가 글꼴 크기를 조절할 수 없을 수 있습니다. 이는 이러한 해결책 중 어느 것도 접근성 측면에서 완전히 준수되는 것은 아니라는 것을 의미합니다.

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

'전적으로 유동적 타이포그래피 접근 방식에 대해 설명할 때 말했었어요. "우리는 글꼴 크기가 작은 모바일 화면뿐만 아니라 태블릿 화면, 데스크톱 화면에서도 이상적이기를 원해요…". 저는 이 방식이 완전히 잘못되었다고 생각해요. 우리는 글꼴 크기를 모든 화면 크기에 맞게 조절하는 데 초점을 두면 안 돼요. 우리는 사용자들 모두에게 텍스트를 쉽게 읽을 수 있고 즐길 수 있게 만들어야 해요. 이렇게 하면 웹 타이포그래피에 대한 일부 제어를 사용자들에게 맡겨야 해요. 현재 유동적인 웹 타이포그래피는 이를 너무 많이 방해한다고 생각해요. 기본 브라우저 글꼴 크기와 잘 호환된다면 괜찮다고 할 텐데, 그렇지 않기 때문에 우리가 사용해야 하는 접근 방식은 아니라고 말씀드려야 해요. 적어도 현재로서는 그렇죠. 책에서 유동적인 타이포그래피를 탐구한 바 있는대로, 저는 여전히 반응형 웹 타이포그래피를 사용하고 있어요.

![TheStateofFluidWebTypography_6.png](/assets/img/TheStateofFluidWebTypography_6.png)

방금 읽으신 내용이 마음에 드셨나요? 멋지군요, 웹 타이포그래피에 관한 제 책에는 더 많은 내용이 담겨 있어요. 웹 디자이너와 개발자들 사이에서 매우 인기가 많아요, 꼭 한 번 확인해보세요.'
