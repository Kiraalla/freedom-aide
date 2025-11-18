exports.moduleFile =`const options = {
  // 组件选项
  options: {
    multipleSlots: true,
  },
  behaviors: [],
  properties: {
    customClass: { type: String, value: '' }, // 自定义样式类名
    customStyle: { type: String, value: '' }, // 自定义样式
  },
  // 组件数据
  data: {
  },
  // 数据监听器
  observers: {},
  // 组件方法
  methods: {
    init() { },
  },
  // 组件生命周期
  lifetimes: {
    created() { },
    attached() {
      this.init()
    },
    ready() {
    },
    moved() { },
    detached() { },
  },
  definitionFilter() { },
  // 页面生命周期
  pageLifetimes: {
    // 页面被展示
    show() { },
    // 页面被隐藏
    hide() { },
    // 页面尺寸变化时
    resize() { },
  },
}
Component(options)				
		
`