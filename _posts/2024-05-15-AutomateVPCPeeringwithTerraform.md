---
title: "Terraform을 사용하여 VPC 피어링 자동화하기"
description: ""
coverImage: "/assets/img/2024-05-15-AutomateVPCPeeringwithTerraform_0.png"
date: 2024-05-15 11:00
ogImage: 
  url: /assets/img/2024-05-15-AutomateVPCPeeringwithTerraform_0.png
tag: Tech
originalTitle: "Automate VPC Peering with Terraform"
link: "https://medium.com/stackademic/automate-vpc-peering-with-terraform-cc30fe9bcc5b"
isUpdated: true
---





![image](/assets/img/2024-05-15-AutomateVPCPeeringwithTerraform_0.png)

AWS의 VPC 피어링은 두 개의 VPC 간에 사설 IPv4 또는 IPv6 주소를 사용하여 트래픽을 경로 설정할 수 있는 네트워킹 연결입니다.

VPC 피어링은 AWS의 네트워킹 서비스 스위트의 일부로, 클라우드에서 확장 가능하고 안전하며 고가용성 네트워크 아키텍처를 생성할 수 있는 강력한 옵션을 제공합니다.

이 기사에서는 Terraform을 사용하여 VPC 피어링 연결을 생성하는 방법을 살펴보겠습니다.




## 준비 사항:

- Terraform이 설치된 서버

## 단계 1: VPC용 코드 생성

- main.tf 파일을 생성하고 아래 코드를 추가하세요.



```json
# Demo VPC A
resource "aws_vpc" "demo-vpc-a" {
  cidr_block = var.demo-vpc-a-cidr

  tags = {
    Name = "demo-vpc-a"
  }
}

# Demo VPC B
resource "aws_vpc" "demo-vpc-b" {
  cidr_block = var.demo-vpc-b-cidr

  tags = {
    Name = "demo-vpc-b"
  }
}
```

- 위의 코드는 2개의 VPC를 생성합니다.

## 단계 2: 서브넷용 코드 작성

- 아래 코드를 main.tf 파일에 추가하세요.



```js
# 데모 VPC A의 서브넷
resource "aws_subnet" "demo-subnet-a" {
  vpc_id            = aws_vpc.demo-vpc-a.id
  cidr_block        = var.demo-subnet-a-cidr
  availability_zone = data.aws_availability_zones.available_zones.names[0]

  tags = {
    Name = "Public Subnet A"
  }
}

# 데모 VPC B의 서브넷
resource "aws_subnet" "demo-subnet-b" {
  vpc_id            = aws_vpc.demo-vpc-b.id
  cidr_block        = var.demo-subnet-b-cidr
  availability_zone = data.aws_availability_zones.available_zones.names[1]

  tags = {
    Name = "Public Subnet B"
  }
}
```

- 위 코드는 각 VPC에 서브넷을 생성합니다.

## 단계 3: 피어링 연결을 위한 코드 생성

- 아래 코드를 main.tf 파일에 추가하세요.
  



```js
# Peering connection
resource "aws_vpc_peering_connection" "vpc_peering" {
  vpc_id      = aws_vpc.demo-vpc-a.id
  peer_vpc_id = aws_vpc.demo-vpc-b.id
}

# Peering connection acceptor
resource "aws_vpc_peering_connection_accepter" "vpc_peering_accepter" {
  vpc_peering_connection_id = aws_vpc_peering_connection.vpc_peering.id
  auto_accept               = true
}
```

- 위의 코드는 VPC 피어링 연결을 생성하고 자동으로 수락합니다.

## 단계 4: 라우트 테이블 및 R을 위한 코드 만들기

- 아래 코드를 main.tf 파일에 추가하세요.




```js
# 라우트 테이블
리소스 "aws_route_table" "demo-route-table-a" {
  vpc_id = aws_vpc.demo-vpc-a.id
}

리소스 "aws_route_table" "demo-route-table-b" {
  vpc_id = aws_vpc.demo-vpc-b.id
}
```

- 위의 코드는 각 VPC에 두 개의 라우트 테이블을 생성합니다.

## 단계 5: 라우트 코드 생성

- 아래 코드를 main.tf 파일에 추가합니다.
  



```js
# VPC 피어링을 위한 라우트 테이블에 라우트 생성하기
resource "aws_route" "demo-route-a" {
  route_table_id            = aws_route_table.demo-route-table-a.id
  destination_cidr_block    = aws_vpc.demo-vpc-b.cidr_block
  vpc_peering_connection_id = aws_vpc_peering_connection.vpc_peering.id
}

resource "aws_route" "route2" {
  route_table_id            = aws_route_table.demo-route-table-b.id
  destination_cidr_block    = aws_vpc.demo-vpc-a.cidr_block
  vpc_peering_connection_id = aws_vpc_peering_connection.vpc_peering.id
}
```

- 위 코드는 라우트 테이블을 수정하여 VPC A에서 VPC B로의 라우트 및 VPC B에서 VPC A로의 라우트를 허용합니다.

## 단계 6: 인터넷 게이트웨이용 코드 작성하기

- 아래 코드를 main.tf 파일에 추가하세요.




```js
# 인터넷 게이트웨이 생성
resource "aws_internet_gateway" "demo-igw" {
  vpc_id = aws_vpc.demo-vpc-a.id
}

# VPC 라우트 테이블과 인터넷 게이트웨이 연결
resource "aws_route" "route_to_internet" {
  route_table_id         = aws_route_table.demo-route-table-a.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.demo-igw.id
}
```

## 단계 7: 변수 파일 생성하기

- variables.tf 파일을 생성하고 아래 코드를 추가합니다.

```js
# VPC A CIDR
variable "demo-vpc-a-cidr" {
  type        = string
  description = "VPC A의 CIDR"
}

# VPC B CIDR
variable "demo-vpc-b-cidr" {
  type        = string
  description = "VPC B의 CIDR"
}

# 서브넷 A CIDR
variable "demo-subnet-a-cidr" {
  type        = string
  description = "데모 서브넷 A의 CIDR"
}

# 서브넷 B CIDR
variable "demo-subnet-b-cidr" {
  type        = string
  description = "데모 서브넷 B의 CIDR"
}

# 지역
variable "region" {
  type        = string
  description = "지역"
}
```



## 단계 8: 제공자 파일 만들기

- provider.tf 파일을 만들고 아래 코드를 추가하세요.

```js
# AWS 제공자 구성
provider "aws" {
  region = var.region
}

# 백엔드 구성
terraform {
  backend "s3" {
    bucket         = "dhsoni-terraform"
    key            = "peering.terraform.tfstate"
    region         = "us-east-2"
    dynamodb_table = "terraform-state-lock-dynamodb"
  }
}
```

## 단계 9: terraform.tfvars 파일 만들기



- terraform.tfvars 파일을 만들고 아래 코드를 추가해주세요.

```js
region             = "us-east-2"
demo-vpc-a-cidr    = "10.0.0.0/16"
demo-vpc-b-cidr    = "10.1.0.0/16"
demo-subnet-a-cidr = "10.0.1.0/24"
demo-subnet-b-cidr = "10.1.1.0/24"
```

## 단계 10: 작업 디렉토리 초기화

- 작업 디렉토리에서 terraform init 명령어를 실행해주세요. 이 명령어는 필요한 모든 공급자 및 모듈을 다운로드하고, 백엔드를 초기화합니다.



## 단계 11: 테라폼 실행 계획 작성

- 작업 디렉토리에서 `terraform plan` 명령을 실행하세요. 실행 계획을 확인할 수 있습니다.

## 단계 12: 테라폼 적용 실행

- 작업 디렉토리에서 `terraform apply` 명령을 실행하면 AWS에 필요한 모든 리소스가 생성됩니다.



## 단계 13: 연결 확인하기

- AWS 콘솔로 이동하여 VPC 피어링 연결을 확인하세요.

![이미지](/assets/img/2024-05-15-AutomateVPCPeeringwithTerraform_1.png)

이제 AWS VPC 피어링 연결을 Terraform을 사용하여 만드는 방법을 배웠습니다. 이제 원하는 대로 재생하고 필요에 맞게 수정할 수 있습니다.



여기서 전체 코드를 찾을 수 있어요.

다른 저장소들도 살펴보세요.

이 안내서가 도움이 되었다면 👏 버튼을 클릭해 주시고, 자유롭게 댓글을 남겨 주세요.

더 이런 이야기를 보고 싶다면 팔로우해 주세요 😊



# 스택더믹 🎓

끝까지 읽어주셔서 감사합니다. 가기 전에:

- 저희 작가를 clapping하고 팔로우해주시기 바랍니다! 👏
- 저희를 팔로우하고 Youtube, Discord에서 만나보세요
- 다른 플랫폼에서도 만나보세요: In Plain English, CoFeed, Venture, Cubed
- 알고리즘 콘텐츠를 강제로 다루게 하는 블로깅 플랫폼에 지쳤나요? Differ를 시도해보세요
- 스택더믹 닷컴에서 더 많은 콘텐츠를 만나보세요