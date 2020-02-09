import { RGBColor } from "react-color";

export function rgb2string(rgb: RGBColor): string {
  const {r, g, b, a} = rgb;
  return `rgba(${r},${g},${b},${a})`;
}

export function string2rgb(rgbString: string): RGBColor {
  console.log(rgbString);
  const rgbMatch = rgbString.match(/(rgb|rgba)\(((\w|,|\.)+)\)/);
  const [r, g, b, a] = rgbMatch ? rgbMatch[2].split(',').map(item => parseFloat(item)) : [0, 0, 0, 1];
  return {
    r, g, b, a,
  };
}