---
title: "내가 프로젝트를 React가 아닌 Angular로 만든 이유"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Why Ive Switched from React to Angular for My Projects"
link: "https://medium.com/@alexseifert/why-ive-switched-from-react-to-angular-for-my-projects-9838144f3732"
isUpdated: true
---

여러 해 동안 저의 기본 프론트엔드 프레임워크는 React였어요. 제가 2015년경부터 전문적으로 사용하기 시작했고, 이미 이 마음가짐으로 작업 중이었기 때문에 개인 프로젝트에서도 당연하게 React를 사용했죠.

물론 그 이후로 다른 프레임워크들도 좀 살펴보긴 했어요, 특히 Vue와 함께 말이죠. 하지만 이들은 별로 내 마음에 들지 않았어요. 언제나 최종적으로 뭘 하려고 했던 프로젝트에 대해 React를 사용하게 되었어요.

그럼에도 불구하고 다른 건 왜 안 먹혔는데 Angular를 갑자기 사용하고 싶어했던 걸까요?

참고: 몇몇 개발자들이 React를 라이브러리라고 부르는 것을 알고 있어요. 아마 그게 더 정확한 표현일지도 모르지만, 이 글에서는 "React"라고 말할 때 React 자체뿐만 아니라 전체 생태계를 지칭하기 때문에 계속해서 프레임워크라고 부르겠어요.

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

# 새로운 직장

올해 초에 새 직장을 시작했어요. 프런트엔드 개발자로 채용됐지만 프로젝트에서는 React 대신 Angular를 사용해야 했어요. 이 직장에 지원할 때는 다른 프레임워크를 진정으로 시도해보고 어떻게 동작하며 어떻게 느껴지는지 보는 좋은 기회가 될 것이라고 생각했어요. 그래서 발견한 것은 정말 놀라웠어요.

이제, Angular가 개발자들 사이에서 매우 인기 있는 프레임워크는 아니며 특히 프런트엔드 개발자들 사이에서 인기가 없다는 걸 알고 있어요. 아마 React나 Vue와 같은 프레임워크와 달리 Angular는 당신을 백엔드 개발자처럼 생각하도록 강요하기 때문인 거 같아요.

Angular는 의견이 확고하며 객체지향적인 프레임워크이고 클래스, 서비스, 컴포넌트, 모듈에 대해 생각해야 해요. React와 Vue는 컴포넌트를 어떻게 구성하고 코드를 어떻게 구조화할지에 대해 훨씬 유연해요. 두 프레임워크 모두 장단점이 있지만, 풀스택 개발자로서 객체지향 코드를 작성해야 한다는 게 꽤 맘에 들어요.

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

# 왜 Angular를 선택해야 할까요?

이제 몇 달 동안 Angular을 전문적으로 사용하면서 React는 다양한 측면에서 Angular과 비교할 수 없다고 결론 내렸습니다. 이를 특정 순서 없이 여기서 요약해보겠습니다.

## 서비스

Angular의 서비스를 아주 좋아합니다. 데이터 처리의 주요 방법이며 간단하고 직관적이며 단위 테스트하기 쉽고 대량의 데이터 처리에 이상적입니다.

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

Angular에서 그들은 어떻게 작동할까요? 이 글에서는 상세히 다루지는 않겠습니다. 하지만 매우 간단히 개요를 설명해 드리겠습니다. 기본적으로 Angular에서는 응용 프로그램에서 데이터를 가져오고 저장하는 데 사용되는 주입 가능한 클래스입니다.

Angular는 각각을 싱글톤으로 취급하여 클래스에 저장된 데이터는 사용자 세션 동안 지속됩니다. 이를 사용하려면 구성 요소 클래스에 변수로 가져와서 생성자에 주입하기만 하면 됩니다. 그런 다음 데이터를 포함한 모든 공용 함수와 변수에 액세스할 수 있습니다.

Angular 서비스와 React의 가장 유사한 것을 비교할 때, 원시 Context API와 Redux와 같은 제3자 글로벌 스토어의 조합을 얻게 됩니다. Context API를 사용하면 프롭 드릴링을 피할 수 있지만, 모든 변경 사항이 발생할 때마다 React는 사용하는 모든 렌더링된 구성 요소를 다시 렌더링해야 합니다. 데이터는 제공자를 포함한 컴포넌트가 아직 마운트되어 있는 한에만 지속됩니다.

Redux와 다른 스토어는 응용 프로그램 전체에서 전역적으로 사용 가능하며 데이터는 사용자 세션 전체 기간 동안 지속됩니다. 다시 렌더링은 여기서 큰 문제가 되지는 않지만, 그에는 비용이 따릅니다: 방대한 양의 보일러플레이트 코드가 필요합니다. Redux에서 리듀서와 썽크 액션을 작성하는 것은 강력하지만 지루하고 고통스럽습니다. 특히 TypeScript를 사용하는 경우라면 타입을 올바르게 지정하는 것은 정말 짜증을 내게 할 수 있습니다.

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

모든 문제를 해결하는 Angular 서비스는 TypeScript에서 다른 클래스를 작성하는 것만큼 쉽게 사용할 수 있습니다. 그게 전부에요. 말 그대로 그게 전부에요. 보일러플레이트도 없고, 다시 렌더링하는 문제도 없습니다. 그저 작동합니다.

# 모든 것이 포함되어 있음

React와는 달리 Angular는 대부분의 애플리케이션에 필요한 모든 것을 기본적으로 제공하므로 추가 종속성인 axios(요청용), Redux Router(라우팅용), 또는 Redux(스토어용)을 찾아 사용해야 하는 React와 달리 필요한 것을 찾아 사용해야 하는 React와 달리 필요한 것을 찾아 사용해야 하는 React와 달리 필요한 것을 찾아 사용해야 하는 React와 달리 필요한 것을 찾아 사용해야 합니다.

먼저 함께 배포되기 때문에 서로 계속 원활히 작동할 것이라는 확신을 얻을 수 있습니다. React 세계에서는 각 종속성이 독립적이기 때문에 항상 서로 테스트되지 않으므로 이와 같은 일이 항상 일어나지는 않습니다. 작은 업데이트조차 호환성을 깨는 것이 얼마나 많이 일어났는지 모릅니다. 이는 짜증나는 일이며 해결하는 데 많은 시간이 소요됩니다.

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

모든 것이 Angular를 위해 설계되어 있기 때문에 Angular 패러다임 내에서 사용하기 위해 "보조" 패키지를 사용할 필요가 없어요. React의 경우 종종 의존성을 설치한 다음 "react-{라이브러리 이름}" 패키지가 있는지 확인해야 할 수도 있어요. 이 패키지는 React 훅이나 고차 컴포넌트(HOCs)와 함께 작동하도록 맞추어줄 거예요. 이로 인해 패키지 업데이트가 훨씬 까다로워지는데, 이러한 "보조" 패키지 중 많은 것들이 불규칙하게 업데이트되며, 주 패키지를 개별적으로 업데이트하면 망가질 수 있어요.

여기서 소개할 마지막 이유는 문서화입니다. Angular 세계의 대부분 개발자들이 포함된 패키지를 사용하기 때문에, 궁금한 점이 생기면 이미 누군가 온라인에서 답변한 경우가 매우 높아요. 동일한 설정을 사용함으로써, 답변이 여러분의 설정에 적용될 가능성이 훨씬 높아요. 이는 문제가 발생했을 때 개발이 더 빨라지도록 도와줘요.

# 프로젝트 구성

프로젝트 구성은 제게 큰 고민거리였어요, 특히 여러 명의 개발자가 있는 대규모 프로젝트에 React를 사용할 때말이에요. React는 의견이 분분한 프레임워크이기 때문에 프로젝트를 설정하고 코드를 원하는 대로 구성할 수 있어요. 제공되는 구조가 매우 적기 때문에 대규모 프로젝트 내에서 일관성을 유지하려면 풀 리퀘스트에 엄격하고 린팅과 같은 다른 도구를 사용하여 특정 스타일을 강제할 필요가 있어요.

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

리액트의 접근 방식은 최대한의 유연성을 제공하며 작은 프로젝트에는 좋을 수 있지만, 제 경험 상 대형 프로젝트에서는 혼돈된 조직을 야기할 수 있다.

앵귤러의 이러한 방식은 더 나은 접근 방식입니다. 이는 객체지향적이며 클래스가 제공하는 코드 구조를 갖게 됩니다. 앵귤러의 CLI 도구는 컴포넌트를 위해 필요한 모든 것을 자동으로 생성합니다: 컴포넌트 클래스, HTML 파일, 단위 테스트 파일 및 SCSS 파일을 포함합니다. 동일한 방식으로 서비스, 지시문, 모듈, 라우터 등도 생성합니다.

내장된 도구가 이러한 항목을 생성하는 데 필요한 모든 것을 자동으로 설정하기 때문에 항상 일관되게 유지됩니다.

물론 여전히 린팅이 필요하지만, 코드를 청소하게 유지하는 데 의존해야 하는 정리된 코드보다는 깔끔한 코드인지 확인하기 위해 신뢰해야 합니다. 앵귤러는 여전히 디렉토리 트리를 원하는 대로 설정할 수 있지만, 모듈과 같은 필수 구조가 있는데 이는 코드를 여전히 일관되고 조직적으로 유지하도록 보장합니다.

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

깨끗하고 조직화된 코드의 장점은 수많이 있지만 그 중 하나는 프로젝트 간 전환이 용이하다는 점입니다. 새로운 React 프로젝트로 이동할 때에는 프로젝트가 어떻게 설정되어 있는지, 클래스 기반 컴포넌트를 사용하는지 함수형 컴포넌트를 사용하는지(또는 혼합된 형태인지) 등을 파악하는 데 많은 시간을 소비해야 합니다. 그에 비해 Angular는 항상 의지할 수 있는 특정 구조를 가지고 있어 새로운 프로젝트를 이해하는 데 훨씬 수월합니다.

# 양방향 바인딩

양방향 바인딩은 내가 직관적으로 이해하고 있다는 것을 깨닫지 못했던 개념이었는데, 알아보고 나서 굉장히 강력한 것이라는 것을 깨달았습니다. React 세계에서 온 나로서, 변수의 변경에 반응하기 위해 useEffect와 같은 훅을 사용하는 것에 익숙했습니다. 결국 이것이 React의 핵심 구성 요소 중 하나라는 점이 맞습니다.

Angular는 이를 다르게 해결합니다. (React에서의 상태 변수에 해당하는) 컴포넌트 변수는 값을 변경에 반응하기 위해 감시할 필요가 없는 공개 클래스 변수입니다. 데이터가 양방향으로 흐르기 때문에(양방향 바인딩), 클래스 변수가 자동으로 업데이트됩니다.

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

값이 변할 때 어떻게 반응해야 할지 궁금하시다구요? 간단합니다! 클래스 변수에 대해 표준 "get"과 "set" 속성을 사용하시면 됩니다. 예를 들어:

```js
private user: User;

get firstName(): string {
  return user.firstName;
}

set firstName(name: string) {
  user.firstName = name;
  // 여기서 이름이 업데이트될 때 무언가를 수행합니다
}
```

이렇게 하면 완전한 기본 TypeScript 코드를 사용하게 됩니다. 일관성이 있고 읽기 쉬우며 이해하기 쉽습니다. React 애플리케이션에서 useEffect와 같은 후크가 종종 가져오는 이상한 부작용과 거래할 필요가 없죠.

# 서버 사이드 렌더링

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

네, React가 서버 사이드 렌더링을 지원하고 있고, Next.js와 같은 프레임워크를 사용하면 React를 활용한 서버 사이드 렌더링 싱글 페이지 애플리케이션을 손쉽게 구축할 수 있다는 것을 알고 있죠. 그렇지만, Angular는 그것을 기본적으로 제공해요. 그리고 그냥 작동돼요.

다른 프레임워크가 필요 없고, 라우팅을 걱정할 필요도 없고, 그외 거의 걱정할 것이 없죠. Angular CLI를 사용하여 한 번의 명령어만 입력하면 적절한 설정으로 Express 서버가 자동으로 설정돼요. 그냥 기본 설정대로 작동하는 거죠.

물론 원하는 경우 기존 서버나 다른 서버 프레임워크인 Fastify나 Koa와 같은 것을 사용할 수도 있어요. 설정할 부분이 매우 적기 때문에 수동으로 설정하고 실행하는 것도 매우 쉬워요.

Angular는 심지어 전적으로 정적인 웹사이트를 원하는 경우 콘텐츠를 사전 렌더링할 수도 있어요. 여기서 유일한 단점은, Next.js와 유사한 기능을 갖고 있지만, 한 번 생성된 사전 렌더링된 콘텐츠를 업데이트하는 방법이 없다는 것이에요. 애플리케이션 전체를 다시 빌드하지 않으면 사전 렌더링된 내용을 업데이트할 방법이 없습니다. 그것이 제게는 유일한 큰 단점인 것 같아요.

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

# React를 계속 사용하는 이유

그래서 Angular 대신 React를 사용하기 시작한 이유에 대해 썼으니, 이제 React에도 조금은 사랑을 보여주는 시간이라고 생각해요. 결국, 여전히 많은 긍정적 측면을 가진 훌륭한 프레임워크입니다.

하지만 여기서 이에 대해 자세하게 다루지는 않겠습니다. 이 기사의 목적은 아니기 때문이죠. 아마도 별도의 글로 충분히 다룰만한 주제일 것 같아요.

React를 계속 사용하게 만드는 첫 번째 이유는 제 경험 수준입니다. 몇 년 동안 사용해 와서, 이 프레임워크의 독특한 점과 일반적인 작동 방식에 대해 꽤 많은 지식을 쌓았거든요.

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

제 경험상 Angular에 대한 경험이 많이 부족해서 React로 이해하고자 하는 것은 문서를 많이 읽어야 합니다. 예를 들어, 구성 요소의 다시 렌더링이 언제 발생하는지는 React에서 쉽게 알 수 있는 것인데 Angular에서는 그렇지 않습니다. 시간이 흐르면 Angular에 대해 이해도가 높아질 것이지만 그 과정은 어느 정도 시간이 걸릴 것입니다. 그동안은 좀 더 느리게 작업해야 할 것 같습니다.

두 번째 이유는 제 개인 프로젝트를 통해 제가 재사용할 수 있는 일련의 일반적인 React 컴포넌트 카탈로그를 쌓아왔다는 점입니다. 이에는 버튼, 입력 필드, 토스트, 다이얼로그, 팝업 메뉴, 스피너 등이 포함되어 있습니다.

이 컴포넌트들은 제가 선호하는 스타일로 지정되어 있으며 일반적으로 추가 기능을 갖고 있습니다. 예를 들어, 제 버튼 컴포넌트에는 내장된 스피너가 있어 폼을 제출할 때 버튼을 비활성화하고 버튼의 경계 내에서 스피너를 표시할 수 있습니다.

이러한 컴포넌트를 프로젝트 간에 복사할 수 있다는 것은 많은 시간을 절약할 수 있다는 뜻입니다. Angular를 처음부터 다시 시작하면 이러한 컴포넌트가 없어져서 처음부터 다시 만들어야 합니다. 그래도 크게 문제는 되지 않지만 이것은 많은 시간과 노력이 들 것이며 제 개인 프로젝트에 계속해서 React를 사용하는 이유가 됩니다.

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

# 결론

내가 내 프로젝트에서 React에서 Angular로 전환한 이유에 대해 대강 이야기해 봤어. Angular에 대해 좋아하는 면이 많아서 내 의견으로는 React보다 훨씬 우월한 프레임워크라고 생각해. 하지만 모든 것이 React에 관해서 나쁜 것은 아니야.

조사에 따르면, Angular는 가장 호불호가 갈리는 프런트엔드 프레임워크 중 하나인데, 이는 복잡성과 객체지향적인 "백엔드" 마인드 때문이라고 가정해 볼 수밖에 없어.

프런트엔드 개발자들이 주로 창의적인 유형이고, 자신의 작업을 완료하기 위해 특정한 규약들을 사용해야 하는 것을 싫어해. Angular는 클래스를 사용하도록 강제하고, 코드를 모듈화하도록 강요하며, TypeScript로 모든 것을 구현하도록 강제하는데, 이는 그 자체로 학습 곡선이 따른다고 해.

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

위에 나열된 것들은 저에게 매우 즐거운 측면들이에요. 하지만 그 이유는 제가 프론트엔드와 백엔드 둘 다 다루는 풀스택 개발자이기 때문일 수도 있어요. 그래도 어찌되었든, Angular를 배우는 걸 즐기고 있고 앞으로도 계속 이에 관해 포스팅할 거예요.

여러분이 가장 좋아하는 프론트엔드 프레임워크는 무엇이고 그 이유는 무엇인가요? Angular를 좋아하지 않는 개발자 중 하나라면, 그 이유가 무엇인지 알려주세요! 댓글로 알려주세요!

이 기사는 원저자의 블로그인 '개발자의 노트북(Developer’s Notebook)'에서 원래 발표되었습니다.
