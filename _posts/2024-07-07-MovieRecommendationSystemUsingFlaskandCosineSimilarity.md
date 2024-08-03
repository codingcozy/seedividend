---
title: "Flask와 코사인 유사도를 이용한 영화 추천 시스템 만들기"
description: ""
coverImage: "/assets/img/2024-07-07-MovieRecommendationSystemUsingFlaskandCosineSimilarity_0.png"
date: 2024-07-07 12:40
ogImage:
  url: /assets/img/2024-07-07-MovieRecommendationSystemUsingFlaskandCosineSimilarity_0.png
tag: Tech
originalTitle: "Movie Recommendation System Using Flask and Cosine Similarity"
link: "https://medium.com/@Mehmtcnangn/movie-recommendation-system-using-flask-and-cosine-similarity-f24eb9756ba7"
---

# 프로젝트 목적

이 프로젝트의 목표는 사용자들의 영화 선호도를 분석하여 개인화된 영화 추천을 제공하는 영화 추천 시스템을 개발하는 것입니다. 이 프로젝트는 MovieLens 데이터셋을 활용하여 사용자-영화 행렬을 생성하고 코사인 유사도 메트릭을 사용하여 비슷한 사용자를 식별합니다. Flask 프레임워크를 사용하여 개발된 웹 인터페이스를 통해 사용자는 자신의 사용자 ID를 입력함으로써 빠르고 쉽게 개인화된 영화 추천을 받을 수 있습니다. 이 시스템은 사용자가 이전에 시청하고 평가한 영화들을 기반으로 새로운 영화를 발견하는 데 도움을 줄 것을 목표로 합니다.

# 프로젝트에서 사용된 기술

- Python: 이 프로젝트에서 데이터 처리, 분석 및 웹 애플리케이션 개발에 사용되는 언어입니다.
- PyCharm: JetBrains에서 개발한 Python용 통합 개발 환경(IDE)입니다. 이 프로젝트에서 코드 작성, 테스트 및 관리에 PyCharm을 사용했습니다.
- Pandas: 데이터 조작 및 분석에 사용되는 Python 라이브러리입니다. 데이터를 처리하고 분석할 수 있는 데이터 구조 및 도구를 제공하여 데이터셋 작업을 용이하게 합니다.
- Scikit-learn: Python의 인기 있는 머신러닝 라이브러리입니다. 이 라이브러리에는 다양한 머신러닝 알고리즘과 도구가 포함되어 있습니다. 이 프로젝트에서 Scikit-learn은 사용자 간 유사성을 계산하는 코사인 유사도 함수를 제공했습니다.
- Flask: Python으로 웹 애플리케이션을 개발하는 데 사용되는 가벼우면서 유연한 웹 프레임워크입니다. 간단하고 확장 가능한 구조로 인해 작고 중간 규모의 웹 프로젝트에 이상적입니다. 이 프로젝트에서 Flask는 사용자 인터페이스를 만들고 영화 추천을 제공하기 위해 사용되었습니다.
- HTML 및 CSS: HTML(HyperText Markup Language)은 웹 페이지 구조를 만드는 데 사용되는 마크업 언어입니다. CSS(Cascading Style Sheets)는 HTML로 만든 페이지의 외관과 레이아웃을 제어하는 데 사용됩니다. 이 프로젝트에서 HTML과 CSS는 사용자가 상호 작용하는 웹 인터페이스를 만드는 데 사용되었습니다.
- Jinja2: Flask에서 사용되는 템플릿 엔진입니다. Jinja2는 HTML 파일 내에 Python 코드를 포함하고 동적 콘텐츠 생성을 가능케 합니다. 이 프로젝트에서 Jinja2는 Flask 애플리케이션의 템플릿을 생성하고 추천 영화를 동적으로 표시하는 데 사용되었습니다.
- Requests: Python에서 HTTP 요청을 만드는 데 사용되는 인기 라이브러리입니다. 이 프로젝트에서 Requests는 데이터셋을 다운로드하는 데 사용되었습니다.
- Zipfile: Python의 모듈로 zip 파일을 다루는 데 사용됩니다. 이 프로젝트에서는 다운로드한 데이터셋 zip 파일을 추출하는 데 사용되었습니다.

<div class="content-ad"></div>

# 프로젝트 사용 방법

- 데이터셋 다운로드 및 로딩: Requests와 Zipfile을 사용하여 데이터셋을 다운로드하고 압축을 푼 후, Pandas로 CSV 파일을 읽었습니다.
- 데이터 처리 및 분석: Pandas로 데이터셋을 처리하고 사용자-영화 매트릭스를 생성했습니다. Scikit-learn을 사용하여 코사인 유사도를 계산했습니다.
- 웹 애플리케이션 개발: Flask로 웹 인터페이스를 생성했습니다. HTML, CSS, Jinja2를 사용하여 사용자 친화적 인터페이스를 디자인했습니다.
- IDE 사용: 프로젝트 개발 중에 코드 작성, 디버깅, 버전 관리를 위해 PyCharm을 사용했습니다.

이러한 기술과 도구들은 프로젝트의 성공적인 개발과 관리를 보장했습니다.

프로젝트의 코드와 파일은 제 Github 링크에서 확인할 수 있습니다.

<div class="content-ad"></div>

# 프로젝트 설명

먼저, app.py라는 이름의 Python 파일을 만들고 프로젝트에서 사용할 라이브러리를 가져와주세요. 그런 다음, Flask 애플리케이션을 시작해봅시다:

![Flask 애플리케이션](/assets/img/2024-07-07-MovieRecommendationSystemUsingFlaskandCosineSimilarity_0.png)

download_and_extract_data라는 함수를 작성하여 데이터 세트를 다운로드하고 압축 해제해봅시다. Pandas를 사용하여 다운로드한 데이터를 ratings.csv 및 movies.csv 파일로 읽어봅시다.

<div class="content-ad"></div>

아래는 복사된 테이블입니다.이제 해당 평균평점을 영화 데이터셋에 `avg_rating` 열로 추가하세요:

<img src="/assets/img/2024-07-07-MovieRecommendationSystemUsingFlaskandCosineSimilarity_2.png" />

이제 함수를 사용할 행렬을 생성해보죠. 행 인덱스로 `userId`, 열로 `movieId`, 값으로 `rating`을 사용하여 각 사용자가 각 영화에 부여한 평점을 추가하세요. 마지막으로, 널 값은 `0`으로 대체하는 함수를 사용하세요:

<div class="content-ad"></div>

Markdown 포맷에 맞게 테이블 태그를 변경해주세요.

![이미지](/assets/img/2024-07-07-MovieRecommendationSystemUsingFlaskandCosineSimilarity_3.png)

사용자 유사도를 계산하기 위해 코사인 유사도를 계산하세요. 코사인 유사도는 두 사용자 사이의 각도 유사성을 측정합니다. 유사한 사용자 사이의 각도가 작고 유사성 값은 1에 가깝습니다. 계산된 유사도 행렬을 판다스 데이터프레임으로 변환하세요. 행과 열을 사용자 ID로 색인화하세요:

![이미지](/assets/img/2024-07-07-MovieRecommendationSystemUsingFlaskandCosineSimilarity_4.png)

유사한 사용자를 찾는 함수를 작성하세요. 특정 사용자에 대해 유사성 값을 가져와 내림차순으로 정렬하세요. 가장 높은 유사도 값을 가진 상위 num_users (기본값 5) 사용자를 선택하고 반환하세요:

<div class="content-ad"></div>

<img src="/assets/img/2024-07-07-MovieRecommendationSystemUsingFlaskandCosineSimilarity_5.png" />

이제 영화 추천 기능을 작성하세요. 먼저 사용자 ID와 유사한 사용자들의 등급 행렬을 가져옵니다. 그런 다음, 유사한 사용자들로부터 각 영화의 평균 등급을 계산합니다.

대상 사용자의 등급 행렬을 가져와 대상 사용자가 아직 평가하지 않은 영화에 대한 유사한 사용자들의 평균 등급을 얻습니다. 여기서 '0'으로 null 값을 대체하는 단계가 유용할 것입니다.

추천 영화를 유사한 평점에서 가장 높은 것부터 낮은 것 순으로 정렬하고, 상위 num_recommendations (기본값 5) 개의 영화를 선택합니다. 추천 영화 ID와 평균 평점을 반환하세요:

<div class="content-ad"></div>

이제 사용할 HTML 부분을 준비하세요. 먼저 데코레이터를 작성하고 홈페이지에서 `GET` 및 `POST` 요청을 처리하는 `index` 함수를 정의하세요.

그런 다음, 오류 메시지 (error_message = None)와 사용자 ID (user_id = None)를 저장하고 처음에는 None으로 설정하세요. 추천 영화를 저장할 빈 pandas DataFrame을 만드세요 (recommended_movies = pd.DataFrame()):

<img src="/assets/img/2024-07-07-MovieRecommendationSystemUsingFlaskandCosineSimilarity_7.png" />

<div class="content-ad"></div>

**GET**과 **POST** 방식을 다루기 위해 if-else를 사용해 봅시다. 만약 요청이 **POST** 방식일 경우, 코드는 이 블록 내에서 실행됩니다. 사용자로부터 데이터를 받아 **user_id**를 정수로 변환하세요. 만약 사용자 ID가 사용자-영화 매트릭스에 없다면, 오류 메시지를 설정하세요:

![image](/assets/img/2024-07-07-MovieRecommendationSystemUsingFlaskandCosineSimilarity_8.png)

만약 사용자 ID가 유효하다면, **recommend_movies** 함수를 호출하여 영화 추천을 받으세요. 추천된 영화를 가져오고 새로운 데이터프레임을 생성하세요. **round(2)**를 사용하여 평균 평점을 소수 둘째 자리까지 반올림하세요. 그런 다음, 제목과 평균 평점 열을 가지고 추천된 영화를 평균 평점을 기준으로 내림차순으로 정렬하세요:

![image](/assets/img/2024-07-07-MovieRecommendationSystemUsingFlaskandCosineSimilarity_9.png)

<div class="content-ad"></div>

만약 사용자의 ID가 정수로 변환되지 않는다면(올바르지 않은 입력), 이 블록이 실행됩니다. "유효한 사용자 ID를 입력하세요."라는 오류 메시지가 설정됩니다.

마지막 단계로 index.html 템플릿을 렌더링하고 템플릿에 필요한 변수들을 전달하세요(movies=recommended_movies.to_dict(orient=`records`), user_id=user_id, 그리고 error_message=error_message):

![이미지](/assets/img/2024-07-07-MovieRecommendationSystemUsingFlaskandCosineSimilarity_10.png)

마지막으로, Flask 애플리케이션을 직접 실행하세요(app.run(debug=True)). 이렇게 하면 로컬 웹 서버가 실행됩니다. 애플리케이션이 실행 중일 때 변경 사항이 감지되면 서버가 다시 시작됩니다.

<div class="content-ad"></div>

![이미지](/assets/img/2024-07-07-MovieRecommendationSystemUsingFlaskandCosineSimilarity_11.png)

이제 웹사이트 인터페이스를 완성하기 위해 index.html 파일을 작성해 봅시다. 먼저 templates라는 폴더를 만들고, 그 안에 index.html이라는 HTML 파일을 생성하세요. 문서를 만들면 자동으로 문서의 표준과 언어가 표시됩니다.

이제 head와 body 부분을 채워넣을 준비가 되었습니다:

![이미지](/assets/img/2024-07-07-MovieRecommendationSystemUsingFlaskandCosineSimilarity_12.png)

<div class="content-ad"></div>

- `meta charset="UTF-8"`은 문서의 문자 집합을 UTF-8로 설정합니다.
- `meta name="viewport" content="width=device-width, initial-scale=1.0"`은 페이지가 모바일 장치에서 올바르게 표시되도록 합니다.
- `title`Movie Recommendation System`/title`은 브라우저 탭에 표시되는 페이지 제목을 설정합니다.
- `link rel="stylesheet" href="'' url_for(`static`, filename=`styles.css`) ''"`: 외부 스타일시트(CSS)를 템플릿에 연결합니다. url_for 함수를 사용하여 Flask가 정적 파일에 대한 올바른 URL을 생성하도록 합니다.
- `link rel="icon" href="'' url_for(`static`, filename=`favicon.ico`) ''" type="image/x-icon"`: 파비콘(브라우저 탭에 표시되는 작은 아이콘)을 연결합니다.

이미지, 비디오, 오디오, GIF 등의 파일을 추가하고 CSS를 사용하여 더 세련된 레이아웃을 만들려면 템플릿과 app.py 옆에 static이라는 폴더를 만들어 보세요. static 폴더에 favicon.ico 및 CSS 파일과 같은 파일을 추가합니다.

이제 본문을 채워볼까요?

<img src="/assets/img/2024-07-07-MovieRecommendationSystemUsingFlaskandCosineSimilarity_13.png" />

<div class="content-ad"></div>

- `div class="container"`은 콘텐츠를 컨테이너로 감싸줍니다. 스타일 시트에서 이 컨테이너를 위한 특별한 스타일을 정의할 수 있어요.
- `h1`Movie Recommendation System`/h1`은 페이지의 주요 제목을 정의합니다.
- `form method="POST"`는 사용자가 사용자 ID를 입력할 폼을 정의합니다. 폼을 제출할 때 데이터가 POST 방식으로 전송됩니다.
- `label for="user_id"`Enter User ID:`/label`은 입력 필드에 대한 레이블을 만듭니다.
- `input type="number" id="user_id" name="user_id" required`는 사용자 ID를 입력할 수 있는 숫자형 입력 필드를 제공해요. required 속성은 이 필드가 비워져 있지 않도록 합니다.
- `button type="submit"`Get Advice`/button`은 폼을 제출하는 버튼을 생성합니다.
- '% if error_message %'는 error_message 변수가 정의되어 있고 비어 있지 않으면 오류 메시지를 표시해요. `div class="error-message"`'' error_message ''`/div`는 화면에 오류 메시지를 표시합니다.
- '% if user_id and not error_message %'는 user_id가 정의되어 있고 오류 메시지가 없을 때 사용자에게 추천할 영화를 나열해요. `h2`Recommended Movies for User '' user_id ''`/h2` 부분은 사용자에게 추천된 영화의 제목을 표시합니다.
- `ul`은 추천된 영화를 나열하는 목록을 만듭니다.
- '% for movie in movies %'은 영화 리스트 내의 각 영화를 순회합니다.
- `li`'' movie[`title`] '' `span`('' movie[`avg_rating`] '' Average Point)` /span``/li `는 영화의 제목과 평균 평점을 리스트 아이템으로 표시합니다.

우리의 index.html 파일이 준비되었어요. 이제 남은 것은 styles.css 파일뿐이에요. 이 파일에서 더 동적인 스타일을 사용하여 웹사이트를 emb티파이합니다. 나는 배경용 이미지를 추가해두었습니다. 각 섹션을 간략하게 요약하겠습니다:

<img src="/assets/img/2024-07-07-MovieRecommendationSystemUsingFlaskandCosineSimilarity_14.png" />

body 부분은 페이지의 일반적인 스타일을 정의합니다. 폰트, 배경 색 및 이미지, 텍스트 색상 및 줄 간격을 설정합니다.

<div class="content-ad"></div>

![이미지](/assets/img/2024-07-07-MovieRecommendationSystemUsingFlaskandCosineSimilarity_15.png)

컨테이너 부분은 콘텐츠를 중앙 상자에 구성합니다. 상자의 너비, 최대 너비, 배경색, 그림자 및 테두리 반경을 설정합니다.

![이미지](/assets/img/2024-07-07-MovieRecommendationSystemUsingFlaskandCosineSimilarity_16.png)

h1 및 h2 부분은 제목을 스타일링합니다. 색상, 글꼴 크기, 정렬 및 여백을 설정합니다.

<div class="content-ad"></div>

![캡션](/assets/img/2024-07-07-MovieRecommendationSystemUsingFlaskandCosineSimilarity_17.png)

- form 부분은 양식을 가운데 정렬하고 세로로 배치합니다.
- label 부분은 레이블의 글꼴 크기와 하단 여백을 설정합니다.
- input 부분은 입력 필드의 안간격, 크기, 테두리 및 테두리 반지름을 설정합니다.
- button 부분은 버튼을 스타일링합니다. 배경색, 텍스트 색상, 테두리 및 테두리 반지름을 설정하며, 마우스를 올렸을 때 배경색을 변경합니다.

![캡션](/assets/img/2024-07-07-MovieRecommendationSystemUsingFlaskandCosineSimilarity_18.png)

- ul 및 li 부분은 목록 항목을 스타일링합니다. 목록 마커를 제거하고 배경색, 안간격, 테두리 반지름, 그림자를 설정합니다.
- li(홀수) 부분은 홀수 번째 목록 항목을 다른 배경색으로 설정합니다.
- li span 부분은 목록 항목 내의 텍스트의 글꼴 크기와 색상을 설정합니다.

<div class="content-ad"></div>

![image](/assets/img/2024-07-07-MovieRecommendationSystemUsingFlaskandCosineSimilarity_19.png)

The .error-message section defines color, font size, alignment, and bottom margin for error messages.

![image](/assets/img/2024-07-07-MovieRecommendationSystemUsingFlaskandCosineSimilarity_20.png)

- The @media (max-width: 768px) section specifies the styles for screens less than 768 pixels wide.
- The container section widens the box and reduces the top margin.
- The form section makes the form full width.
- The label, input, and button sections set their widths to full width and adjust the bottom margins.

<div class="content-ad"></div>

인터넷에서 쉽게 CSS 부분에 필요한 색상 코드를 찾아볼 수 있어요.

프로젝트의 최종 버전은 다음과 같습니다:

![이미지 1](/assets/img/2024-07-07-MovieRecommendationSystemUsingFlaskandCosineSimilarity_21.png)

![이미지 2](/assets/img/2024-07-07-MovieRecommendationSystemUsingFlaskandCosineSimilarity_22.png)

<div class="content-ad"></div>

# 프로젝트 평가

이 프로젝트에서는 사용자 기반 협업 필터링 방법을 사용하여 개인화된 영화 추천을 제공하는 시스템을 개발하는 데 성공했습니다. 이 프로젝트의 Flask 기반 웹 인터페이스를 통해 사용자가 쉽게 상호작용할 수 있습니다. 사용자는 시스템을 통해 자신의 ID를 입력하고 개인화된 영화 추천을 받을 수 있습니다.

더 발전된 버전을 위해 다음 주에 새로운 블로그를 공유할 예정입니다. 해당 블로그에서는 웹사이트에서 API를 통해 데이터 가져오기, 더 발전된 웹 인터페이스, 다른 머신러닝 알고리즘에 대해 다룰 것입니다.

읽어 주셔서 감사합니다. 피드백을 기다리겠습니다.
