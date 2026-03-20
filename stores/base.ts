
import { defineStore } from 'pinia';

export const useBaseStore = defineStore('base',{
	state: ()=>{
		return{
			app_name: "uniapp+vue3+ts模版",
			requestUrl: process.env.NODE_ENV === 'development'? '/yqapi' : '',
			xprequestUrl:  process.env.NODE_ENV === 'development'? 'dev-lt' : 'lt',
		}
	},
	actions:{
		updateAppName(app_name:string){
			this.app_name = app_name
		}
	}
})

/** 懒加载获取 store，可在非组件文件中安全使用 */
export const getBaseStore = () => useBaseStore()