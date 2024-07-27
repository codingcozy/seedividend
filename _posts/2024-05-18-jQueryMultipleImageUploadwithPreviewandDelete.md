---
title: "jQuery를 이용한 다중 이미지 업로드 및 미리 보기와 삭제 기능"
description: ""
coverImage: "/assets/img/2024-05-18-jQueryMultipleImageUploadwithPreviewandDelete_0.png"
date: 2024-05-18 22:13
ogImage: 
  url: /assets/img/2024-05-18-jQueryMultipleImageUploadwithPreviewandDelete_0.png
tag: Tech
originalTitle: "jQuery Multiple Image Upload with Preview and Delete"
link: "https://medium.com/@tutsmake.com/jquery-multiple-image-upload-with-preview-and-delete-6506a3b954ca"
---


jQuery를 이용한 다중 이미지 업로드 기능에 미리 보기 및 삭제가 포함되어 있습니다. 이 기능을 사용하면 사용자가 로컬 디바이스에서 여러 이미지를 선택하고 실제로 서버에 업로드하기 전에 미리 보여줄 수 있습니다. 또한 업로드 전에 미리 보기된 선택한 이미지를 삭제할 수 있는 기능도 포함되어 있습니다. 이 기능은 사진 갤러리, 이미지 공유 플랫폼, 콘텐츠 관리 시스템 등 사용자가 여러 이미지를 업로드해야 하는 웹 애플리케이션에서 일반적으로 사용됩니다.

일반적으로 구현 방식은 JavaScript의 FileReader API를 사용하여 선택한 이미지 파일을 읽고 브라우저에서 미리 보여주는 것이 포함됩니다. DOM 조작과 이벤트 처리를 간단하게하기 위해 jQuery가 종종 사용됩니다.

다음은 작동 방식에 대한 기본 개요입니다:

- 사용자는 `input type="file"` 요소를 사용하여 여러 이미지 파일을 선택합니다. (multiple 속성 사용)
- JavaScript (대부분 jQuery 사용)을 사용하여 파일 선택 변경 이벤트를 처리합니다.
- 각 선택한 파일에 대해 FileReader 객체를 생성하여 파일 내용을 데이터 URL로 읽습니다.
- 데이터 URL을 사용하여 미리 보기 영역에 `img` 요소를 만들어 선택한 이미지의 썸네일 미리 보기를 표시합니다.
- 선택한 이미지를 업로드하기 전에 사용자가 이미지를 선택 해제할 수 있는 삭제 버튼을 제공할 수도 있습니다.
- 사용자가 선택한 이미지를 업로드할 준비가 되면 실제 파일 데이터를 서버로 보내기 위해 폼 제출 또는 AJAX 요청을 사용합니다.

<div class="content-ad"></div>

여기 여러 이미지를 미리보기 및 삭제할 수 있는 방법을 구현하는 간단한 가이드입니다.

1단계: HTML 마크업

```html
<!DOCTYPE html>
<html>
<head>
    <title>다중 이미지 업로드 및 미리보기 및 삭제</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <style>
        .preview {
            display: inline-block;
            margin: 10px;
        }
        .preview img {
            width: 100px;
            height: 100px;
            margin-right: 10px;
        }
    </style>
</head>
<body>
    <input type="file" id="file-input" multiple>
    <div id="preview-container"></div>
<script src="script.js"></script>
</body>
</html>
```

2단계: JavaScript
JavaScript 파일을 script.js로 만들고 다음 코드를 추가하세요.

<div class="content-ad"></div>

```js
$(document).ready(function(){
    $("#file-input").on("change", function(){
        var files = $(this)[0].files;
        $("#preview-container").empty();
        if(files.length > 0){
            for(var i = 0; i < files.length; i++){
                var reader = new FileReader();
                reader.onload = function(e){
                    $("<div class='preview'><img src='" + e.target.result + "'><button class='delete'>Delete</button></div>").appendTo("#preview-container");
                };
                reader.readAsDataURL(files[i]);
            }
        }
    });
    $("#preview-container").on("click", ".delete", function(){
        $(this).parent(".preview").remove();
        $("#file-input").val(""); // Clear input value if needed
    });
});
```

설명:

- 먼저 multiple 특성을 가진 파일 형식의 input 요소를 만듭니다.
- 선택된 이미지의 미리 보기를 표시할 preview-container라는 id를 가진 div를 만듭니다.
- 파일 입력이 변경되면 FileReader API를 사용하여 선택한 파일을 읽고 그들의 미리 보기 이미지를 preview-container에 표시합니다.
- 각 선택된 파일마다, 해당 파일의 데이터 URL로 src를 설정한 img 태그와 삭제를 위한 delete 클래스가 지정된 버튼이 있는 preview 클래스를 가진 div를 생성합니다.
- 삭제 버튼을 클릭하면 preview 클래스를 가진 부모 div를 preview-container에서 제거합니다.

총적으로 jQuery를 이용한 여러 이미지 업로드 및 미리 보기와 삭제 기능은 사용자가 선택한 이미지의 시각적 표현을 제공하고 업로드를 완료하기 전에 선택을 관리할 수 있으므로 사용자 경험을 향상시켜 줍니다.