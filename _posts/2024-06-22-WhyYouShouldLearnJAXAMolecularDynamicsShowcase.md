---
title: "JAX를 배워야 하는 이유 분자 동역학 쇼케이스"
description: ""
coverImage: "/assets/img/2024-06-22-WhyYouShouldLearnJAXAMolecularDynamicsShowcase_0.png"
date: 2024-06-22 14:08
ogImage: 
  url: /assets/img/2024-06-22-WhyYouShouldLearnJAXAMolecularDynamicsShowcase_0.png
tag: Tech
originalTitle: "Why You Should Learn JAX: A Molecular Dynamics Showcase"
link: "https://medium.com/@hghcomphys/why-you-should-learn-jax-a-molecular-dynamics-showcase-f7e79b58be01"
---


제 파이썬 스크립트를 최적화하기 위해 PyTorch로는 실망을 경험한 후 JAX를 사용하기 시작했어요. 제 프로젝트는 주로 두 가지 요소로 구성되어 있었어요: 원자의 위치에 기반한 디스크립터 계산 및 이러한 디스크립터를 여러 신경망의 입력으로 사용하여 입자 시스템의 총 잠재 에너지와 힘을 예측하는 것이었죠. 신경망 부분은 충분히 빨랐지만, 디스크립터 계산, 특히 그라디언트 평가는 TorchScript를 사용한 후에도 효율적으로 수행되지 않았어요. 자동 미분을 지원하는 Python의 대안 프레임워크를 찾던 중 JAX를 발견했어요. JAX는 (물리학에 대한 인식이 있는) 기계 학습 모델을 구축하는 데 매우 효과적이었고, 필요한 유연성과 성능을 제공했어요.

![JAX 이미지](/assets/img/2024-06-22-WhyYouShouldLearnJAXAMolecularDynamicsShowcase_0.png)

PyTorch를 사용하는 데 어떠한 이의도 없어요; 사실, 언어 처리나 객체 감지 작업을 포함한 기계 학습 모델을 구축할 때 자주 사용해요. 그러나 사용자 정의 및 최적화된 모델을 개발하려는 경우에는 파이썬에서 아마도 처음부터 사용자 정의 모델을 개발하는 것이 목표라면 최적의 선택이 아닐 수도 있어요. PyTorch는 많은 면에서 뛰어나지만, 매우 사용자 정의 및 특정한 모델 아키텍처에 대해서는 더 나은 성능을 제공하는 더 적합한 대안이 있을 수 있어요.

JAX는 자동 미분(autodiff), Just-In-Time (JIT) 컴파일, GPU 가속 계산 및 벡터화된 계산을 지원하는 등 의도한 요구 사항을 완벽하게 충족하는 다양한 기능을 제공해요. 또한 JAX는 불변성을 다루는 방식으로 함수형 프로그래밍 패러다임에 부합하게 처리해요. 이 게시물을 통해 JAX에 대한 실질적 경험을 공유하고, 여러분의 프로젝트에 JAX를 주저없이 도입하고 사용할 동기를 제공하는 것이 제 목적이에요.

<div class="content-ad"></div>

## 필수 패키지

이 가이드를 따라하기 위해 몇 가지 파이썬 패키지를 설치해야 합니다.

- JAX: Python에서 고성능의 수치 연산 라이브러리로, 자동 미분과 CPU 및 GPU에서 최적화된 실행을 제공합니다. 설치 지침에 따라 설치해 주세요.
- ASE: 원자 구조 시뮬레이션을 설정, 조작 및 분석하는 데 사용되는 툴킷으로, 계산 재료과학 분야에서 널리 사용됩니다.
설치: $ pip install ase
- Pantea: 현재 개발 중인 내 Python 패키지로, 원자간 포텐셜을 위한 머신러닝 모델을 개발하는 데 사용됩니다.
설치: $ pip install pantea
- NGLView (선택적): 분자 구조와 궤적을 대화적으로 보는 데 사용되는 주피터 위젯입니다.
설치: conda install nglview -c conda-forge

JAX는 시스템의 GPU를 자동으로 사용하며, 그렇지 않은 경우 CPU를 기본적으로 활용합니다. 또한 JAX_PLATFORM_NAME 환경 변수를 사전에 조정하여 계산 장비를 수동으로 설정할 수 있습니다.

<div class="content-ad"></div>

기본적으로 JAX는 싱글 포인트 정밀도를 나타내는 float32 데이터 유형을 사용합니다. 하지만 과학 시뮬레이션은 보다 높은 정확도를 위해 더블 정밀도 float64를 필요로 합니다. 계산 성능을 향상시키기 위해 가능한 경우 낮은 정밀도를 선택하고 메모리 사용량을 줄이는 것이 권장됩니다(대략적으로 2배). 

아래 스크립트는 JAX를 구성하여 디바이스를 선택하고 더블 정밀도를 활성화하는 방법을 보여줍니다.

```js
import os
os.environ["JAX_PLATFORM_NAME"] = "cpu"  # GPU 컴퓨팅 비활성화
os.environ["JAX_ENABLE_X64"] = "1"       # 더블 정밀도 활성화

import jax
...
```

간단한 예제에서는 기본 float32 정밀도를 사용하겠지만 분자 동력학 시연을 위해 더블 정밀도를 사용할 것입니다. 또한, 이 게시물의 모든 계산은 명시적으로 언급되지 않는 한 제 노트북의 GeForce MX130 GPU에서 실행됩니다.

<div class="content-ad"></div>

위에 설명된 단계를 따르면 이 포스트에서 다룬 예제를 재현하는 데 필요한 필수 도구를 제공받을 수 있습니다. 시작해 봅시다!

# JAX의 이점

JAX는 JIT 컴파일링, 가속 컴퓨팅, 그리고 자동 미분을 활용한 배열 지향 계산을 위한 오픈 소스 및 조립 가능한 Python 라이브러리로, 머신 러닝, 최적화, 과학적 시뮬레이션과 같은 고성능 숫자 계산을 가능하게 합니다. 사용자는 익숙한 NumPy 구문을 사용하여 코드를 작성할 수 있으며, 해당 코드를 자동적으로 효율적으로 변환하여 GPU 및 TPU에서 실행할 수 있습니다. 이는 계산이 집중적으로 필요한 작업에 매우 적합합니다. 선형 대수 가속 X (LAX)는 JAX 라이브러리 내의 서브 모듈로, 다양한 선형 대수 루틴의 최적화된 구현을 제공합니다. JAX의 문서 페이지를 방문해보시기를 강력히 권장하며, 그곳에서 다양한 정보와 리소스를 제공하고 있습니다. 예를 들어 이 튜토리얼을 참조해 보세요.

일부 사람들은 JAX를 단순히 멀티 스레드 NumPy 라이브러리로 설명하지만, 저는 그렇지 않다고 주장합니다. JAX는 그 이상의 기능을 제공합니다. 다음 섹션에서는 내 프로젝트 개발에 중요한 역할을 한 JAX의 주요 기능 중 일부를 소개하겠습니다.

<div class="content-ad"></div>

## I. JIT-컴파일

Just-In-Time (JIT) 컴파일은 코드를 런타임에서 컴파일하는 방법으로, 미리 컴파일하는 것이 아니라 코드를 최적화하여 해당 시스템에서 실행되는 성능을 향상시킬 수 있습니다. Python 스크립트는 해석되며, 이는 코드가 Python 인터프리터에 의해 한 줄씩 읽히고 실행된다는 것을 의미합니다. 이는 인터프리터가 각 코드 라인을 처리한 후에 실행할 수 있기 때문에 컴파일된 코드보다 느릴 수 있습니다.

그에 반해 JIT 컴파일은 Python 코드를 런타임에서 기계 코드로 변환하여 컴퓨터 CPU가 직접 실행할 수 있게 합니다. 이는 Python의 오버헤드를 효과적으로 제거하고 해석된 코드보다 성능을 향상시킬 수 있습니다. 배열을 입력으로 사용하여 결과를 반환하는 더미 커널 함수의 예시를 살펴보겠습니다:

```python
import jax.numpy as jnp

def kernel(x):
  """더미 커널 함수입니다."""
  result = 0
  for i in range(10):
      result += i * jnp.sin(jnp.cos(x))
  return result.sum()
```

<div class="content-ad"></div>

랜덤 입력 배열을 생성하고 JIT 컴파일 없이 구현된 함수 호출의 실행 시간을 측정해 봅시다.

```js
import jax

x = jax.random.normal(jax.random.key(2024), shape=(100_000, ))
# Array([ 0.8188207 ,  0.70407075, -0.553007  , ..., -0.07251461,
#       -1.353674  , -0.21451078], dtype=float32)

%timeit kernel(x).block_until_ready()
2.34 ms ± 134 µs per loop (mean ± std. dev. of 7 runs, 100 loops each)
```

%timeit은 Jupyter 노트북과 IPython에서 사용되는 매직 명령어로, 코드 조각의 실행 시간을 측정하는 데에 사용됩니다. 평균 실행 시간을 얻기 위해 코드를 여러 번 실행하여 성능의 정확한 측정을 제공합니다.

JAX는 비동기 디스패치를 사용하므로, JAX 배열에 block_until_ready() 메서드를 호출하면 이러한 배열이 계산을 완료할 때까지 파이썬 프로그램 실행이 차단됩니다. 이는 계산 속도의 미세한 벤치마크를 작성할 때 권장되는 방법입니다.

<div class="content-ad"></div>

보고된 결과인 2.34 ms ± 134 µs는 각각 100번 실행한 7개의 루프를 기반으로 한 루프당 평균 시간과 표준 편차를 나타냅니다.

이제 이 함수의 JIT 컴파일된 버전(데코레이터를 사용하여 적용할 수도 있음)을 만들고, 그 후에 실행 시간을 다시평가하겠습니다.

```js
import jax 

jitted_kernel = jax.jit(kernel)

# 웜업 호출
# jitted_kernel(x)

%timeit jitted_kernel(x).block_until_ready()
82.5 µs ± 1.9 µs per loop (mean ± std. dev. of 7 runs, 10,000 loops each)
속도 향상: 29배
```

JIT 함수의 웜업 호출은 일반적으로 성능을 컴파일하고 최적화하기 전에 실행됩니다. 함수 구현이 간단하기 때문에 이 단계를 생략했습니다.

<div class="content-ad"></div>

컴파일된 함수는 JIT 컴파일을 통해 달성한 상당한 성능 향상을 보여주며, 비컴파일된 버전보다 29배 빠르게 실행됩니다. 이러한 JAX 기능은 고성능 Python 함수를 작성하는 데 도움이 됩니다.

## II. 자동 미분

자동 미분은 함수의 도함수를 자동으로 계산하는 계산 기술이다. 수치 미분이 유한 차이를 사용하여 도함수를 근사하는 데 반해, 심볼릭 미분은 식을 조작하여 도함수를 찾는 반면, 자동 미분은 미분을 체인 룰을 체계적으로 적용함으로써 정확하고 효율적으로 평가합니다. 현재 자동 미분은 PyTorch, TensorFlow, 그리고 JAX와 같은 딥러닝 프레임워크에서 중요한 역할을 하는데, 그레이디언트 하강과 같은 최적화 알고리즘에 필요한 그레이디언트를 효율적으로 계산할 수 있기 때문에 매우 가치 있는 기능입니다.

자동 미분은 JAX의 핵심 기능 중 하나로, 그레이디언트를 계산하는 프로세스를 단순화하고 가속화합니다. JAX는 미분을 수행하기 위한 여러 함수를 제공하는데, 그 중에서도 jax.grad가 가장 주목할 만한데, 이 함수는 입력에 대한 스칼라 값 함수의 그레이디언트를 계산합니다.

<div class="content-ad"></div>

이전 예제 커널을 고려해 봅시다. jax.grad를 사용하여 다음 코드를 통해 각 입력에 대한 출력의 경사도를 쉽게 계산할 수 있습니다:

```js
import jax 

gradient_kernel = jax.grad(kernel)

kernel(x)
# Array(2401043.5, dtype=float32)

gradient_kernel(x)
# Array([-25.491356 , -21.069756 ,  15.582619 , ...,   1.7687505,
#        42.92778  ,   5.35899  ], dtype=float32)

%timeit gradient_kernel(x).block_until_ready()
56.3 ms ± 7.11 ms per loop (mean ± std. dev. of 7 runs, 10 loops each)
```

더불어 JAX의 조합 가능한 기능 덕분에 jax.grad를 jax.jit와 매끄럽게 결합하여 커널의 경사도를 자동으로 계산하는 최적화된 함수를 만들 수 있습니다. 이렇게 함으로써 JAX의 자동 미분 기능을 활용하여 효율적으로 경사도를 계산하면서, JIT 컴파일을 통해 성능을 향상시킬 수 있습니다.

```js
import jax 

jitted_gradient_kernel = jax.jit(gradient_kernel) 

%timeit jitted_gradient_kernel(x).block_until_ready()
192 µs ± 37.7 µs per loop (mean ± std. dev. of 7 runs, 1 loop each)
```

<div class="content-ad"></div>

분자 시뮬레이션의 맥락에서 물리 시스템 내의 원자간 힘은 총 포텐셜 에너지 함수의 기울기에서 얻어집니다. 이 관계는 자동 미분의 중요성을 강조하며, 이는 힘의 구성 요소를 정확하고 효율적으로 계산하는 수단을 제공합니다. 자동 미분을 통해 필요한 포텐셜 에너지 함수의 도함수를 정확하게 계산함으로써 힘의 구성 요소가 높은 정밀도로 결정될 수 있습니다.

## III. 자동 벡터화

벡터화된 계산은 개별 요소가 아닌 전체 배열에 연산을 적용하는 과정을 말합니다. 이를 통해 현대 CPU 및 GPU(i.e. SIMD)의 기능을 활용하여 병렬로 계산을 수행함으로써 전통적인 루프 기반 접근 방식보다 훨씬 빠른 실행 시간을 얻을 수 있습니다. Python에서 효율적인 코드를 작성하기 위해서는 대부분의 경우 루프 사용을 피하고 배열에 작용하는 범용 함수의 효율적인 구현에 의존하는 것이 좋습니다. 저의 경험 상, 수치 계산 Python으로 전환하는 과정은 사고 방식의 변화를 요구합니다. C/C++와 같은 저수준 프로그래밍 언어는 보통 다수의 루프를 사용하지만, 수치 계산 Python의 접근 방식은 루프를 피하고 논리를 벡터 함수로 변역하는 데 중점을 두고 있습니다. 벡터화된 계산을 활용하면 전체적인 성능이 크게 향상됩니다. NumPy는 벡터화된 계산을 활용하여 함수의 성능과 효율성을 크게 향상시킵니다.

jax.vmap 변환은 함수의 벡터화된 구현을 자동으로 생성하여 배열 상에서 함수를 병렬 및 효율적으로 적용하기 쉽게 만듭니다. 또한 명시적인 루프가 필요 없도록 코드를 간소화시킵니다.

<div class="content-ad"></div>

위치 벡터 배열 간의 거리를 계산하는 예제는 분자 시뮬레이션에서 원자 간의 거리를 결정하는 데 필수적이므로 이 문맥에서 특히 중요합니다. 두 배열 x와 y가 있는 상황을 가정해보겠습니다. 각 배열은 원자 집합에 대한 위치 벡터를 포함하고 있습니다. 두 배열 모두 차원이 (원자 수, 3)인데, 여기서 원자 수를 나타내는 natoms가 있고, 배열의 각 벡터는 원자의 3D 좌표를 포함합니다. 우리의 목표는 이러한 배열에서 각 벡터 쌍 간의 거리를 포착하는 거리 행렬을 계산하는 것입니다. 아래 함수는 두 입력 배열 간의 이 거리 행렬을 반환합니다:

```js
import jax.numpy as jnp

def calculate_distances(x, y):
    distances = []
    nrows, _ = x.shape
    for i in range(nrows):
        distances_from_single_point = jnp.sqrt(((x[i] - y)**2).sum(axis=1))
        distances.append(distances_from_single_point)
    return jnp.array(distances)
```

여기서는 배열 계산을 사용하여 배열 x의 각 점에서 배열 y의 모든 점까지의 거리를 효율적으로 계산했습니다. 예를 들어, 브로드캐스트된 용어 x[i] — y는 명시적 루프가 필요 없이 요소별 뺄셈을 수행할 수 있도록 합니다. 이로써 연산 효율성과 명확성을 높일 수 있습니다.

이 프로세스는 JAX에서 자동으로 효율적으로 벡터화될 수 있습니다. jax.vmap을 사용하여 배열의 포지션 벡터를 병렬로 처리하는 함수로 단일 포인트에서 작동하는 함수를 변환할 수 있습니다. 이를 달성하기 위해 우선 단일 포인트를 처리하는 함수인 calculate_distances_from_single_point를 정의한 다음, jax.vmap을 사용하여 이 함수를 입력 배열의 첫 번째 인덱스에 적용하여 for 루프 없이 배치에 걸쳐 효율적으로 계산할 수 있습니다. 이 접근 방식은 코드를 단순화하는데 도움이 되며, 빠른 실행을 위해 JAX의 최적화 능력을 활용할 수 있습니다.

<div class="content-ad"></div>

```js
import jax

def calculate_distances_from_single_point(xi, y):
    return jnp.sqrt(((xi - y)**2).sum(axis=1))

vmapped_calculate_distances = jax.vmap(
calculate_distances_from_single_point, 
in_axes=(0, None)
)
```

in_axes=(0, None)는 벡터화된 함수의 입력 축을 지정합니다. 이 경우 첫 번째 인자(xi)가 첫 번째 축(0)을 따라 매핑되고, 두 번째 인자(y)는 변경되지 않는 것(None)을 나타내며, 이는 모든 계산에서 동일하게 유지된다는 것을 나타냅니다.

두 구현은 동일한 결과를 생성합니다. 아래의 어서션은 for-loop 구현으로 계산된 거리가 벡터화된 구현으로 계산된 거리와 동일함을 보장합니다.

```js
import jax

# 형태(shape)가 (natoms, dim)인 랜덤 배열 생성
x = jax.random.normal(jax.random.key(2024), shape=(100, 3))

assert jnp.allclose(
  calculate_distances(x, x), 
  calculate_distances_vmap(x, x)
) 
```

<div class="content-ad"></div>

하지만, 매핑된 함수의 성능은 벡터화가 더 잘 되어 있기 때문에 현저히 빠릅니다. 또한 구현이 더 가독성이 좋습니다. 시간 프로파일링 결과는 다음과 같이 이러한 차이를 명확히 보여줍니다:

```js
%timeit calculate_distances(x, x).block_until_ready()
93.5 ms ± 6.04 ms per loop (mean ± std. dev. of 7 runs, 10 loops each)
가속:  1배

%timeit vmapped_calculate_distances(x, x).block_until_ready()
2.54 ms ± 147 µs per loop (mean ± std. dev. of 7 runs, 100 loops each)
가속:  36배
```

이제 JIT 컴파일과 jax.vmap을 다시 결합하여 더 나은 성능을 얻을 수 있습니다.

```js
jitted_vmapped_calculate_distances = jax.jit(vmapped_calculate_distances) 

%timeit jitted_vmapped_calculate_distances(x, x).block_until_ready()
60.3 µs ± 1.59 µs per loop (mean ± std. dev. of 7 runs, 10,000 loops each)
가속: 1558배
```

<div class="content-ad"></div>

이 조합은 JAX의 고급 최적화 기술을 최대한 활용하여 계산의 효율성을 극대화합니다. 이것은 이 게시물에서 논의하고 싶었던 내용입니다.

다음 섹션에서는 JAX가 실제 문제를 해결하고 Python에서 고성능 애플리케이션을 구축하는 믿을 만한 프레임워크일 수 있다는 것을 보여주기 위해 분자 역학 쇼케이스를 제시할 것입니다.

# 분자 역학 쇼케이스

문서에서 직관적이고 명확한 코드 예제들은 복잡한 문제를 다룰 때 종종 부족함을 보입니다. 더 심각한 문제에 참여함으로써 우리는 항상 심층적으로 이해하고 최적화된 애플리케이션을 개발하기 위해 고급 기능을 활용할 수 있습니다. 이 쇼케이스가 분자 시뮬레이션의 복잡한 세부 사항에 집중하지 않더라도 도움이 될 것으로 기대합니다. 이 쇼케이스가 강조하려는 것은 스크립트를 최적화하는 데 필요한 주요 JAX 기능을 강조하기 위한 것입니다. 이 예제는 도메인 지식의 기본적인 이해를 돕기 위해 일부러 간단하게 유지되었습니다.

<div class="content-ad"></div>

## MD 시뮬레이션이란 무엇인가요?

분자 역학(MD) 시뮬레이션은 원자와 분자의 물리적 움직임을 연구하는 강력한 계산 방법입니다. 이는 이러한 입자들의 움직임을 시뮬레이션하여 복잡한 시스템의 물리적 및 화학적 특성에 대한 자세한 통찰을 제공합니다. MD 시뮬레이션은 물리학, 화학, 재료과학 등 다양한 분야에서 널리 사용되며 실험적으로 포착하기 어려운 현상들을 미시적인 시각으로 제공합니다.

MD 시뮬레이션의 중요한 부분은 힘 필드입니다. 이것은 분자 시스템의 잠재 에너지를 정의하는 수학적 함수와 매개변수의 집합입니다. 이것은 원자들이 서로 상호 작용하는 방식을 결정하여 그들의 움직임을 이끄는 힘을 제공합니다. 원자들은 뉴턴의 운동 방정식에 따라 움직이는데, 이는 힘에 의해 전달되는 작용에 반응하여 입자들의 위치와 속도가 어떻게 시간이 지남에 따라 변화하는지를 설명합니다. Verlet 알고리즘은 뉴턴의 운동 방정식을 해결하기 위한 흔히 사용되는 수치 적분 방법입니다.

## 초기 구조

<div class="content-ad"></div>

MD(simulation : Molecular Dynamics)를 시작하려면 원자의 위치와 속도를 일반적으로 특정 구성을 기반으로 초기화합니다. 예를 들어 실험 구조물이나 무작위로 생성된 배열을 기반으로 합니다. 아래의 코드는 ASE 패키지를 사용하여 헬륨 원자의 간단한 입방체 격자를 생성하고, 해당 구조를 Pantea에 만들어 JAX 배열에 저장된 원자 좌표 및 관련 정보를 나타내는 컨테이너를 생성합니다:

```js
from ase import Atoms
from ase.visualize import view
from pantea.atoms import Structure

d = 6  # 원자 간 거리(애스트로름) 
unit_cell = Atoms('He', positions=[(d/2, d/2, d/2)], cell=(d, d, d))
initial_structure = Structure.from_ase(unit_cell.repeat((10, 10, 10)))

view(atoms=initial_structure.to_ase(), viewer='ngl')
```

<img src="/assets/img/2024-06-22-WhyYouShouldLearnJAXAMolecularDynamicsShowcase_1.png" />

## 레너드-존스 힘장

<div class="content-ad"></div>

한 쌍의 원자 간 상호 작용을 설명하는 간단한 힘 필드 중 하나는 레너드-존스(LJ)입니다. 이것은 약한 분자간 인력과 척력 모델링에 특히 유용합니다. 주어진 입력 구조체에 대한 총 레너드-존스 포텐셜 에너지와 힘 성분을 계산하는 퍼텐셜 클래스를 정의해 봅시다.

```js
import jax
import jax.numpy as jnp
from jax import Array
from pantea.atoms import Structure
from typing import NamedTuple, Optional

class LJPotentialParams(NamedTuple):
    epsilon: Array
    sigma: Array

class LJPotential:
    """레너드-존스 포텐셜의 간단한 구현체입니다."""
    def __init__(
        self,
        sigma: float,
        epsilon: float,
        r_cutoff: float,
    ) -> None:
        self.sigma = jnp.array(sigma)
        self.epsilon = jnp.array(epsilon)
        self.r_cutoff = jnp.array(r_cutoff)
    def __call__(self, structure: Structure) -> Array:
        """총 포텐셜 에너지를 계산합니다."""
        return _compute_total_energy(
            LJPotentialParams(self.epsilon, self.sigma),
            structure.positions,
            structure.lattice,
            self.r_cutoff,
        )
    def compute_forces(self, structure: Structure) -> Array:
        """모든 원자에 대한 힘 성분을 계산합니다."""
        return _compute_forces(
            LJPotentialParams(self.epsilon, self.sigma),
            structure.positions,
            structure.lattice,
            self.r_cutoff,
        )
```

LJPotentialParams는 레너드-존스 포텐셜을 위해 두 가지 필수 매개변수를 저장하는 NamedTuple입니다.

LJPotential 클래스는 입력 구조체를 가져와서 두 내부 커널 함수인 _compute_total_energy와 _compute_forces로 필요한 인수를 전달합니다. 이 함수들은 실제 물리량을 계산하고 반환하는 역할을 합니다.

<div class="content-ad"></div>

이것이 JAX 기능을 활용하여 함수를 최적화하는 흥미로운 부분이 시작됩니다. 다음에는 에너지와 힘 계산의 커널을 따로 논의할 것입니다.

## 포텐셜 에너지

이론
두 개의 원자 사이의 레너드-존스 포텐셜은 다음 방정식으로 정의됩니다:

![equation](/assets/img/2024-06-22-WhyYouShouldLearnJAXAMolecularDynamicsShowcase_2.png)

<div class="content-ad"></div>

V(r)는 두 입자 간의 거리 r의 함수로써의 위치 에너지를 나타냅니다. ε 파라미터는 인력의 강도를 나타내는 위치 에너지 우물의 깊이를 나타냅니다. σ 파라미터는 입자 간 위치 에너지가 제로가 되는 유한 거리로, 원자의 유효 지름을 나타냅니다. 첫 번째 항목은 장거리에서 우세한 반 데르 발스 힘을 설명하며, 두 번째 항목은 매우 짧은 거리에서 오바하는 전자 궤도의 중첩으로 인한 폴리 청반작용을 설명합니다. rcut는 위치 에너지가 제로로 간주되는 자르기 반지름입니다. 자르기는 효율성과 물리적 정확성을 향상시키기 위해 상호 작용의 범위를 제한하는 데 사용됩니다.

N 개의 입자 시스템에 대해서, 총 위치 에너지 U는 모든 입자 쌍에 대한 쌍별 상호작용의 합으로 다음과 같이 정의됩니다:

![equation](https://carbon.now.sh/assets/img/2024-06-22-WhyYouShouldLearnJAXAMolecularDynamicsShowcase_3.png)

여기서, rij는 원자 i와 원자 j 사이의 거리를 나타냅니다. 각 입자 쌍이 한 번만 고려되도록 (중복 계산 없음)하고, 자기 상호작용은 무시해야 합니다.

<div class="content-ad"></div>

구현
아래 파이썬 코드는 원자 쌍 간의 레너드-존스 포텐셜 에너지를 계산하는 함수를 정의합니다.

```js
def _compute_pair_energies(params: LJPotentialParams, r: Array) -> Array:
    term = params.sigma / r
    term6 = term**6
    return 4.0 * params.epsilon * term6 * (term6 - 1.0)
```

_compute_pair_energies 함수는 거리(r)를 이용하여 원자 쌍의 레너드-존스 포텐셜 에너지를 계산합니다. 이 함수는 포텐셜 매개변수(params)를 사용하고 계산을 수행하여 포텐셜 에너지 배열을 반환합니다.

다음으로, 우리는 원자 시스템의 총 레너드-존스 포텐셜 에너지를 계산하기 위해 쌍별 포텐셜을 합산하는 JIT 컴파일된 함수를 다음과 같이 정의합니다:

<div class="content-ad"></div>

```js
import jax
import jax.numpy as jnp
from pantea.atoms.neighbor import _calculate_masks_with_aux_from_structure

@jax.jit
def _compute_total_energy(
    params: LJPotentialParams,
    positions: Array,
    lattice: Optional[Array],
    r_cutoff: Array,
) -> Array:
    masks, (rij, _) = _calculate_masks_with_aux_from_structure(
        positions, r_cutoff, lattice
    )
    pair_energies = _compute_pair_energies(params, rij)
    pair_energies_inside_cutoff = jnp.where(masks, pair_energies, 0.0)
    return 0.5 * jnp.sum(pair_energies_inside_cutoff)
```

_calculate_masks_with_aux_from_structure 함수는 거리가 잘림 거리 이내에 있고 자기 상호 작용을 제외한 각 원자 쌍에 대해 부울 배열 (마스크)을 계산합니다. 또한, 두 원자 간 거리를 포함하는 배열 (rij)을 반환하여 원자 간 잠재 에너지 평가를 다시 계산하지 않도록 합니다. 이 함수는 이 토론을 간소화하기 위해 Pantea에서 가져왔습니다. 거리를 계산하기 위해 시뮬레이션 상자의 주기적 경계 조건 (lattice)도 고려합니다.

앞서 설명한 대로, _compute_pair_energies 함수는 잠재 에너지 매개변수와 거리 (rij)를 사용하여 각 원자 쌍에 대한 LJ 잠재 에너지를 계산합니다.

jnp.where는 거리가 잘림 거리를 벗어난 쌍에 대해 에너지를 0으로 설정하여 마스크를 적용합니다. 이 방법은 루프를 사용하지 않고 배열에 조건 로직을 효율적으로 적용합니다. np.where는 내부적으로 높도 최적화된 C 코드로 구현되어 있습니다. 이는 한 번에 전체 배열에 작동하며, JAX가 벡터화된 작업을 수행할 수 있는 능력을 활용합니다.

<div class="content-ad"></div>

총 에너지는 jnp.sum을 사용하여 반환됩니다. 각 쌍 상호 작용을 두 번 계산했기 때문에 0.5를 곱하여 고려합니다.

간단히 말해, _compute_total_energy 함수는 원자 시스템의 전체 레나드-존스(Lennard-Jones) 포텐셜 에너지를 계산합니다. 우리는 먼저 절단 거리 내에 있는 원자 쌍을 판별하기 위해 부울 마스크를 생성합니다. 그런 다음, rij를 사용하여 모든 쌍에 대한 Lennard-Jones 에너지를 계산하고, 절단 값 내의 쌍 에너지를 필터링한 후, 절단 거리를 고려하여 쌍 에너지를 합산합니다. 이 결과 함수는 원자 위치에 기반한 총 상호 작용 에너지를 제공하여 MD 시뮬레이션에 중요한 역할을 합니다.

이 작업이 번거로워 보일 수 있지만, 원자의 쌍 에너지는 어차피 계산해야 합니다. 과거에 if 문을 추가하여 이를 피해보려고 했지만, 이 구현과 비교했을 때 성능은 상당히 떨어졌습니다. 이 방법은 벡터화된 계산을 사용하기 때문에 전통적인 저수준 언어 접근 방식에서 새로운 배열 계산에 주력해야 함을 강조합니다. C/C++에서 모든 것을 최적화하는 데 며칠을 들일 수도 있지만, Python에서 이 방법을 통해 벡터화로 더 나은 성능을 달성할 수 있으면서 개발 시간도 훨씬 절약할 수 있습니다. 또한 많은 JAX 연산은 내부적으로 병렬화되어 있고 실행 시간을 더 최적화하기 위해 여러 스레드를 활용합니다.

아래의 예시 코드는 1000개의 원자를 포함하는 입력 구조체에 대한 총 포텐셜 계산 및 예상 실행 시간을 보여줍니다:

<div class="content-ad"></div>

```js
ljpot(initial_structure)
# Array(-0.00114392, dtype=float64)

%timeit ljpot(initial_structure).block_until_ready()
5.12 ms ± 38.9 µs per loop (mean ± std. dev. of 7 runs, 100 loops each))
```

## 힘 벡터

이론
레너드-존스 시스템에서 두 입자 간의 힘은 포텐셜 에너지에서 유도될 수 있습니다. 입자 i에 대한 입자 j로 인한 힘 벡터 Fij는 레너드-존스 포텐셜 V(rij)의 음의 그래디언트로 주어집니다:

<img src="/assets/img/2024-06-22-WhyYouShouldLearnJAXAMolecularDynamicsShowcase_4.png" />

<div class="content-ad"></div>

rij = ri — rj은 입자 j에서 입자 i를 가리키는 벡터를 나타냅니다. 우리는 힘에 대한 cutoff도 적용합니다. 입자 i에 작용하는 총 힘을 계산하기 위해 다른 모든 입자 j로부터의 기여를 합산합니다:


![image](/assets/img/2024-06-22-WhyYouShouldLearnJAXAMolecularDynamicsShowcase_5.png)


이것은 시스템 내 다른 모든 입자들로부터 입자 i에 작용하는 순 힘을 제외한 것을 제공합니다.

구현
아래 코드는 방정식 3을 사용하여 두 원자 쌍 간의 힘을 계산합니다:

<div class="content-ad"></div>

```js
def _compute_pair_forces(params: LJPotentialParams, r: Array, R: Array) -> Array:
    term = params.sigma / r
    term6 = term**6
    coefficient = -24.0 * params.epsilon / (r * r) * term6 * (2.0 * term6 - 1.0)
    return jnp.expand_dims(coefficient, axis=-1) * R
```

`_compute_pair_forces` 함수는 레너드-존스(Lennard-Jones) 포텐셜을 사용하여 원자 쌍 간의 힘을 계산합니다. 이 함수는 포텐셜을 정의하는 매개변수, 원자 간 거리 및 상대 위치 벡터를 입력으로 사용합니다.

`jnp.expand_dims(factor, axis=-1) * R`: 상대 위치 벡터 R을 계산된 힘 인자로 조정하고, 곱셈 연산에서 브로드캐스팅에 적합한 차원임을 보장하기 위해 expand_dims를 사용합니다. 결과 배열은 각 쌍의 원자 간의 힘을 나타냅니다.

이어서 Equation 4를 사용하여 총 힘을 계산합니다.

<div class="content-ad"></div>

```python
@jax.jit
def _compute_forces(
    params: LJPotentialParams,
    positions: Array,
    lattice: Optional[Array],
    r_cutoff: Array,
) -> Array:
    masks, (rij, Rij) = _calculate_masks_with_aux_from_structure(
        positions, r_cutoff, lattice
    )
    pair_forces = _compute_pair_forces(params, rij, Rij)
    pair_forces_inside_cutoff = jnp.where(
        jnp.expand_dims(masks, axis=-1),
        pair_forces,
        jnp.zeros_like(Rij),
    )
    return jnp.sum(pair_forces_inside_cutoff, axis=1)  
```

_compute_forces 함수는 최적화를 위해 JIT 컴파일을 사용하여 각 원자에 작용하는 총 힘을 계산합니다.

_calculate_masks_with_aux_from_structure 함수는 커프트 부울 마스크를 계산하고 추가로 pairwise 거리 (rij)와 상대적 위치 벡터 (Rij)를 반환합니다.

jnp.where은 마스크가 True인 경우에만 계산된 pairwise 힘을 적용합니다. jnp.expand_dims(masks, axis=-1)를 사용하여 마스크 차원이 Rij와 곱셈 브로드캐스팅을 일치시킵니다. 마스크가 False인 경우 0 힘 벡터(jnp.zeros_like(Rij))를 할당합니다. 또한 JAX는 오버헤드를 줄이기 위해 메모리 풀을 사용하므로 0 크기의 벡터를 할당하는 것은 계산적으로 부담이 없습니다. 배열에 대한 참조 재할당은 실제 메모리 할당을 포함하지 않기 때문입니다.


<div class="content-ad"></div>

그리고 jnp.sum(pair_forces, axis=1)은 각 원자에 작용하는 총 힘을 구하기 위해 쌍별 힘을 합산합니다.

상자 내의 모든 원자에 대해 힘 구성 요소를 계산하고 실행 시간을 측정하는 유사한 예시 코드:

```js
ljpot.compute_forces(initial_structure)
# Array([[ 1.11173074e-21,  1.11173074e-21,  1.11173074e-21],
#       ...,
#       [-1.87935435e-21, -1.87935435e-21, -1.87935435e-21]],  dtype=float64)

%timeit ljpot.compute_forces(initial_structure).block_until_ready()
6.71 ms ± 4.63 µs per loop (mean ± std. dev. of 7 runs, 100 loops each)
```

지금까지 잘 진행되고 있어요!
지금까지 우리는 MD 시뮬레이션을 위해 필요한 Lennard-Jones 포텐셜의 JAX 버전을 구현했습니다. 다음 단계는 이 포텐셜과 초기 구조를 사용하여 시스템을 시간 동안 시뮬레이션하는 것입니다.

<div class="content-ad"></div>

# 분자동력학 시뮬레이션

시스템 시뮬레이션을 위해 Pantea에서 제공하는 MDSimulator 모듈을 사용합니다. 이 모듈은 시뮬레이션이 어떻게 진행될지를 정의하는데, 적분 알고리즘, 온도 조절기 및 기타 필수적인 시뮬레이션 설정을 포함합니다. 시스템을 일정한 온도에서 시뮬레이션하고 있으므로, 온도 조절기를 정의하는 것이 필요합니다.

다음 매개변수를 사용하여 MD 시뮬레이터를 초기화해 보겠습니다:

```js
from pantea.simulation import MDSimulator, BrendsenThermostat

time_step = 0.5 * units.FROM_FEMTO_SECOND      # 0.5e-15 초
thermostat = BrendsenThermostat(               # 온도를 제어 
  target_temperature=300.0,                    # 26°C의 상온
  time_constant=100 * time_step                # 온도 조절 속도
)
simulator = MDSimulator(time_step, thermostat)
```

<div class="content-ad"></div>

다음으로, 우리는 사실상 원자들과 그들 사이의 상호작용의 표현에 불과한 시스템을 만듭니다. 이 시스템에는 원자 위치, 속도, 그리고 상호작용 매개변수와 같은 정보가 포함됩니다. 입력 구조에서 시스템을 다음과 같이 생성할 수 있습니다:

```js
from pantea.simulation import System

system = System.from_structure(
  initial_structure,   # 원자 초기 위치
  potential=ljpot,     # 원자간 상호작용으로 LJ 설정
  temperature=300.0    # 온도에 기반한 원자 속도 초기화
)
```

마지막으로, MD 시뮬레이션을 실행하기 위해 simulate 함수를 호출합니다.

```js
from pantea.simulation import simulate

# simulate(sys, simulator) # 예열
simulate(system, simulator, num_steps=10000, output_freq=1000)
```

<div class="content-ad"></div>


num_steps=10000: 이 매개변수는 수행할 시뮬레이션 단계의 총 수를 설정합니다. 각 단계는 일반적으로 모의 시간의 작은 증분에 해당하며, 이 동안 원자의 위치와 속도가 업데이트됩니다.

output_freq=1000: 이 매개변수는 시뮬레이션 결과가 출력되는 빈도를 지정합니다. 이 경우에는 데이터가 매 1000개의 시뮬레이션 단계마다 저장되거나 출력됩니다.

결과로는 각 1000단계 후에 스텝, 온도, 포텐셜 에너지 및 압력과 같은 물리적 특성이 출력됩니다.

![이미지](/assets/img/2024-06-22-WhyYouShouldLearnJAXAMolecularDynamicsShowcase_6.png)


<div class="content-ad"></div>

아래 그림은 주기성 상자 내의 1000개 헬륨 원자에 대한 MD 시뮬레이션이 시간에 따라 어떻게 진행되는지 보여줍니다:

![MD 시뮬레이션](https://miro.medium.com/v2/resize:fit:1400/1*7S2L0PRoZSHhxMf3UtIvxA.gif)

성능
아래 그래프에서 보듯이, 저희의 JAX 커널은 GPU의 거의 모든 용량을 효율적으로 활용하여 시뮬레이션을 수행합니다 (Device 1). 이 높은 수준의 자원 활용은 GPU의 컴퓨팅 파워를 최대로 이끌어내어 시뮬레이션의 속도와 성능을 현저히 향상시킵니다.

![GPU 활용 그래프](/assets/img/2024-06-22-WhyYouShouldLearnJAXAMolecularDynamicsShowcase_7.png)

<div class="content-ad"></div>

제 노트북 CPU와 더 강력한 GPU인 A100에서도 동일한 MD 시뮬레이션을 실시했습니다. 결과는 GPU 계산으로 상당한 속도 향상을 보여줍니다. GPU 하드웨어를 사용하는 중요성을 강조하기 위해 2000개의 원자를 포함한 시스템을 시뮬레이션했습니다. JAX의 훌륭한 기능 중 하나는 원본 코드를 수정하지 않고 CPU에서 GPU로 코드 실행을 매끄럽게 전환할 수 있다는 점인데, 이는 상당한 시간과 노력을 절약할 수 있습니다.

![이미지](/assets/img/2024-06-22-WhyYouShouldLearnJAXAMolecularDynamicsShowcase_8.png)

나노초당 일(ND/day)은 MD 시뮬레이션의 성능과 효율을 측정하는 일반적인 지표로, 시뮬레이션이 얼마나 빨리 진행되는지를 나타냅니다. 그림에서 나타나듯이 GPU 가속 컴퓨팅은 코드의 성능을 수십 배 향상시킬 수 있습니다. 대규모 시뮬레이션의 경우, 도메인 분해를 사용하여 시스템을 병렬화하는 것이 최적의 접근 방식일 것입니다. 이 방법에서 각 도메인은 제한된 GPU 메모리 요구 사항을 가지며 힘을 계산하고 원자 상태를 업데이트하는 데 사용될 수 있습니다.

# 마무리

<div class="content-ad"></div>

이 게시물이 여러분의 호기심을 자극해 JAX를 탐험하고 배워보며 여러분만의 프로젝트에 적용해 보시기를 바라요.

아래 링크된 저장소를 통해 JAX와 함께 하는 Pantea 프로젝트에 대해 더 많이 알아보실 수 있어요. 저는 거기서 JAX의 오토딥 핵심 기능을 광범위하게 활용하고 있어요. 이 작업은 아직 진행 중이니, 피드백이나 의견은 언제든 환영해요.

읽어 주셔서 감사해요. 여러분의 작업을 위해 JAX의 가능성을 완전히 끌어올리기 위해 더 깊이 파고들 것을 촉구해요!