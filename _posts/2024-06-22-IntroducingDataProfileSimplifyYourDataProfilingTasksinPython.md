---
title: "데이터 프로파일링을 간편하게 Python DataProfile 소개"
description: ""
coverImage: "/assets/img/2024-06-22-IntroducingDataProfileSimplifyYourDataProfilingTasksinPython_0.png"
date: 2024-06-22 14:22
ogImage: 
  url: /assets/img/2024-06-22-IntroducingDataProfileSimplifyYourDataProfilingTasksinPython_0.png
tag: Tech
originalTitle: "Introducing DataProfile: Simplify Your Data Profiling Tasks in Python"
link: "https://medium.com/@rigueiroemiliano/introducing-dataprofile-simplify-your-data-profiling-tasks-in-python-91a52ce033dd"
---


<img src="/assets/img/2024-06-22-IntroducingDataProfileSimplifyYourDataProfilingTasksinPython_0.png" />

# 개요

데이터 프로파일링은 데이터 분석 과정에서 중요한 단계입니다. 이는 데이터를 더 잘 이해하고 이상 현상을 식별하며 추가 분석을 위해 준비하는 데 도움이 됩니다. 저는 데이터 프로파일링 작업을 간단하게 만들고 자동화하기 위해 설계된 새로운 Python 라이브러리인 DataProfile을 소개해 드리게 되어 기쁩니다.

# DataProfile이란?

<div class="content-ad"></div>

DataProfile은 여러분의 데이터셋에 대해 포괄적인 데이터 프로필을 생성하는 Python 라이브러리입니다. Pandas DataFrame을 입력으로 받아 각 열에 대해 고유 레코드 수, 중복, 널 값 등 여러 측면을 분석합니다. 이 분석은 DataFrame의 각 열에 대해 수행되며 데이터에 대한 자세한 통찰력을 제공합니다.

# 핵심 기능

- Count: 열 내 전체 레코드 수를 계산합니다.
- Count Distinct: 열 내 고유 레코드 수를 결정합니다.
- Unique: 열 내 고유 레코드 수를 세어줍니다.
- ID Probability: 데이터 유형, 열 이름 및 고유성을 기반으로 열이 ID인지에 대한 가능성을 추정합니다.
- Email Probability: " @" 기호와 유효한 도메인을 확인하여 열이 이메일 주소를 포함할 확률을 계산합니다.
- Duplicate: 열 내 중복 레코드 수를 계산합니다.
- Numeric: 열 내 모든 레코드가 숫자인지 확인합니다.
- Letter: 열 내 모든 레코드가 문자열인지 확인합니다.
- Bool: 열 내 모든 레코드가 부울인지 확인합니다.
- Empty: 열 내 빈 레코드 수를 계산합니다.
- Zero: 열 내 0의 수를 계산합니다.
- Null: 열 내 널 레코드 수를 계산합니다.

# 설치 요구 사항

<div class="content-ad"></div>

DataProfile을 사용하려면 다음 라이브러리들이 설치되어 있어야 해요:

- Pandas
- Numpy
- Prettytable

# 별로 어렵지 않아요!

pip를 사용해서 DataProfile을 손쉽게 설치할 수 있어요:

<div class="content-ad"></div>

```js
pip install dataprofile
```

당신의 코드에서 Dataprofile 라이브러리를 가져오세요:

```js
import dataprofile as dp
```

DataFrame을 만들거나 가져오세요:

<div class="content-ad"></div>

```python
# 이 예시에서는 Pandas를 사용하여 CSV 파일 형식의 DataFrame을 생성했습니다:

import pandas as pd

# 데이터셋을 불러옵니다
df = pd.read_csv('your-dataset.csv')

# 데이터 프로필을 생성합니다
profile = dp.dataprofile(df)

# 프로필을 출력합니다
print(profile)
```

DataFrame에서 dataprofile 함수를 사용해보세요:

```python
print(dp.dataprofile(파일))
```

결과 (예시): 


<div class="content-ad"></div>


+-----------------+-------+--------+----------+---------------+------------------+-----------+---------+--------+-------+-------+---------+------+--------+------+--------+
|     columns     | count | unique | unique_% | id_probabilty | email_probabilty | duplicate | numeric | letter |  bool | empty | empty_% | cero | cero_% | null | null_% |
+-----------------+-------+--------+----------+---------------+------------------+-----------+---------+--------+-------+-------+---------+------+--------+------+--------+
|  respondent_id  |  1798 |  1798  |   100%   |      100%     |        0%        |     0     |   True  | False  | False |   0   |    0%   |  0   |   0%   |  0   |   0%   |
|      q0011      |  1798 |   24   |    1%    |       0%      |        0%        |    1774   |  False  |  True  | False |   0   |    0%   |  0   |   0%   |  0   |   0%   |
|      q0021      |  1798 |   3    |    0%    |       0%      |        0%        |    1795   |  False  |  True  | False |   0   |    0%   |  0   |   0%   |  0   |   0%   |
|      q0022      |  1798 |   7    |    0%    |       0%      |        0%        |    1791   |  False  | False  | False |   0   |    0%   |  0   |   0%   |  0   |   0%   |
|    q0023_0001   |  1798 |   2    |    0%    |       0%      |        0%        |    1796   |  False  | False  |  True |  1285 |   71%   |  0   |   0%   |  0   |   0%   |
|    q0023_0002   |  1798 |   2    |    0%    |       0%      |        0%        |    1796   |  False  | False  |  True |  1680 |   93%   |  0   |   0%   |  0   |   0%   |
|    q0023_0003   |  1798 |   2    |    0%    |       0%      |        0%        |    1796   |  False  | False  |  True |  858  |   47%   |  0   |   0%   |  0   |   0%   |
|    q0023_0004   |  1798 |   2    |    0%    |       0%      |        0%        |    1796   |  False  | False  |  True |  1579 |   87%   |  0   |   0%   |  0   |   0%   |
|    q0023_0005   |  1798 |   2    |    0%    |       0%      |        0%        |    1796   |  False  | False  |  True |  1615 |   89%   |  0   |   0%   |  0   |   0%   |
|    q0023_0006   |  1798 |   2    |    0%    |       0%      |        0%        |    1796   |  False  | False  |  True |  1709 |   95%   |  0   |   0%   |  0   |   0%   |
|    q0023_0007   |  1798 |   2    |    0%    |       0%      |        0%        |    1796   |  False  | False  |  True |  1686 |   93%   |  0   |   0%   |  0   |   0%   |
|    q0023_0008   |  1798 |   2    |    0%    |       0%      |        0%        |    1796   |  False  | False  |  True |  1702 |   94%   |  0   |   0%   |  0   |   0%   |


# 결론

DataProfile은 데이터 프로파일링 프로세스를 자동화하여 시간과 노력을 절약할 수 있는 강력한 도구입니다. 쉽게 사용할 수 있는 기능과 포괄적인 분석 능력을 통해 데이터에 대한 가치 있는 통찰력을 제공하여 데이터를 준비하고 정리하는 작업을 더 쉽게 만들어줍니다. DataProfile을 사용하여 데이터 프로파일링 작업을 간편하게 처리해 보세요!

자세한 정보, 상세 설명 및 추가 예제는 GitHub 리포지토리를 방문해주세요.


<div class="content-ad"></div>

앞으로의 업데이트 내용을 확인하려면 PyPI 프로젝트를 방문해주세요.