---
title: "OpenAI와 Google Sheets 통합으로 Slack 봇 만드는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-BuildingaSlackBotwithOpenAIandGoogleSheetsIntegration_0.png"
date: 2024-07-09 18:55
ogImage:
  url: /assets/img/2024-07-09-BuildingaSlackBotwithOpenAIandGoogleSheetsIntegration_0.png
tag: Tech
originalTitle: "Building a Slack Bot with OpenAI and Google Sheets Integration"
link: "https://medium.com/@paulotavares_69273/building-a-slack-bot-with-openai-and-google-sheets-integration-94b1b8397266"
---

이 글에서 OpenAI Assistants의 기능을 활용하고 Google Sheets와 통합하여 사용자 쿼리에 지능적으로 응답하는 Slack 봇을 만드는 방법을 안내할 거에요. 이 봇은 사용자가 어려움을 겪을 때 Slack에서 지원 티켓을 생성할 수도 있어요. 이 튜토리얼을 마치면 Google Sheets 문서에서 관련 정보를 가져와 질문에 답하거나 티켓을 생성할 수 있는 봇을 보유하게 될 거에요.

# 프로젝트 개요

이 프로젝트의 주요 구성 요소는 다음과 같아요:

- app.py: Slack 앱을 초기화하고 수신된 메시지를 처리합니다.
- assistants.py: OpenAI API와의 상호 작용을 관리하고 사용자 쿼리를 처리합니다.
- google_sheets_integration.py: Google Sheets를 통합하여 사용자 쿼리에 대한 답변에 필요한 관련 정보를 가져옵니다.
- create_ticket.py: 특정 Slack 채널에서 지원 티켓을 생성합니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

각 구성 요소를 살펴보고 어떻게 작동하여 기능적인 Slack 봇을 만드는지 알아봅시다.

# 단계 1: 환경 설정

먼저, 환경을 설정해야 합니다. 환경 변수를 관리하기 위해 dotenv를 사용할 것입니다. 다음 종속성이 설치되어 있는지 확인해주세요:

![image](/TIL/assets/img/2024-07-09-BuildingaSlackBotwithOpenAIandGoogleSheetsIntegration_0.png)

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

API 키 및 토큰을 저장하는 .env 파일을 만들어보세요:

![Image](/TIL/assets/img/2024-07-09-BuildingaSlackBotwithOpenAIandGoogleSheetsIntegration_1.png)

# 단계 2: Slack 앱 초기화

app.py 스크립트는 Slack 앱을 초기화하고 수신 메시지를 처리합니다. 이는 OpenAI API를 사용하여 응답을 생성하고 쓰레드 메시지의 컨텍스트를 유지합니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

![Image](/TIL/assets/img/2024-07-09-BuildingaSlackBotwithOpenAIandGoogleSheetsIntegration_2.png)

# 단계 3: OpenAI 통합

assistants.py 스크립트는 OpenAI API와 상호 작용을 관리하고 사용자 쿼리를 처리합니다. Google Sheets 문서에서 정보를 기반으로 응답이 이루어지도록 합니다.

![Image](/TIL/assets/img/2024-07-09-BuildingaSlackBotwithOpenAIandGoogleSheetsIntegration_3.png)

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 단계 4: Google Sheets와 통합하기

구글 시트 통합 스크립트인 google_sheets_integration.py는 사용자 쿼리에 답변하기 위한 관련 정보를 가져 오는 데 Google Sheets와 통합됩니다.

![이미지](/TIL/assets/img/2024-07-09-BuildingaSlackBotwithOpenAIandGoogleSheetsIntegration_4.png)

# 단계 5: 지원 티켓 생성하기

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

create_ticket.py 스크립트는 지정된 Slack 채널에 지원 티켓을 생성합니다.

![ticket image](/TIL/assets/img/2024-07-09-BuildingaSlackBotwithOpenAIandGoogleSheetsIntegration_5.png)

# 마무리

이 가이드를 따라가면, OpenAI 및 Google Sheets와 통합된 Slack 봇을 설정하여 사용자 쿼리에 지능적으로 응답하고 지원 티켓을 생성할 수 있습니다. 이 프로젝트는 다양한 사용 사례에 맞게 확장 및 사용자 정의할 수 있는 기본 기반입니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

일부 오류가 발생할 수 있고, 봇을 사용자의 요구에 맞게 맞추기 위해 조정이 필요할 수 있습니다. 그러나 이 구현은 프로젝트에 좋은 출발점을 제공해줄 것입니다. 즐거운 코딩되세요!
