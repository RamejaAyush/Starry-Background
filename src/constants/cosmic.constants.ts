export const CosmicConstants = {
  STAR_COUNT: 700,

  // Nebula Constants
  NEBULA_LIFETIME_INCREMENT: 0.016, // Increment per frame for nebula lifetime
  NEBULA_FADEIN_DURATION: 4, // Duration (in time units) for fade-in phase
  NEBULA_FADEIN_ALPHA_MULTIPLIER: 0.025, // Multiplier for alpha during fade-in
  NEBULA_MAX_ALPHA: 0.1, // Maximum alpha during fade-in
  NEBULA_FADEOUT_THRESHOLD: 9, // Time threshold after which fade-out starts
  NEBULA_FADEOUT_MULTIPLIER: 0.99, // Multiplier for alpha during fade-out
  NEBULA_HUE_INCREMENT: 0.2, // Increment for nebula hue per frame

  // Ripple Constants
  RIPPLE_INITIAL_RADIUS: 1,
  RIPPLE_INITIAL_ALPHA: 1,
  RIPPLE_RADIUS_INCREMENT: 2,
  RIPPLE_ALPHA_MULTIPLIER: 0.98,
  RIPPLE_MIN_ALPHA: 0.01,

  // Star Connection Constants
  STAR_CONNECTION_DISTANCE: 50,
  STAR_CONNECTION_LINEWIDTH: 0.05,
  STAR_CONNECTION_STROKE_STYLE: "rgba(255, 255, 255, 0.3)",

  // Star Update Constants
  STAR_DEPTH_FACTOR_DIVISOR: 2,
  STAR_POSITION_UPDATE_FACTOR: 0.015,
  STAR_TIME_FACTOR: 0.001,
  STAR_NORMAL_RADIUS_CHANGE_MULTIPLIER: 0.05,
  STAR_NORMAL_ALPHA: 0.6,
  STAR_MIN_RADIUS: 0.5,
  STAR_MAX_RADIUS: 2,
  STAR_BLINK_ALPHA_CHANGE_MULTIPLIER: 0.025,

  // Star Life Cycle Constants
  STARCYCLE_LIFETIME_INCREMENT: 0.05,
  STARCYCLE_DEFAULT_DURATION: 1000,
  STARCYCLE_FADEIN_PERCENT: 0.4,
  STARCYCLE_BURST_MULTIPLIER: 1.02,
};
