var storage = window.sessionStorage;

export function getData(){
  let state = storage.getItem("state");
  let initState = {};
  if(state){
    initState = JSON.parse(state);
  }
  return initState;
}

export function saveData(data){
  storage.setItem('state', JSON.stringify(data));
}
