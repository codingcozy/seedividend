---
title: "GraphQL API에서 인증 및 권한 관리하는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-HowtohandleauthenticationandauthorizationinGraphQLAPI_0.png"
date: 2024-07-09 20:30
ogImage:
  url: /assets/img/2024-07-09-HowtohandleauthenticationandauthorizationinGraphQLAPI_0.png
tag: Tech
originalTitle: "How to handle authentication and authorization in GraphQL API"
link: "https://medium.com/gitconnected/how-to-implement-authentication-and-authorization-in-graphql-api-90c17a92a5d9"
---

아래는 작성한 표의 내용이에요.

| 제목                             | 링크                                                                                           |
| -------------------------------- | ---------------------------------------------------------------------------------------------- |
| Authentication and authorization | [여기](/TIL/assets/img/2024-07-09-HowtohandleauthenticationandauthorizationinGraphQLAPI_0.png) |

인증(Authentication)과 권한 부여(authorization)는 종종 혼동되지만, 이러한 개념들은 서로 다른 프로세스를 담당하고 있어요. '인증'은 사용자 식별을 결정하며(사용자가 시스템에 로그인되어 있는지 여부), '권한 부여'는 인증된 사용자가 특정 리소스에 액세스할 수 있는지 여부를 나타냅니다. 그래서 보통 인증 단계가 권한 부여 단계를 선행해요. GraphQL에서 인증과 권한 부여는 도전적일 수 있는데 이는 하나의 노출된 HTTP 엔드포인트 (예: /graphql)만 있기 때문이에요. 이 엔드포인트 진입점에서 사용자를 인증할 수는 있지만, 그 구현에서 일부 리소스에 대한 공개 접근 옵션을 포기해야 할 수 있어요. 이 유일한 엔드포인트 진입에서 권한을 부여하는 것은 불가능해요. 왜냐하면 어떤 리소스가 쿼리될 지 모르기 때문이에요.

이 게시물의 영감은 해당 주제에 대한 답변을 찾는 스택오버플로우 질문에서 얻은 거예요. # 애플리케이션 설정

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

저의 텍스트는 Python에서 GraphQL와 REST의 예제 구현을 비교한 내용에 대한 후속 게시물입니다. 따라서 애플리케이션을 설정하는 데 필요한 요구 사항을 찾을 수 있습니다.

# 회원 가입 / 로그인

우선 이메일 및 해싱된 패스워드 속성을 가진 간단한 사용자 모델(User)부터 시작합니다.

```js
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from db import Base

class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String, unique=True)
    password = Column(String)
    table_bookings = relationship("TableBooking")
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

사용자 등록은 이메일과 비밀번호 매개변수를 받아들이고 데이터베이스에 사용자 레코드를 생성하는 SignUp 뮤테이션을 통해 제공됩니다.

```js
# api/graphql.py
import graphene
from service import sign_up

class SignUp(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

   user = graphene.Field(UserNode)

   def mutate(self, info, email: str, password: str):
        session = info.context["session"]
        user = sign_up(session, email, password)
        return SignUp(user=user)

class Mutation(graphene.ObjectType):
    sign_up = SignUp.Field()

# service.py
from auth import generate_password_hash

class UserAlreadyExist(Exception):
    pass

def sign_up(session: Session, email: str, password) -> User:
    if session.query(User).filter_by(email=email).first():
        raise UserAlreadyExist()
    user = User(email=email, password=generate_password_hash(password))
    session.add(user)
    session.commit()
    return user

# auth.py
import hashlib

SALT = "STRONg@Salt"

def generate_password_hash(password: str) -> str:
    h = hashlib.md5(f"{password}{SALT}".encode())
    return h.hexdigest()
```

뮤테이션은 /graphql 엔드포인트에서 POST 요청을 통해 실행됩니다. GraphQL에 대한 이전 게시물과 같이 insomnia를 사용하여 HTTP 요청을 수행합니다.

![이미지](/TIL/assets/img/2024-07-09-HowtohandleauthenticationandauthorizationinGraphQLAPI_1.png)

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

사용자 인스턴스가 생성되면 올바른 자격 증명이 전달되면 사용자 인증 JWT 토큰을 생성하는 SignIn 뮤테이션이 필요합니다.

```js
# api/graphql.py
import graphene
from service import sign_in

class SignIn(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

   token = graphene.String()

   def mutate(self, info, email: str, password: str):
        session = info.context["session"]
        token = sign_in(session, email, password)
        return SignIn(token=token)

   class Mutation(graphene.ObjectType):
        sign_in = SignIn.Field()

# service.py
from sqlalchemy.orm import Session
from auth import generate_token, verify_password
from models import User

class UserAuthenticationError(Exception):
    pass

def sign_in(session: Session, email: str, password) -> str:
    user = session.query(User).filter_by(email=email).first()
    if not user:
        raise UserAuthenticationError()
    if not verify_password(user, password):
        raise UserAuthenticationError()
    return generate_token(user)

# auth.py
import hashlib
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from models import User

SALT = "STRONg@Salt"
SECRET_KEY = "!SECRET!"
TOKEN_EXPIRES_IN = 3600 * 24 * 30

def generate_password_hash(password: str) -> str:
    h = hashlib.md5(f"{password}{SALT}".encode())
    return h.hexdigest()

def verify_password(user: User, password: str) -> bool:
    return user.password == generate_password_hash(password)

def generate_token(user: User) -> str:
    serializer = Serializer(SECRET_KEY, expires_in=TOKEN_EXPIRES_IN)
    return serializer.dumps({"user_id": user.id}).decode("utf-8")
```

SignIn 뮤테이션을 위해 이메일과 비밀번호를 전달하고 인증이 필요한 요청에서 사용할 수 있는 토큰을 페이로드로 받습니다.

![이미지](/TIL/assets/img/2024-07-09-HowtohandleauthenticationandauthorizationinGraphQLAPI_2.png)

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

# 인증

SignIn 단계에서 생성된 토큰이 있으므로 "Bearer Authentication" 프로세스에서 사용할 수 있습니다. 이러한 유형의 인증에서는 유효한 토큰(베어러)을 가진 모든 사용자가 해당 토큰에 해당하는 사용자로 인식될 수 있습니다. 각 GraphQL 필드 리졸버에 사용할 수 있는 sign_in_required 데코레이터를 정의합니다. 이 데코레이터는 "Authorization" 요청 헤더에서 토큰을 가져와 해독하여 user_id를 얻은 다음, user_id에 해당하는 User가 있는지 확인합니다. 성공적으로 완료되면 인증된 User가 됩니다.

```js
# api/graphql.py

import graphene
from api.auth import sign_in_required

class Query(graphene.ObjectType):
    up = graphene.Boolean()
    restaurants = graphene.relay.ConnectionField(
        RestaurantConnection, q=graphene.String()
    )
    me = graphene.Field(UserNode)

    def resolve_up(root, info, **kwargs):
        return True

    @sign_in_required()
    def resolve_restaurants(root, info, **kwargs):
        query = get_restaurants(
            info.context["session"], search=kwargs.get("q"), limit=kwargs.get("first")
        )
        return [RestaurantNode(id=r.id, name=r.name) for r in query]

    @sign_in_required()
    def resolve_me(root, info, **kwargs):
        return kwargs["current_user"]

# api/auth.py
from functools import wraps
from auth import get_user_by_token
from models import User

class UnauthenticatedUser(Exception):
    pass

def sign_in_required():
    def decorator(func):
        @wraps(func)
        def wrapper(root, info, *args, **kwargs):
            kwargs["current_user"] = get_current_user(info.context)
            return func(root, info, *args, **kwargs)
        return wrapper
    return decorator

def get_current_user(context) -> User:
    try:
        token = get_token_from_request(context["request"])
        user = get_user_by_token(context["session"], token)
        if not user:
            raise UnauthenticatedUser("UnauthenticatedUser")
        return user
    except KeyError:
        raise UnauthenticatedUser("UnauthenticatedUser")

def get_token_from_request(request) -> str:
    header = request.headers["Authorization"]
    token = header.replace("Bearer ", "", 1)
    return token

# auth.py
import hashlib
from typing import Optional
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from sqlalchemy.orm import Session
from models import User

SECRET_KEY = "!SECRET!"
TOKEN_EXPIRES_IN = 3600 * 24 * 30

def get_user_by_token(session: Session, token: str) -> Optional[User]:
    serializer = Serializer(SECRET_KEY, expires_in=TOKEN_EXPIRES_IN)
    data = serializer.loads(token)
    return session.query(User).get(data["user_id"])
```

up 필드는 공개 액세스이므로 쿼리를 위해 자격 증명을 전달할 필요가 없습니다. 한편, me 필드는 sign_in_required로 데코레이트되었으므로 적절한 토큰을 전달해야 해결할 수 있습니다.

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

![이미지](/TIL/assets/img/2024-07-09-HowtohandleauthenticationandauthorizationinGraphQLAPI_3.png)

![이미지](/TIL/assets/img/2024-07-09-HowtohandleauthenticationandauthorizationinGraphQLAPI_4.png)

"Authorization" 헤더에 토큰을 전달하지 않고 sign_in_required로 표시된 필드에 접근하면 UnauthenticatedUser 예외가 발생합니다.

![이미지](/TIL/assets/img/2024-07-09-HowtohandleauthenticationandauthorizationinGraphQLAPI_5.png)

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

# 인가

쿼리를 인증하여 로그인한 사용자만 액세스할 수 있도록 제한하는 방법을 살펴보았습니다. 그러나 사용자가 로그인했지만 수행하는 작업이 허용되지 않는 경우는 어떻게 할까요? 예를 들어, 예약한 레스토랑 테이블이 있으며 사용자가 인증되었을 때 허용되어야 하는 경우와 테이블 예약을 취소해야 하는 경우와 같이 사용자가 이전에 생성한 예약만 취소할 수 있는 경우가 있습니다.

우리는 두 가지 작업을 구현했습니다:

- 사용자가 인증되었을 때 허용되어야 하는 BookRestaurantTable 뮤테이션,
- 취소되어야 하는 TableBooking을 취소하는 CancelTableBooking 뮤테이션.

이를 위해 BookRestaurantTable은 sign_in_required로 데코레이트된 mutate 메서드를 사용하고, CancelTableBooking은 authorize_required로 데코레이트된 새로운 메서드를 사용합니다. 이 데코레이터는 사용자가 인증되었는지 확인하고, table_booking_gid(인스턴스의 전역 ID를 나타내는 값)가 인증된 사용자에 의해 생성된 TableBooking 인스턴스와 일치하는지 확인합니다.

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

```js
class BookRestaurantTable(graphene.Mutation):
    class Arguments:
        restaurant_gid = graphene.ID(required=True)
        persons = graphene.Int(required=True)

    table_booking = graphene.Field(TableBookingNode)

    @sign_in_required()
    def mutate(self, info, restaurant_gid: str, persons: int, **kwargs):
        session = info.context["session"]
        current_user = kwargs["current_user"]
        _, restaurant_id = from_global_id(restaurant_gid)
        table_booking = book_restaurant_table(
            session, restaurant_id, current_user.email, persons
        )
        return BookRestaurantTable(
            table_booking=TableBookingNode(
                id=table_booking.id,
                is_active=table_booking.is_active,
            )
        )

class CancelTableBooking(graphene.Mutation):
    class Arguments:
        table_booking_gid = graphene.ID(required=True)

    table_booking = graphene.Field(TableBookingNode)

    @authorize_required(TableBooking)
    def mutate(self, info, table_booking_gid: str, **kwargs):
        session = info.context["session"]
        table_booking = kwargs["instance"]
        cancel_table_booking(session, table_booking)
        return CancelTableBooking(
            table_booking=TableBookingNode(
                id=table_booking.id,
                is_active=table_booking.is_active,
            )
        )

class Mutation(graphene.ObjectType):
    book_restaurant_table = BookRestaurantTable.Field()
    cancel_table_booking = CancelTableBooking.Field()

# api/auth.py
import re
from functools import wraps
from graphene.relay.node import from_global_id
from auth import authorize
from models import User

def camel_to_snake(name: str) -> str:
    """CamelCase -> camel_case"""
    return re.sub(r"(?<!^)(?=[A-Z])", "_", name).lower()

class UnauthorizedAccess(Exception):
    pass

class InstanceNotExist(Exception):
    pass

def authorize_required(model):
    """
    We assume that the global id field name of a resource
    follow convention like:
    model_name: `TableBooking`
    global id field name: `table_booking_gid`
    """
    def decorator(func):
        @wraps(func)
        def wrapper(root, info, *args, **kwargs):
            kwargs["current_user"] = get_current_user(info.context)
            model_name = model.__name__
            gid_field_name = f"{camel_to_snake(model_name)}_gid"
            instance_gid = kwargs[gid_field_name]
            instance_model_name, instance_id = from_global_id(instance_gid)
            if instance_model_name != f"{model_name}Node":
                raise UnauthorizedAccess("UnauthorizedAccess")
            instance = info.context["session"].query(model).get(instance_id)
            if not instance:
                InstanceNotExist()
            kwargs["instance"] = instance
            if not authorize(instance, kwargs["current_user"]):
                raise UnauthorizedAccess("UnauthorizedAccess")
            return func(root, info, *args, **kwargs)
        return wrapper
    return decorator

# auth.py
from functools import singledispatch
from models import TableBooking, User

@singledispatch
def authorize(instance, current_user: User) -> bool:
    raise NotImplementedError

@authorize.register(TableBooking)
def _authorize(instance: TableBooking, current_user: User) -> bool:
    return instance.user_id == current_user.id
```

BookRestaurantTable을 실행하기 위해 restaurant_gid 및 persons라는 두 가지 필수 인수를 전달해야 합니다. "Authorization" 헤더에 토큰을 추가해야 합니다. Mutation 응답에서는 TableBooking.id를 얻습니다.

이미지가 포함된 파일경로: `/assets/img/2024-07-09-HowtohandleauthenticationandauthorizationinGraphQLAPI_6.png`

CancelTableBooking은 BookRestaurantTable 페이로드(TableBooking.id)에서 가져올 수 있는 table_booking_gid만 필요합니다.

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

<img src="/TIL/assets/img/2024-07-09-HowtohandleauthenticationandauthorizationinGraphQLAPI_7.png" />

만약 토큰이 주어진 테이블 예약의 소유자와 일치하지 않는 경우, 동작을 수행할 수 없으며, 권한이 없음 예외가 발생합니다.

<img src="/TIL/assets/img/2024-07-09-HowtohandleauthenticationandauthorizationinGraphQLAPI_8.png" />

# 결론

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

인증 및 권한 부여 단계를 쿼리와 뮤테이션 모두 위한 방법을 소개했어요. 이 구현은 매우 범용적이며 어떤 Python GraphQL 프로젝트에도 쉽게 통합할 수 있어요. 전체 소스 코드는 여기에서 확인할 수 있어요: https://github.com/jorzel/service-layer/tree/auth.
