import { IStar } from "../interfaces/star";

/**
 * Creates a new star object with random properties for animation.
 */
export const createStar = (
  canvasWidth: number,
  canvasHeight: number
): IStar => {
  const rand = Math.random();
  const generateRadius = () => (Math.random() * 0.6 + 0.25) * 0.9;

  if (rand < 0.05) {
    return {
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      radius: generateRadius(),
      alpha: 0.5,
      alphaChange: Math.random() * 0.02 + 0.005,
      radiusChange: Math.random() * 0.05,
      type: "blink",
    };
  } else if (rand < 0.1) {
    return {
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      radius: generateRadius(),
      alpha: 0,
      alphaChange: 0,
      radiusChange: Math.random() * 0.05,
      type: "lifeCycle",
      lifeCycleTime: 0,
      cycleDuration: 300 + Math.floor(Math.random() * 300),
    };
  } else {
    return {
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      radius: generateRadius(),
      alpha: 0.6,
      alphaChange: 0,
      radiusChange: Math.random() * 0.05,
      type: "normal",
    };
  }
};
