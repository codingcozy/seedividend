---
title: "2024년 최고의 CSS 프레임워크 5가지"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Top 5 CSS Frameworks in 2024"
link: "https://medium.com/bitsrc/top-5-css-frameworks-in-2024-83f6f9ba9ee7"
isUpdated: true
---

## 부트스트랩, 테일윈드, 파운데이션, 불마, UIKit — 2024년 최고의 CSS 프레임워크를 살펴보세요.

프로젝트에 적합한 CSS 프레임워크를 선택하는 것이 중요합니다. 이는 새로운 UI 구성 요소를 만드는 데 필요한 전반적인 노력에 대한 톤을 설정합니다. 그리고 현재 중요한 것은 새로운 기능을 더 빨리 출시하여 고객을 만족시키는 것입니다.

그러니 2024년에 시도해 볼 최고의 CSS 프레임워크를 살펴보겠습니다.

# 1. 부트스트랩

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

부스트랩은 모바일 우선 CSS 프레임워크로, 멋지고 반응형 웹 인터페이스를 만들 수 있게 해줍니다.

이는 강력한 그리드 시스템을 포함하고 있어서 개발자들이 다양한 화면 크기에 맞게 적응 가능한 레이아웃을 만들 수 있도록 도와줍니다. 게다가 내비게이션 바, 카드 및 모달과 같은 사용 준비가 완료된 구성 요소도 제공하여 개발을 더 빠르게 할 수 있습니다.

여기 부스트랩의 독특한 특징들이 있습니다.

- 반응형 그리드 시스템.
- 다양한 미리 제작된 구성 요소 (내비게이션 바, 카드, 모달).
- 빠른 스타일링을 위한 유틸리티 클래스.
- 기능을 향상시키기 위한 JavaScript 플러그인.
- 활발한 커뮤니티와 폐쇄적인 문서화.

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

개발자들은 직접적인 프레임워크 지원을 제공하기 위해 Bootstrap 주위에 래퍼(wrapper)를 만들었습니다. 예를 들어, React에 Bootstrap을 통합하려고 한다면, 쉽게 다음과 같은 방법으로 라이브러리인 React Bootstrap을 설치하고 프로젝트에서 활용할 수 있습니다:

```js
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./bootstrap.css";

export function Bootstrap() {
  return (
    <div className="button">
      {["Primary", "success", "danger"].map((variant) => (
        <DropdownButton
          as={ButtonGroup}
          key={variant}
          id={`dropdown-variants-${variant}`}
          variant={variant.toLowerCase()}
          title={variant}
        >
          <Dropdown.Item eventKey="1">Action</Dropdown.Item>
          <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
          <Dropdown.Item eventKey="3" active>
            Active Item
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
        </DropdownButton>
      ))}
      <br />
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Dropdown Button
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
```

## 2. Tailwind CSS

Tailwind CSS는 사용 우선적인 유틸리티 기반의 CSS 프레임워크로, 사용자 정의 디자인을 만들기 위한 낮은 수준의 유틸리티 클래스 세트를 제공합니다.

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

전통적인 CSS 프레임워크와는 달리 미리 스타일이 적용된 구성 요소를 제공하는 것이 아닌, Tailwind는 유틸리티 클래스를 제공하여 고유한 디자인을 만들 수 있도록 중점을 두고 있어요. 매우 사용자 정의 가능하고 확장 가능하도록 설계되어 있어 개발자들에게 무한한 유연성을 제공해요.

다음은 Tailwind CSS의 독특한 기능 몇 가지에요:

- 스타일링을 위한 유틸리티 중심 방식.
- 설정 파일을 통해 매우 사용자 정의 가능.
- 미리 구축된 컴포넌트 없음; 유틸리티 클래스로 스타일 생성.
- 미디어 쿼리를 사용한 반응형 디자인.
- 제품 빌드 최적화를 위한 PurgеCSS 통합.
- JIT (Just-In-Time) 모드로 신속한 개발.

Tailwind 통합은 보다 직관적이지 않아요. 먼저 Tailwind 컴파일러를 설정해야 해요:

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
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

그러면 사전 정의된 Tailwind를 사용하여 CSS 클래스를 작성할 수 있게 됩니다:

```js
export function Tailwind() {
  const ContactTextArea = ({
    row,
    placeholder,
    name,
    defaultValue,
  }: {
    row: number,
    placeholder: string,
    name: string,
    defaultValue: string,
  }) => {
    return (
      <>
        <div className="mb-6">
          <textarea
            rows={row}
            placeholder={placeholder}
            name={name}
            className="w-full resize-none rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3 dark:bg-dark dark:text-dark-6"
            defaultValue={defaultValue}
          />
        </div>
      </>
    );
  };

  const ContactInputBox = ({ type, placeholder, name }: { type: string, placeholder: string, name: string }) => {
    return (
      <>
        <div className="mb-6">
          <input
            type={type}
            placeholder={placeholder}
            name={name}
            className="w-full rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3 dark:bg-dark dark:text-dark-6"
          />
        </div>
      </>
    );
  };

  return (
    <section className="relative z-10 overflow-hidden bg-white py-20 dark:bg-dark lg:py-[120px]">
      <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
        <div className="relative rounded-lg bg-white p-8 shadow-lg dark:bg-dark-2 sm:p-12">
          <form>
            <ContactInputBox type="text" name="name" placeholder="Your Name" />
            <ContactInputBox type="text" name="email" placeholder="Your Email" />
            <ContactInputBox type="text" name="phone" placeholder="Your Phone" />
            <ContactTextArea row={6} placeholder="Your Message" name="details" defaultValue="" />
            <div>
              <button
                type="submit"
                className="w-full rounded border border-primary bg-primary p-3 text-white transition hover:bg-opacity-90"
              >
                Send Message
              </button>
            </div>
          </form>
          <div />
        </div>
      </div>
    </section>
  );
}
```

# 3. Foundation

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

Foundation은 모든 장치에서 작동하는 멋진 반응형 웹사이트, 앱 및 이메일을 만드는 것을 간단하게 해주는 오픈 소스 반응형 프론트엔드 프레임워크입니다.

Foundation은 사용자가 쉽게 제품에 통합할 수 있는 견고하고 유연한 반응형 그리드, 모달, 타이포그래피, 내비게이션 컴포넌트 및 폼 요소를 포함하고 있습니다. 또한 Foundation은 모듈식이기 때문에 필요에 따라 적게든 많이든 사용할 수 있습니다.

다음은 Foundation의 독특한 기능 몇 가지입니다:

- 유연성을 갖춘 반응형 그리드 시스템.
- 쉬운 사용을 위한 모듈식 아키텍처.
- 스타일링을 위한 Sass 전처리기.
- 내장된 컴포넌트 및 반응형 내비게이션.
- Flexbox 및 블록 그리드 지원.
- 접근성 기능.

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

프로젝트에 Foundation을 통합하는 방법은 다음과 같습니다:

```js
import { Menu, MenuItem } from "react-foundation";

export function Foundation() {
  return (
    <Menu style={{ marginLeft: "34px" }}>
      <MenuItem>
        <a href="/">홈</a>
      </MenuItem>
      <MenuItem>
        <a href="/">블로그</a>
      </MenuItem>
      <MenuItem>
        <a href="/">소개</a>
      </MenuItem>
      <MenuItem>
        <a href="/">문의</a>
      </MenuItem>
    </Menu>
  );
}
```

# 4. Bulma

Bulma는 단순함, 반응형 및 맞춤 설정 옵션으로 눈에 띄는 가벼운 CSS 프레임워크입니다.

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

다른 UI 프레임워크와는 다르게 Bulma는 Flexbox에 기반을 두고 있어요. Flexbox는 페이지 요소의 너비를 컨테이너의 너비에 따라 조정하는 CSS 레이아웃 모델이에요. 이로 인해 그리드를 만드는 것과 같은 작업들이 매우 쉬워지며 프레임워크가 가벼운 특성을 유지할 수 있어요.

여기 Bulma의 주요 기능 몇 가지가 있어요:

- Flexbox를 기반으로 한 현대적인 CSS 프레임워크.
- 사용하기 쉽고 직관적인 구문.
- JavaScript에 의존하지 않음.
- 내장된 수정자를 사용한 반응형 디자인.
- 네비게이션 바, 모달, 탭과 같은 컴포넌트.
- Sass로 확장 가능함.

프로젝트에 Bulma를 통합하는 방법은 다음과 같아요:

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
import "bulma/css/bulma.min.css";

export function Bulma() {
  return (
    <div>
      <nav className="pagination" role="navigation" aria-label="pagination">
        <a href="/" className="pagination-previous">
          이전
        </a>
        <a href="/" className="pagination-next">
          다음 페이지
        </a>
        <ul className="pagination-list">
          <li>
            <a href="/" className="pagination-link" aria-label="페이지 1로 이동">
              1
            </a>
          </li>
          <li>
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
          <li>
            <a href="/" className="pagination-link" aria-label="페이지 45로 이동">
              45
            </a>
          </li>
          <li>
            <a href="/" className="pagination-link is-current" aria-label="페이지 46" aria-current="page">
              46
            </a>
          </li>
          <li>
            <a href="/" className="pagination-link" aria-label="페이지 47로 이동">
              47
            </a>
          </li>
          <li>
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
          <li>
            <a href="/" className="pagination-link" aria-label="페이지 86로 이동">
              86
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
```

# 5. UIKit

UIKit은 웹 애플리케이션을 위한 사용자 인터페이스(UI)를 구축하는 오픈 소스 프레임워크입니다.

이 프레임워크는 구조와 디자인 철학에서 다른 UI 프레임워크와는 다릅니다. 기존의 전통적인 BEM 방법론을 따르는 다른 프레임워크와 달리 UIkit은 구성 요소 중심의 구조를 사용합니다. 이는 구성 요소의 유연성과 재사용성을 가능하게 하며, 복잡한 사용자 인터페이스를 구축하는 데 필요한 코드량을 상당히 줄일 수 있습니다.

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

UIKit의 주요 기능 중 일부는 다음과 같습니다:

- 모듈식이면서 가벼운 프레임워크.
- 반응형 그리드 시스템.
- 미리 디자인된 구성 요소(내비게이션 바, 슬라이더, 모달).
- 플렉스박스 기반 레이아웃.
- 애니메이션 및 전환 효과.
- 사용자 정의 및 테마화 가능.

UIKit를 프로젝트에 통합하는 방법은 다음과 같습니다:

```js
import 'uikit/dist/css/uikit.min.css';

export function Uikit() {
  return (
    <div className="uk-flex uk-flex-center uk-margin-top">
      <button
        type="button"
        className="uk-button uk-button-default uk-margin-left"
        onClick={() => alert('Cancel clicked!')}
        Cancel
      </button>
    </div>
  );
}
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

# 마무리

여기서 설명한 것 외에도 많은 CSS 프레임워크가 있습니다. 하지만, 올바른 것을 선택하는 것이 중요합니다.

이렇게 함으로써, 프로젝트에 적합한 CSS 프레임워크를 선택할 수 있습니다!

이 글에서 다룬 코드를 둘러보고 싶다면, 내 Bit Scope를 확인해보세요.

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

이 글이 도움이 되었기를 바랍니다.

읽어 주셔서 감사합니다.

# 자세히 알아보기
