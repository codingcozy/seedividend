---
title: "JS를 사용하여 오디오 녹음하고 WAV 또는 MP3 파일로 백엔드에 업로드하기"
description: ""
coverImage: "/assets/img/2024-05-14-RecordAudioinJSanduploadaswavormp3filetoyourbackend_0.png"
date: 2024-05-14 14:17
ogImage: 
  url: /assets/img/2024-05-14-RecordAudioinJSanduploadaswavormp3filetoyourbackend_0.png
tag: Tech
originalTitle: "Record Audio in JS and upload as wav or mp3 file to your backend"
link: "https://medium.com/@franzeus/record-audio-in-js-and-upload-as-wav-or-mp3-file-to-your-backend-1a2f35dea7e8"
isUpdated: true
---




<img src="/assets/img/2024-05-14-RecordAudioinJSanduploadaswavormp3filetoyourbackend_0.png" />

우리 스타트업은 아이들이 화면에서 색칠된 템플릿을 생동감있게 만들 수 있게 해줘. 종이에 색칠된 템플릿을 업로드하여 디지털 세계를 구축하는 것만으로도 흥미로운 경험이지만, 우리는 아이들에게 추가로 동물에 대한 목소리를 녹음할 기회를 주고 싶었어.

<img src="/assets/img/2024-05-14-RecordAudioinJSanduploadaswavormp3filetoyourbackend_1.png" />

## 문제



작업한 것을 기록합니다. 음성 녹음을 위한 MediaRecorder API 부분은 간단했지만, 업로드한 오디오 파일이 재생되지 않거나 손상된 것으로 보였습니다. 이는 브라우저가 mp3 또는 wav로 오디오를 기록하지 않고 webm으로 기록하기 때문입니다 (적어도 Chrome에서).

우리가 할 일:

- wav로 오디오 녹음
- wav를 mp3로 변환
- 오디오 파일을 서버에 업로드
- 로컬 디스크 또는 S3에 파일 저장

# 오디오 변환을 wav로 변경



최종적으로 녹음을 mp3 파일로 변환하려면 먼저 wav 형식으로 변환해야 했습니다. 이를 위해 기본 MediaRecorder의 대체물인 확장 가능한 drop-in MediaRecorder인 chrisguttandin/extendable-media-recorder 라이브러리를 사용했습니다.

다음과 같이 설치하세요:

```js
npm install extendable-media-recorder
```

# 오디오 녹음



getUserMedia를 사용하여 오디오를 녹음하는 방법에 대한 많은 안내서가 있어요. 저는 간단하게 유효한 mp3 또는 wav 오디오 파일을 만드는 핵심 부분을 다룰 거에요.

```js
import {MediaRecorder, register} from 'extendable-media-recorder';
import {connect} from 'extendable-media-recorder-wav-encoder';

let mediaRecorder = null;
let audioBlobs = [];
let capturedStream = null;

// extendable-media-recorder-wav-encoder를 등록합니다.
async function connect() {
  await register(await connect());
}

// 오디오 녹음을 시작합니다.
function startRecording() {

  return navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: true,
    }
  }).then(stream => {
      audioBlobs = [];
      capturedStream = stream;

      // 확장된 MediaRecorder 라이브러리를 사용합니다.
      mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/wav'
      });

      // 녹음 중 오디오 블롭을 추가합니다.
      mediaRecorder.addEventListener('dataavailable', event => {
        audioBlobs.push(event.data);
      });

      mediaRecorder.start();
  }).catch((e) => {
    console.error(e);
  });

}
```

그리고 녹음을 중지하는 함수:

```js
function stopRecording() {
  return new Promise(resolve => {
    if (!mediaRecorder) {
      resolve(null);
      return;
    }

    mediaRecorder.addEventListener('stop', () => {
      const mimeType = mediaRecorder.mimeType;
      const audioBlob = new Blob(audioBlobs, { type: mimeType });

      if (capturedStream) {
        capturedStream.getTracks().forEach(track => track.stop());
      }

      resolve(audioBlob);
    });
    
    mediaRecorder.stop();
    
  });
}
```



브라우저에서 오디오를 재생하고 싶다면 다음과 같이 할 수 있어요:

```js
 playAudio(audioBlob) {
  if (audioBlob) {
    const audio = new Audio();
    audio.src = URL.createObjectURL(audioBlob);
    audio.play();
  }
}
```

# Wav를 mp3로 변환

Wav를 mp3로 변환하기 위해 lamejs 라이브러리를 사용했어요:



설치

```js
npm install @breezystack/lamejs
```

이제 `convertWavToMp3` 함수를 만들고 녹음된 오디오Blob을 전달하여 mp3 Blob을 얻을 수 있습니다.

```js
import * as lamejs from '@breezystack/lamejs';

convertWavToMp3(wavBlob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function () {
      const arrayBuffer = this.result;

      // WAV 디코더 생성
      // @ts-expect-error - 무슨 일인지 모르겠어요
      const wavDecoder = lamejs.WavHeader.readHeader(new DataView(arrayBuffer));

      // WAV 오디오 데이터를 샘플 배열로 가져옴
      const wavSamples = new Int16Array(arrayBuffer as ArrayBuffer, wavDecoder.dataOffset, wavDecoder.dataLen / 2);

      // MP3 인코더 생성
      const mp3Encoder = new lamejs.Mp3Encoder(wavDecoder.channels, wavDecoder.sampleRate, 128);

      // WAV 샘플을 MP3로 인코딩
      const mp3Buffer = mp3Encoder.encodeBuffer(wavSamples);

      // MP3 인코딩 완료
      const mp3Data = mp3Encoder.flush();

      // MP3 헤더와 데이터를 새로운 ArrayBuffer로 결합
      const mp3BufferWithHeader = new Uint8Array(mp3Buffer.length + mp3Data.length);
      mp3BufferWithHeader.set(mp3Buffer, 0);
      mp3BufferWithHeader.set(mp3Data, mp3Buffer.length);

      // ArrayBuffer에서 Blob 생성
      const mp3Blob = new Blob([mp3BufferWithHeader], { type: 'audio/mp3' });

      resolve(mp3Blob);
    };

    reader.onerror = function (error) {
      reject(error);
    };

    // 입력 Blob을 ArrayBuffer로 읽기
    reader.readAsArrayBuffer(wavBlob);
  });
}
```



# 파일 업로드

파일 업로드는 상당히 쉬운 부분이며 코드를 통해 자세하게 설명할 수 있어서 매우 쉽게 이해할 수 있을 겁니다:

```js
/**
 * 오디오 blob을 서버에 업로드합니다
 * @params {Blob} audioBlob - 오디오 blob 데이터
 * @params {string} fileType - 'mp3' 또는 'wav'
 * @return {Promise<object>}
 */
function uploadBlob(audioBlob, fileType) {
  const formData = new FormData();
  formData.append('audio_data', audioBlob, 'file');
  formData.append('type', fileType || 'mp3');

  // 오디오를 업로드하기 위한 서버 엔드포인트:
  const apiUrl = "http://localhost:3000/upload/audio";

  const response = await fetch(apiUrl, {
    method: 'POST',
    cache: 'no-cache',
    body: formData
  });

  return response.json();
}
```

# 전부 함께



위의 모든 함수를 함께 사용하는 빠른 예제:

```js
// 초기화
await connect();

// 사용자가 녹음 버튼을 클릭함
startRecording();

// 사용자가 정지 버튼을 클릭하거나 정의된 시간 초과
const wavAudioBlob = await stopRecording();

// 재미로: 재생
playAudio(wavAudioBlob);

// mp3로 변환
// 참고: mp3는 Chrome 및 Firefox에서만 작동했습니다
// Safari는 이에 대한 호감을 잃어 보였으므로 Safari에는 .wav를 업로드했습니다
const mp3Blob = await convertWavToMp3(wavAudioBlob);

// 서버에 블랍 업로드
const response = await uploadBlob(mp3Blob, 'mp3');
```

try/catch를 사용하고 일부 변수가 null인지 확인하는 것이 좋습니다.

# 파일 저장 — Flask



오디오 파일을 엔드포인트에 POST한 후에는 저장을 원할 것입니다. Python Flask에서 파일을 로컬로 저장하거나 S3 버킷에 저장하는 방법을 보여드릴게요. 다른 언어(NodeJS, PHP 등)에서도 비슷하게 적용할 수 있어요.

```js
def uploadAudio(request):

  # 파라미터 가져오기
  audio_file = request.files.get('audio_data')
  file_type = request.form.get("type", "mp3")
  
  # 파일명에 UUID 생성하는 것을 고려할 수 있어요
  filename = "myAudioFile." + file_type
  
  # 로컬 디스크에 저장하기
  target_path = ("your/local/dir/%s" % filename)
  audio_file.save(target_path)

  # 또는: AWS S3에 파일 저장하기
  session = boto3.Session(""" API 인증 정보 """)
  s3 = session.resource('s3')
  bucket = s3.Bucket("your-bucket-name")
  destination_dir = "audiofiles/"
  response = bucket.upload_fileobj(audio_file, destination_dir, ExtraArgs={
    "ContentType": "audio/" + file_type
  })
```

버그를 발견하거나 개선 제안이 있다면 댓글로 알려주세요!