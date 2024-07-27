---
title: "시계열 데이터에서의 이상치 탐지와 ChatGPT"
description: ""
coverImage: "/assets/img/2024-05-13-AnomalydetectionintimeseriesdatawithChatGPT_0.png"
date: 2024-05-13 00:24
ogImage: 
  url: /assets/img/2024-05-13-AnomalydetectionintimeseriesdatawithChatGPT_0.png
tag: Tech
originalTitle: "Anomaly detection in time series data with ChatGPT"
link: "https://medium.com/javascript-in-plain-english/anomaly-detection-in-time-series-data-with-chatgpt-da5f096fde54"
---


<img src="/assets/img/2024-05-13-AnomalydetectionintimeseriesdatawithChatGPT_0.png" />

# 소개

이론적으로 아이디어는 간단해요

문제는 간단하게 설명할 수 있지만 실제로, 특히 규모가 커지면, 그걸 하기가 상당히 어려워요. 이 기사 전체에서 사용할 예제를 들어보면, 특정 숫자 시리즈(아래에 그려짐)를 살펴볼 거에요



```js
[
  1048, 829, 823, 783, 827, 894, 842, 865, 886, 894, 831, 371, 589, 391, 279,
  246, 298, 2761, 20907, 6866, 871, 945, 844, 3516, 6242, 844, 894, 542, 797,
  832, 828, 847, 891, 915, 896, 814, 680, 417, 177, 0, 0, 1376, 6111, 18184,
  3546, 911, 480, 711, 820, 814, 793, 783, 834, 833, 845, 943, 882, 936, 840,
  747, 576, 393, 261, 180, 303, 2975, 12446, 6882, 896, 919, 820, 749, 779, 812,
  677, 903, 849, 806, 526, 796, 807, 791, 833, 813, 821, 482, 379, 245, 124,
  382, 1776, 13503, 5255, 1757, 1945, 1615, 1092, 822, 856, 843, 862, 899, 835,
  821, 825, 821, 837, 551, 725, 649, 412, 283, 134, 384, 886, 11587, 5876, 1251,
  1012, 841, 855, 898, 936, 903, 921, 953, 919, 903, 904, 790, 811, 686, 522,
  280, 179, 123, 293, 3781, 9501, 1409, 1911, 1329, 1039, 952, 894, 989, 982,
  839, 889, 953, 937, 961, 1195, 938, 943, 458, 576, 322, 426, 248, 411, 671,
  823, 850, 1278, 1081, 860, 820, 16,
];
```

![2024-05-13-AnomalydetectionintimeseriesdatawithChatGPT_1](/assets/img/2024-05-13-AnomalydetectionintimeseriesdatawithChatGPT_1.png)

우리가 관심있는 포인트는 마지막 숫자 (16)입니다. 여러분의 웹 쇼핑몰에서 지불 고객을 나타내는 숫자 목록을 상상해보십시오. 예상보다 낮은 숫자라면 경고를 받고 싶습니다. 이제 수백 개의 웹 쇼핑몰을 관리하고 있다고 상상해보십시오. 하나의 웹 쇼핑몰에서 지불 고객의 수가 감소하면 알림을 받을 수 있는 시스템에 자동으로 설정하는 방법은 무엇일까요?

일반적으로는 비용이 많이 드는 SaaS 도구를 사용할 수 있지만, 그들은 비용 부담이 큽니다. 그 이유로 우리는 직접 설정할 것입니다. 기계 학습을 사용하여 이러한 유형의 문제를 해결하기를 시작하는 것은 이전 경험이 없다면 상당히 어렵습니다. Anodot 또는 유사한 서비스를 사용하고자 하지 않는 한 이 프로젝트를 시작하려면 상당한 초기 투자를 해야 할 것입니다.



ChatGPT 및 유사한 도구를 사용하면, 일반적으로 몇 일 또는 몇 주가 걸리는 제품(이상 감지 엔드포인트)를 몇 시간 또는 몇 분 안에 만들 수 있습니다.

# 예시

우리는 상대적으로 빠르고 저렴하며 신뢰할 수 있는 방법으로 ChatGPT를 사용하여 이상 감지를 자동화할 수 있는지 확인하고 싶어요.

- 우리가 필요한 첫 번째 것은 openai 라이브러리입니다.



npm install openai

2. API 키를 받으세요

![AnomalydetectionintimeseriesdatawithChatGPT_2 이미지](/assets/img/2024-05-13-AnomalydetectionintimeseriesdatawithChatGPT_2.png)

3. 그리고 코드를 입력하세요



```js
import OpenAI from 'openai';

const apiKey = 'YOUR_API KEY'
const model = "gpt-3.5-turbo-0125"

const openai = new OpenAI({
    apiKey
});

const formQuestion = dynamicContent => {
    const question = `매일 사용자 수 (숫자로)가 주어졌을 때, 마지막 데이터포인트가 이상치인가요?  
    [${dynamicContent}]
    return json { outlier: boolean, value: number, belowLowerLimitBand: boolean}
    outlier는 해당 지점이 이상치인지를 나타내야 합니다.
    value는 해당 지점의 값을 가져야 합니다.
    `
    return question
}


const askQuestion = async question => {
    const completions = await openai.chat.completions.create({
        messages: [{ "role": "user", "content": question }],
        model,
        response_format: { "type": "json_object" },
        temperature: 0,
    });
    const { choices, usage } = completions
    return { choices, usage }
}


const answerMyQuestion = async (list) => {
    const question = formQuestion(list)
    const { choices, usage } = await askQuestion(question)
    // const price = getPrice(usage, model)
    // console.log(`The price was ${price} USD`);
    choices.forEach(completion => {
        const result = completion.message.content
        const { outlier, belowLowerLimitBand, value } = JSON.parse(result)
        console.log({ outlier, belowLowerLimitBand, value });
    })
}


const list =[
  1048, 829, 823, 783, 827, 894, 842, 865, 886, 894, 831, 371, 589, 391, 279,
  246, 298, 2761, 20907, 6866, 871, 945, 844, 3516, 6242, 844, 894, 542, 797,
  832, 828, 847, 891, 915, 896, 814, 680, 417, 177, 0, 0, 1376, 6111, 18184,
  3546, 911, 480, 711, 820, 814, 793, 783, 834, 833, 845, 943, 882, 936, 840,
  747, 576, 393, 261, 180, 303, 2975, 12446, 6882, 896, 919, 820, 749, 779, 812,
  677, 903, 849, 806, 526, 796, 807, 791, 833, 813, 821, 482, 379, 245, 124,
  382, 1776, 13503, 5255, 1757, 1945, 1615, 1092, 822, 856, 843, 862, 899, 835,
  821, 825, 821, 837, 551, 725, 649, 412, 283, 134, 384, 886, 11587, 5876, 1251,
  1012, 841, 855, 898, 936, 903, 921, 953, 919, 903, 904, 790, 811, 686, 522,
  280, 179, 123, 293, 3781, 9501, 1409, 1911, 1329, 1039, 952, 894, 989, 982,
  839, 889, 953, 937, 961, 1195, 938, 943, 458, 576, 322, 426, 248, 411, 671,
  823, 850, 1278, 1081, 860, 820, 16
];


answerMyQuestion(list)

// RESULT:
// { outlier: true, belowLowerLimitBand: true, value: 16 }
```  

위의 내용을 보면, 시작하기에 필요한 상대적으로 작은 양의 코드입니다. 위의 코드에서 흥미로운 부분은 question 변수입니다. 이것은 ChatGPT에게 진짜 질문을 하게 하는 부분으로, 온라인 버전에서 진행하는 방법과 동일합니다.

위 코드의 결과는 우리에게 다음 정보를 제공합니다:
- 우리에게 이상치(이상현상)가 있음을 나타냅니다.
- 우리가 기대하는 수치 이하에 있는지 여부(이 경우 더 많은 결제 고객은 문제가 아님)
- 분석하는 값입니다.



# 가격

## Azure 제공품과 비교하여 (어차피 사용이 중지될 예정이지만):

1000 거래에 대한 비용 (같은 질문에 대한 1000개의 답변이 있다고 가정합시다)은 0.314 미국달러입니다.

이는 다른 "이상 징후 감지" SaaS 회사들이 부과하는 가격대 중에서도 저렴한 편에 속합니다. 그렇다면 ChatGPT가 이를 능가할 수 있을까요?



## ChatGPT 가격

위의 테스트에서는 현재 gpt-3.5-turbo-0125 모델을 사용 중이며, 가격은 다음과 같습니다:

- 입력 토큰당 $0.0005
- 출력 토큰당 $0.0015

요청 당 가격을 계산하기 위해 OpenAI API가 요청에 사용된 토큰 양을 반환하므로 조금의 도움이 필요할 것입니다:

```js
const getPrice = (usage, model) => {
    const pricing = {
        'gpt-3.5-turbo-0125': {
            'prompt': 0.0005,
            'completion': 0.0015,
        }
    }
    const modelPrice = pricing[model]
    const promptCost = usage['prompt_tokens'] * modelPrice['prompt'] / 1000
    const completionCost = usage['completion_tokens'] * modelPrice['completion'] / 1000
    const totalCost = promptCost + completionCost
    return totalCost
}
```  



예시 요청에 대한 응답 사용법은 다음과 같습니다.

```js
{ prompt_tokens: 440, completion_tokens: 25, total_tokens: 465 }
```

따라서, 하나의 "답변"에 대한 가격은 0.0002575 미국 달러입니다.

따라서 1000개의 답변 당 가격은 0.2575 미국 달러입니다.



그 가격은 Azure 솔루션보다 상당히 저렴하네요. 최적화를 적용하지 않은 상태에서도 여전히 동일한 결과를 얻을 수 있어요. ChatGPT에 질문을 할 때 질문의 크기를 줄이면서도 원하는 결과를 얻을 수 있다면 돈을 절약할 수 있어요!

# 주의할 점

모든 것을 완전히 자동화하려면 Open AI의 API를 사용해야 합니다.
문제는 이것이 고급 챗봇 같다는 것인데, 우리가 묻는 질문에 대해 어떻게 하고 무엇을 물어볼 지에 대해 매우 신중해야 합니다. 말의 작은 변화가 완전히 다른 결과를 의미할 수 있습니다.
이를 제한하는 방법이 있지만, 위에서 설명한 방식으로 ChatGPT를 사용할 때 결과가 어떻게 생산되었는지에 대한 통찰력이 없다는 점을 명심해야 합니다.
특정 결과에 도달하는 방법이 중요한 경우도 있고 결과 자체가 중요한 경우도 있습니다.
이러한 이유로 쿼리를 다양한 종류의 입력값으로 테스트하고, 잘못된 긍정 또는 부정을 받지 않도록하는 것이 현명합니다.

## 결정론성



현재 ChatGPT가 결정론을 보장하기 어려운 상황입니다. 즉, 동일한 질문이 다른 답변으로 이어질 수 있습니다. 이것은 자동화된 시스템을 만들고 싶을 때 매우 불편합니다. 이 문제를 피하기 위해 쿼리를 만들 때 특히 조심해야 합니다. API로 전송할 수 있는 옵션이 있어 이 문제를 최소화할 수 있지만, 장기적으로 세밀한 조정을 하는 것이 더 나은 접근법일 것으로 보입니다.

# 결론

큰 언어 모델은 아이디어와 현실 사이의 간극을 좁히는 데 성공했습니다. 이미 훈련된 모델을 사용하면 기계 학습에 대해 아무 것도 이해할 필요가 없습니다. 대부분의 사람들이 트랜지스터가 어떻게 작동하는지 모르지만 여전히 컴퓨터를 큰 이점으로 사용할 수 있는 방법과 마찬가지입니다.

기타 SaaS 서비스가 이미 이상 탐지에 많은 "것"을 구축했음에도, 해당 서비스에 묶이거나 제한받지 않고 스스로 시작하는 과정은 일부 사람들이 생각하는 것만큼 어렵지는 않습니다. 그 주장의 반대 면은 OpenAI에 어느 정도 묶이게 될 것이라는 점입니다. 이는 부분적으로 사실이지만, 다른 대규모 언어 모델로 전환해도 많은 코드가 재사용 가능하다는 사실을 간과해서는 안 됩니다.



이 방식을 통해 필요에 따라 자신의 속도로 프롬프트를 정제할 수 있습니다. 또한 상단에 원하는 도구를 구축할 수도 있습니다. 이는 경보 시스템, 차트 등이 될 수 있습니다.

당신이 좋아할지도

# 평문으로 🚀

In Plain English 커뮤니티의 일원이 되어 주셔서 감사합니다! 떠나시기 전에:



- 작가를 칭찬하고 팔로우하는 걸 잊지 말아요! 👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | 뉴스레터
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture
- 다양한 콘텐츠가 PlainEnglish.io에서 만나보세요