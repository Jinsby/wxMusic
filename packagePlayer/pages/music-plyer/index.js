// pages/music-plyer/index.js
// import {
//   getSongDetail,
//   getSongLyric
// } from '../../service/api_plyer'

import {
  audioContext,
  playerStore
} from '../../../store/index'

// import {
//   parseLyric
// } from '../../utils/parse-lyric'

const playModelNames = ["order", "repeat", "random"]
Page({


  data: {
    id: 0,
    // 是否显示歌词
    showLyric: true,
    // 歌曲信息
    currentSong: [],
    // 歌词
    lyricInfos: [],
    // 总时长
    duration: 0,


    // 歌词index
    currentLyricIndex: 0,
    // 歌词显示
    currentLyricText: "",
    // 当前播放时间
    currentTime: 0,


    // 当前页面0，1
    currentPage: 0,
    // 页面高度
    coutentHeigth: 0,
    // 移动条值
    sliderValue: 0,
    // slider能否改变
    isSliderChanging: false,
    // scroll top距离
    lyricScrollTop: 0,

    // 播放模式
    playModelIndex: 0,
    // 播放模式name
    playMdelName: "order",
    // 播放状态
    isPlaying: false,
    playingName: "pause",

    // 显示底部控件
    show: false,

    // 播放列表
    playListSongs: [],
    playListIndex: 0,
  },

  onLoad(options) {
    // 获取id
    const id = options.id
    // playerStore.dispatch("playMusicWithSongAction", {
    //   id
    // })
    //根据id获取歌曲信息
    // this.getPageData(id)
    this.setupPlayerStoreListener()

    // 计算高度
    const screenHeight = getApp().globalData.screenHeight
    const statusBarHeight = getApp().globalData.statusBarHeight
    const coutentHeigth = screenHeight - statusBarHeight - 44
    // 设备 宽高比
    const deviceRadio = getApp().globalData.deviceRadio
    this.setData({
      id,
      coutentHeigth,
      showLyric: deviceRadio >= 2
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

    // 播放歌曲
    // audioContext.stop()
    // audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    // 自动播放
    // audioContext.autoplay = true


    //  audioContext事件监听
    //  准备完毕播放
    // audioContext.onCanplay(() => {
    //   audioContext.play()
    // })

    // audioContext.onTimeUpdate(() => {
    //   // console.log(audioContext.currentTime);
    //   // 设置毫秒数
    //   const currentTime = audioContext.currentTime * 1000
    //   this.setData({
    //     currentTime
    //   })
    //   // 根据当前时间设置sliderValue
    //   if (!this.data.isSliderChanging) {
    //     const sliderValue = currentTime / this.data.duration * 100
    //     this.setData({
    //       sliderValue
    //     })
    //   }

    //   // 根据当前时间查找对应的歌词
    //   if (!this.data.lyricInfos.length) return
    //   for (let i = 0; i < this.data.lyricInfos.length; i++) {
    //     const lyricInfo = this.data.lyricInfos[i]
    //     if (currentTime < lyricInfo.time) {
    //       // console.log(i-1);
    //       // 设置歌词索引和内容
    //       const currentIndex = i - 1
    //       if (this.data.currentLyricIndex !== currentIndex) {
    //         const currentLyricInfo = this.data.lyricInfos[currentIndex]
    //         console.log(currentLyricInfo.text);
    //         this.setData({
    //           currentLyricText: currentLyricInfo.text,
    //           currentLyricIndex: currentIndex,
    //           lyricScrollTop: currentIndex * 40
    //         })
    //       }
    //       break
    //     }
    //   }

    // })
  },

  // =============== 事件处理 =================
  handleSliderChange(event) {
    // 获取slider变化的值
    // console.log(event.detail.value);
    const value = event.detail.value

    // 计算百分比
    const currentTime = this.data.duration * value / 100
    // console.log(currentTime);

    // 设置播放器位置
    // audioContext.pause() //暂停音乐
    audioContext.seek(currentTime / 1000)

    // 记录最新的sliderValue
    this.setData({
      sliderValue: value,

      isSliderChanging: false
    })
    const play = true
    this.setData({
      isPlaying: play,
      playingName: 'pause'
    })
    playerStore.setState("isPlaying", play)

  },

  // 返回
  handleBackClick() {
    wx.navigateBack()
  },

  hanleSliderChanging(event) {
    const value = event.detail.value
    const currentTime = this.data.duration * value / 100

    this.setData({
      isSliderChanging: true,
      currentTime
    })
  },

  handleSwiperChange(event) {
    // console.log(event);
    const current = event.detail.current
    this.setData({
      currentPage: current
    })

  },
  // 播放模式
  handleModelBtnClick() {
    // 计算最新的playModelIndex
    let playModelIndex = this.data.playModelIndex + 1
    if (playModelIndex === 3) playModelIndex = 0

    // 设置playModelIndex
    playerStore.setState("playModelIndex", playModelIndex)
  },
  // 暂停
  handlePlayBtcClick() {
    playerStore.dispatch("changeMusicPlayStatusAction", !this.data.isPlaying)
    // playerStore.setState("isPlaying", !this.data.isPlaying)

  },
  // 上一首
  handlePrevBtnClick() {
    playerStore.dispatch("changeNewMusicAction", false)
  },
  // 下一首
  handleNextBtnClick() {

    playerStore.dispatch("changeNewMusicAction")
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
  // 列表点击播放
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

  // 请求
  // getPageData(id) {
  //   getSongDetail(id).then(res => {
  //     this.setData({
  //       currentSong: res.songs[0],
  //       duration: res.songs[0].dt
  //     })
  //   })

  //   getSongLyric(id).then(res => {
  //     const lyricString = res.lrc.lyric
  //     const lyrics = parseLyric(lyricString)
  //     console.log(lyrics);
  //     this.setData({
  //       lyricInfos: lyrics
  //     })
  //   })
  // },


  // ===================== 事件监听 =====================
  setupPlayerStoreListener() {
    // 监听"currentSong", "duration", "lyricInfos"
    playerStore.onStates(["currentSong", "duration", "lyricInfos"], ({
      currentSong,
      duration,
      lyricInfos
    }) => {
      if (currentSong) this.setData({
        currentSong
      })
      if (duration) this.setData({
        duration
      })
      if (lyricInfos) this.setData({
        lyricInfos
      })
    })

    // 监听"currentTime","currentLyricText","currentLyricIndex"
    playerStore.onStates(["currentTime", "currentLyricText", "currentLyricIndex"], ({
      currentTime,
      currentLyricText,
      currentLyricIndex
    }) => {
      // 时间变化
      if (currentTime && !this.data.isSliderChanging) {
        const sliderValue = currentTime / this.data.duration * 100
        this.setData({
          currentTime,
          sliderValue
        })
      }
      // 歌词变化
      if (currentLyricIndex) {
        this.setData({
          currentLyricIndex,
          lyricScrollTop: currentLyricIndex * 95
        })
      }
      if (currentLyricText) {
        this.setData({
          currentLyricText
        })
      }

    })

    // 监听模式变化 playModelIndex
    playerStore.onStates(["playModelIndex", "isPlaying"], ({
      playModelIndex,
      isPlaying
    }) => {
      if (playModelIndex !== undefined) {
        this.setData({
          playModelIndex,
          playMdelName: playModelNames[playModelIndex]
        })
      }
      if (isPlaying !== undefined) {
        this.setData({
          isPlaying,
          playingName: isPlaying ? "pause" : "resume"
        })
      }
    })
  },

  onUnload() {
    
  }
})