---
title: "제목 Solve and refactor this problem with me Count letters in string을 규칙에 맞춰 한글로 바꾸면 다음과 같습니다1 구체적인 기술 명시- JavaScript로 문자열에서 문자 개수 세기 문제 해결 및 리팩토링2 버전 또는 연도 포함- 2024년 최신 JavaScript로 문자열 문자 개수 세기 문제 해결 및 리팩토링3 특정 기능 또는 방법 강조- 문자열에서 문자 개수 세는 방법과 코드 리팩토링4 비교 또는 대조- 기존 방식과 새로운 방식으로 문자열 문자 개수 세기 및 리팩토링 비교5 목록 제공- JavaScript로 문자열 문자 개수 세기 및 리팩토링을 위한 3단계 과정당신의 니즈와 관련된 포괄적인 제목으로는 다음과 같은 형태로 바꿀 수 있습니다- JavaScript로 문자열에서 문자 개수 세는 방법과 코드 리팩토링"
description: ""
coverImage: "/assets/img/2024-07-12-SolveandrefactorthisproblemwithmeCountlettersinstring_0.png"
date: 2024-07-12 21:38
ogImage:
  url: /assets/img/2024-07-12-SolveandrefactorthisproblemwithmeCountlettersinstring_0.png
tag: Tech
originalTitle: "Solve and refactor this problem with me (Count letters in string)."
link: "https://medium.com/gitconnected/solve-and-refactor-this-problem-with-me-count-letters-in-string-b1d74c51d5a6"
isUpdated: true
---

<img src="/assets/img/2024-07-12-SolveandrefactorthisproblemwithmeCountlettersinstring_0.png" />

리팩토링이란 기능을 변경하지 않고 코드를 다시 작성하는 것입니다. Codewars의 이 연습문제에서, https://www.codewars.com/kata/5808ff71c7cfa1c6aa00006d/train/ruby

저는 처음에 긴 솔루션을 이 문제에 대해 어떻게 리팩토링했는지 보여드릴 거에요(그리고 함께 해보도록 하고 싶어요. 루비, 파이썬 또는 다른 프로그래밍 언어로 할 수 있어요):

이 카타에서 주어진 문자열에서 소문자를 세고 'letter'를 키로, 'value'로서 카운트를 반환해야 해요. 루비에서는 키가 '문자열' 대신 '심볼'이어야 하며, Crystal에서는 키가 '문자열' 대신 '캐릭터'여야 해요.

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

테스트 케이스와 예상 결과:

```js
p letter_count('codewars') == { a: 1, c: 1, d: 1, e: 1, o: 1, r: 1, s: 1, w: 1 }
p letter_count('codewAars') == { a: 1, c: 1, d: 1, e: 1, o: 1, r: 1, s: 1, w: 1 }
p letter_count('activity') == { a: 1, c: 1, i: 2, t: 2, v: 1, y: 1 }
p letter_count('arithmetics') == { a: 1, c: 1, e: 1, h: 1, i: 2, m: 1, r: 1, s: 1, t: 2 }
```

먼저, 문제를 내 말로 다시 적어 봤어요:

```js
# 문제
# ========
# - 문자열을 인수로 받는 메서드를 작성하세요.
# - 메서드는 해시로 소문자 알파벳 수를 반환합니다.
# - 해시에서 키는 문자가 되고 값은 개수가 됩니다.
# - 키는 문자열이 아니라 심볼이어야 합니다.
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

그럼 문제를 잘 이해했는지 확인하기 위해 몇 가지 예제를 분석했습니다:

```js
p letter_count('codewars') == { a: 1, c: 1, d: 1, e: 1, o: 1, r: 1, s: 1, w: 1 }
# => 문자열 인수에는 소문자만 있어야 함
# => 문자열에서 문자가 키로 변함 (그리고 심볼로!)
p letter_count('codewAars') == { a: 1, c: 1, d: 1, e: 1, o: 1, r: 1, s: 1, w: 1 }
# => 문자열 인수에 대문자 A가 포함되어 있지만, 개수에는 무시됨
p letter_count('activity') == { a: 1, c: 1, i: 2, t: 2, v: 1, y: 1 }
# => 문자열 인수에는 소문자만 있어야 함
p letter_count('arithmetics') == { a: 1, c: 1, e: 1, h: 1, i: 2, m: 1, r: 1, s: 1, t: 2 }
# => 문자열 인수에는 소문자만 있어야 함
```

그리고 이를 바탕으로 알고리즘을 만들었어요:

```js
# 알고리즘
# =========
# - `count` 변수를 빈 해시로 초기화
# - 문자열 인수를 문자 배열로 변환하고 대문자를 제거
# - 문자 배열을 반복하며:
# --현재 문자를 본다
# --현재 문자를 소문자로 변환하고 심볼로 변환한 키가 결과 해시에 없다면, 새로 추가
# --이미 존재한다면 값 증가

# -암묵적으로 `count` 해시 반환
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

이 알고리즘에 따라 첫 번째 솔루션을 코딩했어요:

```js
def letter_count(str)
  count = {}
  arr = str.chars.reject { |char| char == char.upcase }

  arr.each do |char|
    if !count.key?(char.to_sym)
      count[char.to_sym] = 1
    else
      count[char.to_sym] += 1
    end
  end
  count
end
```

테스트 케이스는 통과되었고, 이제 내가 어떻게 리팩토링할 수 있을지 고려했어. 코드를 복사해서 리팩토링 시도해볼래? 아니면 첫눈에 떠오르는 리팩토링 아이디어가 있나요? 여기는 제 아이디어야 (초록색으로 주석 처리된 부분):

```js
def letter_count(str)
  count = {}
  arr = str.chars.reject { |char| char == char.upcase }

  arr.each do |char|
    if !count.key?(char.to_sym)     # DRY
      count[char.to_sym] = 1        # DRY
    else
      count[char.to_sym] += 1       # Do Not Repeat Yourself
    end
  end
  count
end
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

가장 먼저 눈에 띄는 것은 char에 대해 3번의 to_sym 메소드를 호출한다는 것이다. 그래서 코드를 변경했습니다:

```js
def letter_count(str)
  count = {}
  arr = str.chars.reject { |char| char == char.upcase }

  arr.each do |char|
    char = char.to_sym
    if !count.has_key?(char)
      count[char] = 1
    else
      count[char] += 1
    end
  end
  count
end
```

이 문제에 대한 당신의 해결책이 궁금합니다. 저는 문제를 해결한 뒤에 Ruby가 Enumerable#tally 메소드를 가지고 있어 배열의 요소를 계산하고 해시로 반환한다는 것을 기억했습니다. 하지만 대문자를 제거해야 했습니다:

```js
def letter_count(string)
  string.chars.tally.transform_keys { |key| key.to_sym }.delete_if { |k, _| k == k.upcase }
end
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

transform_keys 함수를 사용하여 키를 심볼로 변경하고 delete_if 함수를 사용하여 대문자로 된 키를 제거했어요. 초기에는 12줄이었던 내 솔루션이 3줄로 줄어들었는데, 명확성을 많이 잃지 않고요.

마지막 솔루션에 대해 어떻게 생각하세요? 이것은 한 줄짜리입니다 (메소드 정의 줄을 제외하면요! 하지만 한 줄짜리가 항상 좋은 것은 아니에요. 매우 명확하고 읽기 쉬운 경우에만 좋아요. 때로는 이것이 개인적인 의견에 따라 달라질 수 있어요.

이 글은 문제 해결과 간단한 리팩터링에 대해 통찰력을 얻고 싶어하는 공부하는 누군가에게 도움이 될 것을 바라며 썼어요. Ruby나 다른 언어로 다른 솔루션에 대한 질문이나 아이디어가 있다면 댓글에 남겨주세요.

보너스: Array#each_with_object 메소드를 사용하여도 이 문제를 해결할 수 있어요:

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

def letter_count(string)
array = string.chars.sort

count = array.each_with_object(Hash.new(0)) do |char, hash|
hash[char] += 1
end

count.delete*if { |k, *| k == k.upcase }.transform_keys { |key| key.to_sym }
end
