---
title: "초보자를 위한 Nodejs, ExpressJs 및 Ejs를 사용한 블로그 만들기 HTML  CSS 포함 가이드"
description: ""
coverImage: "/assets/img/2024-06-22-HowtobuildabloginJsNodeExpressJsEjsandHTMLCSSAsabeginner_0.png"
date: 2024-06-22 03:41
ogImage:
  url: /assets/img/2024-06-22-HowtobuildabloginJsNodeExpressJsEjsandHTMLCSSAsabeginner_0.png
tag: Tech
originalTitle: "How to build a blog in Js (Node + ExpressJs + Ejs) and (HTML + CSS ): As a beginner."
link: "https://medium.com/@faizanmumtazwork/how-to-building-a-blog-in-js-node-ejs-and-html-css-as-a-beginner-d7b130d9f5c4"
isUpdated: true
---

이 쉬운 가이드에서는 Express.js를 사용하여 간단하지만 강력한 블로그 애플리케이션을 구축하는 과정을 안내하겠습니다. Express.js는 Node.js를 위한 빠르고 유연하며 가벼운 웹 프레임워크입니다. 이 자습서를 마치면 자신만의 맞춤형 블로그 플랫폼을 만들 수 있는 모든 지식을 습득할 것입니다. 블로그 게시물을 쉽게 추가, 편집 및 삭제할 수 있을 것입니다.

이 자습서를 통해 다음과 같은 주요 주제를 다룰 것입니다:

- 환경 설정: 우리는 Node.js를 설치하고 새 Express.js 프로젝트를 초기화함으로써 시작할 것입니다. 프로젝트 디렉토리를 구성하고 필요한 종속성을 설치하는 방법을 배울 것입니다.
- 우리가 구현한 기능은 다음과 같습니다: 사용자는 블로그를 작성하고 게시할 수 있으며, 모든 블로그 목록을 볼 수 있으며, 긴 글을 위한 개별 블로그 세부 정보에 액세스할 수 있으며, 더 이상 필요하지 않은 블로그를 삭제하고, 기존 블로그 게시물을 편집할 수 있습니다.
- 사용자 인터페이스 개선: 잘 디자인된 사용자 인터페이스는 사용자 경험을 크게 향상시킬 수 있습니다. HTML, CSS 및 EJS(Embedded JavaScript) 템플릿을 사용하여 블로그 애플리케이션용 깔끔하고 직관적인 인터페이스를 만들 것입니다.

# 환경 설정:

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

먼저 공식 웹 사이트에서 Node.js를 다운로드한 다음 프로젝트 폴더를 만듭니다. 다음으로 Visual Studio Code에서 해당 폴더를 열고 npm을 초기화합니다. 그런 다음 다음 명령을 실행하여 필요한 종속성을 설치합니다:

npm 초기화:

```js
npm init
```

공식 Express.js 웹 사이트에서 Express.js를 다운로드합니다.

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
npm i express
```

우선 index.js 파일을 생성하고 Express 서버를 설정하세요. Express를 불러오고, 이 파일 내에서 라우트를 정의하세요. 그런 다음, 주 라우트에 대한 라우트 핸들러를 작성하세요.

```js
import express from "express";
const app = express();
const port = 3000;

// 주 라우트 설정
app.get("/", (req, res) => {
  res.send("Hello World");
});

// 서버 시작
app.listen(port, () => {
  console.log(`포트 ${port}에서 Listening 중`);
});
```

![이미지](/assets/img/2024-06-22-HowtobuildabloginJsNodeExpressJsEjsandHTMLCSSAsabeginner_0.png)

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

그 다음으로 템플릿으로 EJS를 다운로드합니다. EJS는 Embedded JavaScript의 준말로, Node.js 및 웹 개발 모두에 적합한 템플릿 엔진입니다. HTML 템플릿에 JavaScript 코드를 직접 통합하여 동적 HTML 콘텐츠를 생성할 수 있습니다.

# 다음은 우리가 구현한 기능 및 사용자 인터페이스 개선사항이 있습니다:

다음은 우리 애플리케이션에서 제공하는 중요한 기능들입니다:

- 블로그 게시물 생성: 사용자는 쉽고 유용한 블로그 게시물을 선호에 맞게 생성할 수 있습니다.
- 블로그 게시물 목록 보기: 사용자는 편리한 목록보기를 통해 모든 블로그 게시물을 효율적으로 검색할 수 있습니다.
- 개별 블로그 게시물 보기: 사용자들은 특정 블로그 게시물에 깊이 파고들어 자세히 읽고 분석할 수 있습니다.
- 편집 기능: 사용자들은 블로그 게시물을 편집할 수 있는 능력이 있어 콘텐츠가 최신 및 관련성을 유지할 수 있습니다.
- 삭제 기능: 사용자들은 필요에 따라 블로그 게시물을 쉽게 삭제할 수 있어 콘텐츠를 관리하고 깔끔한 경험을 유지할 수 있습니다.

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

다음으로, 메인 페이지용 index.ejs 파일을 생성하고 그 안에 HTML 코드를 작성할 것입니다. 또한 헤더, 푸터, styles.css와 같은 정적 파일을 위해 public 폴더를 생성할 것입니다. 이 폴더 안에 header.ejs, footer.ejs, 그리고 styles.css 파일을 만들 것입니다.

```js
//index.ejs
  <main>
    <%- include('public/partials/header.ejs') %>

    <h1 class="title">블로그 앱에 오신 것을 환영합니다</h1>
    <div class="form-container">
      <p class="form-text">블로그를 편집하세요</p>
      <p class="form-text">블로그를 생성하기 위한 양식을 작성하세요</p>
      <form
        action="/home"
        method="post"
      >
        <label for="bTitle">블로그 제목</label>
        <input
          type="text"
          id="bTitle"
          name="blogTitle"
          placeholder="여기에 제목을 입력하세요..."
          required
        />

        <label for="bDes">블로그 설명</label>
        <textarea
          type="text"
          id="bDes"
          name="blogDes"
          placeholder="여기에 블로그 내용을 입력하세요..."
          rows="6"
          required
        >
        </textarea>
        <input
          type="submit"
          value="게시"
        />
      </form>
    </div>
    <%- include('public/partials/footer.ejs') %>
  </main>
```

```js
//header.ejs
<header class="site-header">
  <div class="site-identity">
    <h1>
      <a href="#">블로그 앱</a>
    </h1>
  </div>
  <nav class="site-navigation">
    <ul class="nav">
      <li>
        <a href="/">블로그 만들기</a>
      </li>
      <li>
        <a href="/home">모든 블로그 보기</a>
      </li>
    </ul>
  </nav>
</header>
```

```js
//footer.ejs
<footer class="site-footer">
    <div class="site-identity">
      <p><a href="#">&copy;
        <%= new Date().getFullYear() %></a> Made With ❤️ | All Right Reserved</p>
    </div>
  </footer>
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

위의 내용은 Express.js와 EJS 템플릿을 사용하여 블로그 애플리케이션을 위한 간단한 웹 페이지 구조를 나타냅니다.

index.ejs에는 새 블로그 포스트를 작성하는 양식이 포함되어 있습니다.

header.ejs에는 내비게이션 링크가 포함된 헤더 섹션이 있습니다.

footer.ejs에는 저작권 정보가 포함된 푸터 섹션이 있습니다.

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

포함 함수는 index.ejs 내에 header.ejs 및 footer.ejs 내용을 포함하여 페이지 간 일관성을 유지하는 데 사용됩니다.

다음으로, EJS 템플릿 렌더링에 필요한 경로를 정의할 것입니다. Node.js dirname을 사용하여 디렉토리에 액세스할 것입니다. 우리 애플리케이션에 필요한 모든 경로를 설정하는 방법을 알려드릴게요.

```js
const __dirname = dirname(fileURLToPath(import.meta.url));
const indexPath = join(__dirname, "index.ejs");
const homePath = join(__dirname, "views/home.ejs");
const blogDetailsPath = join(__dirname, "views/blogDetails.ejs");

// index 페이지 렌더링
app.get("/", (req, res) => {
  res.render(indexPath);
});
```

이 코드는 다양한 EJS 템플릿을 위한 파일 경로를 정의하고 루트("/") 엔드포인트로 GET 요청이 발생할 때 index.ejs 템플릿을 렌더링하기 위한 라우트를 설정합니다.

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

다음으로, Body Parser를 다운로드하세요. 이는 HTTP 요청 본문에서 JSON, 텍스트, URL 인코딩 및 Raw 데이터 세트를 구문 분석하기 위한 네 가지 Express 미들웨어를 제공합니다. 이러한 미들웨어 루틴은 대상 컨트롤러에 도달하기 전에 들어오는 요청을 처리합니다.

```js
npm i body-parser
```

다음으로, index.js 파일에 새 블로그를 만드는 POST 요청 코드를 작성해 보세요. 그리고 views라는 새 폴더를 만들어주세요. 이 폴더 안에 blogList.ejs라는 파일을 만들어서 만든 블로그 목록을 표시해보세요. 사용자 입력 값을 캡처하고 "bloglist" 페이지에 렌더링하는 로직을 구현하세요.

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
// 블로그 목록 초기화
let blogList = [];
// 포스트 요청
app.post("/home", (req, res) => {
  const blogTitle = req.body.blogTitle;
  const blogDescription = req.body.blogDes;
  blogList.push({
    id: generateID(),
    title: blogTitle,
    description: blogDescription,
  });
  res.render(homePath, {
    blogList: blogList,
  });
});
// 랜덤 ID를 생성하는 함수
function generateID() {
  return Math.floor(Math.random() * 10000);
}
```

이 코드는 "/home"로의 POST 요청을 관리하여 요청 본문에서 블로그 제목과 설명을 추출하고, 무작위로 생성된 ID와 함께 blogList 배열에 추가한 후, 업데이트된 blogList 데이터로 "homePath" 템플릿을 렌더링합니다. 또한 각 블로그 게시물에 대한 랜덤 ID를 생성하기 위한 generateID() 함수를 포함하고 있습니다.

```js
<main>
    <%- include('../public/partials/header.ejs') %>
        <% if (blogList.length < 1) { %>
            <h1 class="no-blog-title">
                아직 블로그가 없습니다. 새로운 블로그를 만들려면 <br />홈 페이지를 방문하세요.
            </h1>
            <% } else { %>
                <h1 class="title">당신의 블로그 목록</h1>
            <% } %>

            <div class="overflow-div">
                <div class="home-container">
                    <% for (let index=0; index < blogList.length; index++) { %>
                        <div class="blog-card">
                            <span class="blog-number">
                                <%= index + 1 %>
                            </span>
                            <h4>
                                <%= blogList[index].title %>
                            </h4>
                            <p>
                                <%= blogList[index].description?.slice(0, 300) %>
                                <% if (blogList[index].description?.length > 299) { %> ...
                                    <a class="view-btn" href="/blogDetails/<%= blogList[index].id %>">
                                        View Blog</a>
                                <% } %>
                            </p>
                            <div class="btn-wrapper">
                                <form action="/delete/<%= blogList[index].id %>" method="post">
                                    <button class="delete-btn">Delete</button>
                                </form>
                                <a class="edit-btn" href="/edit/<%= blogList[index].id %>">edit</a>
                            </div>
                        </div>
                    <% } %>
                </div>
            </div>

        <%- include('../public/partials/footer.ejs') %>
</main>
```

위 코드는 EJS 템플릿을 사용하여 블로그 애플리케이션의 프론트 엔드 구조를 나타냅니다. BlogList 페이지 (blogList.ejs), 헤더 (header.ejs), 푸터 (footer.ejs) 파일이 포함되어 있습니다. 이 페이지는 JavaScript의 반복 메커니즘을 활용하여 각 블로그 항목을 반복하고 표시합니다.

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

아래는 Markdown 형식으로 변경한 표입니다.

![How to build a login in Js, Node, ExpressJs, Ejs and HTML/CSS As a beginner](/assets/img/2024-06-22-HowtobuildabloginJsNodeExpressJsEjsandHTMLCSSAsabeginner_2.png)

그 다음으로, 사용자가 각 블로그 게시물의 전체 내용을 볼 수 있는 새로운 블로그 상세 파일을 생성할 것입니다. Express 라우팅을 사용하여 "View Blog" 링크를 클릭하여 각 특정 블로그 게시물을 볼 수 있도록 동적 경로를 구현할 것입니다. viewBlogDetails.ejs 파일을 생성하고 필요한 로직을 구현할 것입니다.

```js
// 블로그 상세 페이지 렌더링
app.get("/blogDetails/:id", (req, res) => {
  const blogId = req.params.id;
  const blogDetails = blogList.find((blog) => blog.id === parseInt(blogId));
  res.render(blogDetailsPath, {
    blogDetails: blogDetails,
  });
});
```

<%- include('../public/partials/header.ejs') %>

<div class="container">
  <div class="viewBlog-header">
    <h1 class="title text-left"><%= blogDetails?.title %></h1>

    <a href="/edit/<%=blogDetails.id  %>" class="edit-btn">Edit</a>

  </div>
  <div class="overflow-div">
    <p><%= blogDetails?.description %></p>
  </div>
</div>

<%- include('../public/partials/footer.ejs') %>

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

위의 코드는 지정된 블로그 ID를 기반으로 블로그 세부 페이지를 렌더링하는 라우트를 설정합니다. 요청 매개변수에서 ID를 추출하고 blogList 배열에서 해당 블로그 세부 정보를 찾습니다. 그런 다음 검색된 세부 정보를 사용하여 blogDetails.ejs 템플릿을 렌더링합니다.

![이미지](/assets/img/2024-06-22-HowtobuildabloginJsNodeExpressJsEjsandHTMLCSSAsabeginner_3.png)

다음으로, 블로그 게시물을 편집하는 기능을 만들어보겠습니다. 이를 통해 사용자가 블로그 게시물을 편집할 수 있습니다.

```js
// 블로그 업데이트
app.post("/edit/:id", (req, res) => {
  const blogId = req.params.id;
  const editBlog = blogList.findIndex((blog) => blog.id === parseInt(blogId));
  if (editBlog === -1) {
    res.send("<h1> 뭔가 잘못되었습니다 </h1>");
  }
  const updatedTitle = req.body.blogTitle;
  const updatedDescription = req.body.blogDes;

  const blogTitle = (blogList[editBlog].title = updatedTitle);
  const blogDescription = (blogList[editBlog].description = updatedDescription);
  [...blogList, { blogTitle: blogTitle, blogDescription: blogDescription }];

  res.render(homePath, {
    isEdit: true,
    blogList: blogList,
  });
});
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

이 Express.js 코드는 블로그 글을 편집하는 작업을 수행합니다. /edit/123(여기서 123은 글 ID입니다)와 같은 URL로의 POST 요청을 수신 대기합니다. ID를 추출하고 해당 글을 찾아 업데이트를 검색합니다. 데이터 문제를 피하기 위해 업데이트가 적용된 새로운 객체를 생성하고(원래 ID 포함) 기존 글을 새 글로 대체합니다. 선택적으로 업데이트된 목록이 있는 페이지를 렌더링할 수 있습니다.

이제 블로그 삭제 기능을 구현해 봅시다.

```js
app.post("/delete/:id", (req, res) => {
  const blogId = req.params.id;
  blogList = blogList.filter((blog) => blog.id !== parseInt(blogId));
  res.send('<script>alert("Blog deleted successfully"); window.location="/home";</script>');
  res.redirect("/home");
});
```

이 코드는 블로그 글을 삭제하는 라우트를 정의합니다. 요청 URL에서 글 ID를 추출하고 메모리에 있는 블로그 목록을 필터링하여 해당 글을 제거합니다. 응답에는 알림 메시지를 보내거나 사용자를 홈페이지로 두 번 리디렉션하는 기법들이 섞여 있습니다. 이 방식은 제한사항이 있습니다. 서버 재시작 시 데이터가 손실되고 응답 방법이 충돌할 수 있습니다. 더 견고한 솔루션을 찾으려면 데이터베이스 사용 및 프레젠테이션 로직을 서버 측 코드에서 분리하는 것이 권장됩니다.

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

# 마무리

이 가이드를 통해 Node.js, Express.js, EJS, HTML, 그리고 CSS를 사용하여 간단한 블로그 애플리케이션을 구축하는 과정을 안내해 드렸습니다. 환경을 설정하는 방법, 라우트를 생성하는 방법, 사용자 입력을 처리하는 방법, EJS 템플릿을 사용하여 동적 콘텐츠를 렌더링하는 방법, 블로그 글 생성, 조회, 편집, 삭제와 같은 기본 기능을 구현하는 방법을 배우셨습니다. 이는 기능적인 출발점이지만, 중요한 점은 배열과 같은 인메모리 데이터 저장소를 사용하면 서버 재시작 시 데이터 손실이 발생한다는 것입니다. 더 견고한 솔루션을 위해 영구 저장을 위해 데이터베이스를 사용하고 표현 로직을 서버측 코드와 분리하는 것이 중요합니다. 이렇게 하면 블로그 애플리케이션이 더 신뢰할 수 있고 확장 가능해집니다.

건배: 이 프로젝트의 코드는 여기에서 찾을 수 있습니다: Github-Blog-App
