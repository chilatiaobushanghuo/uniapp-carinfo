<template>
	<view class="goods-index-root" style="width: 100%;">
		<swiper class="screen-swiper square-dot" indicator-dots="true" circular="true" autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.picUrl" mode="aspectFill" ></image>
			</swiper-item>
		</swiper>
		<goods></goods>
		<goodslist></goodslist>
	</view>
</template>

<script>
import { getCategory,getBannerlist } from '../../api/index.js';
import goods from './goods.vue';
import goodslist from './goodslist.vue';
export default {
	data() {
		return {
			scrollLeft: 0,
			categorys: [],
			activeTabIndex: 0,
			swiperList:[],
		};
	},
	components: {
		goods,
		goodslist
	},
	created() {
		this.getBannerData();
	},
	methods: {
		tabSelect(item, index) {
			this.activeTabIndex = index;
			this.scrollLeft = index * 60;
		},
		getBannerData(){
			getBannerlist().then(x=>{
				this.swiperList = x[1].data.data;
			})
		}
	}
};
</script>

<style lang="less">
	.goods-index-root{
		display: flex;
		flex-direction: column;
	}
</style>
