---
title: "Jetpack Compose로 안드로이드 카운트다운 스낵바 만드는 방법"
description: ""
coverImage: "/assets/img/2024-07-01-HowtoCreateaCountdownSnackbarinAndroidwithJetpackCompose_0.png"
date: 2024-07-01 20:04
ogImage:
  url: /assets/img/2024-07-01-HowtoCreateaCountdownSnackbarinAndroidwithJetpackCompose_0.png
tag: Tech
originalTitle: "How to Create a Countdown Snackbar in Android with Jetpack Compose"
link: "https://medium.com/@kappdev/how-to-create-a-countdown-snackbar-in-android-with-jetpack-compose-d58bcd8011cf"
isUpdated: true
---

환영합니다 👋

이 기사에서는 젯팩 콤포즈(Jetpack Compose)에서 카운트다운 스낵바를 만들어보겠습니다. 이 기능은 사용자가 계정을 삭제하는 등 중요한 작업을 다시 생각할 시간을 제공하기에 안성맞춤입니다.

계속 주목해 주시고, 함께 시작해 보겠습니다! 🚀

<img src="/assets/img/2024-07-01-HowtoCreateaCountdownSnackbarinAndroidwithJetpackCompose_0.png" />

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

# 스낵바 카운트다운 생성하기

먼저 시각적으로 카운트다운 타이머를 나타내는 SnackbarCountdown 조합 함수를 정의합니다.

```js
@Composable
private fun SnackbarCountdown(
    timerProgress: Float,
    secondsRemaining: Int,
    color: Color
) {
    Box(
        modifier = Modifier.size(24.dp),
        contentAlignment = Alignment.Center
    ) {
        Canvas(Modifier.matchParentSize()) {
            // 스트로크 정의
            val strokeStyle = Stroke(
                width = 3.dp.toPx(),
                cap = StrokeCap.Round
            )
            // 트랙 그리기
            drawCircle(
                color = color.copy(alpha = 0.12f),
                style = strokeStyle
            )
            // 진행 상황 그리기
            drawArc(
                color = color,
                startAngle = -90f,
                sweepAngle = (-360f * timerProgress),
                useCenter = false,
                style = strokeStyle
            )
        }
        // 남은 초 표시
        Text(
            text = secondsRemaining.toString(),
            style = LocalTextStyle.current.copy(
                fontSize = 14.sp,
                color = color
            )
        )
    }
}
```

# 카운트다운Snackbar 함수 설정하기

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

이제 SnackbarCountdown을 구성했으니 CountdownSnackbar을 정의할 수 있습니다. 이 composable은 외관과 동작을 사용자 정의하기 위해 여러 매개변수를 가져야 합니다.

```js
@Composable
fun CountdownSnackbar(
    snackbarData: SnackbarData,
    modifier: Modifier = Modifier,
    durationInSeconds: Int = 5,
    actionOnNewLine: Boolean = false,
    shape: Shape = SnackbarDefaults.shape,
    containerColor: Color = SnackbarDefaults.color,
    contentColor: Color = SnackbarDefaults.contentColor,
    actionColor: Color = SnackbarDefaults.actionColor,
    actionContentColor: Color = SnackbarDefaults.actionContentColor,
    dismissActionContentColor: Color = SnackbarDefaults.dismissActionContentColor,
) {
    // 여기에 구현...
}
```

⏳ snackbarData ➜ Snackbar을 위한 데이터.

⏳ modifier ➜ Snackbar에 적용할 Modifier.

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

⏳ durationInSeconds ➜ 카운트다운 타이머의 기간.

⏳ actionOnNewLine ➜ 동작을 별도의 줄에 표시할지 여부.

⏳ shape ➜ 스낵바 컨테이너의 모양.

⏳ containerColor, contentColor, actionColor, actionContentColor, dismissActionContentColor ➜ 다양한 색상 스타일링 매개변수.

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

# CountdownSnackbar 구현

## 스낵바의 지속 시간 및 상태 관리

다음으로, 밀리초로 총 지속 시간을 계산하고 상태 변수를 사용하여 남은 시간을 관리합니다. 또한 LaunchedEffect를 사용하여 카운트다운을 처리하고 시간이 다 되면 스낵바를 해제합니다.

```js
val totalDuration = remember(durationInSeconds) { durationInSeconds * 1000 }
var millisRemaining by remember { mutableIntStateOf(totalDuration) }

LaunchedEffect(snackbarData) {
    while (millisRemaining > 0) {
        delay(40)
        millisRemaining -= 40
    }
    snackbarData.dismiss()
}
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

40밀리초 간격을 사용하면 인간의 눈에 매끄러운 25 FPS 진행 업데이트가 발생합니다. 특정 요구 사항에 맞게 조정해 주셔도 좋습니다.

## 작업 및 닫기 버튼 처리

작업 및 닫기 버튼을 만들기 위해 snackbarData에서 제공된 정보를 활용합니다.

```js
// 작업 레이블이 제공되면 작업 버튼 정의
val actionLabel = snackbarData.visuals.actionLabel
val actionComposable: (@Composable () -> Unit)? = if (actionLabel != null) {
    @Composable {
        TextButton(
            colors = ButtonDefaults.textButtonColors(contentColor = actionColor),
            onClick = { snackbarData.performAction() },
            content = { Text(actionLabel) }
        )
    }
} else {
    null
}

// snackbar에 닫기 작업이 포함되어 있는 경우 닫기 버튼 정의
val dismissActionComposable: (@Composable () -> Unit)? = if (snackbarData.visuals.withDismissAction) {
    @Composable {
        IconButton(
            onClick = { snackbarData.dismiss() },
            content = {
                Icon(Icons.Rounded.Close, null)
            }
        )
    }
} else {
    null
}
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

## Snackbar 표시

마지막으로, 모든 것을 함께 모아 Snackbar를 표시해 봅시다.

```js
Snackbar(
    modifier = modifier.padding(12.dp), // Snackbar 주변에 패딩 적용
    action = actionComposable,
    actionOnNewLine = actionOnNewLine,
    dismissAction = dismissActionComposable,
    dismissActionContentColor = dismissActionContentColor,
    actionContentColor = actionContentColor,
    containerColor = containerColor,
    contentColor = contentColor,
    shape = shape,
) {
    Row(
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        SnackbarCountdown(
            // 타이머 진행 상황 계산
            timerProgress = millisRemaining.toFloat() / totalDuration.toFloat(),
            // 남은 초 계산
            secondsRemaining = (millisRemaining / 1000) + 1,
            color = contentColor
        )
        // 메시지 표시
        Text(snackbarData.visuals.message)
    }
}
```

축하합니다🥳! 성공적으로 만들었습니다👏. 전체 코드 구현은 GitHub Gist에서 확인할 수 있습니다🧑‍💻. 이제 이를 어떻게 활용할 수 있는지 알아보겠습니다.

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

## 광고

외국어를 배우면서 새로운 어휘에 어려움을 겪고 계신가요? 그렇다면, 여러분의 학습 여정을 쉽고 편리하게 만들어 줄 이 단어 학습 앱을 꼭 확인해보시기를 강력히 추천합니다!

![이미지](/assets/img/2024-07-01-HowtoCreateaCountdownSnackbarinAndroidwithJetpackCompose_1.png)

# 실용적인 예시 💁

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

이 방법을 실제로 사용하여 사용자가 계정을 삭제하고 이 결정을 5초 동안 취소할 수 있는 예제를 만들어 봅시다.

```kotlin
Box(Modifier.fillMaxSize()) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    // 스낵바 상태를 관리하는 SnackbarHostState를 정의합니다
    val snackbarHostState = remember { SnackbarHostState() }

    Button(
        modifier = Modifier.align(Alignment.Center),
        onClick = {
            scope.launch {
                // 스낵바를 표시합니다
                val result = snackbarHostState.showSnackbar(
                    message = "사용자 계정이 삭제되었습니다.",
                    actionLabel = "취소",
                    duration = SnackbarDuration.Indefinite
                )
                // 스낵바 결과 처리
                when (result) {
                    SnackbarResult.Dismissed -> {
                        Toast.makeText(context, "영구 삭제되었습니다", Toast.LENGTH_SHORT).show()
                    }
                    SnackbarResult.ActionPerformed -> {
                        Toast.makeText(context, "삭제 취소됨", Toast.LENGTH_SHORT).show()
                    }
                }
            }
        }
    ) {
        Text("계정 삭제")
    }

    // 스낵바를 표시하는 SnackbarHost를 생성합니다
    SnackbarHost(
        hostState = snackbarHostState,
        modifier = Modifier.align(BottomCenter)
    ) { data ->
        // CountdownSnackbar를 사용합니다
        CountdownSnackbar(data)
    }
}
```

## 결과:

<img src="https://miro.medium.com/v2/resize:fit:1400/1*7-Q98heTXND5N7XbAEKBYQ.gif" />

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

아래 내용도 좋아할지도요 👇

이 기사를 읽어 주셔서 감사합니다! ❤️ 즐겁고 가치 있게 읽으셨길 바랍니다. 만약 좋았다면 박수 버튼👏을 눌러서 감사를 표현하고 Kappdev를 팔로우해서 더 많은 흥미로운 기사를 읽어보세요 😊

코딩 즐기세요!

![이미지](/assets/img/2024-07-01-HowtoCreateaCountdownSnackbarinAndroidwithJetpackCompose_2.png)
