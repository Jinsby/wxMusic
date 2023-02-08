import {
  HYEventStore
} from 'hy-event-store'
import {
  getTopMv
} from '../service/api_video'
const videoStore = new HYEventStore({
  state: {
    topMvs: [],
    hasMore: true
  },
  actions: {
    // 封装网络请求的方法
    async getTopMvData(ctx, offset) {
      if (!ctx.hasMore) return
      wx.showNavigationBarLoading()
      // 请求
      const res = await getTopMv(offset)
      let newData = ctx.topMvs
      if (offset === 0) {
        newData = res.data
      } else {
        newData = newData.concat(res.data)
      }
      console.log(res);
      // 设置
      ctx.topMvs = newData
      ctx.hasMore = res.hasMore

      wx.hideNavigationBarLoading()
      if (offset === 0) {
        wx.stopPullDownRefresh()
      }
    },
  }
})

export {
  videoStore
}