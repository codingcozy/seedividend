---
title: "시맨틱 검색을 위한 MongoDB Atlas 시작하기"
description: ""
coverImage: "/assets/img/2024-05-14-GettingStartedwithMongoDBAtlasforSemanticSearch_0.png"
date: 2024-05-14 15:33
ogImage: 
  url: /assets/img/2024-05-14-GettingStartedwithMongoDBAtlasforSemanticSearch_0.png
tag: Tech
originalTitle: "Getting Started with MongoDB Atlas for Semantic Search"
link: "https://medium.com/data-engineer-things/getting-started-with-mongodb-atlas-for-semantic-search-7ac77ed3d195"
isUpdated: true
---




## 최신 MongoDB Atlas Vector Search 기능을 소개합니다

![이미지](/assets/img/2024-05-14-GettingStartedwithMongoDBAtlasforSemanticSearch_0.png)

6월 22일, MongoDB가 Atlas Vector Search를 미리 보기 모드로 출시했습니다.

이 새로운 기능을 사용해봤어요!



테이블 태그를 마크다운 형식으로 바꾸세요.



이 검색 방법은 텍스트, 오디오, 비디오 및 이미지와 같이 구조화되지 않은 데이터를 효과적으로 검색하기 위해 기계 학습 모델을 활용합니다. 이를 통해 검색 항목과 유사하거나 관련된 항목을 찾을 수 있습니다. 추천 시스템, 챗봇 또는 검색 엔진과 같은 여러 사용 사례에 활용됩니다.

텍스트 데이터를 다룰 때 벡터 검색을 통해 정확한 검색어가 검색된 문장에 없더라도 비슷한 의미의 단어나 구를 찾을 수 있습니다.

벡터 검색은 임베딩 개념을 기반으로 합니다.

## Embeddings



벡터 검색은 고급 머신 러닝 모델(encoders)을 사용하여 구조화되지 않은 입력 데이터의 수치적 표현을 제공하는 벡터 임베딩을 생성합니다.

벡터 임베딩은 컴퓨터에게 일반적으로 이해하기 어려운 구조화되지 않은 데이터를 숫자 형식으로 변환합니다.

![이미지](/assets/img/2024-05-14-GettingStartedwithMongoDBAtlasforSemanticSearch_1.png)

임베딩은 주로 수치 값 배열인 고차원 벡터입니다. 이러한 벡터는 데이터의 맥락적 및 의미적 정보를 포함하고 있어 유의미한 비교와 계산을 수행할 수 있도록 합니다.



예를 들어, 텍스트 임베딩 모델(인코더)은 구절 내 단어들 사이의 관계를 학습하여 문장의 의미와 맥락 정보를 포착하는 임베딩을 생성할 수 있습니다.

![image](/assets/img/2024-05-14-GettingStartedwithMongoDBAtlasforSemanticSearch_2.png)

위 이미지에서 "bovine buddies say" 구절은 부동 소수점 숫자 배열([-0.005, 0.012, -0.008, ..., -0.010])로 인코딩되었습니다.

벡터의 차원은 임베딩 모델에 따라 다르며 높을 수 있습니다(수천 개까지).



Markdown으로 테이블 태그를 변경하세요.



## Atlas Vector Search

Atlas Vector Search은 MongoDB Atlas의 새로운 기능으로, MongoDB의 검색 기능을 더욱 발전시킵니다.

MongoDB Atlas Vector Search는 다음을 제공합니다:

- 원하는 외부 ML 모델(OpenAI, Hugging Face 등)에서 생성된 임베딩 벡터를 보존하는 벡터 저장소;
- 저장된 임베딩 벡터를 색인화하는 벡터 저장소 인덱스;
- 저장된 벡터에서 의미 검색을 수행하기 위한 근사 최근 이웃(ANN) 알고리즘을 구현하는 검색 작업.



몽고디비 Atlas Search를 사용하면 사용자는 기본 키워드 매칭 이상의 정보 검색 기능을 확장할 수 있습니다. 이 혁신적인 도구는 컨텍스트 인식 시맨틱 검색을 가능하게하여 사용자의 검색어에서 의미를 유추할 수 있도록 합니다.

# 액션에서의 Atlas Vector Search

이제 몽고디비 Atlas Vector Search의 새로운 기능을 시도해 보겠습니다.

이 튜토리얼을 완료하기 위해 다음 단계를 실행해 보겠습니다:



- 무료 MongoDB ATLAS 클러스터를 생성하세요.
- 속담과 쿼리를 위한 MongoDB 컬렉션을 생성하세요.
- Hugging Face API 토큰을 생성하세요.
- 생성된 Hugging Face API 토큰을 Atlas에 임포트하세요.
- Atlas Database Triggers 및 HF API 실행을 위한 함수를 만드세요.
- 벡터 검색 인덱스를 생성하세요.
- 속담 데이터셋을 MongoDB에 삽입하세요.
- 의미론적 쿼리를 실행하세요.

이번 튜토리얼에서는 Atlas UI만 사용하여 작업할 예정입니다.

## 1. 무료 MongoDB ATLAS 클러스터 생성

첫 번째 단계는 MongoDB Atlas 무료 클러스터(M0 클러스터)를 배포하는 것입니다.



이 튜토리얼에서는 새로운 것을 만들기보다 기존의 Atlas 클러스터를 자유롭게 사용해도 괜찮습니다.

## 2. 속담 및 질의를 위한 MongoDB 컬렉션 생성

이 튜토리얼에서는 같은 데이터베이스에 속한 두 개의 컬렉션을 사용할 것입니다:

- 속담과 그에 대한 내장 값을 저장하는 `vector_search.proverbs`
- 질의와 답변을 저장하는 `vector_search.queries`



데이터베이스와 컬렉션은 Atlas UI에서 생성됩니다.

데이터베이스 배포에서 'Collections 찾아보기' 버튼을 클릭하십시오:

![Collections 찾아보기](/assets/img/2024-05-14-GettingStartedwithMongoDBAtlasforSemanticSearch_4.png)

그런 다음 Collections 탭에서 + 데이터베이스 생성을 클릭하고 데이터베이스 이름 (vector_search), 첫 번째 컬렉션 이름 (proverbs)을 입력한 후 생성 버튼을 클릭하십시오.



Markdown 형식으로 테이블 태그를 바꿔 주세요:


![이미지 1](/assets/img/2024-05-14-GettingStartedwithMongoDBAtlasforSemanticSearch_5.png)

두 번째 컬렉션을 만들기 위해 데이터베이스 vector_search를 선택하거나 호버한 후, 플러스(+) 아이콘을 클릭하세요.

![이미지 2](/assets/img/2024-05-14-GettingStartedwithMongoDBAtlasforSemanticSearch_6.png)

다음으로 vector_search 데이터베이스 내에 queries 컬렉션을 생성하세요:




<img src="/assets/img/2024-05-14-GettingStartedwithMongoDBAtlasforSemanticSearch_7.png" />

이제 여러분의 컬렉션이 준비되었어요.

<img src="/assets/img/2024-05-14-GettingStartedwithMongoDBAtlasforSemanticSearch_8.png" />

## 3. Hugging Face API 토큰 생성



프로버브에 대한 벡터 임베딩을 얻기 위해 무료 공개 Hugging Face 추론 API를 사용할 것입니다.

텍스트 임베딩 API를 호출하기 전에 Hugging Face 사이트에서 읽기 액세스 토큰을 생성해야 합니다.

Hugging Face 웹사이트로 이동하여 로그인하거나 회원 가입하세요.

![이미지](/assets/img/2024-05-14-GettingStartedwithMongoDBAtlasforSemanticSearch_9.png)



로그인한 후 오른쪽 상단으로 이동하여 프로필 아이콘을 클릭하고 설정을 선택하세요. 그런 다음 프로필 설정 페이지 왼쪽에 있는 Access Tokens를 클릭하고 New Token 버튼을 누르세요.

![Access Tokens](/assets/img/2024-05-14-GettingStartedwithMongoDBAtlasforSemanticSearch_10.png)

토큰에 이름을 지정하고 read 역할을 선택한 후 Generate a token을 클릭하세요.

![Generate a Token](/assets/img/2024-05-14-GettingStartedwithMongoDBAtlasforSemanticSearch_11.png)



위의 생성된 토큰을 안전한 위치에 복사하여 저장해주세요.

![image](/assets/img/2024-05-14-GettingStartedwithMongoDBAtlasforSemanticSearch_12.png)

## 4. 아틀라스로 허깅 페이스 API 토큰 가져오기

HF API를 호출하기 전에 먼저 아틀라스에 이전에 생성된 허깅 페이스 토큰을 가져와야 합니다.



Atlas UI의 App Services 페이지로 이동해주세요:

![이미지](/assets/img/2024-05-14-GettingStartedwithMongoDBAtlasforSemanticSearch_13.png)

Triggers 애플리케이션(가장 왼쪽 상자)을 클릭한 후, 왼쪽 메뉴에서 Values를 선택하고, Create New Value 버튼을 클릭해주세요.

![이미지](/assets/img/2024-05-14-GettingStartedwithMongoDBAtlasforSemanticSearch_14.png)



가장 먼저 할 일은 비밀을 만드는 것입니다. 값을 HF_secret로 지정하고 유형을 Secret으로 선택하여 허깅페이스 토큰을 Add Content 필드에 붙여넣은 다음 저장을 클릭하세요.

![이미지](/assets/img/2024-05-14-GettingStartedwithMongoDBAtlasforSemanticSearch_15.png)

그런 다음, 함수에서 사용할 새 환경 변수를 생성해야 합니다. 이를 위해 오른쪽 상단 버튼의 Create New Value를 다시 클릭하세요.

![이미지](/assets/img/2024-05-14-GettingStartedwithMongoDBAtlasforSemanticSearch_16.png)



HF_value라는 이름의 Value 타입의 값을 생성하고 Secret HF_secret에 링크를 걸고 저장을 누르세요. 아래에서 정확히 수행한 것을 따라해주세요.

![이미지](/assets/img/2024-05-14-GettingStartedwithMongoDBAtlasforSemanticSearch_17.png)

## 5. Atlas 데이터베이스 트리거 및 함수 생성하여 HF API 호출하기

Atlas UI에서 우리는 격언 및 쿼리 컬렉션에 데이터베이스 트리거를 정의할 수 있습니다. 이를 통해 이 컬렉션에 새 문서가 삽입될 때마다 Hugging Face API를 호출할 수 있습니다.



데이터베이스 트리거를 생성하려면 데이터베이스 배포로 이동한 다음 왼쪽 탐색 메뉴에서 트리거를 클릭하십시오.

"트리거 추가" 버튼을 클릭하여 새 트리거를 구성할 수 있습니다.

![이미지](/assets/img/2024-05-14-GettingStartedwithMongoDBAtlasforSemanticSearch_18.png)

HF_Create_Embeddings 트리거



vector_search.proverbs 컬렉션에 대한 첫 번째 트리거인 HF_Create_Embeddings을 생성했습니다. 아래와 같이 트리거를 구성하세요:

![trigger configuration](/assets/img/2024-05-14-GettingStartedwithMongoDBAtlasforSemanticSearch_19.png)

함수 섹션에서 Function을 이벤트 유형으로 선택하고, 다음의 자바스크립트 함수 코드를 아래 코드 블록에 붙여넣으세요.

![javascript function code](/assets/img/2024-05-14-GettingStartedwithMongoDBAtlasforSemanticSearch_20.png)



위 양식에 붙여넣을 코드는 다음과 같습니다:

```js
exports = async function(changeEvent) {
    // 변경 이벤트에서 전체 문서를 가져옵니다.
    const doc = changeEvent.fullDocument;

    // Hugging Face API의 URL과 키를 정의합니다.
    const url = 'https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2';
    // App Services 내부의 "Values" 유틸리티에서 API 키의 값을 지정한 이름을 사용합니다.
    const hf_read_token = context.values.get("HF_value");

    try {
        console.log(`ID가 ${doc._id}인 문서 처리 중`);

        // Hugging Face API를 호출하여 임베딩을 가져옵니다.
        let response = await context.http.post({
            url: url,
            headers: {
                'Authorization': `Bearer ${hf_read_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // 문서 내 데이터를 임베딩할 필드를 지정합니다. 여기서는 샘플 속담 데이터의 "proverb" 필드를 사용합니다.
                inputs: [doc.proverb]
            })
        });

        // JSON 응답을 파싱합니다.
        let responseData = EJSON.parse(response.body.text());

        // 응답 상태를 확인합니다.
        if(response.statusCode === 200) {
            console.log("임베딩을 성공적으로 받았습니다.");

            const embedding = responseData[0];

            // MongoDB Atlas에서 클러스터를 가져옵니다.
            const mongodb = context.services.get('Cluster0');
            const db = mongodb.db('vector_search'); // 데이터베이스명으로 변경하세요.
            const collection = db.collection('proverbs'); // 컬렉션명으로 변경하세요.

            // MongoDB에서 문서를 업데이트합니다.
            const result = await collection.updateOne(
                { _id: doc._id },
                // 새로운 필드에 임베딩을 저장할 이름을 지정합니다.
                { $set: { proverb_embedding: embedding }
            );

            if(result.modifiedCount === 1) {
                console.log("문서를 성공적으로 업데이트했습니다.");
            } else {
                console.log("문서를 업데이트하는 데 실패했습니다.");
            }
        } else {
            console.log(`임베딩을 받는 데 실패했습니다. 상태 코드: ${response.statusCode}`);
        }

    } catch(err) {
        console.error(err);
    }
};
```

트리거 HF_Create_Embeddings는 속담 콜렉션에 삽입된 각 속담에 대한 벡터 임베딩을 얻기 위해 Hugging Face all-MiniLM-L6-v2 모델 API를 호출합니다.

Semantic_Query 트리거



두 번째 트리거는 쿼리 컬렉션에 생성될 것입니다. 트리거 함수에서는 Hugging Face 임베딩 모델을 호출하여 사용자 쿼리의 임베딩을 가져와 MongoDB 집계 명령을 통해 벡터 검색을 실행할 것입니다.

벡터 검색 결과는 쿼리 컬렉션에 저장될 것입니다.

두 번째 트리거를 만들려면, 첫 번째 트리거와 동일한 프로세스를 따르되, 다음에 설명된 매개변수를 조정해야 합니다 (다른 모든 매개변수 값은 이전과 동일합니다):

이름 Semantic_Query



컬렉션 이름 쿼리

함수 코드에 다음 블록을 붙여 넣으세요:

```js
exports = async function(changeEvent) {
    // 변경 이벤트에서 전체 문서 가져오기
    const doc = changeEvent.fullDocument;

    // Hugging Face API URL 및 키 정의
    const url = 'https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2';
    // App Services 내의 "Values" 유틸리티에서 API 키의 값을 설정한 이름을 사용
    const hf_read_token = context.values.get("HF_value");

    try {
        console.log(`아이디가 ${doc._id}인 문서 처리 중`);

        // 쿼리의 임베딩을 가져오기 위해 Hugging Face API 호출
        let response = await context.http.post({
            url: url,
            headers: {
                'Authorization': `Bearer ${hf_read_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // 데이터를 임베딩할 문서 내 필드. 여기선 "queries" 컬렉션의 "query" 필드입니다.
                inputs: [doc.query]
            })
        });

        // JSON 응답 파싱
        let responseData = EJSON.parse(response.body.text());

        // 응답 상태 확인
        if (response.statusCode === 200) {
            console.log("임베딩 성공적으로 수신");

            const embedding = responseData[0];

            // MongoDB Atlas에서 클러스터 가져오기
            const mongodb = context.services.get('Cluster0');
            const db = mongodb.db('vector_search'); // 데이터베이스 이름으로 대체
            const proverbs_collection = db.collection('proverbs'); // 컬렉션 이름으로 대체
            const queries_collection = db.collection('queries'); // 컬렉션 이름으로 대체

            // 유사 문서 쿼리
            const documents = await proverbs_collection.aggregate([
                {
                    "$search": {
                        "index": "vector_search_index",
                        "knnBeta": {
                            "vector": embedding,
                            "path": "proverb_embedding",
                            "k": 2
                        }
                    }
                },
                {
                    "$project": {
                        "_id": 0,
                        "proverb": 1
                    }
                }
            ]).toArray();
            
            // MongoDB에서 문서 업데이트
            const result = await queries_collection.updateOne(
                { _id: doc._id },
                // "answer" 필드에 쿼리 결과가 포함됩니다.
                { $set: { query_embedding: embedding, answer: documents }
            });

        } else {
            console.log(`임베딩 수신 실패. 상태 코드: ${response.statusCode}`);
        }

    } catch(err) {
        console.error(err);
    }
};
```

## 6. 벡터 탐색 인덱스 생성



우리는 직역 검색을 가능하게 하기 위해 속담 모음에 벡터 검색 인덱스를 생성해야 합니다. 속담 모음은 우리의 쿼리에 응답하기 위해 검색될 속담 문장의 임베딩(proverb_embedding 필드)을 포함할 것입니다.

인덱스를 생성하려면 다음을 수행하세요. Atlas Search로 이동: 데이터베이스 배포 페이지에서 왼쪽 메뉴에서 검색을 클릭한 후, 데이터 원본 선택 드롭다운 메뉴에서 클러스터를 선택하고 Go to Atlas Search 버튼을 누릅니다.

![이미지](/assets/img/2024-05-14-GettingStartedwithMongoDBAtlasforSemanticSearch_21.png)

새로운 검색 인덱스를 구성하려면 Create Search Index 버튼을 클릭하세요:



![이미지](/assets/img/2024-05-14-GettingStartedwithMongoDBAtlasforSemanticSearch_22.png)

다음 페이지에서 JSON Editor 상자를 선택하고 Next 버튼을 누르세요:

![이미지](/assets/img/2024-05-14-GettingStartedwithMongoDBAtlasforSemanticSearch_23.png)

데이터베이스 및 컬렉션 영역에서 vector_search 데이터베이스와 proverbs 컬렉션을 선택하고, Index Name 필드에 vector_search_index라는 인덱스 이름을 지정하세요.



<img src="/assets/img/2024-05-14-GettingStartedwithMongoDBAtlasforSemanticSearch_24.png" />

다음 JSON 문서를 텍스트 영역에 붙여넣고 '다음' 버튼을 클릭해주세요.

```js
{
  "mappings": {
    "dynamic": true,
    "fields": {
      "proverb_embedding": {
        "dimensions": 384,
        "similarity": "dotProduct",
        "type": "knnVector"
      }
    }
  }
}
```

'검색 인덱스 생성'을 클릭하면 인덱스 생성이 시작됩니다.



<img src="/assets/img/2024-05-14-GettingStartedwithMongoDBAtlasforSemanticSearch_25.png" />

곧 새로운 인덱스가 활성 상태로 사용 가능할 것입니다.

<img src="/assets/img/2024-05-14-GettingStartedwithMongoDBAtlasforSemanticSearch_26.png" />

## 7. 경구 데이터 세트를 MongoDB에 삽입하기



우리는 임베딩 스토어를 채우기 위해 영어 속담을 속담 컬렉션에 삽입할 것입니다. Atlas UI에서 하나의 속담을 추가할 것입니다.

우리가 삽입하는 첫 번째 속담은 다음과 같습니다:

속담을 삽입하려면:

- 데이터베이스 배포 페이지에서 Browse Collections로 이동하세요.
- vector_search 데이터베이스 아래에 있는 proverbs 컬렉션을 선택하세요.
- "proverb"를 필드 이름으로 하고 속담 문장을 값으로 하는 단일 필드 문서를 추가하세요.
- 그런 다음 삽입을 눌러주세요.



마법처럼 새로운 필드인 'proverb_embedding'이 문서에 추가됩니다:

'proverb_embedding' 필드에는 HF_Create_Embeddings 트리거에서 호출된 Hugging Face 텍스트 임베딩 모델 API에 의해 생성된 임베딩 벡터(384개의 부동 소수점 요소가 있는 배열)가 포함되어 있습니다.



자세한 것은 나중에 업데이트됩니다.



늦게라도 하는 것이 낫죠.

호기심은 고양이를 죽인다고 해요.

불에 노는 바보는 불에 탄다고 하잖아요.

정의를 미루면 결국 물거품이 돼버립니다.



밤은 충고를 안겨줍니다.

로마는 하루 만에 지어지지 않았어요.

울타리 너머에 있는 잔디가 더 푸릅니다.

우리 속담 컬렉션에는 10개의 문서가 있어요.



<img src="/assets/img/2024-05-14-GettingStartedwithMongoDBAtlasforSemanticSearch_29.png" />

## 8. Semantic queries 실행하기

검색을 실행하기 위해 쿼리 컬렉션에 단일 필드 문서를 삽입할 것입니다. 필드 이름은 "query"이고 값은 다음과 같이 우리 검색어의 텍스트입니다:

' "query": "Things that look good outwardly may not be as valuable or good."'



새로운 문서가 쿼리 컬렉션에 삽입되면 `Semantic_Query` 트리거가 실행됩니다:

- 속담 문장을 전달하여 쿼리의 임베딩을 얻기 위해 Hugging Face API를 호출합니다.
- 받은 임베딩 벡터를 문서 자체에 저장합니다 (query_embedding 필드).
- MongoDB 집계 명령어를 통해 vector_search_index에서 벡터 검색을 실행합니다.
- 검색 결과를 문서 자체에 저장합니다 (answer 필드).

쿼리를 테스트하려면 "Collections" 탭으로 이동하여 쿼리 컬렉션에 쿼리를 삽입하세요:

![2024-05-14-GettingStartedwithMongoDBAtlasforSematicSearch_30.png](/assets/img/2024-05-14-GettingStartedwithMongoDBAtlasforSematicSearch_30.png)



여기 답변이 있어요:

![image](/assets/img/2024-05-14-GettingStartedwithMongoDBAtlasforSemanticSearch_31.png)

우리 질문과 가장 유사한 의미를 가진 속담 두 개는 다음과 같습니다:

"반짝이는 것이 모두 금은 아니다." 그리고 "만능 재주꾼은 아무것도 제대로 할 수 없다."



정답이 잘 보입니다! 데이터셋과 쿼리를 실험해 볼 수 있습니다. 또한 OpenAI 텍스트 임베딩 API와 같은 다양한 임베딩 모델을 테스트하여 응답의 정확성을 평가할 수도 있습니다.

# 참고 자료

- MongoDB Atlas 매뉴얼
- MongoDB Atlas 벡터 검색
- MongoDB Atlas 검색 튜토리얼
- 일반적인 영어 속담
- Hugging Face 텍스트 임베딩 모델

MongoDB에 대한 지식을 확장하고 싶다면 How MongoDB Works에 대한 제 논문을 살펴보세요.



제가 쓰는 이야기를 좋아해주시고 지원하고 싶으시다면, Medium 회원이 되어서 지원해주실 수 있어요. 매달 $5를 내면 Medium의 모든 이야기에 무제한 액세스할 수 있어요. 저의 추천 링크를 사용해서 가입하면, 작은 커미션을 받을 수 있어요. 고려해 주셔서 감사합니다!