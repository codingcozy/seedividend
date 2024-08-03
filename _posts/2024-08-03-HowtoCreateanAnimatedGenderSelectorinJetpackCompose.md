---
title: "Jetpack Compose에서 애니메이션 성별 선택기 만드는 방법"
description: ""
coverImage: "/assets/img/2024-08-03-HowtoCreateanAnimatedGenderSelectorinJetpackCompose_0.png"
date: 2024-08-03 18:55
ogImage: 
  url: /assets/img/2024-08-03-HowtoCreateanAnimatedGenderSelectorinJetpackCompose_0.png
tag: Tech
originalTitle: "How to Create an Animated Gender Selector in Jetpack Compose"
link: "https://medium.com/@kappdev/how-to-create-an-animated-gender-selector-in-jetpack-compose-a2f1cdb1afc0"
---


# 안녕하세요 🙋

이 글에서는 캔버스와 사용자 지정 모양을 활용하여 Jetpack Compose에서 멋진 애니메이션 성별 선택기를 만들어보겠습니다.

시작해봅시다 🚀

![Gender Selector](/assets/img/2024-08-03-HowtoCreateanAnimatedGenderSelectorinJetpackCompose_0.png)

<div class="content-ad"></div>

# 도형

우선, 옵션으로 렌더링 될 도형을 정의해야 합니다.

## 남성 🚹

```js
object MaleShape : Shape {

    override fun createOutline(size: Size, layoutDirection: LayoutDirection, density: Density): Outline {
        val scale = size.minDimension / 24f

        val path = Path().apply {
            // 머리
            addOval(Rect(Offset(12f * scale, 4f * scale), 2f * scale))

            // 몸과 팔다리
            moveTo(14.0f * scale, 7.0f * scale)
            lineTo(10.0f * scale, 7.0f * scale)
            cubicTo(8.9f * scale, 7.0f * scale, 8.0f * scale, 7.9f * scale, 8.0f * scale, 9.0f * scale)
            lineTo(8.0f * scale, 14.0f * scale)
            cubicTo(8.0f * scale, 14.55f * scale, 8.45f * scale, 15.0f * scale, 9.0f * scale, 15.0f * scale)
            lineTo(10.0f * scale, 15.0f * scale)
            lineTo(10.0f * scale, 21.0f * scale)
            cubicTo(10.0f * scale, 21.55f * scale, 10.45f * scale, 22.0f * scale, 11.0f * scale, 22.0f * scale)
            lineTo(13.0f * scale, 22.0f * scale)
            cubicTo(13.55f * scale, 22.0f * scale, 14.0f * scale, 21.55f * scale, 14.0f * scale, 21.0f * scale)
            lineTo(14.0f * scale, 15.0f * scale)
            lineTo(15.0f * scale, 15.0f * scale)
            cubicTo(15.55f * scale, 15.0f * scale, 16.0f * scale, 14.55f * scale, 16.0f * scale, 14.0f * scale)
            lineTo(16.0f * scale, 9.0f * scale)
            cubicTo(16.0f * scale, 7.9f * scale, 15.1f * scale, 7.0f * scale, 14.0f * scale, 7.0f * scale)
            close()
        }

        return Outline.Generic(path)
    }
}
```

<div class="content-ad"></div>

## 여성 🚺

```js
object FemaleShape : Shape {

    override fun createOutline(size: Size, layoutDirection: LayoutDirection, density: Density): Outline {
        val scale = size.minDimension / 24f

        val path = Path().apply {
            // 머리
            addOval(Rect(Offset(12.0f * scale, 4.0f * scale), 2.0f * scale))

            // 몸과 팔다리
            moveTo(16.45f * scale, 14.63f * scale)
            lineTo(13.93f * scale, 8.31f * scale)
            cubicTo(13.61f * scale, 7.52f * scale, 12.85f * scale, 7.01f * scale, 12.0f * scale, 7.0f * scale)
            cubicTo(11.15f * scale, 7.01f * scale, 10.38f * scale, 7.52f * scale, 10.07f * scale, 8.31f * scale)
            lineTo(7.55f * scale, 14.63f * scale)
            cubicTo(7.28f * scale, 15.29f * scale, 7.77f * scale, 16.0f * scale, 8.47f * scale, 16.0f * scale)
            lineTo(10.0f * scale, 16.0f * scale)
            lineTo(10.0f * scale, 21.0f * scale)
            cubicTo(10.0f * scale, 21.55f * scale, 10.45f * scale, 22.0f * scale, 11.0f * scale, 22.0f * scale)
            lineTo(13.0f * scale, 22.0f * scale)
            cubicTo(13.55f * scale, 22.0f * scale, 14.0f * scale, 21.55f * scale, 14.0f * scale, 21.0f * scale)
            lineTo(14.0f * scale, 16.0f * scale)
            lineTo(15.53f * scale, 16.0f * scale)
            cubicTo(16.23f * scale, 16.0f * scale, 16.72f * scale, 15.29f * scale, 16.45f * scale, 14.63f * scale)
            close()
        }

        return Outline.Generic(path)
    }
}
```

# 성별 옵션

이제 모양을 정의했으므로, 해당 모양을 옵션 버튼으로 렌더링하는 컴포저를 생성해보겠습니다.

<div class="content-ad"></div>

## GenderOptionStyle

컴포저블을 만들기 전에 옵션의 스타일을 나타내는 데이터 클래스를 정의해야 합니다:

```js
data class GenderOptionStyle(
    val backgroundColor: Color,
    val fillColor: Color,
    val effectOrigin: TransformOrigin
) {
    companion object {
        val MaleDefault = GenderOptionStyle(Color.LightGray, Color.Blue, TransformOrigin(0f, 0f))
        val FemaleDefault = GenderOptionStyle(Color.LightGray, Color.Red, TransformOrigin(1f, 0f))
    }
}
```

effectOrigin은 채워지는 효과 애니메이션의 중심점을 결정하며, 성장하는 원 효과의 원점입니다.

<div class="content-ad"></div>

## 옵션 코드

```js
@Composable
fun GenderOption(
    shape: Shape,
    selected: Boolean,
    style: GenderOptionStyle,
    modifier: Modifier = Modifier,
    animationSpec: AnimationSpec<Float> = tween(400, easing = LinearEasing)
) {
    // 선택 상태의 진행률을 애니메이션
    val progress by animateFloatAsState(
        targetValue = if (selected) 1f else 0f,
        animationSpec = animationSpec
    )

    Canvas(
        modifier = modifier.size(48.dp)
    ) {
        // 모양을 아웃라인으로 변환
        val outline = shape.createOutline(size, layoutDirection, this)
        // 아웃라인을 기반으로 경로 생성
        val path = Path().apply { addOutline(outline) }

        // 캔버스 크기의 대각선 길이 계산
        val diagonal = sqrt(size.width.pow(2) + size.height.pow(2))
        // 선택 진행률에 따른 채우기 원의 반경 계산
        val radius = diagonal * progress
        // effectOrigin에 따라 채우기 효과의 중심 위치 결정
        val circleCenter = Offset(
            x = size.width * style.effectOrigin.pivotFractionX,
            y = size.height * style.effectOrigin.pivotFractionY
        )

        // 도형 경로로 그리기 영역 자르기
        clipPath(path) {
            // 배경 색상 그리기
            drawRect(style.backgroundColor)
            // 채우기 원 그리기
            drawCircle(
                color = style.fillColor,
                radius = radius,
                center = circleCenter
            )
        }
    }
}
```

# 성별 선택기

이 섹션에서는 선택기 Composable을 구성합니다.

<div class="content-ad"></div>

## 옵션

셀렉터를 구현하기 전에 사용 가능한 옵션을 나타내는 enum 클래스를 정의해 봅시다:

```js
enum class Gender { MALE, FEMALE }
```

## 유틸리티

<div class="content-ad"></div>

코드를 더 깔끔하게 만들기 위해, clickableGenderOption modifier를 정의해보겠습니다. 이 modifier는 시각적인 표시 없이 성별 옵션을 클릭하는 이벤트를 처리할 것입니다:

```js
fun Modifier.clickableGenderOption(
    gender: Gender,
    onGenderChange: (newGender: Gender) -> Unit
) = composed {
    this.clickable(
        interactionSource = remember { MutableInteractionSource() },
        indication = null,
        onClick = { onGenderChange(gender) }
    )
}
```

## Selector Code

```js
@Composable
fun GenderSelector(
    selected: Gender,
    modifier: Modifier = Modifier,
    iconSize: Dp = 48.dp,
    maleStyle: GenderOptionStyle = GenderOptionStyle.MaleDefault,
    femaleStyle: GenderOptionStyle = GenderOptionStyle.FemaleDefault,
    animationSpec: AnimationSpec<Float> = tween(400, easing = LinearEasing),
    onGenderChange: (newGender: Gender) -> Unit
) {
    // Arrange the gender options in a horizontal row
    Row(
        modifier = modifier,
        verticalAlignment = Alignment.CenterVertically
    ) {
        // Female gender option
        GenderOption(
            shape = FemaleShape,
            style = femaleStyle,
            selected = (selected == Gender.FEMALE),
            animationSpec = animationSpec,
            modifier = Modifier
                .size(iconSize)
                .clickableGenderOption(Gender.FEMALE, onGenderChange)
        )
        // Male gender option
        GenderOption(
            shape = MaleShape,
            style = maleStyle,
            selected = (selected == Gender.MALE),
            animationSpec = animationSpec,
            modifier = Modifier
                .size(iconSize)
                .clickableGenderOption(Gender.MALE, onGenderChange)
        )
    }
}
```

<div class="content-ad"></div>

축하드립니다 🥳! 성공적으로 구축했습니다 👏. GitHub Gist에서 전체 코드를 찾을 수 있어요 🧑‍💻. 사용 방법을 살펴보죠 👇

# 실용적인 사용 💁‍♂️

다양한 effectOrigin 조합이 흥미로울 수 있어요. 몇 가지를 살펴보죠 👀

## 상태

<div class="content-ad"></div>

모든 예시는 이 상태를 사용합니다:

```kotlin
val currentGender by remember { mutableStateOf(Gender.MALE) }
```

## 기본

```kotlin
GenderSelector(
    selected = currentGender,
    iconSize = 100.dp,
    onGenderChange = {
        currentGender = it
    }
)
```

<div class="content-ad"></div>

이미지 태그의 Markdown 형식으로 변경하겠습니다.

## Bottom Rise

```js
GenderSelector(
    selected = currentGender,
    iconSize = 100.dp,
    femaleStyle = GenderOptionStyle.FemaleDefault.copy(
        effectOrigin = TransformOrigin(0.5f, 1f)
    ),
    maleStyle = GenderOptionStyle.MaleDefault.copy(
        effectOrigin = TransformOrigin(0.5f, 1f)
    ),
    onGenderChange = {
        currentGender = it
    }
)
```

이미지 가로 사이즈를 800px로 조정한 미디어 링크를 첨부합니다:

![](https://miro.medium.com/v2/resize:fit:800/1*SrIPDOLcG28q0fqC77yZuA.gif)

<div class="content-ad"></div>

## 측면 이동

```js
GenderSelector(
    selected = currentGender,
    iconSize = 100.dp,
    femaleStyle = GenderOptionStyle.FemaleDefault.copy(
        effectOrigin = TransformOrigin(1f, 0.5f)
    ),
    maleStyle = GenderOptionStyle.MaleDefault.copy(
        effectOrigin = TransformOrigin(0f, 0.5f)
    ),
    onGenderChange = {
        currentGender = it
    }
)
```

<img src="https://miro.medium.com/v2/resize:fit:800/1*odUqEeB_5-6zMquG7fPjYw.gif" />

아래 내용도 맘에 드실 수 있어요 👇

<div class="content-ad"></div>

이 글을 읽어주셔서 감사합니다! ❤️ 만약 즐겁고 가치 있는 정보를 얻으셨다면 👏 클랩(박수)을 보내주시고 더 많은 흥미로운 글을 위해 Kappdev를 팔로우해주세요 😊

🔔 제 최신 콘텐츠를 업데이트 받으시려면 👉 이메일 알림을 구독해주세요.

즐거운 코딩 되세요!