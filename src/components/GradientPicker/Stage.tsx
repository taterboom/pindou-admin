import React from 'react';
import style from './index.module.scss';
import { Stop } from './type';
import { rgb2string } from '../../utils/color';

interface StageProps{
  value?: Stop[],
}

function stops2linearGradient(value?: Stop[]): string {
  if (value === undefined) return '';
  return `linear-gradient(to right, ${value.map(stop => `${rgb2string(stop.color)} ${stop.position}%`).join(',')})`;
}

const Stage: React.FunctionComponent<StageProps> = ({value}) => {
  return (
    <div className={style['stage']} style={{background: stops2linearGradient(value)}}></div>
  )
}

export default Stage;