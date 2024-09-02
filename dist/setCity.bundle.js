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
/*!******************************!*\
  !*** ./src/utils/setCity.ts ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setCity: () => (/* binding */ setCity)
/* harmony export */ });
async function setCity(lat, lon, timezone, name, admin1, country) {
    let City = {
        latitude: lat,
        longitude: lon,
        timezone: timezone,
        name: name,
        admin1: admin1,
        countryName: country
    };
    let results = document.querySelectorAll(".result-item");
    if (results.length > 0) {
        document.querySelector(".result-item").remove();
    }
    //City Information
    document.getElementById("cityName").value = City.name + ", " + City.admin1 + ", " + City.countryName;
    document.querySelector('#cityInformation').innerHTML = `${City.name} - ${City.admin1} - ${City.countryName}`;
    document.querySelector('#latitude').innerHTML = `${City.latitude}`;
    document.querySelector('#longitude').innerHTML = `${City.longitude}`;
    document.querySelector('#timezone').innerHTML = `${City.timezone}`;
}
window.setCity = setCity;

/******/ })()
;
//# sourceMappingURL=setCity.bundle.js.map