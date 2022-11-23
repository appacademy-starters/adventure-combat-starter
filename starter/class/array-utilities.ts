//returns an array with the item removed
function newArrWithoutItem<T>(arr: T[], item: T): T[] {
  return arr
    .slice(0, arr.indexOf(item))
    .concat(arr.slice(arr.indexOf(item) + 1));
}

export { newArrWithoutItem };
