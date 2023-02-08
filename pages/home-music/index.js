// pages/home-music/index.js
import {
  rankingStore,
  rankingMap,
  playerStore
} from '../../store/index'
import {
  getBanners,
  getTopSongList,
  getJpSongList
} from '../../service/api_music'
import queryRect from '../../utils/query_rect'
import throttle from '../../utils/throttle'
const throttleQueryRect = throttle(queryRect, 1000, {
  trailing: true
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    swiperHeight: 0,
    recommendSongs: [],
    hotMenuList: [],
    JpSongList: [],
    rankings: {
      0: {},
      2: {},
      3: {}
    },
    currentSong: {},
    isPlaying: false,

    // 
    playAnimState: "paused",

    // 歌词显示
    currentLyricText: "",

    // 显示底部控件
    show: false,

    // 播放列表
    playListSongs: [],
    playListIndex: 0,
  },

  onLoad(options) {
    // /banner?type=2
    // playerStore.dispatch("playMusicWithSongAction", {
    //   id: 33894312
    // })


    this.getPageData()
    // 发送请求
    rankingStore.dispatch('getRankingDataAction')

    // 从store获取共享数据
    this.setupPlayerStoreListener()


  },

  getRankingHandler: function (idx) {
    return (res) => {
      // console.log(res);
      if (Object.keys(res).length === 0) return
      const name = res.name
      const caverImage = res.coverImgUrl
      const songList = res.tracks.slice(0, 3)
      const playCount = res.playCount
      const rankinkObje = {
        name,
        caverImage,
        songList,
        playCount
      }
      const newRankings = {
        ...this.data.rankings,
        [idx]: rankinkObje
      }
      this.setData({
        rankings: newRankings
      })
    }
  },

  // 网络请求
  getPageData() {
    getBanners().then((res) => {
      // console.log(res);
      this.setData({
        banners: res.banners
      })
    })
    // 热门歌单
    getTopSongList().then(res => {
      // console.log(res);
      this.setData({
        hotMenuList: res.playlists
      })
    })
    // 精品歌单
    getJpSongList().then((res) => {
      // console.log(res);
      this.setData({
        JpSongList: res.playlists
      })
    })
  },
  // swepr图片加载完成触发
  handleSwiperImageLoaded() {
    // console.log(">>>");
    throttleQueryRect(".swiper-image").then((res) => {
      // console.log(res[0].height);
      // setData 在设置数据时是同步的
      // 在通过最新的数据对xml渲染时的过程是异步的
      this.setData({
        swiperHeight: res[0].height
      })
    })

  },

  // 首页搜索框点击
  handleSearchClick() {
    // console.log(">>>");
    wx.navigateTo({
      url: '/packageDetail/pages/detail-search/index',
    })
  },

  // 推荐歌曲更多的点击 
  handleMoreClick(event) {
    this.navigateToDeailSongPage("hotSong")
  },

  // 巅峰榜item点击
  handleRankingItemClick(event) {
    const idx = event.currentTarget.dataset.idx
    const rankingName = rankingMap[idx]
    console.log(event);
    this.navigateToDeailSongPage(rankingName)
  },

  navigateToDeailSongPage(ranking) {
    wx.navigateTo({
      url: `/packageDetail/pages/detail-songs/index?ranking=${ranking}&type=rank`,
    })
  },

  // 推荐歌曲点击
  handleSongItemClick(event) {
    const index = event.currentTarget.dataset.index
    // console.log(index, this.data.recommendSongs);
    let playListSongs = []
    playerStore.onState("playListSongs", (res) => {

      const arr1IDs = new Set(res.map(({id}) => id));
      const combined = [...res, ...this.data.recommendSongs.filter(({id}) => !arr1IDs.has(id))];
      playListSongs = playListSongs.concat(combined)
      console.log(playListSongs);
    })

    // console.log(filtered);
    // playListSongs = playListSongs.concat(this.data.recommendSongs)
    // 设置共享数据
    playerStore.setState("playListSongs", playListSongs)
    playerStore.setState("playListIndex", index)
  },

  // 底部状态栏 开始暂停播放
  handlePlayBtnClick() {
    playerStore.dispatch("changeMusicPlayStatusAction", !this.data.isPlaying)
  },

  // 监听
  setupPlayerStoreListener() {
    // 从store获取数据
    // 排行榜的监听
    rankingStore.onState("hotSong", res => {
      if (!res.tracks) return
      const recommendSongs = res.tracks.slice(0, 10)
      this.setData({
        recommendSongs
      })
      // console.log(recommendSongs);
    })

    rankingStore.onState("speedUp", this.getRankingHandler(3))
    rankingStore.onState("originSong", this.getRankingHandler(2))
    rankingStore.onState("newSong", this.getRankingHandler(0))

    // 播放器监听
    playerStore.onStates(["currentSong", "isPlaying"], ({
      currentSong,
      isPlaying
    }) => {
      if (currentSong) this.setData({
        currentSong
      })
      if (isPlaying != undefined) this.setData({
        isPlaying,
        playAnimState: isPlaying ? "running" : "paused"
      })
    })

    // 歌词监听
    playerStore.onState("currentLyricText", (currentLyricText) => {
      this.setData({
        currentLyricText
      })
    })
    playerStore.onStates(["playListSongs", "playListIndex"], ({
      playListSongs,
      playListIndex
    }) => {
      // console.log("onstate", playListSongs);
      // 设置播放列表
      this.setData({
        playListSongs,
        playListIndex
      })
    })
  },

  // 底部状态栏跳转播放页面
  handleToPlyer() {
    wx.navigateTo({
      url: "/packagePlayer/pages/music-plyer/index?id=" + this.data.currentSong.id,
    })
  },

  // 显示播放列表
  showPopup() {
    this.setData({
      show: true
    });

  },
  // 关闭播放列表
  onClose() {
    this.setData({
      show: false
    });
  },
  // 播放
  handlePlaySong(event) {
    // console.log(event);
    const id = event.currentTarget.dataset.id
    // 请求歌曲数据
    playerStore.dispatch("playMusicWithSongAction", {
      id
    })
  },


  // 删除播放列表歌曲
  handleDelListSong(event) {
    // console.log(event);
    const id = event.currentTarget.dataset.id
    playerStore.dispatch("delSongList", {
      id
    })
    playerStore.onStates(["playListSongs", "playListIndex"], ({
      playListSongs,
      playListIndex
    }) => {
      console.log("onstate", playListSongs);
      // 设置播放列表
      this.setData({
        playListSongs,
        playListIndex
      })
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})