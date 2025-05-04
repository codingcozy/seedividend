const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const TurndownService = require("turndown"); // HTML을 마크다운으로 변환하는 라이브러리

// 마크다운 변환기 초기화
const turndownService = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
});

// 데이터 저장 경로 설정
const markdownDir = path.join(process.cwd(), "_posts");
const imagesDir = path.join(process.cwd(), "public", "assets", "images");

// temp 이미지를 영구 저장소로 이동하는 함수
const moveImagesToPermStorage = (content, title) => {
  // 임시 정규식으로 모든 이미지 태그 찾기
  const imgRegex = /<img[^>]+src="([^"]+)"/g;
  let match;
  const tempImagePaths = [];
  const newImagePaths = [];

  // 제목을 파일명으로 사용할 수 있게 정규화 (한글 포함)
  const sanitizedTitle = title
    .replace(/[^a-zA-Z0-9가-힣\s]/g, "") // 영문, 숫자, 한글, 공백만 허용
    .replace(/\s+/g, "-")
    .toLowerCase();

  // 콘텐츠에서 모든 이미지 경로 추출
  let newContent = content;
  let imageIndex = 0;

  while ((match = imgRegex.exec(content)) !== null) {
    const imgSrc = match[1];

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

      const targetDir = path.join(imagesDir, dateFolder);

      // 폴더 생성
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      // 새 이미지 경로 및 파일명
      const newImagePath = path.join(targetDir, newFileName);
      const relativeImagePath = `/assets/images/${dateFolder}/${newFileName}`;

      // 템프 경로와 새 경로 저장
      tempImagePaths.push(tempImagePath);
      newImagePaths.push(newImagePath);

      // 콘텐츠 내 이미지 경로 교체
      newContent = newContent.replace(imgSrc, relativeImagePath);
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

// 마크다운 파일 이름 생성
const createMarkdownFilename = (title, date) => {
  const formattedDate = new Date(date).toISOString().split("T")[0];
  // 마크다운 파일명에도 한글 포함
  const sanitizedTitle = title
    .replace(/[^a-zA-Z0-9가-힣\s]/g, "-") // 영문, 숫자, 한글, 공백만 허용
    .replace(/\s+/g, "-")
    .toLowerCase();
  return `${formattedDate}-${sanitizedTitle}.md`;
};

// 마크다운 메타데이터 생성 함수 추가
const generateMarkdownMetadata = (postData) => {
  const { title, description, coverImage, date, category, tags } = postData;

  // ISO 형식의 날짜를 YYYY-MM-DD HH:MM 형식으로 변환
  const formattedDate = new Date(date).toISOString().replace("T", " ").substring(0, 16);

  // 태그 배열을 쉼표로 구분된 문자열로 변환
  const tagString = Array.isArray(tags) ? tags.join(", ") : "";

  return `---
title: ${title}
description: ${description || ""}
coverImage: "${coverImage || ""}"
date: ${formattedDate}
author:
  name: Admin
ogImage:
  url: "${coverImage || ""}"
tag: ${tagString}
category: ${category || "기타"}
---

`;
};

// 게시물 생성 엔드포인트
router.post("/", async (req, res) => {
  try {
    const { title, content, category, description, coverImage, slug, tags, date } = req.body;
    console.log(req.body);
    // 필수 필드 유효성 검사
    if (!title || !content || !slug) {
      return res.status(400).json({ error: "제목, 내용, 슬러그는 필수입니다." });
    }

    // 이미지 경로 처리 - 임시 이미지를 영구 저장소로 이동 (title 전달)
    const processedContent = moveImagesToPermStorage(content, title);

    // 게시물 데이터 구성
    const postData = {
      title,
      content: processedContent,
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

    // 마크다운 변환 및 저장
    const markdownContent = turndownService.turndown(processedContent);
    const markdownWithMetadata = generateMarkdownMetadata(postData) + markdownContent;
    const markdownFilename = createMarkdownFilename(title, date || new Date().toISOString());
    const markdownCategoryDir = path.join(markdownDir, category || "기타");

    console.log(markdownFilename);

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

module.exports = router;
