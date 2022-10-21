import ReactDOM from 'react-dom';
import './index.css';
import ToolBar from './canvas/ToolBar/index';
import {drawFigure} from './canvas/utls/pointer';
import {CanvasProvider} from './canvas/context';
const Index = () => {
  return <CanvasProvider>
    <CanvasProviderDom />
  </CanvasProvider>
}
const CanvasProviderDom = () => {
  const {undo} = drawFigure()
  return <div>
      <ToolBar undo={undo}/>
      <canvas className='canvas' id="drawCanvas"></canvas>
    </div>
}

ReactDOM.render(<Index />, document.getElementById('root'));