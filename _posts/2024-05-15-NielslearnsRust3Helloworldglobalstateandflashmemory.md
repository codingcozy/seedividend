---
title: "Niels가 Rust 3을 배우다 - Hello world, 전역 상태 및 플래시 메모리"
description: ""
coverImage: "/assets/img/2024-05-15-NielslearnsRust3Helloworldglobalstateandflashmemory_0.png"
date: 2024-05-15 16:16
ogImage: 
  url: /assets/img/2024-05-15-NielslearnsRust3Helloworldglobalstateandflashmemory_0.png
tag: Tech
originalTitle: "Niels learns Rust 3 — Hello world!, global state, and flash memory"
link: "https://medium.com/@nielsreijers/niels-learns-rust-3-debug-prints-global-state-and-flash-memory-c29a69023612"
isUpdated: true
---




이것은 내가 임베디드 Java 가상 머신을 Rust로 이식하면서 Rust 학습하는 여정을 문서화한 시리즈의 일부 3입니다.

지난 단계 이후에는 Rust 코드를 타깃 플랫폼인 AVR 계열 임베디드 CPU인 특히 ATmega128을 위해 컴파일할 수 있게 되었으며, Avrora AVR 시뮬레이터에서 결과 이진 파일을 실행할 수 있게 되었습니다. 그러나 아직 출력을 표시할 수는 없었어요.

이 게시물에서는 디버그 출력을 추가할 것입니다. 쉬운 작업일 줄 알았지만, 실제로는 Rust에 대해 더 많이 배우게 해주는 각각의 작은 단계들을 거쳐 많은 시간이 걸려버렸어요.

![이미지](/assets/img/2024-05-15-NielslearnsRust3Helloworldglobalstateandflashmemory_0.png)



# 콘솔에 출력하기

일반 Rust에서 콘솔에 출력하는 것은 쉽습니다: println!은 표준 출력에, eprintln!은 표준 에러 출력에 값을 출력합니다. 빠른 디버깅을 위해 dbg!()는 매우 편리합니다: 전달된 값으로 반환되며, 해당 값을 표준 에러에 출력합니다.

```js
fn main() {
    let a = 42;
    let b = dbg!(a);
    println!("b = {}", b);
}
```

위 코드는 출력된다:



```js
[src/main.rs:3] a = 42 
b = 42
```

첫 번째 줄은 stderr로 보내지고, 두 번째 줄은 stdout로 보냅니다.

그러나 저는 임베디드 프로세서 클래스 AVR을 위한 VM을 개발 중입니다. AVR은 운영 체제가 없기 때문에 stdout 또는 stderr로 출력할 수 없습니다. 내 코드가 무엇을 하는지 확인하기 위해 어떻게 출력할 수 있을까요?

CPU에는 출력을 전송할 수 있는 UART가 있습니다. 물리적인 보드를 사용하는 경우에는 좋은 방법일 수 있습니다. 그러나 이 경우에는 코드가 Avrora 시뮬레이터에서 실행되므로 다른 옵션이 있습니다: 잘 정의된 메모리 위치를 통해 출력합니다.



# C-Print 모니터

Avrora에는 AVR 상에서 코드의 실행을 추적할 수 있는 여러 '모니터'가 있습니다. 이전 게시물에서는 메모리 및 스택 모니터를 활성화하여 메모리 접근을 추적하고 스택 성장을 지켜냈습니다. 다른 모니터는 c-print입니다. 이 모니터는 특정 메모리 위치로의 쓰기를 모니터링하여 출력을 생성합니다.

감시되는 위치는 단일 바이트입니다. 일부 작업에는 이게 충분합니다. 예를 들어, 0x0E를 쓰면 Avrora가 CPU 레지스터의 내용을 출력합니다.

다른 작업은 매개변수를 필요로 합니다. 이는 다음 2 또는 4바이트에서 읽습니다. 예를 들어, 0x05를 마법의 위치에 쓰면 다음 4바이트의 내용이 부호 없는 32비트 정수(little endian)로 출력됩니다.



아브로라는 특정 심볼인 debugbuf1을 찾아 메모리 위치를 모니터링합니다.

![이미지](/assets/img/2024-05-15-NielslearnsRust3Helloworldglobalstateandflashmemory_1.png)

이 출력물은 이 게시물의 완성된 코드에서 가져온 것입니다. 아브로라는 주소 0x0210에 있는 바이트를 모니터링하고, 코드가 해당 주소에 쓰기를 할 때 c-print 모니터를 트리거합니다.

위의 출력물에서 표시된 매우 높은 주소에 유의하십시오. 하버드 아키텍처인 AVR은 코드(플래시 메모리)와 RAM을위한 별도의 주소 공간을 갖습니다. binutils toolchain은 이것을 위한 것이 아니었지만, 이를 해결하기 위해 avr 버전은 RAM을 0x00800000 또는 8MB에서 시작하는 주소에 매핑하여 AVR CPU의 플래시 용량을 훨씬 초과하는 곳에 위치시킵니다.



# Rust에서의 전역 상태

우리는 쓸 수 있는 전역 변수가 필요합니다. 프로그래밍 기초 강의에서는 전역 가변 상태가 좋지 않다고 말하지만, 때로는 그런 유효한 이유가 있고, 이것은 그 중 하나입니다.

Rust에서 어떻게 전역 가변 상태를 가질 수 있을까요? Rust는 안전을 중요시하며, 전역 가변 상태는 본질적으로 안전하지 않습니다.

우리는 변수를 다음과 같이 선언할 수 있습니다. static mut debugbuf1: [u8; 5] = [0, 0, 0, 0, 0];. 이는 작동하지만 Rust는 누구든 접근할 수 있기 때문에 그 안전을 보장할 방법이 없습니다. AVR에는 다중 스레드 운영 체제가 없습니다(실제로는 있지만, 이 경우에는 해당되지 않음).



만약 Rust가 코드가 안전하다고 증명하지 못하면, 우리에게 명시적으로 알려주길 원합니다. 따라서 우리는 static mut 변수를 선언할 수 있지만, 그것에 접근하는 유일한 방법은 unsafe ' ... ' 블록 내에서입니다.

# std::sync::RwLock

위의 방법은 AVR에 사용할 것이지만, 이 블로그는 Rust 학습에 관한 것이므로 때로는 이 프로젝트에는 작동하지 않을 수도 있는 내용을 좀 순회해볼 겁니다. 

Rust에서 전역 상태에 대한 기사를 찾아보다가 흥미로운 내용을 많이 설명한 이 작은 보석을 발견했습니다. 자세히 검토해보고 다시 돌아와야 할 것이지만, 한 댓글이 눈에 띄었습니다:



이것이 궁금해졌어요. 안전한 패턴들은 무엇일까요? 좀 더 찾아보니 표준 라이브러리에 두 가지 유용한 도우미 클래스가 있다는 걸 알았어요: std::sync::Mutex`T` 와 std::sync::RwLock`T`.

그들을 사용하는 방법은 상당히 간단해요. Mutex는 RwLock과 비슷하지만 리더와 라이터를 구별하지 않아요. RwLock가 어떻게 작동하는지 보여드리겠어요:

```js
use std::sync::RwLock;

static LOCK: RwLock<u8> = RwLock::new(5);

fn main() {
    // 여러 리더 락을 동시에 보유할 수 있어요
    {
        let r1 = LOCK.read().unwrap();
        let r2 = LOCK.read().unwrap();
        assert_eq!(*r1, 5);
        assert_eq!(*r2, 5);
    } // 이 시점에서 리더 락이 해제돼요

    // 그러나 한 번에 한 개의 라이터 락만 보유할 수 있어요
    {
        let mut w = LOCK.write().unwrap();
        *w += 1;
        assert_eq!(*w, 6);
    } // 이 시점에서 라이터 락이 해제돼요

    // 따라서 이 블록에서 새로운 라이터 락을 얻을 수 있지만,
    // 이 두 블록을 하나로 합치면 데드락이 발생할 수 있어요
    {
        let mut w2 = LOCK.write().unwrap();
        *w2 += 1;
        assert_eq!(*w2, 7);
    } //

    println!("Done.");
}
```

Playground에서 시도해보세요!



리소스를 `RwLock`으로 래핑하면 해당 리소스에 대해 여러 읽기 전용 참조 또는 단일 변경 가능한 참조를 얻을 수 있습니다.

VS Code를 사용할 때 유형 힌트를 통해 `read()` 또는 `write()`를 호출할 때 단순히 `u8`에 대한 참조(&u8 또는 mutable &mut u8)가 아니라 `RwLockReadGuard<u8>` 또는 `RwLockWriteGuard<u8>`를 얻을 수 있습니다:

![이미지](/assets/img/2024-05-15-NielslearnsRust3Helloworldglobalstateandflashmemory_2.png)

다시 한 번, Rust의 좋은 점은 쉽게 구현을 살펴볼 수 있다는 것입니다.



구현 세부 사항은 아직 조금 어려워 보이지만, 두 가지가 모두 Deref`T` 트레이트 (여기서 T는 u8)를 구현한다는 사실은 명백합니다. 이것이 Rust가 우리가 그들을 &u8로 암시적으로 변환할 수 있도록 허용하는 이유입니다. 또한 write 가드는 DeferMut`T`도 구현하므로 그것을 &mut u8로 변환할 수 있습니다.

같은 파일에서 두 가지가 모두 Drop 트레이트를 구현하고 있고, drop() 함수는 read_unlock() 또는 write_unlock()를 호출하여 잠금을 해제합니다. Rust는 값이 스코프를 벗어나는 즉시 값을 삭제할 것이기 때문에 중간 블록의 끝에 w 잠금이 해제되는 것입니다. 두 블록을 병합하면 데드락이 발생할 수 있지만, 두 번째 쓰기 잠금을 요청하기 전에 명시적으로 drop(w);를 추가하면 데드락을 방지할 수 있습니다.

이러한 트레이트의 구현은 모두 안전하지 않은 ' ' 코드입니다. 실제로 안전하지 않지는 않습니다. 안전하지 않은 것은 사실 "확인되지 않은"을 의미합니다: 컴파일러가 코드가 안전하다고 확신할 수 없지만, 안전하다면 그것을 사용하는 모든 코드도 안전할 것입니다.

그러나 이 코드가 경쟁 조건을 피하기 때문에 안전하다는 점은 중요하지만, 데드락을 방지하지는 않으며 빠르기 때문에 되어야 하는 것도 아닙니다. 잠금이 해제될 때까지 기다리는 것은 성능 병목 지점이 될 수 있기 때문에 공유 상태는 항상 복잡합니다.



# libcore과 libstd

이것은 안전하지 않은 코드를 피하기 위한 좋은 대안으로 보였지만 안탤레 이비이어에선 사용할 수 없습니다. 사용한 템플릿에서 생성된 코드의 첫 줄이 그 이유입니다: #![no_std] (느낌표는 해당 속성이 전체 크레이트에 적용됨을 나타냅니다).

no_std는 Rust에게 std 크레이트에 연결되지 말 것을 알려주므로 std::에 있는 것은 사용할 수 없습니다. 오직 core 크레이트만 사용할 수 있습니다.

문서에서는 이것을 명확하게 설명합니다: libcore와 libstd는 두 가지 주요 크레이트입니다. 첫 번째인 libcore는 항상 사용 가능하며, 원시 타입, Option`T`와 Result`T,E`와 같은 기본 언어 구조, assert 등이 들어 있습니다.



두 번째로 libstd는 훨씬 더 크며 운영 체제에 의존하는 많은 구성을 포함하고 있습니다. 이것은 std/src/lib.rs 소스를 확인하여 libcore의 상위 집합임을 알 수 있습니다.

```js
#[stable(feature = "rust1", since = "1.0.0")]
pub use core::any;
#[stable(feature = "core_array", since = "1.36.0")]
pub use core::array;
#[unstable(feature = "async_iterator", issue = "79024")]
pub use core::async_iter;
....
```

이것은 러스트에서 흔한 패턴이며, pub use는 다른 크레이트나 모듈에서 기능을 가져와 현재 위치에서 다시 내보내는 역할을 합니다. 요약하면 libcore로 내보내는 모든 것이 libstd로도 내보내집니다.

이를 알고 있으니, atomicity와 안전을 보장하기 위해 일부 운영 체제 원시 개념에 의존하는 것이 필요한 RwLock이 libstd에 존재하는 것이 이치에 맞습니다. 유감스럽게도 AVR에는 운영 체제가 없으므로 이 프로젝트에는 RwLock이 사용되지 않습니다.



# AVR에서의 전역 상태

`RwLock<T>`를 사용할 수 없기 때문에 static mut debugbuf1 변수를 사용해야 합니다. 먼저 모든 레지스터를 출력하는 매개변수가 없는 간단한 옵코드를 고려해 봅시다.

첫 번째 시도는 다음과 같을 수 있습니다:

```js
#[allow(non_upper_case_globals)]
static mut debugbuf1: u8 = 0;

const AVRORA_PRINT_REGS: u8 = 0xE;

#[arduino_hal::entry]
fn main() -> ! {
    loop {
        unsafe {
            debugbuf1 = AVRORA_PRINT_REGS;
        }
        arduino_hal::delay_ms(1000);
    }
}
```



`#[allow(non_upper_case_globals)]`는 경고를 억제합니다. Rust는 전역 변수에 대문자 이름을 사용하기를 선호합니다.

테스트하기 위해 .cargo/config.toml에 c-print 모니터를 추가하고 다른 것들을 제거하세요:

```js
[target.'cfg(target_arch = "avr")']
runner = "java -jar ../avrora/avrora-beta-1.7.117.jar -monitors=c-print -single -platform=mica2"
```

안타깝게도, 이것은 작동하지 않습니다:




![Image](/assets/img/2024-05-15-NielslearnsRust3Helloworldglobalstateandflashmemory_3.png)

Avrora는 Rust의 관점에서 debugbuf1이름을 찾을 수 없습니다. 아무도 해당 값을 읽지 않아서 최적화기가 완전히 제거했기 때문입니다. 우리는 C의 volatile 키워드와 동등한 것이 필요합니다.

다행히 Rust에는 정확히 그 역할을 하는 함수가 있습니다.

참조(&mut) 대신 *mut을 사용해야 합니다. 참조가 아닌 원시 포인터가 필요합니다. 원시 포인터는 본질적으로 C 포인터이며, 이를 역참조하는 것은 안전하지 않습니다.




최초에는 이렇게 시도해 봤어요. 왜냐하면 참조인 &T가 자동으로 *T로 변환될 수 있거든. 해제된 포인터를 사용하는 건 안전하지 않지만, 만드는 건 괜찮아요.

```js
use core::ptr::write_volatile;

#[allow(non_upper_case_globals)]
static mut debugbuf1: u8 = 0;

const AVRORA_PRINT_REGS: u8 = 0xE;

#[arduino_hal::entry]
fn main() -> ! {
    loop {
        unsafe {
            write_volatile(&mut debugbuf1, AVRORA_PRINT_REGS);
        }
        arduino_hal::delay_ms(1000);
    }
}
```

컴파일은 잘 되었지만, Rust는 아직 좀 불만스러운 모습이에요:

![이미지](/assets/img/2024-05-15-NielslearnsRust3Helloworldglobalstateandflashmemory_4.png)



최근 Rust 컴파일러에서 정적 데이터에 대한 참조는 경고가 발생하며, 2024 년 언어 버전에서는 오류가 될 것입니다 (이 문제에 대해서는 깃허브의 해당 이슈를 참조하세요). 보통 컴파일러는 문제를 해결하는 방법을 알려주므로 도움이 많이 됩니다: addr_of_mut!()은 우리가 참조를 먼저 만들지 않고도 변경 가능한 원시 포인터를 제공해줍니다.

제 생각에는 개발자가 원시 포인터로 작업하도록 강제함으로써 변경 가능한 정적 데이터가 안전하지 않으며 추가 주의가 필요하다는 것을 더 명확하게 보여주는 것 같습니다.

이것이 도움이 되었고, 코드는 이제 경고 없이 컴파일되지만 Avrora는 아직 그것을 찾지 못합니다:

![이미지](/assets/img/2024-05-15-NielslearnsRust3Helloworldglobalstateandflashmemory_5.png)



Rust는 두 개의 블록이 동일한 이름을 사용하여 정적을 정의해도 결과 바이너리에서 유일하게 만듭니다. 우리는 이를 방지하기 위해 #[no_mangle] 속성을 추가할 수 있습니다 (컴파일러가 이름을 난잡하게 만드는 것을 방지하는 것 외에도 여러 다른 효과가 있습니다).

작동합니다, 우리는 드디어 (아직은 다소 지루한) 출력이 있습니다!

![이미지](/assets/img/2024-05-15-NielslearnsRust3Helloworldglobalstateandflashmemory_6.png)

# Avrora에 매개변수 전달하기



c-프린트 모니터에는 레지스터나 심지어 VM 내부의 힙 내용을 출력하는 매개변수가 필요하지 않은 디버그 프린트 명령이 여럿 있습니다. 다른 명령은 2바이트 또는 4바이트의 매개변수를 사용하는데요, 이전에 정의한 static을 확장하여 16비트 값을 16진수로 출력해 봅시다:

```js
#[no_mangle]
#[allow(non_upper_case_globals)]
static mut debugbuf1: [u8; 5] = [0, 0, 0, 0, 0];

const AVRORA_PRINT_2BYTE_HEXADECIMALS: u8 = 0x1;
const AVRORA_PRINT_REGS: u8 = 0xE;

#[arduino_hal::entry]
fn main() -> ! {
    loop {
        unsafe {
            write_volatile(addr_of_mut!(debugbuf1[0]), AVRORA_PRINT_REGS);

            let val = 0x42FF;
            write_volatile(addr_of_mut!(debugbuf1[1]), val as u8);
            write_volatile(addr_of_mut!(debugbuf1[2]), (val >> 8) as u8);
            write_volatile(addr_of_mut!(debugbuf1[0]), AVRORA_PRINT_2BYTE_HEXADECIMALS);
        }

        arduino_hal::delay_ms(1000);
    }
}
```

![image](/assets/img/2024-05-15-NielslearnsRust3Helloworldglobalstateandflashmemory_7.png)

출력이 다소 날 것 같지만 완벽하게 작동합니다.



이상하게도, debugbuf1이 이제 5바이트 배열이 되었을 때 컴파일러는 addr_of_mut!를 추가하기 전에 보았던 경고를 더 이상 표시하지 않았습니다. 경고 없이 &mut debugbuf1[0]에 직접 쓸 수 있게 되었습니다.

잠시 헷갈렸지만, Stack Overflow에서 물어본 결과 이것은 linter의 제한 사항이라는 사실이 밝혀졌습니다. 이 문제는 곧 수정될 것으로 보이니, 계속해서 addr_of_mut!를 사용하는 것이 좋을 것 같습니다.

부호 있는 8, 16 또는 32 비트값에 대한 다른 변형도 동일한 패턴을 따릅니다.

# ‘avrora’ 모듈



VM을 개발할 때, 계속해서 이러한 줄을 복사하고 붙여넣기하고 싶지 않아요. 시뮬레이터와 상호 작용할 모든 편리한 기능을 가진 모듈이 있는 것이 훨씬 좋을 것 같아요 (나중에 다양한 추적 호출이 추가될 것입니다). 그래서 모듈을 만들어봅시다.

avrora.rs 또는 avrora/mod.rs라는 파일을 만들어 모듈을 만들 수 있어요. 다른 종류의 출력 명령을 추가하기가 더 쉬워지도록 일부 리팩터링을 포함하여, 다음과 같이 보입니다:

```js
use core::ptr::{addr_of_mut, write_volatile};

const AVRORA_PRINT_2BYTE_HEXADECIMALS: u8 = 0x1;
const AVRORA_PRINT_REGS: u8 = 0xE;

#[allow(non_upper_case_globals)]
#[no_mangle]
static mut debugbuf1: [u8; 5] = [0, 0, 0, 0, 0];

fn signal_avrora_c_print(instruction: u8) {
    unsafe {
        write_volatile(addr_of_mut!(debugbuf1[0]), instruction);
    }
}

fn signal_avrora_c_print_16(instruction: u8, payload: u16) {
    unsafe {
        write_volatile(addr_of_mut!(debugbuf1[1]), payload as u8);
        write_volatile(addr_of_mut!(debugbuf1[2]), (payload >> 8) as u8); 
        write_volatile(addr_of_mut!(debugbuf1[0]), instruction);
    }
}

/// Avrora의 c-print 모니터를 사용하여 16 비트 부호 없는 정수를 16 진수로 출력합니다.
#[allow(dead_code)]
pub fn print_u16_hex(val: u16) {
    signal_avrora_c_print_16(AVRORA_PRINT_2BYTE_HEXADECIMALS, val);
}

/// Avrora의 c-print 모니터를 사용하여 R0부터 R31 레지스터의 내용을 출력합니다.
#[allow(dead_code)]
pub fn print_all_regs() {
    signal_avrora_c_print(AVRORA_PRINT_REGS);
}
```

`allow(dead_code)`는 특정 디버그 출력을 사용하지 않을 때 컴파일러가 불평을 제기하지 않도록 필요합니다. 사용되지 않으면 해당 코드가 최종 이진 파일에 포함되지 않습니다.



이렇게 하면 주 파일이 깔끔해지고 안전하지 않은 코드가 전혀 없어집니다:

```js
#![no_std]
#![no_main]

use panic_halt as _;

mod avrora;

#[arduino_hal::entry]
fn main() -> ! {
    loop {
        avrora::print_all_regs();
        avrora::print_u16_hex(0x42FF);

        arduino_hal::delay_ms(1000);
    }
}
```

모듈을 더 확장하여 8, 16 및 32 비트 부호있는 또는 부호없는 숫자를 인쇄하는 것은 간단하지만, 문자열을 인쇄하는 것은 약간의 트릭이 필요합니다.

# 안녕, 세상! (드디어)



Avrora의 c-print 모니터에는 문자열을 출력하는 여러 방법이 있습니다. 가장 쉬운 방법은 매우 간단합니다:

```js
/// Uses Avrora's c-print monitor to print a string from RAM
#[allow(dead_code)]
pub fn print_ram_string(s: &str) {
    signal_avrora_c_print_16(AVRORA_PRINT_STRING_POINTERS, s.as_ptr() as u16);
}
```

우리는 문자열 슬라이스에 대한 참조를 전달하고, `.as_ptr()`를 사용하여 주소를 사용합니다. 이를 16비트 정수로 변환하여 모니터 호출의 매개변수로 사용합니다.

이를 통해 main.rs에서 `avrora::print_ram_str("Hello, world!");`를 실행할 수 있으며, 마침내 작동하는 "Hello, world!": 🎉🎉🎉을 얻을 수 있습니다.



이미지 태그를 다음과 같이 변경하면 되지만, 이 접근 방식에 문제가 있습니다:


![이미지](/assets/img/2024-05-15-NielslearnsRust3Helloworldglobalstateandflashmemory_8.png)


Rust는 문자열을 RAM에 있는 .data 섹션에 배치했습니다. 대부분의 플랫폼에서는 이 접근 방식이 괜찮지만 AVR에서는 RAM이 매우 소귀한 자원입니다. ATmega128는 RAM이 4KB밖에 되지 않지만 플래시 메모리는 128KB나 됩니다. 코드는 플래시에서 실행되며, 데이터는 일반적으로 RAM에 저장되지만 데이터가 상수인 경우에는 플래시에 저장하는 것이 좋습니다.



AVR에서 플래시 메모리에서 읽어오는 것에는 작은 성능 손실이 있습니다: 프로그램 메모리를 로드하는 LPM 명령어는 일반적인 RAM에서의 LD 로드에 비해 1 또는 2 사이클이 아닌 3 사이클이 소요됩니다. 그러나 이 경우 시뮬레이터에서만 문자열을 읽기 때문에 그렇게 중요하지 않습니다.

플래시에서 출력하는 호출은 거의 동일하지만 다른 몤령어와 32비트 주소가 필요합니다. 플래시 주소 범위가 더 크기 때문입니다.

하지만 문제는 문자열을 플래시에 어떻게 넣을 수 있을까요? 우리가 이 작업을 수행할 수 있는 avr_progmem라는 크레이트가 있습니다.

먼저, Cargo를 사용하여 이를 설치하세요:




![image](/assets/img/2024-05-15-NielslearnsRust3Helloworldglobalstateandflashmemory_10.png)

이것으로 새로운 매크로 progmem!을 얻을 수 있습니다. 이 매크로는 데이터를 플래시에 배치하는 데 사용할 수 있습니다. 이 크레이트는 어셈블리를 사용하지 않고도 플래시 메모리에서 데이터를 읽을 수 있는 편리한 방법도 제공합니다. 다음과 같이 데이터를 플래시에 넣을 수 있습니다:

```js
progmem! {
    static progmem string HELLO = "Hello, World!\0";
}
avrora::print_flash_string(HELLO.as_bytes().as_ptr() as u32);
```

static HELLO는 PmString`_`이 되며, 여기서 우리는 바이트에 대한 참조인 &ProgMem`[u8; _]`을 얻을 수 있습니다. 이를 통해 원시 *const T 포인터를 얻을 수 있습니다. 그것은 주소를 포함하는 u32로 캐스트할 수 있습니다. Avrora는 널 종결된 문자열을 예상하기 때문에 \0가 문자열을 종료하는 데 필요합니다. 그렇지 않으면 첫 번째 \0을 만날 때까지 쓰레기를 출력할 것입니다.




# print_flash_string 매크로.

이 방법은 동작하지만 디버그용으로는 상당히 길어요. avrora::print_flash_string("Hello, World!")처럼 간단히 작성할 수 있다면 좋을텐데요.

우리는 일반적인 러스트 함수로는 이것을 할 수 없지만 매크로로 거의 동일한 결과를 얻을 수 있습니다:

```js
/// Avrora의 c-print 모니터를 사용하여 flash 메모리에서 문자열을 출력합니다.
#[allow(unused_macros)]
#[macro_export]
macro_rules! print_flash_string {
    ($s:expr) => { {
        use avr_progmem::progmem;
        progmem! {
            static progmem string AVRORA_PROGMEMSTRING = concat!($s, "\0");
        }
        avrora::print_flash_string(AVRORA_PROGMEMSTRING);
    } };
}

/// Avrora의 c-print 모니터를 사용하여 flash 메모리에서 문자열을 출력합니다.
/// 
/// 이 함수는 print_flash_string! 매크로에 의해 호출되어 편리하게
/// 문자열을 flash 메모리에 저장하고 필요한 PmString을 생성합니다.
#[allow(dead_code)]
pub fn print_flash_string<const N: usize>(string_in_progmem: PmString<N>) {
    signal_avrora_c_print_32(
        AVRORA_PRINT_FLASH_STRING_POINTER,
        string_in_progmem.as_bytes().as_ptr() as u32);
}
```



매크로에 대해 배울 점이 많지만, 지금까지 'Programming Rust'에서 매크로 챕터로 건너뛰어서 이 작업을 하기에 충분한 지식을 얻었습니다.

Rust의 매크로는 컴파일 프로세스 초기에 실행됩니다. 이는 함수와 달리 매크로를 선언할 때 pub 대신 #[macro_export]를 추가해야 하는 이유입니다. 이 단계에서 pub의 전체 개념은 아직 의미가 없습니다. 불행히도, 이는 다른 매크로를 avrora::을 통해 액세스할 수 없다는 것을 의미합니다.

매크로는 C에서와 같이 평문이 아닌 토큰 스트림에서 작동합니다. 매크로 정의에는 정규식과 유사한 방식으로 일치하는 하나 이상의 케이스가 포함됩니다. 그런 다음 매크로가 해당 본문으로 확장됩니다.

매크로는 매크로가 예상하는 토큰 종류를 나타내는 '디자이네이터'로 특정 부분의 토큰 스트림을 캡처합니다. 예를 들어 ($s:expr)는 단일 표현식과 해당 값을 $s에 저장합니다.



print_flash_string 매크로는 프로그램 메모리에 static AVRORA_PROGMEMSTRING을 정의한 후 print_flash_string 함수를 호출하여 출력하는 블록으로 확장됩니다.

작은 따옴표 사이에 이중 중괄호를 주목하세요: '' ... ''. 외부 중괄호는 매크로 케이스의 확장을 구분하며 결과 코드에 포함되지 않습니다. 내부 중괄호는 매크로의 확장을 새 블록으로 만들어 준 코드를 매크로가 사용된 코드에 직접 확장하는 대신에 포함합니다.

왜 이것이 중요한가요? 추가 중괄호가 없으면 두 번의 print 문이 연속으로 실행되면 동일한 블록에서 두 개의 AVRORA_PROGMEMSTRING static을 정의하고 이름이 충돌합니다. 생성된 코드를 중괄호로 감싸면 충돌하지 않게 되고 Rust의 이름 맹글링은 최종 이진 파일에서 고유한 심볼을 가져주기 때문에 이러한 충돌이 발생하지 않습니다:

<img src="/assets/img/2024-05-15-NielslearnsRust3Helloworldglobalstateandflashmemory_11.png" />



이제 매크로를 다른 프린트 함수처럼 사용할 수 있습니다:

```js
print_flash_string!("Hello, World from flash memory!");
```

![이미지](/assets/img/2024-05-15-NielslearnsRust3Helloworldglobalstateandflashmemory_12.png)

유일한 차이점은 매크로가 직접적으로 네임스페이스에서 사용 가능하며 avrora::로 접두사를 붙일 수 없다는 것입니다. 새로운 개발자로서 avrora::를 입력하고 IDE에서 무엇이 나타나는지 확인하는 것이 가능한 옵션을 찾는 데 도움이 되기 때문에 이것은 안타까운 부분입니다.



이것이 매크로와 함수의 이름을 동일하게 유지하고 함수의 삼중 슬래시 문서화가 사용자를 해당 매크로로 안내하는 주요 이유였습니다.

또한 사용된 코드 내에서 매크로가 확장되기 때문에 avrora 모듈의 비공개 함수에 액세스할 수 없습니다. 따라서 매크로가 호출할 수 있는 공개 진입점이 필요하며, 이것이 가장 깔끔한 방법으로 보였습니다.

# 요약

이 일은 예상보다 훨씬 많은 단계가 필요했지만, 많은 흥미로운 것들을 배울 수 있었습니다:



- static mut 데이터와 unsafe 코드
- stdcore와 stdlib의 관계
- write_volatile 및 addr_of_mut
- no_mangle 속성
- 모듈 만들기
- 적절한 경우에 경고 억제하는 방법
- Raw 포인터
- 데이터를 플래시 메모리에 넣기 위해 avr_progmem 사용
- 간단한 매크로 작성하는 방법

이번 단계의 코드 상태는 일반적으로 Github에서 확인할 수 있습니다.

2024년 5월 10일에 nielsreijers.github.io에서 최초 발행됨.