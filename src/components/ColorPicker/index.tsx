import React, { useState, useCallback, useImperativeHandle, useMemo, useEffect } from 'react';
import style from './index.module.scss';
import { SketchPicker, RGBColor } from 'react-color';
import { string2rgb, rgb2string } from '../../utils/color';

function formatValue(value?: RGBColor | string): RGBColor {
  return value
    ? typeof value === 'string'
      ? string2rgb(value)
      : value
    : RGB_DEFAULT
}

const RGB_DEFAULT = {r: 0, g: 0, b: 0, a: 1};

interface ColorPickerProps{
  value?: RGBColor | string,
  onChange?: (value: string, rgb: RGBColor) => void,
  renderTrigger?: (color?: string) => React.ReactElement,
  emitChangeWhenMounted?: boolean,
}

const ColorPicker: React.FunctionComponent<ColorPickerProps> = ({value, onChange, renderTrigger, emitChangeWhenMounted = true}, ref) => {
  const [pickerVis, setPickerVis] = useState(false);
  const [color, setColor] = useState<RGBColor>(formatValue(value));
  useEffect(() => {
    if (emitChangeWhenMounted && onChange) {
      onChange(rgb2string(color), color);
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const changeHandler = useCallback((v) => {
    setColor(v.rgb);
    onChange && onChange(rgb2string(v.rgb), v.rgb);
  }, [onChange]);
  useImperativeHandle(
    ref,
    () => ({
      value: color,
    }),
    [color],
  );
  const colorString = useMemo(() => {
    return rgb2string(color);
  }, [color]);
  return (
    <div className={style['color-picker']}>
      <div onClick={() => setPickerVis(true)}>
        {
          renderTrigger
            ? renderTrigger(colorString)
            : (
              <div className={style['show']}>
                <div className={style['show-content']} style={{background: rgb2string(color)}}/>
              </div>
            )
        }
      </div>
      {
        pickerVis && (
          <div className={style['color-picker__popover']}>
            <div className={style['color-picker__mask-layer']} onClick={() => setPickerVis(false)}/>
            <SketchPicker color={color} onChange={changeHandler} />
          </div>
        )
      }

    </div>
  )
}

export default React.forwardRef(ColorPicker);