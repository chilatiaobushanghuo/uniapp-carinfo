<template>
	<view class="welcome-root">
		<swiper style="width: 100%;height: 100%;" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item style="width: 100%;height: 100%;" v-for="(item, index) in imgs" :key="index">
				<view style="width: 100%;height: 100%;" class="swiper-item">
					<image :src="item" mode="aspectFit"></image>
					<button v-if="index == imgs.length - 1" class="endbtn cu-btn round lines-green" @tap="goMain">立即体验</button>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import { getJsonlist} from '../../api/index.js';
export default {
	data() {
		return {
			imgs: [
				'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555666433&di=17f373e54dcbd4084014966ebf977c56&imgtype=jpg&er=1&src=http%3A%2F%2Fs6.sinaimg.cn%2Fmw690%2F001HKLnwzy7ha27y5pz65%26amp%3B690',
				'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555071764267&di=53b1da9e90a0322b0bd54028ab91df4a&imgtype=0&src=http%3A%2F%2Fimg5q.duitang.com%2Fuploads%2Fitem%2F201507%2F04%2F20150704225410_SadYn.jpeg',
			]
		};
	},
	onLoad() {
		this.getSwiperData();
	},
	methods: {
		goMain() {
			uni.navigateTo({
				url: '../index/comp'
			});
		},
		getSwiperData() {
			var rqdata = {
				pageSize: 15,
				page: 1,
				type: 10
			};
			getJsonlist(rqdata).then(x => {
				this.imgs = x[1].data.data.map(x=>x.jsonData.img);
			});
		}
	}
};
</script>

<style lang="less">
.welcome-root {
	width: 100%;
	.swiper-item {
		.endbtn {
			position: absolute;
			bottom: 100upx;
			width: 200upx;
			left: 0;
			right: 0;
			margin-left: auto;
			margin-right: auto;
		}
	}
}
</style>
