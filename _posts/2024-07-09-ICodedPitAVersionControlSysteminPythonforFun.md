---
title: "취미로 만든 파이썬 버전 관리 시스템 I Coded Pit 소개 "
description: ""
coverImage: "/TIL/assets/img/2024-07-09-ICodedPitAVersionControlSysteminPythonforFun_0.png"
date: 2024-07-09 14:31
ogImage:
  url: /assets/img/2024-07-09-ICodedPitAVersionControlSysteminPythonforFun_0.png
tag: Tech
originalTitle: "I Coded Pit: A Version Control System in Python for Fun 😏"
link: "https://medium.com/@zaid-kamil/i-coded-pit-a-version-control-system-in-python-for-fun-67b23cf17018"
---

<img src="/TIL/assets/img/2024-07-09-ICodedPitAVersionControlSysteminPythonforFun_0.png" />

안녕하세요! Git이라는 신비한 도구를 모든 개발자가 지켜왔다는데, 그 실제 동작 원리가 궁금한 적이 있으신가요? 저도 그랬어요. Sanket Singh의 "I coded Git in 1.5 hours | Make your own Version Control System 😎"라는 YouTube 비디오에서 영감을 받아, 조금씩 코딩하는 모험을 떠났어요. 파이썬으로 제가 직접 버전 관리 시스템을 만들어보는 건 어떨까요?

여기 ⛏️Pit이 나왔습니다! 귀엽고 놀랍도록 기능적인 버전 관리 시스템(VCS)이에요. 코딩을 즐기고 도전해보고 싶다는 이유로 만들었죠. 'Pit'이라는 이름은 깊고 어두운 구멍 연상시킬 수 있겠지만, 이 프로젝트는 사실 VCS의 매력적인 세계를 탐험하는 데 집중한 거예요. 게다가, 리포지토리를 초기화할 때 "난 Pit을 파고 있어"라고 말하는 건 정말 재미있는 일이에요.

Pit을 알아보기 전에 Git을 먼저 살펴볼까요? 2005년 Linus Torvalds가 만든 Git은 소스 코드의 변경 사항을 추적하는 분산 버전 관리 시스템으로, 여러 개발자가 협업할 수 있도록 하고 작업을 덮어쓰지 않게 합니다. 강력하고 유연하며 진지한 코딩 활동을 위해 필수적이에요.
이론은 넘어가고 Pit이 완성된 후 어떻게 작동하는지 확인해보겠습니다.

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

![2024-07-09-ICodedPitAVersionControlSysteminPythonforFun_1](/TIL/assets/img/2024-07-09-ICodedPitAVersionControlSysteminPythonforFun_1.png)

안녕하세요! 이 두 부분으로 구성된 기사에서 Pit이 어떻게 작동하는지 알아보겠습니다. 환경을 설정하고 VCS의 핵심 구성 요소를 만드는 것부터 시작해서 변경 내용을 커밋하고 로그를 확인하는 고급 기능까지 살펴볼 거에요. 그러니 당신의 삽(아니, 키보드!)을 쥐고 함께 파는 것을 시작해봐요!

# Pit을 파다 — 버전 컨트롤 시스템 설정하기

Pit은 명령줄 인터페이스를 통해 기본적인 버전 관리 기능을 제공하도록 설계되었습니다. 사용자는 새 저장소를 초기화하고 파일을 스테이징 영역에 추가하며 변경 사항을 커밋하고 커밋 로그를 확인하거나 저장소의 상태를 확인할 수 있어요.

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

## 프로젝트 구조

구현 세부 정보에 대해 파헤치기 전에 Pit 프로젝트의 구조를 살펴보겠습니다:

```js
project/
├── .pit/                 # 메인 저장소 디렉토리 (자동 생성됨)
│   ├── objects/          # 객체(파일) 스냅샷을 저장하는 디렉토리
│   ├── HEAD              # 현재 커밋을 참조하는 파일
│   ├── index             # 스테이징 영역(스테이징된 파일의 목록)을 저장하는 파일
├── pit.py                # Pit의 메인 Python 스크립트
├── pit.cmd               # 명령 처리기
├── 기타 파일들           # 프로젝트에 있는 기타 파일들
```

Pit의 핵심은 Pit 클래스로, 핵심 기능을 캡슐화하고 Python의 pathlib 라이브러리를 통해 파일 시스템과 상호 작용합니다. 이 구조를 통해 Pit은 초기화된 디렉토리(초기화 명령)부터 커밋 스냅샷을 저장하는 일 등 저장소 데이터를 효과적으로 관리할 수 있습니다.

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
import sys
from pathlib import Path
import hashlib
from datetime import datetime
import json
from pprint import pp

class Pit:
    def __init__(self, repo_path=".") -> None:
        self.repo_path = Path(repo_path, ".pit")
        self.objects_path = self.repo_path / "objects"
        self.head_path = self.repo_path / "HEAD"
        self.index_path = self.repo_path / "index"
```

# Implementing init Command

pit init

## Project Initialization with Pit

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

Pit을 사용하기 위해서는 새 저장소를 초기화해야 합니다. 이 과정은 프로젝트 내에서 버전 관리를 관리하기 위한 필요한 디렉터리 구조와 파일을 설정합니다.

## 저장소 구조 설정

파이썬의 Pit 클래스는 start 메서드를 통해 이 초기화를 처리합니다. 다음은 포함된 단계를 살펴봅시다:

저장소 존재 여부 확인: start 메서드는 먼저 지정된 또는 현재 디렉토리(repo_path)에 .pit 디렉터리가 이미 존재하는지 확인합니다. 이미 존재한다면 저장소가 이미 존재한다는 메시지를 인쇄하고 프로그램을 종료합니다.

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
def start(self):
    if self.repo_path.exists():
        print("⛏️  이미 작업공간이 존재합니다!")
        sys.exit(1)
```

저장소 디렉토리 생성: 저장소가 존재하지 않는 경우, Pit은 경로를 이용하여 주요 .pit 디렉토리 및 하위 디렉토리 (objects, HEAD, index)를 생성합니다. 여기서 objects 디렉토리는 파일 내용의 스냅샷을 보관하고, HEAD 파일은 현재 커밋을 추적하며, index 파일은 변경 사항을 위한 스테이징 영역 역할을 합니다.

```python
def start(self):
    # ...
    self.repo_path.mkdir(exist_ok=True)
    self.objects_path.mkdir(exist_ok=True)
    self.head_path.touch(exist_ok=True)
    if not self.index_path.exists():
        with self.index_path.open("w") as index_file:
            index_file.write("[]")
    print("⛏️  할일들을 처리중...")
```

init 명령어를 구현함으로써, Pit은 프로젝트 이력과 변경 사항을 관리하기 위한 기초를 마련합니다. 이 체계적인 접근은 업무 분리를 명확히 하고, 파일 추가 (add), 변경 내용 커밋 (commit), 커밋 로그 보기 (log)와 같은 후속 작업을 위해 저장소를 준비합니다.

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

# add 명령어 구현

pit add `파일명`

## Pit을 사용하여 스테이징 변경하기

리포지토리를 초기화한 후에 Pit을 사용하는 다음 단계는 변경 사항을 스테이징하는 것입니다. 특히, 파일을 스테이징 영역에 추가하는 것입니다. 이를 통해 사용자는 프로젝트 파일의 버전을 제어하고 조직적으로 관리하기 위해 수정 사항을 다음 커밋을 위해 준비할 수 있습니다.

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

## 스테이징 영역에 파일 추가하기

Pit 클래스의 add 메서드는 이 과정을 용이하게 도와줍니다. 이러한 과정을 살펴보겠습니다:

파일 데이터 읽기: add 메서드는 read_file 도우미 메서드를 사용하여 file_path로 지정된 파일의 내용을 읽어옵니다.

```js
def add(self, file_path):
    file_data = self.read_file(file_path)
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

파일 내용 해싱: 다음으로, Pit은 파일 내용의 SHA-1 해시를 계산하여 파일을 고유하게 식별합니다. 이 해시는 체크섬으로 작용하여 무결성을 보장하고 파일 버전을 빠르게 찾을 수 있도록 합니다.

```js
def add(self, file_path):
    # ...
    file_hash = self.hash_object(file_data)
```

오류 처리: 지정된 파일이 존재하지 않을 경우 (FileNotFoundError), Pit은 오류 메시지를 인쇄하고 정상적으로 종료합니다.

```js
def add(self, file_path):
    # ...
    if not file_data:
        print(f"⛏️  Error: {file_path}를 찾을 수 없습니다!")
        sys.exit(1)
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

기존 파일 확인: Pit은 객체 디렉토리에 동일한 해시를 가진 파일이 이미 있는지 확인합니다. 이미 존재한다면 해당 파일이 이미 저장소에 추가되었음을 나타냅니다.

```python
def add(self, file_path):
    # ...
    if self.check_hash_exists(file_hash):
        print(f"⛏️  오류: {file_path}이(가) 이미 존재합니다!")
        sys.exit(1)
```

파일 스테이징: 새 파일이며 검사를 통과하면 Pit은 파일 내용을 해시된 이름으로 객체 디렉토리에 저장합니다. 인덱스 파일을 업데이트하여 다음 커밋을 위해 파일 경로와 해시를 포함시킵니다.

```python
def add(self, file_path):
    # ...
    object_path = self.objects_path / file_hash
    self.write_file(object_path, file_data)
    self.update_staging_area(file_path, file_hash)
    print(f"⛏️  {file_path}를 스테이징 영역에 추가했습니다")
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

# commit 명령어 구현하기

pit commit "메시지"

## Pit를 사용하여 프로젝트 스냅샷 캡처하기

add 명령어로 변경 사항을 스테이징한 후, Pit을 사용하여 버전 관리하는 다음 단계는 이러한 변경 사항을 커밋하는 것입니다. 커밋은 프로젝트의 현재 상태에 대한 스냅샷을 생성하고, 저장소의 히스토리에 기록합니다.

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

## 변경 내용 커밋하기

Pit 클래스의 commit 메서드는 이 프로세스를 용이하게 합니다. 이에 관련된 단계를 살펴봅시다:

Staged 파일 읽기: commit 메서드는 as_list 도우미 메서드를 사용하여 인덱스 파일에서 Staged 파일의 목록을 검색하는 작업으로 시작합니다.

```js
def commit(self, message):
    index = self.as_list(self.read_file(self.index_path))
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

현재 HEAD 가져오기: 그런 다음 get_current_head 메서드를 사용하여 HEAD 파일에서 현재 커밋 (HEAD)의 해시를 검색합니다.

```js
def commit(self, message):
    # ...
    parent_commit = self.get_current_head()
```

커밋 데이터 생성: Pit은 부모 커밋 해시 (있는 경우), 커밋 메시지, 타임스탬프 및 스테이징된 파일 목록을 포함한 커밋 데이터를 구성합니다. 이 데이터는 JSON 형식으로 직렬화됩니다.

```js
def commit(self, message):
    # ...
    commit_data = json.dumps({
        "parent": parent_commit,
        "message": message,
        "date": datetime.now().isoformat(),
        "files": index
    })
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

커밋 데이터 해싱: 직렬화된 커밋 데이터에 대해 SHA-1 해시가 계산되어 저장소 내에서 커밋을 고유하게 식별합니다.

```python
def commit(self, message):
    # ...
    commit_hash = self.hash_object(str(commit_data))
```

커밋 객체 저장: Pit은 커밋 데이터를 해시 된 이름으로 objects 디렉토리에 기록하여 프로젝트 상태를 영구적으로 기록합니다.

```python
def commit(self, message):
    # ...
    commit_path = self.objects_path / commit_hash
    self.write_file(commit_path, str(commit_data))
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

HEAD 및 인덱스 업데이트: HEAD 파일이 새로운 커밋 해시를 가리키도록 업데이트되어 저장소의 최신 상태를 나타냅니다. 인덱스 파일이 지워져, 향후 변경을 위한 스테이징 영역이 재설정됩니다.

```python
def commit(self, message):
    # ...
    self.write_file(self.head_path, commit_hash)
    self.write_file(self.index_path, "[]")
```

작업 완료 메시지: 마지막으로, Pit은 성공적으로 커밋되었음을 나타내는 확인 메시지를 출력하고 참조용으로 커밋 해시를 표시합니다.

```python
def commit(self, message):
    # ...
    print(f"⛏️  {commit_hash}로 커밋되었습니다.")
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

# 로그 명령어 구현

pit log

## Pit로 프로젝트 이력 탐색하기

커밋 명령어로 변경 사항을 커밋한 후, Pit은 로그 명령어를 통해 사용자가 저장소의 이력을 탐색할 수 있습니다. 이 명령어는 커밋들의 연대순 목록을 표시하여 프로젝트의 진화와 시간이 지남에 따른 변경 사항 순서를 제공합니다.

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

## 커밋 로그 보기

Pit 클래스의 log 메서드는 이 프로세스를 용이하게합니다. 함께 차례대로 진행해 보겠습니다:

현재 HEAD 가져오기: log 메서드는 get_current_head 메서드를 사용하여 HEAD 파일에서 현재 커밋의 해시를 검색하여 시작됩니다.

```js
def log(self):
    current_commit_hash = self.get_current_head()
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

커밋 반복: Pit은 루프를 사용하여 현재 HEAD부터 시작하여 커밋 기록을 반복합니다. 초기 커밋 (부모가 없는 곳)에 도달할 때까지 커밋 데이터를 가져와 표시합니다.

```python
def log(self):
    # ...
    while current_commit_hash:
        commit_data = self.read_file(self.objects_path / current_commit_hash)
        commit_data = json.loads(commit_data)
```

커밋 정보 표시: 각 커밋에 대해 Pit은 커밋 해시, 커밋 메시지 및 기타 세부 정보 (예: 타임스탬프, 부모 커밋 등)와 같은 관련 정보를 출력합니다.

```python
def log(self):
    # ...
        # ...
        print(f"⛏️  Commit: {current_commit_hash}")
        pp(commit_data)
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

### 커밋 기록 탐색: `Pit`은 `current_commit_hash`를 부모 커밋의 해시로 업데이트하여 초기 커밋부터 최신 커밋까지 저장소의 기록을 탐색할 수 있습니다.

```python
def log(self):
    # ...
        # ...
        current_commit_hash = commit_data.get('parent')
```

### 커밋이 없는 경우 처리: 만약 커밋이 없다면 (HEAD가 없는 경우), `Pit`은 아직 커밋이 없다는 메시지를 출력합니다.

```python
def log(self):
    # ...
    if not current_commit_hash:
        print("⛏️  아직 커밋이 없습니다!")
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

다음은 클래스에서 중요한 메소드였습니다. 사용자를 안내해주는 도우미 메소드인 show_usage()도 있습니다.

Pit의 show_usage 함수는 사용자가 유효한 명령을 지정하지 않거나 잘못된 인수를 제공하여 도구를 호출했을 때 사용법 지침과 명령 옵션을 표시하는 유틸리티로 작용합니다. 이 함수를 통해 사용자는 명령 줄 인터페이스(CLI)를 통해 Pit와 효과적으로 상호 작용하는 방법을 이해할 수 있습니다.

```js
def show_usage():
    print("⛏️  Pit - 간단한 버전 관리 시스템")
    print("사용법: pit <command> [<args>]")
    print("명령어:")
    print("  init        빈 pit 저장소 생성")
    print("  add         파일을 스테이징 영역에 추가")
    print("  commit      변경 사항을 저장소에 기록")
    print("  log         커밋 로그보기")
```

# 명령 줄 인터페이스(CLI) 작업 관리

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

피트(Pit)의 주요 기능인 main 함수는 명령줄 인터페이스(CLI)를 통해 버전 관리 작업을 실행하는 진입점으로 기능합니다. 이 함수는 사용자, 다양한 피트(init, add, commit, log) 명령어, 그리고 피트 클래스의 기본 기능 간의 상호 작용을 조정합니다. 이 함수는 클래스 외부에 있어야 합니다.

main 함수는 사용자가 전달한 명령줄 인자를 처리하고, 이에 해당하는 동작을 피트 클래스 내에서 정의된 메소드에 위임합니다. 코드를 살펴봅시다:

```js
if __name__ == "__main__"
    def main():
        pit = Pit()
        if len(sys.argv) < 2:
            show_usage()
            sys.exit(1)
        command = sys.argv[1]
        if command == "init":
            pit.start()
        elif command == "add":
            if len(sys.argv) < 3:
                print("Usage: pit add <file_path>")
                sys.exit(1)
            file_path = sys.argv[2]
            if file_path == "*":
                for file in Path(".").rglob("*"):
                    if file.is_file():
                        pit.add(file)
            else:
                pit.add(file_path)
         elif command == "commit":
            if len(sys.argv) < 3:
                print("Usage: pit commit <message>")
                sys.exit(1)
            message = sys.argv[2]
            pit.commit(message)
        elif command == "log":
            pit.log()
        else:
            show_usage()
            sys.exit(1)
```

## 배치 스크립트

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

이 배치 스크립트 (pit.cmd)는 Python 모듈(pit)과 상호 작용하는 간단한 방법을 제공합니다. 이 모듈은 버전 관리 기능을 구현하며, Python의 직접적인 모듈 실행 능력(-m 플래그)을 활용하여 명령줄 인수를 원활하게 전달함으로써 윈도우 명령 프롬프트에서 pit 모듈을 유연하고 직관적으로 사용할 수 있습니다.

```js
@echo OFF
python -m pit %*
```

# 결론

이 pit과의 여정 첫 부분에서 우리는 Python 기반 버전 관리 시스템의 기본 설정 및 초기 작업을 탐색했습니다. 우리는 pit init을 사용하여 새 저장소를 초기화하여 프로젝트 히스토리를 관리하는 데 필요한 디렉토리 구조를 설정했습니다. 이후에는 pit add로 스테이징 영역에 파일을 추가하고, pit commit으로 변경 사항을 커밋하며, pit log를 통해 커밋 히스토리를 살펴보았습니다.

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

위 기초적인 명령어들을 통해, 우리는 변경 사항을 추적하고 버전을 관리하며 협업과 프로젝트 관리에 체계적인 방법을 제공하는 피트를 위한 기반을 마련했습니다. 첫 번째 파트에서는 Python 프로젝트 내에서 피트를 효과적으로 활용하기 위한 필수 도구들을 갖추었습니다.

곧 공개될 Part 2를 기대해 주세요. 거기에서는 피트를 이해하고 적용하는 능력을 향상시켜 우리의 개발 워크플로우를 더욱 강화할 것입니다.
