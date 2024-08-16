---
title: "LinkedIn에서 만난 수상한 블록체인 구직 제안, 어떻게 대처해야 할까"
description: ""
coverImage: "/assets/img/2024-06-22-IEncounteraSuspiciousBlockchainJobOfferfromLinkedIn_0.png"
date: 2024-06-22 02:14
ogImage: 
  url: /assets/img/2024-06-22-IEncounteraSuspiciousBlockchainJobOfferfromLinkedIn_0.png
tag: Tech
originalTitle: "I Encounter a Suspicious Blockchain Job Offer from LinkedIn"
link: "https://medium.com/@cauta/i-encounter-a-suspicious-blockchain-job-offer-from-linkedin-2cb172d9a454"
isUpdated: true
---





<img src="/assets/img/2024-06-22-IEncounteraSuspiciousBlockchainJobOfferfromLinkedIn_0.png" />

몇 일 전에 한 사람이 블록체인 관련 직업으로 나에게 LinkedIn을 통해 연락했어. 그는 내 GitHub 계정을 공유해달라고 하고 나에게 그의 프로젝트를 실행하여 해결책을 확인하라고 했지.

초대장을 받자, 리포지토리가 포크되거나 Codespaces에서 사용되지 않는 걸 깨달았어. 그래도 처음에는 그렇게 심각하게 생각 안 했어. 노트북이 많이 무겁고, 더 이상 불필요한 프로젝트를 설치하고 싶지 않았기 때문에, 결국 Hostinger의 작은 개발 서버에서 실행하기로 결정했어.

코드를 실행하고 결과를 그에게 보냈어. 그는 몇 가지 오류를 지적하고, 특히 node_modules를 설치하기 위해 다음을 강조한 지침을 공유했어.

<div class="content-ad"></div>


# 노드 버전 16.20.0이 필요합니다.
npm i --force
npm start


--force 플래그는 레지스트리에서 강제로 설치하여 기존 종속성을 제거하고 새로운 종속성을 설치합니다. 그는 "적절한" 종속성이 설치되었는지 확인하기 위해 현재 node_modules 폴더를 지우고 다시 설치하라고 지시했습니다. 물론 나는 의심 없이 그의 지시에 따랐어요.

업데이트된 결과물을 보내자, 그는 VPN, VPS 또는 WSL을 사용했는지 물어보았습니다. 나는 VPN과 VPS를 둘 다 사용했다고 확인했습니다. 그러자, 그는 미안하다며 그의 프로젝트는 VPN을 지원하지 않고 로컬 설치를 요구한다고 말했습니다. 그 순간부터 조금 수상한 것을 느끼기 시작했습니다. 결과가 명확했고 오류도 없었는데 문제가 무엇인지 물어보았습니다. 그는 API가 잘 작동하지 않았다고 주장했습니다.

VPN이 문제가 아니라고 말했는데, 나는 자체 서버에서 실행하고 있고 VPN을 끄어도 아무 영향도 없다고 말했습니다. 그는 그 후 내 OS에 대해 물었고, 나는 Ubuntu를 사용한다고 대답했습니다. 그에게서는 그의 개발팀 문화가 Mac 또는 Windows를 선호하며 개발할 때 VPN을 사용하지 않는다고 응답했습니다 (흠?). 


<div class="content-ad"></div>

내가 그에게 말했어, "당신의 프로젝트에 대해 더 많은 세부 정보를 가지게 되면 내 로컬 맥북을 사용해서 개발할 거야." 그는 팀 문화 때문에 곧잘 고치길 바란다며 내게 말했어. 난 당신이 이해하길 바랐지만

나는 대답했어, "프로젝트를 이해하고 뭘 업그레이드할지 더 자세히 말해주시면 당신의 요구 사항에 적응할게요. 지금은 테스트를 위해 배포만 했습니다."

그는 괜찮다고 하고 작업 목록을 공유하기 시작했고 예산을 세팅해달라고 했어. 난 주변을 확인하고 나중에 알려줄 거라고 했어.

하루가 지나 그가 다시 나에게 연락해 일이 어떻게 되고 있는지 물었어. 나는 사과하고 그의 요구 사항에 대한 타임라인, 다른 개발자, 그리고 이 프로젝트의 급여에 대해 물었어. 그는 매달 5천-1만 달러를 제안했어.

<div class="content-ad"></div>

깃허브를 다시 확인하기로 결정했는데, 레포에서 제 이름이 지워져 있었어요. 그래서 다시 초대장을 받도록 요청했어요. 새 초대장을 받고 보니 레포가 단 3시간 전에 만들어진 것을 알게 됐어요. 이제 제 의심은 90%까지 올랐어요.

그래도 계속 대화를 이어가기 위해 몇 가지 조건을 제안했어요. 그 모든 것에 동의를 해주었어요. 심지어 첫 달에 $9,000을 요청했을 때도요.

그 동안 다른 격리된 개발 환경을 설정하여 레포를 파헤치기 시작할 수 있도록 했어요. 하루를 들여서 조사를 시작했지만 아무 것도 찾지 못해서 그만두고 제 사업으로 돌아갔어요.

며칠 후, 클라우드 제공업체로부터 서버에 악성 소프트웨어가 발견되었음을 알리는 이메일을 받았어요. 이후 2시간 후, 서버가 리소스 한도를 초과하여 남용으로 중단되었음을 알리는 다른 이메일을 받았어요. 서버를 다시 활성화하기 위해 제공업체에 연락해야 했어요.

<div class="content-ad"></div>

<img src="/assets/img/2024-06-22-IEncounteraSuspiciousBlockchainJobOfferfromLinkedIn_1.png" />

# 의심스러운 조직 제안과 배운 점

처음부터 발견한 몇 가지 의심스러운 점은 다음과 같습니다:

- GitHub 레포지토리가 포킹되거나 Codespaces에서 사용되지 않았습니다.
- 레포지토리는 최신의 최소한의 커밋으로 새롭게 만들어졌습니다.
- 로컬 종속성 대신 종속성을 강제로 설치하는 것이 필요했습니다.
- 팀 및 프로젝트에 대한 의심스러운 정보가 있었습니다.
- 다양한 조건이 포함된 높은 제안이 있었습니다.

<div class="content-ad"></div>

마침내, 이 경험을 공유하여 다른 사람들에게 새로운 공격 벡터에 대해 알리고 싶어요. 다른 개발자들과 공유해주세요.

그리고 모르는 것을 실행하지 말라는 경고를 꼭 기억해주세요!

관련해서 유용한 기사를 찾아보았습니다:

블록체인 활동을 모니터링하기 위한 도구를 개발했는데, 이는 여기에서 확인할 수 있어요: [https://www.crypitor.com/](https://www.crypitor.com/)

<div class="content-ad"></div>

이 프로젝트는 오픈소스입니다. https://github.com/crypitor/blockchain-webhook

테스트, 피드백 및 생각을 공유해주시면 감사하겠습니다!