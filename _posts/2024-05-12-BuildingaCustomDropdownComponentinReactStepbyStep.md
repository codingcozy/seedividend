---
title: "리액트에서 사용자 정의 드롭다운 컴포넌트 만들기 단계별 가이드"
description: ""
coverImage: "/assets/img/2024-05-12-BuildingaCustomDropdownComponentinReactStepbyStep_0.png"
date: 2024-05-12 19:10
ogImage: 
  url: /assets/img/2024-05-12-BuildingaCustomDropdownComponentinReactStepbyStep_0.png
tag: Tech
originalTitle: "Building a Custom Dropdown Component in React (Step by Step)✨"
link: "https://medium.com/@kaderbiral26/building-a-custom-dropdown-component-in-react-step-by-step-e12f4330fb58"
isUpdated: true
---



![이미지](/assets/img/2024-05-12-BuildingaCustomDropdownComponentinReactStepbyStep_0.png)

안녕하세요! 이 기사에서는 React 애플리케이션에서 동적으로 사용할 수 있는 사용자 정의 Dropdown 컴포넌트를 소개하려고해요. 이 Dropdown 컴포넌트는 사용자가 목록에서 항목을 선택할 수 있도록 하면서 다양한 위치와 스타일로 표시될 수 있어요. 또한 이미지가 있는 경우와 없는 경우 모두 사용할 수 있어요. 이 컴포넌트는 Typescript, Tailwind CSS, React Icons 및 Classnames와 같은 인기있는 라이브러리를 사용하여 개발되었어요.

👉 먼저 단계별로 무엇이 일어나고 있는지 설명한 후에 마지막에 전체 코드와 사용법을 추가할 거예요. 준비가 되셨나요? 그럼 시작해봅시다!

![이미지](/assets/img/2024-05-12-BuildingaCustomDropdownComponentinReactStepbyStep_1.png)

## 1. Imports:

```js
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { GoChevronDown } from "react-icons/go";
import useOutsideClick from "../hooks/useOutsideClick";
```

🔸 useEffect, useRef 및 useState ➜ 이들은 상태를 관리하고 DOM 요소에 대한 참조를 만들 때 사용되는 React 훅입니다.

🔸 classNames ➜ 이 라이브러리는 조건부로 classNames을 결합하는 데 사용됩니다.

🔹 goChevronDown ➜ 이 아이콘 컴포넌트는 드롭다운 토글 버튼에 사용됩니다.

🔹 useOutsideClick ➜ 이 사용자 정의 후크는 지정된 요소 외부를 클릭 감지하는 데 사용됩니다.

## 2. 인터페이스:

```js
인터페이스 DropdownItem {
  id: string;
  name: string;
  imageUrl?: string;
}

인터페이스 DropdownProps {
  id: string;
  title?: string;
  data: DropdownItem[];
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  hasImage?: boolean;
  style?: string;
  selectedId?: string;
  onSelect?: (id: string) => void;
}
```

🔹DropdownItem➜ DropdownItem을 정의합니다. 이 인터페이스는 각 드롭다운 아이템에 필요한 속성인 id, name 및 옵션으로 imageUrl을 지정합니다.

🔹DropdownProps➜ 이 인터페이스는 Dropdown 컴포넌트에 전달할 수 있는 프로퍼티들을 지정합니다. 이 프로퍼티들의 설명은 다음과 같습니다:

![이미지](/assets/img/2024-05-12-BuildingaCustomDropdownComponentinReactStepbyStep_2.png)

📌 id: Dropdown 컴포넌트의 고유 식별자입니다.

📌 제목: 드롭다운이 열릴 때 표시되는 기본 제목. 기본 제목은 "Select"입니다.

📌 데이터: 드롭다운 콘텐츠를 구성하는 항목 목록.

📌 위치: 드롭다운의 위치를 버튼을 기준으로 지정합니다. ("bottom-right", "bottom-left", "top-right", "top-left"). 기본 위치는 "bottom-left"입니다.

📌 이미지 포함 여부: 드롭다운 항목에 이미지가 있는지를 나타내는 부울 값.

📌 스타일 : 드롭다운 컴포넌트에 적용할 추가 스타일입니다.

📌 selectedId : 초기 선택 항목의 식별자입니다.

📌 onSelect : 항목이 선택될 때 호출되는 콜백 함수입니다.

![이미지](/assets/img/2024-05-12-BuildingaCustomDropdownComponentinReactStepbyStep_3.png)

이 프롭들은 Dropdown 컴포넌트를 다양한 사용 사례에 맞게 사용자 정의할 수 있도록 해 줍니다. 사용자가 필요에 맞게 드랍다운의 동작, 내용, 외관을 맞춤 설정할 수 있게 해줍니다.

## 3. Dropdown 컴포넌트 생성:

```js
const Dropdown = ({
  id,
  title = "Select", //기본 값
  data,
  position = "bottom-left", //기본 값
  hasImage,
  style,
  selectedId,
  onSelect,
}: DropdownProps) => {
  return (
    <div ref={dropdownRef} className="relative">
      {/* ... */}
    </div>
  );
};
export default Dropdown;
```

🔹Dropdown 컴포넌트는 사용자 정의 드롭다운 메뉴 컴포넌트이며 위의 프롭을 허용합니다.

## 4. 상태 변수:

```js
const [isOpen, setIsOpen] = useState < boolean > false;

const [selectedItem, setSelectedItem] =
  (useState < DropdownItem) | (undefined > (selectedId ? data?.find((item) => item.id === selectedId) : undefined));
```

🔹isOpen➜ 드롭다운 메뉴의 열기/닫기 상태를 관리합니다.

🔹selectedItem➜ 드롭다운 메뉴에서 현재 선택된 항목을 추적합니다.

## 5. 이벤트 핸들러:

```js
const handleChange = (item: DropdownItem) => {
  setSelectedItem(item);
  onSelect && onSelect(item.id);
  setIsOpen(false);
};
```

🔹handleChange➜ 드롭다운 메뉴에서 항목을 선택하는 핸들러입니다. 선택된 항목을 업데이트하고, onSelect 콜백을 호출(제공된 경우)하며, 드롭다운 메뉴를 닫습니다.

## 6. useEffect 훅:

```js
useEffect(() => {
  if (selectedId && data) {
    const newSelectedItem = data.find((item) => item.id === selectedId);
    newSelectedItem && setSelectedItem(newSelectedItem);
  } else {
    setSelectedItem(undefined);
  }
}, [selectedId, data]);
```

🔹 이 useEffect 훅은 selectedId와 data의 변경 사항을 감지합니다. 둘 중 하나가 변경되면 데이터에서 selectedId와 일치하는 항목을 찾아 selectedItem에 설정합니다.

## 7. Ref:

```js
const dropdownRef = useRef < HTMLDivElement > null;
useOutsideClick({
  ref: dropdownRef,
  handler: () => setIsOpen(false),
});
```

🔹 dropdownRef➜ 드롭다운 메뉴 외부 클릭을 감지하는 데 사용되는 Ref입니다.

## 8. CSS 클래스:

```js
const dropdownClass = classNames("absolute bg-gray-100 w-max max-h-52 overflow-y-auto py-3 rounded shadow-md z-10", {
  "top-full right-0 mt-2": position === "bottom-right",
  "top-full left-0 mt-2": position === "bottom-left",
  "bottom-full right-0 mb-2": position === "top-right",
  "bottom-full left-0 mb-2": position === "top-left",
});
```

🔹 dropdownClass➜ 위치 prop에 따라 드롭다운 메뉴를 배치하기 위해 CSS 클래스를 동적으로 계산합니다.

## 9. 드롭다운 토글 버튼 생성:

```js
<button
  id={id}
  aria-label="드롭다운 토글"
  aria-haspopup="true"
  aria-expanded={isOpen}
  type="button"
  onClick={() => setIsOpen(!isOpen)}
  className={classNames(
    "flex justify-between items-center gap-5 rounded w-full py-2 px-4 bg-blue-500 text-white",
    style
  )}
>
  <span>{selectedItem?.name || title}</span>
  <GoChevronDown
    size={20}
    className={classNames("transform duration-500 ease-in-out", {
      "rotate-180": isOpen,
    })}
  />
</button>
```

🔹버튼 엘리먼트는 제목 또는 선택한 항목의 텍스트와 화살표 아이콘이 들어 있습니다.

🔹클릭할 때마다 버튼은 isOpen 상태를 토글합니다.

## 10. 드롭다운 콘텐츠 생성:

```js
{
  isOpen && (
    <div aria-label="드롭다운 메뉴" className={dropdownClass}>
      <ul role="menu" aria-labelledby={id} aria-orientation="vertical" className="leading-10">
        {data?.map((item) => (
          <li
            key={item.id}
            onClick={() => handleChange(item)}
            className={classNames("flex items-center cursor-pointer hover:bg-gray-200 px-3", {
              "bg-gray-300": selectedItem?.id === item.id,
            })}
          >
            {hasImage && (
              <img
                src={item.imageUrl}
                alt="이미지"
                loading="lazy"
                className="w-8 h-8 rounded-full bg-gray-400 object-cover me-2"
              />
            )}
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

🔹만약 드롭다운이 열려있으면(isOpen이 true), 드롭다운 메뉴를 나타내는 div가 렌더링됩니다.

🔹드롭다운 메뉴는 data prop으로부터 생성된 항목 목록을 포함합니다.

🔹리스트의 각 항목은 `li` 요소로 표시됩니다.

🔹hasImage 값이 true일 경우, 각 항목 옆에 이미지가 표시됩니다.

## 사용법: ⤵️

```js
const handleSelect = (id: string) => {
  console.log(`id가 ${id}인 항목을 선택했습니다`);
};

<Dropdown
  id="person"
  title="사람 선택"
  data={data}
  hasImage
  style="bg-purple-800"
  selectedId="3"
  onSelect={handleSelect}
/>;
```

## ✔️ 여기에 전체 코드가 있어요: 👇

Dropdown.tsx

```js
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { GoChevronDown } from "react-icons/go";
import useOutsideClick from "../hooks/useOutsideClick";

interface DropdownItem {
  id: string;
  name: string;
  imageUrl?: string;
}

interface DropdownProps {
  id: string;
  title?: string;
  data: DropdownItem[];
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  hasImage?: boolean;
  style?: string;
  selectedId?: string;
  onSelect?: (id: string) => void;
}

const Dropdown = ({
  id,
  title = "Select",
  data,
  position = "bottom-left",
  hasImage,
  style,
  selectedId,
  onSelect,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState < boolean > false;
  const [selectedItem, setSelectedItem] =
    (useState < DropdownItem) | (undefined > (selectedId ? data?.find((item) => item.id === selectedId) : undefined));

  const handleChange = (item: DropdownItem) => {
    setSelectedItem(item);
    onSelect && onSelect(item.id);
    setIsOpen(false);
  };

  useEffect(() => {
    if (selectedId && data) {
      const newSelectedItem = data.find((item) => item.id === selectedId);
      newSelectedItem && setSelectedItem(newSelectedItem);
    } else {
      setSelectedItem(undefined);
    }
  }, [selectedId, data]);

  const dropdownRef = useRef < HTMLDivElement > null;
  useOutsideClick({
    ref: dropdownRef,
    handler: () => setIsOpen(false),
  });

  const dropdownClass = classNames("absolute bg-gray-100 w-max max-h-52 overflow-y-auto py-3 rounded shadow-md z-10", {
    "top-full right-0 mt-2": position === "bottom-right",
    "top-full left-0 mt-2": position === "bottom-left",
    "bottom-full right-0 mb-2": position === "top-right",
    "bottom-full left-0 mb-2": position === "top-left",
  });

  return (
    <div ref={dropdownRef} className="relative">
      <button
        id={id}
        aria-label="Toggle dropdown"
        aria-haspopup="true"
        aria-expanded={isOpen}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={classNames(
          "flex justify-between items-center gap-5 rounded w-full py-2 px-4 bg-blue-500 text-white",
          style
        )}
      >
        <span>{selectedItem?.name || title}</span>
        <GoChevronDown
          size={20}
          className={classNames("transform duration-500 ease-in-out", {
            "rotate-180": isOpen,
          })}
        />
      </button>
      {/* Open */}
      {isOpen && (
        <div aria-label="Dropdown menu" className={dropdownClass}>
          <ul role="menu" aria-labelledby={id} aria-orientation="vertical" className="leading-10">
            {data?.map((item) => (
              <li
                key={item.id}
                onClick={() => handleChange(item)}
                className={classNames("flex items-center cursor-pointer hover:bg-gray-200 px-3", {
                  "bg-gray-300": selectedItem?.id === item.id,
                })}
              >
                {hasImage && (
                  <img
                    src={item.imageUrl}
                    alt="image"
                    loading="lazy"
                    className="w-8 h-8 rounded-full bg-gray-400 object-cover me-2"
                  />
                )}
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
```

## useOutSideClick Hook Code: ⤵️

useOutsideClick.tsx

```js
import { useEffect } from 'react';

interface OutsideClickHandlerProps {
  ref: React.RefObject<HTMLElement>;
  handler: () => void;
}

const useOutsideClick = ({ ref, handler }: OutsideClickHandlerProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler]);
};

export default useOutsideClick;
```

## 샘플 데이터 (JSON): ⤵️

data.json

```json
[
  {
    "id": "1",
    "name": "Minnie Barrett",
    "imageUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "id": "2",
    "name": "Andy Holmes",
    "imageUrl": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "id": "3",
    "name": "Felicia Watts",
    "imageUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "id": "4",
    "name": "Hailey Green",
    "imageUrl": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "id": "5",
    "name": "Jeremiah Hughes",
    "imageUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "id": "6",
    "name": "Amy Perkins",
    "imageUrl": "https://images.unsplash.com/photo-1587677171791-8b93c752999b?q=80&w=1949&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
]
```

Github 주소:

실시간 데모:

## 결론

요약하자면, React 애플리케이션에서 사용할 수 있는 사용자 정의 Dropdown 컴포넌트가 생성되고 설명되었습니다. 이 컴포넌트는 다양한 위치와 스타일에서 활용될 수 있으며 사용자가 목록에서 항목을 선택할 수 있게 합니다. TypeScript, Tailwind CSS, React Icons 및 Classnames를 사용하여 개발된 이 Dropdown 컴포넌트는 사용자 인터페이스 개발 프로세스에서 상당한 편의성을 제공하며 React 애플리케이션에서 널리 사용될 수 있습니다.
