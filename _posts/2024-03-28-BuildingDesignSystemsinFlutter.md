---
title: "플러터로 디자인 시스템 구축하기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Building Design Systems in Flutter"
link: "https://medium.com/better-programming/building-design-systems-in-flutter-d52d66004070"
isUpdated: true
---

## 플러터에서 확장 가능하고 주관적인 디자인 시스템을 구현하는 팁과 요령

![이미지](/assets/img/BuildingDesignSystemsinFlutter_0.png)

Nielsen Norman Group(사용자 경험 연구 컨설테이션)은 디자인 시스템을 다음과 같이 정의합니다:

이름이 시각적인 것으로 착각할 수 있지만, 디자인 시스템의 규칙은 디자이너에만 해당되지 않습니다. 잘 구축되고 구현된 디자인 시스템의 실질적인 가치는 이러한 규칙을 디자이너와 개발자 모두에게 부과하여 일관성을 유지하고 두 분야가 더 높은 수준의 도전에 집중하고 응용 프로그램을 구성하는 부분의 세세한 사항을 무시할 수 있도록 하는 데 있습니다.

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

웹에서 부트스트랩과 안트 디자인 같은 디자인 시스템에 대해 들어본 적이 있을 수도 있고, 아니면 AirBnB의 디자인 언어 시스템을 알고 계실 수도 있습니다. 그들은 지붕 위에서 외치진 않더라도, 디자인에서 성공을 거둔 기업은 디자인 시스템을 보유하고 있을 것입니다. 이를 통해 단추, 배너, 텍스트 등과 같은 각각의 구성 요소를 고려하지 않고도 애플리케이션의 정체성과 기능에 집중할 수 있게 됩니다.

디자이너로서, 제가 페이지를 디자인하기 시작할 때 버튼이 무엇인지 고민하고 개발자가 소비할 명세를 철저히 작성해야 하는 일을 원치 않습니다. 개발자로서, 제게 디자인이 전달되고 열 번째로 버튼을 처음부터 만들어야 한다면 좋은 일이 아닙니다. 좋은 디자인 시스템과 이를 구현한 것(우리의 경우에는 플러터 라이브러리)이 이러한 문제를 해결합니다.

디자인 시스템이 어떻게 만들어지는지, 누가 표준을 정하고 문서화하는지에 대해서는 넘어가겠습니다. 대신, 잘 정의된 디자인 시스템이 있다고 가정하고 MyDesign이라고 부르겠습니다. 우리의 임무는 MyDesign의 구성 요소를 플러터에서 구축하고, 디자인 시스템이 정의한 표준을 정확히 대표할 수 있도록 하는 것입니다. 특히 버튼 위젯 집합에 중점을 둘 것입니다:

![BuildingDesignSystemsinFlutter_1.png](/assets/img/BuildingDesignSystemsinFlutter_1.png)

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

이 기사에서는 성공적이고 확장 가능하며 재사용 가능한 디자인 시스템 구현으로 이어지는 팁과 요령을 소개합니다.

# 이름 정하기 중요

개발자로서, 우리는 의미론적인 부분이 도입 및 적응에 매우 중요하다는 것을 알고 있습니다. 그러나 디자인 시스템의 경우에는 우리의 친근한 동네 디자이너들에게까지 확장되어야 합니다. 우리는 공유 언어를 만들고 있으므로 이에 따른 우리의 위젯을 구현해야 합니다.

원하는 컴포넌트를 설명할 때 디자이너들이 사용하는 이름과 같은 이름을 위젯에 사용하려고 노력하세요. 이를 통해 디자인과 구현 간에 왔다갔다 작업할 때 오해가 없도록 할 수 있습니다. 이 방법론을 위젯의 구성에도 적용하세요. 버튼에 "왼쪽(right)"과 "오른쪽(left)" 대신 "leading" 및 "trailing" 아이콘이 있으면 위젯 클래스의 필드에서도 동일한 용어를 사용하세요. MyDesign 버튼의 경우, Material filled (elevated) 및 outlined buttons를 반영하지만 primary와 secondary로 명명되어 있습니다. 우리의 구현은 이러한 명명 체계를 존중해야 합니다.

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

디자인 시스템 구현은 종종 지원하는 앱들과 독립적으로 존재합니다. 이것은 비즈니스 로직이 디자인 구현으로 스며들지 않도록 하는 유익한 분리이며, 라이브러리가 여러 소비 애플리케이션 간에 종속성으로서 재사용될 수 있습니다. 이러한 이유로 디자인 시스템에서 위젯에 대한 접두사를 사용하는 것도 유익합니다. Button 대신에 MyButton을 사용하는 것은 애플리케이션 내의 어떤 위젯이 로컬이고 어떤 것이 그렇지 않은지를 구분해 주며, Flutter나 기타 앱 종속성에서 제공하는 다양한 위젯들과의 이름 충돌을 피할 수 있도록 도와줍니다.

# 독립적으로 디자인 토큰 정의하기

디자인 토큰은 디자인 시스템의 "기본 요소"들입니다. 구성 요소 전체에서 재사용되는 상수값들이며 표준으로 정의됩니다. 색상, 간격, 텍스트 스타일링, 아이콘과 같은 요소들은 종종 디자인 시스템에서 "토큰"으로 포함되며, 이러한 토큰을 사용하는 위젯들과 독립적으로 정의하는 것이 좋습니다. Material Design은 이미 Colors 및 Icons 클래스와 함께 기본 Theme 객체의 textTheme을 사용하여 본문 및 제목 스타일과 같은 사전 정의된 텍스트 처리 방법을 제공합니다.

# 구성 사용하기

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

플러터는 적극적인 구성 가능성에 기반을 두고 있으며, 디자인 시스템 라이브러리도 마찬가지여야 합니다. 플러터의 다양한 Material Design 및 Cupertino 위젯 카탈로그를 활용하고 시스템 사양과 일치하도록 스타일을 지정하세요. 이를 통해 위젯이 사용될 모든 곳에서 스타일링이 추상화됩니다. 작은 위젯을 만들어 다른 위젯에 합성함으로써 위젯 간의 코드 반복을 피하세요. MyDesign 버튼을 사용하면 Material의 버튼을 기본으로 합성할 수 있습니다. 더 복잡한 시스템에서는 여러 다른 위젯에 합성할 수 있는 고유한 기본 구성 요소를 보유할 수 있습니다.

# API 표면 축소

가능한 한 위젯을 간단하게 유지하려고 노력하세요. 최소 지식 원칙을 준수하는 것이 좋습니다. 즉, 위젯은 디스플레이하고 올바르게 작동하는 데 정확히 필요한 입력만 소비해야 합니다. 이는 또한 위젯을 예상치 못한 방법으로 사용할 수 없음을 의미합니다.

Material 위젯을 사용하고 해당 디자인에 맞게 스타일을 지정 중이라면, 위젯이 허용하는 모든 구성을 필요로 하지 않을 가능성이 높습니다. Material 위젯은 매우 구성 가능하도록 설계되었지만 귀하의 위젯은 그렇지 않을 수 있습니다. 이러한 매개변수들을 줄이세요!

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

일부 위젯은 ElevatedButton과 같이 children으로 전달할 수 있는 것에 굉장히 유연합니다(모든 Widget을 취합니다). MyDesign에서 버튼은 텍스트와 아이콘만을 children으로 허용하므로, 유효한 값만 허용되고 버튼 내부를 구축하는 복잡성을 추상화하기 위해 위젯의 필드를 다시 입력하겠습니다.

# 유효한 입력 강제시키기 위해 Enum 사용하기

이 팁은 위에서 한 권고 사항의 확장으로 이어집니다. 많은 경우에 위젯의 필드 유형은 당신의 디자인 시스템 규칙에 맞지 않는 값들을 허용할 수 있습니다. 예를 들어, MyDesign의 버튼은 브랜드 팔레트에서 일부 색상만 허용합니다. 버튼이 잘못된 색상을 허용하지 않도록하기 위해 우리는 aColor 유형 매개변수를 받아들이는 대신 (그래서 잘못된 색깔의 버튼을 허용하지 않음) 허용되는 구성을 나타내고 제한하는 enum을 만들 것입니다.

Dart 2.17의 향상된 enums 이전에는, 이는 맵이나 switch case를 사용하여 이 enum 값들을 유효한 유형으로 다시 매핑해주어야 한다는 약간의 성가심을 일으킬 수 있습니다. 그러나 향상된 enums을 통해, 우리는 각 enum 값과 해당 표현되는 값 사이를 연결하는 final 필드를 가진 enums를 정의할 수 있습니다.

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

# 스타일 상속

값을 하드코딩 하는 것은 항상 좋지 않은 아이디어입니다. 대부분의 경우 디자인 토큰을 상수로 분리하여 이를 처리해 왔습니다. 그러나 코드 전반에 있는 Color(0xff0000ff) 대신 MyColors.blue를 사용하는 것은 여전히 우리의 디자인 시스템을 불필요하게 제한시킬 수 있습니다. 토큰들은 디자인 시스템에 변경 사항이 필요한 경우 값을 편집할 수 있는 단일한 장소를 제공하지만, 만약 완전히 새로운 테마가 필요한 경우 우리에게는 어떻게 될까요? 애플리케이션에서 라이트 테마와 다크 테마로 공통적으로 사용되는 실천 방법입니다.

정적 상수 변수는 사용자의 테마 선호도를 해결할 수 없습니다. 그러므로 Material 디자인처럼, 전역 테마로부터 스타일을 상속하거나 속성을 수정하거나 테마 확장을 만들어 활용하세요.

# 명명된 생성자 사용하기

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

개인적인 취향에 따라 다를 수 있지만, Dart의 명명된 생성자는 보일러플레이트를 줄이고 위젯의 의미론을 향상시킬 수 있습니다.

저희의 MyDesign 기본 및 보조 버튼을 살펴보면 내부를 구축하는 과정에서 재사용되는 코드가 있다는 것을 알 수 있지만, 여전히 Material ElevatedButton과 OutlineButton이 필요합니다. MyPrimaryButton 및 MySecondaryButton 두 개의 별도 위젯을 생성하고 자식 요소를 빌드하기 위한 위젯을 추출할 수도 있습니다. 또는 명명된 생성자인 MyButton.primary 및 MyButton.secondary이 있는 하나의 위젯을 생성할 수도 있습니다.

이 생성자들은 빌드 메서드에서 어떻게 동작해야 하는지 알려주는 비공개 필드를 설정할 수 있습니다. 이 접근 방식은 로직과 빌드 방법이 복잡해지는 경우에 더 가치 있는 것이 됩니다(코드 공유는 여러 위젯 간 통신을 조정하는 것보다 쉽습니다). 이러한 방식으로 위젯의 "그룹"을 의미론적으로 묶어두는 것도 가치가 있습니다. IDE 코드 완성 기능을 통해 MyButton.을 입력하면 사용 가능한 변형에 대한 "카탈로그"가 표시되어, 다중 위젯 접근 방식을 통해 얻지 못하는 이점을 얻을 수 있습니다.

# 결론

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

당신은 원하는 대로 디자인 시스템을 엄격하게 적용할 수 있어요. 개발자가 구두 또는 서면 규칙을 준수하도록 믿는 것만으로도 많은 상황에 충분할 수 있어요. 그러나 디자이너와 공유 용어를 적극 활용하고 시스템 규칙을 엄격히 준수하는 위젯을 구축하면, 더 빠른 디자인-개발 이관과 향후 개발자의 보다 쉬운 입문을 이끌 수 있어요.

## 추가 읽기

디자인 시스템이 다양한 기기에서 유연하게 작동하는 것이 굉장히 중요해요. 플러터에서 반응형 레이아웃에 관한 제 글을 확인해보세요.

제 글을 지원하고 전체 Medium 액세스를 받고 싶다면, 나의 추천 링크를 통해 가입을 고려해보세요. 구독 중 일부는 저에게 돌아가고 이와 같은 기사를 더 많이 작성할 수 있어요!
