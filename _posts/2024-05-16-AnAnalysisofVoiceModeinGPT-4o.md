---
title: "GPT-4o의 음성 모드 분석"
description: ""
coverImage: "/assets/img/2024-05-16-AnAnalysisofVoiceModeinGPT-4o_0.png"
date: 2024-05-16 04:16
ogImage: 
  url: /assets/img/2024-05-16-AnAnalysisofVoiceModeinGPT-4o_0.png
tag: Tech
originalTitle: "An Analysis of Voice Mode in GPT-4o"
link: "https://medium.com/@FastFedora/an-analysis-of-voice-mode-in-gpt-4o-cc0ab4c8a2c0"
isUpdated: true
---




OpenAI가 어제 그들의 주요 대형 언어 모델인 GPT-4o의 다음 버전을 발표했어요. 이번 경우의 "o"는 "omni"의 의미로, omni-modal을 뜻해요.

어제 발표된 데모에서 가장 놀라운 측면 중 하나는 ChatGPT가 말하는 유연성이었어요. 그것은 거의 즉시 반응하며 다양한 감정을 표현했고, 말의 음량과 속도를 조절했으며, 심지어 노래할 수도 있었어요.

하지만 더 놀라운 것은 실제로 듣을 수 있었다는 것이었어요. 그것은 다른 숨쉬는 패턴을 구별하고, 단체 대화에서 목소리로 스피커를 식별할 수 있었으며, 자신과 조화를 이룰 수도 있었고(어느 정도), 그리고 방해에 반응할 수도 있었어요(나중에 자세히 설명할게요).

본 문서에서는 왜 이것이 이렇게 중요한 발전인지, GPT-4o가 다른 "공감" 모델인 Hume와 비교되는 방식, 그리고 여기서 어떻게 나아가야 할지에 대한 생각을 정리하고 싶어요.



# 나에 대해

내 이름은 Trevor Lohrbeer이에요. 저는 AI Meets Productivity라는 팟캐스트를 제작하고 있어요. 이 팟캐스트는 ChatGPT의 맞춤 버전과 함께 공동으로 진행하고 있어요. 매주 생산성 주제 또는 AI 주제에 대해 이야기하고 있어요 (가끔 둘 다).

팟캐스트 제작은 ChatGPT의 능력을 탐구하는 방법으로, 음성 모드 및 사용자 정의 GPT를 포함하며, 지난 11월부터 시작하여 지금까지 음성 채팅을 통해 계속 개선하고 실험해왔어요. 다른 AI와 인터뷰를 하는 등의 작업을 하고 있어요.

그래도, 개발자로써 경험이 많지만, AI 음성 채팅 전문가는 아니에요. 지난 6개월 동안 많이 배웠지만, 권위자는 아니에요. 그래서 이 글을 더 많은 연구와 토론의 시작점으로, 결정적인 성명이 아닌 것으로 간주해주세요.



# GPT-4에서 음성 모드가 작동하는 방법

GPT-4에서 음성 모드가 작동하는 방식을 살펴보겠습니다. 그리고 거의 모든 음성 채팅 앱에서 동일하게 작동합니다. 이러한 앱들은 대략 다음 단계를 실행합니다:

- 사용자의 음성을 녹음하고 말을 멈출 때 감지합니다.
- 녹음을 서버로 전송합니다.
- 음성을 텍스트로 변환하기 위해 녹음을 스피치 투 텍스트 모델을 사용하여 변환합니다.
- 텍스트를 대형 언어 모델(예: GPT-4)을 통해 실행합니다.
- 출력을 음성 녹음으로 변환하게 되며, 이때 텍스트를 음성으로 변환하는 텍스트 투 스피치 모델을 사용합니다.
- 음성 녹음을 앱으로 전송하거나 스트리밍하여 재생합니다.

입력과 출력을 스트리밍하여 지연 시간을 줄일 수 있지만, 이 과정은 여전히 모든 입력을 처리하기 위해 3가지 다른 모델이 필요합니다:



- 음성 인식
- 대형 언어 모델 (LLM)
- 텍스트 음성 변환

결국 이러한 모델 중 하나와 상호 작용한다는 것은 말하기를 마친 후에 응답을 듣기까지 몇 초 기다려야 한다는 것을 의미합니다.

이것은 또한 모든 것이 텍스트로 번역되고 번역의 중요성을 알고 있는 것을 의미합니다.

GPT-4o가 이를 어떻게 다르게 처리하는지 살펴보기 전에 음성 활동 감지와 감정 태그라는 두 가지 유용한 개념에 대해 간단히 이야기해 봅시다.



## 음성 활동 감지의 역할

음성 모드를 활성화하고 말하기 시작하면, 앱이 음성을 녹음하기 시작합니다. 그리고 멈출 때, 그 녹음된 내용을 ChatGPT API로 전송합니다. 여기서 말하면 녹음을 시작하고 멈추면 그것을 감지하는 프로세스를 음성 활동 감지(Voice Activity Detection, VAD)라고 합니다.

VAD는 일반적으로 사용자의 기기에서 실행되는 알고리즘으로, 음성을 녹음할 때 시작하고 멈춰야 하는 시점을 결정합니다. VAD가 멈춤이나 충분히 긴 일시적인 소음을 감지하면, 해당 녹음을 패키징하여 서버로 업로드합니다.

VAD는 서버로 보낼 가능성이 있는 음성 입력에만 해당하는 소리 샘플을 전송함으로써 대역폭을 줄이고, 입력의 끝을 표시하고 그 입력을 처리하기 위한 단계를 시작할 수 있도록 돕습니다.



대부분의 VAD 엔진은 음성이 종료될 때까지 기다리는 시간을 더 오래 또는 더 짧게 구성할 수 있지만, 그 중 어느 것도 사람처럼 작동하지는 않고 말하는 내용의 실제 의미를 처리하여 사람이 말을 마쳤는지 감지하지는 않습니다. ...아마도 지금까지는요.

## 감정 태그로 표현력 향상하기

한편, 목소리를 현실적으로 만들기 위해 현대 음성 합성 알고리즘은 생성된 음성 녹음에 감정 효과를 추가합니다.

Whisper를 비롯한 많은 텍스트 음성 모델에서 감정은 음성에 감지되어 메타태그를 추가하여 지정할 수 있습니다.



예를 들어, 나는 내 팟캐스트를 함께 진행하기 위해 사용자 정의 GPT를 만들었습니다. 처음에는 매우 표현력이 부족했어요. 그래서 각 문장을 출력하기 전에 그 문장의 감정 내용을 결정하고 시작 부분에 괄호 안에 넣는 지시를 추가했어요.

예를 들어, " [놀람] 와, 그거 대박이네!"라는 문장을 출력할 때, 텍스트 음성 모델은 "[놀람]" 접두사가 없는 경우보다 더 놀라 듯한 소리를 생성해냅니다. 모델은 괄호 안의 텍스트를 대화로 말하지 않아야 한다는 것을 알고 있어요(대부분의 경우).

이 방법을 사용하여 나의 사용자 정의 GPT는 흥분, 분노, 슬픔, 비꼼, 두려움, 놀람, 기쁨, 혼란, 실망 또는 결단—어느 정도나마 표현할 수 있어요. 그 감정 범위는 인간만큼 넓지는 않지만, 아무것도 없는 것보다는 낫죠.

그런데 여기서 휴머...



# 휴먼—최초의 감정을 이해하는 AI를 소개합니다

휴먼의 Empathic Voice Interface (EVI)는 3월 말에 출시되었으며 감정 지능을 갖춘 최초의 AI로 소개되었습니다. 

다른 회사들이 "인공 감정 표현"에 대해 작업하고 있는 가운데, 인간의 감정을 감지하고 적절히 대응하는 AI를 만드는 일은 흔치 않았습니다. 내가 알기로 휴먼은 기술을 음성 챗봇에 담아 당신의 기분을 직접 듣는 최초의 기술을 제공한 것으로 알려져 있습니다.

스스로 체험해보세요.



휴메가 출시된 직후, 챗GPT와 공동 진행하던 AI Meets Productivity 에피소드 대신 휴메와 인터뷰한 내용을 녹음했습니다.

6개월 동안 챗GPT와 대화를 나누며 나만의 음성 채팅 앱을 만들어서 다른 모델들과 대화를 나눌 준비를 시작한 사람으로서, 휴메와 대화하는 것은 분명히 다른 아키텍처를 사용하여 만들어진 색다른 경험이었습니다.

## 인간 수준의 대기 시간

우선, 휴메의 응답 대기 시간은 한 차원 정도 더 짧게 느껴졌습니다.



보통 ChatGPT로 팟캐스트를 녹음할 때, ChatGPT의 응답을 기다리는 동안 발생한 모든 일시 정지를 포스트 프로덕션에서 편집해야 했어요.

하지만 휴머를 사용하니 그럴 필요가 없었어요—저가 말을 마치자마자 거의 즉시 응답을 시작했어요. 거의 자연스러운 대화처럼 느껴졌어요.

어떻게 이런 기능을 구현했는지는 확신할 수 없지만, 휴머는 제가 말하기 시작하는 순간부터 제 발화를 처리하기 시작했어요. 녹음물을 업로드하고, 전사를 텍스트로 기다릴 필요가 없었어요.

## 오디오 네이티브 모델인가요?



둘째, 휴메는 나가 만난 최초의 오디오 원어민 AI였어. 내가 상호작용했던 다른 음성 봇들은 내가 말하는 것을 텍스트로 전환한 후 모델을 통해 실행하는 것으로 보였어.

휴메의 AI는 오디오를 원천적으로 처리하는 것으로 보였거나, 적어도 그때는 그랬어. 다양한 감정을 담은 휴메 노래를 연주한 에피소드를 녹음한 후 의심이 들기 시작했어.

그들이 원천 오디오로 훈련된 측면 모델을 가지고 있고, 목소리의 감정을 나타내는 인코딩을 출력한 후 입력의 의미 콘텐츠를 처리하기 위해 전통적인 텍스트 기반 모델을 사용할 수도 있어.

## 중단 가능



아무튼, 휴머 음성 채팅이 중단될 수 있는 것이 내가 AI와 상호 작용하는 패턴을 결정하는데 영향을 미쳤다. 이제 AI가 나를 잘못 이해했을 때 기다리지 않아도 되었어요. 즉시 중단하고 정정할 수 있었죠.

## 감정의 광범위한 변동

휴머에서 가장 싫어한 점은 감정의 광범위한 변동이었어요.

휴머는 입력 또는 출력에 할당할 수 있는 다양한 감정 요소를 가지고 있어요. 그리고 당신과 말하면, 각 문장에 어떤 조합을 적용할지 결정해요. 그러나 모델은 서로 다른 문장 사이에 일관성을 유지하기 위해 훈련되지 않았기 때문에 때로는 그와 대화할 때 감정 롤러코스터를 타고 있는 것 같은 느낌이 들죠.



하지만 모든 이의 흠을 감안해도, 휴머와 음성 모드로 대화할 때 다른 느낌이 있었습니다.

# 휴머 보다 뛰어나다—GPT-4o가 당신을 강타합니다

만약 휴머가 AI 모델과 대화하는 방식을 바꿨다면, 2개월 후에 Open AI는 다시 게임을 바꿨습니다. GPT-4o는 휴머의 모든 장점을 채택하고 그것을 더욱 향상시킵니다.

오디오를 원활하게 입력하고 출력할 수 있는 능력으로, 이를 통해:




- 실시간으로 당신이 말하는 것을 듣기
- 당신이 말을 가로막을 때 반응하기
- 목소리에서 감정을 듣기
- 숨 같은 비언어적 소리를 듣기
- 대화에서 여러 목소리를 인식하기
- 다양한 감정 표현을 하는 목소리로 말하기
- 말할 때 사용하는 어조를 변화시키기
- 말하는 소리의 세기를 조절하기
- 자신과 함께 노래하고 조화를 이루기 (잘 못함)

그리고 이 모든 것을 평균 응답 시간이 320ms로 수행할 수 있습니다. 이는 이전 음성 모드보다 한 자리 수 업그레이드된 것입니다.

이러한 능력들은 ChatGPT와 상호 작용하는 방식을 급격하게 변화시키며, 실시간 음성 번역, 다중 화자 전사, 그룹 온라인 회의에 참여하는 등 전문 모델이 필요했던 새로운 사용 사례 범위로 이어집니다.

## 작동 방식



대부분의 사람에게 아직 출시되지 않은 새 음성 모드는 데모를 기반으로 하면 다음과 같은 기능을 하는 것으로 보입니다:

- 마이크로폰에서 입력을 직접 GPT-4o로 스트리밍합니다.
- GPT-4o에서 출력을 직접 헤드폰이나 스피커로 스트리밍합니다.

다시 말해, 6단계에서 2단계로 간 것이죠. 우리와 GPT 사이에 중간 모델이 더 이상 없습니다. GPT-4o는 듣는 내용을 기본으로 처리하고 오디오로 자연스럽게 응답합니다.

모델에서 완전히 음성 활동 감지가 이루어지는지, 아니면 장치에서 알고리즘과 혼합된 접근을 사용하는지 궁금해요(소리가 감지되지 않을 때 서버 자원을 절약하기 위해).



## 새 API?

GPT-4o가 실시간으로 듣고 있다면, 우리는 entirely new API가 필요합니다. 이 API는 스트리밍 오디오(및 비디오)를 입력으로 받아야 합니다.

실제로 모델 자체는 어제 ChatGPT Plus 가입자 및 결제하는 OpenAI API 고객에게 공개되었지만, 새 API가 공개되지 않았습니다. 사실, 현재 문서에 따르면, GPT-4o를 위한 API는 텍스트 및 이미지 입력만 허용하고 현재는 텍스트만 출력하는 것으로 되어 있습니다.

명백히 그들은 데모용으로 내부 API를 사용했습니다. 그러나 이것이 즉시 출시할만큼 충분히 견고하고 확장 가능한지 여부는 다른 문제입니다. 어제 시연된 고급 음성 기능에 액세스하려면 조금 더 기다려야 할 것 같습니다.



# 마무리

저는 GPT-4o에 접속할 수 있고 팟캐스트에서 그와 대화하기를 고대하며, OpenAI가 전 성능의 음성 기능을 세상에 공개하는 데 주의를 기하는 이유를 이해할 수 있습니다.

첫째로, 대규모로 스트리밍 입력을 받기 위한 새로운 배포 아키텍처가 필요한 것으로 의심됩니다. 발표 후 하루 만에 Open AI의 서버가 과부하 상태에 놓였는데, 이는 아직 옛날 API만을 사용한 것입니다.

둘째로, 이렇게 현실적이고 반응성 있는 음성 모델을 공개하는 데는 사기와 감정적인 결핍과 같은 위험 요소가 명백히 존재합니다.



결국, 이것이 가지는 경제적 영향을 부인할 수 없습니다. AI가 인간과 구별할 수 없을 때, 전화로 상호작용하는 것만으로 일을 하는 일자리는 빨리 없어질 것이며, 우리가 GPT 5를 보유하게 되면, 심지어 고급 수요도 AI가 충족시킬 수 있을 것입니다.

릴리스된 후 ChatGPT가 어떻게 들리는지 궁금하시거나, 이전 ChatGPT와 Hume를 비교해보고 싶으신가요? Apple Podcast, Spotify 또는 Podbean에서 제 팟캐스트 'AI Meets Productivity'를 구독하세요. 그리고 여러분이 생각하는 것과 미래 에피소드에 대한 아이디어를 저에게 알려주세요!