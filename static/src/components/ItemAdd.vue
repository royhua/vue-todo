<template>
  <li class="item-add-li">
    <div class="item-add" @click="openDialog" v-show="!showDialog">
      <i class="fa fa-5x fa-plus" aria-hidden="true"></i>
    </div>
    <div class="dialog" v-show="showDialog">
      <input type='text' placeholder="{{$i(locale, 'Input the title')}}" v-model="data.title" />
      <div class="division" :class="{'error': error.title}"></div>
      <textarea placeholder="{{$i(locale, 'Input the desc')}}" v-model="data.desc"></textarea >
      <div class="division" :class="{'error': error.desc}"></div>
      <input type="text" v-datetimepicker placeholder="{{$i(locale, 'Finished time')}}" v-model="data.finishedTime">
      <div class="division" :class="{'error': error.title}"></div>
      <color-picker :color.sync="data.color" :locale="locale"></color-picker>
      <div class="action-button">
        <i class="fa fa-check fa-lg" @click="save"></i>
        <i class="fa fa-close fa-lg" @click="cancel"></i>
      </div>
    </div>
  </li>
</template>
<style>
</style>
<script>
  import ColorPicker from './ColorPicker.vue';
    export default{
      template: '#itemAdd',
      props: ['locale'],
      data: function(){
        return {
          showDialog: false,
          data: {
            title: '',
            desc: '',
            finishedTime: '',
            color: 'red'
          },
          error: {
            title: false,
            desc: false,
            finishedTime: false
          }
        }
      },
      watch: {
        'data.title': function(){
          this.error.title = false
        },
        'data.desc': function(){
          this.error.desc = false
        },
        'data.finishedTime': function(){
          this.error.finishedTime = false
        }
      },
      methods:{
        openDialog: function(){
          this.showDialog = true;
        },
        cancel: function(){
          this.showDialog = false;
        } ,
        save: function(){
          var self = this;
          function checkEmpty(field){
            if(!self.data[field]){
              self.error[field] = true
              return true;
            }
            return false;
          }
          var checkResultTitle = checkEmpty('title');
          var checkResultDesc = checkEmpty('desc');
          var checkResultFinishedTime = checkEmpty('finishedTime');


          if(!checkResultTitle && !checkResultDesc && !checkResultFinishedTime){
            var newItem = {
              title: this.data.title,
              desc: this.data.desc,
              finishedTime: new Date(this.data.finishedTime).getTime(),
              color: this.data.color
            }
            this.$dispatch('item-add', newItem);
            this.data.title = '';
            this.data.desc = '';
            this.data.finishedTime = '';
            this.data.color = 'red';
            this.showDialog = false;
          }
        }
      },
      components:{
        ColorPicker: ColorPicker
      }
    }
</script>
