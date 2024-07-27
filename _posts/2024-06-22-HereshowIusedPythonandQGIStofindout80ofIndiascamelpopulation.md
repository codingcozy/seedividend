---
title: "파이썬과 QGIS로 인도의 낙타 80 찾는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-HereshowIusedPythonandQGIStofindout80ofIndiascamelpopulation_0.png"
date: 2024-06-22 02:56
ogImage: 
  url: /assets/img/2024-06-22-HereshowIusedPythonandQGIStofindout80ofIndiascamelpopulation_0.png
tag: Tech
originalTitle: "Here’s how I used Python and QGIS to find out 80% of India’s camel population."
link: "https://medium.com/@chaayushmalik/heres-how-i-used-python-and-qgis-to-find-out-80-of-india-s-camel-population-59808703d965"
---


## 파이썬 자동화

"안녕 Aayush, 내가 인도의 저소득 농촌 여성들을 위한 낙타 기반 생계 개선에 집중해야 할 곳을 알고 싶어", 라는 요구가 왔어요. 라자스탄 출신인 내 친구가 말했어요. 그녀는 라자스탄의 사막 지역이 정답일 것이라고 알고 있었지만, 직감을 뒷받침할 공식 자료가 필요했어요. 그래서 제가 나서서 이 정보를 찾기로 했어요. 

## 단계 1

인도 정부의 데이터 제공 플랫폼인 data.gov.in 에서 2019년 20번째 가축 조사 자료 시트 제2020년 승업부와 가축전문부, 수산부, 가축전문부의 자료를 찾아보세요.

<div class="content-ad"></div>

## 단계 2

개발자 도구를 사용하여 한 번에 모든 파일에 액세스할 수 있는 URL을 얻는 cURL을 얻으세요. 이렇게 하지 않았다면 각 파일을 개별적으로 클릭하여 양식을 작성하고 캡차를 입력한 다음 CSV를 수동으로 다운로드해야 했을 것입니다. 이 방법으로 제게 많은 시간을 절약했어요.

## Step 3

Postman에 URL을 게시하고 해당하는 Python 요청 코드를 가져와서 응답을 구문 분석하세요.

<div class="content-ad"></div>

## 단계 4

저는 Python을 사용하여 응답을 구문 분석하고, 이 코드를 사용하여 모든 URL 링크를 가져왔어요.

```js
from pprint import pprint
import os
import pandas as pd
import requests

url = "https://data.gov.in/backend/dmspublic/v1/resources?filters[catalog_reference]=6885101&offset=0&limit=35&sort[changed]=desc&filters[domain_visibility]=4"

payload = {}
headers = {
  'Accept': 'application/json, text/plain, */*',
  'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8,de;q=0.7',
  'Connection': 'keep-alive',
  'Cookie': 'fontSize=67.5; citrix_ns_id=AAA7TRx1ZjuD0ksAAAAAADuMGtjGAxHPGX4gOzVglnj-t-2_KYp3QS5pOwB3wsrGOw==jyF1Zg==9zCLz_Tsia4CNE6H2-pAKy8Ou1w=; citrix_ns_id=AAA7TRx1ZjuD0ksAAAAAADuMGtjGAxHPGX4gOzVglnj-t-2_KYp3QS5pOwB3wsrGOw==uiR1Zg==JTC1HaNqvL2oNi2kwWYolcsi_TU=',
  'Referer': 'https://data.gov.in/catalog/20th-livestock-census',
  'Sec-Fetch-Dest': 'empty',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Site': 'same-origin',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  'dnt': '1',
  'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"macOS"',
  'sec-gpc': '1'
}

response = requests.request("GET", url, headers=headers, data=payload)
```

```js
rjson = response.json()
rows = rjson['data']['rows']
urls = []
for row in rows:
    url = "https://"+row['datafile'][0]
    print(url)
    urls.append(url)
```

<div class="content-ad"></div>

최종 출력물은 CSV를 얻기 위해 구문 분석한 URL 목록입니다.

![이미지](/assets/img/2024-06-22-HereshowIusedPythonandQGIStofindout80ofIndiascamelpopulation_0.png)

## 단계 5

모든 파일을 다운로드하여 연결하여 최종 데이터 프레임을 얻었습니다. 그 후에는 80%의 기준점을 사용하여 낙타 인구의 80%를 보유한 지역을 파악했습니다.

<div class="content-ad"></div>

```js
save_directory = './csv_files/'

if not os.path.exists(save_directory):
    os.makedirs(save_directory)

def download_file(url, save_directory):
    try:
        response = requests.get(url)
        response.raise_for_status()  # 요청이 성공적인지 확인
        file_name = os.path.join(save_directory, url.split('/')[-1])
        with open(file_name, 'wb') as file:
            file.write(response.content)
        print(f"다운로드 완료: {file_name}")
    except requests.exceptions.RequestException as e:
        print(f"{url}을(를) 다운로드하는 데 실패했습니다: {e}")

for url in urls:
    download_file(url, save_directory)

csv_directory = save_directory

dataframes = []

all_headers = set()

for filename in os.listdir(csv_directory):
    if filename.endswith('.csv'):
        file_path = os.path.join(csv_directory, filename)
        df = pd.read_csv(file_path)
        dataframes.append(df)
        all_headers.update(df.columns)

# 모든 데이터 프레임이 동일한 헤더를 갖고 있는지 확인
headers_match = all(len(df.columns.difference(all_headers)) == 0 for df in dataframes)

if headers_match:
    combined_df = pd.concat(dataframes, ignore_index=True)
else:
    combined_df = pd.DataFrame(columns=all_headers)
    for df in dataframes:
        df = df.reindex(columns=all_headers)  # 모든 열이 존재하는지 확인
        combined_df = pd.concat([combined_df, df], ignore_index=True)

combined_csv_path = os.path.join(csv_directory, 'combined.csv')
combined_df.to_csv(combined_csv_path, index=False)

print(f"결합된 CSV가 저장되었습니다: {combined_csv_path}")
```

```js
df['camel'] = pd.to_numeric(df['camel'], errors='coerce')
df_sorted = df.sort_values(by='camel', ascending=False).reset_index(drop=True)
df_sorted['cumulative_sum'] = df_sorted['camel'].cumsum()
total_camels = df_sorted['camel'].sum()
threshold = 0.8 * total_camels
df_sorted['cumulative_percentage'] = df_sorted['cumulative_sum'] / total_camels
districts_80_percent = df_sorted[df_sorted['cumulative_percentage'] <= 0.8]
print(districts_80_percent[['state_name','district_name', 'camel', 'cumulative_sum', 'cumulative_percentage']])
```

<img src="/assets/img/2024-06-22-HereshowIusedPythonandQGIStofindout80ofIndiascamelpopulation_1.png" />

## 단계 6


<div class="content-ad"></div>

인도의 지구 행정 구역 geojson 파일을 받았어요. 이 파일을 이용하여 18개의 지구를 필터링하는 기능을 만들고, QGIS에서 이를 시각화하며 배경 레이어를 구글 위성 지도로 설정하여 최종 결과물을 얻었어요.

만약 어떤 단계에 대해 더 알고 싶다면 언제든지 저에게 문의해주세요. 이것은 공개 데이터를 활용하여 결정을 내리는 데 있어 있는 가능성 중 하나의 작은 예시에 불과해요. 즐기세요!