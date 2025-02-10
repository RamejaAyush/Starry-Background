# Starry Background Component

A dynamic, interactive starry background component for React applications. This component creates an animated canvas with stars, constellations, ripples, and nebulae effects.

## Version

0.0.1

## Features

- ✨ Dynamic star field with multiple star types:
  - Normal stars with subtle pulsing
  - Blinking stars with fade effects
  - Life cycle stars with complex animation patterns
- 🌌 Constellation lines connecting nearby stars
- 💫 Ripple effects with fade-in/fade-out animations
- 🌠 Nebula clouds with smooth transitions
- 📱 Fully responsive design
- 🎨 Customizable colors and effects

## Installation

```bash
npm install
```

## Usage

```tsx
import { StarryBackground } from "starry-background";

const App = () => {
  return (
    <div>
      <StarryBackground />
    </div>
  );
};
```

## Technical Details

- Built with React and TypeScript
- Uses the `useRef` hook to manage state
- Uses the `useEffect` hook to manage animations
- Uses the `requestAnimationFrame` API for smooth animations
- Uses the `canvas` element for rendering the starry background
- Uses the `motion` library for animations

## Development

To run the development server:

```bash
npm run dev
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the GitHub repository.

### Authors

- **Ayush Rameja** - [ayushrameja](https://github.com/ayushrameja)

See also the list of [contributors](https://github.com/ayushrameja/starry-background/contributors) who participated in this project.
