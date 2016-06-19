import Vue from 'vue';
import App from './App';
import resource from './libs/resource';
import i18nPlugin from './libs/i18n';
import locale from './libs/locale.json';


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

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
});
