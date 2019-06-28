<template>
	<view class="cu-modal bottom-modal publish-model-root margin-top" style="margin-top:20%" :class="{ show: publishModel }">
		<view class="cu-dialog">
			<view class="cu-bar bg-white">
				<view class="action text-green" @tap="submit">确定</view>
				<view class="action text-blue" @tap="hideModal">取消</view>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">类型选择</view>
				<picker @change="bindPickerChange" :value="index" :range="pickers">
					<view class="picker">{{ pickers[index] }}</view>
				</picker>
			</view>

			<view class="cu-form-group">
				<view class="title">时间选择</view>
				<picker mode="time" :value="time" start="09:01" end="21:01" @change="TimeChange">
					<view class="picker">{{ time }}</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">日期选择</view>
				<picker mode="date" value="date" start="2015-09-01" end="2020-09-01" @change="DateChange">
					<view class="picker">{{ date }}</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input style="text-align: left;" class="uni-input" type="number" @input="hideKeyboard" />
				<view class="cu-capsule radius">
					<view class="cu-tag bg-blue">+86</view>
					<view class="cu-tag line-blue">中国大陆</view>
				</view>
			</view>
			<view class="cu-form-group margin-top">
				<textarea v-model="textareaValue" style="text-align: left;"  maxlength="-1"  @input="msgInput"></textarea>
			</view>
		</view>
	</view>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { setJsonData } from '../../api/index.js';
export default {
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			pickers: ['车', '人', '杂'],
			index: 0,
			date: currentDate,
			time: '12:01',
			textareaValue: '',
			userInfo: {
				nickName: '',
				gender: 1,
				avatarUrl: ''
			},
			tel: ''
		};
	},
	computed: {
		...mapGetters({
			publishModel: 'publishModel'
		})
	},
	methods: {
		...mapActions({
			setPublishModelAction: 'setPublishModelAction'
		}),
		hideKeyboard(event) {
			if (event.target.value.length === 11) {
				this.tel = event.target.value;
				uni.hideKeyboard();
			}
		},
		msgInput(event) {
			this.textareaValue = event.target.value;
		},
		TimeChange(e) {
			this.time = e.target.value;
		},
		DateChange(e) {
			this.date = e.target.value;
		},
		hideModal() {
			this.setPublishModelAction(false);
		},
		bindPickerChange(e) {
			console.log('picker发送选择改变，携带值为', e.target.value);
			this.index = e.target.value;
		},
		submit() {
			//提交
			// #ifdef MP-WEIXIN
			var that = this;
			uni.login({
				provider: 'weixin',
				success(loginres) {
					uni.getUserInfo({
						success(res) {
							debugger;
							console.log(res.userInfo);
							that.userInfo = res.userInfo;
							let content = {
								type: (Number)(that.index) + 1,
								author: that.userInfo.nickName || '平台发布',
								wxid: that.userInfo.nickName || '',
								msg: that.textareaValue,
								tel: that.tel,
								gender: that.userInfo.gender || '1',
								headimg: that.userInfo.avatarUrl || ''
							};
							setJsonData(
								{
									content: JSON.stringify(content),
									type: content.type
								},
								{ 'content-type': 'application/x-www-form-urlencoded' }
							).then(x => {
								debugger;
								if (x[1].data.msg == 'success') {
									that.textareaValue ="";
									uni.showToast({
										icon: 'success',
										title: '发布成功'
									});
									that.hideModal();
								}
							});
						}
					});
				}
			});
			// #endif
			// #ifndef MP-WEIXIN
			let content = {
				type: this.index + 1,
				author: this.userInfo.nickName || '平台发布',
				wxid: this.userInfo.nickName || '',
				msg: this.textareaValue,
				tel: this.tel,
				gender: this.userInfo.gender || '1',
				headimg: this.userInfo.avatarUrl || ''
			};
			setJsonData(
				{
					content: JSON.stringify(content),
					type: content.type
				},
				{ 'content-type': 'application/x-www-form-urlencoded' }
			).then(x => {
				debugger;
				if (x[1].data.msg == 'success') {
					this.textareaValue ="";
					uni.showToast({
						icon: 'success',
						title: '发布成功'
					});
					this.hideModal();
				}
			});
			// #endif
		},
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		}
	}
};
</script>

<style lang="less">
.publish-model-root {
}
</style>
