---
title: "위성으로 보이지 않는 용암 흐름과 활활 타오르는 산불을 어떻게 포착할 수 있을까 Python 사용법"
description: ""
coverImage: "/TIL/assets/img/2024-07-12-SatellitesCanSeeInvisibleLavaFlowsandActiveWildfiresButHowPython_0.png"
date: 2024-07-12 20:44
ogImage: 
  url: /TIL/assets/img/2024-07-12-SatellitesCanSeeInvisibleLavaFlowsandActiveWildfiresButHowPython_0.png
tag: Tech
originalTitle: "Satellites Can See Invisible Lava Flows and Active Wildfires, But How? (Python)"
link: "https://medium.com/towards-data-science/satellites-can-see-invisible-lava-flows-and-active-wildires-but-how-python-371915464d1c"
---


<img src="/TIL/assets/img/2024-07-12-SatellitesCanSeeInvisibleLavaFlowsandActiveWildfiresButHowPython_0.png" />

# 목차

- 🌟 소개
- 🔍 Sentinel-2 (분광대역)
- 🌐 Sentinel-2 이미지 다운로드
- ⚙️ Sentinel-2 이미지 처리 (클리핑 및 리샘플링)
- 🌋 Sentinel-2 이미지 시각화 (화산)
- 🔥 Sentinel-2 이미지 시각화 (산불)
- 📄 결론
- 📚 참고 자료

## 🌟 소개

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

알고 계실지 모르겠지만, 우리 눈은 가시 영역(파란색, 녹색, 빨간색의 밴드)의 물체만 볼 수 있어요. 하지만 빛이 물체에 닿아 반사되면, 적외선과 같은 다른 스펙트럼 영역의 정보도 담고 있어요. 적외선 빛은 짙은 가스, 예를 들어 연기와 같은 것을 통과해 명확한 시야를 제공하죠. 하지만 우리 눈은 일부 동물들(뱀 등)과 달리 적외선 영역에 있는 물체를 보지 못해요. 지난 수십 년 동안 적외선 빛을 탐지하는 센서 개발에 상당한 진전이 있었어요. 이러한 센서들은 실용적인 응용에 활용되고 있어요.

나는 항상 위성이 가시 영역에서는 볼 수 없는 적외선 영역에서 중요한 정보를 감지할 수 있는 좋은 예시를 찾고 있었어요. 지난 주에는 2023년 12월 이후 세 번째로 활동을 시작한 아이슬란드 화산에 대해 읽었어요. 그것은 나에게 위성이 촬영한 화산의 이미지를 확인하고 싶다는 생각을 일으켰어요. 나는 운이 좋아서 화산으로부터 올라오는 연기를 보여주는 선명한 위성 이미지를 발견할 수 있다면 좋겠다고 바랬어요. 그것은 가시 영역에서 빛이 흩어지는 것과 적외선 영역에서 연기를 통과해 용암 흐름을 드러내는 모습을 보여줄 수 있는 완벽한 예시가 될 것 같았죠.

내가 확인한 여러 위성 중 하나가 완벽한 타이밍으로 있었어요! 화산은 2월 8일 목요일 아침에 폭발했고, Sentinel-2가 2월 8일 정오쯤에 지나갔어요. 나는 이것이 위성 이미지가 가시 영역에선 흐리더라도 적외선 영역의 센서로 장착된 위성 이미지가 우리에게 화산을 모니터링하고 화산재를 탐지하는 데 어떻게 도움이 되는지 보여주는 완벽한 예시가 될 수 있다고 생각했어요.

매우 짙은 연기가 있는 상황에서 적외선 밴드의 응용을 탐구하려고, 나는 캘리포니아에서 발생한 2020년 최대 화재 중 하나를 캡처한 또 다른 Sentinel-2 이미지를 시각화하기로 결정했어요.

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

이 이야기에서는 아이슬란드 레이키아네스 반도의 화산과 2020년 캘리포니아의 크릭 파이어를 위해 캡처된 두 개의 센티넬-2 이미지를 다운로드할 것입니다. 우리는 파이썬을 사용하여 이 두 이미지를 시각화하기 위해 시각적 및 적외선 지역의 다른 밴드 조합을 사용할 것입니다. 적외선 정보가 활동 중인 용암 흐름 및 화재 지점을 보여줄 수 있음을 알 수 있을 것입니다. 이것이 흥미롭게 들린다면 계속 읽어보세요!

## 🔍 센티넬-2 (분광대 업무)

센티넬-2 미션은 유럽 우주국 (ESA)가 Copernicus 프로그램의 일환으로 개발한 쌍둥이 위성인 센티넬-2A와 센티넬-2B로 구성되어 있습니다. 센티넬-2 위성에는 데이터를 캡처하는 다중 스펙트럼 장비가 있습니다. 각 밴드는 특정 파장 범위를 갖고 있어 다양한 지구 관측 응용프로그램을 지원합니다. 이 게시물에서는 가시 지역의 밴드와 적외선 영역의 세 개의 밴드를 사용할 것입니다. 여기에는 이러한 밴드 목록이 있습니다:
Band 2 (Blue): 496.6 nm
Band 3 (Green): 560.0 nm
Band 4 (Red): 664.5 nm
Band 8 (NIR - 근적외선): 835.1 nm
Band 11 (SWIR1- 단파 적외선): 1613.7 nm
Band 12 (SWIR2- 단파 적외선): 2202.4 nm

Band 2 (Blue), 3 (Green), 4 (Red), 및 8 (NIR)의 공간 해상도는 10 미터이며, Band 11 및 12 (단파 적외선)은 20 미터입니다. 이는 화산 및 산불을 시각화하는 데 충분합니다.

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

## 🌐 센티넬-2 이미지 다운로드

이미 Python 및 R에서 센티넬-2 이미지를 다운로드하는 두 가지 튜토리얼을 작성했어요. 회원가입하는 방법, 자격 증명을 설정하고 이미지를 다운로드하는 방법을 알고 싶다면, 다음 게시물들을 참조하세요. 이번 게시물에서 이미지 다운로드를 위한 코드의 필요한 수정 사항을 설명했습니다:

해당 스크립트를 바탕으로 관심 영역의 좌표, 이미지 날짜, 그리고 화산 및 산불을 위한 파란색, 녹색, 빨간색, 근적외선 및 단파대역을 다운로드해야 합니다.

각 사례에 필요한 정보는 다음과 같아요:

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

## 아이슬란드 화산:

```js
위성 = "SENTINEL-2"
레벨 = "S2MSI1C"

관심지점 = "POINT(-22.411503 63.892295)"

시작일 = "2024-02-07"
종료일 = "2024-02-10"
```
## 크리크 산불:

```js
위성 = "SENTINEL-2"
레벨 = "S2MSI1C"

관심지점 = "POINT(-119.26 37.1914)"

시작일 = "2020-09-07"
종료일 = "2020-09-10"
```

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

이슬란드 화산:

![이슬란드 화산](/TIL/assets/img/2024-07-12-SatellitesCanSeeInvisibleLavaFlowsandActiveWildfiresButHowPython_1.png)

화산 분화는 현지 시간으로 2월 8일 목요일 오전 5시 30분에 발생했으며, 화면 캡처에 표시된 바와 같이 분화 후 정확히 7시간 후인 2월 8일 13:03 UTC(현지 시간 12시 30분)에 촬영된 이미지가 하나만 가능합니다.

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

## 크릭 파이어:

![크릭 파이어](/TIL/assets/img/2024-07-12-SatellitesCanSeeInvisibleLavaFlowsandActiveWildfiresButHowPython_2.png)

크릭 파이어는 9월 4일에 발생했으며 12월 24일에 소멸되었습니다. 목록의 두 이미지 모두 8일에 촬영되었습니다 (산불 발생 후 4일이 지난 후), 그러나 두 번째 이미지의 컨텐츠 길이는 0입니다. 따라서, 이 게시물에서는 첫 번째 이미지 (S2A_MSIL1C_20200908T183921_N0500_R070_T11SKB_20230309T124945)를 사용하겠습니다.

두 블로그 게시물에서 Sentinel-2 이미지를 다운로드하는 코드를 실행하기 전에 시각 영역 (파랑, 초록, 빨강)에서 세 개의 밴드와 적외선 영역 (근적외선 및 단파적 외선 밴드)에서 세 개의 밴드를 포함해야 합니다. 다음 라인은 이러한 밴드에 해당됩니다:

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

```python
f"{product_name}/{root[0][0][12][0][0][12].text}.jp2" # Blue
f"{product_name}/{root[0][0][12][0][0][12].text}.jp2" # Green
f"{product_name}/{root[0][0][12][0][0][12].text}.jp2" # Red
f"{product_name}/{root[0][0][12][0][0][12].text}.jp2" # Near-infrared
f"{product_name}/{root[0][0][12][0][0][12].text}.jp2" # Shortwave infrared-1
f"{product_name}/{root[0][0][12][0][0][12].text}.jp2" # Shortwave infrared-2
```

위 단계를 올바르게 따라왔다면, 각 예제당 아래 파일들이 디렉토리에 저장되어 있어야 합니다:

## 아이슬란드 화산:

<img src="/TIL/assets/img/2024-07-12-SatellitesCanSeeInvisibleLavaFlowsandActiveWildfiresButHowPython_3.png" />


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

## Creek Fire:

![Creek Fire Image](/TIL/assets/img/2024-07-12-SatellitesCanSeeInvisibleLavaFlowsandActiveWildfiresButHowPython_4.png)

⚙️ Processing Sentinel-2 Images (Clipping and Downscaling)

After downloading those images, we need to clip each band for the area of interest (AOI) around the volcano and the wildfire. Since we have the coordinates for each incident, we can create a buffer polygon (3 km for the volcano and 10 km for the wildfire) using this function:

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

```js
import math

def calculate_new_coordinates(center_lat, center_lon, distance, bearing):
    # 지구 반지름 (킬로미터)
    earth_radius = 6371.0

    # 좌표를 라디안으로 변환
    center_lat_rad = math.radians(center_lat)
    center_lon_rad = math.radians(center_lon)

    # 새로운 위도 계산
    new_lat_rad = math.asin(math.sin(center_lat_rad) * math.cos(distance / earth_radius) +
                            math.cos(center_lat_rad) * math.sin(distance / earth_radius) * math.cos(bearing))

    # 새로운 경도 계산
    new_lon_rad = center_lon_rad + math.atan2(math.sin(bearing) * math.sin(distance / earth_radius) * math.cos(center_lat_rad),
                                              math.cos(distance / earth_radius) - math.sin(center_lat_rad) * math.sin(new_lat_rad))

    # 다시 도 단위로 변환
    new_lat = math.degrees(new_lat_rad)
    new_lon = math.degrees(new_lon_rad)

    return new_lon, new_lat 
```

## 아이슬란드 화산(AOI)을 위해 위의 함수 사용하기:

```js
# 중심 좌표
center_lat = 63.892295
center_lon = -22.411503

# 버퍼 거리 (킬로미터)
buffer_distance = 3

# 네 모퉁이의 좌표 계산
north_lon, north_lat = calculate_new_coordinates(center_lat, center_lon, buffer_distance, 0)
south_lon, south_lat = calculate_new_coordinates(center_lat, center_lon, buffer_distance, math.pi)
east_lon, east_lat = calculate_new_coordinates(center_lat, center_lon, buffer_distance, math.pi / 2)
west_lon, west_lat = calculate_new_coordinates(center_lat, center_lon, buffer_distance, -math.pi / 2)

# 원하는 형식으로 좌표 출력
print(f"({west_lon:.4f} {north_lat:.4f}, {east_lon:.4f} {north_lat:.4f}, {east_lon:.4f} {south_lat:.4f}, {west_lon:.4f} {south_lat:.4f}, {west_lon:.4f} {north_lat:.4f})")
```

```js
# 출력:
(-22.4728 63.9193, -22.3502 63.9193, -22.3502 63.8653, -22.4728 63.8653, -22.4728 63.9193)
```

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

## Creek Fire (AOI)에 대한 위의 함수를 사용하십시오:

```js
# 중심 좌표
center_lat = 37.19147
center_lon = -119.261175

# 킬로미터 단위의 버퍼 거리
buffer_distance = 10

# 네 꼭지점의 좌표 계산
north_lon, north_lat = calculate_new_coordinates(center_lat, center_lon, buffer_distance, 0)
south_lon, south_lat = calculate_new_coordinates(center_lat, center_lon, buffer_distance, math.pi)
east_lon, east_lat = calculate_new_coordinates(center_lat, center_lon, buffer_distance, math.pi / 2)
west_lon, west_lat = calculate_new_coordinates(center_lat, center_lon, buffer_distance, -math.pi / 2)

# 원하는 형식으로 좌표 출력
print(f"({west_lon:.4f} {north_lat:.4f}, {east_lon:.4f} {north_lat:.4f}, {east_lon:.4f} {south_lat:.4f}, {west_lon:.4f} {south_lat:.4f}, {west_lon:.4f} {north_lat:.4f})")
```

```js
# 결과:
(-119.3741 37.2814, -119.1483 37.2814, -119.1483 37.1015, -119.3741 37.1015, -119.3741 37.2814)
```

그런 다음 jp2 파일을 클리핑하기 위해 "aoi_polygon_wkt"에 이러한 좌표를 사용할 수 있습니다. 이는 본 게시물의 "AOI에 스택 형식으로 변환하고 클리핑하기" 섹션에서 설명한 대로입니다.

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

```js
# Volcano: 다각형 WKT
aoi_polygon_wkt = "POLYGON ((-22.4728 63.9193, -22.3502 63.9193, -22.3502 63.8653, -22.4728 63.8653, -22.4728 63.9193))"

# Wildfire: 다각형 WKT
aoi_polygon_wkt = "POLYGON ((-119.3741 37.2814, -119.1483 37.2814, -119.1483 37.1015, -119.3741 37.1015, -119.3741 37.2814))"
```

이 다각형들을 사용하여 JP2 파일을 AOI에 맞게 자를 수 있습니다. 그러나 시각화 부분에서 이 레이어를 쌓기 전에, 다른 밴드들 (파랑, 녹색, 빨강 및 근적외선)의 크기와 호환되도록 단파적적 적외선 밴드를 20m에서 10m로 축소해야 합니다. 이를 수행하는 함수는 다음과 같습니다:

```js
import rasterio
from scipy.ndimage import zoom

def downscale_raster(input_path, output_path, scale_factor):
    with rasterio.open(input_path) as src:
        # 데이터 읽기
        data = src.read(1)

        # 새로운 치수 계산
        new_height = int(src.height / scale_factor)
        new_width = int(src.width / scale_factor)

        # 리샘플링을 위해 scipy의 zoom 함수 사용
        resampled_data = zoom(data, 1/scale_factor, order=3)

        # 새 래스터의 메타데이터 업데이트
        transform = src.transform * src.transform.scale(
            (src.width / resampled_data.shape[1]),
            (src.height / resampled_data.shape[0])
        )

        new_profile = src.profile
        new_profile.update({
            'driver': 'JP2OpenJPEG',
            'height': new_height,
            'width': new_width,
            'transform': transform
        })

        # 새 파일에 리샘플된 래스터 작성
        with rasterio.open(output_path, 'w', **new_profile) as dst:
            dst.write(resampled_data, 1)
```

그런 다음, 각 사용 사례에 대해 20m에서 10m로 단파 밴드를 축소하는 데 이 함수를 적용할 수 있습니다.

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

## 아이슬란드 화산에 대한 위 함수 사용:

```js
# 사용법
input_band_path_B11 = "/content/T27VVL_20240208T130311_B11.jp2"
output_band_path_B11 = "/content/T27VVL_20240208T130311_B11_resampled.jp2"

input_band_path_B12 = "/content/T27VVL_20240208T130311_B12.jp2"
output_band_path_B12 = "/content/T27VVL_20240208T130311_B12_resampled.jp2"

scale_factor = 1/2  # 20m to 10m

downscale_raster(input_band_path_B11, output_band_path_B11, scale_factor)
downscale_raster(input_band_path_B12, output_band_path_B12, scale_factor)
```

## 크릭 파이어에 대한 위 함수 사용:

```js
# 사용법
input_band_path_B11 = "/content/T11SKB_20200908T183921_B11.jp2"
output_band_path_B11 = "/content/T11SKB_20200908T183921_B11_resampled.jp2"

input_band_path_B12 = "/content/T11SKB_20200908T183921_B12.jp2"
output_band_path_B12 = "/content/T11SKB_20200908T183921_B12_resampled.jp2"

scale_factor = 1/2  # 20m to 10m

downscale_raster(input_band_path_B11, output_band_path_B11, scale_factor)
downscale_raster(input_band_path_B12, output_band_path_B12, scale_factor)
```

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

이 단계를 마치면 디렉토리에 두 개의 파일이 더 생겼어요:

## Iceland Volcano:

![Iceland Volcano](/TIL/assets/img/2024-07-12-SatellitesCanSeeInvisibleLavaFlowsandActiveWildfiresButHowPython_5.png)

## Creek Fire:

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

<img src="/TIL/assets/img/2024-07-12-SatellitesCanSeeInvisibleLavaFlowsandActiveWildfiresButHowPython_6.png" />

같은 차원의 모든 밴드를 가지고 있으므로 이제 이 게시물의 "스택, Geotiff로 변환한 다음 AOI( TOA)에 자르기" 섹션을 기반으로 스택 파일을 생성할 수 있습니다.

## 🌋 센티넬-2 이미지 시각화 (화산)

이제 화산 사건을 위한 하나의 스택 파일과 산불 사건을 위한 다른 하나의 스택 파일이 있다면, 각각을 다른 밴드 조합을 사용하여 플로팅할 수 있습니다. 구체적으로, 우리는 세 가지 플롯을 만들 것입니다. 하나는 오직 가시적인 밴드(빨강, 초록, 파랑)을 기반으로 하고, 다른 하나는 가시적 및 근적외선 밴드(초록, 빨강, 그리고 근적외선)의 결합을 기반으로 하며, 세 번째는 적외선 영역에만 초점을 맞춘 것입니다(근적외선 및 단파 밴드) 데이터를 적외선 영역의 데이터를 생략한다면 어떤 정보를 놓칠 수 있는지 이해하기 위함입니다. 아래에 표시된 플롯과 비슷한 플롯을 생성하려면 이 게시물의 "TOA 및 표면 반사 이미지의 실제 색상 플로팅" 섹션을 참조하실 수 있습니다.

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

## 아이슬란드 화산:

![아이슬란드 화산](/TIL/assets/img/2024-07-12-SatellitesCanSeeInvisibleLavaFlowsandActiveWildfiresButHowPython_7.png)

이 그림은 시각적 영역에서 기록된 것으로, 화산 주변에 용암이 퍼져 있음을 볼 수 있습니다 (검은 픽셀), 화산의 연기 기둥, 그리고 몇 가지 매우 작은 빨간색 영역은 활성 용암을 보여줍니다. 앞에서 언급한 대로, 시각 대역에서 빛은 쉽게 산란되어, 우리는 이 이미지에서 연기 기둥을 흰색 픽셀로 볼 수 있습니다. 시각 대역에서 빛의 산란은 물체를 가리는데, 연기 아래에 있는 활성 용암을 관측하기 어렵게 만듭니다. 스크립트의 밝기를 제어하는 이득 매개변수를 조정해도 (스크립트의 이득 매개변수), 서쪽으로 흐르는 용암 흐름만 볼 수 있습니다:

![활성 용암을 볼 수 있나요?](/TIL/assets/img/2024-07-12-SatellitesCanSeeInvisibleLavaFlowsandActiveWildfiresButHowPython_8.png)

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

가시 스펙트럼에서 조정된 이득 매개 변수로 인해 화산재가 서쪽으로 이동하는 것을 더 명확하게 볼 수 있습니다. 하지만 여전히 연기 구름 아래에서 무슨 일이 일어나고 있는지는 모릅니다. 이번에는 근적외선 정보를 추가하여 이미지를 다시 그려보겠습니다.

![image](/TIL/assets/img/2024-07-12-SatellitesCanSeeInvisibleLavaFlowsandActiveWildfiresButHowPython_9.png)

이것을 통해 해당 시간에 두 개의 활동적인 용암 흐름이 있었음을 알 수 있습니다. 하나는 서쪽으로 향하는 것으로서 가시 스펙트럼에서 어느 정도 감지할 수 있었으며, 다른 하나는 남쪽으로 이동하고 있었는데 이는 근적외선 빛을 통해 확인되었습니다. 남쪽으로 향하는 흐름은 그리인다비크 근처에 있었는데, 해당 지역은 이전 11월의 분출 이후 대피된 지역입니다.

소개에서 언급했지만, 이에 대한 주요 이유는 적외선 빛이 가시 파장 대비 더 긴 파장을 가지고 있다는 것입니다. 이것은 가시 파장과 달리 미립자와 같은 미립현을 통과하여 흩어지지 않고 밀집된 가스와 연기를 통과할 수 있게 합니다.

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

앞으로 나아가서 이미지를 다시 그려봅시다. 이번에는 단파적 초적외선 및 근적외선 대역만 사용하겠습니다:

![image](/TIL/assets/img/2024-07-12-SatellitesCanSeeInvisibleLavaFlowsandActiveWildfiresButHowPython_10.png)

단파적 초적외선을 추가함으로써 이미지에 또 다른 정보가 더해졌음을 확인할 수 있습니다. 화산재를 나타내는 더 밝은 픽셀에 더해, 첫 번째와 두 번째 이미지의 검은 용암이 이제 두 영역으로 분리되었음을 보실 수 있습니다: 붉은색과 검은색. 붉은 영역은 새롭게 화재가 발생한 지역을 나타내며, 단파적 대역에서 더 많이 반사되는 온한 용암을 포함하고 있을 가능성이 높습니다. 나머지 부분은 활동이 없는 용암을 보여줍니다.

## 🔥 Sentinel-2 이미지 시각화 (산불)

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

이전 섹션과 유사하게, 화재를 위한 센티넬-2 이미지를 플로팅할 것인데요. 이를 위해 가시 파장대 (적색, 청색, 녹색), 가시 및 근적외선 파장대 (녹색, 적색, 근적외선), 그리고 적외선 파장대(단파 및 근적외선)을 결합하여 사용할 거에요. 우선 가시 영역부터 시작해보죠:

![Sentinel-2 이미지](/TIL/assets/img/2024-07-12-SatellitesCanSeeInvisibleLavaFlowsandActiveWildfiresButHowPython_11.png)

이 사진은 Creek Fire를 위한 가시 파장대를 사용해 촬영한 센티넬-2 이미지입니다. 앞서 언급한 대로 이 지역에서 빛은 쉽게 산란되기 때문에, 보이는 것은 불타는 지역으로부터 대기로 솟아 오르는 매우 밀도 높은 연기 구름뿐입니다. 그러나 화산 예시와 같이, 적외선 영역의 빛은 연기로 투과할 수 있어 가시 영역에서 보이지 않는 것을 드러낼 수 있습니다. 연기 속 상황을 평가하기 위해, 가까운 적외선과 가시 파장대를 사용해 이미지를 플로팅하여 연기 아래에서 무슨 일이 일어나고 있는지 알아봅시다:

![Sentinel-2 이미지](/TIL/assets/img/2024-07-12-SatellitesCanSeeInvisibleLavaFlowsandActiveWildfiresButHowPython_12.png)

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

별 차이가 없네요!!

여기에 설명된 대로, 화산 상황과는 달리 근적외선은 가시적인 대역과 유사하게 산란되어 연기 아래에서 무슨 일이 일어나는지 밝혀내기에 유용하지 않았습니다. Sentinel-2에는 근적외선보다 파장이 긴 두 개의 단파장 적외선 대역이 있기 때문에, 이 이미지를 그 두 개의 단파장 적외선 대역과 근적외선을 사용하여 한 번 더 그려보고 시각화에서 가시 대역을 제거했습니다:

![이미지](/TIL/assets/img/2024-07-12-SatellitesCanSeeInvisibleLavaFlowsandActiveWildfiresButHowPython_13.png)

인상적이지 않나요?

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

단파적 적외선 대역은 짙은 연기를 관통하여 불 타는 지역(반짝이고 황금빛 픽셀)을 굵은 연기층 아래서 보여줄 수 있었습니다. 이러한 지역을 찾는 것은 적외선 대역만으로 또는 가시적 및 근적외선 영역의 조합으로는 볼 수 없었던 것들을 고 관리 및 산불 모니터링에 중요할 수 있습니다.

마지막 단계로, 이들을 함께 모아서 이 템플릿을 사용하여 예시별 이미지를 옆에 놓고 그림을 그리겠습니다:

```js
import rasterio
import numpy as np
import matplotlib.pyplot as plt

# 쌓인 이미지 플로팅
with rasterio.open("stacked_TOA.tif") as src:
    # 밴드 인덱스 정의
    blue_band = 1
    green_band = 2
    red_band = 3
    nir_band = 4
    swir1_band = 5
    swir2_band = 6

    # 밴드 읽기
    red = src.read(red_band)
    green = src.read(green_band)
    blue = src.read(blue_band)
    nir = src.read(nir_band)
    swir1 = src.read(swir1_band)
    swir2 = src.read(swir2_band)

    # 게인 적용
    gain = 2
    red_n = np.clip(red * gain / 10000, 0, 1)
    green_n = np.clip(green * gain / 10000, 0, 1)
    blue_n = np.clip(blue * gain / 10000, 0, 1)
    nir_n = np.clip(nir * gain / 10000, 0, 1)
    swir1_n = np.clip(swir1 * gain / 10000, 0, 1)
    swir2_n = np.clip(swir2 * gain / 10000, 0, 1)

    # 다른 컴포지트 생성
    rgb_composite = np.dstack((red_n, green_n, blue_n))
    nir_composite = np.dstack((nir_n, red_n, green_n))
    swir_composite = np.dstack((swir2_n, swir1_n, nir_n))

    # 컴포지트 플로팅
    plt.figure(figsize=(24, 8))

    plt.subplot(131)
    plt.title('Red, Green and Blue', fontsize=18, fontweight='bold')
    plt.imshow(rgb_composite)
    plt.axis('off')

    plt.subplot(132)
    plt.title('Near-infrared, Red, Green', fontsize=18, fontweight='bold')
    plt.imshow(nir_composite)
    plt.axis('off')

    plt.subplot(133)
    plt.title('Infrared Bands: Shortwave and Near-infrared', fontsize=18, fontweight='bold')
    plt.imshow(swir_composite)
    plt.axis('off')
    
    # 플롯 저장
    plt.savefig('composite_plot.png')

    plt.show()
```

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

<img src="/TIL/assets/img/2024-07-12-SatellitesCanSeeInvisibleLavaFlowsandActiveWildfiresButHowPython_14.png" />

<img src="/TIL/assets/img/2024-07-12-SatellitesCanSeeInvisibleLavaFlowsandActiveWildfiresButHowPython_15.png" />

Sentinel-2 섹션에서 언급했듯이, 이 위성은 13개의 밴드를 가지고 있으며, 이 중 9개는 적외선 영역에 해당됩니다. 우리는 연기 아래 숨겨진 물체들을 드러내기 위해 적외선 영역의 세 밴드만 사용했습니다. 다른 적외선 밴드들인 레드 엣지(Band 5, 6, 7, 그리고 8A)를 사용하여 용암이나 화재가 발생한 지역의 시각화를 탐색해보세요. 그 결과에 미치는 영향을 관찰해보세요.

## 📄 결론

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

이미지 비교 — 하나는 가시 영역에서 촬영되었고 다른 것들은 적외선 대역에서 촬영된 것입니다. 이 비교를 통해 다양한 전자기 스펙트럼에서 눈과 센서를 가지고 있는 능력과 중요성이 드러났습니다. 적외선 데이터의 추가적인 레이어는 RGB 이미지에서 보이지 않던 활성화된 용암 흐름과 화재 지역을 명확하게 식별하고 매핑할 수 있게 해줍니다. 가시광에 비해 적외선 대역의 우수한 침투력은 센서가 연기로 가려져있는 활성 용암과 활성 화재와 같은 물체의 존재를 감지할 수 있게 합니다. 이 능력은 이러한 사건들의 잠재적 위험을 평가하고 재난 완화를 위한 적시의 결정을 내릴 수 있는 능력을 향상시킵니다.

## 📚 참고 자료

Copernicus Sentinel 데이터 [2024]에 대한 Sentinel 데이터

Copernicus 서비스 정보 [2024]에 대한 Copernicus 서비스 정보

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

📱 저와 더 많은 콘텐츠를 공유하기 위해 다른 플랫폼에서 저와 연결해보세요! LinkedIn, ResearchGate, Github, 그리고 Twitter.

이 링크를 통해 확인할 수 있는 관련 게시물이 있습니다: