---
title: "Markdown에서 Angular 컴포넌트 렌더링 하는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-07-RenderAngularComponentsinMarkdown_0.png"
date: 2024-07-07 12:58
ogImage:
  url: /assets/img/2024-07-07-RenderAngularComponentsinMarkdown_0.png
tag: Tech
originalTitle: "Render Angular Components in Markdown"
link: "https://medium.com/@shhdharmen/render-angular-components-in-markdown-5994ca8b9d08"
---

먼저, `markdown-render` 컴포넌트를 설정하여 .md 파일을 렌더링할 것입니다. 그리고 Angular 컴포넌트를 렌더링하는 방법을 살펴볼 것입니다.

# Markdown 렌더러

필요한 종속성을 설치하세요:

```js
npm i highlight.js marked marked-highlight
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 단계 1: markdown-renderer/highlight-code-block.ts 파일 생성

이 함수는 마크다운 파일에서 코드를 강조 표시하는 데 사용됩니다.

```js
import highlightJs from "highlight.js";

export function highlightCodeBlock(code: string, language: string | undefined) {
  if (language) {
    return highlightJs.highlight(code, {
      language,
    }).value;
  }
  return code;
}
```

# 단계 2: markdown-renderer/transform-markdown.ts 파일 생성

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 기능은 Markdown을 HTML로 변환하는 데 사용될 것입니다.

```js
import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import { highlightCodeBlock } from "./highlight-code-block";

marked.use(markedHighlight({ highlight: highlightCodeBlock }));
export const markdownToHtml = (content: string) => {
  return marked(content);
};
```

# 단계 3: markdown-renderer/markdown.service.ts 만들기

이 서비스는 구성 요소에서 .md 파일을 로컬 또는 외부 위치에서 읽어 HTML로 변환하는 데 사용될 것입니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { markdownToHtml } from './transform-markdown';
@Injectable({
  providedIn: 'root',
})
export class MarkdownService {
  private httpClient = inject(HttpClient);
  htmlContent(src: string) {
    return this.httpClient.get(src, { responseType: 'text' }).pipe(
      map((markdownContent) => {
        return markdownToHtml(markdownContent);
      })
    );
  }
}
```

# 단계 4: markdown-renderer/markdown-renderer.ts 파일 생성하기

마지막으로, 마크다운 파일을 렌더링하는 데 사용할 수 있는 컴포넌트를 만듭니다.

```js
import { Component, ElementRef, effect, inject, input } from '@angular/core';
import { MarkdownService } from './markdown.service';
import { take } from 'rxjs';
import highlightJs from 'highlight.js';

@Component({
  selector: 'markdown-renderer',
  template: '문서 로딩 중...',
  standalone: true,
})
export class MarkdownRendererComponent {
  src = input.required<string>();
  textContent = '';
  private _elementRef = inject<ElementRef>(ElementRef);
  private markdownService = inject(MarkdownService);
  constructor() {
    effect(() => {
      const src = this.src();
      this.setDataFromSrc(src);
    });
  }
  setDataFromSrc(src: string) {
    this.markdownService
      .htmlContent(src)
      .pipe(take(1))
      .subscribe((htmlContent) => {
        this.updateDocument(htmlContent as string);
      });
  }
  updateDocument(rawHTML: string) {
    this._elementRef.nativeElement.innerHTML = rawHTML;
    this.textContent = this._elementRef.nativeElement.textContent;
    highlightJs.highlightAll();
  }
}
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 단계 5: HTTP 제공

```js
bootstrapApplication(App, {
  providers: [provideHttpClient(withFetch())],
});
```

# 단계 6: 사용법

이제 어디에서든 markdown을 렌더링하고 싶을 때, 간단히 `markdown-renderer`를 사용하면 됩니다:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
import { Component } from "@angular/core";
import { MarkdownRendererComponent } from "./markdown-renderer/markdown-renderer";
@Component({
  selector: "article",
  standalone: true,
  template: `<markdown-renderer src="/assets/article.md"></markdown-renderer>`,
  imports: [MarkdownRendererComponent],
})
export class ArticleComponent {}
```

# 마크다운에 Angular 구성 요소 추가하기

필요한 종속성 설치:

```js
npm i @angular/elements
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 단계 1: custom-elements.service.ts 파일 만들기

이 서비스는 Angular 구성 요소를 사용자 지정 요소로 변환하는 데 사용됩니다. 이렇게 하면 .md 파일에서 Angular 구성 요소를 쉽게 사용할 수 있습니다.

```typescript
import { inject, Injectable, Injector } from "@angular/core";
import { createCustomElement } from "@angular/elements";
import { SubscribeComponent } from "./components/subscribe";
import { CounterComponent } from "./components/counter";

@Injectable({ providedIn: "root" })
export class CustomElementsService {
  private _injector = inject(Injector);

  setupCustomElements() {
    const subscribeElement = createCustomElement(SubscribeComponent, {
      injector: this._injector,
    });
    customElements.define("subscribe-component", subscribeElement);

    const counterElement = createCustomElement(CounterComponent, {
      injector: this._injector,
    });
    customElements.define("counter-component", counterElement);
  }
}
```

# 단계 2: APP_INITIALIZER를 통해 setupCustomElements 호출하기

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

커스텀 요소를 초기화 단계에서부터 사용하고 싶기 때문에 APP_INITIALIZER를 사용할 것입니다.

```js
bootstrapApplication(App, {
  providers: [
    provideHttpClient(withFetch()),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeCustomElements,
      multi: true,
      deps: [CustomElementsService],
    },
  ],
});
```

# 단계 3: 사용 방법

마지막으로 파일에서 커스텀 요소를 사용하면 Angular 컴포넌트가 렌더링됩니다. 아래와 같이 간단히 사용할 수 있습니다:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
<subscribe-component></subscribe-component>
<counter-component></counter-component>
```

# 코드

# 자유 콘텐츠 생성 지원

코스와 기사는 무료로 제공되지만, 최고 수준의 교육 콘텐츠를 전달하는 제 야망을 지원해 주시면 감사히 받아들일 것입니다. 기여를 결정하는 것은 계속해서 코스를 개선하고 추가 자료를 작성하며 이러한 자료에 대한 접근성을 유지하는 데 도움이 됩니다. 기여하고 의미 있는 변화를 만들어주시는 것에 감사드립니다!

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

![Render Angular Components in Markdown](/TIL/assets/img/2024-07-07-RenderAngularComponentsinMarkdown_0.png)
