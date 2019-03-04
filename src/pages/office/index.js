import '../../assets/style/office.scss'
import $ from 'jquery'
import '../../common'
import '../../utils/LazyLoadModule'
import '../../includes/mixins/SearchTab'
import '../../includes/mixins/CategoryMenu'
import '../../includes/mixins/OpacityBanner'
// import '../../includes/mixins/Tab'
import '../../includes/mixins/SideBar'

window.$ = $

$(function () {
  $('.J_LazyModule').initLazyModule()
  $('.J_SideBar').initSideBar()
})
