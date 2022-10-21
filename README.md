OffscreenCanvas  https://developer.mozilla.org/zh-CN/docs/Web/API/OffscreenCanvas
Experimental: 这是一个实验中的功能

OffscreenCanvas提供了一个可以脱离屏幕渲染的canvas对象。它在窗口环境和web worker环境均有效。
构造函数
OffscreenCanvas()
OffscreenCanvas构造函数。创建一个新的OffscreenCanvas对象。

方法
OffscreenCanvas.getContext() (en-US)
为offscreen canvas对象返回一个渲染画布。
OffscreenCanvas.toBlob() (en-US)
创建一个代表canvas中的图像的Blob对象。
OffscreenCanvas.transferToImageBitmap()
从OffscreenCanvas最近渲染的图像创建一个 ImageBitmap 对象。






其他比较好用的canvas库：https://juejin.cn/post/7038267477121302542


现有的方法在本周末前写成文章，并用flutter实现一版，并且弄成浏览器插件
画布新增实现：定义曲线边框，自定义图片边框（可以用户自定义上传图片），实现剪裁（上传小图片，四周颜色变成图片最多的颜色，然后用自定义形状去剪裁，保存png图片），加黑白滤镜，自定义保存位置