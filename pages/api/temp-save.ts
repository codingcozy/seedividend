import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

// 임시저장 폴더 경로
const TEMP_DIR = path.join(process.cwd(), "temp");

// 폴더가 없으면 생성
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // 요청 본문에서 데이터 추출
    const { id, title, content, category, description, coverImage, tags, date } = req.body;

    if (!id || !title || !content) {
      return res.status(400).json({ message: "필수 데이터가 누락되었습니다." });
    }

    // 저장할 데이터 객체
    const postData = {
      id,
      title,
      content,
      category: category || "",
      description: description || "",
      coverImage: coverImage || "",
      tags: tags || "",
      date: date || new Date().toISOString(),
    };

    // 파일 경로 생성
    const filePath = path.join(TEMP_DIR, `${id}.json`);

    // 기존 파일이 있는지 확인
    const isUpdate = fs.existsSync(filePath);

    // 파일에 저장 (기존 파일이 있으면 덮어쓰기)
    fs.writeFileSync(filePath, JSON.stringify(postData, null, 2), "utf-8");

    console.log(`임시저장 ${isUpdate ? "업데이트" : "새로 생성"}: ID=${id}, 제목=${title}`);

    return res.status(200).json({
      success: true,
      id,
      message: isUpdate ? "임시저장 파일이 업데이트되었습니다." : "새 임시저장 파일이 생성되었습니다.",
    });
  } catch (error) {
    console.error("임시저장 오류:", error);
    return res.status(500).json({ message: "서버 오류가 발생했습니다.", error: String(error) });
  }
}
