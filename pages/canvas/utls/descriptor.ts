
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
    return this.canvas.toDataURL("image/png");
  }
}