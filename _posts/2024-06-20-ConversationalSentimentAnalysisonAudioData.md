---
title: "오디오 데이터에 대한 대화형 감정 분석"
description: ""
coverImage: "/assets/img/2024-06-20-ConversationalSentimentAnalysisonAudioData_0.png"
date: 2024-06-20 04:41
ogImage:
  url: /assets/img/2024-06-20-ConversationalSentimentAnalysisonAudioData_0.png
tag: Tech
originalTitle: "Conversational Sentiment Analysis on Audio Data"
link: "https://medium.com/datadriveninvestor/conversational-sentiment-analysis-on-audio-data-3142a874e327"
isUpdated: true
---

<img src="/assets/img/2024-06-20-ConversationalSentimentAnalysisonAudioData_0.png" />

감성 분석 또는 의견 분석은 자연어 처리(NLP)에서 널리 사용되는 작업입니다. NLP 기술을 텍스트 데이터에 특히 적용하는 맥락에서, 주요 목표는 주어진 텍스트를 다양한 감성 클래스에 분류할 수 있는 모델을 훈련하는 것입니다. 감성 분류기의 고수준 개요는 아래 이미지에 나와 있습니다.

<img src="/assets/img/2024-06-20-ConversationalSentimentAnalysisonAudioData_1.png" />

예를 들어, 세 가지 클래스 분류 문제의 클래스는 긍정적, 부정적 및 중립일 수 있습니다. 세 가지 클래스의 감성 분석 문제의 예는 인기 있는 Twitter 감성 분석 데이터 세트입니다. 이 데이터는 트위터 사용자들이 게시한 다국어 트윗에 대한 Entity-level 감성 분석 작업입니다.

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

과거의 자연어처리(NLP) 연구 및 개발 대부분은 주로 텍스트에 감성 분석을 적용하는 데 중점을 두었습니다. 그러나 최근에는 사용자들 사이에서 음성 기반 상호 작용 도구의 대규모 채택과 인기를 볼 수 있었으며, 이는 연구자들과 기관들을 음성 영역에서 감성 분류기를 구축하도록 이끕니다.

따라서 이 게시물에서는 AssemblyAI API와 Python을 사용하여 대화 데이터에 감성 분석 시스템을 구축하는 방법을 보여줄 것입니다. 이 종단 간 시스템은 엄격한 고객 지원 및 피드백 평가와 관련이 있는 영역에서 광범위한 적용 가능성을 지니며, 특히 음성 도메인에서 중요하고 가치 있는 문제를 해결하는 데 도움이 됩니다. 마지막으로 얻은 결과물을 이해하기 쉽게 향상시키고 데이터에서 적절한 통찰을 얻기 위한 분석을 보여줄 것입니다.

이 글의 코드는 여기에서 찾을 수 있습니다. 게시물의 주요 내용은 다음과 같습니다:

- 대화형 오디오 데이터에 대한 감성 분석
- 감성 분석 결과
- 감성 분석 통찰력

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

# 대화 오디오 데이터에 대한 감정 분석

이 섹션에서는, 녹음된 음성 대화 조각에서 개별 문장을 세 가지 감정 클래스로 분류하는 AssemblyAI API의 사용을 보여드리겠습니다: 긍정적, 부정적 및 중립적.

![이미지](/assets/img/2024-06-20-ConversationalSentimentAnalysisonAudioData_2.png)

## 단계 1: 요구 사항 설치

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

감정 분류기를 구축하는 데 필요한 요소가 매우 적습니다. Python 라이브러리 관점에서 requests 패키지만 필요합니다. 아래와 같이 수행할 수 있습니다:

```js
pip install requests
```

## 단계 2: API 토큰 생성

다음 단계는 AssemblyAI 웹사이트에 계정을 생성하는 것입니다. 이 과정은 무료로 진행할 수 있습니다. 계정을 생성하면 프라이빗 API 액세스 키를 받게 되는데, 이것을 사용하여 음성을 텍스트로 변환하는 모델에 접근할 것입니다.

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

## 단계 3: 오디오 파일 업로드

이 튜토리얼의 목적을 위해, 두 사람 간의 미리 녹음된 오디오 대화를 사용하여 감정 분석을 수행하겠습니다. API 키를 획득하셨다면, 미리 녹음된 오디오 파일에 대한 감정 분류 작업을 진행할 수 있습니다.

그러나 그 전에, 오디오 파일을 업로드하여 URL을 통해 액세스할 수 있도록 해야 합니다. AWS S3 버킷에 업로드하거나 SoundCloud 또는 AssemblyAI의 셀프-호스팅 서비스와 같은 오디오 호스팅 서비스에 업로드하는 옵션이 있습니다. 저는 오디오 파일을 SoundCloud에 업로드하여 아래에서 액세스할 수 있도록 했습니다.

만약 AssemblyAI의 호스팅 서비스에 오디오 파일을 직접 업로드하고 싶다면, 그것도 가능합니다. 저는 코드 블록 안에서 이 단계별 절차를 보여드렸습니다.

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

## 단계 3.1: 요구 사항 가져오기

프로젝트에 필요한 요구 사항을 가져오는 것으로 시작합니다.

## 단계 3.2: 파일 위치 및 API 키 지정

다음으로, 로컬 컴퓨터에서 오디오 파일의 위치와 가입 후 얻은 API 키를 지정해야 합니다.

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

## 단계 3.3: 업로드 엔드포인트 지정

- 엔드포인트: 여기서 사용할 서비스인 "upload" 서비스를 지정합니다.
- 헤더: API 키 및 콘텐츠 유형을 보유합니다.

## 단계 3.4: 업로드 함수 정의

오디오 파일은 한 번에 5 MB(5,242,880 바이트)까지만 업로드할 수 있습니다. 따라서 데이터를 청크 단위로 업로드해야 합니다. 이후에 서비스 엔드포인트에서 이들을 합칩니다. 따라서 많은 URL을 처리할 필요가 없어집니다.

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

## 단계 3.5: 업로드

마지막 단계는 POST 요청을 호출하는 것입니다. POST 요청의 응답은 오디오 파일의 업로드 URL을 보유한 JSON입니다. 이 URL을 사용하여 오디오의 감정 분류를 실행하는 다음 단계에 사용할 것입니다.

## 단계 4: 감정 분석

이제 이 단계에서 오디오 파일에 대해 감정 분석 작업을 수행하기 위한 필요한 모든 전제조건을 충족했습니다. 이제 우리는 API를 호출하여 원하는 결과를 가져오는 것으로 계속할 수 있습니다. 이는 아래 소목록에서 설명되는 2단계 프로세스입니다.

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

## 단계 4.1: 전사용 파일 제출

첫 번째 단계는 HTTP POST 요청을 호출하는 것입니다. 이는 기본으로 실행되는 AI 모델에 오디오 파일을 보내 전사를 위임하고, 전사된 텍스트에 대해 감정 분석을 수행하도록 지시하는 것입니다.

POST 요청에 전달되는 인수는 다음과 같습니다:

- endpoint: 호출할 전사 서비스를 지정합니다.
- json: 오디오 파일의 URL을 audio_url 키로 포함합니다. 대화 데이터에 대한 감정 분석을 수행하려면 sentiment_analysis 플래그와 speaker_labels를 True로 설정합니다.
- headers: 허가 키와 콘텐츠 유형을 보유합니다.

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

포스트 요청의 현재 상태는 JSON 응답으로 받았을 때 대기 중인 상태입니다. 이는 현재 오디오가 변환 중임을 나타냅니다.

또한, JSON 응답에서 sentiment_analysis 플래그도 True로 나와 있습니다. 그러나 sentiment_analysis_results 키에 해당하는 값은 상태가 대기 중이기 때문에 None입니다.

## 단계 4.2: 변환 결과 가져오기

POST 요청의 상태를 확인하려면 위에서 받은 JSON 응답의 id 키를 사용하여 GET 요청을 해야 합니다.

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

다음으로, 아래 코드 블록에 나와 있는 것처럼 GET 요청을 진행할 수 있습니다.

GET 요청에 전달되는 인수는 다음과 같습니다:

- endpoint: 이는 호출된 서비스를 지정하며 id 키를 사용하여 결정된 API 호출 식별자를 나타냅니다.
- headers: 이는 귀하의 고유한 API 키를 보유합니다.

여기서 중요한 점은 상태 키가 completed로 변경될 때까지 전사 결과가 준비되지 않는다는 것입니다. 전사에 걸리는 시간은 입력 오디오 파일의 길이에 따라 다릅니다. 따라서 전사 상태를 확인하기 위해 규칙적인 간격으로 반복적인 GET 요청을 수행해야 합니다. 이를 위한 간단한 방법을 아래 구현하였습니다:

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

# 감정 분석 결과

일단 상태가 완료로 변경되면 아래와 유사한 응답을 받게 될 것입니다.

- JSON 응답에서의 상태가 완료로 표시됩니다. 이는 오디오 전사에 오류가 없었음을 나타냅니다.
- 텍스트 키에는 입력 오디오 대화의 전체 전사가 포함되어 있으며, 총 22개 문장이 포함됩니다.
- 오디오 파일은 여러 화자로 구성되어 있기 때문에, 단어 키 내의 모든 화자 키를 Not Null로 볼 수 있습니다. 화자 키는 "A" 또는 "B"일 수 있습니다.
- 모든 개별 단어와 전체 전사 텍스트에 대한 확신 점수를 볼 수 있습니다. 이 점수는 0부터 1까지 범위를 가지며, 0이 가장 낮고 1이 가장 높습니다.
- 오디오의 각각 22개 문장에 대한 감정 분석 결과는 JSON 응답의 sentiment_analysis_results 키를 사용하여 액세스할 수 있습니다.
- 각 문장에 대응하여, 4번 항목과 유사한 확신 점수를 얻을 수 있습니다.
- 각 문장의 감정은 문장 사전의 sentiment 키를 사용하여 검색할 수 있습니다. 두 번째 문장에 대한 감정 분석 결과가 아래에 표시되어 있습니다:

# 감정 분석 인사이트

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

JSON은 보통 읽고 해석하기 어렵습니다. 그래서 데이터를 시각적으로 보기 좋게 만들고 추가 분석을 수행하기 위해 위의 감정 분석 결과를 DataFrame으로 변환합시다. 우리는 문장의 텍스트, 지속 시간, 스피커, 그리고 문장의 감정을 저장할 것입니다. 이를 아래에서 구현하겠습니다:

위 코드 스니펫으로 생성된 DataFrame은 아래 이미지에 표시됩니다. 여기서 대화 중 발화된 22개의 문장과 해당하는 스피커 레이블("A"와 "B"), 문장의 지속 시간(초), 그리고 모델이 예측한 문장의 감정이 포함되어 있습니다.

<img src="/assets/img/2024-06-20-ConversationalSentimentAnalysisonAudioData_3.png" />

## #1 스피커 분포

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

각 화자가 말한 문장 수는 아래와 같이 value_counts() 메소드를 사용하여 계산할 수 있습니다:

화자들의 백분율 분포를 보려면 다음과 같이 value_counts() 메소드에 normalize = True를 전달할 수 있습니다:

“A”와 “B” 두 화자 모두 문장 수 측면에서 대화에 동등하게 기여했습니다.

## #2 화자 지속 시간 분포

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

다음으로 대화 참가자 각각의 기여도를 계산해 봅시다. 아래에서 확인할 수 있습니다:

groupby() 메서드를 사용하여 각 발화자의 발화 시간을 총합하여 계산했습니다. 발화 시간 측면에서 발화자 A가 우세한 발화자입니다.

## #3 감정 분포

대화 중 총 22문장 중 부정 감정으로 분류된 문장은 3개뿐이었습니다. 또한 양의 감정으로 분류된 문장은 없었습니다.

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

정규화된 분포는 다음과 같이 계산할 수 있습니다:

## 스피커 레벨에서 #4 감정 분포

마지막으로, 개별 스피커 간의 감정 분포를 계산해 봅시다. 여기서는 groupby() 메서드 대신 더 나은 시각화를 위해 crosstab()을 사용할 것입니다. 아래에서 이를 시연합니다:

"A" 스피커가 한 부정적 문장의 비율이 "B" 스피커보다 더 많았습니다.

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

## #5 감정 수준별 평균 문장 지속 시간

마지막으로, 우리는 개별 감정 클래스에 속하는 문장의 평균 지속 시간을 계산할 것입니다. 이는 아래의 groupby() 메서드를 사용하여 구현되었습니다:

부정적인 문장의 평균 지속 시간은 중립 문장보다 작습니다.

마무리로, 이 글에서는 AssemblyAI API의 특정 NLP 사용 사례에 대해 논의했습니다. 구체적으로, 여러 화자로 구성된 미리 녹음된 오디오 파일에서 감정 분류 모듈을 구축하는 방법을 살펴보았습니다. 마지막으로, 감정 분석 결과에 대해 철저한 분석을 수행했습니다. API로부터 얻은 결과는 입력 오디오 파일의 22개의 개별 문장의 감정을 강조했습니다.

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

이 글의 코드는 여기서 찾을 수 있어요.

다음 게시물에서는 어셈블리 AI API의 더 많은 사용 사례에 대해 논의할 거예요. Entity Detection, Content Moderation 등 기술적, 실용적 관점에서 더 자세하게 다루겠습니다.

다음에 또 봐요. 읽어 주셔서 감사해요.

🚀 매일 뉴스레터를 구독하면 320개 이상의 글이 실린 데이터 과학 PDF(550페이지)를 무료로 받을 수 있어요:

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

<table>
  <img src="https://miro.medium.com/v2/resize:fit:1400/0*QXJuDEr_pCNDtj4D.gif" />
</table>

DDI 중간 게시글 바닥 링크(DDI)

DataDrivenInvestor.com에서 방문하세요

DDIntel을 여기에서 구독하세요.

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

주요 기사:

여기서 우리의 창조자 생태계에 참여하세요.

DDI 공식 텔레그램 채널: [https://t.me/+tafUp6ecEys4YjQ1](https://t.me/+tafUp6ecEys4YjQ1)

LinkedIn, Twitter, YouTube, 그리고 Facebook에서 팔로우해보세요.
