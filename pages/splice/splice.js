Page({
  data: {
    selectedItem: null,
    activeSpliceIndex: null,
    activeSelectIndex: null,
    spliceList: [],
    imgList: [],
    moveX: 0,
    moveY: 0,
    half: 37.5
  },

  onLoad: function() {
    wx.setNavigationBarTitle({title: '图片拼接'})
    var imgList = wx.getStorageSync('imgList') || []

    var spliceList = []
    for(var i=0; i<25; i++) {
      spliceList.push({ type: 'splice' })
    }

    this.setData({
      imgList: imgList,
      spliceList: spliceList
    })
  },

  moveStart: function() {
    console.log('move start')

    var that = this

    wx.createSelectorQuery().selectAll('.splice-panel .cell').boundingClientRect(function(rects) {
      rects.forEach(function(rect) {
        rect.center = {
          x: rect.left + that.data.half,
          y: rect.top + that.data.half,
        }
      })

      that.cellList = rects
      // console.log(rects)
    }).exec()
  },

  dealMove: function(e) {
    if(this.dealing) return

    var that = this

    that.dealing = true
    // console.log('moving', e)
    var target = e.touches[0]

    var x = target.pageX
    var y = target.pageY
    var activeSpliceIndex = null

    for(var i=0; i<that.cellList.length; i++) {
      var cell = that.cellList[i]

      if((Math.abs(x - cell.center.x) < that.data.half) && (Math.abs(y - cell.center.y) < that.data.half)) {
        activeSpliceIndex = cell.dataset.index
        break;
      }
    }

    if(that.preSpliceIndex !== activeSpliceIndex) {
      that.preSpliceIndex = activeSpliceIndex

      var spliceList = that.data.spliceList

      if(activeSpliceIndex !== null) {
        var activeItem = that.data.spliceList[activeSpliceIndex]
        if(activeItem.url) {
          for(var j=spliceList.length; j>activeSpliceIndex; j--) {
            spliceList[j] = spliceList[j-1]
          }
        }
      }

      that.setData({
        activeSpliceIndex: activeSpliceIndex,
        spliceList: spliceList
      })
    }

    setTimeout(function() {
      that.dealing = false
    }, 300)
  },

  moveEnd: function() {
    console.log('move end')
    var activeSpliceIndex = this.data.activeSpliceIndex
    var spliceList = this.data.spliceList

    if(activeSpliceIndex !== null) {
      var newItem = {
        title: this.data.selectedItem.title,
        url: this.data.selectedItem.url,
        type: 'splice'
      }

      spliceList.splice(activeSpliceIndex, 1, newItem)
    }

    this.setData({
      spliceList: spliceList,
      activeSpliceIndex: null,
      selectedItem: null,
      preSpliceIndex: null
    })
  },

  preMove: function(e) {
    var selected = e.target.dataset.item
    var spliceList = this.data.spliceList

    var target = e.touches[0]
    if(selected.type === 'splice') {
      var index = e.target.dataset.index

      spliceList.splice(index, 1, { type: 'splice' })
    }

    this.setData({
      selectedItem: selected,
      spliceList: spliceList,
      moveX: target.pageX - this.data.half,
      moveY: target.pageY - this.data.half,
    })
  }
});
