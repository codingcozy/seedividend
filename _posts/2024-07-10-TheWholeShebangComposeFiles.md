---
title: "전체 가이드 Compose 파일 작성하는 방법"
description: ""
coverImage: "/assets/img/2024-07-10-TheWholeShebangComposeFiles_0.png"
date: 2024-07-10 02:26
ogImage: 
  url: /assets/img/2024-07-10-TheWholeShebangComposeFiles_0.png
tag: Tech
originalTitle: "The Whole Shebang: Compose Files"
link: "https://medium.com/better-programming/the-whole-shebang-compose-files-5b6f50dd196c"
isUpdated: true
---




![이미지](/assets/img/2024-07-10-TheWholeShebangComposeFiles_0.png)

요즘 Docker와 컨테이너에 대해 많이 쓰고 가르치고 있어요. 제 글을 보고 피드백 주시는 여러분들께 정말 감사하답니다. 여러분의 의견을 듣고 다음 주제는 당연히 Docker Compose죠 - 왜냐하면 이제 여러분은 컨테이너 이미지를 만들고 실행하는 방법을 알기 때문에, 다음 단계로 복잡한 다중 컨테이너 애플리케이션을 만들고 그것을 하나의 소프트웨어 조각으로 관리하는 거예요.

# Docker Compose: 무엇이고 왜 필요한가요?

공식 문서에서 자세한 내용을 확인할 수 있어요. 간단히 설명하면 이렇죠: Docker를 사용하여 컨테이너, 이미지, 볼륨 등을 관리해요. docker run을 실행하면 싱글 컨테이너를 실행한다는 거죠. 첫 번째 컨테이너와 상호작용하는 두 번째 컨테이너를 시작하려면 docker run을 다시 실행해야 하고 각각의 볼륨과 네트워크를 따로 관리해서 두 컨테이너가 서로 보고 통신할 수 있게 해줘야 해요.