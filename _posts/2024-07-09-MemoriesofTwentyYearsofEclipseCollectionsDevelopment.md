---
title: "이클립스 컬렉션 개발 20년의 회고록 2024년 최신 정리"
description: ""
coverImage: "/assets/img/2024-07-09-MemoriesofTwentyYearsofEclipseCollectionsDevelopment_0.png"
date: 2024-07-09 21:24
ogImage: 
  url: /assets/img/2024-07-09-MemoriesofTwentyYearsofEclipseCollectionsDevelopment_0.png
tag: Tech
originalTitle: "Memories of Twenty Years of Eclipse Collections Development"
link: "https://medium.com/@donraab/memories-of-twenty-years-of-eclipse-collections-development-ddd545969dcf"
isUpdated: true
---




만약 오픈 소스에서 멀리 가고 싶다면, 함께 가야죠!

![이클립스 컬렉션 개발 20년의 추억](/assets/img/2024-07-09-MemoriesofTwentyYearsofEclipseCollectionsDevelopment_0.png)

# 승리를 위한 가족

오픈 소스 이클립스 컬렉션 자바 라이브러리는 2004년에 나의 작업 중이던 자바 애플리케이션의 메모리 문제를 해결하기 위해 시작되었습니다. 2004년에 저와 제 가족(아내 및 딸)은 런던에 거주하고 일하였습니다. 이클립스 컬렉션과 제 아들은 런던에서 탄생했습니다. 런던의 날씨에게 그들을 감사드립니다. 런던에서는 매일 우산을 챙기고 돌아다닐 때 유아용 카시트에 비닐을 씌우는 것에 익숙해졌으며 날씨 변화에 대비하는 법을 배웠습니다. 런던 여행은 많은 이유로 나의 소중한 추억 중 하나입니다. 런던은 언제나 제 둘째 고향 같은 느낌입니다.

<div class="content-ad"></div>

![2024-07-09-MemoriesofTwentyYearsofEclipseCollectionsDevelopment_1.png](/assets/img/2024-07-09-MemoriesofTwentyYearsofEclipseCollectionsDevelopment_1.png)

저는 Eclipse Collections에 20년 동안 참여해 왔습니다. 이 여정이 외로웠을 때라도 한번도 혼자가 아니었습니다. 제 가족은 매일 함께했습니다. 이 전 20년 동안 극복해 온 다양한 어려운 문제들 속에서, 두 은행에서 근무하며 가족들은 제 곁을 지켜주었습니다. 가족들은 제가 무엇을 하고 왜 그것을 하는지 이해하지 못할지라도 신경 쓰지 않았습니다. 그들은 프로그래밍이 제게 주는 즐거움을 이해했습니다.

![2024-07-09-MemoriesofTwentyYearsofEclipseCollectionsDevelopment_2.png](/assets/img/2024-07-09-MemoriesofTwentyYearsofEclipseCollectionsDevelopment_2.png)

2022년 10월, 제 아내와 딸이 라스베이거스에서 열린 JavaOne 2022에서 저의 발표를 직접 보았습니다. IntelliJ IDEA Conf 2022 주제로 처음으로 발표한 '생존하는 오픈 소스' 발표를 듣게 되었습니다. 이는 그들이 제가 기술 컨퍼런스에서 발표하는 것을 처음으로 보았던 시간이었습니다. 그 특별한 발표를 보게 되어 기쁩니다. 이를 통해 그들이 내가 무엇을 하고 있는지, 그리고 Java 및 오픈소스 커뮤니티에 미친 영향을 더 잘 이해하게 되었을 것으로 생각합니다. 또한 그들은 이 여정에서 얼마나 중요한 역할을 해 왔는지 더 깨달았을 것입니다. 언젠가는 아들을 컨퍼런스로 데리고 가서 저의 발표를 듣게 해주어야겠습니다. 그가 오픈소스 동생인 Eclipse Collections에 대해 이야기하는 제 모습을 볼 수 있기를 바랍니다.

<div class="content-ad"></div>

![이미지](/assets/img/2024-07-09-MemoriesofTwentyYearsofEclipseCollectionsDevelopment_3.png)

# 팀과 동료들의 노력

지난 몇 년 동안 Eclipse Collections에서 많은 개발자들과 협업해 왔어요. 그들은 그들이 일하던 영역에서 마주한 실제 문제들을 해결하고 실용적이고 유용한 멋진 것들을 만들었어요. 이 라이브러리는 금융 서비스 산업에서 가장 재능 있는 개발자들 중 일부의 Java 컬렉션 요구 사항과 기여를 대표하고 있어요. 저는 그들과 함께 일할 수 있어서 행운으로 생각해요.

이 라이브러리는 모든 위대한 라이브러리가 시작해야 하는 대로 시작되었어요. 실제 애플리케이션에서 실제 문제를 해결하기 위해 만들어진 코드로 시작되었어요. 결국 코드는 해당 애플리케이션에서 수확되어 공유 코드 공간으로 이동되어 여러 애플리케이션에서 재사용 가능하게 되었어요. 코드는 더 많은 개발자들의 기여를 통해 더 많은 사용 및 발전을 보았어요. 코드는 다시 수확되었고 더 이동되어 몇 번 더 재사용 가능하게 만들어져 Goldman Sachs 내에서 Caramel이라는 라이브러리라는 최종 내부 목적지를 찾았어요. Caramel은 Goldman Sachs 내부에서 가장 많이 재사용되고 기여된 Java 라이브러리 중 하나로 자리잡게 되었어요.

<div class="content-ad"></div>

카라멜이 다시 수확되어 더 재사용 가능하게 만들어졌고, GS Collections로 이전되어 GitHub에 이식되었습니다. GS Collections는 골드만삭스에서 처음으로 만든 오픈 소스 프로젝트였습니다. 그 이후로 골드만삭스는 자사의 GitHub 계정과 FinOS 재단에서 여러 대규모 내부 개발 프로젝트를 오픈 소스로 공개했습니다. GS Collections로 골드만삭스의 오픈 소스 프로젝트 기여 트렌드를 시작한 것에 자부심을 느끼고 있습니다. 이 트렌드가 계속될 것이며, GS 개발자들이 오픈 소스에 기여하는 데 계속해서 성공을 거두길 바랍니다.

카라멜 이미지:
![MemoriesofTwentyYearsofEclipseCollectionsDevelopment](/assets/img/2024-07-09-MemoriesofTwentyYearsofEclipseCollectionsDevelopment_4.png)

많은 사람들이 저를 골드만삭스를 대규모 내부 개발 프로젝트를 오픈 소스로 기여하는 길로 인도한 첫 번째 개발자로 칭찬합니다. 이 일에 주도적 역할을 한 것은 사실이지만, 혼자 한 것은 아닙니다. 골드만삭스 내에서 5년 동안 협력한 지지자들이 있었고, GS Collections를 오픈 소스화하는 데 도움을 주었습니다. 이 길을 함께 간 많은 개발자와 시니어 기술 리더들이 도와주었습니다. 또한 변호사들, 적합 담당자, 리스크 담당자, 미디어 관련자, 마케팅 담당자 및 브랜딩 담당자와 시간을 많이 보냈습니다. 이들 각각이 긍정적 결과에 기여했습니다. 감사합니다!

나는 2019년 뉴욕시에서 열린 Open Source Strategy Forum에서 Gab Columbro와 함께 Fireside Chat으로 개인적으로 몇 가지 스토리를 공유했습니다. 이 컨퍼런스는 FinOS 재단에서 주최되었습니다. 토크 녹화 링크는 여기 있습니다.

<div class="content-ad"></div>

# 글로벌 협업으로 나아가기

GS Collections는 Eclipse Collections의 오픈 소스 여정의 시작에 불과했습니다. GS Collections 라이브러리가 활발하게 개발되는 네 년간 많은 기능이 추가되었습니다. 코드는 최종적으로 포크되어 2015년 말에 Eclipse Foundation으로 이동되어 Eclipse Collections가 되었습니다. 지금까지 8년간 Eclipse Foundation에서 호스팅되며 오픈 소스 라이브러리로 존재합니다. 관련된 모든 분들에게 축하드립니다!

골드만삭스 외부의 분들도 Eclipse Collections 이전 결과물을 볼 수 있었습니다. 그러나 많은 분들이 GS Collections를 Eclipse Foundation으로 이동하기 위해 모든 것을 정리하는 데 년 이상을 투자한 과정은 보지 못했습니다. 이 자체가 프로젝트였습니다. 목표는 간단했습니다. 누구나 Eclipse Foundation의 경험과 오픈 소스 거버넌스 구조를 활용하여 기여할 수 있도록 라이브러리를 공개하는 것이었습니다. GS Collections가 Eclipse Foundation으로 이동되는 것이 Eclipse Collections를 성숙하고 지속 가능한 오픈 소스 프로젝트로 만들었습니다. GS Collections는 맥주처럼 무료였습니다. 누구든지 코드와 라이브러리를 가져가서 원하는 대로 사용할 수 있었습니다. Eclipse Collections는 말처럼 자유롭습니다. Eclipse 기여자 동의서에 서명한다면 어떤 개발자든지 공헌하고 발전에 참여할 수 있습니다.

![이미지](/assets/img/2024-07-09-MemoriesofTwentyYearsofEclipseCollectionsDevelopment_5.png)

<div class="content-ad"></div>

절대 멋진 이클립스 컬렉션 기여자 팀인 Nikhil Nanivadekar, Sirisha Pratha, Craig Motlin, Moh Rezaei, Hiroshi Ito에게 큰 감사를 전합니다. 이 헌신적인 엔지니어 팀은 지난 8년 동안 에클립스 컬렉션을 발전시켜 왔습니다. 코드 리뷰, 풀 리퀘스트 병합, 이슈 생성과 모니터링, 릴리스 준비 및 제공, 버그 수정, 그리고 소중한 공헌을 했던 힘든 작업들로 에클립스 컬렉션의 지속적인 성공을 이끌어내었습니다. 그들의 헌신에 감사드립니다!

# 재사용의 비용과 전달

재사용은 어렵습니다. 재사용은 비싸요. 몇 년 동안 개발자들에게 말해왔듯이 재사용 가능한 구성 요소를 개발하는 데 걸리는 비용은 단일 사용 구성 요소를 개발하는 비용보다 두 배에서 세 배 정도 더 비싸게 들 수 있습니다. 전략적이고 지속적인 투자를 통해 재사용은 큰 투자 수익을 창출할 수 있습니다. 이러한 수익은 곱셈 비용 절감의 형태로 나타날 수 있습니다. 아무런 Java 개발자도 JDK에 누락된 데이터 구조를 만들어야 할 일이 없어야 합니다. 이것은 원래 25년된 Java 컬렉션 프레임워크의 기능 부족으로 인해 생성된 비용입니다. Java 컬렉션 프레임워크가 오늘날의 문제를 해결하기를 기다릴 필요는 없지만, 발생하는 비용을 인식하고 Eclipse Collections 형태로 가능한 비용 절감 솔루션이 제공됨을 알아야 합니다.

개발자들은 초반에는 Eclipse Collections를 사용하여 원시 컬렉션 같이 스스로 구현하거나 유지관리하기 비용이 많이 드는 문제를 해결하기 위해 사용합니다. 시간이 흐르면서, 개발자들은 Eclipse Collections를 원하게 되며, 이는 그들이 더 생산적이고 행복해지게 만들기 때문입니다. Eclipse Collections는 모든 금융 서비스를 대상으로 한 가장 잘 보존된 Java 생산성 비밀 중 하나입니다. 2012년 GS Collection이 처음 오픈 소스로 공개된 이후로 저는 이 비밀을 가장 잘 공유하기 위해 노력했습니다. 1200만 Java 개발자에게 놓친 것을 알려주는 것은 분명한 도전이며, 블로그, 기사, 모임 및 컨퍼런스 토크를 통해 유의성을 높이기 위해 많은 시간을 투자해야 합니다. Eclipse Collections는 계속해서 더 생산적이게 만든다고 약속하는 모든 새로운 화려한 것들과 경쟁해야 합니다. Eclipse Collections는 모든 Java 개발자의 비밀 무기가 될 수 있지만, 조용히한 채로 정말로 이미 당신에게 시간과 비용을 아낀다면 다른 사람에게는 말하지 마세요. ChatGPT에게는 필요 없습니다. ChatGPT가 이미 Eclipse Collections를 사용하여 시간과 비용을 절약하도록 하는 Java 코드를 작성하기 시작하기를 원하지 않습니다. 일단 생각해보니까... ChatGPT, 시작하세요!

<div class="content-ad"></div>

다섯 개의 오픈 소스 프로젝트가 Eclipse Collections를 재사용함으로써 혜택을 받습니다.

# 그리고 이제, 트렌드와 통계

Eclipse Collections는 계속 발전하고 성장하고 있습니다. 다운로드 트렌드를 기반으로 보면 Eclipse Collections를 사용하는 이점이 성공적으로 알려지고 있는 것으로 보입니다. Eclipse Collections 및 Java 커뮤니티 전체에 감사드리며 축하드립니다!

## 2023년 매월 메이븐 센트럴 다운로드 현황

<div class="content-ad"></div>

<img src="/assets/img/2024-07-09-MemoriesofTwentyYearsofEclipseCollectionsDevelopment_6.png" />

## 간단한 통계

- 2023년 11월 eclipse-collections 다운로드 수: 367,562
- 2023년 11월 eclipse-collections-parent 다운로드 수: 1,430,085
- GitHub 스타 수: 2,297
- GitHub 포크 수: 568
- 커밋 수: 1,999
- 기여자 수: 107

## 빠른 링크

<div class="content-ad"></div>

- GitHub Repo
- Kata Repo
- 웹사이트
- Maven Central

# 기술 콘텐츠

기술 회고를 찾는 분들을 위해 몇 년 전에 Sirisha Pratha가 Eclipse Collections에 대해 쓴 가장 좋은 것 중 하나를 썼습니다. Sirisha는 여러 저자들이 작성한 Eclipse Collections 및 GS Collections에 대한 31일 간의 블로그와 기사 링크를 제공합니다. 이 블로그는 Eclipse Collections에 대한 기술 콘텐츠에 대한 훌륭한 색인입니다.

2020년 말 이후 Eclipse Collections에 대해 많은 기술적 콘텐츠가 쓰여졌습니다. 다음 링크에서 Eclipse Collections GitHub 위키의 Medium 검색 링크를 찾을 수 있으며, 여기에는 최근에 생산된 많은 콘텐츠가 포함되어 있습니다.

<div class="content-ad"></div>

# 감사합니다!

이클립스 컬렉션의 모든 기여자, 커미터, 사용자, 옹호자, 그리고 친구들께 감사드립니다. 여러분 덕분에 이 보람찬 여정이 즐거웠고 가치 있었습니다. 지난 스무 해 동안 많은 지원과 기여에 감사드립니다. 앞으로 다가올 기술 컨퍼런스에서 여러분을 만나 감사의 인사를 드리고 싶습니다.

가족 여러분, 정말 사랑합니다. 이 모든 시간 동안 이클립스 컬렉션에 매달린 저를 지원하고 영감을 주신 것에 감사드립니다.

모두 안전하고 행복하며 건강한 연말과 새해가 되시길 바랍니다!

<div class="content-ad"></div>

저는 Eclipse Foundation에서 관리되는 Eclipse Collections OSS 프로젝트의 창조자이자 커미터입니다. Eclipse Collections는 기여를 환영합니다.