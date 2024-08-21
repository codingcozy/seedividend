---
title: "Rails 애플리케이션 성능 최적화 종합 가이드"
description: ""
coverImage: "/assets/img/2024-07-01-OptimisingRailsApplicationPerformanceAOverviewGuide_0.png"
date: 2024-07-01 16:48
ogImage:
  url: /assets/img/2024-07-01-OptimisingRailsApplicationPerformanceAOverviewGuide_0.png
tag: Tech
originalTitle: "Optimising Rails Application Performance: A Overview Guide"
link: "https://medium.com/@amir_sohail/optimising-rails-application-performance-a-comprehensive-guide-627e594502d8"
isUpdated: true
---

현재의 빠르게 변화하는 디지털 환경에서는 웹 애플리케이션의 성능이 사용자 경험을 결정할 수 있습니다. Rails 개발자로서 애플리케이션이 효율적으로 실행되도록 하는 것이 매우 중요합니다. 이 안내서에서는 코드 예시를 포함하여 Rails 애플리케이션 성능을 최적화하기 위한 필수 전략과 도구를 다룹니다.

## 높은 오류율

오류율을 감지하고 관리하는 것은 견고한 애플리케이션을 유지하는 데 중요합니다. New Relic APM과 같은 도구를 사용하여 비정상적으로 높은 오류 발생량을 식별할 수 있으며, 이는 종종 해킹 봇이 취약점을 이용하려는 문제의 신호일 수 있습니다.

```js
# New Relic APM을 사용하여 오류율 모니터링하기
NewRelic::Agent.notice_error(StandardError.new("예시 오류"))
# ^-- 이 줄은 Rails 애플리케이션의 오류를 추적하려는 위치에 배치되어야 합니다. 이 오류율을 모니터링하여 잠재적인 보안 위협을 신속하게 대처하고 전체 애플리케이션 안정성을 향상시킬 수 있습니다.
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

## 성능 최적화

파레토 원리는 종종 "작업의 80%는 코드의 20%로 수행된다"라고 언급되며, 목표로 하는 최적화의 중요성을 강조합니다. New Relic과 같은 도구를 사용하면 응용 프로그램의 어느 부분에 주의를 기울여야 하는지 식별하는 데 도움이 됩니다.

```js
NewRelic::Agent.add_custom_parameters(:method_name, :execution_time)
# ^-- 메서드 성능을 추적하기 위해 사용할 수 있는 사용자 정의 매개변수 추가
```

## 벤치마킹

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

벤치마킹은 성능을 측정하기 위해 애플리케이션을 테스트하거나 시뮬레이션하여 속도, 처리량 및 응답 시간을 평가하는 것을 의미합니다. `wrk`와 같은 도구는 부하 테스트에 탁월합니다.

```js
wrk -t12 -c400 -d30s http://localhost:3000
# ^-- 로컬호스트에서 12개 스레드, 400개 연결을 30초 동안 시뮬레이션하기 위해 wrk를 사용합니다.
```

## 프로파일링

프로파일링은 애플리케이션의 런타임 동작을 분석하여 성능 문제를 식별하는 것을 말합니다. 프로파일링에는 통계적 프로파일링과 추적 프로파일링 두 가지 주요 유형이 있습니다.

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
NewRelic::Agent.add_instrumentation("MyClass", :method_name)
# ^-- MyClass의 method_name을 통계 프로파일링을 위해 Instrument합니다. 추적 프로파일링
```

```js
require 'ruby-prof'

RubyProf.start
# ^-- RubyProf로 코드 프로파일링을 시작합니다.
result = RubyProf.stop
# ^-- 프로파일링을 멈추고 자세한 실행 데이터를 캡처합니다.
```

## Little's Law: 필요한 서버의 개수는?

Little's Law는 요청의 도착률을 시스템의 응답 시간과 필요한 서버 수와 관련시켜 용량 계획 및 성능 최적화를 돕는다.

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
# 예제 계산:
도착률 = 100 # 초당 요청
응답 시간 = 0.5 # 초
필요한 서버 수 = 도착률 * 응답 시간
# ^-- 요청 도착률과 응답 시간을 기반으로 필요한 서버 수를 계산합니다.
```

리틀의 법칙을 적용하여 인프라를 확장하는 데 유용한 결정을 내릴 수 있습니다.

## 뉴 렐릭(New Relic)을 사용하여 레일즈(Rails)에서 N+1 쿼리 감지

N+1 쿼리는 관련된 레코드를 가져오기 위해 애플리케이션이 여러 번의 데이터베이스 쿼리를 실행할 때 발생하여 성능 하락을 초래할 수 있습니다.

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

N+1 쿼리를 감지하는 방법:

- 트랜잭션 추적: 상세 실행 정보를 캡처합니다.
- 트랜잭션 추적: 타임라인과 메트릭스를 확인합니다.
- 데이터베이스 쿼리: 쿼리 패턴과 응답 시간을 분석합니다.

```js
# includes를 사용하여 N+1 쿼리 식별
posts = Post.includes(:comments).all
# ^-- includes를 사용하여 데이터 가져오기를 최적화하고 N+1 쿼리 문제를 피할 수 있습니다.
```

includes, joins, eager_load와 같은 메서드를 사용하여 데이터 가져오기를 최적화하고 불필요한 데이터베이스 쿼리를 최소화할 수 있습니다.

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

## 프로파일링을 위한 Stackprof 젬

stackprof 젬은 세부적인 메소드 수준의 실행 데이터를 제공하여 성능 병목 현상을 식별하는 데 도움을 줍니다.

```js
require 'stackprof'

StackProf.run(mode: :cpu, out: 'tmp/stackprof-cpu-myapp.dump') do
 # 프로파일링할 코드
end
# ^-- StackProf를 사용하여 애플리케이션의 CPU 사용량을 프로파일링합니다.
```

프로파일링 데이터를 분석하여 성능에 상당한 영향을 미치는 메소드에 최적화 작업을 집중할 수 있습니다.

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

## 데이터베이스 최적화 기술

데이터베이스 성능 최적화는 반응이 빠른 애플리케이션을 위해 중요합니다. 여기 몇 가지 주요 기술이 있습니다:

- 활성 레코드 쿼리에 대한 설명

```js
puts Post.where(author_id: 1).explain
# ^-- 특정 작성자의 게시물을 대상으로 하는 활성 레코드 쿼리의 쿼리 계획을 출력합니다.
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

2. 주요 데이터베이스 지표 측정:

데이터베이스 작업을 효율적으로 유지하기 위해 CPU 사용률, 메모리 사용률 및 쿼리 시간과 같은 지표를 모니터링하세요.

```js
# 쿼리 성능 측정
ActiveRecord::Base.connection.execute("SHOW STATUS LIKE 'Queries'")
# ^-- 데이터베이스 쿼리 지표를 검색하고 표시합니다.
```

## 프론트엔드 및 HTTP 레이어 최적화

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

프론트엔드와 HTTP 레이어를 최적화하면 페이지 로드 시간을 줄이고 상호 작용성을 향상시켜 사용자 경험에 직접적인 영향을 줄 수 있어요.

예시 기술:

- HTTP 요청 최소화

```js
# CSS 스프라이트 사용
<%= image_tag 'sprite.png' %>
# ^-- 이미지 HTTP 요청 수를 줄이기 위해 CSS 스프라이트 사용.
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

2. 캐싱 활용하기

```js
# 조각 캐싱
<% cache @post do %>
 <%= render @post %>
<% end %>
# ^-- @post의 렌더링을 캐싱하여 페이지 로드 시간을 개선합니다.
```

3. 이미지 최적화

```js
# 이미지 압축
<%= image_tag 'image.jpg', size: '200x200' %>
# ^-- 페이지 로드 크기를 줄이고 성능을 향상시키기 위해 이미지를 압축하고 크기를 조정합니다.
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

4. Gzip 압축 기능 활성화

```js
# Rails에서 Gzip 활성화
config.middleware.use Rack::Deflater
# ^-- 데이터 전송 크기를 줄이고 로드 시간을 개선하기 위해 Gzip 압축을 활성화합니다.
```

## 가능한 경우 페이지네이션 사용하기

페이지네이션은 한 번에 일부 데이터를 렌더링하여 보기 성능을 개선하는 데 도움이 됩니다.

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
@posts = Post.paginate(page: params[:page], per_page: 10)
# ^-- 한 페이지 당 로드되는 데이터 양을 제한하기 위해 @posts를 페이지네이션합니다.

```

## 데이터베이스 쿼리 캐싱

캐싱은 성능을 크게 향상시킬 수 있지만, 데이터의 오래된 상태와 메모리 사용량 증가와 같은 문제를 피하기 위해 신중하게 사용해야 합니다.

```js
# 복잡한 쿼리 캐싱
Rails.cache.fetch("post_stats", expires_in: 12.hours) do
 Post.calculate_stats
end
# ^-- 복잡한 쿼리를 캐시하여 응답 시간을 개선하고 데이터베이스 부하를 줄입니다.
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

## 결론

Rails 애플리케이션 성능을 향상시키는 것은 프로파일링, 벤치마킹, 그리고 백엔드와 프론트엔드 모두를 최적화하는 지속적인 과정입니다. 이러한 기술을 적용하고 New Relic, stackprof 등의 도구 및 적절한 데이터베이스 인덱싱을 활용하여 빠르고 확장 가능하며 반응성 있는 애플리케이션을 보장할 수 있습니다.

더 많은 내용 및 심층적인 예제를 보려면 다음 자료를 참고하세요:

- Active Record 쿼리 성능 팁
- 뷰 성능 최적화하기
