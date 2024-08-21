---
title: "앵귤러와 부트스트랩을 사용해 CRUD Create, Read, Update, Delete FORM 만들기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Creating a CRUD Create, Read, Update, Delete FORM in Angular and Bootstrap"
link: "https://medium.com/stackademic/creating-a-crud-create-read-update-delete-form-in-angular-and-bootstrap-55bc4ee9e247"
isUpdated: true
---

![이미지](/assets/img/CreatingaCRUDCreateReadUpdateDeleteFORMinAngularandBootstrap_0.png)

앵귤러에서 CRUD (생성, 읽기, 업데이트, 삭제) 폼을 만드는 것은 사용자 입력을 처리하기 위해 FormGroup을 사용하는 반응형 폼과 폼을 스타일링하기 위해 부트스트랩을 활용하는 과정을 포함합니다. 아래에는 항목을 추가하고 편집하는 폼을 만드는 간단한 예제가 있습니다 (CRUD의 "CU" 부분). 이 예제에서는 작업을 처리하는 서비스를 만드는 과정, 반응형 폼을 설정하는 방법, 그리고 스타일링을 위해 부트스트랩을 사용하는 방법을 다룰 것입니다.

# 단계 1: 앵귤러 프로젝트 설정

이미 앵귤러 프로젝트를 설정하고 부트스트랩을 포함하지 않은 경우, 환경을 설정하기 위해 이전 답변에서 제안한 초기 단계를 따라주시기 바랍니다.

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

# 단계 2: 컴포넌트 및 서비스 생성

CRUD 작업을 처리하기 위한 컴포넌트와 서비스를 생성하세요.

```js
ng generate component item-form
ng generate service item
```

# 단계 3: 모델 생성 (선택사항)

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

새로운 항목을 생성하고 읽고 업데이트 및 삭제하는 간단한 모델을 만드세요. src/app 디렉토리에 item.ts라는 새 파일을 만드세요:

```js
export interface Item {
  id: number;
  name: string;
}
```

# 단계 4: 서비스 구현하기

생성된 서비스 파일 (item.service.ts)에서는 이 예제를 위해 항목을 목록에 추가하는 시뮬레이션을 원할 수 있습니다.

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
import { Injectable } from '@angular/core';
import { Item } from './item';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private items: Item[] = [];

  constructor() {}

  addItem(item: Item) {
    this.items.push(item);
  }

  getItems(): Item[] {
    return this.items;
  }
}
```

# 단계 5: 반응형 폼 설정

아이템 폼 컴포넌트에서 반응형 폼을 설정하세요. 먼저, app.module.ts에서 ReactiveFormsModule을 import하고 imports 배열에 추가해주세요:

```js
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    // 다른 컴포넌트
  ],
  imports: [
    // 다른 모듈
    ReactiveFormsModule,
  ],
})
export class AppModule {}
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

그럼 item-form.component.ts에서 FormGroup을 설정하세요:

```js
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {
  itemForm: FormGroup;

  constructor(private fb: FormBuilder, private itemService: ItemService) {
    this.itemForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.itemForm.valid) {
      this.itemService.addItem(this.itemForm.value);
      this.itemForm.reset();
    }
  }
}
```

# 단계 6: HTML에서 폼 생성하기

이제 item-form.component.html에서 Bootstrap 클래스를 사용하여 폼을 생성하세요:

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
<div class="container mt-5">
  <form [formGroup]="itemForm" (ngSubmit)="onSubmit()">
    <div class="mb-3">
      <label for="id" class="form-label">ID</label>
      <input type="text" class="form-control" id="id" formControlName="id">
    </div>
    <div class="mb-3">
      <label for="name" class="form-label">이름</label>
      <input type="text" class="form-control" id="name" formControlName="name">
    </div>
    <button type="submit" class="btn btn-primary">제출</button>
  </form>
</div>
```

# 단계 7: 애플리케이션 실행

애플리케이션을 실행하세요:

```js
ng serve
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

http://localhost:4200/ 으로 이동하면 부트스트랩으로 스타일이 적용된 양식을 볼 수 있습니다.

이 예제는 항목을 추가하기 위해 양식을 생성하고 제출하는 내용을 다룹니다. 전체 CRUD 기능을 구현하려면 서비스를 확장하여 항목을 읽기, 수정 및 삭제할 수 있도록 처리하고 필요에 따라 추가 컴포넌트나 메소드를 생성해야 합니다. 실제 데이터의 영속성(예: 데이터베이스)은 서버 측 통합이 필요하며, 이 예제에서 다루지 않는 부분입니다.

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
