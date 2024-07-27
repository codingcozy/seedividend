---
title: "자바스크립트에서 1, 5, 11mapparseInt가 1, NaN, 3을 반환하는 이유"
description: ""
coverImage: "/assets/img/2024-05-15-Why1511mapparseIntreturns1NaN3inJavascript_0.png"
date: 2024-05-15 10:28
ogImage: 
  url: /assets/img/2024-05-15-Why1511mapparseIntreturns1NaN3inJavascript_0.png
tag: Tech
originalTitle: "Why ['1', '5', '11'].map(parseInt) returns [1, NaN, 3] in Javascript"
link: "https://medium.com/coding-beauty/parseint-strange-behavior-cdff5e1f9ff7"
---



<img src="/assets/img/2024-05-15-Why1511mapparseIntreturns1NaN3inJavascript_0.png" />

다음에 그가 본 것은 그를 깊이 충격을 받게 했다:

<img src="/assets/img/2024-05-15-Why1511mapparseIntreturns1NaN3inJavascript_1.png" />

이게 어떻게 가능할까? parseInt가 고장 났나? map()에 버그가 있나요?




그는 절망적으로 올려다보았고, 제이크로부터 날카롭고 불안한 웃음소리를 듣게 되었다.

코딩 실력 자랑꾼인 알렉스는 빠른 해킹과 짧은 코드를 자랑했다.

산업에 아주 새로운 신입사원임에도 불구하고, 그는 항상 팀의 나머지보다 우월하다고 생각했으며, 자신이 원하는 대로 고집스럽게 행동했다. 그들의 선의로운 조언은 씌어지지 않았다.

그러나 알렉스는 곧 충격적인 파멸과 마주하게 될 것이다. 그는 결코 잊지 못할 고통스럽고 겸손한 경험을 할 것이다.



모든 것은 Alex와 Cody가 프로젝트 과제를 맡게 된 순간부터 시작되었습니다. 팀이 작업 중이던 전자상거래 웹 사이트의 제품을 사용자들이 볼 수 있도록 하기로 했죠.

아직 스타트업 단계였기 때문에 모든 데이터는 CSV 파일에 저장되고 업데이트되었어요.

제품 이름, 가격, 수량... 아마존과 같은 사이트에서 볼 수 있는 모든 일반적인 정보였죠.

Alex는 협업 계획을 알게 되자 거만하게 비웃었습니다.



"누구하고 일을 한다는 건 전혀 필요하지 않아, 알았지?" 그가 자신의 PC에서 타이핑을 하면서 웃었다. 엔지니어링 부서장인 온순한 제이크를 쳐다보았다. "DB에서 가져와 JSX에 표시하는 거 뿐이야."

"알렉스, 타인과 협력하는 법 배워야 해. 계속 말하는데, 맞지?", 제이크는 인내를 가지고 웃으며 대답했다. 그는 이 자의 자기 중심적인 짓궂음에 익숙했다.

"누구와 협력할 필요도 없어, 나 혼자서도 할 수 있어. 코디가 그 모호한 '가독성 좋은 코드' 얘기로 나를 방해할 뿐이야."

"코디는 최고 중 하나고, 시간을 들이는 게 그만한 이유가 있어. 코드를 빠르게 작성하고 간결하게 하는 게 전부가 아니라고 말했던 걸 계속 말하는데…"



"너는 항상 내게 말을 하지만, 전혀 내 말을 듣지 않아. 이번에는 제게 혼자서 작업하게 해주세요, 알았죠?"라며, 알렉스가 덧붙였어요. 너무 무례하게 들리지 않게 하려고 빠르게 말했죠 — 물론 그 스노비한 미소는 계속 유지하고 있었어요.

제이크가 한숨을 쉬었어요.

"알았어요, 너 혼자서 작업할 수 있다면 이 문자열 배열을 숫자 배열로 변환해봐", 그가 가까이 있는 종이에 노트하기 전에 말했어요.

알렉스는 믿을 수가 없었어요. 종이에는 간단한 배열이 적혀 있었답니다.



<img src="/assets/img/2024-05-15-Why1511mapparseIntreturns1NaN3inJavascript_2.png" />

이건 반드시 속임수 문제였다. 그는 의심스럽게 제이크를 쳐다봤다.

"진지하니? 이걸 파싱할 수 없을 정도로 얼마나 어리석다고 생각해?"

"해보세요, 한 번의 기회밖에 없어요." 제이크는 이 소년에 대한 놀라운 인내심에 자기 제어력 메달을 받을 자격이 있다.



심쿵 낀 표정을 지은 알렉스는 새로운 VS Code 터미널을 열고 오만한 표정으로 Node에서 보이는 당연한 솔루션을 타이핑했습니다:

![image](/assets/img/2024-05-15-Why1511mapparseIntreturns1NaN3inJavascript_3.png)

자신만만한 듯 웃음을 지었지만, 자크가 알렉스에게 짓는 알아차릴 수밖에 없는 미소를 보자 순식간에 균형을 잃어버렸습니다.

"확실하단말씀이신가요, 알렉스? 엔터 키를 눌러 최종 배열이 어떻게 되는지 한번 보죠."



본인에게 약간 의심스러운 마음이 들어, 최종 순간이 오기 전에 제공된 짧은 CLI 코드를 확실하게 확인하기로 했습니다.

다음에 보여진 것은 그를 깊이 깨우치게 했습니다.

<img src="/assets/img/2024-05-15-Why1511mapparseIntreturns1NaN3inJavascript_4.png" />

어떻게 이런 일이 가능한 걸까요? parseInt가 제대로 작동하지 않는 걸까요? 또는 map()에 버그가 있는 걸까요?



허나, 처자는 상담을 시작했다.



알렉스의 실패는 map과 parseInt를 이해하지 못해 일어난 것이 아니었습니다 - 그러나 그것이 도움이 될 수도 있었습니다.

알렉스의 문제는 가독성과 명확성을 희생하면서 코드를 가능한 짧게 만드는 집착이었어요...

사실 99%의 경우에는 우리가 map과 parseInt를 사용하는 방식이 이런 식입니다

<img src="/assets/img/2024-05-15-Why1511mapparseIntreturns1NaN3inJavascript_5.png" />



하지만 console.log를 사용하여 맵을 사용할 때 무슨 일이 벌어지는지 알면 놀랄 지도 모릅니다:

![이미지](/assets/img/2024-05-15-Why1511mapparseIntreturns1NaN3inJavascript_6.png)

각 항목에 대해 숫자 쌍이 3개씩 로깅됩니다!

![이미지](/assets/img/2024-05-15-Why1511mapparseIntreturns1NaN3inJavascript_7.png)



그 이유는 map() 콜백이 실제로 3개의 인수를 가져오기 때문입니다:


<img src="/assets/img/2024-05-15-Why1511mapparseIntreturns1NaN3inJavascript_8.png" />


따라서 실제로 3개의 인수로 parseInt를 호출하게 됩니다:


<img src="/assets/img/2024-05-15-Why1511mapparseIntreturns1NaN3inJavascript_9.png" />
  



알렉스는 절대 parseInt가 1 또는 2개의 인수를 가져야 하며 각각에 대해 다르게 동작한다는 것을 몰랐습니다:

두 번째 인수가 있는 경우 첫 번째 숫자 인수의 기수로 설정됩니다:

![image](/assets/img/2024-05-15-Why1511mapparseIntreturns1NaN3inJavascript_10.png)

맵(map) 및 parseInt에 대한 평균 지식을 갖고 있지만, 명시적으로 표현하는 것으로 이 모든 것을 피할 수 있었을 텐데요:



![image](/assets/img/2024-05-15-Why1511mapparseIntreturns1NaN3inJavascript_11.png)

코드를 줄이는 것은 혼란을 줄일 수 있는 좋은 방법이지만 항상 명확하고 가독성이 좋은 코드를 우선시해야 합니다.

특히 길이가 그리 큰 문제가 아닌 경우에는 더욱 그렇죠?

![image](/assets/img/2024-05-15-Why1511mapparseIntreturns1NaN3inJavascript_12.png)