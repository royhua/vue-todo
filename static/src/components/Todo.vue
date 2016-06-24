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
      <todo-add :locale="locale"></add-add>
    </ul>
  </div>
</template>
<style>
</style>
<script>
  import TodoItem from './TodoItem.vue';
  import ItemAdd from './ItemAdd.vue';
  import NotificationAllow from './NotificationAllow.vue';

  export default{
    template: '#template',
    props: {
      list: {
        type: Array,
        default: function () {
          return []
        }
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
        let self = this;
        item.$delete().then(function () {
          self.list.$remove(item);
        });
      },
      'item-add': function (item) {
        var self = this;
        new this.$TodoResource.model(item).$save().then(function (resource) {
          resource.remainTime = moment(resource.finishedTime).fromNow();
          self.list.push(resource);
        });
      }
    }
  }
</script>
