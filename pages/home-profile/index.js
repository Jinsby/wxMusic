// pages/home-profile/index.js
import {
  getUserInfo,
  getLoginCode,
  UserLoginPhone,
  UserPhoneVerify,
  getLoginKey,
  LoginQrCreate,
  LoginQrCheck,
  getLoginStatus
} from '../../service/api_login'
import {
  checkToken
} from '../../service/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    userInfos: {},
    phoneValue: '',
    qrimg: '',
    QrKey: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    // this.loginKey()
  },

  // 
  handleGetInfo(event) {
    console.log(event);
  },
  async handleGetUserInfo(event) {
    // 获取用户信息
    const userInfo = await getUserInfo()
    console.log(userInfo);
    this.setData({
      userInfo: userInfo.userInfo
    })
  },
  handleGetUserPhone(event) {
    console.log(event);
  },

  // User/login/cellphone
  // 登录验证
  async submit(event) {
    const info = event.detail.value
    console.log(info);
    // const = UserLoginPhone()
    await UserPhoneVerify(info.phone, info.captcha).then(res => {
      console.log(res);
    })
  },
  // 绑定手机号
  bindKeyInput(e) {
    this.setData({
      phoneValue: e.detail.value
    })
  },
  // 发送验证码
  async toPhone() {
    const phone = this.data.phoneValue
    // console.log(phone);
    const aa = await UserLoginPhone(
      phone
    )
    console.log(aa);
  },
  // 生成二维码
  async loginKey() {
    let timer
    const cookie = wx.getStorageSync('cookie')
    await getLoginStatus(cookie).then((res) => {
      console.log(res);
      this.setData({
        userInfos: res.data
      })
    })
    // 获取key
    await getLoginKey().then((res) => {
      console.log(res);
      this.setData({
        QrKey: res.data.unikey
      })
    })
    // 根据key生成图片
    await LoginQrCreate(this.data.QrKey).then(res => {
      console.log(res);
      this.setData({
        qrimg: res.data.qrimg
      })
    })

    // 检测扫码状态
    timer = setInterval(async () => {
      const statusRes = await LoginQrCheck(this.data.QrKey)
      if (statusRes.code === 800) {
        wx.showToast({
          title: statusRes.message,
          icon: "error"
        })
        clearInterval(timer)
      }
      if (statusRes.code === 803) {
        // 这一步会返回cookie
        clearInterval(timer)
        wx.showToast({
          title: statusRes.message,
          icon: "success"
        })
        // 获取用户信息
        await getLoginStatus(statusRes.cookie).then((res) => {
          console.log(res);
          this.setData({
            userInfos: res.data
          })
        })
        wx.setStorageSync('cookie', statusRes.cookie)
      }
    }, 3000)
  },
  // 检测二维码状态
  loginQrCheck() {
    LoginQrCheck(this.data.QrKey).then((res) => {
      console.log(res);
      wx.showToast({
        title: res.message,
        icon: "success"
      })
    })
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