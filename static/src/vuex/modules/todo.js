import { TODO_INIT, TODO_ADD, TODO_UPDATE, TODO_DELETE } from '../mutation-types';
import {find} from '../../libs/utils';

// 该模块的初始状态
const state = {
  owner: [],
  shared: []
};

// 相关的 mutations
const mutations = {
  [TODO_INIT] (state, todoList) {
    state.owner = todoList.owner;
    state.shared = todoList.shared;
  },
  [TODO_ADD] (state, todo){
    state.owner.push(todo);
  },
  [TODO_UPDATE] (state, todo){
    let index = find(state.owner, todo);
    if(index != -1){
      state.owner.$set(index, todo);
    }
    index = find(state.shared, todo);
    if(index != -1){
      state.shared.$set(index, todo);
    }
  },
  [TODO_DELETE] (state, todo){
    state.owner.$remove(todo);
  }
};

export default {
  state,
  mutations
}
