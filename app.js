// app.js
import {
  login
} from './service/api_music'

import {
  getLoginCode,
  codeToToken,
  checkToken,
  checkSession
} from './service/api_login'

App({
  globalData: {
    screenWidth: 0,
    screenHeight: 0,
    statusBarHeight: 0,
    deviceRadio: 0
  },

  onLaunch() {
    // login().then((res) => {
    //   wx.setStorageSync('cookie', res.cookie)
    //   wx.setStorageSync('createTime', res.createTime)
    //   wx.setStorageSync('userId', res.userId)
    // })
    // 获取设备信息
    const info = wx.getSystemInfoSync()
    this.globalData.screenWidth = info.screenWidth
    this.globalData.screenHeight = info.screenHeight
    this.globalData.statusBarHeight = info.statusBarHeight
    // 宽高比
    const deviceRadio = info.screenHeight / info.screenWidth
    this.globalData.deviceRadio = deviceRadio

    wx.showLoading({
      title: '加载中',
    })
    
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    

    // 默认登录 
    // this.handleLogin()

    // 获取用户信息
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        console.log(res);
      }
    })
  },  

  async handleLogin() {
    const token = wx.getStorageSync('token')
    // 判断token是否过期
    const checkResult = await checkToken()
    // 判断session是否过期
    const isSessionExpire = await checkSession() //通过true   没通过false
    console.log(checkResult, isSessionExpire);
    // 判断是否有token
    if (!token || checkResult.errorCode || !isSessionExpire) this.loginAction()

  },


  // wx登录
  async loginAction() {
    const code = await getLoginCode()
    const result = await codeToToken(code)
    console.log(result);
    const token = result.token
    wx.setStorageSync('token', token)
  }
});