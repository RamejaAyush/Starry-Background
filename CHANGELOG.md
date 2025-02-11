# Changelog

All notable changes to this project will be documented in this file.

## [0.0.2] - 2024-01-10

### Changed

- **Nebulae Drawing Logic:**
  - Refactored the nebula update and drawing process by merging two separate loops into a single reverse for‑loop.
  - This update ensures that each nebula's lifetime, alpha, and hue are updated and drawn in one pass, and that nebulae are safely removed without indexing issues.
- **Code Refactoring:**
  - Improved code clarity and maintainability in the `StarryBackground` component by isolating nebulae logic.
  - Minor adjustments were made for performance and readability.

### Fixed

- Addressed potential issues with element removal in the nebulae array.
