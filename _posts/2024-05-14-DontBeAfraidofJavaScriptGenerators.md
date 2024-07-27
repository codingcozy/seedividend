---
title: "JavaScript 제너레이터에 대해 두렵지 마세요"
description: ""
coverImage: "/assets/img/2024-05-14-DontBeAfraidofJavaScriptGenerators_0.png"
date: 2024-05-14 14:20
ogImage: 
  url: /assets/img/2024-05-14-DontBeAfraidofJavaScriptGenerators_0.png
tag: Tech
originalTitle: "Don't Be Afraid of JavaScript Generators"
link: "https://medium.com/stackademic/dont-be-afraid-of-javascript-generators-15c998aea652"
---


![이미지](/assets/img/2024-05-14-DontBeAfraidofJavaScriptGenerators_0.png)

솔직히 말해봅시다: 제너레이터를 사용한 코드를 얼마나 자주 만나게 되나요?

매일 다양한 개발자들의 코드를 검토하지만, 제너레이터를 거의 만나지 못합니다.

그 이유는 무엇일까요?



사람들은 이해하지 못하나요? 아니면 혜택을 못 보는 건가요?

JavaScript는 유연성과 폭넓은 기능으로 유명한데요, ECMAScript 2015에서 독특한 도구인 제너레이터를 소개했습니다. 이들은 비동기 프로그래밍을 제어하고, 반복 가능한 객체를 생성하며, 여러 값을 반환하는 강력한 수단입니다. 이 안내서에서는 제너레이터의 동작 방식, 적용 분야, 그리고 어떻게 잠재력을 활용할 수 있는지 배워볼 거에요.

# 제너레이터란 무엇인가요?

제너레이터는 전통적인 함수와 다릅니다. 그들은 실행을 여러 번 시작하고 중단할 수 있어요. 이는 여러 값을 반환하고 나중에 실행을 계속할 수 있게 해주어 비동기 작업을 관리하거나, 반복자를 생성하거나, 끝없는 데이터 스트림을 처리하는 데 완벽한 방법입니다.



생성기는 function* 구문으로 구분됩니다. 다음 기본 예제를 살펴보세요:

```js
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}
```

여기서 yield는 값을 반환하고 생성기의 실행을 일시 중단합니다. 각 호출마다, 생성기는 그 다음 값을 반환합니다.

# 생성기 객체와 상호 작용하기



제너레이터 함수를 호출하면 해당 바디가 직접 실행되지 않습니다. 대신, 실행을 제어할 수 있는 제너레이터 객체가 생성됩니다. 이 객체는 순회 가능하므로 for...of 루프 및 유사한 작업에 적합합니다.

제너레이터 객체를 살펴봅시다:

- next(): 이 메소드는 제너레이터를 다시 시작하고, 다음으로 순회된 값을 반환하며, 제너레이터가 완료되었는지(done 속성으로 확인합니다.
이전에 작성한 generateSequence 예제를 사용하여:

```js
console.log(generator.next()); // { value: 1, done: false }
```



- return(): 이 메서드는 generator를 일찍 종료시키며, 마치 return 명령을 실행한 것처럼 동작합니다.

```js
console.log(numbers.return(100)); // { value: 100, done: true }
```

- throw(): 이 메서드는 오류를 삽입할 수 있게 해주며, generator 내부에서 오류 처리를 간편하게 할 수 있습니다.

```js
function* generateTasks() {
  try {
    yield "작업 시작";
    yield "작업 진행 중";
    yield "작업 거의 완료";
  } catch (error) {
    console.log('문제 발생:', error.message);
  }
}

const tasks = generateTasks();

console.log(tasks.next().value); // 출력: "작업 시작"
console.log(tasks.next().value); // 출력: "작업 진행 중"
tasks.throw(new Error('이런! 문제가 발생했어요.')); 
// 출력: "문제 발생: 이런! 문제가 발생했어요."
console.log(tasks.next()); // 출력: { value: undefined, done: true }
```



위의 예제에서는 next() 메서드를 사용하여 몇 가지 작업을 시작한 후 throw() 메서드를 사용하여 오류를 발생시킵니다. 제너레이터는 try-catch 블록 덕분에이 오류를 캡처하여 오류 메시지를 기록하고 오류 시나리오를 단호하게 처리합니다.

# 무한 데이터 스트림을 위한 제너레이터 활용

제너레이터는 무한 데이터 스트림을 처리하는 데 뛰어납니다. 요청 시에만 값을 생성하는 잠재적으로 끝없는 데이터 구조를 설계할 수 있습니다. 웹 애플리케이션에서의 무한 스크롤링과 같은 상황을 생각해보세요.

```js
function* infiniteNumbers() {
  let index = 0;
  while (true) {
    yield index++;
  }
}
```



I confess, while(true) could scare anyone at first glance, but that is the magic of generators.

# Synchronous and Asynchronous Iteration with Generators

When blended with promises, generators can emulate the async/await pattern, offering a neater, more intuitive method to draft asynchronous code. To illustrate, let’s fetch data using a generator:

```js
function* fetchData() {
  const users = yield fetch('https://api.example.com/users');
  console.log('Users:', users);
  // ...
}
```



# 제너레이터의 고급 활용

async/await는 간단한 비동기 작업에 유용하지만, 다양한 기능을 제공하는 제너레이터는 더 다양한 가능성을 제공합니다.

- 제너레이터 조합: 이를 통해 여러 개의 제너레이터를 매끄럽게 통합하여 복잡한 값 시퀀스를 만들 수 있습니다.

```js
function* generateSequence() {
  yield* generateNumbers();
  yield* generateCharacters('A', 'Z');
}
```



- 무한 생성기: 생성기는 무한한 값 시퀀스를 생성할 수 있어 연속 데이터 스트림이나 무한한 알고리즘에 이상적입니다. 위의 while (true)을 기억하시나요?

# 실세계 시나리오 (업데이트): 무한 스크롤

![이미지](/assets/img/2024-05-14-DontBeAfraidofJavaScriptGenerators_1.png)

자바스크립트 생성기에 대한 중요하고 실용적인 응용 프로그램을 개념화하는 것이 어려울 수 있습니다. 그러나 생성기는 비동기 코드와 매끄럽게 통합되며 무한한 반복을 지원하는 등 다양한 기능을 제공합니다. 예시를 살펴보죠.



하단에 제시된 코드는 순수히 예시로 제시된 것입니다. 실제로 사용할 준비가 된 코드는 다양한 예외 상황을 처리해야 합니다.

무한 스크롤을 지원하는 소셜 미디어 피드를 구성하는 것을 제안합니다. 다시 말해, 사용자가 목록의 끝까지 스크롤하면 추가적인 게시물이 가져와서 피드에 추가됩니다.

두 번째 주의: 제너레이터는 한 가지 접근법을 제공하지만, JavaScript 생태계에서 단독적인 것은 아닙니다. 비슷한 결과를 얻기 위한 대체 방법이 있습니다. 그럼에도 불구하고, 학습을 위해 사용자가 스크롤할 때 게시물을 계속해서 가져오는 메커니즘을 구성해보겠습니다.

먼저, 데이터를 담을 기본적인 HTML/CSS 구조를 설정해보겠습니다. 실험해보고 싶다면 사용하실 수 있습니다:



```js
// CSS 코드
.post {
  height: 300px;
}

// HTML 코드
<div id="postsContainer">
  
</div>
```

다음은 "10개의 게시물"을 가져오기 위해 설계된 스크립트를 검토할 것입니다. 사용자가 스크롤하고 페이지 끝에 가까워지면 생성기가 작동하여 다음 10개의 게시물을 가져올 것입니다:

```js
// 일반 `fetch`를 대체하기 위한 것일 뿐입니다
// 10개의 게시물을 생성하고 반환합니다
async function simulatedFetch(currentPage) {
  const posts = Array.from({ length: 10 }, (_, i) => ({ content: `포스트 - ${currentPage}${i}` }));
  return Promise.resolve(posts)
}

async function* paginatedFetcher(apiUrl, itemsPerPage) {
    let currentPage = 0;

    while (true) {
        // 현실적인 경우에 대한 주석
        // const response = await fetch(`${apiUrl}?page=${currentPage}&limit=${itemsPerPage}`);
        const response = await simulatedFetch(currentPage)
      
        // const posts = await response.json();
        const posts = response;
      
        if (posts.length === 0) {
            return;  // 데이터의 끝
        }
      
        yield posts;
        currentPage++;
    }
}

// 무한 스크롤과 함께 사용:
// API는 설명적인 역할로 실제 사용되지는 않습니다
const getPosts = paginatedFetcher('https://api.example.com/posts', 10);

// DOM에 게시물을 표시하는 함수
function displayPosts(posts) {
  const container = document.getElementById('postsContainer');
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerText = post.content;
        container.appendChild(postElement);
    });
}

// 무한 스크롤 로직
window.onscroll = async function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        const { value } = await getPosts.next();
        if (value) {
            displayPosts(value);
        }
    }
};

// 초기 데이터 가져오기
(async () => {
    const { value } = await getPosts.next();
    displayPosts(value);
})();
```

# 결론



JavaScript에서의 생성기들은 그저 새로운 것뿐만이 아니라, 비동기 작업을 다루는 데 중요하며, 반복 가능한 객체를 만드는 데도 중요합니다.

다음에 데이터를 실시간으로 관리해야 할 때, 생성기를 사용하기 주저하지 마세요.

실제 시나리오에서 생성기를 효과적으로 활용한 경험이 있다면 공유해 주세요. 더 많은 예시를 만나면, 어디에 활용하는 게 가장 적절한지 더 쉽게 알 수 있을 거예요.

저와 소통하세요! 저는 아래에서 찾을 수 있어요:
- Medium: https://medium.com/@yuribett
- Linkedin: https://www.linkedin.com/in/yuribett/
- X (formerly Twitter): https://twitter.com/yuribett



# Stackademic

끝까지 읽어 주셔서 감사합니다. 떠나시기 전에:

- 작가를 향한 박수와 팔로우를 고려해주세요! 👏
- 트위터(X), 링크드인, YouTube에서 저희를 팔로우해 주세요.
- 세계적으로 프로그래밍 교육을 민주화하는 Stackademic.com에서 더 많은 정보를 찾아보세요.