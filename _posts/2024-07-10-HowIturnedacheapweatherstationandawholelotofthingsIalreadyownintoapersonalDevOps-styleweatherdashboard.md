---
title: "저렴한 기상 관측 장비와 집에 있는 물건들로 DevOps 스타일 개인 날씨 대시보드 만드는 방법"
description: ""
coverImage: "/assets/img/2024-07-10-HowIturnedacheapweatherstationandawholelotofthingsIalreadyownintoapersonalDevOps-styleweatherdashboard_0.png"
date: 2024-07-10 02:33
ogImage: 
  url: /assets/img/2024-07-10-HowIturnedacheapweatherstationandawholelotofthingsIalreadyownintoapersonalDevOps-styleweatherdashboard_0.png
tag: Tech
originalTitle: "How I turned a cheap weather station (and a whole lot of things I already own) into a personal DevOps-style weather dashboard"
link: "https://medium.com/@jaxzin/how-i-turned-a-cheap-weather-station-into-a-personal-devops-dashboard-5c8820790fd5"
---


# 최종 결과

시각적으로 매력적인 부분부터 시작해보겠습니다. 아마 여기에 당신을 끌어온 부분일 것입니다. 제 대시보드가 이렇게 생겼어요...

# 레이아웃

이를 실현하기 위해 내 홈랩에는 많은 구성 요소가 있습니다. 당신의 버전은 더 간단할 수 있지만, 이 방법이 제게 효과적이었습니다. 이후 섹션에서 각 구성 요소를 자세히 살펴보겠지만, 세부 사항에 들어가기 전에 10,000피트 높이에서 시작하는 게 더 좋을 것 같아서요.

<div class="content-ad"></div>

![image](/assets/img/2024-07-10-HowIturnedacheapweatherstationandawholelotofthingsIalreadyownintoapersonalDevOps-styleweatherdashboard_0.png)

# 하드웨어

저는 이 프로젝트를 위해 집의 네트워킹 장비를 제외한 하드웨어를 사용했습니다. 이 프로젝트를 위해 구매했던 유일한 물건은 날씨 센서이고, 다른 모든 장비는 이미 소유하고 있었습니다.

- 기상 센서 — WS2032 날씨 관측소
$40–85 미국 달러, 사이트에 따라 가격이 다릅니다. 저는 rtl_433 프로젝트를 발견하고 이 장치가 지원되고 있다는 이유로 이것을 선택했습니다.
- 라디오 수신기 — RTL-SDR USB 라디오 수신기
Amazon에서 $30 미국 달러에 구입할 수 있습니다. 날씨 관측소에서 433MHz 라디오 신호를 수신하기 위해 사용됩니다. 이전 프로젝트에서 사용했던 것을 가지고 있었습니다.
- Home Assistant 실행을 위한 장비 — Home Assistant Blue
현재 판매되지 않지만 Home Assistant Yellow나 Raspberry Pi를 고려해보세요.
- Grafana와 InfluxDB 실행을 위한 장비 — Synology NAS DSM 918+
새로운 모델이 존재하며 Docker 컨테이너가 Home Assistant와 같은 장비에서 실행될 수 있습니다. 저장 공간이 더 많은 NAS에서 이 두 항목을 실행했습니다.

<div class="content-ad"></div>

# 날씨 관측소 설치하기

![날씨 관측소](https://miro.medium.com/v2/resize:fit:1280/1*BzJX0ldpzm-RtlqcEJO9KQ.gif)

이 단계는 아마 가장 쉬웠을 것입니다. WS2032 조립은 AA 건전지 두 개와 몇 개의 나사로 이루어져 있었습니다. 가격 대비, 홀 이펙트 센서로 보이는 갓과 풍향 및 풍속 센서를 감지하는 데 사용하는 Hall-effect 센서가 사용되어 제작되었어요. 온도 및 습도 센서는 건전지를 보관하는 분리 가능한 중앙 코어에 내장되어 있으며, 이 조립은 직사광선을 차단하고 층층이 설계된 열 전단 구조로 냉각되었습니다. 중앙 코어가 젖지 않도록하는 동안 주변 환경 값을 얻을 수 있도록 열심히 설계되어 있어요. 이 설정의 가장 어려운 부분은 바늘이 있는 꼭대기 부근에 명시된 정향과 일치시키는 것이었습니다. 그러나 장치에서 나오는 데이터를 보고 나니, 정확도가 45º로 제한되어 있기 때문에 나침반에 맞추는 것이 꽤 용납되었어요. WS2032에는 실내용 LCD 디스플레이 유닛이 함께 제공되며, 이를 통해 센서가 작동하고 대략적으로 정확한 데이터를 제공하는 것을 확인할 수 있었어요.

# 홈 어시스턴트 설정하기

<div class="content-ad"></div>

홈 어시스턴트 (HA) 설정 방법을 자세히 안내할 예정은 없습니다. 이미 시작할 수 있는 훌륭한 자료들이 많이 있습니다. 이 섹션에서 다룰 것은 이미 실행 중인 홈 어시스턴트에서 필요한 변경 사항입니다.

## 하지만, RTL-SDR에 대한 간단한 소개부터 시작하겠습니다

날씨 관측소가 설치되어 데이터를 보내고 있으니, 이제는 해당 데이터를 수신할 준비를 해야 합니다. rtl_433은 여러 가정 내 센서에서 데이터를 보내는 무선 주파수에 대한 신호를 구문 분석하기 위해 만들어진 오픈 소스 프로젝트입니다. 이 주파수는 433MHz가 가장 흔하지만 다른 주파수도 지원됩니다.

RF를 사용하는 장치들은 블루투스, WiFi, 지그비, Z-웨이브, 스레드 대신 사용되며, 보통 더 저렴하거나 오래된 장치이며, 현대적인 스마트 홈에 통합되도록 원래 의도된 것이 아닙니다. 가스 계량기, 수도 누수 감지기, 심지어 자동차 타이어 압력 센서 모두 rtl_433을 사용하여 감지하고 구문 분석할 수 있습니다. rtl_433는 SDR(소프트웨어 정의 라디오)라고 불리는 많이 사용되는 USB 라디오 수신기를 사용하도록 작성되었습니다.

<div class="content-ad"></div>

디지털 TV의 발명으로 인해 저렴한 칩셋이 등장하여 HDTV 신호를 해독하고 그 중 하나인 RealTek의 RTL2832U (보통 RTL로 줄여 부른다)가 해킹이 가능하다는 것이 발견되었습니다. 이를 통해 아마추어 무선 해커들이 컴퓨터로 경찰이나 공항 대역 같은 것을 디지털로 청취할 수 있게 되었고, 이를 통해 RTL-SDR 운동이 시작되었습니다.

이것이 우리를 rtl_433로 다시 이끕니다. RF 신호를 청취하고 그 데이터를 파싱하는 프로젝트인데, 이 중에는 WS2032 기상 무선기가 포함됩니다.

## rtl_433 설치

만약 이미 Home Assistant가 동작 중이라면—구체적으로 Home Assistant OS 배포판, 여기서는 이 생태계에서 Docker 컨테이너의 다른 이름인 "애드온"을 실행할 수 있는 방법들이 있는—RF 장치를 Home Assistant에 간단히 추가하는 방법 중 하나로 다음 세 개의 애드온을 실행하는 것이 가장 쉬운 방법입니다.

<div class="content-ad"></div>

- Mosquitto — 가장 간단한 설정은 이 인기 있는 MQTT 브로커에 대한 공식 애드온을 사용하는 것입니다. 만약 이 애드온을 사용한다면, 다른 두 개의 애드온은 이미 그것을 사용하도록 구성되어 있습니다. 그렇지 않으면 기존의 MQTT 브로커를 가리키도록 두 개의 애드온을 사용자 정의해야 합니다. MQTT에 대한 설명은 이 문서의 범위를 벗어나지만, 간단히 설명하면 IoT(사물 인터넷) 장치와 함께 인기 있는 메시징 플랫폼이라는 것입니다.
- rtl_433 — 이 애드온은 RTL-SDR 장치를 USB로 연결하고, RF 데이터를 감지하고 파싱하여 MQTT 메시지로 변환한 후, 여러분이 사용할 준비가 된 것에 대해 MQTT 메시지를 전송하는 역할을 합니다. 이 애드온은 표준 애드온이 아니므로, 이 애드온을 내 인스턴스에 추가하려면 먼저 GitHub 사용자 pbkhrv의 rtl_433 애드온 저장소를 추가해야 했습니다. 해당 저장소의 README에는 설치 방법에 대한 지침이 포함되어 있습니다.
- rtl_433 Home Assistant MQTT 자동 탐지 — 기본적으로 Home Assistant와 MQTT 통합을 활성화한 경우, MQTT 메시지를 자동으로 읽고 스마트 홈 장치로 조작하는 것은 시작되지 않습니다. 그러나 Home Assistant는 스마트 장치에 의해 전달되는 Home Assistant 전용 특수 MQTT 메시지 개념을 지원합니다. 이 애드온은 rtl_433 애드온으로부터 오는 MQTT 메시지를 주시하고 이를 MQTT를 통해 Home Assistant로 자동 탐지 메시지를 보내는 역할을 합니다. 이 애드온은 이전에 구성한 전체적인 rtl_433 애드온 저장소의 일부로 제공됩니다. 마지막 단계는 해당 저장소를 사용하여 이 애드온을 설치하는 것뿐입니다. 헷갈리시나요? HA에 애드온 저장소를 추가하는 것은 설치할 수 있는 새로운 애드온 인덱스를 추가하는 것과 같습니다. Home Assistant에서 사용 가능하게 된 이후에도 여전히 두 개의 애드온을 설치해야 합니다.

여기에서 마지막 한 단계는, 이미 하지 않은 경우라면, MQTT 통합을 Home Assistant에 활성화하고, 이를 Mosquitto 애드온을 가리키도록 하는 것입니다. Mosquitto 애드온의 README에는 이 설정에 대해 다루고 있지만, 명시적으로 언급하고 싶었습니다.

이 시점에서 데이터가 Home Assistant로 흘러들어가고 있어야 합니다. 개발자 도구 패널로 가서 상태 탭에서 ws2032를 검색해보세요. 다음과 같은 내용을 볼 수 있어야 합니다(단, 이름이 상세하고 "mph" 엔터티는 저 자신이 사용자 정의한 것입니다).

[이미지](https://example.com/assets/img/2024-07-10-HowIturnedacheapweatherstationandawholelotofthingsIalreadyownintoapersonalDevOps-styleweatherdashboard_1.png)

<div class="content-ad"></div>

## 엔티티 사용자 정의

위 예시에서 보는 바와 같이 배터리 읽기 값은 아마도 rtl_433 컨테이너에 의해 자동으로 발견되는 유일한 값일 것입니다. HA 대시보드에 엔티티를 추가할 때 깔끔하게 보이도록 하기 위해 각 엔티티로 가서 친숙한 이름과 아이콘을 사용자 정의했습니다. 이렇게 하면 귀찮음 없이 손쉽게 엔티티를 카드에 추가할 수 있죠.

이렇게 엔티티들을 꾸며 놓은 상태에서 제 Home Assistant 대시보드의 일반적인 카드가 어떻게 보이는지 보여드릴게요.

![Markdown 형식으로 보기](/assets/img/2024-07-10-HowIturnedacheapweatherstationandawholelotofthingsIalreadyownintoapersonalDevOps-styleweatherdashboard_2.png)

<div class="content-ad"></div>

WS2032에서 나오는 풍속과 돌풍 속도 측정은 킬로미터당(km/h)으로 표시되었는데, 저는 미국인이라 마일당(mph)로 변환하여 표시하고 싶었어요. 그래서 값을 제국단위로 변환하기 위해 두 개의 템플릿 엔티티를 만들었고, 제3의 엔티티를 만들어 풍향 측정값을 도수에서 기본 나침반 방향으로 변환했어요.

## 사용자 지정 홈어시스턴트 대시보드 및 카드

InfluxDB와 Grafana에 대한 작업에 앞서, 홈어시스턴트를 설정하여 수집된 데이터를 사용할 수 있도록 했어요. 예를 몇 가지 소개할게요:

음, 이제 저는 푹 빠져들었어요. 그리고 나는...

<div class="content-ad"></div>

- 홈 어시스턴트의 Lovelace 프론트엔드가 처리할 수 없는 방식으로 데이터를 분할했어요.
- 일부 장기적인 경향을 분석하기 위해 데이터를 영구히 보관하고 싶어요. 

그래서 이 모든 데이터를 저장할 InfluxDB를 설정하고, 이를 시각화하기 위해 Grafana를 설정할 때가 온 것을 깨달았어요.

# InfluxDB와 Grafana 설정하기

가장 빠르게 시작하려면, Home Assistant 애드온으로 InfluxDB와 Grafana를 설치할 수 있어요. 저는 Synology NAS에서 둘 다 실행하고 싶었고, 현재 InfluxDB 2.5.1과 Grafana 9.2.6을 공식 Docker 이미지로 Docker Hub에서 이용하고 있어요.

<div class="content-ad"></div>

InfluxDB를 실행한 후에 집을 나타내는 조직과 Home Assistant의 데이터를 보유할 버킷을 만들었습니다. 그리고 Home Assistant가 사용할 API 토큰 하나, Grafana가 사용할 다른 하나도 생성했어요.

## Home Assistant와 InfluxDB 연결하기

Home Assistant에는 모든 이벤트를 InfluxDB로 보내는 네이티브 지원이 있어요. 그래서 날씨 대시보드를 만들 수 있을 뿐만 아니라 Grafana에서 접근할 수 있는 다양한 데이터가 있을 거에요. 이 이벤트 흐름을 HA에서 InfluxDB로 활성화하려면 Home Assistant의 configuration.yaml 파일에 조금의 YAML을 추가하세요.

```js
influxdb:
  api_version: 2
  ssl: false
  host: nas.iot.jaxzin.com
  port: 8086
  token: !secret influxdb_token
  organization: 8d2a3be3fdc94fa2
  bucket: fallen-leaf
  tags:
    source: HA
  tags_attributes:
    - friendly_name
  default_measurement: units
```

<div class="content-ad"></div>

## InfluxDB를 데이터 소스로 Grafana에 추가하기

저는 초기 조사를 통해 Flux 쿼리 언어를 사용하고 싶었어요. Flux는 강력한 함수형 언어로 알려져 있어요. 다음 섹션에서 Flux에 대해 자세히 알아볼 거에요.

## 바람 장미 플러그인 설치하기

저는 기본 Grafana 설치에 포함되어 있지 않은 바람 장미와 같은 시각화 유형을 정말 원했어요. Grafana에는 여러 바람 장미 플러그인이 있지만, 저는 spectraphilic의 이 바람 장미 플러그인을 사용하기로 결정했어요. 설치 지침은 README에 있고, Grafana 도커 지침은 사용자 정의 플러그인을 추가하는 방법을 설명하고 있어요.

<div class="content-ad"></div>

![image](/assets/img/2024-07-10-HowIturnedacheapweatherstationandawholelotofthingsIalreadyownintoapersonalDevOps-styleweatherdashboard_3.png)

# 대시보드 만들기

이제 재미있고 약간 압도되는 부분인 사용자 정의 Grafana 대시보드를 만드는 것이 남았습니다. Flux를 배우고 원하는 모습을 얻기 위해 구글링을 많이 해야 했습니다.

## 바람 장미

<div class="content-ad"></div>

다행히 spectraphilic는 그래파나 플러그인의 README에 Flux 예제를 포함해 두어서, 방금 제가 시작한 Flux 쿼리로 바람 장미를 매우 빠르고 효율적으로 처리할 수 있었어요. WS2032에서 바람 방향..._wd와 바람 속도..._ws 데이터를 조인하는 예시입니다.

다음은 데이터 테이블의 세 열인 시간, 방향 및 속도를 포함하는 결과입니다. 바람 장미 시각화는 이러한 데이터를 가져와 방향별로 속도를 그룹화하는 역할을 합니다. WS2032의 해상도가 8가지 방향만 지원하기 때문에, 장미를 8조각으로만 구성하도록 설정했어요.

![이미지](/assets/img/2024-07-10-HowIturnedacheapweatherstationandawholelotofthingsIalreadyownintoapersonalDevOps-styleweatherdashboard_4.png)

<div class="content-ad"></div>

## 통계 기간을 조절하는 대시보드 변수 추가

다른 시각화로 넘어가기 전에 데이터 범위를 선택하는 것 이상의 유연성이 필요하다는 것을 알고 있었습니다. 풍력 데이터는 정말 시끄러워서 선택한 시간 범위 내에서 샘플링 기간을 쉽게 변경하고 싶었습니다. 이 샘플링 기간은 평균, 최대, 최소 또는 백분위 등의 통계를 계산하는 데 사용될 것이었습니다. 그래서 풍속이나 풍향을 시간별 또는 일별로 분할하여 볼 수 있었습니다. 이를 위해 대시보드에 '기간' 변수를 추가해야 했습니다. 나중에 Flux 쿼리에서 $'period'로 참조될 것입니다.

## 풍속을 히트맵으로 표시

한동안 다양한 풍속 히스토리 시각화를 시도했습니다. 저는 돌풍 및 풍속을 차트 하나에 담고 싶었고, 속도 변화를 보여주기 위해 min, mean, max 선을 사용한 이 시각화에 도착했습니다.

<div class="content-ad"></div>

이 효과를 얻기 위해 기본적으로 5 세트의 데이터가 필요합니다. Grafana와 Flux 쿼리를 사용하면 5개의 쿼리를 실행하는 것만큼 간단하게 만들 수 있습니다(하지만 효율적이지는 않을 수 있습니다).

```js
// 풍속: 최대, 평균, 최소
from(bucket: "fallen-leaf")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["entity_id"] == "ws2032_28817_ws_mph")
  |> filter(fn: (r) => r["_measurement"] == "mph")
  |> filter(fn: (r) => r["_field"] == "value")
  |> keep(columns: ["_time","_value", "value", "_field"])
  |> set(key:"_field", value:"max")
  |> aggregateWindow(every: ${period}, fn: max, createEmpty: true)
  |> yield(name: "max")

from(bucket: "fallen-leaf")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["entity_id"] == "ws2032_28817_ws_mph")
  |> filter(fn: (r) => r["_measurement"] == "mph")
  |> filter(fn: (r) => r["_field"] == "value")
  |> keep(columns: ["_time","_value", "value", "_field"])
  |> set(key:"_field", value:"mean")
  |> aggregateWindow(every: ${period}, fn: mean, createEmpty: true)
  |> yield(name: "mean")

from(bucket: "fallen-leaf")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["entity_id"] == "ws2032_28817_ws_mph")
  |> filter(fn: (r) => r["_measurement"] == "mph")
  |> filter(fn: (r) => r["_field"] == "value")
  |> keep(columns: ["_time","_value", "value", "_field"])
  |> set(key:"_field", value:"min")
  |> aggregateWindow(every: ${period}, fn: min, createEmpty: true)
  |> yield(name: "min")

// 돌풍 속도: 최대 및 평균
from(bucket: "fallen-leaf")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["entity_id"] == "ws2032_28817_gs_mph")
  |> filter(fn: (r) => r["_measurement"] == "mph")
  |> filter(fn: (r) => r["_field"] == "value")
  |> keep(columns: ["_time","_value", "value", "_field"])
  |> set(key:"_field", value:"max (gust)")
  |> aggregateWindow(every: ${period}, fn: max, createEmpty: true)
  |> yield(name: "max_g")

from(bucket: "fallen-leaf")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["entity_id"] == "ws2032_28817_gs_mph")
  |> filter(fn: (r) => r["_measurement"] == "mph")
  |> filter(fn: (r) => r["_field"] == "value")
  |> keep(columns: ["_time","_value", "value", "_field"])
  |> set(key:"_field", value:"mean (gust)")
  |> aggregateWindow(every: ${period}, fn: mean, createEmpty: true)
  |> yield(name: "mean_g")
```

하지만 여전히 마음에 안 들었습니다. 노이즈가 있는 데이터를 시각화하고 있지 않은 느낌이 들었어요. 그래서 히트맵 시각화를 시도해 보았고, 풍속의 변동성을 표시하면서도 풍속이 대부분 중심을 이루는 지점을 쉽게 파악할 수 있는 것 같아요.

<div class="content-ad"></div>

![링크](/assets/img/2024-07-10-HowIturnedacheapweatherstationandawholelotofthingsIalreadyownintoapersonalDevOps-styleweatherdashboard_6.png)

```js
from(bucket: "fallen-leaf")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["entity_id"] == "ws2032_28817_ws")
  |> filter(fn: (r) => r["_measurement"] == "km/h")
  |> filter(fn: (r) => r["_field"] == "value")
  |> map(fn: (r) => ({r with _value: r._value * 0.618}))
  |> keep(columns: ["_time","_value", "value", "_field"])
```

차트에서 바람과 돌풍 속도를 함께 표시할 수 없게 되었어요. 더 좋은 해결책을 찾을 때까지 둘 다 남겨둘게요.

## 바람 방향을 의사 토폴로지 차트로 표현하기, 백분위를 사용하여

<div class="content-ad"></div>

바람 방향 데이터는 정말 시끄러운데, 그래서 통계의 힘을 이용하여 노이즈 중에서 신호를 찾는 도움이 되는 시각화를 만들어 보려고 했어요. "만일 각 백분위수를 각각의 선으로 그렸다면 어떨까? 데이터의 방향을 보여주면서 분산을 더 잘 느낄 수 있지 않을까?"라는 생각을 했죠. (참고로, 저는 위의 히트맵을 사용하기 전에 이 아이디어를 생각해 냈는데, 이 역시 여기에 좋은 해결책이 될 수도 있습니다).

![이미지](/assets/img/2024-07-10-HowIturnedacheapweatherstationandawholelotofthingsIalreadyownintoapersonalDevOps-styleweatherdashboard_7.png)

하지만 21개의 서로 다른 쿼리를 입력하고 싶지 않았어요. 각 백분위수를 계산하는 동적 Flux 쿼리를 만들 수 있을까요? 이 쿼리를 위해 Flux 포럼에 도움을 요청하고 이 최종 쿼리를 찾아낼 수 있었습니다.

```js
import "experimental/array"

// 주어진 범위의 모든 바람 방향 데이터 가져오기
// v.timeRangeStart와 v.timeRangeStop을 사용하여 data라는 이름의 함수를 정의하고, 나중에 여러 번 호출할 겁니다
data = () => from(bucket: "fallen-leaf")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["entity_id"] == "ws2032_28817_wd")
  |> filter(fn: (r) => r["_field"] == "value")
  |> filter(fn: (r) => r["_measurement"] == "°")
  |> map(fn: (r) => ({r with _value: r._value * 400.0/360.0})) // Cardinal 방향이 그래프의 y축 레이블로 나타나도록 360에서 400으로 변환
  |> aggregateWindow( // 8방위 방향은 그리 세밀하지 않습니다. 데이터를 세분화하고 평균 값을 구합시다
    every: duration(v: int(v: ${period}) / 12),
    fn: mean
  )

// 계산하려는 백분위수
p = [1,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,99]

// 'q'라는 이름의 함수 정의. 'data'를 호출하고 'v' 하나의 백분위수를 계산합니다
q = (v) => {
  d = data ()
    |> aggregateWindow(
        column: "_value",
        every: ${period},
        fn: (column, tables=<-) => tables |> quantile(q: float(v: v)/100.0, column: column),
    )
    |> set(key: "_field", value: "p${if v < 10 then "0" else ""}${v}")
  return d
}

// 계산하려는 각 백분위수에 대해 'q'를 호출하고 결과를 연결해서 표시합시다
union(tables:  p 
  |> array.map(fn: (x) => (  q(v: x))))
  |> keep(columns: ["_time", "_field", "_value"])
```

<div class="content-ad"></div>

와우, 함수형 프로그래밍 언어는 정말 놀라울 정도로 강력할 수 있어요! 이 문법을 보면서 정말 좋아하고 몇 줄의 추가 코드로 21개의 데이터 세트를 가져올 수 있었어요. influxData의 Jay Clifford에게 이 쿼리를 작성하는 데 도움을 주셔서 큰 감사를 전해요.

## 색상과 스타일을 사용자 정의하기

이제 데이터를 가졌지만, 기본적으로 Grafana Time Series 시각화는 무지갯색 라인들로 표시돼요. 나는 중앙값(p50)을 밝고 단색 라인으로 강조하고 나머지 백분위 수는 점선으로 표시하고 싶었어요. 또한 중앙값을 기준으로 위와 아래를 강조하기 위해 일부 배경 채우기를 사용하고 싶었어요.

이러한 사용자 정의를 위한 해답은 Grafana 오버라이드에 있어요. 두 라인 사이의 배경을 채우려면, 더 높은 데이터 시리즈에서 "Fill below to"라는 새 속성 오버라이드를 선택하고 낮은 데이터 시리즈를 선택해주세요. 이제 시각화에 두 시리즈 사이에 동적 배경 채우기가 포함돼 있을 거에요.

<div class="content-ad"></div>

저는 p01부터 p49까지의 필드 이름과 일치하는 줄은 보라색으로, p51부터 p99까지의 필드 이름과 일치하는 줄은 초록색으로 색칠하도록 정규표현식을 사용했습니다.

중앙값을 강조하기 위해 라인을 기본적으로 점선으로 설정하고, p50 라인에 대한 재정의를 추가하여 선의 스타일, 색상, 두께를 사용자 정의했습니다.

## 각도 대신 나침반 방향으로 생각하기

이 시점에 저는 작업을 거의 마쳤지만, 읽은 값과 y축은 여전히 각도였습니다. 하지만 바람 방향을 생각할 때 남북동서 및 기울어진 방향 (NE, SE, SW, NW)으로 생각하고 시각화에 그 반영되기를 원했습니다.

<div class="content-ad"></div>

## 값 매핑

시계열 시각화는 다른 값에 숫자 값을 매핑하는 기능을 가지고 있습니다. 이는 기본적인 텍스트인 서술 및 서수 방향과 같은 값을 매핑할 수 있습니다. 특정 값에 매핑할 수도 있고, 범위나 정규식을 사용한 더 복잡한 매핑 정의를 사용할 수도 있습니다. 이 매핑은 데이터 포인트 위로 마우스를 올려놓을 때 표시되는 값 및 y축에 표시되는 값을 영향을 줍니다. 그래서 저는 도 범위를 나침반 방향으로 매핑했습니다.

## 임계값

다른 점을 주목한 것은 x/y 그래프에서 N, S, E 또는 W와 같은 기본 방향에 가까운 값을 시각적으로 구별하기 어려웠다는 것입니다. 그래서 이 네 가지 방향 각각에 대해 가로 점선 형태의 지시자를 그래프에 추가하고 싶었습니다. 이러한 유형의 수평 지시자 추가는 임계값이라고 하며, 단순히 수평선을 추가하는 것보다 더 강력합니다. 이것은 값에 따라 선의 색을 지정하고 배경을 채울 수도 있습니다. 그래서 나는 주요 방향에 대해 임계값을 추가하여 선과 배경을 표시하도록 했습니다.

<div class="content-ad"></div>

## 데이터를 변형하여 y축 레이블 수정하기

(…Grafana의 기대에 맞게)

모든 것이 좋아 보였지만, 360º의 최대 값을 추가했을 때 y축이 N, E, S 및 W의 임계값을 명확하게 레이블로 지정하지 않았어요. 여러 포럼을 검색한 후에는 90º, 180º, 270º 및 360º와 같은 이상한 각도를 레이블로 지정할 수 없을 것 같아 희망을 잃었어요. 100º, 200º, 300º 등의 값을 레이블로 지정할 것 같아요. 그래서 영감이 스쳤어요. 이미 표시된 값으로 매핑하고 있었으니 원래 각도 값을 Grafana의 기대에 맞도록 조정하고 문제를 해결할 수 있을까하는 생각이 들었어요. 그래서 이 코드가 존재하는 이유에요.

```js
...
|> map(fn: (r) => ({r with _value: r._value * 400.0/360.0}))
...
```

<div class="content-ad"></div>

N, E, S, W를 0, 100, 200, 300 그리고 400(N)으로 다시 매핑하면 y-축에 기본 선들의 레이블이 표시됩니다. 그리고 데이터가 이제 더 이상 0º에서 360º로 표시되지 않는다고 해도 표시에는 영향을 미치지 않습니다. 하지만 원시 결과를 검토하면 360º 이상의 값이 보이는 것이 좀 이상해 보일 수 있습니다.

# 다음은 무엇인가요?

- 바람 데이터와 그릴 온도를 상관시킵니다
그것이 난 기상 스테이션을 샀던 이유입니다! 추수감사절에는 그릴에서 칠한 칠면조를 연마했는데, 바람이 그릴 온도를 꽤 꼬일 수 있다는 걸 느꼈습니다(내 MEATER+로 Home Assistant를 통해 추적). 그래서 궁금증이 생겨 기상 스테이션을 샀죠. 역사적인 그릴 온도와 바람 속도를 상호참조하는 대시보드를 만들고 싶네요.
- 강우 센서 추가 및 습도 센서 수정
이제 더 많은 데이터가 필요합니다! 게다가 습도 센서는 때때로 작동을 그만두는 것 같아서 더 신뢰할 수 있게 만들 수 있는지 조사해 봐야 합니다.
- 조도 센서 추가
한동안 밝기를 사용해 실내 조명을 제어하고 싶어했습니다. 온도 시각화에 태양의 고도를 추가한 것처럼, 대시보드에서 조도도 흥미로운 데이터 포인트가 될 수 있다고 상상할 수 있습니다. 집 안의 조명과 실외 조도 사이에 상관 관계가 있을까요? 아마도 있겠죠, 하지만 증거를 보고 싶네요.
- 계속 손을 보태고!
저는 이것이 끝이 없는 취미로 이어질 것이라고 생각합니다.
- 이 프로젝트에서 배운 것을 직장에 적용
난 DevOps 팀의 엔지니어링 매니저로 일하는 나에게 새로운 것을 배우기 위한 시험 용도로 많은 가정 자동화 프로젝트를 활용하고 있습니다. Grafana의 힘과 InfluxDB와 같은 데이터 소스를 추상화하지 않고 해당 쿼리 언어로 더욱 확장하는 점이 굉장히 강력합니다.