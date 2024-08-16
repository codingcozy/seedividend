---
title: "아두이노와 iOS 간의 블루투스 연결"
description: ""
coverImage: "/assets/img/2024-05-15-BluetoothconnectionbetweenArduinoandiOS_0.png"
date: 2024-05-15 04:34
ogImage: 
  url: /assets/img/2024-05-15-BluetoothconnectionbetweenArduinoandiOS_0.png
tag: Tech
originalTitle: "Bluetooth connection between Arduino and iOS"
link: "https://medium.com/academy-eldoradocps/bluetooth-connection-between-arduino-and-ios-70415ca57f53"
isUpdated: true
---




# 소개

안녕하세요!! 여기에 오신 것을 환영합니다. 아두이노 장치에서 iOS 장치로 블루투스를 사용하여 데이터를 송수신하는 방법을 찾고 계시다고 생각합니다, 맞나요? (빌드할 내용을 설명하는 비디오가 있는 GitHub 링크를 여기에 배치했습니다).

이를 위해 지식을 두 부분으로 나누기로 결정했습니다. 첫 번째 부분에서는 하드웨어 구체적인 내용, 블루투스 모듈의 조립 및 아두이노 코드를 통해 정보를 전송하는 방법에 대해 다룰 것입니다. 이 문서의 후반부에서는 iOS 개발에 대해 다룰 예정입니다.

# 블루투스 모듈



이 프로젝트에서는 에너지 소비가 적은 통신 형태인 블루투스를 아두이노와 IOS 장치 간에 사용하기로 결정했습니다. 이것은 배터리로 아두이노를 사용할 때 중요한 요소입니다.
이를 염두에 두고 프로젝트를 시작할 때의 첫 번째 질문은 아두이노에 이미 블루투스가 내장되어 있는지 여부입니다(이를 위해 문서에 접근할 수 있음). 저의 경우, 블루투스가 내장되어 있지 않은 ArduinoUno를 사용할 예정이므로 이 기술을 제공하는 모듈이 필요합니다.

어떤 모듈을 사용해야 할까요?
iOS 기기는 BLE(Bluetooth Low Energy)라는 기술을 사용하여 통신하며, 일반적인 블루투스와 차이가 있지만, 이는 다른 기사로 남기겠습니다. 따라서 BLE를 지원하는 모듈이 필요하며, 여러 옵션이 있습니다(구매하기 전에 주의하세요), 하지만 저는 HC-08 모듈을 사용할 예정입니다.

![Image](/assets/img/2024-05-15-BluetoothconnectionbetweenArduinoandiOS_0.png)

# Arduino에 HC-08 연결하기



조립을 더 잘 설명하기 위해 어셈블리를 시연하기 위한 다이어그램을 만들었습니다.

![Bluetooth Connection Diagram](/assets/img/2024-05-15-BluetoothconnectionbetweenArduinoandiOS_1.png)

프로젝트에서 핀 2와 3을 이미 사용 중이라면, TX 및 RX를 사용 가능한 핀에 연결할 수 있습니다(이 경우 SoftwareSerial을 사용합니다). 그러나 코드에 도달하면 사용 중인 핀을 변경해야 합니다.
이미지에 문제가 있을 경우, HC-08에서 아두이노로 연결되는 방법을 적어놓겠습니다:

- VCC → 5V
- GND → GND
- TXD(송신) → 2
- RXD(수신) → 3



# 코딩 시간

우리가 아두이노에 업로드할 코드는 블루투스 모듈(나의 iOS 기기에 연결될 것)로 정보를 보내고, 그 모듈은 나의 iOS 기기로 데이터를 전송할 것을 목적으로 합니다.

```js
#include "SoftwareSerial.h"
SoftwareSerial bluetooth(3, 2); //3 = RX ; 2 = TX
```

기본적으로, 코드의 이 부분에서는 SoftwareSerial 라이브러리를 사용하고 있습니다. 이 라이브러리를 사용하면 아두이노 디지털 핀에 추가적인 시리얼 포트를 생성할 수 있습니다. 이 기능은 시리얼 통신이 필요하지만 이미 주 시리얼 포트를 코드를 디버깅하기 위한 시리얼 모니터로 사용하는 경우와 같이 주 시리얼 포트가 다른 목적으로 이미 사용 중인 경우 유용합니다.



소프트웨어 시리얼 인스턴스가 이름이 "bluetooth"인 것을 만들었습니다. 매개변수 (3, 2)는 아두이노의 핀 3을 RX(수신)로, 핀 2를 TX(송신)로 사용할 것을 나타냅니다 (기본적으로 첫 번째 숫자가 RX이며 두 번째 숫자가 TX입니다).

⚠️만약 다른 핀을 사용했다면, 숫자를 변경하세요.⚠️

```js
void setup() {
  Serial.begin(9600);
  bluetooth.begin(9600);
}
```

설정 함수에서(스크립트가 실행될 때에만 실행되는 함수), 아두이노와 컴퓨터 사이에 표준 시리얼 포트를 통해 초당 9600비트의 속도로 시리얼 통신을 시작합니다 (디버깅에 유용합니다).



이제 "블루투스"라고 불리는 객체의 직렬 통신을 9600 비트로 설정하여 시작합니다. 이는 아두이노와 핀 2와 3에 연결된 블루투스 모듈 간의 통신을 수립합니다.

```js
void loop() {
    bluetooth.print("성공!"); 
    delay(2000);
    bluetooth.print("잘 했어요!");
    delay(2000);
}
```

이제 우리의 루프에서는 코드가 계속해서 실행되며, 기본적으로 블루투스 모듈과 통신하도록 한 책임자에게 문자열을 보내고 있습니다. 매 2초마다 다른 문자열을 보내고 있습니다.

이 코드 스니펫의 아이디어는 여러분의 프로젝트에 맞는 데이터를 가져와 생성된 통신으로 보내는 것입니다. 이 경우 문자열만 보내고 있지만 다양한 유형의 데이터를 보낼 수 있습니다.



# iOS 프로젝트

지금까지 배운 것으로는, 코드와 아두이노가 준비가 되어 블루투스 장치와 연결하고 정보를 전송할 수 있게 되었어요. 이제는 SwiftUI iOS 프로젝트를 만들어야 할 때입니다.

# XCode 권한

XCode에서 프로젝트를 생성한 후, "info.plist"에 블루투스 사용을 추가해야 합니다. 그러면 애플리케이션이 사용자에게 다른 블루투스 장치에 연결할 권한을 요청할 수 있어요.



프로젝트 파일에 액세스하고 "info" 탭에 들어가야 해요. 그 화면에 들어가면 기존 항목 위에 마우스 포인터를 두고 "＋"를 클릭해서 "Privacy — Bluetooth Peripheral Usage Description"을 추가해야 해요.

우리가 추가할 이 권한은 사용자에게 Bluetooth 장치에 연결할 권한을 요청하는 것이에요. "value"는 연결을 요청하는 메시지로 사용자에게 표시될 거에요.

그런데 다른 권한인 "Privacy — Bluetooth always usage Description"도 있어요. 이 권한은 앱이 종료되어도 계속 Bluetooth을 사용하도록 사용자에게 요청하는데, 우리가 여기서 제안한 프로젝트에는 필요 없는 권한이에요.

권한을 추가한 후에는 우리의 "info" 목록에 새로운 줄이 이렇게 보여야 해요:



# Swift 코딩

이제 Arduino를 준비하고 Bluetooth를 사용하기 위한 필수 권한을 설정했으니, 코드 작성을 시작할 수 있습니다.

이 맥락에서, 이 기사에서 "BluetoothController"라고 부르는 부분만 설명하겠습니다. 이 컨트롤러에서 수집된 정보와 데이터를 표시하는 뷰는 GitHub에서 액세스할 수 있지만, 기본적으로 컨트롤러에서 수집된 정보와 데이터를 표시합니다.

이 매체 기사의 이 부분에서 설명하고자 하는 섹션을 넣은 다음, 더 작은 섹션으로 나누어 각각 설명하겠습니다. 세 개의 점을 통과할 때마다, 새로운 섹션을 설명하기 시작함을 나타냅니다.



이렇게 할 것입니다:

```js
import Foundation
import CoreBluetooth
class BluetoothController: NSObject, ObservableObject, CBPeripheralDelegate {
    
    private var centralManager: CBCentralManager!
    
    @Published var connectedPeripheral: CBPeripheral?
    @Published var discoveredPeripherals = [CBPeripheral]()
    @Published var isConnected = false
    @Published var bluetoothStatus: BluetoothStatus = .off
    @Published var valueReceived: String?
   
    override init() {
        super.init()
        centralManager = CBCentralManager(delegate: self, queue: nil)
        centralManagerDidUpdateState(centralManager)
    }
}
```

"BluetoothController"은 뷰에서 정보에 액세스할 것이므로 observable해야 하고, ObjectiveC stuff를 사용할 예정이므로 NSObject여야 하며, 연결될 블루투스 장치(페리페럴)로부터 이벤트를 처리할 수 있는 메서드를 정의하는 CoreBluetooth가 제공하는 프로토콜인 CBPeripheralDelegate를 준수해야 합니다.

```js
private var centralManager: CBCentralManager!
```



우리는 CBCentralManager 타입의 centralManager 변수를 생성했습니다. 이는 CoreBluetooth에서 제공하는 타입으로, BLE 통신에서 중심 역할을 하는 Bluetooth "페리페랄"과 통신 관리를 담당합니다.

```js
@Published var connectedPeripheral: CBPeripheral?
@Published var discoveredPeripherals = [CBPeripheral]()
@Published var isConnected = false
@Published var bluetoothStatus: BluetoothStatus = .off
@Published var valueReceived: String?
```

생성된 이 변수들은 화면에 표시할 정보입니다.

```js
override init() {
        super.init()
        centralManager = CBCentralManager(delegate: self, queue: nil)
        centralManagerDidUpdateState(centralManager)
}
```



마지막으로, init을 사용하여 우리의 슈퍼클래스인 NSObject을 초기화하는 init 메서드가 있습니다. 여기서 모든 BluetoothController의 추가 설정을 제공하기 전에 NSObject에서 제공하는 모든 것을 초기화합니다.

centralManager = CBCentralManager(delegate: self, queue: nil) - 이 줄은 Bluetooth 통신을 위한 "중앙 매니저"인 CBCentralManager의 인스턴스를 초기화합니다. 중앙 매니저의 "delegate"를 self로 설정하여 BluetoothController 인스턴스가 Bluetooth 이벤트에 관련된 반환을 받게 됩니다. 상태 변경, 페리페럴 발견 등과 관련된 반환에 대한 delegate로서 센트럴 매니저가 메인 디스패치 큐를 사용할 것을 나타내는 queue 매개변수는 nil로 설정되어 있습니다.

centralManagerDidUpdateState(centralManager) - 이 줄은 BluetoothController의 centralManagerDidUpdateState 메서드를 직접 호출합니다. 이 메서드는 CBCentralManagerDelegate 프로토콜의 일부이며 Bluetooth 상태가 변경될 때 호출됩니다. 센트럴 매니저를 초기화한 후 이 메서드를 직접 호출함으로써 BluetoothController 인스턴스가 초기화 직후 현재 Bluetooth 상태를 처리할 수 있도록 보장됩니다.

```js
extension BluetoothController: CBCentralManagerDelegate {
    
    func centralManagerDidUpdateState(_ central: CBCentralManager) {
        switch central.state {
        case .poweredOn:
            centralManager.scanForPeripherals(withServices: nil, options: nil)
            bluetoothStatus = BluetoothStatus.on
            
        case .poweredOff:
            self.connectedPeripheral = nil
            self.discoveredPeripherals = []
            self.isConnected = false
            self.valueReceived = nil
            bluetoothStatus = BluetoothStatus.off
            
        case .resetting:
            // Wait for next state update and consider logging interruption of Bluetooth service
            bluetoothStatus = BluetoothStatus.resetting
            
        case .unauthorized:
            // Alert user to enable Bluetooth permission in app Settings
            bluetoothStatus = BluetoothStatus.unathorized
            
        case .unsupported:
            // Alert user their device does not support Bluetooth and app will not work as expected
            bluetoothStatus = BluetoothStatus.unsupported
            
        case .unknown:
            // Wait for next state update
            bluetoothStatus = BluetoothStatus.unknown
            
        @unknown default:
            print("---Default case---")
        }
    }
```



"centralManagerDidUpdateState" 메서드 내에서 중앙 매니저의 현재 상태에 따라 다양한 조치가 취해집니다:

- .poweredOn: Bluetooth가 켜져 있으면 중앙 매니저가 블루투스 장치를 스캔하기 시작합니다
- .poweredOff: Bluetooth가 꺼져 있으면, 이미 발견되거나 연결된 장치에 대한 모든 참조를 지우고 Bluetooth를 다시 켤 때 모두 다시 발견해야 합니다.

각 상태마다 적절한 처리를 해야 하며, 이 경우에는 블루투스 상태를 현재 상태로 설정하고 이러한 경우를 처리한 것이 아니라는 점을 유의하십시오. 그러나 각 상태가 의미하는 바는 문서에서 찾을 수 있습니다.

본 코드는 본질적으로 Bluetooth 상태 변화를 모니터하고 이에 적절하게 대응하여 애플리케이션이 이러한 변화에 적절하게 반응하도록 보장합니다."



```swift
func centralManager(_ central: CBCentralManager, didDiscover peripheral: CBPeripheral, advertisementData: [String : Any], rssi RSSI: NSNumber) {
    if !peripheralAlreadyRegistered(peripheral: peripheral){
        discoveredPeripherals.append(peripheral)
    }
}

func peripheralAlreadyRegistered(peripheral: CBPeripheral) -> Bool{
    return discoveredPeripherals.contains(peripheral)
}
```

이제 CentralManager가 감지하는 이벤트에 따라 자동으로 호출되는 일련의 메소드를 입력할 것입니다. 예를 들어, 이전에 블루투스가 켜져 있음을 감지했을 때 "peripheral"를 스캔하기 시작했고, 발견하자마자 첫 번째 함수 "didDiscover"에 들어갔습니다. 여기에는 발견된 페리페럴과 함께 수행할 작업이 포함되어 있습니다.

이 경우에는 기본적으로 이미 발견되었는지 확인한 후, 아직 발견되지 않은 경우에만 발견된 페리페럴을 발견된 페리페럴 배열에 추가했습니다(뷰에 표시될 배열이며 사용자가 어떤 페리페럴에 연결할지 선택할 수 있도록 표시됩니다).



```js
func connect(peripheral: CBPeripheral) {
    centralManager.connect(peripheral, options: nil)
}

func centralManager(_ central: CBCentralManager, didConnect peripheral: CBPeripheral) {
    self.connectedPeripheral = peripheral
    self.isConnected = true

    peripheral.delegate = self
    peripheral.discoverServices(nil)
}
```

여기에는 뷰에서 선택된 페리페럴에 연결하는 데 책임이 있는 두 가지 함수가 있습니다. 발견된 장치 목록에서 페리페럴을 클릭하면 "connect" 함수를 호출하여 중앙 관리자에게 매개변수로 전달된 페리페럴과의 연결을 요청합니다.

연결이 성공하면 Bluetooth 모듈의 LED가 깜박이는 것이 멈추고 켜져 있어야 합니다.

연결이 성공하면 자동으로 CentralManager 함수 "didConnect"로 들어가며, 이 경우에:




- 연결된 장치에 대한 참조(connectedPeripheral)를 저장합니다.
- 연결된 주변 장치의 "대리자(delegate)"로서 객체 자체의 정의. 이를 통해 객체는 주변 장치에서 발생하는 이벤트에 대한 알림을 받을 수 있습니다.
- 연결된 주변 장치로부터 서비스(블루투스 장치가 제공하는 "기능"들에 대해 계속 논의됩니다)를 검색을 시작합니다.

```js
func centralManager(_ central: CBCentralManager, didFailToConnect peripheral: CBPeripheral, error: Error?) {
    // 오류 처리
    print("주의: 연결 실패")
}
```

다른 함수가 이것을 호출할 수 있는데, 해당 주변 장치에 연결을 시도할 때 연결에 실패했을 때입니다. 이 경우 콘솔에 연결이 실패했다는 메시지를 출력했지만, 이 시나리오를 처리해야 합니다.

```js
func disconnect() {
    guard let peripheral = connectedPeripheral else {
        return
    }
    centralManager.cancelPeripheralConnection(peripheral)
}

func centralManager(_ central: CBCentralManager, didDisconnectPeripheral peripheral: CBPeripheral, error: Error?) {
    self.connectedPeripheral = nil
    self.discoveredPeripherals = []
    self.isConnected = false
    self.valueReceived = nil
        
    centralManager.scanForPeripherals(withServices: nil, options: nil)
}
```



이제 영구적으로 주변 장치와 연결되어 있지 않도록 연결을 해제하는 기능이 있습니다. 이 기능은 우리가 무엇에 연결돼 있는지 확인한 후, CentralManager에 연결을 취소하도록 요청합니다.

이 연결을 취소하면, 이전에 연결돼 있던 것이 더 이상 연결되지 않았으므로 발견된 장치와 연결된 모든 참조를 지우기로 결정했습니다. 게다가, 주변 기기를 연결하고 30m를 걸어가서 이미 발견한 다른 기기를 잃는 경우도 있을 수 있으므로, 그들의 참조를 삭제하여 더 이상 존재하지 않는 것에 연결하려고 하지 않도록 합니다.

그 후, 다시 주변에 있는 주변 기기를 찾기 시작합니다.

# 서비스



기본적으로, 서비스는 주변 장치에서 제공되는 기능을 나타내는 특성의 모음입니다. 각 서비스는 하나 이상의 특성을 포함할 수 있으며, 이러한 특성은 주변 장치에서 제공되는 특정 정보를 나타냅니다.

예를 들어, Bluetooth 주변 장치는 "온도 센서" 서비스를 가질 수 있으며, 이 서비스에는 센서가 측정한 현재 온도를 제공하는 특성이 포함될 수 있습니다. 또한 "LED 제어" 서비스를 가질 수 있으며, 이 서비스에는 LED를 켜거나 끄고 색상을 설정하는 특성이 포함될 수 있습니다.

```js
func peripheral(_ peripheral: CBPeripheral, didDiscoverServices error: Error?) {
        guard peripheral.services != nil else {
            return
        }
        discoverCharacteristics(peripheral: peripheral)
}
```

장치와의 연결이 끊기거나 연결이 실패할 가능성을 다룬 후, 이전에 서비스를 찾는 함수를 호출한 지점으로 돌아가서, 발견된 서비스가 있을 때 이 함수에 들어가는데, 이것은 이제 CBPeriperalDelegate의 메서드이고 더 이상 CentralManager의 메서드가 아니기 때문에 제 주변 장치에서 발생하는 이벤트는 CBPeripeheralDelegate의 메서드를 통해 처리해야 합니다.



우리가 서비스 검색 시 호출되는 함수는 기본적으로 해당 장치에 서비스가 있는지 확인하고, 서비스가 있는 경우 해당 서비스의 특성을 찾도록 요청합니다.

```js
func discoverCharacteristics(peripheral: CBPeripheral) {
    guard let services = peripheral.services else {
        return
    }
    
    for service in services {
        peripheral.discoverCharacteristics(nil, for: service)
    }
}

func peripheral(_ peripheral: CBPeripheral, didDiscoverCharacteristicsFor service: CBService, error: Error?) {
    guard let characteristics = service.characteristics else {
        return
    }
    
    for characteristic in characteristics {
        if characteristic.uuid == CBUUID(string: "FFE1") {
            if characteristic.properties.contains(.notify) {
                peripheral.setNotifyValue(true, for: characteristic)
            }
            
            self.connectedPeripheral?.readValue(for: characteristic)
            break
        }
    }
}
```

첫 번째 함수는 간단히 발견된 모든 서비스에 있는 특성을 검색하도록 요청합니다. 이러한 특성을 찾으면, CBPeripheralDelegate 대리자가 이 이벤트를 식별하고 "didDiscoverCharacteristics" 메서드를 호출합니다.

이 메서드에서는 특성 목록이 null이 아닌지 확인하고, 그 후에 찾은 모든 특성을 특성 식별자가 "FFE1"인 특성을 찾아냅니다. 이는 우리가 원하는 값을 제공하는 특성이며 값이 변경될 때 경고해주는 notify 속성을 가지고 있습니다.



그 후에 이 속성에 포함된 값이 무엇인지를 읽습니다.

# 주의

HC-08 모듈을 사용하는 이 프로젝트의 경우, 찾고 있는 ID는 "FFE1"입니다. 그러나 다른 모듈을 사용 중이라면 ID가 다를 수도 있습니다.

찾아야 할 기능이 무엇인지 알아보려면 모듈 또는 아두이노의 데이터 시트를 읽는 것을 추천합니다. 또한 "LightBlue"라는 앱을 사용하여 장치에 연결하고 장치가 제공하는 서비스에 대한 정보를 포함하여 장치에 대한 몇 가지 정보를 제공할 수 있습니다.



HC-08 모듈을 사용하는 분들을 위해 gitHub에 데이터 시트를 올려두었어요.

![Bluetooth connection between Arduino and iOS](/assets/img/2024-05-15-BluetoothconnectionbetweenArduinoandiOS_2.png)

```swift
func peripheral(_ peripheral: CBPeripheral, didUpdateValueFor characteristic: CBCharacteristic, error: Error?) {
        if let value = characteristic.value {
            if let stringValue = String(data: value, encoding: .utf8) {
                valueReceived = stringValue
            }
        }
    }
```

마지막으로 값을 읽기 위해 요청한 후, 값이 변경되면 "didUpdateValueFor" 메서드에 들어가게 되는데, 이 메서드는 받은 값을 문자열로 변환하는 역할을 담당합니다 (이 프로젝트의 목적은 아두이노에서 보내는 두 문자열을 표시하는 것이기 때문이죠).



그러나 당신의 프로젝트에서는 받고 싶은 데이터 유형으로 변환할 수 있고, 심지어 데이터를 받기 전에 값이 업데이트되길 기다리지 않고도 이 변환을 수행할 수 있습니다. 하지만 이 경우에는 매 두 초마다 문자열을 변경하는 것이 목표였습니다.

# 결론

우리는 다음을 구축했습니다.

- 블루투스 장치와 통신하고 데이터를 수신할 수 있는 클래스;
- 아두이노에서 블루투스 모듈을 사용하는 방법을 배웠습니다;
- 아두이노와 iOS가 블루투스를 통해 통신할 수 있도록 만들었습니다.



저희의 다음 단계로, BluetoothController에서 제공하는 정보에 액세스하여 원하는 뷰에서 사용해야 합니다.

소스 코드는 제 GitHub에서 확인해주세요.
도움이 되었기를 바랍니다!🫡