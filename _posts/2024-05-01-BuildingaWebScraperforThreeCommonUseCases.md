---
title: "실무에 적용하면 퇴근시간 단축하는 웹 스크래퍼 만들기"
description: ""
coverImage: "/assets/img/2024-05-01-BuildingaWebScraperforThreeCommonUseCases_0.png"
date: 2024-05-01 23:48
ogImage:
  url: /assets/img/2024-05-01-BuildingaWebScraperforThreeCommonUseCases_0.png
tag: Tech
originalTitle: "Building a Web Scraper for Three Common Use Cases"
link: "https://medium.com/gitconnected/building-a-web-scraper-for-three-common-use-cases-7a5ffc88284f"
isUpdated: true
---

![이미지](/assets/img/2024-05-01-BuildingaWebScraperforThreeCommonUseCases_0.png)

# 동기부여

최근 지역 소매업체 웹사이트에서 새 노트북을 찾고 있었는데, 여러 페이지의 검색 결과를 통해 여러 노트북의 브랜드, 사양 및 가격을 수동으로 메모해야 했습니다(비교 목적). 이 매뉴얼한 방식에 대한 frustration을 파트너에게 털어놓자, e-커머스 웹사이트에서도 유사한 불만을 표현했습니다.

그 후, 웹 스크래퍼를 사용하여 웹사이트의 내용을 구조화된(예: 테이블 형식) 데이터로 자동 변환하는 과정을 자동화하는 것에 대한 사례를 탐구했습니다. 본 문서는 다음 세 가지 일반적인 사용 사례에 대한 웹 스크래퍼의 실제 단계별 가이드를 제공합니다:

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

- 여러 페이지에 걸쳐 검색 결과를 반환하는 웹사이트를 찾을 때 ("페이지별 검색")
- 수동으로 아래로 스크롤하여 더 많은 검색 결과를 반환하는 웹사이트를 찾을 때 ("무한 스크롤")
- 웹사이트에 호스팅된 이미지를 다운로드할 때 ("이미지 스크랩")

# 웹 스크레이핑에 대한 비 기술적 소개

사용자가 웹사이트에서 만나는 대부분의 콘텐츠는 사실 HTML 코드의 출력물입니다. 이러한 코드는 일반적으로 모든 웹사이트가 따르는 일반 규칙과 함께 컴파일됩니다. 즉, 웹사이트의 '프론트엔드'에 사용자에게 표시되는 콘텐츠는 웹사이트의 HTML 코드의 관련 레이어를 쿼리하여 저장 및 다운로드할 수 있습니다.

이 기사의 목적을 위해 사용된 웹 스크레이퍼는 주로 BeautifulSoup 및 Selenium 라이브러리를 사용하여 Python으로 개발되었습니다. 특히, BeautifulSoup 라이브러리는 웹사이트 뒤의 HTML 코드에서 데이터를 검색하고 쿼리하며 반환하는 기능을 제공하며, Selenium 라이브러리는 브라우저 자동화를 지원합니다(예: Google Chrome 또는 Firefox 브라우저에서 특정 작업 수행).

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

# 사용 사례 1: 페이지별 검색을 위한 웹 스크래퍼

이 사용 사례를 보여주기 위해 세포라 웹 사이트에서 "파운데이션"과 관련된 데이터를 스크래핑 할 것입니다 (비난하지 마세요). 다음과 같이 Python 라이브러리를 가져오는 것으로 시작할 것입니다.

```js
from bs4 import BeautifulSoup
from selenium import webdriver
import pandas as pd # 데이터를 데이터프레임에 저장하기 위해
```

그런 다음 Google Chrome을 사용하여 검색 '페이지 1'에서 관심 있는 데이터를 스크래핑하려고 시도한 다음, For-Loop를 사용하여 다른 모든 페이지에 대해이 스크래핑을 구축할 것입니다. 각각 화장품 제품의 브랜드, 설명 및 가격을 스크래핑하기 위해 웹 사이트의 HTML 코드를 파이썬 객체인 soup_sephora로 구문 분석하기 시작할 것입니다.

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
## Sephora 웹 사이트에서 "파운데이션"을 검색한 결과 페이지 1의 URL
url = "https://www.sephora.com.au/search?q=foundation&page=1"
## 아래 옵션은 Chrome이 실제로 열리는 것을 방지합니다
options = webdriver.ChromeOptions()
options.add_argument('--headless')
## chromedriver 다운로드 및 위치 지정
driver = webdriver.Chrome(
                          executable_path = r'C:\Users\Jin\Documents\Webscraping\Drivers\chromedriver.exe',
                          chrome_options = options
                           )
driver.get(url)
## HTML 코드 반환
soup_sephora = BeautifulSoup(driver.page_source, 'lxml')
```

저장된 HTML 코드 (soup_sephora 객체에 저장된)를 Microsoft Word나 메모장과 같이 검색 가능한 문서 유형에 붙여 넣는 것이 좋습니다. 이렇게 하면 관심 있는 데이터를 반환하기 위해 쿼리해야 할 속성을 식별하는 데 도움이 됩니다. 예를 들어, 페이지 1의 각 제품의 가격 속성은 HTML 구조에서 "product-price" 클래스에 저장되어 있으며, 특정 제품의 가격을 확인하기 위해 가격에 대한 "CTRL+F"를 수행하여 식별할 수 있습니다. 첫 번째 이미지에서 보이는 가격 $95의 YSL 파운데이션이 경우, 이는 두 번째 이미지에서 "product-price" 클래스 아래의 텍스트 문자열로 soup_sephora 객체에 포함되어 있으며, Microsoft Word 문서에서 "$95"를 검색하여 확인할 수 있습니다.

<img src="/assets/img/2024-05-01-BuildingaWebScraperforThreeCommonUseCases_1.png" />

<img src="/assets/img/2024-05-01-BuildingaWebScraperforThreeCommonUseCases_2.png" />

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

아래 코드는 파이썬 리스트에 페이지 1의 모든 제품의 가격을 반환합니다.

```js
soup_sephora.findAll((class_ = "product-price"));
```

위 내용을 고려하면, 검색 결과 페이지 1에 있는 모든 제품의 브랜드, 설명, 가격을 다음과 같이 판다스 데이터프레임에 저장할 수 있습니다.

```js
brand = []
description = []
price = []
url = "https://www.sephora.com.au/search?q=foundation&page=1"
options = webdriver.ChromeOptions()
options.add_argument('--headless')
driver = webdriver.Chrome(
                                 executable_path = r'C:\Users\Jin\Documents\Webscraping\Drivers\chromedriver.exe',
                                 chrome_options = options
                                )
driver.get(url)
soup_sephora = BeautifulSoup(driver.page_source, 'lxml')
i = 0
for item in soup_sephora.findAll(class_ = "product-card-brand"):
    i = i + 1
    brand.append(item.get_text(strip = True))
for item in soup_sephora.findAll(class_ = "product-card-product"):
    i = i + 1
    description.append(item.get_text(strip = True))

for item in soup_sephora.findAll(class_ = "product-price"):
    i = i + 1
    price.append(item.get_text(strip = True))
driver.close()
## 판다스 데이터프레임으로 변환
df_sephora = pd.DataFrame(
                        {'브랜드': brand,
                         '설명': description,
                         '가격': price
                        })
df_sephora.head(10)
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

위의 판다 데이터프레임의 출력은 아래 이미지에서 확인할 수 있습니다.

![이미지](/assets/img/2024-05-01-BuildingaWebScraperforThreeCommonUseCases_3.png)

'Price' 열은 할인이 적용된 제품과 관련하여 추가 정제가 필요할 수 있음을 유의해주세요.

이후 페이지를 스크랩하기 위해서는 단순히 위의 코드를 For-Loop로 감싸고 아래와 같이 url 객체를 소프트 코딩하면 됩니다 (데이터프레임으로 열을 결합하기 전에).

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
## For-Loop에 페이지 수를 지정하기
for j in range(1, 페이지 수):
    url = "https://www.sephora.com.au/search?q=foundation&page=" + str(j)
    **페이지별 크롤링 관련 코드 삽입**
             .
             .
             .
```

# 사용 사례 2: 무한 스크롤용 웹 스크레이퍼

무한 스크롤은 사용자가 페이지를 스크롤할 때 더 많은 콘텐츠를 로드하는 웹사이트 디자인으로, 페이지 이동을 클릭하지 않고 자동으로 더 많은 콘텐츠를 로드합니다. 이로 인해 Use Case 1용으로 작성된 For-Loop가 다소 유용하지 않을 수 있습니다.

그러나 무한 스크롤은 더 스크롤하는 모션을 흉내 내는 웹 스크레이퍼로 자동화할 수도 있습니다. 이를 위해 스크레이퍼에게 먼저 전체 웹페이지 길이만큼 스크롤하도록 지시하고, 컨텐츠가 로드되기를 기다린 후 몇 초 동안 기다린 후 다시 전체 페이지 길이만큼 스크롤하여 무한 스크롤의 끝에 도달한 후 HTML 코드를 Python 객체로 파싱할 수 있습니다.

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

이 사용 사례를 보여주기 위해, "가방" 검색과 관련된 Acne Studio 웹사이트에서 데이터를 스크래핑할 것입니다.

필요한 Python 라이브러리는 대부분 Use Case 1과 일치하며 다음 추가 사항이 있습니다:

```js
import time ## 대기 시간 설정에 사용
from urllib.parse import urljoin ## url을 위한 문자열 결합에 사용
```

먼저 Google Chrome을 시작하고 Use Case 1에 기반해 URL을 설정하고 "스크롤, 몇 초 대기한 후 다시 스크롤" 이동 순서를 다음과 같이 지정합니다.

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

```python
options = webdriver.ChromeOptions()
options.add_argument('--headless')
driver = webdriver.Chrome(executable_path=r'C:\Users\Jin\Documents\Webscraping\Drivers\chromedriver.exe', chrome_options=options)
url_acne = "https://www.acnestudios.com/au/en/search?q=bags"
print(url_acne)
driver.get(url_acne)
time.sleep(2)  # 웹 페이지가 열리기까지 2초 기다립니다
scroll_pause_time = 2  # 웹 페이지 로딩을 위해 2초 기다립니다

screen_height = driver.execute_script("return window.screen.height;")  # 웹의 화면 높이 가져오기
i = 1
while True:
   # 한 화면 높이씩 스크롤
   driver.execute_script("window.scrollTo(0, {screen_height}*{i});".format(screen_height=screen_height, i=i))
   i += 1
   time.sleep(scroll_pause_time)
   # 각 스크롤 후 스크롤 높이 업데이트
   scroll_height = driver.execute_script("return document.body.scrollHeight;")
   # 웹 페이지의 끝에 도달하면 루프 종료
   if (screen_height) * i > scroll_height:
       break
```

Infinite Scroll의 최하단에 도달했을 때, HTML 코드를 저장하고 Use Case 1과 동일한 방법으로 데이터를 다운로드할 수 있습니다. 이번 유스케이스에서는 각 핸드백의 설명, 가격 및 이미지 URL을 다운로드할 것입니다.

```python
description = []
price = []
url = []
soup = BeautifulSoup(driver.page_source, "html.parser")
for desc in soup.find_all(class_="product-tile__name"):

    description.append(desc.get_text(strip=True))

for desc in soup.find_all(class_="product-tile__price font--monospace"):

    price.append(desc.get_text(strip=True))

for item in soup.find_all(class_="tile__link"):

    base = "https://www.acnestudios.com/"
    link = item.attrs["href"]
    url_join = urljoin(base, link)

    url.append(url_join)
## pandas 데이터프레임으로 변환
df_acne = pd.DataFrame(
                        {
                         'Description': description,
                         'Price': price,
                         'URL': url
                        })
df_acne
```

데이터프레임 결과 샘플은 아래와 같습니다. Infinite Scroll이 없었다면 데이터프레임에는 아마 10개 정도의 기록만 포함되었을 것입니다.

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

<img src="/assets/img/2024-05-01-BuildingaWebScraperforThreeCommonUseCases_4.png" />

# 사용 사례 3: 이미지 스크래핑

이미지 스크래핑은 웹사이트에 호스팅된 이미지를 다운로드하고 로컬 컴퓨터에 체계적으로 저장하는 자동화를 의미합니다. 이는 다음과 같은 이유로 유용할 수 있습니다:

- 웹사이트에서 게시된 이미지가 나중에 제거될 수 있음
- 다운로드한 이미지는 오프라인에서 다시 확인할 수 있음 (즉, 인터넷 없이)
- 다운로드한 이미지는 더 포괄적인 방식으로 확인할 수 있음 (예: 특정 순서로 또는 명명 규칙에 따라)

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

이 사용 사례를 보여 주기 위해, MangaPark 웹 사이트에서 Manga 시리즈 아래의 모든 이미지를 스크랩하겠습니다. 개인 컴퓨터에 전체 Manga가 저장되어 있으면, 온라인에서 각 장에 대한 "다음" 버튼을 클릭하고 여러 개의 온라인 광고를 만나는 대신 Manga 페이지를 편리하게 넘길 수 있습니다.

사용 사례 1과 2와 동일한 Python 라이브러리를 사용하여, 우리는 한 장의 이미지를 스크랩하기 위해 시작하고 For-Loop를 사용하여 다른 장의 이미지까지 스크랩해가는 작업을 확장합니다. 일본 Manga 시리즈 "H2"의 첫 번째 장에서:

```js
url = "https://v2.mangapark.net/manga/h2/i294558/c1"
print(url)
options = webdriver.ChromeOptions()
options.add_argument('--headless')
driver = webdriver.Chrome(
                          executable_path = r'C:\Users\Jin\Documents\Webscraping\Drivers\chromedriver.exe',
                          chrome_options = options
                         )
driver.get(url)
soup = BeautifulSoup(driver.page_source, 'html')
## 장의 이미지 수는 다양하며, 오류 처리 덕분에
## 인덱스 오류 없이 최대 50개까지 다운로드 가능함
## 이미지는 시간순으로 H2 폴더에 저장됨
## Python 스크립트가 저장된 경로에 저장됨
try:
for i in range(50):
        urllib.request.urlretrieve(str(soup.find_all(class_ = "img")[i].attrs["src"]),
                               "H2/" + str(i) + ".jpg".format(i))
except:
    pass
```

위의 작업을 완료하면, "다음" 페이지의 URL을 찾고 위의 스크래핑을 반복하는 문제로 전환됩니다. 이 작업은 다음과 같이 수행할 수 있습니다.

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
url = "https://v2.mangapark.net/manga/h2/i294558/c1"
chapter_number = 338
for j in range(1, upper_limit + 1):

    print(url)
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    driver = webdriver.Chrome(
                              executable_path = r'C:\Users\Jin\Documents\Webscraping\Drivers\chromedriver.exe',
                              chrome_options = options
                             )
    driver.get(url)
    soup = BeautifulSoup(driver.page_source, 'html')
try:
for i in range(50):
            urllib.request.urlretrieve(str(soup.find_all(class_ = "img")[i].attrs["src"]),
                                   "H2/" + str(j) + "_" + str(i) + ".jpg".format(i))
except: ## number of pictures may vary on a webpage
        pass
## 아래는 "다음" 페이지를 위한 URL을 찾습니다.
base_url = "https://v2.mangapark.net/"
    next_page = soup.find_all("a", href = True)[12].get("href")
url = urljoin(base_url, next_page)
```

지금은 차 한 잔과 함께 H2 만화를 즐겨보세요! 정말 재미있어요.

# 결론

이 기사에서는 실행 가능한 코드로 웹 스크래핑의 세 가지 사용 사례를 소개했습니다. 이러한 사용 사례들은 쉽게 확장하여 웹사이트의 HTML 코드가 가지고 있는 추가 속성을 포함시킬 수 있습니다. 독자들이 자세히 살펴보면 됩니다!

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

다음으로, 행위 보험사/데이터 과학자 모자를 쓰고, 경쟁 업체 웹사이트의 변경 사항을 모니터링하거나 리뷰 웹사이트에서 고객의 긍정적/부정적 댓글을 스크래핑하는 등의 상업 기회를 탐색할 예정입니다. 계속 주목해주세요!
