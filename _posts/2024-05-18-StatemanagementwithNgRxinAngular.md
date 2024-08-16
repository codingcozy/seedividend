---
title: "앵귤러에서 NgRx를 활용한 상태 관리하는 방법"
description: ""
coverImage: "/assets/img/2024-05-18-StatemanagementwithNgRxinAngular_0.png"
date: 2024-05-18 21:49
ogImage: 
  url: /assets/img/2024-05-18-StatemanagementwithNgRxinAngular_0.png
tag: Tech
originalTitle: "State management with NgRx in Angular"
link: "https://medium.com/@igorm573/state-management-with-ngrx-in-angular-66ddc61cdf14"
isUpdated: true
---





![스크린샷](/assets/img/2024-05-18-StatemanagementwithNgRxinAngular_0.png)

현대의 프론트엔드 애플리케이션은 주로 컴포넌트 개념을 사용합니다. 이는 사용자 인터페이스의 독립적이고 재사용 가능하며 자체적인 부분을 나타냅니다. Angular, React, Vue.js와 같은 인기 있는 프론트엔드 라이브러리들에서 이 개념은 중요합니다. 다수의 컴포넌트가 동일한 데이터를 필요로 할 때 간편함과 여러 이점을 제공하지만 문제도 발생할 수 있습니다. 이 문제를 해결하기 위해 Redux 패턴이라는 개념이 있습니다. Redux 라이브러리는 처음에 React 생태계에서 인기를 얻었지만 Angular나 Vue.js와 같은 다른 프레임워크에서도 사용할 수 있습니다. 이 글에서는 NgRx 라이브러리를 사용한 상태 관리에 집중하겠습니다. Angular에서는 Redux를 사용할 수 있지만, Angular에 특별히 제작된 인기 있는 상태 관리 라이브러리인 NgRx를 사용하는 애플리케이션을 자주 볼 수 있습니다.

## NgRx란?

소개에서 언급한 대로, NgRx는 Redux에 영감을 받은 상태 관리를 위한 라이브러리입니다. Angular용 Redux 원칙을 구현하여 애플리케이션 상태를 예측 가능하고 구조적인 방식으로 관리합니다. NgRx는 액션, 리듀서, 이펙트, 셀렉터와 같은 개념을 사용하여 상태를 조작하는데 있어 가시적인 방식을 제공합니다.


<div class="content-ad"></div>

<img src="/assets/img/2024-05-18-StatemanagementwithNgRxinAngular_1.png" />

## 저장소

"저장소"는 불변 데이터 구조로 구현된 상태 관리자의 일부입니다. 다시 말하면, 그 안에 포함된 데이터는 직접 변경할 수 없습니다. 따라서 모든 상태 변경은 작업을 통해 이루어져야 합니다. 이러한 작업은 '리듀서'라고 불리는 메커니즘을 통해 상태에서 변경될 내용을 정의합니다. 이 함수는 상태와의 통신을 처리합니다.

## 리듀서

<div class="content-ad"></div>

리듀서의 책임은 스토어의 상태를 변경할 필요가 있는 모든 작업을 처리하는 것입니다. 현재 상태와 액션을 입력으로 받아 변경 후의 새로운 상태를 반환합니다.

## 액션

"액션"은 단순히 상태 변경을 나타내는 객체들입니다. 상태를 변경할 정보를 포함한 액션은 스토어로 전송됩니다.

## 셀렉터

<div class="content-ad"></div>

"selectors"는 저장된 상태의 특정 정보에 액세스하고 가져 오는 데 사용되는 기능입니다. 따라서 구성 요소가 상점의 완전한 상태를 직접 가져 오는 대신 필요한 데이터만 요청 할 수 있습니다. 이렇게하면 코드가 더 모듈식이고 재사용 가능하며 유지 보수가 쉬워집니다. 또한, 요청 한 구성 요소에 제공되기 전에 상태에서 calc 및 변환을 수행 할 수도 있습니다.

## 효과

"효과"는 비동기 작업이나 부작용, 즉 네트워크 요청, 데이터베이스 액세스, 외부 API 호출 또는 순수 동기가 아닌 작업과 같은 기능을 나타냅니다. 그러나이 기능을이 기사에서는 사용하지 않습니다. 곧이 주제에 특별히 전념 한 기사를 쓰는 것을 선호합니다.

# 실제로 사용하는 NgRx

<div class="content-ad"></div>

내 저장소에 있는 애플리케이션은 GitHub의 igormarti/angular-ngrx-shopping(https://github.com/) 링크에서 확인할 수 있어요. 클론하려면 확인해보세요. 하지만 이 개념을 처음부터 적용할 수도 있어요. 내 애플리케이션에서는 제품을 즐겨찾기에 추가하는 상태 관리자를 사용할 거에요. 우리 애플리케이션에는 스토어에서 즐겨찾기한 제품들을 요청할 몇 가지 구성 요소가 있을 거예요. 이후 단계에서 자세한 내용을 볼 수 있을 거에요. 코드 구현에 대해 한 가지 팁: 이 프로젝트의 코드 구현은 Angular 버전 16과 NgRx 버전 7.8.0을 사용해 만들어졌어요.

# Angular에서 NgRx 설치

프로젝트에서 NgRx를 설치하려면 루트 폴더에서 다음 명령을 실행하세요:

```js
npm install @ngrx/store --save
```

<div class="content-ad"></div>

# 프로젝트에서 NgRx 구조화하기

NgRx를 프로젝트에 설치한 후에는, 이제 구조를 만들어야 하는 때입니다. 다음 단계에서는 액션, 리듀서, 셀렉터 및 초기 상태를 만들 것입니다.

먼저, 애플리케이션의 앱 폴더 내에서 "states"라는 폴더를 만들 것입니다. 이 폴더 안에 "favorite-product"라는 폴더를 만든 후, 그 안에 "action", "reducer", "selector"라는 세 개의 폴더를 만들 것입니다. 구조는 다음과 같습니다:

```js
app ->
  states ->
      favorite-product ->
                    action
                    reducer
                    selector
```

<div class="content-ad"></div>

이제 "favorite-product" 폴더 안에 "app.state.ts" 파일을 생성할 것입니다. 이 파일은 초기 상태의 모델이 될 것입니다:

```js
import { FavoriteProduct } from "src/app/models/favorite-product.model";

export interface AppState {
    products: FavoriteProduct[];
}
```

우리의 "AppState" 인터페이스 안에 "products"라는 속성이 있음을 주목해주세요. 이는 초기 상태의 유형을 나타내는 배열 "FavoriteProduct"입니다. 따라서 우리는 이 인터페이스를 프로젝트에 만들어야 합니다. 저는 내 애플리케이션에서 "src/app/models/favorite-product.model" 경로에 만들었습니다. 그러나 원하는 곳에 넣으셔도 됩니다. 중요한 점은 "app.state.ts" 파일에서 올바르게 가져오는 것입니다.

```js
export interface FavoriteProduct {
    id: number;
    name: string;
    price: number;
    image: string;
    isFavorite?: boolean;
}
```

<div class="content-ad"></div>

## 작업 생성하기

이 단계에서는 "src\app\states\favorite-product\action" 폴더 안에 작업을 만들 것입니다. 우리의 파일은 "app.action.ts"로 명명될 것입니다. 이 파일에는 데이터 상태를 변경하는 모든 작업을 나타내는 함수들이 포함될 것입니다. 다음의 코드를 참조해주세요:

```js
import { createAction, props } from '@ngrx/store';
import { FavoriteProduct } from "src/app/models/favorite-product.model";

export const add = createAction('[FavoriteProduct] Add',  props<{ product: FavoriteProduct }>());
export const remove = createAction('[FavoriteProduct] Remove', props<{ product: FavoriteProduct }>());
export const updateAllState = createAction('[FavoriteProduct] Update all state of favorites products', 
 props<{ products: FavoriteProduct[] }>());
export const clear = createAction('[FavoriteProduct] Clear');
```

위 코드에서는 "@ngrx/store" 모듈의 "createAction" 함수가 작업 설명을 첫 번째 매개변수로서, 처리할 데이터를 두 번째 매개변수로 가지는 것을 알 수 있습니다. 우리의 "favorite-product" 상태에는 다음과 같은 작업들이 있을 것입니다: add, remove, updateAllState, clear.

<div class="content-ad"></div>

## 리듀서 생성하기

우리는 "src\app\states\favorite-product\reducer" 폴더에 "app.reducer.ts" 파일을 만들어야 합니다. 이 파일에서는 즐겨찾는 제품 목록의 초기 상태를 초기화하고 각 작업에 대한 비즈니스 로직을 구현한 다음 상태를 업데이트하기 전에 상태를 변경합니다. 자세한 내용은 다음 코드를 참조해주세요:

```js
import { createReducer, on } from '@ngrx/store';
import { add, remove, clear, updateAllState } from '../action/app.action';
import { AppState } from '../app.state';

export const initialState: AppState = {
  products:[],
};

export const favoriteReducer = createReducer(
  initialState,
  on(add, (state, {product}) => (
    {
      ...state,
      products: [...state.products, product]
    }
  )
  ),
  on(remove, (state, {product}) => ({
    ...state,
    products: state.products.filter((p)=> product.id != p.id)
  })),
  on(updateAllState, (state, {products}) => (
    {
      ...state,
      products
    }
  )
  ),
  on(clear, state => initialState)
);
```

먼저 초기 상태가 빈 즐겨찾는 제품 배열로 초기화되는 것을 알아봅니다. 그다음, "@ngrx/store" 모듈에서 "createReducer" 함수가 초기 상태와 여러 "on" 함수를 받아 작업을 상태 변경과 연결하고 있음을 확인해주세요.

<div class="content-ad"></div>

- "add" 액션은 현재 상태에 새 제품을 추가합니다.
- 마찬가지로, "remove" 액션은 현재 상태에서 특정 제품을 제거합니다.
- "updateAllState" 액션은 매개변수로 받은 제품 목록으로 상태를 업데이트합니다.
- 마지막으로 중요하지만 더욱 중요한 것은, "clear" 액션은 초기 상태로 설정하여 상태를 재설정하며, 저장소에서 모든 즐겨찾는 제품을 모두 지우게 됩니다.

## 셀렉터 생성하기

이제 저장소에서 데이터를 검색하려면 셀렉터를 생성해야 합니다. 이를 위해 'src\app\states\favorite-product\selector' 폴더에 'app.selector.ts' 파일을 만들어야 합니다. 자세한 내용은 다음 코드를 참조해주십시오:

```js
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { FavoriteProduct } from "src/app/models/favorite-product.model";

// 애플리케이션 내에서 즐겨찾는 제품의 전체 상태를 가져옵니다.
export const selectAppState = createFeatureSelector<AppState>('favorite');

// 모든 즐겨찾는 제품 가져오기
export const selectProducts = createSelector(
  selectAppState,
  (state: AppState) => state.products
);

// ID로 하나의 즐겨찾는 제품 가져오기
export const selectProductById = createSelector(
  selectProducts,
  (products: FavoriteProduct[], props: { productId: number }) =>
    products.find(product => product.id === props.productId)
);
```

<div class="content-ad"></div>

첫 번째 함수에서는 'favorite' 스토리지에서 전체 상태를 얻고 있습니다. 두 번째 함수에서는 이 완전한 상태를 사용하여 즐겨찾는 상품만 검색합니다. 마지막 함수는 즐겨찾는 상품의 상태를 활용하여 해당 ID의 특정 상품을 가져옵니다. 우리는 이러한 모든 함수를 애플리케이션에서 필요한 데이터를 검색하는 데 사용할 수 있습니다.

우리의 폴더 구조는 다음과 같이 구성되어 있습니다:

![폴더 구조](/assets/img/2024-05-18-StatemanagementwithNgRxinAngular_2.png)

상태 관리를 사용하기 전에 StoreModule을 모듈에 가져와 reducer를 포함해야 합니다.

<div class="content-ad"></div>

```js
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { favoriteReducer } from './states/favorite-product/reducer/app.reducer';

@NgModule({
  declarations: [

  ],
  imports: [
    StoreModule.forRoot({favorite:favoriteReducer})...
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## 액션 사용하기

상태에서 액션을 사용하려면 먼저 "@ngrx/store" 모듈에서 "Store"를 가져와서 생성자에 포함해야 합니다. 다음은 예시입니다:

```js
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home-product',
  templateUrl: './home-product.component.html',
  styleUrls: ['./home-product.component.scss']
})
export class HomeProductComponent{

constructor(private readonly storageService:StorageService<FavoriteProduct[]>){}

}
```

<div class="content-ad"></div>

'store'을 import한 후에는 이제 액션을 사용할 수 있습니다. 우리 애플리케이션에서는 특정 제품의 하트 아이콘을 클릭할 때마다 해당 제품을 즐겨찾기에 추가합니다. 아래 이미지에서 'Notebook' 제품이 즐겨찾기 목록에 추가되었음을 보실 수 있습니다. 또한, 오른쪽 상단에 있는 하트 아이콘에 주목해주세요. 이 아이콘은 즐겨찾기에 추가된 항목 수를 나타내는데, 이 경우에는 '1'이 표시됩니다.

![image](/assets/img/2024-05-18-StatemanagementwithNgRxinAngular_3.png)

따라서 즐겨찾기 아이콘을 클릭할 때마다 'dispatch' 함수가 트리거되며, 원하는 액션을 매개변수로 전달합니다. 이 경우에는 액션이 'add'가 됩니다. 아래 코드를 확인해주세요:

```js
<mat-icon [style.color]="product.isFavorite?'red':'black'" class="mat-icon-lg icon" 
(click)="addProductToFavorites(product)" >favorite</mat-icon>
```

<div class="content-ad"></div>

```js
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home-product',
  templateUrl: './home-product.component.html',
  styleUrls: ['./home-product.component.scss']
})
export class HomeProductComponent {

  constructor(private readonly storageService:StorageService<FavoriteProduct[]>) {}

  addProductToFavorites(product: FavoriteProduct) {
    const favoriteProduct: FavoriteProduct = {
      ...product,
      isFavorite: true
    }
    this.store.dispatch(add({ product }));
  }

}
```

그래서, 'dispatch' 함수를 트리거할 때마다 클릭한 제품이 '리듀서'로 전송되는데, 이는 데이터를 처리하고 상태에 저장하기 전에 책임이 있습니다.

## 셀렉터 사용하기

셀렉터를 사용하기 위해서는 '@ngrx/store' 모듈에서 'Store'를 가져와야 합니다. 그러나 셀렉터를 사용하여 데이터를 검색하는 데 사용되는 함수는 'pipe'입니다. 다음 코드에서 자세한 내용을 확인하세요:

<div class="content-ad"></div>

```js
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FavoriteProduct } from 'src/app/models/favorite-product.model';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/states/favorite-product/app.state';
import { selectProducts } from 'src/app/states/favorite-product/selector/app.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  favoritesProducts: Observable<Array<FavoriteProduct>> = this.store.pipe(select(selectProducts))

  constructor(private router: Router, private store: Store<AppState>) { }

}
```

'pipe' 안에 있는 코드를 볼 때 'select' 함수를 사용하고 있습니다. 이 함수는 '@ngrx/store' 모듈에서 가져온 것으로, 셀렉터를 파라미터로 받습니다. 현재 셀렉터는 'selectProducts'이며 'FavoriteProduct' 배열의 'Observable'을 반환합니다. 이 목록은 속성에 저장되어 템플릿에서 사용되어 즐겨찾기 제품의 수량을 표시합니다. 아래 템플릿 코드에서 더 자세한 내용을 확인할 수 있습니다:

```js
<mat-icon [style.color]="'red'" 
matBadge="{(favoritesProducts | async)?.length}" 
matBadgePosition="above after">favorite</mat-icon>
```

템플릿에서 'async' 파이프를 사용해 TypeScript에서 옵저버블로 받은 데이터를 처리합니다. 그리고 'length' 속성을 이용하여 목록에 있는 항목 수를 얻습니다. 더 자세한 코드는 제 GitHub 리포지토리에서 확인할 수 있습니다. 아래 링크에 접속해주세요: igormarti/angular-ngrx-shopping (github.com)

<div class="content-ad"></div>

# 결론

Angular 애플리케이션에서 상태 관리는 매우 중요한 요소입니다. 특히 특정 상태가 복잡해지는 경우가 많습니다. Angular의 인기 있는 상태 관리 라이브러리인 NgRx는 애플리케이션 상태를 중앙에서 예측 가능하게 효율적으로 관리할 수 있는 견고하고 확장 가능한 솔루션을 제공합니다. 액션, 리듀서, 셀렉터 등의 개념을 활용해 NgRx를 사용하면 개발자들이 상태 변경을 효율적으로 처리하고 관심사를 명확히 분리할 수 있습니다. NgRx를 사용하면 유지보수성이 높고 테스트 가능하며 확장 가능한 Angular 애플리케이션을 만들 수 있어서 복잡한 상태 관련 도전 과제를 관리하는 강력한 도구로 작용할 수 있습니다.