---
title: "Nodejs를 사용한 서버 측 렌더링 운영화"
description: ""
coverImage: "/assets/img/2024-06-19-OperationalizingNodejsforServerSideRendering_0.png"
date: 2024-06-19 23:08
ogImage:
  url: /assets/img/2024-06-19-OperationalizingNodejsforServerSideRendering_0.png
tag: Tech
originalTitle: "Operationalizing Node.js for Server Side Rendering"
link: "https://medium.com/airbnb-engineering/operationalizing-node-js-for-server-side-rendering-c5ba718acfc9"
isUpdated: true
---

## Airbnb이 서버 측 렌더링을 중심으로 Frontend를 더 많이 구축함에 따라, 서버 구성을 최적화하는 방법을 살펴보았습니다.

Airbnb에서는 몇 년 동안 Frontend 코드를 일관된 아키텍처로 이주시켜 왔습니다. 전체 웹 페이지가 API에서 제공하는 데이터를 활용하여 React 구성 요소의 계층 구조로 작성되었습니다. Ruby on Rails가 브라우저로 웹을 가져오는 방식에서의 역할은 매일 줄어들고 있습니다. 사실, 곧 우리는 노드.js로 완전한 형태의 서버 렌더링 웹 페이지를 제공할 새로운 서비스로 이행할 것입니다. 이 서비스는 모든 Airbnb 제품의 대부분의 HTML을 렌더링할 것입니다. 이 렌더링 엔진은 우리가 실행하는 대부분의 백엔드 서비스와는 다르며, 루비나 자바로 작성되지 않았음을 특징으로 합니다. 그러나 이 렌더링 엔진은 우리가 생각하는 일반적인 I/O 집중적인 노드.js 서비스와도 다릅니다.

노드.js를 떠올렸을 때, 여러분은 고도로 비동기식인 애플리케이션이 효율적으로 수백 또는 수천 개의 연결을 동시에 처리하는 모습을 상상합니다. 서비스는 동네 곳곳에서 데이터를 가져와 상당히 가볍게 처리하여 많은 클라이언트가 사용할 수 있도록 만듭니다. 아마도 여러분은 수많은 오랜 기간 유지되는 WebSocket 연결을 처리하고 있습니다. 여러분은 이 잘 튠된 경량 동시성 모델로 업무에 완벽히 적합하다는 점에 만족하고 확신하고 있습니다.

서버 측 렌더링(SSR)은 이러한 상상을 일부 깨는 연산 집약적인 작업입니다. 노드.js에서 사용자 코드는 단일 스레드에서 실행되므로 연산 작업(즉, I/O가 아닌 작업)의 경우 동시에 실행할 수 있지만 병렬로 실행할 수는 없습니다. 노드.js는 많은 양의 비동기 I/O를 병렬로 처리할 수 있지만 연산에 한계가 있습니다. 요청의 연산 부분이 I/O에 상대적으로 더 많아질수록 동시 요청은 CPU 경합으로 인해 지연에 미치는 영향이 증가할 것입니다¹.

Promise.all([fn1, fn2])를 고려해보세요. fn1 또는 fn2가 I/O에 의해 해결되는 promise이면 이와 같이 병렬성을 달성할 수 있습니다.

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

만약 fn1과 fn2이 연산되면, 대신 이렇게 실행될 것입니다:

![OperationalizingNodejsforServerSideRendering_1](/assets/img/2024-06-19-OperationalizingNodejsforServerSideRendering_1.png)

두 작업 중 하나가 완료될 때까지 다른 하나는 기다려야 합니다. 왜냐하면 실행 스레드가 하나뿐이기 때문입니다.

서버 측 렌더링에서는 서버 프로세스가 여러 동시 요청을 처리할 때 이 문제가 발생합니다. 동시 요청이 처리 중인 다른 요청들에 의해 지연될 수 있습니다.

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

![이미지](/assets/img/2024-06-19-OperationalizingNodejsforServerSideRendering_2.png)

현실에서는 요청이 여러 가지 다른 비동기 단계로 구성되는 경우가 많습니다. 심지어 대부분이 계산에 대한 경우라도요. 이는 더 나쁜 교차 결과로 이어질 수 있습니다. renderPromise().then(out => formatResponsePromise(out)).then(body => res.send(body))와 같은 체인으로 요청이 구성된 경우, 다음과 같은 요청 교차가 발생할 수 있습니다.

![이미지](/assets/img/2024-06-19-OperationalizingNodejsforServerSideRendering_3.png)

이 경우, 두 요청 모두 두 배로 오래 걸릴 수 있습니다. 이 문제는 동시성이 증가함에 따라 심각해집니다.

게다가 SSR의 일반적인 목표 중 하나는 클라이언트와 서버 모두에서 동일하거나 유사한 코드를 사용할 수 있어야 한다는 것입니다. 이러한 환경 간의 큰 차이점 중 하나는 클라이언트 컨텍스트가 본질적으로 단일 테넌트인 반면 서버 컨텍스트는 다중 테넌트입니다. 클라이언트 측에서 쉽게 작동하는 싱글톤이나 다른 전역 상태와 같은 기법은 서버에서 동시 요청 부하하에 대해 버그, 데이터 누출 및 일반적인 혼돈을 초래할 수 있습니다.

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

이 문제들은 병행성이 발생할 때만 문제가 됩니다. 낮은 부하 수준이거나 개발 환경의 독점적인 단일 테넌시에서는 대부분 잘 작동합니다.

이는 노드 애플리케이션의 전형적인 예제들과 매우 다른 상황을 초래합니다. 우리는 JavaScript 런타임을 사용하여 라이브러리 지원과 브라우저의 특성을 활용하기 위해 사용하고 있습니다. 병행성 모델 대신 이러한 애플리케이션에서는 비동기 병행성 모델이 그 모든 비용을 부과하지만 그 혜택은 별로 없거나 거의 없습니다.

# Hypernova에서 배운 점

저희의 새로운 렌더링 서비스인 Hyperloop은 Airbnb 웹 사이트 이용자가 상호 작용하는 주요 서비스가 될 것입니다. 따라서 그 신뢰성과 성능은 사용자 경험에 절대적으로 중요합니다. 새 서비스로의 프로덕션 전환에 따라 이제는 사전 SSR 서비스인 Hypernova에서 배운 교훈을 통합하고 있습니다.

Hypernova는 새 서비스와 다르게 작동합니다. 그것은 순수한 렌더러입니다. 우리의 레일즈 단일체 Monorail에서 호출되고, 특정 렌더링된 컴포넌트에 대한 HTML 조각만 반환합니다. 대부분의 경우 "조각"은 페이지의 대부분이며, 레일즈는 단지 바깥 쪽 레이아웃만 제공합니다. 레거시의 경우, 페이지의 구성 요소를 ERB를 사용하여 연결할 수 있습니다. 그러나 어느 경우든 Hypernova는 데이터를 자체로 가져오지 않습니다. 데이터는 레일즈에서 제공됩니다.

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

위에서 언급한대로, Hyperloop과 Hypernova는 컴퓨트에 관한 유사한 운영 특성을 공유합니다. 실제 트래픽을 처리하는 서비스로, Hypernova는 그 대체품이 프로덕션 환경에서 어떻게 동작할지 이해하는 데 좋은 테스트 대상을 제공합니다.

![이미지](/assets/img/2024-06-19-OperationalizingNodejsforServerSideRendering_4.png)

사용자로부터 요청이 주요 Rails 앱 Monorail에 들어오며, Monorail은 React 컴포넌트를 해당 페이지에 렌더링하고자 하는 속성을 조합하고 해당 속성과 컴포넌트 이름을 Hypernova에 요청합니다. Hypernova는 속성과 함께 컴포넌트를 렌더링하여 Monorail로 반환할 HTML을 생성하고, Monorail은 페이지 템플릿에 내장시키고 전체를 클라이언트에게 되돌려보냅니다.

![이미지](/assets/img/2024-06-19-OperationalizingNodejsforServerSideRendering_5.png)

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

렌더링 중 실패(오류 또는 타임아웃으로 인한) 발생 시, 하이퍼노바 렌더링의 대체 방법은 렌더링된 HTML 없이 페이지에 구성 요소와 해당 속성을 삽입하는 것입니다. 이렇게 함으로써 클라이언트 렌더링이 성공적으로 수행될 수 있습니다. 이로 인해 하이퍼노바를 선택적 종속성으로 간주하고, 일부 타임아웃과 실패를 허용할 수 있게 되었습니다. 호출에 대한 타임아웃 시간은 서비스의 관찰된 p95 값과 유사하게 설정되었습니다. 기본적으로 5% 미만의 타임아웃이 발생하는 것이 예상대로였습니다.

최대 일일 트래픽로드 배포 중에는 모노레일에서 하이퍼노바에 대한 요청 중 최대 40%가 타임아웃되는 경우가 발생했습니다. 하이퍼노바로부터 배포 중 BadRequestError: Request aborted의 오류율이 증가하는 것을 보았습니다. 이러한 오류는 다른 모든 응용 프로그램/코딩 오류를 효과적으로 숨겨버리는 상당한 기준 오류율 또한 존재했습니다.

이러한 동작은 선택적 종속성으로, 높은 우선순위가 아닌 번거로움으로 여겨졌습니다. 저희는 타임아웃 및 오류를 초기 GC가 비용이 많이 드는 초기 시작 동작, JIT 부족, 캐시 채움, 빗물과 같은 요소의 예상으로 충분히 설명할 수 있다고 합리적으로 생각했습니다. React 또는 Node의 새로운 릴리스가 느린 시작을 완화하기 위한 충분한 성능 개선을 제공할 것을 희망했습니다.

이는 배포 중에 나쁜 로드 밸런싱이나 용량 문제로 인한 확실한 결과로 의심되어질 수 있습니다. 동일한 프로세스에서 거의 100%의 계산 요청을 동시에 처리함으로써 늘어난 대기 시간을 볼 수 있었고, 여러 요청이 한 번에 실행되는 경우가 있을 때에는 해당하는 프로세스에서 동시에 처리된 요청 수를 로그하는 미들웨어를 추가했습니다.

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

우리는 실제로 CPU 사용을 기다리는 동시 요청 때문에 발생한 지연을 시작 지연으로 원망했습니다. 우리의 성능 지표에서 다른 실행 중인 요청 때문에 실행을 대기하는 시간은 요청을 실행하는 데 소비된 시간과 구별할 수 없습니다. 이는 동시성으로 인한 지연이 개별 요청의 비용을 실제로 증가시키는 새로운 코드 경로 또는 기능에서 발생하는 지연과 동일하게 나타날 것이라는 것을 의미합니다.

또한 BadRequestError: Request aborted 오류가 일반적인 느린 시작 성능으로 충분히 설명되지 않는다는 사실이 점점 더 분명해지고 있었습니다. 이 오류는 body parser에서 발생하며 특히 클라이언트가 서버가 요청 본문을 완전히 읽기 전에 요청을 중단한 경우에 발생합니다. 클라이언트가 포기하고 연결을 끊어가면 우리가 처리를 계속하기 위해 필요한 소중한 데이터를 가져가는데, 개별 요청의 비용을 증가시키는 것이 실제로 더 가능성이 높습니다.

Hypernova의 요청 페이로드도 평균적으로 수백 킬로바이트로 상당히 크기 때문에 이 문제가 더 복잡해집니다.

<img src="/assets/img/2024-06-19-OperationalizingNodejsforServerSideRendering_7.png" />

우리는 이 문제를 해결하기 위해 우리에게 많은 양의 운영 경험을 제공하는 두 가지 외부 구성 요소를 사용하기로 결정했습니다: 역방향 프록시(nginx) 및 로드 밸런서(haproxy).

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

# Reverse Proxying 및 로드 밸런싱

우리의 하이퍼노바 인스턴스에 존재하는 여러 CPU 코어를 활용하기 위해 노드.js 클러스터 모듈을 통해 여러 하이퍼노바 프로세스를 실행합니다. 이러한 프로세스들은 독립적이기 때문에 동시 요청을 병렬로 처리할 수 있습니다.

![image](/assets/img/2024-06-19-OperationalizingNodejsforServerSideRendering_8.png)

여기서 문제는 각 노드 프로세스가 요청이 완료될 때까지 효과적으로 점유되며, 이는 클라이언트(모노레일)로부터 요청 본문을 읽는 작업을 포함합니다. 하나의 프로세스에서 병렬로 여러 요청을 읽을 수는 있지만, 이는 작업을 렌더링할 때 연산이 교차되는 문제로 이어집니다. 노드 프로세스의 이용률은 클라이언트 및 네트워크의 속도에 결합됩니다.

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

솔루션은 클라이언트와의 통신을 처리하기 위해 버퍼링 리버스 프록시를 사용하는 것입니다. 이를 위해 nginx를 사용합니다. Nginx는 클라이언트로부터의 요청을 버퍼에 읽고, 완전히 읽힌 후에만 전체 요청을 노드 서버에 전달합니다. 이 전송은 머신 내에서 루프백 또는 유닉스 도메인 소켓을 통해 이루어지며 이는 머신 간 통신보다 빠르고 안정적입니다.

![image](/assets/img/2024-06-19-OperationalizingNodejsforServerSideRendering_9.png)

nginx가 요청을 읽는 작업을 처리하면, 노드 프로세스의 사용률을 높일 수 있습니다.

![image](/assets/img/2024-06-19-OperationalizingNodejsforServerSideRendering_10.png)

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

우리는 몇 가지 요청을 처리하기 위해 nginx를 사용하여 Node.js 프로세스로 직행할 필요 없이 처리합니다. 우리의 서비스 검색 및 라우팅 레이어는 호스트 간의 연결 상태를 확인하기 위해 낮은 비용의 /ping 요청을 사용합니다. 이를 nginx에서 완전히 처리함으로써 Node.js 프로세스로의 (비록 저렴하지만) 상당한 처리량 출처를 제거합니다.

다음은 부하 분산입니다. 어떤 Node.js 프로세스가 어떤 요청을 받아야 하는지에 대한 스마트한 결정을 내려야 합니다. 클러스터 모듈은 라운드 로빈 방식으로 요청을 분배합니다. 각 프로세스는 차례로 요청을 받습니다. 라운드 로빈은 요청 지연 시간에 큰 변동이 없을 때 훌륭합니다. 그림 1을 참고하세요.

다루는 시간이 극명하게 다른 다양한 유형의 요청이 있는 경우 라운드 로빈은 좋지 않습니다. 프로세스의 후속 요청은 이전 요청이 모두 완료될 때까지 기다려야 합니다. 이에 대처할 수 있는 또 다른 처리 용량이 있는 다른 프로세스가 있더라도요.

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

![데이터](/assets/img/2024-06-19-OperationalizingNodejsforServerSideRendering_12.png)

이 요청의 더 나은 분배 방식은 다음과 같습니다:

![데이터](/assets/img/2024-06-19-OperationalizingNodejsforServerSideRendering_13.png)

대기 시간을 최소화하고 응답을 빠르게 반환할 수 있습니다.

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

이 작업은 요청을 대기열에 유지하고 프로세스가 다른 요청으로 쓰여지지 않게 될 때에만 해당 요청을 프로세스에 할당하여 달성할 수 있습니다. 이를 위해 우리는 haproxy를 사용합니다.

![이미지](/assets/img/2024-06-19-OperationalizingNodejsforServerSideRendering_14.png)

이를 Hypernova에 적용하면 배포시에 타임아웃 스파이크와 BadRequestErrors가 완전히 제거되었습니다. 동시 요청은 정상 작동 중에 높은 백분위 지연의 주요 원인이기도 했기 때문에 이로 인해 그 지연도 감소하였습니다. 이러한 결과 중 하나는 구성된 타임아웃이 같더라도 타임아웃 비율이 5%에서 2%로 줄어든 것입니다. 40%의 배포 실패에서 2%로 감소한다는 것은 승리 같은 느낌입니다. 오늘날 사용자들은 로딩 화면이 훨씬 덜 나타납니다. 내일은 Hypernova의 오류 대비 기능이 없는 새 랜더러를 위해 우리에게 매우 중요한 배포를 통한 안정성이 될 것입니다.

# 자세한 내용과 설정

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

이 설정을 위해 nginx, haproxy 및 우리 노드 애플리케이션을 구성해야 합니다. 이 설정을 이해하는 데 사용할 수 있는 nginx 및 haproxy 구성이 포함된 샘플 노드 앱을 준비했습니다. 이러한 구성은 우리가 프로덕션 환경에서 실행하는 것을 기반으로 하지만, 단순화되고 비특권 사용자로 전경에서 실행되도록 수정되었습니다. 프로덕션 환경에서는 모든 것을 프로세스 감독자(저희는 runit 또는 점점 더 많이 사용하는 kubernetes를 사용합니다)로 구성해야 합니다.

Nginx 구성은 매우 표준적이며, 포트 9000에서 듣는 서버를 구성하여 요청을 포트 9001(저희 환경에서는 Unix 도메인 소켓을 사용)에 듣는 haproxy로 프록시하는 것입니다. 또한 /ping 엔드포인트를 가로채서 연결성 확인을 직접 제공합니다. 내부 표준 nginx 구성과의 차이점은 worker_processes를 1로 줄였다는 것인데, 단일 nginx 프로세스가 단일 haproxy 프로세스와 노드 애플리케이션을 충분히 포화시키기 때문입니다. 또한 hypernova를 위한 컴포넌트의 속성으로 큰 요청 및 응답 버퍼를 사용하고 있습니다(수백 킬로바이트 단위). 자신의 요청/응답 크기에 기반하여 버퍼 크기를 조정해야 합니다.

Node의 클러스터 모듈은 로드 밸런싱과 프로세스 생성을 모두 처리합니다. 로드 밸런싱을 위해 HAProxy로 전환하려면 클러스터의 프로세스 관리 부분을 대체해야 했습니다. 이는 worker 프로세스 풀을 유지하는 데에 대해 클러스터보다 약간 더 의견을 갖추는 pool-hall로 구성되었는데, 로드 밸런싱 게임과는 완전히 무관합니다. 예제 앱은 pool-hall을 사용하여 다른 포트에서 듣는 네 개의 worker 프로세스를 시작하는 방법을 보여줍니다.

HAProxy 구성은 포트 9001에서 듣는 프록시를 구성하여 포트 9002에서 9005까지 듣는 네 개의 worker로 트래픽을 라우팅합니다. 각각의 worker에 대해 가장 중요한 설정은 maxconn 1 입니다. 이는 각 worker가 한 번에 하나의 요청을 처리하도록 제한합니다. 이는 HAProxy 통계 페이지(포트 8999에서 실행하도록 구성됨)에서 확인할 수 있습니다.

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

![HAProxy Configuration](/assets/img/2024-06-19-OperationalizingNodejsforServerSideRendering_15.png)

안녕하세요!

HAProxy는 각 워커와의 현재 열린 연결 수를 추적합니다. maxconn을 통해 구성된 제한이 있습니다. 라우팅은 static-rr (정적 라운드 로빈)으로 설정되어 있어 일반적으로 각 워커에게 순서대로 요청이 제공됩니다. 제한이 설정된 경우 라우팅은 라운드 로빈으로 진행되지만 현재 요청 제한에 도달한 워커는 건너뛰게 됩니다. 연결 제한 이하의 워커가 없는 경우 요청은 대기열에 들어가며 가장 먼저 사용 가능해진 워커에게 배달됩니다. 이것이 우리가 원하는 동작입니다.

이 구성은 아마도 사용하려는 것과 매우 가까운 것일 것입니다. 여기에는 다른 흥미로운 설정(그리고 필요한 복사 붙여넣기)이 있습니다. 이 구성을 준비하는 일안하며, 우리는 일반적이고 이상적인 상황에서 여러 테스트를 수행하고 그에 기반하여 구성 값을 유도했습니다. 이는 깊이 들어가는 내용으로서 설정을 사용하는 데까지 꼭 이해할 필요는 없지만, 다음 섹션에서 제공됩니다.

# HAProxy 심층 분석

HAProxy 구성이 우리가 원하는 대로 정확히 작동하는 것에 많은 것이 달려 있었습니다. 동시 요청 제한 또는 대기열매 확인되지 않았다면 잘못된 것입니다. 또한 각종 종류의 실패가 어떻게 처리되는지(또는 처리되지 않는지)를 이해하는 것이 중요했습니다. 현재 클러스터 설정에 대한 적합한 대체물인지 확인할 필요가 있었습니다. 이를 확인하기 위해 여러 테스트를 수행했습니다.

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

테스트의 일반적인 형태는 Apache Benchmark을 사용하여 다양한 동시성 수준에서 10,000개의 요청을 실행하는 것이었습니다.

```js
ab -l -c <CONCURRENCY> -n 10000 http://<HOSTNAME>:9000/render
```

저희 설정에서는 예시 앱의 4개 대신 15개의 워커를 사용했고, 벤치마킹 및 시스템 테스트 간 간섭을 피하기 위해 앱을 실행하는 인스턴스와 별도 인스턴스에서 ab를 실행했습니다. 저희는 낮은 부하 (동시성=5), 높은 부하 (동시성=13), 대기 부하 (동시성=20)에서 테스트를 실행했습니다. 대기 부하를 통해 haproxy가 항상 대기열을 처리하도록 했습니다.

첫 번째 테스트 세트는 그저 정상 작동을 확인하는 것이었고, 다음 테스트 세트는 배포 중 발생할 수 있는 모든 프로세스의 우아한 재시작을 확인하였습니다. 마지막 테스트 세트는 제가 일부 프로세스를 무작위로 종료하는 시나리오를 확인하는 것이었습니다. 이는 발생하지 않은 예외가 프로세스를 비정상적으로 종료시키는 상황을 시뮬레이션한 것입니다.

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

애플리케이션 코드에서 무한 루프가 별도로 문제가 되었기 때문에 무한 루프가 포함된 엔드포인트에 대해 단일 요청을 실행했습니다.

이러한 테스트는 우리의 구성 및 작동 방식을 이해하는 데 도움이 되었습니다.

일반 작업에서 maxconn 1은 한 번에 하나의 요청을 처리하도록 각 프로세스를 제한하는 대로 정확히 기대했던 대로 작동했습니다. 백엔드에는 HTTP 또는 TCP 헬스체크를 구성하지 않았습니다. 이는 혼란을 야기하고 가치가 없다는 것을 발견했기 때문입니다. 헬스체크는 maxconn을 존중하지 않는 것으로 보입니다. 그러나 코드에서 이를 확인한 적은 없습니다. 우리의 예상 동작은 프로세스가 건강하고 서비스를 제공할 수 있는지 여부이거나 리스닝 중이지 않아 즉시 연결 오류를 발생시킬 것임을 의미합니다 (이에는 한 가지 주요 예외가 있습니다). 우리는 이러한 헬스체크를 우리 사례에 유용할 정도로 충분히 제어 가능하지 않아서 다른 헬스체킹 regime의 예측 불가능성을 피하기로 결정했습니다.

연결 오류는 다룰 수 있는 문제입니다. 우리는 옵션 redispatch 및 retries 3을 설정하여 연결 오류를 수신하는 요청을 더 협조적인 다른 백엔드로 전달할 수 있게 했습니다. 연결이 거부되면 즉시 오류가 발생하여 우리는 비즈니스를 계속할 수 있습니다.

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

거부된 연결에만 적용됩니다. 지금은 수신 대기 중이 아니라는 이유로 연결이 거부됩니다. 로컬 네트워크를 다루고 있기 때문에 연결 제한 시간은 별로 유용하지 않습니다. 무한 루프에 갇힌 워커를 방지하기 위해 낮은 연결 제한 시간을 설정할 수 있을 것으로 예상했습니다. 100밀리초의 타임아웃을 설정했을 때, 이벤트 루프로 제어가 되돌아가지 않았음에도 클라이언트/서버에서 설정된 10초 타임아웃 후에 우리 요청이 타임아웃되는 것에 놀랐습니다. 이는 커널이 서버가 수락하기 전에 클라이언트 관점에서 연결을 설정하는 것을 처리하기 때문에 발생합니다.

주목할 만한 점으로, 백로그를 설정하여도 백로그 길이는 서버가 SYN-ACK에 응답한 후에 평가되어 연결이 설정되지 않는 것으로 결과되지 않습니다 (실제로는 서버가 클라이언트에서 돌아온 ACK 응답을 놓는 것을 구현/처리). 이로 인해 연결이 설정된 요청은 백엔드가 해당 요청을 처리했는지 여부를 판단할 수 있는 방법이 없기 때문에 다시 보내거나 다시 시도할 수 없습니다.

또 다른 흥미로운 결과로, 무한 계산 루프에 갇힌 프로세스에서 수행한 테스트에서 클라이언트/서버 타임아웃은 예상치 못한 동작을 허용합니다. 무한 루프에 빠지게 하는 프로세스로 요청을 보낼 때, 백엔드의 연결 개수가 1로 설정됩니다. maxconn의 경우에는 우리가 원하는대로 작동하여 다른 요청이 연결될 수 없게 합니다. 클라이언트/서버 타임아웃이 만료되면 연결 개수가 다시 0으로 감소되며, 요청처리가 성공했는지 여부를 알 수 없어 우리의 1대1 보장이 위반되고 이전 요청은 실패로 이끌게 됩니다. 클라이언트가 타임아웃이나 변덕 때문에 연결을 닫을 때, 연결 개수는 영향을 받지 않고 라우팅은 계속해서 작동합니다. abortonclose를 설정하면 클라이언트가 닫는 즉시 연결 개수가 감소됩니다. 이에 따라 최선의 조치는 이러한 타임아웃에 높은 값을 설정하고 abortonclose를 해제하는 것입니다. 더 강력한 타임아웃은 클라이언트 또는 nginx 측에서 설정할 수 있습니다.

또한 고부하 사례에서 적용되는 상당히 불편한 매력 요소를 발견했습니다. 만약 서버가 안정적인 대기열을 갖고 있는 상태에서 워커 프로세스가 충돌한다면 (이는 매우 드문 경우여야 합니다), 요청은 해당 백엔드에서 시도될 것이지만 프로세스가 수신 대기 중이기 때문에 연결에 실패합니다. 그럼 HAProxy는 그 후 다음 열린 연결 슬롯을 가진 다음 백엔드로 다시 배분하지만, 실제로 작업 중인 다른 백엔드는 없기 때문에 실패했던 이전 백엔드만 다시 시도됩니다. 이렇게 되면 재시도가 빠르게 소모되어 연결 오류가 HTML 렌더링보다 더 빠르게 발생하여 실패한 요청으로 이어집니다. 이 과정은 대기열이 완전히 소진될 때까지 나머지 요청에 계속 반복됩니다. 이는 좋지 않은 상황이지만, 프로세스 충돌이 드문 데에, 지속적인 대기열이 드문 데에 (계속해서 대기 중이면 공급이 부족한 것입니다) 그리고 특정한 경우에는 서비스 검색의 건강 검사를 빠르게 마킹하므로 전체 인스턴스를 건강하지 않게 표시하고 새 요청을 처리할 수 없게 만듭니다. 이는 좋지 않지만 위험을 최소화합니다. 미래의 작업은 HAProxy 통합을 통해 이를 해결할 수 있으며, 감독자 프로세스가 프로세스의 종료를 감지하고 haproxy stats 소켓을 통해 MAINT로 표시할 수 있는 깊은 HAProxy 통합을 통해 처리할 수 있을 것입니다.

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

다른 변경 사항 중 하나는 Node에서 server.close가 기존 요청이 완료될 때까지 기다리지만 HAProxy 대기열에 있는 것은 서버가 아직 받지 않은 요청을 기다릴지 모르기 때문에 실패할 것입니다. 인스턴스가 요청을 받지 않는 시간과 서버 재시작 프로세스를 시작하는 시간 사이에 충분한 드레인 시간을 보장하는 것이 대부분의 경우 이 문제를 해결해야 합니다.

또한, 대부분의 트래픽을 처음에 사용 가능한 워커에 지시하는 'balance first'를 설정하면 (기본적으로 worker1을 포화시키는) 앱의 지연 시간이 'balance static-rr'보다 15% 감소했습니다. 이 효과는 합성 및 프로덕션 로드에서 지속되었으며, 웜 업으로 쉽게 설명되지 않는 결과였습니다. 이는 배포 후 몇 시간 동안 지속되었습니다. 성능은 시간이 지남에 따라 (12시간 동안) 점점 악화되었지만, 아마도 핫 프로세스의 메모리 누수 때문이었을 것입니다. 또한, 차가운 프로세스가 매우 차가웠기 때문에 트래픽의 급증에는 적응이 덜했습니다. 이에 대한 좋은 설명을 아직 찾지 못했습니다.

마지막으로, Node의 server.maxConnections 설정은 여기에서 유용할 것으로 보였지만 (적어도 저에게는 그랬습니다), 실제로는 많은 효용성을 제공하지 않았으며 때때로 오류를 일으켰습니다. 이 설정은 서버가 maxConnections 이상의 새 핸들을 받지 않도록 하여 제한을 초과한 것을 확인한 후 새 핸들을 닫습니다. 이 확인은 JavaScript에서 적용되므로 무한 루프 상황에 대비하지 않습니다 (이벤트 루프로 돌아가면 요청을 올바르게 중단합니다...기다려). 또한 요청이 중단되면서 정상 작동 중에도 이로 인한 연결 오류가 발생했으며 다른 요청이 여러 개 실행 중인 증거는 없었습니다. 이는 연결이 언제 시작하고 끝나는지에 대한 약간의 타이밍 문제 또는 haproxy와 Node 간의 의견 차이로 의심됩니다. 상호 배타적 보증을 보유하는 것은 개발자가 싱글톤 또는 다른 전역 상태를 안전하게 사용할 수 있게 해주는 좋은 것입니다. 이는 익스프레스 미들웨어로 프로세스별 대기열을 구현함으로써 처리할 수 있습니다.

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

서버 측 렌더링은 주로 I/O 워크로드와는 다른 작업 부하를 나타냅니다. 이는 노드(Node)가 뛰어난 부분입니다. 이상적인 동작의 원인을 파악함으로써, 우리는 기존 운영 경험이 있는 제품을 사용하여 문제에 대처했습니다.

에어비앤비에서는 세계적 수준의 프론트엔드 경험 구축에 크게 투자하고 있습니다. 이 글을 읽는 것이 즐거우셨고 이것이 흥미로운 도전이라고 생각하셨다면, 우리는 항상 역량 있는 호기심 많은 분들을 팀에 초대하고 있습니다. 여러분의 소식을 기다립니다!

이 게시물을 검토하고 수정해준 Brian Wolfe, Joe Lencioni, Adam Neary에게 감사드립니다.

## 각주

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

- 비동기 렌더링의 경우 여전히 자원 경합이 발생합니다. 비동기 렌더링은 프로세스나 브라우저의 응답성에 중점을 두지만 병렬 처리나 지연을 해결하지는 않습니다. 이 블로그 포스트는 순수 컴퓨팅 작업의 간단한 모델에 초점을 맞출 것입니다. IO 및 컴퓨팅의 혼합된 작업에서 요청 동시성이 증가하면 지연 시간이 증가하지만 더 높은 처리량을 얻을 수 있다는 장점이 있습니다.
- 유니콘 웹 서버에서 영감을 받아 우리의 Rails 애플리케이션을 제공하는 데 사용합니다. 유니콘 철학은 특히 잘 설명하고 있습니다.
- 대부분은 반응이 없는 프로세스를 우회하려고 시도합니다.
- 클러스터는 요청이 아니라 연결을 분배하므로 예기치 않은 동작을 하며, 특히 지속적인 연결을 사용할 때 더 나빠집니다. 클라이언트로부터의 지속적인 연결은 특정한 워커 프로세스에 바인딩되어 있으므로 작업을 효율적으로 분배하기가 더 어려워집니다.
