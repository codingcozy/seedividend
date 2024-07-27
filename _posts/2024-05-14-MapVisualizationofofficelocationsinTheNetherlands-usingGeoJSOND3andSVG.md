---
title: "네덜란드의 사무실 위치를 나타내는 맵 시각화 - GeoJSON, D3 및 SVG를 사용하여"
description: ""
coverImage: "/assets/img/2024-05-14-MapVisualizationofofficelocationsinTheNetherlands-usingGeoJSOND3andSVG_0.png"
date: 2024-05-14 13:18
ogImage: 
  url: /assets/img/2024-05-14-MapVisualizationofofficelocationsinTheNetherlands-usingGeoJSOND3andSVG_0.png
tag: Tech
originalTitle: "Map Visualization of (office locations in) The Netherlands -using GeoJSON, D3 and SVG"
link: "https://medium.com/@lucasjellema/map-visualization-of-office-locations-in-the-netherlands-using-geojson-d3-and-svg-62ce923d747d"
---


![지도 시각화](/assets/img/2024-05-14-MapVisualizationofofficelocationsinTheNetherlands-usingGeoJSOND3andSVG_0.png)

GeoJSON 데이터셋과 JavaScript d3.js를 사용한 SVG 시각화의 결합은 지리적 데이터(지역, 국가, 주, 성, 도시 등)에 대한 풍부하고 상호 작용적인 시각화를 만드는 데 매우 가치가 있습니다. 이 기사에서는 저의 거주 지역인 네덜란드에 이 강력한 결합을 적용할 것입니다. 네덜란드의 12개 성에 대한 데이터가 포함된 GeoJSON 파일을 찾아서 d3.js를 사용하여 간단한 웹 애플리케이션에서 국가와 그 성을 시각화할 것입니다. 그런 다음, 저가 CTO로서 역할을 맡고 있는 Conclusion 회사들의 사무실 위치를 나타내는 마커를 추가할 것입니다.

최근 몇 개의 기사에서는 세계 데이터셋에서 특정 속성에 따라 국가에 색상을 할당한 테마별 세계지도를 사용한 데이터 시각화에 대해 d3.js 라이브러리의 사용법을 소개했습니다. 이를 위해 SVG와 함께 사용하는 방법을 소개했는데, GeoJSON 데이터 형식은 국가 및 주에서 도시, 호수 및 산림까지 다양한 지리적 정의가 가능합니다. 어떻게 지도를 다른 속성 간에 쉽게 전환하고 상호 작용성을 추가할 수 있는지(국가를 클릭하여 선택하고 지도의 회전 또는 동서 방향 이동 변경)를 보여 주었습니다. 네 번째 기사에서는 프로그래밍 방식과 사용자 시작으로 확대(그리고 다시 축소)하는 두 가지 다른 방법에 대해 논의했습니다.

이 기사에서는 이전 기사에서 만든 것을 적용하여 네덜란드 관련 데이터를 다룰 것입니다.



# 네덜란드 시각화

d3.js를 사용하여 세계의 일부를 시각화하는 첫 단계는 분명히 지리 정보를 제공하는 GeoJSON 파일을 찾는 것입니다. 조금 찾아보니 Cartomap GitHub 저장소를 발견했는데, 다양한 지역 시스템에 대한 지리 정보를 제공하는 유용한 GeoJSON 파일이 많이 있습니다. 재판소, 소방서, 노동시장, 관광, 보건, 자치구, 도시지역, 청소년, 상공회의소, 농업, 공공시설, 경찰, 지방, 소속기관, 동네, 안전 지역 등을 위한 파일들이 많이 있습니다. 대부분의 파일은 여러 해에 대해 사용 가능합니다.

저는 wgs84/provincie_2023.geojson 파일을 활용하기로 결정했습니다. 이 파일은 12개의 지방에 대한 경계 점의 지리 좌표를 포함하고 있습니다. 각 지방의 이름도 포함되어 있습니다. 이것만 있으면 지도를 그릴 수 있습니다.

![네덜란드 지역의 공식 위치 시각화 지도](/assets/img/2024-05-14-MapVisualizationofofficelocationsinTheNetherlands-usingGeoJSOND3andSVG_1.png)



저는 세계를 시각화하는 기사에서 대부분 했던 작업을 가져왔어요. "country/countries(국가/국가들)"에 대한 모든 참조를 "area/areas(지역/지역들)"로 변경했어요. 여기서 적절한 초기 축척 요소(네덜란드는 작은 국가이기 때문에 대규모 축척로 했을 때 거의 보이지 않는다)와 적절한 투영 회전을 찾았어요. d3.geoEquirectangular 투영 대신에 이제 d3.geoMercator를 사용하고 있어요(지구의 모양이 투영에 방해가 되지 않는 더 작은 국가에 더 적합해요). 국가의 형태에 따라 mapHeight(너비에 비해 상대적으로 높이를 증가했어요).

GeoJSON 기능에서 제공되는 제목(마우스 호버 텍스트) 및 식별에 관한 내용을 제공하는 상수를 정의했어요:

이러한 변경 사항은 redrawMap() 함수에서 나타납니다:



![그림1](/assets/img/2024-05-14-MapVisualizationofofficelocationsinTheNetherlands-usingGeoJSOND3andSVG_3.png)

아래는 영역을 선택하거나 해제하는 논리에 대한 코드 예시입니다:

![그림2](/assets/img/2024-05-14-MapVisualizationofofficelocationsinTheNetherlands-usingGeoJSOND3andSVG_4.png)

현재 index.html 파일의 상태입니다. GitHub Pages에서 데모를 확인해보세요.



<img src="https://miro.medium.com/v2/resize:fit:1400/1*GUemI5VHeyQPqQiATAoNZQ.gif" />

# 지도상의 위치 표시

이것은 좋은 첫걸음입니다: 네덜란드와 그 주요 지역 구획의 시각화입니다.

한 발 더 나아가서 지도에 위치를 추가해봐요. 도시를 대표하는 지리적 지점들이나, Conlusion 사무실 위치 등을 예로 들 수 있습니다.



이 GeoJSON 파일에는 대도시 지역이 포함되어 있습니다. 이 지역은 다각형을 통해 다시 정의됩니다. 이들은 지방에 그려질 수 있으며, 해당 국가의 주요 도시를 나타낼 수 있습니다.

도시 지역을 포함하려면 필요한 변경 사항은 다음과 같습니다:

- 도시 지역을 위한 스타일 클래스를 정의합니다.
- City GeoJSON을 로드하고 이를 지방 세부 정보와 병합합니다.
- 각각 지방과 도시에 대한 생성된 모양에 적절한 스타일 클래스를 할당합니다.

클래스 도시:



<img src="/assets/img/2024-05-14-MapVisualizationofofficelocationsinTheNetherlands-usingGeoJSOND3andSVG_5.png" />

도시 GeoJSON을 로딩하고 병합:

<img src="/assets/img/2024-05-14-MapVisualizationofofficelocationsinTheNetherlands-usingGeoJSOND3andSVG_6.png" />

SVG 모양을 렌더링할 때 적절한 스타일 클래스 할당하기:




![이미지](/assets/img/2024-05-14-MapVisualizationofofficelocationsinTheNetherlands-usingGeoJSOND3andSVG_7.png)

생성된 지도는 다음과 같이 보입니다:

![이미지](/assets/img/2024-05-14-MapVisualizationofofficelocationsinTheNetherlands-usingGeoJSOND3andSVG_8.png)

모든 도시 지역이 강조되어 있습니다. 각각에는 호버 텍스트에 해당하는 이름이 있습니다. 그리고 도시 지역도 마찬가지로 선택할 수 있습니다:




<img src="/assets/img/2024-05-14-MapVisualizationofofficelocationsinTheNetherlands-usingGeoJSOND3andSVG_9.png" />

이 시점의 index.html 파일입니다. 그리고 라이브 데모입니다.

이제 도시를 다각형 영역으로 그리는 대신, 각 도시를 원으로 나타내는 것이 더 나을 것 같습니다. 이것은 Polygon 대신 GeoJSON Point에서 파생됩니다.

이를 달성하기 위해 해야 할 일은 도시 GeoJSON의 모든 요소를 처리하고 각각을 만들어 집합니다. 그런 다음 치에서 파생된 geojsonData에 추가하는 것입니다.




![사무실 위치 지도 시각화](/assets/img/2024-05-14-MapVisualizationofofficelocationsinTheNetherlands-usingGeoJSOND3andSVG_10.png)

생성된 지도:

![사무실 위치 지도 시각화](/assets/img/2024-05-14-MapVisualizationofofficelocationsinTheNetherlands-usingGeoJSOND3andSVG_11.png)

네덜란드 지리에 익숙하신 분들은 이 도시 원들이 실제 도시가 위치한 곳에 모두 있는 것이 아니라는 점을 알 수 있을 것입니다. 분명히, 도시 영역을 경계 지정하는 직사각형의 중심이 항상 실제 도시 중심과 같은 곳에 있는 것이 아닙니다.




점(도시)의 시각화 크기와 색상을 조절할 수 있어요. 가장 간단한 방법은 원의 반지름을 사용자 정의하여 경로 생성기를 정의하는 것입니다: d3.geoPath().pointRadius(custom-circle-radius);

GeoJSON 기능을 위한 SVG 객체를 만들 때 사용되는 경로 생성기 함수를 수정하여 Points에 대한 사용자 지정 함수를 호출할 수 있어요.

사용자 정의 함수를 구현한 예시 중 하나는 간단한 집 모양(사실 직사각형과 삼각형입니다)을 그리는 경로를 만드는 함수입니다:



![Map Visualization](/assets/img/2024-05-14-MapVisualizationofofficelocationsinTheNetherlands-usingGeoJSOND3andSVG_13.png)

지도 상에 각 도시의 위치에 간단한 집 모양이 표시되었습니다:

![Map Update](/assets/img/2024-05-14-MapVisualizationofofficelocationsinTheNetherlands-usingGeoJSOND3andSVG_14.png)

이 시점에서의 index.html 파일 상태 및 실시간 데모 페이지입니다.



# 컨클루전 사무실 위치 추가

2023년 5월 1일 현재, 저는 IT 기업 그룹인 컨클루전의 CTO입니다. 컨클루전은 각기 다른 전문성, 문화, 역사(및 미래), 제안 및 고객을 갖춘 30개 이상의 자율적인 회사들로 구성되어 있습니다. 이러한 회사들은 내부적으로 협력하여 더 스마트하고 효율적으로 일을 처리하고, 노하우와 경험을 공유하는 좋은 실천 방법을 기반으로 한 활동, 스포츠 이벤트, 문화 활동 및 자선 행사에서 더 즐거운 시간을 보내며, 동료들이 자매 회사의 다른 역할에서 경력을 쌓을 수 있도록 가능하게 하며, 외부적으로는 고객에게 상호 일치하는 다양한 서비스를 제공하기 위해 협력합니다.

네덜란드 내에서 컨클루전은 12개 이상의 장소에 사무실을 두고 있습니다. 대부분은 개별 회사용이며 일부는 여러 회사를 수용하고 있습니다. 대부분의 동료들은 사무실에 출근하고 싶은 경우 모든 사무실을 이용할 수 있습니다.

모든 컨클루전 사무실 위치를 시각화하기 위해 네덜란드의 지도를 사용할 예정입니다.



![이미지](/assets/img/2024-05-14-MapVisualizationofofficelocationsinTheNetherlands-usingGeoJSOND3andSVG_15.png)

결론 사무실의 위치를 나타내는 새로운 GeoJSON 파일을 추가할 거에요. 이 파일은 저 혼자 만들어야 해요. 이 위치들은 Point 유형의 특징이며 방금 도시들에 사용한 집 아이콘으로 시각화되어야 해요.

사무실을 위한 새로운 CSS 스타일을 정의했어요.

![이미지](/assets/img/2024-05-14-MapVisualizationofofficelocationsinTheNetherlands-usingGeoJSOND3andSVG_16.png)



새로운 파일이 로드되고 사무실 위치에 대한 데이터가 geojsonData 세트에 포함되었습니다

![이미지](/assets/img/2024-05-14-MapVisualizationofofficelocationsinTheNetherlands-usingGeoJSOND3andSVG_17.png)

기능이 사무실 위치를 설명하는 경우 작은 집 아이콘을 그릴 사용자 정의 기능이 호출됩니다:

![이미지](/assets/img/2024-05-14-MapVisualizationofofficelocationsinTheNetherlands-usingGeoJSOND3andSVG_18.png)



다음과 같은 지도가 생성됩니다:

<img src="/assets/img/2024-05-14-네덜란드의사무소위치시각화-GeoJSON, D3, SVG_19.png" />

실시간 데모에서 직접 이 결과를 확인할 수 있습니다. index.html의 현재 상태도 확인할 수 있습니다.

다음 단계로는 오피스를 클릭하면 해당 위치와 그 안에 위치한 회사에 대한 정보를 보여주는 팝업 창을 구현할 수 있습니다 (필요한 정보는 이미 GeoJSON 파일에 포함되어 있습니다).



# 결론

이 글에서는 GeoJSON 데이터를 네덜란드의 맥락에서 시각화할 수 있다는 것을 보여드렸어요. 전 세계 지도에 대한 모든 코드를 재사용하여 네덜란드의 지방 및 도시 데이터가 포함된 GeoJSON 파일을 손쉽게 추가하고 시각화할 수 있습니다 (매우 조정된 스케일 요인을 사용). 그리고 커스텀 포인트 표현을 소개했어요 - 결론 생태계의 사무실 위치를 보여주기 위해 (네덜란드에 있습니다.; 독일, 벨기에, 포르투갈, 스페인, 남아프리카에도 위치가 있어요. 혹시 다음 글에서 이를 추가할지도 몰라요).

# 자료

이 글에 대한 코드가 포함된 GitHub 저장소, 새로운 GeoJSON 파일을 포함하고 있어요 - 결론 사무실 위치를 나타내기 위해 제가 직접 만들어야 했던 파일이에요.



내 이전 기사들을 통해 세계지도 데이터 시각화에 대해 소개하겠습니다:

1. 나라 데이터 시각화를 위한 대화형 세계지도 생성하기 - https://medium.com/@lucasjellema/create-interactive-world-map-to-visualize-country-data-baa5b242bfbb - d3, SVG 및 JavaScript를 사용한 세계지도 데이터 시각화 소개.

2. 세계지도 시각화를 활용한 데이터로 세계를 소개하기 - https://medium.com/@lucasjellema/presenting-the-world-in-data-using-world-map-visualization-d3-kaggle-world-data-set-7c16ca207fb0 - 첫 번째 기사에서 데이터 시각화에 대한 간단한 접근 방식과 Kaggle의 풍부한 데이터 세트를 결합하여 세계의 모든 국가에 대한 교육, 건강, 경제, 인구 통계, 기후 등 많은 흥미로운 세부 정보를 제공합니다.

3. 세계지도 내 대화형 데이터 시각화 - 확대, 이동, 범례 - https://medium.com/@lucasjellema/interactive-data-visualization-in-world-map-translate-select-legend-popup-4d28261110df - 세계지도에 상호 작용을 추가하는 것에 대해 자세히 살펴보겠습니다. 특히: 지도의 회전을 변경, 나라 선택(클릭으로), 나라 세부 정보 팝업 창 표시 및 범례 - 색상 스케일 (히트맵 색상을 숫자 값에 매핑) 표시하기.



4. World Map Data Visualization with d3.js, GeoJSON and SVG - Zooming, Panning and Dragging
- 더 자세한 내용은 [여기](https://medium.com/@lucasjellema/world-map-data-visualization-with-d3-js-geojson-and-svg-zooming-and-panning-and-dragging-194fb16dec9a)를 확인해보세요!  
- 월드맵에 확대/축소, 이동 및 드래그 기능을 사용자 및 프로그램으로 구현했습니다.
- 원본 게시물은 2024년 1월 2일에 [여기](https://technology.amis.nl)에서 확인하실 수 있습니다.