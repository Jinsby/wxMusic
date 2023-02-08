import {
  HYEventStore
} from 'hy-event-store'
import {
  getSongDetail,
  getSongLyric,
  getSongUrl
} from '../service/api_plyer'
import {
  parseLyric
} from '../utils/parse-lyric'

// const audioContext = wx.createInnerAudioContext()
const audioContext = wx.getBackgroundAudioManager()

const playerStore = new HYEventStore({
  state: {
    id: 0,
    currentSong: {},
    duration: 0,
    lyricInfos: [],


    // 歌词index
    currentLyricIndex: 0,
    // 歌词显示
    currentLyricText: "",
    // 当前播放时间
    currentTime: 0,
    // 播放模式
    playModelIndex: 0, //0：列表循环 1：单曲循环 2：随机
    // 记录暂停
    isPlaying: false,
    // 播放列表
    playListSongs: [],
    playListIndex: 0,

    // 第一次播放
    isFirstPlay: true,

    // 是否停止
    isStoping: false
  },
  actions: {
    playMusicWithSongAction(ctx, {
      id,
      isRefresh = false //是否刷新
    }) {
      // 如果id一样
      if (ctx.id == id && !isRefresh) {
        this.dispatch("changeMusicPlayStatusAction", true)
        return
      }
      ctx.id = id


      // 修改播放状态
      ctx.isPlaying = true
      // 初始化
      ctx.currentSong = {}
      ctx.duration = 0
      ctx.lyricInfos = []
      ctx.currentTime = 0
      ctx.currentLyricIndex = 0
      ctx.currentLyricText = ""


      // 获取歌曲信息
      getSongDetail(id).then(res => {
        // console.log(res);
        ctx.currentSong = res.songs[0]
        ctx.duration = res.songs[0].dt
        audioContext.title = res.songs[0].name
      })
      // 获取歌词信息
      getSongLyric(id).then(res => {
        const lyricString = res.lrc.lyric
        const lyrics = parseLyric(lyricString)
        ctx.lyricInfos = lyrics
      })

      // 播放歌曲
      audioContext.stop()
      getSongUrl(id).then(res => {

        console.log(res.data);
        // console.log();
        const url = res.data[0].url.split('?authSecret')
        audioContext.src = url[0]
        audioContext.title = ctx.currentSong.name
        audioContext.autoplay = true
      })
      // audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`

      // 监听audiocontext一些事件
      if (ctx.isFirstPlay) {
        this.dispatch("setupAudioContextListenerAction")
        ctx.isFirstPlay = false
      }



    },

    setupAudioContextListenerAction(ctx) {
      // audioContext事件监听
      // 准备完毕播放
      audioContext.onCanplay(() => {
        audioContext.play()
      })

      // 监听时间改变
      audioContext.onTimeUpdate(() => {
        // console.log(audioContext.currentTime);
        // 设置毫秒数
        const currentTime = audioContext.currentTime * 1000
        ctx.currentTime = currentTime


        // 根据当前时间设置sliderValue



        // 根据当前时间查找对应的歌词
        if (!ctx.lyricInfos.length) return
        for (let i = 0; i < ctx.lyricInfos.length; i++) {
          const lyricInfo = ctx.lyricInfos[i]
          if (currentTime < lyricInfo.time) {
            // console.log(i-1);
            // 设置歌词索引和内容
            const currentIndex = i - 1
            if (ctx.currentLyricIndex !== currentIndex) {
              const currentLyricInfo = ctx.lyricInfos[currentIndex]
              console.log(currentLyricInfo.text);
              ctx.currentLyricText = currentLyricInfo.text
              ctx.currentLyricIndex = currentIndex
            }
            break
          }
        }

      })

      // 监听歌曲播放完毕
      audioContext.onEnded(() => {
        this.dispatch("changeNewMusicAction")
      })


      // 监听音乐暂停/播放/停止
      // 播放
      audioContext.onPlay(() => {
        ctx.isPlaying = true
      })
      // 暂停
      audioContext.onPause(() => {
        ctx.isPlaying = false
      })
      // 停止
      audioContext.onStop(() => {
        ctx.isPlaying = false
        ctx.isStoping = true
      })
    },

    // 改变播放状态
    changeMusicPlayStatusAction(ctx, isPlaying = true) {
      ctx.isPlaying = isPlaying
      if (ctx.isPlaying && ctx.isStoping) {
        getSongUrl(ctx.id).then(res => {
          console.log(res.data);
          // audioContext.src =  res.data[0].url.split("flac")
          // audioContext.title = ctx.currentSong.name
          // audioContext.startTime = ctx.currentTime / 1000
          // ctx.isStoping = false
        })
      }
      ctx.isPlaying ? audioContext.play() : audioContext.pause()

      this.dispatch("setupAudioContextListenerAction")
    },

    // 改变当前播放歌曲
    changeNewMusicAction(ctx, isNext = true) {
      // 获取当前音乐的索引
      let index = ctx.playListIndex

      // 更具不同的播放模式，获取下一首歌的索引
      switch (ctx.playModelIndex) {
        //0：列表循环 1：单曲循环 2：随机
        case 0:
          index = isNext ? index + 1 : index - 1
          // index = index + 1
          if (index === -1) index = ctx.playListSongs.length - 1
          if (index === ctx.playListSongs.length) index = 0
          break
        case 1:
          break
        case 2:
          index = Math.floor(Math.random() * ctx.playListSongs.length)
          break
      }


      // 获取歌曲
      let currentSong = ctx.playListSongs[index]
      if (!currentSong) {
        currentSong = ctx.currentSong
      } else {
        // 记录新的索引
        ctx.playListIndex = index
      }

      // 播放新的歌曲
      this.dispatch("playMusicWithSongAction", {
        id: currentSong.id,
        isRefresh: true
      })

    },

    delSongList(ctx, {
      id
    }) {
      console.log(ctx.playListSongs);
      // delete ctx.playListSongs.find((item) => {
      //   item.id === id
      // })
      ctx.playListSongs.forEach((item, index) => {
        if (item.id === id) {

          ctx.playListSongs.splice(index, 1)
        }
      });
      console.log(ctx.playListSongs);
    },

    // 暂停
    stopMusic(ctx) {
      // audioContext.onPause()
      audioContext.pause(() => {
        ctx.isPlaying = false
      })
    },

  }
})

export {
  audioContext,
  playerStore
}