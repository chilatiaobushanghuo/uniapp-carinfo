<template>
	<view class="index-root">
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="content">{{ title }}</block>
		</cu-custom>
		<goods v-if="actionIndex == 1"></goods>
		<infolist key="1" id="1" v-else-if="actionIndex == 2" :list="carlist"></infolist>
		<infolist key="2" id="2" v-else-if="actionIndex == 3" :list="personlist"></infolist>
		<infolist key="3" id="3" v-else-if="actionIndex == 4" :list="otherlist"></infolist>
		<view class="cu-bar"></view>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="cu-bar tabbar bg-black" style="width: 100%;">
				<view class="action" v-bind:class="{ 'text-green': actionIndex == 1, 'text-gray': actionIndex != 1 }" @tap="NavChange(1)">
					<view class="icon-homefill"></view>
					信
				</view>
				<view class="action" v-bind:class="{ 'text-green': actionIndex == 2, 'text-gray': actionIndex != 2 }" @tap="NavChange(2)">
					<view class="icon-similar"></view>
					车
				</view>
					<view class="action text-gray add-action">
					<button class="cu-btn icon-add bg-green shadow" @tap="publishbtn"></button>
					发布
				</view>
				<view class="action" v-bind:class="{ 'text-green': actionIndex == 3, 'text-gray': actionIndex != 3 }" @tap="NavChange(3)">
					<view class="icon-similar"><view class="cu-tag badge"></view></view>
					人
				</view>
				<view class="action" v-bind:class="{ 'text-green': actionIndex == 4, 'text-gray': actionIndex != 4 }" @tap="NavChange(4)">
					<view class="icon-my"><view class="cu-tag badge"></view></view>
					杂
				</view>
			</view>
		</view>

		<publish :isshow="isshowpublish" ref="publish"></publish>
	</view>
</template>
<script>
// <!-- <news v-if="actionIndex == 1" :list="newslist"></news> -->
import news from '../new/new.vue';
import hot from '../hot/hot.vue';
import tag from '../tag/tag.vue';
import infolist from '../infolist/infolist.vue';
import publish from '../publish/publish.vue';
import goods from '../goods/index.vue';
import { getJsonlist, getCategory, getGoodslist, deleteJsonData } from '../../api/index.js';
import { mapActions, mapGetters } from 'vuex';
export default {
	data() {
		return {
			actionIndex: 1, //底部菜单
			newslist: [],
			fetchPageNum: 1,
			refreshing: true,
			carlist: [],
			personlist: [],
			otherlist: [],
			isshowpublish: false,
			title: '所谓伊人，在水一方',
			interstitialAd: null
		};
	},
	components: {
		news,
		hot,
		tag,
		infolist,
		publish,
		goods
	},
	computed: {
		...mapGetters({
			categoryId: 'categoryId',
			goodslist: 'goodslist'
		})
	},
	onReachBottom() {
		console.log('滑动到页面底部comp');
		switch (this.actionIndex) {
			case 1:
				this.getGoodsList();
				break;
			case 2:
				this.getCarsData();
				break;
			case 3:
				this.getPersonData();
				break;
			case 4:
				this.getOtherData();
				break;
		}
	},
	onPullDownRefresh() {
		console.log('下拉刷新');
		switch (this.actionIndex) {
			case 1:
				this.getGoodsList();
				break;
			case 2:
				this.getCarsData();
				break;
			case 3:
				this.getPersonData();
				break;
			case 4:
				this.getOtherData();
				break;
		}
		this.refreshing = true;
	},
	onLoad() {
		this.getGoodsList();
		this.getCarsData();
		this.getPersonData();
		this.getTitleData();
		this.getOtherData();
		// // 在页面中定义插屏广告
		// let interstitialAd = null;

		// 在页面onLoad回调事件中创建插屏广告实例
		// if (wx.createInterstitialAd) {
		// 	this.interstitialAd = wx.createInterstitialAd({
		// 		adUnitId: 'adunit-097780406abf5cb8'
		// 	});
		// 	this.interstitialAd.onLoad(() => {});
		// 	this.interstitialAd.onError(err => {});
		// 	this.interstitialAd.onClose(() => {});
		// }
	},
	methods: {
		...mapActions({
			setGoodsListAction: 'setGoodsListAction',
			setPublishModelAction: 'setPublishModelAction'
		}),
		NavChange(index) {
			this.actionIndex = index;
			this.fetchPageNum = 1;
			// if (index == 4) {
			// 	if (this.interstitialAd) {
			// 		this.interstitialAd.show().catch(err => {
			// 			console.error(err);
			// 		});
			// 	}
			// }
		},
		publishbtn() {
			this.setPublishModelAction(true);
		},
		getGoodsList() {
			let queryData = {
				categoryId: this.categoryId,
				pageSize: 15,
				page: this.fetchPageNum
			};
			getGoodslist(queryData).then(x => {
				if (x[1].data.data) {
					if (this.goodslist.length > 0) {
						if (this.refreshing && x[1].data.data[0].id === this.goodslist[0].id) {
							uni.showToast({
								title: '已经最新',
								icon: 'none'
							});
							this.refreshing = false;
							uni.stopPullDownRefresh();
							return;
						}
					}
					if (this.refreshing) {
						this.refreshing = false;
						uni.stopPullDownRefresh();
						this.setGoodsListAction(x[1].data.data);
						this.fetchPageNum = 2;
					} else {
						let temp = this.goodslist.concat(x[1].data.data);
						this.setGoodsListAction(temp);
						this.fetchPageNum += 1;
					}
				}
			});
		},
		getTitleData() {
			var rqdata = {
				pageSize: 15,
				page: 1,
				type: 9
			};
			getJsonlist(rqdata).then(x => {
				this.title = x[1].data.data[0].jsonData.title;
			});
		},
		getOtherData() {
			var rqdata = {
				pageSize: 15,
				page: this.fetchPageNum,
				type: 3
			};
			getJsonlist(rqdata).then(x => {
				if (x[1].data.data) {
					if (this.otherlist && this.otherlist.length > 0) {
						if (this.refreshing && x[1].data.data && x[1].data.data[0].id === this.otherlist[0].id) {
							uni.showToast({
								title: '已经最新',
								icon: 'none'
							});
							this.refreshing = false;
							uni.stopPullDownRefresh();
							return;
						}
					}
					if (this.refreshing) {
						this.refreshing = false;
						uni.stopPullDownRefresh();
						this.otherlist = x[1].data.data;
						this.fetchPageNum = 2;
					} else {
						this.otherlist = this.otherlist.concat(x[1].data.data);
						this.fetchPageNum += 1;
					}
				}
			});
		},
		getPersonData() {
			var rqdata = {
				pageSize: 15,
				page: this.fetchPageNum,
				type: 2
			};
			getJsonlist(rqdata).then(x => {
				if (x[1].data.data) {
					if (this.personlist && this.personlist.length > 0) {
						if (this.refreshing && x[1].data.data && x[1].data.data[0].id === this.personlist[0].id) {
							uni.showToast({
								title: '已经最新',
								icon: 'none'
							});
							this.refreshing = false;
							uni.stopPullDownRefresh();
							return;
						}
					}
					if (this.refreshing) {
						this.refreshing = false;
						uni.stopPullDownRefresh();
						this.personlist = x[1].data.data;
						this.fetchPageNum = 2;
					} else {
						this.personlist = this.personlist.concat(x[1].data.data);
						this.fetchPageNum += 1;
					}
				}
						
			});
		},
		getCarsData() {
			var rqdata = {
				pageSize: 15,
				page: this.fetchPageNum,
				type: 1
			};
			getJsonlist(rqdata).then(x => {
						// for (let var1 in x[1].data.data) {
						// 			let id = x[1].data.data[var1].id;
						// 			console.log(id);
						// 			deleteJsonData(
						// 				{
						// 					id: id
						// 				},
						// 				{ 'content-type': 'application/x-www-form-urlencoded' }
						// 			).then(x => {});
						// 		}
				if (x[1].data.data) {
					if (this.carlist && this.carlist.length > 0) {
						if (this.refreshing && x[1].data.data && x[1].data.data[0].id === this.carlist[0].id) {
							uni.showToast({
								title: '已经最新',
								icon: 'none'
							});
							this.refreshing = false;
							uni.stopPullDownRefresh();
							return;
						}
					}
					if (this.refreshing) {
						this.refreshing = false;
						uni.stopPullDownRefresh();
						this.carlist = x[1].data.data;
						this.fetchPageNum = 2;
					} else {
						this.carlist = this.carlist.concat(x[1].data.data);
						this.fetchPageNum += 1;
					}
				}
			});
		},
		getNewsData() {
			uni.request({
				url: this.$serverUrl + '/api/picture/posts.php?page=' + (this.refreshing ? 1 : this.fetchPageNum) + '&per_page=5',
				success: ret => {
					if (ret.statusCode !== 200) {
						console.log('失败!');
					} else {
						if (this.newslist.length > 0) {
							if (this.refreshing && ret.data[0].id === this.newslist[0].id) {
								uni.showToast({
									title: '已经最新',
									icon: 'none'
								});
								this.refreshing = false;
								uni.stopPullDownRefresh();
								return;
							}
						}
						if (this.refreshing) {
							this.refreshing = false;
							uni.stopPullDownRefresh();
							this.newslist = ret.data;
							this.fetchPageNum = 2;
						} else {
							this.newslist = this.newslist.concat(ret.data);
							this.fetchPageNum += 1;
						}
					}
				}
			});
		}
	}
};
</script>

<style lang="less">
.index-root {
	width: 100%;
	flex-direction: column;
}
</style>
