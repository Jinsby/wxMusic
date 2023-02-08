import Sqrequest from './index'

export function getHotSearch() {
  return Sqrequest.get('/search/hot')
}


export function getSongSearch(keywords) {
  return Sqrequest.get('/search/suggest', {
    type: "mobile",
    keywords
  })
}

export function getSongSearchResult(keywords) {

  // `type`: 搜索类型；默认为 1 即单曲 , 
  // 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 
  //           1002: 用户, 1004: MV, 1006: 歌词, 
  //           1009: 电台, 1014: 视频, 1018:综合
  return Sqrequest.get('/search', {
    keywords
  }, false, {})
}