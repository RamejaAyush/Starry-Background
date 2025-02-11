export interface IStar {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  alphaChange: number;
  radiusChange: number;
  type: "normal" | "blink" | "lifeCycle";
  lifeCycleTime?: number;
  cycleDuration?: number;
  baseRadius?: number;
}
