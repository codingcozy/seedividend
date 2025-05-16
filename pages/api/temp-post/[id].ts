import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

// 임시저장 폴더 경로
const TEMP_DIR = path.join(process.cwd(), "temp");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ message: "유효하지 않은 ID입니다." });
  }

  // 파일 경로 생성
  const filePath = path.join(TEMP_DIR, `${id}.json`);

  // GET 메서드 처리
  if (req.method === "GET") {
    try {
      console.log(id);

      // 파일이 존재하지 않으면 404 반환
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "임시저장된 포스트를 찾을 수 없습니다." });
      }

      // 파일 내용 읽기
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const postData = JSON.parse(fileContent);

      return res.status(200).json({ post: postData });
    } catch (error) {
      console.error("임시저장 포스트 조회 오류:", error);
      return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
  }

  // DELETE 메서드 처리
  if (req.method === "DELETE") {
    try {
      // 파일이 존재하지 않으면 404 반환
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "삭제할 임시저장 포스트를 찾을 수 없습니다." });
      }

      // 파일 삭제
      fs.unlinkSync(filePath);

      return res.status(200).json({
        success: true,
        message: "임시저장 포스트가 성공적으로 삭제되었습니다.",
      });
    } catch (error) {
      console.error("임시저장 포스트 삭제 오류:", error);
      return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
  }

  // 지원하지 않는 메서드
  return res.status(405).json({ message: "Method Not Allowed" });
}
