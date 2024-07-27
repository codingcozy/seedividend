---
title: "궁극의 파이썬 치트 시트 일상적인 작업을 위한 실용적인 파이썬 사용법"
description: ""
coverImage: "/TIL/assets/img/2024-07-07-UltimatePythonCheatSheetPracticalPythonForEverydayTasks_0.png"
date: 2024-07-07 21:34
ogImage:
  url: /assets/img/2024-07-07-UltimatePythonCheatSheetPracticalPythonForEverydayTasks_0.png
tag: Tech
originalTitle: "Ultimate Python Cheat Sheet: Practical Python For Everyday Tasks"
link: "https://medium.com/stackademic/ultimate-python-cheat-sheet-practical-python-for-everyday-tasks-c267c1394ee8"
---

<img src="/TIL/assets/img/2024-07-07-UltimatePythonCheatSheetPracticalPythonForEverydayTasks_0.png" />

(다른 내 궁극적인 안내서)

이 치트 시트는 필요에 의해 탄생했습니다. 최근에 언어를 약간 떨어뜨린 후 새로운 Python 프로젝트에 뛰어 들어가야 했기 때문입니다.

Python의 실용적인 구문과 형식을 항상 감사히 여겼습니다. 하지만 Node/Typescript 영역에서 시간을 보내다보니, Python의 최신 기능, 최고의 실천 방법 및 가장 영향적인 도구에 대한 빠른 복습이 필요했습니다. 나는 세부 사항에 얽매이지 않고 빠르게 속도를 내야 했고, 자주 사용해야 하는 작업 및 기능을 참조할 수 있도록 이 목록을 작성했습니다. 본질적으로, 프로그래밍 요구 사항의 80%를 다루는 Python의 중요한 20%를 이해하는 것이 필요했습니다.

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

이 가이드는 그 여정의 결말입니다. 그동안 만난 가장 실용적인 Python 지식, 통찰력 및 유용한 라이브러리의 모음을 제공합니다. 이것은 가장 가치 있게 여겼던 학습을 공유하기 위해 디자인되었습니다. 여러분의 프로젝트와 과제에 즉시 적용할 수 있는 방식으로 제시됩니다.

저는 일반적으로 함께 작동하는 논리적인 영역으로 섹션을 나누어놨습니다. 관심 있는 영역으로 이동하여 특정 작업이나 주제와 관련된 가장 관련된 항목을 찾을 수 있습니다. 파일 작업, API 상호 작용, 스프레드시트 조작, 수학적 계산 및 목록 및 사전과 같은 데이터 구조 작업을 포함할 것입니다. 추가로, Python이 일반적으로 사용되는 도메인에서 흔히 사용되는 Python 도구상자를 향상시킬 수 있는 몇 가지 유용한 라이브러리를 강조할 것입니다.

만약 치트 시트에 포함되어야 할 내용을 빠뜨렸다고 생각한다면, 댓글에서 알려주시면 목록을 업데이트하겠습니다!

# 파일 작업하기

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

# 1. 파일 읽기

파일의 전체 내용을 읽으려면:

```python
with open('example.txt', 'r') as file:
    content = file.read()
    print(content)
```

# 2. 파일 쓰기

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

기존 내용을 덮어쓰기 위한 파일에 텍스트를 작성하는 방법:

```js
with open('example.txt', 'w') as file:
    file.write('Hello, Python!')
```

# 3. 파일에 추가

기존 파일 끝에 텍스트를 추가하는 방법:

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
with open('example.txt', 'a') as file:
    file.write('\n이 줄을 추가합니다.')
```

# 4. 리스트로 라인 읽기

파일을 라인별로 리스트에 읽어오려면:

```js
with open('example.txt', 'r') as file:
    lines = file.readlines()
    print(lines)
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

# 5. 파일의 각 라인을 반복하는 방법

파일의 각 라인을 처리하려면:

```python
with open('example.txt', 'r') as file:
    for line in file:
        print(line.strip())
```

# 6. 파일의 존재 여부 확인

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

파일 작업을 수행하기 전에 파일이 존재하는지 확인하려면:

```js
import os
if os.path.exists('example.txt'):
    print('파일이 존재합니다.')
else:
    print('파일이 존재하지 않습니다.')
```

# 7. 파일에 목록 쓰기

목록의 각 요소를 파일의 새 줄에 작성하려면:

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

lines = ['첫 번째 줄', '두 번째 줄', '세 번째 줄']
with open('example.txt', 'w') as file:
for line in lines:
file.write(f'{line}\n')

# 8. 여러 파일에 대해 With 블록 사용하기

여러 파일을 동시에 처리하려면 다음과 같이 with 블록을 사용할 수 있습니다:

with open('source.txt', 'r') as source, open('destination.txt', 'w') as destination:
content = source.read()
destination.write(content)

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

# 9. 파일 삭제하기

해당 파일이 존재할 경우 안전하게 파일을 삭제하는 방법:

```js
import os
if os.path.exists('example.txt'):
    os.remove('example.txt')
    print('파일이 삭제되었습니다.')
else:
    print('해당 파일이 존재하지 않습니다.')
```

# 10. 이진 파일 읽기 및 쓰기

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

바이너리 모드로 파일을 읽거나 쓰려면(이미지, 비디오 등에 유용함):

```js
# 바이너리 파일 읽기
with open('image.jpg', 'rb') as file:
    content = file.read()
# 바이너리 파일 쓰기
with open('copy.jpg', 'wb') as file:
    file.write(content)
```

# 간단한 HTTP API 작업

# 1. 기본 GET 요청

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

API 엔드포인트에서 GET 요청을 사용하여 데이터를 가져오는 방법:

```js
import requests
response = requests.get('https://api.example.com/data')
data = response.json()  # 응답이 JSON 형식일 경우
print(data)
```

## 2. 쿼리 매개변수를 포함한 GET 요청

쿼리 매개변수를 포함한 GET 요청을 보내려면:

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
import requests
params = {'key1': 'value1', 'key2': 'value2'}
response = requests.get('https://api.example.com/search', params=params)
data = response.json()
print(data)
```

# 3. HTTP 오류 처리하기

가능한 HTTP 오류를 공손하게 처리하기 위해:

```js
import requests
response = requests.get('https://api.example.com/data')
try:
    response.raise_for_status()  # 상태가 4xx, 5xx인 경우 HTTPError를 발생시킵니다
    data = response.json()
    print(data)
except requests.exceptions.HTTPError as err:
    print(f'HTTP 오류 발생: {err}')
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

# 4. API 요청에 대한 Timeout 설정

API 요청이 무한 대기되지 않도록 Timeout을 설정하는 방법:

```js
import requests
try:
    response = requests.get('https://api.example.com/data', timeout=5)  # Timeout은 초 단위로 설정
    data = response.json()
    print(data)
except requests.exceptions.Timeout:
    print('요청 시간이 초과되었습니다')
```

# 5. 요청에서 헤더 사용하기

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

요청에 헤더를 포함하려면 (예: 권한을 위해):

```python
import requests
headers = {'Authorization': 'Bearer YOUR_ACCESS_TOKEN'}
response = requests.get('https://api.example.com/protected', headers=headers)
data = response.json()
print(data)
```

# 6. JSON Payload을 사용한 POST 요청

JSON 페이로드를 사용하여 POST 요청을 통해 API 엔드포인트로 데이터를 전송하려면:

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
import requests
payload = {'key1': 'value1', 'key2': 'value2'}
headers = {'Content-Type': 'application/json'}
response = requests.post('https://api.example.com/submit', json=payload, headers=headers)
print(response.json())
```

# 7. 응답 인코딩 처리

올바르게 응답 인코딩을 처리하려면:

```js
import requests
response = requests.get('https://api.example.com/data')
response.encoding = 'utf-8'  # 응답 형식과 일치하도록 인코딩 설정
data = response.text
print(data)
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

# 8. 세션과 함께 Requests 사용하기

같은 호스트로 여러 요청을 보내기 위해 세션 객체를 사용하면 성능을 향상시킬 수 있어요:

```js
import requests
with requests.Session() as session:
    session.headers.update({'Authorization': 'Bearer 여러분의_액세스_토큰'})
    response = session.get('https://api.example.com/data')
    print(response.json())
```

# 9. 리디렉션 처리

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

리퀘스트에서 리디렉션을 처리하거나 비활성화하려면:

```js
import requests
response = requests.get('https://api.example.com/data', allow_redirects=False)
print(response.status_code)
```

### 10. 대용량 응답 스트리밍

대용량 응답을 처리하기 위해 모두 메모리에 로드하는 대신 청크 단위로 처리하려면:

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

```json
import requests
response = requests.get('https://api.example.com/large-data', stream=True)
for chunk in response.iter_content(chunk_size=1024):
    process(chunk)  # 실제 처리 함수로 'process'를 교체하세요
```

# 리스트 작업

# 1. 리스트 만들기

리스트를 만들려면:

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
# 신비한 요소 목록
elements = ['Earth', 'Air', 'Fire', 'Water']
```

## 2. 리스트에 추가하기

리스트 끝에 새 요소를 추가하려면:

```js
elements.append("Aether");
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

# 3. 리스트에 삽입하기

특정 위치에 요소를 삽입하려면:

```js
# 인덱스 1에 'Spirit' 삽입
elements.insert(1, 'Spirit')
```

# 4. 리스트에서 제거하기

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

리스트에서 값을 기준으로 요소를 제거하는 방법은 다음과 같아요:

```js
elements.remove('Earth')  # 'Earth'의 첫 번째 발생을 제거합니다
```

# 5. 리스트에서 요소를 뽑아내기

주어진 인덱스에서 요소를 제거하고 반환하는 방법은 다음과 같아요:

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
last_element = elements.pop()  # 마지막 요소를 제거하고 반환합니다
```

# 6. 요소의 인덱스 찾기

첫 번째 발생 요소의 인덱스를 찾으려면:

```js
index_of_air = elements.index("Air");
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

# 7. 리스트 슬라이싱

리스트를 슬라이스하여 하위 리스트를 얻으려면:

```js
# 인덱스 1부터 3까지 요소 가져오기
sub_elements = elements[1:4]
```

# 8. 리스트 컴프리헨션

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

기존 목록의 각 요소에 식을 적용하여 새 목록을 만들려면:

```js
# 각 요소의 길이로 새 목록 생성
lengths = [len(element) for element in elements]
```

9. 목록 정렬

목록을 오름차순으로 정렬하려면 (위치 기준으로):

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
elements.sort();
```

# 10. 리스트 뒤집기

리스트의 요소를 제자리에서 뒤집으려면:

```js
elements.reverse();
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

# 딕셔너리 사용하기

# 1. 딕셔너리 생성하기

새로운 딕셔너리를 만들려면:

```js
# 요소와 그들의 기호에 관한 책
elements = {'Hydrogen': 'H', 'Helium': 'He', 'Lithium': 'Li'}
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

# 2. 항목 추가 또는 업데이트

새로운 항목을 추가하거나 기존 항목을 업데이트하려면:

```js
elements['Carbon'] = 'C'  # 'Carbon'을 추가하거나 그 값이 'C'로 업데이트됩니다
```

# 3. 항목 삭제

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

사전에서 항목을 삭제하려면:

```js
del elements['Lithium']  # 'Lithium' 키와 값을 삭제합니다
```

# 4. 키 존재 여부 확인

키가 사전 안에 있는지 확인하려면:

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
if 'Helium' in elements:
    print('Helium is present')
```

# 5. 키를 반복하는 법

딕셔너리의 키를 반복하려면:

```js
for element in elements:
    print(element)  # 각 키를 출력합니다
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

## 6. 값 순회하기

딕셔너리에서 값들을 순회하려면:

```python
for symbol in elements.values():
    print(symbol)  # 각 값 출력하기
```

## 7. 항목 순회하기

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

두 가지를 통합하여 여행하기:

```js
elements.items()안에서 element, symbol에 대해:
    print(f'{element}: {symbol}')
```

# 8. 사전 컴프리헨션

반복 가능한 항목 위에 주문을 통해 새로운 사전을 창조하다:

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

# 0부터 4까지의 숫자의 제곱

squares = {x: x\*\*2 for x in range(5)}

# 9. 딕셔너리 병합

두 개 이상의 딕셔너리를 병합하여 그 항목들의 새로운 동맹을 형성합니다:

alchemists = {'Paracelsus': 'Mercury'}
philosophers = {'Plato': 'Aether'}
merged = {**alchemists, **philosophers} # Python 3.5+

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

# 10. 기본값과 함께 값 가져오기

값을 안전하게 가져오려면, 없는 키에 대한 기본값을 제공합니다:

```js
element = elements.get('Neon', 'Unknown')  # 'Neon'이 발견되지 않을 경우 'Unknown'을 반환합니다
```

# 운영 체제와 작업하기

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

# 1. 파일 경로 탐색

파일 경로를 만들고 분해하여 다양한 환경(운영 체제)에서 호환성을 보장합니다:

```js
import os
# 운영 체제와 호환되는 경로 만들기
path = os.path.join('mystic', 'forest', 'artifact.txt')
# 고서가 있는 디렉토리 검색
directory = os.path.dirname(path)
# 유물의 이름 공개
artifact_name = os.path.basename(path)
```

# 2. 디렉터리 내용 나열

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

신비로운 디렉토리 안의 모든 엔티티를 공개하기 위해:

```js
import os
contents = os.listdir('enchanted_grove')
print(contents)
```

## 3. 디렉토리 생성하기

파일 시스템의 직물 속에 새로운 디렉토리를 창조하기 위해:

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
import os
# 단일 디렉토리 생성
os.mkdir('alchemy_lab')
# 디렉토리 계층 생성
os.makedirs('alchemy_lab/potions/elixirs')
```

# 4. 파일 및 디렉토리 삭제

파일이나 디렉토리를 지우고, 그 본질을 추방하려면:

```python
import os
# 파일 삭제
os.remove('unnecessary_scroll.txt')
# 빈 디렉토리 삭제
os.rmdir('abandoned_hut')
# 디렉토리와 그 내용물 삭제
import shutil
shutil.rmtree('cursed_cavern')
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

# 5. 셸 명령 실행하기

파이썬에서 쉘의 고대적인 힘을 직접 호출하려면:

```python
import subprocess
# 'echo' 주문 호출
result = subprocess.run(['echo', 'Revealing the arcane'], capture_output=True, text=True)
print(result.stdout)
```

# 6. 환경 변수 사용하기

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

에테리얼 환경 변수를 읽고 기록하려면:

```python
import os
# 'PATH' 변수 읽기
path = os.environ.get('PATH')
# 새 환경 변수 생성
os.environ['MAGIC'] = 'Arcane'
```

# 7. 현재 작업 디렉토리 변경

파일 시스템 내에서 다른 디렉토리로 이동하려면:

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
import os
# 'arcane_library' 디렉토리로 이동
os.chdir('arcane_library')
```

# 8. 경로의 존재 및 유형

경로의 존재 및 유형을 구분하는 방법 — 파일인지 디렉토리인지 확인하기:

```js
import os
# 경로가 존재하는지 확인
exists = os.path.exists('mysterious_ruins')
# 경로가 디렉토리인지 확인
is_directory = os.path.isdir('mysterious_ruins')
# 경로가 파일인지 확인
is_file = os.path.isfile('ancient_manuscript.txt')
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

# 9. 임시 파일 작업

임시 파일과 디렉토리를 소환하려면, 일시적이며 덧없습니다:

```js
import tempfile
# 임시 파일 생성
temp_file = tempfile.NamedTemporaryFile(delete=False)
print(temp_file.name)
# 임시 디렉토리 생성
temp_dir = tempfile.TemporaryDirectory()
print(temp_dir.name)
```

# 10. 시스템 정보 가져오기

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

호스트 시스템에 대한 정보, 시스템 이름 및 해당 지원하는 마법을 알아보려면:

```js
import os
import platform
# 운영 체제 확인
os_name = os.name  # 'posix', 'nt', 'java'
# 자세한 시스템 정보 확인
system_info = platform.system()  # 'Linux', 'Windows', 'Darwin'
```

# CLI 작업 — 표준 입력, 표준 출력, 표준 에러

# 1. 사용자 입력 읽기

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

STDIN에서 입력 받기:

```js
user_input = input("지혜를 나누어주세요: ")
print(f"당신이 공유한 내용: {user_input}")
```

# 2. STDOUT로 출력하기

콘솔에 메시지 출력하기:

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
print("Behold, the message of the ancients!");
```

# 3. 포맷팅된 출력

우아하고 정확하게 변수를 메시지에 작살낼 때:

```js
name = "Merlin"
age = 300
print(f"{name}, of {age} years, speaks of forgotten lore.")
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

# 4. 표준 입력에서 행 읽기

표준 입력에서 행마다 공백을 제거하세요:

```js
import sys
for line in sys.stdin:
    print(f"Echo from the void: {line.strip()}")
```

# 5. 표준 에러로 쓰기

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

STDERR로 메시지를 보내려면:

```js
import sys
sys.stderr.write("조심하세요! 그 길에는 위험이 가득합니다.\n")
```

# 6. STDOUT 리다이렉션

STDOUT을 리다이렉션하려면:

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
import sys
original_stdout = sys.stdout  # 원래 STDOUT을 보존합니다
with open('mystic_log.txt', 'w') as f:
    sys.stdout = f  # STDOUT을 파일로 리디렉션합니다
    print("이 메시지는 mystic_log.txt 파일 안에 새겨졌습니다.")
sys.stdout = original_stdout  # STDOUT을 본래의 상태로 복원합니다
```

# 7. STDERR 리디렉션

STDERR 리디렉션:

```js
import sys
with open('warnings.txt', 'w') as f:
    sys.stderr = f  # STDERR를 리디렉션합니다
    print("이 경고는 warnings.txt 파일 안에 봉인되었습니다.", file=sys.stderr)
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

# 8. 비밀번호 요청하기

비밀번호를 요청하려면:

```python
import getpass
secret_spell = getpass.getpass("비밀 주문을 속삭여주세요: ")
```

# 9. 명령줄 인수

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

커맨드 라인 인수를 처리하고 작업하는 중:

```python
import sys
# 스크립트의 이름은 첫 번째 인수이며, 호출자가 전달한 것이 이어집니다
script, first_arg, second_arg = sys.argv
print(f"신성한 토큰과 함께 호출됨: {first_arg} 및 {second_arg}")
```

## 10. 복잡한 CLI 상호작용을 위한 Argparse 사용

설명과 옵션/인수 추가하기:

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
import argparse
parser = argparse.ArgumentParser(description="Summon the power of the ancient scripts.")
parser.add_argument('spell', help="Specify the spell to cast")
parser.add_argument('--power', type=int, help="Indicate the power level of the spell")
args = parser.parse_args()
print(f"Invoking {args.spell} with a power level of {args.power}")
```

# Working with Mathematical Operations and Permutations

# 1. Basic Arithmetic Operations

For basic arithmetic operations:

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
sum = 7 + 3  # 더하기
difference = 7 - 3  # 빼기
product = 7 * 3  # 곱하기
quotient = 7 / 3  # 나누기
remainder = 7 % 3  # 나머지
power = 7 ** 3  # 지수
```

# 2. 복소수 다루기

복소수를 다루기 위해:

```js
z = complex(2, 3)  # 복소수 2 + 3j 생성
real_part = z.real  # 실수부 추출
imaginary_part = z.imag  # 허수부 추출
conjugate = z.conjugate()  # 켤레복소수 구하기
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

# 3. 수학 함수

일반적인 수학 함수:

```js
import math
root = math.sqrt(16)  # 제곱근
logarithm = math.log(100, 10)  # 밑이 10인 100의 로그값
sine = math.sin(math.pi / 2)  # 90도의 사인 (라디안 단위)
```

# 4. 순열 생성

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

아래는 주어진 집합에서 순열을 생성하는 간단한 방법입니다:

```python
from itertools import permutations
paths = permutations([1, 2, 3])  # 리스트 [1, 2, 3]의 모든 순열을 생성합니다.
for path in paths:
    print(path)
```

# 5. 조합 생성하기

조합을 생성하는 간단한 방법입니다.

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
from itertools import combinations
combos = combinations([1, 2, 3, 4], 2)  # 모든 2개 요소 조합 생성
for combo in combos:
    print(combo)
```

# 6. 랜덤 숫자 생성

랜덤 숫자를 얻으려면:

```js
import random
num = random.randint(1, 100)  # 1부터 100 사이의 랜덤 정수 생성
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

# 7. 분수 작업하기

분수를 다룰 때는:

```python
from fractions import Fraction
f = Fraction(3, 4)  # 3/4 분수를 생성합니다
print(f + 1)  # 분수와 정수를 더합니다
```

# 8. 통계 함수

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

평균, 중앙값 및 표준 편차를 얻으려면:

```js
import statistics
data = [1, 2, 3, 4, 5]
mean = statistics.mean(data)  # 평균
median = statistics.median(data)  # 중앙값
stdev = statistics.stdev(data)  # 표준 편차
```

# 9. 삼각 함수

삼각함수 작업하기:

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
import math
angle_rad = math.radians(60)  # 60도를 라디안으로 변환
cosine = math.cos(angle_rad)  # 해당 각도의 코사인
```

# 10. 무한대 및 NaN 다루기

무한대 및 NaN을 다루는 방법:

```js
import math
infinity = math.inf  # 무한대 표현
not_a_number = math.nan  # 숫자가 아닌 값을 나타내는 NaN
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

# 데이터베이스 작업

# 1. 연결 설정

포스트그레스 데이터베이스에 연결을 생성하려면:

```js
import psycopg2
connection = psycopg2.connect(
    dbname='your_database',
    user='your_username',
    password='your_password',
    host='your_host'
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

# 2. 커서 만들기

데이터베이스 커서를 생성하여 레코드를 이동하고 조작할 수 있습니다:

```js
cursor = connection.cursor();
```

# 3. 쿼리 실행

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

데이터베이스에서 데이터 선택하기:

```js
cursor.execute("SELECT * FROM your_table");
```

## 4. 쿼리 결과 가져오기

커서를 사용하여 데이터 가져오기:

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
records = cursor.fetchall()
for record in records:
    print(record)
```

# 5. 레코드 삽입

데이터를 데이터베이스 테이블에 삽입하는 방법:

```js
cursor.execute("INSERT INTO your_table (column1, column2) VALUES (%s, %s)", ('value1', 'value2'))
connection.commit()  # 트랜잭션을 완료합니다
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

# 6. 레코드 업데이트

레코드를 변경하려면:

```js
cursor.execute("UPDATE your_table SET column1 = %s WHERE column2 = %s", ("new_value", "condition_value"));
connection.commit();
```

# 7. 레코드 삭제

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

테이블에서 레코드를 삭제하려면:

```js
cursor.execute("DELETE FROM your_table WHERE condition_column = %s", ('condition_value',))
connection.commit()
```

# 8. 테이블 생성

새로운 테이블을 생성하려면, 구조를 정의하세요.

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
cursor.execute("""
    CREATE TABLE your_new_table (
        id SERIAL PRIMARY KEY,
        column1 VARCHAR(255),
        column2 INTEGER
    )
""")
connection.commit()
```

# 9. 테이블 삭제하기

테이블을 삭제하려면:

```js
cursor.execute("DROP TABLE if exists your_table");
connection.commit();
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

# 10. 트랜잭션 사용하기

원자성을 위해 트랜잭션을 사용하는 방법입니다:

```js
try:
    cursor.execute("첫 번째 트랜잭션 쿼리")
    cursor.execute("두 번째 트랜잭션 쿼리")
    connection.commit()  # 모든 것이 잘되면 커밋
except Exception as e:
    connection.rollback()  # 문제 발생 시 롤백
    print(f"오류 발생: {e}")
```

# 비동기 IO 작업하기 (비동기 프로그래밍)

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

# 1. 비동기 함수 정의하기

async 함수를 선언하려면 다음과 같이 작성할 수 있습니다:

```js
import asyncio
async def fetch_data():
    print("데이터 가져오는 중...")
    await asyncio.sleep(2)  # I/O 작업 시뮬레이션
    print("데이터를 가져왔습니다.")
```

# 2. 비동기 함수 실행하기

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

비동기 함수를 호출하고 기다리려면:

```js
async def main():
    await fetch_data()
asyncio.run(main())
```

# 3. 여러 코루틴 기다리기

여러 비동기 함수를 호출하고 모두 기다리려면:

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
비동기로 주요 함수():
    작업1 = 데이터_가져오기()
    작업2 = 데이터_가져오기()
    await asyncio.gather(작업1, 작업2)
asyncio.run(주요 함수())
```

## 4. 작업 생성하기

작업을 보내려면:

```python
비동기로 주요 함수():
    작업1 = asyncio.create_task(데이터_가져오기())
    작업2 = asyncio.create_task(데이터_가져오기())
    await 작업1
    await 작업2
asyncio.run(주요 함수())
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

# 5. 비동기 반복

비동기적으로 횡행하면서 다른 함수에 시간을 주는 방법:

```js
async def fetch_item(item):
    await asyncio.sleep(1)  # I/O 작업을 시뮬레이션합니다
    print(f"{item}을 가져왔습니다")
async def main():
    items = ['물약', '스크롤', '마법봉']
    for item in items:
        await fetch_item(item)
asyncio.run(main())
```

# 6. 비동기적인 컨텍스트 매니저 사용하기

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

비동기 함수 내에서 리소스가 적절하게 관리되도록 하려면:

```js
async def async_context_manager():
    print("컨텍스트 진입 중")
    await asyncio.sleep(1)
    print("컨텍스트 종료 중")
async def main():
    async with async_context_manager():
        print("컨텍스트 내부에 있음")
asyncio.run(main())
```

# 7. 비동기 코드에서 예외 처리

비동기 함수에서 에러를 우아하게 처리하고 관리하려면:

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
async def risky_spell():
    await asyncio.sleep(1)
    raise ValueError("주문이 실패했습니다!")
async def main():
    try:
        await risky_spell()
    except ValueError as e:
        print(f"에러가 발생했습니다: {e}")
asyncio.run(main())
```

# 8. 비동기 생성기

개별 시간에 도착하는 각각의 비동기 생성기를 생성하려면:

```python
async def fetch_items():
    items = ['크리스탈', '부적', '단검']
    for item in items:
        await asyncio.sleep(1)
        yield item
async def main():
    async for item in fetch_items():
        print(f"{item}을(를) 찾았습니다")
asyncio.run(main())
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

# 9. 세마포어 사용하기

동시 작업의 수를 제한하려면:

```js
async def guarded_spell(semaphore, item):
    async with semaphore:
        print(f"{item} 처리 중")
        await asyncio.sleep(1)
async def main():
    semaphore = asyncio.Semaphore(2)  # 동시 작업 2개 허용
    await asyncio.gather(*(guarded_spell(semaphore, i) for i in range(5)))
asyncio.run(main())
```

# 10. 이벤트 루프

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

비동기 루프와 직접 상호 작용하여 실행 흐름을 사용자 정의할 수 있습니다:

```js
async def perform_spell():
    print("주문 시전 중...")
    await asyncio.sleep(1)
    print("주문 완료.")
loop = asyncio.get_event_loop()
try:
    loop.run_until_complete(perform_spell())
finally:
    loop.close()
```

# 네트워크, 소켓 및 네트워크 인터페이스 작업

# 1. 소켓 생성

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

네트워크 통신용 소켓을 만들려면:

```js
import socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
```

# 2. 원격 서버에 연결하기

소켓을 통해 원격 서버와 연결을 설정합니다.

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
s.connect(('example.com', 80))  # Connect to example.com on port 80
```

# 3. Sending Data

To dispatch data through the network to a connected entity:

```js
s.sendall(b'Hello, server')
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

# 4. 데이터 수신

네트워크로부터 데이터를 수신하려면:

```js
data = s.recv(1024)  # 최대 1024바이트까지 수신
print('수신 완료', repr(data))
```

# 5. 소켓 닫기

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

기분 좋은 마음으로 다음과 같이 번역합니다.

네트워크 링크를 끊고 소켓을 차분히 종료하려면:

```js
s.close();
```

# 6. 수신 소켓 생성

들어오는 연결을 수신하기 위해 소켓을 열려면:

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
serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
serversocket.bind(('localhost', 8080))  # localhost와 포트 8080에 바인딩합니다.
serversocket.listen()  # 들어오는 연결을 대기합니다.
```

# 7. 연결 수락하기

네트워크 링크를 수락하고 설정하기 위해서:

```js
clientsocket, address = serversocket.accept()
print(f"Connection from {address} has been established.")
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

# 8. 블로킹되지 않는 소켓 작업

소켓의 모드를 블로킹되지 않도록 설정하려면:

```js
s.setblocking(False);
```

# 9. UDP 소켓 사용하기

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

UDP 소켓을 생성하여 더 빠르지만 덜 신뢰성있는 통신을 위한 프로토콜이 필요합니다:

```js
udp_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
udp_socket.bind(('localhost', 8081))  # UDP 소켓을 로컬호스트의 8081 포트에 바인딩합니다
```

# 10. 네트워크 인터페이스 나열하기

기계의 네트워크 인터페이스의 이름과 주소를 확인하려면:

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
import socket
import netifaces
for interface in netifaces.interfaces():
    addr = netifaces.ifaddresses(interface).get(netifaces.AF_INET)
    if addr:
        print(f"Interface: {interface}, Address: {addr[0]['addr']}")
```

#

# 판다 라이브러리 (데이터프레임) 사용하기

# 1. 데이터프레임 생성하기

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

자신만의 열과 데이터로 DataFrame을 만들려면:

```js
import pandas as pd
data = {
    'Element': ['Earth', 'Water', 'Fire', 'Air'],
    'Symbol': ['🜃', '🜄', '🜂', '🜁']
}
df = pd.DataFrame(data)
```

# 2. CSV 파일에서 데이터 읽기

CSV 파일에서 데이터를 읽어와 DataFrame으로 변환하기:

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
df = pd.read_csv("elements.csv");
```

# 3. 처음 몇 개 행 확인하기

데이터프레임에서 처음 행들을 얻으려면:

```js
print(df.head());
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

# 4. 열 선택하기

데이터프레임에서 특정 열을 선택하려면:

```js
symbols = df["Symbol"];
```

# 5. 행 필터링하기

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

DataFrame을 살펴보고, 기준을 충족하는 행을 선택하려면:

```js
fire_elements = df[df["Element"] == "Fire"];
```

# 6. 새 열 만들기

데이터 내에서 파생된 DataFrame에 새 열을 만들려면:

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
df["Length"] = df["Element"].apply(len);
```

# 7. 데이터 그룹화 및 집계

데이터를 그룹으로 모으고 집계를 통해 새로운 데이터를 추출하려면:

```js
element_groups = df.groupby("Element").agg({ Length: "mean" });
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

# 8. 데이터프레임 병합

두 데이터프레임을 공통 키를 기준으로 결합하려면:

```js
df2 = pd.DataFrame({ Element: ["Earth", "Fire"], Quality: ["Solid", "Plasma"] });
merged_df = pd.merge(df, df2, (on = "Element"));
```

# 9. 누락된 데이터 처리

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

DataFrame을 정리하여 데이터가 없는 곳에 값이 존재하는 빈 칸을 채우는 방법입니다:

```js
df.fillna((value = "Unknown"), (inplace = True));
```

# 10. 데이터 변환 및 형태 재구성

DataFrame의 형태를 변환하여 pivot 작업을 통해 숨겨진 패턴과 구조를 드러내는 방법:

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
pivoted_df = df.pivot(index='Element', columns='Symbol', values='Length')
```

## 넘파이 라이브러리 (배열) 작업

## 1. 넘파이 배열 생성하기

배열을 생성하려면:

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
import numpy as np
array = np.array([1, 2, 3, 4, 5])
```

# 2. 영이나 일의 배열

영으로 채워진 배열을 생성하려면:

```python
zeros = np.zeros((3, 3))  # 3x3 크기의 영으로 채워진 배열
ones = np.ones((2, 4))  # 2x4 크기의 일로 채워진 배열
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

# 3. 숫자 범위 생성하기

일련의 숫자를 만들려면:

```js
range_array = np.arange(10, 50, 5)  # 10부터 50까지, 간격은 5
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

아래와 같이 두 경계 사이에 균일하게 분포된 값들의 시리즈를 만들 수 있습니다:

```js
linear_spaced = np.linspace(0, 1, 5)  # 0부터 1까지 5개의 값
```

# 5. 배열 형태 재구성

배열의 모양을 변경하여 차원을 수정할 수 있습니다.

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
reshaped = np.arange(9).reshape(3, 3)  # 1차원 배열을 3x3 2차원 배열로 재구성합니다
```

# 6. 기본 배열 작업

배열에 원소별 조작을 수행하려면:

```js
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
sum = a + b  # 원소별 덧셈
difference = b - a  # 원소별 뺄셈
product = a * b  # 원소별 곱셈
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

## 7. 행렬 곱셈

기본 점곱 연산:

```js
result = np.dot(a.reshape(1, 3), b.reshape(3, 1))  # a와 b의 점곱
```

## 8. 배열 요소에 액세스하기

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

유용한 구문을 사용하여 배열 요소에 액세스하기:

```js
element = a[2]  # 배열 'a'의 세 번째 요소를 가져옵니다
row = reshaped[1, :]  # 'reshaped'의 두 번째 행을 가져옵니다
```

# 9. 부울 인덱싱

배열 요소를 조건문의 체로 필터링합니다:

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
필터링된 = a[a > 2]  # 'a'의 원소 중 2보다 큰 것들

```

# 10. 집계 및 통계

np 배열에 대한 통계 연산:

```js
평균 = np.mean(a);
최대값 = np.max(a);
합 = np.sum(a);
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

# Matplotlib 라이브러리 사용하기 (데이터 시각화)

# 1. 기본 플롯 만들기

시각화 플롯을 만들려면:

```js
import matplotlib.pyplot as plt
x = [1, 2, 3, 4, 5]
y = [1, 4, 9, 16, 25]
plt.plot(x, y)
plt.show()
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

# 2. 제목과 라벨 추가하기

축에 이름을 지어 그래프에 더 나은 맥락을 부여하고 제목을 달기 위해서:

```js
plt.plot(x, y);
plt.title("시간 경과에 따른 성장");
plt.xlabel("시간");
plt.ylabel("성장");
plt.show();
```

# 3. 산점도 그래프 생성하기

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

산점도를 만들어 봅시다:

```js
plt.scatter(x, y);
plt.show();
```

### 4. 선 스타일 및 마커 사용자 정의

플롯에 기호를 추가하여 유용성을 높일 수 있습니다.

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
plt.plot(x, y, (linestyle = "--"), (marker = "o"), (color = "b"));
plt.show();
```

# 5. Creating Multiple Plots on the Same Axes

Creating Multiple Plots on the Same Axes:

```js
z = [2, 3, 4, 5, 6];
plt.plot(x, y);
plt.plot(x, z);
plt.show();
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

# 6. 서브플롯 만들기

서브플롯을 만들려면:

```js
fig, ax = plt.subplots(2, 1)  # 2개의 행, 1개의 열
ax[0].plot(x, y)
ax[1].plot(x, z)
plt.show()
```

# 7. 히스토그램 만들기

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

히스토그램을 생성하려면:

```js
data = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];
plt.hist(data, (bins = 4));
plt.show();
```

# 8. 범례 추가

플롯에 범례를 만드는 방법:

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
plt.plot(x, y, (label = "성장"));
plt.plot(x, z, (label = "감소"));
plt.legend();
plt.show();
```

# 9. 눈금 맞춤

축에 직접 마킹을 추가하여 값의 스케일을 정의할 수 있습니다:

```js
plt.plot(x, y);
plt.xticks([1, 2, 3, 4, 5], ["일", "이", "삼", "사", "오"]);
plt.yticks([0, 5, 10, 15, 20, 25], ["0", "5", "10", "15", "20", "25+"]);
plt.show();
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

# 10. 그림 저장하기

그림을 .png 파일로 저장하려면:

```js
plt.plot(x, y);
plt.savefig("growth_over_time.png");
```

# Scikit-Learn 라이브러리 활용하기 (머신러닝)

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

# 1. 데이터셋 불러오기

ML 실험을 위해 데이터셋을 사용하려면

```js
from sklearn import datasets
iris = datasets.load_iris()
X, y = iris.data, iris.target
```

# 2. 데이터를 훈련 세트와 테스트 세트로 나누기

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

데이터를 나눠서 학습 및 평가할 때 사용하세요:

```js
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
```

# 3. 모델 학습

RandomForestClassifier를 사용하여 ML 모델을 학습합니다:

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
from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier()
model.fit(X_train, y_train)
```

# 4. 예측하기

모델 예측 결과를 확인하려면:

```python
predictions = model.predict(X_test)
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

# 5. 모델 성능 평가

모델을 평가하려면 예측 정확성을 측정해야 합니다:

```js
from sklearn.metrics import accuracy_score
accuracy = accuracy_score(y_test, predictions)
print(f"모델 정확도: {accuracy}")
```

# 6. 교차 검증 사용하기

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

교차 검증을 사용하려면:

```js
from sklearn.model_selection import cross_val_score
scores = cross_val_score(model, X, y, cv=5)
print(f"교차 검증 점수: {scores}")
```

# 7. 피처 스케일링

당신의 피처들에 적절한 스케일을 만들어 모델이 더 효율적으로 학습할 수 있도록하세요:

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
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
```

# 8. 그리드 서치를 사용한 매개변수 튜닝

모델의 매개변수를 미세 조정하여 최적의 조합을 찾아냅니다:

```python
from sklearn.model_selection import GridSearchCV
param_grid = {'n_estimators': [10, 50, 100], 'max_depth': [None, 10, 20]}
grid_search = GridSearchCV(model, param_grid, cv=5)
grid_search.fit(X_train, y_train)
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

# 9. 파이프라인 생성

데이터 처리 및 모델링 단계를 간편하게 만들기 위해 원활한 흐름을 만들어주세요:

```js
from sklearn.pipeline import Pipeline
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', RandomForestClassifier())
])
pipeline.fit(X_train, y_train)
```

# 10. 모델 저장 및 불러오기

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

모델을 보존하기 위해서:

```js
import joblib
# 모델 저장하기
joblib.dump(model, 'model.joblib')
# 모델 불러오기
loaded_model = joblib.load('model.joblib')
```

## Plotly 라이브러리 활용 (상호작용적 데이터 시각화)

## 1. 기본 선 그래프 만들기

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

라인 차트를 만드는 방법:

```js
import plotly.graph_objs as go
import plotly.io as pio
x = [1, 2, 3, 4, 5]
y = [1, 4, 9, 16, 25]
fig = go.Figure(data=go.Scatter(x=x, y=y, mode='lines'))
pio.show(fig)
```

# 2. 산점도 그래프 만들기

산점도 그래프를 만드는 방법:

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
fig = go.Figure((data = go.Scatter((x = x), (y = y), (mode = "markers"))));
pio.show(fig);
```

# 3. Creating a Bar Chart

To Create a Bar Chart:

```js
categories = ["A", "B", "C", "D", "E"];
values = [10, 20, 15, 30, 25];
fig = go.Figure((data = go.Bar((x = categories), (y = values))));
pio.show(fig);
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

# 4. 원형 차트 만들기

원형 차트를 만들려면:

```js
labels = ["지구", "물", "불", "바람"];
sizes = [25, 35, 20, 20];
fig = go.Figure((data = go.Pie((labels = labels), (values = sizes))));
pio.show(fig);
```

# 5. 히스토그램 만들기

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

히스토그램을 만들려면:

```js
data = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];
fig = go.Figure((data = go.Histogram((x = data))));
pio.show(fig);
```

# 6. 상자 그림 만들기

상자 그림을 만들려면:

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
데이터 = [1, 2, 2, 3, 4, 4, 4, 5, 5, 6];
피그 = go.Figure((data = go.Box((y = 데이터))));
pio.show(피그);
```

# 7. 히트맵 생성하기

히트맵을 생성하려면:

```js
import numpy as np
z = np.random.rand(10, 10)  # 임의의 데이터 생성
피그 = go.Figure(data=go.Heatmap(z=z))
pio.show(피그)
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

# 8. 3D 표면 플롯 만들기

3D 표면 플롯을 만들려면:

```js
z = np.random.rand(20, 20)  # 랜덤 데이터 생성
fig = go.Figure(data=go.Surface(z=z))
pio.show(fig)
```

# 9. 서브플롯 만들기

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

서브플롯을 만들려면:

```js
from plotly.subplots import make_subplots
fig = make_subplots(rows=1, cols=2)
fig.add_trace(go.Scatter(x=x, y=y, mode='lines'), row=1, col=1)
fig.add_trace(go.Bar(x=categories, y=values), row=1, col=2)
pio.show(fig)
```

# 10. 대화형 시계열 생성

시계열 작업을 위해서:

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
import pandas as pd
dates = pd.date_range('20230101', periods=5)
values = [10, 11, 12, 13, 14]
fig = go.Figure(data=go.Scatter(x=dates, y=values, mode='lines+markers'))
pio.show(fig)
```

## 날짜와 시간 다루기

## 1. 현재 날짜와 시간 얻기

현재 날짜와 시간을 얻으려면:

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
from datetime import datetime
now = datetime.now()
print(f"Current date and time: {now}")
```

# 2. Creating Specific Date and Time

To conjure a moment from the past or future, crafting it with precision:

```python
specific_time = datetime(2023, 1, 1, 12, 30)
print(f"Specific date and time: {specific_time}")
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

# 3. 날짜와 시간 형식 지정하기

날짜와 시간 형식 지정하기:

```js
formatted = now.strftime("%Y-%m-%d %H:%M:%S")
print(f"형식화된 날짜와 시간: {formatted}")
```

# 4. 문자열에서 날짜와 시간 구문 분석하기

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

문자열에서 날짜와 시간을 파싱하려면:

```js
date_string = "2023-01-01 15:00:00"
parsed_date = datetime.strptime(date_string, "%Y-%m-%d %H:%M:%S")
print(f"Parsed date and time: {parsed_date}")
```

# 5. 시간 간격 다루기

시간을 통해 앞뒤로 시간을 건너뛰며 순간 간의 거리를 이동하려면:

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
from datetime import timedelta
delta = timedelta(days=7)
future_date = now + delta
print(f"7일 후의 날짜: {future_date}")
```

## 6. 날짜와 시간 비교

날짜 및 시간 비교:

```python
if specific_time > now:
    print("특정 시간은 미래에 있습니다.")
else:
    print("특정 시간은 지났습니다.")
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

# 7. 날짜/시간에서 구성 요소 추출하기

년, 월, 일 및 더 많은 것들을 추출하려면:

```js
year = now.year
month = now.month
day = now.day
hour = now.hour
minute = now.minute
second = now.second
print(f"Year: {year}, Month: {month}, Day: {day}, Hour: {hour}, Minute: {minute}, Second: {second}")
```

# 8. 시간대 처리하기

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

현지 시간을 준수하는 시간대에서 작업하기:

```python
from datetime import timezone, timedelta
utc_time = datetime.now(timezone.utc)
print(f"현재 UTC 시간: {utc_time}")
# 특정 시간대에 맞게 조정하기 (예: EST)
est_time = utc_time - timedelta(hours=5)
print(f"현재 EST 시간: {est_time}")
```

## 9. 요일 가져오기

한 주의 요일을 식별하기:

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
weekday = now.strftime("%A")
print(f"오늘은: {weekday}")
```

# 10. 유닉스 타임스탬프 작업

고대 시대와 대화하며, 유닉스 탄생의 숫자를 번역합니다:

```python
timestamp = datetime.timestamp(now)
print(f"현재 타임스탬프: {timestamp}")
# 타임스탬프를 날짜로 다시 변환
date_from_timestamp = datetime.fromtimestamp(timestamp)
print(f"타임스탬프에서 날짜로: {date_from_timestamp}")
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

# 더 고급 리스트 컴프리헨션과 람다 함수 사용하기

# 1. 중첩된 리스트 컴프리헨션

중첩된 리스트 컴프리헨션을 사용하려면:

```js
matrix = [[j for j in range(5)] for i in range(3)]
print(matrix)  # 3x5 행렬을 생성합니다
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

# 2. 조건부 리스트 컴프리헨션

원하는 조건을 충족하는 요소를 필터링하려면:

```js
filtered = [x for x in range(10) if x % 2 == 0]
print(filtered)  # 0부터 9까지의 짝수
```

# 3. 다중 이터러블을 사용한 리스트 컴프리헨션

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

여러 원본에서 요소를 병합하고 변환하여 하나의 춤으로 표현하기:

```js
pairs = [(x, y) for x in [1, 2, 3] for y in [3, 1, 4] if x != y]
print(pairs)  # 서로 다른 요소의 쌍을 출력
```

# 4. Lambda 함수 사용

익명 함수를 소환하여 일회성이자 간결하게 마술의 행위를 하나 생성합니다.

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
square = lambda x: x**2
print(square(5))  # Returns 25
```

# 5. Lambda Functions in List Comprehensions

To employ lambda functions within your list comprehensions:

```js
squared = [(lambda x: x**2)(x) for x in range(5)]
print(squared)  # Squares of numbers from 0 to 4
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

# 6. 리스트를 평평하게 만드는 리스트 컴프리헨션

중첩된 리스트를 평탄화하면 해당 요소들이 한 차원으로 펼쳐집니다:

```js
nested = [[1, 2, 3], [4, 5], [6, 7]]
flattened = [x for sublist in nested for x in sublist]
print(flattened)
```

# 7. 요소에 함수 적용하기

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

각 요소에 변환 함수를 적용하려면:

```js
import math
transformed = [math.sqrt(x) for x in range(1, 6)]
print(transformed)  # 1부터 5까지 숫자의 제곱근
```

## 8. Map 및 Filter와 함께 람다 사용

리스트를 매핑하고 필터링하는 방법:

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
mapped = list(map(lambda x: x**2, range(5)))
filtered = list(filter(lambda x: x > 5, mapped))
print(mapped)    # 0부터 4까지 숫자의 제곱
print(filtered)  # 5보다 큰 요소들
```

# 9. 조건 표현식을 사용한 리스트 컴프리헨션

조건 표현식을 사용한 리스트 컴프리헨션:

```js
conditional = [x if x > 2 else x**2 for x in range(5)]
print(conditional)  # 2보다 작거나 같은 숫자의 제곱, 그 외에는 동일하게
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

# 10. 람다를 사용한 복잡한 변환

복잡한 변환을 수행하기 위해서는 람다 함수를 사용하세요:

```js
complex_transformation = list(map(lambda x: x**2 if x % 2 == 0 else x + 5, range(5)))
print(complex_transformation)  # 짝수-홀수 조건에 따라 다른 변환을 적용합니다
```

# 객체 지향 프로그래밍으로 작업하기

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

# 1. 클래스 정의하기

클래스 만들기:

```js
class Wizard:
    def __init__(self, name, power):
        self.name = name
        self.power = power
    def cast_spell(self):
        print(f"{self.name}이(가) 힘 {self.power}으로 주문을 사용합니다!")
```

# 2. 인스턴스 생성

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

클래스의 인스턴스를 생성하려면:

```js
merlin = Wizard("Merlin", 100);
```

# 3. 메서드 호출

클래스 인스턴스의 메서드를 호출하려면:

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
merlin.cast_spell();
```

# 4. 상속

서브클래싱:

```js
class ArchWizard(Wizard):
    def __init__(self, name, power, realm):
        super().__init__(name, power)
        self.realm = realm
    def summon_familiar(self):
        print(f"{self.name}가 {self.realm} 영역에서 친구를 소환합니다.")
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

# 5. 메서드 오버라이딩

기본 클래스를 오버라이드하려면:

```js
class Sorcerer(Wizard):
    def cast_spell(self):
        print(f"{self.name}이(가) 강력한 암흑 주문을 사용합니다!")
```

# 6. 다형성

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

다양한 형태와 상호작용하기 위해 공통 인터페이스를 통해:

```js
def unleash_magic(wizard):
    wizard.cast_spell()
unleash_magic(merlin)
unleash_magic(Sorcerer("Voldemort", 90))
```

# 7. 캡슐화

정보 은닉을 사용하려면:

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
class Alchemist:
    def __init__(self, secret_ingredient):
        self.__secret = secret_ingredient
    def reveal_secret(self):
        print(f"The secret ingredient is {self.__secret}")
```

# 8. Composition

To assemble Objects from simpler ones:

```python
class Spellbook:
    def __init__(self, spells):
        self.spells = spells
class Mage:
    def __init__(self, name, spellbook):
        self.name = name
        self.spellbook = spellbook
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

# 9. 클래스 메소드와 정적 메소드

클래스 메소드와 정적 메소드를 사용하여 클래스에 특정 작업을 묶거나 인스턴스에 제한 없이 사용하여 더 넓은 목적에 부합하도록 합니다:

```js
class Enchanter:
    @staticmethod
    def enchant(item):
        print(f"{item}이(가) 마법으로 걸렸습니다!")
    @classmethod
    def summon(cls):
        print("새로운 마법사가 소환되었습니다.")
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

엔티티의 속성에 접근을 우아하게 관리하여 사용 및 보호를 안내하기 위해:

```js
class Elementalist:
    def __init__(self, element):
        self._element = element

    @property
    def element(self):
        return self._element

    @element.setter
    def element(self, value):
        if value in ["Fire", "Water", "Earth", "Air"]:
            self._element = value
        else:
            print("잘못된 속성입니다!")
```

# 데코레이터로 작업하기

# 1. 기본 데코레이터

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

간단한 데코레이터를 만들려면:

```js
def my_decorator(func):
    def wrapper():
        print("함수가 호출되기 전에 무언가가 발생합니다.")
        func()
        print("함수가 호출된 후에 무언가가 발생합니다.")
    return wrapper

@my_decorator
def say_hello():
    print("안녕!")

say_hello()
```

# 2. 인수를 전달하는 데코레이터

데코레이터 내에서 함수에 인수를 전달하려면:

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
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("함수 호출 전")
        result = func(*args, **kwargs)
        print("함수 호출 후")
        return result
    return wrapper

@my_decorator
def greet(name):
    print(f"{name}님 안녕하세요")

greet("Alice")
```

# 3. functools.wraps 사용

원본 함수의 메타데이터를 보존하려면 데코레이팅할 때 다음을 사용하세요:

```js
from functools import wraps

def my_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        """래핑 함수"""
        return func(*args, **kwargs)
    return wrapper

@my_decorator
def greet(name):
    """누군가에게 인사하기"""
    print(f"{name}님 안녕하세요")

print(greet.__name__)  # 출력: 'greet'
print(greet.__doc__)   # 출력: '누군가에게 인사하기'
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

# 4. 클래스 데코레이터

클래스를 사용하여 데코레이터를 만드는 방법은 다음과 같습니다:

```python
class MyDecorator:
    def __init__(self, func):
        self.func = func
    def __call__(self, *args, **kwargs):
        print("함수 호출 전")
        self.func(*args, **kwargs)
        print("함수 호출 후")

@MyDecorator
def greet(name):
    print(f"안녕 {name}")

greet("Alice")
```

# 5. 인수를 받는 데코레이터

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

자신의 인수를 받아들이는 데코레이터를 작성하려면:

```js
def repeat(times):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(times):
                func(*args, **kwargs)
        return wrapper
    return decorator

@repeat(3)
def say_hello():
    print("Hello")

say_hello()
```

# 6. 메소드 데코레이터

클래스 내부의 메소드에 데코레이터를 적용하려면:

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
def method_decorator(func):
    @wraps(func)
    def wrapper(self, *args, **kwargs):
        print("메소드 데코레이터")
        return func(self, *args, **kwargs)
    return wrapper

class MyClass:
    @method_decorator
    def greet(self, name):
        print(f"안녕 {name}")

obj = MyClass()
obj.greet("Alice")
```

# 7. 데코레이터 중첩

하나의 함수에 여러 데코레이터를 적용하려면:

```python
@my_decorator
@repeat(2)
def greet(name):
    print(f"안녕 {name}")

greet("Alice")
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

# 8. 선택적 인수를 가진 데코레이터

인수를 사용하여 작동하는 데코레이터를 만들어 보겠습니다:

```js
def smart_decorator(arg=None):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            if arg:
                print(f"Argument: {arg}")
            return func(*args, **kwargs)
        return wrapper
    if callable(arg):
        return decorator(arg)
    return decorator

@smart_decorator
def no_args():
    print("인수 없음")

@smart_decorator("인수 포함")
def with_args():
    print("인수 포함")

no_args()
with_args()
```

# 9. 클래스 메서드 데코레이터

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

클래스 메소드를 꾸미려면:

```js
class MyClass:
    @classmethod
    @my_decorator
    def class_method(cls):
        print("Class method called")

MyClass.class_method()
```

# 10. 정적 메소드를 위한 데코레이터

정적 메소드를 꾸미려면:

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
class MyClass:
    @staticmethod
    @my_decorator
    def static_method():
        print("Static method called")

MyClass.static_method()
```

# GraphQL 작업

# 1. GraphQL 클라이언트 설정

GraphQL 작업을 위해서는:

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
from gql import gql, Client
from gql.transport.requests import RequestsHTTPTransport
transport = RequestsHTTPTransport(url='https://your-graphql-endpoint.com/graphql')
client = Client(transport=transport, fetch_schema_from_transport=True)
```

## 2. Executing a Simple Query

Executing a Query:

```python
query = gql('''
{
  allWizards {
    id
    name
    power
  }
}
''')

result = client.execute(query)
print(result)
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

# 3. 변수를 사용하여 쿼리 실행하기

변수를 사용한 쿼리:

```js
query = gql('''
query GetWizards($element: String!) {
  wizards(element: $element) {
    id
    name
  }
}
''')
params = {"element": "Fire"}
result = client.execute(query, variable_values=params)
print(result)
```

# 4. 뮤테이션

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

변이를 생성하고 실행하려면:

```js
mutation = gql('''
mutation CreateWizard($name: String!, $element: String!) {
  createWizard(name: $name, element: $element) {
    wizard {
      id
      name
    }
  }
}
''')
params = {"name": "Gandalf", "element": "Light"}
result = client.execute(mutation, variable_values=params)
print(result)
```

# 5. 에러 처리

에러 처리:

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
from gql import gql, Client
from gql.transport.exceptions import TransportQueryError

try:
    result = client.execute(query)
except TransportQueryError as e:
    print(f"GraphQL Query Error: {e}")
```

# 6. Subscriptions

Working with Subscriptions:

```python
subscription = gql('''
subscription {
  wizardUpdated {
    id
    name
    power
  }
}
''')

for result in client.subscribe(subscription):
    print(result)
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

# 7. 단편

단편 사용 방법:

```js
query = gql('''
fragment WizardDetails on Wizard {
  name
  power
}
query {
  allWizards {
    ...WizardDetails
  }
}
''')
result = client.execute(query)
print(result)
```

# 8. 인라인 단편

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

위의 표를 마크다운 형식으로 변경해주세요.

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
query = gql('''
query 위자드얻기($withPower: Boolean!) {
  allWizards {
    name
    power @include(if: $withPower)
  }
}
''')
params = {"withPower": True}
result = client.execute(query, variable_values=params)
print(result)
```

# 10. 요청 일괄 처리

여러 작업을 하나의 요청으로 결합하여 네트워크 오버헤드를 줄이는 방법:

```js
from gql import gql, Client
from gql.transport.requests import RequestsHTTPTransport

transport = RequestsHTTPTransport(url='https://your-graphql-endpoint.com/graphql', use_json=True)
client = Client(transport=transport, fetch_schema_from_transport=True)

query1 = gql('query { wizard(id: "1") { name } }')
query2 = gql('query { allSpells { name } }')

results = client.execute([query1, query2])
print(results)
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

# 정규 표현식 사용하기

# 1. 기본 패턴 매칭

문자열 내에서 패턴과 일치하는 항목을 찾으려면:

```js
import re
text = "Search this string for patterns."
match = re.search(r"patterns", text)
if match:
    print("패턴을 찾았습니다!")
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

# 2. 정규 표현식 컴파일하기

정규 표현식을 반복적으로 사용하려면 다음과 같이 컴파일하세요:

```js
pattern = re.compile(r"patterns")
match = pattern.search(text)
```

# 3. 시작 또는 끝에서 매칭하기

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

문자열이 특정 패턴으로 시작하거나 끝나는지 확인하려면:

```js
if re.match(r"^Search", text):
    print("Starts with 'Search'")
if re.search(r"patterns.$", text):
    print("Ends with 'patterns.'")
```

# 4. 모든 일치 항목 찾기

문자열에서 특정 패턴의 모든 발생을 찾으려면:

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
all_matches = re.findall(r"t\w+", text)  # 't'로 시작하는 단어를 찾습니다.
print(all_matches)
```

# 5. 검색 및 대체 (치환)

문자열 내에서 패턴의 발생을 대체하는 방법:

```js
replaced_text = re.sub(r"string", "sentence", text)
print(replaced_text)
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

# 6. 문자열 분할하기

패턴의 발생에 따라 문자열을 분할하려면:

```js
words = re.split(r"\s+", text)  # 하나 이상의 공백으로 분할
print(words)
```

# 7. 특수 문자 이스케이프하기

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

특수 문자를 그대로 비교하려면 이스케이프 처리를 해야 합니다:

```js
escaped = re.search(r"\bfor\b", text)  # \b는 단어 경계를 의미합니다
```

### 8. 그룹 지정 및 캡처

패턴의 부분을 그룹으로 묶어서 값을 추출하기 위해:

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
match = re.search(r"(\w+) (\w+)", text)
if match:
    print(match.group())  # 전체 매치
    print(match.group(1)) # 첫 번째 그룹
```

# 9. 캡처하지 않는 그룹

캡처하지 않고 그룹을 정의하는 방법:

```js
match = re.search(r"(?:\w+) (\w+)", text)
if match:
    print(match.group(1))  # 첫 번째 (그리고 유일한) 그룹
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

# 10. 룩어헤드 및 룩비하인드 어설션

결과에 포함되지 않고 패턴을 일치시키려면 주변에 오는 내용을 기반으로 합니다:

```js
lookahead = re.search(r"\b\w+(?= string)", text)  # ' string' 앞에 있는 단어
lookbehind = re.search(r"(?<=Search )\w+", text)  # 'Search ' 뒤에 있는 단어
if lookahead:
    print(lookahead.group())
if lookbehind:
    print(lookbehind.group())
```

# 11. 패턴 일치 동작 수정을 위한 플래그

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

아래와 같이 플래그를 사용하여 re.IGNORECASE와 같이 패턴이 일치하는 방식을 변경할 수 있어요:

```js
대소문자_무시 = re.findall(r"search", text, re.IGNORECASE)
print(대소문자_무시)
```

# 12. 명명된 그룹 사용하기

그룹에 이름을 할당하고 이름으로 참조할 수 있어요:

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

match = re.search(r"(?P<first>\w+) (?P<second>\w+)", text)
if match:
print(match.group('first'))
print(match.group('second'))

# 13. 여러 줄에 걸쳐 매칭하기

re.MULTILINE 플래그를 사용하여 여러 줄에 걸쳐 패턴을 매칭하려면:

```js
multi_line_text = "Start\nmiddle end"
matches = re.findall(r"^m\w+", multi_line_text, re.MULTILINE)
print(matches)
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

# 14. 게으른 양자

가능한 한 적은 문자와 일치시키려면 게으른 양자 (\*?, +?, ??)를 사용하세요:

```js
html = "<body><h1>Title</h1></body>"
match = re.search(r"<.*?>", html)
if match:
    print(match.group())  # '<body>'와 일치합니다
```

# 15. 상세한 정규 표현식

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

re.VERBOSE를 사용하여 더 읽기 쉬운 정규 표현식을 사용할 수 있습니다:

```js
pattern = re.compile(r"""
    \b      # 단어 경계
    \w+     # 하나 이상의 단어 문자
    \s      # 공백
    """, re.VERBOSE)
match = pattern.search(text)
```

# 문자열 다루기

# 1. 문자열 연결하기

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

문자열을 합치려면:

```js
greeting = "Hello";
name = "Alice";
message = greeting + ", " + name + "!";
print(message);
```

# 2. str.format을 사용한 문자열 서식 지정

문자열 템플릿에 값을 삽입하는 방법:

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
message = "{}, {}. Welcome!".format(greeting, name);
print(message);
```

# 3. Formatted String Literals (f-strings)

To embed expressions inside string literals (Python 3.6+):

```js
message = f"{greeting}, {name}. Welcome!"
print(message)
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

# 4. 문자열 메소드 — 대소문자 변환

문자열의 대소문자를 변경하려면:

```js
s = "Python"
print(s.upper())  # 대문자로 변환
print(s.lower())  # 소문자로 변환
print(s.title())  # 제목 케이스로 변환
```

# 5. 문자열 메소드 — strip, rstrip, lstrip

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

문자열 끝에서 공백이나 특정 문자를 제거하려면:

```js
s = "   trim me   "
print(s.strip())   # 양쪽 끝
print(s.rstrip())  # 오른쪽 끝
print(s.lstrip())  # 왼쪽 끝
```

# 6. 문자열 메소드 — startswith, endswith

특정 텍스트를 찾아 문자열의 시작 또는 끝을 확인하려면:

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
s = "filename.txt"
print(s.startswith("file"))  # True
print(s.endswith(".txt"))    # True
```

# 7. 문자열 메서드 — split, join

문자열을 리스트로 나누거나 리스트를 문자열로 결합하려면:

```js
s = "split,this,string"
words = s.split(",")        # 문자열을 리스트로 분할
joined = " ".join(words)    # 리스트를 문자열로 결합
print(words)
print(joined)
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

# 8. 문자열 메소드 — replace

문자열의 일부를 다른 문자열로 바꾸려면:

```js
s = "Hello world";
new_s = s.replace("world", "Python");
print(new_s);
```

# 9. 문자열 메소드 — find, index

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

서브스트링이 문자열 내에서의 위치를 찾으려면:

```js
s = "look for a substring"
position = s.find("substring")  # 찾지 못하면 -1 반환
index = s.index("substring")    # 찾지 못하면 ValueError를 일으킴
print(position)
print(index)
```

# 10. 문자열 메소드 — 문자와 작업하기

문자열 내 개별 문자를 처리하려면:

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
s = "characters"
for char in s:
    print(char)  # Prints each character on a new line
```

# 11. 문자열 메서드 — isdigit, isalpha, isalnum

문자열이 숫자만, 알파벳 문자만, 또는 알파벳 및 숫자만을 포함하는지 확인하려면:

```python
print("123".isdigit())   # True
print("abc".isalpha())   # True
print("abc123".isalnum())# True
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

# 12. 문자열 슬라이싱

슬라이싱을 사용하여 부분 문자열을 추출하려면:

```js
s = "나를 슬라이스해봐"
sub = s[2:7]  # 3번째부터 7번째 문자까지
print(sub)
```

# 13. len으로 문자열 길이 계산

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

문자열의 길이를 구하려면:

```js
s = "length"
print(len(s))  # 6
```

## 14. 여러 줄을 포함하는 문자열

여러 줄에 걸쳐 있는 문자열을 다루려면:

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
multi = """Line one
Line two
Line three"""
print(multi)
```

# 15. 원시 문자열

백슬래시를 리터럴 문자로 취급하려면 정규식 패턴 및 파일 경로에 유용합니다:

```js
path = r"C:\User\name\folder"
print(path)
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

# 웹 스크레이핑 작업 중

# 1. requests를 사용하여 웹 페이지 가져오기

웹 페이지의 내용을 검색하는 방법:

```js
import requests

url = 'https://example.com'
response = requests.get(url)
html = response.text
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

# 2. BeautifulSoup을 사용하여 HTML 구문 분석

HTML을 구문 분석하고 데이터를 추출하려면:

```python
from bs4 import BeautifulSoup
soup = BeautifulSoup(html, 'html.parser')
print(soup.prettify())  # HTML을 예쁘게 출력
```

# 3. HTML 트리 내비게이션

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

태그를 사용하여 요소를 찾는 방법:

```js
title = soup.title.text  # 페이지 제목 가져오기
headings = soup.find_all('h1')  # 모든 <h1> 태그 목록
```

# 4. CSS 선택자 사용

CSS 선택자를 사용하여 요소를 선택하는 방법:

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

articles = soup.select('div.article') # <div> 태그 안에 클래스 'article'을 가진 모든 요소 선택

# 5. 태그로부터 데이터 추출

HTML 요소에서 텍스트와 속성을 추출하려면:

```js
for article in articles:
    title = article.h2.text  # <h2> 태그 안의 텍스트
    link = article.a['href']  # <a> 태그의 'href' 속성
    print(title, link)
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

# 6. 상대 URL 다루기

상대 URL을 절대 URL로 변환하려면:

```js
from urllib.parse import urljoin
absolute_urls = [urljoin(url, link) for link in relative_urls]
```

# 7. 페이지네이션 다루기

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

여러 페이지에서 콘텐츠를 스크래핑하기:

```js
base_url = "https://example.com/page/"
for page in range(1, 6):  # 5페이지에 대해
    page_url = base_url + str(page)
    response = requests.get(page_url)
    # 각 페이지의 콘텐츠 처리
```

# 8. AJAX 요청 처리

AJAX 요청으로 로드된 데이터를 스크래핑하기

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
# AJAX 요청의 URL을 찾아보세요 (브라우저의 개발자 도구 사용) 그리고 가져와보세요
ajax_url = 'https://example.com/ajax_endpoint'
data = requests.get(ajax_url).json()  # 응답이 JSON 형식일 것으로 가정합니다
```

# 9. 정규 표현식을 활용한 웹 스크래핑

정규 표현식을 사용하여 데이터를 추출하려면:

```js
import re
emails = re.findall(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', html)
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

# 10. 로봇 파일 (robots.txt) 존중하기

스크래핑 권한을 확인하려면 다음과 같이 robots.txt를 확인하세요:

```python
from urllib.robotparser import RobotFileParser

rp = RobotFileParser()
rp.set_url('https://example.com/robots.txt')
rp.read()
can_scrape = rp.can_fetch('*', url)
```

# 11. 세션 및 쿠키 사용하기

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

세션 유지 및 쿠키 처리를 위해:

```python
session = requests.Session()
session.get('https://example.com/login')
session.cookies.set('key', 'value')  # 필요한 경우 쿠키 설정
response = session.get('https://example.com/protected_page')
```

# 12. 브라우저 자동화를 통한 스크래이핑 (selenium 라이브러리)

자바스크립트로 렌더링된 동적 콘텐츠를 스크래이핑하려면:

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
from selenium import webdriver
browser = webdriver.Chrome()
browser.get('https://example.com')
content = browser.page_source
# BeautifulSoup 등을 사용하여 데이터를 파싱하고 추출합니다.
browser.quit()
```

# 13. 웹 스크래핑에서의 오류 처리

오류와 예외를 처리하는 방법:

```python
try:
    response = requests.get(url, timeout=5)
    response.raise_for_status()  # 나쁜 상태 코드에 대해 오류를 발생시킵니다.
except requests.exceptions.RequestException as e:
    print(f"오류 발생: {e}")
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

# 14. 비동기 웹 스크래핑

데이터를 빠르게 검색하기 위해 웹 사이트를 비동기적으로 스크랩하려면:

```js
import aiohttp
import asyncio

async def fetch(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.text()

urls = ['https://example.com/page1', 'https://example.com/page2']
loop = asyncio.get_event_loop()
pages = loop.run_until_complete(asyncio.gather(*(fetch(url) for url in urls)))
```

# 15. 데이터 저장 (CSV, 데이터베이스)

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

크롤링한 데이터를 CSV 파일이나 데이터베이스에 저장하는 방법:

```js
import csv

with open('output.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['Title', 'URL'])
    for article in articles:
        writer.writerow([article['title'], article['url']])
```

# pip로 작업하기 (패키지 관리)

# 1. 패키지 설치

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

거대한 저장소에서 라이브러리를 불러와서 그 힘을 환경에 통합하려면:

```js
pip install numpy
```

## 2. 설치된 패키지 나열

당신의 영역에 존재하는 라이브러리들을 조사하여 버전과 계열을 확인하려면:

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
pip list
```

# 3. 패키지 업그레이드

설치된 라이브러리에 강화된 기능과 능력을 부여하여 최신 버전으로 업그레이드하는 방법:

```js
pip install --upgrade numpy
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

# 4. 패키지 삭제

패키지를 삭제하려면:

```js
pip uninstall numpy
```

# 5. 패키지 검색

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

패키지를 검색 중입니다:

```js
pip search "data visualization"
```

## 6. 패키지의 특정 버전 설치하기

특정 버전을 설치하려면:

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
pip install numpy==1.18.5
```

# 7. Requirements 파일 생성하기

Requirements 파일:

```js
pip freeze > requirements.txt
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

# 8. 요구 사항 파일에서 패키지 설치하기

친구야, 너의 요구 사항의 노트에 맞게 조율된 라이브러리의 교향곡을 창작할 때:

```bash
pip install -r requirements.txt
```

# 9. 가상 환경 사용하기

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

패키지 충돌을 관리하기 위해 가상 환경을 생성하세요:

```js
# 'venv'라는 이름의 가상 환경 생성
python -m venv venv

# 가상 환경 활성화
# Windows에서는
.\venv\Scripts\activate

# Unix나 MacOS에서는
source venv/bin/activate
```

# 10. 패키지 의존성 확인

의존성 이해:

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
pip show numpy
```

# 일반 내장 함수 및 패키지 사용하기

# 1. os - 운영 체제 인터페이스

운영 체제와 상호 작용하기 위해서:

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
import os
current_directory = os.getcwd()  # 현재 작업 디렉토리 가져오기
```

## 2. sys - 시스템별 매개변수 및 함수

시스템별 매개변수 및 함수에 액세스하려면:

```python
import sys
sys.exit()  # 스크립트 종료
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

# 3. datetime - 기본 날짜와 시간 유형

날짜 및 시간을 다루려면:

```python
from datetime import datetime
now = datetime.now()  # 현재 날짜와 시간
```

# 4. math - 수학 함수

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

수학적인 연산을 수행하려면:

```js
import math
result = math.sqrt(16)  # 제곱근
```

# 5. random - 유사 난수 생성

유사 난수를 생성하려면:

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
import random
number = random.randint(1, 10)  # 1부터 10 사이의 난수 생성
```

# 6. json - JSON 인코더 및 디코더

JSON 데이터를 구문 분석하고 생성하기 위해:

```js
import json
json_string = json.dumps({'name': 'Alice', 'age': 30})  # 딕셔너리를 JSON 문자열로 변환
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

# 7. 정규 표현식을 사용하기

정규 표현식을 사용하려면:

```js
import re
match = re.search('Hello', 'Hello, world!')  # 문자열에서 'Hello'를 검색함
```

# 8. urllib - URL 처리 모듈

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

URL과 함께 작업하려면:

```python
from urllib.request import urlopen
content = urlopen('http://example.com').read()  # 웹 페이지의 내용을 가져오기
```

# 9. http - HTTP 모듈

HTTP 서버를 만들고 HTTP 요청을 처리하려면:

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
from http.server import HTTPServer, BaseHTTPRequestHandler
```

```js
class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        self.wfile.write(b'<html><head><title>Python HTTP Server</title></head>')
        self.wfile.write(b'<body><h1>Hello from a simple Python HTTP server!</h1></body></html>')

def run(server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler):
    server_address = ('', 8000)  # Serve on all addresses, port 8000
    httpd = server_class(server_address, handler_class)
    print("Server starting on port 8000...")
    httpd.serve_forever()

if __name__ == '__main__':
    run()
```

# 10. subprocess - Subprocess Management

새로운 프로세스를 생성하고 그들의 입력/출력/에러 파이프에 연결하려면:

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
import subprocess
subprocess.run(['ls', '-l'])  # 'ls -l' 명령 실행
```

# 11. 소켓 - 저수준 네트워킹 인터페이스

네트워크 클라이언트와 서버를 만들려면:

```js
import socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)  # TCP/IP 소켓 만들기
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

# 12. threading - 스레드 기반 병렬 처리

동시에 코드를 실행하는 방법을 알아보세요:

```js
import threading
def worker():
    print("작업자 스레드 실행 중")
thread = threading.Thread(target=worker)
thread.start()
```

# 13. multiprocessing - 프로세스 기반 병렬 처리

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

동시에 실행중인 프로세스를 관리하기 위해:

```python
from multiprocessing import Process
def worker():
    print("작업자 프로세스")
p = Process(target=worker)
p.start()
```

# 14. argparse - 명령행 옵션, 인수 및 하위 명령어를 위한 파서

명령행 인수를 구문 분석하려면:

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
import argparse
parser = argparse.ArgumentParser(description="일부 정수를 처리합니다.")
args = parser.parse_args()
```

# 15. logging - 로깅 시스템

메시지를 기록하려면 (debug, info, warning, error 및 critical):

```js
import logging
logging.warning('이것은 경고 메시지입니다.')
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

# 16. unittest - 단위 테스트 프레임워크

단위 테스트를 작성하고 실행하는 방법은 다음과 같습니다:

```js
import unittest
class TestStringMethods(unittest.TestCase):
    def test_upper(self):
        self.assertEqual('foo'.upper(), 'FOO')
```

# 17. pathlib - 객체 지향형 파일 시스템 경로

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

파일 시스템 경로를 객체 지향적으로 다루려면:

```python
from pathlib import Path
p = Path('.')
```

# 18. functools - 고계 함수 및 호출 가능 객체에 대한 작업

고계 함수 및 호출 가능 객체에 대해 작업하려면:

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
from functools import lru_cache
@lru_cache(maxsize=None)
def fib(n):
    if n < 2:
        return n
    return fib(n-1) + fib(n-2)
```

# 19. collections - Container Data Types

특수화된 컨테이너 데이터 타입 (deque, Counter, OrderedDict 등)을 사용하려면:

```js
from collections import Counter
c = Counter('hello world')
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

# 20. itertools - 효율적인 루핑을 위한 반복자 생성 함수

효율적인 루핑을 위해 반복자를 생성하고 사용하는 방법은 다음과 같습니다:

```python
import itertools
for combination in itertools.combinations('ABCD', 2):
    print(combination)
```

# 21. hashlib - 안전한 해시 및 메시지 다이제스트 알고리즘

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

데이터를 해싱하기 위해:

```js
import hashlib
hash_object = hashlib.sha256(b'Hello World')
hex_dig = hash_object.hexdigest()
```

# 22. csv - CSV 파일 읽기 및 쓰기

CSV 파일에서 읽고 쓰려면:

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
import csv
with open('file.csv', mode='r') as infile:
    reader = csv.reader(infile)
```

# 23. xml.etree.ElementTree - The ElementTree XML API

To parse and create XML data:

```python
import xml.etree.ElementTree as ET
tree = ET.parse('file.xml')
root = tree.getroot()
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

# 24. sqlite3 - SQLite 데이터베이스를 위한 DB-API 2.0 인터페이스

SQLite 데이터베이스와 상호 작용하려면:

```python
import sqlite3
conn = sqlite3.connect('example.db')
```

# 25. tkinter - GUI 도구 상자

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

GUI 애플리케이션을 만들려면:

```js
import tkinter as tk
root = tk.Tk()
```

# 26. pickle - Python 객체 직렬화

Python 객체 구조를 직렬화하고 역직렬화하는 데 사용됩니다.

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
import pickle
serialized_obj = pickle.dumps(obj)
```

# 27. io - Core Tools for Working with Streams

To handle streams (file-like objects):

```python
from io import StringIO
f = StringIO("some initial text data")
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

# 28. time - 시간 액세스 및 변환

시간 관련 함수에 접근하기 위해서:

```python
import time
time.sleep(1)  # 1초 동안 대기
```

# 29. calendar - 일반 캘린더 관련 함수

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

달력을 활용하려면:

```python
import calendar
print(calendar.month(2023, 1))  # 2023년 1월 달력 출력
```

**30. queue - 동기화된 큐 클래스**

멀티스레드 프로그래밍에 유용한 큐를 관리하세요:

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
from queue import Queue
q = Queue()
```

# 31. shutil - 고수준 파일 작업

고수준 파일 작업을 수행하려면 복사 및 아카이빙과 같은 작업을 사용합니다:

```js
import shutil
shutil.copyfile('source.txt', 'dest.txt')
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

# 32. glob - Unix 스타일의 경로명 패턴 확장

지정된 패턴과 일치하는 파일을 찾기:

```js
import glob
for file in glob.glob("*.txt"):
    print(file)
```

# 33. tempfile - 임시 파일 및 디렉토리 생성

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

임시 파일과 디렉토리를 생성하려면:

```js
import tempfile
temp = tempfile.TemporaryFile()
```

# 34. bz2 - Bzip2 압축 지원

bzip2 압축을 사용하여 데이터를 압축하고 해제하려면:

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
import bz2
compressed = bz2.compress(b'여기에 데이터를 입력하세요')
```

# 35. gzip - Gzip 압축 지원

gzip 압축을 사용하여 데이터를 압축 및 해제하는 방법:

```js
import gzip
with gzip.open('file.txt.gz', 'wt') as f:
    f.write('여기에 데이터를 입력하세요')
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

# 36. ssl - TLS/SSL Wrapper for Socket Objects

네트워크 소켓에서 TLS/SSL 암호화 및 피어 인증을 처리하기 위해:

```js
import ssl
ssl.wrap_socket(sock)
```

# 37. imaplib - IMAP4 프로토콜 클라이언트

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

IMAP4를 통해 메일에 액세스하고 조작하려면:

```js
import imaplib
mail = imaplib.IMAP4_SSL('imap.example.com')
```

# 38. smtplib - SMTP 프로토콜 클라이언트

Simple Mail Transfer Protocol (SMTP)를 사용하여 메일을 보내려면:

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
import smtplib
server = smtplib.SMTP('smtp.example.com', 587)
```

# 39. email - 이메일 메시지 관리

이메일 메시지를 관리하려면 MIME 및 다른 RFC 2822 기반 메시지 문서를 포함합니다:

```js
from email.message import EmailMessage
msg = EmailMessage()
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

# 40. base64 - Base16, Base32, Base64, Base85 Data Encodings

베이스64를 사용하여 데이터를 인코딩 및 디코딩하는 방법:

```python
import base64
encoded_data = base64.b64encode(b'data to encode')
```

# 41. difflib - Deltas를 계산하는 도우미

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

시퀀스를 비교하고 사람이 읽기 쉬운 차이를 생성하려면:

```python
import difflib
diff = difflib.ndiff('one\ntwo\nthree\n'.splitlines(keepends=True),
                     'ore\ntree\nemu\n'.splitlines(keepends=True))
print(''.join(diff))
```

# 42. gettext - 다국어 지역화 서비스

파이썬 프로그램의 국제화를 위해:

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
import gettext
gettext.install('myapp')
```

# 43. locale - Internationalization Services

To access a database of culture-specific data formats:

```js
import locale
locale.setlocale(locale.LC_ALL, '')
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

# 44. secrets - 시크릿 관리를 위한 안전한 무작위 숫자 생성

시크릿 관리를 위해 안전한 무작위 숫자를 생성하려면 토큰이나 비밀번호와 같은 비밀을 생성합니다:

```javascript
import secrets
secure_token = secrets.token_hex(16)
```

# 45. uuid - RFC 4122에 따른 UUID 개체

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

유니버설 유니크 식별자(UUID)를 생성하려면:

```js
import uuid
unique_id = uuid.uuid4()
```

# 46. html - 하이퍼텍스트 마크업 언어 지원

HTML 개체를 처리하고 조작하려면:

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
import html
escaped = html.escape('<a href="https://example.com">link</a>')
```

# 47. ftplib - FTP Protocol Client

FTP 프로토콜을 통해 파일을 교환 및 상호 작용하기 위해:

```js
from ftplib import FTP
ftp = FTP('ftp.example.com')
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

# 48. tarfile - Tar 아카이브 파일 읽고 쓰기

tar 아카이브 파일을 다루는 방법입니다. 아카이빙하고 압축/압축해제할 수 있습니다:

```js
import tarfile
with tarfile.open('sample.tar.gz', 'w:gz') as tar:
    tar.add('sample.txt')
```

요약하자면, 여기까지가 전부에요. 여기서 제공된 목록이 빠르게 숙련되는 데 도움이 되었으면 좋겠어요. 만약 마음에 드셨다면 공유하거나 좋아요를 눌러주세요 (참 많은 도움이 됩니다!).

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

더 자세하고 포괄적인 Python 개발 가이드가 필요하시다면, 제가 실용적인 Python 개발에 대해 가장 좋은 자료로 발견한 두 권의 책이 있습니다. 이 책들을 강력히 추천합니다:

- 파이썬 졸업반 — 제3판
- 따분한 일 자동화하기 — 제2판

읽어 주셔서 감사합니다! 댓글에 놓친 부분이 있다면 언제든 댓글로 남겨주세요!

# Stackademic 🎓

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

끝까지 읽어주셔서 감사합니다. 떠나시기 전에:

- 작가를 응원하고 팔로우해주세요! 👏
- 저희를 팔로우하기: X | LinkedIn | YouTube | Discord
- 다른 플랫폼 방문하기: In Plain English | CoFeed | Venture | Cubed
- 더 많은 콘텐츠: Stackademic.com
