---
title: "파이썬으로 탐구하고 이해하는 석유물리학의 방정식들"
description: ""
coverImage: "/assets/img/2024-06-23-UsingPythontoExploreandUnderstandEquationsinPetrophysics_0.png"
date: 2024-06-23 13:36
ogImage:
  url: /assets/img/2024-06-23-UsingPythontoExploreandUnderstandEquationsinPetrophysics_0.png
tag: Tech
originalTitle: "Using Python to Explore and Understand Equations in Petrophysics"
link: "https://medium.com/towards-data-science/using-python-to-interactively-explore-and-understand-equations-in-petrophysics-705b3db8b2ab"
isUpdated: true
---

![Image](/assets/img/2024-06-23-UsingPythontoExploreandUnderstandEquationsinPetrophysics_0.png)

기술적인 주제를 학습할 때, 산유물리학 등 많은 방정식과 관련이 있는 경우, 모든 매개변수가 어떻게 관련되는지 이해하기 어려울 수 있습니다.

여러 해 전에 산유물리학을 시작할 때, 저는 Archie Water Saturation 방정식과 같은 일반적인 방정식을 탐구하기 위해 Excel을 사용했습니다. 이 방법은 각 매개변수가 계산 결과에 미치는 영향을 이해하는 좋은 방법이었습니다.

본 문서에서는 Python을 사용하여 방정식의 다른 매개변수가 결과에 미치는 영향을 배우고 이해하는 세 가지 방법을 살펴볼 것입니다. 사용된 예시 방정식은 암석 내에 채워진 물의 양을 계산하는 Archie Water Saturation (Sw) 방정식입니다. 이를 통해 암석 내에 얼마나 많은 탄화수소가 함유되어 있는지 추정할 수 있습니다.

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

만약 석유물리학에 익숙하지 않다면, 동일한 작업 흐름과 예제를 원하는 방정식에 적용할 수 있습니다. 당신이 원하는 데이터를 보여주기 위해 최종 예제를 조정해야 할 수도 있습니다.

# 함수로 간단한 방정식

방정식을 탐색하는 가장 간단한 방법은 계산을 수행하는 함수를 만드는 것입니다. 이 함수는 여러 매개변수를 받아들이며, 각각의 매개변수에는 기본값이 할당됩니다.

매개변수에 대한 기본값을 제공함으로써, 우리는 각각의 값을 매번 입력하는 대신 원하는 매개변수를 변경할 수 있게 됩니다. 예를 들어, rt 매개변수를 변경하려면, 다음과 같이 함수를 호출할 수 있습니다: archie_sw(rt=100)

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
def archie_sw(a=1, phi=0.15, m=2, rw=0.2, rt=200, n=2):
    Sw = ((a / phi**m) * (rw / rt))**(1/n)
    return Sw
```

하지만, 일단 함수를 호출하고 매개변수를 제공하지 않으면 기본 값이 사용됩니다.

```js
archie_sw();
```

그리고 이 결과는 Sw가 됩니다:

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
0.21081851067789195;
```

만약 투과성 (a) 및 다공성 (phi) 매개변수를 변경하면 다음과 같습니다:

```js
archie_sw((a = 1.2), (phi = 0.25));
```

새로운 Sw 값이 반환됩니다.

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
0.13856406460551018;
```

Archie 방정식의 매개변수를 탐색하는 좋고 간단한 방법이지만 값들을 바꾸고 셀을 다시 실행해야 하는 것은 매우 지루하고 시간이 많이 소요될 수 있습니다.

# ipywidgets를 사용한 상호 작용성 생성

파라미터를 변경할 때마다 함수를 다시 실행하고 호출해야 하는 번거로움 대신 노트북 내에서 대화형 위젯을 사용할 수 있습니다.

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

이 작업은 ipywidgets에서 위젯을 가져와 각 매개변수에 연결된 여러 하위 위젯을 설정하는 것으로 완료됩니다.

먼저, 몇 가지 모듈을 가져와야 합니다. 첫 번째로는 ipywidgets에서 위젯들을 가져오고, 노트북 안에 위젯들을 표시하기 위해 IPython.display에서 display를 가져와야 합니다.

다음으로, Archie Water Saturation 방정식과 관련 매개 변수들을 선언합니다. 이 함수는 그런 다음 update_widget 함수 내에서 호출됩니다.

마지막으로, 표시할 위젯들과 그 종류, 기본값 및 허용 값 범위를 설정할 수 있습니다.

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
import ipywidgets as widgets
from IPython.display import display

# Archie's Equation function
def archie_sw(a, PHI, m, Rw, Rt, n):
    Sw = ((a / PHI**m) * (Rw / Rt))**(1/n)
    return Sw

# Interactive widget
def update_widget(a=1, PHI=0.2, m=2, Rw=0.1, Rt=2, n=2):
    Sw = archie_sw(a, PHI, m, Rw, Rt, n)
    print(f"Water Saturation (Sw): {Sw:.2f}")

widgets.interact(update_widget,
                 a=widgets.FloatSlider(value=1, min=0.1, max=5, step=0.1, description='a:'),
                 PHI=widgets.FloatSlider(value=0.2, min=0.01, max=0.4, step=0.01, description='PHI:'),
                 m=widgets.FloatSlider(value=2, min=1, max=4, step=0.1, description='m:'),
                 Rw=widgets.FloatSlider(value=0.1, min=0.01, max=1, step=0.01, description='Rw:'),
                 Rt=widgets.FloatSlider(value=2, min=1, max=100, step=1, description='Rt:'),
                 n=widgets.FloatSlider(value=2, min=1, max=4, step=0.1, description='n:'))
```

위 코드를 노트북에서 실행하면 다음과 같이 상호 작용하는 슬라이더가 표시됩니다.

<img src="https://miro.medium.com/v2/resize:fit:656/1*tKwrqeihgZYjPbCbbP4dyw.gif" />

슬라이더 중 하나를 조절하면 해당 Sw 값이 자동으로 업데이트됩니다.

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

# Jupyter에서 ipywidgets 사용하기 (데이터프레임 + 로그 플롯)

암상해석을 다룰 때는 하나의 데이터 포인트가 아닌 연속된 데이터를 다루는 경우가 많습니다. 이전 방법은 하나의 Sw 값에 대해 각 매개변수와 그 영향을 탐색하려는 경우 간단하게 유지됩니다.

우리는 위에서 한 작업을 확장하여 실제 데이터를 사용하고 어떤 매개변수가 변경되면 업데이트되는 기본 로그 플롯을 만들 수 있습니다.

이 예시에서 공개적으로 사용 가능한 볼브(Volve) 데이터셋에서 포로시티( phi ) 커브와 저항도( rt ) 커브를 가지고 있습니다. 두 가지 모두 아키 워터 포화방정식의 필수 입력값입니다.

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

남은 매개변수를 조정하여 전체 저수지 부분에 미치는 영향을 설명할 수 있습니다.

가장 위에 있는 서브플롯(트랙)에서 우리는 기본 매개변수를 사용하여 계산된 물 포화도를 기준으로 합니다. 이것은 대화식 매개변수를 사용하여 계산된 결과와 함께 플로팅됩니다.

![image](https://miro.medium.com/v2/resize:fit:1400/1*ousiE50m2vaWq5ME7RykYw.gif)

상기 플롯을 생성하려면 다음 코드를 사용할 수 있습니다.

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

```python
import pandas as pd
import matplotlib.pyplot as plt
import ipywidgets as widgets
from IPython.display import display

df = pd.read_csv('../data/Volve/15_9-19.csv', usecols=['DEPTH','PHIT', 'GR','RT'], na_values=-999)

#Extract a small depth interval
df = df.query('3800 <= DEPTH <= 4100')

def archie_sw(a=1, phi=0.15, m=2, rw=0.2, rt=200, n=2):
    Sw = ((a / phi**m) * (rw / rt))**(1/n)
    return Sw

df['SW_ARCH_BASE'] = df.apply(lambda row: archie_sw(phi=row['PHIT'], rt=row['RT']), axis=1)

@widgets.interact(a=(0.5, 1.5, 0.05),
                  m=(1.5, 2.5, 0.05),
                  rw = (0.1, 10, 0.1),
                  n=(1.5, 2.5, 0.05))
def update_plot(a=1, m=2, rw=1, n=2):
    depth = df['DEPTH']

    df['SW_ARCH_NEW'] = df.apply(lambda row: archie_sw(phi=row['PHIT'], rt=row['RT'],
                                                      a=a,
                                                      m=m,
                                                      rw=rw,
                                                      n=n), axis=1)

    fig, ax = plt.subplots(nrows=4, ncols=1, sharex=True, figsize=(20, 10))

    ax[0].plot(depth, df['SW_ARCH_BASE'], c='k')
    ax[0].plot(depth, df['SW_ARCH_NEW'], c='red')
    ax[0].fill_between(depth, 1, df['SW_ARCH_NEW'], color='green')
    ax[0].fill_between(depth, 0, df['SW_ARCH_NEW'], color='skyblue')

    ax[1].plot(depth, df['RT'], c='k')
    ax[2].plot(depth, df['PHIT'])
    ax[3].plot(depth, df['GR'], c='green')

    ax[0].set_ylim(0, 1.0)
    ax[1].semilogy()
    ax[2].set_ylim(0, 0.5)
    ax[3].set_ylim(0, 150)

    ax[0].set_ylabel('SW')
    ax[1].set_ylabel('RT')
    ax[2].set_ylabel('PHIT')
    ax[3].set_ylabel('Gamma')

    plt.show()
```

# 요약

학습 프로세스를 보다 인터랙티브하게 만들수록 학습한 정보를 더욱 잘 보존할 가능성이 높아집니다.

이 글에서는 파이썬을 사용하여 석유물리학의 기본 방정식을 이해하는 데 도움이 되는 세 가지 다른 간단한 방법을 소개했습니다. 최종 예제에서 매개변수를 인터랙티브하게 만들어 실제 데이터에 대한 각각의 영향을 탐색할 수 있습니다.

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

# 사용된 데이터셋

이 튜토리얼에서 사용된 데이터는 2018년 Equinor가 공개한 Volve 데이터셋의 일부입니다. 데이터셋의 자세한 내용 및 라이선스는 아래 링크에서 확인할 수 있습니다.

[Volve field data set download — Equinor](링크)

Volve 데이터 라이선스는 CC BY 4.0 라이선스를 기반으로 합니다. 라이선스 협약의 자세한 내용은 여기에서 확인할 수 있습니다.

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

https://cdn.sanity.io/files/h61q9gi9/global/de6532f6134b9a953f6c41bac47a0c055a3712d3.pdf?equinor-hrs-terms-and-conditions-for-licence-to-data-volve.pdf

읽어 주셔서 감사합니다. 나가시기 전에 반드시 내 콘텐츠를 구독하고 제 문서를 이메일로 받아보세요. 여기에서 구독할 수 있어요! 이 콘텐츠를 즐겼고 감사의 표시를 하고 싶으시다면 손뼉을 몇 번 치시는 것도 좋아요.
