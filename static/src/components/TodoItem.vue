<template>
  <li :class="['todo-item', item.color, item.done?'job-done':'']">
    <div class="item-button">
      <i class="fa fa-lg fa-share-square-o share-btn" @click="share" v-if="!shared"></i>
      <i class="fa fa-check fa-lg done-btn" @click="done"></i>
      <i class="fa fa-lg fa-times close-btn" @click="deleteItem" v-if="!shared"></i>
    </div>
    <div class="remain-time" v-if="item.sharedFrom">
      分享于{{item.sharedFrom.nickName}}, {{remainTime}}
    </div>
    <div class="remain-time" v-if="!item.sharedFrom">
      {{remainTime}}
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
      locale: String,
      shared: Boolean
    },
    data: function () {
      return {
        remainTime: null
      }
    },
    ready(){
      let self = this;
      moment.locale('zh-CN');
      self.remainTime = moment(self.item.finishedTime).fromNow();
      setInterval(function () {
        self.remainTime = moment(self.item.finishedTime).fromNow();
      }, 1000);
    },
    methods: {
      done: function () {
        this.$dispatch('item-update', this.item, {
          done: true
        });
      },
      deleteItem: function () {
        this.$dispatch('item-remove', this.item);
      },
      share(){
        this.$dispatch('share-todo', this.item);
      }
    }
  }
</script>
