(() => {
var exports = {};
exports.id = 964;
exports.ids = [964,620];
exports.modules = {

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
	"publish_btn": "admin_publish_btn__0ypl_"
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

/***/ 7051:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Post),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4011);
/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6853);
/* harmony import */ var _admin_module_scss__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7475);
/* harmony import */ var _admin_module_scss__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_admin_module_scss__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3284);
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames_bind__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_CustomHead__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2862);
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4696);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _hooks_useAdminAuth__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7735);











const cx = classnames_bind__WEBPACK_IMPORTED_MODULE_4___default().bind((_admin_module_scss__WEBPACK_IMPORTED_MODULE_10___default()));
function Post({ allPosts , categoryList  }) {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    const title = `${_lib_constants__WEBPACK_IMPORTED_MODULE_6__/* .SITE_NAME */ .px} | Post`;
    const [selectedPosts, setSelectedPosts] = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)([]);
    const [deletingPosts, setDeletingPosts] = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)([]);
    const [posts, setPosts] = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(allPosts);
    const [isPublishing, setIsPublishing] = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(false);
    // Use the admin auth hook
    const { isAuthorized , isLoading  } = (0,_hooks_useAdminAuth__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z)();
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
                console.log("Delete result:", result);
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
                console.log("Publish result:", result);
            } catch (error) {
                console.error("Error publishing blog:", error);
                alert(`블로그 발행 중 오류가 발생했습니다: ${error instanceof Error ? error.message : "알 수 없는 오류"}`);
            } finally{
                setIsPublishing(false);
            }
        }
    };
    const isDeleting = (slug)=>deletingPosts.includes(slug);
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
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: router.isFallback ? " Loading…" : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_CustomHead__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                    type: "home"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: cx("container", "-list"),
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Header__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                            postList: posts,
                            categoryList: categoryList
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: cx("inner"),
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: cx("admin_actions"),
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                            onClick: handlePublish,
                                            className: cx("publish_btn"),
                                            disabled: isPublishing,
                                            children: isPublishing ? "발행 중..." : "발행"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_8___default()), {
                                            href: "/admin/create",
                                            className: cx("create_btn"),
                                            children: "새 포스트 작성"
                                        }),
                                        selectedPosts.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            className: cx("bulk_delete_btn"),
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
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: cx("post_list_header"),
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: cx("checkbox_cell"),
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                type: "checkbox",
                                                checked: selectedPosts.length === posts.length && posts.length > 0,
                                                onChange: toggleSelectAll
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: cx("title_cell"),
                                            children: "제목"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: cx("actions_cell"),
                                            children: "작업"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: cx("post_list"),
                                    children: posts.map((post)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: cx("post_item"),
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: cx("checkbox_cell"),
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                        type: "checkbox",
                                                        checked: selectedPosts.includes(post.slug),
                                                        onChange: ()=>toggleSelectPost(post.slug),
                                                        disabled: isDeleting(post.slug)
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: cx("title_cell"),
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_8___default()), {
                                                            href: `/post/${post.slug}`,
                                                            className: cx("title_link"),
                                                            children: post.title
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: cx("post_meta"),
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                    className: cx("post_category"),
                                                                    children: _lib_constants__WEBPACK_IMPORTED_MODULE_6__/* .CATEGORY */ .En[post.category]
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                    className: cx("separator"),
                                                                    children: "•"
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                    className: cx("post_date"),
                                                                    children: formatDate(post.date)
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: cx("actions_cell"),
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                            className: cx("action_btn", "edit"),
                                                            onClick: ()=>router.push(`/admin/edit/${post.slug}`),
                                                            disabled: isDeleting(post.slug),
                                                            children: "수정"
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                            className: cx("action_btn", "delete"),
                                                            onClick: ()=>handleDeletePost(post.slug),
                                                            disabled: isDeleting(post.slug),
                                                            children: isDeleting(post.slug) ? "삭제 중..." : "삭제"
                                                        })
                                                    ]
                                                })
                                            ]
                                        }, post.slug))
                                }),
                                posts.length === 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: cx("no_posts"),
                                    children: "포스트가 없습니다."
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
}
// Switch back to getStaticProps for compatibility with static export
async function getStaticProps() {
    const allPosts = await (0,_lib_api__WEBPACK_IMPORTED_MODULE_2__/* .getPosts */ .Jq)({
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
    const categoryList = await (0,_lib_api__WEBPACK_IMPORTED_MODULE_2__/* .getPostCategories */ .wx)();
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
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [898,636,730,61,688], () => (__webpack_exec__(7051)));
module.exports = __webpack_exports__;

})();