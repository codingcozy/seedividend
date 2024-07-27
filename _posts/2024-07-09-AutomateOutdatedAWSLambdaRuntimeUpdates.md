---
title: "구버전 AWS Lambda 런타임 자동 업데이트 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-AutomateOutdatedAWSLambdaRuntimeUpdates_0.png"
date: 2024-07-09 09:20
ogImage:
  url: /assets/img/2024-07-09-AutomateOutdatedAWSLambdaRuntimeUpdates_0.png
tag: Tech
originalTitle: "Automate Outdated AWS Lambda Runtime Updates"
link: "https://medium.com/@akhilesh-mishra/automate-outdated-aws-lambda-runtime-updates-752ec4dc9fd4"
---

## Python for devops v1.2 - 구버전/지원 중단된 런타임을 사용 중인 AWS 람다 함수의 업그레이드를 위한 Python 스크립트 작성하기.

![이미지](/TIL/assets/img/2024-07-09-AutomateOutdatedAWSLambdaRuntimeUpdates_0.png)

저의 블로그 시리즈 Python for DevOps의 두 번째 블로그 포스트입니다. 여기서는 실제 데브옵스 사용 사례를 탐구하면서 Python 스크립트를 작성해봅니다.

Python for devops 첫 번째 부분 - SQS 큐 암호화 자동화

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

# 시나리오

보안 팀으로부터 수백 개의 Lambda 함수가 Python 3.8 및 Node.js 14x와 같은 지원되지 않는 런타임을 실행 중이라는 불만을 받았다고 가정해 봅시다. AWS는 Lambda 함수의 오래된 런타임을 자동으로 업데이트하지 않습니다.

이 모든 Lambda 함수를 수동으로 업데이트하는 것은 고통스러울 수 있습니다. 책임감 있는 Devops 엔지니어로서, 이러한 수동 작업을 피하고 이러한 작업을 자동화하기 위한 재사용 가능한 Python 스크립트를 작성하고 싶어 합니다.

# 블로그 포스트에서 다룰 내용은 무엇인가요?

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

이 블로그 포스트에서는 람다 런타임 업데이트를 자동화하는 방법을 가르쳐 드리겠습니다. 우리의 스크립트는 원하는 Python 버전을 인수로 받아 이전 버전을 사용 중인 람다를 나열한 후 런타임을 원하는 버전으로 업그레이드할 것입니다.

## 따를 단계들

- Lambda를 위한 boto3 클라이언트 생성.
- AWS 계정의 해당 지역 내 모든 람다 함수를 나열.
- 람다 함수의 런타임 가져오기.
- 람다 런타임이 원하는 버전보다 낮은지 유효성 검사.
- 람다 런타임을 원하는 버전으로 업그레이드.
- 스크립트를 작성하는 동안 최선의 실천 방법을 준수할 것입니다.

# 선행 조건:

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

- 지역 머신에서 AWS 자격 증명을 구성하려면 aws configure 명령을 실행하세요. 최근 블로그 게시물의 지침을 따라 주세요.
- AWS CLI 명령을 실행하여 이전 버전의 Python 런타임에서 실행되는 몇 가지 샘플 람다 함수를 만드세요.

# Python 스크립트 개발을 진행하기 전에 사전 설정을 해봅시다 — 데모 람다 함수 생성.

## 1. 배포 패키지 준비

- 람다 함수 코드를 위한 디렉터리를 만드세요.

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
mkdir my-lambda-function
cd my-lambda-function
```

- 람다 함수 코드를 생성하세요 (예: lambda_function.py)

```js
def lambda_handler(event, context):
    return "Hello, World!"
```

- 디렉토리 내용을 압축하세요

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

```bash
zip -r deployment-package.zip .
```

## 2. Create a Lambda Execution Role

- Create a trust policy (e.g., trust-policy.json)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
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

- IAM 역할을 생성하세요

```js
aws iam create-role --role-name MyLambdaExecutionRole --assume-role-policy-document file://trust-policy.json
```

![연결된 이미지](/TIL/assets/img/2024-07-09-AutomateOutdatedAWSLambdaRuntimeUpdates_1.png)

- 역할에 AWSLambdaBasicExecutionRole 정책을 연결하세요

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

aws iam attach-role-policy --role-name MyLambdaExecutionRole --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

## 3. 람다 함수 배포하기

- 람다 함수를 만드는 AWS CLI 명령어는 다음과 같이 보일 것입니다.

aws lambda create-function \
 --function-name MyPython38Function \
 --runtime python3.8 \
 --role arn:aws:iam::YOUR_ACCOUNT_ID:role/YOUR_LAMBDA_EXECUTION_ROLE \
 --handler lambda_function.lambda_handler \
 --zip-file fileb://path/to/your/deployment/package.zip

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

- 이제 IAM 역할과 배포 패키지를 사용하여 3개의 람다 함수를 배포할 예정입니다.

```js
aws lambda create-function \
    --function-name medium-blog-lambda1 \
    --runtime python3.8 \
    --role arn:aws:iam::366130468123:role/MyLambdaExecutionRole \
    --handler lambda_function.lambda_handler \
    --zip-file fileb://my-lambda-function/deployment-package.zip \
    --timeout 15 \
    --memory-size 128
```

아래와 같이 3개의 람다 함수가 생성됩니다.

![이미지](/TIL/assets/img/2024-07-09-AutomateOutdatedAWSLambdaRuntimeUpdates_2.png)

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

이제 파이썬 스크립트 작성을 시작할 준비가 끝났어요.

파이썬 코드를 작성하기 전에, 최고의 방법을 따라 파이썬 환경을 설정해보겠어요.

## 파이썬 가상 환경 만들기

```js
# 가상 파이썬 환경 만들기
python3 -m venv medium_blog

# 가상 환경 활성화하기
source medium_blog/bin/activate
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

- requirements.txt 파일을 생성하고 해당 파일에 의존성을 넣어주세요.

boto3는 Python 라이브러리로, Python을 사용하여 AWS 리소스와 통신할 수 있게 해줍니다.

# requirements.txt

boto3

- 의존성을 설치해주세요

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
pip install -r requirements.txt
```

# 이제 설정을 완료했으니, 파이썬 스크립트를 작성해 볼까요?

우리는 코드를 작은 부분, 즉 함수로 나누어 각 함수가 한 가지 작업을 수행하도록 할 수 있어요.

참고: 블로그 포스트의 전체 코드는 제 공개 GitHub에 올릴 예정이에요.

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

## 1. Python 모듈을 가져와 boto3를 사용하여 람다 클라이언트를 만듭니다

![lambda client](/TIL/assets/img/2024-07-09-AutomateOutdatedAWSLambdaRuntimeUpdates_3.png)

## 2. 모든 람다를 나열하는 함수 — 람다 함수 목록을 반환합니다.

![list lambdas](/TIL/assets/img/2024-07-09-AutomateOutdatedAWSLambdaRuntimeUpdates_4.png)

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

이 기능은 lambda_client를 사용하여 Lambda 함수 목록을 가져와 반환합니다.

list_functions()[“Functions”] 대신 list_functions().get(“Functions”, None)을 사용하여 응답에 “Functions” 키가 없을 때 KeyError를 방지할 수 있습니다. 이렇게 하면 코드가 기본값인 None을 반환하므로 더 견고하고 런타임 오류를 방지할 수 있습니다.

## 3. 람다 런타임 가져오기.

<img src="/TIL/assets/img/2024-07-09-AutomateOutdatedAWSLambdaRuntimeUpdates_5.png" />

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

이 함수는 lambda_json_list에 있는 딕셔너리에서 FunctionName과 Runtime을 추출하고(Runtime 값이 없는 경우에는 컨테이너 기반 람다 함수의 경우), 이름과 런타임을 포함하는 튜플의 목록을 반환합니다.

4. 원하는 런타임과 런타임을 비교하고 런타임이 원하는 것보다 낮으면 True를 반환합니다.

![이미지](/TIL/assets/img/2024-07-09-AutomateOutdatedAWSLambdaRuntimeUpdates_6.png)

버전 클래스는 packaging.version 모듈에서 사용되며 버전 문자열을 구문 분석하고 비교하는 데 사용됩니다. 이 함수에서는 현재 런타임 버전이 지정된 버전보다 이전 버전인지 확인합니다.

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

## 5. 비교 함수가 True 값을 반환하면 람다 런타임을 업데이트합니다.

![Lambda Runtime Update](/TIL/assets/img/2024-07-09-AutomateOutdatedAWSLambdaRuntimeUpdates_7.png)

이 함수는 람다 함수를 새로운 런타임으로 업데이트합니다.

예외 처리를 위해 try/except 블록을 사용했습니다. 이를 통해 예기치 않은 오류를 관리하고 대응할 수 있습니다. try 블록 내에서 위험한 작업을 시도하고 그에 따른 예외를 except에서 처리하여 프로그램이 오류로 인해 충돌하지 않고 우아하게 회복될 수 있도록 합니다.

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

## 6. 조각들을 함께 모으기

![이미지](/TIL/assets/img/2024-07-09-AutomateOutdatedAWSLambdaRuntimeUpdates_8.png)

## 7. 스크립트 실행하기

![이미지](/TIL/assets/img/2024-07-09-AutomateOutdatedAWSLambdaRuntimeUpdates_9.png)

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

위의 코드 스니펫을 모두 `update_lambda_runtimes.py` 파일에 붙여넣고 아래 명령어를 실행하여 스크립트를 실행합니다.

```js
python update_lambda_runtimes.py
```

`__name__`이 `'__main__'`인 상태에서 스크립트를 실행할 때만 `run()` 함수가 실행되도록 하여 스크립트를 실행합니다.

스크립트의 유용성을 높이기 위해 명령줄 인수를 받을 수 있도록 활성화해야 합니다.

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

![Automatic Outdated AWS Lambda Runtime Updates](/TIL/assets/img/2024-07-09-AutomateOutdatedAWSLambdaRuntimeUpdates_10.png)

이 함수는 Python에서 argparse 모듈을 사용하여 명령줄 인자 파서를 만듭니다. 스크립트 실행 시 제공해야 할 인수인 python_version (단축 형식 -a)을 기대합니다.

## 명령줄 인수를 사용하여 스크립트 실행

![Automatic Outdated AWS Lambda Runtime Updates Example](/TIL/assets/img/2024-07-09-AutomateOutdatedAWSLambdaRuntimeUpdates_11.png)

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

```python
python update_lambda_runtimes.py --python-version python3.9
```

블로그 게시물의 전체 코드는 제 공개 GitHub 리포지토리에서 찾을 수 있습니다. 다음 링크를 사용하여 액세스하세요.

## 무엇을 더 해야 할까요?

- 로깅 사용하기.
- 코드 문서화 및 타입 힌트 사용하기.
- NodeJS, Go 등 다른 런타임을 포함하는 스크립트 확장하기.

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

저와 LinkedIn에서 연락하세요: [https://www.linkedin.com/in/akhilesh-mishra-0ab886124/](https://www.linkedin.com/in/akhilesh-mishra-0ab886124/)
