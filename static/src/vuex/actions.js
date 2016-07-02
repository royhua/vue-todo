import {USER_LOGIN, USER_LOGOUT, TODO_INIT, TODO_ADD, TODO_UPDATE, TODO_DELETE, FRIEND_INIT, FRIEND_ADD} from './mutation-types';


export function login(store, user) {
  store.dispatch(USER_LOGIN, user);
  getTodo(store);
  getFriend(store);
}

export function logout({ dispatch }) {
  dispatch(USER_LOGOUT);
  dispatch(TODO_INIT, {
    owner: [],
    shared: []
  });
  dispatch(FRIEND_INIT, []);
}

export function getTodo({ dispatch, state }) {
  let user = state.user.current;
  Promise.all([$.get(`/api/users/${user._id}/todos`), $.get(`/api/users/${user._id}/todos/shared`)]).then(function (result) {
    dispatch(TODO_INIT, {
      owner: result[0],
      shared: result[1]
    });
  });
}

export function updateTodo({ dispatch, state }, todo, field) {
  let user = state.user.current;
  let newTodo = Object.assign({}, todo, field);
  return $.ajax({
    type: 'put',
    url: `/api/users/${user._id}/todos`,
    data: newTodo
  }).then(function () {
    dispatch(TODO_UPDATE, newTodo);
  });
}

export function removeTodo({ dispatch, state }, todo) {
  let user = state.user.current;
  return $.ajax({
    type: 'delete',
    url: `/api/users/${user._id}/todos/${todo._id}`
  }).then(function () {
    dispatch(TODO_DELETE, todo);
  });
}

export function addTodo({ dispatch, state }, todo) {
  let user = state.user.current;
  return $.post(`/api/users/${user._id}/todos`, todo, function (todo) {
    dispatch(TODO_ADD, todo);
  });
}


export function getFriend({ dispatch, state }) {
  let user = state.user.current;
  return $.get(`/api/users/${user._id}/friends`).then(function (list) {
    if (list && list.length > 0) {
      dispatch(FRIEND_INIT, list);
    }
  }, function () {

  });
}

export function addFriend({ dispatch }, user) {
  dispatch(FRIEND_ADD, user);
}



