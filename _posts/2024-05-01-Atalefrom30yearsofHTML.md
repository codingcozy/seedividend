---
title: "개발자 대부분은 모르는 HTML 이야기"
description: ""
coverImage: "/assets/img/2024-05-01-Atalefrom30yearsofHTML_0.png"
date: 2024-05-01 23:42
ogImage:
  url: /assets/img/2024-05-01-Atalefrom30yearsofHTML_0.png
tag: Tech
originalTitle: "A tale from 30 years of HTML"
link: "https://medium.com/@jankammerath/a-tale-from-30-years-of-html-ef4d11069d28"
isUpdated: true
---

몇 일 후에 대부분이 간단히 "HTML"로 알고 있는 하이퍼텍스트 마크업 언어가 30세가 됩니다. 1992년 11월 3일에 첫 버전이 출시된 이후로 긴 여정을 걷고 있어요. 정말 오래된 여정이죠.

1992년에 출시되었지만 HTML과 월드 와이드 웹이 인기를 얻기까지는 시간이 걸렸어요. 월드 와이드 웹이 활발해지기 시작한 것은 1995년과 1996년으로, 그 전까지는 꾸준히 여러 기술 천재들과 프로그래머 등 소수의 사람들이 사용하는 것이었습니다.

월드 와이드 웹을 둘러보는 것은 이미 모험이었고, 설정하는 데 꽤 많은 시간과 인내심이 필요했어요. 웹사이트를 만드는 것이 그리 익숙한 일이 아니었고, 상업용 응용프로그램을 개발하려면 여전히 웹, 프랑스의 미네텔, 독일의 BTX 중에서 선택해야 했어요. 이 자리에서 고퍼 프로토콜에 대해서도 한마디 더 남기고 싶어요.

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

# 90년대 스타일로 웹사이트 만드는 방법

90년대 초반, 웹사이트를 호스팅해줄 사람을 찾는 것이 가장 큰 과제였습니다. 당시 도메인 등록은 전혀 다른 이야기였어요. 자체 서버를 가지고 있거나 누군가가 웹사이트를 호스팅해주었다면, 아마도 Unix 머신에 FTP 액세스를 제공해주어 HTML과 멋진 GIF 이미지를 저장하고 원하는 누구든지 서비스할 수 있었을 거예요.

HTML 1.0, 2.0에서부터 3.2까지는 기본적인 수준이었습니다. 정말 기본적이죠. 자바스크립트는 1995년에 드디어 나왔지만 당시 브라우저들(주로 넷스케이프와 인터넷 익스플로러)에서 채택되기까지 시간이 걸렸어요. HTTP 쿠키도 1994년에 등장했습니다. 거의 모든 브라우저에서 사용자가 수락해야 하는 쿠키 메시지를 표시했죠 — 데자뷰 같지 않나요? 그래서 누군가가 Unix 머신에서 웹 서버 소프트웨어를 사용할 수 있게 허용해준다면 (예를 들어 NCSA HTTPd), HTML 파일과 이미지 몇 개만 호스팅하고 나면 갑자기 웹마스터가 되는 것이었어요. 요즘의 인터넷 사용자들을 흥분시킬만한 것은 아니었죠.

만약 사용자가 둘러보기만 하는 것이 아니라 실제로 상호작용할 수 있는 의미있는 인터랙티브 웹사이트를 만들고 싶다면 — 예를 들어 채팅 같은 것 — CGI("Common Gateway Interface")를 사용하거나 자체 웹 서버 소프트웨어를 만들게 될 확률이 매우 높았어요. 예전에 자체 웹 서버를 만드는 것은 그리 흔치 않진 않았습니다. 하지만 대부분의 사람들이 CGI를 사용했죠. CGI는 기본적으로 HTTP 요청을 응용프로그램에 전달하고, 응용프로그램은 헤더와 HTML 코드 또는 해당하는 콘텐츠를 반환하는 역할을 했어요. Perl, C 및 C++는 웹서버용 CGI 응용프로그램을 개발하는 데 가장 흔한 언어였습니다. 서버에서 상호작용하는 모든 것을 처리해야 했기 때문에 매우 번거로웠습니다. 쿠키가 없었던 당시에 세션 처리와 세션 관리는 대부분 각 사용자 또는 세션마다 고유 식별자를 사용하여 URL 경로 구성 요소를 통해 이루어졌습니다.

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

및 90년대 중반 컴퓨터의 성능을 고려할 때, CPU 클럭 속도가 25에서 180 Mhz 사이였던 때에는 대화형 웹 서버를 실행하는 것이 비싼 일이었습니다. Sun Microsystem의 SPARC CPU 및 시스템이 그 용도로 흔히 사용되었으며, 그 당시에는 싸지 않았습니다.

# '95, '96 및 붐

'95년과 '96년은 현재의 세계적인 웹과 인터넷에 대한 중요한 시기였습니다. 사용량이 급증하고 무료 웹 호스팅 업체인 Yahoo의 GeoCities, 경매 플랫폼인 eBay 및 온라인 상점인 Amazon.com과 같은 서비스가 번창했습니다. 특히 Microsoft Frontpage, Sierra의 WWW Artist 및 기타 많은 소프트웨어들은 자신의 HTML 페이지를 쉽게 작성하고 FTP로 업로드하는 데 큰 도움이 되었습니다.

<img src="/assets/img/2024-05-01-Atalefrom30yearsofHTML_1.png" />

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

인터넷 정보 서버를 위한 PHP, Microsoft Active Server Pages와 같은 새로운 프로그래밍 언어들은 월드 와이드 웹을 위한 애플리케이션을 쉽게 만들 수 있게 했습니다. 쿠키와 자바스크립트는 상호작용성을 훨씬 더 높일 수 있었지만, 브라우저가 자바스크립트 코드를 실행하고 브라우저 충돌이 흔했던 시기였습니다. 맥로미디어에서 1996년에 출시된 인기 있는 플래시 플레이어와 자바 애플릿은 언급할 바를 잊으면 안 됩니다. 또한, 1996년에는 CSS인 Cascading Style Sheets도 출시되었습니다.

하지만 당시 웹사이트 레이아웃을 구축하는 방식은 여전히 테이블 레이아웃이었습니다. 모든 것을 수많은 테이블 안에 감싸고 테이블 안에 테이블이 포함된 것이었죠. 인터넷 업데이트는 흔치 않았기 때문에 낡은 웹 브라우저를 만나는 것이 불가피했습니다. 95년부터 98년까지 브라우저 전쟁이 벌어지면서 여러 브라우저의 크로스 브라우저 지원 문제가 머리아팠고, 테이블 사용이 가장 안전한 방법이었습니다. 또한 웹사이트를 만들 때 사용하는 브라우저 정보를 보여주는 애니메이션 GIF도 있었습니다. 요소들의 스타일은 요소가 가진 스타일 어트리뷰트만 가능했습니다. 매우 화려한 스타일을 적용하려면 결국 이미지, 이미지 맵, 그리고 (누가 아냐구요?) 테이블로 감싼 이미지를 사용해야 했습니다. 웹페이지를 제작한다면 기본적으로 하루종일 테이블을 다루었을 것입니다.

’95~’98년의 대부분 연결 속도가 56K 또는 7킬로바이트/초 수준으로 굉장히 느리기 때문에 이미지 로딩도 오래 걸렸습니다. 이렇게 멋진 애니메이션 GIF가 각 브라우저를 홍보할 때 거의 2초가 걸렸습니다. 웹사이트가 나오기까지 30초를 기다리는 것은 비일비재한 상황이었습니다. 콘텐츠 전달 네트워크도 존재하지 않았고, 지연은 "경험"에 영향을 미쳤습니다. 그리고 그 경험입니다.

# 97년부터 2000년 이후로 달려가는 중

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

샌프란시스코 소재의 작은 회사인 Macromedia가 제공한 소프트웨어 제품인 Dreamweaver, Fireworks, Flash는 많은 프로 웹마스터들에게 가장 선호되는 솔루션이 되었습니다. 웹마스터는 사람들이 가진 직업 중 하나였죠. 그러나 CSS, JavaScript, PHP 등 여러 다른 프로그래밍 언어들이 웹에 순수하게 초점을 맞추며 웹사이트를 만드는 것이 순수한 소프트웨어 개발 또는 엔지니어링 작업이 되는 추세였습니다.

![이미지](/assets/img/2024-05-01-Atalefrom30yearsofHTML_2.png)

2000년대 초까지 많은 웹사이트는 여전히 테이블 레이아웃이었고, 인터넷 익스플로러 3.0과 같은 오래된 브라우저들이 여전히 보였습니다. 그러나 시간이 흐름에 따라 웹사이트는 보다 상호 작용적이고 미디어가 풍부해졌습니다. 개발자들과 사용자들 모두에게 Flash, 자바 애플릿 또는 Real Player 플러그인과 같은 플러그인을 다루어야 했습니다. 사용자들에게는 플러그인을 계속 업데이트하고 새로운 플러그인을 설치해야 하는 번거로움이 있었습니다. 다운로드 속도는 그 시기에도 허용 가능한 수준 이하였습니다.

![이미지](/assets/img/2024-05-01-Atalefrom30yearsofHTML_3.png)

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

90년대 후반에는 첫 비디오 및 음악 스트리밍 서비스가 나타났습니다. 그러나 "브로드밴드" 사용자들조차 초당 한 메가비트 이상이 있다면 거의 아무런 경험을 할 수 없는 수준의 화질이었습니다. 하지만 새롭고 멋있었습니다. 오늘날의 오픈 소스 세계와 비교하면 Real Networks와 같은 제품과 같은 소프트웨어는 매우 비싼 편이었습니다.

# ‘98년의 WML - 모바일 웹이 태어나고 사라지다

무선 응용 프로토콜(WAP)은 무선 표시 언어(WML)를 사용하며 서로 다른 페이지(카드라고 불리는)를 카드 세트로 구성할 수 있었습니다. 이렇게 함으로써 여러 페이지를 클라이언트로 한 번에 전송하는 데이터 양을 줄일 수 있었습니다. 현재의 프론트엔드 프레임워크가 하는 것과 비슷한 일을 했습니다. 또한 모바일 네트워크 운영자들의 끔찍한 가격 정책 덕분에, WAP와 모바일 브라우저는 놀랍게도 몇 초만에 큰 청구서를 낳을 정도의 경험이 되어 버렸습니다. 사용자들은 그것을 별로 좋아하지 않았다고 해도 과언이 아닙니다.

<img src="/assets/img/2024-05-01-Atalefrom30yearsofHTML_4.png" />

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

이어서, WAP과 WML은 금방 사라졌어요. 기술적으로는 꽤 흥미로웠지만, 상업적 환경 속에서 그들의 소멸로 이어졌어요. Pocket PC 2002 이후 Windows Mobile 등의 더 강력한 모바일 브라우저들과 많은 다른 모바일 브라우저들이 나오면서 WAP은 더 이상 필요하지 않았어요. Palm, Nokia 등이 여러 방식으로 모바일 웹에 접근했지만 대부분 실패했어요.

# 2002 — Windows XP, IE 6 & Firefox가 등장

2002년, Firefox와 Windows XP, Internet Explorer 6의 탄생을 맞이했어요. 2000년 닷컴 버블 이후에는 인터넷과 웹이 성숙해졌어요. 온라인 상점, 호텔 및 항공편 예약 사이트와 같은 상업적 웹 서비스가 실제로 등장했어요. JavaScript, CSS 및 HTML이 HTML 4.01로 성숙해지면서, 웹은 종종 "웹 2.0"으로 정의되던 것으로 나아가고 있었죠. 브라우저는 이제 달력, 자동 완성 텍스트 상자, 대화형 테이블, 지도 등과 같이 상대적으로 복잡한 UI 구성 요소들을 렌더링하고 작동할 수 있었어요.

![Atalefrom30yearsofHTML_5](/assets/img/2024-05-01-Atalefrom30yearsofHTML_5.png)

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

Google Maps와 같은 애플리케이션이 등장하면서 현대의 "웹 2.0"은 이제 Microsoft AutoRoute와 같이 데스크톱 애플리케이션으로만 가능했던 완전한 규모의 애플리케이션을 구축할 수 있는 능력을 나타냈습니다. 상호 작용식 백과사전인 위키피디아로 인해 서버 팜은 이제 대규모 상호 작용식 웹사이트를 운영할 충분한 데이터베이스, 저장소 및 컴퓨팅 능력을 갖추게 되었습니다.

![Image](/assets/img/2024-05-01-Atalefrom30yearsofHTML_6.png)

JavaScript는 갑자기 전체 DOM을 조작할 수 있게 되었으며, 브라우저는 복잡한 페이지를 렌더링할 충분한 성능을 갖추었으며 CSS를 통해 애플리케이션의 스타일링을 더 편리하게 할 수 있었습니다. 이전에 데스크톱에서만 사용되던 이메일 애플리케이션은 이미 보다 상호 작용적인 이메일 클라이언트 디자인을 채택한 무료 이메일 서비스를 통해 주로 웹 기반으로 전환되었습니다. 웹 기반의 이메일 서비스는 이미 90년대 후반에 등장했습니다. 그러나 대화식 편집기, 채팅 등이 더 널리 사용되기 시작했습니다. HTML, CSS 및 JavaScript의 모든 개선사항마다 웹은 데스크톱 애플리케이션의 능력과 더 일치하게 되었습니다.

# 2008 — 모바일 웹이 태어남

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

90년대 중반에 태어난 모바일 웹은 항상 성장을 막는 두 가지 중대한 문제를 가지고 있었어요.

- 모바일 통신사들의 끔찍한 가격 정책
- 작은 화면과 뚱뚱한 손가락에 최적화되지 않은 웹사이트

가끔 많은 사람들이 망각하는 것은 애플이 이동 통신사들과 계약을 체결하고 Wi-Fi가 모바일 기기에서 주류가 되었다는 사실이에요. 또한 구글의 안드로이드가 등장했죠. 이러한 변화와 함께 더 많은 웹마스터와 개발자들이 모바일 웹사이트를 만들기 시작했어요. 모바일 인터넷 초기에는 모바일 기기가 종종 단순화된 모바일 웹사이트로 리디렉트되었어요. wap.mydomain.com과 같은 도메인 아래에서 자주 발생했죠. 이후 WAP 서비스를 유지한 사람들이 살며시 새로운 모바일 웹으로 전환했어요 (예: CNN).

![이미지](/assets/img/2024-05-01-Atalefrom30yearsofHTML_7.png)

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

노키아가 이루지 못한 것을 애플과 구글이 마침내 성취했습니다: 모바일 웹을 대중화하는 것입니다. 악명 높았던 "모바일 웹사이트"는 2012년 CSS 미디어 쿼리가 도입되면서 점차 사라지며, 웹사이트가 다양한 화면 크기, 기기 및 형식에 적응할 수 있게 되었습니다. 또한 모바일 브라우저는 훨씬 더 강력해지고, 그 아래에 있는 기기들도 마찬가지입니다. 물론 JavaScript도 포함되어 있군요.

# 2020년, 2021년, 2022년 그리고 앞으로

2020년 초반에는 웹과 웹 브라우저가 지난 수십 년간의 모든 과제를 해결했습니다. 브라우저는 이제 비디오를 스트리밍하고, 이미지와 비디오를 조작하며, 모든 종류의 장치에 적응하고, 기본적으로 브라우저에서 거의 모든 풀 애플리케이션을 실행할 수 있게 되었습니다. 심지어 브라우저가 WebAssembly로 이식된 전체 운영 체제까지 실행할 수 있을 정도입니다. HTML, CSS, JavaScript, WebAssembly 그리고 다양한 네이티브 API들이 오늘날 현대 애플리케이션의 주요 구성 요소입니다. 그리고 HTML은 그것이 웹 브라우저를 넘어서 데스크톱 애플리케이션과 모바일 앱에서도 공통 표준이 되었는데요. React Native, Electron 그리고 다양한 다른 구현을 통해 이뤄졌습니다.

브라우저는 또한 ChromeOS, Android, iOS, Windows와 같은 운영 체제에 더 많이 통합되어 가고 있습니다. 동시에 더 많은 애플리케이션이 웹과 HTML을 대규모로 활용하여 콘텐츠를 표시하고 서비스를 제공하고 있습니다. 소프트웨어 서비스로의 상승으로 현대 비즈니스 애플리케이션도 빠르게 브라우저로 이동하고 있으며, 사용자로부터 설치 부담과 복잡한 라이선싱을 해방시켜 주는 추세입니다.

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

# 아직 남아 있는 과제들

옛날에는 브라우저 테스트가 고통스러웠죠. 그리고 지금도 그렇습니다. 인터넷 익스플로러가 이제는 과거의 일이지만, 다양한 모바일 기기, 다양한 형태 요소 및 HTML5 또는 웹 API의 지원 차이는 여전히 과제입니다. 그러나 현대의 개발 환경은 매우 발전했습니다. Chrome, Safari 및 Firefox를 사용하면 데스크톱 및 모바일 기기의 이 브라우저들 간의 차이가 초기의 인터넷 익스플로러나 넷스케이프 네비게이터처럼 심각하지 않습니다.

오늘날의 웹 애플리케이션은 모바일 네트워크, 여러 네트워크를 거쳐 로밍하는 기기 및 갑작스러운 네트워크 커버리지 손실로 인한 연결 중단과 같은 문제에 대처해야 합니다. 그래서 어떤 식으로든 네트워킹과 관련된 과제들이 여전히 존재합니다.

z-index 조작의 도입은 팝업 창의 새로운 버전을 불러왔습니다. 사용자가 웹사이트의 실제 콘텐츠에 접근하지 못하게 하는 중앙 레이어가 등장했습니다. 역사는 분명히 여기서 반복되고 있습니다. 사람들은 팝업 위기로부터 아무것도 배우지 않았나요?

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

HTML, CSS 및 JavaScript의 복잡성이 증가함에 따라 새로운 소프트웨어 개발자들이 웹 개발 세계에 진입하고 Lighthouse 테스트와 같은 성능 테스트와 같은 웹 응용 프로그램 표준을 유지하기가 점점 더 어려워지고 있습니다. 오늘날의 일부 웹 사이트는 쉽게 5메가바이트 이상을 초과합니다. 과거의 성능 문제는 오늘도 여전히 해결되지 않은 채로 남아 있습니다.

# 요약 및 전망

W3C가 웹을 위한 로드맵에 더 많은 것들이 있으며, W3C는 표준화에서 매우 복잡한 도전을 해결하는 능력을 계속 증명하고 있습니다. 오늘날 웹 응용 프로그램을 구축하는 것은 이전보다는 더 유연하고 복잡해진 적이 없습니다.

오늘날 일부 사람들은 Frontend(실제 웹 앱 구축)와 Backend(앱이 통신하는 서버 측 구성 요소를 구축)을 구분하는 경향이 있습니다. 그러나 웹의 역사는 이것이 잘못된 접근법임을 증명했습니다. 예전에는 HTML이 많이 서버 측에서 생성되었고 오늘날은 비디오 및 이미지 편집과 같은 많은 작업이 빠르게 브라우저 쪽으로 이동했기 때문입니다.

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

좋은 웹 앱을 만드는 것은 React와 같은 프레임워크로 더 쉬워졌어요. JSX 같은 React 요소들이 브라우저의 표준으로 채택될 것을 기대할 수 있어요. W3C 표준에 의해 대체된 Flash와 많은 다른 기술들처럼 말이에요.

HTML, CSS, JavaScript, 그리고 웹을 위해 노력하는 모든 분들에게 더 많은 행복한 시간이 더 많이 있기를 바라요!
