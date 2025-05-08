"use strict";
exports.id = 95;
exports.ids = [95];
exports.modules = {

/***/ 7095:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ markdownToHtml)
/* harmony export */ });
/* harmony import */ var rehype_external_links__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3738);
/* harmony import */ var remark_parse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6688);
/* harmony import */ var remark_rehype__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2509);
/* harmony import */ var rehype_highlight__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4921);
/* harmony import */ var remark_gfm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6809);
/* harmony import */ var rehype_stringify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5390);
/* harmony import */ var rehype_raw__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1871);
/* harmony import */ var unified__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4390);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([rehype_external_links__WEBPACK_IMPORTED_MODULE_0__, remark_parse__WEBPACK_IMPORTED_MODULE_1__, remark_rehype__WEBPACK_IMPORTED_MODULE_2__, rehype_highlight__WEBPACK_IMPORTED_MODULE_3__, remark_gfm__WEBPACK_IMPORTED_MODULE_4__, rehype_stringify__WEBPACK_IMPORTED_MODULE_5__, rehype_raw__WEBPACK_IMPORTED_MODULE_6__, unified__WEBPACK_IMPORTED_MODULE_7__]);
([rehype_external_links__WEBPACK_IMPORTED_MODULE_0__, remark_parse__WEBPACK_IMPORTED_MODULE_1__, remark_rehype__WEBPACK_IMPORTED_MODULE_2__, rehype_highlight__WEBPACK_IMPORTED_MODULE_3__, remark_gfm__WEBPACK_IMPORTED_MODULE_4__, rehype_stringify__WEBPACK_IMPORTED_MODULE_5__, rehype_raw__WEBPACK_IMPORTED_MODULE_6__, unified__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








async function markdownToHtml(markdown) {
    // 먼저 마크다운을 HTML로 변환합니다
    const result = await (0,unified__WEBPACK_IMPORTED_MODULE_7__.unified)().use(remark_parse__WEBPACK_IMPORTED_MODULE_1__["default"]).use(remark_gfm__WEBPACK_IMPORTED_MODULE_4__["default"]).use(remark_rehype__WEBPACK_IMPORTED_MODULE_2__["default"], {
        allowDangerousHtml: true
    }).use(rehype_raw__WEBPACK_IMPORTED_MODULE_6__["default"]).use(rehype_external_links__WEBPACK_IMPORTED_MODULE_0__["default"], {
        target: [
            "_blank"
        ]
    }).use(rehype_highlight__WEBPACK_IMPORTED_MODULE_3__["default"]).use(rehype_stringify__WEBPACK_IMPORTED_MODULE_5__["default"]).process(markdown);
    // HTML 문자열로 변환
    let htmlContent = result.toString();
    // 개행 문자를 <br> 태그로 대체 (정규식 사용)
    // 연속된 두 개 이상의 개행은 <br><br>로 제한
    // htmlContent = htmlContent.replace(/\n{2,}/g, "<br><br>");
    // htmlContent = htmlContent.replace(/\n/g, "<br>");
    return htmlContent;
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;