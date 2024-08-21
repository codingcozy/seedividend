---
title: "Flutter에서 Raw PCM 오디오 데이터를 처리하여 재생하는 방법"
description: ""
coverImage: "/assets/img/2024-08-13-PlayingAudiobyProcessingRawPCMAudioDatainFlutterPracticalGuideandBestAudioPackages_0.png"
date: 2024-08-13 12:12
ogImage:
  url: /assets/img/2024-08-13-PlayingAudiobyProcessingRawPCMAudioDatainFlutterPracticalGuideandBestAudioPackages_0.png
tag: Tech
originalTitle: "Playing Audio by Processing Raw PCM Audio Data in Flutter Practical Guide and Best Audio Packages"
link: "https://medium.com/@utkuaydogdu01/playing-audio-by-processing-raw-pcm-audio-data-in-flutter-practical-guide-and-best-audio-packages-455dedcd129e"
isUpdated: true
updatedAt: 1723864045966
---

모바일 애플리케이션 개발의 세계는 혁신적인 기술이 매일 빠르게 발전하고 있습니다. 이 발전의 중요한 부분 중 하나는 오디오 처리 분야에 있습니다. 플러터(Flutter)와 같은 현대적인 SDK를 사용하면 오디오 데이터의 처리와 재생이 더 쉽고 유연해지고 있습니다. 그러나 때로는 애플리케이션의 요구사항이 사전 처리된 또는 외부로부터 받은 오디오 데이터를 직접 재생해야 할 수도 있습니다. PCM(펄스 코드 변조) 형식의 오디오 데이터를 재생하는 것은 이러한 요구사항을 충족시키는 일반적인 방법입니다. 이 기사에서는 Flutter를 사용하여 PCM 오디오 데이터를 재생하고 애플리케이션이 더 많은 볼륨 제어를 제공할 수 있는 방법을 배워보겠습니다.

우리는 다양성을 위해 4가지의 Flutter 패키지를 사용하고 데이터 엔지니어링을 수행하여 PCM 형식의 오디오 데이터를 재생할 것입니다. 이 패키지들은 soundpool, flutter_sound, just_audio, audioplayers입니다. 이제 물론, 먼저 PCM이 무엇인지에 대해 간단히 이야기해 보겠습니다.

PCM (펄스 코드 변조)이란?

펄스 코드 변조(Pulse-code modulation, PCM)는 아날로그 신호를 디지털 미디어로 전송하는 방법입니다. PCM은 컴퓨터, 디지털 전화, 컴팩트 디스크 및 많은 다른 디지털 오디오 응용 프로그램에서 표준 형식입니다. PCM 스트림에서 아날로그 신호의 진폭이 일정 간격으로 샘플링되며 각 샘플은 주어진 디지털 범위 내에서 가장 가까운 값으로 양자화됩니다. 이를 통해 오디오 데이터가 디지털로 표현되고 손실 없이 사용될 수 있습니다.

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

![Figure](/assets/img/2024-08-13-PlayingAudiobyProcessingRawPCMAudioDatainFlutterPracticalGuideandBestAudioPackages_0.png)

이 그림은 사인파가 PCM으로 디지털 신호로 변환되는 과정을 보여줍니다. 사인파는 오디오와 아날로그 신호를 나타내는 데 사용됩니다. PCM은 사인파의 진폭을 일정 수의 이산화된 수준으로 나눈 펄스로 구성되어 있습니다. 이러한 이산화된 수준은 바이너리 숫자로 인코딩되어 디지털 신호를 나타내는 데 사용됩니다.

# Flutter에서 PCM 데이터 처리하기

간단히 PCM이 무엇인지에 대해 이야기한 후, Flutter에서 이 데이터를 어떻게 처리해야 하는지 살펴보겠습니다.

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

단계 1: PCM 데이터 획득

아래는 간소화된 형태로 외부 소스에서 가져온 원시 PCM 데이터의 예시입니다.

```js
List<int> PCM_RAW = [  9,  102,  9,  69,  9,  109,  9,  171,  9,  105,  9,  32,  9,  130,  9,  171,  9,  77,  9,  80,  9,  119,  9,  138,  9,  111,  9,  133,  9,  121,  9,  115,  9,
  134]
```

원시 소스로부터 디코딩된 PCM 데이터를 얻으면 List`int` 형식의 데이터 목록이 얻어집니다. 하지만, 이 데이터는 아직 어떤 오디오 플레이어에서도 처리하고 재생할 수준을 갖추고 있지 않습니다.

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

단계 2: Raw PCM 데이터를 재생 가능한 수준으로 변환

PCM 데이터를 재생 가능하게 만들려면 이를 Uint8List 데이터 유형으로 변환해야 합니다. 이는 사용하는 오디오 플레이어 패키지에서 바이트를 통해 오디오를 재생하기 위해 필요한 데이터 유형입니다. 이 데이터를 변환하는 데 필요한 함수의 여러 계층을 통해 이 데이터를 전달할 것입니다.

- 이러한 계층 중 첫 번째인 toHexList() 메서드는 이름 그대로 파라미터로 전송한 Raw PCM 데이터를 Hexes로 구성된 문자열 목록인 List`String` 데이터로 변환합니다(리스트 길이를 수정하지 않고):

```js
static List<String> toHexList(List<int> data) {
    List<String> hexList = [];
    for (var i = 0; i < data.length; i++) {
        var hex = data[i].toRadixString(16);
        if (hex.length == 1) {
            hex = "0$hex";
        }
        hexList.add(hex);
    }
    return hexList;
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

- 이 방법의 출력으로는, hex 목록의 데이터를 signed16 데이터로 변환하기 전에 hex 목록의 데이터를 결합해야 합니다. 즉, 목록 길이는 n에서 n/2로 줄어들어야 합니다. 아래의 mergeHexList() 메소드는 Hex 형식의 데이터를 가져와 이 데이터를 바이너리 그룹으로 병합합니다. 특정 형식의 PCM 데이터(예: 오디오 파일 생성)를 필요로 하는 작업에서는 데이터를 병합하는 것이 중요합니다. 이 메소드는 데이터를 적절한 형식으로 가져오게 됩니다:

```js
static List<String> mergeHexList(List<String> hexList) {
    List<String> mergedHexList = [];
    for (int i = 0; i < hexList.length; i += 2) {
      mergedHexList.add(hexList[i] + hexList[i + 1]);
    }
    return mergedHexList;
  }
```

- 이 목록은 hexListToBytes() 메소드를 호출하여 조작되며, 데이터를 결합하여 얻은 문자열 목록을 가공 가능한 오디오 데이터로 변환하는 데 사용됩니다. 이 메소드는 Hex 형식의 데이터를 가져와 각 항목을 정수 형식으로 변환하여 목록을 생성합니다. 이 메소드는 Hex 형식의 데이터를 숫자 데이터로 변환하고 해당 작업을 진행합니다. 이는 오디오 처리 알고리즘과 데이터 분석에서 자주 사용됩니다:

```js
static List<int> hexListToBytes(List<String> hexList) {
    List<int> bytes = [];
    for (var i = 0; i < hexList.length; i++) {
      bytes.add(int.parse(hexList[i], radix: 16).toSigned(16));
    }
    return bytes;
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

생의 PCM 데이터를 이러한 계층을 통해 전달한 후, 이전 방법에서 얻은 정수 목록을 Uint8List 형식으로 변환하는 것만 남았습니다.

- PCM 데이터는 일반적으로 정수 값들의 연속으로 표현되며, 오디오 재생 장치에서 직접 사용되지 않습니다. 따라서 적절한 방식으로 오디오 파일 형식에 구성되어야 합니다. PCM 데이터를 오디오 파일 형식으로 변환하고 필요한 헤더 정보를 추가하기 위해 다음과 같은 작업인 pcmToUin8List()가 수행됩니다:

```js
static Future<Uint8List> pcmToUint8List(
      List<int> data, int sampleRate) async {
    List<int> parsedData = hexListToBytes(mergeHexList(toHexList(data)));
    var channels = 1;
    int byteRate = ((16 * sampleRate * channels) / 8).round();
    var size = parsedData.length;
    var fileSize = size + 36;
    Uint8List header = Uint8List.fromList([
      // "RIFF"
      82, 73, 70, 70,
      fileSize & 0xff,
      (fileSize >> 8) & 0xff,
      (fileSize >> 16) & 0xff,
      (fileSize >> 24) & 0xff,
      // WAVE
      87, 65, 86, 69,
      // fmt
      102, 109, 116, 32,
      // fmt chunk size 16
      16, 0, 0, 0,
      // Type of format
      1, 0,
      // One channel
      channels, 0,
      // Sample rate
      sampleRate & 0xff,
      (sampleRate >> 8) & 0xff,
      (sampleRate >> 16) & 0xff,
      (sampleRate >> 24) & 0xff,
      // Byte rate
      byteRate & 0xff,
      (byteRate >> 8) & 0xff,
      (byteRate >> 16) & 0xff,
      (byteRate >> 24) & 0xff,
      // Uhm
      ((16 * channels) / 8).round(), 0,
      // bitsize
      16, 0,
      // "data"
      100, 97, 116, 97,
      size & 0xff,
      (size >> 8) & 0xff,
      (size >> 16) & 0xff,
      (size >> 24) & 0xff,
      // incoming data
      ...parsedData
    ]);
    return header;
  }
```

메서드 매개변수에서:

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

- 변수 data (List`int`)는 PCM 데이터의 목록입니다. 보통 각 샘플은 정수 값으로 표시됩니다.
- sampleRate (int) 변수는 샘플 속도, 즉 초당 샘플 수를 나타냅니다. 이는 오디오 파일이 재생되는 방식을 결정합니다.

오디오 파일의 헤더는 RIFF 형식의 편리한 바이트 배열로 생성됩니다. 이 헤더에는 오디오 파일의 재생 형식과 특성을 결정하는 중요한 정보가 포함되어 있습니다. 예를 들어 파일 크기, 샘플 속도, 채널 수 등의 정보가 이 헤더에 포함되어 있습니다. PCM 데이터를 이 헤더 정보와 결합하여 전체 오디오 파일을 나타내는 Uint8List 타입의 값이 얻어집니다. 이 프로세스를 통해 오디오 파일을 올바르게 해석하고 재생하기 위해 필요한 헤더 정보가 PCM 데이터와 결합됩니다.

이 단계의 기본적인 프로세스는 다음과 같습니다:

- Raw PCM 데이터 처리: 주어진 PCM 데이터는 이전 단계에서 언급된 toHexList, mergeHexList 및 hexListToBytes 메서드를 사용하여 처리됩니다. 이 프로세스를 통해 PCM 데이터가 16진수 형식에서 적합한 바이트 배열로 변환됩니다.
- 헤더 정보 생성: 오디오 파일의 헤더는 RIFF 형식의 편리한 바이트 배열로 생성됩니다. 이 헤더 정보는 오디오 파일이 재생되는 방식을 결정하는 정보가 포함되어 있습니다. 예를 들어 파일 크기, 샘플 속도, 채널 수 등의 정보가 포함되어 있습니다.
- 데이터 병합: 헤더 정보와 PCM 데이터가 결합되어 단일 Uint8List 타입의 값으로 형성됩니다. 이 작업은 전체 오디오 파일을 나타내는 바이트 배열을 얻기 위해 수행됩니다.
- 반환 값: 생성된 바이트 배열은 적절하게 구성된 오디오 파일을 나타냅니다. 이 값은 다양한 플랫폼에서 오디오 파일을 사용할 수 있도록 합니다.

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

따라서 이 단계는 원시 PCM 데이터를 적절한 방식으로 처리하여 오디오 파일 형식으로 구성된 데이터 구조를 생성합니다. 이를 통해 오디오 데이터를 다양한 응용 프로그램에서 활용할 수 있게 됩니다.

단계 2: 획득한 오디오 데이터 재생

시작에서 가지고 있는 원시 PCM 데이터를 재생 가능하게 만든 후, 휴대폰 애플리케이션에서 체험할 수 있는 가장 일반적으로 사용되는 오디오 패키지를 선택했습니다.

우선, 위에서 수행한 작업에 대한 별도의 클래스를 가지고 있는 것이 매우 좋을 것입니다. 이를 위해 아래에 BufferUtil 클래스를 생성해 봅시다:

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

```js
class BufferUtil {
  static List<String> toHexList(List<int> data) {
    List<String> hexList = [];
    for (var i = 0; i < data.length; i++) {
      var hex = data[i].toRadixString(16);
      if (hex.length == 1) {
        hex = "0$hex";
      }
      hexList.add(hex);
    }
    return hexList;
  }

  static List<String> mergeHexList(List<String> hexList) {
    List<String> mergedHexList = [];
    for (int i = 0; i < hexList.length; i += 2) {
      mergedHexList.add(hexList[i] + hexList[i + 1]);
    }
    return mergedHexList;
  }

  static List<int> hexListToBytes(List<String> hexList) {
    List<int> bytes = [];
    for (var i = 0; i < hexList.length; i++) {
      bytes.add(int.parse(hexList[i], radix: 16).toSigned(16));
    }
    return bytes;
  }

  static Future<Uint8List> pcmToUint8List(
      List<int> data, int sampleRate) async {
    List<int> parsedData = hexListToBytes(mergeHexList(toHexList(data)));

    var channels = 1;

    int byteRate = ((16 * sampleRate * channels) / 8).round();

    var size = parsedData.length;
    var fileSize = size + 36;

    Uint8List header = Uint8List.fromList([
      // "RIFF"
      82, 73, 70, 70,
      fileSize & 0xff,
      (fileSize >> 8) & 0xff,
      (fileSize >> 16) & 0xff,
      (fileSize >> 24) & 0xff,
      // WAVE
      87, 65, 86, 69,
      // fmt
      102, 109, 116, 32,
      // fmt chunk size 16
      16, 0, 0, 0,
      // Type of format
      1, 0,
      // One channel
      channels, 0,
      // Sample rate
      sampleRate & 0xff,
      (sampleRate >> 8) & 0xff,
      (sampleRate >> 16) & 0xff,
      (sampleRate >> 24) & 0xff,
      // Byte rate
      byteRate & 0xff,
      (byteRate >> 8) & 0xff,
      (byteRate >> 16) & 0xff,
      (byteRate >> 24) & 0xff,
      // Uhm
      ((16 * channels) / 8).round(), 0,
      // bitsize
      16, 0,
      // "data"
      100, 97, 116, 97,
      size & 0xff,
      (size >> 8) & 0xff,
      (size >> 16) & 0xff,
      (size >> 24) & 0xff,
      // incoming data
      ...parsedData
    ]);
    return header;
  }
}
```

그런 다음 데이터를 시뮬레이션하기 위한 샘플 PCM 데이터가 필요합니다. 샘플 데이터를 .json 파일에 저장하거나 정적 List`int`인 PCM_RAW 변수에 저장할 수 있습니다. 이 문서에서는 PCM_RAW라는 리스트에 정적으로 유지했습니다:

```js
List<int> PCM_RAW = [9,102,9, 69, 9,109,9,171,9,105,9,32,9,130,9,171,9,77,9,80,9,119,9,138,9,111,9,133,9,121,9,115,9,134]
```

이러한 작업을 수행한 후 뷰 섹션으로 이동할 수 있습니다. 위에서 언급한대로, 이 오디오 데이터를 재생하기 위해 4가지 다른 패키지를 사용했습니다. 이제 각 패키지의 UI 코드를 차례대로 검토해봅시다.

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

## 오디오플레이어 패키지:

패키지를 얻으려면 오디오플레이어의 pub.dev 페이지를 방문하세요.

```js
class _AudioplayersViewState extends State<AudioplayersView> {
  final player = AudioPlayer();
  late BytesSource source;
  bool loaded = false;

  Future<void> initPlayer() async {
    Uint8List uint8list = await BufferUtil.pcmToUint8List(PCM_RAW, 16000);
    //Source byteSource = BytesSource(uint8list);
    player.setSource(source);
    setState(() {
      loaded = true;
      source = BytesSource(uint8list);
    });
  }

  @override
  void initState() {
    super.initState();
    initPlayer();
  }

  @override
  Widget build(BuildContext context) {
    if (loaded) {
      return Scaffold(
        appBar: AppBar(
          backgroundColor: Theme.of(context).colorScheme.inversePrimary,
          title: const Text('PCM Player'),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              const Text(
                'PCM Player',
              ),
              ElevatedButton(
                onPressed: () {
                  player.play(source);
                },
                child: const Text('Play'),
              ),
            ],
          ),
        ),
      );
    } else {
      return const Scaffold(
        body: Center(
          child: CircularProgressIndicator(),
        ),
      );
    }
  }
}
```

## 플러터사운드 패키지:

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

플러터 사운드 패키지를 받으려면 플러터 사운드 pub.dev 페이지를 방문하세요.

```js
class FlutterSoundPlayerView extends StatefulWidget {
  const FlutterSoundPlayerView({super.key});

  @override
  State<FlutterSoundPlayerView> createState() => _FlutterSoundPlayerViewState();
}

class _FlutterSoundPlayerViewState extends State<FlutterSoundPlayerView> {
  FlutterSoundPlayer playerModule = FlutterSoundPlayer();

  StreamSubscription<PlaybackDisposition>? _playerSubscription;

  String positionText = '00:00:00';

  double sliderCurrentPosition = 0.0;
  double maxDuration = 1.0;

  Future<void> seekToPlayer(int milliSecs) async {
    //playerModule.logger.d('-->seekToPlayer');
    try {
      if (playerModule.isPlaying) {
        await playerModule.seekToPlayer(Duration(milliseconds: milliSecs));
      }
    } on Exception catch (err) {
      playerModule.logger.e('error: $err');
    }
    setState(() {});
    //playerModule.logger.d('<--seekToPlayer');
  }

  void _addListeners() {
    cancelPlayerSubscriptions();
    _playerSubscription = playerModule.onProgress!.listen((e) {
      maxDuration = e.duration.inMilliseconds.toDouble();
      if (maxDuration <= 0) maxDuration = 0.0;

      sliderCurrentPosition = e.position.inMilliseconds.toDouble();
      if (sliderCurrentPosition < 0.0) {
        sliderCurrentPosition = 0.0;
      }

      var date = DateTime.fromMillisecondsSinceEpoch(e.position.inMilliseconds,
          isUtc: true);
      var txt = date.toIso8601String().substring(11, 19);
      setState(() {
        positionText = txt.substring(0, 8);
      });
    });
  }

  void _startPlayer() async {
    List<int> rawData = PCM_RAW;
    Uint8List uint8 = await BufferUtil.pcmToUint8List(rawData, 16000);

    await playerModule.startPlayer(
      codec: Codec.pcm16,
      numChannels: 1,
      sampleRate: 16000,
      fromDataBuffer: uint8,
    );
  }

  Future<void> stopPlayer() async {
    try {
      await playerModule.stopPlayer();
      playerModule.logger.d('stopPlayer');
      if (_playerSubscription != null) {
        await _playerSubscription!.cancel();
        _playerSubscription = null;
      }
      sliderCurrentPosition = 0.0;
      positionText = '00:00:00';
    } on Exception catch (err) {
      playerModule.logger.d('error: $err');
    }
    setState(() {});
  }

  Future<void> _initializeExample() async {
    await playerModule.closePlayer();
    await playerModule.openPlayer().then((value) {
      setState(() {
        playerModule = value!;
      });
    });
    await playerModule.setSubscriptionDuration(const Duration(milliseconds: 1));
  }

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      await _initializeExample();
    });
  }

  @override
  void dispose() {
    super.dispose();
    cancelPlayerSubscriptions();
  }

  void cancelPlayerSubscriptions() {
    if (_playerSubscription != null) {
      _playerSubscription!.cancel();
      _playerSubscription = null;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: const Text('Flutter Sound Player'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              'Flutter Sound Player',
            ),
            ElevatedButton(
              onPressed: () async {
                _startPlayer();
              },
              child: const Text('Play'),
            ),
            Text(positionText),
            Container(
                height: 30.0,
                child: Slider(
                    value: min(sliderCurrentPosition, maxDuration),
                    min: 0.0,
                    max: maxDuration,
                    onChanged: (value) async {
                      await seekToPlayer(value.toInt());
                    },
                    divisions: maxDuration == 0.0 ? 1 : maxDuration.toInt())),
          ],
        ),
      ),
    );
  }
}
```

## just_audio 패키지에 대한 정보:

해당 패키지를 얻으려면 just_audio pub.dev 페이지를 방문하세요.

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

```js
class JustaudioView extends StatefulWidget {
  const JustaudioView({super.key});

  @override
  State<JustaudioView> createState() => _JustaudioViewState();
}

class _JustaudioViewState extends State<JustaudioView> {
  final player = AudioPlayer();
  bool loaded = false;

  Future<void> initPlayer() async {
    try {
      await player
          .setAudioSource(MyCustomSource(PCM_RAW))
          .timeout(const Duration(seconds: 2));
    } catch (e) {
      print(e);
    }
    setState(() {
      loaded = true;
    });
  }

  @override
  void initState() {
    super.initState();
    initPlayer();
  }

  @override
  Widget build(BuildContext context) {
    if (loaded) {
      return Scaffold(
        appBar: AppBar(
          backgroundColor: Theme.of(context).colorScheme.inversePrimary,
          title: const Text('PCM Player'),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              const Text(
                'PCM Player',
              ),
              ElevatedButton(
                onPressed: () {
                  player.play();
                },
                child: const Text('Play'),
              ),
            ],
          ),
        ),
      );
    } else {
      return const Scaffold(
        body: Center(
          child: CircularProgressIndicator(),
        ),
      );
    }
  }
}

class MyCustomSource extends StreamAudioSource {
  final List<int> bytes;
  MyCustomSource(this.bytes);

  @override
  Future<StreamAudioResponse> request([int? start, int? end]) async {
    start ??= 0;
    end ??= bytes.length;
    return StreamAudioResponse(
      sourceLength: bytes.length,
      contentLength: end - start,
      offset: start,
      stream: Stream.value(bytes.sublist(start, end)),
      contentType: 'audio/wav',
    );
  }
}

## For soundpool package:

To get the package visit the soundpool pub.dev page.

class SoundpoolPlayerView extends StatefulWidget {
  const SoundpoolPlayerView({super.key});

  @override
  State<SoundpoolPlayerView> createState() => _SoundpoolPlayerViewState();
}

class _SoundpoolPlayerViewState extends State<SoundpoolPlayerView> {
  Soundpool pool = Soundpool.fromOptions();
  bool loaded = false;

  Future<void> initRawData() async {
    final pcmBuffer = PCM_RAW;
    final uint8list = await BufferUtil.pcmToUint8List(pcmBuffer, 16000);
    int soundId = await pool.loadUint8List(uint8list);
    pool.play(soundId);
    setState(() {
      loaded = true;
    });
  }

  @override
  void initState() {
    super.initState();
    initRawData();
  }

  @override
  Widget build(BuildContext context) {
    if (loaded) {
      return Scaffold(
        appBar: AppBar(
          backgroundColor: Theme.of(context).colorScheme.inversePrimary,
          title: const Text('PCM Player'),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              const Text(
                'PCM Player',
              ),
              ElevatedButton(
                onPressed: () {
                  pool.play(1);
                },
                child: const Text('Play'),
              ),
            ],
          ),
        ),
      );
    }
    return const Scaffold(
      body: Center(
        child: CircularProgressIndicator(),
      ),
    );
  }
}

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

이 글에서는 Flutter에서 원시 PCM 오디오 데이터를 재생 가능한 데이터 유형으로 변환하는 과정을 자세히 다루었습니다. Flutter 생태계에서 일반적으로 사용되는 네 가지 다른 오디오 패키지도 살펴보았는데, 각각의 장점과 사용 사례를 보여드려서 여러분이 자신의 프로젝트에 가장 적합한 오디오 패키지를 선택하는 데 도움이 되도록 했습니다.

이 글을 읽어주셔서 감사합니다. 오디오 처리에 관한 이 정보가 유용하길 바라며, 여러분의 애플리케이션에 오디오 기능을 추가하는 과정이 즐겁기를 바라며 행운을 빕니다!
```
