---
title: "카프틴 피카드와 함께하는 Q-테이블 강화학습 에이전트 만들기"
description: ""
coverImage: "/assets/img/2024-05-14-BuildingaQ-tableReinforementLearningAgentwithCaptainPicard_0.png"
date: 2024-05-14 13:24
ogImage: 
  url: /assets/img/2024-05-14-BuildingaQ-tableReinforementLearningAgentwithCaptainPicard_0.png
tag: Tech
originalTitle: "Building a Q-table Reinforement Learning Agent with Captain Picard"
link: "https://medium.com/@james.matson_64120/building-a-q-table-reinforement-learning-agent-with-captain-picard-12fc0df8c169"
---


<img src="/assets/img/2024-05-14-BuildingaQ-tableReinforementLearningAgentwithCaptainPicard_0.png" />

만약 누군가가 나에게 비가 오는 오후를 보내며 'q-테이블'을 통한 강화 학습 데모를 만들어 오래된 친구들의 집에서 얼 그레이 차를 찾는 캡틴 피카드를 쫓는다고 말해 준다면, 나는 그들을 미친 사람이라고 부를 것이다.

그런데, 여기에 우리가 있네요.

(여기 내가 연례 휴가를 즐기며 지루해질 때 일어나는 일이지...)



여러분이 8월 '23을 되돌아보자면, 저는 강화학습 기초에 관한 가이드를 작성하는 데 시간을 할애했었죠.

이 가이드에서는 '다중암 기계' 문제를 살펴보고, 무작위 선택을 통해 보상을 최대화하는 다양한 방법을 탐색해보았습니다. 욕심 부리는 선택, 그리고 욕심부리는 엡실론 사용까지 비교해보았죠. 적어도 나에게는 정말 즐거운 경험이었어요! 하지만 그것은 강화학습 세계의 극표면을 다루는 것에 불과합니다. 'RL'이라 불리는 광범위한 세계에 대해 읽어보기 시작하면, 컴퓨터에게 보상을 극대화하는 법을 가르치기 위한 다양한 알고리즘, 방법론, 프레임워크로 가득한 깊고 복잡한 세계임을 알게 됩니다.

본 후속 글에서는 강화학습 세계를 더 심도 있게 파헤치고, 문제를 해결하기 위해 강화학습을 사용하는 더 복잡하지만 흥미로운 방법 중 하나를 탐구할 것입니다. 최종적으로는 우리만의 강화학습 실험을 직접 구축하는 과정까지 이어질 것입니다! 만약 이 기사의 나머지 부분을 따라주신다면, 여러분은 여러분만의 브라우저에서 체험할 수 있는 강화학습의 작은 기술 데모를 즐길 수 있을 겁니다.

# Q 누구?



![image](/assets/img/2024-05-14-BuildingaQ-tableReinforementLearningAgentwithCaptainPicard_1.png)

특정 강화 학습 메커니즘인 'Q-러닝'에 대해 배우게 될 거에요. 그게 무엇인지 이해하려면 1989년으로 모습을 돌려봐야해요. 그 해, Christoper Watkins 교수라는 창의적인 학자가 나타났어요.

Watkins는 AI/ML 엔터프라이즈에 중요한 공헌을 한 인물로, 기계 학습에 관한 다수의 논문(텍스트 해석 방식에서 큰 언어 모델과 사람 간의 유사성을 제시한 2022년 연구 포함)의 저자 또는 공동 저자로 활동했어요. 그 중 1989년에 'Q-러닝' 개념을 소개한 논문에 우리는 오늘 초점을 맞출 거에요.

논문에는 "Q-러닝(Watkins, 1989)은 에이전트가 제어된 Markov 도메인에서 최적으로 행동하는 법을 배우는 간단한 방법이다"라고 나와 있어요. (Markov 도메인에 대한 자세한 내용은 나중에 설명할게요)



첫째로, Q-학습은 다른 강화 학습 방법 및 알고리즘과 마찬가지로 에이전트가 환경을 이해하여 주어진 시나리오에서 보상을 극대화하기 위한 방법입니다. 강화 학습에 대한 첫 번째 글을 생각해보면 'RL 루프'를 다음과 같이 상상했습니다:

![RL 루프 이미지](/assets/img/2024-05-14-BuildingaQ-tableReinforcementLearningAgentwithCaptainPicard_2.png)

Q-학습에도 동일한 다이어그램이 적용됩니다. 추상적으로 말하면 에이전트가 환경에서 행동을 취하여 보상을 얻고, 실제 세계의 사용 사례에서는 온라인 마케팅에 사용하여 고객에게 구매 습관에 가장 적합한 광고를 제공하는 최적화 작업에 사용할 수 있습니다 (고객이 광고를 클릭할 때 보상이 제공됩니다).

Q 학습에서 에이전트는 특정 상태에서 작업을 시도하고, 즉시 받은 보상이나 패널티 및 해당 상태의 가치에 대한 추정을 평가합니다. 모든 상태에서 모든 작업을 반복적으로 시도함으로써 장기적으로 할인된 보상에 의해 평가된 전체적으로 가장 좋은 작업을 학습합니다.



환경 내에서 행동의 가치에 대한 정보를 저장하기 위해 Q-러닝은 'Q-테이블'을 사용합니다.

![이미지](/assets/img/2024-05-14-BuildingaQ-tableReinforementLearningAgentwithCaptainPicard_3.png)

Q 테이블을 그냥 그런 테이블로 생각해보세요. 이 테이블은 환경에서 가능한 상태와 행동을 나타내는 열과 행의 조회 테이블입니다.

Q 테이블의 각 '셀'은 초기에 0으로 설정됩니다(이를 '미발견됨'으로 생각할 수 있습니다) 하지만 에이전트가 발견하면 상태와 행동의 각 조합에 대해 얻은 보상으로 Q-테이블을 업데이트합니다. 시간이 지남에 따라, 아이디어는 에이전트가 Q 테이블에서 지속적으로 업데이트되는 정보를 활용하여 보상을 극대화하기 위한 최상의 조치에 수렴할 것입니다.



우리 이전의 기사에서 3개의 팔잡이 문제에 대한 관점을 고려해보면, 초기 q-테이블은 다음과 같이 보일 수 있어요:

```js
| State | Arm 1 | Arm 2 | Arm 3 |
|-------|-------|-------|-------|
|   1   |   0   |   0   |   0   |
```

슬롯 머신에는 실제로 손잡이를 당기는 하나의 상태만 있고, 3개의 기계를 가진 3개의 팔잡이 문제에서, 위와 같은 결과를 얻게 됩니다. 몇 번의 슬롯을 당겨본 후에는 몇 가지 보상 값이 나올 수 있어요:

```js
| State | Arm 1 | Arm 2 | Arm 3 |
|-------|-------|-------|-------|
|   1   |  0.5  |   1   |   4   |
```



에이전트가 상태에 있을 때, 그 상태에 대한 Q-테이블의 행을 확인하고 대부분의 경우, 그 행에서 가장 높은 Q-값을 갖는 행동을 선택합니다 (지금까지 알고 있는 가장 좋은 행동). '탐험률' (에이전트가 새로운 행동을 탐험할지 알려진 좋은 행동을 활용할지를 선택하는 빈도)과 '탐험 감소' (에이전트가 최대 보상 경로로 수렴하고 고수하는 속도)와 같은 요소들은 에이전트가 Q-테이블에서 찾은 값에 얼마나 의존할지에 영향을 미칩니다.

Q-테이블과 상호 작용하는 공식인 '벨만' 방정식은 다음과 같습니다:

새로운 Q-값 = 이전 Q-값 + 학습률 × (보상 + 할인율 × 최상의 미래 Q-값 - 이전 Q-값)

벨만 방정식의 아이디어는 상태-행동 쌍의 가치가 즉시 보상뿐만 아니라 최선의 예상 미래 보상에도 기반하여 업데이트되며, 학습률에 의해 조정된다는 것입니다. 하지만 지난 보상들은 어떨까요? 이전에 있었던 일들의 역사는 어떻게 될까요?



# 마르코프 성질의 역할

![이미지](/assets/img/2024-05-14-BuildingaQ-tableReinforementLearningAgentwithCaptainPicard_4.png)

'마르코프(Markov)' 성질을 따르는 환경에 대해 얘기할 때 q-테이블 및 q-러닝 방법을 사용하는 것이 가장 적합하다는 점을 주목하는 것이 중요합니다.

그게 뭔지 궁금하신가요?



본질적으로 환경은 '마르코프'로 간주됩니다(러시아의 수학자 안드레이 마르코프에서 유래된 용어). 여기서 '마르코프'란 환경 안의 에이전트의 미래 상태가 현재 상태와 그 상태에서 취하는 행동에만 의존하며, 그 전에 발생한 사건이나 상태 순서에는 영향을 받지 않는 것을 의미합니다. 즉, 과거는 중요하지 않고, 현재와 즉각적인 미래만 고려하여 최상의 보상을 얻는 데 집중됩니다.

마르코프 환경의 한 예로는 연결 네 개 보드가 있습니다. 연결 네에서 움직일 때마다, 실제로 중요한 것은 해당 시점의 보드 상태뿐이며, 5번 전에 누가 무슨 일을 했는지는 중요하지 않습니다(물론 그 때 중요했던 사항이지만, 움직일 때는 현재 보드 상태와 플레이 중인 모든 조각들만 알면 됩니다).

마르코프 환경이 아닌 좋은 예시로는 포커 게임을 들 수 있습니다. 현재 카드와 베팅 풀뿐만 아니라, 상대의 베팅 이력과 블러핑 등의 맥락도 고려해야 합니다. 이러한 사항들은 현재와 미래 패를 플레이하기 위해 전략을 수정할 수 있습니다.

강화학습에는 마르코프와 비마르코프 환경으로 처리하는 메커니즘이 있지만, Q-러닝은 전자를 위해 설계되었습니다.



# 얼 그레이, 뜨겁게!

이제 기다리고 계셨던 순간이 왔어요. 속 내용이 어떻게 스타 트렉: 다음 세대의 캡틴, 쟌 루크 피카드와 연결되는 건지 궁금하셨죠? 음, 여기서는 상기된 스타 플릿 선장과 그의 유명한 얼 그레이 차에 대한 애정을 사용해서 Q-러닝의 우리만의 구현을 보여드릴 거예요!

그를 위해, '얼 그레이, 뜨겁게!' 라는 이름의 스타 트렉 우주를 기반으로 한 간단한 아케이드 게임을 디자인하기로 결정했어요.

![Earl Grey, HOT!](/assets/img/2024-05-14-BuildingaQ-tableReinforementLearningAgentwithCaptainPicard_5.png)



우리의 강화학습 기반 게임을 만들기 위해 몇 가지가 필요할 거에요. 끝에 GitHub 레포지토리 링크를 제공할 테니, 여정 동안 함께 하실 거예요. 실험에서는 다음을 선택했어요:

- Phaser (웹 기반 게임 개발 툴킷). 브라우저에서 호스팅할 빠르게 프로토타입을 만들고 싶어서 선택했어요. Phaser에 대해 더 알고 싶다면 여기를 참고하세요 https://phaser.io/
- JavaScript (브라우저/클라이언트 기반으로 무언가를 만들기 때문에 순수 바닐라 JavaScript를 사용할 거에요).
- AWS AppRunner (마지막 솔루션을 호스팅하기 위해 사용할 거예요. AppRunner에 대한 지식은 필요하지 않지만, GitHub와 AWS AppRunner 사이의 효과적인 연동이 간단하고 효과적이어서 선택했어요. 더 알아보려면 여기를 참고하세요 https://docs.aws.amazon.com/apprunner/latest/dg/service-source-code.html

제 이야기는 이렇습니다. 불쌍한 Picard가 우주 병원에 감염되었어요. 이 바이러스로 뇌의 논리와 결정 센터가 덮어씌워져 동물처럼 허기진 듯이 얼그레이 차를 찾는 무모한 욕망이 일어났는데요. 그 결과, 그는 더 많은 얼그레이를 찾기 위해 지역 양로원을 뒤지고 다닌다고 해요. 이것이 우리 게임의 핵심이 될 거예요:

- 에이전트 (Picard 선장)
- 환경 (어린이집, 우리 경우 8 * 8 그리드)
- 목표 (얼그레이 찻잔)
- 일부 장애물 (Picard의 진행을 막는 양로원 간호원들!)



저희 어플리케이션은 매우 간단하게 유지하고 있습니다. 우리 게임을 표시하는 index.html이 있고, RL 로직을 포함한 game.js, 게임을 호스팅하는 node.js 스크립트인 server.js, 그리고 몇 개의 .png 에셋이 있습니다. 완성된 에셋은 다음 저장소에 있어서 즐거운 시간을 보내실 수 있습니다:

우리의 Web UI에는 우리의 에이전트의 성능에 영향을 미칠 수 있는 강화 학습 매개변수가 몇 가지 있습니다! 이들은 다음과 같습니다:

- 학습률 — 에이전트가 경험으로부터 학습하는 속도를 나타냅니다. 높은 학습률은 에이전트가 더 빨리 학습하지만, 오버피팅에 민감할 수도 있습니다.
- 할인 계수 — 할인 계수는 에이전트가 미래 보상을 얼마나 중요하게 생각하는지 결정합니다. 높은 할인 계수는 에이전트가 미래 보상을 더 중요하게 생각하게 만들고, 그 반대도 마찬가지입니다.
- 탐험 비율 — 탐험 비율은 에이전트가 새로운 행동을 얼마나 자주 탐구할지 결정합니다. 높은 탐험 비율은 에이전트가 더 자주 탐구하게 만들고, 그 반대도 마찬가지입니다.
- 탐험 감소 — 탐험 감소는 탐험 비율이 시간이 지남에 따라 얼마나 빨리 감소할지 결정합니다. 높은 탐험 감소는 탐험이 더 빨리 감소하게 만들고, 그 반대도 마찬가지입니다.

자바스크립트 코드를 비롯한 모든 내용을 하나하나 검토하는 것보다, 강화 학습 구현과 관련된 부분에 중점을 둘 것입니다. Phaser 게임의 기본 설정(스프라이트, 환경 등)에 대한 정보는 Phaser 웹사이트를 참조해주세요.



Q-learning을 사용하기 때문에 q-테이블을 생성해야 하는데, 이전에 간단히 언급한 것보다 더 복잡한 q-테이블이 필요합니다. 강화학습 환경을 생각해 보면, 8x8 그리드가 있으므로 64개의 다른 상태가 있습니다. 게다가, Picard는 각 그리드 타일에서 위, 아래, 왼쪽 또는 오른쪽으로 이동할 수 있으므로 8x8x4로 이어지게 됩니다. 따라서 이를 위해 3차원 배열이 필요합니다!

게임.js에서 이를 수행하기 위해 q-테이블을 다음과 같이 생성합니다:

```js
function create() {
    // gridSize x gridSize x 4 (4는 행동의 수)
    qTable = Array(gridSize).fill().map(() => Array(gridSize).fill().map(() => Array(4).fill(0)));
```



기본적으로 우리는 격자의 길이를 가진 배열을 생성하고, 각 요소가 격자의 길이인 배열 내에 배열을 생성한 다음, 그 배열 내에 배열을 만들어 각 요소가 4가지 작업 상태에 대한 배열을 포함하도록합니다.

우리 게임에서 무슨 일이 일어날까요? 의사 결정 프로세스의 핵심은 update(time) 메서드에서 처리됩니다.

여기에서 우리의 에이전트는 행동을 결정하고, 그 행동을 취하며 보상이 업데이트되고, q-테이블이 업데이트되고 목표가 달성될 때까지 진행됩니다. update(time) 내에는 위치를 업데이트하고 스프라이트 또는 텍스트를 렌더링하는 데 관련된 많은 코드가 있지만, 검토해야 할 두 가지 핵심 요소는 chooseAction(position) 함수와 takeAction(position, action) 함수입니다.

다음은 우리의 chooseAction 메서드입니다:



```js
function chooseAction(position) {
    var action;

    // 마지막 이동을 되돌리는 행동을 피합니다.
    var avoidActions = lastActions(); // 최근 몇 가지 작업을 피하기 위한 함수 호출

    if (Math.random() < explorationRate) {
        do {
            action = Math.floor(Math.random() * 4); // 탐험
        } while (avoidActions.includes(action));
    } else {
        // 최선으로 알려진 행동을 활용하며, 가능한 경우 최근 작업의 반대를 피합니다.
        var currentQValues = [...qTable[position.y][position.x]]; // 현재 Q-값을 복제합니다.
        avoidActions.forEach(a => currentQValues[a] = Math.min(...currentQValues)); // 반대 행동을 방지합니다.
        var maxQValue = Math.max(...currentQValues);
        action = currentQValues.indexOf(maxQValue);
    }

    updateLastActions(action); // 최근 작업을 업데이트합니다.
    return action;
}
```

우리는 탐험(새로운 영역 찾기) 또는 활용(알려진 좋은 보상 선택)을 선택할 때 약간의 무작위성을 사용하지만, explorationRate의 값에 따라 어느 정도 제어되는 것을 알 수 있습니다.

탐험하기로 결정하면, 무작위로 위/아래/왼쪽/오른쪽 움직임을 선택합니다 (하지만 최근 작업 중에서 선택하지 않도록 확인을 추가해야 했습니다. 이렇게 함으로써 에이전트가 말하자면, 예를 들어 2개의 타일 사이를 오가며 무한 루프에 갇히는 것을 막았습니다).

활용하기로 결정하면, 우리의 Q-테이블이 가장 좋은 알려진 행동이 무엇인지 알려줍니다 (시간이 지날수록 더 나아지고 더 "알려진" 상태가 됩니다). 그런 다음 행동을 선택하고 움직이며, 간호사, 격자 상의 일반 공간 또는 목표 자체 - 맛있는 얼그레이 티를 만났는지 확인하는 등의 작업을 수행합니다.




우리의 takeAction() 메서드에서는 구체적으로 '보상' 기능을 구현했습니다. 가능하다면 Picard를 이동하고 목표를 발견한 경우 긍정적인 보상을 제공하거나 장애물에 부딪힌 경우 약간 부정적인 보상(누적)을 제공합니다:

```js
function takeAction(position, action) {
    var reward = -0.01;
    var newPosition = { x: position.x, y: position.y };

    // 새 위치가 유효한지 확인합니다(장애물이 아니며 그리드 범위 내에 있는지)
    function isValidMove(newX, newY) {
        if (newX < 0 || newY < 0 || newX >= gridSize || newY >= gridSize) {
            return false; // 그리드 범위 초과
        }
        return !obstacles.some(obstacle => obstacle.x / tileSize === newX && obstacle.y / tileSize === newY);
    }

    // 동작에 따라 새 위치 결정
    switch (action) {
        case 0: // 위
            if (isValidMove(position.x, position.y - 1)) newPosition.y -= 1;
            break;
        case 1: // 오른쪽
            if (isValidMove(position.x + 1, position.y)) newPosition.x += 1;
            break;
        case 2: // 아래
            if (isValidMove(position.x, position.y + 1)) newPosition.y += 1;
            break;
        case 3: // 왼쪽
            if (isValidMove(position.x - 1, position.y)) newPosition.x -= 1;
            break;
    }

    if (newPosition.x !== position.x || newPosition.y !== position.y) {
        // 유효한 이동인 경우 에이전트 위치 업데이트
        agentPosition = newPosition;

        if (agentPosition.x === goalPosition.x && agentPosition.y === goalPosition.y) {
            reward = 1; // 목표에 도달한 경우 보상
        }
    } else {
        // 잘못된 이동(경계를 벗어나거나 장애물로 이동함)
        reward -= 0.1;
    }

    return reward;
}
```

Picard를 결정하고 이동한 후에는 q-테이블을 다음과 같이 업데이트해야 합니다:

```js
function updateQTable(position, action, reward) {
    var nextState = agentPosition;
    var maxQValueNextState = Math.max(...qTable[nextState.y][nextState.x]);
    qTable[position.y][position.x][action] += learningRate * (reward + discountFactor * maxQValueNextState - qTable[position.y][position.x][action]);
}
```



다음은 Q-테이블을 업데이트하는 데 사용되는 JavaScript 구현입니다:

Q(state, action)←Q(state, action) + α×(reward+γ×maxaQ(nextState, a)−Q(state, action))

간단히 말하면: 새 점수 = 이전 점수 + 학습 계수 × (최근 점수 + 미래 잠재력 - 이전 점수).

행동을 선택하고 수행하며 Q-테이블을 업데이트하는 것 외에도, 업데이트 방법에서 수행하는 몇 가지 다른 작업이 있으며, 이는 에이전트가 탐험할지 또는 이용할지에 대한 가중치와 관련이 있습니다.



먼저, 각 단계마다 탐사하는 양을 감소시켜 최대 보상 경로로 수렴할 수 있도록 천천히 줄입니다 (저희 감쇠율에 따라):

```js
explorationRate = Math.max(explorationRate - explorationDecay, 0.01);
```

이에 추가하여, 에이전트가 '멈춰 있는' 것처럼 보일 때 임시로 결정을 탐사하는 가능성을 증가시키는 작은 조정을 업데이트 메서드에 추가해야 했습니다.

```js
if (samePositionCount > 3) {
    explorationRate = Math.min(explorationRate + 0.1, 1.0);
    samePositionCount = 0; // 카운터를 재설정합니다
}
```



이전에는 에이전트가 어딘가에서 루프에 자주 걸렸었지만, 추가하면서 멈춰있다가 얼마 동안 같은 위치에 있으면 약간의 '후드'를 줍니다. 이 변경 사항은 일시적이며 에이전트가 다시 움직일 때까지만 유효합니다.

게임은 피카드가 소중한 얼 그레이에 도착할 때마다 보상을 평가하며, 5번의 연속 시도에서 최대 보상에 수렴할 때 실험이 완료/이루어집니다. 이 시점에서 우리는 에이전트가 가능한 한 작업에 '적합하게' 되었다고 생각합니다.

완성품? 정말 멋진 ('알아요, 알아요 - 이것은 매우 유치하지만, 여전히 재미 있겠죠!') '얼 그레이, HOT1' 게임을 만들었는데요, 아래 링크에서 확인해보세요:

https://earlgreyhot.org/



![Building a Q-table Reinforcement Learning Agent with Captain Picard](/assets/img/2024-05-14-BuildingaQ-tableReinforcementLearningAgentwithCaptainPicard_6.png)

재밌게 즐기고, 매개변수를 조정해보세요. 에이전트가 완료할 때까지 시도 횟수를 최소화해보세요! 그리고 덤으로, 누군가에게 다양한 보상(긍정적이고 부정적인 것, 또는 새로 만들기?)을 조정할 수 있는 기능을 추가하여 그것이 에이전트의 성능에 미치는 영향을 사용자들이 볼 수 있도록 소스 코드를 업데이트하도록 초대합니다.

이 글이 재밌게 보이셨기를 바라며 — 항상 트레키한 방식으로 Q-러닝을 통한 강화 학습 개념을 다룬 것에 흥미를 느끼셨으면 이 기사를 즐기셨다면 박수를 보내거나 댓글을 남겨주세요 — 다음에 또 만나요!