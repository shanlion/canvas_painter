import {useCanvasConfig} from '../context';
import Tippy from '@tippyjs/react';
import {shapeConfig} from "../utls/config";
import './index.css'
interface IShapeProps{
  text: String
}
export default function ShapePopover(props: IShapeProps) {
  const {config} = useCanvasConfig();
  const curShapeIndex = shapeConfig.findIndex(item => item.value === config.drawType);
  return <Tippy
    className='shape-popover'
    trigger="click"
    placement="right"
    interactive={true}
    content={<div className='shape-wrap'>
      {shapeConfig.map(item => <span key={item.value} onClick={() => {config.drawType = item.value; config.flowType = ''}}>{item.label}</span>)}
      {curShapeIndex > -1 && <p>当前笔刷形状为： {shapeConfig[curShapeIndex]!.label}</p>}
    </div>}
  >
    <span>{props.text}</span>
  </Tippy>
}