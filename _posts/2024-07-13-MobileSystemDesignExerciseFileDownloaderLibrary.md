---
title: "모바일 시스템 설계 연습 파일 다운로더 라이브러리 구현하기"
description: ""
coverImage: "/allround-coder.github.io/assets/no-image.jpg"
date: 2024-07-13 20:46
ogImage: 
  url: /allround-coder.github.io/assets/no-image.jpg
tag: Tech
originalTitle: "Mobile System Design Exercise: File Downloader Library"
link: "https://medium.com/gitconnected/mobile-system-design-exercise-file-downloader-library-a0e9574218ca"
---


사용 사례와 비즈니스 요구 사항을 이해하는 것은 애플리케이션이나 시스템의 특정 요구 사항을 충족하는 파일 다운로더 라이브러리를 디자인하는 데 중요합니다. 다음은 사용 사례를 명확히 하고 비즈니스 요구 사항을 수집하는 데 도움이 되는 몇 가지 질문입니다:

- 파일 다운로더 라이브러리의 주요 목적은 무엇인가요?
- 어떤 종류의 파일이 라이브러리를 사용하여 다운로드될 것인가요? (예: 이미지, 동영상, 문서)
- 모바일 애플리케이션에 라이브러리를 어떻게 통합할 것인가요? 특정 플랫폼(Android, iOS, 둘 다)을 대상으로 하는 건가요?
- 라이브러리는 원격 서버에서 파일을 다운로드하거나 모바일 장치 내의 로컬 저장소에서 파일을 다운로드할 수 있나요?
- 예상 다운로드 양과 파일 크기는 어떻게 되나요? 대용량 파일이나 많은 양의 다운로드에 대한 성능 최적화가 필요한가요?
- 라이브러리는 일시 중지하고 나중에 다시 시작할 수 있는 다중 다운로드를 지원해야 하나요?
- 동시 또는 병렬 다운로드를 허용하여 여러 파일을 동시에 다운로드할 수 있나요?
- 다운로드된 파일의 암호화나 제한된 리소스에 액세스하기 위한 인증과 같은 특정 보안 요구 사항이 있나요?
- 라이브러리는 다운로드된 파일을 관리하기 위한 기능을 제공해야 하나요? (예: 폴더에 정리, 파일 삭제, 파일 이름 바꾸기)
- 파일 다운로드 프로세스에 대해 특정 성능 또는 대기 시간 요구 사항이 있나요?
- 파일 다운로드와 관련된 보고서 또는 분석 기능을 제공해야 하나요?
- 목표 플랫폼 및 모바일 애플리케이션의 예상 버전은 무엇인가요?
- 데이터 개인 정보 보호 또는 GDPR와 같은 규정상 또는 규정 준수 요구 사항이 고려되어야 하는가요?
- 라이브러리를 사용하여 다운로드할 일반 파일 유형 및 확장자는 무엇인가요? (예: PNG, PDF, MP4, DOCX)
- 특정 파일 유형이나 확장자를 다운로드하는 동안 특별한 처리나 처리가 필요한가요?
- 이미지 압축, 비디오 전송 또는 문서 구문 분석과 같은 특정 파일 유형을 처리할 내장 지원이 있어야 하나요?
- 라이브러리를 사용하여 다운로드할 수 있는 파일 유형이나 확장자에 제한이나 제한이 있나요?
- 라이브러리가 서로 다른 인코딩 형식이나 압축 파일과 같은 다양한 파일 버전 또는 변형을 처리할 수 있는 기능을 제공해야 하나요?

인터뷰에서 시스템 디자인을 논의할 때 요구 사항을 우선순위로 정하고 본인의 장점과 전문성을 강조하는 부분에 집중하는 것이 중요합니다. 45분에서 60분의 제한된 시간 내에 모든 요구 사항을 철저히 다루는 것은 불가능하지만, 인터뷰어가 어떤 측면을 먼저 탐구하길 원하는지 물어봄으로써 대화를 이끌어낼 수 있습니다. 이를 통해 자신이 가장 자신 있다고 느끼고 관련 경험이 있는 주제로 대화를 전환할 수 있습니다. 성공적인 인터뷰는 인터뷰어의 질문에 직접 답하는 것뿐만 아니라 강점을 강조하고 전문적인 분야에 대한 지식을 전달하는 데 관련된 것입니다.

# 기능 요구 사항:

<div class="content-ad"></div>

1. FR1: 라이브러리는 지정된 URL에서 파일 다운로드를 시작하는 기능을 제공해야 합니다.
2. FR2: 라이브러리는 동시 또는 병렬 다운로드를 지원해 여러 파일을 동시에 다운로드할 수 있어야 합니다.
3. FR3: 라이브러리는 일시 중지 및 재개 다운로드 메커니즘을 제공하여 사용자가 다운로드 프로세스를 제어할 수 있어야 합니다.
4. FR4: 라이브러리는 일시적으로 중지된 다운로드를 중단된 지점부터 재개할 수 있는 다운로드를 지원해야 합니다.
5. FR5: 라이브러리는 이미지, 비디오, 문서 등 다양한 유형의 파일을 처리하고 성공적으로 다운로드해야 합니다.
6. FR6: 라이브러리는 진행 알림을 제공하여 개발자가 진행 중인 다운로드를 추적할 수 있어야 합니다.
7. FR7: 라이브러리는 다운로드를 취소하여 다운로드 프로세스를 종료하고 일부 다운로드된 파일을 정리할 수 있는 기능을 지원해야 합니다.
8. FR8: 라이브러리는 개발자가 특정 요구 사항에 따라 기능을 사용자 정의하고 확장할 수 있는 API 또는 인터페이스를 제공해야 합니다.
9. FR9: 라이브러리는 Wi-Fi, 모바일 데이터, 오프라인 상황과 같은 다양한 네트워크 연결 시나리오를 처리해야 합니다.
10. FR10: 라이브러리는 체크섬 검증과 같은 파일 무결성 검증을 처리하여 다운로드된 파일이 손상되지 않도록 해야 합니다.

# 비기능 요구사항:

1. NFR1: 성능: 라이브러리는 효율적이고 빠른 파일 다운로드를 위해 최적화되어야 하며 다운로드 시간과 리소스 사용을 최소화해야 합니다.
2. NFR2: 신뢰성: 라이브러리는 강력하고 다양한 오류 시나리오를 처리할 수 있어 신뢰할 수 있고 일관된 파일 다운로드를 보장해야 합니다.
3. NFR3: 보안: 라이브러리는 안전한 연결(e.g., HTTPS)을 지원하고 파일 다운로드를 위해 암호화 또는 인증과 같은 보안 관련 고려 사항을 처리해야 합니다.
4. NFR4: 확장성: 라이브러리는 성능에 중대한 저하 없이 고용량의 파일 다운로드를 동시에 처리할 수 있어야 합니다.
5. NFR5: 호환성: 라이브러리는 다양한 모바일 플랫폼(Android, iOS 등)과 다양한 장치 모델 및 버전에서 원활하게 작동하도록 호환되어야 합니다.
6. NFR6: 사용성: 라이브러리는 쉬운 인터페이스를 갖추고 개발자가 기능을 통합하고 활용할 수 있도록 명확한 문서와 예제를 제공해야 합니다.
7. NFR7: 자원 효율성: 라이브러리는 배터리 소비, 네트워크 대역폭 사용 및 저장 공간 이용을 최소화하기 위해 최적화되어야 합니다.
8. NFR8: 오류 처리 및 로깅: 라이브러리는 쉬운 디버깅과 문제 해결을 위해 포괄적인 오류 처리 메커니즘 및 로깅 기능을 제공해야 합니다.
9. NFR9: 규정 준수: 라이브러리는 GDPR 또는 지역 데이터 보호 법률과 같은 관련 데이터 프라이버시 및 규정 요구사항을 준수해야 합니다.
10. NFR10: 문서화 및 지원: 라이브러리는 상세한 문서와 문제 또는 문의 사항 발생 시 개발자를 지원하기 위한 지원 채널을 제공해야 합니다.

이러한 요구 사항은 원하는 기능, 성능 및 품질 기준을 충족하는 파일 다운로더 라이브러리를 설계하고 구현하는 기반을 제공합니다. 특정 요구 사항은 사용 사례 및 비즈니스 요구에 따라 다를 수 있음에 유의하십시오.

<div class="content-ad"></div>

# 고수준 구조:

파일 다운로더 라이브러리는 모듈식 및 계층 구조를 사용하여 유연성, 확장성 및 재사용성을 보장할 수 있습니다. 아래 구성 요소가 아키텍처에 포함될 수 있습니다:

1. 응용 프로그램 계층:
— API 또는 인터페이스를 사용하여 사용자 인터페이스를 제공하고 모바일 애플리케이션과 상호 작용합니다.
— 파일 다운로드에 대한 사용자 요청 처리하고 피드백 및 진행 알림 제공.

2. 다운로드 매니저:
— 파일 다운로드 작업을 관리하는 중심 구성 요소 역할을 합니다.
— 다운로드 작업의 큐잉, 스케줄링 및 우선 순위 설정을 담당합니다.
— 연결 설정 및 파일 데이터 수신을 위해 네트워크 계층과 협력합니다.
— 다운로드 작업을 일시 중지, 다시 시작, 취소 및 재시도하는 기능을 지원합니다.

<div class="content-ad"></div>

3. 네트워크 레이어:
- 파일 다운로드를 위한 네트워크 연결을 담당합니다.
- Wi-Fi, 모바일 데이터, 오프라인 시나리오와 같은 다양한 유형의 네트워크 연결을 관리합니다.
- 안전한 연결을 수립하는 메커니즘을 구현하며 필요한 경우 인증을 처리합니다.
- 중단, 네트워크 오류 및 타임아웃을 처리하기 위한 지원을 제공합니다.
- 백그라운드 다운로드를 지원하고 네트워크 자원을 효율적으로 활용합니다.

4. 파일 관리:
- 다운로드된 파일의 저장 및 관리를 처리합니다.
- 내부 저장소 또는 외부 SD 카드와 같은 저장 위치를 지정하는 옵션을 제공합니다.
- 다운로드된 파일을 임시 또는 영구적으로 저장하기 위한 캐싱 메커니즘을 구현합니다.
- 파일을 정리, 삭제 및 이름 변경하는 기능을 포함합니다.
- 디스크 공간을 관리하고 오래된 또는 사용되지 않는 파일에 대한 정리 메커니즘을 구현합니다.

5. 오류 처리 및 로깅:
- 파일 다운로드 프로세스 중 다양한 유형의 오류에 대한 포괄적인 오류 처리 메커니즘을 제공합니다.
- 디버깅 및 문제 해결을 위해 관련 정보를 캡처하는 로깅 기능을 구현합니다.
- 응용 프로그램 레이어로 오류 보고를 지원하여 개발자가 오류를 우아하게 처리할 수 있도록 합니다.

6. 사용자 정의 및 확장성:
- 라이브러리를 모듈식이고 확장 가능하도록 설계하여 개발자가 기능을 사용자 정의하고 확장할 수 있도록 합니다.
- 추가 기능 통합 또는 사용자 정의 동작 구현을 위한 후크 또는 확장 지점을 제공합니다.
- 이미지 압축, 비디오 변환이 필요한 특정 파일 처리 요구 사항을 위해 다른 라이브러리 또는 프레임워크와의 통합을 지원합니다.

<div class="content-ad"></div>

7. 문서 및 지원:
- 사용 예제, API 참조 및 코드 조각을 포함한 상세 문서 작성
- 문제 또는 질문 발생 시 개발자를 지원하기 위한 포럼이나 티켓 시스템과 같은 지원 채널 제공
- 파일 다운로드 라이브러리의 통합 및 사용 예시를 보여주는 샘플 프로젝트나 데모 제공

이것은 고수준의 아키텍처 설계임을 감안해야 하며, 파일 다운로더 라이브러리의 기능과 특징을 완전히 실현하기 위해서는 더 상세한 설계와 구현이 필요합니다.

# 파일 API 구조

요구 사항에 따라 get API로 변경될 수 있습니다. 예를 들어, 인증 토큰이나 헤더를 보내야 하는 경우와 같이입니다. 기본 상황을 고려할 때, 아래는 응답 JSON이 어떻게 보일지의 구조입니다. 요구 사항에 맞게 업데이트할 수 있습니다.

<div class="content-ad"></div>

```json
{
  "files": [
    {
      "id": "1",
      "name": "example_file1.jpg",
      "url": "https://example.com/files/example_file1.jpg"
    },
    {
      "id": "2",
      "name": "example_file2.pdf",
      "url": "https://example.com/files/example_file2.pdf"
    },
    {
      "id": "3",
      "name": "example_file3.mp4",
      "url": "https://example.com/files/example_file3.mp4"
    }
  ]
}
```

# 다운로드 관리자 깊게 들여다보기:

서로 다른 확장자를 가진 파일 목록을 가져오고 다운로드하기 위해 다음 단계를 통합할 수 있습니다:

## 1. API 연동:

<div class="content-ad"></div>

— ViewModel에는 서버에서 파일 목록을 검색하기 위한 API 요청을 수행하는 메서드가 있습니다.
— 이 작업은 HTTP 클라이언트 라이브러리(예: Retrofit)를 사용하여 수행할 수 있습니다.
— 파일 목록을 포함한 서버로부터의 응답은 Download Manager에 의해 구문 분석되고 처리될 수 있습니다.

## 2. 다운로드 작업 생성:

이 모든 과정이 Exo Player에서 어떻게 수행되는지 이해하기 위해 아래 기사를 읽어보세요.

이제 한 가지씩 순서대로 이야기해 봅시다.

<div class="content-ad"></div>

Step 1: 하나의 파일을 URL에서 다운로드하는 방법

이 문서는 다운로드 매니저를 사용하여 URL에서 파일을 다운로드하는 방법에 대해 설명합니다.

Step 2: 이제 다운로드 매니저를 사용하여 여러 파일을 순차적으로 다운로드하는 방법을 배워봅시다.

```js
import android.app.DownloadManager;
import android.content.Context;
import android.net.Uri;
import android.os.Environment;

public class FileDownloader {
    private Context context;
    private DownloadManager downloadManager;
    
    public FileDownloader(Context context) {
        this.context = context;
        downloadManager = (DownloadManager) context.getSystemService(Context.DOWNLOAD_SERVICE);
    }
    
    public void startDownloads(String[] fileUrls) {
        for (String fileUrl : fileUrls) {
            startDownload(fileUrl);
        }
    }
    
    private void startDownload(String fileUrl) {
        DownloadManager.Request request = new DownloadManager.Request(Uri.parse(fileUrl));
        // 목적지 디렉토리 및 파일 이름 설정
        request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, getFileName(fileUrl));
        
        // 다운로드를 큐에 추가
        downloadManager.enqueue(request);
    }
    
    private String getFileName(String fileUrl) {
        // URL에서 파일 이름 추출
        return fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
    }
}
```

<div class="content-ad"></div>

이 예제에서 startDownloads() 메서드는 파일 URL 배열을 입력으로 받습니다. 그럼 각 URL을 반복하고 startDownload() 메서드를 호출하여 각 파일에 대한 다운로드 요청을 대기열에 추가합니다.

startDownload() 메서드는 각 파일 URL에 대한 DownloadManager.Request 객체를 생성하고 setDestinationInExternalPublicDir()를 사용하여 대상 디렉토리를 설정합니다. 필요에 따라 대상 디렉토리를 수정할 수 있습니다.

마지막으로 DownloadManager의 enqueue() 메서드를 사용하여 다운로드 요청을 대기열에 추가합니다.

파일 URL 배열을 사용하여 startDownloads()를 호출하면 다운로드가 지정된 순서대로 하나씩 시작됩니다.

<div class="content-ad"></div>

**단계 3: 어떻게 애플리케이션이 종료되더라도 다운로드 프로세스를 유지할 수 있을까요?**

애플리케이션이 종료되어도 백그라운드에서 파일을 계속 다운로드하려면 Android의 포그라운드 서비스와 DownloadManager를 함께 사용할 수 있습니다. 포그라운드 서비스는 사용자에 의해 인식되는 계속 진행 중인 작업을 수행하는 서비스 유형으로, 앱이 종료되더라도 작업이 계속 실행되도록 높은 우선순위를 부여합니다.

이전 코드를 포그라운드 서비스를 사용하도록 수정하는 예제를 보겠습니다:

- DownloadService라는 새 클래스를 만들어야 합니다. 이 클래스는 Service를 확장해야 합니다:

```js
public class DownloadService extends Service {
    private static final String CHANNEL_ID = "DownloadChannel";
    private static final int NOTIFICATION_ID = 1;

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        List<String> downloadUrls = intent.getStringArrayListExtra("downloadUrls");
        startMultipleDownloads(downloadUrls);

        // 포그라운드 서비스용 알림 채널 생성
        createNotificationChannel();

        // 서비스 실행 중에 표시할 알림 작성
        Notification notification = buildForegroundNotification();

        // 서비스를 포그라운드에서 시작
        startForeground(NOTIFICATION_ID, notification);

        // 서비스가 종료되면 다시 시작되어야 하는 경우 START_STICKY를 반환합니다.
        return START_STICKY;
    }

    private void startMultipleDownloads(List<String> downloadUrls) {
        DownloadManager downloadManager = (DownloadManager) getSystemService(Context.DOWNLOAD_SERVICE);

        for (String url : downloadUrls) {
            DownloadManager.Request request = new DownloadManager.Request(Uri.parse(url));
            String fileName = "file_" + System.currentTimeMillis();
            request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, fileName);
            request.setTitle("파일 다운로드 중");
            downloadManager.enqueue(request);
        }
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                    CHANNEL_ID,
                    "다운로드 채널",
                    NotificationManager.IMPORTANCE_LOW
            );
            NotificationManager manager = getSystemService(NotificationManager.class);
            manager.createNotificationChannel(channel);
        }
    }

    private Notification buildForegroundNotification() {
        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle("파일 다운로드 중")
                .setContentText("파일이 백그라운드에서 다운로드 중입니다.")
                .setSmallIcon(R.drawable.ic_notification);

        return builder.build();
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
```

<div class="content-ad"></div>

스텝 4: 파일이 다운로드되면 다운로드 ID, 파일 이름, 파일 경로, 생성 타임스탬프 등을 저장할 데이터베이스 테이블을 생성할 것입니다. 나중에 이를 검색할 수 있습니다.

스텝 5: 다운로드를 재개, 일시 중지 또는 삭제하는 방법에 대해 알아보겠습니다.

다운로드 일시 중지:

```js
private void pauseDownload(long downloadId) {
    DownloadManager downloadManager = (DownloadManager) getSystemService(Context.DOWNLOAD_SERVICE);
    downloadManager.pauseDownload(downloadId);
}
```

<div class="content-ad"></div>

다운로드 재개:

```java
private void resumeDownload(long downloadId) {
    DownloadManager downloadManager = (DownloadManager) getSystemService(Context.DOWNLOAD_SERVICE);
    downloadManager.resumeDownload(downloadId);
}
```

일시 정지 및 재개 상태에서는 파일이 아직 다운로드되지 않았으므로 데이터베이스에서 downloadId를 사용할 수 없습니다. 여기서 다운로드 ID를 얻는 한 가지 방법은 노티피케이션에 downloadId를 pending intent에 추가하고 사용자가 재개 또는 일시 정지 버튼을 클릭했을 때 적절한 조치를 취하는 것입니다.

다운로드 삭제:

<div class="content-ad"></div>

```java
private void deleteDownload(long downloadId) {
    DownloadManager downloadManager = (DownloadManager) getSystemService(Context.DOWNLOAD_SERVICE);
    downloadManager.remove(downloadId);
}
```

downloadId은 DownloadManager를 사용하여 다운로드 요청을 큐잉할 때 얻을 수 있는 값입니다.

```java
private long enqueueDownload(String downloadUrl) {
    DownloadManager downloadManager = (DownloadManager) getSystemService(Context.DOWNLOAD_SERVICE);
    
    DownloadManager.Request request = new DownloadManager.Request(Uri.parse(downloadUrl));
    // 다운로드 요청에 대한 목적지, 제목 등 설정
    
    long downloadId = downloadManager.enqueue(request);
    // 나중에 사용할 downloadId 저장
    
    return downloadId;
}
```

단계 6: 여러 파일을 동시에 다운로드하여 빠르게 다운로드하는 방법은 무엇입니까?

<div class="content-ad"></div>

이를 수행하는 여러 가지 방법이 있습니다. ThreadPoolExecutor를 사용하여 동시에 실행되는 스레드 수를 제한할 수 있습니다. 이를 어떻게 달성할 수 있는지 알아보려면 아래 기사를 확인해보세요.

그리고 다른 방법으로는 최대 동시 요청 수(queue의 maxConcurrentRequest 수)로 Download Manager를 사용하고 현재 진행 중인 요청 수가 그것보다 크거나 작은지 확인하는 방법입니다.

```js
Queue<String> downloadQueue = new LinkedList<>();
int maxParallelDownloads = 4;
int ongoingDownloadsCount = 0;
```

```js
List<String> fileUrls = new ArrayList<>();
// 100개의 파일 URL을 fileUrls 목록에 추가합니다

downloadQueue.addAll(fileUrls);
```

<div class="content-ad"></div>

```js
private void startDownloads() {
    while (ongoingDownloadsCount < maxParallelDownloads && !downloadQueue.isEmpty()) {
        String url = downloadQueue.poll();
        startDownload(url);
    }
}
```

```js
private void startDownload(String downloadUrl) {
    DownloadManager downloadManager = (DownloadManager) getSystemService(Context.DOWNLOAD_SERVICE);

    DownloadManager.Request request = new DownloadManager.Request(Uri.parse(downloadUrl));
    String fileName = "file_" + System.currentTimeMillis();
    request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, fileName);
    request.setTitle("Downloading File");

    long downloadId = downloadManager.enqueue(request);

    // Increment the ongoing downloads count
    ongoingDownloadsCount++;

    // Store the downloadId along with the file information
    // in a database or some other storage mechanism
    // ...

    // Check if there are more URLs in the download queue
    if (!downloadQueue.isEmpty()) {
        // Start the next download
        startDownloads();
    }
}

This is just a rough outline. There may be better ways to handle this.

Step 7: How to resume an interrupted download request
```

<div class="content-ad"></div>

일시적으로 종료된 다운로드를 저장 공간 문제, 네트워크 오류 또는 장치 종료와 같은 외부 조건 때문에 재개하려면 DownloadManager Android의 기능을 활용할 수 있습니다. DownloadManager는 조건이 해결되면 종료된 다운로드를 자동으로 처리합니다. 다음은 작동 방식입니다:

- DownloadManager를 사용하여 다운로드 요청을 대기열에 넣을 때 해당 요청에 고유한 다운로드 ID가 할당됩니다.
- 저장 공간 부재, 네트워크 오류 또는 장치 종료와 같은 외부 조건으로 인해 다운로드가 중단되면 DownloadManager가 자동으로 다운로드를 일시 중지하고 진행 상황을 저장합니다.
- 다운로드를 재개하려면 동일한 다운로드 ID로 다시 다운로드 요청을 대기열에 넣으면 됩니다.
- DownloadManager는 동일한 다운로드 ID를 가진 요청이 대기열에 들어올 때 기존 다운로드를 확인합니다. 동일한 다운로드 ID로 부분적으로 완료된 다운로드를 찾으면 다운로드를 자동으로 이전 상태에서 재개합니다.

다음은 DownloadManager를 사용하여 다운로드를 재개하는 예시입니다:

```java
DownloadManager downloadManager = (DownloadManager) getSystemService(Context.DOWNLOAD_SERVICE);

long downloadId = // 중단된 다운로드의 downloadId

DownloadManager.Query query = new DownloadManager.Query();
query.setFilterById(downloadId);

Cursor cursor = downloadManager.query(query);
if (cursor != null && cursor.moveToFirst()) {
    int columnIndex = cursor.getColumnIndex(DownloadManager.COLUMN_STATUS);
    int status = cursor.getInt(columnIndex);

    if (status == DownloadManager.STATUS_PAUSED || status == DownloadManager.STATUS_FAILED) {
        // 다운로드가 일시 중지되었거나 실패했을 경우, 재개합니다
        downloadManager.resumeDownload(downloadId);
    }

    cursor.close();
}
```

<div class="content-ad"></div>

# 저장 옵션

안드로이드에서는 다양한 목적을 위한 여러 저장 옵션이 제공됩니다. 여기 주요 저장 옵션과 사용 사례를 살펴보겠습니다:

1. 내부 저장소:
- 내부 저장소를 사용하면 앱에 특정하고 다른 앱이나 사용자가 접근할 수 없는 개인 데이터를 저장할 수 있습니다.
- 앱별 파일, 데이터베이스 및 환경 설정을 저장하는 데 자주 사용됩니다.
- 내부 저장소에 저장된 데이터는 앱이 제거될 때 삭제됩니다.

2. 외부 저장소:
- 외부 저장소를 사용하면 다른 앱이나 사용자가 접근할 수 있는 파일을 저장할 수 있습니다.
- 미디어 파일, 문서 또는 사용자가 앱 외부에서 액세스하거나 관리할 수 있는 모든 데이터에 적합합니다.
- 외부 저장소에 읽기 및 쓰기 권한이 필요합니다.
- 외부 저장소에 저장된 데이터는 앱이 제거되어도 유지됩니다.

<div class="content-ad"></div>

3. 캐시 저장소:
- 필요할 때 다시 만들거나 필요할 때 다시 가져올 수 있는 데이터를 일시적으로 저장해야 할 때 캐시 저장소를 사용하세요.
- 주로 네트워크 응답, 임시 파일 또는 기타 일시적 데이터를 캐싱하는 데 사용됩니다.
- 저장 공간이 부족할 때 시스템에서 캐시 저장소를 지울 수 있으므로 장기 저장에 의존해서는 안 됩니다.

4. 공유 환경 설정:
- 키-값 쌍으로 작은 양의 데이터를 저장하려면 공유 환경 설정을 사용하세요.
- 앱 설정, 사용자 환경 설정 또는 간단한 구성 데이터를 저장하는 데 적합합니다.
- 공유 환경 설정에 저장된 데이터는 앱을 닫거나 삭제해도 유지됩니다.

5. 데이터베이스:
- 대량의 데이터를 위한 구조화된 영구 저장 솔루션이 필요할 때 SQLite와 같은 데이터베이스를 사용하세요.
- 복잡한 데이터 구조, 관계형 데이터 또는 효율적인 쿼리 및 인덱싱이 필요한 데이터를 저장하기에 적합합니다.
- 파일 기반 저장소와 비교했을 때 더 나은 성능과 유연성을 제공합니다.

6. 네트워크 저장소:
- 원격 서버나 클라우드 기반 저장 서비스에 데이터를 저장해야 할 때 네트워크 저장소를 사용하세요.
- 사용자가 생성한 콘텐츠, 백업 또는 여러 장치 간에 동기화해야 하는 데이터를 저장하는 데 적합합니다.
- 네트워크 연결 및 적절한 인증 및 권한 부여 메커니즘이 필요합니다.

<div class="content-ad"></div>

저장 옵션을 선택할 때는 데이터 개인 정보 보호, 접근 제어, 지속성, 크기, 성능, 그리고 사용자 경험과 같은 요소를 고려해야 합니다. 귀하의 특정 요구 사항을 평가하고 귀하의 애플리케이션의 필요에 최적으로 부합하는 저장 옵션을 선택하세요.

파일을 다운로드할 때 어떤 저장소를 사용해야 하는지는 완전히 사용 사례에 따라 다릅니다. 예를 들어 Spotify 앱에서 오프라인 지원을 위해 노래를 다운로드하는 경우, Cache 저장소를 사용합니다. 왜냐하면 그들은 파일을 앱 저장소에만 저장하고 싶어하기 때문입니다. 이렇게 하면 앱 외부에서 노래에 접근하는 것을 원하지 않으며, 사용자에게 제공할 저장 공간을 얼마나 제공할지를 완전히 제어할 수 있습니다. 또한 사용자가 오랜 기간 동안 재생하지 않은 노래를 저장소에서 삭제합니다. 또는 사용자가 계정을 로그아웃하거나 앱을 삭제할 때 캐시를 삭제합니다. WhatsApp과 같은 다른 경우에는 사용자가 서버에서 어떤 미디어 파일을 다운로드하면 외부 저장소에 보관합니다.

# 큰 크기 파일 다운로드:

큰 크기 파일 다운로드를 관리하려면 다운로드 관리자가 여러 가지 전략을 구현할 수 있습니다:
- 청크 다운로드: 파일을 작은 청크로 분할하고 순차적이나 병렬로 다운로드합니다.
- 순진한 다운로드: 파일이 아직 다운로드 중일 때 재생이나 액세스 시작
- 대역폭 제한: 다운로드 속도를 제한하여 네트워크 혼잡을 방지하거나 다운로드 프로세스를 늦춥니다.
- 백그라운드 다운로드: 파일이 다운로드되는 동안 사용자가 앱을 계속 사용할 수 있도록 백그라운드 다운로드를 지원합니다.

<div class="content-ad"></div>

이러한 전략들은 다운로드 프로세스를 최적화하여 대용량 파일을 관리하는 데 도움이 되며, 원활한 사용자 경험을 제공하고 네트워크 타임아웃이나 과도한 자원 사용과 같은 잠재적인 문제를 방지합니다.

# 자원 효율성

배경에서 파일을 다운로드하는 동안 배터리 소비를 최소화하기 위해 이러한 최고의 실천 방법을 따를 수 있습니다:

1. 가능한 경우 Wi-Fi 사용: Wi-Fi를 통해 파일을 다운로드하는 것은 셀룰러 데이터를 사용하는 것보다 전력을 덜 소비합니다. 사용자들이 대용량 파일 다운로드를 시작하기 전에 Wi-Fi 네트워크에 연결하도록 장려하세요.

<div class="content-ad"></div>

2. 네트워크 사용 최적화: 청크 다운로드 활성화 또는 HTTP 범위 요청 활용과 같은 기술을 구현하여 네트워크 사용을 최적화하세요. 이를 통해 다운로드를 작은 증분으로 수행하여 배터리 소비에 전반적인 영향을 줄일 수 있습니다.

3. 유휴 또는 충전 기간에 다운로드 일정화: 가능한 경우 기기가 유휴 상태이거나 전원 공급원에 연결된 상태에서 파일 다운로드를 일정화하세요. 이렇게하면 배터리 수명에 미치는 영향을 최소화하고 다운로드가 효율적으로 완료되도록 할 수 있습니다.

4. 백그라운드 다운로드 제한 구현: Android의 백그라운드 실행 제한 및 제한을 활용하여 앱이 백그라운드에서 실행될 때 다운로드 프로세스가 과도한 리소스를 소비하지 않도록 보장하세요. 이는 특정 사용 사례 및 Android 버전에 따라 포그라운드 서비스, 작업 예약 또는 기타 백그라운드 실행 기술을 사용하는 것을 포함할 수 있습니다.

5. 파일 크기 및 압축 최적화: 가능한 경우 파일을 압축하여 전체 다운로드 크기를 줄입니다. gzip와 같은 파일 압축 알고리즘을 사용하거나 이미지 및 비디오 압축 기술을 적절히 활용하여 다운로드 중에 전송되는 데이터양을 최소화하세요.

<div class="content-ad"></div>

6. 네트워크 연결 상태 모니터링: 네트워크 연결 상태를 지속적으로 모니터링하고 다운로드 동작을 그에 맞게 조정합니다. 예를 들어, 네트워크 연결이 불안정하거나 끊어지면 배터리 소모를 줄이기 위해 다운로드를 일시 중지하거나 재스케줄합니다.

7. 사용자 제어 기능 제공: 사용자가 다운로드 동작을 제어할 수 있도록 하고 일시 중지, 재개, 취소 등의 옵션을 제공합니다. 이를 통해 사용자는 자신의 배터리 소모를 관리하고 선호에 따라 다운로드 우선순위를 결정할 수 있습니다.

8. 오류 처리와 재시도 효율적으로 처리: 적절한 오류 처리와 재시도 메커니즘을 구현하여 네트워크 오류나 중단을 효율적으로 처리합니다. 배터리를 불필요하게 소모하는 과도한 재시도나 연속적인 네트워크 요청을 피합니다.

9. 전원 관리 설정 최적화: 기기의 전원 관리 설정을 준수하고 시스템 수준의 배터리 최적화 정책을 준수합니다. 이를 통해 앱이 사용자의 전원 절약 기능 및 백그라운드 제한에 대한 선호를 따르도록 보장합니다.

<div class="content-ad"></div>

이러한 최상의 사례들을 적용함으로써, 배경에서 파일 다운로드 중 배터리 소모에 미치는 영향을 최소화할 수 있고, 기능성과 에너지 효율성을 균형있게 유지하여 더 나은 사용자 경험을 제공할 수 있습니다.

시스템 설계에 관한 제 첫 번째 기사였습니다. 이 기사가 어떠셨는지 댓글 섹션에 알려주세요. 그리고 이를 위한 할 일과 하지 말아야 할 일은 무엇인가요? 이 기사를 조금 더 간결하게 만드는 것이나 여러분이 다룰 내용을 다른 것으로 원하시면 말씀해주세요.

# 참고자료

# 결론

<div class="content-ad"></div>

시스템 디자인 면접을 준비할 때 이런 점을 염두에 두세요:

- 완벽하려고 하지 말고 "신호"를 제공하세요.
- 인터뷰어의 말을 듣고 시간을 추적하세요.
- 구현 세부 사항에 너무 깊이 파지 않고 최대한 많은 내용을 다루려고 노력하세요.
- 중요한 사항에 대해 이야기하고 시간을 낭비하지 마세요.
- 선택한 아키텍처 패턴, 이 저장 옵션을 사용하는 이유, 또는 Work manager 또는 작업 스케줄러를 사용하는 이유와 같은 선택 사항에 대해 항상 논쟁 준비를 하세요.
- 사용자 규모를 기반으로 생각하세요. 사용자 규모가 증가함에 따라 시스템은 장애 허용성이 있어야 하며 모든 앞으로 오는 요청을 처리해야 합니다.

이 글이 도움이 되었으면 좋겠습니다.

피드백이나 질문이 있으시면 karishma.agr1996@gmail.com으로 연락해 주세요. 다른 사람이 이 글을 찾을 수 있도록 여러분의 박수는 정말 감사합니다 😃.

<div class="content-ad"></div>

![image](https://miro.medium.com/v2/resize:fit:1200/0*FNjvFFuYMHv0AK27.gif)

# Level Up Coding

우리 커뮤니티에 참여해 주셔서 감사합니다! 떠나시기 전에:

- 👏 이야기에 박수를 보내고 저자를 팔로우하세요 👉
- 📰 Level Up Coding 게시물에서 더 많은 콘텐츠를 확인하세요
- 💰 무료 코딩 인터뷰 코스 ⇒ 코스 보기
- 🔔 팔로우하기: 트위터 | 링크드인 | 뉴스레터

<div class="content-ad"></div>

🚀👉 Level Up 인재 모임에 참여하여 멋진 직업을 찾아보세요!