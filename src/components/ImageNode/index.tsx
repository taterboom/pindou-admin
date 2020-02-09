import React from 'react';
import classNames from 'classnames';
import style from './index.module.scss';

interface Props{
  filePath: string,
  fileName: string,
  showFileName?: boolean,
  showBorder?: boolean,
}

const ImageNode: React.SFC<Props> = ({filePath, fileName, showFileName = false, showBorder = false}) => {
  return (
    <div className={style["image-container"]}>
      <div className={classNames(style["image-wrapper"], {[style["image-wrapper--border"]]: showBorder})}>
        <img className={classNames({[style["image--border"]]: showBorder})} src={filePath}/>
      </div>
      { showFileName && <p className={style["image-name"]}>{fileName}</p>}
    </div>
  )
}

export default ImageNode;