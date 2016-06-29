<template>
    <div>
      <todo :list="list"></todo>
    </div>
</template>

<script type="text/ecmascript-6">
  import Todo from './../components/Todo.vue';
  export default {
    vuex:{
      getters: {
        list: ({todo}) => todo.owner
      }
    },
    components: {
      Todo: Todo
    }
  }
</script>
