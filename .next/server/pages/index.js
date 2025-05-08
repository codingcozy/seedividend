(() => {
var exports = {};
exports.id = 405;
exports.ids = [405,620];
exports.modules = {

/***/ 666:
/***/ ((module) => {

// Exports
module.exports = {
	"section_wrap": "Section_section_wrap__3ePYJ",
	"title_area": "Section_title_area__aU0Of",
	"more_link": "Section_more_link__DcxvB",
	"section": "Section_section__vMEm_"
};


/***/ }),

/***/ 5426:
/***/ ((module) => {

// Exports
module.exports = {
	"container": "index_container__HpKSV",
	"content": "index_content__k_CP2",
	"side_bar": "index_side_bar__Z3_mC",
	"section_wrap": "index_section_wrap__LTIfI",
	"section": "index_section__dCy_m"
};


/***/ }),

/***/ 4284:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Home),
  "getStaticProps": () => (/* binding */ getStaticProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./components/Header/index.tsx
var Header = __webpack_require__(6853);
// EXTERNAL MODULE: ./pages/index.module.scss
var index_module = __webpack_require__(5426);
var index_module_default = /*#__PURE__*/__webpack_require__.n(index_module);
// EXTERNAL MODULE: external "classnames/bind"
var bind_ = __webpack_require__(3284);
var bind_default = /*#__PURE__*/__webpack_require__.n(bind_);
// EXTERNAL MODULE: ./components/PostList/index.tsx
var PostList = __webpack_require__(7354);
// EXTERNAL MODULE: ./lib/api.ts
var api = __webpack_require__(4011);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./components/Section/Section.module.scss
var Section_module = __webpack_require__(666);
var Section_module_default = /*#__PURE__*/__webpack_require__.n(Section_module);
// EXTERNAL MODULE: ./components/SectionTitle/index.tsx
var SectionTitle = __webpack_require__(6457);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
;// CONCATENATED MODULE: ./components/Section/index.tsx






const cx = bind_default().bind((Section_module_default()));
const Section = ({ title , moreLink , children  })=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: cx("section_wrap"),
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: cx("title_area"),
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(SectionTitle/* default */.Z, {
                        title: title
                    }),
                    moreLink && /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                        className: cx("more_link"),
                        href: moreLink,
                        children: [
                            "더보기 ",
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "blind",
                                children: title
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: cx("section"),
                children: children
            })
        ]
    });
};
/* harmony default export */ const components_Section = (Section);

// EXTERNAL MODULE: ./components/CustomHead/index.tsx
var CustomHead = __webpack_require__(2862);
;// CONCATENATED MODULE: ./pages/index.tsx








const pages_cx = bind_default().bind((index_module_default()));
function Home({ allPosts , categories  }) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(CustomHead/* default */.Z, {
                type: "home"
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("main", {
                className: pages_cx("container"),
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(Header/* default */.Z, {
                        postList: allPosts,
                        categoryList: categories
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: pages_cx("content"),
                        children: /*#__PURE__*/ jsx_runtime_.jsx(components_Section, {
                            title: "게시물",
                            moreLink: `posts/${categories[0]}/1`,
                            children: /*#__PURE__*/ jsx_runtime_.jsx(PostList/* default */.Z, {
                                postList: allPosts.slice(0, 10)
                            })
                        })
                    })
                ]
            })
        ]
    });
}
const getStaticProps = async ()=>{
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
            "readingTime"
        ]
    });
    const categories = await (0,api/* getPostCategories */.wx)();
    return {
        props: {
            allPosts,
            categories
        }
    };
};


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
var __webpack_exports__ = __webpack_require__.X(0, [898,636,730,61,688], () => (__webpack_exec__(4284)));
module.exports = __webpack_exports__;

})();