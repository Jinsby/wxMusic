import Sqrequest from './index'

export function getSongDetail(ids) {
  return Sqrequest.get('/song/detail', {
    ids
  })
}

export function getSongLyric(id) {
  return Sqrequest.get('/lyric', {
    id
  })
}

export function getSongUrl(id) {
  return Sqrequest.get('/song/url', {
    id
  }, false)
}