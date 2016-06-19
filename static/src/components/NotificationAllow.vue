<template>
  <div class="notification-allow" @click="allowIt">
    <i :class="['fa', allow ? 'fa-check-square' : 'fa-square']"></i> {{$i(locale, 'Allow Notification')}}
  </div>
</template>
<style>
</style>
<script>
    export default{
      props: {
        locale: String
      },
      data: function(){
        var allow = Notification && Notification.permission==='granted';
        return {
          allow: allow
        }
      },
      methods: {
        allowIt: function(){
          var self = this;
          if (window.Notification){
            Notification.requestPermission(function(r){
              if(r === 'granted'){
                self.allow = true;
              } else {
                self.allow = false;
              }
            });
          } else {
            alert(this.$i("Your browser not support this function."));
          }
        }
      }
    }
</script>
