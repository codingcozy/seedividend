---
title: "Angular 파일 다운로드 및 다운로드 추적을 위한 프로그레스 바 구현하기"
description: ""
coverImage: "/assets/img/2024-06-20-AngularDownloadingfilesandimplementingaprogressbarfortrackingthedownload_0.png"
date: 2024-06-20 02:53
ogImage:
  url: /assets/img/2024-06-20-AngularDownloadingfilesandimplementingaprogressbarfortrackingthedownload_0.png
tag: Tech
originalTitle: "Angular: Downloading files and implementing a progress bar for tracking the download"
link: "https://medium.com/stackademic/angular-downloading-files-and-implementing-a-progress-bar-for-tracking-the-download-bd1cb552d646"
isUpdated: true
---

이 이야기는 몇 년 전에 썼던 것과 매우 비슷한 내용입니다. 그 이야기는 여러 파일을 업로드하는 진행 막대를 구현하는 것과 관련이 있었습니다. 각 파일의 업로드를 추적하는 데 사용되는 진행 막대가 1개 있었습니다.

이 이야기에서는 Node Express 서버에서 5000개의 객체를 포함하는 photos.json 파일을 다운로드합니다.

![이미지](/assets/img/2024-06-20-AngularDownloadingfilesandimplementingaprogressbarfortrackingthedownload_0.png)

아래는 애플리케이션의 간단한 데모입니다. Chrome 개발 도구를 사용하여 느린 3G 연결을 시뮬레이션하여 파일 다운로드가 천천히 진행되는 것을 볼 수 있습니다. 나중에는 추가적인 npm 모듈을 설치하지 않고 시스템에 파일을 다운로드하는 코드 작성 방법을 안내하겠습니다.

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

Node Server 프로젝트

![이미지](/assets/img/2024-06-20-AngularDownloadingfilesandimplementingaprogressbarfortrackingthedownload_1.png)

index.js

위 파일에 설정된 "Content-Length" 응답 헤더에 유의해주세요. 이 헤더는 프로그레스 바를 구현하는 중요한 단계입니다. 이 헤더는 Angular 애플리케이션에게 받을 데이터의 총 크기를 알려줌으로써 프로그레스 바를 구현하는 데 도움이 됩니다.

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

"Content-Disposition" 응답 헤더는 콘텐츠가 브라우저에서 인라인으로 표시되는지(Web 페이지 또는 웹 페이지의 일부로) 아니면 첨부 파일로 다운로드되어 로컬에 저장되는지를 나타내는 헤더입니다.

우리는 콘텐츠가 "photos.json"이라는 파일로 다운로드되기를 원합니다.

Angular 프로젝트

Angular 프로젝트에는 AppComponent와 ProgressComponent 두 개의 컴포넌트가 있습니다.

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

우리는 데이터를 가져오기 위해 노드 서버와 연결하는 FileDownloadService라는 단일 서비스를 가지고 있습니다.

AppComponent 템플릿

`app-progress`는 ProgressComponent를 위한 셀렉터입니다. 이미지 업로드 진행률을 @Input('ratio')로 ProgressComponent에 전달하고 있습니다. 업로드 진행률은 downloadprogressRatio$ observable을 구독하여 async 파이프를 통해 @Input('ratio')로 전달됩니다.

```js
<h4>Downloading</h4>
<app-progress [ratio]=”downloadprogressRatio$|async”></app-progress>
<button (click)=”download()”>Download JSON</button>
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

“Download JSON” 버튼을 클릭하면, 해당 클래스에서 download()을 호출하게 됩니다.

AppComponent 클래스

- downloadProgressRatio$는 observable입니다. 우리는 FileDownloadService에서 반환된 getDownloadingProgress()의 observable을 downloadProgressRatio$ observable에 할당합니다. 이 observable은 템플릿에서 async 파이프를 통해 구독됩니다.

```js
<app-progress [ratio]=”downloadprogressRatio$|async”></app-progress>
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

2. 템플릿의 "다운로드" 버튼을 클릭하면, 해당 클래스의 download()이 호출되며, 이 메서드는 FileDownloadService의 downloadJson()을 호출합니다.

FileDownloadService

- downloadingProgressSub는 각 파일의 다운로드 진행 상황을 컴포넌트에 실시간 업데이트해 주는 중요한 역할을 하는 Subject입니다.
- 이미 클래스의 ngOnInit()에서 getDownloadingProgress()가 호출되었음을 확인했습니다. 이 메서드는 해당 Subject에 대한 Observable을 반환하는 역할을 합니다.

```js
getDownloadingProgress(){
    return this.downloadingProgressSub.asObservable();
}
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

3. "Download JSON" 버튼을 클릭하면 downloadJson() 함수가 호출됩니다. 우리는 Node 서버에서 photos.json을 가져오기 위해 GET 요청을 보냅니다.

```js
downloadJson();
{
  return this.http.get(`${environment.baseUrl}photos`, { reportProgress: true, observe: "events" }).pipe(
    tap((response: any) => {
      if (response.type == HttpEventType.DownloadProgress) {
        //3
        this.setDownloadingProgress(response.loaded / response.total);
      } else if (response.type === HttpEventType.Response) {
        let blob = new Blob([JSON.stringify(response.body)]);
        this.downloadBlob(response, blob);
      }
    }),
    catchError((err) => {
      return throwError(err);
    })
  );
}
```

4. HTTP GET 요청에 전달되는 추가 옵션을 관찰해주세요.

```js
this.http.get(`${environment.baseUrl}photos`,{reportProgress:true,observe:’events’})
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

파일 다운로드 진행 상황에 대한 피드백을 제공하여 사용자들에게 더 나은 경험을 제공하고 있습니다. 우리는 진행 상황 추적을 가능하게 하기 위해 reportProgress를 true로 설정했습니다.

observe 값은 관찰하고자 하는 내용에 따라 반환 유형을 결정합니다. "events"의 observe 값은 기본적으로 진행 상황 이벤트를 포함한 HttpEvent 스트림의 observable을 반환합니다.

5. 서버로부터 데이터를 받기 때문에, HttpEvent의 유형은 DownloadProgress(UploadProgress가 아님)일 것입니다.

```js
if (event.type == HttpEventType.DownloadProgress) {
  //3
  this.setDownloadingProgress(event.loaded / event.total);
}
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

event.load은 로드된 파일의 바이트 수입니다.

event.total은 로드해야하는 전체 바이트 수입니다.

event.load/event.total은 업로드 중인 파일의 진행률을 나타냅니다.

저희는 setDownloadingProgress()를 호출하여 진행률을 인수로 전달합니다.

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
setDownloadingProgress(data: any) {
    this.downloadingProgressSub.next(data);
}
```

setDownloadingProgress() 메서드에서는 진행률 비율을 downloadingProgressSub Subject로 전달하고 있습니다.

AppComponent 템플릿에서 이 Subject에 async pipe를 통해 구독하고 있다는 것을 기억하시나요?

6. Node 서버로부터 본문을 포함한 전체 응답을 받으면, HttpEvent는 Response 유형이 됩니다. 그런 다음 응답 본문에서 Blob 객체를 생성하고 이 blob 객체 및 HttpResponse를 downloadBlob() 메서드에 인수로 전달합니다.

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
else if(response.type === HttpEventType.Response){
let blob = new Blob([JSON.stringify(response.body)]);
this.downloadBlob(response, blob);
}
```

7. Inside the `downloadBlob()`, we have written a common logic to perform automatic download of file received.

```js
downloadBlob(response: any, blob: Blob){

let substringA = response.headers.get('content-disposition').substring(response.headers.get('content-disposition').indexOf(";") + 1);
let filename = substringA.substring(substringA.indexOf("=") + 1).replace(/[""]/g, "");
let link = document.createElement('a');
link.download = filename;
link.href = URL.createObjectURL(blob);
link.click();
}
```

We are first extracting the filename from the Content-Disposition response header.

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
let substringA = response.headers
  .get("content-disposition")
  .substring(response.headers.get("content-disposition").indexOf(";") + 1);
let filename = substringA.substring(substringA.indexOf("=") + 1).replace(/[“”]+/g, "");
```

이것이 Content-Disposition 헤더가 보이는 모습입니다.

다음으로 앵커 요소인 `a`를 생성하고 요소의 다운로드 및 href 속성을 설정합니다. 다운로드 속성은 파일 이름으로 설정됩니다. href 속성은 Blob 객체에 대해 생성된 객체 URL로 설정됩니다. Blob는 createObjectURL()을 사용하여 내용을 보여주기 위해 `a`, `img` 또는 다른 태그를 사용할 수 있습니다.

```js
let link = document.createElement("a");
link.download = filename;
link.href = URL.createObjectURL(blob);
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

마지막으로 앵커 요소를 프로그래밍 방식으로 클릭하여 다운로드가 자동으로 시작되도록 합니다. 우리는 앵커 요소를 DOM에 첨부하고 싶지 않습니다.

```js
link.click();
```

ProgressComponent 템플릿

```js
<div class=”container pending”>
<div class=”progress-container” [ngClass]=”ratio === 1 ? ‘complete’ : ‘pending’”>
<div [ngStyle]=”{width:progress}”>
</div>
<div class=”progress-message”>{progress}</div>
</div>
</div>
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

"complete" 및 "pending" CSS 클래스는 아래와 같이 정의되어 있습니다:

```js
.complete {
  background-color: lightgreen;
}
.pending {
  background-color: rgb(243, 111, 111);
}
```

ProgressComponent 클래스

이 클래스는 AppComponent로부터 속성 바인딩을 통해 @Input('ratio')를 수신합니다. 우리는 이 비율에 100을 곱하여 백분율을 얻은 다음 가장 가까운 정수로 반올림합니다. 이 백분율을 사용하여 진행 막대의 너비를 조정합니다.

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

아래는 앵귤러 및 노드 프로젝트의 git 저장소입니다.

# Stackademic 🎓

끝까지 읽어주셔서 감사합니다. 떠나기 전에:

- 작가를 클릭하고 팔로우해주시면 감사하겠습니다! 👏
- 우리를 팔로우하세요 X | LinkedIn | YouTube | Discord
- 다른 플랫폼에서도 방문해주세요: In Plain English | CoFeed | Differ
- Stackademic.com에서 더 많은 콘텐츠를 확인할 수 있습니다.
