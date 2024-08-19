---
title: "라즈베리 파이 카메라에서 컴퓨터로 비디오 스트리밍하는 방법"
description: ""
coverImage: "/assets/img/2024-08-18-HowtoStreamVideofromRaspberryPiCameratoComputer_0.png"
date: 2024-08-18 11:36
ogImage: 
  url: /assets/img/2024-08-18-HowtoStreamVideofromRaspberryPiCameratoComputer_0.png
tag: Tech
originalTitle: "How to Stream Video from Raspberry Pi Camera to Computer"
link: "https://medium.com/@shilleh/how-to-stream-video-from-raspberry-pi-camera-to-computer-40f41c8b5675"
isUpdated: true
updatedAt: 1724032767778
---


<img src="/assets/img/2024-08-18-HowtoStreamVideofromRaspberryPiCameratoComputer_0.png" />

라즈베리 파이에 Flask 앱을 설정하고 로컬 네트워크에서 액세스할 수 있는 실시간 보안 카메라를 만드는 방법에 대해 배워보세요. 이 비디오의 끝에는 로컬 네트워크에서 인터넷을 통해 비디오 스트림을 볼 수 있게 될 것입니다! 필요한 것은 라즈베리 파이(제가 4b를 사용했습니다), 카메라, 전원 공급 장치 뿐입니다.

남은 부분을 읽기 전에 아직 구독하지 않았다면 채널을 구독하고 지원해주세요!

구독하기:

<div class="content-ad"></div>

유튜브

지원:

[Buy Me a Coffee](https://www.buymeacoffee.com/mmshilleh)

나를 고용해서 UpWork에서 당신의 IoT 프로젝트를 구축해보세요!

<div class="content-ad"></div>

https://www.upwork.com/freelancers/~017060e77e9d8a1157

# 1-) 라즈베리 파이에서 패키지 다운로드

이 섹션에서는 필요한 패키지를 설치하고 카메라를 활성화하며 네트워크 설정을 구성하여 라즈베리 파이를 카메라 스트리밍용으로 준비할 것입니다. 라즈베리 파이 터미널에서 다음 단계를 따르세요:

# 패키지 목록 업데이트

<div class="content-ad"></div>

첫 번째로 설치 중에 호환성 문제를 방지하려면 패키지 목록을 최신 상태로 유지해야 합니다. 아래 명령을 실행하여 패키지 목록을 업데이트하세요:

```js
sudo apt update
```

# 카메라 인터페이스 활성화

이제 라즈베리 파이에서 카메라 인터페이스를 활성화해야 합니다. 이 작업은 라즈베리 파이 구성 도구를 통해 수행할 수 있습니다. 아래 명령을 입력하세요:

<div class="content-ad"></div>


sudo raspi-config


인터페이스 옵션으로 이동하여 카메라를 선택하고 `예`를 선택하여 활성화하세요. 이 작업을 완료한 후 변경 사항이 적용되도록 라즈베리 파이를 다시 시작해야 합니다.

# Flask 및 PiCamera 설치

카메라가 활성화된 상태에서 이제 Python용 초소형 웹 프레임워크인 Flask와 Raspberry Pi 카메라 모듈용 Python 라이브러리인 PiCamera를 설치하겠습니다. 이를 위해 pip(파이썬 패키지 설치 관리자)를 사용할 수 있습니다. Python 3(권장)을 사용하는 경우 다음 명령어로 이러한 패키지를 설치할 수 있습니다:


<div class="content-ad"></div>

```js
pip3 install flask picamera
```

만약 pip3가 설치되어 있지 않다면, 다음 명령을 실행하여 먼저 설치할 수 있어요:

```js
sudo apt install python3-pip
```

# 라즈베리 파이의 IP 주소 가져오기

<div class="content-ad"></div>

마지막으로, 로컬 네트워크의 다른 장치에서 카메라 스트림에 액세스하기 위해 라즈베리 파이의 IP 주소가 필요합니다. 다음을 실행하여 IP 주소를 가져오세요:

```js
ifconfig
```

wlan0 섹션(무선 연결용) 또는 eth0 섹션(유선 연결용)에 표시된 IP 주소를 메모해 두세요. 이 IP 주소를 사용하여 로컬 네트워크에서 라즈베리 파이 카메라 스트림에 연결할 수 있습니다.

<div class="content-ad"></div>

이제 설정을 마쳤으니 로컬 컴퓨터에서 Python 스크립트를 생성하고 그것을 마음대로 명명한 다음 다음 코드를 실행하세요:

```js
import io
import picamera
from flask import Flask, Response
```

```js
app = Flask(__name__)
def generate_frames():
    with picamera.PiCamera() as camera:
        camera.resolution = (640, 480)
        camera.framerate = 24
        stream = io.BytesIO()
        for _ in camera.capture_continuous(stream, 'jpeg', use_video_port=True):
            stream.seek(0)
            yield b'--frame\r\nContent-Type: image/jpeg\r\n\r\n' + stream.read() + b'\r\n'
            stream.seek(0)
            stream.truncate()
@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, threaded=True)
```

이 스크립트는 라즈베리 파이에 연결된 카메라에서 실시간 비디오를 스트리밍하는 간단한 웹 서버를 설정하는 데 사용됩니다. 각 구성 요소와 각 부분의 역할을 설명해 드리겠습니다:

<div class="content-ad"></div>

Imports:

- io 및 picamera는 Raspberry Pi 카메라 모듈과 상호 작용하는 데 사용됩니다.
- Flask는 Python의 마이크로 웹 프레임워크로, 웹 서버 작업을 처리하기 위해 여기에서 사용됩니다.

Flask 앱 초기화:

- app = Flask(__name__)은 Flask 응용 프로그램을 초기화합니다.

<div class="content-ad"></div>

프레임 생성 기능 (generate_frames):

- 이 함수는 PiCamera와 상호 작용하여 비디오 프레임을 캡처합니다.
- camera.resolution 및 camera.framerate을 설정하여 비디오의 품질과 프레임 속도를 정의합니다.
- camera.capture_continuous를 사용하여 루프를 통해 프레임을 계속 캡처합니다.
- 각 프레임은 JPEG 이미지로 변환되고 멀티파트 메시지로 서식이 지정됩니다(HTTP를 통해 이진 데이터를 전송하는 표준 방식). 이를 통해 각 프레임이 캡처된 후 즉시 인터넷을 통해 전송될 수 있습니다.

웹 서버 라우트 (/video_feed):

- @app.route('/video_feed') 데코레이터는 Flask에게 '/video_feed' URL로의 모든 HTTP 요청을 video_feed 함수가 처리해야 함을 알려줍니다.
- video_feed 함수는 generate_frames에 의해 생성된 스트리밍 응답을 반환합니다. mimetype 매개변수는 브라우저가 수신한 데이터를 해석하는 방법을 알려줍니다.

<div class="content-ad"></div>

주요 블록:

- 'if __name__ == '__main__':` 블록은 이 스크립트가 주 프로그램으로 실행될 때에만 웹 서버가 시작되도록 보장합니다.
- `app.run(host='0.0.0.0', port=5000, threaded=True)` 은 Flask 애플리케이션을 시작합니다. 이는 모든 공용 IP(0.0.0.0)를 통해 5000번 포트에서 요청을 처리하고 각 요청에 대해 별도의 스레드에서 처리하여 여러 클라이언트가 동시에 스트림을 볼 수 있게 합니다.

이 스크립트를 라즈베리 파이에서 실행하면 웹 서버가 시작됩니다. http://`라즈베리파이의-IP주소`:5000/video_feed로 이동하여 웹 브라우저에서 실시간 비디오 스트림을 확인할 수 있습니다. 비디오는 실시간으로 스트리밍되므로 이를 모니터링, 비디오 회의 또는 카메라 화면을 웹을 통해 다른 사람들과 공유하는 데 사용할 수 있습니다. 

# 결론

<div class="content-ad"></div>

튜토리얼을 즐겼으면 영상 위의 YouTube 채널 구독도 잊지마세요! 궁금한 점이 있으면 언제든지 물어봐주세요. 제2부에서 만나요. 지역 네트워크를 초월하여 어디서든 볼 수 있는 비디오 스트림을 만드는 방법을 알아볼 거에요. 기대해주세요!