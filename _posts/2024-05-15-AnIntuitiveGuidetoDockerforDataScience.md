---
title: "데이터 과학을 위한 도커의 직관적인 안내"
description: ""
coverImage: "/assets/img/2024-05-15-AnIntuitiveGuidetoDockerforDataScience_0.png"
date: 2024-05-15 02:49
ogImage:
  url: /assets/img/2024-05-15-AnIntuitiveGuidetoDockerforDataScience_0.png
tag: Tech
originalTitle: "An Intuitive Guide to Docker for Data Science"
link: "https://medium.com/towards-data-science/an-intuitive-guide-to-docker-for-data-science-ba3f94e9052c"
---

![An Intuitive Guide to Docker for Data Science](/assets/img/2024-05-15-AnIntuitiveGuidetoDockerforDataScience_0.png)

데이터 과학자로 일할 때, 모든 운영 체제에서 실행되고 필요한 종속성이 모두 갖춰진 코드를 작성하고 클라우드에 배포할 수 있어야 합니다. 노력에도 불구하고 작동하지 않을 수 있고 문제가 무엇인지 이해하는 데 시간을 낭비할 수도 있습니다.

이 고통을 피하기 위해 어떤 도구를 사용할 수 있을까요? Docker가 여러분의 문제를 해결해 줄 것입니다. Docker를 사용하면 데이터 과학 프로젝트를 위한 견고한 환경을 손쉽게 얻을 수 있습니다. 미치도록 미쳐버리지 않고요.

이 글에서는 Docker의 주요 개념, 가장 일반적인 명령어, 그리고 Docker화된 머신러닝 애플리케이션의 빠른 예제에 대해 설명하겠습니다. 시작해 봅시다!

목차:

- Docker란 무엇인가?
- Docker의 기본 개념
- 가상 머신 대 컨테이너
- Docker 설정
- ML 애플리케이션 도커화
- Docker 명령어 요약
- Docker의 한계

## Docker란 무엇인가?

Docker는 매우 인기 있는 가상화 기술로, 개발자가 몇 분 내에 머신러닝 애플리케이션을 신속하게 개발, 실행 및 배포할 수 있도록 합니다.

표 태그를 Markdown 형식으로 변경할 수 있습니다.

Containers를 통해 응용 프로그램을 빠르고 일관된 방식으로 실행할 수 있는 격리된 환경을 포함할 수 있습니다.

이 플랫폼을 사용하면 인프라와 응용 프로그램을 동시에 관리할 수 있습니다. 또한 코드를 작성하고 배포하는 시간을 줄일 수 있습니다.

## Docker의 기본 개념

![Docker 이미지](/assets/img/2024-05-15-AnIntuitiveGuidetoDockerforDataScience_1.png)

더 진행하기 전에, Docker와 관련된 세 가지 개념을 잘 알고 가는 것이 중요합니다:

- Docker File에는 Docker Image를 빌드하는 데 사용되는 지시 사항이 포함되어 있습니다. 운영 체제를 정의하거나 애플리케이션의 종속성을 지정하는 등의 작업이 이루어집니다.
- Docker Image는 Docker File에서 시작하여 빌드할 때 만들어집니다.
- Docker Container는 Docker Image를 실행한 후에 얻어집니다. 어디에서든 실행할 수 있는 격리된 독립 환경입니다.

위 그림을 살펴보면 개념을 더 잘 이해할 수 있습니다. Docker File은 케이크 레시피와 유사한 개념이며, 우리가 관심을 갖는 대상의 재료가 정의되어 있습니다. Docker Image는 반죽이고 Docker Container는 우리가 원하는 케이크입니다.

## 가상 머신 대 컨테이너

![Docker Image](/assets/img/2024-05-15-AnIntuitiveGuidetoDockerforDataScience_2.png)

가상 머신과 컨테이너는 물리적 인프라 내에서 여러 격리된 환경을 실행할 수 있게 해주는 가상화 기술입니다. 둘 다 리소스와 비용을 최적화하기 위해 고안되었지만, 중요한 차이점이 있습니다.

가상 머신 내에는 각각 다른 게스트 운영 체제가 실행됩니다. 그에 비해 컨테이너는 호스트 운영 체제를 공유하여 가상 머신보다 적은 리소스를 사용합니다.

컨테이너는 애플리케이션과 해당 의존성만 캡슐화하기 때문에 매우 휴대성이 뛰어나며 배포 프로세스를 더 쉽고 빠르게 만들어줍니다.

## Docker 설정하기

![Docker Desktop](/assets/img/2024-05-15-AnIntuitiveGuidetoDockerforDataScience_3.png)

Docker Desktop은 컨테이너화된 응용 프로그램을 빌드하고 공유하며 실행하는 데 필요한 응용 프로그램입니다. Linux, Windows 또는 Mac에 설치할 수 있습니다.

Docker Hub에 이미지를 만들고 푸시하려면 Docker Hub에 계정을 만들어야 합니다. Docker Hub는 Docker 이미지를 찾고 공유할 수 있는 중앙 저장소입니다.

## ML 애플리케이션 도커화하기

도커의 개념을 익히셨다면, 이제 머신 러닝 애플리케이션을 도커화하는 예제를 보여드릴 시간입니다. 튜토리얼을 쉽게 따라가기 위해 Visual Studio Code를 코드 편집기로 사용하는 것을 권장합니다.

이 미니 프로젝트에서는 캐글(Kaggle)의 Tours and Travels Churn Prediction 데이터셋을 사용할 것입니다. 따라서 여행 회사의 고객이 연령, 연간 서비스 등 여러 변수를 기반으로 이탈할지 여부를 예측하는 작업을 진행하겠습니다.

튜토리얼을 더 잘 따라가기 위해 GitHub 저장소를 확인해보세요.

고객 이탈 예측 데이터셋을 로드합니다.

```Python
churn_df = pd.read_csv('Customertravel.csv')
X = churn_df.drop(columns=['Target'],axis=1)
y = churn_df['Target']

# 데이터 분할
X_train, X_test, y_train, y_test = train_test_split(X,y,test_size=0.2,random_state=123)
X_train, X_val, y_train, y_val = train_test_split(X_train,y_train,test_size=0.2,random_state=123)
train_data = Pool(data=X_train,label=y_train,cat_features=[1,2,4,5])
val_data = Pool(data=X_val,label=y_val,cat_features=[1,2,4,5])
test_data = Pool(data=X_test,label=y_test,cat_features=[1,2,4,5])

# CatBoost 모델 훈련
model = CatBoostClassifier(n_estimators=500,
                           learning_rate=0.1,
                           depth=4,
                           loss_function='Logloss',
                           random_seed=123,
                           verbose=True)
model.fit(train_data,eval_set=val_data)

# 예측 생성
y_train_pred = model.predict(train_data)
y_val_pred = model.predict(val_data)
y_test_pred = model.predict(test_data)

# 정밀도와 재현율 계산
train_precision_score = precision_score(y_train, y_train_pred)
train_recall_score = recall_score(y_train, y_train_pred)
val_precision_score = precision_score(y_val, y_val_pred)
val_recall_score = recall_score(y_val, y_val_pred)
test_precision_score = precision_score(y_test, y_test_pred)
test_recall_score = recall_score(y_test, y_test_pred)

# 정밀도와 재현율 출력
print(f'Train 정밀도: {train_precision_score}')
print(f'Val 정밀도: {val_precision_score}')
print(f'Test 정밀도: {test_precision_score}')
print(f'Train 재현율: {train_recall_score}')
print(f'Val 재현율: {val_recall_score}')
print(f'Test 재현율: {test_recall_score}')
```

- requirements.txt 파일 생성

저희 애플리케이션을 도커로 쉽게 사용하기 위해 모든 파이썬 의존성이 포함된 requirements.txt 파일이 필요합니다.

라이브러리 pigar을 설치하고 터미널에서 pigar generate 명령을 실행하여 자동으로 생성할 수 있습니다.

다음과 같은 파일을 얻어야 합니다:

catboost==1.2.5
pandas==2.2.2
scikit-learn==1.4.2

2. Create Dockerfile

Along with requirements.txt, let's create a file called Dockerfile. This file consists of instructions for building the Docker Image.

```js
FROM python:3.10

WORKDIR /src

# Copy the requirements file and install dependencies
COPY train_churn_model.py requirements.txt Customertravel.csv /src/
RUN pip install --no-cache-dir -r requirements.txt

# Run the script
CMD ["python","train_churn_model.py"]
```

FROM 명령은 프로젝트에 사용되는 기본 환경을 지정합니다. 이 경우 Python 3.10이었습니다.

작업 디렉토리를 설정하고 requirements.txt, train_churn_model.py 그리고 Customertravel.csv 파일을 복사한 후 requirements.txt 파일을 복사하면 종속성을 설치할 수 있습니다.

마지막으로 CMD 명령을 사용하여 스크립트를 실행하는 명령을 포함할 수 있습니다.

3. 도커 이미지 빌드

파일 requirements.txt와 Dockerfile을 생성했다면, 대부분의 작업이 끝났어요. Docker 이미지를 생성하기 위해서는 빌드 명령어를 사용하기만 하면 돼요:

```js
docker build -t churn-pred-image .
```

"churn-pred-image"라는 이름으로 Docker 이미지를 생성한 후에는 모든 이미지를 확인해 보세요. 우리가 이미지를 성공적으로 만들었는지 확인하는 것이 중요하니까요.

```js
docker images
```

다음은 명령어에서 얻은 이미지 목록입니다:

```js
REPOSITORY         TAG       IMAGE ID       CREATED             SIZE
churn-pred-image   latest    f2d735527110   About an hour ago   1.81GB
```

다른 이미지를 만든 경우 테이블에 더 많은 행이 포함될 것이며, 각각 다른 이미지에 해당합니다.

4. Docker 컨테이너를 빌드하세요.

드디어, Docker 컨테이너를 만들 준비가 되었습니다. 이미지를 빌드했으므로 이제 컨테이너를 실행하기만 하면 됩니다:

```js
docker run -d --name churn-pred-container churn-pred-image
```

--name 태그에서는 Docker 컨테이너의 이름을 지정하고, 뒤에 이전에 빌드한 Docker 이미지의 이름을 적어주면 됩니다.

이전처럼 flag -a를 사용하여 지금까지 생성된 모든 컨테이너를 표시하려면:

```js
도커 ps -a
```

요 출력입니다:

```js
CONTAINER ID   IMAGE              COMMAND                  CREATED             STATUS                      PORTS     NAMES
7865084c8e70   churn-pred-image   "python train_churn_…"   약 한 시간 전        Exited (0) 17 minutes ago             churn-pred-container
```

그게 다야! 머신러닝 애플리케이션을 도커화했어요!

## 도커 명령어 요약

- 도커 이미지를 빌드하려면 docker build -t `내-이미지-이름`을 사용하세요.
- 도커 컨테이너를 빌드하려면 docker run -d --name `내-컨테이너-이름` `내-이미지-이름`을 사용하세요.
- 생성된 이미지 목록을 확인하려면 docker images를 사용하세요.
- 컨테이너 목록을 보려면 docker ps -a를 사용하세요.
- 이미지를 제거하려면 docker rmi `내-이미지-id`를 사용하세요.
- 실행 중인 컨테이너를 중지하려면 docker stop `내-컨테이너-id`를 사용하세요.
- 중지된 컨테이너를 제거하려면 docker rm `내-컨테이너-id`를 사용하세요.

## 도커의 한계

다른 가상화 기술과 마찬가지로 도커에도 일부 제약이 있습니다. 이는 주요 단점으로서 다음과 같습니다:

- 도커 파일을 작성하고 이미지를 빌드하며 컨테이너를 관리하는 방법을 처음 접하는 경우에는 시간이 필요할 수 있어요.
- 컨테이너는 VM보다 가벼우며 더 적은 리소스가 필요하지만, 동일한 운영 체제로 인해 보안 문제가 발생할 수 있어요.
- 도커는 GPU가 필요하지 않은 응용 프로그램을 위해 초기에 설계되었기 때문에 그래픽 사용자 인터페이스가 필요한 사용 사례에서 어려움을 겪을 수 있어요.

## 마무리

이것은 도커를 시작하는 데 도움이 될 수 있는 입문 가이드였어요.

도커는 데이터 과학 프로젝트에 강력한 도구가 될 수 있어요. 특정 사용 사례에 도커가 적합한 선택인지 고려하기 위해서는 장단점을 고려하는 것이 중요해요.

만약 주제를 더 자세히 알아보고 싶다면, 기사 끝에 나열된 자료들을 살펴보세요.

기사가 유용했다면 좋겠습니다. 즐거운 하루 되세요!

면책 조항: 이 데이터셋은 CC0 1.0 Universal (CC0)로 라이센스가 부여되어 있습니다.

유용한 자료:

- 도커 가이드
- 도커파일 참조
- 도커 CLI를 위한 기본 명령어
