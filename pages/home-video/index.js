import {
  playerStore,
  videoStore
} from "../../store/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    topMvs: [],
    hasMore: true,
  },

  onLoad(options) {
    //
    // const _this = this
    videoStore.dispatch("getTopMvData", 0);
    this.setupVideoData()
  },

  // 封装事件处理方法
  handleVidelItemClick(event) {
    const id = event.currentTarget.dataset.item.id;
    wx.navigateTo({
      url: `/packageDetail/pages/detail-video/index?id=${id}`,
    });
    playerStore.dispatch("stopMusic")
  },

  // 监听store
  setupVideoData() {
    videoStore.onStates(["topMvs", "hasMore"], ({
      topMvs,
      hasMore
    }) => {
      console.log(topMvs, hasMore);
      this.setData({
        topMvs,
        hasMore,
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    videoStore.dispatch("getTopMvData", 0)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    videoStore.dispatch("getTopMvData", this.data.topMvs.length)
    this.setupVideoData()

    console.log("触底了");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});