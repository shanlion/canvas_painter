import { useEffect, useState } from 'react';
import './index.css';
import descriptors from '../utls/descriptor';
import ColorSizePopover from './ColorSizePopover';
import ShapePopover from './ShapePopover';
import EraserPopover from './EraserPopover';
import FlowPopover from './FlowPopover';
import {ImgPreview} from '../PreImage/index'
import Tippy from '@tippyjs/react';

interface IToolBarProps{
  undo: Function;
  clear: Function;
}
export default function ToolBar(props: IToolBarProps) {
  let descriptorsFunc;
  const [imgUrl, setImgUrl] = useState('');
  useEffect(() => {
    descriptorsFunc = new descriptors();
  })
  const onFinish = () => {
    let url = descriptorsFunc.toImageUrl();
    setImgUrl(url)
  }
  const onShare = (type: string) => {
    descriptorsFunc.share(type)
  }
  return <div className="tool-bar">
    <div className='tool-bar-item' onClick={() => props.clear()}>清空</div>
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
    <div className='tool-bar-item'>
      <Tippy
        className='shape-popover'
        trigger="click"
        placement="right"
        interactive={true}
        content={<div className='flow-wrap'>
          <span onClick={() => onShare('link')}>分享链接</span>
          <span onClick={() => onShare('file')}>分享图片</span>
        </div>}
      >
        <span>分享</span>
      </Tippy>
    </div>
    {imgUrl && <ImgPreview imgUrl={imgUrl}/>}
  </div>
}
