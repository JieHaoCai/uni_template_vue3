import Request from '@/uni_modules/uview-plus/libs/luch-request/index.js'
import type { HttpRequestConfig,HttpResponse,HttpError } from '@/uni_modules/uview-plus/libs/luch-request'
import {
	toast
} from '@/uni_modules/uview-plus'
import {getUserStore} from '@/stores/user'
const http = new Request()

// 初始化请求配置
http.setConfig((config: HttpRequestConfig) => {
	/* config 为默认全局配置*/
	config.timeout = 3000 //超时时间
	config.custom.retry = 3 //设置全局重试请求次数（最多重试几次请求）
	config.custom.retryDelay = 1000 //设置全局请求间隔
	config.custom.timeoutRetry = true
	return config
})

// 请求拦截
http.interceptors.request.use((config:HttpRequestConfig) => {
	// 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
	config.data = config.data || {}

	// 当为post请求时候，Content-Type 为application/x-www-form-urlencoded
	const userStore = getUserStore()
	if (config.method == 'POST') {
		config.header['Content-Type'] = 'application/json'
		// 根据custom参数中配置的是否需要token，添加对应的请求头
		if (config?.custom?.auth !== false && userStore.btoken) {
			config.data.btoken = userStore.btoken
		}
	}else if(config.method == 'GET'){
		config.params.btoken = userStore.btoken
	}
	// 根据custom参数中配置的是否需要baseURL，添加对应的请求头
	if (config?.custom?.baseURL) {
		config.baseURL = config.custom.baseURL
	}
	//如果是联合会员的域名
	if(config.baseURL == "/lhhy" &&  process.env.NODE_ENV !== 'development'){
		  config.baseURL = '//lhhy.dreamways.cn'
	} 
	
	return config
}, (error:HttpError) => {
	return Promise.reject(error)
})

// 响应拦截
http.interceptors.response.use(async (response:HttpResponse) => {
	const config = response.config?.custom
	const res = response.data
		console.log(res)
	if (res.code !== 200) {
		if (res?.data?.___go_to_login___ == 1) {
			// await store.dispatch('logOut')
			// await store.dispatch('loginByCode')
			// return http[response.config.method.toLowerCase()](response.config.fullPath, response.config
			// 	.data)
		}

		// 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
		if (config?.toast !== false) {
			toast(res.msg)
		}
		// 如果需要catch返回，则进行reject
		if (config?.catch) {
			return Promise.reject(res)
		} else {
			// 否则返回一个pending中的promise，请求不会进入catch中
			return new Promise(() => {})
		}
	}
	return res === undefined ? {} : res
}, (error:HttpError) => {

	const config = error.config


	toast('当前无网络，请检查您的网络设备')
	return Promise.reject(error)
})
export default http