<template>
	<view class="cu-card case no-card">
		<view class="cu-item shadow" v-for="(item, index) in goodslist" v-if="item" :key="index" @tap="goDetail(item)">
			<view class="image">
				<image :src="item.pic" mode="widthFix"></image>
				<view class="cu-tag bg-blue">{{ item.name }}</view>
				<view class="cu-bar bg-shadeBottom"><text class="text-cut">我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。</text></view>
			</view>
			<view class="cu-list menu-avatar">
				<view class="cu-item">
					<!-- background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg); -->
					<view class="cu-avatar round lg" :style="{ 'background-image': 'url(' + item.pic }"></view>
					<view class="content flex-sub">
						<!-- <view class="text-grey">正义天使 凯尔</view> -->
						<view class="text-gray text-sm flex justify-between">
							<!-- 十天前 -->
							<view class="text-gray text-sm">
								<text class="icon-attentionfill margin-lr-xs"></text>
								10
								<text class="icon-appreciatefill margin-lr-xs"></text>
								20
								<text class="icon-messagefill margin-lr-xs"></text>
								30
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getCategory } from '../../api/index.js';
import { mapActions, mapGetters } from 'vuex';
export default {
	data() {
		return {};
	},
	computed: {
		...mapGetters({
			goodslist: 'goodslist'
		})
	},
	watch: {},
	created() {},
	methods: {
		goDetail(item) {
			uni.navigateTo({
				url: '../../pages/goods/gooddetail?id=' + item.id
			});
		}
	}
};
</script>

<style lang="less"></style>
