---
title: "유튜브 영상을 요약하는 서버리스 API 배포하는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-12-HowtoDeployaServerlessAPIThatSummarizesYouTubeVideos_0.png"
date: 2024-07-12 19:43
ogImage: 
  url: /TIL/assets/img/2024-07-12-HowtoDeployaServerlessAPIThatSummarizesYouTubeVideos_0.png
tag: Tech
originalTitle: "How to Deploy a Serverless API That Summarizes YouTube Videos"
link: "https://medium.com/gitconnected/how-to-deploy-a-serverless-api-that-summarizes-youtube-videos-c5b705f95f03"
---


이 게시물에서는 Google Cloud의 서버리스 클라우드 함수를 자동화하는 방법을 배울 수 있습니다.

이 어플리케이션은 항상 프로토타입을 만들고 싶었던 것을 수행할 것입니다: YouTube 비디오를 요약하는 것 📹.

현재 사용 가능한 강력한 LLM(Large Language Models), 확장 가능한 클라우드 아키텍처 및 효율적인 개발자 도구를 활용하여 이 아이디어를 실현하는 것이 이제 가능합니다.

그래서 이 프로젝트를 구축하는 데 다룰 내용은 다음과 같습니다:

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

- 클라우드 함수 간단 소개
- 로컬에서 클라우드 함수 개발 및 테스트하는 방법
- GCP에서 인프라 설계하고 클라우드 함수 배포하는 방법

마지막으로, Python 코드만 사용하여 인프라 프로비저닝 및 클라우드 함수 배포할 것입니다. GCP UI를 조작하거나 다른 구문이 필요한 인프라 코드(IaC) 도구를 사용하지 않을 것입니다.

한 번 살펴보세요.

ML 콘텐츠, 상세한 튜토리얼 및 산업에서 실용적인 팁에 관심이 있다면, 제 뉴스레터를 팔로우하세요. The Tech Buffet이라고 합니다.

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

# 클라우드 함수란 무엇인가요?

클라우드 함수는 구글 클라우드 서비스로, 서버나 컨테이너를 관리할 필요가 없이 클라우드에서 코드를 실행할 수 있도록 하는 서비스입니다. 그리고 확장 가능하고 비용 효율적인 방식으로 작동합니다.

이것이 바로 클라우드 함수가 서버리스라고 불리는 이유입니다.

클라우드 함수를 사용하면 개발자 경험이 간단합니다. 로컬에서 코드를 작성하고 테스트한 후에 해당 코드를 구글 클라우드에 전송하여 배포하고 운영 인프라를 관리할 수 있습니다.

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

구름 함수의 두 번째 훌륭한 기능은 비용입니다: 사용한 만큼만 지불하게 됩니다. 구체적으로 말하면 함수의 실행 시간에 대한 비용을 청구하며, 100밀리초 단위로 측정됩니다. 그리고 함수가 유휴 상태인 경우에는 아무런 비용도 발생하지 않습니다!

구름 함수는 주로 다른 시스템(예: 구름 스토리지 또는 PubSub)에서 트리거되는 단기적 이벤트 기반 작업을 처리하는 데 설계되었습니다.

예를 들어, 버킷에 파일이 저장될 때나 BigQuery에 행이 삽입될 때 트리거되는 구름 함수를 만들 수 있습니다.

또한 알림을 보내거나 다른 시스템을 트리거하는 데 구름 함수가 사용되는 것을 자주 볼 수 있습니다.

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

# 로컬에서 클라우드 함수 개발 및 테스트하기

이 작은 프로젝트에서 우리가 만들 클라우드 함수는 REST API로 작동합니다. YouTube URL로 구성된 사용자 입력을 받아 요약 내용을 반환할 것입니다.

GCP에 배포하기 전에 먼저 이 함수를 로컬에서 빌드하고 테스트해 봅시다.

YouTube 비디오를 요약하기 위해 다음 Python 라이브러리가 필요합니다:

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

- youtube-transcript-api: YouTube 비디오에서 자막을 추출하는 데 사용됩니다.
- langchain 및 langchain-openai: OpenAI 언어 모델과 상호 작용하여 요약을 생성하는 데 사용됩니다.
- python-dotenv: OpenAI 자격 증명을 환경 변수로로드하는 데 사용됩니다.
- functions-framework: 이식 가능한 파이썬 함수를 작성하고 로컬에서 테스트하는 FaaS (Function as a Service) 프레임워크

시작하기 가장 간단한 방법은 가상 환경을 만드는 것입니다:

```js
python -m venv ./venv
source venv/bin/activate
pip install -r function/requirements.txt
```

그런 다음, 함수의 코드는 function/main.py 파일에 정의됩니다:

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

비디오를 요약할 주요 기능을 여기에 소개합니다 (더 자세한 내용은 repo에서 나머지 코드를 확인하세요):

→ 먼저 비디오 대본과 제목을 추출하고 LLM을 초기화한 후, 프롬프트를 작성하여 LLM에 요약을 보냅니다.

```js
def summarize_youtube_video(url, additional_instructions):
    transcript = get_youtube_video_transcript(url)
    title = get_youtube_video_title(url)
    llm = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
    prompt = get_prompt(title, transcript, additional_instructions)
    summary = llm.predict(prompt)
    data = {
        "url": url,
        "title": title,
        "summary": summary,
        "transcript": transcript,
    }
    return data
```

이 논리를 REST API로 래핑하기 위해 functions_framework 패키지를 사용할 것입니다. 이를 통해 HTTP 요청이 전송되면 호출되는 Cloud Function 핸들러(또는 entry point)를 정의할 수 있습니다:

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
@functions_framework.http
def main(request: flask.Request):
    if request.method == "POST":
        url = request.form.get("url")
        additional_instructions = request.form.get("instructions")
        data = summarize_youtube_video(url, additional_instructions)
        return flask.jsonify(data)
    else:
        return "Method Not Allowed", 400
```

전체 클라우드 함수 코드는 여기에서 확인할 수 있습니다.

클라우드 함수를 로컬에서 테스트하려면 다음 명령을 실행하세요:

```bash
functions-framework --target=main --source=function/main.py --debug
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

해당 명령어를 실행하면 로컬 웹 서버가 시작됩니다. 그래서 Postman을 열어 몇 가지 요청을 보내 봅시다:

Terraform과 Pulumi 간의 차이점에 대해 논의하는 비디오를 보내 봅시다:

URL을 입력하고 전송 버튼을 클릭하여 양식 데이터를 채우면 다음 결과를 얻을 수 있습니다: summary, title, transcript (전체 텍스트), URL.

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

여기서 요약을 자세히 살펴보겠습니다:

```js
Terraform과 Pulumi는 DevOps 세계에서 자주 비교되는 두 가지 도구입니다. Terraform은 상태를 정의하는 일관성으로 유명한 반면 Pulumi는 Python 및 C#과 같은 명령형 프로그래밍 언어를 사용하여 보다 유연한 접근 방식을 제공합니다. 그러나 이는 팀으로 작업하거나 조직을 변경할 때 잠재적인 문제를 야기할 수도 있습니다.\n\n반면 Terraform은 HCL (Hashicorp Configuration Language)을 사용하여 상태를 더 제한적이고 일관된 방식으로 정의합니다. 이를 통해 더 쉬운 협업과 상태 파일을 보다 안전하게 관리할 수 있습니다. 게다가 Terraform은 SaaS 제품이 아니기 때문에 상태가 자동으로 원격 네트워크로 푸시되지 않습니다. 민감한 정보를 다룰 때 이는 고려할 사항일 수 있습니다.\n\n총론적으로 발표자는 단순성과 일관성을 이유로 Pulumi 대신 Terraform을 강력히 선호합니다. 또한 Terraform은 지원을 제공하고 모든 질문에 답변할 수 있는 거의 2,000명의 커뮤니티를 갖고 있다고 언급합니다. 마지막으로 발표자는 시청자들에게 Terraform을 가장 간단한 형태로 사용하고 복잡한 것을 피하라고 권장합니다.
```

이 튜토리얼을 재현하면 Postman 클라이언트와 함께 놀 수 있고, 다른 비디오를 시도하고 심지어 LLM에 사용자 정의 지침을 추가할 수 있습니다.

다음 예시에서 LLM에게 프랑스어로 대답하도록 요청할 수 있습니다.

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

클라우드 함수가 로컬에서 테스트되었습니다.

이제 배포할 준비가 되었어요 👇.

# 클라우드 함수를 위한 인프라 프로비저닝

몇 년 전에 클라우드 함수를 배포해 달라고 요청하면, 저는 기쁜 마음으로 GCP 콘솔에 로그인하고 소스 코드를 버킷에 넣은 다음 UI에서 클라우드 함수를 생성하고 Google Secret Manager에 비밀 정보를 추가하고 앱에 연결하고 배포 버튼을 눌렀을 거예요.

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

만약 우리가 소스 코드를 변경할 때마다 이러한 단계들을 수행한다면, 이것은:

- 지루할 것이다
- 오류 발생 가능성이 높을 것이다
- 코드베이스 안에서 추적하기 어려울 것이다
- 협업하기 어려울 것이다

## 풀루미 🚀

풀루미(Pulumi)는 이미 알고 있는 프로그래밍 언어를 사용하여 어떠한 아키텍처나 클라우드 공급자에도 인프라를 구축하고 배포하는 데 도움을 주는 SDK입니다(예: Python, TypeScript, Java 등).

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

Pulumi를 시작하려면 다음과 같이 설치하고 구성해야 합니다:

## 👉 Pulumi 다운로드 및 구성 ⚙️

- Mac을 사용 중이라면 Homebrew로 Pulumi를 설치할 수 있습니다

```js
brew install pulumi/tap/pulumi
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

- 다른 OS를 사용 중이라면 대안들을 확인해보세요.

```js
gcloud config set project <YOUR_GCP_PROJECT_ID>
```

- Pulumi는 Google Cloud 리소스와 상호 작용하기 위해 기본 애플리케이션 자격 증명을 필요로 합니다. 따라서 인증 애플리케이션 기본 로그인 명령을 실행하여 해당 자격 증명을 얻어야 합니다.

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
gcloud auth application-default login
```

- Pulumi이 GCP 계정으로 구성된 후 Pulumi 프로젝트를 만들 수 있습니다.
폴더의 루트에 Pulumi.yaml이라는 YAML 파일을 만들고 다음 라인을 붙여넣습니다:

```js
name: youtube-summarizer
runtime:
  name: python
  options:
    virtualenv: venv
backend:
  url: gs://pulumi-gcp-state/main
description: A minimal Google Cloud Python Pulumi program
config:
  pulumi:tags:
    value:
      pulumi:template: ""
```

이 파일은 런타임(Python)을 정의하고, virtualenv 폴더를 가리키며, Pulumi가 인프라의 상태를 저장하는 백엔드 URL을 설정합니다. Pulumi는 다른 백엔드를 사용할 수 있으며, 이 예시에서는 Google Cloud Storage를 사용합니다.

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

다음 명령을 실행하여 올바른 매개변수로 Pulumi를 구성하세요:

```js
pulumi config set gcp:region <GCP-REGION>
pulumi config set gcp:project <GCP-PROJECT-ID>
```

첫 번째 명령을 실행하면 Pulumi가 스택의 이름을 선택하라는 메시지가 표시됩니다. 이 스택은 Pulumi 프로젝트가 배포될 환경입니다.

저는 방금 'dev'를 선택했어요.

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

구성이 완료되면 다음 내용이 포함된 Pulumi.dev.yaml 파일이 생성됩니다:

```js
encryptionsalt: v1:GJeieppLoAs=:v1:tglu/3T2fbOmQs59:ahQNXFSYgfQsvRp1J4GB4e670KOffg==
config:
  gcp:project: playground-351113
  gcp:region: europe-west1
```

## 👉 Pulumi를 사용하여 인프라 정의하기

Pulumi 코드로 인프라를 작성하기 전에 앱 아키텍처를 정의한 다음 보여드릴게요. 이것을 통해 필요한 서비스를 이해할 수 있을 거예요.

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

다수의 구성 요소가 함께 작동합니다:

- 클라우드 함수의 코드를 저장하는 버킷
- OpenAI API 키를 저장하는 시크릿 매니저
- 귀하를 대신하여 클라우드 함수 리소스 액세스를 부여하는 서비스 계정
- 서비스 계정이 시크릿 매니저에 액세스할 수 있도록 하는 IAM 정책
- Cloud Run에서 Cloud 함수를 호출할 수 있게 하는 IAM 호출자 역할(Cloud Functions의 2세대는 Cloud Run에서 관리됩니다)

모든 이 서비스들은 __main__.py 파일에서 명령적인 방식으로 정의될 것입니다:

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

한 번에 하나씩 살펴봐요:

- 소스 코드가 담긴 버킷:

```js
import os
from pulumi import asset, export
import pulumi_gcp as gcp
from dotenv import load_dotenv

load_dotenv()

#### 버킷 생성 및 코드 업로드

bucket = gcp.storage.Bucket("bucket", location="EU")

archive = gcp.storage.BucketObject(
    "python-zip",
    name="python-code.zip",
    bucket=bucket.name,
    source=asset.AssetArchive({".": asset.FileArchive("./function")}),
)
```

- 비밀값과 그 값

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
#### 비밀 생성

secret = gcp.secretmanager.Secret(
    "openai-api-key",
    replication=gcp.secretmanager.SecretReplicationArgs(
        auto=gcp.secretmanager.SecretReplicationAutoArgs(),
    ),
    secret_id="openai-secret",
)
secret_version = gcp.secretmanager.SecretVersion(
    "1",
    secret=secret.name,
    secret_data=os.environ.get("OPENAI_API_KEY"),
)
```

- 서비스 계정

```js
#### 서비스 계정 생성

service_account = gcp.serviceaccount.Account(
    "service-account",
    account_id="service-account-id",
    display_name="Summarizer Service Account",
)

service_account_email = service_account.email.apply(
    lambda email: f"serviceAccount:{email}"
)
```

- 서비스 계정에 대한 IAM 정책을 비밀에 액세스하도록 설정하기


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
secret_accessor = gcp.organizations.get_iam_policy(
    bindings=[
        gcp.organizations.GetIAMPolicyBindingArgs(
            role="roles/secretmanager.secretAccessor",
            members=[service_account_email],
        )
    ]
)

secret_iam_policy = gcp.secretmanager.SecretIamPolicy(
    "my-secret-iam-policy",
    secret_id=secret.id,
    project=gcp.config.project,
    policy_data=secret_accessor.policy_data,
)
```

- 클라우드 기능

```js
#### 클라우드 기능 생성

cloud_function = gcp.cloudfunctionsv2.Function(
    resource_name="cloud-function",
    location="europe-west1",
    build_config=gcp.cloudfunctionsv2.FunctionBuildConfigArgs(
        entry_point="main",
        runtime="python39",
        source=gcp.cloudfunctionsv2.FunctionBuildConfigSourceArgs(
            storage_source=gcp.cloudfunctionsv2.FunctionBuildConfigSourceStorageSourceArgs(
                bucket=bucket.name,
                object=archive.name,
            )
        ),
    ),
    service_config=gcp.cloudfunctionsv2.FunctionServiceConfigArgs(
        available_memory="256M",
        ingress_settings="ALLOW_ALL",
        timeout_seconds=60,
        service_account_email=service_account.email,
        secret_environment_variables=[
            gcp.cloudfunctionsv2.FunctionServiceConfigSecretEnvironmentVariableArgs(
                key="OPENAI_API_KEY",
                version="1",
                project_id=gcp.config.project,
                secret="openai-secret",
            )
        ],
    ),
)
```

- 클라우드 런 IAM 바인딩  

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
#### Cloud Run에 인보커 역할 추가

binding = gcp.cloudrun.IamBinding(
    "binding",
    location=cloud_function.location,
    service=cloud_function.name,
    role="roles/run.invoker",
    members=["allUsers"],
)
```

- Pulumi의 출력: Cloud Function 엔드포인트 URL

```js
export("python_endpoint", cloud_function.service_config.apply(lambda sc: sc.uri))
```

이 변경 사항을 배포하려면, 아래 명령어를 실행하면 됩니다:


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
pulumi up
```

업데이트를 하기 전에 Pulumi는 먼저 미리보기를 보여주고 사용자가 확인을 하면 리소스가 생성됩니다.

<img src="/TIL/assets/img/2024-07-12-HowtoDeployaServerlessAPIThatSummarizesYouTubeVideos_1.png" />

이 엔드포인트를 Postman에서 시도함으로써 API가 작동하는지 확인할 수 있습니다.

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

## 👉 자원 정리하기

클라우드 함수 프로토타입 작업이 완료되면 스택을 파괴하고 모든 리소스를 제거할 수 있어요.

```js
pulumi destroy
```

# 결론

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

GCP 서비스를 백엔드로 사용하는 서버리스 애플리케이션을 Pulumi와 같은 Infrastructure-as-code (IaC) 도구로 구축할 수 있어요.

이는 유연성을 제공하고 자동화를 높이며, 클라우드 리소스를 UI에서 조작할 때 발생하는 오류를 줄여줘요.

Pulumi는 다양한 기능을 제공하며, 다른 클라우드 서비스와 원활하게 통합돼요. 자세한 내용은 문서를 확인해보세요.

다음에 또 뵐게요! 👋