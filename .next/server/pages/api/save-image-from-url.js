"use strict";
(() => {
var exports = {};
exports.id = 384;
exports.ids = [384];
exports.modules = {

/***/ 1423:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 9648:
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ 6555:
/***/ ((module) => {

module.exports = import("uuid");;

/***/ }),

/***/ 7147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 910:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1423);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9648);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6555);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_2__, uuid__WEBPACK_IMPORTED_MODULE_3__]);
([axios__WEBPACK_IMPORTED_MODULE_2__, uuid__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "허용되지 않는 메소드입니다"
        });
    }
    try {
        const { imageUrl  } = req.body;
        if (!imageUrl) {
            return res.status(400).json({
                success: false,
                message: "이미지 URL이 필요합니다"
            });
        }
        // 이미지 확장자 추출
        const extension = imageUrl.split(".").pop().split("?")[0].toLowerCase();
        const validExtensions = [
            "jpg",
            "jpeg",
            "png",
            "gif",
            "webp"
        ];
        if (!validExtensions.includes(extension)) {
            return res.status(400).json({
                success: false,
                message: "지원되지 않는 이미지 형식입니다"
            });
        }
        // 이미지 다운로드
        const response = await axios__WEBPACK_IMPORTED_MODULE_2__["default"].get(imageUrl, {
            responseType: "arraybuffer"
        });
        const buffer = Buffer.from(response.data, "binary");
        // 저장 경로 설정
        const publicDir = path__WEBPACK_IMPORTED_MODULE_1___default().join(process.cwd(), "public");
        const tempDir = path__WEBPACK_IMPORTED_MODULE_1___default().join(publicDir, "assets", "temp", "img");
        // 디렉토리 존재 확인 및 생성
        if (!fs__WEBPACK_IMPORTED_MODULE_0___default().existsSync(tempDir)) {
            fs__WEBPACK_IMPORTED_MODULE_0___default().mkdirSync(tempDir, {
                recursive: true
            });
        }
        // 고유한 파일 이름 생성
        const fileName = `temp_image_${(0,uuid__WEBPACK_IMPORTED_MODULE_3__.v4)().substring(0, 8)}.${extension}`;
        const filePath = path__WEBPACK_IMPORTED_MODULE_1___default().join(tempDir, fileName);
        // 파일 저장
        fs__WEBPACK_IMPORTED_MODULE_0___default().writeFileSync(filePath, buffer);
        // 상대 경로 반환 (public 폴더 기준)
        const relativePath = `/assets/temp/img/${fileName}`;
        return res.status(200).json({
            success: true,
            localPath: relativePath,
            message: "이미지가 성공적으로 저장되었습니다"
        });
    } catch (error) {
        console.error("이미지 저장 중 오류 발생:", error);
        return res.status(500).json({
            success: false,
            message: "서버 오류가 발생했습니다"
        });
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(910));
module.exports = __webpack_exports__;

})();