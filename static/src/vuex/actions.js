import {USER_LOGIN, USER_LOGOUT} from './mutation-types';


export function login ({ dispatch }, user) {
  dispatch(USER_LOGIN, user);
}

export function logout ({ dispatch }) {
  dispatch(USER_LOGOUT);
}
