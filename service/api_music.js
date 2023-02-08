import Sqrequest from './index'
import {
  bendi
} from './index'
export function getBanners() {
  return Sqrequest.get("/banner", {
    type: 2
  })
}

export function getRankings(idx) {
  return Sqrequest.get("/top/list", {
    idx
  })
}

export function getTopSongList(cat = "全部", limit = 10, offset = 0) {
  return Sqrequest.get("/top/playlist", {
    cat,
    limit,
    offset
  })
}

export function getJpSongList(cat = "华语", limit = 10, offset = 0) {
  return Sqrequest.get("/top/playlist/highquality", {
    cat,
    limit,
    offset
  })
}

export function getSongMenuDetail(id) {
  return Sqrequest.get("/playlist/detail/dynamic", {
    id
  })
}

export function login() {
  return bendi.get("/register/anonimous")
}



// export function getRankings() {
//   return Sqrequest.bGet("/recommend/songs")
// }