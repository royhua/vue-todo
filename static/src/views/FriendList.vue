<template>
  <div>
    <table class="table table-striped table-hover ">
      <thead>
      <tr>
        <th>#</th>
        <th>昵称</th>
        <th>Email</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in list">
        <td>{{$index+1}}</td>
        <td>{{item.nickName}}</td>
        <td>{{item.email}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    vuex: {
      getters: {
        list: ({friend}) => friend.all
      }
    }
  }
</script>
