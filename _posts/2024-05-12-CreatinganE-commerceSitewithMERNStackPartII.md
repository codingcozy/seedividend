---
title: "MERN 스택으로 전자 상거래 사이트 만들기 - Part II"
description: ""
coverImage: "/assets/img/2024-05-12-CreatinganE-commerceSitewithMERNStackPartII_0.png"
date: 2024-05-12 19:45
ogImage: 
  url: /assets/img/2024-05-12-CreatinganE-commerceSitewithMERNStackPartII_0.png
tag: Tech
originalTitle: "Creating an E-commerce Site with MERN Stack — Part II"
link: "https://medium.com/@tokosbex/creating-an-e-commerce-site-with-mern-stack-part-ii-d6fd908c7151"
---


<img src="/assets/img/2024-05-12-CreatinganE-commerceSitewithMERNStackPartII_0.png" />

회고

이전 기사에서 환경을 설정했고 기본 프로젝트를 설정했습니다.

지금은 React 프론트엔드 프로젝트와 Node.js 백엔드 프로젝트가 있습니다. 이 기사에서는 백엔드를 Mongo DB에 연결하고 Mongo DB 기본 사항을 학습하는 것에 초점을 맞추고 있습니다.



만약 이 기술들이 처음이라면 첫 부분을 읽어보세요. 익숙하다면 즐겁게 즉시 시작하세요. :)

소개

Node.js와 MongoDB를 연결하는 것은 백엔드 데이터베이스가 필요한 애플리케이션을 개발하는 중요한 단계입니다.

이 두 기술을 결합함으로써 우리는 대량의 데이터를 처리하고 빠른 응답 시간을 제공할 수 있는 강력하고 효율적인 애플리케이션을 만들 수 있습니다. 이 글에서는 Mongoose 패키지를 사용하여 Node.js와 MongoDB를 어떻게 연결하는지 살펴볼 것입니다. Mongoose는 MongoDB 위에 높은 수준의 추상화를 제공하며 데이터 모델을 구조화된 방법으로 정의할 수 있게 해줍니다. 또한 Node.js에서 MongoDB를 다루는 데 도움이 되는 몇 가지 모법과 팁을 알려드리겠습니다.



연결 설정하기

```js
const express = require("express");

//mongoose 패키지를 불러옵니다

const mongoose = require("mongoose");

const app = express();

const port = 5000;

//연결 생성하기

mongoose

.connect("mongodb://127.0.0.1/ECommerce")

.then(() => console.log("MongoDB에 연결되었습니다..."))

.catch((err) => console.error("MongoDB에 연결할 수 없습니다..."));

app.get("/", (req, res) => {

res.send("안녕, 세계!");

});

app.listen(port, () => {

console.log(`포트 ${port}에서 서버가 실행 중입니다`);

});
```

위 코드에서는 로컬호스트에서 실행 중인 MongoDB 데이터베이스에 연결합니다. 연결이 설정되면 mongoose 객체를 사용하여 데이터베이스와 상호 작용할 수 있습니다.

추가 설치 및 설정



크로스 오리진 리소스 공유(CORS)는 웹 애플리케이션에서 다른 도메인으로의 HTTP 요청을 제한하는 보안 메커니즘입니다. 기본적으로 웹 브라우저는 이러한 요청을 차단하여 사용자 데이터에 무단 접근을 방지합니다. Node.js Express 서버와 React 애플리케이션의 경우, 서버가 React 앱 도메인에서의 요청을 허용하지 않으면 CORS 오류가 발생할 수 있습니다. 이 오류를 피하기 위해 Express 서버를 설정하여 React 앱 도메인에서의 요청을 허용하도록 cors 미들웨어를 추가하고 적절한 출처를 허용하도록 구성할 수 있습니다. 이렇게 하면 React 앱이 서버로 요청을 보내고 CORS 오류 없이 데이터를 검색할 수 있습니다.

cors 패키지를 다음 명령어로 설치하고:

```js
npm install cors
```

그리고 몽구스 연결 다음에 다음 코드를 추가하고 파일 상단에 패키지를 import하세요:



```js
const cors = require("cors");
app.use(cors()); 
```

우리 제품 모델 정의하기

MongoDB에서 데이터는 JSON 객체와 유사한 문서 형식으로 저장됩니다. 모델은 이러한 문서의 구조를 정의하는 방법을 제공하며, 필드와 데이터 유형을 포함합니다. 모델을 정의함으로써 데이터가 일관되고 유효하며 쉽게 관리되도록 할 수 있습니다. 또한 서로 다른 모델 간의 관계를 정의할 수 있으므로 여러 컬렉션 간에 효율적으로 데이터를 쿼리하고 조작할 수 있습니다.

전자 상거래 웹사이트를 구축하는 동안 먼저 제품 모델을 정의합니다. 우리는 스키마 정의, 데이터 유효성 검사, 쿼리 및 Node.js에서 MongoDB 모델을 사용하는 데 가장 좋은 방법을 다룰 것입니다.



백엔드 폴더 안에 Models 폴더를 생성하고 product.js 파일을 만들어주세요. 그리고 product.js 파일 안에 다음 코드를 추가해주세요:

```js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  images: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

exports.Product = Product;
```

위 코드에서는 Mongoose 패키지를 사용해 제품에 대한 모델을 정의하고 있어요. 이 모델은 제품이 가질 수 있는 속성을 정의하는데, title, description, price, discount percentage, rating, stock, brand, category, thumbnail, images가 포함돼요. 첫 줄은 스키마를 만들기 위해 필요한 Mongoose 패키지를 가져오는 것이에요. 그리고 mongoose.Schema() 메소드를 사용해 제품을 위한 새로운 스키마를 만들어요. 이 메소드는 키-값 쌍을 가진 객체를 전달받는데, 키는 속성의 이름이고 값은 속성을 설명하는 객체에요.

각 속성은 type과 required 필드를 가지고 있어요. type 필드는 속성의 데이터 타입을 지정하고, required 필드는 제품에 대해 필수인지를 나타내요.



스키마를 정의한 후에는 mongoose.model() 메서드를 사용하여 모델을 만듭니다. 이 메서드는 두 개의 인수, 즉 모델의 이름과 이전에 만든 스키마를 사용합니다. 이 경우 모델의 이름은 Product이며 스키마는 productSchema에 할당됩니다.

마지막으로, Product 모델을 내보내어 응용 프로그램의 다른 부분에서 사용할 수 있도록 합니다.

기본 CRUD 함수

기본 CRUD 함수는 데이터베이스 시스템의 영속 저장을 위한 네 가지 기본 작업인 Create, Read, Update 및 Delete를 의미합니다. 이러한 함수는 데이터베이스에서 데이터를 조작하는 데 사용됩니다.



- "Create" 작업은 데이터베이스에 새 데이터를 추가하는 데 사용됩니다.
- "Read" 작업은 데이터베이스에서 기존 데이터를 검색하는 데 사용됩니다.
- "Update" 작업은 데이터베이스의 기존 데이터를 수정하는 데 사용됩니다.
- "Delete" 작업은 데이터베이스에서 데이터를 제거하는 데 사용됩니다.

CRUD 함수는 데이터 관리와 관련된 웹 애플리케이션이나 소프트웨어를 개발할 때 필수적입니다. 이를 통해 데이터를 효과적으로 관리하고 효율적으로 처리하여 사용자가 올바른 정보에 올바른 시간에 액세스할 수 있도록 합니다.

우리의 제품 모델을 기반으로 index.js에 다음 라우트를 추가해주세요:

```js
//새 제품을 생성합니다.
app.post("/create", async (req, res) => {
  const newProduct = new Product({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    discountPercentage: req.body.discountPercentage,
    rating: req.body.rating,
    stock: req.body.stock,
    brand: req.body.brand,
    category: req.body.category,
    thumbnail: req.body.thumbnail,
    images: req.body.images,
  });

  await Product.create(newProduct);
  res.send("제품이 데이터베이스에 저장되었습니다!");
});
```



```js
// 모든 제품 목록 가져오기
app.get("/read", async (req, res) => {
  const productList = await Product.find();
  res.send(JSON.stringify(productList));
});
```

```js
// id를 기반으로 제품 업데이트
app.put("/update/:id", async (req, res) => {
  const product_id = req.params.id;
  await Product.findByIdAndUpdate(product_id, {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    discountPercentage: req.body.discountPercentage,
    rating: req.body.rating,
    stock: req.body.stock,
    brand: req.body.brand,
    category: req.body.category,
    thumbnail: req.body.thumbnail,
    images: req.body.images,
  });

  res.send("제품이 성공적으로 업데이트되었습니다!");
});
``` 

```js
// id를 기반으로 제품 삭제
app.delete("/delete/:id", async (req, res) => {
  const product_id = req.params.id;
  await Product.findByIdAndDelete(product_id);
  res.send("제품이 삭제되었습니다!");
});
```

위 코드에서 제품을 조작하는 네 가지 기본 라우트를 볼 수 있습니다. 프론트엔드 없이 테스트하려면 API 테스트 도구가 필요합니다. 저는 Postman(https://www.postman.com/)을 사용할 예정이지만, 다른 API 테스트 도구를 잘 알고 있다면 사용해도 좋습니다!




테스트해 봐요!

create 메서드를 사용하면 데이터베이스에 새 제품을 추가할 수 있고 성공적인 응답을 받을 수 있어요!

<img src="/assets/img/2024-05-12-CreatinganE-commerceSitewithMERNStackPartII_1.png" />

update 메서드를 사용하면 특정 제품을 업데이트할 수 있어요.



<img src="/assets/img/2024-05-12-CreatinganE-commerceSitewithMERNStackPartII_2.png" />

삭제 메소드를 사용하여 데이터베이스에서 ID별 제품을 삭제할 수 있습니다.

<img src="/assets/img/2024-05-12-CreatinganE-commerceSitewithMERNStackPartII_3.png" />

get 메소드를 사용하여 데이터베이스에서 모든 제품을 검색할 수 있습니다.



![이미지](/assets/img/2024-05-12-CreatinganE-commerceSitewithMERNStackPartII_4.png)

체크를 수행하려면 Mongo DB Compass에서 다음 단계를 따르기만 하면 됩니다:

- Mongo DB Compass를 엽니다.
- 확인하려는 데이터베이스에 연결합니다.
- 확인하려는 컬렉션을 선택합니다.
- 컬렉션의 문서를 보고 데이터가 올바른지 확인합니다.

Mongo DB Compass에서 정기적인 확인을 수행함으로써 데이터의 정확성과 최신 상태를 보장할 수 있습니다. 특히 전자 상거래 웹사이트와 같이 대량의 데이터를 처리할 때 이 기능은 매우 중요합니다. 애플리케이션이 원활하게 작동하는지 확인하려면 꾸준한 확인을 잊지 마세요!



![이미지](/assets/img/2024-05-12-CreatinganE-commerceSitewithMERNStackPartII_5.png)

단일 제품을 가져오는 방법은 업데이트 함수와 매우 유사합니다. 단순히 id를 포함하고 .findById() 함수를 사용하면 됩니다. 마지막에 제품 객체를 반환합니다.

이 연습을 좋은 도전으로 생각해보고 혼자서 작성해 보세요. 한번 시도해보고 어떻게 진행되는지 확인해보세요! 만약 잘 되지 않는다면 걱정하지 마세요! 항상 GitHub에서 해결책을 찾을 수 있습니다.

마무리



이 글에서는 Node.js로 MongoDB 데이터베이스를 조회하는 기본적인 내용을 다뤘어요. 우리는 기본 CRUD 함수를 생성하고 활용했는데, 이에 대해 더 깊이 들어가는 내용은 다음 글에서 다룰 예정이에요. 저희의 GitHub 저장소에서 코드를 확인하지 않으시면 안돼요! 다음 파트에서 뵙겠습니다!