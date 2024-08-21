---
title: "AWS 기반 클라우드 기반 생성형 AI 만드는 방법"
description: ""
coverImage: "/assets/img/2024-05-17-AWSBedrockCloud-basedGenerativeAI_0.png"
date: 2024-05-17 04:21
ogImage:
  url: /assets/img/2024-05-17-AWSBedrockCloud-basedGenerativeAI_0.png
tag: Tech
originalTitle: "AWS Bedrock: Cloud-based Generative AI"
link: "https://medium.com/@pranavsanotra/aws-bedrock-cloud-based-generative-ai-23694dfce3d7"
isUpdated: true
---

![AWS Bedrock](/assets/img/2024-05-17-AWSBedrockCloud-basedGenerativeAI_0.png)

Amazon Bedrock은 클라우드에서 대형 언어 모델을 활용하는 견고한 솔루션입니다! 경험 많은 개발자, 데이터 과학자 또는 Generative AI의 시작부터 Amazon Bedrock은 끝까지 Generative AI 애플리케이션을 테스트하고 구현하는 이상적인 장소가 될 수 있습니다.
이 튜토리얼을 통해 AWS Bedrock 설정 및 시작하는 프로세스를 간단하게 만드는 데 목표를 두었습니다. 이 튜토리얼에서는 Meta의 Llama-3-70B-Instruct 모델을 가져와 사용할 것입니다. 튜토리얼을 따라가기 전에 다음 사전 요구 사항을 충족해야 합니다:

1. AWS 계정
2. Visual Studio Code 또는 IDE
3. Amazon Web Services의 기본 지식

- IAM에서 새 사용자를 생성하고 "AmazonBedrockFullAccess" 정책을 연결합니다. 나중에 사용할 자격 증명이 AWS Bedrock 서비스에 액세스할 수 있도록 합니다. 자격 증명을 다운로드하고 안전하게 보관해야 합니다. 나중에 사용해야 합니다.

2. AWS 콘솔에서 AWS Bedrock을 검색하고 지역을 신중하게 선택합니다. 현재 일부 대형 언어 모델은 특정 지역에서만 사용할 수 있습니다. 이 튜토리얼에서는 "us-west-2"를 선택하고 Meta의 "Llama-3-70B-Instruct" 모델에 액세스할 것입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 선택한 IDE(제 경우 VS Code)로 이동하여 CLI에서 IAM 자격 증명을 구성하세요. 이미 구성해 두었지만, 자격 증명을 요청받을 때 신중히 입력해주세요.

2. 자격 증명을 설정한 후, Boto3를 사용하여 AWS Bedrock 서비스에서 모델을 호출하는 기본 코드를 작성하세요. 아래는 이 튜토리얼용 코드 스니펫이며, 필요에 따라 수정할 수 있습니다. 사용 사례에 맞게 모델 매개변수를 조정할 수도 있습니다.

```js
import boto3
import json

prompt_template="""
Generative AI 엔지니어로 활동하여 Generative AI에 관한 멋진 사실 10가지를 말해주세요.
"""

bedrock=boto3.client(service_name="bedrock-runtime", region_name="us-west-2")

payload={
    "prompt":"[INST]" + prompt_template +"[/INST]",
    "max_gen_len":2048,
    "temperature":0.5,
    "top_p":0.9
}

body=json.dumps(payload)
model_id = "meta.llama3-70b-instruct-v1:0"
response = bedrock.invoke_model(
    body=body,
    modelId=model_id,
    accept= "application/json",
    contentType="application/json"
)

response_body = json.loads(response.get("body").read())
response_text=response_body['generation']
print(response_text)
```

3. 코드를 실행하고 결과를 테스트하세요!
   예시 프롬프트: "리오넬 메시가 시대 최고의 선수인 이유를 5가지 말해주세요. 답변을 100~150 단어로 요약해주세요."

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

![AWSBedrockCloud-basedGenerativeAI](/assets/img/2024-05-17-AWSBedrockCloud-basedGenerativeAI_1.png)

클라우드 기반 생성적 AI를 시작하는 기본적인 튜토리얼입니다. 사용 사례는 무한합니다. 저도 복잡한 사용 사례와 그 가능한 해결책을 탐구하고 싶습니다. 궁금한 점이나 질문이 있으면 언제든 댓글에 남겨주세요!

읽어 주셔서 감사합니다. 궁금한 점이 있거나 단순히 즐겁게 이야기 나누고 싶다면 망설임 없이 Linkedin에서 저에게 연락해주세요.
