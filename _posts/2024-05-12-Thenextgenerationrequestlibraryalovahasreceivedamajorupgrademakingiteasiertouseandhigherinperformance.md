---
title: "다음 세대 요청 라이브러리 알로바가 주요 업그레이드를 받았습니다 이제 더 사용하기 쉽고 높은 성능을 자랑합니다"
description: ""
coverImage: "/assets/img/2024-05-12-Thenextgenerationrequestlibraryalovahasreceivedamajorupgrademakingiteasiertouseandhigherinperformance_0.png"
date: 2024-05-12 21:24
ogImage: 
  url: /assets/img/2024-05-12-Thenextgenerationrequestlibraryalovahasreceivedamajorupgrademakingiteasiertouseandhigherinperformance_0.png
tag: Tech
originalTitle: "The next generation request library alova has received a major upgrade, making it easier to use and higher in performance."
link: "https://medium.com/@huzhen555/the-next-generation-request-library-alova-has-received-a-major-upgrade-making-it-easier-to-use-and-38f951a265a8"
isUpdated: true
---




<img src="/assets/img/2024-05-12-Thenextgenerationrequestlibraryalovahasreceivedamajorupgrademakingiteasiertouseandhigherinperformance_0.png" />

안녕하세요!

아마도 alova라는 경량 요청 라이브러리를 들어보았을지도 모릅니다. 이 라이브러리는 개발자들의 에너지와 시간을 절약하면서 저렴한 비용으로 복잡한 데이터 요청을 구현하는 데 도와줄 수 있습니다.

alova에 대해 더 알아보고 싶다면 공식 웹사이트를 방문해보세요. 거기에서 더 자세한 문서와 샘플 코드를 찾아볼 수 있어서 이 도구를 더 잘 이해하고 활용하는 데 도움이 될 것입니다.



aloval2.0가 출시된 지 1년이 되었습니다. 이 기간 동안 많은 칭찬을 받았습니다. 물론, 개선을 위한 많은 피드백도 받았고, 이를 통해 alova는 계속 성장하고 발전해왔습니다. alova에 기여해 주신 모든 분들께 감사드리며, 동시에 디자인상의 많은 중복과 결함을 인지하고 있습니다.

이제 더 나은 서비스를 위해 3.0으로 업그레이드할 때입니다. 이 업그레이드의 목적은 주로 다음 목표에 집중합니다:

- alova 구조 조정 및 응용 범위 확대
- 사용 방법을 간소화하고 불필요한 API를 폐기하며 결함 있는 디자인을 조정
- 일부 모듈을 재설계하여 성능을 개선

구체적인 3.0 조정을 살펴보기 전에 alova가 무엇을 할 계획인지, 어디로 향하고 있는지 다시 살펴볼까요?



# 네트워크 요청의 고통 요소들

다수의 사람이 협업하는 기업급 프로젝트에서 클라이언트-서버 상호작용 비용이 비교적 높습니다.

![이미지](/assets/img/2024-05-12-Thenextgenerationrequestlibraryalovahasreceivedamajorupgrademakingiteasiertouseandhigherinperformance_1.png)

- 프론트엔드 및 백엔드 협업 비용이 높음:
- 백엔드 알림에 따라: API 업데이트는 백엔드로부터 활성 알림이 필요합니다.
- API 문서 의존: 프론트엔드는 정보를 얻기 위해 API 문서를 참고해야 합니다.
- API 코드 작성: 프론트엔드는 API 문서에 따라 인터페이스 코드를 수동으로 작성해야 합니다.
- 응답 데이터 유형 부재: API 응답 데이터에 기본적으로 유형 힌트가 없어 데이터 사용 비용이 증가합니다.
- 버그 발생률 증가: API 변경으로 프로젝트의 버그 발생률이 증가할 수 있습니다.
- 복잡한 데이터 상호작용 로직: 프론트엔드 요청이 종종 간단하지 않습니다. 프로젝트의 성능 및 개선에 대비하여 다양한 시나리오에 따라 요청을 보낼 때, 보내지 말아야 할 때, 응답 데이터 처리 방법 등을 고려해야 합니다. 이는 개발 시간 비용 및 코드 유지 보수 비용이 증가하게 됩니다.



# 해결책

![image](/assets/img/2024-05-12-Thenextgenerationrequestlibraryalovahasreceivedamajorupgrademakingiteasiertouseandhigherinperformance_2.png)

- IDE 플러그인 (vscode/webStorm): 프런트엔드와 백엔드의 협업 문제 해결 (구체적인 해결책은 아래 Feishu 문서에서 확인 가능)
- 요청 코드와 응답 데이터 유형을 자동으로 생성
- API 문서를 코드에 내장하여 코드에서 API 인터페이스를 직접 조회 및 삽입 가능
- 주기적으로 API 정보 업데이트 및 프런트엔드 개발에 알림 제공
- 인터페이스 업데이트 기록을 유지하여 변경으로 인한 버그 예방
- 요청 전략: 해당 요청 전략 선택 및 한 줄의 코드로 복잡한 데이터 상호 작용 로직 구현

# alova 목표



작은 문제를 요청하는 데 시간을 낭비하지 마세요. alova에 맡기세요. 요청 작업 대부분을 처리해 줄 거예요. 필요한 건 사용할 API와 요청을 실행할 전략을 명시하는 것뿐이에요.

# alova@3.0 업데이트 계획

# 릴리스 노트

구체적인 업데이트 내용, 진행 상황, IDE 플러그인 디자인은 alova 제품 백서와 3.0 업데이트 개요에서 확인할 수 있어요.



- 디스코드 커뮤니티에 가입하여 소통에 참여해보세요

# 핵심 파트너를 찾아요

alovajs는 현재 일정한 타당성 검증을 이룩했습니다. 개발 속도를 높이기 위해 alovajs에 동의하는 두 명의 친구를 핵심 팀에 초대하는 것이 필요합니다 (한 명은 이미 확인됨). 이들은 alovajs의 핵심 업무를 담당하게 됩니다. 이로써 엄청난 혜택을 받을 수도 있습니다. 더 알고 싶은 친구들은 핵심 구성원이 되어보기를 참고하세요.