import { useEffect, useState } from 'react';
import './index.css';
import descriptors from '../utls/descriptor';
import ColorSizePopover from './ColorSizePopover';
import ShapePopover from './ShapePopover';
import EraserPopover from './EraserPopover';
import FlowPopover from './FlowPopover';
import {ImgPreview} from '../PreImage/index'

interface IToolBarProps{
  undo: Function
}
export default function ToolBar(props: IToolBarProps) {
  let descriptorsFunc;
  const [imgUrl, setImgUrl] = useState('');
  useEffect(() => {
    descriptorsFunc = new descriptors();
  }, [])
  const onFinish = () => {
    console.log(descriptorsFunc.toImageUrl())
    let url = descriptorsFunc.toImageUrl()
    setImgUrl(url)
  }
  const onClear = () => {
    descriptorsFunc.clear()
  }
  return <div className="tool-bar">
    <div className='tool-bar-item' onClick={() => onClear()}>清空</div>
    <div className='tool-bar-item'>
      <ColorSizePopover text='笔刷样式'/>
    </div>
    <div className='tool-bar-item'>
      <ShapePopover text='线条风格'/>
    </div>
    <div className='tool-bar-item'>
      <EraserPopover/>
    </div>
    <div className='tool-bar-item'>
      <FlowPopover/>
    </div>
    <div className='tool-bar-item' onClick={() => props.undo()}>撤销</div>
    <div className='tool-bar-item' onClick={() => onFinish()}>完成</div>
    {imgUrl && <ImgPreview imgUrl={imgUrl}/>}
  </div>
}
