export default function (selector) {
  return new Promise((reslove) => {
    const query = wx.createSelectorQuery()
    // 查询组件实例信息
    query.select(selector).boundingClientRect()
    query.exec((res) => {
      reslove(res)

    })
  })
}