/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**************************************!*\
  !*** ./src/utils/showCityResults.ts ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   showCityResults: () => (/* binding */ showCityResults)
/* harmony export */ });
function showCityResults(input) {
    let res = document.getElementById("result");
    res.innerHTML = '';
    if (input == '') {
        return;
    }
    let list = '';
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${input}&count=10&language=en&format=json`).then(function (response) {
        return response.json();
    }).then(function (data) {
        for (let i = 0; i < data.results.length; i++) {
            list += `<li
                            class="list-group-item" 
                            onclick="setCity(
                                ${data.results[i].latitude},
                                ${data.results[i].longitude},
                                '${data.results[i].timezone}',
                                '${data.results[i].name}',
                                '${data.results[i].admin1}',
                                '${data.results[i].country}'
                            )">
                            ${data.results[i].name}, ${data.results[i].admin1}, ${data.results[i].country}
                        </li>`;
        }
        res.innerHTML = '<ul class="result-item list-group">' + list + '</ul>';
        document.addEventListener('click', function () {
            let itensList = document.querySelector(".result-item");
            if (itensList !== null) {
                document.querySelector(".result-item").remove();
            }
        });
        return true;
    }).catch(function (err) {
        console.warn('Something went wrong.', err);
        return false;
    });
}
window.showCityResults = showCityResults;

/******/ })()
;
//# sourceMappingURL=showCityResults.bundle.js.map