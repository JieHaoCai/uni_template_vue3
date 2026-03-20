
import http from "@/utils/request";
import { getBaseStore } from "@/stores/base";

//获取列表
export const getHomeList = (type: 1|2) => {
	const baseStore = getBaseStore()
	return http.get('/migu/aiMarathon/aiHomeTemplateList', {
		params:{
			'type': type
		},
		custom: {
			auth: true,
			baseURL: baseStore.requestUrl,
		},
	})
}


//签约支付
export const wechatPay = (data) => http.post("/api/wechat/pay-order",data, {
  custom: {
	baseURL:"/lhhy",
    auth: false,
    toast: true,
  }
});


export const getAgentList = (data) => {
	const baseStore = getBaseStore()
	return http.post('/migu/aiMarathon/aiHomeTemplateList', data, {
		custom: {
			auth: true,
			baseURL: baseStore.requestUrl,
		}
	})
}
