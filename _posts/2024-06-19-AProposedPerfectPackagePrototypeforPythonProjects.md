---
title: "파이썬 프로젝트를 위한 완벽한 패키지 프로토 타입 제안"
description: ""
coverImage: "/assets/img/2024-06-19-AProposedPerfectPackagePrototypeforPythonProjects_0.png"
date: 2024-06-19 23:20
ogImage:
  url: /assets/img/2024-06-19-AProposedPerfectPackagePrototypeforPythonProjects_0.png
tag: Tech
originalTitle: "A Proposed Perfect Package Prototype for Python Projects"
link: "https://medium.com/towards-data-science/a-proposed-perfect-package-prototype-for-python-projects-cf7c2e89c611"
isUpdated: true
---

<img src="/assets/img/2024-06-19-AProposedPerfectPackagePrototypeforPythonProjects_0.png" />

# 소개

Python 패키지의 구조를 세울 때 고려해야 할 많은 옵션이 있고 많은 결정을 내려야 합니다. 그러나 한 번 디자인 선택사항을 결정하면 기본적인 구조적 변경을 만들기가 매우 어려워집니다.

또한 사용자가 자신의 프로젝트에 네임스페이스를 포함하기 시작했다면, 어떠한 변경을 가하더라도 그 사용자가 소스 코드를 변경해야 할 필요가 생깁니다.

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

그러므로 처음에 꾸미고 배치 결정을 잘 내리는 것이 매우 중요합니다.

## 문제

파이썬 패키지를 구성하는데 여러 옵션이 많기 때문에 적절한 디자인을 찾거나 적어도 나중에 문제를 일으키지 않을 디자인을 찾는 것이 어려울 수 있습니다.

## 기회

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

일반 패키지 레이아웃을 구성하고 모든 도전 과제를 해결하는 데 필요한 스켈레톤 프로젝트에서 프로토타입을 구축할 수 있다면, 앞으로 패키지를 만드는 것은 빠르고 간단한 복사 및 붙여넣기만으로 완료될 것입니다.

## 앞으로의 계획

제안된 완벽한 패키지 프로토타입에 대한 요구 사항을 설정한 다음, 모든 이러한 요구 사항을 해결하는 표준 프로젝트 구조를 생성할 수 있습니다.

# 배경

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

여러 해 동안 많은 파이썬 패키지를 작성해 왔고, 프로젝트 구조를 각각 실험하고 수정하여 완벽한 구조를 찾으려 했지만, 항상 어느 한 측면에서는 불완전한 상태였습니다.

그로 인해 완벽한 패키지 구조에 대한 요구 사항을 작성하고, 모든 원하는 것을 이루기 위한 방법을 찾기 위해 연구에 착수했습니다.

# 요구 사항

- 인기 있는 전문 패키지의 네임 스페이스 관례를 모방해야 합니다 (예: statsmodels.regression.linear_model에서 RegressionResultsWrapper를 가져옵니다).
- 코드와 클래스를 잘 구조화된 폴더 및 파일 세트로 구성해야 합니다.
- 패키지 사용자에게 노출되는 네임스페이스가 statsmodels.regression.linear_model과 같이 잘 지어진 체계를 반영해야 하며, 폴더와 파일 이름을 철저하게 따라서는 안 됩니다.
- 하위 폴더의 클래스가 다른 하위 폴더 및 폴더 계층구조 상위 폴더의 클래스를 참조하고 액세스할 수 있어야 합니다.
- 패키지 코드를 개발하고 테스트할 수 있는 Jupyter 노트북이 포함된 최상위 폴더를 포함해야 합니다.
- 패키지의 모든 코드 및 클래스를 발견할 수 있는하위 폴더로 구성된 단위 테스트가 포함된 최상위 폴더를 포함해야 합니다.
- 모든 패키지 폴더와 하위 폴더의 클래스 docstring에서 자동으로 생성된 문서가 포함된 최상위 폴더를 포함해야 합니다.
- Jupyter 노트북, 단위 테스트 및 패키지에 접근하는 다른 프로젝트에서 패키지 위치를 하드 코딩하는 것을 피해야 합니다.

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

# 솔루션이 작동하는 것을 증명하기

솔루션을 증명하기 위해 2개의 테스트 클래스를 포함하는 빈 프로젝트 템플릿 또는 스켈레톤을 만들었습니다 -

- class BaseLearner()는 알고리즘 클래스 집합을 위한 베이스 클래스로 설계된 가상의 클래스입니다.
- class Fisher(BaseLearner)는 "Fisher" 알고리즘 코드를 포함할 가상의 클래스로, 이 클래스는 BaseLearner(폴더 구조의 완전히 다른 부분에 위치한)를 상속받는 것이 목적입니다.

# 뒤의 시작하기

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

모든 요구 사항을 해결하고 두 개의 테스트 클래스에 대한 개요를 제공하는 완료된 프로젝트/패키지 구조 미리보기입니다 (Fisher 클래스가 fisher_file.py에 포함되어 있고 BaseLearner 클래스가 base_file.py에 포함되어 있는 것을 알립니다)

![이미지](/assets/img/2024-06-19-AProposedPerfectPackagePrototypeforPythonProjects_1.png)

# 그렇다면 큰 문제는 무엇인가요?

이 구조는 모든 요구 사항을 해결했을 것으로 보이지만, 이 구조에는 주의할 필요가 있는 몇 가지 근본적인 문제가 있습니다...

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

# 네이밍 규칙

주어진 패키지 레이아웃에 따라 BaseLearner를 가져오기 위한 코드는 다음과 같습니다.

```python
from common.base_file import BaseLearner
```

원하는 가져오기는 다음과 같습니다.

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

ghpackage.common 모듈에서 BaseLearner를 가져왔습니다.

따라서 이 패키지를 사용하는 사람들이 사용하는 네이밍 규칙이 직관적이지 않고 statsmodels.regression.linear_model에서 사용하는 표준과 일치하지 않을 수 있습니다.

# 상대 및 절대 참조

fisher_file.py에서는 ghtestpackage.common 모듈의 BaseLearner를 불러오는 코드가 작동하지 않을 것입니다. 왜냐하면 현재 위치에서 상대적인 참조를 사용했기 때문입니다. 즉, ghtestpackage.common 모듈에서 BaseLearner를 해결하려는 시도는 algorithms.ghtestpackage.common에서 BaseLearner를 찾지 못할 것입니다.

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

# 큰 문제가 있어요

그 문제는 더 심각해지고 있어요. 다양한 요구 사항을 통합하려고 하면서 이 패키지는 한꺼번에 3가지 역할을 수행하려고 노력하고 있어요:

- 외부에서 참조할 수 있는 패키지.
- Jupyter 노트북을 실행하는 환경.
- pytest 단위 테스트를 실행하는 환경.

문제는, 이 3가지 다른 사용 사례가 서로 다른 방식으로 실행되며 다른 상대적인 위치에서 실행을 시작한다는 것이 거의 불가능하다는 것이에요.

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

패키지가 Python 프로그램으로 가져올 때, 해당 패키지의 시작 지점은 부모 폴더입니다. 다음 시스템 경로를 고려하면 확인할 수 있습니다...

```js
[
  "c:\\Users\\GHarr\\OneDrive\\Python Projects\\Public-Github\\Package Structure",
  "c:\\Users\\GHarr\\anaconda3\\envs\\project-env\\python310.zip",
  "c:\\Users\\GHarr\\anaconda3\\envs\\project-env\\DLLs",
  "c:\\Users\\GHarr\\anaconda3\\envs\\project-env\\lib",
  "c:\\Users\\GHarr\\anaconda3\\envs\\project-env",
  "",
  "C:\\Users\\GHarr\\AppData\\Roaming\\Python\\Python310\\site-packages",
  "c:\\Users\\GHarr\\anaconda3\\envs\\project-env\\lib\\site-packages",
  "C:\\Users\\GHarr\\OneDrive\\Python Projects\\Packages",
  "c:\\Users\\GHarr\\anaconda3\\envs\\project-env\\lib\\site-packages\\win32",
  "c:\\Users\\GHarr\\anaconda3\\envs\\project-env\\lib\\site-packages\\win32\\lib",
  "c:\\Users\\GHarr\\anaconda3\\envs\\project-env\\lib\\site-packages\\Pythonwin",
];
```

저는 현재 Anaconda를 사용 중이며, project-env 채널을 선택한 상태입니다. 경로에서 알 수 있듯이, **site-packages**가 **c:\\Users\\GHarr\\anaconda3\\envs\\project-env\\lib\\site-packages**에 위치하고 있습니다.

Anaconda에서 CMD.exe 프롬프트를 실행하고 **site-packages** 폴더의 디렉토리를 나열하여 쉽게 확인할 수 있습니다...

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

![이미지](/assets/img/2024-06-19-AProposedPerfectPackagePrototypeforPythonProjects_2.png)

프로그램이 pandas에서 DataFrame을 가져오는 것과 같이 import를 실행할 때, 참조는 C:\Users\GHarr\anaconda3\envs\project-env\Lib\site-packages에서 시작되며 DataFrame이 포함 된 pandas라는 이름의 디렉토리를 찾을 것으로 예상합니다.

주피터 노트북은 다르게 동작합니다. 그들의 "홈" 위치(또는 시작 실행 경로)는 .ipynb 소스 파일을 포함하는 폴더이며, 참조는 주피터 노트북에서 상대적으로(및 아래로) 진행됩니다.

마지막으로 Visual Studio Code에서의 pytest 단위 테스트는 다시 다르게 동작합니다. VS Code 안에서 pytest 단위 테스트의 홈 / 실행 경로는 프로젝트의 루트 폴더입니다.

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

요약하면 다음과 같습니다...

- 참조된 패키지는 프로젝트 폴더의 상위를 기준으로 상대적인 경로를 참조합니다.
- Jupyter Notebook은 노트북을 포함하는 폴더를 기준으로 상대적인 경로를 참조합니다.
- pytest 유닛 테스트는 프로젝트의 루트 폴더를 기준으로 상대적인 경로를 참조합니다.

# 큰 문제 해결하기

오랫동안 이 난제에 대한 유일한 해결책은 내 패키지에서 가져와야 하는 프로젝트의 import 코드에 직접 경로를 삽입하는 것이었습니다...

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

이 방법은 작동하지만 일부 심각한 단점이 있습니다.

먼저 이 코드를 실행하는 데 매우 느립니다. 프로젝트가 처음으로 로드되고 VS Code에서 실행될 때, 외부 참조를 해결하고 가져오기를 처리하는 데, 꽤 좋은 i7 프로세서를 사용해도 52초가 걸립니다.

다음 단점은 ghlibrary 프로젝트가 구조가 잘못되었다는 것입니다.

예를 들어, dag_tools.py 및 causal_tools.py가 ghlibrary의 루트에 직접 존재하며 위치를 변경하는 옵션이 제한되어 있습니다. 따라서 시간이 지남에 따라 이러한 소스 파일이 커졌고, VS Code는 린팅, 도구 팁 및 기타 기능을 처리하는 데 느려졌습니다.

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

테이블 태그를 Markdown 형식으로 변경해주세요.

또한, 패키지에 액세스하는 모든 프로젝트에 경로를 추가하는 코드도 포함되어야 하며, 실제로 패키지 위치를 하드코딩해야 합니다. 이 코드는 구성 파일로 옮길 수 있지만, 여러 프로젝트가 패키지에 액세스하고 패키지가 이동한다면 모두 업데이트해야 합니다.

마지막으로, 이 접근 방식을 취하는 것은 패키지를 더 넓은 Python 커뮤니티에 배포하는 옵션을 방지한다는 가장 큰 단점입니다.

홈/실행 폴더는 부모 폴더가 아닌 패키지 폴더이므로 pandas나 pgmpy와는 다르게 작동합니다. 그 이상으로, Python 커뮤니티가 수동 참조 코드를 포함하고 처리 시간이 느려진다는 것을 기대하는 것은 합리적이지 않습니다.

더 나은 대안이 필요합니다.

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

사이트 패키지의 경로는 sys.path를 실행하여 쉽게 식별할 수 있습니다. 이미 제 컴퓨터에서는 C:\Users\GHarr\anaconda3\envs\project-env\lib\site-packages임을 확인했습니다.

파일 이름과 .pth 확장자가 붙은 파일을 생성한 다음, 해당 파일을 site-packages 폴더에 저장하면 Anaconda가 자동으로 읽어 시작 시 삽입할 패키지 경로를 추가할 수 있습니다.

여기에 제 .pth 파일이 어떻게 생겼는지 알려드리겠습니다...

![링크명](/assets/img/2024-06-19-AProposedPerfectPackagePrototypeforPythonProjects_3.png)

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

이 의미는 만약 ghtestpackage가 C:\Users\GHarr\OneDrive\Python Projects\Packages의 하위 폴더로 생성된다면, 모든 Python 프로젝트의 검색 경로에 자동으로 포함되며 그 안에 포함된 모든 파일 및 클래스를 참조하고 가져올 수 있게 됩니다…

- 한 번에 특정 경로를 모든 프로젝트에 하드 코딩할 필요가 사라집니다.
- 또한, 컴퓨터 전체에서 Packages 경로에 대한 단일 참조만 있기 때문에 pandas 및 기타 인기 있는 패키지와 완전히 동일한 방식으로 작동합니다.
- 만약 이 패키지가 GitHub을 통해 분산되고 pip 사용자가 이를 사이트 패키지 폴더에 다운로드한다면 계속해서 작동할 것입니다.

모든 이러한 것들이 한 줄의 코드를 한 파일에 추가함으로써 해결됩니다!

큰 문제가 해결되면 나머지 요구사항을 달성하는 것이 훨씬 쉬워질 것입니다.

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

# 남은 문제 해결하기

## 패키지를 서브 폴더와 파일로 구성하기

제가 소스 파일을 base_file.py 및 fisher_file.py로 명명하고 서브 폴더를 base_folder 및 fisher_folder로 명명한 것을 알아채셨을지도 모릅니다.

소스 파일을 서브 폴더와 파일로 구성해야 하지만, 반대로 가져오기(import)할 때 이러한 이름을 사용하고 싶지는 않을 것입니다.

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

예를 들어, 다음과 같이 import하는 것은 너무 길고 직관적이지 않습니다.

from ghlibrary.algorithms.fisher_folder.fisher_file import Fisher

더 나은 import 방법은 다음과 같습니다.

from ghlibrary.algorithms import Fisher

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

하지만 코드를 폴더 및 파일로 계층적으로 분할하는 유연성과 패키지의 소비자에게 표시되는 가져오기를 여전히 제어할 수도 있습니다. 이것은 패키지 각 수준에 있는 **init**.py 파일을 통해 이루어집니다.

ghpackage\algorithms\fisher_folder부터 시작합니다. 여기에 있는 **init**.py 파일은 다음과 같습니다.

```python
from .fisher_file import Fisher
```

이는 전처리기에게 현재 폴더의 fisher_file.py를 찾도록 지시합니다. ( .은 현재 폴더에 대한 표기법입니다.) 그리고 Fisher 클래스는 이제 fisher_file이 아닌 fisher_folder에 직접 존재하며 해당 폴더에서 참조할 수 있습니다.

이 시점에서 가져오기를 from ghlibrary.algorithms.fisher_folder import Fisher로 단축시킬 수 있으나 더 나은 방법이지만 완벽하지는 않습니다.

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

다음 단계는 알고리즘 폴더에 다음과 같이 **init**.py를 제공하는 것입니다...

이전 단계에서 fisher_folder에 추가한 참조를 취하고, 이를 알고리즘 폴더에서 사용할 수 있도록 만듭니다.

from .fisher_folder import Fisher은 전처리기에게 현재 폴더에서 시작 (.은 여기에서 시작하라는 뜻이며, algorithms에서 시작) 하고 fisher_folder로 한 수준 아래로 이동하여 Fisher 클래스를 가져오도록 지시합니다.

패키지를 사용하는 소비자는 이제 다음을 사용할 수 있습니다 -

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

ghlibrary.algorithms에서 Fisher를 가져와주세요.

베이스 클래스를 마무리하기 위해서 동일한 처리가 필요합니다.

ghpackage\common 하위 폴더의 **init**.py 파일은 다음과 같습니다...

그리고 common 폴더에 추가 하위 폴더가 없기 때문에 그게 전부입니다.

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

소비자 분들은 다음과 같이 참조할 수 있어요...

```python
from ghpackage.common import BaseLearner
```

... 심지어 BaseLearner 클래스가 base_file.py에 저장되어 있는 경우에도요.

하위 폴더와 파일로 계층적으로 구성된 프로젝트 클래스들은 이제 클라이언트가 다음과 같이 참조할 수 있어요...

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

아직 풀지 않은 수수께끼가 하나 있습니다. Fisher 클래스의 소스 코드를 살펴보십시오...

문제는 Fisher()가 ghtestpackage/algorithms/fisher_folder/fisher_file.py에 있고 ghtestpackage.common에서 from ghtestpackage.common import BaseLearner를 사용하여 BaseLearner를 가져오는 방법입니다.

BaseLearner는 ghtestpackage/common/base_file.py에 위치해 있고 따라서 ghtestpackage.common에서 from ghtestpackage.common import BaseLearner를 사용하는 것은 동작하지 않아야 합니다.

동작하는 이유는 .pth 파일을 사용하여 Anaconda에 C:\Users\GHarr\anaconda3\envs\project-env\lib\site-packages를 포함하도록 알려주었기 때문입니다. 이 경로는 ghtestpackage의 상위 폴더입니다. 따라서 ghtestpackage.common에서 BaseLearner를 참조하는 것은 패키지의 상위 폴더에서 해결됩니다.

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

이 단계에서는 "완벽한 패키지 프로토타입"이 생성되었고, 남은 일은 그것이 예상대로 작동하는지 증명하기 위해 철저히 테스트하는 것입니다.

# 완벽한 패키지 프로토타입 테스트

증명 및 테스트를 시작하려면 ghtestpackage/common/base_file.py의 BaseLearner() 및 ghtestpackage/algorithms/fisher_folder/fisher_file.py의 Fisher()의 소스 코드를 확인해보세요...

BaseLearner()이 서로 다른 폴더 위치의 여러 알고리즘을 위한 기본 클래스가 될 것이라는 아이디어 때문에, 이 코드는 common 폴더로 분리되어 있습니다.

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

이번 데모에서 기본 클래스에는 서브 클래스에서 호출할 수 있어야 할 단일 메서드가 있습니다. 각 클래스는 호출되었음을 증명하기 위해 icecream을 사용하여 디버그 메시지를 출력합니다.

## 주피터 노트북 클라이언트 테스트

ghtestpackage\notebooks 폴더에는 ghtest_notebook.ipynb라는 주피터 노트북이 있습니다. 이는 "완벽한 패키지" 구조가 패키지 코드를 개발하고 테스트하는 데 도움이 되는 노트북을 포함할 수 있어야 한다는 요구 사항을 충족하기 위한 것입니다.

노트북에 있는 코드는 다음과 같습니다...

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

그리고 이것이 출력 결과입니다...

```js
ic | "BaseLearner.init";
ic | "BaseLearner.init";
ic | "fisher.init";
ic | "BaseLearner.test";
```

...결과적으로 베이스 클래스와 알고리즘 클래스를 참조하고 인스턴스화하고 호출할 수 있다는 것을 증명했습니다.

또한 주의할 점은 완전히 별도의 프로젝트에 노트북이 생성되고 위의 코드가 셀에 입력된 경우에도 모든 작업이 올바르게 수행된다는 것입니다.

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

## pytest 클라이언트 테스트 중

여기에는 ghtestbackage/unit_tests/test_base/test_base.py에 저장된 기본 클래스를 테스트하기 위한 코드가 있습니다...

... 그리고 여기에는 ghtestbackage/unit_tests/test_fisher/test_fisher.py의 코드가 있습니다.

다시 말하지만, .pth 파일의 지시에 따라 패키지의 부모 폴더를 시스템 경로에 추가했기 때문에 참조가 작동합니다.

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

최종 증명은 VS Code의 단위 테스트 패널로 이동하여 단위 테스트가 식별되고 발견되었는지 확인하고, 모두 실행하여 오류 없이 완료되는지 확인하는 것입니다...

![image](/assets/img/2024-06-19-AProposedPerfectPackagePrototypeforPythonProjects_4.png)

이것은 제안된 완벽한 패키지 프로토타입의 주요 이점 중 하나입니다 —

# 문서 작성

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

마지막 요구 사항은 문서 생성과 관련이 있습니다. 한 가지 방법은 모듈, 클래스 및 함수에 포괄적인 독스트링이 있는지 확인하는 것입니다(이 스텁은 VS Code에서 자동으로 생성될 수 있습니다).

다음은 잘 구조화되고 포괄적인 독스트링의 예시입니다…

이러한 독스트링은 작성하는 데 시간이 걸리지만 메서드의 기능, 매개변수, 반환 값, 호출 방법 예시 및 맥락적인 참고 사항을 완벽하게 기록합니다.

이 접근 방식을 모든 소스 코드에 적용하면 pydoc를 사용하여 HTML 형식의 도움말 파일을 자동으로 생성하는 것이 쉬워집니다.

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

제안된 프로젝트 프로토타입에는 makedocs.bat 파일이 포함된 docs라는 폴더가 있습니다...

```js
python -m pydoc -w "..\algorithms\fisher_folder\fisher_file.py"
python -m pydoc -w "..\common\base.py"
```

해야 할 일은 단순히 docs 폴더에서 makedocs를 실행하면 docstrings에서 자동으로 문서가 생성됩니다...

![이미지](/assets/img/2024-06-19-AProposedPerfectPackagePrototypeforPythonProjects_5.png)

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

많은 다양한 방법으로 도움 파일을 작성하고 생성할 수 있지만 여기서는 pydoc을 선택했습니다. pydoc은 코드와 클래스의 목적과 사용을 설명하는 문서를 빠르고 쉽게 생성할 수 있는 방법을 제공하기 때문입니다.

# 마지막으로 — 디버깅 테스트

현재 제안된 것은 거의 작동하지만 한 가지 더 있습니다...

유닛 테스트가 실패하거나 예상치 못한 결과를 내는 경우 디버깅이 필요할 수 있으며 이 구성에서는 VS Code에서 유닛 테스트 내에서 디버깅을 시작하지 않습니다.

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

디버깅을 시도하면 "Invalid message: Found duplicate in "env": PATH"와 함께 프로세스가 크래시됩니다.

오류 대화상자에서는 launch.json을 열 수 있는 옵션이 제공되며, 이를 통해 .vscode 폴더에 다음과 같이 보이는 launch.json 파일이 생성됩니다.

그런데 여전히 제대로 작동하지 않습니다. 목적 속성을 설정하기 위해 추가로 라인을 추가해야 합니다.

여기에 파이널 프루프가 있습니다 — pytest 단위 테스트인 test_fisher_3()가 디버깅되고 있으며, 곧 "test_fisher"를 커맨드 라인에 출력할 예정입니다...

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

<img src="/assets/img/2024-06-19-AProposedPerfectPackagePrototypeforPythonProjects_6.png" />

# 결론

어떤 프로그래밍 프로젝트도 잘 구조화되고 잘 작성된 코드에 의존하여 코드가 효율적으로 구축되고 예기치 않은 결과를 출력할 때 효과적으로 디버깅 및 수정할 수 있습니다.

또한, 원래 프로그래머거나 다른 사람에 의해 언젠가는 코드를 변경해야 할 것이고 미래 관리 가능성의 효과성을 위해서는 잘 작성된 코드가 필요합니다.

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

그럼, 코드를 포함하는 프로젝트가 잘 구조화되고 조직화되어 훌륭한 코드를 제공할 수 있는 기반이 제공되기 때문에 이것이 가능합니다.

프로젝트가 1000줄 이상을 포함하는 경우, 여전히 상대적으로 적은 규모이지만, .py 파일을 여러 개에 걸쳐 지능적으로 분산하지 않으면 VS Code가 느려지고 린팅, 코드 개요 및 타입-어헤드와 같은 기능이 제대로 동작하지 않을 수 있습니다.

이 모든 것의 핵심은 첫 번째 코드 줄을 작성하기 전에 프로젝트 구조를 올바르게 가져야 한다는 것입니다.

이 기사는 요구 사항의 집합을 설명하여 테스트를 통해 이러한 요구 사항을 충족하는 레이아웃 및 구조를 제시함으로써 "완벽한" 패키지 구조에 대한 한 제안을 제시했습니다.

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

주요 도전 과제는 전문적인 네임스페이스의 최상의 폴더 및 파일 레이아웃을 통합하고 클래스가 .pth 파일을 구성하고 **init**.py 파일의 항목을 통해 일반 프로젝트, Jupyter 노트북 및 pytest 단위 테스트로 가져올 수 있도록 하는 것이었습니다.

파이썬 프로젝트용 완벽한 패키지 프로토타입에 대한 다른 제안이 많을 수 있겠지만, 이 프로젝트는 매우 잘 작동합니다.

# 추가 섹션: 프로토타입 빠르고 쉽게 사용하기...

패키지 프로토타입 프로젝트는 다음 링크를 통해 GitHub에서 다운로드할 수 있습니다...

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

... 그리고 다음 단계를 따릅니다...

- 프로젝트를 다운로드하세요.
- 이를 개발 패키지를 저장할 부모 폴더 바로 아래에 위치시킵니다.
- docs 하위 폴더에서 mypackages.pth 파일을 Anaconda 설치의 site-packages 폴더로 복사합니다.
- mypackages.pth 파일을 편집하여 로컬 컴퓨터에서 만든 경로로 대체합니다.
- Jupyter Notebook 및 pytest 유닛 테스트를 실행하여 참조 및 네임스페이스를 확인합니다.
- 뼈대 프로젝트를 복사하여 Fisher() 및 BaseLearner()를 실제 클래스로 대체하고 제품 코드로 배치를 시작합니다.

만약 로컬 컴퓨터에서 site-packages 폴더가 어디에 있는지 모호하다면, 간단히 sys를 import하고 sys.path 명령을 실행하여 다음과 유사한 경로를 찾아보세요...

```js
C:\Users\GHarr\anaconda3\envs\project-env\lib\site-packages
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

# 소통하고 연락하기...

이 기사가 마음에 드셨다면 제 소식을 받아보려면 팔로우해주세요.

인과 추론(저의 다른 최근 기사 참조)에 대한 생각 또는 견해가 있다면 언제든지 연락주세요. 이 흥미로운 새로운 데이터 과학 분야가 어디로 향하고 있는지 알려주세요. 메시지를 남겨주시면 저에게 연락드리겠습니다.

제 이전 기사는 제 연구와 인과 추론과 관련된 모든 내용이 담겨 있는 제 블로그(The Data Blog)에서 확인하실 수 있습니다. 감사합니다.
