---
title: "골프 클럽 헤드 속도를 측정하는 장치를 위한 펌웨어를 개발했어요"
description: ""
coverImage: "/assets/img/2024-06-19-IDevelopedFirmwareforaDeviceThatMeasuresGolfClubHeadSpeed_0.png"
date: 2024-06-19 22:58
ogImage:
  url: /assets/img/2024-06-19-IDevelopedFirmwareforaDeviceThatMeasuresGolfClubHeadSpeed_0.png
tag: Tech
originalTitle: "I Developed Firmware for a Device That Measures Golf Club Head Speed"
link: "https://medium.com/javascript-in-plain-english/i-developed-firmware-for-a-device-that-measures-golf-club-head-speed-918b98699fc9"
isUpdated: true
---

## 프로그래밍

![이미지](/assets/img/2024-06-19-IDevelopedFirmwareforaDeviceThatMeasuresGolfClubHeadSpeed_0.png)

저는 프로그램 개발의 어려움을 보여주는 경험을 여러분과 공유하고 싶습니다. 이 경험은 프로젝트의 규모나 사용된 프로그래밍 언어와 무관하게 여전히 적용 가능하다고 믿기 때문입니다.

이 클라이언트는 아마도 중소 규모의 비상장 회사였습니다. 따라서 예산이 많은 회사와 비교하여 예산이 적었고, 이 프로젝트에는 하드웨어 엔지니어 한 명과 펌웨어 엔지니어인 저 한 명이 참여했습니다.

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

어쭈도 골프 경험이 없었지만, 마스터스 토너먼트와 영국 오픈을 즐겁게 관람할 만큼 관련 정보는 알고 있었어요.

시스템은 매우 간단해요. 골프공을 놓을 티와 LED 및 광 센서 두 세트로 구성되어 있어요 (다이어그램을 참고해주세요; 조금 별로에요). 이 시스템은 골프 클럽 헤드가 센서 A를 통과하는 데 걸리는 시간과 센서 B가 공을 쳤음을 감지하는 시간을 측정해요.

## 펌웨어 소프트웨어로서:

- 골프공이 티에 놓이고 센서 B가 그림자에 가려지면, 센서는 측정 대기 상태로 전환돼요.
- 타이머는 클럽 헤드가 센서 A를 가려는 순간부터 시작돼요.
- 헤드가 공을 치고 센서 B가 드러날 때, 타이머는 멈추고 PC에 시간을 알려주어요.

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

그거 다야.

나는 기술대학의 첫 번째 프로그래밍 과제로서 충분히 도전적일 것 같아. 그리고 화면을 통해 디버깅할 방법이 없었기 때문에, OS나 개발 환경이 없었어.

장치에서 실행하기 위해서는 코드를 ROM 라이터로 ROM에 작성해야 했기 때문에 이를 작동시키려고 애를 쓰곤 했어. 그래도 난 골프 채가 없었고 공을 한 번도 쳐본 적이 없었기 때문에 신문지를 말아 골프공 모양을 만들고, 손을 채로 이용해 말아진 신문지를 쳐보고 작동 여부를 확인했지.

그때 이 제품 아이디어를 냈던 경영진이 우연히 지나가더니, 그가 직접 클럽으로 골프공을 치기로 결정해버렸어.

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

클럽을 기뻐하며 가져가 공을 놓았어요. 우리가 공을 치기 전에 큰 실수를 저질렀다는 것을 깨달았고, 문제가 있다고 공식에게 말하고 테스트를 멈추었어요.

볼을 치기 전에 클럽 머리를 공 옆에 두어 접촉하도록 해요. 이 과정은 한 번만 하지만, 공식은 머리를 공 옆에 두고 두세 번 움직여요.

우리 시스템은 센서 B가 첫 번째 주소의 빛에 의해 가려질 때부터 측정을 시작하고 해당 주소 액션 동안 시간을 측정하기 때문에, 머리 속도만을 고려하는 게 아니에요.

해결책은 간단했어요. 센서 B가 어느 정도의 시간(약 0.5초라고 생각해요) 동안 빛에 가려지고 공이 치워지지 않으면 리셋되어 측정을 위해 대기 상태로 들어갔어요.

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

그래서 누가 잘못했었나요?

그것이 옳은 일이 될 수도 있지만, 저는 그것이 매우 어려운 일이라고 생각해요. 비즈니스 시스템이나 웹 프론트 엔드든, 우리는 핵심 요구 사항을 알고 있지만 의식적으로 인식되지 않는 시스템 개발에 필수적인 숨겨진 요구 사항이 항상 있다고 생각해요.

그것들을 "잠재 의식적 요구 사항"이라고 불러보는 것이 더 좋을 수도 있어요. 본 영업에 관해서는 우리 의식의 큰 부분이지만, 무의식적으로 작은 세부 사항을 다루는 것은 인간에게도 큰 장점이 되요.

이 시스템은 골프 매장을 위한 시스템의 일부 였는데, 충격 시 클럽이 비틀리는 정도를 측정하고 각 골퍼에게 가장 적합한 클럽 유형을 결정해요. 만약 우리 중 한 명이 골프 애호가였다면, 이것을 깨달았을 수도 있었지만, 이런 상황은 거의 발생하지 않아요. 매 우리와 시스템 고객 사이에 일어나는 건드림이 나지 않을 때요.

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

시스템을 개발할 때 중요 요구사항과 상세 요구사항은 인간에게 동일한 의미를 갖고 있다고 할 수 있으며, 종종 중요 요구사항이 충족되지 않으면 만족시킬 수 없다는 경우가 많습니다.

소프트웨어 개발의 어려움은 "잠재적 요구사항"의 존재에 있지 않을까 싶습니다.

믿을 만한 각종 시스템 분석 방법이나 개발 방법(예: agile 방법)이 결국은 근본적인 요구사항을 명확히 하는 방법에 종속되어 있다고 생각해요.

# 간단한 문장으로 설명하기 🚀

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

In Plain English 커뮤니티의 일원이 되어 주셔서 감사합니다! 떠나시기 전에:

- 작가를 클립하고 팔로우해주세요 ️👏️️
- 저희를 팔로우해주세요: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼에서도 만나보세요: CoFeed | Differ
- PlainEnglish.io에서 더 많은 콘텐츠를 만나보세요
