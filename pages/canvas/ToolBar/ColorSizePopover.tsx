import { useEffect, useState } from 'react';
import { CirclePicker, HuePicker } from 'react-color';
import {useCanvasConfig} from '../context';
import Tippy from '@tippyjs/react';
import './index.css'
interface IColorSizeProps{
  text: String
}
export default function ColorSizePopover(props: IColorSizeProps) {
  const {config} = useCanvasConfig();
  console.log(config, 'config')
  return <Tippy
    trigger="click"
    placement="right"
    interactive={true}
    content={<div>
      <CirclePicker color={config.strokeStyle} onChange={(color: any) => config.strokeStyle = color.hex} />
      <HuePicker color={config.strokeStyle} width="252px" onChange={(color: any) => config.strokeStyle = color.hex} />
      <p>当前笔刷宽度为： {config.lineWidth}</p>
      <input
        type="range"
        min={1}
        max={100}
        value={config.lineWidth}
        onChange={e => (config.lineWidth = Number(e.target.value))}
      />
    </div>}
  >
    <span>{props.text}</span>
  </Tippy>
}