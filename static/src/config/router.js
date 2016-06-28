import VueRouter from 'vue-router';
import Vue from 'vue';
import {isLogin} from '../vuex/getters';
import routerMap from './routerMap';

Vue.use(VueRouter);

var router = new VueRouter();

router.map(routerMap);
router.redirect({
  '/':"/index"
});

router.beforeEach(function (transition) {
  if (transition.to.auth && !isLogin()) {
    transition.redirect({
      name: 'login'
    });
  } else {
    transition.next();
  }
});

router.afterEach(function (transition) {

});

export default router;
