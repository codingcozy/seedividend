---
title: "Angular로 컴포넌트 만드는 방법"
description: ""
coverImage: "/assets/img/2024-05-20-AngularAdvancedComponents_0.png"
date: 2024-05-20 22:51
ogImage:
  url: /assets/img/2024-05-20-AngularAdvancedComponents_0.png
tag: Tech
originalTitle: "Angular Advanced Components"
link: "https://medium.com/@fatih.akpiyal1/angular-advanced-components-33b131bae040"
isUpdated: true
---

![Screenshot](/assets/img/2024-05-20-AngularAdvancedComponents_0.png)

# 안녕하세요 여러분,

오늘은 우리의 작업을 더 쉽게 만들어주는 Angular의 두 가지 데코레이터, ViewChild와 ViewChildren에 대해 이야기하겠습니다.

Angular의 ViewChild와 ViewChildren 데코레이터는 컴포넌트 내에서 요소에 접근하기 위해 사용되는 특별한 데코레이터입니다.

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

태그를 Markdown 형식으로 변경해 보겠습니다.

## ViewChild

는 컴포넌트 클래스 내에서 DOM에 있는 객체를 나타낼 수 있게 해주는 데코레이터입니다. 이론적으로 설명할 때는 조금 지루해 보일 수 있지만, 실제 예시로 넘어가 봅시다.

![Image](/assets/img/2024-05-20-AngularAdvancedComponents_1.png)

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

간단한 구성 요소를 만들었고 Child1Component로 이름을 지었습니다. 기본적으로 셀렉터에는 'app-child1'이라는 값이 할당됩니다. 이 값을 사용하면 HTML 태그를 사용하여 메인 컴포넌트의 HTML에서 이 컴포넌트를 호출할 수 있습니다.

![image](/assets/img/2024-05-20-AngularAdvancedComponents_2.png)

그런 다음, 주 컴포넌트(app)에서 컴포넌트1을 호출하고 가져옵니다. 이처럼 ` app-child2 #h``/app-child2 ` `br` 이렇게 하죠.
여기서 볼 수 있듯이 'h' 값으로 DOM 개체를 표시하고 있습니다. 이렇게 함으로써 주요 컴포넌트에 접근하고 있습니다.

이제 어떻게 진행해야 합니까?

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

우리의 의도는 이 표시된 DOM 객체에 우리의 데코레이터를 적용하는 것이었죠, 맞나요? 네, 지금 그것을 하러 가보겠습니다.

![Angular Advanced Components](/assets/img/2024-05-20-AngularAdvancedComponents_3.png)

ViewChild 데코레이터를 사용하면 주요 컴포넌트 아래에서 원하는 값으로 표시된 DOM 객체에 개입할 수 있습니다. ElementRef 타입으로 표시된 것이기 때문에, 우리는 이 방법으로 'h' 값을 사용해 DOM 객체를 포착합니다.

지금까지 좋은가요?

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

아래 예시에서는 또 다른 예시를 보실 수 있습니다. 걱정하지 마세요, 완전히 동일한 동작을 수행합니다. 다만 이번에는 이 DOM 객체에 컴포넌트를 통해 접근하고 있습니다. 같은 방식으로 child1Component와 Child1Component 유형으로 이 값을 캡처합니다.

<img src="/assets/img/2024-05-20-AngularAdvancedComponents_4.png" />

이제 'static'이 무엇을 의미하는지 궁금하신가요? 간단히 설명드리겠습니다.

static: true는 프로그램이 실행될 때 이 값이 필요한 DOM 객체(컴포넌트)가 생성되어야 함을 나타냅니다. 제 말이 무엇을 의미하는지 궁금하시면, 예시를 통해 설명해 드리도록 하죠.

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

아래는 Markdown 형식으로 변경되었습니다.

![Angular Advanced Components 5](/assets/img/2024-05-20-AngularAdvancedComponents_5.png)

인터넷 사이트에서 양식 프로세스를 상상해보십시오. 해당 양식 작업을 수행할 의도가 없는 사용자에게 양식을로드하는 것은 비용을 증가시키고 사용자에게 느린 경험을 제공할 수 있습니다. 따라서 사이트가 열릴 때 설정해야 하는 DOM 객체에 대해서는 그 옆에 'true' 값을 반환합니다. 그러나 예제와 같은 양식 프로세스의 경우 'false' 값을 반환하는 것이 더 논리적일 것입니다.

![Angular Advanced Components 6](/assets/img/2024-05-20-AngularAdvancedComponents_6.png)

이제 이것을 이해했으니 계속해보겠습니다...

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

만일 DOM에서 데코레이터를 사용하여 다른 작업을 수행하는 방법에 대해 궁금하다면, 한 가지 속성에 대해 알려드릴게요. 좀 더 심화된 접근 방식에서는, 우리는 컴포넌트 내에 제공된 제공자를 통해 컴포넌트에 액세스할 수 있습니다. 이를 통해 제공자에서 지정된 데이터에 액세스할 수 있게 됩니다.

이것을 read라고 부릅니다. 아래에 표시된 것처럼, 이 속성을 사용하여 컴포넌트의 제공자를 통해 액세스된 DOM 객체에 필요한 작업을 수행할 수 있습니다.

![이미지 1](/assets/img/2024-05-20-AngularAdvancedComponents_7.png)

![이미지 2](/assets/img/2024-05-20-AngularAdvancedComponents_8.png)

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

# 이거도 얻었어요! 조작은 어디로 가나요??

이렇게 캡처한 후에는 컴포넌트 내에서 이러한 객체에 필요한 작업을 수행합니다. 일반적으로 이는 ngOnInit() 및 ngAfterViewInit() 두 가지 특별한 함수를 통해 수행됩니다.

![이미지](/assets/img/2024-05-20-AngularAdvancedComponents_9.png)

여기서는 간단히 콘솔에 로그를 기록했지만, 필요에 따라 컴포넌트 내에서 이러한 객체에 대해 필요한 작업을 수행할 수 있습니다.

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

지금 다른 질문이 있어요: 왜 이 모든 것이 한 함수에 없는 거죠? 이러한 함수들의 차이는 무엇인가요? 간단히 설명해 드릴게요. 폼 프로세스의 맥락에서 생각해 보세요:

ngOnInit 함수는 프로그램이 실행되기 시작할 때 호출되며, 시작할 때 수행해야 하는 초기 프로세스를 호출하는 데 사용됩니다.

반면에 ngAfterViewInit은 폼이 필요할 때 호출할 함수로 생각할 수 있습니다. 이를 바탕으로, `false`로 표시된 데코레이터는 ngOnInit 함수로 호출할 수 없다고 말할 수 있습니다.

# ViewChildren

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

특정 컴포넌트 내에서 특정 유형의 모든 요소에 액세스하는 데 사용됩니다. 다시 말해, 하나의 컴포넌트 내에서 여러 자식 컴포넌트에 액세스하려고 할 때 사용됩니다.

이러한 개념을 설명한 후에는 지금 무슨 일이 일어나고 있는지 충분히 이해했을 것으로 믿습니다. :D 명확한 그림이 그려졌는지 확인하기 위해 예제를 제공하겠습니다. 그런 다음 더 이상 문제가 되지 않을 것입니다.

아래에서 생성한 세 개의 컴포넌트가 있다고 가정해 봅시다. 이 세 개는 모두 동일한 공급자를 가지지만 다른 값을 갖습니다. 이를 어떻게 처리할 수 있을까요? 즉시 설명해 드리겠습니다.

<img src="/assets/img/2024-05-20-AngularAdvancedComponents_10.png" />

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

![이미지](/assets/img/2024-05-20-AngularAdvancedComponents_11.png)

![이미지](/assets/img/2024-05-20-AngularAdvancedComponents_12.png)

그런 다음 사용하는 모든 구성 요소를 가져와야합니다. 아래에서 볼 수 있듯이 모든 구성 요소에는 동일한 "h" 태그가 있습니다.

![이미지](/assets/img/2024-05-20-AngularAdvancedComponents_13.png)

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

5번째 예제에서 확인할 수 있듯이, 같은 'h' 값을 가진 모든 요소를 캡처하기 위해 @ViewChildren을 사용했습니다. 그런 다음 ‘read’ 속성을 사용하여 이러한 구성 요소 내부의 값을 읽고 'list' 변수에 저장했습니다. 보시다시피 QueryList로 모든 값을 캡처하여 데이터 유형을 지정했습니다. 그리고 이제 원하는대로 조작할 수 있습니다. :)

<img src="/assets/img/2024-05-20-AngularAdvancedComponents_14.png" />

결론적으로, Angular에서 강력한 데코레이터 @ViewChild와 @ViewChildren을 탐구했습니다. 이들을 사용하여 구성 요소 내의 요소와 상호 작용하고 조작할 수 있는 방법을 이해했습니다. 실제 예제를 통해 이러한 데코레이터를 사용하여 DOM 요소에 액세스하고 특정 시나리오에 기반한 작업을 수행하는 방법을 알아보았습니다. 또한, 고급 조작을 위한 구성 요소 제공자를 통한 'read' 속성에 대해 다뤄보았습니다.

더 많은 고급 주제로 계속 읽어주셔서 감사합니다!!
