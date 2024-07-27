---
title: "몰랐던 Jupyter의 숨겨진 해킹 5가지"
description: ""
coverImage: "/TIL/assets/img/2024-07-13-5JupyterHacksThatYouNeverKnewEvenExisted_0.png"
date: 2024-07-13 19:49
ogImage: 
  url: /TIL/assets/img/2024-07-13-5JupyterHacksThatYouNeverKnewEvenExisted_0.png
tag: Tech
originalTitle: "5 Jupyter Hacks That You Never Knew Even Existed"
link: "https://medium.com/datadriveninvestor/5-jupyter-hacks-that-you-never-knew-even-existed-b2316bcc4c0f"
---


아래는 이 기사의 코드입니다.

Jupyter Notebook은 데이터 과학, 머신 러닝, 과학 계산 및 기타 Python 중심 프로그래밍 작업에 가장 인기 있는 IDE 중 하나입니다.

대화식 코딩 기능으로 초심자뿐만 아니라 전문가들에게도 가장 많이 사용되는 도구로 자리 잡고 있습니다.

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

하지만 널리 사용되고 있지만, 많은 사용자들이 그 가능성을 충분히 활용하지 못하고 있습니다.

결과적으로, 그들은 주피터를 기본 인터페이스/기능을 이용하여 사용하는데, 내 의견으로는 이를 향상시켜 더욱 풍부한 경험을 제공할 수 있습니다.

그래서 이 글에서는 아마 당신이 전혀 몰랐을 것으로 생각되는 5가지 멋진 주피터 해킹을 소개하겠습니다.

이를 통해 당신은 이 강력한 도구로 새로운 생산성과 창의력을 발휘할 수 있을 것입니다.

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

시작해봅시다 🚀!

## 1. 데이터프레임의 원시 데이터 미리보기 중지

Jupyter에서 데이터프레임을 로드할 때 종종 출력을 통해 미리보기합니다. 아래의 내용을 확인할 수 있습니다: 

![데이터프레임 미리보기](/TIL/assets/img/2024-07-13-5JupyterHacksThatYouNeverKnewEvenExisted_1.png)

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

그러나 이것은 이 데이터에 내장된 내용에 대해 거의 어떤 정보도 전달하지 않습니다.

결과적으로 분석을 통해 더 깊이 파고들어야 할 필요가 있습니다. 그리고 이는 간단하면서 반복적인 코드를 포함합니다.

대신 Jupyter-DataTables을 사용하세요. 다음과 같이 설치할 수 있습니다:

사용하려면 Jupyter에서 다음 코드를 실행하세요:

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

DataFrame의 기본 미리보기를 많은 유용한 기능으로 확장합니다.

결과적으로 DataFrame을 출력할 때 아래와 같이 훨씬 더 우아하게 나타납니다.

![image](https://miro.medium.com/v2/resize:fit:1400/1*vtDNomuoHOnqE46HGF61rA.gif)

이 풍부한 미리보기는 정렬, 필터링, 내보내기 및 페이지네이션 작업을 제공하며 열 분포 및 데이터 유형도 제공합니다.

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

# 데이터에 레이블을 붙이는 클릭 한 번으로!

모든 데이터가 미리 레이블이 달려 온 것은 아닙니다.

따라서 레이블이 없는 데이터의 경우, 주로 약간의 시간을 들여 주석을 다는 작업을 해야 할 수도 있습니다.

파일을 외부에서 미리보고 레이블을 붙이거나 복잡한 주석 생성 파이프라인을 만드는 대신, **ipynnotate**를 사용하여 몇 줄의 코드로 주석을 달 수 있습니다.

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

위의 문구를 번역하면 다음과 같습니다:

데이터 주석을 위한 특별한 Jupyter 위젯을 제공합니다.

다음 명령을 실행하여 설치합니다:

버튼을 클릭하여 데이터 주석을 쉽게 할 수 있습니다. 따라서 ipyannotate를 사용하면 버튼에 데이터 레이블을 부착할 수 있습니다.

고양이와 개의 이미지가 있는 경우(라벨이 없음) 주석 처리 파이프라인을 다음과 같이 생성할 수 있습니다:

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

<img src="https://miro.medium.com/v2/resize:fit:1400/1*HyBsbKP8jtnB-srveBSDwA.gif" />

위에 표시된 것처럼 해당 버튼을 클릭하기만 하면 데이터를 주석으로 달 수 있습니다.

더불어, 레이블을 검색하고 필요에 따라 데이터 파이프라인에 사용할 수도 있습니다.

# #3 주피터에서 문서 보기

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

Jupyter에서 작업할 때 함수의 매개변수를 잊기 쉽고 공식 문서(또는 StackOverflow)를 방문하는 것이 일반적입니다.

그러나 노트북 자체에서 문서를 볼 수 있습니다.

Shift-Tab 키를 누르면 문서 패널이 열립니다. 이 기능은 매우 유용하며 공식 문서를 매번 열 필요가 없어 시간을 절약할 수 있습니다.

아래에서 데모를 보여드립니다:

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


![image](https://miro.medium.com/v2/resize:fit:1400/1*BoRuu6MfmFfjACuXrPpjrg.gif)

This feature also works for your custom functions.

## 4. Get Notified When Jupyter Cell Has Executed

After running some code in a Jupyter cell, we often navigate away to do some other work in the meantime.


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

여기에서는 셀이 실행되었는지 여부를 확인하기 위해 반복적으로 주피터 탭으로 돌아가야 합니다.

이를 피하기 위해, 주피터 노트북 확장 기능인 %%notify 매직 명령어를 사용할 수 있습니다.

이름에서 알 수 있듯이, 이 매직 명령은 Jupyter 셀의 완료(성공 또는 실패) 시에 브라우저 알림을 통해 사용자에게 알려줍니다.

설치하려면 다음 명령을 실행하세요:

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

다음으로, 확장 기능을 로드하세요:

그리고 끝났어요!

이제 원하는 경우 알림을 받으려면 셀 맨 위에 다음의 매직 명령어를 입력하십시오:

해당 셀이 실행을 완료하면 다음과 같은 알림을 받게 됩니다:

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

아래는 마크다운 형식으로 된 테이블입니다.

클릭하면 알림이 발생하여 Jupyter 탭으로 돌아갑니다.

# #5 Jupyter Notebook에서 런타임 중 셀 출력 지우기

Jupyter를 사용하면 코드 진행 상황을 추적하기 위해 일반적으로 많은 세부 정보를 출력합니다.

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

그러나 출력 패널에 많은 세부 정보가 누적된 경우, 가장 최근의 출력만 관심이 있는 경우가 있기 때문에 짜증이 날 수 있습니다.

게다가 매번 출력 맨 아래로 스크롤하는 것도 짜증스러울 수 있어요.

셀의 출력을 지우려면 IPython 패키지에서 clear_output 메서드를 사용할 수 있어요.

Python에 IPython이 미리 설치되어 있기 때문에 설치가 필요하지 않아요.

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

아래와 같이 해당 메서드를 가져올 수 있습니다:

호출하면 셀의 현재 출력이 제거되며, 그 후에 최신 세부 정보를 출력할 수 있습니다.

다음은 데모가 표시됩니다:

![데모](https://miro.medium.com/v2/resize:fit:1400/1*HLiihJXmkIXB0vZg2DbTtA.gif)

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

위에서 보여드린 대로, 우리는 셀에서 가장 최근 출력만 볼 수 있습니다. 이전 출력물들은 지워집니다.

# 보너스 팁

위에서 언급한 팁들은 주피터를 더욱 풍요롭게 만들어줄 것이지만, 주피터에서 아직까지 해결하기 어려운 부분들이 많습니다.

예를 들어, 주피터는 협업에 적합하지 않습니다. 로컬에서 실행되기 때문에, 실시간 협업 기능을 주피터에 내장하는 것이 불가능하며, 팀원들이 함께 작업하고, 댓글을 추가하고, 진행 상황을 추적하는 등의 작업을 할 수 없습니다.

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

게다가, 공유하기도 똑같이 까다로워요. 노트북을 누군가와 공유해야 한다면, 그럴 수 있는 방법은 그들에게 이메일을 보내거나 GitHub와 같은 온라인 서비스에 호스팅하여 링크를 공유하는 것뿐입니다.

마지막으로, 많은 데이터 과학 작업은 파이썬으로만 제한되지 않아요. 그 작업에는 SQL도 불가피하게 관련되어 있는데, 이는 주로 조직의 데이터베이스와 상호작용하는 데 사용돼요.

하지만, Jupyter에 SQL을 통합하는 것은 가능하지만 번거로운 과정이에요.

## 해결책

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

이 한계에 좌절하며 대안을 찾기 시작했는데, Deepnote를 발견해서 정말 다행이었습니다.

Deepnote는 제이퍼의 모든 한계를 쉽게 해결해 주었고, 기존의 제이퍼와 유사한 풍부한 경험을 제공해 주었습니다. 새로운 것을 배우지 않아도 되는 Deepnote를 사용하면, SQL 사용, 코드 없이 차트 생성, 데이터베이스 연결 등 모든 것이 원활하게 통합되어 있습니다.

제이퍼가 모든 파이썬 사용자에게 일반화된 경험을 제공하려고 하는 것을 이해하지만, 데이터 과학자들의 고통 포인트를 전혀 해결하지 못한다는 사실을 이해합니다. 특히 팀으로 작업하는 데이터 과학자들에게는 더 그렇습니다.

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

Deepnote은 내 의견으로는 모든 데이터 주도 프로젝트에 대한 Jupyter의 초고속 버전입니다. 꼭 확인해보세요.

# 결론

이로써, 이 블로그의 끝에 도달했습니다.

Jupyter 노트북을 위한 멋진 팁 몇 가지를 배워 축하드립니다. 이 정보들이 여러분의 Python 프로그래밍 생산성을 높여줄 것이라고 확신합니다.

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

저도 여러분이 주피터 노트북을 사용할 때 어떤 좋은 팁이 있나요? 

언제나 읽어 주셔서 감사합니다!

🚀 오늘 구독하시면 320개 이상의 게시물과 550페이지 이상의 무료 데이터 과학 PDF를 받을 수 있습니다:

![image](https://miro.medium.com/v2/resize:fit:1400/0*oW2adl2lbMY8ZplS.gif)

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

DataDrivenInvestor.com에서 저희를 방문해 주세요.

DDIntel을 여기에서 구독하실 수 있습니다.

공유하고 싶은 독특한 이야기가 있나요? DDIntel로 제출해 주세요.

저희 창조자 생태계에 여기서 참여해 보세요.

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

DDIntel은 우리의 주요 사이트와 인기 있는 DDI Medium 출판물에서 주목할 만한 기사를 소개합니다. 우리 커뮤니티로부터 더 많은 통찰력 있는 작품을 확인해보세요.

DDI 공식 텔레그램 채널: [링크](https://t.me/+tafUp6ecEys4YjQ1)

LinkedIn, Twitter, YouTube, 그리고 Facebook에서 팔로우해주세요.