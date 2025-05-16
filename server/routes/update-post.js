import express from "express";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { generateMarkdownMetadata } from "../utils/markdown-utils.js";

const router = express.Router();

// 포스트 디렉토리 경로 설정
const postsDirectory = path.join(process.cwd(), "_posts");

// PUT 요청 처리 - 포스트 업데이트
router.put("/", async (req, res) => {
  try {
    const { slug } = req.query;

    if (!slug) {
      return res.status(400).json({ message: "포스트 슬러그가 필요합니다." });
    }

    // 파일에 업데이트할 데이터 가져오기
    const { title, content, category, description, coverImage, tags } = req.body;

    // 날짜는 클라이언트에서 받지 않고 항상 기존 파일의 날짜 사용
    // date 속성을 req.body에서 제외

    // 필수 필드 검증
    if (!title || !content) {
      return res.status(400).json({ message: "제목과 내용은 필수 항목입니다." });
    }

    // 기존 파일 경로 확인
    const files = await fs.readdir(`${postsDirectory}/${category}`);
    const postFile = files.find((file) => file.includes(slug));

    if (!postFile) {
      return res.status(404).json({ message: "해당 슬러그의 포스트를 찾을 수 없습니다." });
    }

    const filePath = path.join(`${postsDirectory}/${category}`, postFile);

    // 기존 파일 읽기 (frontmatter 형식 보존을 위해)
    const fileContent = await fs.readFile(filePath, "utf8");
    const { data: existingFrontmatter } = matter(fileContent);

    // 날짜 처리를 명확히 합니다
    console.log("기존 날짜:", existingFrontmatter.date);

    // 원본 날짜 문자열을 그대로 유지
    const originalDate = existingFrontmatter.date;

    // 게시물 데이터 구성 - 날짜는 문자열 그대로 사용
    const postData = {
      title,
      description: description || "",
      coverImage: coverImage || "",
      date: originalDate, // 원본 날짜 문자열 사용
      category: category || existingFrontmatter.category || "기타",
      tags: tags || existingFrontmatter.tag || "",
    };

    // textarea에서 직접 마크다운 콘텐츠 사용
    const updatedContent = generateMarkdownMetadata(postData) + content;

    // 파일에 저장
    await fs.writeFile(filePath, updatedContent, "utf8");

    // 로그 남기기
    console.log(`포스트 업데이트 성공: ${title} (${slug})`);

    // 성공 응답
    res.status(200).json({
      success: true,
      message: "포스트가 성공적으로 업데이트되었습니다.",
      slug,
    });
  } catch (error) {
    console.error("포스트 업데이트 중 오류 발생:", error);
    res.status(500).json({
      success: false,
      message: "포스트 업데이트 중 서버 오류가 발생했습니다.",
      error: error.message,
    });
  }
});

export default router;
