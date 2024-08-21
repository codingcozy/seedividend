---
title: "React에서 Flask와 Jinja를 사용하여 동적 OpenGraph 태그 가져오는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-UsingFlaskandJinjatogetdynamicOpenGraphTagsinReact_0.png"
date: 2024-06-22 14:28
ogImage:
  url: /assets/img/2024-06-22-UsingFlaskandJinjatogetdynamicOpenGraphTagsinReact_0.png
tag: Tech
originalTitle: "Using Flask and Jinja to get dynamic OpenGraph Tags in React"
link: "https://medium.com/@Apantslessman/using-flask-and-jinja-to-get-dynamic-opengraph-tags-in-react-bc7de05e6732"
isUpdated: true
---

# 플라스크와 진자를 사용하는 이유

리액트는 동적이고 클라이언트 측 응용 프로그램을 구축하는 데 탁월하지만, 기본적으로는 OG 태그의 서버 측 렌더링을 지원하지 않습니다. 백엔드 API로 플라스크를 사용하면 진자 템플릿을 활용하여 이러한 태그를 서버 측에서 렌더링한 다음 리액트 애플리케이션을 제공할 수 있습니다.

# 필수 조건

시작하기 전에 다음이 설치되어 있는지 확인하세요:

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

- Python
- Flask
- React
- Node.js 그리고 npm/yarn

# Flask 설정하기

먼저, 기본 Flask 서버를 설정해 봅시다. 프로젝트용 새 디렉토리를 만들고 해당 디렉토리로 이동합니다. 그런 다음 가상 환경을 만들고 Flask를 설치합니다.

```bash
mkdir flask-react-og
cd flask-react-og
python -m venv venv
source venv/bin/activate
pip install Flask
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

친구야, Markdown 형식으로 테이블 태그를 변경해주세요.

| Change the table tag to Markdown format. |

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

이제 우리 애플리케이션의 React 부분을 설정해 봅시다. 프로젝트 디렉토리 내에서 새로운 React 앱을 초기화하세요.

```js
npx create-react-app client
cd client
```

# Jinja로 index.html 편집

React 폴더에서 index.html을 열어 `head` 요소에 아래 내용을 추가하세요:

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

# Build the React app

```js
npm run build
```

Move the build files to the static directory in your Flask project.

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
cd ..
mkdir static
cp -r client/build/* static/
```

# Flask로 React 서비스하기

React 앱을 위한 정적 파일을 서빙하고 라우팅을 처리하기 위해 app.py를 수정하세요:

```js
from flask import Flask, render_template, send_from_directory

app = Flask(__name__, static_folder='static')

@app.route('/')
def home():
    og_data = {
        "title": "당신의 React 앱",
        "description": "동적 OG 태그를 갖춘 멋진 React 어플리케이션입니다.",
        "url": "http://yourdomain.com",
        "image": "http://yourdomain.com/image.jpg"
    }
    return render_template('index.html', og_data=og_data)

@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory(app.static_folder, path)

if __name__ == '__main__':
    app.run(debug=True)
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

# 설정 테스트 중입니다

Flask 서버를 시작하세요:

```js
flask run
```

브라우저를 열고 http://localhost:5000 으로 이동하세요. 그러면 HTML 헤드에 렌더링된 OG 태그가 있는 React 애플리케이션을 볼 수 있어요.

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

# 결론

Flask, Jinja, 그리고 React를 결합하여 애플리케이션을 위해 OG 태그를 동적으로 생성할 수 있습니다. 이를 통해 소셜 미디어 플랫폼에서 공유될 때 SEO 친화적 미리보기를 동적으로 생성할 수 있습니다. 즐거운 코딩하세요!
