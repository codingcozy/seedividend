---
title: "Amazon Bedrock Agents 및 AI로 작업 자동화하는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-07-AutomatingtasksusingAmazonBedrockAgentsandAI_0.png"
date: 2024-07-07 13:00
ogImage:
  url: /assets/img/2024-07-07-AutomatingtasksusingAmazonBedrockAgentsandAI_0.png
tag: Tech
originalTitle: "Automating tasks using Amazon Bedrock Agents and AI"
link: "https://medium.com/@leejamesgilmore/automating-tasks-using-amazon-bedrock-agents-and-ai-4b6fb8856589"
---

<img src="/TIL/assets/img/2024-07-07-AutomatingtasksusingAmazonBedrockAgentsandAI_0.png" />

## 서문

👍 Amazon Bedrock Agents가 무엇인지 알아볼 거에요.
👍 AWS 아키텍처를 자세히 살펴볼 거에요.
👍 TypeScript 및 AWS CDK 코드를 살펴볼 거에요.
👍 작동 방식을 보기 위해 몇 가지 테스트를 진행해 볼 거에요.

# 소개 👋🏽

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

Amazon Bedrock Agents은 당신이 회사 내에서 스스로 작업을 수행할 수 있는 자율 에이전트를 구축하고 사용자 정의할 수 있도록 도와줍니다. 이러한 에이전트는 기관 데이터와 사용자 입력을 활용하여 대화형 채팅과 AI를 이용해 작업을 수행하여 최종 사용자가 작업을 완료하는 데 도움을 줍니다.

이들은 기본 모델, 데이터 소스, 지식베이스, 소프트웨어 응용 프로그램 및 사용자 대화 간의 상호작용을 관리하는 조정자 역할을 합니다. 추가로, 이들은 API 호출을 자동화하여 조치를 수행하고 이러한 조치와 관련된 정보를 풍부하게 하는 지식 베이스에 접근합니다.

![Automating tasks using Amazon Bedrock Agents and AI](/TIL/assets/img/2024-07-07-AutomatingtasksusingAmazonBedrockAgentsandAI_1.png)

본 문서에서는 가상의 호텔 및 스파 회사인 LJ Resorts를 다루어 AWS 구조와 코드를 살펴보겠습니다. 우리의 고객은 당사 애플리케이션을 사용하여 호텔 숙박, 골프 세션 및 스파 치료를 한꺼번에 예약하거나 이용 가능한 치료 및 할인, 영업 시간과 같은 회사 정보를 요청할 수 있습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

![Image 1](/TIL/assets/img/2024-07-07-AutomatingtasksusingAmazonBedrockAgentsandAI_2.png)

The full code repository can be found here:

👇 Before we go any further — please connect with me on LinkedIn for future blog posts and Serverless news [Lee James Gilmore](https://www.linkedin.com/in/lee-james-gilmore/)

![Image 2](/TIL/assets/img/2024-07-07-AutomatingtasksusingAmazonBedrockAgentsandAI_3.png)

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 아마존 베드락 에이전트란 무엇인가요? 🤖

이제 아마존 베드락 에이전트에 대해 이야기해보겠습니다. 어떤 일을 하는지 알아보면서 시작해봅시다. 먼저 중요한 약어 몇 가지를 이해해 봅시다.

## 약어

시작하기 전에 약어 몇 가지와 그 의미에 대해 알아봅시다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

✔️ FM - 기본 모델

✔️ 액션 그룹

✔️ 지침

🤖 "고객이 호텔 객실, 스파 세션, 그리고 골프 예약을 도와주시고, 해당하는 날짜와 예약 유형에 따라 특별 혜택을 제공해 주세요. 예약을 완료하기 전에 오프닝 타임이나 가격에 대해 고객에게 안내하고, 호텔 정책을 고려해 주세요."

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

![Automating tasks using Amazon Bedrock Agents and AI](/TIL/assets/img/2024-07-07-AutomatingtasksusingAmazonBedrockAgentsandAI_4.png)

## Amazon Bedrock 에이전트는 어떻게 작동하나요? 🤖

아래 다이어그램에서 볼 수 있듯이, 우리는 고객의 입력부터 시작합니다. 이 입력은 프롬프트 스토어로 증가되어 세션 스토어에서 가져온 이전 대화 내용과 함께 바탕 모델을 호출하여 보강됩니다.

다음으로 Orchestration prompt는 응답을 구문 분석하고 우리의 OpenAPI 사양 문서에 정의된 작업에 따라 액션 그룹 람다를 호출하며 Bedrock Knowledge Base에서 필요한 추가 정보를 가져옵니다. Orchestration이 완료되면 결과가 고객에게 반환됩니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

![이미지](/TIL/assets/img/2024-07-07-AutomatingtasksusingAmazonBedrockAgentsandAI_5.png)

다음 섹션에서는 본문에서 무엇을 구축 중인지 살펴보겠습니다. 그러면 코드를 살펴보고 응용 프로그램을 배포하고 테스트할 수 있습니다.

# 무엇을 만들고 있을까요? 🛠️

그래, 이제 Amazon Bedrock와 함께 에이전트에 대해 깊이 파고들었으며 이론적으로 작동 방식을 이해했으니, 이제 이 글에서 무엇을 만들고 있는지 살펴봅시다:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

<img src="/TIL/assets/img/2024-07-07-AutomatingtasksusingAmazonBedrockAgentsandAI_6.png" />

저희는 이전 글에서 Amazon Bedrock Knowledge Bases에 대해 다뤘었는데, 해당 글은 여기에서 찾아볼 수 있어요:

위 다이어그램에서 볼 수 있는 것은 다음과 같아요:

- 고객이 자신의 프롬프트로 Lambda 함수 URL을 탭합니다.
- 이는 쿼리 Lambda 함수를 호출하며, 이 함수는 다시 Amazon Bedrock 에이전트를 호출합니다.
- 에이전트는 특정 회사 데이터를 사용한 배포된 Knowledge Base와 S3 버킷에 있는 OpenAPI 사억을 기반으로 한 Lambda 함수를 사용하여 고객의 작업을 완료하기 위해 다른 내부 시스템에 경로를 지정합니다 (여러 호출을 우리를 대신하여 조정할 것입니다).

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

이제 고수준 아키텍처를 논의했으니, 다음 섹션에서 예시 상호작용을 살펴봅시다.

# 상호작용이 어떻게 보일까요? ⛳

아래 예시 상호작용을 살펴보면 고객이 에이전트와 채팅하는 모습을 볼 수 있습니다. 사실, 이는 실제 프롬프트와 출력값을 사용하여 우리의 예시 솔루션을 통해 실행된 것입니다:

Customer: “Hi, what special deals do you have on at the moment for hotels?”

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

에이전트: "현재 이용 가능한 호텔 특별 할인은 다음과 같습니다: - 월요일 스테이케이션 특가: 객실 요금 20% 할인 (월요일만) - 급행 투숙 특가: 당일 예약 시 15% 할인 (화요일만) - 연박 할인: 3박 숙박 20% 할인 (수요일만) - 스위트 업그레이드: 익스큐티브 스위트 무료 업그레이드 (목요일만) - 주말 여행 패키지: 2박 숙박 10% 할인 (금요일만)"

고객: "2024년 02월 25일에 호텔 객실을 예약하고 싶어요, 현재 무엇이 가능한가요?"

에이전트: "2024년 02월 25일 이용 가능한 객실은 다음과 같습니다: - 101호 객실(스탠다드, $100): 퀸 사이즈 침대가 있는 아늑한 표준 객실 - 102호 객실(스탠다드, $100): 두 개의 더블 침대가 있는 넓은 표준 객실 - 103호 객실(디럭스, $150): 킹 사이즈 침대와 전망이 있는 호화로운 디럭스 객실 - 104호 객실(스위트, $200): 별도의 거실 공간과 침실이 있는 우아한 스위트 - 105호 객실(스탠다드, $90): ..생략.."

고객: "2024년 02월 25일에 디럭스 객실을 $160에 예약할 수 있나요?"

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

에이전트: "2024년 2월 25일에 109호 객실을 예약해드렸습니다. 이 객실은 명품 욕실이 있는 디럭스 객실이며, 160달러입니다. 필요한 것이 있으면 언제든지 알려주세요!"

고객: "어떤 스파 시술이 가능한가요?"

에이전트: "오늘 가능한 스파 시술 목록입니다: — 스웨디시 마사지: 긴장을 완화하고 이완을 촉진하는 전신 마사지. 가격: 80달러 — 페이셜: 피부를 재생하고 활기를 되찾는 깊은 클렌징 페이셜. 가격: 70달러 — 핫 스톤 마사지: 가열된 돌을 사용한 치료적인 마사지로 근육을 진정시키고 혈류를 향상시킵니다. 가격: 90달러 — 아로마테라피: 아로마 향기로 편안함과 웰빙을 높이는 섬세한 마사지. 가격: 85달러 — ….'간략히 하기 위해 나머지 제거됨'"

고객: "핫 스톤 마사지를 예약할 수 있나요?"

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

Agent: "네, 오늘 당신을 위해 핫 스톤 마사지를 예약했어요. 이 치료 마사지는 가열된 돌을 사용하여 근육을 진정시키고 혈액 순환이 향상됩니다. 비용은 $90이에요. 더 필요한 게 있으면 언제든지 말해주세요!"

Customer: "골프의 영업 시간은 어떻게 되나요?"

Agent: "LJ 리조트의 골프 영업 시간은 다음과 같아요: 월요일부터 금요일까지: 오전 9시 — 오후 6시 토요일 및 일요일: 오전 7시 — 오후 7시"

Customer: "해당 날에도 아침에는 골프 세션도 있나요?"

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

에이전트: "오늘 가능한 골프 세션을 확인해보니 아침 세션 하나가 있네요: 아침 티 타임: 아침에 멋진 전망과 함께 골프를 즐기세요. 비용: $80 이 아침 골프 세션을 예약해 드릴까요?"

고객: "제가 $80에 그 날 골프 세션을 예약할 수 있을까요?"

에이전트: "네, $80에 아침 골프 세션을 오늘 예약해 드렸습니다. 이 세션에서는 아침에 멋진 경치를 감상하며 골프를 즐길 수 있을 거예요. 더 필요한 사항이 있으시면 언제든지 말해 주세요!"

고객: "제 예약의 총 비용이 얼마인가요?"

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

에이전트: "대화 기록을 기반으로 하면, 핫 스톤 마사지를 90달러에 예약하셨고, 아침 골프 세션을 80달러에 예약하셨습니다. 예약 총 비용은 90달러 + 80달러 = 170달러입니다."

이것은 베드락 에이전트가 얼마나 강력한지 보여줍니다. 이것은 사람이 여러 시스템에 액세스해 고객과 직접 대면해야 하는 작업을 대체한 것입니다. 인공지능이 전체 프로세스를 자동화하는 데 사용되었습니다.

이제 고객과 에이전트 간에 발생할 수있는 상호 작용을 살펴 보았으니, 주요 코드를 살펴 보겠습니다.

# 주요 코드 설명하기 👨‍💻

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

알겠어요, 우리는 이 기본 예제를 실제로 본 것이고, 이제 TypeScript 및 CDK 코드를 살펴보겠습니다. 전체 솔루션은 여기에서 찾으실 수 있습니다.

## Stateful Stack

먼저 상태 유지 스택부터 시작해봅시다. 여기서 먼저 에이전트 람다 함수를 생성합니다:

```js
// create the lambda for the agent - this is the lambda that determines
// what the prompt looks like with regards to mapping to the schema
const actionGroupAgentLambda: nodeLambda.NodejsFunction = new nodeLambda.NodejsFunction(this, "AgentLambda", {
  functionName: "action-group-executor",
  runtime: lambda.Runtime.NODEJS_20_X,
  entry: path.join(__dirname, "./src/adapters/primary/action-group-executor/action-group-executor.adapter.ts"),
  memorySize: 1024,
  handler: "handler",
  timeout: cdk.Duration.minutes(5),
  description: "action group lambda function",
  architecture: lambda.Architecture.ARM_64,
  tracing: lambda.Tracing.ACTIVE,
  bundling: {
    minify: true,
  },
  environment: {
    ...lambdaConfig,
  },
});
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

다음은 아래에 표시된대로 우리의 Amazon Bedrock 에이전트를 생성합니다:

```js
// bedrock 에이전트 생성
const agent = new bedrock.Agent(this, "BedrockAgent", {
  name: "에이전트",
  description: "호텔, 스파 및 골프 예약을 위한 에이전트입니다.",
  foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_V2,
  instruction:
    "고객이 호텔 객실, 스파 세션 및 골프 예약을 도와주셔서 감사하겠습니다. 그들에게 요일 및 예약 유형에 따라 특별 제공상품에 대해 알려주시고, 예약을 완료하기 전에 오픈 시간이나 가격을 안내해주시고, 또한 호텔 정책을 고려해주시기 바랍니다.",
  idleSessionTTL: cdk.Duration.minutes(10),
  knowledgeBases: [kb],
  shouldPrepareAgent: true,
  aliasName: "에이전트",
});
```

위의 코드에서 보듯이, 에이전트에게 세션 지속 시간, Amazon Bedrock 지식 베이스에 대한 링크, FM 유형(Claud V2) 및 이 에이전트가 수행해야 할 작업에 대한 지시 사항과 같은 주요 속성들을 지정합니다.

다음으로, 아래와 같이 Action 그룹을 생성합니다:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
// 예약을 위한 동작 그룹을 추가합니다.
new bedrock.AgentActionGroup(this, "AgentActionGroup", {
  actionGroupName: "agent-action-group",
  description: "예약을 위한 동작 그룹",
  agent: agent,
  apiSchema: bedrock.S3ApiSchema.fromAsset(path.join(__dirname, "./schema/api-schema.json")),
  actionGroupState: "ENABLED",
  actionGroupExecutor: actionGroupAgentLambda,
  shouldPrepareAgent: true,
});
```

우리는 에이전트가 할 수 있는 것을 상세히 설명하는 Open API 스키마와 동작에 대한 프록시로 호출되는 람다 함수를 제공한다는 것을 알 수 있습니다. 이제 Open API 사양이 어떻게 보이는지 살펴보겠습니다:

```js
{
  "openapi": "3.0.0",
  "info": {
    "title": "LJ 리조트를 위한 호텔, 스파 및 골프 예약 API",
    "version": "1.0.0",
    "description": "고객의 호텔, 스파 및 골프 예약을 관리하기 위한 API입니다."
  },
  "paths": {
    "/rooms": {
      "get": {
        "summary": "이용 가능한 모든 객실 목록을 가져옵니다",
        "description": "특정 날짜에 이용 가능한 모든 객실 목록을 가져옵니다",
        "operationId": "getAllAvailableRooms",
        "responses": {
          "200": {
            "description": "특정 날짜에 이용 가능한 모든 객실 목록을 가져옵니다",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "roomId": {
                        "type": "string",
                        "description": "객실의 고유 ID입니다."
                      },
                      "roomType": {
                        "type": "string",
                        "description": "객실 유형입니다."
                      },
                      "roomDescription": {
                        "type": "string",
                        "description": "객실 설명입니다."
                      },
                      "date": {
                        "type": "string",
                        "description": "객실 예약 가능한 날짜입니다."
                      },
                      "cost": {
                        "type": "string",
                        "description": "객실 비용(1박당)입니다."
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "post": {
        "summary": "특정 날짜에 이용 가능한 객실을 예약합니다",
        "description": "특정 날짜에 객실을 예약합니다",
        "operationId": "bookRoom",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "roomId": {
                    "type": "string",
                    "description": "예약할 객실의 ID입니다"
                  },
                  "date": {
                    "type": "string",
                    "description": "객실 예약 날짜입니다"
                  }
                },
                "required": ["roomId", "date"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "객실 예약 성공"
          }
        }
      }
    },
    "/spa-sessions": {
      ...
    },
    "/golf-sessions": {
      ...
    }
  }
}
```

모델이 수행해야 할 작업을 결정하는 중요한 부분은 설명, 경로, 메서드 및 작업 ID입니다. 예를 들어, 모든 호텔 객실을 나열하기 위해 사용하는 것은 다음과 같습니다:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

**Description** - "특정 날짜에 대한 모든 이용 가능한 객실 목록을 가져옵니다".
**OperationId** - "getAllAvailableRooms".
**Path** - ‘/rooms’.
**Method** - ‘GET’.

우리의 람다 함수가 호출되면 해당 세부 정보를 활용하여 호출해야 하는 다른 시스템을 결정합니다:

```js
import { MetricUnits, Metrics, logMetrics } from "@aws-lambda-powertools/metrics";
import { Tracer, captureLambdaHandler } from "@aws-lambda-powertools/tracer";
import { golfSessions, rooms, spaTreatments } from "stateful/src/data";

import { injectLambdaContext } from "@aws-lambda-powertools/logger";
import middy from "@middy/core";
import { logger } from "@shared/index";

const tracer = new Tracer();
const metrics = new Metrics();

export const adapter = async ({
  inputText,
  apiPath,
  httpMethod,
  actionGroup,
  messageVersion,
  requestBody,
  sessionAttributes,
  promptSessionAttributes,
}: Event): Promise<Response> => {
  let body;
  let httpStatusCode = 200;

  try {
    logger.info(`inputText: ${inputText}, apiPath: ${apiPath}, httpMethod: ${httpMethod}`);

    // 참고: 실제로는 람다 FURLS 또는 다른 DB 또는 API/서비스를 호출할 것이지만,
    // 작동 방식을 보여주기 위해 기사용 가짜 스텁 데이터를 사용합니다.
    switch (apiPath) {
      case "/rooms":
        if (httpMethod === "GET") {
          body = rooms;
        } else if (httpMethod === "POST") {
          body = rooms.find((room) => room.roomId === "109");
        }
        break;

      case "/spa-sessions":
        if (httpMethod === "GET") {
          body = spaTreatments;
        } else if (httpMethod === "POST") {
          body = spaTreatments.find((treatment) => treatment.treatmentId === "3");
        }
        break;

      case "/golf-sessions":
        if (httpMethod === "GET") {
          body = golfSessions;
        } else if (httpMethod === "POST") {
          body = golfSessions.find((session) => session.sessionId === "1");
        }
        break;

      default:
        httpStatusCode = 500;
        body = "Sorry, I am unable to help you with that. Please try asking the question in a different way perhaps.";
        break;
    }

    metrics.addMetric("SuccessfulActionGroupQuery", MetricUnits.Count, 1);

    return {
      messageVersion,
      response: {
        apiPath,
        actionGroup,
        httpMethod,
        httpStatusCode,
        sessionAttributes,
        promptSessionAttributes,
        responseBody: {
          "application-json": {
            body: JSON.stringify(body),
          },
        },
      },
    };
  } catch (error) {
    let errorMessage = "Unknown error";
    if (error instanceof Error) errorMessage = error.message;
    logger.error(errorMessage);

    metrics.addMetric("ActionGroupQueryError", MetricUnits.Count, 1);

    throw error;
  }
};

export const handler = middy(adapter)
  .use(injectLambdaContext(logger))
  .use(captureLambdaHandler(tracer))
  .use(logMetrics(metrics));
```

위의 예제에서는 다른 시스템을 호출하는 대신 반환된 데이터를 간단히 하드코딩했음을 볼 수 있습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

![스테이트리스 스택](/TIL/assets/img/2024-07-07-AutomatingtasksusingAmazonBedrockAgentsandAI_7.png)

이제 우리 에이전트를 쿼리하는 스테이트리스 스택을 살펴보겠습니다.

## 스테이트리스 스택

먼저 스트리밍이 설정된 쿼리 람다 함수를 생성합니다:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
// 에이전트 쿼리를 위한 람다 함수를 생성합니다.
const queryModelLambda: nodeLambda.NodejsFunction = new nodeLambda.NodejsFunction(this, "QueryModelLambda", {
  functionName: "query-model-lambda",
  runtime: lambda.Runtime.NODEJS_20_X,
  entry: path.join(__dirname, "./src/adapters/primary/query-model/query-model.adapter.ts"),
  memorySize: 1024,
  handler: "handler",
  timeout: cdk.Duration.minutes(3),
  description: "쿼리 모델 람다 함수",
  architecture: lambda.Architecture.ARM_64,
  tracing: lambda.Tracing.ACTIVE,
  bundling: {
    minify: true,
  },
  environment: {
    AGENT_ID: agentId,
    AGENT_ALIAS_ID: agentAliasId,
    ...lambdaConfig,
  },
});

// 쿼리 람다에 대한 함수 URL을 스트림 응답으로 추가합니다.
const queryModelLambdaUrl = queryModelLambda.addFunctionUrl({
  authType: lambda.FunctionUrlAuthType.NONE,
  invokeMode: lambda.InvokeMode.RESPONSE_STREAM,
  cors: {
    allowedOrigins: ["*"],
  },
});
```

그런 다음, 아래와 같이 에이전트 호출 권한을 부여합니다:

```js
// 쿼리 람다 함수가 모델/KB/에이전트를 쿼리할 수 있도록 허용합니다.
queryModelLambda.addToRolePolicy(
  new iam.PolicyStatement({
    actions: ["bedrock:RetrieveAndGenerate", "bedrock:Retrieve", "bedrock:InvokeModel", "bedrock:InvokeAgent"],
    resources: ["*"],
  })
);
```

이제 사용자가 함수 URL을 통해 프롬프트를 제공하고 에이전트를 호출하는 Query Lambda 함수를 살펴보겠습니다:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
import { MetricUnits, Metrics } from "@aws-lambda-powertools/metrics";
import {
  BedrockAgentRuntimeClient,
  InvokeAgentCommand,
  InvokeAgentRequest,
  InvokeAgentResponse,
} from "@aws-sdk/client-bedrock-agent-runtime";
import { ResponseStream, streamifyResponse } from "lambda-stream";

import { config } from "@config";
import { ValidationError } from "@errors/validation-error";
import { logger } from "@shared/index";
import { APIGatewayProxyEventV2 } from "aws-lambda";

const metrics = new Metrics();
const client = new BedrockAgentRuntimeClient();

const agentId = config.get("agentId");
const agentAliasId = config.get("agentAliasId");

function parseBase64(message: Uint8Array): string {
  return Buffer.from(message).toString("utf-8");
}

export const queryModelAdapter = async (
  { body }: APIGatewayProxyEventV2,
  responseStream: ResponseStream
): Promise<void> => {
  try {
    responseStream.setContentType("application/json");

    if (!body) throw new ValidationError("no payload body");
    const request = JSON.parse(body);

    const { sessionAttributes, promptSessionAttributes, sessionId, prompt } = request;

    const input: InvokeAgentRequest = {
      sessionState: {
        sessionAttributes,
        promptSessionAttributes,
      },
      agentId,
      agentAliasId,
      sessionId,
      inputText: prompt,
    };

    const command: InvokeAgentCommand = new InvokeAgentCommand(input);
    const response: InvokeAgentResponse = await client.send(command);

    const chunks = [];
    const completion = response.completion || [];

    for await (const chunk of completion) {
      if (chunk.chunk && chunk.chunk.bytes) {
        const parsed = parseBase64(chunk.chunk.bytes);

        chunks.push(parsed);
      }
    }

    const returnMessage = {
      sessionId: response.sessionId,
      contentType: response.contentType,
      message: chunks.join(" "),
    };

    metrics.addMetric("SuccessfulQueryModel", MetricUnits.Count, 1);

    // Note: In the example we are not streaming, we are using the FURL request timeout feature
    // but we could easily write the stream during the for loop if we wanted to
    responseStream.write(returnMessage);
    responseStream.end();
  } catch (error) {
    let errorMessage = "Unknown error";
    if (error instanceof Error) errorMessage = error.message;
    logger.error(errorMessage);

    metrics.addMetric("QueryModelError", MetricUnits.Count, 1);

    responseStream.end();
    throw error;
  }
  responseStream.end();
};

export const handler = streamifyResponse(queryModelAdapter);
```

위의 코드에서는 에이전트로부터 반환된 응답을 'chunks'로 스트림으로 전송하고 있습니다. 그러나 이 예제에서는 사용자에게 실시간으로 업데이트를 제공하지 않고 완료될 때까지 기다린 후 JSON 객체로 응답합니다. 이제 다음 섹션에서 이를 테스트해보겠습니다!

# 어플리케이션 테스트 🧪

## Postman을 통한 테스트하기

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

당신은 postman/Bedrock Agents.postman_collection.json 파일을 사용하여 자신의 Lambda 함수 URL 정보로 테스트할 수 있습니다.

다음과 같은 예시 JSON 페이로드를 사용하여 테스트할 수 있습니다:

```js
{
  "agentId": "agentId",
  "agentAliasId": "agentAliasId",
  "sessionId": "1f6aa00e-e585-49aa-aa2d-16adb64857c6",
  "prompt": "Can I please book a morning golf session on 2024-02-25"
}
```

그리고 우리의 에이전트가 다음과 같이 응답하는 것을 확인할 수 있습니다:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

우리 에이전트는 여러 가지 작업을 조정했습니다. 첫 번째로 그날 이용할 수 있는 골프 세션을 확인하는 것이었습니다.

에이전트는 먼저 '/golf-sessions/'에 'GET'을 실행해야 한다고 결정했는데, 이렇게 하면 그 날 이용 가능한 모든 골프 세션이 반환됩니다.

그런 다음 예약을 하기 위해 '/golf-sessions/'에 두 번째 작업 'POST'를 연이어 실행했습니다.

여기서 대화형 AI의 힘과 자율 에이전트의 역할을 볼 수 있습니다. 고객을 지원하기 위해 여러 가지 작업을 조합했습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

![이미지](/TIL/assets/img/2024-07-07-AutomatingtasksusingAmazonBedrockAgentsandAI_8.png)

지금은 다른 시나리오에서도 이를 테스트할 수 있어요. 예를 들면 거래 확인, 스파 세션 예약 등등! 댓글에서 솔루션을 어떻게 찾았는지 알려주세요!

# 마무리 인사 👋🏽

이 글을 즐겨 읽어주셨기를 바랍니다. 만약 즐겁게 읽었다면 공유하고 피드백 주세요!

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

비슷한 콘텐츠를 위해 내 YouTube 채널을 구독해주세요!

![Automating tasks using Amazon Bedrock Agents and AI](/TIL/assets/img/2024-07-07-AutomatingtasksusingAmazonBedrockAgentsandAI_9.png)

아래의 링크를 통해 연락하고 싶어요:

[LinkedIn - Lee James Gilmore](https://www.linkedin.com/in/lee-james-gilmore/)
[Twitter - Lee James Gilmore](https://twitter.com/LeeJamesGilmore)

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

게시물을 즐겁게 보셨다면 더 많은 게시물/시리즈를 보려면 내 프로필 Lee James Gilmore를 팔로우해주세요! 또한 인사를 건네고 Hi를 말하는 것을 잊지 마세요 👋

게시물 하단의 '박수' 기능도 사용해보세요. 만약 게시물을 즐겼다면 '박수'를 또 클릭할 수 있습니다!!

# 자기소개

"안녕하세요, 저는 영국을 기반으로 하는 AWS 커뮤니티 빌더, 블로거, AWS 인증 클라우드 아키텍트이자 기술 및 아키텍처 부문 글로벌 팀장 Lee입니다. 현재는 City Electrical Factors(UK) & City Electric Supply(US)에서 근무 중이며, 지난 6년 동안 주로 AWS 상에서 full-stack JavaScript로 작업해 왔습니다."

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

저는 AWS를 사랑하는 서버리스 선구자라고 생각해요. 혁신, 소프트웨어 아키텍처, 그리고 기술에 대한 모든 것을 좋아해요.

** 제공된 정보는 제 개인적인 견해이며, 해당 정보 사용에 대한 책임을 지지 않습니다. **

아래 내용도 참고해보세요:
