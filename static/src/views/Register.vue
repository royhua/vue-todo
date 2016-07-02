<template>
  <div class="panel panel-primary register">
    <div class="panel-heading">注册</div>
    <div class="panel-body">
      <form class="form-horizontal" @submit="submit">
        <div class="form-group">
          <div class="col-sm-12">
            <input type="email" class="form-control" id="inputEmail3" placeholder="Email" v-model="email" required @change="change">
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-12">
            <input type="text" class="form-control" id="nickName" placeholder="昵称" v-model="nickName" required>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-12">
            <input type="password" class="form-control" id="inputPassword3" placeholder="密码" v-model="password" required minLength="6">
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-12">
            <input type="password" class="form-control" id="confirmPassword" placeholder="确认密码"
                   v-model="confirmPassword" required minLength="6">
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-12">
            <button type="submit" class="btn btn-raised">注册</button>
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
