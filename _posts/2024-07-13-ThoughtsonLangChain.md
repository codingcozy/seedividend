---
title: "LangChain에 대한 생각들 장단점 분석 및 활용 사례"
description: ""
coverImage: "/assets/img/2024-07-13-ThoughtsonLangChain_0.png"
date: 2024-07-13 21:20
ogImage: 
  url: /assets/img/2024-07-13-ThoughtsonLangChain_0.png
tag: Tech
originalTitle: "Thoughts on LangChain"
link: "https://medium.com/@seniorbrogrammer/thoughts-on-langchain-67c2346139b5"
isUpdated: true
---




LangChain에 대해 칭찬하고 싶습니다. 새로운 아이디어를 쉽게 실행할 수 있습니다. 기술 독해에서 질문을 하기 위해 작은 공부 가이드 도구를 만들었는데, 충분한 텍스트 데이터를 제공하여 LLM과 쉽게 연결할 수 있었습니다.

그러나 현재 직무에서 더 많이 사용할수록 사용자 지정 구성 요소를 작성하고 정확한 답변을 얻기가 어려워졌습니다.

이게 가장 큰 불만입니다.

![이미지](/assets/img/2024-07-13-ThoughtsonLangChain_0.png)

<div class="content-ad"></div>

LangChain에서 시작했을 때는 Concept Proof를 만드는 것이 간단했어요: 아, vector 저장소를 바꾸고 끝났어요. 그것은 그런 경우에 매우 플러그 앤 플레이 프레임워크에요. 짜증나는 부분은 인터페이스가 원하는 사용 사례에 맞지 않아서 분석, 청킹 및 데이터 저장을 위한 클래스를 작성해야 했다는 것이죠. 주로 표준 인터페이스를 제공하는 오픈 엔드 프레임워크의 예상된 문제입니다. 예를 들어, JSON 파싱을 위한 CLI 도구 인 JQ (JSON 파싱을 위한 CLI 도구) 명령을 만드는 유일한 옵션으로 사용자 정의 문서 로더를 작성했습니다.

혹시 소스에 헤더를 추가하여 데이터를 다르게 청크하고 싶을 수도 있습니다. 그렇게 하려면 사용자 정의 클래스가 필요할 거에요.

벡터 저장소에 데이터를 로드하는 데 좀 더 코드가 필요해요. 그게 당신이 월급을 받는 이유 아니에요? AI를 더 빠르게 만들어 보세요.

농담은 놓고, 이 문제의 뒷면은 인터페이스를 사용하는 것이었습니다. 예를 들어, Weaviate에서 테넌트를 사용하여 고객 데이터 세트를 격리하고 싶었어요. 이 기능은 문서에서 명확하게 설명돼 있어요. 그래서 불만이 뭔가요?

<div class="content-ad"></div>

당신이 사용하려고 했던 것은 리트리버를 사용해서 단일 고객 데이터셋을 호출하는 것이었습니다. 이것은 LangChain 코드가 어떻게 작동하는지 이해하지 않는 한 문서화되어 있지 않고 쉽게 이해하기 어려울 수 있습니다.

여기 테넌트를 제공하여 문서를 사용하는 스니펫이 있습니다.

```js
db_with_mt = WeaviateVectorStore.from_documents(
    docs, embeddings, client=weaviate_client, tenant="Foo"
)
```

모든 문서가 저장되어 있고 리트리버를 사용해야 하는 경우, 이렇게 하는 것이 강력한 가정이 될 수 있습니다.

<div class="content-ad"></div>

```js
WeaviateVectorStore(
  client,
  "MyIndex",
  "text",
  embedding=embeddings,
  attributes=["source"]
 ).as_retriever(search_type="mmr", tenant="Foo")
```

재미있는 사실: 여기에 두 가지 문제가 있습니다. 첫째, 다중 테넌시를 활성화해야 하며, 검색 인자에 테넌트를 전달해야 합니다.

```js
WeaviateVectorStore(
  client,
  "MyIndex",
  "text",
  embedding=embeddings,
  attributes=["source"],
  use_multi_tenancy=True,
 ).as_retriever(
     search_type="similarity",
     search_kwargs={
       "tenant": "Foo",
     }
 )
```

이것을 찾아내기 위해 상당히 많은 조사가 필요했습니다. Weaviate 저장소에는 이에 해당하는 많은 Protobuf 파일이 포함되어 있습니다.

<div class="content-ad"></div>

내 두 번째 불평이에요: LangChain을 사용하면 할수록 LangChain 코드를 이해해야 해요. Boto3나 Flask와 같이 정기적으로 사용하는 다른 라이브러리에 대해서는 아무 것도 알지 못하는데 말이죠.

그리고 이게 AI 미래를 향해 빠르게 나아가는 것과 관련된 일반적인 문제에요. 이 다른 건 하나같이 다 손질될 것 같지 않아요, 하지만 수백만 달러가 투자될 거에요.

우린 추상화가 어렵고 때로는 삶을 더 복잡하게 만들 수 있다는 것을 알아요. 제가 여러 로드 밸런서를 배포해봤지만 BGP에 대해 아는 게 하나도 없다는 게 기억나요. 때로는 네트워킹이 복잡하기 때문에 추상화가 필요하죠.

그 느낌이 들어요.

<div class="content-ad"></div>

LangChain chain은 정말 멋진 기술이에요. 스트리밍도 할 수 있고, 스트리밍도 못 할 수도 있고, 데이터로 내 질문에 달콤하고 기분 좋은 백만 달러 정도의 답변을 얻을 수 있어요.

그런데 제가 제 체인 코드에서 병목 현상을 찾고 싶을 때는 꽤 까다로웠어요. 제 벡터 데이터베이스가 문제일까요? 아니면 OpenAI에 대한 API 호출이 문제일까요? 누가 알아요? 제가 알 수가 없었어요. 그래서 이제 로깅을 디버그 모드로 설정하고 어떤 부분이 시간을 모두 소요하는지 확인하기 위해 코드를 작성했어요. AI가 느린 이유를 확인하려고요.

여기서 공통 주제로 돌아와보면, 너무 많은 추상화는 도대체 얼마나 많은 걸까요? 이 문제는 LangChain이 직면하는 문제라고 생각해요. 코드를 작성해야 하고 (저는 10배 개발자가 아니라서 조금 더 시간이 걸려요) 만약 없다면 그것을 찾아야 해요. 가능한 것을 깊게 파헤쳐야 하고, 무엇을 구축하고 있는지 알기 위해 어떤 일이 일어나고 있는지 파악하기 위해 어떤 기적을 부리고 있어야 해요.

저는 LangChain이 작은 프로젝트를 빠르게 시작하는 좋은 방법이라고 믿어요. 빠르게 빠른 데모를 보여주기 쉽게 사용할 수 있는 점을 정말 좋아해요. 그러나 소프트웨어 개발 세계의 귀찮은 뉘앙스와 맞닥뜨리면 능력이 상당히 제한되는 편이에요.

<div class="content-ad"></div>

약어인 LLM/AI가 내 의견이라서 추상화에 빠지지 마세요. 저는 한 해 전까지는 따르기를 거부한 일반적인 규칙입니다.

전반적으로 Langchain은 완벽한 5/7입니다.

읽어 주셔서 감사합니다.