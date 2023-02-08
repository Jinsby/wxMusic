// pages/detail-songs/index.js
import {
  rankingStore,
  playerStore
} from '../../../store/index'
import {
  getSongMenuDetail
} from '../../../service/api_music'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    ranking: '',
    rankingInfo: {},
    songInfo: {}
  },

  onLoad(options) {
    const type = options.type
    // const type = 'menu'
    if (type === "menu") {
      const id = options.id
      // const id = 3001035934
      getSongMenuDetail(id).then(res => {
        // console.log(res);
        this.setData({
          songInfo: res.playlist
        })
        this.setData({
          type: type
        })
      })
      // console.log(id);
    } else if (type === "rank") {
      const songInfo = options.ranking
      this.setData({
        songInfo
      })
      this.setData({
        type: type
      })

      rankingStore.onState(songInfo, this.getRankingDataHandelr)
    }

  },

  getRankingDataHandelr(res) {
    // console.log(res);
    this.setData({
      songInfo: res
    })
  },


  handleSongItemClick(event) {
    const index = event.currentTarget.dataset.index
    console.log(index, this.data.songInfo.tracks);
    let playListSongs = []
    playerStore.onState("playListSongs", (res) => {
      const arr1IDs = new Set(res.map(({
        id
      }) => id));
      const combined = [...res, ...this.data.songInfo.tracks.filter(({
        id
      }) => !arr1IDs.has(id))];
      playListSongs = playListSongs.concat(combined)
    })
    // playListSongs = playListSongs.concat(this.data.songInfo.tracks)
    playerStore.setState("playListSongs", playListSongs)
    playerStore.setState("playListIndex", index)
  },

  onUnload() {
    // 取消监听
    if (this.data.ranking) {
      rankingStore.offState(this.data.ranking, this.getRankingDataHandelr)
    }
  }
})