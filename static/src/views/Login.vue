<template>
  <div class="panel panel-primary login">
    <div class="panel-heading">Login in</div>
    <div class="panel-body">
      <form class="form-horizontal" @submit="submit">
        <div class="form-group">
          <label for="inputEmail3" class="col-sm-4 control-label">Email</label>
          <div class="col-sm-8">
            <input type="email" class="form-control" id="inputEmail3" placeholder="Email" v-model="email">
          </div>
        </div>
        <div class="form-group">
          <label for="inputPassword3" class="col-sm-4 control-label">Password</label>
          <div class="col-sm-8">
            <input type="password" class="form-control" id="inputPassword3" placeholder="Password" v-model="password">
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-4 col-sm-8">
            <button type="submit" class="btn btn-default">Sign in</button>
            <a class="btn btn-default" v-link="{name: 'register'}">Register</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import session from '../libs/session';
  export default {
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
        let self = this;
        let {email, password} = this;
        $.ajax({
          url: '/api/users/login',
          type: "post",
          data: {
            email,
            password
          }
        }).then(function(user){
          if(user.state === false){
            alert('login fail!');
          } else {
            session.login(user);
            self.$router.go({name: 'todoList'});
          }
        });
        return false;
      }
    },
    components: {}
  }
</script>

<style scoped>
  .login {
    width: 400px;
    margin: 300px auto;
  }
</style>
