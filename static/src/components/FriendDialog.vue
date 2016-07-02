<template>
  <div class="modal friend-dialog" :style="showMe ? {'display': 'block'} : {}">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="showMe=false">×</button>
          <h4 class="modal-title">分享给好友</h4>
        </div>
        <div class="modal-body">
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
            <tbody>
            <tr v-for="item in searchResult">
              <td>
                <div class="checkbox">
                  <label>
                    <input type="checkbox" v-model="item.selected"><span class="checkbox-material"><span
                    class="check"></span></span>
                  </label>
                </div>
              </td>
              <td>{{item.nickName}}</td>
              <td>{{item.email}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal" @click="showMe=false">关闭</button>
          <button type="button" class="btn btn-primary" @click="share">分享</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    vuex: {
      getters: {
        list: ({friend}) => friend.all
      }
    },
    props: {
      showMe: {
        twoWay: true,
        default: false,
        type: Boolean
      },
      onShare: {
        type: Function,
        default: function(){}
      }
    },
    data(){
      return {
        searchResult: []
      }
    },
    ready(){
      $.material.init();
      $.material.ripples();
    },
    watch: {
      list(){
        this.searchResult = this.list.map(function(item){
          return Object.assign({}, item, {selected: false});
        });
      },
      showMe(){
        this.searchResult = this.list.map(function(item){
          return Object.assign({}, item, {selected: false});
        });
      }
    },
    methods:{
      share(){
        let friends = [];
        this.searchResult.forEach((item) => {
          if(item.selected){
            friends.push(item);
          }
        });
        if(friends.length > 0){
          this.onShare(friends);

        }
      }
    },
    computed:{
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
  .friend-dialog .checkbox {
    margin: 0;
  }
</style>
