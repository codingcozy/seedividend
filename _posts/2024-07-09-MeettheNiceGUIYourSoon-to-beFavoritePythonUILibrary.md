---
title: "NiceGUI를 만나보세요 곧 여러분의 최애 파이썬 UI 라이브러리가 될 이유"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-MeettheNiceGUIYourSoon-to-beFavoritePythonUILibrary_0.png"
date: 2024-07-09 14:57
ogImage:
  url: /assets/img/2024-07-09-MeettheNiceGUIYourSoon-to-beFavoritePythonUILibrary_0.png
tag: Tech
originalTitle: "Meet the NiceGUI: Your Soon-to-be Favorite Python UI Library"
link: "https://medium.com/towards-data-science/meet-the-nicegui-your-soon-to-be-favorite-python-ui-library-fb69f14bb0ac"
---

## 사용자 정의 웹 앱을 쉽고 빠르게 만드세요

![이미지](/TIL/assets/img/2024-07-09-MeettheNiceGUIYourSoon-to-beFavoritePythonUILibrary_0.png)

만나보세요, NiceGUI! 이 간단한 Python 기반 UI 프레임워크는 웹 브라우저나 데스크톱 앱에서 원활하게 작동합니다. 작은 웹 앱, 대시보드, 또는 로봇 프로젝트를 만들고 있는 중이던 중이든, NiceGUI는 쉬운 인터페이스와 다양한 기능으로 여러분을 도와줄 거예요.

이 글의 목표는 이 라이브러리의 장단점을 나열하고 어떻게 NiceGUI 앱을 만들고 배포할 수 있는지 보여줌으로써 여러분이 한 번 시도해보길 설득하는 것입니다. (이 게시물은 후원받은 것이 아니에요, 그냥 이 라이브러리를 좋아해서 쓴거에요 🙃)

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

Streamlit 대 NiceGUI: 왜 바꾸어야 할까요?

Streamlit은 대화형 앱을 만드는 데 좋지만, 이벤트 및 상태 처리가 어려울 수 있습니다. 특히 큰 프로젝트의 경우 더 그렇습니다. NiceGUI는 다릅니다. NiceGUI를 사용하면 추가적인 단계나 고난한 해결책 없이 상태와 상호작용을 직접 제어할 수 있습니다.

간단한 상태 관리

NiceGUI는 상태를 쉽게 관리할 수 있습니다. Streamlit과 달리 예상치 못한 상태 재설정이 발생하지 않습니다. NiceGUI는 시작 상태든 사용자가 만든 변경 사항이든 모든 것을 안정적으로 유지합니다. 사용자 상호작용을 처리하기 위해 콜백을 사용할 수 있으며 전체 페이지 새로고침으로 인한 괴롭힘 없이 상태 데이터를 유지할 수 있습니다.

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

많은 기능들

NiceGUI에는 여러 가지 멋진 기능들이 많이 있어요:

- 상호 작용을 위한 버튼, 스위치, 슬라이더, 입력 등 다양한 요소들이 있어요.
- 화면에 요소들을 쉽게 배치할 수 있는 방법이 있어요.
- 차트, 테이블, 심지어 3D 씬까지 시각화에 사용할 수 있어요.
- Matplotlib 또는 Plotly와 같은 데이터 시각화 라이브러리와 통합이 되어 있어요.
- 색상과 스타일을 쉽게 사용자 정의할 수 있어요.
- 코딩과 테스트에 도움이 되는 도구들이 있어요.
- 주 개발자들은 항상 질문에 대답할 준비가 되어 있고, GitHub 공간에 피드백을 매우 긍정적으로 반영해요.
- 인기 있는 프레임워크 위에 구축되어 있어요: FastAPI, Vue3, Tailwind, Quasar.
- 전체 사이트가 NiceGUI 라이브러리로 제작되었어요: https://nicegui.io/documentation

제한사항

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

NiceGUI은 정말 멋지지만, 작은 커뮤니티 규모 때문에 다소 제약이 있을 수 있습니다. Streamlit과 같이 인기 있는 프레임워크보다 학습 곡선이 조금 더 길 수도 있습니다. 라이브러리의 기능을 최대한 활용하려면 CSS와 Tailwind CSS에 익숙해지는 것이 좋습니다. 또한, FastAPI, Vue, 그리고 Quasar에 대한 지식은 더 큰 유연성을 제공하고 구현할 수 있는 기능을 확장할 수 있습니다.

# 실습

이제 NiceGUI의 몇 가지 기능을 탐험하고 데모 앱을 만들고 배포해 봅시다.

## 기본 앱

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

먼저 NiceGUI를 설치해주세요:

```js
pip install nicegui[highcharts]
```

주요 문서의 예제에서 시작해보겠습니다:

```js
# https://nicegui.io/documentation/section_data_elements
from nicegui import ui
from random import random

chart = ui.highchart({
    'title': False,
    'chart': {'type': 'bar'},
    'xAxis': {'categories': ['A', 'B']},
    'series': [
        {'name': 'Alpha', 'data': [0.1, 0.2]},
        {'name': 'Beta', 'data': [0.3, 0.4]},
    ],
}).classes('w-full h-64')

def update():
    chart.options['series'][0]['data'][0] = random()
    chart.update()

ui.button('Update', on_click=update)

ui.run()
```

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

여기서 UI 모듈은 UI 요소를 만들 수 있도록합니다.
이 예시에서 먼저 Highchart 요소를 생성하는데, 이에 w-full과 h-64의 tailwind 클래스를 할당합니다. w-full은 반응형으로 화면 전체를 가로로 사용하고 h-64는 높이를 지정합니다.

![image](https://miro.medium.com/v2/resize:fit:1162/1*IbE0mHsejGUzviDgE2He3g.gif)

버튼을 클릭하면 콜백 함수가 트리거됩니다. 이 콜백은 차트에 사용되는 데이터를 업데이트하고 그것을 순조롭게 다시 렌더링합니다.

또한, 새로운 막대를 추가하기 위해 콜백을 변경할 수도 있습니다:

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

```js
def update():
    chart.options["xAxis"]["categories"].append(random.choice(string.ascii_uppercase))
    for series in chart.options['series']:
        series["data"].append(random.random())
    chart.update()
```

![image](https://miro.medium.com/v2/resize:fit:1400/1*P-IGyImlGMvNFut9LluamA.gif)

또한 페이지를 새로 고침해도 데이터가 손실되지 않는다는 것을 알아두세요! 이것은 다른 Python UI 라이브러리로는 할 수 없는 일입니다. 이렇게 작동하는 이유는 데이터가 모든 사용자 사이에서 공유되기 때문이지만, 앱 저장소의 사용자 객체나 앱 저장소 브라우저같은 방법으로 데이터를 사용자별로 유지하는 방법이 많이 있습니다. @ui.page 데코레이터로 감싸기 위해 app.storage.user 객체나 app.storage.browser를 사용할 수 있습니다.

하지만 주기적 타이머를 사용하여 UI를 업데이트하고 싶다면 어떻게 할까요? 쉽습니다! 버튼 요소를 ui.timer로 변경해주기만 하면 됩니다.

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

```js
ui.timer(5, callback=lambda: (update(), ui.notify("데이터가 업데이트되었습니다")))
```

![gif](https://miro.medium.com/v2/resize:fit:1400/1*wwSF1ib9720JW1FlKDOc0g.gif)

자, 이제 사용자가 범주를 선택한 다음 무작위로 Chuck Norris Fact를 생성할 수 있는 데모 앱을 만들어 봅시다.

먼저, 여기에 메인 코드가 있습니다:

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

```python
import requests  # HTTP 요청을 만들기 위해 requests 라이브러리를 가져옵니다
from nicegui import ui  # NiceGUI 라이브러리에서 UI 구성 요소를 가져옵니다
from nicegui_app.header import add_head_html  # HTML 헤드 내용을 추가하는 함수를 가져옵니다

# Chuck Norris 사실 카테고리 목록
CATEGORIES = [
    "동물",
    "직업",
    "연예인",
    "개발",
    "패션",
    "음식",
    "돈",
    "영화",
    "음악",
    "과학",
    "스포츠",
    "여행",
]

# Chuck Norris 사실을 처리하는 클래스
class Fact:
    def __init__(self):
        self.fact = None  # fact 속성을 None으로 초기화

    # 주어진 카테고리를 기반으로 사실을 업데이트하는 메서드
    def update_fact(self, category):
        url = f"https://api.chucknorris.io/jokes/random?category={category}"  # Chuck Norris API URL

        for i in range(10):  # 유효한 사실을 가져오려고 최대 10번 시도
            result = requests.get(url)  # Chuck Norris API로 GET 요청을 보냄

            if result.status_code == 200:  # 요청이 성공하면
                result_json = result.json()  # JSON 응답을 파싱
                if self.fact != result_json["value"]:  # 가져온 사실이 현재 사실과 다르면
                    self.fact = result_json["value"]  # 사실을 업데이트하고
                    break  # 루프를 종료

# Chuck Norris 사실 UI를 생성하는 함수
def chuck():
    add_head_html()  # NiceGUI 앱에 HTML 헤드 내용 추가

    default_value = CATEGORIES[0]  # Chuck Norris 사실의 기본 카테고리

    fact = Fact()  # Fact 클래스의 인스턴스 생성
    fact.update_fact(default_value)  # 기본 카테고리로 사실을 업데이트

    # 12개 열을 가진 그리드 레이아웃 생성
    with ui.grid(columns=12).classes("w-full"):
        # 카테고리 선택을 위한 열
        with ui.column().classes("col-span-4 sm:col-span-2 space-x-0"):
            ui.label("사실 카테고리 선택:")  # 카테고리 선택을 위한 레이블 표시
            # 카테고리 선택을 위한 라디오 버튼 그룹
            category = ui.radio(
                CATEGORIES,
                value=default_value,
                on_change=lambda _: fact.update_fact(category.value),  # 카테고리가 변경되면 사실 업데이트
            ).classes("w-full")
            # 선택한 카테고리에 대한 사실을 다시 생성하는 버튼
            ui.button(
                "⟳ 다시 생성", on_click=lambda _: fact.update_fact(category.value)
            )

        # Chuck Norris 사실을 표시하는 열
        with ui.column().classes(
            "flex col-span-8 sm:col-span-10 w-full justify-center mx-auto max-w-screen-md"
        ):
            # Chuck Norris 사실을 표시하기 위한 레이블, Fact 인스턴스의 fact 속성에 바인딩
            ui.label().bind_text_from(fact, "fact").classes(
                "text-lg sm:text-3xl text-gray-800 bg-gray-100 rounded-lg shadow-lg p-6"
            )
```

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

```python
class Fact:
    def __init__(self):
        self.fact = None  # fact 속성을 None으로 초기화합니다.

    # 주어진 카테고리에 따라 팩트를 업데이트하는 메소드
    def update_fact(self, category):
        url = f"https://api.chucknorris.io/jokes/random?category={category}"  # 척 노리스 API의 URL입니다.

        for i in range(10):  # 유효한 팩트를 가져오기 위해 최대 10번 시도합니다.
            result = requests.get(url)  # 척 노리스 API에 GET 요청을 보냅니다.

            if result.status_code == 200:  # 요청이 성공한 경우
                result_json = result.json()  # JSON 응답을 파싱합니다.
                if self.fact != result_json["value"]:  # 가져온 팩트가 현재 팩트와 다른 경우
                    self.fact = result_json["value"]  # 팩트 속성을 업데이트합니다.
                    break  # 루프를 종료합니다
```

이 클래스는 "fact" 속성에 팩트를 저장하고 Chuck Norris 팩트 API를 호출하는 update_fact 메소드를 가지고 있습니다. https://api.chucknorris.io

다음으로, "chuck" 함수에서 페이지를 정의합니다. NiceGUI는 여러 모듈과 Python 파일을 거쳐 앱을 정의할 수 있는 모듈식 접근 방식을 채택합니다.

우리는 데이터 클래스의 인스턴스인 fact = Fact()을 정의합니다. 이는 각 사용자별로 구체적인 인스턴스입니다. 그리고 다음으로 update_fact 메소드를 사용하여 팩트를 초기화합니다.

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

이제 UI 요소를 정의하기 시작합니다.

두 개의 열을 갖는 그리드를 정의합니다:

- 카테고리 옵션 및 생성 버튼이있는 첫 번째 열입니다. 이 열은 다음과 같은 tailwind 클래스를 갖습니다: col-span-4 sm:col-span-2. 이것은 매우 작은 화면의 경우 화면의 4/12을 사용하고, 그렇지 않으면 화면의 2/12을 사용합니다. 이렇게 함으로써 디자인을 모바일 전화에서도 작동하게 할 수 있습니다.
- 사실을 표시할 두 번째 열입니다.

첫 번째 열을 위해:

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

- 라디오 메뉴 `ui.radio`.
- 무작위 사실을 생성하는 버튼이 있습니다.

두 요소 모두 클릭되거나 변경될 때 `fact.update_fact`를 호출하는 콜백을 사용합니다.

두 번째 열에 대해서:

- `fact.fact` 값을 바인딩하는 `ui.label`이 있습니다. 이 변수가 변경될 때마다 디스플레이가 자동으로 업데이트됩니다.

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

아래에 있는 테일윈드 클래스를 가진 레이블입니다: text-lg sm:text-3xl 이렇게 하면 텍스트가 작은 화면에서 더 작아집니다.

다음 앱을 얻게 되요:

![앱 이미지](https://miro.medium.com/v2/resize:fit:1400/1*ElNrpcoZndHh1If8Cme9kQ.gif)

멋지죠?

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

## 배포

앱을 배포하는 것은 쉬워요! 예를 들어 CloudRun을 사용하면 매우 간단해요. Dockerfile을 생성한 다음 다음 gcloud 명령어를 실행하기만 하면 돼요:

```js
PROJECT_ID=$(gcloud config get-value project)
REPO="demo"
LOCATION="europe-west1"
IMAGE="nicegui_app"
SERVICE_NAME="nicegui-app"
VERSION="0.0.1"
GAR_TAG=$LOCATION-docker.pkg.dev/$PROJECT_ID/$REPO/$IMAGE:$VERSION

# 저장소 생성
gcloud artifacts repositories create $REPO --repository-format=docker \
    --location=$LOCATION --description="Docker repository" \
    --project=$PROJECT_ID  || true # 이미 존재하는 경우를 위해 실패해도 괜찮아요

# 이미지 빌드
gcloud builds submit --tag $GAR_TAG

# Cloud Run 배포
gcloud run deploy $SERVICE_NAME --image=$GAR_TAG --max-instances=1 --min-instances=0 --port=8080 \
 --allow-unauthenticated --region=europe-west1 --memory=0.5Gi --cpu=1 -q --no-cpu-throttling --session-affinity
```

이렇게 하면 클라우드 빌드를 사용하여 도커 이미지를 빌드한 다음 CloudRun에 배포할 수 있어요.

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

여기서 유일한 키큰 옵션은 다음과 같습니다: "— no-cpu-throttling — session-affinity". 이를 통해 동일한 사용자가 가능한 경우 동일한 컨테이너로 라우팅되고 요청 사이에 CPU가 활성 상태로 유지됩니다.

마지막으로

NiceGUI는 파이썬을 사용해 빠르고 쉽게 사용자 인터페이스를 만들고 싶을 때 좋은 선택입니다. 여기에서는 내부 상태를 완전히 제어하고 테스트하고 쉽게 배포할 수 있는 강력한 파이썬 앱을 구축할 수 있습니다. 이를 통해 데이터 과학 프로젝트에서도 도구로 제한받지 않고 창의성을 발휘할 수 있을 것입니다.

여기에 표시된 내용은 NiceGUI로 할 수 있는 작은 부분에 불과합니다. 아래 링크를 따라가면 더 많은 것을 배울 수 있습니다.

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

자원:

- Chuck Norris (매우 과장된) 사실 API: [https://api.chucknorris.io/](https://api.chucknorris.io/)
- NiceGUI 문서: [https://nicegui.io/documentation](https://nicegui.io/documentation)
- NiceGUI 예제: [https://github.com/zauberzeug/nicegui/tree/main/examples](https://github.com/zauberzeug/nicegui/tree/main/examples)
- 이 게시물의 코드: [https://github.com/CVxTz/nicegui_tutorial](https://github.com/CVxTz/nicegui_tutorial)
