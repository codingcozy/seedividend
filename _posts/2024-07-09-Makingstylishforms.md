---
title: "스타일리시한 폼 만들기 방법"
description: ""
coverImage: "/assets/no-image.jpg"
date: 2024-07-09 09:01
ogImage: 
  url: /assets/no-image.jpg
tag: Tech
originalTitle: "Making stylish forms"
link: "https://medium.com/@gaurav111shirodkar/making-stylish-forms-01c7d5e459f2"
isUpdated: true
---




```js
<html>
 <head>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
  <!-- 입력 요소의 테두리를 제거하고 그 사이 간격 유지 -->
  <style type="text/css">
   #a,#b,#c,#d {
    border:0;
    /* 각 입력 요소의 테두리 제거 */
   }
   fieldset {
    margin-bottom: 10px;
    /* 입력 요소 간 간격 유지 */
   }
  </style>
  <!-- 페이지 로드 시 Jquery 애니메이션과 함께 클릭 이벤트에 대한 이벤트 리스너 설정 -->
  <script type="text/javascript">
   $(document).ready(function() {
    $("#a").click(function(){
     $(this).attr("style","outline:none");
     $('.la').toggle("slow");
    });
    $("#b").click(function(){
     $(this).attr("style","outline:none");
     $('.lb').toggle("slow");
    });
    $("#c").click(function(){
     $(this).attr("style","outline:none");
     $('.lc').toggle("slow");
    });
    $("#d").click(function(){
     $(this).attr("style","outline:none");
     $('.ld').toggle("slow");
    });
    console.log("hello"); // 테스트용 코드
    }
   );
  </script>
 </head>
 <body>
  <form>
   <fieldset>
    <legend style="border:0;display:none" class="la">이름</legend>
    <span class="la">이름:-</span>
    <input type="text" id="a" class="form-control" value="Jui" style="border:0"/>
   </fieldset>
   <fieldset>
    <legend style="border:0;display:none" class="lb">이메일</legend>
    <span class="lb">이메일:-</span>
    <input type="emsil" id="b" class="form-control" value="Jui" style="border:0"/>
   </fieldset>
   <fieldset>
    <legend style="border:0;display:none" class="lc">전화번호</legend>
    <span class="lc">전화번호:-</span>
    <input type="number" id="c" class="form-control" value="Jui" style="border:0"/>
   </fieldset>
   <fieldset>
    <legend style="border:0;display:none" class="ld">비밀번호</legend>
    <span class="ld">비밀번호:-</span>
    <input type="password" id="d" class="form-control" value="Jui" style="border:0"/>
   </fieldset>
  </form>
 </body>
</html>
```

<div class="content-ad"></div>

각 입력 필드의 윤곽선을 "none"으로 설정해주세요.