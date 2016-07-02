<template>
  <div>
    <div class="settings-box">
      <div class="language-swatcher">
        <i :class="['fa', locale === 'en' ? 'fa-check-square' : 'fa-square']" @click="selectThis('en')"></i> English
        <i :class="['fa', locale === 'zh' ? 'fa-check-square' : 'fa-square']" @click="selectThis('zh')"></i> 中文
      </div>
      <notification-allow :locale="locale"></notification-allow>
    </div>
    <ul class="sticky_notes">
      <todo-item v-for="oneItem in list" :item="oneItem" :locale="locale" :shared="shared"></todo-item>
      <todo-add :locale="locale" v-if="!shared"></add-add>
    </ul>
    <friend-dialog :show-me.sync="showMe" :on-share="share"></friend-dialog>
  </div>
</template>
<style>
</style>
<script type="text/ecmascript-6">
  import TodoItem from './TodoItem.vue';
  import ItemAdd from './ItemAdd.vue';
  import NotificationAllow from './NotificationAllow.vue';
  import {addTodo, removeTodo, updateTodo} from '../vuex/actions';
  import FriendDialog from '../components/FriendDialog.vue';

  export default{
    vuex:{
      getters: {
        user: ({user}) => user.current
      },
      actions: {
        addTodo,
        removeTodo,
        updateTodo
      }
    },
    props: {
      list: {
        type: Array,
        default: function () {
          return []
        }
      },
      shared: {
        type: Boolean,
        default: false
      }
    },
    data: function () {
      return {
        locale: 'en',
        showMe: false,
        sharedTodo: null
      }
    },
    methods: {
      selectThis: function (locale) {
        this.locale = locale;
      },
      share(friends){
        if(this.sharedTodo && friends.length > 0){
          let friendIds = friends.map((friend) => friend._id);
          $.ajax({
            type: 'post',
            url: `/api/users/${this.user._id}/todos/${this.sharedTodo._id}/share`,
            data:  {friendIds},
            traditional: true
          }).then(()=>{
            this.showMe = false;
          });
        }
      }
    },
    components: {
      TodoItem: TodoItem,
      TodoAdd: ItemAdd,
      NotificationAllow: NotificationAllow,
      FriendDialog
    },
    events: {
      'item-remove': function (item) {
        this.removeTodo(item);
      },
      'item-update': function(item, field){
        this.updateTodo(item, field);
      },
      'item-add': function (item) {
        this.addTodo(item);
      },
      'share-todo': function(todo){
        this.sharedTodo = todo;
        this.showMe = true;
      }
    }
  }
</script>
