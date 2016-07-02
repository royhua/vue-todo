<template>
  <div class="col-md-6 friend-search">
    <h3>添加好友</h3>
    <form @submit="keyword">
      <div class="form-group label-floating is-empty">
        <label class="control-label" for="addon2">输入用户名或昵称</label>
        <div class="input-group">
          <input type="text" id="addon2" class="form-control" v-model="keyword">
              <span class="input-group-btn">
                <button type="submit" class="btn btn-fab btn-fab-mini" @click="search">
                  <i class="material-icons">search</i>
                </button>
              </span>
        </div>
      </div>
    </form>
    <table class="table table-striped table-hover">
      <thead>
      <tr>
        <th>
          <div class="checkbox">
            <label>
              <input type="checkbox" v-model="selectAll">
            </label>
          </div>
        </th>
        <th>昵称</th>
        <th>Email</th>
      </tr>
      </thead>
      <tbody v-if="searchResult.length > 0">
        <tr v-for="item in searchResult">
          <td>
            <div class="checkbox">
              <label>
                <input type="checkbox" v-model="item.selected"><span class="checkbox-material"><span class="check"></span></span>
              </label>
            </div>
          </td>
          <td>{{item.nickName}}</td>
          <td>{{item.email}}</td>
        </tr>
      </tbody>
      <tbody v-if="searchResult.length === 0">
        <tr>
          <td colspan="3" style="text-align: center">
            没有找到结果，请重新输入关键字。
          </td>
        </tr>
      </tbody>
    </table>
    <a href="javascript:void(0)" class="btn btn-raised btn-primary" @click="addFriend" v-if="hasSelected"><i class="material-icons">add</i>&nbsp;&nbsp;添加好友</a>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:{
      onAdd: {
        type: Function,
        default: function(){

        }
      }
    },
    data(){
      return {
        keyword: '',
        searchResult: []
      }
    },
    methods: {
      search(){
        let keyword = this.keyword;
        if (keyword) {
          $.get('/api/users/search', {keyword}).then((result)=> {
            this.searchResult = result.map(function(item, i){
              return Object.assign({}, item, {
                selected: false
              });
            });
          });
        }
      },
      addFriend(){
        let addFriends = [];
        this.searchResult.forEach((item) => {
          if(item.selected){
            addFriends.push(item);
          }
        });
        if(addFriends.length > 0){
          this.onAdd(addFriends);
        }
      }
    },
    computed:{
      hasSelected(){
        let hasSelected = false;
        this.searchResult.forEach((item) => {
          hasSelected = hasSelected || item.selected;
        });
        return hasSelected;
      },
      selectAll:{
        set(val){
          this.searchResult.forEach((item) => {
            item.selected = val;
          });
        },
        get(){
          if(this.searchResult.length === 0){
            return false;
          } else {
            let selectedAll = true;
            this.searchResult.forEach((item) => {
              selectedAll = selectedAll && item.selected;
            });
            return selectedAll;
          }
        }
      }
    }
  }
</script>

<style>
  .friend-search .checkbox {
    margin: 0;
  }
</style>
