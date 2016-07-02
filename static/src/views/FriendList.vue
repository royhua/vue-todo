<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <h3>我的好友</h3>
        <table class="table table-striped table-hover">
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
      <friend-search :on-add="addFriends"></friend-search>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import FriendSearch from '../components/FriendSearch.vue';
  import {addFriend} from '../vuex/actions';
  export default {
    vuex: {
      getters: {
        list: ({friend}) => friend.all,
        user: ({user}) => user.current
      },
      actions: {
        addFriend
      }
    },
    data(){
      return {
      }
    },
    methods: {
      addFriends(friends){
        let self = this;
        let friendIds = friends.map((item) => item._id);
        $.get(`/api/users/${this.user._id}/friends/add`, {friendIds}).then(function(result){
          if(result){
            result.forEach(function(fId){
              friends.forEach(function(user){
                if(user._id === fId){
                  self.addFriend(user);
                }
              });
            });
          }
        });
      }
    },
    components:{
      FriendSearch
    }
  }
</script>

<style>
  .half {
    width: 50%;
    display: inline-block;
  }
</style>
