---
title: "라이트닝 웹 컴포넌트에 대해 SalesForce 개발자가 알아야 할 5가지 중요 사항"
description: ""
coverImage: "/assets/img/2024-05-27-5ThingsSalesforceDevelopersshouldknowaboutLightningWebComponents_0.png"
date: 2024-05-27 19:11
ogImage:
  url: /assets/img/2024-05-27-5ThingsSalesforceDevelopersshouldknowaboutLightningWebComponents_0.png
tag: Tech
originalTitle: "5 Things Salesforce Developers should know about Lightning Web Components"
link: "https://medium.com/gitconnected/5-things-salesforce-developers-should-know-about-lightning-web-components-098f3619851a"
isUpdated: true
---

![image](/assets/img/2024-05-27-5ThingsSalesforceDevelopersshouldknowaboutLightningWebComponents_0.png)

솔루션 아키텍트이자 전 프론트엔드 개발자로 활동한 저는 많은 Salesforce 프로젝트에서 UI 개발의 지식과 품질에 항상 놀라곤 합니다. 최근 몇 년 동안 Lightning Web Components (LWC)와 Lightning Web Security (LWS)의 도입으로 Salesforce가 일반 웹 표준을 지원하려는 움직임이 계속 확대되었다 하더라도, Aura 및 Lightning Locker와 같은 개념 이후 Salesforce 개발자들은 종종 이 분야에서 중요한 지식 갭을 갖고 Backend 중심적인 경향을 보입니다.

그래서, 이 블로그 포스트를 통해 LWC 개발에서 선수해야 할 몇 가지 중요한 사항을 명확하게 하고자 합니다. 그러나 그에 앞서, 가능한 UI 지식 갭이 왜 존재하는지 알아보기 위해 간단하게 되돌아보겠습니다.

# Salesforce 개발자가 왜 Backend 중심적인지?

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

내 의견으로는 Salesforce 생태계에서 UI 개발에 대한 깊은 지식 부족은 역사적인 문제입니다. 이는 주로 LWC가 2018/19에 출시된 이후에만 사용 가능한 Web Components 기반 UI 프레임워크가 현재 일반적으로 인정받는 웹 표준을 사용하기 때문입니다. 이는 당연히 Salesforce 개발자들 사이에서 JavaScript를 사용한 개발 시 일반적인 표준, 규칙, 그리고 최선의 실행 방법에 대한 인식이 부족하다는 것을 의미합니다. 물론, LWC 이전에도 Salesforce의 맞춤형 UI 개발을 위한 다른 솔루션이 있었지만(Aura 및 Visualforce), 이러한 솔루션들은 일반적인 UI 원칙을 준수하지 않고 플랫폼별이며 개별적이었습니다.

![이미지](/assets/img/2024-05-27-5ThingsSalesforceDevelopersshouldknowaboutLightningWebComponents_1.png)

그러나 지난 몇 년 동안 Salesforce는 이 방향으로 발전하고 일반적인 UI 개념을 적용하여 플랫폼을 JavaScript 개발자에게 더 매력적으로 만들었습니다. 2020년부터는 Salesforce JavaScript 개발자 1 자격증이 있으며, 시험 자체가 Salesforce 플랫폼과 독립적으로 JavaScript의 일반적인 이해를 테스트합니다.

이제 실질적으로 다가가서, LWC에 대해 꼭 알아야 할 5가지 중요한 사항을 함께 살펴보겠습니다!

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

# 1. Apex 없이 작동하는 경우가 많습니다

Salesforce에서는 일반적으로 "사용자 정의보다 표준"이라는 지침을 따르며, 이는 일정 부분 UI 개발에도 적용되어야 합니다. 이전에 설명한 바와 같이 백엔드 중심의 개발자들은 종종 UI 구성요소에서 데이터를 로드하고 표시하기 위해 사용자 정의 Apex 컨트롤러를 작성하는 경향이 있습니다. 그러나 Salesforce에는 이러한 사용 사례에 대한 "표준" 솔루션이 많이 존재합니다.

![Salesforce](/assets/img/2024-05-27-5ThingsSalesforceDevelopersshouldknowaboutLightningWebComponents_2.png)

Salesforce는 레코드 및 메타데이터 정보를 로드하는 LWC 개발을 위한 표준 UI API를 제공합니다.

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

- UI Record API — 레코드를 위한 일반적인 CRUD 작업을 허용합니다.
- UI Object Info API — 객체 메타데이터 및 픽리스트 값 가져오기
- GraphQL API — 라이트닝 데이터 서비스 및 GraphQL을 사용하여 데이터 관리

여기에 언급된 API 외에도 더 많은 API가 있습니다. 이러한 표준화된 UI API의 사용은 종종 LWC 코드를 훨씬 더 가독성 있게 만들어주며 Apex 컨트롤러 및 관련 테스트 클래스의 구현과 유지보수를 줄여줍니다.

매우 간단한 예제로 전체 내용을 설명하기 위해, 여기에는 Apex를 사용하여 계정 정보, 즉 이름을 표시하는 LWC로 시나리오를 제시합니다. 이 예에서 "Apex를 사용하지 않는" UI Record API를 사용하는 것이 명백하게 선호되는 옵션이 될 것입니다. 솔루션이 단순화되었으므로 필요한 Apex 테스트 클래스 및 오류 처리와 같은 것들은 무시되었습니다.

## Apex와 함께

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

![Image 3](/assets/img/2024-05-27-5ThingsSalesforceDevelopersshouldknowaboutLightningWebComponents_3.png)

![Image 4](/assets/img/2024-05-27-5ThingsSalesforceDevelopersshouldknowaboutLightningWebComponents_4.png)

## Without Apex

![Image 5](/assets/img/2024-05-27-5ThingsSalesforceDevelopersshouldknowaboutLightningWebComponents_5.png)

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

# 2. UI 스타일링을 간단하게 유지하세요

시간이 지남에 따라 알게 된 한 가지는 Salesforce 개발자의 공통 "좋아하는 작업"은 UI 스타일링입니다. 먼저, Apex와는 달리 UI 개발, 특히 LWC의 경우 여러 언어로 구성되어 있습니다. 이는 JavaScript로 구성 요소의 비즈니스 로직을 설명하는 것뿐만 아니라 HTML로 구조 및 요소를 설명하고 CSS로 스타일링하는 것을 필요로 한다는 것을 의미합니다.

그러나 Salesforce 개발자들이 가끔 소홀히 하는 경향이 있는 것은 스타일링과 관련해 항상 복잡하게 만들 필요가 없다는 점입니다. 올바른 접근 방법을 알지 못한 결과로 종종 나쁜, 때로는 불필요한 사용자 정의 CSS 코드가 발생합니다. 대부분의 경우 올바른 룩 & 필을 얻기 위해 사용자 정의 CSS가 전혀 필요하지 않습니다. 일반적으로 올바른 솔루션 방법을 찾기 위해서는 최대 3 단계만 필요합니다:

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

- LWC 구성 요소 참조: 먼저 재사용 가능한 표준 구성 요소를 찾아보는 것이 좋습니다. Salesforce는 미리 구축된 UI 요소, 예를 들어 버튼, 아이콘 또는 데이터 테이블과 같은 미리 만들어진 표준 컴포넌트 라이브러리를 제공하여 작업 또는 구성 요소를 구현하는 데 유용하게 사용할 수 있습니다.
- SLDS 블루프린트: 1번에서 설명한 미리 만들어진 솔루션을 사용하여 원하는 기능을 구현할 수 없는 경우 SLDS가 도움이 될 수 있습니다. Salesforce Lightning Design System은 Salesforce 룩 & 필을 따르는 LWC를 디자인하는 데 사용할 수 있는 템플릿 및 도구를 제공합니다. 이를 통해 Salesforce UI에 완벽하게 통합되는 개별 기능을 디자인할 수 있습니다. 또한 SLDS는 정렬, 테두리, 안쪽 여백 등과 같은 표준 스타일링 요구 사항을 해결하는 많은 CSS 유틸리티 클래스를 제공하여 사용자 정의 CSS를 작성하지 않아도 됩니다.
- 사용자 정의 CSS: 1번과 2번이 적용되지 않을 때에만 사용자 정의 CSS 스타일링을 고려해야 합니다. 예를 들어 고객의 기업 이미지에 맞추어 Experience 사이트용 LWC를 구축할 때 특정 디자인 요구 사항을 충족해야 하는 경우에 사용될 수 있습니다.

# 3. 웹 API 활용

특히 더 복잡한 UI 요구 사항을 구현할 때, 개발자들로부터 종종 "Salesforce에서는 불가능하다" 또는 "Salesforce 문서에서 이에 대한 정보를 찾을 수 없다"라는 말을 듣곤 합니다. Salesforce 개발자들은 주로 자체 생태계와 관련된 표준 및 문서 내에서만 활동하는 경향이 있습니다. 이는 Salesforce에 특화된 백엔드 프레임워크인 Apex에 대해서는 완벽히 타당한 이유이지만, LWC의 경우에는 종종 기본 웹 표준에 기반하므로 다양한 가능성을 확장하는 경우가 많습니다.

![이미지](/assets/img/2024-05-27-5ThingsSalesforceDevelopersshouldknowaboutLightningWebComponents_6.png)

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

물론, 항상 LWC 프레임워크 자체에서 제공하는 도구와 옵션부터 시작해야 합니다. 그러나 이들이 항상 충분하지는 않거나 모든 것을 다루지 않을 수 있습니다. 이 경우에는 해당 웹 API에 의존하거나 아니면 적절한 해결책을 찾기 위해 제3자 라이브러리를 통합해야 할 수도 있습니다. MDN 웹 문서는 사용 가능한 웹 API에 대한 포괄적인 문서화를 제공하는 적절한 소스입니다. 그럼에도 불구하고, 항상 주의해서 이를 처리하고 해당 이유를 신중하게 고려해야 합니다.

다양한 웹 API와 LWC로 어떤 것을 달성할 수 있는지에 대한 영감이 필요하다면, 몇 가지 예제를 담고 있는 다음 블로그 포스트들을 살펴보시기 바랍니다:

# 4. 시간을 절약하고 로컬에서 개발하기

LWC 개발의 시간 소모적인 측면 중 하나는 종종 개발이 Visual Studio Code(또는 다른 IDE)에서만 가능하다는 점이며, 최신 변경 사항을 검토하고 테스트하기 위해 새 코드를 연결된 Salesforce 조직에 계속 푸시해야 한다는 필요성을 포함합니다. 특히 미세한 스타일 조정에서는 이것이 신속하게 지루하고 피곤한 작업이 될 수 있습니다.

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

판매 포스를 제외한 다른 UI 프레임워크에서는 React나 Angular 같은 로컬 개발 서버 사용이 흔한 표준이므로 이런 상황을 피할 수 있어요. 여기서 큰 장점은 변경 사항을 먼저 배포할 필요가 없고, 대신 해당 파일을 저장하면 자동으로 업데이트되는 로컬 서버에서 직접 표시되는 점이에요. 그러나 많은 판매 포스 개발자들이 인식하지 못하는 것은 판매 포스에서도 LWC 개발을 위한 이 옵션이 존재한다는 점이죠. 아마도 이 기능이 여전히 베타 상태이기 때문일 것입니다. 하지만 저는 이미 많이 사용해봤고, 제 의견으로는 신뢰성 있게 사용할 수 있고, 그러므로 굉장히 과소평가된 기능이라고 말할 수 있어요.

![로컬 개발 GIF](https://miro.medium.com/v2/resize:fit:1400/1*WrIe8vWhnDGLkBjLZKLGgQ.gif)

로컬 개발에 대한 자세한 내용 및 설정 단계에 대한 필수 정보가 있는 블로그 포스트를 여기에서 찾을 수 있어요:

# 5. UI 단위 테스트를 고려하세요

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

제가 Salesforce와 함께 일하면서 전반적인 테스트 방법론에 대해 생각한 질문 중 하나는:

![이미지](/assets/img/2024-05-27-5ThingsSalesforceDevelopersshouldknowaboutLightningWebComponents_7.png)

일부 Salesforce 개발자들은 LWC에 대해 Jest를 사용하여 단위 테스트를 작성할 수 있다는 것을 알고 있지만, 직접 작성해 본 사람은 매우 적습니다. 실제로 Salesforce 외부에서 UI를 위한 단위 테스트 작성이 웹 개발에서 흔한 관행인데, 사용자가 상호 작용하게 되는 첫 번째 요소가 UI이므로 이는 직관적으로도 이해됩니다.

모든 Salesforce 개발자와 아키텍트는 프로덕션 배포를 수행할 때 75% 코드 커버리지의 잘 알려진 임계값에 익숙합니다. 그러나 왜 이것이 Apex에만 해당되는 것일까요? 이에 대한 이유는 여러 가지가 있을 것입니다.

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

- 역사적으로 Aura에는 실제 테스트 옵션이 없었지만 LWC의 도입으로 이를 해결할 수 있게 되었습니다.
- LWC 테스트는 로컬에서만 실행되며, Apex와 달리 메타데이터의 일부로 조직에 푸시되지 않아 조직 수준의 코드 커버리지 대상을 강제로 설정할 수 없습니다.

그러나 무시해서는 안 되는 것은 UI 구현의 일반적인 안정성과 품질 향상에 더해, LWC 테스트가 제공하는 추가적인 이점이 있습니다:

- 표준 구문 → 기존 테스트 프레임워크로서 검증된 Jest의 사용, 이는 다른 UI 프레임워크에서도 표준으로 사용됩니다.
- 빠른 피드백 → Apex 테스트와 비교했을 때 조직이나 데이터 연결에 대한 의존성이 없어서 (스텁/모의 사용).
- 코드 커버리지 보고 → LWC 및 Apex 구현의 결합 조직 커버리지를 모니터링하는 Sonar와 같은 도구에서 볼 수 있는 다양한 형식의 테스트 보고서 생성을 지원합니다.

![이미지](/assets/img/2024-05-27-5ThingsSalesforceDevelopersshouldknowaboutLightningWebComponents_8.png)

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

# 주요 포인트 및 권장 사항

이 블로그 포스트가 Lightning Web Components에 대해 고찰해 볼 기회를 제공했으면 좋겠습니다. 저는 Salesforce 개발자로써 논의된 주제에 대한 인식을 높이는 것이 중요하다고 생각합니다. 만약 여러분이 개발자이고 앞으로의 Salesforce 프로젝트에서 더 나은 성과를 얻고 싶다면 다음 사항을 고려해보세요:

- 사용자 경험을 항상 염두에 두세요!
- JavaScript 및 일반적인 개념에 대해 더 많이 학습하세요.
- Salesforce JavaScript Developer 1 자격증을 취득하려면 노력해보세요. 이 자격증은 JavaScript의 기술적 이해를 테스트합니다. LWC 프레임워크 이해와 해당 자격증 획득은 관련 LWC 슈퍼배지를 완료한 후에 이루어집니다.
- 제가 준비한 Lightning Web Components 트레일믹스를 확인해보세요. 이 트레일믹스에는 프레임워크에 대해 알아야 할 모든 정보가 포함되어 있습니다.
