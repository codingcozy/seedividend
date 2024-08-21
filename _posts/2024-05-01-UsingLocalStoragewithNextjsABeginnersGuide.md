---
title: "Next.js에서 로컬 스토리지 사용하는 방법"
description: ""
coverImage: "/assets/img/2024-05-01-UsingLocalStoragewithNextjsABeginnersGuide_0.png"
date: 2024-05-01 18:10
ogImage:
  url: /assets/img/2024-05-01-UsingLocalStoragewithNextjsABeginnersGuide_0.png
tag: Tech
originalTitle: "Using LocalStorage with Next.js: A Beginner’s Guide"
link: "https://medium.com/wesionary-team/using-localstorage-with-next-js-a-beginners-guide-7fc4f8bfd9dc"
isUpdated: true
---

<img src="/assets/img/2024-05-01-UsingLocalStoragewithNextjsABeginnersGuide_0.png" />

로컬 스토리지는 웹 응용 프로그램이 사용자의 브라우저 내에서 데이터를 로컬로 저장할 수 있는 웹 스토리지 유형입니다. 이 웹 API를 사용하면 개발자가 브라우저의 메모리에 키-값 쌍을 저장할 수 있습니다. 이는 브라우저 세션 및 페이지 새로 고침 간에 데이터를 지속적으로 유지하거나 저장하는 데 사용할 수 있는 간단하면서도 강력한 도구입니다. 이는 사용자 환경 설정을 저장하거나 오프라인 환경을 만들거나 나중에 사용할 데이터를 저장하는 데 유용할 수 있습니다.

이 글에서는 로컬 스토리지의 사용 사례와 Next.js 웹 응용 프로그램에서 로컬 스토리지를 사용하는 방법을 살펴보겠습니다.

## 어디에서 로컬 스토리지를 사용할 수 있을까요?

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

로컬 스토리지를 애플리케이션에서 사용할 수 있는 여러 시나리오가 있어요.

- 사용자 설정 저장: 전자 상거래 애플리케이션에서는 사용자가 선호하는 통화를 로컬 스토리지에 저장하여 매번 웹 사이트를 방문할 때 해당 통화로 가격을 자동으로 표시할 수 있어요.
- 임시 데이터 저장: 업무 관리 애플리케이션에서는 사용자가 '할 일' 목록에 추가한 작업을 아직 완료하지 않은 상태로 로컬 스토리지에 저장할 수 있어요. 그래서 브라우저를 닫거나 페이지를 이탈해도 진행 상황이 소멸되지 않아요.
- 폼 데이터 저장: 구직 신청서에서는 사용자가 입력한 데이터를 나중에도 폼으로 돌아와서 진행 상황을 유지할 수 있도록 로컬 스토리지에 저장할 수 있어요.
- 데이터 캐싱: 날씨 애플리케이션에서는 현재 날씨 상황을 로컬 스토리지에 저장하여 사용자가 오프라인일 때에도 접근할 수 있게 할 수 있어요.
- 인증 정보 저장: 소셜 미디어 애플리케이션에서는 사용자의 인증 토큰을 로컬 스토리지에 저장하여 매번 애플리케이션을 열 때마다 로그인할 필요가 없게 할 수 있어요. (로컬 스토리지에 민감한 데이터를 암호화하지 않고 저장하는 것은 추천되지 않아요. 민감한 데이터 암호화를 다루는 방법을 알고 싶다면 이 기사를 참고해보세요.)

## Local Storage 객체

로컬 스토리지를 사용하기 위해서는 브라우저에서 제공하는 localStorage 객체를 사용할 수 있어요. 이 객체에는 로컬 스토리지와 상호작용하기 위한 여러 메소드가 있어요.

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

메서드

다음은 localStorage에서 사용할 수 있는 메서드입니다:

- setItem(key, value): 이 메서드는 키-값 쌍을 로컬 스토리지에 추가하는 데 사용됩니다. 키는 문자열이며 값은 문자열 또는 JavaScript 객체가 될 수 있습니다. 이 값은 저장되기 전에 자동으로 문자열로 변환됩니다.

```js
localStorage.setItem("username", "Anisha");
localStorage.setItem("userId", "12345");
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

- getItem(key): 해당 메서드는 로컬 스토리지에서 키의 값을 검색하는 데 사용됩니다. 키를 매개변수로 받아 해당하는 값을 문자열로 반환합니다.

```js
localStorage.getItem("username");
localStorage.getItem("userId");
```

- removeItem(key): 해당 메서드는 로컬 스토리지에서 키-값 쌍을 제거하는 데 사용됩니다. 키를 매개변수로 받아 해당하는 키-값 쌍을 로컬 스토리지에서 제거합니다.

```js
localStorage.removeItem("username");
localStorage.removeItem("userId");
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

- clear(): 이 메서드는 로컬 스토리지에서 모든 키-값 쌍을 제거하는 데 사용됩니다.

```js
localStorage.clear();
```

- key(index): 이 메서드는 로컬 스토리지에서 특정 인덱스에 있는 키-값 쌍의 키를 검색하는 데 사용됩니다. 인덱스를 매개변수로 받아 해당하는 키를 문자열 형식으로 반환합니다.

```js
const key = localStorage.key(0); // 0번 인덱스의 키를 가져오기
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

- length: 숫자 쌍의 개수를 반환하는 읽기 전용 속성입니다.

```js
const numOfItemsInLocalStorage = localStorage.length();
```

## 로컬 저장소 구현 예시

다음은 Next.js 애플리케이션에서 모든 localStorage 메서드를 사용하는 방법에 대한 완전한 예시입니다:

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

먼저, 우리는 localStorage에 저장할 각 항목에 대한 상태를 만들고 키와 로컬 저장소의 항목 수에 대한 상태를 생성합니다.

```js
const [username, setUsername] = useState<string | null>(null);
const [userId, setUserId] = useState<string | null>(null);
const [userData, setUserData] = useState<{email: string, age: number} | null>(null);
const [keys, setKeys] = useState<string[]>([]);
const [length, setLength] = useState<number>(0);
```

이제 useEffect 훅을 사용하여 브라우저의 localStorage API의 사용 가능 여부를 확인하고, 컴포넌트가 처음으로 렌더링될 때 localStorage에 저장된 키-값 쌍의 값을 검색합니다.

```js
useEffect(() => {
  if (typeof window !== 'undefined' && window.localStorage) {
    let username = localStorage.getItem('username');
    let userId = localStorage.getItem('userId');
    let userData = JSON.parse(localStorage.getItem('userData'));
    let keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      keys.push(localStorage.key(i)!);
    }
    setUsername(username);
    setUserId(userId);
    setUserData(userData);
    setKeys(keys);
    setLength(localStorage.length);
  }
}, []);
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

저희는 handleSave, handleRemove, handleClear 세 가지 이벤트 핸들러를 사용해서 데이터를 저장, 삭제, 지우는 함수를 구현했어요.

handleSave 함수 안에서는 setItem 메서드를 사용하여 로컬 스토리지에 키-값 쌍을 저장해요. 그런 다음 getItem 메서드를 사용하여 그 값을 불러와 setUsername, setUserId, setUserData, setKeys, setLength를 사용해서 상태를 갱신합니다.

```js
function handleSave() {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.setItem("username", "Anisha");
    localStorage.setItem("userId", "12345");
    localStorage.setItem("userData", JSON.stringify({ email: "anisha@example.com", age: 25 }));

    let username = localStorage.getItem("username");
    let userId = localStorage.getItem("userId");
    let userData = JSON.parse(localStorage.getItem("userData")!);
    let keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      keys.push(localStorage.key(i)!);
    }

    setUsername(username);
    setUserId(userId);
    setUserData(userData);
    setKeys(keys);
    setLength(localStorage.length);
  }
}
```

<img src="/assets/img/2024-05-01-UsingLocalStoragewithNextjsABeginnersGuide_1.png" />

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

handleRemove 함수에서는 removeItem 메서드를 사용하여 로컬 저장소에서 `username` 키-값 쌍을 제거하고 setUsername을 사용하여 새 값으로 상태를 업데이트합니다.

```js
function handleRemove() {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.removeItem("username");
    setUsername(null);
  }
}
```

handleClear 함수에서는 clear 메서드를 사용하여 로컬 저장소에서 모든 키-값 쌍을 제거하고 setUsername, setUserId, setUserData, setKeys, setLength를 사용하여 새 값으로 상태를 업데이트합니다.

```js
function handleClear() {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.clear();
    setUsername(null);
    setUserId(null);
    setUserData(null);
  }
}
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

마지막으로 렌더 메서드에서는 localStorage에 저장된 키-값 쌍의 값을 표시하고 로컬 저장소와 상호 작용할 수 있는 버튼을 제공합니다.

```js
<div>
  <button onClick={handleSave}>localStorage에 저장</button>
  <button onClick={handleRemove}>localStorage에서 제거</button>
  <button onClick={handleClear}>localStorage 지우기</button>
  <p>사용자 이름: {username}</p>
  <p>사용자 ID: {userId}</p>
  <p>사용자 데이터: {JSON.stringify(userData)}</p>
  <p>키 목록: {keys.join(", ")}</p>
  <p>로컬 저장소의 총 아이템 수: {length}</p>
</div>
```

코드의 더 자세한 내용을 확인하고 싶다면, 내 GitHub 저장소를 자유롭게 확인해주세요.

## 로컬 저장소 사용 시 보안 고려 사항

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

로컬 스토리지를 사용하는 한 가지 단점은 그 안에 저장된 데이터가 일반 텍스트 형식이라는 것입니다. 이는 악성 스크립트에 의해 쉽게 액세스될 수 있다는 것을 의미합니다. 이는 공격자가 사용자의 장치에 액세스를 얻으면 로컬 스토리지에 저장된 데이터에 잠재적으로 액세스할 수 있다는 것을 의미합니다.

다음은 Next.js 애플리케이션에서 민감한 데이터를 암호화하는 방법을 찾는 데 도움이 되는 이 기사의 제2부입니다. Next.js 앱의 로컬 스토리지에 민감한 데이터를 안전하게 보호하기
