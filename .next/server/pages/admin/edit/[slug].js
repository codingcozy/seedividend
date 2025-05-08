"use strict";
(() => {
var exports = {};
exports.id = 770;
exports.ids = [770,620];
exports.modules = {

/***/ 6715:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EditPost),
/* harmony export */   "getStaticPaths": () => (/* binding */ getStaticPaths),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4011);
/* harmony import */ var _components_CustomHead__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2862);
/* harmony import */ var _hooks_useAdminAuth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7735);
/* harmony import */ var _components_PostEditor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3425);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_PostEditor__WEBPACK_IMPORTED_MODULE_6__]);
_components_PostEditor__WEBPACK_IMPORTED_MODULE_6__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];







function EditPost({ post , categoryList  }) {
    // 관리자 권한 체크
    const { isAuthorized , isLoading  } = (0,_hooks_useAdminAuth__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z)();
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const [isSubmitting, setIsSubmitting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // 폼 제출 처리
    const handleSubmit = async (postData)=>{
        setIsSubmitting(true);
        try {
            // 사용자 확인 추가 - 수정을 확실히 할 것인지 확인
            const confirmUpdate = window.confirm("포스트를 수정하시겠습니까?");
            if (!confirmUpdate) {
                setIsSubmitting(false);
                return;
            }
            const submitData = {
                ...postData,
                slug: post.slug,
                tags: "",
                date: post.date
            };
            // 네트워크 요청 시 타임아웃 설정을 위한 컨트롤러
            const controller = new AbortController();
            const timeoutId = setTimeout(()=>controller.abort(), 30000); // 30초 타임아웃
            const response = await fetch(`http://localhost:3001/api/update-post?slug=${post.slug}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(submitData),
                signal: controller.signal
            });
            clearTimeout(timeoutId); // 타임아웃 해제
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "포스트 수정에 실패했습니다.");
            }
            alert("포스트가 성공적으로 수정되었습니다.");
            router.push("/admin");
        } catch (err) {
            console.error("Error updating post:", err);
            throw err;
        } finally{
            setIsSubmitting(false);
        }
    };
    if (isLoading) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            children: "로딩 중..."
        });
    }
    if (!isAuthorized) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            children: "접근 권한이 없습니다"
        });
    }
    if (router.isFallback) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            children: "포스트를 불러오는 중..."
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_CustomHead__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                type: "home"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_PostEditor__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                initialTitle: post?.title || "",
                initialContent: post?.content || "",
                initialCategory: post?.category || categoryList[0] || "",
                initialDescription: post?.description || "",
                initialCoverImage: post?.coverImage || "",
                categoryList: categoryList,
                onSubmit: handleSubmit,
                submitButtonText: "수정 완료",
                isSubmitting: isSubmitting
            })
        ]
    });
}
// getStaticPaths로 편집 가능한 포스트 경로 생성
async function getStaticPaths() {
    // 개발 환경에서는 빌드 타임에 모든 경로를 미리 생성하지 않고 필요할 때 생성
    return {
        paths: [],
        fallback: true
    };
}
async function getStaticProps({ params  }) {
    try {
        const [post] = await (0,_lib_api__WEBPACK_IMPORTED_MODULE_3__/* .getPosts */ .Jq)({
            file: params.slug,
            fields: [
                "title",
                "description",
                "date",
                "slug",
                "author",
                "content",
                "ogImage",
                "coverImage",
                "date",
                "tag",
                "readingTime",
                "category"
            ]
        });
        const categoryList = await (0,_lib_api__WEBPACK_IMPORTED_MODULE_3__/* .getPostCategories */ .wx)();
        return {
            props: {
                post,
                categoryList
            },
            revalidate: 10
        };
    } catch (error) {
        console.error(`Error fetching post with slug ${params.slug}:`, error);
        return {
            notFound: true
        };
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3284:
/***/ ((module) => {

module.exports = require("classnames/bind");

/***/ }),

/***/ 3059:
/***/ ((module) => {

module.exports = require("globby");

/***/ }),

/***/ 8076:
/***/ ((module) => {

module.exports = require("gray-matter");

/***/ }),

/***/ 2245:
/***/ ((module) => {

module.exports = require("moment");

/***/ }),

/***/ 3918:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/amp-context.js");

/***/ }),

/***/ 5732:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/amp-mode.js");

/***/ }),

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4486:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-blur-svg.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 9552:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-loader");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 1109:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-local-url.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 7782:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-href.js");

/***/ }),

/***/ 2470:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/side-effect.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 618:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils/warn-once.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 1423:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 3738:
/***/ ((module) => {

module.exports = import("rehype-external-links");;

/***/ }),

/***/ 4921:
/***/ ((module) => {

module.exports = import("rehype-highlight");;

/***/ }),

/***/ 1871:
/***/ ((module) => {

module.exports = import("rehype-raw");;

/***/ }),

/***/ 5390:
/***/ ((module) => {

module.exports = import("rehype-stringify");;

/***/ }),

/***/ 6809:
/***/ ((module) => {

module.exports = import("remark-gfm");;

/***/ }),

/***/ 6688:
/***/ ((module) => {

module.exports = import("remark-parse");;

/***/ }),

/***/ 2509:
/***/ ((module) => {

module.exports = import("remark-rehype");;

/***/ }),

/***/ 4390:
/***/ ((module) => {

module.exports = import("unified");;

/***/ }),

/***/ 7147:
/***/ ((module) => {

module.exports = require("fs");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [898,636,730,61,688,95,502], () => (__webpack_exec__(6715)));
module.exports = __webpack_exports__;

})();