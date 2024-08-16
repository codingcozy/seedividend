---
title: "jQuery를 사용하여 HTML을 PDF로 변환하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-HowToConvertHTMLToPDFUsingjQuery_0.png"
date: 2024-06-22 03:56
ogImage: 
  url: /assets/img/2024-06-22-HowToConvertHTMLToPDFUsingjQuery_0.png
tag: Tech
originalTitle: "How To Convert HTML To PDF Using jQuery"
link: "https://medium.com/@techsolutionstuff/how-to-convert-html-to-pdf-using-jquery-89b01ec1a100"
isUpdated: true
---




본 글에서는 jquery를 사용하여 HTML을 PDF로 변환하는 방법을 살펴보겠습니다. PDF 파일 형식은 웹 응용 프로그램에서 대량 데이터를 다운로드하는 데 유용합니다. PDF 기능으로 오프라인으로 사용하기 위해 동적 콘텐츠를 파일 형식으로 다운로드할 수 있습니다.

jQuery는 HTML을 PDF로 변환하는 가장 쉬운 방법이며 다양한 jquery 라이브러리가 있습니다. jsPDF는 jquery를 사용하여 HTML을 PDF로 변환하는 최고의 라이브러리 중 하나입니다. 전체적인 클라이언트 측 JavaScript PDF 생성을 위한 것입니다.

그러니까, jquery를 사용하여 HTML 페이지를 PDF로 변환하는 방법, jquery를 사용하여 PDF 파일을 만드는 방법, HTML을 PDF 파일로 변환하는 방법에 대해 알아보겠습니다.

예시:

<div class="content-ad"></div>

우선, HTML을 PDF로 변환하는 HTML 페이지를 만들 것입니다. HTML 페이지에 다음 코드를 추가하십시오.

```js
<html>
    <h1>jQuery를 사용하여 HTML을 PDF로 변환하는 방법 - Techsolutionstuff</h1>
    <form class="form">        
        |  Company Name  |  Employee Name  |  Country  |
        |  ---- | ---- | ---- |
        |  Dell  |  Maria  |  Germany  |
        |  Asus  |  Francisco  |  Mexico  |
        |  Apple  |  Roland  |  Austria  |
        |  Lenovo  |  Yoshi  |  Canada  |
        |  HP  |  Helen  |  UK  |
        |  Acer  |  Hel  |  UK  |

        <input type="button" id="create_pdf" value="PDF 생성">  
    </form>  
</html>
```

추가읽기: 부트스트랩 5 Datepicker에서 날짜 비활성화하는 방법

이 HTML 페이지의 스타일을 추가하세요.

<div class="content-ad"></div>

```js
<style>
table {  
    font-family: arial, sans-serif;  
    border-collapse: collapse;  
    width: 100%;  
}  

td {  
    border: 1px solid #dddddd;  
    text-align: left;  
    padding: 8px;  
} 
th{
    border: 1px solid #dddddd;  
    text-align: left;  
    padding: 8px;  
    background-color: #111;  
    color:white;
}

tr:nth-child(odd) {  
    background-color: #dddddd;  
}
</style>
```

참고 자료: 부트스트랩 5 datepicker 예제 로컬라이징 방법

다음 스크립트를 HTML 페이지에 추가하여 PDF로 변환합니다.

```js
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.5/jspdf.min.js"></script>  
<script>
$(document).ready(function () {  
    var form = $('.form'),  
    cache_width = form.width(),  
    a4 = [595.28, 841.89]; // A4 용지의 너비와 높이  

    $('#create_pdf').on('click', function () {  
        $('body').scrollTop(0);  
        createPDF();  
    });  
    
    function createPDF() {  
        getCanvas().then(function (canvas) {  
            var  
             img = canvas.toDataURL("image/png"),  
             doc = new jsPDF({  
                 unit: 'px',  
                 format: 'a4'  
             });  
            doc.addImage(img, 'JPEG', 20, 20);  
            doc.save('techsolutionstuff.pdf');  
            form.width(cache_width);  
        });  
    }  
      
    function getCanvas() {  
        form.width((a4[0] * 1.33333) - 80).css('max-width', 'none');  
        return html2canvas(form, {  
            imageTimeout: 2000,  
            removeContainer: true  
        });  
    }
});
</script>
```

<div class="content-ad"></div>

아래 내용도 참고하면 좋을 것 같아요:

- 추가 읽기: Laravel 10에서 DomPDF를 사용하여 PDF 생성하기
- 추가 읽기: Laravel 9에서 PDF에 헤더와 푸터 설정하는 방법
- 추가 읽기: Laravel 9에서 AJAX를 이용해 PDF 파일 다운로드하는 방법
- 추가 읽기: PDFKit을 사용하여 Node JS에서 PDF 파일 생성하는 방법