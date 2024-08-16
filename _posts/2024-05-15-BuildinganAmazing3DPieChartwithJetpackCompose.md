---
title: "젯팩 컴포즈로 멋진 3D 파이 차트 만들기"
description: ""
coverImage: "/assets/img/2024-05-15-BuildinganAmazing3DPieChartwithJetpackCompose_0.png"
date: 2024-05-15 15:34
ogImage: 
  url: /assets/img/2024-05-15-BuildinganAmazing3DPieChartwithJetpackCompose_0.png
tag: Tech
originalTitle: "Building an Amazing 3D Pie Chart with Jetpack Compose"
link: "https://medium.com/@kappdev/building-an-amazing-3d-pie-chart-with-jetpack-compose-55e09a26d453"
isUpdated: true
---




환영합니다 👋

사용자를 감동시킬 멋진 파이 차트를 구현하는 데 5분 이상 투자하지 않고 싶나요?

그렇다면, 당신이 올바른 곳에 왔습니다. 이 기사는 정확히 그것에 대한 것입니다.

계속 보고, 함께 알아봐요! 🚀




![image](https://miro.medium.com/v2/resize:fit:1400/1*TMrRg9yn-gQWNzsPyCCIMg.gif)

# Convex Pie Chart

가장 흥미로운 부분에서 여정을 시작해 보죠: 조각에 적용할 볼록한 효과를 가진 Pie Chart를 만들어 봅시다.

## PieChart 데이터




함수를 조립하기 전에, 원 차트 데이터를 나타내는 데이터 클래스를 만들어야 합니다.

```kotlin
data class PieChartData(
    val label: String,
    val value: Int,
    val color: Color
)
```

## ConvexStyle

또 다른 지원 데이터 클래스인 ConvexStyle을 만들어야 Convex 효과의 시각적 모습을 표현할 수 있습니다.



```js
data class ConvexStyle(
    val blur: Dp = 5.dp,
    val offset: Dp = 4.dp,
    val glareColor: Color = Color.White.copy(0.48f),
    val shadowColor: Color = Color.Black.copy(0.48f)
)
```

## The composable

이제, 원형 차트를 그릴 composable을 정의할 수 있습니다.

```js
@Composable
fun ConvexPieChart(
    modifier: Modifier,
    data: List<PieChartData>,
    startAngle: Float = -90f,
    rotationsCount: Int = 4,
    pieSliceStyle: ConvexStyle = ConvexStyle(),
    animationSpec: AnimationSpec<Float> = 
        tween(1_000, easing = LinearOutSlowInEasing)
) {
    /* 구현 */
}
```



## ⚒️ 매개변수 분석

⚡ modifier ➜ 레이아웃에 적용된 수정자입니다.

⚡ data ➜ 파이 차트에 표시할 데이터입니다.

⚡ startAngle ➜ 첫 번째 슬라이스의 초기 각도(도)입니다 (그림 1 👇).



⚡ rotationsCount ➜ 애니메이션 중 완전한 회전 횟수입니다.

⚡ pieSliceStyle ➜ 파이 조각의 볼록 스타일을 정의합니다.

⚡ animationSpec ➜ 스케일 및 회전에 대한 애니메이션 동작을 지정합니다.

![이미지](/assets/img/2024-05-15-BuildinganAmazing3DPieChartwithJetpackCompose_0.png)



## 오목한 아치

파이 차트 자체를 그리기 전에, 우리 아름다운 조각들을 렌더링할 drawConvexArc라는 지원 함수를 만들어보겠습니다.

```js
fun DrawScope.drawConvexArc(
    color: Color,
    startAngle: Float,
    sweepAngle: Float,
    useCenter: Boolean,
    style: ConvexStyle,
) = canvas에 그리기 { canvas ->
    val rect = this.size.toRect() // 캔버스의 경계
    
    // 그리기용 페인트 개체 정의
    val paint = Paint()
    paint.color = color
    
    // 캔버스에 기본 아치 그리기
    canvas.drawArc(rect, startAngle, sweepAngle, useCenter, paint)
    
    // 그림자와 번빛 아치를 그리는 함수 정의
    fun drawShadowArc(offsetX: Float, offsetY: Float, shadowColor: Color) {
        val shadowPaint = Paint() // 그림자를 그리기 위한 페인트 개체

        shadowPaint.color = shadowColor // 그림자 색상 설정

        // 현재 캔버스 레이어 저장
        canvas.saveLayer(rect, shadowPaint)
        
        // 그림자 아치 그리기
        canvas.drawArc(rect, startAngle, sweepAngle, useCenter, shadowPaint)

        // 그림자에 블렌딩 모드 및 블러 효과 적용
        shadowPaint.asFrameworkPaint().apply {
            xfermode = PorterDuffXfermode(PorterDuff.Mode.DST_OUT)
            maskFilter = BlurMaskFilter(style.blur.toPx(), BlurMaskFilter.Blur.NORMAL)
        }

        shadowPaint.color = Color.Black // 클리핑을 위한 색상 설정

        // 캔버스 이동 및 클리핑 아치 그리기
        canvas.translate(offsetX, offsetY)
        canvas.drawArc(rect, startAngle, sweepAngle, useCenter, shadowPaint)

        // 캔버스를 원래 상태로 복원
        canvas.restore()
    }
    
    // 픽셀 단위로 오프셋 계산
    val offsetPx = style.offset.toPx()
    
    // 음수 오프셋으로 그림자 아치 그리기
    drawShadowArc(-offsetPx, -offsetPx, style.shadowColor)
    
    // 양수 오프셋으로 번빛 아치 그리기
    drawShadowArc(offsetPx, offsetPx, style.glareColor)
}
```

더 잘 이해하기 위해 아래 사진을 확인하세요 👇




![BuildinganAmazing3DPieChartwithJetpackCompose_1](/assets/img/2024-05-15-BuildinganAmazing3DPieChartwithJetpackCompose_1.png)

![BuildinganAmazing3DPieChartwithJetpackCompose_2](/assets/img/2024-05-15-BuildinganAmazing3DPieChartwithJetpackCompose_2.png)

## Convex pie chart

Now that we have the drawConvexArc function, we can draw the pie chart.




```kotlin
@Composable
fun ConvexPieChart(
    /* 매개변수 */
) {
    // 모든 데이터 값의 합
    val totalValuesSum = remember(data) { data.sumOf(PieChartData::value) } 

    // 파이 차트를 확대 및 회전하기 위한 애니메이션 가능한 값
    val pieChartScale = remember { Animatable(0f) }
    val pieChartRotation = remember { Animatable(0f) }

    // 파이 차트를 확대하고 회전시키는 애니메이션 시작
    LaunchedEffect(Unit) {
        launch {
            pieChartScale.animateTo(1f, animationSpec)
        }
        launch {
            pieChartRotation.animateTo(360f * rotationsCount, animationSpec)
        }
    }

    // 캔버스를 사용하여 파이 차트 그리기
    Canvas(
        modifier
            .aspectRatio(1f) // 캔버스가 정사각형이 되도록 함 (1:1)
            // 애니메이션 전환 적용
            .scale(pieChartScale.value)
            .rotate(pieChartRotation.value)
    ) {
        // 시작 각도로 마지막 값 초기화
        var lastValue = startAngle
        // 각 데이터 포인트를 반복하고 해당 파이 조각을 그리기
        data.forEach { chartData ->
            // 현재 데이터 포인트의 스윕 각도 계산
            val pieSweepAngle = 360f * (chartData.value.toFloat() / totalValuesSum.toFloat())
            // 파이 슬라이스를 나타내는 볼록한 아크 그리기
            drawConvexArc(
                color = chartData.color,
                startAngle = lastValue,
                sweepAngle = pieSweepAngle,
                style = pieSliceStyle,
                useCenter = true
            )
            // 다음 슬라이스를 위해 마지막 값 업데이트
            lastValue += pieSweepAngle
        }
    }
}
```

좋아요, 우리가 이미 이룬 것들이에요 😍

<img src="https://miro.medium.com/v2/resize:fit:1200/1*-yHzlxmatQyVTdfTV8h5yQ.gif" />

# 파이 차트 패널




자, 이제 그림자를 활용하여 빛나는 피 크림 차트를 위한 멋진 패널을 만들어 봅시다.

여기서 그림자의 놀이 🤹‍♂️을 하며, innerShadow와 dropShadow 수정자(modifier)를 사용할 것입니다. 자세한 설명은 아래 제가 제공한 관련 기사를 참조하거나 👇 아래 링크에서 InnerShadow Gist, DropShadow Gist의 코드를 확인할 수 있습니다.

```js
@Composable
fun PieChartPanel(
    modifier: Modifier,
    platesColor: Color = Color(0xFFD5F3FF),
    platesGap: Dp = 32.dp,
    style: ConvexStyle = ConvexStyle(
        blur = 12.dp,
        offset = 8.dp,
        glareColor = Color.White.copy(alpha = 0.32f),
        shadowColor = Color.Black.copy(alpha = 0.32f)
    ),
    content: @Composable BoxScope.() -> Unit
) {
    Box(
        // 전체 패널을 나타내는 외부 상자
        modifier = modifier
            .aspectRatio(1f) // 가로세로 비율 1:1로 설정
            // 내부 그림자 적용으로 깊이 효과 생성
            .innerShadow(CircleShape, style.glareColor, style.blur, -style.offset, -style.offset)
            .innerShadow(CircleShape, style.shadowColor, style.blur, style.offset, style.offset)
            // 드롭 그림자 적용으로 고도 효과 생성
            .dropShadow(CircleShape, style.glareColor, style.blur, -style.offset, -style.offset)
            .dropShadow(CircleShape, style.shadowColor, style.blur, style.offset, style.offset)
            // 배경 그리기
            .background(platesColor, CircleShape),
        contentAlignment = Alignment.Center
    ) {
        Box(
            // 실제 콘텐츠를 포함하는 내부 상자
            modifier = Modifier
                .matchParentSize() // 전체 부모 크기 차지
                .padding(platesGap) // 플레이트 간의 갭 추가
                // 드롭 그림자 적용으로 고도 효과 생성
                .dropShadow(CircleShape, style.glareColor, style.blur, -style.offset, -style.offset)
                .dropShadow(CircleShape, style.shadowColor, style.blur, style.offset, style.offset)
                // 배경 그리기
                .background(platesColor, CircleShape),
            contentAlignment = Alignment.Center,
            content = content // 콘텐츠 삽입
        )
    }
}
```

자, 준비가 다 되었습니다! 패널에 표시할 콘텐츠가 마지막 조각입니다. 패널에 표시할 총 값 텍스트를 조금의 애니메이션과 함께 만들어 봅시다.



```kotlin
@Composable
fun TotalView(
    total: Int,
    modifier: Modifier = Modifier,
    animationSpec: AnimationSpec<Int> = tween(1000, easing = FastOutSlowInEasing)
) {
    val totalToDisplay = remember {
        Animatable(initialValue = 0, typeConverter = Int.VectorConverter)
    }

    // total 값이 변경될 때 전체 값을 애니메이트하는 effect 시작
    LaunchedEffect(total) {
        totalToDisplay.animateTo(total, animationSpec)
    }

    Column(
        modifier = modifier,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "총액",
            fontSize = 14.sp,
            color = Color(0xFF464646)
        )
        Text(
            text = "${totalToDisplay.value}$",
            fontSize = 18.sp,
            fontWeight = FontWeight.Medium,
            color = Color(0xFF010203)
        )
    }
}
```

축하합니다🥳! 성공적으로 구현했습니다👏. 전체 코드 구현은 GitHub Gist에서 확인하실 수 있어요🧑‍💻. 이제 모든 것을 하나로 합쳐서 최종 결과를 살펴봅시다!

## 광고

외국어를 배우고 새로운 어휘에 어려움을 겪고 계신가요? 그렇다면 어플 단어 학습 어플 을 꼭 추천드립니다! 여러분들의 학습 여정을 쉽고 편리하게 만들어 줄 거예요!




![Image](/assets/img/2024-05-15-BuildinganAmazing3DPieChartwithJetpackCompose_3.png)

# Final

이제 시연을 위한 데이터 목록을 만들어 봅시다:

```js
val pieChartData = remember {
    listOf(
        PieChartData("항목-1", 30, Color(0xFFE45C5C)),
        PieChartData("항목-2", 45, Color(0xFF8FE25C)),
        PieChartData("항목-3", 25, Color(0xFF4471E4)),
        PieChartData("항목-4", 20, Color(0xFFEECE55)),
        PieChartData("항목-5", 40, Color(0xFFBD68CB)),
    )
}
```



그리고 마지막으로 마무리해봅시다 🔩

```js
Box(contentAlignment = Alignment.Center) {
    ConvexPieChart(
        data = pieChartData,
        modifier = Modifier.size(300.dp)
    )
    PieChartPanel(
        Modifier.size(180.dp)
    ) {
        TotalView(total = 23548)
    }
}
```

## 결과

<img src="https://miro.medium.com/v2/resize:fit:1400/1*n7ZqFsdqSEl1egbPbMKD_g.gif" />



당신께 도움이 되었길 바라며 감사합니다. 코딩을 즐기세요! ❤️

아래 내용도 마음에 드실지도요 👇

만일 좋아하셨다면 👏 클립해주세요! 그리고 더 많은 흥미로운 글을 보고 싶다면
Kappdev
를 팔로우해주세요 😊

![3D 파이 차트 만들기](/assets/img/2024-05-15-BuildinganAmazing3DPieChartwithJetpackCompose_4.png)