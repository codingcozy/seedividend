---
title: "웹소켓, NodeJS를 사용하여 Kafka 앱을 처음부터 만들면서 배운 교훈"
description: ""
coverImage: "/assets/img/2024-06-20-LessonsLearnedfromBuildingaKafkaAppFromScratchUsingWebSocketNodeJSwithChatGPT-4o_0.png"
date: 2024-06-20 03:33
ogImage: 
  url: /assets/img/2024-06-20-LessonsLearnedfromBuildingaKafkaAppFromScratchUsingWebSocketNodeJSwithChatGPT-4o_0.png
tag: Tech
originalTitle: "Lessons Learned from Building a Kafka App From Scratch Using WebSocket , NodeJS with ChatGPT-4o"
link: "https://medium.com/@peter.moskovits/lessons-learned-from-building-a-kafka-app-from-scratch-using-websocket-nodejs-with-chatgpt-4o-cc9b45885f99"
---


예전에 나는 HTML5 앱을 개발하는 일을 했었어요. 새롭게 인가된 WebSocket 표준의 강력함을 보여주는 앱들이었죠. 데이터 스트리밍 데모와 튜토리얼의 공통된 문제는 데이터의 소스입니다. 데이터는 풍부해야 하며(내 발코니의 온도 데이터는 변화가 느리고 따라서 지루합니다) 확인 가능해야 합니다(랜덤한 데이터는 시각화할 수 없습니다). 사람이 만들고 이해하기 쉬운 데이터를 사용하는 것이 종종 좋은 해결책입니다. 이 문제를 해결하기 위해 과거에 제가 개발한 앱 중 하나는 다중 사용자 드로잉 앱이었어요. 이 앱은 한 사용자의 상호작용을 다른 사용자 화면에 반영했죠.

저는 Apache Kafka와 함께 일하기 시작한 이후로 Kafka 백엔드를 가진 이 간단한 데모 앱을 만들고 싶어했어요. 여러 날이 걸릴 것 같아서 미뤄왔었는데, 그리고 시간이 부족하다고 느꼈었죠.

# 데모 앱에 대해

저의 고수준 목표는 Kafka를 Node.js에 연결하고 Node.js가 WebSocket을 통해 브라우저와 대화할 수 있도록 하는 것이에요. 두 개의 별개의 웹 앱을 가지고 싶어요: 드로잉에 사용하는 프로듀서 앱과 다른 기기에서 드로잉을 반영하는 소비자 앱이에요. Kafka 백엔드로는 Confluent Cloud를 사용하고 싶은데, 그 이유는 Confluent에서 일하고 있기 때문일 뿐만 아니라 이와 같은 실험에 적합한 간단하고 정교한 클라우드 환경이기 때문이에요.

<div class="content-ad"></div>

마침내 결정해서 새로운 도전을 해보기로 했어요. 하지만 조금 다르게 해보려고 했어요: 최근에 출시된 ChatGPT-4o가 얼마나 도움이 될지 직접 시험해보고 싶었어요. 이 게시물에서는 ChatGPT와의 상호작용과 여정, 우리가 마주친 오류들, 그리고 어떻게 해결했는지에 대한 소개를 할 거예요. (내가 이 모델을 이미 사람처럼 취급하고 있다는 게 참 재미있다고 생각해.)

# 아키텍처 개요

![Architecture Overview](/assets/img/2024-06-20-LessonsLearnedfromBuildingaKafkaAppFromScratchUsingWebSocketNodeJSwithChatGPT-4o_0.png)

Confluent Cloud에서 실행되는 Kafka 클러스터가 우리 앱의 중심에 있어요. 메시지는 drawing_topic으로 발행하고 소비해요. Kafka 상호작용의 핵심 부분은 프로듀서(왼쪽)와 컨슈머(오른쪽) Node.js 앱에 의해 처리돼요. 마지막으로, 발행해야 하는 데이터(그리기 좌표 및 그림과 관련된 일부 메타데이터)는 각각 브라우저에서 실행되는 HTML5 앱에 의해 생성(왼쪽) 및 렌더링(오른쪽)돼요.

<div class="content-ad"></div>

# ChatGPT가 얼마나 도움이 되었나요?

ChatGPT의 성능에 관해 말하자면 (Github의 소스를 참고): 저는 ChatGPT의 성능에 깊은 감명을 받았습니다! 첫 번째 시도로 간단하지만 작동하는 앱을 만들어냈습니다. 문제를 작은 단위로 쪼개고 테스트할 수 있는 단계로 나누어 진행했기 때문에 전체 과정에서 운전자의 자리에 있었습니다. ChatGPT는 두 가지 오류를 범했지만, 제가 지적하자 바로 해결했습니다. 이 연습의 한 부분으로, 모든 프롬프트, 응답, 그리고 코드 조각들을 자세하게 공유하고자 합니다. 이를 통해 우리 빠르게 변화하는 세상에 대한 일부 힌트나 스냅샷이 될 것이라고 생각합니다.

저는 깊은 인상을 받았지만 동시에 걱정도 되고 있습니다. 우리의 이 새로운 세계가 실패할 위기의 상황이 되지 않기를 소망하며요.

# 작동 중인 앱

<div class="content-ad"></div>

여기 앱이 어떻게 동작하는지 보여주는 GIF 파일이 있어요. 왼쪽 브라우저에서 마우스로 그림을 그리고 있어요. 그 아래에 있는 터미널 창에서 Node.js 애플리케이션이 Kafka 토픽에 메시지를 발행하고, 메시지가 스크롤되고 있어요. 오른쪽에는 다른 브라우저에서 메시지를 소비하는 것을 볼 수 있어요. 제 그림을 그리는 영역 아래에는 Chrome 개발자 도구 콘솔에서 소비 앱에 도착한 메시지를 보여줘요.

중요한 점은 두 브라우저가 로컬에서 실행되는 것이지만 (내 컴퓨터에서 실행 중), 메시지가 흐르는 Kafka 클러스터는 클라우드에 위치하고 있다는 것이에요. 이 애플리케이션은 이와 같은 시스템에서 기대할 수 있는 대략적인 지연 시간에 대한 아이디어를 제공해줍니다.

<img src="https://miro.medium.com/v2/resize:fit:1400/1*6mgRUEq_ou44GxWiaU7FPg.gif" />

# 목차 — 어떤 식으로든

<div class="content-ad"></div>

우리가 가는 방향에 대한 아이디어를 주기 위해, 여기 ChatGPT에 제공한 모든 프롬프트를 읽을 수 있습니다. 이 글의 목차 같은 역할을 할 수 있어요. GitHub 저장소로 바로 이동하거나 아래 프롬프트를 따라올 수 있습니다.

시작해 보겠습니다...

프롬프트 1

ChatGPT의 답변 및 모든 소스 코드를 보려면 클릭하세요.

<div class="content-ad"></div>

테이블 태그를 Markdown 형식으로 변경해주세요.

<div class="content-ad"></div>

프롬프트 4

ChatGPT의 답변 및 모든 소스 코드를 확인하려면 클릭하세요.

프롬프트 5

ChatGPT의 답변 및 모든 소스 코드를 확인하려면 클릭하세요.

<div class="content-ad"></div>

테이블 태그를 마크다운 형식으로 변경하세요.

<div class="content-ad"></div>

테이블 태그를 마크다운 형식으로 변경해주세요.

<div class="content-ad"></div>

테이블 태그를 마크다운 형식으로 변경해주세요.

<div class="content-ad"></div>

# 다음 단계

이 포스트에서는 앱을 간단히 유지하고 싶었지만, 몇 가지 아이디어가 더 발전할 수 있을 것 같아요:

- UI 개선, CSS로 앱 꾸미기: 현재 UI의 스크린샷을 찍어 모델에게 CSS 개선 제안을 해달라고 요청하세요. 색상, 선 굵기, 지우기, 되돌리기 등 여러 기능을 추가하여 봄.
- 음성 명령을 포함한 자연어 기능 추가: 그대신 그림을 그리도록 음성 명령에 대한 기능을 추가하세요.
- 소비자 및 프로듀서 HTML5 앱 병합: 이들을 하나로 결합하여 전체 협업 경험을 제공하는 단일 앱으로 만드세요. 이렇게 하면 모든 클라이언트가 그림을 그리고 다른 클라이언트의 그림을 보는 것이 가능해져서 Google 문서와 유사한 경험을 제공할 수 있어요.
- 백엔드 아키텍처 간소화: 두 개의 Node.js 앱을 하나의 앱으로 병합하여 코드를 최적화하고 앱을 더 쉽게 관리할 수 있도록 만드세요.
- Kafka와 영속 메시지 로그를 활용하는 것을 고려하면, 메시지를 되돌려 다시 그림을 그릴 수도 있어요. 각 메시지에 연관된 타임스탬프를 사용하여 그림을 빨리 또는 천천히 그릴 수도 있어요.

<img src="/assets/img/2024-06-20-LessonsLearnedfromBuildingaKafkaAppFromScratchUsingWebSocketNodeJSwithChatGPT-4o_1.png" />

<div class="content-ad"></div>

# 결론

모델의 도움을 받아 약 한 시간 만에 완전히 작동하는 프로토 타입 앱을 만들 수 있었습니다. 생산 준비가 된 상태는 아니지만, 보통의 귀찮음과 기술적인 어려움이 대부분 없는 기술을 배우는 놀라운 방법입니다.

나는 목표를 명확히 가지고 이 연습에 임했습니다. 이벤트 주도 방식으로 문제를 해결하는 방법, 클라이언트 및 서버 측에서 사용하려는 기술, 그리고 서로 통신하는 방법에 대해 알고 있었습니다. 게다가, 모델을 안내할 그림 그리기 앱의 예도 있었습니다.

두 번의 경우에 솔루션이 조금 부적절했습니다 (프롬프트 4 및 7). 코드에 문제가 있는 이유에 대해 의아해할 수 있습니다. 이 부분에서는 시간이 지남에 따라 상당한 개선이 예상됩니다. 제 프롬프트가 다소 모호했을 수도 있고, 모델이 제 목표를 완벽하게 이해하지 못했을 수도 있습니다.

<div class="content-ad"></div>

이번 연습에서 코드 작성에 집중하지 않았지만, 문제를 마주했을 때 명확한 증상과 오류 메시지를 제공하여 모델의 도움을 효과적으로 활용했습니다. 구글링, StackOverflow 검색 또는 문서 읽기는 필요하지 않았어요 — 간단한 영어 프롬프트만 있으면 돼요.

지식을 나누고 전달하는 데 열정을 가진 사람으로써 나는 항상 YouTube를 지식을 민주화하는 최고의 도구로 보아왔어요. 이 연습은 대형 언어 모델이 많은 이전 가정에 도전하며 이를 다음 수준으로 이끌고 있다는 것을 보여줍니다.

우리는 몇 년 전과는 근본적으로 다른 세상에서 살고 있으며, 나는 그것이 나를 흥분시키고 동시에 걱정도되도록 느끼게 해요.