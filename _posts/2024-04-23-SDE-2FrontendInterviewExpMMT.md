---
title: "프론트엔드 해외 면접 경험 공유2024년"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "SDE -2 Frontend Interview Exp  MMT"
link: "https://medium.com/@prikshit8/sde-2-frontend-interview-exp-mmt-001828ab6dc5"
isUpdated: true
---





인스타헤어를 통해 리쿠루터로부터 전화를 받았어요.

# 라운드 1 — 문제 해결

첫 번째 질문은 JS의 객체를 기반으로 한 질문이었습니다. 같은 질문을 BFE에서 발견했어요. 질문 링크를 통해 이 질문을 해결할 수 있었습니다.

두 번째 질문은 일정 시간 동안 로딩을 보여주고 나중에 컴포넌트를 로드하는 고차 컴포넌트를 만드는 것이었습니다. 이는 React.Suspence 폴리필의 일종이었습니다. 제 솔루션은

# Round 1 — Problem Solving

1st question — was based on objects in JS. I found the same question on BFE. Question link I was able to solve this question.

2nd question - was to make a higher order component which shows loading for some time and then loads the component. It was sort of React.Suspence polyfill. My solution

<div class="content-ad"></div>

3번 질문은 웹 최적화에 관한 것이었습니다. 웹 페이지에 100개의 컴포넌트를 로드하고 모두 서버에서 데이터를 가져온다면 페이지를 최적화하는 방법에 대해 물었습니다. 그래서 저는 컴포넌트를 lazy load할 수 있다고 말했습니다. 그가 "어떻게?"라고 물었고, 그래서 나도 막혔습니다. 그래서 그가 나에게 새로운 내가 알지 못한 개념을 도와주었습니다. 여기서 intersection observer를 사용해야 한다고 했습니다.

# 라운드 2 — 개념적인 라운드

1번 질문은 프로토타입 상속에 기반한 것이었습니다. 프로토 체이닝을 중심으로 한 질문이었습니다. Object.create와 new Object()의 차이에 대해 물었습니다.

2번 질문은 Promises에 기반한 것이었습니다. 무한한 .then을 연쇄적으로 사용하는 방법과 왜 에러 처리에 하나의 catch 문만으로 충분한 이유에 대해 설명해야 했습니다.

<div class="content-ad"></div>

3번 질문은 바닐라 자바스크립트에서 onclick과 React에서 onClick의 차이점에 대해 기반으로 합니다.

4번 질문은 useRef 훅에 기반으로 합니다.

5번 질문은 React Fiber가 무엇인지에 대해 기반으로 합니다.

3라운드 - 기술 매니저 면접

<div class="content-ad"></div>

1번 질문은 월마트에서의 업무와 월마트에서 도전적으로 수행한 작업 및 시간 제약이 있는 상황에서 어떻게 작업을 완료했는지에 대해 물어보는 내용이었습니다.

2번 질문은 키워드 및 클로저 개념을 기반으로 한 내용이었습니다. 연속적인 메소드를 사용하여 add, subtract와 같은 다양한 기능을 수행할 수 있는 calc 함수를 만들어야 했습니다. LeetCode에서 해당 질문을 발견했습니다.

3번 질문은 함수 실행에 대한 제한 속도를 설정하는 것이었습니다. 이는 debounce 함수의 약간 수정된 형태였습니다. debounce 함수는 함수 호출을 취소하는 반면, 여기서는 대기열에 넣는 방식이었습니다. 해당 질문을 웹에서 찾을 수 없었습니다.

4번 질문은 웹 바이탈(Web Vitals)이 무엇이며 왜 필요한지에 대한 내용이었습니다.

<div class="content-ad"></div>

5번 질문 - 리액트에서 HTML에 JS를 어떻게 작성할 수 있을까요? 바벨 로더, 웹팩, JSX에 대해 설명했습니다.
