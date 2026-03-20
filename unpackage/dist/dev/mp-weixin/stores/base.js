"use strict";
const common_vendor = require("../common/vendor.js");
const useBaseStore = common_vendor.defineStore("base", {
  state: () => {
    return {
      app_name: "uniapp+vue3+ts模版",
      requestUrl: "/yqapi",
      xprequestUrl: "dev-lt"
    };
  },
  actions: {
    updateAppName(app_name) {
      this.app_name = app_name;
    }
  }
});
exports.useBaseStore = useBaseStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/base.js.map
