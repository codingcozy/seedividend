---
title: "한 줄의 문자열 때문에 Apple App Store에서 금지된 Python 프로그램"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-PythonProgramBannedfromAppleAppStoreDuetoaSingleString_0.png"
date: 2024-07-09 20:02
ogImage:
  url: /assets/img/2024-07-09-PythonProgramBannedfromAppleAppStoreDuetoaSingleString_0.png
tag: Tech
originalTitle: "Python Program Banned from Apple App Store Due to a Single String"
link: "https://medium.com/top-python-libraries/python-program-banned-from-apple-app-store-due-to-a-single-string-a67df6d8fa66"
---

## APPLE APP STORE 리뷰의 투명성 부족

파이썬 개발자들이 특이한 문제에 직면하고 있습니다. 프로그래밍 언어 버전을 업그레이드하는 것이 앱 스토어에서 앱 거부를 유발하고 있습니다.

최근 일부 개발자들이 Python 3.11에서 3.12로 업그레이드했을 때, 그들의 앱을 애플 앱 스토어에 재제출했을 때 거부당했습니다.

이 문제는 많은 개발자들의 관심을 끌었습니다. 문제는 Python 3.12에 있는지, 아니면 애플의 리뷰 팀에 있는지요?

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 앱 리뷰 실패의 이유: 하나의 문자열 때문

![image](/TIL/assets/img/2024-07-09-PythonProgramBannedfromAppleAppStoreDuetoaSingleString_0.png)

개발자인 Eric Froemling은 GitHub에서 경험을 공유했습니다.

Eric은 처음에 이전에 승인된 앱이 왜 거부되었는지 이해하지 못했습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

앱 스토어 리뷰 팀에서는 왜 그랬는지 설명을 해주지 않았어요. 그저 "더 많은 정보를 제공할 수 없다"고만 말했죠.

몇 차례 시도 끝에, Eric은 Apple에 항의를 보냈어요. 결국 그들은 힌트를 주었어요:

가이드라인 2.5.2 - 성능 - 소프트웨어 요구 사항에 따르면:

앱이 설치되거나 실행 가능한 코드를 실행합니다. 특히, 앱을 설치하기 위해 itms-services URL scheme을 사용한다고 해요.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

itms-services URL 스키마는 Apple이 App Store 외부에서 iOS 앱을 배포하는 방법입니다. 주로 내부 또는 테스트용 앱에 사용됩니다.

이를 통해 사용자는 App Store를 사용하지 않고 iOS 기기에 앱을 직접 설치할 수 있습니다.

기본적인 itms-services URL은 다음과 같이 보입니다:

```js
itms-services://?action=download-manifest&url=https://example.com/manifest.plist
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

많은 조사 끝에, 에릭은 문제 파일을 찾았어요: Lib/urllib/parse.py (파이썬의 표준 라이브러리 URL 파서)와 그 .pyc 파일.

Python 3.12에서 “itms-services” 문자열이 추가되었어요. 애플은 이 문자열을 검색하고 포함된 앱을 자동으로 거부하는 것으로 보입니다.

마침내, 에릭은 이 문자열을 Python 코드에서 제거했어요. 그 후, 업데이트된 앱이 검토를 통과하고 성공적으로 앱 스토어에 등록되었어요.

# 논란이 되는 애플의 리뷰 및 피드백 규칙

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

![image](/TIL/assets/img/2024-07-09-PythonProgramBannedfromAppleAppStoreDuetoaSingleString_1.png)

에릭 프롬링은 "itms-services" 문자열 자체에 화를 내지 않았어요. 그보다 애플 앱 스토어 심사 규칙에 답답해했던 거예요.

많은 사람들이 알다시피, 디버깅은 종종 코딩보다 어려워요.

에릭은 많은 시간을 디버깅에 할애했어요. 문제를 해결하려면 단 하나의 문자열을 삭제하기만 하면 됐어요. 많은 개발자들은 애플의 심사 과정이 좀 더 명확했다면 이런 문제를 피할 수 있었을 거라고 생각하지만 사실 애플의 심사 과정은 투명하지 않아요.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

# CPython 코어 개발자: 앱 스토어 리뷰 규칙은 엄격하고 예측할 수 없어요!

![Image](/TIL/assets/img/2024-07-09-PythonProgramBannedfromAppleAppStoreDuetoaSingleString_2.png)

CPython 코어 개발자인 Russell Keith-Magee가 이 문제에 대해 기사를 썼어요. 그는 질문을 던지며 말했어요: 앱 스토어 규정에 맞추기 위해 얼마나 많은 변경을 해야 할까요?

문제는 애플의 macOS 앱 스토어에서 "itms-services" 문자열이 포함된 앱을 자동으로 거부한다는 것이에요. 심지어 앱이 itms-services:// URL을 사용하지 않아도 그렇다고 해요.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

러셀은 두 가지 해결책을 제안합니다:

1. "App Store 준수"를 CPython의 목표로 설정하는 것입니다. 이렇게 하면 사용자는 CPython을 패치할 필요가 없지만 더러운 코드를 야기할 수 있습니다.

2. 이것을 배포 문제로 취급합니다. Briefcase나 Py2app과 같은 도구를 사용하여 앱 스토어용으로 CPython을 패치합니다.

두 옵션 모두 장단점이 있습니다. 옵션 1은 수정된 Python을 배포하는 것을 의미합니다. 옵션 2는 계속해서 패치를 해야 합니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

알렉스 게이너, 또 다른 코어 개발자,은 세 번째 옵션을 제안했습니다:

- 이 문제에 대한 소규모 지역화된 수정 사항을 허용합니다.
- 병합하기 전에 문제에 대해 써드 파티(예: Apple)에 불만을 제기해야 합니다.
- 이러한 수정 사항에 대해 시간 제한을 설정합니다.

이 방법은 사용자 경험과 대기업의 자체 문제 수정을 균형있게 조합합니다.

키스 매지 후에 네 번째 옵션을 제안했습니다:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

문제가 되는 코드를 제거할 수 있는 빌드 옵션을 추가해보는 것은 코드를 난독화하는 것보다 더 깔끔한 해결책이 될 것입니다.

이 옵션은 다음을 포함할 것입니다:

- 변경 사항을 설명하는 diff 파일 추가.
- 환경 설정을 위한 --with-app-store-patch 옵션 추가.
- 필요한 경우 배급 업체가 업데이트된 패치를 제공할 수 있도록 함.

이를 통해 CPython이 App Store 규정을 준수하기 위해 필요한 변경 사항을 공식적으로 목록화할 수 있게 됩니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

Keith-Magee가 이 해결책이 더 수용 가능한 것 같다고 물었습니다.

# 결론

![이미지](/TIL/assets/img/2024-07-09-PythonProgramBannedfromAppleAppStoreDuetoaSingleString_3.png)

몇 일을 생각한 후, Keith-Magee가 6월 25일에 답변했습니다. 그는 --with-app-store-compliance 옵션을 추가하는 풀 리퀘스트(#120984)를 제출했습니다. 이것은 문자열 때문에 App Store에서 앱이 거부당하는 문제를 해결해야 할 것입니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

그는 이 옵션이 iOS와 macOS 외의 플랫폼에서도 사용될 수 있다고 언급했지만, 현재는 필요가 없다고 합니다.

모든게 순조롭게 진행된다면, 이는 Python 3.13에서 사용할 수 있을 것입니다.

많은 개발자들이 Python과 같은 무료 소프트웨어 프로젝트들이 명확하지 않은 검토 프로세스를 피해야 하는 방법을 찾는 데 시간을 낭비해야 한다는 점에 좌절하고 있습니다. 이는 개발자들이 비자유 플랫폼을 위한 소프트웨어를 만들 수 있도록 하는 것뿐입니다.

HN 사용자가 댓글로 남긴 내용:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 경우에 Keith-Magee와 다른 CPython 개발자들이 빠른 조치를 취했습니다. 그들의 해결책은 파이썬 앱 개발자들에게 최고의 경험을 제공하는 가장 쉬운 방법으로 보입니다.

그러나 이런 문제가 다시 발생할 가능성은 매우 높습니다.

제가 딱 한 달 만에 5,000명 이상의 팔로워를 얻었다는 점이 최고의 증거이기 때문에 “Medium에서 빠르게 팔로워 모으는 방법”에 대한 eBook을 작성 중입니다. 계속해서 주세요!

Substack에서 “대규모 모델 애플리케이션 개발” 시리즈를 쓰고 있습니다. 관심 있으시면 팔로우해 주세요!

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

친구님께서 읽어주셔서 감사합니다📖, 강조해주셔서 감사합니다🖍️, 박수를 보내주셔서 감사합니다👏, 댓글을 달아주셔서 감사합니다💬, 그리고 공유해주셔서 감사합니다🗣️. "Medium의 친구"로서 매일 함께 글을 작성하는 동료 작가들에게 인정을 보여드리려 노력하고 있어요.

그리고 위와 같이 멋진 콘텐츠를 소개할 때마다 알림을 받기 위해 뉴스레터📰를 구독할 수 있어요. 고맙습니다, 친애하는 챔프!🤓

최신 AI 이야기의 소식을 받아보기 위해 Substack에서 연락을 유지해주세요. 함께 AI의 미래를 함께 만들어요!
