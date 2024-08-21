---
title: "JavaScript에서 속성 가져오고 설정하는 방법"
description: ""
coverImage: "/assets/img/2024-06-23-JavaScriptGettingSettingsAttributes_0.png"
date: 2024-06-23 14:43
ogImage:
  url: /assets/img/2024-06-23-JavaScriptGettingSettingsAttributes_0.png
tag: Tech
originalTitle: "JavaScript — Getting , Settings Attributes"
link: "https://medium.com/@geraldclarkaudio/javascript-getting-settings-attributes-4e8c6e8164bb"
isUpdated: true
---

지난 기사에서는 요소나 요소들의 내부 텍스트와 내부 HTML을 변경하는 방법을 다뤘어요. 이 기사에서는 해당 요소들의 속성을 가져오고 설정하는 방법에 대해 다룰 거에요.

![image](/assets/img/2024-06-23-JavaScriptGettingSettingsAttributes_0.png)

여기에는 href 속성이 있는 a 태그와 class 속성이 있는 p 태그가 있어요. JavaScript에서 가져오거나 설정할 수 있는 여러 가지 속성이 있어요. 이제 a 태그에서 href 속성을 가져와 보겠어요.

![image](/assets/img/2024-06-23-JavaScriptGettingSettingsAttributes_1.png)

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

여기서 a 태그에 대한 참조를 link라는 상수에 저장했어요. 그런 다음 link.getAttribute()를 기록하고 있어요. 이 방법에 href라는 문자열을 제공했어요. 브라우저 콘솔을 확인하면 그 값이 출력됩니다.

이제 값을 설정해 보겠어요.

<img src="/assets/img/2024-06-23-JavaScriptGettingSettingsAttributes_2.png" />

Google로 이동하는 대신 Yahoo로 이동하도록 말했어요. 브라우저에서 이 요소를 검사하면 값이 변경된 것을 볼 수 있을 거예요.

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

<img src="/assets/img/2024-06-23-JavaScriptGettingSettingsAttributes_3.png" />

또 다른 예시:

<img src="/assets/img/2024-06-23-JavaScriptGettingSettingsAttributes_4.png" />

여기서 p 태그를 잡아서 속성을 success로 변경하고 있어요. 이를 엘리먼트에서 검사해보면 속성이 변경된 것을 확인할 수 있습니다.

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

![Image](/assets/img/2024-06-23-JavaScriptGettingSettingsAttributes_5.png)

이것은 무언가가 작동했는지 여부를 표시하는 데 유용할 수 있습니다. 그렇지 않으면 오류가 있으므로 메시지 색상을 빨간색으로 변경하거나 작동했으면 메시지 색상을 녹색으로 변경할 수 있습니다.

이제 이미 존재하지 않는 html 요소에 속성을 설정합시다. JavaScript를 통해 p 태그에 스타일 속성을 추가하겠습니다.

![Image](/assets/img/2024-06-23-JavaScriptGettingSettingsAttributes_6.png)

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

여기에는 style 속성을 추가하여 텍스트 색상을 녹색으로 설정합니다.

<img src="/assets/img/2024-06-23-JavaScriptGettingSettingsAttributes_7.png" />

실용적인 예는 다음과 같습니다:

<img src="/assets/img/2024-06-23-JavaScriptGettingSettingsAttributes_8.png" />

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

요즘 확인만 할 불(bool)이 있어요. 이 불 값을 true로 설정하면 텍스트가 초록색으로 바뀌고 "You Win!"이라고 나와요. 그리고 false로 바꾸면 텍스트가 빨간색으로 바뀌고 "You Lose!"라고 나와요!

![이미지 1](/assets/img/2024-06-23-JavaScriptGettingSettingsAttributes_9.png)

![이미지 2](/assets/img/2024-06-23-JavaScriptGettingSettingsAttributes_10.png)

나중에 다룰 글에서 런타임시에 어떻게 동적으로 것들을 바꿀 수 있는지 다룰 거에요.
