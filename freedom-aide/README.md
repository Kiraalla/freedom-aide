### 自由の助手

1. 创建小程序组件、小程序页面，自动生成wxml、js、wxss、json文件、自动追加页面路径到app.json的pages中
2. 非微信原生标签高亮、wxml格式化可配置
3. 支持css、js(es6)、微信API、jq、layui、VantUI、vue的代码块，并在下文添加了简写对照
4. 支持vue-peek、wxml跳转定义组件
5. 优化vue的style模块内代码提示，现在lang=scss|postcss|less|stylus|css可以自动提示
   
- 后续会添加更多功能


(下面是代码块对照，Ctrl+F快速查找)


### CSS代码块（css、scss、less文件可用）

| 缩写| 描述 |
| ---- | ---- |
| bd | 简单注释结构 |
| df | 布局样式 |
| fs | 文字样式 |
| ov1 | 文字省略 |
| ov2 | 文字省略-多行 |
| posl0 | 绝对定位-上左 |
| poscx | 绝对定位-左右居中 |
| poscy | 绝对定位-上下居中 |
| posc | 绝对定位-居中 |
| before | 伪类-before |
| after | 伪类-after |
| hover | 伪类-hover |
| focus | 伪类-focus |
| active | 伪类-active |
| disabled | 伪类-disabled |
| var | 变量 |
| btn | 按钮 |
| reset | 标签样式重置 |
| link | 标签样式-链接 |
| title | 标签样式-标题 |
| p | 标签样式-段落 |
| ul | 标签样式-列表 |
| li | 标签样式-列表项 |
| table | 标签样式-表格 |
| tr | 标签样式-表格行 |
| td | 标签样式-表格单元格 |
| form | 标签样式-表单 |


### JS代码块

| 缩写| 描述 |
| ---- | ---- |
| ci | "console.info" |
| cl | "console.log" |
| ce | "console.error" |
| cw | "console.warn" |
| cd | "console.dir" |
| ae | "addEventListener" |
| ac | "appendChild" |
| rc | "removeChild" |
| cel | "createElement" |
| cdf | "createDocumentFragment" |
| ca | "classList.add" |
| ct | "classList.toggle" |
| cr | "classList.remove" |
| gi | "getElementById" |
| gc | "getElementsByClassName" |
| gt | "getElementsByTagName" |
| ga | "getAttribute" |
| sa | "setAttribute" |
| ra | "removeAttribute" |
| ih | "innerHTML" |
| tc | "textContent" |
| qs | "querySelector" |
| qsa | "querySelectorAll" |
| fl | for 循环 |
| rfl | reverse for 循环 |
| fi | for in 循环 |
| fo | for of 循环 (ES6) |
| wl | while 循环 |
| fn | 定义name函数 |
| iife | 立即调用的函数表达式 (IIFE) |
| fa | apply函数 |
| fc | call函数 |
| fb | bind函数 |
| af | 无body箭头函数 (ES6) |
| afb | 带body箭头函数 (ES6) |
| gf | 生成器函数 (ES6) |
| gfn | 定义name生成器函数 (ES6) |
| seq | 生成一个 0 - (length-1) 的连续数字的数组 |
| fe | forEach 循环 |
| map | map |
| reduce | reduce |
| filter | filter |
| find | find |
| jp | 'JSON.parse' |
| js | 'JSON.stringify' |
| si | 'setInterval' |
| st | 'setTimeout' |
| us | 'use strict' |
| al | 'alert' |
| co | 'confirm' |
| pm | 'prompt' |
| ter | 三元运算符 |
| de | "debugger" |


### JQ代码块

| 缩写| 描述 |
| ---- | ---- |
| func | 一个匿名函数. |
| jqAfter | 在匹配元素集中的每个元素之后插入由参数指定的内容. |
| jqAjax | 执行异步HTTP（Ajax）请求. |
| jqAjaxAspNetWebService | 对ASP执行异步HTTP（Ajax）请求。NET web服务. |
| jqAppend | 将参数指定的内容插入到匹配元素集中每个元素的末尾. |
| jqAppendTo | 将匹配元素集中的每个元素插入到目标的末尾. |
| jqAttrGet | 获取匹配元素集中第一个元素的属性值. |
| jqAttrRemove | 从匹配元素集中的每个元素中删除一个属性 |
| jqAttrSet | 为匹配的元素集设置一个或多个属性 |
| jqAttrSetFn | 为匹配的元素集设置一个或多个属性 |
| jqAttrSetObj | 为匹配的元素集设置一个或多个属性 |
| jqBefore | 在匹配元素集中的每个元素之前插入由参数指定的内容 |
| jqBind | 为元素的事件附加一个处理程序 |
| jqBindWithData | 为元素的事件附加一个处理程序 |
| jqBlur | 将事件处理程序绑定到“blur”JavaScript事件，或在元素上触发该事件 |
| jqChange | 将事件处理程序绑定到“change”JavaScript事件，或在元素上触发该事件 |
| jqClassAdd | 将指定的类添加到匹配元素集的每个元素中 |
| jqClassRemove | 从匹配元素集中的每个元素中删除单个类、多个类或所有类 |
| jqClassToggle | 根据类的存在情况，从匹配元素集中的每个元素中添加或删除一个或多个类 |
| jqClassToggleSwitch | 根据类的存在或开关参数的值，在匹配元素集中的每个元素中添加或删除一个或多个类 |
| jqClick | 将事件处理程序绑定到“click”JavaScript事件，或在元素上触发该事件 |
| jqClone | 创建一个匹配元素集的深度副本 |
| jqCloneWithEvents | 创建一个匹配元素集的深度副本 |
| jqCssGet | 获取匹配元素集中第一个元素的计算样式属性 |
| jqCsSet | 为匹配的元素集设置一个或多个CSS属性 |
| jqcsSetObj | 为匹配的元素集设置一个或多个CSS属性 |
| jqDataGet | 返回jQuery集合中第一个元素的命名数据存储中的值，该值由data（name，value）或HTML5 data-属性设置 |
| jqDataRemove | 删除以前存储的一段数据 |
| jqDataSet | 存储与匹配元素关联的任意数据 |
| jqDataSetObj | 存储与匹配元素相关联的任意数据 |
| jqDie | 从元素中删除以前使用.live（）附加的事件处理程序 |
| jqDieAll | 从元素中删除以前使用.live（）附加的事件处理程序 |
| jqDieFn | 从元素中删除以前使用.live（）附加的事件处理程序 |
| jqDocReady | 在DOM完全加载时执行的函数 |
| jqDocReadyShort | 在DOM完全加载时执行的函数 |
| jqEach | 一个通用迭代器函数，可用于对对象和数组进行无缝迭代。数组和具有length属性的类数组对象（如函数的arguments对象）由数字索引迭代，从0到length-1。其他对象通过其命名属性进行迭代 |
| jqEachElement | 在jQuery对象上迭代，为每个匹配的元素执行一个函数 |
| jqEmpty | 从DOM中移除匹配元素集的所有子节点 |
| jqFadeIn | 通过将匹配的元素渐变为不透明来显示它们 |
| jqFadeInFull | 通过将匹配的元素淡入不透明来显示它们 |
| jqFadeOut | 通过将匹配的元素淡入透明来隐藏它们 |
| jqFadeOutFull | 通过将匹配的元素渐变为透明来隐藏它们 |
| jqFadeTo | 调整匹配元素的不透明度 |
| jqFadeToFull | 调整匹配元素的不透明度 |
| jqFind | 获取由选择器、jQuery对象或元素过滤的当前匹配元素集中每个元素的后代 |
| jqFocus | 将事件处理程序绑定到“焦点”JavaScript事件，或在元素上触发该事件 |
| jqGet | 使用HTTP GET请求从服务器加载数据 |
| jqGetJson | 使用GET HTTP请求从服务器加载JSON编码的数据 |
| jqGetScript | 使用GET HTTP请求从服务器加载一个JavaScript文件，然后执行它 |
| jqHasClass | 确定是否为任何匹配的元素分配了给定的类 |
| jqHeightGet | 获取匹配元素集中第一个元素的当前计算高度 |
| jqHeightSet | 设置每个匹配元素的CSS高度 |
| jqHide | 隐藏匹配的元素 |
| jqHideFull | 隐藏匹配的元素 |
| jqHover | 将两个处理程序绑定到匹配的元素，当鼠标指针进入和离开元素时执行 |
| jqHtmlGet | 获取匹配元素集中第一个元素的HTML内容 |
| jqHtmlSet | 设置匹配元素集中每个元素的HTML内容 |
| jqInnerHeight | 获取匹配元素集中第一个元素的当前计算高度，包括填充但不包括边框 |
| jqInnerWidth | 获取匹配元素集中第一个元素的当前计算内部宽度，包括填充但不包括边框 |
| jqInsertAfter | 在目标之后插入匹配元素集中的每个元素 |
| jqInsertBefore | 在目标之前插入匹配元素集中的每个元素 |
| jqKeyDown | 将事件处理程序绑定到“keydown”JavaScript事件，或在元素上触发该事件 |
| jqKeyPress | 将事件处理程序绑定到“keypress”JavaScript事件，或在元素上触发该事件 |
| jqKeyUp | 将事件处理程序绑定到“keyup”JavaScript事件，或在元素上触发该事件 |
| jqLoadGet | 从服务器加载数据，并将返回的HTML放入匹配的元素中 |
| jqLoadPost | 从服务器加载数据，并将返回的HTML放入匹配的元素中 |
| jqMap | 将数组或对象中的所有项转换为新的项数组 |
| jqMouseDown | 将事件处理程序绑定到“mousedown”JavaScript事件，或在元素上触发该事件 |
| jqMouseEnter | 绑定鼠标进入元素时要触发的事件处理程序，或在元素上触发该处理程序 |
| jqMouseLeaf | 绑定鼠标离开元素时要触发的事件处理程序，或在元素上触发该处理程序 |
| jqMouseMove | 将事件处理程序绑定到“mousemove”JavaScript事件，或在元素上触发该事件 |
| jqMouseOut | 将事件处理程序绑定到“mouseout”JavaScript事件，或在元素上触发该事件 |
| jqMouseOver | 将事件处理程序绑定到“mouseover”JavaScript事件，或在元素上触发该事件 |
| jqMouseUp | 将事件处理程序绑定到“mouseup”JavaScript事件，或在元素上触发该事件 |
| jqNamespace | 命名空间模板。裁判：http://enterprisejquery.com/2010/10/how-good-c-habits-can-encourage-bad-javascript-habits-part-1/ |
| jqOffsetGet | 获取匹配元素集中第一个元素的当前坐标，或设置每个元素相对于文档的坐标 |
| jqOffsetParent | 获取定位的最近的祖先元素 |
| jqOn | 将一个或多个事件的事件处理程序函数附加到所选元素 |
| jqOne | 为元素的事件附加一个处理程序。每个元素每个事件类型最多执行一次处理程序 |
| jqOneWithData | 将处理程序附加到元素的事件。每个元素每个事件类型最多执行一次处理程序 |
| jqOuterHeight | 获取匹配元素集中第一个元素的当前计算高度，包括填充、边框和可选的边距。返回值的数字（不带“px”）表示形式，如果在一组空元素上调用，则返回null |
| jqOuterWidth | 获取匹配元素集中第一个元素的当前计算宽度，包括填充和边框 |
| jqPlugin | 插件模板 |
| jqPosition | 获取匹配元素集中第一个元素相对于偏移父元素的当前坐标 |
| jqPost | 使用HTTP POST请求从服务器加载数据 |
| jqPrepend | 将参数指定的内容插入到匹配元素集中每个元素的开头 |
| jqPrependTo | 将匹配元素集中的每个元素插入到目标的开头 |
| jqRemove | 从DOM中移除一组匹配的元素 |
| jqRemoveExp | 从DOM中移除匹配的元素集 |
| jqReplaceAll | 将每个目标元素替换为匹配的元素集 |
| jqReplaceWith | 用提供的新内容替换匹配元素集中的每个元素，并返回已删除的元素集 |
| jqResize | 将事件处理程序绑定到“resize”JavaScript事件，或在元素上触发该事件 |
| jqScroll | 将事件处理程序绑定到“滚动”JavaScript事件，或在元素上触发该事件 |
| jqScrollLeftGet | 获取匹配元素集中第一个元素的滚动条的当前水平位置 |
| jqScrollLeftSet | 为匹配的元素集合中的每个元素设置滚动条的当前水平位置 |
| jqScrollTopGet | 为匹配元素集中的第一个元素获取滚动条的当前垂直位置，或为每个匹配元素设置滚动条的垂直位置 |
| jqScrollTopSet | 为匹配的元素集中的每个元素设置滚动条的当前垂直位置 |
| jqSelect | 将事件处理程序绑定到“select”JavaScript事件，或在元素上触发该事件 |
| jqSelectTrigger | 将事件处理程序绑定到“select”JavaScript事件，或在元素上触发该事件 |
| jqShow | 显示匹配的元素 |
| jqShowFull | 显示匹配的元素 |
| jqSlideDown | 通过滑动显示匹配的元素 |
| jqSlideDownFull | 通过滑动显示匹配的元素 |
| jqSlideToggle | 通过滑动显示或隐藏匹配的元素 |
| jqSlideToggleFull | 通过滑动显示或隐藏匹配的元素 |
| jqSlideUp | 通过滑动显示匹配的元素 |
| jqSlideUpFull | 通过滑动显示匹配的元素 |
| jqSubmit | 将事件处理程序绑定到“submit”JavaScript事件，或在元素上触发该事件 |
| jqSubmitTrigger | 将事件处理程序绑定到“提交”JavaScript事件，或在元素上触发该事件 |
| jqTextGet | 获取匹配元素集中每个元素的组合文本内容，包括它们的子元素 |
| jqTextSet | 将匹配元素集中每个元素的内容设置为指定的文本 |
| jqToggle | 显示或隐藏匹配的元素 |
| jqToggleFull | 显示或隐藏匹配的元素 |
| jqToggleSwitch | 显示或隐藏匹配的元素 |
| jqTrigger | 执行所有附加到给定事件类型的匹配元素的处理程序和行为 |
| jqTriggerHandler | 执行附加到事件元素的所有处理程序 |
| jqTriggerHandlerWithData | 执行附加到事件元素的所有处理程序 |
| jqTriggerWithData | 执行所有附加到给定事件类型的匹配元素的处理程序和行为 |
| jqUnbind | 从元素中删除以前附加的事件处理程序 |
| jqUnbindAll | 从元素中删除以前附加的事件处理程序 |
| jqUnload | 将事件处理程序绑定到“unload”JavaScript事件 |
| jqValGet | 获取匹配元素集中第一个元素的当前值 |
| jqValSet | 设置匹配元素集中每个元素的值 |
| jqWidthGet | 获取匹配元素集中第一个元素的当前计算宽度 |
| jqWidthSet | 设置匹配元素集中每个元素的CSS宽度 |
| jqWrap | 将一个HTML结构包裹在匹配元素集中的每个元素周围 |
| jqWrapAll | 将HTML结构包裹在匹配元素集中的所有元素周围 |
| jqWrapIner | 在匹配元素集中的每个元素的内容周围包装一个HTML结构 |


### WX-JS 代码块

| 缩写| 描述 |
| ---- | ---- |
| wx-app | App对象及其生命周期函数和回调函数 |
| wx-page | Page对象及其生命周期函数和回调函数 |
| wx-Component | Component对象及其生命周期函数和回调函数 |
| getCurrentPages | 获取当前页面栈 |
| getApp | 获取小程序实例 |
| wx-request | 发起网络请求 |
| reqTask-abort | 中断请求任务。 |
| wx-uploadFile | 将本地资源上传到开发者服务器，客户端发起一个 HTTPS POST 请求，其中 content-type 为 multipart/form-data。 |
| upTask-onProgressUpdate | 监听上传进度变化事件。 |
| upTask-abort | 中断上传任务。 |
| wx-downloadFile | 下载文件资源到本地，客户端直接发起一个HTTP GET请求，返回文件的本地临时路径。 |
| downTask-onProgressUpdate | 监听下载进度变化事件。 |
| downTask-abort | 中断下载任务。 |
| wx-connectSocket | 创建一个WebSocket连接。 |
| wx-onSocketOpen | 监听WebSocket连接打开事件。 |
| wx-onSocketError | 监听WebSocket错误。 |
| wx-sendSocketMessage | 通过WebSocket连接发送数据，需要先wx.connectSocket，并在wx.onSocketOpen回调之后才能发送。 |
| wx-onSocketMessage | 监听WebSocket接受到服务器的消息事件。 |
| wx-closeSocket | 关闭WebSocket连接。 |
| wx-onSocketClose | 监听WebSocket关闭。 |
| sockTask-send | 通过WebSocket连接发送数据。 |
| sockTask-close | 关闭WebSocket连接。 |
| sockTask-onOpen | 监听WebSocket连接打开事件。 |
| sockTask-onClose | 监听 WebSocket 连接关闭事件。 |
| sockTask-onError | 监听 WebSocket 错误。 |
| sockTask-onMessage | 监听WebSocket接受到服务器的消息事件。 |
| wx-chooseImage | 从本地相册选择图片或使用相机拍照。 |
| wx-previewImage | 预览图片。 |
| wx-getImageInfo | 获取图片信息，倘若为网络图片，需先配置download域名才能生效。 |
| wx-saveImageToPhotosAlbum | 保存图片到系统相册。需要用户授权 scope.writePhotosAlbum |
| wx-startRecord | 开始录音。需要用户授权 scope.record。 |
| wx-stopRecord | 停止录音。 |
| wx-getRecorderManager | 获取全局唯一的录音管理器recorderManager。 |
| recordManager-start | 开始录音 |
| recordManager-pause | 暂停录音 |
| recordManager-resume | 恢复录音 |
| recordManager-stop | 停止录音 |
| recordManager-onStart | 录音开始事件 |
| recordManager-onPause | 录音暂停事件 |
| recordManager-onStop | 录音停止事件，会回调文件地址 |
| recordManager-onFrameRecorded | 已录制完指定帧大小的文件，会回调录音分片结果数据 |
| recordManager-onError | 录音错误事件, 会回调错误信息 |
| wx-playVoice | 开始播放语音，同时只允许一个语音文件正在播放，如果前一个语音文件还没播放完，将中断前一个语音播放。 |
| wx-pauseVoice | 暂停正在播放的语音。 |
| wx-stopVoice | 结束播放语音。 |
| wx-getBackgroundAudioPlayerState | 获取后台音乐播放状态。 |
| wx-playBackgroundAudio | 使用后台播放器播放音乐，对于微信客户端来说，只能同时有一个后台音乐在播放。 |
| wx-pauseBackgroundAudio | 暂停播放音乐。 |
| wx-seekBackgroundAudio | 控制音乐播放进度(秒)。 |
| wx-stopBackgroundAudio | 停止播放音乐。 |
| wx-onBackgroundAudioPlay | 监听音乐播放。 |
| wx-onBackgroundAudioPause | 监听音乐暂停。 |
| wx-onBackgroundAudioStop | 监听音乐停止。 |
| wx-getBackgroundAudioManager | 获取全局唯一的背景音频管理器 backgroundAudioManager。 |
| backAudioManager-src | 音频的数据源，默认为空字符串，当设置了新的 src 时，会自动开始播放 ，目前支持的格式有 m4a, aac, mp3, wav。 |
| backAudioManager-play | 播放 |
| backAudioManager-pause | 暂停 |
| backAudioManager-stop | 停止 |
| backAudioManager-seek | 跳转到指定位置，单位 s。精确到小数点后 3 位，即支持 ms 级别精确度。 |
| backAudioManager-onCanplay | 背景音频进入可以播放状态，但不保证后面可以流畅播放 |
| backAudioManager-onPlay | 背景音频播放事件 |
| backAudioManager-onPause | 背景音频暂停事件 |
| backAudioManager-onStop | 背景音频停止事件 |
| backAudioManager-onEnded | 背景音频自然播放结束事件 |
| backAudioManager-onTimeUpdate | 背景音频播放进度更新事件 |
| backAudioManager-onPrev | 用户在系统音乐播放面板点击上一曲事件（iOS only） |
| backAudioManager-onNext | 用户在系统音乐播放面板点击下一曲事件（iOS only） |
| backAudioManager-onError | 背景音频播放错误事件 |
| backAudioManager-onWaiting | 音频加载中事件，当音频因为数据不足，需要停下来加载时会触发 |
| wx-createAudioContext | 创建并返回audio上下文audioContext对象。在自定义组件下，第二个参数传入组件实例this，以操作组件内audio组件。 |
| audioContext-setSrc | 设置音频的地址。 |
| audioContext-play | 播放。 |
| audioContext-pause | 暂停。 |
| audioContext-seek | 跳转到指定位置，单位 s。 |
| wx-createInnerAudioContext | 创建并返回内部 audio 上下文 innerAudioContext 对象。本接口是 wx.createAudioContext 升级版。1.6.0 开始支持 |
| innerAudioContext-play | 播放 |
| innerAudioContext-pause | 暂停 |
| innerAudioContext-stop | 停止 |
| innerAudioContext-seek | 跳转到指定位置，单位 s。精确到小数点后 3 位，即支持 ms 级别精确度 |
| innerAudioContext-destroy | 销毁当前实例 |
| innerAudioContext-onCanplay | 音频进入可以播放状态，但不保证后面可以流畅播放 |
| innerAudioContext-onPlay | 音频播放事件 |
| innerAudioContext-onPause | 音频暂停播放事件 |
| innerAudioContext-onStop | 音频停止播放事件 |
| innerAudioContext-onEnded | 音频自然播放结束事件 |
| innerAudioContext-onTimeUpdate | 音频播放进度更新事件 |
| innerAudioContext-onError | 音频播放错误事件 |
| innerAudioContext-onWaiting | 音频加载中事件，当音频因为数据不足，需要停下来加载时会触发 |
| innerAudioContext-onSeeking | 音频进行seek操作事件 |
| innerAudioContext-onSeeked | 音频完成seek操作事件 |
| innerAudioContext-offCanplay | 取消监听onCanplay事件 |
| innerAudioContext-offPlay | 取消监听onPlay事件 |
| innerAudioContext-offStop | 取消监听onStop事件 |
| innerAudioContext-offEnded | 取消监听onEnded事件 |
| innerAudioContext-offTimeUpdate | 取消监听onTimeUpdate事件 |
| innerAudioContext-offError | 取消监听onError事件 |
| innerAudioContext-offWaiting | 取消监听onWaiting事件 |
| innerAudioContext-offSeeking | 取消监听onSeeking事件 |
| innerAudioContext-offSeeked | 取消监听onSeeked事件 |
| wx-getAvailableAudioSources | 获取当前支持的音频输入源 |
| wx-chooseVideo | 拍摄视频或从手机相册中选视频，返回视频的临时文件路径。 |
| wx-saveVideoToPhotosAlbum | 保存视频到系统相册。需要用户授权 scope.writePhotosAlbum |
| wx-createVideoContext | 创建并返回 video 上下文 videoContext 对象。在自定义组件下，第二个参数传入组件实例this，以操作组件内 video 组件 |
| videoContext-play | 播放 |
| videoContext-pause | 暂停 |
| videoContext-stop | 停止 |
| videoContext-seek | 跳转到指定位置，单位 s |
| videoContext-sendDanmu | 发送弹幕，包含两个属性 text, color。 |
| videoContext-playbackRate | 设置倍速播放，支持的倍率有 0.5/0.8/1.0/1.25/1.5 |
| videoContext-requestFullScreen | 进入全屏，可传入{direction}参数, 有效值为 0, 90,-90 |
| videoContext-exitFullScreen | 退出全屏 |
| videoContext-showStatusBar | 显示状态栏，仅在iOS全屏下有效 |
| videoContext-hideStatusBar | 隐藏状态栏，仅在iOS全屏下有效 |
| wx-createCameraContext | 创建并返回 camera 上下文 cameraContext 对象，cameraContext 与页面的 camera 组件绑定，一个页面只能有一个camera，通过它可以操作对应的 camera 组件。1.6.0 开始支持 |
| cameraContext-takePhoto | 拍照，可指定质量(high, normal, low，默认normal)，成功则返回图片 |
| cameraContext-startRecord | 开始录像 |
| cameraContext-stopRecord | 结束录像，成功则返回封面与视频 |
| wx-createLivePlayerContext | 操作对应的 live-player 组件。 创建并返回 live-player 上下文 LivePlayerContext 对象。在自定义组件下，第二个参数传入组件实例this，以操作组件内 live-player 组件。 |
| livePlayerContext-play | 播放 |
| livePlayerContext-stop | 停止 |
| livePlayerContext-mute | 静音 |
| livePlayerContext-pause | 暂停 |
| livePlayerContext-resume | 恢复 |
| livePlayerContext-requestFullScreen | 进入全屏 |
| livePlayerContext-exitFullScreen | 退出全屏 |
| wx-createLivePusherContext | 创建并返回 live-pusher 上下文 LivePusherContext 对象，LivePusherContext 与页面的 live-pusher 组件绑定，一个页面只能有一个 live-pusher，通过它可以操作对应的 live-pusher组件。 在自定义组件下，第一个参数传入组件实例this，以操作组件内 live-pusher 组件。" |
| livePusherContext-play | 播放推流 |
| livePusherContext-stop | 停止推流 |
| livePusherContext-pause | 暂停推流 |
| livePusherContext-resume | 恢复推流 |
| livePusherContext-switchCamera | 切换前后摄像头 |
| livePusherContext-snapshot | 快照 |
| livePusherContext-toggleTorch | 切换闪光灯 |
| wx-loadFontFace | 动态加载网络字体 |
| wx-saveFile | 保存文件到本地。注意：saveFile会把临时文件移动，因此调用成功后传入的 tempFilePath 将不可用 |
| wx-getSavedFileList | 获取本地已保存的文件列表 |
| wx-getSavedFileInfo | 获取本地文件的文件信息。此接口只能用于获取已保存到本地的文件，若需要获取临时文件信息，请使用 wx.getFileInfo 接口 |
| wx-removeSavedFile | 删除本地存储的文件 |
| wx-openDocument | 新开页面打开文档，支持格式：doc, xls, ppt, pdf, docx, xlsx, pptx |
| wx-setStorage | 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口。 |
| wx-setStorageSync | 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。 |
| wx-getStorage | 从本地缓存中异步获取指定 key 对应的内容。 |
| wx-getStorageSync | 从本地缓存中同步获取指定 key 对应的内容。 |
| wx-getStorageInfo | 异步获取当前storage的相关信息 |
| wx-getStorageInfoSync | 同步获取当前storage的相关信息 |
| wx-removeStorage | 从本地缓存中异步移除指定 key。 |
| wx-removeStorageSync | 从本地缓存中同步移除指定 key。 |
| wx-clearStorage | 异步清除本地数据缓存 |
| wx-clearStorageSync | 同步清除本地数据缓存 |
| wx-getLocation | 获取当前的地理位置、速度。 |
| wx-chooseLocation | 打开地图选择位置。需要用户授权 scope.userLocation |
| wx-openLocation | 使用微信内置地图查看位置。 需要用户授权 scope.userLocation |
| wx-createMapContext | 创建并返回 map 上下文 mapContext 对象。在自定义组件下，第二个参数传入组件实例this，以操作组件内 map 组件 |
| mapContext-getCenterLocation | 获取当前地图中心的经纬度，返回的是 gcj02 坐标系，可以用于 wx.openLocation |
| mapContext-moveToLocation | 将地图中心移动到当前定位点，需要配合map组件的show-location使用 |
| mapContext-translateMarker | 平移marker，带动画 |
| mapContext-includePoints | 缩放视野展示所有经纬度 |
| mapContext-getRegion | 获取当前地图的视野范围 |
| mapContext-getScale | 获取当前地图的缩放级别 |
| wx-getSystemInfo | 异步获取系统信息。 |
| wx-getSystemInfoSync | 获取系统信息同步接口 |
| wx-canIUse | 判断小程序的API，回调，参数，组件等是否在当前版本可用。 |
| wx-onMemoryWarning | 监听内存不足的告警事件，Android下有告警等级划分，只有LOW和CRITICAL会回调开发者；iOS无等级划分 |
| wx-getNetworkType | 获取网络类型 |
| wx-onNetworkStatusChange | 监听网络状态变化。 |
| wx-onAccelerometerChange | 监听加速度数据，频率：5次/秒，接口调用后会自动开始监听，可使用 wx.stopAccelerometer 停止监听。 |
| wx-startAccelerometer | 开始监听加速度数据。 |
| wx-stopAccelerometer | 停止监听加速度数据。 |
| wx-onCompassChange | 监听罗盘数据，频率：5次/秒，接口调用后会自动开始监听，可使用wx.stopCompass停止监听。 |
| wx-startCompass | 开始监听罗盘数据。 |
| wx-stopCompass | 停止监听罗盘数据。 |
| wx-makePhoneCall | 拨打电话 |
| wx-scanCode | 调起客户端扫码界面，扫码成功后返回对应的结果 |
| wx-setClipboardData | 设置系统剪贴板的内容 |
| wx-getClipboardData | 获取系统剪贴板内容 |
| wx-openBluetoothAdapter | 初始化小程序蓝牙模块，生效周期为调用wx.openBluetoothAdapter至调用wx.closeBluetoothAdapter或小程序被销毁为止。 |
| wx-closeBluetoothAdapter | 关闭蓝牙模块，使其进入未初始化状态。调用该方法将断开所有已建立的链接并释放系统资源。 |
| wx-getBluetoothAdapterState | 获取本机蓝牙适配器状态 |
| wx-onBluetoothAdapterStateChange | 监听蓝牙适配器状态变化事件 |
| wx-startBluetoothDevicesDiscovery | 开始搜寻附近的蓝牙外围设备。注意，该操作比较耗费系统资源，请在搜索并连接到设备后调用 stop 方法停止搜索。 |
| wx-stopBluetoothDevicesDiscovery | 停止搜寻附近的蓝牙外围设备。若已经找到需要的蓝牙设备并不需要继续搜索时，建议调用该接口停止蓝牙搜索。 |
| wx-getBluetoothDevices | 获取在小程序蓝牙模块生效期间所有已发现的蓝牙设备，包括已经和本机处于连接状态的设备。 |
| wx-onBluetoothDeviceFound | 监听寻找到新设备的事件 |
| wx-getConnectedBluetoothDevices | 根据 uuid 获取处于已连接状态的设备 |
| wx-createBLEConnection | 连接低功耗蓝牙设备。 |
| wx-closeBLEConnection | 断开与低功耗蓝牙设备的连接 |
| wx-onBLEConnectionStateChange | 监听低功耗蓝牙连接状态的改变事件，包括开发者主动连接或断开连接，设备丢失，连接异常断开等等 |
| wx-getBLEDeviceServices | 获取蓝牙设备所有 service（服务） |
| wx-getBLEDeviceCharacteristics | 获取蓝牙设备某个服务中的所有 characteristic（特征值） |
| wx-readBLECharacteristicValue | 读取低功耗蓝牙设备的特征值的二进制数据值。注意：必须设备的特征值支持read才可以成功调用，具体参照 characteristic 的 properties 属性 |
| wx-writeBLECharacteristicValue | 向低功耗蓝牙设备特征值中写入二进制数据。注意：必须设备的特征值支持write才可以成功调用，具体参照 characteristic 的 properties 属性 |
| wx-notifyBLECharacteristicValueChange | 启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值。注意：必须设备的特征值支持notify或者indicate才可以成功调用，具体参照 characteristic 的 properties 属性 |
| wx-onBLECharacteristicValueChange | 监听低功耗蓝牙设备的特征值变化。必须先启用notify接口才能接收到设备推送的notification。 |
| wx-startBeaconDiscovery | 开始搜索附近的iBeacon设备 |
| wx-stopBeaconDiscovery | 停止搜索附近的iBeacon设备 |
| wx-getBeacons | 获取所有已搜索到的iBeacon设备 |
| wx-onBeaconUpdate | 监听 iBeacon 设备的更新事件 |
| wx-onBeaconServiceChange | 监听 iBeacon 服务的状态变化 |
| wx-setScreenBrightness | 设置屏幕亮度 |
| wx-getScreenBrightness | 获取屏幕亮度。 |
| wx-vibrateLong | 使手机发生较长时间的振动（400ms） |
| wx-vibrateShort | 使手机发生较短时间的振动（15ms） |
| wx-setKeepScreenOn | 设置是否保持常亮状态。仅在当前小程序生效，离开小程序后设置失效。 |
| wx-onUserCaptureScreen | 监听用户主动截屏事件，用户使用系统截屏按键截屏时触发此事件 |
| wx-addPhoneContact | 调用后，用户可以选择将该表单以“新增联系人”或“添加到已有联系人”的方式，写入手机系统通讯录，完成手机通讯录联系人和联系方式的增加。此API参数非常多，请参考文档。 |
| wx-getHCEState | 判断当前设备是否支持 HCE 能力 |
| wx-startHCE | 初始化NFC模块 |
| wx-stopHCE | 关闭 NFC 模块。仅在安卓系统下有效。 |
| wx-onHCEMessage | 监听 NFC 设备的消息回调，并在回调中处理。 |
| wx-sendHCEMessage | 发送 NFC 消息。仅在安卓系统下有效。 |
| wx-startWifi | 初始化Wi-Fi模块。 |
| wx-stopWifi | 关闭Wi-Fi模块。 |
| wx-connectWifi | 连接Wi-Fi。若已知Wi-Fi信息，可以直接利用该接口连接。 |
| wx-getWifiList | 请求获取Wi-Fi列表，在onGetWifiList注册的回调中返回wifiList数据。 |
| wx-onGetWifiList | 监听在获取到Wi-Fi列表数据时的事件，在回调中将返回wifiList。 |
| wx-setWifiList | iOS特有接口，在 onGetWifiList 回调后，利用接口设置 wifiList 中 AP 的相关信息。 |
| wx-onWifiConnected | 监听连接上Wi-Fi的事件。 |
| wx-getConnectedWifi | 获取已连接中的Wi-Fi信息 |
| wx-showToast | 显示消息提示框 |
| wx-showLoading | 显示loading提示框, 需主动调用wx.hideLoading才能关闭提示框 |
| wx-hideToast | 隐藏消息提示框 |
| wx-hideLoading | 隐藏loading提示框 |
| wx-showModal | 显示模态弹窗 |
| wx-showActionSheet | 显示操作菜单 |
| wx-onWindowResize | 监听窗口尺寸变化事件 |
| wx-offWindowResize | 取消监听窗口尺寸变化事件 |
| wx-setTopBarText | 动态设置置顶栏文字内容，只有当前小程序被置顶时能生效，如果当前小程序没有被置顶，也能调用成功，但是不会立即生效，只有在用户将这个小程序置顶后才换上设置的文字内容。 |
| wx-setNavigationBarTitle | 动态设置当前页面的标题。 |
| wx-showNavigationBarLoading | 在当前页面显示导航条加载动画。 |
| wx-hideNavigationBarLoading | 隐藏导航条加载动画。 |
| wx-setNavigationBarColor | 设置导航栏颜色 |
| wx-setTabBarBadge | 为tabBar某一项的右上角添加文本 |
| wx-removeTabBarBadge | 移除tabBar某一项右上角的文本 |
| wx-showTabBarRedDot | 显示tabBar某一项的右上角的红点 |
| wx-hideTabBarRedDot | 隐藏tabBar某一项的右上角的红点 |
| wx-setTabBarStyle | 动态设置tabBar的整体样式 |
| wx-setTabBarItem | 动态设置tabBar某一项的内容 |
| wx-showTabBar | 显示 tabBar |
| wx-hideTabBar | 隐藏 tabBar |
| wx-setBackgroundColor | 动态设置窗口的背景色 |
| wx-setBackgroundTextStyle | 动态设置下拉背景字体、loading图的样式 |
| wx-navigateTo | 保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面。目前页面路径最多只能十层。 |
| wx-redirectTo | 关闭当前页面，跳转到应用内的某个页面。 |
| wx-reLaunch | 关闭所有页面，打开到应用内的某个页面。 |
| wx-switchTab | 跳转到tabBar页面，并关闭其他所有非tabBar页面 |
| wx-navigateBack | 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages()) 获取当前的页面栈，决定需要返回几层。 |
| wx-createAnimation | 创建一个动画实例animation。调用实例的方法来描述动画。 |
| animation-opacity | 透明度，参数范围 0~1 |
| animation-backgroundColor | 颜色值 |
| animation-width | 宽度 |
| animation-height | 长度 |
| animation-top | 顶部距离 |
| animation-left | 左侧距离 |
| animation-bottom | 底部距离 |
| animation-right | 右侧距离 |
| animation-rotate | 绕原点旋转 |
| animation-rotateX | 绕x轴旋转 |
| animation-rotateY | 绕y轴旋转 |
| animation-rotateZ | 绕z轴旋转 |
| animation-rotate3d | 3d旋转 |
| animation-scale | x轴[y轴]缩放。一个参数时，表示在X轴、Y轴两个相同；两个参数时表示在X轴，在Y轴不同 |
| animation-scaleX | x轴缩放 |
| animation-scaleY | y轴缩放 |
| animation-scaleZ | z轴缩放 |
| animation-scale3d | 3d缩放 |
| animation-translate | x轴[y轴]偏移。一个参数时，表示在X轴；两个参数时表示在X轴，在Y轴 |
| animation-translateX | x轴偏移 |
| animation-translateY | y轴偏移 |
| animation-translateZ | z轴偏移 |
| animation-translate3d | 3d偏移 |
| animation-skew | x轴[y轴]倾斜。一个参数时，表示在X轴；两个参数时表示在X轴，在Y轴 |
| animation-skewX | x轴倾斜 |
| animation-skewY | y轴倾斜 |
| animation-matrix | 平面矩阵变换 |
| animation-matrix3d | 立体矩阵变换 |
| wx-pageScrollTo | 将页面滚动到目标位置。 |
| wx-startPullDownRefresh | 开始下拉刷新，调用后触发下拉刷新动画，效果与用户手动下拉刷新一致 |
| wx-stopPullDownRefresh | 停止当前页面下拉刷新。 |
| wx-getExtConfig | 获取第三方平台自定义的数据字段 |
| wx-getExtConfigSync | 同步获取第三方平台自定义的数据字段 |
| wx-login | 调用接口wx.login() 获取临时登录凭证（code） |
| wx-checkSession | 校验用户当前session_key是否有效。 |
| wx-authorize | 提前向用户发起授权请求。调用后会立刻弹窗询问用户是否同意授权小程序使用某项功能或获取用户的某些数据，但不会实际调用对应接口。如果用户之前已经同意授权，则不会出现弹窗，直接返回成功。 |
| wx-getUserInfo | 当用户未授权过，调用该接口将直接报错；当用户授权过，可以使用该接口获取用户信息 |
| wx-faceVerifyForPay | 支付各个安全场景验证人脸。 |
| wx-requestPayment | 发起微信支付。 |
| wx-showShareMenu | 显示当前页面的转发按钮 |
| wx-hideShareMenu | 隐藏转发按钮 |
| wx-updateShareMenu | 更新转发属性 |
| wx-getShareInfo | 获取转发详细信息 |
| wx-getAccountInfoSync | 获取当前账号信息 |
| wx-chooseAddress | 调起用户编辑收货地址原生界面，并在编辑完成后返回用户选择的地址。 |
| wx-addCard | 批量添加卡券 |
| wx-openCard | 查看微信卡包中的卡券 |
| wx-openSetting | 调起客户端小程序设置界面，返回用户设置的操作结果 |
| wx-getSetting | 获取用户的当前设置 |
| wx-getWeRunData | 获取用户过去三十天微信运动步数，需要先调用 wx.login 接口 |
| wx-navigateToMiniProgram | 打开同一公众号下关联的另一个小程序 |
| wx-navigateBackMiniProgram | 返回到上一个小程序，只有在当前小程序是被其他小程序打开时可以调用成功 |
| wx-chooseInvoice | 选择用户已有的发票 |
| wx-chooseInvoiceTitle | 选择用户的发票抬头 |
| wx-checkIsSupportSoterAuthentication | 获取本机支持的SOTER生物认证方式 |
| wx-startSoterAuthentication | 开始SOTER生物认证 |
| wx-checkIsSoterEnrolledInDevice | 获取设备内是否录入如指纹等生物信息的接口 |
| wx-getUpdateManager | 获取全局唯一的版本更新管理器，用于管理小程序更新。 |
| updateManager-onCheckForUpdate | 当向微信后台请求完新版本信息，会进行回调 |
| updateManager-onUpdateReady | 当新版本下载完成，会进行回调 |
| updateManager-onUpdateFailed | 当新版本下载失败，会进行回调 |
| updateManager-applyUpdate | 当新版本下载完成，调用该方法会强制当前小程序应用上新版本并重启 |
| wx-createWorker | 创建一个Worker线程，并返回Worker实例，目前限制最多只能创建一个Worker，创建下一个Worker前请调用Worker.terminate。 |
| worker-postMessage | 向Worker线程发送的消息。 |
| worker-onMessage | 监听Worker线程向当前线程发送的消息 |
| worker-terminate | 结束当前Worker线程，仅限在主线程Worker实例上调用。 |
| wx-reportMonitor | 自定义业务数据监控上报接口。 |
| wx-setEnableDebug | 设置是否打开调试开关，此开关对正式版也能生效 |
| wx-getLogManager | 获取日志管理器 logManager 对象。 |
| logger-log | 写log日志，可以提供任意个参数。 |
| logger-info | 写info日志，可以提供任意个参数。 |
| logger-warn | 写warn日志，可以提供任意个参数。 |
| logger-debug | 写debug日志，可以提供任意个参数。 |
| wx-canvasToTempFilePath | 把当前画布指定区域的内容导出生成指定大小的图片，并返回文件路径。 |
| wx-canvasGetImageData | 返回一个数组，用来描述 canvas 区域隐含的像素数据。 |
| wx-canvasPutImageData | 将像素数据绘制到画布的方法。 |
| wx-createCanvasContext | 创建 canvas 绘图上下文（指定 canvasId）。 |
| cvsCtx-setFillStyle | 设置填充色。 |
| cvsCtx-fillStyle | 设置填充色。基础库 1.9.90 起支持 |
| cvsCtx-setStrokeStyle | 设置边框颜色。 |
| cvsCtx-strokeStyle | 设置边框颜色。基础库 1.9.90 起支持 |
| cvsCtx-setShadow | 设置阴影样式。 |
| cvsCtx-createLinearGradient | 创建一个线性的渐变颜色。需要使用 addColorStop() 来指定渐变点，至少要两个。 |
| cvsCtx-createCircularGradient | 创建一个圆形的渐变颜色。需要使用 addColorStop() 来指定渐变点，至少要两个。 |
| cvsCtx-addColorStop | 创建一个颜色的渐变点。 |
| cvsCtx-setLineWidth | 设置线条的宽度。 |
| cvsCtx-lineWidth | 设置线条的宽度。基础库 1.9.90 起支持 |
| cvsCtx-setLineCap | 设置线条的端点样式。 |
| cvsCtx-lineCap | 设置线条的端点样式。基础库 1.9.90 起支持 |
| cvsCtx-setLineJoin | 设置线条的交点样式。 |
| cvsCtx-lineJoin | 设置线条的交点样式。基础库 1.9.90 起支持 |
| cvsCtx-setLineDash | 设置线条的宽度。 |
| cvsCtx-setMiterLimit | 设置最大斜接长度，斜接长度指的是在两条线交汇处内角和外角之间的距离。 当 setLineJoin() 为 miter 时才有效。 |
| cvsCtx-rect | 创建一个矩形。 |
| cvsCtx-fillRect | 填充一个矩形。 |
| cvsCtx-strokeRect | 画一个矩形(非填充)。 |
| cvsCtx-clearRect | 清除画布上在该矩形区域内的内容。 |
| cvsCtx-fill | 对当前路径中的内容进行填充。 |
| cvsCtx-stroke | 画出当前路径的边框。 |
| cvsCtx-beginPath | 开始创建一个路径，需要调用fill或者stroke才会使用路径进行填充或描边。 |
| cvsCtx-closePath | 关闭一个路径 |
| cvsCtx-moveTo | 把路径移动到画布中的指定点，不创建线条。 |
| cvsCtx-lineTo | lineTo 方法增加一个新点，然后创建一条从上次指定点到目标点的线。 |
| cvsCtx-arc | 画一条弧线。 |
| cvsCtx-bezierCurveTo | 创建三次方贝塞尔曲线路径。曲线的起始点为路径中前一个点。 |
| cvsCtx-quadraticCurveTo | 创建二次贝塞尔曲线路径。曲线的起始点为路径中前一个点。 |
| cvsCtx-scale | 在调用scale方法后，之后创建的路径其横纵坐标会被缩放。多次调用scale，倍数会相乘。 |
| cvsCtx-rotate | 以原点为中心，原点可以用 translate方法修改。顺时针旋转当前坐标轴。 |
| cvsCtx-translate | 对当前坐标系的原点(0, 0)进行变换，默认的坐标系原点为页面左上角。 |
| cvsCtx-clip | 从原始画布中剪切任意形状和尺寸。 |
| cvsCtx-setFontSize | 设置字体的字号。 |
| cvsCtx-fillText | 在画布上绘制被填充的文本。 |
| cvsCtx-setTextAlign | 用于设置文字的对齐 |
| cvsCtx-textAlign | 用于设置文字的对齐,基础库 1.9.90 起支持 |
| cvsCtx-setTextBaseline | 用于设置文字的水平对齐 |
| cvsCtx-textBaseline | 用于设置文字的水平对齐,基础库 1.9.90 起支持 |
| cvsCtx-drawImage | 绘制图像到画布。 |
| cvsCtx-setGlobalAlpha | 设置全局画笔透明度。 |
| cvsCtx-globalAlpha | 设置全局画笔透明度。基础库 1.9.90 起支持 |
| cvsCtx-save | 保存当前的绘图上下文。 |
| cvsCtx-restore | 恢复之前保存的绘图上下文。 |
| cvsCtx-draw | 将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中 |
| cvsCtx-measureText | 测量文本尺寸信息，目前仅返回文本宽度。同步接口。 |
| cvsCtx-globalCompositeOperation | 该属性是设置要在绘制新形状时应用的合成操作的类型。 |
| cvsCtx-arcTo | 根据控制点和半径绘制圆弧路径。 |
| cvsCtx-strokeText | 给定的 (x, y) 位置绘制文本描边的方法 |
| cvsCtx-lineDashOffset | 设置虚线偏移量的属性 |
| cvsCtx-createPattern | 对指定的图像创建模式的方法，可在指定的方向上重复元图像 |
| cvsCtx-shadowBlur | 设置阴影的模糊级别 |
| cvsCtx-shadowColor | 设置阴影的颜色 |
| cvsCtx-shadowOffsetX | 设置阴影相对于形状在水平方向的偏移 |
| cvsCtx-shadowOffsetY | 设置阴影相对于形状在竖直方向的偏移 |
| cvsCtx-font | 设置当前字体样式的属性 |
| cvsCtx-setTransform | 使用矩阵重新设置（覆盖）当前变换的方法 |
| wx-getFileSystemManager | 获取全局唯一的文件管理器。 |
| fileManager-appendFile | 在文件结尾追加内容 |
| fileManager-appendFileSync | 在文件结尾追加内容,同步接口 |
| fileManager-access | 判断文件/目录是否存在 |
| fileManager-accessSync | 判断文件/目录是否存在,同步接口 |
| fileManager-copyFile | 复制文件 |
| fileManager-copyFileSync | 复制文件,同步接口 |
| fileManager-getSavedFileList | 获取该小程序下已保存的本地缓存文件列表 |
| fileManager-getFileInfo | 获取该小程序下的 本地临时文件 或 本地缓存文件 信息 |
| fileManager-mkdir | 创建目录 |
| fileManager-mkdirSync | 创建目录,同步接口 |
| fileManager-removeSavedFile | 删除该小程序下已保存的本地缓存文件 |
| fileManager-readFile | 读取本地文件内容 |
| fileManager-readFileSync | 读取本地文件内容,同步接口 |
| fileManager-readdir | 读取目录内文件列表 |
| fileManager-readdirSync | 读取目录内文件列表,同步接口 |
| fileManager-rename | 重命名文件，可以把文件从 oldPath 移动到 newPath |
| fileManager-renameSync | 重命名文件，可以把文件从 oldPath 移动到 newPath,同步接口 |
| fileManager-rmdir | 删除目录 |
| fileManager-rmdirSync | 删除目录,同步接口 |
| fileManager-saveFile | 保存临时文件到本地。此接口会移动临时文件，因此调用成功后，tempFilePath 将不可用 |
| fileManager-saveFileSync | 保存临时文件到本地。此接口会移动临时文件，因此调用成功后，tempFilePath 将不可用,同步接口 |
| fileManager-stat | 获取文件 Stats 对象 |
| fileManager-statSync | 获取文件 Stats 对象,同步接口 |
| fileStat-isDirectory | 判断当前文件是否一个目录 |
| fileStat-isFile | 判断当前文件是否一个普通文件 |
| fileManager-unlink | 删除文件 |
| fileManager-unlinkSync | 删除文件,同步接口 |
| fileManager-unzip | 解压文件 |
| fileManager-writeFile | 写文件 |
| fileManager-writeFileSync | 写文件,同步接口 |
| wx-nextTick | 用于延迟一部分操作到下一个时间片再执行 |
| wx-getMenuButtonBoundingClientRect | 获取菜单按钮的布局置信息 |
| wx-createIntersectionObserver | 创建并返回一个 IntersectionObserver 对象实例 |
| interObser-relativeTo | 使用选择器指定一个节点，作为参照区域之一 |
| interObser-relativeToViewport | 指定页面显示区域作为参照区域之一 |
| interObser-observe | 指定目标节点并开始监听相交状态变化情况 |
| interObser-disconnect | 停止监听。回调函数将不再触发 |
| wx-createSelectorQuery | 返回一个 SelectorQuery 对象实例。 |
| selQuery-in | 将选择器的选取范围更改为自定义组件 component 内（初始时，选择器仅选取页面范围的节点，不会选取任何自定义组件中的节点）。 |
| selQuery-select | 在当前页面下选择第一个匹配选择器 selector 的节点，返回一个 NodesRef 对象实例，可以用于获取节点信息 |
| selQuery-selectAll | 在当前页面下选择匹配选择器 selector 的所有节点。 |
| selQuery-selectViewport | 选择显示区域，可用于获取显示区域的尺寸、滚动位置等信息。 |
| selQuery-exec | 执行所有的请求，请求结果按请求次序构成数组，在callback的第一个参数中返回。 |


### LayUI 代码块(包含html和js)

| 缩写| 描述 | 其他 |
| ---- | ---- | ---- |
| lay-form:box | layui form表单外壳 | HTML |
| lay-form:box-null | layui form表单空外壳 | HTML |
| lay-form:demo | layui form 样例代码 | HTML |
| lay-input | layui单行输入框 | HTML |
| lay-textarea | layui文本域输入框 | HTML |
| lay-radio | layui单选框 | HTML |
| lay-checkbox | layui复选框 | HTML |
| lay-select | layui下拉菜单 | HTML |
| lay-switch | layui switch开关 | HTML |
| lay-wordaux | layui 表单辅助文字 | HTML |
| lay-button | layui按钮 | HTML |
| lay-btn-group | layui按钮组 | HTML |
| lay-btn-container | layui按钮容器 | HTML |
| lay-btn-icon | layui图标按钮 | HTML |
| lay-button:css | layui按钮class样式 | HTML |
| lay-bg:css | layui背景class样式名 | HTML |
| lay-submit | layui提交重置按钮 | HTML |
| lay-table:html | layui纯html表格 | HTML |
| lay-table:module | layui表格模块 | HTML |
| lay-table-tool-tpl | layui表格工具条模板 | HTML |
| lay-cont | layui container 布局 | HTML |
| lay-cont:row | layui container 栅格布局 | HTML |
| lay-row | layui row 一行 | HTML |
| lay-col | layui rcol 一列 | HTML |
| lay-card | layui card 卡片面板 | HTML |
| lay-collapse | layui collapse 折叠面板 | HTML |
| lay-anim | layui动画class | HTML |
| lay-nav | layui水平导航 | HTML |
| lay-breadcrumb | layui面包屑导航 | HTML |
| lay-tab_box | layui tab选项卡外壳 | HTML |
| lay-progress | layui progress进度条 | HTML |
| lay-cdn | layui CDN网址2.5.7 | HTML |
| lay-confirm | layer确认框 | JQ |
| lay-open | layer内容框 | JQ |
| lay-tips | layer小吸附框 | JQ |
| lay-tips-sim | layer小吸附框(极简) | JQ |
| lay-tips-demo | layer小吸附框(鼠标经过显示) | JQ |
| lay-prompt | layer输入确认框 | JQ |
| lay-submit-on | layui监听提交form | JQ |
| lay-form-on | form监听事件 | JQ |
| lay-from-sub | layui主动提交表单 | JQ |
| lay-from-val | layui表单赋值 | JQ |
| lay-msg | layer弹出消息 | JQ |
| lay-table:render | layui表格渲染 | JQ |
| lay-table:fun | layui表格常用方法 | JQ |
| lay-table-tool-js | layui表格工具条js事件 | JQ |
| lay-date_render | layui日期时间渲染 | JQ |
| lay-date_minmax | layui日期范围 | JQ |
| lay-define | layui模块的定义 | JQ |
| lay-use | layui模块的使用 | JQ |
| lay-use:ele | layui模块的使用 | JQ |
| lay-linkcss | layui动态加载 CSS路径 | JQ |
| lay-data:get | layui本地数据读取 | JQ |
| lay-data:set | layui本地数据存储 | JQ |
| lay-data:remove | layui本地数据删除 | JQ |
| lay-data:removeTable | layui本地数据删除表 | JQ |


### VantUI 代码块(包含html、js和小程序)

| 缩写| 描述 | 其他 |
| ---- | ---- | ---- |
| vanb | Vant <van-button>按钮</van-button> | HTML |
| vancell | Vant <van-cell>单元格</van-vell> | HTML |
| vanicon | Vant <van-icon>Icon图标</van-icon> | HTML |
| vanimg | Vant <van-image>图片</van-image> | HTML |
| vanr | Vant <van-row>栅格布局<van-row> | HTML |
| vanrf | Vant <van-row type='flex'>flex布局</van-row> | HTML |
| vanrg | Vant <van-row gutter=\"\">栅格布局(设置列元素间距)<van-row> | HTML |
| vanc | Vant <van-col span=\"\">栅格布局(列元素)</van-col> | HTML |
| vanpopup | Vant <van-popup>弹出层</van-popup> | HTML |
| vancld | Vant <van-calendar>日历</van-calendar> | HTML |
| vanck | Vant <van-checkbox>复选框</van-checkbox> | HTML |
| vandate | Vant <van-datetime-picker>时间选择</van-datetime-picker> | HTML |
| vanfd | Vant <van-field>输入框</van-field> | HTML |
| vanform | Vant <van-form>表单</van-form> | HTML |
| vankbn | Vant <van-number-keyboard>数字键盘</van-number-keyboard> | HTML |
| vanpass | Vant <van-password-input>密码输入框</van-password-input> | HTML |
| vanpk | Vant <van-picker>选择器<van-picker> | HTML |
| vanrd | Vant <van-radio>单选框</van-radio> | HTML |
| vanrate | Vant <van-rate>评分<van-rate> | HTML |
| vansearch | Vant <van-search>搜索</van-search> | HTML |
| vanslider | Vant <van-slider>滑块</van-slider> | HTML |
| vanstepper | Vant <van-stepper>步进器</van-stepper> | HTML |
| vanswitch | Vant <van-switch>开关</van-switch> | HTML |
| vanup | Vant <van-uploader :after-read=\"\">文件上传</van-uploader> | HTML |
| vanas | Vant <van-action-sheet>动作面板</van-action-sheet> | HTML |
| vandg | Vant <van-dialog>弹出框</van-dialog> | HTML |
| vanal | Vant Dialog.alert('消息提示弹框') | HTML |
| vancf | Vant Dialog.confirm('确认弹框') | HTML |
| vandm | Vant <van-dropdown-menu>下拉菜单</van-dropdown-menu> | HTML |
| vanld | Vant <van-loading>Loading加载</van-loading> | HTML |
| vannt | Vant Notify(\"消息通知\") | HTML |
| vanol | Vant <van-overlay>遮罩层</van-overlay> | HTML |
| vanpr | Vant <van-pull-refresh>下拉刷新</van-pull-refresh> | HTML |
| vanshare | Vant <van-swipe-cell>分享面板</van-swipe-cell> | HTML |
| vansc | Vant <van-swipe-cell>滑动单元格</van-swipe-cell> | HTML |
| vants | Vant Toast('轻提示') | HTML |
| vancircle | Vant <van-circle>环形进度条<van-circle> | HTML |
| vancollapse | Vant <van-collapse>折叠面板<van-collapse> | HTML |
| vancd | Vant <van-count-down :time=\"60\">倒计时</van-count-down> | HTML |
| vandv | Vant <van-divider>分割线</van-divider> | HTML |
| vanempty | Vant <van-empty description=\"描述文字\">空状态</van-empty> | HTML |
| vanimagepv | Vant ImagePreview(['图片预览']) | HTML |
| vanlz | Vant <van-lazy>懒加载</van-lazy> | HTML |
| vanlist | Vant <van-list>列表</van-list> | HTML |
| vanntb | Vant <van-notice-bar> | HTML |
| vanpn | Vant <van-panel>面板</van-panel> | HTML |
| vanprogress | Vant <van-progress>进度条</van-progress> | HTML |
| vansk | Vant <van-skeleton>骨架屏</van-skeleton> | HTML |
| vansteps | Vant <van-steps> | HTML |
| vansticky | Vant <van-sticky>粘性布局</van-sticky> | HTML |
| vansw | Vant <van-swipe>轮播</van-swipe> | HTML |
| vantag | Vant <van-tag>标签</van-tag> | HTML |
| vangrid | Vant <van-grid>宫格</van-grid> | HTML |
| vanib | Vant <van-index-bar>索引栏</van-index-bar> | HTML |
| vannb | Vant <van-nav-bar>导航栏</van-nav-bar> | HTML |
| vanpg | Vant <van-pagination>分页<van-pagination> | HTML |
| vansd | Vant <van-sidebar>侧边导航</van-sidebar> | HTML |
| vantabs | Vant <van-tabs><van-tab>标签页</van-tab></van-tabs> | HTML |
| vantbar | Vant <van-tabbar>标签栏</van-tabbar> | HTML |
| vantrs | Vant <van-tree-select>分类选择</van-tree-select> | HTML |
| vanade | Vant <van-address-edit>地址编辑</van-address-edit> | HTML |
| vanadl | Vant <van-address-list>地址列表</van-address-list> | HTML |
| vanarea | Vant <van-area>省市区选择</van-area> | HTML |
| vancard | Vant <van-card>商品卡片</van-card> | HTML |
| vanctc | Vant <van-contact-card>联系人</van-contact-card> | HTML |
| vancoup | Vant <van-coupon>优惠券</van-coupon> | HTML |
| vangoods | Vant <van-goods-action>商品导航</van-goods-action> | HTML |
| vansbar | Vant <van-submit-bar>提交订单栏</van-submit-bar> | HTML |
| vansku | Vant <van-sku>商品规格</van-sku> | HTML |
| import van-toast | import Toast | JS |
| Toast | Toast('${1:我是提示文案，建议不超过十五字~}') | JS |
| Toast.loading | Toast.loading({message: '加载中...',forbidClick: true,}) | JS |
| Toast.success | Toast.success('成功文案') | JS |
| Toast.fail | Toast.fail('失败文案') | JS |
| Toast.clear | Toast.clear() | JS |
| Toast.setDefaultOptions | Toast.setDefaultOptions(options) | JS |
| Toast.resetDefaultOptions | Toast.resetDefaultOptions() | JS |
| import van-dialog | import Dialog | JS |
| Dialog | Dialog({title: '${1:标题}',message: '${2:弹窗内容}'}) | JS |
| Dialog.confirm | Dialog.confirm | JS |
| Dialog.alert | Dialog.alert | JS |
| Dialog.close | Dialog.close | JS |
| Dialog.setDefaultOptions | Dialog.setDefaultOptions | JS |
| Dialog.resetDefaultOptions | Dialog.resetDefaultOptions | JS |
| Dialog.stopLoading | Dialog.stopLoading | JS |
| import van-notify | import Notify | JS |
| Notify | Notify('${1:通知内容}') | JS |
| Notify.type | Notify({ type: 'primary', message: '通知内容' }) | JS |
| Notify.custom | Notify({message: '自定义颜色',color: '#ad0000',background:'#ffe1e1',duration: 1000,selector: '#custom-selector'}) | JS |
| Notify.clear | Notify.clear() | JS |
| Notify.setDefaultOptions | Notify.setDefaultOptions(options) | JS |
| Notify.resetDefaultOptions | Notify.resetDefaultOptions() | JS |
| van-button | 在app.json或index.json中引入组件 | JSON |
| van-cell-group | 在app.json或index.json中引入组件 | JSON |
| van-cell | 在app.json或index.json中引入组件 | JSON |
| van-config-provider | 在app.json或index.json中引入组件，用于配置 Vant Weapp 组件的主题样式 | JSON |
| van-icon | 在app.json或index.json中引入组件 | JSON |
| van-image | 在app.json或index.json中引入组件 | JSON |
| van-row | 在app.json或index.json中引入组件 | JSON |
| van-col | 在app.json或index.json中引入组件 | JSON |
| van-popup | 在app.json或index.json中引入组件 | JSON |
| van-toast | 在app.json或index.json中引入组件 | JSON |
| van-transition | 在app.json或index.json中引入组件 | JSON |
| van-calendar | 在app.json或index.json中引入组件 | JSON |
| van-checkbox-group | 在app.json或index.json中引入组件 | JSON |
| van-checkbox | 在app.json或index.json中引入组件 | JSON |
| van-datetime-picker | 在app.json或index.json中引入组件 | JSON |
| van-field | 在app.json或index.json中引入组件 | JSON |
| van-picker | 在app.json或index.json中引入组件 | JSON |
| van-radio-group | 在app.json或index.json中引入组件 | JSON |
| van-radio | 在app.json或index.json中引入组件 | JSON |
| van-rate | 在app.json或index.json中引入组件 | JSON |
| van-search | 在app.json或index.json中引入组件 | JSON |
| van-slider | 在app.json或index.json中引入组件 | JSON |
| van-stepper | 在app.json或index.json中引入组件 | JSON |
| van-switch | 在app.json或index.json中引入组件 | JSON |
| van-uploader | 在app.json或index.json中引入组件 | JSON |
| van-action-sheet | 在app.json或index.json中引入组件 | JSON |
| van-dialog | 在app.json或index.json中引入组件 | JSON |
| van-dropdown-menu | 在app.json或index.json中引入组件 | JSON |
| van-dropdown-item | 在app.json或index.json中引入组件 | JSON |
| van-loading | 在app.json或index.json中引入组件 | JSON |
| van-notify | 在app.json或index.json中引入组件 | JSON |
| van-overlay | 在app.json或index.json中引入组件 | JSON |
| van-share-sheet | 在app.json或index.json中引入组件 | JSON |
| van-swipe-cell | 在app.json或index.json中引入组件 | JSON |
| van-circle | 在app.json或index.json中引入组件 | JSON |
| van-collapse | 在app.json或index.json中引入组件 | JSON |
| van-collapse-item | 在app.json或index.json中引入组件 | JSON |
| van-count-down | 在app.json或index.json中引入组件 | JSON |
| van-divider | 在app.json或index.json中引入组件 | JSON |
| van-empty | 在app.json或index.json中引入组件 | JSON |
| van-notice-bar | 在app.json或index.json中引入组件 | JSON |
| van-progress | 在app.json或index.json中引入组件 | JSON |
| van-skeleton | 在app.json或index.json中引入组件 | JSON |
| van-steps | 在app.json或index.json中引入组件 | JSON |
| van-sticky | 在app.json或index.json中引入组件 | JSON |
| van-tag | 在app.json或index.json中引入组件 | JSON |
| van-grid | 在app.json或index.json中引入组件 | JSON |
| van-grid-item | 在app.json或index.json中引入组件 | JSON |
| van-index-bar | 在app.json或index.json中引入组件 | JSON |
| van-index-bar-anchor | 在app.json或index.json中引入组件 | JSON |
| van-nav-bar | 在app.json或index.json中引入组件 | JSON |
| van-sidebar | 在app.json或index.json中引入组件 | JSON |
| van-sidebar-item | 在app.json或index.json中引入组件 | JSON |
| van-tabs | 在app.json或index.json中引入组件 | JSON |
| van-tab | 在app.json或index.json中引入组件 | JSON |
| van-tabbar | 在app.json或index.json中引入组件 | JSON |
| van-tabbar-item | 在app.json或index.json中引入组件 | JSON |
| van-tree-select | 在app.json或index.json中引入组件 | JSON |
| van-area | 在app.json或index.json中引入组件 | JSON |
| van-card | 在app.json或index.json中引入组件 | JSON |
| van-submit-bar | 在app.json或index.json中引入组件 | JSON |
| van-goods-action | 在app.json或index.json中引入组件 | JSON |
| van-goods-action-icon | 在app.json或index.json中引入组件 | JSON |
| van-goods-action-button | 在app.json或index.json中引入组件 | JSON |
| van-cascader | 在app.json或index.json中引入组件 | JSON |
| vanalert | Vant alert | VUE |
| vanconfirm | Vant confirm | VUE |
| vannotify | Vant Notify | VUE |
| vantoast | Vant Toast | VUE |
| van-button | 按钮用于触发一个操作，如提交表单。 | WXML |
| van-cell-group | Cell 分组。 | WXML |
| van-cell | 单元格为列表中的单个展示项。 | WXML |
| van-config-provider | 在app.json或index.json中引入组件，用于配置 Vant Weapp 组件的主题样式 | WXML |
| van-icon | 基于字体的图标集，可以通过 Icon 组件使用，也可以在其他组件中通过 icon 属性引用。 | WXML |
| van-image | 增强版的 img 标签，提供多种图片填充模式，支持图片懒加载、加载中提示、加载失败提示。 | WXML |
| van-row | Layout 提供了van-row和van-col两个组件来进行行列布局。 | WXML |
| van-col | Layout 提供了van-row和van-col两个组件来进行行列布局。 | WXML |
| van-popup | 弹出层容器，用于展示弹窗、信息提示等内容，支持多个弹出层叠加展示。 | WXML |
| van-toast | 在页面中间弹出黑色半透明提示，用于消息通知、加载提示、操作结果提示等场景。 | WXML |
| van-transition | 使元素从一种样式逐渐变化为另一种样式的效果。 | WXML |
| van-calendar | 日历组件用于选择日期或日期区间。 | WXML |
| van-checkbox-group | 需要与van-checkbox-group一起使用，选中值是一个数组，通过value绑定在van-checkbox-group上，数组中的项即为选中的Checkbox的name属性设置的值。 | WXML |
| van-checkbox | 在一组备选项中进行多选。 | WXML |
| van-datetime-picker | 用于选择时间，支持日期、时分等时间维度，通常与 弹出层 组件配合使用。 | WXML |
| van-field | 用户可以在文本框内输入或编辑文字。 | WXML |
| van-picker | 提供多个选项集合供用户选择，支持单列选择和多列级联，通常与 弹出层 组件配合使用。 | WXML |
| van-radio-group | 在app.json或index.json中引入组件 | WXML |
| van-radio | 在一组备选项中进行单选。 | WXML |
| van-rate | 用于对事物进行评级操作。 | WXML |
| van-search | 用于搜索场景的输入框组件。 | WXML |
| van-slider | 滑动输入条，用于在给定的范围内选择一个值。 | WXML |
| van-stepper | 步进器由增加按钮、减少按钮和输入框组成，用于在一定范围内输入、调整数字。 | WXML |
| van-switch | 用于在打开和关闭状态之间进行切换。 | WXML |
| van-uploader | 用于将本地的图片或文件上传至服务器，并在上传过程中展示预览图和上传进度。目前 Uploader 组件不包含将文件上传至服务器的接口逻辑，该步骤需要自行实现。 | WXML |
| van-action-sheet | 底部弹起的模态面板，包含与当前情境相关的多个选项。 | WXML |
| van-dialog | 弹出模态框，常用于消息提示、消息确认，或在当前页面内完成特定的交互操作，支持函数调用和组件调用两种方式。 | WXML |
| van-dropdown-menu | 向下弹出的菜单列表。 | WXML |
| van-dropdown-item | 向下弹出的菜单列表。 | WXML |
| van-loading | 加载图标，用于表示加载中的过渡状态。 | WXML |
| van-notify | 在页面顶部展示消息提示，支持函数调用和组件调用两种方式。 | WXML |
| van-overlay | 创建一个遮罩层，用于强调特定的页面元素，并阻止用户进行其他操作。 | WXML |
| van-share-sheet | 底部弹起的分享面板，用于展示各分享渠道对应的操作按钮，不含具体的分享逻辑。 | WXML |
| van-swipe-cell | 可以左右滑动来展示操作按钮的单元格组件。 | WXML |
| van-circle | 圆环形的进度条组件，支持进度渐变动画。 | WXML |
| van-collapse | 将一组内容放置在多个折叠面板中，点击面板的标题可以展开或收缩其内容。 | WXML |
| van-collapse-item | 将一组内容放置在多个折叠面板中，点击面板的标题可以展开或收缩其内容。 | WXML |
| van-count-down | 用于实时展示倒计时数值，支持毫秒精度。 | WXML |
| van-divider | 用于将内容分隔为多个区域。 | WXML |
| van-empty | 空状态时的占位提示。 | WXML |
| van-notice-bar | 用于循环播放展示一组消息通知。 | WXML |
| van-progress | 用于展示操作的当前进度。 | WXML |
| van-skeleton | 用于在内容加载过程中展示一组占位图形。 | WXML |
| van-steps | 用于展示操作流程的各个环节，让用户了解当前的操作在整体流程中的位置。 | WXML |
| van-sticky | Sticky 组件与 CSS 中position: sticky属性实现的效果一致，当组件在屏幕范围内时，会按照正常的布局排列，当组件滚出屏幕范围时，始终会固定在屏幕顶部。 | WXML |
| van-tag | 用于标记关键词和概括主要内容。 | WXML |
| van-grid | 宫格可以在水平方向上把页面分隔成等宽度的区块，用于展示内容或进行页面导航。 | WXML |
| van-grid-item | 宫格可以在水平方向上把页面分隔成等宽度的区块，用于展示内容或进行页面导航。 | WXML |
| van-index-bar | 用于列表的索引分类显示和快速定位。 | WXML |
| van-index-bar-anchor | 用于列表的索引分类显示和快速定位。 | WXML |
| van-nav-bar | 为页面提供导航功能，常用于页面顶部。 | WXML |
| van-sidebar | 垂直展示的导航栏，用于在不同的内容区域之间进行切换。 | WXML |
| van-sidebar-item | 垂直展示的导航栏，用于在不同的内容区域之间进行切换。 | WXML |
| van-tabs | 选项卡组件，用于在不同的内容区域之间进行切换。 | WXML |
| van-tab | 选项卡组件，用于在不同的内容区域之间进行切换。 | WXML |
| van-tabbar | 底部导航栏，用于在不同页面之间进行切换。 | WXML |
| van-tabbar-item | 底部导航栏，用于在不同页面之间进行切换。 | WXML |
| van-tree-select | 用于从一组相关联的数据集合中进行选择。 | WXML |
| van-area | 省市区选择组件通常与 弹出层 组件配合使用。 | WXML |
| van-card | 商品卡片，用于展示商品的图片、价格等信息。 | WXML |
| van-submit-bar | 用于展示订单金额与提交订单。 | WXML |
| van-goods-action | 用于为商品相关操作提供便捷交互。 | WXML |
| van-goods-action-icon | GoodsActionIcon | WXML |
| van-goods-action-button | GoodsActionButton | WXML |
| van-cascader | 级联选择框，用于多层级数据的选择，典型场景为省市区选择。 | WXML |

### Vue 代码块

| 缩写| 描述 | 其他 |
| ---- | ---- | ---- |
| VueInit | VueInit |  VUE-HTML | 
| templateLang | templateelement | VUE-HTML | 
| ss | script setup | VUE-HTML | 
| script | script元素 | VUE-HTML | 
| scss | 具有lang=scss属性的style元素 | VUE-HTML | 
| template | template元素 | VUE-HTML | 
| vText | 应为：string。更新元素的textContent。 | VUE-HTML | 
| vHtml | 应为：字符串。更新元素的innerHTML。 | VUE-HTML | 
| vShow | 应为：任意 | VUE-HTML | 
| vIf | 预期：任意 | VUE-HTML | 
| vElse | 不需要表达式。上一个同级元素必须具有v-if或v-else-if。 | VUE-HTML | 
| vElseIf | 应为：任意。上一个同级元素必须具有v-if或v-else-if。 | VUE-HTML | 
| vForWithoutKey | 应为：数组|对象|数字|字符串 | VUE-HTML | 
| vFor | 应为：数组|对象|数字|字符串 |  VUE-HTML | 
| vOn | 预期：函数 | 内联语句 |  VUE-HTML | 
| vBind | 应为：any（带参数） | Object（不带参数） | VUE-HTML | 
| vModel | 预期：根据表单输入元素的值或组件的输出而变化 | VUE-HTML | 
| vSlot | 预期：在函数参数位置有效的JavaScript表达式（支持在支持的环境中进行析构函数）。可选-仅当需要将道具传递到插槽时才需要。 | VUE-HTML | 
| vPre | 不需要表达式 | VUE-HTML | 
| vCloak | 不需要表达式 | VUE-HTML | 
| vOnce | 不需要表达式 | VUE-HTML | 
| key | 应为：string。同一公共父级的子级必须具有唯一的键。重复的关键帧将导致渲染错误。 | VUE-HTML | 
| ref | 应为：string。ref用于注册对元素或子组件的引用。引用将在父组件的$refs对象下注册。如果在普通DOM元素上使用，则引用将是该元素；如果用于子组件，则引用将是组件实例。 | VUE-HTML | 
| slotA | slot=''。应为：字符串。用于插入子组件的内容，以指示内容属于哪个命名槽。 | VUE-HTML | 
| slotE | <slot></slot>。应为：字符串。用于插入子组件的内容，以指示内容属于哪个命名槽。 | VUE-HTML | 
| slotScope | 用于将元素或组件表示为作用域槽。属性的值应该是一个有效的JavaScript表达式，可以出现在函数签名的参数位置。这意味着在受支持的环境中，您也可以在表达式中使用ES2015析构函数。用作2.5.0+中作用域的替换。 | VUE-HTML | 
| teleport | <teleport to=''/> | VUE-HTML | 
| scope | 用于将template元素表示为scoped slot，在2.5.0+中用“slot scope”替换。 | VUE-HTML | 
| component | component元素 | VUE-HTML | 
| keepAlive | keep-alive元素 | VUE-HTML | 
| transition | transition元素 | VUE-HTML | 
| transitionGroup | 转换组元素 | VUE-HTML | 
| enterClass | enter class=''。应为：字符串。 | VUE-HTML | 
| leaveClass | leave class=''。应为：字符串。 | VUE-HTML | 
| appearClass | appear class=''。应为：字符串。 | VUE-HTML | 
| enterToClass | 输入到class=“”。应为：字符串。 | VUE-HTML | 
| leaveToClass | leave to class=''。应为：字符串。 | VUE-HTML | 
| appearToClass | 出现在class=“”。应为：字符串。 | VUE-HTML | 
| enterActiveClass | 输入activeclass=''。应为：字符串。 | VUE-HTML | 
| leaveActivitClass | 保留活动类=''。应为：字符串。 | VUE-HTML | 
| appearActivatClass | appearActiveClass=''。应为：字符串。 | VUE-HTML | 
| beforeEnterEvent | @before-enter='' | VUE-HTML | 
| beforeLeaveEvent | @before-leave=“” | VUE-HTML | 
| beforeAppearEvent | @before-appeare='' | VUE-HTML | 
| enterEvent | @enter='' | VUE-HTML | 
| leaveEvent | @leave='' | VUE-HTML | 
| appearEvent | @appeare='' | VUE-HTML | 
| afterEnterEvent | @afterenter='' | VUE-HTML | 
| afterLeaveEvent | @after leave='' | VUE-HTML | 
| afterAppearEvent | @after appeare='' | VUE-HTML | 
| enterCancelledEvent | @entercancelled='' | VUE-HTML | 
| leaveCancelledEvent | @leavecancelled=''（仅限v-show） | VUE-HTML | 
| appearCancelledEvent | @appearcancelled='' | VUE-HTML | 
| routerLink | router-link | VUE-HTML | 
| routerLinkTo | router-link to='' 路由器链接元素 | VUE-HTML | 
| to | to='' | VUE-HTML | 
| tag | tag='' | VUE-HTML | 
| routerView | router视图元素 | VUE-HTML | 
| nuxt | 此组件仅在用于显示页面组件的布局中使用。 | VUE-HTML | 
| nuxtChild | 此组件用于显示嵌套路由中的子组件。 | VUE-HTML | 
| nuxtLink | 此组件用于提供页面组件之间的导航。 | VUE-HTML | 
| componentIs | component:is='' | VUE-HTML | 
| import | import ... from ... | VUE-JS |
| importFromVue | import ... from 'vue' | VUE-JS |
| newVue | new Vue() | VUE-JS |
| VueConfigSilent | Vue.config.silent | VUE-JS |
| VueConfigOptionMergeStrategies | app.config.optionMergeStrategies | VUE-JS |
| VueConfigDevtools | Vue.config.devtools | VUE-JS |
| VueConfigErrorHandler | app.config.errorHandler | VUE-JS |
| VueConfigWarnHandler | app.config.warnHandler | VUE-JS |
| AppConfigGlobalProperties | app.config.globalProperties | VUE-JS |
| AppConfigIsCustomElement | app.config.isCustomElement | VUE-JS |
| VueConfigIgnoredElements | Vue.config.ignoredElements | VUE-JS |
| VueConfigKeyCodes | Vue.config.keyCodes | VUE-JS |
| VueConfigPerformance | app.config.performance | VUE-JS |
| VueConfigProductionTip | Vue.config.productionTip | VUE-JS |
| defineComponent | defineComponent() | VUE-JS |
| defineAsyncComponent | just a word | VUE-JS |
| defineAsyncComponentWithObj | defineAsyncComponentWithObj | VUE-JS |
| resolveComponent | just a word | VUE-JS |
| resolveComponentExpression | const MyComponent = resolveComponent('MyComponent') | VUE-JS |
| resolveDynamicComponent | just a word | VUE-JS |
| resolveDynamicComponentExpression | const MyComponent = resolveDynamicComponent('MyComponent') | VUE-JS |
| resolveDirective  | just a word | VUE-JS |
| resolveDirective | const highlightDirective = resolveDirective('highlight') | VUE-JS |
| withDirectives  | just a word | VUE-JS |
| vueExtend | Vue.extend( options ) | VUE-JS |
| VueNextTick | Vue.nextTick( callback, [context] ) | VUE-JS |
| VueNextTickThen | Vue.nextTick( callback, [context] ).then(function(){ }) | VUE-JS |
| VueSet | Vue.set( target, key, value ) | VUE-JS |
| VueDelete | Vue.delete( target, key ) | VUE-JS |
| VueDirective | Vue.directive( id, [definition] ) | VUE-JS |
| VueFilter | Vue.filter( id, [definition] ) | VUE-JS |
| VueComponent | Vue.component( id, [definition] ) | VUE-JS |
| VueUse | Vue.use( plugin ) | VUE-JS |
| VueMixin | Vue.mixin( mixin ) | VUE-JS |
| VueCompile | Vue.compile( template ) | VUE-JS |
| VueObservable | Vue.observable( object ) | VUE-JS |
| VueVersion | Vue.version.split('.')[] | VUE-JS |
| data | The data object for the Vue instance. | VUE-JS |
| props | A list/hash of attributes that are exposed to accept data from the parent component.  | VUE-JS |
| propsData | Restriction: only respected in instance creation via `new`. Pass props to an instance during its creation. This is primarily intended to make unit testing easier. | VUE-JS |
| scopedSlots | just a word | VUE-JS |
| computedV2 | Computed properties to be mixed into the Vue instance.  | VUE-JS |
| methods | Methods to be mixed into the Vue instance. | VUE-JS |
| watchV2 | An object where keys are expressions to watch and values are the corresponding callbacks. The value can also be a string of a method name, or an Object that contains additional options. Note that you should not use an arrow function to define a watcher. | VUE-JS |
| watchWithOptions | Vue Watcher with options. | VUE-JS |
| el | just a word | VUE-JS |
| template | just a word | VUE-JS |
| render | An alternative to string templates allowing you to leverage the full programmatic power of JavaScript. | VUE-JS |
| renderError | Provide an alternative render output when the default render function encounters an error. | VUE-JS |
| beforeCreate | Type: Function. | VUE-JS |
| created | Type: Function. | VUE-JS |
| beforeMount | Type: Function. | VUE-JS |
| mounted | Type: Function. | VUE-JS |
| beforeUpdate | Type: Function. | VUE-JS |
| updated | Type: Function. | VUE-JS |
| activated | Type: Function. | VUE-JS |
| deactivated | Type: Function. | VUE-JS |
| beforeUnmount | Type: Function. | VUE-JS |
| unmounted | Type: Function. | VUE-JS |
| beforeDestroy | Type: Function. | VUE-JS |
| destroyed | Type: Function. | VUE-JS |
| errorCaptured | Type: (err: Error, vm: Component, info: string) => ?boolean | VUE-JS |
| renderTracked | renderTracked. Called when virtual DOM re-render is tracked.  | VUE-JS |
| renderTriggered | Called when virtual DOM re-render is triggered.  | VUE-JS |
| directives | just a word | VUE-JS |
| filters | just a word | VUE-JS |
| component | just a word | VUE-JS |
| components | just a word | VUE-JS |
| parent | just a word | VUE-JS |
| mixins | just a word | VUE-JS |
| extends | just a word | VUE-JS |
| provide | just a word | VUE-JS |
| inject | just a word | VUE-JS |
| name | just a word | VUE-JS |
| delimiters | just a word | VUE-JS |
| functional | just a word | VUE-JS |
| model | just a word | VUE-JS |
| inheritAttrs | just a word | VUE-JS |
| comments | just a word | VUE-JS |
| deep | just a word | VUE-JS |
| immediate | just a word | VUE-JS |
| vmData | Type: Object. Read only. | VUE-JS |
| vmProps | Type: Object. Read only. | VUE-JS |
| vmEl | Type: HTMLElement. Read only. | VUE-JS |
| vmOptions | Type: Object. Read only. | VUE-JS |
| vmParent | Type: Vue instance. Read only. | VUE-JS |
| vmRoot | Type: Vue instance. Read only. | VUE-JS |
| vmChildren | Type: Array<Vue instance>. Read only. | VUE-JS |
| vmSlots | Type: Object. Read only. | VUE-JS |
| vmScopedSlots | Type: { [name: string]: props => VNode | Array<VNode> }. Read only. | VUE-JS |
| vmRefs | Type: Object. Read only. | VUE-JS |
| vmIsServer | Type: boolean. Read only. | VUE-JS |
| vmAttrs | Type: { [key: string]: string }. Read only. | VUE-JS |
| vmListeners | Type: { [key: string]: Function | Array<Function> }. Read only. | VUE-JS |
| vmWatch | vm.$watch( expOrFn, callback, [options] )\n Arguments:\n {string | Function} expOrFn\n {Function | Object} callback\n {Object} [options]\n {boolean} [options.deep]\n\t {boolean} [options.immediate] | VUE-JS |
| vmSet | vm.$set( target, key, value ). This is the alias of the global Vue.set. | VUE-JS |
| vmDelete | vm.$delete( target, key ) | VUE-JS |
| vmOn | vm.$on( event, callback ) | VUE-JS |
| vmOnce | vm.$once( event, callback ) | VUE-JS |
| vmOff | vm.$off( [event, callback] ) | VUE-JS |
| vmEmit | vm.$emit( event, […args] ) | VUE-JS |
| vmMount | vm.$mount( [elementOrSelector] ) | VUE-JS |
| vmForceUpdate | vm.$forceUpdate() | VUE-JS |
| vmNextTick | vm.$nextTick( callback ) | VUE-JS |
| vmDestroy | vm.$destroy() | VUE-JS |
| renderer | require('vue-server-renderer').createRenderer() | VUE-JS |
| createRenderer | createRenderer({ }) | VUE-JS |
| renderToString | just a word | VUE-JS |
| renderToStream | just a word | VUE-JS |
| createBundleRenderer | just a word | VUE-JS |
| bundleRendererRenderToString | just a word | VUE-JS |
| bundleRendererRenderToStream | just a word | VUE-JS |
| preventDefault | preventDefault() | VUE-JS |
| stopPropagation | stopPropagation() | VUE-JS |
| importVueRouter | import VueRouter from 'vue-router' | VUE-JS |
| newVueRouter | const router = newVueRouter({ }) | VUE-JS |
| routerBeforeEach | router.beforeEach | VUE-JS |
| routerBeforeResolve | router.beforeResolve | VUE-JS |
| routerAfterEach | router.afterEach | VUE-JS |
| routerPush | router.push() | VUE-JS |
| routerReplace | router.replace() | VUE-JS |
| routerGo | router.go() | VUE-JS |
| routerBack | router.back() | VUE-JS |
| routerForward | router.forward() | VUE-JS |
| routerGetMatchedComponents | router.getMatchedComponents() | VUE-JS |
| routerResolve | router.resolve() | VUE-JS |
| routerAddRoutes | router.addRoutes() | VUE-JS |
| routerOnReady | router.onReady() | VUE-JS |
| routerOnError | router.onError() | VUE-JS |
| routes | routes: [] | VUE-JS |
| beforeEnter | beforeEnter: (to, from, next) => { } | VUE-JS |
| beforeRouteEnter | beforeRouteEnter (to, from, next) { } | VUE-JS |
| beforeRouteLeave | beforeRouteLeave (to, from, next) { } | VUE-JS |
| scrollBehavior | scrollBehavior (to, from, savedPosition) { } | VUE-JS |
| path | just a word | VUE-JS |
| alias | just a word | VUE-JS |
| mode | just a word | VUE-JS |
| children | just a word | VUE-JS |
| meta | just a word | VUE-JS |
| newVuexStore | const store = new Vuex.Store({ }) | VUE-JS |
| state | just a word | VUE-JS |
| getters | just a word | VUE-JS |
| mutations | just a word | VUE-JS |
| actions | just a word | VUE-JS |
| modules | just a word | VUE-JS |
| plugins | just a word | VUE-JS |
| commit | just a word | VUE-JS |
| dispatch | just a word | VUE-JS |
| replaceState | just a word | VUE-JS |
| subscribe | just a word | VUE-JS |
| registerModule | just a word | VUE-JS |
| unregisterModule | just a word | VUE-JS |
| hotUpdate | just a word | VUE-JS |
| mapState | just a word | VUE-JS |
| mapGetters | just a word | VUE-JS |
| mapActions | just a word | VUE-JS |
| mapMutations | just a word | VUE-JS |
| asyncData | Type: Function. | VUE-JS |
| VueCreateApp | const app = Vue.createApp({}) | VUE-JS |
| reactive | const obj = reactive() | VUE-JS |
| readonly | const obj = readonly() | VUE-JS |
| isProxy | just a word | VUE-JS |
| isReactive | just a word | VUE-JS |
| isReadonly | just a word | VUE-JS |
| toRaw | just a word | VUE-JS |
| markRaw | just a word | VUE-JS |
| shallowReactive | just a word | VUE-JS |
| ref | just a word | VUE-JS |
| unref | just a word | VUE-JS |
| toRef | just a word | VUE-JS |
| toRefs | just a word | VUE-JS |
| isRef | just a word | VUE-JS |
| customRef | just a word | VUE-JS |
| shallowRef | just a word | VUE-JS |
| triggerRef | just a word | VUE-JS |
| computed | just a word | VUE-JS |
| watchEffect | just a word | VUE-JS |
| watch | just a word | VUE-JS |
| setup | setup() { } | VUE-JS |
| onBeforeMount | onBeforeMount(() => {}) | VUE-JS |
| onMounted | onMounted(() => {}) | VUE-JS |
| onBeforeUpdate | onBeforeUpdate(() => {}) | VUE-JS |
| onUpdated | onUpdated(() => {}) | VUE-JS |
| onBeforeUnmount | onBeforeUnmount(() => {}) | VUE-JS |
| onUnmounted | onUnmounted(() => {}) | VUE-JS |
| onErrorCaptured | onErrorCaptured(() => {}) | VUE-JS |
| onRenderTracked | onRenderTracked(() => {}) | VUE-JS |
| onRenderTriggered | onRenderTriggered(() => {}) | VUE-JS |