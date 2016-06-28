<template>
  <div class="panel panel-primary register">
    <div class="panel-heading">Register</div>
    <div class="panel-body">
      <form class="form-horizontal" @submit="submit">
        <div class="form-group">
          <label for="inputEmail3" class="col-sm-3 control-label">Email</label>
          <div class="col-sm-9">
            <input type="email" class="form-control" id="inputEmail3" placeholder="Email" v-model="email" required @change="change">
          </div>
        </div>
        <div class="form-group">
          <label for="nickName" class="col-sm-3 control-label">Nick Name</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="nickName" placeholder="Nick Name" v-model="nickName" required>
          </div>
        </div>
        <div class="form-group">
          <label for="inputPassword3" class="col-sm-3 control-label">Password</label>
          <div class="col-sm-9">
            <input type="password" class="form-control" id="inputPassword3" placeholder="Password" v-model="password" required minLength="6">
          </div>
        </div>
        <div class="form-group">
          <label for="confirmPassword" class="col-sm-3 control-label">Confirm Password</label>
          <div class="col-sm-9">
            <input type="password" class="form-control" id="confirmPassword" placeholder="Confirm Password"
                   v-model="confirmPassword" required minLength="6">
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-3 col-sm-9">
            <button type="submit" class="btn btn-raised">Save</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return {
        email: '',
        nickName: '',
        password: '',
        confirmPassword: ''
      }
    },
    ready: function () {
      $.material.init();
      $.material.ripples();
    },
    methods: {
      change(){
        $("#inputEmail3").get(0).setCustomValidity("");
      },
      submit(){
        if(this.password !== this.confirmPassword){
          $("#confirmPassword").get(0).setCustomValidity("两次输入的密码不匹配");
          return false;
        }
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
        }).then((result) => {
          if(result.state === false){
            $("#inputEmail3").get(0).setCustomValidity("Email已经存在。");
          } else {
            self.$router.go({name: 'login'});
            console.log(result);
          }

        });
        return false;
      }
    },
    components: {}
  }
</script>

<style>
  .register {
    width: 600px;
    margin: 100px auto;
  }
</style>
