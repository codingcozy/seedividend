---
title: "USB to TTL 컨버터와 Arduino IDE를 사용하여 STM32 Blue Pill 시작하기  첫 프로그램 작성하는 방법"
description: ""
coverImage: "/assets/img/2024-08-17-GettingStartedwithSTM32BluePillinArduinoIDEUsingaUSBtoTTLConverterWriteYourFirstProgram_0.png"
date: 2024-08-17 01:16
ogImage: 
  url: /assets/img/2024-08-17-GettingStartedwithSTM32BluePillinArduinoIDEUsingaUSBtoTTLConverterWriteYourFirstProgram_0.png
tag: Tech
originalTitle: "Getting Started with STM32 Blue Pill in Arduino IDE Using a USB to TTL Converter  Write Your First Program"
link: "https://medium.com/@shilleh/getting-started-with-stm32-blue-pill-in-arduino-ide-using-a-usb-to-ttl-converter-write-your-7cac7626fd9a"
isUpdated: false
---


![STM32 Blue Pill Tutorial](/assets/img/2024-08-17-GettingStartedwithSTM32BluePillinArduinoIDEUsingaUSBtoTTLConverterWriteYourFirstProgram_0.png)

이 포괄적인 튜토리얼은 Arduino IDE와 DSD TECH SH-U09C5 USB to TTL 컨버터를 사용하여 STM32 Blue Pill을 설정하고 프로그래밍하는 과정을 안내합니다. STM32 Blue Pill은 STM32F103C8T6 ARM Cortex-M3 프로세서를 기반으로 한 강력하면서도 저렴한 마이크로컨트롤러 보드입니다. 강건함과 다재다능성으로 유명한 Blue Pill은 프로젝트에서 32비트 ARM 아키텍처의 성능을 활용하려는 취미가 있는 사람, 만들기 좋아하는 사람, 그리고 전문가들에게 탁월한 선택입니다.

# STM32 Blue Pill을 선택해야 하는 이유

STM32 Blue Pill은 유사한 마이크로컨트롤러와 비교해 분수의 비용으로 인상적인 기능 세트를 제공합니다. 72 MHz 클럭 속도, 20 KB의 RAM, 64 KB의 플래시 메모리로, 8비트 마이크로컨트롤러보다 우수한 성능을 보여줍니다. 실시간 데이터 처리, 모터 제어, 고급 센서 통합과 같이 더딘보다 요구되는 응용에 적합합니다. SPI, I2C, USART, ADC를 포함한 다양한 주변장치는 다양한 컴포넌트, 센서 및 모듈과의 원활한 인터페이스를 가능하게 합니다.

<div class="content-ad"></div>

또한 STM32 Blue Pill은 아두이노 IDE를 포함한 다양한 개발 환경을 통해 오픈 소스 커뮤니티에 의해 잘 지원되고 있습니다. 이는 아두이노에 익숙하지만 좀 더 고급 하드웨어로 넘어가고 싶은 사람들에게도 접근성을 제공합니다.

# USB to TTL 변환기를 사용하는 이유는 무엇인가요?

많은 아두이노 보드와 달리 STM32 Blue Pill은 내장 USB-시리얼 컨버터가 없기 때문에 코드 업로드와 디버깅에 일반적으로 사용되는 것이 없습니다. 대신 보드는 컴퓨터와 통신하기 위해 외부 컨버터가 필요한 UART (Universal Asynchronous Receiver-Transmitter) 핀을 갖추고 있습니다. DSD TECH SH-U09C5 USB to TTL 컨버터는 컴퓨터의 USB 포트와 Blue Pill의 UART 핀 사이에 브릿지 역할을 하여 코드 업로드, 시리얼 출력 모니터링 및 프로그램 디버깅을 가능하게 합니다. 이 컨버터는 STM32 Blue Pill과 작업할 때 필수적인 도구로서, 보드와 개발 환경 간 원활한 통신을 가능케 합니다.

<img src="/assets/img/2024-08-17-GettingStartedwithSTM32BluePillinArduinoIDEUsingaUSBtoTTLConverterWriteYourFirstProgram_1.png" />

<div class="content-ad"></div>

# 事전 솔더링 보드로 시작하기

소더링의 번거로움 없이 바로 개발에 몰입하고 싶은 분들을 위해, 쉴레텍(Shillehtek)에서 사전 솔더링된 STM32 Blue Pill 보드를 구매할 수 있습니다. 이 보드는 사용 준비가 되어 있어 프로젝트 구축에 집중할 수 있습니다.

--- 

이 주제를 자세히 탐구하기 전에, 당사의 지속적인 노력을 지원하고 IoT 프로젝트를 향상하는 데 전념한 다양한 플랫폼을 탐험하실 것을 초대합니다:

<div class="content-ad"></div>

- YouTube 채널 구독하기: 새로운 자습서와 프로젝트 통찰을 놓치지 마세요. YouTube의 Shilleh 채널을 구독하세요.
- 저희를 지원해주세요: 여러분의 지원은 소중합니다. Buy Me A Coffee에서 커피 한 잔 사주시면 품질 높은 콘텐츠 제작을 계속할 수 있습니다.
- 전문 IoT 서비스 고용하기: IoT 프로젝트에 대한 맞춤 지원이 필요하시면 UpWork에서 저를 고용해보세요.

ShillehTek 웹사이트(할인 혜택):

https://shillehtek.com/collections/all

ShillehTek 아마존 스토어:

<div class="content-ad"></div>

ShillehTek 아마존 스토어 - 미국

ShillehTek 아마존 스토어 - 캐나다

ShillehTek 아마존 스토어 - 일본

## 단계 1: STM32 Blue Pill을 USB to TTL 컨버터에 연결하세요.

<div class="content-ad"></div>

먼저 STM32 블루필을 컴퓨터에 연결해야 합니다. 이 때 DSD TECH SH-U09C5 USB에서 TTL로 변환기를 사용하면 됩니다. 이 변환기를 통해 컴퓨터가 STM32 블루필과 UART 인터페이스를 통신할 수 있게 됩니다.

![이미지](/assets/img/2024-08-17-GettingStartedwithSTM32BluePillinArduinoIDEUsingaUSBtoTTLConverterWriteYourFirstProgram_2.png)

## 배선 설정:

- RXD (SH-U09C5) - PA9 (블루필의 RX)
- TXD (SH-U09C5) - PA10 (블루필의 TX)
- GND (SH-U09C5) - GND (블루필)
- VCC (SH-U09C5) - 3.3V (블루필)

<div class="content-ad"></div>

## BOOT0 점퍼 설정하기:

- Blue Pill의 BOOT0 점퍼를 1 위치로 설정하세요 (이렇게 하면 Blue Pill이 UART 부트로더 모드로 됩니다). 부트로더 모드를 보려면 아래 다이어그램을 참조하세요.

![부트로더 모드 다이어그램](/assets/img/2024-08-17-GettingStartedwithSTM32BluePillinArduinoIDEUsingaUSBtoTTLConverterWriteYourFirstProgram_3.png)

TTL 컨버터를 전원에 연결했는지 확인하세요. 컴퓨터에 USB 포트가 있다면 간단히 컴퓨터에 연결하면 됩니다!

<div class="content-ad"></div>

# 단계 2: 아두이노 IDE에 STM32 지원 설치하기

아두이노 IDE에서 STM32 Blue Pill을 프로그래밍하려면 먼저 STM32 보드를 지원할 수 있도록 설치해야 합니다.

## 단계 1: 아두이노 IDE 환경 설정 열기

- 아두이노 IDE를 엽니다.
- 파일 ` 환경설정`으로 이동합니다.

<div class="content-ad"></div>

## 단계 2: STM32 보드 관리자 URL 추가

"추가 보드 관리자 URL" 필드에 다음 URL을 추가하세요:

https://github.com/stm32duino/BoardManagerFiles/raw/main/package_stmicroelectronics_index.json

확인을 클릭하세요.

<div class="content-ad"></div>


![Step 3: Install STM32 Boards](/assets/img/2024-08-17-GettingStartedwithSTM32BluePillinArduinoIDEUsingaUSBtoTTLConverterWriteYourFirstProgram_4.png)

## Step 3: Install STM32 Boards

- Go to Tools > Board > Boards Manager.
- Search for STM32 and click Install next to the “STM32 MCU based boards” package.

![Step 3: Install STM32 Boards](/assets/img/2024-08-17-GettingStartedwithSTM32BluePillinArduinoIDEUsingaUSBtoTTLConverterWriteYourFirstProgram_5.png)


<div class="content-ad"></div>

# 단계 3: 아두이노 IDE에서 STM32 Blue Pill 보드 선택하기

STM32 지원을 설치한 후에는 Arduino IDE를 구성하여 STM32 Blue Pill에 맞는 올바른 설정을 사용해야 합니다.

## 단계 1: 보드 선택

- 도구로 이동하여 `보드`의 STM32 보드를 선택하고 일반적인 STM32F1 시리즈를 선택합니다.

<div class="content-ad"></div>

## 단계 2: 보드 설정 구성하기

- 도구 아래 `보드 파트 번호` 항목에서 BluePill F103C8 (또는 128KB 플래시 버전을 사용하는 경우 BluePill F103CB)를 선택합니다.
- 업로드 방법을 STM32CubeProgrammer (시리얼)로 설정합니다.
- 장치와 관련된 포트를 설정합니다.

# Step 4: STM32CubeProgrammer 설치하기

STM32CubeProgrammer은 STM32 Blue Pill에 코드를 시리얼 인터페이스를 통해 업로드하는 데 필요합니다.

<div class="content-ad"></div>


## 단계 1: STM32CubeProgrammer 다운로드 및 설치

- STMicroelectronics 웹사이트에서 STM32CubeProgrammer를 다운로드합니다.
- 계정이 없다면 무료 계정을 생성해주세요.
- 화면 안내에 따라 시스템에 설치해주세요. 다양한 운영 체제용 다운로드가 제공됩니다.

## 단계 2: 환경 변수 설정

터미널을 열고 STM32CubeProgrammer 경로를 STM32_PRG_PATH 환경 변수에 추가하세요.

<div class="content-ad"></div>

macOS 사용자라면, ~/.zshrc 또는 ~/.bash_profile 파일에 다음 줄을 추가해 주세요:

```bash
export STM32_PRG_PATH=/Applications/STMicroelectronics/STM32Cube/STM32CubeProgrammer/STM32CubeProgrammer.app/Contents/MacOs/bin
```

변경 사항을 적용하려면 다음을 실행하세요:

```bash
source ~/.zshrc
```

<div class="content-ad"></div>

또는

- source ~/.bash_profile

# Windows 운영체제의 경우:

- 시작 메뉴를 열고 “환경 변수”를 검색합니다.
- 검색 결과에서 “시스템 환경 변수 편집”을 선택합니다.
- 시스템 속성 창에서 “환경 변수” 버튼을 클릭합니다.
- “시스템 변수”(또는 원하는 경우 “사용자 변수”) 아래에서 “새로 만들기”를 클릭합니다.

<div class="content-ad"></div>

- 변수 이름: STM32_PRG_PATH
- 변수 값: STM32CubeProgrammer의 bin 디렉토리 경로, 예를 들어:
- C:\Program Files\STMicroelectronics\STM32Cube\STM32CubeProgrammer\bin

새 환경 변수를 저장하려면 "확인"을 클릭하세요.

환경 변수와 시스템 속성 창을 닫으세요.

# 단계 5: 첫 번째 프로그램 업로드

<div class="content-ad"></div>

이제 모든 것이 설정되었으니 STM32 Blue Pill에 첫 번째 프로그램을 업로드할 준비가 되었습니다.

## 단계 1: 코드 작성

- Arduino IDE에서 새로운 스케치를 열고 간단한 프로그램을 작성하세요. 시리얼 모니터에 메시지를 출력하는 예제를 보여드리겠습니다:

```js
void setup() {
  // 시리얼 통신을 9600 baud로 시작합니다
  Serial.begin(9600);

  // 시리얼 포트가 연결될 때까지 대기합니다 (일부 보드에서 필요함)
  while (!Serial) {
    ; // 대기
  }
}

void loop() {
  // 시리얼 모니터에 메시지를 출력합니다
  Serial.println("안녕, Blue Pill!");

  // 1초를 기다립니다
  delay(1000);
}
```

<div class="content-ad"></div>

## 단계 2: 블루필 초기화하기

- Arduino IDE에서 업로드 버튼을 클릭하기 전에, 블루필 보드의 리셋 버튼을 누릅니다. 이렇게 하면 보드가 프로그램을 받을 준비가 되어있음을 확인할 수 있습니다.

## 단계 3: 코드 업로드하기

- Arduino IDE에서 업로드 버튼을 클릭합니다.
- 업로드가 완료되면 보드의 내장 LED가 일정한 간격으로 깜박입니다. 다른 스크립트를 업로드하려면 리셋 버튼을 누르고 스크립트를 수정한 다음 다시 업로드할 수 있습니다!

<div class="content-ad"></div>

# 문제 해결

- 파일 업로드 중 문제가 발생하는 경우:
- 올바른 포트가 선택되어 있는지 확인하세요.
- 배선 및 점퍼 설정을 확인하세요.
- STM32_PRG_PATH 환경 변수가 올바르게 설정되었는지 확인하세요.
- STM32 ShillehTek 아마존 스토어에서 판매하는 원본 보드인지 확인하세요. 해당 보드는 이미 프리실더링되어 있습니다.

# 결론

축하합니다! Arduino IDE와 DSD TECH SH-U09C5 USB to TTL 컨버터를 사용하여 STM32 Blue Pill을 성공적으로 설정하고 프로그래밍했습니다. 이 강력한 마이크로컨트롤러는 저렴한 가격에 32비트 ARM Cortex-M3 프로세서의 성능을 제공하여 여러분의 프로젝트에 무한한 가능성을 열어줍니다. 초보자이든 경험이 풍부한 개발자이든, STM32 Blue Pill은 여러분의 아이디어를 현실로 구현하는 데 도움이 되는 다재다능한 도구입니다.

<div class="content-ad"></div>

이 튜토리얼이 도움이 되었다면, 제 YouTube 채널에서 더 많은 콘텐츠를 확인해보세요. 거기에서는 주기적으로 개발 보드와 마이크로컨트롤러를 최대한 활용할 수 있도록 도와주는 꿀팁, 튜토리얼, 프로젝트 아이디어를 공유하고 있어요. 최신 동영상을 받아보려면 MM Shilleh의 YouTube에서 구독하세요. 프로젝트 진행에 행운을 빕니다!