---
title: "OpenAI 기능 호출로 훈련 데이터 생성하는 방법"
description: ""
coverImage: "/assets/img/2024-06-23-GeneratingtrainingdatawithOpenAIfunctioncalling_0.png"
date: 2024-06-23 13:54
ogImage:
  url: /assets/img/2024-06-23-GeneratingtrainingdatawithOpenAIfunctioncalling_0.png
tag: Tech
originalTitle: "Generating training data with OpenAI function calling"
link: "https://medium.com/@maurerkrisztian/generating-training-data-with-openai-function-calling-d9d7ee7a4011"
isUpdated: true
---

<img src="/assets/img/2024-06-23-GeneratingtrainingdatawithOpenAIfunctioncalling_0.png"/>

머신 러닝과 인공 지능 분야에 파묻혀들면 준비 데이터의 품질이 중요하다는 것을 알 수 있어요. 1만 개의 텍스트나 이미지에 레이블을 붙이는 등의 훈련 데이터를 생성하는 것은 지루한 작업일 수 있어요. 하지만 OpenAI 모델을 사용하면 이 과정을 자동화할 수 있답니다. OpenAI 모델은 우리 모델을 위해 구체적인 훈련 또는 세밀한 조정 데이터를 생성할 수 있어요. 이 블로그 글에서는 이 작업이 어떻게 이루어지는지에 대해 살펴볼 거에요.

(그런데 GPT가 밈을 생성할 수 있다는 거 알고 계셨나요?)

<img src="/assets/img/2024-06-23-GeneratingtrainingdatawithOpenAIfunctioncalling_1.png"/>

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

# 왜 이 기능을 사용해야 하나요?

OpenAI의 가장 유용한 기능 중 하나는 함수 호출입니다. 사전 정의된 스키마로 함수를 호출할 수 있어 일관성을 보장합니다. 훈련 데이터를 생성할 때 이 일관성은 중요합니다. 예를 들어, 대부분의 레이블 값은 사전 정의된 옵션 세트를 따르는 스키마를 가져야 합니다. 또한 이러한 함수에 로직을 추가하여 깨끗하고 일관된 데이터를 처리하고 이를 데이터베이스나 CSV 파일에 저장하는 등의 작업을 수행할 수 있습니다.

# 나의 동기

최근 개발한 사이드 프로젝트에서 인공지능 기능이 탑재된 RSS 리더를 만들었습니다.
하나의 기능은 게시물 내용을 "긍정적", "부정적", "중립적"으로 분류하는 것입니다. 이를 통해 사용자들은 원할 경우 부정적인 게시물을 걸러낼 수 있습니다. 많은 모델이 잘 수행하는 것을 찾았지만, 저는 RSS 피드 데이터로 하나를 세밀하게 조정하여 정확도를 개선하려고 합니다. 그러나 사용자 정의 레이블로 더 고급 감정 분류기를 생성하려면 직접 훈련 데이터셋을 만들고 모델을 훈련해야 합니다. 기존 모델을 사용하든 새로 생성하든, 고품질의 훈련 데이터가 필요합니다. 이것이 저가 고안한 다음 방법을 찾은 이유입니다.

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

# OpenAI를 사용하여 데이터 라벨링하기

먼저 데이터를 수집하세요. 이 데이터를 사용하여 라벨링하거나 새로운 머신러닝 특성을 추가하여 세밀하게 조정된 데이터셋을 만들 수 있습니다. 이 간단한 가이드를 참고해보세요:

OpenAI에 적절한 컨텍스트 제공하기:

- 명확한 시스템 프롬프트 추가, 예: "제공된 데이터에 라벨을 지정하는 것이 여러분의 작업입니다."
- 프롬프트에 데이터 컨텍스트 포함, 예: "이 블로그 게시물에 `blog post content...` 라벨을 추가하세요."

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

오픈에이아이(Function Schema)에 대한 기능 스키마를 작성해주세요:

- 도구에 대한 자세한 설명을 제공해주세요.
- 응답을 제한하기 위해 enum 및 다른 스키마 요소를 사용하여 매개변수를 명확히 정의해주세요.

스키마에 의해 정의된 함수를 작성해주세요:

- 이 기능은 데이터를 처리하거나 저장하거나 다른 작업을 수행할 수 있습니다. 제 경우에는 훈련 데이터 CSV 파일에 새로운 행을 추가하여 새로운 훈련 요소를 만들 수 있습니다.

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

이러한 단계를 따르면 데이터를 정확하고 일관되게 레이블링하여 모델 훈련에 사용할 수 있습니다.

# 간단한 코드 예제 살펴보기

여기 텍스트 레이블링 도구의 간단한 예제가 있습니다. 이것보다 훨씬 복잡한 작업도 할 수 있지만, 복잡한 ML 피처를 생성하거나 이미지 인식 또는 텍스트 음성 변환 피처를 활용하는 등의 작업도 가능합니다. 하지만 명확하게 하기 위해 이 예제를 선택했습니다:

이 예제에서는 어떤 텍스트에 [`긍정적`, `부정적`, `중립적`] 중 하나의 레이블을 추가하고 해당 결과를 CSV 파일에 작성하여 나준에 모델을 가르치거나 세부 조정할 수 있도록 했습니다.

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
import {ITool, ToolSchema} from './interfaces/tool.interface';
import {ToolUtils} from "../utils/tool-utils";
import * as path from 'path';
import {createObjectCsvWriter as createCsvWriter} from 'csv-writer';

export class LabelTool implements ITool<string[], { inputText: string }> {
    private csvWriter;

    constructor(private readonly labels: string[] = ['positive', 'negative', 'neutral'], private readonly csvFilePath: string = path.join('labeled_text.csv')) {
        this.csvWriter = createCsvWriter({
            path: this.csvFilePath,
            header: [
                {id: 'label', title: 'Label'},
                {id: 'text', title: 'Text'},
            ],
            append: true
        });
    }

    // 해당 도구를 사용하여 OpenAI에 요청을 생성하고 레이블이 필요한 데이터를 반복할 수 있습니다.

    async callback(
        options: { label: string },
        ctx: { inputText: string },
    ): Promise<any> {

        // 새로운 레이블이 지정된 데이터 행을 csv에 작성합니다.
        await this.csvWriter.writeRecords([{
            label: options.label,
            text: ctx.inputText
        }]);

        console.log(`CSV 행 추가됨: ${options.label} | ${ctx.inputText}`);

        return `레이블이 성공적으로 추가되었습니다: ${options.label}`;
    }

    // JSON 스키마에 대해 더 알아보려면 여기를 방문하세요 https://json-schema.org/learn/getting-started-step-by-step
    async getSchema(ctx: { inputText: string }): Promise<ToolSchema> {

        // 이는 LLM을 위한 제공된 스키마입니다.
        return {
            type: 'function',
            function: {
                name: 'set_label',
                description: '텍스트에 레이블 설정',
                function: ToolUtils.getToolFn(this, ctx),
                parse: JSON.parse,
                parameters: {
                    type: 'object',
                    properties: { // 이 속성들은 콜백 "options" 매개변수에 있을 것입니다
                        label: {
                            type: 'string',
                            description: '입력 텍스트의 레이블',
                            enum: this.labels // 가능한 문자열을 제한합니다
                        },
                    },
                },
            },
        };
    }
}
```

이 도구를 사용하면 OpenAI에 요청을 보내고 레이블이 필요한 데이터를 반복할 수 있습니다.

```js
import OpenAI from "openai";
import { LabelTool } from "./tools/label.tool";
require("dotenv").config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

(async () => {
  const inputTexts = [
    // OpenAI 모델이 이를 ['positive', 'negative', 'neutral']로 레이블링합니다
    "이 제품을 사랑해요!",
    "이게 내가 산 것 중에 가장 최악이에요.",
    "괜찮아요, 유난히 좋진 않지만 나쁘진 않아요.",
    "돈 안 아깝다고.",
    "최고의 구매!",
  ];

  for (const inputText of inputTexts) {
    console.debug(`프롬프트: 이 텍스트에 레이블을 부여하세요: ${inputText}`);

    const tool = new LabelTool(["positive", "negative", "neutral"]);
    const context = { inputText: inputText };
    const prompt = `이 텍스트에 레이블을 부여하세요: ${inputText}`;
    const system = "훈련 데이터 생성을 돕는 유용한 도우미입니다.";

    const runner = client.beta.chat.completions.runTools({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: system,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      tools: [await tool.getSchema(context)],
      tool_choice: "auto", // 'auto' 대신 tool_choice: {function: {name: ...}를 전달하면 해당 함수를 호출한 후 즉시 반환됩니다
    });

    const finalContent = await runner.finalContent();
    console.log(`AI 응답: ${finalContent}
        `);
  }
})();
```

로그 결과:

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

Prompt: 이 텍스트를 라벨링하세요: 나는이 제품을 좋아해요!
CSV 행 추가: 긍정적 | 나는이 제품을 좋아해요!
AI 응답: "나는이 제품을 좋아해요!" 텍스트가 긍정적으로 라벨링되었습니다.

Prompt: 이 텍스트를 라벨링하세요: 이건 내가 산 것 중 가장 최악입니다.
CSV 행 추가: 부정적 | 이건 내가 산 것 중 가장 최악입니다.
AI 응답: "이건 내가 산 것 중 가장 최악입니다." 텍스트가 부정적으로 라벨링되었습니다.

Prompt: 이 텍스트를 라벨링하세요: 그저 괜찮아요, 훌륭하지 않지만 나쁘지도 않아요.
CSV 행 추가: 중립 | 그저 괜찮아요, 훌륭하지 않지만 나쁘지도 않아요.
AI 응답: "그저 괜찮아요, 훌륭하지 않지만 나쁘지도 않아요." 텍스트가 중립으로 라벨링되었습니다.

Prompt: 이 텍스트를 라벨링하세요: 가치가 없어요.
CSV 행 추가: 부정적 | 가치가 없어요.
AI 응답: "가치가 없어요." 텍스트가 부정적으로 라벨링되었습니다.

Prompt: 이 텍스트를 라벨링하세요: 최고의 구매!
CSV 행 추가: 긍정적 | 최고의 구매!
AI 응답: "최고의 구매!" 텍스트가 긍정적으로 라벨링되었습니다.

CSV 파일:

라벨,텍스트
긍정적,나는이 제품을 좋아해요!
부정적,이건 내가 산 것 중 가장 최악입니다.
중립,"그저 괜찮아요, 훌륭하지 않지만 나쁘지도 않아요."
부정적,가치가 없어요.
긍정적,최고의 구매!

물론 이 방법을 단순화하거나 확장하는 다양한 방법이 있지만, 이 예제를 선택하여 아이디어를 제공했습니다. 이 코드를 다음 GitHub 저장소에서 시도해볼 수 있습니다: https://github.com/MaurerKrisztian/training_data_genration_with_openai

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

OpenAI의 함수 호출을 사용하면 고품질의 훈련 데이터를 생성하는 것이 훨씬 쉬워집니다. 텍스트, 이미지, 오디오 또는 기타 데이터를 레이블링할 때, 이 방법을 사용하면 레이블이 정확하고 일관적임이 보장됩니다. 이를 통해 기계 학습 모델을 훈련하거나 세부 조정할 때 많은 시간과 노력을 절약할 수 있습니다.

이 블로그 글을 읽어 주셔서 감사합니다! 이 아이디어에 대해 여전히 실험 중이라 의견을 주시면 감사하겠습니다. 어떻게 이 방법을 활용하거나 확장할 수 있는지에 대한 생각이 있으면 댓글을 남겨주세요.
