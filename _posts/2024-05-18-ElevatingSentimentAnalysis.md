---
title: "인공지능으로 감정 분석 성능 높이기"
description: ""
coverImage: "/assets/img/2024-05-18-ElevatingSentimentAnalysis_0.png"
date: 2024-05-18 21:33
ogImage:
  url: /assets/img/2024-05-18-ElevatingSentimentAnalysis_0.png
tag: Tech
originalTitle: "Elevating Sentiment Analysis"
link: "https://medium.com/@seandearnaley/elevating-sentiment-analysis-ad02a316df1d"
isUpdated: true
---

## Unsloth를 사용하여 LLaMA-3 8B를 세밀하게 조정하기

# 소개

Meta의 LLaMA-3 8B와 같은 오픈 소스 대형 언어 모델(LLM)은 80억 개의 매개 변수를 갖고 있어 감정 분석과 같은 복잡한 언어 작업에 대처하기 위해 설계되었습니다. 본 기사에서는 Unsloth를 사용하여 금융 감정 분석을 위해 LLaMA-3 8B를 세밀하게 조정하는 방법을 살펴봅니다. 이 안내서는 사용자가 사용자 정의 데이터 세트를 만들고 모델을 세밀하게 조정하며 그 성능을 평가하는 데 도움이 될 것입니다.

## 학습 결과

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

- LLaMA-3 8B 개요: LLaMA-3 8B 모델의 뛰어난 기능과 이점, 그리고 세밀조정 양자화 성능 주변의 논란을 이해하세요.
- 사용자 지정 데이터셋: 공개 데이터와 합성 결과를 혼합하여 데이터셋을 구축하는 방법을 배우세요. 대규모 생성을 위한 코드에 대해 실습해 보세요.
- 세밀조정 워크플로우: Unsloth 노트북을 사용하여 감성 분석 모델을 세밀조정하는 과정을 마스터하세요. 설정부터 실행까지 체험해 보세요.
- GGUF 내보내기: 일반 그래프 유니버셜 포멧 (GGUF)으로 내보내는 방법을 알아보고, 성능을 향상시키고 배포를 간단하게 하는 방법을 발견하세요.
- Ollama 배포: Ollama에서 사용자 지정 GGUF 모델을 효율적으로 추론해 보세요. 성능을 향상시키기 위한 전문적인 프롬프팅 기술을 탐구하세요.
- 성능 통찰: 제공된 Python 스크립트를 사용하여 다른 세밀조정된 모델을 비교하세요. 최상의 구성 설정을 찾기 위해 성능을 객관적으로 평가하세요.
- 평가: Mistral 7b 및 Dolphin-Mistral 7b 2.8와 같은 양자화 및 모델간의 차이를 제시하고 측정하세요.
- 이상 감지: 철저한 평가를 통해 이상을 발견하고 해결하는 방법을 배우세요. 모델의 신뢰성을 보장하세요.

이제 함께 문서에 다가가서 오늘 제공되는 가장 고급 오픈 소스 언어 모델 중 하나를 활용하여 감성 분석 능력을 향상시켜봅시다.

## 세밀조정 이해

세밀조정은 미리 훈련된 모델을 특정 작업이나 데이터셋에 맞게 조정하여 성능과 특정 응용 프로그램에 대한 적합성을 향상시키는 프로세스입니다. LLaMA-3 8B와 같은 대규모 언어 모델(LLM)의 맥락에서 세밀조정은 모델을 더 작고 작업별 데이터셋에 다시 훈련시킴으로써 감성 분석과 같은 작업에 특화되도록 하는 과정을 말합니다. 이는 모델의 매개변수를 조정하여 새로운 데이터의 미묘한 점을 더 잘 포착할 수 있도록 하는 것으로 달성됩니다. 세밀조정은 사전 훈련된 모델의 강점을 활용하면서도 특정 요구 사항을 충족시키기 위해 모델을 맞춤화하는데 큰 도움이 될 수 있습니다. 이 문서에서는 Unsloth를 사용하여 LLaMA-3 8B의 세밀조정과정에 대해 탐구하며, 특히 금융 분야에서의 감성 분석 성능 향상을 보여줄 것입니다.

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

## 금융 분야에서 감성 분석 적용하기

금융 분야에서의 감성 분석은 뉴스 기사, 소셜 미디어 게시물 및 기타 텍스트를 분석하여 특정 주식이나 시장 전반에 대한 시장 감정을 파악하는 것을 의미합니다. 긍정적, 부정적 또는 중립적 톤을 식별함으로써 투자자들은 대중의 인식과 시장 트렌드에 대한 통찰력을 얻을 수 있습니다. 예를 들어, 특정 회사의 수익과 혁신에 대한 지속적인 긍정적인 뉴스는 해당 주식 가격의 상승을 시사할 수 있으며, 부정적인 감정은 하락을 나타낼 수 있습니다. 이 기술은 자연어 처리를 사용하여 질적 데이터를 양적 신호로 변환하여 결정력 있는 의사결정 및 전략적 투자 계획을 돕습니다.

## Meta의 LLaMA-3 8B: 개요

Meta LLaMA 3 8B는 Meta AI가 개발한 80억 개의 파라미터를 갖춘 최첨단 언어 모델입니다. LLaMA 3 가족의 일부로, 다양한 자연어 처리 작업을 위한 사전 훈련 및 명령 조정된 버전을 포함하고 있습니다. 이 모델은 최적화된 트랜스포머 아키텍처, 그룹화 쿼리 어텐션(GQA) 및 더 큰 어휘를 갖춘 새로운 토크나이저를 특징으로 하여 효율성과 멀티언어 기능을 향상시켰습니다. 상업 및 연구용으로 설계된 LLaMA 3 8B는 대화 생성, 추론 및 코드 생성에 뛰어나며, 소비자용 하드웨어에 배포할 수 있습니다.

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

<img src="/assets/img/2024-05-18-ElevatingSentimentAnalysis_0.png" />

# 개요

본 문서는 세 가지 주요 섹션으로 나누어져 있습니다. 각 섹션은 섬세 조정 과정에서 중요한 단계를 대표합니다:

- 데이터셋 구축: 먼저 공개 소스에서 데이터를 수집하고 표준화된 형식으로 변환합니다. 이는 데이터를 정리, 정규화 및 구조화하여 일관성과 신뢰성을 보장하기 위한 것입니다. 이외에 우리는 큰 언어 모델 (LLaMA 3 70b와 GPT-4 Turbo)을 활용하여 합성 데이터셋을 생성하여 교육 데이터의 다양성과 양을 향상시킵니다.
- 세밀 조정: Unsloth 라이브러리를 사용하여 준비된 데이터셋으로 선택한 기본 모델을 섬세 조정합니다. Unsloth는 훈련 과정을 최적화하여 높은 정확도를 유지하면서 메모리 사용량과 훈련 시간을 크게 줄입니다.
- 테스트: 포괄적인 테스트 단계에서 성능을 측정하고 이상 현상을 식별하기 위해 여러 번 반복합니다. 결과를 평가하기 위해 통계 분석을 사용하여 fine-tuned 모델이 성능 기준을 충족하는지 확인합니다. 이 단계는 모델의 강점과 개선 영역을 이해하고 행동과 정확도에 대한 가치 있는 통찰을 제공함으로써 모델을 이해하는 데 도움이 됩니다.

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

# 데이터셋 만들기

이 섹션에서는 다양한 스크립트를 사용하여 포괄적인 감성 분석 데이터셋을 구축하는 과정을 안내해 드리겠습니다. 각 단계에서는 다른 유형의 데이터를 처리하고 결합하여 기계 학습 모델에서 사용할 수 있도록 준비합니다. 각 스크립트의 개요와 중요한 기능을 강조하여 제공할 것입니다.

우리는 데이터셋을 준비하기 위해 단계별로 분할된 다양한 도구가 있는 코드 리포를 소유하고 있습니다. 해당 코드는 GitHub에서 찾을 수 있습니다.

완성된 데이터셋은 41.4k개의 레코드가 포함되어 있으며 HuggingFace에서 다운로드할 수 있습니다.

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

우리는 세 가지 다른 공개 데이터 세트에서 데이터를 수집합니다. 단계 1은 항공사 심정 데이터 세트에서 트윗을 처리하고, 단계 2는 금융 문구 은행에서 감정 분석을 처리하며, 단계 3은 newsdata.io에서 기사를 처리합니다. 각 단계는 데이터를 원하는 형식으로 변환하기 위해 고유한 전략이 필요합니다. 예를 들어 자신감 수준에 대한 가정을 만들고, 더 큰 언어 모델을 사용하여 뉴스 기사의 감정 레코드를 종합합니다. 이 접근법을 통해 더 많은 데이터를 수집하고, 더 큰 모델의 일반화 능력을 활용하여 효과적으로 감정 분석을 수행할 수 있습니다.

## 단계 1: 트윗 처리

파일: step-01-process_tweets.py

이 스크립트는 항공사 심정 관련 트윗 데이터 세트를 처리하고, 결과를 새로운 CSV 파일에 저장합니다.

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

- 감정 매핑: 감정 레이블 (positive, neutral, negative)을 숫자 값 (1.0, 0.0, -1.0)으로 매핑합니다.
- 데이터 처리: 입력 CSV를 읽어 각 트윗을 처리하여 감정을 추출하고, 감정, 확신 및 이유를 포함한 JSON 객체를 구성합니다.
- 출력: 처리된 데이터를 문장 및 JSON 객체가 있는 새 CSV 파일에 저장합니다.
- 데이터셋 출처

## 단계 2: 금융 PhraseBank 처리

파일: step-02-process_financial_phrase_bank.py

이 스크립트는 금융 PhraseBank 데이터셋을 처리하고, 금융 뉴스 구절을 포함하며 출력을 CSV 파일에 저장합니다.

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

- 신뢰 점수: 감정 주석의 합의 수준에 따라 다른 신뢰 점수를 할당합니다.
- 감정 매핑: 트윗 스크립트와 유사하게, 감정 레이블을 숫자 값에 매핑합니다.
- 데이터 처리: 데이터셋을 읽고 각 구문을 처리하여 JSON 객체를 구성합니다.
- 출력: 다양한 합의 수준에서 처리된 데이터를 단일 CSV 파일로 결합합니다.
- 데이터셋 소스

## 단계 3: 기사 처리

파일: step-03-process_articles.py

이 스크립트는 뉴스 기사 데이터셋을 처리하고 다양한 언어 모델을 사용하여 합성 출력을 생성하며 출력을 CSV 파일로 저장합니다.

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

- API 통합: 여러 AI 모델 (예: LLaMA 3 70b, OpenAI GPT-3.5, GPT-4 등)을 사용하여 감성 분석을 생성합니다. Perplexity.ai와 Groq는 LLaMA 3 70b에 대해 빠른 추론을 제공하지만 가장 강력한 모델은 아닙니다. 여러 실험을 거친 후, 총 비용이 $20 미만으로 들어갑니다. 전체 실행은 아마도 $10 미만으로 완료할 수 있습니다. 정말 높은 정확도를 원한다면 최상의 모델에 대해 비용을 지불해야 합니다.
- 특수화된 프롬프팅: 시스템 메시지와 5번의 예시를 사용하여 안정적인 결과를 얻고, 결과를 pydantic 검증기를 통해 실행합니다. 이는 중요하며 추후 추론 테스트에도 같은 특수화된 프롬프팅을 사용할 것입니다. 신뢰할만한 결과를 얻기 위해 일부 조정이 필요할 수 있습니다.
- 재시도 메커니즘: API 호출 실패를 처리하기 위한 재시도 메커니즘을 구현합니다. 처리된 레코드를 추적하여, 이 프로세스는 온 밤을 다 할 수 있습니다. 어떤 이유로든 실패한다면 다시 실행할 수 있습니다.
- 데이터 유효성 검사: 생성된 JSON 응답이 유효한지를 Pydantic 모델을 사용하여 보장합니다.
- 출력: 처리된 기사와 그들의 감성 분석을 CSV 파일에 저장합니다.
- 데이터셋 출처

## 단계 4: 출력 합치기

파일: step-04-join_outputs.py

이 스크립트는 트윗, 금융 구문, 그리고 기사 데이터셋의 결과를 하나의 CSV 파일로 결합합니다.

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

- 데이터 살펴보기: 모든 데이터가 일관된 형식으로 되어 있고 인코딩 문제가 없도록 보장합니다.
- JSON 유효성 검사: JSON 문자열을 유효한 형식으로 만족시키는지 확인합니다.
- 결과물: 처리된 데이터셋에서 유효한 레코드를 결합하여 하나의 CSV 파일로 출력합니다.

## 단계 5: HuggingFace 데이터셋 구축

파일: step-05-build_hf_dataset_sharegpt.py

이 스크립트는 결합된 데이터셋을 HuggingFace에 업로드할 수 있는 형식으로 변환하여 모델 공유와 훈련을 위한 형식으로 만듭니다.

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

- 데이터 변환: 합쳐진 CSV 파일을 읽어 데이터를 정제하고 JSON 형식으로 변환합니다.
- 데이터셋 구조: HuggingFace에서 모델 학습에 적합한 대화 형식으로 데이터를 구성합니다.
- 출력: 변환된 데이터를 업로드할 준비가 된 JSON 파일로 저장합니다.
- HuggingFace에서 데이터셋을 생성하고 해당 리포지토리에 JSON을 업로드할 수 있습니다.

## 유틸리티 스크립트

파일: utils/sentiment_response.py, utils/utils.py

이 유틸리티 스크립트는 주요 스크립트 전반에 걸쳐 사용되는 도우미 함수와 클래스를 제공합니다.

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

- SentimentResponse: JSON 응답을 유효성 검사하기 위한 Pydantic 모델.
- File Utilities: 메시지 읽기, 레코드 ID 생성, 처리된 레코드 로딩 및 저장을 위한 함수들이 포함되어 있습니다.

이 안내서를 따라서 이 스크립트들을 조정하여 여러분만의 데이터셋을 처리하고 분석할 수 있습니다. 다양한 애플리케이션을 위한 포괄적인 감성 분석 데이터셋을 구축할 수 있습니다.

![Elevating Sentiment Analysis](/assets/img/2024-05-18-ElevatingSentimentAnalysis_1.png)

# 세밀한 조정 워크플로우

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

## 소개

우리는 우리의 파인튜닝을 위해 Unsloth의 구글 콜랩 노트북을 사용했습니다. Unsloth는 효율적이고 매우 적은 리소스를 사용하며, 특히 메모리 소비가 낮습니다. 사용자용 하드웨어에서 로컬로 실행할 수 있으며, 구글 콜랩 서비스에서 실행하는 데 저렴합니다. T4 티어는 잘 작동하지만 느립니다. 우리는 41.4k 개의 레코드(1 에폭)에서 훈련을 진행하고, T4에서 약 9시간이 걸렸습니다. 실험을 기대할 수 있으므로, 테스트하기 위해서는 전체 에폭보다는 낮은 단계의 숫자를 사용하도록 해야 합니다. 변화는 항상 일어나기 때문에 때때로 의존성이 업데이트되어 무언가가 망가질 수 있습니다. Unsloth는 사용자가 토론하고 질문하는 매우 유용한 디스코드를 가지고 있습니다.

우리가 사용한 노트북의 사본은 다음과 같습니다. 공식 노트북과 일부 변경 사항이 있으며, 포맷팅 및 템플릿에 ShareGPT 스타일을 사용합니다.

[노트북 링크](https://colab.research.google.com/drive/1H40hAFkh8FnOivEEyEsMn6REN8HfKPwB?usp=drive_link)

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

Unsloth 라이브러리는 대규모 언어 모델의 세밀 조정을 가속화하고 메모리 사용량을 줄이기 위해 설계된 강력한 라이브러리입니다. Daniel과 Michael Han에 의해 만들어진 Unsloth는 역전파 최적화 및 PyTorch 모듈을 Triton 커널로 재작성하여 30배 빠른 훈련 속도와 60-80% 낮은 메모리 소비를 달성합니다. 다양한 NVIDIA GPU를 지원하는 Unsloth는 Hugging Face 생태계와 완벽하게 통합되어 LLAMA 및 Mistral과 같은 다양한 LLM 아키텍처와 호환됩니다. 놀랍게도, 기존 방법과 비교했을 때 0% 정확도 하락을 유지하며 LLM의 세밀 조정에 효율적인 솔루션을 제공합니다. HuggingFace에서 자세히 알아보세요.

## Unsloth를 사용한 세밀 조정 워크플로우

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

언슬로스 스크립트는 큰 언어 모델 (LLM)인 LLaMA-3 8B와 같은 모델의 미세 조정 과정을 간소화하고 가속화하는 데 도움이 됩니다. 이 노트북/스크립트가 하는 작업에 대해 간단히 설명해드릴게요:

- 설치 및 설정: 스크립트는 Unsloth를 비롯한 필요한 라이브러리를 설치하는 작업으로 시작합니다. Unsloth는 교육 과정을 최적화하는 데 도움을 줍니다. 이 스크립트는 LLaMA, Mistral 및 기타 여러 모델을 지원하며 메모리 사용량을 줄이고 교육 속도를 높이기 위해 4비트 양자화를 사용합니다.
- 모델 준비: Unsloth의 FastLanguageModel 클래스를 사용하여 사전 훈련된 모델을 불러옵니다. 최대 시퀀스 길이나 dtype와 같은 매개변수를 지정하여 하드웨어 (예: Tesla T4 GPU)에 맞는 성능 최적화를 수행합니다. 이 스크립트는 LoRA (Low-Rank Adaptation) 어댑터를 지원하며, 이를 통해 모델의 매개변수 중 작은 비율만 업데이트하여 메모리 사용량을 더욱 줄일 수 있습니다.
- 데이터 준비: 논문의 스크립트는 Alpaca 데이터셋을 예시로 사용하며, 우리는 감정 분석 버전의 데이터셋을 사용합니다. 두 데이터셋은 표준화된 프롬프트 구조로 데이터를 포맷하며, 각 프롬프트에 무한 텍스트 생성을 방지하기 위한 종료 시퀀스 (EOS) 토큰이 포함되도록 합니다.
- 모델 교육: Hugging Face의 SFTTrainer를 사용하여 스크립트는 준비된 데이터셋에서 모델을 미세 조정합니다. 배치 크기, 학습률, 단계 수와 같은 주요 교육 매개변수를 설정하여 교육 프로세스를 최적화합니다. 스크립트는 GPU 메모리 사용량을 모니터링하여 효율적인 자원 관리를 보장합니다.
- 추론: 교육 후, 스크립트는 모델을 추론하기 위한 방법을 보여줍니다. 입력을 설정하고 출력을 생성하며 텍스트로 디코딩합니다. 또한 사용자가 생성된 텍스트를 토큰별로 확인할 수 있는 지속적 추론 옵션을 포함하고 있습니다.
- 모델 저장: 스크립트는 미세 조정된 모델을 로컬에 저장하거나 Hugging Face의 허브에 푸시하는 방법을 제공합니다. 다양한 배포 시나리오에 유연하게 대응하기 위해 16비트, 4비트, 그리고 GGUF (일반 그래프 유니버설 형식)에 모델을 저장할 수 있는 기능도 제공됩니다.

특히 GGUF 출력에 관심이 많은 이유는 대부분의 로컬 기기를 포함한 다양한 배포를 쉽게 할 수 있기 때문입니다.

## GGUF

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

GGUF, 또는 General Graph Universal Format은 LLaMA-3 8B와 같은 LLM(Large Language Model)의 배포 효율성과 유연성을 향상시키기 위해 설계된 파일 형식입니다. Llama.cpp 팀이 소개한 GGUF는 이전 버전인 GGML보다 개선된 단일 파일 배포, 확장성 및 빠른 모델 로딩을 위한 메모리 매핑을 제공합니다. 이 형식은 양자화된 모델에 특히 적합하여 성능을 저해하지 않으면서도 계산 리소스 수요를 줄일 수 있습니다. GGUF는 CPU 및 Apple 장치를 포함한 다양한 플랫폼에서 LLM의 배포 및 추론을 간소화하고자 하는 개발자에게 이상적인 선택입니다. 더 많은 정보는 HuggingFace에서 확인하세요.

![image](/assets/img/2024-05-18-ElevatingSentimentAnalysis_2.png)

# 테스트 및 추론

Andreas Traczyk과 함께 공동 저술한 이 저장소는 다양한 모델에 대한 테스트 및 추론을 목적으로 설계되었습니다. GitHub에서 코드에 액세스할 수 있습니다. 이 저장소를 사용하여 다른 모델을 효과적으로 비교하고 성능을 분석하세요.

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

https://github.com/seandearnaley/llama_3_8b_sentiment_analysis_tests

해당 저장소에는 감성 분석 작업에서 다양한 모델의 성능을 테스트하고 비교하는 파이썬 프로젝트가 포함되어 있습니다. 이 프로젝트는 로컬 모델 추론을 위해 Ollama 라이브러리를 활용하며, 감성 테스트 실행 스크립트, 비교 보고서 생성 및 결과 시각화를 위한 스크립트가 포함되어 있습니다.

설치 지침은 README.md를 참고해주세요.

## Specialized Prompting

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

이 중요한 단계는 데이터셋이 이러한 프롬프팅 기술(합성 데이터)을 사용하여 부분적으로 작성되었으며, 종종 미세 조정 대신에 이를 사용할 수 있습니다. 우리는 정말로 우리의 미세 조정에서 실제로 더 나은 성능을 얻고 있는지, 그리고 그것을 할 가치가 있는지를 평가하고 싶습니다. 신뢰할 수 있는 JSON 결과를 돌려받아 pydantic 검증을 통과하는 것이 목표입니다. 우리는 JSON을 원합니다. 파이썬 함수(예: 함수 호출)로 쉽게 전달할 수 있기 때문입니다.

다음은 특별한 시스템 프롬프트입니다:

```js
금융 뉴스 기사에 대한 감성 분석을 수행하는 고급 AI 어시스턴트입니다. 받은 각 기사를 분류하고 아래의 JSON 스키마를 사용하여 분석 결과를 제공해주셔야 합니다:
{
    "reasoning": {
      "type": "string",
      "description": "숫자 감성 값 결정에 사용된 논리를 설명하는 간단한 설명",
      "required": true
    },
    "sentiment": {
      "type": "number",
      "description": "기사의 감성을 나타내는 부동 소수점 표현, 소수점 두 자리로 반올림됨. -1.0(부정적)부터 1.0(긍정적)까지의 범위로, 0.0은 중립적인 감성을 나타냄",
      "required": true
    },
    "confidence": {
      "type": "number",
      "description": "분석이 얼마나 자신 있는지를 나타내는 부동 소수점 표현, 소수점 두 자리로 반올림됨. 0.0(자신 없음)부터 1.0(아주 자신 있음)까지의 범위",
      "required": true
    }
}

이 스키마를 준수하는 유효한 JSON 객체로 항상 응답하세요. 응답에 다른 텍스트나 메시지를 포함시키지 마세요. Markdown을 제외하고 응답하세요.
```

그리고 우리는 5개의 예제로 스레드를 초기화합니다(5-shot 프롬프팅, 미세 조정은 0-shot을 제공하지만 이 작업에 특화되어 있습니다):

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
금융 뉴스 기사가 다음과 같은 XML 태그로 둘러싸여 제공될 것입니다:

<article>{$ARTICLE}</article>

기사를 주의 깊게 읽고 언급된 회사의 잠재적인 주가에 대한 표현에 대해 분석해야 합니다.

먼저, "reasoning" 속성 안에 기사의 감정을 분석하는 이유와 근거를 작성하세요. 감정을 평가하는 데 영향을 미치는 기사 내에서 중요한 포인트를 설명하고 주식 가격에 어떤 영향을 미칠 것으로 예상되는지 설명하세요.

그런 다음 -1.0부터 1.0 사이의 숫자 점수를 출력하되, -1.0이 가장 부정적이고 0은 중립적이며 1.0은 가장 긍정적인 것으로 표현되도록 합니다. 이 점수를 "sentiment" 속성 안에 넣어주세요.

감정 값은 감정이 얼마나 긍정적 또는 부정적인지에 따라 나타내십시오. 결론을 도출할 수 없는 경우 0.0의 감정 값을 제공해주세요.

감정 값에 대한 확신 값은 감정 값을 얼마나 확신하는지에 따라 표시하십시오. 매우 확신하는 경우 1.0의 확신 값을 제공하십시오. 의심스러운 경우 0.0의 확신 값을 제공하십시오.

스키마에는 아무런 변경도 가하지 마십시오. 저희 회사에게 중요합니다.

예시:

1. <article>NVDA 주가가 수익을 능가하여 5% 상승합니다.</article>
   출력:
{
  "reasoning": "뉴스 기사는 긍정적인 수익을 보고하고 있으며, 이는 투자자 신뢰를 증가시키고 따라서 NVDA의 주가를 높일 가능성이 높습니다.",
  "sentiment": 0.75,
  "confidence": 0.9
}


2. <article>NVDA 주가는 석유 가격하락의 영향을 받을 수 있습니다. 분석가들은 NVDA의 에너지 부문 노출로 인해 주가 5% 하락을 예상합니다.</article>
   출력:
{
  "reasoning": "기사는 석유 가격 하락으로 인해 NVDA 주가에 부정적인 영향을 줄 수 있는 가능성을 시사하며, 이는 투자자 신뢰 감소로 이어질 수 있습니다.",
  "sentiment": -0.25,
  "confidence": 0.8
}

3. <article>Apple의 혁신적인 AR 안경 최근 출시는 예상된 판매 목표를 달성하지 못했습니다.</article>
   출력:
{
  "reasoning": "혁신적인 제품 출시에도 불구하고 판매 목표 미달은 부정적인 시장 반응을 야기할 수 있으며, Apple 주식 가치의 하락 가능성이 있습니다.",
  "sentiment": -0.5,
  "confidence": 0.6
}

4. <article>Boeing은 Emirates로부터 새 비행기에 대한 50억 달러 계약을 체결했으며, 강력한 미래 수입을 시사합니다.</article>
   출력:
{
  "reasoning": "대규모 계약 체결은 Boeing의 긍정적인 미래 수입 전망을 시사하며, 투자자 심리와 주식 가치를 높일 가능성이 높습니다.",
  "sentiment": 0.85,
  "confidence": 0.9
}

5. Tesla 주식 값에 대한 감정을 판단하는 아래 기사에서 Tesla로의 감정을 결정하십시오:
   <article>Tesla는 안전 문제로 10만 대의 차량을 회수합니다.</article>
   출력:
{
  "reasoning": "안전문제로 인한 대규모 회수는 Tesla의 브랜드 평판에 해를 끼칠 수 있으며 투자자 신뢰에 부정적인 영향을 줄 것으로 예상되어 주식 가치가 감소할 가능성이 있습니다.",
  "sentiment": -0.65,
  "confidence": 0.7
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

`generate_model_sentiments.py` 스크립트는 설정 가능한 횟수의 반복을 수행하며, 분산 등에 대한 평균값에 대한 테스트를 실행할 것입니다. 각 반복마다 JSON 파일은 다음과 같이 보입니다. 각 sentiment는 사전 캐싱된 기사에서 해싱되어 동일한 내용을 각 반복에 대해 평가하고 있습니다:

```js
{
  "average_sentiment": 0.57,
  "time_taken": 53.91,
  "sentiments": {
    ...
    "91ba90ac": {
      "reasoning": "기사에 따르면 시장은 역대 최고치에 근접하며, BYD, Nvidia, Walmart 등 여러 기업들이 매수 신호를 보이고 있는 상태이며, 이는 이러한 주식에 대해 긍정적인 감정을 나타낸다.",
      "sentiment": 0.6,
      "confidence": 0.8,
      "valid": true,
      "url": "https://finance.yahoo.com/m/ae28caa6-3ead-3745-aece-9ddb64e2ea1d/dow-jones-futures%3A-walmart%2C.html?.tsrc=rss",
      "published": "Thu, 16 May 2024 23:52:02 +0000",
      "time_taken": 3.17
    },
    "bf372e87": {
      "reasoning": "기사에 따르면, Nvidia 주식은 목요일에 하락을 마쳤지만, 다음 주의 실적 보고 전에 칩 메이커를 둘러싼 긍정적인 전망으로 역대 최고치를 경신할 것으로 예상됩니다. 4월의 인플레이션 데이터로 인한 전체 시장의 긍정적인 움직임과 긍정적인 분석가 평가에 따른 기대감이 Nvidia 주식을 끌어올렸지만, 결국 0.3% 하락했습니다.",
      "sentiment": -0.15,
      "confidence": 0.8,
      "valid": true,
      "url": "https://finance.yahoo.com/m/6ab7d488-38e1-3ef1-beef-bf75a726d6c2/nvidia-stock-couldn%E2%80%99t-close.html?.tsrc=rss",
      "published": "Thu, 16 May 2024 20:30:00 +0000",
      "time_taken": 5.12
    },
    "d4c4ccc1": {
      "reasoning": "기사에서 Wolfe Research가 Nvidia(NVDA)와 Advanced Micro Devices(AMD)에 대한 긍정적인 전망과 Nvidia에 대한 1,200달러의 가격목표 인상을 논의하고 있으며, AMD의 Wolfe Alpha List 추가는 강력한 AI 제품 라인업을 강조하며 잠재적인 성장 기회를 시사합니다. 분석가의 AMD에 대한 우선순위 전략적 변경은 두 주식의 성과를 고려해 더 균형 잡힌 접근을 제안합니다.",
      "sentiment": 0.75,
      "confidence": 0.85,
      "valid": true,
      "url": "https://finance.yahoo.com/video/chip-stocks-wolfe-research-bullish-201319388.html?.tsrc=rss",
      "published": "Thu, 16 May 2024 20:13:19 +0000",
      "time_taken": 6.24
    },
    ...
  }
}
```

## 방법론

저희는 Mac Pro M2 with 32gb을 사용 중이며, Ollama 0.1.38 버전을 사용하고 있습니다. Yahoo Finance의 동일한 뉴스 기사 세트에 대해 15회 반복 실행하고 있습니다.

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
default_temperature: 0.2;
context_window_size: 8192;
num_tokens_to_predict: 1024;
```

## Ollama

Ollama은 클라우드 서비스가 필요 없이 사용자가 자신의 기기에서 오픈 LLMs를 로컬에서 실행할 수 있는 도구입니다. llama.cpp의 프론트 엔드로, GGUF 모델을 로드할 수 있습니다. 사용 편의성을 고려하여 설계되었으며 간단한 API, OpenAI 엔드포인트 호환성(즉, OpenAI를 지원하는 모든 것과 작동할 수 있음) 및 사전 빌드된 모델 라이브러리를 제공합니다. Ollama는 macOS, Linux 및 Windows에서 실행되며 CPU와 GPU를 사용할 수 있습니다. LangChain, LiteLLM 등 인기있는 프레임워크와 원활하게 통합됩니다. 로컬 실행을 통해 데이터 개인 정보 보호 및 지연 시간을 줄이므로 고급 NLP 기능을 효율적으로 활용하려는 개발자 및 연구자에게 이상적인 선택지입니다.

HuggingFace에서 GGUF 파인 튜닝된 모델을 다운로드할 수 있습니다.

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

GGUFs를 Ollama에 로드하려면 시스템 메시지와 템플릿이 포함된 사용자 정의 모델 파일이 필요합니다. 여기에서 사용 중인 양자화 수준에 해당하는 GGUF 파일로 교체하고 있습니다. llama3-8b-sentiment-may-3-2024-unsloth.Q4_K_M.gguf를 사용하고 Ollama로 가져올 때 원하는 이름을 지을 수 있습니다:

```js
ollama create llama3:8b-instruct-sentiment_analysis-q4_K_M -f Modelfile
```

# 결과 및 평가

이 섹션에서는 다양한 감성 분석 모델의 평가 결과를 제시하며, 주요 성능 메트릭 및 통계적 비교에 초점을 맞춥니다. 우리는 화학적인 성능 메트릭을 중시하여 세밀하게 조정된 감정 모델을 기본 모델과 비교하여 금융 감성 데이터 처리의 효율성과 정확도를 결정했습니다. 이러한 메트릭은 각 모델의 성능을 종합적으로 보여주며, 감성 분석 작업에 특화된 세밀하게 조정된 모델을 사용하는 장점을 강조합니다.

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

여기를 클릭하시면 인터랙티브 3D 시각화를 확인할 수 있어요

# 감성 분석 모델 비교 결과 해석

감성 분석 모델을 다룰 때는 성능을 이해하고 다양한 모델을 비교하는 것이 중요합니다. 저희 분석 결과를 해석하는 데 도움이 될 수 있는 간단한 안내서를 제공합니다. 모델 세부 정보, 성능 지표 및 통계적 비교가 포함되어 있어요.

## 모델 세부 정보

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

- 모델 이름: 사용된 특정 모델을 나타냅니다 (예: llama3_8b-instruct-fp16).
- 양자화 수준: 모델에서 사용된 정밀도 수준을 나타냅니다 (예: q4, q5, fp16). q4 및 q5와 같은 낮은 수준은 더 적은 메모리를 사용하고 더 빨라질 수 있지만 정확성이 떨어질 수 있습니다.

## 성능 지표

- 속도 (초/샘플): 모델이 각 샘플을 처리하는 속도를 측정합니다. 낮은 숫자는 더 빠른 성능을 나타냅니다.
- 유효한 JSON 응답률: 모델이 성공적으로 유효한 결과를 반환한 비율입니다. 높은 백분율은 더 나은 신뢰성을 나타냅니다.
- 분산: 감정 점수가 얼마나 퍼져 있는지를 보여줍니다. 높은 분산은 점수가 넓게 퍼져 있음을 의미하며, 낮은 분산은 더 일관적임을 의미합니다.
- 평균 감정 점수: 모든 샘플에 대한 평균 감정 점수로, 감지된 일반적인 감정(긍정적, 부정적 또는 중립적)을 나타냅니다.
- 평균 신뢰도: 감정 예측의 평균 신뢰 수준입니다. 높은 값은 모델이 예측에 대해 더 확신한다는 것을 나타냅니다.
- 추론: 모델로부터 샘플 설명을 제공하여 특정 감정을 예측한 이유를 보여줍니다. 모델의 결정 과정을 이해하는 데 도움이 됩니다.

## 통계적 비교

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

세부 조정된 모델(감성 분석을 목적으로 디자인된)을 일반 용도 모델과 비교하기 위해 통계 검정을 사용합니다.

- F-통계량과 P-값(분산): 이러한 값은 두 모델 사이의 감성 점수 변동을 비교하는 F-검정에서 나옵니다. 유의미한 p-값(일반적으로 0.05 미만)은 모델이 얼마나 일관성 있는지에 의미 있는 차이가 있다는 것을 의미합니다.
- T-통계량과 P-값(평균): 이러한 값은 두 모델 사이의 평균 감성 점수를 비교하는 t-검정에서 나옵니다. 유의미한 p-값(일반적으로 0.05 미만)은 모델이 감지한 평균 감성에 의미 있는 차이가 있다는 것을 나타냅니다.

## 결과 해석 방법

- 추론 속도: 빠른 모델(낮은 속도)이 일반적으로 바람직합니다, 특히 실시간 애플리케이션에.
- 신뢰성: 높은 유효 JSON 응답률을 가진 모델이 더 신뢰할 수 있습니다.
- 일관성: 낮은 분산은 종종 더 나은 결과를 나타냅니다, 모델의 예측이 안정적이라는 것을 나타냅니다.
- 감성과 확신: 높은 평균 감성 점수와 평균 확신 점수가 바람직합니다, 모델이 명확한 감성을 감지하고 예측에 대해 확신을 가지고 있음을 보여줍니다.
- 통계적 유의성: 분산과 평균 비교를 위한 p-값이 0.05 미만인 경우, 모델 간에 유의미한 차이가 있다는 것을 제시합니다. 이는 특수화된(세부 조정된) 모델이 일반 용도 모델보다 실질적인 혜택을 제공하는지 결정하는 데 도움이 됩니다.

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

## 예시

llama3_8b-instruct-fp16와 llama3_8b-instruct-sentiment_analysis-fp16을 비교해보세요:

- Rate: 감성 분석 모델이 더 빠르다면, 실시간 요구에 더 적합합니다.
- 유효한 JSON 응답 비율: 높을수록 에러가 적습니다.
- 분산: 낮을수록 모델의 예측이 더 일관적합니다.
- 평균 감성 점수: 높은 점수는 더 강한 전반적인 감성 탐지를 나타냅니다.
- 평균 신뢰도: 높은 값은 모델이 예측에 대해 더 확신한다는 것을 의미합니다.
- 통계적 테스트: p-값이 유의하다면, 성능 지표 간의 차이는 의미가 있습니다.

이러한 지표와 비교를 이해함으로써, 초보자도 특정한 요구 사항과 맥락에 기반하여 사용할 감성 분석 모델에 대한 정보를 얻을 수 있습니다.

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

![Financial Sentiment Analysis Model Comparison](/assets/img/2024-05-18-ElevatingSentimentAnalysis_3.png)

# 금융 감성 분석 모델 비교

## 소개

이 분석의 목표는 금융 감성 분석을 위한 최적 모델을 식별하기 위해 세부 조정된 감성 분석 모델을 해당 원본 모델과 비교하는 것입니다. 감성 점수에 대한 분산, 평균 감성 점수, 평균 확신 점수 등 메트릭을 살펴보고 F-통계 및 T-통계를 사용하여 통계적 비교를 수행했습니다.

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

## 주요 지표 및 비교

- 추론 속도(속도): 세밀하게 조정된 모델은 일반적으로 베이스 모델과 비교하여 처리 시간이 유사하거나 약간 향상됩니다. 예를 들어, llama3_8b-instruct-sentiment_analysis-q5_K_M은 샘플 당 4.16초의 속도를 보여주며, llama3_8b-instruct-q5_K_M은 샘플 당 4.28초의 속도로 처리됩니다.
- 유효한 JSON 응답률: 세밀하게 조정된 모델과 베이스 모델 모두 대부분의 경우 100%의 유효한 JSON 응답률을 유지합니다. 이는 모델들 전반에서 높은 신뢰성을 나타냅니다. Mistral 7b는 모든 양자화 수준에서 오류가 있어 가장 신뢰할 수 없는 모델이 됩니다.
- 감정 점수의 분산: 세밀하게 조정된 모델은 감정 점수의 분산이 더 낮습니다. 예를 들어, llama3_8b-instruct-sentiment_analysis-q5_K_M의 분산이 0.12인 반면, llama3_8b-instruct-q5_K_M은 0.36입니다. 낮은 분산은 더 일관된 예측을 시사합니다.
- 평균 감정 점수: 세밀하게 조정된 모델은 일반적으로 더 높은 평균 감정 점수를 갖습니다. llama3_8b-instruct-sentiment_analysis-q5_K_M은 0.59의 평균 감정을 보여주며, 베이스 모델은 0.31입니다. 높은 평균 감정 점수는 보다 강력한 전체적인 감정 감지를 나타냅니다.
- 평균 확신 점수: 세밀하게 조정된 모델은 일반적으로 베이스 모델에 비해 약간 낮은 평균 확신 점수를 보여줍니다. 이는 세밀한 교육이 감정 감지의 정확성에 더 초점을 맞추었기 때문일 수 있습니다.

## 통계적 비교

- F-통계량 및 P-값(분산): 세밀하게 조정된 모델과 베이스 모델 간에 분산에서 유의한 차이가 나타납니다. 예를 들어, llama3_8b-instruct-q5_K_M 대 llama3_8b-instruct-sentiment_analysis-q5_K_M은 F-통계량이 18.75 (p-value ` 0.01)입니다.
- T-통계량 및 P-값(평균): 평균 감정 점수도 유의하게 다릅니다. 같은 비교에서 T-통계량은 -4.33 (p-value ` 0.01)입니다.

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

## 신뢰도 점수 변동에 대한 설명

세심한 모델 향상치 감소는 특정 훈련에 기인할 수 있습니다. 세심한 모델들은 특정 작업을 최적화하여, 기본 모델들이 처리하지 못하는 감성의 세심한 차이를 만들어내야 할 수 있습니다. 이 증가된 섬세함은 모델이 감정의 섬세한 변화를 잡아내도록 설계되어 있기 때문에 보다 신중한(낮은 신뢰도) 예측 방식으로 이어질 수 있습니다.

## LLaMA 3 8B 양자화 주변의 논란

인공지능 커뮤니티의 최근 토론은 LLaMA 3 8B 모델을 특히 Q4와 같은 낮은 비트폭으로 양자화하는 것에 중대한 문제점을 강조했습니다. 보고서에 따르면, 임의의 날짜 삽입, 단어 반복, 일관성 감소와 같은 문제를 포함한 출력 품질의 상당한 저하가 나타났다고 합니다. 이러한 성능 하락은 Mistral이나 이전 LLaMA 버전과 같은 다른 모델들과 비교했을 때 더욱 두드러지게 나타났습니다. LLaMA 3 모델의 방대한 사전 훈련과 높은 토큰 수는 양자화에 내재된 정밀도 손실에 민감해져, 이러한 고급 모델에 대한 양자화 기술을 최적화하기 위한 추가 연구가 필요할 수 있습니다.

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

## 감성 분석 모델에 대한 함의

낮은 정밀도 문제: LLaMA 3 8B 모델을 Q4로 양자화할 때 정밀도가 낮아질 수 있어 감성 감지의 부정확성을 초래할 수 있습니다. 이로 인해 신뢰할 수 있는 감성 점수와 신뢰 수준에 영향을 줄 수 있습니다.

## 클램핑과 반올림 효과:

- 클램핑: 값이 특정 범위 내로 제한될 때 발생합니다. 감성 분석에서는 극단적인 감성 값(매우 긍정적 또는 매우 부정적)이 정확하게 표현되지 않을 수 있어 중립적인 출력이 더 많이 나올 수 있습니다.
- 반올림: 숫자를 낮은 정밀도 형식에서 가장 가까운 표현 가능한 값으로 근사화하는 것을 의미합니다. 반올림 오차가 누적되어 감성 분석 출력의 품질이 저하될 수 있습니다.
- 분산 관찰: 흥미로운 점은 Q4에서의 감성 점수에서 고정밀도 수준인 Q5, Q8 및 FP16과 비교하여 낮은 분산을 관측한 사용자들이 있었다는 것입니다. 일반적으로 고정밀도는 더 안정된 결과를 제공하나, 이상적인 결과는 고정밀도 손실에 민감해져 LLaMA 3 모델의 안정성에 영향을 미칠 수 있다는 것을 시사합니다.

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

## 실용적인 결과

귀하의 감성 분석 모델에 대한 영향:

- 출력 품질 감소: 4분기에서 양자화된 LLaMA 3 8B 모델을 사용할 때 감성 분석의 전반적인 품질과 일관성이 감소할 수 있습니다.
- 일관성 없는 성능: 더 많은 불일치를 발견할 수 있으며, 예상치 못한 중립적 감성 점수 또는 감성 분석 결과에서의 이상한 패턴이 나타날 수 있습니다.
- 권고 사항: 이러한 관측을 바탕으로 LLaMA 3 8B 모델에 대해 더 높은 정밀도 수준(Q8 또는 FP16)을 사용하거나, 양자화 처리를 더 잘 다루는 Mistral 또는 Dolphin-Mistral과 같은 다른 모델을 고려하는 것이 좋을 수 있습니다.

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

- 금융 감성 분석을 위해서는 llama3_8b-instruct-sentiment_analysis-q5_K_M과 같은 세밀하게 조정된 모델을 사용하는 것이 좋습니다. 이러한 모델들은 일관되고 강력한 감성 탐지를 제공하는 우수한 성능으로 인해 권장됩니다. 이러한 모델들은 기본 모델에 비해 의미 있는 개선을 제공하여 더 신뢰할 수 있고 정확한 감성 분석을 보장합니다. 하지만 특히 Q4에서 LLaMA 3 8B 양자화에 대한 논란이 있어 조심이 필요하며 양자화 기술에 대한 추가 연구와 최적화가 필요합니다.
- Unsloth 노트북을 사용한 세밀한 조정은 LLaMA 3 8b 및 Mistral 7b와 같은 오픈 언어 모델에서 자신의 데이터를 세밀하게 조정할 수 있는 비교적 저렴한 경로를 제공합니다.
- 함수 호출에 사용할 수 있는 신뢰할 수 있는 JSON 결과를 얻을 수 있습니다. 조정되지 않은 경우에는 특별한 프롬프트가 필요하지만 할 수 있습니다.
- 감성 분석을 위해 세밀하게 조정된 LLaMA 3 8B는 몇 가지 장점을 제공합니다. 전문 프롬프트 트릭이 필요하지 않으며 모든 양은 낮은 분산과 적절한 신뢰도를 가지며 속도가 약간 향상되었습니다(프롬프트에 필요한 토큰 수가 줄어듦).
- 데이터셋 및 훈련 시간에 개선할 여지가 있습니다. 합성 데이터 프롬프트를 조정해야 하며 1 epoch보다 길게 실행하면 손실이 감소하는 것으로 보입니다.
- 웹 스크래핑은 복잡할 수 있으며, Yahoo Finance에서 스크래핑할 때 동일한 기사에 여러 회사가 언급되거나 유료 구독이 필요한 기사가 발생할 수 있습니다.
- 특별한 시스템 프롬프트와 5번 예제를 사용하면 Llama 3 8B 모델이 모든 단계의 양자화 수준에서 올바른 JSON을 생성할 때 100%의 성공률을 달성합니다. 그러나 감성 점수의 변동성이 더 높으며 높은 신뢰도를 유지하면서 잠재적인 과신을 나타냅니다.
- 동일한 시스템 프롬프트와 5번 예제를 사용하는 Mistral 7b Instruct는 FP16 양자화 수준까지도 올바른 JSON을 제대로 출력하지 못하는 경우가 종종 있습니다.
- Dolphin-Mistral 7b-v2.8은 베이스 Mistral 7b보다 감성 분석에서 훨씬 우수한 성능을 보입니다. 특별한 프롬프트를 사용하면 100%의 성공률을 달성할 수 있습니다. 이는 Mistral 7b 베이스가 효과적으로 세밀하게 조정될 수 있다는 것을 시사합니다.

## 다음 단계

- 세밀한 조정을 위해서는 더 많은 시간과 노력이 필요합니다.
- 다른 모델들에 대해 세밀하게 조정해 보세요. LLaMA 3는 특히 하위 양자화에서는 최고가 아닐 수 있습니다. Mistral-7b나 심지어 Phi-3을 시도하고 테스트 리포를 사용하여 결과를 비교해보세요.
- 데이터셋을 향상시키세요. 이는 주로 개념 증명이었으므로 사용 가능한 데이터가 훨씬 많이 있습니다.
- 숫자를 변경할 수 있는 산업 데이터 프롬프트와 특별한 프롬프트를 함께 조정해 보세요.
- 합성 훈련에 더 많은 비용을 지불하세요. 이 세트가 구축된 후 GPT-o가 출시되었는데, 이는 50% 저렴하며 Batch API를 사용하고 24시간 이내에 작업을 완료할 경우 더 큰 할인을 받을 수 있습니다.
- 우리가 한 세밀한 조정은 1 epoch(데이터 세트를 완전히 통과하는 것)만 포함했습니다. 더 오랜 시간 훈련하면 손실이 더욱 감소할 수 있습니다.

## 마무리

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

이 글에서 다룬 기술들로 사용자 지정 데이터를 사용하여 세밀하게 조정된 모델을 자신있게 만들 수 있습니다. 우리의 연구 결과는 세밀하게 조정된 변형이 특별한 프롬프트가 필요하지 않고, 빠르고 효율적인 결과물을 얻기 위한 주목할만한 성능 향상을 제공한다는 것을 보여줍니다.

낮은 양자화 수준에서 세밀하게 조정된 모델을 평가하는 것은 높은 변동성과 자신감으로 인해 도전적일 수 있으며, 신중한 분석이 필요합니다. 향후 글에서는 더 많은 통찰을 위해 다른 기본 모델을 세밀하게 조정하는 것을 탐구할 것입니다.

도움이나 질문이 있으면 언제든지 연락해 주세요. 계약에 대해서도 가능하니 문의해 주세요. 프로젝트에 행운을 빕니다~ 세밀한 조정 재밌게 하시길 바랍니다!
