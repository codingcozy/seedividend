---
title: "GitHub Actions를 통한 간단한 모델 재학습 자동화"
description: ""
coverImage: "/assets/img/2024-06-19-SimpleModelRetrainingAutomationviaGitHubActions_0.png"
date: 2024-06-19 23:41
ogImage: 
  url: /assets/img/2024-06-19-SimpleModelRetrainingAutomationviaGitHubActions_0.png
tag: Tech
originalTitle: "Simple Model Retraining Automation via GitHub Actions"
link: "https://medium.com/towards-data-science/simple-model-retraining-automation-via-github-actions-b0f61d5c869c"
isUpdated: true
---





![이미지](/assets/img/2024-06-19-SimpleModelRetrainingAutomationviaGitHubActions_0.png)

비즈니스에 엄청난 가치를 창출할 수 있는 것은 기계 학습 모델입니다. 그러나 이를 개발하는 것은 일회성 활동이 아닙니다. 대신 모델이 계속 가치를 제공할 수 있도록 지속적인 프로세스여야 합니다. 이것이 MLOps가 나오게 된 이유입니다.

CI/CD 원칙과 기계 학습 개발을 결합한 것을 MLOps라고 합니다. 이를 통해 모델이 지속적인 가치를 제공할 수 있도록 합니다.

기계 학습 모델이 지속적인 이점을 제공하는 한 가지 방법은 필요할 때 재학습하는 것입니다. 예를 들어, 데이터 드리프트가 감지될 경우 모델을 재학습하는 것입니다. 모델 재학습 자동화를 위해 재학습 트리거의 환경을 설정하여 수행할 수 있습니다.


<div class="content-ad"></div>

GitHub Actions는 GitHub에서 제공하는 기능으로, CI/CD 플랫폼에 사용되며 GitHub 저장소에서 소프트웨어 개발 프로세스를 자동화하는 데 사용됩니다.

이 기사에서는 GitHub Actions를 사용하여 모델 재학습을 자동화하는 방법을 가르쳐 드립니다. 그 방법을 알아볼까요?

# 준비

이 프로젝트에서는 모델 개발 및 자동화 데모를 수행할 것입니다. 전체 프로젝트 구조는 아래 차트와 같을 것입니다.

<div class="content-ad"></div>

![이미지](/assets/img/2024-06-19-SimpleModelRetrainingAutomationviaGitHubActions_1.png)

일단 GitHub Actions을 이 리포지토리에서 사용할 수 있도록 GitHub 리포지토리를 준비하는 것부터 시작해봅시다. 선호하는 이름으로 빈 리포지토리를 만들 수 있습니다. 저는 이 리포지토리를 만들었어요.

추가로, Docker를 사용하여 모델을 배포하는 것을 시뮬레이션해볼 거예요. 이를 위해 Docker Desktop을 설치해봅시다. 그리고 Dockerhub에 가입하지 않은 경우에는 가입하세요.

그런 다음, Repo 및 Workflow 범위를 지닌 GitHub 개인 액세스 토큰(PAT)을 생성해봅시다. 토큰을 어딘가에 보관하고, 방금 만든 빈 리포지토리로 돌아가봅시다. 설정으로 이동하여 "비밀 값 및 변수"를 선택합니다. 그런 다음, PAT, Docker 사용자 이름 및 Docker 비밀번호를 포함하는 리포지토리 비밀값을 생성하세요.

<div class="content-ad"></div>


![이미지](/assets/img/2024-06-19-SimpleModelRetrainingAutomationviaGitHubActions_2.png)

GitHub 저장소를 로컬 또는 작업하는 플랫폼에 복제하세요. 준비가 되었으면 튜토리얼 전체 구조를 준비해 봅시다. 좋아하는 IDE에서 다음과 같이 폴더를 생성하세요.

```js
diabetes-project/
├── data/
├── notebooks/
├── scripts/
├── models/
├── .github/
│   └── workflows/
``` 

폴더가 갖춰지면 가상 환경을 설정합니다. 고립된 환경을 원하기 때문에 이는 좋은 관행입니다. 루트 폴더로 이동하여 다음 CLI 코드를 사용하세요.


<div class="content-ad"></div>

```js
python -m venv your_environment_name
```

가상 환경을 활성화하려면 아래 코드를 실행하세요.

```js
your_environment_name\Scripts\activate
```

가상 환경을 활성화한 후, 튜토리얼을 위해 필요한 모든 패키지를 설치할 것입니다. 루트 폴더에 requirements.txt 파일을 생성하고 아래 패키지를 채워넣어주세요.

<div class="content-ad"></div>

```js
fastapi
uvicorn
pandas
scikit-learn
matplotlib
seaborn
evidently
```

요구 사항이 준비되면 가상 환경에 패키지를 설치할 것입니다.

```js
pip install -r requirements.txt
```

모든 준비가 완료되었으므로, 이제 모델을 개발하고 모델 재학습 자동화를 시작할 수 있습니다.

<div class="content-ad"></div>

# 모델 개발

이 튜토리얼에서는 공개 도메인 데이터 세트인 Open-Source Diabetes 데이터 세트를 사용할 것입니다. 데이터 세트를 다운로드하여 Data 폴더에 넣어주세요. 저는 데이터 세트를 data.csv로 이름을 변경했지만, 원하시는 이름으로 변경하셔도 됩니다.

우리는 주피터 노트북에서 초기 모델 개발을 진행할 것입니다. 노트북을 만들어서 notebooks 폴더에 넣으세요. 그런 다음, 데이터 세트를 읽어오는 것부터 시작해보겠습니다.

```python
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

data_path = '..//data//data.csv'

df = pd.read_csv(data_path)
```

<div class="content-ad"></div>

이 기사에서는 GitHub Actions 능력을 자동으로 재교육하는 데 초점을 맞추기로 했어요. 데이터 탐색 이외의 것에 초점을 맞출 거예요. 노트북에서 데이터 탐색 부분을 포함했으니, 확인하고 싶다면 방문해주세요.

이제 데이터 전처리와 파이프라인 시작으로 넘어갈게요. 데이터 파이프라인을 사용하여 표준 개발 프로세스를 모방할 거예요.

```python
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler

X = df.drop('Outcome', axis=1)
y = df['Outcome']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

numeric_features = X.columns
numeric_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='mean')),
    ('scaler', StandardScaler())
])

preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numeric_features)
    ])
```

파이프라인이 준비되면 머신 러닝 모델로 랜덤 포레스트 알고리즘을 사용할 거예요. 다른 목적에 맞는 다른 모델을 선택할 수도 있어요.

<div class="content-ad"></div>

```js
from sklearn.ensemble import RandomForestClassifier

pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', RandomForestClassifier(random_state=42))
])

pipeline.fit(X_train, y_train)
```

모델을 평가하고 성능을 확인해봐요.

```js
from sklearn.metrics import classification_report

y_pred = pipeline.predict(X_test)

# 모델 평가
report = classification_report(y_test, y_pred)
print(report)
```

<img src="/assets/img/2024-06-19-SimpleModelRetrainingAutomationviaGitHubActions_3.png" />

<div class="content-ad"></div>

전반적으로 성능은 만족스러운 수준입니다. 더 나아질 여지는 있지만, 현재 모델을 유지하고 이를 모델 폴더에 저장하겠습니다.

```js
import pickle

with open('..//models//pipeline.pkl', 'wb') as f:
    pickle.dump(pipeline, f)
```

모델이 완성되면 우리는 프로덕션 환경에 배포할 것입니다. 이를 API로 배포하고 모델을 컨테이너화하기 위해 Docker를 사용할 것입니다.

모델을 API로 배포하기 위해 app.py라는 파일을 생성하여 스크립트 폴더에 저장해 봅시다. 파일 내부에 다음 코드를 사용하여 모델을 API로 만들 수 있습니다.

<div class="content-ad"></div>

```js
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pickle
import pandas as pd

app = FastAPI()

columns = ['임신횟수', '글루코스', '혈압', 
'피하지방', '인슐린', 'BMI', '당뇨위계보이지DNA', '나이']

dict_res = {0: '당뇨가 아님', 1: '당뇨'}

pipeline_path = 'models/pipeline.pkl'
with open(pipeline_path, 'rb') as pipeline_file:
    pipeline = pickle.load(pipeline_file)

class DataInput(BaseModel):
    data: list

@app.post("/predict")
async def predict(input_data: DataInput):
    try:
        df = pd.DataFrame(input_data.data, columns=columns)
        predictions = pipeline.predict(df)
        results = [dict_res[pred] for pred in predictions]
    
        return {"예측결과": results}
    
    except Exception as e:
        print("에러:", str(e))
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

모델 API에 액세스할 수 있는지 테스트해 봅시다. 먼저, 응용 프로그램을 시작하려면 CLI에서 다음 코드를 실행합니다.

```js
uvicorn scripts.app:app --host 0.0.0.0 --port 8000
```

그런 다음, Jupyter Notebook에서 다음 코드를 실행하여 API를 테스트합니다.

<div class="content-ad"></div>

```js
import requests

url = "http://localhost:8000/predict"

data = {
    "data": [
        [1, 85, 66, 29, 0, 26.6, 0.351, 31]
    ]
}

response = requests.post(url, json=data)
print(response.json())
```

API에 전달하는 데이터의 위치가 훈련 데이터와 동일한지 확인해주세요. API가 잘 작동하면 Docker 이미지를 빌드하고 허브에 푸시할 것입니다.

먼저 루트 폴더에 dockerfile을 생성해주세요. 해당 파일에 다음 코드를 채워넣어주세요.

```js
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY scripts/app.py app.py
COPY models models

EXPOSE 8000

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
```

<div class="content-ad"></div>

위 코드에서는 Python 환경을 설정하고 API를 실행하는 데 필요한 파일을 컨테이너로 복사하여 포트 8000에서 수신 대기하는 방법을 안내합니다.

Dockerfile로 이미지를 빌드하는 방법은 준비가 되면 다음 코드를 사용하면 됩니다.

```js
docker build -t username/image_name -f Dockerfile .
docker login -u username
docker push username/image_name:latest
```

위 코드에서 username을 귀하의 Dockerhub 사용자명으로, image_name을 선호하는 응용 프로그램 이름으로 변경해주세요. 성공한다면, 내 것과 같이 Dockerhub에 귀하의 이미지가 표시될 것입니다.

<div class="content-ad"></div>

그래서 우리가 모델 API를 Docker에 넣고 Dockerhub에 푸시한 이유는 무엇인가요? 이것은 응용 프로그램을 실행할 모든 환경에서 일관성을 보장하기 때문입니다.

또한 GitHub Actions가 다음 섹션에서 모델을 다시 학습하고 다시 이 컨테이너로 푸시하는 데 얼마나 강력한지를 보여줍니다. 따라서 우리는 모델을 배포하기 위해 이미지를 가져오기만 하면 됩니다.

아래 코드를 실행하여 Dockerhub에서 이미지를 가져와 로컬 환경에서 실행해보세요.

```js
docker login -u username
docker pull username/image_name:latest
docker run -d -p 8000:8000 username/image_name:latest
```

<div class="content-ad"></div>

지금까지 제품 모델이 운영 중입니다. 다음 부분에서는 GitHub Actions를 사용하여 모델을 특정 트리거로 다시 학습하는 방법을 살펴보겠습니다.

# GitHub Actions를 활용한 모델 재학습

제가 언급했듯이, 머신 러닝 모델은 지속적인 프로젝트입니다. 이를 통해 어떤 가치를 제공하려면 중요한데, 왜냐하면 모델이 항상 동일한 품질을 유지할 것으로 기대하기 어렵기 때문입니다. 특히, 드리프트가 발생하면 더욱 그렇습니다.

이 튜토리얼에서는 운영 데이터셋에서 데이터 드리프트가 감지될 때 자동으로 모델 재학습을 수행하는 방법을 배우겠습니다. 먼저, 데이터셋에서 드리프트를 감지하는 방법을 살펴보겠습니다.

<div class="content-ad"></div>

아래 코드를 사용하여 데이터셋에서 drift를 시뮬레이션해 보겠습니다.

```js
import numpy as np

def introduce_drift(data, drift_features, drift_amount=0.1, random_seed=42):
    np.random.seed(random_seed)
    drifted_data = data.copy()
    
    for feature in drift_features:
        if feature in data.columns:
            drifted_data[feature] += np.random.normal(loc=0, scale=drift_amount, size=data.shape[0])
    
    return drifted_data
    
features_to_drift = ['Glucose', 'BloodPressure', 'SkinThickness', 'Pregnancies']

drifted_data = introduce_drift(X_test, features_to_drift, drift_amount=50)
drifted_data = drifted_data.reset_index(drop=True)
```

위 코드에서는 Test 데이터의 일부 열을 drift했습니다. drift_amount를 조절하여 데이터가 얼마나 변하는지 제어할 수 있습니다.

튜토리얼에는 학습 데이터(참조)와 drift 데이터(신규)가 필요합니다. 나중에 다시 학습할 때 사용할 타겟 열도 저장해두는 것이 좋습니다.

<div class="content-ad"></div>


reference_data['Outcome'] = y_train.reset_index(drop=True)
drifted_data['Outcome'] = y_test.reset_index(drop=True)

drifted_data.to_csv('..//data//new_data.csv', index=False)
reference_data.to_csv('..//data//reference_data.csv', index=False)


Evidently(제가 Evidently와 어떤 제휴도 없습니다)를 사용하여 제품 데이터가 참조 데이터에 비해 드리프트했는지 확인할 수 있습니다. 다음 코드로 확인할 수 있습니다.

```js
from evidently.metric_preset import DataDriftPreset
from evidently.report import Report

data_drift_report = Report(metrics=[DataDriftPreset()])

data_drift_report.run(current_data=drifted_data.drop('Outcome', axis=1), 
reference_data=reference_data.drop('Outcome', axis=1), column_mapping=None)
report_json = data_drift_report.as_dict()
drift_detected = report_json['metrics'][0]['result']['dataset_drift']
```

![이미지](/assets/img/2024-06-19-SimpleModelRetrainingAutomationviaGitHubActions_4.png)


<div class="content-ad"></div>

결과에는 나중에 재훈련 자동화를 위해 사용할 드리프트 데이터 세트가 나타납니다.

드리프트 감지를 시뮬레이션하기 위해 drift_detection.py라는 파일을 만들어서 스크립트 폴더에 저장해보겠습니다. 아래 코드를 파일에 채워 넣어주세요.

```js
import pandas as pd
from evidently.metric_preset import DataDriftPreset
from evidently.report import Report

reference_data = pd.read_csv('data/reference_data.csv')
new_data = pd.read_csv('data/new_data.csv')

data_drift_report = Report(metrics=[
    DataDriftPreset()
])

data_drift_report.run(reference_data=reference_data.drop('Outcome', axis=1), 
                      current_data=new_data.drop('Outcome', axis=1), column_mapping=None)

report_json = data_drift_report.as_dict()
drift_detected = report_json['metrics'][0]['result']['dataset_drift']

if drift_detected:
    print("데이터 드리프트가 감지되었습니다. 모델을 재훈련합니다.")
    with open('drift_detected.txt', 'w') as f:
        f.write('drift_detected')
else:
    print("데이터 드리프트를 감지하지 못했습니다.")
    with open('drift_detected.txt', 'w') as f:
        f.write('no_drift')
```

위 코드에서 우리는 드리프트 감지 여부를 drift_detected.txt 파일에 저장하고, 드리프트가 감지되었는지 여부에 따라 정보를 출력합니다. 드리프트가 감지된 경우, 모델을 재훈련하고 싶습니다. 이에 대비하여 훈련 스크립트를 준비해야 합니다.

<div class="content-ad"></div>

스크립트 폴더에 train_model.py라는 파일을 만들고 다음 코드로 채워주세요.

```python
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
import pickle

reference_data = pd.read_csv('data/reference_data.csv')
new_data = pd.read_csv('data/new_data.csv')

df= pd.concat([reference_data, new_data], ignore_index=True)

X = df.drop('Outcome', axis=1)
y = df['Outcome']

numeric_features = X.columns
numeric_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='mean')),
    ('scaler', StandardScaler())
])

preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numeric_features)
    ])

pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', RandomForestClassifier(random_state=42))
])

pipeline.fit(X, y)

with open('models/pipeline.pkl', 'wb') as f:
    pickle.dump(pipeline, f)
```

위의 코드는 학습 및 드리프트 데이터를 새로운 학습 모델로 결합하고, 이를 사용하여 새 모델을 학습하는 것입니다. 이는 간단한 접근 방식일 뿐이며, 실제 세계의 학습 데이터는 더 많은 준비가 필요하고, 새 모델은 적절한 평가가 필요합니다.

그러나 모든 스크립트가 준비되면, GitHub Actions를 통해 드리프트가 감지될 때 모델을 재학습할 수 있도록 준비할 것입니다. 재학습에 필요한 모든 구성을 포함하는 YAML 파일을 준비해야 합니다.

<div class="content-ad"></div>

그래서, .github\workflows 폴더에 mlops_pipeline.yml 파일을 생성해봅시다. 폴더 이름이 제대로 되었는지 확인하세요; GitHub Actions은 적절한 이름이 필요합니다. 아래의 코드로 mlops_pipeline.yml을 채워넣어주세요.

```js
name: Diabetes Retraining Pipeline with Data Drift Detection

on:
  push:
    paths:
      - 'data/new_data.csv'
permissions:
  contents: write
jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Set up Python
      uses: actions/setup-python@v2 
      with:
        python-version: 3.9

    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt

    - name: Run data drift detection
      run: |
        python scripts/drift_detection.py
      continue-on-error: true 

    - name: Check for data drift
      id: check_drift
      run: |
        if grep -q 'drift_detected' drift_detected.txt; then
          echo "Data drift detected."
          echo "drift=true" >> $GITHUB_ENV
        else
          echo "No data drift detected."
          echo "drift=false" >> $GITHUB_ENV
        fi
      shell: bash

    - name: Model Retraining if Data Drift detected
      if: env.drift == 'true'
      run: |
        python scripts/train_model.py

    - name: Commit and push updated model
      if: env.drift == 'true'
      env:
        GIT_COMMITTER_NAME: github-actions
        GIT_COMMITTER_EMAIL: github-actions@github.com
      run: |
        git config --global user.name "github-actions"
        git config --global user.email "github-actions@github.com"
        git remote set-url origin https://x-access-token:${ secrets.ACTIONS_PAT }@github.com/username/image_name.git
        git add models/pipeline.pkl
        git commit -m "Update model after retraining on $(date -u +'%Y-%m-%d %H:%M:%S UTC')"
        git push

    - name: Build Docker image
      if: env.drift == 'true'
      run: |
        docker build -t username/image_name -f dockerfile .

    - name: Log in to Docker Hub
      if: env.drift == 'true'
      run: echo "${ secrets.DOCKER_PASSWORD }" | docker login -u "${ secrets.DOCKER_USERNAME }" --password-stdin

    - name: Push Docker image to Docker Hub
      if: env.drift == 'true'
      run: |
        docker push username/image_name:latest

    - name: Notify about the process
      run: |
        if [[ "$GITHUB_ENV" == *"drift=false"* ]]; then
          echo "No data drift detected. No retraining necessary."
        else
          echo "Data drift detected. Model retrained and deployed."
        fi
      shell: bash
```

위의 YAML에서 수행한 전체 설정 구조는 아래 이미지에 나와 있습니다.

![Simple Model Retraining Automation via GitHub Actions](/assets/img/2024-06-19-SimpleModelRetrainingAutomationviaGitHubActions_5.png)


<div class="content-ad"></div>

GitHub Actions에서 사용하는 트리거는 data 폴더 안에 new_data.csv 파일이 푸시될 때입니다. 그러나 모델 재학습은 drift가 감지될 때만 실행됩니다. 모델을 다시 훈련한 후, 해당 모델을 GitHub 저장소와 Docker Hub에 다시 푸시할 것입니다.

사용자명/image_name Docker 식별자를 꼭 자신의 것으로 변경해주세요. 동일한 식별자를 사용하는 경우 Repository Secrets를 생성할 수도 있습니다.

모든 파일이 준비되면 GitHub 저장소에 푸시해야 합니다. 그런 다음 새로운 drift 데이터를 생성하여 new_data.csv로 저장하고, 해당 데이터를 저장소에 다시 푸시해보세요.

GitHub 저장소의 Actions 탭으로 이동해주세요. 성공적으로 실행되었다면, 'Success' 상태를 가진 'build'라는 작업이 하나 표시될 것입니다.

<div class="content-ad"></div>

![image](/assets/img/2024-06-19-SimpleModelRetrainingAutomationviaGitHubActions_6.png)

작업을 클릭하여 프로세스의 모든 세부 정보를 확인할 수 있습니다. 각 단계의 정보를 확인하여 프로세스를 이해하거나 실행에 실패했는지 확인할 수 있습니다.

![image](/assets/img/2024-06-19-SimpleModelRetrainingAutomationviaGitHubActions_7.png)

저장소의 모델로 이동하면 모델이 업데이트되었는지 확인할 수 있습니다. 모델을 다시 학습했을 때 커밋 메시지를 사용하여 알림을 받습니다.

<div class="content-ad"></div>

![image](/assets/img/2024-06-19-SimpleModelRetrainingAutomationviaGitHubActions_8.png)

도커 허브 저장소를 확인해서 이미지가 업데이트되었는지도 확인할 수 있어요.

여기까지면 GitHub Actions를 사용해서 모델 재교육 프로세스를 간단히 할 수 있어요. 여러분이 원하는대로 스크립트를 조정할 수 있어요. 예를 들어 트리거, 재교육 조건, 데이터셋 등을 말이에요.

이 글에서 사용한 코드들이 필요하면, 해당 레포지토리에 푸시해 놓았어요.

<div class="content-ad"></div>

# 결론

이 글에서는 GitHub Actions를 사용하여 모델 재학습 프로세스를 자동화하는 방법을 배웠습니다. YAML 파일을 통해 구성을 설정하고 트리거를 결정함으로써 GitHub Actions를 사용하여 필요한 모든 프로세스를 간편하게 처리할 수 있습니다.