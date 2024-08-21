---
title: "루비에서 로컬 변수의 사용하는 방법"
description: ""
coverImage: "/assets/img/2024-08-17-RubysMagicUnveilingthePowerofLocalVariables_0.png"
date: 2024-08-17 01:23
ogImage:
  url: /assets/img/2024-08-17-RubysMagicUnveilingthePowerofLocalVariables_0.png
tag: Tech
originalTitle: " Rubys Magic Unveiling the Power of Local Variables "
link: "https://medium.com/@patrykrogedu/rubys-magic-unveiling-the-power-of-local-variables-60be1f47c7da"
isUpdated: true
updatedAt: 1723864252100
---

![RubysMagicUnveilingthePowerofLocalVariables](/assets/img/2024-08-17-RubysMagicUnveilingthePowerofLocalVariables_0.png)

프리미엄이 필요 없어요! 여기서 무료로 읽어보세요!

옛날 옛적, 마법의 땅 루비에서 현자인 매츠라는 이름의 노련한 프로그래머가 살고 있었습니다. 매츠는 루비를 만들 때 특별한 애정을 가진 변수 유형 중 하나인 지역 변수에 대해 만들었습니다. 다른 형제들과는 달리 화려한 기호나 대문자가 필요한 것과는 달리, 지역 변수는 간단하고 꾸밈이 없습니다. 하지만 겸손한 외모에 속지 마세요. 지혜롭게 사용할 때 지역 변수는 큰 힘을 지니고 있습니다.

우리 이야기는 코드를 최적화하는 데 고민하던 젊은 루비 프로그래머인 사라로 시작됩니다. 사라의 멘토인 숙련된 루비 개발자인 잭은 그녀에게 지역 변수의 비밀을 가르쳐 주기로 결심합니다.

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

# 로컬 캐싱의 힘

"Sarah," Jack이 말했다. "로컬 변수가 코드 성능을 향상시킬 수 있는 방법을 보여줄게."

Sarah가 작성한 코드를 불러왔어요:

```js
class TimeFilter
  attr_reader :start, :finish

  def initialize(start, finish)
    @start = start
    @finish = finish
  end

  def to_proc
    proc do |value|
      next false if start && value < start
      next false if finish && value > finish
      true
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

"이거 괜찮아," Jack이 말했다, "하지만 로컬 변수를 사용할 때 어떻게 변하는지 봐봐."

일부 키 스트로크로 코드를 변형했다:

```js
def to_proc
  start = self.start
  finish = self.finish
  proc do |value|
    next false if start && value < start
    next false if finish && value > finish
    true
  end
end
```

Sarah의 눈이 휘둥그레졌다. "뭐했어?"

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

제이크는 미소 지었다. "나는 시작 및 완료 값을 로컬 변수에 캐시했어요. 이제 매번 attr_reader 메서드를 호출하는 대신, 더 빠른 로컬 변수 조회를 사용하고 있어요."

# 최적화된 Proc 이야기

사라의 흥미에 격려받아, 제이크는 수업을 계속했습니다. "하지만 더 나은 방법이 있어요," 그는 흥분한 눈으로 말했습니다.

그는 코드를 더욱 세련되게 개선했습니다:

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
def to_proc
  start = self.start
  finish = self.finish

  if start && finish
    proc{|value| value >= start && value <= finish}
  elsif start
    proc{|value| value >= start}
  elsif finish
    proc{|value| value <= finish}
  else
    proc{|value| true}
  end
end
```

사라가 놀라 말했다. "정말... 우아하군요!"

잭은 고개를 끄덕였다. "지역 변수를 사용하고 전문화된 프로시저를 만들어서 이 코드를 훨씬 빠르게 만들었어요. 기억하세요, 사라. 지역 변수는 루비의 즐겨 사용하는 이유가 있어요. 빠르고 효율적이거든요."

# 안전하지 않은 최적화의 위험성

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

그들의 수업이 계속됨에 따라, 잭은 사라에게 과도한 최적화의 위험에 대해 경고했습니다. "조심해," 그가 경고했습니다. "모든 표현식이 로컬 변수에 캐시될 수 있는 것은 아닙니다."

그는 아래 예시를 보여주었습니다:

```js
hash = some_value.to_hash
large_array.each do |value|
  hash[value] = true unless hash[:a]
end
```

"이 것을 최적화하려는 유혹은 있을 수 있지만," 잭은 설명했습니다. "hash[:a]를 로컬 변수에 캐시하는 것은 큰 배열에 :a가 요소로 있는 경우나 해시에 :a를 수정하는 기본 프록이 있는 경우 버그로 이어질 수 있습니다."

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

Sarah은 생각에 잠겨 공간 변수 사용의 미묘한 차이를 이해하기 시작했습니다.

# 변수명의 기술

세션 마지막을 향해 다가간 그들, Jack이 마지막으로 남긴 한 마디 명언은 이렇습니다. "기억해, Sarah, 변수를 잘 명명하는 것은 중요해. 이름의 길이는 범위 크기의 역수 비례해야 해."

그는 몇 가지 예시를 보여주었습니다:

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
# 변수 이름이 짧으면 한 글자도 괜찮아요
@albums.each do |a|
  puts a.name
end

# 범위가 길면 더 구체적인 이름을 사용해요
def process_transaction(transaction)
  # ... 여기에 복잡한 로직이 들어갈 거에요
end

# 아주 긴 이름은 약어로 줄여요
tps_report = TransactionProcessingSystemReport.new
```

# 루비 상수의 호기심: 위장한 변수들

옛날 옛적, 마법의 나라 루비에 젊은 프로그래머인 알렉스가 살았어요. 알렉스는 상수가 진정으로 불변하고 변할 수 없는 '자바' 나라에서 왔어요. 그러나 루비의 세계에서 알렉스는 상수가 보이는 대로만이 아닌 세상을 발견하게 될 거에요.

# 깨달음

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

한 날, 알렉스는 새로운 프로젝트를 진행 중이었을 때 멘토인 루비가 과정을 확인하러 들르기로 했다.

"안녕 알렉스, 어떻게 지내?" 루비가 물었다.

알렉스는 머리를 들고 납득할 수 없는 표정을 지었다. "좀 헷갈리는데요. 방금 상수를 재할당하려는데 경고 메시지만 떴어요. 그게 오류로 나와야 하는 거 아닌가요?"

루비는 알렉스의 질문에 멋지게 웃으며 대답했다. "아, 네가 루비의 독특한 특징 중 하나를 발견했군. 무엇인지 보여줄게."

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

루비는 앉아서 코드를 몇 줄 입력했어요:

```js
A = 1;
A = 2;
```

그러자 알렉스는 놀랐어요. 이것으로 두 개의 경고만 생성되었어요:

```js
warning: already initialized constant A
warning: previous definition of A was here
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

"하지만... 하지만... 이건 상수라구!" 알렉스가 퉁명스럽게 말했다.

루비는 웃음을 터트렸다. "루비에서는 상수가 더 이상한 권고 같은 존재야. 그냥 변하는 변수일 뿐이지."

## 상수 스코프 어드벤처

흥미를 느낀 알렉스는 루비가 제시한 상수 스코프 땅 여행을 더 알고 싶어했다.

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

“클래스와 상수의 작은 세계를 만들어 보죠,” 루비가 타이핑하며 말했습니다:

```js
class A
  W = 0
  X = 1
  Y = 2
  Z = 3
end

class Object
  U = -1
  Y = -2
end

class B < A
  X = 4
  Z = 5
end
```

“그럼 이제,” 루비가 이어 말했습니다. “다른 문맥에서 상수 조회가 어떻게 작동하는지 살펴봅시다.”

그들은 B 클래스를 별도의 스코프에서 열었습니다:

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
class B
  U # -1, from Object
  W # 0, from A
  X # 4, from B
  Y # 2, from A
  Z # 5, from B
end
```

알렉스의 눈이 커지며 이해하기 시작했습니다. "그래서 현재 클래스를 먼저 찾고, 그 다음 슈퍼클래스를 찾는 식이군요?"

# 가시성 딜레마

여정이 계속되는 동안 루비는 상수의 가시성 개념을 알렉스에게 소개했습니다.

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

"자바와 달리 루비의 상수는 기본적으로 외부에서 접근할 수 있습니다," 루비가 설명했습니다. "하지만 그것을 변경할 수도 있죠."

루비는 private_constant를 사용하여 클래스 외부에서 상수에 접근할 수 없도록 설정하는 방법을 보여주었습니다:

```js
class A
  X = 2
  private_constant :X
end

A::X # NameError 발생
```

알렉스는 흥미롭게 여겼습니다. "상수의 가시성을 제어할 수 있다는 건, 메소드와 마찬가지군요?"
