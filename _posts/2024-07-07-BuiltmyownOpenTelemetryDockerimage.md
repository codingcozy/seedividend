---
title: "나만의 OpenTelemetry Docker 이미지 제작 방법"
description: ""
coverImage: "/assets/img/2024-07-07-BuiltmyownOpenTelemetryDockerimage_0.png"
date: 2024-07-07 23:36
ogImage: 
  url: /assets/img/2024-07-07-BuiltmyownOpenTelemetryDockerimage_0.png
tag: Tech
originalTitle: "Built my own OpenTelemetry Docker image"
link: "https://medium.com/@lyd0ng/built-my-own-opentelemetry-docker-image-dc6f35257c80"
---


오픈텔레메트리는 요즘 로깅, 메트릭 및 추적에 대한 최신 유행어가 되었어요. 간단히 말하면, '관측 가능성'입니다. 저는 ECS에서 실행 중인 애플리케이션을 가지고 있는데, 모든 ECS 컨테이너가 로그를 보낼 수 있는 중앙 집중식 오픈텔레메트리 수집기를 개발하고 싶어요. 이렇게 하면 비용을 줄이고 각 ECS 서비스마다 하나의 사이드카 OTel 수신기를 추가 관리할 필요도 없어져요.

먼저, 중요한 구성 요소만 포함된 기본 OTel 이미지를 핵심 계정에서 빌드하고 이를 내 애플리케이션 계정과 공유하기로 결정했어요. 이로써 기본 OTel 이미지의 크기가 절반으로 줄어들었고, 애플리케이션 계정의 OTel 수집기 이미지 빌드 시간도 크게 단축되었답니다. 이제, 핵심 계정의 기본 이미지를 참조하고 Dockerfile에 구성 파일을 복사하기만 하면 돼요. 더 많은 정보는 아래에서 확인해보세요 :)

[여기에 표시할 이미지에 대한 대체 텍스트](/assets/img/2024-07-07-BuiltmyownOpenTelemetryDockerimage_0.png)

아래는 핵심 계정에 ECR 저장소를 설정하는 CloudFormation 템플릿입니다. 여기에 기본 OTel 이미지가 저장될 거예요. 저장소 정책과 함께 라이프사이클 정책도 구성해놓았어요. 이를 통해 한 번에 5개 이상의 이미지를 저장하지 않도록 하여 비용을 절약하고 있습니다.

<div class="content-ad"></div>

```js
AWSTemplateFormatVersion: "2010-09-09"
Description: OpenTelemetry Sidecar용 ECR
Parameters:
  RepositoryName:
    Type: String
    Description: ECR 이름
    Default: “org-opentelemetry”

Resources:
  Repository:
    Properties:
      RepositoryName: !Ref "RepositoryName"
      RepositoryPolicyText:
        Statement:
          - Action:
              - ecr:GetDownloadUrlForLayer
              - ecr:BatchGetImage
              - ecr:BatchCheckLayerAvailability
            Effect: Allow
            Principal: "*"
            Condition:
              StringEquals:
                aws:PrincipalOrgID:
                  - "ou-xyz"
          - Action:
              - ecr:PutImage
              - ecr:InitiateLayerUpload
              - ecr:UploadLayerPart
              - ecr:CompleteLayerUpload
            Effect: Allow
            Principal:
              AWS: !Sub "arn:aws:iam::${AWS::AccountId}:root"
        Version: "2012-10-17"
      ImageScanningConfiguration:
        ScanOnPush: true
      LifecyclePolicy:
        LifecyclePolicyText: |
          {
            "rules": [
              {
                "rulePriority": 1,
                "description": "가장 최근 5개 이미지만 유지합니다",
                "selection": {
                    "tagStatus": "any",
                    "countType": "imageCountMoreThan",
                    "countNumber": 5
                },
                "action": {
                    "type": "expire"
                }
              }
            ]
          }
    Type: AWS::ECR::Repository
```

저는 OTel Docker 이미지의 기본을 세 가지 단계로 구축했어요: 먼저 golang 이미지를 사용하여 컬렉터를 다운로드하고 빌드했어요. 두 번째로, OTel 컬렉터가 AWS CloudWatch로 로그를 보낼 때 필요한 알파인 이미지를 사용하여 인증서 번들을 설치했어요; 그렇지 않으면 SSL 인증서 오류가 발생할 거에요. 마지막으로, 컬렉터 이진 파일과 인증서 번들을 스크래치 이미지로 복사하고 이미지의 엔트리 포인트를 설정했어요.

```Docker
# 이것은 OTel 기본 이미지를 빌드하고 코어 계정의 ECR에 업로드할 거에요

FROM golang:latest AS build

WORKDIR /tmp

COPY builder-config.yaml builder-config.yaml

RUN GOBIN=/tmp go install go.opentelemetry.io/collector/cmd/builder@latest

RUN CGO_ENABLED=0 GOOS=linux GOFLAGS=-v /tmp/builder --config \
  builder-config.yaml

FROM alpine:latest AS prep

RUN apk add --no-cache ca-certificates

FROM scratch

WORKDIR /etc/otel/bin

COPY --from=prep /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=build /tmp/dist/otel-collector otel-collector

ENTRYPOINT [ "/etc/otel/bin/otel-collector" ]
```

이미지가 빌드되어 코어 계정의 ECR에 업로드되면, 이제 애플리케이션 계정의 OTel 구성 파일을 사용하여 테스트할 때가 왔어요! 지금 할 일은 OTel 구성 파일을 Dockerfile 아래에 복사하는 거에요. 그럼 이 Dockerfile은 애플리케이션 계정의 ECR 리포지토리에 빌드되고 푸시될 거에요.


<div class="content-ad"></div>

```Dockerfile
FROM <CORE-ACCOUNT-OTEL-ECR-URI>:latest

COPY config.yaml config.yaml

EXPOSE 4317 4318

CMD [ "-- --", "config.yaml" ]
```

그럼 여기까지입니다! ECS 작업 정의에서이 이미지를 사용하고 적절한 IAM 정책을 첨부하면 구성 파일에서 지정한 CloudWatch 로그 그룹에서 OpenTelemetry 수집기의 시작 로그를 볼 수 있습니다. 이로써 수집기가 예상대로 실행되고 로그를 수신할 준비가 되었음을 확인할 수 있습니다!