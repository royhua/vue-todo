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

export default i18nPlugin;
