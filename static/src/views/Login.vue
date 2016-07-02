<template>
  <div class="panel panel-primary login">
    <div class="panel-heading">登陆</div>
    <div class="panel-body">
      <form class="form-horizontal" @submit="submit">
        <div class="form-group">
          <label for="inputEmail3" class="col-sm-3 control-label">Email</label>
          <div class="col-sm-9">
            <input type="email" class="form-control" id="inputEmail3" placeholder="Email" v-model="email" required>
          </div>
        </div>
        <div class="form-group">
          <label for="inputPassword3" class="col-sm-3 control-label">密码</label>
          <div class="col-sm-9">
            <input type="password" class="form-control" id="inputPassword3" placeholder="密码" v-model="password" required>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-3 col-sm-9">
            <button type="submit" class="btn btn-raised">登陆</button>
            <a class="btn btn-raised" v-link="{name: 'register'}">注册</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {login} from '../vuex/actions';
  export default {
    vuex:{
      actions: {
        login
      }
    },
    data(){
      return {
        email:'',
        password:''
      }
    },
    created: function () {

    },
    methods:{
      submit(){
        let {email, password} = this;
        $.ajax({
          url: '/api/users/login',
          type: "post",
          data: {
            email,
            password
          }
        }).then((user) => {
          if(user.state === false){
            alert('login fail!');
          } else {
            this.login(user);
            this.$router.go({name: 'todoList'});
          }
        });
        return false;
      }
    },
    components: {}
  }
</script>

<style>
  .login {
    width: 450px;
    margin: 200px auto;
  }
</style>
