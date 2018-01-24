Page({
  data: {
    wordInfo: {},
    tabs: ["基本信息", "象形字典", "小学堂", "汉字叔叔", "汉典书法"],
    activeIndex: 0,
    sliderWidth: 80,
    sliderOffset: 0,
    sliderLeft: 0,
    imgCount: 0
  },

  onLoad: function(params) {
    wx.showLoading({ title: '加载中' })
    // console.log(params)
    // params = { id: "1156", name: "我" }
    wx.setNavigationBarTitle({ title: '“' + params.name + '”字的解释' })
    var that = this
    wx.request({
      url: 'https://vividict.cn/words/' + params.id,
      //url: 'http://localhost:3006/words/' + params.id,
      success: function (res) {
        wx.hideLoading()
        var wordInfo = res.data.data
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

    var imgList = wx.getStorageSync('imgList') || []
    this.setData({imgCount: imgList.length})
  },

  previewViviImg(current) {
    if(current && current.target) {
      current = current.target.dataset.url
    }
    wx.previewImage({
      current: current,
      urls: [
        this.data.wordInfo.viviInfo.evolveImgUrl,
        this.data.wordInfo.viviInfo.clueImgUrl
      ]
    })
  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  dealImg(current) {
    var that = this

    if (current && current.target) {
      current = current.target.dataset.item
    }

    wx.showActionSheet({
      itemList: ['添加为素材', '保存至相册'],
      success: function (res) {
        if (!res.cancel) {
          if(res.tapIndex === 0) {
            var imgList = wx.getStorageSync('imgList') || []
            imgList.push(current)
            wx.setStorageSync( 'imgList',  imgList)
            wx.showToast({
              title: '已添加',
              icon: 'success',
              duration: 1000
            });
            that.setData({ imgCount: imgList.length })
          } else {
            wx.showToast({
              title: '尚未实现',
              icon: 'success',
              duration: 2000
            });
          }
        }
      }
    });
  }
});
