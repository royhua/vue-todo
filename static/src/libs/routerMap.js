import TodoApp from '../views/TodoApp.vue';
import Login from '../views/Login.vue';

export default {
  '/index': {
    component: TodoApp
  },
  '/login': {
    component: Login
  }
}
