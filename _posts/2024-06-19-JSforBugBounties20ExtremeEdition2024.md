---
title: "자바스크립트 버그 바운티 20 익스트림 에디션 2024"
description: ""
coverImage: "/assets/img/2024-06-19-JSforBugBounties20ExtremeEdition2024_0.png"
date: 2024-06-19 22:41
ogImage:
  url: /assets/img/2024-06-19-JSforBugBounties20ExtremeEdition2024_0.png
tag: Tech
originalTitle: "JS for Bug Bounties 2.0 Extreme Edition 2024"
link: "https://medium.com/@kongsec/js-for-bug-bounties-2-0-extreme-edition-2024-f167fa48276a"
isUpdated: true
---

안녕하세요 여러분,

인도 출신 Aditya Shende로 알려진 Kongsec입니다. 저는 바운티 헌터, 바이커, 연구원 및 트레이너입니다. 지난 5년 동안 버그 바운티에서 사람들을 교육하고 기사를 읽었을 때 항상 틈새를 발견했습니다. 무엇을 악용했는지와 어떻게 악용했는지를 공유하는 것은 매우 다릅니다. 많은 연구원들이 어떤 취약점을 악용했는지 공유하지만 어떻게 이러한 것들을 대규모로 찾을 수 있는 방법은 아직 숨겨져 있습니다.

이 기사가 사람들이 버그를 더 많이 집중하는 대신 더 많은 기술을 공유하도록 영감을 주기를 바랍니다. 물을 불 지피자 🔥

이 기사는 특별 기사를 위해 완전히 업그레이드된 버전입니다.

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

<img src="/assets/img/2024-06-19-JSforBugBounties20ExtremeEdition2024_0.png" />

안녕하세요! 아래와 같이 다양한 도구를 사용하여 점프할 수 있어요:

- hakrawler — 쉽고 빠른 웹 크롤러로, 웹 애플리케이션 내의 엔드포인트와 에셋을 빠르게 발견할 수 있어요.
- crawley — 고랭로 작성된 빠르고 기능 풍부한 유닉스 스타일 웹 스크래퍼/크롤러에요.
- katana — 차세대 크롤링 및 스파이더링 프레임워크에요.
- LinkFinder — JavaScript 파일에서 엔드포인트를 찾아주는 파이썬 스크립트에요.
- JS-Scan — php로 제작된 .js 스캐너로, URL 및 다른 정보를 크롤링하는데 사용돼요.
- LinksDumper — 응답에서 (링크/가능한 엔드포인트)를 추출하고 디코딩/정렬을 통해 필터링하는데 사용돼요.
- GoLinkFinder — 빠르고 간단한 JS 엔드포인트 추출기에요.
- BurpJSLinkFinder — 엔드포인트 링크를 패시브 스캔하는 Burp Extension에요.
- urlgrab — 웹사이트를 스패이더링하여 추가 링크를 찾는 고랭 유틸리티에요.
- waybackurls — 도메인에 대해 Wayback Machine이 알고 있는 모든 URL을 가져와요.
- gau — AlienVault의 Open Threat Exchange, Wayback Machine 및 Common Crawl에서 알려진 URL을 가져와요.
- getJS — 모든 자바스크립트 소스/파일을 빠르게 가져오는 도구에요.
- linx — JavaScript 파일 내에 숨겨진 링크를 드러내는데 사용돼요.
- waymore — Wayback Machine에서 더 많은 정보를 찾기 위한 도구에요.
- xnLinkFinder — 특정 대상에 대한 엔드포인트, 잠재적 매개변수 및 대상별 워드리스트를 찾는 데 사용되는 파이썬 도구에요.

하지만 다른 사용자와 같은 파일을 받고 있어요. 중복되는 결과를 생성하고 있어요.

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

초기 발견 내용은 다음과 같았어요

하지만 만약에 이 단어들을 대상 도메인에 대한 무차별 대입(bruteforce)해본다면 어떨까요? 아니면 당신이 추적 중인 어떤 대상에 대해서도요.

여기 테스트를 위해 수집한 기본 단어 목록이 있어요:

dialogs540f334e628dbce748a8js navigation_secondary55dfd8fe215f8edecd48js dialogsb18150a252f68f70f0c9js navigation_secondary147987372ed67d94de50js buttons147987372ed67d94de50jsnpmangular-animate8f9be52ce8a521f715a3js mainb18150a252f68f70f0c9js navigation7b5ba7de4b5e5fb011c7js dialogs147987372ed67d94de50js appmain7b5ba7de4b5e5fb011c7js main147987372ed67d94de50js buttons7b5ba7de4b5e5fb011c7jsnpmangulary-focus-store9327d7778ee0d85c3500js mainfb562f3396222d196abfjs breeze7b5ba7de4b5e5fb011c7js breezeb18150a252f68f70f0c9js breeze30886581e43164d9d721js breeze147987372ed67d94de50js navigationb18150a252f68f70f0c9js appmain147987372ed67d94de50js breezeee32c0b1526644e9b562js main7b5ba7de4b5e5fb011c7js dialogs7b5ba7de4b5e5fb011c7js navigationba64bbac173b1d655721js navigation147987372ed67d94de50js navigation_secondaryb18150a252f68f70f0c9js buttonscf9c75fee1de19837ae7js appmainb18150a252f68f70f0c9js navigation_secondary7b5ba7de4b5e5fb011c7js modalsb0f4a82ac6f25a46dc71js npmangular-ui-calendar423a597b943dc586730dns npmapollo-angular-link-httpe7a942f9925da8411a4ejsnpmangular-ui-switch90766204ecd17b03ca76js appmainaf9ea97e6139d8cd52c2js npmapollo-angular-link-http-common87eff82eb4bc194887bfjs npmapollo-angular22f1de8a666515c86242js npmapollo-cache53668769616dc1466d8js npmapollo-cache-inmemorydaeb4f1b88a15680fd12js buttonsb18150a252f68f70f0c9js npmangular-ui-bootstrapcd3d849d20f1a4f7dfacjs configjs npmattr-accept81d56f5e133bac14feb5js npmapollo-clientf1fffac92f44507c8f3ajs npmbase64-js61d2367f7816d6fec60fjs npmapollo-utilities9e092209349bda108468js npmaxiosb02cc1c0e336b6ce9d09js app147987372ed67d94de50js npmauth0b681a646eef51d083006js npmbraintree24d4f13fb9a355dadc24js npmbabel5fd8b43fabbd6864e9a2js npmcall-bind0f09a0bd48e4dac9d679js npmbreeze-client-labs03a64fb13d406c33bbc8js appaf9ea97e6139d8cd52c2js npmavailable-typed-arrays558d90654f4d4fc2aa04js npmcharacter-entities-legacy7f4022465f0c9c4a6fabjs npmblueimp-load-image3d0d2393c631d92c5a1ejs npmchartjs-color-stringbd3a54729bf6f60404afjs npmapollo-linka5d82a3252db6d3e8d15jsnpmaria-hiddena316c352eb617c047815js npmckeditorfde05d6a29366eaf2c71js npmcollapse-white-spacebdd075f4c3faca5c940fjs npmcharacter-reference-invalid2f9cdaeeea24c3f3897ejs npmbail2e238f58e0858fcf0e31js npmcolor-convert101a98cb8d9df306dc12js npmchartjs-color703b6867120bd9ebf784js npmbreeze-client75c1a11b2c8e46de7ce4js

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

위의 명령어를 사용하여 새로운 대상에 대한 단어 목록을 사용할 수 있습니다.

하는 방법은 다음과 같습니다:

waybackurls "site.com" | grep -Eo 'https?://[^/]+/[^"]+\.js' | sed 's|^https\?://[^/]\+/||' | awk -F '/' 'print $NF'

명령어의 각 부분을 살펴보겠습니다:

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

- waybackurls "example.com": 해당 명령어는 Wayback Machine 아카이브에서 "example.com"과 관련된 URL을 검색합니다.
- grep -Eo `https?://[^/]+/[^"]+\.js`: 이 명령어는 .js 확장자를 가진 URL을 검색합니다. -E 플래그는 확장 정규 표현식을 활성화하고, -o 플래그는 grep이 일치하는 부분만 출력하도록 지시합니다.
- sed `s|^https\?://[^/]\+/||`: 이 몤령어는 각 URL에서 프로토콜(http:// 또는 https://)과 도메인 이름을 제거하고 경로만 남깁니다.
- awk -F `/` `'print $NF'`: 이 명령어는 URL을 /로 분할한 뒤 각 URL의 마지막 부분을 추출하여 도메인 부분을 제거합니다.

따라서, 이 명령어를 실행하면 도메인 이름을 제외한 아카이브 스냅샷에서 추출된 .js 엔드포인트 목록이 제공됩니다. "site.com"을 원하는 도메인으로 대체하십시오.

![2024-06-19-JSforBugBounties20ExtremeEdition2024_1](/assets/img/2024-06-19-JSforBugBounties20ExtremeEdition2024_1.png)

![2024-06-19-JSforBugBounties20ExtremeEdition2024_2](/assets/img/2024-06-19-JSforBugBounties20ExtremeEdition2024_2.png)

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

일부 키워드가 새롭고 독특하다는 것을 확인할 수 있어요. 하나의 대상에서 JS 단어 목록을 정리하고 이를 새로운 대상에 활용할 수 있어요. 예를 들어,

우리는 dell.com에서 JS 단어를 얻어서 data.samsung.com에서 사용했어요. 새로운 파일들, 스택 오류, 디렉터리 목록에 유용할 거예요.

![JSforBugBounties20ExtremeEdition2024](/assets/img/2024-06-19-JSforBugBounties20ExtremeEdition2024_3.png)

우리는 최종적으로 새로운 대상에서 매우 새로운 JS 파일들을 얻을 수 있어요. 크기, 데이터 유형, 내용 등을 기준으로 정렬할 수 있어요.

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

동일한 키워드를 쇼단에서 얻은 IP에 적용할 수 있습니다.

![이미지1](/assets/img/2024-06-19-JSforBugBounties20ExtremeEdition2024_4.png)

![이미지2](/assets/img/2024-06-19-JSforBugBounties20ExtremeEdition2024_5.png)

나머지 공격은 마찬가지지만 작은 수정점이 있습니다.

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

curl -s https://app.site.com/config.js |
grep -E “environment: ‘Production’|storageUrl: ‘https://buildxact.blob.core.windows.net/’|googleApiKey: ‘|appInsightsInstrumentationKey: ‘|globalApiEndpoint: ‘|streamChatApiKey: ‘|auth0ClientId: ‘|auth0Domain: ‘|flatfileApiKey: ‘|webSpellCheckerServiceId: ‘|webSpellCheckerServiceUrl: ‘|clientPortalUrl: ‘|appVersion: ‘|appVersionDate: ‘|appDomainUrl: ‘|oneBuildKey: ‘|flatfilePlatformPublishableKey: ‘|flatfilePlatformEnvironmentId: ‘“ |
sed “s/._’\([^']_\)’.\*/\1/”

We can add the words which we think are sensitive here:

Example:

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

아래는 Markdown 형식의 표입니다.

| 변수명                          | 값  |
| ------------------------------- | --- |
| ANACONDA_TOKEN                  |     |
| ANALYTICS                       |     |
| ANDROID_DOCS_DEPLOY_TOKEN       |     |
| android_sdk_license             |     |
| android_sdk_preview_license     |     |
| ANSIBLE_VAULT_PASSWORD          |     |
| aos_key                         |     |
| aos_sec                         |     |
| API_KEY_MCM                     |     |
| API_KEY_SECRET                  |     |
| API_KEY_SID                     |     |
| API_KEY                         |     |
| API_SECRET                      |     |
| APIARY_API_KEY                  |     |
| APIDOC_KEY                      |     |
| APIGW_ACCESS_TOKEN              |     |
| apiKey                          |     |
| apiSecret                       |     |
| APP_BUCKET_PERM                 |     |
| APP_ID                          |     |
| APP_NAME                        |     |
| APP_REPORT_TOKEN_KEY            |     |
| APP_SECRETE                     |     |
| APP_SETTINGS                    |     |
| APP_TOKEN                       |     |
| appClientSecret                 |     |
| APPLE_ID_PASSWORD               |     |
| APPLE_ID_USERNAME               |     |
| APPLICATION_ID_MCM              |     |
| APPLICATION_ID                  |     |
| applicationCacheEnabled         |     |
| ARGOS_TOKEN                     |     |
| ARTIFACTORY_KEY                 |     |
| ARTIFACTORY_USERNAME            |     |
| ARTIFACTS                       |     |
| ARTIFACTS_AWS_ACCESS_KEY_ID     |     |
| ARTIFACTS_AWS_SECRET_ACCESS_KEY |     |
| ARTIFACTS_BUCKET                |     |
| ARTIFACTS_KEY                   |     |
| ARTIFACTS_SECRET                |     |
| ASSISTANT_IAM_APIKEY            |     |
| ASYNC_MQ_APP_SECRET             |     |

JS URL을 얻으면 nuclei 노출 태그를 사용하여 더 많은 민감한 정보를 얻을 수 있습니다.

js.txt 파일에서 노출 태그를 사용하여 Nuclei 명령을 실행하려면 다음 명령어를 사용하실 수 있습니다:

```bash
nuclei -l js.txt -t ~/nuclei-templates/exposures/ -o js_exposures_results.txt
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

위 명령어 각 부분에 대한 설명입니다:

- nuclei: 이것은 빠르고 사용자 정의 가능한 취약점 스캐너 인 Nuclei를 실행하는 명령어입니다.
- -l js.txt: -l 플래그는 Nuclei와 함께 스캔할 URL 목록이 포함된 파일(js.txt)을 지정합니다.
- -t ~/nuclei-templates/exposures/: -t 플래그는 노출 태그에 대한 Nuclei 템플릿 디렉터리 경로를 지정합니다. 실제 Nuclei 템플릿이 저장된 경로에 맞게 경로 ~/nuclei-templates/exposures/를 조정하십시오.
- -o js_exposures_results.txt: -o 플래그는 스캔 결과가 저장될 출력 파일(js_exposures_results.txt)을 지정하는 데 사용됩니다. 원하는 출력 파일 이름으로 js_exposures_results.txt를 대체할 수 있습니다.

Exploitation은 동일하게 유지되며 이 문서를 참조할 수 있습니다. 읽어 주셔서 감사합니다.

Jai Shree Ram
