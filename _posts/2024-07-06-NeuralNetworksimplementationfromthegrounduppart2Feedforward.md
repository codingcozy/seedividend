---
title: "바닥부터 구현하는 뉴럴 네트워크 파트 2  Feedforward 방식 완전 정복"
description: ""
coverImage: "/assets/img/2024-07-06-NeuralNetworksimplementationfromthegrounduppart2Feedforward_0.png"
date: 2024-07-06 02:34
ogImage: 
  url: /assets/img/2024-07-06-NeuralNetworksimplementationfromthegrounduppart2Feedforward_0.png
tag: Tech
originalTitle: "Neural Networks implementation from the ground up part 2 — Feedforward"
link: "https://medium.com/@satviknema/neural-networks-implementation-from-the-ground-up-part-2-feedforward-5698568ed9f8"
---


"기초부터 구현하는 신경망 시리즈에 다시 오신 것을 환영합니다. 이번 파트에서는 신경망의 순전파 흐름을 구현하는 방법에 대해 살펴볼 것입니다.

지난 블로그에서는 신경망 구조 설정과 기본 빌딩 블록인 '행렬(Matrix)'에 대해 알아보았습니다.

# 무엇을 하는 거죠?

'순전파(Feedforward)'는 주로 가중치(weights)와 편향(biases)을 기반으로 신경망의 출력을 계산합니다. 이 단계에서는 학습이 발생하지 않는다는 점을 유의해 주세요. 학습은 역전파 흐름(backpropagation flow)의 일부입니다."

<div class="content-ad"></div>

지난 블로그에서 우리는 신경망의 이 예시를 보았어요.

주어진 가중치와 편향을 사용했을 때, 그 feedforward는 어떻게 보일까요?

레이어 0의 첫 번째 뉴런에 대해서:

![Neural Network](/assets/img/2024-07-06-NeuralNetworksimplementationfromthegrounduppart2Feedforward_0.png)

<div class="content-ad"></div>

같은 방식으로, layer 0의 두 번째 뉴런에 대해서는:

![Layer 0 Neuron 2](/assets/img/2024-07-06-NeuralNetworksimplementationfromthegrounduppart2Feedforward_1.png)

마지막 뉴런에 대해서는 마지막으로:

![Last Neuron](/assets/img/2024-07-06-NeuralNetworksimplementationfromthegrounduppart2Feedforward_2.png)

<div class="content-ad"></div>

위치를 잡았네요, 편향과 함께 가중 합계가 들어 있어요.

자세히 보면, 모든 출력을 행렬 곱셈 형태로 깔끔하게 표현할 수 있어요:

![image](/assets/img/2024-07-06-NeuralNetworksimplementationfromthegrounduppart2Feedforward_3.png)

첫 번째 레이어에서는 입력인 i에 대해서는 활성화 함수를 적용하지 않아요. 두 번째 레이어의 출력이 어떻게 나타나는지 살펴볼게요:

<div class="content-ad"></div>

제1 뉴런을 위해:

![image](/assets/img/2024-07-06-NeuralNetworksimplementationfromthegrounduppart2Feedforward_4.png)

여기서 g(x)는 활성화 함수를 나타내며, 이 예시에서는 시그모이드 함수를 사용할 것입니다.

![image](/assets/img/2024-07-06-NeuralNetworksimplementationfromthegrounduppart2Feedforward_5.png)

<div class="content-ad"></div>

이는 입력 x가 얼마나 크거나 작더라도 0과 1 사이의 값에 매핑할 수 있도록 도와줍니다. 이전 레이어의 실제 출력이 이 레이어의 출력이 너무 많이 범위를 벗어나는 것을 방지합니다.

따라서 2번째 레이어의 경우, 우리의 방정식은 다음과 같습니다:

![image](/assets/img/2024-07-06-NeuralNetworksimplementationfromthegrounduppart2Feedforward_6.png)

그리고 마지막으로 3번째 레이어에 대해 게산합니다:

<div class="content-ad"></div>


/assets/img/2024-07-06-NeuralNetworksimplementationfromthegrounduppart2Feedforward_7.png

# Code

이미 앞 섹션에서 행렬에 대한 유틸리티를 작성했으므로 이러한 작업은 간단할 것입니다.

우리는 NeuralNetwork 객체를 초기화하는 데 도움이 될 유틸리티를 만들어 시작합니다:


<div class="content-ad"></div>

```java
public class NNBuilder {
    public static NeuralNetwork create(
            int inputRows, int outputRows, List<Integer> hiddenLayersNeuronsCount) {
        List<Matrix> weights = new ArrayList<>();
        List<Matrix> biases = new ArrayList<>();

        int nHiddenLayers = hiddenLayersNeuronsCount.size();
        for (Integer integer : hiddenLayersNeuronsCount) {
            biases.add(Matrix.random(integer, 1, -1, 1));
        }

        // last layer's biases
        biases.add(Matrix.random(outputRows, 1, -1, 1));

        int previousLayerNeuronsCount = inputRows;
        for (int i = 0; i < nHiddenLayers; i++) {
            weights.add(
                    Matrix.random(
                            hiddenLayersNeuronsCount.get(i), previousLayerNeuronsCount, -1, 1));
            previousLayerNeuronsCount = hiddenLayersNeuronsCount.get(i);
        }
        weights.add(Matrix.random(outputRows, previousLayerNeuronsCount, -1, 1));

        return NeuralNetwork.builder()
                .weights(weights)
                .biases(biases)
                .layers(hiddenLayersNeuronsCount.size() + 1)
                .build();
    }
}
```

우리 특정 신경망에 대해서는 다음과 같이 빌더를 호출할 수 있습니다:

```java
NeuralNetwork neuralNetwork = NNBuilder.create(5, 2, List.of(3, 3));
```

이제 feedforward에 대해 이야기해보겠습니다.

<div class="content-ad"></div>

```java
public void feedforward(Matrix input) {
    List<Matrix> layerOutputs = new ArrayList<>();

    // 첫 번째 입력은 활성화 함수를 적용하지 않습니다
    Matrix bias = biases.getFirst();
    Matrix weight = weights.getFirst();
    Matrix outputLayer1 = bias.add(weight.cross(input));
    layerOutputs.add(outputLayer1);
    Matrix prevLayerOutput = outputLayer1;

    for (int i = 1; i < getLayers(); i++) {
        input = prevLayerOutput.apply(Functions::sigmoid);
        bias = biases.get(i);
        weight = weights.get(i);
        Matrix outputLayerI = bias.add(weight.cross(input));
        layerOutputs.add(outputLayerI);

        prevLayerOutput = outputLayerI;
    }
    setLayerOutputs(layerOutputs);
}
```

Functions::sigmoid은 별도로 정의되어 있습니다:

```java
public class Functions {

    private Functions(){}

    public static double sigmoid(double x) {
        return 1 / (1 + Math.exp(-x));
    }

    public static double differentialSigmoid(double x) {
        return sigmoid(x) * (1 - sigmoid(x));
    }
}
```

backpropagation을 구현할 때 differentialSigmoid를 사용할 것입니다.


<div class="content-ad"></div>

한 번의 전방향 반복을 수행하려면, 다음과 같이 간단히 호출하면 됩니다:

```js
neuralNetwork.feedforward(input)
```

각 레이어의 출력은 layerOutputs에 저장되며, 이후 역전파 단계에서 사용됩니다.

# 예시

<div class="content-ad"></div>

가정해 봅시다. 5개의 이진 비트 입력을 가지고 있고, 이를 3으로 나눌 수 있는지 여부를 분류해야 합니다. 출력 0은 3으로 나눠질 가능성을 나타내고, 출력 1은 그렇지 않을 가능성을 나타냅니다. 우리가 모든 개념을 다룬 후 적절한 MNIST 예제를 통해 진행할 예정입니다.

```js
    public static void main(String[] args) throws IOException {
        List<Pair<Matrix, Matrix>> trainingData = List.of(
                Pair.of(new Matrix(new double[][]{0, 1, 1, 1, 0}).transpose(), new Matrix(new double[][]{0, 1}).transpose()), //14, 나누어 떨어지지 않음
                Pair.of(new Matrix(new double[][]{0, 1, 0, 0, 1}).transpose(), new Matrix(new double[][]{1, 0}).transpose()) //9, 나누어 떨어짐
        );

        NeuralNetwork neuralNetwork = NNBuilder.create(5, 2, List.of(3, 3));
        for(Pair<Matrix, Matrix> p : trainingData){
            neuralNetwork.feedforward(p.getA());
            Matrix outputLayer = neuralNetwork.getLayerOutputs().getLast();

            System.out.println("기대값: \n"+p.getB());
            System.out.println("출력: \n"+outputLayer);
            System.out.println();
        }
    }
```

Pair는 데이터 구조를 쌍으로 묶는 유틸리티 클래스입니다. 여기서 출력은 모든 가중치와 바이어스를 임의의 값으로 설정했기 때문에 예상대로 매우 무작위합니다.

<div class="content-ad"></div>

```js
예상 값:
[0.0]
[1.0]

결과 값:
[-0.08266908882116297]
[1.5195448278508819]


예상 값:
[1.0]
[0.0]

결과 값:
[-0.10386840368442773]
[1.496952583483225]
```

다음 블로그에서는 이러한 랜덤 가중치와 편향을 어떻게 조정하여 출력을 우리가 기대하는 값에 가깝게 이동시킬 수 있는지 살펴볼 것입니다. 즉, 네트워크가 실제로 어떻게 학습하는지에 대한 내용입니다.

# 자료

- https://medium.com/@satviknema/neural-networks-implementation-from-the-ground-up-part-1-f1a392016010
