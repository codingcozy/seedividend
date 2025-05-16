import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: '허용되지 않는 메소드입니다' });
  }

  try {
    const { imageUrl, postTitle } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ success: false, message: '이미지 URL이 필요합니다' });
    }

    // 이미지 확장자 추출
    const extension = imageUrl.split('.').pop().split('?')[0].toLowerCase();
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    
    if (!validExtensions.includes(extension)) {
      return res.status(400).json({ success: false, message: '지원되지 않는 이미지 형식입니다' });
    }

    // 이미지 다운로드
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');

    // 저장 경로 설정
    const publicDir = path.join(process.cwd(), 'public');
    const imagesDir = path.join(publicDir, 'assets', 'images');
    
    // 디렉토리 존재 확인 및 생성
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    // 제목 가져오기 (없으면 기본값 사용)
    const sanitizedTitle = postTitle ? 
      postTitle.toLowerCase()
        .replace(/[^\w\s\uAC00-\uD7A3-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/--+/g, "-")
        .trim()
        .substring(0, 30) : "untitled";

    // 현재 날짜와 고유 ID를 활용한 파일명 생성
    const currentDate = new Date().toISOString().split('T')[0];
    const uniqueId = uuidv4().substring(0, 8);
    const fileName = `${currentDate}-${sanitizedTitle}-${uniqueId}.${extension}`;
    const filePath = path.join(imagesDir, fileName);
    
    // 파일 저장
    fs.writeFileSync(filePath, buffer);
    
    // 상대 경로 반환 (public 폴더 기준)
    const relativePath = `/assets/images/${fileName}`;

    return res.status(200).json({ 
      success: true, 
      localPath: relativePath,
      message: '이미지가 성공적으로 저장되었습니다' 
    });
  } catch (error) {
    console.error('이미지 저장 중 오류 발생:', error);
    return res.status(500).json({ 
      success: false, 
      message: '서버 오류가 발생했습니다' 
    });
  }
}
