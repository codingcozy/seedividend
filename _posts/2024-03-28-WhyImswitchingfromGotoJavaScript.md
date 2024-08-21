---
title: "Go대신 JavaScript를 사용해야하는 이유"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Why Im switching from Go to JavaScript"
link: "https://medium.com/@treeder/why-im-switching-from-go-to-javascript-52f2e23a1bd8"
isUpdated: true
---

13년 동안 Go 코드를 작성한 후에, 마침내 다음 단계로 나아가려 합니다.

Go는 훌륭한 언어이며, 그동안 함께 일하는 것을 정말 즐겼어요. 오랜 기간 동안 API 및 서버 측 코드를 작성하는 데 주로 사용했던 언어였지만, 최근 자바스크립트로 프런트엔드 코드를 더 많이 작성하며 그 언어를 좋아하기 시작했어요. 10년 전에 자바스크립트는 정말 g화니 개굴개굴한 언어였죠. 예전에는 항상 놀렸었고, 나뿐만이 아니었는데요. 그러나 그때부터 많이 발전해왔고, 지금은 정말 꽤 괜찮은 언어가 된 것 같아요.

정확히 11년 전에 루비에서 Go로 전환하는 과정에 대해 작성했었는데, 따라서 관심을 유지하기 위해 약 10년마다 좋은 언어를 전환해야 하는 것 같아요.

# Go와 함께 한 시간에 대한 배경화면

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

이전 회사는 구글 이외의 최초의 제품으로 Go를 사용한 회사 중 하나였고, 그것으로 인해 엄청난 성과를 거두었습니다. 저희 회사는 클라우드 인프라 제공업체였고, Go 위에 비즈니스를 구축했습니다. 그 당시에 우리가 건설하던 것에는 매우 적합했고, 중요한 미션을 갖는 클라우드 인프라를 구축할 때 아마도 여전히 Go를 사용하겠죠. 하지만 지금은 그렇지 않습니다.

Go 초창기에는 재미와 흥미가 넘쳤습니다. 새로운 클라우드 서비스 시대였기에 모두 Go를 사용하는 것 같았죠. 이것은 아마존 EC2 출시 직후, 다양한 새로운 클라우드 서비스들이 나타나던 시기였습니다.

Go와 함께한 몇 가지 하이라이트:

- 우리는 Go 개발자를 위한 채용 공고를 게시한 최초의 회사였습니다. Go 1.0 이전에도 개발자를 모집했습니다.
- 우리는 Go 사용에 대해 매우 공개적이었고, 다양한 미팅 및 컨퍼런스에서 이에 대해 발표했습니다.
- Go와 우리의 경험에 대해 많은 글을 썼습니다.
- 우리는 5~6년 동안 GoSF 미팅을 개최했습니다. 이를 Facebook HQ, Google HQ, Salesforce HQ 등 여러 회사에서 진행했습니다.
- 저희가 Rackspace에서 개최한 GoSF 미팅에서 Go로 작성된 Docker가 출시되는 것을 목격했습니다.
- 작은 Go 컨퍼런스인 GopherFest를 시작했습니다.

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

아마도 더 있을 수 있지만, 이런 것들이 떠오릅니다.

# Go 대신 JavaScript 선택한 이유

이제 전환을 하는 이유에 대해 살펴보겠습니다:

## 성능은 충분히 좋습니다

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

새로운 런타임을 사용하면 대부분의 사용 사례에 대해 성능이 충분히 좋습니다.

성능을 개선해야 할 필요가 있을 때는 특정 엔드포인트를 고로 변경할 수도 있겠네요.

## 어디서나 작동

당연히 모든 VM 또는 컨테이너화된 서비스에서 실행할 수 있지만, 클라우드플레어 워커, Vercel, 아마존 LLRT 및 기타 현대적인 클라우드 서비스에서도 JavaScript를 엣지에서 실행할 수 있습니다. 이러한 옵션을 가질 수 있다는 것은 큰 장점입니다.

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

## 프론트엔드와 백엔드 간 코드 공유

백엔드와 프론트엔드 양쪽에 같은 언어가 있는 것은 실제로 상당한 혜택입니다. 라이브러리와 코드를 둘 사이에서 공유할 수 있어요.

## 마스터해야 할 언어 하나

위와 마찬가지로, 두 가지 언어를 마스터할 필요가 없어요. 하나만 잘 다루면 돼요.

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

## 개발자 찾기가 더 쉬워졌어요

그냥 얘길 해보자면, 누구나 JavaScript 개발자이지만, 누구나 Go 개발자는 아니에요.

## 최근 몇 년 동안 JavaScript는 훨씬 더 나은 언어가 되었어요

async/await와 ES 모듈 덕분에 JavaScript는 정말 멀리 왔어요. 더 이상 말도 안 되는 언어가 아니에요. 함께 작업하기 좋은 언어가 되었어요.

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

## 컴파일/빌드 시간이 제로에요

Go언어는 어떤 부분을 수정할 때마다 몇 초씩 소요되어 다시 컴파일을 해야 해요. 반면 JavaScript는 소요 시간이 0초에요.

저는 React와 같은 프레임워크를 사용하지 않아요, TypeScript도 사용하지 않아요. 모듈을 지원하는 라이브러리만 사용해서 실제로 빌드 시간이 전혀 걸리지 않아요. 그냥 실행하면 돼요.

React와 같은 큰 프레임워크를 사용하게 되면 빌드 시간이 상당히 길어질 수 있어요. 개발 과정에서는 괜찮지만, 프로덕션 환경으로 빌드할 때는 매우 오랜 시간이 걸릴 수 있어요.

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

## 15초 배포

진지해요:

![이미지](/assets/img/WhyImswitchingfromGotoJavaScript_0.png)

빌드 단계나 컨테이너를 만들 필요가 없기 때문에 배포는 코드를 업로드하는 것밖에 안 해도 돼요.

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

그리고 마지막으로, 하지만 가장 중요한 것은:

## 나는 훨씬 생산적이에요

가장 중요한 것을 마지막에 남겨 놓은 이유는 아마도 이것이 가장 중요하다고 생각하기 때문입니다. 빠르게 개발할 수 있어요, 정말 빠르게요.

10년 전에는 그렇지 않았어요. 자바스크립트는 정말 최악이었습니다. 그러나 async/await, ES 모듈, 쉽게 공유 가능한 코드, 언어의 유연성 등을 사용하여 빠르게 코드를 작성할 수 있습니다.

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
