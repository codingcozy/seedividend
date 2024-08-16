---
title: "Amazon S3에서 큰 파일을 메모리에 로드하지 않고 다운로드하는 방법"
description: ""
coverImage: "/allround-coder.github.io/assets/no-image.jpg"
date: 2024-07-12 21:36
ogImage: 
  url: /allround-coder.github.io/assets/no-image.jpg
tag: Tech
originalTitle: "How can we Download Large Files from Amazon S3 without loading them into memory?"
link: "https://medium.com/gitconnected/downloading-large-files-from-amazon-s3-without-loading-them-into-the-memory-41dfbf273dc4"
isUpdated: true
---




안녕하세요 여러분 🫶

이 안내서는 우리가 아마존 S3에서 Java SDK 버전 2를 사용하여 여러 개의 대용량 파일을 다운로드할 때 발생한 문제를 해결하기 위해 수행한 연구에 기반합니다. 대용량 파일을 다운로드하려고 시도했을 때 파일이 메모리에 부하를 일으켜 발생한 문제에 대한 것입니다.

```js
java.lang.OutOfMemoryError: Java heap space
```

# 현재 우리의 구현 방법: 다운로드 및 로컬 저장하기

<div class="content-ad"></div>

## Spring Boot Dependencies

```js
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.0</version>
    <relativePath/> 
</parent>

<properties>
  <java.version>17</java.version>
  <aws.java.sdk.version>2.23.0</aws.java.sdk.version>
  <apache.commons.version>3.12.0</apache.commons.version>
</properties>

<dependencies>
<!-- AWS SDK Java V2  -->
    <dependency>
       <groupId>software.amazon.awssdk</groupId>
       <artifactId>s3</artifactId>
       <version>${aws.java.sdk.version}</version>
    </dependency>

    <dependency>
       <groupId>software.amazon.awssdk</groupId>
       <artifactId>netty-nio-client</artifactId>
       <version>${aws.java.sdk.version}</version>
    </dependency>

    <dependency>
       <groupId>software.amazon.awssdk</groupId>
       <artifactId>apache-client</artifactId>
       <version>${aws.java.sdk.version}</version>
    </dependency>
</dependencies>
```

```js
public InputStream getS3ObjectInputStream(final String key){
        final GetObjectRequest objectRequest = GetObjectRequest.builder()
                .bucket(s3ConfigProperties.getS3BucketName())
                .key(key)
                .build();

        final ResponseBytes<GetObjectResponse> responseBytes  = s3Client.getObjectAsBytes(objectRequest);
        return responseBytes.asInputStream();
 }

public void transferS3ObjectToFile(final File tempFile, final String key) throws IOException {
        final InputStream inputStream = getS3ObjectInputStream(key);
        FileUtils.copyToFile(inputStream, file);
 }
```

## Why is this implementation causing an out-of-memory error?

<div class="content-ad"></div>

이 문제를 이해하려면 s3Client.getObjectAsBytes 메서드의 내부 구현을 살펴봐야합니다.

```java
default ResponseBytes<GetObjectResponse> getObjectAsBytes(GetObjectRequest getObjectRequest) throws NoSuchKeyException,
            InvalidObjectStateException, AwsServiceException, SdkClientException, S3Exception {
        return getObject(getObjectRequest, ResponseTransformer.toBytes());
}
```

이 메서드는 ResponseTransformer.toBytes를 사용하며, 이는 InputStream으로 전달되는 모든 응답 콘텐츠를 메모리로 로드합니다.

이것이 java.lang.OutOfMemoryError: Java heap space라는 문제의 원인이었습니다.

<div class="content-ad"></div>

```java
static <ResponseT> ResponseTransformer<ResponseT, ResponseBytes<ResponseT>> toBytes() {
    return (response, inputStream) -> {
        try {
            InterruptMonitor.checkInterrupted();
            return ResponseBytes.fromByteArrayUnsafe(response, IoUtils.toByteArray(inputStream));
        } catch (IOException e) {
            throw RetryableException.builder().message("Failed to read response.").cause(e).build();
        }
    };
 }
```

# Amazon S3로부터 다운로드한 파일을 메모리로 로드하지 않고 로컬 스토리지에 직접 저장하는 방법은 무엇인가요?

## InputStream용 응답 변환기 사용

Amazon S3에서 제공하는 응답을 ResponseInputStream으로 변환하는 기능을 활용할 수 있습니다. 이 입력 스트림을 사용하여 컨텐츠를 로컬 스토리지에 저장할 수 있습니다.

<div class="content-ad"></div>

```java
public InputStream getS3ObjectInputStream(final String key){
        final GetObjectRequest objectRequest = GetObjectRequest.builder()
                .bucket(s3ConfigProperties.getS3BucketName())
                .key(key)
                .build();

        ResponseInputStream<GetObjectResponse> responseInputStream  = s3Client.getObject(objectRequest, ResponseTransformer.toInputStream());
        return responseInputStream;
}
```

하지만 여기서 문제는 ResponseInputStream이 기본 입력 스트림을 노출하지 않는다는 것입니다.

```java
static <ResponseT> ResponseTransformer<ResponseT, ResponseInputStream<ResponseT>> toInputStream() {
        return unmanaged(ResponseInputStream::new);
}
```

```java
@SdkPublicApi
public final class ResponseInputStream<ResponseT> extends SdkFilterInputStream implements Abortable {

    private final ResponseT response;
    private final Abortable abortable;

    public ResponseInputStream(ResponseT resp, AbortableInputStream in) {
        super(in);
        this.response = Validate.paramNotNull(resp, "response");
        this.abortable = Validate.paramNotNull(in, "abortableInputStream");
    }

    public ResponseInputStream(ResponseT resp, InputStream in) {
        super(in);
        this.response = Validate.paramNotNull(resp, "response");
        this.abortable = in instanceof Abortable ? (Abortable) in : null;
    }

    public ResponseT response() {
        return response;
    }

    @Override
    public void abort() {
        if (abortable != null) {
            abortable.abort();
        }
    }

}
```

<div class="content-ad"></div>

밑줄 친 InputStream을 사용하는 유일한 방법은 반환된 ResponseInputStream 객체에서 InputStream 클래스의 transferTo 메서드를 사용하는 것입니다.

```js
public void transferS3ObjectToFile(final File tempFile, final String key) throws IOException {
        final InputStream inputStream = getS3ObjectInputStream(key);
        inputStream.transferTo(new FileOutputStream(tempFile));
        inputStream.close();
}
```

## 파일용 Response Transformer 사용하기

Amazon S3에서 제공하는 기능을 활용하여 응답 콘텐츠를 내부적으로 지정된 파일로 모두 작성할 수 있습니다. 따라서 여기서 밑줄 친 InputStream이 파일 경로로 지정된 파일로 직접 복사됩니다.

<div class="content-ad"></div>

```js
public void transferS3ObjectToFile(final File tempFile, final String key) throws IOException {
        final GetObjectRequest objectRequest = GetObjectRequest.builder()
                .bucket(s3ConfigProperties.getS3BucketName())
                .key(key)
                .build();

        s3Client.getObject(objectRequest, ResponseTransformer.toFile(tempFile));
}
```

```js
static <ResponseT> ResponseTransformer<ResponseT, ResponseT> toFile(Path path) {
        return (resp, in) -> {
            try {
                InterruptMonitor.checkInterrupted();
                Files.copy(in, path);
                return resp;
            } catch (IOException copyException) {
                String copyError = "Failed to read response into file: " + path;

                // If the write failed because of the state of the file, don't retry the request.
                if (copyException instanceof FileAlreadyExistsException || copyException instanceof DirectoryNotEmptyException) {
                    throw new IOException(copyError, copyException);
                }

                // Try to clean up the file so that we can retry the request. If we can't delete it, don't retry the request.
                try {
                    Files.deleteIfExists(path);
                } catch (IOException deletionException) {
                    Logger.loggerFor(ResponseTransformer.class)
                          .error(() -> "Failed to delete destination file '" + path +
                                       "' after reading the service response " +
                                       "failed.", deletionException);

                    throw new IOException(copyError + ". Additionally, the file could not be cleaned up (" +
                                          deletionException.getMessage() + "), so the request will not be retried.",
                                          copyException);
                }

                // Retry the request
                throw RetryableException.builder().message(copyError).cause(copyException).build();
            }
        };
}
```

## OutputStream에 대한 Response Transformer 사용

지정된 출력 스트림에 응답을 작성하는 데에 설계된 ResponseTransformer를 사용하여 지정된 경로에 파일을 작성할 수 있습니다. 이 방법을 통해 기존 파일의 내용을 교체할 수 있습니다.

<div class="content-ad"></div>

```js
public void transferS3ObjectToFile(final File tempFile, final String key) throws IOException {
        final GetObjectRequest objectRequest = GetObjectRequest.builder()
                .bucket(s3ConfigProperties.getS3BucketName())
                .key(key)
                .build();

        try(final var outputStream = new FileOutputStream(tempFile)){
            s3Client.getObject(objectRequest, ResponseTransformer.toOutputStream(outputStream));
        } catch (Exception exception){
            throw new RuntimeException(exception);
        }
}
```

```js
static <ResponseT> ResponseTransformer<ResponseT, ResponseT> toOutputStream(OutputStream outputStream) {
        return (resp, in) -> {
            InterruptMonitor.checkInterrupted();
            IoUtils.copy(in, outputStream);
            return resp;
        };
 }
```

# 결론

이 접근법은 아직 최적의 접근법이 아닌 블로킹 API를 사용합니다. 다음 글에서는 파일을 메모리로 로드하지 않고 향상된 처리량과 신뢰성으로 대용량 파일을 다운로드하고 업로드하는 비블로킹 API를 사용하는 방법에 대해 이야기하겠습니다.

<div class="content-ad"></div>

# 읽어 주셔서 감사합니다

- 피드백을 공유해주세요.
- 더 많은 유익한 콘텐츠를 기대해주세요.