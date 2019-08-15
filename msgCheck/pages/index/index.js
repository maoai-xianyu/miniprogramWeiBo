// msgCheck/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    wx.cloud.callFunction({
      name: "msgCheck",
      data: {
        content: "盒子鱼"
      },
      success: res => {
        console.log(res);
      },
      fail: err => {
        console.error(err);
      }
    });

    console.log("request 內容校驗");

    wx.cloud.callFunction({
      name: "msgCheckRequest",
      data: {
        content: "特3456书yuuo莞6543李zxcz蒜7782法fgnv级"
      },
      success: res => {
        console.log(res);
      },
      fail: err => {
        console.error(err);
      }
    })

  }
})