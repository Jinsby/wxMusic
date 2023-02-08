const BASE_URL = "http://123.207.32.32:9000"

const LOGIN_BASE_URL = "http://123.207.32.32:3000"

const bend_Url = "http://localhost:3000"

const token = wx.getStorageSync('token')
class SQrequest {
  constructor(baseUrl, authHeader = {}) {
    this.baseUrl = baseUrl
    this.authHeader = authHeader
  }

  requset(url, method, params, isAuth = false, header = {
    'content-type': 'application/x-www-form-urlencoded',
    // 'cookie': wx.getStorageSync('cookie'),
    // 'userId': wx.getStorageSync('userId'),
    // 'createTime': wx.getStorageSync('createTime'),
    // 'userId': '8216910288',
    // 'createTime': '1672024321187',
    'cookie': 'MUSIC_R_T=1496039817204; Max-Age=2147483647; Expires=Mon, 22 Jan 2091 17:15:29 GMT; Path=/wapi/clientlog; HTTPOnly;MUSIC_A_T=1491282735231; Max-Age=2147483647; Expires=Mon, 22 Jan 2091 17:15:29 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_A_T=1491282735231; Max-Age=2147483647; Expires=Mon, 22 Jan 2091 17:15:29 GMT; Path=/wapi/feedback; HTTPOnly;MUSIC_R_T=1496039817204; Max-Age=2147483647; Expires=Mon, 22 Jan 2091 17:15:29 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_SNS=; Max-Age=0; Expires=Wed, 04 Jan 2023 14:01:22 GMT; Path=/;MUSIC_R_T=1496039817204; Max-Age=2147483647; Expires=Mon, 22 Jan 2091 17:15:29 GMT; Path=/neapi/feedback; HTTPOnly;MUSIC_R_T=1496039817204; Max-Age=2147483647; Expires=Mon, 22 Jan 2091 17:15:29 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_R_T=1496039817204; Max-Age=2147483647; Expires=Mon, 22 Jan 2091 17:15:29 GMT; Path=/neapi/clientlog; HTTPOnly;__csrf=f5160f85bda5b026822ffe74f2d8f37f; Max-Age=1296010; Expires=Thu, 19 Jan 2023 14:01:32 GMT; Path=/;;MUSIC_A_T=1491282735231; Max-Age=2147483647; Expires=Mon, 22 Jan 2091 17:15:29 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_A_T=1491282735231; Max-Age=2147483647; Expires=Mon, 22 Jan 2091 17:15:29 GMT; Path=/wapi/clientlog; HTTPOnly;MUSIC_U=70cede0bec35d55f138f307316cc6a9db259013c90dad64d381cb38a71f38d70993166e004087dd35bb87bbc3a16a3ffd534735fb61dcc44491034d54898300b1e50cf6e4dfd1196a0d2166338885bd7; Max-Age=15552000; Expires=Mon, 03 Jul 2023 14:01:22 GMT; Path=/; HTTPOnly;MUSIC_A_T=1491282735231; Max-Age=2147483647; Expires=Mon, 22 Jan 2091 17:15:29 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_A_T=1491282735231; Max-Age=2147483647; Expires=Mon, 22 Jan 2091 17:15:29 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_A_T=1491282735231; Max-Age=2147483647; Expires=Mon, 22 Jan 2091 17:15:29 GMT; Path=/api/feedback; HTTPOnly;MUSIC_R_T=1496039817204; Max-Age=2147483647; Expires=Mon, 22 Jan 2091 17:15:29 GMT; Path=/api/feedback; HTTPOnly;MUSIC_A_T=1491282735231; Max-Age=2147483647; Expires=Mon, 22 Jan 2091 17:15:29 GMT; Path=/weapi/feedback; HTTPOnly;MUSIC_A_T=1491282735231; Max-Age=2147483647; Expires=Mon, 22 Jan 2091 17:15:29 GMT; Path=/neapi/feedback; HTTPOnly;MUSIC_R_T=1496039817204; Max-Age=2147483647; Expires=Mon, 22 Jan 2091 17:15:29 GMT; Path=/wapi/feedback; HTTPOnly;MUSIC_R_T=1496039817204; Max-Age=2147483647; Expires=Mon, 22 Jan 2091 17:15:29 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_R_T=1496039817204; Max-Age=2147483647; Expires=Mon, 22 Jan 2091 17:15:29 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_R_T=1496039817204; Max-Age=2147483647; Expires=Mon, 22 Jan 2091 17:15:29 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_A_T=1491282735231; Max-Age=2147483647; Expires=Mon, 22 Jan 2091 17:15:29 GMT; Path=/neapi/clientlog; HTTPOnly;MUSIC_A_T=1491282735231; Max-Age=2147483647; Expires=Mon, 22 Jan 2091 17:15:29 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_R_T=1496039817204; Max-Age=2147483647; Expires=Mon, 22 Jan 2091 17:15:29 GMT; Path=/weapi/feedback; HTTPOnly',

  }) {
    const finalHeader = isAuth ? {
      ...this.authHeader
    } : header

    return new Promise((resolve, reject) => {
      wx.request({
        url: this.baseUrl + url,
        method: method,
        data: params,
        header: finalHeader,
        success(res) {
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }
      });
    })
  }

  get(url, params, isAuth = false, header) {
    return this.requset(url, "GET", params, isAuth, header)
  }
  post(url, params, isAuth = false, header) {
    return this.requset(url, "POST", params, isAuth, header)
  }


}

const Sqrequest = new SQrequest(BASE_URL)

const sqLoginRequset = new SQrequest(LOGIN_BASE_URL, {
  token
})

const bendi = new SQrequest(bend_Url)

export default Sqrequest

export {
  sqLoginRequset,
  bendi
}

// {
//   'content-type': 'application/x-www-form-urlencoded',
//   'token': this.token,
//   'cookie': wx.getStorageSync('cookie'),
//   'userId': wx.getStorageSync('userId'),
//   'createTime': wx.getStorageSync('createTime'),
// 'userId': '8216910288',
// 'createTime': '1672024321187',
// 'cookie': 'MUSIC_A_T=1672024321187; Max-Age=2147483647; Expires=Sat, 20 Jan 2091 11:19:09 GMT; Path=/wapi/clientlog;;__csrf=d89e0227188ca1870fa42bf953b56697; Max-Age=1296010; Expires=Tue, 17 Jan 2023 08:05:12 GMT; Path=/;;MUSIC_A_T=1672024321187; Max-Age=2147483647; Expires=Sat, 20 Jan 2091 11:19:09 GMT; Path=/weapi/clientlog;;MUSIC_A_T=1672024321187; Max-Age=2147483647; Expires=Sat, 20 Jan 2091 11:19:09 GMT; Path=/weapi/feedback;;MUSIC_R_T=; Max-Age=0; Expires=Mon, 02 Jan 2023 08:05:02 GMT; Path=/;;MUSIC_A_T=1672024321187; Max-Age=2147483647; Expires=Sat, 20 Jan 2091 11:19:09 GMT; Path=/neapi/feedback;;MUSIC_R_T=0; Max-Age=2147483647; Expires=Sat, 20 Jan 2091 11:19:09 GMT; Path=/weapi/feedback;;MUSIC_R_T=0; Max-Age=2147483647; Expires=Sat, 20 Jan 2091 11:19:09 GMT; Path=/wapi/clientlog;;MUSIC_R_T=0; Max-Age=2147483647; Expires=Sat, 20 Jan 2091 11:19:09 GMT; Path=/openapi/clientlog;;MUSIC_R_T=0; Max-Age=2147483647; Expires=Sat, 20 Jan 2091 11:19:09 GMT; Path=/wapi/feedback;;MUSIC_R_T=0; Max-Age=2147483647; Expires=Sat, 20 Jan 2091 11:19:09 GMT; Path=/api/clientlog;;MUSIC_A_T=1672024321187; Max-Age=2147483647; Expires=Sat, 20 Jan 2091 11:19:09 GMT; Path=/openapi/clientlog;;MUSIC_A=bf8bfeabb1aa84f9c8c3906c04a04fb864322804c83f5d607e91a04eae463c9436bd1a17ec353cf7ecd610ddb85cbb0564318c12724e7532993166e004087dd33243ab2698c09b58ff502c87eeb0105a15c0094ad3161e92c728063f7b13b507807e650dd04abd3fb8130b7ae43fcc5b; Max-Age=1296000; Expires=Tue, 17 Jan 2023 08:05:02 GMT; Path=/;;MUSIC_A_T=1672024321187; Max-Age=2147483647; Expires=Sat, 20 Jan 2091 11:19:09 GMT; Path=/eapi/feedback;;MUSIC_R_T=0; Max-Age=2147483647; Expires=Sat, 20 Jan 2091 11:19:09 GMT; Path=/neapi/feedback;;MUSIC_R_T=0; Max-Age=2147483647; Expires=Sat, 20 Jan 2091 11:19:09 GMT; Path=/eapi/feedback;;MUSIC_A_T=1672024321187; Max-Age=2147483647; Expires=Sat, 20 Jan 2091 11:19:09 GMT; Path=/eapi/clientlog;;MUSIC_A_T=1672024321187; Max-Age=2147483647; Expires=Sat, 20 Jan 2091 11:19:09 GMT; Path=/api/clientlog;;MUSIC_R_T=0; Max-Age=2147483647; Expires=Sat, 20 Jan 2091 11:19:09 GMT; Path=/eapi/clientlog;;MUSIC_R_T=0; Max-Age=2147483647; Expires=Sat, 20 Jan 2091 11:19:09 GMT; Path=/neapi/clientlog;;MUSIC_A_T=1672024321187; Max-Age=2147483647; Expires=Sat, 20 Jan 2091 11:19:09 GMT; Path=/neapi/clientlog;;MUSIC_R_T=0; Max-Age=2147483647; Expires=Sat, 20 Jan 2091 11:19:09 GMT; Path=/api/feedback;;MUSIC_R_T=0; Max-Age=2147483647; Expires=Sat, 20 Jan 2091 11:19:09 GMT; Path=/weapi/clientlog;;MUSIC_A_T=1672024321187; Max-Age=2147483647; Expires=Sat, 20 Jan 2091 11:19:09 GMT; Path=/api/feedback;;MUSIC_SNS=; Max-Age=0; Expires=Mon, 02 Jan 2023 08:05:02 GMT; Path=/;MUSIC_A_T=1672024321187; Max-Age=2147483647; Expires=Sat, 20 Jan 2091 11:19:09 GMT; Path=/wapi/feedback;',

// } 

// userId	8216910288
// createTime	1672024321187
// cookid MUSIC_R_T=0; Max-Age=2147483647; Expires=Tue, 16 Jan 2091 11:34:43 GMT; Path=/eapi/feedback;;MUSIC_A_T=1672024321187; Max-Age=2147483647; Expires=Tue, 16 Jan 2091 11:34:43 GMT; Path=/api/clientlog;;__csrf=4d91c57a2e31ca585ab6acfa537dfa63; Max-Age=1296010; Expires=Fri, 13 Jan 2023 08:20:46 GMT; Path=/;;MUSIC_A_T=1672024321187; Max-Age=2147483647; Expires=Tue, 16 Jan 2091 11:34:43 GMT; Path=/eapi/clientlog;;MUSIC_R_T=0; Max-Age=2147483647; Expires=Tue, 16 Jan 2091 11:34:43 GMT; Path=/wapi/clientlog;;MUSIC_A_T=1672024321187; Max-Age=2147483647; Expires=Tue, 16 Jan 2091 11:34:43 GMT; Path=/neapi/clientlog;;MUSIC_A=bf8bfeabb1aa84f9c8c3906c04a04fb864322804c83f5d607e91a04eae463c9436bd1a17ec353cf7780b772014e079de794517b4482a57a2993166e004087dd3deb584801bc234d96ba28b7173147d7e15c0094ad3161e92c728063f7b13b507807e650dd04abd3fb8130b7ae43fcc5b; Max-Age=1296000; Expires=Fri, 13 Jan 2023 08:20:36 GMT; Path=/;;MUSIC_R_T=0; Max-Age=2147483647; Expires=Tue, 16 Jan 2091 11:34:43 GMT; Path=/neapi/feedback;;MUSIC_A_T=1672024321187; Max-Age=2147483647; Expires=Tue, 16 Jan 2091 11:34:43 GMT; Path=/api/feedback;;MUSIC_SNS=; Max-Age=0; Expires=Thu, 29 Dec 2022 08:20:36 GMT; Path=/;MUSIC_A_T=1672024321187; Max-Age=2147483647; Expires=Tue, 16 Jan 2091 11:34:43 GMT; Path=/wapi/clientlog;;MUSIC_A_T=1672024321187; Max-Age=2147483647; Expires=Tue, 16 Jan 2091 11:34:43 GMT; Path=/weapi/clientlog;;MUSIC_R_T=0; Max-Age=2147483647; Expires=Tue, 16 Jan 2091 11:34:43 GMT; Path=/openapi/clientlog;;MUSIC_R_T=0; Max-Age=2147483647; Expires=Tue, 16 Jan 2091 11:34:43 GMT; Path=/weapi/clientlog;;MUSIC_A_T=1672024321187; Max-Age=2147483647; Expires=Tue, 16 Jan 2091 11:34:43 GMT; Path=/wapi/feedback;;MUSIC_R_T=0; Max-Age=2147483647; Expires=Tue, 16 Jan 2091 11:34:43 GMT; Path=/api/clientlog;;MUSIC_R_T=0; Max-Age=2147483647; Expires=Tue, 16 Jan 2091 11:34:43 GMT; Path=/weapi/feedback;;MUSIC_A_T=1672024321187; Max-Age=2147483647; Expires=Tue, 16 Jan 2091 11:34:43 GMT; Path=/openapi/clientlog;;MUSIC_A_T=1672024321187; Max-Age=2147483647; Expires=Tue, 16 Jan 2091 11:34:43 GMT; Path=/weapi/feedback;;MUSIC_R_T=0; Max-Age=2147483647; Expires=Tue, 16 Jan 2091 11:34:43 GMT; Path=/api/feedback;;MUSIC_R_T=0; Max-Age=2147483647; Expires=Tue, 16 Jan 2091 11:34:43 GMT; Path=/neapi/clientlog;;MUSIC_R_T=; Max-Age=0; Expires=Thu, 29 Dec 2022 08:20:36 GMT; Path=/;;MUSIC_A_T=1672024321187; Max-Age=2147483647; Expires=Tue, 16 Jan 2091 11:34:43 GMT; Path=/neapi/feedback;;MUSIC_R_T=0; Max-Age=2147483647; Expires=Tue, 16 Jan 2091 11:34:43 GMT; Path=/eapi/clientlog;;MUSIC_A_T=1672024321187; Max-Age=2147483647; Expires=Tue, 16 Jan 2091 11:34:43 GMT; Path=/eapi/feedback;;MUSIC_R_T=0; Max-Age=2147483647; Expires=Tue, 16 Jan 2091 11:34:43 GMT; Path=/wapi/feedback;