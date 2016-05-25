
String.prototype.startWith=function(str){
    if(str==null||str==""||this.length==0||str.length>this.length)
        return false;
    if(this.substr(0,str.length)==str)
        return true;
    else
        return false;
    return true;
}

function resourceFactory(resourcePath){

    var Resource = function(data){
        Object.assign(this, data);
    };
    Resource.prototype.$data = function(){
        var pps = Object.getOwnPropertyNames(this);
        var purObject = {};
        var self = this;
        $.each(pps, function(){
            var p = this;
            if(!p.startWith('__')){
                purObject[p] = self[p];
            }
        });
        return purObject;
    };
    Resource.prototype.$save =  function(){
        var data = this.$data();
        return $.ajax({
            type: "post",
            url: resourcePath,
            data: data
        }).then(function(data){
            return new Resource(data);
        });
    };

    Resource.prototype.$update =  function(){
        var self = this;
        var data = this.$data();
        return $.ajax({
            type: "PUT",
            url: resourcePath,
            data: data,
        }).then(function(data){
            return this;
        });
    };

    Resource.prototype.$delete =  function(){
        return $.ajax({
            type: "delete",
            url: resourcePath+'/'+this._id
        });
    };

    return {
        all: function(){
            return $.get(resourcePath).then(function(ss){
                return $.map(ss, function(s){
                    return new Resource(s);
                });
            });
        },
        model: Resource
    };
}

var TodoResource = resourceFactory('/api/todos');

Vue.directive('datetimepicker', {
  bind: function () {
    $(this.el).datetimepicker();
  },
  update: function (newValue, oldValue) {
    
  },
  unbind: function () {
    $(this.el).datetimepicker('destroy');
  }
})


//{title: '', done: true, createDate: Date.now()}
var TodoItem = Vue.extend({
    template: '#itemDisplay',
    props: {
        item: {
            type: Object,
            require: true,
            default: function(){
                return {
                    
                };
            }
        }
    },
    data: function(){
        return {
            
        }
    },
    methods:{
        done: function(){
            this.item.done = true;
            this.item.$update();
        },
        deleteItem: function(){
            console.log('delete Item !');
            this.$dispatch('item-remove', this.item);
        }
    }
});

var ColorPicker = Vue.extend({
    template: '#colorPicker',
    props: ['color'],
    data: function(){
        if(!this.color){
            this.color='red';
        }
        return {
            colors: ['red', 'blue', 'purple', 'orange', 'yellow', 'green']
        }
    },
    methods:{
        selectIt: function(color){
            this.color = color;
        }   
    }
});

var ItemAdd = Vue.extend({
    template: '#itemAdd',
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
});

var Todo = Vue.extend({
    template: '#template',
    props: {
        list: {
            type: Array,
            default: function(){
                return []
            }
        }
    },
    data: function(){
        return {
           
        }
    },
    methods:{

    },
    components:{
        TodoItem: TodoItem,
        TodoAdd: ItemAdd
    },
    events:{
        'item-remove': function(item){
            let self = this;
            item.$delete().then(function(){
                self.list.$remove(item);
            });
        },
        'item-add': function(item){
            var self = this;
            new TodoResource.model(item).$save().then(function(resource){
                self.list.push(resource);
            });
        }
    }
});

new Vue({
    el: '#app',
    data: {
        list: []
    },
    created:function(){
        var self = this;
        TodoResource.all().then(function(result){
            self.list = result;
        })
    },
    components:{
        Todo: Todo
    }
});