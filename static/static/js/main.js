

function genUid(){
    return new Date().getTime()+""+Math.floor(Math.random()*899+100);
}

var uid = genUid();

var io = (function initIO(){
 var socket = io.connect();
 socket.emit('register', {uid: uid});
 return socket;
})();

function resourceFactory(resourcePath){

    var Resource = function(data){
        $.extend(this, data);
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
            headers: {
                uid: uid
            },
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
            headers: {
                uid: uid
            },
            data: data,
        }).then(function(data){
            return this;
        });
    };

    Resource.prototype.$delete =  function(){
        return $.ajax({
            type: "delete",
            headers: {
                uid: uid
            },
            url: resourcePath+'/'+this._id
        });
    };

    function wrapper(list){
        return $.map(list, function(s){
            return new Resource(s);
        });
    }

    return {
        all: function(callback){
            $.ajax({
                type: "get",
                url: resourcePath,
                headers: {
                    uid: uid
                }
            }).then(function(list){
                callback(wrapper(list));
            });

            io.on(resourcePath, function(result){
                if(result.uid !== uid){
                    callback(wrapper(result.data));
                }
            });
        },
        model: Resource
    };
}

var TodoResource = resourceFactory('/api/todos');

var i18nPlugin = {
  install: function (Vue, options) {
        var locale = {};
        Vue.locale = function(localeOpt){
            locale = localeOpt;
        };

        Vue.prototype.$i = function(localeStr, key){
            return locale[localeStr] && locale[localeStr][key];
        };
    }
};

Vue.directive('datetimepicker', {
  bind: function () {
    $(this.el).datetimepicker({
        minDate: new Date(),
        defaultDate: new Date(),
        step:5
    });
  },
  update: function (newValue, oldValue) {

  },
  unbind: function () {
    $(this.el).datetimepicker('destroy');
  }
});

Vue.use(i18nPlugin);

Vue.locale({
    "en": {
        "Allow Notification": "Allow Notification",
        "Todo Tasks": "Todo Tasks",
        "Input the title": "Input the title",
        "Input the desc": "Input the desc",
        "Finished time": "Finished time",
        "Your browser not support this function.": "Your browser not support this function."
    },
    "zh": {
        "Allow Notification": "允许推送",
        "Todo Tasks": "待办任务",
        "Input the title": "输入标题",
        "Input the desc": "输入描述",
        "Finished time": "结束时间",
        "Your browser not support this function.": "你的浏览器不支持该功能。"
    }
});


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
        },
        locale: String
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
});

var NotificationAllow = Vue.extend({
    template: '#notificationAllow',
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
            locale: 'en'
        }
    },
    methods:{
        selectThis: function(locale){
            this.locale = locale;
        }
    },
    components:{
        TodoItem: TodoItem,
        TodoAdd: ItemAdd,
        NotificationAllow: NotificationAllow
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
                resource.remainTime = moment(resource.finishedTime).fromNow();
                self.list.push(resource);
            });
        }
    }
});

function notification(item){
    if (window.Notification){
        if(Notification.permission==='granted'){
            var notification = new Notification(item.title,{
                body: item.desc,
                icon: '/img/todo.png'
            });
        }
    }
}

new Vue({
    el: '#app',
    data: {
        list: []
    },
    created:function(){
        var self = this;

        TodoResource.all(function(result){
            $.each(result, function(){
                this.remainTime = moment(this.finishedTime).fromNow();
            });
            self.list = result;
        });

        setInterval(function(){
            $.each(self.list, function(i){
                this.remainTime = moment(this.finishedTime).fromNow();

                var a = moment(this.finishedTime);
                var b = moment();
                if(Math.abs(a.diff(b)) < 60 * 1000 && !this.isNotified){
                    notification(this);
                    this.isNotified = true;
                }
            });
        }, 1000);

    },
    components:{
        Todo: Todo
    }
});
