---
title: "루비에서의 벤치마킹 시간과 메모리 기반으로 측정하는 방법들"
description: ""
coverImage: "/assets/img/2024-08-19-BenchmarkingTimeandMemoryBasedinRuby_0.png"
date: 2024-08-19 03:15
ogImage:
  url: /assets/img/2024-08-19-BenchmarkingTimeandMemoryBasedinRuby_0.png
tag: Tech
originalTitle: "Benchmarking Time and Memory Based in Ruby "
link: "https://medium.com/@kavya24goyal/benchmarking-time-and-memory-based-in-ruby-7f11f8e3e9b0"
isUpdated: true
updatedAt: 1724032879563
---

오늘은 벤치마킹과 프로파일링에 사용할 수 있는 몇 가지 도구와 루비 젬 💎에 대해 알아보겠습니다.

# Benchmark gem을 사용한 벤치마킹 (시간 기반)

벤치마킹은 시간이나 기준에 대한 측정을 의미합니다. 이 기사에서는 JDoodle, 온라인 IDE를 사용하고 루비의 Benchmark gem을 사용할 것입니다.

## 설치

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
# 환경에 설치하기 (터미널 명령어)
gem install benchmark
```

## 설정

```js
# 파일에서 불러오기
require 'benchmark'
```

## 시간 측정하기

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

아주 간단한 예제로 문자열을 구분자로 나누는 방법을 시작해봅시다.

```js
require 'benchmark'

time_taken = Benchmark.realtime do
    res = 'kavya'.split('a')
end
puts time_taken
```

<img src="/assets/img/2024-08-19-BenchmarkingTimeandMemoryBasedinRuby_0.png" />

이 시간 단위는 초입니다. 이제 문자열의 길이를 늘려 동일한 작업을 수행해 봅시다.

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
require 'benchmark'

time_taken = Benchmark.realtime do
    res = ('kavya' * 10_000).split('a')
end
puts time_taken
```

![Screenshot](/assets/img/2024-08-19-BenchmarkingTimeandMemoryBasedinRuby_1.png)

Well, the time increase was quite significant, at least by 1000x. Let's now perform some more complex cryptography-based tasks.

In this case, we are attempting to convert a large string (1.5 million characters) into a SHA256 hash by repeating the process 1000 times.

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
require 'benchmark'
require 'digest'

def simple_hash(input)
  Digest::SHA256.hexdigest(input.to_s)
end

n = 1000
time_taken = Benchmark.realtime do
    plain_text = ('kavya' * 300_000)
    n.times do
        cipher_text = simple_hash(plain_text)
    end
end

puts time_taken
```

<img src="/assets/img/2024-08-19-BenchmarkingTimeandMemoryBasedinRuby_2.png" />

여기서 조금만 코드를 수정해 봅시다. (여기서 plain text를 n번씩 계속 초기화하는 방식에 주목해 주세요)

```js
require 'benchmark'
require 'digest'

def simple_hash(input)
  Digest::SHA256.hexdigest(input.to_s)
end

n = 1000
time_taken = Benchmark.realtime do
    n.times do
        plain_text = ('kavya' * 300_000)
        cipher_text = simple_hash(plain_text)
    end
end

puts time_taken
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

![2024-08-19-BenchmarkingTimeandMemoryBasedinRuby_3.png](/assets/img/2024-08-19-BenchmarkingTimeandMemoryBasedinRuby_3.png)

Runs took slightly longer this time, about 1-2 seconds more than before.

## Labelling and benchmarking individual components

We'll use Benchmark.bm to analyze time statistics for various commands at the user and system levels.

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
require 'benchmark'
require 'digest'

def simple_hash(input)
  Digest::SHA256.hexdigest(input.to_s)
end

n = 10
time_taken = Benchmark.bm do |x|
    n.times do
        x.report{cipher_text = simple_hash('kavya' * 10_000_000)}
    end
end

# puts time_taken
```

<img src="/assets/img/2024-08-19-BenchmarkingTimeandMemoryBasedinRuby_4.png" />

이는 50백만 글자로 이루어진 문자열을 해싱하는 각 실행마다 사용자, 시스템 및 총 시간을 알려줍니다.

각 실행 및 다른 구성 요소에 대한 레이블을 다음과 같이 추가할 수 있습니다

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
require 'benchmark'
require 'digest'

def simple_hash(input)
  Digest::SHA256.hexdigest(input.to_s)
end

n = 10
time_taken = Benchmark.bm do |x|
        x.report("before_run_step: ") {
            puts "I am running a step here before the n"
            puts "I will run the hash fxn #{n} times"
        }

        n.times do |idx|
            x.report("run: #{idx}") { cipher_text = simple_hash('kavya' * 10_000_000) }
        end

        x.report("after_run_step: ") {
            puts "I have completed the run"
        }
end
```

![image](/assets/img/2024-08-19-BenchmarkingTimeandMemoryBasedinRuby_5.png)

## Benchmarking with Benchmark-Memory gem (Memory Based)

시간에 기반을 둔 분할 이외에도, 실행 시점에서 얼마나 많은 메모리를 사용할 것인지 대략적으로 파악하는 것이 매우 중요합니다. 요즘에는 RAM과 같은 것들의 제약 사항을 고려하지 않는 경향이 있습니다. 왜냐하면 이러한 자원들이 우리에게 쉽게 이용 가능하기 때문입니다. 하지만 이러한 자원이 여전히 부족하다는 사실을 이해하고 항상 보장해야 합니다. 이를 위해 루비의 Memory-Profiler를 사용할 것입니다. (Github 참조)

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

## 설치

```bash
# 환경에서 설치 (터미널 명령)
gem install memory_profiler
```

## 설정

```js
# 파일에서 불러오기
require 'memory_profiler'
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

## 시간 측정하기

단일 변수를 저장하고 메모리를 분석하는 작은 샘플로 시작하겠습니다.

```js
require 'memory_profiler'
report = MemoryProfiler.report do
  kavya = "Hi Kavya"
end

report.pretty_print
```

```js
총 할당된 메모리: 40바이트 (1개 객체)
총 보존된 메모리: 0바이트 (0개 객체)

젬별 할당된 메모리
-----------------------------------
        40  기타

파일별 할당된 메모리
-----------------------------------
        40  jdoodle.rb

위치별 할당된 메모리
-----------------------------------
        40  jdoodle.rb:3

클래스별 할당된 메모리
-----------------------------------
        40  String

젬별 할당된 객체
-----------------------------------
         1  기타

파일별 할당된 객체
-----------------------------------
         1  jdoodle.rb

위치별 할당된 객체
-----------------------------------
         1  jdoodle.rb:3

클래스별 할당된 객체
-----------------------------------
         1  String

젬별 보존된 메모리
-----------------------------------
데이터 없음

파일별 보존된 메모리
-----------------------------------
데이터 없음

위치별 보존된 메모리
-----------------------------------
데이터 없음

클래스별 보존된 메모리
-----------------------------------
데이터 없음

젬별 보존된 객체
-----------------------------------
데이터 없음

파일별 보존된 객체
-----------------------------------
데이터 없음

위치별 보존된 객체
-----------------------------------
데이터 없음

클래스별 보존된 객체
-----------------------------------
데이터 없음


할당된 String 보고서
-----------------------------------
         1  "Hi Kavya"
         1  jdoodle.rb:3
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

위에서 보듯, 보고서의 범위를 벗어나서 메모리가 유지되지 않았습니다. 이제 메모리를 유지하는 더 복잡한 예제로 넘어가 봅시다.

```js
require 'memory_profiler'
div2 = []
div3 = []
div5 = []
THRESHOLD = 10_000_000

report = MemoryProfiler.report do
  (THRESHOLD).times do |i|
   k = rand(THRESHOLD)
   div2 << k if k % 2 == 0
   div3 << k if k % 3 == 0
   div5 << k if k % 5 == 0
end
end

report.pretty_print
```

함수에 의해 메모리가 유지되는 것을 주의 깊게 관찰해보세요.

```js
Total allocated: 40 bytes (1 objects)
Total retained:  40 bytes (1 objects)

allocated memory by gem
-----------------------------------
        40  other

allocated memory by file
-----------------------------------
        40  jdoodle.rb

allocated memory by location
-----------------------------------
        40  jdoodle.rb:9

allocated memory by class
-----------------------------------
        40  Integer

allocated objects by gem
-----------------------------------
         1  other

allocated objects by file
-----------------------------------
         1  jdoodle.rb

allocated objects by location
-----------------------------------
         1  jdoodle.rb:9

allocated objects by class
-----------------------------------
         1  Integer

retained memory by gem
-----------------------------------
        40  other

retained memory by file
-----------------------------------
        40  jdoodle.rb

retained memory by location
-----------------------------------
        40  jdoodle.rb:9

retained memory by class
-----------------------------------
        40  Integer

retained objects by gem
-----------------------------------
         1  other

retained objects by file
-----------------------------------
         1  jdoodle.rb

retained objects by location
-----------------------------------
         1  jdoodle.rb:9

retained objects by class
-----------------------------------
         1  Integer
```
