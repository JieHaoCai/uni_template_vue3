<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<text>{{baseStore.app_name}}</text>
		<button @click="changeName">更改名称</button>
	</view>
</template>

<script lang="ts" setup>
import { useBaseStore } from '@/stores/base'
import {getHomeList,getAgentList,wechatPay} from '@/api/base'
import { onMounted, ref } from 'vue';

const baseStore = useBaseStore()
const title = ref("你好")



const changeName = ()=>{
	baseStore.updateAppName("名称已更改")
	getHomeList(1).then(res=>{
		console.log(res)
	})
}

</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
