Page({
  data: {
    inputShowed: false,
    searchStr: "",
    searching: false,
    prepareSearch: false,
    wordList: [],
  },
  onLoad() {
    wx.setNavigationBarTitle({title: '我要查汉字'})
    //this.search()
  },
  showInput: function () {
    this.setData({
      inputShowed: true,
      prepareSearch: true,
    });

    // wx.hideTabBar({
    //   aniamtion: true
    // })
  },
  hideInput: function () {
    this.setData({
      searchStr: "",
      inputShowed: false,
      wordList: []
    });
  },
  clearInput: function () {
    this.setData({
      searchStr: "",
      inputShowed: true
    });
  },
  inputTyping: function (e) {
    this.setData({
      searchStr: e.detail.value
    }); 
  },

  search: function() {
    //wx.navigateTo({ url: '/pages/detail/detail?word=' + this.data.searchStr})
    var that = this
    var searchStr = this.data.searchStr

    that.setData({
      searching: true,
      wordList: []
    })
    wx.request({
      url: 'https://vividict.cn/words/search?searchStr=' + searchStr,
      //url: 'http://localhost:3006/words/search?searchStr=' + searchStr,
      success: function (res) {
        var wordList = res.data.data

        // sort result order by searchStr
        wordList = wordList.sort(function (a, b) {
          if (searchStr.indexOf(a.name) > searchStr.indexOf(b.name)) {
            return 1
          } else {
            return -1
          }
        })

        that.setData({
          searching: false,
          prepareSearch: false,
           wordList: wordList
          })        
      }
    });
  }
});