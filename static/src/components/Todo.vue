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
      <todo-item v-for="oneItem in list" :item="oneItem" :locale="locale"></todo-item>
      <todo-add :locale="locale" v-if="!noAdd"></add-add>
    </ul>
  </div>
</template>
<style>
</style>
<script type="text/ecmascript-6">
  import TodoItem from './TodoItem.vue';
  import ItemAdd from './ItemAdd.vue';
  import NotificationAllow from './NotificationAllow.vue';
  import {addTodo, removeTodo, updateTodo} from '../vuex/actions';

  export default{
    vuex:{
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
      noAdd: {
        type: Boolean,
        default: false
      }
    },
    data: function () {
      return {
        locale: 'en'
      }
    },
    methods: {
      selectThis: function (locale) {
        this.locale = locale;
      }
    },
    components: {
      TodoItem: TodoItem,
      TodoAdd: ItemAdd,
      NotificationAllow: NotificationAllow
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
      }
    }
  }
</script>
