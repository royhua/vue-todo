var storage = window.localStorage;

var session = {
  state: {
    user: null
  },
  login: function (user) {
    this.state.user = user;
    storage.setItem('user', JSON.stringify(user));
  },
  logout: function () {
    this.state.user = null;
    storage.removeItem('user');
  },
  isLogin: function () {
    return this.state.user !== null;
  },
  init: function(){
    let userStr = storage.getItem('user');
    if(userStr){
      this.state.user = JSON.parse(userStr);
    }
  }
};

session.init();

export default session;
