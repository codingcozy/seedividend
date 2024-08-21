---
title: "아파치 APISIX에서 이데모턴시-키 사양 구현하기"
description: ""
coverImage: "/assets/no-image.jpg"
date: 2024-08-19 03:23
ogImage:
  url: /assets/no-image.jpg
tag: Tech
originalTitle: "Implementing the Idempotency-Key specification on Apache APISIX"
link: "https://medium.com/apache-apisix/implementing-the-idempotency-key-specification-on-apache-apisix-bf77f94ac56d"
isUpdated: true
updatedAt: 1724032935500
---

지난 주에 IETF Idempotency-Key 사양의 분석을 작성했어요. 이 사양은 중복된 요청을 피하기 위해 목표를 두고 있어요. 간단히 말해, 아이디어는 클라이언트가 요청과 함께 고유한 키를 보내는 것입니다:

- 서버가 키를 모르면, 보통대로 진행한 다음 응답을 저장합니다.
- 서버가 키를 알고 있다면, 추가적인 처리를 바로 중단하고 저장된 응답을 즉시 반환합니다.

이 포스트는 Apache APISIX로 어떻게 구현하는지를 보여줍니다.

# 개요

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

코딩을 시작하기 전에 몇 가지를 정의해야 합니다. Apache APISIX는 플러그인 기반 아키텍처를 제공합니다. 따라서 우리는 위의 로직을 플러그인으로 작성할 것입니다.

Apache APISIX는 OpenResty를 기반으로 구축되었으며, OpenResty는 nginx를 기반으로 합니다. 각 구성 요소는 단계를 정의하는데, 이는 대부분의 경우에 서로 매핑됩니다. 단계에 대한 자세한 정보는 이전 게시물을 참조해주세요.

마지막으로 우리는 우선순위를 결정해야 합니다. 우선순위는 APISIX에서 플러그인을 실행하는 순서를 정의합니다. 저는 모든 인증 플러그인이 2000 이상의 범위에 우선순위를 가지고 있지만, 캐시된 응답을 빨리 반환하고 싶어서 1500으로 결정했습니다.

사양에는 데이터를 저장해야 한다고 명시되어 있습니다. APISIX는 많은 추상화 기능을 제공하지만 저장소는 포함되어 있지 않습니다. 그래서 이데모텐시 키를 통해 접근할 수 있어야 하므로 키-값 저장소처럼 보입니다.

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

Redis를 제가 임의로 선택했어요. 전반적으로 널리 사용되고 있고, APISIX 배포에 이미 클라이언트가 포함되어 있습니다. 단순 Redis는 JSON 저장을 제공하지 않기 때문에 redis-stack 도커 이미지를 사용하고 있어요.

로컬 인프라는 다음과 같아요:

```js
services:
  apisix:
    image: apache/apisix:3.9.0-debian
    volumes:
      - ./apisix/config.yml:/usr/local/apisix/conf/config.yaml:ro
      - ./apisix/apisix.yml:/usr/local/apisix/conf/apisix.yaml:ro #1
      - ./plugin/src:/opt/apisix/plugins:ro                  #2
    ports:
      - "9080:9080"
  redis:
    image: redis/redis-stack:7.2.0-v9
    ports:
      - "8001:8001"                                          #3
```

- 정적 경로 구성
- 향후 플러그인 경로
- Redis Insights 포트(GUI). 필수는 아니지만 개발 중에 디버깅에 매우 유용합니다.

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

APISIX 구성은 다음과 같습니다:

```js
deployment:
  role: data_plane
  role_data_plane:
    config_provider: yaml                                    #1
apisix:
  extra_lua_path: /opt/?.lua                                 #2
plugins:
  - idempotency                    # priority: 1500          #3
plugin_attr:                                                 #4
  idempotency:
    host: redis                                              #5
```

- APISIX를 정적 경로 구성에 맞게 설정합니다.
- 플러그인의 위치를 구성합니다.
- 사용자 정의 플러그인은 명시적으로 선언해야 합니다. 우선순위 주석은 필수는 아니지만 최적화된 유지보수를 위해 좋습니다.
- 모든 경로에 대한 공통 플러그인 구성
- 아래 참조

마지막으로, 우리의 단일 경로를 선언합니다:

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

```yaml
routes:
  - uri: /*
    plugins:
      idempotency: ~ #1
    upstream:
      nodes:
        "httpbin.org:80": 1 #2
#END                                                         #3
```

- 우리가 만들 것이라고 선언한 플러그인
- httpbin은 다양한 URI와 메서드를 시도할 수 있는 유용한 업스트림입니다.
- 정적 라우트 구성에 필수적입니다!

이 인프라를 갖추면 구현을 시작할 수 있습니다.

# 플러그인 배치하기

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

Apache APISIX 플러그인의 기초는 꽤 기본적입니다:

```js
local plugin_name = "idempotency"

local _M = {
    version = 1.0,
    priority = 1500,
    schema = {},
    name = plugin_name,
}
return _M
```

다음 단계는 구성, 즉 Redis 호스트 및 포트를 설정하는 것입니다. 우선, 모든 경로에 걸쳐 하나의 Redis 구성을 제공할 것입니다. 이것이 config.yaml 파일의 plugin_attr 섹션의 의도입니다. 이제 플러그인을 자세히 살펴보겠습니다:

```js
local core = require("apisix.core")
local plugin = require("apisix.plugin")

local attr_schema = {
    type = "object",
    properties = {
        host = {
            type = "string",
            description = "Redis 호스트",
            default = "localhost",
        },
        port = {
            type = "integer",
            description = "Redis 포트",
            default = 6379,
        },
    },
}
function _M.init()
    local attr = plugin.plugin_attr(plugin_name) or {}
    local ok, err = core.schema.check(attr_schema, attr)
    if not ok then
        core.log.error("plugin_attr[", plugin_name, "]를 확인하는 데 실패했습니다: ", err)
        return false, err
    end
end
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

- 구성의 모양을 정의합니다
- 구성이 유효한지 확인합니다

플러그인에 기본 값을 정의했기 때문에 Docker Compose 인프라 내에서 실행되도록 호스트를 redis로 재정의하여 기본 포트를 사용할 수 있습니다.

다음으로, Redis 클라이언트를 생성해야 합니다. 플랫폼이 리라이트/액세스 섹션 이후의 모든 단계에서 연결하는 것을 방지하므로 init() 메서드에서 생성한 후 끝까지 유지할 것입니다.

```js
local redis_new = require("resty.redis").new                --1

function _M.init()
    -- ...
    redis = redis_new()                                     --2
    redis:set_timeout(1000)
    local ok, err = redis:connect(attr.host, attr.port)
    if not ok then
        core.log.error("Redis 연결에 실패했습니다: ", err)
        return false, err
    end
end
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

- OpenResty Redis 모듈의 새로운 기능을 참조하십시오.
- 해당 기능을 호출하여 인스턴스를 가져옵니다.

나머지 플러그인 실행 주기 동안 redis 변수에서 Redis 클라이언트를 이제 사용할 수 있습니다.

# 정상 경로 구현하기

나의 이전 소프트웨어 엔지니어 경험에서, 보통 나는 먼저 정상 경로를 구현했습니다. 그 후에 개별적으로 오류 상황을 처리하여 코드를 보다 견고하게 만들었습니다. 이렇게 하면 언제든지 릴리스를 해야 하는 경우에도 경고와 함께 비즈니스 가치를 전달할 수 있습니다. 이 작은 프로젝트에도 같은 방식으로 접근하겠습니다.

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

명목 경로에 대한 의사 알고리즘은 아래와 같이 보입니다:

```js
DO 요청에서 idempotency 키 추출
DO Redis에서 값 조회
IF 값이 존재하지 않는다면
  DO Redis에 빈 값으로 키 설정
ELSE
  캐시된 응답 반환
DO 상향으로 전달
DO 응답을 Redis에 저장
응답 반환
```

우리는 위에서 언급한 단계에 로직을 매핑해야 합니다. 상향으로 가기 전에 두 가지 단계가 있습니다. 재작성 및 액세스; 그 후에는 헤더 필터, 본문 필터 및 로그가 세 가지가 있습니다. 액세스 단계는 이전에 작업하기에 명백했지만, 세 가지 다른 옵션 사이에서 결정해야 했습니다. 저는 임의로 본문 필터를 선택했지만, 다른 단계에 대한 합리적인 논지를 듣기를 기꺼이 합니다.

코드를 보다 읽기 쉽게 만들기 위해 로그를 제거했음을 주의해 주세요. 오류 및 정보 로그는 제품 문제의 디버깅을 용이하게하기 위해 필요합니다.

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
function _M.access(conf, ctx)
    local idempotency_key = core.request.header(ctx, "Idempotency-Key") --1
    local redis_key = "idempotency#" .. idempotency_key     --2
    local resp, err = redis:hgetall(redis_key)              --3
    if not resp then
        return
    end
    if next(resp) == nil then                               --4
        local resp, err = redis:hset(redis_key, "request", true) --4
        if not resp then
            return
        end
    else
        local data = normalize_hgetall_result(resp)         --5
        local response = core.json.decode(data["response"]) --6
        local body = response["body"]                       --7
        local status_code = response["status"]              --7
        local headers = response["headers"]
        for k, v in pairs(headers) do                       --7
            core.response.set_header(k, v)
        end
        return core.response.exit(status_code, body)        --8
    end
end
```

- 요청에서 idempotency 키 추출
- 충돌 가능성을 피하기 위해 키 접두사 추가
- Redis에서 idempotency 키 아래에 저장된 데이터 집합 가져오기
- 키를 찾을 수 없으면 부울 표식과 함께 저장
- 사용자 지정 유틸리티 함수를 통해 Lua 테이블로 데이터 변환
- 헤더를 고려한 JSON 형식으로 응답 저장
- 응답 재구성
- 재구성된 응답을 클라이언트에 반환합니다. 반환 문 참고: APISIX는 후속 생명주기 단계를 건너뜁니다

```js
function _M.body_filter(conf, ctx)
    local idempotency_key = core.request.header(ctx, "Idempotency-Key") --1
    local redis_key = "idempotency#" .. idempotency_key
    if core.response then
        local response = {                                  --2
            status = ngx.status,
            body = core.response.hold_body_chunk(ctx, true),
            headers = ngx.resp.get_headers()
        }
        local redis_key = "idempotency#" .. redis_key
        local resp, err = red:set(redis_key, "response", core.json.encode(response)) --3
        if not resp then
            return
        end
    end
end
```

- 요청에서 idempotency 키 추출
- 응답의 다른 요소를 Lua 테이블에 정리
- JSON으로 인코딩된 응답을 Redis 세트에 저장

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

테스트 결과, 예상한 대로 작동하는 것으로 나타났어요.
다음을 시도해보세요:

```js
curl -i -X POST -H 'Idempotency-Key: A' localhost:9080/response-headers\?freeform=hello
curl -i -H 'Idempotency-Key: B' localhost:9080/status/250
curl -i -H 'Idempotency-Key: C' -H 'foo: bar'  localhost:9080/status/250
```

그리고 세 번째 요청에 불일치하는 idempotency 키, 예를 들어 A를 재사용해보세요. 아직 오류 관리를 구현하지 않았기 때문에 다른 요청에 대한 캐시된 응답을 받게 될 거에요. 우리의 게임을 높일 때가 왔습니다.

# 오류 경로 구현하기

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

지정서에는 여러 가지 오류 경로가 정의되어 있습니다:

- Idempotency-Key가 누락되었습니다.
- Idempotency-Key가 이미 사용 중입니다.
- 이 Idempotency-Key에 대한 요청이 진행 중입니다.

이제 하나씩 구현해 봅시다. 먼저 요청에 idempotency 키가 있는지 확인해 보겠습니다. 라우트별로 플러그인을 구성할 수 있으므로 라우트에 플러그인이 포함되어 있으면 이것이 필수적이라고 결론짓을 수 있습니다.

```js
function _M.access(conf, ctx)
    local idempotency_key = core.request.header(ctx, "Idempotency-Key")
    if not idempotency_key then
        return core.response.exit(400, "이 작업은 동일성을 보장하며 Idempotency Key를 정확히 사용해야 합니다.")
    end
    -- ...
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

기존 key가 누락된 경우 적절한 400을 반환하면 됩니다. 그 부분은 쉬웠네요.

다른 요청에서 기존 key를 재사용하는지 확인하는 것은 조금 더 복잡합니다. 먼저 요청을 저장해야 하거나 더 정확히 말하자면, 요청을 구성하는 핑거프린트를 저장해야 합니다. 두 요청이 같은지 여부를 확인하려면 동일한 방식, 동일한 경로, 동일한 본문 및 동일한 헤더가 있는지 확인해야 합니다. 상황에 따라 도메인(및 포트)이 이에 포함될 수도 있고 아닐 수도 있습니다. 제 간단한 구현에서는 이를 생략하겠습니다.

해결해야 할 문제가 몇 가지 있습니다. 먼저, 다른 언어에서 제가 더 익숙한 Java의 Object.hash()와 같이 핵심 request 객체를 해싱할 수 있는 기존 API를 찾지 못했습니다. 그래서 객체를 JSON으로 인코딩하고 문자열을 해싱하기로 결정했습니다. 그러나 기존의 core.request에는 JSON으로 변환할 수 없는 하위 요소가 있었습니다. 따라서 위에서 언급한 부분을 추출하고 테이블을 변환해야 했습니다.

```js
local function hash_request(request, ctx)
    local request = {                                       --1
        method = core.request.get_method(),
        uri = ctx.var.request_uri,
        headers = core.request.headers(),
        body = core.request.get_body()
    }
    local json = core.json.stably_encode(request)           --2
    return ngx.encode_base64(json)                          --3
end
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

- 필요한 부분만 포함된 표를 생성합니다
- cjson 라이브러리는 여러 호출 사이에 멤버가 서로 다르게 정렬될 수 있는 JSON을 생성합니다. 따라서 다른 해시가 발생합니다. core.json.stably_encode는 이 문제를 해결합니다.
- 해시값을 만듭니다

그런 다음, 요청을 받았을 때 불리언(boolean)을 저장하는 대신에 생성된 해시값을 저장합니다.

```js
local hash = hash_request(core.request, ctx)
if next(resp) == nil then
    core.log.warn("Idempotency-Key에 대한 Redis에서 키를 찾을 수 없습니다. 설정합니다: ", redis_key)
    local resp, err = redis:hset(redis_key, "request", hash)
    if not resp then
        core.log.error("Redis에 데이터를 설정하는 데 실패했습니다: ", err)
        return
    end
end -- ...
```

다른 분기에서 idempotency 키 아래에 저장된 해시값을 읽습니다. 일치하지 않으면 관련 오류 코드로 종료합니다:

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
local data = normalize_hgetall_result(resp)
local stored_hash = data["request"]
if hash ~= stored_hash then
    return core.response.exit(422, "이 작업은 동형성이며 이동 가능성 키의 올바른 사용을 필요로 합니다. 동형성 키는 이 작업의 다른 페이로드 사이에서 재사용되어서는 안 됩니다.")
end
```

마지막 오류 관리는 그 다음에 발생합니다. 다음 시나리오를 상상해보세요:

- 동형성 키 X가 포함된 요청이 도착합니다.
- 플러그인이 지문을 만들고 Redis에 해시를 저장합니다.
- APISIX가 요청을 상위 계층으로 전달합니다.
- 동일한 동형성 키 X를 가진 중복 요청이 도착합니다.
- 플러그인은 Redis에서 데이터를 읽어 캐시된 응답을 찾지 못합니다.

상위 계층은 요청 처리를 완료하지 않았으므로 첫 번째 요청은 아직 body_filter 단계에 도달하지 못했습니다.

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

위 코드 조각에 다음 코드를 추가합니다:

```js
if not data["response"] then
    return core.response.exit(409, "같은 작업에 대해 동일한 Idempotency-Key로 요청이 처리 중이거나 처리 대기 중입니다.")
end
```

여기까지입니다.

# 결론

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

이 게시물에서는 Apache APISIX에서 플러그인을 통해 Idempotency-Key 헤더 사양의 간단한 구현을 보여드렸습니다. 현재 단계에서는 자동화된 테스트, 경로별로 Redis 구성 가능 여부, 요청의 일부로 구성할 도메인/경로 설정, 단일 인스턴스 대신 Redis 클러스터 설정, 다른 K/V 스토어 사용 등의 개선 사항이 있습니다.

그러나 이는 사양을 구현하고 있으며 조금 더 제품 수준의 구현으로 진화할 잠재력이 있습니다.

이 게시물의 완전한 소스 코드는 GitHub에서 찾을 수 있습니다.

더 나아가려면:

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

- Idempotency-Key HTTP Header Field
- 중복 API 요청 수정
- Plugin Develop — APISIX 웹사이트
- 0에서 1까지 Apache APISIX 플러그인 만들기?

2024년 4월 7일에 A Java Geek에서 최초로 게시됨
