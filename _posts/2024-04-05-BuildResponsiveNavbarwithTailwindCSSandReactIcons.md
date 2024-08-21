---
title: "Tailwind CSS와 React Icons로 반응형 네비게이션 바 만들기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Build Responsive Navbar with Tailwind CSS and React Icons"
link: "https://medium.com/@ryaddev/build-responsive-navbar-with-tailwind-css-and-react-icons-3b13a272dec4"
isUpdated: true
---

# 소개

웹 개발의 동적 세계에서 우아하고 반응 형 네비게이션 바를 생성하는 것은 사용자 친화적 인터페이스를 디자인하는 기본 적인 측면입니다. 이 튜토리얼에서는 강력한 Tailwind CSS와 React Icons의 조합을 사용하여 세련되고 다재다능한 네비게이션 바를 구축하는 과정을 알아보겠습니다. 이 네비게이션 바는 귀하의 응용 프로그램의 시각적 매력을 향상시키는데 그치지 않고 다양한 화면 크기에 매끄럽게 적응하여 최적의 사용자 경험을 제공할 것입니다.

# 시작하기

네비게이션 바 작성 여정을 시작하기 전에, 프로젝트가 필요한 도구로 장착되어 있는지 확인해 보겠습니다. 다음 명령어를 사용하여 Tailwind CSS와 React Icons를 설치해 주세요:

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
# Tailwind CSS 설치하기
npm install tailwindcss

# React Icons 설치하기
npm install react-icons
```

# 네비게이션 바 컴포넌트 구성

자, 이제 튜토리얼 핵심인 네비게이션 바 컴포넌트를 살펴봅시다.

# 네비게이션 바 컴포넌트 (Navbar.jsx)

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
import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  // 상태를 관리하는 useState 훅
  const [nav, setNav] = useState(false);

  // 네비게이션 바 표시를 담당하는 토글 함수
  const handleNav = () => {
    setNav(!nav);
  };

  // 네비게이션 항목을 담은 배열
  const navItems = [
    { id: 1, text: "홈" },
    { id: 2, text: "회사" },
    { id: 3, text: "자료" },
    { id: 4, text: "소개" },
    { id: 5, text: "문의" },
  ];

  return (
    <div className="bg-black flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white">
      {/* 로고 */}
      <h1 className="w-full text-3xl font-bold text-[#00df9a]">리액트.</h1>

      {/* 데스크톱 네비게이션 */}
      <ul className="hidden md:flex">
        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black"
          >
            {item.text}
          </li>
        ))}
      </ul>

      {/* 모바일 네비게이션 아이콘 */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* 모바일 네비게이션 메뉴 */}
      <ul
        className={
          nav
            ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        {/* 모바일 로고 */}
        <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">리액트.</h1>

        {/* 모바일 네비게이션 항목 */}
        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600"
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
```

# 네비게이션바를 앱에 통합하기

준비된 Navbar 컴포넌트를 주 앱 컴포넌트에 손쉽게 통합해봅시다.

# 앱 컴포넌트 (app.js)

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
import React from "react";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
    </div>
  );
}

export default App;
```

# 결론

이제 React 애플리케이션용 시각적으로 매력적이고 반응형 네비게이션 바를 만들었습니다. Tailwind CSS와 React Icons의 기능을 활용하여 다양한 기기에서 훌륭하게 보이며 매끄러운 사용자 경험을 제공하도록 보장했습니다. 프로젝트의 고유한 요구 사항에 맞게 스타일을 사용자 정의하고 기능을 확장하는 것은 자유롭게 진행해주세요. 즐거운 코딩하세요!
