---
title: "PubSub에서 데이터를 직접 BigQuery로 가져오는 방법 - Google Cloud 프로젝트 단계별 안내"
description: ""
coverImage: "/assets/img/2024-05-15-IngestDataFromPubSubdirectlytoBigquery-GoogleCloudProjectwithSteps_0.png"
date: 2024-05-15 16:07
ogImage: 
  url: /assets/img/2024-05-15-IngestDataFromPubSubdirectlytoBigquery-GoogleCloudProjectwithSteps_0.png
tag: Tech
originalTitle: "Ingest Data From Pub Sub directly to Bigquery - Google Cloud Project with Steps"
link: "https://medium.com/@brilliantprogrammer/ingest-data-from-pub-sub-directly-to-bigquery-google-cloud-project-with-steps-ad3a2ba709e7"
isUpdated: true
---




![이미지](/assets/img/2024-05-15-IngestDataFromPubSubdirectlytoBigquery-GoogleCloudProjectwithSteps_0.png)

현재 빠르게 변화하는 비즈니스 환경에서 실시간 데이터 분석은 더 이상 선택사항이 아닌 요구 사항이 되었습니다. 기업은 중요한 통찰을 신속히 얻어 의사 결정에 활용하기 위해 데이터 파이프라인을 개선하는 방법을 지속적으로 찾고 있습니다. 이 접근 방식의 필수 구성 요소 중 하나는 BigQuery와 같은 분석 데이터베이스로부터 데이터를 다양한 소스로의 원활한 투입입니다.

이러한 원활한 통합을 달성하기 위해서는 과거에는 중간 Dataflow 프로세스의 설계와 실행이 종종 필요했으며, 이는 데이터 파이프라인에 복잡성과 오버헤드를 추가했습니다. 그러나 Google Cloud Platform (GCP)의 새로운 기능 도입으로 Pub/Sub에서 BigQuery로의 직접 연결 채널이 제공되어 이 프로세스가 변화되었습니다. 이 혁신이 어떻게 데이터 수신 전략을 혁신할 수 있는지 알아봅시다.

# BigQuery 구독을 활용한 데이터 투입 간소화



전통적으로는 Pub/Sub에서 데이터를 BigQuery로 가져오는 것이 중간 단계, 즉 Dataflow 파이프라인을 작성하고 실행하는 것과 같은 중개 단계를 필요로 했습니다. 효과적이었지만 때로는 필요 이상으로 복잡할 수 있었으며, 특히 변환 없이 raw 데이터가 필요한 사용 사례에 대해서는 특히 그랬습니다.

여기에 BigQuery 구독이 등장합니다. BigQuery 구독은 특히 BigQuery로 데이터를 신속하게 가져오기 위해 설계된 새로운 유형의 Pub/Sub 구독입니다. 중간 Dataflow 작업이 필요 없어지면서 ELT(추출, 로드, 변환) 경로로 여러분의 이벤트 기반 아키텍처를 간소화시키고 데이터 파이프라인을 단순화하며 시간당 인사이트를 가속화합니다.

## BigQuery 구독의 주요 이점

- 간소화된 워크플로우: BigQuery 구독을 통해 Dataflow 파이프라인을 생성하고 관리하는 복잡성을 우회하여 운영 부담을 줄이고 데이터 워크플로를 간소화할 수 있습니다.
- 실시간 데이터 수집: Pub/Sub에서 데이터를 직접 BigQuery로 가져오면 실시간 분석이 가능해져 조직이 변화하는 트렌드와 기회에 신속하게 대응할 수 있습니다.
- 비용 효율성: 중간 처리 단계를 제거함으로써 더 이상 필요하지 않은 자원을 사용하는 비용 절감이 가능합니다.
- 간소화된 스키마 관리: Pub/Sub 토픽 스키마를 활용하여 호환되는 스키마를 갖는 Pub/Sub 메시지를 BigQuery 테이블에 작성할 수 있어 스키마 관리를 간소화하고 데이터 일관성을 보장할 수 있습니다.



# BigQuery 구독 시작하기

이 혁신적인 기능을 활용하려면 다음 단계를 따라 BigQuery 구독을 생성해보세요:

- BigQuery 테이블 지정: 구독과 연결할 기존 BigQuery 테이블을 선택하세요. 테이블 스키마가 호환성 요구 사항을 준수하는지 확인해주세요.
- BigQuery 구독 생성: Pub/Sub 주제와 관련된 새로운 BigQuery 구독을 만드세요. 이 구독을 통해 메시지가 BigQuery로 직접 흡수됩니다.
- 스키마 호환성: Pub/Sub 주제에 스키마가 활성화된 경우, 지정된 BigQuery 테이블과 호환성을 보장해주세요. 그렇지 않으면 메시지가 바이트 또는 문자열로 흡수될 수 있습니다.
- 데이터 흡수 시작: BigQuery 구독이 생성되면 메시지가 BigQuery로 직접 흡수되어 분석 준비가 됩니다.

# 작은 프로젝트를 살펴보겠습니다:



## 지정된 쿼리를 사용하여 BigQuery 테이블을 만듭니다

```js
CREATE TABLE `atlantean-site-xxxxxxx.pub_sub.temperature_data`
 (
    state_name STRING,
    temperature FLOAT64
);
```

테이블이 성공적으로 생성되었습니다.

![이미지](/assets/img/2024-05-15-IngestDataFromPubSubdirectlytoBigquery-GoogleCloudProjectwithSteps_1.png)



## BigQuery 구독 생성하기

지금은 pub/sub 주제를 가지고 있지 않으므로, 빅쿼리 구독을 만들기 전에 하나를 만들어봅시다.

![이미지](/assets/img/2024-05-15-IngestDataFromPubSubdirectlytoBigquery-GoogleCloudProjectwithSteps_2.png)

구독을 생성하기 전에, IAM에 가서 pub/sub 서비스 계정에 액세스 권한을 부여하여 빅쿼리에 쓸 수 있도록 해주세요.




![Step 3](/assets/img/2024-05-15-IngestDataFromPubSubdirectlytoBigquery-GoogleCloudProjectwithSteps_3.png)

Finally, let’s set up a pub/sub subscription that writes events straight to BigQuery.

![Step 4](/assets/img/2024-05-15-IngestDataFromPubSubdirectlytoBigquery-GoogleCloudProjectwithSteps_4.png)

![Step 5](/assets/img/2024-05-15-IngestDataFromPubSubdirectlytoBigquery-GoogleCloudProjectwithSteps_5.png)




자, 아래로 스크롤해서 '만들기' 버튼을 클릭해주세요.

우리의 작업이 완료되었으니, 이게 작동하는지 확인해봅시다.

PubSub을 방문해 `주제`를 선택하고 메시지를 확인하세요.

![이미지](/assets/img/2024-05-15-IngestDataFromPubSubdirectlytoBigquery-GoogleCloudProjectwithSteps_6.png)



테이블 태그를 마크다운 형식으로 변경하십시오.



프로젝트를 마무리하며 읽어 주셔서 감사드립니다. 이 글이 유용했다면 데이터 엔지니어링에 대해 더 배우고 싶다면 앞으로의 업데이트를 받으려면 반드시 저를 팔로우해 주세요. 여러분의 지지는 저에게 큰 힘이 됩니다. 앞으로 더 많은 전문성을 공유할 수 있기를 기대하며, 미래의 데이터 주도 모험을 기대해 주세요!

- 궁금한 사항이 있으시면 망간이나 Github로 문의해 주세요!
- 무료 뉴스레터를 구독해 주세요.
- 트위터 팔로우하기.
- Topmate에서 저와 연락하세요.
- 커피 사주세요.