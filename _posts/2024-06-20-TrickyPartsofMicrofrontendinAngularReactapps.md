---
title: "앵귤러와 리액트 앱에서의 마이크로프론트엔드의 까다로운 부분들"
description: ""
coverImage: "/assets/img/2024-06-20-TrickyPartsofMicrofrontendinAngularReactapps_0.png"
date: 2024-06-20 05:33
ogImage: 
  url: /assets/img/2024-06-20-TrickyPartsofMicrofrontendinAngularReactapps_0.png
tag: Tech
originalTitle: "Tricky Parts of Microfrontend in Angular   React apps"
link: "https://medium.com/@kenjj/tricky-parts-of-microfrontend-in-angular-react-apps-3940641b48f3"
---


<img src="/assets/img/2024-06-20-TrickyPartsofMicrofrontendinAngularReactapps_0.png" />

이 게시물은 Angular/React 기업 애플리케이션의 마이크로프론트엔드에 대해 깊이 파고들기 위한 연재물 중 첫 번째입니다. 이번에는 Angular에서 셸 앱에 동적 원격 컴포넌트를로드하는 방법에 대해 이야기하겠습니다.

웹 개발의 급속한 변화 속에서 모듈식이고 확장 가능한 아키텍처에 대한 수요는 마이크로프론트 엔드의 등장으로 이어졌습니다. 이 설계 접근 방식은 복잡한 웹 애플리케이션을 구축하고 관리하는 방식을 혁신하겠다는 약속을 합니다. 개발 프로세스를 간소화하는 잠재력과 성장하는 중요성에도 불구하고, 이 주제에 대한 포괄적인 자료 및 상세한 토론에는 뚜렷한 공백이 남아 있습니다.

# 정신적 모델:

<div class="content-ad"></div>

- 원격: 원격은 별도로 구축되고 배포되는 애플리케이션입니다. 다른 애플리케이션에서 로드할 수있는 ESM을 노출 할 수 있습니다.
- 쉘: 쉘은 필요할 때 원격을 로드합니다. 프레임워크 관점에서 이 기능은 전통적인 지연 로딩과 비슷합니다. 큰 차이점은 컴파일 시간에 쉘이 원격을 모르는 것입니다.

# 원격 앱

독립 구성 요소를 노출합니다. 예를 들어 간단한 프로필 구성 요소를 만들고 federation.config.js로 구성을 업데이트합니다.

```js
const {
 withNativeFederation,
 shareAll,
} = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
 name: 'profile',
 exposes: {
  './MyProfileComponent': './src/app/myprofile/myprofile.component.ts',
 },
 shared: {
  ...shareAll({
   singleton: true,
   strictVersion: true,
   requiredVersion: 'auto',
  }),
 },
});
```

<div class="content-ad"></div>

# 쉘

```js
{
    "profile": "http://profile-app.com/remoteEntry.json",
}
```

자, 우리는 독립형 컴포넌트를 만들어보자. 이름은 federated component로 하자!

```js
<ng-template #federatedComponent></ng-template>
```

<div class="content-ad"></div>

```js
import { loadRemoteModule } from '@angular-architects/native-federation';
import { Component, OnInit, ViewContainerRef, Input, ViewChild } from '@angular/core';

@Component({
    selector: 'app-federated-component',
    templateUrl: './federated.component.html',
    standalone: true,
})
export class FederatedComponent implements OnInit {
    @ViewChild('federatedComponent', { read: ViewContainerRef })
    private federatedComponent: ViewContainerRef;

    @Input() entryName: string = '';
    @Input() module: string = '';
    @Input() componentName: string = '';
    @Input() additionalProps: Map<string, unknown> = new Map();

    ngOnInit(): void {
        loadRemoteModule(this.entryName, this.module).then((federated) => {
            if (this.federatedComponent) {
                const comp = this.federatedComponent.createComponent(federated[this.componentName]);

                if (this.additionalProps.size > 0) {
                    this.additionalProps.forEach((value, key) => {
                        comp.setInput(key, value);
                    });
                }
            }
        });
    }
}
```

Create an enum for exposed remotes where we can map remote apps

```js
export const FederatedModuleMap = {
    profile: {
        name: 'profile',
        modules: {
            myprofile: {
                name: './MyProfileComponent',
                componentName: 'MyProfileComponent',
            },
        },
    },
};
```

Now let`s create the component that will load a remote application from our dynamic component, which we created — `app.federated.component /

<div class="content-ad"></div>

```js
<app-federated-component
        [additionalProps]="props()"
        [entryName]="exposedName()"
        [module]="exposedModule()"
        [componentName]="exposedComponent()"></ram-federated-component> 
```

```js
import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FederatedModuleMap } from '@enums';

@Component({
    selector: 'app-my-profile',
    templateUrl: './my-profile.component.html',
    encapsulation: ViewEncapsulation.Emulated,
})
export class MyProfileComponent {
    protected exposedName = signal(FederatedModuleMap.profile.name);
    protected exposedModule = signal(
        FederatedModuleMap.profile.modules.myprofile.name
    );
    protected exposedComponent = signal(
        FederatedModuleMap.profile.modules.myprofile.componentName
    );
    protected props = signal(
        new Map<string, unknown>([['canEdit', false]])
    );
}
```

원격 컴포넌트가 입력을 필요로 하는 경우 Map과 함께 모든 입력을 전달할 수 있습니다.

이것은 Angular로의 마이크로 프론트엔드에 전념된 시리즈의 첫 번째 블로그이며, 앞으로 미래 게시물에서 MFE 통합의 보다 어려운 측면을 탐구할 예정입니다.