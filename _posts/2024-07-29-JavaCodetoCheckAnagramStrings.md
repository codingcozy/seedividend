---
title: "자바 코드로 애너그램 문자열 확인하는 방법"
description: ""
coverImage: "/assets/img/2024-07-29-JavaCodetoCheckAnagramStrings_0.png"
date: 2024-07-29 14:03
ogImage: 
  url: /assets/img/2024-07-29-JavaCodetoCheckAnagramStrings_0.png
tag: Tech
originalTitle: "Java Code to Check Anagram Strings"
link: "https://medium.com/hackerrank-programs/java-code-to-check-anagram-strings-12232e9e7501"
---


<img src="/assets/img/2024-07-29-JavaCodetoCheckAnagramStrings_0.png" />

두 문자열이 동일한 문자와 빈도를 가진 경우, 이를 아나그램이라고 합니다. 이 챌린지에서는 대소문자를 구분하지 않습니다.

예를 들어, CAT의 아나그램은 CAT, ACT, tac, TCA, aTC 및 CtA입니다.

```js
   import java.util.Arrays;

public class AnagramProgram {
    // 두 문자열이 아나그램인지 확인하는 함수
    public static boolean areAnagrams(String str1, String str2) {
        // 모든 공백 제거 및 소문자로 변환
        str1 = str1.replaceAll("\\s", "").toLowerCase();
        str2 = str2.replaceAll("\\s", "").toLowerCase();
        
        // 길이가 다른지 확인
        if (str1.length() != str2.length()) {
            return false;
        }
        
        // 문자열을 문자 배열로 변환
        char[] charArray1 = str1.toCharArray();
        char[] charArray2 = str2.toCharArray();
        
        // 문자 배열 정렬
        Arrays.sort(charArray1);
        Arrays.sort(charArray2);
        
        // 정렬된 문자 배열이 동일한지 확인
        return Arrays.equals(charArray1, charArray2);
    }

    public static void main(String[] args) {
        String str1 = "Listen";
        String str2 = "Silent";

        if (areAnagrams(str1, str2)) {
            System.out.println(str1 + " and " + str2 + " are anagrams.");
        } else {
            System.out.println(str1 + " and " + str2 + " are not..."