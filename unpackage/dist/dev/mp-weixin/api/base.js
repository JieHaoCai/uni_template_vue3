"use strict";
const utils_request = require("../utils/request.js");
const stores_base = require("../stores/base.js");
const baseStore = stores_base.useBaseStore();
const getHomeList = (type) => utils_request.http.get("/migu/aiMarathon/aiHomeTemplateList", {
  params: {
    "type": type
  },
  custom: {
    auth: true,
    baseURL: baseStore.requestUrl
  }
});
exports.getHomeList = getHomeList;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/base.js.map
