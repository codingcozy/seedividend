---
title: "라라벨 8로 사용자 로그인 및 등록 화면 생성"
description: ""
coverImage: "/assets/img/2024-05-14-CreationofuserloginandregistrationscreenswithLaravel8_0.png"
date: 2024-05-14 15:19
ogImage: 
  url: /assets/img/2024-05-14-CreationofuserloginandregistrationscreenswithLaravel8_0.png
tag: Tech
originalTitle: "Creation of user login and registration screens with Laravel 8."
link: "https://medium.com/@bbkgull/creation-of-user-login-and-registration-screens-with-laravel-8-8e563c7d5336"
---


Laravel 8 로그인 및 회원가입 튜토리얼; 이 튜토리얼에서는 라라벨 애플리케이션에서 사용자 지정 인증 로그인 및 회원가입을 생성하는 방법에 대해 설명합니다.

단계 1: 라라벨 애플리케이션 만들기
단계 2: 데이터베이스 연결
단계 3: 권한 부여 컨트롤러 설정
단계 4: 권한 부여 라우트 생성
단계 5: 권한 부여 블레이드 뷰 파일 생성
단계 6: 라라벨 개발 서버 실행

단계 1: 라라벨 애플리케이션 만들기

시스템에 이미 Composer를 구성했다고 가정하고, 다음 명령을 실행하여 새 라라벨 애플리케이션을 설치합니다. 그렇지 않은 경우에는 다음 링크에서 다운로드할 수 있습니다.



```js
composer create-project - prefer-dist laravel/laravel_demo_app
```

그런 다음, 애플리케이션 폴더로 이동하세요:

```js
cd laravel_demo_app
```

단계 2: 데이터베이스에 연결하기



이제 Laravel 애플리케이션을 데이터베이스에 연결하기 위해 .env 구성 파일에 데이터베이스 이름, 사용자 이름 및 비밀번호를 추가해야 합니다:

```js
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=데이터베이스_이름
DB_USERNAME=데이터베이스_사용자_이름
DB_PASSWORD=데이터베이스_비밀번호
```

Laravel 애플리케이션에는 기본 User 모델과 마이그레이션 파일이 함께 제공됩니다. 데이터베이스에 새 테이블을 만들기 위해 다음 명령을 실행해야 합니다. 따라서 터미널로 이동하여 다음 명령을 실행하세요.

```js
php artisan migrate
```



3단계: 인가 컨트롤러 설정하기

다음으로, 제안된 명령을 명령 프롬프트에 작성하고 새로운 컨트롤러 파일인 CustomAuthController를 생성하는 명령을 실행하세요.

```js
php artisan make:controller CustomAuthController
```

그런 다음 파일을 열어주세요.



```js
`app\Http\Controllers\CustomAuthController.php` 에 위 코드를 주의 깊게 넣어주세요.

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Hash;
use Session;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class CustomAuthController extends Controller
{

    public function index()
    {
        return view('auth.login');
    }

    public function customLogin(Request $request)
    {
       $validator =  $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);
   
    
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            return redirect()->intended('dashboard')
                        ->withSuccess('Signed in');
        }
        $validator['emailPassword'] = '이메일 주소 또는 비밀번호가 올바르지 않습니다.';
        return redirect("login")->withErrors($validator);
    }



    public function registration()
    {
        return view('auth.registration');
    }

    public function customRegistration(Request $request)
    {  
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);
           
        $data = $request->all();
        $check = $this->create($data);
         
        return redirect("dashboard")->withSuccess('가입이 완료되었습니다');
    }


    public function create(array $data)
    {
      return User::create([
        'name' => $data['name'],
        'email' => $data['email'],
        'password' => Hash::make($data['password'])
      ]);
    }

    public function dashboard()
    {
        if(Auth::check()){
            return view('dashboard');
        }
  
        return redirect("login")->withSuccess('접근 권한이 없습니다');
    }

    public function signOut() {
        Session::flush();
        Auth::logout();
  
        return Redirect('login');
    }
}

Step 4: 권한 부여 라우트 생성




이 단계에서는 라라벨 애플리케이션에서 사용자 정의 인증을 처리하기 위해 POST 및 GET 방식으로 경로를 생성하는 방법을 설명합니다. route/web.php 파일을 열고 다음 코드를 추가하세요.

<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomAuthController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('dashboard', [CustomAuthController::class, 'dashboard']); 
Route::get('login', [CustomAuthController::class, 'index'])->name('login');
Route::post('custom-login', [CustomAuthController::class, 'customLogin'])->name('login.custom'); 
Route::get('registration', [CustomAuthController::class, 'registration'])->name('register-user');
Route::post('custom-registration', [CustomAuthController::class, 'customRegistration'])->name('register.custom'); 
Route::get('signout', [CustomAuthController::class, 'signOut'])->name('signout');

단계 5: Auth Blade View 파일 생성

Resources/views/ 폴더 내에서 auth 폴더를 생성하고 그 안에 new login.blade.php 파일을 만들어 이 파일에 다음 코드를 넣어주세요.



<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet">
<main class="login-form">
    <div class="cotainer">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <div class="card">
                    <h3 class="card-header text-center">로그인</h3>
                    <div class="card-body">
                        <form method="POST" action="{ route('login.custom') }">
                            @csrf
                            <div class="form-group mb-3">
                                <input type="text" placeholder="이메일" id="email" class="form-control" name="email" required autofocus>
                            </div>

                            <div class="form-group mb-3">
                                <input type="password" placeholder="비밀번호" id="password" class="form-control" name="password" required>
                                @if ($errors->has('emailPassword'))
                                <span class="text-danger">{ $errors->first('emailPassword') }</span>
                                @endif
                            </div>

                            <div class="form-group mb-3">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" name="remember"> 기억하기
                                    </label>
                                </div>
                            </div>

                            <div class="d-grid mx-auto">
                                <button type="submit" class="btn btn-dark btn-block">로그인</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

Resources/views/auth 폴더로 이동하여 비슷하게 registration.blade.php 파일을 만들고, 이 파일에 다음 코드를 추가해주세요:

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet">

<main class="signup-form">
    <div class="cotainer">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <div class="card">
                    <h3 class="card-header text-center">사용자 등록</h3>
                    <div class="card-body">

                        <form action="{ route('register.custom') }" method="POST">
                            @csrf
                            <div class="form-group mb-3">
                                <input type="text" placeholder="이름" id="name" class="form-control" name="name"
                                    required autofocus>
                                @if ($errors->has('name'))
                                <span class="text-danger">{ $errors->first('name') }</span>
                                @endif
                            </div>

                            <div class="form-group mb-3">
                                <input type="text" placeholder="이메일" id="email_address" class="form-control"
                                    name="email" required autofocus>
                                @if ($errors->has('email'))
                                <span class="text-danger">{ $errors->first('email') }</span>
                                @endif
                            </div>

                            <div class="form-group mb-3">
                                <input type="password" placeholder="비밀번호" id="password" class="form-control"
                                    name="password" required>
                                @if ($errors->has('password'))
                                <span class="text-danger">{ $errors->first('password') }</span>
                                @endif
                            </div>

                            <div class="form-group mb-3">
                                <div class="checkbox">
                                    <label><input type="checkbox" name="remember"> 기억하기</label>
                                </div>
                            </div>

                            <div class="d-grid mx-auto">
                                <button type="submit" class="btn btn-dark btn-block">가입하기</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

Resources/views/ 폴더로 이동하여 새로운 dashboard.blade.php 파일을 만들고, 이 파일에 다음 코드를 추가해주세요:



<!DOCTYPE html>
<html>
<head>
    <title>라라벨에서 사용자 지정 인증</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>

    <nav class="navbar navbar-light navbar-expand-lg mb-5" style="background-color: #e3f2fd;">
        <div class="container">
            <a class="navbar-brand mr-auto" href="#">코드사전</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    @guest
                    <li class="nav-item">
                        <a class="nav-link" href="{ route('login') }">로그인</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{ route('register-user') }">가입하기</a>
                    </li>
                    @else
                    <li class="nav-item">
                        <a class="nav-link" href="{ route('signout') }">로그아웃</a>
                    </li>
                    @endguest
                </ul>
            </div>
        </div>
    </nav>

</body>

</html>

단계 6: 라라벨 서버 실행하기

마지막으로, 브라우저에서 애플리케이션을 시작할 수 있도록 라라벨 개발 서버를 실행해야 합니다. 명령 프롬프트를 통해 다음 명령어를 실행해 주세요.

php artisan serve



브라우저 주소창에 다음 URL을 추가하고 애플리케이션을 테스트해보세요.

http://127.0.0.1:8000/login
http://127.0.0.1:8000/registration

소스 코드

![이미지](/assets/img/2024-05-14-CreationofuserloginandregistrationscreenswithLaravel8_0.png)