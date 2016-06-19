String.prototype.startWith=function(str){
  if(str==null||str==""||this.length==0||str.length>this.length)
    return false;
  if(this.substr(0,str.length)==str)
    return true;
  else
    return false;
  return true;
}


function genUid(){
  return new Date().getTime()+""+Math.floor(Math.random()*899+100);
}

var uid = genUid();

var client = (function initIO(){
  var socket = io.connect();
  socket.emit('register', {uid: uid});
  return socket;
})();

export default function resourceFactory(resourcePath){

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

      client.on(resourcePath, function(result){
        if(result.uid !== uid){
          callback(wrapper(result.data));
        }
      });
    },
    model: Resource
  };
}
