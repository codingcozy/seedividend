---
title: "Laravel 개발 혁신하기 매크로에 작별을 고하고 믹신스에 안녕을 외치다"
description: ""
coverImage: "/assets/img/2024-05-27-RevolutionizeLaravelDevelopmentSayGoodbyetoMacrosHellotoMixins_0.png"
date: 2024-05-27 19:24
ogImage:
  url: /assets/img/2024-05-27-RevolutionizeLaravelDevelopmentSayGoodbyetoMacrosHellotoMixins_0.png
tag: Tech
originalTitle: "Revolutionize Laravel Development: Say Goodbye to Macros, Hello to Mixins!"
link: "https://medium.com/@ismayil-dev/revolutionize-laravel-development-say-goodbye-to-macros-hello-to-mixins-82019211bfbb"
isUpdated: true
---

<img src="/assets/img/2024-05-27-RevolutionizeLaravelDevelopmentSayGoodbyetoMacrosHellotoMixins_0.png" />

안녕하세요! Laravel에서 Mixins를 전문적으로 사용하는 방법에 대한 포괄적인 안내서에 오신 것을 환영합니다! 이 가이드는 Mixins의 세계에 심취하여 Laravel 개발 기술을 향상시키도록 설계되었습니다. 그러나 먼저 Macros에 대해 간단히 설명하겠습니다. Macros는 Laravel의 주요 측면으로, 사용자 정의 메서드를 추가하여 클래스의 기능을 확장할 수 있게 해줍니다. Macros는 Laravel에서 재사용 가능하고 조직화된 코드를 개발하는 데 중요한 역할을 하며, Macro를 최대한 활용하여 효율적이고 확장 가능한 애플리케이션을 만드는 방법을 여러분께 보여드리겠습니다. 예를 들어, Laravel의 Str 및 Arr 헬퍼 클래스에 사용자 정의 메서드를 추가하고 싶을 수 있습니다.

Str 헬퍼의 경우 다음과 같이 사용할 수 있습니다:

fullName
initials

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

Arr 도우미 클래스에 대해:

camelToSnake snakeToCamel filterNulls

지금은 macros를 사용해서 AppServiceProvider.php의 boot 메서드 안에 위의 메서드들을 추가해보도록 합시다.

```php
<?php

namespace App\Providers;

use Illuminate\Support\Arr;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;

class AppServiceProvider extends ServiceProvider
{
    /**
     * 어플리케이션 서비스를 부트스트랩합니다.
     */
    public function boot(): void
    {
        Str::macro('fullName', function (string $firstname, string $lastname) {
            return trim($firstname . ' ' . $lastname);
        });

        Str::macro('initials', function (string $firstname, string $lastname) {
            return strtoupper($firstname[0] . $lastname[0]);
        });

        Arr::macro('camelToSnake', function (array $array) {
            return Arr::mapWithKeys($array, function ($value, $key) {
                return [Str::snake($key) => $value];
            });
        });

        Arr::macro('snakeToCamel', function (array $array) {
            return Arr::mapWithKeys($array, function ($value, $key) {
                return [Str::camel($key) => $value];
            });
        });

        Arr::macro('filterNulls', function (array $array) {
            return Arr::where($array, function ($value) {
                return !is_null($value);
            });
        });
    }
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

라라벨(Laravel)에서는 사용자 정의 메소드로 쉽게 확장할 수 있는 여러 클래스가 있습니다. 이러한 클래스들을 "매크로 가능(Macroable)" 클래스라고 합니다. 각 클래스마다 AppServiceProvider를 다른 매크로 메소드로 혼잡하게 만드는 대신에, 각 매크로 가능 클래스에 대한 개별 제공자 클래스를 만들고 config/app.php 파일에 등록할 수 있습니다. 그러나 이러한 방법은 모든 메소드를 추적하는 것이 조금 귀찮고 혼잡하게 만들 수 있습니다. 저는 보다 자연스럽고 가독성이 좋고 유지보수가 용이한 접근법을 선호합니다. 그렇다면 어떻게 해야 할까요? 여기에서 Mixins이 나옵니다. Mixins을 사용하면 클래스를 확장하는 프로세스를 간단하게 만들어 코드를 보다 구조적으로 관리하기 쉽게 할 수 있습니다.

## Mixin이란 무엇인가요?

매크로와 마찬가지로 Mixin은 넓은 라라벨 컨텍스트에서 기존 클래스의 기능을 확장하는 개념입니다. Mixin이 작동하는 방법을 살펴보겠습니다:

- Mixin 클래스에는 다른 클래스에 추가하려는 메소드가 포함되어 있습니다. 이러한 메소드는 일반적으로:

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

- `Table` 태그를 Markdown 형식으로 변경해주세요.

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

ArrayMixin.php

```js
<?php

namespace App\Mixins;

use Closure;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class ArrayMixin
{
    /**
     * @return Closure
     */
    public function camelToSnake()
    {
        return function (array $array) {
            return Arr::mapWithKeys($array, function ($value, $key) {
                return [Str::snake($key) => $value];
            });
        };
    }

    /**
     * @return Closure
     */
    public function snakeToCamel()
    {
        return function (array $array) {
            return Arr::mapWithKeys($array, function ($value, $key) {
                return [Str::camel($key) => $value];
            });
        };
    }

    /**
     * @return Closure
     */
    public function filterNulls()
    {
        return function (array $array) {
            return Arr::where($array, function ($value) {
                return !is_null($value);
            });
        };
    }
}
```

StringMixin.php

```js
<?php

namespace App\Mixins;

use Closure;

class StringMixin
{
    /**
     * @return Closure
     */
    public function fullName()
    {
        return function (string $firstname, string $lastname) {
            return trim($firstname.' '.$lastname);
        };
    }

    /**
     * @return Closure
     */
    public function initials()
    {
        return function (string $firstname, string $lastname) {
            return strtoupper($firstname[0].$lastname[0]);
        };
    }
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

이제 AppServiceProvider에 이 Mixin들을 등록하세요:

```js
/**
* 어플리케이션 서비스를 초기화합니다.
*/
public function boot(): void
{
    Str::mixin(new StringMixin());
    Arr::mixin(new ArrayMixin());
}
```

잘 했어요! 이제 프로젝트가 잘 정리되었고 코드를 더 쉽게 읽을 수 있게 되었어요.

여전히 Str::initials(...), Arr::filterNulls(...)와 같이 이 도우미 메서드를 이전과 같은 방식으로 사용할 수 있어요.

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

믹신의 장점:

- 코드 재사용성: 믹신 클래스 내에 도우미 로직을 캡슐화함으로써 코드를 중복하지 않고 응용 프로그램의 다른 부분에서 재사용할 수 있습니다.
- 코드 청결함: 믹신은 원래 클래스 코드를 청소하고 핵심 기능에 집중할 수 있도록 도와줍니다. 도우미 메서드는 전용 클래스로 분리됩니다.
- 유지보수성 향상: 도우미 로직을 수정하거나 제거해야 할 경우, 모든 내용이 한 군데에 있습니다 - 믹신 클래스 내에 위치하고 있습니다.

다음 기사에서 뵙겠습니다.
