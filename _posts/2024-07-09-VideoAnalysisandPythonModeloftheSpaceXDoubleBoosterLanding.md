---
title: "SpaceX 이중 부스터 착륙 비디오 분석과 Python 모델 구축 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-VideoAnalysisandPythonModeloftheSpaceXDoubleBoosterLanding_0.png"
date: 2024-07-09 19:02
ogImage:
  url: /assets/img/2024-07-09-VideoAnalysisandPythonModeloftheSpaceXDoubleBoosterLanding_0.png
tag: Tech
originalTitle: "Video Analysis and Python Model of the SpaceX Double Booster Landing"
link: "https://medium.com/@rjallain/video-analysis-and-pytof-the-spacex-double-booster-landing-d3e195cf0625"
---

비디오에서도 놀랍게 멋진 광경이에요. 두 개의 로켓이 빠르게 다가오지만 각자의 플랫폼에 옆으로 착륙하는 걸 볼 수 있어요. 이게 바로 SpaceX 파이콘 헤비 부스터의 작동 방식이에요. 이 비디오를 보세요.

아티스트가 사랑스러운 꽃을 그리듯이, 나는 이 황홀한 사건을 감상하기 위해 약간의 물리학을 사용해야 해요. 이 경우에는 Tracker Video Analysis(무료 소프트웨어)를 사용해서 착륙하는 이 부스터들의 움직임을 살펴볼 거에요. 정말 재미 있을 거예요.

익숙하지 않다면, 비디오 분석의 기본 아이디어를 설명해 드릴게요. 비디오를 찍으면 각 프레임에서 물체의 위치를 볼 수 있어요. 프레임 번호에서 시간 데이터를 얻을 수 있고 (재생 프레임 속도가 실제 속도와 같다고 가정할 때), 비디오 프레임의 물체 크기를 알고 있다면 x와 y 위치도 얻을 수 있어요. 참 많은 것이죠.

# 비디오 크기 조정 및 프레임 수정

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

첫 번째 단계는 비디오의 크기를 조정하는 것입니다. 이 경우에는 부스터 자체의 길이를 사용할 수 있습니다. 이 SpaceX 페이지에는 Falcon Heavy의 길이가 70m로 나와 있습니다. 이를 통해 부스터의 길이를 측정할 수 있습니다.

![이미지](/TIL/assets/img/2024-07-09-VideoAnalysisandPythonModeloftheSpaceXDoubleBoosterLanding_0.png)

이를 통해 높이가 약 46m임을 알았습니다. 완벽한 측정이 아니더라도 괜찮습니다. 이제 이 길이를 비디오에서 사용할 수 있습니다. 그런데 기다려 보세요! 이 착륙 중에 카메라가 팬 및 줌을 조정합니다. 걱정하지 마세요. Tracker Video에서 코디네이트 참조 프레임을 조정할 수 있습니다(보정 포인트 쌍을 사용).

만약 카메라가 움직이지 않았다면 이렇게 보일 것입니다.

![이미지](https://miro.medium.com/v2/resize:fit:960/1*x5UudQB-ajAgQDgS8pfj5g.gif)

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

다음 단계를 준비했습니다.

# 움직임 추적

각 프레임에 설정된 좌표 시스템으로 각 로켓의 위치를 표시할 수 있습니다. 실제로 각 로켓에 대해 두 개의 위치를 표시할 거에요 — 상단 위치와 하단 위치를 표시할 거에요. 그래도, 여기 하나의 로켓에 대한 시간에 따른 수직 위치입니다.

![image](/TIL/assets/img/2024-07-09-VideoAnalysisandPythonModeloftheSpaceXDoubleBoosterLanding_1.png)

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

데이터는 어느 정도 패러볼릭한 모습입니다. 그래서 이 데이터에 맞는 패러본을 적합할 수 있어요(Tracker curve fit을 사용해서). 운동방정식도 1/2 times 가속도가 t² 용어 앞에 오는 패러본 형태이기 때문에, 이를 사용해서 가속도를 결정할 수 있어요. 적합 매개변수를 통해 가속도가 6.38 m/s² 인 것으로 나왔는데, 꽤 합리적으로 보입니다.

# 3D 로켓 만들기

로켓의 위치를 시간의 함수로만 표시하는 것 이상의 것을 할 수 있어요. 두 로켓의 움직임을 나타내는 3D 모델을 만들 수 있어요. 그게 바로 Web VPython에서 할 거예요. 간단히 말해 Web VPython은 파이썬과 비슷한 코드를 사용하여 3D 모델을 만드는 온라인 플랫폼이에요(정말 멋져요). 모든 세부사항을 자세히 다루지는 않겠지만, 이 정보로도 충분히 이해할 수 있을 거예요.

첫 번째 단계는 각 로켓의 상단과 하단의 위치-시간 데이터를 어떻게든 Web VPython으로 가져오는 것이에요. 안타깝게도 이 작업을 수행하는 훌륭한 방법은 없어요. 대신 Tracker에서 데이터 값을 복사한 다음 그대로 Web VPython에 붙여넣기할 거예요. 마치 90년대 후반의 코딩 야만인인 것처럼요. 얼마나 마법처럼 보이는 일인지, 여기 좀 꿀팁을 하나 주죠. 값을 텍스트 편집기에 붙여넣으면 엔터 키를 제거하고 쉼표로 대체해서 파이썬에 더 적합하게 맞출 수 있어요. 아래가 어떻게 보이는지 확인해보세요.

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

![image](/TIL/assets/img/2024-07-09-VideoAnalysisandPythonModeloftheSpaceXDoubleBoosterLanding_2.png)

빠른 참고 — 만약 파이썬에서의 리스트에 서투르다면, 여기 튜토리얼(또는 리프레셔)가 있어요. 그리고, 물어보기 전에 — 아니요, 이걸 넘파이 배열로 변환할 수 없어요. 웹 VPython이 실제 파이썬이 아니라서 우리가 사용할 모듈들에 모두 접근할 수 없어요 (넘파이를 사용할 수 있는 방법은 있지만, 이 자리에서는 건드리지 않겠어요). 아마도 (명확하지 않다면) 잘라 말할 필요가 있을 것 같아요 — 이들은 긴 리스트에요 — 362개의 요소가 있어요. 제 파이썬 고대인 방식으로 모든 것이 제대로 가져와졌는지 확인하기 위해 길이를 프린트했어요.

로켓 2의 데이터를 얻은 후 (나의 데이터 목록에서 딱 첫 번째였어요), 로켓 1을 위해 이 과정을 반복해야 해요. 또한, 시간 값들을 위한 리스트가 필요할 것인데, 이는 프레임 속도의 역수인 0.0166833의 균일한 시간 간격으로 만들 수 있어요.

이제 3D 마술을 해보죠. 웹 VPython에는 여러 다양한 객체들이 포함되어 있어요 — 이 경우, 우리는 실린더를 사용하여 블로스터들을 만들 거예요. 다음 코드로 실린더를 만들 수 있어요.

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

![Image of Video Analysis](/TIL/assets/img/2024-07-09-VideoAnalysisandPythonModeloftheSpaceXDoubleBoosterLanding_3.png)

한쪽 끝에서 다른 쪽 끝으로 향하는 축 벡터가 있을 때 pos는 실린더의 한쪽 끝의 벡터 위치이고 axis는 축 벡터입니다. 반지름은 여기서 다루기 까다로울 수 있어요. 도움이 될 만한 그림이 있어요.

![Image of Cylinder](/TIL/assets/img/2024-07-09-VideoAnalysisandPythonModeloftheSpaceXDoubleBoosterLanding_4.png)

적은 문제가 있어요. 실린더의 맨 위와 맨 아래에 대한 벡터 위치가 있는게 맞아요. 이러한 벡터 값들을 사용하여 축 벡터를 찾을 수 있겠죠. 그러나 이러한 벡터 위치는 약간 변경될 수 있어 로켓 부스터의 길이가 약간 변할 수 있어요. 그래서 대신에 이러한 맨 위와 맨 아래 위치를 사용하여 축 벡터의 방향을 찾고, 그 후에 상수 길이를 곱해서 사용할 거예요. 아, 코드를 보여드릴게요. 그게 더 쉬울 거에요.

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

아래는 이 코드에 대한 주석입니다:

- 부스터의 길이인 L이 분명히 되어 있기를 바랍니다 (그것을 주석으로도 넣었죠).
- r1a는 로켓의 아래에서 위로 향하는 벡터입니다. 맨 위와 맨 아래 x 및 y 위치의 값 목록에서 데이터를 사용하여 이러한 위치를 벡터로 먼저 구성해야 합니다. 다소 어색할 수 있지만 작동합니다.
- 실린더의 경우, 위치는 아래 벡터 값으로, 축은 길이(L)이고 r1a 방향의 단위 벡터로 곱한 값입니다. 내장 된 norm() 함수를 사용하여 이 작업을 수행할 수 있습니다.
- 아, 실린더의 정의에 make_trail=True를 추가할 것입니다. 이렇게하면 분명히 경로가 만들어집니다 (때로는 코드가 간단합니다).

# 부스터 동작 애니메이션화하기

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

부스터용 3D 모델을 만들었습니다. 이제 그들을 움직이도록 해야 합니다. 이 경우에는 데이터 목록의 각 값을 통해 시간 단계마다 실린더를 새 위치로 이동시키는 것만 할 거에요.

좀더 살펴봐야 할 점이 있어요, 그러니까 일단 코드의 간단한 버전부터 시작해볼까요? 이거 봐봐요.

![이미지](/TIL/assets/img/2024-07-09-VideoAnalysisandPythonModeloftheSpaceXDoubleBoosterLanding_6.png)

자세한 내용은 아래와 같아요:

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

- 시간 값 목록(t)이 있음을 기억해주세요. 26번째 줄은 이 목록의 길이를 따라가며 변수 i를 사용하여 계산합니다. 다른 목록의 인덱스로 사용할 수 있도록 유용합니다.
- 아, 파이썬의 루프에는 :가 필요하며, 그 아래에 탭으로 들여쓴 모든 내용이 루프의 일부입니다.
- 27번째 줄은 이상하게 보일 수 있습니다. rate(100)라는 문을 가지고 있으면, 파이썬에게 초당 최대 100번의 루프만 수행하라고 알립니다. 애니메이션을 특정 속도로 실행하려고 하는 것이 중요합니다. 이 경우에는 rate(1/dt)를 사용하여 "실시간"으로 실행되도록 합니다.
- 28번째 줄과 29번째 줄에서는 부스터의 바닥과 꼭대기에 대한 벡터 값을 생성합니다.
- 30번째 줄에서는 부스터의 위치를 업데이트 합니다. 이것이 실제로 3D 애니메이션에서 이동하는 것을 만듭니다.
- 31번째 줄에서는 축을 업데이트 합니다.

이 모든 내용으로 아래는 애니메이션입니다.

![애니메이션](https://miro.medium.com/v2/resize:fit:1000/1*KmXJ7wLB0IqLBEUD4CF3kA.gif)

전체 코드가 필요하시다면, 여기에서 확인하실 수 있습니다.

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

# 숙제

앗, 누군가가 숙제 과제를 원한다고 했던 것 같아요. 제가 준비해왔어요.

- 이 애니메이션에서 두 로켓은 동일한 z-위치(화면 내외)를 가지고 있습니다. 촬영 위치와 착륙 장소의 z-값을 조정하기 위해 추정해보세요.
- 로켓의 각 크기를 이용하여 z-위치를 결정할 수 있을까요? 힌트: 제 생각에는 불가능한데, 왜 작동하지 않을까요?
- 그 로켓 엔진에 일부 화염을 붙이는 건 어떨까요? 가능할까요?
- 부스터의 가속도와 추정 질량을 사용하여 연료 사용률을 계산해보세요.
- 애니메이션을 더 멋지게 만들어보세요. 화염을 추가하는 것 외에도, 지면을 착륙 패드(아마도 몇 개의 타워도)로 만들어보세요.
