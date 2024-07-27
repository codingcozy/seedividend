---
title: "Polars V10 출시 소식 놓치지 마세요"
description: ""
coverImage: "/TIL/assets/no-image.jpg"
date: 2024-07-12 20:43
ogImage: 
  url: /TIL/assets/no-image.jpg
tag: Tech
originalTitle: "Polars V1.0 released"
link: "https://medium.com/@thomas_reid/polars-v1-0-released-1833c8ab79c9"
---


Polars, 현대적인 Python DataFrame 라이브러리를 개발한 분들께 축하드립니다! 최근에 제품의 1.0 버전을 출시했군요. 이 릴리스로 Polars는 이제 공식적으로 프로덕션에 준비되었으며 시스템 전반에 자유롭게 사용할 수 있습니다.

릴리스를 발표한 블로그 포스트에서 Polars 팀은 앞으로의 로드맵에 대한 몇 가지 힌트를 주었습니다.

## 스트리밍 엔진 재디자인

이 혁신적인 디자인은 morsel-driven 병렬성을 Rust의 비동기 상태 머신과 융합하여 하이브리드 푸시/풀 엔진을 만들었습니다. 이 엔진은 morsel-driven 병렬성의 캐시 지역성, 병렬성 및 NUMA 인식을 활용하면서, 유연한 연산자 디자인을 사용하여 러스트로 관리되는 상태 머신으로 컴파일되어 복잡성을 관리합니다.

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

스트리밍은 많은 작업 부하에 대해 매우 빠르고 메모리를 효율적으로 사용하지만 특정 시계열 작업에 대해 최적으로 작동하지 않을 수 있습니다. 롤링 윈도우 및 윈도우 함수와 같은 작업은 스트리밍 중에 동기화가 더 많이 필요하며 그에 비해 메모리에서 실행할 때보다 더 많은 동기화가 필요합니다. 이러한 함수의 경우, Polars는 모든 작업 부하에 최적의 성능을 보장하기 위해 그것의 메모리 엔진으로 되돌아갑니다.

## NVIDIA RAPIDS를 사용한 GPU 가속화

또 다른 흥미로운 발전은 Polars에 GPU 가속화를 추가한 것입니다. 이 분야에서 상당한 진전이 이루어지고 이미 Polars 테스트 스위트의 상당 부분이 GPU에서 실행됩니다. GPU 가속화를 Polars 옵티마이저와 결합하면 최적의 성능과 GPU에 대한 메모리 압력이 줄어듭니다. GPU는 병렬성을 처리하고 옵티마이저는 실행되는 최소한의 작업량을 보장합니다.

## Polars 클라우드

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

Polars Cloud를 사용하면 조직이 Polars를 호스팅하고 확장하는 복잡성을 줄일 수 있는 관리 서비스를 제공하는 것을 목표로 합니다. Polars Cloud의 개발은 꾸준히 진행 중이며, 올해 초기 베타 테스트를 시작할 준비가 되어 있습니다. Polars Cloud의 많은 요구 사항은 오픈 소스 프로젝트의 개선으로 직접 이어지고 있습니다. 예를 들어, 새로운 1.0 릴리스는 하이브 파티션 데이터셋의 스캔을 지원하고 클라우드 파일 캐싱 및 다양한 형식에 대한 클라우드 지원 확장을 가져 왔습니다. 우리는 관리 서비스에서 Polars 오픈 소스 엔진을 사용하여 개선 사항이 Polars Cloud 사용자뿐만 아니라 오픈 소스 사용자에게도 이점을 제공하도록 하겠습니다.

## 다른 주목할 만한 목표

단기 로드맵에 포함된 다른 계획에는 right joins, non-equi joins, 확장된 메타데이터 지원, 조인 재정렬 최적화, 그리고 확장된 SQL 지원이 포함되어 있습니다.

Polars의 미래 방향에 관심이 많습니다. 함께 많은 일을 이루어나갈 Polars 팀을 기대하고 있어요.

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

Polars에 대해 더 자세히 알고 싶다면, 그들의 웹사이트를 확인해보세요.

만약 이 콘텐츠가 마음에 들었다면, 여기에 다른 관련 기사들이 있습니다. 함께 읽어보세요.