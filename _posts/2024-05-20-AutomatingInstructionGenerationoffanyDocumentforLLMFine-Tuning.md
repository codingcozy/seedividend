---
title: "문서에서 LLM 세부 조정을 위한 지시 생성 자동화"
description: ""
coverImage: "/assets/img/2024-05-20-AutomatingInstructionGenerationoffanyDocumentforLLMFine-Tuning_0.png"
date: 2024-05-20 22:04
ogImage: 
  url: /assets/img/2024-05-20-AutomatingInstructionGenerationoffanyDocumentforLLMFine-Tuning_0.png
tag: Tech
originalTitle: "Automating Instruction Generation off any Document for LLM Fine-Tuning"
link: "https://medium.com/ai-advances/automating-instruction-generation-off-any-document-for-llm-fine-tuning-5180d7288ccc"
---



![Automating Instruction Generation](/assets/img/2024-05-20-AutomatingInstructionGenerationoffanyDocumentforLLMFine-Tuning_0.png)

큰 언어 모델 (LLM)은 뛰어난 생성 능력으로 다양한 제품에 진입하고 있으며, 우리는 새로운 응용 분야가 버섯처럼 생겨나고 있다는 것을 발견하고 있습니다. 이러한 모델들은 일반적인 도구이며 종종 도메인 특화 지식이 부족하여 그 영향력이 다소 줄어들 수 있습니다. 이러한 유용한 도메인 지식은 분산된 기업 리포지토리에 숨겨져 있을 수 있습니다.

귀하의 도메인 데이터로 사용자 정의 LLM을 세밀 조정하면 이 간극을 좁히는 데 도움이 될 수 있습니다. 이 과정으로 나아가는 데 중요한 단계 중 하나가 데이터 준비입니다. 이는 데이터의 품질이 세밀 조정된 모델의 성능에 중대한 영향을 미칠 것이기 때문에 중요한 단계입니다. 이러한 데이터 세트를 수동으로 정비하려고 하면 매우 비용이 많이 들고 시간이 많이 소요되는 작업일 수 있습니다.

이 기사에서는 Mistral 7B Instruct 모델을 사용하여 내부 문서에서 지침 및 교육 데이터 세트를 자동으로 생성하는 비용 효율적인 대안을 탐색할 것입니다. 우리는 귀하의 도메인을 포괄적으로 다룰 수 있는 지침 생성의 새로운 접근법을 취할 것입니다. Mistral 7B는 또한 학습 데이터 세트 생성을 위해 검색 보조 생성 (RAG) 설정에서 사용됩니다. 한번 훈련 데이터 세트를 확보하면 이 데이터 세트를 사용하여 Mistral 7B를 실제로 세밀히 조정하여 지역 도메인 지식으로보갰습니다.MLX 프레임워크 라이브러리를 호출합니다.


<div class="content-ad"></div>

지시 생성부터 모델 세밀 조정까지의 종단 간 워크플로우를 탐색할 예정이에요. 여기에서 다뤄야 할 내용이 많아요. 시작해 볼까요!

## 목차

1.0 주요 활성화 기술 개요
2.0 설계 및 구현
2.1 지시 생성
2.2 훈련 데이터셋 생성
2.3 Function main
3.0 지시 생성 실행
4.0 훈련 데이터셋 생성 실행
5.0 MLX를 사용한 세밀 조정
6.0 모델 유효성 검사
7.0 최종 생각들

# 1.0 주요 활성화 기술 개요

<div class="content-ad"></div>

이 작업은 RAM이 8GB인 MacBook Air M1에서 진행될 예정입니다. 상대적으로 제한된 컴퓨팅 및 메모리 리소스 때문에 Mistral 7B Instruct v0.1 모델의 4비트 양자화 버전을 채택하고 있습니다. GGUF 형식의 이러한 양자화된 모델을 로드하기 위해 llama-cpp-python 라이브러리를 사용할 것입니다. 이 라이브러리는 llama.cpp 라이브러리의 파이썬 바인딩입니다.

faiss-cpu는 CPU를 사용하여 밀집 벡터의 효율적인 유사성 검색 및 클러스터링을 위한 라이브러리입니다. 교육 데이터 생성을 위해 RAG 기술을 채택할 것입니다. RAG 애플리케이션에는 FAISS 벡터스토어에서 관련 문서 스니펫을 검색하는 리트리버 시스템과 검색된 스니펫을 컨텍스트로 사용하여 응답을 생성하는 LLM이 포함됩니다. 이전 연구에서 앙상블 리트리버가 적합하다는 것을 보여준 바 있습니다. 그 결과물을 근거로 선택한 리트리버 목록에서 Reciprocal Rank Fusion 알고리즘을 사용하여 결과를 앙상블하고 재정렬합니다. 우리는 앙상블을 위해 BM25 리트리버와 FAISS 리트리버를 0.3:0.7의 비율로 결합할 것입니다.

마지막으로 중요한 기술 부분은 세밀한 조정과 관련이 있습니다. llama.cpp 및 MLX 프레임워크 라이브러리는 세밀한 조정을 지원하기 위한 도구를 제공합니다. 후자는 Apple 실리콘을 활용하여 하드웨어 가속을 제공하여 맥에서 세밀한 조정이 매우 간편해지도록 하는 것입니다. 따라서 우리는 여기서 MLX를 채택할 것입니다.

이제 개발 환경을 준비할 준비가 되었습니다. 이 프로젝트를 관리하기 위해 가상 환경을 생성합시다. 환경을 생성하고 활성화하려면 다음을 실행합시다:

<div class="content-ad"></div>


python3.10 -m venv llm_tuning
source llm_tuning/bin/activate


다음으로 필요한 모든 라이브러리를 설치합니다:


pip install langchain faiss-cpu sentence-transformers flask-sqlalchemy psutil unstructured pdf2image unstructured_inference pillow_heif opencv-python pikepdf pypdf
pip install mlx
CMAKE_ARGS="-DLLAMA_METAL=on" FORCE_CMAKE=1 pip install --upgrade --force-reinstall llama-cpp-python --no-cache-dir


위 마지막 줄은 M1 프로세서에서 하드웨어 가속을 사용하여 Mistral 7B를 양자화한 llama-cpp-python 라이브러리를 설치하는 과정을 포함합니다. Metal을 사용하면 계산이 GPU에서 실행됩니다.


<div class="content-ad"></div>

환경이 준비되었으니, 시스템 설계와 구현을 살펴봅시다.

# 2.0 설계 및 구현

그림 1에 설명된대로 데이터셋 생성 시스템에는 두 개의 모듈이 있습니다.

<img src="/assets/img/2024-05-20-AutomatingInstructionGenerationoffanyDocumentforLLMFine-Tuning_1.png" />

<div class="content-ad"></div>

LoadVectorize 모듈은 최근에 출시된 (2023 년 12 월) 440 페이지의 IT 벤더 배포 가이드를 로드하는 작업을 포함합니다. 또한 문서 분할 및 벡터화를 처리하며, BM25 검색기의 인스턴스화도 처리합니다. 이 모듈은 이전 작업에서 소개되었고 여기서 그대로 사용되었습니다 [1].

두 번째 모듈에는 두 가지 주요 기능이 포함되어 있습니다. 첫 번째 기능은 지시 생성을 다룹니다. 이는 QA 체인을 사용하여 문서 청크 목록의 맥락에서 지시 생성을 수행하는 작업입니다. 두 번째 기능은 앙상블 검색기의 인스턴스화를 수행한 다음 앙상블 검색기의 맥락에서 지시 목록을 대상으로 QA 체인을 생성하는 작업을 합니다.

이제 두 번째 모듈을 깊이 있는 살펴보겠습니다.

## 2.1 지시 생성

<div class="content-ad"></div>

이 종단 간 워크플로우에서는 Riverbed SteelHead에 대한 샘플 400페이지 이상의 PDF 문서를 도메인 지식으로 사용하고 있습니다. Riverbed SteelHead는 응용 프로그램 가속 솔루션입니다. 첫 번째 단계로 Mistral 7B를 언어 모델로 사용하여 이 문서와 관련된 지침(또는 프롬프트)를 생성할 것입니다.

여기서 주요 설계 과제는 LLM이 아직 익숙하지 않은 영역에 대해 어떤 지시를 생성해야 하는지를 어떻게 판단할 것인가입니다. 이는 모든 내부 문서에 일반적으로 적용될 수 있는 과제입니다. 벡터화 단계의 일환으로, FAISS vectorstore는 문서 청크에 대한 참조를 갖고 있습니다. 이 청크들은 총체적으로 도메인 지식을 형성합니다. 이 지시 생성 함수의 주요 아이디어는 각 청크를 개별적인 컨텍스트로 사용하여 LLM이 지시를 생성하게 하는 것입니다. 각 청크가 가진 지식을 포괄적으로 다룰 수 있는 지침을 제공하기 위해 모든 문서 청크에 대해 이상적으로는 지침을 생성해야 합니다. 생성된 지시의 수는 채택된 문서 청크 크기에 비례해야 합니다. 시간과 플랫폼 리소스 제한으로 인해 이번 데모에서는 100개의 임의의 문서 청크에 대해 두 가지 질문을 생성할 것입니다.

문서 청크에 액세스하려면 FAISS 객체에서 docstore 객체를 가져와야 하며, 모든 문서 청크를 나타내는 docstore_id 목록을 가져오십시오. 각 반복에서 관련 문서 청크를 찾아 이를 질의 체인을 위한 컨텍스트로 사용합니다.

이 지시 생성을 위한 프롬프트는 다음과 같습니다:

<div class="content-ad"></div>

선택된 각 문서 청크를 반복하면서 해당 청크를 컨텍스트로 하고 위 프롬프트를 사용하여 QA 체인을 호출합니다. 생성된 지시 사항은 진행 상황을 나타내며, 소요된 시간과 함께 콘솔에 표시됩니다. 생성된 지시 사항은 instructions.txt 파일에 저장됩니다. 생성 진행 상황을 나타내기 위해 각 반복마다 현재 질문 번호와 소요된 시간이 표시됩니다. 이해를 돕기 위해 다음 목록은 generate_instructions 함수의 코드를 보여줍니다.

```js
def generate_instructions(db,QA_PROMPT,llm) -> None:
    output_parser = StrOutputParser()
    # Custom QA Chain
    chain = (
        {"context": RunnablePassthrough() , "question": RunnablePassthrough()}
        | QA_PROMPT
        | llm
        | output_parser
        )

    # access docstore and docstore id for 100 random chunks
    vs = db.__dict__.get("docstore")
    docstore_id_list = list(db.__dict__.get("index_to_docstore_id").values())
    rand_doc_id_list = random.choices(docstore_id_list, k=200)

    query = '''
    제공된 컨텍스트를 기반으로 SteelHead에 대한 두 가지 질문을 생성하세요. 질문은 SteelHead WAN 가속 및 관련 개념에 관한 것이어야 합니다. 질문은 다음 중 하나로 시작해야 합니다: "What", "How', "Is there a", "What are the", "How do I", "When is it", "Does SteelHead have", "How to", "What is the difference", "Which", "List". 각 질문에 대한 답변이나 범주를 제공할 필요는 없습니다.
    '''
    qfile = open("instructions.txt", "w")
    start_gen = timeit.default_timer()
    for i,doc_id in enumerate(rand_doc_id_list):
        start = timeit.default_timer()
        a_doc = vs.search(doc_id)
        result = chain.invoke({"question": query, "context": a_doc.page_content})
        resp_time = timeit.default_timer() - start # seconds
        print(f'{"-"*50}\nQ #{i}: {result}\nTime: {resp_time}\n{"-"*50}\n')
        qfile.write(result)
    qfile.close()
    # total time for generation
    gen_time = timeit.default_timer() - start_gen # seconds
    print(f'Total generation time => {timedelta(seconds=gen_time)}')
```

이제 이 모듈의 두 번째 주요 함수를 살펴봅시다.

## 2.2 Training Dataset Generation

<div class="content-ad"></div>

지시 사항이 준비되었으면 이제 훈련 데이터 세트 생성을 진행할 수 있습니다. 이전과 마찬가지로 Mistral 7B를 LLM으로 사용하며, 이번에는 RAG 설정을 사용합니다. 우리는 FAISS 최대 여유도(MMR) 및 BM25 검색기의 EnsembleRetriever를 사용할 것입니다. 이전에 언급한 바와 같이 이러한 검색기 목록에 대해 0.3:0.7 비율이 최상의 정확도 성능을 달성했음을 보여주었습니다.

지시 사항을 반복하면 LLM에 대한 쿼리를 실행하여 해당 답변을 사용하여 다음 형식의 JSON 문자열을 생성합니다:

`s`[INST] 'instruction'[/INST] 'answer'`/s`

훈련 데이터 세트를 준비하면 이 데이터 세트의 80%가 훈련에 사용되어 train.jsonl에 저장됩니다. 남은 20%의 데이터 세트는 검증에 사용되어 valid.jsonl로 저장됩니다. 아래 목록은 위 절차를 generate_training 함수로 캡처한 것입니다.

<div class="content-ad"></div>

```python
def generate_training(db, bm25_r, QA_PROMPT, llm) -> None:
    # retriever 생성
    faiss_retriever = db.as_retriever(search_type="mmr", search_kwargs={'fetch_k': 3}, max_tokens_limit=1000)
    ensemble_retriever = EnsembleRetriever(retrievers=[bm25_r, faiss_retriever], weights=[0.3, 0.7])
    output_parser = StrOutputParser()
    # 사용자 지정 QA Chain
    chain = (
        {"context": ensemble_retriever | format_docs, "question": RunnablePassthrough()}
        | QA_PROMPT
        | llm
        | output_parser
    )
    with open('instructions.txt') as tfile:
        instructions = tfile.readlines()
    start_t_gen = timeit.default_timer()
    train_lines = list()
    for i, instruction in enumerate(instructions, start=1):
        print(f"처리 중 ({i}/{len(instructions)}):")
        start = timeit.default_timer()
        try:
            answer = chain.invoke(instruction)
        except Exception as e:
            # LLM으로 답변할 수 없는 질문 건너뛰기
            print(f'답변 실패 => {e}')
            continue
        resp_time = timeit.default_timer() - start # 초
        print(f'{"-"*50}\n질문 #{i}: {instruction}\n답변: {answer}\n소요 시간: {resp_time}\n{"-"*50}\n')
        result = json.dumps({
            'text': f'<s>[INST] {instruction}[/INST] {answer}</s>'
        }) + "\n"
        # 임시 파일에 작성
        with open('train_valid.jsonl', 'a') as file:
            file.write(result)
        train_lines.append(result)
    gen_time = timeit.default_timer() - start_t_gen # 초
    with open('train.jsonl', 'w') as file:
        file.writelines(train_lines[:int(len(train_lines) * 0.2)])
    with open('valid.jsonl', 'w') as file:
        file.writelines(train_lines[int(len(train_lines) * 0.2):])
    print(f'총 학습 생성 시간 => {timedelta(seconds=gen_time)}')
```

위의 주요 함수 중 하나를 호출하려면 다음에 설명된 대로 main 함수를 사용합니다.

## 2.3 main 함수

이 함수에서 두 함수에서 사용하는 여러 개의 공통 개체가 인스턴스화됩니다. 먼저 프롬프트 템플릿이 정의됩니다. 그런 다음 LlamaCpp를 사용하여 4비트 Mistral 7B Instruct 모델을 GGUF 형식으로 로드합니다. 그런 다음 pdf 문서를 벡터화하고 해당 FAISS 객체에 대한 참조 및 BM25 검색기를 얻습니다.

<div class="content-ad"></div>

두 가지 생성 함수 중 어느 것이든 쉽게 호출할 수 있도록 명령줄 옵션을 사용해 보겠습니다. 'main' 함수는 최대 두 개의 부울 인수를 받아들이게 됩니다. 이는 제공된 명령줄 옵션에 의해 제어될 것입니다. 명령줄 옵션을 통해 발표나 훈련 데이터셋 생성 작업 중 어떤 것을 실행할지 결정하기 위해 라이브러리 argparse를 활용하겠습니다.

아래 코드는 이러한 명령줄 옵션 처리 및 'main' 함수를 포함하고 있습니다.

```python
def main(is_gen_instruct=False, is_gen_training=False):
    # 프롬프트 템플릿
    qa_template = """<s>[INST] 이 신종은 도움이 되는 조수입니다.
    아래 컨텍스트를 사용하여 이하의 질문에 정확하고 간결하게 답하세요:
    {context}
    [/INST] </s>{question}
    """

    # 프롬프트 인스턴스 생성
    QA_PROMPT = PromptTemplate.from_template(qa_template)

    llm = LlamaCpp(
        model_path="./models/mistral_7b_gguf/mistral-7b-instruct-v0.1.Q2_K.gguf",
        temperature=0.01,
        max_tokens=2000,
        top_p=1,
        verbose=False,
        n_ctx=3000
    )
    db, bm25_r = LoadVectorize.load_db()
    if is_gen_instruct:
        generate_instructions(db, QA_PROMPT, llm) 
    elif is_gen_training:
        generate_training(db, bm25_r, QA_PROMPT, llm) 

if __name__ == "__main__":
    # 파서 초기화
    parser = argparse.ArgumentParser("LLM 미세 조정을 위한 명령어 생성 스크립트")
    group = parser.add_mutually_exclusive_group()

    # 선택적 상호배제 인수 추가
    group.add_argument("-i", "--instructions", action='store_true', help = "지시사항 생성")
    group.add_argument("-t", "--training", action='store_true', help = "훈련 및 검증 데이터 생성")

    # 명령줄에서 인수 읽기
    args = parser.parse_args()
    if args.instructions:
        main(is_gen_instruct=args.instructions)
    elif args.training:
        main(is_gen_training=args.training)  
```

이로써 데이터 생성 시스템 구현이 완료되었습니다. 이 시스템에 대한 전체 코드는 다음 GitHub 저장소에서 확인할 수 있습니다:

<div class="content-ad"></div>

자, 이제 한 번 시도해 봅시다!

# 3.0 지시 생성 실행

이 연습에서는 코드를 -i 명령행 옵션과 함께 실행하여 지시 생성 프로세스를 시작할 것입니다. 다음 콘솔 출력 추출은 200개의 질문을 생성하기 위한 실행을 나타냅니다. 이 과정 전체는 제 맥에서 2시간 넘게 소요되었습니다.

```js
$ python main.py -i

--------------------------------------------------
Q #0: 
1. SteelHead에서 QoS 설정을 어디서 찾을 수 있을까요?
2. MX-TCP와 TCP 간에 패킷 손실 처리 측면에서 차이가 있나요?
시간: 57.88847145799991
--------------------------------------------------

--------------------------------------------------
Q #1: 
1. SteelHead에서 SSL 구성 정보를 어디서 찾을 수 있을까요?
2. SSL 구성을 위해 클라이언트 가속기 간에 신뢰 관계가 필요한가요?
시간: 47.30005858300001
--------------------------------------------------

--------------------------------------------------
Q #2: 
1. 클러스터 내의 SteelHead 간 연결 전달을 활성화하는 구성은 어디에 있나요?
2. 동일 SteelHead에서 다중 인터페이스를 사용하는 것과 ITD 고가용성 배포를 위해 여러 SteelHead를 사용하는 것 사이에 차이가 있나요?
시간: 70.70811329100025
--------------------------------------------------

--------------------------------------------------
Q #3: 
1. PBR 배포에 사용되는 SteelHead에서 CDP를 어디서 활성화할까요?
2. SteelHead에서 CDP를 활성화하기 위해 사용해야 하는 특정 명령이 있나요?
시간: 68.81058954199989
--------------------------------------------------
...

Q #99: 
1. SteelHead WAN 가속화의 정확한 주소 할당은 무엇인가요?
2. 정확한 주소 할당은 SteelHead에서 연결 풀 가속화를 어떻게 가능하게 할까요?
시간: 63.51242004099913
--------------------------------------------------

총 생성 시간 => 2:06:10.565294
```

<div class="content-ad"></div>

생성된 지침을 검토한 결과, 많은 좋은 질문이 나왔어요. 그런데 "어디서 찾을 수 있나요"와 같은 질문들이 많았는데, 이는 도메인 지식을 얻는 데 도움이 되지 않는다고 생각해서 목록에서 제외했어요. 또한, 일부 문서 청크에 대한 질문들이 거의 동일한 경우가 많았고, 이러한 중복들은 제거했어요. 마지막으로, 부정확하거나 의미 없는 질문들이 몇 개 있었어요. 이 모든 정제 작업을 거친 뒤에 좋은 질문이 150개 남았어요. 또한, 질문들이 번호 매겨지고 예상치 못한 서식이 있어서 조정해야 했어요. 이것은 다음 작업을 위해 데이터 품질을 보장하기 위한 인간의 개입이 필요함을 명확히 보여줍니다.

지침이 준비되었으니, 이제 훈련 데이터 집합 생성을 진행합시다.

# 4.0 훈련 데이터 집합 생성 실행

이제 동일한 스크립트를 -t 옵션을 사용하여 실행하여 훈련 및 검증 데이터 집합 생성을 시작합니다. 제 리소스가 제한된 기기에서는 시간이 많이 걸렸어요. 다행히 콘솔 출력을 통해 진행 상황을 잘 파악할 수 있었어요. 이 실행 중에 발생하는 열의 양 때문에 Mac을 일부러 공중에 두어 냉각 효과를 향상시켰어요. 아래는 이 실행의 콘솔 출력 일부입니다:

<div class="content-ad"></div>


```js
$ python main.py -t

처리 중 (1/150):
--------------------------------------------------
Q #1: MX-TCP와 TCP 간의 데이터 손실 처리 방식에는 차이가 있나요?
A:
네, MX-TCP와 TCP 간에는 데이터 손실 처리에 차이가 있습니다. MX-TCP는 쓰루풋 감소 없이 데이터 손실을 처리하기 위해 설계되었으며, TCP는 일반적으로 데이터 손실 시 쓰루풋이 감소합니다. MX-TCP는 WAN을 통해 전방 오류 수정을 통해 데이터 손실을 효과적으로 처리합니다.
시간: 152.08327770899996

처리 중 (2/150):
--------------------------------------------------
Q #2: 클러스터 내의 SteelHeads 간 연결 전달을 활성화하기 위한 구성은 어디에 있나요?
A:
클러스터 내의 SteelHeads 간 연결 전달을 활성화하려면 각 SteelHead의 CLI에서 두 SteelHeads의 in-path0_0 IP 주소를 이웃으로 구성해야 합니다. 그런 다음 다음 명령을 각 SteelHead의 CLI에서 입력할 수 있습니다:

enable
configure terminal
SteelHead communication enable
SteelHead communication multi-interface enable
SteelHead name <SteelHead name> main-ip <SteelHead IP address>

연결 전달을 활성화한 후, ITD 배포에서 더 큰 탄력성과 중복성을 제공하기 위해 fail-to-block 및 allow-failure 명령을 구성할 수 있습니다.
시간: 215.70585895799923

처리 중 (3/150):
--------------------------------------------------
Q #3: 동일한 SteelHead에서 여러 인터페이스를 사용하는 것과 ITD 고가용성 배포를 위해 여러 SteelHeads를 사용하는 것 사이에는 차이가 있나요?
A:
네, 동일한 SteelHead에서 여러 인터페이스를 사용하는 것과 ITD 고가용성 배포를 위해 여러 SteelHeads를 사용하는 것 사이에 차이가 있습니다. 동일한 SteelHead에서 여러 인터페이스를 사용하면 하나의 SteelHead 이상의 가속 쓰루풋 용량을 제공할 수 있지만, 여러 SteelHeads를 사용하는 것보다 동일한 수준의 중복성이나 탄력성을 제공하지 않을 수 있습니다. 반면, 여러 SteelHeads를 사용하면 더 큰 중복성과 탄력성을 제공할 수 있지만, 동일한 SteelHead에서 여러 인터페이스를 사용하는 것만큼의 가속 쓰루풋 용량을 제공하지 않을 수 있습니다.
시간: 179.73986179200074

...

처리 중 (150/150):
--------------------------------------------------
Q #150: SteelHead에서 올바른 주소 지정은 연결 풀 가속을 어떻게 가능하게 합니까?

A:

올바른 주소 지정을 통해 SteelHead에서 연결 풀 가속을 가능하게 함으로써 미리 서로간에 다수의 TCP 연결을 생성할 수 있습니다. 이는 올바른 주소 지정이 TCP/IP 패킷 헤더의 특정 값을 사용하므로 SteelHeads가 필요한 클라이언트 및 서버 IP 주소 및 포트 유형을 감지할 수 있기 때문입니다. 투명 주소 지정이 활성화된 경우 SteelHeads는 클라이언트 및 서버 IP 주소 및 포트 유형을 감지할 수 없기 때문에 미리 TCP 연결을 생성할 수 없습니다. 가속하려는 연결 수가 SteelHead 모델의 한계를 초과하는 경우, 초과된 연결은 SteelHead에 의해 가속되지 않고 통과됩니다.
시간: 159.28865737500018
--------------------------------------------------


총 교육 세대 생성 시간 => 9:20:06.321521
```

이 교육 데이터세트 생성에는 9시간 이상이 소요되었습니다! 문서의 일부에 대해 언어 모델이 답변을 생성하지 못한 경우도 몇 가지 발생했습니다. 1,200개 이상의 청크가 포함된 선택된 문서를 종합적으로 다루려면 2,000개 이상의 지시어가 필요할 수 있으며, 이는 실행 기간 동안 내 Mac이 지속적인 고온을 견딜 수 있을 때에만 가능할 것입니다! 그래도 전체적인 프로세스를 보여주기 위해 우리는 다음 제한된 교육 데이터세트로 세밀한 조정을 진행할 것입니다.

# 5.0 MLX를 사용한 세밀 조정

MLX는 Apple 실리콘 기반의 머신 러닝 연구를 위한 배열 프레임워크입니다 [2]. Llama, Mistral 및 TinyLlama와 같은 LLM에 대한 텍스트 생성 및 세밀 조정에 사용될 수 있습니다. 세밀 조정을 위해 모델은 MLX에서 인식하는 형식이어야 하므로 이전에 사용했던 GGUF 버전을 사용할 수 없습니다. MLX는 mlx-examples Github 저장소의 스크립트를 제공하여 전체 워크플로우를 지원합니다. 아래와 같이 생성 시스템의 디렉터리 내에서 MLX 예제 저장소를 클론해 보겠습니다:


<div class="content-ad"></div>

```bash
$ git clone https://github.com/ml-explore/mlx-examples.git
```

HuggingFace에서 Mistral 7B를 다운로드하고 4비트 모델로 양자화하려면 convert.py 스크립트를 사용할 수 있습니다. 이 스크립트는 기본적으로 입력으로 HuggingFace repo를 취하고 결과를 디렉토리 mlx_model에 출력합니다. 다음은 샘플 실행 출력입니다:

```bash 
$ python mlx-examples/lora/convert.py --hf-path mistralai/Mistral-7B-Instruct-v0.1 -q
[INFO] Loading
model-00003-of-00003.safetensors: 100%|█████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 4.54G/4.54G [33:52<00:00, 2.23MB/s]
model-00001-of-00003.safetensors: 100%|█████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 4.94G/4.94G [36:15<00:00, 2.27MB/s]
model-00002-of-00003.safetensors: 100%|████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
```

<div class="content-ad"></div>

이전 섹션에서의 훈련 데이터셋으로 모델을 세밀하게 조정할 준비가 되었습니다. MLX는 파라미터 효율적 세밀조정(PEFT)을 LoRA를 통해 지원합니다. LoRA는 모델의 일부 파라미터를 업데이트하는 데 중점을 둡니다. 종종 특정 레이어나 모델의 일부를 동결하는 것을 포함합니다. 이 방법을 사용하면 세밀조정이 빨라집니다. 또한 MLX는 양자화된 모델에서 QLoRA를 사용합니다.

이제 lora.py 스크립트가 도움이 될 것입니다. 모델이 양자화되었음을 감지하면 이 스크립트는 자동으로 QLoRA를 사용하도록 전환합니다. --data 옵션은 훈련 및 검증 데이터셋이 포함된 디렉터리를 지정하는 데 사용됩니다. --lora-layers 옵션은 세밀 조정할 레이어 수를 설정하는 데 사용됩니다. 그리고 --iters 옵션은 훈련 반복 횟수를 지정합니다. 학습률 및 샘플링 온도와 같은 다른 선택적 설정도 있으며, 세밀 조정을 제어하는 데 사용할 수 있습니다. 모든 도움말 목록을 보려면 단순히 -h 옵션을 사용하여 스크립트를 실행하십시오.

다음 콘솔 출력은 저희 모델에 대한 세밀 조정 실행을 보여주며, 저의 Mac에서 약 40분이 소요되었습니다:

```js
$ python mlx-examples/lora/lora.py \
  --train \
  --model ./mlx_model \
  --data ./ \
  --batch-size 1 \
  --lora-layers 2 \
  --iters 1000
미리 훈련된 모델 로딩 중
총 파라미터 1242.550M
조정 가능한 파라미터 0.213M
데이터셋 로딩 중
훈련 중
반복 1: 검증 손실 3.565, 소요 시간 32.649초
반복 10: 훈련 손실 3.008, Iter/sec 0.401, 토큰/sec 80.419
...
반복 1000: 훈련 손실 1.511, Iter/sec 0.361, 토큰/sec 74.861
반복 1000: 검증 손실 1.777, 소요 시간 31.679초
반복 1000: adapter 가중치를 adapters.npz에 저장했습니다.
```

<div class="content-ad"></div>

트레이닝 시작 시 3.008의 손실이 있었고, 마지막 반복 중에는 1.511까지 떨어졌어요. 기본적으로 모델은 매 100번의 반복마다 저장됩니다. 제 컴퓨터의 자원 한정 때문에 lora 레이어를 두 개 이상 사용하면 시스템이 메모리 부족으로 작동을 멈춥니다. 그러나 귀하의 컴퓨터에 더 많은 RAM이 있다면, 레이어 수를 더 많이 실험해보세요.

미세 조정이 완료된 후, 결과 모델은 현재 디렉토리에 adapters.npz로 저장됩니다. 변경 사항을 기본 모델에 병합하려면 MLX 스크립트 fuse.py를 사용할 수 있습니다. 결과로 얻은 결합된 모델을 로컬 디스크에 저장하거나 선택한 HuggingFace 저장소에 푸시할 수 있습니다. 아래 fuse.py 실행은 모델을 로컬 디렉토리 ./models/mistral7b에 저장할 겁니다:

```js
$ python mlx-examples/lora/fuse.py --model ./mlx_model  --adapter-file ./adapters.npz --save-path ./models/mistral7b
미세 조정된 모델 로딩 중
$
```

저희의 트레이닝 데이터셋이 상당히 한정적이므로, 병합을 포기하기로 결정했어요. 이제 모델 검증을 준비할 차례입니다.

<div class="content-ad"></div>

# 6.0 모델 유효성 검사

모델의 생성 능력을 테스트하려면 여전히 스크립트 lora.py를 사용할 수 있습니다. 아래는 생성을 위한 기본 사용 방법입니다:

```js
$ python mlx-examples/lora/lora.py --model ./mlx_model \
    --max-tokens 1000 \
    --prompt '스틸헤드 경로 선택의 목적은 무엇입니까?'
```

Fine-tuning이 LLM에 도움이 되었는지 확인하기 위해 기본 및 fine-tuned 모델의 생성 테스트를 실행할 수 있습니다. 아래는 두 모델의 생성을 보여줍니다:

<div class="content-ad"></div>


### 기본 모델 테스트

$ python mlx-examples/lora/lora.py --model ./mlx_model --max-tokens 1000 --prompt 'SteelHead 경로 선택의 목적은 무엇입니까?'   
사전 훈련된 모델 로드 중
총 매개변수 1244.041M
훈련 가능한 매개변수 1.704M
데이터셋 로드 중
생성 중
SteelHead 경로 선택의 목적은 무엇입니까?

WAN 최적화 솔루션의 경로 선택 기능은 네트워크를 통해 전송되는 데이터 양을 줄이고 데이터 소스와 클라이언트 사이의 왕복 횟수를 최소화하여 단일 왕복이 소요되는 데이터 전송을 최소화하여 시간 소요와 추가적인 네트워크 트래픽을 줄이는 것입니다...
==========

### 세부 조정된 모델

$ python mlx-examples/lora/lora.py --model ./mlx_model --adapter-file ./adapters.npz --max-tokens 1000 --prompt 'SteelHead 경로 선택의 목적은 무엇입니까?'
사전 훈련된 모델 로드 중
총 매개변수 1244.041M
훈련 가능한 매개변수 1.704M
데이터셋 로드 중
생성 중
SteelHead 경로 선택의 목적은 무엇입니까?

네트워크 경로 선택 기능의 목적은 SaaS 응용 프로그램 트래픽을 기반으로 두 위치 사이에서 가장 효율적인 경로를 선택하는 것입니다. SteelHead 네트워크 경로 선택은 네트워크 트래픽을 특정 응용 프로그램에 액세스하기 위해 특정 경로(네트워크 경로 또는 WAN 경로 연결)를 사용하고 네트워크 성능을 보장하기 위해 트래픽을 우선순위로 처리할 수 있습니다. 이 기능은 여러 경로(다중 WAN 링크, MPLS 연결 및 LAN 등)이 있는 환경에서 특히 유용합니다.


세부 조정된 모델 테스트는 lora.py를 --adapter-file 옵션과 어댑터 파일명을 함께 사용하여 실행하는 것을 포함합니다. 그 이외에는 모든 것이 동일합니다.

비교를 쉽게하기 위해 기본 및 세부 조정된 모델 간의 두 실행 결과를 비교한 결과가 Table 1에 나타납니다. 두 쿼리에 대한 기본 모델의 답변은 모두 잘못되었습니다. 세부 조정된 모델의 답변은 거의 정확하지만 일부 오류가 있습니다. 그럼에도 불구하고 비교적 작은 교육 데이터 집합을 사용하여 세세하게 조정한 모델은 여전히 비교적 잘 학습할 수 있습니다.

<img src="/assets/img/2024-05-20-AutomatingInstructionGenerationoffanyDocumentforLLMFine-Tuning_2.png" />


<div class="content-ad"></div>

# 7.0 최종 소견

LLM은 공공 도메인의 정보가 풍부한 영역에서 그들의 생성 능력으로 뛰어납니다. 그러나 이산 기관 저장소에 숨겨진 많은 도메인 지식이 탭되기를 기다리고 있습니다.

본문에서는 문서 조각마다 Mistral 7B를 사용하여 일정 수의 지침을 생성하여 문서의 종합적인 커버리지를 보장하는 지침 생성 접근 방법을 소개했습니다. 교육 데이터 셋 생성을 위해 우리는 다시 앙상블 검색기를 활용한 Mistral 7B를 RAG 설정에서 사용했습니다. 그런 다음 이 데이터 셋을 사용하여 Apple 실리콘에 최적화된 라이브러리 MLX와 QLoRA 기술을 사용하여 파인튜닝을 수행했습니다. 상대적으로 작은 교육 데이터 셋으로도 이 지식을 파악하는 능력이 향상된 것을 보는 것은 유망한 것입니다.

읽어 주셔서 감사합니다!

<div class="content-ad"></div>

참고 문헌
- Querying Internal Documents using Mistral 7B with Context from an Ensemble Retriever
- [GitHub 링크](https://github.com/ml-explore/mlx)