# Changelog

All notable changes to this project will be documented in this file.

## [0.0.3] - 2024-01-10

### Changed

- **Star Connection Optimization:**
  - Replaced the nested `forEach` loops for drawing star connections with a double loop that iterates over unique pairs only.
  - This change reduced the number of iterations from roughly 490,000 per frame (with 700 stars) to about 244,650, improving performance on less powerful devices.
