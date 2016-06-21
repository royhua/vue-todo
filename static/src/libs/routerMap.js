import TodoApp from '../views/TodoApp.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

export default {
  '/index': {
    component: TodoApp
  },
  '/login': {
    component: Login
  },
  '/register': {
    name: 'register',
    component: Register
  }
}
