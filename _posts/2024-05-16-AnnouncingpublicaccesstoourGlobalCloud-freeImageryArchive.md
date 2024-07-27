---
title: "전세계적으로 공개된 클라우드 없는 이미지 아카이브에 대한 접근이 공개되었습니다"
description: ""
coverImage: "/assets/img/2024-05-16-AnnouncingpublicaccesstoourGlobalCloud-freeImageryArchive_0.png"
date: 2024-05-16 04:20
ogImage: 
  url: /assets/img/2024-05-16-AnnouncingpublicaccesstoourGlobalCloud-freeImageryArchive_0.png
tag: Tech
originalTitle: "Announcing public access to our Global, Cloud-free Imagery Archive"
link: "https://medium.com/earthrisemedia/announcing-public-access-to-our-global-cloud-free-imagery-archive-bb21311abb69"
---


![이미지](/assets/img/2024-05-16-AnnouncingpublicaccesstoourGlobalCloud-freeImageryArchive_0.png)

어제 우리는 Earth Index Alpha를 출시했어요. 오늘, 우리는 우리가 변화하는 환경에 대한 정보에 대한 접근을 민주화하는 우리의 목표로 나아가는 또 다른 큰 발걸음을 발표합니다: 우리 고유의 전 세계적인 클라우드 프리 센티넬-2 데이터셋을 게시했어요. 2023년 동안 집계된 12개의 밴드, 모두 완전한 해상도로 제공되며, 총 33TB 이상의 데이터에요! 그리고 이 데이터셋을 공개하고 쉽게 접근할 수 있도록 만들기 위해 멋진 Source Cooperative팀과 협력했어요.

이 데이터셋을 공유하는 우리의 목표는 분석 프로젝트를 수행할 때 그룹들이 직면하는 일부 기술적, 재정적 장벽을 깨는 데에 도움을 주는 것이에요. 데이터 준비에 소요되는 시간이 줄어들면, 실제 문제 해결에 더 많은 시간을 할애할 수 있어요.

"Source Cooperative를 만들 때의 주요 목표 중 하나는 Earth Genome과 같이 관대한 그룹이 다른 사람들과 자신들의 작업을 공유할 수 있도록 하는 것이에요." 라디언트 어스의 사장인 Jed Sundwall은 말합니다. "이 센티넬-2 데이터셋은 개방된 데이터가 환경 모니터링 및 분석 노력을 집단적으로 가속화할 수 있는 매우 중요한 데이터 제품을 생성하는 방법을 보여주는 예시에요." #



지금 우리 Earth Genome에서는 데이터를 사용합니다 - 정말 많은 양의 데이터 - 그리고 우리가 가장 좋아하는 데이터 소스 중 하나는 Sentinel-2입니다. 해상도가 가장 높지는 않지만, 13개의 밴드는 엄청난 양의 정보를 인코딩하고 다양한 환경 분석을 지원합니다. 실제로 우리는 플라스틱 쓰레기를 특별히 감지하는 데 사용했는데, 이는 고해상도 RBG로는 거의 불가능한 작업입니다. 무엇보다도, 무료로 제공됩니다.

하지만 무료라고 해서 쉽다는 뜻은 아니며, Sentinel-2 데이터를 ML에 사용할 수 있도록 준비하는 것은 오랜 시간이 걸리고 지루한 과정일 수 있습니다. 구름, 그림자, 눈, 나쁜 픽셀을 가리는 작업, 구멍을 채우기 위해 더 많은 데이터 다운로드, 새로운 데이터도 구름이 없는지를 희망하기까지... 이 고통을 우리도 너무 잘 아는 것입니다! Earth Index를 확장해 나갈 때 우리는 거대한 양의 Sentinel-2 데이터를 사전 처리할 빠르고 확장 가능한 솔루션이 필요했습니다. 다행히 AWS가 도와주었고 우리에게 상당한 양의 크레딧을 제공했는데, 이는 Rockefeller Foundation과 Patrick J McGovern Foundation의 기부와 결합하여 현실로 만들어졌습니다!

우리는 Earth Search STAC를 활용하여 AWS에 호스팅된 Sentinel L2A 데이터를 찾았습니다. 각 Sentinel 2 그리드 셀(예: UTM/MGRS 셀)마다 16개의 최상의 씬을 선택하고 각 밴드(제공된 RGB 합성 포함)를 다운로드했습니다. 이로써 총 224개의 파일이 되었습니다. 그런 다음 제공된 Scene Classification Map을 사용하여 이미지를 마스킹하고 쌓아 올렸으며 각 밴드의 각 픽셀에서 중앙 픽셀 값을 선택했습니다. 결과 파일은 웹 Mercator로 재투영되고 웹 소비에 최적화되도록 COG로 변환되었으며, 우리 자체 STAC에 등록되어 Source Cooperative에 업로드되었습니다.

이 모든 과정은 AWS Batch에서 21,000개 이상의 작업으로 실행되었으며 시간당 수백 개의 인스턴스를 사용하여 원본 데이터의 반 페타바이트 이상을 처리했습니다.




![Image 1](/assets/img/2024-05-16-AnnouncingpublicaccesstoourGlobalCloud-freeImageryArchive_1.png)

![Image 2](/assets/img/2024-05-16-AnnouncingpublicaccesstoourGlobalCloud-freeImageryArchive_2.png)

![Image 3](/assets/img/2024-05-16-AnnouncingpublicaccesstoourGlobalCloud-freeImageryArchive_3.png)

![Image 4](/assets/img/2024-05-16-AnnouncingpublicaccesstoourGlobalCloud-freeImageryArchive_4.png)





![이미지](/assets/img/2024-05-16-AnnouncingpublicaccesstoourGlobalCloud-freeImageryArchive_5.png)

물론 아무 것도 완벽하지 않죠. 앞으로 몇 주 동안 실패한 지역을 재처리하고, 흐린 지역이나 눈으로 덮인 장면이 나타나는 곳을 조사할 예정입니다.

모든 장면 및 관련 자산은 저희 STAC 엔드포인트 및 해당 STAC 브라우저(문자열 처리에 어려움을 겪는 사용자를 위한)를 통해 찾을 수 있습니다. 일반적인 메타데이터가 제공됩니다. 또한 자산의 출처 장면(즉, 어떤 소스 장면이 기여했는지) 및 좋은 픽셀의 대략적인 비율에 대한 정보도 포함됩니다. 자산 자체는 Create Commons 4.0 라이선스에 따라 사용이 허가된 Source Cooperative를 통해 미국 서부 지역의 HTTPS 및 AWS S3를 통해 공개적으로 제공됩니다.

계속해서 더 많은 정보를 제공할 예정입니다...


적극적으로 협력하기를 기대합니다! 😊



이 데이터셋에 대한 최초의 데이터 릴리스 중 하나입니다. 누락된 또는 가려진 장면을 재처리할 뿐만 아니라, 앞으로 몇 주 안에 선택한 위치에 추가 연도의 데이터를 게시할 계획이 있습니다. 그리고 연말까지 2021년과 2022년에 대한 글로벌 데이터도 공개할 예정입니다!

이 데이터를 어떻게 활용할 건가요? 머신 러닝? NDVI? 베이스 맵? 어떤 문제를 해결하고자 하는지 알려주세요!