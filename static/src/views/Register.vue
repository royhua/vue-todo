<template>
  <div class="panel panel-primary login">
    <div class="panel-heading">Register</div>
    <div class="panel-body">
      <form class="form-horizontal">
        <div class="form-group">
          <label for="inputEmail3" class="col-sm-4 control-label">Email</label>
          <div class="col-sm-8">
            <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
          </div>
        </div>
        <div class="form-group">
          <label for="nickName" class="col-sm-4 control-label">Nick Name</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="nickName" placeholder="Nick Name">
          </div>
        </div>
        <div class="form-group">
          <label for="inputPassword3" class="col-sm-4 control-label">Password</label>
          <div class="col-sm-8">
            <input type="password" class="form-control" id="inputPassword3" placeholder="Password">
          </div>
        </div>
        <div class="form-group">
          <label for="confirmPassword" class="col-sm-4 control-label">Confirm Password</label>
          <div class="col-sm-8">
            <input type="password" class="form-control" id="confirmPassword" placeholder="Confirm Password">
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

    },
    created: function () {

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
