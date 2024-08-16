---
title: "Pinterest의 재설계된 Goku-Ingestor vNext 미리보기"
description: ""
coverImage: "/assets/img/2024-07-09-AGlimpseintotheRedesignedGoku-IngestorvNextatPinterest_0.png"
date: 2024-07-09 21:28
ogImage: 
  url: /assets/img/2024-07-09-AGlimpseintotheRedesignedGoku-IngestorvNextatPinterest_0.png
tag: Tech
originalTitle: "A Glimpse into the Redesigned Goku-Ingestor vNext at Pinterest"
link: "https://medium.com/pinterest-engineering/a-glimpse-into-the-redesigned-goku-ingestor-vnext-at-pinterest-d68159473464"
isUpdated: true
---




## 더 나은 성능, 낮은 비용 및 낮은 코드 복잡성

Xiao Li, Kapil Bajaj, Monil Mukesh Sanghavi, 그리고 Zhenxiao Luo

# 소개

실시간 분석의 동적인 영역에서는 정밀성과 속도가 협상할 여지가 없습니다. Pinterest의 실시간 메트릭 비동기 데이터 처리 파이프라인은 Pinterest의 시계열 데이터베이스 Goku를 제공하여 기회의 길목에 섰습니다. 미션은 명확했습니다: 병목 현상을 식별하고 끊임없이 혁신하며 실시간 분석 처리 기능을 비길 수 없는 효율성 시대로 이끄는 것입니다.

<div class="content-ad"></div>

## 배경

Goku-Ingestor는 메트릭 데이터의 다중화를 수행하는 비동기 데이터 처리 파이프라인입니다. 데이터 유효성 검사, 거부 목록 처리, 샤딩, 여러 메트릭 형식의 역직렬화, 그리고 데이터를 맞춤형 시계열 데이터베이스 (TSDB) 형식으로 직렬화하여 하류 저장 엔진인 Goku에서 사용할 수 있도록 합니다.

![이미지](/assets/img/2024-07-09-AGlimpseintotheRedesignedGoku-IngestorvNextatPinterest_0.png)

Goku-Ingestor는 거의 10년 동안 실행되고 발전해 왔습니다. 실시간 분석 플랫폼에 일부 문제점이 되는 약점들이 있었지만 그럼에도 꽤 잘 작동했습니다.

<div class="content-ad"></div>

고성능 플릿으로 예상된 처리량

우리는 Goku-Ingestor의 처리량을 분당 데이터 포인트로 측정합니다. 일반적으로 Goku-Ingestor는 분당 25 억 ~ 50 억 개의 데이터 포인트의 처리량을 갖습니다. 해당 처리량을 달성하기 위해 Goku-Ingestor는 수천 개의 메모리 최적화된 EC2 인스턴스를 사용하며, 호스트 당 처리량이 0.5 mbps보다 작음에도 높은 인프라 비용을 발생시킵니다.

신뢰성 문제

2023년 초에 Goku-Ingestor의 성능 문제로 인해 일부 문제가 발생했으며, 일시적으로 메트릭 시스템 내에서 데이터 손실이 발생한 경우도 있었습니다. 이는 실시간 분석 팀과 관측 팀에 어려움을 줬으며, 상황에 대처해야 했습니다. 또한 데이터의 부재나 잘못된 경고로 인해 내부 고객들이 대응해야 했던 상황으로 이어졌습니다.

<div class="content-ad"></div>

# 문제 식별

이 접근은 누락된 지표 데이터에 대한 과거 사고의 종합적인 분석으로 시작했습니다. 많은 수의 이러한 사건이 극도로 높은 가비지 컬렉션(GC) 부하와 관련되어 있었습니다. 높은 볼륨 클러스터 중 일부에서는 평균 GC 일시 중단이 분당 10초에 달할 수도 있습니다. 전체 GC가 발생하면 데이터 처리 파이프라인에 완전히 중단이 발생하고 상류 카프카 클러스터에 역압이 걸리며 하류 TSDB에 연쇄 실패를 일으킵니다.

![이미지](/assets/img/2024-07-09-AGlimpseintotheRedesignedGoku-IngestorvNextatPinterest_1.png)

# 방법론

<div class="content-ad"></div>

정교하고 철저한 아키텍처 검토를 거친 결과, 동시성 모델의 활용에 관한 중요한 설계 고려 사항이 드러났습니다. 특히, 가공 대기 중인 각각의 일괄적인 원시 메트릭스를 처리하기 위해 새 쓰레드를 반복적으로 생성하는 문제가 두드러졌습니다. 데이터 포인트 수명 주기에는 읽기, 역직렬화, 처리, 유효성 검사, 라인목록 확인이 포함되며, TSDB 형식 데이터 포인트의 재구성, 직렬화, 및 쓰기가 뒤따릅니다. 아쉽게도 이러한 작업 방식은 각 단계에서 데이터 포인트의 중복 생성으로 이어졌습니다. 결과적으로, 메모리 프로파일링을 통해 일부 노력이 중복되었고 비용이 많이 드는 API에 의존하게 된 것을 깨달았습니다.

![image](/assets/img/2024-07-09-AGlimpseintotheRedesignedGoku-IngestorvNextatPinterest_2.png)

이상적으로 데이터 포인트는 일반적으로 일회용 객체이므로 메모리에서의 수명이 짧아야 합니다. 그러나 아키텍처의 물체 과도한 생성으로 인해 빈번한 젊은 세대 가비지 수집(GC) 일시 중지가 발생합니다. 이러한 GC 일시 중지의 빈도를 평가하기 위해 각 젊은 세대 수집 사이의 시간 간격을 측정합니다.

Pyoung = Seden / Ralloc

<div class="content-ad"></div>

평균은 젊은 세대 GC(Pyoung) 사이의 기간을 나타내며 Seden은 이든의 크기이며 Ralloc은 메모리 할당율(초당 바이트)입니다.

최대 처리량을 극대화하기 위해 TSDB 데이터 처리 파이프라인은 성능을 최적화하려고 합니다. 서비스의 메트릭 리더 구성 요소는 마지막 카프카 오프셋부터 많은 양의 메트릭을 가져옵니다. 그러나 워커 구성 요소에 의한 과도한 메모리 할당은 Ralloc의 상당한 증가로 이어져 Pyoung에서 빈번한 짧은 일시 중지를 일으킵니다. 이러한 일시 중지는 젊은 세대 GC의 STW(Stop-The-World) 성격 때문에 발생합니다. 이 문제를 해결하기 위한 이전 시도들은 G1 가비지 수집기의 도입을 포함했지만, 여전히 해결되지 않은 일부 문제가 남아 있습니다.

- G1GC는 여전히 STW 일시 중지를 통해 중요 작업을 처리합니다.
- 대규모 객체 생성이 반복될 경우(새 객체 대기열) 조각화가 발생할 수 있습니다.
- G1은 적은 수의 긴 JVM 동결이 아닌 많은 수의 짧은 일시 중지를 활용하여 더 많은 누적 GC 일시 중지가 실제로 발생할 수 있습니다.

누적적인 메모리 집중적인 작업은 짧은 GC 간격을 유발하고 서비스의 지속적인 중단을 일으킵니다. 결과적으로 Goku-ingestor는 항상 가비지 수집기를 기다리느라 바쁩니다.

<div class="content-ad"></div>

디자인에 여러 가지 문제가 있지만, 주요 문제는 메모리의 비효율적인 사용으로 인해 높은 지연 시간, 데이터 신선도 문제, 백프레셔 및 카스케이딩 실패가 빈번히 발생한다는 점입니다. 조금만 트래픽이 증가해도 추가 메모리와 GC 오버헤드를 수용하기 위해 플릿 크기를 확장해야 할 필요가 있습니다.

## Goku-Ingestor vNext 아키텍처

병목 현상 분석

Goku-Ingestor vNext 아키텍처 디자인의 목표는 최고의 처리량과 최소한의 GC 일시 중지 시간을 최소한의 호스트로 달성하는 것입니다.

<div class="content-ad"></div>

Qualitative analysis 목적으로, THfleet을 fllet의 처리량이라고 가정하고, n은 호스트 수라고 가정합니다. fllet의 누적 처리량은:

![image](/assets/img/2024-07-09-AGlimpseintotheRedesignedGoku-IngestorvNextatPinterest_3.png)

Ndp는 j 호스트에서 처리된 DP 총 수로, 호스트 당 일정하다고 가정합니다. Tservice(j)는 j 호스트에서 Ndp(j) 데이터 포인트를 처리하는 데 사용되는 시간입니다.

단일 호스트 j에서 서비스 Tservice에 의해 사용되는 시간을 더 자세히 분석하려면

<div class="content-ad"></div>


![image](/assets/img/2024-07-09-AGlimpseintotheRedesignedGoku-IngestorvNextatPinterest_4.png)

Ndp(j)은 호스트 j에서 처리된 데이터 포인트의 수입니다. Tmetric은 메트릭을 처리하는 데 사용된 시간이고, Tdp는 데이터 포인트를 처리하는 데 사용된 시간입니다. 또한, i=1부터 m까지 Ttemp(i)는 중간 임시 데이터 구조를 처리하는 데 사용된 누적 시간입니다. OHgc는 개체 당 가비지 수집 일시 중간 오버헤드입니다. Kreader, Kwriter 및 Kworker는 액터(리더, 작성자 또는 워커)의 수를 나타냅니다.

데이터 처리 파이프라인을 개선하기 위한 목표는 서비스 Tservice의 오버헤드를 줄이는 것입니다. 임시 개체 m의 수를 줄이는 것이 논리적인 해결책임이 분명합니다. 한편, 이상적으로는 Kreader, Kwriter 및 Kworker를 섬세하게 조정하여 처리량을 미세 조정해야 합니다.

아키텍처 디자인


<div class="content-ad"></div>

이를 달성하기 위해 Goku-Ingestor vNext 아키텍처는 생성 및 복사된 리소스를 최소화하여 GC 오버헤드를 최소화하고 더 높은 처리량을 달성하기 위해 목표를 설정했습니다. 3 스레드 풀 실행자 모델을 사용하며, 오직 2개의 공유 리소스가 생성되었습니다. 모든 실행 가능한 작업은 반복적인 실행 가능한 객체 생성을 제거하기 위해 서로 다른 고정된 간격으로 실행되도록 예약되며, 일시적으로 폴된 결과를 보관하기 위해 동시 ConsumerRecords 대기열이 사용됩니다. 객체는 작업 스레드에 의해 디큐될 즉시 제거됩니다. 작업 스레드는 CPU 집약적인 중요 작업을 수행하며, 직렬화, 유효성 검사, 거부 목록 확인, 데이터 포인트 구성, 정렬 및 파티셔닝이 포함됩니다. 데이터 포인트가 정렬되고 파티셔닝되면 작성 스레드에 의해 보내기를 기다리는 동시 버퍼에 저장됩니다.

![Goku-Ingestor vNext](/assets/img/2024-07-09-AGlimpseintotheRedesignedGoku-IngestorvNextatPinterest_5.png)

## 메모리 프로파일링

추가 메모리 프로파일링을 통해 서비스에서 가장 비용이 많이 드는 API를 식별할 수 있었습니다. 가장 두드러진 API 중 하나는 빈번히 사용되는 string.split 함수였습니다. 이 함수는 TSDB와 호환되는 차원 데이터로 원시 메트릭 문자열 객체를 구문 분석하는 데 편리함 때문에 자주 사용되었습니다.

<div class="content-ad"></div>

문자열.split 함수는 구분 기호를 기반으로 문자열을 분할하여 구조화된 차원 데이터로 변환하는 데 중요한 역할을 했습니다. 그러나 프로파일링 과정에서 이 함수의 실행이 메모리 사용량 및 성능 병목 현상에 상당한 영향을 미쳤음이 분명해졌습니다.

결과적으로, 우리는 고가의 API 사용을 없애기 위해 알고리즘적 개선을 진행하여 GC 일시 중지 시간을 감소시켰습니다. 이러한 변경으로 원시 메트릭 문자열 처리가 최적화되었으며 전체 시스템 성능과 안정성이 향상되었습니다.

![이미지1](/assets/img/2024-07-09-AGlimpseintotheRedesignedGoku-IngestorvNextatPinterest_6.png)

![이미지2](/assets/img/2024-07-09-AGlimpseintotheRedesignedGoku-IngestorvNextatPinterest_7.png)

<div class="content-ad"></div>

위의 그림에서 볼 수 있듯이, Goku-Ingestor vNext가 dev 클러스터에서 실행되고, 이는 레거시 데이터 수집 파이프라인에서 실행되는 m10n 클러스터를 그림자로 만듭니다. String::split의 제거 덕분에 API 최적화로 GC 일시 중지 부하를 50% 더 줄였습니다.

# 결과

Goku-Ingestor vNext를 구현한 후, 영향은 정말 놀라웠습니다. 재설계된 시스템은 무거운 트래픽 부하를 겪는 클러스터에 대해 유사한 처리량을 달성할 뿐만 아니라 필요한 EC2 인스턴스 수를 크게 줄였습니다. 사실, 줄어든 인스턴스 수가 놀라운 수준이었는데, 이는 50%에서 65% 더 적은 인스턴스가 필요했다는 것을 의미합니다.

주목할 만한 개선 사항 중 하나는 성능 저하를 일으키는 요인으로 알려진 가비지 컬렉션 주기 일시 중지 시간에서 나타났습니다. Goku-Ingestor vNext를 사용하면 일시 중지 시간이 원래 기간의 10%에서 25%로 대폭 줄었습니다. 이 일시 중지 시간의 감소는 시스템이 제공하는 전반적인 성능 향상에 기여했습니다.

<div class="content-ad"></div>

마크다운 형식으로 변경된 표입니다.

전반적으로 Goku-Ingestor vNext의 변화 효과는 크다고 할 수 있습니다. 시스템 처리량을 향상시키는 데 그치지 않고 EC2 인스턴스 수를 줄여 자원을 절약했습니다. 또한 가비지 수집 주기의 최적화는 성능 저하를 최소화하는 데 중요한 역할을 했습니다.

호스트 수가 50% 줄은 결과

<img src="/assets/img/2024-07-09-AGlimpseintotheRedesignedGoku-IngestorvNextatPinterest_9.png" />

<div class="content-ad"></div>

호스트 수가 67% 감소한 결과

![image](/assets/img/2024-07-09-AGlimpseintotheRedesignedGoku-IngestorvNextatPinterest_10.png)

# 재정 및 신뢰성 혜택

성능 향상으로 이어진 즉각적인 이익 이상으로, 재설계된 Goku-Ingestor는 연간 EC2 인스턴스 비용의 65% 감소로 우리의 연간 비용을 상당히 줄였습니다. 이러한 정비로 인한 효율성 향상과 자원 최적화는 시스템 전체의 신뢰성에 급격히 향상을 가져다주었습니다. 이로써 더 안정적이고 견고한 데이터 처리 파이프라인이 보장되었습니다.

<div class="content-ad"></div>


![image](/assets/img/2024-07-09-AGlimpseintotheRedesignedGoku-IngestorvNextatPinterest_11.png)

# 미래 작업

## 메모리 최적화

goku-Ingestor vNext의 성능 프로필을 더욱 개선하기 위한 지속적인 노력으로, 미래 작업에서는 더 많은 메모리 최적화에 집중하여 문자열 복사를 줄이는 것을 목표로 할 것입니다. 메모리 관리 전략을 분석하고 섬세하게 조정함으로써, 문자열 처리의 추가적인 효율성을 달성할 것으로 예상되며, 결과적으로 자원 소비와 처리 부하의 더 많은 감소를 이끌어낼 수 있을 것입니다.


<div class="content-ad"></div>

## 증진된 구문 분석을 위한 Thrift 통합

Apache Thrift의 구조화된 데이터 직렬화 능력을 활용하면 들어오는 데이터의 구문 분석을 최적화할 수 있는 유망한 방법이 제시됩니다. 현재 사용 중인 수동 문자열 구문 분석을 Thrift 구조를 활용하여 더 효율적이고 간소화된 프로세스로 대체할 수 있습니다. 이 미래 프로젝트는 전체 구문 분석 효율을 향상시키는 데 그치지 않고 다양한 데이터 형식을 처리하기 위한 견고하고 확장 가능한 프레임워크를 제공하는 것을 목표로 합니다.

## 협조와 스마트 워커 부하 분산

우리가 발견한 관찰 중 하나는 일관된 해싱을 사용하여 작업 부하를 분배하더라도 파티션 간의 트래픽 부하가 종종 불균형하다는 것입니다. 이 문제를 해결하기 위해 더 똑똑한 작업자가 무거운 부분을 식별하고 우선 처리할 수 있는 메커니즘을 개발할 계획입니다. 전체 작업 부하에 가장 많은 기여를 하는 파티션을 식별함으로써, 작업자는 최적의 처리량을 위해 할당될 수 있습니다.

<div class="content-ad"></div>

# 결론

병목 현상을 식별하여 Goku-Ingestor vNext의 간소화된 디자인을 구현하기까지의 여정은 성능 메트릭을 높이는 데 그치지 않고 전략적 엔지니어링 개입의 힘을 보여 주었습니다. Goku-Ingestor vNext의 성공은 데이터 처리 파이프라인의 복잡성을 탐험하는 사람들에게 빛이 되며, 혁신과 최적화가 강력하고 비용 효율적인 인프라 구축의 핵심 요소임을 입증하고 있습니다.

Pinterest의 실시간 분석 데이터 처리 분야에서 가능한 것의 한계를 계속 미는 데 흥분합니다.

# 감사의 글

<div class="content-ad"></div>

안부드 샤르마 (수석 소프트웨어 엔지니어 | 데이터 엔지니어링)는 디자인, 카프카 한계에 관한 훌륭한 통찰을 제공했으며 프로파일링 작업에 도움을 주었습니다.

바히드 하셈이안 (소프트웨어 엔지니어 | 로깅 플랫폼)은 테스트 작업과 KTLO 문제에 큰 도움을 주었습니다.

Pinterest에서의 엔지니어링에 대해 더 알아보려면 저희 엔지니어링 블로그의 나머지를 확인하고 Pinterest Labs 사이트를 방문해주세요. 열린 직무를 탐색하고 신청하려면 저희 채용 페이지를 방문해주세요.