---
title: "글 제목 오픈AI GPT-4o를 사용하여 데이터베이스를 쿼리하는 방법"
description: ""
coverImage: "/assets/img/2024-05-15-HowtouseOpenAIGPT-4otoqueryyourdatabase_0.png"
date: 2024-05-15 04:12
ogImage: 
  url: /assets/img/2024-05-15-HowtouseOpenAIGPT-4otoqueryyourdatabase_0.png
tag: Tech
originalTitle: "How to use OpenAI GPT-4o to query your database?"
link: "https://medium.com/wrenai/how-do-you-use-openai-gpt-4o-to-query-your-database-f24be68b0b70"
isUpdated: true
---




오늘 OpenAI가 최신 LLM 모델인 GPT-4o를 발표했어요. 사람들이 이 혁신적인 모델을 기반으로 만든 놀라운 응용 프로그램을 공유하고 있어요. GPT-4o를 사용하면 데이터 검색에 개선 사항이 있어, 사용자들이 더 빠른 응답과 더 효율적인 비용 효과(비용이 GPT-4 Turbo보다 적음)을 누릴 수 있어요.

![이미지](/assets/img/2024-05-15-HowtouseOpenAIGPT-4otoqueryyourdatabase_0.png)

12시간 내에 WrenAI 팀이 최신 버전을 출시했어요. GPT-4o LLM 모델을 지원하여 본인의 데이터베이스를 쿼리하는 데 도움을 줄 거예요. 이 글에서는 gpt-4o를 사용하여 PostgreSQL 데이터베이스를 쿼리하는 방법을 안내할 거에요!

![이미지](/assets/img/2024-05-15-HowtouseOpenAIGPT-4otoqueryyourdatabase_1.png)



시작해 봅시다!

![image](/assets/img/2024-05-15-HowtouseOpenAIGPT-4otoqueryyourdatabase_2.png)

# PostgreSQL 데이터베이스 설정

PostgreSQL 서버를 시작하고, psql 클라이언트를 사용하여 PostgreSQL 데이터베이스에 접속하세요.



<img src="/assets/img/2024-05-15-HowtouseOpenAIGPT-4otoqueryyourdatabase_3.png" />

여기서 PostgreSQL에서 데이터베이스를 생성하십시오. 데이터베이스 이름은 ecom-wrenai로 지정했습니다.

```js
CREATE DATABASE ecom_wrenai;
```

생성된 데이터베이스 ecom-wrenai에 연결하려면 `\c database_name`을 사용하십시오.




```js
lijungchi=# \c ecom_wrenai
psql (13.1, server 13.0)
지금은 사용자 "lijungchi"로 데이터베이스 "ecom_wrenai"에 연결되었습니다.
ecom_wrenai=#
```

이제 이 데이터 세트의 테이블을 만들고 데이터를 가져오려고 합니다. 여기 gist에서 SQL 스크립트를 확인해주세요.

SQL 스크립트를 psql로 복사하거나 psql을 통해 SQL을 가져올 수 있습니다.

```js
ecom_wrenai=# \i <파일 경로>/import.sql
``` 




데이터를 성공적으로 가져오면 아래 정보가 표시됩니다.

![image](/assets/img/2024-05-15-HowtouseOpenAIGPT-4otoqueryyourdatabase_4.png)

# WrenAI 설치

다음으로 WrenAI를 설치해 봅시다. 시작하기 전에 Docker를 설치해야 합니다.



## 1. 로컬 컴퓨터에 Docker Desktop을 설치해주세요.

Docker Desktop의 버전이 적어도 `4.17` 이상인지 확인해주세요.

## 2. OpenAI API 키를 준비해주세요.

Open API 키가 Full Permission(All)을 가지고 있는지 확인해주세요.



OpenAI 개발자 플랫폼을 방문해주세요.


![Image 1](/assets/img/2024-05-15-HowtouseOpenAIGPT-4otoqueryyourdatabase_5.png)


WrenAI를 위한 새로운 API 키를 전체 권한으로 생성해주세요.


![Image 2](/assets/img/2024-05-15-HowtouseOpenAIGPT-4otoqueryyourdatabase_6.png)




## 2. WrenAI 런처 설치

만약 맥을 사용 중이라면(윈도우 또는 리눅스 사용자는 여기를 확인하세요) 최신 WrenAI 런처를 설치하려면 아래 명령어를 입력하세요.

```js
curl -L https://github.com/Canner/WrenAI/releases/latest/download/wren-launcher-darwin.tar.gz | tar -xz && ./wren-launcher-darwin
```

그러면 런처가 아래와 같이 OpenAI API 키를 요청할 것입니다. 키를 복사하여 해당 명령어에 붙여넣고 엔터를 눌러주세요.



WrenAI에서 OpenAI의 생성 모델인 gpt-4o, gpt-4-turbo, gpt-3.5-turbo를 선택할 수 있습니다.

![이미지](/assets/img/2024-05-15-HowtouseOpenAIGPT-4otoqueryyourdatabase_7.png)

이제 컴퓨터에서 docker-compose가 실행되고 있음을 볼 수 있습니다. 설치 후에는 도구가 자동으로 브라우저를 열어 WrenAI에 액세스할 것입니다.

![이미지](/assets/img/2024-05-15-HowtouseOpenAIGPT-4otoqueryyourdatabase_8.png)



# 데이터 소스 연결

터미널이 성공적으로 설치되었으면 브라우저가 시작됩니다

![이미지](/assets/img/2024-05-15-HowtouseOpenAIGPT-4otoqueryyourdatabase_9.png)

PostgreSQL 데이터베이스 커넥터를 선택하세요.




![Image](/assets/img/2024-05-15-HowtouseOpenAIGPT-4otoqueryyourdatabase_10.png)

만약 Mac 로컬 PostgreSQL 데이터베이스를 사용하는 경우, 데이터베이스에 액세스하려면 docker.for.mac.localhost를 입력하십시오.

![Image](/assets/img/2024-05-15-HowtouseOpenAIGPT-4otoqueryyourdatabase_11.png)

다음 단계는 시맨틱 모델과의 관계를 정의하는 것입니다. 이는 LLMs가 시맨틱 데이터 구조에 대해 더 잘 이해하도록 도울 수 있습니다.





![이미지](/assets/img/2024-05-15-HowtouseOpenAIGPT-4otoqueryyourdatabase_12.png)

## 이제 모든 준비가 다 되었어요!

WrenAI UI에서 모든 데이터 모델을 확인할 수 있습니다.

![이미지](/assets/img/2024-05-15-HowtouseOpenAIGPT-4otoqueryyourdatabase_13.png)




# WrenAI와 함께 놀아보기

## WrenAI UI 시맨틱 모델링

WrenAI UI를 사용하면 데이터 모델을 시맨틱 컨텍스트에서 모델링할 수 있습니다. 설명, 관계, 계산 등을 추가할 수 있습니다. 이 컨텍스트는 LLM이 비즈니스 용어 및 KPI 정의를 학습하고 여러 테이블을 조인할 때 환각을 줄일 수 있는데, LLM은 테이블 간의 관계를 통해 학습하여 데이터 구조 계층구조를 파악할 수 있습니다. 이 관계는 테이블 간이 많 대 일, 일 대 많, 또는 많 대 많인 관계인지 여부와 같이 관계를 통해 학습합니다.

![이미지](/assets/img/2024-05-15-HowtouseOpenAIGPT-4otoqueryyourdatabase_14.png)



당신의 비즈니스 KPI 및 수식을 WrenAI에서 계산하여 정의하세요.

![이미지](/assets/img/2024-05-15-HowtouseOpenAIGPT-4otoqueryyourdatabase_15.png)

테이블 간의 의미 관계 추가하기.

![이미지](/assets/img/2024-05-15-HowtouseOpenAIGPT-4otoqueryyourdatabase_16.png)



## WrenAI를 사용하여 비즈니스 질문을 하고 관련 정보를 확인하세요

이제 WrenAI UI의 홈 페이지로 전환할 수 있습니다. New Thread를 클릭하여 비즈니스 질문을 시작할 수 있으며, WrenAI는 벡터 저장소를 통해 관련 의미론을 찾고 추천을 제공합니다.

![image](/assets/img/2024-05-15-HowtouseOpenAIGPT-4otoqueryyourdatabase_17.png)

WrenAI는 비즈니스 질문에 대해 최대 3가지 옵션을 제시하며, 최종 결과를 생성할 가장 관련성 높은 질문을 선택할 수 있습니다.



![image](/assets/img/2024-05-15-HowtouseOpenAIGPT-4otoqueryyourdatabase_18.png)

옵션을 선택하면 WrenAI가 SQL 및 데이터를 포함한 요약을 단계별로 표시하여 결과가 원하는 것인지 확인할 수 있습니다.

![image](/assets/img/2024-05-15-HowtouseOpenAIGPT-4otoqueryyourdatabase_19.png)

결과를 더 깊이 파악하기 위해 후속 질문을 할 수 있습니다.



<img src="/assets/img/2024-05-15-HowtouseOpenAIGPT-4otoqueryyourdatabase_20.png" />

안녕하세요! 이 부분이 궁금하신가요? gpt-4o를 사용하시는데 즐거우신가요?

만약 저희 작품을 좋아해주신다면, GitHub에서 별표와 지지를 부탁드립니다!

🚀 GitHub: https://github.com/canner/wrenai



🙌 웹사이트: [https://www.getwren.ai/](https://www.getwren.ai/)

📫 구독하기: [https://blog.getwren.ai/](https://blog.getwren.ai/)

이 글을 즐겨보셨다면 깃허브에서 ⭐ WrenAI에 별표를 주시고, 항상 읽어주셔서 감사합니다.