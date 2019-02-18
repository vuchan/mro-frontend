import $, { extend, isFunction, noop } from 'jquery'

const defaults = {
  ele: '.J_Tab',
  item: '.J_TabItem',
  content: '.J_TabCont',
  indicator: '.J_TabActiveIndicator',
  activeCls: 'active',
  disabledCls: 'disabled',
  currentIndex: 0,
  getItemIndex: ($currentItem) => $currentItem.attr('data-index'),
  triggerEvents: 'click',
  callback: noop
}

class Tab {
  constructor (options) {
    this.options = extend(defaults, options)
    const { ele, item, content, currentIndex, indicator } = this.options

    this.$ele = $(ele)
    this.$items = this.$ele.find(item)
    this.$contents = this.$ele.find(content)
    this.$indicator = this.$ele.find(indicator)
    this.currentIndex = currentIndex || 0

    this.checkState()
    this.bindEvents()
    this.updateActiveByIndex(this.currentIndex)
  }

  checkState () {}

  bindEvents () {
    const self = this
    const { triggerEvents, item, getItemIndex } = this.options
    const itemCls = item.replace(/^(\.|#)/, '')

    this.$items.parent().bind(triggerEvents, function bindingEvents (e) {
      let $target = $(e.target)
      const isSpan = $target.prop('tagName') === 'SPAN'
      const isAnchor = $target.prop('tagName') === 'A'
      let isItem = !isSpan && isAnchor && $target.hasClass(itemCls)

      if (isSpan) {
        $target = $target.parent()
        isItem = $target.hasClass(itemCls)
      }

      if (isItem) {
        self.updateActiveByIndex(getItemIndex($target))
      }
    })
  }

  updateActiveByIndex (nextIndex) {
    const { activeCls } = this.options
    const $currentItem = this.$items.eq(nextIndex)
    const $currentContent = this.$contents.eq(nextIndex)

    $currentItem.addClass(activeCls).siblings().removeClass(activeCls)
    $currentContent.addClass(activeCls).siblings().removeClass(activeCls)

    this.updateIndicator($currentItem)
    this.execute(nextIndex)
  }

  updateIndicator ($item) {
    const left = $item.position().left
    const width = $item.outerWidth()

    this.$indicator.animate({
      left,
      width
    }, 'fast')
  }

  execute (nextIndex) {
    if (this.currentIndex !== nextIndex) {
      this.currentIndex = nextIndex
      this.options.callback(nextIndex)
    }
  }
}

$.fn.tab = function $tab (options = {}) {
  return this.each(function () {
    return new Tab(
      isFunction(options) ? {
        ...options,
        callback: options,
        ele: this
      } : {
        ...options,
        ele: this
      }
    )
  })
}

// Initialize .J_Preview with callback function
export default $(() => {
  return $('.J_Tab').tab({
    currentIndex: 0,
    callback: function callback (idx) {
      console.log(idx)
    }
  })
})
