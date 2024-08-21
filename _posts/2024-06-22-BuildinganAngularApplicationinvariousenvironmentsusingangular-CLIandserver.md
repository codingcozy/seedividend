---
title: "markdown특정 환경에서 angular-CLI와 서버를 사용하여 Angular 애플리케이션 빌드하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-BuildinganAngularApplicationinvariousenvironmentsusingangular-CLIandserver_0.png"
date: 2024-06-22 15:14
ogImage:
  url: /assets/img/2024-06-22-BuildinganAngularApplicationinvariousenvironmentsusingangular-CLIandserver_0.png
tag: Tech
originalTitle: "Building an Angular Application in various environments using angular-CLI and server."
link: "https://medium.com/yavar/building-an-angular-application-in-various-environments-using-angular-cli-and-server-18f94067154b"
isUpdated: true
---

이 블로그에서는 앵귤러 애플리케이션을 여러 환경에서 구축하는 방법을 설명합니다. 애플리케이션 및 서버 측에서 앵귤러-CLI 명령이 알려지지 않은 상태에서 작동합니다. 또한 앵귤러 애플리케이션에서 사용자 정의 터미널 명령을 사용하는 방법을 안내합니다.

![이미지](/assets/img/2024-06-22-BuildinganAngularApplicationinvariousenvironmentsusingangular-CLIandserver_0.png)

……… 여행용 엘리베이터 '앵귤러 애플리케이션'에 오신 것을 환영합니다………

안녕하세요, 저는 이 엘리베이터의 안내 도우미이며 효율적으로 사용할 수 있도록 안내하겠습니다. 이 엘리베이터는 평범하지 않은 것으로 다양한 혜택이 있다는 것을 상상할 수 없을 정도입니다. 예를 들어, 전력 없이 작동할 수 있는 엘리베이터를 상상해 본 적이 있나요? 그렇지 않다면, 이 짧은 여정에서 이 엘리베이터로 실제로 보여 드릴 수 있습니다. '여행용 엘리베이터'로 들어가봅시다!

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

한 가지 추가 정보, 이 엘리베이터는 각 층마다 멈출 것이며, 마지막으로는 옥상에 도착할 것입니다. 각 층을 차분히 방문할 수 있고, 옥상에 함께 오시는 분들을 위한 깜짝 선물이 준비되어 있어요!

![이미지](/assets/img/2024-06-22-BuildinganAngularApplicationinvariousenvironmentsusingangular-CLIandserver_1.png)

일반적인 엘리베이터와 마찬가지로, 엘리베이터는 버튼을 눌러 선택한 층에 내린다.

```js
ng build --configuration=environment_name
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

아래와 같이 qa(테스트), dev(개발), prod(운영)와 같이 세 가지 환경이 있다고 가정해보세요:

![img](/assets/img/2024-06-22-BuildinganAngularApplicationinvariousenvironmentsusingangular-CLIandserver_2.png)

만약 개발 환경을 빌드하고 싶다면, 아래 명령어를 실행해야 합니다:

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
ng build --configuration=development
```

![Building an Angular Application in various environments using Angular CLI and server](/assets/img/2024-06-22-BuildinganAngularApplicationinvariousenvironmentsusingangular-CLIandserver_3.png)

참고: 프로젝트 빌드의 구성(configuration) 아래 angular.json 파일에서 environment_name을 찾을 수 있습니다.

![Building an Angular Application in various environments using Angular CLI and server](/assets/img/2024-06-22-BuildinganAngularApplicationinvariousenvironmentsusingangular-CLIandserver_4.png)

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

<img src="/assets/img/2024-06-22-BuildinganAngularApplicationinvariousenvironmentsusingangular-CLIandserver_5.png" />

앞서 말했듯이, 이 엘리베이터에는 당신이 놀랄 만한 것들이 많이 있어요! 일반적인 엘리베이터는 층을 선택하지 않으면 움직이지 않지만, 어드벤처의 엘리베이터는 아무것도 선택하지 않아도 당신을 데려다 줄 수 있어요.

예시:

다음과 같이 각 환경에 대해 다양한 기본 URL을 설정했어요. 'ng build'를 실행하면, 앵귤러 버전 11을 사용하고 있기 때문에 애플리케이션은 개발 환경 URL을 기본값으로 사용할 거에요.

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

![이미지](/assets/img/2024-06-22-BuildinganAngularApplicationinvariousenvironmentsusingangular-CLIandserver_6.png)

이후 버전(버전 12 이상)의 angular.json 파일에서 "defaultConfiguration" 설정을 아래와 같이 찾을 수 있습니다:

![이미지](/assets/img/2024-06-22-BuildinganAngularApplicationinvariousenvironmentsusingangular-CLIandserver_7.png)

![이미지](/assets/img/2024-06-22-BuildinganAngularApplicationinvariousenvironmentsusingangular-CLIandserver_8.png)

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

오! 오! 엘리베이터에서 전원이 나갔어요.

걱정 마세요. 특별한 엘리베이터이니까요. 우리에게 대안 버튼이 있어요. 그걸 사용할 시간이군요.

```js
npm run build
```

![이미지](/assets/img/2024-06-22-BuildinganAngularApplicationinvariousenvironmentsusingangular-CLIandserver_9.png)

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

그럼, 이제 대체 버튼을 눌러 엘리베이터를 전원 없이 작동시킬 거야.

![이미지1](/assets/img/2024-06-22-BuildinganAngularApplicationinvariousenvironmentsusingangular-CLIandserver_10.png)

내가 버튼을 누를 때 소리가 들렸나요?

![이미지2](/assets/img/2024-06-22-BuildinganAngularApplicationinvariousenvironmentsusingangular-CLIandserver_11.png)

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

<img src="/assets/img/2024-06-22-BuildinganAngularApplicationinvariousenvironmentsusingangular-CLIandserver_12.png" />

이것은 전원이 없어도 엘리베이터를 제어하는 도구 상자입니다.

## 예시:

만약 "npm run test"를 실행한다면, "test"에 대한 명령어인 "ng test"가 실행될 것입니다.

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

<img src="/assets/img/2024-06-22-BuildinganAngularApplicationinvariousenvironmentsusingangular-CLIandserver_13.png" />

우리는 원하는 층으로 가고 싶을 때 원하는 버튼을 누르면 전원이 없어도 갈 수 있어요.

```js
npm run build -- --configuration environment_name OR
npm run build -- --c environment_name
```

## 예시:

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

만약 서버를 통해 "qa" 테스트 환경을 구축해야 한다면 아래와 같이 명령을 지정해야 합니다:

```js
npm run build -- --c qa
```

![이미지1](/assets/img/2024-06-22-BuildinganAngularApplicationinvariousenvironmentsusingangular-CLIandserver_14.png)

![이미지2](/assets/img/2024-06-22-BuildinganAngularApplicationinvariousenvironmentsusingangular-CLIandserver_15.png)

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

그 테이블 태그를 마크다운 형식으로 바꿀 수 있어요.

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

![image](/assets/img/2024-06-22-BuildinganAngularApplicationinvariousenvironmentsusingangular-CLIandserver_16.png)

잼난 거는 됐어요, 이걸 여러 환경에서 사용할 때 유용하죠. 아래와 같이 스크립트 안에 우리만의 명령을 지정할 수 있어요:

## 예시: 2 → 서버 사이드 빌드를 위한 사용자 정의 명령어 정의:

만약 터미널 명령어로 서버 측에서 애플리케이션을 빌드하고 싶다면, 아래처럼 설정할 수 있어요:

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

<img src="/assets/img/2024-06-22-BuildinganAngularApplicationinvariousenvironmentsusingangular-CLIandserver_17.png" />

마침내, 우리 모두가 사랑하는 옥상에 도착했습니다. 이미 이곳으로 함께 여행한 분들을 위한 놀라운 이벤트가 있다고 말씀드렸었죠. 저희처럼 여러분도 이 옥상을 사랑할 거라고 믿습니다.

여기 모험의 엘리베이터를 여러분 집으로 드리겠습니다 👇. 이번 여정에 대한 의견을 공유해주시기를 부탁드려요. 모험가 같은 여정 되세요 🥳.

→→→→→→→→→→ 극한으로 스킬을 끌어올리세요 ←←←←←←←←←←
