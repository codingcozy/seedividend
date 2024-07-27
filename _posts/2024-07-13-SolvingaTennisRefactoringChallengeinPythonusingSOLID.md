---
title: "SOLID 원칙으로 테니스 리팩토링 도전 과제 해결하기 Python 사용"
description: ""
coverImage: "/TIL/assets/img/2024-07-13-SolvingaTennisRefactoringChallengeinPythonusingSOLID_0.png"
date: 2024-07-13 19:41
ogImage: 
  url: /TIL/assets/img/2024-07-13-SolvingaTennisRefactoringChallengeinPythonusingSOLID_0.png
tag: Tech
originalTitle: "Solving a Tennis Refactoring Challenge in Python using SOLID"
link: "https://medium.com/towards-data-science/solving-a-tennis-refactoring-challenge-in-python-using-solid-f1282f85e7e0"
---


<img src="/TIL/assets/img/2024-07-13-SolvingaTennisRefactoringChallengeinPythonusingSOLID_0.png" />

## 소개

코드 리팩터링 도전 과제는 소프트웨어 엔지니어들에게 잘 알려져 있지만, 데이터 과학자들에게는 그렇지 않을 수도 있습니다. 그러나 데이터 과학자들 또한 이러한 도전들을 연습함으로써 상당한 혜택을 받을 수 있습니다. 특히 SOLID 원칙을 적용할 때, 이를 연습함으로써 모듈화되고 품질이 높으며 객체지향적인 훨씬 나은 코드를 작성하는 방법을 배울 수 있습니다. 데이터 과학자로서 SOLID 원칙을 습득하면 데이터 과학 프로젝트의 품질과 관리 용이성을 상당히 향상시킬 수 있습니다. 이는 특히 대부분의 데이터 과학자가 통계학자 및 수학자 출신으로, 소프트웨어 엔지니어보다 프로그래밍 기본 원리에 대한 익숙함이 적은 팀에서 중요합니다.

온라인에서는 많은 리팩터링 도전 과제가 제공되고 있습니다. 아마 가장 유명한 것 중 하나는 길드 로즈 카타일 것입니다. 또 다른 재미있는 리팩터링 카타는 테니스 리팩터링 카타인데, 이를 이 글에서 다루겠습니다.

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>


![이미지](/TIL/assets/img/2024-07-13-SolvingaTennisRefactoringChallengeinPythonusingSOLID_1.png)

[여기](https://github.com/emilybache/Tennis-Refactoring-Kata)로 이동하여 녹색 상단 오른쪽 버튼에서 "템플릿으로 사용"을 선택해주세요.

템플릿을 클론하고 터미널에서 해당 저장소로 이동하세요. 그런 다음 python 디렉토리로 이동하여 가상 환경을 생성하고 필수 의존성을 설치해주세요. 모든 것이 정상적으로 작동하는지 테스트하려면 pytest를 실행하세요. 아래 명령어를 터미널에 복사하여 붙여넣을 수 있습니다.

```js
cd python
python -m venv .venv
source .venv/bin/activate # 맥 또는 리눅스에서
# .venv\Scripts\activate # 윈도우에서
pip install -r requirements.txt
pytest
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


![Tennis Refactoring Challenge](/TIL/assets/img/2024-07-13-SolvingaTennisRefactoringChallengeinPythonusingSOLID_2.png)

터미널의 출력 결과는 위의 스크린샷과 유사해야 합니다.

시작 시, 총 6개의 tennis.py 파일이 있습니다. 각 파일은 테니스 경기의 점수를 표시하는 다른 솔루션을 나타냅니다. 테니스는 약간 독특한 점수 표현 방식을 갖고 있습니다. 테니스 경기는 세트로 이루어지며, 세트는 게임으로 이루어지며, 게임에서는 점수를 획득할 수 있습니다. 이 도전 과제는 단일 게임 내에서 점수를 나타내는 것에 관한 것입니다.

- 점수를 획득하지 않은 상태에서는 '러브'라고 부릅니다.
- 한 점을 획득한 후에는 '피프틴'이 됩니다.
- 두 점을 획득한 후에는 '서티'가 됩니다.
- 세 점을 획득한 후에는 '포티'가 되며, 상대방이 세 점을 획득한 경우에는 '듀스'라고 부릅니다.
- 네 점 이상을 획득했을 때, 상대와 2점 이상 차이가 나면 게임에 승리합니다.
- 네 점 이상을 획득했을 때, 상대와 1점 차이가 나면 어드밴티지를 얻습니다.
- 네 점 이상을 획득했을 때, 상대와 같은 점수를 가지면 '듀스'라고 부릅니다.


<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

테니스 테스트를 확인할 수 있는 tennis_test.py 및 tennis_unittest.py 두 파일도 있습니다. 이 파일들은 tennis.py 파일의 로직이 올바른지 확인하는 테스트를 제공합니다. 처음에는 모든 테스트가 통과해야 합니다 (이전에 pytest를 실행했을 때 본 것과 같이).

일반적으로는 각 tennis.py 파일을 다시 설계하는 것이 목표입니다. 그러나 한 문서에서 여섯 개의 Python 파일을 다시 설계하는 것은 너무 방대하기 때문에, 적절한 코딩 구조의 기반인 SOLID 원칙을 준수하는 하나의 해결책을 다룰 것입니다.

## 테니스 게임 정의

테니스 게임을 높은 추상화로 정의해 봅시다. 테니스 게임은 두 팀 게임의 형태입니다. 여기서는 두 플레이어가 아닌 두 팀을 사용합니다. 왜냐하면 테니스는 더블즈로도 (예: 패들은 기본적으로 두 팀으로 플레이되는) 할 수 있기 때문입니다.

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

다음은 테이블 태그를 마크다운 형식으로 변경하세요:


We can define a two-team game as follows:

```js
from abc import ABC, abstractmethod


class TwoTeamGame(ABC):
    def __init__(
        self,
        team1_name: str,
        team2_name: str,
        team1_points: float = 0,
        team2_points: float = 0,
    ):
        self.team1_name = team1_name
        self.team2_name = team2_name
        self.team1_points = team1_points
        self.team2_points = team2_points
```

Next, let’s define a tennis game:

```js
class TennisGame1(TwoTeamGame):
    def __init__(self, team1_name: str, team2_name: str):
        super().__init__(team1_name, team2_name)
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

테니스 경기에는 won_point(team_name: str)과 score() 두 가지 메서드가 있어야 합니다.

```js
class TennisGame1(TwoTeamGame):
    def __init__(self, team1_name: str, team2_name: str):
        super().__init__(team1_name, team2_name)

    def won_point(self, team_name: str):
        ...

    def score(self) -> str:
        ...
```

## 점수 계산 전략 구현

won_points(team_name)부터 시작해보죠. 이 메서드는 매우 간단합니다. team_name으로 팀 이름을 전달하면 해당 플레이어의 점수가 하나 증가해야 합니다. 그러나 SOLID 원칙을 적용하기 위해 더 높은 추상화 수준에 대해 고려해야 합니다.

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>


won_points를 스코어링 전략을 사용하는 것으로 생각할 수 있습니다.

```python
from abc import ABC, abstractmethod

class TwoTeamScoringStrategy(ABC):
    @abstractmethod
    def update_score(
        self, game: TwoTeamGame, team_name: str,
    ):
        pass
```

won_points에서 스코어링 전략을 추출한 이유는 SOLID의 개방/폐쇄 원칙을 지키기 위한 것입니다. won_points에서 스코어링 전략을 분리함으로써, won_points 자체를 수정하지 않고도 스코어링 전략을 쉽게 교체하거나 변경할 수 있습니다.

이제 StandardTennisScoring을 만들어봅시다:


<!-- TIL 수평 -->
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
class StandardTennisScoring(TwoTeamScoringStrategy):
    def update_score(
        self,
        game: TwoTeamGame,
        team_name: str,
    ):
        if game.team1_name == team_name:
            game.team1_points += 1
        elif game.team2_name == team_name:
            game.team2_points += 1
        else:
            raise ValueError("Invalid team name")
```

위의 코드를 won_point 메서드에 구현하려면 TennisGame 클래스에 스코링 전략을 전달하고 won_point에서 StandardTennisScoring의 update_score 메서드를 호출해야 합니다:

```js
# 주의:
# 절대로 클래스 인스턴스를 기본 인수로 초기화해서는 안 됩니다.
# 기사에서는 이 문제를 수정하지 않고 주어진 테스트를 통과하기 위해 이를 수행합니다.

class TennisGame1(TwoTeamGame):
    def __init__(
        self,
        team1_name: str,
        team2_name: str,
        score_strategy: TwoTeamScoringStrategy = StandardTennisScoring(),
        score_reperesentation: TwoTeamScoreRepresentation = TennisScoreRepresentation(),
    ):
        super().__init__(team1_name, team2_name)
        self.score_strategy = score_strategy
        self.score_representation = score_representation

    def won_point(
        self,
        team_name: str,
    ):
        if team_name == self.team1_name:
            self.score_strategy.update_score(game=self, team_name=team_name)
        elif team_name == self.team2_name:
            self.score_strategy.update_score(game=self, team_name=team_name)
        else:
            raise ValueError("Invalid team name")

     def score(self):
        ...
```

## 스코어 표현 구현하기


<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

지금 남은 작업은 score() 메서드를 구현하는 것뿐입니다. 먼저 두 팀 게임의 점수를 표현하는 추상 클래스를 생각해 봅시다. 점수를 나타내려면 게임의 점수에 액세스할 수 있어야 하므로 represent_score 메서드의 game이 매개변수인지 확인해 봅시다.

```js
class TwoTeamScoreRepresentation(ABC):
    @abstractmethod
    def represent_score(self, game: TwoTeamGame) -> str:
        pass
```

빠르게 어떤 단어가 어떤 점수에 관련된지 요약해보겠습니다:

- 0: Love
- 1: Fifteen
- 2: Thirty
- 3: Forty or Deuce
- 4: Deuce, Advantage or win (최다 점수를 획득한 플레이어의 점수만 나타내기 때문에)

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

테니스 게임을 생각해볼 때, 점수를 나타내는 세 가지 유형의 상황이 있습니다:

- 두 플레이어가 동일한 점수를 가지고 있는 경우.
- 두 플레이어가 동일한 점수를 가지고 있거나 한 플레이어가 더 많은 점수를 가지고 있지만 적어도 한 플레이어가 세 점보다 많은 점수를 가지고 있다 (그러면 우승 가능성이 있고, 이기거나 지는 장단점이 있을 수 있다).
- 한 플레이어가 다른 플레이어보다 더 많은 점수를 가지고 있지만 두 플레이어 모두 세 점보다 많은 점수를 가지고 있지 않은 경우

```js
class TennisScoreRepresentation(TwoTeamScoreRepresentation):
    def represent_score(self, game: TwoTeamGame) -> str:
        if game.team1_points == game.team2_points:
            return ...
        if max(game.team1_points, game.team2_points) >= 4:
            return ...
        return ...
```

우리가 지정한 세 가지 상황에 대해 클래스를 만들어 봅시다. 어떻게 점수를 나타내는지 확인하려면 tennis_unittest.py에서 테스트가 어떻게 지정되어 있는지 살펴봐야 합니다.

<!-- TIL 수평 -->
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
#(team1_score, team2_score, score_representation, team1_name, team2_name)
(2, 2, "Thirty-All", 'player1', 'player2'),
(3, 3, "Deuce", 'player1', 'player2'),
(4, 4, "Deuce", 'player1', 'player2'),
(1, 0, "Fifteen-Love", 'player1', 'player2'),
(4, 2, "Win for player1", 'player1', 'player2')
(4, 3, "Advantage player1", 'player1', 'player2'),
(14, 15, "Advantage player2", 'player1', 'player2'),
(14, 16, "Win for player2", 'player1', 'player2'),
```

```js
class TennisTieRepresentation(TwoTeamScoreRepresentation):
    def __init__(self, score_names: set[str] = ("Love", "Fifteen", "Thirty")):
        super().__init__()
        self.score_names = score_names

    def represent_score(self, game: TwoTeamGame) -> str:
        return {
            0: f"{self.score_names[0]}-All",
            1: f"{self.score_names[1]}-All",
            2: f"{self.score_names[2]}-All",
        }.get(game.team1_points, "Deuce")


class TennisEndGameRepresentation(TwoTeamScoreRepresentation):
    def represent_score(self, game: TwoTeamGame) -> str:
        point_difference = game.team1_points - game.team2_points
        leader = game.team1_name if point_difference > 0 else game.team2_name
        if abs(point_difference) == 1:
            return f"Advantage {leader}"
        else:
            return f"Win for {leader}"


class TennisNormalRepresentation(TwoTeamScoreRepresentation):
    def __init__(self, score_names: set[str] = ("Love", "Fifteen", "Thirty", "Forty")):
        super().__init__()
        self.score_names = score_names

    def represent_score(self, game: TwoTeamGame) -> str:
        return f"{self.score_names[game.team1_points]}-{self.score_names[game.team2_points]}"
```

If we implement these classes in the TennisScoreRepresentation we’ll get the following code:

```js
class TennisScoreRepresentation(TwoTeamScoreRepresentation):
    def __init__(
        self,
        tie_score: TwoTeamScoreRepresentation = TennisTieRepresentation(),
        end_game_score: TwoTeamScoreRepresentation = TennisEndGameRepresentation(),
        normal_score: TwoTeamScoreRepresentation = TennisNormalRepresentation(),
    ):
        self.tie_score = tie_score
        self.end_game_score = end_game_score
        self.normal_score = normal_score

    def represent_score(self, game: TwoTeamGame) -> str:
        if game.team1_points == game.team2_points:
            return self.tie_score.represent_score(game)
        if max(game.team1_points, game.team2_points) >= 4:
            return self.end_game_score.represent_score(game)
        return self.normal_score.represent_score(game)
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

## 모든 것을 합쳐보기

이제 완료했어요! 코드를 모두 결합한 것을 살펴봅시다. 만약 이 코드를 tennis1.py 파일에 넣고 터미널에서 pytest를 실행하면 모든 테스트가 여전히 통과해야 합니다.

아마 궁금할 것입니다. tennis_unittest.py에 쓰인 테스트를 준수하는 모든 기능과 규칙을 구현한 한 클래스를 작성할 수 있는데, 왜 이런 클래스들이 필요한 걸까요? 이유는, SOLID 원칙을 준수함으로써, 전체 구현의 어떤 부분이든 손쉽게 교체할 수 있고 기존 코드를 변경하거나 망가뜨리지 않을 수 있습니다. 우리가 바꾸고 싶은 부분에 대해 약간의 새 코드만 작성하면 됩니다. 이는 거의 모든 코드 부분에 적용되며, 각 클래스가 교체 가능하기 때문입니다.

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>


# 새로운 점수 표현 방식
class FrenchScoreRepresentation(TwoTeamScoreRepresentation):
    # 프랑스어 점수 표현에 대한 구현
    ...

# 게임에 새 전략 주입
french_game = TennisGame1(
                    team1_name="T1", 
                    team2_name="T2", 
                    score_representation=FrenchScoreRepresentation()
)


## 결론

SOLID 원칙을 적용하여, 우리는 프로덕션 수준의 코드 구조를 사용하여 이 리팩터링 카타를 해결했습니다. 이제 SOLID 원칙을 어떻게 적용해야 하는지 더 잘 이해할 수 있을 것입니다. 클래스의 더 높은 추상화를 정의하여 시작하고, 각 클래스의 서브클래스를 교환 가능하도록 만들어 의존성 주입을 사용하여 새 기능을 쉽게 조정하고 적용할 수 있도록 했습니다.

높은 품질의 Python 코드에 대해 더 배우고 싶으세요? 이 다른 기사들도 꼭 확인하세요!
