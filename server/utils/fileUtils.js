import axios from "axios";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { fileURLToPath } from "url";

const writeFileAsync = promisify(fs.writeFile);
const mkdirAsync = promisify(fs.mkdir);

// 현재 파일의 경로를 가져오기
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 이미지 URL에서 이미지를 다운로드하여 로컬에 저장하는 함수
 * @param {string} imageUrl - 다운로드할 이미지 URL
 * @param {string} filename - 저장할 파일 이름 (확장자 제외)
 * @returns {Promise<string>} - 저장된 이미지의 웹 접근 경로
 */
export async function saveImageFromUrl(imageUrl, filename) {
  try {
    // 이미지 데이터 가져오기
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });

    // Content-Type에서 파일 확장자 추출
    const contentType = response.headers["content-type"];
    let extension = "jpg"; // 기본 확장자

    if (contentType) {
      if (contentType.includes("jpeg") || contentType.includes("jpg")) {
        extension = "jpg";
      } else if (contentType.includes("png")) {
        extension = "png";
      } else if (contentType.includes("gif")) {
        extension = "gif";
      } else if (contentType.includes("webp")) {
        extension = "webp";
      } else if (contentType.includes("svg")) {
        extension = "svg";
      }
    }

    // 파일명 생성 (중복 방지를 위해 타임스탬프 추가)
    const timestamp = new Date().getTime();
    const fullFilename = `${filename}-${timestamp}.${extension}`;

    // public/images 디렉토리 경로
    const projectRoot = path.resolve(__dirname, "../..");
    const imagesDir = path.join(projectRoot, "public", "assets", "images");

    // images 디렉토리가 없으면 생성
    if (!fs.existsSync(imagesDir)) {
      await mkdirAsync(imagesDir, { recursive: true });
    }

    // 저장할 전체 파일 경로
    const filePath = path.join(imagesDir, fullFilename);
    // 파일로 저장
    await writeFileAsync(filePath, Buffer.from(response.data));

    // 웹에서 접근할 수 있는 경로 반환
    const webPath = `/assets/images/${fullFilename}`;
    console.log(`이미지 저장 완료: ${webPath}`);

    return webPath;
  } catch (error) {
    console.error("이미지 저장 중 오류 발생:", error.message);
    throw new Error("이미지를 저장하는 중 오류가 발생했습니다");
  }
}
