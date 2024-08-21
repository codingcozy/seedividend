---
title: "파이썬 멀티스레딩 사용 방법 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: " Python Devs Shocked Multithreading Ahead"
link: "https://medium.com/@tomaszs2/python-devs-shocked-multithreading-ahead-261ef20e8016"
isUpdated: true
---

<img src="/assets/img/PythonDevsShockedMultithreadingAhead_0.png" />

# 만약에 당신이 Python에서 멀티스레딩을 포기했다면 좋은 소식이 있어요. 매우 가능성이 높아 GIL을 비활성화할 수 있게 되고 곧 변경될 것이지만, 조금은 난관이 있어요

파이썬, 정말 멋진 프로그래밍 언어의 이름이에요. 도마뱀부터 래브라도르까지 어떤 이름이든 가능했는데, 왜냐면 그것은 뱀의 이름을 따서 지어졌기 때문이죠\*.

이제, 수백만 명의 사람들이 뱀을 찾다가 프로그래밍 언어에 대해 배우게 되는데, 마치 슬리데린 집을 광고하는 좀 까다로운 방법처럼요.

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

이왕 이름을 상상해 보면 몇 가지 이점이 있을 것 같아요. 누군가가 "조심해, 파이썬이 있다!" 라고 외치면, 세미콜론과 중괄호가 없는 언어가 왜 위협적일지 궁금해하는 나보다 뱀이 먼저 우세할 수도 있겠죠.

하지만 그렇게 아킬레스 건초에 발목이 걸리기 전까지, 파이썬에 멀티스레딩 기능을 추가하려는 노력이 있단다고 전해드릴게요.

다음 이미지는 파이썬 개발자들이 멀티스레딩에 놀라는 모습을 담고 있어요.

![PythonDevsShockedMultithreadingAhead_1](/assets/img/PythonDevsShockedMultithreadingAhead_1.png)

그래서 파이썬을 잘 아시는 많은 분들에게는 놀라운 소식이 아니겠지만, 아마도 꽤 부정확한 글일 수도 있을 거에요.

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

그리고 사실 맞습니다. 그러나 자세히 들어가기 전에 우리가 무슨 일이 있었는지에 초점을 맞춰 봅시다. 오랜 이야기를 간단히 말하자면, GIL을 비활성화할 수 있습니다.

# 파이썬이 왜 싱글 스레드인가요?

GIL은 Global Interpreter Lock의 약자입니다. 이 애니메이션에서 잘 설명되어 있습니다:

![GIL Animation](https://miro.medium.com/v2/resize:fit:1000/1*6LVomy1nlo1qX0AVsdiw8A.gif)

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

여러 스레드에서 코드가 실행되는 것을 볼 수는 있지만, 실제로는 한 번에 하나씩 실행됩니다.

GIL에는 많은 장점이 있으며, 이를 제거하는 것은 언어 설계에 안 좋다고 여겨졌습니다. Python의 창시자인 귀도는 2007년에 이에 대해 다음과 같이 말했습니다:

즉, GIL이 제거된 Python 코드를 작성하는 것은 더 어려울 것이라는 것입니다.

그러나 과거에 이에 대한 실험이 있었지만 실패했습니다:

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

파이썬에 멀티스레딩을 도입하면 실행이 느려지게 됩니다. 각 스레드 간에 통신하기 위해 추가 작업이 필요하지 않기 때문입니다.

이로 인해 GIL 메커니즘이 적용된 한 스레드(한 번에) 파이썬이 우리와 함께 머문 이 모든 해를 봤습니다.

이는 싱글 스레드 성능에 대한 강한 믿음을 바탕으로 했습니다. 특히 그 당시 대부분의 사람들이 싱글 코어 프로세서를 사용했을 때입니다. Intel Duo Core는 몇 달 전에 출시되었고, 아무도 2024년에 16코어 스마트폰 프로세서에 대해 이야기할 것을 알지 못했습니다.

# 스레드 대 프로세스 논쟁

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

하지만 모든 사람이 GIL에 만족했다는 건 아니었어요. 2007년, Juergen Brendel은 Guido에게 편지를 쓰면서 멀티쓰레딩을 옹호했어요:

Guido는 그 편지에 대해 여기서 언급된 이유를 재확인하며 해결책, 포크 등에 대해 열렬히 지지하지만, 다른 일들로 인해 그것을 할 수 없다고 밝혔어요. 그것은 매우 많은 작업이 필요하고 Python이 현재 위치에 도달하려면 무엇에 집중해야 하는지 선택해야 했기 때문이죠.

그 시기의 모든 토론에서 Guido는 더 많은 작업을 처리하기 위해 프로세스를 생성하는 것을 지지하는 반면, Juergen은 쓰레드를 옹호했어요.

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

우리는 프로그래밍 역사가 나중에 어떻게 발전했는지 어느 정도 알고 있어. 쓰레드조차 어느 순간 너무 커져서 과부하가 걸릴 정도였어. 그래서 가벼워서 프로세스보다 쓰레드가 이겼지.

어쨌든, Juergen과 Guido 간의 이 대결은 파이썬 개발자들 사이에서 아주 소수라는 좁은 그룹 안에서 아주 유명했어.

이 문제에 대한 뜨거운 논쟁이 2007년부터 지금까지 계속되고 있어.

# 파이썬 개발자들이 멀티쓰레딩 없이 어떻게 살아낸 건지?

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

많은 방법으로 문제를 해결하려는 시도가 있었습니다. 그러나 전반적인 효과는 사람들이 Python을 느리다고 생각했다는 것이었습니다.

또한, 웃긴 점은 Python 개발자들이 실제로 신경 쓰지 않았다는 것입니다. 그에는 이유가 있습니다. 최고 수준의 성능이 필요한 라이브러리들은 C/C++로 작성되어 Python에서 매끄럽게 사용되었습니다.

그래서 Python 개발자들은 사랑하는 탭 기반 언어를 커뮤니케이션 도구로 사용하면서 최상의 성능을 얻을 수 있었습니다.

이 이중주의는 프로그래밍 세계에서는 그다지 특별하지 않지만, Rust로 작성된 Javascript 도구들이 거의 절반을 차지하는 지금, 항상 Python 반대 성향의 주장만 남았습니다.

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

저는 Python이 C++에 의존해야 한다고 해서 무용지물이라는 사람들의 논란을 보았어요. 그럼에도 불구하고 C++을 사용하지 않을 이유가 없다고 생각해요.

제가 이런 이야기를 만들어낸 건 아니에요. 하지만 다른 생각을 해요. C++은 좋아하지만, 차를 운전하느냐 아니면 통 아래에서 굴리느냐에 따라 다르거든요.

Python은 이 모든 시간 동안 엄청나게 발전해 왔고, 주변에 최고의 오픈 소스 커뮤니티 중 하나를 갖고 있어요.

# 파이썬을 멀티스레드로 만들 시간이에요

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

모든 이 16년 만에 예전의 먼지가 사라지고 파이썬의 좀 더러운 비밀이라고 받아 들여졌다고 생각하지 않나요? 지난 한 해에 Sam Gross가 GIL(Globally-Interpreted Lock)을 선택사항으로 만들어 멀티스레딩을 가능하게 하는 제안인 PEP 703을 발표했습니다.

이 강연은 매우 기쁘고 설득력 있습니다. 그는 여러 높은 수준의 숫자들을 인용하여 GIL이 그들의 작업에 미치는 영향을 강조하며 AI 트레이닝이 이로부터 이익을 얻을 수 있다고 설명합니다.

또한 C++을 사용할 필요가 없다는 점이 언급되며, 이를 통해 자동차를 운전하는 것을 좋아하는 개발자들에게 코드를 열어줄 수 있다고 합니다. GIL은 CUDA와 상호 작용하는 데 문제를 일으킵니다. 어떤 사람들은 nogil과 같은 파이썬 포크를 선택하지만 다른 사람들은 고생할 수도 있습니다. 왜냐하면 파이썬은 핵심 프로그래머들뿐만 아니라 생물학자와 같은 사람들도 사용하기 때문이며, 그들은 연구를 위해 좀 더 원시적인 언어를 사용하는 데 어려움을 겪을 수 있습니다.

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

파이썬의 멀티스레딩에 대한 몇 가지 강점이 있습니다. 제안된 솔루션의 과열은 그리 나쁘지 않습니다:

![이미지](/assets/img/PythonDevsShockedMultithreadingAhead_3.png)

스티어링 위원회가 솔루션을 수락했습니다.

작업은 진행될 것이지만, 아무 것도 망가지지 않도록 위험은 최소화되어야 하며, 문제가 발생하면 롤백될 것입니다.

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

# 곧 시도해 보세요!

첫 번째 단계로 Sam Gross는 PYTHON_GIL=0 또는 -X gil=0로 GIL을 비활성화할 수 있게 만들었습니다.

이미 병합되어 곧 공식 릴리스로 출시될 예정입니다.

물론, 이것이 의미하는 것은 내일부터 Python에서 멀티스레딩이 가능해진다는 것은 아닙니다. 실제로 할 일이 많습니다. CPython 뿐만 아니라 확장 프로그램, 라이브러리, 앱에서도 많은 작업이 필요합니다.

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

파이썬이 멀티스레딩이라고 말할 수 있는 것은 분명 몇 년이 걸릴 것입니다. 다른 요소들을 파이썬으로 다시 이식하는 노력을 언급할 필요도 없죠.

하지만 첫걸음은 이미 내딛었고, 누구나 자신의 시스템이 GIL이 비활성화된 상황에서 어떻게 반응하는지 확인할 수 있습니다.

이렇게 하면 코드를 조정하고 멀티스레딩을 준비할 수 있습니다.

이것은 언어뿐만 아니라 여기서 사용되는 전 세계 모든 사람들에게 환영받을만한 뉴스입니다. 왜냐하면 이로 인해 사용자들이 익숙한 환경에서 더 많은 일을 할 수 있게 되고, 파이썬의 보급이 확대되기 때문이죠.

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

그러고 보니 정말로 파이썬에 관심이 많으시군요! 'Summon The JSON: Python'이라는 파이썬 카드 게임을 디자인했어요. 우연히도요! 지금 주문 가능해요!

파이썬을 좋아하세요? 손뼉을 치고 구독하고 좋아요를 눌러서 소셜 미디어에 공유해주세요!

그리고 모든 파이썬 애호가와 창조자를 환영하는 새로운 파이썬 프로그래밍 길드 그룹에 많은 참여를 부탁드려요!
