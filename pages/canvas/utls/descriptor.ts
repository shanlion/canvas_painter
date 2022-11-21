import { read } from "fs";

export default class descriptors {
  canvas: any;
  ctx: any;
  constructor() {
    this.canvas =  document.getElementById('drawCanvas');
    this.ctx = this.canvas.getContext('2d');
  }
  toImageUrl() {
    return this.canvas.toDataURL("image/png");
  }
  share(type) {
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
        let imgUrl:any = this.toImageUrl();
        // let imgBlob = new Blob([imgUrl], {type: 'image/png'})
        // blob是啥格式，什么意思，图片网络地址转file文件，
        var arr = imgUrl.split(',');
        var bstr = atob(arr[1]);
        var mime = arr[0].match(/:(.*?);/)[1]; // image/png
        var suffix = mime.split('/')[1];
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while(n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        console.log(u8arr, 'u8arr')
        let imgFile = new window.File([u8arr], `分享图片.${suffix}`, {
          type: mime
        })
        console.log(imgFile, 'imgFile')
        var reader = new FileReader();
        reader.readAsDataURL(imgFile);
        reader.onload = function() {
          // console.log(this.result, '转后的链接')
          console.log(this.result == imgUrl)
        }
        navigator.share({
          files: [imgFile]
        })
        .then(() => {
          console.log('Share was successful.')
        })
        .catch((error) => console.log('Sharing failed', error));
      } else {
        alert('当前浏览器版本不支持分享')
      }
    }
  }
}