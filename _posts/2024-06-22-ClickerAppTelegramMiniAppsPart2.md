---
title: "클리커 앱 텔레그램 미니 앱 개발 가이드 Part 2"
description: ""
coverImage: "/assets/img/2024-06-22-ClickerAppTelegramMiniAppsPart2_0.png"
date: 2024-06-22 04:33
ogImage:
  url: /assets/img/2024-06-22-ClickerAppTelegramMiniAppsPart2_0.png
tag: Tech
originalTitle: "Clicker App: Telegram Mini Apps Part 2"
link: "https://medium.com/octa-labs/clicker-app-telegram-mini-apps-part-2-63bbdcf55589"
isUpdated: true
---

![이미지](/assets/img/2024-06-22-ClickerAppTelegramMiniAppsPart2_0.png)

이 글의 첫 번째 부분에서는 다음을 배웠어요

- BotFather를 사용하여 Telegram Bot을 만드는 방법
- TMA 프레임워크 사용법
- 봇에 미니 앱 추가하는 방법

이제 React + TWA + Node를 사용하여 Notcoin과 비슷한 간단한 클리커 앱을 만들어 볼 거에요.

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

# 앱 만들기

단계 1: 프로젝트를 초기화하고 React 앱에서 UI 라이브러리를 사용하려면 TWA 및 기타 종속성을 설치하세요.

```js
npm i @twa-dev/sdk
```

단계 2: 간단한 디자인을 만드세요(복잡하지 않아도 됩니다). 저는 3개의 섹션을 가지고 있을 것입니다: 포인트, 에너지 바와 버튼, 그리고 친구 초대 버튼.

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
<button
  onClick={() => {
    WebApp.openTelegramLink(
      `https://t.me/share/url?url=http://t.me/YOUR_BOT_USERNAME?start=fren=${userId}`
    );
  }
>
  친구 초대하기
</button>;
```

userId는 현재 사용자의 ID로, WebApp.initData 또는 WebApp.initDataUnsafe 메소드를 통해 얻을 수 있습니다.

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

Step 3: 앱을 배포하고 프로젝트에 메뉴 버튼 링크를 추가하세요 (1부 참조)

# 백엔드 처리

Step 1: 노드 파일을 만들고 텔레그램을 위한 종속성 추가하세요

```js
const TelegramBot = require("node-telegram-bot-api");

const token = "YOUR_TELEGRAM_TOKEN";
const bot = new TelegramBot(token, { polling: true });
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

단계 2: 사용자로부터 /start 메시지를 받으면 텍스트와 미니 앱을 열 수 있는 인라인 버튼을 전송합니다.

```js
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const user = msg.from;
  try {
    const user = await getUser(chatId);
    console.log(msg.text);
    if (!user.exists) {
      if (msg.text.includes("fren")) {
        const referrerId = msg.text.split("=")[1];
        createReferralUser(chatId, referrerId);
      }
    }
    createUser(chatId);
  } catch (error) {
    console.error("오류:", error);
  }
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "OctaClick 열기",
            web_app: {
              url: "DEPLOYED_APP_URL",
            },
          },
        ],
      ],
    },
  };
  bot.sendMessage(chatId, "환영합니다! 아래 버튼을 사용하여 미니 앱을 열어보세요:", opts);
});
```

이상입니다!

# 축하합니다! 텔레그램 클리커 앱을 만들었습니다.

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

이미지를 삽입했습니다!

다른 글들:

- 파트 1: 텔레그램 미니 앱 초보자 안내
- Hotjar: 당신의 웹사이트 탐정
