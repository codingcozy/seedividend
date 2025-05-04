const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// 이미지 저장 디렉토리 확인 및 생성
const uploadDir = path.join(process.cwd(), "public", "assets", "temp", "img");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 파일 카운터 (넘버링)
let fileCounter = 1;

// 스토리지 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // 파일명 패턴: temp_image_XX.확장자
    const ext = path.extname(file.originalname);
    const fileName = `temp_image_${String(fileCounter).padStart(2, "0")}${ext}`;
    fileCounter++;

    // 이미 파일이 존재하면 넘버링 증가
    if (fs.existsSync(path.join(uploadDir, fileName))) {
      fileCounter++;
      const newFileName = `temp_image_${String(fileCounter).padStart(2, "0")}${ext}`;
      cb(null, newFileName);
    } else {
      cb(null, fileName);
    }
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

    // 상대 경로 생성 (/assets/temp/img/파일명)
    const relativePath = `/assets/temp/img/${req.file.filename}`;

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

module.exports = router;
