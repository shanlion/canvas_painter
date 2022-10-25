
export default class websocketManager{
  static getInstance(): websocketManager {
    if (websocketManager.instance == null) {
      websocketManager.instance = new websocketManager();
    }
    return websocketManager.instance;
  }
  private static instance: any = null;
  websocket = new WebSocket('ws://localhost:3000');
  createWebSocket(drawFunc) {
    this.websocket.onopen = function() {
      console.log('开始链接')
    }
    this.websocket.onerror = (err) => {
      console.log('websocket错误 ' + err)
      // 需要重连
    }
    this.websocket.onclose = (err) => {
      console.log('websocket 关闭 ' + err.reason)
    }
    this.websocket.onmessage = (event) => {
      drawFunc(JSON.parse(event.data))
    }
  }
  closeWebSocket() {
    this.websocket && this.websocket.close()
  }
  sendMessage(value) {
    const userID = getFunParam('id');
    const data = {userID, pathData: value}
    this.websocket.send(`${JSON.stringify(data)}`)
  }
}
const getFunParam = (param) => {
  let url = window.location.search?.replace('?', '');
  let paramArr = url.split('&');
  for (let i = 0; i < paramArr.length; i++) {
    let newParamArr = paramArr[i].split('=');
    if (newParamArr[0] == param) {
      return newParamArr[1]
    }
  }
}
