import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

// 임시저장 폴더 경로
const TEMP_DIR = path.join(process.cwd(), "temp");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // temp 폴더가 존재하는지 확인
    if (!fs.existsSync(TEMP_DIR)) {
      return res.status(200).json({
        success: true,
        message: "삭제할 임시저장 포스트가 없습니다.",
      });
    }

    // temp 폴더 내의 모든 파일 목록 가져오기
    const files = fs.readdirSync(TEMP_DIR);

    // JSON 파일만 필터링
    const jsonFiles = files.filter((file) => file.endsWith(".json"));

    // 모든 임시저장 파일 삭제
    let deletedCount = 0;
    for (const file of jsonFiles) {
      const filePath = path.join(TEMP_DIR, file);
      fs.unlinkSync(filePath);
      deletedCount++;
    }

    return res.status(200).json({
      success: true,
      message: `${deletedCount}개의 임시저장 포스트가 삭제되었습니다.`,
      deletedCount,
    });
  } catch (error) {
    console.error("임시저장 포스트 전체 삭제 오류:", error);
    return res.status(500).json({ message: "임시저장 포스트 삭제 중 오류가 발생했습니다." });
  }
}
