import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { getPostCategories } from "@/lib/api";
import style from "./create.module.scss";
import classnames from "classnames/bind";
import CustomHead from "@/components/CustomHead";
import Link from "next/link";
import useAdminAuth from "@/hooks/useAdminAuth";

const cx = classnames.bind(style);

type Props = {
  categoryList: string[];
};

export default function CreatePost({ categoryList }: Props) {
  // Use the admin auth hook
  const { isAuthorized, isLoading } = useAdminAuth();

  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState(categoryList[0] || "");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [tags, setTags] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // 에디터 높이를 동적으로 조정하는 효과
  useEffect(() => {
    const handleResize = () => {
      const headerHeight = document.querySelector(`.${cx("editor_header")}`)?.clientHeight || 0;
      const footerHeight = document.querySelector(`.${cx("editor_footer")}`)?.clientHeight || 0;
      const windowHeight = window.innerHeight;

      const editor = document.querySelector(`.${cx("editor_body")}`) as HTMLElement;
      if (editor) {
        const availableHeight = windowHeight - headerHeight - footerHeight - 120;
        editor.style.height = `${availableHeight}px`;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 에디터 초기화
  useEffect(() => {
    if (editorRef.current) {
      // 에디터 포커스시 기본 p 태그 추가
      editorRef.current.addEventListener("focus", () => {
        if (editorRef.current && editorRef.current.innerHTML === "") {
          editorRef.current.innerHTML = "<p><br></p>";
        }
      });

      // 콘텐츠 변경 감지
      editorRef.current.addEventListener("input", () => {
        if (editorRef.current) {
          setContent(editorRef.current.innerHTML);
        }
      });
    }
  }, []);

  // 이미지 업로드 함수
  const uploadImage = async (file: File): Promise<string> => {
    setIsUploading(true);
    try {
      // FormData 생성
      const formData = new FormData();
      formData.append("image", file);

      // 이미지 업로드 API 호출 (실제 API로 변경 필요)
      // 실제 구현에서는 이 부분을 서버에 맞게 수정하세요
      const response = await fetch("http://localhost:3001/api/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("이미지 업로드 실패");
      }

      const result = await response.json();
      return result.imageUrl; // 업로드된 이미지 URL 반환

      // 개발용 테스트 코드 (실제 구현 시 삭제)
      // return URL.createObjectURL(file);
    } catch (err) {
      console.error("이미지 업로드 오류:", err);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  // 이미지 드래그 앤 드롭 처리
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (editorRef.current) {
      editorRef.current.classList.add(cx("drag-over"));
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (editorRef.current) {
      editorRef.current.classList.remove(cx("drag-over"));
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (editorRef.current) {
      editorRef.current.classList.remove(cx("drag-over"));

      const files = Array.from(e.dataTransfer.files);
      const imageFiles = files.filter((file) => file.type.startsWith("image/"));

      if (imageFiles.length === 0) return;

      for (const imageFile of imageFiles) {
        try {
          const imageUrl = await uploadImage(imageFile);
          insertImageToEditor(imageUrl);
        } catch (err) {
          setError("이미지 업로드 중 오류가 발생했습니다.");
        }
      }
    }
  };

  // 클립보드에서 이미지 붙여넣기 처리
  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        e.preventDefault();

        const file = items[i].getAsFile();
        if (!file) continue;

        try {
          const imageUrl = await uploadImage(file);
          insertImageToEditor(imageUrl);
        } catch (err) {
          setError("이미지 업로드 중 오류가 발생했습니다.");
        }

        break;
      }
    }
  };

  // 에디터에 이미지 삽입
  const insertImageToEditor = (imageUrl: string) => {
    if (!editorRef.current) return;

    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const img = document.createElement("img");
    img.src = imageUrl;
    img.className = cx("editor-image");

    range.insertNode(img);
    range.setStartAfter(img);
    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);

    // 콘텐츠 상태 업데이트
    setContent(editorRef.current.innerHTML);
  };

  // 폼 제출 처리
  const handleSubmit = async () => {
    // Form validation
    if (!title.trim()) {
      setError("제목을 입력해주세요.");
      return;
    }

    if (!content || content === "<p><br></p>") {
      setError("내용을 입력해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      // 한글을 포함한 슬러그 생성
      const slug = title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9가-힣\s]/gi, "") // 영문, 숫자, 한글, 공백만 허용
        .replace(/\s+/g, "-");

      const postData = {
        title,
        content,
        category,
        description,
        coverImage,
        slug,
        tags: tags.split(" ").filter((tag) => tag.startsWith("#")),
        date: new Date().toISOString(),
      };

      console.log(postData);

      const response = await fetch("http://localhost:3001/api/create-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "포스트 생성에 실패했습니다.");
      }

      const result = await response.json();

      alert("포스트가 성공적으로 생성되었습니다.");
      router.push("/admin");
    } catch (err) {
      console.error("Error creating post:", err);
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 에디터 도구 버튼 핸들러
  const handleBold = () => {
    document.execCommand("bold", false);
    if (editorRef.current) setContent(editorRef.current.innerHTML);
  };

  const handleItalic = () => {
    document.execCommand("italic", false);
    if (editorRef.current) setContent(editorRef.current.innerHTML);
  };

  const handleUnderline = () => {
    document.execCommand("underline", false);
    if (editorRef.current) setContent(editorRef.current.innerHTML);
  };

  const handleHeading = () => {
    document.execCommand("formatBlock", false, "<h2>");
    if (editorRef.current) setContent(editorRef.current.innerHTML);
  };

  const handleParagraph = () => {
    document.execCommand("formatBlock", false, "<p>");
    if (editorRef.current) setContent(editorRef.current.innerHTML);
  };

  const handleStrikethrough = () => {
    document.execCommand("strikethrough", false);
    if (editorRef.current) setContent(editorRef.current.innerHTML);
  };

  const handleAlign = (align: string) => {
    document.execCommand(`justify${align}`, false);
    if (editorRef.current) setContent(editorRef.current.innerHTML);
  };

  // Show loading or unauthorized message
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return <div>Unauthorized access</div>;
  }

  return (
    <>
      <CustomHead type="home" />
      <div className={cx("container")}>
        {/* 에디터 스타일 헤더 */}
        <div className={cx("editor_header_bar")}>
          <div className={cx("editor_header_left")}>
            <Link href="/admin" className={cx("logo")}>
              SeedDividend
            </Link>
          </div>

          <div className={cx("editor_toolbar")}>
            <button type="button" className={cx("toolbar_btn")} onClick={() => {}} title="본문2">
              <span>본문2</span>
              <span className={cx("dropdown_arrow")}>▾</span>
            </button>

            <span className={cx("toolbar_divider")}></span>

            <button type="button" className={cx("toolbar_btn")} onClick={handleBold} title="굵게">
              <span className={cx("toolbar_icon", "bold")}>B</span>
            </button>
            <button type="button" className={cx("toolbar_btn")} onClick={handleItalic} title="기울임">
              <span className={cx("toolbar_icon", "italic")}>I</span>
            </button>
            <button type="button" className={cx("toolbar_btn")} onClick={handleUnderline} title="밑줄">
              <span className={cx("toolbar_icon", "underline")}>U</span>
            </button>
            <button type="button" className={cx("toolbar_btn")} onClick={handleStrikethrough} title="취소선">
              <span className={cx("toolbar_icon", "strikethrough")}>T</span>
            </button>

            <span className={cx("toolbar_divider")}></span>

            <div className={cx("toolbar_btn_group")}>
              <button type="button" className={cx("toolbar_btn")} onClick={() => handleAlign("Left")} title="왼쪽 정렬">
                <span className={cx("toolbar_icon", "align-left")}>≡</span>
              </button>
              <button
                type="button"
                className={cx("toolbar_btn")}
                onClick={() => handleAlign("Center")}
                title="가운데 정렬"
              >
                <span className={cx("toolbar_icon", "align-center")}>≡</span>
              </button>
              <button
                type="button"
                className={cx("toolbar_btn")}
                onClick={() => handleAlign("Right")}
                title="오른쪽 정렬"
              >
                <span className={cx("toolbar_icon", "align-right")}>≡</span>
              </button>
            </div>

            <span className={cx("toolbar_divider")}></span>

            <button type="button" className={cx("toolbar_btn")} title="인용구">
              <span className={cx("toolbar_icon", "quote")}>❞</span>
            </button>
            <button type="button" className={cx("toolbar_btn")} title="링크">
              <span className={cx("toolbar_icon", "link")}>🔗</span>
            </button>
            <button type="button" className={cx("toolbar_btn")} title="이미지">
              <span className={cx("toolbar_icon", "image")}>📷</span>
            </button>

            <span className={cx("toolbar_divider")}></span>

            <button type="button" className={cx("toolbar_btn")} title="목록">
              <span className={cx("toolbar_icon", "list")}>•</span>
              <span className={cx("dropdown_arrow")}>▾</span>
            </button>
            <button type="button" className={cx("toolbar_btn")} title="구분선">
              <span className={cx("toolbar_icon", "horizontal-rule")}>—</span>
            </button>
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
                    {cat}
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
          </div>

          <div className={cx("editor_body")}>
            <div
              ref={editorRef}
              className={cx("content_editor", { uploading: isUploading })}
              contentEditable
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onPaste={handlePaste}
              placeholder="내용을 입력하세요..."
              suppressContentEditableWarning={true}
            />
            {isUploading && <div className={cx("upload_overlay")}>이미지 업로드 중...</div>}
          </div>

          <div className={cx("editor_footer")}>
            <div className={cx("tag_input_container")}>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className={cx("tag_input")}
                placeholder="#태그입력"
                disabled={isSubmitting}
              />
            </div>

            <div className={cx("editor_tools")}>
              <div className={cx("tool_buttons")}>
                <button className={cx("tool_btn")}>
                  <span className={cx("tool_icon")}>📄</span> 미리보기
                </button>
                <button className={cx("tool_btn")}>
                  <span className={cx("tool_icon")}>🔍</span> 맞춤법 검사
                </button>
                <button className={cx("tool_btn")}>
                  <span className={cx("tool_icon")}>📎</span> 글꼴열기
                </button>
              </div>

              <div className={cx("action_buttons")}>
                <button className={cx("draft_btn")} disabled={isSubmitting}>
                  임시저장
                </button>
                <button className={cx("publish_btn")} onClick={handleSubmit} disabled={isSubmitting || isUploading}>
                  {isSubmitting ? "저장 중..." : "완료"}
                </button>
              </div>
            </div>
          </div>

          {error && <div className={cx("error_toast")}>{error}</div>}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const categoryList = await getPostCategories();

  return {
    props: {
      categoryList,
    },
  };
}
