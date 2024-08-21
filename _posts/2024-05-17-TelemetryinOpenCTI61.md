---
title: "오픈CTI 61의 텔레메트리"
description: ""
coverImage: "/assets/img/2024-05-17-TelemetryinOpenCTI61_0.png"
date: 2024-05-17 04:28
ogImage:
  url: /assets/img/2024-05-17-TelemetryinOpenCTI61_0.png
tag: Tech
originalTitle: "Telemetry in OpenCTI 6.1"
link: "https://medium.com/filigran/telemetry-in-opencti-6-1-801af33efc8a"
isUpdated: true
---

<img src="/assets/img/2024-05-17-TelemetryinOpenCTI61_0.png" />

6.1부터 OpenCTI는 플랫폼과 관련된 일부 측정 값을 수집합니다. 현재 사용량은 이전보다 매우 많은 데이터 양을 의미하기 때문에 플랫폼 성능을 개선하기 위해 이러한 메트릭 수집은 이제 필수적입니다. 또한 우리에게는 워크플로우를 향상시키고 커뮤니티 사용 패턴에 맞게 적응시키는 것이 중요합니다. 데이터는 익명화되어 통계적으로 처리됩니다. 사용자 개인 정보와 기밀 데이터는 수집되지 않습니다.

함께 이 과정을 알아보도록 합시다! 🙂

# 기밀성과 익명화

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

수집된 모든 데이터는 익명화되어 있으며 IP 주소, 이메일 주소 또는 사용자 이름과 같은 개별 사용자를 식별할 수 있는 데이터는 수집하지 않습니다. 따라서 사용자의 개인 정보는 개인정보 규정을 준수하여 보호받고 있습니다.

또한 위협 인식 지식과 관련된 정보를 수집하지 않습니다: 플랫폼에서 소비된 데이터 및 분석 데이터는 엄격히 기밀을 유지합니다.

# 텔레메트리의 목적

수집된 데이터는 다음을 위해 사용됩니다:

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

- 플랫폼 사용을 더 잘 이해하여 응용 프로그램의 기능과 성능을 향상시킵니다.
- 사용자 행동을 분석하여 사용자 경험을 향상시킵니다.
- 내부 측정항목 및 KPI를 위해 집계 및 익명화된 통계를 생성합니다.

미래에는 외부 보고를 위해 이 통계 데이터도 사용할 계획이며, OpenCTI 사용에 대한 직접적인 통찰을 사용자 및 고객 커뮤니티에 제공할 것입니다.

# 텔레메트리 데이터 계산

텔레메트리 데이터를 수집, 관리 및 내보내기하기 위해 OpenTelemetry 라이브러리를 사용합니다.

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

메트릭은 텔레메트리 관리자에 의해 매 시간 수집됩니다. 플랫폼 수명 중 변하지 않는 버전과 같은 일부 메트릭은 텔레메트리 관리자 시작 시에 한 번만 수집됩니다.

## 텔레메트리 데이터 내보내기

데이터는 두 가지 방법으로 매 6시간마다 내보냅니다:

- 파일 내보내기 — 메트릭은 파일 내보내기자를 통해 특정 로그 파일에 기록됩니다. 이 파일은 로컬 OpenCTI 폴더(경로: opencti/opencti-platform/opencti-graphql/telemetry/)에서 찾을 수 있으므로 내보낸 데이터에 액세스할 수 있습니다. 이 파일들은 지원 패키지에 포함되어 있습니다. 이 파일들은 항상 생성되며 비활성화할 수 없습니다.
- OTPL 내보내기 — 연결된 플랫폼의 경우 메트릭은 OTLP 프로토콜을 통해 HTTPS를 통해 telemetry.filigran.io 호스트에 전송됩니다. 이 내보내기는 OpenCTI가 텔레메트리 관리자 시작 시에 호스트명에 연결할 수없는 경우 비활성화됩니다(연결 끊긴 플랫폼).

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

내보낸 데이터는 OpenTelemetry JSON 형식으로 작성됩니다.

![그림](/assets/img/2024-05-17-TelemetryinOpenCTI61_1.png)

## 수집된 데이터

다음은 OpenCTI 6.1에서 수집된 플랫폼 사용에 관련된 메트릭 목록입니다:

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

- 현재 플랫폼 버전,
- 플랫폼 고유 식별자,
- 플랫폼 생성 날짜,
- 노드(인스턴스) 수,
- 총 사용자 수,
- 활성 사용자 수 (즉, 텔레미트리 매니저에 의해 마지막 데이터 수집 이후 세션을 활성화한 사용자 수),
- 엔터프라이즈 에디션 상태 (EE가 활성화되었는지 여부),
- 활성 커넥터 수.

# 다음 단계

향후 플랫폼 사용 상황을 더 잘 이해하기 위해 다른 데이터가 수집될 수 있습니다:

- 엔터프라이즈 에디션 활성화 원점 (EE 팝업이 열린 페이지) 등, 어떤 기능이 사용자가 EE를 가장 많이 채택하게 하는지 알아내기.
- 시간 경과에 따른 평균 세션 기간, 시간이 지남에 따른 사용자 플랫폼 사용 변화 평가.
- 기능 채택률을 평가하기 위한 몇 가지 메트릭, 시간이 지남에 따른 특정 기능 사용량 파악하는 데 도움이 됩니다. 예를 들어 세션당 특정 기능의 API 호출 수를 통해 계산될 수 있습니다.

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

Filigran을 위한 텔레메트리 데이터 수집은 사용자의 개인 정보와 데이터 기밀성을 고려하며, 플랫폼 이용 방식을 더 잘 이해할 수 있게 해줍니다. 이를 통해 사용자들의 행동에 적합한 솔루션과 기능을 제안하고, 우리 커뮤니티를 위해 OpenCTI 경험과 기능을 가장 잘 개선할 수 있습니다.

Slack 커뮤니티 채널에서 언제든지 관련 질문을 자유롭게 해 주세요! 📢
