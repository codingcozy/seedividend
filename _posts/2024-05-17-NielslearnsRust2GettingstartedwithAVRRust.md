---
title: "Rust 2 공부 내용 정리"
description: ""
coverImage: "/assets/img/2024-05-17-NielslearnsRust2GettingstartedwithAVRRust_0.png"
date: 2024-05-17 04:11
ogImage: 
  url: /assets/img/2024-05-17-NielslearnsRust2GettingstartedwithAVRRust_0.png
tag: Tech
originalTitle: "Niels learns Rust 2 — Getting started with AVR Rust"
link: "https://medium.com/@nielsreijers/niels-learns-rust-2-getting-started-with-avr-rust-010f3afd10b8"
---


저는 러스트를 배우기 위해 내 임베디드 Java 가상 머신을 러스트로 이식하는 여정을 문서화하는 시리즈의 두 번째 부분입니다.

# 개발 컨테이너에 러스트 설치

이 첫 번째 단계는 Rust를 설치하는 것인데, rustup을 사용하면 간단합니다:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

<div class="content-ad"></div>

하지만 안정적이고 반복 가능한 방식으로 하자면 개발 컨테이너를 사용하는 게 좋겠죠. 개발 컨테이너는 VS Code가 코드를 빌드, 실행 및 디버깅하기 위해 생성하는 컨테이너입니다. 모든 개발 작업은 컨테이너에서 이루어지며, 데스크톱에서 실행 중인 VS Code는 단순히 컨테이너에서 실행 중인 다른 VS Code 인스턴스와 통신하는 UI 역할을 합니다:

![image](/assets/img/2024-05-17-NielslearnsRust2GettingstartedwithAVRRust_0.png)

(출처)

이점은 더 나은 격리와 명확히 정의된 개발 환경입니다. 이 프로젝트에만 사용되는 로컬 도구를 로컬에 설치할 필요가 없으며, 이 리포지토리를 내려받는 모든 사람이 동일한 컨테이너를 사용할 수 있습니다.

<div class="content-ad"></div>

개발 컨테이너를 만드는 것은 매우 쉬워요. 필요한 것은 .devcontainer/devcontainer.json 파일(.devcontainer.json도 가능) 하나 뿐인데, 이 파일 안에는 VS Code가 컨테이너를 빌드하는 데 필요한 정보들이 들어가 있어요.

미리 만들어진 이미지를 사용하거나, 자체 Dockerfile을 지정하여 컨테이너를 빌드할 수 있어요. 저는 후자를 사용하고 있고, 제 devcontainer.json은 이렇게 생겼어요:

```js
{
    "build": { "dockerfile": "Dockerfile" },

    "customizations": {
        "vscode": {
            "extensions": ["rust-lang.rust-analyzer"]
        }
    }
}
```

dev 컨테이너에서 실행 중인 VS Code 인스턴스에는 기본적으로 어떤 확장도 설치되어 있지 않아요. 로컬로 설치된 확장 목록에서 간단히 클릭하여 추가하거나, json 파일에서 명시하여 자동으로 추가할 수 있어요. 형식은 `provider`.`extension`이고, 실제 이름은 UI에서 매우 명확하지 않지만 ~/.vscode/extensions 디렉토리에서 쉽게 찾을 수 있어요.

<div class="content-ad"></div>

도커 파일도 꽤 간단합니다:

```js
FROM rust:1.78

RUN apt update
RUN apt -y install gcc-avr avr-libc default-jre

RUN cargo install cargo-generate
```

Rust 프로젝트는 사용할 수 있는 도커 이미지를 제공하며, 보통의 Rust 개발에는 충분할 수 있습니다. 그러나 이 프로젝트의 목표는 임베디드 CPU용 Java VM을 빌드하는 것이며, 이 경우 Atmel AVR ATmega 128에 대해 작업하기 위해 몇 가지 추가 패키지를 설치해야 합니다.

cargo는 Rust의 빌드 매니저이며, .NET에서는 dotnet, Scala에서는 sbt, Golang에서는 go와 같은 역할을 합니다. 마지막 줄은 새로운 프로젝트를 템플릿을 기반으로 생성할 수 있도록 하는 크레이트를 설치합니다. 이를 다음 섹션에서 사용할 것입니다.

<div class="content-ad"></div>

# AVR용 러스트

여기서는 작동하는 러스트 설치 방법을 소개해 드릴게요. Cargo를 사용하여 새 프로젝트를 만들고 실행할 수 있습니다:

![이미지](/assets/img/2024-05-17-NielslearnsRust2GettingstartedwithAVRRust_1.png)

하지만 이것은 저의 로컬 아키텍처에 맞게 빌드되었는데, 저희는 Atmel AVR ATmega128을 위해 빌드하고 싶어요.

<div class="content-ad"></div>

행운이다! 많은 사람들이 AVR을 개발하기 위해 Rust를 사용하고 있어서, 이 동영상을 포함하여 도움이 되는 다양한 자료들이 있습니다. 이 동영상은 새 프로젝트를 설정하기 위한 cargo generate 템플릿을 소개하고 있습니다.


cargo generate --git https://github.com/Rahix/avr-hal-template.git


이 명령은 우리 프로젝트를 위해 템플릿을 구성하는 상호작용적인 흐름을 시작합니다. 이 경우에는 프로젝트 이름과 대상 보드에 대해 두 가지 질문만 있습니다. 실제 보드를 사용하지는 않고 대신 시뮬레이터에서 VM을 실행할 것이기 때문에, 제가 선택한 것은 아두이노 메가 1280입니다. 

![NielslearnsRust2GettingstartedwithAVRRust_2 이미지](/assets/img/2024-05-17-NielslearnsRust2GettingstartedwithAVRRust_2.png)


<div class="content-ad"></div>

지금은 ATmega128을 위해 구성된 프로젝트가 있습니다.

Cargo에 빌드하라고 요청하면, 흥미로운 일이 발생합니다:

![이미지](/assets/img/2024-05-17-NielslearnsRust2GettingstartedwithAVRRust_3.png)

Rust의 새 버전을 다운로드 중입니다! Dockerfile이 1.78을 지정했는데도 불구하고 1.79의 nightly 빌드를 받고 있습니다. 왜 이런 일이 발생했을까요?

<div class="content-ad"></div>

여러 개의 Rust 도구 체인을 나란히 설치할 수 있다는 것이 밝혀졌어요. rustup 도구체인 목록을 보면 설치된 도구 체인을 확인할 수 있어요:

![이미지](/assets/img/2024-05-17-NielslearnsRust2GettingstartedwithAVRRust_4.png)

개발 컨테이너의 기본 버전은 1.78이지만, 우리가 만든 프로젝트 내부에서 동일한 명령을 실행하면 2024-03-22의 nightly 빌드로 재정의돼요.

이 일이 발생하는 이유는 템플릿에 rust-toolchain.toml이 포함돼 있어서 특정 버전을 요청했기 때문이에요.

<div class="content-ad"></div>

```json
[toolchain]
channel = "nightly-2024-03-22"
components = ["rust-src"]
profile = "minimal"
```

프로젝트를 nightly 빌드에서 시작하는 것이 조금 이상해 보이지만, 템플릿에서 생성된 코드는 1.78에서 컴파일되지 않습니다. 그래서 일단 여기에 남겨둔 채로 나중에 안정 버전으로 옮길 수 있는지 확인해 보겠습니다.

# 코드 실행하기

Cargo도 프로그램을 실행할 수 있지만, 현재 버전에서 시도하면 다음과 같은 오류가 발생합니다:

<div class="content-ad"></div>

md
![이미지](/assets/img/2024-05-17-NielslearnsRust2GettingstartedwithAVRRust_5.png)

템플릿은 생성된 실행 파일을 대상 장치로 보내는 도구인 ravedude를 사용하도록 구성되어 있지만 우리는 물리적 장치가 없으므로 수정된 Avrora 시뮬레이터의 버전을 대신 사용할 것입니다.

cargo run을 실행하면 생성된 프로젝트의 capevm/.cargo/config.toml 파일에 있는 설정된 내용이 실행됩니다. 현재 이 파일은 다음과 같은 내용을 포함하고 있습니다:

```js
[target.'cfg(target_arch = "avr")']
runner = "ravedude mega1280 -cb 57600"
```


<div class="content-ad"></div>

생성된 Rust 코드를 Avrora에서 실행하려면 다음과 같이 변경했어요:

```js
[target.'cfg(target_arch = "avr")']
runner = "java -jar ../avrora/avrora-beta-1.7.117.jar -monitors=memory,stack -single"
```

지금은 Avrora 시뮬레이터를 컴파일한 파일(단일 .jar 파일)을 직접 저장소에 넣었어요. 이 Avrora 버전은 실행 중인 프로그램을 모니터링할 수 있도록 다양한 프로브로 확장되었지만, 이러한 세부사항은 훨씬 나중에 의미가 있을 거예요. 해당 수정 사항이 포함된 소스코드는 원본 CapeVM 저장소에 있어요.

# AVR “Hello, world”

<div class="content-ad"></div>

아래는 AVR을 위한 "Hello, world" 동등물을 생성하는 템플릿입니다:

```rust
#![no_std]
#![no_main]

use panic_halt as _;

#[arduino_hal::entry]
fn main() -> ! {
    let dp = arduino_hal::Peripherals::take().unwrap();
    let pins = arduino_hal::pins!(dp);
    let mut led = pins.d13.into_output();

    loop {
        led.toggle();
        arduino_hal::delay_ms(1000);
    }
}
```

main 함수의 서명인 `fn main() -> !`는 흥미롭습니다: ! 반환 유형은 함수가 종료되지 않음을 나타냅니다.

이것은 여전히 내게는 이해하기 어렵지만 코드에서 강요된 #[arduino_hal::entry] 속성에 의해 시행됩니다. Rust의 좋은 점 중 하나는 "F12"(정의로 이동)로 거의 모든 것을 조회하여 구현을 볼 수 있다는 것이며, arduino_hal::entry에는 syn::Type::Never(_)가 반환 유형인 !을 포함하는 이 코드 조각이 포함되어 있습니다:

<div class="content-ad"></div>

```js
// 함수 시그니처를 확인합니다
let valid_signature = f.sig.constness.is_none()
    && f.vis == syn::Visibility::Inherited
    && f.sig.abi.is_none()
    && f.sig.inputs.is_empty()
    && f.sig.generics.params.is_empty()
    && f.sig.generics.where_clause.is_none()
    && f.sig.variadic.is_none()
    && match f.sig.output {
        syn::ReturnType::Default => false,
        syn::ReturnType::Type(_, ref ty) => matches!(**ty, syn::Type::Never(_)),
    };
```

대부분의 임베디드 CPU 응용 프로그램에는 매우 유용합니다. OS가 없기 때문에 프로그램이 종료되는 방법이 정말 없습니다. 디바이스에서 계속 실행되어야 합니다. 정말 할 일이 남지 않았다면, 디바이스를 절전 상태로 전환하고 깨우는 트리거를 기다리는 것이 가장 좋습니다.

이 루프는 여기서 끝없이 단일 핀을 토글하지만, 실제 보드가 없기 때문에 아직 테스트할 방법이 없습니다. 코드를 시뮬레이터에서 실행하고, Ctrl-C를 눌러 중지한 후에 Avrora가 config.toml에서 활성화한 -monitors에 따라 프로그램이 무엇을 수행했는지에 대한 정보를 출력할 것입니다:

<img src="/assets/img/2024-05-17-NielslearnsRust2GettingstartedwithAVRRust_6.png" />


<div class="content-ad"></div>

좋아요, 작동이 되네요! 하지만 아직 결과물이 그렇게 유용하진 않네요.

마지막 목표는 네이티브 코드로 컴파일되어 실행되고 성능을 측정하기 위해 여러 벤치마크를 실행하고 확인하는 JVM을 구축하는 것입니다. 이를 위해 더 자세한 출력이 필요하므로, 다음 게시물에서는 디버그 출력 및 다른 계산 도구를 추가하는 방법에 대해 다뤄볼 예정입니다.

이 단계에서의 코드 상태는 여기 Github에서 찾을 수 있습니다.

원문은 2024년 5월 6일에 https://nielsreijers.github.io에서 최초로 게시되었습니다.