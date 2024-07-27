---
title: "Flask 모델 작업 성공을 위한 유효성 검사 방법"
description: ""
coverImage: "/TIL/assets/no-image.jpg"
date: 2024-07-09 14:53
ogImage: 
  url: /TIL/assets/no-image.jpg
tag: Tech
originalTitle: "Working with Flask Models: Validate Your Way to Success!"
link: "https://medium.com/@turtle40965/working-with-flask-models-validate-your-way-to-success-e1fe7af96737"
---


알다시피, Flask는 간단하고 유연성이 뛰어난 Python의 인기 웹 프레임워크입니다. Flask를 사용하여 애플리케이션을 개발할 때 데이터를 나타내는 방법으로 모델을 사용해야 합니다. 이 블로그에서는 Flask에서 모델을 작성하고 데이터 유효성 검사에 @validates 데코레이터를 사용하는 방법을 탐구해보겠습니다.

SQLAlchemy로 Flask 설정하기

시작하려면 Flask와 SQLAlchemy를 설정해야 합니다. SQLAlchemy는 Flask에서 데이터베이스 작업을 쉽게 할 수 있도록 해주는 강력한 ORM(객체 관계 매퍼)입니다. 필요한 패키지를 설치하고 Flask 애플리케이션을 설정하는 방법부터 시작해봅시다.

```js
# 서버/app.py 파일에서
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
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

이 설정에서는 Flask 애플리케이션을 생성하고 'app.db'라는 SQLite 데이터베이스를 사용하도록 구성하며, SQLAlchemy는 Flask 앱과 함께 초기화됩니다.

기본 모델 생성

다음으로, 애플리케이션에서 데이터를 나타내는 기본 모델을 만들어 보겠습니다. id, username 및 email 필드가 있는 간단한 User 모델을 정의해 보겠습니다.

```js
class User(db.Model):
    __tablename__='users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'
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

이 예시에서는 사용자 클래스를 정의했습니다. 이 클래스는 db.Model을 상속하며, 데이터베이스에서 'users'라는 테이블을 생성합니다. 이 테이블은 세 개의 열(id, username, email)을 가지고 있습니다. id는 정수를 취하며 기본 키이므로 자체 증가하며, username은 최대 80자의 문자열을 취하며 고유해야하고 비워둘 수 없습니다. 이메일 열은 username과 같이 작동하지만 120자를 취합니다. 또한 모델 인스턴스의 문자열 표현을 제공하는 __repr__ 메서드도 추가했습니다. 다음 섹션에서는 이러한 데이터 유형에 더 많은 제한을 설정하는 방법에 대해 더 자세히 설명하겠습니다.

필드 유효성 검사를 위해 @validates 사용

유효성 검사는 데이터베이스에 추가되는 데이터의 무결성을 보장하기 위해 중요합니다. Flask-SQLAlchemy는 데이터가 데이터베이스에 쓰여지기 전에 데이터 필드를 유효성 검사할 수 있도록 하는 @validates 데코레이터를 제공합니다. 사용자 모델에 유효성 검사를 추가해봅시다.

```python
from sqlalchemy.orm import validates

class User(db.Model):

    __tablename__='users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    @validates('username')
    def validate_username(self, key, username):
        if not username:
            raise ValueError("Username cannot be empty")
        if len(username) < 3:
            raise ValueError("Username must be at least 3 characters long")
        return username

    @validates('email')
    def validate_email(self, key, email):
        if '@' not in email:
            raise ValueError("Invalid email address")
        return email

    def __repr__(self):
        return f'<User {self.username}>'
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

이 예시에서는 username과 email 필드에 대한 유효성 검사 방법을 추가하는 @validates 데코레이터를 사용합니다. validate_user 함수에서 "if not username:"를 사용하여 User 테이블에 새 인스턴스 데이터가 추가될 때 username이 있는지 확인합니다. 만약 없다면 ValueError를 발생시킵니다. 이 함수에서 "if len(username) ` 3"을 사용하여 username이 적어도 3자 이상이어야 하며 그렇지 않으면 다른 ValueError를 발생시킵니다. 두 번째 유효성 검사인 validate_email에서는 주어진 이메일이 적어도 `@` 기호를 포함해야 유효하다고 확인하고 있습니다.

레코드 생성 및 유효성 검사

이제 모델과 유효성 검사가 준비되었으므로 테스트해 보겠습니다. 새 레코드를 만들고 사용자를 데이터베이스에 추가할 때 발생하는 유효성 오류를 처리하는 방법을 보여드리겠습니다.

```js
#server/app.py
@app.route('/add_user')
def add_user():
    try:
        new_user = User(username='js', email='jsmith@example.com')
        db.session.add(new_user)
        db.session.commit()
        return "사용자가 성공적으로 추가되었습니다!"
    except ValueError as e:
        return str(e)

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
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

이 예시에서는 유효하지 않은 사용자 이름(`js`)으로 새 사용자를 추가하려고 시도합니다. 유효성 검사 로직에서 문제를 감지하면 ValueError가 발생합니다. 이 예외를 처리하고 적절한 오류 메시지를 반환하여 데이터베이스에 유효한 데이터만 추가되도록 합니다. 이 방법을 통해 데이터 무결성을 유지하고 잘못된 항목을 방지할 수 있습니다.

결론

총론적으로, 이 블로그가 Python Flask 코드에서 @validates 데코레이터가 어떻게 작동하는지 더 잘 알 수 있도록 도움이 되었으면 좋겠습니다. 모델 설정, 유효성 검사 구현, 오류 처리, 고급 유효성 검사 기법 탐색을 통해 Flask 애플리케이션이 데이터 무결성을 유지하고 비즈니스 규칙을 준수하도록 할 수 있습니다. 이러한 도구를 활용하면 견고하고 신뢰할 수 있는 웹 애플리케이션을 만들 수 있습니다.