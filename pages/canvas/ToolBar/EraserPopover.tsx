import {useEffect, useState} from 'react';
import {useCanvasConfig} from '../context';
import Tippy from '@tippyjs/react';
import './index.css'
export default function EraserPopover() {
  const {config} = useCanvasConfig();
  const [visible, setVisible] = useState(false);
  // 需要将所有原定设置恢复
  const [initialConfig, setInitialConfig] = useState({...config});
  useEffect(() => {
    if (visible) {
      setInitialConfig({...config})
    }
    config.strokeStyle = visible ? `rgba(255, 255, 255)` : initialConfig.strokeStyle;
    config.lineWidth = visible ? 10 : initialConfig.lineWidth;
    config.drawType = visible ? 'normal' : initialConfig.drawType;
  }, [visible])
  return <Tippy
    className='shape-popover'
    trigger="click"
    placement="right"
    interactive={true}
    visible={visible}
    content={<div className='eraser-wrap'>
      透明度：<input
        type="range"
        min={1}
        max={10}
        defaultValue={10}
        onChange={e => (config.strokeStyle = `rgba(255, 255, 255, ${Number(e.target.value) / 10})`)}
      /><br />
      橡皮擦大小：<input
        type="range"
        min={1}
        max={100}
        value={config.lineWidth}
        onChange={e => (config.lineWidth = Number(e.target.value))}
      />
    </div>}
  >
    <span onClick={() => setVisible(!visible)}>橡皮擦</span>
  </Tippy>
}