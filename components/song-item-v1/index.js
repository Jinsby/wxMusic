// components/song-item-v1/index.js
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
    handleSongItemClick() {
      const id = this.properties.item.id
      // 跳转
      wx.navigateTo({
        url: "/packagePlayer/pages/music-plyer/index?id=" + id,
      })
      // 请求歌曲数据
      playerStore.dispatch("playMusicWithSongAction", {
        id
      })
      
    }
  }
})