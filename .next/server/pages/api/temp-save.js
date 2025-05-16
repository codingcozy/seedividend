"use strict";
(() => {
var exports = {};
exports.id = 949;
exports.ids = [949];
exports.modules = {

/***/ 1423:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 7147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 8654:
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
// 폴더가 없으면 생성
if (!fs__WEBPACK_IMPORTED_MODULE_0___default().existsSync(TEMP_DIR)) {
    fs__WEBPACK_IMPORTED_MODULE_0___default().mkdirSync(TEMP_DIR, {
        recursive: true
    });
}
async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            message: "Method Not Allowed"
        });
    }
    try {
        // 요청 본문에서 데이터 추출
        const { id , title , content , category , description , coverImage , tags , date  } = req.body;
        if (!id || !title || !content) {
            return res.status(400).json({
                message: "필수 데이터가 누락되었습니다."
            });
        }
        // 저장할 데이터 객체
        const postData = {
            id,
            title,
            content,
            category: category || "",
            description: description || "",
            coverImage: coverImage || "",
            tags: tags || "",
            date: date || new Date().toISOString()
        };
        // 파일 경로 생성
        const filePath = path__WEBPACK_IMPORTED_MODULE_1___default().join(TEMP_DIR, `${id}.json`);
        // 기존 파일이 있는지 확인
        const isUpdate = fs__WEBPACK_IMPORTED_MODULE_0___default().existsSync(filePath);
        // 파일에 저장 (기존 파일이 있으면 덮어쓰기)
        fs__WEBPACK_IMPORTED_MODULE_0___default().writeFileSync(filePath, JSON.stringify(postData, null, 2), "utf-8");
        console.log(`임시저장 ${isUpdate ? "업데이트" : "새로 생성"}: ID=${id}, 제목=${title}`);
        return res.status(200).json({
            success: true,
            id,
            message: isUpdate ? "임시저장 파일이 업데이트되었습니다." : "새 임시저장 파일이 생성되었습니다."
        });
    } catch (error) {
        console.error("임시저장 오류:", error);
        return res.status(500).json({
            message: "서버 오류가 발생했습니다.",
            error: String(error)
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
var __webpack_exports__ = (__webpack_exec__(8654));
module.exports = __webpack_exports__;

})();