(() => {
var exports = {};
exports.id = 515;
exports.ids = [515,620];
exports.modules = {

/***/ 3702:
/***/ ((module) => {

// Exports
module.exports = {
	"post_content": "posts_post_content__n_L6j",
	"container": "posts_container__NyRU3",
	"-list": "posts_-list__uNgdi",
	"inner": "posts_inner__i3n_i",
	"project_list": "posts_project_list__SjBxj",
	"ifram_wrap": "posts_ifram_wrap__glp9I",
	"iframe": "posts_iframe__lRdaY",
	"meta": "posts_meta__cR7lu",
	"date": "posts_date__ctqHI",
	"profile_wrap": "posts_profile_wrap__mslMl",
	"profile_image_wrap": "posts_profile_image_wrap__kPikV",
	"textarea": "posts_textarea__w_iKT",
	"info": "posts_info__5KJdN",
	"reading_time": "posts_reading_time__f7YPP",
	"post_title": "posts_post_title__EbxNx",
	"tag_area": "posts_tag_area__sTSlv",
	"tag": "posts_tag__9cdg9",
	"view_badge": "posts_view_badge__tcbfm"
};


/***/ }),

/***/ 3234:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const GoogleAd = ()=>{
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
            console.log(error);
        }
    }, []);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "googleAd-container",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ins", {
            className: "adsbygoogle",
            style: {
                display: "block"
            },
            "data-ad-client": "ca-pub-4877378276818686",
            "data-ad-slot": "1107185301",
            "data-ad-format": "auto",
            "data-full-width-responsive": "true"
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GoogleAd);


/***/ }),

/***/ 8448:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Post),
/* harmony export */   "getStaticPaths": () => (/* binding */ getStaticPaths),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps),
/* harmony export */   "myRemarkPlugin": () => (/* binding */ myRemarkPlugin)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5566);
/* harmony import */ var next_error__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_error__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4011);
/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6853);
/* harmony import */ var _posts_module_scss__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(3702);
/* harmony import */ var _posts_module_scss__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_posts_module_scss__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3284);
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames_bind__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var unist_util_visit__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6016);
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4696);
/* harmony import */ var _components_CustomHead__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2862);
/* harmony import */ var _components_GoogleAd__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(3234);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(2245);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _lib_markdownToHtml__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(7095);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([unist_util_visit__WEBPACK_IMPORTED_MODULE_7__, _lib_markdownToHtml__WEBPACK_IMPORTED_MODULE_12__]);
([unist_util_visit__WEBPACK_IMPORTED_MODULE_7__, _lib_markdownToHtml__WEBPACK_IMPORTED_MODULE_12__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);














const cx = classnames_bind__WEBPACK_IMPORTED_MODULE_5___default().bind((_posts_module_scss__WEBPACK_IMPORTED_MODULE_13___default()));
const components = {
    Image: (next_image__WEBPACK_IMPORTED_MODULE_6___default()),
    GoogleAd: _components_GoogleAd__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z
};
function Post({ allPosts , post , content , categoryList  }) {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    if (!router.isFallback && !post?.slug) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_error__WEBPACK_IMPORTED_MODULE_2___default()), {
            statusCode: 404
        });
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: router.isFallback ? " Loading…" : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_CustomHead__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                    type: "post",
                    post: post
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Header__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                    postList: allPosts,
                    categoryList: categoryList
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("main", {
                    className: cx("container"),
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: cx("inner"),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                                className: cx("post_title"),
                                children: post.title
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: cx("meta"),
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: cx("profile_wrap"),
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: cx("profile_image_wrap"),
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_6___default()), {
                                                    src: "/favicons/apple-icon-114x114.png",
                                                    className: cx("profile"),
                                                    alt: post.title,
                                                    width: 44,
                                                    height: 44
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: cx("textarea"),
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        className: cx("writer"),
                                                        children: _lib_constants__WEBPACK_IMPORTED_MODULE_8__/* .AUTHOR */ .S7
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: cx("info"),
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                className: cx("date"),
                                                                children: `Posted On ${moment__WEBPACK_IMPORTED_MODULE_11___default()(post.date).format("MMM D, YYYY")}`
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                className: cx("reading_time"),
                                                                children: [
                                                                    post.readingTime,
                                                                    " min read"
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_6___default()), {
                                        width: "50",
                                        height: "50",
                                        className: cx("view_badge"),
                                        src: `https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fallround-coder.github.io${router.asPath}&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=views&edge_flat=false`,
                                        alt: ""
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("article", {
                                className: cx("post_content"),
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    dangerouslySetInnerHTML: {
                                        __html: content
                                    }
                                })
                            })
                        ]
                    })
                })
            ]
        })
    });
}
function myRemarkPlugin() {
    return (tree)=>{
        (0,unist_util_visit__WEBPACK_IMPORTED_MODULE_7__.visit)(tree, (node)=>{
            if (node.type === "textDirective" || node.type === "leafDirective" || node.type === "containerDirective") {
                if (node.name === "tip") {
                    const data = node.data || (node.data = {});
                    const tagName = node.type === "textDirective" ? "span" : "div";
                    data.hName = tagName;
                    // data.hProperties = h(tagName, node.attributes).properties;
                    data.hProperties = {
                        className: [
                            "tip"
                        ]
                    };
                }
                if (node.name === "warning") {
                    const data = node.data || (node.data = {});
                    const tagName = node.type === "textDirective" ? "span" : "div";
                    data.hName = tagName;
                    data.hProperties = {
                        className: [
                            "warning"
                        ]
                    };
                }
            }
        });
    };
}
async function getStaticProps({ params  }) {
    const allPosts = await (0,_lib_api__WEBPACK_IMPORTED_MODULE_3__/* .getPosts */ .Jq)({
        fields: [
            "title"
        ]
    });
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
            "readingTime"
        ]
    });
    const categoryList = await (0,_lib_api__WEBPACK_IMPORTED_MODULE_3__/* .getPostCategories */ .wx)();
    const content = await (0,_lib_markdownToHtml__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z)(post.content || "");
    return {
        props: {
            post: {
                ...post
            },
            content,
            allPosts,
            categoryList
        }
    };
}
async function getStaticPaths() {
    const posts = await (0,_lib_api__WEBPACK_IMPORTED_MODULE_3__/* .getPosts */ .Jq)({
        fields: [
            "slug"
        ]
    });
    let paths = [];
    for(let i in posts){
        const post = posts[i];
        paths.push({
            params: {
                slug: post.slug
            }
        });
    }
    return {
        paths,
        fallback: false
    };
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

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

/***/ 5566:
/***/ ((module) => {

"use strict";
module.exports = require("next/error");

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

/***/ 3738:
/***/ ((module) => {

"use strict";
module.exports = import("rehype-external-links");;

/***/ }),

/***/ 4921:
/***/ ((module) => {

"use strict";
module.exports = import("rehype-highlight");;

/***/ }),

/***/ 1871:
/***/ ((module) => {

"use strict";
module.exports = import("rehype-raw");;

/***/ }),

/***/ 5390:
/***/ ((module) => {

"use strict";
module.exports = import("rehype-stringify");;

/***/ }),

/***/ 6809:
/***/ ((module) => {

"use strict";
module.exports = import("remark-gfm");;

/***/ }),

/***/ 6688:
/***/ ((module) => {

"use strict";
module.exports = import("remark-parse");;

/***/ }),

/***/ 2509:
/***/ ((module) => {

"use strict";
module.exports = import("remark-rehype");;

/***/ }),

/***/ 4390:
/***/ ((module) => {

"use strict";
module.exports = import("unified");;

/***/ }),

/***/ 6016:
/***/ ((module) => {

"use strict";
module.exports = import("unist-util-visit");;

/***/ }),

/***/ 7147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [898,636,730,61,688,95], () => (__webpack_exec__(8448)));
module.exports = __webpack_exports__;

})();