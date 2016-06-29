import {USER_LOGIN, USER_LOGOUT, TODO_INIT, TODO_ADD, TODO_UPDATE, TODO_DELETE, FRIEND_INIT, FRIEND_ADD} from './mutation-types';


export function login(store, user) {
  store.dispatch(USER_LOGIN, user);
  getTodo(store);
  getFriend(store);
}

export function logout({ dispatch }) {
  dispatch(USER_LOGOUT);
}

export function getTodo({ dispatch, state }) {
  let user = state.user.current;
  return $.get(`/api/users/${user._id}/todos`, function (list) {
    if (list && list.length > 0) {
      dispatch(TODO_INIT, {
        owner: list,
        shared: []
      });
    }
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
    dispatch(FRIEND_INIT, [
      {
        "_id": "576d6c528c037b384fb1a57f",
        "email": "troyhua6@126.com",
        "nickName": "11111"
      },
      {
        "_id": "576d6c528c037b384fb1a577",
        "email": "troyhua7@126.com",
        "nickName": "77777"
      },
      {
        "_id": "576d6c528c037b384fb1a578",
        "email": "troyhua8@126.com",
        "nickName": "88888"
      },
      {
        "_id": "576d6c528c037b384fb1a579",
        "email": "troyhua9@126.com",
        "nickName": "99999"
      }
    ]);
  });
}

