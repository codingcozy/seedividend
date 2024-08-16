---
title: "파이썬만 활용해 경험 없이 아름다운 웹 앱 만드는 방법"
description: ""
coverImage: "/assets/img/2024-05-20-HowIBuiltABeautifulWebAppPurelyinPythonwithZeroExperience_0.png"
date: 2024-05-20 22:02
ogImage: 
  url: /assets/img/2024-05-20-HowIBuiltABeautifulWebAppPurelyinPythonwithZeroExperience_0.png
tag: Tech
originalTitle: "How I Built A Beautiful Web App Purely in Python — with Zero Experience."
link: "https://medium.com/gitconnected/how-i-built-a-beautiful-web-app-purely-in-python-with-zero-experience-874731df6bc1"
isUpdated: true
---




## FastAPI, Jinja2 및 DaisyUI 사용하기.

또 다른 주말, 또 다른 가려운 부분이 생겼네요. 개인적으로 저는 하드웨어든 소프트웨어든 심지어 기계 작업 프로젝트든 매체에 상관없이 무언가를 만드는 것을 좋아합니다. 저와 같은 사람들에게는 한 가지나 한 가지 기술에 집중하는 것이 어려운 도전이죠. 무언가를 만드는 욕구가 만만치 않아 빨리 만들고 싶어해요 (자랑할 만한 것은 아닐지도 모르죠). 내 생각에는 웹 앱을 만드는 것은 상당한 인내심과 지속적인 적응과 학습 의지가 필요한 일입니다. 제가 가장 좋아하는 일은 아닙니다. 아마 당신도 공감할 수 있을 겁니다.

지난 블로그 글에서 읽었겠지만, 매주 새로운 기술을 탐험하기 위해 떠나는 나의 여정 중 하나로, 파이썬 웹 프레임워크인 FastAPI에 몰두해보기로 했습니다. 또 다른 신기술에 뛰어드는 것 대신에, FastAPI를 사용하여 순수하게 Python만으로 (JavaScript 사용 안 함) 기능적인 웹 앱을 개발하는 데 초점을 맞추기로 했습니다. 이 글을 쓰기 전에 Vue.js에도 조금 손을 대봤는데, 흥미로웠지만 복잡성을 더하고, 제 JavaScript 능력은 그리 높지 않다는 것을 깨달았습니다. 처음부터 다시 시작했죠.

이 글에서는 주변 청크를 검색하는 기존 FastAPI 프로젝트를 확장해 나갈 것입니다. 더 많은 내용을 알고 싶으시면 이전 글을 읽어보세요.

<div class="content-ad"></div>

기술 탐구 내역:

- FastAPI — 파이썬 웹 프레임워크
- Jinja2 — 템플릿 엔진
- DaisyUI — Tailwind CSS용 구성 요소 라이브러리

경험이 풍부한 웹 앱 개발자나 프로그래밍 전문가라면, 본 문서가 새로운 통찰을 제공하지는 않을지도 모릅니다. 그러나 Python으로 웹 앱을 구축하는 세부 사항에 대해 궁금해하는 분이나 Streamlit과 같은 것보다 더 많은 제어권을 제공하는 Python 웹 개발자 채용 공고에 대해 궁금해하는 분이라면, 여기가 바로 당신이 찾던 곳입니다. 함께 과정을 탐험해보겠습니다.

솔직히 말씀드리자면, FastAPI를 사용해 프론트엔드를 구축하는 것은 쉬웠지만, 앱과 tailwindcss (DaisyUI)를 통합하는 것이 저에게 가장 시간이 많이 걸렸습니다. 그 부분을 건너뛸 수도 있었지만, 웹 앱을 구축하는 유일한 이유는 나에게 창의력을 펼칠 수 있는 자유가 있다는 점이라는 사실을 인정해야 합니다. 누가 멋진 사용자 인터페이스를 좋아하지 않겠습니까? 그러니 더 이상 말이 필요 없으니, 함께 확인해 봅시다.

<div class="content-ad"></div>

# DaisyUI란 무엇인가요?

**모든 사람들이 멋진 사용자 인터페이스를 좋아합니다**, 하지만 말하는 것이 맞다고 여겨지며, CSS 스타일을 작성하는 일은 종종 사람들이 웹 앱의 시각적으로 매력적인 프론트엔드를 만드는 것을 꺼리게 합니다. CSS에 대해서 말할 때 **마치 녹음된 음반이라도 듣는 것 같은데**, 제가 CSS에 관해서는 좀게 놀기 싫은 타입이라서 대개 제 할 일 목록의 제일 뒷부분에 두게 되죠. 학교에서 미술 수업? 그냥 턱걸이로 벗어난다고 말해야 할 것 같아요. CSS의 픽셀 완벽한 스타일링 세부사항에 뛰어드는 것이 나를 즐겁게 하진 않습니다.

저와 같은 사람들을 위해(그렇습니다, Tailwind는 프로덕션 급 앱에서도 사용됩니다), Tailwind는 생명을 구원해줍니다. **HTML 컴포넌트를 위한 미리 정의된 스타일과 템플릿을 제공하여**, 특정 클래스를 추가함으로써 쉽게 커스터마이즈할 수 있습니다.

Tailwind는 엄청난 인기를 얻었으며, 이제는 다양한 분야의 애플리케이션에서 상용품으로 자리 잡았습니다. 만약 잘 안다면, **앱이 순정 Tailwind CSS를 사용하고 있는지 종종 알아낼 수 있습니다**. Tailwind 클래스를 세심하게 조정할 수도 있고, 아니면 Tailwind에 맞게 제작된 컴포넌트 라이브러리를 사용하는 손쉬운 방법을 선택할 수도 있습니다. 마치 Tailwind라는 Tailwind를 사용하는 것과 같은 이치인 거죠, ㅋㅋ. 여러 가지 컴포넌트 라이브러리가 있고, **DaisyUI가 그중 하나입니다**.

<div class="content-ad"></div>

DaisyUI를 사용하는 것에는 수많은 기능과 이점이 있습니다. 더 자세히 알아보려면 그들의 웹사이트를 방문하시면 됩니다. 제가 제일 좋아하는 기능 중 하나는 테마 선택 기능입니다. 다양한 테마 중에서 선택할 수 있어서 완벽한 색상 구성을 찾는 데 어려움을 겪지 않을 것입니다.

# 웹 앱의 파일 구조

```js
root
|-app
  |- chroma_db
  |- functions.py
  |- main.py
  |- models.py
  |- chroma_db
  |- static
    |- css
      |- app.css
  |- styles
    |- app.css
  |- templates
    |- index.html
  |- files
    |- samples.pdf
```

chroma_db 폴더, models.py, functions.py는 이전에 만든 프로젝트에서 이어지게 될 것입니다. 이전에 FastAPI에 익숙하지 않으셨다면, 이 기사를 읽을 것을 권해드립니다.

<div class="content-ad"></div>

# 사용자 인터페이스

모든 기술적인 내용에 지루해하기 전에, 여기 사용자 인터페이스의 일부를 엿볼 수 있는 이미지입니다. 힘내세요!

![Interface Image 0](/assets/img/2024-05-20-HowIBuiltABeautifulWebAppPurelyinPythonwithZeroExperience_0.png)

![Interface Image 1](/assets/img/2024-05-20-HowIBuiltABeautifulWebAppPurelyinPythonwithZeroExperience_1.png)

<div class="content-ad"></div>

비록 Behance에서 자랑할 만한 것은 아니지만, 정말 멋지게 보이지 않나요? 개인적으로 나는 기본 Times New Roman, 흑백 테마보다 훨씬 좋아하는 편이에요. 그 테마는 정말 웹 개발을 싫어하게 만들어요.

만약 이 작업이 많은 노력을 필요로 할 것이라고 생각한다면, 안심하세요. 나는 오랜만에 CSS에 손 대지 않았고, 아주 빠르게 할 수 있었어요. 당신도 할 수 있다는 걸 함께 확인해봐요!

# 앱을 위한 Tailwind 설정

DaisyUI를 위한 CDN을 사용하거나 Tailwind 플러그인으로 설치할 수 있어요. 프로덕션 환경에서는 권장되지 않지만, 과정을 훨씬 간단하게 만드는 CDN을 사용할 수 있어요. 하지만 권장하는 방법으로, Tailwind 플러그인으로 설치할 거에요. 이 방법은 약간 더 어려울 수 있고 일부 설정 문제가 있을 수 있지만, 누가 좋은 도전을 싫어하겠어요?

<div class="content-ad"></div>

Tailwind를 설치하려면 JavaScript의 패키지 관리자 인 NPM이 설치되어 있는지 확인하십시오. NPM이 설치되어 있지 않은 경우 문서를 참조하십시오.

프로젝트의 루트 디렉토리 터미널에서 다음 명령을 실행해야 합니다:

```js
npm install -D tailwindcss
npx tailwindcss init
npm i -D daisyui@latest
```

성공적으로 실행되면 프로젝트의 루트 디렉토리에 tailwind.config.js라는 구성 파일이 생성됩니다.

<div class="content-ad"></div>

tailwind.config.js 파일에서는 DaisyUI를 플러그인으로 추가해야 합니다. 파일은 다음과 같이 보일 것입니다:

```js
const { default: daisyui } = require('daisyui');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/templates/*.html"],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes: ["light", "dim", "acid"],
  },
}
```

스타일이 적용되지 않는 이유를 찾느라 시간을 많이 소비했습니다. 30분 이상을 쓴 뒤에야 HTML 파일 경로가 content 섹션에 잘못 지정되어 있어서 그랬다는 것을 발견했습니다. 비슷한 문제를 겪는다면 먼저 이 부분을 확인해 보세요. DaisyUI 테마도 여기서 설정할 수 있습니다.

이제 절차를 모두 마쳤으므로 tailwind CSS 파일을 생성할 시간입니다. 주로 두 가지 파일이 생성될 것입니다: styles/app.css (입력 파일)와 static/css/app.css (클래스별 스타일이 적용된 생성된 CSS 파일).

<div class="content-ad"></div>

styles/app.css 파일에서 다음 tailwind 지시문을 정의하세요:

```js
@tailwind base;
@tailwind components;
@tailwind utilities;
```

tailwind CSS 파일을 생성하려면, 다음 명령을 실행하세요:

```js
npx tailwindcss -i ./styles/app.css -o ./static/css/app.css --watch
```  

<div class="content-ad"></div>

그만입니다. Tailwind와 DaisyUI를 성공적으로 설치했습니다.

# Jinja2를 사용하여 템플릿 생성하기

Jinja2는 Python용 템플릿 엔진으로, 애플리케이션에서 모듈식이고 동적인 HTML 콘텐츠를 만드는 데 사용됩니다. 이는 우리의 웹 애플리케이션에서 전혀 JavaScript를 사용하지 않게 될 것이므로 매우 도움이 됩니다. API에서 가져온 정보를 HTML 템플릿에 매핑하고, 그런 다음 Jinja2를 사용하여 렌더링할 것입니다. Jinja2를 사용하면 HTML 내부에 반복문, 조건문, 필터, 변수 등을 직접 사용할 수 있는 표현식을 사용할 수 있습니다. 이러한 표현식에 대해 더 알아보려면 Jinja2 문서의 관련 문서를 읽어보세요.

```js
<div>
    <!-- 결과가 존재하는지 확인 -->
    { if not results }
    <h2>결과 없음</h2>
    { endif }
    { if results }
    <h2>가장 가까운 이웃</h2>
    <div id="results">
        <!-- 가장 가까운 이웃이 여기에 표시됩니다 -->
        { for result in results }
        <div>
            <input type="checkbox" />
            <div>
                <p>{ result.page_content[:25]|safe }...</p>
            </div>
            <div>
                <p>{ result.page_content }</p>
            </div>
        </div>
        { endfor }
    </div>
    { endif }
</div>
```

<div class="content-ad"></div>

이 템플릿은 결과의 존재를 확인하기 위해 조건식을 사용합니다. 결과가 발견되면 각각에 대한 모달을 생성하기 위해 반복합니다. Python 프로그래밍에 익숙하다면, 이를 이해하는 데 어렵지 않을 것입니다.

## HTML에 Tailwind CSS 파일 링크하기

Tailwind 스타일을 활성화하려면 다음 코드 줄을 HTML의 `head` 태그에 추가하여 링크해야 합니다.

```js
<link rel="stylesheet" href="{url_for('static',path='css/app.css')}">
```

<div class="content-ad"></div>

## 템플릿에 Tailwind 클래스 추가하기

이 글을 길게 만들기보다는 Tailwind 클래스에 너무 깊게 파고들지 않을 거에요. 여기에서 다양한 유틸리티 클래스에 대해 읽을 수 있어요. Tailwind 클래스를 사용하면 위의 HTML이 다음과 같이 보일 거에요:

```js
<div class="max-w-md mx-auto">
    <!-- 결과가 있는지 확인하기 -->
    { if not results }
    <h2 class="text-lg font-semibold mb-2 text-info">결과를 찾을 수 없습니다</h2>
    { endif }
    { if results }
    <h2 class="text-lg font-semibold mb-2 text-info">가장 가까운 이웃들</h2>
    <div id="results">
        <!-- 가장 가까운 이웃들이 여기에 표시됩니다 -->
        { for result in results }
        <div class="collapse bg-base-200 mb-4">
            <input type="checkbox" />
            <div class="collapse-title text-xl font-medium text-primary">
                <p>{ result.page_content[:25]|safe }...</p>
            </div>
            <div class="collapse-content">
                <p>{ result.page_content }</p>
            </div>
        </div>
        { endfor }
    </div>
    { endif }
</div>
```

요약하자면, 일부 Tailwind 유틸리티 클래스는 다음을 나타냅니다:

<div class="content-ad"></div>

- text-lg: 큰 글꼴 크기
- mb-2: 2단계의 하단 여백
- bg-base-200: 베이스 클래스의 배경 색상. 이것은 선택한 테마나 static/css/app.css에서 설정한 스타일에 따라 달라집니다.

전체 HTML 또는 특정 섹션에 테마를 선택하려면 data-theme 속성을 사용하세요.

예를 들어.

```js
<html data-theme="cupcake"></html>
```

<div class="content-ad"></div>

OR

```js
<html data-theme="dark">
  <div data-theme="light">
    이 div는 항상 밝은 테마를 사용합니다.
    <span data-theme="retro">이 span은 항상 레트로 테마를 사용합니다!</span>
  </div>
</html>
```

# API를 사용하여 데이터 가져오기

API가 모두 설정되었으므로, 이전 튜토리얼에서 생성한 대로, 이제 HTML에 데이터를 가져와야 합니다. 이를 위해 main.py 파일을 약간 수정해야 하고, 그럼 준비됩니다. 그러나 그에 앞서, 데이터를 가져오는 트리거 역할을 할 HTML 폼을 만들어 봅시다.

<div class="content-ad"></div>

## HTML 폼

```js
<div class="max-w-md p-8 mx-auto mb-8 rounded-md shadow-md bg-neutral">
        <form id="query-form" method="post" action="/neighbours/" class="flex flex-col mb-6">
            <div class="mb-4">
                <input type="text" placeholder="Query" id="query" name="query" required
                    class="input input-ghost w-full max-w-xs" />
            </div>
            <div class="mb-4">
                <input type="range" min="1" max="5" value="3" class="range" step="1" name="neighbours" id="neighbours" />
                <div class="w-full flex justify-between text-xs px-2">
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                </div>
            </div>
            <button type="submit" class="btn btn-accent">제출</button>
        </form>
  </div>
```

대부분이 DaisyUI 구성 요소로 구성되어 있습니다. 중요한 점은 form의 action 속성이 우리 API의 /neighbours 엔드포인트를 가리키고 POST 메소드를 사용해야 한다는 것입니다.

## FastAPI 앱

<div class="content-ad"></div>

Jinja2 템플릿을 렌더링하려면 fastapi.templating 모듈을 사용해야 합니다.

```js
from fastapi.templating import Jinja2Templates

templates = Jinja2Templates(directory="templates")
```

HTML 템플릿이 동적으로 렌더링되어야 하므로 CSS 스타일 또는 다른 정적 리소스를 포함하는 폴더를 마운트해야 합니다. 이를 통해 템플릿 내에서 폴더에 액세스할 수 있습니다.

```js
from fastapi.staticfiles import StaticFiles

app.mount("/static", StaticFiles(directory="static"), name="static")
```

<div class="content-ad"></div>

엔드포인트 함수에 필요한 유일한 조정은 응답 클래스를 HTMLResponse로 변경하는 것뿐입니다. JSON 객체 대신 웹페이지를 렌더링할 것이기 때문입니다.

```js
@app.get("/", response_class=HTMLResponse)
async def main(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# 이웃 가져오기
@app.post("/neighbours/", response_class=HTMLResponse)
async def fetch_item(request: Request, query: str=Form(...), neighbours: int=Form(...)):
    embedding_function = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
    db = Chroma(persist_directory="./chroma_db", embedding_function=embedding_function)
    results = db.similarity_search(query, k=neighbours)
    return templates.TemplateResponse("index.html", {"request": request, "results": results})
```

FastAPI 폼은 Pydantic 모델을 지원하지 않습니다. 대신 Form 메서드를 사용하여 폼에서 게시된 데이터를 구문 분석합니다. 함수 매개변수에서 query: str = Form(...)는 엔드포인트가 문자열인 query이름의 폼 필드를 예상한다는 것을 나타냅니다. 함수가 호출될 때 TemplateResponse를 반환하고 결과를 템플릿에 전달합니다.

다 됐어요! 완료했습니다. 이것은 Streamlit 없이 Python으로 웹 앱을 만드는 가장 쉬운 방법 중 하나였어요. Tailwind나 DaisyUI CSS 없이 기본적인 'Hello World' 애플리케이션을 선택했더라도 더 쉽게할 수 있었겠지만, 그렇게 한 것에 재미가 어디 있나요?

<div class="content-ad"></div>


<img src="/assets/img/2024-05-20-HowIBuiltABeautifulWebAppPurelyinPythonwithZeroExperience_2.png" />

# 결론

나는 가능한 한 철저하게 노력하여 파이썬을 사용하여 FastAPI를 이용해 웹 앱을 구축하는 데 필요한 모든 중요한 측면을 자세히 설명했다. 프론트엔드를 구축하는 동안 문제가 발생하면 언제든지 ChatGPT에 의지하고, 그것에게 프론트엔드를 만들도록 요청할 수 있다. 유용한 팁 중 하나는 Tailwind 문서에서 샘플 코드를 제공하고 앱에 통합하도록 요청하는 것이다. 튼튼한 보일러플레이트가 있으면 이를 역공학하고 원하는 대로 사용자 정의할 수 있다. 이 방식은 프로세스를 간단하게 만들며 문서 전체를 읽는 것보다 더 매력적으로 만든다.

다음 주말에는 완전한 RAG 애플리케이션을 Llama3을 사용하여 구축하거나 이것에 파일 업로드 기능을 추가할 예정이다. 나는 처음부터 파일 업로드를 구현하고 처리하는 데 경험이 없기 때문에 그것이 흥미로울 것이다.


<div class="content-ad"></div>

저희 튜토리얼을 즐기셨기를 바랍니다. 경험이 부족한 사람이 작성하여 이해하기 쉬울 거예요. 안녕히 계세요!

## Github Repo