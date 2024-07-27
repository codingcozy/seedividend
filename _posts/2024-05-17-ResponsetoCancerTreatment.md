---
title: "암 치료에 대한 대응"
description: ""
coverImage: "/assets/img/2024-05-17-ResponsetoCancerTreatment_0.png"
date: 2024-05-17 04:24
ogImage: 
  url: /assets/img/2024-05-17-ResponsetoCancerTreatment_0.png
tag: Tech
originalTitle: "Response to Cancer Treatment"
link: "https://medium.com/john-snow-labs/response-to-cancer-treatment-d7d3b6f40aa3"
---


## 암 치료 반응 지표의 정확한 추출

![이미지](/assets/img/2024-05-17-ResponsetoCancerTreatment_0.png)

저자: Gursev Pirge, Samed Kocer

암 치료에 대한 환자 반응을 정확하게 평가하는 것은 임상 의사 결정에 유용하며 치료 결과를 최적화하는 데 중요합니다. 대형 언어 모델(Large Language Models, LLMs)은 다양한 자연어 처리(Natural Language Processing, NLP) 작업에서 인상적인 성능을 발휘해 왔지만, 의료 언어의 복잡성과 임상 내러티브 해석의 세심한 뉘앙스로 인해 이 도메인에서의 성능이 제한되어 왔습니다.

<div class="content-ad"></div>

임상 보고서에 기록된 복잡한 세부 내용을 정확하게 이해하는 능력은 후속 치료 결정을 인도하고 치료 전략을 조정하며 궁극적으로 환자 결과를 향상시키는 데 중요합니다. John Snow Labs은 비정형 텍스트에서 환자 응답을 추출하고 분류하는 데 뛰어난 정확성으로 알려진 모델을 제공하여 NLP를 암 치료에 적용하는 중요한 발전을 이루었습니다.

본 게시물에서는 John Snow Labs의 Healthcare NLP 라이브러리의 사전 훈련된 모델을 사용하여 환자의 암 치료에 대한 응답을 평가하는 내용을 다룹니다. 환자의 암 치료 경과/변화를 이해하는 데 중요한 텍스트 데이터의 키워드나 구절 NER을 식별하고, 더불어 텍스트 분류 모델을 사용하여 적용된 치료에 대한 응답을 평가할 것입니다.

우선 짧은 Spark NLP 소개부터 시작한 다음, 암 치료에 대한 응답의 세부 내용과 실질적인 결과에 대해 논의해보겠습니다.

## Spark NLP 및 LLM

<div class="content-ad"></div>

헬스케어 라이브러리는 존 스노 랩의 Spark NLP 플랫폼의 강력한 구성 요소로, 의료 분야 내에서 NLP 작업을 용이하게 하는 데 설계되었습니다. 이 라이브러리는 의료 데이터에 맞춘 2,200개 이상의 사전 훈련된 모델과 파이프라인을 제공하여 정확한 정보 추출, 임상 및 의료 개념을 위한 NER, 텍스트 분석 기능을 제공합니다. 정기적으로 업데이트되며 최첨단 알고리즘으로 구축된 헬스케어 라이브러리는 정보 처리를 최적화하고 전자 의료 기록, 임상 노트, 생물 의학 문헌과 같은 비정형 의료 데이터 소스로부터 의료 전문가들에게 더 깊은 통찰력을 제공하기 위해 노력하고 있습니다.

존 스노 랩의 GitHub 저장소는 사용자가 오픈 소스 리소스에 액세스할 수 있는 협업 플랫폼으로, 코드 샘플, 튜토리얼 및 프로젝트 등을 포함합니다. 이를 통해 사용자들은 Spark NLP 및 관련 도구의 이해와 활용을 더욱 향상시킬 수 있습니다.

존 스노 랩은 또한 헬스케어 라이브러리 및 NLP 플랫폼의 다른 구성 요소를 이용하는 데 전문 지식을 습득하는 데 도움이 되는 주기적인 인증 교육을 제공합니다.

존 스노 랩의 데모 페이지는 라이브러리의 기능을 탐색하기 위한 사용자 친화적 인터페이스를 제공하여 사용자가 상호 작용적으로 테스트하고 다양한 기능과 모델을 시각화할 수 있도록 하며, 이러한 도구가 의료 및 다른 분야에서 실제 시나리오에 적용될 수 있는 방법에 대한 더 깊은 이해를 돕습니다.

<div class="content-ad"></div>

John Snow Labs의 Healthcare Library가 핵심 역할을 할 수 있는 중요한 응용 분야 중 하나는 환자가 암 치료에 대한 반응을 평가하는 것입니다. 개인이 치료에 어떻게 반응하는지 정확하게 평가하는 것은 임상 의사 결정을 안내하고 치료 결과를 최적화하는 데 중요합니다. 그러나 의료 언어의 복잡성과 그러한 텍스트를 해석하는 데 관련된 세세한 점들 때문에 비구조적 임상 문서에서 이 정보를 추출하는 것은 어려울 수 있습니다.

NLP를 사용하여 환자의 암 치료에 대한 반응을 평가하는 데 여러 접근 방법이 있습니다. 첫 번째 접근 방식은 NER 모델을 사용하여 비구조적 임상 텍스트에서 관련 있는 종양학적 개념 및 엔티티를 추출하는 것입니다. 이를 통해 시스템은 환자의 상태, 치료 방법 및 결과에 관련된 주요 정보를 정확하게 파악할 수 있습니다.

두 번째 접근 방식은 텍스트 분류 모델을 사용하여 임상 내러티브의 전반적인 내용과 문맥을 분석하는 것입니다. 이러한 모델을 레이블이 지정된 데이터셋으로 훈련시킴으로써, 이 모델은 환자의 진행 상황, 증상 및 기타 관련 요소를 묘사하는 데 사용된 언어를 기반으로 처방된 암 치료의 효과성과 효율성을 평가할 수 있습니다.

이 블로그 포스트에서 우리는 John Snow Labs의 NER 및 텍스트 분류 모델이 이 중요한 문제를 해결하기 위해 정확한 솔루션으로서의 잠재력을 탐구할 것입니다.

<div class="content-ad"></div>

## 임상 노트에서 종양학 관련 엔티티 추출

이 파트에서는 John Snow Labs Healthcare NLP 라이브러리가 임상 노트에서 종양학 관련 엔티티(NERs)를 추출하는 방법에 대해 살펴볼 것입니다.

200개 이상의 종양학 모델의 힘을 활용하여 의료 전문가들은 복잡한 임상 내러티브에서 암 진단, 치료 및 환자 결과에 관련된 중요한 정보를 효율적으로 식별하고 추출할 수 있습니다.

Spark NLP는 파이프라인을 사용하여 가치 있는 정보를 추출하며, 이를 위해 6단계만 필요합니다. 나는 ner_oncology 모델을 활용하여 종양과 관련된 엔티티를 추출했습니다.

<div class="content-ad"></div>

```js
# 단계 1: 원시 텍스트를 `document`로 변환합니다.
document = DocumentAssembler()\
    .setInputCol("text")\
    .setOutputCol("document")

# 단계 2: 문장 감지/분할
sentencer = SentenceDetectorDLModel.pretrained("sentence_detector_dl_healthcare","en","clinical/models")\
    .setInputCols(["document"])\
    .setOutputCol("sentence")

# 단계 3: 토큰화
tokenizer = Tokenizer()\
    .setInputCols(["sentence"])\
    .setOutputCol("token")\
    .setSplitChars(["-", "\/"])

# 단계 4: 임상 임베딩
embeddings = WordEmbeddingsModel.pretrained("embeddings_clinical","en","clinical/models")\
    .setInputCols(["sentence","token"])\
    .setOutputCol("embeddings")

# 종양학 모델
model = MedicalNerModel.pretrained("ner_oncology","en","clinical/models")\
    .setInputCols(["sentence","token","embeddings"])\
    .setOutputCol("ner_oncology")\

converter = NerConverterInternal()\
    .setInputCols(["sentence","token","ner_oncology"])\
    .setOutputCol("ner_oncology_chunk")

# 파이프라인 정의
pipeline = Pipeline(stages=[document, tokenizer, embeddings, model, converter])

# 빈 데이터프레임 생성
empty_df = spark.createDataFrame([['']]).toDF("text")

# 데이터프레임을 파이프라인에 맞추어 모델을 가져옵니다.
pipelineModel = pipeline.fit(empty_df)
```

모델의 효과적인 분석을 위해 이 임상 텍스트 샘플을 활용해 보겠습니다.

```js
sample_text = """65세 여성이 복부 및 골반의 컴퓨터 단층 촬영(CT)을 받았고, 복난소에 복잡한 난소 종양이 보였습니다. 한 달 후에 실시된 Pap 스며는 비정상적인 선세포를 보여 주며 점액선암을 의심케 합니다. 병리 검사에 따르면 종양은 난관, 충수, 위막 및 5개의 비정상적으로 커진 림프절 전방에 걸쳐 있었습니다. 종양의 최종 병리학적 진단은 ⅡIC 형태의 유두낭 형성 난소 선암이었습니다. 그리고 2개월 후 환자는 폐 전이 병변이 발견되었습니다.
"""
```

여기서 LightPipeline을 사용하여 엔티티를 추출해 보겠습니다. LightPipeline은 Spark NLP 특정 파이프라인 클래스로, Spark ML 파이프라인과 동등한 기능을 제공합니다. 다만, Spark 원칙을 준수하지 않고 모든 계산을 로컬(그러나 병렬)로 수행하여 데이터 양이 적을 때 빠른 결과를 얻을 수 있습니다.

<div class="content-ad"></div>

```js
light_model = LightPipeline(pipelineModel)

light_result_onc = light_model.fullAnnotate(sample_text)


chunks = []
entities = []
sentence= []
begin = []
end = []
confidence = []

for n in light_result_onc[0]['ner_oncology_chunk']:

    begin.append(n.begin)
    end.append(n.end)
    chunks.append(n.result)
    entities.append(n.metadata['entity'])
    sentence.append(n.metadata['sentence'])
    confidence.append(n.metadata["confidence"])

df_oncology = pd.DataFrame({'chunks':chunks, 'begin': begin, 'end':end,
                   'sentence_id':sentence, 'entities':entities, 'confidence':confidence})

df_oncology.head()
```

ner_oncology 모델을 적용한 후, 샘플 임상 노트에서 다음과 같은 관련 의학적 개념이 자동으로 식별되고 추출되었습니다:

![의학 개념](/assets/img/2024-05-17-ResponsetoCancerTreatment_1.png)

Spark NLP를 사용하여 생성된 엔티티를 빠르게 시각화할 수 있는 기능은 개발 프로세스를 가속화하고 얻은 결과를 이해하는 데 매우 유용합니다. Spark NLP Display는 Spark NLP에서 생성된 추출된 및 레이블이 지정된 엔티티를 시각화하기 위한 오픈 소스 파이썬 라이브러리입니다. NerVisualizer 어노테이터는 추출된 명명된 엔티티를 강조하고 분석된 텍스트 위에 레이블을 표시하여 보여줍니다.

<div class="content-ad"></div>

```python
from sparknlp_display import NerVisualizer

visualiser = NerVisualizer()

visualiser.display(light_result_onc[0], label_col='ner_oncology_chunk', document_col='document')
```

이러한 엔티티를 강조함으로써 환자의 상태, 치료 계획 및 전반적인 예후에 대한 깊은 통찰력을 얻게 되어 의료 전문가들이 맞춤형 치료를 안내하고 종양학 실무에서 치료 결과를 최적화할 수 있는 가치 있는 정보를 얻을 수 있습니다.

## 임상 보고서로부터 암 치료에 대한 환자 반응 평가하기

NER 모델은 임상 노트에서 종양학적 개념을 추출할 수 있지만, 치료 반응을 이해하려면 주로 내러티브의 전체 맥락을 분석해야 합니다. 텍스트 분류 모델은 환자 파일의 전반적인 내용이 긍정적인 반응을 나타내는지, 또는 질병 진행을 시사하는지를 판단할 수 있습니다. 임상 전문가가 치료 결과에 따라 파일을 레이블링한 주석이 달린 데이터셋으로 모델을 훈련하면, 이러한 모델은 상태, 증상, 영상 소견 및 기타 중요한 요소를 기술하는 언어에서 예측적인 패턴을 학습합니다. 새로운 미레이블 파일에 적용하면, 모델은 높은 정확도로 분류할 수 있습니다. 이 자동 분류는 추가 검토를 위해 사례를 필터링하고 연구를 위한 코호트 식별을 간소화하는 데 도움이 될 수 있습니다. 그러나 높은 정확도를 달성하려면 고품질의 훈련 데이터와 이 도메인에서의 실제 언어 뉘앙스를 주의 깊게 다루어야 합니다.


<div class="content-ad"></div>

이 중요한 임무에 대한 텍스트 분류 모델의 성능을 평가하기 위해 John Snow Labs의 데이터 과학자들은 5,000개 이상의 환자 파일로 구성된 정제된 데이터셋에서 여러 모델을 훈련하고 테스트했습니다. 각 파일은 의료 전문의들에 의해 수동으로 레이블이 지정되었으며 치료 반응에 따라 '환자가 치료에 응답함' 또는 '환자가 치료에 반응하지 않음' 중 하나로 분류되었습니다. 가장 우수한 성능을 보인 모델은 이 특수 데이터셋으로 미세 조정된 BERT 기반 아키텍처였습니다.

아래에 표시된 임상 텍스트 조각들에 대한 정확한 레이블 할당을 얻기 위해 종양 치료 반응 분류기를 사용해봅시다:

```python
sample_texts = [
    ["뇌의 콘트라스트 증강 MRI는 테모졸로마이드 요법 이후 안정된 질병을 시사하여 글리오블라스토마 크기의 변화가 없음을 보여줌."],
    ["신생 대상화 요법 이후의 유방 초음파는 3cm에서 1cm로 원발 병변 크기 감소를 보여줌으로써 치료에 대한 유리한 반응을 시사합니다. 피부 감염 역시 다중 항생제 치료로 잘 통제됨."],
    ["골반의 MRI는 복강경 총 제거 및 6개월 호르몬 억제 요법 후, 자궁내막증의 추가 진전이 없음을 나타냄."],
    ["재방문 내시경 검사는 치료되고 있는 위궤양 및  H. pylori 감염의 신증상을 보여줍니다. PPI 계속 논의할 예정입니다."],
    ["간의 다이내믹 콘트라스트 증강 MRI는 소라페닙을 이용한 6개월간의 전향요법 이후 간 전이의 크기와 개수에 상당한 감소가 없음을 나타냈습니다."],
    ["뇌혈관의 디지털 적출 혈관 조영술은 뇌동맥류 코일 재관류 후, 뇌동맥류의 진전 확장과 새로운 혈관 이상을 나타내어 시도가 실패한 것으로 나타냅니다."],
    ["환자의 반복 폐기능 검사는 FEV1과 FVC 모두에 심각한 향상이 없음을 나타냄으로써 최대한 최적화된 흡입요법으로도 천식 증상을 효과적으로 통제하는 데 실패했음을 시사합니다. 계속해서 논의할 것입니다."]
]
```

이 모델의 치료에 대한 반응을 예측하는 정확성은 제공된 벤치마킹 결과에서 명확하게 확인됩니다.

<div class="content-ad"></div>


<img src="/assets/img/2024-05-17-ResponsetoCancerTreatment_2.png" />

Spark NLP 어노테이터 MedicalBertForSequenceClassification을 사용한 텍스트 분류를 위한 파이프라인이 더욱 짧아졌어요:

```js
# 단계 1: 원시 텍스트를 `document`로 변환
document_assembler = DocumentAssembler()\
    .setInputCol("text")\
    .setOutputCol("document")

# 단계 2: 토큰화
tokenizer = Tokenizer()\
    .setInputCols(["document"])\
    .setOutputCol("token")

# 단계 3: 텍스트 분류
sequenceClassifier = MedicalBertForSequenceClassification.pretrained("bert_sequence_classifier_response_to_treatment", "en", "clinical/models")\
    .setInputCols(["document","token"])\
    .setOutputCol("prediction")

pipeline = Pipeline(
        stages=[
            document_assembler,
            tokenizer,
            sequenceClassifier
])

# 샘플 텍스트에서 Spark 데이터프레임 생성
sample_data = spark.createDataFrame(sample_texts).toDF("text")

# 데이터프레임을 파이프라인에 맞추고 예측값 가져오기
result = pipeline.fit(sample_data).transform(sample_data)

result.select("text", "prediction.result", 'prediction.metadata').show(truncate = 100)
```

텍스트 분류 모델을 적용한 후, 샘플 임상 텍스트는 치료에 대한 응답 또는 응답이 없음을 나타내는 신뢰도 값과 함께 분류되었습니다.


<div class="content-ad"></div>

모델은 임상 노트를 기반으로 반응 및 비반응 사례를 구별하는 뛰어난 능력을 보였습니다. 이러한 결과는 더 포괄적인 인간 리뷰 전 단계로서 맞춤형 텍스트 분류 모델을 사용할 수 있는 가능성을 보여줍니다. 정확도가 93% 이상이어서, 모델은 교종류팀이 우선적으로 평가할 고위험 비반응 사례를 자동으로 도출할 수 있었습니다. 더 많은 레이블이 적용 가능한 경우 계속해서 반복적인 훈련을 거침으로써 성능을 더욱 향상시킬 수 있을 것입니다.

## 결론

암 치료와 같이 중요한 분야에서, 치료에 대한 응답을 정확하게 평가할 수 있는 것이 치료 전략과 결과에 영향을 줄 수 있는데, John Snow Labs NER 및 텍스트 분류 모델은 복잡한 임상 보고서에서 정보 추출 및 환자 응답을 분류하는 데 높은 정확도를 달성했습니다.

LLMs를 사용하여 환자의 암 치료에 대한 응답을 평가하는 것은 정확도를 향상시키고 맥락을 이해하는 데 도움이 될 수 있습니다. 일반적으로, 더 많은 매개변수를 가진 큰 모델은 많은 NLP 과제에서 더 나은 성능을 이룰 수 있지만 계산 비용이 더 많이 드는 경향이 있습니다.

<div class="content-ad"></div>

결론적으로, 이 두 가지 접근 방식은 암 치료에 대한 환자의 반응을 평가하는 데 유용한 통찰력을 제공합니다. NER 및 텍스트 분류 모델을 활용하면 임상 텍스트를 분석하는 효율적이고 정확한 방법을 제공하며 치료 결과에 대한 통찰력을 제공합니다. 한편, 수십억 개의 매개변수로 이루어진 LLM을 활용하면 맥락과 의미에 대한 보다 깊은 이해력으로 인해 향상된 정확도가 약속됩니다. 그러나 이에는 계산 자원 및 인프라 요구 사항을 포함한 비용 증가가 따릅니다. 궁극적으로, 이러한 접근 방식들 사이의 선택은 헬스케어 환경의 구체적인 요구 사항에 의존하며 정확도와 비용 효율성 사이의 절충을 균형있게 고려해야 합니다.