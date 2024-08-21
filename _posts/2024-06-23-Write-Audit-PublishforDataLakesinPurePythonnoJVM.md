---
title: "JVM 없이 순수 파이썬으로 데이터 레이크 감사 및 게시 방법"
description: ""
coverImage: "/assets/img/2024-06-23-Write-Audit-PublishforDataLakesinPurePythonnoJVM_0.png"
date: 2024-06-23 13:27
ogImage:
  url: /assets/img/2024-06-23-Write-Audit-PublishforDataLakesinPurePythonnoJVM_0.png
tag: Tech
originalTitle: "Write-Audit-Publish for Data Lakes in Pure Python (no JVM)"
link: "https://medium.com/towards-data-science/write-audit-publish-for-data-lakes-in-pure-python-no-jvm-25fbd971b17d"
isUpdated: true
---

## 아파치 아이스버그, 람다 및 프로젝트 네시를 사용하여 WAP의 오픈 소스 구현, 모두 Python으로 완전히 실행

![이미지](/assets/img/2024-06-23-Write-Audit-PublishforDataLakesinPurePythonnoJVM_0.png)

# 소개

이 블로그 포스트에서는 Apache Iceberg를 열린 테이블 포맷으로 사용하고 git과 유사한 시맨틱을 지원하는 데이터 카탈로그인 프로젝트 네시를 사용하여 데이터 레이크에서 Write-Audit-Publish(WAP) 패턴에 대한 간결한 참조 구현을 제공합니다.

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

Nessie를 선택한 이유는 그 분기 기능이 WAP 디자인을 구현하는 데 좋은 추상화를 제공하기 때문입니다. 무엇보다도 개발자 경험 측면에서 JVM이 필요하지 않도록 PyIceberg를 기반으로 구축하도록 선택했습니다. 실제로 통합 애플리케이션을 포함한 전체 프로젝트를 실행하려면 Python과 AWS만 필요합니다.

Nessie는 기술적으로 Java로 구축되었지만 이 프로젝트에서는 데이터 카탈로그가 AWS Lightsail에 의해 컨테이너로 실행되며 우리는 단지 엔드포인트를 통해서만 상호 작용할 것입니다. 결과적으로 우리는 Python에서 쿼리 다운스트림을 포함한 전체 WAP 로직을 표현할 수 있습니다!

PyIceberg가 상대적으로 새로운데, 기본으로 지원되지 않는 것들이 많습니다. 특히, 쓰기는 여전히 초기 단계에 있으며, Iceberg 테이블의 분기는 아직 지원되지 않습니다. 따라서 여기에서 찾을 수 있는 것은 Python에서 직접 Nessie에서 Iceberg 테이블을 분기하는 것이 가능하도록 우리가 직접 수행한 일부 원래 작업의 결과입니다.

그렇게 해서 모든 것이 어느 정도 이루어졌습니다.

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

# 와닝! 낯선 단어 "WAP"이 나타났어요!

2017년에 Netflix의 Michelle Winters가 데이터에서 사용되는 디자인 패턴인 Write-Audit-Publish (WAP)에 대해 이야기를 했어요. 기본적으로 WAP는 데이터 품질 검사를 하기 쉽게 만들기 위한 기능적 디자인을 지향해요. 이를 통해 데이터가 하류 사용자에게 제공되기 전에 데이터 품질 검사를 구현하는 것이 목표에요.

예를 들어, 대표적인 사용 사례는 데이터 수집 시 데이터 품질을 확인하는 것이에요. 이 과정은 새로 수집된 데이터에 대해 스테이징 환경을 생성하고 품질 테스트를 진행한 후, 해당 데이터를 하류 애플리케이션에 제공하는 것처럼 보여요.

이름에서 알 수 있듯이, WAP에는 기본적으로 세 단계가 있어요:

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

- 작성. 소비자가 접근할 수 없는 위치에 데이터를 배치하십시오(예: 스테이징 환경 또는 브랜치).
- 감사. 데이터를 변환하고 테스트하여 사양을 준수하는지 확인하십시오(예: 스키마가 갑자기 변경되었거나 NULL과 같이 예기치 않은 값이 있는지 확인).
- 배포. 데이터를 소비자가 읽을 수 있는 위치에 배치하십시오(예: 프로덕션 데이터 레이크).

![이미지](/assets/img/2024-06-23-Write-Audit-PublishforDataLakesinPurePythonnoJVM_1.png)

이것은 WAP 패턴의 가능한 응용 사례 중 하나에 불과합니다. ETL 및 데이터 수집부터 분석 및 ML 응용프로그램을 지원하는 복잡한 데이터 파이프라인까지 데이터 수명주기의 다양한 단계에서 적용할 수 있다는 것을 쉽게 알 수 있습니다.

매우 유용한 WAP이지만 아직 널리 보급되지 않았으며 최근에 기업들이 더 체계적으로 생각하기 시작했습니다. 오픈 테이블 형식 및 Nessie, LakeFS와 같은 프로젝트의 등장으로 이 과정이 가속화되고 있지만 아직은 조금 전방적입니다.

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

어쨌든, 데이터에 대해 생각하는 아주 좋은 방법이며, 엔지니어들을 깨어나게 하는 일반적인 문제를 해결하는 데 굉장히 유용합니다. 그래서 우리가 어떻게 구현할 수 있는지 살펴봅시다.

# Python에서 데이터 레이크에 대한 WAP

우리는 WAP에 대한 이론적 논의를 하지 않을 것이며, 다른 방법을 구현하는 방법의 철저한 조사를 제공하지 않을 것입니다 (Dremio의 Alex Merced 및 LakeFs의 Einat Orr가 이미 이에 대해 훌륭한 작업을 하고 있습니다). 대신, 데이터 레이크에 대한 WAP의 참조 구현을 제공할 것입니다.

# 아키텍처 및 워크플로우

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

여기서 아이디어는 섭밽 워크플로우를 시뮬레이션하고 데이터 레이크를 분기하고 데이터 품질 테스트를 실행하여 WAP 패턴을 구현하는 것입니다. 그 후 해당 데이터를 데이터 레이크의 최종 테이블에 넣을지 결정합니다.

저희는 Nessie 분기 기능을 사용하여 다운스트림 소비자가 데이터를 읽을 수 없는 샌드박스 환경을 확보하고 AWS Lambda를 사용하여 WAP 로직을 실행합니다.

기본적으로 새로운 파케이 파일이 업로드될 때마다 람다가 실행되어 데이터 카탈로그에서 브랜치를 생성하고 데이터를 아이스버그 테이블에 추가합니다. 그런 다음, PyIceberg를 사용하여 간단한 데이터 품질 테스트를 수행하여 테이블의 특정 열에 NULL 값이 포함되어 있는지 확인합니다.

만약 그렇다면, 데이터 품질 테스트가 실패합니다. 새로운 브랜치는 데이터 카탈로그의 주요 브랜치에 병합되지 않으며, 데이터 레이크의 주요 브랜치에서 데이터를 읽을 수 없게 됩니다. 대신, 슬랙으로 경고 메시지가 전송될 것입니다.

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

만약 답이 '아니오'이고 데이터에 NULL 값이 포함되어 있지 않다면, 데이터 품질 테스트가 통과됩니다. 새 브랜치는 데이터 카탈로그의 주 브랜치로 병합되며 다른 프로세스가 읽을 수 있도록 데이터 레이크의 Iceberg 테이블에 데이터가 추가됩니다.

![이미지](/assets/img/2024-06-23-Write-Audit-PublishforDataLakesinPurePythonnoJVM_2.png)

모든 데이터는 완전히 합성되어 있으며 프로젝트를 실행함으로써 자동으로 생성됩니다. 물론, 데이터 품질 사양을 준수하는 데이터를 생성할지 또는 일부 NULL 값을 포함하는 데이터를 생성할지 선택할 수 있습니다.

전체 엔드투엔드 플로우를 구현하기 위해 다음 구성 요소를 사용할 것입니다:

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

- 저장소: AWS S3
- 오픈 테이블 형식: Apache Iceberg
- 데이터 카탈로그: Project Nessie
- 코드 구현: PyIceberg, PyNessie
- 서버리스 런타임: Lambda
- 가상 전용 서버: Lightsail
- 경보 시스템: Slack

![이미지](/assets/img/2024-06-23-Write-Audit-PublishforDataLakesinPurePythonnoJVM_3.png)

이 프로젝트는 상당히 자립적이며 전체 인프라를 설정하는 스크립트가 함께 제공되므로 AWS 및 Python에 대한 입문 수준만 있으면 됩니다.

또한, 이 프로젝트는 프로덕션에 즉시 사용할 수 있는 솔루션이 아닌 참고 구현으로, 더 복잡한 시나리오를 위한 출발점입니다. 코드는 매우 상세하고 주석이 많아서 기본 개념을 수정하고 확장하여 누구의 사용 사례에 더 적합하게 만드는 것이 쉽습니다.

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

# 시각화

데이터 품질 테스트 결과를 시각화하기 위해 매우 간단한 Streamlit 앱을 제공합니다. 새 데이터가 S3의 첫 번째 위치에 업로드될 때 발생하는 일을 확인할 수 있습니다 — 이 위치는 하류 소비자들에게 제공되지 않습니다.

앱을 사용하여 서로 다른 브랜치 간의 테이블에 있는 행의 개수를 확인할 수 있습니다. 또한, main 이외의 브랜치에서는 데이터 품질 테스트가 실패한 열과 행 수를 쉽게 확인할 수 있습니다.

![이미지](/assets/img/2024-06-23-Write-Audit-PublishforDataLakesinPurePythonnoJVM_4.png)

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

# 호수에서 호수집까지

아이스버그를 기반으로 한 WAP 플로우가 구성되면 이를 활용하여 하류 소비자를 위해 구성 가능한 디자인을 구현할 수 있습니다. 우리의 저장소에는 이러한 아키텍처 가능성을 탐색하는 방법으로 Snowflake 통합을 설명하는 지침을 제공합니다.

![이미지](/assets/img/2024-06-23-Write-Audit-PublishforDataLakesinPurePythonnoJVM_5.png)

이것은 호수집 아키텍처의 주요 원칙 중 하나로, 현대 데이터 웨어하우스보다 유연하고 전통적인 데이터 호수보다 사용하기 쉬운 설계로 고안되었습니다.

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

한편, Lakehouse는 객체 저장소를 활용하여 데이터 중복을 제거하고 동시에 저장 비용을 낮추는 데 의존하며, 다른 목적을 위해 다양한 컴퓨트 엔진을 선택하는 데 더 많은 유연성을 제공해야 합니다.

모든 것이 이론상 매우 흥미로워 보이지만, 대규모로 엔지니어링하는 것은 매우 복잡하게 느껴질 수 있습니다. 심지어 Snowflake와 S3 버킷 간의 단순한 통합조차 꽤 지루할 정도입니다.

그렇다고 해도, 천 마일의 여정도 한 걸음부터 시작된다는 것을 염두에 두면, 간단하지만 구체적이고 실용적인 결과를 얻을 수 있는 가장 낮은 과일을 따라가는 게 어떨까요?

저장소에서의 예시는 WAP 및 데이터 품질 테스트 중 하나를 보여줍니다. 여기서 WAP 패턴은 데이터 품질 테스트(그리고 어떤 경우에는 일부 적재 ETL에 대해서도)에 필요한 계산을 데이터 웨어하우스 외부로 이동시키는 기회를 제공하면서도 인증된 자산에 대한 높은 가치 분석 워크로드에 대한 Snowflake의 장점을 활용할 수 있도록 합니다. 이 게시물이 개발자들이 자신의 개념 증명을 구축하고 이용하는 데 도움이 되기를 바랍니다.

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

# 결론

여기 제안된 참조 구현에는 여러 가지 장점이 있습니다:

## 테이블이 파일보다 좋습니다

데이터 레이크는 과거에 개발하기 어려웠던 영역이었습니다. 왜냐하면 데이터 추상화는 일반적으로 좋은 구식 데이터베이스에서 채택된 것과 매우 다르기 때문입니다. Spark와 같은 Big Data 프레임워크는 먼저 파일로 저장된 대량의 원시 데이터를 처리할 수 있는 기능을 제공했지만, 사람들은 종종 파일의 관점으로 생각하지 않고 테이블의 관점으로 생각합니다.

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

우리는 이유가 있어 오픈 테이블 형식을 사용합니다. Iceberg는 주 파일 대신 테이블로 주 데이터 레이크 추상화를 변환하여 상당히 직관적으로 만듭니다. 데이터를 탐색하기 위해 이제는 SQL 쿼리 엔진을 네이티브로 사용할 수 있으며 정확한 스키마 진화를 제공할 수 있도록 Iceberg를 신뢰할 수 있습니다.

## 상호 운용성이 좋아요

Iceberg는 아키텍처적으로 더 큰 상호 운용성도 허용합니다. 오픈 테이블 형식을 사용하는 주요 이점 중 하나는 데이터를 객체 저장소에 보관하면서 고성능 SQL 엔진(Spark, Trino, Dremio) 및 데이터 창고(Snowflake, Redshift)를 사용하여 쿼리할 수 있다는 것입니다. Iceberg가 대부분의 계산 엔진에서 지원된다는 사실은 우리가 데이터 플랫폼을 설계하는 방식에 깊은 영향을 미칩니다.

위에서 설명한 대로, Snowflake와의 제안된 통합은 조정으로 ETL 처리 및 데이터 품질 테스트를 데이터 창고 밖으로 이동시키고 대규모 분석 작업 및 고성능 필요한 마지막 마일 쿼리에 대한 데이터 창고를 유지하는 것이 대규모 분석 작업으로 전환되어 상당히 낮은 비용으로 이어질 수 있다는 것을 나타냅니다.

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

## 브랜치는 유용한 추상화입니다

WAP 패턴은 데이터를 소비자가 실수로 읽을 수 없는 위치에 작성하는 방법을 필요로 합니다. 브랜치 세맨틱스는 이를 구현하는 방법을 제공하므로, 데이터 카달로그 수준에서 브랜치 세맨틱스를 활용하기 위해 Nessie를 사용합니다. Nessie는 Iceberg 및 해당 타임 트래버스 및 테이블 브랜치 기능을 기반으로 구축됩니다. 우리의 레포지토리에서 수행하는 많은 작업은 Nessie를 직접 Python에서 작동하도록 만드는 것입니다. 결과적으로 Nessie 카달로그에 상호 작용하고 데이터 카달로그의 여러 브랜치에 Iceberg 테이블을 작성할 수 있으며 JVM 기반 프로세스를 사용하지 않아도 됩니다.

## 개발자 경험을 간소화합니다

마지막으로, 끝에서 끝까지 완전히 Python 기반 경험을 만드는 것은 시스템 설정 및 상호 작용을 현저하게 간소화합니다. 우리가 알고있는 다른 시스템은 JVM이나 추가 호스팅 서비스가 필요하거나 서로 다른 브랜치에 다시 Iceberg 테이블을 작성하기 위해 외부에서 호스팅되어야 하는 반면, 이 구현에서는 전체 WAP 논리가 단일 람다 함수 내에서 실행될 수 있습니다.

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

JVM에는 본질적으로 문제가 없습니다. 많은 빅데이터 프레임워크의 근본적인 구성 요소로서, 특정 플랫폼 리소스와 작업하기 위한 공통 API를 제공함과 동시에 보안과 정확성을 보장합니다. 그러나 JVM은 개발자 경험 측면에서 부담이 될 수 있습니다. Spark와 작업한 사람들은 JVM 기반 시스템이 까다로우며 신비한 오류로 실패하는 경향이 있다는 사실을 알고 있습니다. 데이터 작업을 하는 많은 사람들은 Python을 주 프로그래밍 언어로 삼고 있기 때문에 JVM의 이점이 사용성 측면에서 비용이 드는 것으로 여겨집니다.

우리는 이러한 것들처럼 더 많은 사람들이 조립 가능한 디자인에 대해 흥미를 가지길 바라며, Iceberg와 Arrow와 같은 오픈 표준이 표준이 될 것을 희망합니다. 그리고 무엇보다도 우리는 이것이 유용할 것이라고 기대합니다.

그렇게 됩니다.
