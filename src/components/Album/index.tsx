import React from 'react';
import ImageNode from '../ImageNode';
import style from './index.module.scss';
import { CommonFile } from '../../entity';

const Album: React.SFC<{images: CommonFile[]}> = ({images}) => {
  return (
    <ul className={style["album-container"]}>
      {
        images.map(image => (
          <li className={style["album-item"]} key={image.id}>
            <ImageNode fileName={image.fileName} filePath={image.filePath} showBorder/>
          </li>
        ))
      }
    </ul>
  )
}

export default Album;