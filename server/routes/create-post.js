import express from "express";
import fs from "fs";
import path from "path";
import { createMarkdownFilename, generateMarkdownMetadata, sanitizeTitle } from "../utils/markdown-utils.js";

const router = express.Router();

// 데이터 저장 경로 설정
const markdownDir = path.join(process.cwd(), "_posts");
const imagesDir = path.join(process.cwd(), "public", "assets", "images");

// 텍스트 내 임시 이미지 경로를 영구 저장소로 이동하는 함수
const moveImagesToPermStorage = (content, slug) => {
  // 마크다운 이미지 형식 ![대체텍스트](이미지URL) 찾기
  const imgRegex = /!\[(.*?)\]\(([^)]+)\)/g;
  let match;
  const tempImagePaths = [];
  const newImagePaths = [];

  // 제목 정규화
  const sanitizedTitle = sanitizeTitle(slug);

  // 콘텐츠에서 모든 이미지 경로 추출
  let newContent = content;
  let imageIndex = 0;

  while ((match = imgRegex.exec(content)) !== null) {
    const altText = match[1];
    const imgSrc = match[2];

    // 임시 이미지 경로인 경우만 처리
    if (imgSrc.includes("/assets/temp/img/")) {
      const originalFileName = path.basename(imgSrc);
      const fileExt = path.extname(originalFileName);

      // temp_img 부분을 제목으로 대체한 새 파일명 생성

      const tempImagePath = path.join(process.cwd(), "public", imgSrc);

      // 날짜 기반 폴더 생성
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const date = String(now.getDate() + 1).padStart(2, "0");
      const fullDate = `${year}-${month}-${date}`;
      const newFileName = `${fullDate}-${sanitizedTitle}-${imageIndex++}${fileExt}`;

      // 폴더 생성
      if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
      }

      // 새 이미지 경로 및 파일명
      const newImagePath = path.join(imagesDir, newFileName);
      const relativeImagePath = `/assets/images/${newFileName}`;

      // 템프 경로와 새 경로 저장
      tempImagePaths.push(tempImagePath);
      newImagePaths.push(newImagePath);

      // 콘텐츠 내 이미지 경로 교체 (마크다운 형식 유지)
      newContent = newContent.replace(`![${altText}](${imgSrc})`, `![${altText}](${relativeImagePath})`);
    }
  }

  // 실제 파일 이동
  tempImagePaths.forEach((tempPath, index) => {
    try {
      // 이미지 파일 이동
      fs.copyFileSync(tempPath, newImagePaths[index]);
      fs.unlinkSync(tempPath); // 임시 파일 삭제
    } catch (error) {
      console.error("이미지 이동 중 오류 발생:", error);
      // 오류가 발생해도 계속 진행
    }
  });

  return newContent;
};

// 게시물 생성 엔드포인트
router.post("/", async (req, res) => {
  try {
    const { title, content, category, description, coverImage, slug, tags, date } = req.body;

    // 필수 필드 유효성 검사
    if (!title || !content || !slug) {
      return res.status(400).json({ error: "제목, 내용, 슬러그는 필수입니다." });
    }

    // 이미지 경로 처리 - 임시 이미지를 영구 저장소로 이동
    const processedContent = moveImagesToPermStorage(content, title);

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
        name: "Seedividend",
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
