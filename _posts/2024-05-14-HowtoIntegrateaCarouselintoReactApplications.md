---
title: "리액트 애플리케이션에 캐로셀 통합하는 방법"
description: ""
coverImage: "/assets/img/2024-05-14-HowtoIntegrateaCarouselintoReactApplications_0.png"
date: 2024-05-14 10:53
ogImage: 
  url: /assets/img/2024-05-14-HowtoIntegrateaCarouselintoReactApplications_0.png
tag: Tech
originalTitle: "How to Integrate a Carousel into React Applications"
link: "https://medium.com/@michaeljudelarocca/how-to-integrate-a-carousel-into-react-applications-0e5b4d0e8669"
isUpdated: true
---




## 이 글에서는 AI 도우미와 함께 React 웹사이트를 계속해서 구축하고 있어요! React Responsive Carousel 라이브러리를 사용하여 프로젝트에 캐러셀을 추가하는 방법을 배워보세요. 예상보다 쉬워요!

![이미지](/assets/img/2024-05-14-HowtoIntegrateaCarouselintoReactApplications_0.png)

이 글에서는 AI와 페어 프로그래밍을 통해 배우고 있는 React 개념을 다루며 '스타 워즈 아소카' 웹사이트를 만들어 나가고 있어요.

이 글에서는 React 프로젝트에 이미지 캐러셀을 추가하는 방법에 중점을 둘 거예요.



프로젝트에서 React 이미지 캐러셀을 구현한 방법, 조건부 렌더링 방법 및 통합하는 동안 마주한 일부 어려움에 대해 이야기하겠습니다.

React 프로젝트에 이미지 캐러셀을 추가하는 방법을 알고 싶다면, React Responsive Carousel을 설치하고 Carousel 컴포넌트를 프로젝트에 추가하여 이미지 소스를 넣기만 하면 됩니다.

React Responsive Carousel 라이브러리를 사용해 React 프로젝트에 Carousel 컴포넌트를 추가하려면 다음 단계를 따르세요:

- 다음을 실행하여 React Responsive Carousel 라이브러리를 설치하세요:



```js
npm install react-responsive-carousel
```

- 리액트 파일에서 Carousel 컴포넌트와 스타일을 불러오세요:
  
```js
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // 로더가 필요합니다
```

- 프로젝트에 Carousel 컴포넌트를 추가하고 원하는 속성을 전달하세요:



```js
<뷰캐로셀>
    <div>
        <img src="/assets/image1.jpg" />
        <p className="legend">이미지 1</p>
    </div>
    <div>
        <img src="/assets/image2.jpg" />
        <p className="legend">이미지 2</p>
    </div>
    <div>
        <img src="/assets/image3.jpg" />
        <p className="legend">이미지 3</p>
    </div>
</뷰캐로셀>
```

이 설정을 사용하면 프로젝트에 세 개의 슬라이드가 있는 기본 캐로셀이 포함됩니다. 이미지의 경로에 해당하는 src 속성을 조정하고 필요에 맞게 내용을 수정하세요.

이 기사 시리즈를 따라오고 있거나 React 프로젝트에 이미지 캐로셀을 포함하는 방법에 대해 보다 자세한 설명을 원한다면, 이 기사 계속 읽어보세요!

<img src="/assets/img/2024-05-14-HowtoIntegrateaCarouselintoReactApplications_1.png" />




# 준비물

"스타 워즈 아소카 리액트 웹사이트"를 만드는 시리즈의 기사를 기초로, 이미지 캐러셀을 구현하는 것은 특정 개념을 익히는 것이 필요합니다. 사용된 사용자 지정 컴포넌트와 기능을 이해하기 위해 이전 기사를 참조해주세요.

캐러셀을 만들기 위한 준비물은 다음과 같습니다:

- 사용자 지정 메뉴 및 네비게이션 바 컴포넌트에 대한 이해.
- 햄버거 메뉴 컴포넌트에 대한 이해.



# 아티클 시리즈:

- 리액트 애플리케이션에 YouTube 비디오 통합하는 방법
- 리액트에서 동적 햄버거 메뉴 개발하기: 단계별 가이드
- 리액트에서 드롭다운 메뉴 구축하기: 단계별 가이드
- 파일 분리를 통한 리액트 코드 조직화 방법 안내
- 컴포넌트 식별자를 사용하여 다양한 HTML 요소 동적 렌더링하는 방법 배우기

# 리액트 반응형 캐러셀 라이브러리란?

리액트 반응형 캐러셀 라이브러리는 캐러셀을 리액트 애플리케이션에 통합하는 것을 간단하게 해주는 컴포넌트입니다. 이 라이브러리는 리액트 프로젝트와 동적 캐러셀 기능 간을 원활하게 연결해줍니다. 이미지 슬라이드쇼나 콘텐츠 캐러셀을 웹 페이지 안에 쉽게 포함하고 관리할 수 있게 해줍니다. 이 라이브러리를 사용하면 설치만 하고 프로젝트에 캐러셀 컴포넌트를 삽입하고 보고 싶은 이미지나 콘텐츠로 구성만 하면 됩니다.



React Responsive Carousel 라이브러리는 React 애플리케이션에서 캐러셀의 기능과 외관을 향상시키는 다양한 사용자 정의 옵션을 제공합니다. 이러한 옵션을 사용하여 개인화된 대화형 경험을 만들 수 있습니다.

React Responsive Carousel 라이브러리의 Carousel 컴포넌트를 사용하면 다양한 속성을 사용하여 캐러셀을 사용자 정의할 수 있습니다. 이러한 속성에는 다음이 포함됩니다:

- showArrows: 네비게이션 화살표를 표시할지 여부. 값: true 또는 false.
- showStatus: 슬라이드의 현재 상태 표시 여부. 값: true 또는 false.
- showIndicators: 네비게이션 지시기를 표시할지 여부. 값: true 또는 false.
- infiniteLoop: 슬라이드의 무한 루핑 활성화 여부. 값: true 또는 false.
- useKeyboardArrows: 슬라이드 간 이동에 키보드 화살표 사용 여부. 값: true 또는 false.
- autoPlay: 슬라이드를 자동으로 순환시킬지 여부. 값: true 또는 false.
- stopOnHover: 마우스가 캐러셀 위에 올라갈 때 슬라이드 순환 중지 여부. 값: true 또는 false.
- interval: 슬라이드가 전환되는 간격(밀리초).
- transitionTime: 슬라이드 간 전환 지속 시간(밀리초).
- swipeable: 터치 지원 장치에서 슬라이드 이동을 위한 스와이프 제스처 허용 여부. 값: true 또는 false.
- dynamicHeight: 현재 슬라이드의 높이에 따라 캐러셀 높이 조정 여부. 값: true 또는 false.
- emulateTouch: 터치 지원되지 않는 장치에서 스와이프 활성화 여부. 값: true 또는 false.

참고: 이 라이브러리는 더 이상 제작자가 유지 관리하지 않습니다. react-responsive-carousel에 대해 자세히 알아보려면 문서를 읽어보세요.



# 왜 이 캐러셀 라이브러리를 선택했을까요?

Hashnode AI 어시스턴트에게 조언을 구해서 React 프로젝트에 캐러셀을 추가할 수 있는 옵션에 대해 물어보았어요. React Responsive Carousel은 이제 더 이상 만들자가 관리하지 않지만, 이 라이브러리는 "사용하기 쉬운" 캐러셀로 쉽게 구현할 수 있습니다.

제가 이미지 캐러셀을 프로젝트에 구현하는 데 일정한 노력이 필요할 것이라는 것을 알고, Navbar 및 Hamburger 메뉴 구성 요소에서 이를 제어할 수 있는 기능을 원했기 때문에 쉽게 작업할 수 있는 하나를 선택했어요.

# 나의 캐러셀 메뉴 구성 요소



처음에, 최상의 코딩 관행을 따르기 위해 이미 제작한 메뉴 컴포넌트를 사용하여 이미지 카테고리 옵션(캐릭터, 포스터, 스틸)을 렌더링하려고 시도했습니다. 이미 "video" 카테고리를 제거하는 필터를 추가해야 했기 때문에 이제는 세 가지 이미지 카테고리도 필터링해야 한다는 것을 깨달았습니다.

그래서, 다시 한 번 AI 어시스턴트에게 상담하여 메뉴 컴포넌트를 수정할 지, 아니면 캐러셀을 위해 새로운 컴포넌트를 만들어야 할 지 결정해보았습니다. 실제로 새로운 컴포넌트를 만들 시간이었습니다.

React를 배우면서 주목한 점: 작동하는 코드를 작성하는 방법을 알지만 여러 용도로 컴포넌트를 수정할 때와 별도의 컴포넌트를 작성해야 할 때를 결정하는 것이 여전히 어려운 것 같습니다.

이전에 작성한 메뉴 컴포넌트의 컨텍스트를 제공하여 AI 어시스턴트와 함께 페어 프로그래밍을 하여 캐러셀 메뉴 컴포넌트에 유사한 기능을 만드는 데 도움이 되었습니다.



## 캐러셀 메뉴 컴포넌트

```js
import { carousel_character, carousel_poster, carousel_stills } from "../data.js";

export default function CarouselMenu({ setSelectedCategory, setShowCarousel }) {
    const categoriesMap = {
        character: carousel_character,
        poster: carousel_poster,
        stills: carousel_stills
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(categoriesMap[category] || categoriesMap['character']);
        setShowCarousel(true);
    };

    return (
        <menu>
            {Object.keys(categoriesMap).map((category) => (
                <button className="button-sw"
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
            ))}
        </menu>
    );
}
```

# CarouselMenu 컴포넌트 이해하기

CarouselMenu 컴포넌트는 사용자가 캐릭터, 포스터 및 스틸컷과 같은 이미지 카테고리 간에 전환할 수 있도록 설계되었습니다. 이 컴포넌트가 어떻게 작동하는지 분석하여 사용자가 보고 싶은 콘텐츠를 탐색하고 제어하기 쉽게 만들어 보겠습니다.



## 데이터 가져오기

먼저, 컴포넌트는 data.js 파일에서 특정 데이터 세트를 가져옵니다. 이 데이터 세트는 carousel_character, carousel_poster, carousel_stills라는 이름을 가지고 있으며 각각 다른 이미지 카테고리를 나타냅니다.

## 컴포넌트 설정

CarouselMenu는 setSelectedCategory와 setShowCarousel 두 가지 함수를 props로 받는 함수형 컴포넌트입니다. 이 함수들은 부모 컴포넌트의 상태를 업데이트하기 위해 사용되며, 표시할 이미지 카테고리와 Carousel을 표시할지 여부를 제어합니다.



## 카테고리 매핑

컴포넌트 내부에서 categoriesMap 객체가 생성됩니다. 이 객체는 문자열 키(`character`, `poster`, `stills`)를 이전에 가져온 대응하는 데이터셋으로 매핑합니다. 이 매핑은 사용자 선택에 따라 데이터에 쉽게 액세스할 수 있도록 합니다.

## 카테고리 변경 처리

handleCategoryChange 함수는 상호작용에 매우 중요합니다. 사용자가 메뉴의 버튼 중 하나를 클릭하면 이 함수가 트리거됩니다. 이 함수는 사용자가 클릭한 버튼에 해당하는 카테고리를 인수로 받습니다. 그런 다음 함수는 다음 두 가지 작업을 수행합니다:



- 선택된 카테고리와 관련된 데이터를 사용하여 setSelectedCategory를 호출하여 부모 구성요소의 상태를 업데이트하여 표시할 이미지의 새 카테고리를 반영합니다.
- setShowCarousel을 true로 설정하여 선택된 카테고리마다 Carousel이 표시되도록 합니다.

## 메뉴 렌더링

이 구성요소는 각 카테고리에 대한 버튼이 포함된 `menu` 요소를 반환합니다. 이러한 버튼들은 Object.keys(categoriesMap).map(...)을 사용하여 동적으로 생성되며, 이는 categoriesMap의 키 배열을 생성하고 이를 매핑하여 각 카테고리에 대한 버튼을 만듭니다. 각 버튼은 클릭 이벤트가 있어 handleCategoryChange를 해당 카테고리로 트리거하는 것으로 설정됩니다. 버튼 레이블은 각 카테고리 이름의 첫 글자를 대문자로 변환하여 가독성을 높입니다.

이 구성은 직관적인 네비게이션을 제공하고 인터페이스를 깨끗하고 집중시킴으로써 사용자 경험을 향상시킵니다. 이를 통해 Carousel 내에서 다른 데이터 세그먼트와의 원활한 상호 작용이 가능합니다.



# 네비게이션바 컴포넌트

네비게이션바 컴포넌트는 카테고리 메뉴, YouTube 비디오 및 이제는 React Carousel에서 이미지를 표시하는 모든 앱 기능을 처리합니다.

React Carousel에 중점을 두기 위해 여기에 더 나은 관찰을 위한 Navbar 컴포넌트의 요약 버전이 있습니다:

```js
import { useState } from "react";
import CarouselMenu from "./CarouselMenu";

function Navbar({ setSelectedCategory, setShowCarousel, carousel }) {
    const [isGalleryVisible, setGalleryVisible] = useState(false);

    return (
        <nav>
            <div className="flex-col">
                <div className="flex ctn-navbar">
                    <div
                        className="navbar-buttons desktop-menu"
                        onMouseEnter={() => setGalleryVisible(true)}
                        onMouseLeave={() => setGalleryVisible(false)}
                    >
                        GALLERY
                        {isGalleryVisible && (
                            <div className="dropdown-menu dropdown-menu-carousel">
                                <CarouselMenu
                                    setSelectedCategory={setSelectedCategory}
                                    setShowCarousel={setShowCarousel}
                                    carousel={carousel}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
```



# 주요 포인트:

- 동적 가시성: isGalleryVisible 상태는 캐러셀 메뉴의 가시성을 제어합니다. "GALLERY" 버튼에서의 마우스 이벤트(onMouseEnter, onMouseLeave)에 의해 토글됩니다. 이 접근 방식은 필요할 때만 캐러셀을 표시하는 사용자 친화적인 방법을 제공하여 혼잡도를 줄이고 UI 반응성을 향상시킵니다.
- 캐러셀 메뉴 통합: "GALLERY" 섹션이 활성화된 경우(isGalleryVisible이 true인 경우), CarouselMenu 컴포넌트가 렌더링됩니다. 이 컴포넌트는 캐러셀에 표시될 이미지 카테고리 선택을 처리하는 데 중요합니다.
- 상호 작용 핸들러: CarouselMenu에 setSelectedCategory 및 setShowCarousel 함수가 props로 전달됩니다. 이러한 함수는 CarouselMenu 내에서 사용되어 사용자 상호 작용에 기반하여 애플리케이션의 상태를 업데이트하는 데 사용됩니다.             
                           
이 설정은 Navbar 컴포넌트가 캐러셀 기능과 효과적으로 통합되어 원활하고 대화식 사용자 경험을 제공함을 보장합니다.

# 햄버거 메뉴 컴포넌트



이 섹션에서는 햄버거 메뉴 구성 요소 내에서 캐러셀이 통합되어 작동하는 방법을 유사하게 종합적으로 살펴볼 것입니다.

## 구성 요소 구조 및 상태 관리

햄버거 메뉴는 내용물의 가시성을 제어하기 위해 여러 상태 변수를 사용합니다:

- isActive : 햄버거 메뉴가 활성화되어 있는지 여부를 결정합니다.
- isCarouselVisible : 메뉴 내 캐러셀 옵션의 가시성을 제어합니다.



```js
const [isActive, setIsActive] = useState(false);
const [isCarouselVisible, setCarouselVisible] = useState(false);
```

## 동적 UI 조정을 위한 효과

이 컴포넌트는 React의 useEffect를 활용하여 UI의 동적 변경을 처리합니다. 활성화 상태를 기반으로 UI에서 동적 변경이 이뤄집니다. 햄버거 메뉴가 활성화되면 데이터 뱅크와 캐러셀 메뉴와 같은 다른 상호 작용 요소가 숨겨진 기본 상태로 재설정됩니다.

```js
useEffect(() => {
    if (isActive) {
        setDatabankVisible(false);
        setCarouselVisible(false); // 햄버거를 토글할 때 캐러셀 메뉴를 닫습니다
    }
}, [isActive]);
```



## 캐러셀 가시성 토글

햄버거 메뉴에는 "갤러리"를 위한 인터랙티브 섹션이 포함되어 있으며 상호 작용 시 캐러셀 메뉴의 가시성을 토글합니다. 이는 마우스 이벤트(onMouseEnter 및 onMouseLeave)를 활용하여 isCarouselVisible 상태를 설정하는 방식으로 처리됩니다. 이 접근 방식은 필요할 때만 캐러셀에 접근할 수 있는 사용자 친화적인 방법을 제공하며 응용 프로그램의 사용성과 인터페이스의 청결함을 향상시킵니다.

```js
<div
    className="navbar-buttons"
    onMouseEnter={() => setCarouselVisible(true)}
    onMouseLeave={() => setCarouselVisible(false)}
>
    GALLERY
    {isCarouselVisible && (
        <CarouselMenu
            setSelectedCategory={setSelectedCategory}
            setShowCarousel={setShowCarousel}
        />
    )}
</div>
```

## 기능성 및 사용자 상호작용



handleClick함수는 햄버거 메뉴의 isActivestate를 토글하여 드롭다운 메뉴 항목의 전반적인 가시성을 제어합니다. 또한 toggleCarouselfunction은 캐러셀의 가시성을 명시적으로 토글하는 방법을 제공하여 메뉴의 상호작용 능력을 더욱 향상시킵니다.

```js
function handleClick() {
    setIsActive(!isActive);
}
```

이 햄버거 메뉴 설정은 캐러셀 기능이 매끄럽게 통합되어 있어 응용 프로그램의 다양한 섹션을 탐색하기 위한 간결하고 효과적인 사용자 인터페이스를 제공합니다.

# 메뉴 컴포넌트



위 코드는 Menu 컴포넌트 내에서 React 캐러셀이 관리되는 방식에 초점을 맞춘 버전입니다. 기본적으로 사용자가 캐러셀에 없는 카테고리를 선택하면 React 캐러셀이 숨겨집니다:

```js
function Menu({ setSelectedCategory, setShowCarousel, categories }) {
    return (
        <menu>
            {Object.keys(categories)
                .filter((category) => category !== "youtube")
                .map((category) => (
                    <button className="button-sw"
                        key={category}
                        onClick={() => {
                            setSelectedCategory(categories[category]);
                            setShowCarousel(false);
                        }}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
        </menu>
    );
}
```

# 주요 기능:

- 카테고리 필터링: Menu는 특정 카테고리(예: `youtube`)를 걸러내어 표시되는 버튼을 조정합니다. 이를 통해 상호 작용할 수 있는 관련 카테고리만 포함됩니다.
- 버튼 다이내믹스: 각 버튼은 사용 가능한 카테고리를 기반으로 동적으로 생성되며, 필터링된 항목은 제외됩니다. 버튼 텍스트는 가독성과 미적 매력을 높이기 위해 대문자로 표시됩니다.
- 상태 관리: 버튼을 클릭하면 두 가지 중요한 기능이 호출됩니다:
  - setSelectedCategory(categories[category]): 이 함수는 선택한 카테고리를 반영하도록 상태를 업데이트하여 캐러셀이나 다른 구성 요소에 표시되는 데이터 또는 이미지를 결정합니다.
  - setShowCarousel(false): 이 함수는 캐러셀의 가시성을 제어하여 캐러셀을 숨길 수 있도록 합니다. 이미지와 관련이 없는 카테고리가 선택된 경우 또는 캐러셀이 필요하지 않은 경우에 사용됩니다.



이 구성은 애플리케이션의 상호작용성을 향상시키고 사용자 인터페이스가 깨끗하고 집중력이 있으며 사용자 입력에 반응할 수 있도록 보장합니다.

# 주요 애플리케이션 구성 요소에서 React 캐러셀 구현하기

React 애플리케이션의 주요 Appcomponent에서 React Responsive Carousel 통합은 콘텐츠의 동적 프레젠테이션을 향상시키는 데 중요한 역할을 합니다. 여기에는 캐러셀이 이 구성 내에서 어떻게 구현되고 작동하는지에 대한 개요가 있습니다:

## 캐러셀 가시성을 위한 상태 관리



AppComponent은 여러 상태 변수를 관리하지만 캐로셀 기능에 중요한 것은 showCarousel과 selectedCategory입니다. showCarousel 상태는 캐로셀을 표시해야 하는지 여부를 결정하고, selectedCategory는 캐로셀에 표시될 항목 데이터를 보유합니다.

```js
const [showCarousel, setShowCarousel] = useState(false);
const [selectedCategory, setSelectedCategory] = useState(characters);
```

## 캐로셀의 조건부 렌더링

캐로셀은 showCarousel 상태에 따라 조건부로 렌더링됩니다. showCarousel이 true이면 캐로셀이 표시되고, 그렇지 않으면 StarWarsCard와 같은 다른 컴포넌트가 표시됩니다. 이 접근 방식은 유연하고 사용자 중심의 표시를 가능하게 하며, 캐로셀과 다른 콘텐츠 뷰 간을 전환할 수 있습니다.



```js
{showCarousel가 true이면 (
    <Carousel className="ctn-carousel">
        {selectedCategory && selectedCategory.map((item) => (
            <div key={item.name}>
                <img src={item.image} />
                <p className="legend">{item.name}</p>
            </div>
        ))}
    </Carousel>
)}
```

## 캐로셀 콘텐츠 동적

캐로셀의 내용은 선택한 카테고리에서 동적으로 생성됩니다. 선택한 카테고리의 각 항목이 캐로셀 슬라이드에 매핑되어 이미지와 캡션(이름)이 표시됩니다. 이 동적 매핑은 캐로셀이 항상 선택한 카테고리의 콘텐츠와 최신 정보를 유지할 수 있도록 합니다.

## 네비게이션 바와의 상호작용



Navbar 컴포넌트는 App 컴포넌트와 상호작용하여 selectedCategory를 설정하고 showCarousel 상태를 토글합니다. 이 설정은 Navbar이 제어판 역할을 하며 어떤 콘텐츠가 어떻게 표시되는지에 영향을 미치는 역할을 명확히 보여줍니다.

```js
<Navbar
    categories={categories}
    setSelectedCategory={setSelectedCategory}
    setShowCarousel={setShowCarousel}
/>
```

App 컴포넌트에서 이 디자인 패턴은 캐러셀이 어플리케이션의 시각적 매력을 높이는 데만 그치는 것이 아니라, 원활하고 상호작용이 가능한 사용자 경험을 제공한다는 것을 보장합니다.

# 직면한 문제들



초반에는 캐러셀 썸네일을 이미지 위에 표시하도록 재배치하려고 했어요. 여러 번 시도했지만 성공하지 못했어요. 먼저 리액트 캐러셀 컴포넌트 자체에 들어가보려고 했지만, 내 의심이 확인되어 내 코드 변경이 프로젝트에서 리액트 캐러셀 라이브러리를 업데이트하면 덮어씌워질 거라는 제 AI 도우미가 알려줬어요!

두 번째 시도는 CSS 파일을 사용해서 캐러셀 썸네일을 이미지 위로 재배치하는 것이었어요. 하지만 AI 도우미와 함께 해도 리액트 캐러셀 컴포넌트의 구조를 재배치할 수 없었어요. 그래서 그냥 내버려두기로 결정했어요.

다른 문제는 리액트 캐러셀 컴포넌트의 스타일링이었어요. 이번에 처음으로 만드는 캐러셀을 다루기 때문에 처음에는 별 생각없이 해봤는데, 살짝 어설펐어요. "슬라이딩" 기능도 잘 작동하지 않았을 뿐만 아니라 좌우 화살표가 이미지 중앙에 가운데 정렬된 것을 발견했어요. 좌우 화살표는 이미지 옆에 있어야 하는데 말이죠.

맞아요, 제 의심이 다시 한 번 맞았어요. 이번에는 내 CSS 코드가 리액트 캐러셀과 충돌했어요. CSS 파일을 주석 처리해서 일단 내 CSS 파일을 비활성화하고 리액트 캐러셀 라이브러리의 CSS만 활성화되도록 문제를 해결할 수 있었어요. CSS 파일을 제거하고 나니 리액트 캐러셀 컴포넌트의 의도한 모습과 기능을 명확히 볼 수 있었어요.



내 CSS 실수가 HTML Button 요소 자체를 대상으로 했기 때문에 React Carousel 구성요소가 의도치 않게 깨졌습니다. HTML Button 요소 자체 대신 새 클래스를 생성하고 대상으로 지정함으로써 문제를 해결했습니다.

## 초기 CSS 코드는 다음과 같았습니다:

```css
button {
 margin: 3px;
 padding: 0;
 width: 100%;
 background-color: black;
 color: white;
 font-weight: bold;
 font-size: xx-large;
}
```

## 코드를 다음과 같이 업데이트했습니다:



```js
.button-sw {
 margin: 3px;
 padding: 0;
 width: 100%;
 background-color: black;
 color: white;
 font-weight: bold;
 font-size: xx-large;
}
```

React Carousel 구성 요소에 표시된 이미지 크기 조정에도 고민이 많았어요. 기본 크기가 제공한 가장 큰 이미지에 맞는 것으로 보입니다. 제 경우에는, 가장 큰 이미지가 Carousel의 높이를 거의 전체 화면 크기로 설정했어요!

".carousel .slide img"에 CSS 규칙을 적용하여 React Carousel 구성 요소의 높이를 올바르게 조정하고, 그 안의 이미지를 왜곡되지 않게 원하는 값으로 max-height를 설정하고, object-fit: contain을 사용하여 이미지가 컨테이너 내에서 올바르게 비율로 나타날 수 있도록 했어요.

```js
.carousel .slide img {
 max-height: 350px;
 object-fit: contain; 
}
```



마지막으로 마주한 문제는 React Carousel 구성 요소 위에 확장되어 드롭다운 메뉴가 고장이 났다는 것이었습니다. 이제 카루셀과 충돌하기 때문에 메뉴에서 새 카테고리를 선택할 수 없었고, 사용자 클릭은 이제 카루셀 구성 요소에서만 인식되었습니다.

드롭다운 메뉴와 카루셀 구성 요소 사이의 충돌을 해결하기 위해 메뉴의 z-index를 1로 설정하고 카루셀 구성 요소의 z-index를 0으로 설정했습니다.

# 지금까지의 프로젝트 상황

프로젝트에 대한 링크는 다음과 같습니다:



- GitHub 저장소
- Netlify 배포된 프로젝트

![이미지](/assets/img/2024-05-14-HowtoIntegrateaCarouselintoReactApplications_2.png)

# 이 시리즈의 다른 글들

- 동적으로 다양한 HTML 요소 렌더링을 위한 컴포넌트 식별자 사용 배우기
- React에서 파일 분리를 통한 더 나은 코드 구성 안내
- React에서 드롭다운 메뉴 만들기: 단계별 안내서
- React에서 동적 햄버거 메뉴 개발하기: 단계별 안내서
- React 애플리케이션에 YouTube 비디오 통합하는 방법



# 결론

프로젝트에 이미지 캐러셀을 추가하면 시각적으로 향상되며, React Responsive 캐러셀 라이브러리를 사용하면 구현이 간단해집니다! 그냥 설치하고, Carousel 컴포넌트를 프로젝트에 추가하고, 이미지와 다른 선택적 매개변수를 전달하면 됩니다.

이 라이브러리를 만든 사람은 더 이상 관리하지 않지만, 초보자 프로젝트를 만들 때 좋은 선택입니다.

그래서, 프로젝트에 캐러셀을 구현하는 것은 내게 쉽지 않은 일이었는데, 내가 사용자 정의 드롭다운 메뉴를 사용하여 제어하기로 선택했기 때문입니다. 이 어려움은 React 캐러셀 컴포넌트 자체가 아닌 내가 설계한 레이아웃에서 나온 것입니다.



시행착오 끝에 AI 도우미의 도움을 받아 모든 문제를 해결하고 React 캐러셀을 예상대로 작동하도록 성공적으로 구현했어요.

알게 된 것은 React 컴포넌트 내의 코드를 직접 변경하거나 추가해서는 안 된다는 점이에요. 변경 사항은 덮어씌워지기 때문이죠! 대신, React Carousel 컴포넌트의 경우 CSS 코드를 작성하여 세밀한 조정을 할 수 있었어요. 단, React Carousel은 자체 CSS 파일을 가지고 있으며, 코드 충돌을 피하기 위해 HTML 요소를 직접 대상으로 삼지 않고 클래스 이름을 추가하는 것이 좋아요. 처음에 했던 것처럼!

저와 연락을 유지해요! LinkedIn과 Twitter에서 활동 중이에요.

![이미지](/assets/img/2024-05-14-HowtoIntegrateaCarouselintoReactApplications_3.png)



당신은 selftaughttxg.com에서 제가 쓴 모든 글을 읽을 수 있어요.

이제 React Responsive Carousel 라이브러리를 사용하여 캐러셀을 React 프로젝트에 통합하는 방법을 알게 되었나요? 여러분의 프로젝트에서 비슷한 어려움을 겪은 적이 있나요? 이 글을 공유하고 의견을 남겨주세요!