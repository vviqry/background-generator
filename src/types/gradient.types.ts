export type GradientDirection =
  | 'to right'
  | 'to left'
  | 'to bottom'
  | 'to top'
  | 'to bottom right'
  | 'to bottom left'
  | 'to top right'
  | 'to top left';

export interface GradientState {
  color1: string;
  color2: string;
  direction: GradientDirection;
}

export interface DirectionOption {
  value: GradientDirection;
  label: string;
  arrow: string; // Unicode arrow character
}
