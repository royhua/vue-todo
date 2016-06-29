import { FRIEND_INIT, FRIEND_ADD } from '../mutation-types';

// 该模块的初始状态
const state = {
  all: []
};

// 相关的 mutations
const mutations = {
  [FRIEND_INIT] (state, list) {
    state.all = list;
  },

  [FRIEND_ADD] (state, friend) {
    state.all.push(friend);
  }
};

export default {
  state,
  mutations
}
