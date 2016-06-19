<template>
  <li :class="['todo-item', item.color, item.done?'job-done':'']">
    <div class="item-button">
      <i class="fa fa-check fa-lg done-btn" @click="done"></i>
      <i class="fa fa-lg fa-times close-btn" @click="deleteItem"></i>
    </div>
    <div class="remain-time">
      {{item.remainTime}}
    </div>
    <h2>{{item.title}}</h2>
    {{item.desc}}
  </li>
</template>
<style>

</style>
<script>
  export default{
    props: {
      item: {
        type: Object,
        require: true,
        default: function () {
          return {};
        }
      },
      locale: String
    },
    data: function () {
      return {}
    },
    methods: {
      done: function () {
        this.item.done = true;
        this.item.$update();
      },
      deleteItem: function () {
        console.log('delete Item !');
        this.$dispatch('item-remove', this.item);
      }
    }
  }
</script>
