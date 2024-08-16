---
title: "플러터 프로젝트에 조금의 창조적 예술 추가하기"
description: ""
coverImage: "/assets/img/2024-05-15-AddingabitofGenerativeArttoaFlutterproject_0.png"
date: 2024-05-15 11:44
ogImage: 
  url: /assets/img/2024-05-15-AddingabitofGenerativeArttoaFlutterproject_0.png
tag: Tech
originalTitle: "Adding a bit of Generative Art to a Flutter project"
link: "https://medium.com/@khlebobul/adding-a-bit-of-generative-art-to-a-flutter-project-13b22dd4f274"
isUpdated: true
---



여러분 안녕하세요, 저는 최근에 pub.dev에 제 첫 번째 패키지를 게시했어요. 이 패키지는 여러분의 프로젝트를 좀 더 흥미롭게 만들어줄 수 있는 기능을 제공해요. 이 글에서는 이 패키지를 만드는 과정과 활용 방법에 대해 알려드릴게요.

Flutter Animated Generative Art Backgrounds collection (gen_art_bg)은 플러터 앱에 흥미로운 애니메이션 배경을 추가하거나 로딩 화면으로 사용하는 것을 쉽게 만들어줍니다.

![image](/assets/img/2024-05-15-AddingabitofGenerativeArttoaFlutterproject_0.png)

모든 것은 flutter 지식과 기술을 향상시키기 위해 개발 중인 사이드 프로젝트로 시작했어요. 간단한 게임을 만들기 시작했고 정적 애플리케이션에 애니메이션을 추가하고 심지어 미니멀한 디자인을 유지하는 것에 도전했죠.

저는 Flutter에서 애니메이션 그리드 배경에 대해 쓴 글을 정확히 이렇게 썼어요.

한 예를 만들어서 앱에 통합시켰는데 결과물이 정말 마음에 들었어요. 더 발전시키고 몇 가지 더 예제를 추가하고 싶었어요.

몇몇 작업에서 영감받아 flutter와 비슷한 것을 구현해보기로 결정했어요.

flutter_spinkit에 영감을 받아요.

그리고 플러터에서 화제인 생성 예술 주제의 멋진 기사 및 저장소를 소개합니다.

- 플러터에서의 생성 예술
- funvas
- Flutter-Artbook
- 아트 프로세싱 플레이그라운드
- GenArtCanvas

## p5.js 제작자

- Patt Vira
- mattdesl

## 작성자 정보

- 로니 카우프만

만약 이 주제에 대한 다른 자료를 알고 계시다면 꼭 알려주세요!

# 그래서 왜 막바지에 패키지를 만들게 되었을까요?

위에는 두 가지 분명한 이유가 있습니다:

- 진짜 작은 프로젝트 만들기

네, 패키지도 작은 프로젝트예요(일부 패키지는 앱만큼 유용할 수 있어요). 프로젝트 개발 및 배포의 모든 과정을 직접 경험하고 싶었습니다.

- 커뮤니티 기여

p5.js를 사용하면 이러한 애니메이션을 쉽게 구현할 수 있습니다. 플러터는 다른 작업이 필요합니다. 원하는 배경의 이름을 호출하는 것이 코드를 처음부터 작성하는 것보다 더 쉽다고 판단했습니다.

15개의 예제가 준비되자마자 패키지 개발을 시작했습니다. 인터넷에는 프로젝트를 만드는 방법에 대한 많은 안내서가 있으므로 여기서는 몇 가지 포인트만 언급하겠습니다.

위젯 속성을 조정할 수 있는 기능을 추가하여 생성자를 통해 전달하고 패키지를 쉽게 사용할 수 있도록 README.md를 형식화했습니다.

# 패키지 소개

설치는 pub.dev의 모든 패키지와 동일한 방식으로 진행됩니다:

```yaml
dependencies:
  gen_art_bg: ^0.0.2
```

```js
import "package:gen_art_bg/gen_art_bg.dart";
```

또는 Flutter의 경우:

```js
flutter pub add gen_art_bg
```

그 다음으로 진행할 내용은:

```js
void main() {
  runApp(const MaterialApp(
    debugShowCheckedModeBanner: false,
    home: Scaffold(
      body: WaveLineGrid(
        columns: 15, // 열의 수를 변경하려면 이 값을 변경하세요
        rows: 25, // 행의 수를 변경하려면 이 값을 변경하세요
        locationConstant: 100, // 위치를 변경하려면 이 값을 변경하세요
        animationDuration: Duration(seconds: 5), // 애니메이션 지속 시간을 변경하려면 이 값을 변경하세요
      )
    ),
  ));
}
```

완성!

다음으로, 우리는 각 예제를 개별적으로 살펴볼 것입니다.

# 쇼케이스

## WaveLineGrid

![WaveLineGrid](https://miro.medium.com/v2/resize:fit:324/1*Ya_bFaYvfthWV7aCbIKAdA.gif)

```js
WaveLineGrid(
        columns: 15, // 그리드의 열 수
        rows: 25, // 그리드의 행 수
        locationConstant: 100, // 그리드 위치 조정 상수
        animationDuration:  Duration(seconds: 5), // 애니메이션의 지속 시간
      ),
```

## PerlinNoise

<img src="https://miro.medium.com/v2/resize:fit:324/1*MfXXrfKaEwLfOxmFLUQjOA.gif" />

```js
PerlinNoise(
        width: 40, // 폭
        height: 40, // 높이
        frequency: 5, // 주파수
      ),
```

## 랜덤스퀘어

![이미지](https://miro.medium.com/v2/resize:fit:312/1*eROYDX56LY7L-MO0S90-hQ.gif)

```js
RandomSquare(
        gridSize: 10, // 그리드 크기를 변경하려면 이 값을 수정하세요
        updateInterval: Duration(seconds: 1), // 업데이트 간격을 변경하려면 이 값을 수정하세요
      ),
```

## 스파이럴 웨이브

<img src="https://miro.medium.com/v2/resize:fit:312/1*nk6mjIB32974wRuJm5FzQA.gif" />

```js
SpiralWave(
        size: 10, // 각 원의 크기
        k: 20, // 파도 효과 제어 상수
      ),
```

## GridOfLines

mattdesl에 영감을 받음

md
![GridOfLines animation](https://miro.medium.com/v2/resize:fit:324/1*u010xIK6bJ1u3P0gbcX9SQ.gif)

```js
GridOfLines(
        animationDuration: 5, // Animation duration in seconds
        gridSize: 10, // Number of lines in the grid
        strokeWidth: 0.015, // Stroke width of the lines
        color: Colors.black, // Color of the lines
      ),
```

## AnimatedBWSquares and AnimatedColoredSquares

Roni Kaufman의 영감을 받아 만들어졌습니다.

![image](https://miro.medium.com/v2/resize:fit:324/1*M8eaiZY1slAFRz_C3KU0-g.gif)

```js
AnimatedBWSquares(
        squareCount: 40, // Number of squares
        animationDuration: 10, // Duration of the animation
        margin: 0, // Margin around the canvas
        strokeWidth: 1.5, // Stroke width of the squares
      ),
```

## AnimatedLines

![image](https://miro.medium.com/v2/resize:fit:324/1*zLmbd3nXmeePU0aS4Iul0w.gif)

```js
AnimatedLines(
        numberOfLines: 30, // 라인 수
        lineLength: 200, // 각 라인의 길이
        lineColor: Colors.black, // 각 라인의 색상
        strokeWidth: 3, // 각 라인의 스트로크 너비
        animationDuration: 10, // 애니메이션 지속 시간
      ),
```

## AnimatedLinesGradient

<img src="https://miro.medium.com/v2/resize:fit:324/1*Noj2EpPkomlHwaBhsxBnwA.gif" />

```js
AnimatedLinesGradient(
        animationDuration: 5, // 애니메이션 지속 시간
      ),
```

## 랜덤노이즈

![랜덤노이즈](https://miro.medium.com/v2/resize:fit:324/1*G5SU8F9du_k4jwfceK0n-w.gif)

```js
RandomNoise(
        duration: Duration(seconds: 10), // 애니메이션 지속 시간
        dotSize: 13, // 점의 크기
        dotSpacing: 11, // 점 사이의 간격
      ),
```

## 몰나르아트

Roaa Khaddam의 영감을 받아서

<img src="https://miro.medium.com/v2/resize:fit:324/1*CJHl7YWPQSw5zdFCxPPH4g.gif" />

```js
MolnarArt(
        rows: 8, // 행 수
        cols: 8, // 열 수
        n: 12, // 코드
        colSeq: [
          Color(0xFFC4951B),
          Color(0xFF9E3C52),
          Color(0xFF1D6383),
          Color(0xFF19315B),
          Color(0xFF0D1280),
          Color(0xFFADD27D),
          Color(0xFFBD1528),
          Color(0xFF0D4D89),
          Color(0xFFAC4075),
          Color(0xFFAB933C),
          Color(0xFF7EB741),
          Color(0xFF1C2266),
        ],
      ),
```

MolnarArt 함수의 매개변수 n은 각 그리드 셀에 생성된 이진 코드의 비트 수를 맡습니다. 이 이진 코드는 각 셀의 패턴 구조를 정의하는 데 사용됩니다. 좀 더 구체적으로, 이 이진 코드의 각 비트는 특정 패턴 레이어가 매핑되어야 하는지를 나타냅니다. 예를 들어, n이 12이면 각 그리드 셀에 대해 무작위 12비트 이진 코드가 생성됩니다. 이 코드의 각 비트는 다른 패턴 레이어를 나타냅니다. 비트가 1로 설정되어 있으면 해당 패턴 레이어가 해당 셀에 표시되고, 비트가 0이면 레이어가 표시되지 않습니다.

## ConicGradient

<img src="https://miro.medium.com/v2/resize:fit:324/1*oy61Nehr-KMyZ5tnT6zvsw.gif" />

```js
ConicGradient(
        durationSeconds: 10, // 애니메이션의 지속 시간(초)
        maxDiameter: 1.2, // 그라데이션의 최대 지름
        steps: 10, // 그라데이션의 단계 수
      ),
```

## PulsedCircleGrid

Inspired by Roni Kaufman

![Image](https://miro.medium.com/v2/resize:fit:324/1*I5wdqJfYMHm3mpI7oyF_Cg.gif)

```js
PulsedCircleGrid(
        cellSize: 36, // Size of each grid cell
        marginSize: 72, // Margin around the grid
        circleDiameter: 27, // Diameter of circles
        animationDuration: Duration(seconds: 5), // Animation duration
        numberOfRowsColumns: 12, // Number of rows and columns in the grid
      ),
```

## WaveDotGrid

WaveLineGrid를 사용한 동일한 예시이지만 점 사이에 선이 없는 버전입니다.

![WaveDotGrid](https://miro.medium.com/v2/resize:fit:324/1*-lIFdHQ6m3s4mzeF21mPNg.gif)

```js
WaveDotGrid(
        columns: 15, // 열의 수
        rows: 25, // 행의 수
        locationConstant: 100, // 위치 상수
      ),
```

여기서 각 예시가 모든 기기 크기에서 동일하게 동작하지는 않는다는 점을 강조해야 합니다. 만약 문제가 발생하는 경우 문제를 열어 알려주세요. 라이브러리에 기능이 누락된 것 같다면 Github에서 티켓을 올려주시면 살펴보겠습니다. PR도 환영합니다.

# 다음은 무엇인가요?

더 많은 예제를 추가하여 이 패키지를 개발하고 싶습니다. 이런 종류의 개발은 처음이라서 피드백을 공유해 주시면 감사하겠습니다.
또한 패키지의 개발에 참여해 주시면 더욱 기쁠 것입니다.

## 링크

- 패키지
- GitHub

이 기사를 즐겨 보셨길 바랍니다. 의견을 댓글로 공유해 주세요 ❤️

참, 패키지 개발 권장 사항에 대해 Eugenia님에게 많은 감사를 드립니다
