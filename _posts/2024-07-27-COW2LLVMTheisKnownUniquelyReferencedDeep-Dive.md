---
title: "COW2LLVM isKnownUniquelyReferenced 심층 분석"
description: ""
coverImage: "/assets/img/2024-07-27-COW2LLVMTheisKnownUniquelyReferencedDeep-Dive_0.png"
date: 2024-07-27 14:02
ogImage:
  url: /assets/img/2024-07-27-COW2LLVMTheisKnownUniquelyReferencedDeep-Dive_0.png
tag: Tech
originalTitle: "COW2LLVM The isKnownUniquelyReferenced Deep-Dive"
link: "https://medium.com/the-swift-cooperative/cow2llvm-the-isknownuniquelyreferenced-deep-dive-7ea21d3b0399"
isUpdated: true
---

![이미지](/assets/img/2024-07-27-COW2LLVMTheisKnownUniquelyReferencedDeep-Dive_0.png)

복사 시 쓰기(또는 CoW 또는 🐮) 최적화는 iOS 엔지니어들을 위한 필수적인 면접 질문입니다.

오늘은 이 최적화가 실제로 어떻게 작동하는지 알아보기 위해 여행을 떠납니다. 저는 Swift 컴파일러의 수수께끼 같은 소스 코드의 깊숙한 곳으로 여러분을 안내하겠습니다.

# 로드맵

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

- 🐮은 무엇인가요?
- 🐮 구현하기
- Swift 표준 라이브러리
- 내장 함수
- (간주) Swift 컴파일러
- 추상 구문 트리
- Swift 중간 언어
- LLVM 중간 표현
- Swift 런타임
- SwiftShims
- isKnownUniquelyReferenced 미미
- 결론

# 🐮은 무엇인가요?
