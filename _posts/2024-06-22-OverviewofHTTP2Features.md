---
title: "HTTP2 특징 총정리"
description: ""
coverImage: "/assets/img/2024-06-22-OverviewofHTTP2Features_0.png"
date: 2024-06-22 02:24
ogImage:
  url: /assets/img/2024-06-22-OverviewofHTTP2Features_0.png
tag: Tech
originalTitle: "Overview of HTTP 2 Features"
link: "https://medium.com/codex/overview-of-http-2-features-b3c5c1cc6cb6"
isUpdated: true
---

![HTTP/2 Features](/assets/img/2024-06-22-OverviewofHTTP2Features_0.png)

HTTP는 보안 부재와 최적 성능 부족이라는 두 가지 주요 단점이 있습니다.

SSL/TLS의 도입으로 보안 문제는 극복되었지만, 성능 향상 측면에서는 부족했습니다. 이는 핸드쉐이크 암호화 프로세스를 최적화했지만, 전체 데이터 전송에 대한 더 나은 해결책을 제시하지 않았으며 여전히 "장기 연결"이라는 구식 기술에 의존하고 있었습니다.

따라서 HTTPS가 성숙해지자, HTTP는 성능에 초점을 맞추고 또 다른 진화의 길을 걸어왔습니다.

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

HTTP의 역사로 돌아가면, 구글은 SPDY 프로토콜을 개척했고 이를 크롬 브라우저에 적용하여 HTTP 성능을 최적화한 “첫발”을 내딛었습니다.

이어서 인터넷 공학 작업 국(IETF)은 다양한 당사자들의 참여를 통합하여 SPDY를 기반으로 하여 HTTP/1의 후계자인 오늘날의 주인공인 “HTTP/2”를 소개함으로써 성능 면에서 큰 도약을 이루었습니다.

# 왜 HTTP/2.0 이 아닌가

과연 이전 버전인 “1.0”과 “1.1.”처럼 HTTP/2가 “2.0”으로 명명되지 않은 이유가 궁금할 것입니다.

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

실은 HTTP/2에 새로운 사용자들이 가장 자주 묻는 질문 중 하나이며, HTTP/2 작업 그룹은 이에 대한 설명을 제공했습니다.

과거에 "1.0" 및 "1.1"을 사용한 것이 혼란과 오해를 초래하여 실제 사용 중인 버전을 구별하기 어렵게 만들었다고 믿습니다. 그래서, HTTP 프로토콜은 이제 미니 버전 번호를 사용하지 않고 주 버전 번호만 사용하기로 결정했습니다. 앞으로 "HTTP/2.0" 또는 "HTTP/2.1" 같은 것은 더 이상 없을 것이며 오직 "HTTP/2", "HTTP/3" 등만 사용될 것입니다.

이 방식은 프로토콜 버전의 "도약"을 명확하고 모호하지 않게 하는데 도움이 되며, 이는 프로토콜이 더 오랜 기간 동안 안정적으로 유지되도록 합니다. HTTP 프로토콜의 각 새 버전은 상당한 차이를 가지며, 점진적인 개선은 없을 것입니다.

# HTTP/1과의 호환성

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

HTTPS가 이미 보안에서 뛰어났기 때문에 HTTP/2의 유일한 초점은 성능 향상입니다.

그러나 HTTP/2는 방대한 기대뿐만 아니라 HTTP/1의 거대한 역사적 부담도 갖고 있습니다. 따라서 어떠한 프로토콜 수정도 호환성을 주요 목표로 신중히 고려되어야 합니다. 그렇지 않으면 TLS 사례에서와 같이 기존 자산들에 심각한 혼란을 초래할 수 있습니다 (TLS 1.2와 호환성을 위해 "위장"이 필요했던 것과 같이).

그럼 HTTP/2는 어떻게 이를 달성할까요?

기능적 호환성을 유지하기 위해 HTTP/2는 HTTP를 "의미론"과 "구문" 두 부분으로 분할합니다. "의미론" 레이어는 동일하게 유지되어 HTTP/1과 완전히 일관성이 있습니다 (즉, RFC 7231). 요청 방법, URI, 상태 코드 및 헤더 필드와 같은 개념은 모두 유지되어 다시 배우는 필요가 없습니다. HTTP 위에 구축된 응용 프로그램도 수정이 필요 없이 HTTP/2로 원활하게 전환할 수 있습니다.

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

https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Accept-Encoding

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

먼저, HTTP/2는 메시지 헤더를 주요하게 개선했어요.

HTTP/1에서는 "Content-Encoding" 헤더 필드를 사용하여 바디의 인코딩을 지정할 수 있었어요. 예를 들어 gzip 압축을 사용하여 대역폭을 저장할 수 있죠. 그러나 메시지의 다른 구성 요소인 헤더는 무시되고 최적화가 부족했어요.

보통 메시지의 헤더는 "User Agent", "Cookie", "Accept", "Server"와 같은 많은 고정 헤더 필드를 가지고 있어요. 이는 수백 바이트에서 심지어 몇 천 바이트에 이르기도 하죠. 한편, 바디는 종종 GET 요청이나 204/301/304 응답과 같이 몇십 바이트만 포함하곤 해요. 이러한 이유로 헤더가 '지배적인 요인'으로 나타났어요. 게다가, 수천이나 수백만에 이르는 요청-응답 메시지 중 많은 필드 값이 반복되면서 상당한 낭비가 발생했어요. "롱테일 효과"는 이러한 고도 중복 데이터로 인해 상당한 대역폭이 소비되는 결과를 가져와요.

그래서 HTTP/2는 주요 성능 향상으로 '헤더 압축'에 초점을 맞추었어요. 예상하신 대로, 최적화 방법은 여전히 '압축'이에요.

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

그러나 HTTP/2는 전통적인 압축 알고리즘을 사용하지 않습니다. 대신 전용 "HPACK" 알고리즘을 개발했는데, 이는 클라이언트와 서버 양쪽에서 "사전"을 설정합니다. 반복되는 문자열을 나타내는 데 인덱스 번호를 사용하고 허프만 코딩을 사용하여 정수와 문자열을 압축하여 50%에서 90%의 높은 압축률을 달성합니다.

# 이진 형식

HTTP/1의 메시지의 평문 형식에 이미 익숙할 수 있습니다. 이 형식은 "이해하기 쉬우며" 간단한 도구로 개발 및 디버그할 수 있어 매우 편리합니다.

그러나 HTTP/2는 이러한 측면에서 "타협"하지 않으며 10년이 넘도록 지속되어 온 현재 상태를 변경하기로 결정했습니다. 인간이 읽을 수 있는 ASCII 코드 대신 하위 수준의 TCP/IP 프로토콜에 더 가까워지는 쪽으로 이동하여 완전히 이진 형식을 채택합니다.

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

비록 사용자 친화적이지는 않지만 컴퓨터 구문 분석을 크게 용이하게 만든다. 일반 텍스트의 경우, 대소문자 구분, 공백 문자, 캐리지 리턴, 줄 바꿈, 부족하거나 추가된 문자 등과 같은 모호성이 쉽게 발생할 수 있다. 이러한 것들을 처리하기 위해 프로그램은 복잡한 상태 기계를 사용해야 하며, 이는 비효율적이고 번거로울 수 있다.

반면에 이진(binary)은 오직 "0"과 "1"로 이루어져 있어 필드 크기, 순서, 플래그 비트 및 기타 형식을 엄격히 정의할 수 있다. 구문 분석은 모호하지 않고, 구현은 간단하며, 콤팩트하고 빠르며 "내부 효율성"을 달성할 수 있다.

이진 형식을 기반으로, HTTP/2는 "급진적인" 개혁을 시작했다.

TCP 프로토콜의 일부 기능을 응용 계층으로 이동하여 원래의 "헤더+바디(본문)" 메시지를 여러 개의 작은 이진 "프레임"으로 분해하였으며, "헤더" 프레임은 헤더 데이터를 포함하고 "데이터" 프레임은 엔티티 데이터를 포함하고 있습니다.

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

그 접근 방식은 "Chunked" 전송 인코딩과 약간 유사하며, "작은 부분으로 분해"하는 원칙을 따릅니다. 그러나 HTTP/2가 데이터를 프레임으로 분할한 후에는 메시지의 "Header+Body" 구조가 완전히 사라지고 프로토콜은 "조각"만을 처리합니다.

![HTTP/2 Features](/assets/img/2024-06-22-OverviewofHTTP2Features_1.png)

# 가상 '스트림'

메시지의 조각들이 목적지에 도착하면 어떻게 조립될까요?

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

HTTP/2는 "스트림"이라는 개념을 정의하는데, 이는 이진 프레임의 양방향 시퀀스입니다. 각 메시지 왕복은 고유한 스트림 ID가 할당됩니다. 이를 가상의 "데이터 스트림"으로 생각할 수 있는데, 순서대로 데이터 프레임의 시리즈가 흐르는 것입니다. 이러한 데이터 프레임은 HTTP/1의 요청 및 응답 메시지를 형성하기 위해 순서대로 조립됩니다.

"스트림"이 가상이며 실제로 존재하지 않기 때문에, HTTP/2는 단일 TCP 연결을 사용하여 여러 "단편화된" 메시지를 동시에 전송할 수 있습니다. 이를 "다중화"라고 하며, 단일 연결을 통해 여러 양방향 통신이 처리되는 것입니다.

"스트림"의 관점에서 메시지는 순서가 지정된 "프레임"의 시퀀스이며, "연결"의 관점에서 메시지는 순서대로 받아들여지고 보내집니다. 여러 요청/응답이 있을 때 순차적인 관계가 더 이상 존재하지 않으므로, 줄 서서 기다릴 필요가 없어지며 "헤드오브라인 차단" 문제가 제거되고 지연 시간이 줄어들며 연결 활용도가 크게 증가합니다.

![이미지](/assets/img/2024-06-22-OverviewofHTTP2Features_2.png)

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

네트워크 연결을 더 잘 활용하고 처리량을 늘리기 위해 HTTP/2는 가상 "스트림"을 관리하기 위해 일부 제어 프레임을 추가했습니다. 이는 우선순위 및 플로우 제어와 같은 기능을 구현하며 TCP 프로토콜과 매우 유사합니다.

또한 HTTP/2는 기존의 "요청-응답" 작업 방식을 어느 정도 변경합니다. 서버는 더 이상 요청에 순응적으로 응답하는 것이 아니라, 클라이언트에게 메시지를 전송하기 위해 "스트림"을 미리 생성할 수도 있습니다. 예를 들어, 브라우저가 HTML을 요청할 때 서버가 클라이언트에게 사용할 수 있는 JS 및 CSS 파일을 푸시할 수 있어 대기 시간이 줄어듭니다. 이를 "서버 푸시"라고 하며, 캐시 푸시로도 알려져 있습니다.

# 보안 강화

호환성을 고려해 HTTP/2는 HTTP/1의 평문 기능을 계속 유지하여 데이터를 평문으로 전송할 수 있도록 합니다. 이는 암호화된 통신을 요구하지 않지만, 여전히 형식은 이진(binary)이며 복호화할 필요가 없습니다.

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

그러나 HTTPS가 주류이며 Chrome 및 Firefox와 같은 주요 브라우저는 암호화된 HTTP/2만 지원한다고 공개적으로 발표했기 때문에 실제로 HTTP/2는 암호화됩니다. 이것은 인터넷에서 흔히 볼 수 있는 HTTP/2가 TLS를 통해 실행되는 "https" 프로토콜 이름을 사용한다는 것을 의미합니다.

암호화된 버전과 평문 버전을 구별하기 위해 HTTP/2 프로토콜은 두 개의 문자열 식별자를 정의합니다. 암호화된 HTTP/2의 경우 "h2"이고 평문 HTTP/2의 경우 "h2c"이며 여기서 "c"는 "클리어 텍스트"를 나타냅니다.

HTTP/2 표준이 2015년에 제정될 때 SSL/TLS의 많은 취약점이 이미 발견되었고 새로운 TLS1.3이 아직 출시되지 않은 상황이었습니다. 따라서 HTTP/2의 암호화된 버전은 보안 측면에서 강화되었으며 기본 통신 프로토콜이 적어도 TLS1.2 이상이어야 하며 포워드 시크리시와 SNI(서버 이름 지칭)를 지원하고 약간의 여전콜 암호 알고리즘 몇백 개를 블랙리스트에 올려두었습니다. DES, RC4, CBC 및 SHA-1과 같은 약한 암호 알고리즘은 HTTP/2에서 사용할 수 없으며 이는 하위 수준에서 "TLS1.25"를 사용하는 것과 같습니다.

# 프로토콜 스택

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

다음 다이어그램은 HTTP/1, HTTPS 및 HTTP/2의 프로토콜 스택을 비교한 것입니다. HTTP/2는 "HPack," "Stream," 및 "TLS1.2" 위에 구축되어 있어 HTTP/1 및 HTTPS보다 약간 더 복잡한 것을 명확히 볼 수 있습니다.

![](/assets/img/2024-06-22-OverviewofHTTP2Features_3.png)

HTTP/2의 내부 구현은 복잡할지라도, 그 "의미론"은 여전히 간단한 HTTP/1과 같습니다. 이전에 학습한 지식은 더 이상 사용되지 않지 않고 여전히 적용할 수 있습니다.

# 결론

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

오늘은 HTTP/2의 중요한 기능들을 간단히 소개했어요. 이론에 더 초점을 맞춰서 설명했어요. 다음에는 Wireshark를 사용하여 패킷을 캡처하고 HTTP/2의 헤더 압축, 이진 프레임, 스트림 기능에 대해 자세히 설명할 거예요.

- HTTP 프로토콜에서는 작은 버전 번호를 제거했기 때문에 HTTP/2의 공식 이름은 2.0이 아니에요.
- HTTP/2는 HTTP/1과 의미론적으로 호환되며, 요청 방법 및 URI와 같은 전통적인 개념을 유지해요.
- HTTP/2는 헤더 정보를 압축하는 "HPACK" 알고리즘을 사용하여 중복 데이터를 제거하여 대역폭을 절약해요.
- HTTP/2의 메시지는 더 이상 "헤더+바디" 형식이 아니라 여러 이진 "프레임"으로 분산돼요.
- HTTP/2는 가상 "스트림"을 사용하여 메시지를 전송하며, "헤드-오브-라인 차단" 문제를 해결하고 "멀티플렉싱"을 통해 연결 이용률을 향상시켜요.
- HTTP/2는 보안을 강화하며, 최소 TLS 1.2를 요구하고 많은 취약한 암호 스위트를 비활성화해요.

![HTTP/2 기능 개요](/assets/img/2024-06-22-OverviewofHTTP2Features_4.png)
