import express from "express";
import fs from "fs";
import path from "path";
import { createMarkdownFilename, generateMarkdownMetadata } from "../utils/markdown-utils.js";

const router = express.Router();

// 데이터 저장 경로 설정
const markdownDir = path.join(process.cwd(), "_posts");

// 이미지 경로가 이미 최종 경로인지 확인하고 콘텐츠만 반환하는 함수
export const processImagesInContent = (content) => {
  // 이미지가 이미 정확한 위치에 있으므로 콘텐츠를 그대로 반환
  return content;
};

// 게시물 생성 엔드포인트
router.post("/", async (req, res) => {
  try {
    const { title, content, category, description, coverImage, slug, tags, date } = req.body;

    // 필수 필드 유효성 검사
    if (!title || !content || !slug) {
      return res.status(400).json({ error: "제목, 내용, 슬러그는 필수입니다." });
    }

    // 이미지는 이미 최종 경로에 저장되어 있으므로 추가 처리 없이 사용
    const processedContent = content;

    // 게시물 데이터 구성
    const postData = {
      title,
      category: category || "기타",
      description: description || "",
      coverImage: coverImage || "",
      slug,
      tags: tags || [],
      date: date || new Date().toISOString(),
      author: {
        name: "돈되는 새싹",
        picture: "/assets/blog/authors/admin.jpeg",
      },
    };

    // textarea에서 이미 마크다운으로 작성된 내용 사용
    const markdownWithMetadata = generateMarkdownMetadata(postData) + processedContent;
    const markdownFilename = createMarkdownFilename(title, date || new Date().toISOString());
    const markdownCategoryDir = path.join(markdownDir, category || "기타");

    if (!fs.existsSync(markdownCategoryDir)) {
      fs.mkdirSync(markdownCategoryDir, { recursive: true });
    }

    const markdownFilePath = path.join(markdownCategoryDir, markdownFilename);

    // 파일이 이미 존재하는지 확인
    if (fs.existsSync(markdownFilePath)) {
      return res.status(409).json({
        success: false,
        message: "이미 동일한 제목과 날짜의 포스트가 존재합니다.",
        slug,
      });
    }

    // 파일이 없을 경우에만 생성
    fs.writeFileSync(markdownFilePath, markdownWithMetadata, "utf8");

    return res.status(201).json({
      success: true,
      message: "포스트가 성공적으로 생성되었습니다.",
      slug,
    });
  } catch (error) {
    console.error("포스트 생성 에러:", error);
    return res.status(500).json({ error: "포스트 생성 중 오류가 발생했습니다." });
  }
});

export default router;
