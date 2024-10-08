---
title: "대학에서도 배울 수 없는 프로그래밍 스킬 5가지"
description: ""
coverImage: "/assets/img/2024-06-22-ProgrammingSkillsThatAnyUniversityCantTeachYou_0.png"
date: 2024-06-22 13:56
ogImage:
  url: /assets/img/2024-06-22-ProgrammingSkillsThatAnyUniversityCantTeachYou_0.png
tag: Tech
originalTitle: "Programming Skills That Any University Can’t Teach You"
link: "https://medium.com/stackademic/programming-skills-that-any-university-cant-teach-you-480d677959e7"
isUpdated: true
---

## 일

![이미지](/assets/img/2024-06-22-ProgrammingSkillsThatAnyUniversityCantTeachYou_0.png)

- 작은 코너나 집에서 코딩하는 것은 매우 교육적이지만, 회사에서 코딩하는 것과는 많이 다릅니다. 둘 중 하나로 다른 것을 대체할 수 없어요.
- 테스트되지 않은 것은 미리 정해지지 않았다고 볼 수 있어요. 시간을 낭비하지 않기 위해 코드를 자동으로 테스트해야합니다(단위 테스트, 통합 테스트, 성능 테스트, 트래픽 재현, 안정성 테스트 등).
- PR/코드 리뷰, 빌드 자동화 및 실행 테스트는 품질을 향상시키는 데 많은 도움이 됩니다. 재구성을 할 때 자신감을 주죠.
- 운영 환경에서 모니터링 및 경보는 꼭 필요합니다. 코드가 오류와 비정상 케이스를 감지하고 오류를 보고하여 이러한 오류가 알람을 생성하여 문제가 감지되고 수정되도록 해야 합니다(가능하면 고객의 불만이 제기되기 전에).
- 학교, 책, 자습서에서 배우는 코딩 방식은 실제 프로젝트에서 사용하는 방식과 다릅니다. 배우는 과정은 주로 hello world나 조금 더 복잡한 내용에 중점을 두는데, 실제 문제는 큰 규모의 코드에서 프레임워크, 방법론 등이 팀으로서 작성/수정/유지되는 방식입니다.
- 새로운 프레임워크나 기술은 주로 좋은 hello world와 자습서 이외의 본질적인 것은 제공하지 않을 수 있습니다. 주요 기술적인 변화가 정기적으로 있을지라도, 제공되는 것 중 95%는 시간을 낭비하는 것일수도 있습니다. 적합한 것, 게임 체인저, 부가적인 것을 구분하는 방법을 배워야 합니다.
- Google, StackOverflow 등이 여러분의 친구입니다. 멈춰있지 마세요. 해결책이 있더라도, 더 나은, 더 짧고, 더 표준적이며, 더 읽기 쉬운 것을 찾아보세요. 여러분이 작성한 이 작은 함수는 이미 어떤 라이브러리에 있을 것입니다. 바퀴를 다시 발명하지 마세요. 연습이나 단지 연습을 위해 사용하기보다는 이미 작성되고 디버깅되어 테스트된 표준 코드를 사용하는 것이 더 좋을 겁니다. 사용자 정의 코드 작성은 마지막 수단이어야 하며, 작성된 코드는 실로 명료하고 간결해야 합니다.
- 인터넷 곳곳에서 코딩에 관한 질문 한 번도 한 적이 없어요. 그러나 많은 질문에 답변했답니다. 99.99%의 경우 여러분이 묻는 질문은 이미 1000번 이상 물린 질문이고 이미 훌륭한 답변이 있습니다. 물어본 질문에 대한 답을 기다리기보다는 누군가 이미 해결책을 갖고 있는지 알아보거나 직접 찾아보세요. 99.99%의 경우 일이 잘 풀리죠.
- 코드는 종종 수정되고 더 자주 읽힙니다. 매우 읽기 쉽고 의외가 없어야 합니다. 작친 꼼수, 지나치게 똑똑하거나 너무 많은 가정을 하는 코드는 리뷰어가 버그를 수정해야 하는데 리뷰어가 혼란스러워하게 만들 것입니다.
- 좋은 IDE는 코드를 쉽게 이동하게 해주며, 리팩토링을 수행하고, 잠재적인 버그를 강조하며, 단위 테스트를 실행하고 디버깅을 쉽게 할 수 있도록 도와줍니다. print/cout 라인을 추가하여 디버깅하지 마세요, 수정한 메서드 호출 50회를 하나씩 수정하지 마세요. 그보다 나은 방법이 있답니다. 진정한 IDE를 사용하는 방법을 배워보세요.
- 여러분이 작성하는 코드는 여러분의 코드가 아닙니다. 수정/리펙토링/개발을 하는 모든 사람에게 속합니다. 마찬가지로, 코드를 여러분의 취향에 맞게 수정해선 안됩니다.
- 두 종류의 코드가 있습니다: 잘 지정된, 새로운, 비싼 코드는 작동하지 않을 수 있지만 오래되거나, 해독하기 어렵거나, 심지어 테스트되지 않은 코드들은 작동합니다. 여기서 나는 고객의 문제를 해결하는 것이 기본적인 알고리즘/디자인을 구현하는 것이 아닌 일을 한다는 의미입니다. 보통 디자인을 혼란스럽게 만들고 코드를 읽기 어렵게하는 모든 세부, 특별한 경우 및 예외사항을 다루는 작업입니다. 그렇지만 그것이 필요하고 그것이 비용이 많이 들죠. 텍스트 편집기를 인턴이 만들게 한다면 그게 됩니다. 모든 사용자의 모든 기능을 지원하고 모든 형식과 작업하는 워드를 만든다면 그것은 수십억 유로가 드는 일입니다.
- 작성된 모든 코드, 심지어 테스트 및 완벽히 디자인된 코드도 부채입니다. 소프트웨어의 복잡성은 코드의 크기에 지수적으로 증가합니다. 각 기능을 개발하고 유지하는 데 비용이 들죠, 사용되지 않아도. 불필요한 코드는 작성하지 말고, 더 이상 필요하지 않은 기능을 제거하고 가능한 한 최소한의 코드를 작성하세요. 그 페어는 구현하는 기능이 드는 비용보다 훨씬 많이 가져오는 것을 확실하게 하세요.
- 디자인, 선택 사항, 문서 등은 대부분 디자이너의 머리 속에 있습니다. 이 정보는 흔히 완벽하게 전달되지 않습니다. 팀이 완전히 새롭게 구성되면, 신입사원들은 기존 소프트웨어의 디자인과 논리를 제대로 이해하지 못할 수 있고 다르게 작업할 수 있습니다. 이것을 너무 빨리, 너무 자주(프로젝트에서 누가 코딩하는지 변경하는 것) 한 경우에는 너무 많은 다른 시각을 축적하여 여러분의

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

# 스택데믹 🎓

끝까지 읽어 주셔서 감사합니다. 떠나시기 전에:

- 작가를 추천하고 팔로우해 주시면 감사하겠습니다! 👏
- 팔로우하기: X | LinkedIn | YouTube | Discord
- 다른 플랫폼 방문하기: In Plain English | CoFeed | Differ
- 스택데믹닷컴에서 더 많은 콘텐츠를 만나보세요
