---
title: "플러터 앱의 라이프사이클 이해하기"
description: ""
coverImage: "/assets/img/2024-05-17-UnderstandingtheLifecycleofaFlutterAppAComprehensiveGuide_0.png"
date: 2024-05-17 21:42
ogImage:
  url: /assets/img/2024-05-17-UnderstandingtheLifecycleofaFlutterAppAComprehensiveGuide_0.png
tag: Tech
originalTitle: "Understanding the Lifecycle of a Flutter App: A Comprehensive Guide"
link: "https://medium.com/@wafamohameddd/understanding-the-lifecycle-of-a-flutter-app-a-comprehensive-guide-b58a5a94d776"
isUpdated: true
---

![image](/assets/img/2024-05-17-UnderstandingtheLifecycleofaFlutterAppAComprehensiveGuide_0.png)

# 소개

모바일 앱 개발의 세계에서 앱 라이프사이클은 앱이 실행되는 동안 통과하는 다양한 상태를 의미합니다. 이러한 상태를 파악하는 것은 효율적이고 반응성이 뛰어나며 사용자 친화적인 플러터 애플리케이션을 구축하는 데 중요합니다.

# 목차

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

- 플러터 앱 라이프사이클 상태.
- 플러터에서 라이프사이클 메서드 구현하기 (UI-코드).
- 코드 설명 (didChangeAppLifecycleState, AppLifecycleState, WidgetsBindingObserver).
- 결론.

# 플러터 앱 라이프사이클 상태:

![이미지](/assets/img/2024-05-17-UnderstandingtheLifecycleofaFlutterAppAComprehensiveGuide_1.png)

## 플러터 앱은 주로 다섯 가지 상태에서 존재할 수 있습니다:

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

## 분리된 상태

- 이 상태는 앱의 시작점을 나타내며 앱이 생성되거나 파괴되는 상태입니다.
- 액션을 기다리는 빈 캔버스와 같이, 무언가 잘못되면 앱이 갑자기 사라질 수 있습니다.
- Navigator.pop()과 같은 액션은 일반적으로 앱이 시작되기 전에 앱을 종료할 수 있습니다.

## 비활성 상태

- 이 상태에서는 앱이 백그라운드에 머무르며 사용자 입력을 받지 않습니다.
- 화면에 팝업 메시지나 시스템 오버레이로 중단될 때 마다 전경과 배경 사이를 전환 할 수 있습니다.

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

## 일시 정지된 상태

- 앱을 사용 중 전화 등의 간섭이 발생하면 일시 정지된 상태로 들어갑니다.
- 앱은 백그라운드에 남아 사용자 상호 작용에 대한 응답이 없습니다.
- 이 상태에서 리소스를 보존하기 위해 애니메이션 또는 네트워크 요청과 같은 진행 중인 작업을 일시 중지하는 것이 중요합니다.

## 다시 시작된 상태:

- 해당 상태는 앱의 활성 상태를 나타내며, 앱이 전면에 보이고 사용자 상호 작용에 준비되어 있는 상태입니다.
- 일시 중지된 작업을 다시 시작할 수 있고, UI 요소를 필요에 따라 새로 고칠 수 있으며, 앱이 기본 실행 모드에 있음을 나타냅니다.

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

## 숨은 상태

- 다른 앱으로 전환하거나 홈 버튼을 누르면 귀하의 앱은 여전히 존재하지만 보이지 않습니다.
- 다른 앱을 사용하는 동안 그것을 서랍에 넣는 것과 유사하게, 이 상태는 앱이 멈추려고 할 때 발생하거나 다른 애플리케이션에 의해 최소화될 때 발생합니다.

# 플러터에서 Lifecycle 메소드 구현하기

이러한 상태를 이해하는 것은 견고한 플러터 앱을 만드는 데 매우 중요합니다. 실제 예제와 함께 Flutter 앱에서 Lifecycle 메소드를 구현하는 방법을 자세히 알아봅시다.

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

# UI:

제공된 코드는 앱 라이프사이클 상태를 추적하고 매 초 증가하는 카운터를 표시하는 간단한 플러터 앱을 보여줍니다.

![이미지](/assets/img/2024-05-17-UnderstandingtheLifecycleofaFlutterAppAComprehensiveGuide_2.png)

# 코드:

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

# 코드 설명:

## Stateful 위젯:

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

- AppLifeCycle 클래스는 여러분의 앱의 주요 위젯을 나타내는 StatefulWidget입니다.
- createState 메서드(widget 라이프사이클)을 오버라이드하여 상태 객체 `_AppLifeCycleState`를 반환합니다.
- WidgetsBindingObserver가 상태 클래스에 혼합되어 위젯 레이어에서 라이프사이클 상태를 관찰합니다.

힌트: (구현) 키워드를 사용할 수 있지만 모든 메서드를 강제할 수 있으므로 (with) 키워드를 사용하는 것이 좋습니다.

```js
class _AppLifeCycleState extends State<AppLifeCycle> with WidgetsBindingObserver { }
```

## 상태 초기화(initState):

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

- 필요한 변수(타이머, 카운트, 액티브, 앱상태, 숨김 여부)를 초기화합니다.
- initState( )에서 라이프사이클 변경을 모니터링하는 옵저버 인스턴스를 추가하고 타이머를 시작합니다.
- 현재 위젯(this)을 위젯 바인딩의 옵저버로 추가합니다.

```js
  타이머? timer;
  int count = 0;
  bool active = true;
  bool isHidden = false;
  String appState = '';

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    timerP();
  }
```

## 타이머 설정(timerP):

- timerP( ) 함수는 active가 true일 때마다 매 초마다 카운트를 증가시킵니다.

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
  void timerP() {
    timer = Timer.periodic(
      const Duration(seconds: 1),
      (timer) {
        if (active) {
          setState(() {
            count += 1;
          });
        }
      },
    );
  }
```

## 앱 라이프사이클 처리 (didChangeAppLifecycleState):

- 앱 라이프사이클 상태 변경을 처리합니다.
- didChangeAppLifecycleState()은 앱 라이프사이클 상태가 변경될 때와 시스템이 앱을 백그라운드로 전환하거나 다시 포그라운드로 전환할 때 호출됩니다.
- 받은 AppLifecycleState 열거형에 기반하여 appState를 업데이트합니다.
- 디버깅 목적으로 라이프사이클 상태 변경을 출력합니다.

```js
  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    super.didChangeAppLifecycleState(state);
    setState(() {
      if (state == AppLifecycleState.resumed) {
        active = true;
        isHidden = false;
        appState = 'Resumed';
        print("///Resumed///");
      } else if (state == AppLifecycleState.inactive) {
        active = false;
        appState = 'Inactive';
        print("///Resumed///");
      } else if (state == AppLifecycleState.paused) {
        active = false;
        appState = 'Paused';
        print("///Resumed///");
      } else if (state == AppLifecycleState.detached) {
        appState = 'Detached';
        print("///Resumed///");
      } else if (state == AppLifecycleState.hidden) {
        isHidden = true;
        appState = 'Hidden';
        print("///Resumed///");
      }
    });
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

## UI 빌딩 (빌드):

- Text 위젯에서 count의 현재 값 표시
- 다른 Text 위젯에서 현재 appState 표시
- count를 재설정하는 버튼 제공

```js
 Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Count: $count',
              style: TextStyle(fontSize: 40),
            ),
            SizedBox(height: 20),
            Text(
              'App State: $appState',
              style: TextStyle(fontSize: 20),
            ),
            ElevatedButton(
              onPressed: () {
                setState(() {
                  count = 0;
                });
              },
              child: Text('Reset Count'),
            ),
            const SizedBox(height: 20),
          ],
        ),
```

## 정리 (dispose) 메서드:

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

- 위젯을 관측하는 관찰자로서 역할을 제거하여 위젯이 트리에서 제거될 때 리소스를 해제합니다.

```js
WidgetsBinding.instance.removeObserver(this);
```

- 위젯이 dispose될 때 메모리 누수를 방지하기 위해 타이머를 취소합니다.

```js
timer?.cancel();
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

# 실행:

![image](https://miro.medium.com/v2/resize:fit:764/1*yiNVeZwzfonDYSmZIo2Wlw.gif)

![image](/assets/img/2024-05-17-UnderstandingtheLifecycleofaFlutterAppAComprehensiveGuide_3.png)

# 결론:

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

플러터 라이프사이클은 플러터 앱 개발의 근간적인 측면입니다. 다양한 라이프사이클 이벤트를 이해하고 적절한 라이프사이클 관리 기술을 구현함으로써, 개발자들은 응답성이 뛰어나고 효율적이며 유지보수가 용이한 고품질 앱을 만들 수 있습니다. 효과적인 라이프사이클 관리를 통해 앱이 다양한 기기 및 운영 체제에서 예측 가능하게 동작하도록 보장하며, 사용자들에게 원활하고 즐거운 경험을 제공합니다.

여기까지입니다! 이 기사가 도움이 되었다면 다른 사람들과 공유하십시오. 더 많은 플러터 기사 및 자료를 보시려면 제 GitHub 저장소를 확인하거나 LinkedIn에서 저와 연락하세요. 궁금한 점이나 피드백이 있으시면 망설임 없이 연락해 주세요.

좋은 코딩 되세요! 😊

LinkedIn

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

GitHub

이메일: wafamohameddd@gmail.com
