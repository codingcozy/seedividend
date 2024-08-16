---
title: "AWS에서 이력서를 Terraform으로 만들어보세요 I"
description: ""
coverImage: "/assets/img/2024-05-15-GetyourResumeTerraformedinAWSI_0.png"
date: 2024-05-15 11:08
ogImage: 
  url: /assets/img/2024-05-15-GetyourResumeTerraformedinAWSI_0.png
tag: Tech
originalTitle: "Get your Resume Terraformed in AWS (I)"
link: "https://medium.com/towards-aws/get-your-resume-terraformed-in-aws-i-9b1e6f077305"
isUpdated: true
---




안녕하세요! 👋 여러분! 오랜만이죠. 여기에 유용한(아니면 흥미로운?) 기사 몇 개를 올리고 싶다고 생각한 지 오래되었습니다. 그런데 좋거나 유용한 아이디어가 생각나지 않았어요. 몇 주 전 나를 위해 한 작업을 문서화하는 아이디어를 만났는데요: 이력서의 HTML 버전을 AWS에 Terraform과 GitHub Actions을 통해 배포(자동화)하는 것입니다. 요즘에는 이런 기술을 이력서에 넣는 것이 흥미로울 것 같아요. 근데 이력서 안에 그런 기술을 보여주면 어때요? 😜

이런 작업을 어떻게 하는지 보여주는 많은 비디오/튜토리얼은 AWS 콘솔에서 "클릭 단계별"로 진행하는 것을 보여줍니다. 그러나 저는 Terraform + GithubActions 방법을 소개할 거에요, 더 흥미로울 것 같다고 봅니다.

이 글은 두 편 중 첫 번째 입니다. 여러분이 지역 (HTML 형식)으로 배포된 이력서를 AWS(S3)에 보관하고 https://antonirs.com 같은 URL을 통해 접근 가능하게 하는 방법을 단계별로 안내할 거에요. 그리고 또한 매 푸시마다 새 버전을 자동으로 배포하는 ⚙️GitHub Actions 파이프라인⚙️ 도 설정할 거에요. 이 자동화 부분은 이 첫 번째 글에서 다루지 않고 두 번째 글에서 다뤄요.

이 글을 따라가는 동안 제 개인 이력서 저장소에서 모든 소스 코드를 확인할 수 있어요. 즐겨보세요!



# 인프라 구조 이해하기

![이미지](/assets/img/2024-05-15-GetyourResumeTerraformedinAWSI_0.png)

우리가 구축할 내용을 크게 보여드립니다. 첫 번째 기사에서 Terraform을 사용하여 컴포넌트를 구축하고 연결하며 함께 작동시키는 방법을 안내해 드리겠습니다. 아키텍처는 전혀 복잡하지 않으므로, 모두 구축하기 위해 AWS의 "단지" 4가지 서비스를 사용할 예정입니다.

# 이전 요구 사항



일할 때 필요한 몇 가지가 있습니다:
1. AWS 계정. 꽤 명백한 🤷🏼‍♂️ 당연하지만 필수입니다. AWS는 이 문서에서 한 단계씩 안내하여 계정을 설정하는 방법을 제공합니다.
2. Terraform CLI 설치. 터미널에 terraform CLI가 설치되어 있어야 합니다. Hashicorp에서 설치 방법을 안내합니다.
3. 등록된 도메인. 이 문서에서는 구매 및 AWS에서 처리된 도메인을 가지고 있다고 가정하지만, 반드시 그렇게 할 필요는 없습니다.
4. 이력서의 HTML 버전. S3 버킷에 저장되고 CloudFront를 통해 제공될 것입니다.

# 일하러 가볼까요 💪🏻

저의 저장소에서 완전한 작동 솔루션을 제공받을 수 있기 때문에 👀, 단계별로 자세히 설명하지는 않겠지만 각 부분의 가장 중요한 요소에 대해 주석을 달겠습니다.

## 단계 0: 도메인 구매 및 호스팅 존 생성



도메인 (나의 경우에는 antonirs.com)의 구매와 호스팅 영역 생성은 Terraform으로 만들지 못하는 유일한 부분이며, 대신 AWS 콘솔에서 수동으로 처리해야 합니다.

다른 제공업체에 도메인을 호스팅할 수도 있습니다. 이 경우 추가 구성이 필요할 수 있지만 (그 외에는 문제가 없습니다), 이 경우에는 AWS에서 호스팅되는 경우를 다루겠습니다.

## 단계 1: Terraform으로 시작하기. AWS 제공자 설정

Terraform 프로젝트의 시작점은 일반적으로 AWS 제공자 및 사용할 백엔드 구성을 설정하는 것입니다. 이를 통해 Terraform에게 AWS와의 인증 방법, 리소스를 배포할 지역 및 인프라의 tfstate를 저장할 위치를 알려줍니다. 이 구성을 provider.tf 파일에 넣어주세요.



```js
provider "aws" {
  region = "us-east-1"
  access_key = "내 액세스 키"
  secret_key = "내 시크릿 액세스 키"
}
```

액세스 키와 시크릿 키는 절대로 리포지토리에 푸시해서는 안 되는 것을 염두에 두세요. 여기서 보여주고 있지만, 다음 글에서 깃허브 리포지토리의 시크릿 구성으로 이동하는 방법을 보여줄 것입니다.

백엔드.tf에 대해 다음과 같이 보이도록 해야 합니다. 우리는 인프라의 상태를 저장하기 위해 S3를 사용할 것입니다:

```js
terraform {
  backend "s3" {
    bucket         = "antoni-tf-state"
    key            = "personal-portfolio/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
  }
}
```



## Step 2: S3 및 액세스 정책 생성

여기서는 antoni-html-cv라는 S3 버킷을 생성하고, 여기서 중요한 부분은 우리가 정의하는 정책인 s3_policy입니다. Cloudfront에서 오는 요청을 제외하고 모든 수신 트래픽을 차단할 것입니다 ⛔.

```js
resource "aws_s3_bucket" "personal_portfolio_bucket" {
  bucket = "antoni-html-cv"
}

data "aws_caller_identity" "current" {}

data "aws_iam_policy_document" "s3_policy" {
  statement {
    sid       = "AllowCloudFrontServicePrincipal"
    effect    = "Allow"
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.personal_portfolio_bucket.arn}/*"]
    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = ["arn:aws:cloudfront::${data.aws_caller_identity.current.account_id}:distribution/${aws_cloudfront_distribution.portfolio_distribution.id}"]
    }
  }
}

resource "aws_s3_bucket_policy" "s3_policy" {
  bucket = aws_s3_bucket.personal_portfolio_bucket.id
  policy = data.aws_iam_policy_document.s3_policy.json
}
```

여기서 중요한 점은 정책을 통해 S3에 직접 액세스하는 것을 방지하고 Cloudfront가 내용을 가져오는 것을 허용한다는 것입니다 (고객에게 서비스하기 위해). 이를 수행하는 다른 방법도 있지만, 저는 현재 AWS가 가장 권장하는 Origin Access Control 접근 방식을 사용하기로 결정했습니다. OAC에 대한 자세한 정보는 [여기](링크)에서 확인할 수 있습니다.



## 단계 3: SSL 인증서로 CloudFront 배포 설정하기

CloudFront는 S3에서 정적 콘텐츠를 제공하는 데 사용할 AWS 서비스입니다. CloudFront는 CDN으로 작동하여 전 세계의 여러 위치(엣지 위치)에 콘텐츠를 캐시하여 더 빠르게 액세스할 수 있게 합니다. 또한, CloudFront를 사용하면 배포에 SSL/TLS 인증서를 첨부하여 웹 사이트 연결을 HTTPS로 강제할 수 있습니다.

```js
resource "aws_cloudfront_origin_access_control" "portfolio_oac" {
  name        = "OAC for Portfolio Website"
  description = "OAC for antonirs portfolio website"
  origin_access_control_origin_type = "s3"

  signing_behavior = "always"
  signing_protocol = "sigv4"
}

resource "aws_cloudfront_distribution" "portfolio_distribution" {
  origin {
    domain_name = aws_s3_bucket.personal_portfolio_bucket.bucket_regional_domain_name
    origin_id   = "S3-antonirs-portfolio"
    origin_access_control_id = aws_cloudfront_origin_access_control.portfolio_oac.id
  }

  enabled = true
  comment = "Distribution for the antonirs.com static website"
  aliases = ["antonirs.com"]
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]

    target_origin_id = "S3-antonirs-portfolio"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.personal_web_portfolio_cert.arn
    ssl_support_method  = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = {
    Environment = "production"
  }
}
```

여기에는 많은 구성이 포함되어 있지만 주요 부분은 다음과 같습니다:
-` 우리는 origin을 정의하여 CloudFront에게 데이터를 어디서 가져와야 하는지 알려줍니다(S3에서 가져옵니다).
-` viewer_certificate 섹션을 사용하여 사용자 브라우저와 CloudFront 간의 안전한 연결(HTTPS)을 설정하는 SSL 인증서를 설정합니다.
인증서를 생성하는 관련 명령에 대한 자세한 내용은 acm.tf에서 구성을 확인할 수 있습니다.



```js
resource "aws_acm_certificate" "personal_web_portfolio_cert" {
  domain_name       = "antonirs.com"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cert_validation" {
  zone_id = data.aws_route53_zone.my_personal_zone.zone_id
  name    = tolist(aws_acm_certificate.personal_web_portfolio_cert.domain_validation_options)[0].resource_record_name
  type    = tolist(aws_acm_certificate.personal_web_portfolio_cert.domain_validation_options)[0].resource_record_type
  records = [tolist(aws_acm_certificate.personal_web_portfolio_cert.domain_validation_options)[0].resource_record_value]
  ttl     = 60
}

resource "aws_acm_certificate_validation" "cert_validation" {
  certificate_arn         = aws_acm_certificate.personal_web_portfolio_cert.arn
  validation_record_fqdns = [aws_route53_record.cert_validation.fqdn]
}
```

인증서 구성 중 중요한 부분은 aws_acm_certificate_validation 섹션입니다. 이 인증서를 antonirs.com에 접속할 수 있게 하기 위해 Route53에 대해 이 인증서를 검증해야 합니다.

## 단계 4: Route 53 설정

인프라스트럭처에서말했던 것처럼 DNS 관리를 위해 Route 53을 사용할 것입니다. 글의 시작에서 말했듯이 이미 도메인(나의 경우엔 antonirs.com)과 AWS에 생성된 호스팅존이 있습니다. 다음 구성(route53.tf)을 따라 호스팅존 내에 A 레코드를 작성하고, CloudFront 배포로 가리키는 별칭으로 설정합니다.
 



```js
data "aws_route53_zone" "my_personal_zone" {
  name = "antonirs.com."
}

resource "aws_route53_record" "www" {
  zone_id = data.aws_route53_zone.my_personal_zone.id
  name    = "antonirs.com"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.portfolio_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.portfolio_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}
```

## 단계 5: 모든 것이 작동하는 것을 확인

지금까지 본 것으로 충분히 준비되었습니다. 이제 "한 번의 클릭"으로 모든 인프라를 구축하여 https://antonirs.com (제 경우)을 방문하여 이력서를 확인할 수 있습니다.

좋아요, 이중 따옴표를 조금 풀어볼게요. 모든 테라폼 파일이 준비된 상태에서 이제 해야 할 일은 터미널을 열고 다음을 실행하는 것입니다:
1. terraform init 이 명령어를 실행하면 의존성을 다운로드하고 간단히 말해서 AWS와 상호 작용할 수 있는 디렉토리를 초기화합니다.
2. terraform plan 이 명령어를 실행하면 실제 인프라에 반영되지 않은 tf 파일에 있는 모든 변경 사항을 출력합니다.
3. terraform apply 이 명령어를 실행하면 인프라에서 실제 변경 사항을 만듭니다. Terraform 파일에 구성된 모든 리소스를 생성합니다.
4. 이력서의 HTML 버전을 생성한 버킷에 업로드합니다.
5. 방문(제 경우) https://antonirs.com 그리고... 즐기세요 😜 🚀




<img src="/assets/img/2024-05-15-GetyourResumeTerraformedinAWSI_1.png" />

# 마무리 및 다음 단계

와우! 여기까지 모두 읽은 것을 보니 매우 기뻐요🎊! 하하. 하지만 기쁨은 여기까지가 아닙니다. 다음 기사에서 더 흥미로워집니다. 조금 스포하겠습니다:

이전의 "단계 5"를 보면 인프라를 배포하기 위해 "상당히 많은" 명령을 실행해야 한다는 것 같죠? 그런데 만약 웹사이트에 이력서의 새 버전을 업로드하려면 어떨까요? 새 버전을 업로드하려면 AWS 콘솔에 로그인해야 합니다 (또는 aws-cli를 사용해야 합니다)... 어찌 보면 그렇게 편리하지 않을 거예요.



다음 기사에서는 GitHub Actions에서 모든 이러한 단계를 자동화하는 방법을 보여 드릴 것이기 때문에 기대해 주세요. 다음 기사에서는 또한 파이프라인에 우리의 비용을 제어하기 위한 💰infracost💰 통합에 관한 '보너스' 섹션을 공유할 예정이에요. 자세한 내용을 더 다루겠지만, 이는 우리 인프라 비용을 관리하는 데 매우 유용한 도구입니다. 계속 지켜보세요! 😉