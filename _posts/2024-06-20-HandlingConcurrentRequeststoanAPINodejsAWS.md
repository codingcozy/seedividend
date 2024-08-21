---
title: "API에 대한 동시 요청 처리하기 Nodejs, AWS"
description: ""
coverImage: "/assets/img/2024-06-20-HandlingConcurrentRequeststoanAPINodejsAWS_0.png"
date: 2024-06-20 04:20
ogImage:
  url: /assets/img/2024-06-20-HandlingConcurrentRequeststoanAPINodejsAWS_0.png
tag: Tech
originalTitle: "Handling Concurrent Requests to an API: Node.js , AWS."
link: "https://medium.com/@myjob.rajesh/handling-concurrent-requests-node-js-aws-815e489127cd"
isUpdated: true
---

동시에 여러 입찰을 처리하고 실시간 입찰 시스템에서 우승자를 결정하는 것은 데이터 일관성과 공정성을 보장할 때 특히 어려울 수 있습니다. diff database를 사용할 수도 있어요.

단계

## Node.js 서버 설정

Express 및 Mongoose가 포함된 기본 Node.js 서버를 설정하세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
npm init -y
npm install express mongoose body-parser
```

```js
saas-bidding/
│
├── models/
│   ├── bid.js
│   └── auction.js
│
├── routes/
│   ├── bids.js
│   └── auctions.js
│
├── app.js
└── config.js
```

config.js

```js
// config.js
module.exports = {
  mongoURI: "mongodb://localhost:27017/saasbidding",
  port: 3000,
};
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

더하기 기호 뒤에 해당 값을 입력하세요:

Mongoose 모델 생성

경매 모델 (models/auction.js)

```js
// models/auction.js
const mongoose = require("mongoose");

const AuctionSchema = new mongoose.Schema({
  product: { type: String, required: true },
  startingPrice: { type: Number, required: true },
  currentHighestBid: { type: Number, default: 0 },
  highestBidder: { type: mongoose.Schema.Types.ObjectId, ref: "Bidder" },
  endTime: { type: Date, required: true },
});

module.exports = mongoose.model("Auction", AuctionSchema);
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
// models/bid.js
const mongoose = require("mongoose");

const BidSchema = new mongoose.Schema({
  auctionId: { type: mongoose.Schema.Types.ObjectId, ref: "Auction", required: true },
  bidderId: { type: mongoose.Schema.Types.ObjectId, ref: "Bidder", required: true },
  bidAmount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Bid", BidSchema);
```

## Express and Mongoose (app.js)

```js
// app.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config");

const app = express();

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

// Routes
app.use("/bids", require("./routes/bids"));
app.use("/auctions", require("./routes/auctions"));

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
```

Bids 및 Auctions에 대한 라우팅

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

경매 라우트(Auction Routes)는 다음과 같습니다(routes/auctions.js)

```js
// routes/auctions.js
const express = require("express");
const Auction = require("../models/auction");
const router = express.Router();

// 새 경매 생성
router.post("/", async (req, res) => {
  const { product, startingPrice, endTime } = req.body;
  const auction = new Auction({ product, startingPrice, endTime });
  await auction.save();
  res.status(201).send(auction);
});

// 경매 세부 정보 가져오기
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const auction = await Auction.findById(id).populate("highestBidder");
  res.send(auction);
});

module.exports = router;
```

입찰 라우트(Bid Routes)는 다음과 같습니다(routes/bids.js)

```js
// routes/bids.js
const express = require("express");
const mongoose = require("mongoose");
const Bid = require("../models/bid");
const Auction = require("../models/auction");
const router = express.Router();

// 입찰하기
router.post("/", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { auctionId, bidderId, bidAmount } = req.body;

    // 경매 찾기
    const auction = await Auction.findById(auctionId).session(session);
    if (!auction) {
      throw new Error("경매를 찾을 수 없습니다");
    }

    // 입찰이 현재 최고 입찰보다 높은지 확인
    if (bidAmount <= auction.currentHighestBid) {
      throw new Error("입찰 금액은 현재 최고 입찰보다 높아야 합니다");
    }

    // 새로운 입찰 생성
    const bid = new Bid({ auctionId, bidderId, bidAmount });
    await bid.save({ session });

    // 경매에 새로운 최고 입찰로 업데이트
    auction.currentHighestBid = bidAmount;
    auction.highestBidder = bidderId;
    await auction.save({ session });

    await session.commitTransaction();
    session.endSession();
    res.status(201).send(bid);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).send({ error: error.message });
  }
});

// 특정 경매에 대한 모든 입찰 가져오기
router.get("/:auctionId", async (req, res) => {
  const { auctionId } = req.params;
  const bids = await Bid.find({ auctionId }).sort({ timestamp: -1 });
  res.send(bids);
});

module.exports = router;
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 동시에 발생하는 입찰 처리

동시에 발생하는 입찰을 효율적으로 처리하기 위해 MongoDB의 세션과 트랜잭션 기능을 사용하여 원자성을 보장합니다. 주요 단계는 다음과 같습니다:

- 세션 및 트랜잭션 시작: 세션을 시작하여 세션 내의 작업이 원자적으로 실행되도록 합니다.
- 경매 유효성 검사: 경매가 존재하고 유효한지 확인합니다.
- 입찰 유효성 검사: 현재 가장 높은 입찰가보다 입찰이 높은지 확인합니다.
- 경매 업데이트: 입찰이 유효한 경우 새로운 최고 입찰가로 경매를 업데이트합니다.
- 트랜잭션 커밋: 변경 사항을 영구적으로 만들기 위해 트랜잭션을 커밋합니다.
- 오류 처리: 오류 발생 시 트랜잭션을 중단하여 데이터 일관성을 보장합니다.

# AWS 및 자동 스케일링을 활용하여 더 최적화해봅시다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 주요 구성 요소

- Node.js 어플리케이션: API 요청을 처리합니다.
- 부하 분산 장치: 여러 인스턴스에 들어오는 트래픽을 분산합니다.
- 자동 확장: 트래픽에 기반하여 인스턴스 수를 자동으로 조정합니다.
- 메시지 큐: 입찰 요청을 비동기적으로 처리합니다.
- 데이터베이스: 동시에 발생하는 쓰기 및 읽기 작업을 효율적으로 처리합니다.
- 캐시: 읽기 작업을 가속화하고 데이터베이스에 가해지는 부하를 감소시킵니다.
- 마이크로서비스 아키텍처: 구성요소를 분리하고 특정 작업을 효율적으로 처리합니다.

# AWS 아키텍처

- 탄력적 부하 분산기 (ELB): 입찰 요청을 분산합니다.
- 자동 확장 그룹: 응용프로그램 인스턴스가 부하를 처리할 수 있는지 확인합니다.
- Amazon SQS (Simple Queue Service): 입찰 요청 큐를 관리합니다.
- Amazon RDS/DynamoDB: 경매 및 입찰 데이터를 저장합니다.
- Amazon ElastiCache (Redis): 빈번하게 액세스되는 데이터를 캐싱합니다.
- Worker 노드: 큐에서 입찰 요청을 처리합니다.
- Amazon CloudWatch: 인프라를 모니터링하고 확장합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

![이미지](/assets/img/2024-06-20-HandlingConcurrentRequeststoanAPINodejsAWS_0.png)

단계

node.js

```js
npm init -y
npm install express body-parser aws-sdk
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

config.js

```js
module.exports = {
  awsRegion: "us-east-1",
  sqsQueueUrl: "YOUR_SQS_QUEUE_URL",
  mongoURI: "mongodb://localhost:27017/saasbidding",
  port: 3000,
};
```

app.js

```js
const express = require("express");
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");
const config = require("./config");

const app = express();
app.use(bodyParser.json());

AWS.config.update({ region: config.awsRegion });

const sqs = new AWS.SQS();

app.post("/bid", async (req, res) => {
  const { auctionId, bidderId, bidAmount } = req.body;

  const params = {
    MessageBody: JSON.stringify({ auctionId, bidderId, bidAmount }),
    QueueUrl: config.sqsQueueUrl,
  };

  try {
    await sqs.sendMessage(params).promise();
    res.status(200).send({ message: "Bid received" });
  } catch (error) {
    res.status(500).send({ error: "Failed to process bid" });
  }
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

Worker.js 파일 — 이 파일은 SQS에서 메시지를 처리하고 데이터베이스를 업데이트합니다.

```js
const AWS = require("aws-sdk");
const mongoose = require("mongoose");
const Auction = require("./models/auction");
const Bid = require("./models/bid");
const config = require("./config");

AWS.config.update({ region: config.awsRegion });

const sqs = new AWS.SQS();
const queueUrl = config.sqsQueueUrl;

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const processBid = async (message) => {
  const { auctionId, bidderId, bidAmount } = JSON.parse(message.Body);

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const auction = await Auction.findById(auctionId).session(session);
    if (bidAmount <= auction.currentHighestBid) {
      throw new Error("Bid amount must be higher than the current highest bid");
    }

    const bid = new Bid({ auctionId, bidderId, bidAmount });
    await bid.save({ session });

    auction.currentHighestBid = bidAmount;
    auction.highestBidder = bidderId;
    await auction.save({ session });

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const pollQueue = async () => {
  const params = {
    QueueUrl: queueUrl,
    MaxNumberOfMessages: 10,
    WaitTimeSeconds: 20,
  };

  try {
    const data = await sqs.receiveMessage(params).promise();
    if (data.Messages) {
      for (const message of data.Messages) {
        try {
          await processBid(message);
          await sqs.deleteMessage({ QueueUrl: queueUrl, ReceiptHandle: message.ReceiptHandle }).promise();
        } catch (error) {
          console.error("Failed to process bid", error);
        }
      }
    }
  } catch (error) {
    console.error("Failed to receive messages", error);
  }

  setImmediate(pollQueue);
};

pollQueue();
```

## AWS 리소스 구성

- Elastic Load Balancer: ELB를 설정하여 여러 EC2 인스턴스 간에 들어오는 트래픽을 분산합니다.
- Auto Scaling 그룹: 트래픽 패턴에 따라 EC2 인스턴스를 추가하거나 제거할 수 있도록 자동 스케일링을 구성합니다.
- Amazon SQS: 수신된 입찰 요청을 관리하기 위한 SQS 대기열을 생성합니다.
- Amazon RDS/DynamoDB: 경매 및 입찰 데이터를 처리할 데이터베이스를 설정합니다.
- Amazon ElastiCache (Redis): 자주 액세스되는 데이터를 캐싱하여 데이터베이스 부하를 줄이기 위해 Redis를 사용합니다.
- Amazon CloudWatch: 인프라를 모니터링하고 스케일링 이벤트를 트리거할 알림을 설정합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

주의 : 이 코드는 샘플입니다. 조심해서 사용해주세요.
