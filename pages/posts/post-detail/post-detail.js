var postsData = require('../../../data/posts-data.js')
var app = getApp();
Page({
  data: {
    collected: false
  },
  onLoad: function (options) {
    var postId = options.id;
    this.data.currentPostId = postId;
    var postData = postsData.postList[postId];
    this.setData({
      postData: postData
    })
    //一组文章缓存判空
    var postsCollected = wx.getStorageSync('postsCollected')
    if (postsCollected) {
      //单篇文章缓存判空
      var postCollected = postsCollected[postId]
      if (postCollected) {
        this.setData({
          collected: postCollected
        })
      }
    }
    else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('postsCollected', postsCollected);
    }
  },


  onColletionTap: function (event) {
    var that = this;
    //一组文章状态
    var postsCollected = wx.getStorageSync('postsCollected')
    //单篇文章状态
    var collected = postsCollected[this.data.currentPostId]

    wx.showModal({
      content: collected ? "是否取消收藏" : "是否收藏",
      showCancel: "true",
      cancelText: "取消",
      cancelColor: "#333",
      confirmText: "确认",
      confirmColor: "#405f80",
      success: function (res) {
        if (res.confirm) {
          collected = !collected
          postsCollected[that.data.currentPostId] = collected
          wx.setStorageSync('postsCollected', postsCollected)
          that.setData({ collected })
        }
      }
    })
  }

})