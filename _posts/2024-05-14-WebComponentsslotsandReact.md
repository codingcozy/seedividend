---
title: "웹 컴포넌트 슬롯과 리액트"
description: ""
coverImage: "/assets/img/2024-05-14-WebComponentsslotsandReact_0.png"
date: 2024-05-14 11:22
ogImage: 
  url: /assets/img/2024-05-14-WebComponentsslotsandReact_0.png
tag: Tech
originalTitle: "Web Components slots and React"
link: "https://medium.com/@damiantriebl/web-components-slots-and-react-ee1dae7b0d21"
---



![Web Components and React](/assets/img/2024-05-14-WebComponentsslotsandReact_0.png)

React에서 컨텐츠는 children 속성을 통해 컴포넌트로 전달됩니다. 이 속성은 요소의 JSX 태그 내에 캡슐화된 컨텐츠를 위해 특별히 설계되었습니다. 그러나 이 방법은 더 복잡한 템플릿이나 JSX를 컴포넌트의 다른 섹션에 배치해야 하는 경우 부족할 수 있습니다. 다행히 JSX는 함수와 JSX를 모두 props를 통해 전달할 수 있기 때문에 문제없이 이를 구현할 수 있습니다.

Web Components에서 컨텐츠 처리는 React와 약간 다릅니다. 컴포넌트가 HTML로 렌더링되기 때문에 함수나 HTML(또는 JSX)을 props를 통해 전달할 수 없습니다. 대신, SLOTS를 사용합니다. 이것들은 컴포넌트 내에서 다양한 유형의 HTML 블록을 배치할 수 있는 지정된 영역입니다. 복잡한 컴포넌트에서 적절한 구성을 위해 사용됩니다. 브라우저의 인스펙터에서 슬롯이 약간 다르게 나타날 수 있다는 점을 주목하는 것이 중요합니다.

![Web Components and React](/assets/img/2024-05-14-WebComponentsslotsandReact_1.png)




웹 페이지의 코드 인스펙터에서는 리다이렉트 기호와 함께 'reveal' 옵션을 볼 수 있습니다. 이 옵션을 클릭하면 DOM 내에서 다른 블록으로 이동하며, 해당 지점에서 렌더링됩니다. 이 기능을 통해 개발자는 Web Components의 복잡한 구성 요소 구조에서 컨텐츠가 정확히 어디에 렌더링되는지 추적할 수 있습니다.

Stencil에서는 속성을 통해 HTML 내용을 전달하는 것이 가능합니다 (코드 인스펙터에서 'right'로 된 div에서 확인할 수 있습니다). 그러나 이는 Vanilla JS와 유사하게 처리됩니다. 이를 위해 HTML 내용은 문자열 형태로 속성을 통해 전달되어야 합니다. 그런 다음 componentDidLoad() 라이프사이클 메서드 내에서 @Watch로 데코레이팅된 함수가 트리거되어야 합니다. 이 함수는 querySelector를 사용하여 HTML 블록이 삽입될 특정 div를 찾습니다. 마지막으로, 찾은 요소의 innerHTML이 HTML 내용을 삽입하도록 변형됩니다.

고려해야 할 주요 요소: HTML은 문자열로 시작하지만 중요한 점은 HTML이다. 따라서 style 태그가 사용되면 kebab-case 규칙을 준수해야 합니다. useRef()와 같이 특정 리액트 기능은 이 문맥에서 사용할 수 없으므로 자식 요소를 효율적으로 전달하는 가장 최적의 방법이 아닙니다. 결과적으로, 이러한 환경에서 자식 요소를 효과적으로 전달하는 유일한 방법은 슬롯(slots)을 통해 이루어지게 됩니다.

```js
import { Prop, h, Component, Element, Watch } from '@stencil/core';

@Component({
  tag: 'mtf-slots',
  styleUrl: 'mtf-slots.scss',
  shadow: true,
})
export class MotifSlots {
  @Element() el: HTMLMtfSlotsElement;

  @Prop() rightContent: string;

  @Watch('rightContent')
  rightContentChanged(newValue: string) {
    const rightSlot = this.el.shadowRoot.querySelector('.right-slot');
    if (rightSlot) {
      rightSlot.innerHTML = newValue;
    }
  }

  componentDidLoad() {
    this.rightContentChanged(this.rightContent);
  }

  render() {
    return (
      <div class="container">
        <div class="flexrow">
          <div class="border-left">
            <slot name="left">Left for Defect</slot>
          </div>
          <slot name="middle"></slot>
          <div class="right-slot"></div>
        </div>
      </div>
    );
  }
}
```



이 그림에서 왼쪽과 가운데의 슬롯에 대한 두 가지 다른 접근 방식과 오른쪽 슬롯에 대한 프롭스가 표시되어 있습니다. 슬롯은 복잡성이 없지만 프롭스의 경우 코드를 많이 추가해야 합니다. 클래스, componentDidLoad 함수, 쿼리 선택기와 함께 @watch 함수 및 innerHTML을 사용하여 이러한 프롭스를 추가해야 하기 때문에 하나의 작업에 대해 많은 코드가 필요합니다.

React에서 웹 구성 요소와 상호 작용할 때 슬롯을 활용하는 데 완전한 호환성을 보장합니다. 간단히 해당 위치에 웹 구성 요소의 슬롯 이름을 가진 'slot' 속성을 할당하면 됩니다. 이는 React의 'children' 프롭과 유사하게 작동하여 useRef의 사용 및 그 안에서 상태를 표현하는 것을 허용합니다. 이렇게 함으로써 '슬롯'과 동일한 기능을 구현할 수 있습니다. 프롭스를 사용할 경우 HTML이 해당 위치에 '베이크'됩니다. 그러나 슬롯의 경우 — React 구성 요소에서 소비되는 경우이든 아니든 — DOM의 다른 부분을 참조하는 링크가 해당 섹션에 포함됩니다.

# 결론



대부분의 경우 HTML을 프롭스를 통해 웹 컴포넌트로 전송하여 작동하지만, 이것은 가장 최적의 방법은 아니며 필요한 모든 기능을 갖추지 못할 수 있습니다. 따라서 React와 100% 호환되는 슬롯을 사용하는 것이 항상 권장됩니다.