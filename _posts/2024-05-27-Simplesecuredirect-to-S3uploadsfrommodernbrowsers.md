---
title: "모던 브라우저에서 AWS S3 직접 업로드하는 방법"
description: ""
coverImage: "/assets/img/2024-05-27-Simplesecuredirect-to-S3uploadsfrommodernbrowsers_0.png"
date: 2024-05-27 18:48
ogImage:
  url: /assets/img/2024-05-27-Simplesecuredirect-to-S3uploadsfrommodernbrowsers_0.png
tag: Tech
originalTitle: "Simple , secure direct-to-S3 uploads from modern browsers"
link: "https://medium.com/@taylorhughes/simple-secure-direct-to-s3-uploads-from-modern-browsers-f42695e596ba"
isUpdated: true
---

안녕하세요, 제 이름은 Taylor Hughes입니다. 소프트웨어 엔지니어입니다. 저는 페이스북, 구글, 클럽하우스 및 중간의 여러 스타트업에서 앱을 출시하고 팀을 구축했습니다.

사용자가 S3 버킷에 파일을 업로드할 수 있는 방법을 제공하는 문제는 모든 프로젝트에서 마주치는 문제입니다. 그러나 올바른 JavaScript 구성 요소를 식별하고 모든 것을 함께 작동하도록 설정하여이 작업을 수행하는 것은 마법처럼 느껴집니다.

AWS 문서에 따르면 추가 인증 서비스를 설정하고 전체 AWS JS SDK를 클라이언트 코드로 가져와야하지만 실제로 그럴 필요는 없습니다!

대신 사전 서명된 URL 및 현대적인 웹 API를 사용하여 브라우저에서 손쉽게 S3로 직접 업로드 할 수 있습니다. 코드 몇 줄을 사용하면 됩니다.

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

사용자 브라우저의 관점에서 전체 솔루션은 다음과 같습니다:

- 사용자가 "파일 업로드"를 클릭하고 파일을 선택합니다.
- 해당 파일의 메타데이터를 기반으로 서버 측 API에서 미리 서명된 S3 PutObject URL을 요청합니다.
- 미리 서명된 S3 URL을 제공받으면 브라우저는 XmlHttpRequest를 사용하여 파일을 PUT하고 진행 상황을 모니터링할 수 있습니다.
- 업로드가 완료되면 브라우저는 새 키를 다시 API로 반환하여 업로드된 파일에 대해 API가 수행해야 하는 작업을 트리거합니다.
- 이윤 창출!

만약 완성된 코드로 바로 이동하고 싶다면, TypeScript 프론트엔드 및 Python API 핸들러 예시가 포함된 gist를 확인해보세요.

이 게시물에서는 단계별로 진행해 보겠습니다:

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

## AWS 구성

먼저, 공개 액세스가 비활성화되어 있고 액세스 정책이 없는 새 버킷 yourproject-upload을 만듭니다. (또한 이 버킷에 대해 모든 것을 24시간 후에 만료되도록 하는 라이프사이클 규칙을 추가했습니다 — 업로드된 파일을 다른 위치로 이동하여 공개적으로 사용합니다.)

둘째, web-upload-only라는 새 IAM 사용자를 추가합니다. 새 사용자의 액세스 키와 비밀을 가져와서 이를 백엔드 웹 서버에 추가하세요. (이 자격 증명은 주 AWS 자격 증명과 별도여야 합니다.)

셋째, web-upload-only에게 새 버킷 yourproject-upload/\*의 모든 경로에 대한 s3:PutObject 액세스 권한을 부여합니다. (우리는 사전 서명된 PutObject URL을 반환할 때 쓰기 키를 제한할 것입니다.)

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

<img src="/assets/img/2024-05-27-Simplesecuredirect-to-S3uploadsfrommodernbrowsers_0.png" />

마지막으로, 일반 AWS 역할 또는 사용자에게 yourproject-upload/\* 버킷에 s3:GetObject 액세스도 부여하세요. 업로드 버킷에서 파일을 가져와 main/public 서빙 버킷으로 옮기기 위해 더 많은 권한을 가진 다른 사용자가 필요합니다.

## 웹 서버: "업로드 생성" API 엔드포인트 추가

새 IAM 사용자의 액세스 키와 시크릿을 얻었다면 이제 S3에 특정 키를 쓸 수 있는 사전 서명된 URL을 생성할 수 있습니다.

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

새로운 엔드포인트로 전송되는 입력은 다음과 같습니다:

- content_type — 브라우저의 PUT 요청의 컨텐츠 유형으로 설정될 파일의 MIME 유형이며, 서명에 포함되어야 합니다.
- filename — 파일의 원본 파일명으로, 여기서 확장자를 가져와서 S3 키에 좋은 확장자를 부여할 수 있습니다.

이러한 입력을 바탕으로 AWS S3 클라이언트를 생성하고 서명된 PutObject URL을 생성하세요. Python에서 boto3를 사용하면 다음과 같이 보입니다:

```python
def upload_s3_client() -> S3Client:
    return boto3.client(
        "s3",
        aws_access_key_id=settings.UPLOAD_AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.UPLOAD_AWS_SECRET_ACCESS_KEY,
        region_name=AWS_REGION,
    )

@api_view("/upload/create")
def create_upload(request: Request) -> Response:
    ext = request.validated_data["original_filename"].split(".")[-1].lower()
    # 생성된 S3 경로에 사용자 ID와 날짜 포함하기:
    date = datetime.now().strftime("%Y%m%d")
    key = f"uploads/{request.user.id}/{date}-{uuid.uuid4()}.{ext}"
    # 서명된 URL 생성:
    presigned_upload_url = upload_s3_client().generate_presigned_url(
        "put_object",
        Params={
            "Bucket": "yourproject-upload",
            "Key": key,
            "ContentType": request.validated_data["content_type"],
        },
        ExpiresIn=60 * 60,
    )
    # 클라이언트에게 키 및 서명된 PutObject URL을 반환합니다:
    return success_response(
        {"key": key, "presigned_upload_url": presigned_upload_url}
    )
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

## 클라이언트 측: 모두 연결하기

이제 클라이언트 측에서는 파일 입력란을 추가하여 파일 객체를 가져와야합니다. 한 번 파일 객체를 가져오면 새 API 백엔드에서 미리 서명된 URL을 요청할 수 있습니다. API 요청을 보통 어떻게 만들든지 상관없습니다:

```js
function getPresignedUrl(file: File) {
  return makeAPIRequest(
    "POST",
    "upload/create",
    {
      original_filename: file.name,
      content_type: file.type,
    },
    (response) => response as {
      key: string;
      presigned_upload_url: string;
    },
  );
}
```

그런 다음, XmlHttpRequest를 만들어 파일을 직접 S3로 전송할 수 있습니다:

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
function uploadFile(
  file: File,
  presignedUploadUrl: string,
  onProgress: (pct: number) => void,
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable) {
        const pct = e.loaded / e.total;
        onProgress(pct * 100);
      }
    });
    xhr.upload.addEventListener("error", (e) => {
      reject(new Error("Upload failed: " + e.toString()));
    });
    xhr.upload.addEventListener("abort", (e) => {
      reject(new Error("Upload aborted: " + e.toString()));
    });
    xhr.addEventListener("load", (e) => {
      if (xhr.status === 200) {
        resolve();
      } else {
        reject(new Error("Upload failed " + xhr.status));
      }
    });
    xhr.open("PUT", presignedUploadUrl, true);
    try {
      xhr.send(file);
    } catch (e) {
      reject(new Error("Upload failed: " + e.toString()));
    }
  });
}
```

React Hooks를 사용하는 프로젝트라면 다음과 같이 모두 연결할 수 있습니다:

```js
export function useUpload() {
  const [uploadState, setUploadState] =
    (useState < "idle") | "starting" | "uploading" | "finishing" | "done" | ("error" > "idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = (useState < Error) | (null > null);

  return {
    uploadState,
    uploadProgress,
    uploadError,
    upload: async (file: File, onSuccess: (uploadKey: string) => Promise<void>) => {
      setUploadState("starting");

      try {
        // 백엔드 API에서 사전 서명된 URL 가져오기:
        const { key, presigned_upload_url } = await getPresignedUrl(file);
        setUploadState("uploading");
        // XmlHttpRequest를 사용하여 실제 업로드:
        await uploadFile(file, presigned_upload_url, (pct) => {
          setUploadProgress(pct);
        });
        setUploadState("finishing");
        // 이 업로드된 파일을 유용하게 활용하기; 아마도 이 키를 다른 API 엔드포인트로 전달할 것입니다!
        await onSuccess(key);
        setUploadState("done");
      } catch (e) {
        setUploadState("error");
        setUploadError(e);
      }
    },
  };
}
```

## 마지막으로: 새로 업로드된 파일 사용하기

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

업로드가 완료되면 업로드한 S3 키를 API로 전송하여 다른 곳에 저장하거나 원하는 대로 후속 처리할 수 있습니다.

업로드 전용 S3 버킷 내의 경로인 업로드 키를 받는 또 다른 API 엔드포인트를 추가하세요. 그런 다음 파일을 다운로드하여 유효성을 검사하거나 다른 서비스에서 즉시 사용할 수 있도록 다른 버킷으로 복사할 수 있습니다.

(저는 업로드 키에 인증된 사용자 ID를 넣는 것을 좋아합니다. 이렇게 하면 이 엔드포인트 내에서 현재 사용자로부터 업로드된 것인지 확인할 수 있습니다.)

다음은 Python에서 버킷을 공개 서빙 버킷에 복사하는 예시입니다:

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
upload_key = request.validated_data["upload_key"]
ext = upload_key.split(".")[-1]
slug = slugify(request.validated_data["filename"])
date = datetime.now().strftime(r"%Y%m%d_%H%M%S")
public_key = f"media/{request.user.id}/{date}-{slug}.{ext}"

try:
  public_content_s3_client().copy(
    CopySource={
      "Bucket": "yourproject-upload",
      "Key": upload_key,
    },
    Bucket="yourproject-public",
    Key=public_key,
  )
except Exception:
  logging.exception(f"Failed to copy file for user={request.user.id}")
```

요렇게 해요. 누군가에겐 도움이 되길 바래요! 혹시 다시 필요하시다면 여기 스크립트 내용이 담긴 gist 링크도 드릴게요. 🥰

의견이나 피드백이 있으시면 언제든지 알려주세요! @taylorhughes
