"use strict";
(() => {
var exports = {};
exports.id = 387;
exports.ids = [387];
exports.modules = {

/***/ 1423:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 7147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 4191:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1423);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);


// 임시저장 폴더 경로
const TEMP_DIR = path__WEBPACK_IMPORTED_MODULE_1___default().join(process.cwd(), "temp");
async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({
            message: "Method Not Allowed"
        });
    }
    try {
        // 폴더가 없으면 생성
        if (!fs__WEBPACK_IMPORTED_MODULE_0___default().existsSync(TEMP_DIR)) {
            fs__WEBPACK_IMPORTED_MODULE_0___default().mkdirSync(TEMP_DIR, {
                recursive: true
            });
            return res.status(200).json({
                posts: []
            });
        }
        // 모든 임시저장 파일 읽기
        const files = fs__WEBPACK_IMPORTED_MODULE_0___default().readdirSync(TEMP_DIR).filter((file)=>file.endsWith(".json"));
        const posts = files.map((file)=>{
            const filePath = path__WEBPACK_IMPORTED_MODULE_1___default().join(TEMP_DIR, file);
            const fileContent = fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(filePath, "utf-8");
            const postData = JSON.parse(fileContent);
            const fileName = file.replace(".json", "");
            return {
                id: postData.id || fileName,
                title: postData.title,
                date: postData.date,
                preview: postData.content.substring(0, 100) + (postData.content.length > 100 ? "..." : "")
            };
        });
        // 최신 날짜순으로 정렬
        posts.sort((a, b)=>new Date(b.date).getTime() - new Date(a.date).getTime());
        return res.status(200).json({
            posts
        });
    } catch (error) {
        console.error("임시저장 목록 조회 오류:", error);
        return res.status(500).json({
            message: "서버 오류가 발생했습니다."
        });
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(4191));
module.exports = __webpack_exports__;

})();