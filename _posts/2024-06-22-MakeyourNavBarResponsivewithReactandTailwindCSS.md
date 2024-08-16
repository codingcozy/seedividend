---
title: "React와 TailwindCSS로 반응형 NavBar 만드는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-MakeyourNavBarResponsivewithReactandTailwindCSS_0.png"
date: 2024-06-22 05:04
ogImage: 
  url: /assets/img/2024-06-22-MakeyourNavBarResponsivewithReactandTailwindCSS_0.png
tag: Tech
originalTitle: "Make your NavBar Responsive with React and TailwindCSS"
link: "https://medium.com/@egemenc2101/make-your-navbar-responsive-with-react-and-tailwindcss-c1f729318a7b"
isUpdated: true
---




현재의 모바일 중심 세상에서는 반응형 디자인을 만들고 이를 구현하는 것이 모든 기기에서 원활한 사용자 경험을 제공하는 데 필수적입니다. 
오늘은 내비게이션 바에 반응 형성을 어떻게 구현할 수 있는지에 대해 이야기하겠습니다.

1- NavBar.tsx 라는 컴포넌트를 생성하세요 (이 튜토리얼에서 TypeScript를 사용할 것입니다).

2- 더 큰 화면에 대한 NavBar 세부 정보를 구현하십시오. 간단하게 말해서, 이것들은 nav를 플렉스 컨테이너로 만들고 그 안에 웹 사이트 로고, 정렬되지 않은 목록 및 오른쪽에 버튼이 있을 것입니다.

```jsx
  <nav className="flexBetween max-container padding-container relative z-30 py-5">
      <Link href="/">
        <Image src="/hilink-logo.svg" alt="logo" width={74} height={29} />
      </Link>
      <ul className="hidden h-full gap-12 lg:flex">
        {NAV_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className="regular-16 text-gray-500 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
          >
            {link.label}
          </Link>
        ))}
      </ul>

      <div className="lg:flexCenter hidden">
        <Button
          type="button"
          title="Login"
          icon="/user.svg"
          variant="btn_dark_green"
        />
      </div>
```

<div class="content-ad"></div>

위의 코드에서, nav 태그에는 단순히 (flex items-center justify-between)인 flexBetween 특수 css 클래스가 있습니다. 이 컨테이너의 첫 번째 아이템은 로고이고, 그 다음은 웹 사이트 루트로의 내비게이션 링크가 있는 비순서 목록이며, 마지막으로 버튼이 있습니다.

3- 작은 화면을 위한 내비게이션 구현하기.
이제, 1024px보다 작은 화면에는 내비게이션이 없을 것임을 알았습니다 (lg:는 콜론 뒤에 넣은 클래스명이 대형 화면 및 이상에서만 사용된다는 의미입니다).

작은 화면에는 햄버거 아이콘을 넣을 것입니다.

![해당 이미지](/assets/img/2024-06-22-MakeyourNavBarResponsivewithReactandTailwindCSS_0.png)

<div class="content-ad"></div>

그러면 작은 화면용 내비게이션을 넣기 위해 이 버튼이 클릭될 때 언제 체크해야 합니다.
그를 위해:

```js
const [isOpen, setIsOpen] = useState(false);
const changeIsOpen = () => {
 setIsOpen(!isOpen);
};
useEffect(() => {
 console.log(isOpen);
}, [isOpen]);
```

또한 isOpen 상태 변화를 모니터링하기 위해 useEffect 훅을 사용할 수 있습니다:

```js
useEffect(() => {
 console.log(isOpen);
}, [isOpen]);
```

<div class="content-ad"></div>

4- IsOpen 변수 및 changeIsOpen 함수 사용하기

```js
{isOpen && <NavSmallScreen changeIsOpen={changeIsOpen}/>}

<Image
    src="menu.svg"
    alt="menu"
    width={32}
    height={32}
    className="inline-block cursor-pointer lg:hidden"
    onClick={changeIsOpen}
```

5- NavSmallScreen 컴포넌트 구현하기

그다음으로 NavSmallScreen 컴포넌트를 만들겠습니다.

<div class="content-ad"></div>

```js
import {NAV_LINKS} from "@/constants";
import Link from "next/link";
import Image from "next/image";

function NavSmallScreen({changeIsOpen}: {changeIsOpen: () => void}) {
  return (
    <div
      className="flex flex-col items-center min-w-[70vw] z-[105] p-10 h-full w-full fixed left-0 top-0 opacity-90 bg-black  backdrop-blur-md rounded-lg">
      <ul
        className="flex flex-col items-center justify-center gap-10 text-xl h-full ">
        {NAV_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className="regular-16 text-gray-500 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
          >
            {link.label}
          </Link>
        ))}

        <Image
          src="close.svg"
          alt="menu"
          width={32}
          height={32}
          className="inline-block cursor-pointer lg:hidden"
          onClick={changeIsOpen}
        />
      </ul>
    </div>
  );
}

export default NavSmallScreen;
```

![Responsive Navbar](/assets/img/2024-06-22-MakeyourNavBarResponsivewithReactandTailwindCSS_1.png)

저희는 부모 컴포넌트에서 changeIsOpen 함수를 자식 컴포넌트로 전달하고, 이 함수를 클릭시 닫기 아이콘(X)에 사용합니다. 그래서 메뉴가 닫힙니다.

이 게시물을 읽어 주셔서 감사합니다. 여러분의 반응형 목표를 달성하는데 도움이 되었으면 좋겠습니다! 즐거운 하루 되세요!

<div class="content-ad"></div>

GitHub repository 에서 소스 코드를 확인할 수 있습니다.
[이 곳](https://github.com/egemenc21/camptraveler/blob/main/components/Navbar.tsx)에서 확인해보세요.