<template>
	<view class="infolist-root" v-if="list && list[0]">
		<view class="padding-sm infolist-root-item" v-for="(item, index) in list" :key="index" v-if="item" :class="item.style">
			<view class="head">
				<view class="cu-avatar round lg margin-left" :style="{ 'background-image': 'url(' + item.jsonData.headimg + ')' }">
					<view class="cu-tag badge" :class="item.persontype"></view>
				</view>

				<view class="author">{{ item.jsonData.author }}</view>
				<view class="tel"><button class="endbtn cu-btn round bg-white" @tap="makeCall(item.jsonData.tel)">拨打电话</button></view>
			</view>
			<view class="padding-sm" :class="item.styletm">更新时间：{{ item.dateUpdate || item.dateAdd }}</view>
			<view class=" padding radius text-center">
				<view class="text-lg">{{ item.jsonData.msg }}</view>
			</view>
			<!-- <view class="adContainer" v-if="index%10==0">
				<ad unit-id="adunit-03b4ea4a78917251" @bindload="adLoad" @binderror="adError" @bindclose="adClose"></ad>
			</view> -->
		</view>
	
	</view>
	<view v-else class="solids-bottom padding-xs flex align-center">
		<view class="flex-sub text-center" style="flex-direction: column;">
			<view class="solid-bottom text-xl padding align-center" style="justify-content:center"><text class="text-black text-bold">暂无数据！</text></view>
			<view class="padding align-center" style="justify-content:center">欢迎发布您的需求信息</view>
		</view>
	</view>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
	data() {
		return {};
	},
	props: {
		list: {
			type: Array,
			default: function() {
				return [];
			}
		}
	},
	computed: {
		...mapGetters({
			colorList: 'colorList'
		})
	},
	watch: {
		list: {
			handler(newval, oldval) {
				this.setStyle(oldval.length - 1);
			}
		},
		deep: true
	},
	created() {
		this.setStyle(0);
	},
	methods: {
		adLoad(){
			console.log('Banner 广告加载成功')
		},
		adError(){
			console.log('Banner 广告加载失败', err)
		},
		adClose(){
			console.log('Banner 广告关闭')
		},
		setStyle(index) {
			if (this.list && this.list[0]) {
				for (let i = index; i < this.list.length; i++) {
					if (i > 14) {
						this.list[i]['style'] = `bg-${this.colorList[i % 14].name} light`;
						this.list[i]['styletm'] = `bg-${this.colorList[i % 14].name} shadow-blur`;
					} else {
						this.list[i]['style'] = `bg-${this.colorList[i].name} light`;
						this.list[i]['styletm'] = `bg-${this.colorList[i].name}  shadow-blur`;
					}
					if (this.list[i].jsonData.gender == '男') {
						this.list[i]['persontype'] = 'icon-male bg-blue';
					} else {
						this.list[i]['persontype'] = 'icon-female bg-pink';
					}
					if (this.list[i].jsonData.headimg) {
						if(this.list[i].jsonData.headimg.indexOf('https')<0){
							this.list[i].jsonData.headimg = this.list[i].jsonData.headimg.replace('./images', 'http://imeasy.cn');
						}
					} else {
						this.list[i].jsonData.headimg = 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg';
					}
				}
			}
		},
		makeCall(val) {
			console.log(val);
			uni.makePhoneCall({
				phoneNumber: val,
				success: () => {},
				fail: e => {
					uni.showToast({
						title: e,
						icon: 'none',
						position: 'center'
					});
				}
			});
		}
	}
};
</script>

<style lang="less">
.infolist-root {
	display: flex;
	flex-direction: column;
	.infolist-root-item {
		display: flex;
		flex-direction: column;
		.head {
			justify-content: space-between;
			.tel {
				align-items: center;
				.endbtn {
					width: 200upx;
				}
			}
			.author {
				align-items: center;
			}
		}
	}
}
</style>
