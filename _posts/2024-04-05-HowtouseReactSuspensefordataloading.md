---
title: "React Suspense를 데이터 로딩에 어떻게 활용하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "How to use React Suspense for data loading"
link: "https://medium.com/@amirilovic/how-to-use-react-suspense-for-data-loading-4b68f9200c19"
isUpdated: true
---

Next.js에서 앱을 구축 중입니다. 예전 페이지 라우터에서 새로운 앱 라우터로 이전하고 html 스트리밍 및 서버 구성 요소를 활용하기로 결정했습니다. 이 글에서는 React 및 Next.js에서 Suspense 및 서버 구성 요소가 어떻게 작동하는지에 대해 자세히 다루지 않고, 대신 내 앱에서 경험한 실제 사용 사례에서 Suspense 및 서버 구성 요소를 사용하는 방법을 설명하고자 합니다.

# 🧪 예제

내 애플리케이션에서 제품 목록을 렌더링하는 페이지가 있습니다. 이러한 제품은 SEO 및 성능 이유로 서버 측에서 렌더링되어야 합니다. 또한 페이지로의 클라이언트 측 탐색을 지원해야 합니다. 때로는 API가 느릴 수 있으므로 제품 목록에 대한 일부 로딩 상태가 필요합니다.

초기 로드 시 페이지는 모든 제품을 렌더링합니다:

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

![로딩 화면](https://miro.medium.com/v2/resize:fit:1400/1*tZZB70LCPz1tEosJZ5KvOw.gif)

페이지가 로드되기 전에 빈 화면을 볼 수 있는데, 이 지연은 API에서 발생합니다. 대부분의 트래픽에 대해 CDN으로 캐싱되므로 프로덕션에서는 큰 문제가 되지 않습니다.

클라이언트 측 탐색 구성 요소에서 로딩 스켈레톤을 표시하세요:

![로딩 스켈레톤](https://miro.medium.com/v2/resize:fit:1400/1*BwCVlL9Xo5d7LTICOjsdzA.gif)

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

매우 간단한 시나리오입니다.

예시에서 코드는 다음과 같이 구성되어 있습니다:

2000초의 지연 시간으로 느린 API를 시뮬레이션하는 fetchProducts라는 간단한 함수가 있습니다.

다음과 같은 컴포넌트가 있습니다:

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

ProductCard은 제품을 렌더링합니다.

ProductList는 제품 목록을 속성으로 받아 수평 목록으로 ProductCard로 렌더링합니다.

```js
export function ProductList({ products }: { products: Product[] }) {
  return (
    <HStack width="full" padding={2} overflow="auto" gap={4}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </HStack>
  );
}
```

ProductListSkeleton 구성 요소는 로딩 상태의 ProductCard를 10개 렌더링합니다.

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
export function ProductListSkeleton() {
  return (
    <HStack width="full" padding={2} overflow="auto" gap={4}>
      {Array.from({ length: 10 }).map((_, index) => (
        <ProductCard key={index} />
      ))}
    </HStack>
  );
}
```

ProductListWithEffect는 제품 목록을 허용하고 ProductList를 사용하여 렌더링할 수 있는 스마트 컴포넌트이며, 제품이 제공되지 않았을 경우 fetchProducts 함수를 사용하여 제품을 로드합니다.

```js
export function ProductListWithEffect({ products }: { products?: Product[] }) {
  const [productsState, setProductsState] = useState<Product[] | undefined>(
    products
  );

  useEffect(() => {
    if (!productsState) {
      fetchProducts().then((products) => setProductsState(products));
    }
  }, [productsState]);

  if (!productsState) {
    return <ProductListSkeleton />;
  }

  return <ProductList products={productsState} />;
}
```

페이지 라우터 코드와 데이터 로딩을 구현한 부분은 다음과 같습니다:

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

```javascript
export default function Page({ products }: { products: Product[] }) {
  return (
    <ChakraProvider>
      <Header />
      <Box width="full">
        <ProductListWithEffect products={products} />
      </Box>
      <Footer />
    </ChakraProvider>
  );
}

export async function getServerSideProps() {
  const products = await fetchProducts();
  return {
    props: {
      products,
    },
  };
}
```

# 🥁 Suspense를 활용한 데이터 로딩

초안에서는 Suspense와 Next.js의 서버 컴포넌트를 사용하여 코드를 훨씬 간단한 방식으로 작성할 수 있습니다. 상태와 useEffect를 없애고 코드를 간소화할 수 있습니다.

앱 폴더에서는 페이지 로직을 간단히 작성할 수 있습니다:

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
export default async function Page() {
  const products = await fetchProducts();
  return (
    <>
      <ProductList products={products} />
    </>
  );
}
```

하지만 이 접근 방식에 문제가 있습니다 🫤

이를 해결하기 위해 Suspense를 추가하거나 페이지를 위한 로딩 상태를 정의할 수 있습니다. 페이지의 로딩 상태를 작성하고 싶지 않아 컴포넌트가 로딩 중에 모양과 느낌을 제어하도록하려면 Suspense를 시도해 보겠습니다.

데이터를 로드하고 ProductList 컴포넌트와 함께 렌더링하는 새로운 컴포넌트 ProductListWithSuspense를 추가할 수 있습니다:

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
export async function ProductListWithSuspense() {
  const products = await fetchProducts();
  return <ProductList products={products} />;
}
```

이제 페이지에서 이 컴포넌트 주위에 Suspense를 사용하고 로딩 상태를 정의합니다:

```js
export default async function Page() {
  return (
    <Suspense fallback={<ProductListSkeleton />}>
      <ProductListWithSuspense />
    </Suspense>
  );
}
```

거의 완료되었습니다:

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

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*pZFG5fgcpwbbmf1677H3Qw.gif)

이 접근 방식에는 몇 가지 문제가 있어요:

- 제품들은 정말 서버 측 렌더링이 아니에요! Html이 브라우저로 스트리밍되고 데이터가 빠르게 표시될 거예요 — 완전한 수화 이전에, 그래도 만약 페이지에서 자바스크립트를 비활성화하면 로딩 스켈레톤만 보이게 될 거예요. 사용 사례에 따라 문제가 될 수도 있고, 제 경우에는 페이지가 CDN에 의해 캐싱될 것을 알아요, 그럼 로딩 상태 없이 최종 결과물을 캐싱하는 게 어때요? 🤔
- 두 번째 문제는 페이지가 로딩 스켈레톤을 설정 중이라는 거에요, 이것은 웹 사이트의 다른 곳에서도 동일한 종류의 추가 작업을 해야 한다는 것을 의미해요.

위 문제를 해결하기 위해 Suspense를 컴포넌트 트리 아래로 옮기고 조건부로 추가해보겠어요:

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
async function ProductListLoader() {
  const products = await fetchProducts();

  return <ProductList products={products} />;
}

export function ProductListWithSuspense({ products }: { products?: Product[] }) {
  if (products) {
    return <ProductList products={products} />;
  }

  return (
    <Suspense fallback={<ProductListSkeleton />}>
      <ProductListLoader />
    </Suspense>
  );
}
```

우리 페이지는 다음과 같습니다:

```js
export default async function Page() {
  const products = await fetchProducts();
  return <ProductListWithSuspense products={products} />;
}
```

이제 useEffect와 거의 동일한 로직을 가지고 있는 것을 볼 수 있습니다. 페이지에서 데이터를 미리 로드하고 ProductList를 렌더링하고 있지만, 페이지에서 데이터를 미리로드하지 않기로 결정한다면 컴포넌트 자체가 데이터를 로드할 수 있도록 충분히 똑똑합니다. 이 컴포넌트를 어떤 페이지에도 쉽게 삽입할 수 있고, 데이터를 로드하고 로딩 스켈레톤을 렌더링하는 부분을 담당할 것입니다.

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

근데, 하나 더 문제가 있어요. 페이지에 있는 코드는 초기 페이지 로드와 클라이언트 내비게이션 둘 다 실행돼요. 이것은 getServerSideProps와 비교했을 때 큰 차이점이에요. 이 문제가 왜 문제인지 아래에서 확인할 수 있어요:

![loading state](https://miro.medium.com/v2/resize:fit:1400/1*_9TvDE9TRuiy773_S-VXEg.gif)

클라이언트 측 내비게이션에서는 로딩 상태가 없어요 — 링크를 클릭하면 Next.js는 페이지가 렌더링될 때까지 기다렸다가 결과를 보여줘요. 물론 페이지에 로딩 상태를 추가해서 문제를 해결할 수 있겠지만, 처음에 말했듯이 페이지는 로딩 상태를 개별적으로 렌더링하도록 책임져야 하고 페이지 레이아웃을 두 번 구성하고 싶지 않아요.

페이지의 초기 로드와 클라이언트 측 내비게이션을 어떻게 처리해야 하는지 공식 문서를 찾을 수 없어서 시간이 걸렸어요.

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

서버 구성 요소에 대해 읽고 네트워크 트래픽을 검사하면서 클라이언트 측 탐색 중에 Next.js가 JSON 페이로드를 예상하고 서버에 요청을 하는 것을 깨달았어요 🥳

그래서 페이지 코드를 조건부로 데이터 사전로드를 업데이트하면 우리가 원하는 효과를 얻을 수 있어요:

```js
export default async function Page() {
  let products: Product[] | undefined;

  // 브라우저가 html을 요청하면 첫 페이지 로드라는 뜻
  if (headers().get("accept")?.includes("text/html")) {
    products = await fetchProducts();
  }

  return <ProductListWithSuspense products={products} />;
}
```

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*cBschoCbpQzdKFTwA64KvA.gif)

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

그래서, 이제 페이지 라우터와 useEffect와 같은 동작을 얻었어요 💪

# 🤔 결론

사용자에게는 최종 결과가 동일하지만, Suspense와 서버 컴포넌트를 사용한 새로운 접근 방식에는 몇 가지 추가 이점이 있어요.

첫 번째 이점은 개발자에게 있어요. 이제 코드가 훨씬 간단하고 읽기 쉬워졌고 이해하기 쉽답니다.

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

두 번째 이점은 페이지 성능에 대한 것입니다. ProductList 컴포넌트에 클라이언트 측 상호 작용이 없기 때문에 서버 컴포넌트로 사용될 수 있습니다. 클라이언트 측으로 컴포넌트 코드를 전달할 필요가 없으며, 서버 측에서만 렌더링되기 때문에 성능이 좋아집니다! 현실 세계에서는 제품 케로셀에서 이러한 경우가 아닐 수 있지만, 앱마다 클라이언트 측 상호 작용 없이 정적으로 렌더링할 수 있는 컴포넌트가 있습니다. 특히 서버 컴포넌트와 서버 액션을 함께 사용하면 엔드 유저에 전달되는 코드 양을 줄일 수 있습니다.

서버 컴포넌트에 대해 더 자세히 알아보려면 여기를 클릭하세요. Suspense를 사용한 로딩에 대해 알아보려면 여기를 클릭하세요.

예제 코드는 여기에서 확인할 수 있습니다.

이 사용 사례를 다른 방식으로 구현할 수 있는 제안이 있으면 아래에 댓글을 남겨주세요 👇.

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

👋
