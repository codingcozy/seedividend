---
title: "네이드 포 스피드 C, NET 8 SSE  채널을 활용한 LLMs Beyond OpenAI, Llama3 및 Fireworksai"
description: ""
coverImage: "/assets/img/2024-05-13-NeedforSpeedLLMsBeyondOpenAIwithCNET8SSEChannelsLlama3andFireworksai_0.png"
date: 2024-05-13 00:03
ogImage: 
  url: /assets/img/2024-05-13-NeedforSpeedLLMsBeyondOpenAIwithCNET8SSEChannelsLlama3andFireworksai_0.png
tag: Tech
originalTitle: "Need for Speed: LLMs Beyond OpenAI with C#, .NET 8 SSE + Channels, Llama3, and Fireworks.ai"
link: "https://medium.com/itnext/need-for-speed-llms-beyond-openai-with-c-net-8-sse-channels-llama3-and-fireworks-ai-16af453e69a1"
isUpdated: true
---




<img src="https://miro.medium.com/v2/resize:fit:1400/1*YtK6hvB_PrUvd7uwqrk0-w.gif" />

# 요약

- OpenAI의 GTP-4는 일반적인 목적의 작업에 있어 압도적인 성능을 보여주지만, 전체적인 처리량(또는 오히려 그 부족함)이 많이 부족하다는 점이 매우 아쉽습니다. 이는 "오프라인" 작업에는 훌륭하지만, 사용자들이 더 많은 응답성을 기대하는 응용 프로그램에서는 적합하지 않을 수 있으며, 몇몇 사용 사례들은 하위 UX로 인해 배제될 수도 있습니다.
- TheFastest.ai 팀의 최근 Hackernews 게시물은 모델과 플랫폼 모두에 대해 이런 차이가 얼마나 클 수 있는지를 강조하고 있습니다. 특히, Groq.com(Musk의 Grok와 혼동하지 말아야 합니다)와 Meta의 Llama 3 70B를 사용한 Fireworks.ai는 일부 작업에서 GPT-4와 비교했을 때 출력에 거의 희생 없이 빠른 처리량을 제공합니다.
- C#/.NET 8 System.Threading.Channels와 서버 전송 이벤트(SSE)를 결합하면, OpenAI의 처리량과 높은 지연 시간으로 잘 동작하지 않은 작업을 구성할 수 있습니다.

# 소개



GPT-5를 기다리는 동안, 2024년 5월 OpenAI의 GPT-4가 여전히 LLM으로서 전반적인 성능 면에서 우수하다는 것에 대해 논쟁하는 사람은 거의 없을 것입니다. 그러나 해당 모델은 비교적 낮은 처리량과 높은 대기 시간으로 인해 UX가 더 상호 작용적인 경험을 요구하는 경우에는 최적이 아닐 수 있습니다.

가장 빠른 LLM과 현재 사용 가능한 플랫폼과 OpenAI 간의 대기 시간 차이의 규모가 얼마나 큰지는 명백하지 않을 수 있습니다.

최근 Hackernews 스레드를 통해 TheFastest.ai로 이동하게 되었고, Meta의 Llama 3의 높은 처리량과 Groq.com 및 Fireworks.ai라는 두 플랫폼에 흥미로웠습니다.

(전자는 종종 머스크의 Grok AI와 혼동되기 때문에 불행합니다).



이 기사에서는 Fireworks.ai, Meta Llama 3 8B/70B, .NET 8, System.Threading.Channels 및 Server Sent Events (SSE)를 사용하여 앱을 만드는 방법을 살펴볼 것입니다.

# 차이를 측정하기

스택의 상단은 Llama-3과 Groq가 지배하고 Fireworks.ai가 상위 5위를 차지하고 있습니다(각 팀이 Fireworks를 선택해야 할 이유에 대해 조금 뒤에 설명하겠습니다).

![이미지](/assets/img/2024-05-13-NeedforSpeedLLMsBeyondOpenAIwithCNET8SSEChannelsLlama3andFireworksai_0.png)



대조적으로, OpenAI의 GPT-4는 거의 맨 아래쪽에 위치합니다.

![이미지](/assets/img/2024-05-13-NeedforSpeedLLMsBeyondOpenAIwithCNET8SSEChannelsLlama3andFireworksai_1.png)

OpenAI의 GPT-4를 사용해본 사람이라면 이미 처리량이 얼마나 낮은지를 알고 있을 것입니다. 하지만 이렇게 측정된 값을 보면 그 간격이 얼마나 큰지 더욱 부각됩니다. Groq의 Llama-3 70B는 GPT-4보다 거의 10배 더 높은 처리량을 가지고 있습니다!

이에 따라, GPT-4는 상호 작용이 필요하지 않은 경우에, 작업이 큰 문맥 창을 요구하는 경우에, 또는 복잡한 프롬프트와 문맥을 사용하여 "벤치마크 품질"의 결과가 필요한 경우에 실제로 매우 좋다고 생각했습니다.



하지만 사용 사례에 다른 요구 사항이 있는 경우는 어떨까요? 속도가 필요한 경우는 어떨까요?

# Groq와 Fireworks를 이용해 시동 걸기

OpenAI의 처리량이 떨어져 사용자 경험을 나빠지게 만들 수 있는 문제 중 하나는, 최종적으로 콘텐츠가 가치를 추가한다 해도 주관적으로 사용자 경험을 나빠지게 할 수 있다는 것입니다.

OpenAI의 ChatGPT를 사용할 때, 채팅 응답에 몇 초가 걸릴 수도 있다는 사실을 SSE가 가려버리기 때문에 명확하게 드러나지 않을 수 있습니다. GPT-4의 처리량이 낮다는 것은 다른 대안을 시도해보기 전까지는 쉽게 알아챌 수 없습니다.



# Groq.com

Groq는 LLM에 특별히 설계된 사용자 정의 하드웨어로 알려진 "LPU" 또는 "언어 처리 유닛"을 갖춘 흥미로운 플랫폼입니다:

적어도 문서로 보면, 이것은 마케팅 허세 이상으로 보이며 플랫폼은 객관적으로 고 처리량을 자랑합니다.

하지만 주요 문제는 현재의 SaaS 제공으로 이어집니다:



![이미지](/assets/img/2024-05-13-NeedforSpeedLLMsBeyondOpenAIwithCNET8SSEChannelsLlama3andFireworksai_2.png)

무료 티어는 실험 용도로만 사용 가능하며, 그것도 겨우 가능할 뿐입니다.

![이미지](/assets/img/2024-05-13-NeedforSpeedLLMsBeyondOpenAIwithCNET8SSEChannelsLlama3andFireworksai_3.png)

그래서 Groq은 꽤 빠르지만, 샌드박싱 용도 외에는 사용할 수 없으며, 가능하다면 엔터프라이즈 과금을 통해 사용할 수 있습니다.



# Fireworks.ai

현재 시점에서 Fireworks의 Llama-3 70B는 전체적으로 9위에 랭크되어 있으며 두 번째로 빠른 Llama-3 70B입니다:

![이미지](/assets/img/2024-05-13-NeedforSpeedLLMsBeyondOpenAIwithCNET8SSEChannelsLlama3andFireworksai_4.png)

마지막 토큰까지 260ms가 소요되며, 여전히 매우 빠르며 GPT-3.5와 GPT-4 사이의 성능을 제공하여 내 사용 사례에 대한 LLM 성능이 매우 좋습니다.



Fireworks.ai에는 중간 유료 티어가 없지만, 600 RPM은 작은 앱에 사용하기 적합하며 하드 토큰 제한이 없습니다.

![이미지](/assets/img/2024-05-13-NeedforSpeedLLMsBeyondOpenAIwithCNET8SSEChannelsLlama3andFireworksai_5.png)

오늘 빠르게 무언가를 구축하려는 팀들에게는 Fireworks.ai가 아마도 최선의 선택일 것입니다. (아니, 나는 그들로부터 돈을 받고 있지 않아요)

# .NET 8, System.Threading.Channels 및 Server Sent Events (SSE)와 함께 실용적인 예제



이 놀라운 처리량을 활용하기 위해서는 한 번에 여러 개의 스트림을 통해 생성한 다음 하나의 최종 출력 스트림으로 병합하는 동시 처리 전략이 필요합니다.

이는 .NET의 System.Threading.Channels를 Server Sent Events (SSE)와 결합하여 이 처리량을 완전히 활용하고 높은 반응성을 갖는 생성 AI 경험을 구축하는 완벽한 사용 사례입니다.

이전에 이 두 주제에 대해 별도로 다뤘었습니다:

- .NET Task Parallel Library vs System.Threading.Channels
- .NET 6의 System.Threading.Channels를 이용한 동시 처리 (보너스: 간격 트리)
- .NET 7과 함께하는 Server Sent Events



오늘은 .NET 8 채널, Semantic Kernel 및 gen AI와 함께 어떤 대화형 경험을 만들 수 있는지 함께 살펴보겠습니다!

![image](/assets/img/2024-05-13-NeedforSpeedLLMsBeyondOpenAIwithCNET8SSEChannelsLlama3andFireworksai_6.png)

저희 샘플 응용 프로그램은 준비된 재료 목록과 목표 조리 시간을 받아들여서 다음을 할 것입니다:

- 해당 재료로 만들 수 있는 레시피 목록 생성
- 레시피 중 하나를 무작위로 선택
- 레시피를 위해 필요한 모든 재료 목록 생성
- 레시피를 위한 소개 단락 생성
- 준비된 각 재료에 대한 영양 정보에 대한 간략한 설명 생성
- 제안된 사이드 디시 목록 생성
- 순서 목록 생성



단계 3~6은 병렬로 실행될 수 있지만, 레시피를 먼저 선택해야 하기 때문에 단계 1~2가 먼저 실행됩니다. 그리고 단계를 생성하기 전에 재료 전체 목록을 기다려야 합니다.

# .NET 채널을 이용한 병행 실행

API 호출의 진입점은 요청을 받을 단일 POST 엔드포인트입니다:

```js
// 👇 메인 진입점.
app.MapPost("/generate", async (
  HttpContext context,          // 의존성 주입에서 가져옴
  RecipeGenerator generator,    // 의존성 주입에서 가져옴
  RecipeRequest request,        // 바디에서 가져옴
  CancellationToken cancellation = default
) =>
{
  context.Response.Headers.ContentType = "text/event-stream";

  await generator.GenerateAsync(
    request,
    // 각 단편에 대한 스트리밍 응답을 작성하는 핸들러
    async (Fragment f) => {
      await context.Response.WriteAsync(
        $"data: {f.Part}|{f.Content}{Environment.NewLine}{Environment.NewLine}",
        cancellation
      );
      await context.Response.Body.FlushAsync(cancellation);
    }
  );
});
```



RecipeGenerator.GenerateAsync 메서드에는 메인 플로우가 포함되어 있어요:

```js
/// <summary>
/// 주요 시작점
/// </summary>
public async Task GenerateAsync(
  RecipeRequest request,
  Func<Fragment, Task> handler, // 👈 이것은 HTTP 응답 스트림에 연결된 후크에요
  CancellationToken cancellation = default
) {

  var (ingredientsOnHand, prepTime) = request;

  // 👇 (1) 3개의 레시피 목록을 생성하고 무작위로 하나를 선택
  var recipes = await GenerateRecipesAsync(ingredientsOnHand, prepTime, cancellation);

  Console.WriteLine($"생성된 레시피 수: {recipes.Length}.");

  var recipe = recipes[Random.Shared.Next(0, 2)];

  // 👇 (2) 모든 레시피를 보유하여 HTML 문자열로 집계
  var alternates = recipes
    .Where(r => r.Name != recipe.Name)
    .Aggregate(new StringBuilder(), (html, r) => {
      html.Append($"<li><b>{r.Name}</b> &nbsp;");
      html.Append($"<i>{r.Intro}</i></li>");

      return html;
    }).ToString();

  // 👇 (3) 읽기 채널의 리더 측에 대한 반복 작업입니다; 먼저 시작해야 해요
  var fragmentHandler = async () => {
    while (await _channel.Reader.WaitToReadAsync()) {
      if (_channel.Reader.TryRead(out var fragment)) {
        await handler(fragment);
      }
    }
  };

  var completion = fragmentHandler();

  // 👇 (4) 이제 세대 프롬프트를 동시에 실행해요
  Task.WaitAll([
    handler(new ("alt", alternates)),
    GenerateIngredientsAsync(recipe, ingredientsOnHand, request.PrepTime, cancellation),
    GenerateIntroAsync(recipe, cancellation),
    GenerateIngredientIntroAsync(ingredientsOnHand, cancellation),
    GenerateSidesAsync(recipe, cancellation)
  ]);

  // 👇 (5) 그리고 모든 작업이 완료될 때까지 기다려요.
  _channel.Writer.Complete();

  await completion;
}
```

여기서 Task.WaitAll의 중요한 차이점은 JavaScript의 Promise.all과 개념적으로 비슷하지만, .NET에서는 멀티 스레드인 .NET 런타임 때문에 동시성과 병렬로 실행될 수 있어요. 이 경우 스레드 풀 스케줄러가 각 작업이 다른 스레드에서 실행될지 여부를 결정할 거에요. 채널을 사용하면 출력을 하나의 스레드에 바인딩된 리더에 병합하여 동기화된 액세스가 필요 없어졌어요.

각 세대 작업은 비슷한 패턴을 따라가요:



```js
private async Task GenerateIntroAsync(
  RecipeSummary recipe,
  CancellationToken cancellation = default
) {
  var prompt = "...";

  await ExecutePromptAsync(
    "int", // 👈 이것은 프론트엔드 출력 대상의 ID와 일치합니다
    prompt,
    new () {
      MaxTokens = 250,
      Temperature = 0.55,
      TopP = 0
    },
    cancellation: cancellation
  );
}
```

그리고 프롬프트를 실행하는 메서드:

```js
/// <summary>
/// 프롬프트를 실행하고 결과를 채널에 작성합니다.
/// </summary>
private async Task ExecutePromptAsync(
  string part,
  string prompt,
  OpenAIPromptExecutionSettings settings,
  Action<string>? resultHandler = null,
  string? modelOverride = null,
  CancellationToken cancellation = default
) {
  // 👇 대화를 초기화합니다
  var chat = _kernel.GetRequiredService<IChatCompletionService>(
    modelOverride ?? "70b" // 명시된 오버라이드가 없으면 70b를 사용합니다.
  );

  var history = new ChatHistory();
  var buffer = new StringBuilder();

  history.AddUserMessage(prompt);

  // 👇 응답을 스트리밍하고 각 부분을 채널에 작성합니다
  await foreach (var message in chat.GetStreamingChatMessageContentsAsync(
      history, settings, _kernel, cancellation
    )
  ) {
      await _channel.Writer.WriteAsync( // 👈 채널의 라이터 엔드
        new(part, message.Content ?? ""),
        cancellation
      );

      buffer.Append(message.Content); // 👈 전체 출력을 보유하는 버퍼
  }

  var output = buffer.ToString();

  // 👇 호출자가 전체 결과를 원하는 경우 여기에서 사용할 수 있습니다
  resultHandler?.Invoke(output);
}
```

애플리케이션 실행 중 의존성 주입을 통해 커널 인스턴스가 구성됩니다:



```js
// Program.cs
var builder = WebApplication.CreateBuilder(args);

var fireworksEndpoint = new Uri("https://api.fireworks.ai/inference/v1/chat/completions");
var groqEndpoint = new Uri("https://api.groq.com/openai/v1/chat/completions");

var config = builder.Configuration
  .GetSection(nameof(RecipesConfig))
  .Get<RecipesConfig>();

// Semantic Kernel을 설정하여 필요한만큼의 LLM을 등록합니다.
var kernelBuilder = Kernel.CreateBuilder();
var kernel = kernelBuilder
  .AddOpenAIChatCompletion(
    modelId: "accounts/fireworks/models/llama-v3-70b-instruct",
    apiKey: config!.FireworksKey,
    endpoint: fireworksEndpoint,
    serviceId: "70b" // 👈 더 나은 결과를 위해 기본적으로 이 serviceId를 사용합니다
  )
  .AddOpenAIChatCompletion(
    modelId: "accounts/fireworks/models/llama-v3-8b-instruct",
    apiKey: config!.FireworksKey,
    endpoint: fireworksEndpoint,
    serviceId: "8b" // 👈 더 빠른 속도가 필요한 경우 이 serviceId를 사용합니다
  )
  .AddOpenAIChatCompletion(
    modelId: "llama3-8b-8192",
    apiKey: config!.GroqKey,
    endpoint: groqEndpoint,
    serviceId: "groq-8b" // 👈 최대 처리량을 위해 이 serviceId를 사용합니다
  )
  // 다른 LLM을 여기에 등록합니다.
  .Build();

builder.Services
  .Configure<RecipesConfig>(
    builder.Configuration.GetSection(nameof(RecipesConfig))
  )
  .AddCors()
  .AddSingleton(kernel)  // 👈 설정된 kernel을 싱글톤으로 추가합니다
  .AddScoped<RecipeGenerator>();
```

Semantic Kernel을 통해 여러 LLM 엔드포인트를 구성할 수 있습니다. 이를 사용하여 작은 빠른 LLM이 프로세스를 가속화할 수 있는 플로 구현을 단순화할 수 있습니다.

# SSE를 활용한 동시 스트림

컨텐츠가 생성되면 백엔드는 즉시 프론트엔드로 스트리밍하여 매우 반응이 뛰어난 사용자 경험을 제공합니다. 이 과정은 동시에(그리고 스레드 풀 스케줄러에 따라 확장하여 병렬로) 발생하며, 채널에 수집되어 클라이언트에서 소비될 응답 스트림으로 작성됩니다.



이 흐름을 시각화하기 위해 아래 다이어그램을 확인해보세요:

![다이어그램](/assets/img/2024-05-13-NeedforSpeedLLMsBeyondOpenAIwithCNET8SSEChannelsLlama3andFireworksai_7.png)

Task.WaitAll 코드 블록은 채널의 공유 가능하고 스레드 안전한 writer 엔드를 전달받은 상태이며, reader 엔드는 HTTP 응답 스트림과 콜백을 통해 연결됩니다.

해당 콜백은 간단히 EventSource의 필요한 형식 명세에 따라 Fragment를 서식화합니다.



이 경우:

```js
data: ing|tomatoes

data: ing|basil

data: ste|3. Chop the
```

프론트엔드는 이러한 메시지 스트림을 받아 UI의 서로 다른 섹션에 누적합니다.

- 첫 번째 부분인 ing은 이 내용이 속하는 프론트엔드 부분을 식별합니다 (이 경우에는 "재료")
- | 이후의 텍스트는 LLM에 의해 작성된 출력 토큰 세트를 의미합니다.



프론트엔드에서 @microsoft/fetch-event-source는 기본 EventSource를 대체하여 POST 사용을 가능하게 하는 폴리필(polyfill)로 사용됩니다.

수신자는 각 메시지를 가져와 디코드합니다:

```js
onmessage: (msg) => {
  var payload = msg.data

  var [part, content] = payload.split('|')

  if (!part || !$el(`#${part}`)) {
    return // 이 메시지는 버립니다
  }

  // 👇 이 부분은 새 줄을 인코딩하고 여기서 대체하는 해킹입니다.
  content = content.replace(/⮑/gi, "\n")

  $el(`#${part}`).innerHTML += content
},
```

text/event-stream의 특이점은 이중 줄바꿈이 메시지 블록의 끝을 나타낸다는 것입니다. 그래서 줄바꿈은 어떤 방식으로든 인코딩되어야 합니다 (다양한 방법이 있습니다). 이 경우, 단일 문자 ⮑을 사용하여 해당 문자를 찾아 \n으로 대체하는 것이 간답습니다.



CSS는 그냥 이 부분을 고려하면 됩니다:

```js
#add, #ing, #ste {
  white-space: pre-line;
}
```

HTML 자체는 간단합니다:

```js
<!-- 이 블록은 추가 재료를 보관합니다 -->
<div class="additional">
  <h2>필요한 재료</h2>
  <!-- 👇 이 ID는 Fragment.Part와 일치합니다 -->
  <div id="add"></div>
</div>

<!-- 이 블록은 단계를 보관합니다 -->
<div class="recipe">
  <h2>조리 단계</h2>
  <!-- 👇 이 ID는 Fragment.Part와 일치합니다 -->
  <div id="ste"></div>
</div>
```



# 모두가 준비되었으니 이제 앱을 실행하면 다음과 같은 경험을 할 수 있습니다:

![recipe app](https://miro.medium.com/v2/resize:fit:1400/0*uCMJGy8UoyaC4rFX.gif)

레시피 목록을 생성하는 호출이 차단되므로 약간의 초기 지연이 있습니다.



그러나 한 번 목록이 생성되고 무작위로 선택된 후, 추가적인 생성은 전체 재료 목록에 의해 차단되는 단계만 동시에 발생합니다. (전체 재료 목록을 사용하여 정확한 단계를 생성해야 하기 때문입니다).

# 결론

사용자 경험(UX)이 높은 처리량을 필요로 하며 작은 컨텍스트 창을 통해 작동할 수 있는 애플리케이션의 경우, Fireworks.ai와 Llama-3 8B/70B는 절대적으로 게임 체인저입니다. 그것은 팀이 OpenAI의 GPT 모델의 높은 지연 때문에 전반적인 UX를 희생시키지 않고 사용 사례에 대해 빌드할 수 있도록 해줍니다.

System.Threading.Channels를 사용한 .NET 8 웹 API에 그것을 플러그인하고 SSE와 결합하면, 여러 콘텐츠 청크를 동시에 생성하고, 상호작용적인 생성 AI 경험을 더 많이 구축하거나 생성적인 워크플로우를 간단히 가속화하는 새로운 가능성을 열 수 있습니다.



동일한 기술을 사용하면 (SSE를 제외하고) 낮은 지연 시간 + 높은 처리량 모델 및 플랫폼을 사용하여 여러 프롬프트를 병렬로 처리하여 서버 생성 워크로드의 처리량을 늘릴 수 있습니다.

전체 repository: