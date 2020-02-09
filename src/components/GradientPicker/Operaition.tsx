import React, { useEffect, useRef, useCallback } from 'react';
import style from './index.module.scss';
import { Stop } from './type';
import ColorPicker from '../ColorPicker';
import useForceUpdate from '../../hooks/useForceUpdate';

const DELETE_THREHOLD = 30;

interface ItemProps extends Stop{
  onChange: (stop: object) => void,
  onDelete: () => void,
  containerWidth?: number,
  canDelete: boolean,
};

/**
 * rgba, position(percent)
 */
export const Item: React.FunctionComponent<ItemProps> = ({color, position, onChange, containerWidth, onDelete, canDelete}) => {
  const startMove = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (containerWidth === undefined) return;
    const startPosition = {
      x: e.clientX,
      y: e.clientY,
    };
    const indicatorOriginPosition = containerWidth * position /100;
    const mouseMoveHandler = (e: MouseEvent) => {
      const currentPosition = {
        x: e.clientX,
        y: e.clientY,
      };

      const diffY = currentPosition.y - startPosition.y;
      if (diffY > DELETE_THREHOLD && canDelete){
        onDelete();
        return;
      }

      const diffX = currentPosition.x - startPosition.x;
      let indicatorNewPosition = indicatorOriginPosition + diffX;
      if (indicatorNewPosition > containerWidth) indicatorNewPosition = containerWidth;
      if (indicatorNewPosition < 0) indicatorNewPosition = 0;
      onChange({position: +(indicatorNewPosition / containerWidth * 100).toFixed(1)});
    }
    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    }
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  }, [containerWidth, position, canDelete, onChange, onDelete]);
  return (
    <div className={style['operation-item']} style={{left: position + '%'}}>
      <div className={style['operation-item__indicator']} onMouseDown={startMove}></div>
      <div className={style['operation-item__color-picker']}>
        <ColorPicker
          value={color}
          onChange={(colorString, rgb) => onChange({color: rgb})}
          renderTrigger={colorString => <div className={style['operation-item__trigger']} style={{background: colorString}}></div>}
        ></ColorPicker>
      </div>
    </div>
  )
}

interface GroupProps{
  width?: number,
  onSpawn?: (payload: object) => void;
}

export const Group: React.FunctionComponent<GroupProps> = ({children, width, onSpawn}) => {
  const forceUpdate = useForceUpdate();
  const widthRef = useRef<number | undefined>(width);
  const containerElRef = useRef<HTMLDivElement>(null);
  if (width !== undefined) widthRef.current = width;
  useEffect(() => {
    if (width === undefined && containerElRef.current) {
      widthRef.current = containerElRef.current.getBoundingClientRect().width;
      forceUpdate();
    }

    // containerElRef.current && containerElRef.current.addEventListener('click', (e) => {
    //   onSpawn && widthRef.current && onSpawn({position: e.offsetX / widthRef.current * 100})
    // })    
  }, [width, forceUpdate/*, onSpawn*/]);

  const childrenWidthContainerWidth = React.Children.map(children, (child: any) => {
    return React.cloneElement(child, {containerWidth: widthRef.current})
  })

  const onClick = (e: React.MouseEvent) => {
    if (e.target !== containerElRef.current) return;
    onSpawn && widthRef.current && onSpawn({position: +(e.nativeEvent.offsetX / widthRef.current * 100).toFixed(1)})
  };
  return (
    <div ref={containerElRef} className={style['operation-group']} style={{width: width || '100%'}} onClick={onClick}>
      {childrenWidthContainerWidth}
    </div>
  )
}

export default {
  Item,
  Group,
}