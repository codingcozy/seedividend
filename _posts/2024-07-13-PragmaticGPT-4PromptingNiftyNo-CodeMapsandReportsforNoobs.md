---
title: "초보자를 위한 실용적 GPT-4 프롬프트 안내 쉽게 만드는 No-Code 지도와 보고서"
description: ""
coverImage: "/TIL/assets/img/2024-07-13-PragmaticGPT-4PromptingNiftyNo-CodeMapsandReportsforNoobs_0.png"
date: 2024-07-13 20:08
ogImage: 
  url: /TIL/assets/img/2024-07-13-PragmaticGPT-4PromptingNiftyNo-CodeMapsandReportsforNoobs_0.png
tag: Tech
originalTitle: "Pragmatic GPT-4 Prompting: Nifty No-Code Maps and Reports for Noobs"
link: "https://medium.com/towards-artificial-intelligence/pragmatic-gpt-4-prompting-nifty-no-code-maps-and-reports-for-noobs-53f92d6cd72a"
---



![Image](/TIL/assets/img/2024-07-13-PragmaticGPT-4PromptingNiftyNo-CodeMapsandReportsforNoobs_0.png)

20년 이상의 컴퓨터 과학 교수로서, 데이터 시각화를 위해 Python 코딩을 하는 데 풍부한 경험이 있습니다.

최근까지 아름다운 데이터 시각화 생성은 저와 같은 사람들 - 컴퓨터 프로그래머 및 데이터 분석가만의 영역이었습니다.

그러나 지금은 GPT-4 채팅 인터페이스에 통합된 새로운 데이터 분석 도구들로 이것이 변화했습니다. 이제 실시간으로 지도와 차트를 생성할 수 있고, 그것들을 전체 PDF 보고서에 포함시킬 수 있습니다.


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

태그를 Markdown 형식으로 변경하시면 됩니다.

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

평화와 경제에 대한 비전을 갖춘 인스티튜트가 제공하는 경제와 평화에 관한 데이터는 Global Peace Index에서 다운로드할 수 있습니다.

지금은 GPT-4가 오늘의 상태에서 데이터 파일을 다운로드할 수 없습니다. 이것이 이 LLM의 향후 버전에서 업데이트되길 희망하고 있습니다.

이 링크에서 다운로드를 시작할 수 있습니다 (XSLX 형식). 

[![이미지](/TIL/assets/img/2024-07-13-PragmaticGPT-4PromptingNiftyNo-CodeMapsandReportsforNoobs_1.png)](링크)

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

파일을 다운로드하면 Excel(또는 Numbers)에서 열어서 "Overall Scores" 탭을 클릭할 수 있습니다. 다음과 같은 내용을 볼 수 있어요:

![Overall Scores](/TIL/assets/img/2024-07-13-PragmaticGPT-4PromptingNiftyNo-CodeMapsandReportsforNoobs_2.png)

다음으로는 이미지에서 강조된 첫 3행을 선택하여 삭제하고, 이 행들을 제거한 후에 이 시트를 global_peace_index.csv라는 CSV 파일로 내보낼 수 있어요. 

이제 GPT-4를 시작할 준비가 되었습니다. 채팅 창을 열고, 주 채팅 창에서 첨부 파일 아이콘을 클릭하세요.

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

<img src="/TIL/assets/img/2024-07-13-PragmaticGPT-4PromptingNiftyNo-CodeMapsandReportsforNoobs_3.png" />

컴퓨터에서 파일을 업로드하라는 메시지가 표시됩니다. 새로 만든 global_peace_index.csv 파일을 찾아 열기를 클릭해주세요.

GPT-4가 이 파일에 액세스할 수 있게 되면, 파일에 대해 질문을 시작할 수 있습니다. 우선, GPT-4에게 이 CSV 파일에 대한 간단한 개요와 각 필드에 대한 설명을 요청해보겠습니다.

GPT-4에게 요청하는 내용: 이 CSV 파일의 간단한 개요와 각 필드에 대한 설명을 제공해주시겠어요?

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

GPT-4의 응답:

![이미지](/TIL/assets/img/2024-07-13-PragmaticGPT-4PromptingNiftyNo-CodeMapsandReportsforNoobs_4.png)

와우! 지금까지 모든 것이 잘 진행 중입니다! 이제 데이터 시각화를 위해 프롬프트를 시작할 수 있을 거에요.

하지만 어디서 시작해야 할까요? 우리가 알고 싶은 것은 무엇일까요? 잘 모르시나요? GPT-4에게 물어볼까요? 아마 여기서 좋은 아이디어가 있을지도 몰라요.

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

확실해요! 이 데이터세트에서 제공된 필드만 사용해서 데이터 시각화를 위한 5가지 좋은 아이디어를 제공할게요:

- 시계열 분석: 특정 국가들의 GPI 점수 추이를 보여주기 위해 2008년부터 2022년까지 라인 차트를 만듭니다. 비교를 위해 세계 평균 선을 포함할 수 있습니다.
- 세계 지도를 이용한 GPI 점수 시각화: 각 국가의 GPI 점수를 선택한 연도를 기준으로 시각적으로 나타내기 위해 세계 지도를 활용합니다. 사용자가 연도를 변경하고 세계 평화의 변화를 확인할 수 있는 인터랙티브 기능이 포함될 수 있습니다.
- 지역평화 추세에 대한 비교 막대그래프: 국가들을 지역(유럽, 아시아, 아프리카 등)별로 그룹화하고 막대그래프를 사용하여 평균 GPI 점수를 표시합니다. 이를 통해 다양한 지역 간의 평화 수준을 비교할 수 있습니다.
- 연도별 GPI 점수 분포를 위한 상자그림 분석: 각 연도별로 전체적인 GPI 점수 분포를 보여줍니다.
- GPI 점수 변화를 나타내는 열지도: 각 국가의 2008년부터 2022년까지의 GPI 점수 변화를 시각화하기 위해 열지도를 생성합니다.

좋은 아이디어들이에요.

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

이제 GPT-4가 무엇을 생산할 수 있고 할 수 없는지 알고있는 지식이 유용할 때입니다. 

저는 이를 많이, 정말 많이 해봤기 때문에 이 결과를 기반으로 안내할 수 있어요. 이 5개의 응답에 대해 제가 아는 것은 다음과 같아요:

- 아이디어 #2 — GPT-4는 아직 순간적으로 상호작용하는 시각화를 만들 수 없어요.
- 아이디어 #3 — GPT-4는 가정을 했어요 — CSV 파일에는 데이터 그룹화가 없기 때문에 추가 데이터가 필요할 거에요.
- 아이디어 #5 — GPT-4는 데이터 시각화의 최상의 관행을 명확하게 이해하고 있지 않아요. 히트맵을 만드는 데 추가적인 안내가 필요할 거예요.

참고: 여기서 중요한 점은 GPT-4를 작업에 집중하도록 유도하는 것인데, LLM이 데이터셋의 필드를 사용하는 예제만 만들 수 있다는 것을 명확히 해야 해요. 그렇지 않으면 사용 가능한 필드로는 불가능한 가정을 할 가능성이 높아요.

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

아이디어 #2는 좋은 시작점 같아요! 그럼 전세계 지도 시각화를 만들어볼까요?

# 코로플레스 맵 생성

코로플레스 맵은 나라별 전세계 평화 지수를 시각화하는 훌륭한 방법이에요.

코로플레스 맵은 미리 정의된 지리적 영역에서 특정 데이터 변수를 나타내기 위해 다양한 음영/색상을 사용하는 테마틱 맵입니다.

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

GPT-4는 쉽게 코로플레스 맵을 만들 수 있어요. 깔끔하고 쉽죠.

GPT-4에게 제시된 내용: 좋아요, 이제 아이디어 #2를 사용해서 2008년 GPI 점수의 전 세계 지도를 만들어 주세요.

GPT-4의 응답:

![GPI scores for 2008](/TIL/assets/img/2024-07-13-PragmaticGPT-4PromptingNiftyNo-CodeMapsandReportsforNoobs_5.png)

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

와우, 그거 정말 쉬웠죠? 코드를 한 줄도 쓰지 않으셨나요? 전혀 안 썼네요.

전문가 팁: 다른 색상 구성표를 사용하고 싶다면 프롬프트에 이 내용을 추가할 수 있어요. 예를 들어 "RdOrYl 색상 구성표 사용하기"

이제 2022년을 분석해보기 위해 숫자들을 살펴볼까요?

GPT-4에게 프롬프트: 멋져요, 이제 같은 지도를 2022년용으로 만들어주세요.

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

GPT-4의 답변:

<img src="/TIL/assets/img/2024-07-13-PragmaticGPT-4PromptingNiftyNo-CodeMapsandReportsforNoobs_6.png" />

좋아요! 이제 14년 차이가 나는 2개의 지도가 있어요. 빠른 비교 분석을 하면, 어떤 나라들이 시간이 지남에 따라 변화했는지(긍정적으로든 부정적으로든) 확인할 수 있어요.

14년 동안 특정 결과를 얻기 위해, 어떤 나라가 평화로움이 점점 높아지거나 낮아지는지를 보여주기 위해 해당 변화를 명확히 보여주는 지도를 표시하는 것도 가능해요.

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

그래요.

GPT-4에게 알려주세요: 이제 각 국가별로 2008년부터 2022년까지의 평화 지수 차이를 보여주는 지도를 만들어주세요.

GPT-4의 응답:

![map](/TIL/assets/img/2024-07-13-PragmaticGPT-4PromptingNiftyNo-CodeMapsandReportsforNoobs_7.png)

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

쉽죠! 이제 2008년부터 2022년까지 각 나라의 변화에 대한 비교 분석이 있어요.

하지만 대부분의 나라가 파란색으로 표시된다는 것을 보셨을 겁니다 — 조금 오해의 소지가 있어요. 몇 가지 특이치가 있어서 데이터가 한쪽으로 치우쳐져 보일 수 있으니, 이 시각화를 조금 더 "현실적"으로 보이도록 GPT-4에게 수정해 달라고 요청해 볼게요.

GPT-4에게 제시할 내용:
몇 가지 특이치가 있으므로 색상 체계의 중간값을 0으로 설정하고, 전체 색상 범위를 더 생생하고 대조적으로 만드세요.

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

![해당 이미지는 훨씬 좋네요. 지난 14년 동안 불안정한 상황에서 있는 국가들을 명확히 식별할 수 있습니다. 멋진 작업이네요! 그리고 마지막으로, GPT-4의 새로운 내장 기능 중 하나는 방금 생성된 데이터 시각화와 제공된 분석을 포함한 원격 PDF 파일을 실시간으로 생성할 수 있는 기능입니다.](/TIL/assets/img/2024-07-13-PragmaticGPT-4PromptingNiftyNo-CodeMapsandReportsforNoobs_8.png)



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

# PDF 보고서 실시간 생성

GPT-4에게 방금 생성한 지도 시각화물을 모두 포함한 PDF 보고서를 생성하도록 요청할 수 있습니다.

GPT-4에게 요청: 좋아요, 이제 2008년의 첫 번째 지도, 2022년의 두 번째 지도, 그리고 방금 생성한 지수 변화(2008-2022) 지도를 생성한 후, 각 지도에 대한 분석을 포함하는 PDF 보고서(소개, 분석, 결론 포함)를 만들어 주세요.

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

![이미지](/TIL/assets/img/2024-07-13-PragmaticGPT-4PromptingNiftyNo-CodeMapsandReportsforNoobs_9.png)

**전문가 팁:** GPT-4에게 먼저 지도를 재생성하도록 유도해야 합니다. 그렇지 않으면 이미지에 액세스할 수 없다고 불평하고 실패할 수 있습니다.

GPT-4에 의해 동적으로 생성된 PDF 보고서의 스크린샷:

![이미지](/TIL/assets/img/2024-07-13-PragmaticGPT-4PromptingNiftyNo-CodeMapsandReportsforNoobs_10.png)

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

와우, 정말 인상적이에요. 데이터셋에서 데이터 시각화와 분석이 포함된 PDF 보고서까지!

소소한 팁: 포맷팅이 마음에 들지 않는다면 GPT-4를 다시 실행하여 굵은 큰 제목, 헤더, 푸터 등을 추가할 수 있어요.

그리고 이 모든 작업을 하기 위해 얼마나 많은 코딩이 필요했나요?

음 — 전혀요.

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

얼마나 좋은가요?

# 개요…

복잡한 시각화 자동화 및 실시간 PDF 보고서 생성을 통해 GPT-4는 초보 데이터 분석가를 위한 데이터 시각화 및 보고 프로세스를 크게 간소화합니다.

아직 완벽한 상황은 아닙니다. GPT-4에서 구현해야 할 업데이트와 개선 사항이 있습니다. 예를 들어 데이터셋에 대한 분석은 더 심층적이지 않을 수 있으며 PDF 서식 조정이 필요합니다.

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

테이블 태그를 마크다운 형식으로 변경해보세요.

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

만약 이 유형의 이야기가 당신에게 딱 맞고, 저를 작가로서 지원하고 싶다면, 제 Substack에 구독해주세요.

Substack에서는 다른 플랫폼에서는 찾을 수 없는 뉴스레터와 기사를 게시합니다.

당신의 의견/댓글을 듣고 싶어요!