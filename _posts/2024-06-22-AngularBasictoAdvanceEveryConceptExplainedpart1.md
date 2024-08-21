---
title: "Angular 기초부터 고급까지 모든 개념 설명 - 파트 1"
description: ""
coverImage: "/assets/img/2024-06-22-AngularBasictoAdvanceEveryConceptExplainedpart1_0.png"
date: 2024-06-22 14:56
ogImage:
  url: /assets/img/2024-06-22-AngularBasictoAdvanceEveryConceptExplainedpart1_0.png
tag: Tech
originalTitle: "Angular — Basic to Advance — Every Concept Explained! — part 1"
link: "https://medium.com/@Rushabh_/angular-basic-to-advance-every-concept-explained-part-1-e8f8692e04b3"
isUpdated: true
---

<img src="/assets/img/2024-06-22-AngularBasictoAdvanceEveryConceptExplainedpart1_0.png" />

웹 개발 분야에서 빠르게 진화하는 상황에서 Angular는 강력하고 다재다능한 프레임워크로 등장하여 개발자들이 동적이고 기능이 풍부하며 반응성 있는 웹 애플리케이션을 구축할 수 있도록 돕고 있습니다. Google이 개발 및 유지보수하는 Angular는 싱글 페이지 애플리케이션을 쉽게 만들 수 있는 능력으로 널리 사용되고 있습니다. 이 블로그 시리즈는 Angular의 모든 측면을 명확히 설명하여 복잡한 개념을 모든 기술 수준의 개발자들에게 이해하기 쉬운 설명으로 분해하고 있습니다.

# 파일 및 폴더 구조

Angular에서 파일 및 폴더 구조는 프로젝트의 소스 코드에 논리적인 구성을 제공하여 응용 프로그램을 보다 쉽게 관리하고 개발할 수 있도록 설계되었습니다. Angular 프로젝트에서 일반적으로 만날 수 있는 파일 및 폴더에 대한 간단한 개요는 다음과 같습니다:

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

- src: 이것은 애플리케이션의 소스 코드가 있는 주요 디렉터리입니다. 대부분의 코드는 여기에서 작업하게 됩니다.

- app: 이곳에는 애플리케이션의 구성 요소, 서비스, 모듈 및 기타 관련 파일이 저장됩니다. 애플리케이션의 핵심 부분입니다.
  - components: 각각이 TypeScript, HTML, CSS 및 기타 파일을 포함하는 개별 컴포넌트 폴더가 포함됩니다.
  - services: 컴포넌트간에 공유 기능을 제공하는 서비스 파일이 포함됩니다.
  - modules: 애플리케이션을 구성하고 구성하는 데 도움이 되는 Angular 모듈 파일이 포함됩니다.
- assets: 이미지, 폰트 및 기타 파일과 같은 정적 에셋이 저장되는 곳입니다. 이러한 에셋은 애플리케이션에서 직접 액세스할 수 있습니다.
- styles: 애플리케이션 전체에 적용되는 CSS 또는 SCSS 파일과 같은 글로벌 스타일이 포함됩니다.
- index.html: 애플리케이션의 진입점으로 작동하는 주요 HTML 파일입니다.

2. angular.json: 이 구성 파일은 Angular 프로젝트에 대한 다양한 설정을 정의합니다. 빌드 옵션, 에셋 경로 및 기타 프로젝트별 구성을 포함합니다.

여기에 angular.json 파일의 주요 측면을 간단히 설명했습니다.

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

- projects: 이 섹션은 Angular 워크스페이스 내의 하나 이상의 프로젝트에 대한 구성을 포함합니다. 각 프로젝트는 워크스페이스 내의 응용 프로그램, 라이브러리 또는 기타 관련 코드를 나타냅니다.

- architect: 이 하위 섹션은 프로젝트에서 실행할 수 있는 다양한 빌드, 테스트 및 서빙 작업을 정의합니다.
  - build: 프로덕션 또는 개발용으로 프로젝트를 빌드하는 옵션을 구성합니다. 출력 경로, 에셋, 스타일, 스크립트 등을 지정할 수 있습니다.
  - test: Karma 또는 Protractor와 같은 테스트 프레임워크를 사용하여 테스트 설정을 구성합니다.
  - serve: 개발 서버 설정을 구성하여 개발 중에 응용 프로그램을 로컬로 제공합니다.
  - lint: 코딩 표준에 대한 코드를 점검하기 위한 린트 옵션을 구성합니다.
  - e2e: 사용자 상호 작용을 시뮬레이트하는 테스트를 실행하기 위한 엔드 투 엔드 (e2e) 테스트 설정을 구성합니다.

2. schematics: 이 섹션은 사용자 정의 스키매틱을 정의하거나 프로젝트용으로 코드 및 파일을 생성하기 위해 타사 스키매틱을 사용하는 것을 허용합니다.

3. cli: Angular CLI 자체와 관련된 설정을 포함합니다.

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

- defaultCollection: CLI가 코드를 생성할 때 사용해야 하는 스키마틱의 기본 컬렉션을 지정합니다.

4. newProjectRoot: 워크스페이스 내에서 생성된 새 프로젝트의 루트 디렉토리를 정의합니다.

5. sourceRoot: 응용 프로그램 소스 코드가 있는 루트 디렉토리를 지정합니다.

6. prefix: 프로젝트 내에서 생성된 구성 요소, 지시문 및 기타 Angular 요소의 선택기에 자동으로 추가되는 접두어를 정의합니다.

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

7. targets: 각 프로젝트의 "architect" 섹션 내에서 특정 작업을 나타내는 "targets"가 있습니다. 이러한 targets는 Angular CLI를 사용하여 호출할 수 있습니다.

- builder: 작업을 수행하는 데 책임을 지는 빌더(도구)를 지정합니다.
- options: 작업에 대한 특정 옵션을 포함합니다.
- configurations: "build" 작업에 대한 "production" 또는 "development"과 같은 다양한 구성을 정의합니다.

3. tsconfig.json: 이 파일은 프로젝트의 TypeScript 컴파일러 옵션을 구성합니다.

4. package.json: 이 파일은 프로젝트의 종속성과 스크립트에 관한 정보를 보유합니다. npm (Node Package Manager)에서 패키지 및 스크립트를 관리하는 데 사용됩니다.

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

여기에는 package.json 파일이 포함하는 내용을 자세히 살펴볼게요:

- name: 이 필드는 프로젝트의 이름을 지정합니다. 이것은 고유한 식별자이며 네이밍 규칙을 따라야 합니다.
- version: 프로젝트의 버전입니다. 변경 사항을 추적하고 업데이트를 관리하는 데 중요합니다.
- scripts: 이 부분에서는 커맨드 라인을 사용하여 실행할 수 있는 사용자 정의 스크립트를 정의하는 중요한 섹션입니다. Angular 프로젝트에서 흔히 사용되는 일반적인 스크립트는 다음과 같습니다:

- start: 개발 서버를 시작하는 데 사용됩니다.
- build: 애플리케이션을 프로덕션용으로 빌드하는 데 사용됩니다.
- test: 테스트를 실행하는 데 사용됩니다.
- lint: 코드 린팅을 실행하는 데 사용됩니다.
- 자동화할 요소를 정의하는 사용자 정의 스크립트

4. dependencies: 이것은 프로젝트가 올바르게 작동하기 위해 의존하는 패키지를 나열합니다. 이 패키지들은 애플리케이션이 프로덕션 환경에서 실행되기 위해 필요합니다.

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

5. devDependencies: 의존성과 유사하지만 이 패키지들은 개발 중에만 필요하며 최종 제품 빌드에서는 필요하지 않습니다.

# 보간법(Interpolation)

보간법은 Angular의 템플릿 구문에서의 기본적인 개념으로, 컴포넌트의 TypeScript 코드에서 HTML 템플릿 내에서 데이터 값을 동적으로 표시할 수 있게 해줍니다. 이는 컴포넌트의 논리와 데이터 조작을 템플릿의 사용자 인터페이스와 원활하게 결합하는 방법입니다. 보간법은 템플릿에서 이중 중괄호 ' '로 표시됩니다.

Angular 컴포넌트와 템플릿의 예시:

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

변경 후:

Component (app.component.ts):

```js
export class AppComponent {
  greeting: string = "Hello, Angular!";
  count: number = 42;

  getDynamicValue(): string {
    return "Dynamic Value";
  }
}
```

Template (app.component.html):

```js
<h1>{{ greeting }}</h1>
<p>The answer to everything is {{ count }}</p>
<p>This is a {{ getDynamicValue() }}</p>
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

이 예시에서는 greeting, count 값 및 getDynamicValue() 함수의 결과가 보간을 사용하여 HTML에 동적으로 삽입됩니다. 컴포넌트 내에서 값이 변경되면 템플릿이 자동으로 해당 변경사항을 반영하여 업데이트됩니다.

# Angular CLI 및 중요한 명령어

Angular CLI(Command Line Interface)는 Angular 팀에서 제공하는 강력한 도구로, Angular 애플리케이션의 개발, 테스트 및 배포 작업을 간편화하는 데 사용됩니다. Angular CLI는 Angular 프로젝트 관리, 개발 및 유지보수와 관련된 다양한 작업을 간소화하는 일련의 명령어를 제공합니다.

Angular CLI를 사용하려면 시스템에 Node.js 및 npm(Node Package Manager)이 설치되어 있어야 합니다. 다음 npm 명령어를 사용하여 Angular CLI를 전역으로 설치할 수 있습니다:

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
npm install -g @angular/cli
```

설치가 완료되면 CLI가 제공하는 다양한 명령어를 사용하여 Angular 애플리케이션을 효과적으로 생성, 개발, 테스트 및 배포할 수 있습니다.

# Components

구성 요소는 애플리케이션 사용자 인터페이스의 기본 구성 요소입니다. 특정 섹션을 나타내며 해당 섹션과 연결된 시각적 표현 (HTML 템플릿)과 로직 (Typescript 클래스)을 캡슐화합니다.

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

컴포넌트 생성: Angular CLI의 g c 명령어를 사용하여 새로운 컴포넌트를 생성하세요. 일반적인 구문은 다음과 같습니다:

```js
ng g c 컴포넌트이름
```

원하는 컴포넌트 이름을 kebab-case(모두 소문자 및 하이픈 사용)로 지정하세요.

Angular 컴포넌트 디렉토리 내에서 일반적으로 찾을 수 있는 파일에 대한 자세한 설명은 다음과 같습니다:

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

- Component Class (Typescript):

- component-name.component.ts: 이 TypeScript 파일에는 컴포넌트의 동작 및 로직을 정의하는 클래스가 포함되어 있습니다. 속성, 메서드, 이벤트 핸들러, 라이프사이클 훅 및 컴포넌트와 관련된 다른 로직이 포함됩니다.

2. Template (HTML):

- component-name.component.html: 이 HTML 파일은 컴포넌트의 사용자 인터페이스의 구조와 내용을 정의합니다. HTML 요소, 데이터 바인딩, 디렉티브 및 동적 콘텐츠를 위한 자리 표시자가 포함될 수 있습니다.

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

3. 스타일 (CSS 또는 SCSS):

- component-name.component.css: 이 CSS 파일에는 컴포넌트에 특화된 스타일이 포함되어 있습니다. 여기에는 일반적인 CSS 스타일을 사용할 수 있습니다.
- component-name.component.scss: 선택적으로, 더 강력하고 모듈식으로 스타일을 작성하고자 하는 경우 SCSS(Sass) 스타일을 사용할 수 있습니다.

4. 테스트 파일 (선택 사항):

- component-name.component.spec.ts: 이 TypeScript 파일에는 해당 컴포넌트의 유닛 테스트가 포함되어 있습니다. Jasmine과 Karma와 같은 테스트 프레임워크 및 도구를 사용하여 컴포넌트가 예상대로 작동하는지 확인하기 위해 테스트를 작성하고 실행할 수 있습니다.

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

# 인라인 스타일이 포함된 컴포넌트

인라인 스타일을 사용하여 Angular 컴포넌트를 만들려면 @Component() 데코레이터 내에서 styles 속성을 사용하여 컴포넌트의 스타일을 직접 정의해야 합니다. 이 방법은 컴포넌트 템플릿과 밀접한 관련이 있는 간단하고 구체적인 스타일을 추가하는 데 유용할 수 있습니다.

아래 명령어를 실행해보세요

```js
ng g c 컴포넌트명 --inline-style
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

컴포넌트 TypeScript 파일을 수정하세요 (component-name.component.ts): 컴포넌트의 TypeScript 파일을 열어 @Component() 데코레이터를 업데이트하여 styles 속성을 포함시키세요. styles 속성은 각각 CSS 규칙을 포함하는 문자열 배열이어야 합니다.

다음은 예시입니다:

```js
import { Component } from "@angular/core";

@Component({
  selector: "app-my-component",
  templateUrl: "./my-component.component.html",
  styles: [
    `
      .my-component-container {
        background-color: lightblue;
        padding: 20px;
      }
    `,
    `
      h2 {
        color: red;
      }
    `,
  ],
})
export class MyComponent {}
```

# 모듈들

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

앵귤러에서 모듈은 관련 컴포넌트, 서비스, 디렉티브 및 기타 코드를 응집 단위로 구성하는 메커니즘입니다. 모듈은 애플리케이션을 모듈화하고 기능을 그룹화하여 관심사 분리를 촉진하는 데 도움이 됩니다. 앵귤러 애플리케이션은 여러 모듈을 결합하여 구축되며 각 모듈은 애플리케이션의 특정 부분을 담당합니다.

모듈 생성: 새 모듈을 생성하려면 Angular CLI의 generate module 명령을 사용하세요. 일반적인 구문은 다음과 같습니다:

```js
ng generate module 모듈이름
```

모듈 이름을 케밥 케이스(소문자와 하이픈 사용)로 입력해주세요.

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

아래는 Angular 모듈을 만드는 간단한 예제입니다:

```js
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

# 함수 만들고 호출하기

함수는 종종 메서드로 불리며, 컴포넌트와 서비스 내에서 정의되어 로직을 캡슐화하고, 이벤트를 처리하며, 계산을 수행하고, 데이터와 상호 작용하는 데 사용됩니다.

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
import { Component } from "@angular/core";

@Component({
  selector: "app-my-component",
  templateUrl: "./my-component.component.html",
  styleUrls: ["./my-component.component.css"],
})
export class MyComponent {
  counter: number = 0;

  incrementCounter() {
    this.counter++;
  }
}
```

```js
<button (click)="incrementCounter()">Increment Counter</button>
```

# Events

Angular에서 이벤트는 응용 프로그램의 사용자 인터페이스 내에서 발생하는 상호 작용 또는 발생하는 사건을 의미합니다. 이러한 상호 작용은 클릭, 키 누름, 마우스 이동, 입력 변경 등과 같은 작업을 포함할 수 있습니다. Angular는 이러한 이벤트를 처리하고 사용자에게 동적이고 상호 작용적인 경험을 제공하기 위해 이에 응답하는 메커니즘을 제공합니다. Angular에서 이벤트의 주요 측면은 다음과 같습니다:

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

- 이벤트 바인딩: 이벤트 바인딩은 사용자 상호작용으로 트리거된 이벤트를 청취하고 응답하는 방법입니다. 컴포넌트 클래스에서 메서드를 템플릿의 이벤트와 바인딩하는 것을 말합니다. (event) 구문을 사용합니다.

```js
<button (click)="handleClick()">Click Me</button>
<input (input)="handleChange($event)">
```

2. 이벤트 객체: 이벤트가 트리거되면 이벤트 핸들러 메서드로 이벤트 객체가 전달됩니다. 이 객체에는 이벤트 유형, 대상 요소 등의 정보가 포함되어 있습니다.

```js
handleClick(event: MouseEvent) {
   console.log(`Button clicked! Event type: ${event.type}`);
 }
handleChange(event: Event) {
   const inputValue = (event.target as HTMLInputElement).value;
   console.log(`Input value changed: ${inputValue}`);
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

3. 이벤트 유형: 다양한 이벤트 유형은 사용자 상호작용에 해당합니다. 클릭, 입력, 변경, 마우스 진입, 마우스 이탈, 키 다운, 키 업 등이 일반적인 이벤트 유형입니다.

4. 이벤트 수정자: Angular은 이벤트 동작을 수정할 수 있는 이벤트 수정자를 제공합니다. 예를 들어, stopPropagation 수정자를 사용하여 이벤트 전파를 방지하는 방법과 함께 (click) 이벤트를 사용할 수 있습니다.

\js
<button (click.stop)="handleClick()">Click Me</button>
\

5. 양방향 데이터 바인딩: Angular은 [(ngModel)] 지시문을 사용하여 양방향 데이터 바인딩을 지원합니다. 이는 입력 요소에 대해 데이터 속성과 이벤트 핸들링을 함께 바인딩하여 뷰와 모델을 동기화하는 기능을 제공합니다.

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

```typescript
<input [(ngModel)]="username">
```

6. 사용자 정의 이벤트: Angular의 EventEmitter를 사용하여 사용자 정의 이벤트를 생성하고 emit할 수도 있습니다. 부모 및 자식 컴포넌트 간에 통신이 필요할 때 특히 유용합니다.

```typescript
import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-child",
  template: '<button (click)="emitCustomEvent()">이벤트 발생</button>',
})
export class ChildComponent {
  @Output() customEvent = new EventEmitter<void>();

  emitCustomEvent() {
    this.customEvent.emit();
  }
}
```

```html
<app-child (customEvent)="handleCustomEvent()"></app-child>
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

이벤트를 바인딩하고 구성 요소의 메서드에서 처리함으로써 사용자가 응용 프로그램과 상호 작용하여 다양한 작업 및 동작을 트리거할 수 있습니다.

## 속성 바인딩

속성 바인딩은 Angular의 핵심 개념으로, HTML 요소 및 Angular 지시문의 속성이나 속성을 동적으로 설정하고 업데이트할 수 있게 해줍니다. 속성 바인딩을 사용하면 HTML 요소나 Angular 지시문의 속성을 구성 요소의 TypeScript 코드에서 정의된 표현식이나 값에 바인딩할 수 있습니다. 이를 통해 동적이고 데이터 주도형 사용자 인터페이스를 만들 수 있습니다.

Angular의 속성 바인딩에 대해 이해해야 할 주요 포인트는 다음과 같습니다:

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

바인딩 구문: 템플릿에서 속성 바인딩은 대괄호 []를 사용하여 수행합니다. 대괄호 안에 바인딩할 속성을 넣고, 등호와 바인딩할 식 또는 값을 넣습니다.

```js
<!-- 이미지 요소의 "src" 속성을 바인딩하는 예시 -->
<img [src]="imageUrl">
```

컴포넌트 속성에 바인딩: 대부분의 경우, 속성은 컴포넌트의 TypeScript 코드에서 정의된 값이나 표현식에 바인딩합니다. 이를 통해 컴포넌트 데이터에 따라 속성을 동적으로 업데이트할 수 있습니다.

```js
export class MyComponent {
  imageUrl = "path/to/default-image.jpg";
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

앵귤러 디렉티브와 속성 바인딩: 속성 바인딩은 주로 앵귤러 디렉티브와 함께 사용됩니다. 예를 들어, 내장 디렉티브인 ngStyle, ngClass 또는 ngIf와 같은 속성을 바인딩할 수 있습니다. 또한 사용자 정의 디렉티브와도 속성을 바인딩할 수 있습니다.

```js
<div [ngStyle]="{ 'font-size.px': fontSize }">동적 글꼴 크기</div>
<button [disabled]="isDisabled">클릭하세요</button>
```

DOM 속성에 바인딩: src, href, disabled, value, innerText 등과 같은 표준 HTML 요소 속성에 바인딩할 수 있습니다. 또한 사용자 정의 앵귤러 컴포넌트에서 정의된 사용자 정의 속성에도 바인딩할 수 있습니다.

단방향 바인딩: 속성 바인딩은 일방향 바인딩의 한 형태입니다. DOM 요소나 디렉티브의 속성을 컴포넌트 데이터를 기반으로 설정하지만, DOM 요소의 변화는 컴포넌트 데이터에 영향을 미치지 않습니다.

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

# If-Else

앵귤러 템플릿에서는 if-else 조건에 따라 조건부 렌더링을 생성하기 위해 구조적 디렉티브를 사용할 수 있습니다. 이 용도에 가장 적합한 주 디렉티브는 *ngIf이며, 이를 사용하면 표현식을 평가하여 DOM에서 요소를 조건부로 렌더링하거나 제거할 수 있습니다. 또한 *ngIf와 함께 else 키워드를 사용하여 if-else 구조를 구현할 수 있습니다. 안내해드리는 방법과 같이 Angular 템플릿에서 if-else 조건을 사용하는 방법을 알아보세요:

```js
<div *ngIf="condition; else elseBlock">
  <!-- 조건이 참일 때 표시할 내용 -->
</div>
<ng-template #elseBlock>
  <!-- 조건이 거짓일 때 표시할 내용 -->
</ng-template>
```

이 예시에서는:

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

- condition은 당신의 컴포넌트의 TypeScript 코드에서의 불리언 표현식입니다.
- condition이 참이면 \*ngIf 블록 내에 있는 내용이 표시됩니다.
- condition이 거짓이면 elseBlock 템플릿 내에 있는 내용이 표시됩니다.

템플릿의 삼항 연산자: 간단한 if-else 조건에 대해 템플릿에서 삼항 연산자 (? :)를 사용하여 내용을 조건부로 렌더링할 수 있습니다:

```js
<div>{condition ? "condition이 true인 경우 표시됩니다." : "condition이 false인 경우 표시됩니다."}</div>
```

다중 if-else 조건에 대한 내용:

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
<ng-template [ngIf]="color==='red'>
    <h1>Red Color</h1>
<ng-template>

<ng-template [ngIf]="color==='green'>
    <h1>Green Color</h1>
<ng-template>

<ng-template [ngIf]="color==='blue'>
    <h1>Blue Color</h1>
<ng-template>
```

# Switch case

Angular 템플릿에서는 ngSwitch 지시문을 사용하여 switch-case 로직을 구현할 수 있습니다. ngSwitchCase 또는 ngSwitchDefault를 사용하여 식의 값에 따라 내용을 조건부로 렌더링할 수 있습니다.

```js
<div [ngSwitch]="selectedOption">
  <p *ngSwitchCase="'option1'">Option 1 is selected.</p>
  <p *ngSwitchCase="'option2'">Option 2 is selected.</p>
  <p *ngSwitchCase="'option3'">Option 3 is selected.</p>
  <p *ngSwitchDefault>No option is selected.</p>
</div>
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

이 예제에서:

- selectedOption은 선택된 옵션을 포함하는 컴포넌트의 TypeScript 코드의 속성입니다.
- [ngSwitch] 지시문은 평가할 표현식을 지정하는 데 사용됩니다.
- 각 \*ngSwitchCase 블록은 selectedOption의 특정 값에 대해 확인하고 콘텐츠를 그에 맞게 표시합니다.
- \*ngSwitchDefault 블록은 ngSwitchCase 조건 중 어느 것도 일치하지 않을 때 기본 케이스로 사용됩니다.

다음은 컴포넌트의 TypeScript 코드에서 selectedOption 속성을 정의하는 간단한 예시입니다:

```js
import { Component } from "@angular/core";

@Component({
  selector: "app-my-component",
  templateUrl: "./my-component.component.html",
  styleUrls: ["./my-component.component.css"],
})
export class MyComponent {
  selectedOption: string = "option1"; // Initially set to option1
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

# for 문

앵귤러 템플릿에서 \*ngFor 디렉티브를 사용하여 배열이나 리스트와 같은 컬렉션을 순회하고 반복할 수 있습니다. 이 디렉티브를 사용하면 컬렉션의 각 항목마다 요소를 렌더링할 수 있습니다.

```js
<ul>
  <li *ngFor="let item of items">
    { item }
  </li>
</ul>
```

이 예시에서:

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

- items은 컴포넌트의 TypeScript 코드에서 배열 또는 반복 가능한 컬렉션입니다.
- \*ngFor 지시문은 li 요소에 적용됩니다.
- let item of items는 각 항목을 나타내는 템플릿 변수인 item이 포함된 루프를 정의합니다.
- let i = index는 현재 항목의 인덱스에 액세스하기 위한 선택적인 템플릿 변수 i를 정의합니다.

이 코드는 items 배열의 각 항목에 대해 목록 항목 (li)을 가진 정렬된 목록 (ul)을 렌더링합니다. i + 1 표현식을 사용하여 항목의 인덱스 (1부터 시작)와 그 값을 표시합니다.

다음은 컴포넌트의 TypeScript 코드에서 items 속성을 정의하는 방법의 예시입니다:

```js
import { Component } from "@angular/core";

@Component({
  selector: "app-my-component",
  templateUrl: "./my-component.component.html",
  styleUrls: ["./my-component.component.css"],
})
export class MyComponent {
  items: string[] = ["Item 1", "Item 2", "Item 3", "Item 4"];
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

# 중첩 루프

Angular 템플릿에서는 여러 \*ngFor 지시문을 중첩하여 중첩된 루프를 생성할 수 있습니다. 이를 통해 배열의 배열이나 배열을 포함하는 객체의 배열과 같은 중첩된 컬렉션을 반복할 수 있습니다. Angular 구성 요소의 템플릿에서 중첩된 루프를 만드는 방법의 예시는 다음과 같습니다:

```js
import { Component } from "@angular/core";

@Component({
  selector: "app-my-component",
  templateUrl: "./my-component.component.html",
  styleUrls: ["./my-component.component.css"],
})
export class MyComponent {
  nestedArray: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
}
```

템플릿에서는 이 데이터 구조를 반복하는 데 중첩된 \*ngFor 루프를 사용할 수 있습니다.

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
<table>
  <tr *ngFor="let row of nestedArray">
    <td *ngFor="let cell of row">
      { cell }
    </td>
  </tr>
</table>
```

이 예제에서:

- 외부 \*ngFor 반복문은 nestedArray의 각 행을 반복합니다.
- 내부 \*ngFor 반복문은 현재 행 내의 각 셀을 반복합니다.
- cell은 중첩된 배열 내의 각 값을 나타내며, 표 셀 (`td`)에 표시됩니다.

이 코드는 각 행이 nestedArray에서 값을 포함하는 표를 렌더링하며, 중첩된 루프의 기본적인 예제를 보여줍니다.

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

이 글에서는 Angular의 흥미로운 세계로 첫 걸음을 내딛어본 바 있습니다. 이 글에서는 동적이고 견고한 웹 애플리케이션을 구축하는 기초가 되는 핵심 개념을 탐구했습니다. Angular의 필수 개념인 파일 및 폴더 구조 이해부터 모듈, 컴포넌트, 보간(interpolation), 속성 바인딩까지 다뤘습니다. 게다가, *ngIf로 조건부 렌더링을 구현하는 방법과 *ngFor를 사용하여 반복문을 만드는 법을 배웠습니다.

Angular 여정의 첫 부분을 마무리하면서 이러한 핵심 개념에 대한 강력한 이해를 키워 더 고급 주제와 기술을 다루는 두 번째 부분을 위한 탄탄한 기초를 마련했습니다. 다가오는 세그먼트에서는 Angular의 강력한 기능인 서비스, 라우팅, 폼, HTTP 상호작용 등을 탐험할 예정입니다.

계속 주목해 주세요! Angular 탐험의 두 번째 부분은 학습 여정의 흥미로운 이어짐을 약속합니다. 여기서는 최신 대화형 웹 애플리케이션을 쉽게 구축할 수 있는 도구와 기술을 발견할 것입니다. 그동안 배운 내용을 탐험하고 연습하며 Angular에 대한 이해를 견고히 다지는 것이 가장 좋은 방법이며 개발 전문성이 발전하는 길을 열어줄 것입니다.
