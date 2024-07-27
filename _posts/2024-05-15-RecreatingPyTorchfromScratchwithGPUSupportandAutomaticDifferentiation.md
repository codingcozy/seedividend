---
title: "파이토치를 처음부터 다시 만들어보기 GPU 지원 및 자동 미분 기능 포함"
description: ""
coverImage: "/assets/img/2024-05-15-RecreatingPyTorchfromScratchwithGPUSupportandAutomaticDifferentiation_0.png"
date: 2024-05-15 10:33
ogImage: 
  url: /assets/img/2024-05-15-RecreatingPyTorchfromScratchwithGPUSupportandAutomaticDifferentiation_0.png
tag: Tech
originalTitle: "Recreating PyTorch from Scratch (with GPU Support and Automatic Differentiation)"
link: "https://medium.com/towards-data-science/recreating-pytorch-from-scratch-with-gpu-support-and-automatic-differentiation-8f565122a3cc"
---


## C/C++, CUDA, 및 Python을 기반으로 한 고유의 딥 러닝 프레임워크를 구축해 보세요. GPU 지원과 자동 미분을 제공합니다

![image](/assets/img/2024-05-15-RecreatingPyTorchfromScratchwithGPUSupportandAutomaticDifferentiation_0.png)

# 소개

여러 해 동안 PyTorch를 사용하여 딥 러닝 모델을 구축하고 훈련해 왔습니다. 그럼에도 불구하고, 그 문법과 규칙을 익히고도, 제 궁금증을 자극하던 것이 있었습니다: 이러한 작업 중에 내부에서 어떤 일이 일어나고 있는 걸까요? 이 모든 것이 어떻게 작동할까요?



여기까지 오셨다면, 아마도 비슷한 질문을 가지고 계실 것입니다. 파이토치(PyTorch)에서 모델을 생성하고 훈련하는 방법을 물어본다면 아마도 아래 코드와 비슷한 것을 생각해볼 것입니다:

```js
import torch
import torch.nn as nn
import torch.optim as optim

class MyModel(nn.Module):
    def __init__(self):
        super(MyModel, self).__init__()
        self.fc1 = nn.Linear(1, 10)
        self.sigmoid = nn.Sigmoid()
        self.fc2 = nn.Linear(10, 1)

    def forward(self, x):
        out = self.fc1(x)
        out = self.sigmoid(out)
        out = self.fc2(out)
        
        return out

...

model = MyModel().to(device)
criterion = nn.MSELoss()
optimizer = optim.SGD(model.parameters(), lr=0.001)

for epoch in range(epochs):
    for x, y in ...
        
        x = x.to(device)
        y = y.to(device)

        outputs = model(x)
        loss = criterion(outputs, y)
        
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
```

하지만 이번에 역전파(backward) 단계가 어떻게 작동하는지 물어본다면 어떨까요? 또는 예를 들어, 텐서를 재구성할 때 무슨 일이 일어나는지 궁금하시다면요? 내부에서 데이터가 재배치되나요? 그런 일이 어떻게 일어나나요? 왜 PyTorch는 빠른가요? PyTorch가 GPU 연산을 어떻게 처리하는지요? 이런 질문들이 항상 저를 호기심 가득하게 만들었고, 여러분도 마찬가지로 호기심이 드실 것이라고 상상합니다. 그래서 이러한 개념을 더 잘 이해하기 위해 스스로 텐서 라이브러리를 처음부터 구축해보는 것이 무엇보다 좋을까요? 이 글에서 여러분이 배우게 될 것이 바로 그겁니다!

## #1 — 텐서



텐서 라이브러리를 구축하기 위해 가장 먼저 알아야 할 개념은 무엇이 텐서인지에 대한 명백한 개념입니다.

텐서는 몇 가지 숫자를 포함하는 n차원 데이터 구조의 수학적 개념이라는 직관적인 생각을 가지고 있을 수 있습니다. 그러나 여기서는 이 데이터 구조를 계산적 관점에서 어떻게 모델링할지 이해해야 합니다. 텐서는 데이터 자체뿐만 아니라 모양이나 텐서가 있는 장치(예: CPU 메모리, GPU 메모리)와 같은 측면을 설명하는 메타데이터로 구성된다고 생각할 수 있습니다.

텐서의 내부를 이해하는 데 매우 중요한 개념인 stride라는 잘 알려지지 않은 메타데이터도 있습니다. 따라서 텐서 데이터 재배열의 내부를 이해하기 위해 약간 더 이에 대해 논의해야 합니다.



2-D 텐서의 모양이 [4, 8]인 경우를 상상해보세요.

![텐서](/assets/img/2024-05-15-RecreatingPyTorchfromScratchwithGPUSupportandAutomaticDifferentiation_2.png)

텐서의 데이터(즉, 부동 소수점 수)는 실제로 메모리에 1차원 배열로 저장됩니다.

![데이터](/assets/img/2024-05-15-RecreatingPyTorchfromScratchwithGPUSupportandAutomaticDifferentiation_3.png)



그러면 이 1차원 배열을 N차원 텐서로 나타내려면 스트라이드를 사용합니다. 기본 아이디어는 다음과 같습니다:

4행 8열의 행렬이 있습니다. 그 행렬의 모든 원소가 1차원 배열의 행에 의해 구성되어 있다고 가정할 때, 위치 [2, 3]의 값을 액세스하려면 2행(각 행에 8개의 요소)을 횡단해야 하며 추가로 3개의 위치를 지나야 합니다. 수학적으로 표현하면 1차원 배열에서 3 + 2 * 8 요소를 횡단해야 합니다.

따라서, '8'은 두 번째 차원의 스트라이드입니다. 이 경우, 배열에서 다른 위치로 "점프"하기 위해 몇 개의 요소를 횡단해야 하는지를 나타내는 정보입니다.



따라서, 모양이 [shape_0, shape_1]인 2차원 텐서의 요소 [i, j]에 액세스하려면, 기본적으로 j + i * shape_1 위치에 있는 요소에 액세스해야 합니다.

이제 3차원 텐서를 상상해보겠습니다:

![image](/assets/img/2024-05-15-RecreatingPyTorchfromScratchwithGPUSupportandAutomaticDifferentiation_5.png)

이 3차원 텐서를 행렬의 시퀀스로 생각할 수 있습니다. 예를 들어, 이 [5, 4, 8] 텐서를 [4, 8] 모양의 5개 행렬로 생각할 수 있습니다.



이제 [1, 3, 7] 위치에 있는 요소에 액세스하기 위해 [4,8] 형태의 행렬을 1개 완전히 횡단하고, [8] 형태의 행을 2개, [1] 형태의 열을 7개 횡단해야 합니다. 따라서 1차원 배열에서 (1 * 4 * 8) + (2 * 8) + (7 * 1) 위치를 횡단해야 합니다.

![image](/assets/img/2024-05-15-RecreatingPyTorchfromScratchwithGPUSupportandAutomaticDifferentiation_6.png)

따라서, [shape_0, shape_1, shape_2] 모양의 3차원 텐서에서 1차원 데이터 배열에서 [i][j][k] 요소에 액세스하는 방법은 다음과 같습니다:

![image](/assets/img/2024-05-15-RecreatingPyTorchfromScratchwithGPUSupportandAutomaticDifferentiation_7.png)



이 shape_1 * shape_2가 첫 번째 차원의 stride이고, shape_2는 두 번째 차원의 stride이며 1은 세 번째 차원의 stride입니다.

그런 다음, 일반화하기 위해서는:

![image](/assets/img/2024-05-15-RecreatingPyTorchfromScratchwithGPUSupportandAutomaticDifferentiation_8.png)

각 차원의 stride는 다음 차원 텐서 모양의 곱을 사용하여 계산할 수 있습니다:



<img src="/assets/img/2024-05-15-RecreatingPyTorchfromScratchwithGPUSupportandAutomaticDifferentiation_9.png" />

그런 다음 stride[n-1] = 1로 설정합니다.

우리의 형태의 텐서 예제 [5, 4, 8]에서 strides = [4*8, 8, 1] = [32, 8, 1]일 것입니다.

여러분들도 직접 테스트할 수 있어요:



```js
import torch

torch.rand([5, 4, 8]).stride()
#(32, 8, 1)
```

알겠어요, 그런데 왜 모양과 스트라이드가 필요한 건가요? N차원 텐서의 요소에 접근하는 것을 넘어, 이 개념은 텐서 배열을 매우 쉽게 조작하는 데 사용될 수 있어요.

예를 들어, 텐서를 재구성하려면 새로운 모양을 설정하고 새로운 스트라이드를 계산하면 됩니다! (새로운 모양은 동일한 요소 수를 보장하므로)

```js
import torch

t = torch.rand([5, 4, 8])

print(t.shape)
# [5, 4, 8]

print(t.stride())
# [32, 8, 1]

new_t = t.reshape([4, 5, 2, 2, 2])

print(new_t.shape)
# [4, 5, 2, 2, 2]

print(new_t.stride())
# [40, 8, 4, 2, 1]
``` 




텐서 내부에서는 여전히 동일한 1차원 배열로 저장됩니다. reshape 메서드는 배열 내 요소의 순서를 변경하지 않았습니다! 대단하지 않나요? 😁

다음 함수를 사용하여 PyTorch에서 내부 1차원 배열에 액세스하는 함수를 사용하여 직접 확인할 수 있습니다:

```js
import ctypes

def print_internal(t: torch.Tensor):
    print(
        torch.frombuffer(
            ctypes.string_at(t.data_ptr(), t.storage().nbytes()), dtype=t.dtype
        )
    )

print_internal(t)
# [0.0752, 0.5898, 0.3930, 0.9577, 0.2276, 0.9786, 0.1009, 0.138, ...

print_internal(new_t)
# [0.0752, 0.5898, 0.3930, 0.9577, 0.2276, 0.9786, 0.1009, 0.138, ...
```

예를 들어 두 축을 전치하려면 내부적으로 해당 스트라이드를 단순히 바꾸어 주면 됩니다!



```js
t = torch.arange(0, 24).reshape(2, 3, 4)
print(t)
# [[[ 0,  1,  2,  3],
#   [ 4,  5,  6,  7],
#   [ 8,  9, 10, 11]],
 
#  [[12, 13, 14, 15],
#   [16, 17, 18, 19],
#   [20, 21, 22, 23]]]

print(t.shape)
# [2, 3, 4]

print(t.stride())
# [12, 4, 1]

new_t = t.transpose(0, 1)
print(new_t)
# [[[ 0,  1,  2,  3],
#   [12, 13, 14, 15]],

#  [[ 4,  5,  6,  7],
#   [16, 17, 18, 19]],

#  [[ 8,  9, 10, 11],
#   [20, 21, 22, 23]]]

print(new_t.shape)
# [3, 2, 4]

print(new_t.stride())
# [4, 12, 1]
```

내부 배열을 출력하면 두 값 모두 동일합니다:

```js
print_internal(t)
# [ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

print_internal(new_t)
# [ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
```

그러나 new_t의 스트라이드는 이제 위의 식과 일치하지 않습니다. 이것은 텐서가 이제 연속적이지 않기 때문에 발생합니다. 즉, 내부 배열은 동일하지만 메모리 내의 값의 순서가 텐서의 실제 순서와 일치하지 않는다는 것을 의미합니다.



```js
t.is_contiguous()
# True

new_t.is_contiguous()
# False
```

이는 연속되지 않는 요소에 연속적으로 액세스하는 것이 효율적이지 않다는 것을 의미합니다 (실제 텐서 요소는 메모리 상에서 순서대로 정렬되어 있지 않기 때문입니다). 이를 해결하기 위해 다음을 수행할 수 있습니다:

```js
new_t_contiguous = new_t.contiguous()

print(new_t_contiguous.is_contiguous())
# True
```

내부 배열을 분석하면 이제 순서가 실제 텐서 순서와 일치하여 더 나은 메모리 액세스 효율을 제공할 수 있습니다:



```js
print(new_t)
# [[[ 0,  1,  2,  3],
#   [12, 13, 14, 15]],

#  [[ 4,  5,  6,  7],
#   [16, 17, 18, 19]],

#  [[ 8,  9, 10, 11],
#   [20, 21, 22, 23]]]

print_internal(new_t)
# [ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

print_internal(new_t_contiguous)
# [ 0,  1,  2,  3, 12, 13, 14, 15,  4,  5,  6,  7, 16, 17, 18, 19,  8,  9, 10, 11, 20, 21, 22, 23]
```

이제 우리는 텐서가 어떻게 모델링되는지 이해했으니, 라이브러리 생성을 시작해 봅시다!

내가 만들 라이브러리 이름은 Norch입니다. PyTorch가 아닌 (NOT PyTorch)을 의미하며, 성(Nogueira)을 암시하기도 합니다. 😁

첫 번째로 알아야 할 것은 PyTorch가 Python을 통해 사용되지만 내부적으로는 C/C++로 실행된다는 것입니다. 그래서 먼저 내부 C/C++ 함수를 만들 것입니다.




먼저 텐서를 데이터와 메타데이터를 저장하는 구조체로 정의하고 이를 만들기 위한 함수를 생성할 수 있습니다:

```js
//norch/csrc/tensor.cpp

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>

typedef struct {
    float* data;
    int* strides;
    int* shape;
    int ndim;
    int size;
    char* device;
} Tensor;

Tensor* create_tensor(float* data, int* shape, int ndim) {
    
    Tensor* tensor = (Tensor*)malloc(sizeof(Tensor));
    if (tensor == NULL) {
        fprintf(stderr, "메모리 할당 실패\n");
        exit(1);
    }
    tensor->data = data;
    tensor->shape = shape;
    tensor->ndim = ndim;

    tensor->size = 1;
    for (int i = 0; i < ndim; i++) {
        tensor->size *= shape[i];
    }

    tensor->strides = (int*)malloc(ndim * sizeof(int));
    if (tensor->strides == NULL) {
        fprintf(stderr, "메모리 할당 실패\n");
        exit(1);
    }
    int stride = 1;
    for (int i = ndim - 1; i >= 0; i--) {
        tensor->strides[i] = stride;
        stride *= shape[i];
    }
    
    return tensor;
}
```

일부 요소에 접근하기 위해서는 앞서 배웠던 스트라이드(strides)를 활용할 수 있습니다:

```js
//norch/csrc/tensor.cpp

float get_item(Tensor* tensor, int* indices) {
    int index = 0;
    for (int i = 0; i < tensor->ndim; i++) {
        index += indices[i] * tensor->strides[i];
    }

    float result;
    result = tensor->data[index];

    return result;
}
```



이제 텐서 작업을 만들 수 있습니다. 몇 가지 예제를 보여드리겠고, 이 글 끝에 링크된 저장소에서 완전한 버전을 찾을 수 있습니다.

```js
//norch/csrc/cpu.cpp

void add_tensor_cpu(Tensor* tensor1, Tensor* tensor2, float* result_data) {
    
    for (int i = 0; i < tensor1->size; i++) {
        result_data[i] = tensor1->data[i] + tensor2->data[i];
    }
}

void sub_tensor_cpu(Tensor* tensor1, Tensor* tensor2, float* result_data) {
    
    for (int i = 0; i < tensor1->size; i++) {
        result_data[i] = tensor1->data[i] - tensor2->data[i];
    }
}

void elementwise_mul_tensor_cpu(Tensor* tensor1, Tensor* tensor2, float* result_data) {
    
    for (int i = 0; i < tensor1->size; i++) {
        result_data[i] = tensor1->data[i] * tensor2->data[i];
    }
}

void assign_tensor_cpu(Tensor* tensor, float* result_data) {

    for (int i = 0; i < tensor->size; i++) {
        result_data[i] = tensor->data[i];
    }
}

...
```

그 다음에, 이러한 작업들을 호출할 텐서 다른 함수를 만들 수 있습니다.

```js
//norch/csrc/tensor.cpp

Tensor* add_tensor(Tensor* tensor1, Tensor* tensor2) {
    if (tensor1->ndim != tensor2->ndim) {
        fprintf(stderr, "덧셈을 위해서 텐서는 동일한 차원 수여야 합니다 %d 와 %d\n", tensor1->ndim, tensor2->ndim);
        exit(1);
    }

    int ndim = tensor1->ndim;
    int* shape = (int*)malloc(ndim * sizeof(int));
    if (shape == NULL) {
        fprintf(stderr, "메모리 할당 실패\n");
        exit(1);
    }

    for (int i = 0; i < ndim; i++) {
        if (tensor1->shape[i] != tensor2->shape[i]) {
            fprintf(stderr, "덧셈을 위해서 텐서는 동일한 모양이어야 합니다 %d 와 %d 인덱스 %d에서\n", tensor1->shape[i], tensor2->shape[i], i);
            exit(1);
        }
        shape[i] = tensor1->shape[i];
    }        
    float* result_data = (float*)malloc(tensor1->size * sizeof(float));
    if (result_data == NULL) {
        fprintf(stderr, "메모리 할당 실패\n");
        exit(1);
    }
    add_tensor_cpu(tensor1, tensor2, result_data);
    
    return create_tensor(result_data, shape, ndim, device);
}
```



이전에 언급한 대로, 텐서 재구성은 내부 데이터 배열을 수정하지 않습니다.

```js
//norch/csrc/tensor.cpp

Tensor* reshape_tensor(Tensor* tensor, int* new_shape, int new_ndim) {

    int ndim = new_ndim;
    int* shape = (int*)malloc(ndim * sizeof(int));
    if (shape == NULL) {
        fprintf(stderr, "메모리 할당 실패\n");
        exit(1);
    }

    for (int i = 0; i < ndim; i++) {
        shape[i] = new_shape[i];
    }

    // 새 모양의 요소 총 수 계산
    int size = 1;
    for (int i = 0; i < new_ndim; i++) {
        size *= shape[i];
    }

    // 총 요소 수가 현재 텐서의 크기와 일치하는지 확인
    if (size != tensor->size) {
        fprintf(stderr, "텐서를 재구성할 수 없습니다. 새 모양의 요소 총 수가 현재 텐서의 크기와 일치하지 않습니다.\n");
        exit(1);
    }

    float* result_data = (float*)malloc(tensor->size * sizeof(float));
    if (result_data == NULL) {
        fprintf(stderr, "메모리 할당 실패\n");
        exit(1);
    }
    assign_tensor_cpu(tensor, result_data);
    return create_tensor(result_data, shape, ndim, device);
}
```

이제 일부 텐서 작업을 수행할 수 있지만, 누구나 C/C++을 사용하여 실행해야 하는 것은 아닙니다. 이제 Python 래퍼를 만들어 봅시다!

Python을 사용하여 C/C++ 코드를 실행할 수 있는 다양한 옵션이 있습니다. Pybind11과 Cython 등이 있습니다. 이 예시에서는 ctypes를 사용할 것입니다.



아래는 ctypes의 기본적인 구조입니다:

```js
//C 코드
#include <stdio.h>

float add_floats(float a, float b) {
    return a + b;
}
```

```js
# 컴파일
gcc -shared -o add_floats.so -fPIC add_floats.c
```

```js
# Python 코드
import ctypes

# 공유 라이브러리 로드
lib = ctypes.CDLL('./add_floats.so')

# 함수의 인자와 반환 유형 정의
lib.add_floats.argtypes = [ctypes.c_float, ctypes.c_float]
lib.add_floats.restype = ctypes.c_float

# 파이썬 float 값을 c_float 유형으로 변환
a = ctypes.c_float(3.5)
b = ctypes.c_float(2.2)

# C 함수 호출
result = lib.add_floats(a, b)
print(result)
# 5.7
```



보시다시피 매우 직관적입니다. C/C++ 코드를 컴파일한 후 Python에서 ctypes를 사용하면 매우 쉽게 사용할 수 있습니다. 함수의 매개변수 및 반환 c_types를 정의하고, 변수를 해당 c_types로 변환하고 함수를 호출하기만 하면 됩니다. 배열(부동 소수점 목록)과 같은 보다 복잡한 유형의 경우 포인터를 사용할 수 있습니다.

```js
data = [1.0, 2.0, 3.0]
data_ctype = (ctypes.c_float * len(data))(*data)

lib.some_array_func.argstypes = [ctypes.POINTER(ctypes.c_float)]

...

lib.some_array_func(data)
```

그리고 구조체 유형의 경우 직접 c_type을 만들 수 있습니다.

```js
class CustomType(ctypes.Structure):
    _fields_ = [
        ('field1', ctypes.POINTER(ctypes.c_float)),
        ('field2', ctypes.POINTER(ctypes.c_int)),
        ('field3', ctypes.c_int),
    ]

# ctypes.POINTER(CustomType)로 사용할 수 있습니다.
```



간단히 설명하고, 텐서 C/C++ 라이브러리를 위한 Python 래퍼를 만들어 보겠습니다!

```js
# norch/tensor.py

import ctypes

class CTensor(ctypes.Structure):
    _fields_ = [
        ('data', ctypes.POINTER(ctypes.c_float)),
        ('strides', ctypes.POINTER(ctypes.c_int)),
        ('shape', ctypes.POINTER(ctypes.c_int)),
        ('ndim', ctypes.c_int),
        ('size', ctypes.c_int),
    ]

class Tensor:
    os.path.abspath(os.curdir)
    _C = ctypes.CDLL("COMPILED_LIB.so")

    def __init__(self):
        
        data, shape = self.flatten(data)
        self.data_ctype = (ctypes.c_float * len(data))(*data)
        self.shape_ctype = (ctypes.c_int * len(shape))(*shape)
        self.ndim_ctype = ctypes.c_int(len(shape))
       
        self.shape = shape
        self.ndim = len(shape)

        Tensor._C.create_tensor.argtypes = [ctypes.POINTER(ctypes.c_float), ctypes.POINTER(ctypes.c_int), ctypes.c_int]
        Tensor._C.create_tensor.restype = ctypes.POINTER(CTensor)

        self.tensor = Tensor._C.create_tensor(
            self.data_ctype,
            self.shape_ctype,
            self.ndim_ctype,
        )
        
    def flatten(self, nested_list):
        """
        This method simply convert a list type tensor to a flatten tensor with its shape
        
        Example:
        
        Arguments:  
            nested_list: [[1, 2, 3], [-5, 2, 0]]
        Return:
            flat_data: [1, 2, 3, -5, 2, 0]
            shape: [2, 3]
        """
        def flatten_recursively(nested_list):
            flat_data = []
            shape = []
            if isinstance(nested_list, list):
                for sublist in nested_list:
                    inner_data, inner_shape = flatten_recursively(sublist)
                    flat_data.extend(inner_data)
                shape.append(len(nested_list))
                shape.extend(inner_shape)
            else:
                flat_data.append(nested_list)
            return flat_data, shape
        
        flat_data, shape = flatten_recursively(nested_list)
        return flat_data, shape
```

이제 Python 텐서 작업을 포함하여 C/C++ 작업을 호출할 수 있습니다.

```js
# norch/tensor.py

def __getitem__(self, indices):
    """
    index 텐서를 사용하여 텐서에 액세스 tensor[i, j, k...]
    """

    if len(indices) != self.ndim:
        raise ValueError("인덱스 수가 차원 수와 일치해야 함")
    
    Tensor._C.get_item.argtypes = [ctypes.POINTER(CTensor), ctypes.POINTER(ctypes.c_int)]
    Tensor._C.get_item.restype = ctypes.c_float
                                       
    indices = (ctypes.c_int * len(indices))(*indices)
    value = Tensor._C.get_item(self.tensor, indices)  
    
    return value

def reshape(self, new_shape):
    """
    텐서를 재구성합니다
    result = tensor.reshape([1,2])
    """
    new_shape_ctype = (ctypes.c_int * len(new_shape))(*new_shape)
    new_ndim_ctype = ctypes.c_int(len(new_shape))
    
    Tensor._C.reshape_tensor.argtypes = [ctypes.POINTER(CTensor), ctypes.POINTER(ctypes.c_int), ctypes.c_int]
    Tensor._C.reshape_tensor.restype = ctypes.POINTER(CTensor)
    result_tensor_ptr = Tensor._C.reshape_tensor(self.tensor, new_shape_ctype, new_ndim_ctype)   

    result_data = Tensor()
    result_data.tensor = result_tensor_ptr
    result_data.shape = new_shape.copy()
    result_data.ndim = len(new_shape)
    result_data.device = self.device

    return result_data

def __add__(self, other):
    """
    텐서를 더합니다
    result = tensor1 + tensor2
    """
  
    if self.shape != other.shape:
        raise ValueError("덧셈을 위해서 텐서들은 동일한 모양이어야 함")
    
    Tensor._C.add_tensor.argtypes = [ctypes.POINTER(CTensor), ctypes.POINTER(CTensor)]
    Tensor._C.add_tensor.restype = ctypes.POINTER(CTensor)

    result_tensor_ptr = Tensor._C.add_tensor(self.tensor, other.tensor)

    result_data = Tensor()
    result_data.tensor = result_tensor_ptr
    result_data.shape = self.shape.copy()
    result_data.ndim = self.ndim
    result_data.device = self.device

    return result_data

# 기타 연산 포함:
# __str__
# __sub__ (-)
# __mul__ (*)
# __matmul__ (@)
# __pow__ (**)
# __truediv__ (/)
# log
# ...
```



여기까지 오신 것을 환영합니다! 이제 코드를 실행하고 텐서 작업을 시작할 수 있는 능력이 생겼습니다!

```js
import norch

tensor1 = norch.Tensor([[1, 2, 3], [3, 2, 1]])
tensor2 = norch.Tensor([[3, 2, 1], [1, 2, 3]])

result = tensor1 + tensor2
print(result[0, 0])
# 4 
```

# #2 — GPU 지원

우리 라이브러리의 기본 구조를 만든 후, 이제 새로운 수준으로 끌어올릴 것입니다. 데이터를 GPU로 전송하고 수학 연산을 빠르게 실행하기 위해 `.to("cuda")`를 호출할 수 있다는 것은 잘 알려져 있습니다. CUDA가 어떻게 작동하는지 기본 지식이 있을 것으로 가정하겠습니다만, 그렇지 않은 경우 다른 기사인 'CUDA 튜토리얼'을 읽어볼 수 있습니다. 여기서 기다릴게요. 😊



...

급한 사람들을 위해, 간단한 소개가 여기 있어요:

기본적으로, 지금까지의 모든 코드는 CPU 메모리에서 실행되고 있어요. 하나의 작업에 대해서는 CPU가 빠르지만, GPU의 장점은 병렬화 능력에 있어요. CPU 디자인은 연산(스레드)을 빠르게 실행하도록 목표를 한 반면, GPU 디자인은 수백만 개의 연산을 병렬로 실행하도록 목표를 해요 (개별 스레드의 성능을 희생하며).

그래서 우리는 이 능력을 활용하여 병렬 연산을 수행할 수 있어요. 예를 들어, 백만 개의 요소로 구성된 텐서를 추가할 때, 반복문 내에서 각 색인의 요소를 순차적으로 추가하는 대신, GPU를 사용하여 한꺼번에 모두를 병렬로 추가할 수 있어요. 이를 위해 NVIDIA에서 개발한 개발자들이 GPU 지원을 소프트웨어 애플리케이션에 통합할 수 있게 하는 플랫폼인 CUDA를 사용할 수 있어요.



그걸 하려면, 특정 GPU 작업(예: CPU 메모리에서 GPU 메모리로 데이터 복사)을 실행하기 위해 설계된 간단한 C/C++ 기반 인터페이스 인 CUDA C/C++를 사용할 수 있습니다.

아래 코드는 기본적으로 CPU에서 GPU로 데이터를 복사하고 배열의 각 요소를 추가하는 AddTwoArrays 함수(커널이라고도 함)를 N개의 GPU 스레드에서 병렬로 실행하는 몇 가지 CUDA C/C++ 함수를 사용합니다.

```c
#include <stdio.h>

// CPU 버전(비교용)
void AddTwoArrays_CPU(flaot A[], float B[], float C[]) {
    for (int i = 0; i < N; i++) {
        C[i] = A[i] + B[i];
    }
}

// 커널 정의
__global__ void AddTwoArrays_GPU(float A[], float B[], float C[]) {
    int i = threadIdx.x;
    C[i] = A[i] + B[i];
}

int main() {

    int N = 1000; // 배열 크기
    float A[N], B[N], C[N]; // 배열 A, B, C

    ...

    float *d_A, *d_B, *d_C; // 배열 A, B, C의 장치 포인터

    // 배열 A, B, C에 대한 장치에서의 메모리 할당
    cudaMalloc((void **)&d_A, N * sizeof(float));
    cudaMalloc((void **)&d_B, N * sizeof(float));
    cudaMalloc((void **)&d_C, N * sizeof(float));

    // 호스트에서 장치로 배열 A 및 B 복사
    cudaMemcpy(d_A, A, N * sizeof(float), cudaMemcpyHostToDevice);
    cudaMemcpy(d_B, B, N * sizeof(float), cudaMemcpyHostToDevice);

    // N개의 스레드를 사용하여 커널 호출
    AddTwoArrays_GPU<<<1, N>>>(d_A, d_B, d_C);
    
    // 장치에서 호스트로 벡터 C 복사
    cudaMemcpy(C, d_C, N * sizeof(float), cudaMemcpyDeviceToHost);

}
```

주목할 점은 각 요소 쌍을 각각 추가하는 대신 모든 덧셈 작업을 병렬로 실행하여 루프 명령을 제거한 것입니다.



간단한 소개 이후에, 텐서 라이브러리로 돌아갈 수 있어요.

첫 번째 단계는 CPU에서 GPU로 텐서 데이터를 보내는 함수를 만드는 것입니다.

```js
//norch/csrc/tensor.cpp

void to_device(Tensor* tensor, char* target_device) {
    if ((strcmp(target_device, "cuda") == 0) && (strcmp(tensor->device, "cpu") == 0)) {
        cpu_to_cuda(tensor);
    }

    else if ((strcmp(target_device, "cpu") == 0) && (strcmp(tensor->device, "cuda") == 0)) {
        cuda_to_cpu(tensor);
    }
}
```

```js
//norch/csrc/cuda.cu

__host__ void cpu_to_cuda(Tensor* tensor) {
    
    float* data_tmp;
    cudaMalloc((void **)&data_tmp, tensor->size * sizeof(float));
    cudaMemcpy(data_tmp, tensor->data, tensor->size * sizeof(float), cudaMemcpyHostToDevice);

    tensor->data = data_tmp;

    const char* device_str = "cuda";
    tensor->device = (char*)malloc(strlen(device_str) + 1);
    strcpy(tensor->device, device_str); 

    printf("텐서가 성공적으로 %s로 전송되었습니다.\n", tensor->device);
}

__host__ void cuda_to_cpu(Tensor* tensor) {
    float* data_tmp = (float*)malloc(tensor->size * sizeof(float));

    cudaMemcpy(data_tmp, tensor->data, tensor->size * sizeof(float), cudaMemcpyDeviceToHost);
    cudaFree(tensor->data);

    tensor->data = data_tmp;

    const char* device_str = "cpu";
    tensor->device = (char*)malloc(strlen(device_str) + 1);
    strcpy(tensor->device, device_str); 

    printf("텐서가 성공적으로 %s로 전송되었습니다.\n", tensor->device);
}
```



파이썬으로 구현된 래퍼:

```js
# norch/tensor.py

def to(self, device):
    self.device = device
    self.device_ctype = self.device.encode('utf-8')
  
    Tensor._C.to_device.argtypes = [ctypes.POINTER(CTensor), ctypes.c_char_p]
    Tensor._C.to_device.restype = None
    Tensor._C.to_device(self.tensor, self.device_ctype)
  
    return self
```

다음으로, 모든 텐서 연산에 대해 GPU 버전을 생성합니다. 덧셈과 뺄셈에 대한 예제를 작성하겠습니다:

```js
//norch/csrc/cuda.cu

#define THREADS_PER_BLOCK 128

__global__ void add_tensor_cuda_kernel(float* data1, float* data2, float* result_data, int size) {
    
    int i = blockIdx.x * blockDim.x + threadIdx.x;
    if (i < size) {
        result_data[i] = data1[i] + data2[i];
    }
}

__host__ void add_tensor_cuda(Tensor* tensor1, Tensor* tensor2, float* result_data) {
    
    int number_of_blocks = (tensor1->size + THREADS_PER_BLOCK - 1) / THREADS_PER_BLOCK;
    add_tensor_cuda_kernel<<<number_of_blocks, THREADS_PER_BLOCK>>>(tensor1->data, tensor2->data, result_data, tensor1->size);

    cudaError_t error = cudaGetLastError();
    if (error != cudaSuccess) {
        printf("CUDA error: %s\n", cudaGetErrorString(error));
        exit(-1);
    }

    cudaDeviceSynchronize();
}

__global__ void sub_tensor_cuda_kernel(float* data1, float* data2, float* result_data, int size) {
   
    int i = blockIdx.x * blockDim.x + threadIdx.x;
    if (i < size) {
        result_data[i] = data1[i] - data2[i];
    }
}

__host__ void sub_tensor_cuda(Tensor* tensor1, Tensor* tensor2, float* result_data) {
    
    int number_of_blocks = (tensor1->size + THREADS_PER_BLOCK - 1) / THREADS_PER_BLOCK;
    sub_tensor_cuda_kernel<<<number_of_blocks, THREADS_PER_BLOCK>>>(tensor1->data, tensor2->data, result_data, tensor1->size);

    cudaError_t error = cudaGetLastError();
    if (error != cudaSuccess) {
        printf("CUDA error: %s\n", cudaGetErrorString(error));
        exit(-1);
    }

    cudaDeviceSynchronize();
}

...
```



그런 다음, 텐서.cpp에 새로운 텐서 속성 char* device를 추가하고 작업을 실행할 위치(CPU 또는 GPU)를 선택하는 데 사용할 수 있습니다:

```js
//norch/csrc/tensor.cpp

Tensor* add_tensor(Tensor* tensor1, Tensor* tensor2) {
    if (tensor1->ndim != tensor2->ndim) {
        fprintf(stderr, "덧셈을 위해 텐서가 동일한 차원 수여야 합니다 %d and %d\n", tensor1->ndim, tensor2->ndim);
        exit(1);
    }

    if (strcmp(tensor1->device, tensor2->device) != 0) {
        fprintf(stderr, "텐서는 동일한 장치에 있어야 합니다: %s and %s\n", tensor1->device, tensor2->device);
        exit(1);
    }

    char* device = (char*)malloc(strlen(tensor1->device) + 1);
    if (device != NULL) {
        strcpy(device, tensor1->device);
    } else {
        fprintf(stderr, "메모리 할당 실패\n");
        exit(-1);
    }
    int ndim = tensor1->ndim;
    int* shape = (int*)malloc(ndim * sizeof(int));
    if (shape == NULL) {
        fprintf(stderr, "메모리 할당 실패\n");
        exit(1);
    }

    for (int i = 0; i < ndim; i++) {
        if (tensor1->shape[i] != tensor2->shape[i]) {
            fprintf(stderr, "덧셈을 위해 텐서들은 색인 %d에서 동일한 형태여야 합니다 %d and %d\n", i, tensor1->shape[i], tensor2->shape[i]);
            exit(1);
        }
        shape[i] = tensor1->shape[i];
    }        

    if (strcmp(tensor1->device, "cuda") == 0) {

        float* result_data;
        cudaMalloc((void **)&result_data, tensor1->size * sizeof(float));
        add_tensor_cuda(tensor1, tensor2, result_data);
        return create_tensor(result_data, shape, ndim, device);
    } 
    else {
        float* result_data = (float*)malloc(tensor1->size * sizeof(float));
        if (result_data == NULL) {
            fprintf(stderr, "메모리 할당 실패\n");
            exit(1);
        }
        add_tensor_cpu(tensor1, tensor2, result_data);
        return create_tensor(result_data, shape, ndim, device);
    }     
}
```

이제 라이브러리가 GPU 지원을 제공합니다!

```js
import norch

tensor1 = norch.Tensor([[1, 2, 3], [3, 2, 1]]).to("cuda")
tensor2 = norch.Tensor([[3, 2, 1], [1, 2, 3]]).to("cuda")

result = tensor1 + tensor2
```



# #3 — Automatic Differentiation (Autograd)

파이토치가 인기를 얻게 된 주요 이유 중 하나는 Autograd 모듈 때문입니다. Autograd 모듈은 자동 미분을 수행하여 기울기를 계산할 수 있게 해주는 핵심 구성 요소입니다 (경사 하강법과 같은 최적화 알고리즘을 사용하여 모델을 훈련하는 데 중요합니다). .backward()라는 단일 메서드 호출로 이전 텐서 연산에서 모든 기울기를 계산합니다:

```js
x = torch.tensor([[1., 2, 3], [3., 2, 1]], requires_grad=True)
# [[1,  2,  3],
#  [3,  2., 1]]

y = torch.tensor([[3., 2, 1], [1., 2, 3]], requires_grad=True)
# [[3,  2, 1],
#  [1,  2, 3]]

L = ((x - y) ** 3).sum()

L.backward()

# x와 y의 기울기에 접근할 수 있습니다
print(x.grad)
# [[12, 0, 12],
#  [12, 0, 12]]

print(y.grad)
# [[-12, 0, -12],
#  [-12, 0, -12]]

# z를 최소화하기 위해서는 경사 하강법에 사용할 수 있습니다:
# x = x - 학습률 * x.grad
# y = y - 학습률 * y.grad
```

무슨 일이 일어나고 있는지 이해하기 위해 동일한 절차를 수동으로 복제해보겠습니다:



<img src="/assets/img/2024-05-15-RecreatingPyTorchfromScratchwithGPUSupportandAutomaticDifferentiation_10.png" />

우선 계산해 봅시다:

<img src="/assets/img/2024-05-15-RecreatingPyTorchfromScratchwithGPUSupportandAutomaticDifferentiation_11.png" />

x가 행렬이라는 것에 유의해야 합니다. 따라서 각 요소에 대한 L의 미분을 개별적으로 계산해야 합니다. 게다가, L은 모든 요소에 대한 합이지만 각 요소에 대한 미분에서 다른 요소들은 중요한 영향을 미치지 않는다는 것을 기억하는 것이 중요합니다. 따라서 우리는 다음과 같은 항을 얻습니다:




![이미지](/assets/img/2024-05-15-RecreatingPyTorchfromScratchwithGPUSupportandAutomaticDifferentiation_12.png)

각 항에 대해 연쇄 법칙을 적용하여 외부 함수를 미분하고 내부 함수를 미분한 값을 곱합니다:

![이미지](/assets/img/2024-05-15-RecreatingPyTorchfromScratchwithGPUSupportandAutomaticDifferentiation_13.png)

Where:




마침내:

![이미지](/assets/img/2024-05-15-RecreatingPyTorchfromScratchwithGPUSupportandAutomaticDifferentiation_14.png)

그러므로, x에 관한 L의 미분을 계산하는 최종 방정식은 다음과 같습니다:



아래는 Markdown 형식으로 변경된 내용입니다.


![Image 1](/assets/img/2024-05-15-RecreatingPyTorchfromScratchwithGPUSupportandAutomaticDifferentiation_16.png)

Substituting the values into the equation:

![Image 2](/assets/img/2024-05-15-RecreatingPyTorchfromScratchwithGPUSupportandAutomaticDifferentiation_17.png)

Calculating the result, we get the same values we obtained with PyTorch:





![image](/assets/img/2024-05-15-RecreatingPyTorchfromScratchwithGPUSupportandAutomaticDifferentiation_18.png)

Now, let’s analyze what we just did:

Basically, we observed all the operations involved in reverse order: a summation, a power of 3, and a subtraction. Then, we applied the chain rule, calculating the derivative of each operation and recursively calculated the derivative for the next operation. So, first we need an implementation of the derivative for different math operations:

For addition:





![Image](/assets/img/2024-05-15-RecreatingPyTorchfromScratchwithGPUSupportandAutomaticDifferentiation_19.png)

```js
# norch/autograd/functions.py

class AddBackward:
    def __init__(self, x, y):
        self.input = [x, y]

    def backward(self, gradient):
        return [gradient, gradient]
```

For sin:

![Image](/assets/img/2024-05-15-RecreatingPyTorchfromScratchwithGPUSupportandAutomaticDifferentiation_20.png)




```js
# norch/autograd/functions.py

class SinBackward:
    def __init__(self, x):
        self.input = [x]

    def backward(self, gradient):
        x = self.input[0]
        return [x.cos() * gradient]
```

코사인에 대해:

![2024-05-15-RecreatingPyTorchfromScratchwithGPUSupportandAutomaticDifferentiation_21](/assets/img/2024-05-15-RecreatingPyTorchfromScratchwithGPUSupportandAutomaticDifferentiation_21.png)

```js
# norch/autograd/functions.py

class CosBackward:
    def __init__(self, x):
        self.input = [x]

    def backward(self, gradient):
        x = self.input[0]
        return [- x.sin() * gradient]
```



요소별 곱셈에 대한 자세한 내용을 확인해보세요:

![element-wise multiplication](/assets/img/2024-05-15-RecreatingPyTorchfromScratchwithGPUSupportandAutomaticDifferentiation_22.png)

```python
# norch/autograd/functions.py

class ElementwiseMulBackward:
    def __init__(self, x, y):
        self.input = [x, y]

    def backward(self, gradient):
        x = self.input[0]
        y = self.input[1]
        return [y * gradient, x * gradient]
```

합산에 대해서:




# norch/autograd/functions.py

```python
class SumBackward:
    def __init__(self, x):
        self.input = [x]

    def backward(self, gradient):
        # sum 함수는 텐서를 스칼라로 줄이므로 기울기를 일치시키기 위해 브로드캐스트됩니다.
        return [float(gradient.tensor.contents.data[0]) * self.input[0].ones_like()]
```

다른 연산을 살펴볼 수 있는 GitHub 저장소 링크도 확인할 수 있습니다.

이제 각 작업에 대한 도함수 식을 가졌으니, 재귀적으로 역전파 체인 규칙을 구현할 수 있습니다. 텐서에 requires_grad 인자를 설정하여 이 텐서의 기울기를 저장하려는 것을 나타낼 수 있습니다. True이면 각 텐서 작업의 기울기를 저장합니다. 예를 들어:

```python
# norch/tensor.py

def __add__(self, other):

  if self.shape != other.shape:
      raise ValueError("덧셈을 위해 텐서는 동일한 모양이어야 합니다.")
  
  Tensor._C.add_tensor.argtypes = [ctypes.POINTER(CTensor), ctypes.POINTER(CTensor)]
  Tensor._C.add_tensor.restype = ctypes.POINTER(CTensor)
  
  result_tensor_ptr = Tensor._C.add_tensor(self.tensor, other.tensor)
  
  result_data = Tensor()
  result_data.tensor = result_tensor_ptr
  result_data.shape = self.shape.copy()
  result_data.ndim = self.ndim
  result_data.device = self.device
  
  result_data.requires_grad = self.requires_grad or other.requires_grad
  if result_data.requires_grad:
      result_data.grad_fn = AddBackward(self, other)
```



그럼, `.backward()` 메서드를 구현해보세요:

```python
# norch/tensor.py

def backward(self, gradient=None):
    if not self.requires_grad:
        return
    
    if gradient is None:
        if self.shape == [1]:
            gradient = Tensor([1]) # dx/dx = 1 case
        else:
            raise RuntimeError("Gradient argument must be specified for non-scalar tensors.")

    if self.grad is None:
        self.grad = gradient

    else:
        self.grad += gradient

    if self.grad_fn is not None: # not a leaf
        grads = self.grad_fn.backward(gradient) # call the operation backward
        for tensor, grad in zip(self.grad_fn.input, grads):
            if isinstance(tensor, Tensor):
                tensor.backward(grad) # recursively call the backward again for the gradient expression (chain rule)
```

마지막으로, 텐서의 그래디언트를 제로화하는 `.zero_grad()`와 텐서의 오토그래드 히스토리를 제거하는 `.detach()`를 구현해주세요:

```python
# norch/tensor.py

def zero_grad(self):
    self.grad = None

def detach(self):
    self.grad = None
    self.grad_fn = None
```



축하합니다! GPU 지원 및 자동 미분 기능이 있는 완전한 텐서 라이브러리를 만드셨군요! 이제 nn 및 optim 모듈을 만들어 몇 가지 딥 러닝 모델을 더 쉽게 훈련시킬 수 있습니다.

## #4 — nn 및 optim 모듈

nn은 신경망 및 딥 러닝 모델을 구축하기 위한 모듈이며, optim은 이러한 모델을 훈련시키기 위한 최적화 알고리즘과 관련이 있습니다. 이들을 재현하기 위한 첫 번째 단계는 Parameter를 구현하는 것입니다. Parameter는 간단히 말해 항상 True로 설정된 requires_grad 속성을 갖는 훈련 가능한 텐서로, 일부 임의의 초기화 기법을 사용해 같은 연산을 수행합니다.

```js
# norch/nn/parameter.py

from norch.tensor import Tensor
from norch.utils import utils
import random

class Parameter(Tensor):
    """
    A parameter is a trainable tensor.
    """
    def __init__(self, shape):
        data = utils.generate_random_list(shape=shape)
        super().__init__(data, requires_grad=True)
```



```js
# norch/utisl/utils.py

def generate_random_list(shape):
    """
    랜덤한 숫자로 이루어진 'shape' 형태의 리스트를 생성합니다
    [4, 2] --> [[rand1, rand2], [rand3, rand4], [rand5, rand6], [rand7, rand8]]
    """
    if len(shape) == 0:
        return []
    else:
        inner_shape = shape[1:]
        if len(inner_shape) == 0:
            return [random.uniform(-1, 1) for _ in range(shape[0])]
        else:
            return [generate_random_list(inner_shape) for _ in range(shape[0])]
```

파라미터를 활용하면 모듈을 구성할 수 있습니다:

```js
# norch/nn/module.py

from .parameter import Parameter
from collections import OrderedDict
from abc import ABC
import inspect

class Module(ABC):
    """
    모듈을 위한 추상 클래스
    """
    def __init__(self):
        self._modules = OrderedDict()
        self._params = OrderedDict()
        self._grads = OrderedDict()
        self.training = True

    def forward(self, *inputs, **kwargs):
        raise NotImplementedError

    def __call__(self, *inputs, **kwargs):
        return self.forward(*inputs, **kwargs)

    def train(self):
        self.training = True
        for param in self.parameters():
            param.requires_grad = True

    def eval(self):
        self.training = False
        for param in self.parameters():
            param.requires_grad = False

    def parameters(self):
        for name, value in inspect.getmembers(self):
            if isinstance(value, Parameter):
                yield self, name, value
            elif isinstance(value, Module):
                yield from value.parameters()

    def modules(self):
        yield from self._modules.values()

    def gradients(self):
        for module in self.modules():
            yield module._grads

    def zero_grad(self):
        for _, _, parameter in self.parameters():
            parameter.zero_grad()

    def to(self, device):
        for _, _, parameter in self.parameters():
            parameter.to(device)

        return self
    
    def inner_repr(self):
        return ""

    def __repr__(self):
        string = f"{self.get_name()}("
        tab = "   "
        modules = self._modules
        if modules == {}:
            string += f'\n{tab}(parameters): {self.inner_repr()}'
        else:
            for key, module in modules.items():
                string += f"\n{tab}({key}): {module.get_name()}({module.inner_repr()})"
        return f'{string}\n)'
    
    def get_name(self):
        return self.__class__.__name__
    
    def __setattr__(self, key, value):
        self.__dict__[key] = value

        if isinstance(value, Module):
            self._modules[key] = value
        elif isinstance(value, Parameter):
            self._params[key] = value
```

예를 들어, nn.Module을 상속하여 사용자 정의 모듈을 만들거나, 이전에 생성된 모듈 중 하나인 선형 모듈을 사용하여 y = Wx + b 작업을 구현할 수 있습니다.




```js
# norch/nn/modules/linear.py

from ..module import Module
from ..parameter import Parameter

class Linear(Module):
    def __init__(self, input_dim, output_dim):
        super().__init__()
        self.input_dim = input_dim
        self.output_dim = output_dim
        self.weight = Parameter(shape=[self.output_dim, self.input_dim])
        self.bias = Parameter(shape=[self.output_dim, 1])

    def forward(self, x):
        z = self.weight @ x + self.bias
        return z

    def inner_repr(self):
        return f"input_dim={self.input_dim}, output_dim={self.output_dim}, " \
               f"bias={True if self.bias is not None else False}"
```

이제 몇 가지 손실 및 활성화 함수를 구현할 수 있습니다. 예를 들어, 평균 제곱 오차 손실 및 시그모이드 함수:

```js
# norch/nn/loss.py

from .module import Module
 
class MSELoss(Module):
    def __init__(self):
      pass

    def forward(self, predictions, labels):
        assert labels.shape == predictions.shape, \
            "Labels and predictions shape does not match: {} and {}".format(labels.shape, predictions.shape)
        
        return ((predictions - labels) ** 2).sum() / predictions.numel

    def __call__(self, *inputs):
        return self.forward(*inputs)
```

```js
# norch/nn/activation.py

from .module import Module
import math

class Sigmoid(Module):
    def __init__(self):
        super().__init__()

    def forward(self, x):
        return 1.0 / (1.0 + (math.e) ** (-x)) 
```



마지막으로 옵티마이저를 만들어봅시다. 예시로 확률적 경사 하강법(Stochastic Gradient Descent) 알고리즘을 구현하겠습니다:

```js
# norch/optim/optimizer.py

from abc import ABC
from norch.tensor import Tensor

class Optimizer(ABC):
    """
    옵티마이저를 위한 추상 클래스
    """

    def __init__(self, parameters):
        if isinstance(parameters, Tensor):
            raise TypeError("parameters는 반복 가능한 객체이어야 하지만 {} 타입이 입력되었습니다".format(type(parameters)))
        elif isinstance(parameters, dict):
            parameters = parameters.values()

        self.parameters = list(parameters)

    def step(self):
        raise NotImplementedError
    
    def zero_grad(self):
        for module, name, parameter in self.parameters:
            parameter.zero_grad()


class SGD(Optimizer):
    def __init__(self, parameters, lr=1e-1, momentum=0):
        super().__init__(parameters)
        self.lr = lr
        self.momentum = momentum
        self._cache = {'velocity': [p.zeros_like() for (_, _, p) in self.parameters]}

    def step(self):
        for i, (module, name, _) in enumerate(self.parameters):
            parameter = getattr(module, name)

            velocity = self._cache['velocity'][i]

            velocity = self.momentum * velocity - self.lr * parameter.grad

            updated_parameter = parameter + velocity

            setattr(module, name, updated_parameter)

            self._cache['velocity'][i] = velocity

            parameter.detach()
            velocity.detach()
```

그리고 여기까지입니다! 이제 우리만의 딥러닝 프레임워크를 만들었어요! 🥳

이제 학습을 시작해봅시다:



```js
import norch
import norch.nn as nn
import norch.optim as optim
import random
import math

random.seed(1)

class MyModel(nn.Module):
    def __init__(self):
        super(MyModel, self).__init__()
        self.fc1 = nn.Linear(1, 10)
        self.sigmoid = nn.Sigmoid()
        self.fc2 = nn.Linear(10, 1)

    def forward(self, x):
        out = self.fc1(x)
        out = self.sigmoid(out)
        out = self.fc2(out)
        
        return out

device = "cuda"
epochs = 10

model = MyModel().to(device)
criterion = nn.MSELoss()
optimizer = optim.SGD(model.parameters(), lr=0.001)
loss_list = []

x_values = [0. ,  0.4,  0.8,  1.2,  1.6,  2. ,  2.4,  2.8,  3.2,  3.6,  4. ,
        4.4,  4.8,  5.2,  5.6,  6. ,  6.4,  6.8,  7.2,  7.6,  8. ,  8.4,
        8.8,  9.2,  9.6, 10. , 10.4, 10.8, 11.2, 11.6, 12. , 12.4, 12.8,
       13.2, 13.6, 14. , 14.4, 14.8, 15.2, 15.6, 16. , 16.4, 16.8, 17.2,
       17.6, 18. , 18.4, 18.8, 19.2, 19.6, 20.]

y_true = []
for x in x_values:
    y_true.append(math.pow(math.sin(x), 2))


for epoch in range(epochs):
    for x, target in zip(x_values, y_true):
        x = norch.Tensor([[x]]).T
        target = norch.Tensor([[target]]).T

        x = x.to(device)
        target = target.to(device)

        outputs = model(x)
        loss = criterion(outputs, target)
        
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

    print(f'Epoch [{epoch + 1}/{epochs}], Loss: {loss[0]:.4f}')
    loss_list.append(loss[0])

# Epoch [1/10], Loss: 1.7035
# Epoch [2/10], Loss: 0.7193
# Epoch [3/10], Loss: 0.3068
# Epoch [4/10], Loss: 0.1742
# Epoch [5/10], Loss: 0.1342
# Epoch [6/10], Loss: 0.1232
# Epoch [7/10], Loss: 0.1220
# Epoch [8/10], Loss: 0.1241
# Epoch [9/10], Loss: 0.1270
# Epoch [10/10], Loss: 0.1297
```

<img src="/assets/img/2024-05-15-RecreatingPyTorchfromScratchwithGPUSupportandAutomaticDifferentiation_23.png" />

성공적으로 모델이 생성되고 사용자 정의 딥러닝 프레임워크를 사용하여 훈련되었습니다!

전체 코드는 여기에서 확인할 수 있습니다.



# 결론

이 게시물에서는 텐서와 같은 기본 개념, 어떻게 모델링되는지, CUDA 및 Autograd와 같은 고급 주제 등을 다루었습니다. 우리는 GPU 지원 및 자동 미분이 가능한 딥 러닝 프레임워크를 성공적으로 만들었습니다. 이 게시물이 여러분이 PyTorch가 어떻게 작동하는지 간략히 이해하는 데 도움이 되었으면 좋겠습니다.

앞으로의 게시물에서는 분산 훈련(다중 노드/다중 GPU) 및 메모리 관리와 같은 고급 주제를 다루려고 할 것입니다. 의견이 있거나 다음에 어떤 내용을 다루길 원하시는지 댓글로 알려주세요! 읽어 주셔서 정말 감사합니다! 😊

또한 최신 기사를 받아보기 위해 여기와 제 LinkedIn 프로필에서 팔로우해 주세요!



# 참고 자료

- [PyNorch](https://github.com) - 이 프로젝트의 GitHub 저장소 
- [CUDA 튜토리얼](https://www.example.com/tutorial-cuda) - CUDA 작동 방식에 대한 간단한 소개
- [PyTorch](https://pytorch.org/docs) - PyTorch 문서



# MartinLwx's 블로그 - 스트라이드에 관한 튜토리얼.

# 스트라이드 튜토리얼 - 스트라이드에 관한 또 다른 튜토리얼.

# PyTorch 내부 구조 - PyTorch 구조에 대한 가이드.

# 네츠 - NumPy를 사용한 PyTorch 재구현.



Markdown으로 표 태그를 변경하십시오.