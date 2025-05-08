import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

// 라우터 임포트
import deletePostRouter from "./routes/delete-post.js";
import createPostRouter from "./routes/create-post.js";
import uploadImageRouter from "./routes/upload-image.js";
import publishPostRouter from "./routes/publish-post.js";
import updatePostRouter from "./routes/update-post.js";
import gptRouter from "./routes/gpt.js";

// ES 모듈에서 __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  console.error("Server error:", err.stack);
  res.status(500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "production" ? "An error occurred" : err.message,
  });
});

// 정적 파일 제공
// app.use(express.static(path.join(__dirname, "../public")));

// 라우트 설정 - 개별적으로 마운트합니다
app.use("/api/delete-post", deletePostRouter);
app.use("/api/create-post", createPostRouter);
app.use("/api/upload-image", uploadImageRouter);
app.use("/api/publish-post", publishPostRouter);
app.use("/api/update-post", updatePostRouter);
app.use("/api/gpt", gptRouter);

// 기본 라우트
app.get("/", (req, res) => {
  res.send("Welcome to SEE Dividend API Server");
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Server root directory: ${__dirname}`);
});

export default app;
