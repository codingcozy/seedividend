import rehypeExternalLinks from "rehype-external-links";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import rehypeStringify from "rehype-stringify";
import rehypeRaw from "rehype-raw";
import { unified } from "unified";

export default async function markdownToHtml(markdown) {
  // 먼저 마크다운을 HTML로 변환합니다
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeExternalLinks, { target: ["_blank"] })
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdown);

  // HTML 문자열로 변환
  let htmlContent = result.toString();

  // 개행 문자를 <br> 태그로 대체 (정규식 사용)
  // 연속된 두 개 이상의 개행은 <br><br>로 제한
  // htmlContent = htmlContent.replace(/\n{2,}/g, "<br><br>");
  // htmlContent = htmlContent.replace(/\n/g, "<br>");

  return htmlContent;
}
