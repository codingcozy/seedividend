---
title: "HTML, CSS, 및 JavaScript를 사용하여 반응형 폼을 만드는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "How To Make a Responsive Form using HTML, Css and JavaScript"
link: "https://medium.com/@techloons/how-to-make-a-responsive-form-using-html-css-and-javascript-d2daf84c991d"
isUpdated: true
---





<img src="/assets/img/HowToMakeaResponsiveFormusingHTMLCssandJavaScript_0.png" />

HTML, CSS, 그리고 JavaScript를 사용하여 반응형 양식을 만드는 솔루션 또는 코드가 여기 있습니다: HTMl, CSS, 그리고 JavaScript를 사용한 초보자용 프로젝트

간단하게 두 코드를 모두 복사하여 vs code에 붙여넣기하면 자유롭게 사용할 수 있습니다.

# 1. index.html

<div class="content-ad"></div>

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Form UI Design</title>

    <!-- custom css file linked -->
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body>
    <div class="container">
      <!-- form -->
      <form action="#">

        <h2 class="form-heading">Registration Form</h3>
        <!-- name input fields -->
        <div class="name-input">
          <input
            type="text"
            class="name-input-field"
            placeholder="First Name"
            required
          />
          <input type="text" class="name-input-field" placeholder="Last Name" />
        </div>

        <!-- other input fields -->
        <div class="other-input">
          <input type="email" required placeholder="Email" />
          <input type="text" required placeholder="Mobile" />
          <input type="password" required placeholder="Password" />
          <input type="password" required placeholder="Confirm Password" />
        </div>

        <!-- terms and condition -->
        <div class="tnc">
          <p>
            <input type="checkbox" class="chechbox" required />
          </p>
          <p>Agree to terms & conditions.</p>
        </div>

        <!-- submit button -->
        <button class="btn">Submit</button>
      </form>
    </div>
  </body>
</html>
```

# 2. style.css

```js
* {
    font-family: Arial, Helvetica, sans-serif;
}

.container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

form {
    background: #53E0BC;
    width: 450px;
    height: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;
    padding-left: 5px;
    border-radius: 10px;
}

.form-heading {
    text-align: center;
    color: #fff;
}

input {
    font-size: 16px;
    border: 0;
    outline: none;
    background: #ffffff;
    border-radius: 10px;
    height: 40px;
    width: 90%;
    padding: 3px 15px;
}

.name-input {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 15px;
    padding-left: 10px;
}

.name-input-field {
    width: 40% !important;
}

.other-input {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
}


.tnc {
    cursor: pointer;
    width:300px !important;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    padding-left: 10px;
}

.btn {
    outline: 0;
    border: 0;
    border-radius: 10px;
    height: 40px;
    width: 100px;
    font-weight: 600;
    margin-left: 38%;
    background: #fff;
}

.btn:hover {
    cursor: pointer;
    background: #EAF0F1;
}
```
