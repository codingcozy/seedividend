---
title: "AI 기술을 활용한 파이썬 스크립트로 작업을 효율적으로 하는 방법\"
description: ""
coverImage: "/assets/img/2024-08-18-ThisSimpleAI-poweredPythonScriptwillCompletelyChangeHowYouWork_0.png"
date: 2024-08-18 11:42
ogImage: 
  url: /assets/img/2024-08-18-ThisSimpleAI-poweredPythonScriptwillCompletelyChangeHowYouWork_0.png
tag: Tech
originalTitle: "This Simple AI-powered Python Script will Completely Change How You Work"
link: "https://medium.com/towards-artificial-intelligence/this-simple-ai-powered-python-script-will-completely-change-how-you-work-8ab077a5d088"
isUpdated: true
updatedAt: 1724032845658
---



![AI-powered Python Script](/assets/img/2024-08-18-ThisSimpleAI-poweredPythonScriptwillCompletelyChangeHowYouWork_0.png)

프로그래머로서, 자주 손목을 쉬어야 할 때가 온다는 것을 알게 됩니다. 긴 코딩 세션이거나 더 나은 작업 환경에 대한 욕구라든가, 텍스트를 딕테이션할 수 있는 능력은 일을 바꿀 수 있습니다. 이 튜토리얼에서는 Groq의 Whisper API의 높은 속도와 정확도로 Python에서 고급 음성 대 텍스트 전환 도구를 작성하는 방법을 가르쳐 드릴 것입니다.

우리의 목표는 배경에서 실행할 수 있는 스크립트를 개발하는 것입니다. 이 스크립트를 사용하여 버튼을 누르면 모든 애플리케이션에서 음성 입력을 트리거할 수 있습니다. 그런 다음 버튼을 놓으면 말한 내용을 전사하고 자동으로 활성 텍스트 입력 필드에 붙여넣습니다. 이 접근 방식을 통해 시스템의 거의 모든 애플리케이션에 대한 원시 음성 모드를 사용할 수 있습니다.

# Prerequisites


<div class="content-ad"></div>

시작하기 전에 시스템에 Python이 설치되어 있는지 확인하세요. 또한 다음 라이브러리를 설치해야 합니다:

```js
pip install keyboard pyautogui pyperclip groq pyaudio
```

각각의 라이브러리는 특정 목적을 위해 사용됩니다:

- PyAudio: 마이크로폰에서 오디오 입력을 처리하기 위해 사용됩니다.
- Keyboard: 키보드 이벤트를 감지하고 대응하기 위해 사용됩니다.
- PyAutoGUI: 전사된 텍스트를 붙여넣기하기 위해 키보드 입력을 모의하는데 사용됩니다.
- Pyperclip: 시스템 클립보드와 상호작용하기 위해 사용됩니다.
- Groq: Whisper 구현에 접근하기 위한 Groq API 클라이언트입니다.

<div class="content-ad"></div>

게다가, Groq API 키가 필요합니다. 아직 보유하고 있지 않다면, https://console.groq.com/keys 로 이동하여 무료 API 키를 등록해주세요.

# 코드

전체 코드는 이 GitHub 프로젝트를 참조해주세요. 우리는 이 스크립트의 주요 구성 요소를 쪼개어 함께 작동하는 방식을 살펴볼 것입니다.

이번 한 번은 Atomic Agents 라이브러리를 사용하지 않을 것이지만, 멋진 에이전트 AI 기능을 찾고 있다면 다음을 살펴보세요:

<div class="content-ad"></div>

# 환경 설정하기

우리는 필요한 라이브러리를 가져와 Groq 클라이언트를 설정하는 것으로 시작합니다. 우리는 환경 변수에 저장된 API 키를 사용하여 Groq 클라이언트를 초기화합니다. API 키와 같은 민감한 정보를 처리하는 데 최선의 방법은 이러한 정보를 소스 코드에서 분리하여 보관하는 것이므로 API 키가 포함된 .env 파일을 만들어주시기 바랍니다.

```js
import os
import tempfile
import wave
import pyaudio
import keyboard
import pyautogui
import pyperclip
from groq import Groq

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))
```

<div class="content-ad"></div>

record_audio 함수는 그 이름에서 알 수 있듯이 오디오 입력을 캡처하는 역할을 담당합니다:

```js
def record_audio(sample_rate=16000, channels=1, chunk=1024):
    p = pyaudio.PyAudio()
    stream = p.open(
        format=pyaudio.paInt16,
        channels=channels,
        rate=sample_rate,
        input=True,
        frames_per_buffer=chunk,
    )

    print("녹음을 시작하려면 일시 정지 버튼을 누르고 있으세요...")
    frames = []
    keyboard.wait("pause")  # 일시 정지 버튼이 눌려질 때까지 기다립니다.
    print("녹음 중... (일시 정지 버튼을 놓아서 멈춥니다.)")
    while keyboard.is_pressed("pause"):
        data = stream.read(chunk)
        frames.append(data)
    print("녹음이 완료되었습니다.")
    stream.stop_stream()
    stream.close()
    p.terminate()
    return frames, sample_rate
```

저희는 사용 사례에 최적화된 16000 Hz의 샘플 속도를 사용합니다. Whisper 자체가 16000 Hz로 다운샘플링되므로 더 높은 샘플 속도를 사용하는 것은 파일 크기만 늘릴 뿐이며, 이는 16000 Hz로 사용할 때와 같은 시간만큼 텍스트로 변환할 수 없게 될 수 있습니다.

이 함수는 PyAudio 스트림을 설정하고 PAUSE 버튼이 눌릴 때까지 기다립니다. 그런 다음 버튼이 누르고 있는 동안 오디오를 청크 단위로 기록합니다. 우리는 PAUSE 버튼을 선택했는데, 현대적인 애플리케이션에서 거의 사용되지 않는다는 점 때문입니다. 그러나 원한다면 이를 다른 키로 변경할 수도 있습니다.

<div class="content-ad"></div>

# 임시 파일로 오디오 저장하기

오디오를 녹음한 후에는 처리를 위해 임시 파일에 저장해야 합니다:

```js
def save_audio(frames, sample_rate):
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as temp_audio:
        wf = wave.open(temp_audio.name, "wb")
        wf.setnchannels(1)
        wf.setsampwidth(pyaudio.PyAudio().get_sample_size(pyaudio.paInt16))
        wf.setframerate(sample_rate)
        wf.writeframes(b"".join(frames))
        wf.close()
        return temp_audio.name
```

이 함수는 tempfile 모듈을 사용하여 임시 WAV 파일을 생성합니다. 여기서 임시 파일을 사용하는 것이 편리합니다. 왜냐하면 전사를 위해 오디오 데이터가 잠깐 필요할 뿐이기 때문에 처리 후 청소를 원할 것이기 때문입니다. 나중에 다시 다루겠습니다.

<div class="content-ad"></div>

# Groq를 사용한 오디오 전사

우리 도구의 핵심은 transcribe_audio 함수에 의해 처리되는 전사 과정입니다:

```js
def transcribe_audio(audio_file_path):
    try:
        with open(audio_file_path, "rb") as file:
            transcription = client.audio.transcriptions.create(
                file=(os.path.basename(audio_file_path), file.read()),
                model="whisper-large-v3",
                prompt="""프로그래밍 문제에 대해 이야기하는 프로그래머의 오디오이며, 프로그래머는 주로 파이썬을 사용하며 발언 중에는 파이썬 라이브러리나 코드 참조에 언급될 수 있습니다.""",
                response_format="text",
                language="en",
            )
        return transcription
    except Exception as e:
        print(f"오류가 발생했습니다: {str(e)}")
        return None
```

이 함수는 Groq API를 사용하여 오디오 파일을 전사합니다. 우리는 "whisper-large-v3" 모델을 사용했는데, 이 모델은 음성 인식에 대한 높은 정확도를 제공하며 Groq API를 통해 이를 빠르게 수행합니다. prompt 매개변수는 모델에 컨텍스트를 제공하여 오디오 콘텐츠에 대한 이해를 개선합니다. 이 경우, 프로그래밍 관련 주제를 논의할 것이라고 알려주어 라이브러리 이름과 같은 내용의 전사를 조금 더 잘 수행하게 했습니다.

<div class="content-ad"></div>

# 전사 결과 처리

전사된 텍스트를 가져오면 활성 애플리케이션으로 넣어야 합니다:

```js
def copy_transcription_to_clipboard(text):
    pyperclip.copy(text)
    pyautogui.hotkey("ctrl", "v")
```

이 함수는 pyperclip을 사용하여 전사된 텍스트를 클립보드에 복사한 후, pyautogui를 사용하여 "Ctrl+V" 키 조합을 모방하여 텍스트를 활성 애플리케이션에 붙여넣습니다. 이 접근 방식을 통해 우리의 도구가 응용 프로그램에 관계없이 모든 텍스트 입력 필드에서 원활하게 작동함이 보장됩니다.

<div class="content-ad"></div>

# 메인 루프

우리 스크립트의 핵심은 모든 것을 연결하는 main() 함수입니다:

```js
def main():
    while True:
        # 오디오 녹음
        frames, sample_rate = record_audio()

    # 오디오를 임시 파일에 저장
    temp_audio_file = save_audio(frames, sample_rate)
    # 오디오 전사
    print("전사 중...")
    transcription = transcribe_audio(temp_audio_file)
    # 전사를 클립보드에 복사
    if transcription:
        print("\n전사:")
        print(transcription)
        print("전사를 클립보드에 복사 중...")
        copy_transcription_to_clipboard(transcription)
        print("전사가 클립보드로 복사되어 애플리케이션에 붙여넣었습니다.")
    else:
        print("전사 실패.")
    # 임시 파일 정리
    os.unlink(temp_audio_file)
    print("\n다음 녹음 준비. 일시 정지를 눌러 시작하세요.")
```

이 함수는 무한 루프에서 실행되어 사용자가 스크립트를 다시 시작하지 않고 여러 녹음을 할 수 있도록 해줍니다. 각 반복에서 다음과 같은 작업이 수행됩니다:

<div class="content-ad"></div>

- PAUSE 버튼을 누르고 누르고 누르고 누를 때 스크립트가 오디오를 녹음합니다.
- 녹음된 오디오는 임시 파일로 저장됩니다.
- Groq의 Whisper API를 사용하여 오디오를 변환합니다.
- 변환에 성공하면 텍스트가 클립보드로 복사되어 활성화된 애플리케이션에 붙여넣습니다.
- 임시 오디오 파일은 삭제되어 저장합니다.

만약 도움이 되었다면 GitHub에서 프로젝트에 별표를 주시거나 팔로우를 해주세요!

# 저자 지원하기

이 기사가 유용했다면, 적당한 금액을 내 PayPal.me 팁 jar에 기부해도 되지만 강요받지 마세요!

<div class="content-ad"></div>

당신의 지원은 제게 큰 의미를 가지고 있고, 계속해서 기사를 쓰고 튜토리얼을 제작하는 데 시간을 할애할 수 있게 해줍니다.

감사합니다!

경험 많은 프리랜서 건축가/개발자/리드를 찾고 계시거나 컨셉 증명을 개발하려는 경우, 혹은 AI를 구현하는 데 전략적 조언이 필요한 경우, 언제든지 연락주세요!

LinkedIn에서 저와 연락을 취할 수도 있고, 저에게 참여를 원하는 프로젝트가 있을 때는 언제든지 kenny.vaneetvelde@gmail.com으로 이메일 보내주세요. 함께 협업하고 싶어요!

<div class="content-ad"></div>

`<img src="/assets/img/2024-08-18-ThisSimpleAI-poweredPythonScriptwillCompletelyChangeHowYouWork_1.png" />`