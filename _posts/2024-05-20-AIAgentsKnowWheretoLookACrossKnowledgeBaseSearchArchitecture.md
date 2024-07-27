---
title: "AI 에이전트들이 어디를 찾아야 하는지 알고 있어요 교차 지식 베이스 검색 아키텍처"
description: ""
coverImage: "/assets/img/2024-05-20-AIAgentsKnowWheretoLookACrossKnowledgeBaseSearchArchitecture_0.png"
date: 2024-05-20 22:21
ogImage: 
  url: /assets/img/2024-05-20-AIAgentsKnowWheretoLookACrossKnowledgeBaseSearchArchitecture_0.png
tag: Tech
originalTitle: "AI Agents Know Where to Look: A Cross Knowledge Base Search Architecture"
link: "https://medium.com/better-programming/ai-agents-know-where-to-look-a-simple-cross-knowledge-base-search-architecture-60b3c6a9179b"
---


## 대화형 챗봇을 만들기 위해 여러 AI 에이전트를 활용하는 방법에 도전해 봅시다! 🔎📚

요즘 AI 기술이 핫하죠. 다양한 응용 프로그램을 보고, 나도 한번 시도해 보고 싶었어요!

이 기사에서는 AI 에이전트를 활용하여 다중 지식 베이스 QnA 챗봇을 만드는 아키텍처를 살펴보겠습니다. 우리는 선택 로직, 요약, 집계 및 이전 대화 내역을 기반으로 질문을 정제하는 여러 에이전트를 결합할 것입니다. 이를 통해 이전 상호작용 내용을 추적하면서 여러 지식 베이스의 질문에 대처할 수 있는 챗봇을 만들 수 있게 될 거예요.

이 기사를 끝까지 읽으면, AI 에이전트가 복잡한 작업을 보다 쉽게 처리하고 다양한 정보 소스로부터 가치 있는 통찰을 얻는 데 얼마나 큰 잠재력을 가지고 있는지에 대해 더 잘 이해하게 될 거에요. 기사가 너무 길어서 걱정이 된다면, 최종 아키텍처에 대한 간략한 미리보기를 제공해 드리겠습니다:

<div class="content-ad"></div>

![이미지](/assets/img/2024-05-20-AIAgentsKnowWheretoLookACrossKnowledgeBaseSearchArchitecture_0.png)

# 아이디어와 문제

이미 기본 챗봇을 구현해놓아서 질문 시맨틱 검색을 할 수 있어요. 이 앱은 특정 텍스트와 대화할 수 있게 해줘요. OpenAI의 유용한 튜토리얼을 확인해볼 수 있어요! 놀랍도록 좋아요 — 어떤 세부사항이든 큰 텍스트와 대화할 수 있어요!

![이미지](/assets/img/2024-05-20-AIAgentsKnowWheretoLookACrossKnowledgeBaseSearchArchitecture_1.png)

<div class="content-ad"></div>

하지만 문제는... 여러 조각의 텍스트와 대화할 수 있게 하는 방법이 무엇인가요? 다섯 권의 책이 있다고 가정해보세요. 질문이 있습니다. 각 "책"에 동일한 질문을 하되, 네 권이 별도로 "모르겠어"라고 대답하는 번거로운 과정일텐데요.

당신의 컬렉션 안에 속하는 여러 권의 책에 관한 질문이 있다면서요, 그리고 하나의 일관된 대답을 원한다면 어떨까요? 현재 내 간단한 앱은 한 번에 한 지식 베이스만과 상호 작용할 수 있습니다. 따라서 각 책에게 묻는다면, 각각 독립적인 대답을 얻게 됩니다!

여기에서 발생하는 또 다른 문제는... 만약 많은 양의 책이 있다면 어떻게 할까요? 주어진 질문을 기반으로 어떤 책이 관련이 있는지 어떻게 알 수 있을까요? 모든 책에 대해 사용자/인공지능 간의 교환을 하기에는 서버 호출이 많이 필요합니다.

그래서 아이디어는... 여러 지식 베이스에 관련이 있을 수 있는 단일 질문을 어떻게 하고 하나의 답변을 받을 수 있을까요? 그건 실제로 가능한 건지요?

<div class="content-ad"></div>

# 기본 시맨틱 검색 앱

아래 다이어그램을 통해 기본 시맨틱 검색 앱의 구조를 살펴보겠습니다.

![다이어그램](/assets/img/2024-05-20-AIAgentsKnowWheretoLookACrossKnowledgeBaseSearchArchitecture_2.png)

여기서 사용자는 두 가지 입력을 기대합니다: 질문 자체와 질문할 관련 지식 베이스의 이름입니다. 일반적인 질문뿐만 아니라 관련 정보가 포함된 지식 베이스가 어느 것인지 알아야 합니다! 알고 계시면 좋지만, 모르겠다면 어떨까요? 어느 지식 베이스를 살펴볼 지 모르는 상태에서 간단한 질문을 하면 좋겠죠?

<div class="content-ad"></div>

# Selector Logic에 집중하기

![Selector Logic](/assets/img/2024-05-20-AIAgentsKnowWheretoLookACrossKnowledgeBaseSearchArchitecture_3.png)

Selector Logic은 꽤 간단합니다. 네임스페이스는 텍스트 말뭉치의 "벡터화"된 버전을 포함하는 데이터베이스와 연결됩니다. 이것은 코드에게 어떤 데이터베이스에서 의미론적 검색을 수행해야 하는지 알려줍니다.

하지만 질문 자체를 기반으로 네임스페이스를 "추론"할 수 있다면 어떨까요? 그게 가능할까요? 단순한 일처럼 들리지 않나요? 다행히도, 이 힘든 작업을 AI에게 위임할 방법이 있을 수 있습니다!

<div class="content-ad"></div>

# 해결책: AI 에이전트!

AI 에이전트란 무엇을 의미할까요? 이러한 대규모 언어 모델을 챗봇으로 생각하는 대신, 함수로 생각할 수 있습니다! 입력과 출력이 있는 함수입니다! 이 개념을 설명하기 위해 간단한 예제를 사용해보겠습니다.

addTwoNumbers 함수가 있다고 상상해 보세요. 이 함수는 다음과 같이 작성되었을 것입니다:

```js
const addTwoNumbers = (a, b) => {
  return a + b
}
```

<div class="content-ad"></div>

간단하죠. 그런데 이렇게도 해볼까요?

```js
const addTwoNumbers = async (a, b) => {
  const aiAgent = new openai("계산기 에이전트로서...");
  return (await aiAgent.chat(`add ${a} + ${b}`)).toNumber();
}
```

너무 과한 느낌일 수도 있지만 😆, 이 개념은 여기서도 잘 적용됩니다. 함수의 논리를 작성하지 않았고, 단지 AI 프롬프트에 정보 몇 개를 제공했을 뿐이에요:

- 시스템 프롬프트 - "계산기 에이전트로서..."
- 질문 - "a와 b를 더하세요".

<div class="content-ad"></div>

보다 복잡한 함수가 있다고 상상해 보세요! 사실 코드에서 어려운 결정을 내리는 것을 대규모 언어 모델에 맡기고 있다는 거죠.

우리는 어떤 네임스페이스가 하나의 질문을 받을지 선택하는 복잡한 로직을 위임하고 싶었었죠. 이러한 작업을 AI에게 맡길 수 있습니다!

# AI 에이전트로 선택 로직 대체하기!

![이미지](/assets/img/2024-05-20-AIAgentsKnowWheretoLookACrossKnowledgeBaseSearchArchitecture_4.png)

<div class="content-ad"></div>

위의 다이어그램을보면 선택기 로직이 AI 에이전트로 대체되었음을 알 수 있습니다!

이 경우, 선택 에이전트는 입력 메시지에 기반하여 관련 지식 베이스를 선택하기 위한 시스템 프롬프트를 받습니다. 에이전트는 지식 베이스 각각에 대한 정보 요약을 포함한 knowledgebaseConstant를 받습니다. 보통 여기에는 지식 베이스에 대한 중요한 키워드를 넣어서 선택기 에이전트가 이후 검색을 위해 지식 베이스를 선택할 수 있도록 돕습니다.

이를 통해 적절한 지식 베이스를 선택하는 어려운 작업을 대규모 언어 모델에 위임할 수 있습니다! 이렇게 하면 생활이 훨씬 쉬워집니다. 수백 개의 지식 베이스가 있다고 상상해보세요. 도메인에 대한 합리적인 요약을 제공할 수 있다면, 선택기 에이전트가 직접 찾아낼 수 있어야 합니다!

아래에서 에이전트에 공급한 원본 시스템 프롬프트를 볼 수 있습니다!

<div class="content-ad"></div>

```js
const systemPrompt = `당신은 주어진 질문에 대한 지식 베이스의 관련성을 결정하는 선택 요원입니다.

고유한 네임스페이스와 해당 정보 범주에 대한 간단한 설명을 포함하는 지식 베이스 목록이 제공됩니다.

각 질문에 대해 키워드, 엔티티 또는 다른 관련 기준에 따라 관련 지식 베이스를 선택할 것입니다. 그런 다음 질문에 관련이 있다고 생각하는 네임스페이스 목록을 반환합니다. 어떤 지식 베이스도 관련이 없다고 생각하는 경우 빈 목록을 반환합니다.

다음은 관련 지식 베이스입니다:

지식 베이스:
${namespaceDescriptionMap
  .map((obj) => {
    return `- 네임스페이스: "${obj.namespace}"\\n  설명: "${obj.description}"`;
  })
  .join("\\n")}

당신의 응답은 관련 있는 네임스페이스 목록만 제공해야 합니다.
`;
```

# 새로운 아키텍처

이제 아래 다이어그램에서 새로운 아키텍처를 살펴봅시다!

![다이어그램](/assets/img/2024-05-20-AIAgentsKnowWheretoLookACrossKnowledgeBaseSearchArchitecture_5.png)


<div class="content-ad"></div>

더 많은 에이전트들을 추가해봐요! 간단히 소개해볼게요.

# 요약 에이전트

![에이전트 다이어그램](/assets/img/2024-05-20-AIAgentsKnowWheretoLookACrossKnowledgeBaseSearchArchitecture_6.png)

위 다이어그램에서, 선택자 에이전트가 특정 지식베이스를 관련이 있다고 판단하면, 벡터 데이터베이스에 대한 의미 검색이 수행되며 실제 관련 텍스트가 나옵니다. 이 텍스트는 사용자가 제공한 원시 질문 외에도 요약 에이전트에 전달됩니다.

<div class="content-ad"></div>

이번에는 요약기 에이전트들이 시맨틱 검색으로 추출된 텍스트 조각들을 원문 질문에 대한 것으로 답하는 것처럼 요약하는 과정을 말이죠!

## 집계기 에이전트

![이미지](/assets/img/2024-05-20-AIAgentsKnowWheretoLookACrossKnowledgeBaseSearchArchitecture_7.png)

위 다이어그램에 설명된 대로, 이 최종 에이전트는 활성화된 모든 요약기 에이전트들의 요약과 사용자 원문 질문을 받습니다. 이 에이전트의 출력물이 사용자에게 반환되는 정보입니다!

<div class="content-ad"></div>

# 질문과 대화로!

여기 있어요! 이제 여러 주제에 관한 질문을 하고 여러 지식 베이스를 참조하는 답변을 제공할 수 있는 앱을 만들었어요!

이 앱은 여전히 대화 기록을 기억하지 않는 "단순한" Q&A 챗봇이에요. 이를 변경하기 위해 우리는 questionRefiner 에이전트와 대화 기록을 저장하는 캐시를 사용해요.

아래 다이어그램에서 이 아키텍처 내에서 어떻게 위치하는지 확인해보세요:

<div class="content-ad"></div>


![image](/assets/img/2024-05-20-AIAgentsKnowWheretoLookACrossKnowledgeBaseSearchArchitecture_8.png)

QuestionRefiner agent is placed at the beginning of the pipeline and its main task is to refine the user's input question based on the conversation history stored in the cache. It has two primary inputs:

- The user's input question.
- The conversation history cache.

The QuestionRefiner agent uses the conversation history to refine the user's input question by adding context or clarifying the question based on previous exchanges. This refined question is then passed down to the Selector agent and subsequent pipeline.


<div class="content-ad"></div>

이전 대화 기록 캐시는 요구 사항에 따라 간단한 인메모리 저장소 또는 더 정교한 데이터 저장 시스템이 될 수 있습니다.

questionRefiner agent를 아키텍처에 통합함으로써, 이제 여러 지식 베이스를 참조하고 대화 기록을 기억하여 사용자의 질문에 맥락에 맞는 응답을 제공할 수 있는 고급 QnA 챗봇을 보유하게 되었습니다.

에이전트에 공급한 원본 시스템 프롬프트는 아래에서 확인할 수 있습니다!

```js
const constructSystemPrompt = (
  conversationHistory // : { question: string; answer: string }[]
) => {
  return `As a highly skilled AI, your task is to refine the input question considering the conversation history. Follow these steps:

1. Analyze the conversation history, identifying relevant information while ignoring irrelevant parts.
2. If all conversation history is irrelevant, just preserve the current question.
3. Otherwise, craft a concise and well-structured question that incorporates relevant context from the conversation history.

If you can create a more accurate meaningful question, return:
- the new question

If the question is irrelevant or you dont know, preserve the question by returning:
- the current question

Conversation History:
${constructConversationHistoryPrompt(conversationHistory)}`};
```

<div class="content-ad"></div>

# 앱이 동작 중입니다

이 멀티 지식베이스 QnA 챗봇의 구현은 아래의 내 GitHub에서 찾을 수 있습니다 (Typescript, Langchain 및 OpenAI로 구축했습니다):

# 결론

멀티 지식베이스 QnA 챗봇을 만드는 방법을 탐험하는 데 정말 즐거웠어요. 이 글도 즐거웠으면 좋겠어요! 우리는 셀렉터 로직, 요약, 집계, 대화 이력에 따라 질문을 다듬는 데 다양한 AI 에이전트들과 놀았습니다.

<div class="content-ad"></div>

결과는 무엇인가요? 여러 지식 베이스에서의 질문을 다루면서 이전 상호 작용에서의 맥락을 추적할 수 있는 상당히 유연한 챗봇이 탄생했어요. 이 구조는 한 사이즈가 모두에게 맞는 해결책은 아니지만 탐구와 실험을 위한 환상적인 시작점이에요. 게다가 조정하고 더 발전시키기 충분히 간단해서 더 멋진 앱을 만들 수도 있어요! ⚡

개선할 부분은 항상 있지만, 우리의 멀티 지식 베이스 QnA 챗봇은 복잡한 작업을 훨씬 더 효과적으로 만들고 다양한 정보 원천으로부터 가치 있는 통찰을 얻는 인공지능 에이전트의 엄청난 잠재력을 보여주죠. 인공지능 모델이 더욱 강력해지면서 미래에 나타날 놀라운 애플리케이션들을 기대할 수밖에 없네요!