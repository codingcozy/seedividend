exports.id = 502;
exports.ids = [502];
exports.modules = {

/***/ 8696:
/***/ ((module) => {

// Exports
module.exports = {
	"post_content": "PostEditor_post_content__VjJL5",
	"container": "PostEditor_container__VdkXX",
	"editor_header_bar": "PostEditor_editor_header_bar__J4Y8n",
	"logo": "PostEditor_logo__gzCRN",
	"editor_toolbar": "PostEditor_editor_toolbar__ONDs2",
	"toolbar_btn": "PostEditor_toolbar_btn__P56OP",
	"toolbar_icon": "PostEditor_toolbar_icon___63fE",
	"bold": "PostEditor_bold__m5s_Y",
	"italic": "PostEditor_italic__4NgOu",
	"underline": "PostEditor_underline__GdQr4",
	"strikethrough": "PostEditor_strikethrough__xaYqp",
	"dropdown_arrow": "PostEditor_dropdown_arrow__gl29K",
	"toolbar_divider": "PostEditor_toolbar_divider__cNYB4",
	"toolbar_btn_group": "PostEditor_toolbar_btn_group__GdypF",
	"editor_header_right": "PostEditor_editor_header_right__IjCB4",
	"header_action_btn": "PostEditor_header_action_btn__meLdF",
	"editor_container": "PostEditor_editor_container__etvoI",
	"editor_content_container": "PostEditor_editor_content_container__QKNes",
	"editor_header": "PostEditor_editor_header__AUxu0",
	"category_select_container": "PostEditor_category_select_container__rUaKE",
	"category_select": "PostEditor_category_select__iwI60",
	"select_arrow": "PostEditor_select_arrow__dl_PE",
	"title_input": "PostEditor_title_input__In0uz",
	"editor_body": "PostEditor_editor_body__V0i5A",
	"content_editor": "PostEditor_content_editor__keKUc",
	"drag-over": "PostEditor_drag-over__EI021",
	"uploading": "PostEditor_uploading__a0anN",
	"preview_container": "PostEditor_preview_container__vQxcM",
	"preview_header": "PostEditor_preview_header__88jBQ",
	"preview_title": "PostEditor_preview_title__ZGprs",
	"preview_body": "PostEditor_preview_body__S_V2P",
	"upload_overlay": "PostEditor_upload_overlay__YXWga",
	"editor-image": "PostEditor_editor-image__wWi7L",
	"editor_footer": "PostEditor_editor_footer__2UK0H",
	"tag_input_container": "PostEditor_tag_input_container__u_HzZ",
	"tag_input": "PostEditor_tag_input__Ez0g8",
	"editor_tools": "PostEditor_editor_tools__Z26gS",
	"tool_buttons": "PostEditor_tool_buttons__Yit9E",
	"tool_btn": "PostEditor_tool_btn__NIkK4",
	"tool_icon": "PostEditor_tool_icon__p3Q4t",
	"action_buttons": "PostEditor_action_buttons__yPA0j",
	"draft_btn": "PostEditor_draft_btn__Q1MXh",
	"publish_btn": "PostEditor_publish_btn___6GOw",
	"error_toast": "PostEditor_error_toast__FCzSv",
	"fadeIn": "PostEditor_fadeIn__hK3nC",
	"context_menu": "PostEditor_context_menu__ZIPVW",
	"context_top_menu": "PostEditor_context_top_menu__S9XL0",
	"context_top_menu_item": "PostEditor_context_top_menu_item__9XjaD",
	"context_menu_item": "PostEditor_context_menu_item__XQxs8"
};


/***/ }),

/***/ 3425:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ PostEditor)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3284);
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames_bind__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _PostEditor_module_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8696);
/* harmony import */ var _PostEditor_module_scss__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_PostEditor_module_scss__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _lib_markdownToHtml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7095);
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4696);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8728);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_7__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_markdownToHtml__WEBPACK_IMPORTED_MODULE_4__]);
_lib_markdownToHtml__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];









const cx = classnames_bind__WEBPACK_IMPORTED_MODULE_3___default().bind((_PostEditor_module_scss__WEBPACK_IMPORTED_MODULE_8___default()));
function PostEditor({ initialTitle ="" , initialContent ="" , initialCategory ="" , initialDescription ="" , initialCoverImage ="" , initialTags ="" , categoryList =[] , onSubmit , submitButtonText , isSubmitting , tempId ="" , isEditMode =false , originalSlug =""  }) {
    const [title, setTitle] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialTitle);
    const [content, setContent] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialContent);
    const [category, setCategory] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialCategory || categoryList[0] || "");
    const [description, setDescription] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialDescription);
    const [coverImage, setCoverImage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialCoverImage);
    const [tags, setTags] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialTags);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [isUploading, setIsUploading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [htmlContent, setHtmlContent] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [cursorLine, setCursorLine] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [isGeneratingIndex, setIsGeneratingIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [selectedLineText, setSelectedLineText] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [showContextMenu, setShowContextMenu] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [menuPosition, setMenuPosition] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        x: 0,
        y: 0
    });
    const textareaRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const previewRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const editorContainerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const previewContainerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const isScrollingSyncRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    const contextMenuRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const [postId, setPostId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(tempId || "");
    const [lastSaved, setLastSaved] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [isAutoSaving, setIsAutoSaving] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [isLoadingTempPost, setIsLoadingTempPost] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [isUpdatingOriginal, setIsUpdatingOriginal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_7__.useRouter)();
    const autoSaveIntervalRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const postIdRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(tempId || "");
    // URL에서 tempId 파라미터를 확인하고 임시저장 포스트 로드
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const { tempId: urlTempId  } = router.query;
        // 편집 모드에서는 임시 저장 로드 기능 비활성화
        if (!isEditMode && urlTempId && typeof urlTempId === "string") {
            loadTempPost(urlTempId);
        }
    }, [
        router.query,
        isEditMode
    ]);
    // 임시저장 포스트 불러오는 함수
    const loadTempPost = async (id)=>{
        if (!id) return;
        try {
            setIsLoadingTempPost(true);
            setError("");
            const response = await fetch(`/api/temp-post/${id}`);
            if (!response.ok) {
                throw new Error("임시저장 포스트를 불러오는데 실패했습니다");
            }
            const { post  } = await response.json();
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
        } finally{
            setIsLoadingTempPost(false);
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        postIdRef.current = postId;
    }, [
        postId
    ]);
    // 마크다운을 HTML로 변환
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const convertMarkdown = async ()=>{
            try {
                const html = await (0,_lib_markdownToHtml__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)(content);
                setHtmlContent(html);
            } catch (error) {
                console.error("마크다운 변환 오류:", error);
            }
        };
        convertMarkdown();
    }, [
        content
    ]);
    // 컨텍스트 메뉴 외부 클릭 시 닫기 로직 개선
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handleClickOutside = (event)=>{
            if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
                setShowContextMenu(false);
            }
        };
        if (showContextMenu) {
            document.addEventListener("mousedown", handleClickOutside, true);
            document.addEventListener("scroll", ()=>setShowContextMenu(false), true);
        }
        return ()=>{
            document.removeEventListener("mousedown", handleClickOutside, true);
            document.removeEventListener("scroll", ()=>setShowContextMenu(false), true);
        };
    }, [
        showContextMenu
    ]);
    // ESC 키 누를 때 컨텍스트 메뉴 닫기
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        console.log(showContextMenu);
        const handleEscKey = (event)=>{
            if (event.key === "Escape" && showContextMenu) {
                setShowContextMenu(false);
            }
        };
        // 컨텍스트 메뉴가 열려있을 때만 이벤트 리스너 추가
        if (showContextMenu) {
            document.addEventListener("keydown", handleEscKey);
        }
        // 컴포넌트 언마운트 또는 deps 변경 시 이벤트 리스너 제거
        return ()=>{
            document.removeEventListener("keydown", handleEscKey);
        };
    }, [
        showContextMenu
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (initialTitle !== title || initialContent !== content) {
            setHasUnsavedChanges(true);
        } else {
            setHasUnsavedChanges(false);
        }
    }, [
        title,
        content,
        initialTitle,
        initialContent
    ]);
    // 자동 저장 설정
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (autoSaveIntervalRef.current) {
            clearInterval(autoSaveIntervalRef.current);
        }
        // 편집 모드일 때는 임시 저장 대신 원본 파일 업데이트 실행
        const initialDelay = setTimeout(()=>{
            if (title.trim() && content.trim() && !isSubmitting) {
                if (isEditMode && originalSlug) {
                    autoUpdateOriginal();
                } else {
                    autoSaveDraft();
                }
            }
            autoSaveIntervalRef.current = setInterval(()=>{
                if (title.trim() && content.trim() && !isSubmitting) {
                    if (isEditMode && originalSlug) {
                        autoUpdateOriginal();
                    } else {
                        autoSaveDraft();
                    }
                }
            }, 3000); // 15초마다 자동저장
        }, 5000); // 초기 5초 후 시작
        return ()=>{
            clearTimeout(initialDelay);
            if (autoSaveIntervalRef.current) {
                clearInterval(autoSaveIntervalRef.current);
            }
        };
    }, [
        title,
        content,
        isEditMode,
        originalSlug,
        isSubmitting
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handleBeforeUnload = (e)=>{
            if (hasUnsavedChanges) {
                const message = "저장되지 않은 변경사항이 있습니다. 정말 페이지를 나가시겠습니까?";
                e.returnValue = message;
                return message;
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        const handleRouteChange = (url)=>{
            if (hasUnsavedChanges && !confirm("저장되지 않은 변경사항이 있습니다. 정말 페이지를 나가시겠습니까?")) {
                router.events.emit("routeChangeError");
                throw "Route change aborted";
            }
        };
        router.events.on("routeChangeStart", handleRouteChange);
        return ()=>{
            window.removeEventListener("beforeunload", handleBeforeUnload);
            router.events.off("routeChangeStart", handleRouteChange);
        };
    }, [
        hasUnsavedChanges,
        router
    ]);
    // 원본 파일 자동 업데이트
    const autoUpdateOriginal = async ()=>{
        if (!title.trim() || !content.trim() || isSubmitting || !isEditMode || !originalSlug) return;
        try {
            setIsUpdatingOriginal(true);
            const response = await fetch(`http://localhost:3001/api/update-post?slug=${originalSlug}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    slug: originalSlug,
                    title,
                    content,
                    category,
                    description,
                    coverImage,
                    tags
                })
            });
            if (!response.ok) {
                throw new Error("포스트 업데이트에 실패했습니다");
            }
            setLastSaved(new Date());
            setHasUnsavedChanges(false);
        } catch (err) {
            console.error("포스트 업데이트 오류:", err);
        // 중요한 에러는 사용자에게 알림, 자동 저장 실패는 조용히 로깅만
        } finally{
            setIsUpdatingOriginal(false);
        }
    };
    // 임시 저장 (자동)
    const autoSaveDraft = async ()=>{
        // 편집 모드일 때는 임시저장 하지 않음
        if (isEditMode || !title.trim() || !content.trim() || isSubmitting) return;
        try {
            setIsAutoSaving(true);
            const currentPostId = postIdRef.current || (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__/* .generateHashId */ .X)();
            const response = await fetch("/api/temp-save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: currentPostId,
                    title,
                    content,
                    category,
                    description,
                    coverImage,
                    tags,
                    date: new Date().toISOString()
                })
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
        } finally{
            setIsAutoSaving(false);
        }
    };
    const handleSaveDraft = async ()=>{
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
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        slug: originalSlug,
                        title,
                        content,
                        category,
                        description,
                        coverImage,
                        tags
                    })
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
                const currentPostId = postIdRef.current || (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__/* .generateHashId */ .X)();
                const response = await fetch("/api/temp-save", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: currentPostId,
                        title,
                        content,
                        category,
                        description,
                        coverImage,
                        tags,
                        date: new Date().toISOString()
                    })
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
    const handleSelectTempPost = (id)=>{
        console.log("임시저장 포스트 선택:", id);
        router.push(`/admin/create?tempId=${id}`);
    };
    const wrapTextWithHtml = (tag, className)=>{
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
            setTimeout(()=>{
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
            setTimeout(()=>{
                textarea.focus();
                const hrefPos = beforeLine.length + `<${tag} href="`.length;
                textarea.setSelectionRange(hrefPos, hrefPos);
            }, 0);
        }
        setShowContextMenu(false);
    };
    const handleLink = ()=>{
        wrapTextWithHtml("a", "post_hyper_link");
    };
    const handleBox = ()=>{
        wrapTextWithHtml("div", "post_box");
    };
    const handleTextSelection = (e)=>{
        if (!textareaRef.current) return;
        const textarea = textareaRef.current;
        const selection = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
        if (selection && selection.length > 0) {
            setSelectedLineText(selection);
            let x = 0, y = 0;
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
            setMenuPosition({
                x,
                y
            });
            setShowContextMenu(true);
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const textarea = textareaRef.current;
        if (!textarea) return;
        const handleSelectionChange = ()=>{
            if (document.activeElement === textarea && textarea.selectionStart !== textarea.selectionEnd && !showContextMenu) {
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
                    setMenuPosition({
                        x: adjustedX,
                        y
                    });
                    setShowContextMenu(true);
                }
            }
        };
        textarea.addEventListener("keyup", handleSelectionChange);
        textarea.addEventListener("mouseup", (e)=>{
            if (textarea.selectionStart !== textarea.selectionEnd) {
                handleTextSelection(e);
            }
        });
        return ()=>{
            textarea.removeEventListener("keyup", handleSelectionChange);
            textarea.removeEventListener("mouseup", handleTextSelection);
        };
    }, [
        textareaRef.current,
        showContextMenu
    ]);
    const handleDoubleClick = (e)=>{
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
    const scrollToText = (text)=>{
        const container = previewContainerRef.current;
        if (container) {
            const paragraphs = container.querySelectorAll("*");
            if (paragraphs.length > 0) {
                for(let i = 0; i < paragraphs.length; i++){
                    console.log(paragraphs[i].textContent);
                    if (paragraphs[i].textContent?.includes(text)) {
                        const rect = paragraphs[i].getBoundingClientRect();
                        const containerRect = container.getBoundingClientRect();
                        const scrollTop = rect.top - containerRect.top + container.scrollTop - 200;
                        container.scrollTo({
                            top: scrollTop,
                            behavior: "smooth"
                        });
                        break;
                    }
                }
            }
        }
    };
    const handleCursorPosition = (e)=>{
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
    const handleHeaderTwo = ()=>{
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
        setTimeout(()=>{
            textarea.focus();
            const newCursorPos = startOfLine + newLineText.length;
            textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    };
    const handleHeaderThree = ()=>{
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
        setTimeout(()=>{
            textarea.focus();
            const newCursorPos = startOfLine + newLineText.length;
            textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    };
    const handleBold = ()=>{
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
            setTimeout(()=>{
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
    const handleUnderline = ()=>{
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
            setTimeout(()=>{
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
    const handleGenerateImage = async ()=>{
        try {
            setError("");
            setIsUploading(true);
            const response = await fetch("http://localhost:3001/api/gpt/generate-image", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: selectedLineText
                })
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
        } finally{
            setIsUploading(false);
        }
    };
    const handleGenerateDetail = async ()=>{
        try {
            setError("");
            setIsUploading(true);
            const response = await fetch("http://localhost:3001/api/gpt/generate-detail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    index: selectedLineText
                })
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
        } finally{
            setIsUploading(false);
        }
    };
    function removeHyphens(str) {
        str = str.replace(/-/g, "");
        str = str.replace(/#/g, "");
        str = str.trim();
        return str;
    }
    const handlePaste = async (e)=>{
        const clipboardData = e.clipboardData;
        const items = clipboardData.items;
        for(let i = 0; i < items.length; i++){
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
    const uploadImage = async (file)=>{
        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append("image", file);
            const encodedTitle = encodeURIComponent(title || "untitled");
            const uploadUrl = `http://localhost:3001/api/upload-image?postTitle=${encodedTitle}`;
            const response = await fetch(uploadUrl, {
                method: "POST",
                body: formData
            });
            if (!response.ok) {
                throw new Error("이미지 업로드 실패");
            }
            const result = await response.json();
            return result.imageUrl;
        } catch (err) {
            console.error("이미지 업로드 오류:", err);
            throw err;
        } finally{
            setIsUploading(false);
        }
    };
    const insertImageToEditor = (imageUrl)=>{
        if (!textareaRef.current) return;
        const textarea = textareaRef.current;
        const endPos = textarea.selectionEnd;
        const beforeText = textarea.value.substring(0, endPos);
        const afterText = textarea.value.substring(endPos);
        const imageMarkdown = `![이미지](${imageUrl})`;
        const newContent = beforeText + imageMarkdown + afterText;
        setContent(newContent);
        setTimeout(()=>{
            textarea.focus();
            const newCursorPos = endPos + imageMarkdown.length;
            textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    };
    const handleFileUpload = async (e)=>{
        const files = e.target.files;
        if (!files || files.length === 0) return;
        try {
            const imageUrl = await uploadImage(files[0]);
            insertImageToEditor(imageUrl);
        } catch (err) {
            setError("이미지 업로드 중 오류가 발생했습니다.");
        } finally{
            e.target.value = "";
        }
    };
    const handleSubmitForm = async ()=>{
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
                tags
            });
        } catch (err) {
            console.error("폼 제출 오류:", err);
            setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
        }
    };
    const onClickCreateIndex = async ()=>{
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
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text: title
                })
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
        } finally{
            setIsGeneratingIndex(false);
        }
    };
    const handleContextMenuClick = (e)=>{
        e.stopPropagation();
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: cx("container"),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: cx("editor_header_bar"),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: cx("editor_header_left"),
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                            href: "/admin",
                            className: cx("logo"),
                            children: "돈되는 새싹"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: cx("editor_toolbar"),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                type: "file",
                                id: "image-upload",
                                accept: "image/*",
                                style: {
                                    display: "none"
                                },
                                onChange: handleFileUpload
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                htmlFor: "image-upload",
                                className: cx("toolbar_btn"),
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    className: cx("toolbar_icon", "image"),
                                    children: "\uD83D\uDCF7 이미지 업로드"
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: cx("editor_header_right"),
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                            className: cx("header_action_btn"),
                            children: [
                                "기본 모드",
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    className: cx("dropdown_arrow"),
                                    children: "▾"
                                })
                            ]
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: cx("editor_container"),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: cx("editor_header"),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: cx("category_select_container"),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("select", {
                                        value: category,
                                        onChange: (e)=>setCategory(e.target.value),
                                        className: cx("category_select"),
                                        disabled: isSubmitting,
                                        children: categoryList.map((cat)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                value: cat,
                                                children: _lib_constants__WEBPACK_IMPORTED_MODULE_5__/* .CATEGORY */ .En[cat]
                                            }, cat))
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: cx("select_arrow")
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                type: "text",
                                value: title,
                                onChange: (e)=>setTitle(e.target.value),
                                className: cx("title_input"),
                                placeholder: "제목을 입력하세요",
                                disabled: isSubmitting
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                type: "button",
                                onClick: onClickCreateIndex,
                                disabled: isGeneratingIndex || isSubmitting || !title.trim(),
                                className: cx("index_btn"),
                                children: isGeneratingIndex ? "목차 생성 중..." : "목차 생성"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: cx("editor_content_container"),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: cx("editor_body"),
                                ref: editorContainerRef,
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                                        ref: textareaRef,
                                        className: cx("content_editor", {
                                            uploading: isUploading
                                        }),
                                        value: content,
                                        onClick: handleCursorPosition,
                                        onChange: (e)=>setContent(e.target.value),
                                        placeholder: "내용을 입력하세요...",
                                        disabled: isSubmitting,
                                        onDoubleClick: handleDoubleClick,
                                        onPaste: handlePaste
                                    }),
                                    isUploading && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: cx("upload_overlay"),
                                        children: "GPT 응답 대기 중..."
                                    }),
                                    showContextMenu && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        ref: contextMenuRef,
                                        className: cx("context_menu"),
                                        style: {
                                            position: "fixed",
                                            left: `${menuPosition.x + 20}px`,
                                            top: `${menuPosition.y}px`,
                                            zIndex: 1000
                                        },
                                        onClick: handleContextMenuClick,
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: cx("context_top_menu"),
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                        type: "button",
                                                        className: cx("context_top_menu_item"),
                                                        onClick: handleHeaderTwo,
                                                        children: "h2"
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                        type: "button",
                                                        className: cx("context_top_menu_item"),
                                                        onClick: handleHeaderThree,
                                                        children: "h3"
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                        type: "button",
                                                        className: cx("context_top_menu_item"),
                                                        onClick: handleBold,
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("b", {
                                                            children: "B"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                        type: "button",
                                                        className: cx("context_top_menu_item"),
                                                        onClick: handleUnderline,
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("u", {
                                                            children: "U"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                        type: "button",
                                                        className: cx("context_top_menu_item"),
                                                        onClick: handleLink,
                                                        children: "L"
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                        type: "button",
                                                        className: cx("context_top_menu_item"),
                                                        onClick: handleBox,
                                                        children: "ㅁ"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                className: cx("context_menu_item"),
                                                onClick: handleGenerateDetail,
                                                children: "상세 내용 작성"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                className: cx("context_menu_item"),
                                                onClick: handleGenerateImage,
                                                children: "이미지 생성"
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: cx("preview_container"),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: cx("preview_header"),
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                            children: "미리보기"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: cx("post_content"),
                                        ref: previewContainerRef,
                                        dangerouslySetInnerHTML: {
                                            __html: htmlContent
                                        }
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: cx("editor_footer"),
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: cx("editor_tools"),
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: cx("tool_buttons"),
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            className: cx("tool_btn"),
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    className: cx("tool_icon"),
                                                    children: "\uD83D\uDD0D"
                                                }),
                                                " 맞춤법 검사"
                                            ]
                                        }),
                                        lastSaved && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: cx("last_saved"),
                                            children: [
                                                "마지막 저장: ",
                                                lastSaved.toLocaleTimeString()
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: cx("action_buttons"),
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                            className: cx("draft_btn"),
                                            onClick: handleSaveDraft,
                                            disabled: isSubmitting || isAutoSaving || isUpdatingOriginal || !title.trim() || !content.trim(),
                                            children: isAutoSaving || isUpdatingOriginal ? "저장 중..." : isEditMode ? "변경사항 저장" : postIdRef.current ? "임시저장 업데이트" : "임시저장"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                            className: cx("publish_btn"),
                                            onClick: handleSubmitForm,
                                            disabled: isSubmitting || isUploading,
                                            "aria-busy": isSubmitting,
                                            children: isSubmitting ? "저장 중..." : submitButtonText
                                        })
                                    ]
                                })
                            ]
                        })
                    }),
                    error && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: cx("error_toast"),
                        children: error
                    })
                ]
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7735:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ useAdminAuth)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);


/**
 * Custom hook to handle admin page authorization
 * Restricts access to admin pages in production mode
 * @returns An object containing authorization status
 */ function useAdminAuth() {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    const [isAuthorized, setIsAuthorized] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        // In development mode, allow access
        // In production mode, redirect to home
        if (true) {
            router.replace("/");
        } else {}
        setIsLoading(false);
    }, [
        router
    ]);
    return {
        isAuthorized,
        isLoading
    };
}


/***/ }),

/***/ 8728:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "X": () => (/* binding */ generateHashId)
/* harmony export */ });
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6113);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);

// 고유 해시 ID 생성 함수
function generateHashId() {
    const timestamp = new Date().getTime().toString();
    const randomStr = Math.random().toString();
    const data = timestamp + randomStr;
    return crypto__WEBPACK_IMPORTED_MODULE_0___default().createHash("md5").update(data).digest("hex");
} // 기타 유틸리티 함수들...


/***/ })

};
;