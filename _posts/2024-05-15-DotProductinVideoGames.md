---
title: "비디오 게임에서의 내적곱"
description: ""
coverImage: "/assets/img/2024-05-15-DotProductinVideoGames_0.png"
date: 2024-05-15 03:26
ogImage: 
  url: /assets/img/2024-05-15-DotProductinVideoGames_0.png
tag: Tech
originalTitle: "Dot Product in Video Games"
link: "https://medium.com/@mahmoudelmansari/dot-product-in-video-games-81c7e9b078e7"
---


## 내적이란 무엇인가요?

내적은 두 벡터 사이에서 수행할 수 있는 가장 중요한 연산 중 하나입니다.

![image](/assets/img/2024-05-15-DotProductinVideoGames_0.png)

우리는 각 벡터의 해당 구성 요소를 곱하고 모두 합하여 내적을 계산할 수 있습니다.




![image1](/assets/img/2024-05-15-DotProductinVideoGames_1.png)

or by multiplying the length of the two vectors by the cosine of the angle between them

![image2](/assets/img/2024-05-15-DotProductinVideoGames_2.png)

The result is a scalar that represents the projection of one vector onto another.





![image](/assets/img/2024-05-15-DotProductinVideoGames_3.png)

But things become more interesting if the vectors are both normalized.
A normalized vector has a length of one.

![image](/assets/img/2024-05-15-DotProductinVideoGames_4.png)

We can normalize a vector by dividing each component by its length.





![image](/assets/img/2024-05-15-DotProductinVideoGames_5.png)

Now we can replace both lengths in our formula with one, and since multiplying by one doesn’t change anything, we are left with the cosine of the angle between the two vectors.

![image](/assets/img/2024-05-15-DotProductinVideoGames_6.png)

If the vectors are pointing in the same direction, the angle between them is zero, the cosine of zero is one




![](/assets/img/2024-05-15-DotProductinVideoGames_7.png)

만약 두 벡터가 서로 수직이면, 그들 사이의 각은 90도 입니다. 90도의 코사인 값은 0입니다.

![](/assets/img/2024-05-15-DotProductinVideoGames_8.png)

만약 두 벡터가 서로 반대 방향을 가리키면, 그들 사이의 각은 180도 입니다. 180도의 코사인 값은 -1입니다.




![Dot Product in Video Games](/assets/img/2024-05-15-DotProductinVideoGames_9.png)

And any other angle will give us a value between 1 and -1

## Dot Product Use Cases

- checking the relativity between two objects





<img src="/assets/img/2024-05-15-DotProductinVideoGames_10.png" />

두 캐릭터, 플레이어와 적이 있다고 가정해 봅시다. 플레이어가 적의 앞에 있는지 뒤에 있는지 알고 싶습니다.

<img src="/assets/img/2024-05-15-DotProductinVideoGames_11.png" />

첫 번째로 할 일은 적에서 플레이어로 향하는 방향을 계산하는 것입니다.
이를 위해 적의 위치에서 플레이어의 위치를 빼면 됩니다. 
이렇게 하면 적에서 플레이어로 향하는 벡터가 생성되며, 그 길이는 적과 플레이어 사이의 거리와 같습니다.




아래는 Markdown 형식으로 표현했습니다.


![이미지1](/assets/img/2024-05-15-DotProductinVideoGames_12.png)

그런 다음, 우리는 방향 벡터를 정규화합니다. 다시 말해, 길이를 1로 만듭니다.

![이미지2](/assets/img/2024-05-15-DotProductinVideoGames_13.png)

그런 다음, 방향 벡터와 적의 전진 벡터 사이의 점곱을 계산합니다.




![이미지](/assets/img/2024-05-15-DotProductinVideoGames_14.png)

여기서는 임계값 간격을 설정할 수 있어요. 이 경우 0.85입니다.

![이미지](/assets/img/2024-05-15-DotProductinVideoGames_15.png)

만약 내적 값이 임계값 이상이라면, 플레이어가 적 앞에 있다는 것을 알 수 있고, 적이 플레이어를 따라다니는 등의 행동을 할 수 있어요.




![이미지](/assets/img/2024-05-15-DotProductinVideoGames_16.png)

우리는 임계값을 -0.85로 설정할 수도 있고, 그러면 닷 프로덕트가 임계값보다 작거나 같은지 확인하여 반대로 처리하고, 플레이어가 뒤쪽에 있는지 확인하여 스니크 어택과 같은 특정 행동을 수행할 수 있습니다.

- 조명 시뮬레이션

우리는 닷 프로덕트를 사용하여 물체를 조명(빛의 영향을 받는)할 수 있습니다.





![Image](/assets/img/2024-05-15-DotProductinVideoGames_17.png)

To achieve this, we require a 3D object and a light source.

![Image](/assets/img/2024-05-15-DotProductinVideoGames_18.png)

The initial step is to calculate the direction from the 3D object to the light source.





![이미지](/assets/img/2024-05-15-DotProductinVideoGames_19.png)

그런 다음 빛 벡터를 정규화합니다.

![이미지](/assets/img/2024-05-15-DotProductinVideoGames_20.png)

그런 다음 빛 벡터와 3D 객체의 법선 벡터 간의 내적을 계산하세요.





![영상게임에서의 내적](/assets/img/2024-05-15-DotProductinVideoGames_21.png)

그리고 불을 켜주세요.
