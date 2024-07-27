---
title: "Flask와 SQLAlchemy를 사용한 데이터베이스 통합 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-07-UsingFlaskwithSQLAlchemyforDatabaseIntegration_0.png"
date: 2024-07-07 02:30
ogImage:
  url: /assets/img/2024-07-07-UsingFlaskwithSQLAlchemyforDatabaseIntegration_0.png
tag: Tech
originalTitle: "Using Flask with SQLAlchemy for Database Integration"
link: "https://medium.com/@oludakevin/using-flask-with-sqlalchemy-for-database-integration-f2d7182ef0f1"
---

이 기사에서는 SQLAlchemy를 사용하여 Flask 애플리케이션에 데이터베이스를 통합하는 방법에 대해 살펴볼 것입니다. SQLAlchemy는 데이터베이스 상호 작용을 훨씬 쉽게 만드는 파이썬용 강력한 SQL 툴킷 및 객체 관계 매핑(ORM) 라이브러리입니다.

![이미지](/TIL/assets/img/2024-07-07-UsingFlaskwithSQLAlchemyforDatabaseIntegration_0.png)

SQLAlchemy란 무엇인가요?
SQLAlchemy는 개발자들이 파이썬 객체를 사용하여 데이터베이스 작업을 수행할 수 있는 인기 있는 ORM 라이브러리로, 원시 SQL 쿼리를 작성하지 않고도 데이터베이스 작업을 더 쉽게 관리할 수 있게 해줍니다.

## Flask 및 SQLAlchemy 설정하기

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

우선, 컴퓨터에 Python이 설치되어 있는지 확인하세요. 그런 다음 pip를 사용하여 Flask와 SQLAlchemy를 설치하세요:

```js
pip install Flask SQLAlchemy
```

SQLAlchemy를 사용한 기본 Flask 애플리케이션 만들기

- 프로젝트 구조: 프로젝트 구조를 다음과 같이 설정하세요:

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
flask_sqlalchemy_example/
├── app.py
├── config.py
├── models.py
└── requirements.txt
```

2. Configuration: 데이터베이스 구성을 저장하는 config.py 파일을 만들어보세요:

```python
import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
```

3. 모델 정의: 데이터베이스 모델을 정의하는 models.py 파일을 생성하세요:

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

```python
아래는 Flask 애플리케이션을 개발하기 위한 코드 예제입니다.

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'

4. Flask 애플리케이션 생성: 메인 애플리케이션 파일인 app.py를 생성하세요.

from flask import Flask
from config import Config
from models import db, User

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

@app.before_first_request
def create_tables():
    db.create_all()

@app.route('/')
def home():
    return "Flask with SQLAlchemy 예제에 오신 것을 환영합니다!"

if __name__ == '__main__':
    app.run(debug=True)

5. 애플리케이션 실행: 애플리케이션을 실행하고 데이터베이스를 생성하세요.

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

python app.py

## CRUD 작업 추가하기

이제 사용자 모델을 관리하기 위해 CRUD(Create, Read, Update, Delete) 작업을 추가해 봅시다.

- 사용자 생성: 새 사용자를 생성하는 라우트를 추가하세요:

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

from flask import request, jsonify

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = User(username=data['username'], email=data['email'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': '사용자가 성공적으로 생성되었습니다!'}), 201

2. 모든 사용자 가져오기: 모든 사용자를 가져오는 라우트를 추가합니다:

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{'id': user.id, 'username': user.username, 'email': user.email} for user in users])

3. 단일 사용자 가져오기: ID로 사용자를 가져오는 라우트를 추가합니다:

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

@app.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify({'id': user.id, 'username': user.username, 'email': user.email})

4. 사용자 업데이트: ID로 사용자를 업데이트하는 라우트를 추가하세요:

@app.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    data = request.get_json()
    user = User.query.get_or_404(id)
    user.username = data['username']
    user.email = data['email']
    db.session.commit()
    return jsonify({'message': '사용자가 성공적으로 업데이트되었습니다!'})

5. 사용자 삭제: ID로 사용자를 삭제하는 라우트를 추가하세요:

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

@app.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': '사용자가 성공적으로 삭제되었습니다!'})

최종 app.py 코드

CRUD 작업이 모두 포함된 완성된 app.py는 아래와 같습니다:
from flask import Flask, request, jsonify
from config import Config
from models import db, User

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

@app.before_first_request
def create_tables():
    db.create_all()

@app.route('/')
def home():
    return "Flask with SQLAlchemy 예제에 오신 것을 환영합니다!"

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = User(username=data['username'], email=data['email'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': '사용자가 성공적으로 생성되었습니다!'}), 201

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{'id': user.id, 'username': user.username, 'email': user.email} for user in users])

@app.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify({'id': user.id, 'username': user.username, 'email': user.email})

@app.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    data = request.get_json()
    user = User.query.get_or_404(id)
    user.username = data['username']
    user.email = data['email']
    db.session.commit()
    return jsonify({'message': '사용자가 성공적으로 업데이트되었습니다!'})

@app.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': '사용자가 성공적으로 삭제되었습니다!'})

if __name__ == '__main__':
    app.run(debug=True)

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

이 글에서는 SQLAlchemy를 Flask와 통합하여 데이터베이스 작업을 관리하는 방법을 다루었습니다. 우리는 간단한 사용자 모델을 생성하고 데이터베이스와 상호 작용하기 위한 CRUD 작업을 구현했습니다. SQLAlchemy의 ORM 기능은 Flask 애플리케이션에서 데이터베이스 관리를 위한 강력한 도구로 만들어 줍니다.
```
