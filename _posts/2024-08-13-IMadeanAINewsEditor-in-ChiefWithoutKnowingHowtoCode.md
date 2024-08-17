---
title: "코딩 없이 만든 AI 뉴스 서비스 만들기 "
description: ""
coverImage: "/assets/img/2024-08-13-IMadeanAINewsEditor-in-ChiefWithoutKnowingHowtoCode_0.png"
date: 2024-08-13 11:59
ogImage: 
  url: /assets/img/2024-08-13-IMadeanAINewsEditor-in-ChiefWithoutKnowingHowtoCode_0.png
tag: Tech
originalTitle: "I Made an AI News Editor-in-Chief Without Knowing How to Code"
link: "https://medium.com/the-generator/i-made-an-ai-news-editor-in-chief-without-knowing-how-to-code-593fac0a493e"
isUpdated: true
updatedAt: 1723864018653
---


<img src="/assets/img/2024-08-13-IMadeanAINewsEditor-in-ChiefWithoutKnowingHowtoCode_0.png" />

저는 최근까지 Python이 그냥 뱀의 종일 뿐이라고 생각했던 사람입니다. 그러나 이번 주에 8시간 넘게 사용하여, 그 거대한 뱀의 프로그래밍 언어 이름자를 사용하여 어플리케이션을 만들었습니다. 어떤 어플리케이션을 말하냐고요? 실용적인 것이죠! 저는 주요 출판물의 편집장처럼 작동하는 글 쓰기 프롬프트 앱을 만들었습니다. 현재 주제와 헤드라인을 평가하고 비평하며, 기자들이 언론 회견에서 무료 도넛처럼 빨아들일 수 있는 새로운 스토리 각도를 제공합니다.

편안히 앉아서 선택한 음료를 들고 계시죠. 코딩 모험에 대해 이야기할 차례입니다. 기술적인 논평과 눈부신 창의력을 더하기 위해 매운 맛을 더한 이야기가 준비되어 있습니다.

# 코-코드: 새로운 시대의 개막

<div class="content-ad"></div>

알아요, "새로운 시대의 도래"는 아마 너무 과장된 표현인 것 같아요. 현재 내 트위터 피드를 괴롭히는 AI 브라더들 중 하나가 되고 싶지 않아요. 아시다시피 이런 사람들 말이죠: "AI 세계에서 엄청난 하루가 지난 것 같아요: ChatGPT는 뒤처지고 있어요. 여기에는 당신의 삶을 바꿀 10가지 AI 도구가 있어요…". 난 이것을 좀 다듬어볼게요, 약속할게요.

하지만 여러분이 나를 잘못 이해하지 않길 원하거든요. 난 어떤 쉬운 로우코드나 노코드 서비스로 앱을 만들고 싶어한 것은 아닌 걸요— 그 반짝이는 웹사이트들, 그것들은 당신이 사전 제작된 디지털 레고 블록을 조립하여 자신만의 소프트웨어 프랑켄슈타인을 만들게 해주는 것들 말이에요. 그런 건 제 취향 아니에요. 예전에는 그랬어요:

하지만, 지금은 제 취향 아니에요. 저는 새롭고 최신의 개념을 만들어내려고 여기 왔는데요, 드러머를 연주해도 될까요… '공동코딩'이라고 부르겠어요.

알아요, 구글에서 검색해본 적도 없고 내가 이 용어를 만들었다는 건 확신할 수 없는데요. 그래도 '공동코딩'— 나의 버전— 이건 '협동 코딩'의 줄임말이에요: 당신과 AI가 만나서 작은 코드 단위를 만들어내는 거란 거지요.

<div class="content-ad"></div>

코딩을 함께하는 곳, 그곳이 바로 마법이 일어나는 곳입니다. 소매를 걷어 올리고, 자신의 일에 정통한 더 높은 힘과 협력하며 그림을 그리거나 뮤직 잼을 즐기는 것과 같은 디지털 환경입니다. 단지 Bob Ross가 항상 제게 졸음을 부리는 부분은 무시하고요.

코드를 제거하거나 줄이는 것이 아니라 받아들이는 것이 중요합니다. 차가운, 무감각한 기계로부터 일반적인 구성 요소를 숟가락으로 먹이는 것이 아닙니다. 대신, 당신을 뒷받침하는 협력자와 활발하게 협력하면서, 제대로 된 방향으로 이끌어주고, 실수를 바로 잡아주며, 코딩 실력을 키울 수 있도록 도와줍니다. 그러면서도, 직접 만들어내고 배우는 중요한 기술을 익히게 됩니다.

그리고 제가 할 수 있다면, 여러분도 할 수 있습니다. 여기서 끝나면 여러분도 코-코딩을 시도하고 싶어할 것이라고 확신합니다.

# 내 코-코딩 툴킷

<div class="content-ad"></div>

알겠어요, 고백할 시간이에요. 사실 나는 앨리스가 원더랜드에 빠져들듯 코딩 세계에 우연히 걸어들어온 초보자는 아닌 거야. 스프레드시트를 다루는 법을 알고, 명령행을 사용할 수 있고, API가 무엇인지 알고, 라우터를 설정할 수 있어 (아무나 도와달라고 부르면서 내게 연락 해). 하지만 코드를 처음부터 만드는 데 완전히 초보자였어.

그렇다고 해도, 누구라도 할 수 있어. 네가 가능해. 하지만 기사가 남은 부분에 대해, 독자들이 기술적인 지식을 기본적으로 갖췄다고 가정해. 마우스와 모니터를 구분할 수 있고, 구름이 하늘에 퍼지는 것 뿐만 아니라 구름은 딱히 때묻지 않은 것이므로 이해했으면 우린 친구가 될 수 있어.

자, 바로 이 AI 협업을 성공적으로 이끌어 낼 헐말, 혁신적인 도구를 어떤 걸 사용했냐고? 말해줄게 — 할리포터 완드, 델로리안, 윌리 원카의 황금 티켓은 필요 없었어. 나는 인터넷 연결만 있다면 누구나 사용할 수 있는 간단한 도구 세트를 사용했어: ChatGPT, Bing Chat, 그리고 내 신뢰할 수 있는 올’ MacBook Pro.

- ChatGPT: 코딩 분야에서 나의 주요 보조 역할을 하는 곳. 구독에 돈을 조금 퍼부어, GPT-4 모델에 액세스 권한을 부여받았어. OpenAI에 따르면 "GPT-4는 이전보다 더 창의적이고 협력적이다." 나는 무료 GPT-3.5-turbo 모델보다 더 나은 결과를 내놓는 것을 보았어. 그럼에도 불구하고, 무료 Chat GPT 계정도 아주 잘 동작할 거야.
- Bing Chat: 메모를 못 받았다면, 마이크로소프트는 ChatGPT를 만든 OpenAI의 건축가들 중 상당 부분에 손을 댔다는 걸 알아야 해. 5월 초에 기술 거물은 Bing Chat을 모두에게 공개했어. '창의적' 모드에서는 웹 연결된 ChatGPT의 버전이고, 화려한 GPT-4 모델로 동작해. 그리고 또한 중요한 것? 무료야! 가끔 약간 기분파일 때도 있긴 하지만, 아마 애써 관심을 끄는 것 뿐일지도 모르겠어. ChatGPT에 대한 좋은 대안이며 약간 다른 목적으로 두 가지를 함께 사용하는 편이야 (Bing Chat은 2021년 이후에 관한 어떤 정보도 모르는 ChatGPT에 대해서는 Bing Chat이 좋은데.)
- GitHub: GitHub는 아마도 가장 인기 있는 온라인 코드 저장소이자 Git, 버전 관리 프로그램의 클라우드 구현일거야. 하지만 여기서 내 임무는 버전 관리나 그와 같은 것에 뒤엉킨 게 아니었어. 난 그냥 살펴보고 관대한 마음의 코드에서 배웠어. 그건 마치 보물 찾기와 비슷해, 보물은 지식이고, 해적들은...뭐랄까, 훨씬 더 놀더라고. (우연히 마이크로소프트가 2017년 75억 달러에 GitHub을 인수하면서 소유하고 있단 자네.)

<div class="content-ad"></div>

그럼 저는 MacBook Pro를 사용하고 있어요. Windows도 괜찮아요. 집에서도 즐겁게 따라 할 수 있다면, 명령줄에서 무언가를 액세스하고 실행하는 방법을 알아야 해요. 문제가 발생하면 특수 무기가 있어요: 친구인 ChatGPT 씨나 올드 맨 Bing에게 물어보세요. 그들은 당신을 지원해주며 명령줄에 익숙해요. 우린 할 수 있어요.

## 영감

Thomas Smith의 "WritingGPT"를 찾아 읽다가 흥미가 생겼어요. 혼자서 생각하며 "어떤 식으로 마법을 부릴 수 있을까?" 라는 생각을 하며 턱을 긁고 있었어요. Thomas를 모방해 볼 수도 있지만, 저는 동기부여를 유지할 문제를 해결하는 프로젝트가 정말 필요했어요. SEO 최적화된 블로그 글을 작성하는 것은 멋지지만, 그만이 될만한 충족감을 주지 않았어요.

하지만 한 가지 어려움이 있었어요. 새로운 이야기 아이디어를 찾는 것이었죠. 주제에 깊이 파고들어 공부하는 것을 좋아하지만, 밤늦은 시간까지 머리를 굴리며 독창적인 각도를 찾거나 새로운 관점을 발굴하는 것을 싫어해요.

<div class="content-ad"></div>

유효한 테이블 태그를 마크다운 형식으로 바꾸는 방법은 아래와 같습니다:


| How nice would it be to have a seasoned editor-in-chief-type hanging around, ready to dissect my ideas, challenge my assumptions, and toss me some advice on potential angles? That would be the bee’s knees. | 

| And so, in the chaos of my caffeine-fueled brainstorming, ‘NewsAngles’ was born. Well, the thought of it, anyway. Now, where to start? | 

| The first steps into the unknown | 

| First, I focused on finding a simple project on GitHub, downloading it, and trying to run it. And by simple, I mean something that didn’t require a degree in quantum physics to understand. Like this one, or that one, or even this one. These were all basic examples of using OpenAI’s APIs to return a chat completion programmatically — something I’d need for my project. Cool. |


<div class="content-ad"></div>

코드와 놀았어요. 찔러보고, 쥐어보고, 대부분 망가뜨렸어요. 하지만 뭔가를 망가뜨리는 것도 과정의 일부죠, 맞죠? ChatGPT에 코드 조각과 오류를 넣어보기 시작했어요. 이건 마치 모든 걸 아는 우물에 질문을 던지고 지혜의 메아리를 기다리는 것 같았어요. 그리고 역동적인 피드백, 지도, 그리고 제안을 들려주었죠. 

코드를 배우는 환상적인 방법이에요. 제가 가끔씩 아래와 같이 몇 줄의 코드를 붙여넣고 물었어요:

```js
import gradio as gr
import openai
```

그러고 나서 ChatGPT에게 "이 코드가 무엇을 하는 거죠?" 라고 물었죠. 그러자 ChatGPT가 포괄적인 답변을 주었죠:

<div class="content-ad"></div>

<img src="/assets/img/2024-08-13-IMadeanAINewsEditor-in-ChiefWithoutKnowingHowtoCode_1.png" />

얼마나 열심히 노렸더니, 코드의 다양한 부분에 대처하는 법을 익히고 있었어요. 함수를 생성하고 변수를 정의하며 다른 코드 관련 마법을 연습하다 보니, 스펙터클 크기의 거대한 안경과 수십억 달러의 기술 제국은 없어도 빌 게이츠로 변모하고 있는 것 같아요.

코드를 몇 개 조합하고 OpenAI API 문서를 훑어보며, ChatGPT와의 대화를 여러 번 나누어 보았습니다. 이처럼 여러모로 노력한 결과, 이 초기 탐험의 결말은 이겁니다 - 제 스스로의, Github에서 훔치지 않은 진정한 파이썬 스크립트입니다:

```python
# 라이브러리 가져오기
import openai
import os
from dotenv import load_dotenv

# .env 파일로부터 환경 변수 로드
load_dotenv()

# API 키 정의하기
openai.api_key = os.getenv("OPENAI_API_KEY")

# 기사 생성하는 함수 정의하기
def generate_article(title, keywords):

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", ## "gpt-4" 또는 "gpt-3.5-turbo' 선택"
        messages=[
            {"role": "system", "content": "당신은 코미디 천재입니다."},
            {"role": "user", "content": "명시된 주제와 장소를 활용해 200-300단어의 재밌는 단편 스토리를 쓰세요."},
            {"role": "user", "content": f"주제: {subject}\n장소: {location}\n기사:\n"}
        ]
    )

    # 생성된 텍스트 추출
    generated_text = response["choices"][0]["message"]["content"]
    # 생성된 텍스트 반환
    return generated_text

# 사용자로부터 입력 받기
subject = input("이야기의 주요 주제(사람, 동물, 물건)를 입력하세요: ")
location = input("이야기가 발생하는 장소를 입력하세요: ")

# 기사 생성하기
article = generate_article(subject, location)

# 사용자에게 기사 출력하기
print(f"여기가 당신의 기사입니다:\n{article}")

# 마크다운 파일로 기사 저장하기
file_name = subject.replace(" ", "_") + ".md"
with open(file_name, "w") as f:
    f.write(f"# {subject}\n\n{article}")
print(f"기사가 {file_name}으로 저장되었습니다.")
```

<div class="content-ad"></div>

응, 사용자에게 주제와 위치를 물어보는 작은 프로그램이야. 그리고 여기서 재밌는 건 — 이게 진짜 재미있는 부분이야 — 너가 입력한 내용으로 웃기는 이야기를 만들어내고 그것을 하드 드라이브에 파일로 저장해줘. 마치 다음 유니콘 같은 느낌이야. 투자할 준비가 되면 나에게 알려줘!

# 계속 추가하기

여기서부터 과정은 파이썬 공장에서의 생산을 닮았어. 작업 중인 파이썬 스크립트를 챗GPT에 붙여넣고 '음, 다음에 이렇게 해보자' 라고 요구사항을 개요와 함께 작은 노트를 남기면 되었지. 챗GPT가 조언을 줘서 나는 신이 났고, 이를 시도하려고 열정을 내걸었어. 대부분의 경우, 뒤죽박죽 만들었지만 여기서 챗GPT가 진짜 대단했어 — 오류가 넘치는 내 코드를 던지면서 다시 조립해주었거든. 그리고 이후에는 씻고 반복하는 것으로 확정이야, 친구들아, 씻고 반복해.

이 반복적인 방법은 번쩍거리는 진행을 이끌어내고 즐거운 협력 코딩 파티의 비밀 특별 소스가 됐어. 좁고 구체적인 작업을 AI에 제공하면, 내게 더 유용하고 이해하기 쉬운 결과물이 생성되었어. 이렇게 하면 어떤 변화가 일어나고 있는지 추적할 수 있어.

<div class="content-ad"></div>

'NewsAngles' 앱으로 돌아가 봅시다. 아이디어는 간단해요 — 최신 뉴스 헤드라인을 모아와 GPT 에이전트에 넣고(나는 편집장으로 성장시킬 거에요) 필요한 피드백에 관한 구체적인 지침을 제공하고, 최종적으로 그 소중한 통찰을 깔끔하게 정리된 파일로 돌려받아 아침 신문처럼 쉽게 읽을 수 있게끔 만드는 거죠. 

'NewsAngles'의 이러한 반복적인 작업 방법을 알려드리겠어요:

## 단계 1: 뉴스 헤드라인 가져오기

ChatGPT에게 물었어요, “오늘 뉴스에서 최신 뉴스 헤드라인을 가져와 반환하는 코드를 작성하고 싶은데, 어떤 라이브러리를 사용하고 어떻게 함수가 동작해야 할까요?”

<div class="content-ad"></div>

위의 내용을 친근한 톤으로 한국어로 번역하겠습니다:

<img src="/assets/img/2024-08-13-IMadeanAINewsEditor-in-ChiefWithoutKnowingHowtoCode_2.png" />

인공지능이 많은 코드를 생성했고, 마지막에 공손하게 다음과 같이 말했습니다:

<img src="/assets/img/2024-08-13-IMadeanAINewsEditor-in-ChiefWithoutKnowingHowtoCode_3.png" />

<div class="content-ad"></div>

"더 구조화되고 신뢰할 수 있으며 존중받는다"는 제 6 학년 선생님으로부터 받은 성적표 말이었어요. 그래서 향수에 젖어 의무감을 느끼며 그 길을 추구하기로 결심했어요. ChatGPT에게 물어봤어요. "'또한, 많은 뉴스 웹사이트가 API를 제공하여 콘텐츠를 더 구조적이고 신뢰할 수 있고 존중받는 방식으로 액세스할 수 있게 해줍니다' - 어떤 것을 추천해주시겠어요?" 그리고 추천을 받았죠:


![이미지](/assets/img/2024-08-13-IMadeanAINewsEditor-in-ChiefWithoutKnowingHowtoCode_4.png)


그래서 API 정글을 헤치고 가장 쉽거나, 사실 무료이거나 적어도 아주 싸게 이용할 수 있는 것을 찾아보기 위해 작은 사파리를 떠났어요. GNews에 도착했어요. 사냥의 즐거움에서 아직 흥분한 채, 공동 코딩 친구에게 "멋져요, Gnews API를 사용할게요. 사용자가 입력한 주제로 5개의 헤드라인을 가져와 다른 함수들에서 다른 곳에서 사용하도록 코드로 python 함수를 만들려면 어떻게 해야 하나요?" 라고 메시지를 보냈어요. AI 동료가 친절하게 대답해주었죠:


![이미지](/assets/img/2024-08-13-IMadeanAINewsEditor-in-ChiefWithoutKnowingHowtoCode_5.png)


<div class="content-ad"></div>

그렇게 해서, 내가 바로 다섯 개의 특급 소식을 담아내는 코드의 기본을 마련했어. 내가 상담 과정 중의 협업 코딩에 대해 모든 감정을 느끼게 되었어. 난 내 시간을 충분히 쓸 수 있고, 숙련된 코더들을 웃게 만들 수도 있는 질문을 던지고, 초보자의 함정에 걸려도 나의 멘토의 소중한 시간을 장악하고 있는 것 같지 않아서 누군가에게 불편함을 느끼지 않는다는 기분이었어.

이제 계속 나아가서 이 반복적인 프로세스의 나머지 부분이 어떻게 전개되었는지에 대한 아이디어를 전해줄 테니 이 협업 코딩 게임의 리듬을 이해해봐. 너가 '룸바 위의 고양이' 비디오로 빠져나가지 않도록 조금 더 가속해볼까.

## 단계 2: 사용자 입력

헤드라인을 가져오는 것은 업적이었지만, 일부 헤드라인들은 전혀 지루했어. 실제로 작성하기를 열정적으로 느끼는 주제에 대한 뉴스 헤드라인을 얻고 싶었어. 그래서 나는 ChatGPT에게 "사용자가 주제를 입력할 수 있도록 하고 싶다"고 말했어.

<div class="content-ad"></div>


![이미지](/assets/img/2024-08-13-IMadeanAINewsEditor-in-ChiefWithoutKnowingHowtoCode_6.png)

제 ChatGPT 기록을 되짚어보면, 위 응답과 코드가 작동하기 시작할 때까지 약 네 번 또는 다섯 번의 상호작용을 볼 수 있습니다. 이들은 기존의 파이썬 코드에 이 코드를 어디에 넣어야 하는지에 대한 초보 질문과 코드를 실행할 때 발생하는 문제 해결의 조합이었습니다.

하지만 여기서 주목할 점은, 설명에 인상적인 단군이 필요하지 않았다는 것입니다. 제가 해결책을 구하면서 막힐 때, 제가 그저 오류를 복사하여 거의 "WTF?"라고 물어보곤 했습니다:

![이미지](/assets/img/2024-08-13-IMadeanAINewsEditor-in-ChiefWithoutKnowingHowtoCode_7.png)


<div class="content-ad"></div>

## 단계 3: 소스 및 날짜 추가

사용자 입력이 완벽히 되면, 다음 목표는 취재 방법의 골드 표준을 유지하는 것이었습니다. 소스를 포함하는 것을 보장하는 것이었습니다. 그것은 GNews API에서 데이터를 받아오고 새로운 정보에 맞게 내 save-markdown-file 기능을 다시 조정하는 새로운 작업을 열었습니다.

다시 한 번 몇 번의 소통과 소스 추가 과정을 거쳤고, 아래 내 질문의 톤을 보면 알 수 있듯, 약간의 좌절이 느껴졌습니다.

![그림](/assets/img/2024-08-13-IMadeanAINewsEditor-in-ChiefWithoutKnowingHowtoCode_8.png)

<div class="content-ad"></div>

Chat GPT가 일부 코드와 설명을 뱉어내서 그걸 내 스크립트에 추가했는데, 결과는 완전 다른 방향으로 나왔어요.

![image](/assets/img/2024-08-13-IMadeanAINewsEditor-in-ChiefWithoutKnowingHowtoCode_9.png)

ChatGPT가 더 많은 코드와 안내를 뱉어내서 다시 시도해 보았지만, 결과는 여전히 제 예상과는 다른데요. 좌절이 드러나기 시작했어요.

![image](/assets/img/2024-08-13-IMadeanAINewsEditor-in-ChiefWithoutKnowingHowtoCode_10.png)

<div class="content-ad"></div>

놀랍게도, ChatGPT는 공감을 표현하며 — 코딩 초보로 나를 탓하는 것도 타당했을 텐데, 그럴 이유가 충분했을 텐데도 — 저를 위해 사과합니다:

![이미지](/assets/img/2024-08-13-IMadeanAINewsEditor-in-ChiefWithoutKnowingHowtoCode_11.png)

## 단계 4: 사용자에게 선택권 주기

![이미지](/assets/img/2024-08-13-IMadeanAINewsEditor-in-ChiefWithoutKnowingHowtoCode_12.png)

<div class="content-ad"></div>

위에는 소스 및 날짜를 추가하는 귀찮은 일화를 따른 제 응답을 보여줍니다. 후회할 만한 점은, "멋지네, 잘 했어"가 디지털 코딩 동료에게 제가 빚져야 할 감사의 정도를 완벽히 표현하지 않을 수 있다는 점입니다. 그러나 그것은 1과 0으로 이루어진 바다이기 때문에, 진짜 감정을 가진 생명체가 아니더라도 그저 해결하면 되는 문제였습니다. 나 자신을 용서했습니다.

'NewsAngles'의 다음과 마지막 기능 요청인 사용자용 추가 입력 옵션도 눈에 띕니다. 이를 실행하려면 다시 네 번이나 다섯 번의 오가가 필요했습니다. 매 상호작용은 나에게 내면의 게크를 더 깊이 파헤치고 학습할 기회였습니다.

반복적인 접근법을 기억하세요: 한 가지를 물어보세요. 그 한 가지를 숙달하세요. 한 가지 더 요청하세요. 이게 협동 코딩하는 법이죠, 내 어린 패다완들.

# NewsAngles 1.0 소개

<div class="content-ad"></div>

시간이 왔어요. 

친구들, 여기 NewsAngles를 소개합니다 — 당신의 개인 AI 편집장:

![NewsAngles](https://miro.medium.com/v2/resize:fit:1400/1*pCNdmsVrmUWp-01z2Jn-FA.gif)

자, 이 기술적인 몬나 리자를 해체해 보겠습니다:

<div class="content-ad"></div>

먼저, 내가 결정할 차례야: 내가 선택한 주제를 탐구하고 싶은지, 특정 최신 뉴스 카테고리의 헤드라인을 원하는지. 위의 예시에서는 전자 옵션을 선택하고 'Elon Musk'를 입력했어. 만약 후자의 옵션을 선택하고 싶다면, 아래와 같이 보일 거야:


<img src="/assets/img/2024-08-13-IMadeanAINewsEditor-in-ChiefWithoutKnowingHowtoCode_13.png" />


그러면, NewsAngles는 화면에 다섯 개의 'Elon Musk'에 관한 이야기를 찾아서 출력해줘.

마지막으로, NewsAngles는 모든 헤드라인과 가능한 이야기 각도에 대한 현명한 편집장의 통찰력이 담긴 마크다운 파일을 저장해. 아래는 하나의 헤드라인에 대한 분석 예시를 보여주지만, 전체 파일은 모든 헤드라인에 대해 같은 내용을 담아.

<div class="content-ad"></div>


# 이론 머스크

제목 1: 삼성전자, 테슬라 경영진들이 협력에 대해 논의합니다.

1. 독특한 관점: 삼성-테슬라 협력이 전기 자동차 및 기술 산업에 미칠 잠재적인 영향을 탐색합니다.

2. 가설:
   a. 삼성-테슬라 파트너십은 전기 자동차 및 기술 부품에 혁신을 가져올 수 있습니다.
   b. 이 협력은 기존 기술 및 전기 자동차 기업에 대한 새로운 경쟁을 만들어낼 수 있습니다.

3. 질문:
   a. 삼성과 테슬라가 협력을 고려 중인 구체적인 기술은 무엇인가요?
   b. 이 파트너십이 전기 자동차 시장을 어떻게 변화시킬 수 있을까요?
   c. 이 협력으로 영향을 받을 수 있는 기존 경쟁사는 누구인가요?
   d. 소비자들은 삼성-테슬라 연합체로 어떻게 혜택을 받을 수 있을까요?
   e. 이 잠재적인 파트너십을 둘러싼 우려나 과제가 있을까요?

4. 다른 아이디어와 예시:
   a. 기술 및 자동차 기업 간 이전에 시장을 혁신시킨 협력 사례.
   b. 경쟁이 더 격려된 전기 자동차 시장의 잠재적인 환경 영향.
   c. 전기 자동차 산업의 현재 상태.

5. SCAMPER 요소:
   a. 결합: 삼성과 테슬라의 자원을 결합하여 산업 선도적 혁신을 만들 수 있는 방법은 무엇인가요?
   b. 적응: 두 회사의 기존 기술을 협력 내에서 새로운 응용 프로그램을 위해 어떻게 수정할 수 있을까요?


이 경우 NewsAngles는 고민해볼 여러 가지 가설을 제시해주었습니다. 이 가설 중에 이런 것이 맘에 듭니다: "삼성-테슬라 파트너십은 전기 자동차 및 기술 부품에 혁신을 가져올 수 있습니다." 그리고 가설을 검증하기 위한 몇 가지 탐구적인 질문도 제안합니다. 마지막으로, 제 AI 편집장은 SCAMPER 프레임워크에서 영감을 받아 고유한 시각으로 더 많은 아이디어와 예시를 제시합니다.

지난 몇 일 동안 매일 아침 이를 활용해왔는데, 내 두뇌 깊은 곳에 숨은 멋진 시각과 아이디어를 찾아내기 때문에 정말 좋습니다. 아니면 아예 없었을 수도 있겠죠!

지금 시도해보세요. NewsAngles는 여기 GitHub에서 찾을 수 있습니다. 여러분이 조정하고 튜닝하는 방법을 보는 건 정말 기대돼요. (수정: 저는 나중에 https://newsangles.me 위치에 NewsAngles의 웹 버전을 만들었습니다. 그 여정에 관한 기사는 여기에서 확인하세요.)

<div class="content-ad"></div>

보세요, 제가 과대한 약속으로 귀하를 유혹하고 실망의 엄청난 더미를 전달하지는 않았길 바라요. 이 기사의 핵심은 인공지능과 협력하여 새로운 기술을 배우고 이루기 힘들고 비용 부담이 큰 일들을 이루는 데 게임 체인저가 될 수 있다는 것을 보여드리는 겁니다. 그리고 따라오고 스스로 시도할만큼 충분한 세부 정보를 제공하려는 겁니다.

앞으로 인간 종족에게 미래에 인공지능이 뜻하는 것의 위험을 논할 사람들이 나보다 훨씬 똑똑할 테니 그들에게 맡기도록 할게요. 전은 그저 여기서 새로운 지식의 빛나는 재연에서 즐겁게 마시멜로우를 구워야겠어요. 그 과정에서 멋진 소스를 습득하며요.


# ☕️ 그만 놓치지 마세요...

...월 1 잔의 커피 값으로 Medium의 전체 이용 권한을 획득하세요. 많은 우수 작가들로부터 많은 것을 배울 수 있을 뿐 아니라 구독비는 직접 저를 지원합니다. 2018년 이후로 지출한 최고의 1년 $50이죠!
