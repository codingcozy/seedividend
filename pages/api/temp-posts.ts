import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

// 임시저장 폴더 경로
const TEMP_DIR = path.join(process.cwd(), "temp");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // 폴더가 없으면 생성
    if (!fs.existsSync(TEMP_DIR)) {
      fs.mkdirSync(TEMP_DIR, { recursive: true });
      return res.status(200).json({ posts: [] });
    }

    // 모든 임시저장 파일 읽기
    const files = fs.readdirSync(TEMP_DIR).filter((file) => file.endsWith(".json"));

    const posts = files.map((file) => {
      const filePath = path.join(TEMP_DIR, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const postData = JSON.parse(fileContent);
      const fileName = file.replace(".json", "");

      return {
        id: postData.id || fileName, // ID가 없으면 파일명 사용
        title: postData.title,
        date: postData.date,
        preview: postData.content.substring(0, 100) + (postData.content.length > 100 ? "..." : ""),
      };
    });

    // 최신 날짜순으로 정렬
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return res.status(200).json({ posts });
  } catch (error) {
    console.error("임시저장 목록 조회 오류:", error);
    return res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
}
