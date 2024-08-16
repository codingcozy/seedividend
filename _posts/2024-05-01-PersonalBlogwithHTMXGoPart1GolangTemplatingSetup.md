---
title: "개인 블로그를 HTMX + Go로 만들기1 - Golang 템플릿 설정"
description: ""
coverImage: "/assets/img/2024-05-01-PersonalBlogwithHTMXGoPart1GolangTemplatingSetup_0.png"
date: 2024-05-01 23:15
ogImage: 
  url: /assets/img/2024-05-01-PersonalBlogwithHTMXGoPart1GolangTemplatingSetup_0.png
tag: Tech
originalTitle: "Personal Blog with HTMX + Go Part 1 — Golang Templating Setup"
link: "https://medium.com/gravel-engineering/this-blogpost-also-posted-in-my-personal-blog-which-you-can-access-here-dd856c61001"
isUpdated: true
---




이 블로그 포스트는 내 개인 블로그에도 게시되어 있으며 여기에서 액세스할 수 있습니다.

# 서문

최근에 저는 HTMX와 Golang을 사용하여 제 개인 블로그를 처음부터 만들었다는 것을 발표하는 포스트를 작성했습니다. JavaScript 프레임워크를 완전히 생략했습니다. 해당 블로그 포스트는 여기에서 읽을 수 있습니다.

이것은 HTMX + Go 여정의 첫 번째이며, 제 개인 블로그를 위해 HTMX를 처음으로 설정하는 과정을 기록할 것입니다 (만약 이 기사를 Medium에서 읽는다면 여기를 방문할 수 있습니다).

<div class="content-ad"></div>

세부적인 튜토리얼처럼 프로세스를 상세히 다루지는 않겠습니다. 대신, 제가 무엇을 하고 있는지, 무엇이 저를 방해하는지, 그리고 어떻게 극복했는지(또는 우회했는지)를 문서화하는 저의 일지처럼 다룰 예정입니다. 그리고 그 과정 중에 발견한 다양한 잡다한 것들도 함께 공유할 거에요.

이 시리즈는 많은 기본적인 부분을 건너뛸 것이기 때문에 처음 시작하는 사람들이 함께하길 기대하지는 않습니다. 그래도 질문은 언제든 환영하니 아래 댓글에 망설이지 말고 바로 날 물어봐주세요!

# 설정하기

# 템플릿 랜더러

<div class="content-ad"></div>

우선 Labstack Echo를 사용하여 HTML 파일을 제공할 수 있는지 확인해야 합니다. 나는 개인적으로 HTTP 라우터로 선택한 것이기 때문에. Echo의 가이드에서 템플릿 섹션을 따르면 Echo의 Renderer 인터페이스를 구현하는 "템플릿 렌더러"를 제공해야 합니다.

그것을 위해, 다음과 같은 코드를 만들었습니다:

```js
type Template struct {
    Templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
    return t.Templates.ExecuteTemplate(w, name, data)
}

func NewTemplateRenderer(e *echo.Echo, paths ...string) {
    tmpl := &template.Template{}
    for i := range paths {
        template.Must(tmpl.ParseGlob(paths[i]))
    }
    t := newTemplate(tmpl)
    e.Renderer = t
}

func newTemplate(templates *template.Template) echo.Renderer {
    return &Template{
        Templates: templates,
    }
}
```

이 템플릿 렌더러의 아이디어는 HTML 템플릿 파일을 넣은 경로를 나타내는 문자열의 가변 매개변수를 제공할 수 있다는 것입니다. 이것은 template.ParseGlob이 재귀적으로 템플릿 파일을 찾을 수 없기 때문에 필요합니다. 또한, html/template을 가져오지 말고 text/template을 가져와야 한다는 것을 잊지 마세요!

<div class="content-ad"></div>

# 안녕, 세상아

우리는 간단한 에코 서버를 만들고 간단한 HTML 파일을 제공해보면서 테스트할 수 있습니다. 먼저 public 경로에 새로운 index.html 파일을 생성하여 Hello World를 시작해 보겠습니다:

```js
{define "index"}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello, World!</title>
</head>
<body>
    <p>Hello, World!</p>
</body>
</html>
{end}
```

이것은 그저 간단한 HTML 파일입니다. 그러나 HTML 파일을 감싸는 이중 중괄호({})에 주목해주세요. 이는 Go 템플릿 태그입니다. 위 예시에서는 단순히 나중에 Go 코드에서 직접 액세스할 수 있는 index라는 이름의 새로운 템플릿을 정의했습니다.

<div class="content-ad"></div>

이제 간단한 echo 서버를 만들어 봅시다:

```js
func main() {
    e := echo.New()
    
    // 약간의 미들웨어를 추가하여 housekeeping
    e.Pre(middleware.RemoveTrailingSlash())
    e.Use(middleware.Recover())
    e.Use(middleware.RateLimiter(middleware.NewRateLimiterMemoryStore(
        rate.Limit(20),
    )))

    // 이것은 템플릿 렌더러를 초기화합니다.
    template.NewTemplateRenderer(e, "public/*.html")
    e.GET("/hello", func(e echo.Context) error {
        return c.Render(http.StatusOK, "index", nil)
    })

    e.Logger.Fatal(e.Start(":4040"))
}
```

이 echo 서버는 포트 :4040에서 실행되며 public 디렉토리에 위치한 .html 파일을 렌더링합니다. 그리고 /hello라는 새로운 엔드포인트를 생성하여 index를 제공할 것입니다. 실행해 보면 아마도 이렇게 될 것입니다:

<img src="/assets/img/2024-05-01-PersonalBlogwithHTMXGoPart1GolangTemplatingSetup_0.png" />

<div class="content-ad"></div>

# 템플릿에 값 전달하기

이제 템플릿에 동적 값들을 전달할 수 있는지 확인해봐야 해요. 결국 템플릿의 목적이죠. 먼저 index.html 코드를 약간 수정해야 해요:

```js
<p>Hello, World!</p>
<p>Greetings, {.Name}!</p>
```

다시 한 번 중괄호를 두 개 사용했네요. 이 예제에서는 html 파일로 Name이라는 값을 전달하려고 합니다. 그러면 서버도 조금 수정해야겠죠?

<div class="content-ad"></div>

```js
e.GET("/hello", func(e echo.Context) error {
    res := map[string]interface{}{
        "Name": "Wyndham",
    }
    return c.Render(http.StatusOK, "index", res)
})
```

이렇게 하면 렌더러가 res의 값을 루트 값으로 취하고 Name 키를 가진 자식 값을 찾습니다. 그럼 다음과 같이 결과를 렌더링해야 합니다:

<img src="/assets/img/2024-05-01-PersonalBlogwithHTMXGoPart1GolangTemplatingSetup_1.png" />

# 중첩 템플릿 및 템플릿 간 값 전달하기

<div class="content-ad"></div>

이제 HTMX를 다루기 전에 마지막으로 확인할 사항은 index 템플릿 내에 다른 템플릿을 중첩할 수 있는지입니다. 이를 위해 name_card.html이라는 간단한 템플릿 파일을 만들었습니다:

```js
{define "name_card"}
<div>
    <p>사용자 개인 정보:</p>
    <ol>
        <li>이름: {.Name}</li>
        <li>전화번호: {.Phone}</li>
        <li>이메일: {.Email}</li>
    </ol>
</div>
{end}
```

그런 다음 index.html을 약간 수정해야 합니다. 먼저 인사 문구를 삭제한 다음 다음을 추가하십시오:

```js
<p>Hello, World!</p>
<!-- 이 줄 삭제 <p>Greetings, {.Name}!</p> -->
{template "name_card" .}
```

<div class="content-ad"></div>

그러면 우리는 다시 한번 서버를 수정해야 합니다:

```js
e.GET("/hello", func(e echo.Context) error {
    res := map[string]interface{}{
        "Name": "Wyndham",
        "Phone": "8888888",
        "Email": "skyscraper@gmail.com",
    }
    return c.Render(http.StatusOK, "index", res)
})
```

이제 여기서 맞다면, 이렇게 개인 정보를 렌더링할 수 있어야 합니다. 여기서 로직은, Name, Phone, Email을 포함한 3쌍의 키-값을 가진 인터페이스 맵을 전달한다는 것입니다.

그리고 우리는 중괄호를 사용하여 name_card에서 해당 값을 액세스합니다. 그러나 name_card 템플릿이 값을 받도록 하려면 index.html 내에서 template "name_card" .의 내부에서 추가 . 를 통해 res 값을 전달해야 합니다.

<div class="content-ad"></div>

그리고 당연히:

<img src="/assets/img/2024-05-01-PersonalBlogwithHTMXGoPart1GolangTemplatingSetup_2.png" />

우리는 여러 템플릿 파일을 중첩시키고 변수를 전달하는 데 성공했습니다! 이제 템플릿 설정이 끝났으니, HTMX에 대해서 조금 더 살펴봅시다.

# HTMX를 사용하여 연락처 정보 공개하기

<div class="content-ad"></div>

간단한 뷰를 만들려고 해요. 이름과 그 옆에 연락처 정보를 공개하기 위한 버튼이 있는 목록을 만들 거예요. 이를 위해서 먼저 이 프로젝트에 HTMX를 추가해야 해요. 일단 CDN을 통해 추가할 거에요:

```js
<head>
    ...
    <script src="https://unpkg.com/htmx.org@1.9.5" integrity="sha384-xcuj3WpfgjlKF+FXhSQFQ0ZNr39ln+hwjN3npfM9VBnUskLolQAcN80McRIVOPuO" crossorigin="anonymous"></script>
</head>
```

위 코드를 통해 HTMX를 CDN을 통해 추가할 거예요. 이제 사용자 정보를 직접 공개하지 않도록 index.html을 다시 수정해야 해요:

```js
<p>Hello, World!</p>
<!-- 이 줄을 삭제하세요 {template "name_card" .} -->
<div id="user-info">
    <p>{.Name}</p>
    <button hx-get="/get-info" hx-target="#user-info" hx-swap="innerHTML">정보 공개</button>
</div>
```

<div class="content-ad"></div>

이렇게 하면 UI가 이름 부분만 표시되도록 설정되며, /get-info 엔드포인트를 호출할 버튼을 설정하고 #user-info 요소를 대상으로 하여 대상 요소의 내부 부분을 바꿀 것입니다 (기본적으로 `div`를 그대로 두고 `div` 내부의 모든 것을 변경합니다).

알겠어요. 많은 용어가 있네요. 여기서는 이 내용을 더 잘 설명한 htmx 웹페이지에서 확인할 수 있습니다. 이제 /get-info 경로를 처리하는 새 엔드포인트 핸들러를 생성하여 계속 진행해 보겠습니다:

```js
e.GET("/get-info", func(c echo.Context) error {
    res := map[string]interface{}{
        "Name": "Wyndham",
        "Phone": "8888888",
        "Email": "skyscraper@gmail.com",
    }
    return c.Render(http.StatusOK, "name_card", res)
})
```

이는 거의 /hello와 동일하지만 두 가지 주요 차이점이 있습니다:

<div class="content-ad"></div>

- 경로를 명확하게 /get-info로 변경해주세요.
- 대상 템플릿을 name_card로 변경해주세요.

하지만! name_card는 유효한 HTML 파일이 아니었나요? doctype도 없고 헤더도 없죠. 맞아요, 맞습니다. 하지만 이것은 HTMX가 동작하는 방식입니다. 전체 페이지를 교체하지 않고 우리가 index.html에서 지정한 user-info 요소만 교체할 거예요.

그럼, 더 이상 말을 더하지않고 서버를 실행해서 무슨 일이 일어났는지 봅시다:

와우! 제작품이 동작합니다! 이제 HTMX가 Go 템플릿과 잘 동작한다는 것을 알게 되었으니, 드디어 블로깅 사이트를 작업할 수 있겠네요. 그러나 불행히도 이 기사에서는 다루지 않을 거예요. 하지만 곧 돌아올 테니까, 그렇게 길지 않겠죠!

<div class="content-ad"></div>

# 결론

이 블로그를 읽어 주셔서 감사합니다. 여기서 중요한 점은 Go 템플릿을 사용하기 매우 유연하며, 이 작은 범위에서 HTMX와도 잘 작동한다는 것입니다. 다음 블로그에서는 기본 CRUD를 생성하여 DB에 기사를 저장하고 브라우저에서 액세스할 것입니다.

조금 스포일러를 하자면: 거기에 많이 HTMX를 사용하지는 않을 것이고, 그 다음 시점에도 그 후에도 마찬가지입니다. 게시 물 웹사이트에서는 HTMX가 많이 필요하지 않다는 것이 확인되었습니다. 놀랍죠. 그러나 페이지네이션, 검색, 실시간 Markdown 렌더러를 만드는 부분에 도달하면 HTMX를 적극 활용할 것입니다.

그러니 기대해 주세요! 읽어 주셔서 감사합니다!

<div class="content-ad"></div>

수정되었습니다! 두 번째 부분이 나왔어요! 다음 링크에서 읽을 수 있어요:

[https://medium.com/gravel-engineering/personal-blog-with-htmx-go-part-2-integrating-tailwindcss-412ebc4dcc97](https://medium.com/gravel-engineering/personal-blog-with-htmx-go-part-2-integrating-tailwindcss-412ebc4dcc97)