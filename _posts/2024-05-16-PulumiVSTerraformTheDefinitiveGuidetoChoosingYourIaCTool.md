---
title: "Pulumi 대 비교 IaC 도구 선택을 위한 확실한 안내"
description: ""
coverImage: "/assets/img/2024-05-16-PulumiVSTerraformTheDefinitiveGuidetoChoosingYourIaCTool_0.png"
date: 2024-05-16 16:58
ogImage:
  url: /assets/img/2024-05-16-PulumiVSTerraformTheDefinitiveGuidetoChoosingYourIaCTool_0.png
tag: Tech
originalTitle: "Pulumi VS Terraform: The Definitive Guide to Choosing Your IaC Tool"
link: "https://medium.com/gitguardian/pulumi-vs-terraform-the-definitive-guide-to-choosing-your-iac-tool-6be9081aa6e7"
isUpdated: true
---

<img src="/assets/img/2024-05-16-PulumiVSTerraformTheDefinitiveGuidetoChoosingYourIaCTool_0.png" />

클라우드 네이티브 시대에는 인프라스트럭처를 코드로 관리하는 것이 클라우드 인프라 관리의 표준으로 자리 잡았습니다.

테라폼은 거의 10년째 사용되어오던 클라우드에 중립적인 옵션으로 서비스되어 왔으며 경쟁사들이 등장하기 전까지 독보적인 위치에 있었습니다. 지금은 AWS CDK, Terraform용 CDK 그리고 상대적으로 새로운 Pulumi와 같은 다양한 옵션이 존재합니다.

다만 다양한 선택지가 있다는 것은 결정하는 과정이 어렵다는 것을 의미하지는 않습니다. 오히려 이로 인해 결정 과정이 복잡해 질 수도 있습니다. 모든 옵션을 탐색하고 정보를 수집하여 결정을 내리기 위해서는 몇 일, 아니면 몇 주가 걸릴 수도 있습니다. 그러나 빠른 클라우드 네이티브/데브옵스 시대에는 모두가 그러한 여유가 없다는 점을 잊지 말아야 합니다.

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

걱정하지 마세요: 이 블로그에서는 Pulumi 대 Terraform에 대해 심층적으로 살펴보겠습니다 (그리고 AWS CDK/CDK for Terraform 메커니즘에 대해 약간 언급할 거예요). 비교 차트, 의사 결정 트리, 몇 가지 팁과 FAQ도 포함할 거에요 (TL;DR: 마지막 두 섹션으로 건너뛰세요) - 일에 적합한 올바른 도구를 선택하는 데 도움이 될거에요.

더 이상의 변들겋 없이, 시작합시다.

# 1. 테라폼

IaC 도구에 대해 이야기하고 있기 때문에 테라폼을 우회할 수 없어요. 왜냐하면 이 도구가 가장 오랜 역사를 가지고 있기 때문이에요. 네, (예: AWS CloudFormation)과 같이 더 오랜 역사를 가진 클라우드 특화 솔루션이 있을 수 있지만, 클라우드에 중립적이 아닌 것들이죠.

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

그래서, Pulumi에 대해 언급하기 전에 먼저 Terraform을 살펴보겠습니다.

## 1.1. Terraform의 간단한 역사

HashiCorp에서 2014년에 처음 출시된 Terraform은 2016년과 2017년에 매우 많은 흥미를 끌기 시작했습니다. 이 기간 동안 기본적으로 모든 데브옵스 엔지니어들이 테스트해 보려고 했거나 적어도 이에 대해 이야기했습니다.

2021년에 처음으로 출시된 generally available 버전인 v1.0 이후에 이르기까지, 특히 2017년부터 2019년 사이의 v0.11 및 v0.12와 같은 이전 버전들은 이미 다른 비즈니스 분야의 여러 기업들에 의해 크게 수용되었으며 개발 환경뿐만 아니라 프로덕션 환경에서도 널리 사용되고 있습니다.

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

이 모든 역사가 의미하는 바는, 우리가 테라폼에 대해 어느 정도의 확신을 갖을 수 있다는 것입니다: 테라폼은 실제 프로덕션 환경에서 오랜 기간 테스트되었으며 그와 같이 입증된 성과가 있으므로, 다른 대안들을 시도해본 적이 없거나 시간이 부족하더라도 테라폼으로 잘못 갈 수 없습니다.

## 1.2. 테라폼의 내부 동작

테라폼 (물론 다른 모든 IaC 도구들도 마찬가지지만)을 더 잘 이해하기 위해, 다음으로 테라폼이 어떻게 작동하는지 확인해보겠습니다: 핵심 플러그인 아키텍처입니다.

간단히 말하면, 핵심은 상태 기계입니다. 이는 인프라 수명주기를 관리하며 현재 인프라 상태와 선언적 코드로 정의된 원하는 상태를 비교한 다음, 해당 인프라를 선언적으로 정의된 상태로 가져오기 위해 변경/작업을 수행할 계획을 세우는 방식으로 작동합니다.

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

실제 변경 또는 조작 작업은 플러그인(또는 프로바이더라고도 부르는 것이 동일한 개념)에 의해 수행됩니다. 코어는 플러그인과 소통하여 주어진 상태에서 무엇을 해야 하는지 알려줍니다.

요약하면, 코어는 상태를 관리하고, 플러그인은 작업을 수행합니다. 기본적으로 이것이 모든 IaC 도구가 작동하는 방식입니다: 상태를 관리해야하며, 클라우드 인프라를 조작하는 데 필요한 무거운 작업을 수행할 수 있는 것이 필요합니다.

Terraform에 관련된 몇 가지 추가 정보를 언급하면, 대부분의 플러그인은 Golang으로 구현됩니다 (Terraform의 코어-플러그인 프레임워크를 통해 다른 프로그래밍 언어로 작성된 플러그인을 사용할 수 있지만), 따라서 플러그인은 클라우드 Go SDK가 필요합니다. 이를 통해 실제로 CRUD 작업을 수행할 수 있습니다.

이러한 세부 정보가 약간 복잡해 보인다면 걱정하지 마세요: Terraform 사용자로서(개발자/기여자가 아닌) 우리는 플러그인 구현에 대해 걱정할 필요가 없습니다. Go 코드를 작성하지 않고 HCL만 작성합니다. HCL을 통해 인프라를 정의하면, 내부적으로 Terraform은 일부 변환 작업을 수행하여 해당 Go 플러그인을 호출하고, 이 플러그인은 다시 클라우드 Go SDK를 사용합니다.

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

## 1.3. 테라폼 HCL

테라폼에서 인프라를 정의하는 것은 간단합니다: HCL (HashiCorp Configuration Language)이라는 구성 언어로 인프라를 정의합니다.

AWS에 S3 버킷을 만드는 HCL 예제를 살펴보겠습니다:

```js
resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"

  tags = {
    Name        = "나의 버킷"
    Environment = "Dev"
  }
}
```

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

만약 마크업 언어나 마크다운, JSON, YAML 같은 어떤 형식이라도 익숙하다면, 위 구문을 사용하는 것이 너무 낯설지 않을 것이고 HCL이 두 가지 개념을 중심으로 구축되어 있다는 것을 분명히 이해하게 될 것입니다: 블록과 속성. 위의 예시에서:

- 전체 리소스 ... '' 는 리소스를 정의하는 블록이며, 첫 번째 키워드로 나타납니다.
- aws_s3_bucket은 리소스의 종류이다. AWS 제공업체 문서를 참조하여 지원되는 모든 AWS 리소스 목록을 얻을 수 있다.
- 예시 부분은 리소스의 이름이다.
- 블록 안에는 속성이나 이 리소스에 대한 인수인 키-값 쌍이 있습니다. 다시 말하지만, 지원되는 인수, 필수또는 아닌 것들을 알아내기 위해서는 제공업체 문서를 참조해야 합니다.

HCL에 대한 학습곡선은 있지만, 다른 프로그래밍 언어를 배우는 것만큼 가파르지는 않습니다. 왜냐하면 HCL은 그저 설정 목적으로만 사용되는 완전한 프로그래밍 언어가 아니기 때문입니다. 이것은 당신의 철학적 성향에 따라 장단점이 될 수 있습니다:

- 한편, 완전한 프로그래밍 언어가 아니라 간단한 설정 언어일 뿐이기 때문에, 큰 혜택을 가져옵니다: 이는 사실상 키-값 쌍으로 구성되어 있어서 아주 직관적이고 사람이 읽기에 편리합니다.
- 반면에, 그 간단함으로 인해 루프나 분기 같은 복잡한 작업을 반복적으로 수행하기 어려울 수 있습니다 (특별 구문으로 이러한 것들을 달성할 수 있지만, 파이썬 같은 실제 프로그래밍 언어에서 사용하는 ... 또는 if/else와 같이 글로 쓰는 것만큼 간단하지는 않다.)

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

그래서 IaC 도구 Terraform은 어느 정도 중간 난이도의 학습 곡선과 제약 사항을 가지고 있습니다 (HCL 때문에 양: 배워야 하며, 인프라를 정의해야 합니다). 이러한 상황을 개선하기 위해 많은 다른 IaC 도구가 등장했습니다. 계속해서 읽어보세요.

## 2. Pulumi

이전 섹션에서 언급했듯이, Terraform은 완벽하지 않습니다. 이러한 문제를 해결하기 위해 많은 도구가 등장했으며, Pulumi는 최근 시도 중 하나입니다.

Pulumi란 무엇일까요? 간단히 말해, 이것은 Terraform과 마찬가지로 IaC 도구입니다. 하지만 Terraform이 특정 구문인 HCL을 사용하는 반면, Pulumi는 거의 모든 프로그래밍 언어를 사용하여 인프라를 정의할 수 있도록 허용합니다.

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

저는 이를 말하기에 극도로 정확하지는 않고 큰 저평가일 것이라는 것을 알고 있지만, 한 문장으로 Pulumi가 무엇인지 배우고 싶은 초보자들을 위해 간단히 설명하자면: Pulumi는 한 마디로 말하면 Python/Go/Java/Node.js 등에서의 Terraform이라고 볼 수 있어요.

## 2.1. Pulumi의 간단한 역사

Pulumi는 2018년 처음 오픈 소스로 공개되었는데, 그리 새로운 것은 아니지만 현재의 버전인 v3는 이전 버전과 비교해 몇 가지 중요한 변경 사항이 있는데요, 이는 2021년에 출시되었고, 그 이후로 사람들이 이를 이전보다 훨씬 더 많이 주목하기 시작했습니다 (믿지 못하겠다면 구글 트렌드를 확인해보세요.)

오늘날에는 Terraform과 비교할 때, Pulumi는 구글 검색 결과에서 훨씬 더 적은 관심을 끌고 있습니다. Pulumi의 블로그에 따르면, 2023년에 고객 수가 2000명 미만으로, 이는 Terraform의 주문량보다 훨씬 적다고 합니다 (인터넷의 여러 데이터 소스에 따르면.)

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

그래서, 이 프로그램은 새로운 기술로 널리 받아들여지진 않아요. 그럼에도 불구하고 Pulumi를 선택한 이유는 무엇일까요? 그 이유는 바로 Pulumi가 가진 강력한 기능 때문입니다: 다중 언어 지원입니다.

## 2.2. Pulumi: 다중 언어 지원

만약 Terraform을 선택한다면, HCL을 작성해야 합니다. 많은 사람들에게는 부담스러울 수 있습니다.

예를 들어, 주로 Go로 프로그램을 작성하고 가끔 클라우드 인프라를 관리하는 백엔드 엔지니어들은, 인프라를 Go로 정의할 수 있는 상황에서 왜 HCL을 배워야 할까요?

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

프론트엔드 및 풀스택 엔지니어들도 JavaScript/TypeScript로 주로 코딩하는 경우가 많은데, 이미 사용 중인 기술에 HCL을 배우는 것은 부담이 될 수도 있을 뿐만 아니라 기술 스택을 복잡하게 만드는 요인이 됩니다. 보통 기술 스택을 고려할 때는 더 많이 사용하는 것보다는 오히려 덜 사용하는 것이 더 나을 때가 많습니다.

Pulumi에서는 이야기가 달라집니다. 다음 중 하나의 언어로 인프라를 정의할 수 있습니다:

- TypeScript (Node.js)
- Python
- C#, VB, F# (.NET)
- Go
- Java
- YAML

예를 들어, 이전 섹션에서 언급된 AWS S3 버킷을 Pulumi를 사용해 Python으로 작성하려면 간단히 다음과 같이 작성하면 됩니다:

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

```js
import pulumi
import pulumi_aws as aws

bucket = aws.s3.Bucket("bucket",
    acl="private",
    tags={
        "Environment": "Dev",
        "Name": "My bucket",
    })
```

혹은 파이썬이 익숙치 않고 TypeScript로 작성하고 싶다면:

```js
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const bucket = new aws.s3.Bucket("bucket", {
  acl: "private",
  tags: {
    Environment: "Dev",
    Name: "My bucket",
  },
});
```

여기 완성!

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

## 2.3. Pulumi의 내부 동작

요약하자면, Pulumi는 Terraform과 동일한 방식으로 작동합니다: 두 도구 모두 언급한 코어 플러그인 아키텍처를 갖고 있습니다.

Terraform과 마찬가지로, Pulumi도 내부적으로 클라우드 SDK 및 라이브러리를 사용합니다. Pulumi는 플러그인 자체가 여러 언어로 구현되어 있기 때문에 여러 언어를 지원합니다. 예를 들어, 여기서 Pulumi의 AWS 프로바이더를 보면, 서로 다른 언어로 여러 구현이 있음을 볼 수 있습니다. 이런 이유로 Python으로 인프라를 정의할 때는 `import pulumi_aws as aws`와 같이 사용하고, TypeScript로 사용할 때는 Node.js용으로 전혀 다른 패키지를 사용합니다: `import * as aws from "@pulumi/aws";`.

언급할 가치가 있는 것은 AWS Cloud Development Kit (AWS CDK) 및 CDK for Terraform (CDKTF)와 같이 여러 언어로 인프라 코드를 정의할 수 있는 다른 옵션이 있지만, 본질적으로, 이러한 다중 언어 지원은 완전히 다른 방법으로 구현됩니다: AWS CDK와 CDKTF는 어떤 언어의 코드도 JavaScript 클래스와 자연스럽게 상호 작용할 수 있도록 하는 라이브러리 jsii에 의존합니다. 따라서 AWS CDK (그리고 CDKTF)는 TypeScript 코드를 다양한 언어로 변환하여 다국어 (여러 언어를 지원하는 것을 가리키는 어려운 용어입니다)를 지원하도록 하는 jsii를 사용하지만, Pulumi는 내부적으로 다양한 언어로 작성된 이러한 프로바이더만 갖고 있습니다.

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

# 3. Pulumi 대 Terraform: 주요 유사점과 차이점

## 3.1. Pulumi와 Terraform의 주요 유사점

가장 큰 유사점은 작동 방식인 코어 플러그인 아키텍처입니다.

우선, 핵심은, 혹은 다른 말로 하면, 실제로 상태입니다. 두 도구 모두 상태를 유지하기 위해 핵심을 사용하여 현재 인프라 및 코드로 정의된 내용에 따라 상태를 계산할 수 있도록 하고, 인프라를 정의된 상태로 가져오기 위한 연산 계획을 생성하는 데 사용합니다. 그리고 두 도구 모두 상태를 로컬, S3 버킷, 또는 클라우드/SaaS 솔루션 등 다양한 위치에 저장할 수 있습니다.

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

두 번째로, 플러그인을 사용합니다. 앞에서 언급했듯이, 둘 다 상태를 관리하고 변경을 수행하기 위해 핵심 플러그인 아키텍처를 사용합니다.

## 3.2. Pulumi와 Terraform의 주요 차이점

가장 큰 차이는 물론 다중 언어 지원입니다.

Terraform은 HCL을 사용하는데, 이는 완전한 프로그래밍 언어가 아니라 구성 언어에 불과합니다. 그러므로 본질적으로 다른 프로그래밍 언어들이 할 수 있는 것들을 모두 할 수는 없지만, 앞에서 언급한 바와 같이, 이는 당신에게 좋은 점일 수 있습니다. 왜냐하면 읽기 쉽고 간단한 것이 더 나은 경우가 있기 때문입니다.

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

Pulumi는 다양한 언어를 지원하며 이것은 단연 가장 중요한 차이점입니다. 어떤 이유로든 Python/Go/Java 또는 다른 주요 프로그래밍 언어로 인프라를 정의해야하는 경우, Terraform와 Pulumi 사이에는 경쟁이 없습니다.

언급할 가치가 있는 또 다른 차이점은 Pulumi를 사용하여 인프라 코드를 테스트할 수 있는 점입니다. Pulumi를 사용하면 프로그래밍 언어와 함께 제공되는 단위 테스트 및 기능 테스트와 도구를 활용할 수 있습니다. 반면 Terraform에서는 테스트를 실행하는 방법이 주로 통합 테스트로 제한됩니다.

물론 Terraform과 Pulumi 사이에는 다양한 미세한 기능 차이가 있습니다 (Pulumi의 공식 문서가 수십 개 이상을 찾는 데 놀라지 마세요), 하지만 이들은 실제로 결정적인 요인이 되지는 않습니다. 예를 들어, 오픈 소스 라이선스나 상태의 기본 구성이 가장 우선시해야 할 목록 상단에 있지는 않을 것입니다.

# 4. Pulumi에 대한 오해들

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

만약 이 블로그를 읽고 계신다면, 아마도 Pulumi 대 Terraform에 관한 첫 번째 글은 아니실 것입니다. 아마도 조사를 많이 해보셨고 이에 대한 장단점을 많이 읽으신 것 같습니다.

그러나 다른 많은 기사들에서 언급된 Pulumi에 관한 몇 가지 흔히 언급되는 단점들이 실제로 오해되었거나 더 이상 사실이 아닌 것들이 있다고 생각합니다. 저는 그것들을 다루어서 Pulumi에 대해 공정하고 정확한 시각을 얻을 수 있도록 하고 싶습니다. 이것은 중요해서 별도의 챕터를 할당해야할 만큼 중요합니다.

## 4.1. 오해 1: Pulumi 문서 부족

이제는 사실이 아닙니다 (아마도 처음 시작했을 때 그랬을 수도 있습니다).

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

Pulumi는 설치 방법과 시작하는 방법에 대한 매우 상세하고 단계별 설명서가 있어요. 더 깊이 알고 싶다면, Pulumi의 핵심 개념에 대한 훌륭한 섹션이 있어요. 게다가 Pulumi는 여러 클라우드 제공 업체에 대한 상세한 문서와 예제를 제공해요.

플러그인/제공업체에 대해서 특정 제공업체를 검색하면, AWS와 같은 인기 있는 업체 또는 PagerDuty Pulumi 제공업체와 같은 인기 없는 업체와 비교하여 Terraform의 문서와 비교하면 "Pulumi 문서가 부족하다"는 결론에 도달하지 않을 거예요.

## 4.2. 오해 2: Pulumi 커뮤니티가 작다

더 이상 사실이 아니에요, 다시 말해요.

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

Pulumi의 공식 블로그에 따르면, 2000명의 고객과 15만 명의 최종 사용자가 있습니다. GitHub에 따르면, 주요 리포 pulumi/pulumi만 1.8만 개 이상의 스타를 받았으며, 1.9천개의 이슈와 184개의 오픈된 풀 리퀘스트가 있습니다.

어떤 지표를 사용하더라도, 커뮤니티의 크기를 측정하는 기준이 무엇이든, Pulumi의 커뮤니티는 분명히 큽니다. 테라폼보다는 작지만, 절대적인 의미에서는 절대적으로 작은 커뮤니티가 아닙니다.

## 4.3. 오해 3: Pulumi는 모든 상황에 적용할 수 없다

다시 말하지만, 그렇지 않습니다.

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

많은 사람들은 Pulumi가 더 최근에 나왔기 때문에 보편적으로 적용되지 않는다고 결론 지을 수 있지만, 실제로는 그렇지 않습니다.

프로그래밍 언어에 대해 이야기할 때, Pulumi는 사실 주요 언어 대부분을 지원합니다.

플러그인 및 프로바이더에 대해 이야기할 때, 새로운 도구일수록 사용 기간이 짧았기 때문에 플러그인이 적을 것으로 생각할 수 있지만, 현실은 이와 일치하지 않습니다. Pulumi는 주요 공개 클라우드 프로바이더를 모두 지원하며, 테라폼과 마찬가지로 팀 및 사용자 관리와 같은 비 클라우드 인프라 관리에서도 넓게 대상으로 합니다.

예를 들어, 대기업에서는 GitHub, PagerDuty, DataDog, Sentry 등과 같은 여러 DevOps 도구를 관리해야 할 수 있습니다. 아마도 이러한 도구들의 사용자/팀/권한을 IaC를 사용하여 관리하고 싶을 수도 있습니다. 이 경우, 이러한 도구들의 플러그인을 검색하면, Pulumi가 테라폼처럼 모두 갖추고 있다는 것에 놀랄 것입니다. 이 도구들은 널리 사용되는 것이 아니라는 점에서도 클라우드와 관련된 기존 플러그인과는 조금 다를 수 있습니다.

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

위에서 언급했듯이, Pulumi/Terraform을 객관적으로 평가하고 "문서가 부족하다"거나 "커뮤니티가 작다"는 곳에서 읽었기 때문에 Pulumi를 부정적으로 생각하지 않았으면 좋겠어요. "최신 버전은 보편성이 떨어진다"고 생각할 필요도 없습니다.

# 5. Pulumi 대 Terraform: 현실에 가까운 비교

이전 섹션에서 Terraform과 Pulumi의 구문과 사용법을 보여주기 위해 몇 가지 코드 조각을 제공했지만, 이 코드들은 현실 세계에서 의미가 있는 것이 아니라 너무 단순하고 "Hello, World" 수준이라는 것을 의미합니다. 현실에서는 대부분의 상황이 지수적으로 커지기 때문에 코드를 간단하고 가독성 있게 유지하는 것과 동시에 확장 가능하게 유지하는 것이 어렵다는 것을 의미합니다.

그러므로 다음으로 Pulumi 대 Terraform을 살펴보고 이러한 현실 세계의 도전에 대해 어떻게 다루는지 비교해 보겠습니다.

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

# 5.1. Pulumi 대 Terraform: 코드 구조, 가독성 및 확장성

Terraform의 경우, 모듈을 정의하고 재사용하여 최대한의 코드 재사용성을 달성할 수 있습니다. 전형적인 단일 모놀리식 Terraform 저장소는 다음과 같이 보일 수 있습니다:

```js
.
├── dev
│   ├── config.tf
│   ├── main.tf
│   ├── output.tf
│   └── variables.tf
├── modules
│   ├── module_a
│   └── module_b
└── prod
    ├── config.tf
    ├── main.tf
    ├── output.tf
    └── variables.tf
```

단일 저장소의 강점은 아주 사람이 읽기 쉽고 설명 없이도 쉽게 이해할 수 있다는 것입니다. 그리고 Terraform의 특성으로 인해 폴더 구조의 두 수준을 가지고 있으며, 최대 세 수준까지, 이 모든 것은 한눈에 전체적인 내용을 파악하기 쉽고 쉽게 관리할 수 있다는 것을 의미합니다. 또한 다른 환경을 생성하는 것은 단순히 동일한 저장소에 "test"라는 이름의 추가 폴더를 생성하는 것만큼 복잡하지 않습니다.

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

위의 깨끗한 코드 기반을 바탕으로 프로젝트가 커질 때 여러 가지 개선 방법이 있습니다: 인프라의 다른 부분을 별도의 리포지토리로 분리; 모듈을 다른 하나 또는 몇 개의 리포지토리로 이동; 다른 환경을 다른 리포지토리로 넣습니다. 모든 선택지는 유연하며 모두 새로운 리포지토리를 생성하여 좀 더 깨끗하고 이해하기 쉬운 디렉터리 구조를 만들어냅니다.

Pulumi를 사용하면 상황이 조금 복잡해질 수 있습니다. 전형적인 단일 모놀리식 Pulumi 프로젝트는 다음과 같이 보일 수 있습니다:

```js
.
├── Pulumi.dev.yml
├── Pulumi.prod.yml
├── Pulumi.yml
├── api-gateway
│   ├── index.ts
│   └── micro-service-01
│       └── index.ts
├── database
│   └── table-01.ts
├── index.ts
├── package-lock.json
├── package.json
├── sns
│   └── topics.ts
└── queues.ts
├── pkg
│   └──application
│     └── app.go
└── .etc
```

Terraform과 유사하게, 프론트엔드 또는 백엔드 프로젝트에서 작업한 것과 마찬가지로 공통적인 내용을 패키지로 묶을 수 있습니다.

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

프로젝트가 커지면 프로젝트를 별도로 관리되는 작은 프로젝트로 분할하는 '마이크로 스택' 접근 방식을 사용할 수 있습니다. 각 프로젝트는 위에서와 같을 수 있습니다.

그러나 사물이 커지면 디렉토리 구조가 훨씬 더 복잡해지고 디렉토리가 더 많아지며 수준이 더 많아져 혼란스러울 수 있습니다. Java나 여러분이 참여한 실제 프로젝트를 상상해 보세요. 그 프로젝트 전체를 빠르게 이해하기 쉬운가요? 아니죠, 너무 많은 폴더와 수준의 디렉토리가 있어 어느 것이 무엇이며 어디서 시작해야 하는지조차 모를 수 있습니다.

Pulumi의 가장 강력한 장점은 다국어 지원이지만, 큰 힘에는 큰 책임이 따릅니다. 코드를 이해하고 유지하는 데 도움이 되는 방식으로 조직화하는 것이 중요합니다. 이는 사용하는 도구에 상관없이 사실입니다.

## 5.2. Pulumi 대 Terraform: 통합

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

대부분의 경우 IaC가 끝나면 모든 작업이 끝나는 것은 아닙니다. 인프라 구성 부분은 CI/CD 파이프라인과 같은 다른 요소와 통합되어야 합니다. 다행히도 Terraform과 Pulumi는 변경 사항을 배포하기 위해 한 번의 명령만 필요하므로 통합하기에 이상적입니다. 그러나 차이점이 있습니다.

일부 경우에는 IaC 파이프라인이 시작하기 전에 뭔가를 수행하고 싶을 수 있습니다.

예를 들어 사용자, 팀, 멤버십 및 권한을 관리하기 위해 IaC를 사용하고자 한다고 가정해 봅시다. 새로운 사용자를 추가할 때 코드 베이스를 열어서 복사하여 수정하고 커밋하는 것은 너무 번거롭습니다. 어딘가에 사용자 목록이 저장되어 있고, 해당 파일을 검색하여 일부 템플릿 도구를 사용하여 IaC 코드를 자동으로 생성할 수 있다고 가정해 보겠습니다.

이 경우 Terraform의 경우 추가 도구인 Python 스크립트를 사용하여 파일을 다운로드하고 구문 분석하고 템플릿을 적용한 다음 생성된 IaC 파일을 커밋하고 IaC 파이프라인을 실행하기 전에 수행해야 할 수 있습니다. Pulumi의 경우에는 하나의 패스로 모든 작업을 수행할 수 있기 때문에 상황이 훨씬 간단해질 수 있습니다. 원하는 프로그래밍 언어를 사용하여 파일을 다운로드/구문 분석하고, 동일한 언어를 사용하여 간단한 for 루프를 사용하여 작업을 생성할 수 있습니다.

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

적으로 IaC가 완료된 후에 무언가를 수행하고 싶을 수도 있습니다. 예를 들어 IaC 부분의 출력에는 Helm 차트에서 사용하고 싶은 로드 밸런서 URL이 포함될 수 있습니다. 다시 말하지만, Terraform을 사용하면 아마도 스크립트를 실행해야 하는 또 다른 단계가 필요할 것입니다. 그러나 Pulumi를 사용하면 IaC 코드 이후에도 해당 작업을 수행하기 위해 계속 코드 작성을 할 수 있습니다 (여기에 일부 예시가 있습니다).

간단히 말하면, Terraform과 스크립트를 통합하는 데 어려움을 겪고 있다면, Pulumi를 시도해볼 가치가 있을 것입니다.

## 5.3. Pulumi 대 Terraform: 보안

보안은 코드에 항상 중요한 주제이며, 인프라 코드도 마찬가지입니다.

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

코드 보안을 위해 가장 기본적인 원칙은 아마도 코드 내에서 비밀을 평문으로 저장하지 않는 것입니다. 이 부분에서 Terraform 및 Pulumi가 잘 수행됩니다. Terraform은 다양한 시크릿 매니저와 통합할 수 있고, Pulumi에서도 시크릿 매니저로부터 읽어오는 것이 한 줄의 코드로 쉽습니다. 예를 들어, 여기에 Terraform에서 시크릿을 관리하는 블로그가 있습니다.

코드 보안에 대해 더 말씀드릴 수 있습니다: Terraform을 사용하면 HCL로 작성하며, 구성 코드는 API 호출로 변환되어 리소스를 생성, 읽기, 업데이트 및 삭제합니다. 물론, Terraform 코어 및 플러그인 자체에 보안 문제와 CVE가 있을 수 있지만, 다른 IaC 옵션에 대해 동일한 말을 할 수 있습니다. Pulumi의 경우, IaC 코드를 여러 언어로 작성할 수 있고 더 많은 작업을 수행할 수 있기 때문에 공격 대상이 더욱 확대될 수 있습니다. 이는 Pulumi에 대한 단점으로 보일 수 있지만 다행히도 보안을 강화하기 위한 SAST 및 DAST와 같은 최고의 실천 방법과 도구가 있습니다.

Terraform 및 IaC 보안에 관심이 있다면 여기에 Terraform을 사용한 IaC 보안에 관한 블로그가 있고, 여기에는 Terraform의 일부 모베스트 프랙티스에 대한 블로그가 있습니다 (걱정하지 마세요, 이전에 읽어본 것과는 다를 것입니다).

코드 보안을 제외하고, IaC 도구는 인프라를 관리하며 중요한 정보는 실제로 상태에 저장되기 때문에 상태의 보안도 중요합니다. Terraform 및 Pulumi는 민감한 정보를 상태에 평문으로 인쇄되지 않도록 암호화할 수 있으며, 두 도구 모두 상태를 암호화하여 저장하기 위한 다양한 백엔드를 지원합니다.

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

이 섹션 마무리를 위한 몇 가지 권장 사항:

- IaC 도구로 민감한 데이터를 관리하는 경우(데이터베이스 암호, 사용자 암호 또는 개인 키 등), 상태 자체를 민감한 데이터로 취급해야 합니다. 즉,
- 원격으로 상태를 저장하면 더 나은 보안을 제공할 수 있으므로 상태에 로컬 디스크를 사용하지 않도록 하십시오.
- 휴식 중인 상태 데이터를 암호화할 수 있는 백엔드를 사용하세요.

# 6. Summary: Choosing Your IaC Tool

## 6.1. Comparison Table

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

아래의 표를 통해 각 도구의 주요 기능을 빠르게 비교해 보겠습니다:

![Comparison Table](/assets/img/2024-05-16-PulumiVSTerraformTheDefinitiveGuidetoChoosingYourIaCTool_1.png)

## 6.2. IaC 도구 선택하기

더 즐겁게 선택을 할 수 있도록, 다음의 플로우 차트를 만들어 봤어요:

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

- IaC를 시작해보려고 합니까? 예: 2번으로 이동. 아니요: 7번으로 이동.
- 더 적은 것이 더 나은 것이라고 생각합니까? 예: 11번으로 이동. 아니요: 3번으로 이동.
- DevOps 엔지니어이십니까? 예: 5번으로 이동. 아니요: 4번으로 이동.
- 가끔 인프라를 관리하는 개발자이십니까? 예: 5번으로 이동. 아니요: 11번으로 이동.
- 이미 JavaScript/Python/Go/Java로 코딩을 하고 계십니까? 예: 12번으로 이동. 아니요: 6번으로 이동.
- 새로운 구성 언어를 배우고 싶으십니까? (새 프로그래밍 언어를 배우는 것보다 훨씬 어렵지 않습니다) 예: 11번으로 이동. 아니요: 12번으로 이동.
- 이미 Terraform을 사용해보신 적이 있습니까? 예: 8번으로 이동. 아니요: 9번으로 이동.
- Terraform을 사용하며 고민거리가 있습니까? 예를 들어, HCL에 만족스럽지 않거나 더 복잡한 작업을 수행하고 싶은 경우 등? 예: 10번으로 이동. 아니요: 11번으로 이동.
- Terraform을 시도해보세요.
- Pulumi를 시도해보세요.
- Terraform을 계속 사용하세요.
- 죄송합니다, 둘 다 적합하지 않습니다.

## 6.3. 작업에 적합한 올바른 도구를 선택하는 방법

장난은 좋지만, 올바른 도구를 선택하는 몇 가지 팁을 안내해드릴게요:

- 여전히 앱 코드 작성이 주 업무인데 인프라 코드를 부분적으로 관리해야 한다면 Pulumi가 더 나은 선택이 될 수 있습니다.
- Terraform에 경험이 있고 불만족스러운 점이 있다면, Pulumi를 사용해보세요. 안심하세요, Terraform이 할 수 있는 중요한 것은 Pulumi로 할 수 없는 게 없습니다.
- 한 가지 전세되는 도구를 선택할 필요는 없습니다. Pulumi 대 Terraform은 경쟁이 아니에요. 어떤 것이 더 나은지, 어떤 것이 잘못된지 결정해야 한다는 것은 아니에요. 사실 둘 다 사용할 수 있습니다. 프로젝트가 성장하면 단일 인프라 저장소를 관리하기 어려워지고, 마이크로서비스와 같은 프로젝트에서는 각 부분에 적합한 도구를 사용함으로써 최선을 다할 수 있습니다. 올바른 도구를 선택하면 일부 작업을 더 쉽게 수행할 수 있습니다.
- 직접 체험해보세요. 블로그와 기사를 모두 읽어도 괜찮지만, 마지막으로 두 도구를 간단히 시도해보면 진정한 필요를 알게 될 거예요.

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

# FAQ

## Q: Terraform은 오래된 기술인가요?

네/아니요.

네, Terraform은 많은 해동안 사용되어 왔고, 그만큼 자체적인 한계도 있습니다.

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

하지만, HCL을 사용해야 하는 점을 제외하면, Terraform은 거의 모든 것을 처리하고 잘 다루어냅니다.

Terraform은 이제 CDKTF를 사용할 수 있어 다른 프로그래밍 언어로 인프라를 정의할 수 있다는 점을 언급할 가치가 있습니다.

## 질문: Pulumi가 Terraform보다 나은가요?

그렇고 아니요.

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

네, 실제로 인프라를 정의하기 위해 다른 프로그래밍 언어를 선택할 수 있습니다.

하지만 전체 프로그래밍 언어로 된 큰 프로젝트는 간단한 구성 언어보다 더 명확하지 않고 읽기 어려울 수 있습니다.

각 도구마다 장점이 있으며 둘 중 어떤 것이 뛰어나다고 말할 수는 없습니다.

## 질문: Pulumi가 Terraform이 할 수 있는 모든 것을 할 수 있나요?

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

예.

음, 그래 별로. 각각에는 각각의 특징과 장점이 있지만, IaC에 관한 이야기를 할 때 기본적으로 찾는 기능은 두 도구 모두 갖추고 있습니다. Pulumi를 선택한 후 테라폼이 훌륭하게 수행하는 어떤 마법 같은 기능을 할 수 없을 때 곤경에 처하지 않을 것입니다.

## Q: Pulumi의 단점은 무엇인가요?

솔직히 말해서, 아무것도 없습니다.

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

해당하는 작업을 아주 잘 수행하며, 선택한 프로그래밍 언어로 할 수 있어요. 게다가 문서와 커뮤니티도 친절해요.

Pulumi에 대해 조금 꼭 언급하자면, Python, Go 또는 JavaScript로 큰 코드베이스를 관리하는 것은 HCL 형식의 구성 파일 저장소보다 훨씬 까다롭다는 점이죠. 하지만 이 도전을 가져온 건 Pulumi가 아니라 프로그래밍 부분입니다. 또한, HCL을 사용한다고 해서 코드베이스가 자동으로 읽기 쉽고 관리하기 쉬워지는 것은 아니에요. 분명히 혼란스럽게 만들 수 있어요. 결국 깨끗한 코드를 작성하고 유지하는 것은 프로그래머들의 몫이에요.
