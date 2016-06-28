import { USER_LOGIN, USER_LOGOUT } from '../mutation-types';
import initState from './initState';

let {user} = initState;

// 该模块的初始状态
const state = {
  current: user ? user.current : null
};

// 相关的 mutations
const mutations = {
  [USER_LOGIN] (state, user) {
    state.current = user
  },

  [USER_LOGOUT] (state) {
    state.current = null
  }
};

export default {
  state,
  mutations
}
