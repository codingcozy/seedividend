---
title: "쉬운 125번 유효한 회문"
description: ""
coverImage: "/assets/img/2024-06-20-Easy125ValidPalindrome_0.png"
date: 2024-06-20 02:36
ogImage: 
  url: /assets/img/2024-06-20-Easy125ValidPalindrome_0.png
tag: Tech
originalTitle: "Easy 125 Valid Palindrome"
link: "https://medium.com/@jacktsai045/easy-125-valid-palindrome-ec4f5da21e9c"
isUpdated: true
---




LeetCode 50 두 포인터

# 예시

## 예시 1

```js
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama"는 회문입니다.
```

<div class="content-ad"></div>

## 예제 2

```js
입력: s = "race a car"
출력: false
설명: "raceacar"은 회문이 아닙니다.
```

## 예제 3

```js
입력: s = " "
출력: true
설명: 비어있는 문자열 ""은 알파벳이나 숫자가 아닌 문자를 제거한 후에 남는 문자열입니다. 
앞으로 읽거나 뒤로 읽어도 동일하기 때문에 회문입니다.
```

<div class="content-ad"></div>

# 해결책

- 공간 복잡도: O( )
- 시간 복잡도: O( )

## 파이썬

```js
class Solution:
    def isPalindrome(self, s: str) -> bool:
        left, right = 0, len(s) - 1

        while left < right:
            while left < right and not s[left].isalnum():
                left += 1
            
            while left < right and not s[right].isalnum():
                right -= 1
            
            if s[left].lower() != s[right].lower():
                return False

            left += 1
            right -= 1
        
        return True
```  

<div class="content-ad"></div>

## TypeScript

# Postscript

## Python isalnum( )

```js
txt1 = "Company12"
print(txt1.isalnum())  # 결과: True

txt2 = "Company 12"
print(txt2.isalnum())  # 결과: False

txt3 = "Hello@World"
print(txt3.isalnum())  # 결과: False

txt4 = "HelloWorld"
print(txt4.isalnum())  # 결과: True
```

<div class="content-ad"></div>

## 참고 자료

1. https://github.com/TheExplainthis/LeetCodeJourney/