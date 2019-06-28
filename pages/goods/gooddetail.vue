<template>
	<view class="gooddetail-root">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">{{ title }}</block>
		</cu-custom>
		<swiper  class="screen-swiper square-dot" indicator-dots="true" circular="true" autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item, index) in swiperList" :key="index"><image :src="item.pic" mode="aspectFill"></image></swiper-item>
		</swiper>
		<view class="content" v-html="content"></view>
	</view>
</template>

<script>
import { getGooddetail } from '../../api/index.js';

export default {
	data() {
		return {
			goodId: '',
			title: '',
			goodObj: null,
			content: '',
			swiperList :[],
			CustomBar: this.CustomBar
		};
	},
	onLoad(option) {
		this.goodId = option.id;
		this.getDetailContent();
	},
	methods: {
		getDetailContent() {
			getGooddetail({ id: this.goodId }).then(x => {
				if (x[1] && x[1].data && x[1].data.data) {
					this.goodObj = x[1].data.data;
					this.title = this.goodObj.basicInfo.name;
					this.content = this.goodObj.content;
					this.swiperList = this.goodObj.pics;
				}
			});
		}
	}
};
</script>

<style lang="less">
	.gooddetail-root{
		flex-direction: column;
		width: 100%;
	}
</style>
