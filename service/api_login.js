import {
  bendi,
  sqLoginRequset
} from './index'

export function getLoginCode() {
  return new Promise((reslove, reject) => {
    // 获取code
    wx.login({
      timeout: 1000,
      success: (res) => {
        const code = res.code
        reslove(code)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

export function codeToToken(code) {
  return sqLoginRequset.post("/login", {
    code
  })
}

export function checkToken() {
  return sqLoginRequset.post("/auth", {}, true)
}

export function checkSession() {
  return new Promise((resolve) => {
    wx.checkSession({
      success: () => {
        resolve(true)
      },
      fail: () => {
        resolve(false)
      }
    })
  })
}


export function getUserInfo() {
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })

}

// 获取验证码
export function UserLoginPhone(phone, ) {
  return bendi.get("/captcha/sent", {
    phone
  }, false, {})
}
// 登录验证
export function UserPhoneVerify(phone, captcha) {
  console.log(phone, captcha);
  return bendi.get("/login/cellphone", {
    phone,
    captcha
  }, false, {})
}

// /login/qr/key
// 生成二维码
export function getLoginKey() {
  return bendi.get(`/login/qr/key?timerstamp=${Date.now()}`, {}, false, {})
}
// 生成二维码图片/login/qr/create
export function LoginQrCreate(key) {
  return bendi.get(`/login/qr/create?key=${key}&qrimg=true&timerstamp=${Date.now()}`)
}
// 二维码检测状态/login/qr/check
export function LoginQrCheck(key) {
  return bendi.get("/login/qr/check", {
    key
  }, false, {})
}

// 登录状态
export function getLoginStatus(cookie=''){
  return bendi.get(`/login/status?timerstamp=${Date.now()}`,{cookie},false,{})
}