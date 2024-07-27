---
title: "1999년에 개인 웹사이트를 만드는 방법"
description: ""
coverImage: "/assets/img/2024-05-14-Howtocreateapersonalwebsitebutits1999_0.png"
date: 2024-05-14 15:47
ogImage: 
  url: /assets/img/2024-05-14-Howtocreateapersonalwebsitebutits1999_0.png
tag: Tech
originalTitle: "How to create a personal website, but it’s 1999"
link: "https://medium.com/@mihauco/how-to-create-a-personal-website-but-its-1999-48283b1f5be4"
---


20년 전 웹 개발자의 삶이 어땠는지, 인터넷이 여전히 새로운 개념이었고 웹에 접속하기 전에 이상한 비프음과 부우우우음을 들어야 했던 시절에 JavaScript와 CSS는 궁금한 것 이상의 것이었으며 간단한 웹사이트를 만드는 데 흔히 사용되는 것보다 eer바나 클 친 인터넷익스플로러가 가장 인기 있었던 시기란게 궁금했나요? 아마도 그렇지 않았을 것입니다... 하지만 여유로운 몇 분이 있고 쓸데없는 새로운 것을 배우고 싶다면 — 이 ㄱㄷㄷ은 당신을 실망시키지 않을 겁니다!

![이미지](/assets/img/2024-05-14-Howtocreateapersonalwebsitebutits1999_0.png)

# 배경 이야기

2022년 초에 향수에 젖어 어린 시절에 즐겨했던 게임(왕자와 겁쟁이 — 폴란드의 포인트 앤 클릭 게임이고, 맞아요, 저는 폴란드 출신입니다)을 하나 하고 싶어졌어요. 원본 게임 CD는 있었지만 실행할 수 있는 기계가 없었죠. 옛 스타일의 윈도우 PC에서 플레이하는 것이 더 재미있을 것 같아서, 내게 맞는 회사/중고 상품 웹사이트/온라인 시장을 통해 오랜만에 사용되는 기기(그리고 소프트웨어 — 윈도우 98)를 구매하고, 나를 위해 하나 짓기로 결심했어요... 어쨌든 제가 어떻게 만들었는지와 어떤 문제를 겪었는지에 대해서는 다음 이야기로 남겨둘게요.




![게임을 완료한 후, 그리운 옛 마음은 사라지고 자리를 차지하고 먼지를 모으는 것들을 남겼어요. 이 PC에서 웹 개발을 시도해보자는 아이디어가 갑자기 떠올랐지만, 항상 더 좋은 일이 있는 것 같아요. 그래서 이 아이디어는 뒷전으로 밀려나 시간이 지난 후, 이 글을 쓰기로 결심했어요.

# 1999

그때 당시 저는 10살이었고, 적어도 3년 정도의 Microsoft Windows 운영 체제 경험이 있었죠. 웹 개발 여정은 2000년 초반에 시작했을 것이라고 확신하고 있어요. 처음으로 Macromedia Dreamweaver(2005년 Adobe가 Macromedia를 인수했어요)를 사용했고, CSS 없이 테이블 기반 레이아웃과 인터넷에서 복사한 JS 코드를 사용해 눈 오는 효과와 같은 트렌디한 효과를 적용한 "프로젝트"를 했어요.




1999년에는 인터넷 자체가 나에게는 신비로웠어요. 아마 들어본 적은 있고 무엇인지 알았겠지만, 실제로 처음 접촉한 것은 21세기에 들어서였어요.

![1999 이미지](/assets/img/2024-05-14-Howtocreateapersonalwebsitebutits1999_2.png)

세상에서는 무슨 일이 벌어졌을까요? 유럽 연합이 새 통화인 유로를 도입했어요. 빌 클린턴은 미국 대통령이었죠. 세계 기상 기구는 90년대가 역대 가장 덥다(평균 온도를 얘기하죠)고 발표했어요. 스펀지밥 네모바지가 니켈로디언에서 데뷔했죠. 에미넴이 'The Slim Shady LP'를 발표했어요. '매트릭스'나 '스타워즈: 에피소드 1 - 마이너카의 위협' 같은 영화들이 세계 프리미어를 가졌죠.

![1999 이미지](/assets/img/2024-05-14-Howtocreateapersonalwebsitebutits1999_3.png)



모든 사람들이 천년 기리일 버그에 대해 이야기했어요. 2000년은 날짜 형식 문제로 인한 전 세계 컴퓨터 아포칼립스를 가져올 예정이었죠. 그래서, 이미 만들지 않은 경우에는 1999년이 개인 웹사이트를 만들기 마지막 기회였어요.

# 프로젝트

무엇을 할 건가요? 세 가지 탭을 갖춘 간단한 개인 웹사이트를 만들 거에요 — 홈(방문자에게 인사하기), 소개(간단한 소개) 및 연락(일부 연락처 정보). 레이아웃은 매우 복잡하지 않아도 괜찮아요 — 상단에 헤더(제목과 탭 탐색이 포함됨), 하단에 푸터, 그리고 탭 내용 영역이 사이에 위치하면 되요.

![이미지를 참조하세요](/assets/img/2024-05-14-Howtocreateapersonalwebsitebutits1999_4.png)



최대한 CSS를 활용하고, 탭 간 전환은 JavaScript를 사용하여 구현하고 싶습니다. 서브페이지는 없을 것이며, HTML 인덱스 파일 하나, JS 파일 하나, CSS 파일 하나, 이미지 파일 몇 개(두 개)로 구성될 것입니다. 프로젝트 트리 구조는 다음과 같습니다:

```js
project-root/
├── assets/
│   ├── scripts.js
│   ├── styles.css
|   ├── bg.gif (페이지의 배경으로 사용됨)
|   └── mk.jpg (제 얼굴이 있는 about 섹션용 이미지)
|
└── index.html
```

해당 페이지는 그때 시점에서 이용 가능한 모든 (두 개의) 중요 브라우저인 MS Internet Explorer 5 및 Netscape Navigator 4.51에서 잘 작동하고 멋지게 보여야 합니다.

# 도구



클래식 스타일로 가서 웹 사이트의 모든 코드를 MS 메모장에 작성할 수도 있습니다. 그러나 조금 더 전문적으로 하기 위해 실제 코드 편집기를 사용합시다. 처음에는 Notepad++를 선택할 생각이었지만, 2003년에 출시되었으므로 1999년에는 존재하지 않았습니다. 내 마음속에는 1996년부터 제공되었던 폴란드어 코드 편집기인 Pajączek (스파이더)이 그렇게 욕심이 났었지만, 폴란드어로만 제공되고 무료가 아니었던 것으로 기억합니다. 구글과 위키피디아에서 몇 분동안 검색한 후에 Arachnophilia를 발견했습니다. 1996년에 출시된 이 툴은 무료이고 영어로 되어 있으며 이름도 거미와 관련이 있습니다. 이 정도면 충분합니다.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*fHIISJOsPFdxcPnjQsnCgw.gif)

내 Windows 98은 프리인스톨된 인터넷 익스플로러(v5.0)가 함께 있었지만, 다른 앱들을 얻어야 했습니다 — 넷스케이프 네비게이터와 아라크노필리아. 당연히 23년 전에 사용 가능했던 버전이어야 했습니다. 옛 소프트웨어를 찾는 것은 어렵지만 일반적으로 oldversion.com이 시작하기에 좋은 장소입니다. 유감스럽지만 그 사이트에 접속하려고 할 때 며칠 동안 다운되었으며, 그것이 완전히 없어진 것으로 확신했습니다. 그러나 이 단어들을 입력하는 동안, 현재 그것이 다시 온라인 상태인 것처럼 보입니다.

그럼에도 불구하고 다른 곳에서 검색해야 했습니다. "Netscape 4.5 다운로드"와 같은 구글에 입력된 구문은 첫 번째 페이지에서 만족스러운 결과를 제공하지 않을 뿐 아니라 전혀 만족스럽지 않을 것입니다. 따라서 주변을 더 들여다봐야 했습니다. 결국, archive.org 페이지에서 필요한 정보를 제공해주는 것을 찾을 수 있었고, 1999년 5월에 제공된 apcmag.cd 디스크 이미지를 발견했습니다. 이 이미지에는 Netscape Navigator v4.51과 Arachnophilia v3.9가 포함되어 있었습니다.



![링크 이름](/assets/img/2024-05-14-Howtocreateapersonalwebsitebutits1999_5.png)

내 초기 큰 계획은 로컬 서버를 사용하고 웹사이트를 로컬호스트에서 실행하는 것이었습니다(심지어 Windows 98에 Apache와 PHP를 설치하는 방법에 대한 오래된 기사를 찾았어요). 그러나 이 정도 규모의 프로젝트에는 좀 압도당하는 느낌이었고, 결국 그 아이디어를 포기했어요. 어쩌면 언젠가는 더 고급스러운 레트로 웹 요소를 사용하는 백엔드 로직이 필요한 프로젝트에 도전할지도 모르겠지만, 현재로서는 프론트엔드에만 집중할 거예요.

# Arachnophilia

내가 선택한 코드 에디터에 대해 간단히 얘기해보죠. 이것은 예전에는 꽤 좋게 여겨졌을지도 모르지만, 지금은 조금 싸구려 느낌이에요. 그럼에도 불구하고 일반적인 MS 메모장보다는 더 많은 것을 제공해줘요 — HTML 기본 구문 강조 기능과 미리보기 기능이 있어요(버튼을 클릭하면 Arachnophilia가 현재 HTML 코드를 임시 파일에 저장하고 IE에서 미리보기를 열어줘요; 페이지를 저장할 때마다 다시 불러오는 기능을 제공한다고 주장하지만, 불행히도 그 기능은 제게는 작동하지 않았어요).



![이미지](/assets/img/2024-05-14-Howtocreateapersonalwebsitebutits1999_6.png)

JS 및 CSS 파일을 지원하지는 않지만, .js 또는 .css 확장자가 있는 txt 파일로 만들어 코드를 작성할 수 있어요.

새 HTML 파일을 만들 때 페이지 제목, 텍스트 및 링크 색상을 설정할 수 있는 프롬프트 창이 나타납니다. 입력하신 내용에 따라 Arachnophilia가 초기 HTML 코드를 생성해줘요. 제목이 head 섹션에 설정되고, 텍스트와 링크 스타일이 body 태그의 속성으로 추가됩니다 (그냥 그대로 남길 건 아니에요).

초기 HTML 코드는 대문자 태그 이름으로 작성되어 있는데, 이 올드 스쿨 느낌이 나쁘지 않아요. 그대로 따라해 볼게요. 물론 자동 들여쓰기는 없답니다.




![Website Screenshot](/assets/img/2024-05-14-Howtocreateapersonalwebsitebutits1999_7.png)

# 먼저 로직을 고민해보세요

전체 페이지를 구현하기 전에 JavaScript로 무엇을 할 수 있는지 알아보고 싶어요. 제 목표는 JS로 제어되는 탭을 만드는 거에요. 네비게이션 링크를 클릭하면 해당 탭이 표시되고 다른 탭은 숨겨져야 해요.

먼저 인터넷 익스플로러에 집중했어요. 개발 도구도 JS 콘솔도 없어요. 뭔가 에러가 나오면 IE는 하단 표시줄에 경고 아이콘을 보여주는데, 그것을 더블 클릭하면 더 자세한 정보를 확인할 수 있어요 — 에러 메시지와 발생 위치가 표시돼요.





![이미지](/assets/img/2024-05-14-Howtocreateapersonalwebsitebutits1999_8.png)

나는 익숙치 않은 것이지만 여전히 상당히 도움이 되었어. 문제가 있을 때 구글링을 해보면 대부분 해결책을 찾을 수 있었어 (결과는 잊혀진 포럼에 있는 오래된 글들을 가리킴) 아니면 caniuse.com을 사용해서 해당 메소드가 사용 가능한지 알아볼 수 있었어 (해당 사이트는 IE v6 이상만 나열하지만 내 경험 상 "6-8"로 표시된 경우 IE v5에서도 작동했어).

![이미지](/assets/img/2024-05-14-Howtocreateapersonalwebsitebutits1999_9.png)

여기에는 Internet Explorer 5를 위한 PoC JavaScript 개발 중 발견한 몇 가지 사항이 있어:




- getElementsByClassName은 지원되지 않지만 getElementsByName은 잘 작동합니다 (따라서 모든 네비게이션 링크를 선택하는 데 사용했습니다)...
- ... 하지만 DIV로는 작동하지 않았습니다 (따라서 탭 콘텐츠를 선택하는 데 사용할 수 없었습니다),
- addEventListener는 존재하지 않지만 IE에는 해당하는 방법이 있습니다 — attachEvent— 적어도 두 개의 인수를 사용해야 합니다 — 이벤트 이름 (그러나 on으로 시작해야 하며, 예: click 대신에 onclick) 및 콜백 (이벤트 객체를 인수로 받지 않습니다),
- anchorElement.getAttribute(`href`)은 href 속성에 할당된 값만이 아닌 전체 URL 경로를 반환합니다 (따라서 속성에 #foobar와 같은 값이 지정된 경우 로컬에서 C:\\…\#foobar와 같은 결과가 나올 것입니다)

제가 탭 컨셉을 테스트하기 위해 작성한 HTML입니다:

```js
<A href="#tab0" tab="tab0" name="link">링크 1</a>
<A href="#tab1" tab="tab1" name="link">링크 2</a>
<A href="#tab2" tab="tab2" name="link">링크 3</a>
<DIV id="tab0">콘텐츠 1</div>
<DIV id="tab1" style="display: none;">콘텐츠 2</div>
<DIV id="tab2" style="display: none;">콘텐츠 3</div>
```

보다 의미론적으로 유지하기 위해 href 속성을 유지했지만, JS에서 탭 ID를 쉽게 가져오기 위해 사용자 정의 속성 tab이 필요했습니다.



그리고 탭 간 전환을 제어하는 JavaScript 코드가 여기 있어요:

```js
var tabLinks = document.getElementsByName('link');
var currentOpenTabElement = document.getElementById('tab0');

for (var i = 0; i < tabLinks.length; i++) {
 tabLinks[i].addEventListener('click', createOnClickHandler(i));
}

function createOnClickHandler(tabLinkIndex) {
 var tabLink = tabLinks[tabLinkIndex];
 var tabId = tabLink.getAttribute('tab');
 
 return function() {
  openTab(tabId);
 }
}

function openTab(tabId) {
 var tab = document.getElementById(tabId);
 currentOpenTabElement.style.display = 'none';
 tab.style.display = '';
 currentOpenTabElement = tab;
}
```

그리고 솔직하게 말하자면 — 놀랍네요. 코드가 꽤 잘 작성되어 있고 제가 원하는 대로 작동합니다(탭 간 전환). 1999년, 인터넷 익스플로러이고 작동합니다. 정말 놀랍네요.

# 넷스케이프 네비게이터 — 첫 영향



내 코드가 인터넷 익스플로러에서 작동한다면, 넷스케이프 브라우저에서 어떤 문제가 발생할 수 있을까? — 나 자신에게 물었습니다. 90년대에는 심지어 가장 인기 있는 브라우저였지만, 나중에 인터넷 익스플로러에 밀려난 후에도 걱정할 것이 없다고 확신했습니다. 그래서 넷스케이프 네비게이터에서 내 페이지를 열어 보았더니...

...탭 컨트롤이 작동하지 않았습니다.

내 첫 번째 추측은 attachEvent가 인터넷 익스플로러 전용 기능이기 때문에 넷스케이프에서 작동하지 않을 것이라는 것이었습니다. 하지만 어떻게 확인할 수 있을까요? 넷스케이프에서 JS 오류 메시지를 출력하는 위치가 있을까요? JS 콘솔이 있을까요? 아니요. IE와 같이 하단 표시줄에 정보가 표시되는가요? 아니요. JS 코드를 실행할 때 문제가 발생했음을 나타내는 표시가 있나요? 음... 작동하지 않으니 어떤 종류의 피드백이지만, 아니요, 없습니다.

그렇다면 넷스케이프 네비게이터 4.51에서 JavaScript를 디버깅하는 방법은 무엇일까요? 여러분이 직접 에러 처리를 해야 합니다 — 에러 메시지를 포함한 경고 창을 호출하는 window.onerror 핸들러를 추가하면 됩니다 (이 점은 제가 스스로 생각한 것이 아니라 여기에서 찾았습니다).



<img src="/assets/img/2024-05-14-Howtocreateapersonalwebsitebutits1999_10.png" />

앗, 그래서 getElementsByName은 넷스케이프 시대에 존재하지 않았어요. 그럼 getElementsByClassName은 어때요? 아니요. 아마 getElementById는 최소한 있겠지요? 아니요. 넷스케이프 네비게이터는 '아니요'만 있는 건가요? 아뇨, 그러나 분명히 많은 것들을 막아요.

caniuse.com에서 지원 정보를 찾을 수 없어요. 인터넷에 남아 있는 것으로만 제한돼요. 다행히도 여기 유용한 리소스가 하나 있어요 — 1999년에 발행된 넷스케이프 커뮤니케이션즈 코퍼레이션의 Client-Side JavaScript 참조서(버전 1.3). 제가 사용할 수 있는 것에 대한 어떤 아이디어를 제공해줬어요. 오, 넷스케이프 버전의 JavaScript는 완전히 다른 이야기 같아요. document.ids나 document.classes와 같은 컬렉션이 있긴 하지만 — 보통은 몇 가지 기본 스타일을 설정할 수 있지만, 브라우저가 페이지를 로드할 때 단 한 번만 할 수 있어요.

제 아이디어는 클릭 핸들러를 부착하는 것을 담당하는 onClick 속성을 사용하는 것이었어요(크로스 브라우저 솔루션이라서요). 그러나 작동하지 않았어요. 다시 한 번, 구글 삼촌에게 기대야 했어요. 몇 개의 오래된 기사를 찾았지만 대부분이 제게 아무 방향도 제시하지 않았어요. 마침내 제 날을 구해 준 이 기사를 찾았어요. 넷스케이프는 페이지 내 요소를 위치시키고 애니메이션을 주려고 만든 자체 레이어 HTML 태그를 소개했어요.



`layer` 태그의 유일한 문제는 CSS의 절대 위치 지정과 같은 동작 방식을 가지고 있다는 것입니다 (부모 레이어나 창을 기준으로). 다행히 `ilayer` 태그도 있습니다. 이것은 인라인 레이어입니다. 더 유용할 수 있지만 여전히 한 가지 작은 문제가 있습니다 - 레이어의 가시성 속성이 CSS 가시성 속성처럼 작동한다는 것이죠. 이는 요소를 숨길 수 있지만 여전히 공간을 차지한다는 것을 의미합니다. 결과적으로 첫 번째 탭은 원하는 위치에 표시되지만 다른 탭들은 아래에 나타나 버리고 이는 보기 좋지 않을 것입니다. 이를 해결하기 위해 올바른 위치로 이동시키기 위해 음수의 상단 속성 값을 사용해야 합니다. 휴...

그러면 크로스 브라우저 버전은 어떻게 보일까요? 먼저, 넷스케이프 브라우저인지 확인하기 위해 문서의 `head`에 일부 인라인 스크립트를 추가해야 했습니다:

```js
<SCRIPT>
   var probablyNetscape = !!document.layers && !!document.classes && !!document.ids;
</SCRIPT>
```

왜 페이지를 방문하는 브라우저를 확인하기 위해 navigator 속성을 사용하지 않았을까요? navigator.appName은 Netscape를 반환합니다. 그런데 2023년에는 Chrome도 반환합니다. navigator.userAgent는 Mozilla v4.51을 반환하는데, 이것은 더 구체적이지만 완전히 신뢰할 수 없습니다. document가 layers와 같은 속성을 가지고 있는지 확인하면, 이 속성들은 완전히 넷스케이프와 관련된 것들이므로 더 신뢰할 수 있습니다.



어쨌든 - 나는 scripts.js 파일과 HTML에서 probablyNetscape인지를 사용할 거야. HTML에 대해 얘기하면, 여기 있어:

```js
<A href="#tab0" onClick="tabLinkClickHandler('tab0')">링크 1</A>
<A href="#tab1" onClick="tabLinkClickHandler('tab1')">링크 2</A>
<A href="#tab2" onClick="tabLinkClickHandler('tab2')">링크 3</A>
<DIV>
  <ILAYER name="tab0" style="display: block;">
    <DIV id="tab0">콘텐츠 1</DIV>
  </ILAYER>
  <ILAYER name="tab1" visibility="hide" style="display: block;">
    <DIV id="tab1">콘텐츠 2</DIV>
  </ILAYER>
  <SCRIPT>if (!probablyNetscape) {document.getElementById('tab1').style.display = 'none';}</SCRIPT>
  <ILAYER name="tab2" visibility="hide" style="display: block;">
    <DIV id="tab2">콘텐츠 3</DIV>
  </ILAYER>
  <SCRIPT>if (!probablyNetscape) {document.getElementById('tab2').style.display = 'none';}</SCRIPT>
</DIV>
```

보다시피, 내가 사용한 일부 인라인 스크립트로 브라우저가 Netscape가 아닌 경우에 초기에 숨겨져야 하는 탭에 display: none 스타일을 추가했어. 이걸 한 이유는 Netscape Navigator에서 JS로 display 속성을 수정하는 기능이 제대로 작동하지 않기 때문에(따라서 제거할 수 없었어), 그리고 가능한 빨리 저런 탭들을 숨기고 싶었기 때문이야(scripts.js가 로드되기 전에).

visibility나 top 같은 `ILAYER` 속성들은 Netscape에서만 이해될 거야. 다른 브라우저들은 이를 무시할 거야 (응, IE 5는 이를 무시하니까, 미래 브라우저들도 그럴 걸 바래).



탭 탐색을 위한 링크에는 클릭 핸들러가 할당된 onClick 속성이 있습니다. 이 클릭 핸들러는 scripts.js 파일에 정의되어 있어요:

```js
var activeTab = 'tab0';

if (probablyNetscape) {
  window.onerror = function(message, file, line) {
   alert('JavaScript error!\nFile: ' + file + '\nLine: ' + line + '\nMessage: ' + message);
  }

  // Netscape Navigator에서 레이어의 위치 설정
  document.layers.tab1.top = -38;
  document.layers.tab2.top = -76;
}

function tabLinkClickHandler(tab) {
  if (tab === activeTab) return;

  if (probablyNetscape) {
    document.layers[activeTab].visibility = 'hide';
    document.layers[tab].visibility = 'show';
  } else {
    document.getElementById(activeTab).style.display = 'none';
    document.getElementById(tab).style.display = 'block';
  }
 
  activeTab = tab;
}
```

아, 그리고 알아요 — 누군가가 스크립트 파일이 로드되기 전에 링크를 클릭하면 오류가 발생할 거라는 거, 그러니까 이 시점에서 제 스크립트 코드를 단순히 index.html 파일에 모두 넣을 수도 있지만... 전 그냥 이렇게 하고 싶어요.

그리고 이제... 웹 브라우저 간의 개념 증명이 동작하는 레이아웃과 CSS 스타일링 작업을 할 시간이 왔어요! 아하 — Netscape Navigator 덕분에 조금 짜증이 나긴 했지만요. 지금은 편안한 파트인 레이아웃과 CSS 스타일링을 하는 시간이죠!



# 잘 하고 있어요

배운 것이 있어요 — IE5를 위해 특별히 무언가 개발한 다음에 Netscape Navigator에 맞추려고 하면 완전히 다른 코드를 얻게 될 것 같아요. 처음부터 두 브라우저에서 모두 작동하는 솔루션을 찾아야 한다는 걸 이해했어요.

사용하고 싶은 HTML 구조와 CSS 스타일에 대한 아이디어가 있어서, 크로스 브라우저화를 위해 차근차근 작업하기 시작했어요. 이제 1999년에 HTML 레이아웃을 스타일링하는 미친 듯한 이야기를 들려줄게요.

마진 왼쪽과 오른쪽을 자동으로 설정하여 요소를 가운데 정렬하는 것은 작동하지 않아요. `center` 태그나 `align="center"` 속성이 있는 `div`의 두 가지 가능한 해결책이 있어요. 이 요소는 페이지 내용 컨테이너를 감싸야 해요 (너비는 480픽셀로 설정된 상태지요). 양쪽 브라우저에서도 내용을 가운데 정렬하기 위해서 IE는 후손의 내용도 가운데 정렬하기 때문에 페이지 컨테이너에 왼쪽으로 정렬 속성을 설정할 수 있어요. 하지만 Netscape는 전체 컨테이너를 왼쪽으로 이동시키기 때문에 이를 올바르게 만들려면 (내용은 왼쪽에 있지만) 왼쪽으로 정렬된 세 번째 컨테이너가 필요해요. 이해를 돕기 위한 코드를 여기에 제시할게요:



```js
<DIV align="center">
  <!-- styles.css에서 너비가 480픽셀로 설정되어 있음 -->
    <DIV class="page-container">
      <DIV align="left">...</DIV>
    </DIV>
</DIV>
```

CSS 플렉스박스 (그리드 시스템도 마찬가지)는 항상 사용 가능했던 것은 아니었습니다. 웹 개발을 한지 ~10년 이상이 된다면 아마도 그리드 레이아웃을 만들기 위해 개발자들이 float 속성을 사용했다는 것을 기억하실 것입니다 (Bootstrap도 그렇게 했습니다). 원래 float를 그 용도로 사용하도록 의도되지 않았지만, 개발자들이 그것을 웹사이트 레이아웃 스타일링 역사에서 상당히 중요한 위치에 부여해 왔다고 생각합니다.

어쨌든, 탭 컨트롤(링크)을 정렬하기 위해 float를 사용했습니다. 여기에는 ul 및 li 태그를 사용하고 싶었지만, Netscape는 float와 목록 요소 조합을 좋아하지 않는 것 같습니다... 게다가, anchor 태그에 직접 float 스타일을 사용하면 모든 기본 앵커 스타일이 제거될 것입니다 (Netscape에 대해서 말하는 것이고, IE에서는 모두 잘 작동합니다). DIV 기반의 목록을 사용하게 되었습니다.

<img src="/assets/img/2024-05-14-Howtocreateapersonalwebsitebutits1999_11.png" />




CSS로 설정된 DIV의 배경색은 넷스케이프 네비게이터 v4.51에서 심각한 문제입니다. CSS border 속성을 none으로 설정하지 않으면 (또는 다른 방법으로 설정하면, 그냥 테두리 스타일이 필요합니다) DIV 내부의 텍스트만 원하는 배경색이 적용됩니다 (일종의 텍스트 강조 스타일처럼).

![이미지1](/assets/img/2024-05-14-Howtocreateapersonalwebsitebutits1999_12.png)

![이미지2](/assets/img/2024-05-14-Howtocreateapersonalwebsitebutits1999_13.png)

배경 이미지를 설정하려고 하니 또 다른 머리 아픔이 들었습니다. IE는 이미지(bg.gif) 경로가 styles.css 파일과 상대적이어야 하며 (그래서 url(`bg.gif`)이 괜찮음), 그러나 넷스케이프는 index.html 파일을 기준으로 상대적이어야 한다고 예상합니다 (url(`assets/bg.gif`)). 여기서 가장 간단한 해결책은 body 스타일 속성에서 배경을 직접 설정하는 것입니다 (물론 index.html을 기준으로 경로 설정 필요).



내비게이션 작업 중에는 연결된 탭이 열릴 때 링크 스타일을 변경하고 싶었어요. Netscape의 제한 때문에 (i)layer 태그를 사용해야 했고, HTML을 수정하는 중에 Netscape가 치명적인 오류를 일으켰어요.

```js
...
<div class="tab-control">
  <ilayer name="start-link" class="tab-control-layer">
    <div class="tab-control-inner">
      <a href="#start" id="start-link">시작</a>
    </div>
  </ilayer>
</div>
...
```

아마도 CSS와도 관련이 있었던 것 같아요. 하지만 그 부분은 확인하지 않았어요.

<img src="/assets/img/2024-05-14-Howtocreateapersonalwebsitebutits1999_14.png" />



다음 문제는 여백입니다. 좀 더 명확하게 하죠: 넷스케이프 네비게이터 v4.51의 여백에 대해 말이죠. 모든 곳에 margin: 0을 설정할 수 있지만 넷스케이프는 신경쓰지 않아요. 그저 더 잘 알고 있는 거죠. 여백이 반드시 필요한거거든요. 물론 해결책은 있어요 — 음수 값 사용하기. 그러나 이렇게 하면 다른 브라우저(IE)에도 영향을 미치고, 다른 브라우저들은 'ZERO는 ZERO' 라는 거 알거든요. 여백은 없어! 넷스케이프, 너 뭘 하는 거야?

![이미지](/assets/img/2024-05-14-Howtocreateapersonalwebsitebutits1999_15.png)

이 순간에 저는 넷스케이프 버전의 사이트를 내가 원하는 만큼 잘 만들지 못할 거라고 깨달았어요. 그래서 따로 스타일을 사용해야 했죠. 어떻게 구분할까요? 첫 번째 생각은 넷스케이프 브라우저가 아닐 때 body에 추가적인 클래스를 JavaScript로 추가하는 거였는데 (넷스케이프 JS 버전에서 클래스 이름을 설정할 수 없어요), 그러나 넷스케이프 네비게이터 4가 너무 망가져 있어서, 무시될 스타일이 쉽게 설정될 수 있다는 걸 알게 됐어요. html을 하위 선택자로 사용하면 될 거에요, 왜냐하면 넷스케이프는 이걸 유효한 것으로 인식하지 않거든요.

나의 페이지를 위해 CSS를 작업하면서 넷스케이프 네비게이터 4에는 얼마나 많은 것들이 망가져 있는지 깨달았어요. 예를 들어, 모든 선택자는 한 번만 사용할 수 있고, 복합 선택자는 환영받지 않아요(.class.with-other-class 같은 것은 통하지 않아요).



위 이미지에서 보이는 탭 링크들 사이의 공백을 제거할 수 없었어요.

물론 Internet Explorer 5도 몇 가지 예상치 못한 동작이 있어서 완벽하지 않지만, Netscape Navigator 4는 정말 순수한 미쳤다고 해야 할까요.

IE에 대해 이야기하자면 – 페이지 제목 아래 왼쪽에서 오른쪽으로 계속 슬라이딩하는 캐치프레이즈 (Welcome to 1999!)의 간단한 애니메이션을 구현하고 싶었어요. 그 목적으로 setInterval을 사용했는데, 콜백으로 익명 함수를 전달하면 IE가 몇 초 후에 크래시되는 문제가 발생했어요.

```js
// IE5 KILLER
setInterval(function() {...}, 100);
```



md
![198.png](/assets/img/2024-05-14-Howtocreateapersonalwebsitebutits1999_16.png)

함수를 먼저 정의하고, 그 후에 setInterval에 전달하는 것이 올바른 방법입니다.

```js
// 잘했어요!
function animateCatchphrase() {...}

setInterval(animateCatchphrase, 100);
```

내 예상은 익스플로러가 익명 함수의 경우 메모리 관리에 문제가 있는 것 같습니다. 넷스케이프 네비게이터는 이런 문제가 없네요. 멋진 일이죠 넷스케이프, 그리핀도르에 10 포인트 들어가요.




# 마침내

내 1999페이지 프로젝트 작업 중 겪은 모든 문제를 설명하고 싶다면 책을 쓰는 수밖에 없을 것 같아. 이미 가장 흥미로운(짜증나는) 부분을 이미 알려준 것 같아. 하지만 믿어줘 — 당연히 더 많은 문제가 있어, 예를 들어 단락 스타일링 문제 — 이 경우에 나는 빨리 포기하고 DIV 대신 사용했어.

어쨌든 몇 시간을 투자한 후에 내 페이지는 준비되었고 인터넷 익스플로러 5와 넷스케이프 네비게이터 4.51에서 작동했어.

페이지를 실행하는 데 필요한 모든 파일의 총 크기는 ~42KB(압축되지 않은 html, css, js 및 두 이미지)야. 1999년도 인터넷 연결 평균 속도에 대한 신뢰할만한 정보를 찾을 수 없어서, 1990년대 후반에 56 kbit/s 속도를 달성할 수 있는 전화 기반 모뎀을 사용하여 데이터를 모두 받는 데 걸리는 시간을 계산해보자 — 그런 종류의 장치(최대 속도로 작동 중인)로는 모든 데이터를 가져오는 데 6초가 걸릴 것이야. 1999년에는 아마 수용 가능했을 거야.



전체 코드를 여기에 붙여 넣지 않을 거예요 (길고 지루하거든요), Github 저장소 링크는 아래 어딘가에 있을 걸거에요. 이제 윈도우 98에서 촬영한 페이지의 몇 가지 스크린샷을 보겠습니다.

## 인터넷 익스플로러 5

![인터넷 익스플로러 5](/assets/img/2024-05-14-Howtocreateapersonalwebsitebutits1999_17.png)

![인터넷 익스플로러 5](/assets/img/2024-05-14-Howtocreateapersonalwebsitebutits1999_18.png)




![이미지](/assets/img/2024-05-14-Howtocreateapersonalwebsitebutits1999_19.png)

정말로 Internet Explorer에서 어떻게 끝났는지 정말로 자랑스럽다고 말해야겠어. 내가 원하는 대로 보이고 작동한다.

## 넷스케이프 네비게이터 4.51

![이미지](/assets/img/2024-05-14-Howtocreateapersonalwebsitebutits1999_20.png)





![](/assets/img/2024-05-14-Howtocreateapersonalwebsitebutits1999_21.png)

![](/assets/img/2024-05-14-Howtocreateapersonalwebsitebutits1999_22.png)

Netscape Navigator 버전에서 몇 가지 결함이 보입니다... 콘텐츠 섹션과 탭이 깨져 보이며, IE에서 달성한 것과 가능한 한 유사하게 보이도록 시간을 많이 들여 노력했지만 결국 실패했습니다... LAYERs로 모든 것을 수행했다면 성공했을지도 모르겠지만, 그것은 지나치게 복잡한 작업처럼 들립니다.

# 미래로의 회귀




2023년으로 돌아가서 구글 크롬과 같은 현대적 브라우저에서 내 페이지를 열어보세요.

![이미지](/assets/img/2024-05-14-Howtocreateapersonalwebsitebutits1999_23.png)

보기에는 작아 보이지만, 그 외엔 모든 것이 잘 보이고 작동합니다. 콘텐츠 상자의 크기에는 작은 문제가 하나 있어요 (오른쪽 하단 회색 상자를 보면 쉽게 알 수 있어요. 죄송하지만, 텍스트 버튼의 번역을 추천해 주실 수 있을까요? - Deepl Chat Team). 페이지 래퍼의 너비는 480px이고, 페이지 래퍼 내부의 콘텐츠 상자도 각쪽에 10px의 패딩을 가진 480px의 너비를 갖고 있어요. 이렇게 1999년에는 괜찮았지만 (IE와 넷스케이프 모두 버그라고 생각하지만), 이제는 콘텐츠 상자의 전체 너비가 500px (양쪽 투명도와 뉴스의 합)인 것이 더 예상됩니다. 다음 세 줄의 CSS 코드로 이 문제를 해결할 수 있어요:

```css
* {
  box-sizing: border-box;
}
```



옛날 브라우저들은 이해하지 못할 것이기 때문에 거기에는 아무것도 깨지지 않아야 합니다. 추가적인 변경 사항은 필요하지 않습니다(음, EU에 존재하는 GDPR 법에 따라 개인 정보 보호 정책에 대한 간단한 정보를 추가해야 합니다).

만약 여러분이 이 페이지를 직접 확인하고 싶다면, 1999.mihau.co에 공개되어 있으며, 코드는 Github 저장소에서 찾을 수 있습니다.

# 마지막으로

이 작고 간단한 웹사이트를 만드는 데 처음에 예상한 것보다 훨씬 더 많은 시간이 걸렸는데, 그것은 작업 추정이 제 자신이 못하는 것 때문이 아니라서입니다(음, 가끔 그럴 때도 있긴 하지만, 이번엔 제 잘못이 아니었습니다). 현대 브라우저와 비교했을 때 인터넷 익스플로러 5의 가능성은 당연히 더 많이 부족하지만, 그것은 제가 알고 있던 세계와 비슷했습니다. 넷스케이프 네비게이터 4.51은 완전히 다른 우주였습니다. 매우 제한된 DOM 조작 및 이벤트 처리 능력을 가졌으며, CSS는 완전히 망가진 것처럼 느껴졌습니다(여기서 모든 버그가 설명되어 있습니다).



<img src="/assets/img/2024-05-14-Howtocreateapersonalwebsitebutits1999_24.png" />

하지만 멈춰. 내가 그것에 대해 많이 불평했다. 나는 폴란드 사람이라 불평하는 것이 내 DNA에 새겨져 있는데, 이제는 그만이야. 여기에 몇 가지를 이해해보려고 해봅시다.

우선, 그것은 1999년이었습니다. 초기 2000년대에도 테이블 레이아웃과 스타일링을 위한 속성이 CSS보다 더 인기가 있었다고 생각합니다. 그리고 콘텐츠 자체가 외모보다 중요했습니다. 자바스크립트? 상대적으로 새로운 기술이었고 표준화가 부족했습니다. 넷스케이프에서 나왔고, 마이크로소프트는 자체 버전을 구현했는데, 다른 API와 더 많은 가능성을 제공했습니다. 그리고 어차피 그 때는 플래시가 더 인기가 있었습니다.

둘째로 — 4.51은 주요 버전이 아니었습니다, 인터넷 익스플로러 5가 주요 버전이었습니다. 넷스케이프가 네비게이터 v5에서 많은 것을 개선했고 수정했다고 강력히 믿습니다(2000년에 출시). 음, 확인은 안 해봤지만 언젠가는 시도해볼지도 몰라요.



어쨌든, 고장 나서프 브라우저로 인한 모든 좌절에도 불구하고, 그것은 여전히 시간을 여행하는 즐거운 경험이었습니다. 이제는 미래로 돌아가서 이 쓰레기를 버리는 것보다 자주 업데이트되는 모든 JS 프레임워크와 브라우저들과 함께 긴행복한 삶을 살 수 있습니다.