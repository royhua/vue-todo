<template>
  <div>
    <todo :list="list" :shared="true"></todo>
  </div>
</template>

<script type="text/ecmascript-6">
  import Todo from './../components/Todo.vue';
  export default {
    vuex:{
      getters: {
        list: ({todo}) => todo.shared
      }
    },
    components: {
      Todo: Todo
    }
  }
</script>
