---
title: "JavaScript, Rust, 그리고 GPT-3로 60초 안에 400개 이상의 탭 정렬하기"
description: ""
coverImage: "/assets/img/2024-05-20-Sorting400Tabsin60SecondsWithJavaScriptRustandGPT-3_0.png"
date: 2024-05-20 21:47
ogImage: 
  url: /assets/img/2024-05-20-Sorting400Tabsin60SecondsWithJavaScriptRustandGPT-3_0.png
tag: Tech
originalTitle: "Sorting 400+ Tabs in 60 Seconds With JavaScript, Rust, and GPT-3"
link: "https://medium.com/better-programming/sorting-400-tabs-in-60-seconds-with-js-rust-gpt3-part-2-macros-recursion-92384ab96348"
isUpdated: true
---




## 모든 재미를 위해 GPT-3 사용 중.

![테이블 이미지](/assets/img/2024-05-20-Sorting400Tabsin60SecondsWithJavaScriptRustandGPT-3_0.png)

저는 탭 중독자입니다. 솔직하게 말하자면요.

현재 5개의 브레이브 창에서 약 460개의 탭을 열어 두고 있습니다. 북마크는 신경쓰지 말아요.

<div class="content-ad"></div>

응, 난 정보 햄스터 같아. 모든 탭을 호아딩해놓고 충분한 시간을 내어 모든 걸 읽으려고 노력할 때까지 새로운 탭을 더 열어. 알 수 있듯이, 너무 많은 탭을 가지고 있다는 건 상당히 압도적일 수 있어. 탭 바의 경계 너머로 사라져 버렸을 때 뭔가를 찾아야 하는 경우거나, 화면을 바라보며 "할 일이 너무 많다"는 불안한 느낌이 드는 경우 등이 있지. 그냥 어떤 작업도 해야 할 일이 없는 데도 말이야.

그래서 게을러버리고 있는 해커 본성으로, 그들을 실제로 정리하거나 청소하거나 *이런* 단순히 모두 닫지 않고 기계가 할 수 있는 방법이 없을까 궁금해졌어. 내 괴로움의 1클릭 솔루션을 갖출 수 있을까?

내 내면의 과다 집착자를 코드를 사용해 마리 콘도의 노예로 바꿀 수 있을까?

다행히도, 우리에게는 수십억 달러의 가치가 있을 모델 언어가 있어 열심히 일을 할 준비만 하고 기다리고 있지.

<div class="content-ad"></div>

아이디어는 간단해요: GPT-3에 항목 목록을 제공하고 해당 항목이 속하는 카테고리 목록을 요청하세요. 그것을 Chrome 확장 프로그램으로 묶어서 마법이 일어나게 해 보세요.

그래서, 손가락을 털어놓고 코딩해 봅시다.. 아니면.. 음... 기다려 봐요..

# 복잡성의 달콤한 맛

조금 되돌아가 봅시다. 우리의 계획은 충분히 간단해 보이죠. 그러나 소프트웨어에서 보통 그렇듯, 우리는 제대로 생각하지 않으면 범위와 예산을 폭발시킬 중요한 세부사항을 놓쳤습니다.

<div class="content-ad"></div>

코드에 처음 뛰어들기 전에 후회의 세계에 빠지지 않도록 고려해야 할 중요한 문제 몇 가지가 있습니다:

- 프롬프트 토큰 한도 - OpenAI의 언어 모델은 토큰 한도를 가지고 있습니다 - 2048 또는 4096 토큰. 각 토큰이 약 4개의 문자이기 때문에 우리의 프롬프트와 응답 크기는 각각 8192/16384 문자로 제한됩니다. 이 문제를 해결하는 몇 가지 방법이 있습니다(모두 다루겠습니다): 프롬프트를 소모 가능한 청크로 나누기, 토큰 수를 줄이기 위해 보내는 데이터 최적화, 우리의 작업에 대한 모델을 세밀하게 조정하기
- API 키 보안 - OpenAI API는 사용된 토큰으로 API 호출을 청구하므로 API 키를 안전한 곳에 숨겨야 합니다. 확장 프로그램에 하드코딩하는 것은 권장되지 않습니다 - 우리의 키를 스크랩하려는 지루한 스크립트 키디로 인해 OpenAI에 백만 달러의 청구서를 지불하길 원한다면 제외합니다.
- 사용자 프라이버시 - 탭 제목과 URL은 민감한 정보를 드러낼 수 있습니다 - 개인 문서, 링크, 세션 ID 및 개인에 대한 많은 데이터. 사용자가 확장 프로그램을 신뢰할 수 있도록 하려면 오픈 소스로 공개하고, 해당 소스에서 빌드 및 배포하고 다른 사람들에게 쉽게 배포할 수 있도록 해야 합니다.
- 업데이트 용이성 - LLMs는 응답에 소질이 있고 OpenAI API는 단순한 실수로 인해 엄청난 사용 비용이 발생할 수 있으므로 사용자가 자유롭게 업데이트하게 두는 대신 업데이트를 통제하고 싶습니다. 이는 가장 중요한 코드를 확장 프로그램에 두지 않고 제어하고자 함을 의미합니다.

이러한 문제를 어떻게 해결할까요?

간단한 방법을 채택할 것입니다 - 확장 프로그램 자체에 모든 로직을 작성하는 대신 API 뒤에 숨깁니다 - 탭 데이터를 전달할 간단한 백엔드 서비스를 구축하여 프롬프트를 나누고 OpenAI API와 통신하여 데이터를 단일 응답으로 줄입니다. 이를 통해 키를 안전하게 보호하고 업데이트를 제어하며 시크릿 토큰을 노출하지 않고도 확장 프로그램을 오픈 소스로 공개할 수 있습니다.

<div class="content-ad"></div>

이를 위해 Rust를 사용할 것입니다. 백엔드 프레임워크로 Axum을, 배포 플랫폼으로 Shuttle을, 그리고 CI로 GitHub Actions를 사용할 것입니다.

그래서 코드 작성에 앞서, 무엇을 구축하고 있는지 개략적으로 파악하기 위해 냅킨 스케치를 몇 장 그려봅시다:

<img src="/assets/img/2024-05-20-Sorting400Tabsin60SecondsWithJavaScriptRustandGPT-3_1.png" />

## 단계 1: 확장 프로그램 구축하기

<div class="content-ad"></div>

크로미움 확장 프로그램을 만드는 것은 매우 간단해요. 그냥 브라우저 안에 살아있는 작은 웹페이지들이에요. (적절한 권한으로) 브라우저의 API에 접근할 수 있어요.

우리는 Chrome API를 사용할 거예요. 이 API는 구글 크롬이 사용하는 API인데, 많은 크로미움 기반 브라우저들이 노출시켜요 (예를 들어, 저는 Brave를 사용하고 있어요. 물론 Edge도 사용해요, 다만 다른 이름공간을 사용해요).

다른 브라우저들은 크로미움 프로젝트 기반으로 만들어지지 않았지만, 비슷한 확장 프로그램 API를 제공해요. 만약 두 API 간 차이에 대해 더 알고 싶다면, MDN 기사를 추천해요.

구체적으로, 이 두 API에 초점을 맞출 거에요:

<div class="content-ad"></div>

- chrome.tabs - 현재 사용자가 열어둔 탭을 조회할 수 있도록 합니다.
- chrome.tabGroups - 기존 그룹을 조회하고 새 그룹을 만들며 그 안에 탭을 이동할 수 있도록 합니다.

그럼 이제 빌딩 과정으로 넘어가 봅시다.

확장 프로그램을 시작하기 위해 Chrome 확장 프로그램 CLI를 사용할 것인데요 — 이를 통해 필요한 초기 프로젝트 구조를 생성합니다.

그러니 터미널을 열고 다음을 입력해 보세요:

<div class="content-ad"></div>


npm install -g chrome-extension-cli
chrome-extension-cli bookie-js
cd bookie-js


마지막에 나오는 안내에 따라 빌드 폴더를 확장 프로그램으로 로드하세요. 이를 통해 확장 프로그램을 핫 리로드를 통해로드 및 테스트할 수 있어서 변경 사항이 즉시 보입니다.

지금 생성된 구조 안을 엿보세요. 대부분이 자명합니다.


├── README.md
├── config
│   ├── paths.js
│   ├── webpack.common.js
│   └── webpack.config.js
├── node_modules
├── package-lock.json
├── package.json
├── pbcopy
├── public
│   ├── icons
│   ├── manifest.json
│   └── popup.html
└── src
    ├── background.js
    ├── contentScript.js
    ├── popup.css
    └── popup.js


<div class="content-ad"></div>

우리는 현재 주로 세 개의 파일에 관심이 있어요:

public/manifest.json — manifest는 당신의 확장 프로그램에 대한 정보를 브라우저에 제공하는 JSON 파일입니다. 이 파일에는 이름, 기능, 시작 방법, 어떤 파일을 표시할지, 페이지에서 실행할 스크립트 등이 포함되어 있어요. 우리가 주목해야 할 몇 가지 필드는 다음과 같아요:

- default_popup - 확장 프로그램 아이콘이 클릭될 때 나타낼 HTML 파일
- permissions - 특정 Chrome API의 일부에 액세스하기 위해 필요한 권한
- host_permissions - 당신의 확장 프로그램이 액세스할 수 있는 URL 패턴들의 집합

지금은 이 모든 것을 그대로 두고, 나중에 다시 돌아와서 확인할게요.

<div class="content-ad"></div>

src/popup.html은 UI의 시작점입니다. 웹 브라우저의 확장 기능 버튼을 클릭하면 이 HTML이 팝업됩니다. 여기에 간단한 인터페이스를 구축하는 데 사용할 것입니다.

API의 /sort 엔드포인트를 호출하고 결과를 반환하는 '정렬' 버튼, 로딩 표시줄 및 문제가 발생할 경우 간단한 오류 상자가 있을 것입니다.
디버깅을 위해 '탭 표시' 버튼을 추가하여 모든 탭의 목록을 표시할 수도 있습니다. 이제 몇 줄의 간단한 HTML을 작성해 봅시다.

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bookie JS</title>
    <link rel="stylesheet" href="popup.css" />
  </head>
  <body>
    <div class="app">
      <div class="button-container">
        <!-- 이 버튼을 클릭하면 API가 호출됩니다 -->
        <button id="sortBtn" class="button">정렬하기</button>
        <div id="loading" class="loading"></div>
        <div id="error" class="error"></div>
      </div>
    </div>
    <script src="popup.js"></script>
  </body>
</html>
```

src/popup.js 파일은 JS가 위치하는 곳입니다. 우린 적당한 Vanilla JS 만 사용할 것이니 예쁘고 견고한 사이버네틱 SSSR JavaScript 프레임워크는 사용하지 않을 거에요. UI를 업데이트하기 위해 DOM 요소를 조작하는 간단한 render(state) 함수에 의존하며, 요소.style.display를 block/none으로 변경하여 간단한 표시 및 숨김 함수를 사용할 것입니다.

<div class="content-ad"></div>

이제 함수로 우리의 사고 과정을 작성해 봅시다.

```javascript
'use strict';
import './popup.css';

(function () {
const SORT_BTN = 'sortBtn';
const LOADING = 'loading';
const ERROR = 'error';
    
// API에서 탭 및 그룹을 가져옵니다
async function getTabsAndGroups(){};
// 데이터로 백엔드 호출
async function callBackendToSort(tabsAndGroups){};
// 브라우저에 결과를 적용합니다
async function applySort(sortedCategories){};
// 앱 실행
async function run(){
// 탭을 가져옵니다
let tabsAndGroups = await getTabsAndGroups();
render({loading: false, error: null}
let btn = document.getElementById('sortBtn')
// 클릭하면 API를 호출하고 로딩을 표시하고 결과를 적용합니다
 btn.addEventListener('click',async ()=> {
     render({loading: true, error: null}
      try {
        let result = await callBackendToSort(tabsAndGroups)
        await applySort(result)
        render({loading: false, error: undefined})
      }catch (e){
        render({loading: false, error: e})
      }
 })
}
// 콘텐츠가로드 될 때 run 함수를로드합니다
document.addEventListener('DOMContentLoaded', run);
    
})();
```

첫 번째 단계는 Chrome API에서 탭과 그룹을 조회하는 것입니다. 문서에 따르면 chrome.tabs.query를 사용하여 이 작업을 수행할 수 있습니다.

![이미지](/assets/img/2024-05-20-Sorting400Tabsin60SecondsWithJavaScriptRustandGPT-3_2.png)

<div class="content-ad"></div>

그래, 한번 해보죠:

```js
async function getTabsAndGroups() {
    let chromeTabs = await chrome.tabs.query({})
    console.log(chromeTabs)
}
```

작동하지 않나요? 이제, 그 public/manifest.json 파일을 기억하시나요? 그리고 permissions 객체를요?

그래서, 탭들, 제목들, 그리고 그룹들에 접근하려면, 그에 맞는 권한들을 추가해야 합니다. 그래서 manifest.json을 열어서 permissions 아래에 "tabs", "tabGroups"를 추가합니다. 그러면 설치시, Chrome이 확장 기능의 권한을 확인하고 사용자에게 어떤 정보에 접근하는지 알려줄 수 있습니다.
하지만, 탭 API에 접근하려면, host-permissions라는 다른 특별한 권한이 필요합니다.

<div class="content-ad"></div>

확장 프로그램이 실행되는 웹 사이트를 사용자에게 알려줍니다. 따라서 모든 탭에서 이를 사용하려면 적절한 URL 패턴을 추가해야 합니다. 그래서 manifest.json에 "host_permissions"라는 새 속성을 추가하여 모든 URL과 일치하도록 패턴을 설정하세요. 예를 들어 "host_permissions": ["*://*/*"]입니다. 마지막으로 이제 사용자의 모든 탭과 그룹에 액세스할 수 있습니다.

이제 작동 중이므로 chrome.tabs.query 메서드가 반환하는 데이터에는 필요한 몇 가지 항목이 포함됩니다: id, title 및 groupId. 우리는 id와 title을 정렬에 사용하고, groupId를 쿼리하는 데 사용할 것이므로 먼저 반환된 객체를 필요한 속성만 사용하여 간소화된 버전으로 매핑할 것입니다.

그룹에 대한 더 많은 데이터를 얻으려면 tabsForGroups 함수를 만들어야 합니다. 이 함수는 모든 고유 그룹을 찾고 각 그룹의 제목을 가져오기 위해 chrome.tabGroups.get(id)를 사용하여 Chrome API를 쿼리할 것입니다.

```js
async function tabsToGroups(tabs){
  //탭에서 모든 기존 그룹Id 가져오기
  let groupIds = tabs
      .map( (it)=>it.groupId)
      .filter((it)=>it!==null && it!==undefined && it!==-1);
  
  //고유한 것만 가져올 수 있도록 세트에 넣기
  let groups = new Set(groupIds)
  
  //각 탭 그룹에 대한 데이터를 가져오기 위해 chrome API에 쿼리
  return await Promise.all([...groups]
      .map(async (it) => {
      let item = await chrome.tabGroups.get(it)
        return {
          id: item.id,
          title: item.title
        }
    }));
  }
```

<div class="content-ad"></div>

```js
// 이제 함수가 모든 탭과 그룹을 반환할 수 있습니다.
async function getTabsAndGroups() {
    let chromeTabs = await chrome.tabs.query({});
    let tabs = await mapTabs(chromeTabs);
    let tabsWithGroups = await tabsToGroups(tabs);
    let groups =  tabsWithGroups.filter((it)=>it.title.length !== 0);
    return {
      items: tabs,
      categories: groups
    };
}
```

와아, 몇 가지 간단한 단계로 기존 그룹과 탭 목록을 가져왔어요.

또한 API 호출 함수도 매우 간단합니다. 아직 API가 없기 때문에 로컬호스트로 일반 POST 요청을 작성할 거에요:

```js
async function callBackendToSort(data) {    
 return await fetch('http://127.0.0.1:8000/sort',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        items: data.items,
        categories: data.categories
      })
    });
}
```

<div class="content-ad"></div>

저희 render 함수도 상당히 간단해요. 상태를 확인하고 UI를 그에 맞게 변경하는 것뿐이죠.

```js
function render(state){
    if(state.loading){
      show(LOADING)
      hide(SORT_BTN)
      hide(ERROR)
    }else{
      hide(LOADING)
      show(SORT_BTN,true)
    }
    if(state.loading!==true &&
      (state.error!==undefined && state.error!=null)){
      show(ERROR)
      showError(state.error)
    }else
      hide(ERROR)
}
```

이제 할 일은 브라우저에 새로운 카테고리를 적용하는 applySort 함수를 구현하는 것 뿐입니다.

아이디어는:

<div class="content-ad"></div>

- 그룹이 존재하는지 확인하세요.
- 그룹이 없다면, 새로 만드세요.
- 탭 목록과 제목을 업데이트하세요.

이를 위해 API 조사를 좀 해야 합니다. 이 부분을 다루는 문서가 조금 혼란스러울 수 있어요. 
chrome.tabGroups.create 또는 chrome.tabGroups.update와 같은 것이 있을 것으로 예상할 수 있지만... 그런 건 순진한 생각이죠.

그룹을 만들기 위해 사용하는 API 호출은 chrome.tabs.group으로, chrome.tabs.group에 groupId를 전달하지 않습니다. 그럼 그룹이 생성되고 새로운 groupId가 반환됩니다. 이것은 chrome 팀에 의해 조금 이상한 호출입니다 - 탭이 그룹에 대해 알고 있고 제어해야하는 이유는 무엇인가요?

그룹은 그룹 API를 통해 생성하고 관리되어야 할 텐데요?

<div class="content-ad"></div>

아, 또한 그룹에 탭을 추가하려면 동일한 호출을 사용하여 tabIds를 통해 탭 배열을 전달합니다. "이 API 호출을 통해 이미 객체를 생성하고 업데이트하고 있기 때문에 제목도 전달할 수 있을까요?" 아니요, 그렇게 하려면 chrome.tabGroups.update API 호출을 사용해야 합니다.

나는 이 이상한 구문이 그룹이 chrome에 추가 기능이었기 때문에 지원이 탭 API 자체로 후방 적용되었다고 가정했습니다. 그래서 이 가정을 테스트해 봅시다. Tabs API에 그룹을 추가한 커밋을 살펴보면 같은 논의가 댓글에서 나타나며, Tab Group API 제안으로 이어집니다. 팀은 탭 관리와 그룹 관리 사이의 역할을 분할하기로 결정한 것으로 보입니다. 탭을 이동시키는 것은 탭 관리이므로 해당 역할은 Tabs API에 속합니다.

대체 제안도 논의되었었으며(TabGroups API에 해당 역할을 넣는 것), 그것의 장단점도 함께 논의되었습니다:

![이미지](/assets/img/2024-05-20-Sorting400Tabsin60SecondsWithJavaScriptRustandGPT-3_3.png)

<div class="content-ad"></div>

저의 관점에서(API 사용자로서) 단점 목록은 그렇게 나쁘지 않아 보입니다. 탭은 그룹에 대해 알 필요가 없을 것이며, 사용자 보안이 강화될 것입니다(확장 프로그램은 tabGroups 권한만 필요로 하며, 악성 확장 프로그램에 의한 잠재적인 남용 가능성이 줄어들 것입니다) 그리고 이는 추상화가 가지는 의미인 직관적 API로 구현 세부 정보를 숨겨주며 대체할 것입니다. 그래도 이상한 결정일 수 있어요.

하지만 이따가 이런 걸 더 많이 이야기하고 있지 않고, 코드를 쓰도록 해봅시다.

```js
function applySort(sortedCategories){
/* 우리가 원하는 응답 객체는 다음과 같습니다: 
{ categories: [
 { category_id: int, category_title: string, items: [int] }
    ] }
*/
for (i = 0; i < sortedCategories.categories.length; i++) {
     let category = sortedCategories.categories[i]
     let categoryId = category.category_id
     // ID가 있는 그룹을 확인합니다
     let groupExists = await chrome.tabGroups.get(categoryId)
          .catch((e)=>undefined);
      let groupId;
      if(groupExists === undefined)
         // ID가 없다면, chrome.tabs.group가 우리에게 ID를 반환합니다
         groupId = await chrome.tabs.group({ tabIds: category.items });
      else {
          
        // ID가 있다면, 기존 것을 사용합니다
        groupId = groupExists.id
        await chrome.tabs.group({groupId: groupId,
                                tabIds: category.items});
      }
// 모든 그룹의 제목을 설정하고 그룹을 축소합니다
      await chrome.tabGroups.update(groupId, {
        collapsed: true,
        title: category.title
      });
})
}
```

이로써, JS 익스텐션 MVP가 완료되었습니다.

<div class="content-ad"></div>

- 탭과 그룹을 수집합니다.
- 그것들을 API로 보냅니다.
- 반환된 정렬을 적용합니다.

지금은 아직 API가 없으니 어떻게 테스트할까요?

일부 단위 테스트를 작성해야하지만, 그건 다른 날로 미루겠습니다 (정말로요 — 약간 밑으로 내려가면 Jest를 사용하여 Chrome 확장 프로그램을 테스트하는 것을 살펴볼 거에요).

지금은 callBackendToSort 함수의 반환을 조작하여 몇 가지 카테고리와 몇 가지 탭 ID를 포함시킬 수 있습니다 - 당신의 탭 ID와 함께 이런 식으로 (하지만 당신의 탭 ID로):

<div class="content-ad"></div>

```json
{
 "categories": [{
  "category_id": 837293848,
  "category_name": "Hacker News",
  "items": [1322973609, 1322973620]
 }, {
  "category_id": 837293850,
  "category_name": "Science",
  "items": [1322973618, 1322973617, 1322973608]
 }, {
  "category_id": 837293851,
  "category_name": "GitHub",
  "items": [1322973619]
 }, {
  "category_id": 837293852,
  "category_name": "Web Development",
  "items": [1322973612, 1322973613, 1322973615, 1322973616]
 }, {
  "category_id": 837293853,
  "category_name": "Web APIs",
  "items": [1322973646]
 }]
}
```

자, 이제 재미있는 부분으로 넘어갑시다 — API를 구축하기, 프롬프트 최적화, GPT 타임아웃 및 우리가 미래와 과거에서 범할 실수 수정하기.

아, 그리고 우리는 기능의 복잡성과 크립트를 추가할 것이지만, 그것에 대해서는 나중에 더 설명하겠습니다.

이제, 현재 가장 핫한 언어인 Rust로 다가가 봅시다.

<div class="content-ad"></div>


![Sorting 400 Tabs in 60 Seconds With JavaScript, Rust, and GPT-3](/assets/img/2024-05-20-Sorting400Tabsin60SecondsWithJavaScriptRustandGPT-3_4.png)

루스트에 대해 설명할 필요가 없을 것 같아요. 돌 아래에 살았더라도 루스트에 대해 들어봤을 거에요. 개발 커뮤니티는 루스트를 하늘 높이 칭찬하고 있어요. C 언어의 속도를 가지고 있으면서 자바의 안전성과 AH-64 아파치 공격 헬리콥터처럼 완벽한 헬리콥터 부모 역할을 하는 빌림 시스템을 가지고 있어요.

하지만 문법이 깔끔하고, 성능이 놀라우며, 매크로도 멋있고, 대부분 메모리에 엄격하지만 여전히 원시 포인터에 액세스할 수 있고 !unsafe해도 돼요.

그래서 이 언어를 익히는 느낌을 받아볼까요? 좀 재미있게 해보죠.


<div class="content-ad"></div>

간단한 서비스를 만들 예정이에요. 우리는 탭 컬렉션을 가져와서 조금 단순화하고 OpenAI API와 대화할 거예요. 희망컨대 환각 없이 응답을 우리 익스텐션에서 사용할 수 있는 형태로 파싱할 거예요.

이 과정에서 몇 가지 장애물이 있을 거에요. 탭이 너무 많아 돈을 낭비하는 문제부터 실리콘밸리가 일어나 OpenAI API를 무너뜨리기 전까지 말이에요.

우리 서비스는 꽤 간단할 거예요. 우리는 탭과 기존 카테고리를 POST할 /sort 메소드를 노출할 거에요. 이를 구축하기 위해 Axum 프레임워크를 활용할 거에요. 이를 통해 /sort 엔드포인트가 있는 서버를 쉽게 시작할 수 있어요. 그리고 배포를 위해 셔틀을 사용할 거에요. AWS 구성 파일 물어다님으로 싸움하지 않고 Rust 서버를 쉽게 가동할 수 있어요.

<div class="content-ad"></div>

프로젝트를 구성하는 데 사용할 것이기 때문에 설치부터 시작해봅시다.
먼저, 러스트 패키지 관리자인 cargo가 필요합니다. 만약 설치되어 있지 않다면 여기에 있는 단계를 따라주세요. 둘째, 셔틀 계정이 필요합니다. 걱정하지 마세요. GitHub으로 1클릭 가입하면 됩니다. 양식을 작성할 필요 없어요.

이제 올드 터미널을 열고 `cargo install cargo-shuttle && cargo shuttle login`을 입력한 다음 인증을 완료한 후 `cargo shuttle init`를 실행하세요.

프로젝트 이름 및 위치를 설정하고 메뉴에서 axum을 프레임워크로 선택하세요. 이렇게 하면 라이브러리로 새로운 axum 프로젝트가 구성되며 셔틀이 종속성으로 설정됩니다.

우리 폴더는 이제 이와 같이 보일 것입니다.

<div class="content-ad"></div>


├── Cargo.lock
├── Cargo.toml
└── src
    └── lib.rs


간단한 구조에요 — `Cargo.toml` 파일이 있습니다. 이는 `manifest.json`이나 `package.json`의 러스트 버전입니다. 이 파일에는 패키지, 의존성, 컴파일 특징 등에 대한 메타데이터가 포함되어 있어요. `Cargo.lock`은 환경 간 일관된 빌드를 보장하기 위해 지정된 의존성 목록을 담은 파일입니다.

메인 서버 코드는 `src/lib.rs` 파일 안에 있어요. 아직 신선하고 아름다운 상태에서 코드를 살펴보려고 합니다:


use axum::{routing::get, Router};
use sync_wrapper::SyncWrapper;
async fn hello_world() -> &'static str {
    "Hello, world!"
}
#[shuttle_service::main]
async fn axum() -> shuttle_service::ShuttleAxum {
    let router = Router::new().route("/hello", get(hello_world));
    let sync_wrapper = SyncWrapper::new(router);
    Ok(sync_wrapper)
}



<div class="content-ad"></div>

여기서 주목할 점이 몇 가지 있어요:

- 메인 메서드가 없어요 — 이 프로젝트들이 [lib]rary로 표시되어 있기 때문에 미리 정의된 진입점이 필요하지 않아요.
- 라우터 — 당신의 Axum 서비스에 대한 "진입점". 요청은 여기를 통해 라우팅되며 코드는 매우 자명합니다 - 경로와 처리 함수를 매치시켜 요청을 처리해요. 즉, 우리의 supercoolservice.com/hello는 간단한 "Hello, world!" 텍스트를 반환할 거에요.
- SyncWrapper — 우리의 라우터 객체를 감싸서 서로 다른 스레드에서 안전하게 액세스할 수 있도록 해요.
- #[shuttle_service::main] - 이것은 러스트 매크로에요 - 알고 있다면 주석의 강력한 버전으로 생각해봐요. 코드를 작성하는 코드를 작성할 수 있도록 해주는데, 이게 게을러진 설명이에요. 음.. 여기서 빠른 탈선이 필요한 것 같아요.

## 매크로의 마법 같은 영역으로 빠른 탈선

<img src="/assets/img/2024-05-20-Sorting400Tabsin60SecondsWithJavaScriptRustandGPT-3_6.png" />

<div class="content-ad"></div>

이제, 매크로에 들어가기 전에 경고로 처음부터 말씀드리겠습니다. 이 글은 [여기에 즐겨 사용하는 언어를 삽입]에서의 매크로에 대한 100% 설명이 아닙니다. 이에 대해 수백 권의 책, 안내서 및 기사들이 존재합니다.

하지만 여기에 우연히 들어온 독자들 중에서 "모네드는 엔도펑터 범주 내에서 모노이드이다" 스타일의 매크로 설명 기사를 읽기 싫어하는 분들을 위해, 매크로의 아름다운 토끼굴로 빠르게 들어가보도록 하겠습니다.

그래서 상상해 보죠. 우리가 상상의 언어 '버스트'에서 작업 중이라고요.

'버스트'는 이제 트위터 전체에서 소문이 나고 있는 멋진 새로운 언어이며, 메타버스 AI 웹4 앱의 언어가 될 것으로 말하고 있습니다. 그러나 새로운 언어이므로 아직 초기 단계이며 많은 라이브러리가 없습니다. 예를 들어, 아직 JSON 직렬화 라이브러리가 없기 때문에 직렬화 코드를 아직 수동으로 작성해야 합니다. 따라서 구조체를 만들 때마다 직렬화 코드를 작성해주어야 합니다.

<div class="content-ad"></div>

```js
impl ToJson for ReallyBigModel {
   fn toJson() -> String {
       return mapOf { "id" to id, 
             "name" to name,
             "isReal" to isReal,
             ..., 
             "stuff" to stuff.toJson())
         }.toJson() 
   }
}
```

조금 귀찮죠? 매일 이렇게 많은 보일러플레이트를 작성하고 싶지 않으시죠.

<div class="content-ad"></div>

하지만 어느 날, 최신 변경 로그를 읽는 중에 새롭게 추가된 매크로(macros)라는 새로운 기능을 발견했다. 매크로는 여러 종류가 있지만, Bust에서의 매크로는 두 가지로 구성된 특별한 메서드로 정의할 수 있는 것이야:

- 매크로 속성(attribute)
- 매크로 함수

속성은 다른 코드에 적용할 수 있는 표식 같은 거야.

클래스나 메서드 위에 큼지막한 빨간 X 표시가 있는 걸 상상해봐. 그래서 컴파일러가 컴파일 중에 함수를 만나면, 그 함수 머리 위에 큼지막한 빨간 X 표시가 있다면, 너의 매크로 함수를 호출해야 한다는 걸 알 수 있어.

<div class="content-ad"></div>

매크로 함수는 속성으로 표시된 코드를 받아 처리한 후, 새로운 코드를 컴파일러에 반환하여 해당 기능이 있는 곳에 통합합니다.

예를 들어, 우리가 toJson 매크로를 만들었다면, 어떤 구조체 위에 toJson 속성을 추가할 수 있으며, 이를 대신 코드로 작성해줄 것입니다. 따라서 위의 코드는 다음과 같이 변환될 것입니다:

```js
#[toJson]
struct ReallyBigModel {
   id: String,
   name: String,
   isReal: Bool,
   ...
   stuff: AnotherBigModel
}
```

그리고 매크로는 어떻게 생겼을까요?

<div class="content-ad"></div>

위에 나와 있는 코드(토큰으로 표시됨)를 가져와서 이를 대체할 새로운 코드를 반환하는 함수입니다.

```js
#[toJson]
#[toJson] fn addToJsonTrait(input: TokenStream) -> TokenStream { 
  let tree = parseIntoAST(input) 
  let nodes = ast.data.asStruct();
  let name = tree.identity
   // Get all the children that are properties
   // Map them into format: $name to name 
  let properties = nodes
    .filter((child)=>child.isProperty)
    .map((property) => "\"${property.name}\" to ${property.name}")
    .joinToString(",\n") 
  // Write the toJson trait body
  let body = quote! { //this is also a kind of macro!
     impl ToJson for #name { 
      fn toJson() -> String { mapOf { properties }.toJson()}; 
    }
   }
   return body.intoTree().intoStream() 
}
```

참고: 이것은 가상 언어인 Bust입니다. 모든 언어에는 자체 매크로 구현이 있으며, 이것은 단순화된 표현일 뿐이므로 글이 지나치게 길어지지 않도록 한 것입니다.

이제 우리 컴파일러가 #[toJson]로 표시된 클래스에 도착하면 addToJsonTrait 메서드를 호출하여 클래스 코드를 전달하고, 새 코드를 반환할 때까지 컴파일을 계속하기 전에 기다릴 것입니다.

<div class="content-ad"></div>

그렇게 해서, 우리는 매크로 함수를 사용하여 시간을 많이 절약했고 항상 되고 싶어했던 생산적인 Bust 개발자가 될 수 있게 되었어요!

하지만 너무 흥분하지는 마세요 - 이것은 단지 상상 속의 구현입니다. 매크로에 대해 알아야 할 것이 많이 있고, 매크로에 대해 깊이 파고들어 보길 권하고 싶어요. 러스트 자체에는 몇 가지 다른 유형의 매크로가 있습니다. 이것이 사람들이 Lisp를 너무 좋아하는 이유 중 하나로, 적절한(syntactic hygiene) 및 비적절한 비적절한 비적절한(expansion) 매크로, 다양한 확장 유형 및 더 많은 마법이 숨겨져 있어요.

그래서 이제 그 문제를 해결했으니, 다시 API를 구축해 봅시다.

## The POST office

<div class="content-ad"></div>

우리의 서비스의 간단한 매력을 /sort POST 방식 뒤에 숨기겠습니다. 따라서 그 "hello world"를 삭제하고 /sort 요청을 처리하는 라우터로 교체할 거에요 - Router::new().route("/sort", post(sort_items)) 그리고 요청을 처리할 sort_items 메서드:

```js
async fn sort_items(Json(payload): Json<SortRequestPayload>)
                                       -> impl IntoResponse {
 (StatusCode::OK, Json("ok")).into_response()
}
```

이 메서드는 요청 구조의 Json 래퍼를 받아 우리 서버가 처리할 수 있는 IntoResponse 트레이트의 구현을 반환할 거에요.

구체적으로, 우리는 이를 StatusCode, T 튜플 형식으로 반환할 거에요. 이것은 서버가 적절한 응답으로 변환하는 방법을 알고 있습니다.

<div class="content-ad"></div>

한 가지 더 구현해야 할 것이 있습니다. 바로 요청 데이터 구조입니다. 이제 같은 파일에 만들어 둘 대신에 src 폴더에 models.rs라는 새 파일을 열어 기본 정의를 만들어 봅시다.

우리는 받게 될 래퍼인 SortRequestPayload가 필요합니다. 이는 카테고리와 항목의 목록을 포함해야 합니다. 따라서 이를 위한 구조도 필요합니다 - Category와 Item이라는 구조를 추가해 봅시다.

또한 카테고리와 항목을 가진 목록이 필요합니다. 이를 반환할 수 있는 카테고리에 속한 항목을 가지고 있는 구조와 이를 위한 래퍼도 만들어야 합니다. 또한 문제가 발생한 곳을 알 수 있도록 ErrorResponse를 추가합니다.

```rust
//in models.rs
pub(crate) struct SortRequestPayload {
    pub(crate) categories: Vec<Category>,
    pub(crate) items: Vec<Item>,
}

pub(crate) struct Category {
    pub(crate) id: usize,
    pub(crate) title: String,
}

pub(crate) struct Item {
    pub(crate) id: usize,
    pub(crate) title: String,
}

pub(crate) struct CategoryWithItems {
    pub category_id: usize,
    pub category_name: String,
    pub items: Vec<usize>
}

pub(crate) struct Categories {
    pub categories: Vec<CategoryWithItems>
}

pub(crate) struct ErrorResponse {
    pub message: String,
}
```

<div class="content-ad"></div>

하지만, 한 가지 문제가 발생했습니다 — 우리는 Serde 라이브러리를 사용하여 JSON과 (디)시리얼화가 쉽게 가능하도록 하려고 합니다. 이를 위해 앞서 구성한 매크로와 비슷한 매크로를 사용할 것입니다. 그래서 cargo.toml 파일을 열어서 serde와 serde_json을 종속성으로 추가해주세요:

```js
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
```

이제, serde의 #[derive(Deserialize)] 매크로를 사용하여 우리의 구조체를 표시할 수 있으므로 프레임워크가 수신된 JSON을 구조체로 역직렬화하는 방법을 알 수 있습니다.

```js
// models.rs 파일 안에
#[derive(Deserialize)]
pub(crate) struct SortRequestPayload {
    pub(crate) categories: Vec<Category>,
    pub(crate) items: Vec<Item>,
}

#[derive(Deserialize)]
pub(crate) struct Category {
    pub(crate) id: usize,
    pub(crate) title: String,
}

#[derive(Deserialize)]
pub(crate) struct Item {
    pub(crate) id: usize,
    pub(crate) title: String,
}

#[derive(Deserialize)]
#[derive(Serialize)]
pub(crate) struct CategoryWithItems {
    pub category_id: usize,
    pub category_name: String,
    pub items: Vec<usize>
}

#[derive(Deserialize)]
#[derive(Serialize)]
pub(crate) struct Categories {
    pub categories: Vec<CategoryWithItems>
}

#[derive(Serialize)]
pub(crate) struct ErrorResponse {
    pub message: String,
}
```

<div class="content-ad"></div>

위 작업을 완료했으니, 이제 코드 작업에 다시 몰두해 볼까요?

우리의 계획을 살펴보겠습니다:

```js
1. 아이템 가져오기
2. 아이템을 카테고리에 할당하기
3. 프롬프트를 청크로 나누기
4. 재귀적 정렬:
    4.1. 기존 카테고리와 청크를 입력으로 받아 프롬프트로 변환
    4.2. OpenAI에 정렬 요청하기
    4.3. 응답 역직렬화하기
    4.4. 기존 카테고리에 추가하기
    4.5. 청크가 남아있는 동안, 다시 4.1로 돌아감
5. 결과 반환하기
```

그리고 메소드로 구조화해 보겠습니다:

<div class="content-ad"></div>

```rust
//in lib.rs
...
fn create_chunks_for_prompting(items: Vec<Item>) -> Vec<Vec<Item>>
```

```rust
fn sort_recursively(sorted_categories: Vec<CategoryWithItems>,
                    remaining: Vec<Vec<Item>>) -> Result<Categories, Error>
fn build_prompt(items: Vec<Item>, categories: Vec<CategoryWithItems>) -> String
fn prompt_open_ai(prompt: String) -> Result<String, String>
```

우리는 프롬프트가 필요할 것이라고 생각해요. 아래와 같이 시도해봅시다. - 우리는 GPT3에게 항목 목록을 받을 것이라고 알려주고 형식을 제시한 후 목록을 포함해야 합니다.

그런 다음, 반환할 유효한 JSON 형식을 설명하고 기존 카테고리를 전달하세요. 마지막으로, 유효한 JSON 형식으로 반환하도록 요청하세요. JSON 형식을 준수하고 이를 해석하지 않기를 희망하지만 후속 게시물에서 그 부분을 미세 조정할 거에요.

<div class="content-ad"></div>

지금은 프롬프트의 끝 부분에 유효한 JSON 형식을 명시하고 "유효한 JSON 형식"을 언급하는 것이 꽤 적절해 보입니다.

```js
항목 목록을 [제목, id] 형식으로 받게 됩니다.
제목과 URL을 기반으로 범주로 분류하며,
기존 범주를 사용하거나 새 범주를 만들어 사용합니다.
탭은:
[$tabName, $tabId].
반환할 유효한 JSON 형식은 다음과 같습니다:
{ "categories": [ { 
    "category_id":"여기에 id 입력",
    "category_name": "여기에 이름 입력", 
    "items":[여기에 tab_id 입력] } 
]}.
기존 범주는: 
$categories
보다 자세한 새 범주 목록(기존 및 새 범주 포함)과 항목을 유효한 JSON 형식으로 제시합니다.
```

그게 좋아요!

이를 우리 코드 내에서 사용할 상수로 분리해 봅시다.

<div class="content-ad"></div>

```rust
const PROMPT_TEXT_START: &str = "아이템 목록을 제목과 id의 형태로 받게 됩니다. 제목과 URL을 기반으로 기존 카테고리를 사용하거나 새로 만들어 아이템을 분류해주세요.";
const PROMPT_TEXT_MIDDLE: &str = "\n반환할 유효한 JSON 형식은:
{ \"categories\": [ { \"category_id\":\"여기에 id 입력\", \"category_name\": \"이름 입력\", \"items\":[tab_id 여기에] } ]}.
기존 카테고리는:";
const PROMPT_TEXT_ENDING: &str = "탭을 사용하여 더 상세한 카테고리 목록(기존 및 새로 만든 항목)을 유효한 JSON 형식으로 제공합니다:";
```

마지막으로 `sort_items` 메서드로 들어가서 모든 내용을 작성할 수 있습니다. 먼저 데이터를 소유권을 얻고 청크(조각)로 분할합니다:

```rust
let items = payload.items;
let categories = payload.categories.iter().map(|it| {
    CategoryWithItems {
        category_id: it.id,
        category_name: it.title.to_owned(),
        items: Vec::new(),
    }
}).collect();
```

```rust
let prompt_slices = create_chunks_for_prompting(items_with_indexes);
```

<div class="content-ad"></div>

왜 청크를 사용하는 걸까요?

모든 항목을 한 번에 추가하면 우리의 프롬프트 크기가 4096 토큰 이상이 될 수 있습니다. 사용할 모델에서 프롬프트와 완성을 위한 최대 길이로 지원하는 값이기 때문이죠.

따라서 우리는 적절한 크기로 분할하고 완성을 위한 여분 공간도 확보해야 합니다. 여분 공간으로 50%를 남기고 2048 크기의 프롬프트를 유지할 것입니다.

이를 달성하기 위해 create_chunks_for_prompting 함수는 두 가지 작업을 수행해야 합니다:

<div class="content-ad"></div>

- 우리 기본 프롬프트의 토큰 수를 세어 보세요.
- API로 전송하는 데이터의 토큰 수를 세어 보세요.
- 총 토큰 수의 크기를 2048로 나누고 하드코딩된 프롬프트 크기를 뺀 값을 기준으로 필요한 청크 수를 계산하세요.

OpenAI 문서에 따르면, 토큰 하나는 대략 4개의 문자 크기로 보실 수 있습니다.

이제, 토큰을 세는 다양한 방법이 있지만, 올바르게 하려면 길이를 4로 나누는 것 이상의 작업을 해야 할 것입니다 - Rust 토크나이저 크레이트와 그들의 GPT2 토크나이저를 사용하는 게 최선일 것입니다.

하지만, 그런 접근은 다른 문제로 이어지기 때문에, 이번에는 건너뛰고 간단한 방법을 사용하겠습니다 - split_whitespace 메서드를 사용해 토큰 길이의 근사치를 얻을 수 있습니다.

<div class="content-ad"></div>

```rust
fn create_chunks_for_prompting(items: Vec<Item>) -> Vec<Vec<Item>> {
   
  // 데이터 내의 토큰
  let json_size = serde_json::to_string(&items).unwrap()
      .split_whitespace()
      .collect_vec()
      .len();
  
  // 하드코딩된 프롬프트의 크기 구하기
  let hardcoded_prompt = format!("{a}{b}{c}",
                                 a =String::from(PROMPT_TEXT),
                                 b = String::from(PROMPT_TEXT_APPEND),
                                 c= String::from(PROMPT_TEXT_ENDING));
  
  let hardcoded_prompt_size = hardcoded_prompt
      .split_whitespace()
      .len();
  
  // 아이템을 나눌 청크의 수 계산
  let chunks_to_make = json_size / (2048 - hardcoded_prompt_size);
  
  // 벡터를 N개의 청크로 나누기
  let chunk_size = items.chunks(items.len() /
                                    (if chunks_to_make > 0 {
                                    chunks_to_make
                                    } else { 1 }));
                                    
  // 청크 목록 반환
  return chunk_size.map(|s| s.into()).collect();
}
```

이제 build_prompt 함수에 대해 이야기해 보겠습니다.

프롬프트를 구성하기 위해 정렬해야 할 항목 목록과 기존의 카테고리가 필요합니다.

항목 목록을 [제목, ID] 형식의 문자열로 변환한 다음, 카테고리를 JSON으로 변환하여 이를 모두 결합하는 형식으로 하나의 프롬프트를 생성할 것입니다.


<div class="content-ad"></div>

```rust
fn build_prompt(items: Vec<Item>,
                categories: Vec<CategoryWithItems>) -> String {
  // items을 [title,id] 형태로 매핑한 후 모두 문자열로 결합합니다
    let items_joined = items.iter().map(|item| format!(
                                        "[{title},{id}]",
                                        title = item.title,
                                        id = item.id))
                                .collect()
                                .join(",");
    let categories_json = serde_json::to_string(&categories).unwrap();
    
    format!("{prompt}\n{tabs}{middle}{categories}\n{ending}",
            prompt = String::from(PROMPT_TEXT_START),
            tabs = items_joined,
            middle = String::from(PROMPT_TEXT_MIDDLE),
            categories = categories_json,
            ending = String::from(PROMPT_TEXT_ENDING))
}
```

다음으로, 이 프롬프트를 실제로 OpenAI에 전송하려면 HTTP 클라이언트가 필요합니다.

이를 위해 reqwest 크레이트를 사용할 것입니다. 이 크레이트는 간단한 비동기 함수를 사용하여 OpenAI API와 통신할 수 있도록 해주는 고수준 HTTP 클라이언트를 제공하며, 쉬운 직렬화/역직렬화를 위한 JSON 기능도 제공합니다.

그러니 우리의 Cargo.toml 파일에 이를 추가해 봅시다:

<div class="content-ad"></div>


[의존성]
...
reqwest = { version = "0.11", features = ["json"] }


여기서 우리는 오래된 좋은 빌더 패턴을 통해 HTTP 클라이언트를 구축할 수 있습니다.

```rust
let client = Client::builder()
    .http2_keep_alive_timeout(Duration::from_secs(120))
    .timeout(Duration::from_secs(120))
    .build()
    .unwrap();
```

그러나 만약 우리가 prompt_open_ai 함수 내에서 클라이언트를 구축한다면, 우리는 각 요청마다 Client 인스턴스를 생성하게 될 것이므로, 대신 종속성을 만들어 sort_items 함수에 클라이언트 코드를 추가한 다음, 이를 sort_recursively 함수와 prompt_open_ai 함수에 전달하도록 하겠습니다.

<div class="content-ad"></div>

HTTP 클라이언트를 한 번만 사용하여 /sort 호출당 한 번의 인스턴스만 사용할 수 있습니다. 그리고 prompt_open_ai 함수는 실제 API를 호출하고 결과를 받는 데 중점을 둘 수 있습니다.

그래서 간단한 POST 호출을 구축하고 그 결과를 받는 방법을 살펴보겠습니다.

코드를 깔끔하게 유지하기 위해 우리의 구조 안에 별도의 모듈을 만들 것입니다. 모듈은 코드를 저장하는 컨테이너이며 (패키지와 유사한) 코드의 서로 다른 영역 간에 분리를 만들 수 있도록 해줍니다.

openai라는 새 폴더를 만들고 그 안에 두 개의 새 파일을 만들어 주세요:

<div class="content-ad"></div>

- 우리 코드를 위한 mod.rs 파일
- 우리 모델을 위한 models.rs 파일을 열어보세요.

models.rs를 열어서 OpenAI Completion API와 통신하기 위해 필요한 구조체를 추가해보세요:

```js
use serde::{Deserialize, Serialize};
```

```js
#[derive(Serialize)]
pub(crate) struct AskGPT {
    pub prompt: String,
    pub model: String,
    pub max_tokens: usize,
    pub stream: bool,
    pub temperature: usize,
    pub top_p: usize,
    pub n: usize,
}
#[derive(Deserialize)]
pub(crate) struct Completion {
    pub model: String,
    pub choices: Vec<Choices>,
}
#[derive(Deserialize)]
pub(crate) struct Choices {
    pub text: String,
    pub index: usize,
}
```

<div class="content-ad"></div>

mod.rs 파일에서 prompt_open_ai 메서드를 구축할 수 있습니다. 이 메서드는 새로 생성된 AskGPT 모델을 OpenAI의 /completions 엔드포인트에 보낼 POST 요청을 함께 합니다.

이 곳에는 몇 가지 중요한 필드가 있습니다. 자명한 prompt 필드, 완성을 담당할 모델을 선택할 수 있는 model 필드 (작성 시점에 가장 성능이 좋은 것은 text-davinci-003 이며), 우리가 4096으로 설정할 max_tokens 필드 (최대치, 당연한 얘기), 응답 개수를 제어하는 n 필드 및 어떤 확률을 고려할지 알려주는 temperature 필드가 있습니다. 이 값이 높을수록 완성이 더 무작위로 보일 수 있지만, 여기서는 0을 사용하여 출력이 덜 무작위로 나오도록 합니다.

참고: 이 부분에서는 OpenAI API 키가 필요합니다. 여기서 찾을 수 있습니다.

```rust
async fn prompt_open_ai(prompt_txt: String,
                        client: &Client) -> Result<String, String> {
    let token = String::from("여기에_귀하의_API_키_입력")
    let auth_header = format!("Bearer {}", token);
    let req = client.post("https://api.openai.com/v1/completions")
        .header("Authorization", auth_header)
        .json(&AskGPT {
            prompt: prompt_txt,
            model: String::from("text-davinci-003"),
            max_tokens: 4096,
            n: 1,
            stream: false,
            temperature: 0,
        }).send().await;
}
```

<div class="content-ad"></div>

결과가 나왔네요!

하지만 그 결과로 뭘 할까요?

우리는 그냥 await 뒤에 ?를 추가해도 되지만, 재미가 없죠. 그래서 제가 가장 좋아하는 러스트의 기능 중 하나인 유명한 match를 사용할 거에요.

match 문은 러스트 개발 경험의 핵심이며, 강력한 패턴 매칭 기능을 제공하여 코드가 따라가는 모든 경로를 확실하게 다룰 수 있도록 도와줍니다.

<div class="content-ad"></div>

Ian씨, 이건 무슨 특별한 점이 있는 걸까요? 이게 그냥 더 강력한 if/else일 뿐인 거 아닌가요?

아니에요, 이건 그 이상입니다.

if/else나 switch 문들의 집합과 달리, match는 코드가 갈 수 있는 모든 가능성을 확인하도록 강요합니다. 이는 당신이 코드가 행복한 길과 슬픈 길 둘 다 다루도록 확실하게 해줍니다.

이게 왜 이렇게 초능력이라고 할까요?

<div class="content-ad"></div>

버그가 처리되지 않은 케이스로 인한 가능성을 줄이고 모든 가능한 케이스를 다루도록 강제하기 때문에 코드를 즉시 개선할 수 있습니다. 이는 코드의 가독성을 향상시키고 버그를 해결하며 유지보수성을 높이는 희귀한 도구 중 하나입니다.

그러니 이를 시도해 봅시다. 구문은 간단합니다. 왼쪽에는 일치시키려는 패턴이 있고, 오른쪽에는 실행할 코드 블록이 있습니다.

먼저, 우리는 실제 요청이 발생했는지 여부를 확인해볼 것입니다. 이를 통해 우리가 받은 결과(Result)를 확인합니다.

```js
match req {
    Ok(response) => {
        // 요청이 실제로 발생했습니다. 안전하게 응답에 접근할 수 있습니다.
    }
    Err(error) => {
        // 오류 처리 작업
    }
}
```

<div class="content-ad"></div>

이제 우리 Ok 브랜치에서는 안심하고 응답 객체에 접근할 수 있습니다. 에러 케이스에 대비했기 때문에 런타임 중에 충돌을 일으키지 않을 것입니다.

이제 우리는 요청이 실제로 성공적이었는지를 확인할 단계로 넘어갈 수 있습니다. 단순히 상태 코드가 200 OK인지 확인하여 성공한 요청인지 확인할 수 있습니다.

```js
match response.status() {
    StatusCode::OK => {
      // 흥미진진한 성공 
    }
    other => {
      // TODO 에러 처리
    }
}
```

마지막으로, 본격적인 단계로 진행합니다 — 요청이 성공했다면, 응답을 담은 Completion 구조체로 본문을 역직렬화해야 합니다. 그러나 이 역시 실패할 수 있으므로 이 부분에서도 빠르게 매칭을 수행하고 완료 객체에서 응답을 추출해야 합니다:

<div class="content-ad"></div>

```rust
match response.json::<Completion>().await {
    Ok(parsed) => {
        // 우리의 요청 매개변수 n==1 때문에 choices에 항상 적어도 1개의 항목이 있다는 것을 알고 있습니다.
        // 그러므로 우리는 단순하게 언랩을 해서 사용할 겁니다.
        let choices = parsed.choices.first().unwrap();
        let json: &str = choices.text.borrow();
        Ok(String::from(json))
    }
    Err(err) => {
            return Err(Parsing);
        }
}
```

이제 에러를 처리하는 방법을 알아봅시다 — 여러분, 저는 이 세 유형의 에러로 모든 가능한 에러를 압축할 것입니다. 어떤 문제가 생길까요.. — 연결 에러(connection error), 서버 응답 에러(server response error) 및 파싱 에러(parsing error)를 표시하는 열거형(enum)을 추가합시다. models.rs로 올라가서 다음과 같이 추가해보세요:

```rust
#[derive(Debug)]
pub(crate) enum OpenAiError {
    Connection,
    Parsing,
    Server,
}

match req {
    Ok(response) => {
        match response.status() {
            StatusCode::OK => {
                match response.json::<Completion>().await {
                    Ok(parsed) => {
                        // 우리의 요청 때문에 최소한 1개의 항목이 항상 있습니다.
                        let choices = parsed.choices.first().unwrap();
                        let json: &str = choices.text.borrow();
                        Ok(String::from(json))
                    }
                    Err(err) => Err(Parsing);
                }
            }
            other => Err(Server)          
        }
    }
    Err(err) => Err(Connection)
}
```

축하합니다! 우리는 안전하게 요청을 보내고 이 과정에서 모든 안좋은 상황과 기쁜 상황을 모두 다루었습니다. 


<div class="content-ad"></div>

우리 요청이 증가하면서, 이제 드디어 재귀적으로 정렬하는 함수인 sort_recursively 함수에 대해 작업을 시작할 수 있게 되었어요. 여기서 왜 재귀일까요? 왜냐하면 우리는 GPT3가 우리의 축소 함수로 작용하면서 리스트를 자기 자신에게 축소하고 있거든.

우리가 여기서 루프를 사용하고 이 방법을 n번 호출할 수는 있지만, 이렇게 하면 루프 외부의 변수(우리의 카테고리를 포함하는 변수)도 변경해야 하기 때문에 조금 어수선해집니다. 그러니까, 더럽게 하기보다는 재귀를 통해 깔끔하고 기능적인 방식으로 해결할 거에요.

그러니까 이제 main.rs 파일을 열어서 sort_recursively 함수에 들어가 보도록 해요.

먼저 우리의 프롬프트를 구축한 다음, prompt_open_ai로 보내고 응답을 역직렬화하려고 해요. 성공하면 기존의 카테고리들과 연결하고 남은 청크를 가지고 다시 sort_recursively에 전달합니다. 이를 계속해서 반복하여 남은 청크가 없을 때까지 반복합니다.

<div class="content-ad"></div>

```rust
async fn sort_recursively(
    sorted_categories: Vec<CategoryWithItems>,
    remaining: Vec<Vec<Item>>,
    client: Client) -> Result<Categories, Error> {
    let prompt = build_prompt(remaining.first().unwrap().to_vec(), sorted_categories);
    let ai_response = prompt_open_ai(prompt, &client).await.unwrap();
    let json = ai_response.as_str();
    
    let generated = serde_json::from_str::<Categories>(json);
    
    let result = generated.map_err(|err| err.to_string()).and_then(|res| {
        res.map_err(|err| err.to_string()).and_then(|wrapper| {
            let mut new_categories = wrapper.categories.to_owned();
            let mut next_slice = remaining.to_owned();
            next_slice.remove(0);
            next_categories.append(&mut new_categories);
            
            if next_slice.len() != 0 {
                sort_recursively(next_categories, next_slice, client).await
            } else {
                Ok(Categories { categories: next_categories })
            }
        })
    });

    result
}
```

With all these matches, our code is starting to look quite messy. One way to avoid nested match hell is to use map, map_err, and and_then extensions — they operate on either the left (map) or the right (map_err) side of the Result, enabling us to avoid nesting hell by simply chaining them into a more readable, concise version of it.

The data will pass only through the corresponding operands so we can safely map our data and errors to the proper format.

We’ll use it to reduce the first set of nested matches and we’ll leave the last one as a match. Why? Because async closures still aren’t stable in Rust it seems. We’ll map all the errors into an `Err(String)` format so we can return it properly.


<div class="content-ad"></div>

```rust
async fn sort_recursively(sorted_categories: Vec<CategoryWithItems>,
                          remaining: Vec<Vec<Item>>,
                          client: Client) -> Result<Categories, String> {
    let mut next_categories = Vec::from(sorted_categories.deref());
    let prompt = build_prompt(remaining.first().unwrap().to_vec(),
                              sorted_categories);
    let ai_response_result = prompt_open_ai(prompt, &client).await;
    let res = ai_response_result
        .map_err(|e|
                format!("OpenAI와 통신 중 오류 발생 - {:?}", e))
        .and_then(|ai_response|
            serde_json::from_str::<Categories>(ai_response.as_str())
                .map_err(|_| "응답 파싱 오류".to_string()));
    match res {
        Ok(wrapper) => {
            let mut new_categories = wrapper.categories.to_owned();
            // 처리된 청크 제거
            let mut next_slice = remaining.to_owned();
            next_slice.remove(0);
            // 카테고리 합치기
            next_categories.append(&mut new_categories);
            // 아직 끝나지 않았다면 재귀 호출
            if next_slice.len() != 0 {
                sort_recursively(next_categories, 
                                next_slice,
                                client).await
                    .map_err(|e| 
                        format!("정렬 실패, 이유: {}", e))
            } else {
                Ok(Categories { categories: next_categories })
            }
        }
        Err(msg) => Err(msg)
    }
}
```

여기 있습니다 — 우리는 API를 안전하고 오류없이 호출했는데요...

컴파일되지 않네요.

음, 한 가지 생각하지 못한 것은 비동기 재귀입니다.


<div class="content-ad"></div>

이게 왜 문제가 됐는지 궁금하시죠?

Rust (그리고 다른 많은 언어들)에서 async/await가 어떻게 구현되는지 때문에, 내부적으로는 해당 메서드 안에 있는 모든 futures를 포함하는 상태 머신 타입을 생성합니다.

그런데 이제 여기에 재귀를 추가하면, 생성된 타입이 자기 자신을 참조하기 시작합니다 — 그래서 내부적으로 잠재적으로 무한히 재귀적인 타입으로 폭발하고 컴파일러는 타입의 크기를 결정할 수 없게 됩니다.

은 폭발하는 것을 막기 위해, 재귀를 수정하여 Box에 포장된 Future를 반환해야 하는데, 그러면 힙에 대한 포인터만 얻게 되어 전체 객체가 아닌 포인터를 제공하여 내부적으로 무한 자기 참조를 방지할 수 있습니다.

<div class="content-ad"></div>

이 문제에 대해 좀 더 읽어보고 더 깊이 파고들어보시는 것을 추천드립니다. 많은 언어에서 나타나는 언어 디자인 질문과 개념들을 다루고 있습니다. 하지만 지금은 async_recursion 크레이트를 사용할 것이니, Cargo.toml로 이동해서 다음과 같이 추가해주세요:

```js
[dependencies]
..
async-recursion = "1.0.2"
```

그리고 함수에 #[async_recursion] 매크로를 붙여서 Box 처리할 수 있도록 해주세요.

이제 이 문제를 해결했으므로, 원래의 sort_items 메서드로 돌아가서 마침내 API 요청에 응답할 차례입니다. 마지막으로 그곳에 Client 인스턴스를 추가한 채로, 그 아래로 내려가서 sort_recursively 메서드를 호출하고, map_err를 사용하여 오류를 ErrorResponse 구조체로 매핑하고, JSON으로 래핑하여 응답으로 반환하고, map을 사용하여 Ok 결과를 적절한 응답으로 바꿉니다:

<div class="content-ad"></div>

```js
sort_recursively(categories, prompt_slices, client).await
    .map_err(|e| 
        (StatusCode::INTERNAL_SERVER_ERROR, 
        Json(ErrorResponse { message: e })).into_response())
    .map(|wrapper| {
        let new_categories = wrapper.categories.iter().map(|item| {
            CategoryWithItems {
                category_id: item.category_id.to_owned(),
                category_name: item.category_name.to_owned(),
                items: item.items.to_owned(),
            }
        }).collect::<Vec<CategoryWithItems>>();
        (StatusCode::OK, Json(Categories {
            categories: new_categories
        })).into_response()
    })
```

그리고 이렇게 하면, 이제 우리의 서비스가 완료되었습니다!

우리는 응답을 가져와서 형식을 지정하고 사용자에게 돌려줍니다. 우리의 계획은 안전하고 제대로 되어 있습니다. 배포해야 할 일만 남았는데, 인스턴스 프로비저닝, 보안 그룹 설정 또는 도커파일 작성에 대해 걱정할 필요가 없습니다. 셔틀을 통해 서비스를 만들었기 때문에 단순히 터미널을 사용하여 쉽게 배포할 수 있습니다.

쉘에서 프로젝트 폴더를 열고 다음을 입력하세요:

<div class="content-ad"></div>

카고 셔틀을 배포했습니다.

이제 일어서서 몇 번 숨 쉬고, 커피 한 모금을 한 후, 새로운 서버가 이미 https://projectname.shuttleapp.rs/ 에서 구동되고 있다는 것을 알게 될 거에요.

자, 그런데... 이 작업을 왜 했더라?

아, 맞다, JS 확장 프로그램을 작성 중이었죠. 서버가 올라와서 거의 다 완성됐어요. 확장 프로그램으로 이동해서 localhost 엔드포인트를 방금 셔틀로부터 받은 실제 엔드포인트로 교체하기만 하면 돼요.

<div class="content-ad"></div>

이제 확장 프로그램을 테스트하기 위해 작은 창에 로드하세요. 정렬 버튼을 누르고 잠시 기다리면 — 바로 그렇습니다! 탭이 마법처럼 올바른 그룹으로 정리될 것입니다! 마침내!

이제 본격적으로 하나의 창에서 해보죠 — 탭이 이미 600개가 가까워진 창이죠. 그러니까 정렬 버튼을 누르고 — 기다려보세요...

...기다려보세요...

.....조금 더 기다려보세요...

<div class="content-ad"></div>

잠시만 기다려주세요...

60초보다 훨씬 오래 걸리고 있는 것 같네요...

아, 기다려봐요...

에러가 발생한 것 같네요?

<div class="content-ad"></div>

앗— 토큰 한도에 도달했네요!

왜 그럴까요? 우린 전체 덩어리를 맞게 만들기 위해 청킹 작업을 했는데 말이죠?

음, 많이 보니까 프롬프트 크기 계산이 좀 더 정확히 필요해 보여요.

그리고 재귀가 문제를 일으키고 있는 것 같아요— 각 프롬프트에 이전 카테고리를 모두 추가하는 방식으로 크기가 폭발적으로 증가하고 전체 체인을 완료하는 데 정말 매우 오랜 시간이 걸리고요— 60초보다 훨씬 더 말이에요.

<div class="content-ad"></div>

그리고 마지막으로, 카테고리가 조금... 별로네요.

다음 반복에 할 일이 더 많아져서 좋네요. 이 재귀를 제거하는 방법, GPT 토크나이저 사용법, 딕셔너리 파일을 이진 파일에 넣는 방법, 그리고 시간을 낭비하지 않고 셔틀의 정적 폴더 서비스를 사용하는 방법 등을 알아볼 거에요.

또한 모델을 미세 조정해서 토큰을 줄이면서 더 나은 결과를 얻을 예정이에요. 그리고 우리가 게으르다는 것을 감안해, 훈련 데이터 생성은 GPT 자체를 사용할 거예요.

지금까지 읽어 주셔서 감사합니다. 다음 시리즈에서 계속해서 발전하고 잠재적 문제를 해결할 예정이니 걱정 마시고 '인간 대 기계'의 다음 에피소드에서 만나요.

<div class="content-ad"></div>

`<img src="/assets/img/2024-05-20-Sorting400Tabsin60SecondsWithJavaScriptRustandGPT-3_7.png" />`