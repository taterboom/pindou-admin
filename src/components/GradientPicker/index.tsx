import React, { useCallback } from 'react';
import Stage from './Stage';
import { string2rgb, rgb2string } from '../../utils/color';
import AngleSelect from '../AngleSelect';
import { Stop } from './type';
import GradientPickerController from './GradientPickerController';

const STOPS_DEFAULT = [
  {
    id: '-1',
    color: {r: 0, g: 0, b: 0, a: 1},
    position: 0,
  },
  {
    id: '-2',
    color: {r: 255, g: 25, b: 255, a: 1},
    position: 100,
  },
]

function parseLinerGradient(linearGradient?: string): {stops?: Stop[], angle?: number} {
  if (linearGradient === undefined) return {};
  const match = linearGradient.match(/linear-gradient\(([0-9|.|d|e|g]+),([r|g|b|a|0-9|.|(|)|,|%| ]+)\)$/);
  if (match === null) return {};
  const [, angleString, stopString] = match;
  const angle = parseFloat(angleString);
  const stopStringArr = stopString.match(/(r[g|b|a|0-9|.|(|)|,| ]+%)/g);
  if (stopStringArr === null) return {};
  const stops = stopStringArr.map(string => {
    const [rgbaString, percentString] = string.split(' ');
    const rgb = string2rgb(rgbaString);
    const position = +percentString.replace('%', '');
    return {
      // id: uuid(),
      color: rgb,
      position,
    }
  });
  return {
    angle,
    stops,
  }
}

function formatLinearGradient(stops?: Stop[], angle?: number): string {
  if (stops === undefined || angle === undefined) return '';
  return `linear-gradient(${angle}deg, ${stops.map(stop => `${rgb2string(stop.color)} ${stop.position}%`).join(',')})`;
}

interface GradientPickerProps{
  value?: string,
  onChange?: (colorString: string) => void,
}

const GradientPicker: React.FunctionComponent<GradientPickerProps> = ({value, onChange}) => {
  const {stops = STOPS_DEFAULT, angle = 0} = parseLinerGradient(value);
  console.log(value, stops, angle);
  const onChangeGradients = useCallback((_stops: Stop[]) => {
    onChange && onChange(formatLinearGradient(_stops, angle));
  }, [angle, onChange]);
  const onChangeAngle = useCallback((_angle: number) => {
    onChange && onChange(formatLinearGradient(stops, _angle));
  }, [stops, onChange]);
  return (
    <div>
      <Stage value={stops}></Stage>
      <GradientPickerController value={stops} onChange={onChangeGradients}></GradientPickerController>
      <AngleSelect value={angle} onChange={onChangeAngle}></AngleSelect>
    </div>
  )
}
export default GradientPicker;