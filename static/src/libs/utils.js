export function find(arr, obj){
  let index = -1;
  arr.forEach(function(item, i){
    if(item._id === obj._id){
      index = i;
    }
  });
  return index;
}
