(() => {
var exports = {};
exports.id = 964;
exports.ids = [964,620];
exports.modules = {

/***/ 7512:
/***/ ((module) => {

// Exports
module.exports = {
	"modal-overlay": "Modal_modal-overlay__bs7XG",
	"modal": "Modal_modal__2Aj4i",
	"modal-header": "Modal_modal-header__qukIe"
};


/***/ }),

/***/ 7475:
/***/ ((module) => {

// Exports
module.exports = {
	"post_content": "admin_post_content__ft_Pe",
	"container": "admin_container__sDpJg",
	"-list": "admin_-list__X_bjD",
	"inner": "admin_inner__jN_HH",
	"project_list": "admin_project_list__OuNd9",
	"ifram_wrap": "admin_ifram_wrap__aU42G",
	"iframe": "admin_iframe__NLBq7",
	"meta": "admin_meta__L_vxo",
	"date": "admin_date__la_NA",
	"post_meta": "admin_post_meta__U_4y9",
	"post_category": "admin_post_category__QaYM3",
	"separator": "admin_separator__vyCi5",
	"profile_wrap": "admin_profile_wrap__EVWVv",
	"profile_image_wrap": "admin_profile_image_wrap__XAo1n",
	"textarea": "admin_textarea__bh9P0",
	"info": "admin_info__2trzw",
	"reading_time": "admin_reading_time__Xpbe3",
	"post_title": "admin_post_title__J_A2i",
	"tag_area": "admin_tag_area__FvAZM",
	"tag": "admin_tag__9Px2L",
	"view_badge": "admin_view_badge__utAag",
	"post_list_header": "admin_post_list_header__Q_fWD",
	"post_list": "admin_post_list__djSuc",
	"post_item": "admin_post_item__pwAj9",
	"checkbox_cell": "admin_checkbox_cell__HiARW",
	"title_cell": "admin_title_cell___XYsg",
	"title_link": "admin_title_link__DA8PM",
	"actions_cell": "admin_actions_cell__4oldf",
	"action_btn": "admin_action_btn__TA3_2",
	"edit": "admin_edit__euMYR",
	"delete": "admin_delete__r3NKS",
	"view": "admin_view__M5heO",
	"share": "admin_share__guXKz",
	"admin_actions": "admin_admin_actions__yn899",
	"create_btn": "admin_create_btn__R59bD",
	"bulk_delete_btn": "admin_bulk_delete_btn__B0TwG",
	"no_posts": "admin_no_posts__UxSux",
	"admin_header": "admin_admin_header__yDNef",
	"admin_title": "admin_admin_title__SejFK",
	"back_btn": "admin_back_btn__gQ1ni",
	"create_form_container": "admin_create_form_container__NpHZ8",
	"post_form": "admin_post_form__eFezp",
	"form_group": "admin_form_group__MYnWL",
	"form_label": "admin_form_label__gd9oB",
	"form_input": "admin_form_input__K3kki",
	"form_select": "admin_form_select__X7DDt",
	"form_textarea": "admin_form_textarea__6i55x",
	"form_actions": "admin_form_actions__JHbQA",
	"cancel_btn": "admin_cancel_btn__y2MwJ",
	"submit_btn": "admin_submit_btn__weIP_",
	"error_message": "admin_error_message__2Gg_u",
	"publish_btn": "admin_publish_btn__0ypl_",
	"loading_spinner": "admin_loading_spinner__wrQY4",
	"spinner": "admin_spinner__BqN3h",
	"spin": "admin_spin__UgVYr",
	"temp_post_list": "admin_temp_post_list__yqAln",
	"temp_post_guide": "admin_temp_post_guide__A1IGR",
	"temp_post_wrap": "admin_temp_post_wrap__7bK0z",
	"temp_post_item": "admin_temp_post_item__YWkFy",
	"temp_post_content": "admin_temp_post_content__owSRn",
	"temp_post_title": "admin_temp_post_title__ozHfg",
	"temp_post_date": "admin_temp_post_date___qvTO",
	"temp_post_preview": "admin_temp_post_preview__laeKm",
	"temp_delete_btn": "admin_temp_delete_btn__rZ658",
	"temp_action_buttons": "admin_temp_action_buttons__ThGFy",
	"delete_all_btn": "admin_delete_all_btn__IITVt",
	"new_post_btn": "admin_new_post_btn__oU8XU",
	"no_temp_posts": "admin_no_temp_posts__bDfQr"
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

/***/ 9108:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Post),
  "getStaticProps": () => (/* binding */ getStaticProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./lib/api.ts
var api = __webpack_require__(4011);
// EXTERNAL MODULE: ./components/Header/index.tsx
var Header = __webpack_require__(6853);
// EXTERNAL MODULE: ./pages/admin/admin.module.scss
var admin_module = __webpack_require__(7475);
var admin_module_default = /*#__PURE__*/__webpack_require__.n(admin_module);
// EXTERNAL MODULE: external "classnames/bind"
var bind_ = __webpack_require__(3284);
var bind_default = /*#__PURE__*/__webpack_require__.n(bind_);
// EXTERNAL MODULE: ./components/CustomHead/index.tsx
var CustomHead = __webpack_require__(2862);
// EXTERNAL MODULE: ./lib/constants.ts
var constants = __webpack_require__(4696);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./hooks/useAdminAuth.ts
var useAdminAuth = __webpack_require__(7735);
// EXTERNAL MODULE: ./components/Modal.module.scss
var Modal_module = __webpack_require__(7512);
var Modal_module_default = /*#__PURE__*/__webpack_require__.n(Modal_module);
;// CONCATENATED MODULE: ./components/Modal.tsx




const cx = bind_default().bind((Modal_module_default()));
function Modal({ title , onClose , children  }) {
    const modalRef = (0,external_react_.useRef)(null);
    // ESC 키 눌렀을 때 모달 닫기
    (0,external_react_.useEffect)(()=>{
        const handleKeyDown = (event)=>{
            if (event.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return ()=>{
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [
        onClose
    ]);
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: cx("modal-overlay"),
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: cx("modal"),
            ref: modalRef,
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: cx("modal-header"),
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                            children: title
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                            onClick: onClose,
                            className: cx("close-button"),
                            children: "\xd7"
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: cx("modal-content"),
                    children: children
                })
            ]
        })
    });
}

;// CONCATENATED MODULE: ./pages/admin/index.tsx












const admin_cx = bind_default().bind((admin_module_default()));
function Post({ allPosts , categoryList  }) {
    const router = (0,router_.useRouter)();
    const title = `${constants/* SITE_NAME */.px} | Post`;
    const [selectedPosts, setSelectedPosts] = (0,external_react_.useState)([]);
    const [deletingPosts, setDeletingPosts] = (0,external_react_.useState)([]);
    const [posts, setPosts] = (0,external_react_.useState)(allPosts);
    const [isPublishing, setIsPublishing] = (0,external_react_.useState)(false);
    const [showTempModal, setShowTempModal] = (0,external_react_.useState)(false);
    const [tempPosts, setTempPosts] = (0,external_react_.useState)([]);
    const [isLoadingTemp, setIsLoadingTemp] = (0,external_react_.useState)(false);
    const [deletingTempPosts, setDeletingTempPosts] = (0,external_react_.useState)([]);
    const [isDeletingAllTemp, setIsDeletingAllTemp] = (0,external_react_.useState)(false);
    // Use the admin auth hook
    const { isAuthorized , isLoading  } = (0,useAdminAuth/* default */.Z)();
    const formatDate = (dateString)=>{
        const date = new Date(dateString);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    };
    const toggleSelectPost = (slug)=>{
        if (selectedPosts.includes(slug)) {
            setSelectedPosts(selectedPosts.filter((id)=>id !== slug));
        } else {
            setSelectedPosts([
                ...selectedPosts,
                slug
            ]);
        }
    };
    const toggleSelectAll = ()=>{
        if (selectedPosts.length === posts.length) {
            setSelectedPosts([]);
        } else {
            setSelectedPosts(posts.map((post)=>post.slug));
        }
    };
    const handleTitleClick = (slug)=>{
        router.push(`/post/${slug}/`);
    };
    const handleDeletePost = async (slug)=>{
        if (window.confirm("정말로 이 포스트를 삭제하시겠습니까?")) {
            try {
                // Add the post to the deleting state
                setDeletingPosts((prev)=>[
                        ...prev,
                        slug
                    ]);
                // Updated API endpoint
                const response = await fetch(`http://localhost:3001/api/delete-post?slug=${slug}`, {
                    method: "DELETE"
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Failed to delete post");
                }
                const result = await response.json();
                // Update the posts list after deletion
                setPosts(posts.filter((post)=>post.slug !== slug));
                // If the post was selected, remove it from selected posts
                if (selectedPosts.includes(slug)) {
                    setSelectedPosts(selectedPosts.filter((id)=>id !== slug));
                }
            } catch (error) {
                console.error("Error deleting post:", error);
                alert(`포스트 삭제 중 오류가 발생했습니다: ${error instanceof Error ? error.message : "알 수 없는 오류"}`);
            } finally{
                // Remove the post from the deleting state
                setDeletingPosts((prev)=>prev.filter((id)=>id !== slug));
            }
        }
    };
    const handleDeleteSelected = async ()=>{
        if (selectedPosts.length === 0) {
            alert("삭제할 포스트를 선택해주세요.");
            return;
        }
        if (window.confirm(`선택한 ${selectedPosts.length}개의 포스트를 삭제하시겠습니까?`)) {
            // We'll delete one by one to ensure we handle each properly
            let successCount = 0;
            let failCount = 0;
            for (const slug of selectedPosts){
                try {
                    setDeletingPosts((prev)=>[
                            ...prev,
                            slug
                        ]);
                    // Updated API endpoint
                    const response = await fetch(`http://localhost:3001/api/delete-post?slug=${slug}`, {
                        method: "DELETE"
                    });
                    if (!response.ok) {
                        throw new Error("Failed to delete post");
                    }
                    successCount++;
                    // Remove the post from the deleting state
                    setDeletingPosts((prev)=>prev.filter((id)=>id !== slug));
                } catch (error) {
                    failCount++;
                    console.error(`Error deleting post ${slug}:`, error);
                    // Remove the post from the deleting state
                    setDeletingPosts((prev)=>prev.filter((id)=>id !== slug));
                }
            }
            // Update the posts list after deletion
            setPosts(posts.filter((post)=>!selectedPosts.includes(post.slug)));
            // Clear selected posts
            setSelectedPosts([]);
            alert(`${successCount}개 포스트가 삭제되었습니다. ${failCount > 0 ? `${failCount}개 포스트 삭제 실패.` : ""}`);
        }
    };
    const handlePublish = async ()=>{
        if (window.confirm("블로그를 발행하시겠습니까?")) {
            try {
                setIsPublishing(true);
                const response = await fetch("http://localhost:3001/api/publish-post", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Failed to publish blog");
                }
                const result = await response.json();
                alert("블로그가 성공적으로 발행되었습니다.");
            } catch (error) {
                console.error("Error publishing blog:", error);
                alert(`블로그 발행 중 오류가 발생했습니다: ${error instanceof Error ? error.message : "알 수 없는 오류"}`);
            } finally{
                setIsPublishing(false);
            }
        }
    };
    const isDeleting = (slug)=>deletingPosts.includes(slug);
    // 임시저장 포스트 목록 가져오기 함수 개선
    const fetchTempPosts = async ()=>{
        try {
            const response = await fetch("/api/temp-posts");
            if (!response.ok) {
                throw new Error("임시저장 포스트 조회 실패");
            }
            const data = await response.json();
            setTempPosts(data.posts || []);
            return data.posts;
        } catch (error) {
            console.error("임시저장 포스트 목록 조회 오류:", error);
            return [];
        }
    };
    // 임시저장 포스트 선택 핸들러
    const handleSelectTempPost = (id)=>{
        router.push(`/admin/create?tempId=${id}`);
    };
    // 임시저장 포스트 삭제 핸들러
    const handleDeleteTempPost = async (e, id)=>{
        e.stopPropagation(); // 클릭 이벤트 전파 방지 - 부모 요소의 클릭 이벤트 실행 방지
        if (window.confirm("이 임시저장 포스트를 삭제하시겠습니까?")) {
            try {
                setDeletingTempPosts((prev)=>[
                        ...prev,
                        id
                    ]);
                const response = await fetch(`/api/temp-post/${id}`, {
                    method: "DELETE"
                });
                if (!response.ok) {
                    throw new Error("임시저장 포스트 삭제에 실패했습니다.");
                }
                // 성공 시 목록에서 제거
                setTempPosts((prevPosts)=>prevPosts.filter((post)=>post.id !== id));
            } catch (error) {
                console.error("임시저장 포스트 삭제 오류:", error);
                alert("임시저장 포스트를 삭제하는 중 오류가 발생했습니다.");
            } finally{
                setDeletingTempPosts((prev)=>prev.filter((postId)=>postId !== id));
            }
        }
    };
    // 모든 임시저장 포스트 삭제 핸들러
    const handleDeleteAllTempPosts = async ()=>{
        if (tempPosts.length === 0) {
            alert("삭제할 임시저장 포스트가 없습니다.");
            return;
        }
        if (window.confirm(`모든 임시저장 포스트(${tempPosts.length}개)를 삭제하시겠습니까?`)) {
            try {
                setIsDeletingAllTemp(true);
                const response = await fetch("/api/temp-posts/delete-all", {
                    method: "DELETE"
                });
                if (!response.ok) {
                    throw new Error("임시저장 포스트 전체 삭제에 실패했습니다.");
                }
                const result = await response.json();
                // 목록 비우기
                setTempPosts([]);
                alert(result.message || `${result.deletedCount}개의 임시저장 포스트가 삭제되었습니다.`);
            } catch (error) {
                console.error("임시저장 포스트 전체 삭제 오류:", error);
                alert("임시저장 포스트를 삭제하는 중 오류가 발생했습니다.");
            } finally{
                setIsDeletingAllTemp(false);
            }
        }
    };
    // 임시저장 포스트 삭제 중인지 확인
    const isDeleteTemp = (id)=>deletingTempPosts.includes(id);
    // 새 포스트 작성 클릭 핸들러 개선
    const handleCreateNewPost = ()=>{
        // 임시저장된 포스트가 있는지 확인 후 바로 모달 표시
        setIsLoadingTemp(true);
        console.log("Test");
        fetchTempPosts().then(()=>{
            setShowTempModal(true);
        }).catch((error)=>{
            console.error("임시저장 포스트 조회 실패:", error);
            router.push("/admin/create");
        }).finally(()=>{
            setIsLoadingTemp(false);
        });
    };
    // Show loading or unauthorized message
    if (isLoading) {
        return /*#__PURE__*/ jsx_runtime_.jsx("div", {
            children: "Loading..."
        });
    }
    if (!isAuthorized) {
        return /*#__PURE__*/ jsx_runtime_.jsx("div", {
            children: "Unauthorized access"
        });
    }
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: router.isFallback ? " Loading…" : /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(CustomHead/* default */.Z, {
                    type: "home"
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: admin_cx("container", "-list"),
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(Header/* default */.Z, {
                            postList: posts,
                            categoryList: categoryList
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: admin_cx("inner"),
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: admin_cx("admin_actions"),
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                            onClick: handlePublish,
                                            className: admin_cx("publish_btn"),
                                            disabled: isPublishing,
                                            children: isPublishing ? "발행 중..." : "발행"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                            onClick: handleCreateNewPost,
                                            className: admin_cx("create_btn"),
                                            children: "새 포스트 작성"
                                        }),
                                        selectedPosts.length > 0 && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                                            className: admin_cx("bulk_delete_btn"),
                                            onClick: handleDeleteSelected,
                                            disabled: deletingPosts.length > 0,
                                            children: [
                                                "선택한 포스트 삭제 (",
                                                selectedPosts.length,
                                                ")"
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: admin_cx("post_list_header"),
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: admin_cx("checkbox_cell"),
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                type: "checkbox",
                                                checked: selectedPosts.length === posts.length && posts.length > 0,
                                                onChange: toggleSelectAll
                                            })
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: admin_cx("title_cell"),
                                            children: "제목"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: admin_cx("actions_cell"),
                                            children: "작업"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: admin_cx("post_list"),
                                    children: posts.map((post)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: admin_cx("post_item"),
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: admin_cx("checkbox_cell"),
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                        type: "checkbox",
                                                        checked: selectedPosts.includes(post.slug),
                                                        onChange: ()=>toggleSelectPost(post.slug),
                                                        disabled: isDeleting(post.slug)
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: admin_cx("title_cell"),
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                            href: `/post/${post.slug}`,
                                                            className: admin_cx("title_link"),
                                                            children: post.title
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                            className: admin_cx("post_meta"),
                                                            children: [
                                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                    className: admin_cx("post_category"),
                                                                    children: constants/* CATEGORY */.En[post.category]
                                                                }),
                                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                    className: admin_cx("separator"),
                                                                    children: "•"
                                                                }),
                                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                    className: admin_cx("post_date"),
                                                                    children: formatDate(post.date)
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: admin_cx("actions_cell"),
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                            className: admin_cx("action_btn", "edit"),
                                                            onClick: ()=>router.push(`/admin/edit/${post.slug}`),
                                                            disabled: isDeleting(post.slug),
                                                            children: "수정"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                            className: admin_cx("action_btn", "delete"),
                                                            onClick: ()=>handleDeletePost(post.slug),
                                                            disabled: isDeleting(post.slug),
                                                            children: isDeleting(post.slug) ? "삭제 중..." : "삭제"
                                                        })
                                                    ]
                                                })
                                            ]
                                        }, post.slug))
                                }),
                                posts.length === 0 && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: admin_cx("no_posts"),
                                    children: "포스트가 없습니다."
                                })
                            ]
                        })
                    ]
                }),
                showTempModal && /*#__PURE__*/ jsx_runtime_.jsx(Modal, {
                    onClose: ()=>setShowTempModal(false),
                    title: "임시저장된 포스트",
                    children: isLoadingTemp ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: admin_cx("loading_spinner"),
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: admin_cx("spinner")
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                children: "임시저장 포스트를 불러오는 중..."
                            })
                        ]
                    }) : tempPosts && tempPosts.length > 0 ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: admin_cx("temp_post_list"),
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: admin_cx("temp_post_guide"),
                                children: "계속해서 작성하실 임시저장 포스트를 선택하거나, 새로 작성하실 수 있습니다."
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: admin_cx("temp_post_wrap"),
                                children: tempPosts.map((post)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: admin_cx("temp_post_item"),
                                        onClick: ()=>handleSelectTempPost(post.id),
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: admin_cx("temp_post_content"),
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                                        className: admin_cx("temp_post_title"),
                                                        children: post.title
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                        className: admin_cx("temp_post_date"),
                                                        children: new Date(post.date).toLocaleString()
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                className: admin_cx("temp_delete_btn"),
                                                onClick: (e)=>handleDeleteTempPost(e, post.id),
                                                disabled: isDeleteTemp(post.id),
                                                children: isDeleteTemp(post.id) ? "삭제 중..." : "삭제"
                                            })
                                        ]
                                    }, post.id))
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: admin_cx("temp_action_buttons"),
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                        className: admin_cx("delete_all_btn"),
                                        onClick: handleDeleteAllTempPosts,
                                        disabled: isDeletingAllTemp,
                                        children: isDeletingAllTemp ? "삭제 중..." : "전체 삭제"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                        className: admin_cx("new_post_btn"),
                                        onClick: ()=>{
                                            setShowTempModal(false);
                                            router.push("/admin/create");
                                        },
                                        children: "새로 작성하기"
                                    })
                                ]
                            })
                        ]
                    }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: admin_cx("no_temp_posts"),
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                children: "임시저장된 포스트가 없습니다."
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                className: admin_cx("new_post_btn"),
                                onClick: ()=>{
                                    setShowTempModal(false);
                                    router.push("/admin/create");
                                },
                                children: "새로 작성하기"
                            })
                        ]
                    })
                })
            ]
        })
    });
}
// Switch back to getStaticProps for compatibility with static export
async function getStaticProps() {
    const allPosts = await (0,api/* getPosts */.Jq)({
        fields: [
            "title",
            "date",
            "slug",
            "author",
            "coverImage",
            "description",
            "ogImage",
            "tag",
            "readingTime",
            "category"
        ]
    });
    const categoryList = await (0,api/* getPostCategories */.wx)();
    return {
        props: {
            allPosts,
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

/***/ 1423:
/***/ ((module) => {

"use strict";
module.exports = require("path");

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

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [898,636,730,61,688], () => (__webpack_exec__(9108)));
module.exports = __webpack_exports__;

})();