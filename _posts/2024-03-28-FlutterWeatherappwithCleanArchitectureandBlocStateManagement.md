---
title: "플러터로 날씨앱 만들기상태관리 Bloc"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Flutter Weather app with Clean Architecture and Bloc State Management"
link: "https://medium.com/@khalidmeftu/flutter-weather-app-with-clean-architecture-and-bloc-state-management-6a6af439b7df"
isUpdated: true
---





<img src="/assets/img/FlutterWeatherappwithCleanArchitectureandBlocStateManagement_0.png" />

이 앱은 HeyFlutter.com에서 열린 플러터 앱 디자인 대회를 기반으로 합니다. 중간에 바쁘더라도 시작하고 완료하였으니 이것이 개발자들이 참고할 수 있도록 도움이 될 것이라 생각합니다. 블록 상태 관리, 깨끗한 아키텍처 및 최상의 실천 방법에 대해 알고 있다고 가정합니다. (참고: Git에서 얻는 코드는 더 최적화될 수 있습니다.)

그래서 디자인을 보고 세 가지 로직을 추가했습니다.

- 날씨 API 응답 가져오기.
- 도시 이미지 가져오고 저장하기.
- 주간 예보 정보 가져오기.

<div class="content-ad"></div>

이 날씨 API 앱 개발에서는 OpenWeather API를 사용했어요. 충분하지만 제한이 있지만 테스트에는 문제가 없어요. 두 번째 문제는 어려웠지만 정보를 찾아보니 unsplash가 도시 이미지를 제공하고, 이를 통해 도시 이미지를 얻어 로컬 데이터베이스에 URL을 저장할 수 있답니다. 주간 예보를 위해 인구를 위한 가짜 데이터를 만들었어요. 시작하기 전에 Bloc 상태 관리, 의존성 주입, 그리고 깔끔한 아키텍처에 대한 일부 힌트를 고려할 수 있어요. 프로젝트 링크는 아래에 첨부되어 있으며, 프로젝트를 좋아하시면 재밌게 보았다면 박수를 치고 제 팔로우 부탁드려요.

여기서는 프로젝트의 주요 구성 요소에 대해 이야기할 거예요. 맨 처음 문제는 사용자 위치를 얻고 사용자 도시를 OpenWeather API에 전송하고 해당 응답을 가져오는 것이에요. 먼저 openweather에 계정을 만들고 사용자 위치를 얻기 위해 GeoLocator와 Geocoding 플러터 라이브러리를 사용했어요. 그 외에도 connectivity check, dependency injection, dartz 등의 기타 라이브러리가 있어요.

```yaml
dependencies:
  flutter:
    sdk: flutter

  cupertino_icons: ^1.0.2
  flutter_screenutil:
  dio:
  either_dart:
  flutter_svg_provider:
  get_it:
  connectivity_plus:
  flutter_bloc:
  equatable:
  geolocator:
  geocoding:
  lottie:
  weather_icons:
  glassmorphism_ui:
  path_provider:
  sembast:
  intl:
  shared_preferences:
  permission_handler:
  home_widget:
  localization:
  shimmer:
  fluttertoast:
```

이 디자인에서는 홈 페이지와 저장된 도시 목록 두 개의 화면이 있어요. 홈 페이지에서 저장된 목록에서 왔는지 확인해야 해요.

<div class="content-ad"></div>

날씨 앱 서비스 클래스에 API 키를 추가하세요.

```js
class WeatherAppServices{
  static const String apiKey="";
  static const String baseURL="https://api.openweathermap.org/data/2.5/weather";
  static const String unSplashBaseURL="https://api.unsplash.com/search/photos";
  static const String unSplashApiKey ="";
  /// 아이콘 데이터 URL
  static const String iconURL="https://openweathermap.org/img/wn/";
  static const String iconSize="@2x.png";
}
```

```js
class WeatherAppHomePage extends StatefulWidget {
/// 사용자가 저장된 페이지를 찾아서 다시 오는 경우, saved pages에서 오는 경우 이 값은 true일 수 있습니다.
  bool? showDataFromSavedCities;
/// 사용자가 저장된 페이지를 찾아서 다시 오는 경우, saved pages에서 오는 경우 이 값은 true일 수 있습니다.
  WeatherModel? cityModel;

  WeatherAppHomePage({super.key, this.showDataFromSavedCities, this.cityModel});
```

이제 사용자는 위치 허가를 활성화하라는 요청을 받을 것입니다. 앱을 나가고 다시 돌아와야 합니다. 허가가 허용되면 어떻게 위치에 액세스되고 사용자 도시를 가져올지 묻게 됩니다. Widgets Binding을 사용할 것이며 여기서 구현이 있습니다.

<div class="content-ad"></div>

```js
class _WeatherAppHomePageState extends State<WeatherAppHomePage>
    with WidgetsBindingObserver,
```

우리의 클래스는 앱의 상태를 감시할 것이기 때문에 멈춤, 재개와 같은 강력한 미래와 사용자 활동을 함께 사용할 것입니다.

```js
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    // 사용자가 저장된 도시에서 온 경우 위치 서비스를 초기화하고 싶지 않습니다. 이미 일부 데이터가 있기 때문입니다
    if (widget.showDataFromSavedCities == false) {
      initLocationService();
    } else {
      /// 테스트용
      if (kDebugMode) {
        print("도시 이미지");
        print(widget.cityModel?.cityImageURL);
      }
    }
  }

  @override
  void dispose() {
// 관찰자 해제
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }
```

그래서 사용자가 홈 페이지에 접속할 때 위치 서비스가 비활성화되어 있으면 위치 서비스를 활성화하도록 유도됩니다.

<div class="content-ad"></div>

<img src="/assets/img/FlutterWeatherappwithCleanArchitectureandBlocStateManagement_1.png" />

<img src="/assets/img/FlutterWeatherappwithCleanArchitectureandBlocStateManagement_2.png" />

앱을 나가면 앱 상태가 일시 중지되고 사용자가 위치 서비스를 활성화하고 앱으로 돌아오면 상태가 다시 시작됩니다. 사용자가 허용하고 돌아오면 onResume 바인딩 관찰자를 호출합니다.

```js
  @override
  Future<void> didChangeAppLifecycleState(AppLifecycleState state) async {
    super.didChangeAppLifecycleState(state);
    if (state == AppLifecycleState.resumed) {
      if (!isLocationServiceInitialized) {
        LocationPermission permission = await Geolocator.checkPermission();
        if (permission != LocationPermission.denied) {
          await initLocationService();
          isLocationServiceInitialized = true;
        } else {
/// 이것은 특히 처음으로 사용자가 앱을 시작할 때 도움이 됩니다. 사용자가 앱을 사용하거나 무엇인가를 할 때 이 서비스를 사용해야 한다는 것을 보여주는 데 도움이 됩니다.
          await initLocationService();
        }
      }
    }
  }

/// initLocation service를 사용하여 대화 상자를 보여주거나 위치 권한을 처리합니다.
  Future<void> initLocationService() async {
    if (!await Geolocator.isLocationServiceEnabled()) {
      await showLocationServiceDialog();
    } else {
      dismissPermissionDialog();
      await handleLocationPermission();
    }
  }

  Future<void> showLocationServiceDialog() async {
    /// mounted는 위젯 트리에 존재하는지를 의미합니다.
    /// 그렇지 않으면 비동기 갭에서 알림을 표시할 수 없으므로 먼저 확인해야 합니다.
    if (!mounted) return;

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text(WeatherAppString.locationDisabled),
          content: Text(WeatherAppString.pleaseEnableLocation),
          actions: <Widget>[
            TextButton(
              onPressed: () async {
                await Geolocator.openLocationSettings();
                if (mounted) {
                  Navigator.of(context).pop();
                }
              },
              child: Text(WeatherAppString.openSettings),
            ),
          ],
        );
      },
    );
  }

  Future<void> handleLocationPermission() async {
    LocationPermission permission = await Geolocator.checkPermission();
    switch (permission) {
      case LocationPermission.denied:
        permission = await Geolocator.requestPermission();
        if (permission == LocationPermission.denied) {
          if (mounted) permissionDialog(context);
          return;
        } else if (permission == LocationPermission.deniedForever) {
/// 사용자를 설정 페이지로 자동으로 보내서 권한을 활성화합니다.
          if (mounted) {
            await openAppSettings();
          }
          return;
        }
        break;
      case LocationPermission.deniedForever:
        if (mounted) {
          await openAppSettings();
        }

        return;
      default:
        break;
    }
    await getPosition();
  }

  Future<void> getPosition() async {
    try {
      await getUserPosition();
    } catch (e) {
/// 어떤 예외가 발생할 수도 있습니다.
      if (mounted) permissionDialog(context);
    }
  }


  Future<void> getUserPosition() async {
    if (isGettingUserPosition) {
      return;
    }

    isGettingUserPosition = true;
    try {
      if (!await Geolocator.isLocationServiceEnabled()) return;

      LocationPermission permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied) return;

/// 사용자 위치 가져오기
      Position position = await Geolocator.getCurrentPosition(
          desiredAccuracy: LocationAccuracy.best);
      List<Placemark> locationPlaceMark =
          await placemarkFromCoordinates(position.latitude, position.longitude);
      Placemark place = locationPlaceMark[0];

      if (!mounted) {
      } else {
/// 이 if 문은 단지 여기에 도달하기 전에 if 루프가 우리를 보호하기 때문에 강제하지만 필요합니다.
        if (widget.showDataFromSavedCities == false) {
/// 우리는 도시 이름을 이벤트에 전달하여 도시의 날씨 상태를 얻을 수 있도록 합니다 from call place.locality는 도시 이름입니다.
          final weatherCityBloc = BlocProvider.of<HomeControllerBloc>(context);
          weatherCityBloc.add(GetCurrentCityWeatherInfo(place.locality!));
        }
      }
    } finally {
      isGettingUserPosition = false;
    }
  }

  void permissionDialog(BuildContext context) {
    showDialog(
      context: context,
      barrierDismissible: true,
      builder: (BuildContext context) {
        return AlertDialog(
          key: _permissionDialogKey,
          title: Text(WeatherAppString.locationServicesDisabled),
          content: Text(WeatherAppString.locationEnable),
          actions: <Widget>[
            MaterialButton(
              onPressed: () {
/// pop은 대화 상자를 제거합니다.
                Navigator.of(context).pop();
                getPosition();
              },
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  GestureDetector(
                    onTap: () {
                      Navigator.of(context).pop();
                    },
                    child: Text(WeatherAppString.okay),
                  ),
                  GestureDetector(
                    onTap: () {
/// 사용자가 설정으로 이동하여 권한을 활성화하고자하지 않는 경우 종료합니다.
                      exit(0);
                    },
                    child: Text(WeatherAppString.cancel),
                  },
                ],
              ),
            )
          ],
        );
      },
    );
  }
```

<div class="content-ad"></div>

다른 도전 과제는 사용자가 위치 권한을 부여하기 위해 이동한 후에 권한 다이얼로그를 제거하는 것입니다. 이것이 중요한 부분이에요. 여기서 나는 "키"의 개념을 사용하여 성공적으로 제거했어요. 다이얼로그를 제거하지 않으면 계속해서 팝업될 겁니다.

```js
 void dismissPermissionDialog() {
    if (_permissionDialogKey.currentState != null &&
        _permissionDialogKey.currentContext != null) {
      Navigator.of(_permissionDialogKey.currentContext!).pop();
    }
  }
```

그래서 다른 선택지는 다음 네 날짜를 가져오는 것이에요. 예를 들어, 오늘이 목요일이면 금요일, 토요일, 일요일, 월요일을 가져와야 해요. 다음 네 날짜를 가져오기 위해 다음 메서드를 사용했어요.

```js
  /// 다음 네 날짜 가져오기
  /// 이 함수는 다음 네 날짜에 대한 문자열 목록을 반환합니다. 모킹 용도로만 사용되요
  /// 무료로 API가 작동했다면 해당 날짜들을 제공했을 텐데 한번 해봐요

  static List<String> getNextFourDays() {
    List<String> daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

    DateTime currentDate = DateTime.now();
    int todayIndex = currentDate.weekday % 7;

    List<String> nextDays = [];
    for (int i = 1; i <= 4; i++) {
      DateTime nextDate = currentDate.add(Duration(days: i));
      String day = daysOfWeek[nextDate.weekday % 7];
      String dayWithNumber = '$day ${nextDate.day}';
      nextDays.add(dayWithNumber);
    }

    return nextDays;
  }


/// 그런 다음 아래 블록을 사용하여 자산 파일에서 모킹 응답을 가져올 수 있어요
   final forecastBloc = BlocProvider.of<GetDailyForecastBloc>(context);
    forecastBloc.add(GetDailyForCast());
```

<div class="content-ad"></div>

이것은 내 모의 JSON 데이터입니다.

```js
{
    "daily": [
        {
            "summary": "일부 구름이 있는 하루가 기대됩니다",
            "temp": {
                "day": 17,
                "min": 8,
                "max": 17.5
            },
            "pressure": 1016,
            "humidity": 59,
            "dew_point": 290.48,
            "wind_speed": 3.98,
            "wind_deg": 76,
            "wind_gust": 8.92,
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "가벼운 비",
                    "icon": "10d"
                }
            ]
        },
        {
            "summary": "맑은 날이 기대됩니다",
            "temp": {
                "day": 23,
                "min": 20,
                "max": 22
            },
            "pressure": 1016,
            "humidity": 59,
            "dew_point": 290.48,
            "wind_speed": 2,
            "wind_deg": 76,
            "wind_gust": 8.92,
            "weather": [
                {
                    "id": 500,
                    "main": "맑음",
                    "description": "가벼운 비",
                    "icon": "01d"
                }
            ]
        },
        {
            "summary": "구름이 적은 날이 기대됩니다",
            "temp": {
                "day": 19,
                "min": 15,
                "max": 19
            },
            "pressure": 1016,
            "humidity": 59,
            "dew_point": 290.48,
            "wind_speed": 2.98,
            "wind_deg": 76,
            "wind_gust": 8.92,
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "가벼운 비",
                    "icon": "02d"
                }
            ]
        },
        {
            "summary": "비가 기대되는 날입니다",
            "temp": {
                "day": 10,
                "min": 5,
                "max": 11
            },
            "pressure": 1016,
            "humidity": 59,
            "dew_point": 290.48,
            "wind_speed": 3.98,
            "wind_deg": 76,
            "wind_gust": 8.92,
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "가벼운 비",
                    "icon": "10d"
                }
            ]
        }
    ],
    "comments": [
        "다가오는 날씨 예보가 지원되지 않는 유로피아 입니다.",
        "따라서 4일의 예보만 제공됩니다."
    ]
}
```

위의 샘플 코드를 통해 홈 위젯의 주요 기능을 이해하는 데 도움이 될 것입니다.

날씨 아이콘은 어떻게 표시했나요? API는 아이콘을 표시하는 데 지원을 제공하지만 우리에게 다른 URL을 사용하여 보여줍니다. 따라서 유틸 클래스에서 간단하게 아이콘을 반환하기 위해 다음과 같이 사용했습니다.

<div class="content-ad"></div>

아이콘 데이터를 가져오는 함수를 만들어볼게요. 날씨 코드에 따라 다른 아이콘을 반환합니다.

```js
class CitiesList extends StatelessWidget {
/// 가끔 도시를 찾을 수 없을 때가 있습니다. 매우 지역적인 도시의 경우도 그렇죠.
/// 홈 페이지에서 왔을 때 여기에 있는 이유를 명확히 해야 합니다. 사용자에게 도시를 놓치셨나요?
/// 아니면 다른 도시를 확인하러 왔나요?
  final bool isCurrentCityNotFound;

  const CitiesList({super.key, required this.isCurrentCityNotFound});

  @override
  Widget build(BuildContext context) {
/// 이 블록은 로컬 데이터베이스(HIVE)에서 저장된 도시의 날씨를 로드하는 데 책임이 있습니다.
    final userCityBloc = BlocProvider.of<UserCityControllerBloc>(context);
    userCityBloc.add(const FetchSavedCitiesData());
    return UserCities(isCurrentCityNotFound: isCurrentCityNotFound);
  }
}


  TextEditingController saveNewCityTextController = TextEditingController();
/// 도시 날씨 모델을 가져와서 데이터를 반복하고 채워 넣을 수 있도록 도와줄 겁니다.
  List<WeatherModel> cityNamesData = [];
  bool isSyncing = false;

  @override
  void dispose() {
/// 컨트롤러를 반드시 dispose 해야 합니다.
    saveNewCityTextController.dispose();
    super.dispose();
  }

/// 동기화 블록
                IconButton(
                icon: Icon(
                  Icons.sync,
                  color: WeatherAppColor.whiteColor,
                  size: 30,
                ),
                onPressed: () {
                /// 목록이 비어 있지 않은지 확인하세요(비어 있으면 동기화하지 마세요).
                /// 그렇지 않으면 동기화를 방지하기 위해 연결 블록을 사용하세요.
                 /// 당신에게 할 일입니다.
                  if (cityNamesData.isNotEmpty) {
                    final syncBloc = BlocProvider.of<SyncDatabaseBloc>(context);
                    syncBloc.add(SyncMyData(cityNamesData));
                  }
                },
              ),
               if (state is UserCityLoaded) {
                 /// 도시가 로드되었으며 사용자가 현재 도시를 가지고 있는지 확인해야 합니다.
                /// 맨 위에 언급한 대로 도시가 발견되지 않으면 첫 번째 요소를 사용자 도시로 사용하고
                /// 홈 위젯을 업데이트하세요.
                  if (isSyncing) {
                    final currentCityWeatherModel = state.usermodel.firstWhere(
                      (element) => element.isCurrentCity == true,
                      orElse: () => state.usermodel.first,
                    );

                    AppUtils.updateHomeScreenWidget(currentCityWeatherModel);
                  }
```

<div class="content-ad"></div>

홈 위젯을 읽으셨나요? 읽으셨다면, 어떻게 구현하는지 이곳에서 확인해보세요. 그러나 이 부분은 조금 고급 기능으로, 실시간 인터넷에서 날씨 아이콘을 불러오는 것을 지원합니다. 이것은 플러터에서 처음으로 구현된 기능이에요.

사용자는 새로운 도시 날씨를 발견하기 위해 추가해야 합니다. 사용자가 저장 버튼을 누르면, 우리의 블록은 성공 또는 실패를 발행합니다.

```js
listener: (context, listenerState) {

                if (listenerState is CityWeatherLoaded) {
/// 사용자의 도시 날씨가 API에서 로드되어 로컬 데이터베이스에 저장됩니다.
                  saveNewCityTextController.clear();
                  WeatherModel newModel = listenerState.usermodel;
                  newModel.cityImageURL = listenerState.usermodel.cityImageURL;
                  newModel.isCurrentCity = false;
                  AppUtils.saveUserCity(newModel, context);
                }
                if (listenerState is UserCityFetchingError) {
/// 사용자의 도시 날씨를 찾을 수 없을 때, 데이터베이스에서 저장된 데이터를 가져와서 토스트로 표시합니다.
                  saveNewCityTextController.clear();
                  AppUtils.showToastMessage(
                      WeatherAppString.noWeatherInfo, Toast.LENGTH_SHORT);
                  final userCityBloc =
                      BlocProvider.of<UserCityControllerBloc>(context);
                  userCityBloc.add(const FetchSavedCitiesData());
                }
              },
            ),
```

![이미지](/assets/img/FlutterWeatherappwithCleanArchitectureandBlocStateManagement_3.png)

<div class="content-ad"></div>
