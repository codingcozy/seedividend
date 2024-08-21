---
title: "NestJS 전반적인 내용 정리"
description: ""
coverImage: "/assets/img/2024-05-20-NestJSBestPracticesPart0_0.png"
date: 2024-05-20 22:20
ogImage:
  url: /assets/img/2024-05-20-NestJSBestPracticesPart0_0.png
tag: Tech
originalTitle: "NestJS Best Practices Part #0"
link: "https://medium.com/javascript-in-plain-english/nestjs-best-practices-0-9d4b0cd00631"
isUpdated: true
---

# 용어

## 피처

컨트롤러를 포함하는 모듈은 "피처"라고 부릅니다. 피처는 한 앱에서 다른 앱으로 이동할 수 있는 모듈로, 컨트롤러에 주입된 엔티티를 만족시키기 위해 필요한 모든 종속성을 제공해야 합니다.

![이미지](/assets/img/2024-05-20-NestJSBestPracticesPart0_0.png)

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

# @글로벌()

글로벌을 사용하지 마세요! 진지해요; 글로벌을 사용하지 말아주세요. 글로벌은 모듈성을 낮춥니다. 글로벌을 사용할 이유가 없어요. 만약에 무언가를 글로벌로 설정해야 한다면, 아키텍처를 확인해보세요.

## 글로벌 함수

.useGlobal\* 함수에도 동일한 규칙이 적용돼요. 이러한 함수들은 글로벌 구성을 e2e 테스트에서 반복해야 할 것을 강요할 거예요.

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

예를 들어:

```js
const app = await NestFactory.create(AppModule);
app.useGlobalGuards(new RolesGuard()); // <- 좋지 않은 해결책
```

나는 이러한 구성을 컨트롤러에서 "재선언"하는 것을 선호합니다. 이렇게 하면 해당 기능에 모든 종속성을 제공해야 하며 모듈화되고 독립적이게 됩니다.

이 규칙의 유일한 예외는 .setGlobalPrefix 함수입니다.

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

# 친절한 한국어 번역 🚀

In Plain English 커뮤니티의 일원이 되어 주셔서 감사합니다! 가기 전에:

- 작가를 clapping하고 팔로우 해주세요 ️👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | 뉴스레터
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture | Cubed
- 알고리즘 콘텐츠를 다루지 않는 블로깅 플랫폼이 필요하신가요? Differ를 시도해보세요
- PlainEnglish.io에서 더 많은 콘텐츠를 확인하세요
