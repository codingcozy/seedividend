import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import classnames from "classnames/bind";
import style from "./PostEditor.module.scss";
import markdownToHtml from "../lib/markdownToHtml";
import { CATEGORY } from "@/lib/constants";

const cx = classnames.bind(style);

interface PostEditorProps {
  initialTitle: string;
  initialContent: string;
  initialCategory: string;
  initialDescription?: string;
  initialCoverImage?: string;
  initialTags?: string;
  categoryList: string[];
  onSubmit: (postData: {
    title: string;
    content: string;
    category: string;
    description: string;
    coverImage: string;
    tags: string;
  }) => Promise<void>;
  submitButtonText: string;
  isSubmitting: boolean;
}

export default function PostEditor({
  initialTitle = "",
  initialContent = "",
  initialCategory = "",
  initialDescription = "",
  initialCoverImage = "",
  initialTags = "",
  categoryList = [],
  onSubmit,
  submitButtonText,
  isSubmitting,
}: PostEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [category, setCategory] = useState(initialCategory || categoryList[0] || "");
  const [description, setDescription] = useState(initialDescription);
  const [coverImage, setCoverImage] = useState(initialCoverImage);
  const [tags, setTags] = useState(initialTags);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [htmlContent, setHtmlContent] = useState("");
  const [cursorLine, setCursorLine] = useState(0);
  const [isGeneratingIndex, setIsGeneratingIndex] = useState(false);
  const [selectedLineText, setSelectedLineText] = useState("");
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const isScrollingSyncRef = useRef(false);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  // 마크다운을 HTML로 변환
  useEffect(() => {
    const convertMarkdown = async () => {
      try {
        const html = await markdownToHtml(content);
        setHtmlContent(html);
      } catch (error) {
        console.error("마크다운 변환 오류:", error);
      }
    };

    convertMarkdown();
  }, [content]);

  // 편집기 커서 위치로 프리뷰 스크롤 이동
  const scrollToText = (text: string) => {
    const container = previewContainerRef.current;

    if (container) {
      // container 안의 모든 p 요소를 가져옴
      const paragraphs = container.querySelectorAll("*");
      if (paragraphs.length > 0) {
        // 각 p 요소에서 텍스트를 찾아 해당 위치로 스크롤 이동
        for (let i = 0; i < paragraphs.length; i++) {
          console.log(paragraphs[i].textContent);
          if (paragraphs[i].textContent?.includes(text)) {
            // console.log(i, paragraphs[i]);
            // 찾은 텍스트를 가진 요소로 스크롤
            // paragraphs[i].scrollIntoView({ behavior: "smooth", block: "start" });
            // 해당 요소의 위치를 계산
            const rect = paragraphs[i].getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            // 요소의 스크롤 위치 계산
            const scrollTop = rect.top - containerRect.top + container.scrollTop - 200;

            // 스크롤 위치로 이동
            container.scrollTo({ top: scrollTop, behavior: "smooth" });

            break;
          }
        }
      }
    }
  };

  // 편집기 클릭시 현재 라인 가져오는 함수
  const handleCursorPosition = (e: any) => {
    const textarea = e.target;
    const cursorPosition = textarea.selectionStart;

    // textarea 전체 텍스트
    const textValue = textarea.value;

    if (textValue.trim() === "") return;

    // 커서 이전 텍스트 중에서 가장 가까운 줄바꿈 (\n)을 찾음
    const startOfLine = textValue.lastIndexOf("\n", cursorPosition - 1) + 1;

    // 커서 이후 텍스트 중에서 가장 가까운 줄바꿈 (\n)을 찾음
    const endOfLine = textValue.indexOf("\n", cursorPosition);

    // 줄 전체를 추출 (커서가 있는 줄의 텍스트)
    const currentLineText = textValue.substring(startOfLine, endOfLine === -1 ? textValue.length : endOfLine);
    console.log(currentLineText);
    scrollToText(removeHyphens(currentLineText));
    // setCurrentLine(currentLineText);
  };

  // 더블 클릭 이벤트 핸들러
  const handleDoubleClick = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const cursorPosition = textarea.selectionStart;
    const textValue = textarea.value;

    // 현재 라인의 시작과 끝 위치 찾기
    const startOfLine = textValue.lastIndexOf("\n", cursorPosition - 1) + 1;
    let endOfLine = textValue.indexOf("\n", cursorPosition);
    if (endOfLine === -1) endOfLine = textValue.length;

    // 라인 전체 선택
    textarea.setSelectionRange(startOfLine, endOfLine);

    // 선택된 텍스트 저장
    const selectedText = textValue.substring(startOfLine, endOfLine);
    setSelectedLineText(selectedText);

    // 마우스 이벤트의 위치 정보를 사용하여 메뉴 위치 계산
    // 이 방식은 textarea의 스크롤 위치에 관계없이 정확한 위치를 제공
    const menuWidth = 140; // 컨텍스트 메뉴 너비

    // 화면 경계 고려하여 메뉴 위치 조정
    const x = Math.min(e.clientX, window.innerWidth - menuWidth - 20);

    // 클릭 위치 아래에 메뉴 표시 (라인 높이의 절반 정도 아래)
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight) || 20;
    const y = e.clientY + lineHeight / 2;

    setMenuPosition({ x, y });
    setShowContextMenu(true);
  };

  // 컨텍스트 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) {
        setShowContextMenu(false);
      }
    };

    if (showContextMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showContextMenu]);

  // 이미지 생성 핸들러
  const handleGenerateImage = async () => {
    try {
      setError("");
      setIsUploading(true);

      const response = await fetch("http://localhost:3001/api/gpt/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: selectedLineText,
        }),
      });

      if (!response.ok) {
        throw new Error("이미지 생성에 실패했습니다.");
      }

      const result = await response.json();

      if (result.success && result.data.localPath) {
        // 이미지 URL을 에디터에 삽입
        insertImageToEditor(result.data.localPath);
        setShowContextMenu(false);
      } else {
        throw new Error("이미지 URL을 가져오지 못했습니다.");
      }
    } catch (err) {
      console.error("이미지 생성 오류:", err);
      setError(err instanceof Error ? err.message : "이미지 생성 중 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  // 상세 내용 작성 핸들러
  const handleGenerateDetail = async () => {
    try {
      setError("");
      setIsUploading(true);

      const response = await fetch("http://localhost:3001/api/gpt/generate-detail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          index: selectedLineText,
        }),
      });

      if (!response.ok) {
        throw new Error("상세 내용 생성에 실패했습니다.");
      }

      const result = await response.json();

      if (result.success && result.data) {
        // 현재 선택된 라인을 상세 내용으로 대체
        if (!textareaRef.current) return;

        const textarea = textareaRef.current;
        const textValue = textarea.value;

        // 선택된 라인의 시작과 끝 위치 찾기
        const selectionEnd = textarea.selectionEnd;

        // 상세 내용으로 대체
        const beforeSelection = textValue.substring(0, selectionEnd);
        const afterSelection = textValue.substring(selectionEnd);
        const newContent = beforeSelection + `\n${result.data}\n` + afterSelection;

        setContent(newContent);
        setShowContextMenu(false);
      } else {
        throw new Error("상세 내용을 가져오지 못했습니다.");
      }
    } catch (err) {
      console.error("상세 내용 생성 오류:", err);
      setError(err instanceof Error ? err.message : "상세 내용 생성 중 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  // 프리뷰에 없는 편집기 텍스트 제거
  function removeHyphens(str: string) {
    str = str.replace(/-/g, "");
    str = str.replace(/#/g, "");
    str = str.trim();
    return str;
  }

  // 클립보드 이미지 URL 처리 함수
  const handlePaste = async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const clipboardData = e.clipboardData;
    const items = clipboardData.items;

    // 클립보드 데이터 중 이미지 URL 확인
    const text = clipboardData.getData("text");
    const isImageUrl =
      text &&
      (text.startsWith("http://") || text.startsWith("https://")) &&
      (text.endsWith(".png") || text.endsWith(".jpg") || text.endsWith(".jpeg") || text.endsWith(".gif"));

    // 클립보드에 이미지 파일이 있는지 확인
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        e.preventDefault(); // 기본 붙여넣기 방지
        const file = items[i].getAsFile();
        if (file) {
          try {
            const imageUrl = await uploadImage(file);
            insertImageToEditor(imageUrl);
          } catch (err) {
            setError("이미지 업로드 중 오류가 발생했습니다.");
          }
        }
        break;
      }
    }
  };

  // 이미지 업로드 함수
  const uploadImage = async (file: File): Promise<string> => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("http://localhost:3001/api/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("이미지 업로드 실패");
      }

      const result = await response.json();
      return result.imageUrl;
    } catch (err) {
      console.error("이미지 업로드 오류:", err);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  // 텍스트에 이미지 링크 삽입
  const insertImageToEditor = (imageUrl: string) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const endPos = textarea.selectionEnd;

    const beforeText = textarea.value.substring(0, endPos);
    const afterText = textarea.value.substring(endPos);
    const imageMarkdown = `![이미지](${imageUrl})`;

    const newContent = beforeText + imageMarkdown + afterText;
    setContent(newContent);

    // 커서 위치 조정
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = endPos + imageMarkdown.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  // 파일 업로드 처리
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      const imageUrl = await uploadImage(files[0]);
      insertImageToEditor(imageUrl);
    } catch (err) {
      setError("이미지 업로드 중 오류가 발생했습니다.");
    } finally {
      // 파일 인풋 초기화
      e.target.value = "";
    }
  };

  // 폼 제출 처리
  const handleSubmitForm = async () => {
    // Form validation
    if (!title.trim()) {
      setError("제목을 입력해주세요.");
      return;
    }

    if (!content.trim()) {
      setError("내용을 입력해주세요.");
      return;
    }

    try {
      setError("");
      await onSubmit({
        title,
        content,
        category,
        description,
        coverImage,
        tags,
      });
    } catch (err) {
      console.error("폼 제출 오류:", err);
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
    }
  };

  const onClickCreateIndex = async () => {
    if (title.trim() === "") {
      setError("목차 생성을 위해 제목을 입력해주세요.");
      return;
    }

    try {
      setIsGeneratingIndex(true);
      setError("");

      const response = await fetch("http://localhost:3001/api/gpt/generate-index", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: title,
        }),
      });

      if (!response.ok) {
        throw new Error("목차 생성에 실패했습니다.");
      }

      const result = await response.json();

      if (result.success && result.data) {
        // 현재 콘텐츠 앞부분에 목차 추가
        const newContent = `## 목차\n${result.data}\n\n${content}`;
        setContent(newContent);
      } else {
        throw new Error("목차 데이터를 가져오지 못했습니다.");
      }
    } catch (err) {
      console.error("목차 생성 오류:", err);
      setError(err instanceof Error ? err.message : "목차 생성 중 오류가 발생했습니다.");
    } finally {
      setIsGeneratingIndex(false);
    }
  };

  return (
    <div className={cx("container")}>
      <div className={cx("editor_header_bar")}>
        <div className={cx("editor_header_left")}>
          <Link href="/admin" className={cx("logo")}>
            SeedDividend
          </Link>
        </div>

        <div className={cx("editor_toolbar")}>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
          <label htmlFor="image-upload" className={cx("toolbar_btn")}>
            <span className={cx("toolbar_icon", "image")}>📷 이미지 업로드</span>
          </label>
        </div>

        <div className={cx("editor_header_right")}>
          <button className={cx("header_action_btn")}>
            기본 모드
            <span className={cx("dropdown_arrow")}>▾</span>
          </button>
        </div>
      </div>

      <div className={cx("editor_container")}>
        <div className={cx("editor_header")}>
          <div className={cx("category_select_container")}>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={cx("category_select")}
              disabled={isSubmitting}
            >
              {categoryList.map((cat) => (
                <option key={cat} value={cat}>
                  {CATEGORY[cat]}
                </option>
              ))}
            </select>
            <div className={cx("select_arrow")}></div>
          </div>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={cx("title_input")}
            placeholder="제목을 입력하세요"
            disabled={isSubmitting}
          />
          <button
            type="button"
            onClick={onClickCreateIndex}
            disabled={isGeneratingIndex || isSubmitting || !title.trim()}
            className={cx("index_btn")}
          >
            {isGeneratingIndex ? "목차 생성 중..." : "목차 생성"}
          </button>
        </div>

        <div className={cx("editor_content_container")}>
          <div className={cx("editor_body")} ref={editorContainerRef}>
            <textarea
              ref={textareaRef}
              className={cx("content_editor", { uploading: isUploading })}
              value={content}
              onClick={handleCursorPosition}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력하세요..."
              disabled={isSubmitting}
              onDoubleClick={handleDoubleClick}
              onPaste={handlePaste}
            />
            {isUploading && <div className={cx("upload_overlay")}>GPT 응답 대기 중...</div>}

            {showContextMenu && (
              <div
                ref={contextMenuRef}
                className={cx("context_menu")}
                style={{
                  position: "fixed",
                  left: `${menuPosition.x + 20}px`,
                  top: `${menuPosition.y}px`,
                  zIndex: 1000,
                }}
              >
                <button className={cx("context_menu_item")} onClick={handleGenerateDetail}>
                  상세 내용 작성
                </button>
                <button className={cx("context_menu_item")} onClick={handleGenerateImage}>
                  이미지 생성
                </button>
              </div>
            )}
          </div>

          <div className={cx("preview_container")}>
            <div className={cx("preview_header")}>
              <h3>미리보기</h3>
            </div>
            <div
              className={cx("post_content")}
              ref={previewContainerRef}
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            ></div>
          </div>
        </div>

        <div className={cx("editor_footer")}>
          <div className={cx("editor_tools")}>
            <div className={cx("tool_buttons")}>
              <button className={cx("tool_btn")}>
                <span className={cx("tool_icon")}>🔍</span> 맞춤법 검사
              </button>
            </div>

            <div className={cx("action_buttons")}>
              <button className={cx("draft_btn")} disabled={isSubmitting}>
                임시저장
              </button>
              <button
                className={cx("publish_btn")}
                onClick={handleSubmitForm}
                disabled={isSubmitting || isUploading}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? "저장 중..." : submitButtonText}
              </button>
            </div>
          </div>
        </div>

        {error && <div className={cx("error_toast")}>{error}</div>}
      </div>
    </div>
  );
}
