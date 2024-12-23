---
title: "플러터 데스크톱에서 러스트 없이는 살아남을 수 없는 이유"
description: ""
coverImage: "/assets/img/2024-05-18-WhyFlutterontheDesktopCantSurviveWithoutRust_0.png"
date: 2024-05-18 22:18
ogImage:
  url: /assets/img/2024-05-18-WhyFlutterontheDesktopCantSurviveWithoutRust_0.png
tag: Tech
originalTitle: "Why Flutter on the Desktop Can’t Survive Without Rust"
link: "https://medium.com/better-programming/why-flutter-on-the-desktop-cant-survive-without-rust-26ccd6ae30e0"
isUpdated: true
---

![image](/assets/img/2024-05-18-WhyFlutterontheDesktopCantSurviveWithoutRust_0.png)

Writer's note: 이 기사에서는 Tim Sneath와 많은 노력을 기울인 다른 참여자들의 노력으로 만들어진 Win32 패키지에 대해 이야기합니다. Win32 패키지는 고품질이며 Tim은 Flutter 생태계에 큰 기여자입니다. 제가 언급한 내용은 이 패키지를 비하하려는 것이 아니라 제 경험 상으로 잘 작동하는 대안에 대해 논의한 것입니다.

현재 Flutter on Desktop은 애매한 상황에 있습니다. 주요 데스크톱 플랫폼(Windows, macOS, Linux 등)에서 안정적이며, 일부 채택도 이루어지고 있습니다. 이는 휴대용 앱 개발에 대한 인기가 높지만 데스크톱 앱으로의 확장은 아직 그리 인기가 없는 것 같습니다.

데스크톱 플랫폼의 안정성이 이동 플랫폼에 비해 훨씬 더 새로운 것은 사실이지만, 데스크톱에서 Flutter가 이동 플랫폼과 비교했을 때 덜 개선된 다른 중요한 영역이 있습니다. 이것은 확장성과 관련이 있으며, 더 구체적으로는 Flutter가 기본 운영 체제에서 네이티브 코드를 호출하는 것이 얼마나 어려운지에 관한 것입니다. Android 또는 iOS에서는 원하는 대로 작동할 Kotlin 또는 Swift를 조합하는 것이 그리 어렵지 않습니다. 그러나 데스크톱에서는 전혀 다른 이야기입니다.

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

"Flutter on Desktop"은 Windows, Linux, 그리고 macOS를 포함한 매우 넓은 용어입니다. 이 기사에서는 Windows에만 초점을 맞출 것입니다. Windows가 데스크톱 시장을 주도하고 있는 만큼, 그것은 공정한 선택이라고 생각합니다.

제 경우에는 'StagePlay'라는 데스크톱 앱을 개발 중이었습니다. 이 앱은 스마트 자전거와 연결되어 사용자에게 현재 기어가 무엇인지 알려줍니다. 이것이 작동하려면 스마트 자전거와 통신하기 위해 Bluetooth Low Energy(BLE)를 사용해야 합니다.

데스크톱에서 BLE를 지원하는 것은 완전히 불가능한 것은 아니지만, 제 경우에는 기존 플러그인이 제대로 작동하지 않았습니다(앱이 데스크톱으로 충돌할 수도 있었습니다). 그래서 저는 이를 위한 내 자체 구현을 작성해야 했습니다.

# 처음에 Flutter로 데스크톱 앱을 작성한 이유

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

만약 플러터의 데스크톱 지원이 평균 수준이라면, 왜 내 앱을 플러터로 작성했을까요? 그건 좀 자기 반박 같네요. 그렇다고요. 한동안 모바일 앱에 플러터를 사용했고, 간단히 말해서 플러터가 사용하는 레이아웃 시스템이 제가 본 것 중에서 가장 좋다고 생각했기 때문입니다. 이전에는 Windows WPF 앱이나 Xamarin Forms 앱의 레이아웃을 만들기 위해 XAML을 사용하려 했었습니다. 그러나 플러터의 레이아웃 시스템은 XAML을 넘어서는 수준이었습니다. 거의 비교할 수 없어요.

그래서 결과적으로, 제가 플러터의 팬이 되어버려서 WPF/Xamarin Forms/MAUI에서 앱을 작성하기 위해 다시 XAML로 돌아가는 생각만으로도 우울해졌어요. 그래서 프레임워크 선택이 플러터가 될 것이라면, 내 Bluetooth 요구사항을 충족시키기 위해 더 어려운 길을 선택해야 했습니다.

즉, 내가 선택한 BLE 장치에 연결하기 위한 네이티브 플랫폼 기능을 활용하는 방법을 찾아야 했습니다. 그리고 그에는 win32 패키지, 네이티브 C++ 플러그인 또는 Rust (flutter_rust_bridge를 사용해서) 세 가지 옵션이 있었습니다. 이 여정을 시작할 때는 세 번째 옵션 (또는 Rust 언어 자체에 대해 훨씬 더 잘 알지 못했습니다.

# Win32 패키지 사용

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

평범한 크로스 플랫폼 개발자의 어려움은, 그들이 사용하는 크로스 플랫폼 프레임워크에서 사용하는 언어에 능숙하지만, 특정 플랫폼 언어에는 그렇게 능숙하지 않다는 것입니다. 제 경우에는 Dart, C# 및 아마도 TypeScript에 능숙하지만, C++과 같은 저수준 언어에는 능숙하지 않습니다. 당연히, 이것은 제가 Dart를 사용하려고 했던 이유였습니다. 이를 위해 Win32 패키지를 사용하는 것이 좋은 선택처럼 보였습니다.

![Image](/assets/img/2024-05-18-WhyFlutterontheDesktopCantSurviveWithoutRust_1.png)

이는 시작하기에 좋을 것처럼 보였고, 여기에서 Bluetooth를 사용하는 방법에 대한 샘플도 있었습니다. 그러나 win32 패키지를 사용하는 것은 두 가지 주요 문제점이 있었습니다.

- BLE 장치에서 알림을 구독할 수 없었습니다. 이것이 사실상 Bluetooth를 이용해 하고 싶었던 유일한 작업이었습니다.
- Win32 API를 활용하기 위해 상당히 어려운 Dart 코드를 작성해야만 했습니다.

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

"‘Pretty difficult Dart code’라는 말의 의미는 무엇일까요? Win32 패키지를 사용해도 Dart를 사용할 수 있지만, 여전히 calloc(또는 C Allocate)과 같은 함수들을 호출하여 함수의 반환 값에 대한 메모리를 할당해야 합니다. 또한 더 이상 사용되지 않을 때 개체를 수동으로 삭제하여 직접 메모리 관리와 정리를 처리해야 합니다.

위의 일들 외에도, Win32 패키지는 Win32 API 표면을 매핑하는 데 우수하지만, WinRT API 표면을 매핑하는 데는 덜 능합니다. WinRT API 표면은 BLE 기능과 같은 새로운 기술이 주로 포함되어 있는 곳이므로 이것은 출발할 수 없는 상황이었습니다.

그래서 Win32 패키지는 버리고, 생각나는 유일한 대안은 네이티브 C++ 플러그인을 작성하는 것이었습니다.

# C++에서 나만의 네이티브 플러그인 작성하기"

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

내가 C++로 나만의 플러그인을 작성하려고 시도하기까지는 꽤 좋은 개발자라고 느끼고 있었어요. 소프트웨어 개발에 대해 충분히 알아서 앱을 디자인하고 만들 수 있는 실력을 가지고 있었죠 — API, 데이터베이스, 앱 등에 대해 알고 있었거든요.

C++에서 가치 있는 것을 만들어보려고 앉아보니, 나에 대한 높은 평가는 완전히 무너졌어요. 보통 소프트웨어 개발 세계에서는 거물같은 사람들 사이에 유년기를 보낸 어린이 정도로 여겨졌어요. 포인터가 무엇인지, 그리고 그 앰퍼샌드가 무엇을 하는 건지 전혀 모르는 상태였죠.

더욱이, C++로 작성된 좋은 플랫폼 간 BLE 플러그인을 찾았는데요. 내 플러터 앱에서 이 라이브러리로부터 명령어와 응답을 매핑해서 내 앱으로 다시 가져오기만 하면 됐어요. 그런데 전 대실패했죠.

만약 C++을 알고 잘 다룰 줄 아는 사람이라면서 "와, 이 사람은 정말 소프트웨어 개발을 못하는 것 같아" 라고 생각하실지라도, 괜찮아요. 하지만 난 다소 많은 웹 개발, 데이터베이스 개발, 마지막으로 앱 개발에 대한 지식을 유지해야만 해요. 정말 그렇게 많은데요. 그리고 나는 내 앱에 안전하게 C++을 사용하는 법을 배우는 것이 정말 큰 요구사항이라고 생각해요.

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

피지온을 사용하여 바인딩 코드를 생성하려고 시도하거나 자체 플랫폼 바인딩 코드를 작성하려고 시도하는 중간에, 나는 포기하기 시작했습니다. 이루고자 하는 목표에 대해 배워야 할 것이 너무 많은 것 같았습니다. 게다가, C++에서 잘 작동하는 것처럼 보이는 것을 어떻게든 해낸다 해도, 메모리 손상이나 기타 문제가 클라이언트의 기기에서 발생하지 않을지 확신하지 못한 채로 그것을 배포하는 것은 책임이 부족한 일이었습니다.

# 프로젝트를 일시 중단하기로 결정

프로젝트에서 BLE를 활용할 수 있는 신뢰할 만한 방법이 없다면, 프로젝트를 계속할 수 없었습니다. BLE 연결이 불안정한 경우 BLE 기기에 연결하는 앱을 출시할 수 없으며, 앱이 가끔한 데스크톱 충돌로 인해 종료되는 경우 더욱 그렇습니다. 또 다른 방법이 있는지 알아보기 위해 노력했고, 그 과정에서 플러터 러스트 브릿지 프로젝트를 발견했습니다.

![이미지](/assets/img/2024-05-18-WhyFlutterontheDesktopCantSurviveWithoutRust_2.png)

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

# Flutter Rust Bridge 사용하기

지금 이 단계에서 나의 러스트에 대한 현재 인식은 다음과 같았습니다:

- 그것은 프로그래밍 언어였다.
- 그들의 매스코트는 게였다.

이전에 사용해보지 않았던 새로운 언어로 복잡한 작업을 수행하는 것은 분명히 무서운 일이며, 성공할 수도 없는 것을 보장할 수도 없습니다. 몇 일 내에 허무하게 실패할 것으로 기대했습니다.

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

그 대신, 며칠 후에, 나는 Bluetooth 구현을 완료했고 모든 것이 원활하게 작동했습니다.

내 경험이 정말 좋았기 때문에, 지금은 러스트가 플러터 데스크톱에서 성공을 거둘 수 있는 중요한 결핵 부분이라고 믿습니다. 이유는 여기에 있습니다:

## C++보다 쉽고 win32 패키지보다 더 나은 선택

Windows에서의 네이티브 기능에 대한 다른 대안들은 플러터 러스트 브릿지 사용과 비교했을 때 부족합니다. 이렇게 말하는 이유가 있습니다:

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

- 만약 크로스 플랫폼 개발자라면, 아마도 C++에 대해 잘 알지 못할 것입니다. C++과 같이 어려운 언어를 사용해서 네이티브 기능을 구현하려고 한다면 거의 확실히 눈물로 끝나게 될 것입니다.
- 또한 C++에서 잡히지 않는 예외는 앱을 그냥 다운시킵니다. C++에 새로운 당신이기 때문에(1번 참조), 처리되지 않은 예외가 많이 발생할 것입니다.
- Win32 패키지를 통해 작업을 구현하려면 대부분의 함수 호출에 대한 API 문서를 읽어야 합니다. 이 자체만으로는 나쁘지 않지만, C++에서 예제를 읽고 Dart로 다시 써 보려는 노력은 calloc 및 destroy와 같은 기본 구조를 호출하는 것을 잊지 않으면서 많은 행복한 결과를 가져다주지 않습니다.

Rust 및 flutter_rust_bridge를 사용하면 이러한 문제(1번 및 2번)를 해결하거나(3번) 더 관리하기 쉽게 만들 수 있습니다. 예를 들어 Microsoft API 문서에서 찾을 수 있는 C++ 코드 샘플을 Rust로 다시 쓰는 것은 Dart로 win32 패키지를 통해 같은 작업을 수행하는 것보다 쉽습니다.

## Rust 커뮤니티는 매우 크고 친절합니다

프로그래밍 분야는 엘리티즘 문제를 가지고 있습니다. 어떤 개발자들은 그들이 당신보다 더 나은 개발자이거나 더 많은 것을 알고 있기 때문에 간단히 당신을 바보로 대할 수도 있거나 당신을 얕보기도 합니다. 나는 이 문제를 해결하는 데 특별히 많은 것을 할 수 없다는 것을 배웠고, 그냥 커뮤니티의 일반적인 분위기를 파악하고 나서 대부분의 시간을 디스코드에서 질문을 하느냐, 아니면 문서를 조립하고 GitHub 이슈에서 완전히 다른 문제를 가진 이들의 쾌활한 일들에서 다가올 나머지를 소화해보겠느냐를 결정하는 것이 더 쉽습니다.

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

내 경험상 러스트 커뮤니티 디스코드에 가입하고 #beginners 채널에서 어리석은 질문을 던져도 정말 즐거운 경험이었어요. 낯선 사람들이 항상 나에게 친절하게 도와줬어요, 매번 간단한 질문이라도요. 내가 이해를 보이고 말해준 내용을 논리적으로 이해하고 적용하면 필요한 모든 정보를 받을 수 있었어요.

거기서 끝나지 않았어요 - 전엔 글로벌 상태와 데드락을 만드는 대형 코드를 멈추고 더 깔끔하고 우아한 솔루션을 작성할 수 있는 방법에 대한 유용한 제안도 받았어요. 지금 내가 가지고 있는 것은 이 Discord 채널의 봉사자들의 끈질긴 도움으로 인해 절대적으로 품질이 높아진 것입니다.

## 플러터 러스트 브릿지 사용은 꿈 같아요

Windows에서 플러터용 네이티브 C++ 플러그인을 작성 중이라면, 자신만의 바인딩을 작성해야 하거나 Pigeon 패키지 내에서 실험적인 플랫폼 지원에 의존해야 합니다. 그래도 Pigeon은 Stream을 생성하지 않기 때문에 직접 구현해야 해요. 직접 많은 보일러플레이트 코드를 작성해야 하며 문서가 전혀 없어서 실수할 수도 있어요.

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

flutter_rust_bridge를 사용하는 것은 매우 간단합니다. 이 기능들은 다양하지만, 몇 가지 제가 가장 좋아하는 요소를 강조해보겠습니다:

- Rust 내에서의 함수는 자동으로 호출 가능한 함수로 매핑됩니다. Rust에서 새로운 pub async fn을 정의하고 flutter_rust_bridge의 코드 생성 도구를 실행하면, 즉시 네이티브 코드를 호출할 수 있습니다.
- `StreamSink<T>`은 기본적으로 지원되므로 값을 시간에 따라 내보낼 수 있습니다. 이러한 스트림에 작성된 값을 Dart 객체로 직접 내보내므로 필요에 따라 조작할 수 있습니다.
- Rust가 "패닉" 상태에 돌입해도 응용 프로그램이 데스크톱에 충돌하지 않습니다. 대신 flutter_rust_bridge 내부에서 발생한 패닉을 catch하여 무슨 일이 발생했는지 설명합니다.
- Rust 내의 "펜시한 열거형(Fancy enums)"을 지원합니다. 예를 들어:

다음은 rust 코드입니다...

```js
pub enum TransportType{
    Car{
        capacity: u8,
    },
    Bike{
        wheelCount: u8,
    }
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

...Dart에서는 작동하지 않을 것입니다. 그것은 Dart 내에서 enum이 작동하는 방식이 아니며, 가까운 미래에도 바뀌지 않을 것입니다. 그래도 스트림에 대해서는 어떤 지루한 enum에도 특정 세부사항을 숨겨 놓을 수 있다는 것이 정말 멋진 점입니다.

flutter_rust_bridge는 이러한 값을 매우 사용하기 쉬운 형식으로 변환하여 직관적이고 매우 합리적으로 만들어줍니다. 이를 다음과 같이 처리할 수 있습니다:

```js
api.transportTypeStream().listen((event) {
  event.when(car: (capacity) {
    print('the car has {capacity} capacity');
  }, bike: (wheelCount) {
    print('the bike has {wheelCount} wheels');
  });
});
```

그리고 모든 연결된 코드는 flutter_rust_bridge에 의해 자동으로 생성됩니다.

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

# 결론

여러분에게, 만약 여러분이 개발자이고 Windows용 Flutter 앱을 작성 중이라면, 진지하게 Rust를 조금 배우고 flutter_rust_bridge를 사용하여 원하는 것을 달성하는 데 도움을 받는 것을 고려해 보세요. 사실, 이렇게 하면 여러분에게 이익이 되고 앱을 더 빨리 제공할 수 있게 될 것입니다.

그러나 보다 넓은 관점에서 바라볼 때, Rust와 flutter_rust_bridge 없이 나의 앱이 데스크톱에서 성공적으로 실행되거나 실제로 작동할 수 있다고 상상하기 힘들어요. 저는 Flutter를 사용하여 데스크톱용 앱을 만들기로 결정한 사람들이 win32 패키지 사용이 제약적이고 이해하기 어렵다고 느끼게 될 것이라고 생각합니다. 또한, 그 같은 사람들은 원하는 기능에 대해 자체적으로 고품질의 네이티브 구현을 개발할 충분한 C++ 경험이 부족할 것입니다. 이 시점에서 그들은 목표를 달성하기 위해 다른 프레임워크를 사용할 가능성(또는 확률)이 높을 것입니다.

따라서 (Flutter 내에서 컴파일된 .NET 코드를 로드하고 실행할 수 있는 등의 막대한 일이 발생하지 않는 한), 데스크톱에서의 Flutter 성공은 Rust와 flutter_rust_bridge와 강하게 연결되어 있는 것으로 보입니다. 제가 본인 경험에서 이 프로젝트가 어디로 나아갈지를 기대하고 있습니다. 이를 아직 들어보지 못했다면 확인해보시기 바랍니다. 이 프로젝트가 여러분의 프로젝트를 내가 한 것처럼 구해줄 수도 있으니 말이에요.
