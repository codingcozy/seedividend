---
title: "파이썬을 활용한 의료 시설 위치 최적화를 위한 오픈 데이터 주도 방법"
description: ""
coverImage: "/assets/img/2024-06-19-AnOpenData-DrivenApproachtoOptimisingHealthcareFacilityLocationsUsingPython_0.png"
date: 2024-06-19 23:33
ogImage:
  url: /assets/img/2024-06-19-AnOpenData-DrivenApproachtoOptimisingHealthcareFacilityLocationsUsingPython_0.png
tag: Tech
originalTitle: "An Open Data-Driven Approach to Optimising Healthcare Facility Locations Using Python"
link: "https://medium.com/towards-data-science/an-open-data-driven-approach-to-optimising-healthcare-facility-locations-using-python-397b3ce38185"
isUpdated: true
---

![이미지](/assets/img/2024-06-19-AnOpenData-DrivenApproachtoOptimisingHealthcareFacilityLocationsUsingPython_0.png)

이 작업은 조아킴 그로미초 교수님과 카이 카이저와 공동 저술되었습니다. 저자(들)는 모든 오류와 누락에 대해 책임이 있습니다.

건강 시설까지의 이동 시간을 정확하게 산출하는 것은 건강 서비스 접근성을 평가하는 데 기본적입니다, 특히 접근 장애가 공공 건강 결과에 중대한 영향을 미칠 수 있는 지역에서. 이러한 계산은 자원 배분, 건강 서비스 이용, 공평한 의료 접근, 미래 시설을 위한 전략적 계획에 필수적입니다. 그러나 이를 계산하기 위해서는 병원 위치, 인구 분포, 그리고 OpenStreetMaps나 구글 또는 맵박스 같은 API로부터 도로 네트워크 데이터를 기반으로 한 이동 시간 계산을 포함한 많은 데이터 처리가 필요합니다.

지리적 변동성인 지형, 도로 상태 및 기후 등도 이동 시간 계산에 기여합니다. 또한 사용 가능한 교통 수단 및 종류도 건강 시설로의 접근을 제한하며, 많은 시골 지역에서 신뢰할 수 있는 대중교통이나 개인 교통 수단 옵션이 부족합니다. 게다가 모든 병원의 지오코딩 된 데이터의 정확성과 가용성은 개발도상국을 포함한 많은 국가에서 종종 부족하여, 접근에 대한 정확한 추정이 줄어듭니다.

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

# 방법론 및 사용된 데이터

먼저 우리는 우리가 관심을 갖는 지역의 모양 파일(동락레스테의 한 지방인 바우카우 중 하나)을 인도적 데이터 교환소(HDX)에서 다운로드합니다. HDX는 국가별 경계를 포괄하는 표준화된 자료인 Global Database of Political Administrative Boundaries Database 에 액세스할 수 있습니다. 이 데이터는 Open Database License (ODC-ODbL)에 따라 이용할 수 있습니다.

우리는 Meta에서 고해상도 인구 데이터와 이를 결합합니다. 이 데이터는 Creative Commons Attribution International에 따라 라이선스가 부여됩니다.

접근성을 향상시키는 방법을 결정하기 위해 기존 의료 시설 위치(병원과 진료소)로 시작해야 합니다. 이 데이터의 오픈소스 저장소는 OpenStreetMap입니다. 이것은 출발하기에 좋은 곳이지만, 정부나 세계 보건 기구(World Health Organization)와 같은 국제 발전 기구들이 유지하는 공식 의료 시설 등록 정보만큼 포괄적이지 않을 수 있습니다.

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

다음으로 Openrouteservice API와 MapBox Isochrones API를 사용하여 이동 시간을 계산하고 의료 접근성을 평가합니다. Openrouteservice에서 얻은 API 결과는 어떤 맥락에서든 CC-BY 4.0으로 라이선스가 부여됩니다. Isochrone API의 이용 약관에 대한 자세한 내용은 Mapbox 제품 약관을 참조하십시오.

위 정보를 활용하여 기존 시설의 캐치먼트 영역을 분석하여, 의료 보장 범위에 대한 상세한 시각화를 상호작용적인 지도로 만들어 인구의 접근 가능 여부를 식별할 수 있습니다.

마지막으로 최적화 모델을 실행하여 새로운 의료 시설의 잠재적 장소를 식별합니다.

# 인도네시아의 티모르-레슈테의 행정 구역을 인도네시아 지도 데이터 교환에서 추출하고 Python의 Folium을 사용하여 시각화하기

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

다음 코드 스니펫은 GADM (Global Administrative Areas) 데이터에 대한 다운로더를 초기화하며 버전 4.0을 지정합니다. 그런 다음 이 다운로더를 사용하여 티모르-레스테의 관리 경계 데이터를 검색하며 지구상의 첫 번째 관리 수준인 지구나 주를 중점적으로 다룹니다. 지리 공간 데이터를 획득한 후에는 이 스크립트가 Folium 맵 상에 이 경계를 시각화하고, 배경 지도로 OpenStreetMap을 사용합니다.

![이미지 1](/assets/img/2024-06-19-AnOpenData-DrivenApproachtoOptimisingHealthcareFacilityLocationsUsingPython_1.png)

![이미지 2](/assets/img/2024-06-19-AnOpenData-DrivenApproachtoOptimisingHealthcareFacilityLocationsUsingPython_2.png)

![이미지 3](/assets/img/2024-06-19-AnOpenData-DrivenApproachtoOptimisingHealthcareFacilityLocationsUsingPython_3.png)

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

# 메타로부터 고해상도 인구 밀도 지도 다운로드 및 시각화하기

이 섹션에서는 메타로부터 고해상도 인구 밀도 지도를 다운로드하고 시각화하는 방법에 대해 설명합니다. 이러한 지도는 30m 해상도에서 인구 추정치를 제공하며, 다양한 그룹을 포함하는 인구 통계를 다룹니다. 또한 160개 이상의 국가에 대해 공개적으로 제공됩니다. 이러한 지도는 인구 성장을 모델링하고 인구 조사 데이터를 사용하여 건물을 감지하고, 건물 밀도를 계산하며, 해당 밀도를 기반으로 타일에 걸쳐 인구 데이터를 분배하여 작성됩니다.

다음의 Python 코드 스니펫에서는 `TLS` ISO 코드로 식별되는 티모르-레스테(Timor-Leste)의 2020년 Facebook 인구 데이터를 검색하는 함수 `fb_pop_data`가 정의되어 있습니다. 데이터가 다운로드되어 GeoDataFrame으로 처리되고, 선택된 행정 경계 범위의 좌표 참조 시스템과 일치시킵니다. 관심 영역(선택된 행정 지역) 내의 인구를 계산하고 표시합니다.

![이미지](/assets/img/2024-06-19-AnOpenData-DrivenApproachtoOptimisingHealthcareFacilityLocationsUsingPython_4.png)

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

# 오픈스트릿맵 데이터를 활용하여 티모르-레스테의 의료 시설 매핑

이 코드 세그먼트는 특히 병원과 의원을 위한 티모르-레스테의 의료 시설 데이터를 검색하고 분석하는 데 전념되어 있습니다. 다음과 같은 기능을 수행합니다:

- Overpass API를 통해 티모르-레스테 전역의 병원 및 의원 위치에 대한 OpenStreetMap 쿼리를 수행합니다.
- 병원 (df_hospitals) 및 의원 (df_clinics)용으로 이름, 좌표 및 편의시설과 같은 필수 데이터를 추출하여 별도의 DataFrame에 저장합니다.

이러한 데이터 세트를 공간 분석을 위해 하나의 GeoDataFrame(df_health_osm)으로 병합합니다.

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

- 티모르-레스테에서 의료 시설 수를 결정하기 위해 지역 조인을 실행하여 지정된 관심 지역(AOI) 내의 의료 시설 수를 파악합니다. 이는 티모르-레스테에서 의료 접근성을 평가하는 데 유용한 통찰력을 제공합니다.

![이미지](/assets/img/2024-06-19-AnOpenData-DrivenApproachtoOptimisingHealthcareFacilityLocationsUsingPython_5.png)

# 이소크론 분석을 통한 의료 접근성 평가

get_isochrone_osm 함수는 티모르-레스테의 의료 시설들에 대한 이소크론을 계산합니다. 이소크론은 특정 위치(일반적으로 병원)로부터의 지정된 시간 내에 도달 가능한 영역을 나타내는 다각형입니다. 이 함수는 OpenRouteService API를 사용하여 이러한 다각형을 생성하며, 이동 모드로 걷기를 선택하여 60분 여행 시간을 기준으로 합니다. 그 결과 다각형은 각 시설에 접근 가능한 인구를 결정하는 데 사용됩니다.

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

의료 접근성을 평가하는 중요한 측면 중 하나는 기본 데이터 소스를 기반으로 한 분석의 신뢰성과 민감도를 이해하는 것입니다. 이전 단계에서는 오픈스트리트맵(OpenStreetMap, OSM)의 도로 네트워크 데이터를 사용하여 의료 시설까지의 이동 시간을 계산합니다. 그러나 이 데이터는 품질과 완성도에서 상당한 변동성을 보일 수 있으며, 이는 접근성에 대한 이속론 지도의 정확도 및 결론에 영향을 줄 수 있습니다. 따라서 이러한 불확실성을 해결하기 위해 대안 데이터 소스를 활용한 민감도 분석을 수행하는 것이 좋습니다.

OSM 데이터가 신뢰성이 떨어지거나 오래되어 있는 지역에서는 Mapbox나 Google과 같은 API를 활용하여 보다 최신이거나 완벽한 도로 네트워크 정보를 기반으로 한 접근성의 정확한 계산이 가능합니다. 자원이 허용된다면 이러한 API를 활용하여 OSM 데이터에서의 결과를 보완하거나 검증할 수 있습니다.

예를 들어, Mapbox를 통해 이속론 분석을 수행해보겠습니다. 이 예시는 Mapbox의 이속론 API를 사용하여 기존 병원에서 걸어서 60분 이내에 접근 가능한 지역을 계산하는 방법을 보여줍니다.

아래 코드를 통해 상기 결과를 시각화할 수 있습니다. 이는 주황색 GeoJson 객체로 행정 경계를 개요로 나타내고, 각각의 팝업에 병원 이름을 표시하는 파란핀으로 병원 위치를 표시합니다. 또한, 의료 서비스에 접근할 수 있는 인구를 기준으로 구분하여, 접근하지 못하는 사람들은 빨간색 원 마커로, 접근할 수 있는 사람들은 초록색으로 나타냅니다. 이러한 마커들의 투명도는 인구수에 의해 결정되어, 밀집된 지역과 잘 제공되는 지역과 듬성 듬성한 인프라와 서비스가 부족한 지역을 명확하게 시각적으로 구분하여 의료 접근성의 격차를 보여줍니다.

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

![image](/assets/img/2024-06-19-AnOpenData-DrivenApproachtoOptimisingHealthcareFacilityLocationsUsingPython_6.png)

## 행정 경계의 대표적인 잠재 위치 그리드

새로운 병원과 클리닉을 배치하는 것은 포괄적인 건강 관리 지원을 보장하기 위해 중요합니다. 이는 종종 공식 소스로부터 특정 사이트 권장이 없는 경우에는 대상 지역 내에서 대표적인 그리드를 통해 근사화할 수 있는 잠재적 위치를 분석하는 것을 포함합니다.

이러한 그리드는 새로운 건강 시설을 설립할 위치를 고려하는 시작 프레임워크를 제공하여 언더서빈 인구에 대한 접근성을 극대화하기 위한 목적으로 사용됩니다. 이 코드 조각은 특정 지리적 영역 내에서 이 대표적인 그리드를 생성하는 데 사용되는 generate_grid_in_polygon Python 함수를 설명합니다.

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

해당 기능은 제공된 지오메트리 범위 전체에 대해 간격 매개변수에 의해 결정된 일렬로 배치된 점들의 시리즈를 생성하여 Baucau에 318개의 잠재적 위치를 얻을 수 있습니다.

![이미지](/assets/img/2024-06-19-AnOpenData-DrivenApproachtoOptimisingHealthcareFacilityLocationsUsingPython_7.png)

잠재적인 의료 시설의 배치를 최적화하기 위해 우리의 분석은 각 제안된 위치에 대한 이소크로너(isochrone)를 계산하여 기존 시설에 적용된 60분 도보 매개변수를 동일하게 활용합니다. 이 데이터를 활용하여 접근이 제한된 인구 집단을 결정하고 이러한 잠재적 시설이 제공할 수 있는 인구 집단을 확인합니다.

그런 다음 기존 및 잠재적 위치에서의 접근 데이터를 집계하여 모든 잠재적 위치가 개설되고 기존 시설과 함께 개설된다면 가능한 최대 접근을 계산합니다.

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

# 수학적 최적화

이제 수학적 최적화를 사용하여 오픈할 최적 병원 하위 집합을 결정할 것입니다. 수학적 최적화에 익숙하지 않은 경우, 이 주피터 책에 있는 실습 소개로 시작하는 것을 권장합니다.

수학적 최적화의 핵심은 우리가 최적화하려는 현실 세계의 디지털 쌍둥이 역할을 하는 수학 모델을 만드는 것입니다. 이러한 모델을 개발한 후 해당 모델에 관련 데이터를 입력하여 최적화 문제의 구체적 예제를 만듭니다. 이러한 예제는 적절한 솔버를 사용하여 해결되어 최상의 실현 가능한 해를 발견하게 됩니다. 이를 최적해라고 합니다.

모델링은 개념적인 과정이며, 모델을 코딩하는 것은 기술적인 작업입니다. 저희는 주피터 책에서와 같이 pyomo 패키지를 사용합니다. 이후 논의되는 모델은 캠브리지 대학 출판사로부터 예정된 교재의 3.1 연습문제로 소개되며, 위에 언급된 주피터 책은 이 책의 온라인 동반자로 제공됩니다.

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

강력한 솔버를 활용하여 문제를 해결할 수 있습니다. 우리가 설명할 문제와 같은 경우, Gurobi는 뛰어난 상용 솔버이며, MIT 라이선스 하에 제공되는 우수한 오픈 소스 대안인 HiGHS가 있습니다.

모델링 프로세스는 결정해야 할 사항을 식별하여 결정 변수를 정의하는 것으로 시작합니다. 이러한 결정과 변수에 이름을 붙인 후, 해당 변수의 함수를 사용하여 목표와 제약 조건을 형식화합니다.

- 목표 함수는 솔루션의 품질을 측정합니다.
- 제약 조건은 솔루션이 모든 필요한 규칙을 준수하여 실행 가능한 것으로 간주될 수 있도록 보장합니다.

우리의 경우와 많은 다른 경우, 함수는 선형일 것이며, 변수는 예/아니오 결정을 나타내기 위해 이진 형태를 가질 것입니다.

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

예를 들어, 접근 가능한 개방형 병원이 가구 당 하나의 변수를 필요로하고, 이를 서비스하는지 여부를 결정하는 또 다른 변수가 있습니다. 또한 각 병원당 변수가 필요하며, 해당 병원이 여는지 여부를 나타냅니다. 모델을 표현하는 전형적인 수학적 표기법은 변수의 지원 집합 이름, 지수 및 데이터에서 유도된 모델 매개변수를 명명하여 시작됩니다.

저희 최적화 과제에서 이러한 것들이 포함됩니다:

집합

- 𝐼 — 가구 집합
- 𝐽 — 잠재적인 병원 위치 집합
- 𝐽𝑖 — 집합 내 가구 𝑖∈𝐼의 닿을 수 있는 잠재적인 병원 위치. 참고: 𝐽𝑖⊆𝐽.

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

매개변수

- 𝑣𝑖 — 가구 𝑖∈𝐼의 가구원 수.

## 체 Church와 ReVelle의 논문에 기재된 최대 커버링 모델

이 모델은 각 가구 𝑖∈𝐼에 대해 해당 가구가 𝑗∈𝐽에서 개설된 병원에 의해 서비스를 받을 수 있는지를 나타내는 변수 𝑧𝑖를 정의하며, 완전한 모델은 다음과 같습니다:

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

![이미지](/assets/img/2024-06-19-AnOpenData-DrivenApproachtoOptimisingHealthcareFacilityLocationsUsingPython_8.png)

첫 번째 줄은 가구 수를 최대화하는 목표를 설명하고, 두 번째 줄 (_subject to:_ 이후)은 첫 번째 제약 조건을 나열합니다: 각 가구는 도달 가능한 최소한 하나의 병원이 열려 있을 때에만 서비스를 받습니다. 그런 다음, 열 병원 수는 선택을 제한하며, 마지막으로 사용되는 변수의 이진성이 지정됩니다.

위 모델은 최대 𝑝개의 병원을 선택합니다. 원래 논문에서는 Church와 ReVelle이 정확히 𝑝개의 병원을 선택했지만, 우리 모델에는 나중에 논의할 장점이 있습니다.

## 수학적 모델 구현하기

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

모델을 설계한 후에는 구현이 수학적 표현에서 개념을 코드로 번역합니다. 번역은 대부분 일대일로 이루어지며, 주된 차이점은 변수를 사용하기 전에 항상 프로그래밍에서 처럼 변수를 선언한다는 것입니다. 반대로, 수학적 공식은 전통적으로 변수를 끝에 선언합니다. 저희는 모델을 코딩하기 위해 패키지 Pyomo를 사용합니다.

- 최적화 모델 정의

model_max_covering 함수는 Pyomo를 사용하여 수학적 최적화 모델을 정의합니다. 다음과 같은 여러 매개변수를 사용합니다:

- w: 각 가구 ID의 인구 수가 포함된 사전
- I: 가구 ID 세트
- J: 잠재적 병원 위치 ID 세트
- JI: 각 가구 ID를 그들에게 서비스를 제공할 수 있는 잠재적 병원 ID 세트로 매핑하는 사전
- p: 오픈할 최대 병원 수

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

모델은 의사결정 변수 x(이진, j 위치에 병원을 열지 여부)와 z(이진, i 가 서비스를 받는지 여부)를 설정합니다. 목적은 총 인구를 최대한 커버하는 것이며, 가구가 서비스를 받는 경우에는 도달 가능한 병원이 열리기 때문에 제약 조건을 따릅니다. 예산인 -p를 초과하지 않도록 전체 병원 수를 최대화합니다.

### 2. 입력 데이터 준비

그런 다음 코드는 데이터프레임에서 관련 데이터를 추출합니다:

- J_existing: 기존 병원 ID 집합
- J_potential: 잠재적인 새 병원 위치 ID 집합
- I1: 모든 가구 ID 집합
- IJ_existing: 기존 병원 ID를 해당 병원이 서비스를 제공할 수 있는 가구 집합으로 매핑한 사전
- IJ_potential: 잠재적인 병원 ID를 해당 병원이 서비스를 제공할 수 있는 가구 집합으로 매핑한 사전
- JI1: 이전 두 가지로부터 역으로 매핑한 것으로, 각 가구에 대해 잠재적인 병원 집합을 제공합니다.

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

3. 최적화 모델 호출

get_ids 함수는 주어진 예산(개설할 병원 수)에 대해 최적화 모델을 초기화하고 해결하기 위해 정의됩니다. 이 함수는 모델 인스턴스 m1을 생성하고, 제안된 제약 조건을 사용하여 개선할 기존 병원을 설정하며, 기존 병원의 수를 추가하여 예산 p를 조정합니다.

그런 다음 HiGHS 솔버를 사용하여 모델을 해결하고 선택된(개설된) 병원들의 ID가 반환됩니다.

4. 최적 솔루션 찾기

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

다음 코드 블록에서는 결과를 저장하기 위한 result_list라는 리스트가 생성됩니다. 다양한 예산(개설할 병원 수)에 대한 결과가 저장됩니다.

루프는 다양한 예산 값에서 실행되며, 잠재적 위치의 총 수까지 반복됩니다. 각 예산에 대해:

- get_ids 함수를 호출하여 개설할 병원 ID의 최적 집합을 가져옵니다.
- 선택된 병원을 기반으로 액세스가 있는 인구와 액세스가 없는 인구가 계산됩니다.
- 액세스가 있는 인구의 백분율이 계산됩니다.
- 이 백분율과 해당 예산이 result_list에 추가됩니다.

이 프로세스를 통해 개설하는 병원 수와 인구를 커버하는 백분율 간의 균형을 탐색하고, 결과적으로 파레토 곡선 시각화를 만들 수 있습니다.

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

파레토 곡선 시각화는 최적화 모델 실행 결과를 다른 예산(개설할 병원 수)으로 2차원 그래프에 도식화하는 것을 의미합니다. 이는 개설된 시설 수와 그에 따른 인구 보호율 사이의 트레이드 오프를 시각화할 수 있게 합니다. 구체적으로, x축은 개설된 병원 수(예산)를 나타내고, y축은 의료 시설에 접근할 수 있는 인구 백분율을 보여줍니다. 예산(따라서 개설된 병원 수)이 증가함에 따라 인구 보호율도 향상되는 경향이 있습니다. 그러나 일반적으로 개설된 병원이 추가됨에 따라 개선 속도는 감소하며, 일정 시점을 넘어 병원이 추가될수록 둔화되는 곡선이 나타납니다. 이러한 곡선을 파레토 곡선 또는 파레토 프론티어라고 합니다. 이것은 우위에 있지 않은 솔루션 집합을 나타내며, 한 목표(예: 인구 보호율)를 증가시키려면 다른 목표(예: 병원 수/예산 증가)를 희생해야 하는 솔루션입니다. 파레토 곡선 시각화는 이 맥락에서 중요합니다. 결정자들이 관련된 트레이드 오프를 이해하고 정보에 기반한 선택을 할 수 있도록 돕기 때문입니다. 예를 들어:

- 곡선이 가파른 초기 기울기를 가지고 있다면, 몇 개의 병원을 추가함으로써 인구 보호율을 크게 향상시킬 수 있어 투자가 매우 효과적일 수 있습니다.
- 곡선이 빠르게 평평해진다면, 일정 시점을 넘어 병원을 추가로 개설해도 보호율이 크게 증가하지 않을 수 있어, 감소하는 수익을 시사합니다.
- 곡선은 트레이드 오프가 덜 유리해지는 "무릎"이나 포인트를 나타낼 수 있어, 두 목표를 균형있게 맞출 수 있는 잠재적인 좋은 지점을 식별하는 데 도움을 줍니다.

아래 코드는 Plotly.express 모듈을 사용하여 최적화 결과의 파레토 프론티어를 시각화하는 데 사용됩니다.

# 이제, 가장 중요한 질문: 이 최적화된 위치들은 어디에 있을까요?

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

저희 최적화 모델은 여러 전략적 위치를 식별하여 새로운 의료 시설을 개선해 전반적인 접근성을 향상시켰습니다. 추가 5개 시설을 오픈하는 예산 제약 조건 하에, 분석 결과 이러한 위치를 선택함으로써 47.4% (기존 시설만 사용하는 경우)에서 61.93%로 인구 접근률을 증가시키는데 가장 효과적인 선택지로 제시합니다.

![이미지](/assets/img/2024-06-19-AnOpenData-DrivenApproachtoOptimisingHealthcareFacilityLocationsUsingPython_9.png)

요약하자면, 이 블로그 글은 개방 데이터, 지리 정보 분석 및 수학적 최적화 기술을 활용하여 공평한 의료 접근 계획의 중요 도전에 대응하는 능력을 보여줍니다. Python의 능력을 활용하고 다양한 데이터 소스를 통합함으로써, 우리는 의료 시설 위치를 평가하고 새로운 시설을 위한 최적 위치를 식별하기 위한 견고한 방법론을 개발했습니다.

이 사례 연구는 티모르-레스테에 초점을 맞췄지만, 이 블로그에서 제시된 방법론은 보편적으로 적용 가능하며, 의료 시설에 대한 물리적 접근 문제에 직면한 다른 지역이나 국가에 적응하여 투자 우선순위를 결정할 수 있도록 돕습니다.

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

이 튜토리얼의 전체 코드는 Colab 노트북에서 찾을 수 있어요. 당신이 파이썬 프로그래머가 아니더라도, 우리는 이 기여가 최적화 모델을 사용해 새로운 세대의 의사 결정 지원을 위한 오픈으로 이용 가능한 지리적 데이터를 활용하는 가능성과 프로세스에 관한 직관적인 감각을 제공해 줄 것을 바라고 있어요.
