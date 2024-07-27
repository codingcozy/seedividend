---
title: "오디오 데이터에 대한 명명된 개체 인식Named Entity Recognition 수행하기"
description: ""
coverImage: "/assets/img/2024-06-20-PerformingNamedEntityRecognitiononAudioData_0.png"
date: 2024-06-20 05:02
ogImage: 
  url: /assets/img/2024-06-20-PerformingNamedEntityRecognitiononAudioData_0.png
tag: Tech
originalTitle: "Performing Named Entity Recognition on Audio Data"
link: "https://medium.com/datadriveninvestor/performing-named-entity-recognition-on-audio-data-73f45c1b9739"
---


![이미지](/assets/img/2024-06-20-PerformingNamedEntityRecognitiononAudioData_0.png)

이 Deepnote Notebook에서이 문서에 대한 코드를 찾을 수 있습니다.

Named Entity Recognition (또는 NER)은 주어진 정보에서 실제 세계 개체를 식별하는 작업으로 정의됩니다. NER은 자연어 처리 (NLP) 기술을 사용하여 해결되는 기계 학습에서 인기있는 작업입니다. 텍스트 데이터의 경우, 목적은 주어진 텍스트를 이해하고 실제 세계 개체를 참조하는 단어를 식별하고 추출할 수 있는 모델을 교육하는 것입니다. 이러한 실제 세계 개체는 Named Entities로도 불립니다.

NER 시스템의 고수준 개요는 아래 이미지에 표시되어 있습니다.

<div class="content-ad"></div>

![이미지](/assets/img/2024-06-20-PerformingNamedEntityRecognitiononAudioData_1.png)

자연어 처리(NLP) 연구 커뮤니티에서는 텍스트 데이터에 대한 NER에 대해 다양한 접근 방식을 제안해 왔습니다. 이 도메인에서 가장 많이 실험된 데이터셋은 CoNLL 2003과 OntoNotes 데이터셋입니다. 그러나 최근에는 음성 기반 상호 작용 도구의 널리 퍼진 채택으로 인해 연구자와 기관들이 음성 공간에서 NER 시스템을 탐구하고 구축하는 모습을 볼 수 있었습니다.

따라서 본 게시물에서는 AssemblyAI API 및 Python을 사용하여 음성 데이터에서 Named Entity Recognition 시스템을 구축하는 방법을 보여드리겠습니다. 이 통합 시스템은 엄격한 언어 이해, 요약 및 키워드 추출에 광범위하게 적용되며 특히 음성 도메인에서 해결해야 할 중요하고 가치 있는 문제로 여겨집니다. 이 게시물을 종합분석하여 얻은 결과를 해석하고 데이터로부터 적절한 통찰을 얻을 수 있도록 하겠습니다.

이 게시물에 대한 코드는 여기에서 찾을 수 있습니다. 게시물의 하이라이트는 다음과 같습니다:

<div class="content-ad"></div>

오디오 데이터의 엔터티 탐지
엔터티 탐지 결과
엔터티 탐지 인사이트

시작해 봅시다 🚀!

# 오디오 데이터의 엔터티 탐지

이 섹션에서는 미리 녹음된 오디오 파일에서 명명된 엔터티를 식별하고 추출하기 위해 AssemblyAI API를 사용하는 방법을 보여드리겠습니다. 더 나아가, 추출된 엔터티는 "런던"과 같이 위치로 분류되는 방식과 유사하게 개인, 위치, 조직, 날짜, 이벤트, 직업 등과 같은 해당 엔터티 클래스로 분류될 것입니다.

<div class="content-ad"></div>

<img src="/assets/img/2024-06-20-PerformingNamedEntityRecognitiononAudioData_2.png" />

## 단계 1: 요구 사항 설치

어셈블리AI API를 로컬 머신에서 호출하고 entity detection 모듈 및 entity classifier를 빌드하려면 Python의 requests 패키지가 필요합니다. 다음과 같이 설치할 수 있습니다:

```js
pip install requests
```

<div class="content-ad"></div>

## 단계 2: API 토큰 생성하기

다음 단계는 AssemblyAI의 음성 대 텍스트 모델에 액세스하기 위한 API 키를 받는 것입니다. 무료로 AssemblyAI 웹 사이트에서 계정을 만들어 이 작업을 수행할 수 있습니다.

## 단계 3: 오디오 파일 업로드

전사 및 명명된 엔티티를 추출할 오디오 파일은 URL을 통해 액세스할 수 있어야 합니다. 따라서 음성 대 텍스트 모델을 호출하기 전에 오디오 파일을 파일 호스팅 서비스에 업로드해야 합니다. 옵션으로는 AWS S3 버킷, SoundCloud와 같은 오디오 호스팅 서비스, 그리고 AssemblyAI의 자체 호스팅 서비스 등이 있습니다. 이번 튜토리얼에서는 오디오 파일을 SoundCloud에 업로드했습니다.

<div class="content-ad"></div>

## 단계 4: Entity 감지 및 분류 수행하기

이제 이 단계에서 오디오 파일에서 엔티티를 감지하기 위한 모든 필수 사전 요구사항을 충족했습니다. 이제 API를 호출하여 명명된 엔티티를 추출할 수 있습니다. 이는 아래 절에서 보다 상세히 설명한 두 단계 프로세스입니다.

## 단계 4.1: 전사를 위해 파일 제출하기

첫 번째 단계는 HTTP Post 요청을 사용하여 음성 파일을 트리거하여 텍스트 모델을 활성화하는 것입니다. POST 요청은 오디오 파일을 audio_url로 사용하고 entity_detection 플래그를 사용하여 명명된 엔티티 인식을 수행하도록 모델에 지시합니다. 오디오 파일에는 여러 화자가 포함되어 있기 때문에 speaker_labels 플래그를 True로 설정했습니다.

<div class="content-ad"></div>

수신된 JSON 응답에 따르면, 포스트 요청의 상태가 대기 중인 것을 나타내며, 파일이 전사 대기열에 있는 것을 의미합니다.

뿐만 아니라, JSON 응답에 entity_detection 플래그도 True인 것으로 나타납니다. 그러나 entities 키에 해당하는 값은 현재 대기 중인 상태이기 때문에 None입니다.

## 단계 4.2: 전사 결과 가져오기

우리의 POST 요청 상태를 확인하고 전사 결과를 보려면, 위에서 수신한 JSON 응답의 id 키를 사용하여 GET 요청을 해야 합니다. 우리는 POST 요청에서 받은 response_id를 전사 상태를 확인하기 위해 전달합니다.

<div class="content-ad"></div>

# Entity Detection Results

상태가 완료로 변경되면 아래와 유사한 응답을 받게 됩니다.

- JSON 응답에서 상태를 완료로 확인합니다. 이는 오디오의 정상적인 전사를 나타냅니다.
- 텍스트 키에는 스피커 수준의 구분 없이 입력 오디오 파일의 전사가 문자열로 포함됩니다. 총 문장 수는 12개입니다.
- 오디오 파일은 여러 목소리로 구성되어 있기 때문에 단어 키 내에서 모든 스피커 키를 Not Null로 볼 수 있습니다. 스피커 키는 "A" 또는 "B"입니다.
- 확신 점수는 모델이 개별 단어와 전체 전사 텍스트를 전사하는 데 대한 확신도를 나타냅니다. 이는 0에서 1까지의 범위로, "0"이 가장 낮고 "1"이 가장 높습니다.
- 오디오의 각각의 12개 문장에서 감지된 엔터티에 액세스하려면 JSON 응답의 entities 키를 사용할 수 있습니다.
- 오디오 파일에서 식별된 엔터티 수는 17개입니다.
- 각 엔터티에 대응하여 감지된 엔터티의 카테고리를 나타내는 entity_type을 얻을 수 있습니다.

# Entity Detection Insights

<div class="content-ad"></div>

JSON은 일반적으로 읽고 해석하기 어려운 편이기 때문에, 위의 엔티티 감지 결과를 DataFrame으로 변환하여 데이터를 시각적으로 보기 좋게 만들 수 있습니다. 이렇게 하면 추가적인 분석을 효과적으로 수행하는 데 도움이 될 것입니다. 우리는 텍스트, 문장의 지속 시간, 화자, 그리고 문장의 엔티티 수를 저장할 것입니다. 이를 아래 코드로 구현하였습니다:

위의 코드 스니펫으로 생성된 DataFrame은 아래 이미지에 나와 있습니다. 여기에는 오디오 파일에서 발화된 12개의 문장이 포함되어 있고, 해당 화자 레이블("A" 및 "B"), 문장의 지속 시간(초), 그리고 문장의 엔티티 수를 나타내는 필드가 포함되어 있습니다.

![DataFrame](/assets/img/2024-06-20-PerformingNamedEntityRecognitiononAudioData_3.png)

다음으로, 오디오 파일에서 식별된 엔티티를 취하는 또 다른 DataFrame을 생성합니다. 이는 아래의 코드 블록을 따라 구현되었습니다:

<div class="content-ad"></div>

<img src="/assets/img/2024-06-20-PerformingNamedEntityRecognitiononAudioData_4.png" />

## #1 Speaker-Sentence distribution

먼저, 오디오 파일에서 각 화자가 말한 문장의 수를 계산해 봅시다. 아래와 같이 value_counts() 메서드를 사용하여 이 작업을 수행할 수 있습니다.

각 화자의 분포를 백분율로 표시하려면 value_counts() 메서드에 normalize=True를 전달하면 됩니다.

<div class="content-ad"></div>

## #2 발화자별 시간 분포

이제 개별 발화자들의 총 발화 시간을 찾아봅시다. 아래에서 확인할 수 있습니다:

groupby() 메서드를 사용하여 개별 문장의 지속 시간을 합산하여 총 지속 시간을 계산합니다. 발화자 "B"가 지속 시간 측면에서 우세한 발화자입니다.

## #3 발화자 엔터티-카운트 분포

<div class="content-ad"></div>

오디오 파일에서 총 17개의 엔티티가 언급되었는데, 그 중 9개는 "A" 스피커에 의해 발화되었고 나머지는 "B" 스피커가 발화했습니다.

## #4 엔티티 유형 분포

다음으로, 오디오 파일에서 발화된 개별 엔티티 유형의 분포를 분석해 보겠습니다. 아래에서 value_counts() 메서드를 사용하여 이를 구현했습니다:

## #5 스피커-엔티티 유형 분포

<div class="content-ad"></div>

마지막으로, 각 화자가 말한 각 Entity 유형의 수를 평가해 봅시다. 여기서는 groupby() 메소드 대신 시각화를 위해 crosstab()을 사용할 것입니다. 아래에서 이를 보여드리겠습니다:

이렇게 말씀드리면, 이 게시물에서는 AssemblyAI API를 사용하여 사전 녹음된 오디오 파일에서 Named Entity Recognition 모듈을 구축했습니다. 마지막으로, 감지된 Entity들에 대한 철저한 분석을 수행했습니다. API에서 얻은 결과는 입력 오디오 파일의 12개 개별 문장 내에서 식별된 17개 Entity를 강조했습니다.

독서해 주셔서 감사합니다!

🚀 내 매일 뉴스레터를 구독하시면 550페이지 이상의 무료 데이터 과학 PDF와 320편 이상의 게시물을 받아 보실 수 있습니다:

<div class="content-ad"></div>

<img src="https://miro.medium.com/v2/resize:fit:1400/0*gtA9qrsOn5ZsnBXW.gif" />

DataDrivenInvestor.com에서 저희를 방문해주세요.

DDIntel을 여기서 구독하세요.

주요 기사:

<div class="content-ad"></div>

우리의 창조자 생태계에 참여해보세요.

DDI 공식 텔레그램 채널: [https://t.me/+tafUp6ecEys4YjQ1](https://t.me/+tafUp6ecEys4YjQ1)

LinkedIn, Twitter, YouTube, 그리고 Facebook에서 팔로우해주세요.