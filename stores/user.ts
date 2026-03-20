import { defineStore } from 'pinia';

export const useUserStore = defineStore('user',{
	state: ()=>{
		return{
			btoken: "9999"
		}
	},
	actions:{

	}
})

/** 懒加载获取 store，可在非组件文件中安全使用 */
export const getUserStore = () => useUserStore()