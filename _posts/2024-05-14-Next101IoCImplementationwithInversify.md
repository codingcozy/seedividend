---
title: "다음 시리즈 101 Inversify를 활용한 IoC 구현"
description: ""
coverImage: "/assets/img/2024-05-14-Next101IoCImplementationwithInversify_0.png"
date: 2024-05-14 10:26
ogImage: 
  url: /assets/img/2024-05-14-Next101IoCImplementationwithInversify_0.png
tag: Tech
originalTitle: "Next 101: IoC Implementation with Inversify"
link: "https://medium.com/@ezralazuardy/next-101-ioc-implementation-with-inversify-29ce548aad3b"
---


Typescript IoC를 Next 14에 Inversify와 함께 올바르게 구현하는 방법을 배우세요.

![image](/assets/img/2024-05-14-Next101IoCImplementationwithInversify_0.png)

IoC(Inversion of Control)는 객체의 동작 제어가 뒤바뀌거나 객체 외부로 이동되는 디자인 패턴입니다. 이는 소프트웨어 응용 프로그램 내 객체의 흐름을 관리하는 데 도움이 됩니다.

제어가 역전되고 컨테이너가 의존성을 관리하는 책임을 맡아 모듈성, 유연성 및 테스트 용이성을 높이게 됩니다.



아래는 [공식 줄임말(Markdown)](https://www.markdownguide.org/cheat-sheet/) 형식으로 업데이트한 내용입니다.


![이미지](/assets/img/2024-05-14-Next101IoCImplementationwithInversify_1.png)

의존성 주입에 익숙하다면, IoC 디자인을 구현하는 기술 중 하나입니다.

이 패턴은 단순히 "너가 객체를 만들지 마세요. 제가 그것을 제공할게요."라고 말합니다.

![이미지](/assets/img/2024-05-14-Next101IoCImplementationwithInversify_2.png)




## 그렇지만 왜?

디자인 패턴? 또 다시요? 진짜로, 이걸로 충분히 지쳤어요 🤣. 처음에 IoC나 의존성 주입이 Next 프레임워크와 진짜 유용하다고 생각하지 않았어요. 보통 사람들도 사용하지 않잖아요, ㅎㅎ.

하지만, 제게 호기심을 자극하는 흥미로운 점이 있어요. 만약 Next에서 Repository 패턴을 사용한다면 어떨까요? Next는 자바스크립트나 타입스크립트로 작성됐다는 걸 알고 있어요. 이는 OOP보다 함수형 접근 방식을 기본으로 사용한다는 데 특별히 신경쓰지 않아도 되겠죠.

저는 보통 백엔드에 더 많이 관심이 있는데, 주로 Rust나 PHP와 같은 OOP 언어로 대화를 나눠요. 제가 매일 사용하는 프레임워크는 Laravel이에요. 물론, 개발한 모든 프로젝트에 Repository 및 Service 패턴을 항상 구현해요.



저장소(repository)는 데이터가 저장되는 곳입니다. 서비스(service)는 데이터를 조작합니다. 간단하죠? 이러한 패턴을 사용하면 API를 통해 데이터를 관리해야 하는 경우나 프로젝트에서 데이터베이스에 직접적으로 접근해야 하는 경우에 견고하고 유지보수하기 쉬운 코드베이스를 개발하는 데 도움이 될 것입니다.

아래의 기사에서 더 많은 정보를 찾아볼 수 있습니다. 관심이 생긴다면 읽어보세요.

## Inversify

Next 프레임워크에서 IoC를 구현하기 위해 InversifyJS를 사용할 예정입니다.



이것은 TypeScript로 구동되는 JavaScript 및 Node.js 앱을 위한 강력하고 가벼운 제어 반전 컨테이너입니다. 사용하기 쉬운 친절한 API 세트를 갖추고 있어서 최상의 OOP 및 IoC 모범 사례 사용을 촉진할 수 있습니다.

다른 IoC 및 DI 라이브러리 중에서, 제품 환경에서 사용할 수 있는 안정성을 고려하여 이것을 사용하는 것을 선호합니다. 그리고 가벼운 크기인 4 KB만큼만 차지한다는 점도 좋은데요.

Inversify는 다음과 같은 모던 JavaScript 엔진을 필요로 합니다:

- Reflect metadata
- Map
- Promise (공급자 주입 사용 시에만 필요)
- Proxy (활성화 핸들러 사용 시에만 필요)



## 시작해봅시다

일반적으로 Typescript와 App 기반 Router를 사용하여 새 Next 프로젝트를 만든 후에는 프로젝트 디렉토리 구조가 아래와 같이 나타날 것입니다.

```js
project
|
+-- app                  -> 애플리케이션 디렉토리
|
+-- components           -> UI 컴포넌트 디렉토리
|
+-- public               -> 공용 에셋 디렉토리
|
+-- package.json
|
+-- tsconfig.json
|
+-- next-env.d.ts
|
+-- next.config.mjs
```

다음 명령어를 사용하여 필요한 종속성을 설치해주세요.



```js
npm install inversify reflect-metadata --save
```

Inversify는 TypeScript에서 IoC를 구현하는 데 필요하며, reflect-metadata는 Typescript 파일에서 데코레이터 및 데코레이터 메타데이터를 사용하는 데 필요합니다.

이러한 유형의 정의는 inversify npm 패키지에 포함되어 있습니다. tsconfig.json 파일에 experimentalDecorators, emitDecoratorMetadata, types 및 lib와 같은 몇 가지 컴파일 옵션이 필요합니다. 

```js
{
    "compilerOptions": {
        "target": "es5",
        "lib": ["es6", "dom"],
        "types": ["reflect-metadata"],
        "module": "commonjs",
        "moduleResolution": "node",
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}
```



시작하려면 Inversify의 컨테이너 및 reflect-metadata에 필요한 파일을 만들어보세요.

```js
// @/lib/di/container.ts

import "reflect-metadata";
import { Container } from "inversify";

const container = new Container();

export default container;
```

```js
// @/lib/di/reflect-metadata.ts

"use client";                           // -> 클라이언트-컴포넌트로 표시

import "reflect-metadata";
```

다음으로 각 페이지 또는 구성 요소에 대해 기본적으로 SSR(서버 사이드 렌더링)를 사용하지만 reflect-metadata 라이브러리가 클라이언트 측에서 가져와지지 않으면 이상한 오류가 발생할 수 있어요. 그래서 reflect-metadata.ts를 루트 레이아웃 파일에 가져와야 해요.



```js
// @/app/layout.tsx

import "@/lib/di/reflect-metadata";    // -> reflect-metadata를 import합니다

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  ...
}
```

이제 프로젝트 디렉토리 구조는 다음과 같을 것입니다.

```js
project
|
+-- app                            -> 애플리케이션 디렉토리
|
+-- components                     -> UI 컴포넌트 디렉토리
|
+-- public                         -> 퍼블릭 에셋 디렉토리
|
+-- lib                            -> 라이브러리 디렉토리
|  |
|  +-- di                          -> 의존성 주입 디렉토리
|     |
|     +-- container.ts             -> 컨테이너
|     |
|     +-- reflect-metadata.ts      -> reflect-metadata 클라이언트 컴포넌트
|
+-- package.json
|
+-- tsconfig.json
|
+-- next-env.d.ts
|
+-- next.config.mjs
```

그리고 이제 Inversify가 제대로 작동하고 사용할 준비가 되었습니다.




## 모델

이라고 불리는 모델은 당신이 코드에서 사용하는 데이터에 대한 엄격한 타입 정의입니다. "모델" 이라는 이름을 사용하는 이유는 이에 더 익숙하기 때문입니다. 이것을 "타입" 이라고 부르고 프로젝트 루트에 types 라는 디렉토리를 생성할 수도 있습니다.

예를 들어, 내 애플리케이션에서 제품으로 사용될 데이터에 대한 Product 모델을 생성할 것입니다.

```js
// @/models/product.ts

type Product = {
  id: string;
  image_url: string;
  image_blur_data_url: string | undefined;
  name: string;
  price: number;
  unit: string;
  short_description: string;
  description: string;
  statement_description: string;
  marketing_feature: string;
};

export default Product;
```



## 저장소

저장소 클래스는 데이터 저장소(창고)로 사용되어 다른 코드가 이 클래스를 통해 필요한 데이터에 액세스할 수 있도록 합니다. 저장소는 앱에서 단일 진실의 원천입니다.

예를 들어, ProductRepository라는 클래스를 만들어 보겠습니다. 아래 예시는 이전에 생성된 Product 모델의 엄격한 유형을 사용합니다.

```js
// @/repositories/product-repository.ts

import "reflect-metadata";
import { injectable } from "inversify";
import type Product from "@/models/product";

// 더미 제품 데이터 목록
const products = [ ... ];

@injectable()
export default class ProductRepository {
  async getProducts(): Promise<Array<Product>> {
    return products.map((product: any) => product as Product);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const product = products.find((product: any) => product.id === id);

    if (product) {
      return product as Product;
    }

    return undefined;
  }
}
```



위 코드는 더미 데이터 목록에서 데이터를 얻는 시뮬레이션입니다.

`@injectable` 데코레이터를 사용해야만 Inversify가 해당 클래스를 다른 인스턴스에 삽입할 수 있다는 것을 인지합니다.

비동기로 코드를 실행해야 하는 경우 `async`가 일반적으로 필요합니다. 왜냐하면 완료되기까지 시간이 걸리기 때문입니다. 데이터베이스나 외부 API와 상호 작용해야 하는 경우에 이를 사용할 수 있습니다.

## 서비스



레포지토리 클래스를 통해 데이터를 조작하는 서비스 클래스입니다. 필요한 경우 서비스 클래스에서 여러 레포지토리를 사용할 수 있습니다.

이 곳에서 Inversify를 사용한 의존성 주입이 도움이 됩니다. @inject 데코레이터를 통해 서비스 클래스에 필요한 레포지토리를 자동으로 주입할 수 있습니다.

예를 들어, ProductService 클래스를 만들어 보겠습니다. 아래 예시는 이전에 생성된 ProductRepository와 Product 모델의 엄격한 유형을 사용합니다.

```js
// @/services/product-service.ts

import "reflect-metadata";
import { inject, injectable } from "inversify";
import ProductRepository from "@/repositories/product-repository";
import type Product from "@/models/product";

@injectable()
export default class ProductService {
  @inject(ProductRepository)
  private productRepository: ProductRepository;

  async getProducts(query: string): Promise<Array<Product>> {
    let products = await this.productRepository.getProducts();

    if (query !== "") {
      return products.filter((product: Product) =>
        product.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return products;
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const product = await this.productRepository.getProduct(id);

    if (product) {
      return product as Product;
    }

    return undefined;
  }
}
```



당신의 요구에 따라, 이 서비스 클래스를 사용하여 데이터를 관리하는 데 도움이 되는 추가적인 메서드를 추가할 수 있습니다.

@Injectable 데코레이터를 사용해야만 Inversify가 해당 클래스를 다른 인스턴스에 주입할 수 있다는 것을 알 수 있습니다.

@Inject 데코레이터를 사용해야만 Inversify에 해당 클래스의 필수 인스턴스를 주입하도록 알릴 수 있으므로 이 인스턴스를 사용하여 리포지토리의 메서드에 액세스할 수 있습니다.

## 컨테이너



이제 올바르게 작동하는 IoC를 위해 수행해야 할 마지막 단계입니다.

모델(타입), 리포지토리, 서비스 클래스를 생성한 후, 이러한 클래스를 IoC 컨테이너에 등록해야 합니다. 클래스가 컨테이너에 등록되면 앱의 런타임 중에 필요한 인스턴스에 주입될 수 있습니다.

컨테이너는 항상 앱의 런타임에 이용 가능할 것입니다.

```js
// @/lib/di/container.ts

import "reflect-metadata";
import { Container } from "inversify";
import ProductRepository from "@/repositories/product-repository";
import ProductService from "@/services/product-service";
import UserService from "@/services/user-service";

const container = new Container();

container.bind(ProductRepository).to(ProductRepository).inSingletonScope();

container.bind(ProductService).to(ProductService).inSingletonScope();

export default container;
```



클래스 인스턴스에 대한 scope를 지정할 수도 있어요.

- inTransientScope: 매 의존성 요청마다 새로운 인스턴스를 보장하여 가벼우면서도 일회용 의존성을 유지합니다. 이것이 기본 스코프에요.
- inSingletonScope: 의존성에 대한 중앙 접근점을 생성하여 모든 곳에서 동일한 인스턴스를 사용하며 효율성과 상태 관리를 촉진합니다.
- inRequestScope: 단일 해결 프로세스 내에서 중복된 객체 생성을 피해 성능 최적화를 제공하지만 HTTP 요청 당 단일 인스턴스를 보장하지는 않아요.

## The Hook

이 단계는 선택 사항으로, 앱의 다른 구성 요소에서 컨테이너에 액세스하는 데 도움을 줍니다.



```js
// @/lib/di/hook.ts

import container from "@/lib/di/container";
import ProductRepository from "@/repositories/product-repository";
import ProductService from "@/services/product-service";
import UserService from "@/services/user-service";

export function getProductRepository(): ProductRepository {
  return container.get(ProductRepository);
}

export function getProductService(): ProductService {
  return container.get(ProductService);
}
```

마침내, 이제 프로젝트 디렉토리 구조는 다음과 같이 보일 것입니다.

```js
project
|
+-- app                            -> 애플리케이션 디렉토리
|
+-- components                     -> UI 컴포넌트 디렉토리
|
+-- public                         -> 공용 에셋 디렉토리
|
+-- lib                            -> 라이브러리 디렉토리
|  |
|  +-- di                          -> 의존성 주입 디렉토리
|     |
|     +-- container.ts             -> 컨테이너
|     |
|     +-- hook.ts                  -> 컨테이너 후크
|     |
|     +-- reflect-metadata.ts      -> reflect-metadata 클라이언트 컴포넌트
|
+-- models                         -> 모델 디렉토리
|  |
|  +-- product.ts                  -> 제품 모델
|
+-- repositories                   -> 리포지토리 디렉토리
|  |
|  +-- product-repository.ts       -> 제품 리포지토리
|
+-- services                       -> 서비스 디렉토리
|  |
|  +-- product-service.ts          -> 제품 서비스
|
+-- package.json
|
+-- tsconfig.json
|
+-- next-env.d.ts
|
+-- next.config.mjs
```

## 앱에서 사용하기



컨테이너를 사용하여 인스턴스를 가져오는 것은 정말 쉽습니다.

예를 들어, 제품 데이터 목록을 표시해야 하는 페이지가 있습니다.

```js
// @/app/page.tsx

import { getProductService } from "@/lib/di/hook";
import { Suspense } from "react";
import ProductList from "@/components/product-list";
import ProductListSkeleton from "@/components/product-list-skeleton";

type Props = {
  searchParams?: {
    search?: string;
    page?: string;
  };
};

export default async function Page({ searchParams }: Props) {
  // 쿼리 매개변수 가져오기
  const query = searchParams?.search || "";
  const currentPage = Number(searchParams?.page) || 1;

  // 제품 항목 가져오기
  const items = await getProductService().getProducts(query);

  return (
    <Suspense key={query + currentPage} fallback={<ProductListSkeleton />}>
      <ProductList items={items} />
    </Suspense>
  );
}
```

정말 쉽죠? 이제 코드가 더 깔끔해 보입니다. 데이터 액세스가 IoC에 의해 중앙 집중화되고 관리되기 때문에 🎉.



## 결론

<img src="/assets/img/2024-05-14-Next101IoCImplementationwithInversify_3.png" />

의존성 주입과 함께 역제어(IoC)를 사용하면 코드베이스를 더 깨끗하고 견고하며 유지보수하기 좋게 만들 수 있습니다.

코드베이스 전체에 중복되는 나쁜 냄새나는 코드를 제거할 수도 있어요. 끔찍해! 🤮



만약 Next 앱에서 Server Action을 더 선호한다면 IoC도 함께 사용할 수 있어요. 간단해요, 한 번 배우면 어디서든 사용할 수 있어요.

Next와 함께 Repository Pattern을 구현하는 기술과 지식을 향상시키기 위해 이 두 글을 읽어보길 권장해요.

## 🚀 샘플 프로젝트

Inversify를 IoC로 사용하여 개발한 데모 프로젝트를 실행해볼 수 있어요. 이 프로젝트는 MIT 라이센스로 라이선스가 부여되어 있어요.