import React, { useCallback, useState } from 'react';
import style from './index.module.scss';

interface Point{
  x: number,
  y: number,
}

enum Block{
  rt,
  rb,
  lt,
  lb,
}

function calBlock(ps: Point, pe: Point): Block {
  if (pe.x > ps.x) {
    if (pe.y> ps.y) {
      return Block.rb;
    } else {
      return Block.rt;
    }
  } else {
    if (pe.y> ps.y) {
      return Block.lb;
    } else {
      return Block.lt;
    }
  }
}

function calAngle(ps: Point, pe: Point): number {
  const a = Math.atan(Math.abs((pe.y - ps.y) / (pe.x - ps.x))) / Math.PI * 180
  switch(calBlock(ps, pe)) {
    case Block.rt:
      return 90 - a;
    case Block.rb:
      return 90 + a;
    case Block.lb:
      return 270 - a;
    case Block.lt:
      return 270 + a;
  }
}

/**
 * 围绕originPoint顺时针旋转toRotatePoint a度
 * @param {*} toRotatePoint
 * @param {*} originPoint
 * @param {*} a 弧度制
 */
function rotatePointClockwise(toRotatePoint: Point, originPoint: Point, a: number): Point {
  const { x, y } = toRotatePoint;
  const { x: rx, y: ry } = originPoint;
  return {
    x: (x - rx) * Math.cos(a) - (y - ry) * Math.sin(a) + rx,
		y: (x - rx) * Math.sin(a) + (y - ry) * Math.cos(a) + ry,
 };
}

interface AngleSelectProps {
  value?: number,
  onChange?: (v: number) => void,
}

const AngleSelect: React.FunctionComponent<AngleSelectProps> = ({value, onChange}) => {
  const startMove = useCallback((e: React.MouseEvent) => {
    const startPosition = {
      x: e.clientX,
      y: e.clientY,
    };
    const originPoint = rotatePointClockwise({x: startPosition.x, y: startPosition.y + 40}, startPosition, value ? value * Math.PI / 180 : 0);
    console.log(originPoint)
    const mouseMoveHandler = (e: MouseEvent) => {
      const endPosition = {
        x: e.clientX,
        y: e.clientY,
      }
      onChange && onChange(+calAngle(originPoint, endPosition).toFixed(1));
    }
    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    }
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  }, [value, onChange]);
  console.log(value);
  return (
    <div className={style['angle-select']}>
      <div className={style['angle-select__origin']}></div>
      <div className={style['angle-select__pointer']} style={{transform: `rotateZ(${value}deg)`}}>
        <div className={style['indicator']} onMouseDown={startMove}></div>
        <div className={style['body']}></div>
      </div> 
    </div>
  )
}

// const Test: React.FunctionComponent = () => {
//   const [v, setV] = useState(0);
//   return <AngleSelect value={v} onChange={setV}/>
// }

export default AngleSelect;