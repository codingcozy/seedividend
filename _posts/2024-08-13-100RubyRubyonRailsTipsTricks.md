---
title: "반드시 알아둬야할 루비 루비 온 레일즈 팁 100가지 "
description: ""
coverImage: "/assets/img/2024-08-13-100RubyRubyonRailsTipsTricks_0.png"
date: 2024-08-13 11:43
ogImage:
  url: /assets/img/2024-08-13-100RubyRubyonRailsTipsTricks_0.png
tag: Tech
originalTitle: "100 Ruby   Ruby on Rails Tips , Tricks"
link: "https://medium.com/@pinte.ionut.andrei/100-ruby-ruby-on-rails-tips-tricks-0ed95b73f685"
isUpdated: true
updatedAt: 1723863966051
---

안녕하세요, 이 글에서는 루비 코드를 작성할 때 사용하는 100가지 팁 및 트릭에 대해 다룰 예정입니다. 주로 루비, 루비 온 레일즈, Rspec 및 일반 프로그래밍 최상의 실천법에 중점을 두었습니다.

이러한 팁은 루비를 처음 다루는 사람들과 경험이 풍부한 루비 사용자 모두에게 적합합니다.

![이미지](/assets/img/2024-08-13-100RubyRubyonRailsTipsTricks_0.png)

# 1. 가드 절을 사용하세요

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

루비의 가장 독특한 기능 중 하나는 가드 절을 다루는 방법입니다. 루비는 읽기 쉽고 쓰기 쉬운 우아한 구문을 갖고 있기 때문에 평범한 영어처럼 보이는 가드 절을 작성할 수 있습니다.

가드 절이 없는 경우

```js
def spell_usage(spell)
  if spell.includes?('frog')
    return 'This is a metamorphose spell'
  elsif spell.includes?('mushrooms')
    return 'This is a poisoning spell'
  else
    return 'This is a generic spell'
  end
end
```

가드 절이 있는 경우

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
def spell_usage(spell)
  return '이 주문은 변身 주문입니다' if spell.includes?('개구리')
  return '이 주문은 중독 주문입니다' if spell.includes?('버섯')
  # return은 생략할 수 있습니다. 아래 코드는 마지막 메소드의 줄이기 때문입니다.
  '이 주문은 일반 주문입니다'
end
```

알 수 있듯이, 이 코드는 더 읽기 쉽고 동일한 기능을 얻기 위해 사용되는 키워드와 줄 수가 줄어듭니다.

가드 조건문은 unless 키워드와 함께 사용될 수도 있습니다.

# 2. 문자열 보간(interpolation)

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

루비는 다른 많은 언어들처럼 문자열 보간을 기본으로 제공합니다. 이 기능을 사용하면 동적이고 사용자 정의 가능한 문자열을 간단한 방법으로 작성할 수 있습니다.

문자열 보간 없이

```js
def cast(wizard, spell_type, target)
  wizard + ' casted a ' + spell_type + ' spell on ' + target + '.'
end

cast('Harry', 'love', 'Hermione')
# Harry casted a love spell on Hermione
```

문자열 보간을 사용하면

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
def cast(wizard, spell_type, target)
  "#{wizard}가 #{spell_type} 주문을 #{target}에 시전했습니다."
end

cast('Harry', '사랑', 'Hermione')
# Harry가 사랑 주문을 Hermione에 시전했습니다.

문자열 보간을 사용하면 코드의 복잡성이 줄어들고 문자열 연결과 비교하여 최종 문자열을 쉽게 파악할 수 있습니다.

# 3. 문자열 보간에서의 캐스팅

문자열 보간에 대한 또 다른 멋진 점은 $' 사이에 제공된 블록에 자동으로 to_s를 호출한다는 것입니다. 따라서 객체에서 to_s를 덮어쓰고 이를 통해 객체를 표시하는 멋진 방법을 얻을 수 있습니다.
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

형 변환과 문자열 보간 없이

```js
class Wizard
  attr_accessor :name, :magic_power

  def initialize(name, magic_power)
    @name = name
    @magic_power = magic_power
  end

  def show
    "#{name} [#{magic_power}]"
  end
end

ignacia = Wizard.new('Warmy', 'Fire')
marina = Wizard.new('Marina', 'Water')

puts "결투 시작: #{ignacia.show} 대 #{marina.show}"

# 결투 시작: Warmy [Fire] 대 Marina [Water]
```

형 변환과 문자열 보간을 사용하여

```js
class Wizard
  attr_accessor :name, :magic_power

  def initialize(name, magic_power)
    @name = name
    @magic_power = magic_power
  end

  def to_s
    "#{name} [#{magic_power}]"
  end
end

ignacia = Wizard.new('Warmy', 'Fire')
marina = Wizard.new('Marina', 'Water')

puts "결투 시작: #{ignacia} 대 #{marina}"

# 결투 시작: Warmy [Fire] 대 Marina [Water]
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

2번 예시에서는 문자열 보간을 사용했기 때문에 .to_s를 명시적으로 호출할 필요가 없었습니다.

# 4. "?"로 끝나는 메소드

루비에서는 종종 이렇게 물음표로 끝나는 메소드를 볼 수 있습니다. 이는 해당 메소드가 부울 값을 반환한다는 것을 나타냅니다. 코드의 가독성을 높이기 위해 부울 값을 반환하는 사용자 정의 메소드에도 이를 추가하는 것이 좋습니다.

```js
class MagicJourney
  ...
  def in_progress?
    # true / false
  end
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

in_progress? 메소드는 마법의 여정이 진행 중인지 아닌지 확인하고 싶다는 것을 명확히 나타냅니다. 물음표(?)가 없으면 메소드가 혼란스러울 수 있습니다. jouner.in_progress를 호출하면 여정을 "진행 중" 상태로 옮길 것이라고 생각할 수도 있습니다.

# 5. “!”(뱅)로 끝나는 메소드

또한, 뭔가를 변경하는 메소드에도 비슷한 접근 방식이 사용됩니다. (호출하는 객체 또는 데이터베이스의 변경과 같이 다른 것을 변경하는 경우)

```js
available_ingredients = ['Star']
spell_ingredients = ['Star', 'Dragon Fruit Juice', 'Pink Sugar']

spell_ingredients.select do |ingredient|
  !available_ingredients.include?(ingredient)
end

# spell_ingredients 변경되지 않음
# 위 블록은 누락된 재료를 반환합니다

spell_ingredients.select! do |ingredient|
  !available_ingredients.include?(ingredient)
end

# spell_ingredients 변경됨
# 위 블록은 누락된 재료를 반환하고
# 원본 배열도 변경됩니다
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

!로 끝나는 메서드를 다룰 때 주의해야 합니다. 예상 동작을 이해하는 것이 중요하며, 그렇지 않으면 예기치 않은 변경된 데이터가 나올 수 있습니다 (그리고 주문이 성공하지 않을 수도 있습니다).

# 6. Times do

일부 상황에서는 명령 블록을 여러 번 실행해야 할 수 있습니다. Ruby에는 그렇게 하는 내장 방법이 있습니다. 또한 Ruby에는 전통적인 for 루프 구문이 없습니다.

전통적인 for 루프 (의사 코드)

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
hp = 100
10.times do
  puts 'Wizard was hit!'
  hp -= 10
end
puts "Remaining HP after the attack: #{hp}"
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

위자드가 맞았어요!
위자드가 맞았어요!
... [ 7번 더 ]
위자드가 맞았어요!
공격 후 남은 HP: 0

따라서 우리가 실행할 블록의 횟수를 정확히 알고 있다면 times do를 의지할 수 있습니다.

# 7. Symbol to Proc

이미 배열을 반복하고 그 안에서 블록을 하나만 실행해야 하는 경우가 있었나요? 특히 매핑 및 필터링과 같은 경우에 이런 일이 자주 발생합니다. Ruby에는 그런 경우를 위해 원 라이너로 동일한 기능을 달성할 수 있도록 하나의 구문 설탕 문법이 있습니다.

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

짧은 심볼을 프로크로 변경

```js
magical_creature_names = animals.filter(&:has_magical_powers?).map(&:name)
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

위에서 볼 수 있듯이, 동일한 기능을 얻기 위해 필요한 코드를 대폭 줄일 수 있으며, 메소드를 깔끔하게 연결할 수도 있습니다.

# 8. 안전 네비게이션 연산자

우리 코드에 포함된 조건과 결정 분기가 많을수록 코드를 이해하기 어려워지기 때문에 항상 코드를 깔끔하고 간단하게 유지하려고 노력해야 합니다. 깔끔한 코드로 나아가기 위한 한 가지 단계는 안전 네비게이션 연산자: ?. 사용입니다.

Safe Navigation operator가 없는 경우

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
def alohomora(room = nil)
  return unless room.present?
  return unless room.door.present?

  room.door.open
end
```

안전 탐색 연산자와 함께

```js
def alohomora(room = nil)
  room&.door&.open
end

# &. 안전 탐색 연산자는 다음 오류를 방지합니다:
# undefined method [Method_Name] for nil:NilClass (NoMethodError)
```

&. 연산자를 사용하면 독자들이 기능을 한눈에 빠르게 이해할 수 있습니다.

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

# 9. Compact

우리 배열에서 null (루비에서는 nil) 값을 필터링할 일이 충분히 있었어요! 루비는 바로 그 역할을 해주는 compact 메서드를 제공하여 도와줍니다.

```js
magical_mountain_ratings = [
  '5: 요정들이 훌륭해요!',
  nil,
  "1: 높이(또는 트롤)를 두려워하는 분들에게 추천하지 않아요."
]

# compact 사용 전
ratings = magical_mountain_ratings.select { |rating| !rating.nil? }

# compact 사용 후
ratings = magical_mountain_ratings.compact
```

compact를 map과 결합하여 사용하는 멋진 방법은, 원하는 요소로 이루어진 배열을 얻되 null 값 없이 종료하는 것이에요.

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
eligible_wizards = wizards.map do |wizard|
  if wizard.half_blood?
    nil
  else
    "Eligible: #{wizard.name}"
  end
end.compact
```

참고: compact에는 원본 배열을 수정하는 뱅 메서드도 있습니다: compact!

# 10. Each with object

가끔 배열이나 해시(객체/사전)를 반복하면서 동시에 정보를 저장해야 할 때가 있습니다. 이 경우를 위해 루비는 each_with_object 메서드를 제공합니다.

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

테이블 태그를 마크다운 형식으로 변경하면 다음과 같습니다.

| 명령어 | 설명                                         |
| ------ | -------------------------------------------- |
| ls     | 현재 디렉토리의 파일 목록을 보여줍니다.      |
| cd     | 디렉토리를 변경합니다.                       |
| pwd    | 현재 작업 중인 디렉토리의 경로를 표시합니다. |

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

각각의 객체에 주어진 매개변수는 기본값이며, 두 번째 매개변수인 do 블록에서의 값은 객체에 대한 참조입니다.

해시에 대해서도 동일하게 동작합니다:

```js
hash.each_with_object('') do |key, value, obj|
```

# 11. 반복

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

무한 루프가 무서워도, 코드에서 루프는 필요합니다. 특정 단계가 없다면 Ruby의 루프가 답입니다. 이것은 while true와 동일하지만 문법적으로 더 명확합니다.

루프 없이

```js
loop do
  wizard.practice_magic_spell
  wizard.cast_spell
  break if wizard.last_casted_spell.successfull?
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

```js
루비는 범위를 통해 연속적인 요소의 목록을 빠르게 생성할 수 있습니다.

(1..10).to_a    # 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
(1...10).to_a   # 1, 2, 3, 4, 5, 6, 7, 8, 9
('A'..'Z').to_a # 'A', 'B', 'C', ..., 'Z'

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

리스트를 생성하는 것 외에도 범위는 배열이나 문자열의 부분 집합을 확인하거나 검색하는 데 유용합니다.

# wizard_grade = IDGRD, GRD = grade
wizard_grades.map do |wizard_grade|
  grade = wizard_grade[2..-1].to_i
  result = 'Unknown'
  if (0..499).include?(grade)
    result = 'Below Expectation'
  elsif (500..700).include?(grade)
    result = 'Average Spellcaster'
  elsif (700..990).include?(grade)
    result = 'Outstanding Magician'
  else
    result = 'The Chosen One!'
  end

  "#{wizard_grade[0..1]}: #{result}"
end

루비에서는 -1이 일반적으로 구조의 끝을 가리킵니다. 위의 예에서 [2..-1]은 위치 2부터 끝까지를 의미합니다.

# 13. 논리 배열 연산자

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

배열은 데이터를 저장하는 유용한 구조이며 때로는 데이터를 반복하거나 처리하는 것 외에도 데이터를 비교하거나 연결하는 등 더 고급 작업을 수행하고 싶을 때가 있습니다. 이를 위해 Ruby는 논리적인 배열 연산자를 제공합니다.

required_magical_books = [
  'Chronicles of the Arcane Stars',
  "A Wizard's Journey",
  'Potions, and more'
]
magical_books_owned = [
  'Potions, and more',
  'Essential herbs'
]

# 합집합
all_books = required_magical_books | magical_books_owned
all_books.length # 4, 중복은 한 번만 포함됨

# 교집합
exclude_from_shopping_list = required_books & magical_books_owned
exclude_from_shopping_list.length # 1, 두 목록에 모두 있는 책은 1권 뿐
# 'Potions, and more'는 소유하고 있으므로 다시 사야 할 필요가 없습니다

# 차집합
books_to_buy = required_magical_books - magical_books_owned
books_to_buy.length # 2, 소유하지 않은 필요한 책이 2권 있습니다

# 연결
books = required_magical_books + magical_books_owned
books.length # 5, 중복 항목은 각각 개별 항목으로 추가됨

# 14. 배열 구조분해

배열에 대해 말하고 그 요소들을 다룰 때, Ruby는 배열을 쉽게 구조분해하여(인덱스를 명시적으로 제공하지 않고 변수에 그 요소를 할당) 작업할 수 있도록 허용합니다.

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

팀 = [
  "Merlinius Shadowspire",
  "Eldritch Moonfire",
  "Seraphina Stardust",
  "Thornius Spellweaver"
]

팀장, *나머지_팀_멤버 = 팀
# 팀장 = "Merlinius Shadowspire"
# 나머지_팀_멤버 = ["Eldritch Moonfire", "Seraphina Stardust", "Thornius Spellweaver"]

팀장_예비, _, 마지막_팀_멤버 = 나머지_팀_멤버
# 팀장_예비 = "Eldritch Moonfire"
# 마지막_팀_멤버 = "Thornius Spellweaver"

일반적인 파괴 할당(destructuring) 형식은: a, b, c = [A, B, C], 이것은 a = A, b = B, c = C 와 같이 세 개의 변수를 만듭니다.

별표(*) 연산자를 사용하면 나머지 모든 요소를 배열로 만들어서 할당하고, 시작이든 끝이든 가능합니다(위의 예시에서 나머지_팀_멤버).

언더스코어(_) 키워드는 일반적으로 사용하지 않을 값을 저장하는 데 사용됩니다. 파괴 할당 예제에서는 하나의 요소를 건너뛰기 위해 사용되었습니다.

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

# 15. Splat “*”

위의 경우 이외에도 splat * 연산자는 다른 상황에서도 사용할 수 있습니다. 더 많이 읽어보고 모든 응용 프로그램에 대해 알아보는 것을 권장합니다. 일반적으로 사용하는 방법 중 하나는 가변 개수의 매개변수를 가진 메서드를 정의하는 데 사용됩니다.

def clone_spell(*objects)
  objects.each do |object|
    puts "Cloning #{object}..."
  end
end

clone_spell('의자', '개구리')
clone_spell('피자')

위 예제에서 objects 매개변수는 함수에 전달된 모든 인수를 포함하는 배열이 될 것입니다.

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

splat (*) 연산자를 사용하는 또 다른 일반적인 경우는 배열을 메소드의 매개변수로 분해하는 것입니다.

def conjoined_spell(first_wizard, second_wizard)
  puts "#{first_wizard}과 #{second_wizard}가 함께 주문을 사용하고 있습니다!"
end

wizards = ['Luna', 'Star', 'Mars', 'Venus']

conjoined_spell(*wizards.first(2)) # Luna와 Star가 주문을 사용 중입니다 ...
conjoined_spell(*wizards.last(2))  # Mars와 Venus가 주문을 사용 중입니다 ...

## 16. include?

초보자가 보통 사용하지 않는 일반적인 메소드 중 하나는 `include?` 메소드입니다. 이 메소드는 배열의 요소 중에 특정 요소가 있는지 확인하는 데 사용될 수 있습니다.

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

제외하고?

allowed_weapons = ['Magic Wand', 'Star Dust', 'Flying Umbrella']
chosen_weapon = 'Lethal Sand'

is_weapon_allowed = false
allowed_weapons.each do |weapon|
  is_weapon_allowed = true if weapon == chosen_weapon
end

puts "#{chosen_weapon} #{is_weapon_allowed ? '사용 가능합니다.' : '사용할 수 없습니다.'}"

포함?

allowed_weapons = ['Magic Wand', 'Star Dust', 'Flying Umbrella']
chosen_weapon = 'Lethal Sand'

is_weapon_allowed = allowed_weapons.include?(chosen_weapon)

puts "#{chosen_weapon} #{is_weapon_allowed ? '사용 가능합니다.' : '사용할 수 없습니다.'}"

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

# 17. 수확

다른 프로그래밍 언어에서 콜백에 익숙할 수 있습니다. 콜백은 다른 함수에 전달할 수 있는 일련의 지시문(주로 함수)입니다. 루비에서는 yield 기능을 사용하여 콜백을 구현할 수 있습니다.

def cast_spell(spell)
  spell.cast
  yield(spell.mana_cost)
end

...

cast_spell(leviosa) do |mana_spent|
  wizard_mana -= mana_spent
end

위 예제에서는 yield에 인수를 전달했지만, 이것은 선택 사항입니다.

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

만약 함수가 콜백을 받을 수도, 받지 못할 수도 있다면, 특별한 block_given? 메소드를 사용하여 콜백의 존재 여부를 확인할 수 있습니다. 이 확인을 하지 않고 블록이 주어지지 않으면, yield는 오류를 발생시킬 것입니다.

def prepare_potion
  add_ingredients
  mix
  yield if block_given?
end

# 블록이 주어지지 않은 경우
prepare_potion

# 블록이 주어진 경우
prepare_potion do
  drink_potion
end

# 18. Tap

비록 덜 사용되긴 하지만, Ruby의 tap 메소드는 특정 상황에서 매우 유용할 수 있습니다. tap 메소드는 self를 블록에 전달하고, self를 반환하여 호출자를 쉽게 디버그, 출력 또는 수정할 수 있습니다.

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

디버깅을 위해 체인 메소드에 `tap`을 사용해보세요.

shopping_list = [
  { name: '개구리', price: 15, quantity: 3 },
  { name: '가마솥', price: 130, quantity: 1},
  { name: '빗자루 오일', price: 35, quantity: 2}
]

total_cost = shopping_list.map do |shopping_list_item|
               shopping_list_item[:price] * shopping_list_item[:quantity]
             end.tap do |prices_for_quantities|
               puts prices_for_quantities
             end.sum

# total_cost = 245

위 예제에서는 `tap` 블록에서 수량에 맞는 가격을 출력하고 자동으로 반환되어, 우리의 프로그램이 예상대로 작동함을 확인할 수 있습니다.

다른 좋은 `tap` 사용 사례는 재사용이 필요 없는 경우 로직을 캡슐화하는데 사용할 수 있습니다.

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

class Wizard
  attr_accessor :id, :name

  def initialize(name)
    @name = name
  end
end

wizards = []

Wizard.new('Harry').tap do |wizard|
  wizard.id = wizards.length
  wizards << wizard
end

보시다시피, tap 내부의 블록이 캡슐화되어 있으며, 함께 그룹화되어 있어 기능을 한눈에 이해하기 쉽습니다.

# 19. Fetch

falsey 값을 다루는 것은 까다로울 수 있습니다. 값이 없는지 확인하거나 falsey 값을 가질 것으로 예상되는지 항상 쉽게 확인할 수 있는 방법이 없기 때문입니다. 루비에서는 해시와 falsey 값을 다룰 때 프로세스를 더 명확하게 만들기 위해 fetch를 사용할 수 있습니다.

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

questionnaire = [
  { question: '마법 스프를 즐겼습니까?', answer: false },
  { question: '마법을 믿으십니까?' }
]

questionnaire.each do |entry|
  puts "#{entry[:question]} - #{entry[:answer] || '지정되지 않음'}"
end

위의 예시는 예상대로 작동하지 않습니다. false는 거짓 값이므로 두 질문 모두 '지정되지 않음'으로 표시됩니다. fetch를 사용하여 이를 수정할 수 있습니다:

questionnaire.each do |entry|
  puts "#{entry[:question]} - #{entry.fetch(:answer, '지정되지 않음')}"
end

fetch에 제공된 두 번째 인수는 키가 해시에 존재하지 않을 경우의 기본 값으로 작용합니다.
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

참고: 만약 해시에 키가 존재하지 않고 기본 값을 지정하지 않았을 때 fetch는 오류를 발생시킵니다.

# 20. 해시 값 생략

루비 3.1은 해시 관련 새로운 기능인 해시 값 생략을 도입했습니다. 이 구문은 JavaScript ES6에서 영감을 받았으며, 키와 해당 값을 저장하는 변수가 동일한 이름을 가진 경우 값 지정없이 해시를 생성할 수 있습니다.

```js
magic_word = 'abracadabra!'

값이 생략된 해시 = { magic_word: magic_word }

값이 생략된 해시 = { magic_word: }
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

위의 해시 두 개는 모두 'magic_word: `abracadabra!`'와 같습니다.

## 21. 동적 해시 키

대부분의 경우에는 따라야 할 명확한 구조가 있기 때문에 해시에 동적으로 키를 추가할 필요가 없습니다. 그러나 항상 그렇지는 않으며 Ruby는 동적으로 키를 정의할 수 있도록 해줍니다.

```js
{ wizard.name => wizard }
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

위의 예제에서 해시의 키는 위자드의 이름이며, 이는 하드 코딩되어서는 안 되므로 =` 구문을 사용하여 키 이름으로 사용합니다.

비슷한 맥락으로, 해시 키로는 불리언 값, 숫자 또는 클래스의 인스턴스와 같은 여러 가지가 사용될 수 있습니다. =` 구문을 사용하여야 하며, 그렇지 않으면 변수 이름이 심볼로 변환됩니다.

```js
{ true: 1 }   # 이 경우, 키는 불리언이 아니라 :true 심볼입니다
{ true => 1 } # 반면에 여기서는 키가 실제 불리언 값입니다
```

# 22. Dig

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

dig 메서드를 사용하면 중첩된 배열 요소나 해시 값(또는 이들의 조합)에 간편하게 접근할 수 있습니다.

dig를 사용하지 않은 경우

```js
wizards = [
  { name: 'Cora', pets: { list: ['Crow', 'Rat', 'Frog'], total: 3 } }
]

wizards[0][:pets][:list][2] # Frog
```

dig를 사용한 경우

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
wizards = [
  { name: 'Cora', pets: { list: ['Crow', 'Rat', 'Frog'], total: 3 } }
]

wizards.dig(0, :pets, :list, 2) # Frog
```

dig의 또 다른 장점은 한 번에 nil 값을 만날 때 nil을 반환하므로 오류가 발생하지 않는다는 것입니다.

# 23. Method Chaining 및 self

이전 예제에서 본 것처럼 Ruby에서 method chaining은 흔히 사용되는 관행입니다. 한 줄로 모든 문자를 대문자로 바꾸고 문자열을 뒤집는 예제가 있습니다.

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
주문 = "숨겨진 주문"
주문.upcase!.reverse!
puts 주문 # 호커스 포커스
```

자신 클래스에서 self 키워드를 사용하여 간단한 체인 메소드를 구현할 수도 있습니다. 클래스 내부에서 self는 일반적으로 현재 인스턴스를 가리킵니다.

```js
class MagicBroom
  attr_accessor :상태, :마지막_사용_시간

  def initialize
    @status = '대기 중..'
  end

  def 날아!
    @status = '날고 있어요...'
    self
  end

  def 사용!
    @last_time_used = Time.now
    self
  end

  def 표시
    puts "#{last_time_used || 'Never'}: #{status}"
  end
end

broom = MagicBroom.new

broom.display # Never: Waiting...

broom.use!.fly!.display # [Current Time]: Flying...
```

# 24. 메모이제이션

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

성능은 프로그램의 중요한 측면입니다. Ruby에서 더 빠른 애플리케이션을 위한 한 가지 방법은 메모이제이션입니다. 메모이제이션이란 다시 사용되고 변경되지 않을 값들을 메모리에 저장하는 것을 의미합니다.

초기 (메모이제이션 없음)

```js
class MagicForest
  attr_accessor :trees, :magical_tree

  def initialize
    @trees = (0...1000).to_a.map { |tree| tree * rand(5) }
    @magical_tree = trees.shuffle.last
  end

  def magical_tree_id
    id = nil
    trees.each do |tree|
      id = tree if tree == magical_tree
    end

    id
  end

  def magical_tree_side
    return '북쪽' if magical_tree_id > 2500
    '남쪽'
  end

  def magical_tree_clue
    "마법 나무는 #{magical_tree_id.odd? ? '홀수' : '짝수'}입니다."
  end
end

puts "여정이 시작됩니다."
forest = MagicForest.new
puts "마법 나무는 #{forest.magical_tree_side}쪽에 있습니다."
puts "작은 단서: #{forest.magical_tree_clue}"
```

위 예에서 magical_tree_id 메서드는 magical_tree_side 메서드와 magical_tree_clue 메서드에서 각각 두 번 호출됩니다. 1000개의 나무만 있는 경우에는 쉽게 알아채기 어렵지만, 실행 중인 코드는 두 번 실행되며 실행 사이에 변경 사항이 없음을 이미 알고 있음에도 불구하고 두 번 실행됩니다. 이 경우 magical_tree_id를 메모이제이션할 수 있습니다.

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

메모이제이션을 사용한 코드입니다

```js
def magical_tree_id
  return @magical_tree_id if defined?(@magical_tree_id)

  @magical_tree_id = nil
  trees.each do |tree|
    @magical_tree_id = tree if tree == magical_tree
  end

  @magical_tree_id
end
```

이제 인스턴스 변수 @magical_tree_id와 defined? 메소드를 사용하여 값을 메모리에 저장하고 코드는 첫 실행 때만 실행됩니다.

# 25. 조건 할당 연산자

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

이 연산자 ||=은 변수에 값을 할당해야 하는 경우에 사용되며 변수가 이미 값을 가지고 있지 않은 경우에 사용됩니다.

```js
def feed_the_frog(food = nil)
  food ||= 'Frogy Snacks'
  puts "개구리는 #{food}을(를) 즐깁니다"
end

feed_the_frog("오렌지") # 개구리는 오렌지을(를) 즐깁니다
feed_the_frog           # 개구리는 Frogy Snacks을(를) 즐깁니다
```

따라서 음식이 제공되지 않으면 기본적으로 간식으로 설정되며, ||=는 음식 = 음식 || `Frogy Snacks`과 같습니다.

조건부 할당 연산자는 메모이제이션에도 사용할 수 있지만, 메모이제이션 값이 거짓 값이 아닌지 확인하십시오. 거짓 값을 가지고 있다면 예상대로 작동하지 않습니다. 거짓 || 값은 항상 값 부분에 도달하기 때문에 코드가 매번 실행됩니다. 반면, 참\_값 || 값은 값 부분에 도달하지 않습니다.

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
def frog_food
  @frog_food ||= find_frog_food # Memoization
end
```

# 26. Calling a private method

만약 디버깅이나 테스트 목적으로 비공개 메서드를 호출해야 할 때는 인스턴스의 특별한 send 메서드를 사용할 수 있습니다.

```js
class MagicWand
  private

  def hocus_pocus
    puts "HOCUS POCUS!"
  end

  def activate(secret)
    return false unless secret == "Lumosera"
    true
  end
end

wand = MagicWand.new
wand.send(:hocus_pocus) # HOCUS POCUS!
wand.send(:activate, "Lunosiera") # false
wand.send(:activate, "Lumosera")  # true
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

send 메소드에 제공되는 첫 번째 인수는 심볼로 된 비공개 메소드의 이름이어야 하며, 다른 인수들은 원본 메소드로 전달될 인수들입니다.

참고: send는 디버깅이나 테스트에만 사용해야하며, 외부에서 비공개 메소드를 호출하는 것은 바람직하지 않은 실천입니다.

### 27. 클래스를 보유하는 변수

일부 상황에서는 클래스를 변수에 저장해야 할 수도 있습니다. 이러한 상황 중 일부는 클래스를 메소드에 전달하거나 여러 클래스 중 하나를 조건에 따라 인스턴스화해야 하는 경우일 수 있습니다. Ruby에서는 이것이 간단하며, 그냥 클래스에 다른 값들을 할당하는 것과 같습니다.

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
class Traveler
...
end

class Intruder
...
end

klass = distance_from_the_base > 100 ? Traveles : Intruder
spotted_person = klass.new
```

위 코드에서 spotted_person은 기본 캠프로부터의 거리에 따라 여행자 또는 침입자일 수 있습니다. klass는 클래스를 저장하는 데 자주 사용됩니다. 왜냐하면 클래스는 변수 이름으로 사용할 수 없기 때문입니다.

# 28. "추상" 클래스

루비에서는 추상 클래스를 구축하기 위한 내장 메서드가 없습니다. 그러나 추상 클래스와 유사한 것을 달성하기 위한 일반적인 접근 방식이 있습니다. 프로젝트에서 이와 같은 상황을 만날 수 있는 경우를 대비하여 이 접근법에 대해 알아두는 것이 중요합니다.

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

추상 클래스는 다른 클래스들의 청사진으로 사용되는 클래스입니다 (나는 이들을 클래스들의 클래스로 생각하곤 해요). 이들이 준수해야 하는 "규칙" 중 일부는 인스턴스화될 수 없으며 일반적으로 구현이 없는 추상 메서드만 포함하고 있어야 한다는 것입니다.

```js
class Character
  def initialize
    raise NotImplementedError, "#{self.class.name}은(는) 인스턴스화할 수 없습니다."
  end

  def move
    raise NotImplementedError, "하위 클래스에서 'move' 메서드를 구현해야 합니다"
  end

  def sing
    raise NotImplementedError, "하위 클래스에서 'sing' 메서드를 구현해야 합니다"
  end
end

class Mermaid < Character
  def move
    puts "퐁당!"
  end

  def sing
    puts "🔊 다가와, 친애하는 해적, 바다 이야기를 들어봐 🔊"
  end
end

class Werewolf < Character
  def sing
    puts "🔊 우우우 🔊"
  end
end

# character = Character.new - 에러가 발생합니다

mermaid = Mermaid.new
mermaid.move
mermaid.sing
werewolf = Werewolf.new
werewolf.move # 에러가 발생합니다
```

추상 클래스는 동일한 맥락에서 여러 클래스를 사용하려는 경우 매우 유용합니다. 위 예시에서는 이야기 생성기 프로그램을 생성하고자 할 수 있습니다. 모든 캐릭터들은 유사성을 가져야 하며, 추상 클래스를 사용하면 캐릭터가 무엇을 해야 하는지를 우리와 다른 개발자들에게 이해하기 쉽게 해줍니다.

# 29. 포함

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

루비에서 중요한 개념인 모듈은 클래스와 유사하지만 인스턴스화할 수 없으며 재사용 가능한 논리를 일반적으로 포함하고 있습니다.

모듈을 사용하는 가장 일반적인 방법은 클래스에 포함시키는 것입니다. 이렇게 함으로써 인스턴스는 모듈의 메소드에 접근할 수 있습니다.

```js
module MagicPowers
  def attack
    puts "I'm a #{self.class.name.downcase} and I'm attacking!"
  end
end

class Wizard
  include MagicPowers
end

class Fairy
  include MagicPowers
end

Fairy.new.attack # I'm a fairy and I'm attacking!
Wizard.new.attack # I'm a wizard and I'm attacking!
```

포함된 모듈의 메소드는 클래스의 인스턴스에서 사용할 수 있으며 예제에서 볼 수 있듯이 클래스 메소드 역할을 합니다. self는 메소드를 호출한 실제 인스턴스를 나타냅니다.

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

# 30. 정적 메서드

루비에서는 정적 메서드(클래스 메서드)를 선언하는 두 가지 방법이 있습니다.

def self.method_name을 사용하는 방법

```js
class MagicRealm
  def self.occupants
    ['Wizards', 'Fairies', 'Mermaids']
  end
end

puts MagicRealm.occupants.join(" & ") # Wizards & Fairies & Mermaids
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

```js
class MagicRealm
  class << self
    def occupants
      ['Wizards', 'Fairies', 'Mermaids']
    end
  end
end

puts MagicRealm.occupants.join(" & ") # Wizards & Fairies & Mermaids
```

클래스 안에 하나의 정적 메서드만 있는 경우 첫 번째 방법을 선호합니다. 여러 개의 정적 메서드가 있는 경우 두 번째 방법을 사용하는 것이 가장 좋습니다. 왜냐하면 모든 정적 메서드를 하나의 장소에 그룹화하기 때문이죠.

# 31. 확장

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

인스턴스의 기능을 확장하기 위해 모듈을 포함할 수 있듯이 더 정적인 기능을 얻기 위해 확장할 수도 있습니다.

```js
module MagicalCreature
  def description
    puts "#{self.name}s are magical creatures!"
  end
end

class Bat
  extend MagicalCreature
end

class Frog
  extend MagicalCreature
end

Bat.description  # 박쥐는 마법의 생물입니다!
Frog.description # 개구리는 마법의 생물입니다!
```

확장을 사용할 때에는 메서드를 정의할 때 self.나 class << self를 사용할 필요가 없습니다.

# 32. Prepend

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

클래스에 모듈을 포함하는 덜 알려진 방법도 있습니다. include와 비슷한 prepend는 하나의 주요 차이점을 가지고 있습니다. 모듈 메소드들이 클래스 메소드들을 덮어쓰게 됩니다.

```js
module NoMagicAllowed
  def cast_spell
    puts "Magic is not allowed!"
  end
end

class Wizard
  prepend NoMagicAllowed

  def cast_spell
    puts "Abracadabra!"
  end
end

Wizard.new.cast_spell # Magic is not allowed!
```

prepend는 기존의 기능을 폐기할 때나 모듈 내에 공통된 이름의 메소드가 있고 해당 메소드가 클래스 내부에서 덮어씌워지지 않도록 하고 싶을 때 유용합니다.

# 33. 메소드 별칭

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

루비에서 사용되는 라이브러리는 젬이라고 불립니다. 젬은 다양한 기능을 구현하는 데 매우 유용합니다. 그러나 때로는 원하는 바를 존중하도록 조정이 필요한 경우가 있습니다. 이런 경우에는 내장된 alias_method 방식을 사용하여 메서드를 "복사"하고 원본 메서드를 원하는 대로 수정할 수 있습니다. 이렇게 하면 초기 명령 세트를 잃지 않고 작업할 수 있습니다.

```js
class Cauldron
  def boil_potions
    puts "Boiling the green, smelly ingredients..."
  end
end
# ^ 위 클래스가 젬에서 가져온 것으로 가정 ^

class Cauldron
  alias_method :original_boil_potions, :boil_potions

  def boil_potions
    puts "Stirring in the Cauldron..."
    original_boil_potions
  end
end

Cauldron.new.boil_potions
# Stirring in the Cauldron...
# Boiling the green, smelly ingredients...
```

위 예제에서는 boil_potions 메서드에 추가 지시사항을 넣고 원래의 명령 세트를 호출했습니다. original_boil_potions은 단순히 예시 이름이며 별칭 이름으로 아무 문자열을 사용할 수 있습니다.

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

루비는 인스턴스가 특정 클래스의 인스턴스인지를 확인하는 깔끔한 방법을 제공합니다. is_a? 메서드는 내장 클래스뿐만 아니라 우리가 만든 클래스에도 사용할 수 있습니다.

```js
def levitate(objects)
  if objects.is_a?(Array)
    objects.each { |object| puts "#{object} is levitating" }
  else
    puts "#{objects} is levitating"
  end
end

levitate('의자')
# Chair is levitating

levitate(['옷장', '식물'])
# Wardrobe is levitating
# Plant is levitating
```

# 35. 객체

루비에서 모든 클래스는 Object 클래스에서 상속을 받습니다. Object는 루비 코드의 최상위에 존재하는 루트 클래스이기도 합니다. 일반적으로 Object 클래스와 상호작용할 일은 없겠지만 특정 상황에서 유용할 수 있으니 알아두는 것이 좋습니다.

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

예를 들어, 루비 프로그램의 최상위에 선언된 상수는 실제로 Object 클래스의 상수입니다.

```js
MAGIC_WORD = "Abracadabra!"
puts MAGIC_WORD # Abracadabra!
puts Object::MAGIC_WORD # Abracadabra!
```

# 36. 동적 메서드 호출

이전 단계에서 변수에 클래스를 할당하는 경우에 대해 설명했습니다. 필요에 따라 조건부로 인스턴스화해야 할 때 사용됩니다. 메서드의 경우 루비에서 괄호와 같은 특별한 구문이 필요하지 않기 때문에 마침표를 이용하여 변수에 메서드를 할당할 수 없습니다. 따라서 meth = method는 meth 변수에 메서드를 할당하는 것이 아니라 method 메서드를 호출하여 반환된 값이 meth에 할당됩니다.

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

우너가 원하는 기능을 달성하는 한 가지 방법은 private 메소드를 호출하는 데 사용한 send 메소드를 사용하는 것입니다.

```js
class Wizard
  SPELLS = {
    'Lumos!' => :lumos,
    'Wingardium Leviosa!' => :leviosa,
    'Serenitas!' => :serenitas
  }

  def cast_spell(incantation)
    if SPELLS.keys.include?(incantation)
      send(SPELLS[incantation])
    else
      puts '주문이 올바르지 않습니다...'
    end
  end

  def lumos
    puts '주변을 밝힙니다'
  end

  def leviosa
    puts '물체를 띄웁니다'
  end

  def serenitas
    puts '모두가 천천히 진정됩니다'
  end
end

wizard = Wizard.new

wizard.cast_spell('Lumos!') # 주변을 밝힙니다
wizard.cast_spell('Levitatuts!') # 주문이 올바르지 않습니다...
```

# 37. 에러 잡아내기

루비에서 유명한 try...catch 구문은 begin...rescue로 대체됩니다. Rescue는 에러를 잡아내고 처리하는 데 사용될 수 있습니다.

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

위 코드는 0으로 나누기 오류를 잡아서 친근한 메시지를 표시할 것입니다.

Rescue에는 다양한 변형이 있습니다. 아래에서 예시를 보여드리겠습니다.

```js
begin
  ...
rescue ZeroDivisionError => e # e는 오류 인스턴스
  ...
rescue NoMethodError, NameError
  ... # 위 오류 중 하나가 catch되면 실행됨
rescue
  ... # 이전에 catch되지 않은 오류가 발생하면 실행됨
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

위의 변형들은 함께 또는 개별적으로 사용할 수 있습니다. 모든 오류를 복구하고 오류 인스턴스가 필요한 경우, rescue = 'e, e는 그냥 이름이며, 사용자 임의의 문자열을 대신 사용할 수 있습니다.

# 38. 메소드 구조체

메소드 내부에서 함수 실행 중에 언제가 발생할 수 있는 오류를 잡아야 할 필요가 있다면, begin 키워드를 사용할 필요가 없습니다.

```js
def leviosa(object)
  puts "The #{object.fetch(:name)} is flying"
rescue
  puts "Something went wrong"
end

leviosa('의자') # fetch가 오류를 발생시키므로 'Something went wrong'이 출력됩니다
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

# 39. 인라인 구조

`rescue`의 덜 일반적인 사용법 중 하나는 인라인입니다.

```js
wizards = []
puts "The pumpkin was sliced in #{1 / wizards.length rescue 0} slices."
# The pumpkin was sliced in 0 slices.
```

# 40. 에러 발생하기

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

내 생각에는, 다양한 시나리오를 처리할 때 오류를 일으키는 것은 코드를 작성하는 우아한 방법으로, 더 읽기 쉽고 확장하기 쉽습니다.

다음 예제를 살펴보세요.

```js
SPELLS = [
  { name: 'leviosa',  mana: 60  },
  { name: 'lumos',    mana: 15  },
  { name: 'silencio', mana: 30 }
]

class Wizard
  attr_accessor :mana

  def initialize(mana)
    @mana = mana
  end

  def cast_spell(incantation)
    find_spell(incantation)
    if !@spell
      puts '주문이 잘못되었습니다.'
      return
    end
    if cast
      puts "#{@spell[:name].upcase}!"
    else
      puts "#{incantation}을 시전할 마나가 부족합니다."
    end
  end

  private

  def find_spell(incantation)
    @spell = SPELLS.find { |spell| spell[:name] == incantation }
  end

  def cast
    return false unless mana > @spell[:mana]

    self.mana -= @spell[:mana]
  end
end

harry = Wizard.new(100)
harry.cast_spell('levosa')  # 주문이 잘못되었습니다.
harry.cast_spell('leviosa') # LEVIOSA!
harry.cast_spell('leviosa') # leviosa를 시전할 마나가 부족합니다.
```

첫눈에 보기에 위 코드는 이해하기 어렵고 많은 조건 분기가 있습니다. 우리만의 오류를 발생시키고 처리함으로써 이를 크게 개선할 수 있습니다.

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
주문 목록 = [
  { 이름: '레비오사',  마나: 60  },
  { 이름: '루모스',    마나: 15  },
  { 이름: '실렌시오', 마나: 30 }
]

class 마법사
  class 주문이_없음 < StandardError; end
  class 부족한_마나 < StandardError; end

  attr_accessor :마나

  def initialize(마나)
    @마나 = 마나
  end

  def 주문_시전(주문)
    주문_찾기(주문)
    시전
    puts "#{@주문[:이름].upcase}!"
  rescue 주문이_없음
    puts '주문이 올바르지 않습니다'
  rescue 부족한_마나
    puts "#{주문}에 대한 마나가 부족합니다"
  end

  private

  def 주문_찾기(주문)
    @주문 = 주문_목록.find { |주문서| 주문서[:이름] == 주문 }
    raise 주문이_없음 unless @주문
  end

  def 시전
    raise 부족한_마나 unless 마나 > @주문[:마나]

    self.마나 -= @주문[:마나]
  end
end

해리 = 마법사.new(100)
해리.주문_시전('레보사')  # 주문이 올바르지 않습니다
해리.주문_시전('레비오사') # 레비오사!
해리.주문_시전('레비오사') # 레비오사에 대한 마나가 부족합니다
```

클래스 이름 `ParentClass; end`는 빈 클래스를 한 줄에 선언하는 일반적인 방법입니다. 위 예시에서 이 구문은 사용자 정의 오류를 생성할 때 사용됩니다.

# 41. 조용한 실패

오류를 처리하고 처리하기 위해 `rescue`와 `raise`를 사용할 때, 가끔 조용한 실패 상황에 직면할 수 있습니다. 이러한 상황이 발생할 수 있음을 인지하여 코드를 원활하게 디버깅할 수 있어야 합니다.

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
def potions_list(potions)
  if potions.length > 0
    puts potions.join(" & ")
  end
rescue
  []
end

puts potions_list(['Love', 'Dizzy', 'Sleep'])
```

위 예제에서는 Love & Dizzy & Sleep가 출력되기를 기대하지만 아무것도 출력되지 않습니다. 이는 .length 호출에 오타가 있기 때문이며, 해당 오류가 처리됩니다.

# 42. 그런 다음

JS Promises를 다뤄본 적이 있다면 then 키워드에 대해 알고 있을 것입니다. then은 루비에서도 사용할 수 있으며 더 깔끔한 코드를 작성하는 방법입니다. then은 tap과 유사하며 차이점은 tap이 반환하는 대상을 반환하지 않는다는 점입니다.

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
문장 = 'sucop sucoh'
문장
  .reverse
  .then do |뒤집힌_문장|
    뒤집힌_문장.upcase
  end
  .then do |최종_문장|
    puts 최종_문장
  end

# HOCUS POCUS
```

보시다시피, `then`을 사용하면 연결된 메소드를 좀 더 읽기 쉽게 만들 수 있습니다. 실제 프로젝트에서 `then`을 그렇게 많이 보지 않아서, 사용할 가치가 있는지 여부는 상황에 따라 다르다고 생각합니다.

# 43. 바인딩 IRB

IRB(Interactive Ruby Console)는 Ruby 코드를 테스트하는 좋은 방법입니다. 터미널에서 `irb` 명령을 실행하면 콘솔이 열리고 Ruby 코드를 실행할 수 있습니다.

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

그런데 코드의 특정 지점에서 대화형 콘솔을 열 수 있다는 것을 알고 계셨나요?

```js
def fly!
  ...
  binding.irb
end
```

`ruby filename` 명령을 사용하여 위 코드를 실행하면 `binding.irb`에서 실행이 멈추고 터미널에서 대화형 콘솔을 사용할 수 있습니다. 이것은 코드에서 변수, 메서드, 클래스에 액세스할 수 있는 콘솔을 통해 디버깅하는 좋은 방법입니다.

실행을 계속하려면 CTRL+D를 사용할 수 있고, 프로그램에서 여러 개의 `binding.irb`를 가질 수 있습니다. 그러나 그것들을 커밋하지 않도록 주의하세요.

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

# 44. IRB에서의 "\_"

인터랙티브 루비 콘솔에서 멋진 트릭은 \_를 입력하면 이전 라인의 값을 얻을 수 있다는 것입니다. 이는 디버깅하는 동안 시간을 절약할 수 있습니다.

```js
irb(main):001> [1, 2, 3].sum
=> 6
irb(main):002> _
=> 6
irb(main):003> six = _
=> 6
irb(main):004> six
=> 6
```

# 45. RVM / Rbenv

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

프로페셔널한 루비 개발자들은 현재 사용 중인 루비 버전을 변경할 수 있는 프로그램을 사용합니다. 이것은 모든 루비 프로젝트가 동일한 버전에서 실행되지 않기 때문에 중요합니다.

가장 많이 사용되는 버전 관리자 도구 중 두 가지는 RVM과 Rbenv입니다. 이들을 깊이 이해할 필요는 없지만, 알아두는 것이 좋습니다.

와우! 지금까지 즐겁게 읽으셨으면 좋겠고 새로운 것을 배운 게 있길 바랍니다. 위에 나열된 것은 순수한 루비 팁과 요령입니다. 다음으로 레일즈에 대해 이야기하고, 그 다음으로 RSpec에 집중하고 마지막으로 몇 가지 최상의 실천 방법과 재미있는 사실에 대해 이야기할 것입니다.

이 순간에는 독서에서 쉬어가는 것을 추천드립니다. 핸드폰이나 모니터 바깥을 보거나 조금 걸음을 걸으며 쉬어가세요.

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

# 46. Rails 제너레이터

Rails는 프로젝트 기능을 추가/업데이트/제거하기 위한 제너레이터를 제공합니다. 일반적으로 이런 종류의 작업을 하는 데 "마법"을 사용하는 것에는 반대합니다. 그러나 제너레이터는 다음과 같은 상황에서 정말 유용할 수 있습니다:

- 당신이 새로운 RoR 개발자이고 어떻게 해야 하는지 예시를 보고 싶을 때
- 당신이 경험 많은 RoR 개발자이고 시간을 절약하기 위해 제너레이터를 사용할 때, 필요에 따라 뼈대를 지워야 합니다

개인적으로 저는 자주 사용하는 유일한 제너레이터는 rails generate migration ... 인데, 이는 마이그레이션 파일을 생성해주고 거기에 코드를 추가할 수 있게 해줍니다.

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

Rails 생성기를 모두 탐험하고 학습 자료로 또는 시간을 절약하는 동반자로 사용하십시오. 생성기를 사용할 때 생성된 코드의 목적 또는 배후에서 무슨 일이 벌어지고 있는지를 이해하지 못하는 경우 생성기를 사용하지 마십시오.

# 47. 관심사 (Concerns)

관심사는 루비 프로젝트의 중요한 부분입니다. 재사용 가능한 기능을 포함하는 모듈입니다.

```js
# app/models/concerns/with_magic_powers.rb
module WithMagicPowers
  extend ActiveSupport::Concern

  included do
    def attack
      "#{power.upcase}!"
    end
  end

  class_methods do
    def description
      "#{self.name.pluralize} have magic powers!"
    end
  end
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

```js
# app/models/wizard.rb
class Wizard < ApplicationRecord
  include WithMagicPowers
end
```

```js
# app/models/fairy.rb
class Fairy < ApplicationRecord
  include WithMagicPowers
end
```

```js
# rails c
Fairy.description  # 요정은 마법 능력을 갖고 있어요!
Wizard.description # 마법사들은 마법 능력을 가지고 있어요!
Fairy.new(power: 'magic dust').attack # 마법 먼지!
```

이렇게 보면, 요정과 마법사 클래스에 대해 많은 코드를 재사용했음을 알 수 있어요.

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

우려사항에 대해 몇 가지 주의할 사항이 있습니다:

- included 및 class_methods 메서드에 액세스하려면 ActiveSupport::Concern을 확장해야 합니다.
- included 블록 내에 작성된 메서드/코드는 인스턴스용입니다.
- class_methods 블록 내에 작성된 메서드/코드는 클래스용입니다.
- 필요에 따라 컨트롤러 또는 다른 클래스에 대해서도 컨설은 사용할 수 있습니다.

## 48. 젬 검사

젬은 루비용 라이브러리입니다. 젬에는 프로젝트에서 사용할 수 있는 로직이 포함되어 있습니다.

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

가끔은 젬들이 우리가 기대한 대로 작동하지 않을 수도 있습니다. 혹은 더 큰 문제를 조사하고 있을 때에도 있는데, 이때 해당 젬 내부에서 무슨 일이 일어나고 있는지 이해하고 싶을 수 있습니다. 이를 로컬에서 빠르게 확인할 수 있는 방법이 있습니다. 프로젝트 루트 디렉토리에서 bundle show [GEM_NAME] (예: bundle show puma) 명령어를 실행하고 반환된 경로에 해당하는 폴더를 좋아하는 편집기에서 열면 됩니다.

참고: 해당 젬의 소스 코드를 수정하거나 디버깅 포인트를 추가할 수도 있습니다. 다만 디버깅이 끝나면 해당 부분을 꼭 삭제하지 않도록 주의해 주세요.

# 49. 젬 수정하기

가끔은 특정 상황에서 젬을 약간 수정하여 우리의 프로젝트에서 어떻게 작동하게 할지를 조정하고 싶을 수 있습니다. 이는 젬에서 발견된 버그 때문이거나 특정 프로젝트 요구 사항 때문일 수 있습니다. 우리는 변경하고자 하는 메소드/함수를 덮어쓰는 방식으로 이를 할 수 있습니다. 이 방법을 "패치"라고 합니다.

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

웹 애플리케이션에서 평점을 표시하는 데 도움이 되는 Star라는 젬을 사용한다고 가정해 봅시다. 시각적인 부분에 사용된 클래스는 다음과 같은 구조를 갖습니다:

```js
module Star
  class Layout
    def filled
      "★"
    end

    def empty
      "☆"
    end
  end
end
```

만약 평점에 다른 아이콘을 사용하고 싶지만 젬이 이를 변경할 수 있는 방법을 제공하지 않는다면, 원하는 결과를 얻기 위해 패치할 수 있습니다.

```js
# app/initializers/start.rb
module Star
  class Layout
    def filled
      "✭"
    end

    def empty
      "✰"
    end
  end
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

이제 메소드가 덮어쓰여지고 새로운 아이콘들이 사용될 것입니다.

패치에 관한 주의 사항:

- 우리는 하나의 메소드만 덮어쓸 수도 있고, 그 경우 루비의 메타 프로그래밍 기술 덕분에 패치에 사용된 클래스의 모든 다른 메소드들을 작성할 필요가 없습니다.
- 패치를 피하는 것이 최선이며, 이는 개방/폐쇄 원칙을 깨뜨리기 때문입니다.

# 50. 사용자 정의 로거

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

Rails에는 기본 로거가 있습니다: Rails.logger.info(message). 이것은 프로젝트의 구성에 따라 들어오는 요청, 매개변수, 라우트를 처리하는 컨트롤러, 데이터베이스 쿼리, 오류 추적 등을 볼 수 있어 좋습니다. 이 모든 정보는 log/development.log에서 찾을 수 있습니다.

명확한 원인이 없는 문제를 디버깅할 때 전체 흐름을 더 잘 이해하기 위해 정보를 기록하는 것을 좋아합니다. 그러나 개발 로그에 정보를 기록하는 것은 조금 까다로울 수 있습니다. 왜냐하면 기본 로깅 중에서 내 로그를 찾아야하기 때문입니다. 이 경우, 제가 하는 방법은 내가 사용할 로그 파일을 만들어 사용하는 것입니다:

- log 디렉토리 아래에 새로운 로그 파일을 추가합니다. 일반적으로 log/my.log라고 부릅니다.
- 해당 파일로 로깅하기 위해 다음 구문을 사용합니다: Logger.new('log/my.log').info(message)

이제 해당 파일을 확인하여 내가 로그인한 메시지만 볼 수 있습니다.

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

# 51. Active Record Import

만약 데이터가 많이 추가되는 데이터베이스 작업을 수행하고 있다면, 이 젬이 애플리케이션을 개선할 수도 있어요. activerecord-import는 여러 개의 레코드를 한 번에 데이터베이스에 삽입하는 방법을 제공해줘요. 이는 콜백에 신경 쓸 필요가 없을 때 특히 유용해요.

```js
Wizard.import(
  ['name', 'power'],
  [
    ['Thunder', 'Electricity'],
    ['Don', 'Shadowing'],
    ['Kara', 'Charming']
  ]
)

# TRANSACTION (0.1ms)  begin transaction
# Wizard Create Many (1.6ms)  INSERT INTO "wizards" ("name","power","created_at","updated_at") VALUES ('Thunder','Electricity','2024-06-25 04:02:13.285282','2024-06-25 04:02:13.285282'),('Don','Shadowing','2024-06-25 04:02:13.285282','2024-06-25 04:02:13.285282'),('Kara','Charming','2024-06-25 04:02:13.285282','2024-06-25 04:02:13.285282') RETURNING "id"
# TRANSACTION (48.5ms)  commit transaction
```

이렇게 사용하는 방법 중 하나이지만, 이 젬에 대해 더 많이 읽고 여러 사용 방법을 알아보는 걸 적극 권장해요. 또한, 유효성 검사를 걱정할 필요가 없어요. 이 젬을 사용하면서 여전히 레코드를 유효성 검사할 수 있어요.

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

# 52. Raw SQL 쿼리

우리가 원하는 대로 Active Record가 항상 제공해주지는 않습니다. 따라서 때로는 우리 스스로 SQL 쿼리를 작성하고 실행해야 할 수도 있습니다.

```js
query = "select id, name as 'Wizard Name' from wizards"
ActiveRecord::Base.connection.execute(query)

# [{"id"=>1, "Wizard Name"=>"Thunder"}, {"id"=>2, "Wizard Name"=>"Don"}, {"id"=>3, "Wizard Name"=>"Kara"}]
```

이렇게 하면 됩니다. 그러나 raw 쿼리를 다룰 때 매우 주의해야 하며 SQL Injection에 대비하여 신뢰할 수 없는 데이터를 쿼리에 사용하지 않도록 주의하십시오.

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

# 53. 스코프

Rails의 스코프는 코드의 가독성을 향상시키고 코드를 DRY하게 유지하는 데 훌륭합니다. 스코프는 모델 레코드의 하위 집합을 반환하는 정적 메서드입니다.

```js
class Wizard < ApplicationRecord
  include WithMagicPowers

  scope :shadow_wizards, -> { where(power: 'Shadowing') }
end
```

Wizard.shadow_wizards를 사용하면 그림자 소환 능력을 가진 위저드들의 모든 목록을 반환합니다.

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
class Fairy < ApplicationRecord
  include WithMagicPowers

  default_scope { where(power: 'Magic Dust') }
end
```

우리는 모델에 기본 스코프도 추가할 수 있어요. 이건 활성/비활성 레코드를 다룰 때 도움이 될 수 있어요. 그런데 기본 스코프는 데이터베이스와의 모든 상호작용에 영향을 미치기 때문에 count, all, find... 모두 기본 스코프를 사용하며 기본 스코프 바깥 레코드는 존재하지 않는 것으로 처리될 거에요.

만약 기본 스코프를 만나더라도 모든 레코드를 얻고 싶다면 다음처럼 unscoped 메서드를 사용할 수 있어요: Fairy.unscoped. 이렇게 하면 기본 스코프를 무시하고 활성 레코드 메서드를 연결할 수 있어요.

```js
all_fairies = Fairy.unscoped.all;
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

# 54. 존재하는가?

특정 레코드가 데이터베이스에 있는지 확인하려면 여러 가지 방법이 있습니다. 우리가 일반적으로 먼저 생각하는 방식은 쿼리와 일치하는 레코드 수가 0보다 큰지 확인하는 것입니다.

```js
Wizard.where(power: 'Fire'). length> 0
# "wizards"에서 "wizards"를 선택합니다. 이름" = ?[["이름"," Don"]]
```

위의 예제는 예상대로 작동하지만 대규모 데이터 세트의 경우 효율적이지 않습니다. 왜냐하면 일치하는 모든 레코드를 메모리에 로드한 다음 레코드 모음에서 길이를 호출하기 때문입니다. 우리가 원하는 것은 최소한 하나의 일치하는 레코드가 있는지 확인하는 것이기 때문에 그러한 작업은 필요하지 않습니다.

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

테이블 태그를 Markdown 형식으로 변경해 보세요.

You might also use .count, this is a bit better since it counts at the database level, however, we don’t need the count so we can further improve the performance.

exists? is the saviour of the day, this will check if at least one matching record exists at the database level and will return true or false. This way we obtain both perfomance and readability.

```js
Wizard.where(power: 'Fire').exists?
# SELECT 1 AS one FROM "wizards" WHERE "wizards"."power" = ? LIMIT ?  [["power", "Fire"], ["LIMIT", 1]]
```

Note: 액티브 레코드 쿼리를 실행할 때 레일스 콘솔에 SQL 쿼리가 기본적으로 표시됩니다. 이는 데이터베이스 수준에서 무슨 일이 일어나고 있는지 검사하고 디버그하는 훌륭한 방법입니다.

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

# 55. Find vs Find by

보통 레코드를 id로 찾을 때는 find 또는 find_by를 사용합니다. 하지만 이 둘의 차이와 언제 어떤 것을 사용해야 하는지는 새로운 Rails 개발자에게 혼란스러울 수 있습니다.

find와 find_by는 동일한 데이터베이스 쿼리를 실행합니다:

```js
Wizard.find(4)
# SELECT "wizards".* FROM "wizards" WHERE "wizards"."id" = ? LIMIT ?  [["id", 4], ["LIMIT", 1]]

Wizard.find_by(id: 4)
# SELECT "wizards".* FROM "wizards" WHERE "wizards"."id" = ? LIMIT ?  [["id", 4], ["LIMIT", 1]]
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

결과 처리 방식이 다릅니다. find를 사용할 때, 레코드를 찾을 수 없으면 ActiveRecord::RecordNotFound 오류가 발생합니다. 반면에 find_by는 레코드를 찾을 수 없을 때 단순히 nil을 반환합니다.

```js
Wizard.find(4)
# Couldn't find Wizard with 'id'=4 (ActiveRecord::RecordNotFound)

Wizard.find_by(id: 4)
# nil
```

일반적으로, 코드가 조용히 실패하지 않도록 find를 사용하는 것이 좋습니다. 그러나 그것이 필요한 경우를 제외하고는 find_by를 사용할 수 있습니다.

# 56. 찾거나 초기값 설정하기

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

find_or_initialize_by 메서드는 우리가 원하는 레코드를 찾고 그 레코드가 존재하지 않는 경우 초기화하는 데에 유용합니다.

find_or_initialize_by를 사용하지 않는 경우

```js
class Spell < ApplicationRecord
  def self.cast(incantation)
    spell = Spell.find_by(incantation: incantation)
    spell ||= Spell.new(incantation: incantation)
    spell.usage_count = (spell.usage_count || 0) + 1
    spell.save
  end
end
```

find_or_initialize_by를 사용한 경우

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
class Spell < ApplicationRecord
  def self.cast(incantation)
    spell = Spell.find_or_initialize_by(incantation: incantation)
    spell.usage_count = (spell.usage_count || 0) + 1
    spell.save
  end
end
```

`find_or_initialize_by`를 사용하면 코드가 더 짧아지고 가독성이 높아집니다. 위 예제는 주문이 존재하지 않는 경우 새 주문을 초기화하고 사용량을 증가시킵니다. 이미 주문이 있는 경우 사용량만 증가시킵니다.

# 57. 연관 레코드 빌드/생성

연관 관계를 다룰 때 ActiveRecord는 연관된 레코드를 만들거나 생성하는 좋은 방법을 제공합니다.

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
wizard.magic_books.build(title: 'Spells & Potions')
# #<MagicBook:0x00000158e934a920 id: nil, title: "Spells & Potions", wizard_id: 1, created_at: nil, updated_at: nil>
# MagicBook.new(title: 'Spells & Potions', wizard_id: wizard.id) 와 동일한 역할을 합니다.

wizard.magic_books.create(title: 'The secrets of Magic')
# INSERT INTO "magic_books" ("title", "wizard_id", "created_at", "updated_at") VALUES (?, ?, ?, ?) RETURNING "id"  [["title", "The secrets of Magic"], ["wizard_id", 1], ["created_at", "2024-06-25 18:51:44.661261"], ["updated_at", "2024-06-25 18:51:44.661261"]]
# MagicBook.create(title: 'The secrets of Magic', wizard_id: wizard.id) 와 동일한 역할을 합니다.
```

이 방법은 깨끗하고 가독성이 있습니다. 하지만 모델 로더가 없는 경우 추천하지 않습니다. 예를 들어, wizard_id만 가지고 있다면 데이터베이스에 wizard를 쿼리하는 것은이 접근 방법을 사용하는 것이 의미가 없습니다.

참고: 연관 컬렉션에 사용할 수있는 다른 메서드도 있습니다. 예를 들어, find, where, first 등이 있습니다. 더 탐구하시기를 권장합니다.

# 58. Active Record dirty 메서드

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

특정 경우에는 모델의 특정 부분이 업데이트되었을 때에만 특정 지시사항 세트를 실행하고 싶을 때가 있습니다. Active Record Dirty 메서드는 이를 위한 최적의 도구입니다.

```js
class Wizard < ApplicationRecord
  before_save :add_power_in_name, if: :will_save_change_to_power?

  private

  def add_power_in_name
    self.name = "#{name} [#{power}]"
  end
end
```

위의 예에서, will_save_change_to_power?는 해당 메서드이며, 기본적으로 제공됩니다(power는 wizard의 속성입니다). 이것은 우리의 코드에서 콜백용 조건으로 사용될 수 있을 뿐만 아니라, 코드 내에서 독립적인 메서드로도 사용될 수 있습니다.

본질적으로 제공되는 다양한 Active Record Dirty 메서드는 스스로 저장 전후의 변경 사항을 확인하는 데 유용하며, 다양한 시나리오에서 유용하게 활용될 수 있습니다.

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

# 59. 에러 전체 메시지

레코드가 데이터베이스에 저장되지 않는 이유를 확인하는 가장 효율적인 방법은 유효성 검사 오류가 저장을 막았는지 확인하는 것입니다. 이것은 model.valid? 구문을 사용하여 수행할 수 있습니다. 이 구문이 false를 반환하면 모델에 유효성 오류가 있다는 것을 의미하며, 이를 사람이 읽을 수 있는 형식으로 확인할 수 있습니다. 이 형식은 디버깅에 사용할 수 있을 뿐만 아니라 사용자에게 알림을 줄 때에도 사용할 수 있습니다.

```js
class Wizard < ApplicationRecord
  validates :name, length: { minimum: 2, maximum: 10 }
end
...
wizard = Wizard.new(name: 'Z')

wizard.valid? # false

wizard.errors
# #<ActiveModel::Errors [#<ActiveModel::Error attribute=name, type=too_short, options={:count=>2}>]>
# ^ 여러 오류가 있는 경우 이를 읽기 어렵습니다

wizard.errors.full_messages
# ["Name is too short (minimum is 2 characters)"]
```

모델에 오류 및 전체 메시지가 추가되려면, 먼저 해당 유효성 검사 메서드를 호출하거나 데이터베이스에 저장을 시도해야 함을 유의하십시오.

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

# 60. Eager Loading

일반적으로 데이터베이스 쿼리는 많은 리소스를 소모하는 작업으로 다루어집니다. 그래서 우리는 데이터베이스에 대한 쿼리의 수를 줄이는 것을 항상 시도해야 합니다. 이 측면을 개선하는 한 가지 방법이 Eager Loading 입니다.

Eager Loading이 없는 경우

```js
class MagicBook < ApplicationRecord
  belongs_to :wizard
  belongs_to :professor
end

...

class Wizard < ApplicationRecord
  has_many :magic_books
  include WithMagicPowers

  def professors
    wizard_professors = []
    magic_books.each do |magic_book|
      wizard_professors << magic_book.professor.name
    end

    wizard_professors
  end
end

...

Wizard.first.professors
# "wizards" 테이블 조회
# "magic_books" 테이블에서 해당 위자드의 책들 조회
# "professors" 테이블에서 교수 이름을 조회
# 해당 위자드가 가진 책의 수에 따라 반복 수행됩니다
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

위에서 알 수 있듯이 데이터베이스 쿼리가 많이 발생하고, 연관 레코드 수가 증가할수록 이 숫자도 증가합니다.

Eager Loading을 사용한 경우

```js
...

  def professors
    wizard_professors = []
    magic_books.includes(:professor).each do |magic_book|
      wizard_professors << magic_book.professor.name
    end

    wizard_professors
  end

...

Wizard.first.professors
# SELECT "wizards".* FROM "wizards" ORDER BY "wizards"."id" ASC LIMIT ?  [["LIMIT", 1]]
# SELECT "magic_books".* FROM "magic_books" WHERE "magic_books"."wizard_id" = ?  [["wizard_id", 1]]
# SELECT "professors".* FROM "professors" WHERE "professors"."id" IN (?, ?)  [["id", 1], ["id", 2]]
```

아주 작은 코드 조정으로 includes(:professor)를 추가함으로써, 마법사가 소유한 매직 북의 수에 관계 없이 이 메서드에 대해 항상 세 개의 데이터베이스 쿼리만 수행됨을 보장할 수 있습니다.

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

# 61. Active Record Transactions

여러 데이터베이스 변경을 실행하고 모두 성공하거나 전혀 실행되지 않도록 하려면 Active Record Transactions을 신뢰할 수 있습니다.

Active Record Transactions 없이

```js
class MagicBook < ApplicationRecord
  belongs_to :professor

  validates_uniqueness_of :title
end

...

class Professor < ApplicationRecord
  def self.enroll(name, biography_title)
    professor = create(name: name)
    biography = professor.magic_books.create(
        title: biography_title
    )
    if !biography.persisted?
      professor.destroy
    end
  end

  has_many :magic_books
end

...

Professor.enroll('Seraphine', 'My Biography')
# 교수와 그의 전기가 데이터벤에 삽입됨

Professor.enroll('Arthur', 'My Biography')
# 마법책 생성이 오류를 발생시켜도 데이터베이스는 변경되지 않음
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

With Active Record Transactions

```js
class MagicBook < ApplicationRecord
  belongs_to :professor

  validates_uniqueness_of :title
end

...

class Professor < ApplicationRecord
  def self.enroll(name, biography_title)
    ActiveRecord::Base.transaction do
      professor = create(name: name)
      professor.magic_books.create!(
        title: biography_title
      )
    end
  end

  has_many :magic_books
end

...

Professor.enroll('Seraphine', 'My Biography')
# 교수와 그의 전기가 데이터베이스에 모두 삽입됩니다

Professor.enroll('Arthur', 'My Biography')
# 마법의 책 생성이 오류를 발생시키므로 데이터베이스는 변경되지 않았습니다
```

Active Record Transactions를 사용하면 데이터베이스에 실패 시 레코드를 삽입한 후 삭제하지 않아도 되므로 안전합니다. 이는 데이터베이스 트랜잭션을 사용하기 때문입니다.

트랜잭션 내에서 발생한 모든 오류는 롤백을 트리거하고 아무것도 저장되지 않으므로 다양한 조건에 따라 자체 사용자 정의 오류를 발생시킬 수도 있습니다.

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

# 62. 레일즈 라우트

이것은 레일즈에 어느 정도 경험이 있는 개발자들에게는 보편적인 지식일 수 있습니다. 그러나 새로운 프로젝트를 시작할 때 언제나 유용하다고 생각합니다.

http://localhost:3000/rails/info/routes URL은 애플리케이션이 지원하는 모든 라우트와 관련된 Path, HTTP 동사, 그리고 책임 있는 컨트롤러와 액션 정보를 제공합니다.

참고: rails 서버를 시작할 때 3000은 기본 포트이며, 다른 포트를 사용하는 경우에는 위의 URL에 해당 포트를 사용해야 합니다.

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

# 63. 액션 전

클린 코드를 작성할 때 가장 중요한 측면 중 하나는 DRY 원칙(다시 반복하지 마십시오)을 유지하는 것입니다. before_action 메서드는 컨트롤러에서 기능을 캡슐화하고 재사용하는데 사용됩니다.

```js
class FairiesController < ApplicationController
  before_action :set_fairy, only: [:update, :destroy]

  def update
    @fairy.update(fairy_params)
  end

  def destroy
    @fairy.destroy
  end

  private

  def fairy_params
    params.require(:fairy).permit(:name)
  end

  def set_fairy
    @fairy = Fairy.find(params[:id])
  end
end
```

이 예시에서는 fairy 모델이 업데이트 및 삭제 작업 전에 id 파라미터를 기반으로 로드됩니다. before_action을 사용하면 두 메서드 모두에서 같은 코드 줄을 작성하는 번거로움을 줄일 수 있습니다.

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

위에서 사용한 것만 사용했기 때문에 except:를 사용하여 제외된 작업을 제외하고 모든 작업에 대한 콜백을 실행할 수 있었습니다. only 또는 except가 지정되지 않은 경우에는 메소드가 각 작업 전에 호출됩니다.

before_action의 또 다른 좋은 사용 사례는 사용자가 해당 작업을 실행할 권한이 없는 경우 작업 호출 전에 권한을 확인하고 오류를 발생시키는 것입니다.

# 64. Before Action 건너뛰기

특정 before_action 콜백을 건너뛸 수도 있습니다. 이는 before_action이 동일한 컨트롤러에 등록된 경우에는 의미가 없습니다. 왜냐하면 영향받는 작업을 관리하기 위해 only 및 except를 사용할 수 있기 때문입니다. 그러나 before_action이 내장 메소드인 경우이거나 컨트롤러에 포함된 concern에서 추가한 경우에는 skip_before_action을 사용하여 콜백이 호출되지 않도록 할 수 있습니다.

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
class FairiesController < ApplicationController
  skip_before_action :verify_authenticity_token

  ...
end
```

위 예제에서는 FairiesController의 모든 액션에 대해 내장된 verify_authenticity_token을 건너뜁니다. 또한 skip_before_action과 함께 only 및 except를 사용하여 특정 액션에 대해서만 이 콜백을 건너뛸 수도 있습니다.

# 65. 지난 시간

Rails를 사용할 때 시간과 관련된 몇 가지 매우 직관적인 메서드가 있습니다.

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

예를 들어, 지난 1일 동안 생성된 모든 레코드를 검색하고 싶다면, 다음과 같이 간단하고 가독성 있는 코드를 사용할 수 있어요:

```js
Fairy.where('created_at > ?', 1.day.ago)
```

다음과 같이 미래 날짜를 얻을 수 있어요:

```js
25.minutes.from_now
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

우리는 이렇게 시간 여행도 할 수 있어요:

```js
Fairy.first.created_at + 10.days
Fairy.first.updated_at - 1.month
```

## 66. Time Ago in words

날짜와 시간을 다루어 본 적이 있다면, 아마도 그것들이 조금 귀찮을 수 있다는 것에 동의하실 것입니다. 위의 방법들과 함께 Rails는 사용자에게 시간에 관한 직관적인 메시지도 제공해줍니다.

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
class FriendlyTimeAgoMessage
  extend ActionView::Helpers::DateHelper
end

FriendlyTimeAgoMessage.time_ago_in_words(Wizard.first.created_at)
# 약 17시간 전

FriendlyTimeAgoMessage.time_ago_in_words(
  Wizard.create(name: "Thor").created_at
)
# 1분 미만

이것은 사용자에게 특정 작업 이후 경과된 시간을 보여주는 데 좋습니다. 주의할 점은 time_ago_in_words가 기본적으로 뷰에서 사용 가능하다는 것입니다.

# 67. Indifferent Access

루비의 딕셔너리(객체로도 알려진)는 해시로 불립니다. 대부분의 경우 해시 키는 일반적으로 심볼이나 문자열입니다. 해시의 형식을 제어할 수 없는 상황이 발생할 때도 있습니다(예: 사용하는 젬에서 제공될 수 있음).
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

레일즈는 심볼과 문자열을 같은 키로 처리하는 간단한 방법을 제공합니다.

```js
magic_journey = {
  beginning: 'It all started a long time ago',
  middle: 'The dragon flies over the town scaring the people',
  end: {
    'happy' => 'And they lived happily ever after',
    'not_so_happy' => 'And they never met again'
  }
}

puts magic_journey[:end][:happy]
# 아무 것도 출력되지 않습니다. 왜냐하면 end에는 문자열 키만 있기 때문입니다.

puts magic_journey.with_indifferent_access[:end][:happy]
# And they lived happily ever after
```

with_indifferent_access를 사용하면 심볼이나 문자열을 사용하여 동일한 값을 얻을 수 있습니다. 해시가 선언된 방식과는 상관없이 동일한 값을 얻을 수 있습니다. 예제에서 볼 수 있듯이 중첩된 해시에도 적용됩니다.

# 68. Symbolize keys

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

이전 예제와 동일한 상황에서는 symbolize_keys를 사용하여 해시 키를 문자열에서 심볼로 변경할 수도 있습니다. 이 경우 유용한 경우는 JSON 데이터를 다룰 때입니다.

```js
# 심볼 키가 있는 해시입니다
wizard = { name: 'Leo', magic_power: 'Fire', age: 230 }

# JSON으로 변환한 다음 다시 파싱하여 문자열 키가 있는 해시를 얻습니다
wizard = JSON.parse(wizard.to_json)
# { "name" => 'Leo', "magic_power" => 'Fire', "age" => 230 }

# 원래대로 심볼 키로 다시 변환
wizard.symbolize_keys!
# {:name=>"Leo", :magic_power=>"Fire", :age=>230}
```

참고: symbolize_keys는 첫 번째 단계에만 동작합니다. 중첩된 해시가 있는 해시를 다룬다면 deep_symbolize_keys를 사용해야 합니다. 또한, 기본적으로 이러한 메소드는 원본 해시를 수정하지 않고 새로운 해시를 반환합니다. 예제와 같이 원본 해시를 수정하려면 메소드 끝에 !를 추가해야 합니다.

# 69. 존재여부

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

레일즈는 값을 쉽게 확인하는 방법을 제공합니다. 값이 있으면 진릿값을 가진 것입니다.

`present` 없이

```js
wizard = {
  first_name: '',
  email: ''
}

wizard_name = wizard[:first_name] if wizard[:first_name].present?
wizard_name ||= wizard[:email] if wizard[:email].present?
wizard_name ||= '마법사 손님'

welcome_text = "환영합니다, #{wizard_name}!"
puts welcome_text
```

`present`와 함께

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

```javascript
wizard = {
  first_name: "",
  email: "2",
};

wizard_name = wizard.first_name || wizard.email || "마법 손님";

welcome_text = `환영합니다, ${wizard_name}!`;
console.log(welcome_text);
```

presence는 값이 true이면 해당 값을 반환하고, 그렇지 않으면 nil을 반환하여 한 줄에 이러한 체크를 만들 수 있습니다.

# 70. 제외하다?

루비를 제공하는 것 외에도 Rails는 반대로 'exclude?'라는 메서드를 추가했습니다. 이 메서드는 호출하는 구조체에 제공된 인수가 있는지 여부를 알려주며, '!structure.include?(something)'의 좋고 읽기 쉬운 대안입니다.

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
wizard_schedule = [
  '주문 배우기',
  '주문 시전하기',
  '마법 숲 산책하기',
  '마법 생물 돌봐 주기'
]

# 제외 없이?
주문_없는_일정 = wizard_schedule.select do |activity|
  !activity.include?('주문')
end

# 제외 사용?
주문_없는_일정 = wizard_schedule.select do |activity|
  activity.exclude?('주문')
end
```

exclude?를 사용하면 코드를 더 쉽게 이해할 수 있습니다.

# 71. PORO

이 이름이 얼마나 재미있는지 모르지만, PORO(Plain Old Ruby Objects)는 깔끔한 코드 기반에서 중요합니다. 이들은 컨트롤러, 모델 또는 다른 영역에서 로직을 추출하여 독립적인 클래스로 사용됩니다.

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

PORO를 사용하는 장점은 코드가 캡슐화되어 있어 재사용할 수 있고, PORO를 사용하는 클래스가 더 깔끔해집니다.

PORO를 사용하지 않을 때

```js
class Wizard < ApplicationRecord
  has_many :magic_books
  include WithMagicPowers

  def learning_list
    list = { spells: [], books: [] }

    list[:spells] = Spell.where('created_at > ?', 1.day.ago).pluck(:incantation)
    list[:books] = magic_books.where('created_at > ?', 1.day.ago).pluck(:title)

    list
  end
end
```

PORO를 사용하는 경우

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
# app/models/wizard.rb
class Wizard < ApplicationRecord
  has_many :magic_books
  include WithMagicPowers

  def learning_list
    Wizards::LearningList.new(self).generate
  end
end
...
# lib/wizards/learning_list.rb
module Wizards
  class LearningList
    attr_accessor :wizard

    def initialize(wizard)
      @wizard = wizard
    end

    def generate
      {
        spells: spells_to_learn,
        books: books_to_learn
      }
    end

    private

    def spells_to_learn
      Spell.where(*added_in_last_day_query).pluck(:incantation)
    end

    def books_to_learn
      wizard.magic_books.where(*added_in_last_day_query).pluck(:title)
    end

    def added_in_last_day_query
      ['created_at > ?', 1.day.ago]
    end
  end
end
```

알아요? PORO를 사용할 때 코드가 더 많아진다는 것은 인정해야 하지만, 코드가 캡슐화되어 있고 확장, 읽기 및 재사용하기 쉬워집니다.

## 72. Delegate

PORO나 다른 클래스를 사용하는 경우, 해당 인스턴스를 해당 인스턴스로 위임하여 현재 클래스에 정의된 것처럼 사용할 수 있습니다.

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
module Wizards
  class QuestParticipant
    attr_accessor :wizard, :role

    delegate :name, to: :wizard

    def initialize(wizard, role)
      @wizard = wizard
      @role = role
    end

    def presentation
      puts "My name is #{name} and I'm joining the quest as a #{role}"
    end
  end
end
...
Wizards::QuestParticipant.new(Wizard.first, 'fighter')
# My name is Patrick and I'm joining the quest as a fighter
```

위와 같이 볼 수 있듯이 QuestParticipant 클래스에는 name 메서드가 없지만 wizard로 위임되어 있기 때문에 호출할 수 있습니다. name을 호출하는 것은 wizard.name을 호출하는 것과 같습니다.

# 73. 캐싱

이전에 메모이제이션에 대해 이야기했었는데, 메모이제이션이란 메모리에 일부 데이터를 저장하여 인스턴스를 사용하는 동안 재사용할 수 있는 것입니다. 예를 들어 클래스의 인스턴스와 함께 작업하는 동안 데이터를 저장해야 할 때 유용합니다. 그러나 데이터를 오랜 기간 동안 저장해야 하는 경우, 예를 들어 사용자 요청 사이에 데이터를 저장해야 하는 경우, 캐싱이 적합합니다.

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

캐시를 사용하는 방법을 살펴보기 전에, 프로젝트의 루트 디렉토리에서 rails dev:cache를 사용하여 캐시를 활성화해야 합니다. 동일한 명령어를 사용하여 캐싱을 중지할 수도 있습니다.

```js
irb(main):001* Rails.cache.fetch("wizards_count") do
irb(main):002*   Wizard.count
irb(main):003> end
  Wizard Count (0.1ms)  SELECT COUNT(*) FROM "wizards"
=> 7
irb(main):004* Rails.cache.fetch("wizards_count") do
irb(main):005*   Wizard.count
irb(main):006> end
=> 7
irb(main):007* Rails.cache.fetch("wizards_count") do
irb(main):008*   Wizard.count
irb(main):009> end
=> 7
irb(main):010* Rails.cache.fetch("wizards_count") do
irb(main):011*   Wizard.count
irb(main):012> end
=> 7
irb(main):013>
```

데이터베이스 쿼리가 처음 한 번만 실행된 것을 확인했나요? 이후에는 값이 메모리에 저장되어 그곳에서 검색됩니다. 이것은 간단한 예제입니다. 만약 열 개의 데이터베이스 쿼리가 있다면, 성능을 향상시키는 좋은 방법이었을 것입니다.

참고: 캐시 작업은 복잡해질 수 있습니다. 특히 동적으로 생성된 캐시 키를 사용할 때, 올바른 키가 사용되었는지 확인해야 합니다. 그렇지 않으면 캐시에서 오래된 데이터를 가져올 수 있습니다.

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
irb(main):002* Rails.cache.fetch("wizards_#{Wizard.last.updated_at}") do
irb(main):003*   Wizard.includes(:magic_books).pluck(:name, 'magic_books.title')
irb(main):004> end
  Wizard Load (0.1ms)  SELECT "wizards".* FROM "wizards" ORDER BY "wizards"."id" DESC LIMIT ?  [["LIMIT", 1]]
  Wizard Pluck (0.2ms)  SELECT "wizards"."name", "magic_books"."title" FROM "wizards" LEFT OUTER JOIN "magic_books" ON "magic_books"."wizard_id" = "wizards"."id"
=> [["Patrick", "Potions, Spells & more"], ["Patrick", "The secrets of Magic"], ["Thor", "Abracadabra!"]]

irb(main):005> Wizard.first.update(name: "Patrick Jr.")
...
irb(main):006> MagicBook.last.update(title: "Abracabra 2")
...

irb(main):007* Rails.cache.fetch("wizards_#{Wizard.last.updated_at}") do
irb(main):008*   Wizard.includes(:magic_books).pluck(:name, 'magic_books.title')
irb(main):009> end
  Wizard Load (0.1ms)  SELECT "wizards".* FROM "wizards" ORDER BY "wizards"."id" DESC LIMIT ?  [["LIMIT", 1]]
=> [["Patrick", "Potions, Spells & more"], ["Patrick", "The secrets of Magic"], ["Thor", "Abracadabra!"]]
```

위 예제에서는 마지막 마법사의 업데이트된 날짜를 동적 캐시 키의 일부로 사용했습니다. 하지만 이는 문제를 발생시킬 수 있습니다. 왜냐하면 다른 마법사(마지막을 제외한)가 업데이트되거나 마법책이 업데이트된 경우 캐시 키가 동일한 상태로 유지되어 이전 데이터가 반환될 수 있습니다.

참고: Rails 콘솔에서 Rails.cache.clear를 사용하여 캐시를 지울 수 있습니다.

# 74. 백그라운드 작업

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

가끔은 많은 정보를 포함한 보고서를 생성하는 등의 무거운 작업을 실행해야 할 때가 있습니다. 그러나 이를 주 애플리케이션에서 처리하면 크게 두 가지 단점이 있어요:

- 데이터가 준비될 때까지 사용자가 스피너를 보며 기다려야 합니다.
- 이를 위해 많은 리소스가 할당되어 다른 사용자에게는 응용 프로그램이 느려질 수 있어요. 10명의 사용자가 동시에 이와 같은 보고서를 요청한다면 상상해봐도 되겠네요.

이를 해결하기 위해 이러한 작업을 백그라운드에서 실행해야 합니다. 그래서 '백그라운드 작업'이라는 이름을 붙였습니다.

이 동작을 사용하기 위해 여러 가지 젬을 사용할 수 있어요. 그 중에서 가장 일반적인 것은 Resque와 Sidekiq인데, 둘 다 내부적으로 redis를 사용합니다. 백그라운드 작업에 대해 더 많이 알아보고 심지어 개인 프로젝트에서 설정해 보는 것을 강력히 추천합니다.

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

# 75. 크론 작업

크론 작업은 특정 간격으로 실행되는 백그라운드 작업입니다. Resque와 Sidekiq 둘 다 크론 작업을 구현하는 어댑터를 갖고 있습니다: resque-scheduler, sidekiq-scheduler.

라이브러리 외에도 크론 작업을 다룰 때는 크론 스케줄 표현식도 알아야 합니다. 크론 스케줄 표현식은 이렇게 생겼습니다: 0 22 \* \* 1-5 그리고 이는 크론 작업이 실행되는 간격을 설정하는 데 사용됩니다. Crontab.guru는 크론 표현식을 확인하는 데 훌륭한 웹 애플리케이션입니다.

# 76. Rails 자격 증명

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

레일즈에는 자격 증명, 비밀 또는 기타 민감한 데이터를 저장하는 내장 방법이 제공됩니다. 코드에서 비슷한 것을 볼 수 있을 것입니다:

```js
Rails.application.credentials[:secret_word]
```

새 프로젝트에 합류했는데 모든 자격 증명이 nil을 반환하는 경우, 이는 해당 자격 증명에 액세스하기 위한 올바른 키가 없다는 것을 의미합니다. 이 키는 기본적으로 config/master.key에 있거나 다른 환경을 위해 자격 증명이 설정된 경우 config/credentials/...에 있습니다. 버전 관리 시스템에 키를 보관해서는 안 되기 때문에 처음에는 키가 없는 것이 기대되는데요. 그래서 안전하게 보관되어 있을 가능성이 있는 그 키에 액세스하기 위해 동료에게 연락해 보세요.

이제 키를 가졌으므로 비밀을 추가/편집/제거하는 방법이 궁금할 수 있습니다. 이를 위해 다음 명령어를 사용할 수 있습니다:

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
EDITOR="code --wait" bin/rails credentials:edit
```

이 명령어를 실행하면 모든 비밀 정보가 포함된 Visual Studio Code 파일이 열립니다. 그 파일을 저장하고 닫으면 비밀 정보가 업데이트됩니다. 만약 Visual Studio Code를 사용하지 않는다면, nano나 vim을 사용하여 비밀 정보를 편집할 수도 있습니다. 그때는 위 명령어에서 code --wait를 nano나 vim으로 바꿔주세요.

# 77. 특정 마이그레이션

보통 rails db:migrate 명령어만 실행해도 새로운 데이터베이스 마이그레이션을 완료할 수 있습니다. 하지만 필요한 경우에는 특정 마이그레이션 파일을 실행하거나 되돌릴 수도 있습니다:

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
특정 마이그레이션 실행하기:
rails db:migrate:up VERSION=20240624192747

특정 마이그레이션 롤백하기:
rails db:migrate:down VERSION=20240624192747
```

VERSION에 제공된 숫자는 마이그레이션의 버전이며 마이그레이션 파일명의 시작 부분에서 찾을 수 있습니다.

지금까지 이 강의가 도움이 되었기를 바랍니다!

계속해서, RSpec 팁과 트릭에 대해 집중해보겠습니다. 다른 테스트 라이브러리를 사용하더라도 이 정보 중 일부는 해당 사례에도 적용될 수 있으니 계속 읽는 것을 권장합니다.

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

이제 우리는 루비와 루비 온 레일즈에 적용되는 코딩에 관한 몇 가지 일반적인 모범 사례에 대해 자세히 알아볼 예정이에요.

# 78. Rspec 포맷 문서화

첫 번째 단위 테스트를 만나면, 테스트 스위트를 실행할 때 모든 작은 녹색과 빨간색 점들이 무엇을 나타내는지 이해하지 못할 수 있어요. 하지만, 시간이 지나면 더 나은 이해를 얻고 모든 것이 이치에 맞는다는 것을 깨달아요.

하지만 만약 우리가 그 점들을 좋아하지 않고, 테스트 진행 상황을 더 "언어적으로" 표현하고 싶다면 어떻게 할까요? Rspec은 이를 위한 특별한 플래그를 통해 그 가능성을 제공해줘요.

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

= 기본 방식 =
$ rspec spec
...

소요 시간: 0.0549 초 (파일 로드에 6.46 초 소요)
3 예제, 0 실패

= 문서화된 출력 =

$ rspec spec --format documentation
Wizard
#spell_cast
주문을 외웁니다
#learn_spell
주문이 쉬울 때
주문을 배웁니다
주문이 어려울 때
주문을 배우지 못합니다

소요 시간: 0.05237 초 (파일 로드에 6.18 초 소요)
3 예제, 0 실패

추가로, --format documentation의 짧은 형태는 rspec spec -fd입니다. 개인 취향을 제외하고도 이 형식은 테스트 내부에서 사용된 메시지를 이중 확인하는 데 많은 도움이 되기 때문에 만족스럽다고 생각합니다.

# 79. 작은 범위의 테스트 실행

대부분의 경우, 로컬 개발 중에 작은 변경을 가할 때마다 전체 단위 테스트 스위트를 실행할 필요는 없습니다. Rspec을 사용하여 특정 폴더, 파일 또는 테스트만 실행할 수 있습니다.

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

= 특정 폴더 =
rspec spec/models

= 특정 파일 =
rspec spec/models/wizard_spec.rb

= 특정 테스트 블록 =
rspec spec/models/wizard_spec.rb:12

위 내용은 각각 사이에 공백을 두고 결합하여도 됩니다. 예를 들어 rspec spec 폴더*경로 파일\_1*경로 파일*2*경로:줄\_번호.

# 80. 팩토리

팩토리는 모델 인스턴스를 생성하는 지침으로 사용되어, 테스트 중에 이를 수동으로 수행하고 많은 코드를 반복하지 않아도 되도록 도와줍니다. Rails 프로젝트에서 흔히 사용되는 젬은 factory_bot_rails입니다.

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

팩토리를 사용하는 방법은 다음과 같습니다:

```js
# spec/factories/wizards.rb
FactoryBot.define do
  factory :wizard do
    name  { 'Harry' }
    power { 'Magic Spells' }
  end
end

# spec/models/wizard_spec.rb
require 'rails_helper'

describe Wizard do
  describe '#spell_cast' do
    it 'casts a spell' do
      wizard = create(:wizard)
      expect(wizard.spell_cast).to ...
    end
  end
end
```

보시다시피, Wizard.create(name: `Harry`, power: `Magic Spells`)와 같이 마법사를 수동으로 생성해야 하는 것 대신, 간단히 팩토리를 정의한 후 FactoryBot에서 제공하는 create 메서드를 사용합니다. 팩토리는 또한, 모델에 새로운 필수 필드가 추가되었을 때 유용합니다. 팩토리를 사용하면 모델의 인스턴스를 생성하는 모든 위치를 업데이트해야 하는 대신 팩토리만 업데이트하면 됩니다.

팩토리에 대해 더 많이 알아보시기를 권장하며, 여기서 강조하고 싶은 점은 팩토리를 실제로 어떻게 사용하는지입니다.

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

FactoryBot은 팩토리를 사용하는 세 가지 방법을 제공합니다:

- build_stubbed는 데이터베이스에서 레코드를 모방하는 모델의 인스턴스를 제공하지만 실제로 데이터베이스에 삽입되지 않기 때문에 이 방법이 더 빠릅니다. 데이터베이스와 상호 작용이 필요한 경우를 제외하고는 항상 단위 테스트에서 build_stubbed를 사용하는 것을 권장합니다.
- build는 Model.new와 동일하게 동작하며, 아직 영속화되지 않은 새로운 모델을 생성합니다. 유효성 검사 및 액티브 레코드 콜백을 테스트하는 데 좋은 사용 사례입니다.
- create는 Model.create와 동일하게 동작하여 테스트 데이터베이스에 레코드를 실제로 추가합니다. 팩토리를 사용하는 가장 느린 방법이며, 데이터베이스와 상호 작용이 필요할 때에만 사용해야 합니다. 예를 들어 where 쿼리를 테스트할 때 사용할 수 있습니다.

## let

let은 RSpec에서 사용되는 특별한 메서드로, 유닛 테스트에서 사용할 수 있는 메모이즈된 값을 생성할 수 있습니다. 이는 코드의 성능과 가독성에 도움이 되며 반복하지 않아도 되기 때문에 유용합니다.

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

RSPec을 사용할 때 많이 겪는 "문제" 중 하나가 이렇습니다:

```js
describe Wizard do
  describe '#expell' do
    let(:wizard) { create(:wizard) }

    it 'destroy the wizard' do
      expect(Wizard.count).to eq(1)
      wizard.expell
      expect(Wizard.count).to eq(0)
    end
  end
end
```

첫눈에는 모든 것이 잘 보이고 테스트가 통과될 것으로 예상할 수 있습니다. 그러나 테스트를 실행하면 다음과 같은 실패 메시지가 나옵니다:

```js
$ rspec spec/models spec/models/wizard_spec.rb
F

Failures:

  1) Wizard#expell destroy the wizard
     Failure/Error: expect(Wizard.count).to eq(1)

       expected: 1
            got: 0

       (compared using ==)
     # ./spec/models/wizard_spec.rb:8:in `block (3 levels) in <top (required)>'

Finished in 0.21844 seconds (files took 8.42 seconds to load)
1 example, 1 failure

Failed examples:

rspec ./spec/models/wizard_spec.rb:7 # Wizard#expell destroy the wizard
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

이런 일이 발생하는 이유는 우리의 테스트 앞에 let을 추가하는 것만으로 충분하지 않기 때문입니다. let 뒤에 제공된 블록을 실행하고 값을 메모이제이션하기 위해서는 먼저 let을 호출하거나 끝에 !로 선언해야 합니다.

```js
# 솔루션 1 - let을 호출하는 방법
require 'rails_helper'

describe Wizard do
  describe '#expell' do
    let(:wizard) { create(:wizard) }

    it '위자드를 파괴한다' do
      wizard # 이 순간에 위자드가 생성됨
      expect(Wizard.count).to eq(1)
      wizard.expell
      expect(Wizard.count).to eq(0)
    end
  end
end

# 솔루션 2 - let!을 사용하는 방법
require 'rails_helper'

describe Wizard do
  describe '#expell' do
    let!(:wizard) { create(:wizard) }

    it '위자드를 파괴한다' do
      expect(Wizard.count).to eq(1)
      wizard.expell
      expect(Wizard.count).to eq(0)
    end
  end
end
```

그러므로 항상 let이 느리게 평가되고 그 블록은 정의된 메소드가 처음 호출될 때까지 실행되지 않는다는 점을 명심하세요.

# 82. Faker

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

단위 테스트 작성은 재미있어요. 이름, 이메일 주소, 문장 또는 무작위 숫자를 사용해야 하는 순간이 될 때까지는요. 그럴 때 최적의 예제를 고민하기 시작합니다.

Faker 젬을 사용하면 그런 결정을 내려야하는 번거로움을 피할 수 있어요. 이는 숫자와 이메일 주소 뿐만 아니라 단어, 영화 제목 또는 셰익스피어의 명언까지 다양한 도메인을 위한 무작위 생성기를 제공합니다.

그리고 사용하기도 정말 쉬워요. 젬을 설치한 후에 필요한 생성기를 호출하기만 하면 돼요:

```js
irb(main):001> Faker::Name.name
=> "Boyd Hessel II"
irb(main):002> Faker::Internet.email
=> "windy@smith-schowalter.test"
irb(main):003> Faker::Movie.quote
=> "What we've got here is failure to communicate."
irb(main):004> Faker::Movie.title
=> "Witness for the Prosecution"
irb(main):005> Faker::Quotes::Shakespeare.hamlet_quote
=> "What a piece of work is man! How noble in reason, how infinite in faculty! In form and moving how express and admirable! In action how like an angel, in apprehension how like a god! The beauty of the world. The paragon of animals."
irb(main):006>
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

Faker의 모든 생성기를 공식 GitHub 저장소에서 찾을 수 있어요.

# 83. 공유 예시

제가 말씀드리는 것을 되풀이해서 죄송하지만, 코드를 반복해서 작성하면 안 된다고 말씀드렸잖아요 (말장난이지만) 그리고 단위 테스트를 작성할 때도 이 원칙이 적용돼요. 단위 테스트에서 코드를 DRY하게 유지하는 한 가지 방법은 공유 예시를 사용하는 거에요.

공유 예시 없이

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
require 'rails_helper'

describe Wizard do
  subject { build_stubbed(:wizard) }

  describe '#spell_cast' do
    context 'when the wizard has no mana' do
      it 'raises a NoMana error' do
        expect { subject.spell_cast }.to raise_error(Wizard::NoManaError)
      end
    end
  end

  describe '#learn_spell' do
    context 'when the wizard has no mana' do
      it 'raises a NoMana error' do
        expect { subject.learn_spell }.to raise_error(Wizard::NoManaError)
      end
    end
  end
end
```

With shared examples

```js
require 'rails_helper'

describe Wizard do
  subject { build_stubbed(:wizard) }

  shared_examples_for 'a method call that raises NoMana error' do |meth|
    it 'raises a NoMana error' do
      expect { subject.send(meth) }.to raise_error(Wizard::NoManaError)
    end
  end

  describe '#spell_cast' do
    context 'when the wizard has no mana' do
      it_behaves_like 'a method call that raises NoMana error', :spell_cast
    end
  end

  describe '#learn_spell' do
    context 'when the wizard has no mana' do
      it_behaves_like 'a method call that raises NoMana error', :learn_spell
    end
  end
end
```

As you can see, we extracted the duplicated code while still having a readable file.

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

# 84. 씨앗

rspec에 대한 일반적인 구성 중 하나는 config.order = :random입니다. spec/spec_helper.rb 파일에 이를 구성으로 추가하면 rspec이 항상 테스트를 무작위로 실행합니다. 테스트를 무작위로 실행할 때 예상치 못한 오류를 잡을 가능성이 더 높아집니다.

테스트가 무작위로 실행되고 그 중 하나가 실패하는 경우, 해당 실패를 재현하는 것이 어려울 수 있습니다. 왜냐하면 그 특정한 순서에서만 발생할 수 있기 때문입니다. 테스트를 동일한 순서로 실행하는 것을 보장하기 위해 초기에 사용된 씨앗을 --seed 플래그를 통해 제공할 수 있습니다.

```js
= 초기 실행 =
rspec spec
Randomized with seed 59647
...

= 실패 조사를 위한 후속 실행 =
rspec spec --seed 59647
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

# 85. 테스트 커버리지

유닛 테스트의 커버리지는 유닛 테스트 실행 중 도달한 코드의 백분율을 나타내는 측정 지표입니다. Rails에서는 각 테스트 실행 후 커버리지를 확인하기 위해 simplecov를 사용할 수 있습니다.

젬을 설치한 후에는 spec/spec_helper.rb 파일 맨 위에 다음과 같이 추가해야 합니다:

```js
require 'simplecov'
SimpleCov.start
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

스펙을 실행한 후에 SimpleCov로부터 한 경로로 이동하는 메시지를 볼 것입니다. 가장 좋은 부분은 이것이 모든 소스 코드와 커버된 부분 또는 커버되지 않은 영역을 포함하는 멋지고 상호 작용하는 HTML 페이지를 생성한다는 것입니다.

```js
$ rspec spec

Randomized with seed 1940
..

Finished in 0.12963 seconds (files took 10.16 seconds to load)
2 examples, 0 failures

Randomized with seed 1940

Coverage report generated for RSpec to .../app/coverage. 83 / 88 LOC (94.32%) covered.
```

커버리지는 우리가 테스트되지 않은 코드 영역을 식별하는 데 도움이 됩니다.

# 86. Rspec은 여전히 루비입니다.

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
require 'rails_helper'

describe Wizard do
  subject { build_stubbed(:wizard) }

  describe '#spell_cast' do
    context 'when called with leviosa' do
      it 'returns Levitate!' do
        expect(subject.spell_cast(:leviosa)).to eq('Levitate!')
      end
    end

    context 'when called with silencio' do
      it 'returns Silent!' do
        expect(subject.spell_cast(:silencio)).to eq('Silent!')
      end
    end

    context 'when called with unknown incantation' do
      it 'returns Wrong Incantation!' do
        expect(subject.spell_cast('unknown incantation')).to eq('Wrong Incantation!')
      end
    end
  end
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

```js
require 'rails_helper'

describe Wizard do
  subject { build_stubbed(:wizard) }

  describe '#spell_cast' do
    {
      leviosa:  'Levitate!',
      silencio: 'Silent!',
      'unknown_spell' => 'Wrong Incantation!'
    }.each do |param, result|
      context "when called with #{param}" do
        it "returns #{result}" do
          expect(subject.spell_cast(param)).to eq(result)
        end
      end
    end
  end
end
```

이 코드는 조금 더 복잡해질 수 있지만, 더 적은 코드이며 나중에 시나리오를 수정/추가/제거하기가 더 쉽습니다.

# 87. 스펙스 구조 및 메시지

단위 테스트의 구조 및 각 케이스에 제공된 메시지는 실제 단위 테스트를 작성하는 데 일부 시간이 걸릴 수 있습니다. 특히 여러 가지 개인적인 선호도가 있는 경우입니다.

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

이 경우 내 제안은 구조 및 메시지에 대한 훌륭한 리소스이자 유닛 테스트에 관한 많은 유용한 정보도 제공하는 https://www.betterspecs.org/를 참고하는 것입니다.

이 기사의 마지막 부분에서, 저는 소프트웨어 엔지니어로서 매일 따르려고 노력하는 몇 가지 모범 사례를 공유하고 싶습니다. 이들은 일반적인 개념이며 루비에도 적용됩니다.

# 88. EOF newlines

솔직히 말해서, 이 주제를 심층적으로 다룬 적은 거의 없지만, 지금까지 만난 모든 프로그래밍 언어에서 이를 모범 사례로 인식합니다. 따라서 항상 파일이 빈 줄로 끝나도록 확인해 주세요.

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

루비에서 대부분의 파일은 end 키워드로 끝나기 때문에 파일 끝에 빈 줄이 누락되었는지 확인하는 것이 더 쉽습니다.

# 89. 단락 평가

대부분의 프로그래밍 언어는 조건 논리 연산자를 사용할 때 단락 평가를 사용합니다. 이는 표현식이 결과가 결정되자마자 평가되어 나머지 부분을 건너뛰는 것을 의미합니다.

이를 몇 가지 실제 예제로 쉽게 이해할 수 있습니다:

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
if wizard.has_mana? && wizard.all_spells_are_ready?
  puts "The duel can begin"
end
```

위의 예시에서 만약 wizard.has_mana?이 false이면 wizard.all_spells_are_ready?는 더 이상 확인되지 않습니다. 왜냐하면 그 결과에 상관없이 최종 결과는 항상 false이기 때문입니다.

```js
if wizard.sick? || wizard.hurt? || wizard.any_damaged_item?
  puts "The wizard cannot participate in the quest"
end
```

위의 예시에서 만약 wizard.sick?이 true이면 나머지 부분인 wizard.hurt?와 wizard.any_damaged_item?은 더 이상 확인되지 않습니다. 왜냐하면 최종 결과는 항상 true가 되기 때문입니다.

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

이를 염두에 두고 항상 조건을 복잡도에 따라 구성해보세요. 더 빠른 표현식이 먼저 실행되도록 조직을 맞춰줍시다. 예를 들어, 모든 주문이 준비되었는지 또는 마법사에 손상된 아이템이 있는지를 먼저 확인하는 것은 의미가 없을 것입니다. 왜냐하면 결정을 내릴 때 우리에게 도움을 줄 수 있는 더 빠른 조건이 있기 때문입니다.

# 90. return 다음 줄

메소드에 여러 개의 반환 값이 있는 경우, 각각 뒤에 빈 줄을 추가하는 것이 좋습니다. 이렇게 하면 다른 개발자들이 쉽게 찾을 수 있습니다.

return 뒤에 줄이 없음

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
def magical_season?
  season = MagicalCalendar.current_season
  return true if fairies_season == season

  events = season.events
  return false if events.empty?

  events.any? do |event|
    event.magical?
  end
end
```

각 return 다음에 줄을 추가하면 메소드를 읽기 쉽게 만들 수 있어요.

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

이것은 규칙이 아니며 개인 또는 팀의 기호에 따라 달라집니다. 모든 return 후에 새 줄을 추가하는 것이 항상 합리적이지는 않을 수 있습니다. 아래와 같은 경우 또한 있습니다:

```js
def magical_season?
  season = MagicalCalendar.current_season
  return true if fairies_season == season
  return true if season.events.any? { |event| event.magical? }
  false
end
```

# 91. Magic Strings

매직 문자열은 코드에서 사용되는 리터럴 문자열 값입니다. 코드에서 문자열 값을 직접 사용하는 것은 일반적으로 좋은 아이디어가 아닙니다. 값이 무엇을 나타내는지 이해하기 어렵고, 필요 시 모든 위치에서 업데이트해야 하기 때문입니다.

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

마술 문자열을 사용하는 대신, 상수나 구성 파일과 같은 데이터 표현 유형을 사용하는 것이 더 나은 방법입니다.

마술 문자열:

```js
class Wizard < ApplicationRecord
  def elemental?
    power.in?(['Fire', 'Water', 'Earth', 'Air'])
  end

  def supreme?
    ['Fire', 'Water', 'Earth', 'Air'].each do |element|
      return false if power.exclude?(element)
    end

    true
  end
end
```

마술 문자열 없이:

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

class Wizard < ApplicationRecord
FIRE_ELEMENT = 'Fire'
WATER_ELEMENT = 'Water'
EARTH_ELEMENT = 'Earth'
AIR_ELEMENT = 'Air'
ELEMENTS = [FIRE_ELEMENT, WATER_ELEMENT, EARTH_ELEMENT, AIR_ELEMENT]

def elemental?
power.in?(ELEMENTS)
end

def supreme?
ELEMENTS.each do |element|
return false if power.exclude?(element)
end

    true

end
end

# 92. RuboCop

루비 및 루비 온 레일을 위한 가장 인기 있는 린터 및 포멧터인 RuboCop입니다. 프로젝트에 설정하는 것을 강력히 추천드립니다. 이는 코드 스타일을 개선하는 데 도움이 될 뿐만 아니라 팀으로 작업할 경우 모든 엔지니어 사이에 일관된 구문을 보장합니다.

# 93. 짧고 명확한 메서드

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

클린 코드의 중요한 측면 중 하나는 메소드를 짧고 최대한 추상적으로 유지하는 것입니다. 이는 코드의 가독성과 재사용성을 향상시키며, 이러한 코드 조각을 모두 통째로 수정하거나 확장하는 것보다 훨씬 쉽습니다.

간단하고 명확한 메소드를 가진 클래스의 예시

```js
module Wizards
  class LearningList
    attr_accessor :wizard

    def initialize(wizard)
      @wizard = wizard
    end

    def generate
      {
        spells: spells_to_learn,
        books: books_to_learn
      }
    end

    private

    def spells_to_learn
      Spell.where(*added_in_last_day_query).pluck(:incantation)
    end

    def books_to_learn
      wizard.magic_books.where(*added_in_last_day_query).pluck(:title)
    end

    def added_in_last_day_query
      ['created_at > ?', 1.day.ago]
    end
  end
end
```

그리고 이것은 이를 염두에 두지 않고 작성했을 때의 모습입니다:

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
module Wizards
  class LearningList
    attr_accessor :wizard

    def initialize(wizard)
      @wizard = wizard
    end

    def generate
      {
        spells: Spell.where('created_at > ?', 1.day.ago).pluck(:incantation),
        books: wizard.magic_books.where('created_at > ?', 1.day.ago).pluck(:title)
      }
    end
  end
end
```

만약 모든 기능이 한 곳에 모여 있다면, 한 번 읽는 것으로는 그 코드를 이해하기 정말 어려울 것입니다. 각 단계를 주의 깊게 살펴 보아야 합니다.

# 94. 해시 파라미터

대부분의 경우, 메소드를 작성하고 그 메소드가 두 개 이상의 매개변수를 필요로 한다면, 저는 대신 하나의 해시 파라미터를 사용하는 것을 선호합니다. 가독성을 향상시킬 뿐만 아니라, 이 방법은 미래에 쉽게 클래스를 수정할 수 있도록 해줍니다(예: 새로운 매개변수 추가) 호출되는 모든 위치를 수정하지 않아도 됩니다.

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

3개의 매개변수를 갖는 메소드

```js
def search_book(title_starting_with, title_ending_with, containing_letter)
  # ...
end
...
search_book('A', 'Z', 'X')
```

해시 매개변수를 사용하도록 변경한 후

```js
def search_book(options = {})
  title_starting_with = options[:title][:starting_with]
  title_ending_with = options[:title][:ending_with]
  containing_letter = options[:containing_letter]
  # ...
end
...
search_book(
  title: { starting_with: 'A', ending_with: 'Z' },
  containing_letter: 'X'
)
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

위 예시에서는 다음과 같은 이점이 있습니다:

- 기존 호출에 영향을 주지 않고 나중에 손쉽게 추가 옵션을 추가할 수 있습니다.
- 어떤 옵션에 대해서도 기본값을 쉽게 사용할 수 있습니다.
- 메소드에 전달되는 인자가 호출 시점에 더 이해하기 쉽습니다.

참고: 루비에서 메소드의 마지막 매개변수가 해시이면 그때 ' ... ' 중괄호를 생략할 수 있습니다.

# 95. 코멘트

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

코드의 일부나 비즈니스 로직을 설명할 때 주석을 추가하는 것은 좋습니다. 그러나 항상 주석이 절실한 경우에만 추가되도록 하세요. 가독성이 높은 코드를 작성하여 주석처리를 최소화하는 것이 좋습니다.

```js
# 주어진 위저드가 올바른 경우 위저드의 마법 책 제목을 반환하고 그렇지 않으면 거짓을 반환합니다.
def mb(w)
  w.class.name == 'Wizard' ? w.magic_books.pluck(:title) : false
end
```

이 예는 간단한 예제이지만 직관적이지 않습니다. 함수가 무엇을 하는지 완전히 이해하려면 주석을 의존해야 합니다.

이를 주석이 필요 없는 방식으로 개선할 수 있습니다:

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
def magic_book_titles(wizard)
  return false unless wizard.is_a? Wizard

  wizard.magic_books.pluck(:title)
end
```

조금의 조정만으로, 추가적인 설명이 필요 없는 자체 설명 메서드를 얻게 되었어요.

# 96. 쉘 스크립트

로컬 개발 중에 반복적인 작업을 수행해야 하는 상황에 처하게 된다면 쉘 스크립트가 정확히 필요한 것일 수 있어요.

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

이론적인 예를 들어 보겠습니다. 우리의 Rails 애플리케이션이 SECRET 환경 변수가 필요하다고 가정해 봅시다. 서버나 콘솔을 로컬에서 시작하기 전에 설정해야 합니다. 저는 모르겠는데, 많은 시간이 지나서 그것을 추가하는 것을 까먹으면서 왜 로컬 환경에 문제가 발생하는지 궁금해 할 것입니다.

해결책은 정확히 그 일을 수행하는 셸 스크립트를 만드는 것입니다:

```js
# env_rails_c.sh
echo '환경 변수 설정 중'
export SECRET='시크릿'

echo 'Rails 콘솔 시작'
rails c
```

```js
$ ./env_rails_c.sh
환경 변수 설정 중
Rails 콘솔 시작
개발 환경 로딩 (Rails 7.1.3.4)
irb(main):001> ENV['SECRET']
=> "시크릿"
irb(main):002>
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

이 글의 끝에서 우리의 초점을 조금 더 편안한 것으로 전환할 것입니다.

# 97. 이스터 에그 #1

레일즈는 배열에서 특정 위치의 요소를 가져오기 위한 사람이 읽기 편한 방법을 제공합니다. first, second와 같은 메서드입니다.

이게 어디까지나 뻗어나갈지 궁금했던 적이 있나요? 음, 다섯까지가 끝이고, 그 다음에는 특별한 것이 있습니다: forty_two.

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

만약 특정 번호가 궁금하다면, 이 부분을 확인해보세요.

```js
(1..100).to_a.first  # 1
(1..100).to_a.second # 2
(1..100).to_a.third  # 3
(1..100).to_a.fourth # 4
(1..100).to_a.fifth  # 5


(1..100).to_a.fourty_two # 42
```

# 98. 이스터 에그 #2

대화형 루비 콘솔에서 IRB.send(:easter_egg, :logo)를 호출하면 콘솔에 멋진 루비 로고가 출력됩니다.

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

# 99. 이스터 에그 #3

대화형 루비 콘솔에서 IRB.send(:easter_egg, :dancing)을 호출하면 콘솔에 춤추는 멋진 루비 로고가 출력됩니다!

# 100. 레일스 다큐멘터리

레일스의 창시자인 David Heinemeier Hansson은 레일스가 어떻게 만들어 졌는지 설명하는 다큐멘터리에 참여했습니다. 내 의견으로는 이것은 정말 영감을 주는 일이며, 편안한 시간을 보내는 좋은 방법이라고 생각합니다.

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

영상은 여기에서 확인하실 수 있습니다: Ruby on Rails, The Documentary.

아직 여기 계신다면, 이 기사를 즐기셨고 루비와 루비 온 레일즈의 몇 가지 기능 및 멋진 기능들을 배우거나 상기시키는 데 도움이 되었기를 진심으로 바랍니다.

이 기사에 대한 피드백이나 질문이 있다면 언제든지 부탁드리겠습니다. 그리고 저와 연락을 유지하고 싶다면 LinkedIn에서 저를 찾을 수 있습니다.

감사합니다!
