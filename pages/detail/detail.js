
Page({
  data: {
    wordInfo: {},
    tabs: ["基本信息", "象形字典", "小学堂", "汉字叔叔"],
    activeIndex: 0,
    sliderOffset: -8,
    sliderLeft: 0,
  },

  onLoad: function(params) {
    console.log(params)
    wx.setNavigationBarTitle({ title: '“' + params.word + '”字的解释' })
    var that = this
    
    wx.request({
      url: 'http://47.93.97.73:3006/words?searchStr=' + params.word,
      success: function (res) {
        var wordInfo = res.data.data[0]
        that.setData({wordInfo: wordInfo })
      }
    });
  },

  previewViviImg() {
    wx.previewImage({
      urls: [this.data.wordInfo.viviInfo.evolveImgUrl]
    })
  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft - 10,
      activeIndex: e.currentTarget.id
    });
  }
});