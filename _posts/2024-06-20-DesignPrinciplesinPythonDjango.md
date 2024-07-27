---
title: "파이썬 장고에서의 디자인 원칙"
description: ""
coverImage: "/assets/img/2024-06-20-DesignPrinciplesinPythonDjango_0.png"
date: 2024-06-20 02:11
ogImage: 
  url: /assets/img/2024-06-20-DesignPrinciplesinPythonDjango_0.png
tag: Tech
originalTitle: "Design Principles in Python Django"
link: "https://medium.com/django-unleashed/design-principles-in-python-django-3011d6cee547"
---


파이썬에서의 디자인 원칙은 다른 프로그래밍 언어와 마찬가지로 깔끔하고 유지보수가 용이하며 효율적인 코드를 만드는 데 도움이 됩니다. 다음은 몇 가지 주요 디자인 원칙과 예시입니다:

![Design Principles in Python](/assets/img/2024-06-20-DesignPrinciplesinPythonDjango_0.png)

## 1. DRY(Don’t Repeat Yourself)

코드의 중복을 피하기 위해 반복되는 패턴을 함수나 클래스로 추상화합니다.

<div class="content-ad"></div>

장고는 ORM, 폼 및 관리자 인터페이스를 통해 DRY 원칙을 자연스럽게 촉진합니다.

## 예시: 시리얼라이저 사용하기

DRF 시리얼라이저를 사용하면 유효성 검사 로직을 별도로 작성하는 대신, 해당 로직을 시리얼라이저 자체에 캡슐화할 수 있습니다.

```js
# serializers.py
from rest_framework import serializers
from .models import Expense, Category, Balance

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ['id', 'user', 'category', 'amount', 'description', 'date']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'user']

class BalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Balance
        fields = ['id', 'total_balance']
```

<div class="content-ad"></div>

# 2. KISS (Keep It Simple, Stupid)

코드를 가능한 한 간단하게 유지하세요. 불필요한 복잡성을 피하세요.

Django의 설계 철학은 간결성과 가독성을 강조합니다.

## 예시: Django Rest Framework의 일반 뷰 사용

<div class="content-ad"></div>

복잡한 뷰 로직을 작성하는 대신, DRF의 일반적인 뷰를 사용하여 객체 생성, 검색 및 목록을 처리할 수 있어요.

```js
# views.py
from rest_framework import generics
from .models import Expense, Category, Balance
from .serializers import ExpenseSerializer, CategorySerializer, BalanceSerializer

class ExpenseListView(generics.ListCreateAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

class ExpenseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

class CategoryListView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class BalanceListView(generics.ListCreateAPIView):
    queryset = Balance.objects.all()
    serializer_class = BalanceSerializer
```

# 3. YAGNI (You Ain’t Gonna Need It)

필요할 때까지 기능을 추가하지 마세요.

<div class="content-ad"></div>

현재 요구 사항에 주안점을 두세요. 미래의 가능성에 집중하기보다는 현재의 요구 사항을 중심으로 작업하세요.

## 예: 간단한 사용자 프로필

간단한 사용자 모델로 시작하고 필요할 때만 복잡성을 추가하세요.

```js
# models.py

class User(AbstractUser):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username
```

<div class="content-ad"></div>

# 4. 역할의 분리

여러분의 코드의 각 부분은 서로 다른 책임을 가져야 합니다.

장고의 MVC (Model-View-Controller) 아키텍처는 데이터 처리를 분리한 모델(models), 사용자 인터페이스를 분리한 템플릿(templates), 그리고 응용 프로그램 로직을 분리한 뷰(views)로 구성됩니다.

## 예시: 뷰에서 비즈니스 로직 분리

<div class="content-ad"></div>

비즈니스 로직은 뷰가 아닌 모델이나 서비스에 유지하는 것이 좋습니다.

```js
# models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class DKModel(models.Model):
    class Meta:
        abstract = True

    deleted = models.BooleanField(default=False)
    date_created = models.DateTimeField('Date created', auto_now_add=True)
    date_last_updated = models.DateTimeField('Data last updated', auto_now=True)

    def __id__(self) -> int:
        return self.id

    def delete(self, *args, **kwargs):
        self.deleted = True
        self.save()

    def hard_delete(self, *args, **kwargs):
        super().delete(*args, **kwargs)
        
                      ....

# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from django.shortcuts import get_object_or_404
from .models import Expense, Category, Balance, User
from .serializers import ExpenseSerializer, CategorySerializer, BalanceSerializer

class ExpenseListView(generics.ListCreateAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

class ExpenseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

class CategoryListView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class BalanceListView(generics.ListCreateAPIView):
    queryset = Balance.objects.all()
    serializer_class = BalanceSerializer

class UserTotalExpensesView(APIView):
    def get(self, request, user_id):
        user = get_object_or_404(User, id=user_id)
        total_expenses = user.get_total_expenses()
        return Response({'total_expenses': total_expenses})

# urls.py
from django.urls import path
from .views import ExpenseListView, ExpenseDetailView, CategoryListView, CategoryDetailView, BalanceListView, UserTotalExpensesView

urlpatterns = [
    path('expenses/', ExpenseListView.as_view(), name='expense-list'),
    path('expenses/<int:pk>/', ExpenseDetailView.as_view(), name='expense-detail'),
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('categories/<int:pk>/', CategoryDetailView.as_view(), name='category-detail'),
    path('balances/', BalanceListView.as_view(), name='balance-list'),
    path('users/<int:user_id>/total-expenses/', UserTotalExpensesView.as_view(), name='user-total-expenses'),
]
```

# 5. SOLID Principles

SOLID은 소프트웨어 디자인을 더 이해하기 쉽고 유연하며 유지보수하기 쉽도록 하는 다섯 가지 디자인 원칙을 의미하는 머릿글자입니다.

<div class="content-ad"></div>

## S: 단일 책임 원칙 (SRP)

각 클래스는 하나의 책임만을 가져야 합니다.

```js
# model/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class DKModel(models.Model):
    class Meta:
        abstract = True

    deleted = models.BooleanField(default=False)
    date_created = models.DateTimeField('생성 날짜', auto_now_add=True)
    date_last_updated = models.DateTimeField('마지막으로 업데이트된 날짜', auto_now=True)

    def __id__(self) -> int:
        return self.id

    def delete(self, *args, **kwargs):
        self.deleted = True
        self.save()

    def hard_delete(self, *args, **kwargs):
        super().delete(*args, **kwargs)


class User(AbstractUser):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username


class Category(DKModel):
    class Meta:
        verbose_name = "카테고리"
        verbose_name_plural = "카테고리들"
        db_table = "dk_category"

    name = models.CharField('이름', max_length=100, unique=True)
    description = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Expense(DKModel):
    class Meta:
        verbose_name = "지출"
        verbose_name_plural = "지출들"
        db_table = "dk_expense"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    date = models.DateField()


class Balance(models.Model):
    class Meta:
        verbose_name = "잔고"
        verbose_name_plural = "잔고들"
        db_table = "dk_balance"

    total_balance = models.DecimalField(max_digits=10, decimal_places=2)
```

## O: 개방/폐쇄 원칙 (OCP)

<div class="content-ad"></div>

소프트웨어 엔티티들은 확장에는 열려 있지만 수정에는 닫혀 있어야 합니다.

```python
# middleware.py
from django.http import HttpResponse

class BaseMiddleware:
    def process_request(self, request):
        raise NotImplementedError

class AuthMiddleware(BaseMiddleware):
    def process_request(self, request):
        if not request.user.is_authenticated:
            return HttpResponse('Unauthorized', status=401)
```

### L: 리스코프 치환 원칙 (LSP)

슈퍼클래스의 객체는 서브클래스의 객체로 대체할 수 있어야 하며, 프로그램의 정확성에 영향을 주지 않아야 합니다.

<div class="content-ad"></div>

```js
# models.py

class Notification:
    def send(self):
        raise NotImplementedError

class EmailNotification(Notification):
    def send(self):
        print("이메일 보내는 중")

class SMSNotification(Notification):
    def send(self):
        print("SMS 보내는 중")

def notify(notification: Notification):
    notification.send()

# 사용 예시
email_notification = EmailNotification()
sms_notification = SMSNotification()

notify(email_notification)  # 출력: 이메일 보내는 중
notify(sms_notification)    # 출력: SMS 보내는 중
```

## I: 인터페이스 분리 원칙 (ISP)

클라이언트는 사용하지 않는 인터페이스에 종속되도록 강요되어서는 안됩니다.

```js
# 더 큰 뷰를 분리함으로써 인터페이스 분리
from django.views import View
from django.http import JsonResponse

class CreateMixin:
    def create(self, request, *args, **kwargs):
        return JsonResponse({'message': '생성 기능이 구현되지 않았습니다.'}, status=405)

class ReadMixin:
    def read(self, request, *args, **kwargs):
        return JsonResponse({'message': '조회 기능이 구현되지 않았습니다.'}, status=405)

class UpdateMixin:
    def update(self, request, *args, **kwargs):
        return JsonResponse({'message': '수정 기능이 구현되지 않았습니다.'}, status=405)

class DeleteMixin:
    def delete(self, request, *args, **kwargs):
        return JsonResponse({'message': '삭제 기능이 구현되지 않았습니다.'}, status=405)

class MyView(CreateMixin, ReadMixin, View):
    def read(self, request, *args, **kwargs):
        return JsonResponse({'message': '데이터 조회 중'})
```

<div class="content-ad"></div>

## D: 의존 역전 원칙 (DIP)

고수준 모듈은 저수준 모듈에 의존해서는 안 됩니다. 둘 모두 추상화에 의존해야 합니다.

```js
class PaymentService:
    def process_payment(self):
        raise NotImplementedError

class StripePaymentService(PaymentService):
    def process_payment(self):
        print("Stripe로 결제 처리 중")

class PayPalPaymentService(PaymentService):
    def process_payment(self):
        print("PayPal로 결제 처리 중")

# views.py
from .services import PaymentService

class PaymentView(View):
    def __init__(self, payment_service: PaymentService):
        self.payment_service = payment_service

    def post(self, request, *args, **kwargs):
        self.payment_service.process_payment()
        return JsonResponse({'message': '결제가 완료되었습니다'})

# 사용법
stripe_service = StripePaymentService()
paypal_service = PayPalPaymentService()

stripe_payment_view = PaymentView(stripe_service)
paypal_payment_view = PaymentView(paypal_service)
```