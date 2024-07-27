---
title: "리액트JS를 사용하여 Amazon S3로 파일을 업로드하기 위한 사전 서명 된 URL 사용하기"
description: ""
coverImage: "/assets/img/2024-05-12-UsingPre-SignedURLstoUploadFilestoAmazonS3FromReactJS_0.png"
date: 2024-05-12 20:26
ogImage: 
  url: /assets/img/2024-05-12-UsingPre-SignedURLstoUploadFilestoAmazonS3FromReactJS_0.png
tag: Tech
originalTitle: "Using Pre-Signed URLs to Upload Files to Amazon S3 From ReactJS"
link: "https://medium.com/@allardqjy/using-pre-signed-urls-to-upload-files-to-amazon-s3-from-reactjs-5b15c94b66df"
---


## 아마존 S3와 웹 애플리케이션을 연결하는 초보자 가이드

파일을 아마존 S3에 업로드하는 것은 상대적으로 간단하고 흔한 작업일 줄 알았습니다. 버킷을 설정하고 자격 증명을 사용하여 요청을 보내기만 하면 되는 것 아닐까요? 그렇게 복잡할 수 없겠죠?

유튜브, 스택 오버플로우, 그리고 AWS 자체 문서와 블로그에서 사용할 수 있는 다양한 리소스들이 있습니다 (리소스의 전체 목록은 아래에서 찾아볼 수 있습니다). 그러나 저 (그리고 아마 여러분도) 곧 깨닫게 될 것은, 특히 부주의한 실수를 범하기 쉬운 초보자라면 생각했던 것보다 간단하지 않다는 것입니다.

본래 제 목표는 (이미지, 비디오 등등) 파일을 웹 애플리케이션을 통해 업로드하고 버튼을 클릭하면 S3 버킷에 업로드되도록 하는 것이었습니다. 이를 위해 제가 찾은 방법은 웹 애플리케이션과 AWS 백엔드 사이에서 요청을 보내기 위해 사전 서명된 URL을 사용하는 것입니다. 이런식으로 동작합니다:



![이미지](/assets/img/2024-05-12-UsingPre-SignedURLstoUploadFilestoAmazonS3FromReactJS_0.png)

요약하면 이렇게 해야 합니다: 이 실제 작동 방식에 대한 더 자세한 내용은 하단의 자료에서 링크된 블로그 포스트를 확인하는 것을 추천합니다. 그러나 이 게시물에서는 가능한 단순한 용어로 설정하는 프로세스를 주로 살펴보려고 할 것이기 때문에 더 이해하기 쉽도록 노력하겠습니다. 준비되셨나요? 🙂 

상상할 수 있겠지만, 설정해야 할 4가지 주요 구성 요소가 있습니다: Amazon S3, AWS Lambda, Amazon API Gateway, 그리고 물론 응용 프로그램 프론트엔드입니다. 이번에 우리가 따라갈 단계를 아래에서 요약해 보겠습니다:



- Amazon S3 설정하기
1.1 S3 버킷 생성
1.2 S3 버킷에 CORS 활성화하기

- AWS Lambda 설정하기
2.1 AWS Lambda 함수 생성
2.2 Lambda 함수 테스트하기
2.3 Lambda 함수 IAM 역할에 S3 액세스 활성화하기

- Amazon API GateWay 설정하기
3.1 HTTP API 엔드포인트 생성
3.2 Postman을 사용하여 엔드포인트 테스트하기

- 업로더 컴포넌트 설정하기
4.1 필수 라이브러리 설치하기
4.2 API GateWay로 요청을 하는 함수 설정하기

이 방법으로 간단한 작업을 수행하기 위해 배포 단계에서 많은 구성이 진행되며, 때로는 AWS의 오류 메시지가 모호하여 문제가 발생한 구체적인 위치를 파악하기 어려울 수 있습니다. (위의 비디오에 좋은 예시가 있음).

# 단계 1: Amazon S3 설정하기

## 단계 1.1: S3 버킷 생성하기



먼저, 아직 S3 버킷이 없다면 만드세요. 설명적인 이름을 지정하고 보안상의 이유로 "모든 공개 액세스 차단"란에 체크하세요 (물론 공개 액세스를 허용하고 싶다면 그렇게 하셔도 됩니다).

<img src="/assets/img/2024-05-12-UsingPre-SignedURLstoUploadFilestoAmazonS3FromReactJS_1.png" />

## 단계 1.2: S3 버킷에 CORS 활성화하기

다음으로, 방금 생성한 버킷을 클릭하고 "Permissions(권한)" 탭으로 이동하세요.



`<img src="/assets/img/2024-05-12-UsingPre-SignedURLstoUploadFilestoAmazonS3FromReactJS_2.png" />`

바닥으로 스크롤을 내려 CORS 섹션을 찾아 "편집"을 클릭하세요.

`<img src="/assets/img/2024-05-12-UsingPre-SignedURLstoUploadFilestoAmazonS3FromReactJS_3.png" />`

그리고 아래 JSON을 붙여넣으세요:



```js
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "GET"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    }
]
```

작업을 마치면 외부 출처(예: React 애플리케이션)에 S3 버킷으로의 "PUT" 및 "GET" 요청을 허용할 수 있게 될 것입니다.

# 단계 2: AWS Lambda 설정

AWS Lambda는 서버리스 컴퓨트 서비스로, 어떤 종류의 응용 프로그램이나 백엔드 서비스에도 코드를 실행할 수 있도록 해주며 어떠한 관리도 필요하지 않습니다. 여기에서는 이전에 만든 S3 버킷에서 사전 서명된 URL을 얻는 데 AWS Lambda를 사용할 것입니다.



## 단계 2.1: AWS 람다 함수 생성하기

기본 설정을 사용하여 함수에 설명적인 이름을 지정하고 함수를 만듭니다:

![lambda-function](/assets/img/2024-05-12-UsingPre-SignedURLstoUploadFilestoAmazonS3FromReactJS_4.png)

함수가 생성되면 "코드" 탭으로 이동하여 "index.js" 파일을 엽니다.



위의 템플릿 코드를 다음으로 대체해주세요:

기본적으로 여기서 일어나는 것은 람다 함수가 S3 버킷에서 사전 서명된 URL을 요청하는 것입니다. 9번째 줄은 진입점이며, getUploadURL 함수(12번부터 정의됨)가 호출됩니다. 반환된 결과는 다음을 포함하는 JSON 객체입니다:

- 실제 파일을 업로드하는 데 사용할 "uploadURL"
- 파일 업로드 시 S3에 표시될 "filename" (파일이 성공적으로 업로드되면 표시되는 파일 이름)

주의하세요! 필요에 맞게 변경하고 싶을 수 있는 3줄이 있습니다:



- 4번 줄: 여기에 실제 버킷 이름을 사용하세요
- 14번 줄: 업로드된 파일 이름을 사용자 정의하고 싶다면
- 21번 줄: ContentType을 업로드할 파일과 일치하도록 변경하세요

## 단계 2.2: Lambda 함수 테스트하기

이제 Lambda에서 함수를 테스트할 준비가 되었습니다. 그러나 "테스트"를 클릭하기 전에 변경 사항을 배포했는지 확인하세요!

![이미지](/assets/img/2024-05-12-UsingPre-SignedURLstoUploadFilestoAmazonS3FromReactJS_5.png)



"Test"을 클릭하면 테스트에 이름을 지어서 만들어보세요.

![이미지](/assets/img/2024-05-12-UsingPre-SignedURLstoUploadFilestoAmazonS3FromReactJS_6.png)

실제로 함수를 테스트하면 실행 결과로 이와 같은 출력이 나올 것입니다:

![이미지](/assets/img/2024-05-12-UsingPre-SignedURLstoUploadFilestoAmazonS3FromReactJS_7.png)



응당이 JSON 본문을 포함하고 있어서 uploadURL과 filename이 나옵니다.

## 단계 2.3: 람다 기능 IAM 역할에 대한 S3 액세스 활성화

아마도 다음 단계는 덜 직관적일 수 있습니다. 이곳에서 우리는 람다 함수가 S3 버킷과 통신할 수 있도록 권한을 부여해야 합니다.

"구성"으로 이동하여 "실행 역할" 아래의 IAM 역할 이름을 클릭하십시오. IAM은 Identity Access Management의 약자로, AWS가 각 도구나 서비스가 갖는 권한을 관리하는 데 사용됩니다.



<img src="/assets/img/2024-05-12-UsingPre-SignedURLstoUploadFilestoAmazonS3FromReactJS_8.png" />

현재 IAM 역할을 검토하면 람다 함수를 실행하는 권한만 있고 S3에 대한 권한이 없는 것을 확인할 수 있습니다.

<img src="/assets/img/2024-05-12-UsingPre-SignedURLstoUploadFilestoAmazonS3FromReactJS_9.png" />

권한을 부여하려면 "정책 연결"을 클릭하고 검색 창에 "S3"를 입력한 다음 "S3FullAccess"를 선택한 후 "정책 연결"을 클릭하세요.



이제 S3 버킷에 파일 개체를 넣을 수 있게 되었어요!

참고: 더 나은 보안 관행을 위해 실제로는 Lambda 함수에 대해 S3 버킷과 관련된 객체를 가져오고 넣는 권한만 부여해야 합니다. 또한 해당 S3 버킷에 대해만 권한이 적용될 수 있도록 권한을 제한해야 합니다. 이 작업을 실제로 어떻게 수행하는지 확인하려면 AWS의 리소스 섹션에서 제공하는 비디오 자습서를 참조하세요.

# 단계 3: Amazon API Gateway 설정

좋아요, 그래서 AWS에서 Lambda 함수를 테스트했는데, 어떻게 웹 애플리케이션에서 동일한 Lambda 함수를 실행할 수 있을까요? 그렇게 하려면 호출할 수 있는 API 엔드포인트를 설정해야 합니다. 다행히도, AWS는 이를 우리에게 Amazon API Gateway를 통해 제공해줍니다.



## 단계 3.1 HTTP API 엔드포인트 생성

Lambda 함수로 이동하여 "추가 트리거"를 클릭하여 Lambda 함수가 실행되도록 트리거할 HTTP 엔드포인트를 생성합니다.

![Lambda function trigger](/assets/img/2024-05-12-UsingPre-SignedURLstoUploadFilestoAmazonS3FromReactJS_10.png)

보안을 "열림"으로 설정하고 CORS를 활성화합니다.



<img src="/assets/img/2024-05-12-UsingPre-SignedURLstoUploadFilestoAmazonS3FromReactJS_11.png" />

트리거를 추가하면 "Triggers" 섹션에서 엔드포인트를 가져올 수 있습니다:

<img src="/assets/img/2024-05-12-UsingPre-SignedURLstoUploadFilestoAmazonS3FromReactJS_12.png" />

## 단계 3.2. Postman을 사용하여 엔드포인트를 테스트합니다



지금까지 모든 것을 올바르게 설정했는지 확인하기 위해 Postman을 사용하여이 엔드포인트를 테스트할 수 있습니다. 엔드포인트를 복사하고 다음과 같이 GET 요청을 만들어보세요:

[마크다운 링크](/assets/img/2024-05-12-UsingPre-SignedURLstoUploadFilestoAmazonS3FromReactJS_13.png)

다음으로 uploadURL 값을 복사하고 다른 요청을 만들어보세요. 이번에는 메소드를 "PUT"로 변경하고 테스트를 위해 샘플 .jpeg 이미지를 업로드하세요. 이미지를 업로드하려면 'Body' 탭을 선택하고 파일 시스템에서 파일을 선택할 수 있게 해주는 'binary' 옵션을 선택하세요. 모두 준비가 되었으면 "Send"를 클릭하세요. 반응에 오류 메시지가 표시되지 않는다면, 그것은 좋은 신호입니다!


[마크다운 링크](/assets/img/2024-05-12-UsingPre-SignedURLstoUploadFilestoAmazonS3FromReactJS_14.png)



이제 S3 버킷을 확인해 보세요. 무작위로 생성된 파일 이름을 가진 파일이 업로드된 것을 확인할 수 있어요:

![Uploaded File](/assets/img/2024-05-12-UsingPre-SignedURLstoUploadFilestoAmazonS3FromReactJS_15.png)

# 단계 4: 업로더 컴포넌트 설정

이제 거의 끝났어요! 프론트엔드 부분에서는 업로더 컴포넌트가 어떻게 보이길 원하는지는 자유롭게 결정할 수 있어요. 이 예시에서는 react-dropzone-uploader 패키지를 사용했지만, 여러분이 원하는 대로 사용할 수 있어요. 먼저 axios와 필요한 다른 패키지를 설치하세요. (이 경우, 나는 react-dropzone-uploader를 사용했어요)



## 단계 4.1: 필수 패키지 설치

```js
npm install axios react-dropzone-uploader
```

## 단계 4.2 API Gateway에 요청을 보내는 함수 설정

웹 애플리케이션 코드에서 axios가 필요하며(API_GATEWAY_SECRET 엔드포인트 URL)를 API 엔드포인트 URL로 교체합니다.



30번 라인에서 파일을 제출할 수 있게 해주는 Dropzone 컴포넌트가 있어요 (원하시면 마음에 드는 컴포넌트로 디자인해도 괜찮아요).

이제 우리는 handleSubmit 함수(Line 13)를 사용하여 Postman에서 했던 두 단계 과정을 거의 똑같이 따를 거에요. 먼저 API 엔드포인트로 "GET" 요청을 보내고, 그런 다음 응답으로 반환된 사전 서명된 uploadURL로 "PUT" 요청을 보내면 돼요.

그리고 이제 마침내 끝났어요! 이 예제에서 .jpeg 이미지 파일을 앱에 제출하면 Amazon S3로 업로드되는 것을 확인할 수 있을 걸요 👍

# 마무리



간단히 말해, AWS를 구성하는 것은 어렵고 지루해 보일 수 있지만, 이 기사가 여러분께 사전 서명된 URL을 사용하여 Amazon S3로 파일을 업로드하는 프로세스를 더 잘 이해할 수 있게 도움이 되기를 바랍니다. 도움이 되었다면 좋아요와 공유도 부탁드리며, 더 나은 방법이나 궁금한 점이 있으면 언제든지 연락해 주세요! 💪

## 자료

- AWS 블로그 글: [https://aws.amazon.com/blogs/compute/uploading-to-amazon-s3-directly-from-a-web-or-mobile-application/](https://aws.amazon.com/blogs/compute/uploading-to-amazon-s3-directly-from-a-web-or-mobile-application/)
- AWS 유튜브 튜토리얼: [https://www.youtube.com/watch?v=mw_-0iCVpUc&ab_channel=AmazonWebServices](https://www.youtube.com/watch?v=mw_-0iCVpUc&ab_channel=AmazonWebServices)
- AWS GitHub 저장소: [https://github.com/aws-samples/amazon-s3-presigned-urls-aws-sam](https://github.com/aws-samples/amazon-s3-presigned-urls-aws-sam)
- 내 GitHub 저장소: [https://github.com/AllardQuek/react-demo](https://github.com/AllardQuek/react-demo)
- CORS: [https://www.youtube.com/watch?v=4KHiSt0oLJ0](https://www.youtube.com/watch?v=4KHiSt0oLJ0)

![이미지](/assets/img/2024-05-12-UsingPre-SignedURLstoUploadFilestoAmazonS3FromReactJS_16.png)