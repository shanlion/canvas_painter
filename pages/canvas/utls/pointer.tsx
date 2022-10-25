
import {useEffect} from 'react';
import {useCanvasConfig} from '../context';
import websocketManager from '../../../webSocket/client';

export function drawFigure(options?: any) {
  let ctx;
  let crayonImage = new Image();
  let dpr = window.devicePixelRatio || 1;
  // crayonImage.src = "../images/crayon-bg.png";
  crayonImage.src = 'https://raw.githubusercontent.com/williammalone/Simple-HTML5-Drawing-App/master/images/crayon-texture.png'
  const {config, pathData} = useCanvasConfig();
  function initCanvas(callback) {
    let canvas: any = document.getElementById('drawCanvas');
    
    canvas.width = (document.body.clientWidth - 20) * dpr;
    canvas.height = (document.body.clientHeight - 20) * dpr;
    canvas.style.width = (document.body.clientWidth - 20) + 'px';
    canvas.style.height = (document.body.clientHeight - 20) + 'px'
    ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    
    crayonImage.onload = () => {
      callback(canvas)
    };
  
  }
  function drawAll(userPathData) {
    let canvasDom: any = document.getElementById('drawCanvas');
    let curCtx = canvasDom!.getContext('2d');
    let rect = canvasDom!.getBoundingClientRect();
    curCtx.clearRect(rect.x, rect.y, rect.width, rect.height);
    for (const key in userPathData) {
      if (Object.prototype.hasOwnProperty.call(userPathData, key)) {
        const pathData = userPathData[key];
        pathData.map(item => {
          if (Object.prototype.toString.call(item) === '[object Array]') {
            item.map(info => draw(info, curCtx))
          } else {
            flowDraw(item, curCtx)
          }
        })
      }
    }
  }
  function undo() {
    pathData.pop();
    websocketManager.getInstance().sendMessage(pathData)
    // let canvasDom: any = document.getElementById('drawCanvas');
    // let curCtx = canvasDom!.getContext('2d');
    // let rect = canvasDom!.getBoundingClientRect();
    // curCtx.clearRect(rect.x, rect.y, rect.width, rect.height);
    // pathData.map(item => {
    //   if (Object.prototype.toString.call(item) === '[object Array]') {
    //     item.map(info => draw(info, curCtx))
    //   } else {
    //     flowDraw(item, curCtx)
    //   }
    // })
  }
  function draw(pathInfo, curCtx?: any) {
    let useCtx = curCtx ? curCtx : ctx;
    if (pathInfo.beginX !== null && pathInfo.beginY !== null) {
      const {lastX, lastY, beginX, beginY, strokeStyle, lineWidth, drawType, flowType} = pathInfo;
      useCtx.beginPath();
      useCtx.lineCap = 'round';
      useCtx.moveTo(beginX, beginY);
      useCtx.lineTo(lastX, lastY);
      useCtx.strokeStyle = strokeStyle;
      useCtx.lineWidth = lineWidth;

      if (drawType === "curve") {
      }

      // 增加粉笔
      if (drawType === "crayon") {
        // 使用背景图片
        useCtx.stroke();
        useCtx.strokeStyle = useCtx.createPattern(crayonImage, 'repeat');

        // 使用算法
        // var length = Math.round(Math.sqrt(Math.pow(lastX - beginX, 2) + Math.pow(lastY - beginY, 2)) / ( 5 / lineWidth));
        // var xUnit = (lastX - beginX) / length;
        // var yUnit = (lastY - beginY) / length;
        // for(var i=0; i<length; i++ ) {
        //   var xCurrent = beginX + (i * xUnit);	
        //   var yCurrent = beginY + (i * yUnit);
        //   var xRandom = xCurrent + (Math.random() - 0.5) * lineWidth * 1.2;			
        //   var yRandom = yCurrent+(Math.random() - 0.5) * lineWidth * 1.2;
        //   useCtx.clearRect( xRandom, yRandom, Math.random() * 2 + 2, Math.random() + 1);
        // }
      }
      
      useCtx.stroke();
      useCtx.closePath();
    }
  }

  // 流程图绘制
  function flowDraw(pathInfo, curCtx?: any) {
    
    let useCtx = curCtx ? curCtx : ctx;
    const {lastX, lastY, beginX, beginY, strokeStyle, lineWidth, fillText, flowType} = pathInfo;
    useCtx.beginPath();
    useCtx.strokeStyle = strokeStyle;
    useCtx.lineWidth = lineWidth;
    if (flowType === 'rect') {
      useCtx.rect(beginX, beginY, lastX - beginX, lastY - beginY);
    }
    if (flowType === 'fillText') {
      useCtx.font = lineWidth + 'px sans-serif';
      useCtx.fillStyle = strokeStyle;
      useCtx.fillText(fillText, beginX, beginY)
    }

    if (flowType === 'elipse') {
      let radiusX = Math.abs(lastX - beginX);
      let radiusY = Math.abs(lastY - beginY);
      var r = radiusX > radiusY ? radiusX : radiusY; //用打的数为半径
      var scaleX = radiusX / r; //计算缩放的x轴比例
      var scaleY = radiusY / r; //计算缩放的y轴比例
      useCtx.save(); //保存副本                    
      useCtx.translate(beginX + radiusX / 2, beginY + radiusY / 2); //移动到圆心位置
      useCtx.scale(scaleX, scaleY); //进行缩放
      useCtx.arc(0, 0, r, 0, Math.PI * 2, Math.PI * 2); //绘制圆形
      useCtx.restore(); 
    }

    if (flowType === 'arrow') {
      var l = 20;
      var a = Math.atan2((lastY - beginY), (lastX - beginX));
      var x3 = lastX - l * Math.cos(a + 30 * Math.PI / 180);
      var y3 = lastY - l * Math.sin(a + 30 * Math.PI / 180);
      var x4 = lastX - l * Math.cos(a - 30 * Math.PI / 180);
      var y4 = lastY - l * Math.sin(a - 30 * Math.PI / 180);
      console.log(lastX, lastY, x3, y3, x4, y4, 'lastX, lastY, x3, y3, x4, y4')
      useCtx.moveTo(beginX, beginY);
      useCtx.lineTo(lastX, lastY);
      useCtx.moveTo(x3, y3);
      useCtx.lineTo(lastX, lastY);
      useCtx.lineTo(x4, y4);
    }
    
    useCtx.stroke();
    useCtx.closePath();
  }
  
  let lastPt = {x: null, y: null};
  let flowLastPt = {x: null, y: null};
  let mouseButtonDown = false;
  options = options ? options : {};
  let singlePathData:any[] = [];
  let tempDom: any = null;
  // 中间状态的绘制
  function tempDomDraw(pathInfo) {
    const {lastX, lastY, beginX, beginY, strokeStyle, lineWidth, drawType, flowType} = pathInfo;
    if (flowType === 'rect') {
      tempDom.style.width = Math.abs(lastX - beginX) + 'px';
      tempDom.style.height = Math.abs(lastY - beginY) + 'px';
      tempDom.style.transform = `rotateX(${lastY < beginY ? '-180deg' : 0}) rotateY(${lastX < beginX ? '-180deg' : 0})`
      tempDom.style.border = `${lineWidth}px solid ${strokeStyle}`;
    }
  }
  // 初始中间状态
  function initTempDraw(event) {
    if (config.flowType === 'rect') {
      if (tempDom) return
      tempDom = document.createElement("div");
      tempDom.id = "temp";
      tempDom.style.position = "absolute";
      tempDom.style.transformOrigin= 'left top';
      tempDom.style.top = event.pageY + 'px';
      tempDom.style.left = event.pageX + 'px';
      tempDom.style.boxSizing = 'border-box';
      tempDom.onclick = handleMouseUp;
      document.body.appendChild(tempDom);
    }
    if (config.flowType === 'fillText') {
      if (tempDom) return
      tempDom = document.createElement("input");
      tempDom.id = "temp";
      tempDom.style.position = "absolute";
      tempDom.style.top = event.pageY + 'px';
      tempDom.style.left = event.pageX + 'px';
      tempDom.onblur = (e) => {
        tempDom.setAttribute("inputValue", e.target.value)
      };
      document.body.appendChild(tempDom);
    }
  }
  function handleMouseDown(event: any) {
    mouseButtonDown = true;
    lastPt = {
      x: event.pageX,
      y: event.pageY
    }
    if (config.flowType && !tempDom) {
      flowLastPt = {
        x: event.pageX,
        y: event.pageY
      }
      initTempDraw(event);
    }
    
  }
  function handleMouseMove(event) {
    if (mouseButtonDown && !config.flowType) {
      let singleData = {beginX: lastPt.x, beginY: lastPt.y, lastX: event.pageX, lastY: event.pageY, strokeStyle: config.strokeStyle, lineWidth: config.lineWidth, drawType: config.drawType, flowType: config.flowType};
      singlePathData.push(singleData)
      // draw(singleData)
      lastPt = {
        x: event.pageX,
        y: event.pageY
      }
    }
    if (mouseButtonDown && config.flowType) {
      let flowPathData = {beginX: flowLastPt.x, beginY: flowLastPt.y, lastX: event.pageX, lastY: event.pageY, strokeStyle: config.strokeStyle, lineWidth: config.lineWidth, drawType: config.drawType, flowType: config.flowType};
      tempDomDraw(flowPathData)
    }
  }
  function handleMouseUp(event: any) {
    mouseButtonDown = false;
    lastPt = {x: null, y: null};
    if (config.flowType) {
      let inputValue = tempDom && tempDom.getAttribute("inputValue");
      let flowPathData = {beginX: flowLastPt.x, beginY: flowLastPt.y, lastX: event.pageX, lastY: event.pageY, strokeStyle: config.strokeStyle, lineWidth: config.lineWidth, drawType: config.drawType, flowType: config.flowType,
      fillText: inputValue};
      flowDraw(flowPathData)
      pathData.push(flowPathData)
      flowLastPt = {x: null, y: null};
      tempDom = null;
      var tempCanvasDom = document.getElementById("temp");
      tempCanvasDom?.parentNode?.removeChild(tempCanvasDom);
    } else {
      if (singlePathData.length > 0) {
        pathData.push(singlePathData)
      }
      
    }
    singlePathData = [];
    websocketManager.getInstance().sendMessage(pathData)
  }
  useEffect(() => {
    if (!document.getElementById('drawCanvas')) {
      return
    }
    mouseButtonDown = false;
    initCanvas((canvas) => {
      if (window.PointerEvent) {
        canvas.addEventListener('pointerdown', handleMouseDown, false);
        canvas.addEventListener('pointermove', handleMouseMove, false);
        canvas.addEventListener('pointerup', handleMouseUp, false);
      } else {
        canvas.addEventListener('mousedown', handleMouseDown, false);
        canvas.addEventListener('mousemove', handleMouseMove, false);
        canvas.addEventListener('mouseup', handleMouseUp, false);
      }
    });
    websocketManager.getInstance().createWebSocket(drawAll);
    return () => {
      websocketManager.getInstance().closeWebSocket()
    }
  }, [])
  return {undo}
}