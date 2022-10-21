import Tippy from '@tippyjs/react';
import {useCanvasConfig} from '../context';
import {flowConfig} from "../utls/config";
import './index.css'
export default function FlowPopover() {
  const {config} = useCanvasConfig();
  const onFlowShapeClick = (value) => {
    console.log(value, 'flowValue')
    config.flowType = value
    config.drawType = ''
  }
  return <Tippy
    className='shape-popover'
    trigger="click"
    placement="right"
    interactive={true}
    content={<div className='flow-wrap'>
      {
        flowConfig.map(item => {
          return <span key={item.value} onClick={() => onFlowShapeClick(item.value)}>{item.label}</span>
        })
      }
      
    </div>}
  >
    <span>流程图</span>
  </Tippy> 
}