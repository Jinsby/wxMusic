// pages/detail-search/index.js
import {
  getHotSearch,
  getSongSearch,
  getSongSearchResult
} from '../../../service/api_search'
import debounce from '../../../utils/debounce'
const debounceGetSearchSugges = debounce(getSongSearch)
Page({
  data: {
    hotKeywords: [],
    searchResult: [],
    searchResultNodes: [],
    searchSongResult: [],
    searchValue: '',
  },
  onLoad(options) {
    // 获取页面数据
    this.getPageData()

  },

  // 网络请求
  getPageData: function () {
    getHotSearch().then(res => {
      this.setData({
        hotKeywords: res.result.hots
      })
    })
  },

  // 搜索建议
  handleSearch(event) {
    // console.log(event.detail);
    // 获取关键词
    const searchValue = event.detail

    // 保存  
    this.setData({
      searchValue
    })

    // 如果为空
    if (!searchValue.length) {
      this.setData({
        searchResult: [],
        searchSongResult: []
      })
      return
    }

    // 发送网络请求
    debounceGetSearchSugges(searchValue).then(res => {
      const searchResult = res.result.allMatch
      this.setData({
        searchResult
      })

      // 转换成node节点
      // console.log(itemartists);
      const searchResultNodes = []
      for (const item of searchResult) {
        const nodes = []
        // 检测是否以searchValue开头
        if (item.keyword.startsWith(searchValue)) {
          const key1 = item.keyword.slice(0, searchValue.length)
          const key2 = item.keyword.slice(searchValue.length)

          const node1 = {
            name: "span",
            attrs: {
              style: "color:#fc011a;font-size:14px; font-weight:700;letter-spacing:5rpx"
            },
            children: [{
              type: "text",
              text: key1
            }]
          }
          nodes.push(node1)

          const node2 = {
            name: "span",
            attrs: {
              style: "color:#000;letter-spacing:1px;padding-left:1px"
            },
            children: [{
              type: "text",
              text: key2
            }]
          }

          nodes.push(node2)

          // if (item.artists[0].name.length > 1) {
          //   const itemartists = {
          //     name: "span",
          //     attrs: {
          //       style: "color:#000;"
          //     },
          //     children: [{
          //       type: "text",
          //       text: ` - ${item.artists[0].name}`
          //     }]
          //   }
          //   nodes.push(itemartists)
          // }
        } else {
          const node = {
            name: "span",
            attrs: {
              style: "color:#000;"
            },
            children: [{
              type: "text",
              text: item.keyword
            }]
          }
          nodes.push(node)
        }
        searchResultNodes.push(nodes)
      }
      this.setData({
        searchResultNodes
      })
    })

  },

  // 搜索
  handleSearchAction() {
    const searchValue = this.data.searchValue
    getSongSearchResult(searchValue).then(res => {
      console.log(res);
      this.setData({
        searchSongResult: res.result.songs
      })
    })
  },

  // 建议监听点击
  handleSuggestItemClick(event) {
    // 获取关键字
    const index = event.currentTarget.dataset.index
    const keyWord = this.data.searchResult[index].keyword
    // console.log(keyWord);
    // 讲关键词设置到searchValue
    this.setData({
      searchValue: keyWord
    })
    // 发送网络请求
    this.handleSearchAction()
  },

  // 热门搜索点击
  handleTagItemClick(event) {
    const keyWord = event.currentTarget.dataset.item
    this.setData({
      searchValue: keyWord
    })
    this.handleSearchAction()
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