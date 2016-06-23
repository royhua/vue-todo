import Vue from 'vue';
import App from './App';
import resource from './libs/resource';
import i18nPlugin from './libs/i18n';
import locale from './libs/locale.json';
import VueRouter from 'vue-router';
import routerMap from './libs/routerMap';
import session from './libs/session';


var TodoResource = resource('/api/todos');
Vue.prototype.$TodoResource = TodoResource;

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

Vue.locale(locale);
Vue.config.debug = true;

Vue.use(VueRouter);

var router = new VueRouter();

router.map(routerMap);
router.redirect({
  '/':"/index"
});

router.beforeEach(function (transition) {
  if (transition.to.auth && !session.isLogin()) {
    transition.redirect({
      name: 'login'
    });
  } else {
    transition.next();
  }
});

router.start(App, '#app');
