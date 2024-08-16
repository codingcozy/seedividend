---
title: "대형 언어 모델 평가 개발자를 위한 안내"
description: ""
coverImage: "/assets/img/2024-05-16-EvaluatingLargeLanguageModelsADevelopersGuide_0.png"
date: 2024-05-16 04:18
ogImage: 
  url: /assets/img/2024-05-16-EvaluatingLargeLanguageModelsADevelopersGuide_0.png
tag: Tech
originalTitle: "Evaluating Large Language Models: A Developer’s Guide!"
link: "https://medium.com/gitconnected/evaluating-large-language-models-a-developers-guide-ffd21a055feb"
isUpdated: true
---




![image](/assets/img/2024-05-16-EvaluatingLargeLanguageModelsADevelopersGuide_0.png)

대형 언어 모델 (LLM)인 GPT-4, Claude, LLama 및 Gemini는 AI 커뮤니티에 많은 기여를 했습니다. 기관들이 견고한 LLM 기반 애플리케이션을 구축하는 데 도움을 주었죠. 그럼에도 불구하고, LLM은 환각을 하며 종종 진실 같은 자신만의 이야기를 만들어 냅니다. AI에 대한 안전하고 안정적이며 책임감 있는 LLM 사용에 준수하는 것은 중요해졌습니다. 속도 뿐만 아니라 정확성과 성능 면에서 이러한 LLM을 평가하는 것이 권장됩니다.

오늘은 간단한 자습서를 통해 더 나은 성능을 위해 이러한 LLM을 어떻게 평가할 수 있는지 살펴볼 것입니다. 하지만 우선, LLM 평가가 무엇인지에 대해 먼저 이해해 보겠습니다.

# LLM 평가란?



LLM 평가는 LLM의 성능을 얼마나 잘 이해하는지에 중요합니다. 이는 개발자가 모델의 강점과 약점을 파악하여 실제 응용 프로그램에서 효과적으로 작동하도록 보장합니다. 이 평가 프로세스는 편향된 또는 오도하는 콘텐츠와 같은 위험을 완화하는 데도 도움이 됩니다. LLM 평가에는 두 가지 주요 유형이 있습니다:

- 모델 평가: LLM 자체의 핵심 능력을 평가합니다.
- 시스템 평가: 특정 프로그램 내에서 또는 사용자 입력과 함께 수행되는 방식을 살펴봅니다.

# LLM 평가 지표

다음은 제품화하기 전에 고려해야 할 가장 중요한 평가 지표 목록입니다.



LLM(Large Language Model)를 평가하는 데 중요한 것은 적절한 측정 지표를 갖추는 것입니다. 이러한 지표는 주어진 기준에 따라 LLM의 출력물을 평가하는 점수 메커니즘으로 작용합니다. 일반적인 지표 및 기준은 다음과 같습니다:

- 응답 완성도 및 간결성: LLM 응답이 사용자 쿼리를 완벽하게 해결하는지 여부를 결정합니다. 간결성은 생성된 응답이 얼마나 관련성이 있는지를 결정합니다.
- 텍스트 유사성 지표: 생성된 텍스트를 참조나 기준 텍스트와 비교하여 그들이 얼마나 유사한지를 측정합니다. 그런 다음 특정 LLM이 어떻게 수행했는지 이해할 수 있도록 점수가 부여됩니다.
- 질문 응답 정확도: LLM이 사실적인 정확성 기준에 따라 제기된 질문에 얼마나 잘 대답하는지 측정합니다.
- 관련성: 주어진 프롬프트나 사용자 질문에 대한 LLM 응답의 적절성을 결정합니다.
- 망상 지표: LLM이 정보를 얼마나 만들어 내거나 특정 프롬프트에 대해 편향된 출력을 공유하는지 식별합니다.
- 유해성: LLM의 출력물에서 모욕적이거나 해로운 언어의 백분율을 결정합니다.
- 작업별 지표: 요약, 번역 등 작업 유형 및 응용 프로그램에 따라 다양한 지표가 존재합니다(BLEU 점수 등).

LLM 평가 프레임워크 및 도구

LLM 평가 프레임워크와 도구는 언어 모델의 성능, 신뢰성 및 공정성을 측정하고 향상시키는 데 표준화된 벤치마크를 제공하기 때문에 중요합니다. 다음은 LLM 평가 프레임워크와 도구 중 일부입니다:



- DeepEval은 기업이 LLM 애플리케이션을 평가할 수 있도록 돕는 오픈 소스 프레임워크입니다. 주요 메트릭인 문맥 기억, 답변 관련성 및 충실도 등 다양한 중요 메트릭에 대한 성능을 측정합니다.
- promptfoo는 LLM 출력 품질과 성능을 평가하기 위한 CLI 및 라이브러리입니다. promptfoo를 사용하면 사전 정의된 테스트를 사용하여 프롬프트와 모델을 체계적으로 테스트할 수 있습니다.
- EleutherAI LM Eval은 최소한의 세밀한 조정으로 다양한 작업에 걸쳐 소량 평가와 성능을 수행합니다.
- MMLU는 제로샷 및 원샷 설정에서 다양한 주제에 대해 모델을 테스트하는 LLM 평가 프레임워크입니다.
- BLEU(BiLingual Evaluation Understudy)는 기계 번역된 텍스트의 유사성을 이미 벤치마킹된 고품질 참조 번역과 측정하는 메트릭입니다. 평가는 0에서 1까지의 범위로 이루어집니다.
- SQuAD(Stanford Question Answering Dataset)는 질문 응답 작업을 위해 LLM을 평가하기 위한 데이터셋입니다. 특정 답변과 관련된 문맥 패스 및 해당하는 질문이 포함됩니다.
- OpenAI Evals는 OpenAI에 의해 LLM을 평가하기 위한 표준 프레임워크이자 벤치마크의 오픈 소스 레지스트리입니다. 이 프레임워크는 LLM 모델의 정확성을 보장하기 위해 사용됩니다.
- UpTrain은 오픈 소스 LLM 평가 도구입니다. 정확성, 환각 및 독성을 포함한 다양한 측면에서 LLM 응답을 확인하기 위한 미리 작성된 메트릭을 제공합니다.
- H2O LLM EvalGPT는 다양한 작업과 벤치마크를 통해 모델의 성능을 이해하는 오픈 도구입니다.

# UpTrain을 사용한 LLM 평가: 노트북 자습서


만약 아직 하지 않았다면, 무료 SingleStore 평가판에 가입하여 자습서에 따라 진행해 보세요. SingleStore 노트북을 사용하게 될 것인데, 이는 Jupyter 노트북과 유사하지만 통합 데이터베이스의 추가 기능과 혜택을 갖추고 있습니다.

가입하면 워크스페이스를 생성해야 합니다.



<img src="/assets/img/2024-05-16-EvaluatingLargeLanguageModelsADevelopersGuide_1.png" />

메인 대시보드로 이동하여 개발 탭을 클릭하세요.

<img src="/assets/img/2024-05-16-EvaluatingLargeLanguageModelsADevelopersGuide_2.png" />

새 노트북을 만들고 원하는 이름을 지정하세요.



<img src="/assets/img/2024-05-16-EvaluatingLargeLanguageModelsADevelopersGuide_3.png" />

이제 시작할 수 있어요. 여기에 표시된 모든 코드를 생성한 노트북에 추가하세요.

'evaluate_llm'이라는 데이터베이스를 생성하세요.

```js
%%sql

DROP DATABASE IF EXISTS evaluate_llm;
CREATE DATABASE evaluate_llm;
```



필요한 패키지를 설치하세요

```js
!pip install uptrain==0.5.0 openai==1.3.3 langchain==0.1.4 tiktoken==0.5.2 --quiet
```

다음 단계는 필요한 환경 변수를 설정하는 것입니다 — 주로 openai 키(응답 생성을 위해), `singlestoredb`(컨텍스트 검색을 위해) 그리고 `uptrain API 키`(응답 평가를 위해)입니다. UpTrain에 계정을 생성하고 무료로 API 키를 생성할 수 있습니다.

자세한 내용은 https://uptrain.ai/ 를 방문해주세요.



```python
import getpass
import os

os.environ['OPENAI_API_KEY'] = getpass.getpass('OpenAI API Key: ')

import openai

client = openai.OpenAI()
```

Add the UpTrain API key.

```python
UPTRAIN_API_KEY = getpass.getpass('Uptrain API Key: ')
```

Import necessary modules




```js
import singlestoredb
from uptrain import APIClient, Evals
from langchain.vectorstores import SingleStoreDB
from langchain.embeddings import OpenAIEmbeddings
```

웹에서 데이터를 로드합니다.

```js
from langchain.document_loaders import WebBaseLoader

loader = WebBaseLoader('https://cloud.google.com/vertex-ai/docs/generative-ai/learn/generative-ai-studio')
data = loader.load()
```

다음으로 데이터를 분할합니다.



```js
from langchain.text_splitter import RecursiveCharacterTextSplitter

text_splitter = RecursiveCharacterTextSplitter(chunk_size=200, chunk_overlap=0)
all_splits = text_splitter.split_documents(data)
```

OpenAI 임베딩을 사용하여 SingleStore 데이터베이스를 설정합니다.

```js
import os
from langchain.vectorstores import SingleStoreDB
from langchain.embeddings import OpenAIEmbeddings
from singlestoredb import create_engine

conn = create_engine().connect()

vectorstore = SingleStoreDB.from_documents(documents=all_splits,
                                           embedding=OpenAIEmbeddings(),
                                           table_name='vertex_ai_docs_chunk_size_200')
```

완전한 단계별 노트북 코드는 저희 스페이스에 있습니다.



마침내 오픈 소스 LLM 평가 도구인 UpTrain을 사용하여 평가를 실행할 것입니다. UpTrain 대시보드에 액세스하여 평가 결과를 확인할 수 있을 겁니다.

다양한 청크 크기로 실험해 보면 다른 결과를 확인할 수 있을 겁니다.

![이미지](/assets/img/2024-05-16-EvaluatingLargeLanguageModelsADevelopersGuide_4.png)

UpTrain의 API 클라이언트는 또한 입력 데이터를 가져와 실행할 체크 목록과 실험에 연결된 열의 이름과 함께 해당 데이터를 평가하는 `evaluate_experiments` 메서드를 제공합니다.



![image](/assets/img/2024-05-16-EvaluatingLargeLanguageModelsADevelopersGuide_5.png)

튜토리얼에서 보여준 LLM 평가 접근 방식과 도구를 따라가면, LLM의 장단점을 보다 깊게 이해할 수 있습니다. 이를 통해 우리는 그들의 능력을 책임 있게 활용하여 사실 불일치와 편향과 관련된 잠재적 위험을 완화할 수 있습니다. 궁극적으로는, 효과적인 LLM 평가는 다양한 LLM 기반 응용 프로그램에서 인공 지능의 윤리적 발전을 위한 신뢰 구축과 증진을 위한 길을 열어줍니다.

오늘 'UpTrain과 함께 LLM 평가하기' 노트북을 시도해보세요!