---
title: "자바스크립트 기본 지식 - 불리언, 비교"
description: ""
coverImage: "/assets/img/2024-05-18-JavaScriptBooleansComparisons_0.png"
date: 2024-05-18 22:16
ogImage:
  url: /assets/img/2024-05-18-JavaScriptBooleansComparisons_0.png
tag: Tech
originalTitle: "JavaScript — Booleans , Comparisons"
link: "https://medium.com/@geraldclarkaudio/javascript-booleans-comparisons-5a6a36c7cfe2"
isUpdated: true
---

![image](/assets/img/2024-05-18-JavaScriptBooleansComparisons_0.png)

Booleans, also known as Bools, represent true and false. That's all there is to it. Article complete.

Just kidding!

Let's take a closer look:

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

<img src="/assets/img/2024-05-18-JavaScriptBooleansComparisons_1.png" />

일단 콘솔에 true와 false를 기록할 거예요. 브라우저 콘솔에서 true와 false가 출력되는 것을 보실 거예요.

<img src="/assets/img/2024-05-18-JavaScriptBooleansComparisons_2.png" />

이것은 true와 false가 특별한 값을 가지고 있기 때문입니다. 그들은 부울입니다.

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

우리는 코드에서 특정 조건을 평가하고 해당 조건이 true 인지 false 인지를 확인하기 위해 bools를 사용합니다. 예를 들어:

![JavaScript Booleans Comparisons](/assets/img/2024-05-18-JavaScriptBooleansComparisons_3.png)

여기서 문자열 이메일을 선언하고 includes()를 사용하여 문자열에 @ 기호가 포함되어 있는지 확인했습니다. 결과를 기록하면:

![JavaScript Booleans Comparisons](/assets/img/2024-05-18-JavaScriptBooleansComparisons_4.png)

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

테이블 태그를 Markdown 형식으로 변경해 보시겠어요?

It prints true because the includes method returns a bool. If I feed it a character that ISN’T part of the email it will return false:

![Image 1](/assets/img/2024-05-18-JavaScriptBooleansComparisons_5.png)

Another way to use bools is to use comparison operators.

![Image 2](/assets/img/2024-05-18-JavaScriptBooleansComparisons_6.png)

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

나이를 25로 설정하고 콘솔에 로깅했는데, == 기호를 사용했어요. 이것은 기본적으로 나이가 25와 동일한지 묻는 것이에요. = 기호 하나는 값을 설정하게 되요. == 기호는 질문을 하는거죠. 콘솔에 이것을 로깅하면 true가 반환되는 것을 볼 수 있어요.

Markdown 형식으로 표를 바꿔주셨어요.

다음은 비교 연산자 목록입니다:

<img src="/assets/img/2024-05-18-JavaScriptBooleansComparisons_8.png" />

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

==는 그 값이 동일한지 확인합니다.

!=는 그 값이 동일하지 않은지 확인합니다.

`은 나이가 20보다 많은지 확인합니다.

`은 20보다 작은지 확인합니다.

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

` = 작거나 같음을 의미합니다.

` = 크거나 같음을 의미합니다.

따라서 출력값이 각 비교에 대해 놓은 주석과 일치한다는 것을 알 수 있습니다.

이 원리는 문자열에도 동일하게 적용됩니다. 예를 들어:

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

![이미지](/assets/img/2024-05-18-JavaScriptBooleansComparisons_9.png)

'gerald'은 'gerald'과 같습니다.

'gerald'은 'Gerald'과 다릅니다. 대문자 G 때문에 다릅니다.

'gerald'은 'adam'보다 큽니다. gerald이 'g'로 시작하고 adam이 'a'로 시작하기 때문입니다. JavaScript에서 알파벳 순서로 보면 더 뒤에 있는 글자가 더 큽니다.

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

'gerald'은 항상 대문자보다 크므로 'Gerald'보다도 큽니다.

'gerald'은 'Adam'보다도 큽니다. 왜냐하면 첫 글자가 소문자이기 때문에 소문자가 대문자보다 항상 크기 때문입니다.

전혀 혼란스럽지 않죠? :)

나중에 코드에서 조건을 평가하고 특정 조건이 충족되었을 때 특정 작업을 실행할 때 비교가 굉장히 유용하게 사용될 거에요. 다음에 또 만나요! 안녕하세요.
