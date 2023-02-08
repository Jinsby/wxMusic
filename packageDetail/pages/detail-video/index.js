// pages/detail-video/index.js
import {
  getMvDetail,
  getMvRelatedVideo,
  getMvUrl,
} from "../../../service/api_video"
Page({

  data: {
    MvUrls: [],
    MvRelatedVideo: [],
    duration: 0,
    currentTime: 0,
    isStop: false,
    isSliderChanging: true,
    id: 0,
    playInfo: {
      playMessage: [],
      playUrl: []
    }
  },

  onLoad: function (options) {
    const id = options.id
    this.setData({
      id
    })
    // 获取所有视频url
    // const pages = getCurrentPages()
    // 获取上一个页面的数据
    // const topMvs = pages[0].data.topMvs

    // const id = 14594693;
    this.getPageData(id)
    // 请求所有视频信息
    // this.getPageData(topMvs, (MvUrls, MvDetails) => {

    //   this.setData({
    //     MvUrls,
    //     MvDetails
    //   })
    //   const playId = this.data.id


    //   const playInfo = {
    //     playMessage: MvDetails.filter(({
    //       id
    //     }) => id == playId),
    //     playUrl: MvUrls.filter(({
    //       id
    //     }) => id == playId)
    //   }

    //   this.setData({
    //     playInfo
    //   })

    // });


  },
  onReady: function (res) {
    // if (!this.data.MvUrls.length < 1) {

    // }


  },

  getPageData(id) {
    setTimeout(() => {

      getMvUrl(id).then((res) => {
        const f = 'playInfo.playUrl'
        this.setData({
          [f]: res.data
        });
      });

      // 2 视频信息
      getMvDetail(id).then((res) => {
        const f = 'playInfo.playMessage'
        this.setData({
          [f]: res.data
        });
      });
    }, 500);
    this.videoContext = wx.createVideoContext('playVideo');
  },

  // getPageData: function (topMvs, cb) {
  //   // console.log(topMvs);
  //   let MvUrls = []
  //   let MvDetails = []
  //   for (const item of topMvs) {
  //     // 1 播放地址
  //     getMvUrl(item.id).then((res) => {
  //       MvUrls.push(res.data)
  //       // this.setData({
  //       //   MvUrls
  //       // });
  //     });

  //     // 2 视频信息
  //     getMvDetail(item.id).then((res) => {
  //       MvDetails.push(res.data)
  //       // this.setData({
  //       //   MvDetail: MvDetail
  //       // });
  //     });
  //   }
  //   // console.log(MvUrls, MvDetail);

  //   setTimeout(() => {
  //     cb(MvUrls, MvDetails)

  //     // const playId = this.data.playInfo.playMessage[0].id + ''
  //     // console.log(playId);
  //     this.videoContext = wx.createVideoContext('playVideo');
  //   }, 500);


  //   // 3 相关视频
  //   // getMvRelatedVideo(id).then((res) => {
  //   //   this.setData({
  //   //     MvRelatedVideo: res.data,
  //   //   });
  //   // });
  // },


  // 时间变化
  getVideoCount(e) {
    // console.log(e);
    if (this.data.isSliderChanging) {
      this.setData({
        duration: e.detail.duration,
        currentTime: e.detail.currentTime,
      })
    }

  },
  // 暂停视频
  stopVideo: function () {
    this.data.isStop ? this.videoContext.play() : this.videoContext.pause();
    this.setData({
      isStop: !this.data.isStop,
    });
  },


  // 进来根据传递的id加载第一个视频，设置视频播放列表



  // 改变进度
  changeCurrentTime: function (e) {
    console.log(e.detail.value);
    const value = e.detail.value
    this.videoContext.seek(value)
    this.setData({
      currentTime: value
    })
    this.videoContext.play()

  },
  changeCurrentIng(e) {
    const currentTime = e.detail.value

    this.setData({
      isSliderChanging: false,
      currentTime
    })
  },
  // swiperitem滑动
  handleChangeSwiperItem(e) {
    console.log(e);
    // const PlayToindex = e.detail.current
    // this.getPageData(id)
  },
  handleBackClick() {
    wx.navigateBack()
  },


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
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});