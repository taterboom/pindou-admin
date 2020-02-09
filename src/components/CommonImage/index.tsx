import React, { useMemo } from 'react';
import style from './index.module.scss';

export enum TYPE {
  background,
  image,
  color,
}

interface CommonImageProps{
  src?: string,
  alt?: string,
  type?: TYPE,
  color?: string,
}

const CommonImage: React.SFC<CommonImageProps> = ({src, alt = '', type = TYPE.background, color}) => {
  const _style = useMemo(() => {
    switch (type) {
      case TYPE.background:
        return {
          backgroundImage: `url(${src})`,
        };
      case TYPE.color:
        return {
          backgroundColor: color,
        };
      default:
        return {};
    };
  }, [color, type, src]);
  return (
    <div className={style['image-container']} style={type === TYPE.color ? { height: '40px'} : {}}>
      <div className={style['image-wrapper']} style={_style}>
        { type === TYPE.image && <img src={src} alt={alt} /> }
      </div>
    </div>
  )
}

export default CommonImage;