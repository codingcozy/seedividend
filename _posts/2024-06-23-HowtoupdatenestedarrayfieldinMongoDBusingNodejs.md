---
title: "Nodejs를 사용하여 MongoDB에서 중첩된 배열 필드를 업데이트하는 방법"
description: ""
coverImage: "/assets/img/2024-06-23-HowtoupdatenestedarrayfieldinMongoDBusingNodejs_0.png"
date: 2024-06-23 13:20
ogImage: 
  url: /assets/img/2024-06-23-HowtoupdatenestedarrayfieldinMongoDBusingNodejs_0.png
tag: Tech
originalTitle: "How to update nested array field in MongoDB using Node.js"
link: "https://medium.com/codechintan/how-to-update-nested-array-field-in-mongodb-using-node-js-b57980f2faba"
---


몽고디비에서 문서 내 배열 업데이트하기.

![이미지](/assets/img/2024-06-23-HowtoupdatenestedarrayfieldinMongoDBusingNodejs_0.png)

Node.js와 몽고디비를 이용하여 애플리케이션 배열 내 특정 applicationId의 활성 상태를 업데이트하려면 $set 연산자를 사용해야 합니다. $ 연산자는 쿼리 조건과 일치하는 첫 번째 배열 요소를 업데이트할 수 있도록 합니다.

```js
// applications 배열에서 지정된 applicationId를 포함하는 문서를 찾는 쿼리.
const filter = { _id: userId, 'applications.applicationId': applicationId };

// 활성 상태를 설정하는 업데이트.
const updateDoc = {
  // $set 및 $ 연산자 활용: 일치하는 applicationId의 active 필드를 업데이트.
  $set: { 'applications.$.active': newStatus }
};

const result = await collection.updateOne(filter, updateDoc);
```

<div class="content-ad"></div>

## 설명:

- 필터: 필터 객체는 특정 userId(또는 문서의 다른 고유 식별자)와 applications 배열 내의 applicationId를 가진 문서를 찾고 있는지를 나타냅니다.
- 업데이트: $set 연산자는 일치하는 배열 요소의 active 필드를 업데이트하기 위해 위치 $ 연산자와 함께 사용됩니다.

## 이제 중첩된 배열에서 여러 applicationId의 활성 상태를 업데이트하는 방법:

한 번의 작업에서 applications 배열 내의 여러 applicationId 항목의 활성 상태를 업데이트하려면 $set 연산자를 $[`identifier`] 배열 필터와 함께 사용할 수 있습니다. 이를 통해 배열 내의 요소를 일치시키고 이에 따라 업데이트할 수 있는 여러 조건을 지정할 수 있습니다.

<div class="content-ad"></div>

# 여러 applicationId 항목을 업데이트하는 단계:

- MongoDB에 연결: MongoDB 클라이언트를 사용하여 데이터베이스에 연결합니다.
- 쿼리 정의: 업데이트할 문서를 지정합니다.
- Array Filters와 $set 사용: 배열 필터를 사용하여 여러 applicationId 항목을 일치시키고 업데이트합니다.
- 업데이트 처리: 업데이트 명령을 실행하고 응답을 처리합니다.

# 예시 코드

다음은 Node.js와 MongoDB를 사용하여 이 작업을 수행하는 방법입니다:

<div class="content-ad"></div>

```js
const { MongoClient } = require('mongodb');

// 귀하의 MongoDB 연결 문자열과 데이터베이스 이름으로 대체합니다.
const uri = 'mongodb://localhost:27017';
const dbName = '귀하의데이터베이스이름';
const collectionName = '귀하의컬렉션이름';

async function updateApplicationStatu(userId, updates) {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('MongoDB에 연결됨');

    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    // 사용자 문서 가져오기
    const userDoc = await collection.findOne({ _id: userId });

    if (!userDoc) {
      console.log('사용자 문서를 찾을 수 없음');
      return;
    }

    // applications 배열을 초기화
    if (!userDoc.applications) {
      userDoc.applications = [];
    }

    const updateOperations = [];
    const applicationIds = userDoc.applications.map(app => app.applicationId);

    // 중첩 배열 내 여러 applicationId의 활성 상태를 업데이트
    updates.forEach(update => {
      if (applicationIds.includes(update.applicationId)) {
        // 기존 애플리케이션 상태를 업데이트
        updateOperations.push({
          updateOne: {
            filter: { _id: userId, 'applications.applicationId': update.applicationId },
            update: { 
              $set: { 'applications.$.active': update.active },
              $addToSet: { updatedBy: req.session.userId }
            }
          }
        });
      } else {
        // 존재하지 않는 경우 새로운 애플리케이션 추가
        updateOperations.push({
          updateOne: {
            filter: { _id: userId },
            update: {
              $push: {
                applications: { applicationId: update.applicationId, active: update.active }
              }
            },
            $addToSet: { updatedBy: req.session.userId }
          }
        });
      }
    });

    // 대량 쓰기 작업 수행
    const result = await collection.bulkWrite(updateOperations);

    if (result.modifiedCount > 0 || result.insertedCount > 0) {
      console.log('애플리케이션 상태가 성공적으로 업데이트됨.');
    } else {
      console.log('일치하는 애플리케이션이 없거나 변경된 내용이 없습니다.');
    }
  } catch (error) {
    console.error('애플리케이션 상태 업데이트 오류:', error);
  } finally {
    await client.close();
  }
}

// 사용 예시: 여러 애플리케이션 업데이트
updateApplicationStatuses('userId123', [
  { applicationId: 'Apple', active: true },
  { applicationId: 'Mango', active: false },
  { applicationId: 'Orange', active: true }
]);
```

# 설명

- MongoDB 연결: MongoDB 인스턴스에 연결을 설정합니다.
- 데이터베이스 및 컬렉션: 작업할 데이터베이스 및 컬렉션을 지정합니다.
- 필터: 필터 객체는 userId 또는 문서의 다른 고유 식별자를 기반으로 문서를 식별합니다.
- 업데이트 오브젝트: updateDoc은 $set 연산자를 사용하여 지정된 applicationId 엔트리의 활성 상태를 업데이트합니다. 필드 경로는 배열 필터를 동적으로 사용하기 위해 구성됩니다.
- 배열 필터: arrayFilters 옵션을 사용하여 어떤 요소를 업데이트해야 하는지를 정의하는 조건을 정의합니다. 각 필터는 업데이트해야 할 applicationId에 해당합니다.
- updatedBy 필드: updatedBy는 applications 배열의 일부가 아닌 문서의 별도 필드입니다. 요구 사항에 따라서 applications 배열에서 수정이나 추가가 있을 때마다 updatedBy 필드를 업데이트해야 합니다.
- 결과 처리: 업데이트 작업이 문서를 수정했는지 확인하고 결과를 로그에 남깁니다.

만약 applicationId가 존재하지 않는 경우 해당 활성 상태와 함께 추가되어야 합니다. 이를 위해 쿼리와 업데이트 작업을 혼합해 사용합니다.


<div class="content-ad"></div>

# 단계:

- 문서 가져오기 및 확인: _id별로 문서를 가져와서 applications 배열의 각 applicationId를 확인합니다.
- 업데이트 수행: applicationId가 있는지 여부에 따라 기존 객체를 업데이트하거나 새로운 객체를 추가합니다.

# 예시 코드

다음은 Node.js와 MongoDB를 사용하여 이 작업을 수행하는 전체 예시 코드입니다:

<div class="content-ad"></div>

```js
const { MongoClient } = require('mongodb');

// 귀하의 MongoDB 연결 문자열 및 데이터베이스 이름으로 대체합니다.
const uri = 'mongodb://localhost:27017';
const dbName = '당신의데이터베이스이름';
const collectionName = '당신의컬렉션이름';

async function updateApplicationStatuses(userId, updates) {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('MongoDB에 연결되었습니다.');

    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    // 사용자 문서 검색
    const userDoc = await collection.findOne({ _id: userId });

    if (!userDoc) {
      console.log('사용자 문서를 찾을 수 없습니다.');
      return;
    }

    // applications 배열을 초기화합니다.
    if (!userDoc.applications) {
      userDoc.applications = [];
    }

    const updateOperations = [];
    const applicationIds = userDoc.applications.map(app => app.applicationId);

    updates.forEach(update => {
      if (applicationIds.includes(update.applicationId)) {
        // 기존 애플리케이션 상태 업데이트
        updateOperations.push({
          updateOne: {
            filter: { _id: userId, 'applications.applicationId': update.applicationId },
            update: { $set: { 'applications.$.active': update.active } }
          }
        });
      } else {
        // 새로운 애플리케이션 추가
        updateOperations.push({
          updateOne: {
            filter: { _id: userId },
            update: {
              $push: {
                applications: { applicationId: update.applicationId, active: update.active }
              }
            }
          }
        });
      }
    });

    // 일괄 작성 작업 수행
    const result = await collection.bulkWrite(updateOperations);

    if (result.modifiedCount > 0 || result.insertedCount > 0) {
      console.log('애플리케이션 상태를 성공적으로 업데이트했습니다.');
    } else {
      console.log('일치하는 애플리케이션이 없거나 변경 사항이 없습니다.');
    }
  } catch (error) {
    console.error('애플리케이션 상태를 업데이트하는 중 오류 발생:', error);
  } finally {
    await client.close();
  }
}

// 예제 사용법: 여러 애플리케이션을 업데이트
updateApplicationStatuses('userId123', [
  { applicationId: 'Apple', active: true },
  { applicationId: 'Mango', active: false },
  { applicationId: 'Orange', active: true }
]);
```

만약 도움이 되었다면 👏 👏 를 좀 받아도 괜찮으세요? 다른 사람들에게도 도움이 될 수 있도록 글을 공유해주시면 정말 감사하겠습니다 :)

언제나 환호해 주세요...

<img src="https://miro.medium.com/v2/resize:fit:156/0*9zGASKmAOha2Ov3S.gif" />
