---
title: "HTML Javascript 파일 업로드용 드래그 앤 드롭 지원"
description: ""
coverImage: "/assets/img/2024-12-06-HTMLJavascriptSupportDragandDropforFileUpload_0.png"
date: 2024-12-06 18:27
ogImage: 
  url: /assets/img/2024-12-06-HTMLJavascriptSupportDragandDropforFileUpload_0.png
tag: Tech
originalTitle: "HTML Javascript Support Drag and Drop for File Upload"
link: "https://levelup.gitconnected.com/html-javascript-support-drag-and-drop-for-file-upload-28d60d7f3461"
isUpdated: false
---


파일 가져오기 도구를 사용할 때마다 짜증이 나요… 원하는 파일을 찾는 게 너무 힘들거든요!

그래서!

이 글에서는 파일 업로드를 위한 드래그 앤 드롭 지원을 추가하는 방법에 대해 간단히 공유하고자 합니다!

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

안녕하세요! 

아이디어는 아주 간단해요!

HTML Drag and Drop API를 사용해보세요!

하지만 공식 문서에는 우리가 필요하지 않은 정보가 너무 많이 있어서, 여러분이 이 기능을 쉽게 시작할 수 있도록 간단한 코드 스니펫을 공유하기 위해 이 글을 작성하게 되었어요!

# 코드

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

안녕하세요! 코드를 시작해 봅시다.

이번 작업을 위한 작은 코드펜도 만들었으니, 거기서 직접 시도해 보셔도 좋아요!

## HTML

```html
<div id="fileImport">
  파일 가져오기 영역
</div>

<div id="result"></div>
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

## CSS

```css
#fileImport {
  background: #b3b3b3;
  width: 200px;
  height: 120px;
}
```

## Javascript

스크립트는 핵심입니다.

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
window.onload = (event) => {
    console.log("페이지가 완전히 로드되었습니다");
    const containerDiv = document.getElementById("fileImport");

    containerDiv.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.dataTransfer.clearData();
        e.dataTransfer.dropEffect = "copy";
    });

    containerDiv.addEventListener("drop", (e) => {
        e.preventDefault();
        const items = Array.from(e.dataTransfer.items);
        if (items.length === 0) {
            return;
        }

        let resultString = "";
        items.forEach((item, i) => {
            if (item.kind === "file") {
                const file = item.getAsFile();
                resultString = `${resultString}<br>${i}: ${file.name}`;
                document.getElementById("result").innerHTML = resultString;
            }
        });
    });
};
```

드래그 앤 드롭 API에는 다른 많은 이벤트 리스너가 있지만 여기서는 drop과 dragover만 중요합니다!

dragStart는 필요 없고, event.dataTransfer.setData도 필요 없습니다! 

dragover 이벤트 핸들러는 주로 브라우저의 기본 드래그 동작을 비활성화하기 위해 필요합니다. 기본적으로 드래그 앤 드롭을 허용하지 않거든요.

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

드롭 영역은 우리가 드롭된 파일의 내용을 가져오는 곳입니다. 여기에서는 결과 div에 파일 이름만 간단히 표시하고 있지만, (물론) 여러분은 여기서 좀 더 흥미로운 작업을 하게 될 것입니다. 예를 들어, 서버에 파일을 업로드하는 것이죠.

저는 자바스크립트를 사용하여 이벤트 리스너를 추가했지만, 드롭 이벤트 리스너에는 ondrop을, 드래그 오버 이벤트에는 ondragover를 다음과 같이 사용할 수 있습니다.

```js
<div id="fileImport" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
```

# 데모

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

코드는 여기까지입니다!

우리의 진행 상황을 확인해볼까요?

![코드 진행 상황](https://miro.medium.com/v2/resize:fit:1400/1*tCUeCSs6RssDG_a55u4aoA.gif)

좋아요!

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

읽어주셔서 감사합니다!

HTML과 JavaScript로 파일 드래그 앤 드롭이 정말 간단해요!

웹 앱에서 이 기능을 활성화하면, 저는 당신을 영원히 감사할 거예요!

행복한 드래그 앤 드롭 되세요!