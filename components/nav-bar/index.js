// components/nav-bar/index.js
Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ""
    }
  },

  data: {
    statusBarHeight: getApp().globalData.statusBarHeight
  },

  lifetimes: {
    // ready: function () {
    //   const info = wx.getSystemInfoSync()
    //   console.log(info);
    //   // statusBarHeight
    // }
  },

  methods: {
    handleLeftClick() {
      this.triggerEvent('click')
    }
  }
})