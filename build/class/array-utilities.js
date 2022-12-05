"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newArrWithoutItem = void 0;
//returns an array with the item removed
function newArrWithoutItem(arr, item) {
    return arr
        .slice(0, arr.indexOf(item))
        .concat(arr.slice(arr.indexOf(item) + 1));
}
exports.newArrWithoutItem = newArrWithoutItem;
//# sourceMappingURL=array-utilities.js.map