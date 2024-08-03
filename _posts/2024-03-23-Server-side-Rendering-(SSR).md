---
title: "Nextjs 13 저장소에서 서버사이드렌더링SSR 사용 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "서버 측 렌더링 SSR"
link: "undefined"
---



# 서버 측 렌더링 (SSR)

> "SSR" 또는 "동적 렌더링"이라고도 불립니다.

페이지가 서버 측 렌더링을 사용하는 경우, 페이지 HTML은 각 요청마다 생성됩니다.

페이지에 서버 측 렌더링을 사용하려면 getServerSideProps라는 비동기 함수를 내보내야 합니다. 이 함수는 서버에서 각 요청마다 호출됩니다.

<div class="content-ad"></div>

예를 들어, 페이지가 자주 업데이트되는 데이터(외부 API에서 가져옴)를 사전 렌더링해야 한다고 가정해봅시다. 이 데이터를 가져오고 이를 페이지로 전달하는 getServerSideProps 함수를 아래와 같이 작성할 수 있습니다:

```js
export default function Page({ data }) {
  // 데이터 렌더링하기...
}

// 이 함수는 모든 요청마다 호출됩니다
export async function getServerSideProps() {
  // 외부 API에서 데이터 가져오기
  const res = await fetch(`https://.../data`);
  const data = await res.json();

  // 데이터를 props를 통해 페이지로 전달하기
  return { props: { data } };
}
```

getServerSideProps는 getStaticProps와 유사하지만 다른 점은 build 시간이 아니라 모든 요청마다 실행된다는 것입니다.

getServerSideProps가 어떻게 작동하는지 더 알아보려면, Data Fetching 문서를 확인해보세요.

<div class="content-ad"></div>
