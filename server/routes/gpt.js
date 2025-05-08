import express from "express";
import { generateIndexGPT, generateIndexDetailGPT, generateImage } from "../utils/gpt.js";
import { saveImageFromUrl } from "../utils/fileUtils.js";

const router = express.Router();

/**
 * @route   POST /api/gpt/generate-index
 * @desc    블로그 제목으로부터 목차를 생성
 *
 * @access  Public
 */
router.post("/generate-index", async (req, res) => {
  try {
    const { text, model } = req.body;

    if (!text) {
      return res.status(400).json({ success: false, error: "텍스트가 필요합니다." });
    }

    const indexContent = await generateIndexGPT(text, model);

    res.status(200).json({
      success: true,
      data: indexContent,
    });
  } catch (error) {
    console.error("목차 생성 중 오류:", error);
    res.status(500).json({
      success: false,
      error: "서버 오류가 발생했습니다.",
    });
  }
});

/**
 * @route   POST /api/gpt/generate-detail
 * @desc    목차에 대한 상세 내용 생성
 *
 * @access  Public
 */
router.post("/generate-detail", async (req, res) => {
  try {
    const { index, model } = req.body;

    if (!index) {
      return res.status(400).json({ success: false, error: "목차 내용이 필요합니다." });
    }

    const detailContent = await generateIndexDetailGPT(index, model);

    res.status(200).json({
      success: true,
      data: detailContent,
    });
  } catch (error) {
    console.error("상세 내용 생성 중 오류:", error);
    res.status(500).json({
      success: false,
      error: "서버 오류가 발생했습니다.",
    });
  }
});

/**
 * @route   POST /api/gpt/generate-image
 * @desc    제목이나 설명을 기반으로 이미지 생성하고 로컬에 저장
 *
 * @access  Public
 */
router.post("/generate-image", async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, error: "제목이 필요합니다." });
    }

    // DALL-E로 이미지 생성하고 URL 받기
    const imageUrl = await generateImage({ title });

    if (!imageUrl) {
      throw new Error("이미지 생성에 실패했습니다");
    }

    // 생성된 이미지를 로컬에 저장 (파일명은 타이틀에서 추출)
    // 파일명으로 사용할 수 있도록 타이틀에서 특수문자 제거 및 처리
    const sanitizedTitle = title
      .replace(/[^\w가-힣ㄱ-ㅎㅏ-ㅣ\s]/g, "") // 특수문자 제거
      .trim()
      .replace(/\s+/g, "-") // 공백을 하이픈으로 변경
      .substring(0, 50); // 길이 제한

    // 이미지 저장 및 로컬 경로 받기
    const localImagePath = await saveImageFromUrl(imageUrl, sanitizedTitle);

    res.status(200).json({
      success: true,
      data: {
        imageUrl: imageUrl, // 원본 URL
        localPath: localImagePath, // 로컬 저장 경로 (웹에서 접근 가능한)
      },
    });
  } catch (error) {
    console.error("이미지 생성 및 저장 중 오류:", error);
    res.status(500).json({
      success: false,
      error: "서버 오류가 발생했습니다.",
    });
  }
});

export default router;
