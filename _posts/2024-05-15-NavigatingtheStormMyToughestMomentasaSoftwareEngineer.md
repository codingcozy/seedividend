---
title: "폭풍 속을 네비게이팅하며 소프트웨어 엔지니어로서 가장 어려웠던 순간"
description: ""
coverImage: "/assets/img/2024-05-15-NavigatingtheStormMyToughestMomentasaSoftwareEngineer_0.png"
date: 2024-05-15 15:46
ogImage: 
  url: /assets/img/2024-05-15-NavigatingtheStormMyToughestMomentasaSoftwareEngineer_0.png
tag: Tech
originalTitle: "Navigating the Storm: My Toughest Moment as a Software Engineer"
link: "https://medium.com/gitconnected/my-biggest-challenges-as-a-software-engineer-168ab993e036"
isUpdated: true
---




## 소프트웨어 엔지니어링, 성장

![Image](/assets/img/2024-05-15-NavigatingtheStormMyToughestMomentasaSoftwareEngineer_0.png)

작년, 소프트웨어 아키텍처에 관한 에버하르트 볼프의 팟캐스트에서 특별한 기회를 가졌습니다.

최근에 에버하르트가 다시 초대해 "일로서의 소프트웨어 아키텍처"에 대해 깊이 탐구하는 시간을 가졌는데, 12가지 생각할 거리 질문에 대답을 해야했습니다. 그중 한 질문이 돋보여 제가 잠시 망설이게 했습니다:



이제, 내가 경력 동안 많은 힘든 시간과 좋지 않은 순간들을 겪었다는 것을 알려줄게. 그것은 우리 모두가 경험하는 일이야. 하지만 젊은 전문가들이 다음과 같은 친절한 말로 나에게 다가오면:

- "당신으로부터 배우고 싶어요,"
- "멘토가 되어주세요?"
- 또는 "당신은 소프트웨어 산업에서 귀중한 자산이에요,"

내가 종종 마음속으로 생각한다. "그들이 내가 겪은 모든 좌절과 실패에 대해 알고 있다면 참 좋겠다." 그들은 내가 몇 번이나 직장을 해고당했는지 알아주겠는가? 아마 그렇지 않을 거야.

내 불행했던 전문가 경험 중에서, 에버하르트의 질문에 대답하기 위해 가장 나쁜 순간을 선택해야 했어. 처음에는 간단한 대답이 될 거라고 생각했던 것이 기사로 공유할 만한 내러티브가 되었거든.



그래서, 자리를 잡고 함께해요.

# 초기 어려움

많은 사람과 마찬가지로, 제 직업 시작은 가파른 학습 곡선과 사기 신드롬의 변화로 가득했습니다. 평범할 수 있지만, 이러한 어려움은 각 개인마다 고유하며 자신의 자신감, 단호함, 취약성 및 커뮤니케이션 기술 수준에 의해 형성됩니다.

독일로 이사를 가서 새로운 언어로 일하다보니 고유한 어려움이 있었습니다. 내 능숙도 부족으로 소통 문제가 생기고, 그 당시에는 소프트 스킬이 미숙해서 더 어려웠죠.



하지만, 가장 힘든 전문적 순간은 아직 오지 않았어요.

# 가장 어려웠던 순간

수천 명의 사용자와 약 5,000 QPS(초당 쿼리 수)를 처리하는 시스템에서 AWS DevOps 개발자로 첫 직장을 시작했을 때가 제 경력 중 가장 어려운 시기로 기억됩니다. 그 당시에는 AWS에 대한 경험이 실제보다 이론적인 면이 더 많았고, 파이썬에 대한 배경 지식이 없었습니다.

갑자기 나는 Java와 Python으로 구현된 약 60개의 마이크로서비스가 있는 복잡한 시스템에 던져졌고, Axon Server를 사용한 CQRS와 이벤트 주도 아키텍처를 사용하고 있었습니다.



IaC, Terraform, Fargate, EKS, CloudWatch 및 실시간 지표를 표시하는 대규모 Grafana 대시보드와 같은 용어들에 둘러싸인 새내기 같은 느낌을 받았습니다. 정말 압도되었죠.

그중에서도 가장 어려웠던 점은 무엇일까요?

저는 주니어 개발자가 아니었습니다. 소프트웨어 엔지니어로 10년 이상 경험을 쌓은 저는 기술적 역량에 확신을 갖게 되었고, 종종 동료들에게 조언하고 지도해왔습니다.

제 기술을 자신하며 적극적이고 쉽게 이 복잡한 시스템을 탐험할 수 있기를 기대했지만, 새로운 기술을 습득하는 시간은 주니어 개발자에 비해 제한적이었습니다.



우리 팀은 이미 시스템에 익숙했지만, 나의 직면한 복잡성을 보지 못했습니다. 그 결과로 저의 노고와 성과에 대한 압박이 더욱 심해졌죠.

# 새로운 도구에 압도되다

일반적으로 소스 코드를 검토하고 분석하는 초기 날들을 보내야 할 터였지만, 나는 자주 구글에 다음과 같은 질문을 하게 되었습니다:

- Tasklib은 무엇인가요?
- Terraform은 무엇인가요?
- 인프라스트럭처와 코드란 무엇인가요?
- Axon Server는 무엇이며, 왜 관계형 데이터베이스를 대체할 수 있을까요?
- LocalStack은 무엇인가요?
- Grafana와 CloudWatch가 어떻게 함께 작동할까요?
- 일부 람다 함수가 Python으로 작성된 이유와 다른 함수들이 Java로 작성된 이유는 무엇일까요?
- 람다와 파게이트(Fargate)의 차이점은 무엇이며, 언제 파게이트를 선택하는 것이 더 좋나요?
- Flask는 무엇인가요? 파이썬 앱을 람다에서 Flask로 변경하는 방법은 무엇인가요?
- AWS에서 Flask를 위한 서비스가 있나요?



이 프로젝트 특정 구현에 대한 질문이어야 했던 이 질문들은 도구와 개념 자체에 대한 기본 문의였어요.

# 산업 전문가들의 인사이트

Klotho의 공동 창업자이자 이전 Microsoft 및 Riot 엔지니어인 Ala Shiban과의 대화를 기억했습니다. 그는 현대 클라우드 및 인프라 기술이 FAANG 수준의 기술 전문가를 필요로 한다고 언급했는데, 이는 항상 기능 개발 속도를 높이지는 않는다고 했습니다.

제가 생산적으로 얼마나 오랜 시간이 걸릴지 궁금해서 AWS 인증을 받은 친구에게 연락했어요.



"AWS 자격증 시험을 준비하는 데 얼마나 시간이 걸릴까요? 1주일이면 충분한가요?" 제가 물었습니다.

"1주일?!" 그는 놀라며 대답했습니다.

"아니면 2~3일만에 가능할까요," 제가 농담을 했습니다.

그는 웃으며 "적어도 한 달은 걸릴 것 같아요" 라고 말했습니다.



# 도전에 맞서보기

나의 여정을 되돌아보며, 내 처음의 자신감이 내 역량과 시장 상황에 대한 잘못된 가정에 바탕을 두고 있음을 깨달았다. 기술적 변화의 빠른 속도에 맞추기 위해 필요한 복잡성과 고통을 과소평가했다.

하지만 가치 있는 교훈도 얻었다. 내가 깨우친 것은 심층적인 도메인 지식의 중요성과 지속적인 학습의 필요성이었다. 나는 애플리케이션에 대한 고민을 인프라에 대한 것으로부터 분리하여 개발 프로세스를 간소화하는 Klotho와 같은 도구를 탐색하기 시작했다.

# 앞으로 나아가기



요약하자면, 제가 경험한 최악의 전문적인 순간은 도전으로 가득 찼지만, 결국 그것이 저의 개인적이고 전문적인 성장의 길을 열어 주었습니다.

경력에서 어려운 시기를 겪고 있다면, 이러한 경험들이 더 큰 성공으로 나아가는 발판이 될 수 있다는 것을 기억해 주세요. 도전을 받아들이고 그것으로부터 배우며, 계속 전진해 나가세요.

괴물에 대항하는 법을 배우기 위해 기다리지 말고 이미 앞서서 준비를 하세요. 적극적으로 행동하고 호기심을 가지며 계속해서 발전해 나가세요.

이 이야기가 여러분에게 자신의 도전에 참을성 있게 이겨 나가도록 영감을 주고, 그 동안 배운 교훈의 가치를 인지할 수 있기를 바랍니다.



# 더 알고 싶으세요?

🧠💡 저는 공학, 기술, 리더십에 대해 똑똑하고 호기심 많은 사람들을 위한 커뮤니티에 글을 씁니다. 제 이메일 뉴스레터에 가입하시면 제 비디오 강의에 무료로 액세스할 수 있는 기회를 드립니다 📚.