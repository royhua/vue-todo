import TodoApp from '../views/TodoApp.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import OwnerTodo from '../views/OwnerTodo.vue';
import SharedTodo from '../views/SharedTodo.vue';
import FriendList from '../views/FriendList.vue';

export default {
  '/index': {
    name:'todoList',
    component: TodoApp,
    auth: true,
    subRoutes: {
      '/owner': {
        name: 'ownerList',
        component: OwnerTodo
      },
      '/shared': {
        name: 'sharedList',
        component: SharedTodo
      },
      '/friends': {
        name: 'friends',
        component: FriendList
      }
    }
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
