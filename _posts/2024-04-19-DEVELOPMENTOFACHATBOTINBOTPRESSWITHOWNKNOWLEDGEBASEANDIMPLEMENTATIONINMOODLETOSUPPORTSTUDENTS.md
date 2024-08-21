---
title: "Botpress로 챗봇 개발 하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "DEVELOPMENT OF A CHATBOT IN BOTPRESS WITH OWN KNOWLEDGE BASE AND IMPLEMENTATION IN MOODLE TO SUPPORT STUDENTS"
link: "https://medium.com/@stefanpietrusky/development-of-a-chatbot-in-botpress-with-own-knowledge-base-and-implementation-in-moodle-to-55d3a46cbaff"
isUpdated: true
---

![Botpress Image](/assets/img/DEVELOPMENTOFACHATBOTINBOTPRESSWITHOWNKNOWLEDGEBASEANDIMPLEMENTATIONINMOODLETOSUPPORTSTUDENTS_0.png)

AI 에이전트 또는 챗봇은 비즈니스 업무를 자동화하고 최적화하거나 고객 문의를 지원하는 데 널리 사용됩니다. 이러한 봇의 개발 및 구현은 수업을 지원하거나 세미나에서 학생을 지원하는 데 계속해서 증가하고 있습니다. 마찬가지로 ChatGPT와 같은 LLM은 이제 교육 기관 외의 학습자들에 의해 작업을 완료하는 데 사용되고 있습니다. 이제 자체 봇 (예: Rasa, Amazon Lex 등)을 설정하고 (AWS [via EC2], Google Cloud, Heroku, DigitalOcean 등) 호스팅하는 다양한 옵션이 있습니다. 봇 설정하는 것은 크게 번거롭지 않지만 호스팅은 빠르게 압도적일 수 있습니다. 이 절차를 간소화하기 위해 본 기사에서는 Botpress 프레임워크를 사용하여 챗봇을 개발하는 방법을 소개합니다. 그리고 해당 봇을 Moodle과 같은 LMS에 구현하여 교사가 학습자들로부터의 반복적인 조직적 질문에 답변할 수 있도록 합니다.

# BOTPRESS 소개

먼저, Botpress 웹사이트에 접속하여 무료 계정을 만듭니다.

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

![DEVELOPMENTOFACHATBOTINBOTPRESSWITHOWNKNOWLEDGEBASEANDIMPLEMENTATIONINMOODLETOSUPPORTSTUDENTS_1.png](/assets/img/DEVELOPMENTOFACHATBOTINBOTPRESSWITHOWNKNOWLEDGEBASEANDIMPLEMENTATIONINMOODLETOSUPPORTSTUDENTS_1.png)

무료 요금제는 절차를 시연하는 데 충분합니다. 여기서 총 5개의 봇을 생성할 수 있으며 100 MB의 벡터 데이터베이스 저장공간, $5의 AI 크레딧, 5000개의 테이블 행, 매월 2,000개의 메시지를 받을 수 있으며 최대 3명이 공유 작업 공간을 통해 생성된 봇에 협업할 수 있습니다. 계정을 생성할 때 신용카드가 필요하지 않습니다. Botpress에 로그인하면 Botpress 클라우드로 리디렉션이 되어 개별 작업 공간으로 이동합니다.

![DEVELOPMENTOFACHATBOTINBOTPRESSWITHOWNKNOWLEDGEBASEANDIMPLEMENTATIONINMOODLETOSUPPORTSTUDENTS_2.png](/assets/img/DEVELOPMENTOFACHATBOTINBOTPRESSWITHOWNKNOWLEDGEBASEANDIMPLEMENTATIONINMOODLETOSUPPORTSTUDENTS_2.png)

현재 워크스페이스에 두 개의 봇이 있습니다. 봇이 없는 경우, 파란색 "+ 새 봇" 버튼을 클릭하십시오. 봇을 선택한 다음 "스튜디오에서 편집"을 클릭하십시오.

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

![DEVELOPMENTOFACHATBOTINBOTPRESSWITHOWNKNOWLEDGEBASEANDIMPLEMENTATIONINMOODLETOSUPPORTSTUDENTS_3.png](/assets/img/DEVELOPMENTOFACHATBOTINBOTPRESSWITHOWNKNOWLEDGEBASEANDIMPLEMENTATIONINMOODLETOSUPPORTSTUDENTS_3.png)

만약 당신이 첫 번째 봇을 시작하거나 스튜디오에서 편집하고 싶다면, 아마도 "Learn Botpress" 템플릿을 사용해야 할 것입니다. 그런 경우에는 단순히 새로운 봇을 만들고 템플릿으로 "Start from Scratch"를 선택하면 됩니다.

![DEVELOPMENTOFACHATBOTINBOTPRESSWITHOWNKNOWLEDGEBASEANDIMPLEMENTATIONINMOODLETOSUPPORTSTUDENTS_4.png](/assets/img/DEVELOPMENTOFACHATBOTINBOTPRESSWITHOWNKNOWLEDGEBASEANDIMPLEMENTATIONINMOODLETOSUPPORTSTUDENTS_4.png)

마지막으로, Botpress Studio에 들어가면, 기본적으로 제공되는 Knowledge Base (KB)를 선택하거나 책 아이콘을 사용하여 새로운 Knowledge Base를 생성할 수 있습니다.

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

![DEVELOPMENT OF A CHATBOT IN BOTPRESS WITH OWN KNOWLEDGE BASE AND IMPLEMENTATION IN MOODLE TO SUPPORT STUDENTS_5](/assets/img/DEVELOPMENTOFACHATBOTINBOTPRESSWITHOWNKNOWLEDGEBASEANDIMPLEMENTATIONINMOODLETOSUPPORTSTUDENTS_5.png)

KB에 데이터를 다양한 형식으로 사용할 수 있습니다. 이는 텍스트 편집기를 통해 직접 수행하거나 문서를 업로드하거나, 표 또는 특정 웹사이트와 같은 외부 데이터 소스로 직접 처리될 수 있습니다. 일반적인 인터넷 검색도 KB로 사용될 수 있습니다.

![DEVELOPMENT OF A CHATBOT IN BOTPRESS WITH OWN KNOWLEDGE BASE AND IMPLEMENTATION IN MOODLE TO SUPPORT STUDENTS_6](/assets/img/DEVELOPMENTOFACHATBOTINBOTPRESSWITHOWNKNOWLEDGEBASEANDIMPLEMENTATIONINMOODLETOSUPPORTSTUDENTS_6.png)

KB는 봇을 이해하는 데 중심적인 구성 요소 또는 기초입니다. 사용자 요청이나 작업을 수행하는 데 필요한 데이터가 포함되어 있습니다. 여기에 장점은 봇이 어떤 것에 대답할 수 있고 무엇에 대답할 수 없는지 정확히 정의할 수 있다는 것입니다. 이러한 방식으로 사용자에게 원치 않거나 오해를 일으킬 수 있는 피드백이 방지됩니다.

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

이 기사에서는 현재 학기에 대학에서 진행 중인 세미나와 관련된 예시로 10가지 FAQ에 대한 답변이 담긴 문서를 만들었습니다. 이는 구체적으로 2D 게임 개발의 기본 사항을 다룹니다. 문서를 업로드한 후에는 즉시 봇을 테스트하고 질문할 수 있습니다. 이를 위해서는 "질문하기"를 클릭하면 됩니다. 봇은 문서에 포함된 정보를 기반으로 질문에 답할 것입니다.

Markdown 형식으로 테이블 태그를 바꾸었습니다.

메인 뷰로 돌아갑시다. 현재 빈 템플릿은 노트와 시작 및 종료 지점으로 구성되어 있습니다. 이 예시에서는 인사말로 간단한 노트를 설정했습니다. 노트를 만들려면 마우스로 작업 공간을 우클릭한 다음 "표준 노트"를 선택하면 됩니다. 그리고 "메시지 보내기" 섹션에 "텍스트" 카드를 노트에 추가했습니다.

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

인사 다음에 다른 주석이 따릅니다. 여기서 "캡처 정보" 영역에서 카드 유형 "Raw Input"이 선택되었습니다. 이전에 생성한 KB "gamedevelopment"가 카드에 할당되고 사용자에게 묻는 질문이 정의되었습니다. 정보 수집 카드를 사용하면 봇이 처리를 일시 중지하고 사용자로부터 응답을 기다리게 할 수 있습니다. 동시에 사용자 입력에서 특정 정보를 캡처합니다.

![이미지](/assets/img/DEVELOPMENTOFACHATBOTINBOTPRESSWITHOWNKNOWLEDGEBASEANDIMPLEMENTATIONINMOODLETOSUPPORTSTUDENTS_9.png)

Botpress Studio에서 이 간단한 데모에 대해서는 추가로 설정할 필요가 없습니다. 봇을 직접 시험해볼 수 있습니다. 대화가 시작되면 먼저 일반 인사가 나오고, 그 후에는 봇이 KB에 따라 답변할 수 있는 질문의 답변이 나옵니다. 텍스트뿐만 아니라 비디오, 이미지 또는 오디오 파일을 사용하여 사용자를 인사할 수도 있습니다.

![이미지](/assets/img/DEVELOPMENTOFACHATBOTINBOTPRESSWITHOWNKNOWLEDGEBASEANDIMPLEMENTATIONINMOODLETOSUPPORTSTUDENTS_10.png)

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

# 컴퓨터가 대답을 하지 못할 질문을 받았을 때!

만약 봇이 KB의 데이터를 기반으로 대답할 수 없는 질문을 받으면 어떻게 될까요?

문제를 해결하기 위해, "Raw Input" 카드를 선택하고 입력을 저장할 변수를 설정합니다. 이 예시에서는 "user_input"이라는 변수를 만들었습니다.

![이미지](/assets/img/DEVELOPMENTOFACHATBOTINBOTPRESSWITHOWNKNOWLEDGEBASEANDIMPLEMENTATIONINMOODLETOSUPPORTSTUDENTS_11.png)

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

그다음으로, 현재 노트에 위치한 "Flow Logic" 영역에 "Expression" 카드를 생성합니다. 해당 카드를 선택하고 다음의 부울 변수 "{!turn.KnowledgeAgent.responded}"을 조건으로 정의합니다. 이 변수는 정보를 "yes" 또는 "no", 또는 "true" 또는 "false" 중 하나로 저장합니다. 이 특정 예시에서 우리는 봇에게 다음과 같이 말합니다: KB에 있는 데이터를 기반으로 질문에 대답할 수 없다면 아래 경로를 따르도록 해야 합니다.

![image](/assets/img/DEVELOPMENTOFACHATBOTINBOTPRESSWITHOWNKNOWLEDGEBASEANDIMPLEMENTATIONINMOODLETOSUPPORTSTUDENTS_12.png)

이제, 봇이 대답할 수 없었던 모든 질문을 저장하는 테이블을 생성합니다. 탐색기에서 "테이블 추가"를 클릭하고 테이블에 이름 "questions_unansweredTable"을 주고 다른 열(문자열 유형)을 생성합니다.

![image](/assets/img/DEVELOPMENTOFACHATBOTINBOTPRESSWITHOWNKNOWLEDGEBASEANDIMPLEMENTATIONINMOODLETOSUPPORTSTUDENTS_13.png)

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

우리는 봇의 구조를 보여주는 뷰로 돌아갑니다. 여기서 다른 노트를 생성하고 KB 노트에 연결하고 "Record 삽입" (실행) 카드를 구현합니다. 이를 맵에 설정합니다. 테이블에서 만든 열(질문)에는 변수 "user_input"에 저장된 정보, 즉 사용자 입력에서 {workflow.user_input} 가져온 정보를 저장해야 합니다.

<img src="/assets/img/DEVELOPMENTOFACHATBOTINBOTPRESSWITHOWNKNOWLEDGEBASEANDIMPLEMENTATIONINMOODLETOSUPPORTSTUDENTS_14.png" />

그런 다음, 노트에 (텍스트) 카드를 만들어 현재 질문에 대답할 수 없다는 사용자 피드백을 제공합니다. 이제 봇을 다시 테스트해 봅시다. 봇이 대답할 수 없는 예시 질문을 하고자 합니다. 그러면 봇이 이 질문에 대답할 수 없다는 피드백을 받을 것입니다. 생성된 테이블에서 봇이 대답할 수 없었던 질문이 "질문" 열에 나열됩니다. 이렇게 함으로써 봇의 KB를 어떻게 확장할 수 있는지 빠르고 쉽게 찾아낼 수 있습니다. 사용자들이 가지고 있는 질문들을 확인할 수도 있습니다.

<img src="/assets/img/DEVELOPMENTOFACHATBOTINBOTPRESSWITHOWNKNOWLEDGEBASEANDIMPLEMENTATIONINMOODLETOSUPPORTSTUDENTS_15.png" />

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

# 봇 공개하기

이제 Botpress로 생성된 봇을 공개하는 작업을 진행하겠습니다. 이를 위해 스튜디오에서 "Public"을 클릭합니다. 공개한 후에는 왼쪽 상단의 Botpress 로고를 클릭하여 대시보드로 돌아갑니다. 생성된 봇의 대시보드에서 "Integrations"로 이동하여 "Settings" 영역에서 다양한 설정을 할 수 있습니다. 구체적으로 봇에 이름을 붙이고, 아이콘을 사용하여 봇을 사용자 정의할 수 있는 아바타 URL을 저장할 수 있습니다. 봇에 대한 일반 설명을 제공하고, 사용자가 처음으로 텍스트를 입력하기 전에 표시되는 플레이스홀더 텍스트를 작성할 수 있으며, 일반 정보(이메일 주소, 개인정보 보호 정보, 약관)를 입력할 수도 있습니다. 다양한 매개변수를 편집한 후에는 설정을 저장하기 위해 "Save configuration"을 확인합니다. 사용자 정의 사항이 저장되었다는 메시지가 나타날 때까지 잠시 기다립니다. 봇의 색상 모양을 사용자 정의하기 위해서는 스타일시트 URL이 필요합니다. 이를 생성하기 위해 텍스트 필드 위의 단어를 클릭합니다.

![이미지](/assets/img/DEVELOPMENTOFACHATBOTINBOTPRESSWITHOWNKNOWLEDGEBASEANDIMPLEMENTATIONINMOODLETOSUPPORTSTUDENTS_16.png)

# 웹챗 스타일러로 봇 스타일링하기!

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

봇의 외관은 “스타일 가이드” 메뉴에서 조정할 수 있어요. 표준 디자인을 가진 봇이 오른쪽에 표시되므로 매개 변수를 변경할 때 조정 사항을 직접 확인할 수 있어요. 위젯의 색상과 크기를 사용자 정의할 수 있어요. 스타일 시트를 사용하여 컨테이너의 색상, 일반 글꼴, 봇 및 사용자 버블, 그리고 채팅 창의 모양을 사용자 정의할 수 있어요. “챗봇 위젯 런처 아이콘” 즉, 실제 채팅 창이 열리기 전에 표시되는 아이콘도 사용자 정의할 수 있어요. 이를 위해 .png 파일을 서버에 호스팅해야 하며(예: 워드프레스 사이트의 미디어 라이브러리 또는 자체 디스코드 서버를 통해), 이미지의 URL을 사용해야 해요.

![Chatbot](/assets/img/DEVELOPMENTOFACHATBOTINBOTPRESSWITHOWNKNOWLEDGEBASEANDIMPLEMENTATIONINMOODLETOSUPPORTSTUDENTS_17.png)

채팅 창 내 봇의 아이콘은 여기서 사용자 정의할 수 없어요. “고급 스타일러” 메뉴에서 CSS를 통해 봇의 외관을 조정할 수 있어요. 예를 들어, 봇의 푸터에서 텍스트를 삭제하려면 “bpw-powered” 클래스를 지우면 돼요. 이 접근 방식을 선택하면 CSS에 익숙해져 있어야 해요. 다음 코드를 사용하여 “챗봇 위젯 런처 아이콘”을 사용자 정의할 수 있어요:

```js
/* 봇 위젯 아이콘 변경 */
.bpw-widget-btn{
  border-radius: 50%;
  background: url("여기에 URL 입력");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.bpw-floating-button::before {
  background: none;
}

.bpw-floating-button {
  box-shadow: none !important;
}

.bpw-floating-button:hover {
  box-shadow: none !important;
}
```

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

전체적으로 "고급 스타일러"에는 많은 맞춤 설정 옵션이 더 많이 있습니다. 봇이 마침내 여러분의 디자인 요구 사항을 충족한다면, 디자인을 다시 디자인할 때 다시 처음부터 시작하지 않아도 되도록 .css 파일(스타일 시트)에 CSS 코드를 저장해야 합니다.

![image](/assets/img/DEVELOPMENTOFACHATBOTINBOTPRESSWITHOWNKNOWLEDGEBASEANDIMPLEMENTATIONINMOODLETOSUPPORTSTUDENTS_18.png)

디자인의 "스타일시트 URL 가져오기" URL을 마침내 복사하여 생성된 봇의 대시보드에 붙여넣습니다. 참고로 워드프레스, Moodle 등으로 통합된 후 지정된 디자인을 적용하는 데 봇이 잠시 시간이 걸릴 수 있습니다.

# MOODLE 구현

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

LMS(Moodle 등)에 봇을 구현하기 위해서 이제 "Pre-configured" 옵션을 사용합니다. "Embedded" 제목 아래에는 필요한 두 개의 자바스크립트가 있습니다. 특히, 첫 번째 스크립트는 봇과 상호 작용할 수 있도록 Botpress 라이브러리를 로드합니다. 두 번째 스크립트는 봇의 구성 파일(ID, 이름, 외관, 동작 등)을 로드합니다. 해당 파일이 없으면 봇이 작동하지 않습니다.

간단한 통합 옵션 대신에, 두 번째 스크립트(구성 파일)의 일부 매개변수를 조정하기 위해 "Configurable" 옵션으로 이동할 수 있습니다.

![이미지](/assets/img/DEVELOPMENTOFACHATBOTINBOTPRESSWITHOWNKNOWLEDGEBASEANDIMPLEMENTATIONINMOODLETOSUPPORTSTUDENTS_19.png)

![이미지](/assets/img/DEVELOPMENTOFACHATBOTINBOTPRESSWITHOWNKNOWLEDGEBASEANDIMPLEMENTATIONINMOODLETOSUPPORTSTUDENTS_20.png)

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

Chatbot이 Botpress를 사용하여 생성되고 준비되었으면 이제 Moodle 설치 강좌로 넘어갑니다. 강좌에서는 활동을 만들기 위해 관리자 권한이 필요합니다. 이 권한이 있으면 간단한 "텍스트 및 미디어 필드" 활동을 만듭니다. 이 활동은 이전 버전의 Moodle에서 단순히 "텍스트 필드"로 불렸습니다. 텍스트 필드에서 메뉴를 확장하고 HTML 보기를 활성화합니다. 입력 필드에는 Botpress에 임베드할 두 스크립트를 구현합니다.

![이미지 첨부](/assets/img/DEVELOPMENTOFACHATBOTINBOTPRESSWITHOWNKNOWLEDGEBASEANDIMPLEMENTATIONINMOODLETOSUPPORTSTUDENTS_21.png)

보기를 닫고 활동을 저장합니다. 강좌 편집을 비활성화한 후에는 봇이 강좌 오른쪽 하단에 표시되어야 합니다.

![이미지 첨부](/assets/img/DEVELOPMENTOFACHATBOTINBOTPRESSWITHOWNKNOWLEDGEBASEANDIMPLEMENTATIONINMOODLETOSUPPORTSTUDENTS_22.png)

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

특정 과정에 봇을 통합하는 것 외에도 LMS 전반에 봇을 사용할 수 있습니다. 이를 위해 웹 사이트 관리로 이동한 다음 "디스플레이" 옵션을 클릭합니다. 디스플레이 영역에서 "추가 HTML"로 이동합니다. 여기에서 두 개의 자바스크립트를 "additionalhtmlfooter" 영역에 삽입합니다.

![봇이미지](/assets/img/DEVELOPMENTOFACHATBOTINBOTPRESSWITHOWNKNOWLEDGEBASEANDIMPLEMENTATIONINMOODLETOSUPPORTSTUDENTS_23.png)

변경 사항을 저장한 후, 봇이 LMS 전반에 표시되며 질문에 대답할 준비가 된 상태입니다.

# 워드프레스 구현

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

Botpress 봇은 워드프레스 사이트에 여러 방법으로 통합할 수 있어요. 가장 쉬운 방법은 WPCode 플러그인을 사용하는 것인데, 이를 사용하여 코드나 스크립트를 페이지의 헤더나 푸터 영역에 통합할 수 있어요.

![image](/assets/img/DEVELOPMENTOFACHATBOTINBOTPRESSWITHOWNKNOWLEDGEBASEANDIMPLEMENTATIONINMOODLETOSUPPORTSTUDENTS_24.png)

다른 옵션은 스크립트를 테마 파일을 통해 직접 통합하는 것이에요. 두 가지 방법 모두 "Creator" 요금제가 필요한데, 이를 통해 플러그인을 설치하고 특정 영역을 편집할 수 있어요. 그 두 개의 자바스크립트는 보안상의 이유로 워드프레스가 HTML 코드를 링크로 해석하거나 특정 유형의 JavaScript를 비활성화하기 때문에 코드 편집기나 "사용자 지정 HTML" 블록을 통해 직접 통합할 수 없어요.

# 요약

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

이 게시물은 단계별로 Botpress를 사용하여 자체 정의된 KB를 기반으로 질문에 답변할 수있는 봇을 만드는 방법을 보여주었습니다. 동시에, 답변할 수없는 질문은 봇을 개선하기 위해 수집되었습니다. 그런 다음, 봇의 디자인을 개인화하는 방법을 보여주었습니다. 마지막으로, Moodle LMS에 봇을 구현하는 방법을 설명했습니다. WordPress를 사용하여 만든 사이트에 봇을 통합하는 가능한 방법도 소개되었습니다. 생성 된 봇은 세미나와 관련된 구체적인 질문에 답변하는 간단한 예입니다. 물론, Botpress Studio를 사용하여 학습자의 학습을 일반적으로 지원할 수있는 더 복잡한 봇을 만들 수도 있습니다. 최근 발표된 논문에 따르면, 교육 분야의 챗봇에 대한 연구는 여전히 초기 단계에 있습니다. 전체적으로, 챗봇을 사용한 효과적인 학습 전략 연구는 아직 부족한 것으로 나타났습니다. 전반적으로, 흥미로운 연구 분야입니다. 귀하의 봇 개발을 즐기세요!

[1] Hwang, G. J., & Chang, C. Y. (2023). A review of opportunities and challenges of chatbots in education. Interactive Learning Environments, 31(7), 4099–4112. https://doi.org/10.1080/10494820.2021.1952615

Botpress의 GitHub 메인 페이지로 이동하려면 여기를 클릭하세요. [Botpress GitHub 링크](https://github.com/botpress)
