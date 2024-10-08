---
title: "개발자가 알아둬야할 SVG와 캔버스 비교 정리"
description: ""
coverImage: "/assets/img/2024-05-02-SVGVsCanvasAComparison_0.png"
date: 2024-05-02 00:10
ogImage:
  url: /assets/img/2024-05-02-SVGVsCanvasAComparison_0.png
tag: Tech
originalTitle: "SVG Vs. Canvas: A Comparison"
link: "https://medium.com/stackanatomy/svg-vs-canvas-a-comparison-1b58e6c84326"
isUpdated: true
---

![SVG vs Canvas](/assets/img/2024-05-02-SVGVsCanvasAComparison_0.png)

웹 그래픽 및 이미지를 표시하는 데 가장 널리 사용되는 두 가지 기술은 SVG와 Canvas입니다. 이 둘 모두 매력적인 웹 경험을 만들기 위한 웹 표준입니다. SVG는 해상도에 독립적이며 모양, 선 및 텍스트로 구성되어 있어 화질을 잃지 않고 확대 또는 축소할 수 있습니다. SVG 그래픽 및 이미지는 상호작용, 데이터 주도형 및 맞춤형 애플리케이션에 이상적입니다. 반면에 비트맵은 해상도 의존적인 래스터 그래픽 API인 Canvas에 이미지 데이터를 저장하는 데 사용됩니다. 웹 페이지에 모양과 이미지를 그리는 것은 흔한 실천법이며, 상호작용 게임, 애니메이션 및 시각화를 만들기 쉽습니다.

# SVG와 Canvas란 무엇인가요?

대부분의 최신 브라우저는 XML 기반의 벡터 그래픽 형식인 SVG를 지원합니다. 픽셀화 없이 크기를 조절할 수 있는 간단한 그래픽 및 다이어그램을 만드는 데 효과적입니다. 또한 JavaScript를 사용하여 SVG를 통해 상호작용 그래픽을 생성할 수 있습니다. SVG는 XML 표준에 의존하는 2차원 벡터 이미지 형식입니다. 웹 디자인 및 개발에서 로고, 다이어그램 및 아이콘과 같은 벡터 그래픽을 만들거나 관리하기 위해 자주 사용됩니다. 기존의 JPEG, PNG 및 GIF와 같은 래스터 이미지와는 달리 SVG 이미지는 화질을 희생하지 않고 비율을 변경할 수 있어 웹사이트와 다양한 해상도를 가진 기기에서 이미지를 표시하는 데 더 나은 선택입니다. 또한 SVG 이미지는 압축되어 있어 래스터 이미지보다 빠르게 로드됩니다.

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

Canvas는 웹을 위한 동적 대화형 그래픽을 만들 수 있게 해주는 HTML5 기능입니다. 래스터 기반인 Canvas는 더 복잡한 시각화와 애니메이션을 생성하기에 적합하기 때문에 데이터 시각화와 같은 작업에 가장 적합합니다. 그러나 SVG와는 달리 Canvas는 픽셀 기반 형식이기 때문에 이미지를 Canvas에 너무 많이 확대하면 픽셀화될 수 있습니다. Canvas는 해상도에 따라 동적으로 그래픽, 게임 그래픽 및 다른 시각적 요소를 표시하는 비트맵 캔버스를 제공합니다. JavaScript를 사용하여 웹사이트에 직접 그래픽을 그릴 수 있습니다. Canvas 요소는 단지 그래픽을 보관하는 공간에 불과합니다.

SVG와 Canvas의 주요 차이점은 SVG가 벡터 기반 이미지 형식을 사용한다는 점이며, Canvas는 래스터 기반 이미지 형식을 사용한다는 것입니다. SVG 이미지를 구성하는 선, 곡선 및 모양인 Path는 수학적 방정식을 사용하여 생성됩니다. 이로 인해 이러한 요소들은 쉽게 조작하고 무한히 확대할 수 있습니다. 반면에 Canvas 이미지는 픽셀로 구성되어 있으며, 이미지를 만들기 위해 서로 옆에 배열된 작은 색깔의 정사각형입니다. Canvas 이미지는 해상도에 따라 의존하기 때문에 확대되면 픽셀화되어 흐릿해집니다.

# SVG와 Canvas 사용의 제약사항

SVG 및 Canvas는 모두 대화형 그래픽을 생성하는 강력한 도구지만, 사용할 때 고려해야 할 몇 가지 제한 사항이 있습니다.

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

SVG는 복잡한 모양과 상호 작용을 생성하는 기능이 제한적이며 이미지를 구성하는 개별 요소를 변형하고 조작하기 위해 DOM 기반 시스템에 의존하기 때문에 한계가 있습니다. 또한 대량의 데이터를 효율적으로 처리할 수 없기 때문에 SVG는 매우 다이내믹한 애니메이션을 만드는 데 적합하지 않습니다.

한편 Canvas는 이미지를 더 직접적으로 렌더링하고 복잡한 모양에 더 적합합니다. 또한 SVG보다 빠르며 빠른 애니메이션에 적합합니다. 다만 Canvas는 SVG보다 DOM 기반 구조가 없어 그래픽을 조작하는 데 효과적이지 않습니다. 또한 Canvas가 제공하는 제한된 접근성 지원으로 모든 사용자에게 콘텐츠에 액세스를 보장하기가 더 어렵습니다.

# 비교: SVG 대 Canvas

이 섹션에서는 SVG와 Canvas를 자세히 비교해보겠습니다. 이 섹션에서 많은 것을 배울 수 있습니다. 확장성, 크기 및 로드 시간, 상호 작용, 성능, 접근성, 학습 곡선 및 인기를 기준으로 비교할 것입니다.

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

# 확장성

가장 인기 있는 두 벡터 그래픽 표준은 SVG와 Canvas입니다. 두 표준 모두 벡터 그래픽을 만드는 데 사용되지만 같지는 않습니다. 이 글에서는 SVG와 Canvas의 확장성을 비교할 것입니다.

**SVG**  
SVG의 확장성은 일반적으로 벡터 그래픽을 만들기에는 Canvas보다 우수하다고 여겨집니다. SVG는 해상도에 독립적인 벡터 그래픽 형식이기 때문에 품질을 잃지 않고 확대 또는 축소할 수 있습니다. 추가로 상호 작용과 애니메이션을 지원할 수 있습니다.

**Canvas**  
반면에 Canvas는 해상도에 독립적인 래스터 그래픽 형식입니다. 이는 SVG만큼 쉽게 조절할 수 없기 때문에 그래픽이 확대되면 품질이 저하됩니다. Canvas에는 필터와 마스크와 같은 효과를 지원하는 기능이 내장되어 있지 않습니다.

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

# 크기와 로드 시간

SVG와 Canvas를 그래픽 표현에 사용할 때 고려해야 할 다양한 요소가 있습니다. 크기, 로드 시간 및 호환성 등이 그 중 하나입니다.

SVG SVG 파일의 크기가 작기 때문에, 많은 그래픽 콘텐츠가 있는 웹 페이지에 이상적입니다. 또한 텍스트 기반이며 브라우저에서 처리되기 때문에 빨리 로드됩니다. SVG는 모든 최신 브라우저와 호환되지만, 구식 버전과의 하위 호환성을 보장하려면 추가 작업이 필요할 수 있습니다.

Canvas Canvas 요소는 일반적으로 SVG 파일보다 상당히 큽니다. 결과적으로 로드하는 데 시간이 더 걸리고 웹 페이지 성능이 저하될 수 있습니다. 그러나 크기가 불리하더라도 Canvas는 애니메이션 및 상호 작용을 지원하기 때문에 그래픽 표현에 대한 인기가 여전합니다. Canvas도 모든 최신 브라우저와 호환되며, 하위 호환성에 대한 추가 작업이 필요하지 않습니다.

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

클라이맥스에서는 크기와 로드 시간 측면에서 SVG가 더 나은 선택입니다. 더 작은 파일 크기와 빠른 로딩 시간 때문에, 그래픽 콘텐츠가 많은 웹 페이지에는 더 나은 선택입니다. 반면에 캔버스는 애니메이션 및 상호작용과 같은 보다 고급 기능이 필요할 때 더 나은 선택일 수 있습니다.

# 상호작용

SVG와 캔버스를 비교하는 것은 이 두 가지 강력한 기술 사이의 차이를 이해하는 핵심 단계입니다. SVG와 캔버스 모두 이차원 그래픽을 만드는 데 사용되지만, 상호작용 측면에서는 큰 차이가 있습니다.

SVG는 선언적 언어의 한 예로, 요소와 해당 동작을 코드 내에서 직접 정의할 수 있습니다. 이를 통해 개발자들은 벡터 그래픽에 상호작용 요소를 손쉽게 통합할 수 있습니다. 예를 들어, 개발자들은 SVG 요소에 여러 이벤트를 바인딩할 수 있으며, 마우스 클릭, 키 입력 및 기타 사용자 상호작용과 같은 것들입니다. 게다가 SVG는 다양한 애니메이션 효과를 지원하며, 이를 활용하여 동적이고 매력적인 사용자 경험을 만들 수 있습니다.

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

캔버스는 절차 지향 언어로, 개발자로부터 원하는 동작을 수행하도록 지시를 필요로 합니다. 이로 인해 상호 작용적인 작업에 대해 사용하기가 어려워지며, 개발자들은 각 요소에 대한 해당 동작을 수동으로 코딩해야 합니다. 그러나 캔버스는 SVG보다 몇 가지 장점을 가지고 있습니다. 비트맵 이미지를 그리고 3D 효과를 생성할 수 있는 기능이 있습니다.

# 성능

SVG와 캔버스의 성능을 대조할 때 고려해야 할 다양한 요소가 있습니다. 확장 가능한 벡터 그래픽인 SVG는 XML을 기반으로 하는 벡터 이미지 형식입니다. 이는 오픈 표준이므로 누구나 SVG 파일을 생성하고 활용할 수 있습니다. JavaScript API를 사용하여 상호 작용 이미지, 애니메이션 및 게임을 만들 수 있습니다. 이는 HTML5 요소 중 하나인 캔버스를 이용하여 가능합니다.

일반적으로 모양과 간단한 그림에 대한 성능 면에서 SVG가 캔버스보다 우월합니다. SVG 파일은 해상도에 독립적이므로 품질을 희생하지 않고 크기를 조정할 수 있습니다. 게다가 SVG 이미지는 브라우저의 메모리에 캐시될 수 있어 로딩 시간을 단축시킬 수 있습니다.

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

캔버스는 보통 복잡한 그림과 애니메이션에 대해 더 나은 성능을 발휘합니다. 캔버스를 사용하면 이미지를 빠르게 그리고 품질 손실 없이 그릴 수 있습니다. 게다가 JavaScript API는 캔버스 조작을 최적화하여 더 빠른 애니메이션을 가능하게 합니다. 마지막으로, 어떤 사용 사례에 따라 다릅니다. 형태와 간단한 그림을 다룬다면 SVG를 선택하는 것이 좋습니다. 캔버스는 보다 복잡한 그림과 애니메이션에 대한 더 나은 선택일 수 있습니다.

# 접근성

접근성 측면에서 SVG와 캔버스는 둘 다 유효한 옵션입니다. 이 섹션에서는 SVG와 캔버스의 접근성에 대해 이야기하겠습니다.

SVG는 벡터 기반 기술로, 해상도에 독립적입니다. 이것은 이미지가 다양한 화면 크기로 자동 조정되므로 반응형 웹사이트에 이상적입니다. SVG 이미지는 텍스트 기반이므로 기본적으로 접근할 수 있으며, 화면 판독기로 읽힐 수 있습니다. 개발자는 또한 SVG 코드의 요소에 속성을 추가하여 더 많은 접근성을 확보할 수 있습니다.

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

캔버스는 해상도에 따라 달라지는 래스터 기반 기술입니다. 그 결과, 캔버스 이미지는 고해상도 장치에서 더 잘 보입니다. 캔버스 이미지는 기본적으로 접근할 수 없지만 개발자가 ARIA 속성을 사용하여 접근 가능하게 만들 수 있습니다. 이러한 속성은 페이지의 모든 상호작용 요소에 적용되어야 합니다.

요약하면, SVG와 캔버스는 모두 적절한 코딩으로 접근 가능하게 만들 수 있는 웹 그래픽 옵션입니다. 적합한 기술은 사용하려는 그래픽의 유형과 장치에 따라 결정됩니다.

# 학습 곡선

캔버스와 SVG(확장 가능한 벡터 그래픽) 학습 곡선은 사용자가 프로그래밍 원칙에 얼마나 익숙한지에 따라 크게 달라질 수 있습니다. 캔버스는 JavaScript에 의존하고 다양한 함수와 구문을 이해해야 하기 때문에 SVG보다 복잡하다고 여겨집니다. 사용자는 캔버스에 그림을 그리기 위해 스타일링, 속성 및 그리기 함수와 같은 개념을 이해해야 합니다.

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

SVG는 반면에 Canvas보다 덜 복잡하다고 여겨지지만, 마크업 구조와 구문에 대한 이해가 필요합니다. 예를 들어, SVG 모양을 만들려면 path, line 및 rest와 같은 속성 및 요소에 대한 지식이 필요합니다. 두 기술 간의 또 다른 중요한 차이점은 SVG가 웹 표준에 대해 더 많은 지원을 제공한다는 것이며, Canvas는 접근성 기능에 대한 제한적인 지원을 가지고 있습니다.

요약하면, Canvas와 SVG의 학습 곡선은 사용자의 프로그래밍 지식과 마크업 구조에 따라 결정됩니다. Canvas와 SVG 작업은 더 많은 경험을 가진 사람들에게는 간단할 수 있습니다. 그러나 프로그래밍 경험이 없는 사람들에게는 두 기술의 기초를 배우는 것이 더 많은 노력을 필요로 할 수 있습니다.

# 인기

Canvas와 SVG는 상호작용적인 웹 콘텐츠를 만드는 도구로서 점점 더 인기를 얻고 있습니다. Canvas와 SVG는 모두 공개 표준 웹 그래픽 기술입니다. 두 기술 모두 장단점이 있으므로 어떤 것을 사용할지 결정하기 전에 두 기술 간의 차이를 이해하는 것이 중요합니다.

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

대부분의 현대 브라우저에서 캔버스를 지원하며 사용하기 쉽습니다. 캔버스의 주요 장점은 그래픽과 애니메이션을 빠르고 쉽게 생성할 수 있다는 것입니다. 그러나 캔버스는 SVG만큼 유연하지 않고 제한된 애니메이션만 지원합니다.

SVG는 캔버스보다 강력하고 유연하여 세밀하고 복잡한 그래픽을 만들 수 있습니다. SVG는 애니메이션과 상호 작용 요소도 지원하여 복잡하고 인터랙티브한 웹 디자인을 위한 뛰어난 선택지입니다. 또한 SVG는 캔버스보다 접근성이 더 높습니다. 왜냐하면 스크린 리더가 읽을 수 있기 때문입니다.

# SVG와 캔버스의 응용 사례

SVG와 캔버스는 각각 벡터 및 래스터 그래픽을 렌더링하는 HTML5 API입니다. SVG는 벡터 기반 그래픽을 만드는 데 사용되며 캔버스는 벡터 및 래스터 그래픽을 렌더링할 수 있습니다. 캔버스는 SVG보다 그래픽을 빠르게 렌더링하고 제한적인 제어만 가능합니다. SVG의 한 가지 응용 사례는 웹 사이트에서 사용할 대화식 지도 시스템을 만드는 것일 수 있습니다. 벡터 형식이기 때문에 사용자는 지도를 확대 및 축소할 때 픽셀화나 왜곡 없이 볼 수 있습니다. 또한 SVG는 부드러운 애니메이션을 지원하여 지도 상의 움직임을 효과적으로 표현할 수 있습니다.

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

캔버스는 많은 제어력과 유연성을 제공하기 때문에 게임을 렌더링하는 데 사용할 수 있어요. 예를 들어, 캔버스는 게임의 환경, 캐릭터, 그리고 애니메이션을 렌더링하는 데 사용될 수 있어요. 또한 물리 시뮬레이션과 인공지능 계산에도 사용될 수 있어요.

SVG와 캔버스는 웹사이트에 데이터 시각화를 만드는 데도 사용될 수 있어요. SVG는 자세한 차트를 만드는 데 더 좋고, 캔버스는 빠르게 차트를 만들고 더 적은 제어로 만드는 데 더 좋아요.

# SVG와 캔버스를 사용할 때의 권장 사항

SVG와 캔버스는 인터넷 상에서 그래픽을 만들고 그리는 데 사용되는 두 가지 웹 기술이에요. 캔버스는 일반적으로 그래픽, 애니메이션, 게임을 만드는 데 사용되고, SVG는 보다 확장 가능한 벡터 그래픽을 만드는 데 주로 사용돼요. SVG와 캔버스 중 어느 것을 선택할 지 결정할 때 그래픽의 복잡성을 고려하는 것이 중요해요. SVG는 모양과 로고와 같은 간단한 그래픽을 만드는 데 가장 효율적이에요. 또한 다수의 해상도로 확장 가능성을 유지하면서 성능을 향상시킬 수 있는 최상의 선택이에요. 반면에 캔버스는 동적이고 상호작용하는 그래픽에 가장 적합해요. 이는 애니메이션을 만들거나 비디오를 보여주거나 상호작용하는 게임을 개발하는 데 포함돼요. 캔버스는 또한 복잡한 그래픽이나 다수의 객체를 다룰 때 더 효율적이에요. SVG는 간단한 그래픽에 더 적합하고, 캔버스는 복잡하고 동적이며 상호작용적인 그래픽에 더 적합해요.

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

# SVG와 캔버스의 주요 차이점 요약

웹사이트용 그래픽을 만들 때, SVG(Scalable Vector Graphics)와 캔버스(Canvas) 두 가지 인기있는 기술이 있습니다. 이 두 기술 간의 주요 차이점은 SVG가 기하학적 모양을 사용하여 그래픽을 렌더링하는 반면 캔버스는 픽셀을 사용한다는 것입니다. 이는 SVG 그래픽이 해상도에 독립적이어서 품질을 잃지 않고 크기를 조정할 수 있지만, 캔버스 그래픽은 크기를 조정할 때 흐릿하고 왜곡되는 문제가 발생한다는 것을 의미합니다.

또한, SVG는 공식 마크업 언어로 구성되어 복잡한 그래픽을 만드는 것이 더 쉽지만, 캔버스는 더 복잡한 이미지를 그리기 위해 JavaScript 지식이 필요합니다. SVG는 정적 이미지와 애니메이션에 더 적합하며, 캔버스는 게임이나 실시간 응용프로그램과 같은 동적 그래픽을 만드는 데 더 적합합니다. 결론적으로, SVG와 캔버스는 웹사이트에서 그래픽을 만드는 데 사용되는 두 가지 다른 기술이며, SVG는 해상도에 독립적이고 공식 마크업 언어로 구성되어 있으며, 캔버스는 픽셀로 구성되어 JavaScript 지식이 필요합니다. 각 도구에는 장단점이 있으므로 프로젝트의 특정 목표에 따라 선택이 결정될 것입니다.

# SVG에는 어떤 모양이 있나요?

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

SVG를 통해 다양한 모양을 만들 수 있습니다. 모양을 만드는 방법은 전적으로 여러분에 달려 있어요. SVG는 다음과 같은 모양을 생성하는 데 사용할 수 있습니다:

- 사각형
- 다각형
- 텍스트
- 원
- 다각선
- 타원
- 선
- 경로

모양의 점 속성을 사용하면 여전히 다른 종류의 모양을 만들 수 있어요. 이 점 속성은 다각형과 함께 사용될 때 완벽하게 작동합니다.

# SVG에 사용할 수 있는 스타일링은 무엇이 있을까요?

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

이 섹션에서는 도형을 만들 때 SVG를 사용할 때 사용할 수있는 스타일 옵션에 대해 다룰 예정입니다. SVG를 사용하려면 이러한 스타일을 사용해야합니다. SVG는 다음과 같은 여러 방법으로 스타일을 적용할 수 있습니다:

- 스타일 속성

  스타일 속성을 사용하여 SVG 요소에 CSS 스타일을 적용할 수 있습니다. 예를 들어 CSS 속성을 사용하여 채우기 색상, 테두리 색상, 테두리 너비, 불투명도 등을 변경할 수 있습니다.

아래는 코드에서 스타일 속성을 사용하는 방법을 보여주는 그림입니다:

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

<svg>
  <polygon style="fill: cornflowerblue; stroke: red; stroke-width: 5" />
</svg>

위 코드에서 스타일 속성 값에 포함된 것들이 다같이 다각형 모양에 적용될 스타일 입니다. 위 SVG 코드에서 사용된 스타일 설명은 아래에서 확인할 수 있습니다.

- fill 속성은 모양의 배경색에만 영향을 미칩니다.
- SVG에서 만들어질 윤곽선의 색은 stroke 속성을 사용하여 설정됩니다.
- 윤곽선 너비를 설정하려면 스타일에 stroke-width 속성을 추가하면 됩니다.

# CSS 클래스

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

CSS 클래스를 활용하면 특정 스타일링이 적용된 클래스를 생성하고 해당 클래스를 CSS의 class 속성을 사용하여 SVG 요소에 적용할 수 있습니다.

## Inline CSS

style 속성을 사용하여 속성에 직접 스타일을 지정함으로써 인라인 CSS를 사용하여 SVG 요소에 스타일을 적용할 수도 있습니다.

## 프리젠테이션 속성

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

SVG에서 프레젠테이션 속성을 사용하면 요소에 스타일을 직접 적용할 수 있어요. 예를 들어 `rect` 요소는 "fill" 속성을 설정하여 채우기 색상을 지정할 수 있어요.

# 외부 스타일시트

`link` 요소를 사용하여 외부 CSS 스타일시트에서 스타일을 정의하고 SVG에 연결할 수 있어요.

SVG는 자주 사용되는 채우기, 외곽선, 선 두께, 불투명도, 변환 등과 같은 스타일링 요소를 사용해요. SVG는 그라데이션, 필터, 마스크와 같이 고급 기능을 사용하여 스타일을 적용할 수도 있어요.

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

# SVG로 모양 만드는 방법

HTML에서 SVG를 생성하는 과정은 몇 줄의 코드만 필요한 간단한 과정입니다. `svg` 요소를 만들고, SVG 그림의 크기를 지정한 다음 `svg` 요소 내에 모양, 텍스트 및 다른 요소를 추가하면 됩니다.

## 정사각형과 직사각형

먼저 `svg` 요소를 만들고, 그림 캔버스의 크기를 지정합니다. 이는 `svg` 요소에 너비와 높이 속성을 추가하여 수행됩니다. 속성 '너비'와 '높이'는 픽셀 단위로 지정됩니다.

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
<svg width="200" height="200"></svg>
```

그런 다음 `svg` 요소 내에 모양, 텍스트 및 기타 요소를 추가하세요. 이는 알맞은 모양 및 텍스트 요소를 `svg` 요소 내부에 포함시켜 수행됩니다. 예를 들어 사각형 또는 정사각형을 만들려면 `rect` 요소를 사용하세요:

```js
<svg width="200" height="200">
  <rect x="10" y="10" width="50" height="50" />
</svg>

<svg width="400" height="110">
  <rect
    width="300"
    height="100"
    style="fill: rgb(0, 0, 255); stroke-width: 3; stroke: rgb(0, 0, 0)"
  />
</svg>
```

출력:

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

<img src="/assets/img/2024-05-02-SVGVsCanvasAComparison_1.png" />

이 섹션에서는 SVG를 사용하여 다양한 모양을 만들 것입니다. 이 모양들은 매우 쉽고 어렵지 않으니 시작해 봅시다.

## 원

원소는 매우 간단한 원을 만드는 데 사용할 수 있습니다. SVG에서 원에 적용될 속성은 다음과 같습니다:

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

- cy: cy 속성은 원의 Y 좌표를 나타냅니다.
- cx: X 좌표를 설정할 때는 cx 속성을 사용해주세요.
- stroke: 원의 테두리 색상을 변경하려면 stroke 속성을 사용하세요.
- stroke-width: stroke-width 속성을 사용하여 원의 테두리 너비를 지정할 수 있습니다.

SVG를 사용하여 원을 그려봅시다:

`![SVGVsCanvasAComparison_2](/assets/img/2024-05-02-SVGVsCanvasAComparison_2.png)`

코드:

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
<svg height="100" width="100">
  <circle cx="50" cy="50" r="40" stroke="cornflowerblue" stroke-width="3" fill="gray" />
</svg>
```

## Polygon

단순히 SVG의 `polygon` 요소를 사용하여 다각형을 만들 수 있습니다. SVG 다각형 요소를 사용하여 다각형 모양을 만들 수 있습니다.

다각형을 생성해 봅시다:

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

<img src="/assets/img/2024-05-02-SVGVsCanvasAComparison_3.png" />

코드:

```js
<svg height="250" width="500">
  <polygon points="220,10 300,210 170,250 123,234" style="fill: cornflowerblue; stroke: red; stroke-width: 4" />
</svg>
```

상기 코드에서 `polygon` 요소는 `svg` 요소 내부에서 사용되었습니다. 그리고 우리는 다각형 요소 내부의 점 속성을 활용했습니다. 다각형 모양의 x와 y 좌표는 point 속성에 의해 지정됩니다.

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

`polygon` 요소를 사용하여 각 코너의 x 및 y 좌표를 설정하는 points 속성을 사용하여, 빠르게 별을 생성할 수 있습니다.

![Star Shape](/assets/img/2024-05-02-SVGVsCanvasAComparison_4.png)

코드:

```js
<svg height="210" width="500">
  <polygon
    points="100,10 40,198 190,78 10,78 160,198"
    style="
      fill: cornflowerblue;
      stroke: red;
      stroke-width: 5;
      fill-rule: nonzero;
    "
  />
</svg>
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

## 텍스트

SVG를 사용하여 텍스트를 손쉽게 작성할 수 있어요. 그런 사실을 알고 계셨나요? 아주 간단하게 텍스트를 작성할 수 있죠. 그러면 시작해봅시다!

![image not found](/assets/img/2024-05-02-SVGVsCanvasAComparison_5.png)

코드:

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
<svg width="">
  <text x="100" y="100" fill="cornflowerblue">
    WELCOME TO OPEN REPLAY
  </text>
</svg>
```

위 코드에서는 X 및 Y 속성을 사용하여 텍스트를 위치시키고, 텍스트에 cornflowerblue라는 색상을 부여하기 위해 fill 속성을 사용했습니다.

## SVG 이미지

마지막으로 `img` 요소 내에 SVG를 포함시킴으로써 HTML 페이지에 통합할 수 있습니다. SVG 파일의 URL은 `img` 요소의 src 속성에 있어야 합니다.

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
<img src="/image.svg" width="500px" alt="" />
```

출력:

<img src="/assets/img/2024-05-02-SVGVsCanvasAComparison_6.png" />

위의 단계를 따라 간단히 HTML에서 SVG를 만들 수 있습니다. 더 많은 SVG 이미지를 원하시면 여기를 클릭해주세요.

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

# 캔버스를 사용하여 모양 만들기

HTML 캔버스는 꽤 간단하게 만들 수 있어요. HTML5 캔버스 요소는 HTML 파일에 있어야 하며 필요한 속성이 있어야 해요. 먼저 캔버스 요소를 선언하고 높이와 너비를 지정해야 해요. 이를 위해 HTML 문서에 `canvas`라는 올바른 속성이 포함된 요소를 추가하는 걸로 할 수 있어요.

```js
<canvas id="myCanvas" width="500" height="500"></canvas>
```

캔버스 요소를 HTML 요소로 추가한 후 상호 작용할 수 있도록 JavaScript 코드가 포함되어 있어야 해요. getContext() 메소드를 사용하여 이 작업을 수행해야 해요. 이렇게 하면 캔버스 드로잉 API에 액세스할 수 있어요.

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
바로 캔버스 그리기 API에 접근할 수 있으면 그리기를 시작할 수 있어요. 그리기 API의 메서드를 사용하여 캔버스에 모양, 선, 텍스트 및 그라데이션을 그릴 수 있어요. fillStyle 속성을 사용하면 그려진 모양의 색상을 변경할 수도 있어요.

ctx.fillStyle = "#FF0000";
ctx.fillRect(20, 20, 150, 100);
```

출력:

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

<img src="/assets/img/2024-05-02-SVGVsCanvasAComparison_7.png" />

캔버스 요소가 준비되었고 그림 그리기 API가 활성화되어 있으므로 이제 캔버스 기반 프로젝트를 개발할 수 있습니다.

HTML 캔버스에 대해 더 알고 싶다면 MDN 웹 문서를 방문해보세요.

# 캔버스에서 이미지를 만드는 데 도움이 되는 상위 10개 라이브러리

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

코딩이나 그래픽 디자인 경험이 많이 없는 사람들을 위해 라이브러리는 Canvas에서 이미지를 만들고 조작하는 것을 간단하게 만들어줍니다. 많은 라이브러리의 간단한 API를 사용해 시작하기 쉽습니다. 아래는 Canvas에서 이미지를 만드는 데 도움이 되는 상위 10개 라이브러리입니다:

- Fabric.js는 HTML5 캔버스에서 이미지를 만들고 편집하기 위한 다양한 도구 세트를 제공하는 JavaScript 라이브러리입니다. 간단하고 강력하며 여러 형태, 텍스트, 패턴과 같은 다양한 이미지 구성 요소를 지원합니다.
- Konva.js는 웹 브라우저 내에서 고성능 대화식 2D 그래픽을 만들기 위해 특별히 설계된 라이브러리입니다. 다양한 이미지 형식을 처리할 수 있고 다양한 그리기 도구와 애니메이션을 제공합니다.
- D3.js는 데이터 시각화용으로 자주 사용되는 Canvas에서 동적이고 대화식 이미지를 만드는 잘 알려진 라이브러리입니다. 축과 모양과 같은 간단한 요소뿐만 아니라 더 복잡한 이미지를 그릴 수 있습니다.
- EaselJS는 HTML5 캔버스에서 빠르고 쉬운 이미지 조작을 가능하게 하는 JavaScript 라이브러리입니다. 다양한 기능 중에서 모양, 텍스트, 애니메이션 등이 있습니다.
- Paper.js는 Canvas에서 복잡하고 대화식 이미지를 생성할 수 있는 벡터 그래픽 라이브러리입니다. 곡선, 경로, 모양 작업을 위한 다양한 도구를 포함하고 있습니다.
- Snap.svg는 웹 기반 SVG 이미지 조작을 위한 JavaScript 라이브러리입니다. 간단하게 사용할 수 있으며 간단한 벡터 그래픽 조작이 가능합니다.
- Three.js는 Canvas에서 멋진 3D 이미지를 만들고 높은 상호 작용을 제공하는 3D 그래픽 라이브러리입니다. 재료, 텍스처, 조명 작업을 위한 다양한 도구를 제공합니다.
- Phaser는 Canvas를 사용하는 HTML5 게임을 만들기 위한 프레임워크입니다. 오디오, 애니메이션, 물리 엔진과 같은 다양한 이미지 관리 도구를 제공합니다.
- Chart.js는 동적이고 대화식 캔버스 차트를 만들기 위한 인기 있는 라이브러리입니다. 막대, 선, 파이 차트 등 다양한 차트 유형을 제공합니다.
- Create.js는 웹 사이트를 위한 풍부한 시각 요소와 상호 작용 그래픽 및 애니메이션을 만들기 위해 사용되는 JavaScript 라이브러리들의 모음입니다.

# 결론

SVG와 Canvas의 비교가 재미있었기를 바랍니다. 이 경쟁에서 명확한 우승자는 없습니다. SVG와 Canvas 모두 장단점이 있으며 최적의 옵션은 프로그래밍 배경과 프로젝트의 목표 및 사양에 따라 다를 것입니다. 간단한 그래픽을 만드는 데 SVG를 사용해 왔고 고급 그래픽이나 2D 게임을 만들어 보고 싶다면 Canvas를 시도해 볼 수 있을 것입니다.

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

https://blog.openreplay.com에서 원문이 게시되었습니다.
