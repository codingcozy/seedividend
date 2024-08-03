---
title: "다트와 플러터 앱에서 Gemini API 활용하기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Harness the Gemini API in your Dart and Flutter Apps"
link: "https://medium.com/flutter/harness-the-gemini-api-in-your-dart-and-flutter-apps-00573e560381"
---



구글 AI Dart SDK 소개

우리는 Gemini API를 위한 구글 AI Dart SDK 출시를 기쁘게 발표합니다. 새로운 pub.dev 패키지, google_generative_ai, 및 그와 관련된 리소스들은 Dart와 Flutter 앱에 자체 생성형 AI 기반 기능을 구축할 수 있도록 지원합니다. Gemini API와의 통합을 통해 Dart에 국한된 보편적인 방식으로 가능성의 문을 열어줍니다. 안드로이드, iOS, 웹, macOS, Windows 및 Linux용 지능적이고 효율적인 애플리케이션을 단일 코드베이스로 구축하는 많은 가능성을 제시합니다.

구글 AI Dart SDK를 통해 다음을 할 수 있습니다:

- 생성형 AI 기능을 쉽게 통합: 고급 텍스트 생성, 요약, 채팅 등을 최소한의 설정으로 Dart 또는 Flutter 앱에 추가하세요.
- 구글의 가장 능력있고 일반적인 모델 활용: Gemini 모델은 구글의 머신러닝 연구 및 개발에서 나온 것으로, 계속 발전하는 생성형 AI 기능에 액세스할 수 있습니다.
- AI 기반 앱 개발 가속화: SDK가 AI 모델과 상호작용의 복잡성을 처리하므로 앱 로직 및 사용자 경험에 집중할 수 있습니다.
- 크로스 플랫폼 AI 기반 앱 구축: Flutter를 사용하여 데스크톱, 웹, 모바일 애플리케이션에 생성형 AI 기능을 쉽게 만드세요.
- 180개 이상 국가와 영토에서 Gemini API 사용: Gemini API와 Google AI Studio(아래 자세히 설명)을 사용할 수 있는 국가 및 지역의 최신 목록을 확인하세요.

<div class="content-ad"></div>

<img src="/assets/img/HarnesstheGeminiAPIinyourDartandFlutterApps_0.png" />

무엇을 만들 수 있을까요?

저희는 생성적 AI가 앱 및 비즈니스 목표를 달성하는 데 엄청난 잠재력을 지니고 있다고 믿습니다. 그리고 Gemini 모델은 다중 모달(여러 모달리티, 즉 이미지와 텍스트를 포함한 다양한 정보를 처리할 수 있는 능력)이기 때문에 창의적으로 활용할 수 있습니다. 하지만, 일반적으로 앱 개발자들로부터 받는 첫 번째 질문은 무엇을 실제로 Gemini API로 할 수 있는지인데요. Dart나 Flutter 앱에서 다음과 같은 기능을 만들어볼 수 있습니다:

- 텍스트 요약: 긴 기사, 연구 논문 또는 웹사이트 내용을 간결한 요약으로 생성합니다.
- 스마트 챗봇: 더 매력적이고 인간적인 대화 인터페이스를 만들어 사용자 경험을 향상합니다.
- 시각 검색 엔진: 사용자가 이미지를 업로드하면 앱이 Gemini API를 이용하여 이미지 내용, 스타일 및 이미지의 만들기 방법까지 반환합니다.
- 접근성을 위한 이미지 설명: 업로드된 이미지의 자세한 텍스트 설명을 생성하여 시각 장애가 있는 사용자들을 지원합니다.
- 다이어그램 및 차트 해석: 사용자가 다이어그램, 차트 또는 그래프의 이미지를 업로드하면 Gemini API가 데이터의 텍스트 기반 분석과 설명을 제공합니다.

<div class="content-ad"></div>

이 목록은 가능성이 거의 무한하기 때문에 계속될 수 있어요!

![이미지](/assets/img/HarnesstheGeminiAPIinyourDartandFlutterApps_1.png)

시작하기

셋업하는 방법에 대한 자세한 단계별 안내를 보려면 Dart 퀵스타트를 확인해보세요. 대략적으로는 이렇게 할 거에요:

<div class="content-ad"></div>

- Google AI Studio에서 Gemini API 키를 받으세요. 이 키를 안전하게 보관해주세요. 코드에 키를 직접 포함하거나 키를 포함한 파일을 버전 관리 시스템에 업로드하지 않는 것을 강력히 권장합니다. 개발하는 동안에는 flutter run -d [DEVICE NAME] — dart-define=API_KEY=[YOUR API KEY]을 사용하여 API 키를 환경 변수로 사용하여 앱을 에뮬레이터/시뮬레이터에서 실행하는 것이 좋습니다.
- Dart 또는 Flutter 앱에 Google AI Dart SDK를 추가하려면 각각 dart pub add google_generative_ai 또는 flutter pub add google_generative_ai을 실행하세요. 이는 `pubspec.yaml` 파일에 google_generative_ai를 종속성으로 추가합니다.
- 코드에서 생성 모델을 초기화하세요:

```js
import 'package:google_generative_ai/google_generative_ai.dart';

// API 키에 접근하려면 환경 변수로 지정하세요 (위의 첫 번째 단계 참조)
final apiKey = Platform.environment['API_KEY'];
if (apiKey == null) {
  print('No \$API_KEY environment variable');
  exit(1);
}

final model = GenerativeModel(model: 'MODEL_NAME', apiKey: apiKey);
```

4. 이제 Gemini API를 사용하여 다양한 사용 사례를 구현하는 것을 시작할 수 있습니다. 예를 들어, 프롬프트 입력이 텍스트와 이미지를 모두 포함할 때, gemini-pro-vision 모델과 generateContent 메서드를 사용하여 텍스트 출력을 생성하세요:

```js
import 'dart:io';

import 'package:google_generative_ai/google_generative_ai.dart';

void main() async {
  // API 키에 접근하려면 환경 변수로 지정하세요 (위의 첫 번째 단계 참조)
  final apiKey = Platform.environment['API_KEY'];
  if (apiKey == null) {
    print('No \$API_KEY environment variable');
    exit(1);
  }
  // 텍스트와 이미지 입력(다중 모달)의 경우, gemini-pro-vision 모델을 사용하세요
  final model = GenerativeModel(model: 'gemini-pro-vision', apiKey: apiKey);
  final (firstImage, secondImage) = await (
    File('image0.jpg').readAsBytes(),
    File('image1.jpg').readAsBytes()
  ).wait;
  final prompt = TextPart("What's different between these pictures?");
  final imageParts = [
    DataPart('image/jpeg', firstImage),
    DataPart('image/jpeg', secondImage),
  ];
  final response = await model.generateContent([
    Content.multi([prompt, ...imageParts])
  ]);
  print(response.text);
}
```

<div class="content-ad"></div>

제바이민 애플리케이션 섹셩은 다트 패드에 있는 샘플 앱을 통해 SDK를 사용하는 다양한 사용 사례에 대한 상세 가이드와 예제를 살펴볼 수 있습니다. 다트 패드는 다트와 플러터 코드를 작성할 수 있는 무료 오픈 소스 온라인 편집기이며 이제 플러터로 구축되었습니다. 제너레이티브-ai-다트 깃허브 저장소에서 문제를 신고하거나 기능 요청에 대해 알려주시면 감사하겠습니다.

구글 AI 스튜디오는 제너레이티브 모델을 프로토타이핑하는 브라우저 기반 IDE입니다. 이를 사용하여 사용 사례에 대한 프롬프트를 빠르게 개발하고 앱 개발에 사용할 API 키를 취득할 수 있습니다. 구글 계정으로 로그인하여 Google AI 스튜디오에 액세스하고 무료 할당량을 통해 1분당 60개 요청을 처리할 수 있습니다. 무료 할당량을 사용할 때 제너레이티브-ai-다트 깃허브 저장소에 학습된 리뷰어에게 액세스할 수 있도록 Google AI 스튜디오의 입력 및 출력이 노출될 수 있습니다. 이 데이터는 구글 계정과 API 키에서 식별할 수 없게 처리됩니다.

공지 사항을 기다려주십시오. Google AI 스튜디오에 다트가 추가될 예정이며, 이를 통해 "코드 가져오기"를 클릭한 다음 새 다트 탭을 선택하고 (기존 지원되는 언어 옆에 표시될 예정) 다트 코드를 "복사"하여 작업을 IDE로 전송할 수 있습니다.

<div class="content-ad"></div>

![이미지](/assets/img/HarnesstheGeminiAPIinyourDartandFlutterApps_2.png)

만들어 보신 것을 공유해 주세요!

LeanCode팀처럼 Gemini API를 사용해 arb_translate를 만든 개발자들처럼 어떤 것을 만드시는지 기대됩니다. 이 패키지는 개발자들이 플러터 앱의 로컬라이제이션을 간편하게 하는 언어 번역을 자동화하기 위해 Gemini API를 사용하고 있습니다.

무엇을 만들고 계신지 알려주시려면 트위터/X에서 해시태그 #BuildWithGemini를 사용해 주세요!
