"use strict";
const common_vendor = require("../common/vendor.js");
const uni_modules_uviewPlus_libs_luchRequest_core_Request = require("../uni_modules/uview-plus/libs/luch-request/core/Request.js");
require("../uni_modules/uview-plus/index.js");
const stores_user = require("../stores/user.js");
const uni_modules_uviewPlus_libs_function_index = require("../uni_modules/uview-plus/libs/function/index.js");
const http = new uni_modules_uviewPlus_libs_luchRequest_core_Request.Request();
const userStore = stores_user.useUserStore();
http.setConfig((config) => {
  config.timeout = 3e3;
  config.custom.retry = 3;
  config.custom.retryDelay = 1e3;
  config.custom.timeoutRetry = true;
  return config;
});
http.interceptors.request.use((config) => {
  var _a, _b;
  config.data = config.data || {};
  if (config.method == "POST") {
    config.header["Content-Type"] = "application/json";
    if (((_a = config == null ? void 0 : config.custom) == null ? void 0 : _a.auth) !== false && userStore.btoken) {
      config.data.btoken = userStore.btoken;
    }
  } else if (config.method == "GET") {
    config.params.btoken = userStore.btoken;
  }
  if ((_b = config == null ? void 0 : config.custom) == null ? void 0 : _b.baseURL) {
    config.baseURL = config.custom.baseURL;
  }
  if (config.baseURL == "/lhhy" && false) {
    config.baseURL = "//lhhy.dreamways.cn";
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
http.interceptors.response.use(async (response) => {
  var _a, _b;
  const config = (_a = response.config) == null ? void 0 : _a.custom;
  const res = response.data;
  common_vendor.index.__f__("log", "at utils/request.ts:53", res);
  if (res.code !== 200) {
    if (((_b = res == null ? void 0 : res.data) == null ? void 0 : _b.___go_to_login___) == 1)
      ;
    if ((config == null ? void 0 : config.toast) !== false) {
      uni_modules_uviewPlus_libs_function_index.toast(res.msg);
    }
    if (config == null ? void 0 : config.catch) {
      return Promise.reject(res);
    } else {
      return new Promise(() => {
      });
    }
  }
  return res === void 0 ? {} : res;
}, (error) => {
  error.config;
  uni_modules_uviewPlus_libs_function_index.toast("当前无网络，请检查您的网络设备");
  return Promise.reject(error);
});
exports.http = http;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/request.js.map
