---
title: "Route 53과 AWS Lambda, S3를 이용해 간편하게 DNS 레코드 백업 자동화하기"
description: ""
coverImage: "/assets/img/2024-05-17-SimpleautomatingDNSRecordBackupsfromRoute53withAWSLambdaandS3_0.png"
date: 2024-05-17 03:44
ogImage: 
  url: /assets/img/2024-05-17-SimpleautomatingDNSRecordBackupsfromRoute53withAWSLambdaandS3_0.png
tag: Tech
originalTitle: "Simple automating DNS Record Backups from Route 53 with AWS Lambda and S3"
link: "https://medium.com/@WillEvaristo/automating-dns-record-backups-from-route-53-with-aws-lambda-and-s3-16f817f48336"
---


# 소개

DNS 레코드를 관리하는 것은 여러 개의 호스티드 존을 다룰 때 특히 복잡할 수 있습니다. 이러한 레코드의 백업을 자동화하면 유지 관리가 단순화되는데 그치지 않고 필요할 경우 언제든지 백업을 사용할 수 있도록 해줍니다. 이 튜토리얼에서는 AWS Lambda 함수를 생성하여 이를 수행하는 방법을 살펴보겠습니다: 여러 호스티드 존에서 모든 DNS 레코드를 백업하고 이러한 백업을 S3 버킷에 저장하여 레코드의 완전한 JSON을 생성하고 CSV 파일의 별도의 파일에 구성합니다.

# 준비 사항

- 적절한 자격 증명으로 구성된 AWS 콘솔.
- Route 53 및 S3에 액세스 할 적절한 권한.
- 백업을 저장할 S3 버킷이 만들어져 있어야 합니다.

<div class="content-ad"></div>

# 단계별 가이드

# 1. 람다 함수 생성하기

먼저 람다 함수를 생성해 봅시다. AWS 콘솔에서 Lambda 서비스로 이동하고 "함수 생성"을 클릭합니다.

- 이름: Route53Backup
- 런타임: Python 3.x
- 역할: Lambda 기본 권한을 가진 새 역할을 생성하고 Route 53 및 S3에 액세스할 수 있는 권한을 추가합니다.

<div class="content-ad"></div>

람다 정책 권한:

```js
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "logs:CreateLogGroup",
            "Resource": "arn:aws:logs:us-east-1:12345678:*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": [
                "arn:aws:logs:us-east-1:12345678:log-group:/aws/lambda/lamda-name:*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "route53:GetHostedZone",
                "route53:ListHostedZones",
                "route53:ListHostedZonesByName",
                "route53:ListResourceRecordSets"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket",
                "s3:ListAllMyBuckets",
                "s3:PutObject"
            ],
            "Resource": [
                "arn:aws:s3:::bucket_name"
            ]
        }
    ]
}
```

# 2. Write the Code

우리 람다 함수의 코드입니다. 이 코드는 여러 호스팅된 존에서 DNS 레코드를 검색하여 이를 S3 버킷에 저장합니다.

<div class="content-ad"></div>

```python
import boto3
import json
from datetime import datetime
import csv

def lambda_handler(event, context):
    # 연결된 ID와 도메인 목록
    hosted_zones = [
        {'id': '$HOSTED_ZONE_ID', 'domain': '$DOMAIN'},
        {'id': '$HOSTED_ZONE_ID_2', 'domain': '$DOMAIN2'}
    ]

    # Route 53 및 S3 클라이언트 초기화
    route53_client = boto3.client('route53')
    s3_client = boto3.client('s3')

    # 목록의 각 호스팅 영역을 돌아다니기
    for hosted_zone in hosted_zones:
        # 모든 영역 레코드 가져오기
        response = route53_client.list_resource_record_sets(
            HostedZoneId=hosted_zone['id']
        )

        # JSON 형식으로 변환
        records = json.dumps(response['ResourceRecordSets'], indent=2)
        records_formatted = response['ResourceRecordSets']
        #CSV에 행 생성
        csv_rows = [["Name", "Type", "DNS Name"]]

        for record_formatted in records_formatted:
            name = record_formatted['Name']
            record_type = record_formatted['Type']
            if 'AliasTarget' in record_formatted:
                dns_name = record_formatted['AliasTarget']['DNSName']
            elif 'ResourceRecords' in record_formatted:
                dns_name = ", ".join([r['Value'] for r in record_formatted.get('ResourceRecords', [])])
            else:
                dns_name = ""
            #CSV에 행 추가
            csv_rows.append([name, record_type, dns_name])

        #CSV 파일에 레코드 추가
        csv_buffer = csv.writer(open("/tmp/" + backup_filename_csv, 'w'))
        csv_buffer.writerows(csv_rows)

        # 오늘 날짜와 시간을 포함한 아카이브 이름
        backup_filename = f"{datetime.now().strftime('%Y%m%d-%H%M')}.json"
        backup_filename_csv = f"{datetime.now().strftime('%Y%m%d-%H%M')}.csv"

        # S3에 업로드
        s3_key = f"{hosted_zone['domain']}/data/{backup_filename}"
        s3_key_csv = f"{hosted_zone['domain']}/data/{backup_filename_csv}"
        s3_client.put_object(
            Bucket='$BUCKET_NAME',
            Key=s3_key,
            Body=records
        )
        
        s3_client.upload_file("/tmp/" + backup_filename_csv, '$BUCKET_NAME', s3_key_csv)

    return {
        'statusCode': 200,
        'body': f'Success.'
    }
```

HOSTED_ZONE_ID 및 BUCKET_NAME의 값을 교체해주세요. 필요하다면 backup_filename_formatted 및 backup_filename 변수를 원하는 파일 이름으로 교체해주세요.

# 3. 함수 테스트

함수를 테스트하려면 Lambda 콘솔에서 테스트 이벤트를 구성할 수 있습니다. 예를 들어 사용하지 않는 직접적인 입력이 없으므로 빈 JSON ''을 사용할 수 있습니다.

<div class="content-ad"></div>

# 4. 실행 일정 예약하기 (선택 사항)

만약 람다 함수를 주기적으로 실행하고 싶다면 CloudWatch Events 트리거를 구성할 수 있습니다. CloudWatch 콘솔에서 “Rules”로 이동하여 새로운 규칙을 만들고 원하는 간격(예: 매일)에 람다를 트리거하도록 설정하세요.

# 5. CSV 보기

여기에 당신의 도메인 레코드가 어떻게 포맷될지 표시됩니다.

<div class="content-ad"></div>

<img src="/assets/img/2024-05-17-SimpleautomatingDNSRecordBackupsfromRoute53withAWSLambdaandS3_0.png" />

# 결론

Route 53에서 DNS 레코드를 백업하는 것을 자동화하기 위해 Lambda 함수와 S3를 사용하는 것은 항상 DNS 레코드의 최신 사본을 보유할 수 있는 효과적인 방법입니다. 이는 유지 보수를 간편하게 해주는 것뿐만 아니라 DNS 설정의 보안성을 향상시킵니다.

궁금한 점이나 제안 사항이 있으시면 아래 댓글에 남겨주세요. 즐거운 자동화 되세요!