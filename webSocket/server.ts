// 导入WebSocket模块:
const serverWebSocket = require('ws');

// 实例化:
const wss = new serverWebSocket.Server({
	//端口号
    port: 3000
});

let allData = {};
wss.on('connection', function (ws) {
  console.log('服务端连接');
  ws.on('message', function (message) {
    const {userID, pathData} = JSON.parse(message);
    allData[userID] = pathData;
    ws.send(JSON.stringify(allData), (err) => {
      if (err) {
          console.log(`连接错误: ${err}`);
      }
    });
  })
});