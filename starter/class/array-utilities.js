//returns an array with the item removed
function newArrWithoutItem(arr, item) {
  return arr
    .slice(0, arr.indexOf(item))
    .concat(arr.slice(arr.indexOf(item) + 1));
}

module.exports = { newArrWithoutItem };
