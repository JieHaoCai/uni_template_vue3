"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const stores_base = require("../../stores/base.js");
const api_base = require("../../api/base.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const baseStore = stores_base.useBaseStore();
    common_vendor.ref("你好");
    const changeName = () => {
      baseStore.updateAppName("名称已更改");
      api_base.getHomeList(1).then((res) => {
        common_vendor.index.__f__("log", "at pages/index/index.vue:22", res);
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.t(common_vendor.unref(baseStore).app_name),
        c: common_vendor.o(changeName)
      };
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
