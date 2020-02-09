import { RGBColor } from "react-color";

export interface Stop{
  id?: string,
  color: RGBColor,
  position: number, // [0, 100]
}