---
title: "구글이 Streamlit을 죽였는가"
description: ""
coverImage: "/assets/img/2024-06-27-DidGoogleJustKillStreamlit_0.png"
date: 2024-06-27 18:19
ogImage:
  url: /assets/img/2024-06-27-DidGoogleJustKillStreamlit_0.png
tag: Tech
originalTitle: "Did Google Just Kill Streamlit?"
link: "https://medium.com/google-cloud/did-google-just-kill-streamlit-76f719d9e275"
isUpdated: true
---

## 구글의 Mesop 프레임워크를 살펴보면 Streamlit보다 더 나은지 확인해보세요.

내가 소파에 앉아 YouTube의 추천을 살펴보던 중 Google의 최신 오픈 소스 파이썬 프레임워크인 'Mesop'에 관한 Prompt Engineering의 비디오를 보게 되었습니다. 구글 팀이 내부 도구 및 빠른 프로토타이핑에 사용하는 'Mesop'라는 프레임워크입니다. 'Mesop'이 무엇을 의미하는지 궁금하다면, 너무 깊게 생각하지 마세요. 삶에는 모든 것이 의미가 있는 것은 아닙니다. 이 글을 읽는 Will이 있다면 아래 댓글에 남겨주세요.

아마 Mesop을 시도해보고 Streamlit보다 실제로 더 나은지 확인해봐야겠다고 생각했습니다. Streamlit은 코드 작성 경험이 매우 직관적하고 마법 같이 순식간에 앱을 생성할 수 있는 능력 때문에 정말 좋아합니다. 하지만 그 인터페이스를 보자마자 Streamlit임을 알 수 있습니다.

이 문제에 대처하기 위해 Python과 Tailwind CSS만 사용하여 아름다운 웹 앱을 개발하는 방법에 대해 작성한 블로그가 예상치 못하게 터져나왔습니다. 여기서 읽을 수 있습니다. 이 과정은 훨씬 더 제작 친화적이지만, 사용자 정의 가능한 프로토타입을 개발하려면 어떨까요?

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

당신이 바로 Mesop이 하는 일입니다.

간략히 요약하면, Mesop은 아직 초기 단계에 있으므로 그것을 기반으로 SaaS 스타트업을 구축하기 위해 키보드로 코딩을 시작하지 마세요. 또한 Google에서 공식적으로 지원하지는 않습니다.

# Mesop의 기능

- 오픈 소스.
- 미리 구축된 구성 요소로 시작하기 쉽습니다.
- Python에서 작성된 자연스러운 코드.
- 핫 리로드.
- 구성 요소는 기본적으로 Python 함수입니다.
- Angular로 구축되었습니다.

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

# Mesop 시작하기

안녕하세요! 메소프 기술의 다양한 기능에 대한 장황한 문학작품으로 사람들을 지루하게 만드는 것을 싫어하기 때문에, 메소프로 기본 UI를 만드는 것으로 바로 도입하겠습니다. 메소프로 작업할 때 알아두어야 할 주요한 세 가지 구성 요소가 있습니다:

- 상태 클래스: 이는 세션의 상태 역할을 하며 다른 구성 요소 간에 데이터를 공유하는 능력을 제공합니다.
- 페이지 및 이벤트: 앱의 주요 UI입니다.
- 스타일링 요소: CSS 스타일 (Tailwind 지원은 아직 제공되지 않습니다)

시작하기 전에 pip install mesop을 사용해서 메소프를 설치해보세요. 함께 즐거운 개발 시간 보내시길 바랍니다!

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

## State 클래스

앱 내에서 사용되는 모든 모델은 데코레이터 @me.stateclass를 사용하여 state 클래스를 인스턴스화하는 데 사용됩니다. 예를 들어, 제목과 개요를 사용하여 기사를 생성하는 GenAI 앱을 개발 중이라고 가정해보겠습니다. 'Article'이라는 이름의 state 클래스를 생성해야 합니다. 해당 state 클래스는 다음과 같이 보일 것입니다:

```js
import mesop as me

@me.stateclass
class Article:
    title: str
    outline: str
    response: str
```

우리가 생성하는 각 함수나 구성 요소에서 이 state 클래스 데이터는 유지되며 전역적으로 액세스할 수 있습니다.

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

## 페이지 및 이벤트

모든 페이지는 Mesop에서 @me.page() 데코레이터를 사용하여 태그가 지정됩니다.

```js
@me.page()
def app():
    me.input(label="제목", type="text")
    me.input(label="개요", type="text")
```

위의 코드는 두 개의 입력 필드가 있는 기본 페이지를 생성합니다. 이전에 만든 상태 클래스에 데이터를 저장할 수 있도록 각 필드에는 별도의 함수가 필요합니다.

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

```js
def on_title_input(title: me.InputEvent):
    s = me.state(Article)
    s.title = title.value

def on_outline_input(outline: me.InputEvent):
    s = me.state(Article)
    s.outline = outline.value

@me.page()
def app():
    me.input(label="Title", on_input=on_title_input, type="text")
    me.input(label="Outline", on_input=on_outline_input, type="text")
```

상태 클래스에 액세스하려면 me.state() 함수를 사용합니다. 그 인스턴스는 변수 s에 저장됩니다.

Mesop에서 이벤트는 InputEvent, ClickEvent 등의 클래스를 사용하여 처리됩니다.

클릭 이벤트를 처리하기 위해 다른 함수를 호출하여 입력 데이터를 제출할 수 있습니다.

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

```js
# 응답 스키마
class Blog(typing_extensions.TypedDict):
    title: str
    content: str

def on_title_input(title: me.InputEvent):
    s = me.state(Article)
    s.title = title.value

def on_outline_input(outline: me.InputEvent):
    s = me.state(Article)
    s.outline = outline.value

def on_click(click: me.ClickEvent):
    s = me.state(Article)
    prompt = f"다음 기사 제목 및 개요를 사용하여 블로그를 작성해주세요: <article_title>{s.title}</article_title><article_outline>{s.outline}</article_outline>. 최종 블로그와 제목을 마크다운 형식으로 반환하세요."
    # 훅 URL을 저장할 환경 변수 추가
    response = model.generate_content(
                prompt,
                generation_config=genai.GenerationConfig(
                    response_mime_type="application/json",
                    response_schema=Blog,
                    temperature=0.8
                ))
    data = json.loads(response.text)
    s.response = data

@me.page()
def app():
    me.input(label="제목", on_input=on_title_input, type="text")
    me.input(label="개요", on_input=on_outline_input, type="text")
    me.button("블로그 생성", on_click=on_click)
```

재미있는 일을 위해 Mesop을 사용하여 Gemini 모델을 활용해 블로그를 생성할 것입니다. on_click 함수는 Article 인스턴스로부터 data s.title과 s.outline를 가져와서 만든 prompt에 주입할 것입니다. LLM의 응답은 블로그 내용을 담은 JSON일 것입니다.

## 스타일링

Mesop에서 요소를 스타일링하는 것은 기존 CSS 속성과 유사하지만, 모든 속성은 me.style()의 매개변수입니다.

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

me.style()을 사용하여 스타일을 정의한 후, 해당 스타일을 변수에 저장하여 컴포넌트에서 매개변수로 호출할 수 있습니다.

```js
_STYLE_INPUT_WIDTH = me.Style(width="100%")

_STYLE_BUTTON = me.Style(
    background="#1976D2",
    color="#fff",
    padding=me.Padding.symmetric(horizontal=20, vertical=10),
    font_size="16px",
    cursor="pointer",
    margin=me.Margin(bottom=20),
)

@me.page()
def app():
    with me.box(style=_STYLE_CONTAINER):
        s = me.state(Article)
        with me.box(style=_STYLE_MAIN_COLUMN):
            me.input(label="Title", on_input=on_title_input, type="text", style=_STYLE_INPUT_WIDTH)
            me.input(label="Outline", on_input=on_outline_input, type="text", style=_STYLE_INPUT_WIDTH)
            me.button("Generate Blog", on_click=on_click, style=_STYLE_BUTTON)
    with me.box(style=_STYLE_PREVIEW_CONTAINER):
        if s.response:
            me.markdown(f"{s.response['content']}", style=_STYLE_PREVIEW)
```

# 최종 인터페이스

<img src="/assets/img/2024-06-27-DidGoogleJustKillStreamlit_0.png" />

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

안녕하세요! 테이블 태그를 마크다운 형식으로 변경해 드릴게요.

| Not the best-looking UI, but that’s because I didn’t make the effort to style it enough. It still looks a lot better than raw HTML with just a few tweaks here and there. With the ability to use all CSS properties for the components, you can make the UI unique. |

# Is Streamlit dead?

No, absolutely not. Mesop is still under development, and the documentation lacks in certain aspects. Deploying a Mesop application is not straightforward and requires containerization unless you are deploying it directly to Google Cloud.

Streamlit still comes with its own set of benefits and is fundamentally stronger compared to Mesop, especially if you are looking to build something in the data visualization domain. Moreover, Streamlit Cloud is a boon for anyone looking to share their applications absolutely free of charge.

무엇이든 더 도와드릴게요!

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

그러나 Mesop은 성장 잠재력이 있으며 매일 업데이트를 받고 있어 가벼운 성격으로 REST API에서 작동하는 빠른 도구 및 간단한 프로토 타입에 더 적합해지고 있습니다.

Mesop의 Will과 다른 기여자들에게 시간과 노력을 들여 이러한 프레임워크를 개발하고 유지하는 데 기쁨을 느낍니다.

# 더 많은 UI 프레임워크가 필요합니다

Streamlit, Nicegui, Gradio 그리고 이제 Mesop와 같은 새로운 Python UI 프레임워크가 등장하는 것을 항상 좋게 생각합니다. Python의 관용구 문법은 코딩을 훨씬 더 접근 가능하게 만들어주며, 이는 지금 Streamlit 프로젝트의 많은 수로부터 명확히 확인됩니다.

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

행운이던지 불행이던지, 파이썬이 내가 처음으로 배운 프로그래밍 언어였고, 그것에 즉시 사랑에 빠졌어요. 이와 같은 더 많은 프레임워크로 인해, Python은 사용량이 급격히 증가할 것이고, 미래에는 더 많은 실무급 Python 앱들을 볼 수 있기를 희망해요.

저는 Mesop에 관한 이 짧은 블로그를 좋아해주셨으면 좋겠어요. 더 깊이 파고들고 싶었지만, 제한된 시간 때문에 글을 짧게 유지하게 된 것과, 우리 모두가 금붕어 수준의 집중력을 고려했기 때문이에요. 만약 이 글에 박수를 보내주시고, 파이썬과 Google 커뮤니티의 더 많은 사용자와 공유해주시고, 앞으로의 다른 글들을 위해 팔로우해주시면 정말 감사하겠어요.

# 링크

- Github
- Mesop
