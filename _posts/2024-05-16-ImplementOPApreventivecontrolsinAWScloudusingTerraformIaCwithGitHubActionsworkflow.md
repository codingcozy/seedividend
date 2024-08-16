---
title: "AWS 클라우드에서 Terraform IaC를 사용하여 OPA 예방 통제를 구현하는 방법GitHub Actions 워크플로우 포함"
description: ""
coverImage: "/assets/img/2024-05-16-ImplementOPApreventivecontrolsinAWScloudusingTerraformIaCwithGitHubActionsworkflow_0.png"
date: 2024-05-16 16:53
ogImage: 
  url: /assets/img/2024-05-16-ImplementOPApreventivecontrolsinAWScloudusingTerraformIaCwithGitHubActionsworkflow_0.png
tag: Tech
originalTitle: "Implement OPA preventive controls in AWS cloud using Terraform IaC with GitHub Actions workflow."
link: "https://medium.com/@anshubathla86/implement-opa-preventive-controls-in-aws-cloud-using-terraform-iac-with-github-actions-workflow-8081b07e9161"
isUpdated: true
---




이 절차에서는 테라폼을 인프라스트럭처-애즈-코드(IaC)로 사용하는 동안 GitHub Actions와 함께 OPA(Open Policy Agent)를 활용한 Policy-as-Code 시프트-레프트 전략을 구현하는 방법을 보여드리고 있습니다.

GitHub Actions는 지속적 통합 및 지속적 전달(CI/CD) 플랫폼으로, 빌드, 테스트, 배포 파이프라인을 자동화할 수 있습니다. 레포지토리로 풀 리퀘스트(PR)를 생성하여 머지된 풀 리퀘스트를 프로덕션으로 배포하는 등의 워크플로우를 생성할 수 있습니다.

OPA는 공개 소스이고 일반용도의 정책 엔진으로, 어떠한 도메인에 대해 정책-애즈-코드를 적용하기 위한 공통 프레임워크를 제공하기 위해 개발되었습니다. OPA는 의사결정과 정책 강제를 분리하는 방식으로 작동합니다. 정책 결정이 필요한 경우 구조화된 데이터(예: JSON)를 입력으로 OPA에 쿼리하면 OPA가 결정을 반환합니다.

OPA 정책은 해당 내용을 나타내는 Terraform 실행을 방지하거나 강제하는 가드레일입니다. 이러한 정책은 버전 컨트롤 시스템(VCS)에 그룹화되어, 해당 사례에서는 GitHub을 통해 GitHub Actions 워크플로우를 사용하여 시행될 수 있습니다. 이러한 정책은 또한 OPA 정책 대상을 특정 자원에 대한 확인을 위해 예외 요건을 정의할 것입니다.

<div class="content-ad"></div>

# 선행 조건

- 인프라스트럭처를 코드로 배포하는 데 사용되는 Terraform 오픈 소스 소프트웨어.
- 버전 관리 시스템으로 사용하기 위한 GitHub 계정.
- 활성화된 AWS 계정.

# 대상 아키텍처

![이미지](/assets/img/2024-05-16-ImplementOPApreventivecontrolsinAWScloudusingTerraformIaCwithGitHubActionsworkflow_0.png)

<div class="content-ad"></div>

GitHub Actions를 사용하여 코드가 한 환경에서 다른 환경으로 푸시될 때 수행해야 할 작업을 정의하는 Workflow에 사용되었습니다. 예를 들어 사용자가 낮은 환경에서 높은 환경으로 코드를 커밋하기 위해 Pull Request를 올린 경우, "dev"에서 "main" 브랜치로 예를 들면 코드를 커밋하는 경우, GitHub Actions에서 정의된 CI/CD Workflow가 트리거됩니다. 다이어그램에 표시된 대로, 첫 번째 단계에서 "Terraform Plan"이 생성됩니다. "Terraform Plan" 출력물은 JSON 형식으로 변환되어 OPA 정책에 대해 확인됩니다. 정책 중 하나라도 실패하면 실행이 실패합니다. 정책 평가가 성공하면 사용자는 "Terraform Apply"로 대상 AWS 계정에 필요한 리소스를 생성할 수 있습니다. 리소스가 어떤 OPA 정책에 대해 확인을 건너뛰도록 태그가 지정된 경우, 그러한 리소스에 대해 정책을 평가하지 않습니다.

아래는 Workflow를 트리거하면 GitHub Actions에서 수행되는 단계입니다. CICD 파이프라인에서 발생하는 단계별 과정을 확인할 수 있습니다.

![이미지](/assets/img/2024-05-16-ImplementOPApreventivecontrolsinAWScloudusingTerraformIaCwithGitHubActionsworkflow_1.png)

# 자동화 및 확장

<div class="content-ad"></div>

OPA 정책 검사는 각 리포지토리에서 Github Actions 워크플로우를 활용하여 확장할 수 있습니다. 이를 통해 CICD 파이프라인에서 구성 규정 준수를 자동화할 수 있습니다. GitHub reusable workflows는 GitHub Actions의 기능 중 하나로, CI/CD(지속적 통합 및 지속적 배포)에 강력한 도구입니다. 이를 통해 여러 리포지토리에서 사용할 수 있는 워크플로우를 생성할 수 있어 코드를 복사하여 붙이는 필요성을 줄이고 최상의 관행을 촉진할 수 있습니다.

# GitHub Actions 워크플로우 설정 단계

## Terraform 구성을 호스팅하기 위한 GitHub 리포지토리 설정

- GitHub에서 리포지토리를 생성합니다.
- AWS 샘플에서 Terraform 인프라 코드를 위한 policy-as-code/OPA에서 "policy" 디렉터리를 복사합니다. 새로 생성한 리포지토리에 "policy" 폴더를 놓습니다.
- 새로 생성한 리포지토리에 Terraform 배포 코드가 포함된 "main.tf"를 추가합니다.
- 변경 내용을 스테이징하고 커밋한 후 리포지토리에 푸시합니다.

<div class="content-ad"></div>

## AWS 계정과 GitHub을 연결하도록 OIDC를 구성하세요.

- AWS 계정 내 자원에 액세스하고 배포할 수 있도록 GitHub Action 워크플로우에 OIDC를 사용하는 방법을 따르세요.

## GitHub Actions 구성

- GitHub 레포지토리에서 .github/workflows 디렉토리를 생성하세요.
- .github/workflows 디렉토리 내에 github-actions-demo.yml이라는 파일을 생성하세요.
- GitHub Actions 워크플로우 YAML 파일 아래 코드 부분의 YAML 내용을 github-actions-demo.yml 파일로 복사하세요.

<div class="content-ad"></div>


name: Terraform 유효성 검증

on:
  pull_request:
    branches:
      - main
      
permissions:
      id-token: write   # JWT를 요청하는 데 필요합니다
      contents: read    # actions/checkout에 필요합니다

jobs:
  terraform:
    runs-on: ubuntu-latest

    steps:
    - name: 리포지토리 체크아웃
      uses: actions/checkout@v3
      with:
        fetch-depth: 0
    - name: Conftest 설정
      uses: princespaghetti/setup-conftest@v1
      
    - name: Terraform 설정
      uses: hashicorp/setup-terraform@v2

    - name: AWS 자격 증명 구성
      uses: aws-actions/configure-aws-credentials@v2
      with:
        role-to-assume: arn:aws:iam::XXXXXXXXXXXX:role/github_oidc_role
        role-session-name: GitHub_to_AWS_via_Federated_OIDC
        aws-region: us-east-1
   
    - name: Sts GetCallerIdentity
      run: |
        aws sts get-caller-identity

    - name: Terraform 초기화
      run: terraform init

    - name: Terraform 유효성 검사
      run: terraform validate

    - name: Terraform Plan JSON 출력 생성
      run: |
        terraform plan -out="plan.tfplan"
        terraform show -json plan.tfplan | grep -v "::debug::" | tail -n +2 > plan.json
        pwd

    - name: OPA 설치
      run: |
        curl -L -o opa https://openpolicyagent.org/downloads/latest/opa_linux_amd64
        chmod 755 ./opa
        sudo mv opa /usr/local/bin/

    - name: Rego 정책 평가
      id: evaluate_policies
      run: |
       EXIT_CODE=0
       conftest test /home/runner/work/terraform-opa-testing/terraform-opa-testing/plan.json -o table --all-namespaces -p policy/ || EXIT_CODE=$?
       echo "::set-output name=exit_code::$EXIT_CODE"

    - name: OPA 규칙 평가 실패
      if: ${{ steps.evaluate_policies.outputs.exit_code != 0 }}
      run: |
       echo "AWS 계정에 배포하는 Terraform 리소스가 정의된 표준을 준수하지 않습니다. "Evaluate Rego Policies"를 확인하여 준수되지 않는 구성을 찾고 코드를 수정하십시오."
       exit 1

    - name: Terraform 적용
      if: steps.evaluate_policies.outputs.exit_code == 0
      run: terraform apply -auto-approve


4. 변경 사항을 "dev" 브랜치에서 "Main" 브랜치로 병합하기 위해 Pull Request가 올라왔을 때 워크플로우가 트리거됩니다.

5. AWS 계정에 배포하는 Terraform 코드에서 위반 사항이 발견되지 않으면 워크플로우가 성공적으로 실행됩니다. 그렇지 않으면 "AWS 계정에 배포하는 Terraform 리소스가 정의된 표준을 준수하지 않습니다. "Evaluate Rego Policies"를 확인하여 준수되지 않는 구성을 찾고 코드를 수정하십시오."라는 오류 메시지와 함께 워크플로우가 실패합니다.

## 관련 자료

<div class="content-ad"></div>

빠른 OPA 소개

OPA와 Terraform

Terraform용 OPA Rules 공개 저장소

OPA 정책 참조

<div class="content-ad"></div>

OPA 동작 방식

링크드인에서 연결하면 좋겠어요.