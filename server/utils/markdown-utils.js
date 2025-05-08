import TurndownService from "turndown";
import path from "path";

// 마크다운 변환기 초기화
const turndownService = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
});

// HTML을 마크다운으로 변환하는 함수
export const convertHtmlToMarkdown = (content) => {
  return turndownService.turndown(content);
};

// 마크다운 파일 이름 생성
export const createMarkdownFilename = (title, date) => {
  const formattedDate = new Date(date).toISOString().split("T")[0];
  // 마크다운 파일명에도 한글 포함
  const sanitizedTitle = title
    .replace(/[^a-zA-Z0-9가-힣\s]/g, "-") // 영문, 숫자, 한글, 공백만 허용
    .replace(/\s+/g, "-")
    .toLowerCase();
  return `${formattedDate}-${sanitizedTitle}.md`;
};

// 마크다운 메타데이터 생성 함수
export const generateMarkdownMetadata = (postData) => {
  const { title, description, coverImage, date, category, tags } = postData;

  // ISO 형식의 날짜를 YYYY-MM-DD HH:MM 형식으로 변환
  const formattedDate = new Date(date).toISOString().replace("T", " ").substring(0, 16);

  // 태그 배열을 쉼표로 구분된 문자열로 변환
  const tagString = Array.isArray(tags) ? tags.join(", ") : tags || "";

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

// 제목을 URL 친화적인 슬러그로 변환하는 함수
export const sanitizeTitle = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s\uAC00-\uD7A3-]/g, "") // 영문, 숫자, 공백, 하이픈, 한글만 허용
    .replace(/\s+/g, "-") // 공백을 하이픈으로 변경
    .replace(/--+/g, "-") // 중복 하이픈 제거
    .trim(); // 앞뒤 공백 제거
};
