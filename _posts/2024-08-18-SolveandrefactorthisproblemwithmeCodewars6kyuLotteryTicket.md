---
title: "Lottery Ticket Codewars 6kyu 알고리즘 풀기"
description: ""
coverImage: "/assets/img/2024-08-18-SolveandrefactorthisproblemwithmeCodewars6kyuLotteryTicket_0.png"
date: 2024-08-18 11:41
ogImage: 
  url: /assets/img/2024-08-18-SolveandrefactorthisproblemwithmeCodewars6kyuLotteryTicket_0.png
tag: Tech
originalTitle: "Solve and refactor this problem with me Codewars 6kyu Lottery Ticket"
link: "https://medium.com/gitconnected/solve-and-refactor-this-problem-with-me-codewars-6kyu-lottery-ticket-9a3cbdf9a7b8"
isUpdated: true
updatedAt: 1724032816620
---


<img src="/assets/img/2024-08-18-SolveandrefactorthisproblemwithmeCodewars6kyuLotteryTicket_0.png" />

리팩터링은 기능을 변경하지 않고 코드를 다시 작성하는 것을 의미합니다. Codewars의 이 연습 문제(링크: https://www.codewars.com/kata/57f625992f4d53c24200070e/train/ruby)에서는 초기 솔루션을 어떻게 리팩터링했는지를 보여줄 거에요(그런데 함께 고민해보고 싶네요, Ruby, Python 또는 다른 프로그래밍 언어로 작업할 수 있어요). 이게 문제 설명이에요.

복권 티켓(티켓)이 주어지는데, 이는 2 값 배열들의 배열로 표현됩니다. 당첨금을 받았는지 확인해야 해요. 예시 티켓:

<div class="content-ad"></div>

```js
[ [ 'ABC', 65 ], [ 'HGR', 74 ], [ 'BYHT', 74 ] ]
```

이를 위해 먼저 티켓에서 '미니 당첨'을 세어야 합니다. 각 하위 배열에는 문자열과 숫자가 모두 포함되어 있습니다. 문자열 내의 어떤 문자의 문자 코드가 숫자와 일치하면 미니 당첨을 받습니다. 주의: 서브 배열 당 미니 당첨은 한 번만 받을 수 있습니다.

미니 당첨을 모두 센 후, 해당 숫자를 다른 제공된 입력(win)과 비교하십시오. 총합이 (win) 이상이면 '승자!'를 반환하고, 그렇지 않으면 '패자!'를 반환하십시오.

모든 입력값은 올바른 형식으로 제공됩니다. 티켓의 문자열은 항상 같은 길이가 아닐 수 있습니다.

<div class="content-ad"></div>

테스트 케이스 및 예상 결과:

```js
p get_jackpot_results([['ABC', 65], ['HGR', 74], ['BYHT', 74]], 2) == 'Loser!'
p get_jackpot_results([['ABC', 65], ['HGR', 74], ['BYHT', 74]], 1) == 'Winner!'
p get_jackpot_results([['HGTYRE', 74], ['BE', 66], ['JKTY', 74]], 3) == 'Loser!'
```

먼저, 내가 직접 문제를 재정의해 보겠습니다:

```js
#문제
========
# -메소드는 중첩 배열 / 배열의 배열을 인수로 받습니다
# -중첩 배열의 하위 배열은 문자열과 숫자로 구성됩니다
# -문자열은 문자로 이루어져 있고, 문자는 코드를 가지고 있습니다 (ASCII 테이블 기준)
# -만약 숫자(ASCII 코드를 나타내는)가 어떤 문자의 ASCII 코드와 일치하면 미니-승리입니다
# -하나의 하위 배열당 미니-승리는 하나만 가능합니다
# -모든 미니-승리가 계산된 후, 이 숫자(합)를 두 번째 메소드 인자로 전달된 것과 비교합니다,
#   잭팟을 이기기 위해 필요한 수
# -미니-승리 수가 동일하거나 크면, 메소드는 'Winner!'을 반환하고, 그렇지 않으면 'Loser!'를 반환합니다
```

<div class="content-ad"></div>

그런 다음, 문제를 이해했는지 확인하기 위해 예시를 분석했습니다(1개의 예시 실제로만):

```js
# 예시
# ========
# bingo([['ABC', 65], ['HGR', 74], ['BYHT', 74]], 2) == 'Loser!'

# ['ABC', 65]
# 'ABC'를 분석합니다 ->, ASCII 코드 'A', 'B' 및 'C'를 'ord' 메소드를 사용하여 확인합니다
# 'A' -> 65 -> 미니 당첨입니다. 더 분석할 필요 없음(티켓당 미니 당첨은 1회만 가능)
# 
# ['HGR', 74]
# 'HGR'를 분석합니다 ->
# 'H' -> 72
# 'G' -> 71
# 'R' -> 82 -> 어느 것도 74에 해당되지 않으므로 여기에는 미니 당첨이 없습니다. 다음으로 넘어갑니다

# ['BYHT', 74]
# 'BYHT'를 분석합니다 ->
# 'B' -> 66
# 'Y' -> 89
# 'H' -> 72
# 'T' -> 84 -> 어느 것도 74에 해당되지 않으므로 여기에는 미니 당첨이 없습니다
```

그리고 이를 기반으로 다음과 같은 알고리즘을 만들었습니다:

```js
# 알고리즘
# ==========
# - `calculate_mini_win(subarray)`라는 도우미 메소드 생성
# - 메소드는 배열을 가져와
# - 배열의 첫 번째 요소를 문자 배열로 분할
# - 해당 문자를 ASCII 테이블 숫자로 매핑
# - ASCII 테이블의 위치로 변환될 때 어느 문자 하나라도 두 번째 요소와 같으면 true를 반환, 아니면 false를 반환
# - 도우미 메소드가 작동하는지 테스트(자체 테스트 케이스 작성)
#
# - 메인 메소드 `get_jackpot_result(tickets)` 만들기
# - `score`를 0으로 초기화
# - 티켓을 반복
# - 각 티켓에 대해 calculate_mini_win을 인수로 사용하여 호출
# - 메소드가 true를 반환하면 점수에 1을 추가
# - 아니면 0을 추가
# - 반복이 완료되면, 점수를 두 번째 인수, 잭팟에 당첨되기 위한 예상 점수와 비교
# - 점수가 같거나 더 크면 'Winner!'를 반환, 아니면 'Loser!'를 반환
```

<div class="content-ad"></div>

이 알고리즘에 따라 첫 번째 솔루션을 코딩했어요:

```js
def calculate_mini_win(inner_ticket)
  array_of_characters = inner_ticket[0].chars
  ascii = array_of_characters.map {|char| char.ord}
  ascii.any? { |int| int == inner_ticket[1]}
end

p calculate_mini_win(['ABC', 65])
p calculate_mini_win(['BYHT', 74])


def get_jackpot_results(ticket, win)
  score = 0
  ticket.each do |inner_ticket|
    score += 1 if calculate_mini_win(inner_ticket)
  end

  if score >= win
    return 'Winner!'
  else
    return 'Loser!'
  end
end

p get_jackpot_results([['ABC', 65], ['HGR', 74], ['BYHT', 74]], 2) == 'Loser!'
p get_jackpot_results([['ABC', 65], ['HGR', 74], ['BYHT', 74]], 1) == 'Winner!'
p get_jackpot_results([['HGTYRE', 74], ['BE', 66], ['JKTY', 74]], 3) == 'Loser!'
```

첫 번째 리팩터링 힌트는 RubyMine에서왔어요. 제목 아래에 나타난 스크린샷을 보면 오렌지색 squiggly 선으로 표시된 return이라는 단어를 볼 수 있어요. Ruby에는 암시적인 반환(implicit return)이 있어요. 암시적 반환은 Ruby 메소드가 기본적으로 마지막으로 평가된 줄의 결과를 암시적으로 반환한다는 것을 의미해요. 여기서 마지막 평가된 줄은 반환 문 중 하나가 될 것이기 때문에 반환을 할 필요가 없어서 제거해줬어요:

```js
def calculate_mini_win(inner_ticket)
  array_of_characters = inner_ticket[0].chars
  ascii = array_of_characters.map {|char| char.ord}
  ascii.any? { |int| int == inner_ticket[1]}
end

p calculate_mini_win(['ABC', 65])
p calculate_mini_win(['BYHT', 74])


def get_jackpot_results(ticket, win)
  score = 0
  ticket.each do |inner_ticket|
    score += 1 if calculate_mini_win(inner_ticket)
  end

  if score >= win
    'Winner!'
  else
    'Loser!'
  end
end
p get_jackpot_results([['ABC', 65], ['HGR', 74], ['BYHT', 74]], 2) == 'Loser!'
p get_jackpot_results([['ABC', 65], ['HGR', 74], ['BYHT', 74]], 1) == 'Winner!'
p get_jackpot_results([['HGTYRE', 74], ['BE', 66], ['JKTY', 74]], 3) == 'Loser!'
```

<div class="content-ad"></div>

별로 많이 바뀐 부분은 없지만, 단어를 2개 지워서 코드를 간소화하겠어요. 코드를 보고 있으니 아이디어가 떠오르네요 (주석으로 표현):

```js
def calculate_mini_win(inner_ticket)
  array_of_characters = inner_ticket[0].chars
  ascii = array_of_characters.map { |char| char.ord }
  ascii.any? { |int| int == inner_ticket[1] } # 본문을 1줄로 줄이기
end
p calculate_mini_win(['ABC', 65])
p calculate_mini_win(['BYHT', 74])

def get_jackpot_results(ticket, win)
  score = 0
  ticket.each do |inner_ticket|
    score += 1 if calculate_mini_win(inner_ticket)
  end

  score >= win ? 'Winner!' : 'Loser!'  # 삼항 연산자 사용, 5줄을 1줄로 줄이기
end
p get_jackpot_results([['ABC', 65], ['HGR', 74], ['BYHT', 74]], 2) == 'Loser!'
p get_jackpot_results([['ABC', 65], ['HGR', 74], ['BYHT', 74]], 1) == 'Winner!'
p get_jackpot_results([['HGTYRE', 74], ['BE', 66], ['JKTY', 74]], 3) == 'Loser!'
```

내가 말한 주석 내용을 이해했나요? 위 코드를 복사해서 직접 리팩토링해 보세요. Ruby 삼항 연산자 구문이 무엇인지와 어떻게 사용하는지 알아보기 위해 Google 또는 chatGPT를 활용할 수 있어요.

제가 그것을 구현한 방법은 다음과 같다고 해요:

<div class="content-ad"></div>

```js
def calculate_mini_win(inner_ticket)
  inner_ticket.first.chars.map(&:ord).any? { |int| int == inner_ticket.last}
end

def get_jackpot_results(ticket, win)
  score = 0

  ticket.each do |inner_ticket|
    score += 1 if calculate_mini_win(inner_ticket)
  end

  score >= win ? 'Winner!' : 'Loser!'
end
```

내 솔루션이 모든 Codewars 테스트를 통과했어요, 억양!

![image](/assets/img/2024-08-18-SolveandrefactorthisproblemwithmeCodewars6kyuLotteryTicket_1.png)

의자에 기대어, 만족스럽게 현재 순간을 즐기고 있어요. 알고 있어요, 이 순간은 오래가지 않을 거란 걸. 왜냐하면 지금 이제 난 다른 사람들의 솔루션을 살펴보게 될 거니까, 분명 나도 그 중에서 내가 왜 그렇게 생각 못했을까하는 것을 발견하리라는 걸 알면서요. 그래서 그래요, c0nspiracy의 솔루션을 발견했어요:


<div class="content-ad"></div>


위의 표를 마크다운 형식으로 변경하실래요.
