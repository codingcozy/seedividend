---
title: "라즈베리 파이에서 Mistral과 LLaVA로 AI와 함께 중국 설날 즐기는 팁 10가지"
description: ""
coverImage: "/TIL/assets/img/2024-07-13-CelebratewithAIChineseNewYearTipsfromMistralandLLaVAonRaspberryPi_0.png"
date: 2024-07-13 19:47
ogImage: 
  url: /TIL/assets/img/2024-07-13-CelebratewithAIChineseNewYearTipsfromMistralandLLaVAonRaspberryPi_0.png
tag: Tech
originalTitle: "Celebrate with AI: Chinese New Year Tips from Mistral and LLaVA on Raspberry Pi"
link: "https://medium.com/towards-data-science/celebrate-with-ai-chinese-new-year-tips-from-mistral-and-llava-on-raspberry-pi-ffef598ecf30"
---


# 소개

전통 축제가 첨단 기술과 만나는 이 기사에 오신 것을 환영합니다. 우리가 중국 음력 새해를 접하면서, Mistral AI의 대형 언어 모델이나 LLaVA와 같은 멀티 모달 모델과 같은 문화적 조언들과 함께 축제 기간을 즐기기에 완벽한 순간입니다.

이 기사의 특별한 점은 언급된 모델을 저렴한 소형 엣지 장치인 라즈베리 파이에 배포한다는 것입니다. 이를 통해 주방을 비롯한 다른 가정용 가전 제품에서도 첨단 인공지능 기술을 접근할 수 있습니다.

용감하게 우리가 용의 해에 발을 디딜 때, 상품 장치에 작은 AI 모델을 활용하고 축제 분위기를 즐기는 것이 흥미로운 순간입니다. 라즈베리 파이나 생성적 AI를 사용해본 적이 없더라도 걱정하지 마세요. 이 기사에서는 이 프로젝트의 모든 단계를 영웅이 될 때까지 안내해 드리겠습니다.

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

시작해 봅시다!

![image](/TIL/assets/img/2024-07-13-CelebratewithAIChineseNewYearTipsfromMistralandLLaVAonRaspberryPi_0.png)

## 하드웨어 전제 조건

이해하셨듯이, 이 문서에는 몇 가지 기본 하드웨어가 필요합니다. 필요한 것은 다음과 같습니다:

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

- Raspberry Pi 5–8 GB: 라즈베리 파이를 129유로에 개별 구매했어요. 아래 나열된 모든 구성품이 포함된 스타터 키트를 구입할 수도 있어요.
- 마이크로 메모리 카드: 메모리 카드가 클수록 빠를수록 좋아요. 저는 "SanDisk 128GB MicroSDXC + SD 어댑터 A2 앱 성능 최대 190MB/s, 클래스 10, U3, V30"을 선택했어요. 이 마이크로 SD 카드 비용은 27유로 했어요.
- 마이크로 HDMI 변환기: 디스플레이를 위해 필요해요. 저는 약 4유로에 가장 저렴한 옵션을 구매했어요.
- 팬 (선택 사항): CPU를 냉각하기 위해. 처음에는 팬을 사지 않았지만, CPU가 지나치게 뜨거워지고 AI 모델이 더 느리게 실행되기 시작하자, 냉각 팬이 성능을 향상시킬 수 있을 것 같았어요. 오늘 아침 20유로에 하나를 구입했고, 다음 기사에서 제 귀여운 팬을 볼 수 있을 거예요. :)
- 27W USB-C 전원 공급 장치: 이 건 20유로에 구매했어요.

이 프로젝트를 시작하려면 유럽에서 약 160유로에서 180유로 정도를 투자할 것으로 예상돼요. 이제 라즈베리 파이와 하드웨어, 필요한 모든 장비를 빠르게 살펴봐요.

주변기기에 대한 자세한 내용은 아래 이미지를 참조해주세요. 라즈베리 파이에는 4개의 USB 포트가 있어요: 5Gbps 전송 속도를 지원하는 2개의 USB 3.0 포트로 빠른 장치에 이상적이고, 마우스와 키보드를 연결하기에 완벽한 2개의 USB 2.0 포트가 있어요.

라즈베리 파이에는 두 개의 마이크로 HDMI 포트도 제공돼요. 이를 통해 두 개의 디스플레이를 동시에 연결할 수 있어요. 전원 공급을 위한 전용 전원 공급 포트도 있어요.

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

라즈베리파이 5의 반대쪽에는 microSD 카드를 넣을 수 있는 슬롯이 있습니다. 거기에 운영 체제를 다운로드하고 설치할 것입니다.

# 라즈베리 OS 이미지 준비

SD 카드를 통해 라즈베리 파이를 부팅하려면, 우선 라즈베리 파이에서 제공하는 이미지 소프트웨어를 다운로드해야 합니다. 해당 소프트웨어는 https://www.raspberrypi.com/software/에서 제공됩니다.

이 소프트웨어는 사용자 친화적이며 사용하기 쉽습니다. 노트북에 다운로드하고 설치한 후, SD 카드를 노트북의 카드 리더기에 삽입하십시오. 그런 다음 소프트웨어를 사용하여 라즈베리 OS를 SD 카드에 플래시 할 수 있습니다.

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

우선, Raspberry Pi 장치, 운영 체제 및 저장 공간을 선택해야 합니다. 다음 화면 캡처에서 제공된 옵션을 선택할 수 있어요.

그런 다음 몇 가지 사용자 정의 설정을 설정하기 위해 다음을 클릭할 수 있어요. 아래 화면 캡처에서 보여주는 대로요.

그 사용자 정의 설정을 마무리하면 아래에서 보여주는 대로 SD 카드를 플래시할 수 있어요.

![화면 캡처](/TIL/assets/img/2024-07-13-CelebratewithAIChineseNewYearTipsfromMistralandLLaVAonRaspberryPi_1.png)

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


# 라즈베리 파이 시작 및 필수 도구 설치하기

SD 카드를 준비한 후 라즈베리 파이에 삽입할 수 있습니다. 전원을 켜고 몇 분을 기다리면 익숙한 리눅스 (데비안) 데스크톱 화면이 화면에 나타납니다. 사용하기 쉬운 깨끗하고 간단한 UI로 이 점을 감사히 여깁니다.

<img src="/TIL/assets/img/2024-07-13-CelebratewithAIChineseNewYearTipsfromMistralandLLaVAonRaspberryPi_3.png" />


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

내 Raspberry Pi가 시작되면 다음 몤령을 실행하여 Raspberry Pi의 IP 주소를 알 수 있고, 그런 다음 노트북을 사용하여 SSH를 통해 Raspberry Pi에 연결합니다.

SSH 연결 없이 Raspberry Pi에서 아래 모든 몤령을 직접 실행하려면 가능합니다.

```js
# Raspberry Pi에서 실행
ifconfig
```

![이미지](/TIL/assets/img/2024-07-13-CelebratewithAIChineseNewYearTipsfromMistralandLLaVAonRaspberryPi_4.png)

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


# 내 노트북에서 실행
ssh 내_사용자_이름@라즈베리_파이_IP_주소


# 라즈베리 파이에 Docker 설치하기

SSH를 통해 라즈베리 파이에 연결한 후 다음 명령을 실행하여 Docker를 설치할 것입니다. 웹 UI를 설치하기 위해 Docker가 필요한데, 이를 통해 AI 어시스턴트와 상호작용할 수 있습니다.


sudo apt-get update && sudo apt-get upgrade


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


![이미지](/TIL/assets/img/2024-07-13-CelebratewithAIChineseNewYearTipsfromMistralandLLaVAonRaspberryPi_5.png)

도커 설치를 몇 가지 간단한 명령어로 안내해 드리겠습니다. 먼저 라즈베리 파이에 Docker를 설치할 적절한 스크립트를 다운로드합니다. 다음 명령어를 사용하여 설치 스크립트를 다운로드하세요:

```js
curl -fsSL https://get.docker.com -o get-docker.sh
```

그런 다음 다음 명령어로 스크립트를 실행하세요:


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
sudo sh get-docker.sh
```

![image](/TIL/assets/img/2024-07-13-CelebratewithAIChineseNewYearTipsfromMistralandLLaVAonRaspberryPi_6.png)

설치 후에는 일반 사용자를 Docker 그룹에 추가하는 것이 좋습니다. 이렇게하면 루트 액세스 없이도 Docker 명령을 실행할 수 있습니다.

사용자를 Docker 그룹에 추가하는 방법은 다음과 같습니다. 변경 사항이 적용되려면 Raspberry Pi에서 로그아웃하고 SSH로 다시 로그인해야 합니다:

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


sudo usermod -aG docker [user_name]

exit


라즈베리 파이에 SSH로 다시 연결하세요:


ssh my_user_name@raspberry_pi_ip_adress


이제 다음을 실행하여 루트 권한이 아닌 사용자가 Docker를 실행할 수 있는지 테스트하세요:


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
도커 실행 hello-world
```

다음 스크린 캡처에서 확인할 수 있듯이 도커가 올바르게 설치되었으며 루트 권한이 없는 사용자에 대해 실행됩니다.

<img src="/TIL/assets/img/2024-07-13-CelebratewithAIChineseNewYearTipsfromMistralandLLaVAonRaspberryPi_7.png" />

# Ollama, Mistral AI 및 LLaVA 설치하기


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

이제 재미있는 부분을 시작해봅시다: 우리의 AI 모델을 설치하는 것입니다. 먼저, Ollama를 설치할 것입니다.

Ollama는 사용자가 개인 컴퓨터나 Raspberry Pi와 같은 기기에서 대규모 언어 모델 (LLMs)을 직접 작동할 수 있는 기술적인 솔루션이에요. 이 플랫폼은 사용자가 모델을 맞춤화하고 훈련할 수 있도록 해주며, 외부 서버에 의존하는 것이 아니라 정보를 로컬에서 처리하여 데이터 프라이버시를 보호합니다. Llama 2와 Code Llama을 비롯한 다양한 모델을 지원하며, 민감한 정보를 제3자 서비스와 공유할 필요 없이 고급 AI 도구를 사용할 수 있습니다.

이 프로젝트에서는 Mistral과 LLaVA 두 모델을 설치할 것입니다.

## Ollama 설치

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

Ollama를 설치하려면 먼저 다음 명령을 실행하여 Ollama를 다운로드하고 설치합니다.

```js
curl https://ollama.ai/install.sh | sh
```

<img src="/TIL/assets/img/2024-07-13-CelebratewithAIChineseNewYearTipsfromMistralandLLaVAonRaspberryPi_8.png" />

Ollama를 설치한 후에는 Raspberry의 웹 브라우저에서 http://127.0.0.1:11434/을 방문하여 작동 여부를 확인하세요. 기본적으로 포트 번호를 사용하는데, 사용자 설정에 따라 다를 수 있습니다. 기본 포트 번호는 11434입니다.

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


![이미지](/TIL/assets/img/2024-07-13-CelebratewithAIChineseNewYearTipsfromMistralandLLaVAonRaspberryPi_9.png)

## Mistral AI 설치하기

Ollama를 설치한 후에 다양한 AI 모델을 다운로드해봅시다. 먼저 다음 명령어를 사용하여 Mistral을 다운로드했습니다. Ollama 웹사이트에서 Mistral 모델에 대한 더 많은 옵션을 찾을 수 있습니다.

```js
ollama run mistral
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


![링크 텍스트](/TIL/assets/img/2024-07-13-CelebratewithAIChineseNewYearTipsfromMistralandLLaVAonRaspberryPi_10.png)

미스트럴 AI 모델 다운로드를 완료하면 명령줄에서 LLM 모델에 직접 질문할 수 있습니다. 여기서 제가 물었던 질문은 "2024년 중국 새해는 언제인가요?" 이었고, 중국 새해가 2월 10일 토요일에 시작됨을 정확히 알아냈습니다.

![링크 텍스트](/TIL/assets/img/2024-07-13-CelebratewithAIChineseNewYearTipsfromMistralandLLaVAonRaspberryPi_11.png)

## LLaVA 설치


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

저희가 관심 있는 두 번째 모델은 LLaVA입니다. LLaVA는 비전 인코더를 사용하여 Vicuna와 결합한 새로운 엔드 투 엔드 학습 대형 멀티모달 모델로, 일반적인 시각 및 언어 이해를 위해 설계되었습니다. Mistral을 다운로드한 방식과 유사하게 LLaVA를 다운로드하는 과정을 진행해 보겠습니다.

```js
ollama run llava
```

<img src="/TIL/assets/img/2024-07-13-CelebratewithAIChineseNewYearTipsfromMistralandLLaVAonRaspberryPi_12.png" />

## Ollama 웹 UI 설치

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

AI 어시스턴트와의 상호 작용을 더 시각적이고 직접적으로 만들기 위해 Ollama 웹 UI를 사용하기로 결정했어요.

Ollama 웹 UI는 개인 기기 전반에서 대형 언어 모델(LLMs)과의 상호 작용을 향상시키기 위해 설계된 완벽한 인터페이스에요. ChatGPT에 영감을 받은 이 사용자 친화적인 디자인은 사용자가 여러 AI 모델을 쉽게 관리하고 전환할 수 있도록 하며 멀티모달 상호 작용에서 채팅하고, 고급 대화 매개변수로 경험을 사용자 정의할 수 있어요.

Ollama를 설치하려면 다음 명령을 실행하기만 하면 돼요. 이미 Docker를 설치했기 때문에요.

```js
docker run -d --network=host -v ollama-webui:/app/backend/data -e OLLAMA_API_BASE_URL=http://127.0.0.1:11434/api --name ollama-webui --restart always ghcr.io/ollama-webui/ollama-webui:main
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

<img src="/TIL/assets/img/2024-07-13-CelebratewithAIChineseNewYearTipsfromMistralandLLaVAonRaspberryPi_13.png" />

웹 UI 도커가 실행되면 이제 라즈베리 파이 UI로 돌아가서, 도커에서 웹 UI를 시작한 후 http://localhost:8080을 방문할 수 있습니다.

# 라즈베리 파이에서 AI 어시스턴트 실행

Ollama 웹 UI를 http://localhost:8080을 통해 열었을 때, 처음 해야 할 일은 가입하는 것입니다. 이 단계는 AI 모델과의 채팅 내역을 기록하고 보안상의 이유로 중요합니다.

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

<img src="/TIL/assets/img/2024-07-13-CelebratewithAIChineseNewYearTipsfromMistralandLLaVAonRaspberryPi_14.png" />

Ollama 웹 UI에 로그인하고 처음 화면을 확인해 보았습니다. 이미 Mistal AI와 LLaVA 두 개의 AI 모델을 다운로드했기 때문에 원하는 모델을 직접 선택할 수 있습니다.

## Mistral AI 질문과 답변

Mistral AI의 기능 탐색 중에 다음 질문을 하였습니다: “중국 정월에는 무엇을 먹나요?”

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

Mistral AI를 통해 액세스하는 Ollama 웹 UI는 나에게 중국 새해와 관련된 전통 요리 목록을 상세히 보여주었어.

이를 통해 Mistral AI가 쿼리를 이해하고 처리할 뿐만 아니라 넓은 지식 베이스를 가지고 있다는 것을 보여줬어. 응답에는 부자를 상징하는 만두와 풍요를 나타내는 생선 등과 같은 클래식한 요리들이 포함되어 있었어. 각 요리 옆에 문화적 의미에 대한 간단한 설명이 포함되어 있어, 중국 새해와 같은 중요한 축제 기간에 교육 및 요리를 위한 도구로서의 Mistral AI의 잠재력을 보여줬어.

## LLaVA 질문과 답변

Mistral AI와 이야기한 뒤에, 나는 중국 전통 요리를 요리해보는 아이디어에서 영감을 받았어. 그러나 냉장고에 있는 재료로 무엇을 할 수 있을까? 바로 여기서 LLaVA가 그의 실력과 마법을 보여줄 때야.

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

냉장고 사진을 찍어 "새해 맞이 중국 요리 무엇을 요리할까요?" 라고 물었습니다. LLaVA는 먼저 사진을 분석하고, 냉장고 속 재료로 새해 맞이 중국 요리로 요리할 수 있는 몇 가지 요리를 제안했습니다. 나는 고기만두와 만두를 가장 좋아해요.

# 결론

이 문서는 AI 기술의 진전을 보여주며, 라즈베리 파이와 같은 기본 하드웨어도 Mistral AI 및 LLaVA와 같은 최첨단 AI 모델을 실행할 수 있다는 것을 보여줍니다.

이 쉬운 단계별 안내서를 통해, 누구나 라즈베리 파이나 AI 지식에 상관없이 1시간 이내에 자신만의 AI 조수를 설정할 수 있습니다.

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

중국의 새해를 축하하는 동안, 이 안내서를 살펴보세요. 인공 지능의 요소를 더해 이 휴일을 환영할 수 있는 방법을 알아보세요. 이 기술적인 경이로움과 함께 새해를 맞아 지혜, 행복, 그리고 번영을 축하하세요.


# 떠나기 전에! 🦸🏻‍♀️

- 이 글에서 가치를 발견하고 지원을 원한다면, 이 LinkedIn 게시물에 '좋아요'를 눌러주세요. LinkedIn 게시물에서 무료 친구 링크도 찾을 수 있습니다. 여러분의 참여는 이 글의 영향력을 확장하는 데 도움이 되며, 지원은 저에 대한 큰 동기부여가 됩니다. ✍🏻🦾❤️
- 제 글에 50번 박수를 보내주세요. 이것은 저를 돕고 다른 사람들에게 이 글을 알리는 데 큰 도움이 됩니다. 👏
- Medium에서 저를 팔로우하고, LinkedIn에서 나를 팔로우하고, 최신 글을 받아보기 위해 구독하세요. 🫶

# 이 주제에 관심이 있다면, 읽을 수 있는 더 많은 기사들이 있습니다.