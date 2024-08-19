---
title: "AWS 데이터 침해 디렉토리 순회를 통한 보안 취약점"
description: ""
coverImage: "/assets/img/2024-08-19-DirectoryTraversaltoAWSDataBreach_0.png"
date: 2024-08-19 03:11
ogImage: 
  url: /assets/img/2024-08-19-DirectoryTraversaltoAWSDataBreach_0.png
tag: Tech
originalTitle: "Directory Traversal to AWS Data Breach"
link: "https://medium.com/@starlox/directory-traversal-to-aws-data-breach-1d115dc39614"
isUpdated: true
updatedAt: 1724032906834
---


<img src="/assets/img/2024-08-19-DirectoryTraversaltoAWSDataBreach_0.png" />

# Recon :

일반적으로 감시는 공격의 가장 중요한 부분입니다. 이미 범위 내의 IP주소가 제공되었습니다.

```js
13.50.73.5
```

<div class="content-ad"></div>

Nmap으로 IP를 스캔한 후에 1개의 포트가 열려 있다는 결과를 얻었어요: 80 (http).

![이미지](/assets/img/2024-08-19-DirectoryTraversaltoAWSDataBreach_1.png)

그래서 브라우저에서 해당 웹사이트를 방문해 보니 아래와 같았어요.

![이미지](/assets/img/2024-08-19-DirectoryTraversaltoAWSDataBreach_2.png)

<div class="content-ad"></div>

응 그럼 나는 ffuf를 사용하여 디렉터리 브루트 포스 스캔을 시작해. 

```js
ffuf -u http://13.50.73.5/FUZZ -w /path/to/a/wordlist.txt
```

<img src="/assets/img/2024-08-19-DirectoryTraversaltoAWSDataBreach_3.png" />

여기에서 몇 가지 엔드포인트를 받았어. 그런데 인보이스 페이지를 방문하고 나서 나를 등록 계정 페이지로 리디렉션했어. 그래서 나는 계정을 등록해 보려고 했어.

<div class="content-ad"></div>


![이미지](/assets/img/2024-08-19-DirectoryTraversaltoAWSDataBreach_4.png)

로그인 후에 송장 페이지에 접속해서 송장의 CSV 파일을 내보낼 수 있는 페이지를 발견했어요.

![이미지](/assets/img/2024-08-19-DirectoryTraversaltoAWSDataBreach_5.png)

그래서 내려받아 보려고 하는데, 요청이 이렇게 되었어요. API 엔드포인트를 사용하고 있네요.


<div class="content-ad"></div>


![Image](/assets/img/2024-08-19-DirectoryTraversaltoAWSDataBreach_6.png)

# Path Traversal로 인한 데이터 노출:

앞으로 버튼을 클릭한 후 다음 EndPoint로 이동됩니다.

```js
GET /download?file=something.csv
```

<div class="content-ad"></div>


![이러한 종류의 요청은 때로 사용자 입력을 제대로 처리하지 않으면 경로 순회에 취약합니다. 그래서 나는 그것을 Repeater에 보내서 테스트했고 실제로 취약함을 발견했습니다. Passwd 파일을 볼 수 있어요.](/assets/img/2024-08-19-DirectoryTraversaltoAWSDataBreach_7.png)

![일부 유효한 사용자를 찾았습니다 → User 및 nedf.](/assets/img/2024-08-19-DirectoryTraversaltoAWSDataBreach_8.png)


<div class="content-ad"></div>


![이미지](/assets/img/2024-08-19-DirectoryTraversaltoAWSDataBreach_9.png)

다음 과정에 따라 확인했어요. nedf 사용자를 위해 시도해봤는데, 유효한 디렉터리를 찾았어요.

![이미지](/assets/img/2024-08-19-DirectoryTraversaltoAWSDataBreach_10.png)

그래서 .ssh처럼 .aws 디렉터리가 있는지 검색했어요. 그 안에 AWS 자격 증명이 포함돼 있기 때문이죠.


<div class="content-ad"></div>

```js
AWS 자격 증명 경로 --> .aws/credentials
```

그리고 유효한 자격 증명을 획득했어요. Access_key 및 Secret_key.

<img src="/assets/img/2024-08-19-DirectoryTraversaltoAWSDataBreach_11.png" />

또 다른 것은 웹 사이트 자원이 S3 버킷에 호스팅되어 있다는 것이에요. 소스 코드를 보려고 했는데 발견했어요.

<div class="content-ad"></div>

```js
버킷 : huge-logistics-bucket
```

![이미지](/assets/img/2024-08-19-DirectoryTraversaltoAWSDataBreach_12.png)

# AWS에 접속 :

저는 디렉터리 순회를 통해 찾은 AWS 자격 증명을 사용하여 해당 버킷에 액세스를 시도해 봤어요. 인증 없이 목록화되지 않기 때문이에요.

<div class="content-ad"></div>

<img src="/assets/img/2024-08-19-DirectoryTraversaltoAWSDataBreach_13.png" />

인증 이후에 awscli 도구를 사용하여 Bucket에 쉽게 액세스할 수 있어요.

```js
cmd> aws configure
cmd> aws sts get-caller-identity [현재 AWS 사용자 확인하기]
```

<img src="/assets/img/2024-08-19-DirectoryTraversaltoAWSDataBreach_14.png" />

<div class="content-ad"></div>

그럼 버킷을 나열해보겠습니다.

![이미지1](/assets/img/2024-08-19-DirectoryTraversaltoAWSDataBreach_15.png)

VM에 내용을 복사했습니다.

![이미지2](/assets/img/2024-08-19-DirectoryTraversaltoAWSDataBreach_16.png)

<div class="content-ad"></div>

CTF 도전 과제이기 때문에 일부 Flag를 찾았습니다. 하지만 실제 상황에서는 민감한 정보가 포함될 수 있습니다.

오늘은 여기까지입니다. 새로운 것을 배우셨기를 바랍니다!

AWS에 대해 더 배우고 싶다면 PwnedLabs 플랫폼에서 시도해 보세요. AWS 공격을 배우기에 아주 좋은 플랫폼입니다.

독서해 주셔서 감사합니다!

<div class="content-ad"></div>

이 글이 마음에 드시면 좋아요와 팔로우 눌러주세요. 더 많은 기사를 보실 수 있습니다.

즐거운 개발 되세요~