import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// 이미지 저장 디렉토리 확인 및 생성
const uploadDir = path.join(process.cwd(), "public", "assets", "images");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 제목을 안전하게 처리하는 함수
function sanitizeTitle(title) {
  return title.replace(/[^a-zA-Z0-9가-힣\s]/g, "").replace(/\s+/g, "-");
}

// 스토리지 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // URL 쿼리 파라미터에서 postTitle 추출 (없으면 기본값 사용)
    const postTitle = req.query.postTitle ? sanitizeTitle(req.query.postTitle).substring(0, 30) : "untitled";

    const currentDate = new Date().toISOString().split("T")[0];
    const ext = path.extname(file.originalname);
    const uniqueId = uuidv4().substring(0, 8);

    // 파일명: 2023-12-25-실제포스트제목-abcd1234.jpg
    const fileName = `${currentDate}-${postTitle}-${uniqueId}${ext}`;
    cb(null, fileName);
  },
});

// 업로드 미들웨어
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB 제한
  fileFilter: (req, file, cb) => {
    // 이미지 파일만 허용
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("이미지 파일만 업로드 가능합니다."), false);
    }
  },
});

// 이미지 업로드 엔드포인트
router.post("/", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "업로드된 파일이 없습니다." });
    }

    // 상대 경로 생성 (/assets/images/파일명)
    const relativePath = `/assets/images/${req.file.filename}`;

    // 응답
    return res.status(200).json({
      success: true,
      imageUrl: relativePath,
      fileName: req.file.filename,
    });
  } catch (error) {
    console.error("이미지 업로드 에러:", error);
    return res.status(500).json({ error: "파일 업로드 중 오류가 발생했습니다." });
  }
});

export default router;
