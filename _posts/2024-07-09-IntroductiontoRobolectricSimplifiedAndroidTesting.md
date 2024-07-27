---
title: "Robolectric 소개 안드로이드 테스트를 간편하게 하는 방법"
description: ""
coverImage: "/assets/img/2024-07-09-IntroductiontoRobolectricSimplifiedAndroidTesting_0.png"
date: 2024-07-09 09:30
ogImage: 
  url: /assets/img/2024-07-09-IntroductiontoRobolectricSimplifiedAndroidTesting_0.png
tag: Tech
originalTitle: "Introduction to Robolectric: Simplified Android Testing"
link: "https://medium.com/@farimarwat/introduction-to-robolectric-simplified-android-testing-24b762994c63"
---


<img src="/assets/img/2024-07-09-IntroductiontoRobolectricSimplifiedAndroidTesting_0.png" />

# Robolectric 소개

Robolectric은 안드로이드 개발자가 엔터테인먼트기로나 실제 기기가 필요 없는 JVM에서 유닛 테스트를 작성하고 실행할 수 있는 강력한 프레임워크입니다. Robolectric은 시뮬레이션 환경을 제공하여 안드로이드 애플리케이션을 테스트하는 과정을 단순화하고 테스트를 더 빠르고 효율적으로 실행할 수 있도록 합니다.

# 섹션 개요

<div class="content-ad"></div>

이 가이드에서 다음 섹션을 다루었습니다:

- 기본 예제: 간단한 안드로이드 액티비티 설정 및 기본 테스트 케이스 작성.
- 앱 클래스에서 변수 초기화 테스트: 앱 클래스의 변수가 올바르게 초기화되었는지 확인.
- 두 번째 액티비티가 시작되는지 테스트: MainActivity에서 버튼을 클릭했을 때 두 번째 액티비티가 시작되었는지 확인.
- API 레벨 기반 기능 테스트: API 레벨에 따라 변수가 올바르게 초기화되었는지 확인.

# 섹션 1: 기본 예제

이 첫 번째 섹션에서는 안드로이드 액티비티 설정의 기본 사용 방법, 레이아웃 생성, 버튼 클릭 이벤트 처리, Robolectric을 사용하여 간단한 테스트 케이스 작성을 보여줍니다.

<div class="content-ad"></div>

## 종속성

다음 종속성 및 구성을 안드로이드 블록 내의 build.gradle 파일에 추가해주세요:

```js
android {
    ...

    testOptions {
        unitTests {
            isIncludeAndroidResources = true
        }
    }
}

dependencies {
    testImplementation("junit:junit:4.13.2")
    testImplementation("org.robolectric:robolectric:4.13")
}
```

testOptions 구성을 통해 안드로이드 리소스가 유닛 테스트에 포함되어 누락된 매니페스트와 같은 문제를 방지합니다.

<div class="content-ad"></div>

# 테스트 목적

이 테스트의 목적은 버튼을 클릭할 때 TextView의 텍스트가 올바르게 업데이트되는지 확인하는 것입니다. 이는 버튼과 상호 작용할 때 UI가 예상대로 작동하는지를 보장합니다.

# 단계 1: 기본 설정 및 테스트

## MainActivity.kt

<div class="content-ad"></div>

먼저, 콘텐츠 뷰를 레이아웃으로 설정하고 버튼 클릭 이벤트를 처리하는 간단한 MainActivity를 만들어 봅시다.

```kotlin
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val txtMsg = findViewById<TextView>(R.id.txtMsg)
        val btnClickMe = findViewById<Button>(R.id.btnClickMe)

        btnClickMe.setOnClickListener {
            txtMsg.text = "Click Me!"
        }
    }
}
```

## activity_main.xml

다음으로, MainActivity용 사용자 인터페이스를 정의하는 레이아웃 XML 파일을 만들어 보세요.

<div class="content-ad"></div>

```java
LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:gravity="center">

    <TextView
        android:id="@+id/txtMsg"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!" />

    <Button
        android:id="@+id/btnClickMe"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Click Me" />
</LinearLayout>
```

<div class="content-ad"></div>

이 테스트 클래스는 Robolectric을 사용하여 활동 수명주기를 시뮬레이트하고 버튼 클릭 기능을 테스트합니다.

```js
@RunWith(RobolectricTestRunner::class)
@Config(sdk = [30])
class MainActivityTest {
    private lateinit var activity: MainActivity

    // 이 메서드는 각 테스트 전에 실행되어 활동을 설정합니다
    @Before
    fun setUp() {
        activity = Robolectric.buildActivity(MainActivity::class.java)
            .create()  // 활동 생성
            .start()   // 활동 시작
            .resume()  // 상호작용을 위해 활동을 다시 시작
            .get()     // 활동 인스턴스 가져오기
    }

    // 이 테스트는 버튼 클릭이 TextView 텍스트를 올바르게 업데이트하는지 확인합니다
    @Test
    fun test_click_me() {
        val btnClickMe = activity.findViewById<Button>(R.id.btnClickMe)
        val txtMsg = activity.findViewById<TextView>(R.id.txtMsg)

        // 버튼 클릭을 시뮬레이션
        btnClickMe.performClick()

        // txtMsg의 텍스트가 "Click Me!"로 업데이트되었는지 확인
        assertEquals("Click Me!", txtMsg.text)
    }
}
```

# 설명

- 목적: 이 테스트는 버튼을 클릭했을 때 TextView 텍스트가 "Click Me!"로 업데이트되는지 확인합니다.
- @RunWith(RobolectricTestRunner::class): 이 주석은 테스트를 실행하는 데 RobolectricTestRunner를 사용하도록 JUnit에 알려줍니다.
- @Config(sdk = [30]): 이 주석은 테스트에 사용할 SDK 버전을 지정합니다.
- @Before: 이 주석은 각 테스트 전에 setUp 메서드가 실행되어 MainActivity를 Robolectric을 사용하여 설정합니다.
- Robolectric.buildActivity(MainActivity::class.java): MainActivity의 새 인스턴스를 생성합니다.
- .create().start().resume().get(): 이 시퀀스는 활동 수명주기 메서드를 시뮬레이트합니다.
- @Test: 이 주석은 test_click_me 메서드가 테스트 케이스임을 나타냅니다.
- btnClickMe.performClick(): 이는 버튼 클릭을 시뮬레이션합니다.
- assertEquals("Click Me!", txtMsg.text): 이 어서션은 버튼을 클릭한 후 txtMsg의 텍스트가 "Click Me!"로 업데이트되었는지 확인합니다.

<div class="content-ad"></div>

# 섹션 2: 앱 클래스에서 변수 초기화 테스트

이 섹션에서는 App 클래스의 변수를 올바르게 초기화하는지를 확인하는 방법을 시연하겠습니다.

# 테스트의 목적

이 테스트의 목적은 App 클래스에서 선언된 변수가 올바르게 초기화되었는지를 확인하고, MainActivity에서 접근했을 때 null이 아닌지를 검증하는 것입니다.

<div class="content-ad"></div>

# MainActivity

먼저 MainActivity를 수정하여 App 클래스에서 변수에 액세스할 수 있도록 합니다.

```js
class MainActivity : AppCompatActivity() {
    lateinit var mApp: App

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        mApp = application as App
        val txtMsg = findViewById<TextView>(R.id.txtMsg)
        val btnClickMe = findViewById<Button>(R.id.btnClickMe)

        btnClickMe.setOnClickListener {
            txtMsg.text = "Click Me!"
        }
    }
}
```

# App Class

<div class="content-ad"></div>

다음으로, Application을 확장하는 App 클래스를 생성하고 그 내에 변수를 선언해 봅시다.

```kotlin
class App : Application() {
    lateinit var mPackageName: String

    override fun onCreate() {
        super.onCreate()
        mPackageName = packageName
    }
}
```

AndroidManifest.xml 파일에 App 클래스를 설정하세요:

```js
<application
    android:name=".App"
    ...
/>
```

<div class="content-ad"></div>

# 테스트 케이스 작성하기

이 테스트 클래스는 Robolectric을 사용하여 App 클래스의 변수가 올바르게 초기화되고 null이 아닌지를 확인합니다.

```js
@RunWith(RobolectricTestRunner::class)
@Config(sdk = [30], application = App::class)
class MainActivityTest {
    private lateinit var activity: MainActivity

    @Before
    fun setUp() {
        activity = Robolectric.buildActivity(MainActivity::class.java)
            .create()
            .start()
            .resume()
            .get()
    }

    @Test
    fun test_click_me() {
        val btnClickMe = activity.findViewById<Button>(R.id.btnClickMe)
        val txtMsg = activity.findViewById<TextView>(R.id.txtMsg)
        btnClickMe.performClick()
        assertEquals("Click Me!", txtMsg.text)
    }

    @Test
    fun test_is_mpackage_initialized() {
        assertNotNull(activity.mApp.mPackageName)
    }
}
```

# 설명

<div class="content-ad"></div>

- 목적: 이 테스트는 App 클래스의 변수가 올바르게 초기화되었는지 확인하고 null이 아닌지 확인합니다.
- test_is_mpackage_initialized: 이 테스트는 App 클래스의 mPackageName 변수가 null이 아닌지 확인합니다.
- assertNotNull(activity.mApp.mPackageName): 이 어설션은 변수 mPackageName이 null이 아닌지 확인합니다.

# 섹션 3: 두 번째 액티비티가 시작되었는지 테스트하는 방법

이 섹션에서는 메인 액티비티에서 두 번째 액티비티가 시작되었는지 테스트하는 방법을 보여줍니다.

# 테스트의 목적

<div class="content-ad"></div>

이 테스트의 목적은 MainActivity에서 버튼을 클릭하여 SecondActivity가 시작되는지 확인하는 것입니다.

# MainActivity

우선 MainActivity를 수정하여 버튼을 클릭할 때 SecondActivity가 시작되도록 해봅시다.

```js
btnClickMe.setOnClickListener {
     txtMsg.text = "Click Me!"
     startActivity(Intent(this, SecondActivity::class.java))
}
```

<div class="content-ad"></div>

# 테스트 케이스 작성하기

이 테스트 클래스는 Robolectric을 사용하여 MainActivity의 버튼을 클릭했을 때 SecondActivity가 올바르게 시작되는지 확인합니다.

```js
    @Test
    fun test_is_second_activity_started_successfully() {
        activity.findViewById<Button>(R.id.btnClickMe).performClick()
        val nextActivity = Shadows.shadowOf(activity).nextStartedActivity
        assertTrue(nextActivity.component?.className == SecondActivity::class.java.name)
    }
```

- 목적: 이 테스트는 MainActivity에서 버튼을 클릭하면 SecondActivity가 시작되는지 확인합니다.
- SecondActivity: MainActivity에서 시작되는 간단한 활동입니다.
- test_is_second_activity_started_successfully: 이 테스트는 MainActivity의 버튼을 클릭했을 때 SecondActivity가 시작되는지 확인합니다.
- Shadows.shadowOf(activity).nextStartedActivity: 다음 시작된 활동을 가져옵니다.
- assertTrue(nextActivity.component?.className == SecondActivity::class.java.name): 다음 시작된 활동이 SecondActivity인지 확인하는 단언문입니다.

<div class="content-ad"></div>

# 섹션 4: API 레벨 기반 기능 테스트

이 섹션에서는 @Config 어노테이션의 sdk 배열을 구성하여 API 레벨 기반 기능을 테스트하는 방법을 보여드릴 것입니다. 이 테스트를 통해 특정 기능이 특정 API 레벨에서만 활성화되는지 확인할 수 있습니다.

# 테스트 목적

이 테스트의 목적은 MainActivity의 변수가 API 레벨에 따라 초기화되는지 확인하는 것입니다. 이를 통해 Android 버전에 따라 기능이 올바르게 작동하는지 확인할 수 있습니다.

<div class="content-ad"></div>

# MainActivity

MainActivity에서 API 레벨에 따라 변수 mSomeString을 초기화하십시오.

```js
class MainActivity : AppCompatActivity() {
    var mSomeString: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        mSomeString = getSomeString()
    }

    fun getSomeString(): String? {
        return if (Build.VERSION.SDK_INT == Build.VERSION_CODES.R) {
            "이것은 API 30입니다."
        } else {
            null
        }
    }
}
```

# 테스트 케이스 작성

<div class="content-ad"></div>

이 테스트 클래스는 Robolectric을 사용하여 변수 mSomeString이 API 레벨에 따라 올바르게 초기화되었는지 확인합니다.

```js
@RunWith(RobolectricTestRunner::class)
@Config(sdk = [30, 31], application = App::class)
class MainActivityTest {
    private lateinit var activity: MainActivity

    @Before
    fun setUp() {
        activity = Robolectric.buildActivity(MainActivity::class.java)
            .create()
            .start()
            .resume()
            .get()
    }

    @Test
    fun test_pass_only_on_api30() {
        assertNotNull(activity.mSomeString)
    }
}
```

# 설명

- 목적: 테스트는 변수 mSomeString이 API 레벨에 따라 올바르게 초기화되었는지 확인합니다.
- @Config(sdk = [30, 31]): 이 주석은 테스트가 API 레벨 30 및 31에서 실행되어야 함을 지정합니다.
- 테스트는 API 레벨 30(Android R)에서 통과됩니다. 왜냐하면 mSomeString은 "This is API 30"으로 초기화되었기 때문입니다.
- 테스트는 API 레벨 31에서 실패할 것입니다. 왜냐하면 mSomeString이 null일 것이기 때문입니다.

<div class="content-ad"></div>

# 여러 API 레벨 다루기

sdk 배열에 필요한 만큼 많은 API 레벨을 추가할 수 있습니다. 예를들어 @Config(sdk = [29, 30, 31])와 같이 포함시키면, 안드로이드 버전 간에 앱이 올바르게 작동하는지 확인할 수 있습니다.

# 힙 공간 예외 처리하기

```js
Caused by: java.lang.OutOfMemoryError: Java heap space
```

<div class="content-ad"></div>

테스트 중에 여러 API 레벨에서 힙 공간 예외가 발생하는 경우, JVM 힙 공간을 늘릴 수 있습니다. 다음 구성을 build.gradle 파일에 추가하세요:

```js
android {
    ...

    testOptions {
        unitTests.all {
            it.jvmArgs = mutableListOf("-Xmx16g")
        }
    }
}
```

이 구성은 최대 힙 크기를 16GB로 설정하여 테스트 중 힙 공간 오류를 방지하는 데 도움이 됩니다.

# 결론

<div class="content-ad"></div>

로보렉트릭을 활용하면 JVM에서 실행되는 빠르고 신뢰할 수 있는 단위 테스트를 만들어 개발 프로세스를 더 효율적으로 만들 수 있습니다. 다양한 안드로이드 환경을 시뮬레이션하고 다양한 API 레벨을 테스트하며, 에뮬레이터나 실제 기기 없이도 앱이 다양한 시나리오에서 올바르게 동작하는지 확인할 수 있습니다. 이 안내서는 안드로이드 테스트 전략에서 Robolectric을 더 깊이 탐구하고 활용하는 기초 역할을 합니다.