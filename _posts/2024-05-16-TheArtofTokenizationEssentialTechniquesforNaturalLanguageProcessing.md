---
title: "토큰화의 기술 자연어 처리를 위한 필수 기법"
description: ""
coverImage: "/assets/img/2024-05-16-TheArtofTokenizationEssentialTechniquesforNaturalLanguageProcessing_0.png"
date: 2024-05-16 04:22
ogImage: 
  url: /assets/img/2024-05-16-TheArtofTokenizationEssentialTechniquesforNaturalLanguageProcessing_0.png
tag: Tech
originalTitle: "The Art of Tokenization: Essential Techniques for Natural Language Processing"
link: "https://medium.com/@vishitabatra/the-art-of-tokenization-essential-techniques-for-natural-language-processing-f3307061ed49"
isUpdated: true
---




토큰화가 어떻게 발전해 왔는지 궁금하신가요? 현재의 대형 언어 모델(Large Language Models)은 어떤 기술을 사용하여 토큰화를 수행할까요? 함께 알아보도록 해요!

![이미지](/assets/img/2024-05-16-TheArtofTokenizationEssentialTechniquesforNaturalLanguageProcessing_0.png)

자연어 처리는 트랜스포머 모델 개발 이후 많은 발전을 이루었습니다. 텍스트를 정제한 후 NLP 작업과 관련된 첫 번째 단계는 토큰화입니다. 처음의 화이트스페이스(whitespace) 및 구두점(tokenizer)을 구축한 이후 현재의 문맥적(contextual) 및 구조적(tokenizers) 토크나이저들까지 많은 변화가 있었습니다. 요즘에는 BERT 및 그 변형, ChatGPT, Claude와 같은 생성 모델이 특히 NLP 분야에서 화제가 되고 있습니다. 이 블로그에서는 텍스트 토큰화 과정이 어떻게 발전해 왔는지 및 최신 대형 언어 모델에서 어떻게 사용되고 있는지 알아볼 것입니다.

# 토큰화 기술 발전의 여정



토큰화는 다양한 기술을 사용하여 텍스트 데이터를 작은 조각으로 나누는 것을 말합니다. 모델이 데이터를 더 잘 처리하고 분석할 수 있도록 합니다. 기본 토큰화 기술에는 공백, 단어 및 문장 토큰화가 포함되어 있습니다. 이러한 기술은 어휘 크기 및 정보 손실, 문맥 부족 등과 같은 일부 한계가 있었습니다. 따라서 n-gram, BPE (Byte Pair Encoding), SentencePiece 토큰화와 같은 기술이 소개되었으며 거의 모든 한계를 해소할 수 있었습니다. 이러한 기술은 현재 언어 모델에서 사용되며 임베딩에서 문맥 및 구조적 이해를 캡처하는 데 도움이 됩니다. 이제 각 기술을 자세히 살펴보겠습니다!

## 기본 토큰화 기술

이러한 기술은 데이터를 직관적으로 작은 조각으로 나누는 데 주로 초점을 맞추며 어떤 청크가 다른 청크와 어떻게 관련되어 있는지에 대해 크게 신경쓰지 않습니다. 각 기술이 작동하는 방식에 대한 자세한 설명은 다음과 같습니다:

1. 공백 토큰화 - 탭, 공백, 새 줄 등의 공백을 기준으로 텍스트를 분할합니다. 이 기술은 모든 단어가 공백으로 분리되어 있다고 가정합니다.
   
:warning: 한계
- 문맥적 의미 손실: 단어를 별도의 토큰으로 취급하여 종종 문장 내에서의 관계를 간과합니다.
- 어휘 폭발: 각 고유한 단어가 토큰이 되므로, 어떠한 언어도 수십억 개의 단어를 가질 수 있기 때문에 종종 매우 큰 훈련 어휘로 이어집니다.
- 잡음이 많은 데이터 처리 어려움: 이모지, 과도한 문장 부호 또는 특수 문자를 처리하지 못하여 토큰화가 부정확해집니다.




![word tokenization](/assets/img/2024-05-16-TheArtofTokenizationEssentialTechniquesforNaturalLanguageProcessing_1.png)

2. 단어 토큰화 - 공백을 기반으로 분할된 문장 토큰화에서 문장의 기본 단위로 단어가 따로 있다고 가정합니다.
⚠️ 한계
- 단어 사이의 상황적 의미 손실
- 어휘폭발

![sentence tokenization](/assets/img/2024-05-16-TheArtofTokenizationEssentialTechniquesforNaturalLanguageProcessing_2.png)

3. 문장 토큰화 - 마침표, 물음표 등의 구두점 및 다른 언어별 규칙을 이해하여 문장을 기준으로 텍스트를 분할합니다.
⚠️ 한계 - 기계 번역 등의 작업에 유용하지만 여전히 단어 수준 토큰화에 의존하며 이로 인한 한계를 물려받습니다.




💻 위의 세 가지 토큰화 기법을 보여주는 코드입니다:

```js
# NLTK 사용
import nltk
from nltk.tokenize import word_tokenize, sent_tokenize

nltk.download('punkt')

# 입력 문장
text = "When I left the place, I didn't take the left turn."

# 공백 기준 토큰화
whitespace_tokens = text.split()

# 단어 토큰화
word_tokens = word_tokenize(text)

# 문장 토큰화
sentence_tokens = sent_tokenize(text)

print("Whitespace Tokenization:", whitespace_tokens)
print("Word Tokenization:", word_tokens)
print("Sentence Tokenization:", sentence_tokens)
```

또한 SpaCy, Scikit-learn, Stanza 등의 다른 파이썬 라이브러리도 이러한 토큰화 기술을 수행할 수 있습니다.

# 고급 토큰화 기술



고급 기술은 위에서 언급한 한계를 완화하려고 시도하고, 단어 간 상호 관계 및 문장 내 맥락에 초점을 맞추려고 노력합니다. 이 기술이 어떻게 작동하는지 살펴봅시다:

️1. N-그램-
▪ 텍스트를 슬라이딩 윈도우 방식으로 분할하여 지정된 N 길이의 토큰을 만듭니다.
▪ 이 방법은 서로 가깝게 발생하는 단어 간의 관계를 잡아냅니다.
💡이 기술은 음성 인식, 텍스트 완성 등과 같은 새로운 작업에서 기본적인 역할을 합니다.
⚠️ 한계 — 연속된 단어와의 관계만 파악합니다. 더 긴 문장에 대해선 다시 맥락이 사라집니다.

![image](/assets/img/2024-05-16-TheArtofTokenizationEssentialTechniquesforNaturalLanguageProcessing_3.png)

2. 바이트 쌍 부호화-
▪ 여기서는 학습 텍스트에 포함된 모든 문자/바이트를 사용하여 먼저 어휘집을 만듭니다.
▪ 연속 발생 문자의 빈도수에 기반하여 어휘집을 반복적으로 업데이트합니다.
▪ 중지 조건(또는 최대 병합 수)이 충족되면 입력 텍스트(테스트 입력)는 이 생성된 어휘집을 기반으로 분할됩니다.
▪ 어휘 외 단어를 처리할 수 있으며 어휘 크기가 무너지지 않습니다.
💡RoBERTa, GPT2는 이 토큰화 기술을 사용합니다.
⚠️ 한계-
▪ 훈련 단계에서 개발된 고정된 어휘 크기로 인해 때로는 새로운 단어에 문제가 생기기도 합니다.
▪ 이 알고리즘은 가장 빈도가 높은 단어들을 모아 사용하며, 문장의 형태학적 및 문맥적 복잡성을 무시합니다.



<img src="/assets/img/2024-05-16-TheArtofTokenizationEssentialTechniquesforNaturalLanguageProcessing_4.png" />

3. SentencePiece-  
- SentencePiece는 Unigram과 Dynamic Programming 또는 BPE 알고리즘을 사용하는 서브워드 토큰화 라이브러리입니다.
- 입력 텍스트를 Unicode 문자로 사용하므로 초기 단어 토큰화가 필요없습니다.
- 단일 모델을 사용하여 여러 언어를 처리할 수 있습니다.
- 처음에 Unicode 문자 수준 토큰을 생성하기 때문에 텍스트의 토큰화 및 디토큰화를 모두 도와 전처리 및 후처리를 쉽게 만들어 줍니다.
💡BERT, XLNet, T5 등 많은 HuggingFace 트랜스포머 모델이 이 토크나이저를 사용하고 있습니다. 이는 오픈 소스로 잘 유지되는 라이브러리입니다.
⚠️ 제한 사항-  
- 언어에 독립적이지만 다양한 언어에 대해 사용할 때 성능이 달라질 수 있습니다.
- 문단이나 섹션과 같은 문맥 및 구조적 세부 정보를 고려하지 않고 하위 단어의 시퀀스로 텍스트를 여전히 취급합니다.

💻 위의 세 가지 토큰화 기술을 보여주는 코드:

```js
# 필요한 라이브러리 가져오기
import sentencepiece as spm
from tokenizers import ByteLevelBPETokenizer
model_path = "모델을 저장할 경로"
train_text = "훈련을 위한 txt 파일 경로"

###############################
# BPE 구현
###############################

BPE_tokenizer = ByteLevelBPETokenizer()

# utf-8 인코딩된 코퍼스로 토크나이저 훈련시키기
BPE_tokenizer.train(files=['훈련을 위한 txt 파일 경로'], vocab_size=1000, min_frequency=2)

# 훈련된 토크나이저 저장
model_path = '모델을 저장할 경로'
BPE_tokenizer.save_model(model_path)

# 훈련된 토크나이저 불러오기
BPE_tokenizer = ByteLevelBPETokenizer.from_file(f"{model_path}/vocab.json", f"{model_path}/merges.txt")

# 텍스트 토큰화
text = "I would love to see a lion!"
BPE_encoded_tokens = BPE_tokenizer.encode(text)

print("원본 텍스트:", text)
print("인코딩된 토큰:", BPE_encoded_tokens.tokens)


###############################
# SentencePiece 구현
###############################

spm.SentencePieceTrainer.train(input=train_text, model_prefix=model_path, vocab_size=1000, num_threads=4)

# 사전 훈련된 모델 불러오기
sp_model = model_path + ".model"
sp = spm.SentencePieceProcessor(model_file=sp_model)

text = "I would love to see a lion when we reach the zoo!"

# 서브워드 토큰화 및 토큰 반환
tokens_subword = sp.encode_as_pieces(text)
# 서브워드 토큰화 및 토큰 ID 반환
tokens_ids = sp.encode_as_ids(text)
# 바이트 수준 토큰화 및 바이트 수준 토큰 ID 반환
tokens_byte = sp.encode(text)

# 토큰을 다시 텍스트로 디코딩
decoded_text = sp.decode_pieces(tokens_subword)

print("원본 텍스트:", text)
print("토큰화된 텍스트:", tokens_subword)
print("디코딩된 텍스트:", decoded_text)
```



이러한 고급 토큰화 기술을 사용하여 추출한 토큰들은 BERT, GPT 등과 같은 고급 언어 모델을 사용하는 작업에 필요한 첫 번째 단계입니다. 이러한 토큰들은 모델로 전송되어 임베딩으로 변환되어 전체 텍스트의 문맥적 및 구조적 의미를 포착합니다.