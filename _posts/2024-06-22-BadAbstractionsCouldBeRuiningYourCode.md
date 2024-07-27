---
title: "나쁜 추상화가 코드를 망치는 이유"
description: ""
coverImage: "/assets/img/2024-06-22-BadAbstractionsCouldBeRuiningYourCode_0.png"
date: 2024-06-22 05:50
ogImage: 
  url: /assets/img/2024-06-22-BadAbstractionsCouldBeRuiningYourCode_0.png
tag: Tech
originalTitle: "Bad Abstractions Could Be Ruining Your Code"
link: "https://medium.com/gitconnected/bad-abstractions-could-be-ruining-your-code-bf06901585b0"
---


상당히 큰 코드베이스에서 작업 중이라고 상상해 봅시다. 다음 코드에서 문제점을 발견하셨나요?

```js
const icons = {
  delete: getIconPath("delete"),
  edit: getIconPath("edit"),
  save: getIconPath("save"),
};
```