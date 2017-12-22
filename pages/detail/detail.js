
Page({
  data: {
    wordInfo: {},
    tabs: ["基本信息", "象形字典", "小学堂", "汉字叔叔"],
    activeIndex: 0,
    sliderWidth: 80,
    sliderOffset: 0,
    sliderLeft: 0,
  },

  onLoad: function(params) {
    wx.showLoading({ title: '加载中' })
    // params.word = '兵' 
    wx.setNavigationBarTitle({ title: '“' + params.word + '”字的解释' })
    var that = this
    wx.request({
      url: 'https://vividict.cn/words?searchStr=' + params.word,
      success: function (res) {
        wx.hideLoading()
        var wordInfo = res.data.data[0]
        if(!wordInfo) {
          wx.showToast({ title: '该字尚未收录:(' })
        } else {
          that.setData({wordInfo: wordInfo })
        }
      }
    });
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderWidth: res.windowWidth / that.data.tabs.length
        });
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
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
});