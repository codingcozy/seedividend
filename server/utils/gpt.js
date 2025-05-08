import OpenAI from "openai";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

//modal gpt-3.5-turbo | gpt-4o
export async function generateIndexGPT(text, model = "gpt-4.1-mini") {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `해당 제목으로 블로그 글을 쓰려고 하는데 아래 조건을 지켜서 큰 목차 5개 작성해줘.
        1. 불필요한 말 없이 목차만 알려줘.
        2. 각 목차는 20자 이내로 작성해줘.
        3. 마크다운 형식(h2) ## 으로 작성해줘. 
        3. 각 목차는 서로 다른 내용을 담고 있어야 해.
        4. 각 목차는 블로그 글의 흐름을 고려해서 작성해줘.
        5. 각 목차는 독자가 흥미를 느낄 수 있도록 작성해줘.`,
      },
      {
        role: "user",
        content: text,
      },

      { role: "assistant", content: "" },
    ],
    model: model,
    max_tokens: 2048,
  });
  // console.log(model, " : ", completion.usage);
  return completion.choices[0].message.content;
}

//modal gpt-3.5-turbo | gpt-4o
export async function generateIndexDetailGPT(index, model = "gpt-4.1-mini") {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `블로그 글을 쓰려고 하는데 해당 목차에 대한 글을 아래 조건을 지켜서 작성해줘.
        1. 불필요한 말 없이 글만 작성해줘.
        2. 글은 300자 이상 작성해줘.
        3. 한국 블로그에서 많이 보이는 편한 말투로 작성해줘.
        3. 문장마다 개행해줘.
        4. 구글 SEO를 고려해서 상위 노출될 수 있도록 작성해줘.`,
      },
      {
        role: "user",
        content: index,
      },

      { role: "assistant", content: "" },
    ],
    model: model,
    max_tokens: 2048,
  });
  // console.log(model, " : ", completion.usage);
  return completion.choices[0].message.content;
}

// 이미지 생성 요청 함수
export async function generateImage({ title }) {
  try {
    const response = await openai.images.generate({
      size: "1024x1024",
      n: 1,
      model: "dall-e-3",
      prompt: `${title} 라는 블로그 제목에 맞는 이미지 생성해줘.`,
    });

    // 생성된 이미지 URL 출력
    const imageUrl = response.data[0].url;
    console.log("Generated Image URL:", imageUrl);
    return imageUrl; // URL 반환 추가
  } catch (error) {
    console.error("Error generating image:", error);
    throw error; // 에러 전파
  }
}
