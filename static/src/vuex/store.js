import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import todo from './modules/todo';
import friend from './modules/friend';
import {saveData} from './dao';

Vue.use(Vuex);

export default new Vuex.Store({
  middlewares: [{
    onInit (state) {
      // 记录初始 state
    },
    onMutation (mutation, state) {
      saveData(state);
    }
  }],
  // 组合各个模块
  modules: {
    user,
    todo,
    friend
  }
})
