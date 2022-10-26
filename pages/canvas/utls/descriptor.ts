
export default class descriptors {
  canvas: any;
  ctx: any;
  constructor() {
    this.canvas =  document.getElementById('drawCanvas');
    this.ctx = this.canvas.getContext('2d');
  }
  clear() {
    let rect = this.canvas.getBoundingClientRect();
    this.ctx.clearRect(rect.x, rect.y, rect.width, rect.height);
  }
  toImageUrl() {
    var img = new Image();
    img.setAttribute("crossOrigin", "anonymous");
    return img = this.canvas.toDataURL("image/png");
  }
  async share(type) {
    if (type === 'link') {
      if (navigator.share) {
        navigator.share({
          title: document.title,
          text: '简易画板分享链接',
          url: document.location.href
        })
      } else {
        alert('当前浏览器版本不支持分享')
      }
    } else if (type === 'file') {
      if (!!navigator.canShare) {
        let imgUrl:any = await this.toImageUrl();
        console.log(imgUrl, 'imgUrl')
        let imgBlob = new Blob([imgUrl], {type: 'image/png'})
        let imgFile = new window.File([imgBlob], '分享图片', {
          type: imgBlob.type
        })
        console.log(imgFile, 'imgFile')
        navigator.share({
          files: [imgFile],
          title: '分享图片',
          text: 'png图片分享',
        })
        .then(() => console.log('Share was successful.'))
        .catch((error) => console.log('Sharing failed', error));
      } else {
        alert('当前浏览器版本不支持分享')
      }
    }
  }
}