import {
  HYEventStore
} from 'hy-event-store'
import {
  getRankings
} from '../service/api_music'

const rankingMap = {
  0: "newSong",
  1: "hotSong",
  2: "originSong",
  3: "speedUp"
}
const rankingStore = new HYEventStore({
  state: {
    speedUp: {}, //飙升
    originSong: {}, //原创
    newSong: {}, //新歌
    hotSong: {}, //热歌
  },
  actions: {
    getRankingDataAction(context, ply) {
      // `idx`: 0 新歌 1 热歌  2 原创  3 飙升
      for (let i = 0; i < 4; i++) {

        getRankings(i).then((res) => {
          const rankName = rankingMap[i]
          context[rankName] = res.playlist
          // switch (i) {
          //   case 0:
          //     context.newSong = res.playlist
          //     // console.log("新歌榜", res)
          //     break;
          //   case 1:
          //     // console.log("热歌榜", res)
          //     context.hotSong = res.playlist
          //     break;
          //   case 2:
          //     // console.log("原创榜", res)
          //     context.originSong = res.playlist
          //     break;
          //   case 3:
          //     // console.log("飙升榜", res)
          //     context.speedUp = res.playlist
          //     break;
          // }
          // context.hotRanking = res.playlist
          // context.hotRanking = res.data.data.dailySongs
        })
      }
    }
  }
})

export {
  rankingStore,
  rankingMap
}