"use strict";
(() => {
var exports = {};
exports.id = 979;
exports.ids = [979];
exports.modules = {

/***/ 1423:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 7147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 7562:
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
    if (req.method !== "DELETE") {
        return res.status(405).json({
            message: "Method Not Allowed"
        });
    }
    try {
        // temp 폴더가 존재하는지 확인
        if (!fs__WEBPACK_IMPORTED_MODULE_0___default().existsSync(TEMP_DIR)) {
            return res.status(200).json({
                success: true,
                message: "삭제할 임시저장 포스트가 없습니다."
            });
        }
        // temp 폴더 내의 모든 파일 목록 가져오기
        const files = fs__WEBPACK_IMPORTED_MODULE_0___default().readdirSync(TEMP_DIR);
        // JSON 파일만 필터링
        const jsonFiles = files.filter((file)=>file.endsWith(".json"));
        // 모든 임시저장 파일 삭제
        let deletedCount = 0;
        for (const file of jsonFiles){
            const filePath = path__WEBPACK_IMPORTED_MODULE_1___default().join(TEMP_DIR, file);
            fs__WEBPACK_IMPORTED_MODULE_0___default().unlinkSync(filePath);
            deletedCount++;
        }
        return res.status(200).json({
            success: true,
            message: `${deletedCount}개의 임시저장 포스트가 삭제되었습니다.`,
            deletedCount
        });
    } catch (error) {
        console.error("임시저장 포스트 전체 삭제 오류:", error);
        return res.status(500).json({
            message: "임시저장 포스트 삭제 중 오류가 발생했습니다."
        });
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(7562));
module.exports = __webpack_exports__;

})();