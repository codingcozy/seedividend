---
title: "Jetpack Compose에서 DataStorePreferences를 사용한 지속적 데이터 저장 방법"
description: ""
coverImage: "/assets/img/2024-07-01-PersistentDataStorageUsingDataStorePreferencesinJetpackCompose_0.png"
date: 2024-07-01 16:51
ogImage: 
  url: /assets/img/2024-07-01-PersistentDataStorageUsingDataStorePreferencesinJetpackCompose_0.png
tag: Tech
originalTitle: "Persistent Data Storage Using DataStore (Preferences) in Jetpack Compose"
link: "https://medium.com/@rowaido.game/persistent-data-storage-using-datastore-preferences-in-jetpack-compose-90c481bfed12"
---


![image](/assets/img/2024-07-01-PersistentDataStorageUsingDataStorePreferencesinJetpackCompose_0.png)

ℹ: 가끔 실수를 하거나 완전히 정확하지 않은 정보를 공유할 수도 있어요. 완벽하지 않으니 참고용으로만 사용해 주세요. 뭔가 이상하다고 느껴지면 공식 문서나 블로그를 확인하는 것이 좋아요.

# ✨ 소개

"설정" 메뉴를 응용 프로그램에 포함시키는 것이 표준적인 규칙이 되었습니다. 사용자의 선호에 맞춰 인터페이스를 사용자 정의할 수 있는 기능을 제공하여, 예를 들어 밝은 테마와 어두운 테마 간 전환 또는 알림을 켜거나 끄기 등이 가능합니다.

<div class="content-ad"></div>

“Settings” 정보는 사용자 기기에 지속적으로 저장되어 있어야 합니다 (앱이 삭제될 때까지). 그렇지 않으면 사용자가 앱을 닫을 때마다 저장된 사용자 설정이 손실되어 설정을 다시 처음부터 구성해야 합니다.

이를 염두에 두고 오늘은 앱 설정 정보를 지속적으로 저장하기 위해 주로 사용되는 DataStore (Preferences)의 기본 구현 방법을 소개하겠습니다!

# ☛ 구현 전 고려사항

DataStore (Preferences) API를 사용하면 데이터를 키-값 형식으로 저장하고 관리할 수 있습니다. 그 자체로는 과도하게 복잡하지 않지만 구현에는 다음과 같은 기본 지식을 이해해야 합니다:

<div class="content-ad"></div>

- ViewModel을 사용한 UI 상태 관리의 기본 사항
- Kotlin에서 비동기 처리의 기본 사항 (Coroutine)
- DI (의존성 주입)의 기본적인 이해

만약 이러한 주제들을 이해하지 못하고 있다면, 제가 소개할 샘플 코드의 역할을 이해하기 어려울 수도 있습니다.

제가 작성한 글 속 코드에 대해 가능한 많은 설명을 제공하겠지만, 모든 세부 내용을 다 다루기는 이 글의 범위를 벗어나므로, 일정 수준의 이전 지식을 갖고 있다고 가정하겠습니다. 샘플 코드가 무엇을 하는지 완전히 이해할 수 없다면, Jetpack Compose와 Kotlin의 기본을 다시 공부하는 것이 좋을 수도 있습니다.

아래는 참고 링크입니다 (공식 Google 및 Kotlin 문서):

<div class="content-ad"></div>

- ViewModel: [라이브러리 안드로이드 뷰모델 참조](https://developer.android.com/reference/kotlin/androidx/lifecycle/ViewModel)
- Kotlin 코루틴: [코루틴 개요 코틀린 문서](https://kotlinlang.org/docs/coroutines-overview.html)
- Kotlin Flow: [코틀린 Flow 문서](https://kotlinlang.org/docs/flow.html)
- DI (의존성 주입): [의존성 주입 안드로이드 교육](https://developer.android.com/training/dependency-injection)

하지만 저자로서 제 생각으로는 코드를 즉시 이해하지 못해도 전혀 괜찮습니다. 코드를 그대로 복사하여 붙여넣고 '세부 정보를 모르겠지만 작동했다!' 라고 생각하는 지점에 도달하는 것도 중요한 단계입니다.

기본을 이해하는 것은 필수적이지만, 코드의 의미가 처음에 분명하지 않더라도 진행하는 것은 괜찮습니다. 완전한 이해 없이 전진하는 것은 학습 과정의 중요한 부분일 수 있습니다.

# ☛ 앱의 UI 확인

<div class="content-ad"></div>

이번에는 사용자가 사용자 이름을 입력하고 SAVE 버튼을 탭하면 해당 사용자 이름이 기기에 영구적으로 저장되고 저장된 사용자 이름이 표시되는 앱을 만들고 싶어요.

완성된 앱은 아래 이미지처럼 보일 거예요.

![Image](/assets/img/2024-07-01-PersistentDataStorageUsingDataStorePreferencesinJetpackCompose_1.png)

완료되면 "SAVE" 버튼을 탭한 후에도 앱을 닫아도 사용자 이름이 계속 저장되어 있어야 합니다. 그러나 "SAVE" 버튼을 탭했을 때 아무런 작업도 수행되지 않도록 해야 합니다.

<div class="content-ad"></div>

사용자 이름이 표시되는 부분은 "Hi, Name?"으로 일단 고정 값으로 설정해보겠습니다.

아래는 앱의 메인 화면(MainScreen.kt)에 대한 임시 코드입니다:

```kotlin
@Composable
fun MainScreen(
   modifier: Modifier = Modifier
) {

   var userInput by remember {
       mutableStateOf("")
   }

   Column(
       modifier = modifier.fillMaxSize(),
       verticalArrangement = Arrangement.Center,
       horizontalAlignment = Alignment.CenterHorizontally
   ) {
       Text(
           text = "Hi, Name?",
           style = MaterialTheme.typography.displaySmall,
           modifier = Modifier
               .padding(top = 32.dp)
       )
       TextField(
           value = userInput,
           onValueChange = { userInput = it },
           modifier = Modifier
               .padding(vertical = 32.dp)
       )
       Button(
           onClick = { /*TODO*/ }
       ) {
           Text(text = "SAVE")
       }
   }
}
```

현재 SAVE 버튼을 누르면 아무 일도 일어나지 않으며, 앱을 닫으면 입력한 사용자 이름 정보가 손실됩니다.

<div class="content-ad"></div>

# ☛ 1) Dependencies 설정하기

이제 우리가 완성품의 명확한 비전을 갖고 있다면, DataStore (Preferences)의 소개를 진행해 봅시다.

먼저, 의존성을 설정해야 합니다. 다음 의존성을 모듈 레벨의 build.gradle.kts 파일에 추가해주세요. (참고: ViewModel도 필요하므로 DataStore와 함께 나열되어 있습니다.)

```js
/* build.gradle.kts */
// ViewModel 추가
implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.7.0")

// DataStore preferences 추가
implementation("androidx.datastore:datastore-preferences:1.0.0")
```

<div class="content-ad"></div>

위의 코드에서는 이 글을 작성하는 시점에서 사용 가능한 최신 안정 버전을 지정했습니다. 그러나 구현할 때 사용 가능한 최신 안정 버전을 확인하고 지정하는 것이 좋습니다.

코드를 추가한 후 '지금 동기화'를 클릭하여 동기화하세요. 이 시점에서 특별히 어려운 점은 없어야 합니다.

# ☛ 2) UserRepository.kt 추가

이제 본격적으로 시작합니다. 이 부분에서는 DataStore(Preferences)를 사용하여 기기에 사용자 설정 정보(이 경우 사용자 이름)를 영구적으로 저장하는 논리를 작성할 겁니다.

<div class="content-ad"></div>

우선, 이 패키지와 파일이 UI가 아닌 데이터를 관리하는 것임을 명확히 하기 위해 "data"라는 이름의 패키지를 생성하세요.

com.example.projectname 패키지에서 마우스 오른쪽 버튼을 클릭하고 "새 패키지"를 선택한 후 "data"라고 입력하여 생성하세요.

![image](/assets/img/2024-07-01-PersistentDataStorageUsingDataStorePreferencesinJetpackCompose_2.png)

data 패키지를 생성한 후에 이 패키지 내부에 UserRepository란 이름의 Kotlin 파일을 만드세요. 만들 때 Class를 선택해주세요.

<div class="content-ad"></div>

<img src="/assets/img/2024-07-01-PersistentDataStorageUsingDataStorePreferencesinJetpackCompose_3.png" />

특정 패키지에 파일을 추가하는 프로세스는 이후 단계에서도 동일합니다.

지금은 생성된 UserRepository.kt 파일의 UserRepository 클래스에서 DataStore(Preferences)를 사용하는 로직을 작성할 예정입니다.

먼저 DataStore를 사용할 때는 애플리케이션의 최상위 컨텍스트를 사용해야 하므로, 생성자로 dataStore라는 DataStore 타입을 지정해줍니다.

<div class="content-ad"></div>


/* UserRepository.kt */
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences

class UserRepository(private val dataStore: DataStore<Preferences>) {
  
}


이렇게 하면 UserRepository 클래스 내에서 컨텍스트를 정의할 필요가 없고, UserRepository 클래스는 오직 DataStore에 대한 로직만을 처리할 수 있습니다.

DataStore(Preferences)에서 데이터는 키 및 값으로 관리되며, 여기서 다루는 값은 문자열인 사용자 이름입니다. 따라서 stringPreferencesKey()를 사용하여 다음과 같이 문자열 값이 포함된 키를 정의합니다:


/* UserRepository.kt */
import androidx.datastore.preferences.core.stringPreferencesKey

class UserRepository(private val dataStore: DataStore<Preferences>) {
    private companion object {
        val USER_NAME = stringPreferencesKey("user_name")
    }
}


<div class="content-ad"></div>

프라이빗 컴패니언 객체로 정의하면 각 Preferences 키를 클래스 내에서 한 번만 존재하는 정적 객체(싱글톤)로 관리할 수 있습니다. 사용자 이름만 관리하는 것은 쉽지만, 다른 설정을 토글하거나 관리해야 하는 경우처럼 여러 키를 관리해야 하는 경우에는 컴패니언 객체를 사용하는 것이 더욱 유리합니다.

다음으로, 장치에 저장된 문자열 타입 값에 대한 속성을 정의합니다. 이는 데이터 스토어를 생성자로 받은 데이터의 데이터를 map()으로 확장하고, 앞서 컴패니언 객체에서 정의한 키를 지정하여 달성할 수 있습니다.

```js
/* UserRepository.kt */
class UserRepository(private val dataStore: DataStore<Preferences>) {
   private companion object {
       val USER_NAME = stringPreferencesKey("user_name")
   }

   val currentUserName: Flow<String> =
       dataStore.data.map { preferences ->
           preferences[USER_NAME] ?: "Unknown"
       }
}
```

⚠️참고: 실제로는 데이터를 읽는 작업이 실패할 경우를 대비하여 에러를 처리하고 해당 코드를 포함해야 합니다. 그러나 코드를 간단하게 유지하기 위해 여기에서는 생략하였습니다.

<div class="content-ad"></div>

이제 이 설정으로 데이터를 읽을 수만 있기 때문에, 데이터를 저장하거나 업데이트하는 메소드를 추가해 봅시다. edit()를 사용하여 전달된 문자열을 저장하는 메소드를 추가해 보세요.

```js
/* UserRepository.kt */
class UserRepository(private val dataStore: DataStore<Preferences>) {
   private companion object {
       val USER_NAME = stringPreferencesKey("user_name")
   }

   val currentUserName: Flow<String> =
       dataStore.data.map { preferences ->
           preferences[USER_NAME] ?: "알 수 없음"
       }

   suspend fun saveUserName(userName: String) {
       dataStore.edit { preferences ->
           preferences[USER_NAME] = userName
       }
   }
}
```

이로써 DataStore (Preferences)를 사용하기 위한 세 가지 필수 구성 요소가 완성되었습니다:

- 문자열을 값으로 가지는 키를 설정하는 것
- 값을 읽을 수 있는 프로퍼티
- 값을 저장할 수 있는 메소드

<div class="content-ad"></div>

UserRepository.kt 파일의 코드 작성이 완료되었습니다.

하지만 우리는 아직 데이터 저장소를 생성자로 받을 준비를 하지 않았기 때문에 아직 작동하지 않을 것입니다. 다음 단계에서는 애플리케이션 컨텍스트를 사용할 준비를 하겠습니다.

# ☛ 3) MyApplication 클래스 추가 및 설정

이 단계에서는 UserRepository에서 사용할 애플리케이션 컨텍스트를 구성할 것입니다.

<div class="content-ad"></div>

먼저, com.example.projectname 패키지 내에 MyApplication.kt라는 파일을 만들어주세요 (클래스로 지정).

그런 다음, MyApplication.kt 파일의 MyApplication 클래스 바깥에서 dataStore를 Context 확장 속성으로 정의하고 특정 DataStore 인스턴스에 위임해주세요.

```js
/* MyApplication.kt */
private val Context.dataStore: DataStore<Preferences> by preferencesDataStore(
   name = "setting"
)
class MyApplication {
}
```

이를 통해 어플리케이션의 모든 부분이 동일한 Context를 통해 DataStore에 액세스할 수 있게 되어 데이터 일관성을 보장하고 코드 재사용성을 향상시킬 수 있습니다.

<div class="content-ad"></div>

```js
/* MyApplication.kt */
private val Context.dataStore: DataStore<Preferences> by preferencesDataStore(
  name = "setting"
)
class MyApplication: Application() {
  lateinit var userRepository: UserRepository
  override fun onCreate() {
    super.onCreate()
    userRepository = UserRepository(dataStore)
  }
}
```

userRepository은 이전 단계에서 생성된 UserRepository 클래스를 상속받지만, 당연히 여기에서 초기화할 수 없습니다(데이터 스토어인 생성자를 지정할 수 없기 때문). 따라서 애플리케이션이 초기화될 때 이전에 정의한 Context.dataStore가 UserRepository 클래스로 전달되어야 합니다.

이 과정은 애플리케이션 전체에서 일관된 데이터 저장 메커니즘을 제공하여 UserRepository 클래스가 이 데이터 스토어를 사용하여 사용자 설정 및 정보를 관리할 수 있도록 합니다. 결과적으로 데이터 저장, 검색 및 업데이트가 애플리케이션 내의 어디에서든 쉽게 액세스할 수 있습니다.

<div class="content-ad"></div>

이 단계의 마지막에 AndroidManifest.xml 파일의 애플리케이션 태그에 android:name을 다음과 같이 추가하는 것을 잊지 마세요:

```js
<!-- AndroidManifest.xml -->
<application
   android:name=".MyApplication">
```

이 사양을 따르면 MyApplication 클래스에 정의된 종속성이 MainActivity가 시작되기 전에 초기화됩니다.

MyApplication 클래스와 관련된 코딩 및 설정이 이제 완료되었지만, 코드의 역할과 의미가 간결함 때문에 이해하기 어려울 수 있다는 것을 이해합니다.

<div class="content-ad"></div>

이 단계에서는 "DataStore(Preferences)와 애플리케이션 컨텍스트(전체 앱을 통틀어 말하는 맥락)를 사용할 수 있게 해준다"는 넓은 이해를 바탕으로 시작하는 것이 좋아요.

# ☛ 4) ViewModel 추가 및 구성하기

이전 단계에서 DataStore(Preferences)를 사용할 준비가 되었지만, 현재 상태에서는 UI가 어떤 변경 사항도 반영하지 않을 것입니다. 이번 단계에서는 ViewModel을 사용하여 UI의 책임을 처리하여 앱을 완성에 더 가깝게 이끌 것입니다.

먼저, 샘플.com.프로젝트명 `ui` 패키지 내에 MyAppViewModel이라는 파일을 생성하세요.

<div class="content-ad"></div>

자연스럽게 MyAppViewModel 클래스는 응용 프로그램 컨텍스트에 따라 다르게 구성된 UserRepository 클래스의 속성 및 메서드를 활용할 것입니다. 따라서 MyAppViewModel 내에서 UserRepository를 직접 사용할 수 없습니다. 대신에 다음과 같이 생성자로 userRepository를 지정합니다:

```js
/* MyAppViewModel.kt */
import androidx.lifecycle.ViewModel
import com.example.datastoresample.data.UserRepository

class MyAppViewModel(
   private val userRepository: UserRepository
): ViewModel() {
  
}
```

이렇게 함으로써 UserRepository 클래스가 응용 프로그램 컨텍스트에 의존하고 있고, MyAppViewModel 클래스가 UserRepository 클래스에 의존하고 있는 관계를 설정했습니다. MyAppViewModel이 초기화될 때 UserRepository가 초기화되어야 하므로 ViewModel을 사용하기 어렵다고 걱정할 수도 있겠지만, 이 의존성 문제를 이번 단계의 끝에서 해결할 것입니다.

지금은 의존성 해결을 제외하고, 저장된 사용자 이름을 검색하는 속성을 정의하기 위해 시작하겠습니다. 그 전에, UI 상태를 관리하는 UiState라는 데이터 클래스를 MyAppViewModel 클래스 외부에 정의해보겠습니다.

<div class="content-ad"></div>

```js
/* MyAppViewModel.kt */
data class UiState (
   val userName: String
)

class MyAppViewModel(
   private val userRepository: UserRepository
): ViewModel() {
  
}
```

그리고 UiState 데이터 클래스를 사용하여 UserRepository 클래스에 정의된 currentUserName 속성에서 데이터를 비동기적으로 로드합니다.

```js
/* MyAppViewModel.kt */
class MyAppViewModel(
   private val userRepository: UserRepository
): ViewModel() {
   val uiState: StateFlow<UiState> =
       userRepository.currentUserName.map { userName ->
           UiState(userName)
       }.stateIn(
           scope = viewModelScope,
           started = SharingStarted.WhileSubscribed(5000),
           initialValue = UiState("Unknown")
       )
}
```

ViewModel의 UI 상태(UiState)는 StateFlow 형식으로 관리되어야 하므로, Flow 형식에서 StateFlow 형식으로 변환하고, .stateIn()을 사용하여 구독을 설정하고 초기 값이 설정되도록 합니다.

<div class="content-ad"></div>

SharingStarted.WhileSubscribed(5000)은 구독이 종료된 후 5초 동안 여전히 값이 방출되며, 구독을 취소한 후에도 잠시 동안 UI 구성 요소가 데이터 업데이트를 받을 수 있습니다. 값 구독을 최적화하기 위한 이 조정은 복잡해 보일 수 있지만, 이를 "값 구독을 최적화하는 설정"으로 생각할 수 있습니다.

그렇게 하면, 저장된 사용자 이름(문자열) 정보를 UI 상태 관리를 위한 값으로 읽을 준비가 되었습니다. 그 다음으로, 값을 저장하거나 업데이트하는 메서드를 추가해 봅시다. 이는 UserRepository 클래스에서 정의된 것과 비슷한 방식으로 구현할 수 있습니다.

```kotlin
/* MyAppViewModel.kt */
fun saveUserName(userName: String) {
    viewModelScope.launch {
        userRepository.saveUserName(userName)
    }
}
```

UserRepository 클래스에서 정의된 saveUserName() 메서드는 suspend fun으로 정의되어 있기 때문에 coroutine scope 내에서 호출되어야 합니다.

<div class="content-ad"></div>

이제 우리는 값을 읽고 저장(업데이트)할 수 있게 되었는데, 남은 문제는 MyViewModel이 UserRepository에 의존하고 UserRepository가 애플리케이션 컨텍스트에 의존하는 문제입니다. 이를 해결해 봅시다.

다음과 같이 MyViewModel 클래스에 companion object를 정의하세요:

```js
/* MyAppViewModel.kt */
companion object {
   val Factory: ViewModelProvider.Factory = viewModelFactory {
       initializer {
           val application = (this[APPLICATION_KEY] as MyApplication)
           MyAppViewModel(application.userRepository)
       }
   }
}
```

이전 코드와 비교했을 때, 처음에는 더욱 불분명해 보일 수 있습니다. 그러나 이 코드의 목적은 MyAppViewModel의 인스턴스를 생성할 때 애플리케이션 컨텍스트로부터 필요한 종속성(이 경우 userRepository)을 주입하는 것입니다. 이를 통해 ViewModel을 테스트하고 재사용하기 쉬워지며 종속성을 명시적으로 관리할 수 있도록 합니다.

<div class="content-ad"></div>

본질적으로, 이 사용자 정의는 ViewModel (MyAppViewModel)을 초기화할 때 발생하여 MyAppViewModel이 UserRepository에 의존하는 문제를 해결합니다.

마지막 단계는 초기에 제시된 MainScreen.kt를 수정하여 버튼을 탭할 때 데이터(사용자 이름)를 영구적으로 저장하고 저장된 데이터를 문자열로 표시하여 앱을 완성하는 것입니다.

# ☛ 5) 뷰 업데이트

지금까지의 단계에서 DataStore (Preferences)를 사용하여 지속적인 데이터 저장 및 검색을 준비했으며 ViewModel을 사용하여 UI를 관리했습니다. 이제 MainScreen.kt를 업데이트하여 ViewModel을 통해 저장된 데이터가 UI에 반영되도록 할 것입니다.

<div class="content-ad"></div>

먼저, 다음과 같이 MainScreen()에 MyAppViewModel을 매개변수로 지정하세요.

```js
/* MainScreen.kt */
@Composable
fun MainScreen(
   modifier: Modifier = Modifier,
   myAppViewModel: MyAppViewModel = viewModel(factory = MyAppViewModel.Factory)
) { … }
```

MyAppViewModel에서 정의된 Factory를 factory 매개변수에 전달함으로써, 이 MyAppViewModel의 초기화는 이전 챕터에서 설정한 사용자 지정 초기화 설정이 적용됩니다.

다음으로 UI 상태(이 경우 저장된 사용자 이름)를 정의하려면 MainScreen 함수 내에서 savedUserName을 다음과 같이 정의하세요:

<div class="content-ad"></div>

```kotlin
/* MainScreen.kt */
val savedUserName by myAppViewModel.uiState.collectAsState()

Text(
   text = "안녕하세요, ${savedUserName.userName}님",
   style = MaterialTheme.typography.displaySmall,
   modifier = Modifier
       .padding(top = 32.dp)
)
```

마지막으로, TextField에 입력된 문자열이 버튼을 클릭했을 때 저장되도록 하려면, onclick 매개변수에 전달할 함수를 설정하면 됩니다. 이렇게 하면 끝이죠.

```kotlin
/* MainScreen.kt */
Button(
   onClick = { myAppViewModel.saveUserName(userInput) }
) {
   Text(text = "저장")
}
```

앱을 빌드하고 사용자 이름을 입력한 후 SAVE 버튼을 탭한 다음, 앱을 완전히 종료하고 다시 엽니다.


<div class="content-ad"></div>

아래 저장된 데이터가 앱을 종료한 후에도 지워지지 않고 유지되는 것을 확인할 수 있습니다.

잘 했어요! 이렇게 하면 DataStore (Preferences)의 기본 구현이 완료됩니다.

<div class="content-ad"></div>

# ☛ 마무리로

개발 초보자들이 필요한 코드를 외우기에 집중하는 경향이 있다는 것을 알았어요. 하지만, 중요한 것은 코드를 외우는 것이 아니에요. 시험이 아니기 때문에, 과거에 작성한 코드를 잊어버렸을 때는 열심히 다시 작성하기보다는 그냥 복사해서 붙여넣는 것이 괜찮아요.

실제로, 무언가를 구현할 때마다 코드를 처음부터 쓰는 대신, 한 번 작성한 코드를 템플릿으로 관리하는 것이 더 효율적하다고 생각해요. Git이나 클라우드 서비스를 사용해서 작성한 코드를 손쉽게 재사용할 수 있게 만들어두면 좋아요.

하지만, 코드를 복사하고 붙여넣을 때도 그 코드가 무엇을 의미하는지와 어떤 역할을 하는지 이해하는 것이 중요해요.

<div class="content-ad"></div>

"I'm happy to help you out! However, I might not fully understand the requested change. It's important to avoid blindly copying and pasting code; instead, try to understand its purpose to improve your coding skills. Here is the code snippet in Markdown format:


```js
<aside>
 <p>
   Thank you for reading!<br>
   If you enjoyed this post, <br>
   I'd appreciate claps. 😄
 </p>
</aside>
```