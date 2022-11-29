//returns an array with the item removed
function newArrWithoutItem<T>(arr: T[], item: T): T[] {
  return arr
    .slice(0, arr.indexOf(item))
    .concat(arr.slice(arr.indexOf(item) + 1));
}

//can I make this work or easier to just put it in each time?
/* function getObjFromArr<T>(arr: T[], itemName: string): object{
  arr.find((el) => el.name === itemName);
} */

export { newArrWithoutItem };
