---
title: "프론트엔드 개발자를 위한 변수 이름 짓기 팁"
description: ""
coverImage: "/assets/img/2024-05-17-NamingVariablesistheEternalStruggleBetweenClarityandCrypticProfanity_0.png"
date: 2024-05-17 21:48
ogImage:
  url: /assets/img/2024-05-17-NamingVariablesistheEternalStruggleBetweenClarityandCrypticProfanity_0.png
tag: Tech
originalTitle: "Naming Variables is the Eternal Struggle Between Clarity and Cryptic Profanity"
link: "https://medium.com/@PurpleGreenLemon/naming-variables-is-the-eternal-struggle-between-clarity-and-cryptic-profanity-6213cf930692"
isUpdated: true
---

그 깜빡이는 커서를 응시하며, 머릿속에서 지나치게 구체적이거나 혼란스러운 적절하지 않은 가능성 범위를 지나갑니다.

내가 시간을 더 낭비한 것은 변수 이름을 고민하는 것이라고 인정하기를 원치 않는다. 이건 섬세한 균형이다. 변수의 목적을 명확하고 간결하게 나타내는 것이 좋지만, 또한 이 미친 코드를 작동시키려고 하는 내 안에서 맴돌고 있는 감정 범위 전부를 표현하고 싶다.

여기 나의 변수 명명 지옥을 겪은 개인적인 여정.

## 순진한 이상주의자 단계

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

아, 코딩이 간단했던 초창기 날들이 떠오르네요. 새로 판올린 교과서와 좋은 의지를 가지고, 명확한 변수명이 유지보수 가능한 코드의 핵심이라고 믿었던 제 모습이 생생하게 기억돼요. "customerTransactionHistory"와 같은 이름은 제 손끝에서 흘러나온 것처럼 풀어진 걸작으로, 목적에 대해 약간이라도 불분명함을 남기지 않았어요.

미래 개발자(혹은 나 자신)가 제 코드를 감탄하며 살펴볼 것을 상상했죠, 세심한 주의를 기울인 것을 감사히 여기는 모습을 떠올릴 수 있어요. 천진난만한 제 마음이시죠. 하지만, 이 접근 방식이 실패로 이끈 이유가 여기 있어요.

현실의 코드는 그다지 예쁘지 않아요. 복잡한 중첩 구조와 10개의 매개변수를 지닌 함수와 마주하면 이상주의는 깨지게 돼요. 아름다운 변수 이름들이 글 같아 보이기 시작해요.

완벽한 변수 이름을 만드는 데 다섯 분을 쓰는 건 소중한 문제 해결 시간을 뺏어갈 수 있어요. 코드의 한 부분에서 완벽했다고 생각하는 것이 다른 부분에서는 지나치게 장황해 보일 수 있어요. 모듈이나 함수 내에서의 네이밍 규칙은 단어의 쓸데없는 증가 없이 명확성을 유지할 수 있게 도와줘요.

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

서술적인 이름이 좋지 않다는 건 아니에요. 다만 교과서적인 이상에 매몰되어 더 큰 그림 — 가독성이 좋고 효율적으로 작성되는 코드를 만드는 것을 간과한 적이 있어요. 몇 년 동안 변수들이 (조금) 짧아졌다고 할까요.

# 암호화된 약어 단계

이상주의가 끝난 후, 난 역행했어요. 좌절과 효율적이지 못한 감각에 힘입어, 암호화된 약어의 어두운 세계를 받아들였어요. "usrData"? "tmpObj"? 나만이 해독할 수 있는 비밀 언어로만 보이는 제 코드는 가끔은 나조차 해독하지 못할 때도 있었어요.

나는 이게 개발자 기술의 정점이라고 자신을 납듯했죠. 긴 서술적인 이름은 초보자들을 위한 것일 뿐이라고 납듯했어요. 진짜 개발자들은 밀과 쌈채로 구별되는 코드 줄임말로 의사소통해야 한다고 생각했어요. 그런데, 이 논리의 문제는 종종 제가 쌈채로 남게 된다는 거예요.

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

크립틱 약어에 대해 언급해보겠습니다. 미래의 여러분은 멍청한 사람이 될 거예요. "prcFl"이라고 쓸 때 느끼는 뛰어난 명확성은 코드에서 멀어지면 금방 사라질 거예요.

"tmp"는 흐름 속에서 명확해 보일 수 있지만, 일주일 후에는 임시 개체일지, 임시 파일일지...누가 알겠어요? 영광스러운 고립 환경에서 작업하지 않는 이상, 암호화된 약어는 코드 리뷰를 혼란과 좌절의 악몽으로 만들어버릴 거예요.

오해하지 마세요, 약어를 사용하는 시기와 장소는 있어요. 잘 정립된 패턴이나 작은 함수 내에서는 사용할 수 있어요. 하지만 새로운 글리픽 언어를 발명하기 시작한다면, 한 발 물러서야 할 때입니다.

# "모든 것이 망가졌다, 포기해야 할 때" 단계

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

우리 모두 한 번쯤은 그런 적이 있었죠. 버그가 수 시간 동안 논리에 저항하고, 정신이 미치도록 아슬아슬한 상태이며, 카페인은 오히려 의도와는 반대 효과를 나타내기 시작했을 때 말이에요. 그때 진정으로 혐오스러운 변수 이름들이 드러나게 되는 거죠.

"뭔가"나 "것"이 그 시작에 불과합니다. 곧이어 "이거아마뭔가를하는게아닐까", "이건만지지마세요"와 업무 환경에서는 명백히 부적합한 몇 가지 이름들이 코드에 가득할 거예요. 이것들은 그저 변수 이름 이상이에요 — 당신의 좌절을 상징하는 기념비 같은 존재죠.

"포기" 단계에 머무르는 것은 위험한 위치라는 이유가 여기 있어요. 절망은 전염력이 있답니다.

이 상태의 코드를 우연히 발견하는 동료를 상상해보세요. 그것은 개발자의 공포 영화와 같을 거예요. 말로 표현할 수 없는 이름으로 낙인 찍힌 건, 코드가 무엇을 해야 하는지 스스로 잊어버렸다는 신호겠죠. 키보드에서 멀어지세요, 친구야.

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

가끔, 이 지점에 도달했을 때 할 수 있는 최선의 일은 멀리 물러나는 것입니다. 머리를 식히고 다른 작업에 도전하고 신선한 시각으로 다시 돌아오세요. 잘못된 변수명조차도 디버깅 절망의 깊이를 나타내는 변수명보다는 낫습니다.

# 욕설이 섞인 붕괴

모든 개발자의 여정에서 이성과 점잖음이 버려진 지점이 있습니다. 너무 악랄하고 놀랍게 비논리적인 버그가 있어서 유일한 적절한 대응은 변수명에 언어감정을 엮은 문자열을 남기는 것입니다.

바다사나이마저 얼굴이 붉어질 만한 이름을 생각해보세요 (그리고 아마 당신의 감정 안정성을 의심할 지도 모릅니다). 이들은 그냥 변수명이 아니라 코드베이스에 방출된 원시적인 비명입니다. 압도적인 좌절 속에서 필사적이고 정화적인 행동입니다.

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

여기가 이 단계에 대한 점인데요 - 혼자 일하는 경우가 아니거나 팀원들이 욕설에 대해 매우 편안한 태도를 가지고 있다면 '커밋'을 누르기 전에 한 번 더 생각해보세요.

코드를 통해 분노를 표현하는 것에 이상한 만족감이 있습니다. 버그를 고치지는 못하지만, 영혼을 파괴하는 압박을 어느 정도 해소할 수 있을 겁니다. 욕설이 기본적인 네이밍 규칙이 되면 키보드에서 떨어져 나와야 할 때가 왔습니다. 산책을 해보거나 베개에 소리를 지르거나, 뇌를 초기화하기 위해 무엇이든 해보세요.

자, 전술하고 싶지 않지만, 코드를 5학년 학생의 욕설 그릇으로 만드는 것을 옹호하고 싶지 않습니다. 가끔 잘 사용된 악센트 (분별하여 사용되며 제작 코드에 남아 있지 않는 경우)가 개발자의 절망의 깊이를 표현하는 유일한 방법일 수도 있습니다.

#깨달음의 순간

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

가끔씩, 나는 완벽한 하이쿠를 이루어냅니다 - 기술적이면서도 약간의 절망이 묻어나는 변수명을 만들어 냈다는 사실입니다.

알 수 없는 약자와 욕설이 섞인 혼돈의 중 속에서 간혹 영감의 빛이 비치곤 합니다. 그런 순간에 당신은 불가능한 것을 이기고 하나의 변수명을 얻게 됩니다. 간결하고 정확하며, 당신이 겪은 감정의 놀이를 소중하게 담아낸.

이 이름들은 단순한 라벨 이상으로, 당신의 투쟁의 증거입니다. 여기 몇 가지 제가 만든 것을 소개합니다.

- almostWorks: 남아 있는 불신 가운데 희망의 문을 열다. 우리 모두가 그 상황을 겪었습니다.
- fixAttempt4 (pleaseWork): 괄호 안에는 개발자에게 국적화된 절망이 담겨 있습니다.
- whyDoesThisExist: 당신의 프로그램 안에 코딩된 존재론적 질문입니다.
- temporaryFixThatBecamePermanent: 아마도 쌓인 기술 부채에 대한 자기 비하적인 인정입니다.

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

변수 이름은 섬세한 균형을 유지해야 합니다. 목적을 제대로 이뤄주는 동시에 이야기를 전달해야 합니다. 알맞은 이름은 버그를 처리한 이야기, 의문스러운 설계 선택, 그리고 우리의 직업에 스며든 고요한 포기를 대변합니다.

완벽한 시스템은 없습니다. 때로는 간결함을 위해 명확성을 포기해야 하는 경우도 있습니다. 다른 경우에는 지나치게 장황한 몬스트로시티가 되기도 합니다. 그리고 당신이 그 순간에 이해할 수 있는 변수 이름이 있더라도, 몇 달 뒤에 돌아와 당신을 괴롭힐 수 있습니다.

제가 해줄 수 있는 진짜 조언은 — 최선을 다하되, 정신 건강을 위해 몇 가지 주석을 남기고, 당신의 코드를 푸시하기 전에 참혹한 변수 이름을 다듬어내기 위해 스스로를 표현하는 데 겁내지 않는 것입니다.
