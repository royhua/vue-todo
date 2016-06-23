<template>
  <div>Welcome: {{user.nickName}}</div>
  <a class="btn btn-default" @click="logout">logout</a>
  <div class="todo-app">
    <todo :list="list"></todo>
  </div>
</template>

<script>
  import Todo from './../components/Todo.vue';
  import session from '../libs/session';
  function notification(item) {
    if (window.Notification) {
      if (Notification.permission === 'granted') {
        var notification = new Notification(item.title, {
          body: item.desc,
          icon: '/img/todo.png'
        });
      }
    }
  }

  export default {
    data(){
      return {
        list: [],
        user: session.state.user
      }
    },
    ready(){

    },
    methods:{
      logout(){
        session.logout();
        this.$router.go({name: 'login'});
      }
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

<style lang="less" type="text/less">
  .todo-app {
    .title {
      text-align: center;
    }

    ul.sticky_notes {
      list-style: none;
      padding: 0px;
    }

    ul.sticky_notes::after {
      content: "020";
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
    }

    ul.sticky_notes li.todo-item {
      width: 300px;
      height: 260px;
      padding: 20px;
      margin: 20px;
      float: left;
      -moz-box-shadow: 5px 5px 7px rgba(33, 33, 33, 1);
      -webkit-box-shadow: 5px 5px 7px rgba(33, 33, 33, .7);
      box-shadow: 5px 5px 7px rgba(33, 33, 33, .7);
      -webkit-transform: rotate(-6deg);
      -o-transform: rotate(-6deg);
      -moz-transform: rotate(-6deg);
    }

    ul.sticky_notes li.todo-item:nth-child(odd) {
      -o-transform: rotate(4deg);
      -webkit-transform: rotate(4deg);
      -moz-transform: rotate(4deg);
      position: relative;
      top: 5px;
    }

    ul.sticky_notes li.todo-item:nth-child(2n) {
      -o-transform: rotate(-3deg);
      -webkit-transform: rotate(-3deg);
      -moz-transform: rotate(-3deg);
      position: relative;
      top: -5px;
    }

    ul.sticky_notes li.todo-item:nth-child(6n) {
      -o-transform: rotate(5deg);
      -webkit-transform: rotate(5deg);
      -moz-transform: rotate(5deg);
      position: relative;
      top: -10px;
    }

    .yellow {
      background: #ffc;
    }

    .green {
      background: #cfc;
    }

    .blue {
      background: #ccf;
    }

    .red {
      background: #f24a4a;
    }

    .purple {
      background: #eaafe3;
    }

    .orange {
      background: #f28e50;
    }

    ul.sticky_notes li.todo-item:not(.job-done):hover {
      -webkit-transform: scale(1.2);
      -moz-transform: scale(1.2);
      -o-transform: scale(1.2);
      position: relative;
      z-index: 10;
      -moz-box-shadow: 0px 10px 7px rgba(0, 0, 0, .7);
      -webkit-box-shadow: 0px 10px 7px rgba(0, 0, 0, .7);
      box-shadow: 0px 10px 7px rgba(0, 0, 0, .7);
      -webkit-transition: all 300ms ease-in 50ms; /* property duration timing-function delay */
      -moz-transition: all 300ms ease-in 50ms;
      -o-transition: all 300ms ease-in 50ms;
      transition: all 300ms ease-in 50ms;
      cursor: pointer;
    }

    .job-done {
      background: lightgray;
      text-decoration: line-through;
    }

    .job-done .item-button i, .job-done .item-button i:hover {
      color: #fff;
    }

    .job-done .done-btn {
      display: none;
    }

    .item-button {
      position: absolute;
      right: 20px;
      top: 15px;
    }

    .item-button i {
      color: #8e8e8e;
      cursor: pointer;

      -webkit-transition: all 200ms ease-in 50ms; /* property duration timing-function delay */
      -moz-transition: all 200ms ease-in 50ms;
      -o-transition: all 200ms ease-in 50ms;
      transition: all 200ms ease-in 50ms;
    }

    .item-button i:hover {
      color: #555;
    }

    .close-btn:hover {

      -o-transform: rotate(90deg);
      -webkit-transform: rotate(90deg);
      -moz-transform: rotate(90deg);

    }

    .item-add-li {
      width: 300px;
      height: 260px;
      padding: 20px;
      margin: 20px;
      float: left;
      position: relative;
      border: 4px dashed #8e8e8e;
    }

    .item-add {
      background: #8e8e8e;
      width: 100px;
      height: 100px;
      text-align: center;
      border-radius: 50px;
      cursor: pointer;
      margin: auto;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;

      -webkit-transition: all 100ms ease-in 50ms; /* property duration timing-function delay */
      -moz-transition: all 100ms ease-in 50ms;
      -o-transition: all 100ms ease-in 50ms;
      transition: all 100ms ease-in 50ms;

    }

    .item-add i {
      line-height: 100px;
      color: white;

    }

    .item-add:hover {
      -webkit-transform: scale(1.3);
      -moz-transform: scale(1.3);
      -o-transform: scale(1.3);

    }

    input[type='text'] {
      font-size: 24px;
      font-family: inherit;
      border: 0px;
      width: 100%;
      outline: none;
      cursor: pointer;
    }

    .division {
      margin: 5px 0;
      border-bottom: 1px dashed #8e8e8e;
    }

    .division.error {
      border-color: red;
    }

    textarea {
      width: 100%;
      height: 80px;
      border: none;
      outline: none;
      font-family: inherit;
      resize: none;
    }

    ul.color-picker {
      list-style: none;
      padding: 0;
      line-height: 40px;
      display: inline-block;
    }

    ul.color-picker::after {
      content: "020";
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
    }

    ul.color-picker li {
      float: left;
      margin-right: 5px;
      cursor: pointer;
    }

    .fa-yellow {
      color: #ffc;
    }

    .fa-green {
      color: #cfc;
    }

    .fa-blue {
      color: #ccf;
    }

    .fa-red {
      color: #f24a4a;
    }

    .fa-purple {
      color: #eaafe3;
    }

    .fa-orange {
      color: #f28e50;
    }

    .action-button {
      display: inline-block;
      float: right;
      line-height: 40px;
    }

    .action-button i {
      color: #8e8e8e;
      cursor: pointer;
      -webkit-transition: all 200ms ease-in 50ms; /* property duration timing-function delay */
      -moz-transition: all 200ms ease-in 50ms;
      -o-transition: all 200ms ease-in 50ms;
      transition: all 200ms ease-in 50ms;
    }

    .action-button i:hover {
      color: #555;
    }

    .remain-time {
      position: absolute;
      top: 15px;
    }

    .settings-box {
      position: absolute;
      top: 0;
      right: 0;
      width: 200px;
    }

    .settings-box > div {
      margin-bottom: 10px;
    }

    .settings-box i {
      margin-right: 10px;
      color: #8e8e8e;
    }
  }
</style>
