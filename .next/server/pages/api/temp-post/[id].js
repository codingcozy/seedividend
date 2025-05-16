"use strict";
(() => {
var exports = {};
exports.id = 485;
exports.ids = [485];
exports.modules = {

/***/ 1423:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 7147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 3856:
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
    const { id  } = req.query;
    if (!id || Array.isArray(id)) {
        return res.status(400).json({
            message: "유효하지 않은 ID입니다."
        });
    }
    // 파일 경로 생성
    const filePath = path__WEBPACK_IMPORTED_MODULE_1___default().join(TEMP_DIR, `${id}.json`);
    // GET 메서드 처리
    if (req.method === "GET") {
        try {
            console.log(id);
            // 파일이 존재하지 않으면 404 반환
            if (!fs__WEBPACK_IMPORTED_MODULE_0___default().existsSync(filePath)) {
                return res.status(404).json({
                    message: "임시저장된 포스트를 찾을 수 없습니다."
                });
            }
            // 파일 내용 읽기
            const fileContent = fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(filePath, "utf-8");
            const postData = JSON.parse(fileContent);
            return res.status(200).json({
                post: postData
            });
        } catch (error) {
            console.error("임시저장 포스트 조회 오류:", error);
            return res.status(500).json({
                message: "서버 오류가 발생했습니다."
            });
        }
    }
    // DELETE 메서드 처리
    if (req.method === "DELETE") {
        try {
            // 파일이 존재하지 않으면 404 반환
            if (!fs__WEBPACK_IMPORTED_MODULE_0___default().existsSync(filePath)) {
                return res.status(404).json({
                    message: "삭제할 임시저장 포스트를 찾을 수 없습니다."
                });
            }
            // 파일 삭제
            fs__WEBPACK_IMPORTED_MODULE_0___default().unlinkSync(filePath);
            return res.status(200).json({
                success: true,
                message: "임시저장 포스트가 성공적으로 삭제되었습니다."
            });
        } catch (error) {
            console.error("임시저장 포스트 삭제 오류:", error);
            return res.status(500).json({
                message: "서버 오류가 발생했습니다."
            });
        }
    }
    // 지원하지 않는 메서드
    return res.status(405).json({
        message: "Method Not Allowed"
    });
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(3856));
module.exports = __webpack_exports__;

})();