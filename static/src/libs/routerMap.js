import TodoApp from '../views/TodoApp.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

export default {
  '/index': {
    name:'todoList',
    component: TodoApp,
    auth: true
  },
  '/login': {
    name: 'login',
    component: Login
  },
  '/register': {
    name: 'register',
    component: Register
  }
}
