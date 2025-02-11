# Changelog

All notable changes to this project will be documented in this file.

## [0.0.1] - 2024-01-09

### Added

- Initial release of the Starry Background component
- Dynamic star field with multiple star types:
  - Normal stars with pulsing animation
  - Blinking stars with fade effects
  - Life cycle stars with complex patterns
- Interactive constellation lines between nearby stars
- Ripple effects with fade animations (2-5 ripples at once)
- Nebula clouds with smooth fade in/out transitions
- Responsive canvas sizing
- Performance optimizations using RequestAnimationFrame
- Basic documentation and README

## [0.0.2] - 2024-01-10

### Changed

- **Star Connection Optimization:**
  - Replaced nested forEach loops for drawing star connections with a double loop that iterates over unique star pairs only.
  - Reduced total comparisons from roughly 490,000 to about 244,650 per frame.

## [0.0.3] - 2024-01-11

### Changed [v0.0.3]

- **Constants Extraction and Refactoring:**
  - Created a dedicated constants file named `cosmicConstants.ts` in the `./src/constants` folder to group all magic numbers and configuration values.
  - Updated the `StarryBackground` component to import and use the `CosmicConstants` object instead of individual inline values.
  - Improved code readability, maintainability, and ease of future tuning.
  - Utilized the nullish coalescing operator to safely handle potentially undefined properties (e.g., `star.lifeCycleTime`).
