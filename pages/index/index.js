Page({
  data: {
    inputShowed: false,
    searchStr: ""
  },
  onLoad() {
    wx.setNavigationBarTitle({title: '我要查汉字'})
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      searchStr: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      searchStr: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      searchStr: e.detail.value
    }); 
  },

  search: function() {
    wx.navigateTo({ url: '/pages/detail/detail?word=' + this.data.searchStr})
  }
});