---
title: "DOM 조작 완전정복 기술 및 응용 방법"
description: ""
coverImage: "/assets/img/2024-07-09-DOMManipulationDemystifiedTechniquesandApplications_0.png"
date: 2024-07-09 14:14
ogImage:
  url: /assets/img/2024-07-09-DOMManipulationDemystifiedTechniquesandApplications_0.png
tag: Tech
originalTitle: "DOM Manipulation Demystified: Techniques and Applications"
link: "https://medium.com/@rajataha062/dom-manipulation-demystified-techniques-and-applications-9863d2d3e733"
isUpdated: true
---

웹 개발자에게는 DOM (Document Object Model) 조작이 필수적인 기술입니다. 이 기술은 동적이고 인터랙티브한 웹 페이지를 만들 수 있게 해줍니다. 본 안내서에서는 다양한 DOM 조작 기술을 탐구하고, 그들이 실제 프로젝트에서 어떻게 활용되는지를 소개합니다.

![DOM Manipulation](/assets/img/2024-07-09-DOMManipulationDemystifiedTechniquesandApplications_0.png)

# DOM 이해하기

DOM은 웹 문서를 위한 프로그래밍 인터페이스로, 페이지 구조를 노드 트리로 표현합니다. 이러한 노드들은 JavaScript를 사용하여 콘텐츠, 스타일 및 구조를 업데이트하는 데 활용될 수 있습니다.

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

# 기본 개념

- 노드: HTML 문서 내의 요소, 속성 및 텍스트.
- 요소: HTML 요소를 나타내는 특정 유형의 노드.
- 속성: id, class, src 등 요소의 속성.

# DOM 조작 기술

# 요소 선택하기

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

DOM을 조작하려면 먼저 작업하려는 요소를 선택해야 합니다. JavaScript에서는 다음과 같은 여러 메소드를 제공합니다:

- getElementById() : ID에 따라 요소를 선택합니다.
- getElementsByClassName() : 클래스 이름에 따라 요소를 선택합니다.
- getElementsByTagName() : 태그 이름에 따라 요소를 선택합니다.
- querySelector() : CSS 선택기와 일치하는 첫 번째 요소를 선택합니다.
- querySelectorAll() : CSS 선택기와 일치하는 모든 요소를 선택합니다.

```js
// 요소 선택하기
const elementById = document.getElementById("myId");
const elementsByClassName = document.getElementsByClassName("myClass");
const elementsByTagName = document.getElementsByTagName("div");
const firstElement = document.querySelector(".myClass");
const allElements = document.querySelectorAll(".myClass");
```

# 콘텐츠 수정하기

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

한번 요소를 선택하면 innerHTML, textContent, innerText와 같은 속성을 사용하여 내용을 수정할 수 있어요.

```js
const element = document.getElementById("myId");

// 내용 수정
element.innerHTML = "<strong>새 내용</strong>";
element.textContent = "일반 텍스트 내용";
element.innerText = "다른 텍스트 내용";
```

# 속성 수정

setAttribute(), getAttribute(), removeAttribute() 메소드를 사용하여 요소의 속성을 변경할 수 있어요.

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
const imgElement = document.getElementById("myImage");

// 속성 수정
imgElement.setAttribute("src", "newImage.jpg");
const src = imgElement.getAttribute("src");
imgElement.removeAttribute("alt");
```

# 스타일 수정

스타일은 요소의 style 속성을 접근하여 수정할 수 있습니다.

```js
const element = document.getElementById("myId");

// 스타일 수정
element.style.color = "blue";
element.style.fontSize = "20px";
element.style.display = "none";
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

# 클래스 추가 및 제거

스타일을 동적으로 조작하는 데 클래스 관리는 중요합니다.

```js
const element = document.getElementById("myId");

// 클래스 추가 및 제거
element.classList.add("newClass");
element.classList.remove("oldClass");
element.classList.toggle("activeClass");
```

# 요소 생성 및 추가하기

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

DOM에서 createElement() 및 appendChild()를 사용하여 새 요소를 만들고 추가할 수 있어요.

```js
const newElement = document.createElement("div");
newElement.textContent = "새로운 요소입니다";

const container = document.getElementById("container");
container.appendChild(newElement);
```

# 요소 제거

요소를 제거하려면 removeChild() 메서드를 사용하세요.

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
const container = document.getElementById("container");
const elementToRemove = document.getElementById("myId");
container.removeChild(elementToRemove);
```

# 프로젝트에서의 실용적 응용

# 프로젝트: 동적 To-Do 목록

동적 To-Do 목록 애플리케이션은 요소를 추가, 제거, 수정하는 여러 DOM 조작 기술을 보여줍니다.

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
const addButton = document.getElementById("addButton");
const inputField = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

addButton.addEventListener("click", () => {
  const taskText = inputField.value;
  if (taskText === "") return;

  const taskItem = document.createElement("li");
  taskItem.textContent = taskText;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    taskList.removeChild(taskItem);
  });

  taskItem.appendChild(deleteButton);
  taskList.appendChild(taskItem);

  inputField.value = "";
});
```

# Project: Image Gallery

이미지 갤러리는 동적으로 이미지를 로드하고 표시하는 DOM 조작 기법을 보여줍니다.

```js
const galleryContainer = document.getElementById("gallery");
const images = ["image1.jpg", "image2.jpg", "image3.jpg"];

images.forEach((src) => {
  const imgElement = document.createElement("img");
  imgElement.setAttribute("src", src);
  imgElement.setAttribute("alt", "Gallery image");
  imgElement.classList.add("gallery-image");

  galleryContainer.appendChild(imgElement);
});
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

# 프로젝트: GitHub 프로필 웹사이트

GitHub 프로필 웹사이트에서는 DOM 조작을 통해 사용자 데이터를 동적으로 가져와 표시할 수 있습니다.

```js
async function getGitHubProfile(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error("네트워크 응답이 올바르지 않습니다");
    }
    const profile = await response.json();
    displayProfile(profile);
  } catch (error) {
    console.error("오류 발생:", error);
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

# 마무리

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

DOM 조작을 능숙하게 다루는 것은 동적이고 상호작용적인 웹 페이지를 만들기 위해 중요합니다. 요소 선택, 내용 수정, 속성 및 스타일 관리, 요소 생성 및 삭제 등의 기술을 이해하고 적용함으로써 웹 개발 실력을 향상시킬 수 있습니다. 이러한 기술들은 이론적인 것뿐만 아니라 실용적인 측면도 가지고 있으며, 동적 할일 목록, 이미지 갤러리, GitHub 프로필 웹사이트와 같은 프로젝트에서 관련 기능을 확인할 수 있습니다. 여러분이 실험하고 프로젝트를 구축하는 과정에서 이러한 DOM 조작 기술을 익힘으로써 여러분의 개발 도구상자에서 중요한 부분으로 자리매깁니다.
