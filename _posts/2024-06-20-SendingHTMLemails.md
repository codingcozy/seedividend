---
title: "HTML 이메일 보내기"
description: ""
coverImage: "/assets/img/2024-06-20-SendingHTMLemails_0.png"
date: 2024-06-20 03:22
ogImage:
  url: /assets/img/2024-06-20-SendingHTMLemails_0.png
tag: Tech
originalTitle: "Sending HTML emails"
link: "https://medium.com/snowball-insider-the-frosty-fintech-from-the/sending-html-emails-d0776876edfd"
isUpdated: true
---

HTML 이메일을 보내는 것은 생각보다 쉽지 않아요. 이메일 클라이언트들은 HTML 및 CSS 기술을 다루는 데 90년대에 멈춰 있어요.

# 빠른 예시

Snowball에서는 현재 미디어 웹 앱에서 뉴스레터 판본 목록을 작성 중이에요:

- 각 판본을 카드로 표시하고 싶어요
- 한 줄에 3장의 카드를 표시하길 원하고, 자동으로 다음 줄로 넘어가길 원해요
- 한 줄의 모든 카드의 높이가 동일하길 원해요

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

아래와 같이 변경하시면 됩니다:

![Image](/assets/img/2024-06-20-SendingHTMLemails_0.png)

참 쉽지 않나요?
기본 Tailwind CSS 구성을 제거하고 다음 코드를 작성하세요:

```html
<div class="flex gap-2 p-2 justify-center flex-wrap max-w-[1200px] mx-auto items-stretch">
  <div class="flex flex-col gap-1 max-w-[300px] border-1 p-2">
    <img src="https://picsum.photos/id/237/200/300" class="max-w-full h-auto max-h-[200px] fit-cover" alt="" />

    <h1>This is the title</h1>

    <p class="flex-1 flex items-end">This is the subtitle</p>

    <div class="flex justify-between">
      <span>Yoann Lopez</span>
      <span>2024년 6월 15일</span>
    </div>
  </div>

  <!-- 모든 에디션에 대해 반복합니다... -->
</div>
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

당신이 Tailwind로 생성한 스타일시트와 함께 Gmail 받은 편지함으로 이메일을 보냅니다:

<img src="/assets/img/2024-06-20-SendingHTMLemails_1.png" />

음... 제대로 작동하지 않는 것 같네요 (이것은 과장이 아닙니다).

대부분의 메일 클라이언트와 호환되면서 기대한 결과에 근접하려면 다음 마크업을 작성해야 합니다:

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

테이블 태그를 Markdown 형식으로 변경해 드렸어요.

```js
## 테이블1
| 속성 | 값 |
|---|---|
| 스타일 | max-width: 1200px; border-collapse: collapse; margin: 0 auto |
| 내용 | 이미지, 제목, 부제, 저자, 날짜 |

## 테이블2
| 속성 | 값 |
|---|---|
| 스타일 | max-width: 300px; margin: 0 auto |
| 내용 | 이미지, 제목, 부제, 저자, 날짜 |

## 결과
![이미지](/assets/img/2024-06-20-SendingHTMLemails_2.png)
```

당신의 이메일로 전송해 드렸어요!

완벽하진 않지만, 거의 비슷하죠…
아쉬운 점들이 있어요

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

- Tailwind CSS를 사용할 수 없어요 (스트일시트가 너무 커서 메일 클라이언트가 거부할 수 있어요)
- 인라인 스타일을 사용해야 해요 (외부 스타일시트는 전혀 지원되지 않고, 내장 스타일시트는 모든 클라이언트에서 지원되지 않아요)
- 내용을 적절하게 표시하려면 의미론적으로 잘못된 테이블을 사용해야 해요
- 코드가 정말 형편없어요!

# 좋은 이메일을 작성하는 방법

다행히도, 어떤 사이트들은 우리가 이런 지옥을 헤쳐나가는 데 도움을 줍니다:

- Can I Email (CSS/HTML의 Can I Use에 해당하는 이메일 버전). 스코어보드는 어떤 클라이언트를 쉽게 지원할 수 있는지와 어떤 클라이언트를 지원하기 어려운지 보여주는 좋은 자료입니다... 각 CSS 기능에 대한 다양한 클라이언트를 쉽게 비교할 수도 있어요
- Mailchimp 클라이언트 CSS 지원
- Email On Acid의 블로그 포스트
- 이메일용 CSS 지원에 대한 궁극의 안내서

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

## HTML 이메일을 작성해야 할 때의 주요 포인트와 배울 점을 소개합니다

- 이메일 레이아웃을 구성할 때 Flexbox와 같은 현대 CSS 기술을 사용하지 말아야 합니다. 대신 옛날 방식의 테이블을 사용해야 합니다.
- 스타일을 스타일 시트(내장 또는 연결된)로 작성해서는 안 됩니다. 스타일 시트는 일부 클라이언트(예: Gmail)에서 지원되지만, 해당 시트에 대한 몇 가지 규칙(예: 헤드 부분에만 지원, 최대 16ko, 스타일 시트의 속성 중 하나라도 지원되지 않으면 전체 스타일 시트가 삭제됨 등)이 있습니다. 대신 모든 스타일을 인라인으로 넣어야 합니다. 이를 위한 몇 가지 도구가 있습니다:
  - Premailer
  - Mailchimp의 CSS 인라이너 도구
  - customer.io는 이를 처리하기 위해 CSS 전처리기를 "브로드캐스트"에 통합합니다.
- 모든 CSS 선택자 및 속성이 지원되지 않으며, 지원 수준은 클라이언트에 크게 의존합니다. 동일한 클라이언트의 다른 앱들 사이에도 차이가 있을 수 있습니다(예: Gmail 데스크톱 웹메일, iOS 앱, 안드로이드 앱 및 모바일 웹메일 간의 차이) 그리고 물론 버전 간에도 (예: Outlook 데스크톱 클라이언트의 다른 버전들 간의 큰 차이가 있습니다). Hello GMail과 같이 일부 클라이언트들은 단 한 가지 속성만 지원되지 않아도 모든 스타일을 삭제할 수 있습니다. 이벤트의 경우(Gmail에서 다시 인사), 스타일은 한 "보기 위치"에서는 지원되지만 다른 곳에서는 그렇지 않을 수 있습니다(예: 전체 이메일을 크게 할 웹 뷰를 열 때 잘린 경우에는 GMail 주 inbox에 내장된 스타일 시트를 사용할 수 있지만, 동작하지 않습니다). 심지어 더 이상 이상할 정도로, 일부 클라이언트들(Gmail다시 한번)은 구글 계정만 사용하거나 구글 계정 없이 사용할 때도 일부 CSS 속성을 지원할 수 있습니다(GANGA 사건). 지원할 항목과 방법에 대해 어떤 선택을 할지에 대한 결정을 내려야 합니다. 일부 클라이언트에 대해 우아한 버전을 원하십니까(예: Gmail에서 지원되지 않지만 Apple Mail에서 지원되는 box-shadow 속성 추가)? 일부 클라이언트가 깨질 가능성이 있는 속성을 사용하십니까(따라서 해당 클라이언트를 "지원하지 않는" 클라이언트로서)? 등.
- 이메일은 "클립" 또는 잘릴 수 있습니다. 예를 들어 Gmail은 이메일을 정확히 102Kb에서 자릅니다. 사용자에게는 클라이언트의 "전체 메일 보기"를 사용하거나(위에서 보았듯이 다른 CSS/HTML 지원을 가질 수 있음) 웹 뷰를 사용하는 선택만 남습니다. 물론, 자르기 동작 또는 길이는 전적으로 클라이언트 및 버전에 따라 달라집니다...

## 전 세계에서 지원되는 좋거나 나쁜 기능의 짧은 목록을 원하신다면 다음과 같습니다.

- flexbox를 사용할 수 없으며, 대신 `tables /`을 사용해야 합니다.
- SVG를 사용할 수 없으며, 대신 일반 이미지를 사용해야 합니다.
- 사용자 지정 글꼴을 사용할 수 없으며, 시스템 글꼴을 사용해야 합니다(그러나 사용자 지정 글꼴을 지원하는 클라이언트를 위해 `head /`에서 사용자 지정 글꼴을 추가할 수 있음에 유의하십시오).
- box-shadow를 사용할 수 없습니다(그러나 일부 클라이언트는 지원하므로 해당 속성을 추가해도 됩니다). 그림자가 본적 필요한 경우, 테이블 안의 이미지의 오래된 방식으로 돌아가야 할 것입니다.
- 요소를 위치시킬 수 없습니다(특히 고정, 붙박이 또는 절대 위치에).

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

# 평판에 관해서는?

당신의 평판은 여러 요소에 달려 있어요: 도메인 이름과 이메일을 보내는 서버(즉, 발신자의 평판, 예: Sendgrid 등), 메시지 내용, 헤더의 존재 또는 부재, 링크와 이미지의 상태, 접근성 등이죠.

SPF, DKIM, DMARC와 같은 적절한 DNS 구성의 중요성을 과소평가하지 마세요. 이는 SpamAssassin 노트를 크게 개선/균형을 맞출 수 있습니다.

제공업체들은 종종 권장 사항을 업데이트합니다 (예: Yahoo와 Gmail). 그래서 이메일을 읽을 수 있도록 사용자를 원한다면 이러한 권장 사항을 지속적으로 확인하는 것이 매우 권장됩니다.

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

"당신의 '신뢰도'를 크게 향상시키는 한 가지 방법은 이메일에 List-Unsubscribe 헤더를 제공하는 것입니다. 이 헤더를 추가하면 사용자가 클라이언트 내에서 쉽게 뉴스레터 구독 해지를 할 수 있게끔 버튼/링크를 쉽게 찾을 수 있게 됩니다.

SpamAssassin (그리고 세계의 메일 제공업체들)에 대한 중요한 사실 중 하나는 .xyz와 같은 ‘이국적인’ 도메인 TLD(최상위 도메인)를 싫어합니다(🙄 snowball.xyz를 보고 있어요). 이러한 종류의 도메인을 사용하여 이메일을 보내거나 이메일에 이러한 도메인을 사용한 링크를 첨부하면 매우 부정적인 평판을 얻게 될 수 있습니다.

이를 극복하는 한 가지 방법은 이메일을 보내거나 이메일 자산을 호스팅하고 '이국적' 도메인에 호스팅된 실제 제품으로 리디렉션하기 위해 전용 '신데렐라' 도메인(media-snowball.com 대신 snowball.xyz)을 사용하는 것입니다.

또한, 이메일을 보내는 제공업체의 '추적자' URL을 사용하는 것은 링크의 나쁜 평판을 우회하는 대안일 수 있습니다. 예를 들어, Sendgrid는 보낸 이메일 내의 모든 링크를 추적하기 위한 특정 URL로 자동으로 대체합니다. '신데렐라' 도메인을 추적 도메인으로 구성한 경우, 이메일 내의 모든 '이국적' URL은 특정 '신데렐라' URL로 교체됩니다. 보너스로 추적이 가능합니다(예: 이메일 내의 모든 snowball.xyz URL은 자동으로 Sendgrid에 의해 url4000.media-snowball.com/ls/click?upn=`…` URL로 대체되어 snowball.xyz URL이 숨겨지게 됩니다)."

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

테이블 태그를 마크다운 형식으로 변경해보세요.

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
어떤 이메일 클라이언트/제공 업체를 사용하고 있나요?
- 애플
- Gmail (Google 계정)
- Gmail (비-Google 계정)
- 야후
- 오랑지
- SFR
- Free
- La Poste
- ProtonMail
- 기타
이메일을 어떻게 확인하시나요?
- 데스크탑/노트북 컴퓨터에서 웹메일
- 모바일에서 웹메일
- Windows 클라이언트 (예: Outlook, Mozilla Thunderbird 등)
- MacOS 클라이언트 (예: Apple Mail, Outlook, Mozilla Thunderbird 등)
- Linux 클라이언트 (예: Mozilla Thunderbird 등)
- iOS 앱
- 안드로이드 앱
- 기타
```

# 도움이 될만한 도구들

그리고 여기 몇 가지 유용한 도구들이 있어요. 이 도구들을 사용하여 이메일 형식 및 유효성을 테스트하고 평가할 수 있습니다:

- Email On Acid은 이메일을 만들고 최적화, 미리 보기, 테스트 및 유효성을 검사하는 데 도움을 줍니다. 그러나 솔루션이 상당히 비싼 편입니다.
- Mail Tester는 이메일을 보낼 수 있는 이메일 주소를 제공하고 다음의 다양한 기준에 근거하여 이메일의 "스팸 레벨"을 평가합니다: 도메인, 헤더, 내용, SpamAssassin 결과, 깨진 링크 또는 이미지, URL 단축기 등등.. 그런 다음 당신에게 1에서 10까지의 점수와 평판 수준 향상을 위한 조언을 제공합니다.

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

- Sendgrid은 여러 클라이언트에서 이메일을 테스트할 수 있는 방법을 제공합니다. 테스트하려는 각 클라이언트 당 1크레딧을 사용해야하지만 그런 다음 해당 클라이언트에서 이메일을 실행하고 스크린샷 및 보고서를 제공합니다. 정말 유용합니다.

이게 전부에요.
도움이 되었기를 바랍니다.

질문이 있으시면 언제든 댓글을 남기지 말고 질문해 주세요!

스노볼을 위한 클레멘트❤️
이 기사를 작성하는 데 도움을 준 요안 로페즈에게 감사드립니다 🙏
