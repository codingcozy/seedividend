---
title: "코드 변경을 안전하게 하는 커스텀 pre-commit 훅 사용하는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-Custompre-commithooksforsafercodechanges_0.png"
date: 2024-07-09 21:03
ogImage:
  url: /assets/img/2024-07-09-Custompre-commithooksforsafercodechanges_0.png
tag: Tech
originalTitle: "Custom pre-commit hooks for safer code changes"
link: "https://medium.com/towards-data-science/custom-pre-commit-hooks-for-safer-code-changes-d8b8aa1b2ebb"
---

## 첫 번째 pre-commit 훅을 작성하는 단계별 가이드

![이미지](/TIL/assets/img/2024-07-09-Custompre-commithooksforsafercodechanges_0.png)

대부분의 소프트웨어는 코드를 업데이트하고 배포하기 위해 git 버전 관리 시스템을 사용하여 개발됩니다. 코드를 협업하여 작성하는 한 가지 어려움은 각 참여자가 깨끗한 코드로 간주되는 것에 대한 자기 스타일과 의견이 있을 때 특정한 표준을 보장하는 것입니다.

pre-commit 훅은 코드 변경을 커밋하기 전에 자동으로 실행되는 스크립트나 명령어입니다. 이들은 스타일 가이드를 강제하고 커밋되기 전에 오류를 잡을 수 있으며 더 다양하게 배포할 수 있습니다. 주요한 훅은 구문 오류를 확인하고, import를 정렬하며, 따옴표를 정규화하는 것이 있습니다. 이러한 훅들은 많은 참여자가 있는 오픈 소스 프로젝트를 포함한 모든 프로젝트에 필수적인 도구입니다.

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

# 사용자 정의 pre-commit 훅을 만드는 이유

저는 Python 라이브러리 Hamilton을 위해 데이터플로우 정의를 검증하기 위한 pre-commit 훅을 만드려고 했지만, 대부분의 온라인 자료가 분산되어 있고 기본 사용법에 한정되어 있다는 것을 발견했습니다.

이 게시물에서는 다음을 찾아볼 수 있습니다:

- 프로젝트에서 pre-commit 훅을 사용하기 시작하는 방법
- 사용자 정의 pre-commit 훅을 개발하기 위한 단계별 튜토리얼

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

토론을 바탕으로, Hamilton을 위해 개발한 사전 커밋 후크를 포함하는 이 GitHub 저장소를 살펴보겠습니다.

# 사전 커밋 후크 사용 시작하기

후크(Hooks)는 git 버전 관리 시스템에 직접 내장된 메커니즘입니다. .git/hooks 디렉토리 아래에서 프로젝트의 후크를 찾을 수 있습니다(기본적으로 숨겨질 수 있습니다). 일반적으로 "사전 커밋 후크"라고 불리지만, git 후크는 전체 git 수명 주기를 다룹니다. 예를 들어, 커밋 직후나 푸시하기 직전에 후크를 트리거할 수 있습니다. 또한, 후크는 어떤 프로그래밍 언어로도 작성할 수 있습니다. 흥미롭게도, Ruff 라이브러리는 성능 향상을 위해 많은 Python 기반 후크를 Rust로 재구현했습니다.

코드 동작에 집중하는 소프트웨어 테스트와 비교해볼 때, 후크는 각 파일 저장 시 수행하는 가벼운 체크로 생각할 수 있습니다. 테스트가 코드베이스와 함께 변화하고 진화하는 것을 기대할 수 있는 반면, 코드 작성 가이드라인과 사전 커밋 후크는 고정될 가능성이 높습니다.

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

## 프로젝트 설정

새로운 파이썬 프로젝트를 시작하거나 기존 프로젝트를 사용하는 것으로 가정해 봅시다. 디렉토리 /my-project 에서 작업하려면 pre-commit 후크를 사용하는 선호하는 방법은 pre-commit Python 라이브러리를 사용하는 것입니다. 다음 단계로 설정할 수 있습니다:

- 프로젝트를 위해 git init으로 git 저장소를 만듭니다.
- pre-commit 라이브러리를 설치하려면 pip install pre-commit을 사용합니다.
- 저장소에 .pre-commit-config.yaml 파일을 추가합니다. 다음은 예시입니다:

```yaml
# .pre-commit-config.yaml
repos:
  # 후크 정의가 있는 저장소
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v2.3.0 # 저장소의 릴리스 버전
    hooks: # 이 프로젝트에 포함할 저장소의 후크 목록
      - id: end-of-file-fixer
      - id: trailing-whitespace
      - id: check-yaml
        args: ["--unsafe"] # `check-yaml`에 인수 추가

    # 후크가 있는 다른 저장소 다운로드
  - repo: https://github.com/psf/black
    rev: 22.10.0
    hooks:
      - id: black
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

4. `pre-commit install` 명령어를 사용하여 훅을 설치하세요. 이 몤령어는 .pre-commit-config.yaml 파일에서 지시 사항을 읽고, .git/hooks/pre-commit 폴더 아래 로컬로 훅을 설치합니다.

5. 커밋을 만들거나 `pre-commit run --all-files` 명령어를 수동으로 실행하여 훅을 작동시킬 수 있습니다.

### 사용자 정의 pre-commit 훅 만들기

커뮤니티가 유지보수하는 훅은 유연성을 제공하며 선호하는 코딩 가이드라인에 맞게 맞춤화할 수 있습니다. 이러한 훅은 대부분의 경우 98%의 요구를 충족해야 할 것입니다. 그러나 기본 제공 솔루션은 사용 중인 도구나 팀의 내부 규칙을 알지 못합니다. 예를 들어, 내부 구성을 유효성 검사하거나 프로젝트의 디렉토리 구조를 강제로 지정하는 것과 같은 조치를 취하려고 할 수 있습니다.

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

우리 케이스에서는, 그들의 Hamilton 데이터 플로우 정의에 대한 Python 코드를 검증하기 위한 후크를 생성하려고 합니다. 우리의 후크 스크립트는 검증을 수행하기 위해 hamilton CLI 도구를 활용하여 간단한 코드 예제를 따라할 수 있게 됩니다.

## 1. pre-commit 후크 저장소 설정

프로젝트 설정 섹션에서 소개된 대로, pre-commit 후크는 .pre-commit-config.yaml에 있어야 하며, 프로젝트가 해당 후크를 참조하고 pre-commit install로 로컬에 설치할 수 있도록 공개 저장소에 존재해야 합니다.

이전에는 프로젝트 디렉토리 /my-project에 있었으며 .pre-commit-config.yaml을 정의하고 후크를 설치했습니다. 이제, /my-hooks 디렉토리를 생성하여 사용자 정의 후크를 정의할 것입니다. 우리의 hamilton-pre-commit 저장소를 참조하여 일반적인 구조를 확인할 수 있습니다.

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

<img src="/TIL/assets/img/2024-07-09-Custompre-commithooksforsafercodechanges_1.png" />

## 2. 훅 로직 작성

hooks/ 디렉토리 아래에는 해당 디렉토리를 파이썬 모듈로 찾을 수 있도록 하는 파일 **init**.py와 cli_command.py 스크립트가 있습니다. cli_command.py에는 하나의 main() 함수가 포함되어 있으며, 이 함수는 sys.argv에서 햄릴턴 CLI 명령의 목록을 읽습니다. 그런 다음, 예외 처리가 적용된 서브프로세스로 감싸져 하나씩 실행합니다.

```js
# hooks/cli_command.py
import sys
import json
import subprocess

PASS = 0
FAIL = 1

def main() -> int:
    """햄릴턴 CLI를 사용하여 명령 목록 실행"""
    commands = sys.argv[1:]

    if len(commands) == 0:
        return PASS

    exit_code = PASS
    for command in commands:
        try:
            args = command.split(" ")
            # `--json-out`를 삽입하여 적절한 stdout 구문 분석
            args.insert(1, "--json-out")
            result = subprocess.run(args, stdout=subprocess.PIPE, text=True)
            response = json.loads(result.stdout)

            if response["success"] is False:
                raise ValueError

        except Exception:
            exit_code |= FAIL

    return exit_code

if __name__ == "__main__":
    raise SystemExit(main())
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

처음에는 exit_code를 PASS로 설정하지만, 어떤 예외나 실행되지 못한 명령이 있다면 exit_code를 FAIL로 설정합니다. main() 함수는 exit 코드를 SystemExit 예외에 반환합니다. pre-commit 훅이 성공하려면 모든 명령이 성공한 후에 PASS를 반환해야 합니다. PASS가 0이고 FAIL이 1인 것이 직관적이지 않을 수 있지만, 이 값들은 표준 시스템의 종료 코드를 가리킵니다.

우리는 편의성을 위해 Python을 사용했지만, 이 간단한 논리는 Bash와 같은 가벼운 스크립팅 언어에서도 적용될 수 있습니다. pre-commit 팀이 유지 관리하는 후크를 방문하여 더 많은 예제를 확인할 수 있습니다.

## 3. 후크 진입점 정의하기

이제, 당신의 후크 저장소(/my-hooks)는 설치된 후에 사용할 수 있는 후크들과 그 실행 방법을 지정하는 .pre-commit-hooks.yaml 파일을 포함해야 합니다.

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

- id: cli-command
  name: '`hamilton` CLI 명령 실행'
  description: '이 후크는 `hamilton` CLI를 사용하여 명령을 실행합니다.'
  entry: cli-command
  language: python
  types: [python]
  stages: [pre-commit, pre-merge-commit, manual]
  pass_filenames: false

우리의 경우, id: cli-command 및 entry: cli-command를 설정하고 몇 가지 메타데이터를 추가하며 프로그래밍 언어는 Python으로 지정했습니다. 중요한 점은 파일 속성이 설정되어 있지 않아 후크가 커밋 당 한 번 실행되게하려면 파일: "\*.py"를 설정해야합니다. 예를 들어 각 수정된 Python 파일에서 후크를 실행하도록 할 수 있습니다 (사용 가능한 옵션에 대해 알아보세요).

지금까지 hooks/cli_command.py 아래 Python 스크립트를 만들고 .pre-commit-hooks.yaml에 cli-command 진입점이있는 후크를 추가했습니다. 그러나 Python 프로젝트 파일 pyproject.toml에서 명시적으로 두 가지를 연결해야합니다.

[project.scripts]
cli-command = "hooks.cli_command:main"

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

이 줄은 "입력 지점 cli-command은 hooks.cli_command의 main 함수를 가리킵니다."라고 읽습니다.

## 4. 로컬에서 훅을 테스트하는 방법

먼저, 단위 테스트로 훅의 로직을 유효성 검사해야 합니다. 그러나 테스팅에 대해 자세히 다루지는 않겠습니다. 현재 hamilton-pre-commit 저장소에는 이 main Hamilton 저장소에서 테스트 된 기본 CLI가 없기 때문에 테스트가 없습니다. 테스트 예제용으로 공식으로 유지되는 pre-commit 훅을 방문할 수 있습니다.

두 번째로, .pre-commit-hooks.yaml 및 입력 지점이 올바르게 구성되었는지 확인하기 위해 로컬에서 pre-commit 훅을 시도해야 합니다. 이상적으로는 변경 사항을 테스트하기 위해 훅을 실행할 때마다 커밋을 추가하는 것을 피하고 싶습니다. pre-commit 라이브러리는 이 프로세스를 용이하게 하기 위한 유틸리티를 제공하지만 pre-commit GitHub 문제에서 자세히 설명 된 몇 가지 수동 단계가 필요합니다.

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

- 훅을 테스트하고 싶은 디렉토리 /my-project로 이동하세요.
- pre-commit try-repo ../LOCAL/PATH/TO/my-hooks 명령을 실행하고, 로컬 초기화 메시지가 표시되어야 합니다.

![이미지](/TIL/assets/img/2024-07-09-Custompre-commithooksforsafercodechanges_2.png)

한 가지 제한 사항은이 명령을 통해 훅에 직접 매개변수를 전달할 수 없다는 것입니다.

3. Using config: 하위의 구성을 복사하여 로컬 파일에 추가하고 args 섹션을 추가하세요. 우리는 .local-pre-commit-config.yaml를 생성했지만 원하는 이름을 사용할 수 있습니다.

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

```yaml
repos:
  - repo: ../../dagworks/hamilton-pre-commit
    rev: e4b77a499ba0ff3446a86ebbe4c2cbca82eb54f8
    hooks:
      - id: cli-command
        args: [hamilton build my_func2.py]
```

4. `pre-commit run --config .local-pre-commit-config.yaml --all-files` 명령어를 사용하여 로컬 후크를 실행하세요. `--all-files` 플래그를 사용하면 현재 스테이징된 파일뿐만 아니라 저장소의 모든 파일에 후크가 적용됩니다.

![Custom Pre-Commit Hooks](/TIL/assets/img/2024-07-09-Custompre-commithooksforsafercodechanges_3.png)

## 5. Pre-Commit 후크 공개하기

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

거의 다 왔어요! 동작하는 후크 스크립트를 테스트하고 git 저장소에 패키징했군요. 이제 그것을 온라인으로 사용할 수 있도록 만들어야 합니다. GitHub 호스팅 프로젝트를 위한 단계를 보여드리겠지만, 당신의 pre-commit 후크는 git clone을 통해 접근 가능한 어디에나 저장할 수 있어요.

- GitHub 저장소에서 Releases 섹션으로 이동하세요

![image](/TIL/assets/img/2024-07-09-Custompre-commithooksforsafercodechanges_4.png)

2. 새 릴리스 초안 작성을 클릭하세요

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

![이미지](/TIL/assets/img/2024-07-09-Custompre-commithooksforsafercodechanges_5.png)

3. 새 릴리스 페이지에서는 버전 태그, 제목 및 설명을 추가해야 합니다. 첫 번째 릴리스인 경우, GitHub에서 권장하는 시맨틱 버전을 따르기 위해 태그를 v0.1.0으로 설정하는 것이 좋습니다.

변경 사항을 만들고 실험 버전을 배포하려는 경우 버전을 v0.1.1-rc로 설정하고 "릴리스 후보"로 표시하려면 확인란을 사용하세요.

![이미지](/TIL/assets/img/2024-07-09-Custompre-commithooksforsafercodechanges_6.png)

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

.pre-commit-config.yaml 파일에서 rev 값은 설정한 버전 태그와 일치해야 합니다.

```js
repos:
- repo: https://github.com/DAGWorks-Inc/hamilton-pre-commit
  rev: v0.1.3rc
  hooks:
    - id: cli-command
      # ...
```

# 마무리 맺기

축하합니다! 이 글을 읽어나가셨군요! 이제 프로젝트에서 코드 품질을 향상시키기 위해 pre-commit 훅을 사용할 수 있게 되었습니다. 그 내부 원리를 이해했으니 이제 여러분만의 훅을 작성할 수 있습니다!

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

바퀴를 다시 발명하기 전에 커뮤니티에서 유지보수하는 많은 후크들을 확인하시기 바랍니다: [https://pre-commit.com/hooks.html](https://pre-commit.com/hooks.html)

파이썬에서 데이터플로우를 작성하기 위해 Hamilton 라이브러리를 확인해보세요!
LinkedIn에서 저를 찾아보고 DAGWorks 블로그에서 더 많은 포스트를 읽어보세요
