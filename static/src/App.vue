<template>
  <div id="app">
    <todo v-bind:list="list"></todo>
  </div>
</template>

<script>
  import Todo from './components/Todo.vue';
  function notification(item){
    if (window.Notification){
      if(Notification.permission==='granted'){
        var notification = new Notification(item.title,{
          body: item.desc,
          icon: '/img/todo.png'
        });
      }
    }
  }

  export default {
    data: {
      list: []
    },
    created: function () {
      var self = this;

      this.$TodoResource.all(function (result) {
        $.each(result, function () {
          this.remainTime = moment(this.finishedTime).fromNow();
        });
        self.list = result;
      });

      setInterval(function () {
        $.each(self.list, function (i) {
          this.remainTime = moment(this.finishedTime).fromNow();

          var a = moment(this.finishedTime);
          var b = moment();
          if (Math.abs(a.diff(b)) < 60 * 1000 && !this.isNotified) {
            notification(this);
            this.isNotified = true;
          }
        });
      }, 1000);

    },
    components: {
      Todo: Todo
    }
  }
</script>

<style>

</style>
