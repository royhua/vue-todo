<template>
  <div class="panel panel-primary login">
    <div class="panel-heading">Register</div>
    <div class="panel-body">
      <form class="form-horizontal" @submit="submit">
        <div class="form-group">
          <label for="inputEmail3" class="col-sm-4 control-label">Email</label>
          <div class="col-sm-8">
            <input type="email" class="form-control" id="inputEmail3" placeholder="Email" v-model="email">
          </div>
        </div>
        <div class="form-group">
          <label for="nickName" class="col-sm-4 control-label">Nick Name</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="nickName" placeholder="Nick Name" v-model="nickName">
          </div>
        </div>
        <div class="form-group">
          <label for="inputPassword3" class="col-sm-4 control-label">Password</label>
          <div class="col-sm-8">
            <input type="password" class="form-control" id="inputPassword3" placeholder="Password" v-model="password">
          </div>
        </div>
        <div class="form-group">
          <label for="confirmPassword" class="col-sm-4 control-label">Confirm Password</label>
          <div class="col-sm-8">
            <input type="password" class="form-control" id="confirmPassword" placeholder="Confirm Password"
                   v-model="confirmPassword">
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-4 col-sm-8">
            <button type="submit" class="btn btn-default">Save</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        email: '',
        nickName: '',
        password: '',
        confirmPassword: ''
      }
    },
    created: function () {

    },
    methods: {
      submit(){
        console.log(this.email);
        console.log(this.nickName);
        console.log(this.password);
        console.log(this.confirmPassword);
        let self = this;
        let {email, nickName, password, confirmPassword} = this;
        $.ajax({
          url: '/api/users',
          type: "post",
          data: {
            email,
            nickName,
            password
          }
        }).then(function(result){
          self.$router.go({name: 'login'});
          console.log(result);
        });
        return false;
      }
    },
    components: {}
  }
</script>

<style scoped>
  .login {
    width: 600px;
    margin: 300px auto;
  }
</style>
