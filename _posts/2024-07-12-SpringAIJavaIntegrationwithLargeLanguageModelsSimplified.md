---
title: "Spring AI 대형 언어 모델과 Java 통합 쉽게 하는 방법"
description: ""
coverImage: "/assets/img/2024-07-12-SpringAIJavaIntegrationwithLargeLanguageModelsSimplified_0.png"
date: 2024-07-12 21:20
ogImage:
  url: /assets/img/2024-07-12-SpringAIJavaIntegrationwithLargeLanguageModelsSimplified_0.png
tag: Tech
originalTitle: "Spring AI : Java Integration with Large Language Models Simplified"
link: "https://medium.com/@freeyecheng/spring-ai-java-integration-with-large-language-models-simplified-04873df6a538"
isUpdated: true
---

![link](/assets/img/2024-07-12-SpringAIJavaIntegrationwithLargeLanguageModelsSimplified_0.png)

안녕하세요, 저는 자바 백엔드 개발 엔지니어 이던입니다. 대형 모델의 응용에 큰 흥미를 가지고 있습니다. 이번 AI 봄에는 Spring AI를 환영합니다. 이 기사에서는 Spring AI 및 Ollama 로컬 모델과의 통합 방법에 대해 소개하겠습니다.

# Spring AI

![link](/assets/img/2024-07-12-SpringAIJavaIntegrationwithLargeLanguageModelsSimplified_1.png)

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

오늘은 공식적으로 Spring Initializr에 Spring AI가 등록되었다는 소식이 전해졌어요. 이제 AI와 상호작용하는 더 간소화된 방법을 제공하여 LLM 모델을 Java 작업에 통합하는 학습 곡선을 줄일 수 있어요. 지금 start.spring.io에서 사용하고 구축할 수 있어요.

Spring AI는 인공 지능 엔지니어링을 위한 응용 프로그램 프레임워크입니다. 그 목표는 Spring 생태계의 이식 가능성과 모듈식 설계와 같은 디자인 원칙을 AI 분야에 적용하고, POJO를 AI 응용 프로그램의 구성 요소로 활용하는 것을 촉진하는 것이에요.

# 특징

휴대용 API는 채팅, 텍스트로 이미지로, 모델 포함을 포함한 교차-AI 제공자 상호작용을 지원해요. 동기식 및 스트림 API 옵션을 모두 지원해요. 또한 특정 모델에 액세스하기 위해 매개변수를 구성하는 기능을 지원해요.

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

지원되는 챗 모델:

- OpenAI
- Azure Open AI
- Amazon Bedrock
- Anthropic의 Claude
- Cohere의 Command
- AI21 Labs의 Jurassic-2
- Meta의 LLama 2
- Amazon의 Titan
- Google Vertex AI
- HuggingFace - Llama2와 같이 HuggingFace의 다양한 모델
- Ollama - GPU 없이 로컬에서 AI 모델 실행 지원

지원되는 텍스트-이미지 모델:

- OpenAI의 DALL-E
- StabilityAI

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

지원되는 벡터 모델:

- OpenAI
- Azure OpenAI
- Ollama
- ONNX
- PostgresML
- Bedrock Cohere
- Bedrock Titan
- Google VertexAI

공식 문서: spring.io/projects/spring-ai

# 빠른 시작

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

빠르게 IDEA를 사용하여 새 프로젝트를 시작하고 필요한 AI 모델 종속성을 선택하세요.

여기서 예로 Ollama 모델을 살펴보겠습니다:

![Ollama](/assets/img/2024-07-12-SpringAIJavaIntegrationwithLargeLanguageModelsSimplified_2.png)

# Ollama

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

Ollama은 GPU 자원이 필요 없이 로컬 컴퓨터에서 한 번의 클릭으로 대형 모델을 구축할 수 있게 해주며, Ollama에서 대형 모델의 빠른 테스트 및 통합을 위해 콘솔과 RestfulAPI를 제공합니다.

어떤 모델을 Ollama가 지원하나요?

![Ollama 모델 지원 사진](/assets/img/2024-07-12-SpringAIJavaIntegrationwithLargeLanguageModelsSimplified_3.png)

Ollama 웹사이트: ollama.com/library

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

팁:

- Gemma는 Google Meta에서 최근에 출시된 모델입니다.
- Llama2 모델은 중국어를 잘 지원하지 않지만, Gemma 모델은 중국어에 더 친화적입니다.

# 의존성 소개

```js
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.ai</groupId>
        <artifactId>spring-ai-ollama-spring-boot-starter</artifactId>
    </dependency>
</dependencies>
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.ai</groupId>
            <artifactId>spring-ai-bom</artifactId>
            <version>${spring-ai.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
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

# Ollama 모델 실행하기

로컬 컴퓨터 콘솔에서 ollama run gemma:2b를 실행하세요 (여기서는 gemma 모델을 사용합니다).

![이미지](/assets/img/2024-07-12-SpringAIJavaIntegrationwithLargeLanguageModelsSimplified_4.png)

첫 번째 실행에서는 모델 파일을 다운로드합니다 (약 3GB이며 시간이 오래 걸릴 수 있습니다).

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

모델 리소스를 다운로드한 후에는 위와 같이 모델이 자동으로 시작되며, 콘솔에서 모델을 테스트하고 상호 작용할 수 있습니다.

# Ollama 모델 구성

이 프로젝트의 application.yml 구성 파일을 수정하여 다음을 추가하세요:

```js
spring:
  ai:
    ollama:
      base-url: http://localhost:11434
      chat:
        model: gemma:2b
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

# 테스트

```js
@Test
void contextLoads() {
    String message = """
                누가 도널드 트럼프인가?
            """;
    System.out.println(chatClient.call(message));
}
```

![이미지](/assets/img/2024-07-12-SpringAIJavaIntegrationwithLargeLanguageModelsSimplified_5.png)

# 스트림 액세스

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

```java
@Test
void streamChat() throws ExecutionException, InterruptedException {
    // 수동으로 테스트 함수를 닫기 위한 비동기 함수 구축
    CompletableFuture<Void> future = new CompletableFuture<>();

    String message = """
            연말 업무 요약 보고서
            """;
    PromptTemplate promptTemplate = new PromptTemplate("""
            Java 개발 엔지니어이며 회사의 연말 업무 요약 보고서 작성에 능숙합니다.
            {message} 시나리오를 기반으로 한 100단어 요약 보고서를 작성하십시오.
            """);
    Prompt prompt = promptTemplate.create(Map.of("message", message));
    chatClient.stream(prompt).subscribe(
            chatResponse -> {
                System.out.println("응답: " + chatResponse.getResult().getOutput().getContent());
            },
            throwable -> {
                System.err.println("에러: " + throwable.getMessage());
            },
            () -> {
                System.out.println("완료~!");
                // 함수 닫기
                future.complete(null);
            }
    );
    future.get();
}
```

끝까지 읽어주셔서 감사합니다. 떠나시기 전에:

- 만약 만족했다면 박수나 팔로우, 구독을 부탁드립니다! 👏
- 여러분과 대화를 나누고 소식 전해드리는 것을 기대하며 응답을 기다리겠습니다! 😋
