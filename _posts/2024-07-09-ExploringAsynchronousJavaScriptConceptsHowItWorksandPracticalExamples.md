---
title: "비동기 자바스크립트 완전 정복 개념, 작동 방식, 실용적인 예시들"
description: ""
coverImage: "/assets/img/2024-07-09-ExploringAsynchronousJavaScriptConceptsHowItWorksandPracticalExamples_0.png"
date: 2024-07-09 08:57
ogImage:
  url: /assets/img/2024-07-09-ExploringAsynchronousJavaScriptConceptsHowItWorksandPracticalExamples_0.png
tag: Tech
originalTitle: "Exploring Asynchronous JavaScript: Concepts, How It Works, and Practical Examples"
link: "https://medium.com/@rajataha062/exploring-asynchronous-javascript-concepts-how-it-works-and-practical-examples-ea35dcd5b0d6"
isUpdated: true
---

현대 웹 개발에서 비동기 JavaScript는 기본적인 개념으로, 서버에서 데이터를 가져오거나 코드 실행을 지연시키면서 전체 응용 프로그램이 멈추지 않게 하는 것을 가능하게 합니다. 이 기사에서는 비동기 JavaScript의 핵심 개념, 작동 방식, GitHub 프로필 웹사이트와 같은 프로젝트에서 얻은 통찰을 포함한 실용적인 예제를 살펴볼 것입니다.

![이미지](/assets/img/2024-07-09-ExploringAsynchronousJavaScriptConceptsHowItWorksandPracticalExamples_0.png)

# 비동기 JavaScript 이해

동기 vs. 비동기

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

동기 프로그래밍에서는 작업이 하나씩 순차적으로 실행되며, 현재 작업이 완료될 때까지 다음 작업의 실행이 차단됩니다. 이는 네트워크 요청과 같이 시간이 오래 걸리는 작업을 처리할 때 비효율적일 수 있습니다.

```js
// 동기 코드 예제
console.log("시작");

function wait(seconds) {
  const start = new Date().getTime();
  let end = start;
  while (end < start + seconds * 1000) {
    end = new Date().getTime();
  }
}

wait(3);
console.log("끝");
```

반면에 비동기 프로그래밍은 작업이 동시에 실행되도록 하여, 일부 작업이 완료될 때까지 기다리는 동안 다른 작업을 실행할 수 있습니다.

```js
// 비동기 코드 예제
console.log("시작");

setTimeout(() => {
  console.log("끝");
}, 3000);

console.log("실행 계속...");
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

Callback 함수

Callback은 비동기 작업을 처리하는 데 사용되는 가장 초기의 방법 중 하나입니다. Callback은 다른 함수에 인자로 전달된 함수로, 비동기 작업이 완료되면 실행됩니다.

```js
function fetchData(callback) {
  setTimeout(() => {
    callback("데이터를 가져왔어요");
  }, 2000);
}

console.log("데이터를 가져오는 중...");
fetchData((data) => {
  console.log(data);
});
console.log("실행 계속 중...");
```

Promises

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

약속은 비동기 작업을 처리하는 더 견고한 방법을 제공하며, 지금 사용 가능하거나 미래에 사용 가능하거나 아예 사용할 수 없는 값을 나타냅니다. 약속은 대기 중(pending), 이행(fulfilled), 또는 거부된(rejected) 상태 중 하나에 있을 수 있습니다.

```js
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("데이터 가져옴");
    }, 2000);
  });
}

console.log("데이터 가져오는 중...");
fetchData()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });
console.log("실행 계속됨...");
```

비동기/대기

ES2017에서 소개된 비동기/대기는 동기식으로 비동기 코드를 작성할 수 있게 해주어 코드를 더 읽기 쉽고 디버그하기 쉽게 만듭니다.

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
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data fetched");
    }, 2000);
  });
}

async function fetchAsyncData() {
  console.log("Fetching data...");
  const data = await fetchData();
  console.log(data);
}

fetchAsyncData();
console.log("Continuing execution...");
```

# 프로젝트에서의 실용적 예제

이러한 개념들이 GitHub 프로필 웹사이트와 같은 현실 세계 프로젝트에 어떻게 적용될 수 있는지 살펴보겠습니다.

GitHub 프로필 데이터 가져오기

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

유저의 GitHub 프로필 정보를 표시해야 하는 프로젝트에서는 GitHub API에서 데이터를 비동기적으로 가져올 수 있습니다.

```js
async function getGitHubProfile(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error("네트워크 응답이 옳지 않습니다");
    }
    const profile = await response.json();
    displayProfile(profile);
  } catch (error) {
    console.error("Fetch 오류:", error);
  }
}

function displayProfile(profile) {
  const profileDiv = document.getElementById("profile");
  profileDiv.innerHTML = `
        <h2>${profile.name}</h2>
        <img src="${profile.avatar_url}" alt="${profile.name}" />
        <p>${profile.bio}</p>
    `;
}

getGitHubProfile("octocat");
```

다중 비동기 작업 처리

또한 리포지토리를 가져오고 프로필 세부 정보를 동시에 가져와야 하는 경우도 있습니다.

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
async function getGitHubData(username) {
  try {
    const [profileResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos`),
    ]);

    if (!profileResponse.ok || !reposResponse.ok) {
      throw new Error("네트워크 응답이 올바르지 않습니다");
    }

    const profile = await profileResponse.json();
    const repos = await reposResponse.json();

    displayProfile(profile);
    displayRepos(repos);
  } catch (error) {
    console.error("Fetch 오류:", error);
  }
}

function displayProfile(profile) {
  const profileDiv = document.getElementById("profile");
  profileDiv.innerHTML = `
        <h2>${profile.name}</h2>
        <img src="${profile.avatar_url}" alt="${profile.name}" />
        <p>${profile.bio}</p>
    `;
}

function displayRepos(repos) {
  const reposDiv = document.getElementById("repos");
  repos.forEach((repo) => {
    const repoItem = document.createElement("div");
    repoItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
    reposDiv.appendChild(repoItem);
  });
}

getGitHubData("octocat");
```

# 결론

비동기 JavaScript는 효율적이고 블로킹되지 않는 웹 애플리케이션을 구축하는 데 필수적입니다. 콜백, 프로미스, async/await와 같은 개념을 이해하고 활용함으로써, 개발자는 더 반응적이고 성능이 우수한 애플리케이션을 만들 수 있습니다. API에서 데이터를 가져오거나 파일 작업을 수행하거나 사용자 상호작용을 처리하는 경우, 비동기 JavaScript를 숙달함으로써 코딩 능력이 크게 향상됩니다.

GitHub 프로필 데이터를 가져와 표시하는 등의 실전 프로젝트를 통해 이러한 개념을 탐구하는 것은 실제 적용 가능성과 중요성을 보여줍니다. 계속해서 기술을 개발하고 완성해 나감에 따라 이러한 비동기 기법은 프로그래밍 도구상의 무척 중요한 도구로 자리잡게 될 것입니다.
