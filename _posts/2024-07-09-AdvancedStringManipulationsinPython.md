---
title: "파이썬 고급 문자열 조작 기법들"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-AdvancedStringManipulationsinPython_0.png"
date: 2024-07-09 19:28
ogImage:
  url: /assets/img/2024-07-09-AdvancedStringManipulationsinPython_0.png
tag: Tech
originalTitle: "Advanced String Manipulations in Python"
link: "https://medium.com/scriptserpent/advanced-string-manipulations-in-python-dfd7f3812b6f"
---

![Advanced String Manipulations in Python](/TIL/assets/img/2024-07-09-AdvancedStringManipulationsinPython_0.png)

파이썬에서 문자열은 기본적이며 거의 모든 파이썬 애플리케이션에서 널리 사용됩니다. 연결 및 슬라이싱과 같은 기본적인 문자열 작업은 간단하지만, 파이썬은 코드를 보다 효율적이고 가독성 있게 만들어주는 다양한 고급 문자열 조작 기술을 제공합니다. 이 기사는 파이썬에서의 고급 문자열 조작에 대해 자세히 설명하고 있으며, 중급 개발자들이 문자열 처리 능력을 향상할 수 있도록 예제와 함께 제공합니다.

# 문자열 포매팅

## format() 사용하기

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

`format()` 메서드는 더 다양한 문자열 포맷팅을 가능하게 합니다.

```js
name = "Alice";
age = 30;
formatted_string = "Name: {}, Age: {}".format(name, age);
print(formatted_string);
```

결과:

```js
Name: Alice, Age: 30
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

이 방법은 다양한 형식 요구에 유연하게 대응할 수 있도록 위치 및 키워드 인수를 포함할 수 있습니다.

## f-Strings 사용하기

Python 3.6에서 소개된 f-strings는 문자열 리터럴 내부에 표현식을 잘 포함하는 간결한 방법을 제공합니다.

```js
name = "Alice"
age = 30
formatted_string = f"Name: {name}, Age: {age}"
print(formatted_string)
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

결과:

```js
이름: Alice, 나이: 30
```

f-Strings는 format()보다 읽기 쉬우면서 더 빠릅니다.

# 문자열 메서드

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

## join()

join() 메서드는 지정된 구분자로 문자열의 이터러블을 연결하는 데 사용됩니다.

```js
words = ["Python", "is", "awesome"];
sentence = " ".join(words);
print(sentence);
```

결과:

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
파이썬은 멋지다
```

이 방법은 루프에서 + 연산자를 사용하는 것보다 효율적입니다.

## split()

split() 메서드는 지정된 구분기호를 사용하여 문자열을 리스트로 분할합니다.

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
sentence = "Python is awesome";
words = sentence.split(" ");
print(words);
```

결과:

```js
["Python", "is", "awesome"];
```

기본적으로 split()은 모든 공백을 구분자로 사용합니다.

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

# 문자열 변환

## replace()

replace() 메서드는 문자열에서 지정된 부분 문자열을 다른 부분 문자열로 대체합니다.

```js
text = "Hello, world!";
new_text = text.replace("world", "Python");
print(new_text);
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

결과:

```js
안녕하세요, 파이썬!
```

이 방법은 원본 문자열에서 부분 문자열의 모든 발생을 대체할 수 있습니다.

## translate()

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

더 복잡한 대체 작업을 위해서는 str.maketrans()와 결합된 translate()가 강력합니다.

```python
translation_table = str.maketrans("aeiou", "12345")
text = "Hello, world!"
translated_text = text.translate(translation_table)
print(translated_text)
```

결과:

```python
H2ll4, w4rld!
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

이 방법은 한 번의 패스로 여러 문자를 교체하는 데 유용합니다.

# 고급 패턴 매칭

## startswith() 및 endswith() 사용

이러한 메서드는 문자열이 지정된 부분 문자열로 시작하거나 끝나는지 확인합니다.

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
텍스트 = "Python 프로그래밍";
print(텍스트.startswith("Python"));
print(텍스트.endswith("프로그래밍"));
```

결과:

```js
True;
True;
```

이 메서드들은 간단한 패턴 매칭에 정규식을 사용하는 것보다 더 빠릅니다.

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

# 문자열 정렬

## ljust(), rjust(), center() 사용하기

이러한 메서드들은 지정된 너비 내에서 문자열을 정렬합니다.

```js
text = "Python";
print(text.ljust(10, "-"));
print(text.rjust(10, "-"));
print(text.center(10, "-"));
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

결과:

```js
Python----
----Python
--Python--
```

이 방법들은 텍스트 기반 UI나 보고서에서 서식이 있는 출력을 만드는 데 유용합니다.

# 원치 않는 문자 제거

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

## strip(), lstrip(), 그리고 rstrip()

이 메서드들은 선행하거나 후행에 있는 문자들을 제거합니다.

```js
text = "   Python   ";
print(text.strip());
print(text.lstrip());
print(text.rstrip());
```

결과:

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
Python;
Python;
Python;
```

기본적으로 이러한 메소드들은 공백을 제거하지만, 다른 문자를 지정할 수도 있어요.

# 대소문자 변환

## upper(), lower(), title(), capitalize()

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

이 메서드들은 문자열의 대소문자를 변경합니다.

```js
text = "python programming";
print(text.upper());
print(text.lower());
print(text.title());
print(text.capitalize());
```

결과:

```js
PYTHON PROGRAMMING
python programming
Python Programming
Python programming
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

이러한 방법들은 텍스트 데이터를 정규화하는 데 유용합니다.

Python에서 고급 문자열 조작을 숙달하면 텍스트를 더 효율적이고 우아하게 처리할 수 있습니다. 문자열 포맷, 메소드 및 변환을 활용하여 더 깨끗하고 강력한 Python 코드를 작성할 수 있습니다. 이 글에서 다룬 기술은 중급 Python 개발자가 익숙해져야 하는 기본 도구로, 더 복잡한 텍스트 처리 작업에 대비할 수 있는 견고한 기반을 제공합니다.
