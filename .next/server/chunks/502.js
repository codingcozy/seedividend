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
/* harmony import */ var _PostEditor_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8696);
/* harmony import */ var _PostEditor_module_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_PostEditor_module_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _lib_markdownToHtml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7095);
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4696);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_markdownToHtml__WEBPACK_IMPORTED_MODULE_4__]);
_lib_markdownToHtml__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];







const cx = classnames_bind__WEBPACK_IMPORTED_MODULE_3___default().bind((_PostEditor_module_scss__WEBPACK_IMPORTED_MODULE_6___default()));
function PostEditor({ initialTitle ="" , initialContent ="" , initialCategory ="" , initialDescription ="" , initialCoverImage ="" , initialTags ="" , categoryList =[] , onSubmit , submitButtonText , isSubmitting  }) {
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
    // 편집기 커서 위치로 프리뷰 스크롤 이동
    const scrollToText = (text)=>{
        const container = previewContainerRef.current;
        if (container) {
            // container 안의 모든 p 요소를 가져옴
            const paragraphs = container.querySelectorAll("*");
            if (paragraphs.length > 0) {
                // 각 p 요소에서 텍스트를 찾아 해당 위치로 스크롤 이동
                for(let i = 0; i < paragraphs.length; i++){
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
    // 편집기 클릭시 현재 라인 가져오는 함수
    const handleCursorPosition = (e)=>{
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
    const handleDoubleClick = (e)=>{
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
        setMenuPosition({
            x,
            y
        });
        setShowContextMenu(true);
    };
    // 컨텍스트 메뉴 외부 클릭 시 닫기
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handleClickOutside = (event)=>{
            if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
                setShowContextMenu(false);
            }
        };
        if (showContextMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return ()=>{
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [
        showContextMenu
    ]);
    // 이미지 생성 핸들러
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
                // 이미지 URL을 에디터에 삽입
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
    // 상세 내용 작성 핸들러
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
        } finally{
            setIsUploading(false);
        }
    };
    // 프리뷰에 없는 편집기 텍스트 제거
    function removeHyphens(str) {
        str = str.replace(/-/g, "");
        str = str.replace(/#/g, "");
        str = str.trim();
        return str;
    }
    // 클립보드 이미지 URL 처리 함수
    const handlePaste = async (e)=>{
        const clipboardData = e.clipboardData;
        const items = clipboardData.items;
        // 클립보드 데이터 중 이미지 URL 확인
        const text = clipboardData.getData("text");
        const isImageUrl = text && (text.startsWith("http://") || text.startsWith("https://")) && (text.endsWith(".png") || text.endsWith(".jpg") || text.endsWith(".jpeg") || text.endsWith(".gif"));
        // 클립보드에 이미지 파일이 있는지 확인
        for(let i = 0; i < items.length; i++){
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
    const uploadImage = async (file)=>{
        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append("image", file);
            const response = await fetch("http://localhost:3001/api/upload-image", {
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
    // 텍스트에 이미지 링크 삽입
    const insertImageToEditor = (imageUrl)=>{
        if (!textareaRef.current) return;
        const textarea = textareaRef.current;
        const endPos = textarea.selectionEnd;
        const beforeText = textarea.value.substring(0, endPos);
        const afterText = textarea.value.substring(endPos);
        const imageMarkdown = `![이미지](${imageUrl})`;
        const newContent = beforeText + imageMarkdown + afterText;
        setContent(newContent);
        // 커서 위치 조정
        setTimeout(()=>{
            textarea.focus();
            const newCursorPos = endPos + imageMarkdown.length;
            textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    };
    // 파일 업로드 처리
    const handleFileUpload = async (e)=>{
        const files = e.target.files;
        if (!files || files.length === 0) return;
        try {
            const imageUrl = await uploadImage(files[0]);
            insertImageToEditor(imageUrl);
        } catch (err) {
            setError("이미지 업로드 중 오류가 발생했습니다.");
        } finally{
            // 파일 인풋 초기화
            e.target.value = "";
        }
    };
    // 폼 제출 처리
    const handleSubmitForm = async ()=>{
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
                // 현재 콘텐츠 앞부분에 목차 추가
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
                            children: "SeedDividend"
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
                                        children: [
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
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: cx("tool_buttons"),
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        className: cx("tool_btn"),
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: cx("tool_icon"),
                                                children: "\uD83D\uDD0D"
                                            }),
                                            " 맞춤법 검사"
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: cx("action_buttons"),
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                            className: cx("draft_btn"),
                                            disabled: isSubmitting,
                                            children: "임시저장"
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


/***/ })

};
;