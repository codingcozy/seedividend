---
title: "자바에서 If Else 없이 입력 검증하는 방법"
description: ""
coverImage: "/assets/img/2024-07-09-NomoreIfelseinputvalidationinJava_0.png"
date: 2024-07-09 21:33
ogImage: 
  url: /assets/img/2024-07-09-NomoreIfelseinputvalidationinJava_0.png
tag: Tech
originalTitle: "No more If else input validation in Java"
link: "https://medium.com/@vishvakalhara/no-more-if-else-input-validation-in-java-ccdc931439f9"
---


우리가 직접 모든 입력을 유효성 검사해야 하는 걸까요?

<img src="/assets/img/2024-07-09-NomoreIfelseinputvalidationinJava_0.png" />

## Spark Validator: 문서 🖐️

최근에, 저는 Java를 사용하여 독립 실행형 응용 프로그램 개발을 배우기 시작했습니다. 학습과정은 흥미로웠지만, 한 가지 중요한 고충이 있었습니다. 클라이언트 입력 데이터를 처리할 때, 핵심 백엔드 로직에 집중하는 대신에 검증에 많은 시간을 쏟아야 했습니다. 네, 유효성 검사는 중요하지만, 계속해서 물어보게 되는 실제 질문은 "정말 우리가 모든 입력을 직접 유효성 검사해야만 하는 걸까요?"

<div class="content-ad"></div>

자바에서는 Hibernate Validator, Apache Commons Validator, Spring Validation과 같이 유명한 유효성 검사 라이브러리가 여러 개 있습니다. 이러한 라이브러리들은 강력하고 다양한 기능을 제공하지만, 많은 일반적인 사용 사례에 대해 지나치게 과할 수 있다고 생각합니다. 내 생각에는 때로는 사용자가 값을 입력했는지 또는 입력한 텍스트가 유효한 이메일인지 확인하는 등 기본적인 확인 작업만 수행할 필요가 있는 경우도 있습니다. 이러한 간단한 유효성 검사에는 이러한 라이브러리를 사용하는 것이 불필요하게 복잡할 수 있습니다.

만약 해당 종류의 라이브러리를 사용하지 않는다면, 여러 번의 if-else 문을 작성하고 예외 처리를 다뤄야 하므로 코드가 혼잡해지며 효율성도 떨어집니다. 이러한 경험으로 인해 기본적인 검사를 처리하는 좀 더 간소화된 방법이 없을까 생각해 보게 되었습니다.

단순한 확인을 위해 이러한 라이브러리를 설정하고 구성을 작성하고 예외를 관리하는 귀찮은 과정을 거쳐야 한다는 생각은 좀 답답할 수 있습니다. 이러한 작업은 특히 작은 프로젝트나 촉박한 기한 하에서 작업할 때 특히 번거로울 수 있습니다. 이상적으로는 효율적이고 간편하게 이러한 일반적인 확인을 수행할 수 있는 경량 솔루션이 있어야 합니다. 이러한 솔루션은 다양한 설정과 오버헤드가 필요하지 않고 개발자가 이러한 작업을 쉽고 효율적으로 수행할 수 있어야 합니다.

저는 경량화된 유효성 검사 라이브러리를 개발하는 아이디어를 생각해 냈습니다. 이전에 TypeScript용 스키마 유효성 검사 라이브러리인 Zod를 사용해 봤습니다. Spark Validator는 Zod와 유사하게 작동합니다. 단순히 Spark의 여러 메소드를 연결하여 사용자 입력을 유효성 검사할 수 있습니다.

<div class="content-ad"></div>

# 설치

- Spark.jar를 다운로드하세요.
- 프로젝트의 외부 라이브러리에 추가하세요.
- 패키지를 가져오세요

```js
import com.wishva.*;
```

4. 이 라이브러리의 메소드는 항상 "SparkException"이라는 유효성 검사 오류를 발생시키므로 개발자는 try/catch 블록을 사용하여 처리해야 합니다.

<div class="content-ad"></div>

```js
try{
  
  // 유효성 검사
  
} catch (SparkException ex) {
  JOptionPane.showMessageDialog(this, ex.getMessage(), ex.title, JOptionPane.ERROR_MESSAGE);
}
```

# 예시

## 비어 있지 않은 문자열 유효성 검사하기 👇

```js
Spark validator = new Spark("Username", jTextFieldUsername);
try {
    validator.required().minLength(5).endString();
} catch (SparkException e) {
    System.out.println(e.getMessage());
}
```

<div class="content-ad"></div>

## 이메일 주소 유효성 검사 👇

```js
Spark emailValidator = new Spark("Email", "user@example.com");
try {
    emailValidator.email().endString();
} catch (SparkException e) {
    System.out.println(e.getMessage());
}
```

## 2개의 입력 값 유효성 검사 👇

```js
String password = new Spark("Password", txtBoxPassword.getPassword())
         .required()
         .minLength(8)
         .endString();

new Spark("Confirm Password", txtBoxConfirmPassword.getPassword())
         .required()
         .equals(password, "Passwords does not match!");
```  

<div class="content-ad"></div>

## 정수 유효성 검사하기 👇

```js
Spark intValidator = new Spark("나이", 25);
try {
    intValidator.min(18).max(65).endInt();
} catch (SparkException e) {
    System.out.println(e.getMessage());
}
```

## 사용자 정의 오류 메시지 👇

```js
Spark customValidator = new Spark("비밀번호", "pass");
try {
    customValidator.required("비밀번호를 입력하세요!")
                    .minLength(8, "비밀번호는 최소 8자 이상이어야 합니다!")
                    .endString();
} catch (SparkException e) {
    System.out.println(e.getMessage());
}
```  

<div class="content-ad"></div>

# 결론

마지막으로, Java의 전통적인 유효성 검증 라이브러리는 다양한 기능을 제공하지만, 많은 일반적인 사용 사례에 너무 복잡하고 비효율적일 수 있습니다. Spark Validator는 가벼우면서 간편한 대안을 제공하여 기본적인 유효성 검사 과정을 간소화합니다. 여러 유효성 검사 방법을 연결하고 예외를 간소화된 방식으로 처리할 수 있도록 하여, Spark Validator를 사용하면 번거로운 유효성 검사 과정에 매몰되지 않고 핵심 백엔드 논리에 집중하기가 더 쉬워집니다. 작은 프로젝트에서 작업하거나 시간이 촉박한 상황에서도 Spark Validator를 사용하면 최소한의 설정과 부담 없이 효율적이고 효과적인 입력 유효성 검사를 수행할 수 있습니다.