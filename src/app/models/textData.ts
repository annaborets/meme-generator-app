export interface ColorRGB {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface ModalData {
  color: ColorRGB;
  textSize: number;
  fontFamily: string;
}

export interface SliderObj {
  autoTicks: boolean;
  disabled: boolean;
  invert: boolean;
  max: number;
  min: number;
  showTicks: boolean;
  step: number;
  thumbLabel: boolean;
  vertical: boolean;
  tickInterval: number;
}
