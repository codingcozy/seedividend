---
title: "로그인 시 폼 유효성 검사가 작동하지 않는 이유는"
description: ""
coverImage: "/TIL/assets/no-image.jpg"
date: 2024-07-07 19:18
ogImage: 
  url: /TIL/assets/no-image.jpg
tag: Tech
originalTitle: "Why my form validation while logging in is not working?"
link: "https://medium.com/@fixitblog/solved-why-my-form-validation-while-logging-in-is-not-working-b910e7dd50dc"
---


내 ts 컴포넌트 파일:

```js
import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FormBuilder, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [HeaderComponent,CommonModule,ReactiveFormsModule]
})
export class LoginComponent {
  
    isLoginInProgress: boolean | undefined;
    errorMessage: string | null = null; 
    
    form = this.fb.nonNullable.group({ 
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    
    constructor(
      private fb: FormBuilder, 
      private authService: AuthService,
      ) {
      
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        window.history.back();
      }
    }
     router = inject(Router);
  
    // fb = inject(FormBuilder);
    // http = inject(HttpClient);
    //  authService = inject(AuthService);
    data: any[] = [];
    
    validateEmail(email: string): boolean {
      if (!email) {
        return true; // 이메일 필드가 비어있으면 유효한 것으로 간주합니다 (필요 시 조정)
      }
      const emailRegex = /^\S+@\S+\.\S+$/; 
      return emailRegex.test(email);
    }
    

    noemail=false;
    noform=false;
    nopwd=false;
    login=false;
  
    onSubmit(): void {
      this.errorMessage = null;
        this.noemail = false;
        this.noform = false;
        this.nopwd = false;
        console.log('폼 제출됨');
        const rawform = this.form.getRawValue();
        const email = rawform.email.trim();
        this.isLoginInProgress = true;
        this.authService
          .login(email, rawform.password.trim())
          .subscribe({
            next: (response) => {
              console.log(response!.user!.uid);
              const accessToken = response!.user!.accessToken;
              const user_uid = response!.user!.uid;
              localStorage.setItem('accessToken', accessToken);
              localStorage.setItem('user_uid', user_uid);
              this.router.navigateByUrl('/');
              window.location.reload();
              this.isLoginInProgress = false;
            },
            error: (err: any) => {
              this.handleAuthError(err);
              this.isLoginInProgress = false;
            },
          });
        if (!email) {
          this.noemail = true 
  
          this.noform=false
          // 이메일이 입력되지 않았습니다
        } 
        if (!this.validateEmail(email)) {
          this.noemail=false
          this.nopwd=false
          this.noform=true 
          // 유효하지 않은 이메일 형식입니다
        }
        else
        {
          
          this.noform=false
        }
  
        
        const mdp=rawform.password.trim();
        if(!mdp ) 
          {
            this.nopwd=true
          }  
    }
  
    handleAuthError(err: any): void {
      console.error('인증 오류:', err); 
      const rawform = this.form.getRawValue();// 검사를 위해 오류 객체 기록
      const email = rawform.email.trim();
      switch (err.code) {
        case 'auth/invalid-credential':
          this.errorMessage = '유효하지 않은 비밀번호 또는 이메일';
          this.nopwd=false
          this.noemail=false
          this.noform=false
          break;
        case 'auth/invalid-email' :
          if (email)
            {
              this.nopwd=false
              
            }
          break;
        case this.validateEmail(email)  :
          this.noform=false
          this.noemail=false
          break; 
      }
  
    }
  
    isLoggedIn(): boolean {
      const hasAccessToken = localStorage.getItem('accessToken') !== null;
      
      timer(1000);
      if (hasAccessToken) {
        return true;
      } else {     
        return false;
      }
    }
   
    
}
```

내 html 컴포넌트 내용:

```js
<app-header style="background: linear-gradient(to left ,#032961,#4588ee);"></app-header>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/assets/css/styles.css" rel="stylesheet">
  <link href="/assets/bootstrap/bootstrap.css" rel="stylesheet">
  
</head>
<body class="form-v9" style="background: linear-gradient(to left ,#032961,#4588ee); ">
    <div class="page-content">
        <div class="form-v9-content" >
            <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-detail" action="#" method="post">
                <h2>로그인 양식</h2>
                <div class="form-row-total">
                        
                        <div *ngIf="login" class="alert alert-success" role="alert">
                            성공적으로 로그인했습니다
                        </div>
                    <div class="form-row">
                        <input type="text" name="email" id="email" class="input-text" placeholder="이메일 주소" required pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}">
                    </div>
                    <div *ngIf="errorMessage" class="alert alert-danger" role="alert">
                        { errorMessage }
                      </div>
                          <div *ngIf="noemail " class="alert alert-danger" role="alert">
                              이메일을 입력하세요
                          </div> 
                          <div *ngIf="noform" class="alert alert-danger" role="alert">
                              올바르지 않은 이메일 형식 
                          </div>
                </div>
                <div class="form-row-total">
                    <div class="form-row">
                        <input type="password" name="password" id="password" class="input-text" placeholder="비밀번호" required>
                    </div>
                    
                    <div *ngIf="errorMessage" class="alert alert-danger" role="alert" >
                        { errorMessage }
                      </div>
                    <div *ngIf="nopwd" class="alert alert-danger" role="alert"  style="margin-top: 90px;">
                        비밀번호를 입력하세요
                    </div>
                    
                </div>
                <div class="form-row-last">
                    <input type="submit" name="register" class="register" value="로그인" >
                </div>
            </form>
        </div>
    </div>
</body>
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

# 로그인 버튼을 누를 때 (필드가 비어있든 아니든) 표시되는 메시지가 "비밀번호를 입력하십시오" 및 "이메일을 입력하십시오"인 것 같습니다 (즉, 변수 'nopwd' 및 'noemail'의 값은 항상 true인 것처럼 보입니다). 문제가 정확히 어디에 있을까요? 그리고 무엇을 변경해야 할까요?

# 해결책

입력란에 formControlName을 추가하는 것을 잊으신 것 같습니다.

```js
<input type="text" formControlName="email" name="email" id="email" class="input-text" placeholder="이메일을 입력하세요" required pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}">

<input type="password" formControlName="password" name="password" id="password" class="input-text" placeholder="비밀번호를 입력하세요" required>
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

코드를 개선했습니다.

component.ts

```js
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth.service';
import { Location } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from './custom-validators';
import { catchError, of, take, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [RouterOutlet, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly _router = inject(Router);
  private readonly _location = inject(Location);
  private readonly _authService = inject(TestAuthService);

  authError = signal<boolean>(false);
  isLoginInProgress = signal<boolean>(false);

  form = new FormGroup({
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, CustomValidators.email] }),
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  login = false; // 항상 false입니다 O_o

  constructor() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) this._location.back();
  }

  onSubmit(): void {
    this.isLoginInProgress.set(true);
    this._authService
      .login(this.form.controls.email.value.trim(), this.form.controls.password.value.trim())
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.handleAuthError(error);
          return of(error);
        }),
        tap(response => this._handleLogin(response)),
        finalize(() => this.isLoginInProgress.set(false))
      )
      .subscribe();
  }

  private _handleLogin(response: any): void {
    if (!response?.user) return;

    const accessToken = response.user.accessToken;
    const user_uid = response.user.uid;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user_uid', user_uid);
    this._router.navigateByUrl('/');
    window.location.reload();
  }

  handleAuthError(err: HttpErrorResponse): void {
    if (!err.error.code) return;

    this.authError.set(true);
    this.form.valueChanges
      .pipe(
        take(1),
        tap(() => this.authError.set(false))
      )
      .subscribe();
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('accessToken') !== null
  }
}
```

component.html

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


```html
<form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-detail">
  <h2>Login Form</h2>
  <div class="form-row-total">

    @if(login) {
      <div class="alert alert-success" role="alert">
        Login avec succès
      </div>
    }

    <div class="form-row">
      <input type="text" formControlName="email" name="email" id="email" class="input-text" placeholder="이메일" required pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}">
    </div>
    @if (authError()) {
      <div class="alert alert-danger" role="alert">
        잘못된 비밀번호 또는 이메일
      </div>
    }
    @if (form.controls.email.errors?.required) {
      <div class="alert alert-danger" role="alert">
        이메일을 입력해주세요
      </div>
    }
    @if (form.controls.email.errors?.email) {
      <div class="alert alert-danger" role="alert">
        잘못된 이메일 형식입니다
      </div>
    }
  </div>

  <div class="form-row-total">
    <div class="form-row">
      <input type="password" formControlName="password" name="password" id="password" class="input-text" placeholder="비밀번호" required>
    </div>

    @if (authError()) {
      <div class="alert alert-danger" role="alert" >
        잘못된 비밀번호 또는 이메일
      </div>
    }

    @if (form.controls.password.errors?.required) {
      <div class="alert alert-danger" role="alert"  style="margin-top: 90px;">
        비밀번호를 입력해주세요
      </div>
    }

  </div>
  <div class="form-row-last">
    <input type="submit" name="register" class="register" value="로그인" [disabled]="!form.valid" >
  </div>
</form>
```

custom-validators.ts

```js
import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static email(control: AbstractControl<string>): ValidationErrors | null {
    const emailRegex = new RegExp(/^\S+@\S+\.\S+$/);

    if (!control.value) return null;
    return emailRegex.test(control.value) ? null : { email: true };
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

답변 확인자 - Marie Seifert (수정 관리자)

이 답변은 stackoverflow에서 수집되었으며 cc by-sa 2.5, cc by-sa 3.0 및 cc by-sa 4.0의 라이센스를 따릅니다.