var casesData = require('../../data/case-data.js')

Page({
  data: {
    
  },
  onLoad: function () {
    this.setData({
      caseList: casesData.caseList
    });
  },

  onReachBottom: function (event) {
    console.log('asdfasdfasdf')
  }
})