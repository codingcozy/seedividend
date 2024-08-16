---
title: "PHP 8.3에 추가된 20가지 흥미로운 기능들 정리"
description: ""
coverImage: "/assets/img/2024-05-18-Top20PHP83ExcitingFeaturesYouCantAffordtoMiss_0.png"
date: 2024-05-18 22:31
ogImage: 
  url: /assets/img/2024-05-18-Top20PHP83ExcitingFeaturesYouCantAffordtoMiss_0.png
tag: Tech
originalTitle: "Top 20 PHP 8.3 Exciting Features You Can’t Afford to Miss"
link: "https://medium.com/gitconnected/top-20-php-8-3-exciting-features-you-cant-afford-to-miss-0c0a1f3e1172"
isUpdated: true
---




## 웹 개발과 프로그래밍을 혁신하는 PHP 8.3의 최신 기능 및 개선 사항을 알아보세요.

![이미지](/assets/img/2024-05-18-Top20PHP83ExcitingFeaturesYouCantAffordtoMiss_0.png)

인기 있는 서버 측 스크립팅 언어인 PHP의 최신 버전인 PHP 8.3은 새로운 기능과 개선 사항이 많이 포함되어 있어 웹 개발을 최적화하고 성능을 향상시킬 것을 약속합니다. readonly 클래스, 새 json_validate() 함수, Randomizer 클래스에 대한 추가, 더 적합한 날짜/시간 예외 등의 개선 사항을 통해 PHP 8.3은 PHP 개발 경험을 혁신할 것입니다. 이러한 업데이트는 PHP를 더 효율적, 안전하고 다양하게 만들어 웹 개발자와 기업의 변화하는 요구를 충족시키기 위해 목적을 두고 있습니다.

# PHP 8.3의 20가지 흥미로운 기능 및 개선 사항

<div class="content-ad"></div>

- 읽기 전용 클래스 개선 사항
- 새로운 json_validate() 함수
- Randomizer 클래스에 대한 추가 기능
- 타입이 지정된 클래스 상수
- 익명 읽기 전용 클래스
- 동적 클래스 상수 검색
- 보다 적절한 날짜/시간 예외 처리
- 개선된 unserialize() 오류 처리
- 트레이트 및 정적 속성
- 스택 오버플로 감지
- 일정 상수 가시성
- Assert String Eval 정리
- 향상된 FFI\CData:void
- posix_getrlimit() 매개변수 개선
- gc_status() 개선
- 내부 클래스에 대한 class_alias() 지원
- mysqli_poll() 오류 처리
- array_pad() 개선 사항
- opcache.consistency_checks ini 지시문 제거
- number_format()을 사용하여 소수점 처리를 올바르게 처리

# 1. 읽기 전용 클래스 개선 사항

PHP 8.3에서 읽기 전용 클래스에 중요한 개선 사항이 있어 개발자들이 코드를 더 유연하고 효율적으로 제어할 수 있게 되었습니다. 특정하지만 중요한 엣지 케이스를 해결하기 위해 생성 및 복제 시 읽기 전용 속성을 다시 초기화할 수 있는 기능이 추가되었습니다. 이번 업그레이드로 읽기 전용 속성의 딥 클론이 가능하게 되어 PHP에서 읽기 전용 클래스의 유틸리티가 확장되었습니다. 다음은 DateTime 속성을 가진 읽기 전용 클래스의 예시입니다:

```js
readonly class Post {
    public function __construct(public DateTime $createdAt) {
        // 생성자 로직
    }

    public function __clone() {
        $this->createdAt = new DateTime();
        // 읽기 전용 속성을 다시 초기화하는 것이 이제 허용됩니다
    }
}
```

<div class="content-ad"></div>

이 예에서 Post 클래스에는 읽기 전용 속성 $createdAt이 있습니다. 이 속성은 게시물의 생성 날짜를 나타냅니다. PHP 8.3에서 개선된 사항으로, __clone() 메서드를 사용하여 읽기 전용 속성을 다시 초기화할 수 있어 객체의 깊은 복제를 가능하게 하고 읽기 전용 속성의 무결성을 해치지 않습니다.

# 2. 새로운 json_validate() 함수

json_validate() 함수의 도입으로 개발자들은 JSON 문자열을 유효성 검사하는 더 효율적이고 직접적인 방법을 제공받게 되었습니다. 이 함수는 JSON 문자열의 유효성을 확인해야 할 때 복호화 과정 없이 바로 확인할 수 있어 매우 유용합니다.

```js
$jsonString = '{"name": "John", "age": 30, "city": "New York"}';

if (json_validate($jsonString)) {
    echo "JSON 문자열이 유효합니다.";
} else {
    echo "JSON 문자열이 유효하지 않습니다.";
}
```

<div class="content-ad"></div>

이 예에서는 json_validate() 함수를 사용하여 JSON 문자열 $jsonString을 직접 유효성 검사합니다. JSON 문자열이 유효하면 해당 메시지가 표시됩니다. 이 함수는 디코딩 및 오류 처리 없이 JSON 데이터를 유효성 검사하는 간단한 방법을 제공합니다.

사용자 정의 깊이와 플래그를 지정할 수도 있습니다.

```js
$jsonString = '{"name": "John", "age": 30, "city": "New York"}';

// 사용자 정의 깊이와 플래그로 JSON 문자열 유효성 검사
if (json_validate($jsonString, 512, JSON_THROW_ON_ERROR)) {
    echo "JSON 문자열이 유효합니다.";
} else {
    echo "JSON 문자열이 유효하지 않습니다.";
}
```

이 예제에서는 사용자 정의 깊이와 플래그로 json_validate() 함수를 사용했습니다. 두 번째 매개변수는 JSON 문자열의 최대 깊이를 지정하고, 세 번째 매개변수는 유효성 검사를 위한 플래그를 설정합니다. 이를 통해 개발자는 특정 요구 사항에 맞게 유효성 검사 과정을 설정할 수 있습니다.

<div class="content-ad"></div>

PHP 8.3에서 json_validate() 함수는 JSON 유효성 검사 프로세스를 간소화하여 JSON 문자열을 해독하는 대안으로 더 효율적인 메모리를 제공합니다. 이 향상된 기능은 JSON 데이터의 유효성만을 확인해야 하는 시나리오에서 특히 유용하며 PHP 애플리케이션에서 성능과 자원 활용을 향상시킵니다.

# Randomizer 클래스에 추가된 내용

Randomizer 클래스는 새로운 메서드로 확장되어 개발자가 더 많은 제어와 유연성을 가지고 무작위 데이터를 생성할 수 있게 되었습니다. 이러한 추가 기능은 Randomizer 클래스의 기능을 확장하여 지정된 범위와 제약 조건 내에서 무작위 값을 생성하는데 탁월한 지원을 제공합니다.

```js
use Randomizer;

$string = "Hello, World!";
$length = 10;

$randomBytes = Randomizer::getBytesFromString($string, $length);
var_dump($randomBytes);
```

<div class="content-ad"></div>

이 예시에서 Randomizer 클래스의 getBytesFromString() 메서드는 지정된 길이($length)의 랜덤 바이트 문자열을 주어진 입력 문자열($string)에서 생성하는 데 사용됩니다. 이 메서드는 랜덤 데이터 생성이 필요한 시나리오에 기반하여 소스 문자열을 기반으로 랜덤 바이트 시퀀스를 생성하는 편리한 방법을 제공합니다.

또한 지정된 범위 내에서 랜덤 정수를 생성할 수도 있습니다.

```js
use Randomizer;
use IntervalBoundary;

$min = 10;
$max = 20;

$randomInteger = Randomizer::getRandomInteger($min, $max, IntervalBoundary::Closed);
echo $randomInteger;
```

이 예시에서 Randomizer 클래스의 getRandomInteger() 메서드는 $min과 $max로 정의된 범위 내에서 랜덤 정수를 생성하는 데 활용됩니다. IntervalBoundary::Closed 열거형은 최소값과 최대값을 범위에 포함해야 함을 나타내는 데 사용됩니다. 이 메서드는 개발자들이 특정 범위 내에서 랜덤 정수를 생성할 수 있도록 돕고 생성된 값에 대한 정확한 제어를 제공합니다.

<div class="content-ad"></div>

PHP 8.3의 Randomizer 클래스에 추가 사항은 더 향상된 랜덤 데이터 생성 기능을 제공하여, 다양한 제어된 무작위성을 필요로 하는 사용 사례에 맞춤 기능을 제공합니다. 이러한 방법들은 PHP 개발자들에게 사용 가능한 랜덤 데이터 생성 옵션의 범위를 풍부하게 하여 Randomizer 클래스의 전반적인 다양성과 유틸리티에 기여합니다.

# 4. Typed class constants

타입화된 클래스 상수의 도입은 특정 데이터 유형과 함께 클래스 상수를 정의할 수 있도록 하여, 클래스 정의 내에서 향상된 유형 안전성과 명확성을 제공합니다. 이 향상된 기능을 통해 개발자들은 클래스 상수에 대한 유형 제약을 강제할 수 있어 코드의 가독성을 향상시키고 의도하지 않은 데이터 유형 불일치 가능성을 줄일 수 있습니다. 몇 가지 예제를 통해 이 기능을 살펴보겠습니다:

```js
class MathOperations {
    public const PI: float = 3.14159;
    public const MAX_ITERATIONS: int = 1000;
}
```

<div class="content-ad"></div>

이 예제에서 MathOperations 클래스는 두 개의 클래스 상수, PI와 MAX_ITERATIONS을 특정 데이터 유형으로 정의합니다. PI 상수는 float로, MAX_ITERATIONS 상수는 INT로 유형이 지정됩니다. 이렇게 함으로써 이러한 상수가 지정된 데이터 유형의 값을 보유하도록 보장하여 유형 안전성을 증진시키고 코드 가독성을 높입니다.

```js
class Configuration {
    public const DEFAULT_TIMEOUT: int = 30;
    public const ENABLE_LOGGING: bool = true;
    
    public function setRequestTimeout(int $timeout): void {
        // Set the request timeout using the DEFAULT_TIMEOUT constant
        // defined as an integer
        // ...
    }
    
    public function enableLogging(bool $enable): void {
        // Enable or disable logging based on the ENABLE_LOGGING constant
        // defined as a boolean
        // ...
    }
}
```

이 예에서 Configuration 클래스는 유형화된 클래스 상수를 사용하여 기본 시간 초과 및 로깅 설정 옵션을 정의합니다. DEFAULT_TIMEOUT 상수는 INT로 유형이 지정되어 정수 값을 보유하도록 보장하고, ENABLE_LOGGING 상수는 boolean으로 유형이 지정되어 boolean 값을 보유함을 나타냅니다. 이를 통해 클래스 메서드 내에서 이러한 상수를 사용할 때 일관성과 유형 안전성이 증진됩니다.

PHP 8.3에서 유형화된 클래스 상수의 도입은 클래스 정의의 표현성과 신뢰성을 향상시킵니다. 개발자가 클래스 상수에 대한 데이터 유형을 지정할 수 있어 코드 품질 향상, 더 나은 문서 작성, 클래스 상수 내 데이터 유형 오류 가능성 감소에 기여하며, 결국 PHP 애플리케이션의 견고성을 향상시킵니다.

<div class="content-ad"></div>

# 5. 익명 읽기 전용 클래스

익명 읽기 전용 클래스의 소개는 객체 지향 프로그래밍에 새로운 유연성을 가져 왔습니다. 이러한 클래스를 사용하면 명명된 클래스를 명시적으로 정의할 필요 없이 가벼운 불변 객체를 생성할 수 있습니다. 이 기능은 일시적이거나 일회성 객체가 필요한 시나리오에서 특히 유용합니다. 포멀한 클래스 선언의 오버헤드 없이 필요한 임시 객체를 만들 수 있습니다. 이 기능을 몇 가지 예제를 통해 알아봅시다:

```js
$person = new class {
    public function __construct(public string $name, public int $age) {}
};

$john = new $person('John Doe', 30);
echo $john->name; // 출력: John Doe
echo $john->age; // 출력: 30
```

이 예제에서는 '...' 구문을 사용하여 익명 읽기 전용 클래스를 생성합니다. 이 클래스에는 name 및 age에 대한 공용 속성이 있으며, 이 익명 클래스에서 $john 객체가 인스턴스화됩니다. 이를 통해 포멀한 클래스 선언이 필요 없이 간단하고 가벼운 객체를 생성할 수 있습니다.

<div class="content-ad"></div>

익명 읽기 전용 클래스를 데이터 구조로 사용할 수도 있습니다.

```php
$data = new class {
    public array $values = [];

    public function addValue($value): void {
        $this->values[] = $value;
    }
};

$data->addValue('A');
$data->addValue('B');
$data->addValue('C');

print_r($data->values); // 출력: Array ( [0] => A [1] => B [2] => C )
```

이 예제에서는 익명 읽기 전용 클래스를 사용하여 값을 저장하는 간단한 데이터 구조를 만듭니다. 클래스에는 배열을 보유하는 공개 속성 values와 배열에 값을 추가하는 addValue 메서드가 있습니다. 이 예는 공식 클래스 정의 없이 즉석에서 작성된 데이터 구조를 만들기 위해 익명 읽기 전용 클래스를 사용하는 방법을 보여줍니다.

PHP 8.3에서 익명 읽기 전용 클래스가 소개되면서 개발자들은 불변의 객체와 데이터 구조를 가볍고 유연하게 즉석에서 만들 수 있게 되었습니다. 이 기능은 PHP의 객체 지향 기능을 보다 표현력 있고 다용도로 사용할 수 있게 하며, 특정 상황에 대해 전통적인 클래스 선언에 대한 편리한 대안을 제공합니다.

<div class="content-ad"></div>

# 6. 동적 클래스 상수 가져오기

이 기능은 개발자들이 클래스 상수를 더 동적인 구문을 사용하여 가져올 수 있게 해주어 클래스 상수를 다룰 때 더 큰 유연성과 표현력을 제공합니다. 몇 가지 예제를 통해 이 기능을 살펴보겠습니다:

```js
class Configuration {
    public const DEFAULT_TIMEOUT = 30;
    public const ENABLE_LOGGING = true;
}

$constantName = 'DEFAULT_TIMEOUT';
echo Configuration::{$constantName}; // 출력: 30
```

이 예제에서 DEFAULT_TIMEOUT 클래스 상수의 값을 변수 $constantName을 사용하여 동적으로 가져왔습니다. 이 동적 구문을 사용하면 실행 중 값에 따라 클래스 상수를 검색할 수 있어 클래스 상수를 다루는 더 유연한 방법을 제공합니다.

<div class="content-ad"></div>

테이블 태그를 마크다운 형식으로 변경해도 됩니다.

<div class="content-ad"></div>

# 7. 더 적절한 날짜/시간 예외 처리

이 기능은 다양한 날짜 및 시간 관련 특이 케이스에 대한 전용 예외를 도입하여, 날짜 및 시간 연산에서 보다 세분화되고 구체적인 오류 처리를 제공합니다. 이 향상된 기능은 다양한 오류 시나리오에 대해 더 정확한 예외 유형을 제공하여, 날짜 및 시간 관련 코드의 견고성과 신뢰성을 향상시키고자 합니다. 몇 가지 예제와 함께 이 기능을 살펴봅시다:

```js
try {
    // 범위 오류가 발생하는 날짜 연산
    // ...
} catch (DateRangeError $e) {
    // 특정 DateRangeError 예외 처리
    // 에러 로깅, 사용자에게 통보 또는 적절한 조치 취하기
    // ...
} catch (Exception $e) {
    // 일반적인 예외 처리로 이동
    // ...
}
```

이 예제에서는 범위 오류가 발생한 날짜 연산을 처리하기 위해 특정 DateRangeError 예외가 잡힙니다. 이를 통해 날짜 범위 오류에 특화된 오류 처리가 가능해지며, 특정 예외 유형을 기반으로 적절한 조치를 취할 수 있습니다.

<div class="content-ad"></div>

날짜 형식이 잘못된 간격 문자열 예외에 대해서도 처리할 수 있어요.

```js
try {
    // 날짜 간격 파싱 작업
    // ...
} catch (DateMalformedIntervalStringException $e) {
    // 특정 DateMalformedIntervalStringException 처리
    // ...
} catch (Exception $e) {
    // 일반적인 예외 처리로 이동
    // ...
}
```

이 예에서는 DateMalformedIntervalStringException을 사용하여 날짜 간격 문자열이 잘못된 경우 처리합니다. 이 특정 예외 유형을 사용하면 개발자가 날짜 간격 문자열이 잘못된 시나리오에 맞게 맞춤형 오류 처리를 구현할 수 있어요.

PHP 8.3의 "더 적절한 날짜/시간 예외" 기능은 날짜 및 시간 관련 오류 처리에 대해 더 정확하고 체계적인 접근 방식을 제공해요. 특정 날짜 및 시간 예외를위한 전용 예외를 도입함으로써 이 개선 사항은 더 나은 오류 관리를 촉진하고 날짜 및 시간 관련 예외의 보다 효율적인 처리를 돕습니다. 이는 PHP 애플리케이션에서 날짜 및 시간 작업의 전체 신뢰성과 견고성에 기여합니다.

<div class="content-ad"></div>

# 8. unserialize() 오류 처리 기능 개선

이 기능은 unserialize() 함수의 오류 처리 메커니즘을 향상시켜, 데이터의 역직렬화 중 문제가 발생했을 때 더 일관되고 예측 가능한 동작을 제공합니다. 이 개선은 오류 보고를 간소화하고 unserialize() 오류를 보다 효과적으로 처리하여 더 나은 오류 관리와 디버깅 기능을 제공하고 있습니다. 이 기능을 몇 가지 예제와 함께 살펴보겠습니다:

```js
$data = '...'; // 직렬화된 데이터
$result = unserialize($data);
if ($result === false) {
    $error = error_get_last();
    if ($error && $error['type'] === E_WARNING) {
        // unserialize() 오류를 E_WARNING으로 처리
        // 오류 기록, 사용자에게 알림 또는 적절한 조치를 취합니다
        // ...
    } else {
        // 일반적인 오류 처리로 이동
        // ...
    }
}
```

이 예제에서는 데이터의 역직렬화를 시도한 후 결과가 false인지 확인하여 오류를 나타내는지 여부를 확인합니다. 그런 다음 error_get_last()를 사용하여 마지막 오류를 가져와 오류 유형을 확인합니다. 오류 유형이 E_WARNING인 경우, unserialize() 오류를 경고로 처리하여 unserialize() 문제에 대한 특정 오류 처리를 수행할 수 있습니다.

<div class="content-ad"></div>

심지어 unserialize 메서드에서 예외 처리를 사용할 수도 있습니다.

```js
$data = '...'; // 직렬화된 데이터
try {
    $result = unserialize($data);
    // 직렬화 해제된 데이터 처리
    // ...
} catch (UnserializeException $e) {
    // 특정 UnserializeException 처리
    // 오류 기록, 사용자에게 알림 또는 적절한 조치 취함
    // ...
} catch (Exception $e) {
    // 일반적인 예외 처리로 대체
    // ...
}
```

이 예제에서 코드는 직렬화 해제 프로세스를 처리하기 위해 try-catch 블록을 활용합니다. UnserializeException이 발생하면 unserialize() 예외에 대한 특정 오류 처리가 가능하며, 개발자들이 unserialize() 문제에 대한 대상적인 오류 관리를 구현할 수 있도록 합니다.

PHP 8.3의 "Improved unserialize() error handling" 기능은 unserialize() 함수에 대한 더 일관적이고 구조화된 오류 처리를 도입하여, unserialize 데이터의 처리 중 오류 보고 및 관리에 대한 향상된 제어를 제공합니다. 더 예측 가능한 오류 처리 메커니즘을 제공함으로써, 이 개선 사항은 PHP 애플리케이션에서 직렬화된 데이터를 다룰 때 디버깅 능력과 전반적인 오류 내구성을 향상시킵니다.

<div class="content-ad"></div>

# 9. 특성과 정적 속성

이 기능은 정적 속성을 사용하는 관련된 특성의 동작 변경을 소개합니다. 이 향상은 특성을 사용할 때 부모 클래스에서 상속받은 정적 속성의 재선언을 다루며, 각 클래스가 특성을 포함할 때 정적 속성에 대한 별도의 저장소를 유지하도록 보장합니다. 이 동작은 이제 특성 내에서 정적 속성을 직접 클래스에 추가하는 것과 유사해졌으며, 특성 내에서 정적 속성을 보다 예측 가능하고 일관된 방식으로 다루도록 장려합니다. 몇 가지 예제를 통해 이 기능을 살펴보겠습니다:

```js
trait Loggable {
    protected static $log = [];

    public static function addToLog($message) {
        self::$log[] = $message;
    }

    public static function getLog() {
        return self::$log;
    }
}

class User {
    use Loggable;
}

class Product {
    use Loggable;
}

User::addToLog('사용자가 로그인했습니다');
Product::addToLog('새 제품이 추가되었습니다');

var_dump(User::getLog());
var_dump(Product::getLog());
```

이 예제에서 Loggable 특성은 $log라는 정적 속성과 로그에 메시지를 추가하고 로그를 검색하는 메서드를 포함합니다. User 및 Product 클래스는 Loggable 특성을 사용하여 로깅 기능을 통합합니다. 각 클래스는 정적 속성 $log을 위한 별도의 저장소를 유지함으로써 User 및 Product 클래스 간에 로그 데이터가 격리되고 구분되도록 보장합니다.

<div class="content-ad"></div>

테이블 태그를 Markdown 형식으로 바꿀 수도 있어요.

```js
trait Counter {
    protected static int $count = 0;

    public static function increment() {
        self::$count++;
    }

    public static function getCount() {
        return self::$count;
    }
}

class Order {
    use Counter;
}

class Invoice {
    use Counter;
}

Order::increment();
Invoice::increment();
Order::increment();

var_dump(Order::getCount()); // Output: int(2)
var_dump(Invoice::getCount()); // Output: int(1)
```

이 예시에서, Counter 트레이트는 정적 속성 $count를 초기화하고 카운트를 증가시키고 카운트 값을 검색하는 메서드를 제공합니다. Order와 Invoice 클래스는 카운트를 별도로 추적하기 위해 Counter 트레이트를 사용합니다. 각 클래스는 자체 카운트를 유지하며, 트레이트 내 정적 속성의 별도 저장을 보여 주어 다른 클래스의 정적 속성과는 별개로 작동하는 것을 보여줍니다.

PHP 8.3의 "Traits and static properties" 기능은 여러 클래스에서 사용될 때 정적 속성을 일관되고 예측 가능하게 구현함으로써 trait를 사용한 코드 구조에서 정적 속성을 처리하는 강력하고 직관적인 메커니즘을 제공합니다.

<div class="content-ad"></div>

# 10. 스택 오버플로 감지

이 기능은 스택 오버플로 상황을 감지하고 방지하기 위해 zend.max_allowed_stack_size와 zend.reserved_stack_size라는 두 가지 새로운 ini 지시문을 소개합니다. 이 향상된 기능은 스택 오버플로 상황을 감지하고 처리함으로써 PHP 애플리케이션의 신뢰성과 안정성을 향상시키고 세그멘테이션 오류의 가능성을 줄이며 디버깅을 쉽게 만드는 것을 목표로 합니다. 몇 가지 예시를 통해 이 기능을 살펴보겠습니다:

```js
// php.ini
zend.max_allowed_stack_size = 128K
```

이 예시에서는 php.ini 구성 파일에서 zend.max_allowed_stack_size 지시문이 128 킬로바이트로 설정되어 있습니다. 이 지시문은 PHP 프로그램의 최대 허용 스택 크기를 지정하는데, 개발자가 호출 스택 크기의 상한선을 정의할 수 있게 합니다.

<div class="content-ad"></div>

```js
// php.ini
zend.reserved_stack_size = 16K

// PHP 코드
function recursiveFunction($n) {
    if ($n <= 0) {
        return;
    }
    recursiveFunction($n - 1);
}

recursiveFunction(100000); // 큰 수로 재귀 호출

```

이 예제에서는 php.ini 구성 파일에서 zend.reserved_stack_size 지시문이 16 킬로바이트로 설정되어 있습니다. PHP 코드는 재귀 호출을 많이 수행하는 재귀 함수를 포함하고 있으며, 재귀 호출이 많아져 스택 오버플로 상황이 발생할 수 있습니다. zend.reserved_stack_size 지시문을 사용하면 PHP가 호출 스택이 오버플로우 직전에 있는지 감지하여 상황을 처리하고 오류를 throw하여 세그멘테이션 오류를 방지하며 디버깅을 용이하게 합니다.

PHP 8.3의 "스택 오버플로우 감지" 기능은 개발자가 호출 스택 크기에 제한을 설정하고 잠재적인 스택 오버플로우 상황을 감지하는 수단을 제공하여 PHP 응용 프로그램의 안정성과 견고성을 향상시킵니다. 이 ini 지시문을 통해 PHP는 스택 오버플로우 상황에 대한 개선된 오류 처리를 제공하며 세그멘테이션 오류의 발생 가능성을 줄이고 더욱 효과적인 디버깅 과정을 용이하게 합니다.

# 11. 불변 상수 가시성


<div class="content-ad"></div>

이 기능은 invariant 키워드를 사용하여 클래스 상수를 선언하는 기능을 소개합니다. 이를 통해 클래스의 상수의 가시성이 하위 클래스에서 확장되더라도 불변으로 유지될 수 있습니다. 이 향상된 기능은 클래스 상수를 정의하는 더 명시적이고 제어된 방법을 제공하며, 상속 계층 구조에서 상수의 가시성을 유지할 수 있습니다. 몇 가지 예제를 통해 이 기능을 살펴보겠습니다:

```js
class ParentClass {
    public invariant int MAX_VALUE = 100;
}

class ChildClass extends ParentClass {
    // MAX_VALUE의 가시성을 변경하려고 시도하면 컴파일 오류가 발생합니다
    protected invariant int MAX_VALUE = 200;
}
```

이 예에서 ParentClass는 public invariant 상수인 MAX_VALUE를 값 100으로 선언합니다. ChildClass는 MAX_VALUE의 가시성을 protected로 변경하려고 시도하면 컴파일 오류가 발생하여 상속 계층 구조 전체에서 상수의 불변 가시성이 강제됩니다.

인터페이스에서도 invariant 상수를 사용할 수 있습니다.

<div class="content-ad"></div>

```js
인터페이스 Constants {
    공개 불변의 문자열 VERSION = '1.0';
}

클래스 ImplementationClass는 Constants를 구현합니다 {
    // VERSION의 가시성은 구현 클래스에서도 공개로 유지되어야 합니다
    개인 불변의 문자열 VERSION = '2.0';
}
```

이 예에서 Constants 인터페이스는 값이 ‘1.0’인 공개 불변 상수 VERSION을 선언합니다. ImplementationClass가 VERSION의 가시성을 개인으로 변경하려고 하면 컴파일 오류가 발생하여 상수의 가시성이 인터페이스에서 지정한 대로 불변으로 유지되도록 합니다.

PHP 8.3의 “불변 상수 가시성” 기능은 클래스 상수를 정의하는 더 견고하고 명시적인 방법을 제공하여 상수의 가시성이 상속 계층 구조나 인터페이스 구현에서 일관되게 유지되도록 보장합니다. 이 개선은 코드의 유지 보수성을 높이고 상수의 가시성에 의도하지 않은 변경이 발생할 가능성을 줄여 PHP 코드베이스의 전체 신뢰성과 예측 가능성을 향상시킵니다.

# 12. Assert String Eval Cleanup


<div class="content-ad"></div>

이 기능은 문자열 평가 코드 어설션의 폐기를 포함하며, 더 안전하고 유지보수가 용이한 코딩 관행을 장려합니다. 이 개선은 문자열 평가 코드를 통한 어설션 사용을 억제하여 보안 취약점 및 코드 유지 관리 도전에 대응합니다. 몇 가지 예제를 통해 이 기능을 살펴보겠습니다:

```js
assert('is_numeric($value)');
```

이 예에서는 assert 함수가 $value가 숫자인지 확인하기 위해 문자열 평가 코드 어설션과 함께 사용됩니다. 그러나 이 방식은 보안 위험에 노출되어 있으며 PHP 8.3에서는 폐기됩니다.

여기서는 직접 표현식을 사용한 어설션의 업데이트된 버전을 표시합니다.

<div class="content-ad"></div>


```js
assert(is_numeric($value));
```

PHP 8.3에서는 단언문에 문자열 평가 코드 대신 직접 표현식을 사용하는 것이 권장됩니다. 단언문 내에서 is_numeric 함수를 직접 호출함으로써 코드를 더 안전하고 유지보수하기 쉽게 만들 수 있습니다.

PHP 8.3의 "Assert String Eval Cleanup" 기능은 개발자들이 단언문에 문자열 평가 코드 대신 직접 표현식을 사용하도록 전환하도록 권장하며, 더 안전하고 신뢰할 수 있는 코딩 관행을 촉진합니다. 이 접근 방식을 deprecated 처리함으로써 PHP는 코드 보안과 유지보수성을 향상시키고, PHP 애플리케이션의 전체적인 견고성에 기여하고 있습니다.

# 13. 향상된 FFI\CData:void


<div class="content-ad"></div>

이 기능은 FFI (외부 함수 인터페이스) 확장 기능을 향상시켜 C 함수가 void 반환 유형을 가질 때 PHP에서 FFI\CData`void` 인스턴스를 반환하는 대신 null로 표시할 수 있도록 합니다. 이 개선을 통해 값을 반환하지 않는 C 함수를 처리하기가 더 간편해지며, PHP에서 예상하는 null 반환 유형과 일치시킵니다. 몇 가지 예제를 통해 이 기능을 살펴보겠습니다:

```js
// C 코드
void myFunction() {
    // 함수 구현
}

// PHP FFI
$ffi = FFI::cdef("
    void myFunction();
", "mylib.so");

$ffi->myFunction(); // C 함수 호출
```

이 예제에서 C 함수 myFunction은 void 반환 유형을 가지고 있습니다. PHP 8.3에서 FFI를 사용하여이 함수를 호출할 때 반환 값은 FFI\CData`void` 인스턴스가 아닌 null이 됩니다. void를 반환하는 C 함수를 처리하기가 간단해집니다.

다음과 같이 반환 유형을 확인할 수도 있습니다:

<div class="content-ad"></div>

```php
$result = $ffi->myFunction();

if ($result === null) {
    echo "함수가 성공적으로 실행되고 null을 반환했습니다.";
} else {
    echo "예기치 않은 반환 값입니다.";
}
```

이 예제에서는 C 함수 myFunction의 반환 값을 확인합니다. 반환 값이 null이면 함수가 성공적으로 실행되고 값을 반환하지 않았음을 나타내며, void를 반환하는 함수에 대한 예상 동작과 일치합니다.

PHP 8.3의 "Improved FFI\CData:void" 기능은 PHP에서 void를 반환하는 C 함수를 간소화하여 FFI를 통한 이러한 함수와의 상호 작용을 단순화합니다. PHP에서 이러한 함수를 null로 표현할 수 있도록 함으로써, 이 향상은 값을 반환하지 않는 C 함수를 다룰 때 더 직관적이고 일관된 FFI 경험에 기여합니다.

# 14. posix_getrlimit() 매개변수 향상

<div class="content-ad"></div>

이 기능은 posix_getrlimit() 함수에 개선 사항을 소개합니다. 선택적 매개변수를 전달하여 단일 리소스 제한을 가져올 수 있도록 허용합니다. 이 향상된 기능은 특정 리소스에 대한 자원 제한을 검색할 때 더 큰 유연성과 정밀도를 제공함으로써 PHP 애플리케이션 내에서 자원 한도에 대한 자세한 정보를 획득하는 프로세스를 간소화합니다. 몇 가지 예제를 통해 이 기능을 살펴보겠습니다:

```js
// 최대 열린 파일 수에 대한 소프트 제한 가져오기
$softLimit = posix_getrlimit(posix_RLIMIT_NOFILE, POSIX_RLIMIT_SOFT);
echo "최대 열린 파일 수에 대한 소프트 제한: " . $softLimit . "\n";
```

이 예제에서 posix_getrlimit() 함수는 최대 열린 파일 수에 대한 소프트 제한을 가져오는 데 사용됩니다. 선택적 매개변수 POSIX_RLIMIT_SOFT를 사용하여 함수는 특정 리소스 제한을 검색하고 반환하여 리소스 사용에 대한 자세한 정보를 제공합니다.

심지어 CPU 시간에 대한 하드 제한도 가져올 수 있습니다.

<div class="content-ad"></div>

```js
// CPU 시간의 하드 제한을 가져오는 중
$hardLimit = posix_getrlimit(posix_RLIMIT_CPU, POSIX_RLIMIT_HARD);
echo "CPU 시간의 하드 제한: " . $hardLimit . "\n";
```

이 예제에서는 posix_getrlimit() 함수를 사용하여 CPU 시간의 하드 제한을 얻는 방법을 보여줍니다. 선택적 매개변수로 POSIX_RLIMIT_HARD를 지정하여 함수는 특정 리소스 제한을 검색하고 반환하여 리소스 사용 세부 정보에 정확하게 액세스할 수 있도록 합니다.

PHP 8.3의 "posix_getrlimit() 매개변수 개선"은 개발자가 개별 리소스 제한을 쉽게 가져올 수 있는 능력을 부여합니다. 개별 리소스 제한을 가져오는 접근 방식을 제공하여 리소스 사용 정보를 더 세부적으로 확인할 수 있도록 합니다. 이 개선은 리소스 제한과 관련된 더 세밀하고 유연한 작업을 향상시키며, PHP 애플리케이션 내에서 유효한 리소스 관리에 필수적인 세부 리소스 제한 정보를 제공합니다.

# 15. gc_status() 개선내용

<div class="content-ad"></div>

gc_status() 함수가 개선되어 PHP 애플리케이션 내에서 메모리 관리 및 가비지 수집에 대한 상세 정보를 제공하는 총 여덟 가지 새로운 필드가 도입되었습니다. 이러한 필드는 실제 가비지 수집이 실행 중인지, 메모리 블록이 가비지 수집으로부터 보호되는지, 가득찬 가비지 수집 주기가 진행 중인지 등 다양한 측면에 대한 세부 정보를 제공합니다.
새로운 필드 목록은 다음과 같습니다:

- "running" =` bool: 현재 가비지 수집이 실행 중인지를 나타냅니다.
- "protected" =` bool: 메모리 블록이 가비지 수집으로부터 보호되는지를 나타냅니다.
- "full" =` bool: 완전한 가비지 수집 주기가 진행 중인지를 나타냅니다.
- "buffer_size" =` int: 가비지 수집을 위한 버퍼 크기를 바이트 단위로 지정합니다.
- "application_time" =` float: 가비지 수집 주기를 포함한 총 응용 프로그램 실행 시간을 나타냅니다.
- "collector_time" =` float: 소멸자의 실행 및 값의 해제를 포함하여 수집 주기에 소요된 시간을 반영합니다.
- "destructor_time" =` float: 수집 주기 동안 소멸자를 실행하는 데 사용된 시간을 나타냅니다.
- "free_time" =` float: 수집 주기 동안 값들을 해제하는 데 사용된 시간을 나타냅니다.

이러한 필드에 접근하여 개발자들은 가비지 수집 상태, 메모리 보호, 수집 주기 시간, 리소스 활용 등에 대한 가치 있는 통찰을 얻을 수 있습니다. 이러한 상세 정보는 개발자들이 메모리에 관련된 결정을 내릴 때 인포메이션을 바탕으로 신중한 판단을 할 수 있도록 돕습니다.

<div class="content-ad"></div>

# 16. 내부 클래스에 대한 class_alias() 지원

이 기능은 class_alias() 함수의 기능을 확장하여 내부 PHP 클래스에 대한 별칭을 생성할 수 있도록 지원합니다. 이 향상된 기능은 내부 클래스를 다룰 때 더 많은 유연성과 편의성을 제공하여, 기존 내부 클래스에 대한 대체 이름을 생성할 수 있게 해줍니다. 이를 통해 클래스 참조를 간단히 하고 코드 가독성을 높일 수 있습니다. 아래 예시를 통해 이 기능을 살펴보겠습니다:

```js
class_alias('DateTime', 'MyDateTime');
```

이 예시에서는 class_alias() 함수를 사용하여 내부 PHP 클래스 DateTime에 대한 별칭 MyDateTime을 생성합니다. 이를 통해 개발자는 코드베이스 전반에서 MyDateTime이라는 별칭을 사용하여 DateTime 클래스에 참조할 수 있게 되며, 해당 클래스에 대해 더 명확하고 맥락적인 이름을 제공할 수 있습니다.

<div class="content-ad"></div>

내부 클래스 초기화를 위해 클래스 별칭을 사용할 수도 있어요.

```js
$date = new MyDateTime('2023-11-24');
echo $date->format('Y-m-d');
```

이 예제에서 MyDateTime 별칭은 내부 클래스 DateTime의 객체를 생성하는 데 사용되었어요. 이 별칭은 클래스 인스턴스 생성에 더 직관적이고 의미 있는 이름을 제공하여 코드의 가독성과 유지 보수성을 높여줍니다.

PHP 8.3의 "내부 클래스에 대한 class_alias() 지원" 기능은 내부 클래스에 별칭을 만드는 프로세스를 간소화하여 개발자들에게 내부 클래스에 대한 대체 이름을 정의할 수 있는 편리한 메커니즘을 제공합니다. 이 개선으로 PHP 애플리케이션 내에서 보다 명확하고 읽기 쉬운 클래스 참조를 제공하여 더 표현적이고 일관성 있는 코드베이스로의 기여가 가능해집니다.

<div class="content-ad"></div>

# 17. mysqli_poll() 오류 처리

이 기능은 오류 처리와 관련된 동작 변경을 소개합니다. 특히, mysqli_poll() 함수를 호출할 때 읽기 및 오류 인수를 제공하지 않으면 이제 ValueError가 발생합니다. 이 향상은 mysqli_poll() 함수가 적절한 인수를 사용하여 사용되며, 비동기적 MySQL 쿼리 실행과 관련된 시나리오에서 더 견고하고 예측 가능한 오류 처리를 촉진합니다. 이 동작을 설명하기 위해 예제를 살펴봅시다:

```js
$links = [...]; // MySQL 링크 배열
$read = $error = $reject = [];
if (mysqli_poll($links, $read, $error, $reject, $timeout)) {
    // 결과 처리
    foreach ($read as $link) {
        // 성공한 쿼리 실행 처리
    }
    foreach ($error as $link) {
        // 쿼리 실행 오류 처리
    }
    foreach ($reject as $link) {
        // 거부된 연결 처리
    }
} else {
    // 폴링 오류 처리
}
```

이 예제에서 mysqli_poll() 함수는 $read, $error, $reject 배열을 포함한 올바른 인수와 함께 호출됩니다. 이 사용법은 PHP 8.3의 업데이트된 동작을 준수하며, 폴링 작업 결과를 처리하기 위해 필요한 인수로 함수가 호출되도록 보장합니다.

<div class="content-ad"></div>

read나 error 인자가 전달되지 않을 때 ValueError를 발생시키는 PHP 8.3은 더 명시적이고 신뢰할 수 있는 오류 처리 방법을 장려하며, mysqli_poll() 호출에 필요한 모든 인자를 제공하도록 개발자들을 격려합니다. 이 개선으로 PHP 애플리케이션에서 비동기 MySQL 쿼리 실행의 전체적인 견고성과 예측 가능성이 향상됩니다.

## array_pad() 기능 향상

이 기능은 array_pad() 함수를 사용하여 한 번에 추가할 수 있는 요소 수에 대한 이전 제한을 제거합니다. 이 개선 이전에 배열을 패딩할 때 한 번에 최대 1048576개의 요소만 추가할 수 있었습니다.

그러나 PHP 8.3에서 소개된 개선으로, array_pad() 함수는 이제 배열이 가질 수 있는 최대 요소 수만 제한으로 나타냅니다. 이를 통해 개발자들은 더 큰 유연성을 가지고 이전의 배열 패딩 작업을 통해 추가할 수 있는 요소 수에 대한 제약을 제거할 수 있습니다.

<div class="content-ad"></div>

이 향상은 배열을 훨씬 많은 요소로 채우는 것을 가능하게 하며, 기존 제한으로 인해 배열 크기가 제한되지 않고 다양한 크기의 배열을 다룰 수 있도록 합니다. 결과적으로, 개발자는 array_pad() 함수를 보다 효과적으로 활용하여 배열 조작과 동적 크기 조정이 필요한 시나리오에서 유연성과 확장성을 향상시키는데 기여하며, PHP 애플리케이션 내에서 배열 패딩 작업의 유연성과 확장성을 향상시킵니다.

# 19. opcache.consistency_checks ini 지시문 제거

이 기능은 이전에 OPCache에서 일관성 검사를 활성화 또는 비활성화하는 데 사용되었던 opcache.consistency_checks ini 지시문의 제거를 나타냅니다. 이러한 제거로 인해 opcache.consistency_checks 지시문을 관리할 필요가 없어지며, OPCache 설정 및 유지 관리 프로세스를 간소화하여 OPCache 구성을 단순화합니다. 이 변경이 OPCache 구성에 미치는 영향에 대한 예시는 다음과 같습니다:

이전 OPCache 설정과 opcache.consistency_checks.

<div class="content-ad"></div>

```js
opcache.consistency_checks=1
```

이 예제에서는 opcache.consistency_checks 지시문을 1로 설정하여 OPCache의 일관성 검사를 활성화합니다.

PHP 8.3에서 opcache.consistency_checks 지시문이 삭제되면 OPCache의 일관성 검사 구성이 더 이상 필요하지 않아져 OPCache 구성 프로세스가 간소화됩니다.

이 변경은 OPCache 구성에 대한 단순화된 접근 방식을 반영하며, OPCache의 일관성 검사를 관리하는 복잡성을 줄이고 PHP 8.3에서 OPCache의 전체 효율성과 사용 편의성을 향상시키는 목표와 일치합니다.


<div class="content-ad"></div>

# 20. number_format()을 사용하여 소수점 처리하는 방법

이 함수는 $decimal 매개변수를 올바르게 처리하도록 개선되었습니다. 이제 $decimal에 음수 정수가 올바르게 처리됩니다. $decimal에 음수 값을 사용하여 반올림하면 $num이 소수점 이전의 지정된 유효 숫자 자릿수로 반올림됩니다. 이전에는 음수 $decimal이 무시되고 숫자가 소수점 이하 자릿수가 0으로 반올림되었습니다. 몇 가지 예제를 통해 이 기능을 살펴보겠습니다:

```js
$num = 1234.56789;
$formatted1 = number_format($num, 2); // 1,234.57
$formatted2 = number_format($num, -2); // 1,200
```

이 예제에서 number_format() 함수는 음수 $decimal 값을 올바르게 처리하여 숫자를 지정된 유효 숫자 자릿수로 소수점 이전에 반올림합니다.

<div class="content-ad"></div>

이 업그레이드는 number_format() 함수를 사용하여 숫자를 반올림할 때 더 일관성 있고 예측 가능한 동작을 보장하여 개발자들이 숫자 값의 형식을 더 잘 제어할 수 있도록 합니다.

축하합니다! PHP 8.3에서 소개된 상위 20가지 기능과 개선 사항에 대해 학습을 완료했습니다. 이 최신 릴리스는 계속 변화하는 개발자들과 기업들의 요구에 부합하는 다양한 개선 사항을 제공하여 더 효율적이고 신뢰할 수 있으며 유지보수가 쉬운 코드를 작성할 수 있도록 지원합니다.