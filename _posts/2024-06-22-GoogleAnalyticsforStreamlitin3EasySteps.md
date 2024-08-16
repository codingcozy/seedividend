---
title: "구글 애널리틱스를 Streamlit에 적용하는 3단계 쉬운 방법"
description: ""
coverImage: "/assets/img/2024-06-22-GoogleAnalyticsforStreamlitin3EasySteps_0.png"
date: 2024-06-22 03:50
ogImage: 
  url: /assets/img/2024-06-22-GoogleAnalyticsforStreamlitin3EasySteps_0.png
tag: Tech
originalTitle: "Google Analytics for Streamlit in 3 Easy Steps"
link: "https://medium.com/@calebdame/google-analytics-for-streamlit-in-3-easy-steps-06e4cd2fd02e"
isUpdated: true
---




Streamlit에는 Google Analytics를 공식적으로 지원하는 것이 없습니다. 그것은 좀 아쉽지만, Google Analytics는 사용자들이 애플리케이션에서 어떻게 행동하는지 이해하는 데 매우 중요합니다. 클릭 추적, 페이지 이동 및 기타 중요 이벤트를 추적하는 것이죠.

Streamlit 생태계를 통해 몇 가지 추적 리소스가 있습니다. 특히 streamlit-analytics 확장 프로그램이 있습니다. 그러나 Google Analytics는 모든 산업에서의 업계 표준입니다.

<div class="content-ad"></div>

만약 Heroku.com이나 Railway.app과 같은 플랫폼에 Streamlit 웹 앱을 배포했다면, 사이트에서의 마이크로 레벨 이벤트와 매크로 레벨 행동 경향에 대한 액세스가 필요할 것입니다.

Streamlit의 경우, 복잡한 작업을 수행하는 데 여러 가지 방법이 있습니다.

# 직접 넘어오는 것 — 작동하지 않는 것:

Streamlit에서 다음과 같이 HTML+Javascript를 페이지에 주입할 수 있습니다:

<div class="content-ad"></div>

```python
import streamlit as st

st.markdown(body, unsafe_allow_html=True)
```

body가 적절한 HTML이고 이 스니펫 외부의 코드에 의존하지 않는다면, 보통 잘 작동할 것입니다. 그러나 이 방법을 사용하여 Google Analytics를 주입하지 마십시오.

Streamlit의 작동 방식으로 인해 페이지의 본문이 변경될 때마다...

- 데이터가 필드에 입력되는 경우,
- 버튼이 눌리는 경우,
- 슬라이더가 드래그되는 경우,
- 등...

<div class="content-ad"></div>

… 이벤트 처리 루프는 처음부터 모든 Python 코드를 다시 트리거하고 Google Analytics HTML을 새로 고쳐 이를 다시 실행시킵니다. 결국, 이로 인해 사이트에서 발생하는 이벤트의 수와 트래픽이 급격하게 증가합니다. Streamlit에서는 주 코드 바깥에 코드, 형식 또는 스크립트를 넣어 다시 실행이 트리거되지 않는 곳에 배치하는 기본 방법이 없습니다. 그러나 더 나은 방법이 있습니다! 이겁니다:

# 단계 1: Google Analytics 측정 ID

- analytics.google.com에 가서 로그인/가입하세요
- 분석 계정(분석 그룹) 및 분석 속성(추적하려는 웹사이트에 관한 것)을 만드세요

<img src="/assets/img/2024-06-22-GoogleAnalyticsforStreamlitin3EasySteps_1.png" />

<div class="content-ad"></div>

- 작업을 완료한 후, 그림 위에 표시된 속성/스트림을 클릭하면 쪽면에서 팝업이 나타납니다. 그런 다음에는 팝업의 하단 부근에 있는 "태그 지침 보기"를 찾아 클릭하세요.

![태그 지침 보기](/assets/img/2024-06-22-GoogleAnalyticsforStreamlitin3EasySteps_2.png)

- 다음 페이지에서 "수동으로 설치"를 클릭하세요.

![수동으로 설치](/assets/img/2024-06-22-GoogleAnalyticsforStreamlitin3EasySteps_3.png)

<div class="content-ad"></div>

얼른 도달했어요. 두 개의 `script` 태그를 포함한 HTML 코드 스니펫을 볼 수 있어야 합니다. 각 스크립트에는 G-XXXXXXXXXX와 같은 코드가 들어 있습니다. 아래는 전체 코드 스크립트입니다 (정확한 측정 ID를 제거한 버전):

```js
<!-- Google 태그 (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XXXXXXXXXX');
</script>
```

다만 X가 다른 영숫자 값으로 대체될 것입니다. 이 코드 스니펫의 한 버전을 Streamlit에 삽입할 것입니다.

# 단계 2: Streamlit 패키지 소스 수정

<div class="content-ad"></div>

Streamlit은 사이트의 헤더 데이터를 직접 편집할 수 없지만, 우리는 그것을 바꿀 것입니다. 헤더는 Streamlit 로직에 의해 작성된 HTML 본문 외부에 있기 때문에 페이지가 변경될 때마다 헤더 데이터가 새로 고쳐지지 않습니다. 이로써 구글 애널리틱스 코드 조각이 편안히 백그라운드에 살 수 있게 됩니다.

우리가 작성할 스크립트의 목적은 다음과 같습니다:

- Streamlit 패키지 내에서 헤더 데이터를 포함한 소스 파일을 찾기
- 헤더에 GA 스크립트를 포함하도록 편집하기
- 이제 이 Streamlit 설치를 나중에 가져올 때 항상 헤더에 GA 스크립트가 포함되도록 할 것입니다.

새로운 기기에 앱을 배포할 때마다 자동으로 실행되어야 하므로 이 작업을 자동화할 스크립트가 필요합니다. 만약 컴퓨터에서 로컬로 호스팅하는 경우에는 Streamlit 소스 코드로 가서 복사하여 붙여넣기를 하면 쉽게 할 수 있습니다.

<div class="content-ad"></div>

위에 언급한 단계를 수행하는 Python 스크립트를 보여드릴게요. Renata님의 포럼 글에서 영감을 받은 내용이 많습니다:

```python
from bs4 import BeautifulSoup
import pathlib
import shutil
import streamlit as st

GA_ID = "google_analytics"
GA_SCRIPT = """
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script id='google_analytics'>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
"""

def inject_ga():
    
    index_path = pathlib.Path(st.__file__).parent / "static" / "index.html"
    soup = BeautifulSoup(index_path.read_text(), features="html.parser")
    if not soup.find(id=GA_ID): 
        bck_index = index_path.with_suffix('.bck')
        if bck_index.exists():
            shutil.copy(bck_index, index_path)  
        else:
            shutil.copy(index_path, bck_index)  
        html = str(soup)
        new_html = html.replace('<head>', '<head>\n' + GA_SCRIPT)
        index_path.write_text(new_html)

inject_ga()
```

두 번째 스크립트에 id를 할당하여 GA 스크립트를 약간 수정했는데, 이렇게 함으로써 두 번째 실행될 경우에도 분석 스니펫을 확인할 수 있고 변경되지 않도록 했어요.

# 단계 3: 시작 스크립트 편집 및 추적 가져오기

<div class="content-ad"></div>

배포 시 설치를 변경하는 방법은 어떻게 할까요? Streamlit 앱의 본문이 새로 고침될 때마다 변경되지 않도록 합니다.

일반적으로 제가 사용하는 해결책은 편리함과 코드 분리를 위해 배포 시 순차적으로 실행되는 두 개의 파이썬 스크립트를 준비하는 것입니다.

Step 2에서 주어진 스크립트는 add_ga.py로 호출할 수 있으며, Streamlit 앱을 실행하는 파이썬 파일은 main.py입니다. 이러한 파일들을 사용하여 다음과 같이 순차적으로 실행되는 간단한 시작 스크립트를 만들 수 있습니다:

```python
python add_ga.py && streamlit run app.py
```

<div class="content-ad"></div>

Bash에서 이중 앰퍼샌드 &&는 첫 번째 명령이 성공적으로 종료된 경우에만 두 번째 명령을 실행하도록 합니다. 따라서 웹 사이트가 온라인으로 전환되었을 때 add_ga.py 스크립트에 오류가 없는지 확인할 수 있습니다. 또한 `head` 태그 상단의 HTML을 확인하여 GA 스크립트가 제대로 포함되어 있는지도 확인할 수 있습니다.

# 즐거운 호스팅!

Google Analytics가 실시간 Streamlit 웹 페이지의 태그를 신속하게 식별할 수 있습니다. 일반적으로 몇 분 이내에 대시보드에서 웹 사이트의 트래픽 및 다른 통계를 확인할 수 있습니다.

사용자들이 지금까지 사이트에 누가 있는지, 사용자들이 어디에서 오는지, 콘텐츠와 상호 작용하는 방법, 웹 사이트에서 수익을 창출하는지, 사람들이 얼마나 자주 방문하는지, 대상 그룹은 누구인지 등 유용한 정보를 지속적으로 모니터링할 수 있습니다.

<div class="content-ad"></div>

Streamlit이 할 수 있는 놀라운 기능이 더 많이 있어요. 앞으로는 클라이언트로부터 HTTPS 헤더 데이터를 스크랩하여 UserAgent 데이터뿐만 아니라 IP 주소와 화면 크기까지 기록하는 방법에 대해 설명할 예정이에요.

읽어 주셔서 감사합니다! 더 많은 정보를 얻고 싶으시면 여기 공식 포럼을 통해 Streamlit 커뮤니티에 문의해 보세요. 이 가이드에 추가할 내용이나 해결해야 할 문제가 있으면 언제든 알려주세요.