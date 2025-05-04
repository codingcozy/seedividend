(() => {
var exports = {};
exports.id = 539;
exports.ids = [539,620];
exports.modules = {

/***/ 5061:
/***/ ((module) => {

// Exports
module.exports = {
	"container": "create_container__JEzV6",
	"editor_header_bar": "create_editor_header_bar__CRK0s",
	"editor_header_left": "create_editor_header_left__bFuZJ",
	"logo": "create_logo__pAiLE",
	"editor_toolbar": "create_editor_toolbar__LP8M7",
	"toolbar_btn": "create_toolbar_btn__4XlLO",
	"toolbar_icon": "create_toolbar_icon__UQvjX",
	"bold": "create_bold__pvlxn",
	"italic": "create_italic__PwtVA",
	"underline": "create_underline__s1Mh_",
	"strikethrough": "create_strikethrough__1tNic",
	"toolbar_divider": "create_toolbar_divider__7VmtW",
	"toolbar_btn_group": "create_toolbar_btn_group__IObQ4",
	"dropdown_arrow": "create_dropdown_arrow__xRr_B",
	"editor_header_right": "create_editor_header_right__oag3p",
	"header_action_btn": "create_header_action_btn__9WbmI",
	"editor_container": "create_editor_container__5xk_B",
	"editor_header": "create_editor_header__MB7ON",
	"top_actions": "create_top_actions__c1jjm",
	"back_btn": "create_back_btn__rezqk",
	"page_title": "create_page_title__xL81i",
	"category_select_container": "create_category_select_container___BB8k",
	"category_select": "create_category_select__CHtVY",
	"select_arrow": "create_select_arrow__LkC1j",
	"title_input": "create_title_input__7Jnyt",
	"editor_body": "create_editor_body__4_ti9",
	"content_editor": "create_content_editor__ncrX6",
	"drag-over": "create_drag-over__lDUZF",
	"uploading": "create_uploading__5B5sy",
	"editor_footer": "create_editor_footer__Wy1cp",
	"tag_input_container": "create_tag_input_container__YSKld",
	"tag_input": "create_tag_input__GCuqe",
	"editor_tools": "create_editor_tools__XAO8G",
	"tool_buttons": "create_tool_buttons__yrYi6",
	"tool_btn": "create_tool_btn__JdIkQ",
	"tool_icon": "create_tool_icon__pnSX8",
	"action_buttons": "create_action_buttons__Nm_bJ",
	"draft_btn": "create_draft_btn__t8tmV",
	"publish_btn": "create_publish_btn__ft1Tp",
	"error_toast": "create_error_toast__glYuA",
	"fadeIn": "create_fadeIn__zGanf",
	"toolbar": "create_toolbar__ybjeH"
};


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

/***/ 396:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreatePost),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4011);
/* harmony import */ var _create_module_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5061);
/* harmony import */ var _create_module_scss__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_create_module_scss__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3284);
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames_bind__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_CustomHead__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2862);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _hooks_useAdminAuth__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7735);









const cx = classnames_bind__WEBPACK_IMPORTED_MODULE_4___default().bind((_create_module_scss__WEBPACK_IMPORTED_MODULE_8___default()));
function CreatePost({ categoryList  }) {
    // Use the admin auth hook
    const { isAuthorized , isLoading  } = (0,_hooks_useAdminAuth__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z)();
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    const [title, setTitle] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("");
    const [content, setContent] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("");
    const editorRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    const [category, setCategory] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(categoryList[0] || "");
    const [description, setDescription] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("");
    const [coverImage, setCoverImage] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("");
    const [tags, setTags] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("");
    const [isSubmitting, setIsSubmitting] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("");
    const [isUploading, setIsUploading] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    // 에디터 높이를 동적으로 조정하는 효과
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        const handleResize = ()=>{
            const headerHeight = document.querySelector(`.${cx("editor_header")}`)?.clientHeight || 0;
            const footerHeight = document.querySelector(`.${cx("editor_footer")}`)?.clientHeight || 0;
            const windowHeight = window.innerHeight;
            const editor = document.querySelector(`.${cx("editor_body")}`);
            if (editor) {
                const availableHeight = windowHeight - headerHeight - footerHeight - 120;
                editor.style.height = `${availableHeight}px`;
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return ()=>window.removeEventListener("resize", handleResize);
    }, []);
    // 에디터 초기화
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (editorRef.current) {
            // 에디터 포커스시 기본 p 태그 추가
            editorRef.current.addEventListener("focus", ()=>{
                if (editorRef.current && editorRef.current.innerHTML === "") {
                    editorRef.current.innerHTML = "<p><br></p>";
                }
            });
            // 콘텐츠 변경 감지
            editorRef.current.addEventListener("input", ()=>{
                if (editorRef.current) {
                    setContent(editorRef.current.innerHTML);
                }
            });
        }
    }, []);
    // 이미지 업로드 함수
    const uploadImage = async (file)=>{
        setIsUploading(true);
        try {
            // FormData 생성
            const formData = new FormData();
            formData.append("image", file);
            // 이미지 업로드 API 호출 (실제 API로 변경 필요)
            // 실제 구현에서는 이 부분을 서버에 맞게 수정하세요
            const response = await fetch("http://localhost:3001/api/upload-image", {
                method: "POST",
                body: formData
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
        } finally{
            setIsUploading(false);
        }
    };
    // 이미지 드래그 앤 드롭 처리
    const handleDragOver = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        if (editorRef.current) {
            editorRef.current.classList.add(cx("drag-over"));
        }
    };
    const handleDragLeave = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        if (editorRef.current) {
            editorRef.current.classList.remove(cx("drag-over"));
        }
    };
    const handleDrop = async (e)=>{
        e.preventDefault();
        e.stopPropagation();
        if (editorRef.current) {
            editorRef.current.classList.remove(cx("drag-over"));
            const files = Array.from(e.dataTransfer.files);
            const imageFiles = files.filter((file)=>file.type.startsWith("image/"));
            if (imageFiles.length === 0) return;
            for (const imageFile of imageFiles){
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
    const handlePaste = async (e)=>{
        const items = e.clipboardData.items;
        for(let i = 0; i < items.length; i++){
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
    const insertImageToEditor = (imageUrl)=>{
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
    const handleSubmit = async ()=>{
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
            const slug = title.toLowerCase().replace(/[^a-zA-Z0-9가-힣\s]/gi, "") // 영문, 숫자, 한글, 공백만 허용
            .replace(/\s+/g, "-");
            const postData = {
                title,
                content,
                category,
                description,
                coverImage,
                slug,
                tags: tags.split(" ").filter((tag)=>tag.startsWith("#")),
                date: new Date().toISOString()
            };
            console.log(postData);
            const response = await fetch("http://localhost:3001/api/create-post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(postData)
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
        } finally{
            setIsSubmitting(false);
        }
    };
    // 에디터 도구 버튼 핸들러
    const handleBold = ()=>{
        document.execCommand("bold", false);
        if (editorRef.current) setContent(editorRef.current.innerHTML);
    };
    const handleItalic = ()=>{
        document.execCommand("italic", false);
        if (editorRef.current) setContent(editorRef.current.innerHTML);
    };
    const handleUnderline = ()=>{
        document.execCommand("underline", false);
        if (editorRef.current) setContent(editorRef.current.innerHTML);
    };
    const handleHeading = ()=>{
        document.execCommand("formatBlock", false, "<h2>");
        if (editorRef.current) setContent(editorRef.current.innerHTML);
    };
    const handleParagraph = ()=>{
        document.execCommand("formatBlock", false, "<p>");
        if (editorRef.current) setContent(editorRef.current.innerHTML);
    };
    const handleStrikethrough = ()=>{
        document.execCommand("strikethrough", false);
        if (editorRef.current) setContent(editorRef.current.innerHTML);
    };
    const handleAlign = (align)=>{
        document.execCommand(`justify${align}`, false);
        if (editorRef.current) setContent(editorRef.current.innerHTML);
    };
    // Show loading or unauthorized message
    if (isLoading) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            children: "Loading..."
        });
    }
    if (!isAuthorized) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            children: "Unauthorized access"
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_CustomHead__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                type: "home"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: cx("container"),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: cx("editor_header_bar"),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: cx("editor_header_left"),
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_6___default()), {
                                    href: "/admin",
                                    className: cx("logo"),
                                    children: "SeedDividend"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: cx("editor_toolbar"),
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        type: "button",
                                        className: cx("toolbar_btn"),
                                        onClick: ()=>{},
                                        title: "본문2",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                children: "본문2"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: cx("dropdown_arrow"),
                                                children: "▾"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: cx("toolbar_divider")
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        type: "button",
                                        className: cx("toolbar_btn"),
                                        onClick: handleBold,
                                        title: "굵게",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: cx("toolbar_icon", "bold"),
                                            children: "B"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        type: "button",
                                        className: cx("toolbar_btn"),
                                        onClick: handleItalic,
                                        title: "기울임",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: cx("toolbar_icon", "italic"),
                                            children: "I"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        type: "button",
                                        className: cx("toolbar_btn"),
                                        onClick: handleUnderline,
                                        title: "밑줄",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: cx("toolbar_icon", "underline"),
                                            children: "U"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        type: "button",
                                        className: cx("toolbar_btn"),
                                        onClick: handleStrikethrough,
                                        title: "취소선",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: cx("toolbar_icon", "strikethrough"),
                                            children: "T"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: cx("toolbar_divider")
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: cx("toolbar_btn_group"),
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                type: "button",
                                                className: cx("toolbar_btn"),
                                                onClick: ()=>handleAlign("Left"),
                                                title: "왼쪽 정렬",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    className: cx("toolbar_icon", "align-left"),
                                                    children: "≡"
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                type: "button",
                                                className: cx("toolbar_btn"),
                                                onClick: ()=>handleAlign("Center"),
                                                title: "가운데 정렬",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    className: cx("toolbar_icon", "align-center"),
                                                    children: "≡"
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                type: "button",
                                                className: cx("toolbar_btn"),
                                                onClick: ()=>handleAlign("Right"),
                                                title: "오른쪽 정렬",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    className: cx("toolbar_icon", "align-right"),
                                                    children: "≡"
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: cx("toolbar_divider")
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        type: "button",
                                        className: cx("toolbar_btn"),
                                        title: "인용구",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: cx("toolbar_icon", "quote"),
                                            children: "❞"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        type: "button",
                                        className: cx("toolbar_btn"),
                                        title: "링크",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: cx("toolbar_icon", "link"),
                                            children: "\uD83D\uDD17"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        type: "button",
                                        className: cx("toolbar_btn"),
                                        title: "이미지",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: cx("toolbar_icon", "image"),
                                            children: "\uD83D\uDCF7"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: cx("toolbar_divider")
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        type: "button",
                                        className: cx("toolbar_btn"),
                                        title: "목록",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: cx("toolbar_icon", "list"),
                                                children: "•"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: cx("dropdown_arrow"),
                                                children: "▾"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        type: "button",
                                        className: cx("toolbar_btn"),
                                        title: "구분선",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: cx("toolbar_icon", "horizontal-rule"),
                                            children: "—"
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
                                                        children: cat
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
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: cx("editor_body"),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        ref: editorRef,
                                        className: cx("content_editor", {
                                            uploading: isUploading
                                        }),
                                        contentEditable: true,
                                        onDragOver: handleDragOver,
                                        onDragLeave: handleDragLeave,
                                        onDrop: handleDrop,
                                        onPaste: handlePaste,
                                        placeholder: "내용을 입력하세요...",
                                        suppressContentEditableWarning: true
                                    }),
                                    isUploading && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: cx("upload_overlay"),
                                        children: "이미지 업로드 중..."
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: cx("editor_footer"),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: cx("tag_input_container"),
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                            type: "text",
                                            value: tags,
                                            onChange: (e)=>setTags(e.target.value),
                                            className: cx("tag_input"),
                                            placeholder: "#태그입력",
                                            disabled: isSubmitting
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
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
                                                                children: "\uD83D\uDCC4"
                                                            }),
                                                            " 미리보기"
                                                        ]
                                                    }),
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
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                        className: cx("tool_btn"),
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                className: cx("tool_icon"),
                                                                children: "\uD83D\uDCCE"
                                                            }),
                                                            " 글꼴열기"
                                                        ]
                                                    })
                                                ]
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
                                                        onClick: handleSubmit,
                                                        disabled: isSubmitting || isUploading,
                                                        children: isSubmitting ? "저장 중..." : "완료"
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }),
                            error && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: cx("error_toast"),
                                children: error
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
async function getStaticProps() {
    const categoryList = await (0,_lib_api__WEBPACK_IMPORTED_MODULE_3__/* .getPostCategories */ .wx)();
    return {
        props: {
            categoryList
        }
    };
}


/***/ }),

/***/ 3284:
/***/ ((module) => {

"use strict";
module.exports = require("classnames/bind");

/***/ }),

/***/ 3059:
/***/ ((module) => {

"use strict";
module.exports = require("globby");

/***/ }),

/***/ 8076:
/***/ ((module) => {

"use strict";
module.exports = require("gray-matter");

/***/ }),

/***/ 2245:
/***/ ((module) => {

"use strict";
module.exports = require("moment");

/***/ }),

/***/ 3918:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/amp-context.js");

/***/ }),

/***/ 5732:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/amp-mode.js");

/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4486:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-blur-svg.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 9552:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-loader");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 1109:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-local-url.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 7782:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-href.js");

/***/ }),

/***/ 2470:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/side-effect.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 618:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils/warn-once.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 7147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 1017:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [898,636,730,61,688], () => (__webpack_exec__(396)));
module.exports = __webpack_exports__;

})();