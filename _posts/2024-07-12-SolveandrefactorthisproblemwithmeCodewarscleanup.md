---
title: "코드 리팩토링과 문제 해결을 함께 하자 Codewars 청소 방법"
description: ""
coverImage: "/assets/img/2024-07-12-SolveandrefactorthisproblemwithmeCodewarscleanup_0.png"
date: 2024-07-12 21:39
ogImage: 
  url: /assets/img/2024-07-12-SolveandrefactorthisproblemwithmeCodewarscleanup_0.png
tag: Tech
originalTitle: "Solve and refactor this problem with me (Codewars cleanup)."
link: "https://medium.com/gitconnected/solve-and-refactor-this-problem-with-me-codewars-cleanup-fd214a49e370"
isUpdated: true
---





![Solve and refactor this problem with me Codewars cleanup](/assets/img/2024-07-12-SolveandrefactorthisproblemwithmeCodewarscleanup_0.png)

리팩터링은 코드의 기능을 변경하지 않고 다시 작성하는 것을 말합니다. 이 연습에서는 처음에 긴 솔루션을 어떻게 리팩터링했는지 보여드리겠습니다(그리고 함께 할 수 있도록 초대합니다. 루비, 파이썬 또는 다른 프로그래밍 언어로 할 수 있습니다):

모든 단어(모두 소문자)와 알파벳이 아닌 문자의 조합으로 이루어진 문자열이 주어졌을 때, 알파벳이 아닌 문자를 모두 공백으로 대체하는 메서드를 작성하세요. 두 개 이상의 알파벳이 아닌 문자가 연속해서 나오는 경우 결과물에는 한 칸의 공백만 있어야 합니다(결과물에는 연속된 공백이 없어야 합니다). 테스트 케이스와 기대 결과:

```js
p cleanup("---what's my +*& line?") == ' what s my line '
```

<div class="content-ad"></div>

먼저 제가 직접 문제를 다시 작성해 보겠습니다.

```js
# 문제
# ========
# 메소드는 문자열을 인수로 받습니다.
# 문자열에는 소문자 또는 알파벳이 아닌 문자만 포함됩니다.
# 메소드는 문자열 인수를 받아 알파벳이 아닌 모든 문자를 공백으로 대체한 뒤, 
# 그러나 연속으로 나타나는 알파벳이 아닌 문자가 더 많으면 대체 대신 한 개의 공백만 사용하도록 합니다.
```

그런 다음 내가 문제를 정확히 이해했는지 확인하기 위해 예제를 분석했습니다.

```js
p cleanup("---what's my +*& line?") == ' what s my line '
#          xxx    x     xxx     x   
# x로 표시된 문자들은 제거되어야 합니다.
# 반환된 문자열에는 제거된 문자들 대신 하나의 공백만 있어야 합니다.

# => 예상 결과: ' what s my line '
```

<div class="content-ad"></div>

그리고 이를 바탕으로 내 알고리즘을 생각해 냈습니다:

```js
# 알고리즘
# ==========
# - `소문자_알파벳` 정의
# - `소문자_알파벳`에 속하지 않는 문자를 공백으로 대체
# - 공백을 제외한 여분의 공백을 제거하고 하나만 남김
```

이 알고리즘에 따라 첫 번째 해결책을 작성했습니다:

```js
def cleanup(str)
  lowercase = ('a'..'z').to_a

  str.each_char do |char|
    if !lowercase.include?(char)
      str.sub!(char, " ")
    end
  end

  str.squeeze
end
```

<div class="content-ad"></div>

테스트 케이스가 통과되었고, 이제 리팩터링을 어떻게 할지 고민 중이었어요. 코드를 복사하고 리팩터링해보고 싶으세요? 아니면 처음 봤을 때 어떻게 리팩터링할지 생각해보셨나요? 제 생각은 이랬어요 (연두색으로 주석 처리):

```js
def cleanup(str)

  str.each_char do |char|
    if !('a'..'z').include?(char)
      str.sub!(char, " ")
    end
  end.squeeze

end
```

<div class="content-ad"></div>

친구가 제안한 것처럼, 테이블 태그를 마크다운 형식으로 바꿔보겠습니다:


Change the table tag to Markdown format.


<div class="content-ad"></div>

위의 코드를 볼 때, 어떻게 줄일 수 있는지 아이디어가 떠올랐어요. 보이시나요? (아니라면, 아래 초록색 코멘트를 보세요):

```js
def cleanup(str)

  new_str = str.sub(/./) do |char| # 이 부분을 인라인 블록으로 변경할 수 있어요
     ('a'..'z').include?(char) ? char : ' ' 
  end.squeeze

end
```

최종 버전은:

```js
def cleanup(str)
   str.gsub(/./) { |char| ('a'..'z').include?(char) ? char : ' ' }.squeeze
end
```

<div class="content-ad"></div>

새로운_str을 제거했어요, Ruby 메소드는 암묵적으로 마지막으로 평가된 줄을 반환하므로 필요하지 않아요. 또한 do..end 블록을 '' 블록으로 변경했어요, 이것은 1줄로 들어맞아요.

최종 솔루션에 대한 의견은 어떠세요? 한 줄짜리 코드네요! 하지만 한 줄짜리 코드가 항상 좋은 것은 아니에요. 아주 명확하고 읽기 쉬운 경우에만 좋아요, 이것은 때로는 개인의 의견에 따라 다를 수 있어요.

이 글은 문제 해결과 간단한 리팩토링이 어떤 것인지 알고 싶어하는 공부 중인 분들에게 도움이 되길 바라며 작성했어요. 다른 솔루션에 대한 질문이나 아이디어가 있으면 댓글로 알려주세요, Ruby나 다른 언어에서도 괜찮아요.