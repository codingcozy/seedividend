---
title: "견고성 원칙으로 정적 타입 검사기 무력화하는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-06-Silencethestatictypecheckerwiththerobustnessprinciple_0.png"
date: 2024-07-06 02:22
ogImage:
  url: /assets/img/2024-07-06-Silencethestatictypecheckerwiththerobustnessprinciple_0.png
tag: Tech
originalTitle: "Silence the static type checker with the robustness principle"
link: "https://medium.com/@cautaerts/silence-the-static-type-checker-with-the-robustness-principle-0beebfa88252"
---

/assets/img/2024-07-06-Silencethestatictypecheckerwiththerobustnessprinciple_0.png

타입 힌트는 mypy나 pyright와 같은 정적 타입 체커와 결합하여 Python 코드의 견고성과 유지 보수성을 크게 향상시킬 수 있습니다. 프로그램을 실행하기 전에 전체 클래스의 버그를 감지하고 수정할 수 있다는 것은 매우 유용합니다. 무모한 리팩터링을 가능하게 하며 테스트 작성 부담을 크게 줄여줍니다.

또한, 타입 힌트는 사용자와 유지 보수자가 코드 조각이 무엇을 해야 하는지 빠르게 알 수 있도록 도와주는 최소한의 문서 역할을 합니다.

하지만 많은 Python 개발자들 — 특히 강력한 타입 시스템을 경험하지 않은 경우 — 타입 힌팅에 어려움을 겪습니다. 내장된 데이터 유형을 사용하는 단순한 예제를 넘어서면 타입 체커의 모든 규칙을 따르기는 끝없는 오류의 연속으로 이어질 수 있습니다. 타입 체커와의 장시간의 싸움 끝에 대부분의 개발자들은 수많은 Any 주석이나 # type: ignore 주석을 사용하여 항복하게 됩니다. 이는 결국 타입 체크로부터 얻는 안전 보장을 피하는 결과를 초래합니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

파이썬 개발자들이 타입 힌트에 어려움을 겪는 주요 이유 중 하나는 전투 규칙을 정확히 모르기 때문입니다. 타입 힌트는 함께...
