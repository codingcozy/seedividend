---
title: "뉴욕시의 거리 나무 인구 변동을 GeoPandas, Plotly, 그리고 JavaScript를 사용하여 시각화하기"
description: ""
coverImage: "/assets/img/2024-06-19-VisualizingStreetTreePopulationVarianceinNYCUsingGeoPandasPlotlyandJavaScript_0.png"
date: 2024-06-19 22:45
ogImage:
  url: /assets/img/2024-06-19-VisualizingStreetTreePopulationVarianceinNYCUsingGeoPandasPlotlyandJavaScript_0.png
tag: Tech
originalTitle: "Visualizing Street Tree Population Variance in NYC Using GeoPandas, Plotly, and JavaScript"
link: "https://medium.com/better-programming/visualizing-street-tree-population-variance-in-nyc-using-geopandas-plotly-and-javascript-f12251186342"
isUpdated: true
---

## Plotly Dash 및 JavaScript를 사용한 서버 및 클라이언트 측 렌더링의 성능 비교

![image](/assets/img/2024-06-19-VisualizingStreetTreePopulationVarianceinNYCUsingGeoPandasPlotlyandJavaScript_0.png)

이 문서에서 다음을 다룰 것입니다:

- 미국 인구 조사국 및 뉴욕시 공원국의 데이터를 사용하여 1995년부터 2015년까지 NYC의 거리 나무 면책을 매핑합니다.
- Pandas/GeoPandas 및 Plotly를 사용하여 데이터를 정리, 집계, 분석 및 시각화하는 방법을 안내하고, 웹 앱을 사용하여 데이터를 대화식으로 제시합니다.
- 1995년부터 2020년까지 나무와 인구 밀도가 공간적으로 어떻게 변화했는지와 이러한 변화의 사회적 함의에 대해 논의합니다.
- 이 기간 동안 도시 전역에서 블록 당 나무의 중앙값이 크게 증가했지만, 변화의 규모가 자치구별 및 지역별로 상당히 다르며 일부 지역에서는 나무가 감소하는 것을 알 수 있습니다.
- 1995년 이후의 대상 나무 심는 노력이 적은 숲이었던 역사적으로 레드라인 지역에서 도시열섬 효과를 개선하지만, 젠트리피케이션에도 기여했음을 발견합니다.

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

마침내, 이 웹 앱의 서버 및 클라이언트 측 렌더링(Plotly Dash 및 JavaScript 사용)의 성능을 비교해보고 간단한 대화형 데이터 시각화의 경우 클라이언트 측 렌더링이 가장 우수함을 발견했습니다.

# 동기

작년 가을, 친구가 뉴욕 시티의 다른 동네들 사이의 나무 면적의 차이에 관한 뉴욕 타임스 기사를 보내줬어요. 2016년부터 사는 뉴욕에서 이 기사는 특히 나에게 와닿았어요.

그때 이 기사가 나에게 매우 중요했던 이유는, 그 해 여름 동안 시애틀에 있던 때 전체 태평양 연안이 ‘천년에 한 번 일어나는 1급 이벤트’로 평가될 정도로 극적인 폭염을 경험했기 때문이었어요.

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

Urban Heat Island (UHI) 효과에 대해 알려줬어요. 도시보다 주변 농촌 환경에서 기온이 높아지는 현상이에요. 또한 뉴욕시와 그 이상 지역에서 레드라인, 같은 역사적인 차별 패턴에 따라 강렬하고 치명적인 여름 폭염 지역들이 어떻게 공간적으로 재현되는지 소개했어요.

극지역 도시 열섬의 강도에서 주요 물리적 변수는 나무의 존재에요. 제가 항상 환경 정의에 관심이 있었고, 마지막 두 시장 행정 기간 동안의 나무 심기 노력과 주택 건설 증가를 고려할 때, 최근에 NYC(뉴욕시)의 UHI가 어떻게 변화했는지 이해하고 5개 자치구 전역에서 기후 탄력의 변화하는 지리를 이해하고 싶었어요. 구체적으로는 다음을 이해하고 싶었어요:

- 나무와 인구의 추세가 어떻게 변화했는지
- 시간이 흘러 나무와 인구의 변화가 주택 재편에 관련되어 있는지
- 1995년에 도시에 비해 가장 적은 나무를 가진 지역이 오늘날에도 여전히 상대적으로 나무가 부족한지
- 레드라인으로 분류된 지역이 1995년과 오늘날에 도시에 비해 나무가 덜 있는지

우선, 데이터를 필요로 했어요.

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

# 데이터 수집 및 정제

나는 NYC Open Data를 찾아 공원 부서의 'Street Tree Census' 프로젝트를 발견했어. 이 프로젝트는 1995년, 2005년 및 2015년에 모든 거리 나무의 수동 인벤토리를 수행했어.

나는 모든 데이터를 다운로드하고 탐색을 시작했어. 데이터 사전을 읽은 후, 인구조사 구로 거리 나무를 비교하는 것이 가장 합리적인 데이터 처리 방법임을 깨달았어. 왜냐하면 97%의 나무에 대해 인구조사 구가 제공되었고 국세 데이터와 쉽게 병합할 수 있기 때문이야. UHI가 공간적으로 어떻게 변화했는지 이해하고 그 크기와 수를 결정하기 위해, 나는 시간이 지남에 따른 나무의 공간 분포, 나무의 상대 풍부도 및 거리 나무 인구의 총 성장을 비교하기로 결정했어.

또한, 지난 시간 동안 어디에 열섬이 있었고 현재 어디에 있는지 확인하고 싶었어. 열섬을 추적하고 시간이 지남에 따라 그 심각성이 변하는 것을 측정하기 위해, 나는 수거된 주민들의 인구가 나무 인구와 어떻게 분포 변화했는지를 이해할 필요가 있었어. 안타깝게도 거리 나무 인구 조사는 10년 주기의 인구조사 사이에 정확히 발생했기 때문에, 나는 매 나무 인구조사마다 이전 또는 이후의 인구 데이터를 사용할지 결정해야 했어.

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

나는 각 나무 수를 센 후 인구 조사 데이터를 사용하기로 결정했습니다. 최근인 2020년 인구 조사의 데이터를 활용할 수 있어서였고, 도시의 나무 수가 증가 추세에 있었기 때문에 나무 수를 과소 추정하는 대신 사람 수를 과소 추정하는 것보다 나에게 더 적합하다고 생각했어요. 이렇게 하는 것이 기후 변화의 인간적 요소를 강조하고 싶었기 때문이죠. IPUMS NHGIS에서 2000년, 2010년, 2020년 인구 조사 정보를 다운로드했어요.

첫 번째 단계는 인구 조사 구역별로 나무를 집계하는 것이었어요. 이 일이 보다 복잡하게 나타나기도 했는데, 대부분의 나무에 대해 인구 조사 구역 코드가 포함되어 있었지만, 이 코드들은 카운티 수준에서만 고유했어요. 뉴욕시의 각 자치구가 각자의 카운티인 것을 감안하면, 이는 코드가 도시 내에서 고유하지 않음을 의미했죠.

공원 부서의 분들이 친절하게도 해결책을 제공해 주셨어요. boroct 또는 "자치구 인구 조사 구역"이라는 열이 포함되어 있었는데, 이 열은 변수 길이의 인구 조사 구역 코드를 여섯 자리 숫자로 변환하고, 해당 나무가 위치한 자치구를 나타내는 1, 2, 3, 4, 또는 5를 접두사로 붙였어요. 결과적으로, 이는 도시 수준에서 고유한 7자리 지리 식별자로 이뤄졌습니다.

boroct가 2015년 인구 조사의 거의 모든 나무에 제공되었지만, 2005년과 1995년 인구 조사에는 인구 조사 구역 코드만 있고 boroct 항목이 없는 나무가 많았어요 — 2005년에 모든 나무 중 거의 20%였죠. 이 문제를 인코딩하는 짧은 함수를 작성했습니다.

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

```js
# borocode, 총 인구 조사 구 코드의 길이 및 문자열 형태의 인구 조사 구 코드를 입력하면 boro_ct를 반환하는 함수

def encode_boroct(bc, l, sct):
    bct = np.where(l == 1, bc+"000"+sct+"00",
                  np.where(l == 2, bc+"00"+sct+"00",
                  np.where(l == 3, bc+"0"+sct+"00",
                  np.where(l == 4, bc+sct+"00",
                  np.where(l == 5, bc+"0"+sct,
                  np.where(l == 6, bc+sct,
                                    "NaN"))))))
    return bct
```

일부 나무에는 인구 조사 구가 나와 있지만 인구 조사 구 코드가 없는 것이 있었기 때문에 해당 부분은 삭제되었고, 각 인구 조사 연도별 인구 조사 구당 나무 수를 세 개의 데이터프레임에 저장했습니다. 총 1995년, 2005년 및 2015년 데이터에서 나무의 97%에는 인구 조사 구가 지정되어 있었으며, 모든 나무가 최종 데이터프레임에 포함되었습니다.

2010년 인구 조사 구 지정이 세 인구 조사 연도에 모두 사용되었기 때문에 이러한 구역의 shapefile을 GeoPandas GeoDataFrame으로 가져와 NYC를 위해 하위 집합으로 만든 다음, boroct를 사용하여 2015년 나무 수 데이터와 결합했습니다.

그런 다음 boroct를 사용하여 왼쪽 외부 조인을 계속 적용하여 각 인구 조사 구에 대한 2015년, 2005년 및 1995년 나무 수뿐만 아니라 각 인구 조사 구의 구 이름, 면적 및 지오메트리를 포함하는 최종 데이터프레임을 만들었습니다.

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

다음으로, 인구 조사 데이터를 정리했습니다. 상대적으로 단순한 분석을 하고 있었기 때문에 작업은 간단했습니다. 인구를 조사구 단위로 집계하고, 연이어 왼쪽 조인을 사용하여 각 인구 조사 연도별로 열을 가진 단일 DataFrame을 만들었습니다.

마지막으로, 2020년 인구 조사 구역의 형상 파일을 가져왔습니다. 최신 인구 조사 데이터를 최대한 활용하고 싶었기 때문입니다. 인구 조사 구역 단위로 집계하고, 2020년과 2010년 구역 지정 간의 차이가 최소한으로 유지되도록 확인했습니다. 총 나무 수의 미약한 손실에 만족하고 — 총 나무 수의 1% 미만을 차지하는 인구 조사 구역이 약 5% 미만으로 유지되었기 때문에 — 완전한 트리 GeoDataFrame을 완전한 인구 GeoDataFrame에 결합하여 그래프용 최종 GeoDataFrame을 만들었습니다.

이 최종 GeoDataFrame에는 1995년, 2005년 및 2015년의 트리 카운트와 2000년, 2010년 및 2020년의 인구 통계가 포함되었습니다. 이들은 인구 조사 구역 단위로 집계되었으며, 최종 열에는 각 구역의 토지 면적 및 동네 이름이 저장되었습니다.

<img src="/assets/img/2024-06-19-VisualizingStreetTreePopulationVarianceinNYCUsingGeoPandasPlotlyandJavaScript_1.png" />

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

마침내 몇 가지 지표가 필요했어요. 시간이 지남에 따라 토지 면적 당 나무를 의미 있는 방식으로 비교하기 위해, 도시 주민들에게 직관적인 토지 면적 단위를 고안하는 것이 필요했죠.

인구 조사 보고서는 평방 미터로 토지 면적을 측정하지만 뉴욕 시민들은 도시 블록 단위로 생각하니까, 저는 표준 단위 블록을 정의하고 블록 당 나무 수를 보고하기로 결정했어요.

조사 및 StreetEasy의 도움을 받아 데이터셋에 합리적인 나눗셈자로 작용하는 평균 블록 크기를 찾았고, 대부분의 블록이 1에서 40 그루의 나무를 보유하도록 결정되었죠. 나무 조사 연도별 블록 수로 변환하고 각 나무 조사 연도의 블록 수로 나무 수를 나누었어요.

인간 중심적 맥락에서 나무 인구를 관련 지었기 때문에 세 인구 조사 연도 모두에 대해 "인당 나무 수" 지수를 계산했어요. 산업지역의 도시열섬은 여전히 생태학적으로 중요하지만 이러한 공간에서의 인구 감소로 인해 인간 건강에 미치는 영향의 규모는 상당히 감소되었어요.

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

내 프로젝트의 초점은 주로 인구 밀집 지역을 살펴보고, 나무 덮개가 증가함에 따라 인간 건강에 미치는 영향을 조사하는 것이었습니다.

![이미지](/assets/img/2024-06-19-VisualizingStreetTreePopulationVarianceinNYCUsingGeoPandasPlotlyandJavaScript_2.png)

이러한 지수를 계산한 후에는 데이터를 자세히 분석할 준비가 되었습니다.

# 탐색적 데이터 분석

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

총으로 뉴욕시는 조사 기간 동안 15만 7천 그루 이상의 나무와 58만 7천 명의 사람이 증가했습니다. 지역 수준에서 2022개의 택트 중 1604개(79%)가 나무를 추가했고, 2022개의 택트 중 1505개(74%)가 사람을 추가했습니다. 이 데이터는 2020년 인구조사 기간 모든 택트의 95%와 나무의 96%를 대표합니다.

게다가, 1995년부터 2015년까지의 나무 심는 노력을 통해 각 인구 조사 구역의 평균 나무 수가 15에서 22로 증가하고, 도시 전체의 인당 나무 수가 19에서 15로 감소했습니다.

이러한 추세는 자치구 수준에서도 유지되지만, 나무와 사람이 추가된 수에는 자치구 간에 유의미한 차이가 있었습니다. 평균 인구조사 택트의 통계는 아래 표에 나와 있습니다:

![이미지](/assets/img/2024-06-19-VisualizingStreetTreePopulationVarianceinNYCUsingGeoPandasPlotlyandJavaScript_3.png)

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

표를 보면, 브롱스가 해당 기간 동안 가장 빠른 성장을 경험했음을 알 수 있습니다. 브롱스는 블록 당 가장 많은 나무를 추가했고, 스테튼 아일랜드와 비슷한 수의 인구를 블록 당 추가했습니다. 스테튼 아일랜드의 중앙 센서스 트랙트는 브롱스의 거의 5배 크기입니다. 브루클린은 브롱스의 두 배 이상인 720개의 센서스 트랙트를 가지고 가장 많은 나무와 인구를 추가했습니다. 퀸즈는 가장 낮은 중앙 값 증가율을 보여주었는데, 그로 인해 나는 각 자치구별 통계를 자세히 살펴보게 되었습니다. 나무와/또는 인구가 감소한 트랙트의 소수를 중점적으로 살펴보니 몇 가지 추가적인 맥락을 얻을 수 있었습니다.

다섯 자치구 중에서 퀸즈가 나무 총 수가 감소한 센서스 트랙트 비율이 가장 높았으며, 브롱스는 10%로 가장 낮았습니다. 흥미로운 점은 브롱스를 제외한 모든 자치구에서 나무를 잃은 대부분의 트랙트가 전체적으로 인구 증가를 경험했다는 것입니다.

맨해튼에서는 센서스 트랙트의 34%가 인구 감소를 경험했지만, 그 트랙트 중 거의 80%에 공원이 추가되었습니다. 종합하면, 몇 가지 트렌드가 나타납니다: 맨해튼의 도시림이 상당히 증가했지만, 우연히도 인구 재배치는 UHI(도시 열섬) 리스크가 실질적으로 줄었음에도 불구하고, 이 혜택이 공간 또는 인구통계에 공평하게 분배되지 않았다는 점을 의미합니다.

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

퀸즈(Queens) 지역에서는 인구가 증가하고 나무가 줄어든 센서스 트랙트(census tracts)의 높은 비율(21%)은 새 주택 개발의 결과일 수 있지만, 이 가설을 확인하기 위해 추가 연구가 필요합니다.

![이미지](/assets/img/2024-06-19-VisualizingStreetTreePopulationVarianceinNYCUsingGeoPandasPlotlyandJavaScript_5.png)

이러한 변화의 공간 분포를 살펴보면, 맨해튼(Manhattan), 퀸즈(Queens) 및 브루클린(Brooklyn)에서 나무 심는 노력의 불일치가 확인되며, 특히 각 자치구 내의 분산이 가장 크다는 것을 보여줍니다. 맨해튼(Manhattan)에서는 센트럴 파크(Central Park) 북쪽의 트랙트에서 그 자치구의 대다수 나무가 심어지는 반면, 그 공원 남쪽 및 동쪽에 위치한 트랙트들은 대부분 나무를 유지하거나 순수한 거리의 나무가 감소했습니다.

브루클린(Brooklyn)에서는 전체 자치구 곳곳에 나무가 심어졌지만, Prospect Park 북쪽 및 동쪽 트랙트에 대부분의 나무가 심어졌으며, 나무가 감소한 소수의 트랙트는 대부분 공원 남쪽에 거의 일체로 위치해 있습니다.

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

퀸즈 지역에서는 나무 인구 변화가 하이퍼로컬라이즈되었습니다. 잭슨 하이츠와 아스토리아 같은 특정 지역과 남쪽의 글렌데일, 리치몬드 힐 및 오존 파크는 대부분의 지역이 도시 나무 인구 수가 정체되거나 약간 증가하는 반면 가로수의 인구가 감소하는 극적인 변화가 있었습니다. 스태튼 아일랜드는 전체적으로 나무를 추가했지만, 남단 브롱스의 급증 비율보다는 낮은 속도로 나무를 추가했습니다. 이러한 특이점 중 하나는 리버데일을 제외한 대부분의 센서스 지역에서 나무 인구가 크게 증가했습니다.

1995년의 코로플렛을 살펴보면, 도시의 나무 심기 노력이 대부분 가로수가 부족한 지역에 집중되었음을 알 수 있습니다. 특히 남쪽 브롱스와 북부 맨하탄 지역이 그 예시입니다. 또한, 퀸즈 지역의 이전에 가장 극단적인 산림파괴를 경험한 지역들이기도 하면서 1995년에는 상대적으로 많은 가로수가 있는 지역이었습니다.

1995년부터 2015년까지의 나무 심기와 제거 작업을 종합하면 도시 전체적으로 가로수의 풍부함이 균등해졌습니다. 이는 두 해의 블록 당 나무 히스토그램을 비교함으로써 확인할 수 있습니다:

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

![image1](/assets/img/2024-06-19-VisualizingStreetTreePopulationVarianceinNYCUsingGeoPandasPlotlyandJavaScript_7.png)

![image2](/assets/img/2024-06-19-VisualizingStreetTreePopulationVarianceinNYCUsingGeoPandasPlotlyandJavaScript_8.png)

환경 정의 측면에서, 지난 20년간의 나무 심는 노력은 확실히 시내 전역에서 레드라인의 시각적 유산을 줄였습니다. 리치먼드 대학의 역사적 레드라인 지도와 1995년의 거리 나무 분포를 비교하면 수십 년 전에 내린 결정이 지금까지도 도시 지리를 지속적으로 영향을 미치고 있다는 것을 명확히 보여줍니다:

![image3](/assets/img/2024-06-19-VisualizingStreetTreePopulationVarianceinNYCUsingGeoPandasPlotlyandJavaScript_9.png)

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

<img src="/assets/img/2024-06-19-VisualizingStreetTreePopulationVarianceinNYCUsingGeoPandasPlotlyandJavaScript_10.png" />

트리가 풍부한 거리를 완벽하게 대변하는 것은 아니지만, 레드라인 지역 여부와 그에 포함된 나무 수 간에는 분명한 관계가 있었습니다. 그러나 2015년까지 는 20년 동안의 주로 적은 숲이 있는 지역을 대상으로 한 거리에 나무를 심는 노력을 통해 이 상관관계가 줄어든 것을 알 수 있습니다. 아래에서 확인할 수 있습니다.

<img src="/assets/img/2024-06-19-VisualizingStreetTreePopulationVarianceinNYCUsingGeoPandasPlotlyandJavaScript_11.png" />

새로 심은 나무들은 적어도 한 측면에서 역사적인 잘못을 해소하는 데 성공했지만, 이러한 노력의 사회적 영향이 오로지 좋은 것만은 아닙니다. 상대적으로 신속한 도시 녹화는 분명히 만약 뉴욕(특히 맨해튼과 브루클린) 전역에서 특별히 내달리피케이션을 가속합니다.

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

다양한 연구에서는 도시 내 녹지 공간의 증가와 젠트리피케이션 사이에 인과 관계를 발견했으며, NYC의 데이터를 보다 자세히 살펴보면 이 연결이 명백해집니다. Urban Displacement Project의 NYC에서의 젠트리피케이션과 이주 문제 지도는 1995년부터 2015년까지 가장 많은 나무를 심은 지역이 젠트리피케이션을 겪고 있는 동시에 저소득 가구를 이주하고 있다는 것을 보여줍니다.

나무를 추가하면서 인구가 감소한 지역만 나타내는 지도는 부시윅, 크라운 하이츠, 윌리엄스버그, 아스토리아, 이스트 할렘, 워싱턴 하이츠, 그리고 사우스 브롱스와 같은 젠트리피케이션의 요충지를 강조합니다.

또한, 블록 당 나무 수와 블록 당 인구 변화의 도시 전체 이차원 히스토그램은 인구 밀도와 나무 수 모두 약간 증가하는 대부분의 센서스 트랙트들의 거의 정규 분포를 보여줍니다.

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

![Visualization 1](/assets/img/2024-06-19-VisualizingStreetTreePopulationVarianceinNYCUsingGeoPandasPlotlyandJavaScript_13.png)

When this distribution is mapped according to the borough, however, vast differences can be observed between boroughs.

![Visualization 2](/assets/img/2024-06-19-VisualizingStreetTreePopulationVarianceinNYCUsingGeoPandasPlotlyandJavaScript_14.png)

As is shown above, Queens and Brooklyn had a much larger number of tracts decreasing their population density in the sampled period than did Staten Island, Manhattan, and the Bronx.

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

이 변경은 퀸즈의 나무 밀도 변화와는 독립적으로 일어났지만, 브루클린에서는 거리에 심겨진 나무의 증가와 함께 주로 발생했습니다.

인구 밀도 감소는 일대 일 대응의 개발 동향을 반영하는 것은 아니지만, 연구에 따르면 인구 밀도 감소는 가구 규모 축소에서 비롯된 도심 내 개발 현상의 결과입니다. 특히 브루클린에서는 특정 지역에서 춘추화에 기여하는 가로수 증가가 있을 확률이 높습니다.

# 그래프 만들기

프로젝트 시작부터 나는 결과물을 명확히 전달하는 가장 좋은 방법으로 나무 변화를 보여줄 수 있는 코로플레쓰 집합이 되기를 원했습니다.

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

코로플레스는 지역의 하위 구획이 일정 지표에 따라 색칠된 지리적 지도입니다. Plotly는 다양한 유형의 코로플레스를 지원하며 기본적으로 상호작용이 가능하며, 파이썬 인터페이스가 GeoPandas를 지원하여 이 프로젝트에 쉽게 사용할 수 있었습니다.

지도를 만들기 전에 해야 할 결정이 있었어요: 데이터를 분위로 나눌지 여부입니다. 기본적으로 Plotly는 숫자 값을 연속적인 데이터로 해석합니다. 이것은 많은 데이터셋에서 작동하지만 경우에 따라 이상치가 색상 척도를 심하게 왜곡시켜 데이터의 의미 있는 차이를 줄일 수 있습니다. 이 결정을 내리기 위해, 기본적으로 그래프로 사용할 '블록 당 나무 개수' 지수의 히스토그램을 살펴보았습니다.

위 그래프를 보면, 1995년에 인구 조사 구역 대부분은 블록 당 3에서 25그루의 나무를 가지고 있었습니다. 분포는 로그 정규 분포로 보이며, 범위 양 끝에 몇몇 이상한 인구 조사 구역이 있어 한 구역에서는 72그루, 다른 구역에서는 0.5그루의 나무를 가지고 있습니다. 데이터의 대다수를 더 의미 있게 나타내기 위해, 나는 그래프로 사용할 데이터를 이산적인 분위로 나누기로 결정했습니다.

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

나는 클리닝 단계에서 생성한 데이터프레임을 가져와서 px.choropleth를 사용하여 트레이스 기반 지도(즉, 배경 지도 없이)를 만들었어. 나는 지도를 뉴욕 시를 중심으로 설정하고 첫 번째 초안을 렌더링했어:

![이미지](/assets/img/2024-06-19-VisualizingStreetTreePopulationVarianceinNYCUsingGeoPandasPlotlyandJavaScript_16.png)

보다시피, 뉴욕 시의 대부분의 땅 면적이 표시되어 있어. 그럼에도 불구하고 나는 그 위에 베이스 레이어를 추가함으로써 시의 다양한 인구조사 지역을 비교하고 대조할 수 있는 능력을 향상시키고, 주요 공원의 위치를 중요하게 표시할 수 있다고 느꼈어.

개선된 지도:

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

![이미지](/assets/img/2024-06-19-VisualizingStreetTreePopulationVarianceinNYCUsingGeoPandasPlotlyandJavaScript_17.png)

이렇게 하면 더 좋아 보이고 사용자에게 데이터의 공백이 어디에 있는지 이해하는 데 도와주며 이러한 공백의 중요성을 판단할 수 있게 합니다.

지도에 있는 토목은 "블록 당 나무" 지수에 따라 색칠되어 있습니다. 하지만 이 지수와 함께 제시하고 싶었던 여러 측정 항목이 더 있어서 이를 마우스 오버 팝업에 포함시켰습니다.

![이미지](/assets/img/2024-06-19-VisualizingStreetTreePopulationVarianceinNYCUsingGeoPandasPlotlyandJavaScript_18.png)

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

제가 세 개의 그림을 만들었어요. 각각은 나무 인구 조사 연도를 나타냅니다. 추가적으로 1995년 이후 모든 통계의 누적 변화를 보여주는 추가 그림을 만들고 싶었어요. 2015년부터 1995년까지 각 인구 조사 구역의 나무 수의 차이와 2020년부터 2000년까지 해당 지역의 차이를 계산하여 '블록당 나무 변화' 및 '나무 당 인구 변화' 열을 만들었어요.

이전과 마찬가지로 '블록당 나무 변화'의 분포를 조사하고, 이를 이산화하기로 결정하고 합리적인 분위수(총 9개)를 만들었어요. 색상 척도를 분위수에 맞게 조정하고 더 많은 정보를 수용할 수 있도록 hover 템플릿을 수정했어요. 새로운 템플릿은 다음과 같아요:

마지막으로 NaN을 "-"로 대체한 다섯 번째 데이터프레임을 만들어 hover 템플릿에 전달했어요. Plotly 그래프 엔진에 전달되는 동일한 데이터프레임 내 NaN을 더 읽기 쉬운 문자로 대체하지 않으면, 이전에 설정한 이산화된 색상 구성에 문제가 발생할 수 있기 때문에 이 작업이 필요했어요.

이렇게 해서 그래프들이 완성되었어요!

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

# 모두 온라인에 올리기: Dash vs JavaScript 성능

내 프로젝트를 온라인으로 올리기로 결심했다. 사용자들이 등대를 찾아보는 작은 Dash 앱을 만들기로 했다. 슬라이더와 로딩 스피너를 추가하는 데 시간을 투자했고, 로컬 머신에서 결과에 만족한 후에 Heroku Dyno를 설정하여 앱을 테스트했다. 다른 사람들은 이 과정을 자세히 설명했다.

거의 즉시 서버 측 응답 시간에 실망했다. 내 최종 등대는 각각 14~40mb로 비교적 작았지만, 슬라이더를 이동한 후 각 개별 그래프를 수신하고 표시하는 데 Dyno가 최대 25초가 걸렸다. 이것은 일정한 3~4초의 서버 응답 시간과 매우 가변적인 12~22초의 데이터 전송 시간으로 분해되었다. 초기 로드 시간에 추가로 5~10초가 걸렸다.

내 옵션을 고려했다. Heroku가 더 나은 서비스를 위해 더 많은 돈을 지불할 수도 있었지만, 나에게는 불필요하고 게으르게 보였다. 클라이언트 측 캐싱을 추가할 수도 있었지만, 이는 초기 데이터 전달의 느리움을 해결하지 못했다. 서버의 결과를 저장하여 해당 입력이 동일한 경우에 다시 함수를 호출할 때 검색할 수 있게 하는 캐싱 유형인 메모이제이션을 추가했지만, 이것은 서버 응답 시간만 향상시키고 처리량 문제는 해결되지 않았다. 등대의 크기를 줄일 수도 있었지만, 이는 호버 박스의 정보를 대폭 줄이는 것을 의미했을 가능성이 높았다 — 이것은 나에게는 프로젝트의 목적을 완전히 잃게 되는 것으로 보였다.

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

마침내, Dash 사용을 완전히 포기하기로 결정했습니다. 사용자가 시각화되는 데이터 세트를 수정할 수 없다는 것을 깨달았기 때문에 과도한 엔지니어링을 하고 있었다는 것을 깨달았습니다. 결과적으로 서버 응답이 전혀 필요하지 않았습니다. 대신, Plotly.py가 단지 JavaScript 라이브러리 Plotly.js를 위한 Python 인터페이스일 뿐이라는 사실을 이용했습니다.

Python 전용 구현에 갇혀들지 않고, orjson을 사용하여 완성된 그림을 JSON으로 내보내고, Dash에서 구축한 기본 HTML, CSS 및 JS를 사용한 베어본 웹페이지를 복사했습니다.

생성된 웹페이지는 초기 로드 시간이 짧지만 여러 그래프 간에 전환 시 지연이 없습니다. 사용자 관점에서 봤을 때 훨씬 더 원활한 경험을 제공합니다.

Heroku 구현 사이트를 여기에서 확인할 수 있으며 JavaScript 구현을 여기에서 확인할 수 있습니다.

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

# 결론

요약하자면 다음을 발견했습니다:

- 1995년부터 2020년까지 거리의 나무와 인구 모두 전체 도시에서 증가했지만, 이러한 증가의 폭은 자치구 간 및 그 사이에 상당한 공간적 변동이 있었으며, 일부 지역은 한쪽 또는 양쪽 범주에서 큰 손실을 겪었습니다.
- 특정한 나무 심기 노력은 과거 레드라인 지역에서 열도심화 효과를 완화시켰으나, 이러한 새로운 나무들은 게트리피케이션에 기여하는 부차적 효과를 가졌습니다.

성능 측면에서 데이터를 "오프라인"으로 처리하고 결과를 저장하는 것이 매번 "온라인"으로 처리하는 것보다 나은 방법이라는 것을 발견했습니다. 즉, 정적 데이터 집합을 특징으로 하는 데이터 시각화의 경우 오프라인 구현이 항상 더 좋은 선택입니다. 이 분석은 인종, 연령, 소득 및 신규 주택 건설과 같은 추가적인 인구 변수를 포함하여 나무 심기의 사회적 영향과 패턴을 더 체계적으로 이해하는 데 확장될 수 있습니다.

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

인구 및 나무 데이터를 보간하면 이러한 변화에 대한 보다 전체적인 시간적 이해를 얻을 수 있으며, 특히 각 나무 조사 연도에 대한 보다 정확한 인구 추정을 얻을 수 있습니다.

나무 위치의 지리적 정밀도를 높이는 것으로 더 정밀한 분석을 실시할 수 있으며, 위도 및 경도 좌표 또는 LIDAR 포인트 클라우드 모델을 통해 이루어지며, 이러한 지리적 위치 데이터와 위시각화함으로써 정확한 인구 추정을 얻을 수 있을 것입니다. 지리적 정밀도

이 연구 및 분석은 도시 기획가들에게 유용할 것으로, 이들은 물리적 환경 변화가 이웃의 사회적 특성이 발전하는 데 기여할 것이라는 점을 알고 있어야 합니다.

이 프로젝트의 코드를 찾아서 GitHub에 올리고 최종 시각화를 확인할 수 있습니다.

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

당신은 제 LinkedIn에서 저를 찾을 수 있어요.
