---
title: "Streamlit으로 Kaggle 같은 플랫폼을 만드는 방법 학생들을 위한 프로젝트 사례"
description: ""
coverImage: "/assets/img/2024-06-22-HowICreatedaKaggle-LikePlatformforMyStudentsUsingStreamlitandHowYouCanDoItasWell_0.png"
date: 2024-06-22 02:33
ogImage:
  url: /assets/img/2024-06-22-HowICreatedaKaggle-LikePlatformforMyStudentsUsingStreamlitandHowYouCanDoItasWell_0.png
tag: Tech
originalTitle: "How I Created a Kaggle-Like Platform for My Students Using Streamlit and How You Can Do It as Well"
link: "https://medium.com/towards-data-science/how-i-created-a-kaggle-like-platform-for-my-students-using-streamlit-and-how-you-can-do-it-as-well-5fd10671f559"
isUpdated: true
---

![How I Created a Kaggle-Like Platform for My Students Using Streamlit and How You Can Do It as Well](/assets/img/2024-06-22-HowICreatedaKaggle-LikePlatformforMyStudentsUsingStreamlitandHowYouCanDoItasWell_0.png)

안녕하세요! 저는 Kaggle을 좋아하고 데이터 과학과 머신 러닝을 보급하는 데 그가 한 기여가 매우 갓큼하다고 믿습니다. 비디오 게임과 게임화를 즐기는 사람으로서, Kaggle의 랭킹 및 포인트 시스템이 참가자들이 건강하고 건설적인 경쟁을 통해 모델을 개선하도록 장려하는 방법을 인정합니다. Kaggle은 매우 인기가 높아져 많은 교수들이 기계 학습을 가르치는 데 선호하는 도구 중 하나로 Kaggle을 포함시켜왔다.

그러나 기계 학습 강의를 하는 비즈니스 스쿨의 교수로서, Kaggle을 사용하여 학생들의 최종 기계 학습 프로젝트를 평가하는 도구로 사용하는 것이 조금은 복잡하다는 것을 느꼈습니다. 먼저, 학생들의 제출물을 추적하는 것이 지루하고 수동적이며, 제가 가르치는 학생들(대부분 데이터 과학 및 프로그래밍 초보자임을 유의해 주세요)이 자신들의 노력의 결과가 Kaggle 랭킹의 맨 아래에 배치된 것을 보는 것이 좌절스러울 수 있다고 생각합니다. 이러한 이유로 Kaggle이 가르치는 도구로 설계된 것은 아니라는 점을 인지하는 것이 중요하다고 생각합니다.

항상 제 학생들에게 맞춤화된 Kaggle의 소형 버전을 만들고 싶어했습니다. 이 플랫폼은 Kaggle의 게임화 성공을 반영하고, 수학 프로그래밍 및 조합 최적화를 포함하여 여러 주제의 템플릿으로 서비스를 제공할 수 있게 해줍니다. 처음에는 일반적인 파이썬 웹 개발 프레임워크인 Django나 Flask를 사용하여 이러한 플랫폼을 구축하는 데 필요한 노력에 despondent해졌습니다.

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

Streamlit을 최근에 알게 되어서 정말 기뻤어요! Streamlit은 Google Sheets와 상호 작용할 수 있는 능력을 갖추고 있어요. 이 글에서는 Python, Streamlit, 그리고 Google Sheets를 사용하여 Kaggle과 유사한 웹 애플리케이션을 만들어 수업을 게임으로 변화시킬 수 있는 방법을 보여드릴 거에요. 이 앱을 통해 학생들은 개별 계정으로 로그인하고, CSV 파일을 업로드하여 해결책을 제출하고, 다양한 머신 러닝 메트릭을 기반으로 해결책을 평가하고, 제출물들의 순위를 동적으로 확인할 수 있어요. 무엇보다도, 무료로 이 앱을 배포하는 방법도 설명할 거에요.

손을 더럽히며 배우시기 준비되셨나요? 최종 앱 결과물을 한 눈에 확인해 볼까요...

![앱 결과물](https://miro.medium.com/v2/resize:fit:1200/1*SUhDDLi4ozYwvL1hoShNGA.gif)

이 글이 길 수도 있음을 참고해 주세요. 가능한 한 자세하게 설명드리려고 노력하고 있어요. 데이터 과학 전문가일 필요는 없지만 Python에 서툰 교사나 교수님들에게 많은 도움이 될 수 있다고 생각하기 때문이에요. 이미 Python 전문가라면, 이 글은 건너뛰고 아래 프로젝트의 GitHub 저장소로 바로 이동하실 수도 있어요.

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

내가 학생들과 함께 구현한 원래 프로젝트에서 앱에는 세 가지 다른 기계 학습 섹션이 포함되어 있었습니다: 회귀 문제용 하나, 이진 분류 문제용 하나, 시계열 예측 문제용 하나입니다. 이 간단한 튜토리얼에서는 이 중 하나에 초점을 맞출 것입니다: UC Irvine Machine Learning Repository의 유명한 Pima 당뇨병 데이터셋을 사용한 이진 분류 문제입니다. 이 데이터셋은 Kaggle에서도 다운로드할 수 있습니다.

## 기사 색인:

- Streamlit과 Google Sheets
- 앱 디자인
- 앱 구현 및 배포
- [1] — 프로젝트 환경 설정
- [2] — Google Sheets 데이터베이스 설정
- [3] — 데이터 개인 정보 및 보안
- [4] — Google Sheets 연결 설정
- [5] — 라이브러리, 상태 세션 변수 및 앱 구성
- [6] — 로그인 모듈
- [7] — 결과 제출 모듈
- [8] — 동적 순위 매기기 모듈
- [9] — 제출 로그 모듈
- [10] — 앱 배포
- 현실 성과
- 결론
- 참고 문헌

# Streamlit과 Google Sheets

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

2023년 1.28 버전부터 Streamlit은 사용자가 st.connection 메서드를 사용하여 Google Sheets에 연결할 수 있게 되었습니다. 이 방법을 사용하면 Google Sheets를 데이터베이스로 활용하여 CRUD (생성, 읽기, 업데이트, 삭제) 작업을 수행할 수 있습니다. 이 기능에 대해 알게 된 것은 Sven | Coding Is Fun이 만든 YouTube 비디오에서 알게 되었습니다. 시청하고 싶다면 아래 링크를 남겨 놓겠습니다.

당신이 생각하는 것을 알겠어요. 하지만 겁먹지 마세요. Excel (Google Sheets)이 데이터베이스가 아님을 잘 알고 있습니다. 그리고 동의합니다. 회사가 데이터베이스로 사용하는 것에 대해 악몽을 꾸기도 합니다. 그러나 우리가 만들고자 하는 앱을 위해서는 충분히 좋습니다. 필요한 모든 작업을 수행할 수 있으며 온라인에서 사용할 수 있으며, 개인 정보를 보호해줍니다 (우리와 앱만 액세스할 수 있음 — 제 구글 계정을 해킹할 만한 능력이 있는 사람이 아니라면), 그리고 가장 중요한 것은 무료입니다. 이 부분을 개선할 수 있는 여지가 있다는 것을 인지하고 있으며, Google Sheets를 Supabase와 연결하는 가능성을 탐색하고 있습니다.

![image](/assets/img/2024-06-22-HowICreatedaKaggle-LikePlatformforMyStudentsUsingStreamlitandHowYouCanDoItasWell_1.png)

구현에 바로 들어가기 전에, 앱이 반드시 갖춰야 할 다른 모듈들과 구현 전략을 신중하게 검토하는 것이 중요합니다.

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

# 앱 디자인

저희가 만들고자 하는 앱은 여러 과정을 필요로 합니다. 먼저, 오직 우리 학생들만이 액세스할 수 있도록 보장하기 위해 로그인 시스템이 필요합니다. 사용자가 로그인하면 결과를 제출할 모듈이 필요합니다. 이에는 .csv 파일을 업로드하는 과정, 파일이 예상되는 행 수와 요청된 열과 일치하는지 확인하는 과정, 모델 예측과 실제 테스트 데이터 간의 평가 지표를 계산하는 과정이 필요합니다. 이후 학생은 강의실 순위와 결과를 동료들과 비교할 수 있는 기능이 있어야 합니다. 마지막으로 학생은 그룹 프로젝트이기 때문에 모든 제출물과 팀원들의 제출물을 볼 수 있어야 합니다. Figure 3은 앱의 사용자 플로우 다이어그램의 전반적인 개요를 보여줍니다.

<img src="/assets/img/2024-06-22-HowICreatedaKaggle-LikePlatformforMyStudentsUsingStreamlitandHowYouCanDoItasWell_2.png" />

# 앱 구현

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

이 앱에는 Visual Studio Code를 사용할 것입니다. 귀하는 귀하의 기기에 새 프로젝트 폴더를 만들고 해당 폴더에서 Visual Studio Code를 열 것을 강력히 권장합니다. 제 경우에는 폴더 이름을 project_app_medium으로 지정하기로 결정했습니다.

## 프로젝트 환경 설정

다른 Python 프로젝트와의 의존성 충돌을 피하기 위해 각 Streamlit 앱을 위한 가상 환경을 생성하는 것을 강력히 권장합니다. 가상 환경을 생성하고 활성화한 후 아래 라이브러리를 설치해야 합니다.

```js
pandas == 1.5.3
numpy == 1.26.4
matplotlib
streamlit
streamlit_option_menu
streamlit-extras
st-gsheets-connection
scikit-learn
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

라이브러리를 설치하려면 새 텍스트 파일을 만들고 requirements.txt라는 이름을 지정하십시오. 이 비어 있는 텍스트 파일 안에 위에 나열된 라이브러리들을 복사하여 저장하세요; 우리 앱을 배포할 때 이 파일이 필요합니다. 그런 다음 터미널에 다음 명령어를 입력하세요.

```js
pip install -r requirements.txt
```

이 명령은 requirements.txt 파일에 나열된 모든 라이브러리를 설치합니다. 우리가 사용하는 라이브러리에 대해 설명하자면, 모든 데이터 과학 프로젝트의 "미레푸아"로 시작하는 것이 좋습니다: numpy, pandas 및 matplotlib이 있습니다. 또한 streamlit이 필요합니다, 이는 우리의 프레임워크를 포함하는 기본 라이브러리입니다. Streamlit의 기능을 확장하기 위해 streamlit_option_menu와 같은 커뮤니티에서 개발된 확장들을 가져올 것입니다. 이는 간단한 사이드바 메뉴를 만들 수 있는 streamlit_option_menu와 맞춤화 기능을 많이 포함하는 streamlit-extras가 있습니다. 추가로 st-gsheets-connection를 사용하여 Google Sheets와 연결하는 데 도움을 줄 것입니다. 위에 나열된 라이브러리들 외에도 데이터 보안 및 보호를 위해 hashlib를 사용할 것입니다. 데이터베이스의 세부 정보를 정의할 때 더 자세히 이야기하겠습니다.

이 튜토리얼 동안 다음 폴더 구조가 사용되며 다음 구성 요소가 포함됩니다.

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

- .streamlit: 이 폴더에 Streamlit 관련 설정이 저장됩니다. 이 폴더 안에는 Google Sheets API와 연결하기 위해 필요한 인증 정보가 포함된 secrets.toml 파일이 저장됩니다.
- app.py: 메인 Streamlit 스크립트입니다.
- .gitignore: Git에서 무시할 파일들이름대로, 프로젝트 커밋 시 무시됩니다.
- logo.png (선택 사항): 회사 로고가 있는 이미지로, 앱의 사이드바 메뉴 상단에 표시됩니다. 완전히 선택 사항이며, 저는 제 회사 SAVILA GAMES 로고를 표시하고 있습니다.
- requirements.txt: 앱을 실행하는 데 필요한 Python 종속성입니다.
- README.md: 프로젝트 설명

project_app_medium/
│
├── .streamlit/ # 일반 Streamlit 설정
│ └── secrets.toml # Google Sheets 연결에 필요한 인증 정보
├── app.py # 앱 코드
├── .gitignore
├── logo.png  
├── requirements.txt # Python 종속성
└── README.md

## Google Sheets 데이터베이스 설정

환경이 설정되었으니, Google Sheets 데이터베이스 구조를 만들어야 합니다. Google Sheets 앱을 열고 새 파일을 만들어주세요. 저는 프로젝트 데이터베이스라고 이름 지었습니다. 그리고 파일에 네 개의 탭을 만드세요. 첫 번째로 "users" 탭은 모든 사용자 로그인 자격 증명과 사용자 그룹 구성 정보를 포함할 것입니다. 이 탭의 정보를 사용하여 애플리케이션의 로그인 모듈을 만들 것입니다. 탭은 다음과 같은 열 구조여야 합니다:

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
| email                  | name    | last name | password  | group    |
|------------------------|---------|-----------|-----------|----------|
| john.doe@example.com   | John    | Doe       | Pass1234  | G1       |
| jane.smith@example.com | Jane    | Smith     | SecurePwd | G2       |
| alex.jones@example.com | Alex    | Jones     | MyPass789 | G1       |
| emma.brown@example.com | Emma    | Brown     | Emma12345 | G3       |
```

다음 탭은 “log” 탭입니다. 이 탭은 사용자가 제출한 작업의 과거 정보를 저장할 것입니다. 또한 랭킹 및 이력 제출 모듈의 로직을 위해서도 사용될 것입니다. 이 탭은 다음과 같은 열 구조를 가져야 합니다:

```js
| user                  | group     | time             | score |
|-----------------------|-----------|------------------|-------|
| john                  | G1        | 2024-06-17 10:00 | 0.85  |
| jane                  | G2        | 2024-06-17 11:00 | 0.72  |
| alex                  | G1        | 2024-06-17 12:00 | 0.90  |
| emma                  | G3        | 2024-06-17 13:00 | 0.65  |
```

다음 탭은 “test_data” 탭입니다. 이 탭은 학생들이 제출한 출력물의 품질을 평가하는 데 사용되는 실제 테스트 y 데이터를 포함할 것입니다. 이 튜토리얼에서는 Pima 데이터세트를 분할하고 마지막 78행을 테스트 데이터 세트로 선택할 것입니다. 이 탭은 이진 결과 데이터만 포함하며 다음과 같은 열 구조를 갖게 될 것입니다:

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
| y          |
|------------|
| 0          |
| 1          |
| 1          |
| 0          |
```

마지막으로 만들 표는 'configuration' 탭입니다. 이 탭에는 프로젝트에 대한 사용자 정의 가능한 매개변수가 포함될 것입니다. 이러한 매개변수에는 마감일과 팀 당 하루에 허용된 시도 횟수가 포함될 수 있습니다 (참고로, Kaggle은 팀 당 하루에 다섯 번의 시도를 허용합니다). 이 탭을 통해 프로젝트 특성을 동적으로 변경하여 서로 다른 학기에 쉽게 적용할 수 있습니다. "configuration" 탭은 하나의 행만 있고 다음과 같은 열 구조를 가져야 합니다:

```js
| deadline              | max_per_day     |
|-----------------------|-----------------|
| 2024-07-01 23:59      | 5               |
```

이 튜토리얼 프로젝트에서 사용된 구글 시트의 예제를 다음 링크를 클릭하여 다운로드하고 확인할 수 있습니다:

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

## 데이터 개인 정보 보호 및 보안

이것은 우리가 통제하고 우리 학생들만 이용할 수 있는 작은 프로젝트입니다. 그러나 학생들의 개인 정보에 대한 데이터 보안에 대해 주의를 기울여야 합니다. 만약 어떤 이유로인지 데이터베이스가 유출되어 사기꾼이나 악의적인 주체들의 손에 넘어간다면 상황은 어떨까요? 우리 학생들의 이름, 이메일 및 비밀번호에 접근할 수 있다면 그들을 위험에 빠트릴 수 있습니다. 그러므로, 이러한 상황이 발생해도 데이터가 이 악의적인 주체들에게는 의미가 없도록 보장해야 합니다.

최소 비용으로 이러한 시스템을 구현할 수 있는지 궁금해 할 수 있습니다. 이것이 해싱과 hashlib 라이브러리가 구원해줍니다.

해싱은 입력 데이터를 수학적 알고리즘을 사용하여 일정 크기의 문자열, 일반적으로 해시 코드로 변환하는 과정입니다. 데이터 무결성을 보장하고 빠른 데이터 검색을 용이하게 하며 민감한 정보를 안전하게 보관합니다. 사용 가능한 해싱 알고리즘은 무엇이 있을까요? 다행히 파이썬에는 hashlib를 포함해 여러 해싱 알고리즘을 제공하는 라이브러리가 함께 제공됩니다.

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

- MD5 (md5)
- SHA-1 (sha1)
- SHA-224 (sha224)
- SHA-256 (sha256)
- SHA-384 (sha384)
- SHA-512 (sha512)
- SHA-3 family (sha3_224, sha3_256, sha3_384, sha3_512)
- BLAKE2 family (blake2b, blake2s)

저희 튜토리얼에서는 hashlib에서 제공하는 사용 가능한 해싱 알고리즘 중 하나인 SHA-256을 사용하여 학생들의 이메일과 비밀번호를 해시 코드로 변환할 것입니다. 이 해시 코드는 데이터베이스에 저장될 것입니다. 이렇게 함으로써, 데이터베이스가 누출되더라도 그들의 데이터는 보호될 것입니다. 해싱의 장점은 해싱된 코드를 브루트 포스를 통해 원래 정보로 역으로 변환하는 것이 사실적으로 매우 어렵다는 사실에 있습니다. 이메일이 SHA-256을 사용하여 해싱된 경우, 이전 섹션의 이메일은 안전하고 해독 불가능한 것으로 됩니다.

```js
# 원본 이메일

['john.doe@example.com',
 'jane.smith@example.com',
 'alex.jones@example.com',
 'emma.brown@example.com']
```

```js
# 해싱된 이메일

['836f82db99121b3481011f16b49dfa5fbc714a0d1b1b9f784a1ebbbf5b39577f',
 'f2d1f1c853fd1f4be1eb5060eaae93066c877d069473795e31db5e70c4880859',
 '134318bc6349ad35d7e6b95123898eecdd437ad9b0c49cc4bdd66a811afc6909',
 'd41d9b2f5671358bc6faf79b7435b4a9805a72d012f06d4804815328f39aed1e']
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

인식하기가 꽤 어려운 게 아닌가요? 아래에서 데이터프레임과 열이 주어지면 지정된 열의 해시된 항목을 반환하는 함수를 찾을 수 있습니다. 이렇게 하면 데이터베이스 정보를 해싱하고 이 값을 온라인 구글 시트 데이터베이스에 저장할 수 있습니다.

```js
import hashlib

def hashit(df, column):
  return_list = []
  for data in df[column].tolist():
    hash_object = hashlib.sha256()
    hash_object.update(data.encode())
    return_list.append(hash_object.hexdigest())

  return return_list
```

일반적으로 생각할 수 있겠지만, 만약 유저들이 사용자 이름과 비밀번호를 알고 있다면 학생 중 한 명으로 사칭할 수 있을 거라고 생각할 수 있습니다. 그러나 이 상황은 이미 고려되었습니다. 학생들은 우리가 제공한 이메일 주소와 비밀번호로 앱에 로그인하지만, 실제 이메일과 암호를 로그인 화면에 입력합니다. 그런 다음 앱은 그들의 로그인 자겁을 가져와 SHA-256을 사용하여 이를 해싱한 후 해싱된 결과를 데이터베이스와 대조합니다.

따라서 데이터베이스가 유출되고 누군가 정보를 사용하여 로그인을 시도하더라도, 그것이 작동하지 않을 것입니다. 왜냐하면 그들의 입력이 다시 해싱되어 저장된 해시와 일치하지 않기 때문입니다. 아래의 코드와 출력 예시를 살펴봅시다.

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
비밀번호 = "password";
해시_객체.update(비밀번호.encode());
해싱된_비밀번호 = 해시_객체.hexdigest();

print(해싱된_비밀번호);
```

출력 결과:

```js
"5377a16433598554e4a73a61195dbddea9d9956a22df04c3127c698b0dcdee48";
```

이제 이미 해싱된 비밀번호를 다시 해싱하면 아래 코드와 같이 됩니다.

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
hash_object.update(hash_password.encode());
double_hash_password = hash_object.hexdigest();
print(double_hash_password);
```

다음과 같은 결과를 얻습니다:

```js
"dfd4bb46c954f3802c7c2385b1a6b625b3cf0b4ce6adf59d3eec711c293994bb";
```

이 두 암호가 일치하지 않는 것을 쉽게 확인할 수 있습니다. 이전에 해싱된 비밀번호를 다시 해싱하면 완전히 새로운 결과가 생성되는 것을 보실 수 있습니다.

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

## Google Sheets 연결 설정하기

연결을 설정하는 데 필요한 모든 지침은 st-gsheets-connection 패키지의 GitHub 리포지토리에서 찾을 수 있습니다. 함께 지침을 따라봅시다:

- Google 개발자 콘솔로 이동하여 새 프로젝트를 만듭니다. Google Cloud 아이콘 바로 옆에는 드롭다운 메뉴가 있습니다. 클릭한 다음 "새 프로젝트 만들기"를 클릭합니다. 프로젝트 이름은 자유롭게 지정할 수 있습니다; 저의 경우에는 project_app_medium로 지정하겠습니다.

![Alt text](https://miro.medium.com/v2/resize:fit:1200/1*cB8ePsTHYUxlcVs23UGd4w.gif)

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

- 이제 선택한 프로젝트로 두 가지 다른 API를 활성화해야 합니다: Google 드라이브 및 Google 시트. 페이지 상단의 검색 창에 "Google 드라이브"를 입력하고 API를 선택한 다음 "활성화"를 클릭하세요. Google 시트에 대해서도 동일한 단계를 반복하세요.

![이미지](https://miro.medium.com/v2/resize:fit:1200/1*qzHDsIgXl7UYbFpztJuBmg.gif)

- 프로젝트 API가 활성화된 상태에서 이제 이에 접근할 수 있는 기술 사용자를 생성해야 합니다. "자격 증명"을 클릭한 후 "자격 증명 생성"을 클릭하고 "서비스 계정" 옵션을 선택하세요. 기술 사용자에게 이름을 할당하세요. 저의 경우에는 "medium-project-google-sheets"로 이름을 지었습니다. 기술 사용자에게 "편집자" 역할을 할당하고 마지막으로 "완료"를 클릭하세요.

![이미지](https://miro.medium.com/v2/resize:fit:1200/1*q-X587bUfw893wKpAygU9w.gif)

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

- 기술 사용자가 생성되었으므로, 이 사용자의 자격 증명을 생성해야 합니다. 방금 만든 사용자를 클릭한 후 "Keys"를 클릭하고, "Add Key"를 클릭한 다음 "Create New Key"를 선택하십시오. JSON 옵션을 선택하고 "Done"을 클릭하세요. 그러면 앱에서 Google Sheets를 사용하는 데 필요한 모든 자격 증명이 포함된 JSON 파일이 자동으로 다운로드됩니다.

![이미지](https://miro.medium.com/v2/resize:fit:1200/1*-364Zn18VbaeLdU0uXMvaA.gif)

- 마지막 단계는 방금 다운로드한 자격 증명을 secrets.toml 파일에 저장하는 것입니다. 아직 수행하지 않았다면 프로젝트 폴더 안에 .streamlit이라는 새 폴더를 만드세요. 이 폴더 안에 secrets.toml이라는 새 파일을 생성하세요. 선택한 텍스트 편집기(예: VS Code)로 파일을 열고 아래 정보를 붙여넣으세요.

```js
# .streamlit/secrets.toml

[connections.gsheets]
spreadsheet = "<스프레드시트 이름 또는 URL>"
worksheet = "<워크시트 GID 또는 폴더 ID>" # 워크시트 GID는 공개 스프레드시트 URL을 사용할 때 사용되며, service_account를 사용할 때에는 폴더 ID로 선택됩니다.
type = "" # 공개 스프레드시트 URL을 사용할 때는 비워두세요. service_account를 사용할 때 -> type = "service_account"
project_id = ""
private_key_id = ""
private_key = ""
client_email = ""
client_id = ""
auth_uri = ""
token_uri = ""
auth_provider_x509_cert_url = ""
client_x509_cert_url = ""
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

- secrets.toml 파일의 각 요소를 Google에서 다운로드한 JSON 자격 증명 파일의 데이터로 대체하세요. "spreadsheet" 필드에는 프로젝트용으로 만든 Google 스프레드 시트 데이터베이스의 URL을 복사하세요. 그다음 JSON 파일에서 "client_email" 데이터를 복사하고 Google 스프레드 시트 데이터베이스로 이동하세요. 스프레드 시트에서 "공유"를 클릭한 다음 "client_email"을 텍스트 입력란에 붙여넣기하고, "편집자" 권한이 선택되어 있는지 확인한 후 "전송"을 클릭하세요.

이 모든 준비가 끝나면 이제 앱을 코딩할 준비가 되었습니다.

## 라이브러리, 상태 세션 변수 및 앱 구성

이제 앱에 필요한 라이브러리를 가져와 앱이 사용할 세션 상태 변수를 만들 것입니다. 대부분의 세션 상태 변수는 로그인 모듈과 관련이 있을 것입니다. Streamlit에서 세션 상태 변수는 세션 내의 다른 상호 작용 사이에서 정보를 저장합니다. 이 정보는 사용자 입력 또는 선택과 같은 상태를 유지하여 앱을 다시 실행할 때마다 유지하는 데 도움이 됩니다. 처음에는 이러한 변수를 빈 문자열로 설정하고 앱이 실행됨에 따라 업데이트될 것입니다. 우리의 특정 앱에서는 사용자 이름(학생 이메일을 사용), 비밀번호 및 사용자가 속한 그룹을 위한 상태 변수를 만들 것입니다. 또한 st.set_page_config() 메서드를 사용하여 페이지 제목과 페이지 아이콘(favicon)을 설정할 것입니다.

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
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import datetime
from pathlib import Path
import streamlit as st
from streamlit_option_menu import option_menu
from streamlit_extras.add_vertical_space import add_vertical_space
from streamlit_extras.stylable_container import stylable_container
from streamlit_gsheets import GSheetsConnection
from sklearn import metrics
import hashlib

if 'user_name' not in st.session_state:
    st.session_state['user_name'] = ''

if 'student_name' not in st.session_state:
    st.session_state['student_name'] = ''

if 'password' not in st.session_state:
    st.session_state['password'] = ''

if 'group' not in st.session_state:
    st.session_state['group'] = ''

st.set_page_config(
        page_title='Medium Project',
        page_icon='📈'
    )
```

작업이 정상적으로 진행되고 있는지 테스트하려면 다음 명령어를 터미널에서 실행하여 디렉토리 루트에서 애플리케이션을 실행할 수 있습니다. 이렇게 하면 로컬호스트에서 앱이 실행됩니다.

```js
streamlit run app.py
```

"Medium Project"라는 빈 페이지와 선택한 파비콘 📈이 표시된 Figure 8이 나타납니다.

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

<img src="/assets/img/2024-06-22-HowICreatedaKaggle-LikePlatformforMyStudentsUsingStreamlitandHowYouCanDoItasWell_3.png" />

## 로그인 모듈

이제 세션 상태 변수가 생성되었으니, 앱의 첫 번째 모듈인 로그인 모듈을 코드로 작성할 수 있습니다. 이 모듈은 Figure 9에 설명된 논리를 포함할 것입니다.

<img src="/assets/img/2024-06-22-HowICreatedaKaggle-LikePlatformforMyStudentsUsingStreamlitandHowYouCanDoItasWell_4.png" />

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

먼저, Google Sheets 데이터베이스와 연결을 설정할 것입니다. 그다음, st.sidebar 방법을 사용하여 옵션\_메뉴 방법과 결합하여 사이드바 내비게이션 메뉴를 만들어 앱의 다른 페이지를 쉽게 생성할 수 있게 할 것입니다. 이 설정이 완료되면 로그인 모듈의 로직을 구성할 것입니다.

사용자가 로그인되어 있지 않은 경우, 다음 모듈에 액세스하는 것을 방지할 것입니다. 로그인 모듈에서 사용자 이름(이메일)과 비밀번호를 요청할 것입니다. 이 자격 증명은 데이터베이스와 일치하는지 확인됩니다. 일치하는 경우, 사용자 자격 증명은 세션 상태 변수에 저장되고 사용자는 성공적인 로그인이 확인된 메시지를 받게 됩니다. 일치하지 않는 경우 사용자는 로그인에 실패했다는 경고 메시지를 받게 됩니다. 또한 데이터베이스로부터 프로젝트 구성 데이터(프로젝트 마감일 및 하루 최대 제출 횟수)를 저장할 것입니다. 위의 논리는 아래 코드를 따라 구현됩니다.

```js
테이블 태그를 마크다운 형식으로 변경하실 수 있습니다.'''
## 제출 결과 모듈
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

지금은 로그인 모듈이 준비되어 있으므로, 제출 모듈을 만들어 나갈 수 있습니다. 이 모듈에서는 학생들이 모델의 예측 결과를 담은 CSV 파일을 업로드할 수 있습니다. 이 모듈에는 Figure 10에 설명된 로직이 포함될 것입니다.

![Figure 10](/assets/img/2024-06-22-HowICreatedaKaggle-LikePlatformforMyStudentsUsingStreamlitandHowYouCanDoItasWell_5.png)

프로젝트 마감 기한이 지나지 않았고 해당 팀이 하루 최대 제출 횟수를 초과하지 않은 경우에만 학생들이 이 모듈에 접근할 수 있습니다 (앱 스팸 방지 및 테스트 데이터셋에 과적합되는 위험을 피하기 위함). 이 중 하나라도 만족하지 않는 경우, 학생은 해당 문제를 안내하는 경고를 받게 됩니다. 모든 조건이 충족된다면, 학생은 CSV 파일을 업로드하여 결과물을 제출할 수 있습니다. 파일의 형태가 요구 사항(테스트 데이터셋 크기와 동일한 행의 수, 그리고 "predictions"이라는 열이 포함)와 일치하는 경우 제출이 승인될 것입니다. 형태가 일치하지 않는 경우, 학생은 문제에 대한 자세한 내용을 담은 경고 메시지를 받게 됩니다.

모든 것이 일치하는 경우, 모듈은 모델 평가 지표를 계산할 것입니다. 이 특정 케이스에서는 정확도 점수를 사용하고 있지만 원하는 경우 F1 점수를 사용할 수도 있습니다. 코드를 쉽게 수정할 수 있습니다. 이 작업을 마친 후, 모듈은 학생의 제출을 구글 시트 데이터베이스의 "log" 탭에 저장할 것입니다. 위의 로직은 아래의 코드를 따라 구현될 것입니다.

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
if selected == '결과 제출':

  st.markdown("""
      <style>
      div[data-testid="stMetric"] {
          background-color: #EEEEEE;
          border: 2px solid #CCCCCC;
          padding: 5% 5% 5% 10%;
          border-radius: 5px;
          overflow-wrap: break-word;
      }
      </style>
      """
      , unsafe_allow_html=True)

  st.header('예측 결과 제출')
  st.subheader("머신러닝 분류")
  st.divider()
  st.subheader(f" 남은 시간: {days} 일, {hours} 시간 및 {minutes} 분")
  st.divider()

  if st.session_state['user_name'] == '':
      st.warning('프로젝트 솔루션을 제출하려면 로그인하세요')
  else:

      group_log_df = conn.read(worksheet="log", usecols=list(range(log_df_n_cols)), ttl=1).dropna(how="all")
      group_log_df = group_log_df[group_log_df['group'] == st.session_state['group']]
      group_log_df['time'] = pd.to_datetime(group_log_df['time'])

      test_data = conn.read(worksheet="test_data", usecols=list(range(1)), ttl=30).dropna(how="all")
      test_data_y = test_data['y']

      n_test = len(test_data)

      current_date = pd.Timestamp.today()

      submissions_count = group_log_df[(group_log_df['time'].dt.date == current_date.date())].shape[0]

      time_diff = deadline - current_date
      time_diff = time_diff.dt.total_seconds().iloc[0]


      if time_diff <= 0:
          st.warning('죄송합니다. 이미 마감된 프로젝트 기한으로 더 이상 제출할 수 없습니다')
      else:
          if submissions_count >= max_per_day:
              st.warning(f'죄송합니다. 팀이 하루에 {submissions_count}번 이미 제출하여 하루 제출 한계를 초과했습니다')
          else:

              user_file = st.file_uploader("예측 파일을 업로드하세요",type=['csv'])
              st.caption(f"당신의 파일은 'predictions'라는 적어도 하나의 열과 {n_test}개의 행이 필요합니다")

              if user_file is not None:

                  submit_pred = st.button('제출',type="primary",key="submit_pred")

                  if submit_pred:

                      pred_df = pd.read_csv(user_file)

                      if 'predictions' not in pred_df.columns.to_list():
                          st.error('죄송합니다. 파일에 "predictions" 열이 없습니다', icon="🚨")
                      elif len(pred_df) != n_test:
                          st.error(f'죄송합니다. 파일의 행 수({len(pred_df)})가 예상 길이({n_test})와 일치하지 않습니다', icon="🚨")
                      else:
                          with st.spinner('소금 구륗기 해결책 데이터베이스에 업로드 중'):
                              user_predictions = pred_df['predictions']

                              timestamp = datetime.datetime.now()
                              timestamp = timestamp.strftime("%d/%m/%Y, %H:%M:%S")
                              st.write(f'제출일: {timestamp}')

                              ACC = metrics.accuracy_score(test_data_y,user_predictions)

                              F1 = metrics.f1_score(test_data_y,user_predictions)

                              cm = pd.DataFrame(metrics.confusion_matrix(test_data_y,user_predictions),
                                              columns = ["T 예측","F 예측"],index=["T 실제","F 실제"])

                              columns_part_2 = st.columns(3)

                              with columns_part_2[0]:
                                  st.metric("정확도",f"{100*ACC:.1f} %")
                              with columns_part_2[1]:
                                  st.metric("F1-점수",f'{F1:.3f}')

                              with columns_part_2[2]:
                                  st.dataframe(cm,use_container_width=True)

                              solution_dict = dict()
                              solution_dict['user'] = st.session_state['student_name']
                              solution_dict['group'] = st.session_state['group']
                              solution_dict['time'] = timestamp
                              solution_dict['score'] = ACC

                              logs_df_2 = conn.read(worksheet="log", usecols=list(range(log_df_n_cols)), ttl=1).dropna(how="all")
                              solution_2 = pd.DataFrame([solution_dict])
                              updated_log_2 = pd.concat([logs_df_2,solution_2],ignore_index=True)
                              conn.update(worksheet="log",data = updated_log_2)
                              st.success(f'당신의 솔루션이 {timestamp}에 업로드되었습니다',icon="✅")
                              st.balloons()
```

## 동적 랭킹 모듈

로그인한 사용자가 이미 솔루션을 제출할 수 있는 앱을 보유하고 있습니다. 이제 앱의 게임화 요소를 추가하여 학생들이 다른 팀이 제출한 솔루션과 어떻게 비교되는지 보여주는 동적 랭킹을 만들어야 합니다. 이 모듈의 논리는 간단하며 다이어그램이 필요하지 않습니다. 기본적으로 구글 시트 데이터베이스의 "log" 탭에서 모든 데이터를 수집하고, 각 팀의 최상의 점수를 찾아내어 이 점수를 테이블로 제공해야 합니다. 최고 점수를 가진 팀이 최상위 위치에 있고, 그래로 이어지며 동일한 점수를 가진 두 개 이상의 팀이 있는 경우, 앱은 더 빨리 솔루션을 제출한 팀에 대해 더 높은 순위를 부여할 것입니다. 위의 논리는 아래 코드를 따라 구현될 것입니다.

```js
if selected == "순위":
    st.header('순위')

    if st.session_state['user_name'] == '':
        st.warning('랭킹을 확인하려면 로그인하세요')
    else:
        st.write('아래 테이블에 프로젝트의 순위가 표시됩니다')

        rank_df = conn.read(worksheet="log", usecols=list(range(log_df_n_cols)), ttl=1).dropna(how="all")
        GROUPS = list(rank_df['group'].unique())
        default_time = pd.to_datetime('01/01/1901, 00:00:00')

        st.header("머신러닝 분류 부분")
        st.divider()

        ranking_list_2 = []
        for gr in GROUPS:

            mini_df_2 = rank_df[rank_df['group'] == gr]
            if len(mini_df_2) == 0:
                row = {'group':gr,'정확도':0,'time':default_time}
                ranking_list_2.append(row)
                continue
            else:
                best_idx_2 = np.argmax(mini_df_2['score'])
                best_value_2 = mini_df_2.iat[best_idx_2,-1]
                best_time_2 = pd.to_datetime(mini_df_2.iat[best_idx_2,2])
                row = {'group':gr,'정확도':best_value_2,'time':best_time_2}
                ranking_list_2.append(row)
        ranking_df_2 = pd.DataFrame(ranking_list_2).sort_values(by = ['정확도','time'],ascending=[False, True])
        ranking_df_2 = ranking_df_2.reset_index(drop=True)
        ranking_df_2.iat[0,0] = ranking_df_2.iat[0,0] + "   🥇"
        ranking_df_2.iat[1,0] = ranking_df_2.iat[1,0] + "   🥈"
        ranking_df_2.iat[2,0] = ranking_df_2.iat[2,0] + "   🥉"
        st.dataframe(ranking_df_2,use_container_width=True,hide_index=True)
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

## 제출 로그 모듈

마지막에 구현할 모듈은 제출 로그 모듈입니다. 이 모듈을 통해 각 학생은 프로젝트 기간 동안 자신과 팀원이 제출한 모든 제출물에 대한 이력 로그에 액세스할 수 있습니다. 이 모듈의 논리는 간단하며 다이어그램이 필요하지 않습니다. 우리는 Google Sheets 데이터베이스의 "log" 탭에서 모든 데이터를 수집하고, 현재 사용자 그룹에 대해 필터링한 후 정보를 테이블 형식으로 제시해야 합니다. 위의 논리는 아래 코드를 따라 구현될 것입니다.

```js
if selected == '내 그룹 제출물':
    st.header('내 그룹 제출물')

    if st.session_state['user_name'] == '':
        st.warning('제출 이력을 확인하려면 로그인해주세요')
    else:
        st.write(f'아래 테이블은 당신의 그룹인 **{st.session_state["group"]}**의 제출 이력을 보여줍니다.')
        group_log_df = conn.read(worksheet="log", usecols=list(range(log_df_n_cols)), ttl=1).dropna(how="all")
        group_log_df = group_log_df[group_log_df['group'] == st.session_state['group']]
        group_log_df = group_log_df[['user','time','score']]


        st.subheader('제출 이력:')
        st.dataframe(group_log_df,use_container_width=True,hide_index=True)
```

마지막 모듈을 코드화하면 앱이 완료됩니다. 전체 코드는 아래 링크에서 찾을 수 있습니다.

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

## 앱 배포

지금까지 우리 앱은 로컬에서 매끄럽게 실행되었습니다. 그러나 이를 구축한 주요 목적은 여러분의 학생들과 그들의 최종 프로젝트에 사용하기 위함입니다. 이제 배포가 중요해집니다. 이 프로젝트에서는 Streamlit Community Cloud를 사용하여 앱을 배포하기로 결정했습니다. 무료이며 쉽게 사용할 수 있습니다. 이 서비스는 GitHub을 사용하여 앱을 배포하는데, 유일한 단점은 GitHub 리포지토리가 공개되어야 한다는 것입니다. 따라서 Google에서 다운로드한 기술 사용자 자격 증명과 같은 민감한 정보를 업로드하지 않도록 주의해야 합니다. 이 정보는 Streamlit Community Cloud 서비스 내에서 직접 관리될 것이므로 걱정하지 마세요. 다른 배포 옵션을 살펴보고 싶다면 Damian Boh가 작성한 훌륭한 아래 기사를 읽어보기를 권장합니다.

우리 앱을 배포하려면 다음 단계를 따라주세요:

- 새로운 공개 GitHub 리포지토리를 만듭니다. README.md 파일은 리포를 만들 때 직접 생성할 수 있습니다.
- 아래 파일을 업로드하거나 커밋하되, 반드시 secrets.toml 파일은 업로드하지 않습니다:

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

- app.py
- requirements.txt
- logo.png (옵션, 대학 로고 또는 회사 로고로 앱을 사용자 정의하고 싶을 때)

당신의 저장소는 Figure 11과 유사해야 합니다.

![Figure 11](/assets/img/2024-06-22-HowICreatedaKaggle-LikePlatformforMyStudentsUsingStreamlitandHowYouCanDoItasWell_6.png)

3. Streamlit Community Cloud 사이트 https://streamlit.io/cloud 에 가서 로그인합니다. 계정이 없다면 계정을 생성합니다.

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

4. 한 번 사인 인했으면 사이트 오른쪽 상단에 있는 "앱 생성" 버튼을 클릭하고, 그런 다음 GitHub에서 앱 코드를 가져올 옵션을 선택합니다.

5. 앱 파일을 포함하는 레포의 이름을 입력하고, 기본 브랜치를 선택하고, Python 파일의 이름을 입력하세요 (우리의 경우 app.py). 또한 앱 URL 이름을 사용자 정의할 수 있습니다; medium-kaggle-like-app을 선택했습니다. 폼은 Figure 12와 비슷해야 합니다.

![Figure 12](/assets/img/2024-06-22-HowICreatedaKaggle-LikePlatformforMyStudentsUsingStreamlitandHowYouCanDoItasWell_7.png)

6. "배포" 버튼을 클릭하세요. 몇 분 정도 걸릴 수 있습니다.

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

7. 앱을 배포하면 즉시 Streamlit에서 오류 메시지를 받게 됩니다. 그림 13에서 보는 것처럼요. 이것은 완전히 정상적인 현상입니다. 배포된 앱은 기술 사용자 자격 증명에 액세스할 수 없기 때문에 GitHub에 secrets.toml 파일을 업로드하지 않았거든요. 하지만 걱정하지 마세요. 다음 단계에서 이 오류를 해결할 거예요.

![이미지](/assets/img/2024-06-22-HowICreatedaKaggle-LikePlatformforMyStudentsUsingStreamlitandHowYouCanDoItasWell_8.png)

8. 페이지 오른쪽 아래 구석에 "앱 관리"라는 메뉴가 있습니다. 클릭하고, 샌드위치 메뉴를 열어 "설정"을 선택한 다음 "Secrets"를 선택하고 secrets.toml 파일의 내용을 그곳에 복사해주세요. 앱이 자동으로 다시 시작되고 정상적으로 작동해야 할 거예요.

![이미지](https://miro.medium.com/v2/resize:fit:1200/1*IAqyQoKrSUpH1a4C7nG8RQ.gif)

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

아래 링크를 클릭하여 최종 배포된 앱을 확인할 수 있어요. john.doe@example.com을 사용하여 계정에 로그인하고, 패스워드는 pass1234입니다. 이 프로젝트의 GitHub 저장소에는 결과물로 제출할 수 있는 .csv 파일이 포함되어 있어요.

# 실제 적용 결과

이 튜토리얼의 프레임워크를 활용하여, 저는 제가 석사생들에게 가르치는 파이썬 금융 수업의 최종 프로젝트를 게임화했어요. 솔직히 말해서, 이 프로젝트에 대한 제 기대는 저조했어요. 각 팀이 프로젝트 기한 내에 플랫폼과 최소한 두 번 이상 상호 작용할 것을 기대했기 때문에, 7개팀과 3개 프로젝트 섹션 전체에서 50-60회의 상호 작용이 이루어지면 성공으로 간주될 것이었죠.

그러나 학생들은 제게 인도자로서 받을 수 있는 최고의 선물 중 하나를 주었어요. 한 달 후에 앱은 690회 이상의 제출을 받았는데, 제 초기 기대의 거의 12배에 달하는 수치였죠. 이 수준의 참여는 저에게 있어서 전례가 없었어요. 각 그룹은 프로젝트 섹션 당 평균 30회 이상의 제출을 제출했는데, 이는 섹션 당 거의 하루에 한 번의 제출에 해당했어요. 첫 제출과 각 섹션 및 팀의 최고 제출을 비교했을 때, 평균적으로 21%의 개선이 있었고, 일부 팀은 제출물을 60% 이상 개선했어요. 일반적인 버전의 프로젝트를 게임화된 버전 대신에 구현했다면, 이 수준의 개선은 실현되지 않았을 것으로 생각돼요. 이는 게임화의 힘을 입증하는 것이에요. 이제 이 앱을 교실에서 쉽게 구현할 수 있고, 모든 것이 무료에요. 멋지죠, 그렇지 않나요?

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

게임화에 대해 더 많이 알고 싶다면, 내 이전 글을 꼭 읽어보세요. 그 글에서는 게임화의 논리와 참여 및 학습을 촉진하는 방법에 대해 논의했습니다.

# 결론

이 글은 Streamlit을 사용하여 Google Sheets와 통합하여 CRUD 앱을 만드는 전체 과정을 안내했습니다. 이 앱은 학생들을 위한 기계 학습 프로젝트에 게임 요소를 도입하는 데 사용할 수 있습니다. 또한 Streamlit Community Cloud 서비스를 사용하여 앱을 배포하는 방법도 보여드렸습니다. 이 코드는 매우 유연하며 기계 학습 프로젝트에만 국한되지 않습니다. 저는 이를 제 프로젝트 예약 수업 중 하나에 적용하고 탁월한 결과를 얻었습니다.

아래 게시글에서 Bruno Scalia C. F. Leite는 Streamlit을 사용하여 물류 앱을 배포하는 방법에 대해 소개합니다. Streamlit을 사용하여 운영 연구 애플리케이션을 만드는 방법에 대해 알고 싶다면 아래 링크를 통해 그의 글을 확인해보세요.

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

이 글이 유익하고 즐거웠기를 진심으로 바랍니다. 그렇다면 귀하의 생각을 듣고 싶어요! 댓글을 남기거나 👏로 감사를 표현해 주시면 감사하겠습니다. 최신 기사 업데이트를 받고 싶다면 저를 Medium에서 팔로우해 주세요. 여러분의 지원과 피드백이 제게 지속적인 탐구와 공유를 이끄는 원동력이 되어요. 읽어 주셔서 감사합니다. 다음 글에서 더 많은 통찰을 기대해 주세요!

# 참고 자료

- Python 및 Streamlit으로 Google Sheets 데이터 입력 폼 만들기 | 빠르고 쉬운 튜토리얼 : https://www.youtube.com/watch?v=_G5f7og_Dpo&t=66s
- 학생 그룹 프로젝트를 개선하는 방법: 게이미피케이션 기법으로 학습 향상 : https://medium.com/@luisfernandopa1212/transforming-group-projects-enhancing-learning-with-gamification-techniques-81e2ba2e02ff
- 운영 연구 솔루션 설계: Streamlit을 활용한 사용자 친화적 라우팅 애플리케이션 : https://medium.com/towards-data-science/designing-operations-research-solutions-a-user-friendly-routing-application-with-streamlit-17212553861d
- Streamlit 웹 앱 온라인으로 쉽게 배포하는 방법 3가지 : https://towardsdatascience.com/3-easy-ways-to-deploy-your-streamlit-web-app-online-7c88bb1024b1
- Penard, Wouter; van Werkhoven, Tim. “보안 해시 알고리즘 패밀리에 대해”. staff.science.uu.nl. 2016–03–30.
- 연방 등록 호시즈 02–21599, FIPS 게시물 180–2 승인 공지.
