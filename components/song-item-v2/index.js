// components/song-item-v2/index.js
import {
  playerStore
} from '../../store/index'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    },
    index: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleSongItemClick(event) {
      const id = this.properties.item.id
      wx.navigateTo({
        url: "/packagePlayer/pages/music-plyer/index?id=" + id,
      })
      // 请求歌曲数据
      playerStore.dispatch("playMusicWithSongAction", {
        id
      })
      // 添加播放列表
      const index = event.currentTarget.dataset.index
      let playListSongs = [{
        ...this.properties.item
      }]

      console.log(playListSongs)
      playerStore.onState("playListSongs", (res) => {
        let brr = res.every(item => {
          return item.id !== id
        })
        if (brr) {
          playListSongs = playListSongs.concat(res)
        } else {
          playListSongs = res
        }
      })

      playerStore.setState("playListSongs", playListSongs)
      playerStore.setState("playListIndex", index)
    }
  }
})