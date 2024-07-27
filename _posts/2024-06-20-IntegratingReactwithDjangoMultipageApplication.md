---
title: "리액트와 장고 다중 페이지 애플리케이션 통합"
description: ""
coverImage: "/assets/img/2024-06-20-IntegratingReactwithDjangoMultipageApplication_0.png"
date: 2024-06-20 02:17
ogImage: 
  url: /assets/img/2024-06-20-IntegratingReactwithDjangoMultipageApplication_0.png
tag: Tech
originalTitle: "Integrating React with Django Multipage Application"
link: "https://medium.com/wetheitguys/integrating-react-with-django-multipage-application-355462baaf5d"
---


![image](/assets/img/2024-06-20-IntegratingReactwithDjangoMultipageApplication_0.png)

React와 Django는 각각의 강점을 가진 웹 애플리케이션을 구축하기 위한 강력한 도구입니다. React는 동적이고 상호 작용적인 사용자 인터페이스를 만드는 데 능숙하며, Django는 데이터를 관리하고 콘텐츠를 제공하기 위한 강력한 백엔드 프레임워크를 제공합니다. 이러한 기술들을 결합함으로써 개발자들은 양쪽의 장점을 최대한 활용할 수 있습니다. 본 포괄적인 안내서에서는 React를 Django 다중 페이지 애플리케이션에 통합하는 과정을 설명하며, 개발 및 프로덕션 환경에서의 모범 사례를 다룰 것입니다.

## 이 안내서를 사용해야 하는 경우:

## 요구 사항:

<div class="content-ad"></div>

- Django와 React의 기본 지식이 필요합니다.
- 시스템에 Python과 Node.js가 설치되어 있어야 합니다.

## 단계 1: Django 프로젝트 설정하기:

```js
pip install django
```

```js
django-admin startproject myproject
cd myproject
```

<div class="content-ad"></div>

다음으로, 프로젝트 내에서 Django 앱을 생성합니다:

```js
python manage.py startapp myapp
```

마이그레이션 적용

```js
python manage.py makemigrations
python manage.py migrate
```

<div class="content-ad"></div>

## 단계 2: React 앱 생성하기:

```js
mkdir frontend
cd frontend
```

이제 새로운 React 앱을 초기화하세요:

```js
npx create-react-app myreactapp
```

<div class="content-ad"></div>

## 단계 3: React를 Django와 통합하기:

- Django를 React 빌드 파일을 제공하도록 구성: Django 프로젝트의 urls.py 파일에서 React 앱을 제공할 수 있는 경로를 추가하세요:

```python
from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html')),
]
```

2. Django 템플릿에 React 번들 포함하기: Django 템플릿 (index.html)에 번들 된 JavaScript 파일을 동적으로 포함하여 개발 중에 변경 사항이 즉시 반영되도록하세요.

<div class="content-ad"></div>

다음과 같이 myapp 폴더와 동일한 레벨에 template 폴더를 만들어주세요. settings.py 파일을 업데이트해서 templates를 포함하도록 하겠습니다.

```python
import os

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {

        },
    },
]
```

```html
{ load static }
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Django React App</title>
</head>
<body>
    <div id="root"></div>
    <script src="http://localhost:3000/static/js/bundle.js"></script>
</body>
</html>
```

## Step 4: 어플리케이션 실행하기:

<div class="content-ad"></div>

## 개발

- 장고 개발 서버를 시작합니다:

```js
python manage.py runserver
```

- React 개발 서버를 시작합니다:

<div class="content-ad"></div>

```js
cd frontend/myreactapp
npm start
```

브라우저에서 http://localhost:8000을 방문하여 Django React 애플리케이션을 개발 모드로 확인할 수 있어요.

## 프로덕션

- React 앱 빌드하기:

<div class="content-ad"></div>

```js
cd frontend/myreactapp
npm run build
```

- Django 템플릿 업데이트: React 앱을 빌드한 후에는 Django 템플릿에 주요 JavaScript 파일(main.`해시`.js) 경로를 추가하십시오. Django 템플릿 파일(index.html)을 열어 다음 라인을 추가하십시오:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Django React App</title>
</head>
<body>
    <div id="root"></div>

    <script src="{ static 'js/main.38dff78c.js' }"></script>
</body>
</html>
```

- Django 서버 시작:

<div class="content-ad"></div>

```js
python manage.py runserver
```

로컬 호스트(http://localhost:8000)를 브라우저에서 방문하여 Django React 애플리케이션을 프로덕션 모드로 확인해보세요.

Django와 React를 통합하면 웹 애플리케이션의 사용자 경험을 향상시킬 수 있는 강력한 솔루션이 제공됩니다. 기존의 Django 다중 페이지 애플리케이션을 점진적으로 인터랙티브한 경험으로 전환하거나 단일 인터랙티브 페이지를 도입해야 하는 경우, 이 안내서를 통해 쉽게 지식과 도구를 활용할 수 있습니다.

이 안내서에 나온 단계를 따라가면 React와 Django의 장점을 모두 활용하여 Django의 백엔드 기능을 React의 동적인 프론트엔드 컴포넌트와 함께 효율적으로 사용할 수 있습니다. 프로젝트 설정부터 개발 및 프로덕션 환경 처리까지, 이제 Django 애플리케이션에 React를 통합할 튼튼한 기반을 가지게 되었습니다.


<div class="content-ad"></div>

행복한 코딩 😃

소스 코드