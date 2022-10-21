import './index.css'
/* 做个图片展示，类似截屏效果 */
interface IImgPreviewProps {
  imgUrl: string
}
export const ImgPreview = (props: IImgPreviewProps) => {
  const onSave = () => {
    async function saveFile(blob, filename) {
      try {
        const handle = await (window as any).showSaveFilePicker({
          suggestedName: filename,
          types: [
            {
              description: "PNG file",
              accept: {
                "image/png": [".png"],
              },
            },
          ],
         });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        return handle;
      } catch (err: any) {
         console.error(err.name, err.message);
      }
    }
    saveFile(props.imgUrl, "test.png");
  }
  return <div className='img-preview-wrap'>
    <img className='img-preview' src={props.imgUrl}/>
    <span className="preview-button" onClick={onSave}>保存</span>
  </div>
}
