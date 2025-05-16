import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import classnames from "classnames/bind";
import style from "./PostEditor.module.scss";
import markdownToHtml from "../lib/markdownToHtml";
import { CATEGORY } from "@/lib/constants";
import { generateHashId } from "@/lib/utils";
import { useRouter } from "next/router";

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
  tempId?: string; // 임시저장된 포스트 ID
  isEditMode?: boolean; // 편집 모드 여부
  originalSlug?: string; // 원본 포스트 slug
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
  tempId = "",
  isEditMode = false,
  originalSlug = "",
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

  const [postId, setPostId] = useState(tempId || "");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isLoadingTempPost, setIsLoadingTempPost] = useState(false);
  const [isUpdatingOriginal, setIsUpdatingOriginal] = useState(false);

  const router = useRouter();
  const autoSaveIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const postIdRef = useRef<string>(tempId || "");

  // URL에서 tempId 파라미터를 확인하고 임시저장 포스트 로드
  useEffect(() => {
    const { tempId: urlTempId } = router.query;

    // 편집 모드에서는 임시 저장 로드 기능 비활성화
    if (!isEditMode && urlTempId && typeof urlTempId === "string") {
      loadTempPost(urlTempId);
    }
  }, [router.query, isEditMode]);

  // 임시저장 포스트 불러오는 함수
  const loadTempPost = async (id: string) => {
    if (!id) return;

    try {
      setIsLoadingTempPost(true);
      setError("");

      const response = await fetch(`/api/temp-post/${id}`);

      if (!response.ok) {
        throw new Error("임시저장 포스트를 불러오는데 실패했습니다");
      }

      const { post } = await response.json();
      console.log(post);

      if (post) {
        setTitle(post.title || "");
        setContent(post.content || "");
        setCategory(post.category || categoryList[0] || "");
        setDescription(post.description || "");
        setCoverImage(post.coverImage || "");
        setTags(post.tags || "");
        setPostId(id);
        postIdRef.current = id;
        setLastSaved(new Date(post.date));
        console.log("임시저장 포스트 로드 완료:", id);
      }
    } catch (err) {
      console.error("임시저장 포스트 불러오기 오류:", err);
      setError(err instanceof Error ? err.message : "임시저장 포스트를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setIsLoadingTempPost(false);
    }
  };

  useEffect(() => {
    postIdRef.current = postId;
  }, [postId]);

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

  // 컨텍스트 메뉴 외부 클릭 시 닫기 로직 개선
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) {
        setShowContextMenu(false);
      }
    };

    if (showContextMenu) {
      document.addEventListener("mousedown", handleClickOutside, true);
      document.addEventListener("scroll", () => setShowContextMenu(false), true);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
      document.removeEventListener("scroll", () => setShowContextMenu(false), true);
    };
  }, [showContextMenu]);

  // ESC 키 누를 때 컨텍스트 메뉴 닫기
  useEffect(() => {
    console.log(showContextMenu);

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showContextMenu) {
        setShowContextMenu(false);
      }
    };

    // 컨텍스트 메뉴가 열려있을 때만 이벤트 리스너 추가
    if (showContextMenu) {
      document.addEventListener("keydown", handleEscKey);
    }

    // 컴포넌트 언마운트 또는 deps 변경 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [showContextMenu]);

  useEffect(() => {
    if (initialTitle !== title || initialContent !== content) {
      setHasUnsavedChanges(true);
    } else {
      setHasUnsavedChanges(false);
    }
  }, [title, content, initialTitle, initialContent]);

  // 자동 저장 설정
  useEffect(() => {
    if (autoSaveIntervalRef.current) {
      clearInterval(autoSaveIntervalRef.current);
    }

    // 편집 모드일 때는 임시 저장 대신 원본 파일 업데이트 실행
    const initialDelay = setTimeout(() => {
      if (title.trim() && content.trim() && !isSubmitting) {
        if (isEditMode && originalSlug) {
          autoUpdateOriginal();
        } else {
          autoSaveDraft();
        }
      }

      autoSaveIntervalRef.current = setInterval(() => {
        if (title.trim() && content.trim() && !isSubmitting) {
          if (isEditMode && originalSlug) {
            autoUpdateOriginal();
          } else {
            autoSaveDraft();
          }
        }
      }, 3000); // 15초마다 자동저장
    }, 5000); // 초기 5초 후 시작

    return () => {
      clearTimeout(initialDelay);
      if (autoSaveIntervalRef.current) {
        clearInterval(autoSaveIntervalRef.current);
      }
    };
  }, [title, content, isEditMode, originalSlug, isSubmitting]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        const message = "저장되지 않은 변경사항이 있습니다. 정말 페이지를 나가시겠습니까?";
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    const handleRouteChange = (url: string) => {
      if (hasUnsavedChanges && !confirm("저장되지 않은 변경사항이 있습니다. 정말 페이지를 나가시겠습니까?")) {
        router.events.emit("routeChangeError");
        throw "Route change aborted";
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [hasUnsavedChanges, router]);

  // 원본 파일 자동 업데이트
  const autoUpdateOriginal = async () => {
    if (!title.trim() || !content.trim() || isSubmitting || !isEditMode || !originalSlug) return;

    try {
      setIsUpdatingOriginal(true);

      const response = await fetch(`http://localhost:3001/api/update-post?slug=${originalSlug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: originalSlug,
          title,
          content,
          category,
          description,
          coverImage,
          tags,
        }),
      });

      if (!response.ok) {
        throw new Error("포스트 업데이트에 실패했습니다");
      }

      setLastSaved(new Date());
      setHasUnsavedChanges(false);
    } catch (err) {
      console.error("포스트 업데이트 오류:", err);
      // 중요한 에러는 사용자에게 알림, 자동 저장 실패는 조용히 로깅만
    } finally {
      setIsUpdatingOriginal(false);
    }
  };

  // 임시 저장 (자동)
  const autoSaveDraft = async () => {
    // 편집 모드일 때는 임시저장 하지 않음
    if (isEditMode || !title.trim() || !content.trim() || isSubmitting) return;

    try {
      setIsAutoSaving(true);

      const currentPostId = postIdRef.current || generateHashId();

      const response = await fetch("/api/temp-save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentPostId,
          title,
          content,
          category,
          description,
          coverImage,
          tags,
          date: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("임시저장에 실패했습니다");
      }

      const result = await response.json();

      if (!postIdRef.current) {
        postIdRef.current = currentPostId;
        setPostId(currentPostId);
      }

      setLastSaved(new Date());
      setHasUnsavedChanges(false);
    } catch (err) {
      console.error("임시저장 오류:", err);
    } finally {
      setIsAutoSaving(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!title.trim() || !content.trim()) {
      setError("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      setError("");

      // 편집 모드일 경우 원본 파일 업데이트
      if (isEditMode && originalSlug) {
        setIsUpdatingOriginal(true);
        const response = await fetch(`http://localhost:3001/api/update-post?slug=${originalSlug}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            slug: originalSlug,
            title,
            content,
            category,
            description,
            coverImage,
            tags,
          }),
        });

        if (!response.ok) {
          throw new Error("포스트 업데이트에 실패했습니다");
        }

        setLastSaved(new Date());
        setHasUnsavedChanges(false);
        alert("변경사항이 저장되었습니다.");
        setIsUpdatingOriginal(false);
      } else {
        // 일반 모드일 경우 임시저장
        const currentPostId = postIdRef.current || generateHashId();

        const response = await fetch("/api/temp-save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: currentPostId,
            title,
            content,
            category,
            description,
            coverImage,
            tags,
            date: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          throw new Error("임시저장에 실패했습니다");
        }

        const result = await response.json();

        if (!postIdRef.current) {
          postIdRef.current = currentPostId;
          setPostId(currentPostId);
        }

        setLastSaved(new Date());
        setHasUnsavedChanges(false);
        alert(result.message || "임시저장이 완료되었습니다.");
      }
    } catch (err) {
      console.error(isEditMode ? "포스트 업데이트 오류:" : "임시저장 오류:", err);
      setError(err instanceof Error ? err.message : "저장 중 오류가 발생했습니다.");
    }
  };

  // 임시저장된 포스트 선택 핸들러 - 기존 ID를 유지하도록 수정
  const handleSelectTempPost = (id: string) => {
    console.log("임시저장 포스트 선택:", id);
    router.push(`/admin/create?tempId=${id}`);
  };

  const wrapTextWithHtml = (tag: string, className: string) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const textValue = textarea.value;

    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;

    if (startPos !== endPos) {
      const selectedText = textValue.substring(startPos, endPos);
      const wrappedText = `<${tag} href="" class="${className}">${selectedText}</${tag}>`;

      const beforeText = textValue.substring(0, startPos);
      const afterText = textValue.substring(endPos);
      const newContent = beforeText + wrappedText + afterText;

      setContent(newContent);

      setTimeout(() => {
        textarea.focus();
        const hrefPos = beforeText.length + `<${tag} href="`.length;
        textarea.setSelectionRange(hrefPos, hrefPos);
      }, 0);
    } else {
      const startOfLine = textValue.lastIndexOf("\n", startPos - 1) + 1;
      const endOfLine = textValue.indexOf("\n", startPos);
      const actualEndOfLine = endOfLine === -1 ? textValue.length : endOfLine;

      const lineText = textValue.substring(startOfLine, actualEndOfLine).trim();
      const wrappedText = `<${tag} href="" class="${className}">${lineText}</${tag}>`;

      const beforeLine = textValue.substring(0, startOfLine);
      const afterLine = textValue.substring(actualEndOfLine);
      const newContent = beforeLine + wrappedText + afterLine;

      setContent(newContent);

      setTimeout(() => {
        textarea.focus();
        const hrefPos = beforeLine.length + `<${tag} href="`.length;
        textarea.setSelectionRange(hrefPos, hrefPos);
      }, 0);
    }

    setShowContextMenu(false);
  };

  const handleLink = () => {
    wrapTextWithHtml("a", "post_hyper_link");
  };

  const handleBox = () => {
    wrapTextWithHtml("div", "post_box");
  };

  const handleTextSelection = (e: MouseEvent | React.MouseEvent<HTMLTextAreaElement>) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const selection = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);

    if (selection && selection.length > 0) {
      setSelectedLineText(selection);

      let x = 0,
        y = 0;

      if ("clientX" in e) {
        x = e.clientX;
        y = e.clientY;
      } else {
        const range = document.createRange();
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          range.selectNodeContents(textarea);
          const rect = range.getBoundingClientRect();
          x = rect.left;
          y = rect.top;
        } else {
          const rect = textarea.getBoundingClientRect();
          x = rect.left + rect.width / 2;
          y = rect.top + rect.height / 2;
        }
      }

      const menuWidth = 140;

      x = Math.min(x, window.innerWidth - menuWidth - 20);

      setMenuPosition({ x, y });
      setShowContextMenu(true);
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleSelectionChange = () => {
      if (
        document.activeElement === textarea &&
        textarea.selectionStart !== textarea.selectionEnd &&
        !showContextMenu
      ) {
        const selection = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
        if (selection) {
          setSelectedLineText(selection);

          const rect = textarea.getBoundingClientRect();
          const lineHeight = parseInt(getComputedStyle(textarea).lineHeight) || 20;

          const cursorPosition = textarea.selectionEnd;
          const textBeforeCursor = textarea.value.substring(0, cursorPosition);
          const lines = textBeforeCursor.split("\n");
          const currentLineIndex = lines.length - 1;

          const y = rect.top + currentLineIndex * lineHeight + lineHeight;
          const x = rect.left + 20;

          const menuWidth = 140;
          const adjustedX = Math.min(x, window.innerWidth - menuWidth - 20);

          setMenuPosition({ x: adjustedX, y });
          setShowContextMenu(true);
        }
      }
    };

    textarea.addEventListener("keyup", handleSelectionChange);

    textarea.addEventListener("mouseup", (e) => {
      if (textarea.selectionStart !== textarea.selectionEnd) {
        handleTextSelection(e);
      }
    });

    return () => {
      textarea.removeEventListener("keyup", handleSelectionChange);
      textarea.removeEventListener("mouseup", handleTextSelection as any);
    };
  }, [textareaRef.current, showContextMenu]);

  const handleDoubleClick = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const cursorPosition = textarea.selectionStart;
    const textValue = textarea.value;

    const startOfLine = textValue.lastIndexOf("\n", cursorPosition - 1) + 1;
    let endOfLine = textValue.indexOf("\n", cursorPosition);
    if (endOfLine === -1) endOfLine = textValue.length;

    textarea.setSelectionRange(startOfLine, endOfLine);

    const selectedText = textValue.substring(startOfLine, endOfLine);
    setSelectedLineText(selectedText);

    handleTextSelection(e);
  };

  const scrollToText = (text: string) => {
    const container = previewContainerRef.current;

    if (container) {
      const paragraphs = container.querySelectorAll("*");
      if (paragraphs.length > 0) {
        for (let i = 0; i < paragraphs.length; i++) {
          console.log(paragraphs[i].textContent);
          if (paragraphs[i].textContent?.includes(text)) {
            const rect = paragraphs[i].getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            const scrollTop = rect.top - containerRect.top + container.scrollTop - 200;

            container.scrollTo({ top: scrollTop, behavior: "smooth" });

            break;
          }
        }
      }
    }
  };

  const handleCursorPosition = (e: any) => {
    const textarea = e.target;
    const cursorPosition = textarea.selectionStart;

    const textValue = textarea.value;

    if (textValue.trim() === "") return;

    const startOfLine = textValue.lastIndexOf("\n", cursorPosition - 1) + 1;

    const endOfLine = textValue.indexOf("\n", cursorPosition);

    const currentLineText = textValue.substring(startOfLine, endOfLine === -1 ? textValue.length : endOfLine);
    console.log(currentLineText);
    scrollToText(removeHyphens(currentLineText));
  };

  const handleHeaderTwo = () => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const textValue = textarea.value;

    const startPos = textarea.selectionStart;

    const startOfLine = textValue.lastIndexOf("\n", startPos - 1) + 1;

    const endOfLine = textValue.indexOf("\n", startPos);
    const actualEndOfLine = endOfLine === -1 ? textValue.length : endOfLine;

    const lineText = textValue.substring(startOfLine, actualEndOfLine);

    let newLineText = lineText.trim();

    if (newLineText.startsWith("## ")) {
      newLineText = newLineText.substring(3);
    } else if (newLineText.startsWith("### ")) {
      newLineText = "## " + newLineText.substring(4);
    } else if (!newLineText.startsWith("## ")) {
      newLineText = "## " + newLineText;
    }

    const beforeLine = textValue.substring(0, startOfLine);
    const afterLine = textValue.substring(actualEndOfLine);
    const newContent = beforeLine + newLineText + afterLine;

    setContent(newContent);
    setShowContextMenu(false);

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = startOfLine + newLineText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleHeaderThree = () => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const textValue = textarea.value;

    const startPos = textarea.selectionStart;
    const startOfLine = textValue.lastIndexOf("\n", startPos - 1) + 1;
    const endOfLine = textValue.indexOf("\n", startPos);
    const actualEndOfLine = endOfLine === -1 ? textValue.length : endOfLine;

    const lineText = textValue.substring(startOfLine, actualEndOfLine);

    let newLineText = lineText.trim();

    if (newLineText.startsWith("### ")) {
      newLineText = newLineText.substring(4);
    } else if (newLineText.startsWith("## ")) {
      newLineText = "### " + newLineText.substring(3);
    } else if (!newLineText.startsWith("### ")) {
      newLineText = "### " + newLineText;
    }

    const beforeLine = textValue.substring(0, startOfLine);
    const afterLine = textValue.substring(actualEndOfLine);
    const newContent = beforeLine + newLineText + afterLine;

    setContent(newContent);
    setShowContextMenu(false);

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = startOfLine + newLineText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleBold = () => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const textValue = textarea.value;

    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;

    if (startPos !== endPos) {
      const selectedText = textValue.substring(startPos, endPos);

      const isBold = selectedText.startsWith("**") && selectedText.endsWith("**");

      let newText;
      if (isBold) {
        newText = selectedText.substring(2, selectedText.length - 2);
      } else {
        newText = `**${selectedText}**`;
      }

      const beforeText = textValue.substring(0, startPos);
      const afterText = textValue.substring(endPos);
      const newContent = beforeText + newText + afterText;

      setContent(newContent);

      setTimeout(() => {
        textarea.focus();
        const newCursorStart = startPos;
        const newCursorEnd = startPos + newText.length;
        textarea.setSelectionRange(newCursorStart, newCursorEnd);
      }, 0);
    } else {
      const startOfLine = textValue.lastIndexOf("\n", startPos - 1) + 1;
      const endOfLine = textValue.indexOf("\n", startPos);
      const actualEndOfLine = endOfLine === -1 ? textValue.length : endOfLine;

      const lineText = textValue.substring(startOfLine, actualEndOfLine);

      const isBold = lineText.trim().startsWith("**") && lineText.trim().endsWith("**");

      let newLineText;
      if (isBold) {
        newLineText = lineText.trim().substring(2, lineText.trim().length - 2);
      } else {
        newLineText = `**${lineText.trim()}**`;
      }

      const beforeLine = textValue.substring(0, startOfLine);
      const afterLine = textValue.substring(actualEndOfLine);
      const newContent = beforeLine + newLineText + afterLine;

      setContent(newContent);
    }

    setShowContextMenu(false);
  };

  const handleUnderline = () => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const textValue = textarea.value;

    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;

    if (startPos !== endPos) {
      const selectedText = textValue.substring(startPos, endPos);

      const isUnderline = selectedText.startsWith("<u>") && selectedText.endsWith("</u>");

      let newText;
      if (isUnderline) {
        newText = selectedText.substring(3, selectedText.length - 4);
      } else {
        newText = `<u>${selectedText}</u>`;
      }

      const beforeText = textValue.substring(0, startPos);
      const afterText = textValue.substring(endPos);
      const newContent = beforeText + newText + afterText;

      setContent(newContent);

      setTimeout(() => {
        textarea.focus();
        const newCursorStart = startPos;
        const newCursorEnd = startPos + newText.length;
        textarea.setSelectionRange(newCursorStart, newCursorEnd);
      }, 0);
    } else {
      const startOfLine = textValue.lastIndexOf("\n", startPos - 1) + 1;
      const endOfLine = textValue.indexOf("\n", startPos);
      const actualEndOfLine = endOfLine === -1 ? textValue.length : endOfLine;

      const lineText = textValue.substring(startOfLine, actualEndOfLine);

      const isUnderline = lineText.trim().startsWith("<u>") && lineText.trim().endsWith("</u>");

      let newLineText;
      if (isUnderline) {
        newLineText = lineText.trim().substring(3, lineText.trim().length - 4);
      } else {
        newLineText = `<u>${lineText.trim()}</u>`;
      }

      const beforeLine = textValue.substring(0, startOfLine);
      const afterLine = textValue.substring(actualEndOfLine);
      const newContent = beforeLine + newLineText + afterLine;

      setContent(newContent);
    }

    setShowContextMenu(false);
  };

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
        if (!textareaRef.current) return;

        const textarea = textareaRef.current;
        const textValue = textarea.value;

        const selectionEnd = textarea.selectionEnd;

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

  function removeHyphens(str: string) {
    str = str.replace(/-/g, "");
    str = str.replace(/#/g, "");
    str = str.trim();
    return str;
  }

  const handlePaste = async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const clipboardData = e.clipboardData;
    const items = clipboardData.items;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        e.preventDefault();
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

  const uploadImage = async (file: File): Promise<string> => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const encodedTitle = encodeURIComponent(title || "untitled");
      const uploadUrl = `http://localhost:3001/api/upload-image?postTitle=${encodedTitle}`;

      const response = await fetch(uploadUrl, {
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

  const insertImageToEditor = (imageUrl: string) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const endPos = textarea.selectionEnd;

    const beforeText = textarea.value.substring(0, endPos);
    const afterText = textarea.value.substring(endPos);
    const imageMarkdown = `![이미지](${imageUrl})`;

    const newContent = beforeText + imageMarkdown + afterText;
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = endPos + imageMarkdown.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      const imageUrl = await uploadImage(files[0]);
      insertImageToEditor(imageUrl);
    } catch (err) {
      setError("이미지 업로드 중 오류가 발생했습니다.");
    } finally {
      e.target.value = "";
    }
  };

  const handleSubmitForm = async () => {
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

  const handleContextMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={cx("container")}>
      <div className={cx("editor_header_bar")}>
        <div className={cx("editor_header_left")}>
          <Link href="/admin" className={cx("logo")}>
            돈되는 새싹
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
                onClick={handleContextMenuClick}
              >
                <div className={cx("context_top_menu")}>
                  <button type="button" className={cx("context_top_menu_item")} onClick={handleHeaderTwo}>
                    h2
                  </button>
                  <button type="button" className={cx("context_top_menu_item")} onClick={handleHeaderThree}>
                    h3
                  </button>
                  <button type="button" className={cx("context_top_menu_item")} onClick={handleBold}>
                    <b>B</b>
                  </button>
                  <button type="button" className={cx("context_top_menu_item")} onClick={handleUnderline}>
                    <u>U</u>
                  </button>
                  <button type="button" className={cx("context_top_menu_item")} onClick={handleLink}>
                    L
                  </button>
                  <button type="button" className={cx("context_top_menu_item")} onClick={handleBox}>
                    ㅁ
                  </button>
                </div>
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
              {lastSaved && <span className={cx("last_saved")}>마지막 저장: {lastSaved.toLocaleTimeString()}</span>}
            </div>

            <div className={cx("action_buttons")}>
              <button
                className={cx("draft_btn")}
                onClick={handleSaveDraft}
                disabled={isSubmitting || isAutoSaving || isUpdatingOriginal || !title.trim() || !content.trim()}
              >
                {isAutoSaving || isUpdatingOriginal
                  ? "저장 중..."
                  : isEditMode
                  ? "변경사항 저장"
                  : postIdRef.current
                  ? "임시저장 업데이트"
                  : "임시저장"}
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
