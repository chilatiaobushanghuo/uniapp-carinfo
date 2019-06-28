<template>
	<scroll-view scroll-x="true" class="bg-white nav text-center" scroll-with-animation="true" :scroll-left="scrollLeft">
		<view class="cu-item" v-for="(item, index) in categorys" :class="{ 'text-green cur': activeTabIndex == index }" :key="index" @tap="tabSelect(item, index)">
			{{ item.name }}
		</view>
	</scroll-view>
</template>

<script>
import { getCategory } from '../../api/index.js';
import {mapActions,mapGetters} from 'vuex';
export default {
	data() {
		return {
			scrollLeft: 0,
			categorys: [],
			activeTabIndex: 0
		};
	},
	created() {
		this.getGoodsCategory();
	},
	methods: {
		...mapActions({
			setCategoryIdAction:'setCategoryIdAction'
		}),
		tabSelect(item, index) {
			this.activeTabIndex = index;
			this.scrollLeft = index * 60;
			this.setCategoryIdAction(item.id);
		},
		getGoodsCategory() {
			getCategory().then(x => {
				this.categorys = x[1].data.data;
			});
		},
	
	}
};
</script>

<style lang="less"></style>
