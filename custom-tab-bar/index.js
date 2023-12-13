const appInstance = getApp()
const globalData = appInstance.globalData;
Component({
	data: {
    isStoreShow: false,
    active: 0,
		list: [
			{
				icon: 'wap-home-o',
				text: '首页',
				url: '/pages/comsumer/home/home'
			},
			{
				icon: 'notes-o',
				text: '预约',
				url: '/pages/comsumer/reservation/reservation'
      },
      {
				icon: 'orders-o',
				text: '订单',
				url: '/pages/comsumer/order/order'
      },
      {
				icon: 'user-circle-o',
				text: '我的',
				url: '/pages/comsumer/me/me'
			}
    ],
    storeList: [
			{
				icon: 'wap-home-o',
				text: '商品管理',
				url: '/pages/store-bar/index/index'
			},
			{
				icon: 'notes-o',
				text: '美甲师管理',
				url: '/pages/store-bar/nail-artist-management/nail-artist-management'
      },
      {
				icon: 'orders-o',
				text: '订单管理',
				url: '/pages/store-bar/order-management/order-management'
      },
      {
				icon: 'user-circle-o',
				text: '我的',
				url: '/pages/store-bar/me/me'
      },
		]
	},
	methods: {
		onChange(event) {
      this.setData({ active: event.detail });
      var url = ''
      if (this.data.isStoreShow) {
        url = this.data.storeList[event.detail].url
      } else {
        url = this.data.list[event.detail].url
      }
			wx.switchTab({
				url: url
			});
		},
		init(isStore) {
      const page = getCurrentPages().pop();
      var active = ''
      if (this.data.isStoreShow) {
        active = this.data.storeList.findIndex(item => item.url === `/${page.route}`)
      } else {
        active = this.data.list.findIndex(item => item.url === `/${page.route}`)
      }
			this.setData({
				active: active
			});
    }
  },
  attached: function() {
    this.setData({
      isStoreShow: globalData.isStoreShow
    });
  },
});