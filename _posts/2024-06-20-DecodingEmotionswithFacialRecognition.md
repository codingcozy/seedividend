---
title: "얼굴 인식을 통해 감정 해독하기"
description: ""
coverImage: "/assets/img/2024-06-20-DecodingEmotionswithFacialRecognition_0.png"
date: 2024-06-20 05:00
ogImage: 
  url: /assets/img/2024-06-20-DecodingEmotionswithFacialRecognition_0.png
tag: Tech
originalTitle: "Decoding Emotions with Facial Recognition"
link: "https://medium.com/@vedantbedi_47271/decoding-emotions-with-facial-recognition-db92ce89af52"
---


<img src="/assets/img/2024-06-20-DecodingEmotionswithFacialRecognition_0.png" />

인간의 감정을 얼굴 표현을 통해 이해하는 것은 우리에게 자연스러운 기술이지만, 컴퓨터에게 같은 기술을 가르치는 것은 어렵게 느껴질 수 있습니다. 다행히도, 적절한 도구와 조금의 코딩을 통해 이를 실현할 수 있습니다. 이 글에서는 Python을 사용하여 감정 감지를 위한 얼굴 표현 인식을 구현하는 두 가지 방법을 탐구해 보겠습니다: DeepFace를 사용하는 방법과 Keras를 활용한 합성곱 신경망(CNN)을 사용하는 방법

# 1.) Deepface 사용

Deepface는 파이썬용 경량 얼굴 인식 및 얼굴 속성 분석(나이, 성별, 감정 및 인종) 프레임워크입니다. DeepFace를 몇 줄의 코드로 실행할 수 있지만, 그 뒤의 모든 과정에 대해 깊이 있는 지식을 습득할 필요가 없습니다. 사실, 라이브러리를 가져오고 정확한 이미지 경로를 입력으로 전달하기만 하면 됩니다; 그게 전부입니다!

<div class="content-ad"></div>

1.) .py 파일로 필요한 모듈 가져오기

```js
from deepface import DeepFace
import cv2
```

2.) 얼굴 캐스케이드 분류기 로드

이 명령은 전면 얼굴 검출 모델과 함께 CascadeClassifier 객체를 초기화합니다. 그 결과인 face_cascade 객체를 사용하여 이미지에서 얼굴을 감지할 수 있습니다. Haar Cascade는 파이썬의 OpenCV 라이브러리를 사용하여 쉽게 구현할 수 있는 얼굴 검출을 위한 인기 있는 알고리즘입니다.

<div class="content-ad"></div>

```js
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
```

3.) 비디오 스트림을 시작하고 분류기를 실행합니다.

0은 기본 카메라를 나타냅니다. 외부 웹캠을 연결한 경우 1을 입력하세요.

```js
cap = cv2.VideoCapture(0)

while True:
    # 성공 또는 실패 여부를 나타내는 부울 값인 ret 및 캡쳐된 프레임인 frame을 캡쳐합니다.
    ret, frame = cap.read()

    # 프레임을 그레이스케일로 변환합니다.
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # 그레이스케일 프레임을 RGB 형식으로 변환합니다.
    rgb_frame = cv2.cvtColor(gray_frame, cv2.COLOR_GRAY2RGB)

    # 프레임에 얼굴을 감지합니다.
    faces = face_cascade.detectMultiScale(gray_frame, scaleFactor=1.1, minNeighbors=10, minSize=(30, 30))

    for (x, y, w, h) in faces:
        # RGB 프레임에서 y에서 y+h, x에서 x+w까지의 영역에서 얼굴 ROI(관심 영역)를 추출합니다.
        face_roi = rgb_frame[y:y + h, x:x + w]

        # DeepFace를 사용하여 얼굴 ROI에서 감정 분석을 수행합니다.
        result = DeepFace.analyze(face_roi, actions=['emotion'], enforce_detection=False)

        # 주요 감정을 결정합니다.
        emotion = result[0]['dominant_emotion']

        # 얼굴 주위에 직사각형을 그리고 예측된 감정과 함께 레이블을 붙입니다.
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 255), 2)
        cv2.putText(frame, emotion, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)

    # 결과 프레임을 표시합니다.
    cv2.imshow('실시간 감정 감지', frame)

    # 종료하려면 'q'를 누르세요.
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# 캡처를 해제하고 모든 창을 닫습니다.
cap.release()
cv2.destroyAllWindows()
```

<div class="content-ad"></div>

다음 링크에서 haarcascade 파일을 다운로드할 수 있어요 — https://github.com/opencv/opencv/blob/4.x/data/haarcascades/haarcascade_frontalface_default.xml

카스케이드 분류기에 대해 더 읽어보고 싶다면 -https://docs.opencv.org/3.4/db/d28/tutorial_cascade_classifier.html

.py 파일과 haarcascade_frontalface_default.xml 파일을 동일한 폴더에 넣고 .py 파일을 실행해주세요. 모두 잘 작동되면, 카메라 스트림이 보이는 외부 창에 감정이 표시될 거예요!

# 2.) Keras를 이용한 합성곱 신경망

<div class="content-ad"></div>

합성곱 신경망(Convolutional Neural Networks)은 이미지 처리에 사용되는 피드 포워드 네트워크의 일종입니다. 이러한 네트워크는 일반적인 완전 연결 레이어에 추가적인 합성곱(Convolutional) 및 풀링(Pooling) 레이어를 특징으로 합니다. 주로 그리드(grid) 형식의 데이터(이미지, 비디오)와 함께 작동합니다.

- https://www.kaggle.com/datasets/msambare/fer2013 에서 FER-2013 데이터셋을 다운로드하세요. 훈련 및 테스트 디렉토리를 'data'라는 공통 폴더 아래에 넣으세요.
- .py 파일에 필요한 모듈을 가져오세요

```python
import tensorflow as tf
from tensorflow import keras
from keras import models, layers
from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D, Dense, Dropout, Flatten
import os
```

3. 동일한 파일에서 모델을 구축하고 훈련시키세요.

<div class="content-ad"></div>

```js
train_data_dir='data/train/'
validation_data_dir='data/test/'

train_datagen = tf.keras.preprocessing.image.ImageDataGenerator(
    rescale=1./255,
    rotation_range=30,
    shear_range=0.3,
    zoom_range=0.3,
    horizontal_flip=True,
    fill_mode= 'nearest')
validation_datagen = tf.keras.preprocessing.image.ImageDataGenerator(rescale=1./255)


train_generator = train_datagen.flow_from_directory(
    train_data_dir,
    color_mode='grayscale',
    target_size=(48, 48),
    batch_size=32,
    class_mode='categorical' ,
    shuffle=True)

validation_generator = validation_datagen.flow_from_directory(
    validation_data_dir,
    color_mode='grayscale',
    target_size=(48, 48),
    batch_size=32,
    class_mode='categorical',
    shuffle=True)

class_labels=['Angry', 'Disgust', 'Fear', 'Happy', 'Neutral', 'Sad', 'Surprise']
img, label = train_generator.__next__()


model = Sequential()

model.add(Conv2D(32, kernel_size=(3, 3), activation='relu', input_shape=(48,48,1)))
model.add(Conv2D(64, kernel_size=(3, 3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout (0.1))
model.add (Conv2D(128, kernel_size=(3, 3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add (Dropout(0.1))
model. add (Conv2D(256, kernel_size=(3, 3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model. add(Dropout(0.1))
model.add(Flatten())
model.add(Dense(512, activation='relu'))
model.add(Dropout (0.2))
model. add(Dense(7, activation='softmax'))

model.compile(optimizer = 'adam', loss='categorical_crossentropy', metrics=['accuracy'])
print(model.summary())

train_path = "data/train"
test_path = "data/test"
num_train_imgs = 0
for root, dirs, files in os.walk(train_path):
    num_train_imgs += len(files)
num_test_imgs = 0
for root, dirs, files in os.walk(test_path):
    num_test_imgs += len(files)

print("Number of training images: ", num_train_imgs)
print("Number of testing images: ", num_test_imgs)

model.fit(train_generator, steps_per_epoch=num_train_imgs//32, epochs=50, validation_data=validation_generator, validation_steps=num_test_imgs//32)

model.save('model.h5')  
```

모델.h5 파일이 현재 디렉토리에 저장됩니다.

4. 테스트

```js
import cv2
import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt

model=tf.keras.models.load_model('model.h5')

faceDetect=cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

video=cv2.VideoCapture(0)

labels_dict={0:'Angry',1:'Disgust', 2:'Fear', 3:'Happy',4:'Neutral',5:'Sad',6:'Surprise'}

while True:
    ret,frame=video.read()
    gray=cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces= faceDetect.detectMultiScale(gray, 1.3, 3)
    for x,y,w,h in faces:
        sub_face_img=gray[y:y+h, x:x+w]
        resized=cv2.resize(sub_face_img,(48,48))
        normalize=resized/255.0
        reshaped=np.reshape(normalize, (1, 48, 48, 1))
        result=model.predict(reshaped)
        label=np.argmax(result, axis=1)[0]
        print(label)
        cv2.rectangle(frame, (x,y), (x+w, y+h), (0,0,255), 1)
        cv2.rectangle(frame,(x,y),(x+w,y+h),(50,50,255),2)
        cv2.rectangle(frame,(x,y-40),(x+w,y),(50,50,255),-1)
        cv2.putText(frame, labels_dict[label], (x, y-10),cv2.FONT_HERSHEY_SIMPLEX,0.8,(255,255,255),2)
        
    cv2.imshow("실시간 감정 인식",frame)
    k=cv2.waitKey(1)
    if k==ord('q'):
        break

video.release()
cv2.destroyAllWindows()
```

<div class="content-ad"></div>

해당 파이썬 스크립트를 실행해보세요. 코드가 동작할 것을 기대합니다!

# 개선 사항

이 코드에 주의를 집중시키기 위해 Spatial Transformer의 추가를 활용할 수도 있습니다. 해당 내용은 논문에 언급되어 있습니다.

Deep-Emotion: Facial Expression Recognition Using Attentional Convolutional Network- Shervin Minaee, Amirali Abdolrashidi, Expedia Group
University of California, Riverside