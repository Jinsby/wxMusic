import Sqrequest from './index'

export function getTopMv(offset, limit = 10) {
  return Sqrequest.get("/top/mv", {
    offset,
    limit
  })
}
/**
 * 请求mv的播放地址
 *@param {number} id mv的id
 */
export function getMvUrl(id) {
  return Sqrequest.get('/mv/url', {
    id
  })
}
// 获取 mv 数据
export function getMvDetail(mvid) {
  return Sqrequest.get('/mv/detail', {
    mvid
  })
}
// mv相关视频
export function getMvRelatedVideo(id) {
  return Sqrequest.get('/related/allvideo', {
    id
  })
}