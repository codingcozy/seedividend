import crypto from "crypto";

// 고유 해시 ID 생성 함수
export function generateHashId(): string {
  const timestamp = new Date().getTime().toString();
  const randomStr = Math.random().toString();
  const data = timestamp + randomStr;

  return crypto.createHash("md5").update(data).digest("hex");
}

// 기타 유틸리티 함수들...
