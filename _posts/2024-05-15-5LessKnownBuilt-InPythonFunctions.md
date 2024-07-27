---
title: "파이썬 내장 함수 중 잘 알려지지 않은 5가지"
description: ""
coverImage: "/assets/img/2024-05-15-5LessKnownBuilt-InPythonFunctions_0.png"
date: 2024-05-15 15:36
ogImage: 
  url: /assets/img/2024-05-15-5LessKnownBuilt-InPythonFunctions_0.png
tag: Tech
originalTitle: "5 Less Known Built-In Python Functions"
link: "https://medium.com/gitconnected/5-less-known-built-in-python-functions-70f0ff5a069e"
---



![python function](/assets/img/2024-05-15-5LessKnownBuilt-InPythonFunctions_0.png)

## 1) callable(x)

The callable(x) function returns True if x is callable — x must either be a function or some object with the __call__ magic method defined.

```python
def hello():
    pass

hi = 1

print(callable(hello))   # True
print(callable(hi))      # False
```




^ 호출 가능한지 여부가 불분명한 여러 변수가 주어졌을 때, 함수를 사용하기 전에 실제로 변수를 호출하기 전에 callable 함수를 사용하여 먼저 이를 확인할 수 있습니다.

```js
class Dog:
    def __call__(self, x):
        pass

class Cat:
    pass

dog = Dog()
cat = Cat()

print(callable(dog))  # True
print(callable(cat))  # False
```

^ 함수에만 해당되는 것이 아니라 객체도 __call__ 매직 메서드를 사용하여 호출 가능하게 만들 수 있다는 것을 염두해 두세요.

# 2) divmod(x, y)



```js
print(divmod(6, 3))  # (2, 0)
print(divmod(7, 3))  # (2, 1)
print(divmod(8, 3))  # (2, 2)
print(divmod(9, 3))  # (3, 0)
```

`divmod(x, y)` 함수를 호출하면, x를 y로 나눈 결과를 담은 두 항목이 있는 튜플을 반환합니다:

- x를 y로 나눌 때의 몫 — 기본적으로 x // y
- x를 y로 나눌 때의 나머지 — 기본적으로 x % y

`divmod(x, y)`를 사용하면, x // y와 x % y를 각각 사용하는 것을 한 줄의 코드로 요약할 수 있습니다.



# 3) hasattr(object, attribute_name)

`hasattr(object, attribute_name)` 함수를 사용하여 객체 object가 문자열 이름 attribute_name을 가진 속성을 가지고 있는지 확인할 수 있습니다. 이 함수는 해당 이름을 가진 속성이 객체에 실제로 포함되어 있으면 True를 반환하고, 그렇지 않으면 False를 반환합니다.

```python
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

class Cat:
    def __init__(self, name, age, colour):
        self.name = name
        self.age = age
        self.colour = colour

dog = Dog('rocky', 5)
cat = Cat('catty', 6, 'brown')

print(hasattr(dog, 'colour'))  # False
print(hasattr(cat, 'colour'))  # True
```

- Dog 객체에는 name과 age 속성을 가지도록 정의합니다.
- Cat 객체에는 name, age, colour 속성을 가지도록 정의합니다.
- `hasattr(dog, 'colour')`는 Dog 객체가 colour 속성을 가지고 있지 않기 때문에 False를 반환합니다.
- `hasattr(cat, 'colour')`는 Cat 객체가 colour 속성을 가지고 있기 때문에 True를 반환합니다. Cat의 `__init__` 함수에서 정의한 대로입니다.



`hasattr` 함수를 사용하여 특정 객체에 속성이 있는지 확인한 후 해당 속성에 액세스를 시도할 수 있습니다.

## 4) isinstance(object, class)

isinstance(object, class) 함수는 다음과 같은 경우 True를 반환합니다:

- 객체의 유형이 클래스와 동일한 경우
- 객체의 유형이 클래스를 상속한 경우



```python
class Animal: pass
class Dog(Animal): pass
class Rice: pass
```

여기서 임의의 클래스를 정의해 봅시다:

- Animal 클래스
- Animal 클래스를 상속받는 Dog 클래스
- Rice 클래스

```python
dog = Dog()
print(isinstance(dog, Dog))     # True
print(isinstance(dog, Animal))  # True
print(isinstance(dog, Rice))    # False
```



- 개는 개입니다, 따라서 isinstance(dog, Dog)는 True를 반환합니다.
- 개는 직접적으로 동물이 아니지만, 개가 동물을 상속받았기 때문에, 개는 동물입니다 — 따라서 isinstance(dog, Animal)은 True를 반환합니다.
- 개는 밥이 아니므로, isinstance(dog, Rice)는 False를 반환합니다.

```js
a = Animal()
print(isinstance(a, Dog))     # False
print(isinstance(a, Animal))  # True
print(isinstance(a, Rice))    # False
```

- Dog는 Animal을 상속받았으므로, 개는 확실히 동물입니다 → 그러나 동물이 반드시 개일 필요는 없습니다 → isinstance(a, Dog)는 False를 반환합니다.
- a는 Animal이므로, isinstance(a, Animal)은 True를 반환합니다.
- a는 밥이 아니므로, isinstance(a, rice)은 False를 반환합니다.

# 5) issubclass(class1, class2)




issubclass(class1, class2) 함수는 다음 경우에 True를 반환합니다:

- class1이 class2와 동일한 경우
- class1이 class2의 하위 클래스인 경우 — 즉, class1이 어떤 방식으로든 class2로부터 상속을 받는 경우입니다.

```js
class Animal: pass
class Dog(Animal): pass
class GermanShepherd(Dog): pass

print(issubclass(Animal, Animal))          # True
print(issubclass(Dog, Animal))             # True
print(issubclass(GermanShepherd, Animal))  # True
```

- Animal은 Animal이므로 issubclass(Animal, Animal)은 True를 반환합니다.
- Dog는 Animal이므로 issubclass(Dog, Animal)은 True를 반환합니다.
- GermanShepherd는 Dog이고 Dog는 Animal이므로 issubclass(GermanShepherd, Animal) 또한 True를 반환합니다.




```js
print(issubclass(Animal, Dog))             # False
```

- 개는 동물입니다. 그러나 모든 동물이 개일 필요는 없으므로 issubclass(Animal, Dog)는 False를 반환합니다.

# 결론

이것이 명확하고 이해하기 쉬웠으면 좋겠습니다.



# 만약에 나를 창작자로 지원하고 싶다면

-  이 이야기를 위해 50번 박수를 치세요
-  당신의 생각을 나에게 남겨주세요
-  이 이야기에서 가장 마음에 드는 부분을 강조해 주세요

감사합니다! 이 작은 행동들이 큰 도움이 되고, 정말 감사드립니다!

YouTube: https://www.youtube.com/@zlliu246



LinkedIn: [https://www.linkedin.com/in/zlliu/](https://www.linkedin.com/in/zlliu/)

My Ebooks: [https://zlliu.co/ebooks](https://zlliu.co/ebooks)