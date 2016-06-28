import Vue from 'vue';
import App from './App';
import i18nPlugin from './libs/i18n';
import locale from './libs/locale.json';
import router from './config/router';
var VueValidator = require('vue-validator');

Vue.use(VueValidator);
Vue.validator('email', function (val) {
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)
});
Vue.validator('equalTo', function (val, id) {
  return $('#'+id).val() === val;
});

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

router.start(App, '#app');
