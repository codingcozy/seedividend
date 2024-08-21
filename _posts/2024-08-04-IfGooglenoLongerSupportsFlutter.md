---
title: "구글이 더 이상 Flutter를 지원하지 않는다면"
description: ""
coverImage: "/assets/img/2024-08-04-IfGooglenoLongerSupportsFlutter_0.png"
date: 2024-08-04 19:32
ogImage:
  url: /assets/img/2024-08-04-IfGooglenoLongerSupportsFlutter_0.png
tag: Tech
originalTitle: "If Google no Longer Supports Flutter"
link: "https://medium.com/gitconnected/if-google-no-longer-supports-flutter-9c5b22ba6a17"
isUpdated: true
---

<img src="/assets/img/2024-08-04-IfGooglenoLongerSupportsFlutter_0.png" />

저는 풀 스택 모바일 앱 개발자로, 연구부터 모바일 앱의 배포까지 모든 것에 능통합니다. 앱 스토어와 플레이 스토어에 공개된 다수의 프로젝트를 만들었습니다. 이러한 애플리케이션 대부분은 Flutter를 사용하여 개발되었습니다. Flutter 개발자로서 숙련되었지만, 이 프레임워크에 대한 몇 가지 우려가 있습니다. 왜 그런지 설명해드리겠습니다.

# 오픈 소스 (이슈 소스)

Flutter는 모바일 앱을 위한 우아한 UI를 만드는 데 뛰어난 오픈 소스 UI 프레임워크입니다. 몇 줄의 코드로 5개 이상의 플랫폼을 대상으로 하는 멋진 앱을 배포할 수 있습니다. 여러 플랫폼을 위한 단일 코드베이스를 유지하는 것은 중요한 장점입니다. 그러나 오픈 소스 프레임워크인 Flutter에는 도전 과제가 있습니다. 현재 12,000개 이상의 보고된 이슈가 있습니다.

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

플러터 커뮤니티가 성장하고 있지만, Google 플러터 개발자들이 코드를 검토하고 병합하는 데 상당한 시간이 걸릴 수 있다는 사실을 알고 계세요. 그 결과, 문제는 프레임워크의 여러 버전에 걸쳐 지속될 수 있으며, 개발자들은 해결책을 찾아야 할 수도 있습니다.

예를 들어, "수평 스테퍼 제목 오버플로우" 문제는 2019년 이후로 수정되지 않고 열려 있는 상태입니다. 저는 해결책을 시도해보고 심지어 풀 리퀘스트까지 제출했지만, 해당 문제는 아직 해결되지 않았습니다. 이 상황은 플러터 팀이 문제에 대처할 때까지 개발자가 일시적인 해결책을 고안해야 한다는 필요성을 강조합니다.

# 의존성

또 다른 중요한 문제는 플러터 패키지 및 플러그인의 상태입니다. 프로젝트에 기능을 추가하는 데 필수적인 많은 패키지들이 시간이 지날수록 사용되지 않게 될 수 있습니다. 특히 일부는 폐기된 Objective-C와 같은 언어로 작성되어 있으며, 이 언어들이 새로운 표준으로 업데이트되지 않은 경우도 있습니다. 이로 인해 호환성 문제와 런타임 경고가 발생할 수 있으며, 개발 프로세스가 번거로워질 수 있습니다.

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

예를 들어, 몇 년 동안 유지 보수되지 않은 패키지에 의존해 왔을 수 있습니다. 루틴 업데이트나 새 프로젝트 빌드 중에 여러 가지 사용이 중단된 경고 메시지(deprecation warnings)를 만날 수도 있습니다. 이러한 경고는 작은 귀찮음부터 앱이 제대로 작동하지 못하게 하는 중요한 장애물까지 다양하게 나타날 수 있습니다.

최근 프로젝트 중 하나에서 앱 기능에 중요한 역할을 하는 인앱 구매용 패키지를 사용했습니다. iOS 인앱 구매의 코드를 살펴보면 Objective-C 언어를 사용했다는 것을 알 수 있습니다. 이 플러그인이 Flutter 커뮤니티에 의해 유지 보수되고 있음에 틀림없지만, 만약 유지되지 않는다면 어떻게 될까요?

# 버전 관리

버전 관리도 중요한 문제입니다. 한 해 전에 오래된 버전의 Flutter를 사용해 Flutter 프로젝트를 만들었다고 가정해 봅시다. 그 당시 여러 패키지와 플러그인을 함께 사용했습니다. 이제 Flutter 버전을 업데이트하기로 결정했다면, 패키지와 플러그인도 업데이트해야 할 가능성이 높습니다. 업데이트하지 않으면 호환성 문제, 사용이 중단된 경고 또는 코드 일부를 다시 작성해야 할 필요가 발생할 수도 있습니다. 모든 것이 최신 버전과 원활하게 작동하는지 확인하기 위해 방대한 테스트와 디버깅을 포함하는 이 프로세스는 때때로 머리아플 수 있습니다.

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

# 라이프사이클 - 앱의 주기

플러터 앱의 라이프사이클은 네이티브 iOS 및 Android 라이프사이클과는 매우 다르며, 이로 인해 처리 문제가 발생할 수 있습니다. 네이티브 개발에서 각 플랫폼은 onCreate, onPause, onResume(안드로이드) 또는 viewDidLoad, viewWillAppear, viewDidDisappear(iOS)와 같은 특정 메서드를 사용하여 각 상태를 처리하는 잘 정의된 라이프사이클이 있습니다. 그러나 반면에 Flutter는 더 추상화되고 통합된 라이프사이클을 제공하여 네이티브와 완벽하게 일치하지는 않습니다.

예를 들어, Flutter의 WidgetsBindingObserver를 사용하면 앱 라이프사이클 변경을 모니터링할 수 있지만, 네이티브 라이프사이클 이벤트와 항상 동일한 섬세함이나 타이밍을 제공하지는 않을 수 있습니다. 이러한 불일치로 인해 자원을 관리하거나 사용자 입력을 처리하거나 전환 중에 상태를 유지하려고 할 때 문제가 발생할 수 있습니다.

내 프로젝트 중 하나에서는 permission_handler 패키지를 사용하여 권한을 관리했습니다. 사용자가 특정 필수 권한을 부여받기 전까지 다른 페이지로 이동할 수 없도록 보장해야 했습니다. 그러나 Flutter에서 여러 권한을 처리하는 것이 네이티브 코드보다 부드럽지 않았습니다. 네이티브 플랫폼은 권한을 관리하기 위한 더 견고한 시스템을 갖추어 더 정확한 제어와 사용자 경험을 제공합니다. Flutter에서는 필요한 모든 권한이 부여된 것을 확인한 후에만 계속할 수 있도록 하는 것이 번거로웠고 종종 신뢰할 수 없는 상태였는데, 이는 조각난 사용자 경험을 초래했습니다 (최신 Flutter 버전에서 해결되었을 수 있음).

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

# 나의 시각

말할 수 있는 문제들이 많지만, 이 기사를 너무 길게 만들고 싶지는 않아요. 제 주장은 모든 기술에는 장단점이 있다는 거예요. 우리는 단 하나에만 의지해서는 안 되죠. 새로운 기술은 거품처럼 보일 수 있어요: 몇 년 혹은 수십 년이 지나도 결국 새로운 기술이 나타나서 예전 것을 대체해요. 그래서, 여러분이 할 수 있는 만큼 많이 배우고 그 지식을 최대한 넓게 적용해보세요.

내가 언급한 문제들에 대한 해결책은 분명히 있을 거예요. 예를 들어, 문제를 해결하기 위해 자체 플러그인을 개발하거나 제가 한 것처럼 해결책을 찾을 수 있어요. 하지만 결국 이 모든 것들은 일시적인 해결책이고 영구적인 해법은 아니에요. 내 의견으로는 네이티브 코드를 작성하는 것이 어떤 크로스 플랫폼 기술을 사용하는 것보다 더 신뢰할 만하다고 생각해요. 개발 비용이 높을 수 있지만, 사용자 경험이 훨씬 더 나아질 거예요.

Flutter를 사용하거나 Flutter를 시작하는 개발자들에게 제 조언은, 네이티브 코드로 코딩하는 것도 시작해보는 거예요. 오로지 크로스 플랫폼 기술에만 의존하지 마세요. 네이티브 코드(Swift, Kotlin)를 작성하는 것은, 어떤 크로스 플랫폼 기술로도 해결할 수 없을 수도 있는 가장 중요한 문제들을 다룰 때 가치 있을 거예요. 크로스 플랫폼 앱 기술의 역사를 되돌아보면 — React Native, Apache Cordova, Ionic 등 — 이들은 그 다음 크로스 플랫폼 기술이 나타날 때까지 몇 년 동안 유명했지만, 네이티브 기술은 항상 남아있고 발전해왔어요.

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

당신이 배우고 싶은 주제에 대해 적어볼게요.

# 요약

요약하자면, 플러터는 많은 장점을 제공하지만, 이에 따른 단점도 있습니다. 개발자들은 이러한 지속적인 문제를 처리하고 공식 수정 사항을 기다리는 동안 창의적인 해결책을 마련할 준비가 필요합니다. 게다가 타사 패키지와 플러그인에 의존성은 최신 상태를 유지하고 이러한 종속성의 상태에 대해 주의 깊게 신경 써야만 매끄러운 개발 프로세스를 유지할 수 있는 중요성을 의미합니다. 게다가, 플러터와 네이티브 플랫폼 간의 앱 라이프사이클 관리의 차이는 세밀한 주의가 필요하여 사용자 경험을 원활하게 보장할 수 있습니다. 궁극적으로, 플러터와 네이티브 코드를 함께 이해하고 활용함으로써 다양한 개발 과제에 대해 더 견고하고 신뢰할 수 있는 솔루션을 제공할 수 있습니다.

# 떠나실 때 전에

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

안녕하세요! 테이블 태그를 Markdown 형식으로 변경해보세요.

감사합니다! 😊
