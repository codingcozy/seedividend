const express = require("express");
const path = require("path");
const cors = require("cors");
const routes = require("./routes");

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
app.use(express.static(path.join(__dirname, "../public")));

// 라우트 설정
app.use("/api", routes);

// 기본 라우트
app.get("/", (req, res) => {
  res.send("Welcome to SEE Dividend API Server");
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Server root directory: ${__dirname}`);
});
