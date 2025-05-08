import express from "express";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { generateMarkdownMetadata } from "../utils/markdown-utils.js";

const router = express.Router();

// 포스트 디렉토리 경로 설정
const postsDirectory = path.join(process.cwd(), "_posts");

// 텍스트 내 임시 이미지 경로를 영구 저장소로 이동하는 함수
const moveImagesToPermStorage = async (content, slug) => {
  // 마크다운 이미지 형식 ![대체텍스트](이미지URL) 찾기
  const imgRegex = /!\[(.*?)\]\(([^)]+)\)/g;
  let match;
  const tempImagePaths = [];
  const newImagePaths = [];

  // 제목 정규화
  const sanitizeTitle = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // 특수문자 제거
      .replace(/\s+/g, "-") // 공백을 하이픈으로 변경
      .replace(/--+/g, "-") // 중복 하이픈 제거
      .trim(); // 앞뒤 공백 제거
  };

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
      const newFileName = `${sanitizedTitle}-${imageIndex++}${fileExt}`;

      const tempImagePath = path.join(process.cwd(), "public", imgSrc);

      // 날짜 기반 폴더 생성
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const dateFolder = `${year}/${month}`;

      const imagesDir = path.join(process.cwd(), "public", "assets", "images");
      const targetDir = path.join(imagesDir, dateFolder);

      // 폴더 생성
      try {
        await fs.mkdir(targetDir, { recursive: true });
      } catch (err) {
        if (err.code !== "EEXIST") throw err;
      }

      // 새 이미지 경로 및 파일명
      const newImagePath = path.join(targetDir, newFileName);
      const relativeImagePath = `/assets/images/${dateFolder}/${newFileName}`;

      // 템프 경로와 새 경로 저장
      tempImagePaths.push(tempImagePath);
      newImagePaths.push(newImagePath);

      // 콘텐츠 내 이미지 경로 교체 (마크다운 형식 유지)
      newContent = newContent.replace(`![${altText}](${imgSrc})`, `![${altText}](${relativeImagePath})`);
    }
  }

  // 실제 파일 이동
  for (let i = 0; i < tempImagePaths.length; i++) {
    try {
      // 이미지 파일 이동
      await fs.copyFile(tempImagePaths[i], newImagePaths[i]);
      await fs.unlink(tempImagePaths[i]); // 임시 파일 삭제
    } catch (error) {
      console.error("이미지 이동 중 오류 발생:", error);
      // 오류가 발생해도 계속 진행
    }
  }

  return newContent;
};

// PUT 요청 처리 - 포스트 업데이트
router.put("/", async (req, res) => {
  try {
    const { slug } = req.query;

    if (!slug) {
      return res.status(400).json({ message: "포스트 슬러그가 필요합니다." });
    }

    // 파일에 업데이트할 데이터 가져오기
    const { title, content, category, description, coverImage, tags, date } = req.body;

    // 필수 필드 검증
    if (!title || !content) {
      return res.status(400).json({ message: "제목과 내용은 필수 항목입니다." });
    }

    // 임시 이미지 경로 처리
    const processedContent = await moveImagesToPermStorage(content, title);

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

    // 게시물 데이터 구성
    const postData = {
      title,
      description: description || "",
      coverImage: coverImage || "",
      date: date || existingFrontmatter.date,
      category: category || existingFrontmatter.category || "기타",
      tags: tags || existingFrontmatter.tag || "",
    };

    // textarea에서 직접 마크다운 콘텐츠 사용
    const updatedContent = generateMarkdownMetadata(postData) + processedContent;

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
