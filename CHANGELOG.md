# Changelog

All notable changes to this project will be documented in this file in reverse chronological order.

## [0.0.4] - 2024-01-12

### Changed

- **Ripple Appearance and Behavior:**
  - Increased the initial ripple size from 1 to 10 pixels.
  - Reduced the ripple radius increment to 1 per frame so that ripples expand more slowly.
  - Slowed the alpha decay (using a multiplier of 0.995 per frame) so ripples remain visible longer.
  - Updated the ripple drawing code to use a radial gradient that fades from fully transparent at both the inner and outer edges to a dark gray midpoint, creating a more natural "ripple" effect.

## [0.0.3] - 2024-01-11

### Changed

- **Constants Extraction and Refactoring:**
  - Created a dedicated constants file named `cosmicConstants.ts` in the `./src/constants` folder to group all magic numbers and configuration values.
  - Updated the `StarryBackground` component to import and use the `CosmicConstants` object instead of individual inline values.
  - Improved code readability and maintainability.
  - Utilized the nullish coalescing operator to safely handle potentially undefined properties (e.g., `star.lifeCycleTime`).

## [0.0.2] - 2024-01-10

### Changed

- **Star Connection Optimization:**
  - Replaced the nested `forEach` loops for drawing star connections with a double loop that processes each unique pair of stars only.
  - Reduced the total number of distance comparisons from roughly 490,000 to about 244,650 per frame, which improves performance on less powerful devices.

## [0.0.1] - 2024-01-09

### Added

- Initial release of the Starry Background component.
- Dynamic star field with multiple star types (normal, blink, lifeCycle) featuring distinct animations.
- Interactive constellation lines between nearby stars.
- Ripple effects with fade animations.
- Nebula clouds with smooth fade in/out transitions.
- Responsive canvas sizing.
- Performance optimizations using `requestAnimationFrame`.
- Basic documentation and README.
