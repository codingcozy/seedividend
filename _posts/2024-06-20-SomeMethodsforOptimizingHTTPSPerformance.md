---
title: "HTTPS 성능 최적화를 위한 몇 가지 방법"
description: ""
coverImage: "/assets/img/2024-06-20-SomeMethodsforOptimizingHTTPSPerformance_0.png"
date: 2024-06-20 04:25
ogImage:
  url: /assets/img/2024-06-20-SomeMethodsforOptimizingHTTPSPerformance_0.png
tag: Tech
originalTitle: "Some Methods for Optimizing HTTPS Performance"
link: "https://medium.com/codex/some-methods-for-optimizing-https-performance-4ad1bfa109b5"
isUpdated: true
---

예상대로 HTTPS 연결이 느리다고 말하는 사람들을 들어본 적이 있을 것입니다. 이 "느림"의 이유는 무엇일까요?

HTTPS 연결은 대략 두 부분으로 나눌 수 있습니다. 연결 설정 중에 대칭 암호화 핸드셰이크와 핸드셰이크 후의 대칭 암호화 메시지 전송입니다.

인기 있는 알고리즘인 AES와 ChaCha20 같은 우수한 성능을 가지고 있고, 하드웨어 최적화로 메시지 전송의 성능 오버헤드는 무시할 정도로 미미할 수 있습니다. 따라서 사람들이 "느린 HTTPS 연결"에 대해 이야기할 때 주로 말하는 것은 초기 연결 설정 단계입니다.

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

TCP 연결이 설정되어 있는 상태에서 실제 데이터 전송이 이루어지기 전에 HTTPS는 최대 2개의 메시지 왕복 루트 또는 2-RTT가 소요될 수 있는 TLS 핸드셰이크 단계를 추가합니다. 핸드셰이크 메시지의 네트워크 시간 외에도 다음과 같은 "보이지 않는" 비용이 추가로 발생합니다:

- 키 교환을 위한 임시 공개-개인 키 쌍(ECDHE) 생성
- CRL 또는 OCSP를 위해 CA에 액세스하여 인증서 확인
- "Pre-Master" 비밀에 대한 비대칭 암호화 및 복호화 처리

최악의 경우, 최적화 조치를 취하지 않은 경우 HTTPS 연결 설정은 HTTP보다 수백 밀리초에서 몇 초 더 오래 걸릴 수 있습니다. 이는 네트워크 및 계산 비용을 포함하여 "HTTPS 웹 사이트 열기가 느린 것처럼 느껴질 수 있습니다."

그러나 위에서 설명한 상황은 이미 지나간 얘기입니다. 지금은 많은 효과적인 HTTPS 최적화 방법이 사용 가능하며, 적절히 사용하면 추가 연결 시간을 수십 밀리초로 줄이거나 완전히 "제로"로 만들 수 있습니다.

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

TLS 핸드셰이크 과정 중 성능에 영향을 미치는 부분을 강조한 다이어그램을 만들었습니다. 이 다이어그램을 참고하여 HTTPS를 효과적으로 최적화할 수 있어요.

![다이어그램](/assets/img/2024-06-20-SomeMethodsforOptimizingHTTPSPerformance_1.png)

# 하드웨어 최적화

컴퓨터 세계에서 "최적화"는 "하드웨어 최적화"와 "소프트웨어 최적화" 두 가지 유형으로 나뉩니다. 먼저 하드웨어 방법을 살펴보겠습니다.

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

하드웨어 최적화는 본질적으로 "돈을 지출하는 것"입니다. 그러나 돈을 쓰는 것도 기술이 필요합니다. 돈을 낭비하는 대신에 가장 중요한 곳에 투자해야 합니다.

HTTPS 연결은 입출력보다는 계산 집약적입니다. 따라서 비싼 네트워크 카드, 대역폭 또는 SSD 저장 공간을 사는 것은 성능을 최적화하지 않습니다.

최적화를 위해 어떤 하드웨어를 사용해야 할까요?

먼저, AES 최적화가 내장된 더 빠른 CPU를 선택할 수 있습니다. 이는 핸드셰이크와 전송을 가속화할 수 있습니다.

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

둘째, CPU로 부터 비대칭 암호화 및 복호화를 줄여주는 "SSL 가속기 카드"를 선택할 수도 있어요!

하지만, "SSL 가속기 카드"는 소프트웨어 업그레이드가 느리고, 제한된 알고리즘을 지원하며 사용자 정의의 유연성이 부족한 등 몇 가지 단점이 있답니다.

그래서 세 번째 하드웨어 가속 방법인 "SSL 가속기 서버"가 개발되었어요! 이 방법은 TLS 핸드셰이크 중에 암호화 및 복호화 계산을 완전히 오프로드하는 전용 서버 클러스터를 사용하여, 간단한 "가속기 카드"보다 훨씬 높은 성능을 제공해요!

# 소프트웨어 최적화

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

그러나 CPU를 업그레이드하는 것 외에 다른 하드웨어 최적화 방법들은 돈을 쓰면 간단히 달성되지 않는 경우가 많습니다. 이것들은 어떤 개발과 적응 작업이 필요하며, 이는 매우 도전적일 수 있습니다. 예를 들어, "가속화 서버"의 중요한 측면 중 하나는 통신이 "비동기적"이어야 한다는 것이며, 그렇지 않으면 가속화는 무의미해질 수 있습니다.

따라서 소프트웨어 최적화는 상대적으로 더 실현 가능하고, 비용 효율적이며, 적은 돈으로 더 많은 것을 이룰 수 있습니다.

소프트웨어 최적화는 소프트웨어 업그레이드와 프로토콜 최적화 두 부분으로 나눌 수 있습니다.

소프트웨어 업그레이드는 상대적으로 간단한데, 가능한 한 최신 버전의 소프트웨어로 업그레이드하는 것을 포함합니다. 예를 들어, Linux 커널을 2.x에서 4.x로, Nginx를 1.6에서 1.16로, OpenSSL을 1.0.1에서 1.1.0/1.1.1로 업그레이드하는 것 등이 있습니다.

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

이러한 소프트웨어 업데이트는 성능 최적화와 버그 수정을 포함하므로, 만약 작업이 적극적으로 협력할 수 있다면 이 최적화를 달성하는 것은 비교적 쉬운 일입니다.

그러나 많은 대규모 및 중소기업에 대해 하드웨어 및 소프트웨어 업그레이드는 어려운 문제입니다. 여러 데이터 센터에 분산된 수백 대의 다양한 모델의 기계들이 있기 때문에 하나씩 업그레이드하는 과정에는 많은 인력이 필요하며 정상적인 온라인 서비스에 영향을 미칠 위험이 큽니다.

그러므로 하드웨어나 소프트웨어 업그레이드가 불가능할 때, 가장 일반적인 최적화 방법은 기존 환경 내에서 프로토콜 자체의 잠재력을 탐색하는 것입니다.

# 프로토콜 최적화

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

TLS 핸드셰이크 프로세스에서 키 교환은 성능에 큰 영향을 미치는 중요한 요소입니다. 프로토콜 최적화는 핵심 키 교환 프로세스부터 시작해야 합니다.

가능하다면 TLS 1.3을 사용하는 것이 좋습니다. TLS 1.3은 핸드셰이크 프로세스를 크게 간소화하여 완전한 핸드셰이크를 위해 단 하나의 왕복 시간(1-RTT)만 필요하며 보안을 향상시킵니다.

TLS 1.3로 업그레이드하는 것이 아직 불가능하고 TLS 1.2를 사용해야 할 때, 핸드셰이크를 위해 선택되는 키 교환 프로토콜은 가능한 ECDHE(Elliptic Curve Diffie-Hellman Ephemeral) 알고리즘을 사용하는 것이 좋습니다. ECDHE는 연산이 빠르고 안전성이 높을 뿐만 아니라 "False Start"를 지원하여 핸드셰이크에 필요한 왕복 시간을 2-RTT에서 1-RTT로 줄여 TLS 1.3과 유사한 효과를 얻을 수 있습니다.

게다가, 타원 곡선의 경우 고성능 곡선을 선택해야 합니다. x25519를 선호하는 선택지로 하고 P-256을 대체 옵션으로 고려해야 합니다. 대칭 암호화 알고리즘으로는 "AES_256_GCM"보다 약간 성능이 빠른 "AES_128_GCM"을 선택할 수 있습니다.

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

엔진엑스에서는 "ssl_ciphers" 및 "ssl_ecdh_curve"와 같은 지시문을 사용하여 서버의 암호 스위트 및 타원 곡선을 구성할 수 있습니다. 이를 통해 선호하는 옵션을 우선순위로 설정할 수 있습니다. 예를 들어:

```js
ssl_ciphers   TLS13-AES-256-GCM-SHA384:TLS13-CHACHA20-POLY1305-SHA256:EECDH+CHACHA20；
ssl_ecdh_curve              X25519:P-256;
```

# 인증서 최적화

키 교환에 추가로 핸드쉐이크 과정 중에 인증서 유효성 검사도 상대적으로 시간이 많이 소요되는 작업입니다. 서버는 클라이언트에게 자체 전체 인증서 체인을 보내야 하며, 그러면 클라이언트는 각 인증서를 확인해야 합니다.

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

여기에는 인증서 전송과 인증서 유효성 검증이 두 가지 최적화 포인트가 있습니다.

서버의 인증서의 경우 RSA 인증서 대신 타원 곡선(ECDSA) 인증서를 선택할 수 있습니다. 224비트 ECC는 2048비트 RSA와 동등하며, 타원 곡선 인증서는 RSA 인증서보다 훨씬 작은 "크기"를 가지고 있어 대역폭을 절약하고 클라이언트의 계산 부담을 줄여 "한 방에 두 마리 토끼를 잡는" 효과를 얻을 수 있습니다.

클라이언트 인증서 유효성 검증은 실제로 복잡한 작업입니다. 공개 키로 여러 개의 인증서 서명을 해독하고 확인하는 것 외에도, 인증서가 취소될 수 있기 때문에 클라이언트는 때로는 CA에 액세스하여 CRL 또는 OCSP 데이터를 다운로드해야 할 수도 있습니다. 이는 DNS 쿼리, 연결 설정 및 데이터 교환과 같은 일련의 네트워크 통신을 필요로 하며, 추가적인 RTT가 발생할 수 있습니다.

CA에 의해 주기적으로 발급되는 CRL (인증서 폐기 목록)은 모든 폐기된 인증서의 일련 번호를 포함하고 있습니다. 이 목록을 확인하여 인증서가 유효한지 결정할 수 있습니다.

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

하지만, CRL은 "주기적"으로 발행되는 것으로 인해 보안 위험이 있으며, 폐기된 인증서의 수가 증가할수록 목록도 커져 종종 메가바이트에 이를 정도로 커집니다. 웹사이트에 연결할 때마다 몇 메가바이트의 "무의미한 데이터"를 사전에 다운로드해야 한다고 상상해보세요. 이것은 간단히 말해 실용적이지 않습니다.

그래서 CRL은 이제 거의 사용되지 않으며, OCSP(온라인 인증서 상태 프로토콜)가 대신하게 되었습니다. OCSP는 인증 기관에 쿼리 요청을 보내어 인증서의 유효성 상태를 얻습니다.

그러나 OCSP도 추가적인 네트워크 요청 오버헤드를 발생시키고, 인증 기관 서버에 의존합니다. 인증 기관 서버가 바쁘면 응답 지연이 용납할 수 없을 수 있습니다.

이 문제를 해결하기 위해 OCSP 스테이플링이라는 "패치"가 있습니다. 이 방법을 사용하면 서버가 CA로부터 사전에 OCSP 응답을 미리 가져와서 핸드셰이크 중에 인증서와 함께 보내어 클라이언트가 쿼리를 위해 CA 서버에 연결할 필요가 없도록 합니다.

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

# TLS 세션 재개

지금까지 네 가지 HTTPS 최적화 방법 (하드웨어 최적화, 소프트웨어 최적화, 프로토콜 최적화, 그리고 인증서 최적화) 에 대해 이야기했습니다. 또 다른 더 나은 방법이 있을까요?

HTTPS 연결 설정 과정을 다시 살펴보겠습니다: 먼저 TCP 쓰이-와이 핸드셰이크, 그리고 TLS 핸드셰이크가 이어집니다. 후자의 핸드셰이크의 핵심은 "마스터 시크릿" 키를 계산하는 것인데, 이는 각 연결마다 재계산되어야 합니다. 이는 조금 낭비적으로 보입니다. 만약 수고끈한 마스터 시크릿 키를 캐시하여 재사용할 수 있다면, 핸드셰이크와 계산 비용을 제거할 수 있지 않을까요?

이 접근 방법은 "TLS 세션 재개" 라고 불리며, HTTP 캐시와 마찬가지로 HTTPS 성능을 향상시키는 "큰 무기"이며 브라우저와 서버에서 널리 사용됩니다.

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

세션 재개에는 두 가지 형태가 있습니다. 첫 번째는 "세션 ID"로, 클라이언트와 서버가 처음 연결 후 세션 ID를 저장하여 메모리에 Master Secret 키 및 다른 관련 정보를 저장합니다. 클라이언트가 다시 연결할 때 ID를 보내면 서버는 메모리에서 해당 ID를 찾아 세션 상태를 바로 복원하여 Master Secret 키를 사용하여 인증서 확인 및 키 교환을 건너뛰고 안전한 통신을 한 번의 메시지 교환으로 설정합니다."

패킷을 캡처하면 서버가 "ServerHello" 메시지 이후에 바로 "Change Cipher Spec" 및 "Finished" 메시지를 보내 세션 재개를 위해 핸드셰이크를 완료하는 것을 볼 수 있습니다.

![이미지](/assets/img/2024-06-20-SomeMethodsforOptimizingHTTPSPerformance_2.png)

# 세션 티켓

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

세션 ID는 가장 초기의 세션 재개 기술이었으며 가장 널리 사용되는 기술입니다. 그러나 이에는 단점이 있습니다. 서버는 각 클라이언트의 세션 데이터를 저장해야 하므로, 수백만 또는 수천만 사용자를 가진 웹사이트의 경우 서버의 부하가 증가하는 중요한 문제가 됩니다.

그래서 두 번째 "세션 티켓" 방식이 도입되었습니다.

이 방식은 HTTP 쿠키와 약간 유사하여, 저장 책임을 서버에서 클라이언트로 전환합니다. 서버는 세션 정보를 암호화하고 저장을 위해 클라이언트에게 "새 세션 티켓" 메시지를 전송합니다.

재연결할 때 클라이언트는 "세션 ID" 대신 "세션 티켓"을 사용하여 "session_ticket" 확장을 통해 "티켓"을 전송합니다. 서버는 티켓의 만료일을 해독하고 확인하여 세션을 재개하고 암호화 통신을 시작할 수 있습니다.

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

그러나 "세션 티켓" 방식은 Ticket을 암호화하기 위해 고정 키 파일 (ticket_key)의 사용을 필요로 합니다. 키가 노출되는 것을 방지하고 전방 비밀 보장을 확보하기 위해 키 파일은 정기적으로 회전되어야 합니다. 예를 들어 매 시간 또는 매일마다 회전해야 합니다.

# 사전 공유 키 (PSK)

"False Start", "세션 ID" 및 "세션 티켓"은 1-RTT만 달성할 수 있지만, TLS 1.3는 "0-RTT"를 달성하기 위해 더 나아갑니다. 원리는 "세션 티켓"과 유사하지만 Ticket과 함께 응용 프로그램 데이터 (이른 데이터)를 포함하여 1.2의 서버 확인 단계를 제거합니다. 이 방법은 "사전 공유 키" 또는 "PSK"로 불립니다.

![이미지](/assets/img/2024-06-20-SomeMethodsforOptimizingHTTPSPerformance_3.png)

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

그러나 "PSK"는 완벽하지 않습니다. 보안을 약간 희생하여 효율성을 높였기 때문에 "재생 공격"에 취약해집니다. 해커들이 "PSK" 데이터를 가로채 서버로 반복적으로 보낼 수 있습니다. 이는 재생 장치를 사용하는 것과 유사합니다.

해결책은 안전한 GET/HEAD 메서드만 허용하거나 메시지에 타임스탬프 또는 "nonce" 검증을 추가하거나 "일회용 티켓"을 사용하여 재생 공격을 제한하는 것입니다.

# 결론

- 네트워크 및 연산 오버헤드를 감소시키는 하드웨어 및 소프트웨어 접근 방식이 여러 가지 있어 HTTPS를 HTTP만큼 빠르게 만들 수 있습니다. 가장 실행 가능한 방법은 소프트웨어 최적화입니다.
- 가능한 경우 ECDHE 타원 곡선 암호 스위트를 사용하는 것이 좋습니다. 대역폭과 연산을 절약할 수 있으며 "False Start"도 가능합니다.
- 서버는 "OCSP Stapling"을 활성화하여 클라이언트가 CA에 인증서를 유효성 검사하기 위해 접근하지 않도록 해야 합니다.
- 세션 재개는 캐싱과 유사합니다. 클라이언트가 이전에 연결을 성공적으로 설정했다고 가정하면 "세션 ID"나 "세션 티켓"과 같은 자격 증명을 사용하여 키 교환 및 인증서 유효성 검사 단계를 우회하고 암호화 통신을 직접 시작할 수 있습니다.

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

![2024-06-20-SomeMethodsforOptimizingHTTPSPerformance_4.png](/assets/img/2024-06-20-SomeMethodsforOptimizingHTTPSPerformance_4.png)
