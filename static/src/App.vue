<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import store from './vuex/store';
  import initState from './vuex/initState';
  import {login} from './vuex/actions';

  export default {
    store,
    vuex: {
      actions: {
        login
      }
    },
    data(){
    },
    created: function () {
      let {user} = initState;
      if (user) {
        this.login(user.current);
      }
    },
    components: {

    }
  }
</script>

<style>

</style>
