---
title: "파스트 API와 RabbitMQ를 이용한 엔드-투-엔드 마이크로서비스 구축하기 포괄적 안내"
description: ""
coverImage: "/assets/img/2024-06-20-BuildingEnd-to-EndMicroserviceswithFastAPIandRabbitMQAComprehensiveGuide_0.png"
date: 2024-06-20 01:54
ogImage: 
  url: /assets/img/2024-06-20-BuildingEnd-to-EndMicroserviceswithFastAPIandRabbitMQAComprehensiveGuide_0.png
tag: Tech
originalTitle: "Building End-to-End Microservices with FastAPI and RabbitMQ: A Comprehensive Guide"
link: "https://medium.com/@snimkar1905/building-microservices-with-fastapi-and-rabbitmq-part1-1104dbd4ad96"
isUpdated: true
---





![image](/assets/img/2024-06-20-BuildingEnd-to-EndMicroserviceswithFastAPIandRabbitMQAComprehensiveGuide_0.png)

# 소개:

최근 몇 년간, 마이크로서비스 아키텍처는 확장 가능하고 유지보수 가능하며 유연한 애플리케이션을 만드는 능력 때문에 인기를 얻었습니다. 이 블로그 포스트에서는 마이크로서비스 아키텍처의 개념을 탐구하고, 파이썬 생태계의 강력한 도구인 FastAPI와 RabbitMQ를 사용하여 간단한 마이크로서비스를 구축하는 방법을 보여드리겠습니다.

# 몰리딕 아키텍처란? 


<div class="content-ad"></div>

단일체 아키텍처는 모든 비즈니스 관심을 결합하는 단일 대규모 컴퓨팅 네트워크로, 하나의 코드 베이스로 생각해 볼 수 있습니다. 애플리케이션의 모든 구성 요소를 하나의 지붕 아래에 모아둔 거대하고 빙하처럼 보이는 구조라고 상상해보세요. 단일체에서 변경을 하려면 전체 스택을 업데이트해야 하며, 이는 시간이 많이 소요되고 엄격할 수 있습니다. 아래 다이어그램에서 단일체 아키텍처의 예시를 볼 수 있습니다.

![단일체 아키텍처 다이어그램](/assets/img/2024-06-20-BuildingEnd-to-EndMicroserviceswithFastAPIandRabbitMQAComprehensiveGuide_1.png)

# 마이크로서비스 아키텍처란?

반면에, 마이크로서비스 아키텍처는 응용 프로그램이 작은, 독립적으로 배포 가능한 서비스로 분할되는 접근 방식입니다. 각 서비스는 해당하는 비즈니스 로직과 데이터베이스를 갖고 있으며, 가벼운 프로토콜을 통해 다른 서비스와 통신합니다. 이 접근 방식은 빠른 개발 주기, 쉬운 유지보수, 그리고 더 나은 확장성을 가능하게 합니다.

<div class="content-ad"></div>

<img src="/assets/img/2024-06-20-BuildingEnd-to-EndMicroserviceswithFastAPIandRabbitMQAComprehensiveGuide_2.png" />

# Monolithic vs. Microservice의 차이

<img src="/assets/img/2024-06-20-BuildingEnd-to-EndMicroserviceswithFastAPIandRabbitMQAComprehensiveGuide_3.png" />

# RabbitMQ는 무엇이며, 왜 마이크로서비스를 구축하는 데 사용되는가?

<div class="content-ad"></div>

RabbitMQ는 진보된 메시지 큐잉 프로토콜(AMQP)을 구현하는 메시지 브로커입니다. RabbitMQ는 분산 시스템의 다양한 구성 요소 사이에서 중개자 역할을 하여 효율적으로 통신하고 작업을 조정할 수 있도록 합니다. RabbitMQ가 마이크로서비스 아키텍처에서 흔히 사용되는 이유는 다음과 같습니다:

- Decoupling: RabbitMQ는 시스템 구성 요소들을 비동기적으로 통신할 수 있게 함으로써 시스템을 분리하는 데 도움을 줍니다. 이는 서비스가 서로의 응답을 기다리지 않고 독립적으로 작동할 수 있어 더 견고하고 확장 가능한 시스템을 이끌어냅니다.
- Load Balancing: RabbitMQ는 메시지를 여러 소비자 인스턴스에 분배함으로써 부하를 균형 있게 분배하고 효율적인 자원 활용을 보장합니다.
- Fault Tolerance: RabbitMQ는 클러스터링과 복제를 지원하여 노드가 실패해도 메시지가 손실되지 않도록 합니다. 이는 시스템을 더욱 고장 내성이 뛰어나고 신뢰할 수 있도록 만듭니다.
- Scalability: RabbitMQ를 사용하면 소비자 인스턴스나 클러스터에 노드를 추가하여 시스템을 확장할 수 있어 애플리케이션이 성장함에 따라 증가하는 메시지 트래픽을 처리할 수 있습니다.
- Message Routing: RabbitMQ는 직접, 주제, 팬아웃과 같은 다양한 메시지 라우팅 메커니즘을 지원하여 라우팅 키나 패턴에 따라 특정 큐로 메시지를 전달할 수 있습니다.
- Message Acknowledgment: RabbitMQ는 메시지 승인을 지원하여 메시지가 한 번만 처리되고 전송 중에 손실되지 않도록 보장합니다.
- 전반적으로 RabbitMQ는 확장 가능하고 분리되고 고장 내성이 뛰어난 마이크로서비스 아키텍처를 구축하는 데 도움이 되는 견고하고 신뢰할 수 있는 메시징 시스템입니다.

# 마이크로서비스 응용프로그램 코딩

# 1. 프로젝트 소개

<div class="content-ad"></div>

저희 어플리케이션은 네 가지 주요 서비스로 구성되어 있습니다:

- Gateway Service: 이 서비스는 모든 들어오는 요청의 진입 지점 역할을 합니다. 요청을 적절한 마이크로서비스로 라우팅하고 어플리케이션의 전체적인 조정을 담당합니다.
- ML Service: ML 서비스는 이미지 데이터를 처리하는 역할을 합니다. Keras OCR을 사용하여 이미지에서 텍스트를 추출하고 Gateway Service와 통신하여 이미지 데이터를 받아 추출된 텍스트를 전송합니다.
- Auth Service: Auth 서비스는 사용자 인증 및 이메일 인증을 처리합니다. 사용자 등록, OTP 생성 및 검증, 이메일 인증 확인 기능이 포함되어 있습니다.
- Notification Service: 이 서비스는 사용자에게 이메일을 보내는 역할을 합니다. 프로세스가 완료될 때 트리거됩니다.

## 2. 준비 사항

시작하기 전에 다음 사항을 확인해주세요:

<div class="content-ad"></div>

- 시스템에 Docker가 설치되어 있습니다.
- 시스템에 Python이 설치되어 있습니다.
- Docker, Python 및 PostgreSQL에 대한 기본 지식이 있습니다.

# 3. 요구 사항 설정

## Docker를 사용하여 PostgreSQL 설치

PostgreSQL을 Docker를 사용하여 설치하려면 다음 명령을 실행하십시오:

<div class="content-ad"></div>

```js
도커를 사용하여 RabbitMQ를 설치하기 위해서는 다음 명령어를 실행하세요:

도커를 실행하여 RabbitMQ를 설치하려면 다음 명령어를 실행하세요:

<div class="content-ad"></div>

# 4. 프로젝트 설정하기

## A. 프로젝트 폴더 설정하기

microservices-demo/
│
├── gateway/
│ ├── rpc_client.py
│ ├── .env 
│ ├── requirements.txt
│ └── main.py
│
├── ml_services/
│ ├── requirements.txt
│ ├── artifacts/
│ ├── .env
│ └── main.py
│
├── notification_service/
│ ├── email_service.py
│ ├── requirements.txt
│ ├── .env
│ └── main.py
│
├── auth/
│ ├── database.py
│ ├── models.py
│ ├── schemas.py
│ ├── service.py
│ ├── requirements.txt
│ ├── .env
│ └── main.py
│
└── README.md

## B. 게이트웨이 구현하기

<div class="content-ad"></div>

이제 게이트웨이 서비스를 구현해 봅시다. gateway/ 디렉토리에 main.py 파일을 만들어 아래 코드를 추가해주세요:

from fastapi import FastAPI, HTTPException, File, UploadFile
import fastapi as _fastapi
from fastapi.security import OAuth2PasswordBearer
from dotenv import load_dotenv
from jwt.exceptions import DecodeError
from pydantic import BaseModel
import requests
import base64
import pika
import logging
import os
import jwt
import rpc_client

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# 환경 변수 로드
load_dotenv()
logging.basicConfig(level=logging.INFO)

# 환경 변수 가져오기
JWT_SECRET = os.environ.get("JWT_SECRET")
AUTH_BASE_URL = os.environ.get("AUTH_BASE_URL")
RABBITMQ_URL = os.environ.get("RABBITMQ_URL")

# RabbitMQ에 연결
connection = pika.BlockingConnection(pika.ConnectionParameters(RABBITMQ_URL))
channel = connection.channel()
channel.queue_declare(queue='gatewayservice')
channel.queue_declare(queue='ocr_service')

# JWT 토큰 유효성 검사
async def jwt_validation(token: str = _fastapi.Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return payload
    except DecodeError:
        raise HTTPException(status_code=401, detail="Invalid JWT token")

# 요청 바디를 위한 Pydantic 모델
class GenerateUserToken(BaseModel):
    username: str
    password: str

class UserCredentials(BaseModel):
    username: str
    password: str

class UserRegisteration(BaseModel):
    name: str
    email: str
    password: str

class GenerateOtp(BaseModel):
    email: str

class VerifyOtp(BaseModel):
    email: str
    otp: int

# 인증 라우트
@app.post("/auth/login", tags=['Authentication Service'])
async def login(user_data: UserCredentials):
    try:
        response = requests.post(f"{AUTH_BASE_URL}/api/token", json={"username": user_data.username, "password": user_data.password})
        if response.status_code == 200:
            return response.json()
        else:
            raise HTTPException(status_code=response.status_code, detail=response.json())
    except requests.exceptions.ConnectionError:
        raise HTTPException(status_code=503, detail="Authentication service is unavailable")

@app.post("/auth/register", tags=['Authentication Service'])
async def registeration(user_data: UserRegisteration):
    try:
        response = requests.post(f"{AUTH_BASE_URL}/api/users", json={"name": user_data.name, "email": user_data.email, "password": user_data.password})
        if response.status_code == 200:
            return response.json()
        else:
            raise HTTPException(status_code=response.status_code, detail=response.json())
    except requests.exceptions.ConnectionError:
        raise HTTPException(status_code=503, detail="Authentication service is unavailable")

@app.post("/auth/generate_otp", tags=['Authentication Service'])
async def generate_otp(user_data: GenerateOtp):
    try:
        response = requests.post(f"{AUTH_BASE_URL}/api/users/generate_otp", json={"email": user_data.email})
        if response.status_code == 200:
            return response.json()
        else:
            raise HTTPException(status_code=response.status_code, detail=response.json())
    except requests.exceptions.ConnectionError:
        raise HTTPException(status_code=503, detail="Authentication service is unavailable")

@app.post("/auth/verify_otp", tags=['Authentication Service'])
async def verify_otp(user_data: VerifyOtp):
    try:
        response = requests.post(f"{AUTH_BASE_URL}/api/users/verify_otp", json={"email": user_data.email, "otp": user_data.otp})
        if response.status_code == 200:
            return response.json()
        else:
            raise HTTPException(status_code=response.status_code, detail=response.json())
    except requests.exceptions.ConnectionError:
        raise HTTPException(status_code=503, detail="Authentication service is unavailable")

# 확장 서비스 OCR 라우트
@app.post('/ocr', tags=['Machine learning Service'])
def ocr(file: UploadFile = File(...), payload: dict = _fastapi.Depends(jwt_validation)):
    # 파일을 임시 위치에 저장
    with open(file.filename, "wb") as buffer:
        buffer.write(file.file.read())

    ocr_rpc = rpc_client.OcrRpcClient()

    with open(file.filename, "rb") as buffer:
        file_data = buffer.read()
        file_base64 = base64.b64encode(file_data).decode()

    request_json = {
        'user_name': payload['name'],
        'user_email': payload['email'],
        'user_id': payload['id'],
        'file': file_base64
    }

    # OCR 마이크로서비스에 요청 JSON을 사용하여 호출
    response = ocr_rpc.call(request_json)

    # 임시 이미지 파일 삭제
    os.remove(file.filename)
    return response

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=5001, reload=True)

게이트웨이 환경을 설정하려면 gateway 폴더에 .env 파일을 만드세요.

AUTH_BASE_URL=http://0.0.0.0:5000
JWT_SECRET=e56623570e0a0152989fd38e13da9cd6eb7031e4e039e939ba845167ee59b496
RABBITMQ_URL=localhost

<div class="content-ad"></div>

다른 마이크로서비스와 통신하기 위해 RabbitMQ를 사용할 것입니다. 이는 서비스 간 비동기 메시징을 가능하게 하는 메시지 브로커입니다. RabbitMQ 서버와의 통신을 처리하기 위해 gateway/ 디렉토리에 rpc_client.py 파일을 생성할 것입니다.

import pika
import uuid
import json
from dotenv import load_dotenv
import os

# 환경 변수 로딩
load_dotenv()
RABBITMQ_URL = os.environ.get("RABBITMQ_URL")

class OcrRpcClient(object):

    def __init__(self):
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters(host=RABBITMQ_URL))

        self.channel = self.connection.channel()

        result = self.channel.queue_declare(queue='', exclusive=True)
        self.callback_queue = result.method.queue

        self.channel.basic_consume(
            queue=self.callback_queue,
            on_message_callback=self.on_response,
            auto_ack=True)

    def on_response(self, ch, method, props, body):
        if self.corr_id == props.correlation_id:
            self.response = body

    def call(self, message):
        self.response = None
        self.corr_id = str(uuid.uuid4())
        self.channel.basic_publish(
            exchange='',
            routing_key='ocr_service',
            properties=pika.BasicProperties(
                reply_to=self.callback_queue,
                correlation_id=self.corr_id,
            ),
            body=json.dumps(message))
        while self.response is None:
            self.connection.process_data_events()
        response_json = json.loads(self.response)
        return response_json

이 코드는 RabbitMQ를 사용하여 OCR 마이크로서비스(ML 마이크로서비스)로 메시지를 보내기 위한 클라이언트 클래스인 OcrRpcClient를 정의합니다. 연결을 초기화하고, 응답을 위한 콜백 큐를 설정하고, 메시지를 보내고 응답을 비동기적으로 받을 수 있는 방법을 제공합니다.

- 초기화(__init__):

<div class="content-ad"></div>

RabbitMQ에 연결을 설정합니다. 채널을 생성하고 고유한 콜백 큐를 선언합니다. 콜백 큐에서 응답을 수신하기 위해 소비자를 설정합니다.

2. 요청 보내기 (호출):

OCR 마이크로서비스(ML 마이크로서비스)에 메시지를 보냅니다. 콜백 큐에서 응답을 기다리고 반환합니다.

이 클래스는 RabbitMQ를 사용하여 게이트웨이 서비스가 OCR 마이크로서비스와 효율적으로 통신할 수 있게 합니다.

<div class="content-ad"></div>

## C. Auth 마이크로서비스 구현

이 코드는 FastAPI를 사용하여 사용자 등록, 로그인, JWT 토큰 생성, OTP를 사용한 이메일 확인 및 사용자 프로필 검색을 제공하는 인증 서비스를 구현합니다. 데이터베이스 작업에는 SQLAlchemy를 사용하고 OTP 이메일을 보내기 위해 RabbitMQ를 사용합니다. 이 서비스에는 사용자 생성, JWT 토큰 생성, 사용자 프로필 검색 및 이메일 확인을 위한 OTP 확인에 대한 엔드포인트가 포함되어 있습니다.

from typing import List
from fastapi import HTTPException 
import fastapi as _fastapi
import schemas as _schemas
import sqlalchemy.orm as _orm
import models as _models
import service as _services
import logging
import database as _database
import pika

# rabbitmq connection
connection = pika.BlockingConnection(pika.ConnectionParameters(host="localhost"))
channel = connection.channel()
channel.queue_declare(queue='email_notification')

def get_db():
    db = _database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

app = _fastapi.FastAPI()
logging.basicConfig(level=logging.INFO)
_models.Base.metadata.create_all(_models.engine)

@app.post("/api/users", tags=['사용자 인증'])
async def create_user(
    user: _schemas.UserCreate, 
    db: _orm.Session = _fastapi.Depends(_services.get_db)):
    db_user = await _services.get_user_by_email(email=user.email, db=db)

    if db_user:
        logging.info('해당 이메일로 이미 가입된 사용자가 있습니다')
        raise _fastapi.HTTPException(
            status_code=200,
            detail="해당 이메일로 이미 가입된 사용자가 있습니다")

    user = await _services.create_user(user=user, db=db)

    return _fastapi.HTTPException(
            status_code=201,
            detail="사용자 등록이 완료되었습니다. 계정을 활성화하려면 이메일을 확인하세요!")

# API 상태 확인 엔드포인트
@app.get("/check_api")
async def check_api():
    return {"status": "API와 연결되었습니다"}

@app.post("/api/token", tags=['사용자 인증'])
async def generate_token(
    user_data: _schemas.GenerateUserToken,
    db: _orm.Session = _fastapi.Depends(_services.get_db)):
    user = await _services.authenticate_user(email=user_data.username, password=user_data.password, db=db)

    if user == "is_verified_false":
        logging.info('이메일 확인이 필요합니다. 계속하려면 이메일을 확인하세요.')
        raise _fastapi.HTTPException(
            status_code=403, detail="이메일 확인이 필요합니다. 계속하려면 이메일을 확인하세요.")

    if not user:
        logging.info('잘못된 자격 증명')
        raise _fastapi.HTTPException(
            status_code=401, detail="잘못된 자격 증명")

    logging.info('JWT 토큰이 생성되었습니다.')
    return await _services.create_token(user=user)

@app.get("/api/users/me", response_model=_schemas.User, tags=['사용자 인증'])
async def get_user(user: _schemas.User = _fastapi.Depends(_services.get_current_user)):
    return user

@app.get("/api/users/profile", tags=['사용자 인증'])
async def get_user(email: str, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    return db.query(_models.User and _models.Address).filter_by(id=1).first()

@app.post("/api/users/generate_otp", response_model=str, tags=["사용자 인증"])
async def send_otp_mail(userdata: _schemas.GenerateOtp, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    user = await _services.get_user_by_email(email=userdata.email, db=db)

    if not user:
        raise _fastapi.HTTPException(status_code=404, detail="사용자를 찾을 수 없습니다")

    if user.is_verified:
        raise _fastapi.HTTPException(status_code=400, detail="이미 확인된 사용자입니다")

    # OTP 생성 및 전송
    otp = _services.generate_otp()
    print(otp)
    _services.send_otp(userdata.email, otp, channel)

    # OTP를 데이터베이스에 저장
    user.otp = otp
    db.add(user)
    db.commit()

    return "이메일로 OTP가 전송되었습니다"

@app.post("/api/users/verify_otp", tags=["사용자 인증"])
async def verify_otp(userdata: _schemas.VerifyOtp, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    user = await _services.get_user_by_email(email=userdata.email, db=db )

    if not user:
        raise _fastapi.HTTPException(status_code=404, detail="사용자를 찾을 수 없습니다")

    if not user.otp or user.otp != userdata.otp:
        raise _fastapi.HTTPException(status_code=400, detail="잘못된 OTP")

    # 사용자의 is_verified 필드 업데이트
    user.is_verified = True
    user.otp = None  # OTP 초기화
    db.add(user)
    db.commit()

    return "이메일 확인이 성공적으로 완료되었습니다"

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=True)

이 코드는 PostgreSQL 데이터베이스에 연결하기 위해 SQLAlchemy 엔진과 세션 메이커를 설정합니다. dotenv를 사용하여 환경 변수에서 데이터베이스 연결 세부 정보를 로드합니다. DATABASE_URL은 호스트, 데이터베이스 이름, 사용자 이름 및 암호를 포함하여 검색된 환경 변수를 사용하여 구성됩니다. 데이터베이스 연결 세부를 사용하여 create_engine를 사용하여 엔진을 생성하고 해당 엔진에 바인딩된 세션 메이커인 SessionLocal을 정의합니다. ORM 모델을 정의하는 Declarative Base로 사용하기 위해 Base 변수가 초기화됩니다.

<div class="content-ad"></div>

import sqlalchemy as _sql
import sqlalchemy.ext.declarative as _declarative
import sqlalchemy.orm as _orm
from dotenv import load_dotenv
import os

# .env 파일에서 환경 변수를 불러옵니다
load_dotenv()

# 환경 변수를 가져옵니다
postgres_host = os.environ.get("POSTGRES_HOST")
postgres_db = os.environ.get("POSTGRES_DB")
postgres_user = os.environ.get("POSTGRES_USER")
postgres_password = os.environ.get("POSTGRES_PASSWORD")

# PostgreSQL 서버가 로컬에서 실행 중이라고 가정하고 'mydatabase'라는 이름의 데이터베이스가 있다고 가정합니다
DATABASE_URL = f"postgresql://{postgres_user}:{postgres_password}@{postgres_host}/{postgres_db}"

engine = _sql.create_engine(DATABASE_URL)
SessionLocal = _orm.sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = _declarative.declarative_base()

이 코드는 사용자 및 주소 테이블에 대한 SQLAlchemy 모델을 정의하며, 사용자 정보 및 주소를 저장하고 이들 사이의 관계를 설정합니다. 또한 제공된 엔진을 사용하여 데이터베이스에 테이블을 생성합니다.

import datetime as _dt
import sqlalchemy as _sql
import sqlalchemy.orm as _orm
import passlib.hash as _hash
from database import Base, engine
import database as _database

Base.metadata.create_all(engine)

class User(_database.Base):
    __tablename__ = "users"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    name = _sql.Column(_sql.String)
    email = _sql.Column(_sql.String, unique=True, index=True)
    is_verified = _sql.Column(_sql.Boolean, default=False)
    otp = _sql.Column(_sql.Integer)
    hashed_password = _sql.Column(_sql.String)
    addresses = _orm.relationship("Address", back_populates="user")
    date_created = _sql.Column(_sql.DateTime, default=_dt.datetime.utcnow)

    def verify_password(self, password: str):
        return _hash.bcrypt.verify(password, self.hashed_password)

class Address(_database.Base):
    __tablename__ = "addresses"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    street = _sql.Column(_sql.String)
    landmark = _sql.Column(_sql.String)
    city = _sql.Column(_sql.String)
    country = _sql.Column(_sql.String)
    pincode = _sql.Column(_sql.String)
    user_id = _sql.Column(_sql.Integer, _sql.ForeignKey("users.id"))
    user = _orm.relationship("User", back_populates="addresses")
    latitude = _sql.Column(_sql.Float)
    longitude = _sql.Column(_sql.Float)

이 코드는 사용자 관련 데이터 구조에 대한 Pydantic 모델을 정의하며, 사용자 생성, 인증 및 OTP 확인용입니다. 위치 정보를 위한 주소 모델도 포함되어 있습니다. 이 모델들은 사전 속성으로부터 인스턴스를 자동으로 생성하도록 구성되어 있습니다.

<div class="content-ad"></div>

이 코드는 사용자 인증 및 OTP(일회용 비밀번호) 생성 및 확인을 위한 다양한 함수 및 종속성을 정의합니다. HTTP 요청을 처리하기 위해 FastAPI를 사용하며, 데이터베이스 작업을 위해 SQLAlchemy를 사용하고 데이터 유효성 검사 및 직렬화를 위해 Pydantic을 사용하며, 인증을 위해 JWT를 사용하고, 이메일 알림을 보내기 위해 RabbitMQ를 사용합니다. 이 함수들은 데이터베이스 생성, 데이터베이스 세션 가져오기, 새 사용자 생성, 사용자 인증, JWT 토큰 생성, JWT 토큰에서 현재 사용자 가져오기, 무작위 OTP 생성, RabbitMQ에 연결 및 OTP 이메일 알림 전송 등이 포함됩니다.

환경 변수 로드

JWT_SECRET = os.getenv("JWT_SECRET")
RABBITMQ_URL = os.getenv("RABBITMQ_URL")
oauth2schema = _security.OAuth2PasswordBearer("/api/token")

데이터베이스 생성

def create_database():
    # 데이터베이스 테이블 생성
    return _database.Base.metadata.create_all(bind=_database.engine)

데이터베이스 세션 가져오기

def get_db():
    # 데이터베이스 세션을 얻는 의존성
    db = _database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

이메일별 사용자 가져오기

async def get_user_by_email(email: str, db: _orm.Session):
    # 데이터베이스에서 이메일별로 사용자 검색
    return db.query(_models.User).filter(_models.User.email == email and _models.User.is_verified == True).first()

새 사용자 생성

async def create_user(user: _schemas.UserCreate, db: _orm.Session):
    # 데이터베이스에 새 사용자 생성
    try:
        valid = _email_check.validate_email(user.email)
        name = user.name
        email = valid.email
    except _email_check.EmailNotValidError:
        raise _fastapi.HTTPException(status_code=404, detail="정확한 이메일을 입력하세요")

    user_obj = _models.User(email=email, name=name, hashed_password=_hash.bcrypt.hash(user.password))
    db.add(user_obj)
    db.commit()
    db.refresh(user_obj)
    return user_obj

사용자 인증

async def authenticate_user(email: str, password: str, db: _orm.Session):
    # 사용자 인증
    user = await get_user_by_email(email=email, db=db)

    if not user:
        return False
    
    if not user.is_verified:
        return 'is_verified_false'
    
    if not user.verify_password(password):
        return False

    return user

JWT 토큰 생성

async def create_token(user: _models.User):
    # 인증을 위한 JWT 토큰 생성
    user_obj = _schemas.User.from_orm(user)
    user_dict = user_obj.model_dump()
    del user_dict["date_created"]
    token = jwt.encode(user_dict, JWT_SECRET, algorithm="HS256")
    return dict(access_token=token, token_type="bearer")

현재 사용자 가져오기

async def get_current_user(db: _orm.Session = _fastapi.Depends(get_db), token: str = _fastapi.Depends(oauth2schema)):
    # JWT 토큰에서 현재 인증된 사용자 가져오기
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        user = db.query(_models.User).get(payload["id"])
    except:
        raise _fastapi.HTTPException(status_code=401, detail="유효하지 않은 이메일 또는 비밀번호")
    return _schemas.User.from_orm(user)

랜덤 OTP 생성

def generate_otp():
    # 랜덤 OTP 생성
    return str(random.randint(100000, 999999))

RabbitMQ에 연결

def connect_to_rabbitmq():
    # RabbitMQ에 연결
    while True:
        try:
            connection = pika.BlockingConnection(pika.ConnectionParameters(RABBITMQ_URL))
            return connection
        except pika.exceptions.AMQPConnectionError:
            print("RabbitMQ에 연결하지 못했습니다. 5초 후 다시 시도 중...")
            time.sleep(5)

OTP 이메일 알림 전송

def send_otp(email, otp, channel):
    # RabbitMQ를 사용하여 OTP 이메일 알림 전송
    connection = connect_to_rabbitmq()
    channel = connection.channel()
    message = {'email': email,
               'subject': '계정 확인 OTP 알림',
               'other': 'null',
               'body': f'계정 확인을 위한 OTP는 다음과 같습니다: {otp} \n 계정 설정을 완료하려면 확인 페이지에 이 OTP를 입력하세요. \n 이 OTP를 요청하지 않았다면 이 메시지를 무시해주세요.\n 감사합니다 '
               }

    try:
        queue_declare_ok = channel.queue_declare(queue='email_notification', passive=True)
        current_durable = queue_declare_ok.method.queue

        if current_durable:
            if queue_declare_ok.method.queue != current_durable:
                channel.queue_delete(queue='email_notification')
                channel.queue_declare(queue='email_notification', durable=True)
        else:
            channel.queue_declare(queue='email_notification', durable=True)

        channel.basic_publish(
            exchange="",
            routing_key='email_notification',
            body=json.dumps(message),
            properties=pika.BasicProperties(
                delivery_mode=pika.spec.PERSISTENT_DELIVERY_MODE
            ),
        )
        print("OTP 이메일 알림 전송 완료")
    except Exception as err:
        print(f"메시지 전송 실패: {err}")
    finally:
        channel.close()
        connection.close()

## D. 머신 러닝 마이크로서비스 구현

<div class="content-ad"></div>

이 Python 스크립트는 RabbitMQ 서버에 연결하여 'ocr_service'라는 큐에서 메시지를 소비합니다. 메시지를받으면 OCRService 객체를 사용하여 처리하고 send_email_notification 함수를 사용하여 이메일 알림을 보내며, 그런 다음 응답을 응답 큐에 발행합니다. 각 메시지를 처리한 후 RabbitMQ에 메시지 전달을 인식합니다. 스크립트는 RabbitMQ가 전달할 수 있는 미인증 메시지의 수를 제한하는 prefetch count 1을 사용합니다.

import pika
import json
from utils import OCRService
from utils import send_email_notification

# RabbitMQ에 연결
connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
channel = connection.channel()
channel.queue_declare(queue='ocr_service')

# OCR 요청을 처리하기 위한 콜백 함수
def on_request(ch, method, props, body):
    # OCR 서비스 초기화
    ocr_service = OCRService()
    # OCR 요청 처리
    response = ocr_service.process_request(body)

    # 이메일 알림 전송
    send_email_notification(response['user_email'], response['ocr_text'], channel)

    # 응답을 응답 큐에 발행
    ch.basic_publish(exchange='',
                     routing_key=props.reply_to,
                     properties=pika.BasicProperties(correlation_id = \
                                                         props.correlation_id),
                     body=json.dumps(response))
    # 메시지 전달을 인식
    ch.basic_ack(delivery_tag=method.delivery_tag)
# prefetch count를 1로 설정
channel.basic_qos(prefetch_count=1)
# 'ocr_service' 큐에서 메시지 수신
channel.basic_consume(queue='ocr_service', on_message_callback=on_request)
# 메시지 수신 시작
print(" [x] RPC 요청 대기중")
channel.start_consuming()

import json
import base64
import pandas as pd
#keras ocr pipeline and imports
import keras_ocr
import pika

class OCRService:
   
    def __init__(self):
        self.keras_pipeline = keras_ocr.pipeline.Pipeline()

    def keras_ocr(self, image_path):
        results = self.keras_pipeline.recognize([image_path])
        df = pd.DataFrame(results[0], columns=['text', 'bbox'])
        words = df['text'].tolist()
        sentence = ' '.join(words)
        return sentence

    def process_request(self, message):
        message_body = json.loads(message)
        user_name = message_body['user_name']
        user_email = message_body['user_email']
        user_id = message_body['user_id']
        file_base64 = message_body['file']
        print(f" [x]user_id: {user_id} request recieved from gateway..")
        print(f" [x]processing request for {user_name}")

        # file_base64에 base64로 인코딩된 문자열이 포함되어 있다고 가정
        file_data = base64.b64decode(file_base64.encode())
        # 디코드된 파일 데이터를 새 파일에 작성
        with open('artifacts/decoded_file.png', 'wb') as f:
            f.write(file_data)

        image_path = "artifacts/decoded_file.png"
        ocr_text = self.keras_ocr(image_path)
        print(" [^] OCR 처리 완료 !!!")

        response = {
            "user_id": user_id,
            "user_name": user_name,
            "user_email": user_email,
            "ocr_text": ocr_text
        }

        return response

def send_email_notification(email, ocr_text, channel):
    # RabbitMQ를 사용하여 이메일 알림 전송
    message = {
        'email': email,
        'subject':'OCR 처리 완료 !!',
        'body':f'이미지에 대한 OCR (광학 문자 인식) 프로세스가 성공적으로 완료되었음을 알려드립니다.\n 추출된 텍스트가 처리되어 사용할 준비가되었습니다.\n\n  OCR 텍스트 : {ocr_text}',
        'other': 'null',
       }

    try:
        channel.basic_publish(
            exchange="",
            routing_key='email_notification',
            body=json.dumps(message),
            properties=pika.BasicProperties(
                delivery_mode=pika.spec.PERSISTENT_DELIVERY_MODE
            ),
        )
        print("OCR 처리 완료 이메일 알림 전송됨")
    except Exception as err:
        print(f"메시지 게시 실패: {err}")

## D. 알림 마이크로서비스 구현

<div class="content-ad"></div>

이 스크립트는 "email_notification" 큐에서 메시지를 수신하는 RabbitMQ 소비자를 설정합니다. 메시지를 받으면 email_service 모듈의 notification 함수를 호출하여 알림 프로세스를 처리합니다. 성공하면 메시지를 확인하고, 그렇지 않으면 메시지를 거부하고 오류 메시지를 출력합니다.

import pika
import sys
import os
import time
import email_service
from dotenv import load_dotenv

# 환경 변수 로드
load_dotenv()
RABBITMQ_URL = os.environ.get("RABBITMQ_URL")

def main():
    # rabbitmq 연결
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=RABBITMQ_URL))
    channel = connection.channel()

    def callback(ch, method, properties, body):
        try:
            err = email_service.notification(body)
            if err:
                ch.basic_nack(delivery_tag=method.delivery_tag)
            else:
                ch.basic_ack(delivery_tag=method.delivery_tag)
        except Exception as e:
            print(f"메시지 처리 중 오류 발생: {e}")
            ch.basic_nack(delivery_tag=method.delivery_tag)

    channel.basic_consume(
        queue="email_notification", on_message_callback=callback
    )

    print("메시지 수신 대기 중. 종료하려면 CTRL+C를 누르세요")

    channel.start_consuming()


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("중단됨")
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)

import smtplib, os, json
from email.message import EmailMessage
from dotenv import load_dotenv
from email.mime.text import MIMEText

load_dotenv()

def notification(message):
    try:
        message = json.loads(message)
        receiver_address = message["email"]
        subject = message["subject"]
        body = message["body"]
        other = message["other"]

        sender_address = os.environ.get("GMAIL_ADDRESS")
        sender_password = os.environ.get("GMAIL_PASSWORD")

        # Gmail SMTP 서버 설정
        smtp_server = 'smtp.gmail.com'
        smtp_port = 587

        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(sender_address, sender_password)

        # 이메일 메시지 작성
        msg = MIMEText(body)
        msg['Subject'] = subject
        msg['From'] = sender_address
        msg['To'] = receiver_address

        server.sendmail(sender_address, receiver_address, msg.as_string())
        server.quit()

        print("이메일 발송 완료")
    except Exception as e:
        print(f"이메일 발송 실패: {e}")

# 애플리케이션 데모

<div class="content-ad"></div>

# 결론

마지막으로, FastAPI와 RabbitMQ를 사용하여 엔드 투 엔드 마이크로서비스 아키텍처를 성공적으로 구현했습니다. 사용자 인증 서비스, OCR 처리를 위한 머신 러닝 서비스 및 이메일 알림을 위한 알림 서비스를 어떻게 만드는지 보여드렸습니다.

이 블로그를 통해 서비스 격리, 메시징 큐를 통한 통신, 확장성 및 성능을 위한 비동기 처리의 장점과 같은 마이크로서비스의 주요 개념에 대해 배웠습니다.

프로젝트를 실행하려면 GitHub 저장소의 README 파일에 있는 지침을 따르세요. 읽어 주셔서 감사합니다. 이 프로젝트가 여러분께 영감을 주어 직접 마이크로서비스 아키텍처를 탐구하고 구현하는 데 도움이 되기를 바랍니다.

<div class="content-ad"></div>

깃허브: [https://github.com/shantanu1905/fastapi-microservice-demo](https://github.com/shantanu1905/fastapi-microservice-demo)