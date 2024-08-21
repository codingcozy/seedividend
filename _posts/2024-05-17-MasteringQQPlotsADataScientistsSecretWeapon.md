---
title: "QQ Plot 마스터하기 데이터 과학자의 비밀 무기"
description: ""
coverImage: "/assets/img/2024-05-17-MasteringQQPlotsADataScientistsSecretWeapon_0.png"
date: 2024-05-17 04:00
ogImage:
  url: /assets/img/2024-05-17-MasteringQQPlotsADataScientistsSecretWeapon_0.png
tag: Tech
originalTitle: "Mastering QQ Plots: A Data Scientist’s Secret Weapon"
link: "https://medium.com/@stoic_sapien1/mastering-qq-plots-a-data-scientists-secret-weapon-57b36287d76f"
isUpdated: true
---

## QQ Plot을 사용하여 Python | Statsmodel QQ Plot | SciPy QQ Plot

![QQ Plot](/assets/img/2024-05-17-MasteringQQPlotsADataScientistsSecretWeapon_0.png)

Quantile-quantile(QQ plot) 그림은 데이터 세트가 특정 확률 분포를 따르는지 또는 두 데이터 샘플이 동일한 모집단에서 왔는지 확인하는 데 사용되는 시각적 방법입니다.

QQ Plot은 데이터가 정규 분포를 따르는지 확인하는 데 사용할 수 있는 그래픽 방법 중 하나입니다.

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

QQ Plot에서는 이론상 분포의 분위수를 X축에, 데이터의 분위수를 Y축에 그립니다. 이러한 점들이 일직선(y=x)상에 있으면, 데이터가 해당 분포를 따른다는 것을 나타냅니다.

이제 데이터를 가져와 정규 분포와 비교하고, 해당 데이터가 정규 분포에서 나온 것인지 확인해봅시다.

우선, 다양한 라이브러리를 가져오겠습니다.

```js
import numpy as np
import scipy.stats as stats
import pandas as pd
import seaborn as sns
import statsmodels.api as sm
import matplotlib.pyplot as plt
```

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

이제, 데이터셋을 불러올게요.

```js
df1 = pd.read_csv(
  "https://gist.githubusercontent.com/stoicsapien1/4c0d96aa3b6f99178f5ee071bef23d10/raw/281efb659ff1713ac64b680a9bf44a53ce367e38/data.csv"
);
```

Scipy 라이브러리를 사용하여 QQ Plot을 생성해볼까요?

우선 데이터를 표준화한 다음 QQ Plot을 만들어볼 거에요.

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
df.head(5);
```

<img src="/assets/img/2024-05-17-MasteringQQPlotsADataScientistsSecretWeapon_1.png" />

```js
df["Z"] = (df["data"] - df["data"].mean()) / df["data"].std();
```

새롭게 표준화된 데이터 열을 생성했어요. 데이터의 상위 내용은 아래에 제공됩니다.

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

![QQ Plot](/assets/img/2024-05-17-MasteringQQPlotsADataScientistsSecretWeapon_2.png)

이제 Scipy 라이브러리를 사용하여 QQ 플롯을 생성해 봅시다.

```python
stats.probplot(df["Z"], dist="norm", plot=plt)
plt.show()
```

![QQ Plot](/assets/img/2024-05-17-MasteringQQPlotsADataScientistsSecretWeapon_3.png)

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

statsmodels 라이브러리를 사용하여 QQ Plot을 생성할 수도 있습니다. 그럼 시작해 보겠습니다.

```python
import statsmodels.api as sm
import matplotlib.pyplot as plt

sm.qqplot(df["Z"], line="45")
plt.show()
```

![QQ Plot](/assets/img/2024-05-17-MasteringQQPlotsADataScientistsSecretWeapon_4.png)

대부분의 점이 직선(빨간 선) 위에 있는 경우, 데이터가 정규 분포를 따른다고 추정할 수 있습니다. 여기서는 대부분의 데이터가 직선 위에 있는 것을 관찰할 수 있지만, 추가적인 통계 검정을 통해 정규성을 확인해야 합니다.

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

깃허브 저장소: EDA-Projects/QQ Plot at main · stoicsapien1/EDA-Projects (github.com)

여러 가지 통계적 검정 방법 중 하나는 콜모고로프-스미르노프 검정입니다. 이에 대해 더 알아보려면 콜모고로프-스미르노프 검정에 대한 내 블로그를 읽어주세요.

안녕히 가세요!
