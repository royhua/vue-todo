var storage = window.localStorage;

let state = storage.getItem("state");
let initState = {};
if(state){
  initState = JSON.parse(state);
}

export default initState;
