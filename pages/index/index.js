Page({
  data: {
    inputShowed: false,
    searchStr: '',
    searching: false,
    prepareSearch: false,
    wordList: [],
    totalHistory: [],
    filterHistory: [],
    history: []
  },
  onLoad() {
    wx.setNavigationBarTitle({ title: '我要查汉字' })
    var totalHistory = wx.getStorageSync('searchHistory')
    this.updateHistory(totalHistory)
  },
  showInput: function () {
    this.setData({
      inputShowed: true,
      prepareSearch: true,
    });
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
    var searchStr = e.detail.value
    this.setData({
      searchStr: searchStr
    });

    if(!searchStr) {
      this.updateHistory(this.data.totalHistory)
      return      
    }

    var filterHistory = []
    this.data.totalHistory.forEach(function(item) {
      if (item.indexOf(searchStr) > -1) {
        filterHistory.push(item)
      }
    })

    this.updateHistory(filterHistory, true)
  },

  search: function () {
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

    var totalHistory = this.data.totalHistory || []
    var currIndex = totalHistory.indexOf(searchStr)
    if (currIndex > -1) {
      totalHistory.splice(currIndex, 1)
    }
    totalHistory.unshift(searchStr)

    this.updateHistory(totalHistory)
  },

  updateHistory(newHistory, isSearch) {
    var newData = {
      history: newHistory.slice(0, 6)
    }
    if(isSearch) {
      newData.filterHistory = newHistory
    } else {
      newData.totalHistory = newHistory
      wx.setStorageSync('searchHistory', newHistory)      
    }

    this.setData(newData)
  },

  searchFromHistory: function (e) {
    var item = e.target.dataset.item

    this.setData({
      inputShowed: true,
      searchStr: item,
      prepareSearch: false,
    })

    this.search()
  },

  removeHistoryItem: function (e) {
    var item = e.target.dataset.item
    var index = totalHistory.indexOf(item)
    if (index > -1) {
      totalHistory.splice(index, 1)
    }

    this.setData({
      totalHistory: totalHistory,
      history: totalHistory.slice(0, 6)
    })

    wx.setStorageSync('searchHistory', totalHistory)
  }
});