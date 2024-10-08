---
title: "아름다운 데이터 시각화를 디자인하는 방법 Shirley Wu와의 인터뷰"
description: ""
coverImage: "/assets/img/2024-06-27-DesigningBeautifulDataVisualisationsAnInterviewwithShirleyWu_0.png"
date: 2024-06-27 18:14
ogImage:
  url: /assets/img/2024-06-27-DesigningBeautifulDataVisualisationsAnInterviewwithShirleyWu_0.png
tag: Tech
originalTitle: "Designing Beautiful Data Visualisations: An Interview with Shirley Wu"
link: "https://medium.com/ux-and-front-end-interviews/designing-beautiful-data-visualisations-an-interview-with-shirley-wu-4c2f6d01c0d1"
isUpdated: true
---

## 셜리 우는 인기 있는 Data Sketches 프로젝트의 절반으로, 매우 상호 작용적인 데이터 시각화와 데이터 주도적 예술을 만들어냅니다. 여기서 그녀는 뒷면을 엿보게 해주며 배운 교훈을 공유합니다

![이미지](/assets/img/2024-06-27-DesigningBeautifulDataVisualisationsAnInterviewwithShirleyWu_0.png)

셜리 우는 샌프란시스코의 대형 데이터 회사에서 프런트엔드 소프트웨어 엔지니어로 일했을 때 데이터 시각화 JavaScript 라이브러리인 D3.js를 알게 되었습니다. 그 도구를 사랑하게 된 이유는 그것이 그녀의 두 가지 주요 관심사인 미술 - 셜리는 네 살 때 그림과 그림을 시작했습니다 - 그리고 수학을 결합했기 때문입니다. 그녀가 트위터에서 자신을 코드 ¾ 및 예술 ¼로 설명하는 것도 놀랍지 않습니다.

대학을 졸업한 지 4년만에 셜리는 독립을 택하고 데이터 시각화를 전문으로 하는 프리랜서가 되었습니다. 그녀는 문화, 정치, 예술 등 다양한 주제를 다루는 다양한 주제를 시각화합니다. 셜리는 자신의 경력에 큰 영향을 미친 세 가지 프로젝트를 2017년에 발표했습니다. 첫 번째는 Daata Sketches [최근 책으로 출간됨]로, 암스테르담의 데이터 시각화 디자이너 나디에 브레먀와의 협업으로, 이는 두 사람을 데이터 시각화 커뮤니티에 소개했습니다. 매월 주제를 선택하여 시각화를 만들고, 전체 프로세스 - 데이터 준비, 아이디어 스케치 및 실행까지 - 을 문서화하는 것이 아이디어였습니다.

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

"라이트업들은 그냥 생각의 흔적이었어요," Shirley는 기억합니다. "하지만 그것이 사람들이 가장 좋아하는 것이 되었어요. 사람들이 와서 우리에게 말해주면서 '뒷이야기를 들여다보고 연출된 최종 결과물 이상의 변화를 볼 수 있어 얼마나 멋진지'라고 말해줍니다. 아주 빠르게 떠올린 아이디어였지만 프로젝트의 이름을 지정하는 데 오랜 시간이 걸렸어요. 우리는 수많은 이름으로 가득 찬 문서를 가지고 있어요. 그 중 하나인 '셜리와 나디의 시각화 마라톤 대모험'이 제일 좋아하는 이름 중 하나에요. 당연히, 그 이름은 선택하지 않았죠!"

셜리가 유명해지게 한 두 번째 프로젝트는 뮤지컬 '햄릴턴'의 모든 라인을 인터랙티브 시각화한 것이었어요. 이 프로젝트는 The Pudding을 위해 만들어진 것으로, 이는 문화에서 논의되는 아이디어들을 시각 산문으로 설명하는 온라인 출판물이고, 시갛 산문 스튜디오 Polygraph가 제작했어요. 이 프로젝트는 21,000단어를 관련성과 주제적 통찰을 분석하고 D3, React, HTML5 Canvas를 사용했는데, 이를 통해 셜리는 데이터 수집에 대해 호기심을 갖게 되고 창의적으로 활용하는 법을 배웠어요. 이 프로젝트는 2017년 '정보는 아름답다 어워드'의 예술, 엔터테인먼트 및 대중 문화 부문에서 동상을 수상했으며, Data Sketches는 '기이한 부문'에서 금상을 수상했어요.

<img src="/assets/img/2024-06-27-DesigningBeautifulDataVisualisationsAnInterviewwithShirleyWu_1.png" />

# 효과적인 데이터 시각화 작성 과정"

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

그때 구글이 찾아왔어요. 데이터 저널리스트 알베르토 카이로의 예술적인 지도 아래, 구글 뉴스 랩은 전 세계 최고의 데이터 시각화 디자이너들과 협력했어요. 카이로는 데이터 스케치를 발견하고 셜리를 초대하여 거의 40개국의 10년 간의 여행 검색을 조사하고 상위 검색 문화 장소를 탐험하도록 했어요( explore-adventure.com). 한편 브레머는 구글 번역을 통해 영어로 가장 많이 번역된 단어를 분석했죠(www.beautifulinenglish.com).

이 프로젝트는 셜리가 포트폴리오를 굳혀 기회를 얻도록 도왔고, 그녀의 경력은 정말로 발전하기 시작했어요. 셜리는 더 많은 클라이언트를 유치했을 뿐만 아니라 데이터 시각화에 대해 이야기하기 시작했고, 일본, 네덜란드, 독일, 스페인 등 전 세계의 행사에서 워크샵도 진행하게 되었어요. 이야기하는 동안 실시간 코딩을 보여주며, D3가 보다 친근하다는 것을 보여주는 한편 데이터 시각화를 만드는 데는 많은 연습, 인내력, 그리고 인내심이 필요하다는 것도 보여주었죠. 또한 샌프란시스코 베이지역 D3.js 사용자 그룹을 공동 조직하고, Frontend Master를 위해 온라인 강좌를 제작하여 프론트엔드 개발자들에게 D3의 기초부터 분석 및 자체 맞춤 데이터 시각화 설계까지 알려주었어요.

“클라이언트는 항상 데이터 세트를 가져옵니다.” 셜리는 그녀의 과정을 설명합니다. “그것으로 이야기를 전하거나, 탐험적인 것을 만들고 싶어해요. 대부분은 내부 비즈니스 분석이며, 그들은 고객이 왜 그러는지 알려고 노력하고 있어요. 제가 하는 첫 번째 일은 그들의 목표와 전달하려는 내용 또는 학습 목표를 분석하는 것입니다. 둘째, 그들의 대상 청중과 그 청중의 데이터 지식에 관해 물어봐요.”

그 다음 셜리는 데이터, 디자인 및 코드 세 단계를 거칩니다. 먼저 데이터를 탐색하는 것이 중요하죠. 데이터 수집, 정리, 준비 및 분석에는 Node.js 패키지를 많이 사용합니다. 또한 더 복잡한 프로젝트를 위해 데이터 과학 배경을 가진 내이와 자주 협업합니다. 예를 들어, 수상 경력이 있는 '버스트 아웃(Bussed Out)'이란 미국의 무주택자에 대한 강력한 조사 기사로, 위 대가디언(The Guardian)의 조사론시한 작품에는 약 34,000명의 무주택자의 여정을 조사했죠. 시각화의 많은 부분은 '스크롤 스토리 telling 스타일'로 제작되어 있으며 페이지를 스크롤하면 애니메이션이 트리거됩니다.

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

# 펜과 종이에서 JavaScript로

셜리가 데이터와 클라이언트의 목표를 이해하면 펜과 종이, 아이패드를 사용하여 아이디어를 디자인하고 스케치하며 종종 시각적 은유를 활용합니다. 최근에는 Mike Bostock과 함께 만든 대화형 JavaScript 노트북 플랫폼 인 Observable을 사용하기 시작했습니다. 이 플랫폼은 데이터 분석, 시각화 및 탐색에 사용되며 시각화 생성 및 데이터에 대한 가설을 확인 또는 반박하기 위해 시각적 결과를 빠르게 생성하는 Vega-Lite 차트 라이브러리와 함께 사용합니다. 클라이언트와의 상의를 통해 원하는 결과물을 도출할 때까지 이러한 도구를 반복적으로 활용하며, 코드 작성 시에는 D3, Vue 및 GreenSock Animation Platform (GSAP)를 주로 사용하고 있습니다. 또한 이야기를 할 수 있는 JavaScript 라이브러리 Scrollama를 활용하여 스크롤 기반 시각화에 대해 탐구하고 있습니다. 또한 SVG에 큰 관심을 가지고 있습니다.

Vue로 이동하기 전에는 React를 사용했던 셜리씨입니다. 그는 매우 늦게 채용된 사람이라고 말합니다. "저는 관심 있는 몇 가지 도구에 집중합니다," 라고 설명합니다. "이 모든 라이브러리는 그냥 도구상자 안의 도구일 뿐이라고 확신합니다. 작업을 완료하기 위해 필요한 최소한의 도구 집합을 이해하려고 합니다. 많은 사람들이 사용해야 한다고 말하기 전까지는 라이브러리를 사용하지 않습니다. 예를 들어, Sarah Drasner은 GreenSock을 소개해 주었고 그녀의 Intro to Vue.js 워크샵도 참여했습니다. 그리고 약 1년 반 동안 그녀와 몇몇 다른 분들이 Vue를 확인해보라고 권유했을 때, 마침내 확인했습니다! 이후로 모든 프로젝트에 Vue를 사용하고 있습니다. 상호작용하는 시각화 작업을 위해서 정말 많은 의미를 가지고 있습니다."

프리랜서가 된 이후, 셜리는 기술 측면 뿐만 아니라 디자인도 발전시켰습니다. 이제는 최종 사용자를 더 많이 고려하며 데이터 시각화를 UI의 최고의 실천법과 결합시켜 작은 세부사항과 개인적인 요소를 첨가합니다.

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

“좋은 시각화를 만드는 요소, 사람들이 쉽게 읽을 수 있는 요소, 그리고 우리가 패턴을 인식하는 심리를 활용하는 방법을 배우고 싶었어요. 그래서 데이터 시각화 디자인에 관한 워크숍을 가르치기로 결정했죠. 그러다 몇 권의 책을 읽게 되었어요. 제가 가장 좋아하는 책 중 하나는 Alberto Cairo의 'The Functional Art'입니다. 매우 실용적이고 제 작업 방식을 많이 변화시켰어요.”

# 3차원 데이터 시각화

샤리는 처음으로 물리적 데이터 설치물에 도전했어요. 개념 예술가 Ekene Ijeoma의 2015년 작품인 'Wage Islands'를 보고 나서부터 언젠가 물리적인 작업을 하고 싶어했었어요. 이 작품은 뉴욕시의 지형지도를 검은 잉크로 수중에 가라앉혀 저임금 노동자가 어디서 지불 가능한 임대료를 지출할 수 있는지를 시각화해주는 상호작용 설치물입니다. 이를 통해 저렴한 주택 공급 위기에 대한 주목을 불러일으킵니다.

“그것이 상호작용하는 3D 예술작품이었기 때문에 너무 놀랍더라고요,” 샤리가 말했습니다. “작은 휴대폰이나 데스크탑 화면을 넘어서는 무언가. 제가 물리적 데이터 시각화 아이디어에 진짜 열광하기 시작했어요.”

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

셜리는 모든 프로젝트가 2D로 구성되어 있음을 깨닫고, 물리적인 예술 작품을 만들고 싶다면 3차원으로 생각해야 한다는 것을 깨달았습니다. 그래서 Matt DesLauriers의 크리에이티브 코딩 워크샵을 수강하고 배운 기술을 활용하여 세 번째 프로젝트를 만들기 시작했어요. three.js와 WebGL로 구현된 "Legends"는 51명의 여성 노벨상 수상자와 그들의 업적을 3D 시각화한 작품입니다. 새로운 기술을 적용하면서 공간, 카메라 및 조명에 대해 많은 것을 배웠어요. 매 수상자는 그들의 위키피디아 페이지에서 추출된 데이터로 표현된 크리스탈로 나타납니다. 수상 카테고리로 색상이 지정되고, '영향'에 따라 크기가 조절되며, 상받은 연대에 따라 위치가 조정됩니다. 한편, 여러 별은 상을 수상한 853명의 남성을 나타냅니다.

![이미지](/assets/img/2024-06-27-DesigningBeautifulDataVisualisationsAnInterviewwithShirleyWu_2.png)

며칠 전에 셜리는 'Legends'를 수정하여 최근 30년 동안의 여성 노벨상 수상자를 나타내는 약간 축소된 물리적 버전을 제작했어요. 이는 창문 설치용으로 laser-cut 나무 꽃으로 표현된 29명의 여성 노벨상 수상자를 특징으로 합니다. 'Flower Power'는 셜리의 스튜디오 동료 앨리스 리와의 협업 작품이며, 독립 일러스트레이터, 예술가이자 2015년 넷 영 디자이너 오브 더 이어인 앨리스 리가 드롭박스, 에어비앤비, 애플 등과 함께 일해 온 경력을 바탕으로 만들어졌습니다. 이는 5x5라는 아트 쇼 및 팝업 샵의 일환으로, 샌프란시스코 미션 디스트릭트에 있는 1099 스튜디오의 다섯 거주자들이 다양한 매체로 구성된 다섯 개의 프로젝트를 선보이는 행사입니다.

![이미지](/assets/img/2024-06-27-DesigningBeautifulDataVisualisationsAnInterviewwithShirleyWu_3.png)

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

세번째 디지털 3D 프로젝트는 three.js와 WebGL을 사용해 진행 중입니다. 한 예술 박물관에서 의뢰받아 Legends와 유사한 컨셉으로 홍콩의 여성 작가들을 산으로 표현할 예정입니다(아직 많은 데이터가 부족하다는 점에 주목합니다). 또한 뉴욕 대학교 대화형 통신 프로그램에서의 레지던시도 임박해 있습니다. Shirley의 목표는 자신에게 중요한 주제(예: 성별 균형)를 다루는 의미 있는 시각화를 지속적으로 만드는 것이며, 데이터를 정확하게 표현할 뿐만 아니라 오해할 수 없는 방식으로 표현하는 것입니다.

"데이터 시각화는 통계와 매우 닮았습니다," Shirley는 경계합니다. "데이터가 올바르게 제시되지 않으면 누군가를 속이는 것이 매우 쉽습니다. 또한 데이터가 결정적이라고 생각하는 경향이 있습니다. 데이터가 말하는 대로라면, 반드시 맞는 것이지만, 대부분의 경우 데이터는 인간에 의해 수집되며 항상 인간적 편향이 있습니다. 아마 그것은 우리가 영원히 제거할 수 없는 것일 수도 있습니다. 그러한 편향을 어떻게 전달할 수 있는지는 정말 흥미로운 도전이 될 것입니다."

본 기사는 2019년 net 매거진 321호에 실렸으며, Shirley의 Data Sketches 파트너 Nadieh Bremer 인터뷰도 참조하시기 바랍니다.
