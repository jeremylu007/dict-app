Page({
  data: {
    inputShowed: false,
    searchStr: ""
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
  }
});